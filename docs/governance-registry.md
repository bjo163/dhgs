# Governance registry

`@dhgs/governance-registry` is the portable machine-readable traceability layer for Blueprint requirements, controls, rules, invariants, tests, evidence locators, and KPIs.

## Authority and scope

The Blueprint remains the normative source of truth. The registry gives code, CI, admin tooling, and later persistence layers stable identifiers without importing documentation prose at runtime. It is intentionally code/data portable and does not create a database schema; persistence belongs to later canonical-schema work.

The authority-document reconciliation for Blueprint 15.1.2 establishes:

```text
ONE MACHINE-READABLE ID = ONE CANONICAL REQUIREMENT MEANING
```

Duplicate definitions and dangling links fail validation.

## Namespaces

```text
REQ-<DOMAIN>-NNN
CTRL-<DOMAIN>-NNN
RULE-<DOMAIN>-NNN
<DOMAIN>-INV-NNN   (existing Blueprint invariant form)
INV-<DOMAIN>-NNN   (accepted future invariant form)
TEST-<DOMAIN>-NNN
KPI-<DOMAIN>-NNN
```

Evidence references are locators attached to registry entries and use `EVID-*`; they are not a separate governance-decision authority.

## Trace graph

The allowed directed graph is:

```text
REQUIREMENT
  -> CONTROL           implemented_by
  -> RULE / INVARIANT  enforced_by
  -> TEST              verified_by
  -> KPI               measured_by

TEST / ENTRY
  -> EVIDENCE LOCATORS
```

`GovernanceRegistry.trace(id)` returns the reachable entries, graph edges, and deduplicated evidence locators. `listInvariants()` gives programmatic invariant discovery. `runInvariant()` accepts a runner bound to a registered invariant ID and refuses non-invariant IDs.

## Validation

The registry fails closed on:

- duplicate IDs;
- namespace/kind mismatch;
- unknown status;
- malformed semantic versions;
- dangling links and supersession references;
- invalid relation direction;
- deprecated/superseded entries without a successor;
- malformed evidence metadata;
- incomplete test or KPI metadata.

The package tests include intentional invalid fixtures. Those failures are asserted as expected failures, so CI remains green only when the validator rejects them.

## Initial seed

The initial seed contains every named requirement in the Blueprint minimum and §169 product-experience/asset requirement sets, all ten ORM invariants, and complete trace chains for `REQ-ORM-001..005` tied to existing repository tests. More domains can add controls/rules/tests/KPIs incrementally while preserving stable IDs and explicit version/deprecation metadata.
