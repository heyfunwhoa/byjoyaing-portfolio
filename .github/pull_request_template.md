## Summary

Describe the user-facing problem, what changed, and why. Link relevant issue/roadmap.

## Brand alignment (portfolio-specific)

- [ ] Read [canonical brand guidelines](../docs/brand/brand-guidelines.md).
- [ ] Primary positioning remains **Revenue & GTM Leader. Curious Builder.**; signature is **joy.**
- [ ] People / Strategy / Systems underpin the story; professional **Work** precedes independent **Side Quests** where both appear.
- [ ] No conflicting hero positioning or competing brand definition. Explain any intentional proposal to change the canonical brand below.
- [ ] Claims and metrics are verified; work ownership and project status are accurate; no proprietary/private Joy Index material.
- [ ] Existing routes/links remain functional or documented migrations/redirects are provided.

## Engineering and security

- [ ] Scope is focused; no unrelated changes or unnecessary dependencies.
- [ ] No secrets, personal data, proprietary customer data, or unsafe real-world fixtures.
- [ ] CI results reviewed: lint, typecheck/build, available tests, and applicable dependency/secret/configuration scans.
- [ ] New or modified logic has appropriate tests, or a specific documented reason why not.
- [ ] New integrations respect auth/authorization, least privilege, input validation and data minimization where applicable.

## UX and publishing (check if relevant)

- [ ] Responsive layout checked at 375px / 768px / 1280px and 200% zoom.
- [ ] Keyboard navigation, focus, headings, accessible names, contrast and reduced motion checked.
- [ ] Content hierarchy, links, SEO metadata and error/empty states checked.
- [ ] Reviewed the page with its entry and next destinations: distinct reader question, useful supporting detail, appropriate repetition, coherent section order and clear next action. Updated the documented sequence if it changed.
- [ ] Prototype, proposed content and mock data clearly labeled; no unverified outcomes presented as fact.

## Workbench reuse (UI changes; otherwise N/A)

- [ ] Consulted [reuse contract](../docs/design/workbench-reuse.md), inventory and relevant catalog/source.
- [ ] Named the existing pattern/source and destination; explained reuse, adaptation or a new implementation.
- [ ] Recorded mobile/tablet/desktop, keyboard/focus, reduced-motion and applicable state behavior.
- [ ] Updated the relevant adoption record; distinguished lab/demo availability from shipped use.

Pattern/source and decision (or N/A):

## Acceptance criteria

- [ ] AC-01: [Observable reader task or editorial outcome, including its entry and next step]
- [ ] AC-02: [Relevant responsive, keyboard, accessibility, content accuracy, or failure/recovery behavior]

## Verification evidence

- AC-01: not run — [Exact-head CI and real reader-journey evidence; add link or full SHA after actual verification]
- AC-02: not run — [Manual mobile/zoom/keyboard and brand/content acceptance results, or N/A with rationale]

Automated checks run (with results):

Manual checks run (with results):

Known risks, exceptions, follow-ups, and whether this is safe to ship:

## Risk and release

Risk tier: Tier [A/B/C] with rationale, independent of the Linear delivery-tier scale.
Release: Do not merge or deploy without applicable checks, content/UX acceptance and explicit owner authorization.
Rollback: [Revert path, prior production SHA, or N/A with reason]

The [proposed portfolio acceptance standard](https://github.com/heyfunwhoa/technical-docs-platform/pull/58) supplements this site's brand and UX review. Passing a PR metadata check does not establish an approved public release.

## Brand exceptions (only if applicable)

Explain the rationale, trade-offs and corresponding proposed edit to the canonical guidelines. Unapproved deviations must not silently ship.

