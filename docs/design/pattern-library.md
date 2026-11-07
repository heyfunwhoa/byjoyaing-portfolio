# Reusable component and pattern library

**Owner:** Portfolio Design Lab in `heyfunwhoa/byjoyaing-portfolio`. **Status:** development-only pattern discovery and source-evidence layer; not a distributed UI package, a new product, or proof of cross-repository adoption. **Reviewed:** 2026-11-07.

## Where this lives and why

- **Interactive local library:** `app/design-lab/page.tsx` → `/design-lab` in `npm run dev`. The page intentionally returns 404 in production builds.
- **Isolated UI exercises:** `npm run storybook` → local Storybook on `http://127.0.0.1:6006`, story `Design Lab/Component Options/Library`; motion, gameful, and creative recipes have separate stories/workbenches.
- **Canonical component ideas and future sources:** `lib/component-options.ts`, displayed by `components/design-lab/component-options.tsx`. This includes reusable primitives, compositions, motion, learning patterns, data/evidence UX, and candidates. Every item keeps its stable catalog ID.
- **Lifecycle and exact source evidence:** `lib/design-lab/pattern-adoption.ts` adds *metadata keyed by those same IDs*. It does not copy options into another catalog. Local source and verified consumer paths are inspected; other app names in the component catalog are only suggested destinations.
- **Governance and broad tool choice:** [Technical Docs Platform software catalog](https://github.com/heyfunwhoa/technical-docs-platform/tree/main/software-catalog) governs cross-repo standards, architecture and the **60 canonical OSS opportunities plus 32 reference-only research options**. Its entries are not installed by being cataloged.
- **Actual application ownership:** GTM Revenue OS, Builder Academy, Security Market Map, Account Signal Engine, Detector Atlas and other consumers own their business rules, permissions, source content and acceptance evidence. Design Lab demos do not modify their code or share customer data.

Do **not** move Design Lab into Technical Docs. Docs states *what evidence is required and how adoption should happen*; the portfolio repo is where the React source and interaction tests live. Links across repositories are documentation, **not a runtime dependency or synchronization mechanism**.

## Use cases and next validation target

| Category | Why a pattern library helps | Example destination | What has to remain in the destination |
|---|---|---|---|
| Components & navigation | Compare cards, tables, breadcrumbs, dialogs, sidebar and responsive navigation | GTM OS, Account Signal Engine | Routes, access policy, actual data, state persistence |
| Motion & feedback | Prototype subtle state changes, loading, empty and failure recovery, reduced-motion behavior | Portfolio, GTM OS, Builder Academy | Workflow meaning and confirmed success/failure states |
| Data visualization | Compare timestamped trends, evidence matrices, coverage and tables with text equivalents | Security Market Map, Detector Atlas | Validated units, provenance, freshness, unknown states |
| Interactive learning | Try quizzes, branching simulations, steps, progress and code-lab patterns | Builder Academy, Truffle Camp | Learner records, scoring criteria, content rights |
| Content & editorial | Compare editing, preview, campaign assets, CMS-inspired authoring patterns such as Payload | Portfolio, GTM content operations | Content model, publishing roles, storage, actual CMS integration |
| Accessibility & quality | Keyboard focus, screen reader naming, mobile overflow, color contrast, 200% zoom and motion-off behavior | Every application | Its own browser acceptance evidence and QA |

Accessibility is a **cross-cutting requirement**, not a lifecycle stage or a cosmetic library category.

## Four evidence-based stages

| Stage | Meaning | Promotion evidence |
|---|---|---|
| **Candidate** | Upstream example, design idea or possible pattern; not an install. | Task and baseline defined |
| **Prototype** | Relevant code or demo exists in the Design Lab. | Local source path and verified interaction for the fictional task; no adoption assertion |
| **Approved** | Named destination owner made a scoped adoption decision. | Approval record, use case, license, accessibility and rollback requirements |
| **Adopted** | A specific use is actually inspected in consuming source. | GitHub repository + path and evidence for the exact component call site; owner still verifies deployment independently |

Availability ("Available here" versus "Candidate") is **different** from stage. "Available here" can be a local-only prototype; it does not imply an approved component, deployment, a package distributed to other repositories or a production release. An **Adopted** stage in this lab currently means *inspected source use*, not released to the public. Never derive approval from passing CI or suggest app adoption from a planned fit.

**Verified source-level examples:**

- `summaries` / Card primitive: `components/stakeholder-map/stakeholder-detail.tsx` imports and uses the local Card. This proves that particular usage, not every bento/carousel composition.
- `disclosure` / Tabs primitive: `components/toolkit-explorer.tsx` imports and renders the local Tabs. This does not establish adoption of the Accordion in another app.
- The same `disclosure` family also has inspected scenario-tabs source in `heyfunwhoa/security-market-map/components/scenario-player.tsx` at pinned main commit `92c01d81770c24be95e41057bdbdf991879dbe42`. This is source-level use, not a Design Lab package import.
- `context` / Sheet and Dialog primitives have inspected source-level uses in `heyfunwhoa/account-signal-engine/components/feed-app.tsx` at `ea4971dcb81da1463f672e2d71f1cd460718c777` and `heyfunwhoa/truffle-camp/components/trail-checkpoint.tsx` at `b3bcfae69a959fc2fe7142689335018f4c891974`. Both implementations are locally owned and are **not** synchronized from this library.
- `identity` and `context` have inspected local sources and workbench demos; those do **not** establish a production consumer.
- Gameful/branching prototypes from Design Lab PR #274 remain local experiment source, not shipped cross-repo features.

No standalone **Approved** entries have been recorded here solely from source availability. Future approvals must include a link to a reviewable owner decision before that stage is assigned.

A local source file and test result can establish only what they actually inspected. **For other repositories,** record exact `repo/path`, a pinned immutable revision, and a reviewer-checked import/use. The portfolio CI cannot prove another repository deployed the pattern or that its permissions and accessibility are correct. The other repository must complete its own acceptance evidence.

## How to use the library

1. Open the local library or Storybook. Filter by project, family, stage, availability or search phrase. Cards are default; use the explicit comparison table when contrasting evidence.
2. Click a candidate's upstream reference to understand the pattern. For local entries, inspect the actual repository source; for "Adopted", open the exact verified consuming file.
3. Choose a **single target user journey**, existing baseline and simplest local primitive. If none meets the need, propose one bounded experiment with *fictional data*, no extra provider spend.
4. In the consuming repository, record stable pattern ID, exact upstream commit and license, copied/modified paths, tokens, state behavior and privacy boundary, desktop/tablet/mobile, keyboard and motion-off behavior, acceptance tests, rollback and owner.
5. After checks and human review, link its PR and deployment evidence. Only then add a reviewed local consumer path to the lifecycle metadata. If a consumer is another repository, review its current source first rather than marking it adopted from a recommendation.
6. Do not publish or package the whole Design Lab. Consider a versioned shared component package only after two real consumers require the same stable, accessible API and a named maintainer.

## Avoiding duplicates and drift

- **One component ideas catalog:** `lib/component-options.ts`; no second list, spreadsheet or runtime tool service for the same ideas.
- **One evidence overlay:** `lib/design-lab/pattern-adoption.ts`; no candidate duplication. Source links are GitHub paths, not imports; source-level evidence is intentionally narrow.
- **One shared engineering standards home:** Technical Docs Platform. [Workbench reuse contract](workbench-reuse.md) stays portfolio-local, while consuming repos record their own decisions and tests.
- **Keep the source audit:** [component-source-audit.md](component-source-audit.md) and [component-inventory.md](component-inventory.md) are historical/current implementation evidence. Candidate options may be evaluated without installation.
- **No automatic promotion:** a Storybook story, green unit test, or code file is not a license, production approval or released feature.

## Verification

- Unit tests in `lib/component-options.test.ts` validate canonical IDs, legal status transitions, inspected paths and source-import evidence, filters, and no false cross-repo claims.
- Storybook UI tests in `tests/visual/workbench.spec.ts` cover status/family filters, verified-source links, empty/clear behavior, cards and table, plus responsive overflow. Preserve existing focus and reduced-motion cases.
- Run `npm test`, `npm run lint`, `npm run build`, `npm run storybook:build`, and where browser infrastructure is available `npm run test:visual`. Record exact-head CI and manual checks separately. Production `/design-lab` remains gated.
- This library change adds **no** runtime packages, schema migrations, CRM integration, new API calls, credentials, subscriptions or public routes.

**Rollback:** revert the small lifecycle overlay, its presentation/tests and documentation pointers; the original component options, Storybook demos, application logic and Technical Docs standards remain unchanged.
