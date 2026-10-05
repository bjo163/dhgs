export const REGISTRY_KINDS = ['requirement', 'control', 'rule', 'invariant', 'test', 'kpi'] as const;
export type RegistryKind = typeof REGISTRY_KINDS[number];

export const REGISTRY_STATUSES = ['draft', 'active', 'deprecated', 'superseded', 'retired'] as const;
export type RegistryStatus = typeof REGISTRY_STATUSES[number];

export type EvidenceKind = 'document' | 'test-source' | 'ci-check' | 'artifact';

export interface EvidenceReference {
  id: string;
  kind: EvidenceKind;
  locator: string;
  description?: string;
}

export interface RegistryMetadata {
  id: string;
  kind: RegistryKind;
  title: string;
  statement: string;
  owner: string;
  jurisdiction: string;
  status: RegistryStatus;
  version: string;
  legalBasis: readonly string[];
  evidenceRefs: readonly EvidenceReference[];
  reviewDue?: string;
  supersedes?: string;
  supersededBy?: string;
}

export interface RequirementEntry extends RegistryMetadata { kind: 'requirement'; }
export interface ControlEntry extends RegistryMetadata { kind: 'control'; }
export interface RuleEntry extends RegistryMetadata { kind: 'rule'; }
export interface InvariantEntry extends RegistryMetadata { kind: 'invariant'; }

export interface TestEntry extends RegistryMetadata {
  kind: 'test';
  testRef: string;
}

export interface KpiEntry extends RegistryMetadata {
  kind: 'kpi';
  formula: string;
  dataSource: string;
  reviewCadence: string;
  targetStrategy: string;
}

export type RegistryEntry = RequirementEntry | ControlEntry | RuleEntry | InvariantEntry | TestEntry | KpiEntry;

export const REGISTRY_RELATIONS = ['implemented_by', 'enforced_by', 'verified_by', 'measured_by'] as const;
export type RegistryRelation = typeof REGISTRY_RELATIONS[number];

export interface RegistryLink {
  from: string;
  to: string;
  relation: RegistryRelation;
}

export interface RegistrySeed {
  entries: readonly RegistryEntry[];
  links: readonly RegistryLink[];
}

export interface RegistryTrace {
  startId: string;
  entries: readonly RegistryEntry[];
  links: readonly RegistryLink[];
  evidence: readonly EvidenceReference[];
}

export interface InvariantResult {
  passed: boolean;
  message?: string;
  evidenceRefs?: readonly EvidenceReference[];
}

export interface InvariantRunner<Context = unknown> {
  invariantId: string;
  run(context: Context): InvariantResult | Promise<InvariantResult>;
}
