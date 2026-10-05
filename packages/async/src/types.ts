import type { ActorContext, JsonObject } from '@dhgs/contracts';

export type DataSensitivity = 'P0' | 'P1' | 'P2' | 'P3';
export type GovernanceEffect =
  | 'NOTIFY'
  | 'PUBLISH'
  | 'REVIEW'
  | 'ESCALATE'
  | 'MAINTENANCE'
  | 'FINALIZE_HIGH_IMPACT_DECISION';

export type JobStatus = 'READY' | 'LEASED' | 'RETRY_WAIT' | 'SUCCEEDED' | 'FAILED' | 'DEAD_LETTER';
export type OutboxStatus = 'PENDING' | 'LEASED' | 'RETRY_WAIT' | 'PUBLISHED' | 'FAILED' | 'DEAD_LETTER';

export interface JobSpec<TPayload extends JsonObject = JsonObject> {
  job_id: string;
  job_type: string;
  job_version: number;
  payload: TPayload;
  resource_ref?: string;
  priority: number;
  available_at: string;
  max_attempts: number;
  idempotency_key: string;
  schedule_key?: string;
  sensitivity: DataSensitivity;
  privileged: boolean;
  governance_effect: GovernanceEffect;
  source_actor: ActorContext;
}

export interface JobRecord<TPayload extends JsonObject = JsonObject> extends JobSpec<TPayload> {
  status: JobStatus;
  attempt_count: number;
  lease_owner?: string | null;
  lease_expires_at?: string | null;
  last_error?: string | null;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface OutboxEvent<TPayload extends JsonObject = JsonObject> {
  event_id: string;
  event_type: string;
  payload_version: number;
  aggregate_ref: string;
  payload: TPayload;
  request_id: string;
  correlation_id: string;
  available_at: string;
  max_attempts: number;
  status: OutboxStatus;
  attempt_count: number;
  lease_owner?: string | null;
  lease_expires_at?: string | null;
  last_error?: string | null;
  created_at: string;
  published_at?: string | null;
}

export interface SystemActorContext extends ActorContext {
  actor_id: `SYSTEM:${string}`;
  privileged: false;
}

export interface JobExecutionContext {
  actor: SystemActorContext;
  job: JobRecord;
}

export interface JobHandler {
  type: string;
  version: number;
  handle(context: JobExecutionContext): Promise<void>;
}

export interface AuthorizationGate {
  authorize(input: { actor: SystemActorContext; job: JobRecord }): Promise<boolean>;
}

export interface IdempotencyGate {
  begin(key: string, owner: string, now: string, leaseMs: number): Promise<'ACQUIRED' | 'COMPLETED' | 'BUSY'>;
  complete(key: string, owner: string, completedAt: string): Promise<void>;
  release(key: string, owner: string): Promise<void>;
}

export interface AsyncMetrics {
  queue_depth: number;
  oldest_job_age_ms: number;
  retry_count: number;
  dead_letter_count: number;
}

export interface AsyncMetricsHooks {
  observeHandlerLatency(input: {
    job_type: string;
    job_version: number;
    duration_ms: number;
    outcome: 'SUCCEEDED' | 'FAILED';
  }): void | Promise<void>;
}
