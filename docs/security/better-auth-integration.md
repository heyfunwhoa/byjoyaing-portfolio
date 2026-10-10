# Authentication implementation decision — Better Auth

**Decision:** Use self-hosted Better Auth + PostgreSQL (Neon) + Resend for portfolio magic-link authentication. **Status:** approved architecture, implementation pending. No access-request workflow is live.

## Why this combination?

The portfolio is a Next.js/React/TypeScript application with existing Resend integration. Better Auth supplies identity verification, sessions, and short-lived magic links. Neon provides durable identity, approvals and resource grants. Resend sends transactional emails only. The application owns authorization. Avoid building cryptography or sessions from scratch.

Use official references:
- https://www.better-auth.com/docs/installation
- https://www.better-auth.com/docs/integrations/next
- https://www.better-auth.com/docs/plugins/magic-link
- https://www.better-auth.com/docs/adapters/postgresql
- https://www.better-auth.com/docs/concepts/rate-limit

## Prerequisites / stop conditions

1. Choose **which connected Neon account** and create a dedicated **development database/project**, not a clone of a secrets/atlas app database and not production. Never paste database URLs into source or chat.
2. Install a **pinned compatible** `better-auth` and `pg` and `@types/pg` using npm; commit **both package.json and package-lock.json** together, and run `npm ci` in clean checkout. Do not edit package.json alone: CI uses `npm ci`.
3. Generate `BETTER_AUTH_SECRET` securely (at least 32 bytes), and use exact allowlisted `BETTER_AUTH_URL` for local/dev. Store Resend key and Neon URL only in server-side environment; production uses separate credentials.
4. Generate Better Auth tables via its CLI **against dev only** and review the SQL. The draft `selected-work-schema.sql` is *not* an Auth schema; do not run it blindly.
5. Only enable authentication route after CI, migrations, rate-limit storage, Resend sender and email flows are verified. Until then all protected paths are denied.

## Implementation tasks (in next PR once dev DB is chosen)

- `lib/auth.ts`: `betterAuth({ database: new Pool({connectionString: process.env.AUTH_DATABASE_URL}), plugins: [magicLink({ expiresIn: 300, storeToken: "hashed", disableSignUp: true, sendMagicLink: async ({email,url}) => { /* Resend transactional message */ }})], ...})`.
- Use a dedicated initial **invitation/provisioning flow** to create approved viewer accounts. `disableSignUp: true` alone means new requesters cannot authenticate, so keep *request* and *login* as separate flows. Never create users from an untrusted public request automatically; the admin first approves/provisions the identity via trusted server logic, then invites them.
- `app/api/auth/[...all]/route.ts`: use official Better Auth Next.js handler. Ensure no insecure global redirect overrides.
- Short-lived magic links; callback protection against email security crawlers/pre-fetch (an explicit confirmation step or OTP). Ensure links have no trackers and never emit tokens to analytics/logs.
- Store rate limits persistently across serverless instances. Better Auth defaults alone are not sufficient until multi-instance storage is configured and confirmed.
- `lib/auth-client.ts`: browser client + magic-link plugin, with one fixed callback URL. Never grant content merely because `getSession()` is truthy.
- `app/selected-work/request`: public request form, no auto-approval; consistent response for unknown/known users. Independent bot, IP/email rate limits.
- Protected route handlers: invoke trusted server auth/session, then `canAccessSelectedWork` with grants fetched on server from DB; protect RSC/JSON/downloads and send `Cache-Control: private, no-store`.
- `/admin/portfolio-access`: verified admin, phishing-resistant MFA, server-side RBAC and audit trail. Avoid authorizing admin solely by comparing a user-submitted email or untrusted metadata.
- Create a private storage location for approved documents, never `public/` or the public repo.

## Server-side settings

| Secret or configuration | Environment | Purpose |
| --- | --- | --- |
| `AUTH_DATABASE_URL` | server, dev-only to begin | Dedicated Neon connection URL |
| `BETTER_AUTH_SECRET` | server | Signing/encryption secret; separately generated per environment |
| `BETTER_AUTH_URL` | server | Trusted canonical site URL, never user-controlled |
| `RESEND_API_KEY` | server | Resend transactional sending |
| `RESEND_FROM` | server | Verified sender on controlled domain |
| `PORTFOLIO_ACCESS_ENABLED` | server | Must stay false until system end-to-end validated |

## Mandatory negative tests

- New anonymous visitor cannot create a usable viewer session through the public request flow.
- Request submitted / email verified / authenticated is **not** equivalent to approved.
- Unknown email receives generic confirmation but no account discovery details.
- Replayed and expired tokens fail; concurrent redemption has only one winner.
- Unapproved / revoked / expired / cross-resource request returns no protected bytes.
- GET scanners of emailed links do not burn tokens or log in users.
- Direct asset URLs, cached responses, RSC/data endpoints and previews never reveal protected content.
- Incorrect origin/callback URLs, spam bursts, CSRF and stolen sessions fail safely.
- Admin action cannot be invoked by non-admin; revocation is effective for the next request.
- Production is disabled if auth/storage/migrations fail or env missing.

## Release discipline

This document does not authorize connecting an arbitrary Neon account, running migrations in production, or emailing live users. After the user selects the Neon connection, implement this on a new feature branch based on the reviewed security foundation, with working lockfile and automated CI. The public homepage and Builder Guide remain independent.
