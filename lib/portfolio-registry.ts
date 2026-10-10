/**
 * Public portfolio classification layer (no separate copy of the project content).
 * Professional field artifacts are Work; independently designed or prototyped
 * concepts are Side Quests. Review classification when publication evidence changes.
 *
 * No private Joy Index content or cross-repository data access is used here.
 */
import { projects, type Project, type ProjectStatus } from "./portfolio.ts";

export type PortfolioKind = "work" | "side-quest";
export type PublicationEvidence = "requires-review" | "approved-public";

export type PortfolioEntry = {
  slug: string;
  title: string;
  kind: PortfolioKind;
  status: ProjectStatus;
  href: string;
  summary: string;
  evidenceNote: string;
  evidenceReview: PublicationEvidence;
};

/** Explicit editorial decision per project, not a guess based on its route. */
export const kindBySlug: Record<string, PortfolioKind> = {
  "detector-coverage-atlas": "side-quest",
  "product-release-intelligence": "side-quest",
  "truffle-camp": "side-quest",
  "competitive-intelligence-engine": "work",
  "customer-feedback-intelligence": "side-quest",
  "product-prioritization-simulator": "side-quest",
  "partner-gtm-engine": "side-quest",
  "account-intelligence": "side-quest",
  "revenue-planning-simulator": "side-quest",
  "revenue-intelligence": "side-quest",
  "gtm-operating-plan": "side-quest",
  "gtm-campaign-lab": "side-quest",
  "security-signal-intelligence": "side-quest",
};

/** Existing case study paths are retained while a future IA migration is planned. */
export function asPortfolioEntry(project: Project): PortfolioEntry {
  const kind = kindBySlug[project.slug];
  if (!kind) throw new Error(`Unclassified public project: ${project.slug}`);
  return {
    slug: project.slug,
    title: project.title,
    kind,
    status: project.status,
    href: `/work/${project.slug}`,
    summary: project.problem.summary,
    evidenceNote: project.evidence,
    evidenceReview: "requires-review",
  };
}

export const portfolioEntries: PortfolioEntry[] = projects.map(asPortfolioEntry);

export function validatePortfolioEntries(entries: readonly PortfolioEntry[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  const validKinds = new Set<PortfolioKind>(["work", "side-quest"]);
  const validStatuses = new Set<ProjectStatus>(["field", "prototype", "designed", "exploring"]);
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) errors.push(`Invalid slug: ${entry.slug}`);
    if (seen.has(entry.slug)) errors.push(`Duplicate slug: ${entry.slug}`);
    seen.add(entry.slug);
    if (!entry.title.trim() || !entry.summary.trim()) errors.push(`Missing public text: ${entry.slug}`);
    if (!validKinds.has(entry.kind)) errors.push(`Invalid kind: ${entry.slug}`);
    if (!validStatuses.has(entry.status)) errors.push(`Invalid status: ${entry.slug}`);
    if (entry.href !== `/work/${entry.slug}`) errors.push(`Unexpected internal route: ${entry.slug}`);
    if (!entry.evidenceNote.trim()) errors.push(`Missing evidence note: ${entry.slug}`);
  }
  return errors;
}
