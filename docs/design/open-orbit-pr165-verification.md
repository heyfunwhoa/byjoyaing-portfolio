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
- The brand mark does not animate or rotate. Header link color/focus and menu-state changes communicate interaction instead.
- Mobile menu remains a separate labeled hamburger/close control with minimum 44 × 44px target. The shared header's Escape handling, focus return, inert overlay, and scroll lock are unchanged.

## Scope
Changed `components/mark.tsx` and the mark-specific transition rules in `app/globals.css`; no content, routes, dependencies, menu logic, orbit illustrations, or data schemas changed.

## Evidence and checks
- [x] Reviewed PR #165 diff and open draft state.
- [x] Read `docs/brand/brand-guidelines.md`, `docs/design/celestial-editorial-audit.md`, the shared header and existing orbital components.
- [x] Confirmed existing menu button declares distinct `aria-label`, `aria-expanded`, `aria-controls`, and `min-h-11 min-w-11` classes (static inspection, not browser testing).
- [x] Verified the shared mark is decorative (`aria-hidden`, `focusable=false`) and inherits foreground color (static inspection).
- [ ] `npm test` on this PR's latest head.
- [ ] `npm run lint` on this PR's latest head.
- [ ] `npx tsc --noEmit` on this PR's latest head.
- [ ] `npm run build` on this PR's latest head.
- [ ] Browser review at 320, 375, 768, 1024, 1440 CSS pixels and 200% zoom.
- [ ] Keyboard navigation, Escape, focus return, scrim dismissal, and reduced-motion browser verification.
- [ ] Contrast measurement for actual light and dark surfaces, not just palette tokens.
- [ ] Confirm automated CI results for the latest commit.

The earlier 2026-10-11 audit's passing checks apply to its historical branch/build, **not** automatically to PR #165. Vercel's original preview deployment succeeded for an earlier PR commit, but cannot establish current-head test or accessibility acceptance.

## Merge gate
Keep PR #165 in draft until current-head CI and visual/accessibility checks are recorded. Do not merge an untested branding change or retarget other open PRs as part of this work.
