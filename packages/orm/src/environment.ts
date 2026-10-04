import { randomUUID } from 'node:crypto';
import type { OrmAdapter } from './adapter';
import type { BaseRecord, ModelContext, MutationSink } from './types';
import { ModelRegistry } from './registry';
import { Repository } from './repository';

export interface OrmRuntime {
  now?: () => string;
  id?: () => string;
  audit?: MutationSink;
  ledger?: MutationSink;
}

export interface EnvironmentOptions {
  adapter: OrmAdapter;
  registry: ModelRegistry;
  context: ModelContext;
  runtime?: OrmRuntime;
}

export class Environment {
  constructor(
    private readonly adapter: OrmAdapter,
    private readonly registry: ModelRegistry,
    readonly context: ModelContext,
    private readonly runtime: OrmRuntime = {}
  ) {}

  model<T extends BaseRecord>(name: string): Repository<T> {
    return new Repository<T>(this.registry.get<T>(name), this.adapter, this.context, {
      now: this.runtime.now ?? (() => new Date().toISOString()),
      id: this.runtime.id ?? randomUUID,
      audit: this.runtime.audit,
      ledger: this.runtime.ledger
    });
  }

  withContext(patch: Partial<ModelContext>): Environment {
    return new Environment(this.adapter, this.registry, { ...this.context, ...patch }, this.runtime);
  }

  async transaction<R>(work: (environment: Environment) => Promise<R>): Promise<R> {
    return this.adapter.transaction(this.context, async (adapter) =>
      work(new Environment(adapter, this.registry, this.context, this.runtime))
    );
  }
}

export function createEnvironment(options: EnvironmentOptions): Environment {
  return new Environment(options.adapter, options.registry, options.context, options.runtime);
}
