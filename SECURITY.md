# DHGS Security Policy

## Reporting a vulnerability

Do **not** publish exploit steps, secrets, authentication tokens, protected case data, personal data, or evidence material in a public GitHub issue.

Preferred reporting path:

1. Open the repository **Security** area on GitHub.
2. Use **Report a vulnerability / Private vulnerability reporting** when that feature is enabled.
3. Include the affected software version or commit, affected component, impact, reproduction conditions, and the minimum evidence needed to understand the problem.
4. Redact or synthesize protected data. Do not upload real case evidence merely to demonstrate a security bug.

If private vulnerability reporting is not available, contact the repository owner through an available private GitHub/account channel and request a private disclosure path before sending exploit details. A public issue may state only that a security concern exists and request private coordination; it must not contain sensitive exploitation detail.

## Security-sensitive areas

Issues involving any of the following should be treated as security-sensitive until triaged:

- authentication or identity-assurance bypass;
- authorization / RLS bypass;
- cross-jurisdiction or cross-case data access;
- protected P2/P3 information exposure;
- evidence or file access leakage;
- decision / Mizan / appeal authorization bypass;
- Hisab Ledger or Audit Log mutation/deletion;
- privileged-admin or service-role misuse;
- secret/token exposure;
- release, workflow, dependency, or supply-chain compromise;
- public-projection / redaction bypass;
- break-glass or emergency-power bypass;
- cryptographic integrity/signing failure where enabled.

## Supported versions

Until the first controlled software release, only the current `dev` integration state and latest `main` release candidate are actively maintained.

After automated releases are active, supported versions should be stated by GitHub Release/tag and updated through the release process. Security fixes should normally target `dev`, pass the required gates, and be promoted through `dev → main`; the project does not use a persistent hotfix branch.

## Disclosure and remediation principles

- Protect affected people before publishing technical detail.
- Preserve audit/ledger evidence needed to understand the incident.
- Do not silently alter historical governance records to hide a security failure.
- Record material incidents through the DHGS incident/correction process when implemented.
- A security fix that changes governance semantics, rules, schemas, or authority boundaries requires the corresponding Blueprint/ADR/change-governance review.
