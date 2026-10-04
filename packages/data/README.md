# @dhgs/data — DEPRECATED PROTOTYPE

> **Status:** deprecated M0 spike. Do not add new dependencies on this package.

The stable model/repository contract is being promoted to [`@dhgs/orm`](../orm/README.md) under GitHub issue #1.

This package is retained temporarily so the original spike and its tests remain inspectable while migration is verified. It may be removed after downstream search confirms no production/domain dependency remains and the M0 migration evidence is recorded.

Historical ideas preserved by `@dhgs/orm` include jurisdiction/institution scoping, optimistic version checks, archive-not-delete behavior, model registry semantics, and decoupled Audit/Hisab mutation hooks.

PostgreSQL RLS remains authoritative; neither this deprecated spike nor `@dhgs/orm` creates governance authority.
