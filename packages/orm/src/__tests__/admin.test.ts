import { describe, expect, it } from 'vitest';
import {
  AdminAuthorizationError,
  GeneratedUiError,
  MemoryAdapter,
  createEnvironment,
  defineAddon,
  defineModel,
  defineView,
  executeGeneratedAdminMutation,
  fields,
  installAddons,
  resolveGeneratedAdminMetadata,
  type BaseRecord
} from '../index.js';

const LowRisk = defineModel<BaseRecord>('test.low_risk', {
  table: 'test_low_risk',
  fields: {
    code: fields.string({ required: true, mutable: false }),
    name: fields.string({ required: true }),
    relationId: fields.belongsTo('test.other'),
    secret: fields.string({ sensitive: true }),
    writeToken: fields.string({ writeOnly: true }),
    hiddenNote: fields.text({ hidden: true })
  },
  governance: {}
});

const Other = defineModel<BaseRecord>('test.other', { table: 'test_other', fields: { name: fields.string() }, governance: {} });
const HighRisk = defineModel<BaseRecord>('mizan.assessment', { table: 'mizan_assessments', fields: { status: fields.string() }, governance: {} });
const Decision = defineModel<BaseRecord>('decision.record', { table: 'decision_records', fields: { status: fields.string() }, governance: {} });

const lowRiskViews = [
  defineView({ id: 'test.low_list', model: 'test.low_risk', kind: 'list', title: 'Low risk', fields: ['code', 'name', 'relationId'] }),
  defineView({ id: 'test.low_form', model: 'test.low_risk', kind: 'form', title: 'Low risk form', fields: ['code', 'name', 'relationId'] }),
  defineView({ id: 'test.low_search', model: 'test.low_risk', kind: 'search', title: 'Search low risk', fields: ['code', 'name'] })
];

const manifest = defineAddon({
  name: 'test_admin', version: '0.1.0', models: [LowRisk, Other, HighRisk, Decision], views: lowRiskViews,
  uiPolicies: {
    'test.low_risk': { generated: 'allowed', create: true, write: true, archive: true },
    'test.other': { generated: 'read_only' },
    'mizan.assessment': { generated: 'prohibited' },
    'decision.record': { generated: 'prohibited' }
  }
});

const registry = installAddons([manifest]);

describe('generated admin metadata and policy gate', () => {
  it('validates view metadata and rejects malformed definitions', () => {
    expect(() => defineView({ id: 'Bad View', model: 'test.low_risk', kind: 'list', title: 'Bad' })).toThrow('Invalid view id');
    expect(() => defineView({ id: 'test.bad', model: 'invalid', kind: 'list', title: 'Bad' })).toThrow('dot notation');
  });

  it('resolves list/form/search metadata without leaking hidden or sensitive fields', () => {
    const metadata = resolveGeneratedAdminMetadata(manifest, registry, 'test.low_risk');
    expect(metadata.views.map((view) => view.kind).sort()).toEqual(['form', 'list', 'search']);
    expect(metadata.fields.map((field) => field.name)).toEqual(expect.arrayContaining(['code', 'name', 'relationId']));
    expect(metadata.fields.map((field) => field.name)).not.toEqual(expect.arrayContaining(['secret', 'writeToken', 'hiddenNote']));
    expect(metadata.fields.find((field) => field.name === 'relationId')?.relation).toBe('test.other');
    expect(metadata.fields.find((field) => field.name === 'code')?.immutable).toBe(true);
    expect(metadata.capabilities).toEqual({ create: true, write: true, archive: true });
  });

  it('rejects unknown or non-public fields if a view attempts to expose them', () => {
    const invalidUnknown = defineAddon({
      name: 'bad_unknown', version: '0.1.0', models: [LowRisk],
      views: [defineView({ id: 'bad.unknown', model: 'test.low_risk', kind: 'list', title: 'Bad', fields: ['missing'] })],
      uiPolicies: { 'test.low_risk': { generated: 'read_only' } }
    });
    expect(() => resolveGeneratedAdminMetadata(invalidUnknown, installAddons([invalidUnknown]), 'test.low_risk')).toThrow('unknown field');

    const invalidSecret = defineAddon({
      name: 'bad_secret', version: '0.1.0', models: [LowRisk],
      views: [defineView({ id: 'bad.secret', model: 'test.low_risk', kind: 'list', title: 'Bad', fields: ['secret'] })],
      uiPolicies: { 'test.low_risk': { generated: 'read_only' } }
    });
    expect(() => resolveGeneratedAdminMetadata(invalidSecret, installAddons([invalidSecret]), 'test.low_risk')).toThrow('non-public field');
  });

  it('fails closed for prohibited governance models', () => {
    expect(() => resolveGeneratedAdminMetadata(manifest, registry, 'mizan.assessment')).toThrow(GeneratedUiError);
    expect(() => resolveGeneratedAdminMetadata(manifest, registry, 'decision.record')).toThrow(GeneratedUiError);
  });

  it('requires backend authorization even when generated UI policy allows mutation', async () => {
    const environment = createEnvironment({
      adapter: new MemoryAdapter(), registry,
      context: { actorId: 'ACTOR-1', purpose: 'ADMIN_TEST', requestId: 'REQ-DENY' },
      runtime: { now: () => '2026-10-04T00:00:00.000Z', id: () => 'ROW-1' }
    });
    await expect(executeGeneratedAdminMutation({
      manifest, registry, environment, model: 'test.low_risk', operation: 'create',
      values: { code: 'LOW-1', name: 'Denied' }, authorize: () => false
    })).rejects.toThrow(AdminAuthorizationError);
    expect(await environment.model('test.low_risk').count()).toBe(0);
  });

  it('allows an authorized low-risk mutation but blocks hidden-field injection', async () => {
    let sequence = 0;
    const environment = createEnvironment({
      adapter: new MemoryAdapter(), registry,
      context: { actorId: 'ACTOR-1', purpose: 'ADMIN_TEST', requestId: 'REQ-ALLOW' },
      runtime: { now: () => '2026-10-04T00:00:00.000Z', id: () => `ROW-${++sequence}` }
    });
    const created = await executeGeneratedAdminMutation<BaseRecord>({
      manifest, registry, environment, model: 'test.low_risk', operation: 'create',
      values: { code: 'LOW-1', name: 'Allowed' }, authorize: () => true
    });
    expect(created.id).toBe('ROW-1');
    await expect(executeGeneratedAdminMutation({
      manifest, registry, environment, model: 'test.low_risk', operation: 'write', recordId: created.id,
      expectedVersion: 1, values: { secret: 'inject' }, authorize: () => true
    })).rejects.toThrow('not writable through generic admin');
  });
});
