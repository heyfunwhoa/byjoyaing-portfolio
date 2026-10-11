import { kindBySlug, type PortfolioKind } from "@/lib/portfolio-kind";
import Link from "next/link";

const copy: Record<PortfolioKind, { href: string; label: string }> = {
  work: { href: "/work", label: "Professional field practice" },
  "side-quest": { href: "/side-quests", label: "Side Quest" },
};

/** Collection label from kindBySlug. The /work/ URL stays unchanged. */
export function ProjectKindLabel({ slug }: { slug: string }) {
  const kind = kindBySlug[slug];
  if (!kind) return null;
  const item = copy[kind];
  return (
    <p>
      <Link
        href={item.href}
        className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
      >
        {item.label}
      </Link>
    </p>
  );
}
