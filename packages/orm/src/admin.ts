import type { AddonManifest } from './addon';
import type { Domain } from './domain';
import { validateDomain } from './domain';
import type { Environment } from './environment';
import { AdminAuthorizationError, GeneratedUiError } from './errors';
import type { FieldDefinition, FieldKind } from './fields';
import type { ModelDefinition } from './model';
import type { ModelRegistry } from './registry';
import type { BaseRecord, ModelContext } from './types';
import type { GeneratedUiMode, MenuSpec, ViewKind } from './metadata';

export interface GeneratedAdminField {
  name: string;
  kind: FieldKind;
  label: string;
  help?: string;
  required: boolean;
  readOnly: boolean;
  immutable: boolean;
  selection?: readonly string[];
  relation?: string;
}

export interface GeneratedAdminView {
  id: string;
  kind: ViewKind;
  title: string;
  fields: readonly string[];
  sections: readonly { title?: string; fields: readonly string[] }[];
  filters: readonly { id: string; label: string; domain: readonly unknown[] }[];
}

export interface GeneratedAdminMetadata {
  model: string;
  table: string;
  mode: Exclude<GeneratedUiMode, 'prohibited'>;
  fields: readonly GeneratedAdminField[];
  views: readonly GeneratedAdminView[];
  menus: readonly MenuSpec[];
  capabilities: Readonly<{ create: boolean; write: boolean; archive: boolean }>;
}

export type GeneratedAdminOperation = 'create' | 'write' | 'archive';

export interface GeneratedAdminAuthorizationRequest {
  model: string;
  operation: GeneratedAdminOperation;
  context: ModelContext;
  values?: Readonly<Record<string, unknown>>;
  recordId?: string;
}

export type GeneratedAdminAuthorizer = (
  request: GeneratedAdminAuthorizationRequest
) => boolean | Promise<boolean>;

const BASE_FIELDS: Readonly<Record<string, GeneratedAdminField>> = Object.freeze({
  id: baseField('id', 'uuid', 'ID'),
  createdAt: baseField('createdAt', 'datetime', 'Created at'),
  updatedAt: baseField('updatedAt', 'datetime', 'Updated at'),
  createdBy: baseField('createdBy', 'string', 'Created by'),
  updatedBy: baseField('updatedBy', 'string', 'Updated by'),
  version: baseField('version', 'integer', 'Version'),
  archivedAt: baseField('archivedAt', 'datetime', 'Archived at'),
  jurisdictionId: { ...baseField('jurisdictionId', 'belongsTo', 'Jurisdiction'), relation: 'base.jurisdiction' },
  institutionId: { ...baseField('institutionId', 'belongsTo', 'Institution'), relation: 'base.institution' }
});

export function resolveGeneratedAdminMetadata(
  manifest: AddonManifest,
  registry: ModelRegistry,
  modelName: string
): GeneratedAdminMetadata {
  const model = registry.get(modelName);
  const policy = manifest.uiPolicies[modelName];
  if (!policy || policy.generated === 'prohibited') {
    throw new GeneratedUiError(`Generic admin is prohibited for ${modelName}`);
  }
  const mode: Exclude<GeneratedUiMode, 'prohibited'> = policy.generated;

  const sourceViews = manifest.views.filter((view) => view.model === modelName);
  if (sourceViews.length === 0) throw new GeneratedUiError(`No generated-admin views defined for ${modelName}`);

  const fieldNames = new Set<string>();
  const views: GeneratedAdminView[] = [];
  for (const view of sourceViews) {
    const direct = [...(view.fields ?? [])];
    const sectionFields = (view.sections ?? []).flatMap((section) => [...section.fields]);
    const allViewFields = [...direct, ...sectionFields];
    for (const field of allViewFields) {
      resolveSafeField(model, field, mode);
      fieldNames.add(field);
    }
    for (const filter of view.filters ?? []) {
      validateDomain(model, filter.domain as Domain, { privileged: true });
    }
    views.push({
      id: view.id,
      kind: view.kind,
      title: view.title,
      fields: Object.freeze(direct),
      sections: Object.freeze((view.sections ?? []).map((section) => ({ ...section, fields: Object.freeze([...section.fields]) }))),
      filters: Object.freeze((view.filters ?? []).map((filter) => ({ ...filter, domain: Object.freeze([...filter.domain]) })))
    });
  }

  const fields = [...fieldNames].map((field) => resolveSafeField(model, field, mode));
  const viewIds = new Set(sourceViews.map((view) => view.id));
  const menus = manifest.menus.filter((menu) => menu.viewId && viewIds.has(menu.viewId));

  return Object.freeze({
    model: model.name,
    table: model.table,
    mode,
    fields: Object.freeze(fields),
    views: Object.freeze(views),
    menus: Object.freeze(menus),
    capabilities: Object.freeze({
      create: mode === 'allowed' && policy.create === true,
      write: mode === 'allowed' && policy.write === true,
      archive: mode === 'allowed' && policy.archive === true
    })
  });
}

export async function executeGeneratedAdminMutation<T extends BaseRecord>(options: {
  manifest: AddonManifest;
  registry: ModelRegistry;
  environment: Environment;
  model: string;
  operation: GeneratedAdminOperation;
  authorize: GeneratedAdminAuthorizer;
  values?: Record<string, unknown>;
  recordId?: string;
  expectedVersion?: number;
}): Promise<T> {
  const metadata = resolveGeneratedAdminMetadata(options.manifest, options.registry, options.model);
  const capability = metadata.capabilities[options.operation];
  if (!capability) throw new GeneratedUiError(`Generic admin ${options.operation} is not allowed for ${options.model}`);

  const values = options.operation === 'archive'
    ? undefined
    : sanitizeMutationValues(metadata, options.operation, options.values ?? {});

  const allowed = await options.authorize({
    model: options.model,
    operation: options.operation,
    context: options.environment.context,
    values,
    recordId: options.recordId
  });
  if (!allowed) throw new AdminAuthorizationError(`Backend authorization denied ${options.operation} for ${options.model}`);

  const repository = options.environment.model<T>(options.model);
  if (options.operation === 'create') return repository.create(values ?? {}) as Promise<T>;
  if (!options.recordId) throw new GeneratedUiError(`recordId is required for ${options.operation}`);
  if (!Number.isSafeInteger(options.expectedVersion) || (options.expectedVersion ?? 0) < 1) {
    throw new GeneratedUiError(`expectedVersion is required for ${options.operation}`);
  }
  if (options.operation === 'write') {
    return repository.write(options.recordId, values ?? {}, { expectedVersion: options.expectedVersion! });
  }
  return repository.archive(options.recordId, { expectedVersion: options.expectedVersion! });
}

function sanitizeMutationValues(
  metadata: GeneratedAdminMetadata,
  operation: Exclude<GeneratedAdminOperation, 'archive'>,
  values: Record<string, unknown>
): Record<string, unknown> {
  const form = metadata.views.find((view) => view.kind === 'form');
  if (!form) throw new GeneratedUiError(`Form view is required for generic mutation: ${metadata.model}`);
  const formFields = new Set([...form.fields, ...form.sections.flatMap((section) => section.fields)]);
  const fieldMap = new Map(metadata.fields.map((field) => [field.name, field]));
  const next: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(values)) {
    const field = fieldMap.get(name);
    if (!field || !formFields.has(name) || field.readOnly || (operation === 'write' && field.immutable)) {
      throw new GeneratedUiError(`Field is not writable through generic admin: ${metadata.model}.${name}`);
    }
    next[name] = value;
  }
  return next;
}

function resolveSafeField(
  model: ModelDefinition,
  name: string,
  mode: Exclude<GeneratedUiMode, 'prohibited'>
): GeneratedAdminField {
  const base = BASE_FIELDS[name];
  if (base) return Object.freeze({ ...base, readOnly: true, immutable: true });
  const definition = model.fields[name];
  if (!definition) throw new GeneratedUiError(`View references unknown field: ${model.name}.${name}`);
  if (definition.sensitive || definition.hidden || definition.writeOnly || definition.public === false) {
    throw new GeneratedUiError(`View exposes non-public field: ${model.name}.${name}`);
  }
  return Object.freeze({
    name,
    kind: definition.kind,
    label: definition.label ?? humanize(name),
    help: definition.help,
    required: definition.required === true,
    readOnly: mode === 'read_only',
    immutable: definition.mutable === false,
    selection: definition.selection,
    relation: definition.relation
  });
}

function baseField(name: string, kind: FieldKind, label: string): GeneratedAdminField {
  return { name, kind, label, required: false, readOnly: true, immutable: true };
}

function humanize(name: string): string {
  const spaced = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
