import { AiLoop } from "@/components/ai-loop";
import { ToolMark } from "@/components/tool-mark";
import { officialToolWebsites } from "@/lib/portfolio/external-links";
import {
  techCategories,
  techStanceCopy,
  toolsFit,
  type TechStance,
} from "@/lib/portfolio";

const stanceClass: Record<TechStance, string> = {
  built: "bg-accent text-accent-foreground",
  professional: "border border-accent bg-card text-accent",
  learning: "border border-dashed border-foreground/40 text-foreground",
};

export function ToolsMap({ compact = false, headingLevel = "h2" }: { compact?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-10">
        {techCategories.map((group) => (
          <li key={group.id} className="flex flex-col gap-4">
            <Heading className="text-sm font-medium text-muted">{group.title}</Heading>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border border-border bg-card p-3"
                >
                  {officialToolWebsites[item.id] ? (
                    <a
                      href={officialToolWebsites[item.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.name} website (opens in a new tab)`}
                      title={`Visit ${item.name}`}
                      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-surface-sage"
                    >
                      <ToolMark id={item.id} />
                    </a>
                  ) : (
                    <span className="flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-border bg-background">
                      <ToolMark id={item.id} />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base leading-6 text-foreground">
                        {item.name}
                      </span>
                      <span
                        className={`inline-flex w-fit rounded-md px-2 py-0.5 text-xs font-medium ${stanceClass[item.stance]}`}
                      >
                        {techStanceCopy[item.stance]}
                      </span>
                    </span>
                    {compact ? null : (
                      <span className="text-sm leading-6 text-muted">
                        {item.note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {compact ? null : (
        <p className="max-w-3xl text-base leading-7 text-muted">{toolsFit}</p>
      )}
      <AiLoop />
    </div>
  );
}
