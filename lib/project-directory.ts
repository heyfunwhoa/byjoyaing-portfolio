import {
  getProject,
  statusCopy,
  statusHelp,
  type LifecyclePhase,
  type ProjectStatus,
} from "@/lib/portfolio";

export const directoryCategories = [
  "All work",
  "Revenue Strategy & Operations",
  "Account & Market Intelligence",
  "Sales Enablement & Productivity",
  "Customer & Product Intelligence",
  "Technical Systems & AI",
] as const;

export type DirectoryCategory = (typeof directoryCategories)[number];

export const lifecycleStages = [
  "Discover",
  "Build",
  "Launch",
  "Enable",
  "Distribute",
  "Measure",
] as const satisfies readonly LifecyclePhase[];

export type DirectoryPreview = "atlas" | "competitive" | "account" | "note";

type DirectorySource = {
  slug: string;
  summary: string;
  categories: Exclude<DirectoryCategory, "All work">[];
  role: string;
  technologies: string;
  featuredOrder: number | null;
  preview: DirectoryPreview;
  demoUrl: string | null;
  githubUrl: string | null;
};

const sources: DirectorySource[] = [
  {
    slug: "detector-coverage-atlas",
    summary:
      "Compare secret-detection coverage in a source-backed sample. A larger catalog and live monitoring are not in this repository.",
    categories: ["Technical Systems & AI"],
    role: "I built the 3-by-3 sample and the rule that an unreviewed cell stays gray.",
    technologies: "Next.js, React, and TypeScript. The rows live in this repository.",
    featuredOrder: 3,
    preview: "atlas",
    demoUrl: "/#atlas",
    githubUrl: "https://github.com/heyfunwhoa/byjoyaing-portfolio",
  },
  {
    slug: "competitive-intelligence-engine",
    summary:
      "Turn competitor research into a source-backed brief and field guidance. Monitoring and automatic updates are designed, not running.",
    categories: ["Account & Market Intelligence", "Sales Enablement & Productivity"],
    role: "I wrote the briefs and taught them. The monitor on the case study is a sample.",
    technologies: "Field documents, Salesforce, and Slack. This page is a Next.js sample, not a crawler.",
    featuredOrder: 2,
    preview: "competitive",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "account-intelligence",
    summary:
      "Watch assigned accounts, separate a business change from a hypothesis, and draft outreach a person still has to send.",
    categories: ["Account & Market Intelligence"],
    role: "I designed the personal feed. The walkthrough uses fictional accounts and does not call a data source.",
    technologies: "Next.js sample. Supabase, Exa, Sumble, and Claude are planned, not installed.",
    featuredOrder: 1,
    preview: "account",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "customer-feedback-intelligence",
    summary:
      "Group customer requests into themes with the account still attached. Intake from CRM and tickets is not connected.",
    categories: ["Customer & Product Intelligence"],
    role: "I run the sales-to-product loop in the field. The workspace is a browser sample.",
    technologies: "Next.js sample. No CRM, ticket system, or model.",
    featuredOrder: 4,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "product-release-intelligence",
    summary:
      "Turn a release into reviewed lines for Sales, Customer Success, and customers. The hub itself is not built.",
    categories: ["Customer & Product Intelligence", "Sales Enablement & Productivity"],
    role: "I designed the question set I use with the field. There is no release application.",
    technologies: "The questions. No release hub in this repository.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "truffle-camp",
    summary:
      "A designed path for secrets-security onboarding and practice. The case study is a written module, not a course app.",
    categories: ["Sales Enablement & Productivity"],
    role: "I designed the curriculum on top of enablement I have already done with teams.",
    technologies: "Static copy in this Next.js page. No lesson player.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "partner-gtm-engine",
    summary:
      "Match partner account lists on domain, leave uncertain rows for a person, and show whitespace. Not deployed.",
    categories: ["Revenue Strategy & Operations", "Account & Market Intelligence"],
    role: "I designed this from channel work. The page shows one fictional match.",
    technologies: "A written design. No spreadsheet upload or CRM sync.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "product-prioritization-simulator",
    summary: "A scoring sheet for a short list of bets. Not designed past this note, and not software.",
    categories: ["Customer & Product Intelligence"],
    role: "I have not scored a bet in software.",
    technologies: "None.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "gtm-campaign-lab",
    summary: "One segment, one message, and a readout of what to change. Not built.",
    categories: ["Revenue Strategy & Operations"],
    role: "I have written outbound plays. I have not built a system that measures them.",
    technologies: "None.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "security-signal-intelligence",
    summary: "A reviewed weekly note from a fixed list of public sources. The product is still an idea.",
    categories: ["Account & Market Intelligence", "Technical Systems & AI"],
    role: "Playbooks and industry training were field work. They are not this product.",
    technologies: "None in this repository.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
];

export type DirectoryProject = DirectorySource & {
  title: string;
  phase: LifecyclePhase;
  status: ProjectStatus;
  caseStudyUrl: string;
};

function hydrate(source: DirectorySource): DirectoryProject {
  const project = getProject(source.slug);
  if (!project) {
    throw new Error(`Missing project ${source.slug}`);
  }
  return {
    ...source,
    title: project.title,
    phase: project.phase,
    status: project.status,
    caseStudyUrl: `/work/${project.slug}`,
  };
}

export const directoryProjects: DirectoryProject[] = sources.map(hydrate);

export function featuredProjects() {
  return directoryProjects
    .filter((project) => project.featuredOrder !== null)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export function activeProjects() {
  return directoryProjects.filter((project) => project.status !== "exploring");
}

export function roadmapProjects() {
  return directoryProjects.filter((project) => project.status === "exploring");
}

export const systemLayers = [
  {
    title: "Market and customer intelligence",
    slugs: ["competitive-intelligence-engine", "customer-feedback-intelligence", "detector-coverage-atlas"],
  },
  {
    title: "GTM and product execution",
    slugs: ["account-intelligence", "partner-gtm-engine", "product-release-intelligence"],
  },
  {
    title: "Field enablement",
    slugs: ["truffle-camp"],
  },
] as const;

export function directoryStatus(status: ProjectStatus) {
  return { label: statusCopy[status], detail: statusHelp[status] };
}
