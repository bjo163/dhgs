import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import type { Pool, PoolClient } from 'pg';

export interface SqlMigration {
  id: string;
  sql: string;
  checksum: string;
}

export async function loadBundledMigrations(): Promise<SqlMigration[]> {
  const sql = await readFile(new URL('../migrations/0001_base.sql', import.meta.url), 'utf8');
  return [{ id: '0001_base', sql, checksum: sha256(sql) }];
}

export async function applyMigrations(pool: Pool, migrations?: readonly SqlMigration[]): Promise<void> {
  const list = migrations ?? await loadBundledMigrations();
  const client = await pool.connect();
  try {
    await ensureMigrationTable(client);
    for (const migration of list) await applyOne(client, migration);
  } finally {
    client.release();
  }
}

export async function currentMigrationState(pool: Pool): Promise<Array<{ id: string; checksum: string; appliedAt: string }>> {
  const client = await pool.connect();
  try {
    await ensureMigrationTable(client);
    const result = await client.query<{ id: string; checksum: string; applied_at: Date }>(
      'SELECT id, checksum, applied_at FROM dhgs.schema_migrations ORDER BY id'
    );
    return result.rows.map((row) => ({ id: row.id, checksum: row.checksum, appliedAt: row.applied_at.toISOString() }));
  } finally {
    client.release();
  }
}

async function ensureMigrationTable(client: PoolClient): Promise<void> {
  await client.query('CREATE SCHEMA IF NOT EXISTS dhgs');
  await client.query(`CREATE TABLE IF NOT EXISTS dhgs.schema_migrations (
    id text PRIMARY KEY,
    checksum text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
}

async function applyOne(client: PoolClient, migration: SqlMigration): Promise<void> {
  await client.query('BEGIN');
  try {
    await client.query(`SELECT pg_advisory_xact_lock(hashtext('dhgs.schema_migrations'))`);
    const existing = await client.query<{ checksum: string }>(
      'SELECT checksum FROM dhgs.schema_migrations WHERE id = $1',
      [migration.id]
    );
    if (existing.rows[0]) {
      if (existing.rows[0].checksum !== migration.checksum) {
        throw new Error(`Migration checksum mismatch: ${migration.id}`);
      }
      await client.query('COMMIT');
      return;
    }
    await client.query(migration.sql);
    await client.query(
      'INSERT INTO dhgs.schema_migrations (id, checksum) VALUES ($1, $2)',
      [migration.id, migration.checksum]
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}
