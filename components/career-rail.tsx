import type { CareerRailNode } from "@/lib/career-rail";

/** Horizontal from 1024px, a vertical rail below. The line and dots are decoration. */
export function CareerRail({ nodes }: { nodes: readonly CareerRailNode[] }) {
  return (
    <ol
      aria-label="Career, oldest to newest"
      className="mt-6 grid border-l border-border pl-6 lg:grid-cols-7 lg:border-t lg:border-l-0 lg:pl-0"
    >
      {nodes.map((node) => {
        return (
          <li key={node.company} className="relative min-w-0 py-2 lg:px-2 lg:pt-6 lg:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-[0.9rem] -left-[1.8125rem] size-2.5 rounded-full border border-accent bg-background lg:-top-[0.3125rem] lg:left-2"
            />
            <p className="text-sm font-semibold">{node.company}</p>
            <p className="mt-0.5 text-xs leading-5 text-muted lg:mt-1">{node.title}</p>
          </li>
        );
      })}
    </ol>
  );
}
