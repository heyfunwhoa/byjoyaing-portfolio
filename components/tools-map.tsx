import { AiLoop } from "@/components/ai-loop";
import { ToolMark } from "@/components/tool-mark";
import { toolGroups, toolsFit } from "@/lib/portfolio";

export function ToolsMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      <ul className="grid gap-10 sm:grid-cols-3">
        {toolGroups.map((group) => (
          <li key={group.id} className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-muted">{group.title}</h2>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2.5 text-base leading-6 text-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card">
                    <ToolMark id={item.id} />
                  </span>
                  {item.name}
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
