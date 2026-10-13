# Portfolio design lab

**Status:** Local prototype. Not a public page.  
**Date:** 2026-10-11  
**Route:** `/design-lab`, rendered only when `NODE_ENV` is not `production`.  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md), [component-adoption.md](component-adoption.md)

`npm run build` sets `NODE_ENV` to production, so the route calls `notFound()` before any Suspense boundary and answers 404. `robots` noindex on the source is extra. It is not the access control.

## Audit

Installed UI dependencies are Next.js 16.4.0, React 19.2.8, and React DOM. Resend is the mail dependency. Tailwind CSS 4 is a dev dependency. The original audit below predates the installed shadcn/Radix primitives and Embla carousel. Current setup is `radix-nova` in `components.json`; Motion/Framer Motion remain uninstalled. See the current workbench section below.

| Finding | Impact | Complexity | Recommendation |
| --- | --- | --- | --- |
| `ProjectCard` (sales facts) and the card markup inside `ProjectsDirectory` describe the same kind of destination in two shapes. | High. Readers meet a different card on `/projects` than in the use-case browser. | Medium. A shared card has to accept directory facts without dropping the sales card's evidence fields. | Prototype `EditorialProjectCard` in the lab. Leave both live cards in place until a review swaps one call site. |
| `StatusBadge` and `ProjectStatusPill` both print `statusCopy`. | Medium. Two shapes for one word. | Low, but every case study imports the badge. | Keep both. The new card uses the pill. Do not add a third. |
| `ProjectsDirectory` filters in memory only. Kind (work vs side quest) is not one of the controls. | Medium. The URL on `/projects` already carries a category slug, and the lab should not fork that page. | Low for a lab control. Higher if it replaces the directory. | Lab filters use kind plus two existing categories, and write `?collection=` on `/design-lab` only. |
| Case-study pages are long and the header does not show where you are inside the story. | Medium for hiring readers. | Low. | `CollectionBreadcrumb` is on the public case templates. Kind, not the URL prefix, picks Work vs Side Quests. |
| Mobile menu, focus return, and reduced motion already exist. | Keep. | — | Do not rebuild navigation. |
| Homepage bento is the destination map, not a project gallery. | Keep. | — | `ProjectBento` is for projects. It does not replace `EditorialBento`. |

## Six proposals

| # | Component | What it does | Why | Dependencies | Complexity | Brand fit | This pass |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `EditorialProjectCard` | Title, category, summary, optional figure sentence, technologies, status pill, one destination. Featured variant is charcoal. | One keyboard stop and one status word make a project scannable. | None. Uses `ProjectStatusPill` and current tokens. | Low | Editorial card, ivory or charcoal, copper focus. | Built, lab only |
| 2 | `ProjectBento` | Stacks cards on small screens. From `md`, two columns. From `lg`, the featured card spans four of six columns. Empty results stay as a sentence. | Hierarchy without a new motion language. | None | Low | Same grid idea as the homepage bento, different job. | Built, lab only |
| 3 | `ProjectFilter` | Pressed buttons for All, Professional Work, Side Quests, GTM Systems, and Security research. | Separates field practice from independent work using `kind`, and reuses two directory categories. | None | Low | Selected state is the copper button already used on `/projects`. | Built, lab only |
| 4 | Case-study breadcrumb | Home / Work or Side Quests / title. Field Notes guides use Home / Field Notes / title. | After a card click, the reader can see which collection they are in. | None | Low | Text, not a widget. | Built |
| 5 | One status widget | Pick pill or badge for public labels. | Removes the duplicate. | None | Medium, because many pages import the badge. | Either shape is already on-brand. | Later |
| 6 | Evidence contents | A list of in-page links on long case studies. | Lets a reader jump to contribution or limitation. | None | Medium | Use `editorial-eyebrow` and text links. | Later |

There is no separate Research category in the directory. Security research means Technical Systems & AI. GTM Systems means Revenue Strategy & Operations. An unknown query such as `?collection=research` falls back to all projects.

## Motion

Do not install Motion for React. The existing timing is the source of truth:

- Hover changes border or background color.
- `.nudge-link` moves 0.2rem. `prefers-reduced-motion: reduce` collapses that transition.
- `.section-enter` is a 0.6rem rise with no fade to zero opacity.
- Celestial lines do not spin.

The original editorial cards add no keyframes. The current workbench below adds scoped, replayable preview keyframes; public entrance styles are unchanged.

## Layers

Primitives already in the repo: links, buttons in the header and filters, `ProjectStatusPill`, `StatusBadge`. Branded pieces: the new card, `EditorialBento`, `GeometricMotif`, `CelestialFrame`, `BrandAvatar`. Page compositions stay the routes in `app/`. The lab does not extract a new folder tree.

## Categories on `/design-lab`

| Section | What the page shows | Dependencies |
| --- | --- | --- |
| Foundations | Token swatches, eyebrow, philosophy line | `app/globals.css` |
| Layouts | Static span diagram for the project gallery | None |
| Navigation | Notes on the live header. No second header. Breadcrumb is not built. | `SiteHeader` from the root layout |
| Cards | `EditorialProjectCard`, `ProjectBento`, `ProjectFilter` | Directory facts |
| Motion | Interactive workbench: four scoped transitions, eleven component previews, replay, timing, and motion-off controls. | Existing Radix/Embla primitives plus a CSS module |
| Visual identity | Homepage orbit and Work-tile motif, labeled as those placements | `CelestialFrame`, `BrandAvatar`, `GeometricMotif`, `/brand/avatar/illustrated-portrait.png` |
| Orbit artwork | Compare the transparent drawing, the charcoal plate, and the live pillar controls before changing the homepage | `OrbitPortrait`, `OrbitArtwork`, `CapabilityOrbit` |
| Data visualization | Status pills and the experience constellation | `ProjectStatusPill`, `ProjectConstellation` |
| Interactions | Filter URL state, plus a native disclosure listing the timeline button and the joy. tooltip | None new |
| Accessibility | Focus, pressed state, empty result, reduced motion | None new |

Lesson: [editorial-project-card.md](../builder-academy/editorial-project-card.md).

## Motion & component workbench (2026-10-12)

The top of `/design-lab` now provides a compact selector and one preview stage, followed by a project-filtered collection of ten component families. The production gate remains in place. Storybook exposes `Design Lab/Motion Workbench` and `Design Lab/Component Options`.

- Transitions: gentle rise, panel slide, soft settle, grouped reveal; 160/240/400ms and replay. All text stays visible, without autoplay or scroll-triggered hiding.
- Components: avatar/owners, interactive card, tabs, accordion, dialog, sheet, carousel, empty/recovery, static loading, bounded progress, and native record comparison. Existing portfolio source is reused.
- Device reduced motion overrides previews, including portal content and Embla duration. The explicit disable control also removes movement.
- Curated options distinguish source available in this portfolio from candidate additions. App assignments are recommendations, not claims of implementation in another repository. The catalog is `lib/component-options.ts`; it contains no customer, employer, or private workspace records.

### Selective adoption

Use [shadcn/create](https://ui.shadcn.com/docs/installation#use-create) for a **new** app/preset. Existing projects should retain their component configuration and add the component needed for a specific feature. This portfolio already has Radix-based `radix-nova`; do not rerun initialization or overwrite tokens. The [React Aria Avatar](https://ui.shadcn.com/docs/components/aria/avatar) is an alternative family. Existing `components/ui/avatar.tsx` already provides Radix image/fallback/group/badge source, so no migration is needed for ownership displays. Official docs checked 2026-10-12.

| Destination | First patterns to try | Motion choice |
| --- | --- | --- |
| Portfolio | Cards, avatar, tabs, accordion, short carousel | Brief rise or panel slide |
| Account Signal Engine | Data table, filters, evidence sheet, combobox, state feedback | Panel change; keep dense data stable |
| Security Market Map | Search, category tabs, comparison table, evidence sheet | Selected detail change; keep the map stable |
| Detector Coverage Atlas | Data table, column filters, comparison detail, empty/loading states | State changes; no animation of numeric meaning |
| Truffle Camp | Lesson cards, accordion, progress, tabs | Short grouped reveal |
| Interview dashboard | Calendar/date picker, owner avatar, action dialog, sidebar | Context panel change |
| GTM Revenue OS | Tables, workspace navigation, date filters, charts | Subtle view changes |

UI proposals do not add backend behavior: a Calendar is not calendar sync, a Dialog is not access control, and a Chart requires verified data. Check each destination’s framework, component family, dependencies, license and privacy requirements before copying. Select official primitives first; assess third-party registry blocks individually. Defer a shared installable package until multiple repos use a proven pattern.

### Verification and rollback

Catalog tests check app/source references and source availability. Storybook interaction tests cover project filtering, reduced motion, keyboard selection and dialog focus return. Run `npm test`, `npm run build`, `npm run storybook:build`, and `npm run test:visual` where browser infrastructure is supported. Rollback removes the two lab imports/mounts and new files; no data migration or public-page rollout is involved.

### Mobile, tablet and comparison expansion

The library defaults to cards on all screens and supports an explicit Table view. Search (all terms), project, and availability filters share state across both layouts. Empty results expose a reset action. The native comparison table includes caption, row/column headers, sources and adoption notes; its keyboard-focusable scrolling region contains horizontal overflow on narrow screens. No data-grid package is added.

Below 640px, the workbench uses a native pattern selector instead of the full button grid. Project/search controls fill the available width, and controls retain 44px minimum tap areas. The preview stage can be capped at 360px or 680px, always bounded by available space. These caps help compare content density; they do not emulate a device or trigger viewport media queries. Actual breakpoints require browser/device testing.

Four additional preview patterns cover empty-state recovery, static loading placeholders, three-step progress and a native record table. They are locally implemented demos, not installed shadcn Skeleton/Progress/Data Table components and not live workflows. Candidate status in the curated catalog remains unchanged. Browser cases cover view/filter continuity, empty-result reset, feedback actions and overflow at 375/768/1280px. Execution remains pending where supported browser tooling is unavailable.


## Portable pattern shortlist (2026-10-13)

Status: candidate specifications for scoped adoption, not new components or a cross-repo rollout. These extend the existing [component-options catalog](../../lib/component-options.ts); they do not replace it. The five patterns below compose existing families. The portfolio maintainer owns this shortlist; each consuming repo owns its implementation and verification.

### Five reusable compositions

| Pattern / catalog families | Starting source in this repo | Intended task and destinations | Adoption decision |
| --- | --- | --- | --- |
| Filterable collection / summaries, search, data | `components/projects-directory.tsx`; existing project-filter and project-bento inventory entries | Portfolio project discovery; account, vendor, detector and partner lists in their owning apps | Adapt local filter behavior and stable record IDs; do not copy portfolio taxonomy. Work overview grid is separately proposed in PR #120, not shipped by this note. |
| Summary with evidence details / summaries, context, feedback | Existing card and sheet primitives; no generic evidence composition verified | Account Signal Engine: summary → sourced change → evidence → next action. Security Market Map: comparison → supporting sources → limitations | Candidate domain composition. Keep source attribution, review state, material caveats and freshness visible beside the summary. |
| Comparison panel / data, measurement | Workbench native record comparison described in design-lab.md; candidate data-table/chart catalog entries | Security Market Map vendor comparison; Detector Coverage Atlas coverage; GTM Revenue OS scenario assumptions and outputs | Adapt semantic table first. Unknown differs from absent/false. Preserve units, dates and per-claim sources. Scenario output must be labeled modeled. |
| Workflow accordion / disclosure | `components/ui/accordion.tsx`, `components/ui/tabs.tsx` (inventory references) | About toolkit, public playbook previews, Builder Academy and Truffle Camp lessons | Compose a visible workflow summary with optional steps. Tabs are peer views, not filter buttons. Completion requires real state, never animation alone. |
| Responsive detail sheet / context | `components/ui/sheet.tsx` (Radix Dialog-based source inspected) | Account evidence, vendor sources, detector metadata, partner/territory details | Adapt installed primitive in the destination component family. Provide a durable detail link for long or shareable material. Do not replace the portfolio header. |

Sources inspected directly for this addition: projects-directory.tsx (filter state and mobile selectors), ui/sheet.tsx (Radix composition), and lib/component-options.ts. Other source references come from the existing inventory and require direct inspection before implementation. These observations do not establish adoption in another repo.

### Responsive, accessibility and state requirements

| Pattern | Phone / tablet / desktop | Keyboard and focus | Reduced motion and data states |
| --- | --- | --- | --- |
| Filterable collection | Stacked cards and labeled selectors / compact grid / grid or explicit table; preserve filters between views | Native controls or pressed filter buttons; stable focus after filtering; politely announce result count | Instant updates are acceptable; no animated reordering of dense tables. Include loading, empty, no-match/reset and retry states. |
| Summary with evidence | Essential evidence label stays in the summary at every size; details below or in a sheet | Explicit details button and descriptive source links; never hover-only | Reveal without movement when disabled. Distinguish unreviewed, stale, corrected, withdrawn and unavailable evidence; flag affected conclusions. |
| Comparison panel | Summary cards plus optional contained table / contained table / aligned table | Table caption and row/column headers; label any scroll region; no drag-only navigation | Keep values stable. Display unknown, not applicable and unavailable separately. Include units, assumptions and an accessible text/table alternative to charts. |
| Workflow accordion | One column; short visible summaries at every width | Heading buttons expose expanded state; use existing primitive behavior; preserve focus | No delayed access to text. Empty optional sections omitted; permission-denied content fetched only after authorization. |
| Detail sheet | Width bounded to viewport, independently scrollable body / bounded side sheet / side sheet | Accessible title, close button, Escape, focus containment and return to trigger; sensible fallback if trigger disappears | No sliding with reduced motion. Cover loading, retry, missing record and denied access without leaking record contents. |

Use destination tokens, 44px control targets and the existing viewport/zoom checklist. A CSS disclosure is not access control: private playbooks, account records and employer material must never enter public bundles or fixtures.

### Free-source guide

These are references to evaluate, not installed dependencies or blanket license approvals. A free component does not make all templates on the same site free. Pin the exact source revision and retain required notices before any copy.

| Source | Starting link | Role and cost boundary | Decision |
| --- | --- | --- | --- |
| shadcn/ui Blocks | https://ui.shadcn.com/blocks | Official open-source/free blocks for composed layouts | First reference for workspace structure. Preserve existing Radix configuration and tokens; do not reinitialize. |
| Tremor | https://www.tremor.so/ and https://www.tremor.so/docs/getting-started/dashboard-template | Open-source dashboard components and a designated free Next.js dashboard template | Candidate for GTM Revenue OS and data summaries. Inspect exact dependencies, license and framework compatibility before import. |
| Magic UI | https://magicui.design/docs/components | Free open-source component collection; premium offerings are separate | Selective portfolio accents. Existing Bento Grid provenance remains authoritative. Many effects introduce Motion; no wholesale adoption. |
| Motion | https://motion.dev/docs/react and https://motion.dev/examples?platform=react | Core animation documentation; some example source and Motion UI require Motion+ | Inspiration/candidate only. CSS remains the portfolio default; a dependency change requires the existing reviewed ADR. No purchase is needed for these five specifications. |
| Shadcnblocks free collection | https://www.shadcnblocks.com/blocks/free | Designated free subset of a mixed free/paid catalog | Page-section reference. Check exact block license, attribution and redistribution terms. |
| React Bits | https://reactbits.dev/ | Creative component reference; exact current license not independently verified in this pass | Hold source import. Existing adoption record flags a Commons Clause concern. Do not describe it as unrestricted MIT or approved for a redistributed component bank. |

References checked against official source pages during this task; per-file licenses and revisions remain pending because no upstream code was copied. The GitHub React Bits LICENSE page could not be retrieved by the web tool.

### Adoption sequence and acceptance

1. Portfolio: reconcile the existing Work grid PR #120; choose one toolkit or collection interaction using installed primitives.
2. Account Signal Engine: one fictional account demonstrates summary → change → evidence → action, including a corrected/withdrawn source. Keep the pilot private.
3. Security Market Map: one comparison demonstrates source links, unknown values and visible limitations.
4. Detector Coverage Atlas / GTM Revenue OS: adapt comparisons after inspecting each repo's stack, current UI and open work.
5. Channel Territory Mapping: evaluate filterable partner collection + detail sheet after local audit. Builder Academy / Truffle Camp: evaluate workflow accordion with honest progress.

This order is a proposal, not evidence of deployment or enrollment. Technical Docs Platform remains the engineering-policy owner; do not copy vendor facts or portfolio branding into it. Joy Index remains private.

For each destination, complete the existing workbench adoption record: source path and pinned commit, destination and owner, candidate/prototype/approved/shipped status, license/dependency decision, token mapping, responsive/keyboard/reduced-motion behavior, state coverage, checks and rollback. Promote to shipped only with reviewed call sites and verification.

Acceptance for each implementation: a user can complete the named task at 375/768/1280px and 200% zoom, using keyboard and motion disabled; essential evidence remains visible; missing/stale/denied states are honest; existing required CI passes. Record unrun browser and assistive-technology checks explicitly.

Verification for this documentation addition: reviewed against current reuse contract, inventory, catalog, adoption rules and open PR list. No runtime code, dependencies or other repositories changed. Application build/browser tests are not run for this documentation-only addition. Rollback: remove this section.


## Expanded source reference audit (2026-10-13)

The [component source audit](component-source-audit.md) inventories all 64 component types from the current shadcn index, 32 current dnd-kit core/React pages and 25 Sandpack docs pages, with [retrieval evidence](component-source-audit.sources.json). It maps candidates to the existing bank families and seven app repos, records Radix/Base UI and current/legacy dnd-kit compatibility, and specifies an optional synthetic Academy runner pilot.

This is the upstream reference appendix, not a new installed-component catalog. `lib/component-options.ts` remains the curated task-oriented catalog; source availability and shipped adoption still require existing inventory/PR evidence. No packages, public routes, live demos or automatic refresh are added. Start with local primitives; drag/drop and executable labs remain scoped candidates.
