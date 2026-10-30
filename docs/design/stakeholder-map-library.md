# Stakeholder map component library

## Scope

A small in-repository library for read-only relationship previews. Public pilot: `/field-notes/multithreading`. Workshop: local `/design-lab`; isolated fixtures: Storybook **Patterns / Stakeholder Map**. The Design Lab still returns 404 in production.

Uses existing shadcn-compatible Button and Card primitives in two explicitly scoped wrappers: `stakeholder-node.tsx` and `stakeholder-detail.tsx`. This is the requested public adoption pilot, not permission to replace every public component. The scoped-import check continues to reject other unreviewed public imports. The desktop graph uses the MIT-licensed `@xyflow/react` package, pinned at `12.12.0`, for pan, zoom, and edge rendering. No React Flow source is copied into the repository.

## Components

| Component | Responsibility |
| --- | --- |
| StakeholderNode | Native pressed button with role, access state and optional gap emphasis |
| StakeholderMap | Controlled selection, three role groups and measured selected-path connectors |
| StakeholderDetail | Priority, access, evidence, labeled relationship paths and optional next move |
| StakeholderPlayground | Portfolio-specific fictional data, guided steps and seller/leader narrative |

Pass `people`, `relationships`, `selectedId` and `onSelect` to the map. Keep selection in the caller. Optional `emphasizedId` highlights a gap; `showNextStep` enables deeper detail. The map does not save, enrich, authorize or fetch data.

## Evidence and data contract

People have stable identifiers, group, role, priority, access, evidence context and next step. Relationships have identifiers, two valid endpoints, label, hypothesis/validated status and evidence context. Reject duplicate IDs, orphan/self edges and missing relationship context. Empty maps show an explicit state. An invalid selected ID falls back to the first person without claiming a new relationship.

Dashed connectors denote hypotheses; solid connectors denote validated relationships. Selecting a person highlights only their paths. Every path's label, other stakeholder and evidence context appear in the detail panel. Shapes and text distinguish access states; access alone is not decision power. Public fixtures remain fictional and all their relationships are hypotheses.

The map is read-only. On desktop, React Flow lays out the three groups, draws hypothesis/validated edges, and provides pan, zoom and fit-view controls. Nodes are not draggable or connectable. On phone/tablet, grouped native stakeholder buttons replace the graph; there is no sideways page scroll. At every width, the selected stakeholder and relationship evidence remain in the adjacent detail panel. Edges are decorative; their labels, status and evidence are repeated in text. Mouse-wheel scrolling does not zoom the canvas, and no motion is needed to understand a state.

## Stories and checks

Stories: Overview, Access Gap, Unknown Access, Empty, Invalid Relationship, Long Labels. Graph-integrity unit tests cover evidence, endpoints and identifiers. Playwright tests cover keyboard selection, labeled hypothesis details, empty/invalid states and horizontal overflow across configured desktop/mobile projects. Browser checks run in CI; local browser tooling is unavailable in this session.

## Shared deal walkthrough — October 30, 2026

The public `/field-notes/enterprise-deal` and `/field-notes/multithreading` examples share one invented software-company security evaluation. The existing `DealJourney` and `StakeholderPlayground` remain the only interactive patterns. Each deal stage separates the fictional signal from evidence to validate, a next seller move, a sales-leader coaching question, and a buyer-validated gate for moving forward. The gate includes a pause or revisit action when evidence is missing. The technical evaluation stage includes an open planning checklist for scope, criteria, owners, data handling, and decision review; it records no test results. The commercial stage maps budget, security review, procurement/legal, and decision timing as open questions, with no assumed owners or dates. The final stage shows a pending decision-record example with no buyer response, rationale, or outcome invented. The stakeholder exercise shows access counts derived from its local fixture and states that access does not establish influence, authority, or purchase intent. Its three guided steps pair the scenario with a sample seller or coaching question and evidence to confirm; the last step includes example introduction wording that is not sent or saved. Proposed actions are not presented as real conversations or buyer responses. No real account, completed deal, customer result, or metric is represented.

Phone/tablet use the existing wrapping buttons and stacked map groups; wider layouts retain the current two-column deal panel and three-group stakeholder map. Keyboard selection remains native buttons with `aria-pressed`; no new motion, persistence, network access, or data import is introduced. The one runtime dependency for desktop graph navigation is recorded below. Content and source review completed; CI and manual responsive/keyboard/200% zoom review remain pending for the implementing change.

## Open-source graph adoption — October 30, 2026

- **Source and license:** [`@xyflow/react` 12.12.0](https://github.com/xyflow/xyflow/tree/v12.12.0/packages/react), MIT. The project keeps the library attribution visible; no source files are copied.
- **Task and destination:** Let hiring readers pan and zoom the existing fictional stakeholder relationship map on desktop. The existing `/field-notes/multithreading` fixture, relationship detail panel, and selection ownership remain local.
- **Decision:** Adapt the existing map with React Flow at `lg` and above. Keep the grouped native-button map for phone/tablet. The graph is read-only: no drag, edge creation, save, network request, or user data.
- **Keyboard and content:** Stakeholder cards stay native buttons with `aria-pressed` and visible focus. Relationship status/evidence remain in the selected detail panel and text legend. React Flow controls expose named zoom and fit-view actions; wheel scrolling remains page scrolling. Empty, invalid-data, selected, and reset states remain handled by existing components.
- **Tokens and motion:** Existing joy. colors are applied to nodes, controls and connectors. No motion is added; reduced-motion handling is unchanged.
- **Verification:** `git diff --check` passed locally. CI, dependency audit, production build, browser, keyboard and responsive review for this integration are pending. Existing prior-head evidence does not verify this revision.
- **Rollback:** Remove the `@xyflow/react` import and desktop canvas, restore the previous measured SVG connector layout, and remove the package and lockfile entries. Keep the mobile grouped map and detail panel.

## Reuse boundaries

Keep public fixtures separate from private account adapters. This public library is presentation code, not a place to store customer/contact records. A private app may adopt the component contract only after defining its own authorization and data ownership. Do not add contact discovery, scoring, persistence or drag-and-drop just to expand the component library.

The named React Flow adoption is scoped to the public stakeholder map. Do not generalize it to other maps unless a task needs graph navigation or editing. Do not create a published shared package until a second consuming app demonstrates the need and compatibility requirements.
