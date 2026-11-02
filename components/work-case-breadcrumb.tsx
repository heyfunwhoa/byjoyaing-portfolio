import { Suspense } from "react";
import { ProjectCaseBreadcrumb } from "@/components/project-case-navigation";
import { CollectionBreadcrumb } from "@/components/breadcrumb-trail";
import { workCaseTrail } from "@/lib/collection-trail";
import { directoryProjects } from "@/lib/project-directory";
import { salesProject } from "@/lib/sales";

export function WorkCaseBreadcrumb({ slug }: { slug: string }) {
  const title = salesProject(slug)?.title ?? slug;
  const items = directoryProjects.some(project => project.slug === slug)
    ? [{ href: "/", label: "Home" }, { href: "/projects#directory", label: "Projects" }, { label: title }]
    : workCaseTrail(slug, title);
  return (
    <Suspense fallback={<CollectionBreadcrumb items={items} />}>
      <ProjectCaseBreadcrumb items={items} />
    </Suspense>
  );
}
