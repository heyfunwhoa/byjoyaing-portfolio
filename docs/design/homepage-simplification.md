# Homepage simplification

**Status:** Implemented on the homepage branch. Not merged.  
**Date:** 2026-10-11  
**Baseline:** `main` at `44d7c54`  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md), [editorial-experience.md](../brand/editorial-experience.md)  
**Supersedes for Home only:** the longer Home sequence in [page-wireframes.md](page-wireframes.md)

The homepage is an editorial cover. It introduces Kristen Aing, shows enterprise-selling credibility, and points to Work, Field Notes, Side Quests, About, and Contact. It does not retell those pages.

Positioning stays **Revenue & GTM Leader · Curious Builder.** Philosophy stays one line: **People first. Problem-driven. Systems-minded.** Signature stays **joy.** Fonts stay Geist Sans and Geist Mono. Palette, Leader avatar (`/brand/avatar/illustrated-portrait.png`), and the six-item navigation stay.

Supporting role links go to `/experience`. The Work index on this baseline does not yet carry the full Enterprise Sales chapter. That chapter is on the unmerged branch `cursor/p0-content-structure-560c`. This homepage does not depend on it.

The mobile menu is unchanged here. Overlay and dismissal behavior belong to draft PR #45 (`components/site-header.tsx` only).

## 1. Current homepage sections

On `main` before this change, `app/page.tsx` had seven blocks:

1. Dark hero. Positioning, philosophy, body, Explore Work, Explore Side Quests, Leader avatar.
2. Credibility. Three philosophy items, then the full Truffle Security bullet list, then a timeline link.
3. `EditorialBento`. Work, Field Notes, Side Quests, a private-work tile, and a philosophy quote.
4. Professional case studies. Full Rapid7 and Forcepoint bullets, plus both Field Notes guides.
5. Independent systems. A featured project and two more, with previews and status pills.
6. Personal story. Advertising paragraph and the pull quote, linking to About.
7. Dark connect block. Contact and `/private-work`.

## 2. Keep / condense / move / remove

| Block | Decision | Where it lives after this change |
| --- | --- | --- |
| Name, positioning, one-line philosophy, Leader avatar, avatar caption | Keep | Hero |
| Hero body connecting selling, coaching, and systems | Keep | Hero |
| Explore Work | Keep | Hero primary action |
| Explore Side Quests as the hero’s second action | Remove from the hero | Side Quests stays in the bento |
| About as a hero action | Keep | Hero secondary action |
| Philosophy list (People, Problem-driven, Systems-minded) | Move | About already holds the long version. Home keeps the one line. |
| Truffle Security points | Condense | One paragraph on Home, from the existing `roles` points. Full bullets stay on `/experience`. |
| Rapid7 and Forcepoint bullets | Condense | One existing sentence each, linking to `/experience`. |
| Career timeline | Move | `/experience`. Home links to it. |
| Bento: Work, Field Notes, Side Quests | Keep | Three tiles. Shorter labels. Work remains the large tile. |
| Bento private-work tile and philosophy quote | Remove from Home | `/private-work` stays a route. The philosophy line stays in the hero. |
| Field-guide list | Move | `/field-notes`, `/field-notes/enterprise-deal`, `/field-notes/multithreading` |
| Featured project grid | Remove from Home | `/side-quests` and `/projects` |
| Advertising essay | Move | About |
| Contact action | Keep | Closing section |
| Second private-work button | Remove from Home | `/private-work` remains linked from Contact’s selected-work mode, not from this cover |

Nothing public was deleted from the site. Sentences that left the homepage still render on About, Experience, Field Notes, Side Quests, or the case-study route.

## 3. Cover layout

1. **Hero.** Who I am. Positioning, one philosophy line, one short description, Leader avatar, Explore Work, About Me.
2. **Credibility.** Truffle Security as one paragraph. Rapid7 and Forcepoint as two supporting links to `/experience`.
3. **Bento.** Work, Field Notes, Side Quests. Work is visually dominant. DOM order is the mobile order.
4. **One Side Quest.** Detector Coverage Atlas, with its existing Prototype label and summary. Not a project grid. The competitive field practice lives on `/work`, not here.
5. **Close.** A short note. Get in touch, and About.

The featured story is the competitive field practice, not a Side Quest and not the synthetic multithreading guide. The public story, the `kind: "work"` classification, and the case-study caveat already exist. Multithreading stays on Field Notes, labeled as a playbook.

## 4. Content destination map

| Homepage now says | Detail lives at |
| --- | --- |
| Positioning and philosophy line | About, for the longer philosophy |
| Truffle paragraph; Rapid7 and Forcepoint lines | `/experience` |
| Work tile | `/work` |
| Field Notes tile | `/field-notes` |
| Side Quests tile | `/side-quests` |
| Competitive field practice | `/work/competitive-intelligence-engine` |
| Detector Coverage Atlas, labeled Prototype | `/work/detector-coverage-atlas` and `/side-quests` |
| About me | `/about` |
| Get in touch | `/contact` |

Employment revenue figures stay off the homepage and off the rest of the site. No Head of Sales title is introduced.

## 5. Wireframe outline

**Desktop, 1280.** Hero is type on the left and the Leader portrait on the right. Credibility is a headline on the left and the Truffle paragraph plus two links on the right. The bento gives Work seven columns and two rows; Field Notes and Side Quests share the other five columns. The field practice is title left, paragraph and link right. The close is one quotation, one paragraph, two actions, on the paper background.

**Mobile, 375 and 390.** The same DOM order stacks. Hero actions are full width until 420px, then sit side by side. The portrait stays under the actions and within `max-w-[15rem]`. Bento tiles stack Work, Field Notes, Side Quests. No horizontal scroll. Heading sizes use the existing `editorial-title` and `editorial-section-title` clamps.

**768.** Hero can sit in one column until `lg`. The bento’s Work tile spans the two-column grid. Field Notes and Side Quests sit beside each other only from the `sm` breakpoint, still after Work.

**200% zoom.** Sections use `min-w-0`, wrapping text, and the page `max-w-5xl` padding. No fixed-width row forces overflow.

## 6. Components reused

- `PageMain`, `BrandAvatar` (`variant="leader"`), `EditorialBento`
- `roles`, `statusCopy.field`, `statusHelp.field`, `publicStories` (`competitive-evidence`)
- Existing editorial classes and surfaces: charcoal hero, clay Field Notes, sage Side Quests, copper accent

Not used on the homepage anymore: `ProjectPreview`, `ProjectStatusPill`, `featuredProjects`. `EditorialSection` was not added. It wraps a bordered panel and a required intro, which would add cards.

`components/site-header.tsx` is not edited.

## 7. Brand and documentation conflicts

- [page-wireframes.md](page-wireframes.md) described a longer Home. The Home section now points here.
- [editorial-experience.md](../brand/editorial-experience.md) described a five-tile bento, including private access. The bento is three destinations. Private access stays a route.
- [portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md) recorded the long homepage as the verified sequence. A note marks this cover as the replacement.
- [content-migration-map.md](content-migration-map.md) kept a field-guide link and a Side Quest lead on Home. Those rows now match this map.
- `/prototype` still says “Commercial Leader.” Out of scope. It is not the homepage.
- PR #45 may change the mobile menu in parallel. Do not resolve that conflict by editing the header here.
- `cursor/p0-content-structure-560c` rewrites Work, Field Notes, and About. It is not merged into this branch.
