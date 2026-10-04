# @dhgs/orm

`@dhgs/orm` is the small, governance-aware model/repository kernel for DHGS.

It is not a database engine and it does not create legal authority. PostgreSQL/RLS remains an independent enforcement boundary. The kernel provides one deterministic contract for model metadata, scoped queries, request context, optimistic versioning, archive-first records, and audit/Hisab mutation hooks.

## Core rules

- stable dot-notation model names;
- no unrestricted hard-delete API;
- material mutations require actor + purpose + request context;
- jurisdiction/institution scope is enforced before adapter calls;
- sensitive fields are not queryable without explicit permission;
- immutable fields cannot be changed through generic writes;
- optimistic version conflicts fail closed;
- audit/ledger sinks are interfaces, not concrete infrastructure dependencies;
- generic data access cannot authorize high-impact governance actions.

## Example

```ts
const Case = defineModel<CaseRecord>('case.case', {
  table: 'cases',
  fields: {
    title: fields.string({ required: true })
  },
  governance: {
    jurisdictionScoped: true,
    audit: 'required',
    ledger: 'required',
    archiveOnly: true
  }
})

const registry = new ModelRegistry().register(Case)
const env = createEnvironment({ adapter, registry, context, runtime })
const Cases = env.model<CaseRecord>('case.case')

const created = await Cases.create({
  title: 'Example',
  jurisdictionId: 'J-1'
})

await Cases.write(created.id, { title: 'Corrected' }, {
  expectedVersion: created.version
})
```

The initial in-memory adapter exists for deterministic tests only. PostgreSQL/Supabase integration belongs to the separate M0 adapter/RLS issue.
