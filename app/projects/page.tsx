import { Kicker } from "@/components/kicker";
import { PageMain } from "@/components/page-main";
import { ProjectRow } from "@/components/project-row";
import { Rail } from "@/components/rail";
import {
  lifecycle,
  projectsByPhase,
  sequencedProjects,
} from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Kristen Joy Aing",
  description:
    "Flagship systems organized around Discover → Decide → Build → Launch → Enable → Distribute → Measure.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <section className="grid gap-6 border-b border-border py-16 sm:py-20 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-12">
        <Kicker>Projects</Kicker>
        <div className="flex flex-col gap-4">
          <h1 className="font-display max-w-2xl text-4xl leading-[1.12] tracking-tight text-foreground sm:text-6xl">
            Organized around the product-to-market lifecycle.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Status is explicit. Prototype means something runs here. Field
            system means it ran with a team. Designed means the operating model
            exists. Next means it is sequenced, not claimed.
          </p>
        </div>
      </section>

      {lifecycle.map((phase) => {
        const items = projectsByPhase(phase, [
          "prototype",
          "field-system",
          "designed",
        ]);
        if (items.length === 0) {
          return null;
        }

        return (
          <Rail id={phase.toLowerCase()} label={phase} key={phase}>
            <ul>
              {items.map((project) => (
                <li key={project.slug} className="border-t border-border first:border-t-0">
                  <ProjectRow project={project} />
                </li>
              ))}
            </ul>
          </Rail>
        );
      })}

      <Rail label="Next" tick>
        <div>
          <p className="mb-4 max-w-2xl text-base leading-7 text-muted">
            These are next on the list — operating models only. They are not
            live products.
          </p>
          <ul>
            {sequencedProjects().map((project) => (
              <li key={project.slug} className="border-t border-border">
                <ProjectRow project={project} showPhase />
              </li>
            ))}
          </ul>
        </div>
      </Rail>

      <Rail id="measure" label="Measure" className="border-b-0">
        <p className="max-w-2xl text-base leading-7 text-muted">
          There is no separate Measure product. Every case study has operational,
          behavioral, and business metrics — and a hypothesis until usage data
          exists.
        </p>
      </Rail>
    </PageMain>
  );
}
