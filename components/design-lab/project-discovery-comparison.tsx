"use client";

import { ProjectEvidence } from "@/components/project-evidence";
import { ProjectsSystems } from "@/components/projects-systems";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  directoryCategories,
  directoryProjects,
  directoryStatus,
  featuredProjects,
  systemLayers,
  type DirectoryCategory,
  type DirectoryProject,
} from "@/lib/project-directory";
import { getProject } from "@/lib/portfolio";
import { salesFor } from "@/lib/sales";
import { useEffect, useId, useState } from "react";

export const projectDiscoveryPatterns = [
  {
    id: "compact",
    title: "Compact editorial card",
    catalog: "summaries",
    when: "A directory or index needs many projects visible, with one next step.",
    avoid: "Do not hide the problem when the reader must choose from the card alone.",
    a11y: "One heading link, a 44px target, and text for category and stage. The optional problem line is text, not a second link.",
  },
  {
    id: "screenshot",
    title: "Screenshot-led card",
    catalog: "summaries",
    when: "An approved on-site sample helps someone recognize the project before reading.",
    avoid: "Do not draw a product screenshot that was never captured. Say when no figure exists.",
    a11y: "The figure has a caption. The sample table scrolls inside the card. The title remains a link.",
  },
  {
    id: "featured",
    title: "Large featured case study",
    catalog: "summaries",
    when: "One project should carry the page, with the problem, contribution, and value in view.",
    avoid: "Do not use this size for every record. A cover can feature one project, not the whole directory.",
    a11y: "The title is a heading link. Facts are sentences. The case-study link names the project.",
  },
  {
    id: "carousel",
    title: "Filtered carousel",
    catalog: "summaries",
    when: "A short featured set needs horizontal browsing, and the full directory stays one link away.",
    avoid: "Do not autoplay, loop forever, or hide projects that are not in the featured set.",
    a11y: "Filters are pressed buttons. Previous and Next are labeled, disabled at the ends, and honor reduced motion. A status reports the count.",
  },
  {
    id: "routes",
    title: "Inline, sheet, or case study",
    catalog: "context",
    when: "A reader needs a little more context before deciding whether to open the full write-up.",
    avoid: "Do not put the only copy of the problem inside a sheet. Keep a path to the case study.",
    a11y: "Inline uses aria-expanded. The sheet traps focus, closes with Escape, and returns focus. The case study is a real link.",
  },
  {
    id: "gallery",
    title: "Captioned gallery",
    catalog: "summaries",
    when: "Several approved figures need captions and a way to move between them.",
    avoid: "Do not use a gallery as the only explanation, or fill it with invented images.",
    a11y: "Each frame is a figure with a caption. Frame buttons expose pressed state. Previous and Next name the action.",
  },
  {
    id: "map",
    title: "Relationship map",
    catalog: "process-illustrations",
    when: "Someone needs to see how a few projects relate, then open one.",
    avoid: "Do not imply the projects exchange data. A list is clearer when the reader must compare details.",
    a11y: "The diagram buttons are pressed controls. The list alternative states the same relationships in text. Links go to case studies.",
  },
] as const;

export type ProjectDiscoveryPatternId =
  (typeof projectDiscoveryPatterns)[number]["id"];

type FeaturedFilter = "All featured" | Exclude<DirectoryCategory, "All work">;

const featuredFilters: FeaturedFilter[] = [
  "All featured",
  ...directoryCategories.filter(
    (category): category is Exclude<DirectoryCategory, "All work"> =>
      category !== "All work",
  ),
];

function specimen(slug: DirectoryProject["slug"]) {
  const directory = directoryProjects.find((item) => item.slug === slug);
  const project = getProject(slug);
  if (!directory || !project) {
    throw new Error(`Missing project specimen ${slug}`);
  }
  return {
    directory,
    problem: project.problem.summary,
    value: salesFor(slug).decision,
    statusLabel: directoryStatus(directory.status).label,
  };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function CompactEditorialCard() {
  const featured = featuredProjects();
  const [slug, setSlug] = useState(featured[0].slug);
  const [showProblem, setShowProblem] = useState(false);
  const current = specimen(slug);
  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Choose a compact project card" className="flex flex-wrap gap-2">
        {featured.map((item) => (
          <Button
            key={item.slug}
            type="button"
            variant={slug === item.slug ? "default" : "outline"}
            aria-pressed={slug === item.slug}
            onClick={() => setSlug(item.slug)}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <label className="flex min-h-11 items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showProblem}
          onChange={(event) => setShowProblem(event.target.checked)}
        />
        Show the problem line
      </label>
      <article className="editorial-panel min-w-0 bg-card p-4">
        <p className="editorial-eyebrow text-accent">{current.directory.categories[0]}</p>
        <h3 className="mt-2 font-display text-xl">
          <a className="underline" href={current.directory.caseStudyUrl}>
            {current.directory.title}
          </a>
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{current.directory.summary}</p>
        {showProblem ? (
          <p className="mt-2 text-sm leading-6">
            <span className="font-medium">Problem: </span>
            {current.problem}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-muted">
          {current.directory.phase} · {current.statusLabel}
        </p>
      </article>
    </div>
  );
}

export function ScreenshotLedCard() {
  const [mode, setMode] = useState<"sample" | "missing">("sample");
  const current = specimen(
    mode === "sample" ? "detector-coverage-atlas" : "gtm-campaign-lab",
  );
  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Choose a figure state" className="flex flex-wrap gap-2">
        <Button type="button" variant={mode === "sample" ? "default" : "outline"} aria-pressed={mode === "sample"} onClick={() => setMode("sample")}>
          Approved on-site sample
        </Button>
        <Button type="button" variant={mode === "missing" ? "default" : "outline"} aria-pressed={mode === "missing"} onClick={() => setMode("missing")}>
          No screenshot on file
        </Button>
      </div>
      <article className="editorial-panel min-w-0 bg-card p-4">
        <ProjectEvidence kind={current.directory.preview} compact />
        <h3 className="mt-4 font-display text-xl">
          <a className="underline" href={current.directory.caseStudyUrl}>
            {current.directory.title}
          </a>
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{current.directory.summary}</p>
      </article>
    </div>
  );
}

export function FeaturedCaseStudyCard() {
  const featured = featuredProjects();
  const [slug, setSlug] = useState(featured[0].slug);
  const current = specimen(slug);
  return (
    <div className="min-w-0 space-y-3">
      <label className="grid gap-2 text-sm font-medium">
        Choose a featured project
        <select
          className="min-h-11 rounded-lg border border-border bg-card px-3 font-normal"
          value={slug}
          onChange={(event) => setSlug(event.target.value as DirectoryProject["slug"])}
        >
          {featured.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <article className="editorial-panel min-w-0 bg-foreground p-5 text-background sm:p-6">
        <p className="editorial-eyebrow text-[#E7C7B4]">Side Quest · {current.directory.phase}</p>
        <h3 className="mt-3 font-display text-3xl leading-tight">
          <a className="underline" href={current.directory.caseStudyUrl}>
            {current.directory.title}
          </a>
        </h3>
        <p className="mt-4 text-sm leading-6 text-[#F3EFE6]">
          <span className="font-semibold">Problem: </span>
          {current.problem}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#F3EFE6]">
          <span className="font-semibold">Contribution: </span>
          {current.directory.role}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#F3EFE6]">
          <span className="font-semibold">Intended value: </span>
          {current.value}
        </p>
        <p className="mt-3 text-xs text-[#D4CEC4]">
          {current.statusLabel}. {current.directory.technologies}
        </p>
        <a
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline"
          href={current.directory.caseStudyUrl}
        >
          Open the case study: {current.directory.title}
        </a>
      </article>
    </div>
  );
}

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" onClick={scrollPrev} disabled={!canScrollPrev}>
        Previous featured project
      </Button>
      <Button type="button" variant="outline" onClick={scrollNext} disabled={!canScrollNext}>
        Next featured project
      </Button>
    </div>
  );
}

export function FilteredProjectCarousel() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<FeaturedFilter>("All featured");
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const visible = featuredProjects().filter(
    (item) => filter === "All featured" || item.categories.includes(filter),
  );
  const chosen = visible.find((item) => item.slug === selected);

  useEffect(() => {
    if (!api) return;
    const sync = () => setPosition(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  function changeFilter(next: FeaturedFilter) {
    setFilter(next);
    setSelected(null);
    setPosition(0);
  }

  return (
    <div className="min-w-0 space-y-3">
      <p className="text-xs leading-5 text-muted">
        Public featured projects only. This filter does not change the directory.
      </p>
      <div role="group" aria-label="Filter featured projects" className="flex flex-wrap gap-2">
        {featuredFilters.map((item) => (
          <Button
            key={item}
            type="button"
            variant={filter === item ? "default" : "outline"}
            aria-pressed={filter === item}
            onClick={() => changeFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <p role="status" className="text-xs text-muted">
        {visible.length} featured {visible.length === 1 ? "project" : "projects"}
        {visible.length > 0
          ? ` · Slide ${Math.min(position + 1, visible.length)} of ${visible.length}`
          : " · No matches"}
      </p>
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-4">
          <p className="font-medium">No featured projects match.</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Reset this preview, or open the directory for the projects in that focus.
          </p>
          <Button className="mt-3" type="button" variant="outline" onClick={() => changeFilter("All featured")}>
            Reset filters
          </Button>
        </div>
      ) : (
        <Carousel
          key={filter}
          setApi={setApi}
          opts={{ align: "start", loop: false, duration: reduced ? 0 : 20 }}
          aria-label="Featured project carousel"
          className="min-w-0"
        >
          <CarouselContent>
            {visible.map((item) => {
              const detail = specimen(item.slug);
              return (
                <CarouselItem key={item.slug} className="basis-[88%] sm:basis-1/2">
                  <article className="editorial-panel flex h-full min-w-0 flex-col bg-card p-4">
                    <p className="editorial-eyebrow text-accent">{item.categories[0]}</p>
                    <h3 className="mt-2 font-display text-lg">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">{detail.problem}</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3 w-fit"
                      aria-expanded={selected === item.slug}
                      aria-controls="discovery-carousel-preview"
                      onClick={() => setSelected(selected === item.slug ? null : item.slug)}
                    >
                      {selected === item.slug ? "Close preview" : "Preview project"}
                    </Button>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselControls />
        </Carousel>
      )}
      <div id="discovery-carousel-preview" className="rounded-xl border border-border bg-background p-4" aria-live="polite">
        {chosen ? (
          <div className="space-y-2 text-sm leading-6">
            <h3 className="font-semibold">{chosen.title}</h3>
            <p>
              <span className="font-medium">Contribution: </span>
              {chosen.role}
            </p>
            <p>
              <span className="font-medium">Stage: </span>
              {chosen.phase} · {directoryStatus(chosen.status).label}
            </p>
            <a className="inline-flex min-h-11 items-center text-accent underline" href={chosen.caseStudyUrl}>
              Open the case study
            </a>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Choose Preview project to read the contribution and stage without leaving this lesson.
          </p>
        )}
      </div>
      <p>
        <a className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline" href="/projects#directory">
          Browse the full project directory
        </a>
      </p>
    </div>
  );
}

export function ProjectDetailRoutes() {
  const detailId = useId();
  const current = specimen("detector-coverage-atlas");
  const [route, setRoute] = useState<"inline" | "sheet" | "case">("inline");
  const [open, setOpen] = useState(false);
  const facts = (
    <div className="space-y-2 text-sm leading-6">
      <p>
        <span className="font-medium">Problem: </span>
        {current.problem}
      </p>
      <p>
        <span className="font-medium">Contribution: </span>
        {current.directory.role}
      </p>
      <p>
        <span className="font-medium">Intended value: </span>
        {current.value}
      </p>
      <a className="inline-flex min-h-11 items-center text-accent underline" href={current.directory.caseStudyUrl}>
        Open the case study
      </a>
    </div>
  );

  function choose(next: "inline" | "sheet" | "case") {
    setOpen(false);
    setRoute(next);
  }

  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Choose how the project opens" className="flex flex-wrap gap-2">
        {(
          [
            ["inline", "Inline preview"],
            ["sheet", "Side sheet"],
            ["case", "Case study"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            variant={route === id ? "default" : "outline"}
            aria-pressed={route === id}
            onClick={() => choose(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      <article className="editorial-panel min-w-0 bg-card p-4">
        <p className="editorial-eyebrow text-accent">Public Side Quest</p>
        <h3 className="mt-2 font-display text-xl">{current.directory.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{current.directory.summary}</p>
        {route === "inline" ? (
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            aria-expanded={open}
            aria-controls={detailId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Hide preview" : "Show inline preview"}
          </Button>
        ) : null}
        {route === "sheet" ? (
          <Button type="button" variant="outline" className="mt-3" onClick={() => setOpen(true)}>
            Open the preview sheet
          </Button>
        ) : null}
        {route === "case" ? (
          <p className="mt-3 text-sm leading-6">
            The next step leaves this preview and opens the write-up.
          </p>
        ) : null}
        {route === "inline" && open ? (
          <div id={detailId} className="mt-4 rounded-xl border border-border bg-background p-4">
            {facts}
          </div>
        ) : null}
        {route === "case" ? <div className="mt-3">{facts}</div> : null}
      </article>
      <Sheet open={route === "sheet" && open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-y-auto">
          <div className="p-5 pt-14">
            <SheetTitle>{current.directory.title}</SheetTitle>
            <SheetDescription className="mt-2">
              A preview of the public project. Closing returns you to this lesson.
            </SheetDescription>
            <div className="mt-4">{facts}</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const galleryFrames = [
  { slug: "detector-coverage-atlas" as const, label: "Coverage sample" },
  { slug: "account-intelligence" as const, label: "Account scenario" },
  { slug: "gtm-campaign-lab" as const, label: "No screenshot" },
];

export function CaptionedGallery() {
  const [index, setIndex] = useState(0);
  const frame = galleryFrames[index];
  const current = specimen(frame.slug);
  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Gallery frames" className="flex flex-wrap gap-2">
        {galleryFrames.map((item, itemIndex) => (
          <Button
            key={item.slug}
            type="button"
            variant={index === itemIndex ? "default" : "outline"}
            aria-pressed={index === itemIndex}
            onClick={() => setIndex(itemIndex)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="editorial-panel min-w-0 bg-card p-4">
        <ProjectEvidence kind={current.directory.preview} />
        <p className="mt-3 text-sm leading-6">
          <span className="font-semibold">{current.directory.title}. </span>
          <span className="text-muted">{current.problem}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>
          Previous frame
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIndex((value) => Math.min(galleryFrames.length - 1, value + 1))}
          disabled={index === galleryFrames.length - 1}
        >
          Next frame
        </Button>
      </div>
      <p role="status" className="text-xs text-muted">
        Frame {index + 1} of {galleryFrames.length}
      </p>
    </div>
  );
}

export function ProjectRelationshipMap() {
  const [mode, setMode] = useState<"diagram" | "list">("diagram");
  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Relationship presentation" className="flex flex-wrap gap-2">
        <Button type="button" variant={mode === "diagram" ? "default" : "outline"} aria-pressed={mode === "diagram"} onClick={() => setMode("diagram")}>
          Diagram
        </Button>
        <Button type="button" variant={mode === "list" ? "default" : "outline"} aria-pressed={mode === "list"} onClick={() => setMode("list")}>
          Text list
        </Button>
      </div>
      <p className="text-xs leading-5 text-muted">
        The same public projects as the directory map. Lines describe a relationship. They are not a data integration.
      </p>
      {mode === "diagram" ? (
        <ProjectsSystems />
      ) : (
        <ol className="space-y-4">
          {systemLayers.map((layer) => (
            <li key={layer.title} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{layer.title}</h3>
              <ul className="mt-2 space-y-2">
                {layer.slugs.map((slug) => {
                  const item = directoryProjects.find((entry) => entry.slug === slug);
                  if (!item) return null;
                  return (
                    <li key={slug} className="text-sm leading-6">
                      <a className="font-medium text-accent underline" href={item.caseStudyUrl}>
                        {item.title}
                      </a>
                      <span className="text-muted"> — {item.summary}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const demos: Record<ProjectDiscoveryPatternId, () => React.ReactElement> = {
  compact: CompactEditorialCard,
  screenshot: ScreenshotLedCard,
  featured: FeaturedCaseStudyCard,
  carousel: FilteredProjectCarousel,
  routes: ProjectDetailRoutes,
  gallery: CaptionedGallery,
  map: ProjectRelationshipMap,
};

export function ProjectDiscoveryComparison() {
  const headingId = useId();
  const widthId = useId();
  const [pattern, setPattern] = useState<ProjectDiscoveryPatternId>("compact");
  const [width, setWidth] = useState("full");
  const current = projectDiscoveryPatterns.find((item) => item.id === pattern)!;
  const Example = demos[pattern];

  return (
    <section aria-labelledby={headingId} className="min-w-0 space-y-4 overflow-x-clip" id="project-discovery">
      <div>
        <p className="editorial-eyebrow text-accent">Pattern comparison · summaries and context</p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">
          How should a project be discovered?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Seven layouts, one set of public project records. Professional Work stays separate.
          Nothing here invents a screenshot, a metric, or a production status. Catalog families
          stay summaries, context, and process illustrations.
        </p>
      </div>
      <div role="group" aria-label="Project discovery patterns" className="flex flex-wrap gap-2">
        {projectDiscoveryPatterns.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={pattern === item.id ? "default" : "outline"}
            aria-pressed={pattern === item.id}
            onClick={() => setPattern(item.id)}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-xs text-muted">Catalog family: {current.catalog}</p>
        <label className="grid gap-1 text-sm" htmlFor={widthId}>
          Preview width
          <select
            id={widthId}
            className="min-h-11 rounded-lg border border-border bg-card px-2"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          >
            <option value="full">Available width</option>
            <option value="375">Phone · 375px</option>
            <option value="768">Tablet · 768px</option>
          </select>
        </label>
      </div>
      <div
        className="min-w-0 rounded-xl border border-border bg-background p-4"
        style={{ width: width === "full" ? "100%" : `min(100%, ${width}px)` }}
      >
        <Example />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold">When to use it</h3>
          <p className="mt-1 text-sm leading-6">{current.when}</p>
        </div>
        <div>
          <h3 className="font-semibold">Tradeoff</h3>
          <p className="mt-1 text-sm leading-6">{current.avoid}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Accessibility and responsive behavior</h3>
        <p className="mt-1 text-sm leading-6">{current.a11y}</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          The width control caps this example. It does not replace a 375, 768, or 1280 viewport,
          or a 200% zoom check. Reduced motion removes carousel animation. Focus stays on the copper ring.
        </p>
      </div>
    </section>
  );
}
