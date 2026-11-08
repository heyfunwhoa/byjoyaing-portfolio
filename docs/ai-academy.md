# Builder Academy — AI Foundations and applied learning

Route: `/ai-academy` on the portfolio. The established Academy and its Frontend lesson are already on `main`. The nine-path organization and background-job recovery lesson are under review in [PR #238](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/238), not yet merged.

## Goal
Start with core AI literacy, practice on realistic exercises, then recommend a workflow and graduate repeatable activities into version-controlled skills. Notion stays the human-facing knowledge layer; GitHub is canonical for code and skills.

## Current acceptance criteria
- Guided lessons are registered in `lib/ai-academy.ts`. The `verification` editorial record is read from `content/academy/lessons/verification.json` through a validated adapter; its checks and identity remain code-owned. See the [local Keystatic pilot and rollback](academy/KEYSTATIC-PILOT.md). Each one includes an analogy, an exercise, a knowledge check, and external references. The in-app count follows that list, including package registries and npm supply-chain basics.
- **Mark as reviewed** is a reversible, self-reported catalog reading flag in component state. It is session-only and does not prove an exercise was passed, a skill mastered, or a certification earned.
- Workflow finder searches five task-to-tool recommendations and offers copyable starter prompts.
- Accessible labeled controls, visible keyboard focus, mobile-responsive layout, meaningful empty states.
- The public catalog does not require login, invoke an AI model, write to Notion or execute agents. Optional learner accounts in [PR #234](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/234) are separate and disabled in this integration.
- **Follow one click** is a distinct, synthetic learning mission that stores bounded practice progress in this browser's `localStorage` when available, provides reset, and falls back to page-session state. It does not sync to an account. This is separate from the catalog's session-only reading review.
- The portfolio includes opt-in deployment-configured PostHog monitoring and analytics code. This Academy change does not activate it. Confirm the actual hosted configuration and privacy notice before claiming no analytics collection.

## Development principles
- Feature branch → small commits → CI/lint/build → reviewed pull request → merge.
- Keep content typed and separate from UI (`lib/ai-academy.ts`).
- Start with static, public/synthetic content. No secrets or live customer data.
- Do not claim model rankings or tested compatibility without reproducible evals.
- Reuse portfolio design tokens, typographic scale and site shell.
- Validate input, expose source provenance, review links and content freshness.
- Add unit tests for recommendation filtering/lesson logic and E2E tests for navigation before production.
- No external state mutation or sync without explicit approval and scoped credentials.

## Current curriculum audit

See the [current curriculum inventory and priorities](academy/CURRICULUM-AUDIT.md) and [integration notes](academy/INTEGRATION-233-236-237.md). On November 4, 2026, `main` contains the existing Frontend guided lesson and the API/MCP companion; PR #238 contains the proposed nine-path organization and background-job recovery. Further interactive exercises, optional learner accounts and release decisions remain separately scoped.

## Roadmap
P0: check build and accessibility, improve lesson testing, add learner feedback and source review dates.
P1: optional persistent progress with consent, learning tracks, richer GTM scenarios.
P2: versioned skills registry, provider model comparisons tied to benchmark results, optional Notion metadata sync.
P3: secure agent execution and private workspaces after threat modeling and RBAC.

## Content hygiene
Every externally sourced claim: primary URL + checked date. Every recommended workflow: owner, validation status, test case and review trigger. Prefer canonical GitHub skills linked from Notion; do not duplicate executable instructions.

## Builder learning: packages and dependencies

See [package registries, package managers, lockfiles and supply-chain security](learning/package-registries.md). The in-app Builder lesson is a concise guided version; this reference provides a deeper technical explanation and a no-secrets exercise drawn from the portfolio's dependency audit.

## Builder learning: Cursor workflows

The in-app lesson `cursor-workflows` is the concise card. The longer source is [Cursor: from first prompt to verified pull request](builder-academy/cursor-agent-workflows.md). Publishing that Markdown file does not by itself add the card; the card is the `Lesson` record in `lib/ai-academy.ts`.

## Evidence-backed lessons

Learning answers should connect a **narrow claim → verified primary reference → applicability limits → scenario recommendation → actual reviewer/approval owner**. See [Evidence-backed sales and security decisions](builder-academy/evidence-backed-sales-and-security-decisions.md).

The interactive security-review lab has source references for *each decision*, with clear labels for what the official guidance supports versus what it cannot verify about a specific vendor. The learner's fictional choices are not proof of compliance, successful remediation or buyer approval. No restricted SOC 2/pen-test reports or live customer records are stored.

## GTM security and commercial due-diligence learning path

The existing Academy route renders lessons from `lib/ai-academy.ts`, rather than just publishing Markdown sources. The recommended sequence is:

1. [MCP versus REST APIs](builder-academy/mcp-vs-rest-api.md) — learn how tools can reach data and why access does not grant retention or export rights. The [progressive companion](builder-academy/api-mcp-progressive-lab.md) keeps one fictional brief behind a function, an HTTP handler, a function tool, and an MCP adapter. It does not add a lesson id. The curriculum inventory lists `mcp-vs-rest-api` once and lists this companion under that id.
2. [NDA versus MNDA, DPA, MSA and deal reviews](builder-academy/enterprise-contracts-sales-cycle.md) — distinguish confidentiality, privacy, legal and procurement decision owners.
3. [Security assessments by buyer size and risk](builder-academy/security-assessments-by-buyer-size.md) — review SOC 2, ISO 27001, pen-testing evidence, subprocessors and the buyer's risk-tiered approval process.

The security-assessments card includes a **session-only, synthetic decision lab** in `components/ai-academy/security-review-lab.tsx`, fed by `lib/ai-academy/security-review-lab.ts`. It compares four buyer cases (a low-risk startup demo, a mid-market repository integration, a regulated enterprise processing real records, and a small high-risk startup requesting privileged production access). Learners switch between AE and Head of Sales roles, then select a proportionate evidence response and a role-specific action. The app explains each choice. The lab does not access a real CRM, submit a review, persist completion or claim legal/security approval.

**Product acceptance:** the lab is visible when the `security-assessments-buyer-size` lesson is active; scenario/role changes reset previous selections; the evaluation button stays disabled until both questions are answered; correct/wrong results have supporting rationale; the smaller high-risk buyer is correctly distinguished from the low-risk synthetic buyer; no sensitive vendor report is exposed or collected.

**Learning boundary:** explain practice decisions; do not substitute this material for enterprise counsel, qualified security review, SOC 2 auditing, risk acceptance, or a production procurement approval. Source documents and educational references are linked from the relevant Academy cards.

The From idea to verified release lesson includes a Portfolio OS case study of that same public path. It sits after the six-stage delivery lab and does not add a second lesson.
