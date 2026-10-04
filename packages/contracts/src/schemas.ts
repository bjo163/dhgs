import { getEventTypeDescriptor, isEventType, type EventType } from './event-types';
import { ContractValidationError, defineSchema } from './schema';
import type {
  ActorContext,
  CaseRef,
  DecisionContextSnapshot,
  DecisionRef,
  EventEnvelope,
  EvidenceRef,
  IdentityAssurance,
  JsonObject,
  JsonValue,
  Notice,
  NoticeStatus,
  Outcome,
  OutcomeStatus,
  PublicRecordRef,
  TaskRef
} from './types';

export const CONTRACT_SCHEMA_VERSION = '1.0.0';

export const SCHEMA_EVOLUTION_RULES = Object.freeze({
  additive_optional_fields_preserve_version: true,
  required_field_removal_requires_major_schema_version: true,
  required_field_semantic_change_requires_major_schema_version: true,
  breaking_event_payload_change_requires_new_payload_version: true,
  unknown_payload_versions_fail_closed: true,
  event_type_rename_requires_new_event_type: true
});

const IDENTITY_ASSURANCE = new Set<IdentityAssurance>([
  'IA0_ANONYMOUS',
  'IA1_PSEUDONYMOUS',
  'IA2_VERIFIED_PERSON',
  'IA3_VERIFIED_OFFICIAL',
  'IA4_VERIFIED_INSTITUTION'
]);
const NOTICE_STATUS = new Set<NoticeStatus>(['DRAFT', 'ISSUED', 'DELIVERED', 'FAILED']);
const OUTCOME_STATUS = new Set<OutcomeStatus>(['PENDING', 'PARTIAL', 'COMPLETED', 'FAILED', 'UNKNOWN']);

export const actorContextSchema = defineSchema<ActorContext>('ActorContext', CONTRACT_SCHEMA_VERSION, parseActorContext);
export const caseRefSchema = defineSchema<CaseRef>('CaseRef', CONTRACT_SCHEMA_VERSION, parseCaseRef);
export const taskRefSchema = defineSchema<TaskRef>('TaskRef', CONTRACT_SCHEMA_VERSION, parseTaskRef);
export const evidenceRefSchema = defineSchema<EvidenceRef>('EvidenceRef', CONTRACT_SCHEMA_VERSION, parseEvidenceRef);
export const decisionRefSchema = defineSchema<DecisionRef>('DecisionRef', CONTRACT_SCHEMA_VERSION, parseDecisionRef);
export const noticeSchema = defineSchema<Notice>('Notice', CONTRACT_SCHEMA_VERSION, parseNotice);
export const outcomeSchema = defineSchema<Outcome>('Outcome', CONTRACT_SCHEMA_VERSION, parseOutcome);
export const publicRecordRefSchema = defineSchema<PublicRecordRef>('PublicRecordRef', CONTRACT_SCHEMA_VERSION, parsePublicRecordRef);
export const decisionContextSnapshotSchema = defineSchema<DecisionContextSnapshot>('DecisionContextSnapshot', CONTRACT_SCHEMA_VERSION, parseDecisionContextSnapshot);
export const eventSchema = defineSchema<EventEnvelope>('Event', CONTRACT_SCHEMA_VERSION, parseEvent);

export const CONTRACT_SCHEMAS = Object.freeze({
  ActorContext: actorContextSchema,
  CaseRef: caseRefSchema,
  TaskRef: taskRefSchema,
  EvidenceRef: evidenceRefSchema,
  DecisionRef: decisionRefSchema,
  Event: eventSchema,
  Notice: noticeSchema,
  Outcome: outcomeSchema,
  PublicRecordRef: publicRecordRefSchema,
  DecisionContextSnapshot: decisionContextSnapshotSchema
});

export type CreateEventInput<TPayload extends JsonObject = JsonObject> =
  Omit<EventEnvelope<TPayload>, 'schema_version' | 'request_id' | 'correlation_id'>;

export function createEvent<TPayload extends JsonObject>(input: CreateEventInput<TPayload>): EventEnvelope<TPayload> {
  return eventSchema.parse({
    ...input,
    schema_version: CONTRACT_SCHEMA_VERSION,
    request_id: input.actor.request_id,
    correlation_id: input.actor.correlation_id
  }) as EventEnvelope<TPayload>;
}

function parseActorContext(value: unknown): ActorContext {
  const object = asObject(value, 'ActorContext');
  const identity = optionalString(object.identity_assurance, 'ActorContext.identity_assurance');
  if (identity && !IDENTITY_ASSURANCE.has(identity as IdentityAssurance)) {
    fail(`ActorContext.identity_assurance is invalid: ${identity}`);
  }
  return {
    actor_id: requiredString(object.actor_id, 'ActorContext.actor_id'),
    request_id: requiredString(object.request_id, 'ActorContext.request_id'),
    correlation_id: requiredString(object.correlation_id, 'ActorContext.correlation_id'),
    ...optionalProp('purpose', optionalString(object.purpose, 'ActorContext.purpose')),
    ...(identity ? { identity_assurance: identity as IdentityAssurance } : {}),
    ...optionalProp('jurisdiction_ids', optionalStringArray(object.jurisdiction_ids, 'ActorContext.jurisdiction_ids')),
    ...(object.institution_id === null ? { institution_id: null } : optionalProp('institution_id', optionalString(object.institution_id, 'ActorContext.institution_id'))),
    ...optionalProp('roles', optionalStringArray(object.roles, 'ActorContext.roles')),
    ...optionalProp('permissions', optionalStringArray(object.permissions, 'ActorContext.permissions')),
    ...optionalProp('privileged', optionalBoolean(object.privileged, 'ActorContext.privileged'))
  };
}

function parseCaseRef(value: unknown): CaseRef {
  const object = asObject(value, 'CaseRef');
  return {
    case_id: requiredString(object.case_id, 'CaseRef.case_id'),
    ...optionalProp('case_version', optionalPositiveInteger(object.case_version, 'CaseRef.case_version'))
  };
}

function parseTaskRef(value: unknown): TaskRef {
  const object = asObject(value, 'TaskRef');
  return {
    task_id: requiredString(object.task_id, 'TaskRef.task_id'),
    ...optionalProp('case_id', optionalString(object.case_id, 'TaskRef.case_id')),
    ...optionalProp('task_version', optionalPositiveInteger(object.task_version, 'TaskRef.task_version'))
  };
}

function parseEvidenceRef(value: unknown): EvidenceRef {
  const object = asObject(value, 'EvidenceRef');
  return {
    evidence_id: requiredString(object.evidence_id, 'EvidenceRef.evidence_id'),
    ...optionalProp('case_id', optionalString(object.case_id, 'EvidenceRef.case_id')),
    ...optionalProp('evidence_version', optionalPositiveInteger(object.evidence_version, 'EvidenceRef.evidence_version'))
  };
}

function parseDecisionRef(value: unknown): DecisionRef {
  const object = asObject(value, 'DecisionRef');
  return {
    decision_id: requiredString(object.decision_id, 'DecisionRef.decision_id'),
    ...optionalProp('case_id', optionalString(object.case_id, 'DecisionRef.case_id')),
    ...optionalProp('decision_version', optionalPositiveInteger(object.decision_version, 'DecisionRef.decision_version'))
  };
}

function parseNotice(value: unknown): Notice {
  const object = asObject(value, 'Notice');
  const status = requiredString(object.status, 'Notice.status');
  if (!NOTICE_STATUS.has(status as NoticeStatus)) fail(`Notice.status is invalid: ${status}`);
  return {
    notice_id: requiredString(object.notice_id, 'Notice.notice_id'),
    notice_type: requiredString(object.notice_type, 'Notice.notice_type'),
    status: status as NoticeStatus,
    ...(object.case_ref === undefined ? {} : { case_ref: parseCaseRef(object.case_ref) }),
    ...optionalProp('recipient_refs', optionalStringArray(object.recipient_refs, 'Notice.recipient_refs')),
    ...optionalProp('issued_at', optionalIsoTimestamp(object.issued_at, 'Notice.issued_at')),
    ...optionalProp('delivered_at', optionalIsoTimestamp(object.delivered_at, 'Notice.delivered_at'))
  };
}

function parseOutcome(value: unknown): Outcome {
  const object = asObject(value, 'Outcome');
  const status = requiredString(object.status, 'Outcome.status');
  if (!OUTCOME_STATUS.has(status as OutcomeStatus)) fail(`Outcome.status is invalid: ${status}`);
  return {
    outcome_id: requiredString(object.outcome_id, 'Outcome.outcome_id'),
    decision_ref: parseDecisionRef(object.decision_ref),
    status: status as OutcomeStatus,
    ...optionalProp('observed_at', optionalIsoTimestamp(object.observed_at, 'Outcome.observed_at')),
    ...optionalProp('summary', optionalString(object.summary, 'Outcome.summary'))
  };
}

function parsePublicRecordRef(value: unknown): PublicRecordRef {
  const object = asObject(value, 'PublicRecordRef');
  return {
    public_record_id: requiredString(object.public_record_id, 'PublicRecordRef.public_record_id'),
    version: positiveInteger(object.version, 'PublicRecordRef.version'),
    ...optionalProp('url', optionalString(object.url, 'PublicRecordRef.url'))
  };
}

function parseDecisionContextSnapshot(value: unknown): DecisionContextSnapshot {
  const object = asObject(value, 'DecisionContextSnapshot');
  const schemaVersion = requiredString(object.schema_version, 'DecisionContextSnapshot.schema_version');
  if (schemaVersion !== CONTRACT_SCHEMA_VERSION) fail(`DecisionContextSnapshot unsupported schema_version: ${schemaVersion}`);
  return {
    snapshot_id: requiredString(object.snapshot_id, 'DecisionContextSnapshot.snapshot_id'),
    schema_version: schemaVersion,
    decision_ref: parseDecisionRef(object.decision_ref),
    captured_at: isoTimestamp(object.captured_at, 'DecisionContextSnapshot.captured_at'),
    actor: parseActorContext(object.actor),
    legal_basis_refs: requiredStringArray(object.legal_basis_refs, 'DecisionContextSnapshot.legal_basis_refs'),
    evidence_refs: requiredArray(object.evidence_refs, 'DecisionContextSnapshot.evidence_refs').map(parseEvidenceRef),
    policy_refs: requiredStringArray(object.policy_refs, 'DecisionContextSnapshot.policy_refs'),
    source_versions: parseStringRecord(object.source_versions, 'DecisionContextSnapshot.source_versions')
  };
}

function parseEvent(value: unknown): EventEnvelope {
  const object = asObject(value, 'Event');
  const schemaVersion = requiredString(object.schema_version, 'Event.schema_version');
  if (schemaVersion !== CONTRACT_SCHEMA_VERSION) fail(`Event unsupported schema_version: ${schemaVersion}`);
  const eventTypeValue = requiredString(object.event_type, 'Event.event_type');
  if (!isEventType(eventTypeValue)) fail(`Event.event_type is unknown: ${eventTypeValue}`);
  const eventType = eventTypeValue as EventType;
  const payloadVersion = positiveInteger(object.payload_version, 'Event.payload_version');
  const descriptor = getEventTypeDescriptor(eventType);
  if (!descriptor.supported_payload_versions.includes(payloadVersion)) {
    fail(`Event ${eventType} unsupported payload_version: ${payloadVersion}`);
  }
  const actor = parseActorContext(object.actor);
  const requestId = requiredString(object.request_id, 'Event.request_id');
  const correlationId = requiredString(object.correlation_id, 'Event.correlation_id');
  if (requestId !== actor.request_id) fail('Event.request_id must match actor.request_id');
  if (correlationId !== actor.correlation_id) fail('Event.correlation_id must match actor.correlation_id');
  return {
    schema_version: schemaVersion,
    event_id: requiredString(object.event_id, 'Event.event_id'),
    event_type: eventType,
    actor,
    timestamp: isoTimestamp(object.timestamp, 'Event.timestamp'),
    ...(object.case_ref === undefined ? {} : { case_ref: parseCaseRef(object.case_ref) }),
    source_module: requiredString(object.source_module, 'Event.source_module'),
    payload_version: payloadVersion,
    payload: parseJsonObject(object.payload, 'Event.payload'),
    request_id: requestId,
    correlation_id: correlationId,
    ...optionalProp('previous_event_hash', optionalString(object.previous_event_hash, 'Event.previous_event_hash')),
    ...optionalProp('event_hash', optionalString(object.event_hash, 'Event.event_hash'))
  };
}

function asObject(value: unknown, field: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${field} must be an object`);
  return value as Record<string, unknown>;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${field} must be a non-empty string`);
  return value;
}

function optionalString(value: unknown, field: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredString(value, field);
}

function optionalBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'boolean') fail(`${field} must be boolean`);
  return value;
}

function positiveInteger(value: unknown, field: string): number {
  if (!Number.isInteger(value) || (value as number) < 1) fail(`${field} must be a positive integer`);
  return value as number;
}

function optionalPositiveInteger(value: unknown, field: string): number | undefined {
  if (value === undefined) return undefined;
  return positiveInteger(value, field);
}

function isoTimestamp(value: unknown, field: string): string {
  const result = requiredString(value, field);
  if (Number.isNaN(Date.parse(result))) fail(`${field} must be an ISO-compatible timestamp`);
  return result;
}

function optionalIsoTimestamp(value: unknown, field: string): string | undefined {
  if (value === undefined) return undefined;
  return isoTimestamp(value, field);
}

function requiredArray(value: unknown, field: string): unknown[] {
  if (!Array.isArray(value)) fail(`${field} must be an array`);
  return value;
}

function requiredStringArray(value: unknown, field: string): string[] {
  return requiredArray(value, field).map((item, index) => requiredString(item, `${field}[${index}]`));
}

function optionalStringArray(value: unknown, field: string): string[] | undefined {
  if (value === undefined) return undefined;
  return requiredStringArray(value, field);
}

function parseStringRecord(value: unknown, field: string): Record<string, string> {
  const object = asObject(value, field);
  return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, requiredString(item, `${field}.${key}`)]));
}

function parseJsonObject(value: unknown, field: string): JsonObject {
  const object = asObject(value, field);
  return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, parseJsonValue(item, `${field}.${key}`)]));
}

function parseJsonValue(value: unknown, field: string): JsonValue {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (Array.isArray(value)) return value.map((item, index) => parseJsonValue(item, `${field}[${index}]`));
  if (value && typeof value === 'object') return parseJsonObject(value, field);
  fail(`${field} must be JSON-safe`);
}

function optionalProp<K extends string, V>(key: K, value: V | undefined): Partial<Record<K, V>> {
  return value === undefined ? {} : { [key]: value } as Record<K, V>;
}

function fail(message: string): never {
  throw new ContractValidationError(message);
}
