# @dhgs/orm-base

`@dhgs/orm-base` is the first reusable DHGS addon. Its manifest name is `base` and it contains only cross-domain platform records and safe administrative metadata.

It intentionally does **not** contain Case, Evidence, Mizan, Decision, Hisab, Open Book, statutory-law datasets, or high-stakes workflow authorization.

## Model boundary

```text
Jurisdiction / Institution / Party / User Profile
Access Group / Membership
Authority Mandate / Delegation
Sequence / Attachment
Tag / Tag Link
Activity / Notification
Translation / External ID / Audit Reference
```

Sensitive/significant records such as authority mandates, delegations, parties, profiles, attachments, notifications, and audit references are not exposed as mutable generic CRUD screens. `base.tag` is the initial example of low-risk generated administration.

Seed data is sandbox/reference-only and uses stable external IDs. No seed record grants statutory authority.
