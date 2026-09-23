import {
  getProject,
  projects,
  type Project,
  type ProjectStatus,
} from "@/lib/portfolio";

export const useCases = [
  {
    id: "competitive",
    title: "Competitive selling and technical differentiation",
    promise:
      "I use this when a rep or SA has to check a claim, compare a capability, and frame discovery without treating “not evaluated” as a competitive gap.",
    flow: "Claim → source and date → evidence → review status → approved positioning → discovery question",
    emphasis: "lead",
  },
  {
    id: "enablement",
    title: "Sales enablement and technical ramp",
    promise:
      "I use this when a new AE, SDR, SA, or partner needs a path through the product, a practice scenario, and a readiness check a manager can score.",
    flow: "Role → learning path → product concepts → practice scenario → manager readiness check",
    emphasis: "lead",
  },
  {
    id: "channel",
    title: "Territory and channel partnerships",
    promise:
      "I use this when partner lists do not match the book of business: normalize the account, review overlap and conflicts, see whitespace, and pick a joint action.",
    flow: "Partner sheet → domain match → overlap and conflict review → whitespace → joint account action",
    emphasis: "supporting",
  },
  {
    id: "account",
    title: "Account and industry intelligence",
    promise:
      "I use this when a company or industry change should become an account brief, the people likely in the room, a hypothesis, and a next action.",
    flow: "Company and industry sources → dated change → account brief → personas → outreach hypothesis → next action",
    emphasis: "supporting",
  },
  {
    id: "release",
    title: "Product-to-field execution",
    promise:
      "I use this when something ships or a customer asks for it, and AE, SA, and CSM still need one approved story and a list of accounts it touches.",
    flow: "Source material → approved release truth → affected accounts → AE / SA / CSM guidance → customer communication",
    emphasis: "supporting",
  },
  {
    id: "campaign",
    title: "Campaign experimentation",
    promise:
      "A future place to test one message on one segment and read the result. I have not built it.",
    flow: "Segment → one message hypothesis → readout",
    emphasis: "future",
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
};

const salesProfiles: SalesProfile[] = [
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
    intake: "Public detector source and provider docs, pinned to a commit.",
    produces:
      "A comparison cell with a source, a review state, and an explicit “not evaluated” when the public material has not been read.",
    decision: "What I can claim in discovery, and what I have to leave gray.",
    myRole:
      "I set the catalog rules and ran a parser against public TruffleHog. This is independent research. It is not an official Truffle Security product.",
    maturityDetail:
      "A sample comparison runs on this page. My notes say the parser observed 910 TruffleHog detector records and 14 are enriched (September 2026). The parser is not in this repository, so those counts are research notes, not a number you can re-run here.",
    fieldAsset: null,
    proposedSoftware:
      "The catalog is the prototype. It is not a production scanner and not a company product.",
    links: [
      {
        label: "Portfolio source on GitHub",
        href: "https://github.com/heyfunwhoa/byjoyaing-portfolio",
      },
    ],
    result: {
      kind: "measured",
      text: "Research note, not a revenue result: 910 public TruffleHog detector records parsed, 14 enriched, as recorded in this portfolio for September 2026. No adoption or pipeline number.",
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
      "Designed concept, with a sample module on this page. The Darktrace ramp result belongs to the training I created there, not to Camp.",
    fieldAsset:
      "Discovery frameworks, onboarding material, industry training, and playbooks that teams used.",
    proposedSoftware:
      "Truffle Camp: Trailhead, one Dig Site mission, Verification Lab, Risk Room, Handoff Desk, and a Field Brief. Curriculum designed. No public repository.",
    links: [],
    result: {
      kind: "measured",
      text: "Field result, not a Camp result: at Darktrace, industry-knowledge training and business-value tools I created cut new-rep ramp time by 50%. This portfolio does not include how that was measured. Camp has no learner data.",
    },
    related: [
      "detector-coverage-atlas",
      "product-release-intelligence",
      "competitive-intelligence-engine",
    ],
  },
  {
    slug: "partner-gtm-engine",
    useCase: "channel",
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
      "Designed concept. The Metadot figures are channel results from that job: distribution sales grew 25% to $3.4M in 2017 and 33% to $4.5M in 2018. They are not usage of this design.",
    fieldAsset:
      "The Metadot channel motion, and the judgment that came from matching partner lists by hand.",
    proposedSoftware:
      "Domain matching, partner overlap, conflict review, and scored whitespace. Documented. Not deployed.",
    links: [],
    result: {
      kind: "to-test",
      text: "Metric to test: a partner sheet with a missing domain is either matched to a cited source or left in human review, and a conflict view names who to call. Do not read the Metadot growth numbers as a result of this design.",
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
      "Designed concept. No public demo. The sample brief on this page is fictional.",
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
      "Exploring. The playbooks and the training were real. I have not completed a design for this product, and I have not built it.",
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
    useCase: "release",
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
      "Designed concept. There is no release hub running. The field asset is the question set, not an application.",
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
    useCase: "release",
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
      "Designed concept for the software. The feedback loop with product is in use. I am not calling that loop a shipped product.",
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
    useCase: "campaign",
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
      "Exploring. Future concept. There is no implementation in this repository.",
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
    useCase: null,
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
      "Exploring. Not a completed design and not software. I am not filing it under a sales use case.",
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

const profileBySlug = new Map(
  salesProfiles.map((profile) => [profile.slug, profile]),
);

for (const project of projects) {
  if (!profileBySlug.has(project.slug)) {
    throw new Error(`Missing sales profile for ${project.slug}`);
  }
}

export type SalesProject = Project & { sales: SalesProfile };

export function salesFor(slug: string) {
  const profile = profileBySlug.get(slug);
  if (!profile) {
    throw new Error(`Missing sales profile for ${slug}`);
  }
  return profile;
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

export const homepageStorySlugs = [
  "competitive-intelligence-engine",
  "partner-gtm-engine",
  "detector-coverage-atlas",
] as const;

export function homepageStories() {
  return homepageStorySlugs.map((slug) => {
    const project = salesProject(slug);
    if (!project) {
      throw new Error(`Missing homepage story ${slug}`);
    }
    return project;
  });
}

export const salesProof: {
  value: string;
  label: string;
  detail: string;
}[] = [
  {
    value: "108%",
    label: "of a $1.3M quota",
    detail: "Forcepoint, 2020. Top 2 of 10 in the region.",
  },
  {
    value: "97%",
    label: "of a $1M quota",
    detail:
      "Rapid7. Closed the team’s largest threat-intelligence deal in 2022.",
  },
  {
    value: "Top 2 of 9",
    label: "pipeline growth",
    detail:
      "Darktrace, greenfield territory. Industry training I created cut new-rep ramp by 50%.",
  },
  {
    value: "$1.4M",
    label: "quota I own now",
    detail:
      "Truffle Security. I am not stating attainment. Discovery frameworks and competitive messaging I wrote were adopted across the sales org.",
  },
];

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

export function densityFor(status: ProjectStatus, emphasis: UseCaseEmphasis) {
  if (emphasis === "future" || status === "exploring") {
    return "quiet" as const;
  }
  if (emphasis === "lead") {
    return "full" as const;
  }
  return "compact" as const;
}
