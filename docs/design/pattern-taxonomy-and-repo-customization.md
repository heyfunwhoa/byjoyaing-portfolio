# Flexible Design Lab pattern taxonomy and per-repository customization

**Status:** Proposed taxonomy/decision guide for [KRU-235](https://linear.app/krusty/issue/KRU-235), stacked on pattern library PR #275. **Owner:** Portfolio Design Lab. **Scope:** Reusable UI, UX, design, and accessibility patterns across projects. This is a *classification guide*, not another component registry, design-system package, or claim of adoption.

## Authority and how this fits

- **One inventory:** `lib/component-options.ts` remains the single source of component ideas and candidates. `lib/design-lab/pattern-adoption.ts` is the evidence/status overlay keyed by its existing stable IDs. The broad five `patternFamilies` remain useful for compact filtering in the initial UI; the categories below are *subcategories/use-case facets*, not an incompatible second list.
- **Design Lab:** demonstrations, source paths, responsive/keyboard interaction recipes, representative examples, and adaptation guidance.
- **Technical Docs Platform:** shared engineering, accessibility, delivery and adoption policy; link current standards rather than copying policy.
- **Consumer repos:** local information architecture, product language, design tokens, routes, state/data, permissions, acceptance and release evidence. A Lab candidate never changes a consuming application.
- **Linear:** KRU-235 owns catalog/taxonomy work, KRU-249 owns the GTM OS site-wide accessibility audit, KRU-236 owns the seller Opportunity experience. Do not create another project for every category.

## Category directory

A category identifies a reusable *problem/behavior*. It does not require an installed library or reusable React component. Some entries are guidelines, code recipes, accessibility tests, examples or page compositions.

| Category | Useful subcategories and patterns | Reuse boundary |
| --- | --- | --- |
| **1. Foundations and design tokens** | Color roles, type scale, spacing/density, radii, elevation, iconography, borders, breakpoints, light/dark/high-contrast themes, focus indicators | Share semantic token *roles*, accessibility constraints and mapping examples; each app chooses its visual identity, font, CSS variables and theme |
| **2. Information architecture and wayfinding** | Sitemap, primary/secondary nav, sidebars, breadcrumbs, nested entity paths, tabs vs links, in-page contents, section anchors, back links, recently viewed, location indicators | Share orientation/navigation semantics; routes, hierarchy, labels and permission-visible destinations remain app-specific |
| **3. Layout and composition** | App shell, dashboard, editorial page, split-pane workbench, master/detail, cards, bento, comparison view, resizable panels, sticky sections, responsive grids | Share compositional principles and breakpoints to test; destination owns content hierarchy and density |
| **4. Inputs, forms and authoring** | Inputs, selects, combo boxes, date/time, autocomplete, multi-step forms, rich text, Markdown/BlockNote-like editors, draft/review, inline editing, file import/export | Share labels, validation, reset/recovery and keyboard behavior; destination owns schema, authorization, persistence and editor dependencies |
| **5. Tables, collections and data exploration** | Search, sorting, filtering, pagination, virtual lists, bulk selection, status tables, column visibility, diff/compare, row detail, saved views | Share interaction contracts and empty states; destination owns data truth, query/scope, sorting rules, limits and access controls |
| **6. Evidence, provenance and decision UI** | Sources/citations, timestamps/freshness, unknown/assumption labels, confidence, evidence review, stage gates, approval/denial, reviewer comments, audit timelines | Share honest display and review patterns; destination validates trust, role authority, reviewer identity and immutable history |
| **7. Feedback and system states** | Loading/skeleton, empty/no results, validation error, success, retry, stale/conflict, offline, pending, disabled, undo, save/unsaved warning, notifications/toasts | Share meaning, accessible announcements and recovery; app owns actual operation outcome and retries |
| **8. Dialogs, overlays and contextual help** | Modal/dialog, drawer/sheet, popover, tooltip, command menu, disclosure, onboarding hint, contextual examples, help panels | Share focus/escape/dismissal patterns; app owns sensitive-data visibility and destructive-action authorization |
| **9. Data visualization and visual explanation** | Time series, bar/line charts, gauges, funnels, cohort tables, scorecards, maps, comparisons, annotated diagrams, timeline, flow/process graphs | Share chart scaffolds and text alternatives; app owns units, source/freshness, aggregation math, uncertainty and interpretation |
| **10. Workflow, collaboration and governance** | Task queue, ownership/assignee, status history, human-in-loop review, checklist, multi-step wizard, progress, handoff/receipt, approval gates, comment threads | Share interaction patterns and explicit status language; app owns roles, policies, audit log, workflows and state transitions |
| **11. Learning and guided practice** | Lessons, prerequisites, practice tasks, branching exercises, quizzes, interactive diagrams, code labs, progress, rubrics, feedback, simulation | Share presentation and accessibility; curriculum, scoring, pedagogical claims and learner data remain local |
| **12. Content, editorial and CMS** | Content blocks, asset/media library, structured authoring, preview, localization, version review, publish/unpublish, SEO/AEO preview, reusable marketing layouts | Share editorial UI compositions; app owns CMS schema, rights, publication workflow, locale and analytics |
| **13. Motion, transitions and delight** | Hover/focus feedback, state transitions, route transitions, subtle entrances, microinteractions, progress feedback, gameful UI, media controls | Share principles and small recipes; motion is optional, never required for meaning; honor reduced motion and local brand |
| **14. Responsive and adaptive UX** | 320px/375px/768px/1280px, 200%/400% zoom, compact selectors, adaptive density, touch/keyboard parity, long names, RTL, coarse pointers | Cross-cutting acceptance expectations; destination proves its actual layout and content on applicable devices |
| **15. Accessibility and inclusive interaction** | Semantic landmarks, heading order, skip links, keyboard/focus management, contrast, target sizes, screen reader, status/error announcements, accessible charts, cognitive load | Cross-cutting baseline for every category, **not** an opt-in badge, an optional visual theme, or a claim of WCAG conformance |
| **16. Security, privacy and trust UX** | Permission-denied, consent, sensitive-data redaction, export warnings, destructive action confirmations, provenance, read-only vs editable modes | Share honest UX patterns; consumer must enforce permissions and protect server/data boundaries |
| **17. Performance and resilience UX** | Progressive rendering, latency states, optimistic vs confirmed updates, large-list performance, cache/staleness, network failure and recovery | Share user-visible states and testing recipes; app owns actual performance budgets and back-end behavior |
| **18. Localization and content accessibility** | Plain language, date/number localization, text expansion, bidirectional layout, non-color cues, consistent terminology, writing/error tone | Share inclusive content principles; app owns locale catalog and domain-specific vocabulary |

### Mapping to the current five library families

Retain the existing primary `patternFamilies` in the UI until a reviewed need warrants broader filtering. Suggested mapping (not a migration):

- **Core UI & navigation:** 1–4, 8, 14
- **Data & evidence:** 5, 6, 9
- **Motion & feedback:** 7, 13, 17
- **Learning & gameful:** 11
- **Content & workflow:** 10, 12, 16, 18
- **Cross-cutting:** accessibility (15), responsive (14), privacy/security (16), localization (18) apply to *every* family, irrespective of the primary filter.

The same component may legitimately be discoverable by several *future* tags (e.g. `breadcrumb` → navigation, responsive, accessibility). Do not rename existing stable component IDs, duplicate catalog entries, or infer that these facets are already implemented as code filters.

## Flexible per-repository adoption model

**Invariant contract (reusable):** user task; meaningful states and failure paths; semantic/keyboard behavior; responsive and zoom acceptance; provenance/status semantics; reduced-motion alternative; reference example and source license when code is copied.

**Local decisions (customizable):** theme/brand and tokens; vocabulary and route hierarchy; framework and primitive library; density/layout; data contracts, permissions and persistence; measurement model; workflow rules; role matrix; component composition and animation preference.

**Adoption choices:**

| Decision | When to use | What gets recorded |
| --- | --- | --- |
| Reuse unchanged | Existing local primitive/pattern already fits and has current acceptance evidence | Source ID/path and local regression |
| Adapt locally | Behavior fits, but brand, layout, terminology or environment differs | Source revision, what changed, accessibility parity and local tests |
| Compose from local parts | Several established primitives solve the task without a new package | Composition, responsibilities, state semantics and tests |
| Reference only / defer | Interesting candidate but no demonstrated need, high cost, unsupported dependency or licensing uncertainty | Use case, decision reason, cost/license, trigger to reconsider |
| Create new | No suitable solution and task/owner justify maintenance | Need, alternatives, risks, story, tests and versioning decision |
| Reject/deprecate | Unsafe, inaccessible, unmaintained, redundant or superseded | Evidence, replacement path and migration guidance |

Every destination should attach a short **adoption record** to its existing PR/ADR/issue, not a separate database: `patternId` (if present), `category`, `sourceRevision`, `decision`, `consumerRepo`, `routeOrComponent`, `localOverrides`, `accessibilityEvidence`, `licenseAndDependencies`, `owner`, `releaseState`, `revisitTrigger`.

### Example: breadcrumb adaptation

- **Design Lab** catalogs the accessible breadcrumb composition: `nav` landmark, ordered list, clickable ancestors, visible/current-page semantics, focus, wrapping, long titles and overflow behavior.
- **GTM Revenue OS** decides `Overview → Execute → Opportunity priorities → Buying Process`, with actual routing, unknown-ID fallback and source-safe navigation; KRU-249/PR #148 own local QA.
- **Builder Academy** decides `Learn → Curriculum → Lesson` with prerequisite/access rules and local learner navigation.
- **Portfolio** decides `Work → Case study` with its own branding and editorial labels.
- No shared nav URL registry, automatic cross-repo code syncing or mandatory package is introduced.

## Suggested lab implementation order

1. **First:** breadcrumbs/wayfinding, accessible focus and feedback, forms/error states, evidence/source labels, task-to-detail composition. These recur across GTM OS and other apps.
2. **Next:** data tables, filters, saved views, review/approval, dashboards, mobile/zoom, content authoring.
3. **Later:** rich motion, complex visualizations, learning games, shared runtime packages and advanced collaboration when a real consumer validates need.

**Acceptance for taxonomy documentation:** Categories cover discoverable user needs; no duplicate option records or false approval claims; current filters/IDs remain stable; exact-owner project boundaries and local override rules are explicit. Use existing KRU-235 and Design Lab PR stack rather than creating competing initiatives. Scope is documentation only; app UX and adoption remain independently unverified.
