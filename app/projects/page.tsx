import { PageMain } from "@/components/page-main";
import {
  lifecycle,
  projectsByPhase,
  statusCopy,
} from "@/lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Kristen Joy Aing",
  description:
    "Flagship systems organized around Discover → Decide → Build → Launch → Enable → Distribute → Measure.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <section className="flex flex-col gap-3 border-b border-border py-16">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Projects
        </p>
        <h1 className="font-display max-w-2xl text-4xl leading-[1.15] tracking-tight text-foreground sm:text-5xl">
          Organized around the product-to-market lifecycle.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Status is explicit. Prototype means something runs here. Field system
          means it ran with a team. Designed means the operating model exists.
          Next means it is sequenced, not claimed.
        </p>
      </section>

      {lifecycle.map((phase) => {
        const items = projectsByPhase(phase);
        if (items.length === 0) {
          return null;
        }

        return (
          <section
            id={phase.toLowerCase()}
            key={phase}
            className="flex flex-col gap-4 border-b border-border py-12"
          >
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              {phase}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {items.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent"
                  >
                    <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                      {statusCopy[project.status]}
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted">
                      {project.problem.summary}
                    </p>
                    <p className="mt-auto pt-2 text-sm font-medium text-accent">
                      Case study
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section id="measure" className="flex flex-col gap-3 py-12">
        <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Measure
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          There is no separate Measure product. Every case study has operational,
          behavioral, and business metrics — and a hypothesis until usage data
          exists.
        </p>
      </section>
    </PageMain>
  );
}
