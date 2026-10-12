import type { CareerRailNode } from "@/lib/design-lab-compositions";

export function CareerRail({ nodes }: { nodes: readonly CareerRailNode[] }) {
  return (
    <ol
      aria-label="Career, oldest to newest"
      className="mt-6 grid border-l border-border pl-6 lg:grid-cols-7 lg:border-t lg:border-l-0 lg:pl-0"
    >
      {nodes.map((node) => {
        const current = node.endLabel === "Present";
        return (
          <li key={node.company} className="relative min-w-0 py-3 lg:px-2 lg:pt-6 lg:pb-0">
            <span
              aria-hidden="true"
              className={`absolute top-[1.15rem] -left-[1.8125rem] size-2.5 rounded-full border border-accent lg:-top-[0.3125rem] lg:left-2 ${current ? "bg-accent" : "bg-background"}`}
            />
            <p className="font-mono text-xs text-muted">
              {node.startYear}–{node.endLabel}
            </p>
            <p className="mt-1 text-sm font-semibold">{node.company}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{node.title}</p>
          </li>
        );
      })}
    </ol>
  );
}
