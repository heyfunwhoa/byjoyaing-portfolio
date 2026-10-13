# Component source audit and adoption candidates

Status: reference inventory and proposed fits; not installation or release approval.
Reviewed: 2026-10-13 UTC (2026-10-12 evening in America/Chicago).
Owner: portfolio maintainer. Audience: maintainers and implementation agents.
Classification: public technical references and personal-repository metadata only.

## Start here

This appendix extends the existing [Design Lab](design-lab.md), [component-options catalog](../../lib/component-options.ts) and [reuse contract](workbench-reuse.md). It inventories upstream options, not a second registry of installed or shipped components. The curated catalog remains the small task-oriented bank. Each consuming app owns implementation and verification. Technical Docs Platform owns shared adoption policy and the cross-repo entry point.

**First reuse local Radix/shadcn components.** Treat dnd-kit as an optional interaction dependency and Sandpack as an optional code-execution integration. None is installed by this audit.

## Collection scope and evidence

- Scraped every **64 component-type pages** linked in the shadcn index's Base UI list.
- Scraped **32 current dnd-kit core/React pages** discovered by site map, including sensors, plugins, sortable state, migration and collision detection.
- Scraped **25 Sandpack documentation pages** linked by its navigation, including components, hooks, usage, architecture, FAQ and runtime guides.
- All **121 scoped pages** returned HTTP 200 and nonempty text. [Machine-readable source manifest](component-source-audit.sources.json) records URLs, titles, scrape IDs and status. Three starting pages were also read; the dnd-kit trailing-slash and canonical quickstart were both retrieved.
- This is complete for the enumerated scope, not every API property, code sample, community registry, framework variant or future option. Vue/Svelte/Solid and legacy dnd-kit are references outside the React body audit. shadcn Radix/React Aria variants were not separately crawled.
- Five dnd-kit pages contained unavailable embedded previews. Documentation text was retrieved; examples were not executed. Sandpack scraped examples also include runtime output: that is source-page output, not our test evidence.
- Source changes have no declared immutable docs release. Recheck the installed version before adopting. No full vendor manuals or example source are copied into this repo.
- Repository audit: package manifests and six shadcn configurations read on main; selected real source files inspected below. This is not an exhaustive code, dependency-security or production-usage audit.

## Compatibility, licensing and cost decisions

| Source | Observed facts | Adoption decision |
| --- | --- | --- |
| shadcn/ui | The current index links to Base UI pages. Six app configs inspected use `radix-nova`; Revenue OS has no Radix dependency in its inspected manifest. Upstream license is MIT. | Preserve each app's installed family, aliases and tokens. Select a compatible Radix implementation at adoption time; do not copy Base UI imports or run initialization over an existing app. |
| dnd-kit | Supplied quickstart uses `@dnd-kit/dom`. Current React quickstart uses `@dnd-kit/react`, with optional `@dnd-kit/helpers` for the move helper; it links a migration guide from legacy core/sortable/utilities. MIT upstream license. | All seven inspected app manifests lack a direct dnd-kit dependency. One justified pilot first; no blanket install or API mixing. |
| Sandpack | React entry is `@codesandbox/sandpack-react`; repository license is Apache-2.0. Its FAQ flags separate Nodebox commercial-use terms for nextjs, Vite, astro, node and other Nodebox runtimes. | All seven inspected manifests lack a direct Sandpack dependency. Candidate for a synthetic Academy lesson. Nodebox, private packages and self-hosting remain on hold until current terms and operational requirements are reviewed. |

Sources: [shadcn index](https://ui.shadcn.com/docs/components), [shadcn license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md), [React dnd-kit quickstart](https://dndkit.com/react/quickstart), [dnd-kit migration](https://dndkit.com/react/guides/migration), [dnd-kit license](https://github.com/clauderic/dnd-kit/blob/main/LICENSE), [Sandpack quickstart](https://sandpack.codesandbox.io/docs/quickstart), [Sandpack FAQ](https://sandpack.codesandbox.io/docs/resources/faq), [Sandpack license](https://github.com/codesandbox/sandpack/blob/main/LICENSE).

License observations are not blanket approval of bundled dependencies or hosted services. Retain license/notice obligations for the exact source copied. This audit makes no claim of a free hosted-service allowance. Costs to measure later: bundle transfer, browser memory/CPU, dependency/CDN requests, optional hosting, storage and maintenance. Mount one code runner only after learner action; no automatic paid API calls, background crawls or recurring refresh were configured.

## Repository audit and next placements

Abbreviations in the inventory: ASE = Account Signal Engine; Market Map = Security Market Map; Atlas = Detector Coverage Atlas; Camp = Truffle Camp; Academy = Builder Academy inside the portfolio. “All apps” means applicability to the seven inspected application repositories, not automatic enrollment.

| Repo | Evidence inspected | Proposed next placement | Priority / boundary |
| --- | --- | --- | --- |
| byjoyaing-portfolio / Academy | package.json, components.json, component inventory, adoption record and curated options | Reuse Tabs/Accordion for existing workflows. Later Sandpack static/React exercise alongside code-reading lessons; a dnd-kit ordering exercise only when sequence is the learning objective. | P1: existing primitives. P2: isolated labs. Coordinate with Academy PRs #131, #134, #135; retain lesson IDs and reviewed/practiced/passed distinctions. |
| account-signal-engine | package.json, components.json, local UI-bank notes; prior source inspection found add-account and add-source dialogs already consuming local Dialog | Evidence Sheet/Dialog, Popover filters, Checkbox/selection, empty/error recovery; later optional ordered research shortlist | P1: authorized evidence flow. P2: ordering only after stable IDs, save/undo semantics and permissions. No Sandpack in account-data flows. |
| security-market-map | package.json, components.json, UI-bank notes, scenario-player and local Tabs inspected in preceding pilot | Existing Tabs pilot in PR #36; compare/source detail using local table and disclosure; optional comparison-order control | P1: finish the scoped pilot and preserve evidence/Unknown labels. dnd-kit is not a graph-layout engine. No need for Sandpack in research pages. |
| detector-coverage-atlas | package.json, components.json, components/multi-select-filter.tsx | Adapt Popover plus labeled search and native checkboxes; table/filter/empty patterns | P1: filter semantics. Current trigger declares a listbox but panel contains checkboxes without a listbox; search lacks a visible label; close behavior is custom outside-mousedown. Preserve multi-selection, don't blindly replace with single Select. dnd-kit only if user-controlled column order is needed. |
| gtm-revenue-os | package.json, README.md, components/leadership-workspace.tsx; search located planner-app.tsx | Keep the working native scenario selector; consider paired numeric Input/Slider, explanatory Tooltip and semantic comparison Table | P1: clear assumptions, units and synthetic labels. Radix installation requires a named task. Optional dnd-kit planning-priority list later; never reorder calculation execution. No live finance in Sandpack. |
| truffle-camp | package.json, components.json, components/decision-step.tsx; search located mission-player.tsx and progress store | Radio Group for one-answer decisions, existing Alert feedback, honest Progress, optional Accordion hints | P1: selected answer semantics. Current answer buttons change visual styling but do not expose radio/pressed selection. P2: dnd-kit sequencing exercise with button alternative. Sandpack only for harmless code lessons, not scanner execution or credential validation. |
| channel-territory-mapping | package.json, components.json, README.md only; code search returned no relevant source | Candidate partner table, search/filters, evidence Sheet and conflict Alert | Reference/P3; repo remains parked for implementation. No claim of a complete UI audit. Avoid drag-to-assign territories until authorization, conflict and persistence rules are reviewed. |

Inspected source links: [Atlas filter](https://github.com/heyfunwhoa/detector-coverage-atlas/blob/main/components/multi-select-filter.tsx), [Revenue OS workspace](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/components/leadership-workspace.tsx), [Camp decision step](https://github.com/heyfunwhoa/truffle-camp/blob/main/components/decision-step.tsx), [Partner README](https://github.com/heyfunwhoa/channel-territory-mapping/blob/main/README.md).
The proposed placements are maintainer recommendations, not upstream claims or verified shipping status.

## shadcn inventory — all 64 listed component types

Each link is the actual retrieved Base UI documentation URL. Use it to understand the option, then select the destination's compatible implementation. All rows are references/candidates; existing source availability is tracked in the existing inventory, not inferred from this table.

| Component | Family | Candidate destinations | Task and condition |
| --- | --- | --- | --- |
| [Accordion](https://ui.shadcn.com/docs/components/base/accordion) | disclosure | Portfolio, Academy, Camp | Optional lesson and workflow detail; retain a visible summary. |
| [Alert](https://ui.shadcn.com/docs/components/base/alert) | feedback | All apps | Persistent errors, limitations and evidence warnings; never toast-only. |
| [Alert Dialog](https://ui.shadcn.com/docs/components/base/alert-dialog) | confirmation | Academy, ASE, Revenue OS | Confirm reset or deletion; preserve server permission checks. |
| [Aspect Ratio](https://ui.shadcn.com/docs/components/base/aspect-ratio) | media | Portfolio, Academy | Stable screenshot and video layout; meaningful alternative text. |
| [Attachment](https://ui.shadcn.com/docs/components/base/attachment) | files | ASE, Partner Workspace | Reference only until upload authorization, validation and retention are defined. |
| [Avatar](https://ui.shadcn.com/docs/components/base/avatar) | identity | ASE, Revenue OS, Partner Workspace | Owner identity with name and fallback; never infer ownership from a portrait. |
| [Badge](https://ui.shadcn.com/docs/components/base/badge) | status | All apps | Consistent labels; distinguish unknown, reviewed, practiced and verified. |
| [Breadcrumb](https://ui.shadcn.com/docs/components/base/breadcrumb) | navigation | Portfolio, Academy, Atlas | Reuse existing route-aware trail; never guess parents from URL segments. |
| [Bubble](https://ui.shadcn.com/docs/components/base/bubble) | conversation | Academy | Reference only for a future teaching conversation; no chatbot need established. |
| [Button](https://ui.shadcn.com/docs/components/base/button) | action | All apps | Reuse local button and loading/disabled behavior. |
| [Button Group](https://ui.shadcn.com/docs/components/base/button-group) | action | ASE, Atlas, Market Map | Related explicit actions with touch-sized targets. |
| [Calendar](https://ui.shadcn.com/docs/components/base/calendar) | schedule | Revenue OS, ASE | Date selection only; define timezone and date-only semantics. |
| [Card](https://ui.shadcn.com/docs/components/base/card) | summaries | All apps | Reuse existing summaries before adding a competing card system. |
| [Carousel](https://ui.shadcn.com/docs/components/base/carousel) | collection | Portfolio | Small featured collections only; buttons and a full collection link; no autoplay. |
| [Chart](https://ui.shadcn.com/docs/components/base/chart) | measurement | Revenue OS, Atlas, ASE | Accessible numeric comparisons with units, source dates and table alternative. |
| [Checkbox](https://ui.shadcn.com/docs/components/base/checkbox) | selection | ASE, Atlas, Partner Workspace | Bulk selection with visible scope; filtering must not silently broaden the selection. |
| [Collapsible](https://ui.shadcn.com/docs/components/base/collapsible) | disclosure | Portfolio, Academy, Market Map | Optional supporting detail; disclosure is not access control. |
| [Combobox](https://ui.shadcn.com/docs/components/base/combobox) | search | ASE, Atlas, Partner Workspace | Search long entity lists; validate keyboard and empty-result behavior. |
| [Command](https://ui.shadcn.com/docs/components/base/command) | search | ASE, Market Map, Atlas | Search/navigation with useful empty states and an ordinary navigation fallback. |
| [Context Menu](https://ui.shadcn.com/docs/components/base/context-menu) | action | ASE, Atlas | Reference only; provide the same actions in a visible menu for touch and keyboard. |
| [Data Table](https://ui.shadcn.com/docs/components/base/data-table) | data | ASE, Market Map, Atlas, Revenue OS | Start with semantic tables; justify sorting/filtering and any TanStack dependency. |
| [Date Picker](https://ui.shadcn.com/docs/components/base/date-picker) | schedule | ASE, Revenue OS | Source-date and reporting filters; paired text entry and clear timezone semantics. |
| [Dialog](https://ui.shadcn.com/docs/components/base/dialog) | context | ASE, Portfolio | Reuse bounded task dialogs with title, close, Escape and focus return. |
| [Direction](https://ui.shadcn.com/docs/components/base/direction) | localization | All apps | Reference only until an RTL requirement exists; verify layout and keyboard direction. |
| [Drawer](https://ui.shadcn.com/docs/components/base/drawer) | context | ASE, Partner Workspace | Candidate phone details; avoid a second overlay library without a specific need. |
| [Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu) | action | ASE, Atlas, Market Map | Visible record actions with keyboard operation and permission-aware actions. |
| [Empty](https://ui.shadcn.com/docs/components/base/empty) | feedback | All apps | Explain no data versus no matches versus denied access; provide the appropriate next step. |
| [Field](https://ui.shadcn.com/docs/components/base/field) | forms | ASE, Portfolio, Revenue OS | Labeled inputs with descriptions and inline validation; do not replace server validation. |
| [Hover Card](https://ui.shadcn.com/docs/components/base/hover-card) | context | Portfolio, Market Map | Supplementary previews only; essential evidence must remain click/tap accessible. |
| [Input](https://ui.shadcn.com/docs/components/base/input) | forms | All apps | Reuse inputs with labels and appropriate input modes. |
| [Input Group](https://ui.shadcn.com/docs/components/base/input-group) | forms | ASE, Revenue OS | Units and related actions around inputs without ambiguous accessible names. |
| [Input Otp](https://ui.shadcn.com/docs/components/base/input-otp) | authentication | ASE | Reference only if the chosen auth provider requires this flow; not authentication itself. |
| [Item](https://ui.shadcn.com/docs/components/base/item) | collection | ASE, Atlas, Academy | Consistent list rows when existing cards are too heavy. |
| [Kbd](https://ui.shadcn.com/docs/components/base/kbd) | helper | Academy, Market Map | Show keyboard shortcuts without inventing bindings or replacing instructions. |
| [Label](https://ui.shadcn.com/docs/components/base/label) | forms | All apps | Associate visible labels with actual controls. |
| [Marker](https://ui.shadcn.com/docs/components/base/marker) | annotation | Academy, Portfolio | Reference for contextual annotations; keep original content readable. |
| [Menubar](https://ui.shadcn.com/docs/components/base/menubar) | action | Academy | Reference only for a future editor; ordinary site navigation does not need desktop menus. |
| [Message](https://ui.shadcn.com/docs/components/base/message) | conversation | Academy | Reference only; distinguish teaching text, learner input and model-generated content. |
| [Message Scroller](https://ui.shadcn.com/docs/components/base/message-scroller) | conversation | Academy | Reference only; preserve user scroll position and reading order in any future chat. |
| [Native Select](https://ui.shadcn.com/docs/components/base/native-select) | selection | All apps | Prefer for short lists and narrow screens when search is unnecessary. |
| [Navigation Menu](https://ui.shadcn.com/docs/components/base/navigation-menu) | navigation | Portfolio, Market Map | Use only for genuine navigation; preserve the portfolio header unless reviewed. |
| [Pagination](https://ui.shadcn.com/docs/components/base/pagination) | data | ASE, Atlas, Partner Workspace | Explicit record paging with total/filtered counts and stable filters. |
| [Popover](https://ui.shadcn.com/docs/components/base/popover) | context | Atlas, ASE, Market Map | Filter panels and brief controls; label search and restore focus on dismissal. |
| [Progress](https://ui.shadcn.com/docs/components/base/progress) | feedback | Academy, Camp, ASE | Show real task counts; keep review, practice and passed checks separate. |
| [Questionnaire](https://ui.shadcn.com/docs/components/base/questionnaire) | forms | Academy, Camp | Reference/candidate for structured questions; preserve existing deterministic grading. |
| [Radio Group](https://ui.shadcn.com/docs/components/base/radio-group) | selection | Camp, Academy, Revenue OS | One-of-many choices; expose selected state and grouped labels. |
| [Resizable](https://ui.shadcn.com/docs/components/base/resizable) | workspace | Academy, ASE | Optional editor/evidence split pane; stacked mobile layout and non-drag resizing fallback. |
| [Scroll Area](https://ui.shadcn.com/docs/components/base/scroll-area) | workspace | ASE, Atlas, Market Map | Contained long panes when native scrolling is insufficient; avoid nested scroll traps. |
| [Select](https://ui.shadcn.com/docs/components/base/select) | selection | All apps | Use for a justified styled selector; prefer native controls where sufficient. |
| [Separator](https://ui.shadcn.com/docs/components/base/separator) | layout | All apps | Group content without manufacturing heading semantics. |
| [Sheet](https://ui.shadcn.com/docs/components/base/sheet) | context | ASE, Market Map, Atlas | Inspect authorized evidence in context; retain a durable detail link for long content. |
| [Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) | navigation | ASE, Atlas, Revenue OS | Workspace navigation only; keep mobile menu and current-location state clear. |
| [Skeleton](https://ui.shadcn.com/docs/components/base/skeleton) | feedback | ASE, Market Map, Atlas | Real loading placeholders; do not conceal errors or animate indefinitely. |
| [Slider](https://ui.shadcn.com/docs/components/base/slider) | forms | Revenue OS | Optional assumption exploration with exact numeric input, units and bounds. |
| [Spinner](https://ui.shadcn.com/docs/components/base/spinner) | feedback | All apps | Real pending actions; accessible status text, timeout and retry behavior. |
| [Switch](https://ui.shadcn.com/docs/components/base/switch) | selection | ASE, Academy | Immediate boolean preferences; avoid ambiguous confirmation-sensitive actions. |
| [Table](https://ui.shadcn.com/docs/components/base/table) | data | Market Map, Atlas, Revenue OS | Semantic comparisons with caption, headers and contained mobile overflow. |
| [Tabs](https://ui.shadcn.com/docs/components/base/tabs) | disclosure | Portfolio, Academy, Market Map | Peer views, not filters; preserve panel linkage and keyboard behavior. |
| [Textarea](https://ui.shadcn.com/docs/components/base/textarea) | forms | Portfolio, ASE, Revenue OS | Notes and decision drafts; minimize sensitive content and explain persistence. |
| [Toast](https://ui.shadcn.com/docs/components/base/toast) | feedback | ASE, Camp | Supplementary confirmations; keep critical errors and evidence changes durable. |
| [Toggle](https://ui.shadcn.com/docs/components/base/toggle) | selection | Market Map, Atlas | A true on/off display preference with a named pressed state. |
| [Toggle Group](https://ui.shadcn.com/docs/components/base/toggle-group) | selection | Market Map, Atlas | Explicit view controls; distinguish single and multi-selection. |
| [Tooltip](https://ui.shadcn.com/docs/components/base/tooltip) | helper | All apps | Supplementary short help on focus/hover; no essential or touch-only-hidden information. |
| [Typography](https://ui.shadcn.com/docs/components/base/typography) | content | All apps | Reference for structure; preserve each app's existing typography tokens. |

## dnd-kit inventory — 32 current React/core pages

Candidates: an ASE shortlist or an Academy/Camp ordering exercise. Start with one list. Keyboard sensors and announcements do not alone prove accessibility: provide Move up/down or a destination selector, cancel/undo, stable item IDs, focus retention, reduced motion and touch-scroll tests. A drag must never silently mark a deal closed, approve evidence, award a pass or reassign a territory. For persisted ordering, handle failed saves and concurrent edits explicitly.

| Source option | Proposed use / review boundary |
| --- | --- |
| [Managing Sortable State](https://dndkit.com/react/guides/sortable-state-management) | Persist stable IDs and explicit order; reconcile cancellation and failed saves. Candidate for an ASE shortlist. |
| [Quickstart Guide](https://dndkit.com/quickstart) | Plain DOM entry point; reference only for these React apps. |
| [Sortable Lists](https://dndkit.com/concepts/sortable) | List and cross-list ordering concepts; define whether order has business meaning. |
| [React Quickstart](https://dndkit.com/react/quickstart) | Current React package entry point; choose this API family for a new pilot. |
| [useSortable Hook](https://dndkit.com/react/hooks/use-sortable) | Candidate for a single ordered practice exercise or shortlist. |
| [useDraggable Hook](https://dndkit.com/react/hooks/use-draggable) | Basic movable item; use a named handle and a non-drag alternative. |
| [DragDropProvider](https://dndkit.com/react/components/drag-drop-provider) | Scope a pilot and handle events; do not turn UI movement into implicit backend mutations. |
| [Auto Scroller Plugin](https://dndkit.com/extend/plugins/auto-scroller) | Optional long-list behavior; verify touch scrolling and scroll boundaries. |
| [Configuring Sensors](https://dndkit.com/react/guides/sensors) | Configure pointer and keyboard initiation; prevent scroll gestures from accidentally dragging. |
| [DragDropManager](https://dndkit.com/concepts/drag-drop-manager) | Core lifecycle reference; clean up listeners and instances. |
| [Draggable Elements](https://dndkit.com/concepts/draggable) | Core item identity and handle concepts; not a reason to add freeform dragging. |
| [Droppable Targets](https://dndkit.com/concepts/droppable) | Valid target and accepted-type concepts; validate business eligibility independently. |
| [Modifiers](https://dndkit.com/extend/modifiers) | Movement constraints; use only constraints needed by the task. |
| [Plugins](https://dndkit.com/extend/plugins) | Extension reference; avoid installing every plugin. |
| [Accessibility Plugin](https://dndkit.com/extend/plugins/accessibility) | Announcements and instructions; verify with assistive technology. |
| [Cursor Plugin](https://dndkit.com/extend/plugins/cursor) | Supplementary drag feedback; do not communicate state through cursor alone. |
| [Debug Plugin](https://dndkit.com/extend/plugins/debug) | Development-only inspection; omit debugging overlays from the user flow. |
| [Feedback Plugin](https://dndkit.com/extend/plugins/feedback) | Visual drag feedback; retain readable source and target states. |
| [Style Injector Plugin](https://dndkit.com/extend/plugins/style-injector) | Review injected styles and content-security-policy compatibility. |
| [Sensors](https://dndkit.com/extend/sensors) | Pointer/keyboard extension reference; preserve both interaction paths. |
| [Keyboard Sensor](https://dndkit.com/extend/sensors/keyboard-sensor) | Keyboard operation and cancellation; keep a simpler Move up/down alternative. |
| [Pointer Sensor](https://dndkit.com/extend/sensors/pointer-sensor) | Mouse/touch/pen interaction; test handles on real touch devices. |
| [DragOverlay](https://dndkit.com/react/components/drag-overlay) | Optional moving preview; avoid duplicate accessible controls. |
| [Collision Detection](https://dndkit.com/react/guides/collision-detection) | Choose target detection to match the list geometry; test ambiguous boundaries. |
| [Feedback Plugin](https://dndkit.com/react/guides/feedback) | React feedback configuration and reduced-motion review. |
| [Migration Guide](https://dndkit.com/react/guides/migration) | Legacy/current compatibility reference; do not mix examples from different package generations. |
| [Modifiers](https://dndkit.com/react/guides/modifiers) | React axis/container/window/grid constraints; no general canvas requirement. |
| [Multiple Sortable Lists](https://dndkit.com/react/guides/multiple-sortable-lists) | Later board candidate; cancel/undo and authorized state transitions first. |
| [useDragDropManager](https://dndkit.com/react/hooks/use-drag-drop-manager) | Low-level manager access only if the normal provider is insufficient. |
| [useDragDropMonitor](https://dndkit.com/react/hooks/use-drag-drop-monitor) | Observe drag events; never log sensitive item payloads. |
| [useDragOperation](https://dndkit.com/react/hooks/use-drag-operation) | Render temporary operation state without asserting a successful save. |
| [useDroppable Hook](https://dndkit.com/react/hooks/use-droppable) | React drop target; ensure eligibility and an accessible move action. |

Framework reference entry points discovered: [DOM/TypeScript](https://dndkit.com/quickstart), [React](https://dndkit.com/react/quickstart), [Vue](https://dndkit.com/vue/quickstart), [Svelte](https://dndkit.com/svelte/quickstart), [Solid](https://dndkit.com/solid/quickstart), [legacy](https://dndkit.com/legacy/introduction/installation). Only current DOM/core and React bodies are included in this audit.

### Named dnd-kit extension choices

- Sensors: PointerSensor and KeyboardSensor.
- Plugins listed: Accessibility, AutoScroller, Cursor, Feedback, StyleInjector; Debug is an explicit development option.
- Modifiers listed: RestrictToHorizontalAxis, RestrictToVerticalAxis, SnapModifier, RestrictToWindow, RestrictToElement.
- Collision detectors listed: defaultCollisionDetection, pointerIntersection, shapeIntersection, closestCenter, closestCorners, pointerDistance, directionBiased.
- Built-in choices can be configured or extended; use the selected version's documentation instead of copying legacy imports.

Sources: [sensors](https://dndkit.com/extend/sensors), [plugins](https://dndkit.com/extend/plugins), [modifiers](https://dndkit.com/extend/modifiers), [React collision detection](https://dndkit.com/react/guides/collision-detection).

## Sandpack inventory — 25 documentation sections

| Source option | Proposed use / review boundary |
| --- | --- |
| [Introduction | Sandpack Docs – Sandpack](https://sandpack.codesandbox.io/docs) | Overview; candidate for Academy browser lessons only. |
| [Playground – Sandpack](https://sandpack.codesandbox.io/docs/quickstart) | Start with one explicit Run action and a static/React fixture. |
| [Frequently Asked Questions – Sandpack](https://sandpack.codesandbox.io/docs/resources/faq) | Check runtime restrictions and Nodebox terms; do not infer unlimited free commercial use. |
| [Install – Sandpack](https://sandpack.codesandbox.io/docs/getting-started) | Installation reference; no dependency added by this audit. |
| [Usage – Sandpack](https://sandpack.codesandbox.io/docs/getting-started/usage) | Templates, files, dependencies, read-only and custom setup; pin the eventual package version. |
| [Layout – Sandpack](https://sandpack.codesandbox.io/docs/getting-started/layout) | Choose one editor/preview layout; stack on phones. |
| [Sandpack Themes – Sandpack](https://sandpack.codesandbox.io/docs/getting-started/themes) | Map to existing tokens; avoid adding unrelated theme choices to the learner flow. |
| [Private packages – Sandpack](https://sandpack.codesandbox.io/docs/getting-started/private-packages) | Hold: no private package tokens or employer source in browser lessons. |
| [Overview – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage) | Provider-level composition reference for a later bounded pilot. |
| [Components – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/components) | Editor, preview, explorer, console, viewer and tests; adopt only the pieces the lesson needs. |
| [Hooks – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/hooks) | Custom state/control hooks; retain explicit reset and unsubscribed listeners. |
| [Sandpack Client – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/client) | Lower-level runtime integration; not needed for the first React component pilot. |
| [Static – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/static) | Static HTML/CSS/JS candidate; still review scripts, external resources and iframe boundaries. |
| [Experimental bundler (beta) – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/bundlers) | Beta/reference only; evaluate compatibility and browser/network requirements before use. |
| [Serving static files – Sandpack](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files) | Beta/reference only; use public synthetic assets. |
| [Guides – Sandpack](https://sandpack.codesandbox.io/docs/guides) | Integration entry point; no new app architecture implied. |
| [Local dependencies/packages – Sandpack](https://sandpack.codesandbox.io/docs/guides/local-dependencies) | Reference only; review included source and licenses before bundling. |
| [Hosting the Bundler – Sandpack](https://sandpack.codesandbox.io/docs/guides/hosting-the-bundler) | Later option requiring a real hosting, maintenance and cost decision. |
| [Integrate Monaco Editor – Sandpack](https://sandpack.codesandbox.io/docs/guides/integrate-monaco-editor) | Defer; avoid a second editor unless the included editor fails a named need. |
| [Server-side rendering – Sandpack](https://sandpack.codesandbox.io/docs/guides/ssr) | Read before a Next.js pilot; verify hydration and client-only runtime loading. |
| [Community – Sandpack](https://sandpack.codesandbox.io/docs/resources/community) | Inspiration only; third-party examples require independent source/license review. |
| [v1.x – Sandpack](https://sandpack.codesandbox.io/docs/resources/migration-guide/v1) | Historical migration reference, not the default setup recipe. |
| [v2.x – Sandpack](https://sandpack.codesandbox.io/docs/resources/migration-guide/v2) | Migration/runtime reference; check installed-version compatibility. |
| [Overview – Sandpack](https://sandpack.codesandbox.io/docs/architecture/overview) | Understand frame/runtime message boundaries before enabling code execution. |
| [Private dependencies: technical specification – Sandpack](https://sandpack.codesandbox.io/docs/architecture/private-packages) | Hold: architecture reference does not authorize credentials in the client. |

### Enumerated Sandpack choices

These are choices visible in the scraped documentation, not a promise that every option is compatible with the eventual pinned package.

- Quickstart template choices: `static`, `angular`, `react`, `solid`, `svelte`, `vanilla`, `vue`. The usage guide also links source-defined presets; these seven are not the entire package's template union.
- Quickstart layouts: Default, Advanced, Custom height, Reverse, File explorer, Console (tab), Console (component), Editor + Console, Transpiled code, Multiple previews, Multiple editors, Only preview.
- Theme choices shown: auto, dark, light, amethyst, aquaBlue, atomDark, cobalt2, cyberpunk, dracula, ecoLight, freeCodeCampDark, githubLight, gruvboxDark, gruvboxLight, levelUp, monokaiPro, neoCyan, nightOwl, sandpackDark; custom theme supported. The themes page's “16 total” heading does not match the full displayed choices, so no authoritative count is asserted.
- Compositions/components: Sandpack preset, SandpackProvider, SandpackLayout, SandpackPreview, SandpackCodeEditor, SandpackFileExplorer, SandpackTests, SandpackConsole, SandpackCodeViewer, SandpackTranspiledCode, OpenInCodeSandboxButton, FileTabs and Navigator.
- Hooks: useSandpack, useSandpackNavigation, useActiveCode, useSandpackConsole, useSandpackClient, useSandpackTheme and useTranspiledCode.
- Configuration families: custom files; hidden/read-only/active files; package dependencies; external resources; entry file/custom setup; preview controls; editor extensions/additional languages; test visibility; console; client/bundler selection; SSR; optional Monaco and self-hosting.

Sources: [quickstart](https://sandpack.codesandbox.io/docs/quickstart), [usage](https://sandpack.codesandbox.io/docs/getting-started/usage), [themes](https://sandpack.codesandbox.io/docs/getting-started/themes), [components](https://sandpack.codesandbox.io/docs/advanced-usage/components), [hooks](https://sandpack.codesandbox.io/docs/advanced-usage/hooks).
The usage page's preset link points at client type definitions, whose names differ from the React-facing quickstart. A guessed `sandpack-react/src/templates/index.ts` path returned 404. Resolve the actual exported preset types at the chosen version before claiming a complete runtime-template matrix.

### Proposed Academy pilot and boundaries

Task: change a heading or a small JavaScript value and explain the resulting browser output. Offer read-only code and expected-output fallback before a learner starts the runner. Keep YAML as text/configuration teaching: Sandpack is not a GitHub Actions runner, shell, Docker host or proof a deployment succeeded.

1. Use one vetted synthetic static/React fixture and a pinned dependency allowlist. No private packages, repository credentials, employer code, live customer data or real secrets.
2. Load only after explicit Run/Start lab. Document what code goes to which bundler/frame/CDN. Disable or clearly separate external Open in CodeSandbox export for the pilot.
3. Review actual iframe origins, sandbox permissions, content-security-policy needs, messages and external requests. Do not assert network isolation merely because the preview is in an iframe. Do not weaken the application-wide policy to make the demo work.
4. No arbitrary URLs/imports or privileged parent API credentials in the fixture. Treat learner code as untrusted. Bound files/output, add reset and timeout/error recovery, and avoid recording code or console content in analytics.
5. A hidden file or hidden test is still client-delivered; it cannot protect an answer key, secret or authoritative assessment. Client test success may support practice feedback, not a trusted certification.
6. Preserve lesson IDs and distinct Reviewed / Practiced / Passed checks. Loading or running a preview never marks mastery.
7. Measure mobile load, frame memory, error behavior and browser support; keep one mounted runner and a nonexecuting fallback. Review Nodebox terms separately before Vite/Next.js/Node examples.

These are proposed application safeguards, not claims that Sandpack enforces them by default.

## Acceptance, refresh and rollback

Before implementation, record the named task, source/package version, local wrapper, license decision, owner, dependencies and destination. Verify 375/768/1280px, keyboard/focus, reduced motion, 200% zoom, touch targets, long labels and empty/error/denied states. For drag/drop verify canceled/failed/repeated moves; for Sandpack verify blocked/offline runtime, reset, no privileged requests and safe output handling. Required repo checks still apply.

Refresh manually before adopting an item, after an upstream breaking/security/license change, or at the next quarterly review (2027-01-13). Re-scrape the index first, diff URLs/titles against the manifest, review affected candidates, and propose changes only in impacted repos. Removed URLs become stale references until reviewed. No automatic source copying, recurring automation or dependency installation.

Verification for this documentation change: URL uniqueness and group counts; every shadcn slug has a destination/rationale; all 121 source records have content and HTTP 200; candidate links and repo pointers inspected. Runtime build, browser behavior and dependency scans are not implied by documentation. Rollback: remove the appendix/manifest and its links; no data migration.

Related first implementation: [Security Market Map PR #36](https://github.com/heyfunwhoa/security-market-map/pull/36), a separate proposed Radix Tabs adoption. This reference audit does not merge or deploy it.
