# Content model

Words on the site are data with a job. This document defines **content fields and publishing boundaries**, not the authoritative visual brand. See [canonical brand guidelines](brand/brand-guidelines.md) for positioning, copy hierarchy and visual identity. The pages do not move in this phase.

## Content categories (brand authority lives in the canonical guide)

**joy.** is the personal mark. It can appear as a logo or a short signature. It is not a second website.

**Kristen Joy Aing** is the professional name. Use it in the title, the header, and metadata.

**Commercial Leader. Curious Builder.** is the positioning line. It is the sentence a visitor should be able to repeat. It does not replace the longer story on About.

**Work** is professional experience and business impact: employers, the sales motion, coaching, and field systems that a team actually used. Impact is described without invented revenue, quota, or adoption numbers.

**Side Quests** are independent software and creative projects. They include portfolio case studies and apps in other repositories. A side quest can be a prototype. Say so.

**The Joy Index** is a private workspace. It is not a route, not a folder in this repository, and not a section on the site. Do not paste its notes into a page, a commit, or a pull request. If a future tool needs to read it, that tool runs locally or in a separate private project. This portfolio never imports it.

## Where content lives now

| Content | File | Public? |
| --- | --- | --- |
| Project case studies | `lib/portfolio.ts` | Yes, at `/work/[slug]` |
| Roles, when present | `lib/portfolio.ts` (`roles`) | Yes, once a page renders them |
| Sales-use-case copy on the redesign branch | `lib/sales.ts` | Yes, but only after pull request #1 merges |
| Contact and resume request | `app/inquiry-form.tsx`, `app/api/*` | The form is public. The PDF is not in git |
| Resume file the API looks for | `content/kristen-aing-resume.pdf` | Only if someone adds the file. It is not in the repo |

One project should have one status. The vocabulary on the redesign branch is: Prototype, Professional field system, Designed, Concept. Do not add "production" because a page looks finished.

## What a project record must be able to say

These fields are the target. Some already exist on `Project` in `lib/portfolio.ts`. Some exist only on the redesign branch. A later pull request unifies them. It does not invent values.

- Title and slug
- Short description
- The business problem
- Who it is for
- Status, from the vocabulary above
- Whether it is Work (used in a job) or a Side Quest (independent)
- Technology that is actually installed or written
- Case study path (`/work/[slug]` until a redirect exists)
- Live URL, only if one has been supplied
- Repository URL, only if the repository is public

Empty means absent. Do not write a placeholder URL.

## Synthetic examples

The GTM Revenue OS case studies on the redesign branch use a fictional company and synthetic planning numbers. Those numbers teach the shape of a model. They are not Kristen’s employment results. Any page that shows them has to say that in the same view as the number.

## Links that must keep working

See [rebuild-roadmap.md](rebuild-roadmap.md) for the redirect table. The rule: a URL that has been public keeps resolving. A new name is an addition plus a redirect, not a rename that 404s.

## Next implementation gate (P0)

Create a typed registry defining `kind: "work" | "side-quest"` with stable `slug`, title, short description, verified status and evidence provenance. Preserve the existing public route map; do not make up missing URLs or outcomes. Add tests for unique slugs, required metadata, allowed status values and working internal destinations. Prefer adapters that preserve current rendering while migrating content, and do not copy the same project into two competing collections.
