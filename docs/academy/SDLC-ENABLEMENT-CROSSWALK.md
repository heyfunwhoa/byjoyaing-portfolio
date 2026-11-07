# SDLC Learning Academy: reusable curriculum and enablement crosswalk

**Status:** proposed curriculum mapping, documentation only. Not a live Academy track, published course, learner credential, or deployed experience.
**Recorded:** 2026-11-06
**Implementation owner:** existing Builder Academy in this repository. Do not create a parallel app, LMS, lesson registry, learner database, or separate curriculum repo.
**Audience:** beginner builders first; later optional business, technical, operations, and role-based enablement overlays.

## Outcome and why this exists

Teach the full software development lifecycle (SDLC), from opportunity discovery and requirements through architecture, implementation, infrastructure, testing, release, operations, optimization, and retirement. Learners should be able to (a) explain the concepts, (b) trace dependencies and evidence, (c) make bounded decisions in a simulation, and (d) demonstrate an applied skill on a safe real or synthetic project.

The same reusable instructional structure should support future onboarding and enablement without copying core lessons into multiple academies.

## Canonical ownership and existing surfaces

- [PROGRAM.md](PROGRAM.md): unified learning platform vision, existing paths and ownership.
- [LEARNING-DEPTH.md](LEARNING-DEPTH.md): lesson quality, feedback, assessment, and evidence contract.
- [CURRICULUM-AUDIT.md](CURRICULUM-AUDIT.md): prioritized existing inventory. Reconcile historical counts with current source before changing the catalog.
- [MISSION-HANDOFF.md](MISSION-HANDOFF.md): implementation extension points and honest Reviewed / Practiced / Passed distinction.
- [REVENUE-ENABLEMENT-MISSION.md](REVENUE-ENABLEMENT-MISSION.md): existing role-based sales/builder enablement and Trusted Handoff proposal, not a new LMS.
- [From idea to verified release](../builder-academy/idea-to-verified-release.md): **reuse as the current SDLC learning spine**; do not author an equivalent duplicate lesson.
- [First deployment: settings and integrations](../builder-academy/first-deployment-settings.md): reusable cloud, delivery, secrets, and operations companion.
- Existing canonical code: lib/ai-academy.ts; lib/academy/learning-paths.ts; lib/academy/lesson-guidance.ts; components/ai-academy/academy.tsx.
- Design Lab may prototype maps, mission cards and coaching UX; the Academy remains the curriculum owner. A prototype is not a released lesson.
- Platform engineering/security policies remain owned by the relevant standards and product repositories. The public Academy teaches the concepts through safe, original examples, not copied private policy text.

## Reusable lesson recipe

Follow the existing [learning-depth contract](LEARNING-DEPTH.md), adding an explicit **history-to-future lens** to each appropriate concept. This is instructional structure, **not a second lesson schema**:

1. **What problem are we solving?** Plain-language definition, business and user outcome, constraints, and a helpful analogy with limits.
2. **What came before?** Historical approaches and why they broke down. Avoid implying newer always replaces older.
3. **How is it built?** Vocabulary, components, architecture, responsibilities, inputs/outputs, and a worked example.
4. **Where does it fit?** Before/during/after its SDLC stage, relationships to product, software change, infrastructure, and operations lifecycles.
5. **How is it used now?** Current approaches and tools with comparisons based on the use case, not rankings.
6. **What happens next?** Emerging approaches clearly labeled as hypotheses rather than adopted standards.
7. **Try it safely.** A deterministic, public or synthetic task; show normal, failure, and recovery cases.
8. **Check and coach.** Reasoning-based checks with answer-specific feedback and an independent attempt, not only recall.
9. **Prove and transfer.** Evidence rubric, source/review date, optional role-specific application, reflection, and next lesson.

For every learner state, keep **read/reviewed**, **practiced**, **passed a check**, **demonstrated a task**, and **manager/role readiness** separate. A clicked card is not evidence of proficiency. Preserve stable lesson IDs when linking across paths.

## Curriculum crosswalk: 30 planned subjects in six groups

The groups below are a **curriculum map**, not 30 newly implemented lessons. Link or deepen existing content where possible; create a new catalog record only for a genuinely missing concept after the existing audit and open PRs are reconciled.

| Group | Five conceptual areas | First reusable artifact |
| --- | --- | --- |
| A. Product and planning | Discovery; product strategy; requirements; Agile/delivery methods; stakeholders/decision rights | Problem statement, scoped acceptance criteria and delivery plan |
| B. Design and architecture | UX/UI; systems design; frontend/backend/APIs; data modeling; networking/auth/security architecture | User journey, system map, data and access boundaries |
| C. Building and quality | Git/PRs; local development/dependencies; implementation; testing; secure coding/supply chain | Reviewable change and verifiable test evidence |
| D. Infrastructure and delivery | Cloud fundamentals; containers/orchestration; IaC; CI/CD; environments/secrets/GitOps/rollbacks | Safe infrastructure/deployment change plan and verification |
| E. Operations and evolution | Observability; SRE; incident response; performance/FinOps; maintenance/migrations/retirement | Operability checklist, incident exercise and improvement decision |
| F. Engineering organization | Developer experience/platform engineering; compliance evidence; delivery/outcome metrics; AI-assisted development; program/engineering leadership | Cross-team delivery decision with risks, measures, and owner |

**First pilot:** keep the existing "From idea to verified release" lesson as the front door; add the SDLC map as a navigational companion. Develop a **small IaC deep-dive** only after checking current lessons for overlap.

## One concept, multiple role contexts

**Canonical concept:** Infrastructure as Code means desired infrastructure can be versioned, reviewed and provisioned through defined configurations and APIs.

| Audience / path | Reusable foundation | Context-specific application | Demonstration |
| --- | --- | --- | --- |
| Builder / beginner | What infrastructure is; imperative vs declarative; state, drift, plan/apply | Safe fictional cloud-resource change | Interpret a plan and explain risks before approval |
| Developer / platform engineer | Same canonical foundation | Environments, access, changes, drift and rollback | Identify a flawed change and a reasonable recovery path |
| Seller / solutions consultant | Same canonical foundation | Discovery questions about customer environments and integration ownership | Ask accurate questions without claiming unverified product support |
| Customer success / onboarding | Same canonical foundation | Implementation dependencies and configuration handoff | Explain who owns configuration, secrets, verification and support |
| Enablement manager | Links to the same foundation | Coaching checklist, enablement assets, readiness criteria | Score a scenario with a versioned rubric, not simply completion |

Do not copy the foundational IaC explanation into every overlay. Role paths should reference stable lesson IDs and contribute their own scenario and rubric. Private customer examples, internal SOPs, product roadmaps, contracts and employer data remain in their **authorized private sources**. No employer or customer content should be automatically republished through the public site or a public CMS.

## Sample pilot: IaC through the full SDLC

**Proposed title:** "Infrastructure as Code: from manual setup to repeatable releases" (not an existing registered lesson).
**Prerequisites:** "From idea to verified release" and relevant code/YAML basics when needed. Avoid universal AI prerequisites.
**Learner outcome:** explain infrastructure and IaC, compare imperative and declarative methods, identify state and drift, interpret an illustrative plan, and state the approval/rollback questions.
**Worked case:** a fictional documentation app requires a new object-storage bucket. The teaching fixture has no cloud account, tokens, or real infrastructure mutations.

- Before coding: define storage needs, data classification, lifecycle, cost and ownership.
- Design: describe resource and environment boundaries; define who can authorize changes.
- Build: show a minimal illustrative declarative resource configuration, distinguish it from scripts.
- Verify: compare an expected resource plan to the requirement; flag unintended replacement/deletion.
- Release: propose a review and authorized apply gate; do not actually apply.
- Operate: detect a manual configuration change and explain drift remediation.
- Retire: discuss safe resource deletion, retention and cost cleanup.

**Practice challenge:** choose between three hypothetical change plans (create-only, replacement, deletion) for one stated requirement. Explain which is appropriate and which require stop/review. Grade against the explicit scenario and provide feedback for each decision; a correct multiple-choice response alone does not establish deployment ability.

**Transfer options:** the builder explains the technical tradeoff; the seller identifies customer discovery questions; an onboarding specialist describes handoff and ownership. All use the same public foundation but separate role-specific assessments.

## Delivery sequence, without a second backlog

1. **Map (docs-only):** Link existing lessons and gaps into the six-group crosswalk. This document is that proposal, not implementation acceptance.
2. **Reconcile first:** Confirm Academy integration PR #238 and Design Lab pilot PR #258 status before edits to curriculum UI, shared navigation or interactive components. Respect the separate owner acceptance and release gates.
3. **One vertical slice:** Add one navigable SDLC entry point or companion after overlap review; connect existing idea-to-release, code/YAML, cloud/deployment, testing, and monitoring resources where available. Do not mark planned content complete.
4. **One deep dive:** Pilot the IaC lesson with a synthetic plan-review exercise, a worked example, answer-specific feedback, accessible alternatives, and a documented rubric.
5. **One audience translation:** Reuse the identical concept ID in a revenue/implementation coaching scenario with its own role outcome. Keep employer overlays private.
6. **Review transfer:** Observe a few learner attempts with consent, inspect errors and misconceptions, improve the fixture, and only then generalize the mechanism. Extract shared UI packages after repeated adoption, not before.

Continue using existing Linear program/projects and issues when scope is ready; do not create one issue per curriculum row or duplicate the Academy/Design Lab workstreams.

## Release and evaluation gates

- Explicit objective, learner level, prerequisites, scope/non-goals, and named content owner.
- Source references, factual review date, and distinction between established practice, vendor claims, examples and emerging hypotheses.
- Synthetic/public-only scenarios; no credentials, sensitive company data, live cloud calls or accidental production writes.
- Reliable worked example, meaningful error/edge path, reasoning-based checks and distinct feedback for wrong answers.
- Accessible keyboard, mobile, screen-reader and reduced-motion behaviors for interactive features, with equivalent text/list alternative.
- Unit tests for catalog mapping, stable IDs, prerequisite integrity, fixtures, answer keys, assessment semantics, and changed-source links.
- Existing repository CI/security/build checks, preview review, owner editorial sign-off, and independently verified production release.
- Outcomes measured by demonstrated task accuracy, transfer to an independent scenario, learner feedback and optional role-readiness coaching. Do not equate reading time, badges or self-reported review with competence.

**Non-goals for this proposal:** no new app, authentication, LMS, learner accounts, database, analytics collector, CMS migration, game engine, cloud provider, paid tool, private enablement publication, automatic PR merge or release.
