# Lab: Debug a Preview database and owner login safely

Builder Academy · Companion to **Databases: branching, backups, and platform decisions** · Beginner to Intermediate · 20 minutes · Draft for review

## What you will learn

You will distinguish an application's Git branch, its Vercel Preview deployment, and its Neon database branch; diagnose the difference between a failed network request and a 401 authentication response; and learn to verify the *effective* database route without exposing secrets. This is an educational **synthetic exercise**, not a production runbook.

## The example

A fictional security research application has:

- **Code branch:** `test/research-hub-neon-preview`
- **Database A:** an isolated PostgreSQL test branch containing one authorized owner and a credential record
- **Database B:** an automatically generated Preview database branch containing no owner
- **Vercel:** a shared `DATABASE_URL` supplied by an integration, plus a branch-scoped database setting
- **Better Auth:** email/password login with public signup disabled
- **RSS:** an hourly scheduled collector that must remain off in Preview

The user successfully creates the owner account in Database A, but a deployed Preview login returns HTTP 401 and a server-side “User not found” message.

## A mental model

A Git branch chooses **which code** runs. A Vercel deployment chooses **where and under which environment variables** that code runs. A Neon branch chooses **which rows and schema** are available. These are independent. Matching branch names do not imply matching data.

`BETTER_AUTH_SECRET` signs and verifies authentication material; it is not a user password. An owner email allowlist identifies permitted identities but does not create an account. A 16-character provisioning fingerprint confirms a target connection descriptor, but is not a password and cannot establish database safety on its own.

## Troubleshooting sequence

1. **Find the network failure category.** CORS or “Failed to fetch” suggests the client is calling a different origin or cannot reach the endpoint; it is not evidence of a bad password. Inspect the browser Network panel's request URL without sharing headers or payload.
2. **Inspect the HTTP response.** A 401 proves the request reached authentication but does not identify the exact cause. Use bounded server logs.
3. **Compare database *data* across branches read-only.** On a disposable test branch, check only counts of authorized users and credential records. Never select password hashes or session tokens.
4. **Verify effective connection routing.** Multiple Preview-scoped environment variables with the same name can obscure routing. A reviewed Preview-only override, such as `ASE_PREVIEW_DATABASE_URL`, can make the intended connection explicit. It must not override Production.
5. **Check auth security controls.** Keep public signup disabled; provision an owner only through an approved trusted local process against a disposable database. Never paste privileged connection strings in chat or build logs.
6. **Retest on a stable Preview hostname.** Both the browser client base URL and server trusted origin must agree with the URL used for login. A deployment-specific hostname can change between builds; a stable branch alias is preferable where configured.
7. **Verify the result.** A successful login confirms owner authentication, not that every Research Hub read/write path or ingestion process works.

## Cost and safety lab

The collector already supports source intervals, ETag/Last-Modified, bounded retries, and deduplication. Those controls avoid redundant fetches. A Preview-only scheduled polling guard prevents accidental collection and billable resource use during login and storage tests. Before enabling a real feed, record a baseline: number of registered sources, entries, attempts, and database compute consumption. Then approve **one** source and measure results. Do not equate a collected article with an independently verified market claim.

## Work through the exercise (no live resources)

**Scenario A:** The browser page is hosted on `preview-new.example`, but `sign-in/email` is sent to `preview-old.example`. What do you inspect first?

Answer: The browser authentication base URL, server trusted origin and Preview alias; do not reset a password.

**Scenario B:** Database A contains one owner, Database B zero; login logs say “User not found.” What is the first hypothesis?

Answer: The runtime may be connected to Database B. Prove its route before modifying accounts.

**Scenario C:** An hourly scheduler could run immediately after switching Preview to Neon persistence. What must happen first?

Answer: Verify that automatic Preview collection is disabled and test the guard before enabling any real source.

**Scenario D:** One source fetched successfully. Can its article be used as a verified competitor claim?

Answer: No. It is a research lead requiring provenance, source assessment and appropriate human review.

## Completion checklist

- Explain the difference between a Git branch, Neon database branch, and Vercel deployment.
- Explain the difference between a provisioning fingerprint, a password, and a Better Auth secret.
- Diagnose CORS, 401, and “User not found” without guessing.
- Describe how to prove Preview database isolation without revealing secrets.
- Identify when manual collection, paid enrichment and publication need separate approval.

## Primary source references

- [Neon branching documentation](https://neon.com/docs/introduction/branching)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Better Auth email/password authentication](https://www.better-auth.com/docs/authentication/email-password)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [Account Signal Engine owner provisioning policy](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/security/owner-provisioning.md)
- [Research Hub source registry](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/research-hub/SOURCE-REGISTRY.md)

This lab uses synthetic details and generalizes a real troubleshooting pattern. It does not establish Production release readiness.
