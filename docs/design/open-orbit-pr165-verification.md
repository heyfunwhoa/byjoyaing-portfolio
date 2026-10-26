# Open-orbit mark — PR #165 verification record

Date: 2026-10-14. Base: `main`. Implementation: `design/open-orbit-brand-mark`.

## Architecture decision
The shared `components/mark.tsx` remains the only navigation signature mark. Existing `GeometricMotif`, `OrbitArtwork`, `OrbitPortrait`, and `ProjectConstellation` keep their current purposes; these are different surface- and content-level presentations, not interchangeable logos. No new geometry library, package, or design system is introduced.

## Geometry and design rules
- Signature: one intentionally incomplete, round-capped outer orbit with one solid endpoint node; no faint secondary ring at 16px.
- Mark defaults to 16 × 16 CSS pixels, a 24 × 24 SVG viewBox, and a 1.8 viewBox-unit main stroke. Its color is inherited from `currentColor`.
- Larger contextual orbit artwork and semantic relationship diagrams retain their existing components and sizes rather than being forced to share the 16px logo glyph.
- Use the existing `--background`, `--foreground`, `--accent`, and `--border` palette. Light is the documented site-wide color scheme. Dark panels must explicitly set contrasting inherited text color.
- Preserve visible `Kristen Aing` and the accessible surrounding home link. The `joy.` signature remains visible on pointer hover and keyboard focus.
- The open-arc mark makes a restrained 8° rotation and 1px upward translation on pointer hover or keyboard focus, over 180ms ease-out. It does not animate at rest, and `prefers-reduced-motion: reduce` disables both transition and transform. Link color and focus remain available without motion.
- Mobile menu remains a separate labeled hamburger/close control with minimum 44 × 44px target. The shared header's Escape handling, focus return, inert overlay, and scroll lock are unchanged.

## Scope
Changed `components/mark.tsx` and the small hover/focus/reduced-motion rules in `app/globals.css`; no content, routes, dependencies, menu logic, orbit illustrations, or data schemas changed.

## Evidence and checks
- [x] Reviewed PR #165 diff and open draft state.
- [x] Read `docs/brand/brand-guidelines.md`, `docs/design/celestial-editorial-audit.md`, the shared header and existing orbital components.
- [x] Confirmed existing menu button declares distinct `aria-label`, `aria-expanded`, `aria-controls`, and `min-h-11 min-w-11` classes (static inspection, not browser testing).
- [x] Verified the shared mark is decorative (`aria-hidden`, `focusable=false`) and inherits foreground color (static inspection).
- [x] Unit tests passed in GitHub Actions CI run 38564152617 for head `2dc54053f5d140a9353d846967d3fb7aab609e0a` (not separately run locally).
- [x] Lint passed in GitHub Actions CI run 38564152617 for the recorded head.
- [x] Production build + TypeScript CI job passed in run 38564152617. Standalone `npx tsc --noEmit` was not independently executed.
- [x] Production build and browser smoke job passed in CI run 38564152617 for the recorded head.
- [ ] Browser review at 320, 375, 768, 1024, 1440 CSS pixels and 200% zoom.
- [ ] Keyboard navigation, Escape, focus return, scrim dismissal, and reduced-motion browser verification.
- [ ] Contrast measurement for actual light and dark surfaces, not just palette tokens.
- [x] GitHub Actions results checked for head `2dc54053f5d140a9353d846967d3fb7aab609e0a`: CI 38564152617, security scans 38564152647, Semgrep 38564152613, bounded visual QA 38564152656 all succeeded; Vercel commit status was success. This does not verify the live production site.

The earlier 2026-10-11 audit's passing checks apply to its historical branch/build, **not** automatically to PR #165. Vercel's original preview deployment succeeded for an earlier PR commit, but cannot establish current-head test or accessibility acceptance.

## Merge gate
Keep PR #165 unmerged until updated-head CI and visual/accessibility checks are recorded. PR is currently open and not marked draft; a human review has not been recorded. Do not merge an untested branding change or retarget other open PRs as part of this work.

## Reconciliation checkpoint — 2026-10-14

PRs #160, #161, and #166 are merged. PR #166 added the static `.orbital-section-label` cue to editorial pages and brand guidelines; it did not change `components/mark.tsx`. This file's automated-check evidence refers to the **previous implementation head** stated above; this documentation-only commit requires fresh branch status before merge. Manual WCAG 2.2 AA, full responsive matrix, live production verification, and explicit human visual approval remain outstanding. No claim of production deployment is made.

## Approved interaction direction — 2026-10-14

Owner clarified the requested visual: replace the copper square beside Kristen Aing with an **open arc with subtle motion**. On branch commit `9e0552c20de6b1358b3f50e11fcfb1890ced39f4`, CSS limits the 8° rotation and 1px rise to brand-link hover/focus-visible, with no idle animation, no added package, and a reduced-motion no-transform override. This implementation must still pass current-head CI and visual/keyboard/reduced-motion browser verification before merge.
