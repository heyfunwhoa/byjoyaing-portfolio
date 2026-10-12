# Lesson: Component adoption and interaction testing

**Component:** `components/featured-work-carousel.tsx`  
**Primitive:** `components/ui/carousel.tsx` (Embla)  
**Data:** `lib/featured-work.ts`  
**Preview:** `/work` and `/design-lab` while `next dev` is running  
**Decisions:** [shared-registry-candidates.md](../design/shared-registry-candidates.md), [component-adoption.md](../design/component-adoption.md)

## 1. Problem

A featured strip has to feel interactive without autoplaying, without mixing employer work and Side Quests, and without overflowing a 375px screen. The site already had an unused carousel primitive. The job is to wrap it, not to invent a second slider.

## 2. Adoption rule

Reuse the primitive. Put portfolio facts in a data helper. Keep the public wrapper thin:

1. `featuredWorkSlides()` reads `publicStories` and `portfolioEntries`. It does not write new titles.
2. `FeaturedWorkCarousel` only renders those slides, labels the source, and wires Embla options.
3. Work categories and the full case-study directory stay on the page below the carousel.

Public pages still must not import `components/ui` except the documented exceptions. The wrapper is the exception for carousel.

## 3. Interaction testing

Check behavior, not only that the file exists.

| Check | What “pass” looks like |
| --- | --- |
| Keyboard | Tab reaches previous, next, and each card link. Arrow keys on the carousel region move one group. |
| Labels | The region has an accessible name. Buttons say previous/next. A live region announces the group. |
| Touch | Swipe works when motion is allowed. |
| Reduced motion | Duration is 0 and drag is off. Cards still change when a button is pressed. |
| Overflow | At 375px, previous/next are in the flow, not `-left-12`. `scrollWidth === clientWidth`. |
| No autoplay | No `Autoplay` plugin. `loop` is false. |
| Differentiation | Employer slides use the Work label. Independent slides use “Independent · Side Quest”. |
| Claims | No new metrics. Unit tests reject `$`, Head of Sales, and Joy Index. |

Unit tests (`lib/featured-work.test.ts`, `lib/interaction-regression.test.ts`) guard data and source text. A headless browser pass records widths, overflow, and reduced motion. Passing `npm test` is not proof the carousel scrolled.

## 4. When not to adopt a primitive

Skip a registry component when it needs Motion, autoplay, opacity-0 entrances, or a second visual language. The capability orbit uses hand-written tabs for that reason. The career rail is a list, not a slider.

## 5. Knowledge check

You need a featured strip of existing case studies. Which path matches this site?

1. Install Storybook and Motion, autoplay three cards, and invent an outcome metric for empty slides.
2. Wrap the installed Embla carousel, feed it `featuredWorkSlides()`, label Work vs Side Quests, and verify keyboard, overflow, and reduced motion in a browser.
3. Import `components/ui/carousel.tsx` from every page so future routes inherit autoplay.

Correct: 2. Storybook is not installed. Motion is forbidden without an ADR. Autoplay and invented outcomes fail the brand and accessibility rules.
