import Link from "next/link";

export type RelatedItem = {
  href: string;
  title: string;
  category: "Work" | "Field Notes" | "Side Quests" | "Builder Academy";
  description?: string;
};

export function RelatedWork({ items, heading = "Keep exploring" }: { items: RelatedItem[]; heading?: string }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Related portfolio content" className="my-10 border-t border-border pt-8">
      <h2 className="font-display text-2xl">{heading}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <span className="editorial-eyebrow text-accent">{item.category}</span>
              <span className="mt-2 block text-lg font-semibold">{item.title} →</span>
              {item.description ? <span className="mt-2 block text-sm leading-6 text-muted">{item.description}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
