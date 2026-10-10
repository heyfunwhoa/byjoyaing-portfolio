# AI Foundations Playground — first implementation

Route: `/ai-academy/playground` (not linked into global navigation until reviewed).
The three labs use fictional content and deterministic evaluations. No live AI or retrieval, no account data, storage, API keys, or external network calls.

## Included
- Source Detective: three synthetic cases (capability overclaim, financing/buying hypothesis, editorial documentation change) with explicit answer rationale and reset.
- Prompt Studio: six-part prompt structure and transparent completeness rubric; can copy a draft.
- Model & Tool Selector: simple decision tree prioritizing sensitive/offline constraints, never unverified rankings.
- Unit tests for lab fixtures, grading, missing fields and sensitivity precedence.

## Follow-up quality gates
- Validate Node TS test execution and production build in local Cursor environment; adjust `npm test` script to include the new test only after verified.
- Accessibility/manual browser test: keyboard tabbing, screen reader feedback, focus, radios, responsive layout.
- Copy action should visibly confirm success/failure and use supported browser permissions; future UX improvement.
- Review language and references before publishing lessons.
- Coordinate routing/navigation with open Builder Academy PR #16 and the unified Academy documentation PR #19 to avoid merge conflicts.
- Extend into evidence-to-source-version visualizer only with synthetic data and carefully evaluated scoring.
