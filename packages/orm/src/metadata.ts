import { ValidationError } from './errors.js';

export type GeneratedUiMode = 'allowed' | 'read_only' | 'prohibited';

export interface UiPolicy {
  generated: GeneratedUiMode;
  create?: boolean;
  write?: boolean;
  archive?: boolean;
  actions?: readonly string[];
}

export type ViewKind = 'list' | 'form' | 'search';

export interface ViewSpec {
  id: string;
  model: string;
  kind: ViewKind;
  title: string;
  fields?: readonly string[];
  sections?: readonly {
    title?: string;
    fields: readonly string[];
  }[];
  filters?: readonly {
    id: string;
    label: string;
    domain: readonly unknown[];
  }[];
}

export interface MenuSpec {
  id: string;
  label: string;
  parent?: string;
  viewId?: string;
  order?: number;
}

export interface ActionSpec {
  id: string;
  model?: string;
  command: string;
  label: string;
}

export interface AccessSpec {
  id: string;
  model: string;
  group?: string;
  read: boolean;
  create: boolean;
  write: boolean;
  archive: boolean;
}

const viewIdPattern = /^[a-z][a-z0-9_.-]+$/;

export function defineView(spec: ViewSpec): ViewSpec {
  if (!viewIdPattern.test(spec.id)) throw new ValidationError(`Invalid view id: ${spec.id}`);
  if (!spec.model.includes('.')) throw new ValidationError(`View model must use dot notation: ${spec.model}`);
  if (!['list', 'form', 'search'].includes(spec.kind)) throw new ValidationError(`Unsupported view kind: ${spec.kind}`);
  if (!spec.title.trim()) throw new ValidationError(`View title is required: ${spec.id}`);
  const fields = [...(spec.fields ?? [])];
  if (new Set(fields).size !== fields.length) throw new ValidationError(`Duplicate field in view ${spec.id}`);
  return Object.freeze({
    ...spec,
    fields: spec.fields ? Object.freeze(fields) : undefined,
    sections: spec.sections
      ? Object.freeze(spec.sections.map((section) => Object.freeze({ ...section, fields: Object.freeze([...section.fields]) })))
      : undefined,
    filters: spec.filters
      ? Object.freeze(spec.filters.map((filter) => Object.freeze({ ...filter, domain: Object.freeze([...filter.domain]) })))
      : undefined
  });
}
