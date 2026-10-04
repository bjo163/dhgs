import type { OrmAdapter, AdapterQuery } from './adapter.js';
import type { ModelDefinition } from './model.js';
import type { BaseRecord, ModelContext } from './types.js';
import { compare, evaluateDomain } from './domain.js';
import { VersionConflictError } from './errors.js';

export class MemoryAdapter implements OrmAdapter {
  private readonly tables = new Map<string, Map<string, BaseRecord>>();

  async findMany<T extends BaseRecord>(model: ModelDefinition<T>, query: AdapterQuery, _context: ModelContext): Promise<T[]> {
    let rows = [...this.table(model.table).values()] as T[];
    rows = rows.filter((row) => evaluateDomain(row, query.domain ?? []));

    for (const order of [...(query.order ?? [])].reverse()) {
      rows.sort((a, b) => compare(
        (a as unknown as Record<string, unknown>)[order.field],
        (b as unknown as Record<string, unknown>)[order.field]
      ) * (order.direction === 'desc' ? -1 : 1));
    }

    const offset = query.offset ?? 0;
    return rows.slice(offset, query.limit == null ? undefined : offset + query.limit).map(clone);
  }

  async insert<T extends BaseRecord>(model: ModelDefinition<T>, record: T, _context: ModelContext): Promise<T> {
    const table = this.table(model.table);
    if (table.has(record.id)) throw new Error(`Duplicate id: ${record.id}`);
    table.set(record.id, clone(record));
    return clone(record);
  }

  async update<T extends BaseRecord>(model: ModelDefinition<T>, id: string, patch: Partial<T>, expectedVersion: number, _context: ModelContext): Promise<T> {
    const table = this.table(model.table);
    const current = table.get(id) as T | undefined;
    if (!current) throw new Error(`Record not found: ${model.name}/${id}`);
    if (current.version !== expectedVersion) {
      throw new VersionConflictError(`Version conflict: expected ${expectedVersion}, got ${current.version}`);
    }
    const next = { ...current, ...patch } as T;
    table.set(id, clone(next));
    return clone(next);
  }

  async transaction<R>(_context: ModelContext, work: (adapter: OrmAdapter) => Promise<R>): Promise<R> {
    const backup = cloneTables(this.tables);
    try {
      return await work(this);
    } catch (error) {
      this.tables.clear();
      for (const [table, rows] of backup) this.tables.set(table, rows);
      throw error;
    }
  }

  private table(name: string): Map<string, BaseRecord> {
    let table = this.tables.get(name);
    if (!table) {
      table = new Map();
      this.tables.set(name, table);
    }
    return table;
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function cloneTables(source: Map<string, Map<string, BaseRecord>>): Map<string, Map<string, BaseRecord>> {
  return new Map([...source].map(([table, rows]) => [
    table,
    new Map([...rows].map(([id, record]) => [id, clone(record)]))
  ]));
}
