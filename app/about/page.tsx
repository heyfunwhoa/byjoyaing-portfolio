import { PageMain } from "@/components/page-main";
import { bio, lifecycle, loop, roles, targetRoles } from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Kristen Joy Aing",
  description:
    "Technical GTM and product-oriented operator: background, approach, and enterprise cybersecurity experience from Forcepoint through Truffle Security.",
};

export default function AboutPage() {
  return (
    <PageMain>
      <section className="flex flex-col gap-6 border-b border-border py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          About
        </p>
        <h1 className="font-display max-w-2xl text-4xl leading-[1.15] tracking-tight text-foreground sm:text-5xl">
          Technical GTM and product-oriented operator — not an AE becoming a
          PM.
        </h1>
        <div className="max-w-2xl space-y-4 leading-7 text-muted">
          <p>{bio}</p>
          <p>
            My background is in enterprise cybersecurity revenue, but the work
            sits at the intersection of Product, customers, and go-to-market. I
            identify recurring friction in how technical products are
            understood, evaluated, launched, adopted, and scaled, then design
            systems, workflows, and prototypes that make those motions
            repeatable.
          </p>
          <p>
            This is not traditional sales enablement, CRM administration, or an
            Account Executive trying to become a Product Manager. It is
            enterprise customers, commercial outcomes, product workflows, and
            the systems behind them.
          </p>
        </div>
        <ol className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          {loop.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
            >
              {index > 0 ? (
                <span className="hidden text-muted sm:inline" aria-hidden="true">
                  →
                </span>
              ) : null}
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ol>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Product-to-market lifecycle
          </p>
          <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {lifecycle.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
              >
                {index > 0 ? (
                  <span className="hidden text-muted sm:inline" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <Link
                  className="text-foreground underline-offset-4 hover:underline"
                  href={`/projects#${step.toLowerCase()}`}
                >
                  {step}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Where this work points
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <li
                key={role}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            Trajectory: enterprise sales → product GTM / GTM strategy → product
            strategy → product management / product leadership.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8 border-b border-border py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Experience
        </p>
        <ol className="flex flex-col gap-8">
          {roles.map((role) => (
            <li
              key={role.company}
              className="grid gap-3 border-b border-border pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {role.period}
              </p>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {role.title}
                </h2>
                <p className="mt-1 text-sm text-foreground">{role.company}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                  {role.category}
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Education & credentials
        </p>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
          <li>
            <span className="font-medium text-foreground">MBA, IT Management</span>
            {" — "}
            Western Governors University (in progress)
          </li>
          <li>
            <span className="font-medium text-foreground">
              B.S. Advertising, Business Foundations
            </span>
            {" — "}
            The University of Texas at Austin
          </li>
          <li>
            <span className="font-medium text-foreground">AWS</span>
            {" — "}
            Cloud Practitioner and AI Practitioner (Foundational)
          </li>
        </ul>
      </section>
    </PageMain>
  );
}
