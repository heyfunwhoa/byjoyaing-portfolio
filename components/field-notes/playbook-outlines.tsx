import Link from "next/link";
import { resolvePlaybookConnections, type PlaybookOutline } from "@/lib/field-notes/playbook-links";

export function PlaybookOutlines({ playbooks }: { playbooks: readonly PlaybookOutline[] }) {
  return (
    <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
      {playbooks.map((playbook) => (
        <article key={playbook.id} aria-labelledby={`playbook-${playbook.id}`} className="min-w-0 rounded-2xl border border-border bg-card p-6">
          <h3 id={`playbook-${playbook.id}`} className="font-display text-2xl tracking-tight">{playbook.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{playbook.purpose}</p>
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-xs font-medium text-muted">Connected work</p>
            <ul className="mt-2 space-y-3 text-sm leading-6">
              {resolvePlaybookConnections(playbook).map((connection) => (
                <li key={connection.href}>
                  <p className="font-medium">{connection.source}</p>
                  <p className="text-muted">{connection.contribution}</p>
                  <Link href={connection.href} className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">
                    {connection.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <details className="mt-3">
            <summary aria-label={`View ${playbook.title.toLowerCase()} outline`} className="min-h-11 cursor-pointer content-center rounded-sm py-3 text-sm font-medium text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              View outline
            </summary>
            <dl className="mt-3 space-y-4 text-sm leading-6">
              {[
                ["When to use it", playbook.when],
                ["Before", playbook.before],
                ["During", playbook.during],
                ["After", playbook.after],
                ["Starter kit", playbook.artifacts],
                ["Measures to define", playbook.measures],
                ...(playbook.advanceEvidence ? [["Evidence to move forward", playbook.advanceEvidence]] : []),
                ...(playbook.pauseWhen ? [["When to pause or walk away", playbook.pauseWhen]] : []),
                ["Next to build", playbook.next],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="font-medium">{label}</dt>
                  <dd className="mt-1 text-muted">{text}</dd>
                </div>
              ))}
            </dl>
            {playbook.guide && (
              <Link href={playbook.guide.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">
                {playbook.guide.label} →
              </Link>
            )}
          </details>
        </article>
      ))}
    </div>
  );
}
