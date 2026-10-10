# Unified Learning Platform — AI Foundations + Builder Academy

**Status:** proposed curriculum and product architecture (not an assertion that labs are implemented).
**Last reviewed:** 2026-10-10.
**Canonical implementation:** `/ai-academy` in this repository. Keep the existing seven-lesson MVP and PR #16 Version Control Playground; do not create a competing app/repo.
**Other references:** [AI Command Center](https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03), [existing academy MVP](../ai-academy.md).

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
