"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Collapsible } from "radix-ui";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ToolMark } from "@/components/tool-mark";
import type { TechStance } from "@/lib/portfolio";
import type { ToolkitSection } from "@/lib/portfolio/toolkit-sections";

const stanceLabels: Record<TechStance, string> = {
  built: "Built with",
  professional: "Used professionally",
  learning: "Learning",
};

export function ToolkitExplorer({
  sections,
  compact = false,
}: {
  sections: ToolkitSection[];
  compact?: boolean;
}) {
  const [selectedId, setSelectedId] = useState(sections[0].id);
  return (
    <div className="space-y-4">
      <p className="text-xs leading-5 text-muted">
        Choose a workflow · Explore the tools · Follow the evidence
      </p>
      <Tabs value={selectedId} onValueChange={setSelectedId} className="gap-4">
        <TabsList
          variant="line"
          aria-label="Explore how I work"
          className="grid h-auto w-full grid-cols-2 items-stretch gap-2 bg-transparent p-0 sm:grid-cols-3 lg:grid-cols-5"
        >
          {sections.map((section, index) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="group min-h-28 flex-col items-start justify-start gap-0 rounded-2xl border border-border p-4 text-left whitespace-normal text-foreground transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent data-[state=active]:border-accent data-[state=active]:bg-card data-[state=active]:text-foreground motion-reduce:transition-none"
            >
              <span className="flex w-full items-center justify-between text-xs text-muted">
                <span>0{index + 1}</span>
                <span aria-hidden="true" className="text-accent">
                  {selectedId === section.id ? "Selected" : "Explore"}
                </span>
              </span>
              <span className="mt-2 block text-sm font-semibold">
                {section.title}
              </span>
              <span className="mt-1 block text-xs leading-5 font-normal text-muted">
                {section.summary}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {sections.map((section) => (
          <TabsContent
            key={section.id}
            value={section.id}
            className="toolkit-panel-enter rounded-2xl border border-border bg-card p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-6"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div>
                <p className="text-xs font-medium text-accent">
                  {section.status}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{section.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  {section.example}
                </p>
                <Link
                  href={section.evidence.href}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {section.evidence.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                </Link>
              </div>
              <ol
                className="grid content-start gap-2 sm:grid-cols-3 lg:grid-cols-1"
                aria-label={`${section.title} approach`}
              >
                {section.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs text-accent"
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Collapsible.Root className="mt-5 border-t border-border pt-4">
              <Collapsible.Trigger asChild>
                <Button
                  variant="outline"
                  className="group w-full justify-between gap-3 border-border bg-background text-left whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
                >
                  <span>
                    Explore supporting tools{" "}
                    <span className="font-normal text-muted">
                      ({section.tools.length})
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                  />
                </Button>
              </Collapsible.Trigger>
              <Collapsible.Content className="toolkit-disclosure overflow-hidden">
                <div className="pt-4">
                  <p className="mb-3 text-xs leading-5 text-muted">
                    Tools can support several workflows. Each appears here under
                    its primary purpose; usage labels distinguish field
                    experience, this portfolio and learning.
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {section.tools.map((tool) => (
                      <li
                        key={tool.id}
                        className="min-w-0 rounded-xl border border-border bg-background p-3"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border ${tool.logo ? "bg-white p-2" : "bg-card"}`}
                          >
                            {tool.logo ? (
                              <Image
                                src={tool.logo}
                                alt=""
                                width={24}
                                height={24}
                                unoptimized
                                className="size-full object-contain"
                              />
                            ) : (
                              <ToolMark id={tool.id} />
                            )}
                          </span>
                          <div className="min-w-0">
                            {tool.href ? (
                              <a
                                href={tool.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${tool.name} website (opens in a new tab)`}
                                className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold underline decoration-border underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                              >
                                {tool.name}
                                <span aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              <span className="block text-sm leading-6 font-semibold">
                                {tool.name}
                              </span>
                            )}
                            <span
                              className={`block text-xs leading-5 ${tool.stance === "built" ? "text-accent" : "text-muted"}`}
                            >
                              {stanceLabels[tool.stance]}
                            </span>
                          </div>
                        </div>
                        {compact ? null : (
                          <p className="mt-2 text-xs leading-5 text-muted">
                            {tool.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-xs leading-5 text-muted">
        Built with: used in this portfolio. Used professionally: part of my
        work. Learning: still exploring. Product links open official websites;
        tool experience does not imply a live integration.
      </p>
    </div>
  );
}
