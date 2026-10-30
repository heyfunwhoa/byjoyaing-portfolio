-- Apply only after reviewing/applying Better Auth's generated development schema.
-- Auth is configured for UUID IDs. No production migration is performed by the app.
BEGIN;
CREATE TABLE academy_learning (
  user_id uuid NOT NULL REFERENCES academy_user(id) ON DELETE CASCADE,
  slug text NOT NULL CHECK (length(slug) BETWEEN 1 AND 160),
  saved boolean NOT NULL DEFAULT false,
  reviewed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, slug)
);
CREATE TABLE academy_learner (
  user_id uuid PRIMARY KEY REFERENCES academy_user(id) ON DELETE CASCADE,
  last_lesson text NOT NULL CHECK (length(last_lesson) BETWEEN 1 AND 160)
);
CREATE TABLE academy_throttle (
  key text PRIMARY KEY,
  attempts integer NOT NULL,
  expires_at timestamptz NOT NULL
);
CREATE INDEX academy_throttle_expiry_idx ON academy_throttle(expires_at);
COMMIT;
