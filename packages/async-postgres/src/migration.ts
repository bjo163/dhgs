import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import type { Pool, PoolClient } from 'pg';

interface Migration { id: string; sql: string; checksum: string; }

export async function loadAsyncMigrations(): Promise<Migration[]> {
  const sql = await readFile(new URL('../migrations/0001_async.sql', import.meta.url), 'utf8');
  return [{ id: '0001_async', sql, checksum: createHash('sha256').update(sql).digest('hex') }];
}

export async function applyAsyncMigrations(pool: Pool): Promise<void> {
  const client = await pool.connect();
  try {
    await ensureTable(client);
    for (const migration of await loadAsyncMigrations()) await applyOne(client, migration);
  } finally { client.release(); }
}

async function ensureTable(client: PoolClient): Promise<void> {
  await client.query('CREATE SCHEMA IF NOT EXISTS dhgs_async');
  await client.query(`CREATE TABLE IF NOT EXISTS dhgs_async.schema_migrations (
    id text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
  )`);
}

async function applyOne(client: PoolClient, migration: Migration): Promise<void> {
  await client.query('BEGIN');
  try {
    await client.query(`SELECT pg_advisory_xact_lock(hashtext('dhgs_async.schema_migrations'))`);
    const existing = await client.query<{ checksum: string }>('SELECT checksum FROM dhgs_async.schema_migrations WHERE id=$1', [migration.id]);
    if (existing.rows[0]) {
      if (existing.rows[0].checksum !== migration.checksum) throw new Error(`Async migration checksum mismatch: ${migration.id}`);
      await client.query('COMMIT'); return;
    }
    await client.query(migration.sql);
    await client.query('INSERT INTO dhgs_async.schema_migrations (id, checksum) VALUES ($1,$2)', [migration.id, migration.checksum]);
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; }
}
