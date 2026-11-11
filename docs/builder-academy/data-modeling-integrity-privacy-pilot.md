# Data Architecture pilot: model → integrity → privacy → applied registry
Status: complete synthetic lesson/lab draft for owner and learner review; not a published Academy card or deployed exercise.
Relationship: [integration map](../academy/DATA-ARCHITECTURE-INTEGRATION-MAP.md). Reuse existing `sql`, `reading-code-and-yaml`, `database-branching-recovery`, `privacy`, `mcp-vs-rest-api`. Do not teach provider/backup/API introductions again.
Audience: beginner with no SQL experience. Suggested 4 stops of 10–15 minutes plus optional 30–45 minute applied SQL exercise.
Safety: all identities, organizations, permissions, and example records are synthetic. No customer/employee data; run queries in disposable local PostgreSQL/SQLite only if desired, NEVER in a production database.

## Story: Northstar Group's internal team registry
A fictitious organization needs to know which people belong to which teams and who can view membership information. One person may be on many teams. A team may contain many people. A manager must review membership changes. A public directory may show display names only if policy permits, but not private contact fields. Your goal is to model this without duplicate people, mismatched teams or unauthorized disclosure.

### Stop 0 — prerequisite bridge (reuse existing lessons)
Review `how-code-works`, `programming-concepts`, `sql` in Programming Foundations, plus `reading-code-and-yaml` if JSON is unfamiliar. If skipped, know only: table = collection, row = record, column = attribute, ID = stable identifier, query = a request for data. Optional check: label account ID, contact email and team name in a three-row table. Do not force completion of unrelated Academy pathways.

## Stop 1 — Data modeling and relationships (D1)
**Why**: putting all team names inside a person's row makes it hard to enforce valid memberships or track when they began.
**Mental model**: a conceptual model names what matters; a logical model specifies keys, rules and relationships; a physical model maps them to a real database.

Conceptual:
```
Person ──< TeamMembership >── Team
             (start/end, role, approval status)
```
Logical:
- Person(`person_id` stable UUID, `display_name` required, `work_email` optional)
- Team(`team_id` stable UUID, `team_name` required unique within organization)
- TeamMembership(`membership_id` stable UUID, `person_id` FK, `team_id` FK, `role_code` constrained, `status` constrained, `valid_from`, `valid_to` optional)
- One person ↔ many team memberships and one team ↔ many team memberships. Direct person↔team is many-to-many.
- The uniqueness rule depends on temporal needs: `UNIQUE(person_id, team_id)` is simple but prevents multiple historical memberships. For the beginner exercise enforce one CURRENT membership per person/team, and preserve old entries as history; discuss implementation-specific partial unique index or separate current/history tables later.
**Design tradeoff**: IDs survive renames; emails may change and should not be a person's sole identifier. Do not blindly reuse a CRM contact ID as a human identity ID.
**Vocabulary**: entity, attribute, primary key, foreign key, cardinality, junction table.
**Mistakes**: "One email always means one human" (not necessarily); "comma-separated team names are equivalent to relational membership rows" (they cannot carry independent roles/effective dates/constraints cleanly).

Guided try: draw two people, two teams, and three membership records. Have one person participate in both teams. Annotate which ID in a membership points to another entity.
Independent try A: Northstar wants an approval decision per membership. Should approval be an attribute of Person, Team, or Membership? Explain.
Expected: Membership or an associated approval-event entity, because each person's team membership has its own decision.

## Stop 2 — Integrity and data quality (D2)
**Why**: polished screens do not guarantee correct stored data.
**Mental model**: input validation helps the user, but database constraints guard writes from any source. Quality includes accuracy, completeness, consistency, uniqueness, validity and timeliness.
Rules:
1. Stable `person_id` and `team_id` must exist before membership references are written.
2. Reject simultaneous duplicate active memberships for the same person/team.
3. Require `role_code` to match a reviewed vocabulary (e.g., member/lead).
4. Require `valid_to` to be after or equal to `valid_from` when present.
5. Treat unknown email as NULL rather than fake `none@example.com`. Empty string and NULL can have different meanings.
6. A transaction groups mutually dependent writes; async retries need idempotency and independent error handling.

Synthetic fixture:
| person_id | name | team_id | team | membership_status |
| --- | --- | --- | --- | --- |
| P-100 | Avery | T-10 | Research | active |
| P-100 | Avery | T-20 | Platform | active |
| P-200 | Morgan | T-10 | Research | pending |

Negative cases:
- Repeated active P-100/T-10 -> duplicate; reject.
- P-999/T-10 with no P-999 -> orphan; reject.
- P-200/T-20 with `valid_from=2026-11-20` and `valid_to=2026-11-10` -> invalid interval; reject.
- P-200/T-10 with reviewer absent -> pending; must not publish as approved.
Distinguish valid syntax from true business meaning: a well-formed team name need not correspond to the right team.

Guided try: mark invalid rows and name the violated rule.
Independent try B: a CSV import is retried after a timeout. Explain why blindly inserting every row creates duplicates; propose a stable import key and explicit upsert/idempotency rule.
Expected: stable source event/row identity; retries produce same result, not extra memberships. Avoid unsafe upserts that overwrite unrelated validated data.

## Stop 3 — Privacy, governance and authorization (D3)
**Why**: "correct" data can still be mishandled. Authentication answers who you are; authorization answers what you may do.
**Mental model**: design allowed use, access, retention and review into the data model rather than relying on hidden UI fields.

Proposed field register for the fictional pilot (illustrative policy; requires owner approval for real use):
| Field | Classification | Intended purpose | Suggested access | Lifecycle |
| --- | --- | --- | --- | --- |
| person_id | internal identifier | link records | authorized app services | retained while records require linkage |
| display_name | internal directory | show membership to permitted users | members; public only after explicit policy review | review after departure |
| work_email | personal/contact data | approved notification | restricted staff; not anonymous visitors | delete or redact after purpose ends under approved retention policy |
| team_id/team_name | internal reference | describe teams | employees and approved integrations | maintain while active |
| membership role/status | internal organization data | workflow/roster | authorized team staff | maintain history as justified |
| approval actor/time | internal audit | accountability | authorized auditors/owners | policy-defined time-limited retention |

Owner = accountable decision-maker; steward = responsible for day-to-day quality and approved updates; system of record = authoritative source for a field or business event. Approval status must be verified on the server before read/write. Logs should record action IDs and outcomes but never unnecessarily expose private contact fields or credentials.
Guided try: propose role permissions for anonymous visitor, team member, team owner, auditor. A team member viewing their own approved membership must not automatically view all work emails.
Independent try C: an authenticated user sends GET /memberships?team_id=T-20. Name two authorization checks besides "logged in".
Expected: access to requested team/tenant and access to requested fields/approved purpose; check server-side each object, not frontend filtering alone.
Privacy edge case: a deletion request may conflict with legitimate retention of approval/audit events. Escalate to documented policy/owner, minimize retained identifiers, avoid promising universal immediate deletion without a legal/context review.

## Stop 4 — Applied lab (do not assume completed from reading)
Deliverables: (1) three-entity ERD, (2) data dictionary with owner/classification for each field, (3) four validity rules, (4) role-by-field access table, (5) three rejected test cases, (6) a brief migration/rollback plan, (7) one analogy between the registry and a GTM account/contact/opportunity model.

Optional SQL illustration (PostgreSQL semantics; use synthetic data only):
```sql
CREATE TABLE people (
  person_id text PRIMARY KEY,
  display_name text NOT NULL,
  work_email text
);
CREATE TABLE teams (
  team_id text PRIMARY KEY,
  team_name text NOT NULL UNIQUE
);
CREATE TABLE team_memberships (
  membership_id text PRIMARY KEY,
  person_id text NOT NULL REFERENCES people(person_id),
  team_id text NOT NULL REFERENCES teams(team_id),
  role_code text NOT NULL CHECK (role_code IN ('member', 'lead')),
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  valid_from date NOT NULL,
  valid_to date,
  CHECK (valid_to IS NULL OR valid_to >= valid_from)
);
```
This illustrates schema-level constraints but intentionally does **not** enforce unique active memberships or row-level authorization. Those are design requirements still needing careful implementation. Do not mistakenly claim the SQL makes this production-safe. To test, write the separate logic and negative cases in a disposable environment.

## Assessment rubric (independent, not only multiple-choice recall)
Score each dimension 0 (incorrect/unsafe), 1 (partially justified), 2 (correct and explained); suggested passing score 8/10 AND no unauthorized-disclosure finding:
| Dimension | Evidence for 2 |
| --- | --- |
| Entities & cardinality | Correct Person↔Membership↔Team many-to-many model and stable IDs |
| Integrity and business rules | Recognizes orphan, duplicate, invalid dates, approval status |
| Privacy and authorization | Restricts fields/objects by role and purpose, beyond authentication |
| Lifecycle and migration | Explains schema change, history/retention, negative test and safe fallback |
| Transfer | Explains why a GTM Contact→Account relationship differs from Person↔Team membership when roles/history matter |

Independent scenario 1: "A single person joins a second team and becomes a lead there." Learner must model separately without rewriting their first membership.
Independent scenario 2: "Import sent twice; one row references a deleted team." Learner must prevent duplicate and orphan results and explain error handling.
Independent scenario 3: "An authenticated external user requests all work emails." Learner must reject/restrict based on independent authorization, not hide the column client-side.
Independent scenario 4: "Department names are renamed and a historical quarterly report is rerun." Learner must preserve stable IDs and decide which names are historically appropriate, with effective-date/source-of-truth rule.

### Two required reasoning checks per new topic
D1 Q1: Why is a membership entity better than a comma-separated list? Answer: records individual relationship role, history and rules.
D1 Q2: Is email a safe stable primary key? Answer: no, email can change/recycle and may be absent.
D2 Q1: Does passing browser validation guarantee database integrity? Answer: no, backend/import writes and concurrency still exist.
D2 Q2: Does a retry create a second membership? Answer: it must not; use stable identity and safe idempotency strategy.
D3 Q1: Does login authorize access to another team's contact fields? Answer: no, check object and field permissions.
D3 Q2: Is deleting the visible row sufficient to meet privacy requirements? Answer: no, consider backups, derived copies, audit retention, and approved lifecycle policy.

## Learner pilot / release decision
Prerequisite clarity: can a beginner identify record/table/schema before starting? Accessibility: keyboard access, 200% zoom, narrow-screen tables, diagram text equivalents. Comprehension: independent scoring and failure cases. Content safety: only synthetic fixtures. Source verification: primary technical references reviewed separately before publishing; timestamp evidence. Proposed next iteration after feedback: add graphical ERD comparison and one deterministic validation exercise to the **existing Academy component family**, not a separate simulator stack.

Record results as REVIEWED / PRACTICED / PASSED / DEMONSTRATED separately. This doc alone proves only a draft was authored, not that a learner completed anything or that a production implementation passed tests.

### Canonical sources and reused material
- `docs/ai-academy/programming-foundations.md`
- `docs/builder-academy/databases-branching-recovery-and-selection.md`
- `docs/builder-academy/cms-fundamentals.md`
- `docs/builder-academy/api-mcp-progressive-lab.md`
- Technical Docs `engineering/baseline-v1.md`, `engineering/acceptance-evidence-standard-v1.md`
- PostgreSQL constraints: https://www.postgresql.org/docs/current/ddl-constraints.html
- OWASP database security: https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html
- NIST Privacy Framework: https://www.nist.gov/privacy-framework
