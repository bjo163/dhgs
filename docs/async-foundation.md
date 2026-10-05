# Asynchronous-work foundation

DHGS M0 uses PostgreSQL-backed jobs, transactional outbox records, durable idempotency keys, and one explicit handler registry. Delivery is **at least once**; DHGS does not claim exactly-once delivery.

`@dhgs/async` owns portable contracts and safety policy. `@dhgs/async-postgres` owns durable PostgreSQL storage, `FOR UPDATE SKIP LOCKED` claims, lease recovery, retry/dead-letter state, UTC schedule keys, metrics, and the transaction coordinator that commits domain state and required outbox records together.

Protected P2/P3 jobs carry a resource reference and empty payload. Workers reconstruct a restricted `SYSTEM:<job_type>` ActorContext, preserve request/correlation IDs, and never inherit initiating-user roles/permissions. Background work cannot finalize high-impact governance decisions; privileged handlers require an explicit authorization gate.

Scheduler callers MUST use deterministic UTC schedule keys. Repeated invocation is idempotent through a unique schedule key. Job handlers are executable only when registered in code; database content cannot name arbitrary executable code.
