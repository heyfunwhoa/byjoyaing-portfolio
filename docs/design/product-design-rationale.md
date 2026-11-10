# Product design rationale and decision record

**Owner:** Portfolio design and experience. **Canonical workflow:** Design Lab → evidence and comparison → implementation PR → acceptance → component-adoption record. This is a decision framework, not a second registry, product database, or approval service.

## Why this exists

The portfolio has working components and code-level checks, but a passing component test does not answer whether visitors understand the content or complete their goals. Before proposing new motion, carousels, tables, or navigation, document the reader task, plausible alternatives, actual evidence, tradeoffs, and evaluation plan.

## Decision template

Copy this section into the related issue or PR, then link it from `docs/design/component-adoption.md` when adopted.

- **Decision ID / owner / date / status:** proposed | testing | adopted | rejected | revisit.
- **Surface and journey:** page and entry → decision → next action, with links to actual code/routes.
- **Audience and job:** who is visiting, what they want to learn or do, and how confident we are in this persona. A founder, hiring manager, and technical reviewer are *hypothesized* audiences until validated.
- **Problem statement:** observable friction or unmet question; cite screenshot, session observation, test, feedback, or analytics. If no evidence, label this a hypothesis and define the observation needed.
- **Desired outcome and task:** state what success looks like in visitor language, including a suitable fallback path.
- **Current baseline:** what exists today and what it already does well; source path, screenshot date, behavioral state.
- **Alternatives:** (A) no change/static baseline; (B) reuse existing design pattern; (C) proposed change. Explain strengths, costs, attention burden, accessibility, content effort and maintenance for all three.
- **Rationale:** why this option is expected to improve the specific task, and when *not* to use it. Visual appeal alone is not success.
- **Content and evidence contract:** source of claims, example vs measured outcome, prototype vs production, permission to show real assets, last verification, missing content state.
- **Interaction contract:** keyboard/focus, touch, reduced motion, screen reader, 375/768/1280px, 200% zoom, empty/error states, URL/back behavior, performance budget where material.
- **Study plan:** test scenario, participants or proxy method, success/struggle observations, evidence links, limitations. No claim of a real user test if only CI was run.
- **Decision and threshold:** adopt only when it solves the reader task without harming baseline navigation or clarity; defer otherwise. Name the owner and revisit trigger.
- **Implementation and rollout:** component family/registry source, PR, Storybook demo, affected routes, QA results, production status, rollback path.
- **After launch:** observable outcome (e.g. task completion or case-study reach), collection limitations, next review. Never infer visitor understanding solely from clicks.

## Initial audience hypotheses (not validated interviews)

| Audience | Initial question | Proposed path | What to observe |
| --- | --- | --- | --- |
| Founder / CEO | Can this person connect revenue strategy to execution? | Home → Work → a decision-rich case study → Contact | Can they find a credible contribution and next action without explanation? |
| CRO / hiring manager | What scope, decisions and repeatability did they own? | Home → About / Work → relevant evidence → Contact | Can they distinguish outcomes from proposed work? |
| Technical reviewer | Is the technical work credible and source-aware? | Side Quests → Projects search → Atlas / Account Intelligence | Can they locate provenance, limitations and current implementation status? |

## First three decisions to evaluate, not preapprove

1. **Home motion:** baseline static editorial introduction vs CSS reveal vs richer animation. Adopt only if orientation improves and content remains visible with reduced motion; avoid decorative continuous loops.
2. **Projects discovery:** current searchable/filterable directory vs additional carousel vs simple sorting affordance. Preserve full directory, query context and keyboard access. Confirm whether visitors need comparative scanning before adding another rail.
3. **Case-study narrative:** current text-first explanation vs evidence-first layout vs captions + explicit limitations. Prefer verified figures. Test whether a visitor can state the problem, contribution, demonstrated evidence and unverified claims.

## Design review scoring

Use qualitative outcomes: **clear**, **uncertain**, or **blocked**, for (1) audience/task fit, (2) content hierarchy, (3) findability and wayfinding, (4) interaction feedback and recoverability, (5) accessibility/responsive behavior, (6) performance and motion discipline, (7) evidence integrity. These are review labels, not numerical scores or measured user outcomes.

## Review and promotion

1. Inspect current source and actual rendered state. For a UX audit, capture real screenshots before findings; code inspection is an inventory, not visual proof.
2. Record a baseline and at least one alternative in the existing Design Lab.
3. Run keyboard, browser, visual, responsive and source/claim QA. Record which manual checks have **not** been run.
4. Make a scoped PR, link to rationale and the existing adoption record; keep Design Lab unavailable in production.
5. Approve the public adoption per-page, then verify live deployment and collect actual reader feedback. Don't promote all lab variants by default.

**References:** `docs/design/workbench-reuse.md`, `docs/design/design-lab.md`, `docs/design/component-adoption.md`, `docs/brand/brand-guidelines.md`, `tests/site/visitor-journey.spec.ts` (merged in PR #330). Track work within portfolio roadmap #322.


## Practical operating standard: intake to learning

This section complements the decision template above. Use it for **meaningful experience choices**, not every minor code change. Linear [KRU-312](https://linear.app/krusty/issue/KRU-312) is the delivery owner and [KRU-317](https://linear.app/krusty/issue/KRU-317) is the independent research/baseline track. The Design Lab remains an exploration/teaching tool, not a project-management, approval, or analytics database.

### Choose a path at intake

| Route | When to use | Minimum evidence and output |
| --- | --- | --- |
| Direct fix | A confirmed broken control, navigation path, regression, or established accessibility behavior | Reproduction, expected behavior, correction, and regression check in the destination PR |
| Design experiment | The user task is reasonably understood, but the appropriate layout or interaction is uncertain | Baseline, two or three plausible alternatives, tradeoffs, a test question and Design Lab/Storybook links |
| Research first | Target audience, task, or alleged friction is insufficiently understood | Task scenarios, actual observed/captured evidence or explicitly labeled hypotheses, findings and handoff to a scoped design decision |

Record audience/task, observed evidence or hypothesis, impact, existing patterns/PRs, owning issue, path chosen and why. Research can run concurrently with implementation of unrelated foundations. Do not require a large intake form or a new status system.

### Qualitative product-design review

For each dimension record **Clear**, **Needs revision**, **Blocked**, or **Not checked**, plus evidence/source and unresolved limitation. Do not average or turn these into made-up quantitative usability scores.

| Dimension | What to inspect |
| --- | --- |
| User task and hierarchy | Can visitors understand what matters and the next action? |
| Wayfinding and discovery | Can visitors locate Work, Side Quests, Projects and relevant evidence? |
| Interaction and recovery | Are controls understandable, responsive, reversible and keyboard-usable? |
| Accessibility and responsive use | Semantics, focus order, screen reader, reduced motion, zoom and small screens |
| Content design and evidence | Clarity of titles, CTAs, terminology, source attribution and honest claims |
| Performance and maintainability | No unnecessary motion, code dependencies, duplicate components or runtime costs |
| Validation quality | Were actual tasks and users observed, or only proxies/automation? |

A blocker affecting the primary task, misleading content, or essential accessibility prevents public adoption even when CI passes. An engineering test is evidence about software behavior, not visitor comprehension or WCAG conformance.

### Content design and progressive disclosure

A project story should make **problem → contribution → demonstrated example/evidence → limitations → next action** findable. Use descriptive headings and link labels, distinguish Work from independent Side Quests, explain technical terms for a hiring audience while retaining source attribution, and keep essential claims and caveats visible. Disclosure may hide deep technical details, never the central contribution, factual/prototype boundary or next action.

Every screenshot, quote, outcome or testimonial must be approved and source-identified. A fictional demo, illustrative sample, planned integration or unmeasured benefit must be named as such. Do not fabricate impact metrics.

### Acceptance and lifecycle vocabulary

The following describe one **destination feature or decision**, not a new component-registry lifecycle:
1. **Prototype:** an experiment exists locally or in Design Lab, without production approval.
2. **Technically verified:** exact-head lint, tests, build, security and applicable browser/visual checks passed.
3. **Accepted:** responsible owner reviewed content, interactions, accessibility evidence and documented any unperformed manual tests/exceptions.
4. **Released:** merged destination PR and production deployment/route verified.
5. **Evaluated:** original visitor task revisited against baseline using actual observations or clearly labeled missing data.

Do not equate those states with the existing catalog's Candidate/Prototype/Approved/Adopted vocabulary. No automatic approval or deployment from the Lab. The destination repository and its PR own code and release, Linear owns work and acceptance, and `docs/design/component-adoption.md` records the decision.

### Post-release learning and stop condition

Before implementation: identify the baseline, intended behavior, audience/task and an observation plan. After a meaningful release: record deployed revision, what was actually observed (task completion, confusion, feedback, accessibility or recovery issues), methodological limits, and a **keep / iterate / roll back / defer** decision. If no credible observation is available, say **Not yet measured**. Click counts and passing CI are not proof of comprehension. Assign the owner and a concrete event that would trigger reconsideration rather than automatically installing an analytics platform.

**Stop rule:** perform one end-to-end cycle (KRU-317 research + KRU-314 connected Lab + KRU-315 Home decision), then simplify or eliminate any process step that did not lead to clearer decisions. No new database, mandatory form, paid research vendor, generic score engine, or design system duplication.
