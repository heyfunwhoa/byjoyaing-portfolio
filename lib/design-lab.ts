import type { ProjectStatus } from "./portfolio.ts";
import type { PortfolioKind } from "./portfolio-registry.ts";

export type LabFigureKind = "atlas" | "competitive" | "account" | "note";

/**
 * The design lab is a local workshop. Production builds call notFound()
 * when this returns false. Do not treat robots.txt or noindex as the lock.
 */
export function designLabAvailable(nodeEnv = process.env.NODE_ENV) {
  return nodeEnv !== "production";
}

export const labFilters = [
  {
    id: "all",
    label: "All projects",
    description: "Every project already in the public directory.",
  },
  {
    id: "work",
    label: "Professional Work",
    description: "Classified as work. This is field practice, not an independent build.",
  },
  {
    id: "side-quest",
    label: "Side Quests",
    description: "Classified as side-quest. Independent of an employer deployment.",
  },
  {
    id: "gtm",
    label: "GTM Systems",
    description: "Existing category: Revenue Strategy & Operations.",
  },
  {
    id: "technical",
    label: "Security research",
    description: "Existing category: Technical Systems & AI. There is no separate Research tag.",
  },
] as const;

export type LabFilter = (typeof labFilters)[number]["id"];

const figureCopy: Record<LabFigureKind, string | undefined> = {
  atlas: "Coverage sample",
  competitive: "Sample brief, not a monitor",
  account: "Illustrative demo data",
  note: undefined,
};

export type LabProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  href: string;
  status: ProjectStatus;
  technologies: string;
  figure?: string;
  featured: boolean;
  kind: PortfolioKind;
  destinationLabel: string;
  categories: string[];
};

export type LabProjectSource = {
  slug: string;
  title: string;
  summary: string;
  categories: readonly string[];
  technologies: string;
  preview: LabFigureKind;
  status: ProjectStatus;
  caseStudyUrl: string;
  kind: PortfolioKind;
};

export function toLabProject(source: LabProjectSource): LabProject {
  return {
    slug: source.slug,
    title: source.title,
    category: `${source.kind === "work" ? "Professional Work" : "Side quest"} · ${source.categories[0]}`,
    summary: source.summary,
    href: source.caseStudyUrl,
    status: source.status,
    technologies: source.technologies,
    figure: figureCopy[source.preview],
    featured: source.slug === "competitive-intelligence-engine",
    kind: source.kind,
    destinationLabel: source.kind === "work" ? "Read the field approach" : "Read the case study",
    categories: [...source.categories],
  };
}

export function sortLabProjects(projects: LabProject[]) {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
}

export function parseLabFilter(value: string | null | undefined): LabFilter {
  const match = labFilters.find((filter) => filter.id === value);
  return match ? match.id : "all";
}

export function filterLabProjects(projects: LabProject[], filter: LabFilter) {
  if (filter === "work") return projects.filter((project) => project.kind === "work");
  if (filter === "side-quest") return projects.filter((project) => project.kind === "side-quest");
  if (filter === "gtm") {
    return projects.filter((project) => project.categories.includes("Revenue Strategy & Operations"));
  }
  if (filter === "technical") {
    return projects.filter((project) => project.categories.includes("Technical Systems & AI"));
  }
  return projects;
}
