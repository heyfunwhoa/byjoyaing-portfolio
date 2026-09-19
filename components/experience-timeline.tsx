"use client";

import { roles } from "@/lib/portfolio";
import { useState } from "react";

const PREVIEW = 2;

export function ExperienceTimeline() {
  const [open, setOpen] = useState(false);
  const visible = open ? roles : roles.slice(0, PREVIEW);
  const hiddenCount = roles.length - PREVIEW;

  return (
    <div className="flex flex-col gap-8">
      <ol className="flex flex-col">
        {visible.map((role, index) => {
          const expanded = open || index < PREVIEW;
          return (
            <li
              key={`${role.company}-${role.period}`}
              className="grid gap-2 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
            >
              <p className="text-sm text-muted">{role.period}</p>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {role.title}
                </h2>
                <p className="mt-0.5 text-base text-foreground">
                  {role.company}
                  <span className="text-muted"> · {role.category}</span>
                </p>
                <p className="mt-3 text-base leading-7 text-muted">
                  {role.points[0]}
                </p>
                {expanded && role.points.length > 1 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-muted">
                    {role.points.slice(1).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="self-start text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {open ? "Show less" : `Earlier roles (${hiddenCount})`}
        </button>
      ) : null}
    </div>
  );
}
