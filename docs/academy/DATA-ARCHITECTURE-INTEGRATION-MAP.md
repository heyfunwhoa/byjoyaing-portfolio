# Builder Academy: full-inventory reconciliation and Data Architecture pathway
Status: proposed integration specification, not live navigation or an implemented course
Prepared: 2026-11-07
Owner: Builder Academy in this repository
Integration dependency: PR #238 / KRU-174; learner acceptance KRU-178
Scope: documentation and a synthetic pilot; no accounts, provider calls, database writes, dependencies, or deployed route changes

## Decision
Use ONE Academy, ONE canonical lesson identity per concept, MANY learner pathways, and SHARED assessment/lab assets. Do not create another course application, lesson table, standard repository, or production registry. Existing canonical content lives in `lib/ai-academy.ts`, the Programming Foundations modules and their companion documents; PR #238 proposes `lib/academy/learning-paths.ts`. Content and route status must be checked independently from PR state.

## Source inventory (reviewed)
Source of truth: main `lib/ai-academy.ts`, `lib/academy/programming.ts`, `lib/academy/guided-lessons.ts`, `docs/ai-academy/programming-foundations.md`; PR #238 `docs/academy/CURRICULUM-AUDIT.md`, `PROGRAM.md`, `LEARNING-DEPTH.md`, `lib/academy/learning-paths.ts`; PR #260 SDLC crosswalk; Technical Docs `engineering/baseline-v1.md` and pending Academy packs.
Snapshot limitations: #238 audit dated Nov 4 states 38 registered main lesson cards and 39 on its integration branch. This is not a fresh source-by-source certification of all docs, exercises, branches or deployment. The 35 Builder and 17 enterprise companion-document counts are the audit's earlier source inventory, not 52 additional course records.

### Canonical short-card catalog (38 on main, sourced from PR #238 audit)
- AI foundation and research: `what-is-ai`, `evolution`, `prompting`, `verification`, `privacy`, `llms-models-inference-gateways`, `gtm-research`, `skills`, `evaluate-ai-models`.
- Builder, delivery, frontend, and systems: `database-branching-recovery`, `cms-fundamentals`, `reading-code-and-yaml`, `frontend-building-blocks`, `storybook-visual-regression`, `integration-registry-finops`, `evidence-based-product-request`, `idea-to-verified-release`, `cursor-workflows`, `measure-product-use-safely`, `mcp-vs-rest-api`, `package-registries`, `security-hardening-release-gates`, `secure-account-import-research`, `better-auth-gtm-workspace`, `fde-ai-agent-engineering`.
- Enterprise evaluation (13): `sales-frameworks`, `evaluation-discovery`, `evaluation-value`, `evaluation-deployment`, `evaluation-poc`, `evaluation-map`, `evaluation-procurement`, `evaluation-security`, `evaluation-negotiation`, `evaluation-readout`, `evaluation-handoff`, `enterprise-contracts-sales-cycle`, `security-assessments-buyer-size`.
- PR #238 adds `background-job-recovery` as card 39. Do NOT count it as merged.
- Shared card IDs remain stable; repeated pathway appearances are links, not copies.

### Other teaching surfaces, separate counts
- Programming Foundations: 10 module records (`how-code-works`, `programming-concepts`, `javascript`, `typescript`, `html-css`, `python`, `sql`, `language-explorer`, `frameworks-runtimes`, `choosing-tools`); only the first two have guided lessons. Eleven technology explorer entries are reference entries, not courses.
- Connected Systems: two interactive examples and an infrastructure explainer; 13 module outlines and seven future lab ideas are planning material, not implemented modules.
- Existing paths/routes: `/ai-academy` catalog; `/ai-academy/programming`, `/ai-academy/systems`, `/ai-academy/version-control`, `/ai-academy/playground`, `/ai-academy/playground/research-pipeline`, `/ai-academy/playground/skill-builder`, `/ai-academy/journeys/follow-one-click`, `/ai-academy/journeys/prompting`, `/ai-academy/journeys/source-verification`, `/ai-academy/dependencies/lockfiles`, `/ai-academy/devops/build-rate-limits`, `/ai-academy/git-lab` redirect, `/builder-academy/credential-risk`, `/builder-academy/identity-journey`. Route existence is not evidence of mastery.
- Companion docs: Builder Academy guides and enterprise evaluation guides supplement cards. Staged Technical Docs packs are not published routes. SDLC crosswalk PR #260 is a learning plan, not 30 new lessons.
- Current assessment: cards generally have a single knowledge check; guided Frontend panel is more complete; learner performance/persistence and human acceptance remain separate.

## Existing PR collision and ownership register
| PR | Domain and status | Decision before rollout |
| --- | --- | --- |
| #233 | Older nine-path proposal overlapping shared catalog files | DO NOT merge independently of #238; supersede/reconcile, preserve history |
| #238 | Primary integration of nine paths and 39-card proposal; open | Canonical Academy navigation and learning-path change vehicle; owner/learner review required |
| #260 | SDLC crosswalk and references; open | Reuse SDLC spine; documentation integration only, no second SDLC curriculum |
| #281 | Beginner computing bridge; open | Reuse as foundations prerequisite after review |
| #279 | PR reconciliation and security throughout SDLC; open | Reconcile edits to PROGRAM/CURRICULUM-AUDIT with #238 before merge |
| #265 | AI engineering foundations; open | Keep distinct from data-for-AI extension |
| #242 | Preview Neon and database recovery; open | Reuse for physical DB/recovery, not business modeling |
| #267 | IaC review lab; open | Separate optional delivery lab; no data-path dependency |
| #234 | Optional learner accounts; open/inactive | Not a prerequisite; do not enable or claim saved progress |
| #278 | Alert handoff exercise; open | Reuse as optional cross-path integration example |

## Canonical identity and metadata contract
Existing lesson slug is the stable canonical ID. Do not renumber/rename old lessons. Proposed new data lesson IDs are immutable only upon editorial acceptance:
`data-modeling-foundations`, `data-integrity-quality`, `data-privacy-governance`, `data-engineering-contracts`, `analytical-semantic-modeling`, `data-architecture-decisions`.
Schema proposal for extension of existing registry, not a second registry:
`id/slug, title, primary_domain, pathway_ids[], prerequisite_ids[], outcomes[], level, estimated_minutes, lesson_status, instructional_status, content_path, lab_ids[], assessment_ids[], source_refs[], review_date, owner, acceptance_evidence`.
Status dimensions must stay separate: documentation planned/drafted/registered/published; learning reviewed/practiced/passed/demonstrated; testing not-run/passed/failed; release not-deployed/verified. A link, PR, build, or click alone cannot establish the others.

## Existing nine paths from PR #238, owned by its learning-paths source
`delivery`, `frontend`, `systems`, `security`, `foundations`, `agents`, `research`, `verification`, `enterprise-evaluation`.
Proposed `data` specialization should be a **tenth curated path only after #238 is accepted**, using existing references + new incremental lessons. No immediate navigation or track-type change. Existing lessons remain owned by their current content source and can be reused on the `data` path.

## Canonical Data Architecture specialization: prerequisites, outcomes, labs and assessment
| Order / ID | Prerequisite IDs or existing entry | Existing coverage and NEW scope | Observable learner outcome | Evidence & status |
| --- | --- | --- | --- | --- |
| D0 existing | `how-code-works`, `programming-concepts`, `sql`; optional `reading-code-and-yaml` | Reuse programming language, structured files and query basics | Tell record/table/schema/API apart | Existing module records, two guided tutorials only |
| D1 `data-modeling-foundations` | D0 (allow a plain-language bridge if skipped) | NEW entities, attributes, cardinality, junction tables, conceptual/logical/physical, normalization, model families | Produce ERD and data dictionary for people, teams, memberships | Draft in data lab companion; not registered |
| D2 `data-integrity-quality` | D1; reuse `database-branching-recovery` for FK/transaction intro | NEW failure modes, consistency, unique identity, NULL/unknown, data validation, deduplication, idempotency, reconciliation | Reject invalid and duplicate records and explain constraints | Draft in lab companion; not registered |
| D3 `data-privacy-governance` | D1+D2; reuse `privacy`, `better-auth-gtm-workspace`, `security-hardening-release-gates` | NEW record-level classification, retention, purpose, owner/steward, field access, deletion, provenance | Create classified field matrix and block unauthorized disclosure | Draft in lab companion; not registered |
| D4 `data-engineering-contracts` | D2+D3; reuse `mcp-vs-rest-api`, `integration-registry-finops`, `background-job-recovery` when integrated | NEW source/target lineage, batch vs streaming, ETL/ELT, reconciliation and schema-change contract | Trace synthetic HRIS→registry import with idempotent replays | Planned |
| D5 `analytical-semantic-modeling` | D2+D4 | NEW OLTP vs OLAP, dimensions/facts, events vs state, metric definitions, data freshness, slowly changing history | Explain an accurate headcount metric with effective dates | Planned |
| D6 `data-architecture-decisions` | D3+D4+D5; reuse `cms-fundamentals`, `database-branching-recovery`, SDLC spine | NEW decision matrix for relational/document/graph/vector, contracts, migration, restore, cost and operations | Submit justified model/architecture choice and release evidence | Planned |

### Domain orientation and why this is not another full-stack course
- Software delivery covers build, test, Docker, IaC, release and recovery. Data path links to it, rather than teaching its lifecycle again.
- CMS covers authoring/content schemas; data path covers business entities, integrity and lifecycle, not publishing platforms.
- AI path owns LLM inference, tools, evaluations and agents. Data specialization covers retrieval inputs, provenance, structured vs unstructured data, embeddings and access boundaries as optional transfer labs.
- Existing general `privacy` covers protecting inputs; new governance module covers field-by-field data policies and accountability in database design.
- Existing database branching lesson covers platforms and recovery; new modeling and quality focus on business meaning and constraints.

## Gap and overlap audit (priority)
P0 missing: coherent entity-relationship/junction-table lesson, conceptual→logical→physical distinction, normalization tradeoffs, natural vs surrogate keys, constrained write failures, row/field classification and owner/retention matrix, reproducible independent pilot and assessment rubric.
P1 missing: ingestion contracts and change compatibility, history and effective dates, lineage, metric semantics, master/reference data and reconciliation.
P2 missing: graph/semantic/vector deep dives, distributed consistency and streaming, multidomain master-data governance, advanced privacy engineering.
Overlap to prevent: SQL syntax, introductory databases/backup/provider selection, generic privacy, HTTP/API fundamentals, CMS schema intro, SDLC, CI/CD, agent runtime.

## Reusable teaching standards (link, don't copy policies)
- Lesson: why → mental model → worked fictional example → vocabulary → misconceptions → guided try → independent try → TWO reasoning checks with answer-specific explanations → transfer and evidence.
- Lab: synthetic seed fixture, expected result, negative/permission cases, reset, no paid API or credentials, exact validation instructions and rubric, manual learner observations.
- Data model review: purpose, entities/attributes, IDs, cardinality, normalization rationale, data dictionary/types, constraints, lifecycle, classification, access rules, provenance/source of truth, retention/deletion, migration plan, test evidence.
- Quality gates: uniqueness, referential integrity, domain validation, consistency, completeness, freshness, reconciliation, schema compatibility, negative testing, privacy-safe logging, rollback/restoration exercise as applicable.
- Canonical standards: `technical-docs-platform/engineering/baseline-v1.md`, source verification and privacy/security guidance, risk-tiered acceptance. No parallel cross-repository standard.
- Privacy: use only fictional/synthetic people and organizations, no unapproved HR/employee data, secrets, customer records, or live writes; no analytics instrumentation without privacy assessment.

## Implementation sequence and acceptance gates
1. Inventory verified from current main and #238 audit, mark proposed vs implemented honestly. Keep this file as the **crosswalk**, not a new registry.
2. Wait for owner decision on #238 vs #233; reconcile #279 and #260 updates without overriding #238's navigation. No merges or releases in this task.
3. Pilot D0→D1→D2→D3→applied Registry Lab using the companion `docs/builder-academy/data-modeling-integrity-privacy-pilot.md`; no new catalog records yet.
4. Independently check: (a) identify entity-vs-attribute, (b) resolve many-to-many, (c) reject duplicate/foreign-key-invalid row, (d) enforce access and retention, (e) transfer to GTM opportunity context.
5. Learner test with 3–5 people at different experience levels only after consent; capture prerequisite confusion, independent completion, safe failure and accessibility issues. No fabricated telemetry.
6. On acceptance, register **only** missing D1–D3 lessons with immutable slugs in existing `lib/ai-academy.ts`; append one `data` path to existing `lib/academy/learning-paths.ts` **after #238**, preserving all nine paths and catalog order. D4–D6 follow later.
7. CI tests for unique IDs, valid prerequisites, no cycles, path coverage, outcome/assessment coverage and fixture integrity; browser review at 375/768/1280, keyboard, zoom and screen reader; explicit owner sign-off then release.
8. Track documentation PR and acceptance in existing Academy Linear project; do not create a new LMS, a new project database, or a duplicate SDLC issue.

## Decision and review conditions
Adopt as proposed instructional architecture only. Owner approval required for registration/navigation, cross-PR merges, deployment, new data persistence or external integrations. Revisit when #238 changes, course registry evolves, learner feedback reveals gaps, or source-of-truth standards are updated.
