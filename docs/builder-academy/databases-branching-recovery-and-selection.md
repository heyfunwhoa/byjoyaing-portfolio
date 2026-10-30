# Databases, branching, backups, and choosing your data platform

Builder Academy · Beginner → Intermediate · 35 minutes · Draft for review · Sources checked 2026-10-17

Related learning owner: [KRU-121](https://linear.app/krusty/issue/KRU-121/academy-lesson-rss-polling-deduplication-and-infrastructure-costs). Everyday-management expansion: [KRU-187](https://linear.app/krusty/issue/KRU-187). The existing `database-branching-recovery` card in `lib/ai-academy.ts` links here. The expansion is proposed until its PR is reviewed and released; the provider comparison below retains its October 17 review date.

## Start here: a 10-minute everyday-management path

**Goal: make it easy to experiment without putting somebody else's work at risk.** A little structure lets you build with more confidence and less repeated setup. Read this section first; the deeper recovery and platform-selection sections are optional next steps.

Think of a database like a workshop's filing cabinet. The live cabinet contains records people depend on. Your practice cabinet lets you try a new filing system without changing theirs. Labels help people find the right cabinet, but the connection and permissions decide which cabinet an app actually opens.

| Term | Plain-language meaning | Example for a fictional learning app |
| --- | --- | --- |
| Organization | Who owns and manages the resources and billing | A personal workspace or a hosting-managed workspace |
| Project | A named home for one app's database resources | `learning-app` |
| Production | The environment serving real users | Saved reading progress people expect to keep |
| Development | Your ongoing workbench | Fictional learner records for trying changes |
| Preview | A temporary review copy for one change | `preview/lesson-bookmarks`, linked to its PR |
| Connection string | The address and credentials an app uses to reach a database | A secret setting, never pasted into a lesson or issue |

### Six habits that make building easier

1. **Name things for their job.** Prefer an app name over a generated nickname. Record stable project and branch IDs alongside labels. Renaming a project does not move its records or prove the app points to the right place. Keep unrelated apps separate unless sharing has a specific, reviewed purpose.
2. **Give experiments their own connections.** Production, development, and previews should point to the intended separate database state. A Git branch separates code; it does not automatically separate data. Check the actual deployment's connection identity, because an integration may override dashboard defaults at deployment time.
3. **Keep practice data fictional.** A normal database branch may copy customer details, login accounts, and sessions. For sensitive apps, use structure-only copies or build an empty development project from reviewed migrations, then add synthetic records. Disable real email, payments, and background jobs in test environments too.
4. **Keep keys out of the notebook.** Store credentials in the hosting platform's secret settings. Use separate environment credentials and only the permissions an app needs. Keep schema-changing migration access separate from everyday application access where practical. If a credential leaks, revoke it, update its consumers, and verify the old credential no longer works. Removing text from Git is not revocation.
5. **Agree on recovery before you need it.** Decide how much recent work you can afford to lose and how long the app can be unavailable. Those are recovery point and recovery time targets. Check the actual plan's retention, rehearse recovery into a separate target, and verify records, permissions, and routing. A successful website rollback does not undo database changes.
6. **Give temporary work an end date.** Tie previews to a PR and owner. Before deletion, inspect deployments, scheduled jobs, unique data, and any recovery obligations. Expiration is scheduled deletion, not a backup. Keep production and long-lived development out of blanket expiry rules.

### A small inventory beats a complicated dashboard

Keep one internal inventory with the application/repository, hosting project, organization, environment, stable database IDs, data classification, owner, secret-setting names, recovery targets, last restore test, and review or expiry date. Record references to credentials, never their values. Update the inventory when a connection changes, rather than maintaining several competing lists.

For ongoing care, review usage and leftover previews weekly while actively building. Recheck access and recovery readiness before a meaningful release, and rehearse restoration on a cadence that matches the value of the data. Watch compute, storage, retained history, and network transfer. An idle compute or a free plan does not prove that a resource is unused or that future usage costs nothing.

### A predictable change process

Prepare an isolated test database → apply the versioned migration there → check expected records and denied access → review the PR → approve the production migration and release → verify the live result → retire temporary resources when they are no longer needed.

Promote reviewed schema changes, not a test database full of fictional records. Use an additive change when possible: add the new structure, ship compatible code, migrate existing records, and remove old structure only after consumers no longer need it. Record how to recover before each step.

### Paper exercise: find the shared key

A fictional learning app uses one `DATABASE_URL` for production and previews. A preview runs a migration and sends a welcome email. An old preview branch is idle and its PR is closed.

1. Identify what could affect real learners even though the code is in a preview.
2. Draw three rows for production, development, and a temporary preview. Assign distinct connection references, fictional versus real data, an owner, and a cleanup policy.
3. Propose a recovery target in plain language, such as losing no more than an hour of changes and restoring service within four hours. These are exercise targets, not provider guarantees.
4. List the evidence needed before deleting the idle preview.

**Answer guide:** A shared connection can let preview code alter live data. A copied database can still contain real email addresses, so separate data and disable real delivery. An isolated database must have its schema and permissions tested before switching the app to it. A closed PR and idle compute are useful signals, but also check deployments, jobs, unique records, and retention requirements. No real infrastructure is changed by this exercise.

### Neon and Vercel specifics

Reviewed October 30, 2026 against the primary documentation:

- [Schema-only branches](https://neon.com/docs/guides/branching-schema-only) copy structure without rows. Check current plan and tooling support; restoring data into that branch later can reintroduce sensitive records.
- [Branch expiration](https://neon.com/docs/guides/branch-expiration) deletes the branch and associated compute. Set it deliberately for disposable resources.
- [Vercel-managed integration](https://neon.com/docs/guides/vercel-managed-integration) can supply a different database connection at preview deployment time. Verify the deployed mapping, not only the environment-variable list. Manage provider-owned resource naming and configuration through its supported Vercel controls. Keep one stable production database; creating a fresh one for every production deployment is not the recommended pattern.

These practices are a learning guide, not evidence that a particular app's access controls, billing, or backups have been verified.

## Learning outcomes
1. Explain a relational database, table, row, schema, foreign key, unique constraint, and transaction in plain language.
2. Explain how RSS polling, parsing, deduplication, PostgreSQL storage, and review boundaries relate.
3. Distinguish a Git branch, a database branch, a snapshot, a backup, and point-in-time recovery.
4. Select among Neon, Supabase, Railway-managed PostgreSQL, Turso, and Cloudflare D1 based on workload and constraints.
5. Define a migration acceptance test and recovery plan without confusing a successful restore with a nondisruptive restore.
6. Estimate *incremental* hosting/ingestion cost without mistaking a free-tier allowance for guaranteed zero spend.

## 1. Mental model
A database is a filing system with rules and query language. A *schema* describes the forms; rows are filled-in records. A *foreign key* prevents a feed item referring to a nonexistent feed. A *unique constraint* prevents one source from storing the same article identity twice. A *transaction* groups operations so a failure can roll back the entire group when correctly scoped.

A feed poller is a delivery worker, not a database. In the Account Signal Engine, Inngest decides when to fetch; safe RSS/Atom/JSON parsers normalize items; PostgreSQL records source identity, entries, hashes and retrieval attempts. Retrieved content is evidence intake, not a verified competitive claim.

## 2. Branch versus backup versus snapshot
- **Git branch:** alternate history of source-code changes.
- **Database branch:** separate database state for testing a migration or query, with provider-specific compute and naming semantics.
- **Snapshot:** a captured database recovery point; its scope and retention are provider-specific.
- **Point-in-time recovery:** reconstruct a database as of an earlier moment within a supported window.
- **Backup:** recoverable copy with a tested retention/recovery procedure, not merely a button labeled Backup.

**Critical lesson from an actual synthetic-safe infrastructure exercise:** A snapshot restore into a newly named branch unexpectedly *finalized* a replacement, moving the default/primary `main` identity. Original and restored schemas each showed 16 tables; matching table counts did not prove that connection routing was unchanged. Never assume a new branch name guarantees non-disruption. Verify the provider's default `finalize` behavior and explicit `target_branch_id`, then re-read identities and compute endpoints before and after. Never include credentials or personal data in the lesson.

## 3. Technology selection: first choose the workload
| Need | Likely first option | Why | Caution |
| --- | --- | --- | --- |
| Existing Postgres SQL, many experiments, branch-based migrations | Neon | PostgreSQL compatibility, scale-to-zero, database branching | Branch restore/finalization and recovery windows must be understood |
| Database plus managed authentication, object storage and auto-generated APIs | Supabase | Integrated backend services | Free plan lacks automated backups and branching; paid environments have separate usage |
| Co-host workers/API/PostgreSQL in a managed application platform | Railway | Operational simplicity for tightly coupled services | Monitor persistent compute/storage and backup availability |
| Many small SQLite-oriented workloads, local-first | Turso | Lightweight databases, replication-oriented workflows | PostgreSQL migrations/features aren't drop-in |
| Edge/Workers application with SQLite semantics | Cloudflare D1 | Close integration with Workers | PostgreSQL features and migration syntax differ |

**Decision order:** (1) data model and SQL compatibility; (2) consistency and transactions; (3) privacy/access control; (4) backup and tested restore; (5) environment separation; (6) hosting and ops; (7) pricing and exit cost. Don't choose based solely on a free tier.

## 4. Application design: Account Signal Engine
One collector owns canonical source records. Five approved feeds are an *operational pilot*, not a claim that a vendor's capabilities were verified. Related apps consume reviewed evidence through a typed contract rather than database credentials or competing collectors.

The pilot passes only if:
- A known allowed feed is fetched, normalized and stored with source and time provenance.
- Repeat fetching creates zero duplicates; changed content is distinguishable from a new article.
- Bad URLs, malformed inputs, HTTP failures, and hostile text do not publish claims or block other feeds.
- Database constraints reject orphan rows, a rerun of additive migrations is safe, and main data remains intact.
- The owner can observe source health, run failures, cost and review status.
- Separate approvals gate schema changes, source activation, public API access and deployment.

## 5. Recovery lab (paper/synthetic exercise, no live database required)
You have two branch IDs: original A and restored B. A snapshot was created from A. After a restore, B becomes default `main` and A is renamed. The application may still connect through compute endpoint bindings.
1. Identify which properties must be checked before changing anything: default flag, branch ID, name, read/write compute endpoint, connection host, table/row baseline, snapshot ID, and active application configuration.
2. Draft an authorization gate for changing the default branch, without executing it.
3. Explain why matching 16-table schemas is insufficient to prove restoration safety.
4. Write rollback criteria and stop conditions, including a failed connection test.

**Answer guide:** IDs are stable identifiers; names are labels; compute routing is operational state. A safe repair first verifies which host the app actually uses. A snapshot has value only when its target/retention and restoration path are understood. Any unplanned identity reassignment is a stop condition.

## 6. Cost lab
For 5 feeds polled every six hours in a 30-day month, estimate 5 × 4 × 30 = 600 feed requests before retries. For 60 feeds, the same assumptions yield 7,200 requests. These are fetch counts, *not* necessarily billable job executions, AI tokens or database compute hours. Check each current plan and the exact code's batching/step model; add headroom for retry bursts, storage retention, branches, egress and usage caps. Record measured usage after a controlled pilot.

## Knowledge check
**Question:** An operator restores a snapshot with a new branch name. The old and new branches have identical table counts. Which conclusion is safe?
- A. The production connection is certainly unchanged.
- B. The restored schema appears equivalent, but primary/default flags and endpoint routing still require independent verification. **Correct**
- C. Database restore cannot change application connectivity.

**Why:** Schema checks validate data structure, not routing, identity or permissions.

## When to revisit this choice
Reconsider a provider if a concrete requirement emerges: recovery targets the current tier cannot meet, integrated auth/storage materially reduces operational cost, incompatible SQL requirements, measured expense, region/compliance obligations, or significant latency. Use a representative workload and benchmark before moving.

## Primary references and review links
1. [Neon restore snapshot API](https://api-docs.neon.tech/reference/restoresnapshot)
2. [Neon finalize branch restore API](https://api-docs.neon.tech/reference/finalizerestorebranch)
3. [Neon branch creation API](https://api-docs.neon.tech/reference/createprojectbranch)
4. [Neon free-plan update, October 2, 2026](https://neon.com/blog/neon-free-plan-1-gb-per-project)
5. [Supabase hosted PostgreSQL and backups](https://supabase.com/solutions/hosted-postgres)
6. [Supabase pricing and Free plan limits](https://supabase.com/pricing)
7. [Supabase branching usage](https://supabase.com/docs/guides/platform/manage-your-usage/branching)
8. [Turso pricing](https://turso.tech/pricing)
9. [Account Signal Engine source registry](https://github.com/heyfunwhoa/account-signal-engine/blob/main/docs/research-hub/SOURCE-REGISTRY.md)
10. [Account Signal Engine migration runner](https://github.com/heyfunwhoa/account-signal-engine/blob/main/db/migrate.mjs)

**Evidence limits:** Pricing can change; the platform comparison is not a benchmark. This draft's scenario describes the observed branch identity outcome but does not disclose credentials, and it is not proof the branch configuration has been repaired.
