import { randomUUID } from 'node:crypto';
import type { DataAdapter } from './adapter.js';
import type { BaseRecord, DataContext, MutationSink } from './types.js';
import { ModelRegistry } from './registry.js';
import { Repository } from './repository.js';

export interface DataSessionOptions {
  now?: () => string;
  idFactory?: () => string;
  audit?: MutationSink;
  ledger?: MutationSink;
}

export class DataSession {
  constructor(
    private readonly adapter: DataAdapter,
    private readonly registry: ModelRegistry,
    readonly context: DataContext,
    private readonly options: DataSessionOptions = {}
  ) {}

  model<T extends BaseRecord>(name: string): Repository<T> {
    return new Repository<T>(this.registry.get<T>(name), this.adapter, this.context, {
      now: this.options.now ?? (() => new Date().toISOString()),
      id: this.options.idFactory ?? randomUUID,
      audit: this.options.audit,
      ledger: this.options.ledger
    });
  }
}
