import type { JobRecord, JobSpec, SystemActorContext } from './types';

export function validateJobSpec(job: JobSpec | JobRecord): void {
  if (!job.job_id.trim() || !job.job_type.trim() || !job.idempotency_key.trim()) throw new Error('Job identity fields are required');
  if (!Number.isInteger(job.job_version) || job.job_version < 1) throw new Error('Job version must be a positive integer');
  if (!Number.isInteger(job.max_attempts) || job.max_attempts < 1) throw new Error('max_attempts must be a positive integer');
  if (Number.isNaN(Date.parse(job.available_at))) throw new Error('available_at must be an ISO-compatible timestamp');
  if (job.governance_effect === 'FINALIZE_HIGH_IMPACT_DECISION') {
    throw new Error('Background jobs cannot finalize high-impact governance decisions');
  }
  if (job.sensitivity === 'P2' || job.sensitivity === 'P3') {
    if (!job.resource_ref?.trim()) throw new Error('Protected jobs require resource_ref');
    if (Object.keys(job.payload).length > 0) throw new Error('Protected jobs must carry references, not sensitive payload content');
  }
}

export function systemActorFor(job: JobRecord): SystemActorContext {
  return {
    actor_id: `SYSTEM:${job.job_type}`,
    request_id: job.source_actor.request_id,
    correlation_id: job.source_actor.correlation_id,
    purpose: `BACKGROUND_JOB:${job.job_type}`,
    identity_assurance: 'IA4_VERIFIED_INSTITUTION',
    jurisdiction_ids: job.source_actor.jurisdiction_ids,
    institution_id: job.source_actor.institution_id,
    roles: ['SYSTEM_WORKER'],
    permissions: [],
    privileged: false
  };
}

export function retryBackoffMs(attemptCount: number, baseMs = 1_000, maxMs = 15 * 60_000): number {
  if (!Number.isInteger(attemptCount) || attemptCount < 1) throw new Error('attemptCount must be >= 1');
  return Math.min(maxMs, baseMs * (2 ** (attemptCount - 1)));
}
