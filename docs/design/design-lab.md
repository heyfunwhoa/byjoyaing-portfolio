# Portfolio design lab

**Status:** Local prototype. Not a public page.  
**Date:** 2026-10-11  
**Route:** `/design-lab`, rendered only when `NODE_ENV` is not `production`.  
**Brand:** [brand-guidelines.md](../brand/brand-guidelines.md), [component-adoption.md](component-adoption.md)



**Reusable pattern library:** [pattern-library.md](pattern-library.md) documents the five component families, accessibility requirements, lifecycle stages, inspected use paths, and boundary with [Technical Docs Platform](https://github.com/heyfunwhoa/technical-docs-platform/tree/main/software-catalog). The library is the existing `ComponentOptions` view of `lib/component-options.ts`, augmented by a small source-evidence overlay; it is **not** another registry or new UI package. Other repository names are recommendations, never automatic adoption.


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
| Visual identity | Homepage portrait, collection index orbit studies, and Work-tile motif, labeled by placement | `CelestialFrame`, `BrandAvatar`, `OrbitStudyIllustration`, `GeometricMotif`, `/brand/avatar/home-portrait.webp`, `/brand/avatar/illustrated-portrait.png` |
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

## Candidate planning across repositories

Use the [component opportunity register](component-opportunity-register.md) for where to open Design Lab, the complete captured opportunity inventory, repository coverage and promotion gates. The in-page catalog supports project and availability filters; this remains local-development only.


## Ideation and adoption operating notes

The local landing page’s **From idea to adoption** section contains the idea card, prototype comparison, and adoption brief. It also explains the define → try → decide → hand off → verify sequence. Use native disclosures on all screen sizes; no additional interaction library or persistence.

Record an owner and review date before trying an idea. Comparison records include observed evidence and checks not run. Adoption records include the source revision/license, maintenance owner/update method, rollback and destination verification. Published packages use reviewed dependency updates; copied source requires upstream comparison; internal shared packages remain a future adoption decision. There is no automatic cross-repository synchronization.

Conversation insights → product feedback remains parked. Revisit when a product owner and a bounded fictional capture task are agreed; collecting real conversations, integrations and delivery commitments are outside this slice.

## Curated workflow motion candidates (November 2026)

The catalog `lib/component-options.ts` now includes three **external candidates, not installed packages or shipped components**: Motion for React (`motion-react-purposeful`), FormKit AutoAnimate (`autoanimate-list-transitions`), and Motion-Primitives (`motion-primitives-disclosure`). Sources: https://motion.dev/docs/react , https://github.com/formkit/auto-animate , https://github.com/ibelick/motion-primitives . Licensing is reviewed per exact source, not inferred from library labels. The Motion-Primitives root license was not resolved in the follow-up inspection; treat its patterns as reference-only until verified. The Design Lab workbench remains local/development-only.

| Workflow | First choice | Candidate only if needed | Anti-pattern |
| --- | --- | --- | --- |
| GTM task-card hover and focused next step | Existing CSS, 180ms and 2px lift | Motion for React if complex layout handoff is proven useful | Constant pulse, autoplay, focus jumps |
| Editorial slots moving between weeks | Static grouped DOM; informative status text | AutoAnimate for approved reorder interaction | Animating numeric tables or losing item identity |
| Campaign evidence and review explanations | Native disclosure and existing Radix | Motion-Primitives disclosure after source/license review | Motion that hides a blocker or approval |
| Multi-step Sales and CS evaluation | Clear step labels and state; no delay | Motion for layout only, if tested with interrupted transitions | Treating animation as progression/approval |

**Design Lab → consumer rule:** record candidate, owner, route, evidence, license and added bundle impact before installation. A GTM OS-specific adoption of native CSS in draft `feat/kru-193-northline-navigation-motion` is not an installation of any of these libraries. No global motion dependency is justified for simple task cards. Respect `prefers-reduced-motion`, keep content visible, and test keyboard/mobile. Avoid putting paid/pro-licensed source in the open-source candidate bank.

## Specific GTM motion shortlist (reviewed November 6, 2026, America/Chicago)

This extends the existing three library-level candidates, not a second registry. All four new entries are searchable in the existing component-options catalog under GTM Revenue OS and remain **Candidate**. No source code or package is imported. The development-only Design Lab gate is unchanged.

| Priority | Catalog ID / pattern | GTM destination | Prototype acceptance |
| --- | --- | --- | --- |
| Next | motion-evidence-accordion | Discovery SPIN prompts and qualification evidence | Optional detail opens without hiding gaps; keyboard, focus, interrupted close and no-motion behavior work |
| Next | motion-copy-feedback | Discovery summary / sales handoff | Success appears only after clipboard resolves; visible failure/retry, text announcement, keyboard target retained |
| Later | motion-selection-indicator | Revenue / coverage / pricing views | Selected indicator follows the existing accessible state; rapid switching retains fields and focus |
| Later | motion-native-view-transition | Overview to workspace | Feature detection and normal-navigation fallback; correct back/forward, scroll, focus and unsaved-work guard |
| Existing candidate | autoanimate-list-transitions | Editorial card additions/reordering after lifecycle integration | Stable IDs, real state updates, no false drag/persistence affordance; do not animate finance tables |
| Existing candidate | motion-react-purposeful | A bounded panel/layout handoff | Justify bundle cost over existing CSS; test interrupted animation and reduced motion |
| Existing candidate | motion-primitives-disclosure | Optional supporting context | Exact source/license resolved first; do not mount/unmount fields in a way that loses edits |

### Sources and review limits

- [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion): official docs describe size-variable animation and keyboard semantics. Package version/license pin remains an adoption gate. Existing portfolio primitives differ from GTM OS's native components.
- [Animate UI Copy Button](https://animate-ui.com/docs/primitives/animate-ui/copy-button): official page describes clipboard action and icon swap; examples use additional icon packages. [Project license](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md), inspected blob `4c99063f507027c06af430d54c5b3cf167be51d7`, says **MIT + Commons Clause** and restricts redistribution of components themselves. It is not cataloged as unrestricted open-source code. Keep links and independently implemented ideas here; do not copy its component source into a reusable bank.
- [Motion-Primitives Animated Background source](https://github.com/ibelick/motion-primitives/blob/main/components/core/animated-background.tsx), inspected blob `ae0a1ffc5b375ee59744089c83527cdbe6acec8b`: imports `motion/react`, clones children and injects click/hover handlers. It is not a complete accessible tabs implementation. Preserve existing handlers/keyboard semantics. Documentation requests returned 403; GitHub source was readable. Root LICENSE request returned 404 and no root license entry was found, so exact licensing is unresolved, not presumed permissive.
- [Motion layout documentation](https://motion.dev/docs/react-layout-animations) and [MotionConfig](https://motion.dev/docs/react-motion-config): library-level references for the existing candidate. Do not confuse free runtime features with separate paid Motion UI components.
- [AutoAnimate official docs](https://auto-animate.formkit.com/): existing candidate for immediate-child additions/removals/moves. Inspect version, reduced-motion behavior, compatibility and license at adoption.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API): native-platform reference, not a component package. Browser compatibility and Next.js integration require a separate prototype; no API support guarantee is asserted.

### Existing adoption versus future options

GTM OS PR #123 contains a separate CSS adaptation of the existing Lab lift/rise ideas: card focus/hover, panel/menu entrance, tab color and next-action arrows. It does not install any external candidate above. Preserve local pine/paper tokens. No count-up financial values, constant pulse, autoplay, blur hiding required text, scroll hijacking or artificial progress.

Before promoting a candidate, record exact file/package version, license notices, dependencies and measured bundle impact, owner and route, loading/error/empty/success behavior, keyboard/focus, reduced motion, narrow layouts and zoom. Source inspection is not browser or accessibility certification. Keep source unavailable/license unresolved states explicit. A new candidate is not a promise to implement it.

Validation for this research/catalog update: catalog ID uniqueness, source-host allowlist, candidate status and GTM search coverage; update the existing visual test's expected count from 19 to 23. Full app build and browser suite must be recorded separately when run. Rollback: revert the shortlist/catalog commit; no migration or runtime dependency.

## Second workflow-motion expansion

Four more candidates bring the motion shortlist to **11** and the full component catalog to **27**. All remain reference candidates, not installed components. Official documentation reviewed November 6, 2026 (America/Chicago). No new dependency or third-party source copied; exact package version and license review remain required before implementation.

| Priority | Catalog ID | Proposed use | Acceptance / limitation |
| --- | --- | --- | --- |
| Next | motion-task-progress | Discovery/evaluation checklist | Named denominator, exact count, instant no-motion state; no progress inferred from time or clicks |
| Next, once an operation exists | motion-operation-feedback | Successful import/save and recovery | Result follows confirmed operation; inline errors remain; undo requires a real reversal |
| Later | motion-context-panel | Inspect buyer/stakeholder evidence | Close/Escape/focus return, mobile scrolling, retained drafts and background inertness |
| Later | motion-priority-reorder | Order personal follow-up questions | Stable IDs, Move up/down alternative, cancellation and explicit save semantics |

Sources: [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress), [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast), [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Motion Reorder](https://motion.dev/docs/react-reorder). These provide primitive/API references; the GTM applications and priorities above are local design proposals, not upstream claims.

The general feedback/context catalog families describe what UI is needed; these specific entries describe optional motion and acceptance conditions. Reorder is an interaction, while the earlier AutoAnimate entry only animates collection changes. Prefer the existing CSS, native elements and installed primitives. Do not install Radix or Motion across repositories just because a candidate exists. Preserve reduced motion, exact finance values, source evidence and keyboard access in every consumer.

The existing visual assertion now expects 27 options. Catalog tests cover new IDs, candidate status and GTM search. Full application and browser checks remain separate evidence.

## Gap-focused additions and stop rule

Three further candidates bring the interaction/motion shortlist to **14** and the full catalog to **30**. These fill error, loading and explanatory-diagram gaps rather than adding another animation library.

| Priority | ID | Use and acceptance |
| --- | --- | --- |
| Next | motion-field-validation | Discovery/POC field errors: retained input, linked error text, summary links, no shake or color-only state |
| Next where async exists | motion-loading-placeholder | Account/report loading: reserve space, separate failure/empty/stale states, retry; static skeleton is the default |
| Later | motion-workflow-trace | Explain a campaign or evaluation handoff: explicit Play/Stop/Replay, complete static diagram and text, no claimed live integration |

Sources checked November 6, 2026 (America/Chicago): [MDN aria-invalid](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid), [MDN aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy), [Motion SVG guide](https://motion.dev/docs/react-svg-animation). MDN supplies accessibility semantics, not ready-made motion components; proposed CSS treatments are local design recommendations. No source copied or new package installed. Exact version/license checks apply if implementation later imports external code.

**Catalog stop rule:** there is now enough coverage for a first implementation cycle. Add another entry only for a demonstrated task not served by existing summaries, disclosure, context, feedback, selection, progress or data patterns. Prefer implementing and validating a small candidate before increasing inventory. Defer magnetic cursors, tilt on data cards, animated financial numbers, repeated shimmer and decorative background loops.

Suggested first consumer slice: discovery validation plus confirmed copy feedback. Keep loading feedback tied to an existing request; keep workflow traces in learning/demos. Candidate status is not proof of implementation or accessibility. The visual count expectation is updated to 30; browser execution remains separate.
