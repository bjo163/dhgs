# DHGS Dependency & Toolchain Management

This document is the operational contract for issue #95.

## Canonical toolchain

- Node: `22.23.3` (`.node-version`; package engine range `22.23.x`)
- pnpm: `10.18.0` (`packageManager` and package engine)
- dependency graph: committed `pnpm-lock.yaml`

Normal controlled installs MUST use:

```bash
pnpm install --frozen-lockfile
```

## Updating dependencies

Dependency changes are made on the long-lived `dev` integration branch under an implementation/security issue. The change MUST update the relevant package manifest and `pnpm-lock.yaml` together, then pass CI/security checks before promotion through the normal `dev → main` pull request.

The current architecture does not require persistent dependency/feature/release branches. Automated security jobs MAY report work, but MUST NOT silently mutate dependencies.

## Lockfile update procedure

1. Confirm Node/pnpm with `pnpm toolchain:check`.
2. Edit the intended dependency declaration on `dev` under an issue.
3. Run `pnpm install` intentionally to update `pnpm-lock.yaml`.
4. Review manifest + lockfile diff together.
5. Run `pnpm check` and security audit.
6. Commit both manifest and lockfile with the issue reference.

CI MUST reject normal controlled runs when manifests and lockfile disagree.

## Release provenance

`pnpm release:provenance` reports the software version, Node version, pnpm version and SHA-256 of the committed lockfile. This is a compact input to later SBOM/provenance work (#49).
