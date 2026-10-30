import { CollectionBreadcrumb } from "@/components/breadcrumb-trail";
import { fieldNoteTrail } from "@/lib/collection-trail";
export { CollectionBreadcrumb } from "@/components/breadcrumb-trail";

export function FieldNoteBreadcrumb({ title }: { title: string }) {
  return <CollectionBreadcrumb items={fieldNoteTrail(title)} />;
}
