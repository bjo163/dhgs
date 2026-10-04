import { readFileSync, writeFileSync } from 'node:fs'

const blueprintPath = 'BLUEPRINT.md'
const readmePath = 'README.md'

let blueprint = readFileSync(blueprintPath, 'utf8')
let readme = readFileSync(readmePath, 'utf8')

function replaceExact(source, oldText, newText, label) {
  if (!source.includes(oldText)) {
    throw new Error(`Expected block not found: ${label}`)
  }
  return source.replace(oldText, newText)
}

blueprint = replaceExact(
  blueprint,
  '# DHGS v15.1.0 — Controlled Implementation, Product Experience & Data-Driven Architecture Blueprint',
  '# DHGS v15.1.1 — Controlled Implementation, Product Experience & Data-Driven Architecture Blueprint',
  'blueprint title version',
)

blueprint = replaceExact(
  blueprint,
  '**Version:** `15.1.0`',
  '**Version:** `15.1.1`',
  'blueprint metadata version',
)

const old195 = `# 195. Implementation principle

From v15.1 onward, non-trivial implementation is **issue-first**.

\`\`\`text
BLUEPRINT
→ REQUIREMENT
→ MILESTONE
→ GITHUB ISSUE
→ CODE / DESIGN / DATA
→ TEST
→ ACCEPTANCE
→ CLOSE
\`\`\`

The issue tracker is the operational backlog; this blueprint is the architectural authority.`

const new195 = `# 195. Implementation principle

From v15.1 onward, non-trivial implementation is **issue-first**.

\`\`\`text
BLUEPRINT CAPABILITY
→ REQUIREMENT / CONTROL / RULE / INVARIANT / KPI WHERE CRITICAL
→ MILESTONE
→ GITHUB ISSUE
→ CODE / DESIGN / DATA
→ TEST
→ CI / SECURITY / ASSURANCE EVIDENCE
→ ACCEPTANCE
→ CLOSE
\`\`\`

The issue tracker is the operational backlog; this blueprint is the architectural authority.

The canonical operational software index is GitHub master issue **#6**. GitHub issue numbers are operational work-item references, not permanent architecture identifiers; stable traceability SHOULD use the \`REQ-*\`, \`CTRL-*\`, \`RULE-*\`, \`INV-*\`, \`TEST-*\`, and \`KPI-*\` namespaces.

The Blueprint document version and software semantic version are independent version streams. A Blueprint patch does not itself publish software, and a software patch/minor release does not itself amend this Blueprint.`

blueprint = replaceExact(blueprint, old195, new195, 'section 195')

const old197 = `# 197. Milestone sequence

\`\`\`text
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
\`\`\`

M0 is the only active milestone at adoption of v15.1.`

const new197 = `# 197. Milestone sequence

\`\`\`text
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
\`\`\`

M0 is the only active milestone at adoption of v15.1. Later milestones are planning/backlog only until the previous milestone exit gate closes with evidence.

The detailed operational checklist, issue ordering, and current primary work item MUST be read from master issue #6 rather than duplicated exhaustively in this Blueprint.`

blueprint = replaceExact(blueprint, old197, new197, 'section 197')

const old200 = `Dependencies SHOULD be explicit:

\`\`\`text
ORM KERNEL
→ ORM-BASE
→ DB ADAPTER / RLS
→ DATA-DRIVEN VIEW CONTRACT
→ M0 EXIT GATE
→ M1
\`\`\``

const new200 = `Dependencies SHOULD be explicit. The initial program spine is:

\`\`\`text
ORM KERNEL
→ ORM-BASE
→ DB / RLS + SCHEMAS / EVENTS
→ ASYNC / OUTBOX + SAFE DATA-DRIVEN UI + MACHINE REGISTRIES
→ REPOSITORY / RELEASE / RULESET / REPRODUCIBILITY CONTROLS
→ M0 EXIT GATE
→ M1 CASE / IDENTITY / KNOWLEDGE
→ M2 DECISION
→ M3 EXECUTION / ACCOUNTABILITY / PUBLIC
→ M4 ASSURANCE / HARDENING
→ M5 DEPLOYMENT / CONTROLLED PILOT
→ YEAR-ONE CONTINUE | CORRECT | RESET
\`\`\``

blueprint = replaceExact(blueprint, old200, new200, 'section 200 dependency spine')

const old201 = `# 201. Master tracking issue

The repository SHOULD maintain one master implementation issue containing:

\`\`\`text
CURRENT MILESTONE
CURRENT PRIMARY ISSUE
MILESTONE EXIT CHECKLIST
LINKS TO ACTIVE ISSUES
FUTURE MILESTONE CHECKLIST
BLOCKERS
DECISIONS / ADR NEEDED
\`\`\`

The master issue is a navigation/control artifact, not a replacement for detailed implementation issues.`

const new201 = `# 201. Master tracking issue

The repository MUST maintain one master implementation issue. The current canonical operational index is **GitHub issue #6** and SHOULD contain:

\`\`\`text
CURRENT MILESTONE
CURRENT PRIMARY ISSUE
MILESTONE EXIT CHECKLIST
LINKS TO REQUIRED / ACTIVE ISSUES
FUTURE MILESTONE CHECKLIST
BLOCKERS
CI / SECURITY / ASSURANCE EVIDENCE
DECISIONS / ADR NEEDED
\`\`\`

The master issue is a navigation/control artifact, not a replacement for detailed implementation issues or stable REQ/CTRL/RULE/INV/KPI identifiers.

Automation MAY summarize milestone state, apply milestone labels, and prevent premature closure of exit-gate issues, but automation does not prove substantive acceptance by itself.`

blueprint = replaceExact(blueprint, old201, new201, 'section 201')

const old202 = `# 202. Milestone exit rule

A milestone exits only when:

\`\`\`text
ALL REQUIRED ISSUES CLOSED
ACCEPTANCE CRITERIA SATISFIED
REQUIRED TESTS PASS
CRITICAL DOCUMENTATION UPDATED
NO KNOWN CRITICAL INVARIANT FAILURE
NEXT MILESTONE ENTRY CONDITIONS MET
\`\`\`

Code quantity, commit count, or visual completeness alone does not prove milestone completion.

---

# APPENDIX A — Historical and symbolic context`

const new202 = `# 202. Milestone exit rule

A milestone exits only when:

\`\`\`text
ALL REQUIRED ISSUES CLOSED
ACCEPTANCE CRITERIA SATISFIED
REQUIRED AUTOMATED / MANUAL / ADVERSARIAL TESTS PASS
CRITICAL DOCUMENTATION AND MACHINE CONTRACTS UPDATED
SECURITY / PRIVACY / ACCESSIBILITY EFFECTS REVIEWED WHERE APPLICABLE
NO KNOWN CRITICAL INVARIANT OR CONTROL FAILURE
EXIT-GATE EVIDENCE RECORDED
NEXT MILESTONE ENTRY CONDITIONS MET
\`\`\`

For M0 specifically, the exit gate also requires the declared repository/release controls, server-side dev/main enforcement, and reproducible toolchain/dependency baseline to be verified. Actions-only branch guards do not substitute for required server-side repository protection.

Code quantity, commit count, visual completeness, or a green subset of tests alone does not prove milestone completion.

---

# 203. Repository delivery and version-stream contract

Current long-lived branch model:

\`\`\`text
dev
  ↓ pull request
main
  ↓ controlled software release
vX.Y.Z
\`\`\`

Rules:

\`\`\`text
DEV = ACTIVE INTEGRATION BRANCH
MAIN = CONTROLLED RELEASE BRANCH
NO PERSISTENT FEATURE / RELEASE / HOTFIX BRANCHES UNDER CURRENT ARCHITECTURE
MAIN PROMOTION ORIGINATES FROM DEV
FORCE-PUSH / DELETION / DIRECT-MAIN WRITE PROTECTION IS REQUIRED SERVER-SIDE
ACTIONS POLICY IS DEFENSE-IN-DEPTH, NOT THE SOLE PROTECTION BOUNDARY
\`\`\`

Software release metadata SHOULD align:

\`\`\`text
VERSION
ROOT PACKAGE VERSION
CHANGELOG RELEASE HEADING
vX.Y.Z TAG
GITHUB RELEASE VERSION
\`\`\`

The first software release when no prior \`v*\` tag exists publishes the current declared baseline software version exactly once. Subsequent release intent may use Conventional Commit / PR-title semantics subject to the repository release policy.

Dependency/toolchain reproducibility, release provenance, protected release tags, and safe synchronization between released \`main\` and concurrently advancing \`dev\` are implementation controls, not optional documentation preferences.

---

# APPENDIX A — Historical and symbolic context`

blueprint = replaceExact(blueprint, old202, new202, 'sections 202-203')

readme = readme.replace('**Blueprint document baseline:** `DHGS v15.1.0`', '**Blueprint document baseline:** `DHGS v15.1.1`')

const requiredBlueprintMarkers = [
  '# DHGS v15.1.1',
  'M5 — DEPLOYMENT, GOVERNANCE-OF-SOFTWARE & CONTROLLED PILOT',
  '# 203. Repository delivery and version-stream contract',
  'GitHub issue #6',
  'Blueprint document version and software semantic version are independent version streams',
]

for (const marker of requiredBlueprintMarkers) {
  if (!blueprint.includes(marker)) throw new Error(`Blueprint marker missing after migration: ${marker}`)
}

if (blueprint.includes('M4 — ASSURANCE & PILOT')) {
  throw new Error('Stale Part XXIX milestone name remains: M4 — ASSURANCE & PILOT')
}

if (!readme.includes('M5 — DEPLOYMENT, GOVERNANCE-OF-SOFTWARE & CONTROLLED PILOT')) {
  throw new Error('README does not describe M5')
}

if (!readme.includes('Issue #77') || !readme.includes('not yet considered active/verified')) {
  throw new Error('README must preserve the explicit #77 server-side ruleset limitation')
}

writeFileSync(blueprintPath, blueprint)
writeFileSync(readmePath, readme)

console.log('Reconciled BLUEPRINT.md and README.md to Blueprint v15.1.1 / M0–M5 implementation governance.')
