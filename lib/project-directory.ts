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
  /** Useful limit for the optional How it works disclosure. */
  scope: string;
  /** One sample-data note when the summary does not already say so. */
  sampleNote: string | null;
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
    scope: "The comparison is the table on the case study. A later parser is described there and is not part of this page.",
    sampleNote: null,
    technologies: "Next.js, React, and TypeScript. The rows live in this repository.",
    featuredOrder: 3,
    preview: "atlas",
    demoUrl: "/projects#featured",
    githubUrl: "https://github.com/heyfunwhoa/byjoyaing-portfolio",
  },
  {
    slug: "competitive-intelligence-engine",
    categories: ["Account & Market Intelligence", "Sales Enablement & Productivity"],
    role: "I wrote the briefs and taught them.",
    scope: "The case study walkthrough stays in the browser. It does not monitor sites.",
    sampleNote: "The monitor on the case study is a sample.",
    technologies: "Field documents and a Next.js walkthrough on this page.",
    featuredOrder: 2,
    preview: "competitive",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "account-intelligence",
    categories: ["Account & Market Intelligence"],
    role: "I designed the personal feed and the path from an account change to a draft.",
    scope: "Copy stays in the browser. Planned research sources are named on the case study and are not called from this page.",
    sampleNote: null,
    technologies: "Next.js walkthrough on this page.",
    featuredOrder: 1,
    preview: "account",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "customer-feedback-intelligence",
    categories: ["Customer & Product Intelligence"],
    role: "I run the sales-to-product loop in the field and designed this review.",
    scope: "Confirming a theme stays in the browser and does not send a message.",
    sampleNote: "Fictional accounts.",
    technologies: "Next.js walkthrough on this page.",
    featuredOrder: 4,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "product-release-intelligence",
    categories: ["Customer & Product Intelligence", "Sales Enablement & Productivity"],
    role: "I designed the question set I use with the field.",
    scope: "This page is that question set.",
    sampleNote: null,
    technologies: "The questions on this page.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "truffle-camp",
    categories: ["Sales Enablement & Productivity"],
    role: "I designed the curriculum on top of enablement I have already done with teams.",
    scope: "The knowledge check stays in this page session.",
    sampleNote: null,
    technologies: "A written module and one practice question on this page.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "partner-gtm-engine",
    categories: ["Revenue Strategy & Operations", "Account & Market Intelligence"],
    role: "I designed the match rule from channel work: a similar name is not a confirmed account.",
    scope: "The example does not upload a spreadsheet or sync a CRM.",
    sampleNote: "One fictional match.",
    technologies: "A written example on this page.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "product-prioritization-simulator",
    categories: ["Customer & Product Intelligence"],
    role: "I wrote down the decision I want before a bet gets build time.",
    scope: "This page is the note.",
    sampleNote: null,
    technologies: "This page.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "revenue-planning-simulator",
    categories: ["Revenue Strategy & Operations"],
    role: "I built the planner so retention, expansion, and new ARR stay separate formulas.",
    scope: "The planner is a separate app. This page does not save a scenario or export a file.",
    sampleNote: null,
    technologies: "Next.js, TypeScript, and Postgres in the separate planner. The formulas are deterministic.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "revenue-intelligence",
    categories: ["Revenue Strategy & Operations"],
    role: "I wrote the queries so win rate comes from the close, not the current stage.",
    scope: "The dashboard is a separate app. This page does not query a database.",
    sampleNote: null,
    technologies: "Next.js and PostgreSQL in the separate dashboard.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "gtm-operating-plan",
    categories: ["Revenue Strategy & Operations"],
    role: "I built the operating plan so a hiring change moves capacity and leaves bookings still.",
    scope: "The plan is a separate app. This page does not assign live accounts.",
    sampleNote: null,
    technologies: "Next.js and PostgreSQL in the separate operating plan. Same capacity formulas as the planner.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "gtm-campaign-lab",
    categories: ["Revenue Strategy & Operations"],
    role: "I have written outbound plays and framed the readout I would want after one message.",
    scope: "This page is the question. There is no campaign tool here.",
    sampleNote: null,
    technologies: "This page.",
    featuredOrder: null,
    preview: "note",
    demoUrl: null,
    githubUrl: null,
  },
  {
    slug: "security-signal-intelligence",
    categories: ["Account & Market Intelligence", "Technical Systems & AI"],
    role: "I used playbooks and industry training in the field. This note is the review question for a public source.",
    scope: "This page is the note.",
    sampleNote: null,
    technologies: "This page.",
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
      project.title, project.summary, project.role, project.scope, project.sampleNote ?? "",
      directoryStatus(project.status).label,
      project.phase, ...project.categories,
    ].join(" ").toLocaleLowerCase().includes(normalizedQuery))
  );
}
