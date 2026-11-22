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
| [Rail Map Painter](https://github.com/railmapgen/rmp) · [Editor](https://railmapgen.org/?app=rmp) · [Gallery](https://railmapgen.org/?app=rmp-gallery) | Drag stations onto a canvas, connect lines, and adjust paths and labels. | Sketch two categories with one shared product. Can a reader follow either line through the transfer? | Try in sketch | [GPL-3.0](https://github.com/railmapgen/rmp/blob/main/LICENCE) |
| [d3-tube-map](https://github.com/johnwalley/d3-tube-map) · [Observable demo](https://observablehq.com/@johnwalley/d3-tube-map) | Each route has a sequence of nodes. Station coordinates and label directions control the schematic. | Try placing a long vendor name beside an interchange. Use this as a layout reference if labels collide. | Saved | [BSD-3-Clause](https://github.com/johnwalley/d3-tube-map/blob/master/LICENSE) |
| [Subway Now](https://github.com/sunny-ng/subwaynow-web) · [NYC map](https://www.subwaynow.app/) | The app uses live service data to redraw subway routes when service changes. | Revisit if readers need to see how vendor coverage changed between two dated sources. | Parked | [MIT](https://github.com/sunny-ng/subwaynow-web/blob/master/LICENSE) |
| [Mini Tokyo 3D](https://github.com/nagix/mini-tokyo-3d) · [Tokyo map](https://minitokyo3d.com/) | Select a train to follow it. Its timetable opens at the bottom and can be collapsed. [Interaction guide](https://minitokyo3d.com/docs/master/user-guide/screen-and-operations.html) | Select a product to open its evidence. Close the panel and return focus to the same station with both lines still in view. | Try in sketch | [MIT](https://github.com/nagix/mini-tokyo-3d/blob/master/LICENSE) |

**Source review, 2026-11-22.** Codex checked the upstream project documentation and code license files linked above. The interactions are documented by their publishers. The market-map ideas are proposals for a first sketch. Demo usability, package compatibility, and rights to third-party maps, icons, or transit feeds need their own review if used.

### First sketch

**Buyer question.** Who can help me find credentials my company has exposed publicly?

Draw two labeled lines, *Secrets Detection* and *Public Exposure Monitoring*, with products from five or six vendors if the evidence supports that many. Label each station with the product and identify its vendor in the detail panel. A shared station needs evidence for the same product on both lines. When a vendor sells two separate products, give them separate stops. The [Market Map graph model](https://github.com/heyfunwhoa/security-market-map/blob/main/docs/product/evidence-graph-rollout-and-guardrails.md) distinguishes products, vendors, claims, and sources.

Label the shared station's panel **Why is this product on both lines?** For each line, show the precise capability, who reported it, when the source was checked, and a link to the passage. Leave open questions visible. For example, monitoring a public repository and checking whether a discovered key is active are separate claims. Give the list view the same evidence links so a reader can complete the task with a keyboard or on a phone.

### Company attribution and handoff

The three-product example covers GitGuardian Public Monitoring, Forager, and Gitleaks. State the sample size beside the legend. Each line represents a placement supported by a reviewed source. A missing line leaves the other placement open.

Keep **What links a finding to the company?** visible when a station is selected. Show the documented attribution signal, the input or setup a customer supplies, and who still needs to confirm ownership. Include a source-review date beside the documentation. Record a key's last verification time only when a finding supplies it.

| Product | What the source establishes | What the responder still needs |
| --- | --- | --- |
| GitGuardian Public Monitoring | Company names, email domains, and company GitHub organizations help define the monitored perimeter. Depending on the source, GitGuardian can attach findings through a developer, organization, or company-specific term. [Company perimeter](https://docs.gitguardian.com/public-monitoring/perimeter/overview) · [Attachment reasons by source](https://docs.gitguardian.com/public-monitoring/sources/overview) | Check which rule matched this finding, which account issued the credential, and who can rotate it. |
| Forager | Truffle Security describes a company view of verified keys grouped by associated email domain. [Forager guide](https://trufflesecurity.com/docs/user-enablement-guide#:~:text=Forager%20diligently%20monitors) · [How domain access works](https://trufflesecurity.com/blog/introducing-forager) | Confirm which account the key belongs to, who can act on it, and when its status was last checked. |
| Gitleaks | The operator supplies a repository, directory, or input stream to scan. Company attribution remains unestablished by this source. [Gitleaks README](https://github.com/gitleaks/gitleaks#readme) | Trace the finding to its issuing account and an authorized owner. |

Documentation reviewed November 22, 2026. The sources describe product behavior. The responder questions are design prompts. A station's **Suggest a correction** link should open an editable draft with the product, reviewed placements and source URLs.

**Try it with a reader.** Give them one minute to find two vendors, name a meaningful product difference, and open the evidence for it. Then give them this fictional case. A contractor commits a key from a personal account. The key belongs to a customer's cloud account. Your team receives the alert. Ask **“What would you still need to verify before you sent this finding to someone to fix?”** Listen for the difference between the person who published it, the account that owns it, and the person authorized to revoke it. Ask what they think the order of the stops means. If they read it as a ranking, label the ordering or revise the layout. Record their answer and where they hesitated.

## Design component references

| Component and example | Documented behavior | Where to try it | Decision | Upstream code terms |
| --- | --- | --- | --- | --- |
| [PatternFly Drawer](https://github.com/patternfly/patternfly-react) · [Drawer examples](https://www.patternfly.org/components/drawer/) | A panel can slide over content or push it aside. | Security Market Map. Select a shared product and show its evidence beside the two lines. Check that closing the drawer returns focus to the same station. | Saved | [MIT](https://github.com/patternfly/patternfly-react/blob/main/LICENSE) |
| [GOV.UK Summary List](https://github.com/alphagov/govuk-frontend) · [Summary list examples](https://design-system.service.gov.uk/components/summary-list/) | Labeled rows pair a key with a value. Summary cards group related lists. | Security Market Map and Detector Atlas. Show what the source confirms, what remains unknown, and the source link in three labeled rows. | Saved | [MIT for code](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt) |
| [React Aria TagGroup](https://github.com/adobe/react-spectrum) · [TagGroup demo](https://react-aria.adobe.com/TagGroup) | Users can navigate tags by keyboard, select them, and remove them. | Detector catalog. Display active filters above the results so a reader can remove “Has rotation guide” while keeping the provider filter. | Saved | [Apache-2.0](https://github.com/adobe/react-spectrum/blob/main/LICENSE) |
| [IBM Carbon expandable data table](https://github.com/carbon-design-system/carbon) · [Data table examples](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines) | A row expands to reveal supplementary information within the table. | Security Market Map. Keep vendor capabilities in aligned columns and expand one vendor to inspect the source behind its coverage. | Saved | [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE) |
| [USWDS Process List](https://github.com/uswds/uswds) · [Process list example](https://designsystem.digital.gov/components/process-list/) | A numbered list gives each stage in a sequence a heading and space for instructions. | Builder Academy and rotation guides. Show the provider's documented order of operations, linking each step to its instructions. | Saved | [Public domain for U.S. government work, with exceptions for third-party assets](https://github.com/uswds/uswds/blob/develop/LICENSE.md) |
| [GOV.UK Details](https://github.com/alphagov/govuk-frontend) · [Disclosure example](https://design-system.service.gov.uk/components/details/) | A reader opens a labeled disclosure for additional help. | Detector Atlas. Open “What does Base64 mean here?” beside the column heading, show one example, and link to the full guide. | Saved | [MIT for code](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt) |
| [OpenLayers permalink](https://github.com/openlayers/openlayers) · [Shareable map example](https://openlayers.org/en/latest/examples/permalink.html) | The URL records the map's center, zoom, and rotation so someone can reopen that view. | Security Market Map. Use product and category IDs in a link so a colleague can reopen the same evidence panel. Revisit the link after renaming a product. | Saved | [BSD-2-Clause](https://github.com/openlayers/openlayers/blob/main/LICENSE.md) |
| [GitHub Primer Blankslate](https://github.com/primer/react) · [Empty state examples](https://primer.style/product/components/blankslate/) | An empty view explains why content is absent and can offer an action. | Security Market Map. Offer “Clear filters” when a search has no matches. Offer “Sources reviewed” when research leaves a capability unknown. | Saved | [MIT](https://github.com/primer/react/blob/main/LICENSE) |
| [USWDS in-page navigation](https://github.com/uswds/uswds) · [Section navigation example](https://designsystem.digital.gov/components/in-page-navigation/) | Links take a reader to individual sections on a long page. | Detector Atlas. Jump directly to “How it works,” “What the result confirms,” or “Source code” on a detector or analyzer page. | Saved | [Public domain for U.S. government work, with exceptions for third-party assets](https://github.com/uswds/uswds/blob/develop/LICENSE.md) |

**Source review, 2026-11-22.** Codex checked each component's published examples and upstream licensing file. The suggested uses are sketch ideas. For the [first train-map sketch](#first-sketch), pair the drawer and summary list. A reader selects a shared product, sees one row per category, and can open the evidence for each placement.

## Adding another design reference

Search for the component and repository together. One project can supply several distinct patterns. Add a row under the relevant design topic with the repo, demo, one documented interaction, the reader task it could help, a decision, and the upstream code license (or “unverified”). Date the source check. Use **Saved** to keep an idea, **Try in sketch** to name an experiment, or **Parked** with a reason to revisit.

After a trial, link a screenshot of your sketch in the decision cell. Add one sentence describing what you kept, changed, or dropped and which observation led to that choice. An example format is “Kept [interaction] on [screen] because the reader [observed behavior].” If a team decides to evaluate a dependency, use the shared intake linked above.

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
