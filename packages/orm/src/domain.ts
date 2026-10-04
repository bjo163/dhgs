import type { BaseRecord, ModelContext } from './types.js';
import type { ModelDefinition } from './model.js';
import { BASE_RECORD_FIELDS } from './fields.js';
import { QueryValidationError } from './errors.js';

export type DomainOperator = '=' | '!=' | 'in' | 'not in' | '<' | '<=' | '>' | '>=' | 'contains';
export type DomainClause = readonly [field: string, operator: DomainOperator, value: unknown];
export type DomainNode = DomainClause | { and: readonly DomainNode[] } | { or: readonly DomainNode[] } | { not: DomainNode };
export type Domain = readonly DomainNode[];

export interface QueryOrder {
  field: string;
  direction?: 'asc' | 'desc';
}

export interface QueryOptions {
  order?: readonly QueryOrder[];
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
}

function isClause(node: DomainNode): node is DomainClause {
  return Array.isArray(node);
}

export function validateDomain(model: ModelDefinition, domain: Domain, context: ModelContext): void {
  for (const node of domain) validateNode(model, node, context);
}

function validateNode(model: ModelDefinition, node: DomainNode, context: ModelContext): void {
  if (isClause(node)) {
    const [field, operator, value] = node;
    const definition = model.fields[field];
    if (!definition && !BASE_RECORD_FIELDS.has(field)) {
      throw new QueryValidationError(`Unknown query field: ${model.name}.${field}`);
    }
    if (definition?.queryable === false) {
      throw new QueryValidationError(`Field is not queryable: ${model.name}.${field}`);
    }
    if (definition?.sensitive && !context.privileged && !context.permissions?.includes('orm.query_sensitive')) {
      throw new QueryValidationError(`Sensitive field is not queryable in this context: ${model.name}.${field}`);
    }
    if ((operator === 'in' || operator === 'not in') && !Array.isArray(value)) {
      throw new QueryValidationError(`${operator} expects an array: ${model.name}.${field}`);
    }
    return;
  }

  if ('and' in node) {
    for (const child of node.and) validateNode(model, child, context);
    return;
  }
  if ('or' in node) {
    if (node.or.length === 0) throw new QueryValidationError('OR domain cannot be empty');
    for (const child of node.or) validateNode(model, child, context);
    return;
  }
  validateNode(model, node.not, context);
}

export function evaluateDomain(record: BaseRecord, domain: Domain): boolean {
  return domain.every((node) => evaluateNode(record, node));
}

function evaluateNode(record: BaseRecord, node: DomainNode): boolean {
  if (isClause(node)) {
    const [field, operator, expected] = node;
    const actual = (record as unknown as Record<string, unknown>)[field];
    switch (operator) {
      case '=': return actual === expected;
      case '!=': return actual !== expected;
      case 'in': return Array.isArray(expected) && expected.includes(actual);
      case 'not in': return Array.isArray(expected) && !expected.includes(actual);
      case '<': return compare(actual, expected) < 0;
      case '<=': return compare(actual, expected) <= 0;
      case '>': return compare(actual, expected) > 0;
      case '>=': return compare(actual, expected) >= 0;
      case 'contains':
        if (typeof actual === 'string' && typeof expected === 'string') return actual.includes(expected);
        if (Array.isArray(actual)) return actual.includes(expected);
        return false;
    }
  }
  if ('and' in node) return node.and.every((child) => evaluateNode(record, child));
  if ('or' in node) return node.or.some((child) => evaluateNode(record, child));
  return !evaluateNode(record, node.not);
}

export function compare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a < b ? -1 : 1;
  return String(a).localeCompare(String(b));
}
