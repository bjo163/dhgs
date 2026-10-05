import type { ActorContext } from '@dhgs/contracts';
import { PostgresAdapter, applyContext } from '@dhgs/orm-postgres';
import type { Pool, PoolClient } from 'pg';
import { AsyncPostgresStore } from './store';

export async function withTransactionalOutbox<R>(
  pool: Pool,
  actor: ActorContext,
  work: (context: { client: PoolClient; orm: PostgresAdapter; asyncStore: AsyncPostgresStore }) => Promise<R>
): Promise<R> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await applyContext(client, {
      actorId: actor.actor_id,
      requestId: actor.request_id,
      correlationId: actor.correlation_id,
      purpose: actor.purpose,
      jurisdictionIds: [...(actor.jurisdiction_ids ?? [])],
      institutionId: actor.institution_id,
      identityAssurance: actor.identity_assurance,
      roles: [...(actor.roles ?? [])],
      permissions: [...(actor.permissions ?? [])],
      privileged: actor.privileged
    });
    const result = await work({ client, orm: new PostgresAdapter(client), asyncStore: new AsyncPostgresStore(client) });
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}
