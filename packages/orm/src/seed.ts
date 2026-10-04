import { ValidationError } from './errors.js';

export interface SeedReference {
  readonly __dhgsRef: string;
}

export interface SeedRecord {
  externalId: string;
  model: string;
  values: Readonly<Record<string, unknown>>;
}

const externalIdPattern = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/;

export function ref(externalId: string): SeedReference {
  assertExternalId(externalId);
  return Object.freeze({ __dhgsRef: externalId });
}

export function seed(model: string, externalId: string, values: Record<string, unknown>): SeedRecord {
  assertExternalId(externalId);
  return Object.freeze({
    externalId,
    model,
    values: deepFreeze(structuredClone(values))
  });
}

export function isSeedReference(value: unknown): value is SeedReference {
  return typeof value === 'object' && value !== null &&
    typeof (value as { __dhgsRef?: unknown }).__dhgsRef === 'string';
}

export function collectSeedReferences(value: unknown, output: string[] = []): string[] {
  if (isSeedReference(value)) {
    output.push(value.__dhgsRef);
    return output;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectSeedReferences(item, output);
    return output;
  }
  if (typeof value === 'object' && value !== null) {
    for (const item of Object.values(value)) collectSeedReferences(item, output);
  }
  return output;
}

function assertExternalId(externalId: string): void {
  if (!externalIdPattern.test(externalId)) {
    throw new ValidationError(`Invalid stable external id: ${externalId}`);
  }
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== 'object' || value === null) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  return value;
}
