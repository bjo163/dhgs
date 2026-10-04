import type { BaseRecord } from './types.js';

export type FieldKind = 'string' | 'number' | 'boolean' | 'datetime' | 'json';

export interface FieldDefinition {
  kind: FieldKind;
  required?: boolean;
  sensitive?: boolean;
  public?: boolean;
  mutable?: boolean;
}

export interface ModelGovernance {
  jurisdictionScoped?: boolean;
  institutionScoped?: boolean;
  optimisticLock?: boolean;
  audit?: 'required' | 'optional';
  ledger?: 'required' | 'optional' | 'none';
  archiveOnly?: boolean;
  immutableFields?: readonly string[];
}

export interface ModelDefinition<T extends BaseRecord = BaseRecord> {
  name: string;
  table: string;
  fields: Readonly<Record<string, FieldDefinition>>;
  governance: Readonly<ModelGovernance>;
  /** Compile-time anchor only; never read at runtime. */
  readonly __recordType?: T;
}

export function defineModel<T extends BaseRecord>(definition: ModelDefinition<T>): ModelDefinition<T> {
  return Object.freeze({
    ...definition,
    fields: Object.freeze({ ...definition.fields }),
    governance: Object.freeze({ ...definition.governance })
  });
}
