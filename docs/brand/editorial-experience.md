# joy. — Editorial experience implementation

**Status:** Draft redesign PR, distinct from production identity, source-of-truth brand guidelines, and protected-work authentication.

## Brand hierarchy

- Professional: **Revenue & GTM Leader · Curious Builder**. Continue to demonstrate both strategic enterprise selling and credible leadership potential; don't assert an unheld Head of Sales title.
- Values: **People first. Problem-driven. Systems-minded.**
- Signature: **joy.**; brand expression: **Curious by nature. Builder by instinct.**
- Brand foundations remain in [brand-guidelines.md](./brand-guidelines.md); the palette and editorial surfaces augment those tokens rather than replacing them.

## Typography and surfaces

- Geist Sans: headlines, body, navigation, chapter labels, and pull quotes. Hierarchy comes from size and weight. The copper line may be italic.
- Geist Mono: technical metadata only, such as hashes.
- Core: ivory #F3EFE6, charcoal #1B211D, copper #8A4B2A, warm card #FBF8F2.
- Proposed support: sage #DDE3D7 (learning/systems), mist #DCE6ED (research), clay #EAD5C7 (Field Notes/personal).
- Dark-charcoal sections emphasize chapter breaks and visual rhythm, not every button and card.
- Do not use color as the only signifier of meaning. Confirm AA contrast across actual text and control combinations before releasing.

## Bento composition rule

The [v0 Bento Grid template](https://v0.app/templates/bento-grid-8QW53cSzCxp) informed the use of varied tile spans and scale, **not** a wholesale style import. Its public listing does not expose dependable component source, so the portfolio uses its own semantic Next.js/Tailwind implementation. This is editorial navigation, not a dashboard. The homepage bento has three destinations: Work dominates; Field Notes and Side Quests are next. Private access stays a route, not a homepage tile. The philosophy line lives in the hero, not in a second bento card. Typography and selective surface colors create hierarchy instead of gradients, product-style widgets, or crowded identical cards. In `components/editorial-bento.tsx`, preserve DOM reading order at 320/375px, enlarge asymmetric spans only at desktop, make the whole link focusable with visible focus, and keep all text legible without hover. Do not add fabricated proof or capability badges. Decorative marks on the Work tile follow the celestial geometry in [brand-guidelines.md](./brand-guidelines.md). See [homepage-simplification.md](../design/homepage-simplification.md).

## Reusable templates

- `EditorialSection`: visual chapter intro and surface selection.
- `EditorialBento`: Work-first asymmetrical navigation to Field Notes and Side Quests. Three tiles. Private access is not one of them.
- `WorkStoryTemplate`: commercial leadership and enterprise sales case study (context, challenge, contribution, collaborators, decisions, evidence, outcomes, lessons, caveats) plus a request for approved materials. No authentication.
- `BuildStoryTemplate`: independent prototype/research (problem, motivation, architecture, sources, implementation, limitations, next steps) plus a request for working notes.
- `/work/storytelling-guide`: clearly fictional demonstration of both patterns, not an actual employer case study.

## Avatars

Keep Leader / Explorer / Builder contextual treatments. Existing `BrandAvatar` accepts the variants but currently displays the same `/avatar.png`. Do not claim separate illustrations are shipped. Approve master identity, then export all three with consistent likeness, cropping and proportions. See [avatar-system.md](./avatar-system.md).

## Public-to-private UX

The public case study must stand alone and show trustworthy evidence. A secondary link may offer approved extended material. `/private-work` is informational only; the planned Better Auth + Resend + Neon system is not deployed. Never put private objects in public assets, repo, metadata, or client JS; do not conflate signup with access approval. No confidential employer/customer data even behind a login.

## Mobile and accessibility release criteria

- Viewports: 320, 375, 768, 1280 pixels; browser zoom 200%.
- Responsive hero, avatar crop, header navigation, card stacks, long labels and preview-table horizontal scrolling.
- Contrast AA, accessible names and headings, keyboard-only navigation, visible focus and Escape-to-close.
- Reduced-motion preference and minimal layout shift. Verify real renders; CSS tokens alone don't prove accessibility.
- Contact, work, Field Notes, projects, navigation and private-work routes must resolve.
- Run npm ci, npm run lint, npm test, npm run build in CI and review dependency/security scans before merging.

## Release strategy

Keep a dedicated visual redesign PR; merge separately from Builder Academy or auth PRs. No unreviewed likeness generation or production auth. Prototypes and concept art require explicit identity/likeness review before replacing the fallback.
