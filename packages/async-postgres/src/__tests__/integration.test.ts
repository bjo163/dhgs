import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { executeJob, JobHandlerRegistry, type JobRecord, type JobSpec } from '@dhgs/async';
import { applyAsyncMigrations } from '../migration';
import { AsyncPostgresStore } from '../store';
import { withTransactionalOutbox } from '../transaction';

const url = process.env.PG_ADMIN_URL;
const suite = url ? describe : describe.skip;
const now = '2026-10-05T00:00:00.000Z';
const actor = { actor_id:'USER-1', request_id:'REQ-1', correlation_id:'CORR-1', purpose:'TEST', jurisdiction_ids:['J-1'] } as const;
let seq = 0;

suite('@dhgs/async-postgres integration', () => {
  const pool = new Pool({ connectionString: url });
  beforeAll(async () => {
    await pool.query('DROP SCHEMA IF EXISTS dhgs_async CASCADE');
    await pool.query('CREATE TABLE IF NOT EXISTS async_test_state (id text PRIMARY KEY, value integer NOT NULL)');
    await pool.query('TRUNCATE async_test_state');
    await applyAsyncMigrations(pool);
  });
  afterAll(async () => { await pool.query('DROP TABLE IF EXISTS async_test_state'); await pool.end(); });

  it('commits state change and outbox atomically and rolls both back on failure', async () => {
    await withTransactionalOutbox(pool, actor, async ({ client, asyncStore }) => {
      await client.query("INSERT INTO async_test_state (id,value) VALUES ('ok',1)");
      await asyncStore.enqueueOutbox(outbox('evt-ok'));
    });
    expect(Number((await pool.query("SELECT count(*) c FROM async_test_state WHERE id='ok'")).rows[0].c)).toBe(1);
    expect(Number((await pool.query("SELECT count(*) c FROM dhgs_async.outbox_events WHERE event_id='evt-ok'")).rows[0].c)).toBe(1);

    await expect(withTransactionalOutbox(pool, actor, async ({ client, asyncStore }) => {
      await client.query("INSERT INTO async_test_state (id,value) VALUES ('rollback',1)");
      await asyncStore.enqueueOutbox(outbox('evt-rollback'));
      throw new Error('rollback-fixture');
    })).rejects.toThrow('rollback-fixture');
    expect(Number((await pool.query("SELECT count(*) c FROM async_test_state WHERE id='rollback'")).rows[0].c)).toBe(0);
    expect(Number((await pool.query("SELECT count(*) c FROM dhgs_async.outbox_events WHERE event_id='evt-rollback'")).rows[0].c)).toBe(0);
  });

  it('dispatches outbox at-least-once with lease ownership and correlation intact', async () => {
    const store = new AsyncPostgresStore(pool);
    await store.enqueueOutbox(outbox('evt-dispatch'));
    const batch = await store.claimOutbox('worker-a', now, 60_000, 10);
      const claimed = batch.find((event) => event.event_id === 'evt-dispatch');
      expect(claimed).toBeDefined();
    expect(claimed?.request_id).toBe('REQ-1');
    expect(claimed?.correlation_id).toBe('CORR-1');
    for (const event of batch) await store.publishOutbox(event.event_id, 'worker-a', now);
    expect((await pool.query("SELECT status FROM dhgs_async.outbox_events WHERE event_id='evt-dispatch'")).rows[0].status).toBe('PUBLISHED');
  });

  it('claims jobs concurrency-safely and reclaims an expired lease after worker crash', async () => {
    const store = new AsyncPostgresStore(pool);
    await store.enqueueJob(job('claim-one'));
    const [a,b] = await Promise.all([store.claimJobs('w-a', now, 1000, 1), store.claimJobs('w-b', now, 1000, 1)]);
    expect(a.length + b.length).toBe(1);
    const claimed = [...a,...b][0]!;
    await pool.query("UPDATE dhgs_async.jobs SET lease_expires_at=$2 WHERE job_id=$1", [claimed.job_id,'2026-10-04T23:59:59.000Z']);
    const reclaimed = await store.claimJobs('w-c', now, 60_000, 1);
    expect(reclaimed[0]?.job_id).toBe(claimed.job_id);
    expect(reclaimed[0]?.attempt_count).toBe(2);
  });

  it('retries with backoff then dead-letters instead of disappearing', async () => {
    const store = new AsyncPostgresStore(pool);
    await store.enqueueJob(job('dead', { max_attempts:2 }));
    const first = (await store.claimJobs('w-dead', now, 60_000, 1)).find((x) => x.job_id.includes('dead'))!;
    expect(await store.failJob(first,'w-dead','first',now)).toBe('RETRY_WAIT');
    await pool.query('UPDATE dhgs_async.jobs SET available_at=$2 WHERE job_id=$1',[first.job_id,now]);
    const second = (await store.claimJobs('w-dead',now,60_000,10)).find((x) => x.job_id===first.job_id)!;
    expect(await store.failJob(second,'w-dead','second',now)).toBe('DEAD_LETTER');
    const row = (await pool.query('SELECT status,last_error FROM dhgs_async.jobs WHERE job_id=$1',[first.job_id])).rows[0];
    expect(row).toEqual(expect.objectContaining({ status:'DEAD_LETTER', last_error:'second' }));
    expect((await store.metrics(now)).dead_letter_count).toBeGreaterThanOrEqual(1);
  });

  it('deduplicates repeated scheduler invocations by schedule key', async () => {
    const store = new AsyncPostgresStore(pool);
    const first = await store.enqueueScheduledJob(job('schedule-a'),'expiry:mandate-1:2026-10-05');
    const second = await store.enqueueScheduledJob(job('schedule-b'),'expiry:mandate-1:2026-10-05');
    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect(second.job.job_id).toBe(first.job.job_id);
  });

  it('durably prevents duplicate logical actions through idempotency completion', async () => {
    const store = new AsyncPostgresStore(pool);
    let calls = 0;
    const registry = new JobHandlerRegistry().register({ type:'NOTICE_DELIVERY',version:1,handle:async()=>{calls += 1;} });
    const scheduled = await store.enqueueJob(job('idem'));
    const record: JobRecord = { ...scheduled.job, status:'LEASED', attempt_count:1 };
    const input = { job:record, registry, authorization:{authorize:async()=>true}, idempotency:store, workerId:'w-idem', now };
    expect(await executeJob(input)).toBe('SUCCEEDED');
    expect(await executeJob(input)).toBe('ALREADY_PROCESSED');
    expect(calls).toBe(1);
  });
});

function outbox(id:string) {
  return { event_id:id,event_type:'NOTICE_ISSUED',payload_version:1,aggregate_ref:'notice:n-1',payload:{notice_id:'n-1'},request_id:'REQ-1',correlation_id:'CORR-1',available_at:now,max_attempts:3 };
}
function job(suffix:string, overrides:Partial<JobSpec> = {}): JobSpec {
  seq += 1;
  return { job_id:`job-${suffix}-${seq}`,job_type:'NOTICE_DELIVERY',job_version:1,payload:{notice_id:`n-${seq}`},priority:10,available_at:now,max_attempts:3,
    idempotency_key:`idem-${suffix}-${seq}`,sensitivity:'P1',privileged:false,governance_effect:'NOTIFY',source_actor:actor,...overrides };
}
