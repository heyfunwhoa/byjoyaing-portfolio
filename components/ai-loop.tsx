import { Index } from "@/components/kicker";
import { aiLoop } from "@/lib/portfolio";

export function AiLoop() {
  return (
    <div id="ai" className="flex scroll-mt-24 flex-col gap-5">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="text-sm font-medium text-muted">AI in the system</h2>
        <p className="text-sm text-muted">Learning — not a product</p>
      </div>
      <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {aiLoop.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2">
            <Index n={index + 1} />
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-6 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
