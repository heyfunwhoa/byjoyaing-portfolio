import { connectedSources, type ConnectedSourceId } from "../field-notes.ts";
import { directoryProjects } from "../project-directory.ts";
import type { CaseStudySlug } from "../case-studies/summaries.ts";

export type PlaybookOutline = {
  id: string;
  title: string;
  purpose: string;
  when: string;
  before: string;
  during: string;
  after: string;
  artifacts: string;
  measures: string;
  next: string;
  advanceEvidence?: string;
  pauseWhen?: string;
  guide?: { readonly href: string; readonly label: string };
  connections: readonly {
    sourceId: ConnectedSourceId;
    projectSlug?: CaseStudySlug;
    contribution: string;
  }[];
};

/** Resolve editorial connections through the existing source and project registries. */
export function resolvePlaybookConnections(playbook: PlaybookOutline) {
  return playbook.connections.map((connection) => {
    const source = connectedSources.find((item) => item.id === connection.sourceId);
    if (!source) throw new Error(`Unknown playbook source: ${connection.sourceId}`);
    const slug = connection.projectSlug ?? ("publicProjectSlug" in source ? source.publicProjectSlug : undefined);
    if (slug) {
      const project = directoryProjects.find((item) => item.slug === slug);
      if (!project) throw new Error(`Missing playbook project: ${slug}`);
      return { source: source.name, label: project.title, href: project.caseStudyUrl, contribution: connection.contribution };
    }
    if (source.visibility === "public" && "url" in source) {
      return { source: source.name, label: "Explore the public repository", href: source.url, contribution: connection.contribution };
    }
    throw new Error(`No public destination for playbook source: ${source.id}`);
  });
}
