import { detectors } from "@/lib/portfolio";
import type { DirectoryPreview } from "@/lib/project-directory";

export function ProjectPreview({ kind, compact = false }: { kind: DirectoryPreview; compact?: boolean }) {
  if (kind === "atlas") {
    return (
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
          <p className="text-xs font-medium">Coverage sample</p>
          <p className="text-[11px] text-muted">Live rows on this site</p>
        </div>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-3 py-2 font-medium">Source</th>
              <th className="px-3 py-2 font-medium">AWS</th>
              <th className="px-3 py-2 font-medium">GitHub</th>
              <th className="px-3 py-2 font-medium">Slack</th>
              <th className="px-3 py-2 font-medium">GitLab</th>
              <th className="px-3 py-2 font-medium">GCP</th>
            </tr>
          </thead>
          <tbody>
            {detectors.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2 text-muted">{row.aws}</td>
                <td className="px-3 py-2 text-muted">{row.github}</td>
                <td className="px-3 py-2 text-muted">{row.slack}</td>
                <td className="px-3 py-2 text-muted">{row.gitlab}</td>
                <td className="px-3 py-2 text-muted">{row.gcp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (kind === "competitive") {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-[11px] font-medium text-muted">Sample brief, not a monitor</p>
        <p className="mt-2 text-sm font-medium">Detection is not verification</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Source: the public TruffleHog repository, reviewed for this sample in September 2026. Other providers stay Not evaluated.
        </p>
        {!compact ? <p className="mt-3 text-xs text-muted">No crawl, no alert, and no score.</p> : null}
      </div>
    );
  }

  if (kind === "account") {
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-[11px] font-medium text-muted">Illustrative demo data</p>
        <p className="mt-2 text-sm font-medium">Acme Corp · leadership change</p>
        <p className="mt-2 text-sm leading-6 text-muted">New VP of Application Security appointed. The reason to call is a hypothesis, not a fact.</p>
        {!compact ? <p className="mt-3 text-xs text-muted">No live feed. The draft does not send.</p> : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-foreground/30 bg-background p-4">
      <p className="text-[11px] font-medium text-muted">No product screenshot</p>
      <p className="mt-2 text-sm leading-6 text-muted">This card links to the case study. It is not a running interface.</p>
    </div>
  );
}
