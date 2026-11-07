# Design Lab: component opportunity register

Owner: portfolio maintainer. Updated 2026-11-06. Tracking: KRU-150 / Portfolio PR #258. Status: living planning inventory, not an installation plan or release approval.

## Where it lives

- Repository: `heyfunwhoa/byjoyaing-portfolio`.
- Page: `app/design-lab/page.tsx`, route `/design-lab`.
- Local access: check out `feat/kru-150-gameful-workbench`, install its locked dependencies with `npm ci`, run `npm run dev`, then open `http://localhost:3000/design-lab` (use the printed port if 3000 is occupied).
- The route is intentionally unavailable in production, including a normal production-mode preview. It is not a live public portfolio page. No hosting/access boundary changed.
- Catalog UI: **Choose by the job to be done**, with Project, Search, Availability, Cards and Table controls.
- Canonical item records: `lib/component-options.ts`. This guide records coverage and maintenance, rather than duplicating item data.
- Component implementation inventory: `component-inventory.md`; licensing/adoption: `gameful-adoption.md` and `component-adoption.md`.

## Inventory scope and meaning

44 current records: 37 candidates and 7 source-available patterns/pilots. Of these, 24 are game-like options (21 candidates and 3 local pilots). Existing Magic UI-derived BentoGrid is represented by Summary & discovery; installed React Flow is documented in the gameful adoption record. Neither needs a duplicate installation candidate.

This is exhaustive for the component options captured in this conversation and the repository coverage checked on this date. It is not a claim to enumerate every open-source project or every possible future feature. Broader prior UI-source research remains linked from `component-adoption.md` and `component-inventory.md`; this register is not a replacement engineering/software ownership registry.

- **Available here:** source exists in this portfolio branch. It may be local-only and unmerged. Does not mean approved, deployed, or available in another repository.
- **Candidate:** an idea or reference, not installed, scheduled, approved or shipped. Some entries are compositions of existing controls rather than new packages.
- **Alternatives:** Phaser / KAPLAY / Excalibur; InkJS / Twine; 2D and 3D renderers. Select a tool for one task rather than installing the whole group.
- **Provisional fit:** an app suggestion whose requirements or stack have not been verified. Attio Setup and DailySecrets are explicitly provisional.
- **Parked / excluded / restricted:** recorded below, not implementation targets.

## Coverage across the repository portfolio

GitHub inventory returned 14 repositories. Eleven are considered for public-safe component planning below. Three boundaries are retained. Suggestions describe possible tasks only; they do not attest to installed packages in consumers. Repository ownership and architecture stay in Technical Docs Platform's Software Catalog.

| Repository | Possible next task / component families | Planning boundary |
| --- | --- | --- |
| byjoyaing-portfolio | Editorial cards, project exploration, accessible diagrams, code transitions, quizzes, flashcards, optional game scenes | Design Lab is the pilot home; public adoption is separate. |
| gtm-revenue-os | Discovery/negotiation simulations, POC/runbook steps, evidence review, exact comparisons | Synthetic learning only; no automatic qualification, CRM or formula changes. |
| account-signal-engine | Research triage tables, import review, evidence sheets, source freshness, human-reviewed decisions | Signals are not buyer intent or automatic outreach authorization. |
| security-market-map | Category hierarchy, comparison tables, relationship navigation, source/evidence inspection | Research integrity first; no invented market share or numeric scores. |
| detector-coverage-atlas | Coverage heatmaps, filters, evidence review, synthetic detection exercises | Coverage claims require evidence; fictional exercises stay distinct from detector validation. |
| truffle-camp | Quiz, spaced review, branching stories, code walkthroughs, one bounded training mini-game | Learning outcomes and accessible non-game alternatives first; no confidential employer content. |
| channel-territory-mapping | Import preview, column mapping, row errors, duplicate/company matching and ownership comparison | README supports partner-book import/ownership use case; proposed components are not confirmed integrations. |
| portfolio-ops-runtime | Attention list, evidence details, review checklists, explicit workflow state | Preserve its native lightweight stack and permission boundaries; React examples are conceptual references unless a migration is justified. |
| technical-docs-platform | Documentation templates, procedure/checklist patterns, source review, static before/after code | Often needs Markdown/reference patterns, not a new app runtime. Canonical standards remain there. |
| attio-setup | Potential setup checklist and import-validation guidance | Repository found, README unavailable (404). Confirm purpose, files and stack before implementation. No CRM mutation or invented existing UI. |
| dailysecrets | Potential editorial source/review cards | Repository found, README unavailable (404). Fit is provisional; inspect requirements before choosing components. No content automation or publication implied. |

**Retained boundaries (remaining three repositories):** GTPS Rentals stays parked; the TruffleHog fork stays excluded by owner direction; the private personal repository stays restricted, with its records and implementation details outside this public portfolio. No source or personal data was read or copied from that restricted repository. The Interview dashboard catalog filter is a use-case destination, not a separate verified repository.

## Useful order

1. Reuse existing tables, detail panels, forms, empty states, navigation and evidence controls where a workflow is incomplete.
2. Evaluate the three existing local game-like pilots before adopting more engines.
3. Consider spaced review, code transitions and visual story authoring for a defined learning need.
4. Park 2D/3D worlds, audio and decorative rewards until a bounded task and performance/accessibility budget justify them.
5. Leave requirements-unknown and parked repositories out of implementation queues.

## How to maintain the list

When another option is discussed, add or update one stable catalog item before implementation: name/source, user task, suggested destinations, availability, known dependency/license constraints and next adoption gate. Deduplicate against existing patterns and group alternative tools in the adoption note. Keep all source-availability claims tied to real files.

Before promoting a candidate: inspect the destination's current AGENTS/PRD, stack and open work; pin a compatible version and license; choose one measurable task; define phone/tablet/desktop and keyboard/reduced-motion behavior; reuse the current owning Linear issue or create scoped delivery work only when committed; record tests/preview evidence and rollback. Candidate capture alone creates no delivery ticket, installation, recurring search or synchronization job.

Maintain changes in this existing register/catalog and PR, with checkpoints in KRU-150. Consumer decisions stay in owning repositories. Do not fork a second package registry or copy restricted material into the lab. Reconcile counts and repository coverage when entries are added, removed or reclassified.
