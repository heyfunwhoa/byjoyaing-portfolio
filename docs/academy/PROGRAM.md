# Unified Learning Platform — AI Foundations + Builder Academy

**Status:** proposed curriculum and product architecture (not an assertion that labs are implemented).
**Last reviewed:** 2026-10-30 (current inventory section; wider vision remains proposed).
**Canonical implementation:** `/ai-academy` in this repository. Preserve the existing catalog and Version Control Playground; do not create a competing app/repo. The seven-lesson MVP below is historical context, not the current catalog count.
**Other references:** [AI Command Center](https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03), [existing academy MVP](../ai-academy.md).

## Revenue enablement extension — 2026-10-13

The [Revenue enablement program and Trusted Handoff mission](REVENUE-ENABLEMENT-MISSION.md) captures the proposed two-track sales/building experience, internal and buyer personas, synthetic SDR-to-AE campaign, employer-overlay boundary, content ownership, maintenance and delivery gates. This is a scoped extension of this program, not a new Academy or implemented feature. Existing AI Foundations remain independently accessible. Its EP checklist is a proposed delivery plan; the curriculum audit remains the existing inventory. Reconcile its historical counts and holds against current source and PR status before implementation. No live employer integrations or public private-content publishing are authorized by this planning record.

## Current curriculum priorities

Use the [2026-10-30 curriculum audit](CURRICULUM-AUDIT.md) for the complete lesson/route inventory, source limits and priorities. The audited main snapshot contains 38 registered lessons; KRU-174 proposes 39 with background-job recovery and nine goal-based paths. Programming has two guided tutorials among ten module records. Systems already has two interactive examples and an infrastructure explainer alongside planned modules. The user authorized this audit, organization and one written recovery lesson. Broader new labs remain separate scope. This program is the wider vision; older phases below are historical proposals, not the current implementation queue.

## Current execution scope (2026-10-30)

This section supersedes earlier blanket implementation holds only for the bounded work below. It does not authorize every proposed phase in this document. [Linear project P-KRU-11](https://linear.app/krusty/project/builder-academy-lesson-experience-and-ui-3919add2048a) tracks execution; repository files own versioned implementation and instructional specifications. Notion remains the product strategy/requirements reference; no private content is copied here.

1. **KRU-174 / PR #233:** review the audited inventory, nine paths and written recovery exercise. As checked on 2026-10-30, the PR is open, not merged or deployed.
2. **KRU-176:** compare one Frontend lesson using existing components and a version-pinned Fumadocs experiment; document an adopt/adapt/defer decision. Source review is not a runnable comparison. See [Frontend pilot brief](FRONTEND-PILOT.md).
3. **KRU-177:** implement only the chosen Frontend pattern after the comparison decision. Keep existing lesson identity, editorial ownership, prerequisites and progress meanings.
4. **KRU-178:** validate the built lesson, collect honest manual/learner evidence, then use the repository's reviewed release process. Implementation, merge, deployment and verified release are separate.
5. **KRU-179–181:** extend to two lessons and optional diagram/sandbox experiments only after pilot validation.
6. **KRU-182–185:** map token/context, cost, evaluated workflow and trustworthy AI interaction content now; new exercise UI follows the validated pilot. The calculator is not a prerequisite for writing workflow content.

Optional accounts/saved reading stay in KRU-173 / PR #234; existing beginner progress stays with KRU-77; Keystatic ownership stays with KRU-75. Coordinate with release-framework PR #235 rather than creating another release policy. Recheck all PR states when resuming.

### Repository ownership

| Owner | Canonical responsibility | Academy relationship |
| --- | --- | --- |
| byjoyaing-portfolio | Public lessons, catalog, practice, UI, versioned content and tests | Implements this pilot inside the existing Academy |
| technical-docs-platform | Shared engineering/agent standards and reusable templates | Link the current standard; do not duplicate operational policy |
| Individual application repositories | Their own runtime, domain records, access controls and tests | Teach from reviewed public/synthetic examples; link to owning source |
| Linear | Committed scope, dependencies, estimates, status and evidence | Link issues/PRs; do not create a competing curriculum database |
| Keystatic | Editing approved structured public lesson records | Preserve existing overlay/schema ownership; no parallel Frontend record |
| Private Joy Index / employer systems | Private notes and confidential information | Never import into public lessons, fixtures, logs or commits |

Use the portfolio's project-card example for the first pilot. Account Signal Engine and Security Market Map are candidates for later evidence lessons, not audited implementation examples in this change. Verify each owning repo's current source and permissions before adapting it.

### Planning and delivery evidence

Use KRU-114 and the Linear delivery convention for human effort, agent contribution/runtime, elapsed delivery, costs, confidence and actual outcomes. Tokens are optional supporting diagnostics. Historical “AI-assisted hours” are not reliable forecasts. Lesson duration estimates are learner estimates and must remain separate from engineering effort.

## Product recommendation
One learning platform, two coherent entry points:

- **AI Foundations**: basic literacy → safe use → prompting → model/task selection → research → evaluation → workflows and skills.
- **Builder Academy**: engineering basics → file systems → Git/version control → web apps/APIs → data modeling → security → integration → deployment.
- **Applied paths** bridge both: GTM Intelligence, Security Research, Research Hub, Cybersecurity Frameworks, Enablement & Leadership.

Do not force people to complete the whole academy. Every learner can enter through **Learn**, **Practice**, **Solve a task**, or **Build**. Notion is the knowledge/reference catalog; GitHub contains canonical executable examples and version history; Cursor is the build/test environment. The academy UI consumes curated lesson metadata, not an unreviewed live Notion export.

## Principles
- People first, problem-driven, systems-minded: teach the **why**, then the **how**, then verification.
- Beginner-first explanations with definitions, analogies, runnable/synthetic examples, misconception and reflection.
- Progressive disclosure: one exercise at a time; glossary linked in context; optional deep dives.
- Accessible by default: text labels, keyboard operation, semantic headings, feedback, responsive layout, reduced-motion consideration.
- No fabricated capabilities or unverifiable best-model claims; show evidence and review dates.
- Protect privacy: synthetic/public fixtures only; no customer data, credentials or private Joy Index.
- Start local and deterministic before API credentials, paid inference or third-party integrations.

## Learner paths (recommended sequence)

| Stage | AI Foundations track | Builder Academy cross-link | Outcome |
|---|---|---|---|
| 0. Orientation | What AI is and is not; model vs app vs agent | Computer, OS, files and folders | Describe tools accurately |
| 1. Mental models | ML, LLMs, tokens, context, training vs inference | Inputs/outputs; API request/response | Explain a workflow |
| 2. Everyday use | Prompt structure, iterative prompting | Structured data, JSON/Markdown | Complete a verifiable task |
| 3. Trust & safety | Grounding, hallucinations, citations, prompt injection | Authentication, secrets, permissions, threats | Identify unsafe/unsupported outputs |
| 4. Decisions | Choosing models and tools for a task; cost/privacy/latency | System boundaries and integrations | Explain a justified selection |
| 5. Research | Search, extraction, provenance, freshness, RAG basics | URL/HTTP, databases, hashes, versioning | Produce a traceable research brief |
| 6. Reuse | Prompts → skills → agents; human approval | Git PRs, tests, CI, deployment | Package and validate a skill |
| 7. Application | GTM, cyber, documentation, productivity | Account Signal Engine and Security Market Map | Deliver a domain-specific artifact |
| 8. Measurement | Evaluation datasets, pass/fail rubrics, iteration | Automated tests, observability, budgets | Demonstrate measured improvement |

## AI Foundations modules (curriculum target, not all implemented)
1. **AI literacy** — history, ML/deep learning, generative AI; 2 lessons + one classification quiz.
2. **How language models work** — tokens/context/prediction/limitations; 3 lessons + context-window exercise.
3. **Model and tool selection** — ChatGPT/Claude/Cursor/Notion, retrieval/tools, paid vs local choices; 2 lessons + task decision lab. Keep product details date-checked.
4. **Prompting fundamentals** — objective, constraints, inputs, output, validation; 3 lessons + prompt improvement lab.
5. **Trust, security and responsibility** — citations, privacy, prompt injection, bias and oversight; 3 lessons + source-check challenge.
6. **Research and evidence** — sourcing, source quality, immutable versions, conflicting claims; 3 lessons + fixture research lab.
7. **Skills and workflows** — repetition thresholds, SKILL.md, tools, human-in-loop, simple evaluators; 3 lessons + skill outline lab.
8. **GTM specialization** — account research, competitor claims, persona insights, sales messaging, research-to-CRM approval; 3 lessons + fictional account brief.
9. **Builder specialization** — code, APIs, data modeling, integrations, tests, CI, secure deployments; link out to Builder Academy rather than duplicate lessons.
10. **Capstone** — controlled research source → evidence → supported brief → quality evaluation → human-approved publication. Use the public LimaCharlie fixture as a teaching reference; never imply actual customer/market claims without independent verification.

## Suggested lesson record
`id, slug, title, track, prerequisites[], level, estimated_minutes, outcomes[], definition, analogy, worked_example, misconceptions[], exercise_id, check_id, source_refs[], last_verified, review_due, status, canonical_repo_path`

Keep lesson content separate from UI; give each exercise a deterministic expected outcome. Avoid an LMS backend until real persistent progress is needed.

## Recommendation flow (future)
Inputs: **goal**, **role** (learner/AE/SDR/CSM/SA/leader/builder), **experience**, **allowed data**, **tool access**, **time**.
Outputs: 1) entry lesson 2) first task 3) starter prompt 4) upgrade path (skill/agent) 5) validation checklist.
Start with transparent **rule-based routing**. Only add model-powered recommendation if evaluations show a benefit; document why and review periodically. Never expose private/enterprise material in a public recommender.

## Boundaries and dependencies
- Shared AI Toolkit stores versioned skills, fixtures and eval rubrics. Academy uses linked/copyable examples, not sensitive live provider calls.
- Account Signal Engine owns account intelligence execution and its private research storage. Academy teaches its architecture with synthetic/public examples.
- Security Frameworks Hub, if built later, owns framework records/versions/mappings; Academy references lessons and citations rather than duplicating standards text.
- Joy Index remains entirely private, outside public repo and examples.

## Roadmap / release gates
**P0 Content**: audit existing seven lessons for accuracy and accessibility; add cross-links to Builder Academy; implement three deterministic practice labs with clear answer rubrics; add explicit provenance and reviewed dates.

**P1 Interactive playground**: isolated simulated prompts/research/evaluations; no credentials/network needed; save progress locally only with explicit consent and an accessible reset.

**P2 Skill builder**: validated SKILL.md template, one shared research skill, structured task evaluations, import/export via files only with file safety checks.

**P3 Personalization**: role-aware learning recommendations with rule-based algorithm, tests, transparent rationale; optionally gated user accounts and synced progress.

**P4 Connected workflows**: approved and authenticated connectors/API calls; per-user consent, audit logs, rate/cost limits, tenant isolation, vendor terms, and security review.

### Definition of done for each lesson/lab
- Observable objective, glossary, beginner explanation, realistic synthetic scenario.
- Deterministic grading/feedback and edge cases, including uncertainty handling.
- Visible state/reset; no hidden automatic submissions, no external calls by default.
- Keyboard and mobile checks, semantics, contrast, and accessible validation messages.
- First-party references when appropriate with checked dates; privacy classification.
- Tests, typecheck, lint, build, scoped feature-branch PR, documented UX/security decisions.

## Product navigation proposal
`/ai-academy` = shared Learning Home.
`/ai-academy/foundations` = learn AI concepts.
`/ai-academy/builder` = learn software development.
`/ai-academy/playground` = choose deterministic labs.
`/ai-academy/paths/gtm` = practical GTM exercises.
Retain `/ai-academy/version-control` and its redirect from PR #16; do not break existing URLs. Route names are proposed, not implemented.

