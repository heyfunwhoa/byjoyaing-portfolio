# Frontend lesson pilot: diagnose one project card

Status: single-lesson implementation and runnable comparison prepared on a feature branch; not merged or deployed. See the dated checkpoint below for current evidence; earlier provisional/environment notes are historical.
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

## Runnable comparison and implementation checkpoint — 2026-10-30

This section supersedes the earlier environment limitation and provisional recommendation. The brief above remains the instructional contract. Work is implemented locally on a focused branch based on PR #233, not merged or deployed. Linear issue details could not be refreshed: this session has no Linear connector and `linear.app` is denied by the network policy. Acceptance here is traced to the supplied resume brief; do not infer a Linear status update.

### Revision and scope

- Main inspected: `60a799285f746cc38f9806d4cefb4532fabd8026`.
- PR #233: draft, head `7b5c22e80114c9b5c86d0bc1704a73ba94b6bc57`; this branch preserves that curriculum work and should be reviewed as a focused stacked diff against `feat/academy-curriculum-audit-kru-174`.
- PR #234: draft, head `51cf817c1afdc691d13b8949a01c9c20889ad211`. Its optional account action is inserted beside the existing knowledge check. The pilot leaves account/save and reading state ownership in Academy, passes only the existing lesson-selection callback, and never writes assessment answers to saved reading. Its renderer edits require integration review when those branches combine; account behavior is not claimed tested here.
- PR #235: open, head `e9449dbf86a7945da1137e97df394614cdd09cbe`. No release scripts or workflow changes imported.
- Delivery tier 2, incremental security tier A: local deterministic lesson, no new endpoint, persistence, account boundary or paid inference. Parent application integration/security CI still applies.

### Reproducible experiment

See [the comparison harness](../../scripts/frontend-comparison/README.md) and [recorded measurements](../../scripts/frontend-comparison/results.json). It generates a disposable, built Next app outside the portfolio checkout, using exactly the same lesson component for both variants. Native composition is compared with Fumadocs UI/Core **16.17.9**, Next **16.4.3**, React/React DOM **19.3.1**. Fumadocs UI is explicitly the Radix version. Package MIT license and exact package source were inspected (copyright 2023 Fuma); no third-party source is copied into the portfolio.

The candidate uses RootProvider, DocsLayout, DocsPage/Body and Steps; its local token adapter maps background, foreground, card, border, primary/focus and muted colors to the portfolio tokens. Theme persistence and unused search are disabled. Existing content imports as TSX without MDX conversion, catalog migration or a new CMS record. Neither variant implements progress; production compatibility is verified separately against Academy's unchanged reading controls. The candidate's callbacks are inert in the layout harness; real next-lesson navigation is exercised by the production browser test.

Both variants rendered at 375/768/1280 with no page overflow or browser exceptions. Keyboard Space/arrow selection retained focus and announced explanatory feedback; wrong and correct answers, reset and rubric disclosure passed. Screenshots were inspected in this session. The candidate adds a docs navigation layer in addition to Academy's existing picker/sidebar; it needs further navigation and layout integration before adoption. Its package graph has 311 resolved entries including optional platforms and Next/React/tooling, with 246 actually installed; this is not a marginal package count over the portfolio. The portfolio root manifest and lockfile remain unchanged.

Cold built route JS+CSS (uncompressed decoded bytes, fresh browser context; excludes HTML/images/fonts, not a total app size or timing benchmark): native **482,172 bytes**, Fumadocs **808,751 bytes**, a **326,579-byte** increase for this tested composition. All three widths produced the same totals. Initial trial numbers changed after disabling unused candidate services and adding the final rendered card; these are the final measurements. The root portfolio's generated `.next/static` directory was 5,058,440 bytes at the baseline and 5,068,704 bytes after final integration; directory totals include unrelated shared assets and are secondary to the measured route comparison.

**Decision: adapt the existing Academy/native composition; defer Fumadocs adoption.** Both can display the content, but Fumadocs does not supply the assessment, transfer rubric, reading semantics or CMS integration. The tested native option solves this single lesson without new portfolio runtime dependencies or a global theme/provider change. This is a measured engineering recommendation for this scope, not a framework-wide benchmark or a learner effectiveness finding.

A read-only `git merge-tree --write-tree HEAD origin/pr-234` integration simulation confirmed one content conflict in `components/ai-academy/academy.tsx` at the generic knowledge-check/account-action boundary. No working-tree merge or account changes were applied. Resolution for the eventual integration: keep the pilot's conditional generic knowledge check, then render `accountsEnabled && <LessonAccountActions key={lesson.slug} slug={lesson.slug} />` **after** that conditional and before the session review controls. Do not place account actions inside the non-Frontend condition. Run account/privacy tests on the combined branch before review; this branch does not claim that combined test result.

### KRU-177 consuming implementation

`components/ai-academy/frontend-lesson.tsx` adapts the inspected guided-programming lesson's native structure, React state and fieldsets. It adds per-choice feedback, explicit reset, section links, a rendered fictional card plus selectable companion code, vocabulary, independent response prompt/rubric and selection callbacks for existing next lessons. The existing guided-programming renderer cannot directly express this section/transfer composition and has shared rather than per-choice feedback, so it is not expanded into a universal renderer.

The only consuming call site is the stable `frontend-building-blocks` branch in `components/ai-academy/academy.tsx`. Other lessons keep their existing summary/exercise/check. Sources, companion links, prerequisites, catalog ID, session reading review and existing lesson-sequence controls remain owned by Academy. No `content/academy/lessons` records, catalog record, CMS schema or persistent state were changed. Answers disappear on leaving the lesson; correct choices never mark reading reviewed.

### Evidence and limits

- Repository tests: 211 passed after integration.
- Production build and TypeScript: passed, including Google Fonts after the published network allowance.
- ESLint: passed with zero warnings after the new script warning was corrected.
- Production dependency audit: zero vulnerabilities.
- Comparison: six built browser cases (two variants × three widths) passed with system Chromium. Playwright's browser CDN was denied; the available system Chromium was used, with no download verification bypass.
- Integrated browser journeys: six final cases passed, including 320px reflow, answer retention on resize, ordinary motion, and no local/session storage writes. The pilot's wrong/correct explanations, radio keyboard/focus, reset, independent review, transfer disclosure, next lesson and answer reset passed at phone/tablet/desktop. Existing Academy foundation journeys passed at all three widths. The first pilot test used an incorrect expected destination title; corrected to the real catalog title, then reran successfully.
- Reduced motion was enabled in the browser runs; this component introduces no motion. Loading/error/permission states are N/A for the deterministic lesson.
- Manual 200% browser zoom, physical-device checks, screen-reader announcements, comprehensive contrast/accessibility audit and learner understanding observations are **not run**. Automated focus/status/viewport checks are not substitutes. KRU-178 still owns learner validation and release evidence.
- Remaining production site browser suite: 212 passed, one skipped (the mobile-menu focus test skips at the desktop breakpoint); Academy foundation: 12 passed. These are separate from the focused pilot journey.
- Hosted CI (including TruffleHog, Trivy, Semgrep) and remote PR/Linear updates are not established by these local results. GitHub Git access works, but both REST and GraphQL API requests returned Forbidden. Do not mark KRU-176/177 Done or claim hosted checks/release evidence.
- Model/workspace: Codex in the managed cloud environment; exact displayed model, billable usage, task-only elapsed effort and monetary cost are unavailable and not estimated.

Rollback: remove the single Frontend renderer branch/import and the new component, restoring the previous generic rendering for that slug. The comparison directory is development evidence only and can be removed independently. Do not merge/deploy from this checkpoint.
