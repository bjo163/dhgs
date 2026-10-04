# DHGS — Divine–Human Governance System

> **Digital Governance Assurance Platform** for lawful, evidence-based, accountable, reviewable, correctable, privacy-preserving, accessible, and publicly understandable governance.

**Blueprint baseline:** `DHGS v15.0.0`  
**Blueprint status:** Controlled implementation baseline candidate  
**Primary specification:** [`BLUEPRINT.md`](./BLUEPRINT.md)

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
- **Correction** — detect → acknowledge → correct → record → learn.

A central design rule is:

> **Design must clarify power, not glorify it.**

---

## Repository status

The repository has now moved from documentation-only into a **design-foundation and prototype-shell stage**. The governance blueprint remains canonical; code and visual artifacts are implementation experiments until their requirements and tests are satisfied.

```text
dhgs/
├── README.md
├── BLUEPRINT.md
├── design/
│   ├── README.md
│   ├── tokens.json
│   ├── sitemap.md
│   ├── screen-map.md
│   ├── wireframes.md
│   ├── visual-identity.md
│   ├── content-style.md
│   └── asset-manifest.json
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── diagrams/
│   ├── banners/
│   ├── charts/
│   └── social/
├── apps/
│   ├── public-web/
│   ├── ops-web/
│   └── api/
├── packages/
│   └── ui/
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
- machine-readable asset manifest.

See [`design/visual-identity.md`](./design/visual-identity.md) and [`design/asset-manifest.json`](./design/asset-manifest.json).

---

## UX foundation

The repository now contains concrete starting artifacts for:

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

## Simple-first technical direction

The prototype deliberately avoids premature infrastructure complexity.

- **TypeScript**
- **Next.js + React** — Public Web and Operations Web
- **Node.js + Fastify** — API
- **Pure TypeScript packages** — governance engines
- **Supabase PostgreSQL / Auth / Storage** — planned transactional identity/data layer
- **PostgreSQL RLS** — planned authorization enforcement
- **Vitest** — engine tests
- **Playwright** — planned E2E/accessibility journey tests
- **GitHub Actions** — planned CI
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

## Run the prototype locally

Prerequisite: Node.js and pnpm.

```bash
pnpm install
pnpm dev:public   # http://localhost:3000
pnpm dev:ops      # http://localhost:3001
pnpm dev:api      # http://localhost:4000
```

Run available tests:

```bash
pnpm test
```

This is still a **sandbox prototype**. Do not use it for real coercive or high-impact decisions.

---

## Ethical and spiritual boundary

DHGS may use scriptural and prophetic references as an **ethical reference profile**. It does not convert unverifiable spiritual claims into coercive public authority.

The design may seek compatibility with values such as truth, justice, rahmah, mercy, guidance, consultation, accountability, correction, and human dignity. It does **not** claim Divine certification, prophetic ownership, or knowledge of a future prophetic implementation.

`EXIT_TO_THE_LIGHT` remains a symbolic maturity direction, not a prophecy date, legal rule, or software feature.

---

## Canonical specification

The full governance, institutional, product, UX/UI, visual identity, asset, engine, corpus, security, privacy, rights, audit, KPI, testing, and implementation requirements remain in:

**[`BLUEPRINT.md`](./BLUEPRINT.md)**
