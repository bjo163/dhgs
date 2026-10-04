# DHGS Low-Fidelity Wireframe Contracts

These are structure-first wireframes. They deliberately avoid final visual polish.

## PUB-001 — Public Home

```text
┌─────────────────────────────────────────────────────┐
│ DHGS                         Open Book  Submit  Help │
├─────────────────────────────────────────────────────┤
│ GOVERNANCE THAT CAN EXPLAIN AND CORRECT ITSELF      │
│ Plain-language explanation                          │
│ [Search Open Book] [Submit / Track a Case]          │
├─────────────────────────────────────────────────────┤
│ What happened recently?                             │
│ Decision / correction cards                         │
├─────────────────────────────────────────────────────┤
│ How DHGS works                                      │
│ Authority → Evidence → Mizan → Decision → Review    │
└─────────────────────────────────────────────────────┘
```

## PUB-020 — Public Decision

```text
┌─────────────────────────────────────────────────────┐
│ DECISION ID · STATUS · LAST UPDATED                 │
├─────────────────────────────────────────────────────┤
│ What happened?                                      │
│ Why was this decision made?                         │
│ What does this mean for you?                        │
├─────────────────────────────────────────────────────┤
│ Authority / law   Evidence basis   Responsible body │
├─────────────────────────────────────────────────────┤
│ What could not be published and why?                │
│ What changed?                                       │
│ [View correction history]                           │
├─────────────────────────────────────────────────────┤
│ Appeal / challenge information                      │
└─────────────────────────────────────────────────────┘
```

## CIT-010 — Submit Case

```text
STEP 1 Your situation
STEP 2 People / institution involved
STEP 3 Evidence
STEP 4 Safety / privacy
STEP 5 Review and submit

[Save draft]                              [Continue]
```

Requirements: autosave where safe, no loss after validation error, clear privacy notice, accessible error summary, visible submission receipt.

## MZN-001 — Independent Review

```text
CASE CONTEXT                   EVIDENCE / RIGHTS STATUS
------------------------------------------------------
M1 Truth               [assessment + reason]
M2 Legality context    [context only]
M3 Intent              [assessment + reason]
M4 Impact              [assessment + reason]
M5 Proportionality     [assessment + reason]
M6 Mercy / Correction  [assessment + reason]
M7 Accountability      [assessment + reason]

Peer scores: HIDDEN until own review is submitted.
[Save draft] [Submit and lock independent review]
```

## OPS-040 — High-Stakes Decision

```text
Decision summary
Legal basis              PASS / REVIEW / FAIL
Rights review            COMPLETE / HOLD
Conflict check           CLEAR / HOLD
Evidence                 status + uncertainty
Mizan                     readiness only
Quorum                    x/y
Affected rights           summary
Reversible?               yes/no
Remaining uncertainty     explicit

Reason for decision [required]
[Return for work] [Authorize with attestation]
```

No irreversible high-impact action may be a one-click generic approval.

## ADM-010 — Redaction Preview

```text
INTERNAL RECORD              PUBLIC PROJECTION
-------------------          ----------------------
protected details            [redacted / summarized]
legal basis                  legal basis
internal evidence IDs        public evidence basis

Warnings: protected-data scanner + human review
[Back] [Approve public projection]
```
