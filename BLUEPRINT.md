# DHGS v14.0.0 — Controlled Implementation Blueprint

## Divine–Human Governance System

**Document ID:** `DHGS-BP-001`  
**Version:** `14.0.0`  
**Status:** `CONTROLLED_IMPLEMENTATION_BASELINE_CANDIDATE`  
**Document type:** Governance + Product + Engine + Corpus + Technical + Institutional Architecture Blueprint  
**Product type:** Digital Governance Assurance Platform  
**Architecture strategy:** Logical separation, simple deployment, modular monolith first  
**Primary evaluation horizon:** `1 Hijri Year`  
**Long-term symbolic maturity direction:** `EXIT_TO_THE_LIGHT`

---

# 0. Document control, scope, and normative language

This document is the **single source of truth** for the DHGS foundational and implementation architecture. It consolidates the governance, Shadow, Mizan, Hisab Ledger, Open Book, knowledge/corpus, work, identity, product, technical, control, security, privacy, audit, and implementation principles developed in earlier versions.

The intent of v14 is **lossless consolidation plus gap closure**. Concepts from earlier baselines are retained unless explicitly superseded in this document.

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

DHGS is governance assurance infrastructure. It is not itself a sovereign state.

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
│ Cases / Evidence / Ledger          │
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

Separation rules:

```text
FRONTEND != BACKEND
BACKEND != ENGINES
ENGINES != CORPUS
CORPUS != CASE EVIDENCE
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
│   ├── domain/
│   ├── schemas/
│   ├── database/
│   ├── auth/
│   ├── events/
│   └── ui/
├── supabase/
├── controls/
├── tests/
├── simulations/
├── docs/
├── adr/
└── .github/
```

This document does not require creating these directories immediately.

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
```

---

# 119. Test architecture

```text
UNIT TEST
RULE TEST
SCHEMA TEST
STATE TRANSITION TEST
INTEGRATION TEST
RLS / AUTHORIZATION TEST
IDENTITY-ASSURANCE TEST
PRIVACY TEST
SECURITY TEST
ACCESSIBILITY TEST
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
AUTHORIZATION / RLS TESTS PASS
IDENTITY ASSURANCE TESTS PASS
SECURITY TESTS PASS
PRIVACY TESTS PASS
ACCESSIBILITY TESTS PASS
HIGH-RISK SIMULATIONS PASS
RESTORE TEST PASS
ROLLBACK PATH EXISTS
```

---

# 125. Boot sequence

```text
BOOT-000 FOUNDATION
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
SUPABASE
AUTH
DATABASE
CI
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
```

## Phase 2 — Evidence and Knowledge

```text
EVIDENCE METADATA
PRIVATE FILE STORAGE
EVIDENCE REVIEW / CHALLENGE
BASIC KNOWLEDGE REGISTRY
AUTHORITY MANDATE REGISTRY
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
```

## Phase 4 — Hisab and Open Book

```text
LEDGER ENGINE
PUBLICATION / REDACTION ENGINE
PUBLIC PROJECTION
OPEN BOOK
CORRECTION HISTORY
```

## Phase 5 — Appeal and Correction

```text
APPEAL
RE-MIZAN
CORRECTION
VERSION HISTORY
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
```

## Phase 7 — Controlled Pilot

```text
LIMITED JURISDICTION
LOW-RISK / REVERSIBLE CASES
HIGH OBSERVABILITY
SYNTHETIC OR CONSENTED DATA WHERE POSSIBLE
INDEPENDENT OVERSIGHT ACTIVE
```

---

# 127. First real end-to-end acceptance test

```text
Citizen submits case
→ identity assurance determined
→ case created
→ jurisdiction and authority mandate identified
→ notice obligations identified
→ stakeholders and rights mapped
→ reviewer assigned
→ evidence added / challenged / reviewed
→ legal basis precheck completed
→ Mizan completed
→ formal legal / ethical review completed
→ human decision recorded and attested
→ decision context snapshot stored
→ Hisab Ledger entry created
→ Publication Engine creates privacy-safe public projection
→ Open Book shows public explanation where lawful
→ citizen can appeal
→ Re-Mizan can occur
→ correction preserves original history
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
UNDER WHICH RULES → CONTROLS / POLICY
HOW QUALITY IS ASSESSED → MIZAN / RIGHTS / EVIDENCE ENGINES
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
BACKEND → orchestration
ENGINES → evaluation
DATABASE → current state
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
TECHNOLOGY SERVES GOVERNANCE; IT DOES NOT OWN GOVERNANCE.
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
GOVERN WITHOUT BECOMING GOD.
```

If wrong:

# CORRECT IT.

If correction is insufficient:

# REFORM IT.

If foundational architecture causes unacceptable harm:

# RESET IT.

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
HIGH-RISK END-TO-END SIMULATIONS PASS
```

## BIIZNILLAH.
