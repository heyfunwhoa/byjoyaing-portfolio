# Frontend lesson pilot: diagnose one project card

Status: concrete instructional brief and provisional source comparison; not implemented UI or a completed KRU-176 experiment.
Reviewed: 2026-10-30.
Owner: byjoyaing-portfolio. Tracking: [KRU-176](https://linear.app/krusty/issue/KRU-176), [KRU-177](https://linear.app/krusty/issue/KRU-177), [KRU-178](https://linear.app/krusty/issue/KRU-178).
Scope: `frontend-building-blocks` only. This is an implementation brief under [PROGRAM](PROGRAM.md), not another PRD.

## Learner and observable outcome

A business/sales learner with no required earlier lesson can identify whether a fictional project-card defect belongs to content/props, styling, behavior/accessibility or routing, explain why, and choose a verification step. Programming Foundations is optional preparation. No installation, login, real credentials or paid inference is needed.

Success evidence: two reasoning checks with explanatory feedback plus an independent card diagnosis with a self-review rubric. Reading, selecting a correct answer, and demonstrating independent understanding are different evidence. Do not award mastery or persist progress from this pilot.

## Inspected implementation and ownership

| File | Existing responsibility | Planned treatment |
| --- | --- | --- |
| lib/ai-academy.ts | Stable catalog identity, summary, takeaways, existing check and sources | Preserve the Frontend record; no duplicate ID |
| lib/academy/lesson-guidance.ts | Prerequisites, optional preparation and project-card practice link | Preserve and connect only if needed |
| components/ai-academy/academy.tsx | Selection, responsive lesson picker, reading panel, temporary reviewed state, sequence | One scoped pilot call site; coordinate with account PR #234 |
| docs/builder-academy/frontend-building-blocks.md | Detailed explanations, project-card worked example, existing questions and references | Reuse its instructional material; keep companion as deep reference |
| docs/builder-academy/editorial-project-card.md | Existing independent card practice | Preserve link and avoid a competing exercise |
| content/academy/lessons/ | Existing three editorial overlays | Frontend is not one of these records; do not add a duplicate editable source |
| docs/design/component-adoption.md | Component reuse evidence | Add actual consuming paths and verification after implementation |

The current Academy renderer uses React state and native HTML controls. It does not automatically turn companion Markdown into a full lesson. Its desktop lesson list and narrow-screen select already exist; the pilot should preserve these. Current source selection is in-memory state, so do not claim durable per-lesson deep links. Any URL change needs separate explicit design and tests.

Suggested new component if existing guided-lesson composition cannot fit: `components/ai-academy/frontend-lesson.tsx`, mounted only for this stable slug. First inspect `guided-programming-lesson.tsx` and `lib/academy/guided-lessons.ts` before choosing. Avoid turning a one-lesson experiment into a universal renderer rewrite.

## Side-by-side source comparison

This table is a desk comparison, not the required rendered prototype.

| Concern | Adapt current components | Fumadocs candidate |
| --- | --- | --- |
| Lesson navigation | Existing catalog, picker and sequence remain | Docs page layout provides contents/footer/breadcrumb features; map to Academy semantics |
| Instruction | Add short sections, worked example, feedback and transfer | Layout/Steps can organize the same content; assessment still needs Academy-specific logic |
| UI family | Existing Radix family and native controls | Official docs support Base UI and Radix, with Base UI the default; explicitly retain Radix if trialed |
| Authoring | Preserve TS catalog, guidance and current Keystatic overlays | Prove content adapter against current records; do not assume an MDX migration is necessary or approved |
| Branding | Reuse current tokens and spacing | Map candidate styles locally; inspect resets/providers and avoid global theme replacement |
| Navigation/progress | Preserve self-reported session reading semantics | Documentation navigation does not establish assessment or saved progress integration |
| Bundle/runtime | No new dependency proposed; actual build delta unmeasured | Version, transitive dependencies and built route delta must be measured in the experiment |
| Migration effort | Bounded single call site; implementation effort unestimated | Adapter/provider/theme work unestimated pending runnable experiment |
| License | No external source copied for this brief | Official repository identifies MIT; inspect exact pinned package license before importing |

**Provisional recommendation: adapt existing components for this one lesson; defer framework adoption unless the runnable comparison shows a concrete benefit.** The missing learning sequence is not by itself evidence that a documentation framework is required. This is a recommendation for review, not a completed adoption decision.

Sources inspected 2026-10-30:
- https://www.fumadocs.dev/docs/ui
- https://www.fumadocs.dev/docs/ui/component-library
- https://www.fumadocs.dev/docs/ui/layouts/page
- https://www.fumadocs.dev/docs/ui/components/steps
- https://www.fumadocs.dev/docs/manual-installation/next
- https://github.com/fuma-nama/fumadocs

No Fumadocs package installed or version pinned in this change. Current docs establish advertised capabilities, not compatibility with this repo's exact Next/React versions.

## Concrete lesson sequence

### 1. Objective and section navigation

“You will trace a project card through its content, component, styling and link, then choose where to investigate a problem.”

Visible section links: Understand → Worked example → Practice → Check understanding → Apply independently → Next.
Core explanation stays visible; optional extra detail may use native disclosure. A wide table is not required for the main lesson.

### 2. Mental model and vocabulary

A card is like a labeled display: the content supplies the words, the component organizes them, styling controls appearance, and links or controls determine what happens. The analogy does not describe data fetching or server authorization.

- **Component:** a reusable piece of interface that renders content.
- **Props:** values passed into a component.
- **Styling:** rules for spacing, color, wrapping and responsive layout.
- **Route:** the application location reached by a URL.
- **Verification:** a specific check that provides evidence about the intended behavior.

### 3. Worked example

Reuse the existing fictional ProjectCard example from the companion guide. Show title, summary and descriptive link, then annotate:
1. Title and summary props supply the content.
2. Article, heading and anchor supply semantic structure.
3. Existing Tailwind utilities supply layout and visual styling.
4. The href supplies the destination; a correct-looking card does not prove the route exists.
5. Focus styles and keyboard operation help make navigation usable.

Keep code as selectable text with contained overflow. Show the same meaning in plain language. A graphic is optional; do not add a decorative illustration or graph library.

### 4. Guided practice

Fictional input: a card shows the expected title and summary on desktop, but a long title runs outside its boundary on a phone.

Ask the learner to choose the first investigation:
- Content source/props.
- Styling and responsive layout.
- Replace the application framework.

Feedback:
- Content: the scenario says the words are correct. Inspect content when the words themselves are wrong.
- Styling: correct first investigation. Inspect wrapping, minimum widths and layout at the failing viewport.
- Framework: not justified by this evidence. First isolate the local layout rule.

Then ask: “What would you verify after the change?” Reveal the example answer only on request: long and short titles at narrow widths and 200% zoom, with readable text and no unintended page-level horizontal scroll. A viewport check alone does not prove all accessibility requirements.

### 5. Two reasoning checks

**Check A:** A card is readable and correctly styled, but “Read the project” opens a missing page. Where should you investigate first?
- The href, matching route and deployed revision. Correct: inspect the navigation chain and test the actual destination.
- Increase padding. Incorrect: spacing does not create a route.
- Add an animation library. Incorrect: motion does not fix the destination.

**Check B:** A clickable div works with a mouse but cannot be reached by keyboard. What is the best first repair for navigation?
- Use a semantic anchor with a valid href, descriptive text and visible focus; test keyboard activation. Correct: navigation should be a link.
- Add a hover effect. Incorrect: hover does not provide keyboard operation.
- Mark the lesson reviewed. Incorrect: review tracking is not a repair or accessibility test.

Use labeled native radio groups with per-choice feedback and an explicit reset. Keep focus on the selected control; announce feedback politely. Do not auto-advance or hide wrong-answer reasoning. Correct answers do not automatically mark reading reviewed.

### 6. Independent transfer

“An event card has correct text, fits a phone, and opens the right page, but several links all say ‘Click here.’ Identify the concern, propose a better label, and explain how you would verify it.”

Self-review rubric:
- Identifies link purpose/accessibility and clarity rather than framework choice.
- Proposes a contextual label such as “Read the fictional event agenda.”
- Checks rendered accessible name, keyboard focus/activation and destination.
- States a limit: passing this check does not prove complete accessibility or learner mastery.

Written response stays local to the learner; no form submission, model grading or new storage. Offer the rubric as an optional disclosure. Keep the existing editorial-project-card companion exercise for deeper practice.

### 7. Next step

Recommend existing Storybook and visual regression material to learn component-state inspection, with CMS fundamentals as a content-authoring alternative. Use existing lesson selection/sequence mechanisms, not a guessed deep-link URL. Preserve current companion and source links.

## Responsive and interaction contract

- Phone (375px): one reading column, existing lesson selector, wrapping section links, stacked choices, minimum 44px interaction targets.
- Tablet (768px): same reading order, comfortable line length; no required second sidebar.
- Desktop (1280px): retain catalog sidebar; lesson content remains a single readable column. Add contents only if it does not squeeze the exercise.
- Keyboard: links for navigation, buttons for actions, labeled radio groups, visible focus, no drag/hover-only meaning.
- Motion: none required. No auto-scroll/auto-advance on an answer. Existing lesson-selection focus behavior remains.
- States: unanswered, incorrect with explanation, correct with explanation, reset, and optional rubric disclosure.
- No network/loading/error state is invented for a local deterministic exercise.
- New content must not conflict with optional account/save controls in PR #234.

## Verification and remaining work

| Acceptance | Current evidence | Still required |
| --- | --- | --- |
| Repo ownership and current bounded scope | PROGRAM and this brief | Review and merge |
| Exact instructional content | Sequence and answer reasoning above | Content acceptance |
| Existing-pattern source review | Current renderer, guidance, guide and workbench inspected | Inspect guided-programming implementation before adapting |
| Fumadocs alternative | Official documentation checked | Pin package/version/license; render equivalent content; measure build and styling impact |
| Mobile/keyboard/feedback | Behavior specified only | Implement, run browser checks, manually inspect |
| No regression to IDs/CMS/progress | Boundaries specified | Tests against chosen implementation |
| Learner effectiveness | No observations | KRU-178 learner review; record uncertainty honestly |
| Release | No merge/deployment in this task | Approved release and separately verified production |

Local workspace inspection found only a partial portfolio review harness, not a runnable checkout of this Next.js app. The runtime environment-status capability and policy snapshot were unavailable. No npm install, build, browser comparison or UI implementation was performed. This is a documentation checkpoint; KRU-176 remains In Progress, KRU-177 remains pending its decision. Do not lower the comparison acceptance criteria to claim completion.

## Resume in Codex

Use the existing repository checkout and current revisions, not a reconstructed app. Read AGENTS and the installed Next.js docs before code changes.

```text
Continue KRU-176 in heyfunwhoa/byjoyaing-portfolio using
docs/academy/FRONTEND-PILOT.md from PR #233 (or main if merged).
Verify current PRs #233, #234 and #235 before editing.
Preserve local work and reuse an existing relevant branch if present.

Complete the outstanding runnable comparison using the same lesson content:
A: existing Academy/native/Radix components;
B: a version-pinned, isolated Fumadocs option with its license and dependency
impact recorded. Do not migrate content, install a whole-site theme, or change
the global provider just for the experiment.

Record phone/tablet/desktop, keyboard, progress/CMS compatibility and built
bundle evidence. Recommend adopt/adapt/defer. Do not invent measured results.

After the decision is supported, implement KRU-177's single Frontend pilot
with the approved pattern and the brief's worked example, practice, two
checks, explanatory feedback, transfer rubric and next step.
Avoid duplicate content records, new persistence or changes to other lessons.
Coordinate the shared renderer with optional-account PR #234.

Run applicable tests/lint/build and inspect the rendered lesson. Record
manual checks not run and attributable actual effort/cost only if available.
Update existing Linear issues and open/update a focused PR. Stop before
merge/deploy; KRU-178 owns validation and release evidence.
```
