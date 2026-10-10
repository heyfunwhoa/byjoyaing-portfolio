# AI Playground — Lab blueprints (not yet implemented)

Goal: experience how AI methods work with **safe simulations** before needing accounts, API keys or paid services.

## Lab A — Prompt Studio (P0)
**Level:** Beginner, 10 minutes.
**Scenario:** Turn an ambiguous request into a useful one, using fictional GTM account research.
**Inputs:** objective, audience, available sources, constraints, required format and validation step.
**Feedback rules:** check each field is present, meaningful, specific; flag unverifiable demands; suggest one clarification.
**Outputs:** assembled prompt, copy action, readable rubric and revision checklist.
**Privacy:** content remains in-browser; no API call or storage by default.
**Checks:** blank fields, unsafe requests for private customer data, keyboard-only input, small screen, copy failure.

## Lab B — Source Detective (P0)
**Level:** Beginner, 12 minutes.
**Scenario:** Two synthetic vendor pages contradict a security capability claim, and one page lacks a publication date.
**Task:** Label each passage as primary/secondary, identify exact supporting/refuting excerpts, assign Verified/Unknown/Needs Review, explain why.
**Feedback:** inspect quote inclusion, source identity, capture freshness and contradictions. No model judges truth.
**Outputs:** evidence table and score based on a versioned fixture and rubric.
**Checks:** mismatched quote, contradictory version, stale evidence, source missing, injected instructions.
**Related system:** Account Signal Engine source snapshots and claim evidence.

## Lab C — Model & Tool Selector (P0)
**Level:** Beginner, 8 minutes.
**Inputs:** task, sensitivity, access to web/files/tools, latency/budget, desired format.
**Feedback:** transparent decision tree with trade-offs (e.g., static rules vs web-grounded assistant vs retrieval). Do not assert brand-specific model superiority without tests.
**Outputs:** recommended workflow type, 2 alternatives, risk/validation steps.
**Checks:** disallowed sensitive data, missing citations, no budget, no API, offline-only requirements.

## Lab D — Build a Skill (P1)
**Level:** Intermediate, 15 minutes.
**Task:** Create a `SKILL.md` skeleton: trigger, purpose, prerequisites, inputs, procedure, output, checks, failure paths, security and tests.
**Output:** editable plain-text draft and an example case.
**Feedback:** schema completeness + simulated edge case; not execution by a real agent.

## Lab E — Research Pipeline Simulator (P1)
**Level:** Intermediate, 15 minutes.
**Scenario:** Fixture URL → canonical source → capture version → dedup/hash → quotation → claim → human review → brief.
**Input:** choose fixture variation: original, identical, changed, contradictory, injection text.
**Output:** visual state changes and why records were created/reused/flagged.
**Important:** Demonstration only; production stores real immutable versions and authentic provenance. Never present fixture quotations as fresh LimaCharlie statements.

## Lab F — API / Git / CI Lab (existing Builder Academy effort)
**Level:** Beginner to intermediate.
**Reference:** PR #16 adds Version Control Playground. Do not rebuild it. Later add API status code and data lifecycle labs.
**Output:** clear simulated consequences, retry vs fix decisions, security notes and a connection to existing repos.

## Common assessment metadata
`exercise_id, version, difficulty, goal, sample_fixture_id, grader_type, expected, rubric, privacy_class, reviewed_at, outcomes[]`

## UX acceptance criteria
- Every lab shows **Learn → Try → Feedback → Reflect → Next**.
- Good default example, one task per screen, progress indicator, immediate actionable feedback.
- Accessible forms with labels, error summaries, keyboard navigation, reset, responsive text sizes and color-independent statuses.
- Deterministic sample data and no pseudo-real vendor quotations without a fixture label.
- Distinguish simulated evaluation from real LLM evaluation; transparent scoring.
- No live providers, background jobs, authentication or customer data in playground v1.
