# DHGS v15.1.0 — Controlled Implementation, Product Experience & Data-Driven Architecture Blueprint

## Divine–Human Governance System

**Document ID:** `DHGS-BP-001`  
**Version:** `15.1.0`  
**Status:** `CONTROLLED_IMPLEMENTATION_BASELINE_CANDIDATE`  
**Document type:** Governance + Product + UX/UI + Visual Identity + Asset + Engine + Corpus + ORM/Data-Driven + Technical + Institutional Architecture Blueprint  
**Product type:** Digital Governance Assurance Platform  
**Architecture strategy:** Logical separation, simple deployment, modular monolith first  
**Primary evaluation horizon:** `1 Hijri Year`  
**Long-term symbolic maturity direction:** `EXIT_TO_THE_LIGHT`

---

# 0. Document control, scope, and normative language

This document is the **single source of truth** for the DHGS foundational and implementation architecture. It consolidates the governance, Shadow, Mizan, Hisab Ledger, Open Book, knowledge/corpus, work, identity, product, product-experience, visual-asset, ORM/data-driven model layer, technical, control, security, privacy, audit, and implementation principles developed in earlier versions.

The intent of v15.1 is **lossless consolidation plus ORM/addon architecture and issue-led implementation governance**. Concepts from earlier baselines remain valid unless explicitly superseded here.

Normative language:

| Term | Meaning |
|---|---|
| `MUST` | mandatory requirement |
| `MUST_NOT` | prohibited |
| `SHOULD` | recommended; exceptions require rationale |
| `SHOULD_NOT` | discouraged; exceptions require rationale |
| `MAY` | optional |
| `HARD_FAIL` | action cannot be authorized |
| `HOLD` | pause pending evidence or review |
| `ESCALATE` | transfer to higher or independent authority |
| `UNRESOLVED` | valid state when certainty is insufficient |

Canonical documentation rule:

```text
ONE RULE
ONE LOCATION
ONE OWNER
ONE VERSION
```

Other documents SHOULD reference canonical rules rather than silently duplicate them.

---

# PART I — Mission, boundary, adoption, and success

# 1. What DHGS is

DHGS is a:

# DIGITAL GOVERNANCE ASSURANCE PLATFORM

It helps people and institutions transform:

```text
INFORMATION
→ KNOWLEDGE
→ EVIDENCE
→ WORK
→ REVIEW
→ DECISION
→ ACCOUNTABILITY
→ PUBLIC EXPLANATION
→ APPEAL
→ CORRECTION
→ LEARNING
```

into a structured, auditable, human-readable process.

DHGS is governance-assurance infrastructure. It is not itself a sovereign state.

---

# 2. Main mission — `MIS-001`

> Build a lawful, evidence-based, human-centered, transparent, accountable, auditable, appealable, and self-correcting governance system in which material exercises of public power can be explained, reviewed, challenged, corrected, and learned from.

```yaml
mission:
  id: MIS-001
  lawful: true
  evidence_based: true
  accountable: true
  human_centered: true
  transparent: true
  auditable: true
  appealable: true
  correctable: true
  self_correcting: true
```

---

# 3. Human goal

DHGS seeks to protect and balance:

```text
TRUTH
JUSTICE
MERCY
HUMAN DIGNITY
FREEDOM
RESPONSIBILITY
DUE PROCESS
PEACE
```

The system does not optimize for punishment count, ideological conformity, religious conformity, or concentration of authority.

---

# 4. Governance goal and North Star

## `NST-001`

> **No material public power without lawful authority, accountable ownership, sufficient evidence, traceable record, reviewability, and a correction path.**

Conceptual model:

\[
ValidPower = L \times O \times E \times T \times R \times C
\]

Where:

```text
L = lawful authority
O = accountable owner
E = evidence requirement
T = traceability
R = reviewability
C = correction path
```

If a mandatory gate is zero:

\[
Authorization = 0
\]

No weighted score may override a legal, jurisdictional, due-process, human-rights, or red-line failure.

---

# 5. Software goal

The software translates governance into:

```text
FRONTENDS
BACKEND APIs
WORKFLOWS
ENGINES
CORPUS
ORM / MODEL LAYER
DATABASES
RULES
CONTROLS
LEDGER
AUDIT TRAILS
PUBLIC RECORDS
TESTS
```

that real people can use and inspect.

---

# 6. System non-goals

DHGS `MUST_NOT` become:

```yaml
non_goals:
  - replacement_for_constitution
  - replacement_for_courts
  - replacement_for_legislature
  - replacement_for_executive_government
  - replacement_for_religion
  - religious_court_by_software
  - social_credit_system
  - sin_or_spiritual_merit_scoring
  - total_surveillance_system
  - autonomous_ai_government
  - automatic_criminal_judgment
  - personality_cult_platform
```

---

# 7. Real-world adoption modes

DHGS MUST declare its operating mode. Capability and authority depend on the mode.

```yaml
AdoptionMode:
  SANDBOX:
    real_public_authority: false
    real_coercive_decisions: false

  VOLUNTARY:
    real_public_authority: false
    coercive_decisions: false
    use: voluntary_assurance_or_mediation

  INSTITUTIONAL:
    real_public_authority: limited_to_host_institution
    authority_source: institutional_mandate

  STATUTORY:
    real_public_authority: true
    authority_source: constitution_law_or_valid_regulation
```

Rules:

```text
SANDBOX / VOLUNTARY
→ MUST NOT impersonate statutory authority.

INSTITUTIONAL
→ MUST remain inside the institution's lawful mandate.

STATUTORY
→ MUST identify explicit legal authority for each coercive capability.
```

No deployment may silently move from one adoption mode to another.

---

# 8. Institutional operator model

DHGS distinguishes governance authority from technical operation.

```yaml
InstitutionalRole:
  GOVERNANCE_AUTHORITY:
    purpose: lawful_governance_ownership

  SYSTEM_STEWARD:
    purpose: blueprint_and_system_integrity

  PLATFORM_OPERATOR:
    purpose: technical_operation

  DATA_CONTROLLER:
    purpose: determine_lawful_data_purpose_and_means

  DATA_PROCESSOR:
    purpose: process_data_under_controller_instruction

  INDEPENDENT_OVERSIGHT:
    purpose: audit_DHGS_and_governance_actors

  SECURITY_OFFICER:
    purpose: security_risk_and_incident_accountability

  PRIVACY_OFFICER:
    purpose: privacy_and_data_protection_accountability
```

Invariant:

```text
TECHNICAL ADMINISTRATION
!=
GOVERNANCE AUTHORITY
```

A system administrator MUST NOT alter a governance outcome merely because they possess technical access.

---

# 9. Definition of success

Success is not primarily measured by:

```text
NUMBER OF PUNISHMENTS
NUMBER OF RULES
SIZE OF SHADOW AUTHORITY
NUMBER OF FOLLOWERS
RELIGIOUS SYMBOL COUNT
PUBLIC PRAISE
```

Success is measured by trends such as:

```text
FEWER UNSUPPORTED DECISIONS
LESS HIDDEN CONFLICT OF INTEREST
GREATER TRACEABILITY
BETTER EVIDENCE QUALITY
LESS ABUSE OF POWER
FASTER AND MORE COMPLETE CORRECTION
BETTER RESTITUTION / RESTORATION
LOWER REPEAT HARM
STRONGER WHISTLEBLOWER SAFETY
BETTER PRIVACY PROTECTION
BETTER PUBLIC UNDERSTANDING
BETTER INSTITUTIONAL LEARNING
```

---

# 10. Long-term maturity direction

`EXIT_TO_THE_LIGHT` is a symbolic maturity direction, not a legal rule, software feature, prophecy date, or verified Divine deadline.

Operationally it means a system increasingly able to:

```text
UNDERSTAND ITSELF
EXPLAIN ITSELF
LIMIT ITSELF
AUDIT ITSELF
CORRECT ITSELF
RECOVER FROM FAILURE
LEARN FROM FAILURE
PROTECT HUMAN DIGNITY
```

---

# PART II — Foundational governance

# 11. The Eight Foundations

| ID | Foundation | Operational meaning |
|---|---|---|
| `F1` | Truth | distinguish fact from rumor, interpretation, belief, symbolism, hypothesis, and unknown |
| `F2` | Law | no actor or institution is above lawful constitutional order |
| `F3` | Justice | due process, fairness, equal protection, proportionality |
| `F4` | Mercy | restitution, rehabilitation, reconciliation, and second chances where safe and just |
| `F5` | Accountability | material public power leaves a traceable record |
| `F6` | Correction | detect → acknowledge → correct → record → learn |
| `F7` | Transparency | larger public impact creates larger duty to explain, subject to lawful privacy limits |
| `F8` | Human Dignity | a person is never reducible to a score, case number, or object of control |

---

# 12. Core covenant

```text
NO POWER WITHOUT ACCOUNTABILITY.
NO DECISION WITHOUT REASON.
NO JUDGMENT WITHOUT EVIDENCE.
NO PUNISHMENT WITHOUT PROPORTIONALITY.
NO MERCY WITHOUT RESPONSIBILITY.
NO CORRECTION WITHOUT RECORD.
NO TRANSPARENCY WITHOUT HUMAN PROTECTION.
NO UNVERIFIABLE SPIRITUAL CLAIM AS THE SOLE BASIS FOR COERCIVE PUBLIC ACTION.
```

---

# 13. Authority precedence

```text
L0 — ETHICAL / DIVINE VALUES
L1 — CONSTITUTION & LAW
L2 — GOVERNANCE PROTOCOL
L3 — OPERATIONAL POLICY
L4 — CASE DECISION
L5 — HISAB LEDGER / ACCOUNTABILITY RECORD
L6 — OPEN BOOK / PUBLIC PROJECTION
```

For coercive public authority:

```text
CONSTITUTION & LAW
>
GOVERNANCE PROTOCOL
>
OPERATIONAL POLICY
>
CASE DECISION
```

Invalid relationships:

```text
SHADOW > CONSTITUTION
PERSONAL PREFERENCE > LAW
POPULARITY > FUNDAMENTAL RIGHTS
RUMOR > EVIDENCE
SPIRITUAL CLAIM > DUE PROCESS
TECHNICAL ADMIN > GOVERNANCE PROCESS
```

---

# 14. Legal and ethical dual review

Material decisions distinguish:

```text
LEGAL STATUS
from
ETHICAL ASSESSMENT
```

An action may be lawful but ethically problematic, ethically desirable but unauthorized, or legally contested.

Ethical concern alone does not create coercive authority.

If existing law is believed unjust:

```text
IDENTIFY
→ DOCUMENT
→ LEGAL / CONSTITUTIONAL REVIEW
→ JUDICIAL OR LEGISLATIVE PROCESS
→ AMENDMENT / NEW LAW WHERE LAWFUL
```

Shadow may not personally override law.

---

# PART III — Ethical, religious, and prophetic reference

# 15. Religion as Ethical Canopy / Orbit Governance

Religion may serve as moral memory, ethical reference, conscience, and public reasoning while remaining distinct from coercive legal authority.

```text
RELIGIOUS / ETHICAL REFERENCE
→ conscience, meaning, reflection, ethical review

CONSTITUTION & LAW
→ coercive public authority
```

DHGS rejects both forced erasure of religion and automatic theocratic control.

---

# 16. Scriptural Reference Matrix

Functional abstraction only; not an exhaustive theological classification.

| Scripture | Functional lens |
|---|---|
| Taurat | `LAW / ORDER / JUDGMENT` |
| Zabur | `PRAISE / REMEMBRANCE / HOPE` |
| Injil | `GUIDANCE / HEART / MERCY` |
| Al-Qur'an | `CRITERION / INTEGRATION / CORRECTION` |

\[
LAW + REMEMBRANCE + MERCY + CRITERION = BALANCED\ MORAL\ ARCHITECTURE
\]

DHGS does not claim that any scripture has only one function.

---

# 17. Prophetic Alignment Profile

Prophetic alignment is an **ethical reference profile**, not legal authority.

Suggested profile identifier:

```text
PROFILE-PROPHETIC-ISLAMIC
```

Reference values may include:

```text
TRUTH
JUSTICE
RAHMAH
MERCY
GUIDANCE
LIGHT
SHURA / CONSULTATION
ACCOUNTABILITY
CORRECTION
RESISTANCE TO FALSEHOOD
HUMAN DIGNITY
```

DHGS may say:

> This design attempts to align with identified scriptural and prophetic values.

DHGS MUST NOT claim:

```text
GOD APPROVED THIS IMPLEMENTATION
A PROPHET AUTHORIZED THIS SOFTWARE
ISA / JESUS WILL USE DHGS
DHGS FULFILLS A PROPHECY
```

---

# 18. Muhammad ﷺ — value-alignment lens

Design themes may include:

```text
RAHMAH
JUSTICE
NON-FAVORITISM
ACCOUNTABILITY
SHURA
CORRECTION
```

System implications:

```text
NO SHADOW IMMUNITY
NO FRIEND / ENEMY JUSTICE STANDARD
HIGH-IMPACT DECISIONS REQUIRE REVIEW
POWER SHOULD NOT DEPEND ON ONE PERSON
HARM SHOULD BE REDUCED WHERE JUSTICE ALLOWS
```

---

# 19. Isa / Jesus — value-alignment lens

Within Qur'anic and Islamic-traditional framing, DHGS may treat:

```text
GUIDANCE
LIGHT
MERCY
COMPASSION
TRUTH
JUSTICE
CORRECTION
```

as ethical reference points.

Islamic eschatological tradition associates Isa's return with just judgment. DHGS may use this as an ethical reference toward justice and correction of falsehood, but MUST NOT claim to know or implement a future prophetic governance program.

---

# 20. Divine–Human communication boundary

Spiritual experiences, dreams, intuitions, perceived signs, religious interpretations, or perceived Divine communication may inform reflection but cannot automatically become coercive public authority.

```text
RECEIVE
→ REFLECT
→ CLASSIFY
→ VERIFY WHERE POSSIBLE
→ DISCUSS
→ LEGAL BASIS PRECHECK
→ MIZAN
→ FORMAL LEGAL REVIEW
→ ETHICAL REVIEW
→ HUMAN DECISION
→ AUDIT
```

Invariant:

```text
UNVERIFIABLE SPIRITUAL INPUT
!=
COERCIVE PUBLIC AUTHORITY
```

---

# PART IV — Seven-plane architecture

# 21. Architecture planes

```text
┌────────────────────────────────────┐
│ GOVERNANCE PLANE                   │
│ Law / Shadow / Mizan / Appeal      │
├────────────────────────────────────┤
│ KNOWLEDGE PLANE                    │
│ Corpus / Sources / Versions        │
├────────────────────────────────────┤
│ WORK PLANE                         │
│ Tasks / Queue / SLA / Ownership    │
├────────────────────────────────────┤
│ IDENTITY PLANE                     │
│ Actors / Roles / Authority         │
├────────────────────────────────────┤
│ DATA PLANE                         │
│ Models / Cases / Evidence / Ledger │
├────────────────────────────────────┤
│ CONTROL PLANE                      │
│ Rules / Risk / Overrides           │
├────────────────────────────────────┤
│ OBSERVABILITY PLANE                │
│ Audit / Metrics / Open Book        │
└────────────────────────────────────┘
```

Cross-cutting:

```text
SECURITY
PRIVACY
HUMAN RIGHTS
COMPLIANCE
RESILIENCE
CHANGE MANAGEMENT
AI GOVERNANCE
ACCESSIBILITY
PRODUCT EXPERIENCE
VISUAL / ASSET GOVERNANCE
ORM / DATA-DRIVEN MODULE GOVERNANCE
```

---

# PART V — Product and technical architecture

# 22. Primary communication medium

Canonical medium:

# WEB PLATFORM / PWA

Secondary channels:

```text
EMAIL
PRINTED SUMMARY
QR CODE
SMS — later
WHATSAPP — later
SOCIAL MEDIA — information only
```

Secondary channels are never the authoritative record.

Canonical public source:

# OPEN BOOK

---

# 23. User-facing applications

## `APP-PUB` — Public Web

```text
OPEN BOOK
CITIZEN PORTAL
PUBLIC KNOWLEDGE
PUBLIC FEEDBACK
APPEAL / CORRECTION REQUEST
```

## `APP-OPS` — Operations Web

```text
CASE WORKSPACE
TASK WORKSPACE
EVIDENCE REVIEW
MIZAN WORKSPACE
LEGAL REVIEW
ETHICAL REVIEW
AUDIT
SHADOW OVERSIGHT
KNOWLEDGE MANAGEMENT
```

Public users MUST NOT access internal operations screens.

---

# 24. High-level product architecture

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
 SERVICES        │
      │           ▼
      │       ORM / MODEL LAYER
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

Separation rules:

```text
FRONTEND != BACKEND
BACKEND != ENGINES
ENGINES != CORPUS
CORPUS != CASE EVIDENCE
ORM != GOVERNANCE AUTHORITY
HISAB LEDGER != AUDIT LOG
INTERNAL DATA != PUBLIC DATA
TECHNICAL ADMIN != GOVERNANCE AUTHORITY
```

Logical separation does not require microservices.

---

# 25. Simple-first technology stack

```text
ONE MONOREPO
TWO FRONTENDS
ONE BACKEND API
PURE TYPESCRIPT ENGINE PACKAGES
PURE TYPESCRIPT ORM / ADDON PACKAGES
ONE SUPABASE PROJECT PER ENVIRONMENT
ONE POSTGRES DATABASE PER ENVIRONMENT
```

| Layer | MVP technology |
|---|---|
| Language | TypeScript |
| Public frontend | Next.js + React |
| Operations frontend | Next.js + React |
| Styling | Tailwind CSS |
| Backend API | Node.js + Fastify |
| Runtime validation | Zod |
| Engines | Pure TypeScript packages |
| ORM/model layer | DHGS TypeScript packages over PostgreSQL adapter |
| Database | PostgreSQL via Supabase |
| Authentication | Supabase Auth |
| Authorization | app roles + PostgreSQL RLS |
| Files | Supabase Storage |
| Unit tests | Vitest |
| E2E tests | Playwright |
| Source control | GitHub |
| CI | GitHub Actions |
| Initial hosting | Vercel + Supabase |

Deferred until justified:

```text
MICROSERVICES
KUBERNETES
KAFKA
BLOCKCHAIN
TEMPORAL
OPA
OPENFGA
VECTOR DATABASE
NATIVE MOBILE APPS
AUTONOMOUS AI AGENTS
```

Rule:

# COMPLEXITY MUST BE EARNED.

---

# 26. Target repository shape

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
│   ├── legal/
│   ├── rights/
│   ├── science/
│   ├── governance/
│   ├── ethical/
│   ├── scriptural/
│   ├── policy/
│   ├── procedure/
│   ├── precedent/
│   └── lessons/
├── packages/
│   ├── orm/                 # model/addon kernel
│   ├── orm-base/            # foundational reusable addon
│   ├── data/                # temporary prototype/spike until M0 migration
│   ├── domain/
│   ├── schemas/
│   ├── database/
│   ├── auth/
│   ├── events/
│   └── ui/
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── illustrations/
│   ├── banners/
│   ├── images/
│   ├── charts/
│   ├── social/
│   └── print/
├── design/
├── supabase/
├── controls/
├── tests/
├── simulations/
├── docs/
├── adr/
└── .github/
```

The repository MAY later add explicit addon packages such as `addon-case`, `addon-evidence`, or equivalent domain packages once M0 contracts are stable.

---

# PART VI — Identity, trust, authority, and competency

# 27. Actor types

```yaml
ActorType:
  PUBLIC
  CITIZEN
  CLAIMANT
  RESPONDENT
  VICTIM
  AFFECTED_PARTY
  REPRESENTATIVE
  WITNESS
  REVIEWER
  LEGAL_REVIEWER
  ETHICS_REVIEWER
  AUDITOR
  LEDGER_CUSTODIAN
  EXECUTION_OFFICER
  WHISTLEBLOWER
  SHADOW
  ADMIN
  EXTERNAL_OBSERVER
```

One human may hold multiple contextual roles subject to separation-of-duty and conflict controls.

---

# 28. Identity assurance levels

Authentication does not automatically establish legal identity.

```yaml
IdentityAssurance:
  IA0_ANONYMOUS:
    identity_verified: false

  IA1_PSEUDONYMOUS:
    account_continuity: true
    civil_identity_verified: false

  IA2_VERIFIED_PERSON:
    civil_identity_verified: true

  IA3_VERIFIED_OFFICIAL:
    civil_identity_verified: true
    official_role_verified: true

  IA4_VERIFIED_INSTITUTION:
    institutional_authority_verified: true
```

Each service MUST define the minimum assurance level required. Whistleblower channels MAY intentionally support lower identity disclosure where lawful.

---

# 29. Authorization model

\[
Access = Identity \land Permission \land Jurisdiction \land Purpose \land DataAccess
\]

MVP implementation:

```text
SUPABASE AUTH
+
APPLICATION ROLE
+
POSTGRES RLS
```

Examples:

```text
PUBLIC → public_records only
CITIZEN → own authorized cases / submissions
REVIEWER → assigned cases
LEGAL_REVIEWER → authorized legal-review scope
AUDITOR → authorized audit scope
SHADOW → oversight views, not unrestricted mutation
ADMIN → technical administration, fully audited
```

---

# 30. Privileged access and technical-admin control

Privileged operations include:

```text
ROLE GRANT / REVOKE
SECURITY CONFIGURATION
ADMINISTRATIVE DATA ACCESS
POLICY CHANGE
LEDGER ADMINISTRATION
EMERGENCY ACCESS
KEY MANAGEMENT
```

High-risk privileged action SHOULD require:

```text
STRONG AUTHENTICATION
JUSTIFICATION
TIMESTAMP
AUDIT TRACE
SECONDARY APPROVAL / TWO-PERSON CONTROL
TIME-LIMITED ACCESS WHERE PRACTICAL
```

Break-glass access MUST be exceptional, time-limited, justified, and independently reviewed afterward.

Invariant:

```text
NO SYSTEM ADMIN MAY ALTER A GOVERNANCE OUTCOME
OUTSIDE THE GOVERNANCE CORRECTION PROCESS.
```

---

# 31. Delegated authority

```yaml
Delegation:
  delegation_id:
  delegator:
  delegate:
  permissions:
  jurisdiction:
  purpose:
  starts_at:
  expires_at:
  revocable: true
```

Delegation MUST NOT silently expand authority.

---

# 32. Trust model

Trust is purpose-limited.

```yaml
SHADOW:
  trusted_for: [oversight, mediation, triggering_review]
  not_trusted_for: [sole_conviction, sole_ledger_control]

AUDITOR:
  trusted_for: [audit, assurance]
  not_trusted_for: [policy_ownership]

LEDGER:
  trusted_for: [record_integrity]
  not_trusted_for: [moral_judgment]

MIZAN:
  trusted_for: [decision_readiness]
  not_trusted_for: [legal_conviction, spiritual_judgment]

PLATFORM_OPERATOR:
  trusted_for: [technical_operation]
  not_trusted_for: [governance_outcome_override]
```

---

# 33. Competency and reviewer calibration

```yaml
Competency:
  competency_id:
  role:
  qualification_or_equivalent:
  experience:
  required_training:
  certification:
  recertification_period:
  conflict_requirements:
  disqualifiers:
```

Critical training may include:

```text
ETHICS
EVIDENCE
PRIVACY
SECURITY
HUMAN RIGHTS
BIAS AWARENESS
MIZAN PROCESS
CONFLICT OF INTEREST
WHISTLEBLOWER PROTECTION
```

Certification states:

```text
NOT_CERTIFIED
PROVISIONAL
CERTIFIED
SUSPENDED
EXPIRED
REVOKED
```

Restricted tasks MUST NOT be assigned to unqualified actors.

Mizan reviewers SHOULD undergo calibration exercises using common scenarios. DHGS SHOULD monitor inter-rater disagreement and document adjudication of large scoring differences.

---

# PART VII — Shadow governance

# 34. Shadow definition and functions

Shadow is an:

# INDEPENDENT SUPERVISORY • MEDIATION • ACCOUNTABILITY FUNCTION

Not:

```text
MONARCH
PROPHET
SUPREME JUDGE
SOURCE OF LAW
OWNER OF GOVERNMENT
UNREVIEWABLE REPRESENTATIVE OF GOD
```

Functions:

```text
WATCH
CONNECT
CORRECT
ACCOUNT
```

# SHADOW SUPERVISES POWER. SHADOW DOES NOT OWN POWER.

---

# 35. Shadow legitimacy and jurisdiction

Required:

```text
LEGAL MANDATE
PUBLICLY DEFINED MANDATE
INDEPENDENT OVERSIGHT
DEFINED TERM
REMOVAL MECHANISM
CONFLICT DISCLOSURE
```

\[
SLV = L \times P \times O \times T \times R
\]

Any mandatory zero invalidates the mandate for DHGS purposes.

Every mandate SHOULD define:

```text
TERRITORY
SUBJECT MATTER
AUTHORITY LEVEL
START DATE
EXPIRATION / TERM
ESCALATION AUTHORITY
PROHIBITED ACTIONS
```

# NO MANDATE = NO JURISDICTION.

---

# 36. Appointment, suspension, removal, succession

```text
TRANSPARENT NOMINATION / IDENTIFICATION
→ ELIGIBILITY REVIEW
→ CONFLICT REVIEW
→ FIT-AND-PROPER REVIEW
→ PUBLIC DISCLOSURE WHERE LAWFUL
→ LAWFUL CONFIRMATION
```

Removal grounds may include:

```text
CORRUPTION
ABUSE OF POWER
SERIOUS LEGAL VIOLATION
LEDGER MANIPULATION
UNDISCLOSED MATERIAL CONFLICT
INCAPACITY
PERSISTENT REFUSAL OF AUDIT
FUNDAMENTAL DUTY VIOLATION
```

Removal:

```text
ALLEGATION
→ INDEPENDENT INVESTIGATION
→ EVIDENCE REVIEW
→ DUE PROCESS
→ DECISION
→ PUBLIC SUMMARY WHERE LAWFUL
```

Shadow cannot determine its own guilt or removal outcome. Succession MUST be predefined, lawful, auditable, and non-hereditary by default.

---

# 37. Zero-profit rule

\[
UndisclosedPersonalBenefit = 0
\]

Potential lawful benefit:

```text
DECLARE
→ RECORD
→ REVIEW
→ RETURN / TRANSFER / DISPOSE ACCORDING TO LAW
```

No hidden commission, kickback, success fee, proxy benefit, family enrichment, or payment by mediated parties.

---

# 38. Conflict of interest

Types:

```text
FINANCIAL
FAMILY
POLITICAL
BUSINESS
RELIGIOUS ORGANIZATIONAL
PERSONAL
PRIOR INVOLVEMENT
OTHER MATERIAL INTEREST
```

```text
DISCLOSE
→ RECUSE
→ REASSIGN
```

Undisclosed material conflict may trigger review of the affected decision.

---

# 39. Institutional separation and anti-capture

Critical functions:

```text
SHADOW OFFICE
MIZAN REVIEW
LEGAL / ETHICAL REVIEW
LEDGER CUSTODIAN
EXECUTION
AUDIT
APPEAL
PLATFORM OPERATION
```

No single actor or network SHOULD control accusation, investigation, judgment, ledger administration, execution, appeal, and platform administration for the same high-impact matter.

Safeguards:

```text
TERM LIMITS
ROLE ROTATION
DISTRIBUTED APPOINTMENT
FINANCIAL DISCLOSURE
INDEPENDENT AUDIT
COOLING-OFF PERIOD
CONFLICT CHECKS
WHISTLEBLOWER PROTECTION
NO SINGLE NETWORK CONTROL
```

No privileged/VIP parallel process:

```text
SAME CORE PROCESS
REGARDLESS OF STATUS,
SUBJECT ONLY TO LAWFUL ROLE-SPECIFIC PROCEDURES.
```

---

# 40. Whistleblower protection

```text
SECURE REPORTING CHANNEL
CONFIDENTIALITY
ANTI-RETALIATION
INDEPENDENT REVIEW
AUDIT TRACE
CLOSURE NOTICE
```

\[
VerifiedRetaliation = 0
\]

Deliberately malicious false reporting may be processed under law without chilling good-faith reporting.

---

# PART VIII — Authority mandate and temporal law

# 41. Authority Mandate Registry

A machine-verifiable authority record MUST exist for material powers.

```yaml
AuthorityMandate:
  mandate_id:
  authority_holder:
  authority_type:
  source_of_law:
  source_version:
  jurisdiction:
  permitted_actions: []
  prohibited_actions: []
  delegable: true_or_false
  valid_from:
  valid_until:
  review_status:
  supersedes:
```

No engine may infer coercive authority merely from a role name.

---

# 42. Temporal legal applicability

Every material decision MUST be reproducible against the law and policy valid at the relevant time.

Record:

```text
EVENT / CONDUCT DATE
DECISION DATE
LAW VERSION
POLICY VERSION
EFFECTIVE FROM / TO
RETROACTIVITY RULE WHERE APPLICABLE
```

If law changes while a case is pending, the applicable-law rule MUST be explicitly determined and recorded rather than silently switching versions.

---

# 43. Legal review sequence

To remove circularity:

```text
JURISDICTION CHECK
→ LEGAL BASIS PRECHECK
→ EVIDENCE / RIGHTS REVIEW
→ MIZAN
→ FORMAL LEGAL REVIEW
→ ETHICAL REVIEW / VALIDATION
→ DECISION
```

`LEGAL BASIS PRECHECK` confirms that a plausible lawful authority and legal pathway exist before Mizan proceeds.

`FORMAL LEGAL REVIEW` confirms the final proposed decision against applicable law after Mizan and evidence analysis.

---

# PART IX — Knowledge and corpus

# 44. Knowledge classification K1–K8

| ID | Classification |
|---|---|
| `K1` | VERIFIED FACT |
| `K2` | SUPPORTED EVIDENCE |
| `K3` | TESTIMONY |
| `K4` | INTERPRETATION |
| `K5` | RELIGIOUS TEACHING |
| `K6` | SYMBOLIC / SPIRITUAL |
| `K7` | HYPOTHESIS |
| `K8` | UNKNOWN |

```text
UNKNOWN != TRUE != FALSE
```

---

# 45. Knowledge Plane and corpus domains

Knowledge Plane answers source, domain, authority, version, validity, contested status, supersession, and lessons learned.

```yaml
KnowledgeType:
  CONSTITUTION
  LAW
  REGULATION
  POLICY
  PROCEDURE
  CASE_PRECEDENT
  EVIDENCE_REFERENCE
  SCIENTIFIC_REFERENCE
  INSTITUTIONAL_RECORD
  RELIGIOUS_SOURCE
  RELIGIOUS_INTERPRETATION
  ETHICAL_PRINCIPLE
  HISTORICAL_RECORD
  LESSON_LEARNED
  OPERATIONAL_GUIDANCE
  HYPOTHESIS
  UNKNOWN
```

Corpus domains:

```text
CORPUS-LEGAL
CORPUS-RIGHTS
CORPUS-SCIENCE
CORPUS-GOVERNANCE
CORPUS-ETHICAL
CORPUS-SCRIPTURAL
CORPUS-POLICY
CORPUS-PROCEDURE
CORPUS-PRECEDENT
CORPUS-LESSONS
```

Corpus is curated reusable knowledge. Case evidence is not corpus.

---

# 46. Knowledge lifecycle

```yaml
KnowledgeStatus:
  DRAFT
  VERIFIED
  AUTHORITATIVE
  CONTESTED
  SUPERSEDED
  DEPRECATED
  ARCHIVED
```

```yaml
KnowledgeArtifact:
  knowledge_id:
  type:
  title:
  source:
  jurisdiction:
  domain:
  version:
  valid_from:
  valid_until:
  provenance:
  authoritative_status:
  supersedes:
  contradicted_by:
  supports:
  status:
```

---

# 47. Domain validation and contradiction handling

No universal truth score.

```text
LEGAL KNOWLEDGE → authority + jurisdiction + validity + precedence
CASE EVIDENCE → reliability + corroboration + directness + integrity + uncertainty
SCIENCE → evidence + methodology + replication + uncertainty
SCRIPTURE → primary source + reference
INTERPRETATION → source + interpreter + tradition + context
```

Contradiction flow:

```text
CONTRADICTION DETECTED
→ DOMAIN CLASSIFICATION
→ AUTHORITY CHECK
→ CONTEXT REVIEW
→ HUMAN REVIEW
→ RESOLVED or CONTESTED
```

`CONTESTED` is a valid status.

---

# 48. Scriptural corpus provenance

Scriptural and religious corpus entries SHOULD distinguish:

```yaml
ScripturalCorpusEntry:
  entry_id:
  primary_source:
  edition:
  language:
  translator:
  citation:
  tradition:
  interpreter:
  interpretation_type:
  historical_context:
  review_status:
  contested_status:
```

A human interpretation MUST NOT be presented as though it were an unmediated Divine statement.

---

# 49. Knowledge feedback loop

```text
CASE
→ OUTCOME
→ LESSON
→ KNOWLEDGE ARTIFACT
→ POLICY REVIEW
→ RULE CHANGE
→ VERSION CHANGE
→ FUTURE CASES
```

---

# PART X — Work, services, tasks, time

# 50. Service catalog

```text
SVC-001 CASE INTAKE
SVC-002 MIZAN REVIEW
SVC-003 APPEAL
SVC-004 CORRECTION REQUEST
SVC-005 PUBLIC RECORD ACCESS
SVC-006 WHISTLEBLOWER REPORT
SVC-007 POLICY REVIEW
SVC-008 AUDIT REQUEST
SVC-009 PUBLIC FEEDBACK
SVC-010 KNOWLEDGE CORRECTION
```

---

# 51. Task model

```yaml
Task:
  task_id:
  case_id:
  task_type:
  owner:
  assignee:
  priority:
  state:
  created_at:
  due_at:
  sla_class:
  dependencies: []
  blockers: []
  required_inputs: []
  required_outputs: []
  completion_criteria: []
  escalation_path:
```

States:

```text
CREATED → QUEUED → ASSIGNED → IN_PROGRESS → UNDER_REVIEW → COMPLETED
```

Alternatives:

```text
BLOCKED
FAILED
ESCALATED
CANCELLED
```

No critical task may be ownerless.

---

# 52. Priority, queue fairness, backlog

```text
P0 CRITICAL
P1 HIGH
P2 STANDARD
P3 LOW
P4 BACKLOG
```

Optional:

\[
PriorityScore = 0.40Impact + 0.30Urgency + 0.20TimeSensitivity + 0.10Vulnerability
\]

Priority scores work urgency, not human worth.

Monitor backlog age P50/P90/P99 and review queues for systematic delay, discrimination, starvation, and priority abuse.

---

# 53. Time and calendar model

Canonical machine time:

```text
UTC TIMESTAMP
ISO-8601
```

Presentation and deadlines may use jurisdiction-local timezone and official business-day calendar.

```yaml
TimeContext:
  canonical_utc:
  jurisdiction_timezone:
  business_calendar:
  hijri_evaluation_horizon:
```

The one-Hijri-year governance horizon MUST remain distinct from case deadlines and statutory limitation periods.

---

# 54. Initial governance SLA

| Activity | Initial baseline |
|---|---|
| standard intake acknowledgment | 2 business days |
| critical intake | 4 hours |
| standard appeal acknowledgment | 2 business days |
| critical appeal | 24 hours |
| verified public correction notice | 3 business days |
| critical whistleblower triage | 24 hours |
| standard whistleblower triage | 3 business days |

Pilot defaults only; calibrate later.

```text
SLA BREACH
→ OWNER ALERT
→ ESCALATION
→ AUDIT FLAG
→ PUBLIC DISCLOSURE IF MATERIAL AND LAWFUL
```

Permitted pause reasons MUST be recorded.

---

# 55. Capacity and operating model

Production planning SHOULD define:

```text
CASE INTAKE CAPACITY
REVIEWER CAPACITY
LEGAL REVIEW CAPACITY
AUDIT CAPACITY
ON-CALL / INCIDENT CAPACITY
EXPECTED P50/P95 CASE LATENCY
MAXIMUM SUSTAINABLE BACKLOG
ESTIMATED OPERATING COST
```

Capacity limits MUST NOT be hidden by silently lowering review quality.

---

# PART XI — Stakeholders, safeguarding, rights, notice

# 56. Stakeholders

```text
CLAIMANT
RESPONDENT
VICTIM
AFFECTED_PARTY
BENEFICIARY
WITNESS
REPRESENTATIVE
DECISION_OWNER
REVIEWER
AUDITOR
EXECUTOR
WHISTLEBLOWER
PUBLIC
MEDIA
CIVIL_SOCIETY
```

---

# 57. Rights and obligations

```yaml
Right:
  right_id:
  holder:
  legal_basis:
  scope:
  limitations:
  remedy_if_violated:
  appeal_available:

Obligation:
  obligation_id:
  responsible_actor:
  legal_basis:
  required_action:
  deadline:
  evidence_of_completion:
  consequence_if_unfulfilled:
```

High-impact decisions MUST identify affected rights and remedies.

---

# 58. Rights impact review

```text
WHOSE RIGHTS ARE AFFECTED?
WHAT RIGHTS?
WHAT LEGAL BASIS?
IS THE RESTRICTION NECESSARY?
IS IT PROPORTIONATE?
IS A LESS RESTRICTIVE OPTION AVAILABLE?
IS A REMEDY AVAILABLE?
```

---

# 59. Notice and service of process

Due process requires more than an appeal button.

```yaml
NoticeRecord:
  notice_id:
  case_id:
  recipient:
  notice_type:
  content_version:
  issued_at:
  delivery_channel:
  delivery_status:
  delivered_at:
  acknowledged_at:
  failed_reason:
  deadline_triggered_at:
```

Deadlines MUST NOT be treated as running from successful notice where applicable law requires delivery or legally sufficient service.

---

# 60. Vulnerable-person safeguarding

Special handling MAY be required for:

```text
MINORS
VICTIMS OF VIOLENCE
TRAFFICKING SURVIVORS
PEOPLE WITH LIMITED CAPACITY
PEOPLE AT IMMEDIATE SAFETY RISK
PROTECTED WITNESSES
```

Safeguards may include representative support, confidentiality, trauma-aware process, age-appropriate communication, restricted disclosure, and expedited safety escalation.

---

# 61. Intake abuse and brigading

Public access MUST NOT mean unlimited abuse capacity.

Controls MAY include:

```text
RATE LIMITING
DUPLICATE DETECTION
SPAM / AUTOMATION DETECTION
ABUSE TRIAGE
MASS-BRIGADING DETECTION
SAFE BLOCKING OF MALICIOUS TRAFFIC
```

These controls MUST NOT suppress legitimate good-faith complaints merely because they are unpopular or numerous.

---

# PART XII — Evidence and admissibility

# 62. Evidence provenance

```yaml
Evidence:
  evidence_id:
  case_id:
  source_type:
  source_actor:
  source_system:
  collected_at:
  original_hash:
  current_hash:
  chain_of_custody:
  transformations:
  verifier:
  confidence:
  confidentiality:
  admissibility_status:
```

Every material transformation SHOULD be traceable.

---

# 63. Evidence status, challenge, privilege

```yaml
EvidenceStatus:
  SUBMITTED
  VERIFIED
  CHALLENGED
  ADMISSIBLE
  PRIVILEGED
  SEALED
  EXCLUDED
  REJECTED
```

Parties SHOULD have a defined pathway to challenge material evidence where due process requires it.

Illegally obtained, privileged, sealed, or otherwise excluded evidence MUST be handled according to applicable law and MUST NOT be made usable merely because an engine can score it.

---

# 64. Evidence Confidence Score

```text
R = source reliability
C = corroboration
D = directness
I = integrity / chain of custody
U = uncertainty penalty
```

\[
ECS = 0.30R + 0.30C + 0.20D + 0.20I - 0.20U
\]

\[
0 \le ECS \le 100
\]

Initial mapping:

```text
0–24   E0 UNVERIFIED
25–44  E1 WEAK
45–64  E2 SUPPORTED
65–79  E3 CORROBORATED
80–100 E4 STRONG
```

ECS is advisory and never replaces the applicable legal burden of proof.

---

# 65. Uncertainty and impact

```yaml
Uncertainty:
  confidence_band: LOW | MEDIUM | HIGH
  missing_evidence: []
  assumptions: []
  unresolved_questions: []
  sensitivity: LOW | MEDIUM | HIGH
```

Decision Impact Score:

\[
DIS = 100 \times (0.45(S/5) + 0.35(P/5) + 0.20(X/5))
\]

```text
0–24 LOW
25–49 MODERATE
50–74 HIGH
75–100 CRITICAL
```

Initial evidence guidance:

| Impact | ECS guidance | Review expectation |
|---|---:|---|
| LOW | 50 | standard |
| MODERATE | 65 | additional review recommended |
| HIGH | 80 | independent review |
| CRITICAL | 85 | independent review + audit |
| coercive / punitive | applicable legal standard | formal lawful process mandatory |

---

# 66. Intent / impact principle

```text
GOOD INTENT DOES NOT ERASE HARMFUL IMPACT.
HARMFUL IMPACT DOES NOT AUTOMATICALLY PROVE MALICIOUS INTENT.
```

---

# PART XIII — Sword, Wing, Mizan, and engines

# 67. Sword and Wing

**Sword:** protection, boundary, sanction, enforcement, prevention.

**Wing:** mercy, restitution, restoration, rehabilitation, reconciliation, second chance.

\[
Justice = Sword + Wing
\]

Sword without Wing risks cruelty. Wing without Sword risks impunity.

---

# 68. Mizan definition

Mizan is a:

# DECISION READINESS & BALANCING ENGINE

It is NOT a spiritual court, sin score, human-value score, or automatic legal judge.

Inputs:

```text
EVENT
ACTOR
ACTION
INTENT
EVIDENCE
LEGAL BASIS PRECHECK
IMPACT
AFFECTED PARTIES
RIGHTS
RISK
POSSIBLE CORRECTION
CONFLICT OF INTEREST
UNCERTAINTY
```

---

# 69. Seven Mizan gates

| Gate | Core question |
|---|---|
| `M1 Truth` | What is known and unknown? |
| `M2 Legality Context` | Is there a plausible lawful basis and what legal constraints matter? |
| `M3 Intent` | What was the apparent purpose? |
| `M4 Impact` | Who is affected and how? |
| `M5 Proportionality` | Is the proposed response necessary and proportionate? |
| `M6 Mercy & Correction` | Can harm be repaired while preserving justice? |
| `M7 Accountability` | Can the decision be explained, reviewed, and audited? |

M2 provides legality context but does not replace formal legal review.

---

# 70. Mizan hard gates and score

Before quality scoring:

```text
JURISDICTION VALID
PLAUSIBLE LEGAL BASIS EXISTS
EVIDENCE THRESHOLD MET
CONFLICT RESOLVED
NO RED-LINE VIOLATION
RIGHTS REVIEW COMPLETE
```

Failure:

```text
STOP
HOLD
ESCALATE
or
UNRESOLVED
```

Advisory score:

\[
MQS = 0.20M1 + 0.10M3 + 0.15M4 + 0.20M5 + 0.15M6 + 0.20M7
\]

M2 remains contextual/hard-gate oriented rather than part of the weighted average.

```text
<60      REWORK
60–74    CONDITIONAL
75–84    ACCEPTABLE
85–94    STRONG
95–100   EXCEPTIONAL
```

Weights and thresholds are provisional until calibration.

---

# 71. Mizan outcomes — non-adjudicative

Mizan outputs MUST describe readiness, not legal guilt.

```yaml
MizanOutcome:
  READY
  CONDITIONAL
  NOT_READY
  CORRECTABLE
  UNRESOLVED
  REVIEW_REQUIRED
```

A legal finding such as `VIOLATION` belongs to the lawful human/institutional decision process, not the Mizan Engine itself.

---

# 72. Proportionality sub-score

```text
N = necessity
F = fit between action and objective
L = less-restrictive alternative assessment
T = duration proportionality
```

\[
PS = 0.30N + 0.30F + 0.25L + 0.15T
\]

High-impact actions with poor proportionality SHOULD fail or require redesign even if other dimensions score well.

---

# 73. Raqib–‘Atid conceptual mapping

Philosophical accountability metaphor only.

Operational labels:

```text
CONSTRUCTIVE ↔ Raqib conceptual channel
CORRECTIVE  ↔ ‘Atid conceptual channel
PENDING     ↔ unresolved / pending
```

DHGS does not claim to reproduce a literal Divine record.

---

# 74. Engine registry

```yaml
ENG-EVD:
  name: Evidence Engine
  responsibility: evidence_quality_and_gaps

ENG-MZN:
  name: Mizan Engine
  responsibility: decision_readiness

ENG-POL:
  name: Policy / Guard Engine
  responsibility: non_negotiable_rules

ENG-RGT:
  name: Rights Impact Engine
  responsibility: rights_impact_and_remedy

ENG-KNO:
  name: Knowledge Retrieval Engine
  responsibility: relevant_versioned_knowledge

ENG-LED:
  name: Ledger Engine
  responsibility: governance_accountability_history

ENG-PUB:
  name: Publication / Redaction Engine
  responsibility: privacy_safe_public_projection

ENG-MET:
  name: Metrics Engine
  responsibility: KPI_and_health_metrics
```

MVP priority: Evidence, Mizan, Policy/Guard, Ledger, Publication.

---

# PART XIV — Policy, requirements, controls, exceptions

# 75. Policy / Guard Engine

MVP rules MAY be testable TypeScript functions.

Examples:

```text
IF formalLegalStatus == FAIL → DENY
IF jurisdictionValid == false → DENY
IF materialConflict == UNRESOLVED → HOLD
IF protectedData == true → DO_NOT_PUBLISH
IF impact == HIGH AND evidenceThresholdNotMet → HOLD_AND_REQUEST_MORE_EVIDENCE
```

Actions:

```yaml
PolicyAction:
  ALLOW
  DENY
  HOLD
  ESCALATE
  REVIEW
  REQUEST_MORE_EVIDENCE
  REQUIRE_RECUSAL
  REQUIRE_AUDIT
  REQUIRE_APPEAL_WINDOW
```

For high-risk unknowns: fail safe, not fail open.

---

# 76. Requirement, control, and rule registries

Schemas alone are insufficient. Critical governance behavior MUST receive stable IDs.

ID namespaces:

```text
REQ-GOV-*  governance requirements
REQ-IDM-*  identity requirements
REQ-KNO-*  knowledge requirements
REQ-EVD-*  evidence requirements
REQ-MZN-*  Mizan requirements
REQ-RGT-*  rights requirements
REQ-HSB-*  Hisab requirements
REQ-OBK-*  Open Book requirements
REQ-SEC-*  security requirements
REQ-PRV-*  privacy requirements
REQ-UX-*   product-experience requirements
REQ-AST-*  visual-asset requirements
REQ-ORM-*  ORM/data-driven model requirements

CTRL-*     controls
RULE-*     executable / evaluable rules
TEST-*     tests
KPI-*      metrics
```

Minimum initial requirements:

```text
REQ-GOV-001 Every material decision has an accountable owner.
REQ-GOV-002 Every coercive action has a valid authority mandate.
REQ-GOV-003 No privileged status creates a hidden parallel process.
REQ-MZN-001 High-impact decisions complete required Mizan review.
REQ-MZN-002 Mizan output does not determine legal guilt.
REQ-HSB-001 Every material public-power decision produces a ledger record.
REQ-HSB-002 Historical correction preserves prior accountable state.
REQ-OBK-001 Eligible public decisions produce a privacy-safe public record.
REQ-RGT-001 High-impact decisions complete rights review.
REQ-IDM-001 Restricted actions require sufficient identity assurance.
REQ-SEC-001 Privileged technical actions are auditable.
REQ-SEC-002 Technical admin cannot alter governance outcome outside correction process.
REQ-PRV-001 Protected data is not directly exposed to Open Book.
REQ-KNO-001 Authoritative knowledge requires provenance and version.
REQ-EVD-001 Material evidence retains provenance and challenge status.
REQ-UX-001 High-impact actions use deliberate confirmation and visible basis.
REQ-UX-002 Appeal interfaces MUST NOT use dark patterns or hidden deadlines.
REQ-UX-003 Mizan independent reviewers MUST NOT see aggregate peer scores before individual submission where independence is required.
REQ-AST-001 Informative visual assets require accessible text alternatives or equivalent explanation.
REQ-AST-002 Synthetic/AI visual media MUST NOT be presented as case evidence unless its synthetic provenance is explicit and legally relevant.
REQ-ORM-001 Every material model operation carries actor/purpose/request context.
REQ-ORM-002 ORM scope checks do not replace PostgreSQL RLS.
REQ-ORM-003 Governance records have no unrestricted hard-delete path.
REQ-ORM-004 High-stakes governance actions cannot be exposed as generic CRUD actions.
REQ-ORM-005 Addon dependencies and versions are explicit and cycle-free.
```

Professional traceability:

```text
MISSION
→ OBJECTIVE
→ REQUIREMENT
→ CONTROL
→ RULE
→ WORKFLOW
→ TASK
→ IMPLEMENTATION
→ TEST
→ KPI
→ OUTCOME
→ LEARNING
```

---

# 77. Control catalog

```yaml
Control:
  control_id:
  name:
  objective:
  type:
  owner:
  prevention:
  detection:
  response:
  recovery:
  learning_action:
  evidence:
  frequency:
  test_method:
  failure_response:
```

Categories:

```text
PREVENTIVE
DETECTIVE
CORRECTIVE
RECOVERY
GOVERNANCE
PRIVACY
SECURITY
UX_SAFETY
VISUAL_INTEGRITY
DATA_INTEGRITY
```

Every critical process SHOULD answer:

```text
PREVENT
DETECT
RESPOND
RECOVER
LEARN
```

---

# 78. Exception and override

```yaml
Exception:
  exception_id:
  rule_id:
  reason:
  requester:
  approver:
  legal_basis:
  starts_at:
  expires_at:
  compensating_controls:
  audit_required: true
```

Exception without expiry is invalid unless formally converted into a rule change.

```yaml
OverrideType:
  OPERATIONAL
  EMERGENCY
  LEGAL
  SECURITY
```

No override may bypass non-derogable red lines.

---

# PART XV — Decision rights, remedy, appeal, notice, finality

# 79. RACI/RASCI and quorum

Critical processes define:

```text
RESPONSIBLE
ACCOUNTABLE
SUPPORT
CONSULTED
INFORMED
```

No undefined owner.

Provisional quorum:

| Impact | Reviewers | Minimum approval |
|---|---:|---:|
| LOW | 1 | 1 |
| MODERATE | 2 | 2 |
| HIGH | 3 | 2 |
| CRITICAL | 5 | 4 + independent audit |

Calibrate during pilot.

---

# 80. Decision lifecycle

```text
DRAFT
→ SUBMITTED
→ TRIAGE
→ JURISDICTION_CHECK
→ LEGAL_BASIS_PRECHECK
→ EVIDENCE
→ RIGHTS_REVIEW
→ MIZAN
→ FORMAL_LEGAL_REVIEW
→ ETHICAL_REVIEW
→ DECISION_READY
→ APPROVED / REJECTED / UNRESOLVED
→ LEDGERED
→ EXECUTION
→ PUBLISHED where lawful
→ OUTCOME_REVIEW
→ CLOSED
```

Branches:

```text
UNDER_APPEAL
UNDER_REMIZAN
CORRECTED
REVERSED
```

Illegal state jumps MUST be rejected and logged.

---

# 81. Remedy catalog

```text
NO_ACTION
WARNING
CORRECTION
RESTITUTION
RESTORATION
REHABILITATION
MEDIATION
POLICY_CHANGE
RESTRICTION
SUSPENSION
REFERRAL
```

Criminal punishment remains with legally authorized justice institutions.

---

# 82. Appeal finality and reopening

```text
PROVISIONAL
APPEALABLE
FINAL
REOPENABLE
EXPIRED
```

Reopening may require:

```text
NEW MATERIAL EVIDENCE
PROCEDURAL ERROR
UNDISCLOSED CONFLICT
FRAUD DISCOVERED
LEDGER MANIPULATION
CONSTITUTIONAL CHANGE
COURT ORDER
```

---

# 83. Output, outcome, definition of case done

```text
OUTPUT = what the institution produced
OUTCOME = what changed in reality
```

```yaml
Outcome:
  outcome_id:
  case_id:
  intended_result:
  baseline:
  target:
  metric:
  measurement_window:
  actual_result:
  variance:
  unintended_effects:
  status:
```

Closure, where applicable, requires:

```text
DECISION RECORDED
EXECUTION COMPLETE
REMEDY COMPLETE
APPEAL WINDOW CLOSED OR RESOLVED
PUBLIC DISCLOSURE COMPLETE
CORRECTION COMPLETE
AUDIT COMPLETE
KNOWLEDGE UPDATE COMPLETE
RETENTION CLASS ASSIGNED
```

---

# PART XVI — Events, Hisab, signing, reproducibility

# 84. Canonical event model

Representative event types:

```text
CASE_CREATED
CASE_CLASSIFIED
TASK_CREATED
TASK_ASSIGNED
TASK_BLOCKED
TASK_COMPLETED
EVIDENCE_ADDED
EVIDENCE_VERIFIED
EVIDENCE_CHALLENGED
EVIDENCE_EXCLUDED
MIZAN_STARTED
MIZAN_COMPLETED
LEGAL_REVIEW_COMPLETED
ETHICAL_REVIEW_COMPLETED
DECISION_APPROVED
DECISION_REJECTED
DECISION_UNRESOLVED
LEDGER_APPENDED
EXECUTION_STARTED
EXECUTION_COMPLETED
OPEN_BOOK_PUBLISHED
NOTICE_ISSUED
NOTICE_DELIVERED
APPEAL_OPENED
REMIZAN_STARTED
CORRECTION_CREATED
DECISION_REVERSED
AUDIT_STARTED
AUDIT_COMPLETED
WHISTLEBLOWER_REPORT_RECEIVED
KNOWLEDGE_CREATED
KNOWLEDGE_CONTESTED
KNOWLEDGE_SUPERSEDED
POLICY_UPDATED
OUTCOME_MEASURED
PUBLIC_COMMENT_RECEIVED
INCIDENT_DECLARED
```

```yaml
Event:
  event_id:
  event_type:
  timestamp:
  actor_id:
  case_id:
  source_module:
  payload_version:
  payload:
  previous_event_hash:
  event_hash:
```

MVP may use PostgreSQL without full event sourcing.

Rule:

```text
NO MATERIAL STATE CHANGE WITHOUT AN AUDITABLE EVENT / RECORD.
```

---

# 85. Hisab Ledger

Hisab Ledger is the:

# ACCOUNTABILITY RECORD OF MATERIAL PUBLIC POWER

Not total surveillance, a literal Divine record, or permanent social label.

# IF POWER ACTS, THE LEDGER REMEMBERS.

Append-oriented correction:

```text
ORIGINAL RECORD
→ REVIEW
→ CORRECTION ENTRY
→ NEW VALID STATE
```

No silent historical rewrite.

---

# 86. Hisab vs audit log

```text
HISAB LEDGER = governance meaning and accountability history
AUDIT LOG = software activity and access history
```

Audit examples:

```text
LOGIN
RECORD_VIEW
FILE_DOWNLOAD
ROLE_CHANGE
DECISION_APPROVAL
PUBLICATION
ADMIN_ACTION
BREAK_GLASS_ACCESS
```

---

# 87. Decision Context Snapshot

Every high-impact decision SHOULD preserve enough context for future reproduction.

```yaml
DecisionContextSnapshot:
  decision_id:
  case_id:
  jurisdiction:
  event_or_conduct_date:
  decision_date:

  authority:
    mandate_id:
    law_source:
    law_version:
    law_effective_at:

  governance:
    policy_set_version:
    rule_set_version:
    control_set_version:

  engines:
    evidence_engine_version:
    mizan_engine_version:
    rights_engine_version:
    publication_engine_version:

  corpus:
    snapshot_id:

  schemas:
    schema_version:

  reviewers:
    - reviewer_id:
      role:
      attestation:

  created_at:
```

This snapshot answers: **what law, rules, corpus, engines, evidence context, and reviewers produced the decision at that time?**

---

# 88. Decision attestation and signatures

High-impact decisions SHOULD support non-repudiable attestation.

```yaml
DecisionAttestation:
  decision_id:
  signer_id:
  signer_role:
  signed_at:
  content_hash:
  signature_or_attestation_reference:
  verification_status:
```

The MVP MAY begin with strong authenticated attestations in the database, with cryptographic/digital signatures introduced when legal or operational need requires them.

Optional later tamper evidence:

\[
H_n = Hash(H_{n-1} + Record_n)
\]

Blockchain is not required.

---

# 89. Audit evidence package

A high-impact decision may produce:

```text
decision.json
evidence-index.json
mizan.json
legal-review.json
ethical-review.json
rights-review.json
ledger.json
audit.json
public-summary.json
manifest.json
```

Not necessarily public in full.

---

# PART XVII — Open Book, accessibility, participation, open data

# 90. Open Book principle

# OPEN BOOK BY DEFAULT, PRIVATE WHEN LEGITIMATELY REQUIRED.

Disclosable decisions SHOULD answer:

```text
WHAT HAPPENED?
WHY?
WHAT LAW?
WHAT EVIDENCE BASIS?
WHO DECIDED?
WHO IS AFFECTED?
WHAT DID IT COST?
WHAT IS THE TARGET?
WHAT IS THE RESULT?
WHAT WAS CORRECTED?
CAN IT BE APPEALED?
```

---

# 91. Disclosure and projection

```text
P0 PUBLIC
P1 PUBLIC REDACTED
P2 INTERNAL / RESTRICTED
P3 PROTECTED
```

```text
PUBLIC RIGHT-TO-KNOW != UNIVERSAL ACCESS TO PRIVATE INFORMATION
```

Never expose internal ledger or case tables directly.

```text
INTERNAL DATA
→ DISCLOSURE CHECK
→ REDACTION
→ PUBLIC PROJECTION
→ OPEN BOOK
```

High-risk redaction requires human review until automation is demonstrably safe.

---

# 92. Communication and accessibility

```text
L1 SIMPLE
L2 STANDARD
L3 TECHNICAL
```

# ONE VERIFIED SOURCE — MULTIPLE HUMAN-FRIENDLY FORMATS.

Open Book SHOULD be:

```text
MOBILE-FIRST
LOW-BANDWIDTH FRIENDLY
SCREEN-READER COMPATIBLE
CAPTIONED
TRANSCRIBED
READABLE
VISUALLY CLEAR
MULTILINGUAL WHERE REQUIRED
LOCAL-LANGUAGE FRIENDLY
DOWNLOADABLE
```

Public web target:

# WCAG 2.2 LEVEL AA

unless a later formally adopted accessibility baseline supersedes it.

---

# 93. Correction notice and anti-propaganda rule

Public correction preserves:

```text
PREVIOUS INFORMATION
IDENTIFIED ERROR
CAUSE
CORRECTED INFORMATION
IMPACT
RESPONSIBLE AUTHORITY
PREVENTIVE ACTION
```

No silent editing.

Red line:

```text
NO DELIBERATE DECEPTIVE PUBLIC COMMUNICATION
NO PROPAGANDA DESIGNED TO CONCEAL MATERIAL GOVERNANCE FAILURE
```

---

# 94. Public participation

May support:

```text
PUBLIC COMMENT
CONSULTATION
PETITION
GRIEVANCE
CORRECTION REQUEST
POLICY FEEDBACK
PUBLIC HEARING
```

```text
PUBLIC INPUT
→ TRIAGE
→ VALIDATE
→ CLASSIFY
→ ASSIGN
→ REVIEW
→ RESPOND
→ CORRECT IF REQUIRED
→ LEDGER / KNOWLEDGE UPDATE
```

---

# 95. Open-data contract

Eligible public data MAY be published through versioned machine-readable exports.

```yaml
OpenDataContract:
  schema_version:
  formats: [JSON, CSV]
  fields:
  privacy_class: P0_or_P1_only
  update_frequency:
  correction_policy:
  license_or_terms:
```

Open-data exports MUST NOT bypass Open Book privacy/redaction controls.

---

# PART XVIII — Data governance, privacy, retention

# 96. Data roles and source of truth

```text
CASE STATE → PostgreSQL
EVIDENCE METADATA → PostgreSQL
EVIDENCE FILES → private object storage
KNOWLEDGE METADATA → PostgreSQL
CORPUS FILES → controlled corpus storage / repository
GOVERNANCE HISTORY → Hisab Ledger
SOFTWARE ACTIVITY → Audit Log
PUBLIC INFORMATION → public projection
```

Data governance SHOULD identify:

```text
DATA CONTROLLER
DATA PROCESSOR
DATA STEWARD
DATA CUSTODIAN
LAWFUL BASIS
DATA RESIDENCY
CROSS-BORDER TRANSFER RULE WHERE APPLICABLE
```

---

# 97. Privacy principles

High-risk processing considers:

```text
PURPOSE
NECESSITY
PROPORTIONALITY
DATA MINIMIZATION
AFFECTED PEOPLE
ACCESS
RETENTION
REDRESS
RISK
```

Collect only what is needed for a defined purpose.

---

# 98. Retention

```text
R0 TEMPORARY
R1 SHORT TERM
R2 STANDARD
R3 LONG TERM
R4 LEGAL HOLD
R5 PERMANENT PUBLIC RECORD
```

Immutability does not mean all private data remains forever.

Lawful lifecycle actions may include:

```text
DELETE
ANONYMIZE
ARCHIVE
REDACT
```

while preserving required accountability metadata.

---

# PART XIX — Security, supply chain, resilience, observability

# 99. MVP security baseline

```text
AUTHENTICATION
POSTGRES RLS
PRIVATE STORAGE
HTTPS
SERVER-SIDE SECRETS
INPUT VALIDATION
AUDIT LOGGING
LEAST PRIVILEGE
BACKUPS
RATE LIMITING WHERE NEEDED
ENVIRONMENT SEPARATION
```

Secrets MUST NOT be committed to Git or exposed to client code.

---

# 100. Secure software supply chain

Production maturity SHOULD add:

```text
DEPENDENCY REVIEW
LOCKFILE / REPRODUCIBLE INSTALLS
VULNERABILITY SCANNING
SOFTWARE BILL OF MATERIALS (SBOM)
SIGNED OR VERIFIED RELEASE PRACTICES WHERE PRACTICAL
SECRET SCANNING
DEPENDENCY UPDATE POLICY
SECURITY PATCH SLA
KEY / TOKEN ROTATION
SECURITY VULNERABILITY DISCLOSURE PROCESS
```

Supply-chain compromise MUST be part of the threat model.

---

# 101. Incident management

```text
SEV1 CRITICAL
SEV2 HIGH
SEV3 MODERATE
SEV4 LOW
```

```text
DETECT
→ DECLARE
→ CONTAIN
→ ERADICATE
→ RECOVER
→ NOTIFY
→ POSTMORTEM
→ CORRECT
→ LEARN
```

Illustrative pilot targets:

```yaml
SEV1:
  acknowledge: 15m
  containment_target: 4h
SEV2:
  acknowledge: 1h
  containment_target: 12h
SEV3:
  acknowledge: 8h
SEV4:
  acknowledge: 2d
```

---

# 102. SLO, observability, RTO/RPO

Production planning SHOULD define:

```text
AVAILABILITY
LATENCY
ERROR RATE
QUEUE HEALTH
AUDIT-LOG DELIVERY
BACKUP SUCCESS
RESTORE SUCCESS
ERROR BUDGET WHERE USEFUL
```

Illustrative service-level objectives:

```yaml
open_book_availability: 99.9
ledger_read_availability: 99.95
audit_log_delivery: 99.99
```

Illustrative recovery targets:

```yaml
identity:
  RTO: 2h
  RPO: 15m
hisab_ledger:
  RTO: 4h
  RPO: 15m_or_better
open_book:
  RTO: 8h
  RPO: 1h
```

Backups are not sufficient unless restore procedures are tested.

---

# 103. Degraded mode

```text
HIGH-RISK DECISIONS → HOLD
LOW-RISK REVERSIBLE OPERATIONS → MAY CONTINUE MANUALLY UNDER AUTHORIZED PROCEDURE
```

Manual actions MUST later be reconciled into ledger and audit history.

---

# PART XX — External systems, funding, vendors, oversight of DHGS

# 104. External systems and jurisdiction conflict

DHGS may interface with:

```text
COURTS
LEGISLATURE
EXECUTIVE
REGULATORS
CIVIL SOCIETY
RELIGIOUS INSTITUTIONS
CHARITIES
IDENTITY PROVIDERS
MEDIA
PUBLIC
EXTERNAL AUDITORS
```

```yaml
ExternalInterface:
  system_id:
  authority_boundary:
  data_in:
  data_out:
  trust_level:
  legal_basis:
  privacy_class:
  failure_mode:
  fallback:
```

Jurisdiction conflict MUST be resolved by applicable law, not software preference.

---

# 105. Interoperability and API

Prefer:

```text
UTF-8
ISO-8601 DATETIME
UUID
JSON
VERSIONED SCHEMAS
EXPLICIT ERROR CODES
```

Possible API versioning:

```text
/api/v1/
/api/v2/
```

Public APIs MUST NOT expose P2/P3 data, security secrets, victim identifiers, or privileged metadata.

---

# 106. Funding independence

Controls may include:

```text
BUDGET DISCLOSURE
AUDIT RIGHTS
NO HIDDEN DONOR
NO PRIVATE DECISION FEE
NO FINANCIAL DEPENDENCY ON SUPERVISED PARTY
```

Shadow SHOULD NOT depend financially on a party it supervises.

---

# 107. Vendor risk

```yaml
Vendor:
  vendor_id:
  service:
  data_access:
  jurisdiction:
  audit_right:
  exit_plan:
  portability:
  security_review:
  conflict_check:
```

Critical systems SHOULD support data export, schema portability, key rotation, provider exit, and backup/restore.

---

# 108. Independent oversight of DHGS itself

DHGS MUST be auditable as a system, not only used to audit others.

Independent oversight SHOULD be able to review:

```text
SHADOW CONDUCT
PLATFORM OPERATOR CONDUCT
SYSTEM ADMIN ACTIONS
MIZAN CALIBRATION
RULE CHANGES
CORPUS GOVERNANCE
PRIVACY FAILURES
SECURITY FAILURES
APPEAL PERFORMANCE
OPEN BOOK ACCURACY
```

There MUST be a complaint/escalation route concerning DHGS, Shadow, platform operator, or governance authority itself.

No component of DHGS is exempt from review merely because it is part of the accountability system.

---

# PART XXI — AI governance

# 109. AI status

AI is optional and not required for MVP.

Potential uses:

```text
SEARCH
SUMMARIZATION
DOCUMENT CLASSIFICATION
KNOWLEDGE RETRIEVAL
CONTRADICTION DETECTION
REDACTION SUGGESTION
PUBLIC-LANGUAGE SIMPLIFICATION
ANOMALY FLAGGING
```

AI MUST NOT independently:

```text
CONVICT
PUNISH
REMOVE FUNDAMENTAL RIGHTS
APPROVE HIGH-IMPACT FINAL DECISIONS
REMOVE SHADOW
EXTEND EMERGENCY POWERS
```

---

# 110. AI model governance

If introduced:

```yaml
AIModel:
  model_id:
  version:
  provider:
  purpose:
  approved_use:
  prohibited_use:
  evaluation_date:
  owner:
  fallback:
  disable_switch:
```

High-impact AI assistance SHOULD be versioned, testable, monitored, reviewable, and disable-able. Low-confidence or provenance-incomplete AI output is non-authoritative.

---

# PART XXII — Change governance, calibration, KPI

# 111. Definition of Ready

Before a feature/control is built:

```text
REQUIREMENT EXISTS
OWNER EXISTS
JURISDICTION / SCOPE IS KNOWN
RIGHTS IMPACT CONSIDERED
DATA MODEL EXISTS
ACCESS RULE EXISTS
CONTROL EXISTS
ACCEPTANCE TEST EXISTS
SECURITY / PRIVACY NEEDS IDENTIFIED
DEPENDENCIES KNOWN
GITHUB ISSUE EXISTS FOR NON-TRIVIAL IMPLEMENTATION
```

---

# 112. Definition of Done

```text
IMPLEMENTATION COMPLETE
TESTS PASS
ACCESS / RLS TESTED
CONTROLS VERIFIED
AUDIT TRACE WORKS
DOCUMENTATION UPDATED
KNOWLEDGE UPDATED
STAGING VERIFIED
MONITORING EXISTS
ROLLBACK PATH EXISTS
PUBLIC DOCUMENTATION UPDATED WHERE REQUIRED
ISSUE ACCEPTANCE CRITERIA SATISFIED
```

---

# 113. Versioning, amendment, ADR

```text
PATCH
MINOR
MAJOR
EMERGENCY
```

Foundational change:

```text
PROPOSAL
→ RATIONALE
→ IMPACT ASSESSMENT
→ MIZAN
→ LEGAL REVIEW
→ PUBLIC DISCLOSURE WHERE APPROPRIATE
→ INDEPENDENT REVIEW
→ APPROVAL
→ VERSION CHANGE
→ LEDGER / CHANGE RECORD
```

No secret foundational amendment.

Use semantic versioning:

```text
MAJOR.MINOR.PATCH
```

Major technical/architectural decisions SHOULD have ADRs documenting context, decision, alternatives, consequences, owner, date, and rollback/migration implications.

---

# 114. Scoring calibration

ECS, DIS, MQS, priority scores, and thresholds are design instruments, not immutable truth.

Calibration SHOULD test:

```text
FALSE POSITIVES
FALSE NEGATIVES
BIAS
SENSITIVITY
ROBUSTNESS
THRESHOLD STABILITY
OUTCOME CORRELATION
INTER-RATER RELIABILITY
```

Weight change:

```text
CHANGE REQUEST
→ SIMULATION
→ SENSITIVITY ANALYSIS
→ MIZAN / GOVERNANCE REVIEW
→ INDEPENDENT REVIEW
→ VERSION CHANGE
```

No silent scoring change.

---

# 115. Core KPIs

```text
Traceability Rate target >=98%
Required High-Impact Mizan Completeness =100%
Evidence Compliance target =100% against applicable standard
Appeal Access target =100% where applicable
Conflict Disclosure target =100%
Unauthorized Ledger Deletion =0
Untraceable Material Edit =0
Shadow Undisclosed Personal Benefit =0
Verified Whistleblower Retaliation =0
Correction Completion target toward >=95%
Repeat Failure = declining trend
Open Book Coverage target >=95% eligible records
Public Understanding target >=80% scoring >=4/5 key elements
Task SLA Compliance initial target >=90%
Knowledge Freshness initial target >=95%
Critical Requirement Coverage before production =100%
Critical Control Coverage before production =100%
```

No single KPI SHOULD independently determine institutional reward or punishment.

---

# 116. System health vector

Prefer multiple domains over one misleading average:

```yaml
health:
  legality:
  evidence:
  rights:
  traceability:
  correction:
  transparency:
  privacy:
  security:
  workflow:
  knowledge:
  outcomes:
  anti_capture:
  accessibility:
  usability:
  data_integrity:
```

A critical-domain failure prevents overall `HEALTHY` status regardless of average.

---

# PART XXIII — Risk, testing, simulation, emergency

# 117. Risk model

```yaml
Risk:
  risk_id:
  title:
  category:
  likelihood: 0..5
  impact: 0..5
  detectability: 0..5
  owner:
  controls:
  status:
```

Optional:

\[
RPS = Likelihood \times Impact \times (6 - Detectability)
\]

---

# 118. Threat and abuse scenarios

Test against:

```text
CORRUPT SHADOW
COMPROMISED AUDITOR
MALICIOUS / COMPROMISED PLATFORM ADMIN
FALSE EVIDENCE
ILLEGALLY OBTAINED EVIDENCE
LEDGER MANIPULATION
PRIVACY BREACH
RELIGIOUS PRESSURE
POLITICAL PRESSURE
INSTITUTIONAL CAPTURE
WHISTLEBLOWER RETALIATION
EMERGENCY ABUSE
OPEN-BOOK DOXXING
CYBER INCIDENT
SUPPLY-CHAIN COMPROMISE
AI ERROR / HALLUCINATION
MASS MISINFORMATION
STALE KNOWLEDGE
WRONG LAW VERSION
TASK STARVATION
SLA ABUSE
UNQUALIFIED REVIEWER
KPI GAMING
REMEDY FAILURE
APPEAL REOPEN
OUTCOME WORSE THAN BASELINE
SYSTEM OUTAGE
CROSS-JURISDICTION CONFLICT
PUBLIC BRIGADING
NOTICE DELIVERY FAILURE
DARK_PATTERN_DISCOURAGING_APPEAL
MISLEADING_CHART_OR_VISUALIZATION
SYNTHETIC_MEDIA_MISREPRESENTED_AS_EVIDENCE
ACCESSIBILITY_FAILURE_BLOCKING_DUE_PROCESS
ORM_SCOPE_BYPASS
GENERIC_CRUD_BYPASSING_GOVERNANCE_WORKFLOW
ADDON_DEPENDENCY_OR_UPGRADE_FAILURE
```

---

# 119. Test architecture

```text
UNIT TEST
RULE TEST
SCHEMA TEST
ORM MODEL TEST
ORM SCOPE / CONTEXT TEST
ADDON / MANIFEST TEST
STATE TRANSITION TEST
INTEGRATION TEST
RLS / AUTHORIZATION TEST
IDENTITY-ASSURANCE TEST
PRIVACY TEST
SECURITY TEST
ACCESSIBILITY TEST
VISUAL-REGRESSION TEST
CONTENT / COMPREHENSION TEST
END-TO-END TEST
POLICY REGRESSION TEST
CONSTITUTIONAL INVARIANT TEST
ADVERSARIAL TEST
RESTORE TEST
SIMULATION
```

Examples:

```text
coercive_decision_with_legal_fail → impossible
material_decision_without_owner → impossible
conflicted_actor_self_approval → impossible
protected_record_exposed_publicly → impossible
closed_case_without_required_process → impossible
system_admin_changes_decision_outside_correction → impossible
wrong_law_version_unrecorded → impossible
appeal_hidden_or_dark_patterned → impossible
protected_information_visible_in_public_preview → impossible
orm_cross_jurisdiction_write → impossible
generic_admin_executes_high_impact_decision → impossible
```

---

# 120. Emergency governance

Emergency does not erase law.

Must define:

```text
CLEAR TRIGGER
LEGAL BASIS
NAMED OWNER
LIMITED SCOPE
MINIMUM NECESSARY ACTION
START TIME
EXPIRY TIME
RENEWAL RULE
AUTOMATIC SUNSET
INDEPENDENT REVIEW
POST-EVENT AUDIT
PUBLICATION WHEN SAFE
```

# EMERGENCY POWER MUST EXPIRE.

No silent extension by inertia.

---

# PART XXIV — Red lines and invariants

# 121. Non-negotiable red lines

DHGS does not authorize:

```text
TORTURE
COLLECTIVE PUNISHMENT
PUNISHMENT WITHOUT DUE PROCESS
FUNDAMENTAL-RIGHTS DISCRIMINATION
RELIGIOUS PERSECUTION
COERCION BASED SOLELY ON SPIRITUAL CLAIMS
LEDGER FALSIFICATION
DELIBERATE EVIDENCE DESTRUCTION
HIDDEN MATERIAL CONFLICT
UNLAWFUL SURVEILLANCE
UNLAWFUL DISCLOSURE OF PROTECTED DATA
SHADOW PERSONALITY CULT
IRREMOVABLE LEADERSHIP
UNLIMITED EMERGENCY POWER
WHISTLEBLOWER RETALIATION
HIGH-IMPACT AUTOMATED FINAL JUDGMENT
A SCORE DEFINING HUMAN WORTH
POWER WITHOUT REVIEW OR CORRECTION PATH
DELIBERATE DECEPTIVE PUBLIC COMMUNICATION
SECRET VIP / PRIVILEGED PARALLEL JUSTICE PATH
DARK PATTERNS THAT OBSTRUCT APPEAL OR CORRECTION
MISLEADING DATA VISUALIZATION DESIGNED TO MANIPULATE PUBLIC UNDERSTANDING
SYNTHETIC MEDIA PRESENTED AS AUTHENTIC EVIDENCE WITHOUT DISCLOSURE
GENERIC CRUD BYPASS OF HIGH-STAKES GOVERNANCE WORKFLOW
```

---

# 122. Formal invariants

```yaml
INV-001: no_public_power_without_owner
INV-002: no_material_decision_without_ledger
INV-003: no_coercion_without_due_process
INV-004: no_shadow_above_law
INV-005: no_spiritual_claim_as_sole_coercive_basis
INV-006: no_hidden_material_conflict
INV-007: no_silent_history_rewrite
INV-008: no_irremovable_leader
INV-009: no_score_defines_human_worth
INV-010: unresolved_may_remain_unresolved
INV-011: no_high_risk_automated_final_decision
INV-012: no_privileged_action_without_audit
INV-013: no_closed_case_without_definition_of_done
INV-014: no_critical_task_without_owner
INV-015: no_authoritative_knowledge_without_provenance
INV-016: no_critical_requirement_without_test
INV-017: no_high_impact_decision_without_rights_review
INV-018: no_internal_sensitive_data_directly_exposed_to_open_book
INV-019: no_critical_rule_only_in_frontend
INV-020: no_exception_without_record_and_expiry_or_formal_rule_change
INV-021: no_system_admin_governance_override
INV-022: no_coercive_action_without_valid_authority_mandate
INV-023: no_high_impact_decision_without_versioned_decision_context
INV-024: no_legal_version_change_without_record
INV-025: no_deliberate_public_deception
INV-026: no_hidden_VIP_parallel_process
INV-027: no_final_legal_violation_finding_by_mizan_engine
INV-028: no_DHGS_component_exempt_from_independent_review
INV-029: no_irreversible_high_impact_action_with_single_click
INV-030: no_status_meaning_by_color_alone
INV-031: no_ui_implying_guilt_before_lawful_determination
INV-032: no_dark_pattern_obstructing_appeal_or_correction
INV-033: no_unlabeled_synthetic_visual_presented_as_authentic_evidence
INV-034: no_public_visualization_without_source_period_and_unit_where_applicable
INV-035: no_sensitive_session_replay_by_default
INV-036: no_unrestricted_hard_delete_for_governance_records
INV-037: no_orm_scope_check_as_substitute_for_database_RLS
INV-038: no_generic_UI_high_stakes_governance_bypass
INV-039: no_model_mutation_without_actor_purpose_request_context_for_material_records
INV-040: no_undeclared_addon_dependency
```

---

# PART XXV — Environments, release, boot, roadmap

# 123. Environments

```text
DEV
STAGING
PRODUCTION
```

Do not use one database/storage environment for all stages.

---

# 124. Release gates

Production release SHOULD eventually require:

```text
SCHEMAS VALID
CRITICAL REQUIREMENTS MAPPED
CRITICAL RULE TESTS PASS
INVARIANT TESTS PASS
ORM / ADDON CONTRACT TESTS PASS
AUTHORIZATION / RLS TESTS PASS
IDENTITY ASSURANCE TESTS PASS
SECURITY TESTS PASS
PRIVACY TESTS PASS
ACCESSIBILITY TESTS PASS
CRITICAL USER-JOURNEY TESTS PASS
HIGH-STAKES UI SAFETY TESTS PASS
VISUAL-ASSET LICENSE / PROVENANCE CHECKS PASS
HIGH-RISK SIMULATIONS PASS
RESTORE TEST PASS
ROLLBACK PATH EXISTS
```

---

# 125. Boot sequence

```text
BOOT-000 FOUNDATION
↓
BOOT-025 ORM / DATA MODEL FOUNDATION
↓
BOOT-050 PRODUCT EXPERIENCE & DESIGN FOUNDATION
↓
BOOT-100 KNOWLEDGE
↓
BOOT-200 IDENTITY
↓
BOOT-300 WORK
↓
BOOT-400 DATA
↓
BOOT-500 ENGINES & CONTROLS
↓
BOOT-600 OPEN BOOK & OBSERVABILITY
↓
BOOT-700 SECURITY / PRIVACY / ASSURANCE
↓
BOOT-800 SIMULATION
↓
BOOT-900 PILOT
```

Each Boot Point defines:

```text
ENTRY CONDITION
OWNER
REQUIRED OUTPUT
KPI / ACCEPTANCE
FAILURE CONDITION
EXIT CONDITION
NEXT STATE
```

Readiness must be proven, not declared.

---

# 126. Product delivery phases

## Phase 0 — Foundation

```text
MONOREPO
PUBLIC WEB SHELL
OPS WEB SHELL
API
ORM KERNEL
ORM-BASE ADDON
POSTGRES / SUPABASE ADAPTER
AUTH
DATABASE
CI
PRODUCT EXPERIENCE PRINCIPLES
INFORMATION ARCHITECTURE
SCREEN INVENTORY
DESIGN TOKENS
CORE BRAND / ASSET SPEC
```

## Phase 1 — Case and Work

```text
CASE INTAKE
CASE TRACKING
TASKS
REGIONS / JURISDICTION
ROLES
IDENTITY ASSURANCE
NOTICE
CITIZEN JOURNEY
SAVE DRAFT / RESUME
NOTIFICATION CENTER
```

## Phase 2 — Evidence and Knowledge

```text
EVIDENCE METADATA
PRIVATE FILE STORAGE
EVIDENCE REVIEW / CHALLENGE
BASIC KNOWLEDGE REGISTRY
AUTHORITY MANDATE REGISTRY
EVIDENCE UX
SEARCH / DISCOVERY BASELINE
```

## Phase 3 — Mizan and Decision

```text
LEGAL BASIS PRECHECK
EVIDENCE ENGINE
RIGHTS REVIEW
MIZAN ENGINE
POLICY / GUARD ENGINE
FORMAL LEGAL / ETHICAL REVIEW
DECISION
DECISION CONTEXT SNAPSHOT
MIZAN SCORE-BLINDING UX
HIGH-STAKES DECISION CONFIRMATION
```

## Phase 4 — Hisab and Open Book

```text
LEDGER ENGINE
PUBLICATION / REDACTION ENGINE
PUBLIC PROJECTION
OPEN BOOK
CORRECTION HISTORY
PUBLIC CONTENT MODES
PRINT / PDF / QR VIEW
CHART / GRAPH SYSTEM
```

## Phase 5 — Appeal and Correction

```text
APPEAL
RE-MIZAN
CORRECTION
VERSION HISTORY
NO-DARK-PATTERN APPEAL UX
CORRECTION DIFF UX
```

## Phase 6 — Assurance and Knowledge expansion

```text
AUDIT
RIGHTS ENGINE
KNOWLEDGE ENGINE
CORPUS MANAGEMENT
METRICS
SIMULATIONS
SECURITY / PRIVACY REVIEW
ACCESSIBILITY REVIEW
SUPPLY-CHAIN CONTROLS
DESIGN-SYSTEM REVIEW
ASSET-GOVERNANCE REVIEW
USER RESEARCH / USABILITY TESTING
```

## Phase 7 — Controlled Pilot

```text
LIMITED JURISDICTION
LOW-RISK / REVERSIBLE CASES
HIGH OBSERVABILITY
SYNTHETIC OR CONSENTED DATA WHERE POSSIBLE
INDEPENDENT OVERSIGHT ACTIVE
REAL-USER USABILITY / ACCESSIBILITY OBSERVATION
```

---

# 127. First real end-to-end acceptance test

```text
Citizen submits case
→ identity assurance determined
→ case created through scoped model layer
→ jurisdiction and authority mandate identified
→ notice obligations identified
→ stakeholders and rights mapped
→ reviewer assigned
→ evidence added / challenged / reviewed
→ legal basis precheck completed
→ Mizan completed using independence-preserving UX
→ formal legal / ethical review completed
→ human decision recorded and deliberately attested
→ decision context snapshot stored
→ Hisab Ledger entry created
→ Publication Engine creates privacy-safe public projection
→ Open Book shows understandable public explanation where lawful
→ public record is accessible, searchable, printable, and linkable
→ citizen can appeal without dark-pattern obstruction
→ Re-Mizan can occur
→ correction preserves original history and visual diff
→ outcome is reviewed
→ lesson learned updates knowledge
```

If this works reliably:

# THE CORE DHGS HEART IS ALIVE.

---

# 128. One-Hijri-year governance horizon

A stabilization and evaluation window, not prophecy or Divine deadline.

```text
T0 → Initialize
Days 1–30 → Foundation Lock → M1 THE SYSTEM CAN EXPLAIN ITSELF
Days 31–90 → Controlled Pilot → M2 TRACEABLE GOVERNANCE
Days 91–180 → Stress & Correction → M3 SELF-CORRECTING SYSTEM
Days 181–270 → Integration → M4 INTEGRATED ACCOUNTABILITY
Days 271–End → System Maturity Review
```

System result:

```text
CONTINUE
CORRECT
RESET
```

Reset is a fail-safe, not humiliation.

---

# PART XXVI — Civilization maturity and master flows

# 129. Six maturity phases

```text
BLACK HOLE
→ DARKNESS
→ SHADOW
→ RISING LIGHT
→ LIGHT
→ EXIT TO THE LIGHT
```

Operational:

```text
UNKNOWN
→ UNDERSTOOD
→ STRUCTURED
→ TESTED
→ STABLE
→ CONTINUOUSLY IMPROVING
```

`Pre-Heaven` may describe an aspirational social condition of greater justice, knowledge, mercy, responsibility, freedom, accountability, and peace. It does not mean humans literally manufacture heaven.

---

# 130. Master governance flow

```text
ETHICAL / DIVINE VALUES
→ SCRIPTURAL / PROPHETIC REFERENCE
→ MISSION
→ KNOWLEDGE
→ CONSTITUTION & LAW
→ AUTHORITY MANDATE
→ JURISDICTION
→ CASE INTAKE
→ IDENTITY ASSURANCE
→ STAKEHOLDER / RIGHTS / NOTICE MAPPING
→ TASK ASSIGNMENT
→ EVIDENCE / CHALLENGE
→ LEGAL BASIS PRECHECK
→ EVIDENCE ENGINE
→ RIGHTS REVIEW
→ MIZAN ENGINE
→ FORMAL LEGAL + ETHICAL REVIEW
→ POLICY GUARDS
→ HUMAN DECISION + ATTESTATION
→ DECISION CONTEXT SNAPSHOT
→ HISAB LEDGER
→ EXECUTION
→ PUBLICATION / REDACTION
→ OPEN BOOK
→ PUBLIC FEEDBACK
→ APPEAL
→ RE-MIZAN
→ CORRECTION
→ OUTCOME
→ AUDIT / INDEPENDENT OVERSIGHT
→ LESSON LEARNED
→ CORPUS / KNOWLEDGE UPDATE
→ POLICY / RULE UPDATE
→ SYSTEM IMPROVEMENT
```

---

# 131. Professional architecture spine

```text
WHY → MISSION
WHAT → REQUIREMENTS
WHAT WE KNOW → KNOWLEDGE / CORPUS
WHO → IDENTITY / STAKEHOLDERS
WHO DOES WHAT → WORK / TASKS / RACI
WITH WHAT AUTHORITY → LAW / MANDATE / JURISDICTION
WITH WHAT INFORMATION → DATA / EVIDENCE
HOW DATA IS ACCESSED → ORM / MODEL / RLS
UNDER WHICH RULES → CONTROLS / POLICY
HOW QUALITY IS ASSESSED → MIZAN / RIGHTS / EVIDENCE ENGINES
HOW HUMANS INTERACT → PRODUCT EXPERIENCE / UI / CONTENT / ACCESSIBILITY
HOW TRUST IS VISUALIZED → DESIGN SYSTEM / VISUAL IDENTITY / ASSET GOVERNANCE
WHAT HAPPENED → HISAB LEDGER / AUDIT LOG
WHAT THE PUBLIC KNOWS → OPEN BOOK
DID IT WORK → OUTCOMES / KPI
WHAT DID WE LEARN → KNOWLEDGE UPDATE
```

---

# 132. Final responsibility map

```text
SCRIPTURAL / ETHICAL CORPUS → value reference
CORPUS → reusable knowledge
CASE EVIDENCE → case-specific factual material
FRONTEND → human interaction
PRODUCT EXPERIENCE → safe and understandable interaction
DESIGN SYSTEM → consistent accessible presentation rules
VISUAL ASSETS → governed communication artifacts
BACKEND → orchestration
ORM / MODEL LAYER → governed data access and metadata; no independent public authority
ENGINES → evaluation
DATABASE / RLS → current state and authoritative row-level data boundary
LAW / MANDATE → coercive authority
HUMANS → judgment and accountable ownership
HISAB LEDGER → governance memory
AUDIT LOG → software activity memory
OPEN BOOK → public understanding
AUDIT / INDEPENDENT OVERSIGHT → verification
APPEAL → review / redress
CORRECTION → remediation
KNOWLEDGE LOOP → learning
PLATFORM OPERATOR → technical operation only
```

---

# 133. Final professional equation

\[
GovernanceQuality = f(
Mission,
Law,
Mandate,
Knowledge,
Identity,
Work,
Evidence,
Rights,
Mizan,
Controls,
DataIntegrity,
ProductExperience,
Accessibility,
VisualIntegrity,
Accountability,
Transparency,
Security,
Privacy,
Audit,
Correction,
Outcome,
Learning
)
\]

Subject to:

```text
HUMAN DIGNITY
DUE PROCESS
FUNDAMENTAL RIGHTS
LAWFUL AUTHORITY
```

\[
SelfCorrectingGovernance = Traceability + Reviewability + Correctability + Learning
\]

No arithmetic average may override a hard legal or rights failure.

---

# 134. Final covenant

```text
SHADOW DOES NOT OWN POWER.
LAW LIMITS POWER.
AUTHORITY MUST BE PROVABLE.
EVIDENCE DISCIPLINES CLAIMS.
KNOWLEDGE PROVIDES CONTEXT.
MIZAN WEIGHS DECISION READINESS.
MERCY PRESERVES HUMANITY.
JUSTICE PRESERVES BOUNDARIES.
HISAB PRESERVES ACCOUNTABILITY.
OPEN BOOK PRESERVES PUBLIC UNDERSTANDING.
WHISTLEBLOWERS PROTECT THE SYSTEM FROM SILENCE.
AUDIT PROTECTS THE SYSTEM FROM ITSELF.
APPEAL PROTECTS PEOPLE FROM UNREVIEWABLE FINALITY.
CORRECTION PROTECTS THE FUTURE.
LEARNING PREVENTS REPEATED FAILURE.
DESIGN MUST CLARIFY POWER, NOT GLORIFY IT.
TECHNOLOGY SERVES GOVERNANCE; IT DOES NOT OWN GOVERNANCE.
DATA ACCESS SERVES LAWFUL PURPOSE; IT DOES NOT CREATE AUTHORITY.
```

---

# 135. Final directive

```text
BE FIRM WITHOUT CRUELTY.
BE MERCIFUL WITHOUT ABANDONING JUSTICE.
BELIEVE WITHOUT FORCING BELIEF.
VERIFY BEFORE ACCUSING.
DISTINGUISH WITHOUT DEHUMANIZING.
LEAD WITHOUT OWNING.
RECORD WITHOUT BECOMING SURVEILLANCE.
DISCLOSE WITHOUT ENDANGERING PEOPLE.
PROTECT GOOD-FAITH REPORTING.
CORRECT WITHOUT HUMILIATING.
DESIGN WITHOUT MANIPULATING.
VISUALIZE WITHOUT MISLEADING.
GOVERN WITHOUT BECOMING GOD.
```

If wrong:

# CORRECT IT.

If correction is insufficient:

# REFORM IT.

If foundational architecture causes unacceptable harm:

# RESET IT.

---

# PART XXVII — Product Experience, UI/UX, visual identity, and asset governance

# 136. Product Experience Plane

DHGS treats human-system interaction as a governance control, not decoration.

```text
GOVERNANCE RULE
→ INTERACTION DESIGN
→ HUMAN UNDERSTANDING
→ HUMAN ACTION
→ ACCOUNTABLE OUTCOME
```

A confusing or manipulative interface can undermine due process even when backend rules are correct.

The Product Experience Plane covers:

```text
INFORMATION ARCHITECTURE
USER JOURNEYS
SCREEN CONTRACTS
INTERACTION SAFETY
CONTENT DESIGN
ACCESSIBILITY
LOCALIZATION
DESIGN SYSTEM
VISUAL IDENTITY
ASSET GOVERNANCE
SEARCH
NOTIFICATIONS
DOCUMENT OUTPUT
USER RESEARCH
```

---

# 137. Product experience principles

```text
CLARITY BEFORE DENSITY
REASON BEFORE ACTION
SAFETY BEFORE SPEED FOR HIGH-STAKES ACTIONS
PROGRESSIVE DISCLOSURE
NO HIDDEN DEADLINES
NO DARK PATTERNS
NO MORAL LABELING OF PEOPLE
NO COLOR-ONLY MEANING
NO SINGLE-CLICK IRREVERSIBLE HIGH-IMPACT ACTION
PUBLIC LANGUAGE BEFORE INTERNAL JARGON
SAVE WORK BEFORE FAILURE
CORRECTION MUST BE VISIBLE
ACCESSIBILITY IS PART OF DUE PROCESS
```

---

# 138. Experience actors and research profiles

Product design MUST account for at least:

```text
ORDINARY CITIZEN
LOW DIGITAL-LITERACY USER
OLDER PERSON
PERSON WITH DISABILITY
MINOR / REPRESENTED PERSON WHERE LAWFUL
CLAIMANT / RESPONDENT
WHISTLEBLOWER
CASE REVIEWER
LEGAL REVIEWER
ETHICS / RIGHTS REVIEWER
AUDITOR
SHADOW OVERSIGHT USER
JOURNALIST / RESEARCHER
PLATFORM ADMINISTRATOR
```

User research MUST NOT assume all citizens are legally trained, highly literate, continuously connected, or using desktop devices.

---

# 139. Public information architecture

Target public navigation:

```text
HOME

OPEN BOOK
├── Decisions
├── Public Cases where lawful
├── Corrections
├── Public KPI
└── Public Data

SUBMIT
├── Case / Complaint
├── Correction Request
├── Appeal
└── Feedback

KNOWLEDGE
├── How DHGS Works
├── Rights
├── Process
└── Public Corpus

MY PORTAL
├── My Cases
├── Action Required
├── Evidence
├── Appeals
└── Notifications

ABOUT
├── Authority
├── Shadow
├── Mizan
├── Privacy
├── Audit
└── Help / Contact
```

---

# 140. Operations information architecture

```text
DASHBOARD
CASES
TASKS
EVIDENCE
MIZAN
LEGAL REVIEW
ETHICAL / RIGHTS REVIEW
DECISIONS
APPEALS
CORRECTIONS
KNOWLEDGE / CORPUS
OPEN BOOK PUBLISHING
AUDIT
SHADOW OVERSIGHT
REPORTS
ADMIN
```

Navigation visibility MUST follow authorization. Hiding a menu item is not authorization; backend and RLS enforcement remain mandatory.

---

# 141. Canonical screen inventory

Initial screen namespaces:

```text
PUB-*    public Open Book
CIT-*    citizen portal
OPS-*    operations
MZN-*    Mizan
AUD-*    audit
SHD-*    Shadow oversight
KNO-*    knowledge / corpus
ADM-*    administration
```

Initial screens SHOULD include:

```text
PUB-001 Home
PUB-010 Open Book Search
PUB-020 Public Decision Detail
PUB-030 Correction History
PUB-040 Public KPI / Data

CIT-001 Citizen Dashboard
CIT-010 Submit Case
CIT-020 Case Detail
CIT-030 Evidence Upload
CIT-040 Appeal / Correction Request
CIT-050 Notifications

OPS-001 Operations Dashboard
OPS-010 Case Workspace
OPS-020 Task Workspace
OPS-030 Evidence Workspace
OPS-040 Decision Preparation

MZN-001 Individual Mizan Review
MZN-010 Reviewer Comparison / Consensus
MZN-020 Mizan Summary

AUD-001 Audit Dashboard
AUD-010 Chronological Audit Timeline
AUD-020 Decision Context Snapshot

SHD-001 Systemic Oversight Dashboard
SHD-010 Systemic Risk / Repeat Failure

KNO-001 Knowledge Search
KNO-010 Knowledge Detail / Provenance

ADM-001 Publication Review
ADM-010 Redaction Preview
```

---

# 142. Screen contract

Every material screen SHOULD define:

```yaml
ScreenContract:
  screen_id:
  purpose:
  primary_users: []
  allowed_roles: []
  minimum_identity_assurance:
  required_data: []
  primary_actions: []
  dangerous_actions: []
  states: []
  permissions: []
  content_level:
  accessibility_notes: []
  audit_events: []
  linked_requirements: []
  linked_tests: []
```

No high-stakes screen should be implemented without a documented purpose, actor, authority, and safe-state model.

---

# 143. Core human journeys

At minimum model and test:

```text
JNY-CIT-001 Submit and track a case
JNY-CIT-002 Upload / challenge evidence
JNY-CIT-003 Receive notice and respond
JNY-CIT-004 Appeal a decision
JNY-CIT-005 Understand a correction

JNY-REV-001 Receive and triage work
JNY-REV-002 Review evidence
JNY-REV-003 Complete independent Mizan review
JNY-REV-004 Prepare accountable decision

JNY-AUD-001 Reconstruct a decision
JNY-AUD-002 Inspect privileged/admin activity

JNY-PUB-001 Find and understand a public decision
JNY-PUB-002 Compare original and corrected public record
```

Each journey SHOULD define happy path, failure path, accessibility path, timeout/session recovery, and escalation.

---

# 144. High-stakes interaction pattern

High-impact authorization MUST display the basis before the final action.

Minimum pattern:

```text
DECISION SUMMARY
LEGAL BASIS STATUS
RIGHTS REVIEW STATUS
CONFLICT STATUS
EVIDENCE STATUS
MIZAN STATUS
REQUIRED QUORUM
AFFECTED PARTIES / RIGHTS
REVERSIBILITY
REMAINING UNCERTAINTY
MANDATORY REASON FIELD
CONFIRMATION / ATTESTATION
```

For irreversible or critical actions, second review / quorum controls MUST be visible and enforced.

Do not use a generic one-click `APPROVE` or `PUNISH` interaction for critical decisions.

---

# 145. Mizan UX and cognitive-bias controls

Where independent review is required, reviewer independence SHOULD be protected through score blinding.

```text
REVIEWER COMPLETES OWN MIZAN
→ SUBMITS / LOCKS INDIVIDUAL REVIEW
→ AGGREGATE / PEER SCORES BECOME VISIBLE
→ CONSENSUS / DISAGREEMENT REVIEW
```

The interface SHOULD highlight material disagreement rather than silently averaging it away.

Mizan UI MUST NOT label a person as good/bad, green/red, worthy/unworthy, or morally scored.

Colors and scores refer to **process readiness, evidence quality, uncertainty, and risk**, never human worth.

---

# 146. Evidence UX

A material evidence item SHOULD visibly expose:

```text
EVIDENCE ID
TITLE / TYPE
SOURCE
SUBMITTED BY / SOURCE SYSTEM
SUBMITTED / COLLECTED TIME
VERIFICATION STATUS
ADMISSIBILITY STATUS
PROVENANCE / CHAIN OF CUSTODY
CONFIDENTIALITY
CHALLENGE STATUS
TRANSFORMATIONS
```

Statuses such as:

```text
CHALLENGED
SEALED
PRIVILEGED
EXCLUDED
REJECTED
```

MUST be visually and textually explicit.

Evidence previews MUST preserve original-file access rules. Redacted/public derivatives MUST NOT replace the canonical original.

---

# 147. Decision explanation and reason tree

Decision UX SHOULD explain reasoning structurally:

```text
DECISION
├── Authority / jurisdiction
├── Legal basis
├── Evidence basis
├── Rights impact
├── Mizan readiness
├── Proportionality
├── Remaining uncertainty
├── Remedy / execution
└── Appeal / correction path
```

A decision interface SHOULD distinguish:

```text
WHAT WAS DECIDED
WHY
WHAT WAS NOT DECIDED
WHAT REMAINS UNKNOWN
WHAT CAN BE CHALLENGED
WHAT HAPPENS NEXT
```

---

# 148. Appeal and correction UX

Appeal and correction pathways MUST NOT be visually buried, harder to access than the original action, or framed to shame/discourage lawful use.

Minimum appeal interface:

```text
ELIGIBILITY
DEADLINE
CURRENT DECISION
WHAT MAY BE CHALLENGED
NEW EVIDENCE OPTION
PROCEDURAL ERROR OPTION
SUBMISSION RECEIPT
STATUS TRACKING
```

Correction UX SHOULD support a readable version comparison:

```text
ORIGINAL
→ WHAT CHANGED
→ WHY IT CHANGED
→ CURRENT VALID STATE
```

---

# 149. Open Book content model

Open Book is not a read-only clone of Operations Web.

Public decision pages SHOULD prioritize:

```text
WHAT HAPPENED?
WHY WAS THIS DECISION MADE?
WHAT DOES THIS MEAN FOR YOU?
WHO WAS RESPONSIBLE?
WHAT LAW / AUTHORITY APPLIED?
WHAT INFORMATION WAS CONSIDERED?
WHAT COULD NOT BE PUBLISHED AND WHY?
WHAT HAS CHANGED?
HOW CAN THIS BE CHALLENGED?
```

Provide:

```text
SIMPLE
STANDARD
TECHNICAL
```

views from the same verified source.

---

# 150. Role-specific dashboards

Avoid one universal super-dashboard.

```text
CITIZEN
→ my cases, action required, deadlines, appeals, notifications

REVIEWER
→ assigned work, overdue tasks, missing evidence, high-impact reviews

LEGAL / RIGHTS REVIEWER
→ review queue, applicable-law/version issues, unresolved rights concerns

AUDITOR
→ control failures, overrides, privileged actions, ledger anomalies

SHADOW
→ systemic patterns, repeat failures, institutional delays, capture indicators, correction backlog
```

Shadow dashboards SHOULD emphasize system-level patterns rather than encouraging informal intervention in individual cases.

---

# 151. Notifications and canonical communication

Notification classes:

```text
INFORMATION
ACTION_REQUIRED
DEADLINE
NOTICE
DECISION
APPEAL
CORRECTION
SECURITY
SYSTEM
```

A notification SHOULD state:

```text
WHAT HAPPENED
WHY THE USER RECEIVED IT
WHAT ACTION IS REQUIRED
DEADLINE IF ANY
CANONICAL RECORD LINK
```

Delivery may include in-app and email initially. SMS/WhatsApp may follow where lawful and useful.

Notifications are pointers; the canonical record remains DHGS/Open Book or the authenticated portal.

Critical deadlines MUST NOT rely on a single unreliable notification channel where applicable law requires stronger notice.

---

# 152. Search and discovery

Search is a core capability for Open Book and Corpus.

Public search SHOULD support filters such as:

```text
KEYWORD
DATE
REGION / JURISDICTION
INSTITUTION
STATUS
DECISION TYPE
CORRECTION STATUS
```

Authorized internal search MAY include:

```text
CASE ID
TASK
EVIDENCE
DECISION
LEDGER REFERENCE
KNOWLEDGE / CORPUS
```

Sensitive people/entity search MUST follow access controls and audit requirements.

PostgreSQL search is sufficient initially; specialized search infrastructure is deferred until justified.

---

# 153. Draft, autosave, session recovery, and low-connectivity behavior

Long forms and case submissions SHOULD support:

```text
SAVE DRAFT
AUTOSAVE WHERE SAFE
RETURN LATER
VISIBLE SAVE STATUS
RECOVERY AFTER VALIDATION ERROR
UPLOAD RETRY
```

Validation failure MUST NOT silently destroy valid user input.

Sensitive drafts require appropriate retention, encryption/access controls, and expiry.

Low-connectivity design SHOULD minimize payload, avoid unnecessary media, and preserve textual core functionality.

---

# 154. Error, empty, loading, degraded, and offline states

Every critical screen SHOULD define:

```text
LOADING
EMPTY
PARTIAL DATA
VALIDATION ERROR
PERMISSION DENIED
SERVICE ERROR
DEGRADED MODE
STALE DATA
OFFLINE / RECONNECTING WHERE RELEVANT
```

Errors MUST distinguish:

```text
USER-CORRECTABLE ERROR
from
SYSTEM / SERVICE FAILURE
```

Do not blame a user for a platform failure.

Critical errors SHOULD include correlation/reference IDs for support without exposing sensitive technical details.

---

# 155. Localization, translation, and time display

Initial language targets:

```text
id-ID
English where required
```

Architecture SHOULD be ready for additional local languages.

Translated official content SHOULD preserve:

```yaml
TranslationRecord:
  source_content_id:
  source_version:
  locale:
  translated_version:
  translator_or_provider:
  reviewer:
  status:
```

Canonical machine time is UTC. User interfaces display jurisdiction-local time with timezone label.

Hijri governance horizon MUST remain distinct from operational timestamps and statutory deadlines.

Avoid ambiguous date formats.

---

# 156. Content design and plain-language standard

Every public-facing technical term SHOULD have a plain-language equivalent or explanation.

Examples:

```text
Technical: Jurisdiction invalid.
Simple: This office does not have authority to decide this case.

Technical: Evidence threshold not met.
Simple: There is not enough verified information to make this decision yet.
```

Content rules:

```text
USE DIRECT LANGUAGE
EXPLAIN CONSEQUENCES
EXPLAIN NEXT STEP
DO NOT HIDE RIGHTS IN FOOTNOTES
DO NOT USE SHAMING LANGUAGE
DO NOT CLAIM CERTAINTY WHEN STATUS IS UNRESOLVED
DISTINGUISH SYSTEM FAILURE FROM USER ERROR
```

Legal precision MAY coexist with plain-language summaries; the authoritative legal text remains accessible.

---

# 157. Accessibility acceptance standard

Target:

# WCAG 2.2 LEVEL AA

Critical acceptance checks SHOULD include:

```text
KEYBOARD-ONLY OPERATION
VISIBLE FOCUS
SCREEN-READER LABELS / LANDMARKS
VALID HEADING HIERARCHY
200% ZOOM / REFLOW
NO COLOR-ONLY MEANING
SUFFICIENT TARGET SIZE
ERROR ASSOCIATED WITH FIELD
CAPTIONS / TRANSCRIPTS FOR MEDIA
REDUCED-MOTION SUPPORT
MEANINGFUL ALT TEXT / EQUIVALENT FOR INFORMATIVE VISUALS
```

Accessibility testing SHOULD combine:

```text
AUTOMATED TESTS
MANUAL KEYBOARD TESTS
SCREEN-READER TESTS
ZOOM / REFLOW TESTS
REAL-USER TESTING INCLUDING PEOPLE WITH DISABILITIES
```

A component library claiming accessibility does not eliminate page/journey testing.

---

# 158. DHGS Design System

DHGS SHOULD define reusable design tokens:

```text
COLOR
TYPOGRAPHY
SPACING
SIZE
RADIUS
BORDER
ELEVATION
BREAKPOINT
MOTION
Z-INDEX
```

Core components SHOULD include:

```text
Button
Link
Input
Textarea
Select
Checkbox
Radio
Date / Time Input
File Upload
Search
Pagination

Alert
Banner
Status Badge
Callout

Card
Table
Timeline
Tabs
Accordion
Dialog
Drawer

Case Header
Evidence Card
Mizan Gate
Rights Review Summary
Decision Summary
Correction Diff
Audit Event
Public Record
```

Design tokens SHOULD eventually be machine-readable and shared by both frontends.

---

# 159. Visual identity and logo system

DHGS SHOULD have a neutral, trustworthy visual identity that represents balance, accountability, openness, correction, and movement toward light without glorifying any office-holder.

Potential abstract motifs MAY explore:

```text
BALANCE / MIZAN
OPEN HORIZON / LIGHT
OPEN BOOK / TRANSPARENCY
LAYER / LEDGER / TRACE
SHADOW-TO-LIGHT TRANSITION
```

The identity MUST NOT depict Allah, a prophet, or a claimed Divine form. Sacred scripture/calligraphy SHOULD NOT be reduced to decorative branding where this could be disrespectful or misleading.

No portrait of Shadow or political leader SHOULD function as the primary system brand.

Required future variants:

```text
PRIMARY LOGO
HORIZONTAL WORDMARK
COMPACT LOGOMARK
MONOCHROME
REVERSE / DARK-BACKGROUND
SMALL-SIZE MARK
FAVICON / APP ICON
PRINT MARK
```

A governmental seal/crest variant requires actual lawful institutional authority and MUST NOT be invented in sandbox/voluntary mode.

---

# 160. Asset taxonomy

Future governed asset classes:

```text
AST-BRAND-*    logo / wordmark / identity
AST-ICON-*     interface icons
AST-ILL-*      illustrations
AST-BAN-*      banners / notices
AST-IMG-*      editorial / contextual images
AST-CHART-*    chart / graph templates
AST-DIAG-*     architecture / process diagrams
AST-SOC-*      social / Open Graph media
AST-PRINT-*    print / PDF assets
AST-BG-*       backgrounds / non-semantic decoration
```

Evidence files are NOT marketing/design assets and remain governed by Evidence rules.

---

# 161. SVG, vector, and icon rules

SVG is preferred for scalable brand marks, icons, diagrams, and simple illustrations.

SVG requirements SHOULD include:

```text
VALID viewBox
NO SCRIPT
NO UNTRUSTED EXTERNAL REFERENCES
SANITIZED CONTENT
OPTIMIZED PATHS WITHOUT DESTROYING EDITABILITY SOURCE
TEXT CONVERTED OR PROVIDED ACCESSIBLY WHEN REQUIRED
TITLE / DESCRIPTION OR EXTERNAL TEXT EQUIVALENT FOR INFORMATIVE SVG
```

UI icons SHOULD follow a consistent grid and stroke/fill language. A baseline such as 24×24 may be used.

Status MUST NOT be communicated by icon or color alone; visible text or accessible labels are required.

Decorative SVGs SHOULD be hidden from assistive technology.

---

# 162. Charts, graphs, and data visualization

DHGS visualizations MUST prioritize truthful comprehension over visual drama.

Every material chart SHOULD identify:

```text
TITLE
METRIC / UNIT
TIME PERIOD
DATA SOURCE
LAST UPDATED
FILTER / POPULATION
UNCERTAINTY OR MISSING DATA WHERE MATERIAL
CORRECTION / REVISION STATUS WHERE RELEVANT
```

Rules:

```text
NO MISLEADING 3D CHARTS
NO TRUNCATED AXES WHEN THEY MATERIALLY DISTORT INTERPRETATION
NO DUAL AXIS BY DEFAULT
NO DECORATIVE AREA THAT IMPLIES FALSE MAGNITUDE
NO COLOR-ONLY SERIES DISTINCTION
SHOW RAW / TABULAR DATA OPTION FOR IMPORTANT PUBLIC CHARTS
```

Charts used to communicate uncertainty SHOULD show uncertainty rather than hiding it behind a single precise number.

---

# 163. Illustration, image, banner, and synthetic-media policy

Images and illustrations MUST NOT become propaganda or emotional manipulation designed to bypass evidence/reasoning.

Asset rules SHOULD include:

```text
KNOWN SOURCE / CREATOR
LICENSE / PERMISSION
CONSENT WHERE PEOPLE ARE IDENTIFIABLE AND REQUIRED
NO UNNECESSARY VICTIM EXPOSURE
NO HERO-WORSHIP PORTRAITURE OF SHADOW
NO DECEPTIVE CROPPING / COMPOSITING
NO GENERATED IMAGE PRESENTED AS REAL EVENT DOCUMENTATION
```

Synthetic / AI-generated media used for illustration MUST be labeled where a reasonable viewer could mistake it for documentary material.

Synthetic media MUST NOT be admitted as authentic evidence merely because it resembles reality.

Evidence transformations such as redaction/cropping follow evidence provenance and derivative rules, not ordinary creative-asset rules.

Banner classes MAY include:

```text
INFORMATION
ACTION_REQUIRED
WARNING
CRITICAL
CORRECTION
EMERGENCY
MAINTENANCE
PRIVACY / SECURITY NOTICE
```

Banner severity MUST include text, not color alone.

---

# 164. Asset manifest, provenance, licensing, security, and performance

Every governed production asset SHOULD be representable by metadata:

```yaml
AssetManifest:
  asset_id:
  asset_type:
  name:
  source_file:
  delivery_files: []
  creator:
  source_or_origin:
  license:
  consent_reference:
  version:
  created_at:
  reviewed_by:
  approval_status:
  accessibility:
    alt_text:
    decorative:
  sensitive: false
  ai_generated: false
  content_hash:
```

Preferred delivery:

```text
SVG → icons / marks / diagrams
AVIF or WebP → web raster imagery where supported
PNG → fallback / transparency use where justified
PDF → print/document snapshot, not canonical live source
```

Security and privacy:

```text
SANITIZE SVG
STRIP UNNECESSARY EXIF / LOCATION METADATA
DO NOT EMBED SECRETS / INTERNAL PATHS
DO NOT PUBLISH ORIGINAL SENSITIVE IMAGE WHEN REDACTED DERIVATIVE IS REQUIRED
```

Performance budgets SHOULD eventually cap hero/image weight, icon payload, font payload, and unnecessary animation.

---

# 165. Print, PDF, QR, and document-generation system

DHGS SHOULD support formal document outputs where useful:

```text
CASE RECEIPT
NOTICE
DECISION LETTER
APPEAL RECEIPT
CORRECTION NOTICE
PUBLIC DECISION SUMMARY
AUDIT PACKAGE INDEX
ANNUAL / PERIODIC PUBLIC REPORT
```

Generated documents SHOULD include:

```text
DOCUMENT ID
VERSION
ISSUED DATE/TIME
ISSUING AUTHORITY
CANONICAL URL / RECORD REFERENCE
QR CODE WHERE USEFUL
PAGE NUMBER / CLASSIFICATION WHERE RELEVANT
CORRECTION / SUPERSESSION STATUS
```

A PDF/print document is a snapshot. The canonical digital record remains the versioned system record unless applicable law specifies otherwise.

---

# 166. User research, usability, and comprehension

Before high-impact production use, DHGS SHOULD conduct structured testing with representative users.

Test profiles SHOULD include ordinary citizens, low-digital-literacy users, older users, people with disabilities, reviewers, lawyers/legal specialists, auditors, journalists/researchers, and where relevant represented/vulnerable users.

Product-experience metrics MAY include:

```text
TASK SUCCESS RATE
TIME ON CRITICAL TASK
ERROR / REVERSAL RATE
FORM ABANDONMENT
APPEAL DISCOVERABILITY
PUBLIC COMPREHENSION
ACCESSIBILITY DEFECT RATE
SUPPORT REQUEST RATE
MIZAN REVIEWER DISAGREEMENT
```

User research MUST NOT expose real protected case data unnecessarily.

---

# 167. Design-artifact lifecycle and source of truth

Design artifacts MAY be created in Figma or another design tool later, but a design file is not a governance authority.

Lifecycle:

```text
DESIGN PROPOSAL
→ PRODUCT / ACCESSIBILITY REVIEW
→ GOVERNANCE / RIGHTS REVIEW WHERE HIGH-STAKES
→ APPROVED DESIGN
→ IMPLEMENTATION
→ ACCESSIBILITY / UX VERIFICATION
→ PRODUCTION
→ OUTCOME / FEEDBACK
→ REVISION
```

Design decisions affecting due process, appeal, publication, Mizan, privacy, or high-impact action SHOULD be traceable to requirements and tests.

Canonical design tokens/components should ultimately be represented in code; external design tools remain collaboration/reference systems.

---

# 168. UX and visual safety invariants

```yaml
UX-INV-001: no_irreversible_high_impact_action_with_one_click
UX-INV-002: no_high_impact_approval_without_visible_basis_and_reason
UX-INV-003: no_protected_data_in_public_preview
UX-INV-004: no_peer_or_aggregate_mizan_scores_before_independent_submission_where_blinding_required
UX-INV-005: no_status_meaning_by_color_alone
UX-INV-006: no_delete_style_UI_for_immutable_governance_history
UX-INV-007: no_hidden_material_deadline
UX-INV-008: no_loss_of_valid_form_data_due_to_validation_error
UX-INV-009: no_dark_pattern_discouraging_appeal_or_correction
UX-INV-010: no_UI_implying_guilt_before_lawful_determination
UX-INV-011: no_sensitive_session_replay_by_default
UX-INV-012: no_visual_asset_used_to_glorify_Shadow_or_bypass_reasoned_governance
UX-INV-013: no_misleading_chart_or_graph
UX-INV-014: no_unlabeled_synthetic_media_that_could_be_mistaken_for_documentary_evidence
UX-INV-015: no_critical_journey_without_keyboard_access
UX-INV-016: no_public_correction_without_visible_version_history
```

---

# 169. Product-experience and asset requirements

Initial requirements:

```text
REQ-UX-001 Public and internal information architecture is documented.
REQ-UX-002 Critical screens have stable Screen IDs and Screen Contracts.
REQ-UX-003 Critical journeys define happy, failure, accessibility, and recovery paths.
REQ-UX-004 High-impact actions require deliberate confirmation and reason capture.
REQ-UX-005 Mizan review UI protects reviewer independence where required.
REQ-UX-006 Evidence status, admissibility, confidentiality, and challenge are visible to authorized users.
REQ-UX-007 Appeal and correction paths are clearly discoverable.
REQ-UX-008 Long submissions support draft/save/recovery.
REQ-UX-009 Public content supports Simple, Standard, and Technical modes where appropriate.
REQ-UX-010 Public web targets WCAG 2.2 AA.
REQ-UX-011 Official translations are versioned and reviewable.
REQ-UX-012 Sensitive areas disable invasive analytics/session replay by default.
REQ-AST-001 Brand and assets use documented identity rules.
REQ-AST-002 Every production asset has source/license/provenance metadata where applicable.
REQ-AST-003 Informative visuals have accessible equivalents.
REQ-AST-004 SVG assets are sanitized before production use.
REQ-AST-005 Public charts disclose source, unit, and time period.
REQ-AST-006 Synthetic imagery is labeled when it could be mistaken for documentary reality.
REQ-AST-007 Evidence imagery remains governed by evidence provenance, not creative asset workflows.
REQ-AST-008 Logo/brand MUST NOT depict or claim representation of Allah or a prophet.
```

---

# 170. Product-experience completion gate

Before a controlled pilot, at minimum:

```text
PUBLIC IA REVIEWED
OPERATIONS IA REVIEWED
CRITICAL SCREEN INVENTORY DEFINED
CRITICAL SCREEN CONTRACTS DEFINED
CITIZEN CASE JOURNEY TESTED
APPEAL JOURNEY TESTED
EVIDENCE JOURNEY TESTED
MIZAN REVIEW JOURNEY TESTED
HIGH-STAKES ACTION PATTERN TESTED
OPEN BOOK COMPREHENSION TESTED
WCAG 2.2 AA CRITICAL-JOURNEY TESTS PASS
CONTENT STYLE / PLAIN-LANGUAGE STANDARD ACCEPTED
NOTIFICATION MODEL DEFINED
SEARCH BASELINE DEFINED
SAVE-DRAFT / RECOVERY BEHAVIOR DEFINED
CORE DESIGN TOKENS DEFINED
LOGO / VISUAL IDENTITY SPEC APPROVED
ICON / SVG RULES ACCEPTED
CHART / GRAPH RULES ACCEPTED
ASSET MANIFEST SCHEMA ACCEPTED
SYNTHETIC-MEDIA POLICY ACCEPTED
PRINT / PDF / QR POLICY ACCEPTED
USER-RESEARCH PLAN ACCEPTED
```

---

# PART XXVIII — DHGS ORM, addon, and data-driven model architecture

# 171. ORM design decision

DHGS SHOULD use a **small Odoo-inspired model/addon architecture** for ordinary data access and low-risk administration.

The goal is ergonomic consistency, metadata reuse, auditability, and modularity—not rebuilding a database engine or copying Odoo wholesale.

```text
POSTGRESQL / SUPABASE
        ↑
DATABASE ADAPTER + RLS
        ↑
@dhgs/orm
        ↑
@dhgs/orm-base
        ↑
DOMAIN ADDONS
        ↑
API / SERVICES / SAFE GENERATED UI
```

The ORM MUST NOT become a shortcut around governance workflows.

The existing `packages/data` package is a prototype/spike of this direction. M0 SHOULD migrate/refactor its useful ideas into the stable `@dhgs/orm` and `@dhgs/orm-base` contracts instead of expanding both architectures indefinitely.

---

# 172. Package boundaries

## `packages/orm` — framework kernel

Responsibilities:

```text
FIELD DEFINITIONS
MODEL DEFINITIONS
MODEL REGISTRY
ENVIRONMENT / REQUEST CONTEXT
DOMAIN / FILTER AST
REPOSITORY / MODEL API
MANIFEST / ADDON CONTRACT
VIEW METADATA
ACTION / COMMAND REGISTRY
ADAPTER CONTRACT
TRANSACTION CONTEXT
AUDIT / LEDGER HOOKS
UPGRADE CONTRACT
```

It MUST NOT contain DHGS domain-specific Mizan/decision policy.

## `packages/orm-base` — foundational addon

Contains reusable platform models, seed/reference data, safe views, menus, access metadata, and base actions.

It MUST NOT become a dumping ground for every domain model.

## Domain addons

Possible packages after M0:

```text
addon-identity
addon-case
addon-work
addon-evidence
addon-knowledge
addon-governance
addon-ledger
addon-openbook
addon-audit
```

Equivalent naming MAY be used, but module boundaries MUST remain explicit.

---

# 173. Field system

Initial field kinds MAY include:

```text
string
text
integer
number
boolean
enum
uuid
date
datetime
json
belongsTo
hasMany
manyToMany where justified
```

Field metadata MAY include:

```yaml
Field:
  label:
  help:
  required:
  unique:
  default:
  sensitive:
  public:
  mutable:
  selection:
  relation:
  pattern:
  invisible_if:
  readonly_if:
  required_if:
```

Conditional display metadata is a UI hint only. Security and authorization MUST remain server/database enforced.

---

# 174. Model contract

Target declaration style:

```ts
export const Case = defineModel('case.case', {
  table: 'cases',
  order: 'created_at desc',
  governance: {
    jurisdictionScoped: true,
    audit: 'required',
    ledger: 'required',
    archiveOnly: true
  },
  fields: {
    case_number: fields.string({ required: true, unique: true }),
    title: fields.string({ required: true }),
    status: fields.enum(['draft', 'submitted', 'triage', 'closed'], { required: true }),
    jurisdiction: fields.belongsTo(Jurisdiction, { required: true })
  }
})
```

A model definition SHOULD be sufficient to derive runtime validation metadata, field metadata, relation metadata, generic low-risk views, and migration/schema expectations.

---

# 175. Base record contract

Material records SHOULD expose consistent metadata such as:

```yaml
BaseRecord:
  id:
  active_or_archived_state:
  created_at:
  updated_at:
  created_by:
  updated_by:
  version:
  jurisdiction_id:
  institution_id:
```

Not every table needs every field, but omission from material governance records requires rationale.

Optimistic versioning SHOULD prevent silent lost updates.

---

# 176. Environment and operation context

Every material model operation MUST be capable of carrying:

```yaml
ModelContext:
  actor_id:
  request_id:
  purpose:
  identity_assurance:
  jurisdiction_ids: []
  institution_id:
  roles: []
  permissions: []
  correlation_id:
  transaction:
  privileged: false
```

Target API:

```ts
const env = createEnvironment(context)
const Cases = env.model('case.case')
```

Convenience APIs such as `withContext`, `withTransaction`, or limited privileged/break-glass contexts MAY exist, but privileged elevation MUST be reasoned, time-limited where practical, and auditable.

There MUST NOT be a casual equivalent of unrestricted `sudo()` that silently bypasses governance boundaries.

---

# 177. Model/repository methods

Initial safe methods MAY include:

```text
create
browse
read
search
searchRead
count
write
archive
unarchive where allowed
action
```

Target usage:

```ts
const rows = await Cases.search([
  ['status', '=', 'submitted'],
  ['jurisdiction_id', 'in', env.context.jurisdictionIds]
], { limit: 20, order: 'created_at desc' })

const record = await Cases.create(values)
await record.write({ title: 'Corrected title' })
await record.archive()
```

Governance models MUST NOT expose unrestricted hard delete.

Where lawful retention requires deletion/anonymization, use explicit controlled retention/privacy procedures rather than ordinary CRUD deletion.

---

# 178. Domain/filter language

A small query-domain AST MAY use tuples and boolean operators, for example:

```ts
[
  ['status', '=', 'submitted'],
  ['impact', 'in', ['high', 'critical']]
]
```

Allowed operators SHOULD be explicit and validated.

Sensitive/write-only fields MUST NOT become searchable/sortable in ways that leak their values.

Queries MUST remain scoped by access context and PostgreSQL RLS.

---

# 179. Registry

The model registry maps stable dot-notation names to definitions.

Examples:

```text
base.jurisdiction
base.institution
case.case
evidence.evidence
governance.decision
openbook.public_record
```

Rules:

```text
MODEL NAMES ARE UNIQUE
MODEL NAMES ARE STABLE CONTRACTS
DUPLICATE REGISTRATION FAILS
UNKNOWN MODEL LOOKUP FAILS
REGISTRY CAN BE RESET IN TESTS
```

---

# 180. Addon / manifest contract

Every addon SHOULD expose one canonical manifest.

```ts
export const manifest = defineAddon({
  name: 'case',
  version: '0.1.0',
  depends: ['base'],
  models: [Case, CaseParticipant],
  data: [...],
  views: [...],
  menus: [...],
  actions: [...],
  access: [...],
  upgrades: {...}
})
```

Manifest fields MAY include:

```yaml
AddonManifest:
  name:
  version:
  depends: []
  models: []
  data: []
  views: []
  menus: []
  actions: []
  access: []
  hooks: []
  upgrades: {}
```

Requirements:

```text
SEMANTIC VERSION
EXPLICIT DEPENDENCIES
DEPENDENCY CYCLE DETECTION
MODEL UNIQUENESS
SAFE INSTALL ORDER
EXPLICIT UPGRADE PATH
```

---

# 181. `orm-base` initial model set

The initial base addon SHOULD remain small and reusable.

Recommended candidates:

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

Boundary guidance:

```text
Jurisdiction / Institution / Party / Access / Delegation
→ base

Case / Participant / Notice
→ case addon

Task / SLA / Queue
→ work addon or case/work domain

Evidence / Challenge / Chain of Custody
→ evidence addon

Knowledge / Corpus / Snapshot
→ knowledge addon

Mizan / Rights / Legal Review / Decision / Appeal / Correction / Outcome
→ governance addon

Ledger Entry / Decision Context Snapshot
→ ledger addon

Public Record / Redaction / Publication
→ openbook addon
```

This prevents `orm-base` from becoming an unmaintainable monolith.

---

# 182. Seed data and stable external identifiers

Reference records SHOULD use stable external identifiers rather than relying on environment-specific numeric IDs.

Example:

```ts
seed(Jurisdiction, 'base.jurisdiction_global_sandbox', {
  code: 'SANDBOX',
  name: 'DHGS Sandbox'
})
```

Relations in seed data MAY use references such as:

```ts
ref('base.jurisdiction_global_sandbox')
```

Seed installation SHOULD be idempotent or version-aware.

Seed data MUST NOT silently overwrite material user/governance data.

---

# 183. Data-driven view metadata

The ORM MAY describe safe generic UI through metadata.

```yaml
ViewSpec:
  model:
  title:
  list:
    columns: []
    order:
  form:
    sections: []
  search:
    fields: []
    filters: []
```

Pipeline:

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

Generated UI is appropriate for low-risk configuration/reference data and selected operational records.

Generated UI MUST NOT be the only interface for high-stakes workflows.

---

# 184. Explicit UI boundary

The following remain explicit, purpose-designed workflows even if their underlying records are ORM models:

```text
MIZAN REVIEW
LEGAL REVIEW
RIGHTS REVIEW
HIGH-IMPACT DECISION AUTHORIZATION
APPEAL
CORRECTION
EMERGENCY POWER
HIGH-IMPACT PUBLICATION / REDACTION
BREAK-GLASS ADMINISTRATION
```

Reason:

```text
DATA CRUD
!=
GOVERNANCE AUTHORIZATION
```

A generic form cannot create lawful authority merely by writing a row.

---

# 185. Action / command model

Models MAY expose safe actions, but business transitions SHOULD use named commands/actions rather than arbitrary field mutation.

Examples:

```text
action_submit
action_assign
action_archive
request_review
complete_review
publish_public_record
open_appeal
issue_correction
```

High-stakes actions MUST call domain/policy services and enforce state transition, authority, conflict, rights, audit, and ledger rules.

The generic data layer MUST NOT expose `decision.status = approved` as an unrestricted write path.

---

# 186. Audit and Hisab hooks

ORM mutations MAY emit standardized mutation events.

```yaml
MutationEvent:
  operation:
  model:
  record_id:
  actor_id:
  purpose:
  request_id:
  timestamp:
  version:
  changed_fields: []
  jurisdiction_id:
  institution_id:
```

Rules:

```text
SOFTWARE AUDIT SINK
→ records technical mutation activity

HISAB LEDGER SINK
→ only for governance-significant models/events configured to require it
```

Not every row change belongs in Hisab. Material public-power meaning determines ledger inclusion.

---

# 187. Database adapter and RLS

The ORM MUST remain adapter-based.

Initial adapter target:

# POSTGRESQL / SUPABASE

The adapter is responsible for safe persistence and transaction integration; it MUST NOT invent authorization.

Layered protection:

```text
APPLICATION / ORM SCOPE CHECK
+
BACKEND AUTHORIZATION
+
POSTGRESQL RLS
+
AUDIT
```

RLS is authoritative for row access on exposed data. ORM checks are defense-in-depth and improve developer ergonomics/testing.

---

# 188. Schema and migration policy

DHGS SHOULD distinguish model metadata from production migration authority.

During development, metadata MAY generate or compare expected schema.

Production schema change SHOULD use explicit versioned migrations.

```text
MODEL CHANGE
→ SCHEMA DIFF
→ MIGRATION REVIEW
→ BACKFILL PLAN IF NEEDED
→ STAGING
→ TEST
→ APPLY
→ VERIFY
```

The runtime MUST NOT silently perform destructive production schema changes.

Adding required/unique fields to populated tables requires explicit backfill/migration handling.

---

# 189. Upgrade contract

Addon manifests MAY define version-aware upgrades.

```ts
upgrades: {
  '0.1.0': async (trx) => { /* controlled backfill */ }
}
```

Rules:

```text
UPGRADE IS TRANSACTIONAL WHERE PRACTICAL
UPGRADE IS VERSIONED
UPGRADE IS TESTED
DOWNSTREAM DEPENDENCIES ARE CONSIDERED
ROLLBACK / RECOVERY IS DOCUMENTED
```

No addon may silently downgrade another addon.

---

# 190. MVC and data-driven application pattern

DHGS MAY describe its application pattern as:

```text
MODEL
→ persistent domain data + metadata

VIEW
→ explicit UX or safe metadata-driven UI

CONTROLLER / SERVICE / COMMAND
→ orchestration, authorization, state transition, engines, audit
```

The preferred rule is:

```text
MODEL DEFINES DATA
VIEW DEFINES PRESENTATION
SERVICE / COMMAND DEFINES GOVERNANCE ACTION
```

This avoids placing critical rules in React components or generic ORM methods.

---

# 191. Generic admin safety

Generated administration MUST support model-level policy such as:

```yaml
ui_policy:
  generated: allowed | read_only | prohibited
  create: true_or_false
  write: true_or_false
  archive: true_or_false
  actions: []
```

High-risk models SHOULD default to:

```text
generated = read_only or prohibited
```

Examples:

```text
base.tag → generated admin may be allowed
base.jurisdiction → tightly controlled generated admin
mizan.review → explicit workflow UI
governance.decision → explicit workflow UI
ledger.entry → read-only specialized UI
```

---

# 192. ORM testing requirements

M0 SHOULD cover at minimum:

```text
MODEL REGISTRATION
DUPLICATE MODEL FAILURE
FIELD VALIDATION
DOMAIN FILTERING
SEARCH / COUNT / BROWSE
CREATE / WRITE / ARCHIVE
OPTIMISTIC VERSION CONFLICT
JURISDICTION SCOPE
INSTITUTION SCOPE
PRIVILEGED CONTEXT AUDIT
IMMUTABLE FIELD PROTECTION
NO HARD DELETE
MANIFEST DEPENDENCY ORDER
CYCLE DETECTION
SEED REFERENCES
VIEW METADATA VALIDATION
GENERATED UI POLICY
AUDIT EVENT EMISSION
LEDGER EVENT EMISSION FOR CONFIGURED MODELS
ADAPTER TRANSACTION BEHAVIOR
RLS INTEGRATION TEST
```

---

# 193. ORM invariants

```yaml
ORM-INV-001: no_unrestricted_hard_delete_for_governance_records
ORM-INV-002: no_cross_jurisdiction_mutation_without_authority
ORM-INV-003: no_material_mutation_without_actor_purpose_request_context
ORM-INV-004: no_orm_scope_check_replacing_RLS
ORM-INV-005: no_generic_CRUD_approving_high_impact_decision
ORM-INV-006: no_duplicate_model_name
ORM-INV-007: no_addon_dependency_cycle
ORM-INV-008: no_silent_destructive_production_schema_sync
ORM-INV-009: no_sensitive_hidden_field_query_leak
ORM-INV-010: no_addon_upgrade_without_version_and_test
```

---

# 194. M0 ORM exit gate

M0 ORM foundation passes only when:

```text
@dhgs/orm CONTRACT STABLE ENOUGH FOR FIRST ADDON
@dhgs/orm-base MANIFEST LOADS
BASE MODEL SET REVIEWED
POSTGRES / SUPABASE ADAPTER WORKS IN TEST ENVIRONMENT
MODEL CONTEXT / JURISDICTION SCOPING TESTS PASS
RLS INTEGRATION PATH PROVEN
ARCHIVE-NOT-DELETE POLICY TESTED
AUDIT / LEDGER HOOK CONTRACT TESTED
MANIFEST DEPENDENCY / CYCLE TESTS PASS
LOW-RISK VIEW METADATA RESOLVES
HIGH-RISK GENERATED UI PROHIBITION TESTED
PACKAGES/DATA SPIKE EITHER MIGRATED OR FORMALLY DEPRECATED
DOCUMENTATION UPDATED
```

---

# PART XXIX — Issue-led implementation governance

# 195. Implementation principle

From v15.1 onward, non-trivial implementation is **issue-first**.

```text
BLUEPRINT
→ REQUIREMENT
→ MILESTONE
→ GITHUB ISSUE
→ CODE / DESIGN / DATA
→ TEST
→ ACCEPTANCE
→ CLOSE
```

The issue tracker is the operational backlog; this blueprint is the architectural authority.

---

# 196. One-active-milestone rule

Only one implementation milestone SHOULD be active at a time unless a clearly independent security/documentation fix must run in parallel.

```text
ACTIVE MILESTONE
→ implementation work allowed

FUTURE MILESTONE
→ planning/backlog only
```

New ideas that do not belong to the active milestone MUST NOT interrupt active work. Capture them in the master backlog and revisit at the milestone boundary.

---

# 197. Milestone sequence

```text
M0 — FOUNDATION KERNEL
     ORM / ORM-BASE / DB adapter / RLS context / metadata / CI contract

M1 — CASE SPINE
     identity / jurisdiction / authority / case / work / evidence

M2 — DECISION SPINE
     legal precheck / rights / Mizan / decision / attestation

M3 — ACCOUNTABILITY & PUBLIC
     Hisab / Open Book / publication / appeal / correction

M4 — ASSURANCE & PILOT
     audit / security / accessibility / simulation / pilot gate
```

M0 is the only active milestone at adoption of v15.1.

---

# 198. Issue contract

Every implementation issue SHOULD contain:

```yaml
IssueContract:
  milestone:
  objective:
  problem:
  scope: []
  non_scope: []
  dependencies: []
  linked_blueprint_sections: []
  linked_requirements: []
  acceptance_criteria: []
  tests: []
  security_privacy_notes: []
  docs_updates: []
```

An issue without measurable acceptance criteria is not implementation-ready.

---

# 199. Scope-change rule

During implementation:

```text
SMALL CLARIFICATION
→ update current issue

NEW INDEPENDENT REQUIREMENT
→ create follow-up issue

FUTURE-MILESTONE IDEA
→ add to master backlog, do not expand current issue

FOUNDATIONAL ARCHITECTURE CHANGE
→ blueprint / ADR review before implementation
```

This rule prevents milestone drift.

---

# 200. WIP and dependency discipline

Recommended initial WIP:

```text
1 PRIMARY IMPLEMENTATION ISSUE
+
1 SUPPORTING TEST / DOC ISSUE IF NECESSARY
```

Avoid opening many partially implemented modules at once.

Dependencies SHOULD be explicit:

```text
ORM KERNEL
→ ORM-BASE
→ DB ADAPTER / RLS
→ DATA-DRIVEN VIEW CONTRACT
→ M0 EXIT GATE
→ M1
```

---

# 201. Master tracking issue

The repository SHOULD maintain one master implementation issue containing:

```text
CURRENT MILESTONE
CURRENT PRIMARY ISSUE
MILESTONE EXIT CHECKLIST
LINKS TO ACTIVE ISSUES
FUTURE MILESTONE CHECKLIST
BLOCKERS
DECISIONS / ADR NEEDED
```

The master issue is a navigation/control artifact, not a replacement for detailed implementation issues.

---

# 202. Milestone exit rule

A milestone exits only when:

```text
ALL REQUIRED ISSUES CLOSED
ACCEPTANCE CRITERIA SATISFIED
REQUIRED TESTS PASS
CRITICAL DOCUMENTATION UPDATED
NO KNOWN CRITICAL INVARIANT FAILURE
NEXT MILESTONE ENTRY CONDITIONS MET
```

Code quantity, commit count, or visual completeness alone does not prove milestone completion.

---

# APPENDIX A — Historical and symbolic context

This appendix preserves non-normative concepts from the early DHGS design history so they are not silently lost while remaining separate from executable governance rules.

## A.1 Symbolic transformation sequence

```text
BLACK HOLE
DARKNESS
SHADOW
RISING LIGHT
LIGHT
EXIT TO THE LIGHT
```

## A.2 Pre-Heaven

`Pre-Heaven` is an aspirational metaphor for a society moving toward greater justice, knowledge, mercy, responsibility, freedom, accountability, peace, and continuous correction. It is not a literal human-created heaven.

## A.3 Raqib–‘Atid

Raqib–‘Atid remains a conceptual metaphor for constructive and corrective accountability. Operational software uses neutral labels and does not claim to reproduce Divine accounting.

## A.4 One-Hijri-year horizon

The one-Hijri-year horizon is a governance stabilization and evaluation period. It is not an end-times prediction or Divine deadline.

---

# APPENDIX B — Controlled-baseline completion checklist

DHGS may advance from `CONTROLLED_IMPLEMENTATION_BASELINE_CANDIDATE` to `CONTROLLED_IMPLEMENTATION_BASELINE` only when at minimum:

```text
ADOPTION MODE SELECTED FOR PILOT
SYSTEM OPERATOR AND GOVERNANCE AUTHORITY IDENTIFIED
DATA GOVERNANCE ROLES IDENTIFIED
AUTHORITY MANDATE REGISTRY IMPLEMENTABLE
TEMPORAL LAW VERSIONING IMPLEMENTABLE
LEGAL PRECHECK / FORMAL REVIEW SEQUENCE ACCEPTED
MIZAN NON-ADJUDICATIVE OUTPUTS ACCEPTED
CRITICAL REQUIREMENT REGISTRY COMPLETE
CRITICAL CONTROL / RULE REGISTRY COMPLETE
DECISION CONTEXT SNAPSHOT SCHEMA VERIFIED
IDENTITY ASSURANCE MODEL VERIFIED
NOTICE / EVIDENCE CHALLENGE FLOW VERIFIED
TECHNICAL ADMIN SEPARATION TESTED
INDEPENDENT DHGS OVERSIGHT ROUTE DEFINED
SECURITY SUPPLY-CHAIN CONTROLS PLANNED
SLO / RESTORE TEST TARGETS DEFINED
WCAG 2.2 AA ACCESSIBILITY TARGET ACCEPTED
VULNERABLE-PERSON SAFEGUARDS DEFINED
SCRIPTURAL CORPUS PROVENANCE MODEL VERIFIED
PRODUCT EXPERIENCE COMPLETION GATE PASS
CORE VISUAL / ASSET GOVERNANCE ACCEPTED
ORM / ADDON FOUNDATION M0 EXIT GATE PASS
ISSUE-LED IMPLEMENTATION GOVERNANCE ACTIVE
HIGH-RISK END-TO-END SIMULATIONS PASS
```

## BIIZNILLAH.
