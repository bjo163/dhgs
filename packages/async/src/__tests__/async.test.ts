import { describe, expect, it } from 'vitest';
import { executeJob, JobHandlerRegistry, retryBackoffMs, systemActorFor, validateJobSpec, type IdempotencyGate, type JobRecord } from '../index';

const job = (overrides: Partial<JobRecord> = {}): JobRecord => ({
  job_id: 'job-1', job_type: 'NOTICE_DELIVERY', job_version: 1, payload: { notice_id: 'n-1' },
  priority: 10, available_at: '2026-10-05T00:00:00.000Z', max_attempts: 3,
  idempotency_key: 'notice:n-1', sensitivity: 'P1', privileged: false, governance_effect: 'NOTIFY',
  source_actor: { actor_id: 'user-1', request_id: 'req-1', correlation_id: 'corr-1', roles: ['ADMIN'], permissions: ['ALL'], privileged: true },
  status: 'LEASED', attempt_count: 1, created_at: '2026-10-05T00:00:00.000Z', ...overrides
});

describe('@dhgs/async', () => {
  it('uses an explicit handler registry and rejects unknown/duplicate handlers', () => {
    const registry = new JobHandlerRegistry().register({ type: 'NOTICE_DELIVERY', version: 1, handle: async () => {} });
    expect(registry.list()).toHaveLength(1);
    expect(() => registry.get('UNKNOWN', 1)).toThrow(/Unregistered/);
    expect(() => registry.register({ type: 'NOTICE_DELIVERY', version: 1, handle: async () => {} })).toThrow(/Duplicate/);
  });

  it('reconstructs a restricted system actor without inheriting user authority', () => {
    const actor = systemActorFor(job());
    expect(actor.actor_id).toBe('SYSTEM:NOTICE_DELIVERY');
    expect(actor.request_id).toBe('req-1');
    expect(actor.correlation_id).toBe('corr-1');
    expect(actor.roles).toEqual(['SYSTEM_WORKER']);
    expect(actor.permissions).toEqual([]);
    expect(actor.privileged).toBe(false);
  });

  it('prohibits high-impact finalization and protected payload leakage', () => {
    expect(() => validateJobSpec(job({ governance_effect: 'FINALIZE_HIGH_IMPACT_DECISION' }))).toThrow(/cannot finalize/);
    expect(() => validateJobSpec(job({ sensitivity: 'P3', resource_ref: 'case:1', payload: { secret: 'x' } }))).toThrow(/references/);
    expect(() => validateJobSpec(job({ sensitivity: 'P3', resource_ref: 'case:1', payload: {} }))).not.toThrow();
  });

  it('uses deterministic exponential retry backoff', () => {
    expect(retryBackoffMs(1)).toBe(1000);
    expect(retryBackoffMs(4)).toBe(8000);
  });

  it('requires authorization for privileged handlers', async () => {
    const registry = new JobHandlerRegistry().register({ type: 'NOTICE_DELIVERY', version: 1, handle: async () => {} });
    const idempotency = memoryIdempotency();
    await expect(executeJob({ job: job({ privileged: true }), registry, authorization: { authorize: async () => false }, idempotency, workerId: 'w1', now: '2026-10-05T00:00:00.000Z' })).rejects.toThrow(/authorization denied/);
  });

  it('does not repeat a completed logical action on duplicate delivery', async () => {
    let calls = 0;
    const registry = new JobHandlerRegistry().register({ type: 'NOTICE_DELIVERY', version: 1, handle: async () => { calls += 1; } });
    const idempotency = memoryIdempotency();
    const input = { job: job(), registry, authorization: { authorize: async () => true }, idempotency, workerId: 'w1', now: '2026-10-05T00:00:00.000Z' };
    expect(await executeJob(input)).toBe('SUCCEEDED');
    expect(await executeJob(input)).toBe('ALREADY_PROCESSED');
    expect(calls).toBe(1);
  });
});

function memoryIdempotency(): IdempotencyGate {
  const completed = new Set<string>();
  const active = new Set<string>();
  return {
    async begin(key) {
      if (completed.has(key)) return 'COMPLETED';
      if (active.has(key)) return 'BUSY';
      active.add(key); return 'ACQUIRED';
    },
    async complete(key) { active.delete(key); completed.add(key); },
    async release(key) { active.delete(key); }
  };
}
