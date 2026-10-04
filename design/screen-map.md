# DHGS Screen Map

| ID | Surface | Purpose | Primary actor |
|---|---|---|---|
| PUB-001 | Public | Home and orientation | Public |
| PUB-010 | Public | Search Open Book | Public / media |
| PUB-020 | Public | Understand a public decision | Public |
| PUB-030 | Public | Compare correction history | Public |
| PUB-040 | Public | Public KPI and data | Public / researcher |
| CIT-001 | Portal | Citizen dashboard | Citizen |
| CIT-010 | Portal | Submit case | Citizen |
| CIT-020 | Portal | Track case | Citizen / representative |
| CIT-030 | Portal | Upload evidence | Authorized participant |
| CIT-040 | Portal | Appeal / correction request | Eligible party |
| CIT-050 | Portal | Notifications | Authenticated user |
| OPS-001 | Ops | Work dashboard | Reviewer |
| OPS-010 | Ops | Case workspace | Reviewer |
| OPS-020 | Ops | Task workspace | Reviewer |
| OPS-030 | Ops | Evidence workspace | Reviewer |
| OPS-040 | Ops | Decision preparation | Decision owner |
| MZN-001 | Ops | Independent Mizan review | Mizan reviewer |
| MZN-010 | Ops | Reviewer comparison | Authorized quorum |
| MZN-020 | Ops | Mizan summary | Reviewer / decision owner |
| AUD-001 | Ops | Audit dashboard | Auditor |
| AUD-010 | Ops | Chronological audit timeline | Auditor |
| AUD-020 | Ops | Decision Context Snapshot | Auditor |
| SHD-001 | Ops | Systemic oversight | Shadow |
| SHD-010 | Ops | Repeat/systemic risk | Shadow |
| KNO-001 | Ops/Public | Knowledge search | Authorized/public by scope |
| KNO-010 | Ops/Public | Knowledge provenance | Authorized/public by scope |
| ADM-001 | Ops | Publication review | Publisher |
| ADM-010 | Ops | Redaction preview | Publisher / privacy reviewer |

Every implementation should map each screen to a `ScreenContract`, linked requirements, permissions, audit events, and tests.
