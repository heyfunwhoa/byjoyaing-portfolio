# AI Enablement Academy — MVP

Route: `/ai-academy` on the portfolio. Built on a feature branch to avoid changes to production.

## Goal
Start with core AI literacy, practice on realistic exercises, then recommend a workflow and graduate repeatable activities into version-controlled skills. Notion stays the human-facing knowledge layer; GitHub is canonical for code and skills.

## Current acceptance criteria
- Eight guided lessons with analogies, exercises, a knowledge check and external references, including package registries and npm supply-chain basics.
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

## Roadmap
P0: check build and accessibility, improve lesson testing, add learner feedback and source review dates.
P1: optional persistent progress with consent, learning tracks, richer GTM scenarios.
P2: versioned skills registry, provider model comparisons tied to benchmark results, optional Notion metadata sync.
P3: secure agent execution and private workspaces after threat modeling and RBAC.

## Content hygiene
Every externally sourced claim: primary URL + checked date. Every recommended workflow: owner, validation status, test case and review trigger. Prefer canonical GitHub skills linked from Notion; do not duplicate executable instructions.

## Builder learning: packages and dependencies

See [package registries, package managers, lockfiles and supply-chain security](learning/package-registries.md). The in-app Builder lesson is a concise guided version; this reference provides a deeper technical explanation and a no-secrets exercise drawn from the portfolio's dependency audit.
