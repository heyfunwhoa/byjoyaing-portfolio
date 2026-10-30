import { CollectionBreadcrumb } from "@/components/collection-breadcrumb";

/** Use only real destinations; directory names are not necessarily pages. */
export function AcademyBreadcrumb({ title, playground = false }: { title: string; playground?: boolean }) {
  return (
    <CollectionBreadcrumb items={[
      { href: "/", label: "Home" },
      { href: "/side-quests", label: "Side Quests" },
      { href: "/ai-academy", label: "Builder Academy" },
      ...(playground ? [{ href: "/ai-academy/playground", label: "Playground" }] : []),
      { label: title },
    ]} />
  );
}
