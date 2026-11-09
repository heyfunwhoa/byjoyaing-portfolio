import { Suspense } from "react";
import { ProjectCaseBreadcrumb } from "@/components/project-case-navigation";
import { CollectionBreadcrumb } from "@/components/breadcrumb-trail";
import { workCaseTrail } from "@/lib/collection-trail";
import { kindBySlug } from "@/lib/portfolio-kind";
import { directoryProjects } from "@/lib/project-directory";
import { salesProject } from "@/lib/sales";

export function WorkCaseBreadcrumb({ slug }: { slug: string }) {
  const title = salesProject(slug)?.title ?? slug;
  // Professional work returns to Work; independent projects return through Side Quests > Projects,
  // matching the /projects trail and the header highlight (lib/site-nav.ts).
  const items = kindBySlug[slug] !== "work" && directoryProjects.some(project => project.slug === slug)
    ? [{ href: "/", label: "Home" }, { href: "/side-quests", label: "Side Quests" }, { href: "/projects#directory", label: "Projects" }, { label: title }]
    : workCaseTrail(slug, title);
  return (
    <Suspense fallback={<CollectionBreadcrumb items={items} />}>
      <ProjectCaseBreadcrumb items={items} />
    </Suspense>
  );
}
