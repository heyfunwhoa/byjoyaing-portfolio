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
  advance?: string;
  pause?: string;
  connections?: readonly { name: string; href: string; role: string }[];
};

/** Shared Field Notes presentation; authored outlines, not workflow state. */
export function PlaybookOutlines({ playbooks }: { playbooks: readonly PlaybookOutline[] }) {
  return (
    <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
      {playbooks.map((playbook) => (
        <article key={playbook.id} aria-labelledby={`playbook-${playbook.id}`} className="min-w-0 rounded-2xl border border-border bg-card p-6">
          <h3 id={`playbook-${playbook.id}`} className="font-display text-2xl tracking-tight">{playbook.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{playbook.purpose}</p>
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
                ["Evidence to move forward", playbook.advance],
                ["When to pause or walk away", playbook.pause],
                ["Starter kit", playbook.artifacts],
                ["Measures to define", playbook.measures],
                ["Next to build", playbook.next],
              ].map(([label, text]) => text ? (
                <div key={label}>
                  <dt className="font-medium">{label}</dt>
                  <dd className="mt-1 text-muted">{text}</dd>
                </div>
              ) : null)}
              {playbook.connections && (
                <div>
                  <dt className="font-medium">Connected projects</dt>
                  <dd className="mt-1">
                    <ul className="space-y-3">
                      {playbook.connections.map((connection) => (
                        <li key={connection.name}>
                          <a href={connection.href} className="inline-flex min-h-11 items-center rounded-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{connection.name}</a>
                          <p className="text-muted">{connection.role}</p>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </details>
        </article>
      ))}
    </div>
  );
}
