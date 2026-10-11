# Builder Academy — Build a private GTM workspace with Better Auth

**Track:** Builder / Identity & Access Management · **Level:** Beginner → Intermediate · **Time:** 20–30 minutes  
**Status:** Applied case study and learning journal template. The real app's authentication is **planned, not deployed**; all exercises below are **synthetic** and make no production requests.  
**Prerequisites:** [Authentication vs. Authorization](authentication-vs-authorization.md), [From idea to verified release](idea-to-verified-release.md), and the [Cursor workflows lesson](cursor-agent-workflows.md).

## Learning outcomes

After this case study you should be able to:
1. Explain the difference between an identity provider, session cookie, database user, authorization policy, and protected resource.
2. Trace a Next.js sign-in with Better Auth, including callback, session lookup, expiration, sign-out and revocation.
3. Recognize that `?rep=Alex` or an account ID in a URL is an **untrusted claim**, not permission.
4. Design one negative test that proves an unauthorized request cannot disclose or change an account.
5. Interpret migration, PR, CI and deployment evidence without confusing **planned**, **implemented**, **tested**, **merged** and **deployed**.
6. Describe the operations you now own when choosing self-hosted auth: secret management, DB schema, migrations, patching, backups and sign-in recovery.

## 1. Why build this?

A fictional seller research desk follows companies, saves signals, and prepares draft talking points. As a single-user demo it may show synthetic data. As a real team app it needs to prevent an AE from viewing another person's book, prevent anonymous writes, and make research spend attributable to an authorized actor.

Better Auth supplies **authentication**: a reliable server-verified login and session. The application supplies **authorization**: server-enforced rules for *which exact records and actions* that session may access.

**Analogy:** Better Auth is the building's badge-checking reception. Authorization is the locked room each badge is permitted to enter. Getting into the building must not open every office.

## 2. The architecture, in five boxes

```text
Browser / sign-in button
   ↓ HTTPS, configured callback
Better Auth server in Next.js
   ↔ persistent Postgres auth tables (users, sessions, linked accounts, verification)
   ↓ verified session USER ID (never trust a query parameter)
Application's server-only authorization / data access layer
   ↔ approved assignments and resource permission policy
   ↓ allowed only
Scoped account read / write / permitted AI research action
```

Separate **machine identities**: signed Inngest callbacks and bearer-authenticated cron/webhook handlers do not masquerade as human sessions. They are permissioned for narrowly bounded service operations.

## 3. Progressive build, real evidence required

| Step | Build intention | Verification that proves something | What it does **not** prove |
| --- | --- | --- | --- |
| A0 | Verify protected deployment and data modes | Authorized owner confirms protected production + preview domains and safe anonymous GET denies sensitive pages | That the app has correct internal AuthZ |
| A1a | Select Better Auth integration and local dev store | Version-pinned dependency + generated additive Drizzle schema; isolated test DB | That signing in is secure or production-ready |
| A1b | Allowlisted account signs in / out | Session available to trusted server code; invalid/expired/revoked sessions denied in tests | That user owns all account IDs |
| A1c | Guard sensitive pages and actions | Negative integration test: anonymous request returns deny and triggers **zero** storage, queue or external provider calls | That signed-in users are restricted to own accounts |
| A2 | Map server-owned user ID to permitted book/account | Two synthetic AEs; direct URL, form, AI tool and claim updates cannot cross books | That enterprise multitenancy or SSO exists |
| A3 | Bound privileged actions and spend | Nonadmin cannot reset/import outside scope or start unrestricted work; audit event is privacy-safe | That every external feed is trustworthy |
| A4 | Deployment and recovery | Auth flow works on authorized preview; migrations and rollback documented; released SHA verified | That a green CI check proves no vulnerabilities |
| A5 (optional) | Add teams/org membership later | Two fictional organizations prove data isolation with role-scoped tests | That a default 'admin' role automatically scopes business queries |

**Rule:** keep the existing app private and synthetic until both A1 **and** A2 pass. Do not treat the existence of login UI, passed Semgrep, or docs as proof of security.

## 4. Worked example: Alex vs. Jordan (synthetic)

Alex signs in and tries to view `/accounts/acct-jordan`. Jordan owns that account. The server has verified Alex's session, but **must still deny** the resource.

```ts
// TEACHING PSEUDOCODE — not a copy-paste implementation.
const session = await requireVerifiedSession();
const account = await getAuthorizedAccount({
  userId: session.user.id, // trusted from server session
  accountId: requestedAccountId,
  action: "read",
});
if (!account) return notFound();
return renderAccount(account);
```

Compare with the **unsafe** pattern:

```ts
// UNSAFE — a login by itself doesn't fix this.
const repName = searchParams.rep; // Alex can edit this
const account = store.accounts.find((x) => x.id === requestedAccountId);
return renderAccount(account); // no membership/ownership decision
```

Apply access control **before** reading sensitive content or causing side effects, inside Server Actions and server-side data-access helpers. Hiding navigation or checking only in `proxy.ts` is insufficient. A generated AI tool must inherit the same permitted account scope.

## 5. Hands-on lab: predict the outcomes

| Scenario | Logged in? | Resource permission? | Expected |
| --- | --- | --- | --- |
| Visitor loads private Book | No | N/A | Deny; no private data rendered |
| Alex reads own allowed account | Yes | Yes | Allow |
| Alex changes URL to Jordan's account ID | Yes | No | Deny; do not reveal account |
| Alex submits `rep_name=Jordan` in a form | Yes | No | Deny; zero state changes |
| Alex loses membership but retains a session | Yes | Revoked | Deny from authoritative permissions |
| Anonymous user requests AI research | No | N/A | Deny; zero spend and no job created |
| Signed service account runs scheduled poll | No human session | Service token/signature valid | Allow only narrow service action |

**Exercise:** design a two-user Vitest fixture. For one unauthorized account mutation, assert all three: the response denies, the account data is unchanged, and the job/provider mock has zero calls.

**Knowledge check:** The user signed in successfully through Better Auth, then opens a different AE's account by changing an ID in the URL. Which protection is missing?

A. Authentication  B. Account-level authorization  C. Styling of the login page

**Answer: B.** The session proves identity, not permission to every record. An account-object check must independently deny the requested ID.

## 6. Learn while building: evidence journal

Keep entries in the owning code repository or an approved learning log; transfer only sanitized, generic lessons into public Builder Academy. Record **facts** with PR/commit/test evidence, and label unverified ideas as **hypotheses**. Nothing below is a claim the real implementation has shipped.

| Milestone | Status now | Question to answer after implementation | Evidence to save |
| --- | --- | --- | --- |
| A0 Deployment protection | Not verified | Which public/preview hostnames and callbacks are protected? | Dated owner check, redacted configuration summary |
| A1 Better Auth | Planned | Which auth tables/versions/cookies are created? How do sign-out and revocation work? | Reviewed schema diff, callback test, failing/then passing anonymous test |
| A2 Authorization | Planned | Which policy actually prevents Alex from reading Jordan's account? | Negative integration tests with synthetic IDs |
| A3 Audit and research limits | Planned | Can a nonadmin trigger a job or spend? | Mocked zero-call tests and rate limit evidence |
| A4 Production release | Not authorized | Was the reviewed SHA actually deployed? Could we roll back safely? | Build/release verification and safe rollback notes |

### Repeat after each coding PR

```text
Lesson date:
Milestone and scoped question:
What I expected (hypothesis):
What the code actually did (file/commit):
What I changed and why:
Test that failed before / passed after:
Security or privacy caveats:
What is still unknown:
Next experiment:
Public-safe one-paragraph takeaway:
```

**Self-reflection:** What did the login library solve for you? What did you still need to build? Would you choose a managed authentication provider if you operated this for a full sales team, and why?

## 7. Security and production caveats

- Self-hosted Better Auth is a tradeoff: version updates, persistent session DB, OAuth callback settings, secrets, session management, incident response and recovery need an operator.
- Use a disposable development Postgres/Neon branch for migrations and integration tests; never point a learning exercise at a production Neon database.
- With Drizzle, generate/review ORM migrations rather than silently changing production tables. Preserve the app's existing business schema.
- Prefer a clear allowlist and verified provider account for the initial operator. Do not open anonymous registration to make demo sign-in easier.
- Keep example users, emails, orgs, account IDs and research data **fictional**. Do not publish auth secrets, private accounts, sensitive logs or production routes.
- Future organizations, manager RBAC, SSO and SCIM are separate milestones, not requirements for a useful first authentication lesson.

## 8. Primary references

- [Better Auth Next.js integration](https://better-auth.com/docs/integrations/next)
- [Better Auth Drizzle adapter and generated schema](https://better-auth.com/docs/adapters/drizzle)
- [Better Auth GitHub OAuth](https://better-auth.com/docs/authentication/github)
- [Better Auth Organization plugin (future)](https://better-auth.com/docs/plugins/organization)
- [Next.js authorization/data-access guidance](https://nextjs.org/docs/app/guides/authentication)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP IDOR Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)

*Date checked: 2026-10-11. Recheck provider docs, versions and security guidance before a future code migration.*
