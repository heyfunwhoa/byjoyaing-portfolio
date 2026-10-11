import type { ReactNode } from "react";

export type EvidenceStatus = "used-in-practice" | "illustrative" | "exploring";

const evidenceLabels: Record<EvidenceStatus, string> = {
  "used-in-practice": "Used in practice",
  illustrative: "Illustrative model",
  exploring: "Exploring",
};

export type EvidenceSource = {
  title: string;
  href: string;
  publisher?: string;
};

export function SourceAndEvidencePanel({
  status,
  sources = [],
  limitations,
  children,
}: {
  status: EvidenceStatus;
  sources?: EvidenceSource[];
  limitations: string;
  children?: ReactNode;
}) {
  return (
    <aside aria-label="Evidence, sources and limitations" className="editorial-panel mt-8 bg-card p-5 sm:p-7">
      <p className="editorial-eyebrow text-accent">Evidence and limitations</p>
      <p className="mt-3 text-sm font-semibold">{evidenceLabels[status]}</p>
      {children ? <div className="editorial-prose mt-3 text-sm text-muted">{children}</div> : null}
      <p className="mt-3 text-sm leading-7 text-muted"><span className="font-medium text-foreground">Boundary: </span>{limitations}</p>
      {sources.length > 0 ? (
        <div className="mt-5">
          <h3 className="text-sm font-semibold">Original sources</h3>
          <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-6">
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="text-accent underline underline-offset-4 hover:text-foreground" target="_blank" rel="noopener noreferrer">{source.title}</a>
                {source.publisher ? <span className="text-muted"> — {source.publisher}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
