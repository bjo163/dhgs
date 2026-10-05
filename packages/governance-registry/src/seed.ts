import type {
  ControlEntry,
  EvidenceReference,
  InvariantEntry,
  KpiEntry,
  RegistryEntry,
  RegistryLink,
  RegistrySeed,
  RequirementEntry,
  RuleEntry,
  TestEntry
} from './types';

const BLUEPRINT = 'DHGS-BP-001@15.1.2';
const blueprintEvidence: EvidenceReference = Object.freeze({
  id: 'EVID-BP-001-001',
  kind: 'document',
  locator: 'BLUEPRINT.md@15.1.2',
  description: 'Canonical DHGS controlled implementation Blueprint.'
});

const requirementDefinitions = [
  ['REQ-GOV-001', 'Every material decision has an accountable owner.', 'governance-architecture'],
  ['REQ-GOV-002', 'Every coercive action has a valid authority mandate.', 'governance-architecture'],
  ['REQ-GOV-003', 'No privileged status creates a hidden parallel process.', 'governance-architecture'],
  ['REQ-MZN-001', 'High-impact decisions complete required Mizan review.', 'mizan'],
  ['REQ-MZN-002', 'Mizan output does not determine legal guilt.', 'mizan'],
  ['REQ-HSB-001', 'Every material public-power decision produces a ledger record.', 'hisab-ledger'],
  ['REQ-HSB-002', 'Historical correction preserves prior accountable state.', 'hisab-ledger'],
  ['REQ-OBK-001', 'Eligible public decisions produce a privacy-safe public record.', 'open-book'],
  ['REQ-RGT-001', 'High-impact decisions complete rights review.', 'rights-review'],
  ['REQ-IDM-001', 'Restricted actions require sufficient identity assurance.', 'identity-access'],
  ['REQ-SEC-001', 'Privileged technical actions are auditable.', 'security'],
  ['REQ-SEC-002', 'Technical admin cannot alter governance outcome outside correction process.', 'security'],
  ['REQ-PRV-001', 'Protected data is not directly exposed to Open Book.', 'privacy'],
  ['REQ-KNO-001', 'Authoritative knowledge requires provenance and version.', 'knowledge'],
  ['REQ-EVD-001', 'Material evidence retains provenance and challenge status.', 'evidence'],
  ['REQ-ORM-001', 'Every material model operation carries actor/purpose/request context.', 'platform-data'],
  ['REQ-ORM-002', 'ORM scope checks do not replace PostgreSQL RLS.', 'platform-data'],
  ['REQ-ORM-003', 'Governance records have no unrestricted hard-delete path.', 'platform-data'],
  ['REQ-ORM-004', 'High-stakes governance actions cannot be exposed as generic CRUD actions.', 'platform-data'],
  ['REQ-ORM-005', 'Addon dependencies and versions are explicit and cycle-free.', 'platform-data'],
  ['REQ-UX-001', 'Public and internal information architecture is documented.', 'product-experience'],
  ['REQ-UX-002', 'Critical screens have stable Screen IDs and Screen Contracts.', 'product-experience'],
  ['REQ-UX-003', 'Critical journeys define happy, failure, accessibility, and recovery paths.', 'product-experience'],
  ['REQ-UX-004', 'High-impact actions require deliberate confirmation and reason capture.', 'product-experience'],
  ['REQ-UX-005', 'Mizan review UI protects reviewer independence where required.', 'product-experience'],
  ['REQ-UX-006', 'Evidence status, admissibility, confidentiality, and challenge are visible to authorized users.', 'product-experience'],
  ['REQ-UX-007', 'Appeal and correction paths are clearly discoverable and MUST NOT use dark patterns or hidden deadlines.', 'product-experience'],
  ['REQ-UX-008', 'Long submissions support draft/save/recovery.', 'product-experience'],
  ['REQ-UX-009', 'Public content supports Simple, Standard, and Technical modes where appropriate.', 'product-experience'],
  ['REQ-UX-010', 'Public web targets WCAG 2.2 AA.', 'product-experience'],
  ['REQ-UX-011', 'Official translations are versioned and reviewable.', 'product-experience'],
  ['REQ-UX-012', 'Sensitive areas disable invasive analytics/session replay by default.', 'product-experience'],
  ['REQ-AST-001', 'Brand and assets use documented identity rules.', 'design-system'],
  ['REQ-AST-002', 'Every production asset has source/license/provenance metadata where applicable.', 'design-system'],
  ['REQ-AST-003', 'Informative visuals have accessible equivalents.', 'design-system'],
  ['REQ-AST-004', 'SVG assets are sanitized before production use.', 'design-system'],
  ['REQ-AST-005', 'Public charts disclose source, unit, and time period.', 'design-system'],
  ['REQ-AST-006', 'Synthetic imagery is labeled when it could be mistaken for documentary reality.', 'design-system'],
  ['REQ-AST-007', 'Evidence imagery remains governed by evidence provenance, not creative asset workflows.', 'design-system'],
  ['REQ-AST-008', 'Logo/brand MUST NOT depict or claim representation of Allah or a prophet.', 'design-system']
] as const;

export const requirements: readonly RequirementEntry[] = Object.freeze(requirementDefinitions.map(([id, statement, owner]) => ({
  id,
  kind: 'requirement' as const,
  title: id,
  statement,
  owner,
  jurisdiction: 'GLOBAL',
  status: 'active' as const,
  version: '1.0.0',
  legalBasis: [BLUEPRINT],
  evidenceRefs: [blueprintEvidence]
})));

const invariantDefinitions = [
  ['ORM-INV-001', 'no_unrestricted_hard_delete_for_governance_records'],
  ['ORM-INV-002', 'no_cross_jurisdiction_mutation_without_authority'],
  ['ORM-INV-003', 'no_material_mutation_without_actor_purpose_request_context'],
  ['ORM-INV-004', 'no_orm_scope_check_replacing_RLS'],
  ['ORM-INV-005', 'no_generic_CRUD_approving_high_impact_decision'],
  ['ORM-INV-006', 'no_duplicate_model_name'],
  ['ORM-INV-007', 'no_addon_dependency_cycle'],
  ['ORM-INV-008', 'no_silent_destructive_production_schema_sync'],
  ['ORM-INV-009', 'no_sensitive_hidden_field_query_leak'],
  ['ORM-INV-010', 'no_addon_upgrade_without_version_and_test']
] as const;

export const invariants: readonly InvariantEntry[] = Object.freeze(invariantDefinitions.map(([id, statement]) => ({
  id,
  kind: 'invariant' as const,
  title: id,
  statement,
  owner: 'platform-data',
  jurisdiction: 'GLOBAL',
  status: 'active' as const,
  version: '1.0.0',
  legalBasis: [BLUEPRINT],
  evidenceRefs: [blueprintEvidence]
})));

const chainDefinitions = [
  ['001', 'ORM-INV-003', 'packages/orm/src/__tests__/kernel.test.ts#rejects out-of-scope creation and missing material mutation context', 'Material ORM mutations carrying actor, purpose, and request ID / total material ORM mutations', '100%'],
  ['002', 'ORM-INV-004', 'packages/orm-postgres/src/__tests__/integration.test.ts#enforces database RLS independently from repository scoping', 'Cross-jurisdiction attempts denied by PostgreSQL RLS / total cross-jurisdiction attempts', '100% deny'],
  ['003', 'ORM-INV-001', 'packages/orm/src/__tests__/kernel.test.ts#archives without hard delete and uses controlled unarchive', 'Governed models without unrestricted hard-delete path / governed models', '100%'],
  ['004', 'ORM-INV-005', 'packages/orm/src/__tests__/admin.test.ts#requires backend authorization for generic mutations', 'High-stakes models rejected by generic mutation UI / high-stakes fixture models tested', '100%'],
  ['005', 'ORM-INV-007', 'packages/orm-base/src/__tests__/base.test.ts#validates addon metadata and dependency contracts', 'Addon dependency graphs passing cycle and version validation / addon dependency graphs checked', '100%']
] as const;

const controls: ControlEntry[] = [];
const rules: RuleEntry[] = [];
const tests: TestEntry[] = [];
const kpis: KpiEntry[] = [];
const links: RegistryLink[] = [];

for (const [suffix, invariantId, testRef, formula, targetStrategy] of chainDefinitions) {
  const reqId = `REQ-ORM-${suffix}`;
  const controlId = `CTRL-ORM-${suffix}`;
  const ruleId = `RULE-ORM-${suffix}`;
  const testId = `TEST-ORM-${suffix}`;
  const kpiId = `KPI-ORM-${suffix}`;
  const testEvidence: EvidenceReference = {
    id: `EVID-ORM-${suffix}-001`,
    kind: 'test-source',
    locator: testRef,
    description: `Executable verification source for ${reqId}.`
  };
  controls.push(baseEntry(controlId, 'control', `Server-side control implementing ${reqId}.`) as ControlEntry);
  rules.push(baseEntry(ruleId, 'rule', `Fail-closed enforcement rule for ${reqId}.`) as RuleEntry);
  tests.push({
    ...baseEntry(testId, 'test', `Executable verification for ${reqId}.`),
    kind: 'test',
    testRef,
    evidenceRefs: [blueprintEvidence, testEvidence]
  } as TestEntry);
  kpis.push({
    ...baseEntry(kpiId, 'kpi', `Traceability KPI for ${reqId}.`),
    kind: 'kpi',
    formula,
    dataSource: testRef,
    reviewCadence: 'per-ci-run',
    targetStrategy
  } as KpiEntry);
  links.push(
    { from: reqId, to: controlId, relation: 'implemented_by' },
    { from: controlId, to: ruleId, relation: 'enforced_by' },
    { from: controlId, to: invariantId, relation: 'enforced_by' },
    { from: ruleId, to: testId, relation: 'verified_by' },
    { from: invariantId, to: testId, relation: 'verified_by' },
    { from: testId, to: kpiId, relation: 'measured_by' }
  );
}

function baseEntry(id: string, kind: RegistryEntry['kind'], statement: string): RegistryEntry {
  return {
    id,
    kind,
    title: id,
    statement,
    owner: 'platform-data',
    jurisdiction: 'GLOBAL',
    status: 'active',
    version: '1.0.0',
    legalBasis: [BLUEPRINT],
    evidenceRefs: [blueprintEvidence]
  } as RegistryEntry;
}

export const registrySeed: RegistrySeed = Object.freeze({
  entries: Object.freeze([
    ...requirements,
    ...invariants,
    ...controls,
    ...rules,
    ...tests,
    ...kpis
  ]),
  links: Object.freeze(links)
});
