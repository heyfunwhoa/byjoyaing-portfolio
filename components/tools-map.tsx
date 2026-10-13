import { AiLoop } from "@/components/ai-loop";
import { ToolkitExplorer } from "@/components/toolkit-explorer";
import { toolkitSections } from "@/lib/portfolio/toolkit-sections";
import { siteHowBuilt } from "@/lib/portfolio/toolkit-registry";

export function ToolsMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-5">
      <ToolkitExplorer sections={toolkitSections} compact={compact} />
      {compact ? null : (
        <div className="grid gap-3 md:grid-cols-2">
          <details className="rounded-2xl border border-border bg-card p-4">
            <summary className="cursor-pointer rounded-sm py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              How this site is built
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">{siteHowBuilt}</p>
          </details>
          <details
            id="ai"
            className="scroll-mt-24 rounded-2xl border border-border bg-card p-4"
          >
            <summary className="cursor-pointer rounded-sm py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              My approach to AI · Learning
            </summary>
            <div className="mt-4">
              <AiLoop embedded />
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
