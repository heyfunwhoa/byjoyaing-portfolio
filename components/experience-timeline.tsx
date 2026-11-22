import { roles } from "@/lib/portfolio";
import Link from "next/link";
import { TimelineTrack } from "@/components/timeline-track";

type RelatedLink = { href: string; label: string };

/** Roles before this index are the security selling career; later ones render compactly. */
const EARLIER_CAREER_START = 4;

function RelatedLinks({ company, links }: { company: string; links: RelatedLink[] }) {
  return (
    <ul aria-label={`Related examples for ${company}`} className="mt-4 flex flex-wrap gap-2">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium leading-5 text-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Career timeline adapted from career-rail.tsx: one vertical line with a dot per role.
 * Line and dots are decorative (aria-hidden); the ordered list carries the sequence.
 */
export function ExperienceTimeline({
  related,
}: {
  related: Record<string, RelatedLink[]>;
}) {
  const recent = roles.slice(0, EARLIER_CAREER_START);
  const earlier = roles.slice(EARLIER_CAREER_START);

  return (
    <section id="career-details" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl">Role by role</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Most recent first. Each role&apos;s contribution, with related examples beside it.
      </p>

      <TimelineTrack className="mt-8">
      <ol>
        {recent.map((role, index) => {
          const links = related[role.company] ?? [];
          return (
            <li key={role.company} className="relative pb-10 pl-6 sm:pl-8">
              <span
                aria-hidden="true"
                data-timeline-dot
                className={`timeline-dot absolute top-1.5 -left-[0.4375rem] size-3.5 rounded-full border-2 border-accent data-[reached=true]:bg-accent ${index === 0 ? "bg-accent" : "bg-background"}`}
              />
              {"years" in role && role.years ? (
                <p className="editorial-eyebrow text-accent">{role.years}</p>
              ) : null}
              <h3 className="mt-1 text-xl font-semibold">{role.company}</h3>
              <p className="mt-1 font-medium">{role.title}</p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-base leading-7 text-muted">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {links.length ? <RelatedLinks company={role.company} links={links} /> : null}
            </li>
          );
        })}

        <li className="relative pl-6 sm:pl-8">
          <span
            aria-hidden="true"
            data-timeline-dot
            className="timeline-dot absolute top-2 -left-[0.3125rem] size-2.5 rounded-full border border-accent bg-background data-[reached=true]:bg-accent"
          />
          <h3 className="editorial-eyebrow text-muted">Earlier career</h3>
          <ol className="mt-4 space-y-6">
            {earlier.map((role) => {
              const links = related[role.company] ?? [];
              return (
                <li key={role.company}>
                  <p className="text-base">
                    <span className="font-semibold">{role.company}</span>
                    {"years" in role && role.years ? (
                      <span className="text-muted"> · {role.years}</span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{role.title}</p>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{role.points[0]}</p>
                  {role.points.length > 1 || links.length ? (
                    <details className="mt-2">
                      <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-sm text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        More about {role.company}
                      </summary>
                      {role.points.length > 1 ? (
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                          {role.points.slice(1).map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}
                      {links.length ? <RelatedLinks company={role.company} links={links} /> : null}
                    </details>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </li>
      </ol>
      </TimelineTrack>
    </section>
  );
}
