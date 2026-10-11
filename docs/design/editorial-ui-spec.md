# Editorial UI specification

**Status:** Constraint and pattern spec for later implementation. This document does not change the UI.  
**Date:** 2026-10-11  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md)  
**Type:** [ADR 0001](../decisions/0001-preserve-geist-typography.md)  
**Components:** [component-inventory.md](component-inventory.md)

## Experience principle

Editorial storytelling with a few interactive systems. The site should read as a professional publication. It should not read as a résumé grid, a SaaS dashboard, or a science-fiction console.

One primary story per section. Asymmetric layout where it clarifies order. Generous whitespace. Copper, sage, mist, and clay are accents, not full-page themes. Professional evidence is larger and earlier than supporting notes.

## Approved visual constraints

### Typography

See ADR 0001 for the baseline table. Summary:

- Geist Sans for everything a person reads, including headlines and italic pull quotes.
- Geist Mono for technical metadata only.
- No new font family.

### Color

Shipped tokens in `app/globals.css`:

| Token | Hex | Role |
| --- | --- | --- |
| Background | `#F3EFE6` | Warm ivory canvas |
| Foreground | `#1B211D` | Charcoal text |
| Muted | `#4A504B` | Secondary text |
| Accent | `#8A4B2A` | Copper |
| Accent foreground | `#FBF8F2` | Text on copper |
| Card | `#FBF8F2` | Inset surface |
| Border | `#CFC3B3` | Rules |
| Sage | `#DDE3D7` | Editorial surface |
| Mist | `#DCE6ED` | Editorial surface |
| Clay | `#EAD5C7` | Editorial surface |

These pairs were calculated in an earlier review and are **not** a new audit: foreground on ivory is about 14.3:1, muted on ivory about 7.2:1, copper on ivory about 5.9:1, accent foreground on copper about 6.4:1. Recheck any new combination. Badges at 10–11px are a size risk even when the ratio passes.

### Art direction

Use geometric compositions, orbital or connected-node drawings, systems diagrams, and real artifacts. Do not fabricate product screenshots, customer results, or integrations. Do not generate a new portrait. Avatar rules: [avatar-system.md](../brand/avatar-system.md).

### Motion

Utility only: focus, disclosure, and the existing reduced-motion handling. Defer draggable sliders and experimental animation.

## Layout patterns

Use a bento when several related entry points need unequal emphasis. The homepage bento is the reference: Work is the large tile; Field Notes, Side Quests, private invitation, and the pull quote follow in DOM order.

Also use, and prefer when a bento would flatten the story:

- A full-width editorial section with one headline and one paragraph.
- A case-study preview with a title, a contribution, and a link.
- A horizontal rule between chapters.
- A diagram or a real image with dimensions reserved so the layout does not jump.
- A short list of smaller links under a lead story.

Do not give every item the same card size.

## Information hierarchy by destination

| Destination | Primary story | Supporting |
| --- | --- | --- |
| Home | Who she is and why the commercial work is credible | One bento, selected evidence, then independent work, then a personal note, then contact |
| Work | Enterprise sales evidence | People & Leadership, then GTM Strategy |
| Field Notes | How a method is used, and whether it is evidenced | Collection navigation, metadata, related links |
| Side Quests | What is actually built, and how mature it is | Subject groups |
| About | Career and values | Curated public interests |
| Contact | How to write | Existing form modes: message and selected work |

## Article pattern (proposed, not built)

For a Field Note longer than a few screens:

- Title, collection, evidence label (Used in practice, Illustrative model, or Exploring — the vocabulary already in the brand guide).
- Date or review note when one exists. Do not invent a publication date.
- Optional contents list of in-page headings.
- Body with a readable measure.
- Source notes when a claim needs a source.
- Related links.

The two live guides may adopt this pattern later. This spec does not restyle them.

## Interaction pattern (proposed)

- Category filters already exist on `/projects`. Side Quests may deep-link them. New filter UI needs a keyboard path and a visible selected state.
- In-page contents are links to headings, not a second router.
- Tabs, if used, follow the contact form's existing control: real buttons, `aria` state, minimum touch height already used there (`min-h-11`).

## Breakpoints

Tailwind defaults already in the project: `sm` 640px, `md` 768px, `lg` 1024px. Review widths: 375, 768, 1280, and 200% zoom. The desktop nav appears at `lg`. Below that, the menu button is the navigation.

## Copy constraints inside the UI

- Positioning sentence: Revenue & GTM Leader · Curious Builder.
- Do not introduce a second positioning line. "Curious by nature. Builder by instinct." stays secondary.
- Pillars remain Strategist, Leader, Builder. Themes remain People, Strategy, Systems. Capabilities remain Relationships, Revenue Systems, People & Teams.
- Do not say Head of Sales as a held title.
