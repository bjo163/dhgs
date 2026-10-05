import type { FieldDefinition } from './fields';
import type { BaseRecord } from './types';
import { ModelRegistrationError } from './errors';

export interface ModelGovernance {
  jurisdictionScoped?: boolean;
  institutionScoped?: boolean;
  optimisticLock?: boolean;
  audit?: 'required' | 'optional' | 'none';
  ledger?: 'required' | 'optional' | 'none';
  archiveOnly?: boolean;
  allowUnarchive?: boolean;
  immutableFields?: readonly string[];
}

export interface ModelDefinition<T extends BaseRecord = BaseRecord> {
  name: string;
  table: string;
  order?: string;
  fields: Readonly<Record<string, FieldDefinition>>;
  governance: Readonly<ModelGovernance>;
  readonly __recordType?: T;
}

export type ModelConfig<T extends BaseRecord = BaseRecord> = Omit<ModelDefinition<T>, 'name'>;

export function defineModel<T extends BaseRecord>(name: string, config: ModelConfig<T>): ModelDefinition<T> {
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(name)) {
    throw new ModelRegistrationError(`Model name must use stable dot notation: ${name}`);
  }
  if (!/^[a-z][a-z0-9_]*$/.test(config.table)) {
    throw new ModelRegistrationError(`Invalid table name for ${name}: ${config.table}`);
  }

  const fields = Object.freeze({ ...config.fields });
  const governance = Object.freeze({ ...config.governance });
  return Object.freeze({ ...config, name, fields, governance });
}
