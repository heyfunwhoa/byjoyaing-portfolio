# Stakeholder map component library

## Scope

A small in-repository library for read-only relationship previews. Public pilot: `/field-notes/multithreading`. Workshop: local `/design-lab`; isolated fixtures: Storybook **Patterns / Stakeholder Map**. The Design Lab still returns 404 in production.

Uses existing shadcn-compatible Button and Card primitives in two explicitly scoped wrappers: `stakeholder-node.tsx` and `stakeholder-detail.tsx`. This is the requested public adoption pilot, not permission to replace every public component. The scoped-import check continues to reject other unreviewed public imports. No new dependencies.

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

Three responsive groups replace absolute-positioned cards. At narrow widths, groups stack and retain every button and the detail panel. Desktop connectors are measured from actual card bounds with ResizeObserver; longer text cannot move endpoints away from cards. Connectors are decorative; labeled paths convey the same information without them. No essential hover interaction or motion.

## Stories and checks

Stories: Overview, Access Gap, Unknown Access, Empty, Invalid Relationship, Long Labels. Graph-integrity unit tests cover evidence, endpoints and identifiers. Playwright tests cover keyboard selection, labeled hypothesis details, empty/invalid states and horizontal overflow across configured desktop/mobile projects. Browser checks run in CI; local browser tooling is unavailable in this session.

## Shared deal walkthrough — October 30, 2026

The public `/field-notes/enterprise-deal` and `/field-notes/multithreading` examples share one invented software-company security evaluation. The existing `DealJourney` and `StakeholderPlayground` remain the only interactive patterns. Each deal stage separates the fictional signal from evidence to validate, a next seller move, a sales-leader coaching question, and a buyer-validated gate for moving forward. The gate includes a pause or revisit action when evidence is missing. The technical evaluation stage includes an open planning checklist for scope, criteria, owners, data handling, and decision review; it records no test results. The stakeholder exercise shows access counts derived from its local fixture and states that access does not establish influence, authority, or purchase intent. Its three guided steps pair the scenario with a sample seller or coaching question and evidence to confirm; proposed actions are not presented as real conversations or buyer responses. No real account, completed deal, customer result, or metric is represented.

Phone/tablet use the existing wrapping buttons and stacked map groups; wider layouts retain the current two-column deal panel and three-group stakeholder map. Keyboard control remains native buttons with `aria-pressed`; no new motion, persistence, network access, data import, or dependency is introduced. Content and source review completed; CI and manual responsive/keyboard/200% zoom review remain pending for the implementing change.

## Reuse boundaries

Keep public fixtures separate from private account adapters. This public library is presentation code, not a place to store customer/contact records. A private app may adopt the component contract only after defining its own authorization and data ownership. Do not add contact discovery, scoring, persistence or drag-and-drop just to expand the component library.

Consider a graph engine only when a concrete authoring requirement needs drag, zoom or layout algorithms. Do not create a published shared package until a second consuming app demonstrates the need and compatibility requirements.
