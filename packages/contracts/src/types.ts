import type { EventType } from './event-types';

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];
export interface JsonObject { readonly [key: string]: JsonValue; }

export type IdentityAssurance =
  | 'IA0_ANONYMOUS'
  | 'IA1_PSEUDONYMOUS'
  | 'IA2_VERIFIED_PERSON'
  | 'IA3_VERIFIED_OFFICIAL'
  | 'IA4_VERIFIED_INSTITUTION';

export interface ActorContext {
  actor_id: string;
  request_id: string;
  correlation_id: string;
  purpose?: string;
  identity_assurance?: IdentityAssurance;
  jurisdiction_ids?: readonly string[];
  institution_id?: string | null;
  roles?: readonly string[];
  permissions?: readonly string[];
  privileged?: boolean;
}

export interface CaseRef {
  case_id: string;
  case_version?: number;
}

export interface TaskRef {
  task_id: string;
  case_id?: string;
  task_version?: number;
}

export interface EvidenceRef {
  evidence_id: string;
  case_id?: string;
  evidence_version?: number;
}

export interface DecisionRef {
  decision_id: string;
  case_id?: string;
  decision_version?: number;
}

export type NoticeStatus = 'DRAFT' | 'ISSUED' | 'DELIVERED' | 'FAILED';

export interface Notice {
  notice_id: string;
  notice_type: string;
  status: NoticeStatus;
  case_ref?: CaseRef;
  recipient_refs?: readonly string[];
  issued_at?: string;
  delivered_at?: string;
}

export type OutcomeStatus = 'PENDING' | 'PARTIAL' | 'COMPLETED' | 'FAILED' | 'UNKNOWN';

export interface Outcome {
  outcome_id: string;
  decision_ref: DecisionRef;
  status: OutcomeStatus;
  observed_at?: string;
  summary?: string;
}

export interface PublicRecordRef {
  public_record_id: string;
  version: number;
  url?: string;
}

export interface DecisionContextSnapshot {
  snapshot_id: string;
  schema_version: string;
  decision_ref: DecisionRef;
  captured_at: string;
  actor: ActorContext;
  legal_basis_refs: readonly string[];
  evidence_refs: readonly EvidenceRef[];
  policy_refs: readonly string[];
  source_versions: Readonly<Record<string, string>>;
}

export interface EventEnvelope<TPayload extends JsonObject = JsonObject> {
  schema_version: string;
  event_id: string;
  event_type: EventType;
  actor: ActorContext;
  timestamp: string;
  case_ref?: CaseRef;
  source_module: string;
  payload_version: number;
  payload: TPayload;
  request_id: string;
  correlation_id: string;
  previous_event_hash?: string;
  event_hash?: string;
}
