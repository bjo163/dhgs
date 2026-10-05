import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import {
  createEnvironment,
  ModelRegistry,
  verifyAdapterContract,
  type BaseRecord,
  type ModelDefinition,
  type MutationEvent
} from '@dhgs/orm';
import { Institution, baseModels } from '@dhgs/orm-base';
import { applyMigrations, currentMigrationState } from '../migration.js';
import { PostgresAdapter } from '../postgres-adapter.js';

type InstitutionRecord = BaseRecord & {
  code: string;
  name: string;
  kind: 'GOVERNANCE' | 'OVERSIGHT' | 'OPERATOR' | 'AUDIT' | 'OTHER';
  parentInstitutionId?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SANDBOX';
};

type TagRecord = BaseRecord & {
  code: string;
  name: string;
  description?: string | null;
};

const InstitutionModel = Institution as ModelDefinition<InstitutionRecord>;
const registry = new ModelRegistry();
for (const model of baseModels) registry.register(model);
let recordSequence = 0;

const adminUrl = process.env.PG_ADMIN_URL;
const appUrl = process.env.PG_APP_URL ?? 'postgres://dhgs_app:dhgs_app@127.0.0.1:5432/dhgs';
const suite = adminUrl ? describe : describe.skip;

suite('@dhgs/orm-postgres integration', () => {
  const admin = new Pool({ connectionString: adminUrl });
  const app = new Pool({ connectionString: appUrl });

  beforeAll(async () => {
    await resetDatabase(admin);
    await admin.query('CREATE TABLE base_tags (id text PRIMARY KEY)');
    await admin.query("INSERT INTO base_tags (id) VALUES ('legacy-row')");
    await expect(applyMigrations(admin)).rejects.toThrow('DHGS_MIGRATION_REQUIRES_MANUAL_BACKFILL');
    await admin.query('DROP TABLE base_tags');
    await applyMigrations(admin);
    await createAppRole(admin);
  });

  afterAll(async () => {
    await app.end();
    await admin.end();
  });

  it('applies explicit migrations once and preserves checksum state', async () => {
    const first = await currentMigrationState(admin);
    expect(first.map((item) => item.id)).toEqual(['0001_base']);
    await applyMigrations(admin);
    expect((await currentMigrationState(admin))[0]?.checksum).toBe(first[0]?.checksum);
  });

  it('passes the common ORM adapter contract', async () => {
    const now = '2026-10-04T00:00:00.000Z';
    await verifyAdapterContract({
      adapter: new PostgresAdapter(app),
      model: InstitutionModel,
      context: { actorId: 'ACTOR-1', purpose: 'CONTRACT', requestId: 'REQ-PG-CONTRACT', jurisdictionIds: ['J-1'] },
      prefix: 'PG-CONTRACT',
      makeRecord: (id): InstitutionRecord => ({
        id,
        code: id,
        name: 'Contract Institution',
        kind: 'OTHER',
        parentInstitutionId: null,
        status: 'SANDBOX',
        createdAt: now,
        updatedAt: now,
        createdBy: 'ACTOR-1',
        updatedBy: 'ACTOR-1',
        version: 1,
        archivedAt: null,
        jurisdictionId: 'J-1',
        institutionId: null
      }),
      makePatch: (version) => ({ name: `Contract Institution v${version}`, updatedAt: now, version })
    });
  });

  it('supports scoped CRUD/archive and optimistic version conflicts', async () => {
    const { repo } = fixture(app, ['J-1']);
    const created = await repo.create({
      code: 'INST-1', name: 'Institution One', kind: 'GOVERNANCE', status: 'SANDBOX', jurisdictionId: 'J-1'
    });
    expect(created.version).toBe(1);
    const updated = await repo.write(created.id, { name: 'Institution One Updated' }, { expectedVersion: 1 });
    expect(updated.version).toBe(2);
    await expect(repo.write(created.id, { name: 'stale' }, { expectedVersion: 1 })).rejects.toThrow('Version conflict');
    const archived = await repo.archive(created.id, { expectedVersion: 2 });
    expect(archived.archivedAt).not.toBeNull();
    expect(await repo.browse(created.id)).toBeNull();
  });

  it('enforces database RLS independently from repository scoping', async () => {
    const { repo, adapter, context } = fixture(app, ['J-1']);
    const created = await repo.create({
      code: 'INST-RLS', name: 'RLS Institution', kind: 'OVERSIGHT', status: 'SANDBOX', jurisdictionId: 'J-1'
    });

    const crossContext = { ...context, jurisdictionIds: ['J-2'], requestId: 'REQ-CROSS' };
    const directRead = await adapter.findMany(
      InstitutionModel,
      { domain: [['id', '=', created.id]], includeArchived: true },
      crossContext
    );
    expect(directRead).toEqual([]);

    const now = new Date().toISOString();
    await expect(adapter.insert(InstitutionModel, {
      id: 'RLS-DENIED', createdAt: now, updatedAt: now, createdBy: 'ACTOR-1', updatedBy: 'ACTOR-1',
      version: 1, archivedAt: null, jurisdictionId: 'J-2', institutionId: null,
      code: 'DENIED', name: 'Denied', kind: 'OTHER', parentInstitutionId: null, status: 'SANDBOX'
    }, context)).rejects.toThrow();
  });

  it('rolls back ORM transactions on failure', async () => {
    const audit: MutationEvent[] = [];
    const env = createEnvironment({
      adapter: new PostgresAdapter(app),
      registry,
      context: { actorId: 'ACTOR-1', purpose: 'TEST', requestId: 'REQ-TX', jurisdictionIds: ['J-1'] },
      runtime: {
        now: () => new Date().toISOString(),
        id: () => `TAG-${++recordSequence}`,
        audit: (event) => { audit.push(event); }
      }
    });
    await expect(env.transaction(async (trx) => {
      await trx.model<TagRecord>('base.tag').create({ code: 'TX-ROLLBACK', name: 'Rollback tag' });
      throw new Error('rollback');
    })).rejects.toThrow('rollback');
    expect(await env.model<TagRecord>('base.tag').count([['code', '=', 'TX-ROLLBACK']])).toBe(0);
  });
});

function fixture(pool: Pool, jurisdictionIds: string[]) {
  const audit: MutationEvent[] = [];
  const context = {
    actorId: 'ACTOR-1',
    purpose: 'TEST',
    requestId: `REQ-${jurisdictionIds.join('-')}-${++recordSequence}`,
    jurisdictionIds
  };
  const adapter = new PostgresAdapter(pool);
  const env = createEnvironment({
    adapter,
    registry,
    context,
    runtime: {
      now: () => new Date().toISOString(),
      id: () => `ID-${jurisdictionIds.join('-')}-${++recordSequence}`,
      audit: (event) => { audit.push(event); },
      ledger: (event) => { audit.push(event); }
    }
  });
  return { env, repo: env.model<InstitutionRecord>('base.institution'), adapter, context };
}

async function resetDatabase(pool: Pool): Promise<void> {
  const tables = [
    'base_audit_references','base_external_ids','base_translations','base_notifications','base_activities','base_tag_links',
    'base_tags','base_attachments','base_sequences','base_delegations','base_authority_mandates','base_group_memberships',
    'base_access_groups','base_user_profiles','base_parties','base_institutions','base_jurisdictions'
  ];
  for (const table of tables) await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
  await pool.query('DROP SCHEMA IF EXISTS dhgs CASCADE');
  await pool.query('DROP ROLE IF EXISTS dhgs_app');
}

async function createAppRole(pool: Pool): Promise<void> {
  await pool.query("CREATE ROLE dhgs_app LOGIN PASSWORD 'dhgs_app' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS");
  await pool.query('GRANT USAGE ON SCHEMA public, dhgs TO dhgs_app');
  await pool.query('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO dhgs_app');
  await pool.query('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA dhgs TO dhgs_app');
}
