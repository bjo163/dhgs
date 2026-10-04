export type Id = string;

export interface BaseRecord {
  id: Id;
  createdAt: string;
  updatedAt: string;
  version: number;
  archivedAt: string | null;
  jurisdictionId?: string | null;
  institutionId?: string | null;
}

export interface DataContext {
  actorId: string;
  purpose: string;
  requestId: string;
  jurisdictionIds?: readonly string[];
  institutionId?: string | null;
  privileged?: boolean;
}

export type FilterOperator = 'eq' | 'neq' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

export interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface QueryOrder {
  field: string;
  direction?: 'asc' | 'desc';
}

export interface DataQuery {
  filters?: readonly QueryFilter[];
  orderBy?: readonly QueryOrder[];
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
}

export type MutationOperation = 'CREATE' | 'UPDATE' | 'ARCHIVE';

export interface MutationEvent {
  operation: MutationOperation;
  model: string;
  table: string;
  recordId: string;
  actorId: string;
  purpose: string;
  requestId: string;
  timestamp: string;
  version: number;
  changedFields: readonly string[];
  jurisdictionId?: string | null;
  institutionId?: string | null;
}

export type MutationSink = (event: MutationEvent) => void | Promise<void>;
