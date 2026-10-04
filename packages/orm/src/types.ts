export type Id = string;

export type IdentityAssurance =
  | 'IA0_ANONYMOUS'
  | 'IA1_PSEUDONYMOUS'
  | 'IA2_VERIFIED_PERSON'
  | 'IA3_VERIFIED_OFFICIAL'
  | 'IA4_VERIFIED_INSTITUTION';

export interface BaseRecord {
  id: Id;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
  archivedAt: string | null;
  jurisdictionId?: string | null;
  institutionId?: string | null;
}

export interface ModelContext {
  actorId?: string;
  requestId?: string;
  purpose?: string;
  identityAssurance?: IdentityAssurance;
  jurisdictionIds?: readonly string[];
  institutionId?: string | null;
  roles?: readonly string[];
  permissions?: readonly string[];
  correlationId?: string;
  transactionId?: string;
  privileged?: boolean;
}

export type MutationOperation = 'CREATE' | 'UPDATE' | 'ARCHIVE' | 'UNARCHIVE';

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
  correlationId?: string;
}

export type MutationSink = (event: MutationEvent) => void | Promise<void>;
