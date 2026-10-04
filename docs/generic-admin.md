# Metadata-driven generic admin

DHGS provides a narrow generated-administration surface for low-risk technical/reference models. It is not a no-code governance engine and it is never an authorization authority.

## Safety boundary

Every model declares a generated-UI policy:

- `allowed` — generic views may render and only explicitly enabled create/write/archive operations may be attempted.
- `read_only` — metadata may render, but generic mutations are rejected server-side.
- `prohibited` — the model cannot be opened by the generic admin resolver. High-stakes workflows require a purpose-built interface.

Missing policy fails closed as prohibited.

Sensitive, hidden, write-only, or `public: false` fields cannot be exposed by generic view metadata. A view that references one is treated as a configuration error rather than silently leaking it.

## Backend authorization

`executeGeneratedAdminMutation` resolves policy on the server, validates fields against the form metadata, and then **requires an explicit backend authorizer callback** before calling the repository. Menu presence, button presence, or generated-UI policy never substitutes for authorization, RLS, or governance checks.

Immutable fields may be provided at creation time but cannot be modified later through generic write operations. Base record/system fields are read-only in generated admin.

## Operations Web

`/admin` lists only base-model menu entries that successfully resolve under generated-UI policy. `/admin/[model]` renders list/form/search metadata using semantic HTML and native keyboard-accessible controls. Prohibited models return the application not-found boundary instead of a generic editor.

The current M0 screen uses safe sandbox/reference seed rows for visual verification. Live mutations remain fail-closed until an authenticated backend authorizer is connected; the tested mutation service is the required backend path.
