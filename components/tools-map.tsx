import { AiLoop } from "@/components/ai-loop";
import { ToolMark } from "@/components/tool-mark";
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

export function ToolsMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-10">
        {techCategories.map((group) => (
          <li key={group.id} className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-muted">{group.title}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border border-border bg-card p-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background">
                    <ToolMark id={item.id} />
                  </span>
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
