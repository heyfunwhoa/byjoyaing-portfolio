# Builder Academy — From idea to verified release

**Track:** Builder · **Level:** Beginner · **Time:** Core path ~45 minutes; optional extensions  
**Status:** Lesson source for the existing Academy lesson library. The linked Academy page is a public educational prototype; it does not expose private Linear or GitHub repositories.

## What you'll learn

Translate a business idea into a small, verified software change, using a single source of truth for each kind of information. The benefit is less context switching, less duplicate administration, and evidence-based delivery rather than declaring something done because an agent said it finished.


## Choose a short learning path

Do not read every reference in one sitting. These suggested times are study budgets, not measured completion times. The first three stops form the core path; optional sections remain available for later.

| Stop | Read | Produce before moving on |
| --- | --- | --- |
| 1 — Save, check, publish (10 minutes) | [Start here](#start-here-save-it-check-it-publish-it), then [full head SHA](#full-head-sha-which-saved-version) | Explain why an open PR and an old passing test do not establish a live fix |
| 2 — Define the work (15 minutes) | [A small PRD](#a-small-prd-you-can-actually-use), [people and organizations](#people-and-organizations-who-fits-where), then [dependencies](#dependencies-what-this-work-needs) | Write one problem, owner, requirement, non-goal and dependency |
| 3 — Make a release decision (20 minutes) | [The worked exercise](#worked-exercise-one-lesson-edit-with-controls) below | Complete the handoff and recovery decision; compare with the answer key |
| Optional — Research and organization | PRD deep dive, team/persona maps and [evidence practice](#use-evidence-to-improve-a-product-decision) | Identify what a source supports and what still needs local evidence |
| Optional — Add agents (15 minutes) | [Agent companion](cursor-agent-workflows.md#11-add-agents-to-the-delivery-loop) | Give a worker permitted files, evidence requirements and a stop condition |
| Optional — Go deeper | Security review and repository learning links | Choose one control and identify its owner, implementation and test |

**Where do my answers go?** These Markdown exercises have no submit button or storage mechanism of their own. Write fictional answers on paper or in a practice note you control. They do not submit research to another application, update a CRM or award an Academy badge. The separate interactive Academy has its own storage behavior: inspect its current disclosure and implementation before assuming answers are private, synced, reviewed by a person or retained. Do not enter confidential information into a practice exercise.

**Your stopping point:** You can explain the decisions and produce the listed artifacts without copying the answer key. If you cannot, reread that stop and try a new fictional example. This is self-assessment, not certification.


## Start here: save it, check it, publish it

Imagine fixing a typo on a practice website. You want to save your work, check that it is right, and let visitors see the correction.

**Three big steps:**
1. **Prepare the change:** edit the text and save a recorded version.
2. **Check and accept it:** review the change and bring it into the main version.
3. **Publish and confirm it:** put that version on the website and check what visitors see.

The technical words below name smaller steps in that same process. You do not need to memorize them all at once.

### One example, from typo to live website

| What you do | What developers call it |
| --- | --- |
| Create a separate place to fix “Welocme” without changing the main version | Create a **branch** |
| Change it to “Welcome” and inspect the difference | **Edit** and check the **diff** |
| Record that correction in the project's history | **Commit** |
| Upload the recorded change so it is available on GitHub | **Push** |
| Open a proposal showing the correction | Open a **pull request**, or **PR** |
| Read the change and inspect the relevant automated results | **Review** and **checks** |
| Accept the correction into the main version | **Merge** |
| Publish the updated version to the website | **Deploy** |
| Open the published website and confirm it says “Welcome” | **Verify live** |

Some tools combine steps for you. For example, a browser editor may create the commit directly on GitHub, and merging may automatically start a deployment. The meanings still stay separate.

### What should I say when the PR is ready?

> Review the PR, fix any issues, and merge once the required checks pass.

If it changes a website, add:

> Then confirm the update is live and works as expected.

**Why not just say “commit”?** A commit records work. A merge accepts the proposed work into the main version. A deployment publishes a version for visitors.

### Two examples where you pause

- **A check fails:** investigate the failure, fix the problem, and check the updated PR again before merging.
- **The PR merged but the typo is still live:** inspect the deployment. The main version may be updated while the website still serves an older version.

### Try explaining it back

Your fictional button-label fix is committed and its PR is open. Someone says, “It is saved, so it must be live.” What would you check?

**Example answer:** “I would check whether the PR was reviewed and merged, whether the updated version deployed, and whether the published button shows the corrected label.”

When that feels familiar, continue below for the more detailed workflow and terminology.

## Beginner layer: dependencies and the whole delivery cycle

**Optional extension:** Read in short sessions: SDLC basics, idea/PRD practice, then version evidence. Allow 45–60 minutes including the optional exercises. **Primary references checked:** 2026-10-13. Start here after the typo example. No terminal, accounts or paid tools required.

**Outcome:** Explain what a change needs, identify the version being checked, and distinguish prepared, tested, merged and verified live.

### The life cycle in ordinary words

The **software development life cycle (SDLC)** is the repeating process of understanding a problem, building a solution, checking it, releasing it and maintaining it. Teams revisit earlier steps as they learn; this table is a teaching sequence, not a mandatory one-way process.

| Plain-language question | Technical term | Fictional lesson-editor example |
| --- | --- | --- |
| Who needs help, and why? | Discovery | A lesson author finds code editing cumbersome |
| What must work? | Requirements and acceptance criteria | Save one lesson without changing its URL or learner progress |
| How will the pieces fit? | Design, architecture and interface contract | Editor writes content; reader displays it; scoring remains code-owned |
| What must happen first? | Planning and dependency mapping | Agree on the lesson fields before connecting the editor and reader |
| Make the smallest useful change | Implementation | Connect one lesson end to end: a vertical slice |
| Does it behave as intended? | Verification and testing | Save, read, reload and inspect progress |
| Does it meet the learner's need? | Validation and user acceptance testing (UAT) | Watch someone complete the editing task |
| Inspect and accept the proposal | Code review and integration | Review a PR, then merge when authorized |
| Run the version on hosting | Deployment | Publish a build to a preview or production environment |
| Make it available to users | Release | Enable the lesson for learners |
| Notice problems and improve | Operations and maintenance | Investigate errors, repair defects and review updates |

A **PRD** records product requirements. An **issue** tracks a bounded task. **Scope** says what belongs in that task; **non-goals** say what is deliberately excluded. A **Definition of Done** describes the evidence expected before completion. Security, accessibility and privacy belong throughout this loop.

### Before the code: turn an idea into a product decision

An idea is a possible solution: “Let authors edit lessons without touching code.” Before assigning an agent to build it, ask who needs it, what is difficult today and what evidence would show improvement.

**Discovery** is learning about the problem. A **hypothesis** is an explanation or expected benefit that still needs testing. For example: “A structured editor might reduce accidental edits to assessment logic.” That is a hypothesis, not a measured result.

A **product requirements document (PRD)** is a shared explanation of what you intend to solve and what the solution must do. Its job is to preserve decisions beyond one conversation. It can be a short page for a small feature. A typo fix usually needs only a clear issue; a feature with several behaviors and dependencies benefits from a PRD.

This is a recommended teaching workflow, not a claim that every company uses identical documents.

| Artifact | The question it answers | Fictional example |
| --- | --- | --- |
| Product idea | What might help? | An easier lesson editor |
| Problem statement | Who struggles with what today? | Authors must edit code to change explanatory text |
| Discovery notes | What did we observe, and what is unknown? | Observe one author; do not invent time savings |
| PRD | What outcome and behavior do we intend? | Edit one lesson while keeping its identity and progress |
| Technical design | How will we implement the behavior? | Define editorial fields and connect them to the existing reader |
| Milestone | What meaningful checkpoint comes next? | One lesson edited, reviewed and rendered |
| Issue / user story | What bounded slice can someone complete? | Save the existing lesson's summary through the editor |
| Acceptance criteria | What observable evidence would satisfy the task? | Saved summary renders; ID and progress remain unchanged |
| Task brief | What may this agent do, with which boundaries? | Named files, base commit, checks and stop-before-merge instruction |
| PR and checks | What changed and what was verified? | Diff and test results tied to the current head |
| Release review | Should this version reach users? | Review risks, permissions, checks and recovery |
| Feedback and outcome review | Did it help enough to continue? | Observe the author again; compare with the baseline |

A **user story** describes a need from someone's perspective: “As a lesson author, I want to edit explanatory text so I can maintain the lesson without changing its assessment.” It helps explain intent, but still needs specific acceptance criteria.

### A small PRD you can actually use

**Fictional PRD: edit one lesson safely**

- **User and problem:** An author needs to update the existing verification lesson's explanatory text; editing the shared code catalog makes the boundary with assessment logic unclear.
- **Evidence and unknowns:** The current workflow requires a code edit. Whether a dedicated editor is easier remains untested; observe a baseline task before claiming improvement.
- **Desired outcome:** The author can make a permitted text edit, review the proposed change and see it in the reader.
- **Functional requirements:** Load the existing lesson; edit permitted editorial fields; save a valid record; show an understandable validation error for invalid input; render accepted content.
- **Quality requirements (non-functional requirements):** Preserve lesson identity and progress, keep controls usable by keyboard, and restrict editor access to the intended environment.
- **Non-goals:** Whole-curriculum migration, new scoring, reader accounts, AI tutoring and automatic publication.
- **Dependencies:** Agreed content schema, existing reader and progress behavior, editor package compatibility, and appropriate access for any hosted editing.
- **Acceptance criteria:** A valid edit persists and renders; invalid input gives feedback without replacing the valid record; the lesson URL and saved progress survive; another lesson still works.
- **Success measurement:** Observe completion of the same editing task before and after; record completion, errors and assistance needed. Choose a target after establishing the baseline.
- **Rollout and recovery:** Pilot one lesson. Keep review before release. Document how to restore its previous record and reader behavior.
- **Open decisions and owner:** The product owner decides whether local editing is enough for the pilot or hosted editing is required; missing hosted credentials must remain a recorded limitation.

**Functional** means what the product does. **Non-functional** describes qualities and constraints, such as accessibility, reliability or performance. **Acceptance criteria** judge whether a specific slice meets its requirements. **Success metrics** judge whether the result helps users. Passing tests does not establish a measured time saving.

### PRD deep dive: a shared decision document

**PRD** stands for **Product Requirements Document**. It explains the intended user problem, desired outcome, product behavior and boundaries clearly enough for collaborators to discuss and implement a solution. Its value is shared understanding and reviewable decisions, not its length.

Think of commissioning a workshop: who is attending, what they should learn, what must be provided, what is excluded and how success will be assessed. The PRD carries that intent. The implementation team still needs to work out the detailed design.

A PRD can evolve. “Approved” means a particular scope or revision has been accepted by its decision owner; it does not prove the product was built or authorize every operational action. A document written by an AI is a draft until its assumptions, evidence and decisions are reviewed.

### What belongs where?

| Document | Primary purpose | Example |
| --- | --- | --- |
| Product vision | Long-term direction | Help beginners confidently evaluate software changes |
| Roadmap | Sequence of intended outcomes | First one editable lesson, then a resumable journey |
| PRD | User need, desired behavior, constraints and success | Define what the editing pilot must preserve and demonstrate |
| Technical design / architecture decision record (ADR) | Implementation approach and trade-offs | Choose how the editor record reaches the reader |
| Issue | Bounded execution task | Implement one validated save path |
| Test plan | Verification approach | Exercise valid, invalid and denied saves |
| Release checklist | Readiness and recovery | Identify revision, remaining risks and rollback steps |

These boundaries are a practical convention; organizations use different names and formats. A PRD may include a technical constraint when it affects the product, while linking detailed implementation decisions elsewhere.

### Evidence-backed practices, with their limits

Primary sources reviewed **2026-10-13**. These are organizational guidance and published working practices, not controlled studies proving one PRD format outperforms all others.

| Practice | Supporting evidence | How to apply it here | Limit |
| --- | --- | --- | --- |
| Begin with the user's problem and observed evidence | GOV.UK user-needs guidance [P1] | Separate observations from guesses about what an author needs | Government service guidance requires adaptation to a personal prototype |
| Give collaborators concise goals, assumptions and linked context | Atlassian PRD guidance [P2] | Record why this matters, key unknowns and links to stories/designs | A vendor's recommended format is not a universal mandate |
| Make acceptance criteria describe observable outcomes | GOV.UK user-story guidance [P3] | “The saved summary appears after reload” is checkable | A checklist still needs well-chosen evidence |
| Validate the problem and evaluate the proposed solution | GitLab's development flow [P4] | Confirm the editing friction, then try the proposed editor with an author | This describes GitLab's process, not a requirement to copy every stage |

GOV.UK recommends refining needs as research develops [P1]. Atlassian describes a collaborative requirements document with assumptions and open questions [P2]. GitLab varies the process according to what is already understood [P4]. The lesson's synthesis is to keep the document useful and current, with review depth proportional to uncertainty and risk.

### A reusable lightweight structure

Use this as a teaching worksheet. It complements an owning team's established template; it is not a second organization-wide policy.

1. **Document control:** title, owner, status, revision, review date and intended audience.
2. **Problem and evidence:** who struggles, in what situation, observed examples, and assumptions.
3. **Outcome and why now:** desired user/business change, baseline or “not measured,” and how you will assess it.
4. **Scope:** first useful slice, explicit exclusions and existing behavior to preserve.
5. **User journey:** starting point, main steps, successful ending and failure/empty/denied states.
6. **Requirements:** stable IDs, priority and observable acceptance criteria.
7. **Constraints and dependencies:** permissions, data boundaries, accessibility, reliability, compatibility, cost and external services as relevant.
8. **Decisions and open questions:** options considered, decision owner, unresolved risk and what evidence would settle it.
9. **Delivery and validation:** linked milestones/issues, checks, rollout, recovery and post-release observation.
10. **Sources and change history:** evidence links and significant scope decisions with their rationale.

For one small change, several items can share a paragraph. Expand where misunderstanding would be costly. Dates and numeric targets must be justified; write “unknown” instead of inventing them.

### Turn vague requirements into checkable behavior

| Weak statement | More useful requirement |
| --- | --- |
| “The editor should be easy.” | An author can open the existing lesson, change its summary, save and find the result; observe where help is needed |
| “Saving must work.” | Given valid input, saving persists the summary and it appears after reload |
| “Handle errors.” | Invalid input shows an understandable message and leaves the previous valid record intact |
| “Keep it secure.” | In the intended production configuration, an unauthorized editor request is denied without modifying content |
| “Make it fast.” | Specify the action, test environment, workload, measurement and an agreed threshold before claiming a performance pass |

The first row needs usability observation; the other criteria can use appropriate automated and manual evidence. The compact **Given / When / Then** structure means precondition, action and expected result. It is an optional writing aid, not the only valid format.

**Example:** Given a stored lesson and existing learner progress, when an authorized author saves a valid summary, then the reader shows the new summary while the lesson ID and stored progress remain unchanged.

### Frequent mistakes and repairs

- **A solution disguised as a need:** “Users need an AI agent.” Ask what task users cannot complete today.
- **An unbounded wish list:** Choose one useful slice and put later ideas in a backlog.
- **Implementation chosen before constraints are understood:** Compare feasible options; link the design rationale.
- **No error or permission behavior:** Specify the important failure paths, not only the happy path.
- **Numbers without evidence:** Mark the baseline unmeasured and explain how it will be observed.
- **A stale document treated as authority:** Review changed decisions and reconcile affected issues, designs and tests.
- **A polished AI draft mistaken for discovery:** Verify claims and talk to or observe intended users where possible.

These repairs are Academy instructional recommendations informed by the sources; they are not measured performance claims.

### Review it before handing it to an agent

For this exercise, call a slice **ready for implementation** when its user/outcome, scope, critical dependencies, observable criteria and owner are clear enough to begin. This is a lightweight readiness heuristic. It does not require resolving every future question.

Have the product owner assess value/scope, an implementation reviewer assess feasibility, and a learner or user representative assess whether the journey makes sense. One person can cover several roles in a solo project; record uncertainty when independent feedback is unavailable. Involve security, accessibility or operations expertise when the change warrants it.

Link the accepted PRD revision in the agent brief. If new evidence changes a requirement, record the decision and update affected issues and checks. After release, revisit the outcome: shipped functionality may still fail to solve the user problem.

**Practice:** An AI draft says, “Add an autonomous editor that makes authors 50% faster; publish every save.” Identify three unsupported decisions.

**Answer key:** Automation is a proposed solution needing justification; 50% is unsupported without a baseline and measurement; automatic publication is a workflow/permission decision requiring explicit agreement. Rewrite the need as maintaining lesson text, pilot a reviewed save path, and measure author task completion before claiming improvement.

### PRD source notes

- **[P1] [GOV.UK — Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs):** supports evidence-based, problem-focused needs and iterative refinement.
- **[P2] [Atlassian — Product requirements](https://www.atlassian.com/agile/product-management/requirements/):** supports collaborative requirements, concise context, goals, assumptions, user stories and linked design material.
- **[P3] [GOV.UK — Writing user stories](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories):** supports outcome-oriented acceptance criteria and breaking large stories into smaller work.
- **[P4] [GitLab Handbook — Product development flow](https://handbook.gitlab.com/handbook/product-development/how-we-work/product-development-flow/):** illustrates problem validation, design, solution validation and build activities adapted to context.

No source above validates the fictional lesson-editor outcome or certifies that this portfolio follows its process.

### People and organizations: who fits where?

**Optional extension:** 20 minutes. The maps below are illustrative responsibility patterns, not a universal org chart or a recommendation to hire every role.

Separate three lenses:

- **Delivery roles:** people building and operating the product.
- **Customer personas and buying roles:** people using, administering, evaluating or purchasing it.
- **Decision authority:** who can choose scope, accept risk, spend money or authorize release.

A **persona** summarizes evidence about a type of user: their task, context, obstacles and success criteria. A job title alone does not establish those needs. An **organization chart** shows reporting relationships; it does not automatically explain workflow or decision rights. A **stakeholder** affects or is affected by the outcome.

GOV.UK describes multidisciplinary service teams whose skills evolve through the life cycle [O1]. Its discovery guidance includes learning about different users and expressing that understanding through artifacts such as personas [O2]. The commercial examples and timing maps below are Academy teaching synthesis.

### The team building the product

Read these as responsibilities that need coverage, not mandatory departments.

| Role or function | Plain-language contribution | Question they help answer |
| --- | --- | --- |
| Product manager / product owner | Frames outcomes and priorities | Which problem should this slice solve? |
| Designer / researcher | Investigates needs and tests the experience | Can intended users complete the task? |
| Engineering / technical lead | Designs, implements and reviews the system | Will these components work together? |
| Delivery manager / project manager / TPM | Coordinates execution and dependencies | Who is waiting on whom, and what decision unblocks them? |
| Quality / test specialist | Challenges behavior and missing coverage | Which failure would our current checks miss? |
| Security / privacy / legal | Reviews relevant boundaries and obligations | What may this feature access, retain or disclose? |
| Platform / operations / SRE | Supports deployment, reliability and recovery | Who notices and recovers from a failure? |
| Data / analytics | Defines useful measurement | What evidence would change our next decision? |
| Product marketing / enablement | Explains value and prepares adoption material | What can we accurately tell users and sellers? |
| Sales / solutions engineering | Brings field needs and evaluation evidence | What prevents a customer from buying or adopting? |
| Customer success / support | Brings onboarding friction and recurring problems | Where do users need help after launch? |
| Executive sponsor / finance | Sets investment boundaries and resolves trade-offs | Why fund this now, and within what limits? |

**PM** often means product manager; **TPM** means technical program manager; **PMM** means product marketing manager; **SRE** means site reliability engineering. Titles and authority vary. Product owner can be an accountability held by someone with another job title. A technical lead and an engineering manager may have different responsibilities. Ask who owns the specific decision.

Quality, security and accessibility need shared attention. A specialist's involvement does not transfer every responsibility away from the rest of the team.

### Roughly when each perspective matters

These are recurring collaborations, not a document passed between departments with no return path.

| Stage | Typical collaboration | Reviewable output |
| --- | --- | --- |
| Idea / discovery | Product, users, research, sales, support/CS | Observed problem, affected personas, alternatives and unknowns |
| PRD / scope | Product with design, engineering and relevant specialists | Agreed outcome, requirements, exclusions and decision owners |
| Design / feasibility | Design, engineering, security/privacy, operations | Tested concept, interface decisions and risk/dependency notes |
| Build | Engineering with product/design available for questions | Small PRs, tests and documented changes to assumptions |
| Review / validation | Reviewers, intended users, product and relevant specialists | Acceptance evidence, usability observations and unresolved risks |
| Release / adoption | Engineering/operations, product, PMM, support/CS and sales as relevant | Deployment evidence, recovery, release notes and accurate enablement |
| Operate / learn | Users, support/CS, operations, product and analytics | Incidents, adoption evidence and next prioritization decision |

Bring a perspective in early when it could invalidate the plan. For example, a privacy constraint that changes the data model belongs before implementation, not only in a final launch review. Customer-facing teams can contribute throughout; a feature request remains evidence to assess, not an automatic delivery promise.

### Customer organizations: user is not always buyer

A B2B product may serve several people with different concerns. The following is a fictional security-tool example, not researched personas for any named company.

| Persona / buying role | Task or concern to investigate | PRD implication | Evidence to seek |
| --- | --- | --- | --- |
| Practitioner / daily user | Investigate a finding without losing context | Useful workflow, evidence links and clear uncertainty | Observe an investigation task |
| Administrator / platform owner | Configure access and integrations | Setup, permissions, diagnostics and recovery | Observe setup and failed configuration |
| Champion | Build internal support for change | A defensible explanation of value and limitations | Validate how they secure agreement |
| Technical evaluator / security reviewer | Determine whether it fits requirements | Testable boundaries, compatibility and documentation | Agreed evaluation scenarios |
| Economic buyer / budget owner | Decide whether the investment is worthwhile | Outcome measures and commercial constraints | Confirm decision criteria and baseline |
| Procurement / legal / privacy reviewer | Evaluate contractual and data-handling terms | Document requirements or constraints needing decisions | Ask for actual review requirements |
| Executive sponsor | Align the change with organizational goals | Strategic outcome and ownership | Confirm sponsorship and authority |
| Support or service partner | Help others use or operate it | Troubleshooting and handoff information | Examine support tasks and failure cases |

One person can occupy several roles. A champion may lack budget authority; a CISO is not automatically the economic buyer for every purchase. Validate the actual organization instead of inferring its process from a title.

**ICP** means ideal customer profile: the type of organization a product is intended to serve. **Persona** focuses on a type of person and their needs. **Buying committee** describes participants in a purchase decision. **Jobs to be done (JTBD)** focuses on the progress someone wants to make in a situation. These lenses inform research; none replaces it.

For a persona worksheet, capture role, context, job, current workaround, pain, desired outcome, constraints, accessibility/support needs, decision authority and evidence/date. Mark untested descriptions as hypotheses. Avoid invented biographies or irrelevant demographic stereotypes.

### How this scales with an organization

| Setting | Plausible arrangement | What to keep explicit |
| --- | --- | --- |
| Solo builder | One person covers product, delivery, review and operations; agents assist | Which hat is making a decision, what is unverified, and release authority |
| Small startup | Founder/product and a few engineers share work; sales/CS bring customer context | One outcome owner, shared-file ownership and support responsibility |
| Growing company | Product/design/engineering squads with shared specialist support | Interfaces between squads, common platform dependencies and rollout ownership |
| Larger or regulated organization | Multiple product teams and specialist review functions | Applicable approvals, evidence retention, data ownership and escalation paths |

These are examples, not headcount thresholds or a maturity ranking. Add coordination when actual dependency or risk warrants it. Buying more tools or assigning more agent roles does not establish organizational maturity.

A **cross-functional team** combines different skills around an outcome. A **platform team** provides shared capabilities to other teams. A **matrix organization** can involve both functional reporting and project collaboration. Clarify actual decision rights in any structure.

### Who decides? A small decision record

For a consequential decision, Atlassian's **DACI** framework distinguishes the **Driver** coordinating it, the **Approver** deciding, **Contributors** advising and people **Informed** of the result [O3]. This is a decision framework, not a software permission system. This lesson does not require applying it to every edit.

Fictional decision: should the lesson editor support hosted publishing now?

- Driver: the product/delivery owner gathers options and blockers.
- Approver: the authorized product/service owner chooses scope and investment.
- Contributors: an author, engineer and relevant access/security owner assess usability and feasibility.
- Informed: support and anyone maintaining the learner experience.
- Record: options, evidence, decision, reason, date and the issues it changes.

Scope approval and permission to deploy are distinct. Name the authorized release owner explicitly. An AI assigned “reviewer” or “security agent” may inspect evidence, but that label supplies neither professional assurance nor organizational authority.

### Connect the people back to requirements

Synthetic requirement R1: “Authors can update a summary without changing learner progress.”

The author supplies the need; the learner is an affected user. Product defines scope and success. Engineering assesses storage and reader behavior. Design tests feedback and keyboard flow. Review checks the actual change and progress evidence. Operations owns the intended environment and recovery. Support needs an accurate explanation of where editing works. An agent can help perform bounded tasks within each role's authorization.

A sales leader can contribute structured evidence: affected segment/persona, workflow, frequency, impact, workaround, sources, uncertainty and urgency. Product evaluates it alongside other needs. Avoid promising dates or general availability before the owning team agrees.

### Practice: spot the missing people

A fictional buyer asks for automatic publication. Sales promises next week. An implementation agent adds a Publish button. The author likes it, but nobody checks reader progress, who may publish, or how support restores a bad edit.

Name the missing perspectives and decide what to do next.

**Answer key:** Involve the product decision owner to revisit scope and the unapproved commitment; an access/security owner for publishing rights; engineering/review for progress and failure-path evidence; operations/support for recovery; and affected learners for the experience. Record the buyer's request as input rather than treating it as everyone else's need. Keep the change in review until applicable decisions and checks are resolved. Do not create six new departments or six agents just to cover six questions.

**Completion evidence:** Map one fictional feature to its user, buyer/admin if applicable, decision owner, implementer, reviewer and operator. State one question each contributes and the artifact carrying its answer.

### Team and persona source notes

- **[O1] [GOV.UK — What each role does in a service team](https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team):** supports multidisciplinary skills, changing needs through the life cycle and shared quality responsibility. Its government roles are not a universal commercial org chart.
- **[O2] [GOV.UK — User research in discovery](https://www.gov.uk/service-manual/user-research/user-research-in-discovery):** supports researching different users and needs, including support/access needs, before treating persona descriptions as established.
- **[O3] [Atlassian — DACI](https://www.atlassian.com/team-playbook/plays/daci):** defines a practical decision-role framework. The fictional assignment above is an adaptation, not measured proof of effectiveness.

Sources checked 2026-10-13. Commercial-role examples, organization patterns and exercises are instructional synthesis, not claims about a particular employer, customer or target company.


### Use evidence to improve a product decision

**Optional practice (10 minutes).** A citation helps a reader inspect a claim. It does not automatically prove the claim applies to your users or that your implementation works.

Use three labels while learning:

| Label | Meaning | Example |
| --- | --- | --- |
| Source-backed guidance | An identified publisher recommends or defines something | GOV.UK recommends researching users' current tasks and barriers [O2] |
| Local evidence | An observation or test about the particular product, with its context recorded | A synthetic fixture passed on a recorded commit; this establishes only the asserted behavior |
| Hypothesis or teaching example | A plausible idea or invented scenario awaiting validation | “Authors will need less developer help” is an outcome hypothesis until evaluated |

**What the sources support:** GOV.UK's discovery guidance includes users, people supporting them, existing workflows and accessibility needs [O2]. Its team guidance describes several contributing skills and says the needed mix changes through the service life cycle [O1]. Atlassian presents DACI as a way to assign decision roles [O3]. These are practice guides, not controlled experiments showing that this exact organization chart, PRD template or agent arrangement is best.

**Apply, then verify:** In the fictional lesson-editor example, include the author, learner and support perspective in discovery. Ask how edits happen today and where people get stuck. Translate a confirmed problem into a requirement, then test that requirement. Whether the new workflow saves effort remains a separate outcome question.

#### A small evidence record

For each material claim, record:

- **Claim and decision:** What are we asserting, and what choice could it change?
- **Source and location:** Publisher, URL or authorized record, and the specific section supporting it.
- **Dates and context:** Publication/update date if available, date checked, population or product version.
- **Evidence type:** Guidance, vendor statement, observed task, interview, test result or hypothesis.
- **Limits and contradictions:** What does this not establish? What evidence disagrees?
- **Owner and next check:** Who reviews it, and what event would make it stale?

This record is a teaching recommendation. Adapt it to the owning project's existing evidence format; do not introduce another database just for this exercise. Keep sensitive records in their authorized system and use fictional examples here.

#### Worked example: avoid turning a source into a promise

**Fictional input:** Two practice authors say they ask a developer to change a lesson summary. This is an invented classroom observation, not real research.

**Reasonable PRD hypothesis:** Letting an authorized author propose a summary edit may reduce handoffs.

**Requirement:** The author can propose an allowed text change for review while stable lesson IDs and stored progress remain intact.

**Acceptance evidence:** Save/render behavior, denied edits and progress-preservation checks against the reviewed version.

**Outcome evidence still needed:** Observe whether intended authors finish the task, where they need help and whether review effort moves elsewhere. Two comments alone do not establish prevalence, willingness to pay or a percentage improvement.

**Counterexample to investigate:** An author may prefer a developer-managed workflow because edits are rare. That could change the priority even if the feature is technically feasible.

**Answer-key habit:** For any claim, finish the sentence “This source supports ___, but does not establish ___.” AI-generated summaries and multiple pages repeating one original claim are not independent confirmation.

### Practice across repositories without copying the lesson

The following is a learning map, not a live integration or delivery-status report. Links may require repository access. This guide remains usable without them.

| Learning need | Authoritative home / optional practice | How to connect it |
| --- | --- | --- |
| Understand PRDs, SDLC, roles and agents | This Academy guide and its [agent companion](cursor-agent-workflows.md#11-add-agents-to-the-delivery-loop) | Keep explanations and fictional exercises here |
| Reuse a PRD structure | [Technical Docs PRD template](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/templates/product-prd.md) | Start from the template; maintain actual requirements in the owning product repo |
| Practice customer/persona research and commercial decisions | [GTM Revenue OS customer intelligence playbook](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/docs/product/customer-intelligence-playbook.md) | Use its authorized-data boundaries and synthetic practice; the playbook is documentation, not a live customer integration |
| Explore staffing and revenue assumptions | [GTM Revenue OS](https://github.com/heyfunwhoa/gtm-revenue-os/blob/main/README.md) | Compare fictional scenarios; modeled capacity is not achieved revenue |
| Examine a research application's evidence handling | [Account Signal Engine](https://github.com/heyfunwhoa/account-signal-engine/blob/main/README.md) | Inspect current requirements and verification before claiming a pipeline or persistence feature works |
| Examine claim-to-source comparisons | [Security Market Map](https://github.com/heyfunwhoa/security-market-map/blob/main/README.md) | Practice checking original sources, unknowns and corrections; do not treat catalog inclusion as independent validation |
| Track implementation and review | Owning Linear issue and GitHub PR | Link requirements, dependencies, current commit and checks; do not mirror changing statuses in this lesson |
| Reflect on personal learning | An authorized private learning workspace | Keep private reflections separate; publish only deliberately sanitized learning examples |

Repository documentation was inspected on 2026-10-13 to identify these learning destinations. That inspection does not verify runtime behavior or production readiness. The links follow `main` and can change; record a commit permalink when using repository content as historical evidence.

**Documentation link versus software dependency:** Reading a linked template is a navigation choice. Fetching another repository's content during an app build or request creates a software dependency with access, availability and versioning consequences. This learning map adds documentation links only.

**Small next exercise:** Choose one fictional feature. Read the Academy explanation, use the existing PRD template if accessible, and write one persona hypothesis, requirement and evidence check in a practice note. Identify its eventual owning product repo. Do not open implementation work until it is prioritized; do not copy the lesson into every repo.


### Translate the PRD into work and evidence

Give requirements simple identifiers so people can trace decisions. This is **requirements traceability**.

| PRD requirement | Implementation issue | Acceptance evidence | Remaining outcome question |
| --- | --- | --- | --- |
| R1: edit permitted text | Add one editable summary field | Valid save persists and reader shows it | Can the author complete it without help? |
| R2: preserve learner state | Verify existing progress after editing | Seeded progress survives reload | Is the continuation experience understandable? |
| R3: respect editor boundary | Restrict editor to intended environment | Allowed and denied access checks | Does the chosen workflow fit the author? |

Tests should address the requirement's failure modes, not merely repeat how the code was written. A test that only finds a Save button does not prove saving persists.

Keep the PRD in its agreed authoritative home. Link it from issues and PRs. The PRD explains intended behavior; Linear tracks execution; GitHub records proposed and accepted changes. Copying the same changing requirements into multiple places creates **documentation drift**.

### When the idea changes mid-build

Suppose the author now asks for an AI tutor. That is a new product idea, not an automatic addition to the editor task.

Record the request, examine its value and dependencies, and decide whether it replaces current scope or becomes later work. This is **scope management** or **change control**. Update the PRD and affected acceptance criteria when a decision changes. Make sure the implementation owner reads that revision.

A **backlog** holds potential work; it is not a promise to build everything. **Prioritization** selects what deserves attention next. An **MVP** is a minimal useful version for testing a product hypothesis; a **vertical slice** is one thin end-to-end piece. Neither means skipping essential correctness or access controls.

### Practice: from idea to an agent-ready issue

Fictional idea: “Help learners resume their last lesson.”

Write: (1) one user/problem statement, (2) two requirements, (3) a non-goal, (4) a dependency, (5) one bounded issue, (6) one failure case and its acceptance evidence, and (7) one outcome observation after release.

**Example answer:** A returning learner loses their place. Remember the last lesson on this device and offer a working resume link. Exclude cross-device accounts. Depend on stable lesson IDs and existing storage behavior. First issue: reuse existing local progress to show one resume action. If the saved ID no longer exists, show a safe fallback instead of a broken link; test that fixture. Later observe whether the learner can resume without searching. Do not invent a completion-rate improvement.

**Agent assignment comes after these decisions:** give the implementation worker the issue, linked PRD, permitted files, acceptance criteria, dependencies and approval boundary. The worker can propose changes to the plan when evidence contradicts it; it should not silently redefine the product.

### Dependencies: what this work needs

Think about a fictional webinar: invitations need a registration page; the event needs a meeting service. Software dependencies work similarly.

| Kind | Meaning | Example |
| --- | --- | --- |
| Task dependency | One task needs another result first | Expand to three editable lessons after proving one |
| Package dependency | The app uses reusable software | A framework or Markdown parser |
| Service dependency | A feature calls another system | An email service delivers a contact message |
| Data dependency | A view needs records in an agreed format | Comparison cells need claims and source references |
| Access/configuration dependency | Work requires permissions or settings | A reviewer needs access to deployment records |

A **blocker** is a missing or failing dependency that prevents a particular next step. Missing production access may block live verification while local tests continue. Record precisely what is blocked.

**Upstream** produces something; **downstream** consumes it. An editor can produce a lesson record that a reader consumes. Their agreed fields are an **interface contract** or **schema**. Renaming a required field without updating consumers can be a **breaking change**.

Independent tasks may run **in parallel**. Dependent tasks need sequencing. A chain of dependencies that determines the earliest finish is the **critical path**. Adding more workers to unrelated tasks does not remove its blocker.

### Packages and lockfiles

A **direct dependency** is explicitly listed by your project. A **transitive dependency** is needed by one of its dependencies. A **development dependency** supports development, tests or builds; it can still execute code and create risk.

In an npm project, `package.json` declares packages and allowed versions. `package-lock.json` records a resolved dependency tree. It helps reproduce installations; it does not guarantee identical results across every operating system or configuration. See the [npm lockfile reference](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/).

An upgrade may fix a vulnerability or change behavior. Read its changes, keep the manifest and lockfile consistent, and verify the affected features. Practice next in [Lockfiles and reproducible builds](https://www.byjoyaing.com/ai-academy/dependencies/lockfiles).

### Full head SHA: which saved version?

A **commit** is a recorded checkpoint. Its **SHA**, or commit hash, identifies that commit. SHA stands for Secure Hash Algorithm. In a SHA-1 repository, a full identifier has 40 hexadecimal characters. A shortened display is convenient; retain the full identifier in a handoff.

A commit links a project snapshot with metadata and parent history, so identical files can occur in different commits. A SHA identifies a version; it does not prove quality or approval. [Git objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) explains the structure.

For a PR, **head SHA** means the latest commit on its source branch. The **base branch** is its destination, commonly `main`. A branch name can point to a newer commit later; a commit identifier keeps identifying that particular checkpoint. Local Git's `HEAD` identifies the current checkout and is not automatically the remote PR head.

### Follow the evidence when the version changes

Synthetic example: a reviewer approved proposal version A. The writer changes it to B. The approval evidence for A cannot establish that the changed B is ready.

| Observation | What you may conclude |
| --- | --- |
| Tests passed for A; PR now contains B | A's results alone do not verify B |
| B passes a test for saving a lesson | That tested behavior passed; progress preservation may still be untested |
| Required build was skipped | No build pass was established by that run |
| PR merged | Changes entered the destination; production may still serve an older version |
| Production deployment succeeded | Check the affected live user journey before claiming it works |

**Continuous integration (CI)** runs automated checks. Some PR workflows check a temporary merge with the base branch. Match evidence to the current proposal and relevant baseline; if either changes, reassess applicable checks. Status reports and enforced merge rules are separate. See [GitHub status checks](https://docs.github.com/en/pull-requests/reference/status-checks).

A merge or rebase can create new commit identifiers. Follow the PR's merge record and deployment revision rather than expecting the original PR head and production SHA always to be identical.

### What each test asks

| Technical word | Plain-language question |
| --- | --- |
| Unit test | Does this small piece behave correctly? |
| Integration test | Do these connected pieces cooperate? |
| End-to-end test (E2E) | Can the tested user journey succeed? |
| Regression test | Did we break a behavior that used to work? |
| Visual regression check | Did appearance change against the configured reference? |
| Accessibility check | Can people operate and understand the tested interface? |
| Smoke test | Do the most essential functions work after a change? |

A **merge conflict** is an edit Git cannot reconcile automatically. An **integration bug** can occur even after a clean merge when components disagree. A flaky test gives inconsistent results under apparently similar conditions; investigate it instead of repeatedly rerunning until green.

### Where the app runs, and how to recover

**Local** is a development environment. **Preview/staging** is a place to inspect a candidate. **Production** serves real users. Their data, permissions and configuration can differ.

A **build artifact** is the packaged output used to run an application. Deployment puts a version onto hosting; release makes a feature available. A **feature flag** can separate those events. Continuous **delivery** keeps changes ready for release; continuous **deployment** automatically releases changes that pass the configured gates.

**Monitoring** watches known signals. **Observability** supplies logs, metrics and traces to investigate behavior. An **incident** is a disruption requiring response; a **hotfix** is a focused urgent repair. **Rollback** returns to an earlier version, but does not necessarily undo data changes or sent emails. Data migrations need their own recovery plan.

### Paper practice: decide what is ready

Use fictional labels A/B/C instead of real commit IDs. Do not change a live repository.

1. Editor work needs a schema; an unrelated wording fix can start now. Which tasks run together?
2. The PR head is B. Tests passed for A; the build for B failed. What should happen next?
3. Tests for B pass after repair. The PR is squash-merged as C. What version should deployment evidence identify?
4. Production is inaccessible to the reviewer. Which completion claim must remain unverified?
5. Two branches merge cleanly, but one sends `heading` while the reader expects `title`. Name the problem.

**Answer key:** (1) The wording fix can run while the schema is defined; connect the editor after the contract is agreed. (2) Inspect B's failure, fix it, record the resulting new head and relevant results; A is insufficient evidence. (3) Trace the accepted changes to C and check the actual deployment's revision, then the live journey. (4) Production behavior remains unverified even if local tests pass. (5) An integration bug caused by a broken contract.

**Completion evidence:** Write a five-line handoff: change and scope; dependencies/blockers; PR and full head SHA; checks with pass/fail/not-run; release status and recovery. Explain why each line matters. This paper practice does not automatically award an in-app assessment pass.

**Next layer:** [Add agents to this delivery loop](cursor-agent-workflows.md#11-add-agents-to-the-delivery-loop). The basics still apply when an AI performs some steps.


## Worked exercise: one lesson edit with controls

**Scenario:** A fictional author wants to improve one lesson summary. The learner's existing progress must survive. You coordinate the work; a bounded implementation agent proposes the change; a human with the relevant authority decides whether to merge and release. This paper exercise does not describe verified production controls.

### First make the product decision

- **Problem:** The summary is unclear; whether a rewrite improves understanding remains a hypothesis.
- **Scope:** Change one permitted summary field.
- **Non-goals:** New accounts, scoring changes, AI tutoring, new integrations or curriculum migration.
- **R1:** The reviewed summary renders correctly.
- **R2:** Lesson ID and existing progress remain intact.
- **R3:** An unauthorized editor cannot write.
- **Outcome question:** Can an intended learner explain the summary more accurately after the change? Record observations rather than inventing improvement percentages.

### Map the data before assigning tools

A **data flow** says where information moves. A **trust boundary** is a point where permissions or assumptions change.

| Data | Intended home and movement in this scenario | Access / lifecycle question |
| --- | --- | --- |
| Proposed public lesson text | Author workspace → branch/PR → approved build → reader | Author proposes; reviewer checks; authorized publisher releases. Git history can retain old text after a revert |
| Learner progress | Existing learner-state store; excluded from the editorial change | Preserve it without copying it into prompts, PRs or fixtures; verify actual storage behavior separately |
| Verification evidence | Synthetic test result → PR → linked delivery issue | Record commit and check result; exclude tokens and real learner data |
| Diagnostic logs | Approved logging destination, if needed | Minimize fields; set access and retention; do not record full learner answers by default |
| Practice answers | Learner's chosen paper/private practice note | No automatic application handoff; learner decides whether to retain or delete |
| Copies and backups | Inventory actual exports, caches and backups before release | Deletion from one screen is not proof every copy disappeared; owner documents the applicable recovery/retention process |

Do not invent a universal retention period. Choose one for the actual purpose and system, with the responsible owner. Do not use a public Git commit to store information that must remain private.

### Turn the guardrails into evidence

A **control** is a rule or mechanism intended to prevent, detect or recover from a problem. The table specifies desired controls for this exercise; it does not assert they exist.

| Failure to prevent | Accountable role | Mechanism to inspect or implement | Evidence to request |
| --- | --- | --- | --- |
| Edit changes IDs or scoring | Product owner and implementer | Field/schema restrictions and scoped diff | Rejected forbidden-field fixture; stable-ID/progress regression result |
| Unauthorized write | Engineering/security owner | Server-side authorization where applicable | Allowed and denied requests; denied request causes no write |
| Agent exceeds its task | Coordinator | Scoped tool permissions and explicit task limits | Only permitted paths changed; unauthorized actions unavailable where enforceable |
| Old checks justify new code | Reviewer | Review current PR head and relevant CI results | Full head SHA plus applicable check results |
| Unapproved release | Release owner | Verified branch/environment rules, or disclosed manual gate | Current rule configuration or explicit manual approval limitation |
| Bad release persists | Operator | Stop/revert/redeploy procedure and recovery check | Synthetic rehearsal, restored rendering and intact progress |
| Hidden spending | Budget owner | No paid tools in this exercise; caps/approval for future activation | No paid calls; future estimates and actual usage tracked separately |

A prompt saying “do not spend” is an instruction, not a provider-enforced budget limit. Likewise, a release checklist is not a technical block on deployment.

### Walk through the handoffs

1. **Product owner:** approves the small requirement set and names the release decision owner.
2. **Coordinator:** gives the worker the requirements, allowed summary field, synthetic fixtures and stop-before-merge boundary.
3. **Worker:** prepares a branch/PR, inspects the diff, runs applicable checks and records the full head SHA. No real learner data or paid calls.
4. **Reviewer:** checks R1–R3 against evidence on the current version. Missing denied-write or progress evidence keeps the proposal in review.
5. **Authorized maintainer/operator:** only after approval, integrates and releases using the repository's actual workflow. A merge may trigger deployment; inspect this before acting.
6. **Operator:** verifies the deployed revision, rendered text and permitted learner journey. If access is unavailable, record live verification as blocked.
7. **Product owner:** reviews learner feedback. Correct implementation and improved understanding are separate questions.

### Recovery and correction

Suppose the summary is misleading after publication. Stop further publishing, identify the affected revision and its consumers, propose a corrected or reverted version, review it, then verify the replacement. Record the correction where readers of the original claim can find it when appropriate.

If progress was actually overwritten, reverting text does not restore the data. Stop affected writes and use the separately tested data-recovery procedure. Escalate when no verified recovery exists rather than claim that a Git revert repaired everything.

### Your five-line handoff

Fill this in with fictional labels; do not perform a real release.

1. **Scope:** requirement IDs, allowed change and non-goals.
2. **Data and owner:** stores/boundaries touched, decision owner and operator.
3. **Version and evidence:** PR reference, full head SHA, checks passed/failed/not run.
4. **Decision:** ready for review, blocked or authorized for a named action; unresolved evidence.
5. **Recovery and outcome:** recovery method, live-verification status and later learner observation.

**Decision drill:** Version A passed. The worker then pushed B. The B build passes, but no progress-preservation result or denied-write result exists. The reviewer cannot access production. Should this ship?

**Answer key:** Keep it in review. A's results do not establish B's behavior; obtain applicable R2/R3 evidence on the current version and inspect the diff. Production access blocks live verification, not necessarily the synthetic tests. Release requires its own authorization. If a later authorized release occurs, record actual deployed revision and verification; do not mark those steps complete in advance.

**Transfer check:** Apply the same five-line handoff to a fictional “resume last lesson” change. Identify one new failure case, such as a saved ID that no longer exists. Success means you can explain the dependency, denied/error path, evidence and recovery without relying on this example's wording.

### When stronger controls become necessary

Use changes in exposure as review triggers, not arbitrary company size.

| Trigger | Revisit before activation |
| --- | --- |
| Second user or separate organization | Identity, role/tenant boundaries, denied-path tests and access removal |
| Private or durable data | Purpose, minimum fields, retention/deletion, backups and restore evidence |
| Scheduled or autonomous agent | Limited credentials, retries without duplicate side effects, cancellation, audit and failure alerts |
| Paid API or larger workload | Cost estimate, request/concurrency ceilings, retry budget and authorized spend limits |
| External publication or synchronization | Human publication decision, source permissions, correction/retraction and downstream copies |
| Business-critical use | Service expectations, incident owner, monitoring, recovery and dependency failure behavior |

These triggers are instructional synthesis applying the guide's source and ownership principles. They are not a compliance certification or claims that the portfolio has implemented these controls. Shared standards live in their owning documentation; each product must supply its own implementation evidence.


## Add the security layer when you are ready

Continue with [Developer tools and AppSec: follow one change](developer-tooling-appsec-workflow.md). Start with IDEs and AI assistants, then Git history, pre-commit and CI/CD checks. Follow a fictional credential exposure into AppSec controls and specific MITRE ATT&CK techniques. The final layer introduces SSDF, ASVS, SAMM and CWE, with official sources and a practice exercise.

## How the wider project fits together

- **Strategy & prioritization:** Why do this before other work? Evaluate impact, urgency, dependencies, effort, and risk. Treat scoring as a decision aid; security incidents and hard deadlines override it.
- **Project:** What outcome are we pursuing?
- **Milestone:** Which meaningful checkpoint moves us toward the outcome?
- **PRD (in the product repository):** What user problem, requirements, constraints and acceptance criteria define success?
- **Linear issue:** What small deliverable is next, who owns it, and what blocks it? Keep the issue brief and link to the authoritative PRD.
- **Cursor / engineering environment:** Implement the change on a feature branch with tests.
- **GitHub:** Hold the code and PR review, plus CI/deployment evidence.
- **Verification:** Check acceptance criteria and the relevant user journey before moving the issue to Done.
- **Learning:** Retrospect on the process with a synthetic, publishable example; keep private reflections in a private workspace.

## Commit, review, merge and deploy: what to say next

A typical branch workflow is **edit → inspect the diff and run relevant checks → commit → push → open a PR → review and CI → fix issues → merge → deploy when needed → verify the published result**. Review and CI can run in parallel. Repeat commit, push and review when fixes change the PR.

| Term | Plain-language meaning |
| --- | --- |
| Commit | Record a snapshot in Git history; saving a file alone is not a commit. |
| Push | Upload local commits to the remote branch. Web-based tools may commit remotely without a separate local push. |
| Pull request (PR) | Propose integrating a branch and collect discussion, review and check results. |
| Review | Inspect the changes for correctness, scope and evidence. Review can happen before committing and again on the PR. |
| Checks / CI | Automated validation for a particular commit; confirm what ran and what it proves. |
| Merge | Integrate the approved change into the target branch, commonly main. |
| Deploy | Publish a revision to an environment; a preview and production are different destinations. |
| Verify live | Confirm the intended deployed revision and affected user behavior. |

**Useful instruction when a PR already exists:** “Review the PR, fix any issues, and merge once the required checks pass on the latest commit.”

For a deployed application, add: “Then verify the production deployment and affected user journey.” If merge triggers automatic deployment, inspect that deployment rather than starting a duplicate. Preview deployments may happen before merge.

“Review then commit” is appropriate for reviewing uncommitted edits. Once the PR exists, the usual next action is **review then merge**; fixes still require new commits and another check of the updated PR. Green checks do not replace review or authorize bypassing repository rules.

A repository-only Markdown change may be complete after merge and verifying the file on the target branch. Documentation rendered into a website still needs publication/deployment verification. A docs-only commit can also trigger a configured deployment automatically; check the actual workflow.

### Quick practice: identify the next action

1. Your edits are saved locally but absent from Git history. **Inspect the diff, run relevant checks, then commit and push.**
2. A PR is open but a required check failed. **Investigate and fix it; push the fix and review the latest results before merging.**
3. A PR merged but production still shows the old version. **Check deployment status and revision, then verify the affected page after publication.**
4. You read the lesson but did not attempt the exercise. **Record reviewed, not practiced or passed checks.**

Source: [GitHub Docs — GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow), checked 2026-10-13. The deployment steps above describe this lesson's delivery convention; each repository determines its own deployment triggers.

## Follow a fictional revenue-planning product

A founder-facing simulator needs to represent a manager who also sells. Imagine a fully productive seller with an annual quota of $800,000, expected attainment of 70%, and 45% selling allocation. The model gives **$252,000 in expected new ARR** ($800,000 × 0.70 × 0.45). These are entirely fictional classroom assumptions, not measured customer revenue or an investment recommendation.

| Milestone | One representative issue | Acceptance evidence |
| --- | --- | --- |
| M1 — Correct the model | Count a fractional player-coach, without counting the same capacity twice | Tests cover month-by-month totals, ramps and no double-counting; PR reviewed and merged |
| M2 — Support a hiring decision | Compare no hire vs. hiring in month 6 or 12 | Uses M1 capacity; includes hiring cost, cash impact, pipeline constraints and trade-offs |
| M3 — Verify and explain | Review end-to-end behavior and prepare a brief for a fictional founder | Demonstration and test evidence, documented limitations, sanitized learning recap |

A correct model precedes a hiring recommendation. M3 captures not just *what shipped*, but whether the system produces a defensible decision.

## Status ≠ priority ≠ milestone

| Status | Meaning |
| --- | --- |
| Backlog | Worth considering, but not committed as the next deliverable |
| Todo | Selected and ready for upcoming work |
| In Progress | Being actively implemented |
| In Review | Implementation exists; peer review, checks and acceptance verification remain |
| Done | Acceptance criteria are met, changes are merged when applicable, and evidence exists |

A *high-priority* issue may stay in Backlog because it is blocked. One milestone can contain many issues; for a tiny pilot, one issue per milestone can suffice.

## Avoid accidental duplication

| Kind of information | Source of truth | Consumers |
| --- | --- | --- |
| Shared software standards, ownership rules, portable contracts | Technical Docs | All participating repos link to them |
| Product PRD and code | Product GitHub repository | Linear links to requirements; Cursor edits code |
| Delivery status, dependencies and priorities | Linear | Brief references elsewhere, not duplicate status boards |
| PRs, tests and code-level review | GitHub | Linear links to the PR |
| Research and decisions | Appropriate research workspace | Link or cite approved research only |
| Private learning reflections | Private learning workspace | Never published or synced to employer systems |

**Important distinction:** GitHub pull-request linking and GitHub Issues synchronization are separate. You can use Linear as the issue backlog and GitHub for PRs without automatically creating mirror tickets in GitHub Issues. Connect new repositories only when actual delivery work needs them.

## Try it yourself (10 minutes)

1. Invent a small product bug or use this fictional player-coach example.
2. Write a project outcome and three milestone headings.
3. For M1, write one issue with an observed problem, a pass/fail acceptance criterion, one edge case and a test.
4. Put M1 in Todo, M2 and M3 in Backlog; add the dependency. Explain when each status should change.
5. Draft a branch name containing the issue identifier. Explain how a linked GitHub PR and CI results provide evidence.
6. Review the result: Did the test cover the user's problem? Was any claim unverified? Would you mark it Done?
7. Record one improvement for the next iteration. Do not create duplicate GitHub Issues merely to match Linear.

## Practical guardrails

Use one Linear team initially; activate projects only for current deliverables; limit simultaneous work; check dependencies in weekly triage; review outcomes at milestones. Keep personal code, public source material and employer-controlled operational records separated. A personal repository or private AI workspace is not automatically authorized for an employer's CRM data or customer notes.

## Security review before merge (additional 10-minute practice)

**Learning objectives:** explain what each check can find; distinguish authentication from authorization; choose denied-path tests; separate configured, passing and enforced controls; decide when a release still needs verification.

This is a fictional account-research application with synthetic data. It is teaching material, not a live audit or claim about any private project's security.

### What a pull request and CI do

A pull request proposes a change for review. Continuous integration (CI) runs repeatable checks against a particular commit. A check can pass even when an important requirement has no test. The question is: **what did this check actually prove?**

| Check | What it helps find | What it cannot prove |
| --- | --- | --- |
| Lint and TypeScript | Code mistakes, inconsistent types and some risky patterns | That the logged-in user is allowed to access an account |
| Automated tests | Whether the behaviors asserted by those tests work | Untested requirements or actual production setup |
| Production build | Whether the app can be assembled in the tested environment | That it is deployed or protected |
| Secret scanning, such as TruffleHog | Credentials accidentally added to source/history; coverage depends on detector and configuration | That every possible secret was found or exposed credentials were revoked |
| Dependency scanning, such as npm audit or Trivy | Known advisories in included packages | All unknown flaws, actual exploitability or all build-tool risks |
| Static application scanning (SAST), such as Semgrep | Suspicious code patterns matched by enabled rules | Complete business-specific authorization |
| Configuration scanning, such as Trivy | Known risky settings in supported configuration files | The actual live hosting, database or identity settings |
| Human diff review | Whether the change matches intent, boundaries and evidence | An automatic guarantee of correctness |

These tools are examples, not a requirement to install every scanner. Review existing checks first. Overlapping tools can add cost and noise; keep rules relevant to the stack and verify how findings affect job exit status. Dependency review examines changes introduced by a PR [1]. Scanners vary in licensing, coverage and repository availability.

### Authentication asks who; authorization asks what they may do

A session establishes identity. Server-side authorization decides which account or operation that identity may access. An identity SDK does not automatically supply your app's ownership rules.

A machine token identifies an authorized background caller. Cron and webhook credentials should be limited to their intended purpose. Deny requests when required credentials are absent. A logged-in user and a valid machine caller are different trust boundaries.

| Synthetic test | Required evidence |
| --- | --- |
| Logged-out visitor requests an account | Denied; account data is not returned |
| User A requests User B's account | Denied; private fields do not appear |
| User A attempts to modify or export User B's account | Denied before any write or export |
| Cron receives a missing, wrong or webhook-only token | Denied; scheduler is not called |
| Webhook receives an invalid token and malformed JSON | Denied before parsing, ingesting or syncing |

These are **denied-path tests**: intentionally try something that should fail and assert both the response and the absence of side effects. A test that expects “401 Unauthorized” without checking whether work already ran can miss a dangerous ordering mistake. Use synthetic credentials and mocked providers; no live attacks or customer data are needed.

### Match review depth to the change

| Change | Appropriate focus |
| --- | --- |
| Copy, layout or lesson text | Existing source/dependency hygiene, accurate claims, accessibility and normal quality checks |
| APIs, fetching, imports or integrations | Input validation, URL safety, credentials, rate limits, timeouts and paid-provider controls |
| Account permissions, private data or durable automation | Trust boundaries, denied reads/writes/exports, least privilege, data integrity and recovery |

For imports, check malformed files and size/row limits. For exports, check spreadsheet formula injection and excluded private fields. For URL fetching, check unsupported schemes, credentials in URLs, private/local destinations, redirects and DNS behavior relevant to the implementation. A hostname string check alone is not a complete defense against server-side request forgery.

For AI research, treat retrieved text as data: it cannot authorize tool calls, data publication, spending or changes to permissions. Review ingestion and publication boundaries separately.

### Configured, passed, enforced and deployed are different

| State | Evidence |
| --- | --- |
| Documented | A policy says the control should exist |
| Configured | A workflow or test is present |
| Passed | The applicable job succeeded on the reviewed commit |
| Enforced | Verified repository rules prevent merging when that required check fails |
| Released and verified | The intended change is deployed, and the permitted user journey plus access boundaries were checked |

Record the exact reviewed commit. New commits invalidate earlier approval evidence for the changed code. A queued, failed, cancelled or unexpectedly skipped required check is not a pass. GitHub status checks report results; repository protection/rules determine whether results block merging [2].

If platform enforcement is unavailable, explicitly record a **manual maintainer gate**: review the diff, check every applicable result on the latest commit, inspect acceptance evidence and approve deliberately. A manual gate helps discipline but cannot technically stop direct pushes or bypasses. Keep data-bearing repositories private; check current plan capabilities rather than publishing private code to obtain a feature.

### Secure the checks themselves

Use minimal workflow-token permissions, review third-party Actions and pin them to verified immutable commits [3]. A pinned wrapper action may still download a mutable scanner image or ruleset: inspect the full execution chain. Keep updates reviewable through the existing dependency-update process.

PR jobs should use synthetic fixtures and avoid production credentials, real database writes and paid provider calls. Do not execute untrusted PR code in a privileged workflow with production secrets. For production dependency auditing, remember that development dependencies also execute during installs and builds; review that separate exposure.

Do not silently disable a failing scanner or add broad ignore rules. Explain false positives and record narrowly scoped exceptions with owner, rationale, mitigation and review date.

### Practice: would you release this?

A fictional PR adds “Export accounts.” Secret, dependency and static scans pass. A mock-based test confirms the download works for its owner. There is no wrong-owner test. The repository has no verified required-check enforcement.

1. Name the data boundary that changed.
2. Write an acceptance criterion for a denied export.
3. Describe how you will prove no file was generated and no private fields escaped.
4. Identify the merge-control limitation and the interim process.
5. List what must be checked after deployment, separately from CI.

**Knowledge check:** Which action is justified?

- A. Release now because every scanner passed.
- B. Keep the PR in review, add denied-export evidence, inspect the actual diff and latest checks, document the enforcement limitation, then obtain approval and verify the deployment separately.
- C. Install another scanner and assume it supplies account permissions.

**Answer: B.** The scans did not establish wrong-owner isolation. More scanning cannot substitute for a missing business-specific permission test.

### Why this matters to a seller and future sales leader

As a rep, you can explain the evidence precisely: “Our tests verify this boundary,” rather than “CI says we are secure.” As a leader, you can assign an owner, define the release gate and keep CRM/customer information inside approved systems. These are useful operating habits; they are not certification, legal permission or proof of customer-ready security.

Use the existing delivery loop: requirement → scoped change → test evidence → review → approved merge → deployment verification → learning. Technical Docs owns shared policy; the product repository owns implementation and proof; the Academy teaches with publishable examples.

### Security sources

1. [GitHub Docs — Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review): explains dependency changes and configurable enforcement, not business-specific permissions.
2. [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks): explains reported results; a successful check alone does not establish branch protection or deployed behavior.
3. [GitHub Docs — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use): supports least privilege, action pinning and untrusted-input protections; applying the guidance is not certification.

## References

- [Linear — GitHub integration](https://linear.app/docs/github)
- [GitHub — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [Portfolio development workflow](../development-workflow.md)

**Publication rule:** This is a synthetic instructional example, not a live status dashboard. Verify private project state directly in its owning Linear/GitHub workspace. Do not publish actual private work records, company details or private Joy Index reflections.
