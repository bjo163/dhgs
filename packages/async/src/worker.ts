import { systemActorFor, validateJobSpec } from './policy';
import { JobHandlerRegistry } from './registry';
import type { AsyncMetricsHooks, AuthorizationGate, IdempotencyGate, JobRecord } from './types';

export type JobExecutionResult = 'SUCCEEDED' | 'ALREADY_PROCESSED' | 'BUSY';

export async function executeJob(input: {
  job: JobRecord;
  registry: JobHandlerRegistry;
  authorization: AuthorizationGate;
  idempotency: IdempotencyGate;
  workerId: string;
  now: string;
  idempotencyLeaseMs?: number;
  metrics?: AsyncMetricsHooks;
  monotonicNowMs?: () => number;
}): Promise<JobExecutionResult> {
  validateJobSpec(input.job);
  const handler = input.registry.get(input.job.job_type, input.job.job_version);
  const actor = systemActorFor(input.job);
  if (input.job.privileged && !(await input.authorization.authorize({ actor, job: input.job }))) {
    throw new Error('Privileged background job authorization denied');
  }
  const state = await input.idempotency.begin(
    input.job.idempotency_key,
    input.workerId,
    input.now,
    input.idempotencyLeaseMs ?? 60_000
  );
  if (state === 'COMPLETED') return 'ALREADY_PROCESSED';
  if (state === 'BUSY') return 'BUSY';

  const clock = input.monotonicNowMs ?? (() => performance.now());
  const startedAtMs = clock();
  let handlerOutcome: 'SUCCEEDED' | 'FAILED' = 'FAILED';
  try {
    await handler.handle({ actor, job: input.job });
    handlerOutcome = 'SUCCEEDED';
    await input.idempotency.complete(input.job.idempotency_key, input.workerId, input.now);
    return 'SUCCEEDED';
  } catch (error) {
    await input.idempotency.release(input.job.idempotency_key, input.workerId);
    throw error;
  } finally {
    const durationMs = Math.max(0, clock() - startedAtMs);
    try {
      await input.metrics?.observeHandlerLatency({
        job_type: input.job.job_type,
        job_version: input.job.job_version,
        duration_ms: durationMs,
        outcome: handlerOutcome
      });
    } catch {
      // Observability failure must not change material job execution semantics.
    }
  }
}
