# Builder Academy: Storybook and visual regression testing

**Status:** source lesson — not yet surfaced in the Academy UI  
**Updated:** 2026-10-12  
**Prerequisites:** [Design Lab](../design/design-lab.md), [brand guidelines](../brand/brand-guidelines.md)

## Learning objectives

Explain what a component story is, compare Storybook and Playwright, build a deterministic visual baseline, review a regression, and keep CI costs within approved limits.

## 1. Why components need a workshop

The public portfolio composes interactive components into complete pages. A component lab isolates one control (avatar, button, card, carousel, navigation) and displays named examples ("stories") such as default, focused, mobile, and reduced motion. Storybook is open-source component development tooling. It **does not replace** the existing branded Design Lab; Storybook supports development while Design Lab remains the curated showcase.

## 2. Behavioral vs visual testing

- **Unit tests:** Does an isolated function or component behave as intended?
- **Interaction/browser tests:** Can a real browser navigate and operate the component using keyboard and pointer?
- **Visual regression:** Did pixels change unexpectedly against an approved screenshot baseline?
- **Accessibility audits:** Are semantics, accessible names and contrast valid? A screenshot alone cannot establish accessibility.

Playwright is open source and can launch browsers and compare screenshots. Test browser interactions separately from screenshot comparisons.

## 3. Practical lab exercise

1. Confirm the current component and its brand tokens, breakpoints and variants before creating any new component.
2. In a separate implementation PR, install compatible Storybook packages and commit the regenerated `package-lock.json` together with `package.json`.
3. Create stories for a branded avatar, button, card, carousel and navigation example using synthetic demo content.
4. Install compatible `@playwright/test` and browser dependencies. Choose one stable desktop viewport and one mobile viewport first.
5. Run a baseline capture with fixed fonts, deterministic images, reduced motion, and predictable test data. Preserve a keyboard interaction test.
6. Deliberately change card spacing, run the screenshot test, inspect the diff and decide whether to fix the regression or approve a new baseline.
7. Verify `npm ci`, lint, tests, build, Storybook build, and the visual suite before merging.
8. Report wall-clock CI time, artifact size and the approximate cost impact; avoid enabling a large browser/viewport matrix until reviewed.

## 4. Failure modes

**Flaky screenshots:** Unloaded fonts, remote images, animation, random IDs and date-dependent content are common causes. Prefer fixed fixtures and wait for app readiness.

**Snapshot laundering:** Do not automatically accept changed baselines; inspect changed pixels and document why they changed.

**Passing screenshot ≠ usable page:** Keep keyboard tests, semantic review, responsiveness and real browser behavior tests.

**Dependency mismatch:** The portfolio currently has an npm lockfile and CI uses `npm ci`. Never edit package.json alone. Install compatible versions and regenerate the lockfile on the same branch.

**Public demo exposure:** The existing Design Lab is development-only. Do not publish Storybook with private data or credentials, and do not mistake hidden routes for authentication.

## 5. Quick knowledge check

**Q:** What does Storybook do that Playwright does not?  
**A:** It provides a browsable, documented isolated component workshop. Playwright runs browser checks and screenshot comparisons.

**Q:** If a visual snapshot passes, is a component accessible?  
**A:** No. Accessibility needs independent checks and human validation.

**Q:** Are open-source license costs the same as total operating costs?  
**A:** No. CI runners, storage, hosted previews and optional vendor services can incur charges.

## 6. Follow-up implementation checklist

[ ] Storybook and Playwright dependencies installed with a synchronized lockfile  
[ ] Five real component stories and two viewport baselines  
[ ] Browser and keyboard test coverage  
[ ] Cost limits and artifact retention documented  
[ ] Relevant CI jobs passing  
[ ] Academy UI card linked to this source lesson (separate work, if needed)

## References

- [Storybook documentation](https://storybook.js.org/docs)
- [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Technical Docs Software Catalog](https://github.com/heyfunwhoa/technical-docs-platform/tree/main/software-catalog)
