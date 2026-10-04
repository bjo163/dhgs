# DHGS — Divine–Human Governance System

> **Digital Governance Assurance Platform** for lawful, evidence-based, accountable, reviewable, correctable, privacy-preserving, accessible, and publicly understandable governance.

**Status:** Controlled implementation blueprint candidate  
**Current baseline:** `DHGS v15.0.0`  
**Primary document:** [`BLUEPRINT.md`](./BLUEPRINT.md)

---

## What DHGS is

DHGS is a proposed **governance assurance infrastructure**. It is not a replacement for a constitution, court, legislature, executive government, religion, or accountable human judgment.

Its operational loop is:

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

Its North Star is:

> **No material public power without lawful authority, accountable ownership, sufficient evidence, traceable record, reviewability, and a correction path.**

---

## Core concepts

- **Shadow** — independent supervisory, mediation, and accountability function. Shadow supervises power; Shadow does not own power.
- **Mizan** — decision-readiness and balancing engine. It does not determine human worth or legal guilt.
- **Hisab Ledger** — append-oriented accountability history for material uses of public power.
- **Open Book** — privacy-safe public communication and transparency layer.
- **Corpus** — curated, versioned, reusable knowledge separated from case-specific evidence.
- **Authority Mandate Registry** — machine-readable record of who may lawfully do what, where, when, and under which legal source.
- **Decision Context Snapshot** — preserved record of the law, policy, rule, corpus, engine, schema, and reviewer versions used for a high-impact decision.
- **Product Experience Plane** — human-facing layer for information architecture, journeys, accessibility, interaction safety, content design, and usability.
- **Visual / Asset Governance** — rules for logos, icons, SVG/vector assets, charts, banners, illustrations, images, print/PDF assets, and synthetic-media disclosure.
- **Correction** — first-class governance capability: detect → acknowledge → correct → record → learn.

---

## Real-world operating modes

DHGS must declare how it is being used:

```text
SANDBOX
VOLUNTARY
INSTITUTIONAL
STATUTORY
```

Sandbox and voluntary deployments do not acquire statutory or coercive authority merely by using DHGS software.

---

## Product architecture

DHGS keeps responsibility logically separated while remaining simple to deploy at first:

```text
PUBLIC WEB                  OPERATIONS WEB
     │                            │
     └────────────┬───────────────┘
                  ▼
             BACKEND API
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 DOMAIN        ENGINES       CORPUS
 SERVICES
      └───────────┼────────────┘
                  ▼
             DATA LAYER
          /       |        \
 POSTGRES     STORAGE     AUDIT LOG
                  │
                  ▼
           PUBLIC PROJECTION
                  │
                  ▼
              OPEN BOOK
```

Important boundaries:

```text
FRONTEND != BACKEND
BACKEND != ENGINES
ENGINES != CORPUS
CORPUS != CASE EVIDENCE
HISAB LEDGER != AUDIT LOG
INTERNAL DATA != PUBLIC DATA
TECHNICAL ADMIN != GOVERNANCE AUTHORITY
```

Logical separation does **not** require microservices.

---

## Product experience and visual system

v15 treats UI/UX as part of governance safety rather than decoration.

The blueprint now defines:

- public and operations information architecture;
- stable screen IDs and screen contracts;
- citizen, reviewer, auditor, Shadow, evidence, Mizan, appeal, and Open Book journeys;
- high-stakes interaction patterns and deliberate confirmation;
- Mizan reviewer score-blinding / independence controls;
- evidence provenance and challenge states in the UI;
- no-dark-pattern appeal and correction UX;
- Open Book Simple / Standard / Technical content modes;
- role-specific dashboards;
- notifications, search, drafts/autosave, session recovery, error/degraded states;
- localization, translation versioning, date/time rules;
- plain-language content standards;
- WCAG 2.2 AA accessibility target and real-user testing;
- DHGS design tokens and component system;
- logo and visual-identity rules;
- icon and sanitized SVG/vector rules;
- chart/graph truthfulness and accessibility rules;
- illustration, banner, image, and synthetic-media policies;
- asset manifest, licensing, consent, provenance, hashing, and performance rules;
- print/PDF/QR document-output standards;
- user research and usability/comprehension metrics.

A central design rule is:

> **Design must clarify power, not glorify it.**

---

## Simple-first technology direction

The initial implementation remains deliberately simple:

- **TypeScript**
- **Next.js + React** for Public Web and Operations Web
- **Node.js + Fastify** for the API
- **Pure TypeScript packages** for engines
- **Supabase PostgreSQL** for transactional data
- **Supabase Auth** for authentication
- **PostgreSQL RLS + application roles** for authorization
- **Supabase Storage** for private evidence and corpus files
- **Zod** for runtime validation
- **Vitest + Playwright** for testing
- **GitHub Actions** for CI
- **Vercel + Supabase** for the initial deployment stages

Not required for the MVP: Kubernetes, Kafka, blockchain, Temporal, OPA, OpenFGA, vector databases, native mobile apps, or autonomous AI agents.

> **Complexity must be earned.** New technology should solve a documented problem.

---

## Important v15 controls

The current baseline includes or strengthens:

- deployment/adoption mode;
- Governance Authority vs Platform Operator separation;
- Data Controller / Processor responsibility;
- Authority Mandate Registry;
- temporal law and policy versioning;
- Legal Basis Precheck before Mizan and Formal Legal Review afterward;
- non-adjudicative Mizan outputs;
- identity-assurance levels;
- notice/service-of-process records;
- evidence challenge, privilege, sealing, and exclusion;
- technical-admin break-glass and two-person controls;
- Decision Context Snapshot and decision attestation;
- actual requirement/control/rule ID namespaces;
- independent oversight of DHGS itself;
- secure software supply-chain controls;
- SLO and restore-test planning;
- WCAG 2.2 AA public-web accessibility target;
- vulnerable-person safeguards;
- reviewer calibration/inter-rater consistency;
- intake abuse/brigading controls;
- capacity and operating-cost planning;
- public open-data contract;
- `CORPUS-RIGHTS` and `CORPUS-SCIENCE`;
- explicit prohibition on deceptive public communication and hidden VIP parallel process;
- product-experience safety invariants;
- screen/journey/design-system governance;
- brand/logo/icon/SVG/chart/banner/image/print asset governance;
- synthetic-media disclosure and evidence separation;
- user research and comprehension testing.

---

## Ethical and spiritual boundary

DHGS may use scriptural and prophetic references as an **ethical reference profile**. It does not convert unverifiable spiritual claims into coercive public authority.

The design may seek compatibility with values such as truth, justice, rahmah, mercy, guidance, consultation, accountability, correction, and human dignity. It does **not** claim Divine certification, prophetic ownership, or knowledge of a future prophetic implementation.

The symbolic maturity direction **Exit to the Light** is a maturity metaphor, not a prophecy date, legal rule, or software feature.

---

## First meaningful implementation

The first complete flow should prove:

```text
Citizen submits case
→ identity assurance determined
→ jurisdiction and authority mandate identified
→ notice / rights obligations identified
→ evidence submitted, challenged, and reviewed
→ legal basis precheck
→ Evidence / Rights / Mizan review
→ formal legal and ethical review
→ accountable human decision and attestation
→ Decision Context Snapshot
→ Hisab Ledger
→ privacy-safe and understandable Open Book publication
→ appeal / Re-Mizan without dark-pattern obstruction
→ correction preserving original history and visible version diff
→ outcome review
→ lesson learned / knowledge update
```

If this works reliably, the core DHGS governance loop is alive.

---

## Current repository scope

The repository is intentionally still documentation-only while the controlled baseline is being locked.

The current root baseline consists of:

```text
README.md
BLUEPRINT.md
```

Future implementation may introduce governed directories for applications, engines, corpus, design system, and assets, but they are not created by this documentation update.

The full governance, product, UX/UI, visual identity, asset, engine, corpus, security, privacy, rights, audit, KPI, testing, institutional, and implementation specification is in:

**[`BLUEPRINT.md`](./BLUEPRINT.md)**
