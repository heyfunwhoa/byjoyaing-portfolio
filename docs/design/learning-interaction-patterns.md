# Learning interaction patterns

**Status:** Proposal. Field Notes and Builder Academy are not rebuilt by this note.  
**Date:** 2026-10-11

The site already has two interactive lessons and a set of academy playgrounds. New Field Notes and Builder Academy pages should reuse those shapes. They should not gain a carousel, a canvas, or a second status widget.

## Patterns to reuse

| Pattern | Where it already exists | Use it when |
| --- | --- | --- |
| Choice tabs with `aria-pressed` | `components/field-notes/deal-journey.tsx` | A reader picks one stage and the panel beside it changes. The stage list stays visible. |
| Perspective switch | `components/field-notes/stakeholder-playground.tsx` | The same evidence can be read as a seller or as a coach. One control, two sentences. |
| Local reset | Stakeholder playground | Practice state stays in the browser. Say that in the first paragraph. Offer Reset. |
| Guided sequence | `components/ai-academy/guided-programming-lesson.tsx` and `source-journey.tsx` | A lesson has an order. Show the step number and leave earlier steps readable. |
| Comparison | Deal journey, seller lens beside sales-leader lens | Two columns from `md`. One column below that. Do not hide the second column behind a hover. |
| Citation | Deal journey “Evidence” line, project status help | One sentence naming what is field practice, a sample, or a design. No footnote component until a page has more than a sentence. |
| Diagram | `ProjectConstellation` on `/experience` | A drawing is `aria-hidden` or decorative. The same relationships are a list of links and sentences under it. |

## Proposed Field Notes shape

1. Eyebrow with the collection name and an evidence label already in `statusCopy` or the guide’s own “illustrative” sentence.
2. Title and one paragraph.
3. Optional contents links only when the guide scrolls past a few sections.
4. One interactive region: either the deal-stage buttons or the stakeholder lab, not both on the same screen.
5. A related-work row that already exists. Do not invent a new card.

## Proposed Builder Academy shape

1. State the lesson’s limit in the first screen: fixture, local only, or written design.
2. Walk forward with the existing guided lesson. Each step is a heading, a short action, and a check the reader can see without finishing the next step.
3. Comparisons stay in text. A diagram may repeat them. It may not replace them.
4. Citations point at the source the lesson already names. Do not add a live fetch.

## Motion and input

Tabs and steps change content. They do not animate the panel in from opacity 0. Keyboard users get the same buttons a pointer user gets. `prefers-reduced-motion` already clears animation names in `app/globals.css`.
