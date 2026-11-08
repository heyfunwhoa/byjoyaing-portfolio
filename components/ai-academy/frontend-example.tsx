"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectCardExample } from "@/lib/academy/frontend-lesson";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function FrontendExample({
  view,
  onView,
}: {
  view: string;
  onView: (view: string) => void;
}) {
  return (
    <div id="frontend-example" className="min-w-0 space-y-4">
      <p className="text-sm leading-6 text-muted">
        Explore the same fictional card in words, as a rendered sample, or as
        selectable source. The sample link opens the companion guide.
      </p>
      <Tabs value={view} onValueChange={onView} className="min-w-0 flex-col">
        <TabsList
          aria-label="Example views"
          className="grid w-full grid-cols-3"
        >
          {[
            ["explain", "Plain English"],
            ["preview", "Rendered card"],
            ["code", "Code"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className={`min-w-0 whitespace-normal text-foreground data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:font-semibold motion-reduce:transition-none ${focus}`}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          value="explain"
          className={`space-y-4 pt-3 leading-6 ${focus}`}
        >
          <p>{projectCardExample.plainLanguage}</p>
          <ol className="list-decimal space-y-2 pl-5">
            {projectCardExample.annotations.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
        </TabsContent>
        <TabsContent value="preview" className={`pt-3 ${focus}`}>
          <article className="max-w-sm rounded-xl border border-border bg-background p-4 sm:p-6">
            <h5 className="text-xl font-semibold">
              {projectCardExample.title}
            </h5>
            <p className="mt-2 text-sm leading-6">
              {projectCardExample.summary}
            </p>
            <a
              className={`mt-4 inline-flex min-h-11 items-center underline ${focus}`}
              href={projectCardExample.href}
            >
              {projectCardExample.linkLabel}
            </a>
          </article>
        </TabsContent>
        <TabsContent value="code" className={`min-w-0 space-y-3 pt-3 ${focus}`}>
          <p className="text-xs leading-5 text-muted">
            ProjectCard example · selectable text, not a running app. Scroll
            within the code to read long lines.
          </p>
          <div
            role="region"
            aria-label="Project card source"
            tabIndex={0}
            className={`max-w-full overflow-x-auto rounded-lg border border-border bg-background p-4 ${focus}`}
          >
            <pre className="w-max min-w-full text-sm leading-6">
              <code>{projectCardExample.code}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
