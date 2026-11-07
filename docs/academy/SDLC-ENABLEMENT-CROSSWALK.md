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

## Whole-product and full-stack development learning map (2026-11-06)

**Decision:** Teach the product lifecycle, software architecture, user experience, application code, software artifacts, infrastructure and operations as **interconnected layers**, not independent tool courses. This extends the existing 30-topic/six-group crosswalk, rather than creating more catalog IDs, a competing Academy, or a separate issue tracker. The eight-lesson SDLC entry in Academy integration PR #238 is an orientation only. Additional deep dives below are **planned** unless an existing reviewed source and actual exercise are identified.

### How the layers fit together

A useful beginner mental model for an interactive application:

```text
Problem / user / business outcome
       ↓
Product discovery → requirements → UX/UI flow + system design
       ↓                              ↓
Frontend (UI, state, interaction) ⇄ HTTP/API ⇄ Backend (auth, rules, jobs) ⇄ Database / storage
       ↓                                                 ↓
Source code + dependencies + tests + build configuration (the repository)
       ↓
Build and validate → versioned deployable artifact (web bundle, executable, package, etc.)
       ↓
Optional Dockerfile → OCI/container image → registry → running container(s)
       ↓
Runtime + cloud resources (some provisioned by IaC) + secrets + networking
       ↓
CI/CD approval → deployment → release → verify → observe → improve / retire
```

The diagram compresses parallel work into one teaching path: product discovery, security, accessibility, testing and cost controls continue throughout. An application hosted on Vercel can skip author-managed Docker images and Kubernetes. A managed platform still uses infrastructure, but abstracts away much of its ownership.

### Product development, design, and architecture: beginner-to-advanced crosswalk

| Learning domain | Questions and essentials to teach | Existing material to reuse | Depth still needed |
| --- | --- | --- | --- |
| **Product development and lifecycle** | Problem framing; customer/user research; JTBD; hypotheses; product-market signals; PRD; personas; requirements and acceptance; prioritization; roadmaps; lifecycle from discovery to retirement; outcomes vs outputs | From idea to verified release; evidence-based product request; enterprise-evaluation lessons | Guided discovery → prioritization → implementation acceptance → post-release outcome case |
| **UX, UI, and design systems** | UX vs UI; user journeys; information architecture; wireframes; prototypes; interaction, visual hierarchy, typography, design tokens, component libraries; accessible/mobile/responsive design; research and usability evidence | Frontend building blocks; Design Lab/Storybook visual regression; editorial card; existing site component inventory | Distinguish design artifact vs coded UI; exercise from user flow to wireframe and component/edge states |
| **Computing and software foundations** | Bits, bytes, encodings, memory, CPU, OS, processes, files; terminals and shells; algorithms; source vs runtime; compilers, interpreters, transpilers, bytecode, linkers and binaries | Reading code, files, JSON and YAML; Programming Foundations (partially guided) | Dedicated small 'how a computer runs software / how code becomes an artifact' bridge |
| **Frontend engineering** | Browser and DOM; HTML, CSS, JavaScript/TypeScript; React components; state, props, forms; client vs server rendering; accessibility; fetching and caching; error/loading/empty states; frontend build output | Frontend building blocks (guided pilot); CMS fundamentals; Storybook/Visual Regression | Trace browser → event → API request → rendered feedback, including negative paths |
| **Backend engineering** | APIs and route handlers; business rules; authN/authZ; validation; sessions; queues and workers; dependency boundaries; server runtime; retries, rate limits and safe external calls | MCP vs REST API; Better Auth GTM workspace; Follow one click; background-job recovery | A coherent, synthetic request lifecycle exercise from client to backend and back |
| **Data and storage** | SQL, relational models and constraints, migrations; transactions; object storage vs database; cache; backups and restore; consistency; schema/API contracts | Database branching/recovery; CMS modeling; identity journey | End-to-end data model/migration + read/write/rollback decision scenario |
| **Systems design and architecture** | Requirements and nonfunctional constraints; context/container/component diagrams (do not confuse architecture 'container' with Docker); monolith vs modular monolith vs microservices; sync/async; queues; API design; failures; security boundaries; scaling; technical ADRs | Systems Engineering overview (outlines only); verified-release flow; database/API/recovery lessons | Architecture trade-off exercise with explicit constraints, diagram, ownership, failure modes and ADR |
| **Developer workflow and build engineering** | Editors, Git, branches, PRs; code review; dependencies/lockfiles; tests; build tools; generated outputs; build artifacts, reproducibility, debugging, release identifiers | Git Workflow Essentials; package registries/lockfiles; Cursor workflows; verified release | Trace actual source → build → artifact → preview → release evidence; include binary vs JS distinctions |
| **Infrastructure, containers and DevOps** | Compute/storage/network/DNS/IAM; on-prem, virtualization and cloud; Docker images, registries and containers; Compose, Kubernetes when justified; IaC, CI/CD, GitOps, delivery/rollback and secrets | First deployment settings; Build Rate Limits & CI/CD; Systems overview; existing IaC pilot specification | Separate focused Docker/OCI and IaC/DevOps labs; no live infrastructure in beginner pilot |
| **Production operations and product improvement** | Monitoring, logs, metrics, traces, SLI/SLO; security patches, incidents, backups/restore, scaling, FinOps, product analytics, customer feedback, maintenance and retirement | Measure product use safely; background-job and database recovery; security review | Unified production incident + product-feedback transfer exercise |

**Cross-cutting:** security/privacy, accessibility, quality, cost, performance, documentation, evidence/traceability, permissions, and human acceptance are assessed at every relevant stage. Distinguish **product planning artifacts** from **engineering build/deployment artifacts**.

### What does "artifact" mean, precisely?

An artifact is a produced, identifiable output from a lifecycle activity. It is not inherently a binary file. Each type answers a different question:

| Stage | Artifact examples | What it proves / does NOT prove |
| --- | --- | --- |
| Discovery and product | Interview notes, problem statement, PRD, user stories, acceptance criteria | A decision or intended behavior, **not** deployed functionality |
| UX/UI | User journey, wireframe, Figma/Design Lab prototype, design tokens, component specification | A design or experiment, **not** a tested production UI |
| Architecture | Context diagram, API schema/OpenAPI document, data model, sequence diagram, ADR | A proposed/accepted technical contract, **not** a deployed system |
| Source and review | Source files, manifests, Dockerfile, IaC configuration, Git commit, PR diff | Reviewed intent or changes, **not** a release |
| Build | Transpiled/compiled code, native executable binary, browser/server bundles, libraries, ZIP or package | A produced runnable/distributable unit, **not** a healthy service |
| Packaging | OCI/Docker image, digest, registry reference | Immutable identified package for container execution, **not** a running container |
| Security and quality | Test reports, SBOM, dependency scan, artifact checksum, signature/provenance/attestation | Evidence of specific checks and origin, **not** universal security certification |
| Infrastructure and release | Terraform/OpenTofu plan or state, deployment manifest, CI run, preview URL, release tag | Intended/applied resource state or delivery evidence (check each separately), **not** proof the user journey works |
| Operations | Logs, traces, SLO reports, incident record, restore evidence, usage/feedback metrics | Evidence about behavior, reliability or adoption, subject to coverage and accuracy |

**Image is ambiguous:** a PNG/JPEG is a *visual asset*; a container image is a filesystem/layer + execution metadata packaged for container runtimes; a VM/disk image represents a bootable or mountable disk state. They are not interchangeable.

### Docker and the artifact chain: one practical walkthrough

A fictional meeting-preparation web app contains a React/TypeScript frontend and a server-side API with a database. Trace what each layer owns:

1. **User and UX:** the learner defines a "save meeting brief" flow, a loading state, a denied-access state and successful feedback. Output: user flow/wireframe.
2. **Application architecture:** frontend collects fields; backend validates input and user authorization, then stores a record; the server returns a result. Output: API/data contract, data-flow and ownership diagram.
3. **Source and dependencies:** the repo contains React components, route handlers, dependency manifest/lockfile, tests and build settings. Source code is not the deployment artifact.
4. **Build:** a JavaScript/TypeScript app may generate optimized JS bundles, HTML/CSS/assets and server output; a compiled Go or Rust service instead generates a native executable for a target platform. "Binary" can mean compiled machine code or binary data, **not** every build artifact.
5. **Optional container packaging:** a Dockerfile describes build steps; a container build makes an OCI-compatible **image** (filesystem layers + metadata). Tag/digest identifies it; a registry stores/distributes it. A **container** is the running or stopped instance created from an image. An image alone isn't running.
6. **Provisioning:** Terraform/OpenTofu might define a cloud network, service, managed database or storage. IaC **does not automatically produce or run** the app image and must manage state, drift, permissions, cost and destructive-change review.
7. **Delivery:** CI checks the exact commit, dependencies and build output; CD deploys the right artifact to a target environment with approved configuration. The application can also deploy through Vercel-managed builds without the developer producing or running a Docker image.
8. **Verify and operate:** test the deployed user flow and access controls; record the deployed artifact digest/commit, observe logs, errors and product usage, and rehearse rollback/data recovery when appropriate.

**Basic Docker vocabulary:** Dockerfile (recipe), build context (inputs), image (packaged layers), tag (human-readable reference), digest (content-addressed identity), registry (image storage/distribution), container (instance), runtime (executes containers), Compose (multi-container definition for a stack), Kubernetes (optional cluster orchestration). A Docker image is not an application build prerequisite for a managed Vercel website.

**Conceptual example, not a runnable production Dockerfile:** `source → npm build → app output → optional Docker build → image registry → deploy image → running container`. Contrast with `source → GitHub/Vercel build → Vercel deployment`. Both need testing, authorization, environment configuration and operational verification.

### Teaching sequence: how the learner should experience it

The following is a **recommended deep-dive dependency order**, not a new 11-path implementation and not a claim all material exists today.

| Sequence | Subject | Evidence or practical exercise |
| --- | --- | --- |
| 1 | SDLC and product discovery | Trace idea → problem → requirement → release → measured outcome |
| 2 | UX/UI and product design | Draw a user journey, identify interaction states, build a wireframe |
| 3 | Computing, source code and binaries | Classify code, compiled executable, JS bundle, package and data file |
| 4 | Frontend development | Implement/inspect a tiny form, state change and accessible error |
| 5 | Backend, APIs, database and storage | Trace a validated request through authorization, persistence and response |
| 6 | Systems design | Make a scoped architecture diagram and justify one trade-off |
| 7 | Developer workflows and testing | Review a PR, tests, source change and produced artifact |
| 8 | Docker and software supply chain | Read a Dockerfile; distinguish image vs container, tags vs digests, SBOM |
| 9 | Cloud and Infrastructure as Code | Interpret an illustrative plan with create/change/destroy safety decisions |
| 10 | DevOps, CI/CD and release engineering | Trace commit → build → artifact → preview → deploy → verify/rollback |
| 11 | Operations, reliability and lifecycle improvement | Diagnose a synthetic failure, measure an outcome and propose the next change |

**Initial delivery constraint:** do not author 11 new lessons or add infrastructure for this map. PR #238 already handles Academy navigation and the SDLC entry; PR #260 remains docs-only. First pilot should connect the existing lifecycle/front-end/API content and make the key **artifact chain** understandable, then select one small Docker/image or IaC exercise based on actual beginner confusion. Later role-specific enablement reuses these concept IDs with its own rubric rather than copying content.

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
