# Information architecture

Information architecture is the set of pages, the job of each page, and the links between them. Visual design comes after this map. If two pages have the same job, one of them should go.

## What exists today

Facts from `app/` and `next.config.ts` on this tree:

| URL | Job it actually does |
| --- | --- |
| `/` | Positioning sentence, strengths, skills, tools, proof counts, three featured projects |
| `/about` | The same sentence, the same strengths, skills, tools, roles, education |
| `/projects` | All case studies, grouped by lifecycle phase, plus a Next group |
| `/work/[slug]` | One case study. Ten slugs. |
| `/contact` | Email, LinkedIn, GitHub, message form, resume request |
| `/approach` | Permanent redirect to `/about` |
| `/experience` | Permanent redirect to `/about` |

There is no `/work` index. `app/work/[slug]/page.tsx` does not prevent adding `app/work/page.tsx` later. There is no `/side-quests`. The Joy Index has no route, and it should stay that way.

Lifecycle phases in `lib/portfolio.ts`: Discover, Decide, Build, Launch, Enable, Distribute, Measure. Measure has no projects. The page says so. That honesty is good. It is a weak top-level navigation, because a visitor does not arrive thinking in those phases. **Assumption:** the phase model is useful once someone is inside the work, and too abstract to be the primary map. Untested.

## Content hierarchy for the brand you stated

This is the target order of ideas. It is a decision, not a research result.

1. **joy.** Personal mark. Small. Not a second site and not a page title.
2. **Kristen Joy Aing.** Name. Header and document title.
3. **Commercial Leader. Curious Builder.** The line a visitor should be able to repeat. Homepage `h1`.
4. **People first. Problem-driven. Systems-minded.** Principles. Support the line. They do not replace it.
5. **Work.** Professional experience and business impact. Roles, and field systems a team actually used.
6. **Side Quests.** Independent software and creative projects. Status stays honest.
7. **Contact.** One conversation, plus a resume request.

The Joy Index is a private workspace. It is not step 8. It is not a folder in this app, not a nav item, and not a source you paste from.

## Proposed sitemap

Preserve every URL that is already public. New names are additions plus redirects.

| URL | Job | Notes |
| --- | --- | --- |
| `/` | Say who she is, offer two doors, show one proof | Hero changes before the rest of the page |
| `/about` | Story, principles, education, how she works | Not a second homepage. Advertising degree belongs in the story |
| `/work` | Index of professional experience | New. Roles first. Field systems can be linked, not mixed in unlabeled |
| `/work/[slug]` | Case study, unchanged URL | Do not move slugs in the same pull request as the new index |
| `/experience` | Redirect to `/work` | Replaces the redirect to `/about` only when `/work` exists |
| `/side-quests` | Index of independent projects | New. Cards link to existing case studies |
| `/projects` | Redirect to `/side-quests` | Only after that index exists |
| `/contact` | Same form | Headline can name the conversation you want |
| `/approach` | Keep redirecting to `/about` | Already public |
| `/capabilities` and `/capabilities/[slug]` | Only on pull request #1 | Keep until you fold or redirect them. Do not delete a shared URL |
| Joy Index | No URL | Private |

One canonical URL per essay. A side quest does not also live at a second slug.

## How a project earns a door

Today `Project` has `status` and `phase`. It does not have `kind`. Do not guess `kind` from the phase.

When you add the field, the allowed values are `work` and `side-quest`, and the value has to be something the copy can support:

- **Work** if the record is a job, or a system you describe as used with a team in a role.
- **Side quest** if you describe it as independent, or as software that is not an employer product.

If a record is silent, leave it unclassified until you decide. Silence is not permission to invent a customer or a deployment.

Status stays orthogonal:

| Status on this tree | Meaning already written on `/projects` |
| --- | --- |
| Prototype | Something runs here |
| Field system | It ran with a team |
| Designed | The operating model exists |
| Next | Sequenced, not claimed |

Pull request #1 uses a different vocabulary for the same idea: Prototype, Professional field system, Designed, and Concept. If that branch becomes the parent, use those words in the UI. The rule does not change: status is honesty, kind is the door.

## Page-level hierarchy

**Home.** Name, positioning, principles, primary link to Work, secondary link to Side Quests, one side-quest proof (the atlas, still labeled Prototype and independent), then a short close to Contact. Strengths do not need to appear in full if About owns them.

**About.** A story `h1` that is not the homepage `h1`. Principles, the advertising degree as part of the story, then education and tools. Roles move to Work so About can be a narrative.

**Work.** Page `h1` about commercial leadership. Every role, with dates and titles visible without a disclosure. Qualitative bullets. Links to field systems that belong to this door. No quota block.

**Side Quests.** Page `h1` about building. Filters may stay status-based. The lifecycle can be a secondary grouping. The atlas remains the first running example.

**Contact.** Who should write, and why. The form you have is enough.

## What you should learn

A sitemap is a list of jobs, not a list of components. If you cannot finish the sentence "This page exists so that…", the page is a section that landed in the nav.

Redirects are part of the architecture. `/experience` already taught that lesson: the URL survived, and it currently delivers the wrong page for the word "experience." When you point it at `/work`, check it. A redirect to the wrong destination is worse than a page you have not built yet, because it looks intentional.
