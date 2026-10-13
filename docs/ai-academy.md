# AI Enablement Academy — MVP

Route: `/ai-academy` on the portfolio. Built on a feature branch to avoid changes to production.

## Goal
Start with core AI literacy, practice on realistic exercises, then recommend a workflow and graduate repeatable activities into version-controlled skills. Notion stays the human-facing knowledge layer; GitHub is canonical for code and skills.

## Current acceptance criteria
- Guided lessons are registered in `lib/ai-academy.ts`. The `verification` editorial record is read from `content/academy/lessons/verification.json` through a validated adapter; its checks and identity remain code-owned. See the [local Keystatic pilot and rollback](academy/KEYSTATIC-PILOT.md). Each one includes an analogy, an exercise, a knowledge check, and external references. The in-app count follows that list, including package registries and npm supply-chain basics.
- Lesson completion is intentionally **session-only**, clearly disclosed.
- Workflow finder searches five task-to-tool recommendations and offers copyable starter prompts.
- Accessible labeled controls, visible keyboard focus, mobile-responsive layout, meaningful empty states.
- No authentication, AI API, Notion writes, autonomous agent execution, analytics or user data persistence.

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

See the [complete curriculum inventory and priorities](academy/CURRICULUM-AUDIT.md), reviewed 2026-10-12. It distinguishes registered cards, guided tutorials, companion references, simulations and planned modules. Its delivery order supersedes the older roadmap below. Current work is documentation and prioritization only; lesson/UI implementation is on hold.

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

1. [MCP versus REST APIs](builder-academy/mcp-vs-rest-api.md) — learn how tools can reach data and why access does not grant retention or export rights.
2. [NDA versus MNDA, DPA, MSA and deal reviews](builder-academy/enterprise-contracts-sales-cycle.md) — distinguish confidentiality, privacy, legal and procurement decision owners.
3. [Security assessments by buyer size and risk](builder-academy/security-assessments-by-buyer-size.md) — review SOC 2, ISO 27001, pen-testing evidence, subprocessors and the buyer's risk-tiered approval process.

The security-assessments card includes a **session-only, synthetic decision lab** in `components/ai-academy/security-review-lab.tsx`, fed by `lib/ai-academy/security-review-lab.ts`. It compares four buyer cases (a low-risk startup demo, a mid-market repository integration, a regulated enterprise processing real records, and a small high-risk startup requesting privileged production access). Learners switch between AE and Head of Sales roles, then select a proportionate evidence response and a role-specific action. The app explains each choice. The lab does not access a real CRM, submit a review, persist completion or claim legal/security approval.

**Product acceptance:** the lab is visible when the `security-assessments-buyer-size` lesson is active; scenario/role changes reset previous selections; the evaluation button stays disabled until both questions are answered; correct/wrong results have supporting rationale; the smaller high-risk buyer is correctly distinguished from the low-risk synthetic buyer; no sensitive vendor report is exposed or collected.

**Learning boundary:** explain practice decisions; do not substitute this material for enterprise counsel, qualified security review, SOC 2 auditing, risk acceptance, or a production procurement approval. Source documents and educational references are linked from the relevant Academy cards.

The From idea to verified release lesson includes a Portfolio OS case study of that same public path. It sits after the six-stage delivery lab and does not add a second lesson.
