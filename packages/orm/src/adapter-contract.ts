import type { OrmAdapter } from './adapter';
import type { ModelDefinition } from './model';
import type { BaseRecord, ModelContext } from './types';
import { VersionConflictError } from './errors';

export interface AdapterContractFixture<T extends BaseRecord> {
  adapter: OrmAdapter;
  model: ModelDefinition<T>;
  context: ModelContext;
  prefix: string;
  makeRecord: (id: string) => T;
  makePatch: (nextVersion: number) => Partial<T>;
}

/**
 * Reusable minimum contract shared by every DHGS ORM adapter.
 *
 * This intentionally exercises adapter semantics directly, below repository
 * policy, so storage implementations can be compared against the same rules.
 */
export async function verifyAdapterContract<T extends BaseRecord>(fixture: AdapterContractFixture<T>): Promise<void> {
  const { adapter, model, context, prefix, makeRecord, makePatch } = fixture;
  const firstId = `${prefix}-record`;
  const rollbackId = `${prefix}-rollback`;

  const inserted = await adapter.insert(model, makeRecord(firstId), context);
  assert(inserted.id === firstId, 'adapter insert must return the inserted record');
  assert(inserted.version === 1, 'adapter contract fixture must start at version 1');

  const found = await adapter.findMany(model, { domain: [['id', '=', firstId]] }, context);
  assert(found.length === 1 && found[0]?.id === firstId, 'adapter findMany must return inserted rows');

  const updated = await adapter.update(model, firstId, makePatch(2), 1, context);
  assert(updated.version === 2, 'adapter update must preserve caller-supplied next version');

  let staleRejected = false;
  try {
    await adapter.update(model, firstId, makePatch(3), 1, context);
  } catch (error) {
    if (!(error instanceof VersionConflictError)) throw error;
    staleRejected = true;
  }
  assert(staleRejected, 'adapter must reject stale expectedVersion values');

  const archivedAt = '2030-01-01T00:00:00.000Z';
  const archived = await adapter.update(
    model,
    firstId,
    { ...makePatch(3), archivedAt } as Partial<T>,
    2,
    context
  );
  assert(archived.version === 3 && archived.archivedAt != null, 'adapter must persist archive state through update');

  const marker = new Error('adapter-contract-rollback');
  let rolledBack = false;
  try {
    await adapter.transaction(context, async (transactional) => {
      await transactional.insert(model, makeRecord(rollbackId), context);
      throw marker;
    });
  } catch (error) {
    if (error !== marker) throw error;
    rolledBack = true;
  }
  assert(rolledBack, 'adapter transaction must propagate the original failure');

  const rollbackRows = await adapter.findMany(model, { domain: [['id', '=', rollbackId]] }, context);
  assert(rollbackRows.length === 0, 'adapter transaction must rollback writes on failure');
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`ORM adapter contract failed: ${message}`);
}
