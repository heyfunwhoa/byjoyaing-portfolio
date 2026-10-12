import { fieldNoteTrail, workCaseTrail, type TrailItem } from "@/lib/collection-trail";
import { salesProject } from "@/lib/sales";
import Link from "next/link";

export function CollectionBreadcrumb({ items }: { items: readonly TrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex min-h-11 items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-muted">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="font-medium text-accent underline underline-offset-4">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
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
  return <CollectionBreadcrumb items={workCaseTrail(slug, title)} />;
}

export function FieldNoteBreadcrumb({ title }: { title: string }) {
  return <CollectionBreadcrumb items={fieldNoteTrail(title)} />;
}
