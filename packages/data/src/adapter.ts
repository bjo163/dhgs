import type { BaseRecord, DataContext, DataQuery } from './types.js';
import type { ModelDefinition } from './model.js';

export interface DataAdapter {
  findMany<T extends BaseRecord>(
    model: ModelDefinition<T>,
    query: DataQuery,
    context: DataContext
  ): Promise<T[]>;

  insert<T extends BaseRecord>(
    model: ModelDefinition<T>,
    record: T,
    context: DataContext
  ): Promise<T>;

  update<T extends BaseRecord>(
    model: ModelDefinition<T>,
    id: string,
    patch: Partial<T>,
    expectedVersion: number,
    context: DataContext
  ): Promise<T>;
}
