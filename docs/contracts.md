# Canonical contracts

`@dhgs/contracts` is the shared machine-contract boundary for apps, addons, engines, audit, jobs, and later public projection. It is deliberately transport- and database-neutral.

## Canonical envelope

Events carry `schema_version`, `event_id`, `event_type`, `actor`, `timestamp`, optional `case_ref`, `source_module`, `payload_version`, JSON-safe `payload`, `request_id`, and `correlation_id`. Optional hash fields preserve the Blueprint event model without turning M0 into a full event-sourcing implementation.

`request_id` and `correlation_id` MUST equal the values inside the embedded `ActorContext`. The parser fails closed on drift.

## Versioning

- Contract schemas start at `1.0.0`.
- Additive optional fields are backward-compatible within the same schema version.
- Removing or changing the meaning/type of a required contract field requires a major schema version.
- Additive event payload fields may remain on the same payload version.
- Breaking event payload changes require a new `payload_version` and explicit registry support before they are accepted.
- Unknown schema or payload versions fail closed.
- Event-type renames are new event types; canonical names are never silently reinterpreted.

## Non-scope

This package is not an event bus, Kafka abstraction, event store, workflow engine, or authorization system. It defines interoperable data contracts only.
