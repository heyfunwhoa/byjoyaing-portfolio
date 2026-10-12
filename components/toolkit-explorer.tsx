"use client";

import Image from "next/image";
import { useId, useState } from "react";
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
  const panelId = useId();
  const section =
    sections.find((item) => item.id === selectedId) ?? sections[0];

  return (
    <div className="space-y-4">
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
        role="group"
        aria-label="Explore toolkit by purpose"
      >
        {sections.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === section.id}
            aria-controls={panelId}
            onClick={() => setSelectedId(item.id)}
            className={`group min-h-24 rounded-2xl border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none ${item.id === section.id ? "border-accent bg-card" : "border-border hover:border-accent hover:bg-card"}`}
          >
            <span className="flex items-center justify-between gap-2 text-xs text-muted">
              <span>0{index + 1}</span>
              <span>{item.tools.length} tools</span>
            </span>
            <span className="mt-2 block text-sm font-semibold">
              {item.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted">
              {item.summary}
            </span>
          </button>
        ))}
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={`${section.title} toolkit`}
        className="rounded-2xl border border-border bg-card p-4 sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">
              {section.summary}
            </p>
          </div>
          <p
            className="text-xs leading-5 text-muted"
            role="status"
            aria-atomic="true"
          >
            Showing {section.tools.length} tools · {section.title}
          </p>
        </div>
        <ul
          key={section.id}
          className="toolkit-panel-enter grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
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
                <p className="mt-2 text-xs leading-5 text-muted">{tool.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs leading-5 text-muted">
        Built with: used in this portfolio. Used professionally: part of my
        work. Learning: still exploring. Product links open official websites;
        tool experience does not imply a live integration.
      </p>
    </div>
  );
}
