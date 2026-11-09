# Interactive storytelling and learning patterns

Status: **candidate inventory and pilot proposal**, not implemented specimens, product adoption, or release approval. Updated 2026-11-08.

## Scope and current implementation

- Canonical catalog: `lib/component-options.ts`; do not create another registry.
- DailySecrets: `heyfunwhoa/dailysecrets` has three parts (Code, People, Systems), a shared vanilla JS lesson engine, Stage-and-Rail layout, cumulative copy state, synthetic keys, Plain/Dev views, and a rotation sequence. Preserve it.
- Truffle Camp: separate Academy exercises already teach the same domain; link learning objectives instead of copying scenes, assessment, or content.
- Existing patterns are **not** recreated: chapter-based story, process illustration, existing quiz, InkJS branching, XState candidate, Twine candidate, motion trace, runbook/checklists, and feedback/disclosure categories.
- Open Design Lab work includes PRs #303 (interactive playground), #293 (learning explorer), #275 (pattern adoption), and #313 (project carousel). Reconcile before merging; avoid competing lesson IDs and changing their implementation.

## Candidate groups

1. Narrative: `story-journey`, `story-recap`, `story-replay`.
2. Causality and state: `story-living-system`, `story-explorer`, `story-what-if`, `story-comparator`.
3. Interaction and practice: `story-decision-feedback`, `story-predict-reveal`, `story-misconception`, `story-sandbox`.
4. Context and evidence: `story-evidence`, `story-hotspots`, `story-swimlane`, `story-perspectives`.

These are patterns (compositions of controls, semantics, content and state), not packages or installed libraries.

## DailySecrets pilot: one complete story before expansion

### Phase 0: baseline and overlap review

- Open current `dailysecrets/main` and relevant PRs; capture landing, first, midpoint, detect, verify, rotate, final screens in all three parts at 375 / 768 / 1440 CSS px.
- Test keyboard focus, interactive states, scrolling, reduced motion, 200% zoom, screen-reader announcements, and mobile order.
- Identify what already accomplishes stepper, cumulative copy tracking, contextual glossary, inline feedback and replay. Record actual gaps, not hypothetical replacements.
- Verify current source claims, made-up values, and detection/verification/rotation boundaries.

### Phase 1: high-leverage refinement

- **Story journey:** improve the existing rail if testing reveals orientation problems, not a second navigator.
- **Living system:** extend the existing cumulative copy map and pair it with a readable list. Show copy-location independently from credential validity. An old copy may remain after issuer revocation.
- **Decision feedback:** pilot one meaningful choice at a remediation scene, with correct/incorrect explanations, retry and an equivalent non-animated result.
- **Debrief:** at the conclusion, recap accumulated copies, issuer revocation, evidence and what was learned. Never claim that a button itself revoked a real credential.

Use the current journey data and engine. No graph library, second player, new framework, persistence, service integration, real credentials, or package until a measured requirement justifies it.

### Phase 2: learning experiments

- Compare baseline vs pilot with a small moderated usability test: can a first-time learner describe why deletion != revocation, identify at least two persistent copies, distinguish detection from verification, and name who can revoke?
- Trial `story-predict-reveal` or `story-evidence` only if the learner has a documented comprehension gap.
- Later evaluate role swimlanes, what-if, replay, hotspots, technical sandbox, misconception and perspective switcher as optional depth, not required steps.

### Phase 3: Design Lab adoption

- Add one local, fictional interactive demo with a responsive and keyboard-operable implementation to the existing Design Lab explorer, after reconciling PR #303 and #293.
- Distinguish `Candidate` from locally implemented and from verified adoption in DailySecrets. Link exact source paths and PR revisions.
- Publish usage guidance, alternatives, accessibility contract, failure/empty states, content schema, and tests. No automatic cross-repo dependency.

## Acceptance criteria

- All three existing DailySecrets journeys remain navigable; content and simulated secrets are unchanged except for separately reviewed editorial corrections.
- Current scene and interactive outcomes are perceivable by keyboard and screen reader; focus moves deliberately after state changes.
- At 375 / 768 / 1440 px and 200% zoom, no page-level unintended overflow or overlapping mascot/controls.
- Static equivalent for reduced motion; no autoplay requirement to understand consequence.
- Detection vs verification, issuer authority, remaining copies, and revocation validity are distinguishable without relying solely on color.
- No network activity to credential providers, saved learner state, real incident records, or fake production success.
- Existing tests plus exact-head lint/build/visual QA must pass; manual learner review remains separate.
- No merge/deploy without explicit owner acceptance.

## Ownership and execution order

- Design Lab owns the discoverable, reusable *pattern catalog and examples*.
- DailySecrets owns the actual story, data, scene engine and character animations.
- Builder Academy / Truffle Camp own canonical curricular goals and dedicated exercises.
- Technical Docs / Portfolio Ops track evaluations and adoption evidence, not duplicate pattern implementations.

**Next actionable task:** perform Phase 0 screenshot-and-interaction audit and log an evidence-based prioritized list; then build a bounded Phase 1 DailySecrets pilot in a separate draft PR.
