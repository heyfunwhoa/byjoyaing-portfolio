import { roles } from "@/lib/portfolio";
import Link from "next/link";

type RelatedLink = { href: string; label: string };

export function ExperienceTimeline({
  related,
}: {
  related: Record<string, RelatedLink[]>;
}) {
  return (
    <section id="career-details" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl">Role by role</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Scan the contribution, then open a role for further context.
      </p>
      <ol className="mt-6 divide-y divide-border">
        {roles.map((role) => (
          <li
            key={`${role.company}-${role.period}`}
            className="grid gap-3 py-6 md:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <p className="text-sm text-muted">{role.period}</p>
            <div>
              <h3 className="text-lg font-semibold">{role.company}</h3>
              <p className="mt-1 font-medium">{role.title}</p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <p className="mt-3 text-base leading-7 text-muted">
                {role.points[0]}
              </p>
              <details className="mt-3 rounded-xl border border-border bg-card p-3">
                <summary className="cursor-pointer rounded-sm py-1 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  More about {role.company}
                </summary>
                {role.points.length > 1 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {role.points.slice(1).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
                {related[role.company]?.length ? (
                  <nav
                    aria-label={`Related examples for ${role.company}`}
                    className="mt-3 flex flex-wrap gap-x-4 gap-y-1"
                  >
                    {related[role.company].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                ) : null}
              </details>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
