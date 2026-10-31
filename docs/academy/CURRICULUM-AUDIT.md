# Builder Academy curriculum audit and priorities

## Current audit: 2026-10-30

**Source snapshot:** current main `60a799285f746cc38f9806d4cefb4532fabd8026`, which includes the breadcrumb work through PR #230. The 38-lesson count was taken at `62d0037`; `lib/ai-academy.ts` did not change on main after that. This integration also includes PR #236's Frontend lesson, PR #237's API/MCP companion, and PR #233's nine paths and recovery lesson. Overlap and merge order: [INTEGRATION-233-236-237.md](INTEGRATION-233-236-237.md).
**Scope:** complete registered-lesson and route inventory, prerequisite/path structure, instructional fields, companion-document inventory and availability labeling. This is not a claim that every external citation, live route, exercise outcome or accessibility behavior was independently revalidated.
**Authorization:** user requested the lesson audit, organization and background-job recovery follow-up. This supersedes older holds only for this bounded slice. Broader labs, persistent progress and badges remain separate work.
**State:** combined on an integration branch for review. Not merged to main and not deployed.

### Findings and changes

| Finding at the snapshot | Action in this change | Remaining limit |
| --- | --- | --- |
| 38 registered short lessons, but older program/audit count says 22 | Reconcile inventory; add one recovery lesson, for 39 | Catalog registration does not equal a complete course |
| 12 existing lessons absent from all six paths | Nine goal-based paths cover all 39; retain stable IDs | Repeated IDs intentionally share content across paths |
| Evaluation path omitted commercial/security prerequisites; model evaluation omitted preparation | Include all declared prerequisites before dependents; enforce in tests | Prerequisites guide, never gate, navigation |
| Catalog array starts with a database lesson | Browse in first-appearance path order, beginning with AI basics | Builder paths remain direct independent entry points |
| Connected Systems labeled entirely planned despite working examples | Mark partial; name existing demos and separate future outlines | Background-job exercise is written, not a queue simulator |
| All catalog cards expose one check | Keep card interface; add two-plus reasoning prompts in the new companion | One card check does not meet the two-question instructional target by itself |
| Several “short lessons” estimate 25–45 minutes and include broad guides | Inventory duration as an estimate; recommend short stops and optional depth | No learner timing study or blanket duration rewrite |
| Current progress and assessment scopes differ | Preserve reviewed/practiced/passed distinctions | No new progress store, certification, account or grading service |

Previously unpathed lessons: `database-branching-recovery`, `fde-ai-agent-engineering`, `cms-fundamentals`, `llms-models-inference-gateways`, `better-auth-gtm-workspace`, `measure-product-use-safely`, `enterprise-contracts-sales-cycle`, `security-assessments-buyer-size`, `evolution`, `skills`, `security-hardening-release-gates`, `secure-account-import-research`.

### Recommended learner organization

- **Start with AI basics** (`foundations`): Explain AI, protect inputs, prompt clearly and check claims.
- **Build and release safely** (`delivery`): Read project files, plan a release, manage dependencies and measure safely.
- **Understand the frontend** (`frontend`): Connect accessible interfaces, reusable components, visual checks and content publishing.
- **Connect systems and recover failures** (`systems`): Trace requests, data, integration costs and bounded background-job recovery.
- **Protect identity and data** (`security`): Explain authorization, release gates and safe import, research and export boundaries.
- **Build toward skills and agents** (`agents`): Move from prompting to evaluated reusable skills and scoped agent systems.
- **Build a research workflow** (`research`): Turn public evidence into a research brief and a justified product request.
- **Verify an AI output** (`verification`): Check a claim, learn model-comparison prerequisites and document a justified decision.
- **Enterprise evaluation and buying process** (`enterprise-evaluation`): Build a fictional POC, mutual action plan, executive readout and buying-readiness packet.

AI basics is the default catalog entry. A learner building an interface can start with Frontend; a learner handling a deal can start with Enterprise evaluation. Shared privacy and verification lessons recur by stable ID, not cloned content.

UI/UX libraries, reusable blocks, design systems, iconography and illustration selection belong in **Understand the frontend**, followed by **Build and test your Design Lab**. Graphics used to teach requests, access and retries belong in **Connect systems and recover failures**. Prefer a labeled sequence, state table or diagram when it explains an outcome; decorative illustration is optional. Review each asset's license before adoption.

### Every registered lesson

Each row is an available short card with one knowledge check. “Companion” means longer reading or written practice; it does not imply automatically graded mastery. Times are author estimates. The new job lesson is available only after this branch is published.

| Stable lesson ID | Learning paths | Current format and estimate | Instructional follow-up |
| --- | --- | --- | --- |
| `background-job-recovery` | systems | 15 min; Card + companion; linked practice | New written exercise and answer key; a working queue simulator remains future scope. |
| `database-branching-recovery` | systems | 35 min; Card + companion | Split the 35-minute guide into data, recovery and selection stops; recheck changing provider claims. |
| `sales-frameworks` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-discovery` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-value` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-deployment` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-poc` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-map` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-procurement` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-security` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-negotiation` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-readout` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `evaluation-handoff` | enterprise-evaluation | 20 min; Card + companion | Use the shared fictional toolkit; review the learner's decision artifact, not reading completion. |
| `fde-ai-agent-engineering` | agents | 20 min; Card + companion | Keep vendor examples explicitly vendor-described; follow skills and evaluations. |
| `cms-fundamentals` | frontend | 35 min; Card + companion | Keep the six chapters optional; distinguish local editing from hosted publication. |
| `reading-code-and-yaml` | delivery, systems | 25 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `llms-models-inference-gateways` | foundations, agents, verification | 20 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `frontend-building-blocks` | frontend | 35 min; Card + companion; linked practice; guided panel | KRU-176 compared Fumadocs with the existing components and deferred Fumadocs. KRU-177 implemented the guided panel on this integration: objective, worked example, practice, two checks with feedback and reset, local notes, and next step. Still one catalog id. Learner validation remains KRU-178. See [FRONTEND-PILOT.md](FRONTEND-PILOT.md). |
| `evaluate-ai-models` | agents, verification | 18 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `storybook-visual-regression` | frontend | 18 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `integration-registry-finops` | systems, security | 16 min; Card + companion; linked practice | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `evidence-based-product-request` | research, verification | 20 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `idea-to-verified-release` | delivery, security | 45 min; Card + companion | Retain three core stops and optional depth; 45-minute estimate is not a measured duration. |
| `cursor-workflows` | delivery | 30 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `better-auth-gtm-workspace` | security | 25 min; Card + companion; linked practice | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `measure-product-use-safely` | delivery | 20 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `mcp-vs-rest-api` | systems, security | 25 min; Card + parent guide + progressive companion; linked practice | [api-mcp-progressive-lab.md](../builder-academy/api-mcp-progressive-lab.md) traces one fictional brief through a function, an HTTP handler, a function tool, and an MCP adapter. It does not add a lesson id. Its code blocks are labeled illustrative pseudocode. The card still needs a second independent reasoning check before full instructional-contract coverage. |
| `enterprise-contracts-sales-cycle` | enterprise-evaluation | 30 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `security-assessments-buyer-size` | enterprise-evaluation | 35 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `what-is-ai` | foundations, agents, research, verification | 8 min; Card | Add a second reasoning check and a supplied example before requiring an external assistant. |
| `evolution` | foundations | 10 min; Card | Use a concrete rule/model/agent comparison; validate transfer to a different task. |
| `prompting` | foundations, agents, research, verification | 12 min; Card; linked practice | Reuse Prompting Journey; distinguish filled fields from output quality. |
| `verification` | foundations, security, agents, research, verification | 10 min; Card; linked practice | Reuse Source Verification Journey; teach refuted versus unsupported. |
| `privacy` | foundations, delivery, systems, security, agents, research, verification, enterprise-evaluation | 10 min; Card | Add supplied data-classification fixtures and an answer rubric. |
| `gtm-research` | research | 15 min; Card; linked practice | Reuse Research Pipeline; distinguish evidence from buying-intent hypotheses. |
| `skills` | agents | 15 min; Card; linked practice | Reuse Skill Builder; check an independent failure case. |
| `package-registries` | delivery | 15 min; Card; linked practice | Use the lockfile guide; pin any version-specific examples before teaching. |
| `security-hardening-release-gates` | security | 25 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |
| `secure-account-import-research` | security | 25 min; Card + companion | Retain existing exercise and companion; add a second independent reasoning check before claiming full instructional-contract coverage. |

### Every Academy route

| Route / source | Observed implementation classification |
| --- | --- |
| [/ai-academy/dependencies/lockfiles](../../app/ai-academy/dependencies/lockfiles/page.tsx) | Reference guide |
| [/ai-academy/devops/build-rate-limits](../../app/ai-academy/devops/build-rate-limits/page.tsx) | Reference guide |
| [/ai-academy/git-lab](../../app/ai-academy/git-lab/page.tsx) | Legacy redirect to version-control |
| [/ai-academy/journeys/follow-one-click](../../app/ai-academy/journeys/follow-one-click/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy/journeys/prompting](../../app/ai-academy/journeys/prompting/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy/journeys/source-verification](../../app/ai-academy/journeys/source-verification/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy](../../app/ai-academy/page.tsx) | Catalog and path entry |
| [/ai-academy/playground](../../app/ai-academy/playground/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy/playground/research-pipeline](../../app/ai-academy/playground/research-pipeline/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy/playground/skill-builder](../../app/ai-academy/playground/skill-builder/page.tsx) | Existing practice surface; no new capability asserted |
| [/ai-academy/programming](../../app/ai-academy/programming/page.tsx) | Partial: 2 guided tutorials, 8 planned module records |
| [/ai-academy/systems](../../app/ai-academy/systems/page.tsx) | Partial: 2 interactive examples, infrastructure explainer, 13 planned module outlines and 7 future lab ideas |
| [/ai-academy/version-control](../../app/ai-academy/version-control/page.tsx) | Existing practice surface; no new capability asserted |
| [/builder-academy/credential-risk](../../app/builder-academy/credential-risk/page.tsx) | Existing practice surface; no new capability asserted |
| [/builder-academy/identity-journey](../../app/builder-academy/identity-journey/page.tsx) | Existing practice surface; no new capability asserted |

Programming has 10 module records, only two guided tutorials, and an 11-entry technology explorer. Systems has 13 planned outlines and seven proposed labs alongside the implemented examples. These records must not inflate the completed lesson count. The catalog also has five workflow recipes, not five additional courses.

### Companion and supporting document inventory

The existing 35 Builder Academy documents and 17 enterprise-evaluation documents were inventoried by source, heading and relationship. The recovery guide adds one Builder companion. The progressive API and MCP companion adds one document for the existing `mcp-vs-rest-api` lesson and does not increase the 39-lesson count. Plans, architecture and publishing documents are maintained as supporting references, not promoted to completed lessons. This inventory does not certify every paragraph or external link as current.

| Document | Catalog relationship / disposition |
| --- | --- |
| [From model choice to organized agent work](../builder-academy/agent-organization-learning-sequence.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy: AI agent harnesses, from prompts to verified execution](../builder-academy/ai-agent-harnesses.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy lesson — Authentication vs. Authorization](../builder-academy/authentication-vs-authorization.md) | `better-auth-gtm-workspace` |
| [Builder Academy — Build a private GTM workspace with Better Auth](../builder-academy/better-auth-gtm-workspace.md) | `better-auth-gtm-workspace`, `security-hardening-release-gates`, `secure-account-import-research` |
| [CMS fundamentals](../builder-academy/cms-fundamentals.md) | `cms-fundamentals` |
| [Builder Academy — cross-project evidence integration plan](../builder-academy/cross-project-evidence-integration.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy — Cursor: from first prompt to verified pull request](../builder-academy/cursor-agent-workflows.md) | `cursor-workflows` |
| [Databases, branching, backups, and choosing your data platform](../builder-academy/databases-branching-recovery-and-selection.md) | `database-branching-recovery` |
| [Developer tools and AppSec: follow one change](../builder-academy/developer-tooling-appsec-workflow.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Lesson: Editorial ProjectCard](../builder-academy/editorial-project-card.md) | `frontend-building-blocks` |
| [Builder Academy — Enterprise sales contracts: NDA/MNDA, ToS, DPA, MSA and security review](../builder-academy/enterprise-contracts-sales-cycle.md) | `evaluation-procurement`, `enterprise-contracts-sales-cycle`, `security-assessments-buyer-size` |
| [Evaluate AI models before adopting them](../builder-academy/evaluate-ai-models.md) | `evaluate-ai-models` |
| [Builder Academy — Evidence-backed commercial and security decisions](../builder-academy/evidence-backed-sales-and-security-decisions.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Evidence-based product requests — Builder Academy](../builder-academy/evidence-based-product-requests.md) | `evidence-based-product-request` |
| [How AI agents become engineers — Builder Academy companion](../builder-academy/fde-ai-agent-engineering.md) | `fde-ai-agent-engineering` |
| [Builder Academy: Integration registries and FinOps guardrails](../builder-academy/finops-and-integration-registry.md) | `integration-registry-finops` |
| [Builder Academy — First deployment: settings and integrations](../builder-academy/first-deployment-settings.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Prompting with a clear outcome: bad, okay and best examples](../builder-academy/focused-prompting-and-context.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy — Frontend building blocks: from framework to experience](../builder-academy/frontend-building-blocks.md) | `cms-fundamentals`, `frontend-building-blocks`, `storybook-visual-regression` |
| [Builder Academy — From idea to verified release](../builder-academy/idea-to-verified-release.md) | `idea-to-verified-release`, `cursor-workflows`, `measure-product-use-safely`, `security-hardening-release-gates` |
| [Identity across channels — Builder Academy](../builder-academy/identity-across-channels.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy — Identity & Access Management track](../builder-academy/identity-and-access-management.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy lab — identity lifecycle simulator](../builder-academy/identity-lifecycle-lab.md) | Supplemental reference / plan; not an additional catalog lesson |
| [LLMs, models, inference, and AI gateways](../builder-academy/llms-models-inference-gateways.md) | `llms-models-inference-gateways`, `evaluate-ai-models` |
| [Builder Academy — API, REST API, webhook and MCP: what is different?](../builder-academy/mcp-vs-rest-api.md) | `background-job-recovery`, `integration-registry-finops`, `better-auth-gtm-workspace`, `mcp-vs-rest-api` |
| [One account brief, four interfaces](../builder-academy/api-mcp-progressive-lab.md) | `mcp-vs-rest-api` only; not a second catalog id |
| [Builder Academy — Measure product use safely](../builder-academy/measure-product-usage-safely.md) | `measure-product-use-safely` |
| [Why pre-commit alone cannot stop every secret](../builder-academy/pre-commit-secrets-defense-in-depth.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Reading code, files, JSON and YAML](../builder-academy/reading-code-and-yaml.md) | `database-branching-recovery`, `reading-code-and-yaml` |
| [Builder Academy — Review release evidence and security boundaries](../builder-academy/release-security-review.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Why secrets, non-human identities, and IAM belong together](../builder-academy/secrets-non-human-identity.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy — Secure a CSV → research → export workflow](../builder-academy/secure-account-import-research.md) | `secure-account-import-research` |
| [Builder Academy — Security assessments in B2B sales: startup to enterprise](../builder-academy/security-assessments-by-buyer-size.md) | `security-assessments-buyer-size` |
| [Builder Academy learning plan — reusable intelligence foundation](../builder-academy/security-gtm-intelligence-plan.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Builder Academy — Security hardening: from standard to verified release](../builder-academy/security-hardening-release-gates.md) | `security-hardening-release-gates` |
| [Builder Academy: Storybook and visual regression testing](../builder-academy/storybook-visual-regression.md) | `storybook-visual-regression` |
| [From technical evaluation to buying decision](../enterprise-evaluation/README.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Deployment decision and reference architecture](../enterprise-evaluation/architecture.md) | Supplemental reference / plan; not an additional catalog lesson |
| [From technical evaluation to buying decision](../enterprise-evaluation/case-study.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Choose deployment and prepare the architecture](../enterprise-evaluation/evaluation-deployment.md) | `evaluation-deployment`, `evaluation-poc`, `evaluation-security` |
| [Qualify the problem and map the decision](../enterprise-evaluation/evaluation-discovery.md) | `evaluation-discovery`, `evaluation-value`, `evaluation-deployment` |
| [Transition to production or close out responsibly](../enterprise-evaluation/evaluation-handoff.md) | `evaluation-handoff` |
| [Coordinate a mutual action plan](../enterprise-evaluation/evaluation-map.md) | `evaluation-map`, `evaluation-procurement`, `evaluation-security` |
| [Prepare a commercial proposal and negotiate responsibly](../enterprise-evaluation/evaluation-negotiation.md) | `evaluation-negotiation`, `evaluation-handoff` |
| [Design and run a decision-ready POC](../enterprise-evaluation/evaluation-poc.md) | `evaluation-poc`, `evaluation-map`, `evaluation-readout` |
| [Navigate procurement, MNDA and commercial terms](../enterprise-evaluation/evaluation-procurement.md) | `evaluation-procurement`, `evaluation-negotiation`, `evaluation-readout` |
| [Deliver the executive readout and inspect buying readiness](../enterprise-evaluation/evaluation-readout.md) | `evaluation-readout`, `evaluation-handoff` |
| [Coordinate security and privacy reviews](../enterprise-evaluation/evaluation-security.md) | `evaluation-security`, `evaluation-readout` |
| [Build a value hypothesis and executive brief](../enterprise-evaluation/evaluation-value.md) | `evaluation-value`, `evaluation-poc`, `evaluation-negotiation` |
| [Implementation and review handoff](../enterprise-evaluation/implementation.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Maintain and publish the playbooks](../enterprise-evaluation/publishing-workflow.md) | Supplemental reference / plan; not an additional catalog lesson |
| [Choose a sales framework for the job](../enterprise-evaluation/sales-frameworks.md) | `sales-frameworks`, `evaluation-discovery` |
| [Evaluation toolkit: Alderworks and Sentinel Orchard](../enterprise-evaluation/toolkit.md) | `sales-frameworks`, `evaluation-discovery`, `evaluation-value`, `evaluation-deployment`, `evaluation-poc`, `evaluation-map`, `evaluation-procurement`, `evaluation-security`, `evaluation-negotiation`, `evaluation-readout`, `evaluation-handoff` |
| [Background-job recovery](../builder-academy/background-job-recovery.md) | `background-job-recovery`; new written practice |

The three CMS records (`reading-code-and-yaml`, `mcp-vs-rest-api`, `verification`) are editorial sources for existing lessons, not additional lessons. Preserve their schema and IDs. Keep code-owned checks and guidance separate.

### Priorities after organization

1. Review this path organization and recovery lesson using the existing CI and a real browser; validate phone/tablet/desktop, keyboard, zoom and long path labels.
2. Complete the beginner bridge: terminal/repository reading, HTTP status/body diagnosis and structured-data runtime validation. Reuse existing Follow one click and code-reading material.
3. Deepen existing lessons with a second reasoning check, worked example, counterexample and independent transfer task. Use [LEARNING-DEPTH.md](LEARNING-DEPTH.md) as the rubric; do not equate one quiz with mastery.
4. Improve discoverability of Prompting, Source Verification, Research Pipeline and Skill Builder through current guidance before creating more labs. Audit URL-based lesson linking separately; current selection is component state.
5. Test with intended business/sales beginners; record actual task outcomes and timing. KRU-77 retains the broader journey/progress work. A complete source inventory is not learning-effectiveness evidence.
6. Refresh time-sensitive provider, pricing, security and version references in the longer guides before using them operationally. This audit only freshly checked the two primary sources for the new background-job lesson.

### Verification and boundaries

Data-level review confirms all 39 IDs are covered and all included prerequisites precede dependents. Repository unit and browser tests enforce this contract and the updated Systems label. See the focused PR for actual CI results; this document does not predeclare a pass. Local execution and manual browser review were unavailable in the current session.

No routes, lesson IDs, CMS records, credentials, dependencies, persistence or live integrations are added. Revert the focused commit to restore previous organization. No private source content is copied into this public audit.

## Historical audit, retained for decision history

The following 2026-10-12 inventory and status statements describe their dated snapshots. The current section above supersedes conflicting counts, availability and sequencing; historical authorization language is not the current queue.

# Builder Academy curriculum audit and priorities

**Reviewed:** 2026-10-12 (America/Chicago)
**Original source snapshot:** `569c1f5` on `main`; reconciled after merged PR #126 (breadcrumbs) and PR #127 (FinOps walkthrough), through `a9cb44e758cb772ecabd740bbbb5c208b24c3fb2`
**Owner:** Kristen Aing
**Status:** Priority order retained. The user authorized the existing-content navigation and metadata foundation (Batch B slice), including its merge before mission work. New lesson authoring and new labs remain on hold. See [mission handoff](MISSION-HANDOFF.md).

## Focused re-audit: AI Foundations versus Builder Academy

**2026-10-12 follow-up:** The user authorized one beginner code/file/YAML lesson and this comparison. This supersedes the authoring hold only for that slice. The prior full inventory remains a historical baseline; this follow-up inspected the current catalog, guidance, paths, programming registry, program and open PR #131. It is not a fresh exhaustive route or browser audit.

The shared catalog has 22 lessons before this change and 23 with `reading-code-and-yaml`. Keep one Academy and two clearly described entry paths; `/ai-academy` is the shared implementation, not proof of a separate competing AI product. Keep legacy `/builder-academy/*` lab links intact.

| Area | Current evidence | Decision / next action |
| --- | --- | --- |
| AI Foundations | AI basics, privacy, prompting, verification and their journeys already exist | Keep AI basics as this path's entry; deepen tokens/context/retrieval through existing lessons, not a duplicate Academy |
| Builder foundations | Programming registry has 10 module records; current resource metadata reports only two guided tutorials | Add this no-prerequisite file-reading bridge; complete existing language modules before adding another language explorer |
| Shared content | Privacy, verification, skills, model evaluation and applied research span paths | Reuse stable lesson IDs and cross-links; avoid cloned content and duplicate progress |
| Naming | UI paths and source folders mix AI and Builder names; PROGRAM already specifies one platform | Describe the umbrella as Builder Academy with AI Foundations and Software Building entry paths; a route rename is unnecessary and not implemented here |
| BA-03: files/repository | New guide covers file recognition and small code traces | Partly addressed; terminal output, import tracing and repository navigation remain follow-up |
| BA-05: structured data | New guide covers JSON/YAML, types, nesting, parser versus schema | Partly addressed; runtime validation and schema repair are not implemented |
| BA-02: app journey | Open PR #131 implements Follow one click on the merged foundation | Review and integrate that PR separately; do not recreate its mission or progress storage |
| Learning evidence | Cards, guides and simulations offer different depth | Preserve Reviewed, Practiced and Passed checks as distinct; a guide answer key is self-review, not automatic grading |

**Recommended sequence after this slice:** review the existing mission PR; deepen repository/terminal reading; teach HTTP request/response; add one debugging exercise; complete structured-data runtime validation. AI mental models can progress independently. Reuse the existing FinOps walkthrough, Git simulation and privacy lessons along the way. Keep broader systems and new paid/live labs planned.

**Acceptance for this slice:** one sourced guide with glossary, worked examples and answer key; one registered lesson and matching guidance; delivery path entry; no required AI prerequisite, new route, dependency or progress mechanism. Registration is not production deployment verification.

## Decision and scope

Complete and connect the existing material before expanding the catalog. The biggest missing bridge is understanding and diagnosing a working application: repository → browser/server → structured data → HTTP → persisted records → verified outcome.

This is the current curriculum prioritization record. [PROGRAM.md](PROGRAM.md) owns the wider product vision; [LEARNING-DEPTH.md](LEARNING-DEPTH.md) owns the instructional specification. This audit supersedes their older delivery ordering where it conflicts, not their safety or quality requirements. It is not another task tracker. When implementation is authorized, link the selected slice to the existing Linear workflow; do not create a ticket for every row now.

Audit includes all 22 registered lesson cards, all 10 programming module records, all 14 Academy page files (including home/overview/redirect), current lab components and scenario definitions, all 23 Builder Academy companion/plan documents, the package reference and Academy planning documents. Coverage judgments are based on source content and wiring, not measured learner outcomes. Source inspection is not browser, accessibility, deployment or external-source accuracy verification. Existing test filenames were noted as supporting inventory; their presence is not proof of working labs, and tests were not rerun.

No paid providers, model calls, customer records, private research exports, new dependencies, product runtime changes or cross-repository edits are included. Public/synthetic exercises only. Shared engineering baseline and agent execution contract were consulted as proposed maintainer guidance; no private policy text is copied here.

## Inventory and status definitions

| Surface | Observed inventory | Interpretation |
| --- | --- | --- |
| Main catalog | 22 records in `lib/ai-academy.ts` | Registered short lessons, not 22 full courses |
| Programming | 10 module records; 2 guided tutorials; 8 planned | Technology explorer examples do not complete the planned lessons |
| Page files | 14 across `app/ai-academy` and `app/builder-academy` | Includes catalog home, overviews and a legacy Git redirect; do not add this count to lesson count |
| Systems pathway | 13 topic outlines and 7 proposed lab cards | Overview exists; named systems labs are not thereby implemented |
| Companion documents | 23 in `docs/builder-academy` | Mix of guides, practice material and integration plans; not all independent courses |
| Curated paths | 5: foundations (AI), delivery, frontend, research, verification | Foundation navigation adds independent entry points; no complete beginner app-understanding sequence yet |

**Registered:** short lesson rendered by the catalog. **Guided:** explanation and learner practice/feedback exist in source. **Simulation:** deterministic exercise, not a live integration. **Reference:** longer reading/practice guide. **Planned:** outline/specification only. **Deployment verified:** a separate state not established by this audit.

Priority definitions: **P0** reconcile and make learning status honest; **P1** prerequisites and immediate comprehension; **P2** reliable building and verification; **P3** applied specialization and deeper operations; **Parked** no near-term work. Within each priority, follow the dependency order below. These are curriculum priorities, not security incident severity ratings or deadline commitments.

## Every registered lesson: disposition

All rows below are registered in [the catalog](../../lib/ai-academy.ts); references, embedded labs and short cards are complementary delivery forms, not duplicate course counts.

| Lesson / stable slug | Decision | Priority | Missing piece or boundary |
| --- | --- | --- | --- |
| Frontend building blocks: from framework to experience (`frontend-building-blocks`) | Retain + deepen | P2 | Strong layer overview and card example; add a props/state/forms exercise with loading, empty and error states. Avoid another framework survey. |
| Evaluate AI models with evidence (`evaluate-ai-models`) | Deepen existing lab | P3 | Already has a scorecard, case categories and scoring dimensions. Supply fixed fictional inputs and expected answers; do not recreate the evaluation rubric or add model routing. |
| Build and test your Design Lab (`storybook-visual-regression`) | Retain + connect | P2 | Use after frontend and testing basics; add an independent interaction-versus-screenshot decision, not a second Design Lab. |
| Control integrations and cloud spend (`integration-registry-finops`) | Deepen existing lab | P1 | PR #127 now supplies five-account arithmetic, billing units, cache/retry scenarios, reservation/reconciliation examples and answer keys. Reuse this completed companion; no duplicate worksheet or budget registry. |
| Write an evidence-based product request (`evidence-based-product-request`) | Retain + connect | P2 | Embedded lab exists. Link its problem/outcome to acceptance criteria and post-release measurement; preserve exposure versus attributable value distinction. |
| From idea to verified release (`idea-to-verified-release`) | Retain + sequence | P1 | Delivery simulator and Portfolio OS case already exist. Use as the delivery spine; avoid a duplicate PR/Linear course. |
| Cursor modes, rules, and safe handoffs (`cursor-workflows`) | Retain + connect | P1 | Long guide already exists but lacks a companion field on its card. Add prerequisite and visible next-step wiring later; reconcile current vendor behavior before editing instructional claims. |
| Build a private GTM workspace with Better Auth (`better-auth-gtm-workspace`) | Resequence | P2 | Two-user denied-access exercise is already present. Teach generic identity/session/authorization first, then the vendor-specific application; do not propose that exercise as new. |
| Measure product use without collecting private activity (`measure-product-use-safely`) | Retain + connect | P3 | Already defines events, denominator, privacy and duplicate-event checks. Add a completed fictional interpretation example rather than an analytics installation project. |
| MCP versus REST APIs: how integrations work (`mcp-vs-rest-api`) | Resequence + extend | P1 | Already covers REST/MCP/SDK/webhooks and 401/403/429 scenarios. Add a simpler HTTP prerequisite; expand retry/webhook practice later without duplicating the comparison. |
| NDA vs MNDA, DPA, MSA: enterprise deal reviews (`enterprise-contracts-sales-cycle`) | Retain as specialization | P3 | Substantial companion guide exists. Keep on a GTM path with decision-owner practice; not a mandatory coding prerequisite. Recheck legal references when revised. |
| Security assessments from startups to enterprises (`security-assessments-buyer-size`) | Retain as specialization | P3 | Guide and embedded decision lab already exist. Preserve risk-based scope and per-decision evidence; do not add another generic security questionnaire lesson. |
| AI, models and assistants (`what-is-ai`) | Deepen foundation | P1 | Add a short tokens/context/training/inference/retrieval mental model and a non-coding example; detailed AI engineering remains later. |
| From rules to AI agents (`evolution`) | Retain as optional overview | P3 | Keep history optional; emphasize choosing rules, workflow or agent. Do not block practical learning on AI history. |
| Write prompts that work (`prompting`) | Connect existing journey | P1 | Prompt Journey and Prompt Studio already exist; sequence them and distinguish prompt completeness from observed output quality. |
| Grounding and source quality (`verification`) | Connect existing journey | P1 | Source Journey already has worked cases and feedback; link it and later extend to downstream correction rather than rebuilding source verification. |
| Privacy, security and human oversight (`privacy`) | Retain + deepen practice | P1 | Add a bounded classify/redact/approve scenario using fictional data. Introduce safe input handling before any suggested model exercise. |
| GTM: account intelligence workflow (`gtm-research`) | Deepen existing workflow | P3 | Connect raw evidence, account identity, offer relevance, hypothesis, discovery question and reviewer decision in one fictional example. Notion cannot be the only required public reference. |
| From prompts to reusable skills (`skills`) | Connect + validate | P2 | Build a Skill already exists. Later verify exported YAML with punctuation/multiline cases; nonempty fields and a valid name do not prove a portable or effective skill. |
| Package registries, npm and lockfiles (`package-registries`) | Consolidate progression | P1 | Keep overview → deeper package guide → lockfile repair as one sequence. Label sample versions/branch names as examples and review before reuse. |
| Security hardening: standards to release gates (`security-hardening-release-gates`) | Retain + connect | P2 | Threat and denied-path practice exists. Link after app/data/auth basics and into testing; no separate generic security survey needed. |
| Secure CSV, AI research, and account export (`secure-account-import-research`) | Retain + connect | P2 | Already separates raw/normalized/sourced/approved data. Build on JSON/database prerequisites, with deterministic row dispositions and a worked answer key. |

## Programming Foundations: all ten modules

Evidence: [curriculum](../../lib/academy/programming.ts), [guided lessons](../../lib/academy/guided-lessons.ts), [renderer](../../components/ai-academy/programming-foundations.tsx).

| Module | Current depth | Decision / priority | Completion evidence to add later |
| --- | --- | --- | --- |
| How Code Works | Guided tutorial | Retain, P1 | Identify source, runtime and output in an unfamiliar small example |
| Programming Concepts | Guided tutorial | Retain, P1 | Trace a different function/collection without copying the worked answer |
| JavaScript Essentials | Planned; technology profile exists | Complete, P1 | Read objects/events and explain a pending versus resolved asynchronous result |
| TypeScript Essentials | Planned; profile exists | Complete, P2 | Fix a type mismatch and explain why external JSON still needs runtime validation |
| HTML & CSS | Planned; profile plus frontend guide exist | Complete by reuse, P1 | Identify semantics, label, responsive layout and keyboard focus in a small form |
| Python Essentials | Planned; profile exists | Park until a concrete scripting task | One synthetic file-processing exercise; not required for the Next.js path |
| SQL Essentials | Planned; profile exists | Complete, P2 | Read a filtered/joined result and distinguish missing, duplicate and related records |
| Language Explorer | Planned; existing explorer covers several technologies | Park expansion | Do not add Go/Rust/Java/C# merely for breadth |
| Frameworks & Runtimes | Planned; profiles and frontend guide overlap | Complete by reuse, P1 | Label language/library/framework/runtime/platform in one app diagram |
| Choose the Right Tools | Planned | Complete later, P3 | Explain one build/buy/reuse choice using requirements, maintenance and cost |

## All Academy routes and embedded exercises

Route names below are observed source paths, not newly proposed URLs. Preserve existing links.

| Route / surface | Current coverage | Audit action |
| --- | --- | --- |
| `/ai-academy` | 22 cards, five workflow prompts, three paths | P0: plan honest depth/status and prerequisite metadata; P1: coherent starting point |
| `/ai-academy/programming` | Two guided tutorials, ten-module outline, technology explorer | Complete selected foundations, not all languages |
| `/ai-academy/version-control` | Branch/rebase/merge/squash explanations and failure scenarios | Retain; later add small conflict-reading/recovery practice within this course |
| `/ai-academy/git-lab` | Redirect to version-control | Preserve; never count as another lesson |
| `/ai-academy/devops/build-rate-limits` | CI versus deployment, queue/rate-limit diagnosis, recovery | Retain as troubleshooting case after general debugging; quotas are not fixed curriculum facts |
| `/ai-academy/dependencies/lockfiles` | Worked mismatch and repair exercise | Retain as package-management practice; illustrative versions are not upgrade recommendations |
| `/ai-academy/systems` | Thirteen topic outlines, seven planned lab concepts | P0: retain explicit planned status and stage topics using mapping below |
| `/ai-academy/journeys/prompting` | Guided prompt composition and heuristic feedback | Link from prompting; completeness checks are not measured model quality |
| `/ai-academy/journeys/source-verification` | Source cases, decisions, feedback and transfer | Retain; reuse Source Detective fixtures |
| `/ai-academy/playground` | Source Detective, Prompt Studio, Model & Tool Selector | Connect from prerequisites; no duplicate standalone versions |
| `/ai-academy/playground/skill-builder` | Draft fields, basic checks, Markdown preview | P2: validate YAML serialization and show normal/failure evaluation examples |
| `/ai-academy/playground/research-pipeline` | Original, duplicate, changed, contradiction and injection scenarios | P3: add downstream correction/revocation decisions; basic version/conflict coverage already exists |
| `/builder-academy/identity-journey` | Human, service, pipeline and agent identities; access simulation | Reuse as generic identity prerequisite to the Better Auth case |
| `/builder-academy/credential-risk` | Detection → identification → verification → impact → investigation → remediation | Retain specialization; review whether the `contained` label after revocation can overstate recovery; source code still lists follow-up checks |
| Embedded Product Request Lab | Fictional request fields and feedback | Link to discovery and outcome measurement |
| Embedded Delivery Lifecycle Lab | Intake, discovery, readiness, implementation, checks, outcome | Existing capstone spine; deepen independent decisions rather than rebuild |
| Embedded Portfolio OS case study | Source document versus registered card versus deployment evidence | Already exists; do not list KRU-22 content as wholly missing based on old planning notes |
| Embedded Security Review Lab | Fictional buyer review choices with decision-specific evidence | Retain; keep compliance/vendor conclusions separate from classroom choices |

## Companion documents: complete map

These are the 23 current files under `docs/builder-academy`. Titles are shortened for scanning. “Connect” means future navigation/prerequisite work, not a new source copy.

| File | Kind | Disposition |
| --- | --- | --- |
| [Authentication vs authorization](../builder-academy/authentication-vs-authorization.md) | Foundation guide | P1 prerequisite; connect to identity lab and Better Auth |
| [Better Auth workspace](../builder-academy/better-auth-gtm-workspace.md) | Applied guide + two-user practice | P2, retain existing negative-access exercise |
| [Cross-project evidence integration](../builder-academy/cross-project-evidence-integration.md) | Integration plan | P3 reference only; not an implemented cross-repo feed |
| [Cursor workflows](../builder-academy/cursor-agent-workflows.md) | Companion guide | P1 connect visibly; refresh tool-specific references when authoring |
| [Editorial project card](../builder-academy/editorial-project-card.md) | Worked frontend guide | P2 reuse for props/state/responsive practice |
| [Enterprise contracts](../builder-academy/enterprise-contracts-sales-cycle.md) | GTM guide + cases | P3 specialization; sources need separate legal accuracy review when changed |
| [Model evaluation](../builder-academy/evaluate-ai-models.md) | Rubric + lab specification | P3 supply fixed fixture packet; rubric already exists |
| [Evidence-backed decisions](../builder-academy/evidence-backed-sales-and-security-decisions.md) | Shared teaching reference | Retain across security/GTM lessons; no second facts database |
| [Evidence-based product requests](../builder-academy/evidence-based-product-requests.md) | Companion guide | P2 connect to existing request lab |
| [FinOps and registry](../builder-academy/finops-and-integration-registry.md) | Guide + guardrail exercise | PR #127 companion expansion merged; connect and verify learner use later |
| [Frontend building blocks](../builder-academy/frontend-building-blocks.md) | Foundation + card exercise | P1 reuse; P2 state/form extension |
| [Idea to verified release](../builder-academy/idea-to-verified-release.md) | Delivery + security practice | P1 spine; keep deeper security section optional until prerequisites |
| [Identity across channels](../builder-academy/identity-across-channels.md) | Conceptual guide | Connect within identity sequence, not another introductory course |
| [Identity and access management](../builder-academy/identity-and-access-management.md) | IAM foundation/reference | Generic concepts first; OIDC/SAML/SCIM comparison optional depth |
| [Identity lifecycle lab](../builder-academy/identity-lifecycle-lab.md) | Written lab | Pair with existing interactive identity journey |
| [Measure product usage safely](../builder-academy/measure-product-usage-safely.md) | Guide + event exercise | P3 interpretation practice, not SDK installation |
| [MCP vs REST](../builder-academy/mcp-vs-rest-api.md) | Integration guide + mock failures | P1 HTTP prerequisite first; preserve existing comparison |
| [Secure account import](../builder-academy/secure-account-import-research.md) | Security/data guide + negative cases | P2 after structured data and database basics |
| [Security assessments](../builder-academy/security-assessments-by-buyer-size.md) | GTM/security guide | P3 retain with existing interactive review lab |
| [Security GTM intelligence plan](../builder-academy/security-gtm-intelligence-plan.md) | Proposed applied learning integration | Reconcile KRU-61 before extending the capstone; no inferred issue status |
| [Security release gates](../builder-academy/security-hardening-release-gates.md) | Guide + threat/permission practice | P2 after app boundaries and testing basics |
| [Secrets and non-human identity](../builder-academy/secrets-non-human-identity.md) | Security guide | Retain; pair with credential-risk explorer |
| [Storybook and visual regression](../builder-academy/storybook-visual-regression.md) | Frontend testing guide | P2 follow testing fundamentals |

Additional Academy material: [package registry reference](../learning/package-registries.md) is the deeper companion to the package card; [open-source licenses](OPEN-SOURCE-LICENSES.md) is a planned educational reference, not an interactive module. [Web research infrastructure](WEB-RESEARCH-INFRASTRUCTURE.md) is a research architecture/reference foundation, not a provider benchmark. PROGRAM, LEARNING-DEPTH, PLAYGROUND-LABS, IMPLEMENTATION-PLAYGROUND, SOURCE-JOURNEY and SYSTEMS-ENGINEERING-ROADMAP are planning/specification records; their historical PR/status language must not override inspected implementation.

## Missing or incomplete lessons: ordered backlog

A “new bridge” fills a learner prerequisite absent as a full guided lesson; it does not imply none of its vocabulary appears elsewhere. Complexity is relative authoring/verification scope, not a delivery estimate.

| Order / ID | Priority | Work | Existing material to reuse | Prerequisites | Learner proof | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| 1 / BA-01 | P0 | Reconcile catalog, guides, labs, review dates and status | This inventory, PROGRAM, lesson-depth contract | None | Learner can tell what can be read/practiced now versus planned | Small metadata/navigation design; implementation held |
| 2 / BA-02 | P1 | Follow one click through an app | Frontend + systems overview + MCP account example | No coding required | Label browser, server, provider, database, permission check and returned result | New bridge; conceptual, small |
| 3 / BA-03 | P1 | Read a repo, files and terminal output | How Code Works + package/lockfile + Git | BA-02 | Find route, imported component, data source, command and first error without editing production | New bridge; small |
| 4 / BA-04 | P1 | Complete relevant programming foundations | Existing JS, HTML/CSS, frameworks outlines | Programming Concepts; BA-03 for code navigation | Trace a value/event and label framework/runtime layers | Complete existing; medium |
| 5 / BA-05 | P1 | JSON, YAML and runtime validation | Programming objects + skill export + CSV guide | Programming Concepts | Repair a fictional record; explain missing/null/invalid values and config vs data | New bridge; small |
| 6 / BA-06 | P1 | HTTP/API request and response basics | MCP guide + web research outline | BA-02, BA-05; JS async needed only for code variant | Read method, URL, headers/body and response; choose investigate/fix/retry/stop from mock outcomes | New bridge; medium |
| 7 / BA-07 | P1 | Debug one failed user task | Git/CI scenarios + rate-limit lesson | BA-03, BA-06 | Identify failed layer using sanitized console, Network and server-log fixtures; distinguish symptom from cause | New bridge; medium |
| 8 / BA-08 | P1 | Basic AI mental model + safe practice | AI/models, privacy, prompt and source journeys | None; parallel entry for AI-only learners | Explain model vs app, context vs retrieval, safe input and unsupported output | Extend existing foundations; small |
| 9 / BA-09 | P1 | Five-account budget worksheet | FinOps companion expanded in merged PR #127 | BA-06; arithmetic only | Compute a fictional upper bound and identify exclusions, uncertain retries and stop decisions | Written walkthrough/answer keys complete; future learner validation and path wiring only |
| 10 / BA-10 | P2 | SQL + data modeling and validation | SQL outline, raw/normalized/sourced/approved guide | BA-05, Programming Concepts | Relate accounts, sources and claims; reject duplicate/orphan records and preserve unknowns | Complete/extend existing; medium |
| 11 / BA-11 | P2 | UI state, accessible forms and navigation | Frontend, editorial card, Design Lab | HTML/CSS, JS; TypeScript as needed | Handle loading/empty/error/success; keyboard and mobile task checks | Extend existing; medium |
| 12 / BA-12 | P2 | What tests prove + local/preview/production | Delivery, Git, security gates, Storybook | BA-07; app/data/auth concepts as relevant | Choose checks for one feature; distinguish simulated, integration and deployed evidence; explain environment isolation | Extend + bridge; medium |
| 13 / BA-13 | P2 | Reliable jobs, webhooks and retries | MCP failures, distributed outline, FinOps | BA-06, BA-09, BA-10 | Simulate duplicate/late event, retry exhaustion and budget stop; no duplicate state change | Complete planned systems slice; medium |
| 14 / BA-14 | P2 | Skill draft validity and evaluations | Existing skill builder and skills card | BA-05, prompting/verification | Produce parseable example frontmatter and normal/failure checks; explain host compatibility limits | Deepen existing; small |
| 15 / BA-15 | P3 | Freshness, corrections and cross-project impact | Research simulator, evidence guides, KRU-61 plan | BA-10, BA-13, source verification | Change/revoke a fixture source, identify dependent outputs and choose review/withdraw/refresh | Extend existing; medium |
| 16 / BA-16 | P3 | Retrieval and measured model quality | AI outline + existing eval rubric | BA-08, BA-05, verification | Distinguish retrieval from evidence support; score fixed fictional outputs including abstention | Deepen existing; medium |
| 17 / BA-17 | P3 | Operating and recovering an app | Reliability/DevOps outlines | BA-12, BA-13 | Use synthetic logs to choose alert, pause, rollback or restore; explain why code rollback may not restore data | Complete planned slice; medium |
| 18 / BA-18 | P3 | Product judgment and applied GTM capstone | Product request, analytics, GTM/security guides, delivery lab | Relevant P1/P2 skills, not every specialization | Define success, review a sourced hypothesis and explain useful next action plus uncertainty | Integrate existing; medium |

BA IDs identify rows in this document, not created Linear or GitHub issues. P1 order is for curriculum authoring, not a mandatory sequence for every learner. BA-08 is an independent AI entry path. Generic identity and privacy lessons are reused throughout; no live research should be introduced before access, spending and publication boundaries are understood.

BA-06 scope: request/response anatomy; 200/201/202/204, common redirects, 400/401/403/404/409/422/429 and 500/502/503/504 as reference groups, not a memorization exam. Teach that transport success does not prove business correctness, and an accepted job is not completed work. Deeper retry safety belongs in BA-13. Use the [MDN HTTP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/) as an authoring source to verify at lesson-writing time, not a claim that all linked documentation was rechecked during this inventory audit.

BA-09 uses explicitly fictional unit prices or unknowns, never unverified current vendor prices. BA-13 must distinguish deduplicating state changes from preventing all repeated provider charges. BA-15 teaches cache freshness and invalidation using evidence examples; FinOps teaches cost bounds. Link them rather than create overlapping cache courses.

## Map the thirteen systems outlines to this order

| Existing outline | Where it belongs | Defer |
| --- | --- | --- |
| Web research infrastructure | BA-02, BA-06, BA-15 | Live crawler/provider benchmark |
| Systems architecture | BA-02, BA-18 | Microservices, scaling architecture without need |
| Data engineering | BA-05, BA-10, BA-15 | Full ETL platform |
| API engineering | BA-06 then existing MCP and BA-13 | GraphQL depth until a concrete use case |
| Distributed systems | BA-13 | General distributed-systems course |
| Software security | Existing privacy/identity/release/import lessons | A second broad security survey |
| Knowledge engineering | BA-10, BA-15 | Full ontology/knowledge-graph platform |
| Reliability | BA-07, BA-17 | Live monitoring dashboard |
| AI engineering | BA-08, BA-16 | Vector database, reranking and autonomous routing implementation |
| Infrastructure/DevOps | BA-12, BA-17 | Docker/IaC training without a project requirement |
| Engineering economics | Existing FinOps + BA-09/13/18 | Paid benchmarking platform |
| Governance | Existing delivery/Cursor + BA-01/15 | New standards repository or duplicated policies |
| Product engineering | Existing request lab + BA-11/18 | Feature-flag/experiment infrastructure before a measured need |

The seven proposed systems labs remain parked as independent builds. Reuse existing deterministic research, security, identity and delivery components when a selected lesson needs practice; do not build all seven lab shells.

## Curriculum quality fixes to schedule before expansion

1. **Prerequisites and entry point:** catalog currently starts at frontend and uses array order; three curated paths are not a complete course sequence. Add a learner goal/starting point and explicit prerequisites later. Separate GTM/security specialization from required coding foundations.
2. **Consistent depth labels:** card, long guide, simulation and planned outline are not interchangeable. The current `Lesson` type has no status/prerequisite/review-date fields. Agree their semantics before UI work.
3. **Accessible references:** some cards rely on private Notion or Technical Docs links. Audit public accessibility; provide self-contained teaching and public primary sources, without copying private documents. Existing links were inventoried, not authenticated/access-tested.
4. **Assessment:** one correct card answer currently unlocks completion; manual exercise completion is not verified. Label reading versus demonstrated practice; add independent variants and answer rubrics. No LMS, login or persistent learner data is needed for this.
5. **Plain language and scope:** introduce vocabulary before tool names; explain where an analogy fails; split dense 25–35 minute guides into optional sections. Re-estimate times only after a learner walkthrough.
6. **Existing heuristics:** prompt/skill completeness is not quality evaluation. Review YAML quoting/escaping in `skillMarkdown` before teaching exported drafts as validated files. Review credential `contained` wording separately from post-revocation recovery.
7. **Sources and freshness:** store source checked date/review trigger consistently; date-sensitive vendor behavior, package versions, privacy/legal and security claims need specific source review when revised. This audit does not certify their accuracy.
8. **Navigation:** PR #126 merged the breadcrumb work. Preserve it; previous/next lesson sequencing and entry context remain separate planned work. Do not duplicate its component edits here.
9. **Consistency:** reduce drift between full guide, short card, route copy and planning documents. Keep one primary teaching source per topic and concise linked summaries.
10. **Transfer:** use a fictional five-account workflow as the builder spine, plus a small portfolio UI example for frontend lessons. Each lesson ends with one observable artifact or decision; quizzes alone do not prove transfer.

## Proposed batches and hold point

| Batch | Scope | Exit criteria | Status |
| --- | --- | --- | --- |
| A: audit and prioritization | This record + pointers in existing plans | All surfaces inventoried; reuse/new/planned distinguished; ordered backlog and boundaries reviewed | Documented in this change; review pending |
| B: connect what exists | BA-01 implementation; prerequisite/companion/source accessibility fixes; preserve merged #126 breadcrumbs | Honest status, existing labs reachable, no duplicate courses, clear starting point | Navigation/metadata foundation implemented; see [handoff](MISSION-HANDOFF.md). Broader instructional changes deferred. |
| C: understand and diagnose | BA-02 through BA-09 in small slices | One fictional task can be traced, its data/request understood, failure located and cost bounded | HOLD; BA-09 written companion already merged in #127 |
| D: build reliably | BA-10 through BA-14 with existing auth/security/delivery | Permission, data, failure, UI and test reasoning demonstrated | HOLD |
| E: specialize and operate | BA-15 through BA-18 | Traceable research correction and an outcome-based applied capstone | HOLD |

Next implementation candidate, only after authorization: BA-02 “Follow one click through your app,” reusing the current frontend and account-example material. First reconcile any newer HTTP/YAML work or open PRs; this snapshot did not contain a standalone guided HTTP primer. Do not recreate work being authored elsewhere.

Implementation acceptance follows [LEARNING-DEPTH.md](LEARNING-DEPTH.md): observable outcome, prerequisites, plain-language explanation, worked fictional example, independent practice with rationale, sources/review date, and next step. UI changes additionally need keyboard, mobile/tablet/desktop, reduced-motion, feedback/reset and relevant tests. Record checks actually run. Catalog registration is not deployment verification.

## Evidence and limitations

- Original inventory snapshot: `569c1f5`; reconciled merged breadcrumbs and FinOps source changes through `a9cb44e`. Counts remain unchanged. Production rendered behavior was not verified.
- Repository work reconciled on 2026-10-12: [PR #126](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/126) merged breadcrumbs; [PR #127](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/127) merged the FinOps billing walkthrough; open issues #23 and #74 concern dependency/security and analytics work, not a replacement curriculum backlog. Their current technical findings were not revalidated here.
- Existing source pointers to KRU-17, KRU-22 and KRU-61 identify related work; Linear status was not queried and no duplicate tasks were created.
- Primary evidence: [lesson catalog](../../lib/ai-academy.ts), [path definitions](../../lib/academy/learning-paths.ts), [programming curriculum](../../lib/academy/programming.ts), [guided tutorials](../../lib/academy/guided-lessons.ts), [Academy renderer](../../components/ai-academy/academy.tsx), [programming renderer](../../components/ai-academy/programming-foundations.tsx), [systems page](../../app/ai-academy/systems/page.tsx), [advanced lab scenarios](../../lib/ai-academy-advanced-labs.ts), [identity scenarios](../../lib/builder-academy/identity-journey.ts), [credential-risk scenarios](../../lib/builder-academy/credential-risk.ts).
- This is a content/coverage audit, not a legal/security fact check, learner efficacy study, full accessibility audit or certification.
- Docs-only validation: catalog/module/guide/route counts reconciled, inventory coverage checked, relative links checked, whitespace diff checked. Application tests/build/browser checks are not required for unchanged runtime and were not run in this change.

