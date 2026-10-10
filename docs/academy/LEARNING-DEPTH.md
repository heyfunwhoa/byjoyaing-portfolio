# AI Academy — Learning depth and assessment specification
Status: curriculum expansion proposal, not implemented functionality.
Reviewed: 2026-10-10. Applies to existing AI Academy lessons and five playground labs in PR #20.

## Instructional design contract

Every lesson should include:
1. **Why it matters:** task or mistake it prevents.
2. **Mental model:** plain-English definition and analogy, plus where analogy breaks.
3. **Worked example:** realistic *fictional* or sourced/public scenario with visible inputs and outputs.
4. **Key vocabulary:** 3–5 linked terms, one sentence each.
5. **Common misconceptions:** at least two with counterexamples.
6. **Try it:** safe interactive or paper exercise.
7. **Knowledge check:** two questions that test reasoning rather than memorization.
8. **Feedback:** explain correct and incorrect choices and why.
9. **Apply it:** link to relevant GTM, cybersecurity, or software project.
10. **Proof:** describe evidence that learner can perform skill unaided, plus source refs, review date and next lesson.

Use Learn → Demonstration → Guided practice → Independent practice → Feedback → Reflection → Transfer. Let experienced learners skip ahead. Link to Builder Academy rather than duplicate deep software-engineering lessons.

## Existing lesson deep dives

### 1. AI, models and assistants
- Explain algorithm vs ML model vs LLM vs product UI vs tool vs workflow vs agent with a single labeled architecture diagram.
- Distinguish pretraining, inference, retrieval and tool calls.
- Example: answering from general training vs retrieving a dated LimaCharlie page.
- Misconceptions: app equals model; search results equal truth.
- Assessment: classify six scenario cards; choose which needs fresh retrieval.

### 2. Evolution from rules to agents
- Teach rules, supervised ML, neural networks, transformers, generative models, tool orchestration.
- Example: categorize inbound leads with rules vs classifier vs LLM workflow; identify automation cost and verification needs.
- Misconceptions: every automation is an agent; newer AI always superior.
- Assessment: select simplest safe architecture for three work tasks.

### 3. Prompting
- Components: task, audience, inputs, boundaries, output, validation.
- Show baseline vs revised prompt vs output, annotate exactly what improved.
- Distinguish prompt instructions from untrusted evidence text.
- Assessment: score a fictional account-research prompt for missing constraints and ungrounded assumptions.

### 4. Source verification
- Explain primary vs secondary source, identity, provenance, publication date vs fetch date, quote support, inference, refutation, conflict, freshness.
- Example: fictional claim 'supports all clouds' vs documentation that names AWS and Azure.
- Assessment: label verified, unsupported, refuted and unknown separately; quote exact supporting passage.

### 5. Privacy and responsible use
- Explain data classes, minimum necessary access, secrets, PII, prompt injection, retention, tool permissions, human approvals.
- Example: safe fictional meeting recap vs confidential customer transcript.
- Assessment: identify unsafe steps and propose an approved alternative.

### 6. GTM research workflow
- Separate events/signals from commercial hypotheses, and vendor marketing from independent evidence.
- Example: funding announcement is a fact; purchase intent is not established.
- Assessment: draft a cited brief and three discovery questions with explicit unknowns.

### 7. Skills
- Define prompt vs skill vs agent vs API integration; demonstrate a focused SKILL.md and two evaluations.
- Example: source verification skill with input, procedure, output, failure boundary, test and version.
- Assessment: decide when to promote a repeated prompt; identify missing safety checks.

## Existing playground depth

### Source Detective
Upgrade from 'choose one answer' to: highlight quote → identify source/version → classify claim → explain confidence/uncertainty → see feedback.
- Scenarios: capability overclaim, buying signal/hypothesis, editorial vs meaningful change, source contradiction, prompt injection.
- Grading dimensions: exact support, source relevance, distinctions between not-supported and disproven, appropriate abstention.
- Guardrail: deterministic fixtures must not claim real vendor capability.

### Prompt Studio
- Offer before/after examples and an optional fictional starter task.
- Explain why each of six fields matters, with a helpful hint and a pitfall.
- Separate structural completion from actual quality. Scoring 'six fields filled' is **not** proof of a good prompt.
- Future evaluator: test outputs against a small ground-truth rubric with human review.

### Model & Tool Selector
- Inputs: task, need for fresh information, approved data classification, tool availability, offline requirements, budget, latency, auditability.
- Outputs: recommended *approach*, at least one alternative and explicit trade-off.
- Avoid unverified latest-model rankings or pretending a choice was tested.
- Teach when plain code/rules are better than a model; distinguish RAG from web research.

### Build a Skill
- Example skill: source-verification; walk through purpose, trigger, inputs, steps, output schema, failure cases, validation, security.
- Provide one normal and one failure/edge-case evaluation for each generated draft.
- Explain skill portability is conditional on the host and skill specification. Keep scripts and access permissions scoped.
- YAML/frontmatter requires correct escaping and validation; an eight-field completeness check is not formal SKILL.md verification.

### Research Pipeline Simulator
- Show separate concepts: project → canonical source → immutable version → evidence anchor → reviewed claim → downstream insight.
- Explicitly show capture attempts vs stored versions, content hashes vs meaningful differences, and error paths.
- Add scenarios for transient provider failure, oversized/truncated content, page reorganization, contradictory evidence, failed authorization and stale claims.
- Compare simulated teaching state to real Account Signal Engine architecture; never write into live research records from the public lab.

## Assessment and evaluation plan

Phase A: deterministic unit tests for scenario definitions and feedback correctness.
Phase B: accessibility tests for keyboard navigation, responsive layouts, screen-reader labels and error announcements.
Phase C: learner pilot of 3–5 people with different experience; collect task completion, misconceptions and content clarity *with consent*.
Phase D: versioned rubric updates; protect reproducibility by recording fixture versions and change notes.

Metrics: completion rates, correctness by learning objective, retries, clarity feedback and transfer to a real task. Don't equate dwell time with learning.

## Progressive lab learning paths

**Beginner:** AI/models → prompting → Prompt Studio → verification → Source Detective.
**GTM:** basics → grounded research → Source Detective → account brief → privacy review.
**Builder:** foundations → Git/API/database lessons → Research Pipeline Simulator → Build a Skill → evals and PR review.
**Leadership:** AI capabilities/limitations → safe tool selection → model/tool selector → human review and adoption governance.

## Priority delivery gates
P0: review/fix current code and tests; add navigation; improve factual review/source provenance; correct quiz feedback.
P1: deeper worked examples and explanation of incorrect choices; integrate lab prerequisites and completion evidence.
P2: simulated evidence highlighting, skill fixture evaluation and provenance visualization.
P3: opt-in persistence, secure account integrations, model-based feedback only after evaluations and privacy review.

## Content governance
Canonical lesson source in GitHub. Notion catalogs learning content and links to code. Each source-backed lesson needs owner, source URL, last checked and next review. Model/vendor-specific claims require explicit date and verified official reference. No real customer/internal data in public exercises.
