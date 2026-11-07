import type { PlaybookOutline } from "./playbook-links.ts";

/** Original outlines, connected to existing work rather than separate products. */
export const salesPlaybooks = [
  {
    "id": "territory-planning",
    "title": "Territory planning",
    "purpose": "Choose where to spend selling time and make the trade-offs visible.",
    "when": "A new book, planning period or coverage change needs a focused account plan.",
    "before": "Define the commercial objective, ideal customer fit, exclusions, account ownership and available selling time. Separate known relationships from assumptions and keep existing opportunities visible.",
    "during": "Prioritize a bounded account set using fit, relevant evidence, relationship access and effort. Assign an owner, a reason to act and one next step; review partner overlap before outreach.",
    "after": "Review conversations, coverage gaps and time spent. Keep, change or remove priorities based on what buyers and partners actually confirm.",
    "artifacts": "Territory brief, ranked account worksheet, coverage map and weekly review.",
    "measures": "Priority accounts with an owner and next step, buying-role coverage, conversations held and qualified opportunities. Define the cohort, time window and available seller capacity.",
    "next": "Build a fictional ten-account plan with selection reasons, capacity limits, an ownership conflict and one deprioritized account.",
    "connections": [
      {
        "sourceId": "gtm-revenue-os",
        "contribution": "Planning context for coverage, ownership and capacity."
      },
      {
        "sourceId": "account-signal-engine",
        "contribution": "Research context for sources, account changes and a seller's reason to engage."
      },
      {
        "sourceId": "channel-territory-mapping",
        "contribution": "Partner context for account matching, overlap and ownership."
      }
    ],
    "advanceEvidence": "An account has a supported fit hypothesis, clear ownership and a feasible next action. Opportunity creation still requires buyer evidence under the team's agreed qualification rules.",
    "pauseWhen": "Ownership is disputed, fit is weak or the account cannot be served. Keep uncertain timing in research or nurture; estimated account potential is not forecast revenue."
  },
  {
    "id": "signal-to-conversation",
    "title": "Signal-to-conversation",
    "purpose": "Turn a verified account change into a relevant question and a useful conversation.",
    "when": "A public event or account change may affect a buyer's work, but the need has not been confirmed.",
    "before": "Check account fit, the original source, event date and freshness. Write down the observation, possible implication and what would disprove it; check existing activity and outreach ownership.",
    "during": "Choose a relevant role, test one problem hypothesis and offer a useful next step. Have a person review the message, evidence and contact preferences before outreach.",
    "after": "Record the actual response, corrected assumptions and agreed next action. Compare a single message variable across comparable cohorts before deciding what to repeat.",
    "artifacts": "Signal evidence card, account hypothesis, role-specific message, review checklist and response log.",
    "measures": "Reviewed signals, relevant replies, meetings held and buyer-confirmed next steps. Keep sent, delivered, replied and qualified denominators distinct.",
    "next": "Build one fictional evidence-to-message example with a valid trigger, a stale trigger and a buyer response that disproves the hypothesis.",
    "connections": [
      {
        "sourceId": "account-signal-engine",
        "contribution": "Research context for sources, account changes and a seller's reason to engage."
      },
      {
        "sourceId": "security-market-map",
        "contribution": "Category and buyer-role research to test in conversation. Market research does not establish an individual buyer's needs."
      },
      {
        "sourceId": "gtm-revenue-os",
        "contribution": "Planning context for coverage, ownership and capacity."
      }
    ],
    "advanceEvidence": "The buyer confirms a relevant problem or priority and agrees to explore it. A signal, reply or booked meeting alone does not establish a qualified opportunity.",
    "pauseWhen": "The source is stale or contradictory, the change has no plausible role relevance, ownership is unclear or the person declines contact. Silence stays unknown."
  },
  {
    "id": "discovery-qualification",
    "title": "Discovery and qualification",
    "purpose": "Understand the buyer's problem and decide together whether further work is worthwhile.",
    "when": "An initial conversation needs to become a shared problem definition and a justified next step.",
    "before": "Review the account hypothesis, likely roles and existing evidence. Prepare open questions about the current workflow, impact, urgency and decision process; keep unknowns explicit.",
    "during": "Let the buyer explain what happens today, who is affected and why change matters. Explore alternatives, decision roles and constraints. Distinguish buyer statements from seller interpretation.",
    "after": "Send a concise recap for correction. Record evidence, gaps and an agreed action with an owner and date. Bring in technical or commercial specialists when their input answers a real question.",
    "artifacts": "Discovery plan, evidence-and-gaps record, buying-group map, buyer recap and evaluation brief.",
    "measures": "Buyer-confirmed next steps, unresolved evidence gaps, evaluations with agreed criteria and later dispositions. Record why an opportunity stalls or is disqualified.",
    "next": "Build a fictional discovery recap with one confirmed problem, an unknown business impact, a missing stakeholder and a mutually agreed next step.",
    "connections": [
      {
        "sourceId": "security-market-map",
        "contribution": "Category and buyer-role research to test in conversation. Market research does not establish an individual buyer's needs."
      },
      {
        "sourceId": "gtm-revenue-os",
        "contribution": "Planning context for coverage, ownership and capacity."
      }
    ],
    "advanceEvidence": "The buyer confirms a meaningful problem, a responsible owner and a mutual next step. Start an evaluation only after agreeing its scope, success criteria, resources and decision review.",
    "pauseWhen": "There is no relevant problem, no feasible fit or no willingness to explore a next step. Missing evidence remains a gap to resolve, not a completed qualification field.",
    "guide": {
      "href": "/field-notes/enterprise-deal",
      "label": "Read the existing deal guide"
    }
  },
  {
    "id": "partner-co-selling",
    "title": "Partner co-selling",
    "purpose": "Coordinate around one buyer problem with clear roles and accountable follow-through.",
    "when": "A partner relationship or shared account creates a credible route to help a buyer together.",
    "before": "Validate account matching, relationship access and the partner's contribution. Resolve ownership, permitted information sharing, first contact and commercial responsibilities before engagement.",
    "during": "Agree the buyer problem and joint account plan. Name who introduces, who leads discovery, who supports evaluation and who owns the next action. Confirm each handoff is accepted.",
    "after": "Review the buyer's response and joint commitments. Update ownership and dispositions, resolve conflicts and use agreed definitions for sourced or influenced credit.",
    "artifacts": "Joint account brief, contribution map, introduction request, handoff record and shared review.",
    "measures": "Accepted introductions, meetings held, handoff acknowledgment, joint next steps and qualified outcomes. Avoid double-counting one opportunity across partners or campaigns.",
    "next": "Build a fictional co-sell plan with partner-led, vendor-led and joint actions, plus one disputed ownership decision.",
    "connections": [
      {
        "sourceId": "channel-territory-mapping",
        "contribution": "Partner context for account matching, overlap and ownership."
      },
      {
        "sourceId": "account-signal-engine",
        "contribution": "Research context for sources, account changes and a seller's reason to engage."
      },
      {
        "sourceId": "gtm-revenue-os",
        "contribution": "Planning context for coverage, ownership and capacity."
      }
    ],
    "advanceEvidence": "The partner accepts a specific action and the buyer agrees to engage on a relevant problem. An account match or partner introduction alone is not buyer qualification.",
    "pauseWhen": "Relationship access is assumed, ownership or incentives conflict, sharing is not permitted or the joint approach adds no buyer value. Resolve the issue before further contact."
  },
  {
    id: "champion-development",
    title: "Champion development",
    purpose: "Help an internal advocate explain the problem, gather input and build support.",
    when: "An interested contact needs to involve colleagues or present a decision inside their organization.",
    before: "Understand the person's goals, influence and willingness to advocate. Ask what their colleagues need to know and where they expect resistance.",
    during: "Build a buyer-owned problem summary, evidence and internal discussion plan. Offer relevant introductions and resources without scripting the buyer's approval.",
    after: "Debrief the internal conversation, test assumptions about support and update the stakeholder map.",
    artifacts: "Champion enablement kit, internal presentation outline and stakeholder gap plan.",
    measures: "Relevant introductions, confirmed decision roles, internal feedback and buyer-owned commitments. Enthusiasm is not proof of influence.",
    advanceEvidence: "The contact demonstrates internal advocacy and helps validate the actual decision path.",
    pauseWhen: "Support is assumed, the contact does not want the role or the plan depends on access they cannot provide.",
    next: "Build a fictional internal discussion brief with two unresolved stakeholder concerns.",
    guide: { href: "/field-notes/multithreading", label: "Explore the stakeholder mapping guide" },
    connections: [{ sourceId: "gtm-revenue-os", contribution: "Connect stakeholder evidence and buyer-owned commitments to the existing deal process." }],
  },
  {
    id: "competitive-selling",
    title: "Competitive selling",
    purpose: "Help buyers compare their real alternatives against the outcomes they need.",
    when: "A buyer is considering another vendor, an internal build or staying with the current process.",
    before: "Confirm the alternatives and the buyer's decision criteria. Check sources, dates and limitations for each material product claim.",
    during: "Ask how the alternatives address the priority workflow. Demonstrate relevant proof, acknowledge gaps and agree what remains to be tested.",
    after: "Record which criteria mattered, what was learned and which claims need correction or further review.",
    artifacts: "Buyer criteria map, sourced comparison brief, discovery questions and proof plan.",
    measures: "Buyer-validated criteria, resolved evidence gaps and recorded decision reasons. Category similarity does not establish a direct competitor.",
    advanceEvidence: "The buyer agrees which criteria matter and can assess supported evidence against them.",
    pauseWhen: "A material claim is unsupported, the comparison ignores the buyer's priorities or the solution cannot meet a necessary requirement.",
    next: "Build a fictional comparison that includes doing nothing and leaves one capability unknown.",
    connections: [{ sourceId: "security-market-map", contribution: "Use the existing category research and competitive-intelligence method to ground comparison claims." }],
  },
  {
    id: "stalled-deal-recovery",
    title: "Stalled-deal recovery",
    purpose: "Find out what stopped progress and agree whether the opportunity should continue.",
    when: "A mutual next step slips, a decision changes or an opportunity has no clear path forward.",
    before: "Review the last buyer-confirmed commitment, outstanding dependencies and changes in priority, ownership or timing.",
    during: "Ask directly what changed. Offer a useful decision conversation and distinguish an unresolved blocker from a polite absence of commitment.",
    after: "Agree a revised next step, an explicit revisit trigger or a closeout. Preserve the original history and update the forecast rationale.",
    artifacts: "Stall diagnosis, re-engagement message and continue/pause/close decision record.",
    measures: "Buyer-confirmed next steps, resolved blockers and aging or slippage by comparable cohorts. A reply alone does not restore buying readiness.",
    advanceEvidence: "The buyer confirms a reason to act and accepts a specific next step with ownership and timing.",
    pauseWhen: "There is no active priority, no feasible path through the blocker or no mutual commitment after appropriate follow-through.",
    next: "Build three fictional stalled opportunities with different reasons to continue, pause or close.",
    connections: [{ sourceId: "gtm-revenue-os", projectSlug: "revenue-intelligence", contribution: "Connect buyer evidence and stage history to the deal review and forecast rationale." }],
  },
  {
    id: "account-expansion",
    title: "Account expansion",
    purpose: "Identify additional customer value after the initial purchase.",
    when: "A customer has an adjacent team, use case or problem worth exploring with the account and success owners.",
    before: "Review the original buying goal, actual adoption, unresolved commitments and customer feedback. Validate evidence with the teams that own it.",
    during: "Explore an adjacent problem with the customer. Map the users, desired outcome, implementation effort and buying path before proposing more scope.",
    after: "Agree a bounded next step and success owner. Track the expansion opportunity separately from the existing contract and renewal.",
    artifacts: "Account review, value evidence, expansion hypothesis and stakeholder plan.",
    measures: "Customer-confirmed value, agreed evaluations and separately verified expansion outcomes. Usage estimates are not contracted revenue.",
    advanceEvidence: "The customer confirms an additional problem and a feasible path to validating value.",
    pauseWhen: "The original value remains unproven, delivery commitments are unresolved or the proposed scope does not match customer priorities.",
    next: "Build a fictional account review with one expansion hypothesis and one reason to wait.",
    connections: [{ sourceId: "gtm-revenue-os", contribution: "Reuse the customer-intelligence method and keep adoption, renewal and expansion evidence distinct." }],
  },
  {
    id: "deal-inspection-forecasting",
    title: "Deal inspection and forecasting",
    purpose: "Explain the forecast through buyer evidence, remaining decisions and risk.",
    when: "A seller or manager needs to review an opportunity, timing change or forecast commitment.",
    before: "Review stage history, buyer commitments, qualification gaps and the company's forecast definitions.",
    during: "Inspect the decision path, commercial dependencies and evidence behind timing. Coach one concrete next action rather than treating a score as certainty.",
    after: "Record the forecast judgment, assumptions, changes and owner of the next validation. Compare prior judgments with actual outcomes at a defined cutoff.",
    artifacts: "Deal review worksheet, forecast rationale and risk/action log.",
    measures: "Forecast error, slippage, stage aging and evidence completeness with consistent definitions. Opportunity stage and forecast category remain separate.",
    advanceEvidence: "Buyer-confirmed owners, approval steps and timing support the proposed stage and forecast judgment.",
    pauseWhen: "The forecast rests on a seller's preferred date, a completed demo or unresolved assumptions. Revise the judgment and define the next validation.",
    next: "Build a fictional review comparing seller expectation with buyer-confirmed timing.",
    connections: [{ sourceId: "gtm-revenue-os", projectSlug: "revenue-intelligence", contribution: "Use existing stage-history and revenue-review work to explain the evidence behind a forecast." }],
  },
  {
    id: "sales-coaching-onboarding",
    title: "Sales coaching and onboarding",
    purpose: "Turn an observed skill gap into focused practice and useful feedback.",
    when: "A new seller is learning the motion or an experienced seller wants to improve a specific skill.",
    before: "Choose one observable task and inspect an authorized work sample. Agree success criteria and separate missing knowledge from an execution or process problem.",
    during: "Model the task, let the seller practice and give specific feedback. Use a realistic fictional scenario and a rubric tied to the skill.",
    after: "Repeat the task, review the evidence together and agree where to apply the learning. Record completion only after the learner actually demonstrates the task.",
    artifacts: "Coaching session plan, practice scenario, rubric and application follow-up.",
    measures: "Observed task performance, repeated application and learner feedback. Course attendance or reading completion does not establish readiness.",
    advanceEvidence: "The learner demonstrates the agreed task and can explain the reasoning and next action.",
    pauseWhen: "The evidence does not identify a skill gap, prerequisites are missing or the rubric rewards activity instead of the intended behavior.",
    next: "Build a fictional discovery coaching session with a first attempt, feedback and a second attempt.",
    connections: [
      { sourceId: "gtm-revenue-os", contribution: "Use the existing sales-process reference to choose the task and its evidence criteria." },
      { sourceId: "truffle-camp", contribution: "Explore a security-training example of practice and feedback; adapt the learning pattern for sales." },
    ],
  },
] as const satisfies readonly PlaybookOutline[];
