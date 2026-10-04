import type { ModelDefinition } from './model.js';
import { ValidationError } from './errors.js';

export type FieldKind =
  | 'string'
  | 'text'
  | 'integer'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'uuid'
  | 'date'
  | 'datetime'
  | 'json'
  | 'belongsTo'
  | 'hasMany'
  | 'manyToMany';

export interface FieldDefinition {
  kind: FieldKind;
  label?: string;
  help?: string;
  required?: boolean;
  unique?: boolean;
  default?: unknown | (() => unknown);
  sensitive?: boolean;
  public?: boolean;
  mutable?: boolean;
  queryable?: boolean;
  sortable?: boolean;
  selection?: readonly string[];
  relation?: string;
}

type FieldOptions = Omit<FieldDefinition, 'kind' | 'selection' | 'relation'>;

function field(kind: FieldKind, options: FieldOptions = {}): FieldDefinition {
  return Object.freeze({ kind, ...options });
}

export const fields = Object.freeze({
  string: (options: FieldOptions = {}) => field('string', options),
  text: (options: FieldOptions = {}) => field('text', options),
  integer: (options: FieldOptions = {}) => field('integer', options),
  number: (options: FieldOptions = {}) => field('number', options),
  boolean: (options: FieldOptions = {}) => field('boolean', options),
  uuid: (options: FieldOptions = {}) => field('uuid', options),
  date: (options: FieldOptions = {}) => field('date', options),
  datetime: (options: FieldOptions = {}) => field('datetime', options),
  json: (options: FieldOptions = {}) => field('json', options),
  enum: (selection: readonly string[], options: FieldOptions = {}) =>
    Object.freeze({ kind: 'enum' as const, selection: Object.freeze([...selection]), ...options }),
  belongsTo: (relation: string, options: FieldOptions = {}) =>
    Object.freeze({ kind: 'belongsTo' as const, relation, ...options }),
  hasMany: (relation: string, options: FieldOptions = {}) =>
    Object.freeze({ kind: 'hasMany' as const, relation, ...options }),
  manyToMany: (relation: string, options: FieldOptions = {}) =>
    Object.freeze({ kind: 'manyToMany' as const, relation, ...options })
});

export const BASE_RECORD_FIELDS = new Set([
  'id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'version',
  'archivedAt', 'jurisdictionId', 'institutionId'
]);

export function applyDefaults(model: ModelDefinition, values: Record<string, unknown>): Record<string, unknown> {
  const next = { ...values };
  for (const [name, definition] of Object.entries(model.fields)) {
    if (next[name] !== undefined || definition.default === undefined) continue;
    next[name] = typeof definition.default === 'function'
      ? (definition.default as () => unknown)()
      : structuredClone(definition.default);
  }
  return next;
}

export function validateModelValues(
  model: ModelDefinition,
  values: Record<string, unknown>,
  options: { partial?: boolean; allowBaseFields?: boolean } = {}
): void {
  for (const name of Object.keys(values)) {
    if (options.allowBaseFields && BASE_RECORD_FIELDS.has(name)) continue;
    const definition = model.fields[name];
    if (!definition) throw new ValidationError(`Unknown field: ${model.name}.${name}`);
    validateFieldValue(model.name, name, definition, values[name]);
  }

  if (!options.partial) {
    for (const [name, definition] of Object.entries(model.fields)) {
      if (definition.required && values[name] == null) {
        throw new ValidationError(`Required field missing: ${model.name}.${name}`);
      }
    }
  }
}

function validateFieldValue(model: string, name: string, definition: FieldDefinition, value: unknown): void {
  if (value == null) {
    if (definition.required) throw new ValidationError(`Required field missing: ${model}.${name}`);
    return;
  }

  const fail = () => {
    throw new ValidationError(`Invalid value for ${model}.${name} (${definition.kind})`);
  };

  switch (definition.kind) {
    case 'string':
    case 'text':
    case 'uuid':
    case 'date':
    case 'datetime':
    case 'belongsTo':
      if (typeof value !== 'string') fail();
      return;
    case 'integer':
      if (typeof value !== 'number' || !Number.isInteger(value)) fail();
      return;
    case 'number':
      if (typeof value !== 'number' || !Number.isFinite(value)) fail();
      return;
    case 'boolean':
      if (typeof value !== 'boolean') fail();
      return;
    case 'enum':
      if (typeof value !== 'string' || !definition.selection?.includes(value)) fail();
      return;
    case 'hasMany':
    case 'manyToMany':
      if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) fail();
      return;
    case 'json':
      return;
  }
}
