import type { RegistryKind } from './types';

export const REGISTRY_ID_PATTERNS: Readonly<Record<RegistryKind, RegExp>> = Object.freeze({
  requirement: /^REQ-[A-Z0-9]+-\d{3}$/,
  control: /^CTRL-[A-Z0-9]+-\d{3}$/,
  rule: /^RULE-[A-Z0-9]+-\d{3}$/,
  invariant: /^(?:[A-Z0-9]+-INV-\d{3}|INV-[A-Z0-9]+-\d{3})$/,
  test: /^TEST-[A-Z0-9]+-\d{3}$/,
  kpi: /^KPI-[A-Z0-9]+-\d{3}$/
});

export function registryKindForId(id: string): RegistryKind {
  const matches = (Object.entries(REGISTRY_ID_PATTERNS) as [RegistryKind, RegExp][])
    .filter(([, pattern]) => pattern.test(id))
    .map(([kind]) => kind);
  if (matches.length !== 1) throw new Error(`Invalid or ambiguous registry ID: ${id}`);
  return matches[0]!;
}

export function assertRegistryId(id: string, kind: RegistryKind): void {
  const pattern = REGISTRY_ID_PATTERNS[kind];
  if (!pattern.test(id)) throw new Error(`Registry ID ${id} does not match kind ${kind}`);
}
