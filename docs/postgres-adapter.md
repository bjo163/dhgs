# PostgreSQL / Supabase ORM adapter

`@dhgs/orm-postgres` is the PostgreSQL protocol adapter for the DHGS ORM contract. It is compatible with a Supabase PostgreSQL connection string but deliberately does not require the Supabase service-role API or make the ORM the authorization authority.

## Enforcement model

1. The ORM applies jurisdiction/institution scope before database access where possible.
2. The adapter starts a short transaction for each standalone operation, checks out one pooled connection, and writes request context with transaction-local `set_config(..., true)` values.
3. PostgreSQL Row Level Security independently checks the row against that context.
4. A normal request connection must use a `NOSUPERUSER NOBYPASSRLS` database role.
5. Service-role / owner credentials are reserved for controlled migration, break-glass, or administrative operations and must never be used in normal request flow.

The adapter does not grant authority. `privileged: true` is only meaningful if the database role itself is legitimately authorized and the caller has already passed application governance checks. Production deployments should separate migration/admin credentials from request credentials.

## Migrations

Migrations are explicit checked-in SQL under `packages/orm-postgres/migrations/`. Runtime ORM operations never auto-create, auto-alter, or destructively synchronize schema.

`applyMigrations(pool)` records immutable migration IDs and SHA-256 checksums in `dhgs.schema_migrations`. A checksum mismatch is a hard failure.

The initial base migration refuses to silently adopt any populated unmanaged DHGS base table. If such a table exists, migration stops with `DHGS_MIGRATION_REQUIRES_MANUAL_BACKFILL`. Operators must create and review an explicit backfill migration instead of letting runtime code guess.

## Rollback / recovery

Schema rollback is not automatic. For a failed migration transaction PostgreSQL rolls back the current migration atomically. After a migration has been committed, recovery must use a reviewed forward repair migration or a separately reviewed restore procedure. Never edit a migration already recorded in `dhgs.schema_migrations`; the checksum guard intentionally rejects that practice.

Before production promotion: snapshot/backup, run migrations in staging against representative data, validate RLS with a non-bypass role, review the forward repair plan, and record the migration evidence in the release/change record.

## RLS context

Transaction-local settings include actor, request, purpose, jurisdictions, institution, assurance level, roles, permissions, correlation ID, transaction ID, privileged flag, and application name. The initial base policies enforce jurisdiction scope for jurisdiction-scoped base models. Institution-specific policies can be added explicitly when an `institutionScoped` model is introduced.
