CREATE SCHEMA IF NOT EXISTS dhgs_async;

CREATE TABLE IF NOT EXISTS dhgs_async.outbox_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  payload_version integer NOT NULL CHECK (payload_version > 0),
  aggregate_ref text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  request_id text NOT NULL,
  correlation_id text NOT NULL,
  available_at timestamptz NOT NULL,
  max_attempts integer NOT NULL CHECK (max_attempts > 0),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  status text NOT NULL CHECK (status IN ('PENDING','LEASED','RETRY_WAIT','PUBLISHED','FAILED','DEAD_LETTER')),
  lease_owner text,
  lease_expires_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
CREATE INDEX IF NOT EXISTS outbox_due_idx ON dhgs_async.outbox_events (status, available_at, created_at);

CREATE TABLE IF NOT EXISTS dhgs_async.jobs (
  job_id text PRIMARY KEY,
  job_type text NOT NULL,
  job_version integer NOT NULL CHECK (job_version > 0),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  resource_ref text,
  priority integer NOT NULL DEFAULT 0,
  available_at timestamptz NOT NULL,
  max_attempts integer NOT NULL CHECK (max_attempts > 0),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  status text NOT NULL CHECK (status IN ('READY','LEASED','RETRY_WAIT','SUCCEEDED','FAILED','DEAD_LETTER')),
  idempotency_key text NOT NULL UNIQUE,
  schedule_key text UNIQUE,
  sensitivity text NOT NULL CHECK (sensitivity IN ('P0','P1','P2','P3')),
  privileged boolean NOT NULL DEFAULT false,
  governance_effect text NOT NULL,
  source_actor jsonb NOT NULL,
  lease_owner text,
  lease_expires_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);
CREATE INDEX IF NOT EXISTS jobs_due_idx ON dhgs_async.jobs (status, available_at, priority DESC, created_at);

CREATE TABLE IF NOT EXISTS dhgs_async.idempotency_keys (
  idempotency_key text PRIMARY KEY,
  status text NOT NULL CHECK (status IN ('PROCESSING','COMPLETED')),
  owner text NOT NULL,
  lease_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
