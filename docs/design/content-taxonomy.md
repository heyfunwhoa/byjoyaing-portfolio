# Content taxonomy and route strategy

**Status:** Proposed for review. Routes in production do not change with this document.  
**Date:** 2026-10-11  
**Registry:** `lib/portfolio-registry.ts`, `lib/project-directory.ts`, `lib/public-stories.ts`  
**Route decision:** [ADR 0003](../decisions/0003-retain-experience-and-projects-routes.md)

## Six destinations

These are the only primary navigation items. Each has one job.

| Destination | Route | Purpose | Primary audience | Content owner |
| --- | --- | --- | --- | --- |
| Home | `/` | Why explore | Enterprise AE hiring manager, then a revenue-leadership reader | Homepage only. It previews. It does not own the full record. |
| About | `/about` | Who I am | Recruiter and general reader | Origin, philosophy, values, curated interests, education. |
| Work | `/work` | What I have done in the job | AE hiring manager, then leadership hiring manager | Professional evidence. |
| Field Notes | `/field-notes` | How I think | Reader who already accepts the commercial background | Methods, with an evidence label on every article. |
| Side Quests | `/side-quests` | What I build independently | Technical or product collaborator | Independent projects and their limits. |
| Contact | `/contact` | How to connect | Anyone ready to write | Address links and the inquiry form. |

Audiences are hypotheses from the brand guide, not measured segments.

## Facets

A piece of content can carry more than one facet. The facets do not replace the destination.

| Facet | Values | Rule |
| --- | --- | --- |
| Kind | `work`, `side-quest` | Set in `kindBySlug`. The URL prefix is not the kind. |
| Work collection | Enterprise Sales, People & Leadership, GTM Strategy | Only for kind `work` and for role evidence. Enterprise Sales is first. |
| Field Notes collection | Playbooks, Frameworks, Operating Systems, Lessons Learned | A note is one collection. Operating systems are processes, not claims of software. |
| Evidence | Used in practice, Illustrative model, Exploring | Required on Field Notes. Illustrative and synthetic stay in the same view as the example. |
| Side Quest subject | GTM & Revenue Systems, Security Research & Intelligence, Learning & Developer Tools, Creative Experiments | One subject. Empty is allowed. |
| Maturity | `field`, `prototype`, `designed`, `exploring` | Public copy: Professional field system, Prototype, Designed, Concept. Independent of subject. |
| Publication | Live, Draft, Proposed | Draft does not render as a finished article. |

Signature capabilities (Relationships, Revenue Systems, People & Teams) and pillars (Strategist, Leader, Builder) are brand lenses. They are not collections and not job titles.

## Current directory vocabulary

`/projects` filters with a second list:

| Query | Directory label | Proposed public subject | Fit |
| --- | --- | --- | --- |
| `revenue` | Revenue Strategy & Operations | GTM & Revenue Systems | Direct |
| `accounts` | Account & Market Intelligence | Split: account systems → GTM & Revenue Systems; security research → Security Research & Intelligence | Needs a per-project choice, not a blanket rename |
| `enablement` | Sales Enablement & Productivity | Learning & Developer Tools, except a field curriculum that is also a Side Quest | Review each slug |
| `customer` | Customer & Product Intelligence | GTM & Revenue Systems | Direct |
| `technical` | Technical Systems & AI | Learning & Developer Tools | Direct |
| none | All work | All Side Quests | The word "work" in this filter is a legacy label. It does not mean the Work destination. |

Do not rename those query values in the same change as the visible Side Quest headings. Old links to `?category=revenue` must keep filtering.

## Route strategy

1. The six navigation hrefs stay.
2. A URL that has been public keeps resolving. A new path is an addition. A removed path gets a permanent redirect in the same pull request as the removal, with a link test.
3. `/experience` stays the timeline. `/projects` stays the directory. Neither redirects to its sibling index. Their jobs differ. See ADR 0003.
4. `/work/[slug]` stays the case-study path for both kinds until a reviewed split adds redirects.
5. `/approach` already redirects to `/about`. Leave it.
6. `/capabilities`, academy routes, `/account-signal`, `/private-work`, and `/prototype` stay out of the header.
7. `/private-work` and `/account-signal` stay noindex.
8. The Joy Index has no route.
9. Header active state: `/work` exact-matches the index, so a case study does not light the Work item. That is acceptable while case studies include Side Quests. Revisit only if case-study URLs are split by kind.

## Ownership

| Record | File | Public surface |
| --- | --- | --- |
| Roles | `lib/portfolio.ts` `roles` | Home excerpts, `/experience`, About arc |
| Projects | `lib/portfolio.ts` `projects` | `/work/[slug]` |
| Kind | `lib/portfolio-registry.ts` | `/work`, `/side-quests` |
| Directory filters | `lib/project-directory.ts` | `/projects`, Side Quest deep links |
| Narrative stories | `lib/public-stories.ts` | `/work` |
| About sentences and interests | `content/about/page.json` through `lib/about/editorial.ts`. `lib/public-personal.ts` projects the beyond-work fields and is not a second copy. | `/about` |
| Field note copy | route files and `lib/field-notes.ts` | `/field-notes/*` |

One fact has one owning file. Other pages link to the surface that renders it.
