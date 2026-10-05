import type { Pool, PoolClient, QueryResultRow } from 'pg';
import { retryBackoffMs, validateJobSpec, type AsyncMetrics, type IdempotencyGate, type JobRecord, type JobSpec, type OutboxEvent } from '@dhgs/async';
import type { ActorContext, JsonObject } from '@dhgs/contracts';

type Runner = Pool | PoolClient;

export class AsyncPostgresStore implements IdempotencyGate {
  constructor(private readonly runner: Runner) {}

  async enqueueOutbox(input: Omit<OutboxEvent, 'status'|'attempt_count'|'created_at'|'lease_owner'|'lease_expires_at'|'last_error'|'published_at'>): Promise<void> {
    await this.runner.query(`INSERT INTO dhgs_async.outbox_events
      (event_id,event_type,payload_version,aggregate_ref,payload,request_id,correlation_id,available_at,max_attempts,status)
      VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9,'PENDING')`,
      [input.event_id,input.event_type,input.payload_version,input.aggregate_ref,JSON.stringify(input.payload),input.request_id,input.correlation_id,input.available_at,input.max_attempts]);
  }

  async claimOutbox(workerId: string, now: string, leaseMs: number, limit = 10): Promise<OutboxEvent[]> {
    const leaseUntil = new Date(Date.parse(now) + leaseMs).toISOString();
    const result = await this.runner.query<OutboxRow & QueryResultRow>(`WITH candidate AS (
      SELECT event_id FROM dhgs_async.outbox_events
      WHERE available_at <= $1 AND (
        status IN ('PENDING','RETRY_WAIT') OR (status='LEASED' AND lease_expires_at <= $1)
      )
      ORDER BY available_at, created_at
      FOR UPDATE SKIP LOCKED LIMIT $2
    ) UPDATE dhgs_async.outbox_events o
      SET status='LEASED', lease_owner=$3, lease_expires_at=$4, attempt_count=attempt_count+1
      FROM candidate WHERE o.event_id=candidate.event_id RETURNING o.*`, [now,limit,workerId,leaseUntil]);
    return result.rows.map(outboxFromRow);
  }

  async publishOutbox(eventId: string, workerId: string, at: string): Promise<void> {
    const result = await this.runner.query(`UPDATE dhgs_async.outbox_events SET status='PUBLISHED', published_at=$3, lease_owner=NULL, lease_expires_at=NULL
      WHERE event_id=$1 AND status='LEASED' AND lease_owner=$2`, [eventId,workerId,at]);
    if (result.rowCount !== 1) throw new Error(`Outbox lease ownership lost: ${eventId}`);
  }

  async failOutbox(event: OutboxEvent, workerId: string, error: string, now: string): Promise<'RETRY_WAIT'|'DEAD_LETTER'> {
    const terminal = event.attempt_count >= event.max_attempts;
    const status = terminal ? 'DEAD_LETTER' : 'RETRY_WAIT';
    const nextAt = terminal ? now : new Date(Date.parse(now) + retryBackoffMs(event.attempt_count)).toISOString();
    await this.runner.query(`UPDATE dhgs_async.outbox_events SET status=$4,last_error=$5,available_at=$6,lease_owner=NULL,lease_expires_at=NULL
      WHERE event_id=$1 AND status='LEASED' AND lease_owner=$2 AND attempt_count=$3`, [event.event_id,workerId,event.attempt_count,status,error,nextAt]);
    return status;
  }

  async enqueueJob(spec: JobSpec): Promise<{ job: JobRecord; created: boolean }> {
    validateJobSpec(spec);
    const result = await this.runner.query<JobRow & QueryResultRow>(`INSERT INTO dhgs_async.jobs
      (job_id,job_type,job_version,payload,resource_ref,priority,available_at,max_attempts,status,idempotency_key,schedule_key,sensitivity,privileged,governance_effect,source_actor)
      VALUES ($1,$2,$3,$4::jsonb,$5,$6,$7,$8,'READY',$9,$10,$11,$12,$13,$14::jsonb)
      ON CONFLICT (idempotency_key) DO NOTHING RETURNING *`, jobValues(spec));
    if (result.rows[0]) return { job: jobFromRow(result.rows[0]), created: true };
    const existing = await this.runner.query<JobRow & QueryResultRow>('SELECT * FROM dhgs_async.jobs WHERE idempotency_key=$1', [spec.idempotency_key]);
    if (!existing.rows[0]) throw new Error(`Unable to load idempotent job: ${spec.idempotency_key}`);
    return { job: jobFromRow(existing.rows[0]), created: false };
  }

  async enqueueScheduledJob(spec: JobSpec, scheduleKey: string): Promise<{ job: JobRecord; created: boolean }> {
    validateJobSpec(spec);
    if (!scheduleKey.trim()) throw new Error('scheduleKey is required');
    const scheduled = { ...spec, schedule_key: scheduleKey };
    const result = await this.runner.query<JobRow & QueryResultRow>(`INSERT INTO dhgs_async.jobs
      (job_id,job_type,job_version,payload,resource_ref,priority,available_at,max_attempts,status,idempotency_key,schedule_key,sensitivity,privileged,governance_effect,source_actor)
      VALUES ($1,$2,$3,$4::jsonb,$5,$6,$7,$8,'READY',$9,$10,$11,$12,$13,$14::jsonb)
      ON CONFLICT (schedule_key) DO NOTHING RETURNING *`, jobValues(scheduled));
    if (result.rows[0]) return { job: jobFromRow(result.rows[0]), created: true };
    const existing = await this.runner.query<JobRow & QueryResultRow>('SELECT * FROM dhgs_async.jobs WHERE schedule_key=$1', [scheduleKey]);
    if (!existing.rows[0]) throw new Error(`Unable to load scheduled job: ${scheduleKey}`);
    return { job: jobFromRow(existing.rows[0]), created: false };
  }

  async claimJobs(workerId: string, now: string, leaseMs: number, limit = 10): Promise<JobRecord[]> {
    const leaseUntil = new Date(Date.parse(now) + leaseMs).toISOString();
    const result = await this.runner.query<JobRow & QueryResultRow>(`WITH candidate AS (
      SELECT job_id FROM dhgs_async.jobs
      WHERE available_at <= $1 AND (
        status IN ('READY','RETRY_WAIT') OR (status='LEASED' AND lease_expires_at <= $1)
      )
      ORDER BY priority DESC, available_at, created_at
      FOR UPDATE SKIP LOCKED LIMIT $2
    ) UPDATE dhgs_async.jobs j SET status='LEASED',lease_owner=$3,lease_expires_at=$4,
      started_at=COALESCE(started_at,$1),attempt_count=attempt_count+1
      FROM candidate WHERE j.job_id=candidate.job_id RETURNING j.*`, [now,limit,workerId,leaseUntil]);
    return result.rows.map(jobFromRow);
  }

  async completeJob(jobId: string, workerId: string, at: string): Promise<void> {
    const result = await this.runner.query(`UPDATE dhgs_async.jobs SET status='SUCCEEDED',completed_at=$3,lease_owner=NULL,lease_expires_at=NULL
      WHERE job_id=$1 AND status='LEASED' AND lease_owner=$2`, [jobId,workerId,at]);
    if (result.rowCount !== 1) throw new Error(`Job lease ownership lost: ${jobId}`);
  }

  async failJob(job: JobRecord, workerId: string, error: string, now: string): Promise<'RETRY_WAIT'|'DEAD_LETTER'> {
    const terminal = job.attempt_count >= job.max_attempts;
    const status = terminal ? 'DEAD_LETTER' : 'RETRY_WAIT';
    const nextAt = terminal ? now : new Date(Date.parse(now) + retryBackoffMs(job.attempt_count)).toISOString();
    const result = await this.runner.query(`UPDATE dhgs_async.jobs SET status=$4,last_error=$5,available_at=$6,lease_owner=NULL,lease_expires_at=NULL
      WHERE job_id=$1 AND status='LEASED' AND lease_owner=$2 AND attempt_count=$3`, [job.job_id,workerId,job.attempt_count,status,error,nextAt]);
    if (result.rowCount !== 1) throw new Error(`Job lease ownership lost: ${job.job_id}`);
    return status;
  }

  async begin(key: string, owner: string, now: string, leaseMs: number): Promise<'ACQUIRED'|'COMPLETED'|'BUSY'> {
    const leaseUntil = new Date(Date.parse(now) + leaseMs).toISOString();
    const inserted = await this.runner.query(`INSERT INTO dhgs_async.idempotency_keys (idempotency_key,status,owner,lease_expires_at)
      VALUES ($1,'PROCESSING',$2,$3) ON CONFLICT DO NOTHING`, [key,owner,leaseUntil]);
    if (inserted.rowCount === 1) return 'ACQUIRED';
    const reclaimed = await this.runner.query(`UPDATE dhgs_async.idempotency_keys SET owner=$2,lease_expires_at=$3
      WHERE idempotency_key=$1 AND status='PROCESSING' AND lease_expires_at <= $4`, [key,owner,leaseUntil,now]);
    if (reclaimed.rowCount === 1) return 'ACQUIRED';
    const current = await this.runner.query<{ status: string } & QueryResultRow>('SELECT status FROM dhgs_async.idempotency_keys WHERE idempotency_key=$1', [key]);
    return current.rows[0]?.status === 'COMPLETED' ? 'COMPLETED' : 'BUSY';
  }

  async complete(key: string, owner: string, completedAt: string): Promise<void> {
    const result = await this.runner.query(`UPDATE dhgs_async.idempotency_keys SET status='COMPLETED',completed_at=$3,lease_expires_at=NULL
      WHERE idempotency_key=$1 AND status='PROCESSING' AND owner=$2`, [key,owner,completedAt]);
    if (result.rowCount !== 1) throw new Error(`Idempotency lease ownership lost: ${key}`);
  }

  async release(key: string, owner: string): Promise<void> {
    await this.runner.query(`DELETE FROM dhgs_async.idempotency_keys WHERE idempotency_key=$1 AND status='PROCESSING' AND owner=$2`, [key,owner]);
  }

  async metrics(now: string): Promise<AsyncMetrics> {
    const result = await this.runner.query<{ queue_depth: string; oldest_ms: string | null; retry_count: string; dead_count: string } & QueryResultRow>(`SELECT
      count(*) FILTER (WHERE status IN ('READY','LEASED','RETRY_WAIT'))::text AS queue_depth,
      extract(epoch from ($1::timestamptz - min(created_at) FILTER (WHERE status IN ('READY','LEASED','RETRY_WAIT'))))*1000 AS oldest_ms,
      count(*) FILTER (WHERE status='RETRY_WAIT')::text AS retry_count,
      count(*) FILTER (WHERE status='DEAD_LETTER')::text AS dead_count
      FROM dhgs_async.jobs`, [now]);
    const row = result.rows[0]!;
    return { queue_depth:Number(row.queue_depth), oldest_job_age_ms:Math.max(0,Number(row.oldest_ms ?? 0)), retry_count:Number(row.retry_count), dead_letter_count:Number(row.dead_count) };
  }
}

function jobValues(spec: JobSpec): unknown[] {
  return [spec.job_id,spec.job_type,spec.job_version,JSON.stringify(spec.payload),spec.resource_ref ?? null,spec.priority,spec.available_at,spec.max_attempts,
    spec.idempotency_key,spec.schedule_key ?? null,spec.sensitivity,spec.privileged,spec.governance_effect,JSON.stringify(spec.source_actor)];
}

interface JobRow extends QueryResultRow {
  job_id:string; job_type:string; job_version:number; payload:JsonObject; resource_ref:string|null; priority:number; available_at:Date; max_attempts:number; attempt_count:number;
  status:JobRecord['status']; idempotency_key:string; schedule_key:string|null; sensitivity:JobRecord['sensitivity']; privileged:boolean; governance_effect:JobRecord['governance_effect']; source_actor:ActorContext;
  lease_owner:string|null; lease_expires_at:Date|null; last_error:string|null; created_at:Date; started_at:Date|null; completed_at:Date|null;
}
interface OutboxRow extends QueryResultRow {
  event_id:string; event_type:string; payload_version:number; aggregate_ref:string; payload:JsonObject; request_id:string; correlation_id:string; available_at:Date; max_attempts:number;
  attempt_count:number; status:OutboxEvent['status']; lease_owner:string|null; lease_expires_at:Date|null; last_error:string|null; created_at:Date; published_at:Date|null;
}
function jobFromRow(row: JobRow): JobRecord {
  return { job_id:row.job_id,job_type:row.job_type,job_version:row.job_version,payload:row.payload,resource_ref:row.resource_ref ?? undefined,priority:row.priority,
    available_at:row.available_at.toISOString(),max_attempts:row.max_attempts,attempt_count:row.attempt_count,status:row.status,idempotency_key:row.idempotency_key,
    schedule_key:row.schedule_key ?? undefined,sensitivity:row.sensitivity,privileged:row.privileged,governance_effect:row.governance_effect,source_actor:row.source_actor,
    lease_owner:row.lease_owner,lease_expires_at:row.lease_expires_at?.toISOString() ?? null,last_error:row.last_error,created_at:row.created_at.toISOString(),
    started_at:row.started_at?.toISOString() ?? null,completed_at:row.completed_at?.toISOString() ?? null };
}
function outboxFromRow(row: OutboxRow): OutboxEvent {
  return { event_id:row.event_id,event_type:row.event_type,payload_version:row.payload_version,aggregate_ref:row.aggregate_ref,payload:row.payload,request_id:row.request_id,
    correlation_id:row.correlation_id,available_at:row.available_at.toISOString(),max_attempts:row.max_attempts,attempt_count:row.attempt_count,status:row.status,
    lease_owner:row.lease_owner,lease_expires_at:row.lease_expires_at?.toISOString() ?? null,last_error:row.last_error,created_at:row.created_at.toISOString(),published_at:row.published_at?.toISOString() ?? null };
}
