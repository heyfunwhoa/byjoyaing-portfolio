# SDLC Learning Academy: reusable curriculum and enablement crosswalk

**Status:** proposed curriculum mapping, documentation only. Not a live Academy track, published course, learner credential, or deployed experience.
**Recorded:** 2026-11-06
**Implementation owner:** existing Builder Academy in this repository. Do not create a parallel app, LMS, lesson registry, learner database, or separate curriculum repo.
**Audience:** beginner builders first; later optional business, technical, operations, and role-based enablement overlays.

## Start here: actual lesson order and status (November 6, 2026)

This document is the **curriculum crosswalk**, not the learner-facing course. Take these pieces in sequence. All linked guides on this branch are **draft educational sources** until reviewed, merged and published. No learner progress, mastery, cloud resources or service instrumentation is created by PR #260.

| Order | Current learning material | What to produce | Delivery status |
| --- | --- | --- | --- |
| 1. Orientation | [From idea to verified release](../builder-academy/idea-to-verified-release.md), plus its [fictional full-stack extension](../builder-academy/idea-to-verified-release.md#full-stack-bridge-trace-one-fictional-discovery-note) | One problem, acceptance criterion, product/UX/API/data sketch, next release evidence | Existing Academy lesson; new written extension on PR #260 |
| 1a. API practice | [Follow one click through an API](../builder-academy/follow-one-api-request.md) | Trace a form submission, inspect the request and response, and explain a safe retry | Written companion in PR #260 |
| 2. Software artifacts and Docker | [From source code to running software](../builder-academy/source-to-running-software.md) | Source/build/artifact/image/container comparison and go/no-go rationale | Existing written guide expanded on PR #260 |
| 3. Systems design | [Architecture trade-off exercise](../builder-academy/systems-design-tradeoffs.md) | Bounded architecture diagram, trust boundary and one decision record | Written lab in PR #260 only |
| 4. Infrastructure as Code | [IaC plan and drift review](../builder-academy/infrastructure-as-code-plan-review.md) | Review three fictional plans and block destructive changes | Written lab in PR #260 only |
| 5. Kubernetes/platform | [Orchestration and golden-path exercise](../builder-academy/kubernetes-platform-engineering.md) | Diagnose a missing endpoint and choose managed hosting vs orchestration | Written lab in PR #260 only; optional specialization |
| 6. Operate and improve | [Observability/SLO/incident exercise](../builder-academy/observability-reliability-incidents.md) | Incident response, recovery criteria and outcome evidence | Written lab in PR #260 only |

**Important sequencing boundary:** Academy [PR #238](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/238) already implements the **SDLC-first lesson navigation** on an open integration branch; it is not merged. Do not create a second SDLC entry path from this crosswalk. KRU-77 owns future resume/progress work. The first truly interactive IaC exercise, if justified after actual learner review, is a **separate, small implementation** in the existing Academy component family, not another documentation expansion or external cloud deployment.

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

**First practice.** Read [From source code to running software](../builder-academy/source-to-running-software.md) alongside steps 3 and 8. It includes a worked browser-to-server example, an artifact table, two reasoning checks with feedback, and a transfer task using deployment evidence.

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


## Delivery checkpoint: single-feature transfer and artifact lab (2026-11-06)

**Implemented on this draft branch as educational Markdown only:**

- **Now:** [From idea to verified release](../builder-academy/idea-to-verified-release.md#full-stack-bridge-trace-one-fictional-discovery-note) now includes one optional, fictional five-line transfer task spanning product problem and build-vs-buy; user journey and UX/UI; React frontend; API validation and server authorization; database constraints; CI/build; preview/production identity; outcome review. It **reuses** the parent lesson, existing six-stage interactive delivery lifecycle lab, and the current frontend/API/data/deployment lessons. It is **not** a second Academy lesson ID or a new interactive route.
- **Next:** [From source code to running software: Docker artifact inspection](../builder-academy/source-to-running-software.md) now includes a complete **written**, safe classroom exercise with a conceptual Dockerfile, optional managed-hosting comparison, six independent questions, wrong-answer guidance and a rubric. No Docker engine, registry, real code build or deployment was run; the Dockerfile assumes an existing fictional compiled application and is **not verified runnable**.
- **Later:** IaC, Kubernetes and platform engineering are retained as scoped deep dives only after beginners can distinguish a build artifact, image, running container, cloud resource and deployment record. An illustrative IaC plan-review scenario remains the proposed first advanced lab, **not implemented** here.

**No new Academy registry, UI component, account/progress store, framework, duplicate Linear issue, paid tool or public employer/customer data.** The new Markdown is on draft PR #260 until reviewed and merged. PR #238 still owns the SDLC starting navigation; do not claim that this draft guide is visible at the canonical `blob/main` URL or deployed site yet.

### Other practical concerns included across the journey

Use these as acceptance lenses for the single feature rather than creating separate courses before the pilot:

1. **Build versus buy:** check whether an existing CRM or managed product solves the user problem before inventing infrastructure.
2. **Roles and contracts:** name the product decision owner, UX reviewer, implementer, data/privacy owner, security reviewer and authorized release operator; map the handoffs through explicit artifacts.
3. **Unhappy paths and accessibility:** specify 403 denial, invalid input, unavailable dependency, empty/loading states, keyboard/readability and recovery before building the happy-path UI.
4. **Data ownership and recovery:** identify who owns records, migrations, environment isolation, retention, backup and rollback. Reverting code does not restore deleted data.
5. **Operability, cost and feedback:** have a basic error/latency signal, optional SLO, proportional spend check and outcome measurement. Logging or pageviews do not automatically prove business impact.
6. **Security and evidence:** pin the exact source/build/deployment version, minimize secrets and supply-chain risk, inspect least-privilege boundaries, and verify the real release. Green CI and a Docker tag alone are insufficient.

**Next acceptance gates:** editorial/content review for the two guide changes; inspect internal relative links and source qualification; try the transfer task with an intended beginner; confirm no duplicate IDs or CMS/progress implications; merge draft PR #260 only through the existing release process and then recheck the published links. A written answer key is not evidence of learning effectiveness or a substitute for a runnable app test.

## Advanced companion delivery checkpoint (2026-11-06)

The user approved continuing the **remaining technical curriculum**. This draft branch now contains the following **written, public-safe synthetic exercises**. They extend the same fictional discovery-note application and are **not newly registered Academy lessons, deployed routes, tested cloud resources or automatically graded interactive labs**.

| Optional step | Canonical content and existing anchors | Independent learner outcome | Status |
| --- | --- | --- | --- |
| 1. Architecture | [Systems design trade-offs](../builder-academy/systems-design-tradeoffs.md), building on current frontend/API/database lessons and Systems Engineering roadmap | Choose a bounded architecture, specify trust/data boundaries, recognize a forbidden object read, and write one decision record | New draft written companion |
| 2. IaC | [Infrastructure as Code plan review](../builder-academy/infrastructure-as-code-plan-review.md), building on source/build/container vocabulary | Stop unexpected production deletion, inspect desired/observed state, identify drift and approval boundary | New draft written companion |
| 3. Orchestration and platform | [Kubernetes and platform engineering](../builder-academy/kubernetes-platform-engineering.md), building on Docker artifacts/managed-hosting comparison | Separate image, Pod, Deployment and Service; diagnose selector/rollout failure; choose managed hosting vs orchestration; design a small golden path | New draft written companion |
| 4. Reliability/operations | [Observability and incident response](../builder-academy/observability-reliability-incidents.md), using the existing recovery and product measurement resources | Select a user-facing SLI/SLO, trace a fictional bad release, identify incident owners and safe recovery evidence | New draft written companion |

**Navigable entry:** [From idea to verified release](../builder-academy/idea-to-verified-release.md#full-stack-bridge-trace-one-fictional-discovery-note) → [From source code to running software](../builder-academy/source-to-running-software.md#apply-it-independently) → four optional advanced companions above. The main Academy UI remains owned by PR #238; PR #260 is the written learning-source proposal. No parallel app or learning-progress backend.

### Additional practical principles integrated into the exercises

- **Architecture is a decision, not a stack checklist.** Each scenario requires an actual user need, functional/nonfunctional constraints, system/trust boundary, responsible roles, choice of smallest workable alternative and an explicit reconsideration trigger.
- **Artifacts are distinct:** a PRD, UI design, API contract, native binary/JS build, OCI image, IaC plan/state, Kubernetes manifest/rollout, monitoring report and deployed-revision record answer different questions.
- **Operating cost and responsibilities follow the deployment choice.** Vercel/managed platforms reduce some operator work, whereas an independently managed container stack needs cluster/service and incident owners.
- **Safety/negative paths are part of the definition of done.** Synthetic unauthorized access, invalid input, source/build mismatch, unavailable image, stale IaC state, destructive plan, Pod readiness, migration rollback and error budget are explicit exercises.
- **Teach what a tool cannot prove.** A passing CI check is not production acceptance; an image tag is not proof of an active container; a plan is not an apply; a running Pod is not a correct user journey; an SLO target is not verified service performance.
- **Human transfer matters.** A learner must justify a decision on a fresh fictional scenario, not only read an answer key or click "Reviewed." If no learner session occurred, do not claim a learning outcome.

**Validation and scope boundary:** all code snippets and infrastructure manifests are illustrative unless a separate executable fixture is built and validated. In particular, the OpenTofu pseudo-configuration and Kubernetes manifest are **not safe deployable templates**; no provider APIs, registries, secrets or real cluster were used. Check Markdown links and accuracy, require editorial and intended-learner review, and only then consider one executable sandbox as a later, independently approved slice. Preserve existing Linear KRU-174/KRU-77 ownership, Design Lab #258 experimental boundaries, and Academy integration PR #238 release gates. The docs-only PR #260 must remain draft/unmerged pending those checks.

## Learner acceptance session: 15-minute protocol

**Purpose:** Evaluate whether this sequence helps a beginner reason about an unfamiliar product change **without reading answer keys first**. This is a proposed test plan; **no participants have yet been observed for these new guides**. Participation is optional, consent-based and uses fictional examples only. Keep any identifiable raw notes in an authorized private place, not this public repository.

| Phase | Learner action | Observer records (actual, not inferred) |
| --- | --- | --- |
| 0–2 min: orientation | Find where to begin and explain what the first lesson covers | Correct starting route, navigation confusion, time/assistance |
| 2–6 min: feature trace | On a new fictional customer-contact form, name the user problem, UX states, browser/backend/data boundaries and a missing release check | Unprompted distinctions, incorrect assumptions, assistance |
| 6–10 min: artifact chain | Classify source file, build output, Dockerfile, OCI image, running container, IaC plan and deployed revision | Correct category explanations, not keyword matching |
| 10–13 min: go/no-go | Given a green CI check, wrong production revision and an IaC plan that deletes unrelated data, decide what must happen next | Stop decision, evidence requested, approval/rollback boundary |
| 13–15 min: transfer | Explain the same workflow for a report-export worker, including one failure and an operational owner | Transfer without copying the first scenario; unresolved questions |

**Scoring guide, not a certification:** for each of the four skills (problem-to-design trace, artifact classification, independent release decision, failure/ownership transfer), record **independent / correct with hint / incorrect / not attempted**, plus the exact misconception or difficulty. Do not infer proficiency from time spent, reading a guide, clicking an answer, or this self-report. Even a perfect single session does not establish production operational readiness.

**Documentation-ready gate:** source links and code/text labels verified, accurate status disclosures, internal links resolve on the draft branch, exact-head checks pass, and a reviewer signs off. Learner observations may be deferred explicitly if the release owner accepts the limitation; do not relabel them complete.

**Interactive IaC pilot gate:** Only after the core lesson and artifact chain can be explained, choose **one** deterministic, local-only plan review with three cases (safe create, unsafe exposure, unrelated destructive delete), an explanation for each choice, reset, keyboard/mobile/screen-reader acceptance and a new transfer prompt. Reuse Academy's existing answer and focus patterns, without real Terraform, paid provider calls, credentials, login, data storage or a second lesson engine. Hold a new feature PR until the active integration/release owner has reviewed the pilot's scope.

## Prioritized implementation plan (2026-11-06)

**Current decision:** Reuse the SDLC-first navigation already on **open** Academy integration PR #238. PR #260 provides an independently reviewable **written** full-stack transfer exercise and optional infrastructure/operations companions. New interactive work is gated on learner evidence and the existing Academy release process. Do not add a parallel Academy, catalog, LMS, progress store or UI framework.

### Ownership and sequencing

| Priority | Owner / existing work | Deliverable | Gate |
| --- | --- | --- | --- |
| P0: Stabilize | KRU-174 and integration PR #238 | Reconciled inventory, canonical paths and integration acceptance | Owner editorial, learner, accessibility and release review; verify latest-head checks and production independently |
| P1: SDLC entry | Open integration PR #238 (navigation) + draft PR #260 (companion) | SDLC-first path already proposed in #238; the synthetic full-stack transfer scenario is written in #260. **Do not make a second parent lesson** | Validate exact-head checks, editorial clarity and learner transfer before authorized publication |
| P2: Journey continuity | KRU-77 | Resume and clear feedback using existing approved progress mechanism | Reviewed, practiced, passed, and demonstrated remain distinct; test reload, reset, malformed storage, keyboard, mobile and reduced motion |
| P3: IaC deep dive | Written scenario now in PR #260; future interactive pilot in existing Academy after review | Three synthetic create/unsafe update/destructive delete plans and answer feedback are documented. Interactive UI is **not built** | Attempt the written exercise independently; implement one bounded, local-only interactive pilot only after release/learner acceptance |
| P4: Enablement transfer | Existing revenue enablement program | One seller/SE or onboarding mission linked to the canonical IaC concept | Independent role rubric and private/public content boundary review |
| Later | Existing Design Lab PR #258 and curriculum backlog | Optional maps, game-like missions, adaptive recommendations, broader catalog | Pilot learner evidence demonstrates value; do not merge experimental UI by assumption |

**Current dependency checks:** KRU-88 is Done and its guide is already linked. KRU-174 and KRU-77 remain In Progress. PR #238 remains open with owner review outstanding. PR #258 remains a draft experimental workbench. PR #260 is documentation-only. Check these states again at implementation time.

### P1 minimum viable learning slice

**Learner:** a beginner with no assumed programming experience.

**Problem:** existing materials explain SDLC, but a new learner lacks a clearly bounded, outcome-focused first experience that shows how the stages connect and checks independent understanding.

**User outcome:** after one short session, the learner can trace a fictional application change from a user need through requirement, design, issue, implementation, review/testing, deployment, live verification and maintenance, and can explain why passing CI is not proof of a successful live release.

**Scope:**
1. Reuse the canonical `idea-to-verified-release` lesson, companion and existing teaching fixtures; link the current code/YAML and deployment references where useful.
2. **Verify** the SDLC-first entry already proposed on PR #238, not recreate it. PR #260 only links the same canonical parent lesson and adds an optional written transfer exercise.
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
3. Review draft PR #260's **existing seven documentation files** and publish only after approval; avoid claiming that unmerged GitHub guide links are live Academy routes.
4. Use the existing SDLC-first entry in PR #238 and the written exercises in PR #260 to observe a real beginner attempting a new scenario. Record actual confusion, decisions and assistance, with consent.
5. If that evidence supports it, implement **one** IaC plan-review interaction in the existing Academy, with local synthetic fixtures and explicit feedback. Keep IaC, Kubernetes, platform and SRE operations real-world rollouts outside this lesson's scope.

### Deferred improvements

A full interactive dependency graph, persistent cross-device progress, AI tutor, authoring automation, certification, employer overlays, and shared cross-repo UI packages remain opportunities, **not blockers** for the P1 learning outcome.
