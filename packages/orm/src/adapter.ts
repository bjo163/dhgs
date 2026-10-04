import type { BaseRecord, ModelContext } from './types.js';
import type { ModelDefinition } from './model.js';
import type { Domain, QueryOptions } from './domain.js';

export interface AdapterQuery extends QueryOptions {
  domain?: Domain;
}

export interface OrmAdapter {
  findMany<T extends BaseRecord>(
    model: ModelDefinition<T>,
    query: AdapterQuery,
    context: ModelContext
  ): Promise<T[]>;

  insert<T extends BaseRecord>(
    model: ModelDefinition<T>,
    record: T,
    context: ModelContext
  ): Promise<T>;

  update<T extends BaseRecord>(
    model: ModelDefinition<T>,
    id: string,
    patch: Partial<T>,
    expectedVersion: number,
    context: ModelContext
  ): Promise<T>;

  transaction<R>(
    context: ModelContext,
    work: (adapter: OrmAdapter) => Promise<R>
  ): Promise<R>;
}
