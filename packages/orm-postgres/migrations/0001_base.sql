-- DHGS M0 explicit base migration.
-- This migration is intentionally non-destructive and refuses to adopt populated legacy tables silently.

CREATE SCHEMA IF NOT EXISTS dhgs;

CREATE OR REPLACE FUNCTION dhgs.is_privileged()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(NULLIF(current_setting('dhgs.privileged', true), '')::boolean, false)
$$;

CREATE OR REPLACE FUNCTION dhgs.current_jurisdiction_ids()
RETURNS text[]
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    ARRAY(
      SELECT jsonb_array_elements_text(
        COALESCE(NULLIF(current_setting('dhgs.jurisdiction_ids', true), '')::jsonb, '[]'::jsonb)
      )
    ),
    ARRAY[]::text[]
  )
$$;

CREATE OR REPLACE FUNCTION dhgs.current_institution_id()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('dhgs.institution_id', true), '')
$$;

DO $$
DECLARE
  table_name text;
  has_rows boolean;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'base_jurisdictions','base_institutions','base_parties','base_user_profiles','base_access_groups',
    'base_group_memberships','base_authority_mandates','base_delegations','base_sequences','base_attachments',
    'base_tags','base_tag_links','base_activities','base_notifications','base_translations','base_external_ids',
    'base_audit_references'
  ]
  LOOP
    IF to_regclass('public.' || table_name) IS NOT NULL THEN
      EXECUTE format('SELECT EXISTS (SELECT 1 FROM public.%I LIMIT 1)', table_name) INTO has_rows;
      IF has_rows THEN
        RAISE EXCEPTION 'DHGS_MIGRATION_REQUIRES_MANUAL_BACKFILL: populated unmanaged table %', table_name;
      END IF;
    END IF;
  END LOOP;
END $$;

CREATE TABLE IF NOT EXISTS base_jurisdictions (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  code text NOT NULL UNIQUE, name text NOT NULL, timezone text NOT NULL, business_calendar text,
  status text NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','SANDBOX'))
);

CREATE TABLE IF NOT EXISTS base_institutions (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  code text NOT NULL UNIQUE, name text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('GOVERNANCE','OVERSIGHT','OPERATOR','AUDIT','OTHER')),
  parent_institution_id text REFERENCES base_institutions(id),
  status text NOT NULL CHECK (status IN ('ACTIVE','INACTIVE','SANDBOX'))
);

CREATE TABLE IF NOT EXISTS base_parties (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  party_type text NOT NULL CHECK (party_type IN ('PERSON','ORGANIZATION','UNKNOWN')),
  display_name text NOT NULL, reference_code text
);

CREATE TABLE IF NOT EXISTS base_user_profiles (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  actor_id text NOT NULL UNIQUE, party_id text REFERENCES base_parties(id), locale text NOT NULL DEFAULT 'id-ID',
  timezone text, status text NOT NULL CHECK (status IN ('ACTIVE','SUSPENDED','DISABLED'))
);

CREATE TABLE IF NOT EXISTS base_access_groups (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  code text NOT NULL UNIQUE, name text NOT NULL, description text
);

CREATE TABLE IF NOT EXISTS base_group_memberships (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  group_id text NOT NULL REFERENCES base_access_groups(id), actor_id text NOT NULL,
  starts_at timestamptz NOT NULL, expires_at timestamptz, active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS base_authority_mandates (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  holder_type text NOT NULL CHECK (holder_type IN ('PARTY','INSTITUTION','ROLE')),
  holder_reference text NOT NULL, authority_type text NOT NULL, source_of_law text NOT NULL,
  source_version text NOT NULL, permitted_actions jsonb NOT NULL, prohibited_actions jsonb NOT NULL,
  delegable boolean NOT NULL, valid_from timestamptz NOT NULL, valid_until timestamptz,
  review_status text NOT NULL CHECK (review_status IN ('DRAFT','ACTIVE','SUSPENDED','EXPIRED','REVOKED')),
  supersedes_id text REFERENCES base_authority_mandates(id)
);

CREATE TABLE IF NOT EXISTS base_delegations (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  mandate_id text NOT NULL REFERENCES base_authority_mandates(id), delegator_id text NOT NULL,
  delegate_id text NOT NULL, permissions jsonb NOT NULL, purpose text NOT NULL,
  starts_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, revocable boolean NOT NULL DEFAULT true,
  status text NOT NULL CHECK (status IN ('ACTIVE','REVOKED','EXPIRED'))
);

CREATE TABLE IF NOT EXISTS base_sequences (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  code text NOT NULL UNIQUE, prefix text, next_number integer NOT NULL DEFAULT 1, padding integer NOT NULL DEFAULT 6
);

CREATE TABLE IF NOT EXISTS base_attachments (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  storage_key text NOT NULL, filename text NOT NULL, mime_type text NOT NULL, size_bytes bigint NOT NULL,
  sha256 text NOT NULL, classification text NOT NULL CHECK (classification IN ('P0','P1','P2','P3')),
  uploaded_by text NOT NULL,
  antivirus_status text NOT NULL CHECK (antivirus_status IN ('PENDING','CLEAR','QUARANTINED','REJECTED'))
);

CREATE TABLE IF NOT EXISTS base_tags (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  code text NOT NULL UNIQUE, name text NOT NULL, description text
);

CREATE TABLE IF NOT EXISTS base_tag_links (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  tag_id text NOT NULL REFERENCES base_tags(id), target_model text NOT NULL, target_id text NOT NULL
);

CREATE TABLE IF NOT EXISTS base_activities (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  activity_type text NOT NULL, summary text NOT NULL, target_model text NOT NULL, target_id text NOT NULL,
  owner_actor_id text, due_at timestamptz, status text NOT NULL CHECK (status IN ('OPEN','DONE','CANCELLED'))
);

CREATE TABLE IF NOT EXISTS base_notifications (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  notification_type text NOT NULL, recipient_actor_id text NOT NULL, title text NOT NULL, body text NOT NULL,
  canonical_url text, status text NOT NULL CHECK (status IN ('QUEUED','SENT','DELIVERED','FAILED','READ'))
);

CREATE TABLE IF NOT EXISTS base_translations (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  source_content_id text NOT NULL, source_version text NOT NULL, locale text NOT NULL,
  translated_version text NOT NULL, text text NOT NULL, reviewer_actor_id text,
  status text NOT NULL CHECK (status IN ('DRAFT','REVIEWED','APPROVED','SUPERSEDED'))
);

CREATE TABLE IF NOT EXISTS base_external_ids (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  namespace text NOT NULL, external_id text NOT NULL, model text NOT NULL, record_id text NOT NULL,
  UNIQUE (namespace, external_id)
);

CREATE TABLE IF NOT EXISTS base_audit_references (
  id text PRIMARY KEY, created_at timestamptz NOT NULL, updated_at timestamptz NOT NULL,
  created_by text NOT NULL, updated_by text NOT NULL, version integer NOT NULL CHECK (version > 0),
  archived_at timestamptz, jurisdiction_id text, institution_id text,
  audit_event_id text NOT NULL, model text NOT NULL, record_id text NOT NULL, reference_type text NOT NULL,
  details jsonb
);

CREATE INDEX IF NOT EXISTS base_institutions_jurisdiction_idx ON base_institutions(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_parties_jurisdiction_idx ON base_parties(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_user_profiles_jurisdiction_idx ON base_user_profiles(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_group_memberships_jurisdiction_idx ON base_group_memberships(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_authority_mandates_jurisdiction_idx ON base_authority_mandates(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_delegations_jurisdiction_idx ON base_delegations(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_attachments_jurisdiction_idx ON base_attachments(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_tag_links_jurisdiction_idx ON base_tag_links(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_activities_jurisdiction_idx ON base_activities(jurisdiction_id);
CREATE INDEX IF NOT EXISTS base_notifications_jurisdiction_idx ON base_notifications(jurisdiction_id);

DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'base_institutions','base_parties','base_user_profiles','base_group_memberships','base_authority_mandates',
    'base_delegations','base_attachments','base_tag_links','base_activities','base_notifications'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('ALTER TABLE public.%I FORCE ROW LEVEL SECURITY', table_name);
    EXECUTE format('DROP POLICY IF EXISTS dhgs_scope_select ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS dhgs_scope_insert ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS dhgs_scope_update ON public.%I', table_name);
    EXECUTE format(
      'CREATE POLICY dhgs_scope_select ON public.%I FOR SELECT USING (dhgs.is_privileged() OR (jurisdiction_id IS NOT NULL AND jurisdiction_id = ANY(dhgs.current_jurisdiction_ids())))',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY dhgs_scope_insert ON public.%I FOR INSERT WITH CHECK (dhgs.is_privileged() OR (jurisdiction_id IS NOT NULL AND jurisdiction_id = ANY(dhgs.current_jurisdiction_ids())))',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY dhgs_scope_update ON public.%I FOR UPDATE USING (dhgs.is_privileged() OR (jurisdiction_id IS NOT NULL AND jurisdiction_id = ANY(dhgs.current_jurisdiction_ids()))) WITH CHECK (dhgs.is_privileged() OR (jurisdiction_id IS NOT NULL AND jurisdiction_id = ANY(dhgs.current_jurisdiction_ids())))',
      table_name
    );
  END LOOP;
END $$;
