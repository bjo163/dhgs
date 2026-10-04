# @dhgs/data — DHGS Mini ORM / Model Layer

`@dhgs/data` is a deliberately small data-model and repository layer inspired by the ergonomic model registry found in systems such as Odoo, but designed for DHGS governance constraints.

It is **not** a database engine and does not replace PostgreSQL/Supabase. It sits above a database adapter and gives DHGS one consistent model API.

## Why it exists

DHGS records are not ordinary CRUD objects. A write may need jurisdiction scoping, actor/purpose context, optimistic version checks, audit events, Hisab Ledger hooks, and archive-not-delete behavior. Keeping those rules in one data layer reduces accidental bypasses.

## v0.1 capabilities

- typed model definitions and registry;
- scoped repositories;
- actor / purpose / request context on every operation;
- jurisdiction and institution scope guards;
- optimistic versioning;
- immutable-field protection;
- archive instead of hard delete;
- mutation events for Audit and Hisab Ledger integration;
- in-memory adapter for deterministic tests;
- adapter contract for PostgreSQL/Supabase.

## Deliberate non-goals

- no SQL parser;
- no migrations engine;
- no hidden lazy loading;
- no automatic cross-jurisdiction access;
- no hard-delete API;
- no bypass of PostgreSQL RLS;
- no automatic governance decision from data models.

## Example

```ts
const cases = session.model<CaseRecord>('case');

const created = await cases.create({
  caseNumber: 'DHGS-2026-000001',
  title: 'Example case',
  jurisdictionId: 'JKT-01'
});

const updated = await cases.update(
  created.id,
  { title: 'Updated title' },
  { expectedVersion: created.version }
);
```

Every mutation can emit an audit event and, for models configured as `ledger: 'required'`, a Hisab Ledger event. Database-level RLS remains authoritative.
