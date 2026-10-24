# Content model

Words on the site are data with a job. This document defines **content fields and publishing boundaries**, not the authoritative visual brand. See [canonical brand guidelines](brand/brand-guidelines.md) for positioning, copy hierarchy and visual identity. Product scope for the next pass is [portfolio-experience-v2-prd.md](product/portfolio-experience-v2-prd.md). Notes below that wait on an unmerged pull request #1, or that describe a public resume request, are historical: the resume request is no longer linked in the interface, and `/api/request-resume` still exists in the codebase.

## Content categories (brand authority lives in the canonical guide)

**joy.** is the personal mark. It can appear as a logo or a short signature. It is not a second website.

**Kristen Aing** is the professional name. Use it in the title, the header, and metadata. The signature `joy.` stays separate: the header reveals it on hover and keyboard focus, and the footer shows it beside the name.

**Revenue & GTM Leader · Curious Builder** is the positioning line. It is the sentence a visitor should be able to repeat. It does not replace the longer story on About.

**Field Notes** is the editorial home for playbooks, frameworks, lessons learned, and an **Operating Systems** collection. The public `/field-notes` route contains examples and concepts that must be distinguished from verified professional practice.

**People · Strategy · Systems** remain the foundational themes of the brand. These are distinct from identity pillars and content lenses.

**Relationships**, **Revenue Systems**, and **People & Teams** are signature content lenses; **Strategist**, **Leader**, and **Builder** are brand pillars. Neither list is a set of alternate job titles.

**Work** is professional experience and business impact: employers, the sales motion, coaching, and field systems that a team actually used. Impact is described without invented revenue, quota, or adoption numbers.

**Builds / Side Quests** are independent software and creative projects. They include portfolio case studies and apps in other repositories. A side quest can be a prototype. Say so.

**The Joy Index** is a private workspace. It is not a route, not a folder in this repository, and not a section on the site. Do not paste its notes into a page, a commit, or a pull request. If a future tool needs to read it, that tool runs locally or in a separate private project. This portfolio never imports it.

**Audience proof:** Hands-on enterprise selling examples belong in Work even when a Field Notes playbook references them. Coaching/management examples distinguish formal authority from informal influence. Field Notes entries carry a provenance state: Used in practice, Illustrative model, or Exploring.

**Connected Field Notes:** `/field-notes/enterprise-deal` and `/field-notes/multithreading` use a public-safe editorial source registry in `lib/field-notes.ts`. This registry is descriptive; it does not import code or access live data from Account Signal Engine, Channel Territory Mapping, or Security Market Map. Private source repository URLs, internal account records, and customer relationship data must not be published. Future live cross-repo integration requires a server-side permissioned interface, tenant/access checks, source provenance, and a reviewed data-sharing contract.

## Where content lives now

| Content | File | Public? |
| --- | --- | --- |
| Work narrative prose | `content/work/stories/*.json`, joined by `lib/public-stories.ts` | Yes, at `/work`. Id, area, and related links stay in that module. |
| Home cover | `content/home/page.json`, read by `lib/home/editorial.ts` | Yes, at `/`. The Open Graph image reads the same eyebrow and headline. Role facts stay in `roles`. |
| About sentences | `content/about/page.json`, read by `lib/about/editorial.ts` | Yes, at `/about`. `lib/public-personal.ts` only projects the beyond-work fields. |
| Verification lesson prose | `content/academy/lessons/verification.json` | Yes, inside Academy. Checks and progress stay in code. |
| Project case studies | `lib/portfolio.ts` | Yes, at `/work/[slug]` |
| Roles, when present | `lib/portfolio.ts` (`roles`) | Yes, once a page renders them. This remains the only title, date, and company record. |
| Sales-use-case copy on the redesign branch | `lib/sales.ts` | Yes, but only after pull request #1 merges |
| Contact and resume request | `app/inquiry-form.tsx`, `app/api/*` | The form is public. The PDF is not in git |
| Resume file the API looks for | `content/kristen-aing-resume.pdf` | Only if someone adds the file. It is not in the repo |

The table's PR #1 note is historical. The About and verification rows were added 2026-10-14. Which future pages may move into the existing Keystatic editor, and which data must not, is the [editorial foundation](content/editorial-foundation.md). That record does not replace the field rules in this file.

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


## CMS selection and cross-repository editorial boundaries (decision guide, 2026-10-14)

**Status:** Working adoption guidance, not an approved cross-repository implementation or authorization to migrate data. This section is portfolio-specific. See [CMS fundamentals](builder-academy/cms-fundamentals.md) for general concepts, alternatives, and source links. Inspect current repository states and vendor terms before a future adoption decision.

**Default:** The local editor has the verification lesson, the About singleton, the Home cover singleton, the Work narrative collection, the `reading-code-and-yaml` and `mcp-vs-rest-api` lesson singletons, the two published Field Notes guides, and the thirteen public case-study summaries in [editorial-foundation.md](content/editorial-foundation.md). About, the Home cover, and Work narratives merged to `main` on 2026-10-15 and stay In Review until the live site is re-read. Hosted editing is not enabled. This is not permission to migrate the Field Notes index, the rest of a case study, or the rest of Academy. Keystatic authors reviewable, structured **public editorial content** in the owning repository. GitHub review, CI, and Vercel deployment remain separate publishing gates. None of these records is evidence of hosted GitHub authentication.

### Which system owns what?

| Type of information | Primary home | Why / publication rule |
| --- | --- | --- |
| Product PRDs, research planning, editorial backlog and draft ideas | Canonical Notion workspace | Working decisions and private notes; selectively approve public excerpts, never automatically sync |
| Public website pages, Field Notes, case-study narratives, educational lesson text | Keystatic where editing friction warrants it, otherwise reviewed Git files | Reviewed, structured editorial content; page components and interactive behavior stay in code |
| Application code, content history, human-reviewed change evidence | GitHub in each owning repository | Pull requests, validations, rollback, audit trail |
| Raw collected sources, immutable source versions, vendor claims, provenance, detector capabilities and observations | Owning research schemas, collectors and evidence storage | Typed evidence and verification workflows; not free-form CMS assertions |
| User identities, private case-study access, learner progress, account signals, contacts, territory records, consumption events and scenario executions | Authenticated application stores (e.g. Neon/Postgres where appropriate) | Data permissions, query semantics, updates and retention are not editorial publishing |
| Revenue OS scenario calculations and model assumptions used computationally | Validated owning-repository scenario/model contracts | The CMS may describe synthetic scenarios but must not quietly override formulas or validated numerical inputs |
| Public deployment/preview state | Vercel and release verification | Neither an editorial status nor a Git merge alone proves live publication |

### Adoption choices by repository

These are **recommendations to validate**, not implementation status claims:

| Repository/product | Now | Possible later | Boundary |
| --- | --- | --- | --- |
| byjoyaing-portfolio | **Adopt, local About singleton, Home cover, Work narratives, the two KRU-77 lesson singletons, the two published Field Notes guides, and the case-study summaries.** Side Quests beyond that summary, the Field Notes index, full case-study narratives, and the remaining Academy lessons stay proposed | Authenticated hosted editing after a separate Tier 3 review | Do not move UI logic, branding tokens, protected content, or the private Joy Index |
| security-market-map | **Do not migrate evidence catalog** | Human-reviewed market explainers, category guides, vendor-neutral editorial articles | Source IDs, original URLs, confidence, licensing and observation dates remain owned by research schema |
| gtm-revenue-os | **Keep model and calculations in code/data** | Synthetic scenario narratives, usage guides, decision exercises | ARR/bookings/revenue/cash math and numerical assumptions are validated separately |
| account-signal-engine / Research Hub | **Keep collection and source review out of CMS** | Curated public-safe methodology or help articles | Versioned evidence, consent, authorization, erasure and signals stay in owning system |
| detector-coverage-atlas | **Keep detector and coverage records structured** | Editorial methodology, glossary, explainers | Never turn unknown or unverified coverage into supported/unsupported CMS checkmarks |
| technical-docs-platform | **Keep standards as versioned, reviewed docs** | CMS evaluation only if nontechnical editorial need is demonstrated | Canonical policies, templates and agent contracts stay in owning repository |
| joy-index | **Do not adopt as a public-content CMS** | Private editorial tooling only after a separate privacy and threat-model review | No public repo imports, leaks, automatic publishing or private-to-public sync |
| channel-territory-mapping / Partner Workspace | **Parked; no new integration** | Approved partner collateral or enablement articles | Never move customer, partner, contact or territory operational data to public CMS |
| truffle-camp / secret-safari | **Evaluate after portfolio pilot** | Human-authored lessons, quizzes' explanatory copy and game narratives | Learner state, scoring and game logic remain in application systems |

**KRU-109 class.** The six repositories named in the editorial foundation use one label each. **Later:** security-market-map. **Do Not Adopt:** gtm-revenue-os, account-signal-engine, detector-coverage-atlas, joy-index, and technical-docs-platform. byjoyaing-portfolio is **Adopt** for the local About singleton, the Home cover in KRU-111, the Work narratives in KRU-112, the two lesson singletons in KRU-77, the Field Notes guides in KRU-115, and the case-study summaries in KRU-116. A "Possible later" cell is a revisit trigger for that repository's maintainers. It is not a decision to install Keystatic, and this portfolio does not copy or sync their content. The same labels are restated in [editorial-foundation.md](content/editorial-foundation.md).

### Adjacent use cases to assess before adopting a CMS

- **One article in multiple apps:** Sanity or another API-first headless CMS may reduce duplicated editorial copies when reuse is frequent and independently published. A central Git content repository is another option. Do not introduce either until a second real consumer, ownership, transformation and access contract are documented.
- **Visual page editing and layout composition:** Evaluate Sanity visual editing, TinaCMS or an existing component library only if writers need in-context edits. Do not make arbitrary page layouts CMS-configurable without constraints and accessibility review.
- **Multilingual/localized content:** Evaluate translation states, locale fallbacks, review per locale, stable IDs, SEO and synchronization burdens before enabling locales.
- **Scheduled campaigns, release notes or newsletters:** A CMS may own reviewed copy; scheduling, sending, subscription consent and delivery logs belong to the appropriate application/service.
- **Approvals and multiple contributors:** Need explicit roles, draft/preview/review/publish permissions, branch protection and rollback. Editorial status fields alone are not access controls.
- **Media and document assets:** Evaluate licensing, image transformations, alt text, content rights, storage quotas, CDN caching, responsive images and deletion/retention across deployments.
- **Personalized, authenticated or paid content:** Do not assume private CMS records stay private if rendered into public bundles, datasets or asset URLs. Specify reader authorization and cache boundaries first.
- **Structured SEO and entity relationships:** CMS is suitable for summaries, canonical links and metadata; analytical entity graphs, evidence claims and changing observations remain in typed datasets.
- **AI-assisted drafting and automated ingestion:** Draft suggestions may flow into human review with provenance and licensing checks. Never allow generated text or collected material to bypass source verification or publish automatically.
- **Learning content:** Editorial lesson text can be CMS-owned; stable lesson IDs, prerequisites, assessments, progress, completion, grading and entitlements must be modeled and verified separately.
- **Governance, cost, and portability:** Compare Git build frequency, editor seats, API usage, dataset limits, backup/export, vendor lock-in, migration complexity, audit trails and failure modes. Refresh vendor-specific prices before decisions.

### Revisit triggers and proposed adoption test

Keep Keystatic unless a measurable need arises: two or more actively maintained publishing destinations repeatedly need the same article; editors need independent publication without app deploys; rich references, localization, approvals or media delivery become material; or Git-based publishing causes sustained friction. Then compare Keystatic, Sanity, Payload, TinaCMS and **no CMS** using a short decision record (requirements, alternatives, operational/privacy costs, proof of edit→review→preview→publish→rollback, exit plan). Do not preemptively standardize a central CMS.

**Workflow:** Prototype locally with public/synthetic fixtures → verify edit/save/render and invalid-content failures → review branch/PR → run applicable CI and privacy/accessibility checks → human approval → merge → separately verify live deploy. Follow AGENTS.md risk-based Linear tiers: routine editorial edits need no new ticket; a new CMS schema/content migration is Tier 2; hosted authentication, access changes or cross-repository publishing is Tier 3. Reuse existing issues/PRs before creating tracking.

