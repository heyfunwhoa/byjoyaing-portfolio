# Infrastructure as Code: inspect the change before applying it

**Builder Academy companion · Intermediate foundations · 25–35-minute study budget**  
**Status:** Proposed **paper-based, synthetic** lab on a draft branch. No cloud provider, OpenTofu/Terraform command, paid resource, credential, state backend or deployment is configured by this document. Not a registered Academy lesson or a graded credential.

**Start with:** [From idea to verified release](idea-to-verified-release.md) → [Reading code and YAML](reading-code-and-yaml.md) → [From source code to running software](source-to-running-software.md). Use the same fictional discovery-note API throughout.

## Why infrastructure exists before IaC

A web application needs an execution environment, network access, configuration and sometimes persistent storage. **Infrastructure** refers to the compute, network, storage, identity and supporting services it depends upon. A service hosted entirely on a managed platform still consumes infrastructure, but the provider handles some of it. A browser-facing application that stores no durable information may need no developer-managed database.

| Resource | Example concern | Typical owner to clarify |
| --- | --- | --- |
| Compute/runtime | Where does the server process run and restart? | Hosting/platform operator |
| Network and DNS | What can access it? Which name and TLS certificate? | Platform/network owner |
| Database and object storage | What data persists, with what residency, backups and recovery? | Data/application owner |
| IAM and secrets | Which workload is allowed to read or change which resource? | Security/platform owner |
| Environments | Which resources are dev, preview, staging or production? | Product/release operator |
| Logs, budgets and alerting | How will failures, resource waste and unexpected charges be detected? | Operability/FinOps owner |

### From manual setup to repeatability

Traditionally, an operator might click through a cloud console or run imperative scripts ("create this, then change that"). Those approaches can be reasonable for small or emergency tasks but can become difficult to reproduce, review and audit. **Declarative IaC** expresses desired resources, and a provider-aware engine computes a plan for reconciling those declarations with observed state. Declarative does not mean harmless, automatic or guaranteed idempotent in every external effect.

OpenTofu and Terraform use configuration files, providers and state to plan resource changes. CloudFormation, Pulumi, CDK, Ansible and other systems offer different models and trade-offs; they are not interchangeable abstractions. Compare adoption, provider support, state, workflow, cost and operational ownership before picking.

**Crucial separation:** IaC provisions or configures **infrastructure resources**. A Docker image packages a workload; a container runtime runs an instance; CI tests/builds; deployment machinery selects the application version. A provider may combine several roles behind one UI, but the evidence remains distinct.

## Read a fictional desired-state proposal

The following is **illustrative pseudo-configuration**, intentionally not a runnable provider schema:

~~~text
resource "teaching_object_store" "note_exports" {
  environment       = "preview"
  public_read       = false
  retention_days    = 7
  delete_protection = true
}
~~~

The fictional product requirement is: "A preview environment may temporarily store synthetic export files. Production notes must remain untouched. The bucket must not be public."

Explain each setting in product, data and security terms. Ask who owns access control, retention, cost limits and the decision to provision it.

### What state, plans and drift mean

- **Configuration:** the proposed desired infrastructure, versioned like source.
- **State:** records associations between managed resource addresses and real objects, used to plan changes. State may contain sensitive metadata. Locking, restricted access, encryption and controlled backups can matter.
- **Plan:** describes the changes the tool *proposes*; a plan is not an apply or a deployment.
- **Apply:** invokes provider actions to realize approved changes. Outcomes may partially fail; inspect actual state and provider results.
- **Drift:** actual resources differ from the declared or recorded expectation, perhaps due to console edits or external changes. A subsequent plan may propose reconciliation, but that plan still requires review.
- **Destroy/retire:** removing a resource is not always reversible. Data backups, retention, dependent services, legal obligations and change authorization may need separate handling.

An approved plan can still be stale by the time it is applied. Confirm plan inputs, state version/locking, environment identity, permissions and relevant policies before high-impact changes.

## Three practice plans, one requirement

Assume the fictional developer asked to create only **one private preview export store**, with seven-day retention. The following output is invented classroom notation, **not actual OpenTofu output**:

~~~text
PLAN A / preview:
  + create note_exports_preview (private=true, ttl_days=7)
  unchanged notes_db_production
  unchanged production_network

PLAN B / preview:
  + create note_exports_preview (private=false, ttl_days=unlimited)
  ~ change production_network inbound_rule: private → public

PLAN C / preview:
  + create note_exports_preview (private=true, ttl_days=7)
  - destroy notes_db_production (contains customer notes)
~~~

Write a three-column decision record: **plan**, **go / stop / investigate**, **reason and evidence needed**. Do not infer an actual cloud configuration from this teaching output.

<details>
<summary>Answer key, after attempting</summary>

- **A: candidate for approval, not automatic execution.** It matches the stated resource intent, subject to ownership, budget, identity, provider configuration, access controls, state/version checks and approved release process.
- **B: stop.** It conflicts with private storage and unexpectedly changes a production network boundary. Fix the configuration and inspect a fresh plan.
- **C: stop and escalate.** The unrelated production database deletion is destructive, could affect access and durability, and is not authorized by the preview requirement. Do not rationalize it as "cleanup." Confirm intended resource references, state, dependency effects, data protection, backup and authorized decisions.

A green app test suite cannot approve B or C. An apparently safe **A** still requires the normal authorized process; a written answer is not permission to apply it.

</details>

## Interpret drift and a failed operation

**Scenario:** An operator changed preview storage access through the console after the last reviewed plan. A new plan wants to restore the original private setting. Meanwhile the last attempted apply reported a timeout.

1. What fact must be checked before claiming the earlier apply did nothing?
2. Why is "the plan looked safe last week" not sufficient evidence now?
3. If the manual change was an approved emergency remediation, should automation overwrite it without coordination?

<details>
<summary>Expected reasoning</summary>

1. Provider resource state and the IaC state/results, including any partially completed effects; timeout or lost acknowledgement does not prove no resource was created/changed.
2. Environment, configuration, provider data, policy and state may have changed. Inspect a current reviewed plan and actual impact.
3. No. Reconcile ownership and incident history, decide desired policy, then plan an authorized action. Declaring desired state is not authority to override unreviewed exceptions.

</details>

## Architecture decision: when not to add IaC

Compare two fictional products: (1) a simple public event page on a managed static host with no custom cloud resources, and (2) an API needing separate networks, storage, IAM, multiple environments and controlled production changes. Write one paragraph on whether infrastructure tooling is justified for each. More complex tooling has training, state, operating and cost overhead; "as code" is a technique, not the definition of production quality.

**Evidence of competence:** On a *new* plan, identify each resource affected, whether it is create/update/replace/destroy, its environment and data sensitivity, any permission/cost implications, and who can approve. Separately name what would verify the application release. A correct multiple-choice answer alone is not evidence of live IaC operational skill.

## What comes next

Follow [Systems design and architecture trade-offs](systems-design-tradeoffs.md) to understand resource boundaries, then the [Kubernetes and platform engineering companion](kubernetes-platform-engineering.md) if workload orchestration is actually needed. The [reliability and incident companion](observability-reliability-incidents.md) covers detecting drift, failures and user impact after release.

**Official concept references (reviewed November 6, 2026):**
- [OpenTofu: State](https://opentofu.org/docs/language/state/)
- [OpenTofu: Resource behavior](https://opentofu.org/docs/language/resources/behavior/)
- [OpenTofu: plan command](https://opentofu.org/docs/cli/commands/plan/)
- [OpenTofu: state operations and risk](https://opentofu.org/docs/cli/state/)

Do not use this lesson's pseudo-configuration or teaching plan as production IaC. Real providers and tool versions require their own documentation, permission review, tested state backend and rollout plan.
