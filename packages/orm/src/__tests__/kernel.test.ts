import { describe, expect, it } from 'vitest';
import {
  MemoryAdapter,
  ModelRegistry,
  createEnvironment,
  defineModel,
  fields,
  type BaseRecord,
  type MutationEvent
} from '../index.js';

interface DemoRecord extends BaseRecord {
  title: string;
  secret: string;
  category: 'a' | 'b';
  lockedCode: string;
}

const Demo = defineModel<DemoRecord>('demo.record', {
  table: 'demo_records',
  fields: {
    title: fields.string({ required: true }),
    secret: fields.string({ required: true, sensitive: true }),
    category: fields.enum(['a', 'b'], { required: true }),
    lockedCode: fields.string({ required: true, mutable: false })
  },
  governance: {
    jurisdictionScoped: true,
    institutionScoped: true,
    optimisticLock: true,
    audit: 'required',
    ledger: 'required',
    archiveOnly: true,
    allowUnarchive: true
  }
});

function fixture() {
  const registry = new ModelRegistry().register(Demo);
  const adapter = new MemoryAdapter();
  const audit: MutationEvent[] = [];
  const ledger: MutationEvent[] = [];
  let id = 0;
  const env = createEnvironment({
    adapter,
    registry,
    context: {
      actorId: 'ACTOR-1',
      purpose: 'TEST',
      requestId: 'REQ-1',
      identityAssurance: 'IA3_VERIFIED_OFFICIAL',
      jurisdictionIds: ['J-1'],
      institutionId: 'I-1',
      permissions: ['orm.unarchive']
    },
    runtime: {
      now: () => '2026-10-04T12:00:00.000Z',
      id: () => `ID-${++id}`,
      audit: (event) => { audit.push(event); },
      ledger: (event) => { ledger.push(event); }
    }
  });
  return { registry, adapter, audit, ledger, env, repo: env.model<DemoRecord>('demo.record') };
}

function values(overrides: Record<string, unknown> = {}) {
  return {
    title: 'Alpha',
    secret: 'protected',
    category: 'a',
    lockedCode: 'LOCK-1',
    jurisdictionId: 'J-1',
    institutionId: 'I-1',
    ...overrides
  };
}

describe('@dhgs/orm kernel', () => {
  it('enforces stable model registration', () => {
    const registry = new ModelRegistry().register(Demo);
    expect(registry.get('demo.record')).toBe(Demo);
    expect(() => registry.register(Demo)).toThrow('Model already registered');
    expect(() => registry.get('missing.record')).toThrow('Unknown model');
    expect(() => defineModel('invalid', { table: 'x', fields: {}, governance: {} })).toThrow('dot notation');
  });

  it('creates, searches, counts, reads and scopes records', async () => {
    const { env, repo } = fixture();
    const created = await repo.create(values());
    expect(created.version).toBe(1);
    expect(created.createdBy).toBe('ACTOR-1');
    expect(await repo.count([['category', '=', 'a']])).toBe(1);
    expect((await repo.browse(created.id))?.title).toBe('Alpha');
    expect((await repo.read([created.id]))).toHaveLength(1);

    const otherJurisdiction = env.withContext({ jurisdictionIds: ['J-2'] }).model<DemoRecord>('demo.record');
    expect(await otherJurisdiction.browse(created.id)).toBeNull();
    await expect(otherJurisdiction.create(values({ jurisdictionId: 'J-2' }))).resolves.toBeDefined();
  });

  it('rejects out-of-scope creation and missing material mutation context', async () => {
    const { env, repo } = fixture();
    await expect(repo.create(values({ jurisdictionId: 'J-9' }))).rejects.toThrow('outside jurisdiction scope');
    const incomplete = env.withContext({ actorId: undefined }).model<DemoRecord>('demo.record');
    await expect(incomplete.create(values())).rejects.toThrow('Material mutation context missing');
  });

  it('protects sensitive queries, immutable fields and optimistic versions', async () => {
    const { repo } = fixture();
    const created = await repo.create(values());
    await expect(repo.search([['secret', '=', 'protected']])).rejects.toThrow('Sensitive field');
    await expect(repo.write(created.id, { lockedCode: 'CHANGED' }, { expectedVersion: 1 })).rejects.toThrow('Immutable field');

    const updated = await repo.write(created.id, { title: 'Beta' }, { expectedVersion: 1 });
    expect(updated.version).toBe(2);
    await expect(repo.write(created.id, { title: 'Gamma' }, { expectedVersion: 1 })).rejects.toThrow('Version conflict');
  });

  it('archives without hard delete and uses controlled unarchive', async () => {
    const { env, repo } = fixture();
    const created = await repo.create(values());
    const archived = await repo.archive(created.id, { expectedVersion: 1 });
    expect(archived.archivedAt).not.toBeNull();
    expect(await repo.browse(created.id)).toBeNull();
    expect(await repo.browse(created.id, { includeArchived: true })).not.toBeNull();
    expect((repo as unknown as { delete?: unknown }).delete).toBeUndefined();

    const denied = env.withContext({ permissions: [] }).model<DemoRecord>('demo.record');
    await expect(denied.unarchive(created.id, { expectedVersion: 2 })).rejects.toThrow('Unarchive permission');
    const restored = await repo.unarchive(created.id, { expectedVersion: 2 });
    expect(restored.archivedAt).toBeNull();
  });

  it('emits decoupled audit and ledger mutation events', async () => {
    const { repo, audit, ledger } = fixture();
    const created = await repo.create(values());
    await repo.write(created.id, { title: 'Beta' }, { expectedVersion: 1 });
    await repo.archive(created.id, { expectedVersion: 2 });
    expect(audit.map((event) => event.operation)).toEqual(['CREATE', 'UPDATE', 'ARCHIVE']);
    expect(ledger.map((event) => event.operation)).toEqual(['CREATE', 'UPDATE', 'ARCHIVE']);
    expect(audit[0]?.requestId).toBe('REQ-1');
  });

  it('rolls back the in-memory adapter transaction on failure', async () => {
    const { env, repo } = fixture();
    await expect(env.transaction(async (trx) => {
      await trx.model<DemoRecord>('demo.record').create(values());
      throw new Error('rollback');
    })).rejects.toThrow('rollback');
    expect(await repo.count()).toBe(0);
  });
});
