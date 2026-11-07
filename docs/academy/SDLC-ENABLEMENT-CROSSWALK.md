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

## Coverage clarification: computing, binaries, DevOps, IaC, and operations (2026-11-06)

This is an **inventory and planned learning order**, not an assertion that the subjects below have complete learner-tested lessons. The SDLC-first entry proposed/implemented in Academy integration PR #238 is an orientation; it does not replace the deep technical foundations.

| Concept | Existing reference (where available) | Coverage / next need |
| --- | --- | --- |
| Computer / operating-system foundations | Programming Foundations registry; reading-code-and-yaml guide | Partial: teach bits vs bytes, binary representations, files, processes, memory, shells and OS/runtime roles explicitly |
| Binaries and how code executes | Reading-code-and-yaml briefly contrasts compiler/interpreter; How Code Works is a programming curriculum outline | Gap: source, compiler/transpiler, bytecode, linker, executable binaries vs interpreted programs and deployable bundles |
| Build artifacts and supply chain | Package registries, lockfiles, Git/CI, existing security guidance | Partial: distinguish executable, built JS bundle, package, archive, OCI image, checksums, SBOM, signing, artifact provenance |
| DevOps and CI/CD | From idea to verified release; first deployment settings; Git Workflow Essentials; Build Rate Limits & CI/CD guide | Introductory: add end-to-end build/test/artifact/deploy/release, environment gates, troubleshooting and rollback scenarios |
| Containers and orchestration | Systems Engineering page and roadmap outline Docker; deployment guide mentions containers | Planned deep dive: Dockerfile, images versus containers, registries, Compose, Kubernetes, when managed hosting obviates orchestration |
| Infrastructure as Code (IaC) | Systems Engineering roadmap names IaC; this crosswalk specifies a proposed Terraform/OpenTofu-safe lab | Planned: imperative vs declarative, desired state, plan/apply, state, drift, providers, modules, policy, cost and destroy/retire |
| Platform engineering / GitOps | Engineering organization track here; Systems roadmap architecture/DevOps entries | Planned: golden paths, developer portals, reconciliation, control planes and ownership boundaries |
| Operate, recover and retire | Background-job recovery, database recovery, measure-product-use, security/release guides, Systems outlines | Partial: expand observability, logs/metrics/traces, SLOs, on-call/incident response, backup/restore, patching, FinOps and decommissioning |

### Dependency-first teaching order

1. **Computing foundations:** binary numbers, bytes, encodings, file formats, filesystems, processes and the operating system. This is the missing beginner bridge.
2. **From code to running software:** source → types/parsing/compiling/transpiling → optional linking or bytecode → **build artifact** → runtime. Distinguish compiled native executables, interpreted source, JavaScript bundles, packages and container images rather than calling all of them "a binary."
3. **Developer workflows:** Git, branches, PRs, packages, dependency locks, builds, tests, debugging and artifact inspection.
4. **Infrastructure foundations:** on-prem servers, virtualization, VMs, cloud compute, storage, networks, DNS, IAM, environments and secrets.
5. **Containers and IaC:** Docker/container lifecycle first for workload packaging, then Terraform/OpenTofu/Pulumi concepts for provisioning resources. Neither requires Kubernetes in a beginner application.
6. **DevOps / software delivery:** CI→artifact→review/gate→CD/deployment→release/feature flags→verification/rollback, with GitOps as an optional reconciliation pattern.
7. **Operations and systems:** observability, reliability, distributed failures, incident response, recovery, scaling, cost and retirement.
8. **Modern specialization:** platform engineering, supply-chain attestations, policy as code, AI-assisted/agentic changes and governance, with human approval and isolated credentials.

Use the same **before → during → after** and **history → modern approaches → tradeoffs** lens at each step. Security, testing, accessibility, documentation, cost and responsibility are cross-cutting from day one, not a separate final gate.

### One concrete beginner exercise linking the entire chain

A fictional web application changes a button label:
- **Source:** edit a TypeScript/React component. Its file is source text, not an executable machine-code binary.
- **Build:** run a type check and build; distinguish a browser JavaScript bundle/static assets from a native executable. A compiled Go/Rust utility provides a contrast, not a required second app.
- **Package:** identify the versioned output and dependencies; explain how a container image differs from the application binary or bundle inside it.
- **Provision:** describe which resources an IaC plan would create or change, and which application configuration stays outside the provisioning tool.
- **Deliver:** check GitHub CI, an approved Vercel preview, and actual runtime behavior separately. A successful build does not prove the correct release or environment is live.
- **Operate:** explain how to find the deployed revision, a runtime error, rollback options, and resource cleanup.

**Assessment:** Given a source file, a build result, an IaC plan, and a deployment record, the learner labels each artifact, spots an unintended destructive resource change, and states the next safe verification step. Synthetic/public fixtures only; no cloud apply, tenant data or credentials.

**Execution boundary:** Do not author eight new lessons at once. Reuse the current code/YAML, release and CI guides, then prioritize (a) the bits/files/binaries bridge and (b) a small synthetic IaC plan-review lesson once the active Academy integration and KRU-77 work are reconciled. Preserve PR #238's ownership of UI/navigation and PR #260's documentation-only scope. Track real content development through the existing Builder Academy Linear program, not a duplicate backlog.

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


## Prioritized implementation plan (2026-11-06)

**Decision:** Start learning immediately in chat; make the first repository delivery a bounded, outcome-driven SDLC entry and comprehension slice. No new Academy program, separate LMS, duplicate lesson registry, learner storage, or new UI framework.

### Ownership and sequencing

| Priority | Owner / existing work | Deliverable | Gate |
| --- | --- | --- | --- |
| P0: Stabilize | KRU-174 and integration PR #238 | Reconciled inventory, canonical paths and integration acceptance | Owner editorial, learner, accessibility and release review; verify latest-head checks and production independently |
| P1: SDLC entry | This crosswalk PR #260, then a separately scoped implementation within the existing Builder Academy program | Connect existing \`idea-to-verified-release\` lesson to one understandable SDLC orientation and one independent synthetic scenario; **no second SDLC lesson body** | Existing lesson IDs, prerequisites, navigation, and learner-state semantics unchanged; learner explains idea → requirement → PR/test → deploy → verify and identifies one failure |
| P2: Journey continuity | KRU-77 | Resume and clear feedback using existing approved progress mechanism | Reviewed, practiced, passed, and demonstrated remain distinct; test reload, reset, malformed storage, keyboard, mobile and reduced motion |
| P3: IaC deep dive | Future bounded follow-on, after P1 and owner acceptance | One synthetic plan-review lesson, normal/change/delete cases and answer-specific feedback | Correctly identifies unintended changes and approval boundaries; no cloud credentials or live apply |
| P4: Enablement transfer | Existing revenue enablement program | One seller/SE or onboarding mission linked to the canonical IaC concept | Independent role rubric and private/public content boundary review |
| Later | Existing Design Lab PR #258 and curriculum backlog | Optional maps, game-like missions, adaptive recommendations, broader catalog | Pilot learner evidence demonstrates value; do not merge experimental UI by assumption |

**Current dependency checks:** KRU-88 is Done and its guide is already linked. KRU-174 and KRU-77 remain In Progress. PR #238 remains open with owner review outstanding. PR #258 remains a draft experimental workbench. PR #260 is documentation-only. Check these states again at implementation time.

### P1 minimum viable learning slice

**Learner:** a beginner with no assumed programming experience.

**Problem:** existing materials explain SDLC, but a new learner lacks a clearly bounded, outcome-focused first experience that shows how the stages connect and checks independent understanding.

**User outcome:** after one short session, the learner can trace a fictional application change from a user need through requirement, design, issue, implementation, review/testing, deployment, live verification and maintenance, and can explain why passing CI is not proof of a successful live release.

**Scope:**
1. Reuse the canonical \`idea-to-verified-release\` lesson, companion and existing teaching fixtures; link the current code/YAML and deployment references where useful.
2. Add a clearly labeled SDLC Foundations entry/sequence within the **existing** Academy navigation after PR #238 is accepted. Prefer metadata/link wiring to new routes.
3. Add one independent synthetic scenario or adapt an existing check: given a fictional change with a passing test but missing deployment verification, choose the next evidence-gathering step and explain why.
4. Give feedback for each answer, a concise next-lesson recommendation and an honest status indicator. If the existing check cannot persist, say so; do not add persistence.
5. Test prerequisite and link integrity, navigation, keyboard/mobile behavior and scenario answer correctness; capture exact-head CI plus owner review.

**Non-goals:** no new content management schema, learner accounts, badges, certificates, tracking database, live infrastructure, new gamification dependency, full 30-lesson implementation, or employer-specific content.

**Acceptance criteria:**
- AC1: Learner can find the SDLC entry from existing Academy navigation, with no duplicate catalog ID or conflicting path.
- AC2: The entry points to one canonical lesson and the existing source/companion; content explicitly distinguishes planning, tests, merge, deployment and verification.
- AC3: One independently answerable fictional change scenario has a correct response, plausible incorrect responses, meaningful feedback and a failure/recovery explanation.
- AC4: Completion is not misrepresented: reading, practice, passing and demonstrated ability are separately labeled.
- AC5: Existing tests plus focused navigation, content, accessibility and responsive checks pass on the implementation head; unresolved human checks are stated, not silently marked complete.
- AC6: The PR is reviewable without modifying production, creating a new data store, or overlapping active KRU-77/KRU-174 work.

**Outcome evidence:** ask a beginner to explain a fresh fictional change in their own words and identify which evidence is still missing before calling it live. Record the actual response and misconceptions with consent; do not claim competency based only on clickthrough.

### Execution handoff

1. Review PR #238's owner acceptance and reconcile its actual merged/deployed state. Avoid writing UI while integration is open.
2. Review KRU-174's latest inventory and KRU-77's learner-state work before implementing any path or check.
3. Review/merge this docs-only PR #260 separately after confirming it adds no conflicting canonical ownership.
4. Implement only P1 as a small feature branch and reviewable PR under the existing Academy project, reusing the same files and patterns. Link it to the existing issue/project rather than inventing a duplicate tracker; add a distinct scoped issue only if required by the team's delivery workflow.
5. Validate with a real beginner before expanding to IaC and role-specific enablement.

### Deferred improvements

A full interactive dependency graph, persistent cross-device progress, AI tutor, authoring automation, certification, employer overlays, and shared cross-repo UI packages remain opportunities, **not blockers** for the P1 learning outcome.
