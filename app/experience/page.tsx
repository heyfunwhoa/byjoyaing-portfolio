import { PageMain } from "@/components/page-main";
import { roles } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experience — Kristen Joy Aing",
  description:
    "Enterprise cybersecurity sales roles, field enablement, and the difference between individual results and team programs.",
};

const related: Record<string, { href: string; label: string }[]> = {
  "Truffle Security": [
    { href: "/work/competitive-intelligence-engine", label: "Competitive briefs" },
    { href: "/work/customer-feedback-intelligence", label: "Sales-to-product loop" },
    { href: "/work/product-release-intelligence", label: "Release questions" },
  ],
  Rapid7: [{ href: "/work/security-signal-intelligence", label: "Signal idea, not the playbooks" }],
  Darktrace: [{ href: "/work/truffle-camp", label: "Camp is a later design, not this training" }],
  Forcepoint: [{ href: "/work/competitive-intelligence-engine", label: "Discovery templates" }],
  Metadot: [{ href: "/work/partner-gtm-engine", label: "Partner design, not those results" }],
};

export default function ExperiencePage() {
  return (
    <PageMain>
      <section className="border-b border-border py-16">
        <p className="text-sm font-medium text-muted">Experience</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          A decade of enterprise cybersecurity sales.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Individual quota figures are labeled as mine. Program results, such as a channel number or a ramp change, are team or enablement outcomes. Portfolio projects are not employer deployments unless the note says a team used a document or a training.
        </p>
        <Link href="/contact#resume" className="mt-6 inline-flex text-sm font-medium text-accent">
          Request resume
        </Link>
      </section>
      <ol>
        {roles.map((role) => (
          <li key={`${role.company}-${role.period}`} className="grid gap-3 border-b border-border py-10 md:grid-cols-[12rem_minmax(0,1fr)]">
            <p className="text-sm text-muted">{role.period}</p>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{role.title}</h2>
              <p className="mt-1">{role.company}</p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {related[role.company] ? (
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {related[role.company].map((item) => (
                    <Link key={item.href} href={item.href} className="font-medium text-accent">
                      {item.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </PageMain>
  );
}
