export const lifecycle = [
  "Discover",
  "Decide",
  "Build",
  "Launch",
  "Enable",
  "Distribute",
  "Measure",
] as const;

export type LifecyclePhase = (typeof lifecycle)[number];

export type ProjectStatus = "field" | "prototype" | "designed" | "exploring";

export const statusCopy: Record<ProjectStatus, string> = {
  field: "Professional field system",
  prototype: "Prototype",
  designed: "Designed",
  exploring: "Concept",
};

export const statusHelp: Record<ProjectStatus, string> = {
  field: "Used in real work as documents and practice. Not this software.",
  prototype: "A sample you can inspect. Not a production application.",
  designed: "A documented product. An interactive page is still a sample.",
  exploring: "No completed design and no field deployment.",
};

export const avatar = {
  line: "Enterprise cybersecurity sales, built into repeatable GTM systems.",
  support:
    "I lead complex security deals and turn recurring field problems into account intelligence, competitive evidence, partner workflows, and enablement that other teams can use.",
  label: "Enterprise cybersecurity sales",
};

export const strengths = [
  {
    title: "Field friction → operating system",
    body: "I notice the same question, brief, or handoff breaking in every cycle, then design the workflow so the team can run it without a hero in the room. Competitive briefs, release intelligence, discovery frameworks.",
  },
  {
    title: "Evidence over theater",
    body: "I will not dress an unreviewed cell as a gap. Coverage, competitive claims, and product stories stay pinned to what was observed — gray means not evaluated.",
  },
  {
    title: "Commercial judgment in technical markets",
    body: "Ten-plus years in enterprise AppSec, cloud, data, threat intelligence, network, and developer security. I know how technical buyers actually decide, and I design GTM around that — not around slides.",
  },
  {
    title: "Knowledge that other people can use",
    body: "Playbooks, onboarding, industry training, partner matching. The strength is not that I hold the context. It is that the next person can pick it up.",
  },
];

export const skills = [
  "Complex enterprise sales cycles",
  "Account strategy and discovery",
  "Competitive selling with source-backed claims",
  "Channel and partner motions",
  "Enablement a new rep can finish without me",
  "Working prototypes when a spreadsheet stops being enough",
];

export type TechStance = "built" | "professional" | "learning";

export const techStanceCopy: Record<TechStance, string> = {
  built: "Built with",
  professional: "Used professionally",
  learning: "Learning",
};

export const techCategories = [
  {
    id: "build",
    title: "Build & Deploy",
    items: [
      {
        id: "next",
        name: "Next.js, React, TypeScript, Tailwind",
        stance: "built",
        note: "This portfolio, including the coverage sample.",
      },
      {
        id: "github",
        name: "GitHub",
        stance: "built",
        note: "heyfunwhoa/byjoyaing-portfolio. No other project repo is public.",
      },
      {
        id: "vercel",
        name: "Vercel",
        stance: "built",
        note: "Hosts this site. It does not host a separate intelligence app.",
      },
      {
        id: "cursor",
        name: "Cursor",
        stance: "professional",
        note: "Where I write. Not a feature of the site.",
      },
      {
        id: "aws",
        name: "AWS",
        stance: "learning",
        note: "Cloud Practitioner and AI Practitioner. This site does not call AWS.",
      },
    ],
  },
  {
    id: "research",
    title: "Research & Data Collection",
    items: [
      {
        id: "sheets",
        name: "Spreadsheets",
        stance: "professional",
        note: "How partner lists and coverage notes show up in a live cycle. This repo has no sheet importer.",
      },
      {
        id: "linkedin",
        name: "LinkedIn / Sales Navigator",
        stance: "professional",
        note: "Account research in the field. Not connected to this site.",
      },
    ],
  },
  {
    id: "data",
    title: "Data & AI",
    items: [
      {
        id: "postgres",
        name: "Postgres / Drizzle",
        stance: "learning",
        note: "Not a dependency of this repository.",
      },
      {
        id: "aisdk",
        name: "Vercel AI SDK",
        stance: "learning",
        note: "No model call in this repository.",
      },
      {
        id: "schema",
        name: "Structured output",
        stance: "learning",
        note: "A rule I want for briefs and coverage cells. Not implemented here.",
      },
      {
        id: "ingest",
        name: "Ingestion and scheduled jobs",
        stance: "learning",
        note: "The coverage table is hardcoded. Nothing refreshes it.",
      },
      {
        id: "attio",
        name: "Attio",
        stance: "learning",
        note: "Not connected.",
      },
    ],
  },
  {
    id: "gtm",
    title: "GTM Systems",
    items: [
      {
        id: "salesforce",
        name: "Salesforce",
        stance: "professional",
        note: "Where I have run enterprise cycles. Not integrated here.",
      },
      {
        id: "slack",
        name: "Slack",
        stance: "professional",
        note: "Where competitive notes and handoffs actually moved. Not integrated here.",
      },
    ],
  },
  {
    id: "comms",
    title: "Communication",
    items: [
      {
        id: "resend",
        name: "Resend",
        stance: "built",
        note: "Contact form and resume request in this repo. Not an intelligence pipeline.",
      },
      {
        id: "workspace",
        name: "Google Workspace",
        stance: "professional",
        note: "Briefs and enablement docs in the field.",
      },
    ],
  },
] as const;

export const toolsFit =
  "Built with means the package or host is in this repository and you can see the result on the site. Used professionally means I sold with it. Learning means I have not shipped it here. A name in a case-study sketch is not a completed integration.";

export const aiLoop = [
  {
    title: "Schema first",
    body: "I would want a fixed shape for a brief or a coverage cell. This site does not call a model.",
  },
  {
    title: "Grounded in source",
    body: "If a line is generated, it has to come from text I retrieved. Missing stays not evaluated.",
  },
  {
    title: "Not built here",
    body: "There is no database write and no scheduled ingest in this repository.",
  },
  {
    title: "Human review",
    body: "The coverage sample follows that rule by hand. Gray means not evaluated.",
  },
];

export const bio =
  "I have sold enterprise cybersecurity for 10+ years — application security, cloud, data security, threat intelligence, network security, and now developer security and machine identity. I own complex cycles with security, engineering, and partner stakeholders, and I turn the questions that repeat into briefs, playbooks, and tools the next person can run. Some of that work is material a team already used. Some of it is a working prototype. Some of it is a design I have not shipped as software.";

export const targetRolesPrimary = [
  "Enterprise sales",
  "GTM systems",
  "Competitive strategy",
  "Partner and channel motions",
];

export const proof = [
  {
    value: "1 prototype",
    label:
      "Detector Coverage Atlas — public catalog you can inspect. Gray is not evaluated, never a confirmed gap.",
  },
  {
    value: "1 field system",
    label:
      "Competitive briefs a team could run without the author in the room.",
  },
  {
    value: "5 designed",
    label:
      "Operating models for launch, enablement, partners, account signal, and feedback — not claimed as live products.",
  },
];

export const domains = [
  "Application security",
  "Cloud",
  "Data security",
  "Threat intelligence",
  "Network security",
  "Developer security / secrets",
  "Machine identity",
];

export const loop = [
  "Customer problem",
  "Product / GTM insight",
  "System design",
  "Prototype",
  "Measurable impact",
];

export const roles = [
  {
    company: "Truffle Security",
    title: "Senior Enterprise Account Executive",
    period: "Dec 2024 – Present",
    category: "Developer security, secrets, machine identity",
    points: [
      "Sell developer-first secrets detection and AppSec into accounts where security, engineering, DevSecOps, and cloud share the same buying cycle.",
      "Created discovery frameworks, ICP profiles, outbound plays, and competitive messaging adopted across the sales org.",
      "Led a sales–product feedback loop and built a self-serve onboarding resource for product, process, and technical fundamentals.",
      "Designed product-release intelligence: what shipped, who cares, which accounts it applies to, and what the field should do next.",
    ],
  },
  {
    company: "Darktrace",
    title: "Senior Enterprise Account Executive",
    period: "Dec 2023 – May 2024",
    category: "Threat intelligence and network / AI security",
    points: [
      "Greenfield territory: net-new pipeline and regional growth.",
      "Created industry-knowledge training and business-value tools for new-rep ramp.",
    ],
  },
  {
    company: "Rapid7",
    title: "Enterprise Account Executive, Strategic",
    period: "Oct 2021 – Aug 2023",
    category: "Threat intelligence, cloud, and application security",
    points: [
      "Full-cycle net-new and growth in 1,500-employee to F100 accounts, including the team’s largest threat-intelligence deal in 2022.",
      "Wrote threat-intelligence playbooks for the broader portfolio team and served as the TI resource across 500+ accounts, partners, and customers.",
    ],
  },
  {
    company: "Forcepoint",
    title: "Senior Account Executive, Lead",
    period: "Sep 2018 – Oct 2021",
    category: "Web security and data protection",
    points: [
      "Mid-Atlantic and Southeast enterprise (1,500+ employees), new logo and expansion.",
      "Co-created discovery templates and sales presentations used by the team. Closed the team’s largest web-security deal in 2021.",
    ],
  },
  {
    company: "Metadot",
    title: "Global Channel Account Manager",
    period: "Sep 2016 – Sep 2018",
    category: "Channel, partners, and new-category GTM",
    points: [
      "Helped stand up a channel program for distribution sales.",
    ],
  },
  {
    company: "Quantcast",
    title: "Corporate Account Executive",
    period: "Dec 2015 – Jul 2016",
    category: "New-market GTM",
    points: [
      "One of the first Austin sales hires. Co-created a GTM playbook for agency targeting and repeatable outreach.",
    ],
  },
  {
    company: "Websense",
    title: "Regional Account Manager",
    period: "May 2014 – Dec 2015",
    category: "Web, email, and data security",
    points: [
      "Northeast accounts up to 2,000 employees. Built cybersecurity ramp resources for new team members.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  phase: LifecyclePhase;
  careerSignal: string;
  status: ProjectStatus;
  problem: { summary: string; why: string; without: string };
  users: { primary: string; secondary: string; job: string };
  evidence: string;
  goals: string[];
  nonGoals: string[];
  mvp: { version: string; question: string };
  workflow: string[];
  systemPlain: string[];
  systemTechnical: string[];
  dataModel: string[];
  metrics: {
    operational: string[];
    behavioral: string[];
    business: string[];
  };
  hypothesis: string;
  tradeoffs: string[];
  prototype: string;
  next: string[];
  businessValue: string[];
};

export const projects: Project[] = [
  {
    slug: "detector-coverage-atlas",
    title: "Detector Coverage Atlas",
    phase: "Build",
    careerSignal: "Product Strategy, Technical Product Management, Product GTM",
    status: "prototype",
    problem: {
      summary:
        "Secret-scanning tools name, categorize, detect, and verify the same credentials differently — so coverage questions stay tribal.",
      why: "Teams cannot answer which providers are covered, whether two detectors are equivalent, whether a finding can be verified, or what changed, without overstating the evidence.",
      without:
        "Competitive slides invent gaps. Unreviewed cells get treated as “unsupported.” Onboarding depends on whoever last read the detector source.",
    },
    users: {
      primary:
        "Security researcher / AppSec engineer who needs evidence-backed coverage and verification status",
      secondary:
        "PM, SA, AE, and CS who must explain coverage without overstating it",
      job: "Answer a detector-coverage question with provenance, confidence, and a path to the source.",
    },
    evidence:
      "Independent research against public TruffleHog: a source parser observed 910 detector records (Sept 2026), with 14 fully enriched and ready to render. Nested folders (github/v1, aws/access_keys) were being dropped until that bug was fixed. Validity-check detection is heuristic — GitHub and GitLab verification delegated to helpers are known false negatives. This is a public research catalog, not an official Truffle Security product.",
    goals: [
      "Preserve source names and pin every import to a commit SHA.",
      "Normalize to canonical secret types without deleting source terminology.",
      "Label cells documented, observed, unknown, not evaluated, or needs review — never treat gray as a confirmed gap.",
      "Keep detection (`detectors`) separate from credential-capability analysis (`analyzer`).",
    ],
    nonGoals: [
      "A production scanner or continuous customer-monitoring product.",
      "CodeQL, dependency scanning, or general vuln scanning.",
      "Real secrets, live credential verification, or internal Truffle code/data.",
      "Filling Betterleaks or Kingfisher columns before their public rule files are reviewed.",
      "Treating how-to-rotate docs as detector-coverage evidence.",
    ],
    mvp: {
      version:
        "Catalog foundation: schema, TruffleHog ingestion, 14 reviewed starter detectors, searchable comparison with explicit uncertainty.",
      question:
        "Can fragmented public detector information become a reliable, evidence-backed product before we add more sources or automation?",
    },
    workflow: [
      "Ingest public repos and docs at a pinned commit",
      "Normalize without overwriting source names",
      "Enrich with evidence level and review status",
      "Compare across tools",
      "Queue parser uncertainty for human review",
    ],
    systemPlain: [
      "Public GitHub + provider docs",
      "Ingestion",
      "Normalization",
      "Evidence + confidence",
      "Searchable UI",
      "Scheduled change detection",
      "Human review queue",
    ],
    systemTechnical: [
      "Octokit (commit-pinned reads)",
      "Provider-specific parsers",
      "Postgres + Drizzle (next)",
      "Vercel Cron snapshots (next)",
      "shadcn data table",
      "Comparison matrix",
    ],
    dataModel: [
      "DetectorRecord",
      "DetectorEquivalenceGroup",
      "CoverageMatrixCell",
      "IngestionRun",
      "Verification profile",
      "ValueNarrative",
      "RotationGuide",
      "Review item",
    ],
    metrics: {
      operational: [
        "910 TruffleHog records parsed; 14 enriched",
        "Normalization rate and evidence completeness",
        "Stale-record and parser false-negative rate",
      ],
      behavioral: [
        "Review-queue resolution",
        "Reuse in onboarding and competitive prep",
      ],
      business: [
        "Hypothesis: fewer unsupported product claims and faster coverage answers than manual repo research",
      ],
    },
    hypothesis:
      "If coverage is evidence-based and reviewable, product and field decisions get faster and claims get safer. No invented revenue. Missing public docs is not a confirmed gap.",
    tradeoffs: [
      "Parser complexity vs. a human review queue for ~30 “no verifier” flags.",
      "Breadth of providers vs. depth of evidence — TruffleHog first.",
      "Scheduled snapshots vs. real-time crawling.",
      "Computed comparison views vs. stored matrix rows.",
    ],
    prototype:
      "Phase 1 in progress: parser tested on the real public TruffleHog repo; 14 enriched detectors ready for the Next.js table. Independent/unofficial. Separate from Truffle Camp and from any company-owned Atlas. The parser is not in this repository.",
    next: [
      "Detector detail with verification profiles and conditional risk language.",
      "Betterleaks and Kingfisher only after rule-file review; GitGuardian and GitHub Secret Scanning stay manual-doc.",
      "Commit snapshots, diffs, and a review queue.",
      "Five to ten representative questions against the UI to pick the next phase — not every planned screen.",
    ],
    businessValue: [
      "Faster technical research",
      "More accurate competitive analysis",
      "Fewer unsupported product claims",
      "Quicker onboarding",
      "Stronger product and field decisions",
    ],
  },
  {
    slug: "product-release-intelligence",
    title: "Product Release Intelligence",
    phase: "Launch",
    careerSignal: "Product GTM, Product Commercialization, Product Operations",
    status: "designed",
    problem: {
      summary:
        "Product releases do not automatically become useful customer or field actions.",
      why: "Shipping is only half the job. Value is realized when the field knows who cares, which accounts it applies to, and what to do.",
      without:
        "Sales, CS, SAs, marketing, and partners independently interpret changelogs. Messaging drifts, adoption slows, and questions bounce back to Product.",
    },
    users: {
      primary:
        "AE, CSM, and SA who need to know whether a release matters to an account and what to do",
      secondary: "PMM / enablement, Product, partners, and RevOps",
      job: "When something ships, identify the customer problem, persona, technology, commercial moment, and next action without reconstructing it independently.",
    },
    evidence:
      "A detector, verification, analyzer, or integration change still leaves the field to invent why it matters. The PRD’s six questions: what changed, why we built it, who cares, why it matters, how the field uses it, and what not to overpromise. Gainsight is the future CS context layer — not the release source of truth.",
    goals: [
      "Tier releases: GTM-impacting, customer-impacting, technical/maintenance.",
      "Tag technology and match accounts with confidence: confirmed, observed, customer-reported, inferred.",
      "Recommend actions: inform, adopt, re-engage, expand, renew, POC, competitive.",
      "Close the loop from request → ship → matched account → adoption → feedback.",
    ],
    nonGoals: [
      "A prettier public changelog.",
      "Perfect technographics or autonomous outreach.",
      "Replacing Product/Engineering release systems, Salesforce, or Gainsight.",
      "Treating inferred stack data as fact.",
    ],
    mvp: {
      version:
        "Tier 1 intake, structured tags, plain-English translation, manually assisted account matching, a release hub, and field-feedback tracking — no new platform required.",
      question:
        "Does structured release-to-account relevance create enough value to justify deeper automation?",
    },
    workflow: [
      "Release event",
      "Classification",
      "Persona / use case",
      "Account context",
      "Relevance scoring",
      "Recommended action",
      "Field delivery",
      "Outcome measurement",
    ],
    systemPlain: [
      "Release",
      "Classification",
      "Account matching",
      "Recommended action",
      "Field delivery",
      "Measurement",
    ],
    systemTechnical: [
      "Release source / webhook",
      "Classification (rules first, model-assisted later)",
      "Account and usage context",
      "Postgres",
      "Application API",
      "Notifications / CRM tasks",
      "Analytics",
    ],
    dataModel: [
      "Release",
      "Release tier",
      "Technology tag",
      "Persona",
      "Use case",
      "Account",
      "Usage evidence",
      "Match",
      "Recommended action",
      "Outcome",
    ],
    metrics: {
      operational: [
        "Time from release to GTM readiness",
        "Share of Tier 1 releases fully enriched",
      ],
      behavioral: [
        "Match acceptance vs. rejection",
        "Recommendations that become a field action",
      ],
      business: [
        "Hypothesis: adoption, re-engagement, expansion, renewals, and POCs improve when relevance is explainable — not opaque",
      ],
    },
    hypothesis:
      "If release-to-field translation is faster and account relevance is accurate, field readiness, follow-up, adoption, and revenue influence should improve. Hypothesis until usage data exists.",
    tradeoffs: [
      "Explainable rules before ranking models.",
      "Salesforce as the operational layer vs. Gainsight as future CS context.",
      "Batch digest vs. event-triggered alerts.",
      "High-confidence matches vs. broad matching.",
      "Human approval vs. automated outreach.",
    ],
    prototype:
      "PRD and operating model. Prototype next: 5–10 historical or synthetic releases against a small account set. Ask: who cares, why, which accounts, what should we do?",
    next: [
      "Standardize the internal release template and tags.",
      "Manual Salesforce / CS / POC matching for Tier 1.",
      "Design so Gainsight can attach health, renewal, and adoption later without a rebuild.",
    ],
    businessValue: [
      "Faster field readiness",
      "More relevant customer outreach",
      "Higher adoption",
      "Better re-engagement",
      "Improved renewal and expansion conversations",
    ],
  },
  {
    slug: "truffle-camp",
    title: "Truffle Camp",
    phase: "Enable",
    careerSignal: "Product Adoption, Technical Enablement, Product GTM",
    status: "designed",
    problem: {
      summary:
        "Secrets education is fragmented across docs, detector references, sales enablement, and tribal knowledge.",
      why: "Learners confuse detection with verification, severity, ownership, and remediation — and cannot practice a responsible handoff.",
      without:
        "Ramp depends on ride-alongs. Terminology is memorized without a workflow. Stale internal knowledge keeps circulating.",
    },
    users: {
      primary:
        "Internal TruffleHog enablement: AE, SDR, SA, CS, partner, manager, leadership",
      secondary:
        "Later: developers, AppSec, customer education, external learners",
      job: "Move from discovery to a source-grounded explanation and next step — without real secrets.",
    },
    evidence:
      "At Darktrace I created industry-knowledge training. At Truffle, self-serve onboarding and a sales–product loop showed the same gap. The productized version is Truffle Camp (curriculum: The Secret Life Cycle; interactive layer: Secret Expedition). No public repository. Atlas stays a separate source of truth; Camp would consume a learner-safe export.",
    goals: [
      "Teach the secret lifecycle with synthetic missions: Discover → Classify → Verify → Prioritize → Route → Explain → Advance.",
      "Role-based paths and behavior-based badges, not a speed leaderboard.",
      "Keep source, freshness, uncertainty, and claim status visible.",
      "Measure readiness from decisions, explanations, and handoffs.",
    ],
    nonGoals: [
      "Scanning real repos or storing/verifying real credentials.",
      "Live provider verification calls.",
      "Replacing TruffleHog docs or merging with the Atlas repo.",
      "A full LMS in v1. No public leaderboards or unsafe timers.",
    ],
    mvp: {
      version:
        "Playable core: expedition map, Trailhead, one Dig Site mission, synthetic evidence viewer, decision feedback, local progress, one Field Badge.",
      question:
        "Can a synthetic investigation teach the lifecycle better than a slide path?",
    },
    workflow: [
      "Trailhead",
      "Dig Site",
      "Verification Lab",
      "Risk Room",
      "Handoff Desk",
      "Field Brief",
    ],
    systemPlain: [
      "Curriculum",
      "Missions",
      "Synthetic evidence",
      "Decisions + feedback",
      "Progress",
      "Atlas-powered cards (later)",
      "Campfire Q&A (later)",
    ],
    systemTechnical: [
      "Next.js App Router",
      "Local JSON/MDX fixtures",
      "Atlas export adapter",
      "Zod validation",
      "Local storage then Supabase",
      "No browser-side API keys",
    ],
    dataModel: [
      "Lesson",
      "Mission",
      "Forager (learner)",
      "Evidence inventory",
      "Decision",
      "Audit trail",
      "Badge",
      "Claim status",
    ],
    metrics: {
      operational: ["Time to complete First Expedition", "Stale-content rate"],
      behavioral: [
        "Mission completion",
        "Correct reasoning vs. speed",
        "Audience-specific field briefs",
      ],
      business: [
        "Hypothesis: Camp reduces time-to-useful-conversation without overclaiming product coverage.",
      ],
    },
    hypothesis:
      "If learners practice the full loop on synthetic evidence, readiness and technical conversation quality improve. Darktrace is historical proof of enablement; Camp is the product.",
    tradeoffs: [
      "Synthetic missions vs. scanning real repos.",
      "Separate Atlas and Camp repos vs. one monolith.",
      "Versioned Atlas exports vs. a live Atlas dependency.",
      "Local fixtures so Camp stays playable if Notion is down.",
    ],
    prototype:
      "PRD complete. No public repository. Independent training product — not live verification, not customer data. Atlas integration would be a curated export, not a merge.",
    next: [
      "One Dig Site mission end to end, then Verification Lab and Handoff Desk.",
      "Import one curated Atlas detector record via schema.",
      "Six initial missions (accidental commit through executive brief).",
      "Notion export pipeline and Campfire only after local fixtures work.",
    ],
    businessValue: [
      "Faster ramp",
      "Better product understanding",
      "Stronger technical conversations",
      "Improved adoption",
      "Reduced dependence on tribal knowledge",
    ],
  },
  {
    slug: "competitive-intelligence-engine",
    title: "Competitive Intelligence Engine",
    phase: "Discover",
    careerSignal: "Competitive Strategy, Market Intelligence, Product GTM",
    status: "field",
    problem: {
      summary:
        "Competitive knowledge becomes stale quickly and is difficult to operationalize.",
      why: "Deals and product decisions need a living view of where we win, where we do not, and what changed.",
      without:
        "Objection handling lives in Slack. Every deal reinvented the brief.",
    },
    users: {
      primary: "AEs and SAs in live cycles",
      secondary: "Product and PMM using field signal for messaging and roadmap",
      job: "Walk into a competitive conversation with a current, teachable brief.",
    },
    evidence:
      "Across Forcepoint, Rapid7, and Truffle, competitive noise showed up differently in every deal. Playbooks and battlecards worked when they were a system, not a one-off deck.",
    goals: [
      "Repeatable briefs: category, win conditions, gaps, and how to teach it in the room.",
      "A path from competitor change → field recommendation.",
    ],
    nonGoals: [
      "Scraping the entire internet.",
      "Automated public attack content.",
    ],
    mvp: {
      version:
        "Structured battlecards and briefs the field can run without the author in the room.",
      question:
        "Does a shared competitive system change win strategy more than hero decks?",
    },
    workflow: [
      "Competitor sources",
      "Snapshots",
      "Change detection",
      "Classification",
      "Impact analysis",
      "Recommendations",
      "Alerts / history",
    ],
    systemPlain: [
      "Sources",
      "Monitoring",
      "Change detection",
      "Impact",
      "Recommendation",
      "History",
    ],
    systemTechnical: [
      "Scheduled source checks (next)",
      "Snapshot store",
      "Classification",
      "Application API",
      "Field UI / CRM notes",
    ],
    dataModel: [
      "Competitor",
      "Claim",
      "Change",
      "Impact",
      "Recommendation",
      "Deal context",
    ],
    metrics: {
      operational: ["Faster awareness", "Less duplicated research"],
      behavioral: ["Brief usage in deals"],
      business: [
        "Hypothesis: more consistent competitive execution and better messaging feedback into Product",
      ],
    },
    hypothesis:
      "If competitive changes are classified and turned into recommendations, deal strategy and product messaging should stay current. Field briefs are the current proof; monitoring is next.",
    tradeoffs: [
      "Human-authored win/loss over unreviewed model summaries.",
      "Depth on a few competitors over shallow coverage of everyone.",
    ],
    prototype:
      "Used in the field: battlecards and briefs. Monitoring, snapshots, and alerts are designed, not built.",
    next: [
      "Scheduled source snapshots.",
      "Change detection with human review.",
      "Closed loop into product feedback.",
    ],
    businessValue: [
      "Faster awareness",
      "Better deal strategy",
      "Improved messaging",
      "Stronger product feedback",
      "More consistent competitive execution",
    ],
  },
  {
    slug: "customer-feedback-intelligence",
    title: "Customer Feedback Intelligence",
    phase: "Discover",
    careerSignal: "Product Strategy, Product Operations, Product Management",
    status: "designed",
    problem: {
      summary:
        "Customer feedback is fragmented across Sales, CS, support, calls, and feature requests.",
      why: "Roadmap and GTM cannot see themes with account and revenue context attached.",
      without:
        "Duplicate requests, lost commitments, and no closed loop from request to release.",
    },
    users: {
      primary: "Product and product operations",
      secondary: "AEs and CSMs who captured the original signal",
      job: "See what customers are asking for, how often, and what it is worth — then close the loop.",
    },
    evidence:
      "Sales–product feedback loops at Truffle, plus release work that needed prior requests, POC blockers, and lost-deal gaps in one place — not a standalone feature tracker.",
    goals: [
      "Ingest and classify feedback with account context.",
      "Deduplicate themes and attach revenue / stage context.",
    ],
    nonGoals: [
      "Replacing the product backlog tool.",
      "Auto-committing roadmap items from sentiment.",
    ],
    mvp: {
      version:
        "A theme board sourced from field notes, with account tags and duplicates collapsed.",
      question:
        "Does structured feedback change prioritization faster than a raw request list?",
    },
    workflow: [
      "Feedback sources",
      "Ingestion",
      "Extraction",
      "Classification",
      "Deduplication",
      "Account / revenue context",
      "Themes",
      "Prioritization",
    ],
    systemPlain: [
      "Sources",
      "Ingestion",
      "Normalization",
      "Themes",
      "Prioritization",
      "Closed loop",
    ],
    systemTechnical: [
      "CRM / call / ticket sources",
      "Ingestion workers",
      "Extraction and classification",
      "Postgres",
      "Prioritization UI",
    ],
    dataModel: ["Signal", "Theme", "Account", "Evidence", "Persona", "Outcome"],
    metrics: {
      operational: ["Reduced duplicate work", "Faster theme identification"],
      behavioral: ["Product review of themed feedback"],
      business: [
        "Hypothesis: better roadmap prioritization and closed-loop customer communication",
      ],
    },
    hypothesis:
      "If feedback is themed with account context, roadmap prioritization and closed-loop communication should improve. No fake revenue attached.",
    tradeoffs: [
      "Human confirmation of themes before they hit roadmap reviews.",
      "Account context over volume-only scoring.",
    ],
    prototype:
      "Designed system. The field loop exists; the intelligence layer is not a shipped app.",
    next: [
      "CRM and call-note ingestion.",
      "Deduplicated themes.",
      "Join to release intelligence when a theme ships.",
    ],
    businessValue: [
      "Faster identification of product themes",
      "Better roadmap prioritization",
      "Reduced duplicate work",
      "Stronger closed-loop customer communication",
    ],
  },
  {
    slug: "product-prioritization-simulator",
    title: "Product Prioritization Simulator",
    phase: "Decide",
    careerSignal: "Product Strategy, Product Operations",
    status: "exploring",
    problem: {
      summary:
        "Teams struggle to prioritize what matters when customer, competitive, and commercial signals sit in different places.",
      why: "Decide is the gap between discovering a theme and building the wrong thing.",
      without:
        "Loudest request wins. Revenue, effort, and strategic fit stay implicit.",
    },
    users: {
      primary: "Product and GTM leaders",
      secondary: "Engineering partners estimating effort",
      job: "Compare options with explicit tradeoffs before committing build time.",
    },
    evidence:
      "Release, feedback, and competitive systems only pay off if someone can decide. Field cycles already force implicit prioritization; the simulator makes it inspectable.",
    goals: ["Score a small set of bets on impact, confidence, and effort."],
    nonGoals: ["An automated roadmap.", "A substitute for product judgment."],
    mvp: {
      version:
        "A scoring sheet for a handful of bets using feedback, revenue context, and effort.",
      question:
        "Does making tradeoffs visible change which bet gets resourced?",
    },
    workflow: [
      "Inputs from Discover",
      "Scoring",
      "Tradeoff view",
      "Decision record",
    ],
    systemPlain: ["Inputs", "Scoring", "Comparison", "Decision record"],
    systemTechnical: [
      "Manual inputs first",
      "Later: APIs from feedback and revenue systems",
    ],
    dataModel: ["Bet", "Score", "Assumption", "Decision"],
    metrics: {
      operational: ["Faster decision records"],
      behavioral: ["Use in planning"],
      business: [
        "Hypothesis: fewer builds disconnected from commercial evidence",
      ],
    },
    hypothesis:
      "If prioritization is explicit, the company should waste less build time on low-confidence bets. Next — not built.",
    tradeoffs: ["Simple scoring over a model that hides the judgment."],
    prototype: "Next. Not started as software.",
    next: [
      "Wire inputs from feedback and competitive systems once those MVPs exist.",
    ],
    businessValue: ["Clearer bet selection", "Inspectable tradeoffs"],
  },
  {
    slug: "partner-gtm-engine",
    title: "Partner GTM Engine",
    phase: "Distribute",
    careerSignal: "Partner Strategy, Ecosystem GTM, Strategic Programs",
    status: "designed",
    problem: {
      summary:
        "Partners send account lists in inconsistent formats. Domain is often missing even though it is the matching key — so ownership, whitespace, and conflicts stay invisible.",
      why: "There is no reliable view of who owns what across partners and the internal book, or which unclaimed accounts are worth pursuing.",
      without:
        "Co-sell stays goodwill. Conflicts have no partner context. Whitespace is not scored.",
    },
    users: {
      primary:
        "AE/SDR reviewing their own territory and whitespace (v1 is a personal view, not an admin console)",
      secondary:
        "Aligned partners receiving filtered exports of their own accounts only",
      job: "Ingest sheets, classify ownership by domain, score whitespace, and keep partner relationship context on every conflict.",
    },
    evidence:
      "Metadot channel program: I helped stand up distribution sales. The v1 design is Channel Territory Mapping: column mapping per partner, domain as sole source of truth, search plus human review when domain is missing — never a model guessing a domain from memory. No public repository.",
    goals: [
      "Ownership classes: internal_only, single_partner, multi_partner_conflict, unclaimed.",
      "Score unclaimed/internal-only accounts (100 pts: tech 30, employees 25, ICP 25, funding 20).",
      "Sync assignments and scores to Account Intelligence via API/webhook.",
    ],
    nonGoals: [
      "Salesforce IDs, map viz, live Nooks/Outreach, multi-rep admin, Clay (Sumble + Exa only).",
      "Fuzzy name matching when a domain already exists.",
    ],
    mvp: {
      version:
        "Upload 2+ partner sheets with different columns; classify ownership; resolve or flag missing domains; rank whitespace; retrieve partner contacts from a conflict view.",
      question:
        "Does domain-based matching plus scored whitespace beat spreadsheet co-sell?",
    },
    workflow: [
      "Upload partner sheet + map columns",
      "Normalize domain (deduce only via search, never from memory)",
      "Classify ownership",
      "Enrich and score whitespace",
      "Export partner-safe lists",
      "Sync assignments to Account Intelligence",
    ],
    systemPlain: [
      "Partner sheets",
      "Domain match",
      "Ownership",
      "Enrichment",
      "Score",
      "Export / sync",
    ],
    systemTechnical: [
      "Next.js App Router",
      "Supabase Postgres",
      "SheetJS",
      "Sumble + Exa",
      "Claude API for name cleaning and disambiguation only",
    ],
    dataModel: [
      "accounts",
      "partners",
      "partner_sheets",
      "ownership_mappings",
      "enrichment_data",
      "account_scores",
      "rep_assignments",
      "export_logs",
    ],
    metrics: {
      operational: [
        "Sheets with different schemas correctly classified",
        "Unresolved domains clearly flagged",
      ],
      behavioral: [
        "Whitespace ranking that survives manual review",
        "Conflict view used for partner contact",
      ],
      business: [
        "Hypothesis: matching and scored whitespace increase partner-sourced pipeline.",
      ],
    },
    hypothesis:
      "If overlap, conflicts, and whitespace are structured around domain, partner activation and sourced pipeline should rise. Metadot is historical proof of the motion; Channel Territory Mapping is the system.",
    tradeoffs: [
      "Domain as sole match key vs. fuzzy names.",
      "Personal v1 vs. team admin.",
      "Search-backed domain deduction vs. model recall.",
    ],
    prototype:
      "PRD for Channel Territory Mapping. Companion: Account Intelligence, independently deployable — no shared database. Neither has a public repository.",
    next: [
      "Partner-auth’d enablement packs (battlecards + per-account messaging) in v2.",
      "Keep Clay out of this build.",
    ],
    businessValue: [
      "Increased partner activation",
      "More account overlap identified",
      "Faster co-selling",
      "Increased partner-sourced / influenced pipeline",
    ],
  },
  {
    slug: "account-intelligence",
    title: "Account Intelligence",
    phase: "Distribute",
    careerSignal: "GTM Systems, Product GTM, Growth",
    status: "designed",
    problem: {
      summary:
        "AEs and SDRs have no living view of funding, leadership, hiring, stack, or news across assigned accounts — so outreach stays generic.",
      why: "Signals get missed. Monitoring does not become an action.",
      without:
        "Reps refresh the same feeds. Territory mapping and outreach stay disconnected.",
    },
    users: {
      primary:
        "Single rep, personal feed (v1 is not a multi-rep admin console)",
      secondary:
        "Future: Nooks/Outreach as a handoff, not a live v1 integration",
      job: "See assigned-account signals and draft outreach that cites the specific event.",
    },
    evidence:
      "Companion to Channel Territory Mapping. Assignments would arrive by webhook from the partner app, or manually. Own copy of accounts — no shared database — so either app could stay up if the other is down. No public repository.",
    goals: [
      "Classify signals: funding, leadership_change, hiring_surge, tech_change, news_mention.",
      "Mark read/dismissed.",
      "Draft copyable outreach from a signal (Claude API) — payload shaped for a later Nooks/Outreach push.",
    ],
    nonGoals: [
      "Live Nooks/Outreach API, multi-rep admin, Salesforce IDs in v1.",
    ],
    mvp: {
      version:
        "Synced assignment appears in the feed; signals classified and tied to the account; a usable draft from a signal.",
      question:
        "Does a personal signal feed change outreach from generic to triggered?",
    },
    workflow: [
      "Sync or enter assignment",
      "Poll Sumble / Exa",
      "Classify signal",
      "Feed (chrono or by account)",
      "Draft outreach",
    ],
    systemPlain: [
      "Assignments",
      "Signal poll",
      "Classification",
      "Feed",
      "Draft",
    ],
    systemTechnical: [
      "Next.js App Router",
      "Supabase (own instance)",
      "Sumble + Exa",
      "Claude API for drafts",
      "Webhook from the partner app",
    ],
    dataModel: [
      "accounts",
      "rep_assignments",
      "signals",
      "signal_feed_reads",
      "outreach_drafts",
    ],
    metrics: {
      operational: [
        "Sync without manual re-entry",
        "Correct signal type and account",
      ],
      behavioral: ["Drafts generated from signals", "Read/dismiss usage"],
      business: [
        "Hypothesis: triggered outreach improves reply quality vs. generic sequences",
      ],
    },
    hypothesis:
      "If reps see account-specific events and can draft from them, outreach relevance should improve. No fake pipeline numbers.",
    tradeoffs: [
      "Independent deploy vs. a shared database.",
      "Copyable drafts vs. live sequencer push.",
      "Personal feed vs. team admin.",
    ],
    prototype:
      "PRD. No public repository. Whitespace accounts synced from territory mapping should show existing signals immediately, not wait for the next poll.",
    next: [
      "Live sequencer push",
      "Multi-rep view",
      "Salesforce IDs when available",
    ],
    businessValue: [
      "Fewer missed account events",
      "Outreach tied to a real trigger",
      "Territory mapping connected to action",
    ],
  },
  {
    slug: "gtm-campaign-lab",
    title: "GTM Campaign Lab",
    phase: "Distribute",
    careerSignal: "GTM Strategy, Growth, GTM Systems",
    status: "exploring",
    problem: {
      summary:
        "Outbound and GTM experiments are often disconnected from product and customer signals and poorly measured.",
      why: "Campaigns should start from accounts and product context, not a generic sequence.",
      without: "Activity without attribution. No iteration loop.",
    },
    users: {
      primary: "GTM operators running experiments",
      secondary: "Product GTM needing signal back from campaigns",
      job: "Test a message hypothesis against a defined segment and see what happened.",
    },
    evidence:
      "Outbound plays and ICP work at Truffle, plus Quantcast new-market playbooks — experiments existed, measurement did not live in one system.",
    goals: ["Segment from signals, run a hypothesis, track events, iterate."],
    nonGoals: ["A full marketing automation suite."],
    mvp: {
      version:
        "One segment, one message hypothesis, event tracking, a read-out.",
      question:
        "Does tying campaigns to product/customer signals improve pipeline efficiency?",
    },
    workflow: [
      "Signals / accounts",
      "Enrichment",
      "Segmentation",
      "Message hypothesis",
      "Campaign",
      "Event tracking",
      "Analytics",
      "Iteration",
    ],
    systemPlain: [
      "Signals",
      "Segment",
      "Hypothesis",
      "Campaign",
      "Measurement",
    ],
    systemTechnical: [
      "Account signals",
      "Campaign tool",
      "Event tracking",
      "Analytics",
    ],
    dataModel: ["Segment", "Hypothesis", "Campaign", "Event", "Outcome"],
    metrics: {
      operational: ["Faster GTM experimentation"],
      behavioral: ["Response rate", "Iteration count"],
      business: [
        "Hypothesis: higher pipeline efficiency from better segmentation",
      ],
    },
    hypothesis:
      "If campaigns start from product and customer signals, outreach should be more relevant and attribution should improve. Next — not built.",
    tradeoffs: ["One measured experiment over a spray of sequences."],
    prototype: "Next. Not started as software.",
    next: ["Connect to release and feedback signals once those systems exist."],
    businessValue: [
      "Faster GTM experimentation",
      "Better segmentation",
      "More relevant outreach",
      "Improved attribution",
    ],
  },
  {
    slug: "security-signal-intelligence",
    title: "Security Signal Intelligence",
    phase: "Discover",
    careerSignal: "Market Intelligence, Product GTM, Strategic Programs",
    status: "exploring",
    problem: {
      summary:
        "Relevant security news, breaches, and market events are difficult for GTM teams to monitor and interpret consistently.",
      why: "Timely conversations need a shared, reviewed digest — not 20 people refreshing the same feeds.",
      without: "Inconsistent awareness. Missed campaign windows.",
    },
    users: {
      primary: "Product GTM and field marketers",
      secondary: "AEs preparing account conversations",
      job: "Know which events matter to which accounts, with a recommended use.",
    },
    evidence:
      "Threat-intelligence playbooks at Rapid7 and industry training at Darktrace existed because the field could not monitor the market consistently on its own.",
    goals: [
      "Collect, deduplicate, classify, score relevance, and review before a digest goes out.",
    ],
    nonGoals: ["A news product.", "Unreviewed alerts to customers."],
    mvp: {
      version: "A reviewed weekly digest with account/persona tags.",
      question:
        "Does a shared, reviewed signal feed change conversation quality?",
    },
    workflow: [
      "Sources",
      "Collection",
      "Normalization",
      "Deduplication",
      "Classification",
      "Relevance scoring",
      "Review",
      "Digest / alerts",
    ],
    systemPlain: ["Sources", "Normalize", "Classify", "Review", "Digest"],
    systemTechnical: [
      "Source collection",
      "Normalization",
      "Classification",
      "Review queue",
      "Digest delivery",
    ],
    dataModel: ["Source", "Event", "Account relevance", "Review", "Digest"],
    metrics: {
      operational: ["Faster market awareness"],
      behavioral: ["Digest usage", "Campaigns launched from signals"],
      business: [
        "Hypothesis: stronger customer conversations and timely campaigns",
      ],
    },
    hypothesis:
      "If market events are reviewed and tagged, GTM should respond faster and more consistently. Next — not built. Human review stays in the loop.",
    tradeoffs: [
      "Reviewed digest over real-time unfiltered alerts.",
      "Deterministic source list over open-ended crawling.",
    ],
    prototype: "Next. Not started as software.",
    next: ["Source list", "Review queue", "Account tagging"],
    businessValue: [
      "Faster market awareness",
      "Stronger customer conversations",
      "Timely campaigns",
      "Improved competitive and product insight",
    ],
  },
];

export const detectors = [
  {
    name: "TruffleHog",
    aws: "Covered",
    github: "Covered",
    slack: "Observed",
    gitlab: "Observed",
    gcp: "Observed",
  },
  {
    name: "Betterleaks",
    aws: "Not evaluated",
    github: "Not evaluated",
    slack: "Not evaluated",
    gitlab: "Not evaluated",
    gcp: "Not evaluated",
  },
  {
    name: "Kingfisher",
    aws: "Not evaluated",
    github: "Not evaluated",
    slack: "Not evaluated",
    gitlab: "Not evaluated",
    gcp: "Not evaluated",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredSlugs = [
  "detector-coverage-atlas",
  "competitive-intelligence-engine",
  "product-release-intelligence",
] as const;

export function featuredProjects() {
  return featuredSlugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function projectsByPhase(
  phase: LifecyclePhase,
  statuses?: ProjectStatus[],
) {
  return projects.filter((project) => {
    if (project.phase !== phase) return false;
    if (!statuses) return true;
    return statuses.includes(project.status);
  });
}

export function sequencedProjects() {
  return projects.filter((project) => project.status === "exploring");
}
