# DHGS — Divine–Human Governance System

> **Digital Governance Assurance Platform** for lawful, evidence-based, accountable, reviewable, correctable, privacy-preserving, accessible, and publicly understandable governance.

**Blueprint document baseline:** `DHGS v15.1.2`  
**Blueprint status:** Controlled implementation baseline candidate  
**Software version:** see [`VERSION`](./VERSION) and root `package.json`  
**Primary architectural specification:** [`BLUEPRINT.md`](./BLUEPRINT.md)  
**Operational implementation index:** [GitHub Issue #6 — DHGS implementation roadmap and milestone control](https://github.com/bjo163/dhgs/issues/6)

> **Versioning rule:** the Blueprint document version and the software semantic version are independent version streams. A Blueprint revision does not automatically imply a software release, and a software patch/minor release does not automatically change the Blueprint version.

---

## North Star

> **No material public power without lawful authority, accountable ownership, sufficient evidence, traceable record, reviewability, and a correction path.**

DHGS is governance-assurance infrastructure. It is not a replacement for a constitution, court, legislature, executive government, religion, or accountable human judgment.

Its operating loop is:

```text
RECEIVE
→ KNOW
→ VERIFY
→ ASSIGN
→ ASSESS
→ DECIDE
→ RECORD
→ EXECUTE
→ EXPLAIN
→ MONITOR
→ REVIEW
→ CORRECT
→ LEARN
```

---

## Core concepts

- **Shadow** — independent supervisory, mediation, and accountability function. Shadow supervises power; Shadow does not own power.
- **Mizan** — non-adjudicative decision-readiness and balancing engine. It does not determine legal guilt or human worth.
- **Hisab Ledger** — append-oriented accountability history for material uses of public power.
- **Open Book** — privacy-safe public communication and transparency layer.
- **Corpus** — curated, versioned, reusable knowledge separated from case-specific evidence.
- **Authority Mandate Registry** — machine-readable record of who may lawfully do what, where, when, and under which legal source.
- **Decision Context Snapshot** — preserves the law, policy, rule, corpus, engine, schema, and reviewer versions used for a high-impact decision.
- **Product Experience Plane** — information architecture, journeys, interaction safety, accessibility, content design, and usability.
- **Visual / Asset Governance** — logos, icons, SVG/vector assets, diagrams, charts, banners, images, print/PDF assets, provenance, licensing, and synthetic-media disclosure.
- **DHGS ORM / Model Layer** — a small Odoo-inspired, governance-aware model framework for typed models, manifests, repositories, metadata-driven views, access context, audit hooks, and ledger integration.
- **Correction** — detect → acknowledge → correct → record → learn.

A central design rule is:

> **Design must clarify power, not glorify it.**

---

## Current implementation status

DHGS remains a **controlled implementation candidate**, not a completed governance system.

Current software milestone:

# **M0 — FOUNDATION KERNEL — ACTIVE**

`@dhgs/orm` kernel issue **#1 is complete**. The next foundation work remains inside M0; M1 is not unlocked until exit gate #5 passes.

The milestone exit chain is:

```text
#5   M0 FOUNDATION PASS
 ↓
#19  M1 CASE / IDENTITY / KNOWLEDGE PASS
 ↓
#30  M2 DECISION PASS
 ↓
#42  M3 EXECUTION / ACCOUNTABILITY / PUBLIC PASS
 ↓
#60  M4 ASSURANCE / HARDENING PASS
 ↓
#75  M5 CONTROLLED PILOT GO | CORRECT | NO_GO
 ↓
controlled operation + evidence
 ↓
#76  CONTINUE | CORRECT | RESET
```

The complete operational backlog lives in **master issue #6**. GitHub issue numbers are operational work-item references; stable architecture/traceability IDs remain the `REQ-*`, `CTRL-*`, `RULE-*`, `INV-*`, `TEST-*`, and `KPI-*` identifiers defined by the Blueprint and machine registries.

---

## Reproducible toolchain and dependencies

The controlled baseline is pinned to:

```text
Node.js 22.23.3
pnpm 10.18.0
pnpm-lock.yaml (committed canonical dependency graph)
```

Normal CI/security installs use `pnpm install --frozen-lockfile`. A manifest change without a matching lockfile change is expected to fail. Toolchain and lockfile provenance can be inspected with:

```bash
pnpm toolchain:check
pnpm release:provenance
```

Dependency-update procedure is documented in [`docs/dependency-management.md`](./docs/dependency-management.md).

---

## Repository and delivery model

Long-lived branches under the current architecture:

```text
dev
main
```

Delivery contract:

```text
dev
  ↓ Pull Request only
main
  ↓ semantic version planning
VERSION + package.json
  ↓
CHANGELOG.md
  ↓
vX.Y.Z tag
  ↓
GitHub Release + release-provenance.json
```

`dev` is the active integration branch. `main` is the controlled release branch. Persistent feature/release/hotfix branches are outside the current two-branch architecture.

Server-side GitHub Rulesets are **not yet considered active/verified**; issue **#77** remains the blocking control for server-side branch/tag enforcement. GitHub Actions guards are defense-in-depth, not a substitute for server-side protection.

---

## Repository status

The repository is in a **design-foundation, architecture-kernel, and prototype-shell stage**. The governance blueprint remains canonical; code and visual artifacts are implementation experiments until their requirements and tests are satisfied.

```text
dhgs/
├── README.md
├── BLUEPRINT.md
├── design/
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── diagrams/
│   ├── banners/
│   ├── charts/
│   ├── social/
│   └── images/
├── apps/
│   ├── public-web/
│   ├── ops-web/
│   └── api/
├── packages/
│   ├── ui/
│   ├── data/              # deprecated M0 spike; do not expand
│   ├── orm/               # stable M0 kernel established by issue #1
│   └── orm-base/          # next foundational addon
├── engines/
│   ├── evidence-engine/
│   ├── mizan-engine/
│   ├── policy-engine/
│   ├── ledger-engine/
│   └── publication-engine/
└── corpus/
    ├── governance/
    ├── ethical/
    ├── scriptural/
    └── lessons/
```

The blueprint describes additional future modules. Their absence in the prototype does not remove the blueprint requirement.

---

## Visual exploration

The following board is a **non-canonical visual exploration**. It helps communicate the direction of the brand and interface language, but it is not itself a logo specification, legal seal, or approved final UI.

![DHGS visual exploration styleboard](./assets/images/dhgs-styleboard-exploration-v1.png)

Canonical vector assets and their provenance remain governed through the asset manifest and design documentation.

---

## Product surfaces

### Public Web

Prototype for:

```text
OPEN BOOK
PUBLIC EXPLANATION
CITIZEN PORTAL
APPEAL / CORRECTION DISCOVERABILITY
PUBLIC KNOWLEDGE
```

### Operations Web

Prototype for:

```text
REVIEWER DASHBOARD
MIZAN REVIEW
AUDIT TIMELINE
DECISION CONTEXT VISIBILITY
```

### API

The initial Fastify API exposes only basic technical health/meta endpoints. It explicitly identifies the prototype as `SANDBOX` and has no statutory/coercive authority.

---

## Visual identity and assets

The first exploratory asset set implements a neutral **balanced horizon** concept:

```text
BOUNDARY / ACCOUNTABILITY
+
MIZAN / BALANCE
+
ACCOUNTABLE DECISION POINT
+
MOVEMENT TOWARD CLARITY
```

The logo does not depict Allah, a prophet, a political leader, or an invented governmental seal.

Initial governed assets include:

- primary logo mark and lockup;
- monochrome mark and favicon;
- balance, Open Book, ledger, correction, and audit icons;
- product-architecture diagram;
- six-phase maturity diagram;
- Open Book banner;
- truthful-chart template;
- default social / Open Graph artwork;
- machine-readable asset manifest;
- non-canonical visual exploration/styleboard.

See [`design/visual-identity.md`](./design/visual-identity.md) and [`design/asset-manifest.json`](./design/asset-manifest.json).

---

## UX foundation

The repository contains concrete starting artifacts for:

- public and operations information architecture;
- stable screen IDs;
- low-fidelity wireframe contracts;
- high-stakes interaction patterns;
- Mizan reviewer score blinding;
- evidence status/provenance visibility;
- appeal and correction discoverability;
- role-focused dashboards;
- save/recovery and error-state principles;
- WCAG 2.2 AA target;
- content/plain-language rules;
- shared design tokens and core UI components.

See [`design/`](./design/).

---

## DHGS ORM and data-driven module architecture

DHGS uses a **small Odoo-inspired model/addon pattern**, adapted for governance rather than copied wholesale.

```text
packages/orm
    ↓ framework kernel
packages/orm-base
    ↓ foundational manifest + base models
addon/domain packages
    ↓ cases / evidence / knowledge / governance / openbook / audit
PostgreSQL / Supabase
```

### `@dhgs/orm` — framework kernel

Implemented M0 responsibilities include:

```text
FIELD DEFINITIONS
MODEL DEFINITIONS
MODEL REGISTRY
ENVIRONMENT / REQUEST CONTEXT
DOMAIN / FILTER AST
REPOSITORY / MODEL METHODS
ADAPTER / TRANSACTION CONTRACT
AUDIT / LEDGER HOOKS
```

Manifest/addon loading and metadata-driven UI remain separate M0 work items rather than being silently declared complete by the kernel.

Target ergonomic API:

```ts
const env = createEnvironment({ adapter, registry, context })
const Cases = env.model('case.case')

const rows = await Cases.search([
  ['status', '=', 'submitted'],
  ['jurisdictionId', 'in', context.jurisdictionIds]
])

const record = await Cases.create(values)
await Cases.write(record.id, { title: 'Corrected title' }, { expectedVersion: record.version })
await Cases.archive(record.id, { expectedVersion: record.version + 1 })
```

There is **no unrestricted hard-delete API** for governance records.

### `@dhgs/orm-base` — foundational addon

The base addon should contain only reusable platform models, not Mizan/decision business logic.

Initial model candidates:

```text
base.jurisdiction
base.institution
base.party
base.user_profile
base.access_group
base.group_membership
base.authority_mandate
base.delegation
base.sequence
base.attachment
base.tag
base.tag_link
base.activity
base.notification
base.translation
base.external_id
base.audit_reference
```

Domain-specific models belong in domain addons, for example:

```text
case.*
evidence.*
knowledge.*
governance.*
ledger.*
openbook.*
audit.*
```

### Manifest pattern

Each addon/package should expose one manifest:

```ts
export const manifest = defineAddon({
  name: 'case',
  version: '0.1.0',
  depends: ['base'],
  models: [...],
  data: [...],
  views: [...],
  menus: [...],
  actions: [...],
  access: [...],
  upgrades: {...}
})
```

Manifest metadata is the canonical module boundary. Dependencies must be explicit and cycle-free.

### Data-driven views

Model metadata may generate safe list/form/search administration screens:

```text
MODEL
+
FIELD METADATA
+
VIEW METADATA
+
ACCESS CONTEXT
→
GENERIC LOW-RISK UI
```

This must **not** turn high-stakes governance into generic CRUD.

Explicit screens/workflows remain mandatory for:

```text
MIZAN
LEGAL / RIGHTS REVIEW
DECISION AUTHORIZATION
APPEAL
CORRECTION
EMERGENCY POWER
HIGH-IMPACT PUBLICATION
```

### Governance-aware context

Every material model mutation carries:

```text
actor_id
request_id
purpose
identity_assurance
jurisdiction
institution
roles / permissions
correlation context
```

PostgreSQL RLS remains authoritative; ORM scope checks add defense-in-depth, not a replacement for RLS.

The existing `packages/data` package is a **deprecated prototype** retained temporarily for migration evidence. New development must target `@dhgs/orm`.

---

## Simple-first technical direction

The prototype deliberately avoids premature infrastructure complexity.

- **TypeScript**
- **Next.js + React** — Public Web and Operations Web
- **Node.js + Fastify** — API
- **Pure TypeScript packages** — governance engines and ORM kernel
- **Supabase PostgreSQL / Auth / Storage** — planned transactional identity/data layer
- **PostgreSQL RLS** — planned authorization enforcement
- **Vitest** — unit / rule / ORM tests
- **Playwright** — planned E2E/accessibility journey tests
- **GitHub Actions** — CI/release/security automation
- **Vercel + Supabase** — intended initial hosted environments

Not required for the MVP: Kubernetes, Kafka, blockchain, Temporal, OPA, OpenFGA, vector databases, native mobile apps, or autonomous AI agents.

> **Complexity must be earned.**

---

## Engine boundary

Current engine packages are deliberately small and advisory:

```text
Evidence Engine
→ evidence quality / confidence only

Mizan Engine
→ decision readiness only
→ never legal guilt

Policy Engine
→ explicit guard actions

Ledger Engine
→ append/correction record helpers

Publication Engine
→ P0/P1 public-projection guard
```

The corpus remains separate from case evidence. Scriptural/ethical references remain reference material and do not automatically create coercive authority.

---

## Issue-led implementation discipline

From this point, implementation is **issue-first**.

```text
BLUEPRINT REQUIREMENT
→ MILESTONE
→ GITHUB ISSUE
→ IMPLEMENTATION
→ TEST
→ ACCEPTANCE
→ CLOSE
```

Rules:

1. **Only one milestone is active at a time.**
2. Non-trivial implementation MUST have an issue before code is expanded.
3. Every implementation issue MUST state scope, non-scope, dependencies, linked blueprint requirements, acceptance criteria, and tests.
4. A new idea that does not belong to the active milestone goes to the master backlog; it does not interrupt current work.
5. Scope growth during implementation requires updating the issue or creating a follow-up issue.
6. A closed issue must satisfy its acceptance criteria; “code exists” is not enough.
7. Critical behavior must have tests before its milestone can exit.

### Milestone sequence

```text
M0 — FOUNDATION KERNEL
     ORM / ORM-BASE / DB-RLS / schemas-events / async-outbox
     UI contracts / repository automation / server-side rulesets
     pinned toolchain / reproducible dependency baseline / documentation alignment

M1 — CASE, IDENTITY, KNOWLEDGE & INTAKE SPINE
     authentication / authorization / mandate / case / work / notice
     privacy-noticed intake / secure evidence-file boundary
     corpus lifecycle / knowledge retrieval / protected reporting

M2 — DECISION SPINE
     legal precheck / rights / evidence engine / Mizan / policy guard
     legal-ethical review / conflict / human decision / context snapshot

M3 — EXECUTION, ACCOUNTABILITY & PUBLIC
     decision execution / remedy verification / Hisab / software Audit
     publication-redaction / Open Book / resource context
     appeal / correction / public interfaces

M4 — ASSURANCE & HARDENING
     security / privacy / resilience / accessibility / independent oversight
     risk-control assurance / metrics / anti-capture / simulation / calibration

M5 — DEPLOYMENT, GOVERNANCE-OF-SOFTWARE & CONTROLLED PILOT
     separated environments / migrations / controlled production release
     external boundaries / operating modes / optional AI-signature controls
     pilot go-no-go / year-one evidence and system review
```

Only **M0** should be actively implemented now. Later milestones remain planned but intentionally blocked until the previous exit gate passes.

---

## Run the prototype locally

Prerequisites: Node `22.23.3` and pnpm `10.18.0`.

```bash
pnpm toolchain:check
pnpm install --frozen-lockfile
pnpm dev:public   # http://localhost:3000
pnpm dev:ops      # http://localhost:3001
pnpm dev:api      # http://localhost:4000
```

Run available tests:

```bash
pnpm check
```

This is still a **sandbox prototype**. Do not use it for real coercive or high-impact decisions.

---

## Ethical and spiritual boundary

DHGS may use scriptural and prophetic references as an **ethical reference profile**. It does not convert unverifiable spiritual claims into coercive public authority.

The design may seek compatibility with values such as truth, justice, rahmah, mercy, guidance, consultation, accountability, correction, and human dignity. It does **not** claim Divine certification, prophetic ownership, or knowledge of a future prophetic implementation.

`EXIT_TO_THE_LIGHT` remains a symbolic maturity direction, not a prophecy date, legal rule, or software feature.

---

## Canonical specification

The full governance, institutional, product, UX/UI, visual identity, asset, engine, corpus, ORM/model-layer, security, privacy, rights, audit, KPI, testing, and implementation requirements remain in:

**[`BLUEPRINT.md`](./BLUEPRINT.md)**

Implementation progress is tracked through GitHub Issues rather than by continuously expanding scope inside code.
