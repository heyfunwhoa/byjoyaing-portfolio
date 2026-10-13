import type { Lesson } from "../ai-academy.ts";

/** Original public teaching; all scenario data is fictional. */
export const enterpriseEvaluationLessons: Lesson[] = [
  {
    slug: "sales-frameworks",
    title: "Choose a sales framework for the job",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "A methodology helps you think; a process describes stages; a checklist records actions. Use a framework to answer a specific question rather than forcing every acronym into every call.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "SPICED organizes customer context: Situation, Pain, Impact, Critical Event, Decision. SPIN groups questions around Situation, Problem, Implication and Need-payoff.",
      "MEDDIC covers Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain and Champion. MEDDICC adds Competition; MEDDPICC adds Paper Process. MEDDICC\u2019s current teaching uses Implicate the Pain.",
      "Sandler helps establish mutual expectations. Challenger emphasizes teaching, tailoring and guiding decisions. Command of the Message connects customer outcomes and differentiated value.",
      "BANT covers Budget, Authority, Need and Timeline; treat missing budget as a question about funding, not an automatic rejection.",
      "These are practitioner frameworks. This combined teaching sequence is an original synthesis, not a certified course or proof of improved win rates.",
    ],
    exercise:
      "For each unknown in the scenario, choose one framework and explain what evidence you would seek. Do not write seven separate discovery scripts. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "An enthusiastic evaluator says the demo looks great. What should you do next?",
      choices: [
        "Mark the champion and budget confirmed",
        "Ask how the decision will be made and seek evidence of influence and funding",
        "Require every acronym to be completed during this call",
      ],
      answer: 1,
      explanation:
        "Enthusiasm is evidence of interest, not authority, influence or funding. Use the smallest helpful framework.",
    },
    sources: [
      {
        label: "Winning by Design: SPICED",
        url: "https://winningbydesign.com/spiced-framework/",
      },
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
      {
        label: "Sandler Selling System",
        url: "https://sandler.com/sandler-selling-system/",
      },
      {
        label: "Challenger methodology",
        url: "https://challengerinc.com/what-is-challenger-sales-methodology/",
      },
      {
        label: "Force Management: value messaging",
        url: "https://www.forcemanagement.com/offerings/b2b-sales-message-consulting",
      },
      {
        label: "Huthwaite: SPIN questions",
        url: "https://www.huthwaiteinternational.com/blog/spin-selling-questions",
      },
      {
        label: "Salesforce: BANT",
        url: "https://admin.salesforce.com/blog/2021/how-i-solved-this-build-bant-opportunity-scoring-with-custom-metadata-types",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/sales-frameworks.md",
    },
  },
  {
    slug: "evaluation-discovery",
    title: "Qualify the problem and map the decision",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "Before offering a POC, establish what uncertainty requires testing and whether the buyer has the time and owners to evaluate it.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Ask about the current workflow, its consequences, the desired change and the customer\u2019s timing.",
      "Map evaluator, champion candidate, economic buyer, security reviewer, procurement, legal and implementation owner. Roles can overlap; confirm rather than infer from title.",
      "Record evidence as confirmed, supported, hypothesis or unknown, with a source and date.",
      "Compare purchase with internal build, existing tools, competing initiatives and doing nothing. A demo or architecture workshop may answer the question without a POC.",
    ],
    exercise:
      "Complete the executive brief and stakeholder map in toolkit.md. Write a proceed, defer or decline recommendation and three unanswered questions. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "The seller wants a signature this month, but the customer has no event. What is the deadline?",
      choices: [
        "A customer critical event",
        "A seller target that needs to be distinguished from buyer urgency",
        "A reason to invent urgency",
      ],
      answer: 1,
      explanation:
        "A seller forecast date is not customer evidence. Ask what changes for the buyer if the decision moves.",
    },
    sources: [
      {
        label: "Winning by Design: SPICED",
        url: "https://winningbydesign.com/spiced-framework/",
      },
      {
        label: "Huthwaite: SPIN questions",
        url: "https://www.huthwaiteinternational.com/blog/spin-selling-questions",
      },
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-discovery.md",
    },
  },
  {
    slug: "evaluation-value",
    title: "Build a value hypothesis and executive brief",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "Translate a technical capability into a customer outcome and an observable test. Keep the business case honest about uncertainty.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Connect the current problem to a required capability, an expected outcome and evidence that could support it.",
      "A useful insight invites the buyer to reconsider an assumption using credible evidence; it does not manufacture fear.",
      "Separate measured time savings, estimated capacity and cash savings. Avoid adding overlapping benefits.",
      "An executive brief needs a decision request, alternatives, constraints and open risks, not a feature inventory.",
    ],
    exercise:
      "Calculate an illustrative capacity estimate using 100 reviews per month, 12 baseline minutes and 7 trial minutes per comparable review. Explain why saved time is not automatically reduced payroll or avoided breach cost. Use only the fictional scenario in the companion toolkit.",
    check: {
      question: "The sample suggests faster triage. Which claim is defensible?",
      choices: [
        "We guarantee fewer breaches",
        "The sample suggests capacity savings, subject to representativeness and adoption",
        "The annual subscription pays for itself regardless of price",
      ],
      answer: 1,
      explanation:
        "Five minutes times 100 reviews is 500 minutes, about 8.3 hours per month. It is a scenario estimate, not a measured customer outcome.",
    },
    sources: [
      {
        label: "Force Management: value messaging",
        url: "https://www.forcemanagement.com/offerings/b2b-sales-message-consulting",
      },
      {
        label: "Challenger methodology",
        url: "https://challengerinc.com/what-is-challenger-sales-methodology/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-value.md",
    },
  },
  {
    slug: "evaluation-deployment",
    title: "Choose deployment and prepare the architecture",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "Placement, connectivity, data handling and operational ownership are related decisions. A reference diagram makes the assumptions visible.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Compare who runs the workload, what it must reach, where processing occurs and who handles upgrades.",
      "Identify control-plane, scan-workload and result-storage boundaries separately; exact capabilities require official product documentation.",
      "Record source inventory, permissions, credential lifecycle, outbound connections, proxy needs, data retention, logging and expected workload.",
      "Use generic diagrams for learning. Ports, regions and deployment support are unknown until verified for the exact product and edition.",
    ],
    exercise:
      "Use architecture.md to recommend an illustrative pattern. List three unresolved connectivity or data questions and fill the readiness checklist before declaring a go. Use only the fictional scenario in the companion toolkit.",
    check: {
      question: "A scanner is inside the customer network. What follows?",
      choices: [
        "No data can leave",
        "You must still verify egress, control-plane communication and result handling",
        "Security review is unnecessary",
      ],
      answer: 1,
      explanation:
        "Network placement alone does not establish data residency or isolation. Inspect actual flows and controls.",
    },
    sources: [
      {
        label: "NIST SP 800-161 Rev. 1 updated",
        url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-deployment.md",
    },
  },
  {
    slug: "evaluation-poc",
    title: "Design and run a decision-ready POC",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "A POC tests agreed uncertainty. Specify the sample, baseline, test method, threshold, owner and decision rule before starting.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Define in-scope and excluded sources, timebox, resources, stop conditions and changes requiring agreement.",
      "Use pass, fail, inconclusive and not tested for results. Track activity status separately.",
      "Measure agreed coverage and workflow usefulness, not simply the number of secrets discovered.",
      "Run kickoff, checkpoints and a final readout. Capture blockers without exposing raw secrets or customer evidence in public templates.",
      "Include cleanup and safe handling of sensitive findings even when the evaluation does not proceed.",
    ],
    exercise:
      "Complete the POC scorecard and kickoff checklist. In the fictional result packet, one repository is unreachable: decide which criteria are failed versus inconclusive and whether a bounded retest is justified. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "Nine of ten agreed repositories were scanned. Can you pass complete coverage?",
      choices: [
        "Yes, round up",
        "No; record the shortfall and investigate the blocker against the agreed rule",
        "Yes, if many findings were discovered",
      ],
      answer: 1,
      explanation:
        "A finding count cannot compensate for an unmet coverage criterion. Use the declared rule and document what remains untested.",
    },
    sources: [
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
      {
        label: "Sandler Selling System",
        url: "https://sandler.com/sandler-selling-system/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-poc.md",
    },
  },
  {
    slug: "evaluation-map",
    title: "Coordinate a mutual action plan",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "A mutual action plan is a jointly agreed set of milestones. A seller\u2019s private close plan becomes mutual only when the buyer participates.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Give each milestone customer and vendor owners, a target date, dependency and completion evidence.",
      "Run security, legal and procurement discovery early where possible; some steps depend on a finalized scope or approved data access.",
      "Map technical selection, budget, risk approval, contract execution and implementation separately.",
      "When a date slips, explain the consequence, agree a new date and preserve the decision history.",
    ],
    exercise:
      "Fill the MAP template with relative days. Make vendor onboarding a prerequisite for the purchase order and show which security tasks can start before the POC ends. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "A seller sends a spreadsheet and hears nothing. Is the plan mutual?",
      choices: [
        "Yes, because it was emailed",
        "Not yet; customer owners and commitments need agreement",
        "Yes, if all dates are this quarter",
      ],
      answer: 1,
      explanation:
        "Delivery of a document does not establish agreement. Confirm responsibilities and feasible dates.",
    },
    sources: [
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
      {
        label: "Sandler Selling System",
        url: "https://sandler.com/sandler-selling-system/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-map.md",
    },
  },
  {
    slug: "evaluation-procurement",
    title: "Navigate procurement, MNDA and commercial terms",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "Procurement is the organization\u2019s buying process. Contracting defines the agreement; vendor onboarding and payment setup make it executable. The order varies by customer.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "An MNDA addresses mutual confidential information sharing. It does not itself authorize scanning, create a purchase obligation or settle all privacy terms.",
      "An MSA or service terms set governing obligations; an order form specifies the purchase; a DPA concerns applicable personal-data processing; an SLA defines service commitments; an SOW may define implementation work.",
      "Identify whose paper is used, redline owners, approval thresholds, signers, vendor registration, PO rules and billing requirements.",
      "Record proposed, under review, approved and executed separately. A verbal selection is not a signature, PO or authorization to invoice.",
      "Counsel owns legal interpretation and negotiated clauses. This lesson teaches process literacy, not legal advice or a universal document sequence.",
    ],
    exercise:
      "Use the procurement tracker. A buyer says the MNDA is signed, the order form is in review and vendor registration is incomplete. Identify what you can accurately report and who must resolve each gap. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "Does an executed MNDA mean the evaluation is authorized to access production systems?",
      choices: [
        "Yes",
        "No; obtain the appropriate evaluation and access approvals",
        "Only if Sales says it is urgent",
      ],
      answer: 1,
      explanation:
        "Confidentiality and authorization serve different purposes. Follow the customer\u2019s access and contracting requirements.",
    },
    sources: [
      {
        label: "Common Paper: Mutual NDA",
        url: "https://commonpaper.com/standards/mutual-nda/",
      },
      {
        label: "Common Paper: Cloud Service Agreement",
        url: "https://commonpaper.com/standards/cloud-service-agreement/2.1/",
      },
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-procurement.md",
    },
  },
  {
    slug: "evaluation-security",
    title: "Coordinate security and privacy reviews",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "A security review assesses risk for a defined use. Its scope depends on access, data and criticality; an evaluation and production deployment may require different reviews.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Start with architecture and data-flow scope, then gather the requested evidence with owners, dates and applicability.",
      "Distinguish a questionnaire answer from supporting evidence and an approved risk decision. Unknown answers go to the accountable expert.",
      "Review access, encryption, logging, vulnerability management, incident response, continuity, data lifecycle and relevant subprocessors.",
      "Share restricted reports through approved channels. A SOC report or certificate must match scope and period; it is not blanket approval.",
      "Privacy applicability depends on actual processing and jurisdiction. The ICO reference concerns UK GDPR processor contracts; it is not a rule that applies identically everywhere.",
    ],
    exercise:
      "Complete the review tracker for an unanswered retention question and a requested penetration-test summary. Assign owners, sharing restrictions and evidence dates; leave approval pending. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "A questionnaire asks about a control you cannot verify. What should you do?",
      choices: [
        "Answer yes to avoid delay",
        "Mark it unknown and route it to the control owner with an evidence request",
        "Treat a roadmap item as implemented",
      ],
      answer: 1,
      explanation:
        "Accurate scope and evidence matter more than a complete-looking questionnaire. Only the designated risk owner can accept an exception.",
    },
    sources: [
      {
        label: "NIST SP 800-161 Rev. 1 updated",
        url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
      },
      {
        label: "ICO: controller and processor contracts",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-security.md",
    },
  },
  {
    slug: "evaluation-negotiation",
    title: "Prepare a commercial proposal and negotiate responsibly",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "Negotiation starts with interests and alternatives. Prepare the economics, scope and authority behind an offer before discussing concessions.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "BATNA is your best alternative if no agreement is reached; a reservation point is the least acceptable agreement given your alternatives and constraints.",
      "Ask what drives a discount request. Budget predictability, scope and payment timing may matter more than headline price.",
      "Prepare approved trades and equivalent packages. Do not promise unapproved roadmap, legal or service commitments.",
      "Use genuine deadlines and objective evidence. Never invent a competitor, alternative offer or customer commitment.",
    ],
    exercise:
      "Prepare a standard-scope option and a narrower-scope option with synthetic prices. List interests, BATNA, approval owner, tradeables and walk-away conditions without publishing an internal reservation price in the customer proposal. Use only the fictional scenario in the companion toolkit.",
    check: {
      question: "The customer requests a discount. What should happen first?",
      choices: [
        "Concede immediately",
        "Understand the constraint and prepare an authorized trade",
        "Invent a deadline",
      ],
      answer: 1,
      explanation:
        "Price is one term within an agreement. Understand the underlying interest and your authority before proposing changes.",
    },
    sources: [
      {
        label: "Harvard Program on Negotiation: BATNA",
        url: "https://www.pon.harvard.edu/daily/batna/translate-your-batna-to-the-current-deal/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-negotiation.md",
    },
  },
  {
    slug: "evaluation-readout",
    title: "Deliver the executive readout and inspect buying readiness",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "The readout separates what was demonstrated from what still needs a decision. A technically successful test may still be commercially unready.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "Lead with the decision requested, then evidence, limitations, alternatives and owners of remaining work.",
      "Tie each result to agreed criteria. Do not bury inconclusive or failed tests behind an overall success label.",
      "Inspect technical, security, privacy, legal, procurement, budget and signature readiness independently.",
      "Forecast categories follow the organization\u2019s policy and dated buyer evidence. No universal probability follows from a POC pass.",
    ],
    exercise:
      "Use the synthetic results to write a five-minute readout and a 30-second version. Recommend conditional progression, a bounded retest or no-go; identify what would change your recommendation. Use only the fictional scenario in the companion toolkit.",
    check: {
      question:
        "The POC passes but legal and funding are unknown. What can you report?",
      choices: [
        "The deal is closed",
        "Technical validation passed; commercial readiness remains unresolved",
        "Guaranteed signature this month",
      ],
      answer: 1,
      explanation:
        "Each decision has its own evidence and authority. A technical result does not establish legal approval or available funds.",
    },
    sources: [
      {
        label: "MEDDICC: MEDDPICC",
        url: "https://meddicc.com/meddpicc-sales-methodology-and-process",
      },
      {
        label: "Force Management: value messaging",
        url: "https://www.forcemanagement.com/offerings/b2b-sales-message-consulting",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-readout.md",
    },
  },
  {
    slug: "evaluation-handoff",
    title: "Transition to production or close out responsibly",
    track: "GTM",
    minutes: 20,
    level: "Beginner",
    summary:
      "The evaluation ends with a documented decision and ownership transfer. Production readiness and adoption need their own plan.",
    analogy:
      "Treat the evaluation like a shared decision record: each conclusion needs evidence and an accountable owner.",
    takeaways: [
      "For a go decision, transfer scope, architecture, approved exceptions, commitments, success measures and implementation responsibilities.",
      "For a no-go or delay, revoke temporary access, handle retained data as agreed and record unresolved findings securely.",
      "Schedule adoption and outcome reviews around the customer\u2019s goals, not just account activity.",
      "Document lessons learned without turning one synthetic exercise or isolated result into a universal success claim.",
    ],
    exercise:
      "Complete both a go handoff and no-go cleanup plan. State who confirms credentials are revoked and which unresolved commitments require explicit acceptance. Use only the fictional scenario in the companion toolkit.",
    check: {
      question: "The buyer declines to proceed. Which task remains?",
      choices: [
        "None",
        "Agree and verify access and data cleanup with accountable owners",
        "Keep credentials for a future opportunity",
      ],
      answer: 1,
      explanation:
        "No purchase does not remove responsibility for the access or data created during evaluation.",
    },
    sources: [
      {
        label: "NIST SP 800-161 Rev. 1 updated",
        url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
      },
      {
        label: "Sandler Selling System",
        url: "https://sandler.com/sandler-selling-system/",
      },
    ],
    companion: {
      label: "Read the lesson and practice guide",
      url: "https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/enterprise-evaluation/evaluation-handoff.md",
    },
  },
];
