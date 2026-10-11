# Brand and standards source register

**Last verified:** 2026-10-11, repository `a76e5e9`, live site https://www.byjoyaing.com/

Authority order when documents agree: accepted ADRs and the canonical brand guide outrank older audits and roadmaps. When they disagree, the conflict is listed here and in the executive assessment. This audit does not silently pick a winner.

| Standard | Repository | Document | Authority | Last verified | Conflicts |
| --- | --- | --- | --- | --- | --- |
| Professional positioning | byjoyaing-portfolio | [docs/brand/brand-guidelines.md](../brand/brand-guidelines.md) §1 and §3 | Canonical for public identity: Revenue & GTM Leader · Curious Builder | 2026-10-11 | Status banner still says homepage, IA, imagery, and case studies are under review. §3 already specifies the shipped hero. See C1. |
| Voice and claim boundaries | byjoyaing-portfolio | brand guidelines §3; [docs/content-model.md](../content-model.md) | Canonical. No invented revenue, customers, or Head of Sales title. | 2026-10-11 | Historical [docs/design/ux-audit.md](../design/ux-audit.md) (2026-10-09) still recommends the retired line "Commercial Leader." The file is marked historical. |
| Typography | byjoyaing-portfolio | [ADR 0001](../decisions/0001-preserve-geist-typography.md); `app/layout.tsx`; `app/globals.css` | Accepted. Geist Sans for display and body. Geist Mono for technical metadata. | 2026-10-11 | None in current code. Instrument Serif and Source Serif 4 stay rejected. |
| Color and muted text | byjoyaing-portfolio | brand guidelines §4; `app/globals.css` | Canonical tokens. `--muted` is secondary text `#4A504B`, not a surface. | 2026-10-11 | Copper `#8A4B2A` on charcoal is documented as failing contrast. Highlight on charcoal is `#E6B59A`. Pairwise contrast was not remeasured in a browser this audit. |
| Avatars | byjoyaing-portfolio | [docs/brand/avatar-system.md](../brand/avatar-system.md) | Canonical. Leader, Explorer, Builder roles. All variants still render `/avatar.png`. | 2026-10-11 | Not re-rendered in a browser this audit. |
| Publication boundaries | byjoyaing-portfolio | [ADR 0002](../decisions/0002-planning-and-publication-boundaries.md) | Accepted. GitHub owns public specs. Notion Portfolio Studio is private planning. Joy Index stays private. | 2026-10-11 | `docs/engineering-standards.md` links `technical-docs-platform` baseline v1. That repo was not readable here. ADR 0002 says local standards stay in force until it can be read. See C2. |
| Route retention | byjoyaing-portfolio | [ADR 0003](../decisions/0003-retain-experience-and-projects-routes.md) | Accepted. Keep `/experience` and `/projects`. `/work/[slug]` may serve both kinds. Kind comes from `lib/portfolio-registry.ts`. | 2026-10-11 | [docs/rebuild-roadmap.md](../rebuild-roadmap.md) still describes redirects ADR 0003 rejected. See C3. |
| Navigation | byjoyaing-portfolio | `lib/site-nav.ts` | Implemented. Home, About, Work, Field Notes, Side Quests, Contact. | 2026-10-11 | Detail URLs under `/work/` do not light either Work or Side Quests, by explicit comment in `isActive`. See C4. |
| Public project classification | byjoyaing-portfolio | `lib/portfolio-registry.ts`; [docs/public-project-registry.md](../public-project-registry.md) | Implemented adapter over `lib/portfolio.ts`. Evidence review state is `requires-review`. | 2026-10-11 | Only `competitive-intelligence-engine` is `kind: "work"`. Other slugs are side quests that still use `/work/[slug]`. |
| Professional stories | byjoyaing-portfolio | `lib/public-stories.ts`; `app/work/page.tsx` | Public editorial record. Amounts and customer names withheld. | 2026-10-11 | Story evidence lines still say some figures need independent approval before further detail. |
| Content fields | byjoyaing-portfolio | [docs/content-model.md](../content-model.md) | Field contract. Joy Index is not a route. | 2026-10-11 | The "next implementation gate" section still reads like P0 work that the registry file has since started. |
| Product requirements | byjoyaing-portfolio | [docs/product/portfolio-experience-v2-prd.md](../product/portfolio-experience-v2-prd.md) | Canonical product spec. Baseline cited there is `94495d9`, older than `a76e5e9`. | 2026-10-11 | This audit supplements it. It does not fork a second PRD for the same product. |
| Engineering workflow | byjoyaing-portfolio | [docs/development-workflow.md](../development-workflow.md); `.github/workflows/ci.yml` | Local delivery rules. CI runs lint, test, and build on Node 22. | 2026-10-11 | [docs/ENGINEERING-BASELINE.md](../ENGINEERING-BASELINE.md) is a local note. Do not add `tsc --noEmit` as an npm script because of it. `npm run build` remains the project typecheck. |
| Shared engineering baseline | technical-docs-platform | `engineering/baseline-v1.md` (linked, unread) | Intended shared policy. **Unavailable in this session.** | Not verified | Adoption file says controls are not assessed. ADR 0002 keeps local standards authoritative until the shared doc can be read. |
| Security of selected work | byjoyaing-portfolio | [docs/security/selected-work-access.md](../security/selected-work-access.md) | Local. Client-side hiding is not authorization. | 2026-10-11, document present; runtime auth not retested | `/private-work` is HTTP 200 and `noindex`. This audit did not confirm server-side authorization. |
| Design system inventory | byjoyaing-portfolio | [docs/design/component-inventory.md](../design/component-inventory.md); [docs/design/component-adoption.md](../design/component-adoption.md) | Current for shadcn, Keyline, Magic UI, Lifeline. | 2026-10-11 | Bento Grid and Lifeline exist in `components/design-lab/demos.tsx` and are not mounted on the shipped `/design-lab` page. |
| Design lab availability | byjoyaing-portfolio | `lib/design-lab.ts`; `app/design-lab/page.tsx` | Production calls `notFound()`. | Live `/design-lab` returned 404 on 2026-10-11 | None. |
| Contact | byjoyaing-portfolio `main` | `app/contact/page.tsx` | Shipped: mailto, LinkedIn, GitHub, inquiry form, Keyline mail and arrow icons. | Live h1 "Let's connect." | Open draft PR #53 (`feat/contact-page-redesign`) is `CONFLICTING` with `main`. Not merged by this audit. See C5. |
| Phone and resume | Product owner instruction, recorded in prior reviews | Not a file to publish | Phone `+281-703-1337` stays off the site. Resume request UI stays removed. | Phone string absent from `*.ts` and `*.tsx` on 2026-10-11. `/resume` live 404. | None in shipped UI. |
| Joy Index | joy-index | Unread | Private. No public route and no paste into this repo. | Repo probe HTTP 404 via integration token | Unavailable. Contents not inferred. |
| Notion Portfolio Studio | Notion private page | [docs/product/notion-portfolio-studio.md](../product/notion-portfolio-studio.md) | Planning status only. | Pointer exists. Page body not recopied. | Must not become a second PRD (ADR 0002). |

## Repositories named in the assignment

| Repository | Access on 2026-10-11 | Used for |
| --- | --- | --- |
| byjoyaing-portfolio | Local checkout at `a76e5e9` | Full standards and route audit |
| security-market-map | Public GitHub README, HTTP 200 | Cross-repo mapping. Already linked from Side Quests. No case-study page. |
| joy-index | HTTP 404 | Unread. Treated as private and out of the public site. |
| technical-docs-platform | HTTP 404 | Unread. Local engineering docs remain the working standard. |
| gtm-revenue-os | HTTP 404 | Unread. Synthetic GTM studies already on the site are labeled fictional in the content model. |
| detector-coverage-atlas | HTTP 404 | Unread as a repo. Represented on the site as a side quest. |
| account-signal-engine | HTTP 404 | Unread. `/account-signal` on the portfolio is a noindex prototype. |
| channel-territory-mapping | HTTP 404 | Unread. Named only as a Field Notes source that must not be imported live. |
| truffle-camp | HTTP 404 | Unread as a repo. Represented as a side quest at `/work/truffle-camp`. |
