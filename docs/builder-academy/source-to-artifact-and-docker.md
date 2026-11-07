# Source → build artifact → Docker image → deployment

**Parent:** [From idea to verified release](idea-to-verified-release.md) · **Level:** Beginner extension · **Suggested time:** 20–25 minutes (study budget, not measured).  
**Status:** Written, synthetic practice companion on a draft PR. Not a registered Academy lesson, running Docker application, cloud deployment, credentialed sandbox, or proof of learner proficiency.

## The goal

Trace **one fictional discovery-note API** from source code to a tested running service. Identify the differences between source code, a build artifact, an executable binary, a Dockerfile, a Docker/OCI image, a registry, a container, an infrastructure plan and a deployed application. Then choose whether Docker is necessary.

**Prerequisites:** [the parent SDLC overview](idea-to-verified-release.md), [reading code and YAML](reading-code-and-yaml.md) and optionally [package registries/lockfiles](../learning/package-registries.md). No cloud account, Docker installation or real data required.

## One useful analogy, with limits

- **Source code** is the recipe written by developers.
- **Build artifact** is the result of preparing the recipe: perhaps a JavaScript bundle, native executable, package or archive.
- **Dockerfile** is the packaging recipe.
- **Container image** is a sealed, versioned box of the application files, runtime dependencies and startup metadata.
- **Registry** is the warehouse that stores and distributes images.
- **Container** is one instance created from the image and started on a host.
- **Deployment** specifies which version runs in which environment, under what configuration, permissions and approval.

The analogy breaks down because images may share layers, running containers can maintain separate transient writable state, and a deployed app can run **without any developer-managed Docker image**.

A **binary** is not synonymous with **build artifact**: a native compiled Go executable contains machine instructions; TypeScript/JavaScript projects often build JavaScript bundles or runtime/server output rather than native machine-code executables. All are digital files, but they are not the same kind of software deliverable. A PNG screenshot and a virtual-machine disk image are other meanings of "image."

## The complete chain and who owns it

| Step | Fictional input → output | What to verify |
| --- | --- | --- |
| Define | Accepted discovery-note behavior → small PRD/acceptance criteria | User problem and non-goals are explicit |
| Design | User journey + API contract + data model | Loading, validation, error, authorization and success states accounted for |
| Code | `src/server.ts`, tests, `package.json` and lockfile | Correct code, bounded dependencies and no hard-coded secrets |
| Build | `npm ci`, tests, `npm run build` → fictional `dist/server.js` | Build output matches source revision and test evidence |
| Package (optional) | Build output + `Dockerfile` → image `learning/brief-api:demo` | Required runtime files present, image source understood |
| Identify | Image tag → immutable content digest (example `sha256:DEMO_ONLY`) | A mutable tag is not the same as a content digest; sample digest is **not valid** |
| Distribute | Image → registry → deployment environment | Approved registry, permissions, vulnerability review and provenance |
| Run | Image → container → reachable server process | Health/request behavior, ports, logs and runtime secrets |
| Release | Tested build or image → preview/production deployment record | Correct commit/artifact, target, approvals, data migrations and release gates |
| Operate | Live checks, logs, metrics, incident/recovery note | User journey works; access denied when appropriate; rollback plan known |

## Two valid delivery routes

```text
Source + dependencies + tests
          |
          v
Build + verified output (artifact)
          |
          +-- Managed framework hosting --------------------------------+
          |   Git-linked preview / Vercel build → approved deployment    |
          |                                                             |
          +-- Optional container path ----------------------------------+
              Dockerfile + build context → OCI image → image registry
                          → container runtime → running process
                                        |
                                        v
                      Verify release, access, errors, outcome
```

The two routes can serve different deployment needs. The managed route **does not require a Dockerfile** for a supported Next.js application on Vercel. Docker can be useful for custom runtimes, portability requirements or operational patterns that justify owning an image and its deployment. Kubernetes is an optional orchestration system, not a prerequisite to understanding images or shipping a small web app.

## Inspect the recipe without building or deploying

This Dockerfile is **illustrative only**, assuming a separately built fictional `dist/server.js`, a matching runtime `package.json` and `package-lock.json`, and an app that listens on port 3000. It is **not tested as a runnable example** in this repository:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY dist ./dist
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Read it as: choose a Node runtime, set a working directory, install production dependencies, copy the previously built code, use an unprivileged user and declare how the app starts. A real implementation needs a reviewed `.dockerignore`, pinned/reviewed base image, CI build context, runtime permission checks, actual vulnerability and license review, platform/architecture compatibility, and tested start/health/shutdown behavior. Do not put tokens in the Dockerfile or image.

Illustrative command sequence (shown for interpretation, **not executed** by this documentation change):

```sh
npm ci
npm test
npm run build
docker build -t learning/brief-api:demo .
docker image ls
docker run --rm -p 3000:3000 learning/brief-api:demo
docker ps
```

The `docker build` command consumes a context (here, the current directory). The image tag is for human reference; use immutable digests, reviewed provenance and access controls for sensitive or production releases. A `docker run` starts a container locally; it does **not** deploy an application into production. A separate rollout and live behavior check are still required.

## Independent practice: make six decisions

Use the fictional evidence packet below. Write one sentence explaining **why** for each decision before consulting the key.

**Evidence packet:** An engineer changed a discovery-note validation rule. Source revision `abc123` is committed; the build produced `dist/server.js`; CI tests passed. A separate Docker build produced image tag `learning/brief-api:demo`, but the deployment shows revision `def456`. The user journey has not been tested on production. One proposed infrastructure plan would **delete the notes database**.

1. Which is source: `src/server.ts` or `dist/server.js`?
2. Is `dist/server.js` necessarily a native executable binary? What executes it?
3. Is the Docker image running merely because it exists in a registry?
4. Does `docker run` prove the correct version is live in production?
5. Should an approved release run the infrastructure plan containing an unexpected database deletion?
6. What **three independent kinds of evidence** would justify stating that the feature has been released successfully?

<details>
<summary>Answer key and feedback: open after attempting</summary>

1. `src/server.ts` is source in this scenario. `dist/server.js` is built JavaScript output. Mistaking the two hides the build step.
2. Not necessarily. The Node.js runtime executes JavaScript; a Go/Rust native executable is a different kind of artifact. Treating every built file as native machine code confuses runtime requirements.
3. No. A registry stores images. A runtime must create/start a container, and its process must run. Storage does not establish health.
4. No. Local execution tests a different target; production needs deployment identity and actual behavior verification.
5. **Stop and review.** Confirm the expected resource plan/state, owner authorization, backups/recovery and whether deletion is intended. A green code build does not authorize an unrelated destructive infrastructure change.
6. At minimum: **(a)** approved source/build/check evidence tied to `abc123`, **(b)** the actual production deployment's artifact identity/commit and intended environment, and **(c)** a successful user-flow and denied-access/negative-path check on that deployment. `def456` mismatch is a reason to investigate, not claim success. Operational monitoring and recovery readiness are additional requirements where risk warrants them.

</details>

**Transfer challenge:** Your small static site runs on Vercel, while a separate long-running job needs special system packages. For each workload, decide whether to use managed framework hosting, an approved container runtime, or another supported job platform. Explain the ownership, costs, observability, rollback and secrets trade-offs. There is **no universal winning provider**.

**Rubric:** A useful independent answer correctly identifies source vs output, native binary vs JS bundle, image vs container, a deployment's target/revision, an unsafe IaC deletion, and a go/no-go decision. Ask the learner to explain a fresh scenario, not just repeat the six keyed answers. Reviewing this file does not mark them practiced, passed or ready to operate production.

## What to learn next

Return to [the SDLC parent lesson](idea-to-verified-release.md) and [First deployment: settings and integrations](first-deployment-settings.md). Later deepen Docker with volumes, networks, image layers, registries, SBOM/provenance, multi-stage builds and Compose. Infrastructure as Code follows once cloud resource ownership and the build/package/deploy distinctions are clear. Kubernetes follows only if orchestration is useful to the workload.

## Sources and scope

- [Docker: What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- [Docker: What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- [Docker: Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- [Docker: Build context](https://docs.docker.com/build/concepts/context/)
- [Vercel: Next.js deployments](https://vercel.com/docs/frameworks/full-stack/nextjs)

Sources reviewed for the instructional concepts on 2026-11-06. Provider-specific features and deployment restrictions must be reverified before operational use. This paper lab makes no cloud calls, container builds, production writes, certification or learner analytics claims.
