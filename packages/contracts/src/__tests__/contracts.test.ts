import { describe, expect, it } from 'vitest';
import {
  CONTRACT_SCHEMA_VERSION,
  CONTRACT_SCHEMAS,
  EVENT_TYPES,
  SCHEMA_EVOLUTION_RULES,
  actorContextSchema,
  createEvent,
  decisionContextSnapshotSchema,
  eventSchema,
  type ActorContext
} from '../index';

const actor: ActorContext = {
  actor_id: 'actor-1',
  request_id: 'req-1',
  correlation_id: 'corr-1',
  purpose: 'contract-test',
  identity_assurance: 'IA3_VERIFIED_OFFICIAL',
  jurisdiction_ids: ['jur-1'],
  roles: ['reviewer']
};

describe('@dhgs/contracts', () => {
  it('exposes the canonical Blueprint event type registry', () => {
    expect(EVENT_TYPES).toHaveLength(35);
    expect(EVENT_TYPES[0]).toBe('CASE_CREATED');
    expect(EVENT_TYPES).toContain('DECISION_UNRESOLVED');
    expect(EVENT_TYPES.at(-1)).toBe('OUTCOME_MEASURED');
  });

  it('round-trips canonical JSON deterministically', () => {
    const parsed = actorContextSchema.parse(actor);
    const serialized = actorContextSchema.serialize(parsed);
    expect(actorContextSchema.deserialize(serialized)).toEqual(parsed);
    expect(serialized.indexOf('actor_id')).toBeLessThan(serialized.indexOf('request_id'));
  });

  it('creates events with request and correlation IDs propagated from actor context', () => {
    const event = createEvent({
      event_id: 'evt-1',
      event_type: 'CASE_CREATED',
      actor,
      timestamp: '2026-10-05T00:00:00.000Z',
      case_ref: { case_id: 'case-1', case_version: 1 },
      source_module: 'case',
      payload_version: 1,
      payload: { case_id: 'case-1' }
    });
    expect(event.schema_version).toBe(CONTRACT_SCHEMA_VERSION);
    expect(event.request_id).toBe(actor.request_id);
    expect(event.correlation_id).toBe(actor.correlation_id);
  });

  it('rejects invalid event payloads and unknown versions', () => {
    const base = {
      schema_version: CONTRACT_SCHEMA_VERSION,
      event_id: 'evt-2',
      event_type: 'CASE_CREATED',
      actor,
      timestamp: '2026-10-05T00:00:00.000Z',
      source_module: 'case',
      request_id: actor.request_id,
      correlation_id: actor.correlation_id
    } as const;
    expect(() => eventSchema.parse({ ...base, payload_version: 1, payload: 'not-an-object' })).toThrow(/payload must be an object/);
    expect(() => eventSchema.parse({ ...base, payload_version: 2, payload: {} })).toThrow(/unsupported payload_version/);
    expect(() => eventSchema.parse({ ...base, event_type: 'UNKNOWN_EVENT', payload_version: 1, payload: {} })).toThrow(/unknown/);
    expect(() => eventSchema.parse({ ...base, schema_version: '2.0.0', payload_version: 1, payload: {} })).toThrow(/unsupported schema_version/);
  });

  it('rejects correlation or request identity drift', () => {
    const event = createEvent({
      event_id: 'evt-3',
      event_type: 'TASK_CREATED',
      actor,
      timestamp: '2026-10-05T00:00:00.000Z',
      source_module: 'work',
      payload_version: 1,
      payload: { task_id: 'task-1' }
    });
    expect(() => eventSchema.parse({ ...event, request_id: 'req-other' })).toThrow(/request_id must match/);
    expect(() => eventSchema.parse({ ...event, correlation_id: 'corr-other' })).toThrow(/correlation_id must match/);
  });

  it('accepts additive payload fields without silently accepting a breaking payload version', () => {
    const oldShape = createEvent({
      event_id: 'evt-old',
      event_type: 'CASE_CLASSIFIED',
      actor,
      timestamp: '2026-10-05T00:00:00.000Z',
      source_module: 'case',
      payload_version: 1,
      payload: { classification: 'A' }
    });
    const additiveShape = eventSchema.parse({
      ...oldShape,
      event_id: 'evt-new',
      payload: { classification: 'A', rationale: 'optional additive field' }
    });
    expect(additiveShape.payload.rationale).toBe('optional additive field');
    expect(SCHEMA_EVOLUTION_RULES.breaking_event_payload_change_requires_new_payload_version).toBe(true);
    expect(() => eventSchema.parse({ ...additiveShape, payload_version: 2 })).toThrow(/unsupported payload_version/);
  });

  it('validates decision context snapshots with explicit source versions', () => {
    const snapshot = decisionContextSnapshotSchema.parse({
      snapshot_id: 'snap-1',
      schema_version: CONTRACT_SCHEMA_VERSION,
      decision_ref: { decision_id: 'decision-1', case_id: 'case-1', decision_version: 1 },
      captured_at: '2026-10-05T00:00:00.000Z',
      actor,
      legal_basis_refs: ['law-1@2026-01-01'],
      evidence_refs: [{ evidence_id: 'evidence-1', case_id: 'case-1', evidence_version: 2 }],
      policy_refs: ['policy-1@1.2.0'],
      source_versions: { corpus: 'snapshot-7', policy: '1.2.0' }
    });
    expect(snapshot.source_versions.policy).toBe('1.2.0');
  });

  it('publishes all ten canonical schemas from one package surface', () => {
    expect(Object.keys(CONTRACT_SCHEMAS).sort()).toEqual([
      'ActorContext',
      'CaseRef',
      'DecisionContextSnapshot',
      'DecisionRef',
      'Event',
      'EvidenceRef',
      'Notice',
      'Outcome',
      'PublicRecordRef',
      'TaskRef'
    ]);
  });
});
