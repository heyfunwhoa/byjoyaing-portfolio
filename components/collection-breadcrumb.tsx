import { Suspense } from "react";
import { ProjectResultsReturn } from "@/components/project-results-return";
import { fieldNoteTrail, workCaseTrail, type TrailItem } from "@/lib/collection-trail";
import { salesProject } from "@/lib/sales";
import Link from "next/link";

export function CollectionBreadcrumb({ items }: { items: readonly TrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex min-h-11 min-w-0 max-w-full items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-muted">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="group inline-flex min-h-11 min-w-0 items-center break-words font-medium text-accent underline underline-offset-4">
                <span className="nudge-link inline-block min-w-0">{item.label}</span>
              </Link>
            ) : (
              <span aria-current="page" className="min-w-0 break-words text-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function WorkCaseBreadcrumb({ slug }: { slug: string }) {
  const title = salesProject(slug)?.title ?? slug;
  return (
    <>
      <CollectionBreadcrumb items={workCaseTrail(slug, title)} />
      <Suspense fallback={null}>
        <ProjectResultsReturn />
      </Suspense>
    </>
  );
}

export function FieldNoteBreadcrumb({ title }: { title: string }) {
  return <CollectionBreadcrumb items={fieldNoteTrail(title)} />;
}
