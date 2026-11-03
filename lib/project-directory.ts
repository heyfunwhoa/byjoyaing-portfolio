import {
  caseStudySummaries,
  type CaseStudySlug,
} from "./case-studies/summaries.ts";
import {
  getProject,
  statusCopy,
  statusHelp,
  type LifecyclePhase,
  type ProjectStatus,
} from "./portfolio.ts";

export const directoryCategories = [
  "All work",
  "Revenue Strategy & Operations",
  "Account & Market Intelligence",
  "Sales Enablement & Productivity",
  "Customer & Product Intelligence",
  "Technical Systems & AI",
] as const;

export type DirectoryCategory = (typeof directoryCategories)[number];

export const categorySlugs = {
  revenue: "Revenue Strategy & Operations",
  accounts: "Account & Market Intelligence",
  enablement: "Sales Enablement & Productivity",
  customer: "Customer & Product Intelligence",
  technical: "Technical Systems & AI",
} as const;

export function categoryFromSlug(slug: string | undefined): DirectoryCategory {
  if (!slug) return "All work";
  return categorySlugs[slug as keyof typeof categorySlugs] ?? "All work";
}

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
  slug: CaseStudySlug;
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
    categories: ["Technical Systems & AI"],
    role: "I built the 3-by-3 sample and the rule that an unreviewed cell stays gray.",
    technologies: "Next.js, React, and TypeScript. The rows live in this repository.",
    featuredOrder: 3,
    preview: "atlas",
    demoUrl: "/projects#featured",
    githubUrl: "https://github.com/heyfunwhoa/byjoyaing-portfolio",
  },
  {
    slug: "competitive-intelligence-engine",
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
    categories: ["Sales Enablement & Productivity"],
    role: "I designed the curriculum on top of enablement I have already done with teams.",
    technologies: "A written module and session-only practice question in this Next.js page. No course platform.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "partner-gtm-engine",
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
    categories: ["Customer & Product Intelligence"],
    role: "I have not scored a bet in software.",
    technologies: "None.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "revenue-planning-simulator",
    categories: ["Revenue Strategy & Operations"],
    role: "I built the planner in gtm-revenue-os. It is not embedded here, and it is not an employer plan.",
    technologies: "Next.js, TypeScript, and Postgres. No language model in the calculation.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "revenue-intelligence",
    categories: ["Revenue Strategy & Operations"],
    role: "I wrote the SQL. Win rate comes from the close, not the current stage.",
    technologies: "Next.js and PostgreSQL in gtm-revenue-os. Not embedded on this site.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "gtm-operating-plan",
    categories: ["Revenue Strategy & Operations"],
    role: "I built the operating plan in gtm-revenue-os. The $25M view is capacity math, not a result.",
    technologies: "Next.js and PostgreSQL. Same capacity formulas as the revenue planner.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "gtm-campaign-lab",
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
  summary: string;
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
    summary: caseStudySummaries[source.slug],
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

/** Shared ordering and matching for the directory and its case-study sequence. */
export function filterDirectoryProjects(category: DirectoryCategory, stage: LifecyclePhase | "All", query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return activeProjects().filter(project =>
    (category === "All work" || project.categories.includes(category)) &&
    (stage === "All" || project.phase === stage) &&
    (!normalizedQuery || [
      project.title, project.summary, project.role, directoryStatus(project.status).label,
      project.phase, ...project.categories,
    ].join(" ").toLocaleLowerCase().includes(normalizedQuery))
  );
}
