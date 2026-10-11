# Accessibility and responsive test plan

**Status:** Plan for the UX stories. Running it is not a WCAG conformance claim.  
**Target:** WCAG 2.2 AA.  
**Date:** 2026-10-11  
**Per-screen checklist:** [responsive-accessibility-checklist.md](responsive-accessibility-checklist.md)

This specification pull request changes documents only. Viewport and keyboard passes are not run here. They are required on UX-01 through UX-07.

## When to test

| Change | Widths | Keyboard | Zoom | Reduced motion |
| --- | --- | --- | --- | --- |
| UX-01 Work | 375, 768, 1280 | In-page collection links and case-study links | 200% on `/work` | Confirm no new motion |
| UX-02 Field Notes | 375, 1280 | Featured guides and any real collection links | 200% if a guide layout changes | Existing guides only if their CSS changes |
| UX-03 About | 375, 768, 1280 | The four corrected links | 200% on the hero | No |
| UX-04 Home | 375, 768, 1280 | Hero actions, bento, timeline link, contact | 200% | Bento and dark section |
| UX-05 Side Quests | 375, 1280 | Subject links and case studies | 200% | No |
| UX-06 Contact | 375, 1280 | Tabs, fields, submit, external links | 200% on the form | No |
| UX-07 labels | 375, 1280 | Timeline related links, directory filters | 200% if a row wraps | No |

Also open 320px once on Home and Work. The editorial title already has a 375px clamp. Look for overflow, not a new type size.

## Procedure

1. Start from the header. Confirm the skip link moves focus to main content.
2. At 375px, open the menu, tab through the six destinations, press Escape, and confirm focus returns to the button.
3. Tab the page in DOM order. Compare that order to the numbered sections in [page-wireframes.md](page-wireframes.md).
4. Check that the focus outline is visible on links, the menu button, and form controls.
5. Confirm the `h1` is the page purpose. Collection titles are `h2`. Cards do not skip to `h4` for style.
6. Read every status without color. The words Prototype, Professional field system, Designed, and Concept, or the evidence labels, must be text.
7. Set `prefers-reduced-motion: reduce` and reload Home. Motion that remains must be focus or a state change.
8. Zoom to 200%. Reflow to one column. No two-dimensional scroll of the page. A wide table may scroll inside itself.
9. Images: the avatar has a useful description or empty alt when decorative. Width and height stay reserved.

## Content checks in the same pass

- Enterprise Sales content is above People & Leadership on `/work` after UX-01.
- Side Quests on Home are below the selling and leadership previews after UX-04.
- Unpublished Field Notes titles are not linked.
- Contact has no résumé control.
- `/approach` still lands on `/about`.
- `/experience` and `/projects` still return their own pages.

## What this plan does not claim

- A full-site audit.
- Contrast numbers beyond the pairs already calculated in [editorial-ui-spec.md](editorial-ui-spec.md). Recheck any new pair.
- Screen-reader compatibility beyond heading order, names, and focus. A later pass with VoiceOver or NVDA is a separate session, not a box this document can tick.
- Analytics or task-success rates. Those methods are in [portfolio-success-metrics.md](../product/portfolio-success-metrics.md), and the baselines are empty.

## Record

In the implementation pull request, list the widths, the keyboard result, and any exception. "Looks fine" is not a result.
