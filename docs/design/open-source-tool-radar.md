# Open-source tool radar for Design Lab

**Status:** reference-only, proposed. **Reviewed:** 2026-11-06. **Tracking:** [KRU-225](https://linear.app/krusty/issue/KRU-225). No new UI components, dependencies, network access or production changes.

## Where to browse candidates

The authoritative cross-category tool registry is in Technical Docs Platform. **Start with the [browseable 60-tool use-case index](https://github.com/heyfunwhoa/technical-docs-platform/blob/785789969464b788d247deb0333563faca2c89bc/software-catalog/open-source-browse.md)**, generated from the [canonical opportunity register](https://github.com/heyfunwhoa/technical-docs-platform/blob/785789969464b788d247deb0333563faca2c89bc/software-catalog/open-source-opportunities.json) with the [selection and pilot guide](https://github.com/heyfunwhoa/technical-docs-platform/blob/785789969464b788d247deb0333563faca2c89bc/software-catalog/open-source-intake.md), merged through [PR #66](https://github.com/heyfunwhoa/technical-docs-platform/pull/66). The links are pinned to the merged commit to preserve the reviewed catalog baseline.

This **is not another registry**. This portfolio retains the existing curated [component-options catalog](../../lib/component-options.ts), [Design Lab](design-lab.md), [source audit](component-source-audit.md), [adoption contract](component-adoption.md) and Storybook demos. Do not copy the entire cross-category JSON file into this app or add all candidates to the Design Lab UI.

## How the Design Lab should use the radar

| Domain | Candidate examples | Suggested Design Lab use | Current safer baseline |
| --- | --- | --- | --- |
| UI and motion | TanStack Table, TanStack Query, Motion, Recharts, ECharts, Excalidraw | A narrowly scoped data-grid or animation comparison only when a consumer needs one | Radix, shadcn primitives, Storybook, CSS preview motion |
| Content/CMS | **Payload CMS**, Astro Starlight, Fumadocs | Compare editor and documentation usability, not CMS replacement | Keystatic and current Academy pages |
| Learning | Sandpack, Mermaid, JupyterLite, Phaser | One synthetic editable or visual exercise with static fallback | Existing Academy/Truffle Camp components |
| GTM and email | React Email, Umami, Twenty, Activepieces, Metabase | Reference examples for approved asset/analytics patterns | Existing GTM OS scenarios and PostHog |
| Research, AI and delivery | Crawl4AI, Promptfoo, Langfuse, OpenSSF Scorecard, Syft, Trivy | Link to owning program and evidence, not demo every backend dependency in Design Lab | Existing Research Hub, Vitest, GitHub Actions |

Candidate status means **possible future use**, not approved adoption, free cost, verified integration, compliance or production readiness. Source-available candidates must remain visually distinct from OSI open-source packages in any future catalog UI. The canonical registry has explicit license statuses.

## Train-map UI references

Start with Rail Map Painter to sketch a network and Mini Tokyo 3D to study what happens when someone selects one item on a crowded map.

| Project and demo | Documented interaction | What to try in the Security Market Map | Decision | Code license |
| --- | --- | --- | --- | --- |
| [Rail Map Painter](https://github.com/railmapgen/rmp) · [Editor](https://railmapgen.org/?app=rmp) · [Gallery](https://railmapgen.org/?app=rmp-gallery) | Drag stations onto a canvas, connect lines, and adjust paths and labels. | Sketch two categories with one shared vendor. Can a reader follow either line through the transfer? | Try in sketch | [GPL-3.0](https://github.com/railmapgen/rmp/blob/main/LICENCE) |
| [d3-tube-map](https://github.com/johnwalley/d3-tube-map) · [Observable demo](https://observablehq.com/@johnwalley/d3-tube-map) | Each route has a sequence of nodes. Station coordinates and label directions control the schematic. | Try placing a long vendor name beside an interchange. Use this as a layout reference if labels collide. | Saved | [BSD-3-Clause](https://github.com/johnwalley/d3-tube-map/blob/master/LICENSE) |
| [Subway Now](https://github.com/sunny-ng/subwaynow-web) · [NYC map](https://www.subwaynow.app/) | The app uses live service data to redraw subway routes when service changes. | Revisit if readers need to see how vendor coverage changed between two dated sources. | Parked | [MIT](https://github.com/sunny-ng/subwaynow-web/blob/master/LICENSE) |
| [Mini Tokyo 3D](https://github.com/nagix/mini-tokyo-3d) · [Tokyo map](https://minitokyo3d.com/) | Select a train to follow it. Its timetable opens at the bottom and can be collapsed. [Interaction guide](https://minitokyo3d.com/docs/master/user-guide/screen-and-operations.html) | Select a vendor to open its evidence. Close the panel and return focus to the same station with both lines still in view. | Try in sketch | [MIT](https://github.com/nagix/mini-tokyo-3d/blob/master/LICENSE) |

**Source review, 2026-11-22.** Codex checked the upstream project documentation and code license files linked above. The interactions are documented by their publishers. The market-map ideas are proposals for a first sketch. Demo usability, package compatibility, and rights to third-party maps, icons, or transit feeds need their own review if used.

### First sketch

**Buyer question.** Who can help me find credentials my company has exposed publicly?

Draw two labeled lines, *Secrets Detection* and *Public Exposure Monitoring*, with five or six vendors drawn from the market map's existing evidence. Use a transfer only where a source supports each category placement. Selecting a vendor should show the exact capability, its source link, and what the source leaves unknown. Give the list view the same evidence links so readers can complete the task with a keyboard or on a phone.

**Try it with a reader.** Give them one minute to find two vendors, name a meaningful difference, and open the evidence for it. Record where they hesitated before expanding the map.

## Design component references

| Component and example | Documented behavior | Where to try it | Decision | Upstream code terms |
| --- | --- | --- | --- | --- |
| [PatternFly Drawer](https://github.com/patternfly/patternfly-react) · [Drawer examples](https://www.patternfly.org/components/drawer/) | A panel can slide over content or push it aside. | Security Market Map. Select a shared vendor and show its evidence beside the two lines. Check that closing the drawer returns focus to the same station. | Saved | [MIT](https://github.com/patternfly/patternfly-react/blob/main/LICENSE) |
| [GOV.UK Summary List](https://github.com/alphagov/govuk-frontend) · [Summary list examples](https://design-system.service.gov.uk/components/summary-list/) | Labeled rows pair a key with a value. Summary cards group related lists. | Security Market Map and Detector Atlas. Show what the source confirms, what remains unknown, and the source link in three labeled rows. | Saved | [MIT for code](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt) |
| [React Aria TagGroup](https://github.com/adobe/react-spectrum) · [TagGroup demo](https://react-aria.adobe.com/TagGroup) | Users can navigate tags by keyboard, select them, and remove them. | Detector catalog. Display active filters above the results so a reader can remove “Has rotation guide” while keeping the provider filter. | Saved | [Apache-2.0](https://github.com/adobe/react-spectrum/blob/main/LICENSE) |
| [IBM Carbon expandable data table](https://github.com/carbon-design-system/carbon) · [Data table examples](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines) | A row expands to reveal supplementary information within the table. | Security Market Map. Keep vendor capabilities in aligned columns and expand one vendor to inspect the source behind its coverage. | Saved | [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE) |
| [USWDS Process List](https://github.com/uswds/uswds) · [Process list example](https://designsystem.digital.gov/components/process-list/) | A numbered list gives each stage in a sequence a heading and space for instructions. | Builder Academy and rotation guides. Show the provider's documented order of operations, linking each step to its instructions. | Saved | [Public domain for U.S. government work, with exceptions for third-party assets](https://github.com/uswds/uswds/blob/develop/LICENSE.md) |

**Source review, 2026-11-22.** Codex checked each component's published examples and upstream licensing file. The suggested uses are sketch ideas. For the [first train-map sketch](#first-sketch), pair the drawer and summary list. A reader selects a shared vendor, sees one row per category, and can open the evidence for each placement.

## Adding another design reference

Find the upstream repository in this radar first. Add a row under the relevant design topic with the repo, demo, one documented interaction, the reader task it could help, a decision, and the upstream code license (or “unverified”). Date the source check. Use **Saved** to keep an idea, **Try in sketch** to name an experiment, or **Parked** with a reason to revisit. After a trial, add the result and link to the sketch or PR in the decision cell. If a team decides to evaluate a dependency, use the shared intake linked above.

## Payload CMS: higher-interest exploration

The Payload admin UI is worth studying as a design and editorial reference:

1. **Portfolio and Field Notes:** schema-based collections, a more configurable rich-text editing interface, media library, drafts and versions.
2. **Builder Academy:** lesson, path and practice content modeling and editorial review, while preserving existing lesson IDs and progress semantics.
3. **GTM content studio:** structured content briefs, examples, assets and human approval flows before any CRM/publication connections.
4. **Research editorial:** drafts, reviewed state and publication controls, without replacing source provenance and release gates.

**No migration decision:** The current portfolio uses Keystatic. Start by reviewing Payload's [admin UI documentation](https://payloadcms.com/docs/admin/overview) and [official getting-started templates](https://payloadcms.com/get-started). If the attraction is its appearance, first consider whether its interaction/layout patterns can be implemented using your current Design Lab components. Only consider a fresh isolated Payload sandbox with fictional records after confirming Next.js version support, database/storage, auth, deployment and cost implications. Do not touch current editor data, live content or production routes.

## Future implementation contract

Before adding a package to a consumer repository, require a named Linear issue, clear destination/user objective, use-case baseline, current-state alternatives, upstream license/notice review, privacy/credential review, cost estimate, bounded synthetic fixture, accessibility and responsive checks, exact-head CI evidence, owner approval and rollback. See [Technical Docs shared UI adoption standard](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/ui-pattern-adoption-v1.md).

This document is reference-only and should remain separate from active Design Lab PRs #258 and #262 and Academy PR #260. Those PRs modify catalog and curriculum source; resolve their merge/rebase order before a UI integration.
