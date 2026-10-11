# Duplicated, misplaced, and weakly supported content

**Status:** Audit at `e8880b3`. Findings are from the repository, not from a usability test.  
**Date:** 2026-10-11

Severity is editorial, not a bug score. P0 means a hiring reader can take the wrong lesson. P1 means repetition or a label problem. P2 means a supporting page can wait.

## Duplicated

| Item | Where it repeats | Owner that should remain | Severity |
| --- | --- | --- | --- |
| Advertising degree and "one claim a buyer can repeat" | Home "The person" and About hero | About | P1 |
| People / problem-driven / systems-minded explanations | Home credibility list, About cards, Field Notes Strategist / Leader / Builder list | About for the paragraphs. Home and Field Notes keep labels. | P1 |
| "Curious by nature. Builder by instinct." | Hero caption, About, Home pull quote | Caption on Home. Once in About. | P2 |
| Truffle Security points | Home credibility and `/experience` | `roles`, rendered in full on `/experience`. Home keeps the excerpt. | P1 |
| Rapid7 and Forcepoint points | Home case-study section and `/experience` | `/experience`. Home keeps one line. | P1 |
| First four role titles | About career list and `/experience` | `/experience` | P1 |
| Two field guides | Home and Field Notes featured | Field Notes. Home keeps the links. | P2 |
| Independent-build introduction | `/side-quests` and `/projects` hero | `/side-quests`. `/projects` becomes the directory. | P1 |
| Project status | `project-status-pill.tsx` and `status-badge.tsx` | One widget. Not a content duplication, a component one. | P2 |

## Misplaced

| Item | Where it sits | Why it is misplaced | Proposed home | Severity |
| --- | --- | --- | --- | --- |
| Enterprise Sales on `/work` | An anchor with two links, then the stories render under People & Leadership | The collection that should lead has no evidence body | Work → Enterprise Sales, using existing role points | P0 |
| `competitive-intelligence-engine` | GTM section, which is correct for kind, but the Work page also implies the whole registry block is GTM | Only this slug is `kind: "work"` | Stay in GTM Strategy. Do not add side-quest slugs beside it. | P0 |
| About "GTM and product work" | Four cards mixing a field practice, a coverage prototype, the project directory, and Truffle Camp | Kind is mixed inside an About grid | Split. Competitive evidence links to Work. The others link to Side Quests. | P0 |
| Experience related links | Truffle row links to customer-feedback and product-release, which are side quests | Easy to read as employer systems | Keep the links only with the sentence already on the page that they are not deployments. Do not add them to the Work GTM list. | P1 |
| `/experience` eyebrow | "Work · Revenue & GTM" | The Work destination is `/work` | Eyebrow: Experience | P1 |
| Directory category "All work" | `/projects` | "Work" means professional evidence in the nav | Visible label "All projects" without changing the empty query URL | P1 |
| Contact opening | Leads with sales-leadership and product-marketing | Home leads with enterprise selling and revenue leadership | Contact leads with the same pair. Product marketing stays a clause. | P1 |
| `/prototype` headline | "Commercial Leader. Curious Builder." | Retired positioning | Align or noindex in a later review. Not the six-page structure. | P1 |
| Capabilities | Linked from About beside the timeline | Reads like a second career map and uses titles the page itself disclaims | One link, after Side Quests exist as the project path, or drop the About link | P2 |
| Academy routes | Public, not in the six | Fine as learning URLs. Misplaced if a Field Notes card implies they are essays | Link from Side Quests → Learning, not from Field Notes collections | P2 |
| `/work/storytelling-guide` | Under `/work` | Fictional | Stays, labeled fictional. Not an Enterprise Sales story. | P1 |

## Weakly supported

| Item | What the page can actually say | Limit | Severity |
| --- | --- | --- | --- |
| Enablement story | Coaching, shared resources, two SDRs into closing roles, seven GTM hires onboarded, as already written in `publicStories` and `roles` | The story asks for review before more detail. Do not add the 3/2/2 split or quota math. | P0 to protect. The existing sentences may stay. |
| Enterprise deal guide | Labeled illustrative | Not a customer record and not a Work case study | P0 if the label is dropped |
| Multithreading guide | Labeled synthetic / interactive | Not a live stakeholder system | P0 if presented as a deployment |
| Detector Coverage Atlas | A reviewed static comparison | Not a parser, database, or refresh job | P0 if the page gains pipeline language |
| Revenue OS studies | Fictional company and fixture numbers | Not employment results. Not featured. | P0 if featured or unlabeled |
| Field Notes topic lists | Titles with no pages | "Topics to develop" is already on the page. A reader can still treat the titles as essays. | P0 |
| Creative Experiments | No projects | Do not invent members | P1 |
| Head of Sales | Not a held title in the public record used here | Leadership copy must stay contribution, not office | P0 |
| Joy Index | No public source in this repo | No route, excerpt, or sync | P0 |
| Analytics and usability | None collected | Wireframe choices are hypotheses | Recorded in the PRD. Not a content bug. |

## What is in the right place

- Homepage order: hero, credibility, bento, professional rows, then experiments, then person, then contact.
- Kind map in `lib/portfolio-registry.ts`.
- Avatar variants all using `/avatar.png`.
- Contact form without a résumé request.
- `/approach` redirect to `/about`.
- Personal interests limited to `lib/public-personal.ts`.
