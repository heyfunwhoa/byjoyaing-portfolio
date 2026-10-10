-- DRAFT DATA MODEL ONLY. DO NOT RUN IN PRODUCTION.
-- This is intentionally not an executable migration wired into deploy.
-- Better Auth owns its user/session/account/verification tables via its own migrations.
-- All access checks must be enforced by server-side application logic, with DB controls
-- and least-privilege database roles as additional defenses.

CREATE TABLE IF NOT EXISTS portfolio_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_email text NOT NULL,
  applicant_name text NOT NULL,
  applicant_company text,
  purpose text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','approved','denied','withdrawn')),
  email_verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by text,
  CONSTRAINT applicant_name_length CHECK (char_length(applicant_name) BETWEEN 2 AND 120),
  CONSTRAINT applicant_email_length CHECK (char_length(applicant_email) BETWEEN 3 AND 254),
  CONSTRAINT applicant_company_length CHECK (applicant_company IS NULL OR char_length(applicant_company) <= 160),
  CONSTRAINT applicant_purpose_length CHECK (purpose IS NULL OR char_length(purpose) <= 500)
);
CREATE INDEX IF NOT EXISTS portfolio_access_requests_status_created
  ON portfolio_access_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS portfolio_access_requests_email_lower
  ON portfolio_access_requests(lower(applicant_email));

CREATE TABLE IF NOT EXISTS portfolio_restricted_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_key text UNIQUE NOT NULL,
  label text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT resource_key_length CHECK (char_length(resource_key) BETWEEN 1 AND 120)
);

CREATE TABLE IF NOT EXISTS portfolio_resource_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES portfolio_access_requests(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES portfolio_restricted_resources(id) ON DELETE CASCADE,
  approved_by text NOT NULL,
  approved_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  UNIQUE (request_id, resource_id),
  CONSTRAINT grant_positive_expiry CHECK (expires_at > approved_at)
);
CREATE INDEX IF NOT EXISTS portfolio_resource_grants_resource_request
  ON portfolio_resource_grants(resource_id, request_id);

CREATE TABLE IF NOT EXISTS portfolio_access_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES portfolio_access_requests(id) ON DELETE SET NULL,
  resource_id uuid REFERENCES portfolio_restricted_resources(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK (event_type IN (
    'requested','verified','approved','denied','signed_in','resource_accessed','revoked','deleted'
  )),
  actor_kind text NOT NULL CHECK (actor_kind IN ('visitor','admin','system')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS portfolio_access_events_created ON portfolio_access_events(created_at DESC);

-- Before executing a reviewed migration:
-- 1. Decide whether applicant_email is the auth identity or map to a stable Better Auth user ID;
--    do NOT authorize by an unverified email field.
-- 2. Implement approval transaction and race-safe grant issuance.
-- 3. Introduce retention jobs and restrict admin/DB SELECT permissions.
-- 4. Validate that no unapproved or unverified request ever gets a usable grant.
