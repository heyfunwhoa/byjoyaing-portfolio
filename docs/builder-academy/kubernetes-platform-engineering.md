# Kubernetes and platform engineering: when a container becomes a service

**Builder Academy companion · Intermediate → advanced · 25–35-minute study budget**  
**Status:** Draft **paper-based** learning lab, not an installed Kubernetes cluster, GitOps controller, platform portal, running workload, training credential or production recommendation.

**Start with:** [Source to running software](source-to-running-software.md), [Systems design choices](systems-design-tradeoffs.md). [IaC plan review](infrastructure-as-code-plan-review.md) helps distinguish resource provisioning from workload rollout; a learner need not run IaC before this exercise.

## What problem does orchestration solve?

A Docker/OCI **image** is a package of application files, runtime dependencies and startup metadata. A **container** is an instance created from an image. Once applications need replicated instances across machines, controlled upgrades, service discovery, health checks, resource limits and recovery, a platform may coordinate those operations.

**Kubernetes** is one orchestration system for containerized workloads. It is not synonymous with Docker, infrastructure provisioning, GitOps or DevOps. Teams commonly use managed cloud runtimes without Kubernetes. For the simple fictional discovery-note app, a managed Vercel deployment and a managed database can be sufficient.

### Vocabulary with ownership

| Layer | Meaning | Question to ask |
| --- | --- | --- |
| Image | Built application package (tag/digest identifies a version) | Which reviewed image was built, scanned and approved? |
| Container | Runtime instance created from image | What process is running? Which permissions/config? |
| Node | Machine that can host Pods | Who patches and manages capacity and host isolation? |
| Pod | Kubernetes scheduling unit containing one or more containers sharing network/storage context | Are all required containers ready? |
| Deployment | Desired state and rolling update management for suitable stateless Pods | How many replicas and which image should exist? |
| Service | Stable network abstraction for selected Pod backends | Does its selector match healthy Pods? |
| Ingress/Gateway | Optional HTTP or network routing and ingress policy to backends | How is external access secured and routed? |
| ConfigMap/Secret | Configuration objects with different handling expectations | What is sensitive; who can retrieve it? Does storage encryption/access meet needs? |
| PersistentVolume | Storage lifecycle separate from a Pod | What happens to data after a Pod is replaced? |
| HPA / Autoscaling | Adds or removes replicas according to configured metrics/policy | Will the workload and dependency actually support scaling? |
| Control plane | Reconciles declared resources with cluster observations | Who owns API availability, policy and audit? |
| Platform team | Offers supported developer self-service capabilities | What repeats enough to justify a paved path? |

**Important:** Kubernetes Secrets are not, by name alone, proof of encryption at rest, limited read permissions or compliant storage. Runtime/service account permissions and external secret tooling must be evaluated for the actual system.

## Read a fictional deployment design

An approved production requirement calls for a fictional **stateless** notes API with two replicas and a stable internal endpoint. The following YAML is a **teaching sketch**: it names a deliberately invalid registry domain and an unavailable health route. It has never been validated with Kubernetes, and must not be applied to a cluster.

~~~yaml
# Teaching sketch only. No actual image, cluster or verified health route exists.
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notes-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: notes-api
  template:
    metadata:
      labels:
        app: notes-api
    spec:
      containers:
        - name: api
          image: example.invalid/academy/notes-api:learning-only
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /healthz
              port: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: notes-api-internal
spec:
  type: ClusterIP
  selector:
    app: notes-api
  ports:
    - port: 80
      targetPort: 3000
~~~

Interpret the pieces: the Deployment requests a desired replica count and a container image. A readiness probe determines when a Pod can receive traffic, if implemented correctly. A Service chooses Pods through labels and gives clients a stable service destination. **Two replicas are not proof of high availability**: shared infrastructure, database dependencies, readiness, disruption budgets and real capacity matter.

### Common failure cases

**Case 1: Image pull failure.** A tag references a missing image, incompatible architecture or denied registry. A successful YAML parse is not proof a Pod can run.

**Case 2: Pods exist, but are not Ready.** The health route is wrong, startup fails or a dependency is unavailable. Routing traffic blindly risks errors.

**Case 3: Service returns no endpoints.** Its selector does not match Pod labels or the Pods are not Ready. A healthy frontend can still see failures.

**Case 4: Database migration breaks old and new versions.** Rolling back a container image does not necessarily reverse a schema or data migration. Review backward-compatible migration sequencing and data recovery.

**Case 5: A rollout destabilizes the service.** Use rollout status, metrics and an authorized rollback strategy. Kubernetes can roll back workload templates; application data and external side effects still need separate treatment.

## Kubernetes versus managed hosting: choose, don't assume

| Scenario | Candidate approach | Why |
| --- | --- | --- |
| One small Next.js UI with supported server handlers | Managed Git/Vercel-style platform | Less self-owned build/network/orchestration complexity |
| Long-running job with custom runtime packages | Reviewed container service or suitable job platform | Repeatable runtime, bounded execution and explicit owner |
| Multiple independently scaled services across a mature platform team | Managed Kubernetes may fit | Requires capacity, policy, service discovery, upgrades, on-call and cluster costs |
| Team that has not validated a product need | Prototype or managed hosting first | A cluster can distract from evidence and product decisions |

## From DevOps practices to platform engineering

**DevOps** emphasizes collaboration, automation, shared service responsibility and feedback between development and operations. **SRE** applies software methods to reliability and operation, including service objectives and incident response. **Platform engineering** creates internal products and supported workflows that make repeated engineering tasks easier for application teams.

A **golden path/paved road** is an approved default with documentation, templates, access policies, CI checks, observability and a clear support route. It should provide a useful escape hatch for justified exceptions. An **internal developer platform** may expose APIs, templates, CLI, a portal and infrastructure workflows; buying a portal alone does not create a functioning platform team.

For the fictional organization with three small applications, the first "platform" investment could be **one reviewed starter template** with:
- standard local setup, source/branch/PR guide and safe secrets handling;
- type checking, tests, dependency and build verification;
- consistent preview/release workflow and rollback instructions;
- logs/alerts, service ownership and data-boundary documentation;
- an exception mechanism for apps that need containers or special permissions.

This does **not** require a Kubernetes cluster, Backstage portal or custom provisioning service.

## Independent choice and diagnosis

**Scenario:** A team maintains three small web applications on a managed host. One periodic report worker requires a long-running background process. A proposal suggests moving all four workloads to Kubernetes. The same proposal adds a service named `notes-api-internal` with selector `app: old-notes`, while the Pod label is `app: notes-api`.

Write four sentences: (1) which requirement is actually unmet, (2) the least-complex candidate option, (3) the selector/endpoint failure, and (4) what evidence could justify Kubernetes later.

<details>
<summary>Answer key after your attempt</summary>

1. The long-running worker's runtime model is the unmet requirement; the web apps may not require a new platform.
2. Evaluate a managed job/worker platform or one container service first, including isolation, secrets, cost and operational ownership.
3. The Service selector does not match Pod labels; routing cannot reach the intended ready Pods even if their processes run.
4. Proven cross-service coordination, team capacity, policy requirements, managed cluster cost and incident ownership could justify orchestrating with Kubernetes. Document an ADR and measurable trade-offs rather than presume a cluster is better.

</details>

### Transfer task: design one golden path

Choose one fictional development workflow that repeats, for example, "start a safe preview for a new API." Produce an interface specification: expected inputs, defaults, owner, required approvals, outputs, error/recovery behavior, cost boundaries, accessibility/docs and a route for exceptions. Then explain how a new engineer verifies it independently.

**Rubric:** Learner can separate image/container/Pod/Deployment/Service; diagnose a mismatch; compare managed hosting and orchestration; and propose a small developer self-service default with an accountable owner. This is paper practice, not verified cluster competence.

**Next:** [Observability, reliability and incident response](observability-reliability-incidents.md) for deployed workload evidence; [IaC plan review](infrastructure-as-code-plan-review.md) for cloud-resource change control.

**Official references (reviewed November 6, 2026):**
- [Kubernetes: Deployments and rolling updates](https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/)
- [Kubernetes: Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes: Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [CNCF: What is platform engineering?](https://www.cncf.io/blog/2025/11/19/what-is-platform-engineering/)
- [Google Cloud: Platform engineering and golden paths](https://cloud.google.com/solutions/platform-engineering)

No infrastructure action is authorized by this lesson. Revalidate exact Kubernetes version, resource schema, security requirements and application health checks before a real implementation.
