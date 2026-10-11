# Celestial editorial audit

**Status:** Implemented on `cursor/celestial-editorial-560c`. Not merged.  
**Date:** 2026-10-11  
**Baseline:** `main` at `4a491b6`  
**Adoption:** [component-adoption.md](component-adoption.md)  
**Learning patterns:** [learning-interaction-patterns.md](learning-interaction-patterns.md)

## What this pass changes

The editorial cover stays a cover. Work stays the large bento tile. The portrait stays `/avatar.png`. Geometry is a supporting line: rings, a few nodes, and a three-project map on `/experience`.

Instrument Serif is named in the request and rejected. [ADR 0001](../decisions/0001-preserve-geist-typography.md) keeps Geist Sans for display and body, and Geist Mono for technical metadata.

## Stage results

| Stage | Result |
| --- | --- |
| 1. Mobile navigation | Closed menu is `hidden` and takes no space. Open menu is positioned from the header’s bottom, not from `4.75rem`. A backdrop covers the page under the header. Opening focuses the first link. Escape returns focus to the button. Main, the footer, and the skip link are `inert` while the overlay is open, so Tab stays in the header. At `lg` the menu is static in the bar. |
| 2. Homepage | Bento order and spans are unchanged. Work gains a copper rule and three static nodes on the existing motif. The hero portrait sits in a static orbit. Crop marks still ease outward. The face does not move. |
| 3. Experience | The timeline shows two roles and a button for the earlier ones. Every visible role keeps its points and the related links that were already on the page. A constellation links Competitive Intelligence Engine, Detector Coverage Atlas, and Truffle Camp, with a sentence for each edge. The longer “How the work connects” list stays. |
| 4. Learning | Proposal only. Deal journey and the stakeholder playground remain the patterns. Academy pages are not rewritten. |
| 5. System | Adoption guide records licenses, rejections, and the spacing, focus, motion, and reduced-motion rules. No package was added. |

## Left alone

- Employment metrics stay off the site.
- Revenue Planning, Revenue Intelligence, and the GTM Operating Plan stay in the written list, with the fictional-book caveat. They are not the diagram.
- `/experience` and `/projects` are not redirected.
- P0 content on `cursor/p0-content-structure-560c` is not included.
- Joy Index content is not published. The public signature remains `joy.`
