"use client";

import { useId, useState } from "react";
import { ProjectEvidence } from "@/components/project-evidence";
import { directoryProjects, directoryStatus } from "@/lib/project-directory";
import { getProject } from "@/lib/portfolio";

const caseStudies = [
  {
    slug: "detector-coverage-atlas",
    evidence: "atlas" as const,
    limitation: "This is a fixed, illustrative table. It does not run scanners or establish comparative product gaps.",
    next: "Inspect source attribution and the meanings of Covered, Observed, and Not evaluated.",
    link: "/work/detector-coverage-atlas",
  },
  {
    slug: "account-intelligence",
    evidence: "account" as const,
    limitation: "The walkthrough uses fictional accounts. There is no live feed, source retrieval, or sent outreach.",
    next: "Review the example signal, decision path, and human approval boundary.",
    link: "/work/account-intelligence",
  },
] as const;

export function CaseStudyEvidenceComparison() {
  const id = useId();
  const [selected, setSelected] = useState<(typeof caseStudies)[number]["slug"]>("detector-coverage-atlas");
  const [presentation, setPresentation] = useState<"story" | "evidence">("story");
  const entry = caseStudies.find((item) => item.slug === selected)!;
  const directory = directoryProjects.find((item) => item.slug === selected);
  const project = getProject(selected);
  if (!directory || !project) return null;

  return (
    <section id="case-study-evidence" aria-labelledby={id} className="scroll-mt-24 border-t border-border py-12">
      <p className="editorial-eyebrow text-accent">Design Lab · Evidence-first storytelling</p>
      <h2 id={id} className="mt-2 font-display text-2xl tracking-tight">A project story, grounded in what exists.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        Compare an editorial explanation with an evidence-led view. Both use the portfolio&apos;s existing
        public project records and captions. Neither creates screenshots, measured outcomes, or software integrations.
      </p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose a case study">
        {caseStudies.map((item) => {
          const record = directoryProjects.find((project) => project.slug === item.slug);
          return <button key={item.slug} type="button" aria-pressed={selected === item.slug}
            onClick={() => setSelected(item.slug)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium ${selected === item.slug ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}>
            {record?.title ?? item.slug}
          </button>;
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose storytelling layout">
        {(["story", "evidence"] as const).map((value) => (
          <button key={value} type="button" aria-pressed={presentation === value}
            onClick={() => setPresentation(value)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium ${presentation === value ? "border-accent bg-surface-sage" : "border-border bg-card"}`}>
            {value === "story" ? "Story first" : "Evidence first"}
          </button>
        ))}
      </div>
      <div className="mt-5 grid min-w-0 gap-5 rounded-xl border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-6">
        {presentation === "story" ? (
          <>
            <div className="min-w-0 space-y-3">
              <p className="editorial-eyebrow text-accent">{directoryStatus(directory.status).label} · {directory.phase}</p>
              <h3 className="font-display text-2xl">{directory.title}</h3>
              <p className="text-sm leading-6"><strong>Problem:</strong> {project.problem.summary}</p>
              <p className="text-sm leading-6"><strong>My contribution:</strong> {directory.role}</p>
              <p className="text-sm leading-6 text-muted"><strong>Boundary:</strong> {entry.limitation}</p>
            </div>
            <div className="min-w-0"><ProjectEvidence kind={entry.evidence} /></div>
          </>
        ) : (
          <>
            <div className="min-w-0"><ProjectEvidence kind={entry.evidence} /></div>
            <div className="min-w-0 space-y-3">
              <p className="editorial-eyebrow text-accent">What the sample demonstrates</p>
              <h3 className="font-display text-2xl">{directory.title}</h3>
              <p className="text-sm leading-6">{entry.next}</p>
              <p className="text-sm leading-6"><strong>My contribution:</strong> {directory.role}</p>
              <p className="text-sm leading-6 text-muted"><strong>Not shown:</strong> {entry.limitation}</p>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Choose story first when…</h3>
          <p className="mt-2 text-sm leading-6">The visitor needs to understand the problem and your decisions before inspecting a sample.</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Choose evidence first when…</h3>
          <p className="mt-2 text-sm leading-6">A genuine sample is recognizable and the caption keeps its source, status, and limitations visible.</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Evaluation: compare reading order at 375px, 768px and 1280px, keyboard focus, captions, 200% zoom,
        and reduced motion. This teaching specimen does not update either public case study.
      </p>
      <a href={entry.link} className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent underline">
        Open the current case study: {directory.title}
      </a>
    </section>
  );
}
