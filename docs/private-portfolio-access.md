# Private portfolio: experience and security architecture

**Implementation status:** Planning only. The /private-work page is a public informational entrypoint; it does not implement password protection or authentication.

## Product behavior

- Keep public Field Notes useful without signing in. Public pages may link to a generic private-work teaser and contact flow.
- For approved, sanitized case studies, support individual invitations and per-document grants; do not use a shared password.
- A reviewer requests access, the site owner approves a particular email and artifact, and the reviewer receives a time-limited login challenge.
- Only approved and authenticated reviewers can fetch content, its thumbnails, documents or downloads. Offer expiration and revocation.
- Never display sensitive document titles, filenames or metadata before authorization. No sensitive materials in public URLs, bundles or page source.

## Proposed stack

- **Better Auth** handles sign-in, verified email identity, and sessions.
- **Resend** handles the approved transactional invitation/sign-in email. Rate-limit sends and avoid disclosing whether an address has an account.
- **Neon Postgres** stores the identity and session schema plus artifact and grant records.
- **Server-side authorization** checks session and active per-artifact grant for every read, export, thumbnail or asset request. Protect route handlers and storage reads; client-only guards or middleware alone are insufficient.
- **Private object storage** holds separately reviewed materials, not /public or source control. Use short-lived signed fetches only after server-side authorization, and set private/no-store cache headers on protected responses.

## Suggested data entities

- Artifact: opaque ID, shareable/public-safe teaser ID, owner, sensitivity, storage key, approval state, revision, retention.
- Reviewer grant: reviewer ID, artifact ID, approved-by, granted-at, expires-at, revoked-at.
- Access event: reviewer ID, artifact ID, action and timestamp, with minimal retention; do not track detailed reading behavior without purpose and notice.

## Threat model and tests before activation

1. Anonymous direct URL and API reads denied.
2. Authenticated reviewer without a grant denied.
3. Expired and revoked grants denied, including signed assets.
4. Email challenges short-lived and single-use. Reject replay, enumeration, open redirects and abuse.
5. Secure session cookie settings, CSRF/origin checks, verified host and HTTPS. Require MFA for admin access.
6. No confidentiality assumption based solely on password protection: viewers can still take screenshots or share what they see.
7. Never upload customer/employer-restricted materials without rights to disclose; redact before storage.
8. Noindex on teaser is not authorization. Protected routes excluded from sitemap and public caching.
9. Run authorization matrix tests and manual browser review before launch. Include mobile, keyboard and error states.
10. Admin approval, audit access and revocation must be tested with separate accounts.

## Rollout

Phase 1: public-safe teaser and this architecture, with no private data. This is the current implementation.

Phase 2: integrate Better Auth, Neon and Resend with proper migrations and server-side grant checks, ideally in a separate dedicated PR after this visual refresh.

Phase 3: add one rights-cleared sanitized real deal case study and test approvals, delivery, access, expiration and revocation.

Phase 4: consider optional cross-repo server adapters only with narrowly-scoped tokens, provenance, validation, and explicit human review before any CRM writes.

## Design continuity

Keep the joy. warm ivory/copper/charcoal palette, editorial headings, and simple evidence labels across public pages and the future authenticated area. The private experience should be calm and practical, not an artificial vault or a marketing funnel.
