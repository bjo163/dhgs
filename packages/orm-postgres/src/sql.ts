import type {
  AdapterQuery,
  BaseRecord,
  Domain,
  DomainClause,
  DomainNode,
  FieldDefinition,
  ModelDefinition,
  QueryOrder
} from '@dhgs/orm';
import { QueryValidationError } from '@dhgs/orm';

export interface CompiledSql {
  text: string;
  values: unknown[];
}

const BASE_COLUMNS: Readonly<Record<string, string>> = Object.freeze({
  id: 'id',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  createdBy: 'created_by',
  updatedBy: 'updated_by',
  version: 'version',
  archivedAt: 'archived_at',
  jurisdictionId: 'jurisdiction_id',
  institutionId: 'institution_id'
});

export function quoteIdentifier(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

export function columnFor(model: ModelDefinition, field: string): string {
  if (BASE_COLUMNS[field]) return BASE_COLUMNS[field]!;
  if (!model.fields[field]) throw new QueryValidationError(`Unknown SQL field: ${model.name}.${field}`);
  return field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function fieldForColumn(model: ModelDefinition, column: string): string | undefined {
  const base = Object.entries(BASE_COLUMNS).find(([, candidate]) => candidate === column)?.[0];
  if (base) return base;
  return Object.keys(model.fields).find((field) => columnFor(model, field) === column);
}

export function compileSelect(model: ModelDefinition, query: AdapterQuery): CompiledSql {
  const values: unknown[] = [];
  const where = compileDomain(model, query.domain ?? [], values);
  const order = compileOrder(model, query.order ?? []);
  const limit = compileBoundedInteger('limit', query.limit, values);
  const offset = compileBoundedInteger('offset', query.offset, values);
  return {
    text: `SELECT * FROM ${quoteIdentifier(model.table)}${where}${order}${limit}${offset}`,
    values
  };
}

export function compileDomain(model: ModelDefinition, domain: Domain, values: unknown[]): string {
  if (domain.length === 0) return '';
  const text = domain.map((node) => compileNode(model, node, values)).join(' AND ');
  return ` WHERE ${text}`;
}

function compileNode(model: ModelDefinition, node: DomainNode, values: unknown[]): string {
  if (isClause(node)) {
    const [field, operator, expected] = node;
    const column = quoteIdentifier(columnFor(model, field));
    const definition = model.fields[field];

    if (expected == null) {
      if (operator === '=') return `${column} IS NULL`;
      if (operator === '!=') return `${column} IS NOT NULL`;
      throw new QueryValidationError(`Null is only valid with = or !=: ${model.name}.${field}`);
    }

    if (operator === 'in' || operator === 'not in') {
      if (!Array.isArray(expected)) throw new QueryValidationError(`${operator} expects an array`);
      if (expected.length === 0) return operator === 'in' ? 'FALSE' : 'TRUE';
      const placeholder = push(values, expected);
      return operator === 'in'
        ? `${column} = ANY(${placeholder})`
        : `NOT (${column} = ANY(${placeholder}))`;
    }

    if (operator === 'contains') return compileContains(column, definition, expected, values);

    const sqlOperator = operator === '!=' ? '<>' : operator;
    return `${column} ${sqlOperator} ${push(values, expected)}`;
  }

  if ('and' in node) {
    if (node.and.length === 0) return 'TRUE';
    return `(${node.and.map((child) => compileNode(model, child, values)).join(' AND ')})`;
  }
  if ('or' in node) {
    if (node.or.length === 0) throw new QueryValidationError('OR domain cannot be empty');
    return `(${node.or.map((child) => compileNode(model, child, values)).join(' OR ')})`;
  }
  return `(NOT ${compileNode(model, node.not, values)})`;
}

function compileContains(column: string, definition: FieldDefinition | undefined, expected: unknown, values: unknown[]): string {
  const placeholder = push(values, expected);
  if (definition?.kind === 'hasMany' || definition?.kind === 'manyToMany') {
    return `${placeholder} = ANY(${column})`;
  }
  if (definition?.kind === 'json') {
    values[values.length - 1] = JSON.stringify(expected);
    return `${column} @> ${placeholder}::jsonb`;
  }
  return `${column}::text ILIKE ('%' || ${placeholder}::text || '%')`;
}

function compileOrder(model: ModelDefinition, order: readonly QueryOrder[]): string {
  if (order.length === 0) return ' ORDER BY "id" ASC';
  return ` ORDER BY ${order.map((item) => {
    const direction = item.direction === 'desc' ? 'DESC' : 'ASC';
    return `${quoteIdentifier(columnFor(model, item.field))} ${direction}`;
  }).join(', ')}`;
}

function compileBoundedInteger(name: 'limit' | 'offset', value: number | undefined, values: unknown[]): string {
  if (value == null) return '';
  if (!Number.isSafeInteger(value) || value < 0) throw new QueryValidationError(`Invalid ${name}: ${value}`);
  return ` ${name.toUpperCase()} ${push(values, value)}`;
}

function push(values: unknown[], value: unknown): string {
  values.push(value);
  return `$${values.length}`;
}

function isClause(node: DomainNode): node is DomainClause {
  return Array.isArray(node);
}

export function recordToColumns<T extends BaseRecord>(model: ModelDefinition<T>, record: Partial<T>): Array<[string, unknown]> {
  const known = new Set([...Object.keys(BASE_COLUMNS), ...Object.keys(model.fields)]);
  return Object.entries(record as Record<string, unknown>)
    .filter(([field, value]) => known.has(field) && value !== undefined)
    .map(([field, value]) => [columnFor(model, field), toDatabaseValue(model.fields[field], value)]);
}

export function rowToRecord<T extends BaseRecord>(model: ModelDefinition<T>, row: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const [column, value] of Object.entries(row)) {
    const field = fieldForColumn(model, column);
    if (!field) continue;
    result[field] = fromDatabaseValue(value);
  }
  return result as T;
}

function toDatabaseValue(definition: FieldDefinition | undefined, value: unknown): unknown {
  if (definition?.kind === 'json' && value != null && typeof value !== 'string') return JSON.stringify(value);
  return value;
}

function fromDatabaseValue(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString();
  return value;
}
