import {
  getProject,
  projects,
  type Project,
  type ProjectStatus,
} from "@/lib/portfolio";

export const useCases = [
  {
    id: "account",
    title: "Account and industry intelligence",
    promise:
      "Turn a company or an industry change into a brief: who is likely in the room, what is still a hypothesis, and the next action.",
    flow: "Account or industry source → review → brief, personas, hypothesis, next action",
    emphasis: "supporting",
  },
  {
    id: "competitive",
    title: "Competitive and product intelligence",
    promise:
      "Check a claim, compare a capability, and say what a release means without treating an unreviewed cell as a gap.",
    flow: "Source → review → claim, comparison, or approved release line",
    emphasis: "lead",
  },
  {
    id: "enablement",
    title: "Sales enablement and learning systems",
    promise:
      "Give a new AE, SDR, SA, or partner a path and a practice scenario a manager can score.",
    flow: "Role → concepts → practice scenario → readiness check",
    emphasis: "lead",
  },
  {
    id: "workflow",
    title: "GTM workflow design",
    promise:
      "Design the handoff for a partner list, a customer request, or a campaign test. A page on this site is not a system I have deployed.",
    flow: "Incoming list or note → human review → an action someone else can run",
    emphasis: "supporting",
  },
] as const;

export type UseCaseId = (typeof useCases)[number]["id"];
export type UseCaseEmphasis = (typeof useCases)[number]["emphasis"];

export type SalesLink = {
  label: string;
  href: string;
};

export type SalesResult = {
  kind: "measured" | "to-test";
  text: string;
};

export type CapabilityFacts = {
  pipeline: string;
  workingToday: string;
  plannedNext: string;
  implementedTech: string;
};

export type SalesProfile = {
  slug: string;
  useCase: UseCaseId | null;
  salesQuestion: string;
  userMoment: string;
  intake: string;
  produces: string;
  decision: string;
  myRole: string;
  maturityDetail: string;
  fieldAsset: string | null;
  proposedSoftware: string | null;
  links: SalesLink[];
  result: SalesResult;
  related: string[];
} & CapabilityFacts;

const salesProfiles: Array<Omit<SalesProfile, keyof CapabilityFacts>> = [
  {
    slug: "competitive-intelligence-engine",
    useCase: "competitive",
    salesQuestion:
      "What do I say when a CISO or Head of AppSec asks how we differ — and where do I refuse to invent a gap?",
    userMoment:
      "An AE or SA the night before a competitive call, or a new rep who was not in the last deal.",
    intake:
      "Win and loss notes, public product pages, and the questions I kept hearing in discovery.",
    produces:
      "A brief the field can teach: where we win, where we do not, what changed, and the discovery question to ask next.",
    decision: "How to position in this cycle, and what not to claim.",
    myRole:
      "I wrote the briefs and taught them. At Forcepoint I co-created discovery templates and presentations the team used. At Rapid7 I wrote threat-intelligence playbooks for the broader portfolio team. At Truffle I created competitive messaging the sales org adopted.",
    maturityDetail:
      "Those briefs, templates, and playbooks were used with teams. A monitored product — source snapshots, change alerts, automatic recommendations — is a design, not software I have shipped.",
    fieldAsset:
      "Battlecards, competitive briefs, discovery templates, and threat-intelligence playbooks.",
    proposedSoftware:
      "A system that classifies a competitor change and recommends a field action. Designed, not built.",
    links: [],
    result: {
      kind: "to-test",
      text: "I have not measured how often a brief is opened or whether it changes the win. The test I want: a rep can run the conversation without me in the room, and Product gets one specific messaging correction back.",
    },
    related: ["detector-coverage-atlas", "truffle-camp"],
  },
  {
    slug: "detector-coverage-atlas",
    useCase: "competitive",
    salesQuestion:
      "Is this credential type covered, is it the same detector, and can we verify it — without calling an unreviewed cell a gap?",
    userMoment:
      "An SA or AE in a technical evaluation, when a buyer asks for a coverage comparison and the answer is usually tribal.",
    intake:
      "Three rows I typed into this site: TruffleHog, Betterleaks, and Kingfisher.",
    produces:
      "A filtered table: Covered, Observed, or Not evaluated. Unreviewed cells stay Not evaluated.",
    decision: "What I can claim in discovery, and what I have to leave gray.",
    myRole:
      "I built this sample and the rule that gray is not a gap. A larger parser is described in my notes and is not in this repository. This is independent research, not an official Truffle Security product.",
    maturityDetail:
      "What runs is the sample table: 3 sources and 5 credential types. AWS keys and GitHub PATs are Covered for TruffleHog. Slack, GitLab, and GCP are Observed because a public detector folder exists, not because verification was fully reviewed. Notes mention 910 parsed records and 14 enriched. Those rows are not in this repository.",
    fieldAsset: null,
    proposedSoftware:
      "A commit-pinned catalog that ingests public detector files. Not built in this repo. This is not a production scanner and not a Truffle Security product.",
    links: [
      {
        label: "Live sample",
        href: "/#atlas",
      },
      {
        label: "GitHub repository",
        href: "https://github.com/heyfunwhoa/byjoyaing-portfolio",
      },
    ],
    result: {
      kind: "measured",
      text: "The page you can use has 3 sources and 5 credential types. Betterleaks and Kingfisher are Not evaluated. The 910 and 14 counts are notes, not rows in the interface, and there is no revenue claim.",
    },
    related: ["competitive-intelligence-engine", "truffle-camp"],
  },
  {
    slug: "truffle-camp",
    useCase: "enablement",
    salesQuestion:
      "Can a new AE, SDR, SA, or partner explain detection versus verification, and practice a handoff, before they ride along on a live deal?",
    userMoment:
      "A manager checking whether someone is ready for a technical conversation. The learner is in a practice scenario, not on a customer call.",
    intake:
      "A curriculum and synthetic evidence. Later, a learner-safe export from the Atlas. No real secrets.",
    produces:
      "A learning path, a finished exercise, and a readiness check scored from the explanation, not from speed.",
    decision:
      "Whether this person can talk to a Head of AppSec without overclaiming coverage.",
    myRole:
      "I have already done the field version of this work: discovery frameworks and a self-serve onboarding resource at Truffle, industry training at Darktrace, discovery templates at Forcepoint, threat-intelligence playbooks at Rapid7, and ramp resources at Websense. Truffle Camp is the product I designed on top of that pattern. It is not those assets, and it is not deployed.",
    maturityDetail:
      "Designed, with a sample module on this page. The Darktrace ramp result belongs to the training I created there, not to Camp.",
    fieldAsset:
      "Discovery frameworks, onboarding material, industry training, and playbooks that teams used.",
    proposedSoftware:
      "Truffle Camp: Trailhead, one Dig Site mission, Verification Lab, Risk Room, Handoff Desk, and a Field Brief. Curriculum designed. No public repository.",
    links: [],
    result: {
      kind: "measured",
      text: "The Darktrace training and the Truffle onboarding resource are field work. Truffle Camp is the later design. Camp has no learner data.",
    },
    related: [
      "detector-coverage-atlas",
      "product-release-intelligence",
      "competitive-intelligence-engine",
    ],
  },
  {
    slug: "partner-gtm-engine",
    useCase: "workflow",
    salesQuestion:
      "Which accounts does this partner actually share with me, who owns them, and where is the whitespace — once the spreadsheets disagree?",
    userMoment:
      "A rep or channel manager reading a partner list before a joint-account conversation.",
    intake:
      "Partner spreadsheets with different columns. Domain is the match key. If the domain is missing, I want a search plus a human review, not a guess from memory.",
    produces:
      "An ownership class — only us, one partner, a conflict, or unclaimed — a whitespace rank, and an export that partner can see of their own accounts.",
    decision:
      "Whether to co-sell, resolve a conflict, or leave the account alone until the domain is confirmed.",
    myRole:
      "At Metadot I was the global channel account manager and helped stand up a channel program. This engine is the system I would want for that motion. I have not deployed it.",
    maturityDetail:
      "Designed. The Metadot channel program is history from that job. It is not usage of this design.",
    fieldAsset:
      "The Metadot channel motion, and the judgment that came from matching partner lists by hand.",
    proposedSoftware:
      "Domain matching, partner overlap, conflict review, and scored whitespace. Documented. Not deployed.",
    links: [],
    result: {
      kind: "to-test",
      text: "Metric to test: a partner sheet with a missing domain is either matched to a cited source or left in human review, and a conflict view names who to call.",
    },
    related: ["account-intelligence"],
  },
  {
    slug: "account-intelligence",
    useCase: "account",
    salesQuestion:
      "What changed at this account, who is likely in the room, and what should I do next — without refreshing the same feeds by hand?",
    userMoment:
      "One AE or SDR starting the week on assigned accounts, before writing outreach.",
    intake:
      "An assigned account list, plus public company and industry signals: funding, leadership, hiring, stack, and news.",
    produces:
      "An account brief: context, a dated event, likely stakeholders, a hypothesis marked as a hypothesis, discovery questions, and one next action.",
    decision: "Who to contact, what to ask, and what not to treat as fact.",
    myRole:
      "I designed a personal signal feed that stays separate from the partner app, so either one can exist if the other is down. I have not shipped it.",
    maturityDetail:
      "Designed. No public demo. The sample brief on this page is fictional.",
    fieldAsset: null,
    proposedSoftware:
      "Assignment sync, classified signals, and a draft that cites the event. Designed, not running.",
    links: [],
    result: {
      kind: "to-test",
      text: "Metric to test: the outreach names the source and date of the event, and the rep can point to which sentence is a hypothesis.",
    },
    related: [
      "security-signal-intelligence",
      "gtm-campaign-lab",
      "partner-gtm-engine",
    ],
  },
  {
    slug: "security-signal-intelligence",
    useCase: "account",
    salesQuestion:
      "Which security event this week is worth a conversation, and for which accounts?",
    userMoment:
      "A rep preparing an account call, or a field marketer who cannot monitor every advisory alone.",
    intake: "A fixed list of public sources. Not an open-ended crawl.",
    produces:
      "A reviewed note: the event, the source, the date, the accounts it might affect, and whether we should use it. Unreviewed items do not go out.",
    decision: "Whether to open a conversation, and what we are allowed to say.",
    myRole:
      "At Rapid7 I was the threat-intelligence resource across 500+ accounts, partners, and customers, and I wrote playbooks the portfolio team used. At Darktrace I built industry-knowledge training. A shared signal product is still an idea.",
    maturityDetail:
      "Concept. The playbooks and the training were real. I have not completed a design for this product, and I have not built it.",
    fieldAsset:
      "Rapid7 threat-intelligence playbooks and Darktrace industry training.",
    proposedSoftware: "Not designed as a product yet.",
    links: [],
    result: {
      kind: "to-test",
      text: "No product metric. I am not counting the playbooks or the training as usage of this idea.",
    },
    related: ["account-intelligence", "gtm-campaign-lab"],
  },
  {
    slug: "product-release-intelligence",
    useCase: "competitive",
    salesQuestion:
      "Something shipped. Which accounts care, and what should AE, SA, and CSM actually say?",
    userMoment:
      "The day a release leaves engineering, before each function writes its own version of why it matters.",
    intake:
      "The release note, plus account context a human confirms. If the stack is inferred, it stays labeled inferred.",
    produces:
      "Approved release truth, the accounts it applies to, guidance for AE, SA, and CSM, and a customer line that does not overpromise.",
    decision:
      "Inform, push adoption, re-engage, expand, renew, run a proof of concept, or say nothing.",
    myRole:
      "At Truffle I designed the operating model: what shipped, who cares, which accounts it applies to, and what the field should do next. That design is not a deployed product.",
    maturityDetail:
      "Designed. There is no release hub running. The field asset is the question set, not an application.",
    fieldAsset:
      "The questions I use with the field: what changed, why we built it, who cares, why it matters, how to use it, and what not to overpromise.",
    proposedSoftware:
      "A release hub with tiers, tags, and account matches. Not built.",
    links: [],
    result: {
      kind: "to-test",
      text: "Metric to test: time from release to a field-ready note, and the share of important releases that name affected accounts and a next action. I do not have those numbers.",
    },
    related: ["truffle-camp", "customer-feedback-intelligence"],
  },
  {
    slug: "customer-feedback-intelligence",
    useCase: "workflow",
    salesQuestion:
      "What are customers actually asking for, which accounts are behind it, and did we close the loop when it shipped?",
    userMoment:
      "A product conversation or a renewal prep, when the same request is sitting in five notebooks.",
    intake:
      "Field notes, call notes, and feature requests, with the account attached.",
    produces:
      "One theme with duplicates collapsed, the accounts behind it, and a handoff to the release note when it ships.",
    decision: "What to prioritize, and what to tell the customer who asked.",
    myRole:
      "At Truffle I run a sales-to-product feedback loop. That loop is a working habit. The layer that would theme and deduplicate it is a design, not an app.",
    maturityDetail:
      "Designed for the software. The feedback loop with product is in use. I am not calling that loop a shipped product.",
    fieldAsset: "The sales-to-product feedback loop at Truffle.",
    proposedSoftware:
      "Ingestion, themes, account context, and a join to the release note when a theme ships. Not built.",
    links: [],
    result: {
      kind: "to-test",
      text: "Metric to test: duplicate requests collapse into one theme, and a customer who asked hears back when it ships. No theme count and no revenue number.",
    },
    related: ["product-release-intelligence"],
  },
  {
    slug: "gtm-campaign-lab",
    useCase: "workflow",
    salesQuestion:
      "If I test one message on one segment, will I know what happened?",
    userMoment:
      "A rep or GTM lead about to send outreach from an account event or a release, instead of a generic sequence.",
    intake: "A defined segment and one message hypothesis. Not a blast list.",
    produces:
      "A readout: who was in the segment, what we said, and what we will change.",
    decision: "Keep the message, change it, or stop.",
    myRole:
      "I have written outbound plays and ICP profiles at Truffle, and a new-market playbook at Quantcast. I have not built a system that measures those experiments.",
    maturityDetail:
      "Concept. There is no implementation in this repository.",
    fieldAsset: "Outbound plays and ICP profiles. Not a campaign product.",
    proposedSoftware: "Not designed beyond this sketch.",
    links: [],
    result: {
      kind: "to-test",
      text: "No metric. If I build it, the test is one segment, one hypothesis, and a readout that changes the next send.",
    },
    related: ["account-intelligence", "security-signal-intelligence"],
  },
  {
    slug: "product-prioritization-simulator",
    useCase: "workflow",
    salesQuestion:
      "Which bet gets the time, once customer, competitive, and commercial signals disagree?",
    userMoment: "A planning conversation before someone commits build time.",
    intake:
      "A short list of bets, with impact, confidence, and effort written down.",
    produces: "A decision record. Not an automatic roadmap.",
    decision:
      "What we will resource, and which assumption we are willing to be wrong about.",
    myRole:
      "I keep hitting this gap in the field. I have not designed the simulator past this note.",
    maturityDetail:
      "Concept. Not a completed design and not software. It sits with GTM workflow design as a note, not a tool.",
    fieldAsset: null,
    proposedSoftware: null,
    links: [],
    result: {
      kind: "to-test",
      text: "No metric. I am not presenting this as a product.",
    },
    related: ["customer-feedback-intelligence"],
  },
];

const capabilityFacts: Record<string, CapabilityFacts> = {
  "account-intelligence": {
    pipeline:
      "Sample assigned accounts → a classified event, with the hypothesis marked as a hypothesis → a draft the reader can edit and copy.",
    workingToday:
      "A browser walkthrough on the case study. Sample companies only. No live feed, enrichment API, or model call.",
    plannedNext:
      "A personal list of real assignments and a dated public event, with Supabase, Exa, Sumble, and Claude still outside this repo.",
    implementedTech:
      "Next.js walkthrough in this portfolio. Supabase, Exa, Sumble, and Claude are planned, not dependencies here.",
  },
  "security-signal-intelligence": {
    pipeline:
      "A fixed list of public sources → a person reviews the item → a note that says whether a rep should use it. That path is not built.",
    workingToday:
      "Nothing in this repository. Rapid7 playbooks and Darktrace industry training were field work. They are not this product.",
    plannedNext:
      "A reviewed weekly note. I have not turned the source list into software.",
    implementedTech: "None. This page is the note.",
  },
  "competitive-intelligence-engine": {
    pipeline:
      "A cited public page → a claim that keeps the source and date → a hypothesis a person can mark reviewed → a brief. Field notes stay in the browser until approved.",
    workingToday:
      "Battlecards, discovery templates, and threat-intelligence playbooks used with teams. This page is a sample walkthrough. It does not monitor sites, store snapshots, or call a model.",
    plannedNext:
      "Scheduled snapshots of a few public sources, a real diff, and a review queue before any field alert.",
    implementedTech:
      "Next.js walkthrough in this portfolio. One cited GitHub URL. No Firecrawl, Exa, GitHub API, or model.",
  },
  "detector-coverage-atlas": {
    pipeline:
      "Three hardcoded rows → a browser filter → Covered, Observed, or Not evaluated.",
    workingToday:
      "The comparison on this site. TruffleHog has Covered or Observed values. Betterleaks and Kingfisher are Not evaluated. There is no parser, database, or refresh job.",
    plannedNext:
      "Read public detector files at a pinned commit and keep unreviewed cells gray. That code is not in this repo.",
    implementedTech:
      "Next.js, React, and TypeScript. Rows are in lib/portfolio.ts. The filter is components/coverage-explorer.tsx. Tailwind for layout.",
  },
  "product-release-intelligence": {
    pipeline:
      "A release note → I say what changed, who cares, and what not to promise → a field line and a next action. Account matching stays manual in the design.",
    workingToday:
      "The questions I use with the field. There is no release hub in this repository.",
    plannedNext:
      "A page that lists affected accounts only after a person confirms the match.",
    implementedTech: "None beyond this page.",
  },
  "truffle-camp": {
    pipeline:
      "A written scenario → the reader separates detection from verification → a manager could score the explanation. On this site you read the module. You cannot complete it in software.",
    workingToday:
      "The First Expedition write-up on the case study. Teams have used discovery frameworks, playbooks, and Darktrace industry training. Those are not a course app.",
    plannedNext:
      "One playable mission with synthetic evidence and no real secret.",
    implementedTech:
      "Static copy in this Next.js page. No lesson player, saved progress, or model.",
  },
  "partner-gtm-engine": {
    pipeline:
      "A partner row with no website → I refuse to treat a similar name as a match → a human review state before anyone co-sells.",
    workingToday:
      "One fictional match on the case study. No spreadsheet upload, domain search, or CRM sync. Metadot growth numbers are from that job, not from this design.",
    plannedNext:
      "Upload a sheet, match on domain, and leave uncertain rows for a person.",
    implementedTech:
      "Static copy in this Next.js page. No live demo and no public project repo.",
  },
  "customer-feedback-intelligence": {
    pipeline:
      "A sample note → a suggested theme you can correct → a decision a person confirms → a follow-up draft that does not send.",
    workingToday:
      "A browser walkthrough with fictional accounts. The sales-to-product loop at Truffle is the field habit. This page does not ingest CRM notes, call a model, or write a roadmap.",
    plannedNext:
      "CRM and call-note intake, tighter duplicate detection, and a decision log. A join to release notes comes after that.",
    implementedTech:
      "Next.js walkthrough in this portfolio. Sample rows are in the page. No CRM, ticket system, or model.",
  },
  "gtm-campaign-lab": {
    pipeline:
      "One segment → one message → a readout of what to change. Not built.",
    workingToday:
      "Outbound plays and ICP notes from the field. No campaign tool in this repository.",
    plannedNext: "One measured send. Not designed past this page.",
    implementedTech: "None.",
  },
  "product-prioritization-simulator": {
    pipeline:
      "A short list of bets → write impact, confidence, and effort → a decision record. Not built.",
    workingToday: "This page. I have not scored a bet in software.",
    plannedNext: "A scoring sheet. Not an automatic roadmap.",
    implementedTech: "None.",
  },
};

const profileBySlug = new Map(
  salesProfiles.map((profile) => [profile.slug, profile]),
);

for (const project of projects) {
  if (!profileBySlug.has(project.slug) || !capabilityFacts[project.slug]) {
    throw new Error(`Missing sales profile for ${project.slug}`);
  }
}

export type SalesProject = Project & { sales: SalesProfile };

export function salesFor(slug: string): SalesProfile {
  const profile = profileBySlug.get(slug);
  const facts = capabilityFacts[slug];
  if (!profile || !facts) {
    throw new Error(`Missing sales profile for ${slug}`);
  }
  return { ...profile, ...facts };
}

const maturityRank: Record<ProjectStatus, number> = {
  field: 0,
  prototype: 1,
  designed: 2,
  exploring: 3,
};

export function salesProjects(): SalesProject[] {
  return projects
    .map((project) => ({
      ...project,
      sales: salesFor(project.slug),
    }))
    .sort((a, b) => maturityRank[a.status] - maturityRank[b.status]);
}

export function salesProject(slug: string) {
  const project = getProject(slug);
  if (!project) {
    return undefined;
  }
  return { ...project, sales: salesFor(slug) };
}

export function findUseCase(id: UseCaseId) {
  return useCases.find((useCase) => useCase.id === id);
}

export function projectsInUseCase(id: UseCaseId) {
  return salesProjects().filter((project) => project.sales.useCase === id);
}

export const homepageFeatures = [
  {
    useCase: "account",
    slug: "account-intelligence",
    also: ["security-signal-intelligence"],
  },
  {
    useCase: "competitive",
    slug: "detector-coverage-atlas",
    also: ["competitive-intelligence-engine", "product-release-intelligence"],
  },
  {
    useCase: "enablement",
    slug: "truffle-camp",
    also: [],
  },
  {
    useCase: "workflow",
    slug: "partner-gtm-engine",
    also: ["customer-feedback-intelligence", "gtm-campaign-lab"],
  },
] as const;

export function densityFor(slug: string, status: ProjectStatus) {
  if (status === "exploring") {
    return "quiet" as const;
  }
  if (
    slug === "account-intelligence" ||
    slug === "detector-coverage-atlas" ||
    slug === "competitive-intelligence-engine" ||
    slug === "truffle-camp" ||
    slug === "partner-gtm-engine"
  ) {
    return "full" as const;
  }
  return "compact" as const;
}

export const accountBriefSample = {
  kicker: "Illustrative account brief",
  title: "Northline Freight",
  note: "Fictional company. This is the shape of the brief, not a real account and not a live feed.",
  rows: [
    {
      label: "Company and industry",
      value: "Northline Freight. Regional trucking and warehousing.",
    },
    {
      label: "Security-relevant event",
      value:
        "A peer carrier posted that a vendor left cloud keys in a public build log. The post does not say Northline was affected.",
    },
    {
      label: "Source and date",
      value:
        "Illustrative public-style notice. Dated 12 March 2026. Not a real citation.",
    },
    {
      label: "Likely stakeholders",
      value:
        "CISO for risk acceptance. Head of AppSec for the detection standard. Platform engineering for where CI secrets live. I would not pull in procurement unless a tool change is already open.",
    },
    {
      label: "Hypothesis",
      value:
        "Hypothesis: they will ask whether we verify AWS keys or only match the pattern. Hypothesis: platform engineering owns the pipeline, not the SOC. Neither is confirmed.",
    },
    {
      label: "Discovery questions",
      value:
        "Where do long-lived cloud keys enter CI today? Which of those types do you need verified, and which have you not evaluated?",
    },
    {
      label: "Next action",
      value:
        "Ask for a 20-minute scoping call with the Head of AppSec and one platform engineer. Do not send a generic sequence off this event.",
    },
  ],
};

export const claimSample = {
  kicker: "Illustrative claim record",
  title: "Detection is not verification",
  note: "A teaching record for this site. It is not a field-approved battlecard, and it does not name a competitor.",
  rows: [
    {
      label: "Claim",
      value:
        "Finding a credential pattern and verifying that the credential works are separate steps.",
    },
    {
      label: "Competitor",
      value:
        "Unnamed. I do not publish unreviewed allegations about a specific vendor here.",
    },
    {
      label: "Source and date",
      value:
        "TruffleHog public repository, reviewed for this sample in September 2026. https://github.com/trufflesecurity/trufflehog",
    },
    {
      label: "Evidence",
      value:
        "The public project describes itself as finding, verifying, and analyzing leaked credentials. A coverage answer still has to say which types were reviewed. An unreviewed cell is not a gap.",
    },
    {
      label: "Review status",
      value:
        "Reviewed against that public description for this portfolio sample. Not a live competitive record.",
    },
    {
      label: "Positioning I would approve",
      value:
        "Ask what is detected, what is verified, and what has not been evaluated. Do not fill a gray cell with a win.",
    },
    {
      label: "Discovery question",
      value:
        "Which credential types do you verify live, and which have you not evaluated?",
    },
    { label: "Last reviewed", value: "September 2026." },
  ],
};

export const partnerMatchSample = {
  kicker: "Illustrative account match",
  title: "Domain missing, review open",
  note: "Fictional account and partner. No real book of business is on this page.",
  rows: [
    { label: "Account", value: "Northline Freight (fictional)." },
    {
      label: "Partner sheet",
      value: "Partner A sent “Northline Freight Inc” with no website column.",
    },
    {
      label: "Internal book",
      value:
        "A similar name exists. The domain on our side is northline.example.",
    },
    {
      label: "Match",
      value: "Uncertain. Name similarity is not a domain match.",
    },
    {
      label: "Human review",
      value:
        "Needs review. Do not auto-assign the account and do not export it back to the partner as a shared win.",
    },
    {
      label: "Joint action",
      value:
        "Ask Partner A for the website. If the domain matches, mark it a conflict and decide ownership. If it does not, leave it unclaimed.",
    },
  ],
};

export const campModuleSample = {
  kicker: "Sample module",
  title: "First Expedition — accidental commit",
  note: "A learner journey for the designed Truffle Camp curriculum. Not a live course, and not the onboarding assets teams already use.",
  rows: [
    {
      label: "Who it is for",
      value:
        "A new AE or SDR. An SA or partner can take the same mission with a harder handoff.",
    },
    {
      label: "Path",
      value:
        "Trailhead (the secret lifecycle) → Dig Site (one synthetic finding) → explain it to a Head of AppSec → manager check.",
    },
    {
      label: "Product concepts",
      value:
        "Detection versus verification, who owns the repo, and what “not evaluated” means. No live secret and no live provider call.",
    },
    {
      label: "Practice scenario",
      value:
        "A synthetic GitHub token shows up in a public commit. The learner says what was observed, what is still unknown, and the next step. They do not paste a real credential.",
    },
    {
      label: "How a manager scores it",
      value:
        "Ready if the learner names the lifecycle step, refuses to call an unreviewed detector a gap, and writes a next step. Speed does not count.",
    },
  ],
};

export const samplesBySlug = {
  "account-intelligence": accountBriefSample,
  "competitive-intelligence-engine": claimSample,
  "partner-gtm-engine": partnerMatchSample,
  "truffle-camp": campModuleSample,
} as const;

export type SampleRecord = {
  kicker: string;
  title: string;
  note: string;
  rows: { label: string; value: string }[];
};

export function sampleFor(slug: string): SampleRecord | undefined {
  return samplesBySlug[slug as keyof typeof samplesBySlug];
}
