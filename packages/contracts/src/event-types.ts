export const EVENT_TYPES = [
  'CASE_CREATED',
  'CASE_CLASSIFIED',
  'TASK_CREATED',
  'TASK_ASSIGNED',
  'TASK_BLOCKED',
  'TASK_COMPLETED',
  'EVIDENCE_ADDED',
  'EVIDENCE_VERIFIED',
  'EVIDENCE_CHALLENGED',
  'EVIDENCE_EXCLUDED',
  'MIZAN_STARTED',
  'MIZAN_COMPLETED',
  'LEGAL_REVIEW_COMPLETED',
  'ETHICAL_REVIEW_COMPLETED',
  'DECISION_APPROVED',
  'DECISION_REJECTED',
  'DECISION_UNRESOLVED',
  'LEDGER_APPENDED',
  'EXECUTION_STARTED',
  'EXECUTION_COMPLETED',
  'OPEN_BOOK_PUBLISHED',
  'NOTICE_ISSUED',
  'NOTICE_DELIVERED',
  'APPEAL_OPENED',
  'REMIZAN_STARTED',
  'CORRECTION_CREATED',
  'DECISION_REVERSED',
  'AUDIT_STARTED',
  'AUDIT_COMPLETED',
  'WHISTLEBLOWER_REPORT_RECEIVED',
  'KNOWLEDGE_CREATED',
  'KNOWLEDGE_CONTESTED',
  'KNOWLEDGE_SUPERSEDED',
  'POLICY_UPDATED',
  'OUTCOME_MEASURED'
] as const;

export type EventType = typeof EVENT_TYPES[number];

export interface EventTypeDescriptor {
  type: EventType;
  current_payload_version: number;
  supported_payload_versions: readonly number[];
  authority: string;
}

export const EVENT_TYPE_REGISTRY: readonly EventTypeDescriptor[] = Object.freeze(
  EVENT_TYPES.map((type) => Object.freeze({
    type,
    current_payload_version: 1,
    supported_payload_versions: Object.freeze([1]),
    authority: 'DHGS-BP-001@15.1.2#84'
  }))
);

const EVENT_TYPE_SET = new Set<string>(EVENT_TYPES);

export function isEventType(value: unknown): value is EventType {
  return typeof value === 'string' && EVENT_TYPE_SET.has(value);
}

export function getEventTypeDescriptor(type: EventType): EventTypeDescriptor {
  const descriptor = EVENT_TYPE_REGISTRY.find((entry) => entry.type === type);
  if (!descriptor) throw new Error(`Unknown event type: ${type}`);
  return descriptor;
}
