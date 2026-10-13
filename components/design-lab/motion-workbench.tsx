"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import styles from "./motion-workbench.module.css";

const motions = [
  {
    id: "rise",
    name: "Gentle rise",
    use: "Introduce a short section or a newly selected summary.",
    fit: "About summaries · Field Notes",
    rule: "Keep content visible throughout. Use once, rather than on every scroll.",
    source: "styles.rise",
  },
  {
    id: "slide",
    name: "Panel slide",
    use: "Show that a filter or category changed the content.",
    fit: "Toolkit categories · Research filters",
    rule: "A 12px shift is enough; retain the reader’s place and focus.",
    source: "styles.slide",
  },
  {
    id: "settle",
    name: "Soft settle",
    use: "Bring a small preview into focus without a dramatic zoom.",
    fit: "Preview cards · Evidence summaries",
    rule: "Scale from 98% to 100%. Avoid applying this to whole pages.",
    source: "styles.settle",
  },
  {
    id: "stagger",
    name: "Grouped reveal",
    use: "Introduce a related group of three cards in reading order.",
    fit: "People / Strategy / Systems · Project groups",
    rule: "Short delays only. Essential information remains visible at all times.",
    source: "styles.stagger",
  },
] as const;

const patterns = [
  {
    id: "empty",
    name: "Empty & recovery",
    category: "Feedback",
    use: "Explain why a view has no results and offer a useful next step.",
    fit: "Search results · New workspaces",
    source: "components/design-lab/motion-workbench.tsx",
    rule: "Native demo; connect the recovery action to a real workflow when adopting.",
  },
  {
    id: "loading",
    name: "Loading placeholder",
    category: "Feedback",
    use: "Reserve space while data arrives without shifting the page.",
    fit: "Research lists · Evidence panels",
    source: "components/design-lab/motion-workbench.tsx",
    rule: "Static illustrative loading state; no request runs. Keep a readable status and a real error path.",
  },
  {
    id: "progress",
    name: "Step progress",
    category: "Feedback",
    use: "Show completed work and the next step in a bounded process.",
    fit: "Lesson modules · Import review",
    source: "components/design-lab/motion-workbench.tsx",
    rule: "Use determinate progress only when the total is known. This is a three-step fictional process.",
  },
  {
    id: "table",
    name: "Record comparison",
    category: "Organize",
    use: "Compare the same fields across a small collection.",
    fit: "Account signals · Detector coverage",
    source: "components/design-lab/motion-workbench.tsx",
    rule: "Native table demo, not a server-connected data grid. Use a caption, column headers, and a compact mobile alternative.",
  },
  {
    id: "avatar",
    name: "Avatar & owners",
    category: "Browse",
    use: "Make authors and owners recognizable, with a fallback when an image fails.",
    fit: "Portfolio author · Stakeholders · Workspace owners",
    source: "components/ui/avatar.tsx",
    rule: "Keep readable names beside the image. Use the shared portrait for Kristen; sample owners use fictional initials.",
  },
  {
    id: "card",
    name: "Interactive card",
    category: "Browse",
    use: "A compact entry point into a case study.",
    fit: "Work · Side Quests",
    source: "Button + styles.lift",
    rule: "One primary action. Hover and keyboard focus receive the same treatment.",
  },
  {
    id: "tabs",
    name: "Category tabs",
    category: "Organize",
    use: "Switch between related sections in the same space.",
    fit: "Toolkit · Research views",
    source: "components/ui/tabs.tsx",
    rule: "Use arrow keys within the tab list; each tab has its own panel.",
  },
  {
    id: "accordion",
    name: "Progressive disclosure",
    category: "Organize",
    use: "Keep the summary short and reveal detail on demand.",
    fit: "Playbook steps · Architecture notes",
    source: "components/ui/accordion.tsx",
    rule: "Keep section names descriptive so hidden details remain discoverable.",
  },
  {
    id: "dialog",
    name: "Focused dialog",
    category: "Focus",
    use: "Review one bounded task without leaving the current view.",
    fit: "Request forms · Preview details",
    source: "components/ui/dialog.tsx",
    rule: "Escape closes; focus returns to the trigger. Avoid long case studies here.",
  },
  {
    id: "sheet",
    name: "Context drawer",
    category: "Focus",
    use: "Inspect evidence alongside the larger workflow.",
    fit: "Stakeholder map · Account research",
    source: "components/ui/sheet.tsx",
    rule: "Use a titled panel with a clear close control; keep the underlying task intact.",
  },
  {
    id: "carousel",
    name: "Horizontal collection",
    category: "Browse",
    use: "Browse a short set of related items with less vertical scrolling.",
    fit: "Work highlights · Project previews",
    source: "components/ui/carousel.tsx",
    rule: "Visible previous/next controls; no autoplay. Don’t hide the only route to essential content.",
  },
] as const;
type PatternId = (typeof patterns)[number]["id"];

function PatternPreview({
  pattern,
  still,
}: {
  pattern: PatternId;
  still: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState(0);
  if (pattern === "empty")
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h4 className="font-semibold">
          {expanded ? "Sample item added" : "Nothing to review yet"}
        </h4>
        <p className="mt-2 text-sm text-muted">
          {expanded
            ? "The recovery action leads to a useful populated state. This is fictional content."
            : "Start with a sample to see how this view works."}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Clear sample" : "Add sample item"}
        </Button>
      </div>
    );
  if (pattern === "loading")
    return (
      <div className="w-full rounded-xl border border-border bg-card p-5">
        <p role="status" className="text-sm font-medium">
          Loading preview · illustrative only
        </p>
        <div aria-hidden="true" className="mt-4 space-y-3">
          {["w-3/4", "w-full", "w-1/2"].map((width) => (
            <div key={width} className={`h-4 rounded bg-border ${width}`} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Stable space for content. No continuous shimmer or active data
          request.
        </p>
      </div>
    );
  if (pattern === "progress")
    return (
      <div className="w-full rounded-xl border border-border bg-card p-5">
        <label className="block text-sm font-semibold">
          Sample review progress
          <progress
            className="mt-3 block h-3 w-full accent-accent"
            value={step}
            max={3}
          >
            {step} of 3
          </progress>
        </label>
        <p role="status" className="mt-3 text-sm text-muted">
          {step} of 3 steps complete
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStep((value) => (value === 3 ? 0 : value + 1))}
        >
          {step === 3 ? "Restart sample" : "Complete next step"}
        </Button>
      </div>
    );
  if (pattern === "table")
    return (
      <div
        className="w-full overflow-x-auto rounded-xl border border-border bg-card"
        role="region"
        aria-label="Fictional record comparison"
        tabIndex={0}
      >
        <table className="w-full text-left text-sm">
          <caption className="p-3 text-left text-xs text-muted">
            Fictional records · no customer data
          </caption>
          <thead>
            <tr>
              {["Record", "Status", "Owner"].map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="border-b border-border p-2"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["A", "B", "C"].map((label) => (
              <tr key={label}>
                <th scope="row" className="p-2 font-medium">
                  Sample {label}
                </th>
                <td className="p-2">Review</td>
                <td className="p-2">Demo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (pattern === "avatar")
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src="/brand/avatar/illustrated-portrait.png" alt="" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Kristen Aing</p>
            <p className="text-sm text-muted">Author / owner treatment</p>
          </div>
        </div>
        <div>
          <AvatarGroup>
            {["AL", "BR", "CM"].map((initials) => (
              <Avatar key={initials} aria-label={`Fictional owner ${initials}`}>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <p className="mt-2 text-xs text-muted">
            Fictional owners · initials-only fallback
          </p>
        </div>
      </div>
    );
  if (pattern === "card")
    return (
      <div>
        <Button
          variant="outline"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className={`h-auto w-full justify-between p-5 text-left whitespace-normal ${styles.lift}`}
        >
          <span>
            <span className="block font-semibold">Explore the case study</span>
            <span className="mt-1 block text-sm font-normal text-muted">
              Illustrative card · preview only
            </span>
          </span>
          <ArrowUpRight aria-hidden="true" />
        </Button>
        {expanded && (
          <p className="mt-3 rounded-xl border border-border bg-card p-4 text-sm">
            Sample detail: problem → contribution → evidence → lesson.
          </p>
        )}
      </div>
    );
  if (pattern === "tabs")
    return (
      <Tabs defaultValue="people">
        <TabsList className="h-auto w-full flex-wrap">
          {["people", "strategy", "systems"].map((name) => (
            <TabsTrigger key={name} value={name} className="capitalize">
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {["people", "strategy", "systems"].map((name) => (
          <TabsContent
            key={name}
            value={name}
            className="rounded-xl border border-border p-5"
          >
            <p className="font-semibold capitalize">{name}</p>
            <p className="mt-2 text-sm text-muted">
              One selected summary, with detail kept close to its category.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    );
  if (pattern === "accordion")
    return (
      <Accordion type="single" collapsible>
        {[
          "Start with the problem",
          "Inspect the evidence",
          "Choose the next step",
        ].map((title, i) => (
          <AccordionItem key={title} value={String(i)}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              Illustrative guidance: a short summary expands into the detail the
              reader needs.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  if (pattern === "dialog")
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open focused preview</Button>
        </DialogTrigger>
        <DialogContent className={still ? styles.still : styles.stage}>
          <DialogHeader>
            <DialogTitle>Focused preview</DialogTitle>
            <DialogDescription>
              Illustrative content. A short task lives here; longer reading
              belongs on a page.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted">
            Try Escape, then check that focus returns to the button.
          </p>
        </DialogContent>
      </Dialog>
    );
  if (pattern === "sheet")
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Inspect sample evidence</Button>
        </SheetTrigger>
        <SheetContent className={still ? styles.still : styles.stage}>
          <SheetHeader>
            <SheetTitle>Evidence preview</SheetTitle>
            <SheetDescription>
              Fictional fixture for a contextual panel.
            </SheetDescription>
          </SheetHeader>
          <p className="p-4 text-sm text-muted">
            Keep source, observation, uncertainty, and next step together. No
            account or customer data is loaded.
          </p>
        </SheetContent>
      </Sheet>
    );
  return (
    <Carousel
      opts={{ loop: false, duration: still ? 0 : 25 }}
      className="mx-auto w-full max-w-sm px-12"
    >
      <CarouselContent>
        {["People", "Strategy", "Systems"].map((name) => (
          <CarouselItem key={name}>
            <div className="flex min-h-36 items-center justify-center rounded-xl border border-border bg-card p-4 font-semibold">
              {name}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}
function serverReducedMotion() {
  return true;
}

export function MotionWorkbench({
  initialView = "transitions",
}: {
  initialView?: "transitions" | "components";
}) {
  const id = useId();
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getReducedMotion,
    serverReducedMotion,
  );
  const [view, setView] = useState(initialView);
  const [motion, setMotion] = useState<(typeof motions)[number]["id"]>("rise");
  const [pattern, setPattern] = useState<PatternId>("avatar");
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState(240);
  const [previewWidth, setPreviewWidth] = useState("full");
  const [still, setStill] = useState(false);
  const [replay, setReplay] = useState(0);
  const selectedMotion = motions.find((entry) => entry.id === motion)!;
  const selectedPattern = patterns.find((entry) => entry.id === pattern)!;
  const selected = view === "transitions" ? selectedMotion : selectedPattern;
  const choices = patterns.filter(
    (entry) => category === "All" || entry.category === category,
  );

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border border-border bg-card p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="editorial-eyebrow text-accent">
            Design lab · interactive workbench
          </p>
          <h2
            id={`${id}-title`}
            className="mt-2 font-display text-2xl tracking-tight"
          >
            Motion & components
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Try a pattern, understand its purpose, then reuse it. These are
            illustrative previews, not changes to public pages.
          </p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs">
          4 transitions · 11 components
        </span>
      </div>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Workbench view"
      >
        {(["transitions", "components"] as const).map((name) => (
          <Button
            key={name}
            aria-pressed={view === name}
            aria-controls={`${id}-workspace`}
            variant={view === name ? "default" : "outline"}
            onClick={() => setView(name)}
            className="capitalize"
          >
            {name}
          </Button>
        ))}
      </div>
      <div
        id={`${id}-workspace`}
        className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]"
      >
        <div>
          {view === "components" && (
            <div
              className="mb-3 flex flex-wrap gap-1"
              role="group"
              aria-label="Component purpose"
            >
              {["All", "Browse", "Organize", "Focus", "Feedback"].map(
                (name) => (
                  <Button
                    key={name}
                    size="xs"
                    variant={category === name ? "default" : "ghost"}
                    aria-pressed={category === name}
                    onClick={() => {
                      setCategory(name);
                      const first = patterns.find(
                        (entry) => name === "All" || entry.category === name,
                      );
                      if (first) setPattern(first.id);
                    }}
                  >
                    {name}
                  </Button>
                ),
              )}
            </div>
          )}
          <label className="grid gap-2 text-sm font-medium sm:hidden">
            {view === "transitions" ? "Transition preset" : "Component pattern"}
            <select
              value={selected.id}
              onChange={(event) => {
                if (view === "transitions")
                  setMotion(event.target.value as typeof motion);
                else setPattern(event.target.value as PatternId);
              }}
              className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3"
            >
              {(view === "transitions" ? motions : choices).map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
          </label>
          <div
            className="hidden grid-cols-2 gap-2 sm:grid lg:grid-cols-1"
            role="group"
            aria-label={
              view === "transitions"
                ? "Transition presets"
                : "Component patterns"
            }
          >
            {(view === "transitions" ? motions : choices).map((entry) => (
              <Button
                key={entry.id}
                variant={selected.id === entry.id ? "default" : "outline"}
                aria-pressed={selected.id === entry.id}
                aria-controls={`${id}-preview`}
                className="h-auto min-h-12 justify-start text-left whitespace-normal"
                onClick={() => {
                  if (view === "transitions")
                    setMotion(entry.id as typeof motion);
                  else setPattern(entry.id as PatternId);
                }}
              >
                {entry.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-xl border border-border bg-background p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold">{selected.name}</h3>
            {view === "transitions" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplay((value) => value + 1)}
              >
                <RotateCcw aria-hidden="true" />
                Replay transition
              </Button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <label className="flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                checked={still}
                onChange={(event) => setStill(event.target.checked)}
              />
              Disable motion
            </label>
            {view === "transitions" && (
              <label className="flex items-center gap-2">
                Duration
                <select
                  className="min-h-11 rounded-lg border border-border bg-card px-2"
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                >
                  <option value={160}>Quick · 160ms</option>
                  <option value={240}>Balanced · 240ms</option>
                  <option value={400}>Deliberate · 400ms</option>
                </select>
              </label>
            )}
          </div>
          <label className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            Preview width
            <select
              className="min-h-11 max-w-full rounded-lg border border-border bg-card px-2"
              value={previewWidth}
              onChange={(event) => setPreviewWidth(event.target.value)}
            >
              <option value="full">Fit available space</option>
              <option value="360">Phone · up to 360px</option>
              <option value="680">Tablet · up to 680px</option>
            </select>
          </label>
          <p className="mt-2 text-xs leading-5 text-muted">
            Width is capped by available space. This previews content density;
            use browser/device testing for responsive breakpoints.
          </p>
          <div
            id={`${id}-preview`}
            className={`mt-4 flex min-h-64 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-sage p-4 ${styles.stage} ${still ? styles.still : ""}`}
            style={
              {
                "--lab-duration": `${duration}ms`,
                width:
                  previewWidth === "full"
                    ? "100%"
                    : `min(100%, ${previewWidth}px)`,
                marginInline: "auto",
              } as CSSProperties
            }
          >
            {view === "transitions" ? (
              <div
                key={`${motion}-${replay}-${duration}-${still}`}
                className={`grid w-full gap-3 ${styles[motion]}`}
              >
                {(motion === "stagger"
                  ? ["People", "Strategy", "Systems"]
                  : ["A clearer next step"]
                ).map((name) => (
                  <div
                    key={name}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 text-sm text-muted">
                      A concise summary stays visible while the transition
                      plays.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div key={`${pattern}-${still}`} className="w-full">
                <PatternPreview
                  pattern={pattern}
                  still={still || reducedMotion}
                />
              </div>
            )}
          </div>
          <p className="mt-4 text-sm leading-6">{selected.use}</p>
          <p className="mt-2 text-xs font-semibold text-accent">
            Useful for: {selected.fit}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">{selected.rule}</p>
          <details className="mt-4 border-t border-border pt-3">
            <summary className="cursor-pointer text-sm font-medium">
              Reuse notes
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">
              Source:{" "}
              <code className="text-xs break-all">{selected.source}</code>. Copy
              the component and its CSS module within the existing token system.
              Check keyboard access, mobile layout, and reduced motion before
              adopting it on a public page.
            </p>
          </details>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">
        Your device’s reduced-motion preference always takes priority. No
        autoplay, hidden content, or additional animation library.
      </p>
    </section>
  );
}
