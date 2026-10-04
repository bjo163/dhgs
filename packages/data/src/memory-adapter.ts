import type { DataAdapter } from './adapter.js';
import type { ModelDefinition } from './model.js';
import type { BaseRecord, DataContext, DataQuery, QueryFilter } from './types.js';

export class MemoryAdapter implements DataAdapter {
  private readonly tables = new Map<string, Map<string, BaseRecord>>();

  async findMany<T extends BaseRecord>(model: ModelDefinition<T>, query: DataQuery, _context: DataContext): Promise<T[]> {
    let rows = [...this.table(model.table).values()] as T[];
    for (const filter of query.filters ?? []) rows = rows.filter((row) => matches(row, filter));
    for (const order of [...(query.orderBy ?? [])].reverse()) {
      rows.sort((a, b) => compare((a as Record<string, unknown>)[order.field], (b as Record<string, unknown>)[order.field]) * (order.direction === 'desc' ? -1 : 1));
    }
    const offset = query.offset ?? 0;
    return rows.slice(offset, query.limit ? offset + query.limit : undefined).map(clone);
  }

  async insert<T extends BaseRecord>(model: ModelDefinition<T>, record: T, _context: DataContext): Promise<T> {
    const table = this.table(model.table);
    if (table.has(record.id)) throw new Error(`Duplicate id: ${record.id}`);
    table.set(record.id, clone(record));
    return clone(record);
  }

  async update<T extends BaseRecord>(model: ModelDefinition<T>, id: string, patch: Partial<T>, expectedVersion: number, _context: DataContext): Promise<T> {
    const table = this.table(model.table);
    const current = table.get(id) as T | undefined;
    if (!current) throw new Error(`Record not found: ${model.name}/${id}`);
    if (current.version !== expectedVersion) {
      throw new Error(`Version conflict: expected ${expectedVersion}, got ${current.version}`);
    }
    const next = { ...current, ...patch } as T;
    table.set(id, clone(next));
    return clone(next);
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

function matches(record: BaseRecord, filter: QueryFilter): boolean {
  const value = (record as unknown as Record<string, unknown>)[filter.field];
  switch (filter.operator) {
    case 'eq': return value === filter.value;
    case 'neq': return value !== filter.value;
    case 'in': return Array.isArray(filter.value) && filter.value.includes(value);
    case 'lt': return compare(value, filter.value) < 0;
    case 'lte': return compare(value, filter.value) <= 0;
    case 'gt': return compare(value, filter.value) > 0;
    case 'gte': return compare(value, filter.value) >= 0;
  }
}

function compare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  return String(a) < String(b) ? -1 : 1;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}
