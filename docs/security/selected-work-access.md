# Selected Work — secure access design

**Status:** Architecture / threat model only. No production sign-in, approval, dashboard, tracking, protected resource or database is activated by this change. Keep the live portfolio public while the implementation is reviewed.

## Purpose and brand contract

Support selective sharing of **approved** extended work samples without hiding the strongest public evidence. This feature follows `docs/brand/brand-guidelines.md`: **Commercial Leader. Curious Builder.** with the **People / Strategy / Systems** philosophy and the `joy.` signature. Work comes before Side Quests. Use existing typography and design tokens; visitors should always be able to explore public pages without signing in.

**Publishing boundary:** The private Joy Index is NEVER part of this portfolio, its datasets, RAG index or its protected collection. Likewise, customer/employer confidential information and secrets must not be copied into this public GitHub repository, Vercel builds, preview deployments, logs, email, or the protected storage system without explicit authorization. Password protection does not substitute for permission to disclose. Public metadata should not reveal sensitive titles or summaries.

## Architecture decisions (proposed, not implemented)

- Next.js app on Vercel: public landing and request interface; server-side request validation and authorization for restricted pages and downloads.
- Better Auth with magic-link plugin: identity verification and server-side sessions. **No self-sign-up access:** creating an authenticated user record must not grant any portfolio resource access. Pin and audit dependency versions before install.
- Resend: transactional email only (verification, access decision notification, admin alerts); verified sender domain; no bulk tracking or mailing-list enrollment.
- Neon PostgreSQL: auth tables (managed by approved Better Auth migration), requests, grants, resource catalog and minimal audit records. Separate development and production DB/roles. Never use a production credential in a preview branch.
- Protected files stored outside `public/`, outside the public Git repository, and outside static build output. Prefer private object storage with server-authorized short-lived downloads; do not forward unauthenticated redirects to durable object URLs.
- Administrative actions require explicit allowlisted admin identity configured server-side, a fresh authenticated session (prefer phishing-resistant MFA for admin), and a separate permission check; never assign admin status by self-submitted email domain or metadata.
- Viewer permissions are **resource-scoped**; a grant has status, expiration and revocation state. Default deny when the DB/auth provider is unavailable.
- The Builder Guide and any future RAG index use a strict published-content allowlist. Protected retrieval must enforce the same viewer-and-resource authorization for each retrieved chunk and response; simplest safe default is public-only retrieval.

## Threat model and concrete mitigations

| Risk | Mitigation / test |
| --- | --- |
| Magic link intercepted, forwarded, leaked in logs or referrer | 5-minute expiry; single-use atomic redemption; hashed token-at-rest where supported; HTTPS; never log link/token; no analytics on callback; `Referrer-Policy: no-referrer`; strip sensitive URL parameters after verification; verify token consumption under concurrent requests. |
| Mail scanners pre-click sign-in links | Use an interstitial / confirmation step or a short-code fallback so simple automated GET previews do not silently consume tokens or establish a privileged session. Confirm provider behavior before launch. |
| Access granted on email verification alone | Distinct access-request approval workflow; request starts `pending`; no resource grants until admin approves. Every protected handler checks current grants and revocation/expiry. |
| Spoofed admin or privilege escalation | Verified admin allowlist, strong MFA, deny public admin registration, server-side RBAC checks on *every* mutation and read, audit all approve/revoke actions. |
| Guessing emails / account enumeration | Generic responses for request and sign-in, same for known/unknown identities, no public approval status lookup, no revealing whether someone is registered. |
| Email flooding, spam, DB costs | Shared persistent per-IP and per-email throttles on request/sign-in; bot protection; strict payload size and schema; send quotas; provider failure backoff and monitoring. Avoid in-memory-only rate limiting in serverless production. |
| Stolen cookie / cross-site attack | HTTPS; `HttpOnly`, `Secure`, `SameSite=Lax` or stricter session cookies; narrow cookie scope; short duration, server invalidation and rotation; CSRF protection on state-changing actions; strict origin checks. |
| Content discoverable via static assets/build | No protected artifacts in `public/`, public repo, static pages, sitemap, search indexing, frontend bundles or client-provided metadata. Probe direct URLs, RSC/JSON routes, cached responses and preview domains unauthenticated. |
| CDN or browser caches a private response | `Cache-Control: private, no-store` on protected HTML, RSC, API responses and downloads; review platform cache directives and authenticated routing. |
| IDOR (changing a URL/resource ID) | Resource-by-resource ownership/permission verification on server, not just checking for a login cookie or hiding links. Test cross-resource requests. |
| Authorization bypass via AI Guide | No protected documents ingested into public RAG; enforce same grants at retrieval AND response if protected RAG is eventually introduced. Prompt injection never overrides authorization. |
| Personal-data leakage from visitor tracking | Store minimal event types, avoid raw message content and sensitive URLs, no token storage in analytics, restrict admin reporting; define retention and deletion process. |
| Email/redirect injection or phishing | Strict server-validated allowed callback paths and trusted origins, proper output escaping, official sender domain, no arbitrary external redirect in magic-link URLs. |
| Secrets leaked through GitHub/Vercel | Per-environment scoped credentials in Vercel env vars, no `NEXT_PUBLIC_` secrets, secret scanning, rotation plan, no copying `.env` to PRs. |
| Lost DB/provider | Fail closed for protected reads; don't imply request succeeded if not persisted. Monitor errors without dumping PII. |

## Access request lifecycle

1. Visitor submits name, email, optional organization and purpose. Show privacy information, retention and an optional request-to-delete contact.
2. Validate and rate limit, normalize email for lookup without making assumptions about corporate domains, persist a `pending` record, return a generic confirmation. Explicitly avoid sending a magic link that immediately unlocks resources.
3. Verify control of email with Better Auth magic link (or verification-code alternative for email scanners), mark email verified, but retain `pending` status.
4. Notify admin; admin reviews requests in an owner-only dashboard. If approved, create specific short-lived `resource_grants`. Grant no access automatically.
5. Visitor signs in through magic link. Protected pages and files independently verify session, approved grant, expiry, revocation, and resource publication status before returning bytes.
6. Log high-value events (`requested`, `verified`, `approved`, `denied`, `signed_in`, `resource_accessed`, `revoked`), with actor, timestamp, resource ID when applicable. Do not use email opens as proof of reading.
7. Owner can revoke any grant and invalidate live sessions; protected requests must stop working immediately, not only when a cache expires.

## Data retention / privacy decisions requiring owner approval

- Draft suggestion: purge denied/spam requests after 30 days, stale pending requests after 60 days, and access events after 90 days unless there is a legitimate reason to retain them; re-evaluate legal and business needs before launch.
- Store no raw IP by default in the long-term event log. Abuse prevention can use short-lived, keyed IP hashes in dedicated rate-limit storage.
- Never send visitor data to sales intelligence enrichment providers automatically. No behavioral profiling, email-open pixels, undisclosed mailing-list signup or external ad tracking.
- Provide transparent notice and a way to request deletion or correction; configure automated deletion and an admin delete workflow before launch.

## Implementation phases and go/no-go gates

**Phase 0 (this PR):** Design security, data model and deny-by-default policy. No active end-user form, credentials or sensitive data. Review before implementing.

**Phase 1:** Add auth provider and private storage with dev-only test content; migrations; hashed magic-link tokens; strict callback handling; session security; tests covering denied unauthenticated and unapproved requests. No actual confidential material.

**Phase 2:** Add public request form, generic confirmation, persistent rate limiting, Resend notifications, manual approval admin interface and per-resource grants. Review privacy notice, retention/deletion and audit events. Require admin MFA and session revocation.

**Phase 3:** Add real restricted case studies only after content permission review; secure file streaming and cache tests; automated negative access tests plus 375/768/1280 responsive/keyboard/zoom verification. Explicit deployment approval.

**Phase 4:** Optional Builder Guide access-aware recommendations; public-only AI retrieval as initial default. Separate threat-model and evaluation PR for protected RAG.

## Production acceptance criteria

- Anonymous, pending, denied, expired and revoked users all get the same *no protected data* outcome across page, API, RSC, direct file URLs and previews.
- Approved users can access only explicitly granted, unexpired resources.
- Admin actions cannot be called by ordinary users or by someone who merely claims an admin email.
- Rate limit and replay/concurrency tests pass; secrets never appear in source, logs, query analytics or client bundles.
- Private downloads have server-side authorization and `no-store`; link expiry and grant revocation tested.
- Privacy notice and data deletion implemented; admin access logs minimal; no private Joy Index content.
- CI (lint/tests/build/security) and manual accessibility review pass. No production release while Vercel status is failing.

References for implementation review:
- Better Auth magic links: https://better-auth.com/docs/plugins/magic-link
- Better Auth rate limiting: https://better-auth.com/docs/concepts/rate-limit
- OWASP Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
