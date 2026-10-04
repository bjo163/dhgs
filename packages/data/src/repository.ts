import type { DataAdapter } from './adapter.js';
import type { ModelDefinition } from './model.js';
import type { BaseRecord, DataContext, DataQuery, MutationEvent, MutationSink, QueryFilter } from './types.js';

export interface RepositoryRuntime {
  now: () => string;
  id: () => string;
  audit?: MutationSink;
  ledger?: MutationSink;
}

export interface UpdateOptions {
  expectedVersion: number;
}

export class Repository<T extends BaseRecord> {
  constructor(
    private readonly modelDefinition: ModelDefinition<T>,
    private readonly adapter: DataAdapter,
    private readonly context: DataContext,
    private readonly runtime: RepositoryRuntime
  ) {}

  get model(): ModelDefinition<T> {
    return this.modelDefinition;
  }

  async list(query: DataQuery = {}): Promise<T[]> {
    return this.adapter.findMany(this.modelDefinition, this.scopeQuery(query), this.context);
  }

  async findById(id: string): Promise<T | null> {
    const [record] = await this.list({ filters: [{ field: 'id', operator: 'eq', value: id }], limit: 1 });
    return record ?? null;
  }

  async create(values: Omit<Partial<T>, keyof BaseRecord> & Partial<Pick<BaseRecord, 'jurisdictionId' | 'institutionId'>>): Promise<T> {
    this.assertCreateScope(values);
    const now = this.runtime.now();
    const record = {
      ...values,
      id: this.runtime.id(),
      createdAt: now,
      updatedAt: now,
      version: 1,
      archivedAt: null
    } as T;

    const inserted = await this.adapter.insert(this.modelDefinition, record, this.context);
    await this.emit('CREATE', inserted, Object.keys(values));
    return inserted;
  }

  async update(id: string, patch: Partial<Omit<T, keyof BaseRecord>>, options: UpdateOptions): Promise<T> {
    this.assertMutable(patch as Record<string, unknown>);
    const scoped = await this.findById(id);
    if (!scoped) throw new Error(`Record not found or outside scope: ${this.modelDefinition.name}/${id}`);

    const updatePatch = {
      ...patch,
      updatedAt: this.runtime.now(),
      version: options.expectedVersion + 1
    } as Partial<T>;

    const updated = await this.adapter.update(
      this.modelDefinition,
      id,
      updatePatch,
      options.expectedVersion,
      this.context
    );
    await this.emit('UPDATE', updated, Object.keys(patch as object));
    return updated;
  }

  async archive(id: string, options: UpdateOptions): Promise<T> {
    const scoped = await this.findById(id);
    if (!scoped) throw new Error(`Record not found or outside scope: ${this.modelDefinition.name}/${id}`);

    const updated = await this.adapter.update(
      this.modelDefinition,
      id,
      {
        archivedAt: this.runtime.now(),
        updatedAt: this.runtime.now(),
        version: options.expectedVersion + 1
      } as Partial<T>,
      options.expectedVersion,
      this.context
    );
    await this.emit('ARCHIVE', updated, ['archivedAt']);
    return updated;
  }

  private scopeQuery(query: DataQuery): DataQuery {
    const filters: QueryFilter[] = [...(query.filters ?? [])];
    const governance = this.modelDefinition.governance;

    if (!query.includeArchived) filters.push({ field: 'archivedAt', operator: 'eq', value: null });

    if (!this.context.privileged && governance.jurisdictionScoped) {
      const ids = this.context.jurisdictionIds ?? [];
      if (ids.length === 0) throw new Error(`Jurisdiction context required for ${this.modelDefinition.name}`);
      filters.push({ field: 'jurisdictionId', operator: 'in', value: ids });
    }

    if (!this.context.privileged && governance.institutionScoped) {
      if (!this.context.institutionId) throw new Error(`Institution context required for ${this.modelDefinition.name}`);
      filters.push({ field: 'institutionId', operator: 'eq', value: this.context.institutionId });
    }

    return { ...query, filters };
  }

  private assertCreateScope(values: Partial<BaseRecord>): void {
    const governance = this.modelDefinition.governance;
    if (this.context.privileged) return;

    if (governance.jurisdictionScoped) {
      const jurisdictionId = values.jurisdictionId;
      const allowed = this.context.jurisdictionIds ?? [];
      if (!jurisdictionId || !allowed.includes(jurisdictionId)) {
        throw new Error(`Cannot create ${this.modelDefinition.name} outside jurisdiction scope`);
      }
    }

    if (governance.institutionScoped && values.institutionId !== this.context.institutionId) {
      throw new Error(`Cannot create ${this.modelDefinition.name} outside institution scope`);
    }
  }

  private assertMutable(patch: Record<string, unknown>): void {
    const immutable = new Set([
      'id', 'createdAt', 'version', 'archivedAt',
      ...(this.modelDefinition.governance.immutableFields ?? [])
    ]);
    for (const field of Object.keys(patch)) {
      if (immutable.has(field)) throw new Error(`Immutable field: ${this.modelDefinition.name}.${field}`);
    }
  }

  private async emit(operation: MutationEvent['operation'], record: T, changedFields: string[]): Promise<void> {
    const event: MutationEvent = {
      operation,
      model: this.modelDefinition.name,
      table: this.modelDefinition.table,
      recordId: record.id,
      actorId: this.context.actorId,
      purpose: this.context.purpose,
      requestId: this.context.requestId,
      timestamp: this.runtime.now(),
      version: record.version,
      changedFields,
      jurisdictionId: record.jurisdictionId,
      institutionId: record.institutionId
    };

    if (this.modelDefinition.governance.audit === 'required') await this.runtime.audit?.(event);
    if (this.modelDefinition.governance.ledger === 'required') await this.runtime.ledger?.(event);
  }
}
