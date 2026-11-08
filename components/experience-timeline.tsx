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
        Each role&apos;s contribution, with related examples one tap away.
      </p>
      <ol className="mt-6 divide-y divide-border">
        {roles.map((role) => (
          <li
            key={role.company}
            className="grid gap-3 py-6"
          >
            <div>
              <h3 className="text-lg font-semibold">{role.company}</h3>
              <p className="mt-1 font-medium">
                {role.title}
                {"years" in role && role.years ? (
                  <span className="font-normal text-muted"> · {role.years}</span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {related[role.company]?.length ? (
                <details className="mt-3 rounded-xl border border-border bg-card p-3">
                  <summary className="flex min-h-11 cursor-pointer items-center rounded-sm py-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    Related examples for {role.company}
                  </summary>
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
                </details>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
