<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio brand and editorial guidance

Before editing branding, copy, layout, navigation, portfolio examples or public project descriptions, read [docs/brand/brand-guidelines.md](docs/brand/brand-guidelines.md).

- Canonical identity: **joy.** — Kristen Aing, **Revenue & GTM Leader. Curious Builder.**
- Guiding philosophy: **People first. Problem-driven. Systems-minded.**
- Lead with commercial and cybersecurity leadership; organize evidence around People, Strategy and Systems. Professional **Work** comes before independent **Side Quests**.
- The alternative “Curious by nature. Builder by instinct.” is supporting copy, not a replacement headline unless explicitly approved.
- Do not fabricate metrics, titles, technical functionality or research findings; never expose private Joy Index or employer/customer-sensitive information.
- Keep proposed route/navigation changes and the `/prototype` experiment separate from the live homepage until reviewed and tested.
- Use existing tokens, accessible/responsive UI, and verifiable project status labels. Preserve legacy links.
- Follow the risk-based engineering Definition of Done, CI and security guidance already in this repository. Feature branch → focused PR → automated checks → manual accessibility/content review → merge.
- Every portfolio design PR must complete [.github/pull_request_template.md](.github/pull_request_template.md), documenting brand alignment, evidence, impact, tests, and exceptions.
- Change brand fundamentals only through an explicit reviewed update to the canonical guide; do not create competing brand guidelines in other files.

These portfolio-specific rules supplement the Next.js agent block above. Other repositories may share engineering standards without adopting this site's branding.

## Shared engineering and agent operating standards (cross-repository pointer)

For **meaningful changes** to product requirements, architecture, security, integrations, CI, releases or AI-agent workflows, consult the **current** canonical [Technical Docs Platform](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/README.md) guidance as applicable:
- [Risk-tiered engineering baseline and Definition of Done](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md)
- [Agent execution contract](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/execution-contract.md)
- [Agent model-selection policy](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/ai/agent-harness/model-selection.md)
- [Shared PRD template](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/templates/product-prd.md) (format only; this repo owns its product requirements)

These are **links, not copied policy**. Local branding, privacy, product requirements, tested code, and the development workflow above still govern this site. Do not treat a remote document's existence as evidence a check was enforced. If the private standards repo cannot be read with available credentials, report the access limitation rather than claim it was consulted; do not import or expose private content.

For scoped agent work: inspect existing issues/PRs before starting, map acceptance criteria to actual verification evidence, report checks not run, and stop for human review before merge or deployment. Do not create another source of truth or automatically synchronize documents.

## Risk-based Linear and delivery governance

Classify the change **before** deciding whether to create a Linear issue. This is a tracking/coordination scale, distinct from the shared engineering baseline's security risk tiers A–C; apply both independently. Never lower security, privacy, accessibility, review or verification requirements merely because tracking is skipped.

| Delivery tier | Typical work | Linear decision |
| --- | --- | --- |
| **0 — Trivial/editorial** | Approved Keystatic copy, biography, metadata, typo, minor nonbehavioral styling or documentation correction | **Skip new issue.** Reference an existing issue only when useful. Follow editorial review and approved PR/publication gates. |
| **1 — Small isolated change** | One icon/component, small responsive or accessibility refinement without interface changes | **Optional.** Reuse/create only for meaningful regression risk, dependencies, several consumers, multi-session/PR follow-up, roadmap commitments or durable decisions. When unsure, skip new issue and state why. |
| **2 — Feature/meaningful enhancement** | New interaction, Academy lesson experience, CMS schema/collection, content migration, shared design subsystem or material information architecture | **Required.** Search and reuse existing issue/parent/project; otherwise create one focused issue with scope, AC, estimate, dependencies, canonical requirements and PR links. |
| **3 — High-risk/architectural** | Production CMS authentication, private case studies, APIs, migrations, security/privacy boundaries, CI/deployment permissions or cross-repo changes | **Required plus explicit technical, security/privacy, negative-path and rollback review.** Use an ADR for significant durable choices; respect human authorization gates. |

Before creating a ticket, inspect current main, relevant PRs and existing Linear issues/parents, the canonical Notion PRD and repo-specific decisions. Do not duplicate issues, projects, standards or PRs, or inflate work to justify a ticket. Reuse **KRU-75 and merged PR #155** for the Keystatic local Academy pilot; routine editorial edits to its established schema are Tier 0, while **hosted GitHub authentication/publication** is separate Tier 3 scope only after searching for existing coverage and receiving authorization. A merged pilot is not proof hosted publication is configured.

**Tracked delivery:** approved requirements → existing Linear issue (In Progress when implementation starts) → focused branch/PR → applicable CI, accessibility and security checks → human review → approved merge → separately verified deployment → Done only when the agreed AC are met. Link the PR, record material decisions, blockers, effort/dependencies and **AC-to-evidence** in the issue. Distinguish proposed, implemented, tested, merged, deployed and verified; never claim a check, publication or accessibility result that was not observed. Identify the next actionable issue.

**Untracked small change:** follow the established editor/Git workflow, proportional tests/review and deployment verification where applicable; no issue is required just for traceability. **Editorial publishing:** Keystatic save changes local content; it is not Git publication. Follow content review, PR/preview and branch-protected publishing where required. **Research:** keep exploratory questions in Notion/research docs; track only approved deliverables, time-bound dependencies or committed spikes.

**Authority:** Notion owns canonical product requirements/strategy; Linear owns committed work, estimates, blockers and state; GitHub owns code, approved versioned content and PR/test evidence; Keystatic authors structured public content; Vercel reports preview/production deployment. Link instead of copying entire PRDs or mutable plans. No automatic document synchronization. Use the repository's existing PR template and the applicable shared engineering Definition of Done; risk-based tracking never replaces required checks.

## UI and motion workbench reuse

Before UI, layout, component or animation work, read [the workbench reuse contract](docs/design/workbench-reuse.md), the linked inventory, and relevant workbench/catalog entries. Reuse or adapt suitable existing patterns before creating a parallel implementation. Record the source, destination, reuse decision, responsive/accessibility behavior and verification in the PR. Lab availability is not approval for public use; retain scoped adoption review, brand tokens and existing dependency restrictions. This requirement does not mandate motion or copying portfolio branding into other apps.


## Responsive app design and verification

For new UI journeys and material interface changes, consult the [proposed responsive app standard v1.0](https://github.com/heyfunwhoa/technical-docs-platform/blob/c7ae9a18b8045bdad5f729322722343022b13970/engineering/responsive-apps-v1.md) and its review status in [Technical Docs PR #26](https://github.com/heyfunwhoa/technical-docs-platform/pull/26). This is a pinned cross-repository reference; local brand, privacy and permissions remain authoritative. Define phone/tablet/desktop composition and the primary task before implementation. Test the built app, keyboard/focus, reduced motion and content/error states; record manual zoom/reflow and real-device checks separately. A passing viewport test does not prove WCAG conformance or review of every page. Do not add dependencies or rewrite tables/maps by default.

## Focused agent sessions

For scoped agent work, use the proposed [focused-session procedure](https://github.com/heyfunwhoa/technical-docs-platform/blob/c749cc5c859472e2d8bdb982f0d6f346a5ad4c25/ai/agent-harness/focused-sessions.md) ([review status: PR #38](https://github.com/heyfunwhoa/technical-docs-platform/pull/38)). Start from the issue and latest checkpoint, verify current revisions, inspect relevant changes, and expand discovery for concrete dependencies. Record evidence and next action at handoff; preserve required checks and local privacy/release rules. This is a pinned proposed reference, not automatic synchronization or token/spend enforcement.
