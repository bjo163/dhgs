import { Pool, type PoolClient, type PoolConfig, type QueryResultRow } from 'pg';
import type { AdapterQuery, BaseRecord, ModelContext, ModelDefinition, OrmAdapter } from '@dhgs/orm';
import { VersionConflictError } from '@dhgs/orm';
import { compileSelect, quoteIdentifier, recordToColumns, rowToRecord } from './sql.js';

export interface PostgresAdapterOptions {
  applicationName?: string;
}

export class PostgresAdapter implements OrmAdapter {
  constructor(
    private readonly runner: Pool | PoolClient,
    private readonly options: PostgresAdapterOptions = {}
  ) {}

  async findMany<T extends BaseRecord>(model: ModelDefinition<T>, query: AdapterQuery, context: ModelContext): Promise<T[]> {
    return this.withContext(context, async (client) => {
      const compiled = compileSelect(model, query);
      const result = await client.query<Record<string, unknown> & QueryResultRow>(compiled.text, compiled.values);
      return result.rows.map((row) => rowToRecord(model, row));
    });
  }

  async insert<T extends BaseRecord>(model: ModelDefinition<T>, record: T, context: ModelContext): Promise<T> {
    return this.withContext(context, async (client) => {
      const columns = recordToColumns(model, record);
      const names = columns.map(([name]) => quoteIdentifier(name)).join(', ');
      const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
      const values = columns.map(([, value]) => value);
      const result = await client.query<Record<string, unknown> & QueryResultRow>(
        `INSERT INTO ${quoteIdentifier(model.table)} (${names}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      const row = result.rows[0];
      if (!row) throw new Error(`Insert did not return a row: ${model.name}`);
      return rowToRecord(model, row);
    });
  }

  async update<T extends BaseRecord>(
    model: ModelDefinition<T>,
    id: string,
    patch: Partial<T>,
    expectedVersion: number,
    context: ModelContext
  ): Promise<T> {
    return this.withContext(context, async (client) => {
      const columns = recordToColumns(model, patch);
      if (columns.length === 0) throw new Error(`Empty update patch: ${model.name}/${id}`);
      const assignments = columns.map(([name], index) => `${quoteIdentifier(name)} = $${index + 1}`).join(', ');
      const values = columns.map(([, value]) => value);
      values.push(id, expectedVersion);
      const result = await client.query<Record<string, unknown> & QueryResultRow>(
        `UPDATE ${quoteIdentifier(model.table)} SET ${assignments} WHERE "id" = $${values.length - 1} AND "version" = $${values.length} RETURNING *`,
        values
      );
      const row = result.rows[0];
      if (!row) {
        throw new VersionConflictError(`Version conflict or inaccessible row: ${model.name}/${id}`);
      }
      return rowToRecord(model, row);
    });
  }

  async transaction<R>(context: ModelContext, work: (adapter: OrmAdapter) => Promise<R>): Promise<R> {
    if (!isPool(this.runner)) {
      const savepoint = `dhgs_nested_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      await this.runner.query(`SAVEPOINT ${quoteIdentifier(savepoint)}`);
      try {
        const result = await work(this);
        await this.runner.query(`RELEASE SAVEPOINT ${quoteIdentifier(savepoint)}`);
        return result;
      } catch (error) {
        await this.runner.query(`ROLLBACK TO SAVEPOINT ${quoteIdentifier(savepoint)}`);
        throw error;
      }
    }

    const client = await this.runner.connect();
    try {
      await client.query('BEGIN');
      await applyContext(client, context, this.options.applicationName);
      const result = await work(new PostgresAdapter(client, this.options));
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await safeRollback(client);
      throw error;
    } finally {
      client.release();
    }
  }

  private async withContext<R>(context: ModelContext, work: (client: PoolClient) => Promise<R>): Promise<R> {
    if (!isPool(this.runner)) return work(this.runner);
    const client = await this.runner.connect();
    try {
      await client.query('BEGIN');
      await applyContext(client, context, this.options.applicationName);
      const result = await work(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await safeRollback(client);
      throw error;
    } finally {
      client.release();
    }
  }
}

export function createPostgresPool(config: PoolConfig): Pool {
  return new Pool(config);
}

export function createPostgresAdapter(config: PoolConfig, options: PostgresAdapterOptions = {}): { pool: Pool; adapter: PostgresAdapter } {
  const pool = createPostgresPool(config);
  return { pool, adapter: new PostgresAdapter(pool, options) };
}

export async function applyContext(client: PoolClient, context: ModelContext, applicationName = 'dhgs'): Promise<void> {
  const jurisdictions = JSON.stringify(context.jurisdictionIds ?? []);
  const values = [
    context.actorId ?? '',
    context.requestId ?? '',
    context.purpose ?? '',
    jurisdictions,
    context.institutionId ?? '',
    context.identityAssurance ?? '',
    JSON.stringify(context.roles ?? []),
    JSON.stringify(context.permissions ?? []),
    context.correlationId ?? '',
    context.transactionId ?? '',
    context.privileged ? 'true' : 'false',
    applicationName
  ];
  await client.query(
    `SELECT
      set_config('dhgs.actor_id', $1, true),
      set_config('dhgs.request_id', $2, true),
      set_config('dhgs.purpose', $3, true),
      set_config('dhgs.jurisdiction_ids', $4, true),
      set_config('dhgs.institution_id', $5, true),
      set_config('dhgs.identity_assurance', $6, true),
      set_config('dhgs.roles', $7, true),
      set_config('dhgs.permissions', $8, true),
      set_config('dhgs.correlation_id', $9, true),
      set_config('dhgs.transaction_id', $10, true),
      set_config('dhgs.privileged', $11, true),
      set_config('application_name', $12, true)`,
    values
  );
}

function isPool(runner: Pool | PoolClient): runner is Pool {
  return typeof (runner as Pool).connect === 'function' && typeof (runner as PoolClient).release !== 'function';
}

async function safeRollback(client: PoolClient): Promise<void> {
  try {
    await client.query('ROLLBACK');
  } catch {
    // Preserve the original failure; the pool will discard a broken connection when needed.
  }
}
