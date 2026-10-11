# Route inventory — 2026-10-11

**Method:** HTTP GET of https://www.byjoyaing.com with a browser-like user agent. Parsed status, final URL, `<title>`, first `<h1>`, and `meta name="robots"`. Sitemap from `/sitemap.xml` (200, 33 URLs). Source routes from `app/**/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `next.config.ts` at `a76e5e9`.

**Not done:** Playwright, screenshots, viewport matrix, keyboard, 200% zoom.

`robots=-` means no robots meta tag was present. The site `robots.txt` allows all user agents and points at the sitemap.

## Sitemap routes (all HTTP 200)

| Path | Title | H1 | Robots meta | In primary nav |
| --- | --- | --- | --- | --- |
| `/` | Kristen Joy Aing — Revenue & GTM Leader · Curious Builder | Revenue & GTM Leader. Curious Builder. | — | Home |
| `/about` | About — Kristen Joy Aing | Strategist. Leader. Builder. | — | About |
| `/experience` | Experience — Kristen Joy Aing | A decade selling technical security, and teaching the story. | — | No. Linked from Home and Work. |
| `/work` | Work \| Revenue & GTM Leadership | People. Strategy. Systems. | — | Work |
| `/side-quests` | Side Quests \| Independent Projects | Curiosity, put to work. | — | Side Quests |
| `/field-notes` | Field Notes — Kristen Joy Aing | Thinking out loud. Building in practice. | — | Field Notes |
| `/field-notes/enterprise-deal` | Strategic Enterprise Deal Anatomy — Field Notes | Strategic Enterprise Deal Anatomy | — | Child of Field Notes |
| `/field-notes/multithreading` | Multithreading & Stakeholder Mapping — Field Notes | Multithreading is about alignment, not a contact count. | — | Child of Field Notes |
| `/contact` | Contact — Kristen Joy Aing | Let's connect. | — | Contact |
| `/projects` | Projects — Kristen Joy Aing | Systems for how a revenue team plans, sells, and learns. | — | No. ADR 0003 keeps the route. |
| `/builder-guide` | Builder Guide — Kristen Joy Aing | A little curiosity goes a long way. | — | No |
| `/capabilities` | Capabilities — Kristen Joy Aing | Commercial work, shown as systems. | — | No |
| `/capabilities/revenue-strategy` | Revenue Strategy — Kristen Joy Aing | Revenue Strategy | — | No |
| `/capabilities/gtm-engineering` | GTM Engineering — Kristen Joy Aing | GTM Engineering | — | No |
| `/capabilities/revenue-operations` | Revenue Operations — Kristen Joy Aing | Revenue Operations | — | No |
| `/capabilities/ai-product` | AI Product & Systems — Kristen Joy Aing | AI Product & Systems | — | No |
| `/capabilities/sales-enablement` | Sales Enablement — Kristen Joy Aing | Sales Enablement | — | No |
| `/ai-academy` | AI Enablement Academy \| Learn, Apply, Build | Learn the basics. Apply with purpose. | — | No |
| `/ai-academy/programming` | Programming Foundations \| Builder Academy | Learn the languages behind the things you build. | noindex, nofollow | No. **Listed in the sitemap while noindex.** |
| `/ai-academy/systems` | Systems Engineering \| Builder Academy | Engineering connected systems | — | No |
| `/work/detector-coverage-atlas` | Detector Coverage Atlas — Kristen Joy Aing | Compare coverage without calling a gray cell a gap. | — | Side quest on a `/work/` URL |
| `/work/product-release-intelligence` | Product Release Intelligence — Kristen Joy Aing | Product Release Intelligence | — | Side quest |
| `/work/truffle-camp` | Truffle Camp — Kristen Joy Aing | Truffle Camp | — | Side quest |
| `/work/competitive-intelligence-engine` | Competitive Intelligence Engine — Kristen Joy Aing | Know what changed. Understand why it matters. Act with confidence. | — | Only `kind: "work"` software study |
| `/work/customer-feedback-intelligence` | Customer Feedback Intelligence — Kristen Joy Aing | Turn customer conversations into product decisions. | — | Side quest |
| `/work/product-prioritization-simulator` | Product Prioritization Simulator — Kristen Joy Aing | Product Prioritization Simulator | — | Side quest |
| `/work/partner-gtm-engine` | Partner GTM Engine — Kristen Joy Aing | Partner GTM Engine | — | Side quest |
| `/work/account-intelligence` | Account Intelligence — Kristen Joy Aing | Turn account signals into timely, relevant outreach. | — | Side quest |
| `/work/revenue-planning-simulator` | Revenue Planning Simulator — Kristen Joy Aing | Revenue Planning Simulator | — | Side quest. Synthetic study. |
| `/work/revenue-intelligence` | Revenue Intelligence — Kristen Joy Aing | Revenue Intelligence | — | Side quest. Synthetic study. |
| `/work/gtm-operating-plan` | GTM Operating Plan — Kristen Joy Aing | GTM Operating Plan | — | Side quest. Synthetic study. |
| `/work/gtm-campaign-lab` | GTM Campaign Lab — Kristen Joy Aing | GTM Campaign Lab | — | Side quest |
| `/work/security-signal-intelligence` | Security Signal Intelligence — Kristen Joy Aing | Security Signal Intelligence | — | Side quest |

## Routes outside the sitemap

| Path | Status | Final URL | Robots | H1 | Notes |
| --- | --- | --- | --- | --- | --- |
| `/approach` | 200 | `/about` | — | Strategist. Leader. Builder. | Permanent redirect in `next.config.ts`. |
| `/design-lab` | 404 | `/design-lab` | noindex | none parsed | Production gate. Source page exists and is `noindex`. |
| `/resume` | 404 | `/resume` | noindex | 404 | Intentional. Resume UI removed. |
| `/prototype` | 200 | `/prototype` | noindex, nofollow | Commercial Leader. Curious Builder. | Contradicts approved positioning. |
| `/private-work` | 200 | `/private-work` | noindex, nofollow | A deeper look at the work. | Auth behavior not retested. |
| `/account-signal` | 200 | `/account-signal` | noindex, nofollow | LimaCharlie, from one public documentation page | Research prototype. |
| `/work/storytelling-guide` | 200 | same | — | Two kinds of work. Two ways to tell the story. | Indexable and unlisted. |
| `/builder-academy/identity-journey` | 200 | same | — | Identity is more than a login. | Indexable and unlisted. |
| `/builder-academy/credential-risk` | 200 | same | — | A leaked secret is the beginning of the investigation. | Indexable and unlisted. |
| `/ai-academy/playground` | 200 | same | noindex, nofollow | AI Playground | Parent is noindex. |
| `/ai-academy/playground/skill-builder` | 200 | same | — | Build a Skill | Child is indexable. |
| `/ai-academy/playground/research-pipeline` | 200 | same | — | Research Pipeline Simulator | Child is indexable. |
| `/ai-academy/journeys/prompting` | 200 | same | — | Turn a vague prompt into a research workflow | Indexable and unlisted. |
| `/ai-academy/journeys/source-verification` | 200 | same | — | Can you trust an AI-generated claim? | Indexable and unlisted. |
| `/ai-academy/devops/build-rate-limits` | 200 | same | — | Why did my deployment get rate-limited? | Indexable and unlisted. |
| `/ai-academy/dependencies/lockfiles` | 200 | same | — | Lockfiles & reproducible builds | Indexable and unlisted. |
| `/ai-academy/git-lab` | 200 | `/ai-academy/version-control` | noindex, nofollow | Git Workflow Essentials | `permanentRedirect` in the page module. |
| `/ai-academy/version-control` | 200 | same | noindex, nofollow | Git Workflow Essentials | Unlisted, noindex. |
| `/capabilities/sales-leadership` | 404 | same | noindex | none parsed | No such capability slug. |
| `/this-route-should-404` | 404 | same | noindex | 404 | No `app/not-found.tsx`. Title falls back to the homepage title. |

## Per-page notes for primary routes

Shared chrome, verified in source: skip link, `SiteHeader` from `primaryNav`, footer with `joy.`, name, positioning line, and mailto. Footer has no section links. There is no breadcrumb component on the primary pages reviewed in source.

### Homepage `/`

1. **Objective.** Establish Revenue & GTM Leader in the first screen and offer Work.
2. **Audience.** Founders, CROs, recruiters, then technical readers.
3. **CTAs.** Explore Work (primary), About Me (secondary). In-page links to `/experience` and the detector-coverage atlas.
4. **Hierarchy.** Eyebrow, h1, philosophy, biography, actions, avatar caption, current role, earlier roles, one field story, one side quest.
5. **Content.** Verified hero copy in `app/page.tsx` matches the live h1.
6. **Components.** `PageMain`, `CelestialFrame`, `EditorialBento`, `BrandAvatar`, `ProjectTechnologyStack`, `Marginalia`.
7. **Internal links.** `/work`, `/about`, `/experience`, side quest slug.
8. **SEO.** Title and description match positioning. Canonical `/`.
9. **Mobile.** Classes include a 420px two-column button grid and editorial-dark padding. Not screenshotted.
10. **Accessibility.** h1 present. Skip link in layout. Contrast of `#E6B59A` on charcoal was not remeasured.
11. **Visual.** Editorial dark hero is intentional. No dark theme sitewide.
12. **Defects.** None verified in HTML.
13. **Improvement.** Keep the hero. Trim only if a later visual pass shows the lower page repeating `/work`. AUD-05.

### About `/about`

1. **Objective.** Explain how she operates: Strategist, Leader, Builder.
2. **Audience.** All primary audiences after the homepage.
3. **CTAs.** Not fully extracted. Page exists and is the secondary homepage action.
4. **Hierarchy.** h1 is the three pillars.
5. **Content.** Live h1 matches the brand pillars. Full biography was not transcribed in this pass.
6. **Components.** Shared page shell.
7. **Internal links.** Not enumerated beyond the route being reachable.
8. **SEO.** Title uses the em dash pattern. Canonical expected from the page pattern; not re-parsed for every page.
9–12. **Mobile, a11y, visual, defects.** No browser evidence. No HTML defect in the fetch.
13. **Improvement.** A later copy pass can tighten the narrative using existing approved biography. Do not import Joy Index notes.

### Experience `/experience`

1. **Objective.** Career timeline for recruiters and founders.
2. **Audience.** Journey B first, Journey A second.
3. **CTAs.** Page itself. No resume download in the header.
4. **Hierarchy.** h1 states a decade of technical security selling and teaching the story.
5. **Content.** Roles live in `lib/portfolio.ts` with public AE titles. Dollar figures stay off the page by policy.
6. **Components.** Timeline page.
7. **Internal links.** Referenced from Home and Work.
8. **SEO.** Indexable, in the sitemap, absent from the header.
9–12. Not browser-tested.
13. **Improvement.** AUD-06. Link it from About and the footer or Work, still outside `primaryNav` unless a later IA review adds it.

### Work `/work`

1. **Objective.** Strongest commercial evidence.
2. **Audience.** Founders and enterprise AE hiring managers.
3. **CTAs.** In-page anchors for three collections, case-study links, `/experience`.
4. **Hierarchy.** h1 People. Strategy. Systems. Then Selling, People, Systems.
5. **Content.** Three `publicStories` plus the one `kind: "work"` card.
6. **Components.** `ProfessionalCaseStudy`.
7. **Internal links.** Field notes, `/experience`, `/work/competitive-intelligence-engine`, `/side-quests`, Truffle Camp.
8. **SEO.** In sitemap. Title uses a pipe.
9–12. Anchor nav is in the HTML source. Touch-target size not measured.
13. **Improvement.** AUD-04. Keep results qualitative until a separate approval adds a number.

### Side Quests `/side-quests`

1. **Objective.** Independent builds, with professional relevance.
2. **Audience.** Journey C, and founders who want the builder proof after commercial proof.
3. **CTAs.** Project cards and the external Security Market Map link.
4. **Hierarchy.** h1 "Curiosity, put to work."
5. **Content.** Registry side quests. Market map is a GitHub link, not a case study.
6. **Components.** Directory cards and technology stack where wired.
7. **Internal links.** `/work/[slug]` and `/projects`.
8. **SEO.** Indexable.
9–12. Not browser-tested.
13. **Improvement.** AUD-03 so the next click does not look like employment work.

### Field Notes

Index h1 "Thinking out loud. Building in practice." Two articles are real: enterprise deal anatomy and multithreading. The brand guide names four collections (Playbooks, Frameworks, Operating Systems, Lessons Learned). This audit did not recount whether the index still lists titles that are not articles. The v2 PRD recorded that gap at an older commit. **Needs a line-by-line check before calling it fixed.**

### Contact `/contact`

1. **Objective.** Start a conversation.
2. **Audience.** All journeys.
3. **CTAs.** mailto `kristen.aing@gmail.com`, LinkedIn `/in/kristenaing`, GitHub `heyfunwhoa`, inquiry form.
4. **Hierarchy.** h1 Let's connect. Short paragraph. Link row. Form.
5. **Content.** Sales-leadership and product-marketing conversations. No phone.
6. **Components.** Keyline `Mail` and `ArrowUpRight`, `InquiryForm`.
7. **Internal links.** External profiles.
8. **SEO.** Indexable. Canonical `/contact` in source.
9. **Mobile.** Link row stacks, then becomes a row at `sm`.
10. **Accessibility.** Links have visible text. Icon-only controls were not the pattern here. Form labels were not retested.
11. **Visual.** Consistent with the editorial shell.
12. **Defects.** None on `main`. PR #53 conflicts and is not the live page.
13. **Improvement.** AUD-08. Spam controls on the form were not reviewed in this pass.

### Projects, capabilities, builder guide, AI academy

These are supporting surfaces. They are indexable (except where noted) and absent from the six-item nav. Capabilities explain commercial work as systems. The builder guide and academy demonstrate learning. They can distract a 15-second recruiter if the homepage over-links them. The homepage source inspected does not feature the academy in the hero.

### Prototype, private work, account signal, design lab

Utility and lab routes. Design lab is 404 in production. Prototype and account signal are reachable and noindex. Private work is reachable and noindex; authorization was not verified.

### Error state

Unknown paths return 404 with h1 "404" and the default site title. There is no `app/not-found.tsx`.
