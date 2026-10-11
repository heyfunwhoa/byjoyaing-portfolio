import Image from "next/image";
import {
  compactTechnologyIds,
  verifiedStack,
} from "@/lib/portfolio/verified-stacks";
import { technologies, type TechnologyId } from "@/lib/portfolio/technology-registry";

type Props = {
  ids: readonly TechnologyId[];
  className?: string;
  showLabels?: boolean;
  size?: "compact" | "default";
  limit?: number;
};

export function TechnologyStack({
  ids,
  className = "",
  showLabels = true,
  size = "default",
  limit,
}: Props) {
  const visible = Array.from(new Set(ids)).slice(0, limit ?? ids.length);
  if (visible.length === 0) return null;

  const compact = size === "compact";

  return (
    <ul
      aria-label="Technologies used"
      className={`flex flex-wrap items-center ${compact ? "gap-2" : "gap-x-4 gap-y-3"} ${className}`}
    >
      {visible.map((id) => {
        const technology = technologies[id];
        return (
          <li
            key={id}
            className={`inline-flex min-w-0 items-center ${compact ? "gap-1.5 text-xs" : "gap-2 text-sm"}`}
          >
            <span
              className={`inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-white ${
                compact ? "size-6 p-1" : "size-8 p-1.5"
              }`}
            >
              <Image
                src={technology.logo}
                alt=""
                width={compact ? 16 : 24}
                height={compact ? 16 : 24}
                unoptimized
                className="size-full object-contain"
              />
            </span>
            {showLabels ? (
              <span>{technology.name}</span>
            ) : (
              <span className="sr-only">{technology.name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectTechnologyStack({
  slug,
  presentation = "detail",
  className = "",
}: {
  slug: string;
  presentation?: "detail" | "compact";
  className?: string;
}) {
  if (presentation === "compact") {
    return (
      <TechnologyStack
        ids={compactTechnologyIds(slug)}
        showLabels={false}
        size="compact"
        className={className}
      />
    );
  }

  const ids = verifiedStack(slug);
  if (ids.length === 0) return null;

  return (
    <section
      aria-labelledby={`built-with-${slug}`}
      className={`border-b border-border py-10 sm:py-12 ${className}`}
    >
      <h2 id={`built-with-${slug}`} className="text-sm font-medium text-foreground">
        Built with
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Confirmed in the repository that renders this page. Planned tools stay in the case study and are not shown as logos.
      </p>
      <TechnologyStack ids={ids} className="mt-4" />
    </section>
  );
}
