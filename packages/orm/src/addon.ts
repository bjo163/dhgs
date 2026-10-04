import type { ModelDefinition } from './model.js';
import type { BaseRecord } from './types.js';
import type { AccessSpec, ActionSpec, MenuSpec, UiPolicy, ViewSpec } from './metadata.js';
import type { SeedRecord } from './seed.js';
import { collectSeedReferences } from './seed.js';
import { ModelRegistry } from './registry.js';
import { ModelRegistrationError, ValidationError } from './errors.js';

export interface AddonManifest {
  name: string;
  version: string;
  depends: readonly string[];
  models: readonly ModelDefinition[];
  data: readonly SeedRecord[];
  views: readonly ViewSpec[];
  menus: readonly MenuSpec[];
  actions: readonly ActionSpec[];
  access: readonly AccessSpec[];
  uiPolicies: Readonly<Record<string, UiPolicy>>;
  hooks: readonly string[];
  upgrades: Readonly<Record<string, unknown>>;
}

export type AddonConfig = Partial<Omit<AddonManifest, 'name' | 'version'>> & Pick<AddonManifest, 'name' | 'version'>;

const addonNamePattern = /^[a-z][a-z0-9_-]*$/;
const semverPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

export function defineAddon(config: AddonConfig): AddonManifest {
  if (!addonNamePattern.test(config.name)) throw new ValidationError(`Invalid addon name: ${config.name}`);
  if (!semverPattern.test(config.version)) throw new ValidationError(`Addon version must be semantic: ${config.version}`);

  const manifest: AddonManifest = {
    name: config.name,
    version: config.version,
    depends: Object.freeze([...(config.depends ?? [])]),
    models: Object.freeze([...(config.models ?? [])]),
    data: Object.freeze([...(config.data ?? [])]),
    views: Object.freeze([...(config.views ?? [])]),
    menus: Object.freeze([...(config.menus ?? [])]),
    actions: Object.freeze([...(config.actions ?? [])]),
    access: Object.freeze([...(config.access ?? [])]),
    uiPolicies: Object.freeze({ ...(config.uiPolicies ?? {}) }),
    hooks: Object.freeze([...(config.hooks ?? [])]),
    upgrades: Object.freeze({ ...(config.upgrades ?? {}) })
  };

  validateAddon(manifest);
  return Object.freeze(manifest);
}

export function validateAddon(manifest: AddonManifest): void {
  if (new Set(manifest.depends).size !== manifest.depends.length) {
    throw new ValidationError(`Duplicate addon dependency in ${manifest.name}`);
  }
  if (manifest.depends.includes(manifest.name)) {
    throw new ValidationError(`Addon cannot depend on itself: ${manifest.name}`);
  }

  const modelNames = manifest.models.map((model) => model.name);
  if (new Set(modelNames).size !== modelNames.length) {
    throw new ModelRegistrationError(`Duplicate model in addon ${manifest.name}`);
  }
  const modelSet = new Set(modelNames);

  const externalIds = manifest.data.map((record) => record.externalId);
  if (new Set(externalIds).size !== externalIds.length) {
    throw new ValidationError(`Duplicate seed external id in addon ${manifest.name}`);
  }
  for (const record of manifest.data) {
    if (!modelSet.has(record.model)) {
      throw new ValidationError(`Seed ${record.externalId} references model outside addon ${manifest.name}: ${record.model}`);
    }
  }

  const viewIds = new Set<string>();
  for (const view of manifest.views) {
    if (viewIds.has(view.id)) throw new ValidationError(`Duplicate view id in addon ${manifest.name}: ${view.id}`);
    viewIds.add(view.id);
    if (!modelSet.has(view.model)) throw new ValidationError(`View ${view.id} references unknown model: ${view.model}`);
  }

  const menuIds = new Set<string>();
  for (const menu of manifest.menus) {
    if (menuIds.has(menu.id)) throw new ValidationError(`Duplicate menu id in addon ${manifest.name}: ${menu.id}`);
    menuIds.add(menu.id);
    if (menu.viewId && !viewIds.has(menu.viewId)) throw new ValidationError(`Menu ${menu.id} references unknown view: ${menu.viewId}`);
  }

  for (const [model, policy] of Object.entries(manifest.uiPolicies)) {
    if (!modelSet.has(model)) throw new ValidationError(`UI policy references unknown model: ${model}`);
    if (policy.generated === 'prohibited' && (policy.create || policy.write || policy.archive)) {
      throw new ValidationError(`Prohibited generated UI cannot enable mutation: ${model}`);
    }
    if (policy.generated === 'read_only' && (policy.create || policy.write || policy.archive)) {
      throw new ValidationError(`Read-only generated UI cannot enable mutation: ${model}`);
    }
  }
}

export function resolveAddonOrder(manifests: readonly AddonManifest[]): readonly AddonManifest[] {
  const byName = new Map<string, AddonManifest>();
  for (const manifest of manifests) {
    if (byName.has(manifest.name)) throw new ValidationError(`Duplicate addon: ${manifest.name}`);
    byName.set(manifest.name, manifest);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const ordered: AddonManifest[] = [];

  const visit = (name: string, path: string[]) => {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new ValidationError(`Addon dependency cycle: ${[...path, name].join(' -> ')}`);
    const manifest = byName.get(name);
    if (!manifest) throw new ValidationError(`Missing addon dependency: ${name}`);
    visiting.add(name);
    for (const dependency of manifest.depends) visit(dependency, [...path, name]);
    visiting.delete(name);
    visited.add(name);
    ordered.push(manifest);
  };

  for (const manifest of [...manifests].sort((a, b) => a.name.localeCompare(b.name))) visit(manifest.name, []);
  return Object.freeze(ordered);
}

export function validateSeedReferences(manifests: readonly AddonManifest[]): void {
  const allExternalIds = new Set(manifests.flatMap((manifest) => manifest.data.map((record) => record.externalId)));
  for (const manifest of manifests) {
    for (const record of manifest.data) {
      for (const reference of collectSeedReferences(record.values)) {
        if (!allExternalIds.has(reference)) {
          throw new ValidationError(`Seed ${record.externalId} references unknown external id: ${reference}`);
        }
      }
    }
  }
}

export function installAddons(manifests: readonly AddonManifest[], registry = new ModelRegistry()): ModelRegistry {
  const ordered = resolveAddonOrder(manifests);
  validateSeedReferences(ordered);
  for (const manifest of ordered) {
    for (const model of manifest.models) registry.register(model as ModelDefinition<BaseRecord>);
  }
  return registry;
}
