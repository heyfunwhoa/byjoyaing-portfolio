import { Suspense } from "react";
import { ProjectCaseBreadcrumb } from "@/components/project-case-navigation";
import { CollectionBreadcrumb } from "@/components/breadcrumb-trail";
import { fieldNoteTrail, workCaseTrail } from "@/lib/collection-trail";
import { directoryProjects } from "@/lib/project-directory";
import { salesProject } from "@/lib/sales";
export { CollectionBreadcrumb } from "@/components/breadcrumb-trail";

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

export function FieldNoteBreadcrumb({ title }: { title: string }) {
  return <CollectionBreadcrumb items={fieldNoteTrail(title)} />;
}
