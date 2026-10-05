import type { OrmAdapter, AdapterQuery } from './adapter';
import type { Domain, QueryOptions } from './domain';
import { validateDomain } from './domain';
import type { ModelDefinition } from './model';
import type { BaseRecord, ModelContext, MutationEvent, MutationSink } from './types';
import { applyDefaults, validateModelValues } from './fields';
import { HookConfigurationError, ImmutableFieldError, MutationContextError, ScopeError } from './errors';

export interface RepositoryRuntime {
  now: () => string;
  id: () => string;
  audit?: MutationSink;
  ledger?: MutationSink;
}

export interface WriteOptions {
  expectedVersion: number;
}

export interface SearchReadOptions extends QueryOptions {
  fields?: readonly string[];
}

export class Repository<T extends BaseRecord> {
  constructor(
    private readonly definition: ModelDefinition<T>,
    private readonly adapter: OrmAdapter,
    private readonly context: ModelContext,
    private readonly runtime: RepositoryRuntime
  ) {}

  get model(): ModelDefinition<T> {
    return this.definition;
  }

  async search(domain: Domain = [], options: QueryOptions = {}): Promise<T[]> {
    const query = this.scopeQuery(domain, options);
    return this.adapter.findMany(this.definition, query, this.context);
  }

  async searchRead(domain: Domain = [], options: SearchReadOptions = {}): Promise<Array<Partial<T>>> {
    const rows = await this.search(domain, options);
    if (!options.fields) return rows;
    return rows.map((row) => Object.fromEntries(options.fields!.map((field) => [field, (row as unknown as Record<string, unknown>)[field]])) as Partial<T>);
  }

  async count(domain: Domain = []): Promise<number> {
    return (await this.search(domain)).length;
  }

  async browse(id: string, options: { includeArchived?: boolean } = {}): Promise<T | null> {
    const [record] = await this.search([['id', '=', id]], { limit: 1, includeArchived: options.includeArchived });
    return record ?? null;
  }

  async read(ids: readonly string[], options: { includeArchived?: boolean } = {}): Promise<T[]> {
    if (ids.length === 0) return [];
    return this.search([['id', 'in', ids]], { includeArchived: options.includeArchived });
  }

  async create(values: Record<string, unknown>): Promise<T> {
    this.assertMutationReady();
    const prepared = applyDefaults(this.definition, values);
    validateModelValues(this.definition, prepared, { allowBaseFields: true });
    this.assertCreateScope(prepared);

    const actorId = this.context.actorId!;
    const now = this.runtime.now();
    const record = {
      ...prepared,
      id: this.runtime.id(),
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId,
      version: 1,
      archivedAt: null
    } as unknown as T;

    const inserted = await this.adapter.insert(this.definition, record, this.context);
    await this.emit('CREATE', inserted, Object.keys(prepared));
    return inserted;
  }

  async write(id: string, patch: Record<string, unknown>, options: WriteOptions): Promise<T> {
    this.assertMutationReady();
    this.assertMutable(patch);
    validateModelValues(this.definition, patch, { partial: true });
    const current = await this.requireScopedRecord(id, true);

    const updated = await this.adapter.update(
      this.definition,
      current.id,
      {
        ...patch,
        updatedAt: this.runtime.now(),
        updatedBy: this.context.actorId!,
        version: options.expectedVersion + 1
      } as Partial<T>,
      options.expectedVersion,
      this.context
    );
    await this.emit('UPDATE', updated, Object.keys(patch));
    return updated;
  }

  async archive(id: string, options: WriteOptions): Promise<T> {
    this.assertMutationReady();
    const current = await this.requireScopedRecord(id, true);
    const now = this.runtime.now();
    const updated = await this.adapter.update(
      this.definition,
      current.id,
      {
        archivedAt: now,
        updatedAt: now,
        updatedBy: this.context.actorId!,
        version: options.expectedVersion + 1
      } as Partial<T>,
      options.expectedVersion,
      this.context
    );
    await this.emit('ARCHIVE', updated, ['archivedAt']);
    return updated;
  }

  async unarchive(id: string, options: WriteOptions): Promise<T> {
    this.assertMutationReady();
    if (!this.definition.governance.allowUnarchive) {
      throw new ScopeError(`Unarchive is not allowed for ${this.definition.name}`);
    }
    if (!this.context.privileged && !this.context.permissions?.includes('orm.unarchive')) {
      throw new ScopeError(`Unarchive permission required for ${this.definition.name}`);
    }
    const current = await this.requireScopedRecord(id, true);
    const updated = await this.adapter.update(
      this.definition,
      current.id,
      {
        archivedAt: null,
        updatedAt: this.runtime.now(),
        updatedBy: this.context.actorId!,
        version: options.expectedVersion + 1
      } as Partial<T>,
      options.expectedVersion,
      this.context
    );
    await this.emit('UNARCHIVE', updated, ['archivedAt']);
    return updated;
  }

  private scopeQuery(domain: Domain, options: QueryOptions): AdapterQuery {
    validateDomain(this.definition, domain, this.context);
    const scoped: Domain = [...domain];
    const clauses = scoped as DomainNodeMutable[];

    if (!options.includeArchived) clauses.push(['archivedAt', '=', null]);

    if (!this.context.privileged && this.definition.governance.jurisdictionScoped) {
      const ids = this.context.jurisdictionIds ?? [];
      if (ids.length === 0) throw new ScopeError(`Jurisdiction context required for ${this.definition.name}`);
      clauses.push(['jurisdictionId', 'in', ids]);
    }

    if (!this.context.privileged && this.definition.governance.institutionScoped) {
      if (!this.context.institutionId) throw new ScopeError(`Institution context required for ${this.definition.name}`);
      clauses.push(['institutionId', '=', this.context.institutionId]);
    }

    return { ...options, domain: clauses as Domain };
  }

  private assertMutationReady(): void {
    const missing = ['actorId', 'purpose', 'requestId'].filter((key) => {
      const value = this.context[key as keyof ModelContext];
      return typeof value !== 'string' || value.trim().length === 0;
    });
    if (missing.length) throw new MutationContextError(`Material mutation context missing: ${missing.join(', ')}`);

    if (this.definition.governance.audit === 'required' && !this.runtime.audit) {
      throw new HookConfigurationError(`Audit sink required for ${this.definition.name}`);
    }
    if (this.definition.governance.ledger === 'required' && !this.runtime.ledger) {
      throw new HookConfigurationError(`Ledger sink required for ${this.definition.name}`);
    }
  }

  private assertCreateScope(values: Record<string, unknown>): void {
    if (this.context.privileged) return;
    if (this.definition.governance.jurisdictionScoped) {
      const jurisdictionId = values.jurisdictionId;
      const allowed = this.context.jurisdictionIds ?? [];
      if (typeof jurisdictionId !== 'string' || !allowed.includes(jurisdictionId)) {
        throw new ScopeError(`Cannot create ${this.definition.name} outside jurisdiction scope`);
      }
    }
    if (this.definition.governance.institutionScoped && values.institutionId !== this.context.institutionId) {
      throw new ScopeError(`Cannot create ${this.definition.name} outside institution scope`);
    }
  }

  private assertMutable(patch: Record<string, unknown>): void {
    const immutable = new Set([
      'id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'version', 'archivedAt',
      'jurisdictionId', 'institutionId',
      ...(this.definition.governance.immutableFields ?? [])
    ]);
    for (const [name, definition] of Object.entries(this.definition.fields)) {
      if (definition.mutable === false) immutable.add(name);
    }
    for (const field of Object.keys(patch)) {
      if (immutable.has(field)) throw new ImmutableFieldError(`Immutable field: ${this.definition.name}.${field}`);
    }
  }

  private async requireScopedRecord(id: string, includeArchived: boolean): Promise<T> {
    const record = await this.browse(id, { includeArchived });
    if (!record) throw new ScopeError(`Record not found or outside scope: ${this.definition.name}/${id}`);
    return record;
  }

  private async emit(operation: MutationEvent['operation'], record: T, changedFields: string[]): Promise<void> {
    const event: MutationEvent = {
      operation,
      model: this.definition.name,
      table: this.definition.table,
      recordId: record.id,
      actorId: this.context.actorId!,
      purpose: this.context.purpose!,
      requestId: this.context.requestId!,
      correlationId: this.context.correlationId,
      timestamp: this.runtime.now(),
      version: record.version,
      changedFields,
      jurisdictionId: record.jurisdictionId,
      institutionId: record.institutionId
    };

    if (this.definition.governance.audit !== 'none') await this.runtime.audit?.(event);
    if (this.definition.governance.ledger !== 'none') await this.runtime.ledger?.(event);
  }
}

type DomainNodeMutable = [string, '=' | '!=' | 'in' | 'not in' | '<' | '<=' | '>' | '>=' | 'contains', unknown] | { and: readonly unknown[] } | { or: readonly unknown[] } | { not: unknown };
