import Image from "next/image";
import {
  compactTechnologyIds,
  verifiedStack,
} from "@/lib/portfolio/verified-stacks";
import {
  technologies,
  type TechnologyId,
} from "@/lib/portfolio/technology-registry";

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
      className={`flex flex-wrap items-center ${compact ? "gap-1" : "gap-x-3 gap-y-2"} ${className}`}
    >
      {visible.map((id) => {
        const technology = technologies[id];
        return (
          <li key={id} className="min-w-0">
            {compact ? (
              <span
                role="img"
                aria-label={technology.name}
                title={technology.name}
                className={`group/tech inline-flex items-center rounded-md text-foreground transition-colors duration-200 hover:text-accent ${compact ? "size-6 justify-center gap-0" : "min-h-11 gap-2"}`}
              >
                <span
                  className={`inline-flex shrink-0 items-center justify-center rounded-sm border border-border bg-white transition-colors duration-200 group-hover/tech:border-accent ${compact ? "size-4 p-0.5" : "size-6 p-1"}`}
                >
                  <Image
                    src={technology.logo}
                    alt=""
                    width={compact ? 10 : 12}
                    height={compact ? 10 : 12}
                    unoptimized
                    className="size-full object-contain"
                  />
                </span>
                {showLabels ? (
                  <span className="text-sm">{technology.name}</span>
                ) : null}
              </span>
            ) : (
              <a
                href={technology.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${technology.name} website (opens in a new tab)`}
                title={technology.name}
                className={`group/tech inline-flex items-center rounded-md text-foreground transition-colors duration-200 hover:text-accent ${compact ? "size-6 justify-center gap-0" : "min-h-11 gap-2"}`}
              >
                <span
                  className={`inline-flex shrink-0 items-center justify-center rounded-sm border border-border bg-white transition-colors duration-200 group-hover/tech:border-accent ${compact ? "size-4 p-0.5" : "size-6 p-1"}`}
                >
                  <Image
                    src={technology.logo}
                    alt=""
                    width={compact ? 10 : 12}
                    height={compact ? 10 : 12}
                    unoptimized
                    className="size-full object-contain"
                  />
                </span>
                {showLabels ? (
                  <span className="text-sm">{technology.name}</span>
                ) : null}
              </a>
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
    <details
      aria-labelledby={`built-with-${slug}`}
      className={`my-5 rounded-xl border border-border bg-card p-4 ${className}`}
    >
      <summary
        id={`built-with-${slug}`}
        className="cursor-pointer py-1 text-sm font-medium text-foreground"
      >
        Built with
      </summary>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Confirmed in the repository that renders this page. Planned tools stay
        in the case study and are not shown as logos.
      </p>
      <TechnologyStack ids={ids} className="mt-4" />
    </details>
  );
}
