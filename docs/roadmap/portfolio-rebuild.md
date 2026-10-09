# Portfolio rebuild — implementation roadmap

## Phase 0 — audit / design learning (this PR)
- Source-code UX audit, provisional audiences, IA, sketches, product brief.
- Remaining: browser/keyboard/mobile walkthrough and user feedback.
- Learn: hierarchy, usability, IA, evidence vs assumption.

## Phase 1 — product decisions and planning
- Validate product brief; define content evidence, outcome measures, case-study acceptance criteria.
- Learn: prioritization, user stories, MVP scope, tradeoffs.

## Phase 2 — engineering baseline
- Reconcile PR #2 (visual foundation) and PR #3 (About content); identify conflicts and plan merges.
- Add scoped CI lint / type-check / build; suitable route smoke tests; verify scripts.
- Learn: branching, PR review, testing, CI, deployment previews.

## Phase 3 — shared design system / homepage
- Design tokens, navigation, semantics; deliver homepage hero as small vertical slice.
- Compare at least two visual directions and test layouts before coding.
- Learn: design tokens, React composition, accessibility.

## Phase 4 — About / Work / Side Quests
- Publish reviewed About narrative; separate leadership cases from independent builds.
- Add typed content models; migrate routes with verified redirects and refreshed metadata.
- Learn: product storytelling, content modeling, routing, refactoring.

## Phase 5 — launch / iterate
- Test mobile, keyboard, focus, links, SEO, performance, source accuracy and confidential-data boundaries.
- Preview → merge → observe; gather feedback and iterate.

## Suggested GitHub issues / reviewable PRs
1. `docs: validate UX audit with browser and screenshots`
2. `chore: reconcile existing portfolio PRs and add CI baseline`
3. `feat: shared navigation and homepage hero`
4. `feat: About narrative and values`
5. `feat: professional Work content model and cases`
6. `feat: Side Quests index and project pages`
7. `chore: route redirects, metadata and release QA`

## Definition of done
Each PR explains user problem, design decision, scope, screenshots/preview where UI changes, accessibility checklist, commands actually run and results, limitations, and documentation updates. Avoid conflating planned checks with completed checks.
