import { ProjectPreview } from "@/components/project-previews";
import type { DirectoryPreview } from "@/lib/project-directory";

const evidence: Record<DirectoryPreview, { label: string; caption: string }> = {
  atlas: {
    label: "On-site sample · Illustrative coverage",
    caption: "A rendered detector-coverage table using sample rows in this site. It is not evidence of live scanning, verified gaps, or continuous monitoring.",
  },
  competitive: {
    label: "Illustrative field brief",
    caption: "A sample research brief explaining source-review practices. It is not a live competitive monitoring service.",
  },
  account: {
    label: "Fictional account scenario",
    caption: "An example account signal and outreach hypothesis; no customer data, external feeds, or outbound sending.",
  },
  note: {
    label: "Case study · Preview unavailable",
    caption: "No application screenshot is available here. Open the linked case study for the project’s current stage, contribution and available evidence.",
  },
};

export function ProjectEvidence({ kind, compact = false }: { kind: DirectoryPreview; compact?: boolean }) {
  const detail = evidence[kind];
  return (
    <figure className="min-w-0">
      <ProjectPreview kind={kind} compact={compact} />
      <figcaption className="mt-2 text-xs leading-5 text-muted">
        <span className="block font-semibold text-foreground">{detail.label}</span>
        {!compact ? <span className="mt-1 block">{detail.caption}</span> : null}
      </figcaption>
    </figure>
  );
}
