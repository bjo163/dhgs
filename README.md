# DHGS — Divine–Human Governance System

> **Digital Governance Assurance Platform** for lawful, evidence-based, accountable, reviewable, correctable, and publicly understandable governance.

**Status:** Blueprint / architecture baseline only  
**Current baseline:** `DHGS v13.0.0`  
**Primary document:** [`BLUEPRINT.md`](./BLUEPRINT.md)

---

## What DHGS is

DHGS is a proposed **governance assurance infrastructure**, not a replacement for a constitution, court, legislature, government, religion, or human judgment.

Its core operational loop is:

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

The platform is intended to make material exercises of public power:

- lawful;
- evidence-based;
- owned by an accountable decision-maker;
- traceable;
- reviewable and appealable;
- correctable without erasing history;
- privacy-preserving;
- understandable to the public.

The North Star is:

> **No material public power without lawful authority, accountable ownership, sufficient evidence, traceable record, reviewability, and a correction path.**

---

## Core concepts

- **Shadow** — independent supervisory, mediation, and accountability function. Shadow supervises power; Shadow does not own power.
- **Mizan** — decision-readiness and balancing engine. It evaluates the quality of a proposed decision, never the intrinsic worth of a person.
- **Hisab Ledger** — append-oriented accountability history for material uses of public power.
- **Open Book** — privacy-safe public communication and transparency layer.
- **Corpus** — curated, versioned, reusable knowledge separated from case-specific evidence.
- **Correction** — a first-class governance capability: detect → acknowledge → correct → record → learn.

---

## Product shape

DHGS is designed as a web platform with clear logical separation:

```text
PUBLIC WEB            OPERATIONS WEB
    │                       │
    └──────────┬────────────┘
               ▼
          BACKEND API
               │
      ┌────────┼─────────┐
      ▼        ▼         ▼
   DOMAIN    ENGINES   CORPUS
   SERVICES
      └────────┼─────────┘
               ▼
            DATA
      PostgreSQL / Storage
               │
      ┌────────┴─────────┐
      ▼                  ▼
 HISAB LEDGER        AUDIT LOG
      │
      ▼
PUBLIC PROJECTION
      │
      ▼
  OPEN BOOK
```

The logical components may live in one monorepo and a small number of deployments during the MVP. **Logical separation does not require microservices.**

---

## Simple-first technology direction

The initial implementation is deliberately simple:

- **TypeScript**
- **Next.js** for Public Web and Operations Web
- **Node.js + Fastify** for the API
- **Pure TypeScript packages** for engines
- **Supabase PostgreSQL** for transactional data
- **Supabase Auth** for authentication
- **PostgreSQL RLS + application roles** for authorization
- **Supabase Storage** for private evidence and corpus files
- **Zod** for runtime validation
- **Vitest + Playwright** for tests
- **GitHub Actions** for CI
- **Vercel + Supabase** for the first deployment stages

Not required for the MVP: Kubernetes, Kafka, blockchain, Temporal, OPA, OpenFGA, vector databases, native mobile apps, or autonomous AI agents.

> **Complexity must be earned.** A new major technology should only be introduced to solve a documented problem.

---

## Intended repository shape

The blueprint anticipates this eventual structure, but this repository is currently intentionally limited to documentation while the baseline is being locked:

```text
dhgs/
├── README.md
├── BLUEPRINT.md
├── apps/
│   ├── public-web/
│   ├── ops-web/
│   └── api/
├── engines/
│   ├── evidence-engine/
│   ├── mizan-engine/
│   ├── policy-engine/
│   ├── rights-engine/
│   ├── knowledge-engine/
│   ├── ledger-engine/
│   ├── publication-engine/
│   └── metrics-engine/
├── corpus/
├── packages/
├── supabase/
├── controls/
├── tests/
├── simulations/
├── docs/
└── adr/
```

No implementation files are created yet by this baseline commit.

---

## Ethical and spiritual boundary

DHGS may use scriptural and prophetic references as an **ethical reference layer**. It does not convert unverifiable spiritual claims into coercive public authority.

The design may attempt compatibility with values such as truth, justice, mercy, rahmah, guidance, consultation, accountability, correction, and protection of human dignity. It does **not** claim divine certification, prophetic ownership, or knowledge of a future prophetic implementation.

The long-term symbolic maturity direction is called **Exit to the Light**. It is a maturity metaphor, not a prophecy date, legal rule, or software feature.

---

## First meaningful MVP

DHGS has a working core when a complete case can flow through:

```text
Citizen submits case
→ jurisdiction and rights mapping
→ evidence review
→ Mizan review
→ legal / ethical review
→ human decision
→ Hisab Ledger
→ privacy-safe Open Book publication
→ appeal / Re-Mizan
→ correction preserving original history
→ outcome review
→ lesson learned / knowledge update
```

The first implementation should prove this flow before adding advanced AI, distributed systems, or additional infrastructure.

---

## Read the full blueprint

The complete consolidated governance, product, engine, corpus, data, control, security, audit, KPI, testing, and implementation specification is in:

**[`BLUEPRINT.md`](./BLUEPRINT.md)**
