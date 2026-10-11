# Current-to-proposed content migration map

**Status:** Proposed for review. No pages move in this change.  
**Date:** 2026-10-11  
**Baseline:** `main` at `e8880b3`, live site https://www.byjoyaing.com/  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md)  
**Requirements:** [portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md)

Reading order for the public story stays: enterprise selling, then leadership evidence, then independent systems.

Actions:

| Action | Meaning |
| --- | --- |
| Keep | Stays on this URL. Copy may be tightened later. |
| Relabel | Same URL. The visible group or evidence label changes. |
| Point | A duplicate paragraph becomes a link to the page that owns it. |
| Hold | Do not publish more detail until a source is reviewed. |
| Leave | Supporting URL. Not a primary destination. No redirect in this proposal. |

## Primary destinations

| Current | Owner today | Proposed owner | Action |
| --- | --- | --- | --- |
| `/` hero, one-line philosophy, Leader avatar | Home | Home | Keep. The second hero action is About, not Side Quests. See [homepage-simplification.md](homepage-simplification.md). |
| `/` People / Problem-driven / Systems list | Home | About | Point. Home keeps the single philosophy line. The three-item list leaves the homepage. |
| `/` Truffle record | Home | Home, condensed; full points on `/experience` | Condense to one paragraph made from the existing points. |
| `/` Rapid7 and Forcepoint rows | Home | `/experience` | Point. Home keeps one existing sentence each. Full bullets stay on the timeline. |
| `/` field-guide links | Home | Field Notes | Move. Home does not list the guides. |
| `/` featured experiments | Home | Side Quests | Move. Home does not show a project grid. Side Quests remains a bento tile. |
| `/` advertising paragraph and pull quote | Home and About | About | Point. Home keeps the avatar caption, not the essay. |
| `/` private-work tile and second private button | Home | `/private-work` | Remove from Home. The route stays. |
| `/` one competitive field practice | Home | `/work/competitive-intelligence-engine` | Keep one story. The case study owns the detail. The monitor stays a design. |
| `/` connect | Home | Contact | Keep one contact action in the close, plus About. The form stays on `/contact`. |
| `/about` origin, philosophy, values, interests | About | About | Keep. Interests stay the curated set in `lib/public-personal.ts`. |
| `/about` four-company title list | About | `/experience` | Point. About names the arc in one paragraph. |
| `/about` "GTM and product work" cards | About | Split by kind | Relabel. Competitive evidence stays Work. Atlas, account workflows, and Truffle Camp stay Side Quests. |
| `/about` toolkit | About | About | Keep, behind the story. It is not the lead. |
| `/work` three collection labels | Work | Work | Relabel the bodies so each collection has its own evidence. |
| `/work` People stories in `lib/public-stories.ts` | Work | Work → People & Leadership | Keep. Hold further numeric detail. The page already says to verify before adding more. |
| `/work` `kind: "work"` registry item | Work | Work → GTM Strategy | Keep `competitive-intelligence-engine` here. |
| `/experience` role timeline | Experience | Experience, linked from Work and About | Leave. Do not redirect to `/work`. The timeline and the collection index do different jobs. |
| `/field-notes` two guides | Field Notes | Field Notes featured | Keep. Labels stay illustrative / synthetic. |
| `/field-notes` collection topic lists | Field Notes | Field Notes | Relabel as not yet published. |
| `/field-notes/enterprise-deal`, `/field-notes/multithreading` | Field Notes | Playbooks or Frameworks, as labeled | Keep URLs. |
| `/side-quests` selected projects | Side Quests | Side Quests | Keep. Add subject group only where the project already fits. |
| `/side-quests` category links | Side Quests → `/projects?category=` | Same URLs until the directory is absorbed | Leave. Confirm each query still filters before any label change. |
| `/projects` directory | Projects | Supporting directory for Side Quests | Leave. |
| `/contact` form and links | Contact | Contact | Keep. Modes stay message and selected work. |
| `/private-work` | Private invitation | Not a nav item | Leave. Noindex stays. Joy Index is not this page. |

## Case-study URLs

Every slug in `lib/portfolio-registry.ts` stays at `/work/[slug]`. Kind, not the folder, decides Work versus Side Quest. A future `/side-quests/[slug]` is out of scope until each old URL 301s and tests cover the links.

| Slug | Kind now | Proposed collection | Action |
| --- | --- | --- | --- |
| competitive-intelligence-engine | work | GTM Strategy | Keep. Field practice, not a deployed product monitor. |
| detector-coverage-atlas | side-quest | Security Research & Intelligence | Keep. Static comparison. Not a pipeline. |
| account-intelligence | side-quest | GTM & Revenue Systems | Keep. |
| customer-feedback-intelligence | side-quest | GTM & Revenue Systems | Keep. Not an employer deployment. |
| truffle-camp | side-quest | Learning & Developer Tools | Keep. Curriculum design, not the employer's training. |
| product-release-intelligence | side-quest | GTM & Revenue Systems | Keep. |
| partner-gtm-engine | side-quest | GTM & Revenue Systems | Keep. Design, not the Metadot program. |
| product-prioritization-simulator | side-quest | GTM & Revenue Systems | Keep. |
| gtm-campaign-lab | side-quest | GTM & Revenue Systems | Keep. |
| security-signal-intelligence | side-quest | Security Research & Intelligence | Keep. Idea, not Rapid7 playbooks. |
| revenue-planning-simulator, revenue-intelligence, gtm-operating-plan | side-quest | GTM & Revenue Systems | Keep unfeatured. Synthetic book stays labeled. |

Creative Experiments has no current member. Do not move a project there to fill the group.

## Routes that are not the six destinations

| URL | Proposal |
| --- | --- |
| `/approach` | Already permanent-redirects to `/about`. Keep. |
| `/capabilities` and `/capabilities/[slug]` | Leave. Not a seventh nav item. About may link once. The pages already say they are not job titles. |
| `/ai-academy/*`, `/builder-academy/*`, `/builder-guide` | Leave under learning. Side Quests may link the academy index. Do not merge these URLs into Field Notes. |
| `/account-signal` | Leave. Noindex. Not a public case study lead. |
| `/prototype` | Leave off the nav. Copy still says "Commercial Leader." A later review either aligns that sentence or noindexes the page. Not this change. |
| `/work/storytelling-guide` | Leave. It is a fictional guide. It must stay labeled as such. |
| Joy Index | No URL, no redirect, no import. |

## What does not migrate

Employment revenue, quota, ranking, and growth percentages stay off the site. Private Joy Index notes do not become rows in this map. Phone numbers do not move onto Contact.
