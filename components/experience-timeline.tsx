"use client";

import { roles } from "@/lib/portfolio";
import Link from "next/link";
import { useId, useState } from "react";

const PREVIEW = 2;

type RelatedLink = { href: string; label: string };

export function ExperienceTimeline({ related }: { related: Record<string, RelatedLink[]> }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const visible = open ? roles : roles.slice(0, PREVIEW);
  const hiddenCount = roles.length - PREVIEW;

  return (
    <div className="flex flex-col gap-8">
      <ol id={listId}>
        {visible.map((role) => (
          <li
            key={`${role.company}-${role.period}`}
            className="grid gap-3 border-b border-border py-10 md:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <p className="text-sm text-muted">{role.period}</p>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{role.title}</h2>
              <p className="mt-1">{role.company}</p>
              <p className="mt-1 text-sm text-muted">{role.category}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {related[role.company] ? (
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {related[role.company].map((item) => (
                    <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center font-medium text-accent">
                      {item.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {hiddenCount > 0 ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 self-start items-center text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {open ? "Show fewer roles" : `Earlier roles (${hiddenCount})`}
        </button>
      ) : null}
    </div>
  );
}
