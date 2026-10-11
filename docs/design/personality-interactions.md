# Personality and interaction

**Status:** Implemented on the personality branch. Not a replacement for the cover.  
**Date:** 2026-10-11  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md), [avatar-system.md](../brand/avatar-system.md)  
**Publication boundary:** [ADR 0002](../decisions/0002-planning-and-publication-boundaries.md)

The site should feel editorial, geometric, and a little playful. It should still read as an enterprise seller who is becoming a revenue leader and who builds practical systems. It is not a SaaS landing page, a game, or a cartoon.

## Audit

| Surface | What exists | Decision |
| --- | --- | --- |
| Homepage | Cover: hero, Truffle credibility, three-tile bento, one field practice, close | Keep. Add one Side Quest row, Detector Coverage Atlas, using its existing summary and Prototype label. Not a project grid. |
| About, Work, Projects, Field Notes | Pages already own the long copy | Do not retell them. Field Notes featured guides use the same entrance motion as the cover. |
| Joy Index | Private. Not readable from this repository. ADR 0002 forbids a public route or a paste. | No index content, no public mention of the index. The public easter egg is the approved signature `joy.` |
| Avatars | One file, `/avatar.png`, for Leader, Explorer, and Builder | Do not draw a new face. Crop marks ease outward on hover and focus. No facial animation. |
| Navigation | #45 merged. Closed panel uses `hidden`. Open panel is `fixed` with a backdrop. Escape returns focus. | Behavior preserved in `lib/site-nav.ts` and tested. Closed state still occupies no space and exposes no links. |
| Status UI | `ProjectStatusPill` and `StatusBadge` both print `statusCopy` | Keep both. The pill moves from 11px to 12px. Do not add a third widget. |
| Motion | A global reduced-motion rule already shortens transitions | New motion uses that rule and also sets `animation-name: none` when reduced motion is requested. |

## Conflicts with earlier decisions

- The cover decision removed the homepage project grid. This pass adds one Side Quest, not the grid. Account Intelligence stays off the homepage because its walkthrough uses fictional accounts. The competitive field practice stays, because it is `kind: "work"` and already the systems story.
- Brand guidelines ask for restrained motion and no decorative clutter. Each effect below has a job: arrival, affordance, or the public signature.
- Avatar spec forbids unapproved variant files and facial animation. The crop-mark reaction is the placeholder until `/avatar-leader.webp`, `/avatar-explorer.webp`, and `/avatar-builder.webp` are approved.
- `joy.` was the signature in the guidelines and was not set as readable text in the footer. The footer now shows it beside the name. The header reveals it on hover and keyboard focus so the sticky bar does not grow.

## Effects

| Effect | Purpose | Reduced motion |
| --- | --- | --- |
| `.section-enter` on sections after the hero | The next chapter settles into place as the reader reaches it. Motion is a short rise, not a fade. Where `animation-timeline: view()` exists, it is tied to scroll. Otherwise it plays once. A fade to zero opacity was rejected because a full-page capture, and any browser that did not finish the timeline, left the chapter blank. | Animation name is cleared. Content stays visible. |
| Crop marks | Shows the portrait is a framed illustration, and that the frame can take focus. | Transition duration collapses. |
| Link nudge on bento arrows | Confirms the tile is a control. | Transition duration collapses. |
| Project card border | Same hover affordance Field Notes guides already use. | Color change remains; the transition collapses. |
| `joy.` reveal | Public signature, keyboard reachable from the home link. | No motion. Show and hide only. |

No animation library. No new font. No new palette. Case-study claims, maturity labels, and employment facts are unchanged.
