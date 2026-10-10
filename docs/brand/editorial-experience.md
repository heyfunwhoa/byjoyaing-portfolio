# joy. — Editorial experience implementation

**Status:** Draft redesign PR, distinct from production identity, source-of-truth brand guidelines, and protected-work authentication.

## Brand hierarchy

- Professional: **Revenue & GTM Leader · Curious Builder**. Continue to demonstrate both strategic enterprise selling and credible leadership potential; don't assert an unheld Head of Sales title.
- Values: **People first. Problem-driven. Systems-minded.**
- Signature: **joy.**; brand expression: **Curious by nature. Builder by instinct.**
- Brand foundations remain in [brand-guidelines.md](./brand-guidelines.md); the palette and editorial surfaces augment those tokens rather than replacing them.

## Typography and surfaces

- Instrument Serif: emotive hero, chapters, essays and editorial pull quotes.
- Geist Sans: body, navigation, actionable UI and readable long-form explanatory text.
- Geist Mono: short chapter labels, references, provenance, technical metadata; not paragraph body.
- Core: ivory #F3EFE6, charcoal #1B211D, copper #8A4B2A, warm card #FBF8F2.
- Proposed support: sage #DDE3D7 (learning/systems), mist #DCE6ED (research), clay #EAD5C7 (Field Notes/personal).
- Dark-charcoal sections emphasize chapter breaks and visual rhythm, not every button and card.
- Do not use color as the only signifier of meaning. Confirm AA contrast across actual text and control combinations before releasing.

## Reusable templates

- `EditorialSection`: visual chapter intro and surface selection.
- `WorkStoryTemplate`: commercial leadership and enterprise sales case study (my role, collaborators, challenge, decisions, evidence, outcomes, caveats).
- `BuildStoryTemplate`: independent prototype/research (problem, architecture, source provenance, implementation, limitations, next).
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
