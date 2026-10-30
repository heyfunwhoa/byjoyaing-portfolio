# Optional Academy learner accounts

Status: implemented on a draft branch for KRU-173; disabled by default, not deployed or approved for activation. Owner: Kristen Aing. Delivery Tier 3 / engineering Tier C. User approved this scoped implementation on 2026-10-30. This is an increment after the account-free Academy pilot, not a change to its practice scoring.

## Decision and scope

Public lessons remain public. A separate Better Auth learner realm provides email-code sign-in, bookmarks, explicitly chosen continue point, self-reported reading review, a private My learning page, clearing learning records, and fresh-session account deletion. No practice answers, private notes, exercise submissions, quiz grades, badges, subscriptions, private-work access, CMS permissions, or team roles are added.

The existing `docs/security/better-auth-integration.md` remains the Selected Work invitation-only architecture. Its `AUTH_DATABASE_URL`, cookies and future grants must not be shared implicitly with learners. Academy uses separate `ACADEMY_*` configuration, `joy_academy` cookies, `/api/academy/auth`, and `academy_*` tables. New self-service sign-ups are allowed only in the learner realm after email-code verification. They confer no other access. Email OTP is an explicit learner-specific choice: five-minute hashed codes with three attempts and one-time consumption avoid email-link scanner redemption. No custom credential/session cryptography.

## User task and storage

- Read without an account. Only when accounts are enabled does a lesson offer “Sign in to save this lesson.” After sign-in, return to the same registry-backed lesson. User then explicitly saves it.
- Save/unsave, mark/unmark reading reviewed, and choose “Keep my place here.” No implicit click tracking or automatic practice upload. My learning links back using a validated lesson query.
- Session-only review stays separate and labeled. Account reading review is never a quiz pass or mastery claim. Existing Follow one click local storage is untouched and never imported automatically.
- My learning is server-session guarded. Its data API checks verified server session and scopes every query by that server user ID. The browser cannot submit user IDs. Every data operation is bounded and rate-limited, with private/no-store responses.
- Default-disabled pages explain availability, with a public reading link. Missing configuration and storage errors do not expose data or claim successful saves. Learning APIs fail closed.

## Configuration and migration review

Do not select a connected Neon account on the user's behalf. Two connections are currently available. The existing auth decision explicitly requires choosing the account and a dedicated development database. No database was created, connected or migrated in this work.

1. Select the intended Neon account; create a dedicated Academy development database, never a clone of Atlas or employer/customer data. Use a separate production database later. Set `ACADEMY_DATABASE_URL`, a randomly generated 32-byte-or-longer `ACADEMY_AUTH_SECRET`, exact `ACADEMY_AUTH_URL`, separate verified `ACADEMY_AUTH_FROM`, and development-only `RESEND_API_KEY` in secret storage. Do not paste values into source or tickets.
2. Keep `ACADEMY_ACCOUNTS_ENABLED=false`. Run `ACADEMY_SCHEMA_TARGET=development npm run academy:auth-schema` with the selected development environment. This uses the pinned Better Auth migration planner to **print SQL only**, never execute it. Review and save the generated auth migration before applying it to development. No fabricated generated SQL is checked in.
3. Review/apply `migrations/academy/002-learning.sql` only after the generated UUID auth schema exists. The app never auto-migrates. Verify cascading deletion, unique `(user_id, slug)` rows, atomic upsert and reset, query plans, and concurrent writes against PostgreSQL. Runtime role needs only required table operations; migrations use a separate owner role.
4. Test backup and restore on the dedicated dev database. Set documented backup retention and access, deletion procedure and operator before production. Configure cleanup of expired sessions/verification/rate-limit/throttle rows. No cleanup scheduler is installed by this PR. Durable rate-limit keys use HMAC for application email/user buckets; Better Auth's database limiter also stores its own request keys. Never log bodies, tokens or raw addresses for diagnostics.
5. Verify sender domain, SPF/DKIM/DMARC and provider tracking settings. Sign-in messages are text-only, have no tracked links, and are not marketing. Test only a user-approved test mailbox; inspect provider acceptance and actual delivery separately. Provider records follow the configured provider retention, not immediate local account deletion.
6. Enable **development only**. Verify two-user read/write isolation, reload/resume, replay/expired/concurrent code use, rate limits across two app instances, CSRF/origin rejection, account deletion, session revocation, unavailable database and email failure. Confirm the deployment proxy overwrites the IP header Better Auth consumes; don't trust arbitrary forwarded chains.
7. Complete browser keyboard/focus, phone/tablet/desktop, 320px reflow, 200% zoom, reduced motion and screen-reader checks. Review default-disabled browser tests before changing the activation default. Obtain release review before separate production setup and activation.

## Threat model and boundaries

| Boundary/threat | Implemented control | Remaining evidence |
| --- | --- | --- |
| Anonymous or forged owner reads/writes | Better Auth verified server session, server-derived user ID, parameterized per-user SQL, closed payload schema | Real PostgreSQL two-user integration |
| Cross-site writes / redirect abuse | Exact configured Origin for mutations; Better Auth trusted origin checks; registry-only return lesson; no callback URL accepted | Hosted origin/cookie/proxy review |
| OTP guessing, replay, scanners | 6 digits, hashed, 5 minutes, 3 attempts; POST redemption only; create/check OTP endpoints not exposed | Real mailbox and PostgreSQL concurrency |
| Multi-instance spam | Better Auth DB rate limiter plus atomic shared email send (3/hour), verify (10/10 min), user learning (120/min) buckets | Verify shared behavior and trusted IP handling in hosted dev |
| Unintended permissions | Separate route, cookie and tables; no admin/organization/grant plugin | Negative private-work/CMS regression on preview |
| Private caching/telemetry | No-store API/page headers, noindex pages, no PostHog initialization/events on Academy; Vercel public-route allowlist excludes it | Hosted caches, RSC, browser network inspection |
| Deletion / stale credentials | Own-account deletion requires session <10 minutes; FK cascade; DB session checks without cookie cache | PostgreSQL cascade/backup lifecycle |
| Operational failures | Safe bounded error responses, disabled default, no migrations at startup | Real database/sender outage tests |

No raw request/error payload logging. Session records may include IP/browser details. Preserve provider/host data policies and inform users via `/ai-academy/account-privacy`. No automatic analytics identity association.

## UI reuse and responsive intent

Reuse `AcademyBreadcrumb`, native labeled form inputs/buttons, existing Academy rounded panels and ivory/charcoal/copper tokens. New account components are needed for persistent ownership and network states; no new UI library, animation, avatar, or global navigation item. Mobile forms/list sections stack with wrapping actions; My learning becomes two columns at md. All actions target at least 44px, status messages use polite live regions, OTP input receives focus after send, and account deletion uses an inline confirmation. No motion dependency. These are implementation intentions until browser checks pass.

## Verification checkpoint

- 219 repository tests passed. Focused auth/privacy tests also pass after the final negative assertions and type refinement. Final PR records the final run.
- Real Better Auth 1.7.14 runs against disposable Node SQLite with captured synthetic email callbacks. Verifies hashed OTP, single winner of concurrent redemption, replay/expiry rejection, verified identity, distinct sessions, revocation, deletion and recent-session requirement. This does **not** prove PostgreSQL or Resend delivery.
- Boundary unit tests verify no caller-controlled ownership, unknown lesson/extra key rejection, origin checks, unverified/anonymous denial, oversized bodies, throttling and safe failures.
- Clean `npm ci`, production webpack build and TypeScript passed. Focused ESLint passed. Production dependency audit reported zero vulnerabilities.
- Production-server HTTP checks: public selected lesson returns 200; disabled sign-in/My learning return an unavailable page without an email form; disabled auth/data endpoints return 503 and private/no-store. This is HTTP evidence, not browser interaction.
- Browser download failed (archive was invalid). No local browser interaction/viewport/accessibility results claimed. Tests for the disabled public route and API are added to the existing site suite; execution requires CI/browser infrastructure.
- No dedicated PostgreSQL integration, generated auth migration, live email, hosted secrets, production activation, merge or deployment performed.

## Rollback and recovery

Disable `ACADEMY_ACCOUNTS_ENABLED` and redeploy/restart to hide account actions and deny all auth/data routes, while keeping public lessons. Preserve the database; don't drop tables or back up user records into this repo. If reverting code, leave reviewed additive tables until the owner decides retention/deletion. Suspected compromised sessions: keep access disabled and revoke sessions in the dedicated database through a reviewed operation. Rotate the learner secret only as part of reviewed incident response, separate from Selected Work credentials. Restore only to an isolated development database first and verify isolation/deletion semantics before a production recovery.

## References

Official docs inspected: Better Auth email OTP, PostgreSQL adapter and rate limiting. Installed package source/type definitions for 1.7.14 govern this implementation. Next.js installed 16.4.3 route-handler/client/headers docs consulted. Resend transactional email skill consulted. Shared engineering baseline, execution contract, responsive standard and local brand/workbench guidance reviewed. Linear agent-context tool was advertised but returned tool-not-found.
