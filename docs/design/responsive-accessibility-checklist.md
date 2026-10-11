# Responsive and accessibility checklist

**Status:** Acceptance checklist for implementation pull requests. Completing it is not a WCAG conformance claim.  
**Target:** WCAG 2.2 AA.  
**Date:** 2026-10-11  
**Which story tests which page:** [accessibility-test-plan.md](accessibility-test-plan.md)

Automated lint does not cover this list. A planning-only pull request records "not run" for viewport checks.

## Viewports

For every changed screen:

- [ ] 375px: no horizontal page scroll. In-page tables may scroll inside `min-w-0` and `overflow-x-auto`.
- [ ] 768px: sections stack in the same order as the document.
- [ ] 1280px: the primary story is visually first. A bento may use column spans only from `lg` up.
- [ ] 200% zoom: text wraps, controls remain reachable, and the reading order matches the DOM.

## Navigation and controls

- [ ] The skip link still works.
- [ ] The mobile menu button exposes `aria-expanded`.
- [ ] Escape closes the menu and returns focus to the button.
- [ ] Every link has a name that makes sense without the surrounding card.
- [ ] Focus is visible (`:focus-visible`). Do not remove the global outline.
- [ ] Touch targets on primary controls stay at least the height already used for header and form controls.

## Content structure

- [ ] One `h1`.
- [ ] Heading levels are not skipped to achieve a font size. Size comes from the editorial classes.
- [ ] Images that carry meaning have alt text. Decorative crops use empty alt.
- [ ] Avatar variants still render `/avatar.png` until new assets are approved.
- [ ] Status text is available without relying on color alone.

## Motion, contrast, and media

- [ ] `prefers-reduced-motion` still reduces non-essential motion.
- [ ] New text/background pairs are checked against 4.5:1 for normal text and 3:1 for large text. Prior calculated pairs are listed in [editorial-ui-spec.md](editorial-ui-spec.md) and are not a fresh audit.
- [ ] Images set width and height or an equivalent reservation so they do not shift layout.
- [ ] Type stays on Geist Sans and Geist Mono ([ADR 0001](../decisions/0001-preserve-geist-typography.md)).

## How to record the result

In the pull request, name the widths checked, whether a keyboard pass was done, and any exception. "Looks fine" is not a result.
