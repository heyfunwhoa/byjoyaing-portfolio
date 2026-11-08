"use client";
import { CollectionBreadcrumb } from "@/components/collection-breadcrumb";
import { useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  getLessonGuidance,
  availabilityLabels,
} from "@/lib/academy/lesson-guidance";
import { OrbitStudyIllustration } from "@/components/orbit-study-illustration";
import { DeliveryLifecycleLab } from "@/components/ai-academy/delivery-lifecycle-lab";
import { PortfolioOsCaseStudy } from "@/components/ai-academy/portfolio-os-case-study";
import { ProductRequestLab } from "@/components/ai-academy/product-request-lab";
import { SecurityReviewLab } from "@/components/ai-academy/security-review-lab";
import { CmsLab } from "@/components/ai-academy/cms-lab";
import { FrontendLesson } from "@/components/ai-academy/frontend-lesson";
import { learningPaths } from "@/lib/academy/learning-paths";
import { LearningPathPicker } from "@/components/ai-academy/learning-path-picker";
import { LessonLibrary } from "@/components/ai-academy/lesson-library";
import { LessonOutline } from "@/components/ai-academy/lesson-outline";
import { lessons, workflows, type Track } from "@/lib/ai-academy";
const academyTabs = [
  ["learn", "01 / Learn"],
  ["apply", "02 / Apply AI"],
  ["skills", "03 / Build skills"],
] as const;
type AcademyTab = (typeof academyTabs)[number][0];
const button =
  "rounded-lg border border-border px-3 py-2 text-sm transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export function Academy({ resources }: { resources?: ReactNode }) {
  const [tab, setTab] = useState<AcademyTab>("learn");
  const [pathId, setPathId] = useState<string | null>(null);
  const [track, setTrack] = useState<Track | "All">("All");
  const [active, setActive] = useState("idea-to-verified-release");
  const [answer, setAnswer] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(workflows[0].title);
  const lesson =
    lessons.find(
      (l) => l.slug === active && (track === "All" || l.track === track),
    ) ??
    lessons.find((l) => track === "All" || l.track === track) ??
    lessons[0];
  const filtered = useMemo(
    () => lessons.filter((l) => track === "All" || l.track === track),
    [track],
  );
  const matches = useMemo(
    () =>
      workflows.filter(
        (w) =>
          (category === "All" || w.category === category) &&
          `${w.title} ${w.summary} ${w.asset}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const workflow = matches.find((w) => w.title === selected) ?? matches[0];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedPath = learningPaths.find((path) => path.id === pathId);
  const guidance = getLessonGuidance(lesson.slug);
  const sequence = selectedPath
    ? selectedPath.slugs
        .map((slug) => lessons.find((item) => item.slug === slug)!)
        .filter(Boolean)
    : filtered;
  const position = sequence.findIndex((item) => item.slug === lesson.slug);
  function selectLesson(slug: string, keepPath = false) {
    setActive(slug);
    setAnswer(null);
    setTab("learn");
    if (!keepPath) setPathId(null);
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function startPath(id: string) {
    const path = learningPaths.find((item) => item.id === id);
    if (!path) return;
    setPathId(path.id);
    setTrack("All");
    selectLesson(path.slugs[0], true);
  }
  function markReviewed() {
    setReviewed((s) =>
      s.includes(lesson.slug)
        ? s.filter((slug) => slug !== lesson.slug)
        : [...s, lesson.slug],
    );
  }
  function moveTabFocus(current: AcademyTab, key: string) {
    const currentIndex = academyTabs.findIndex(([id]) => id === current);
    const nextIndex =
      key === "Home"
        ? 0
        : key === "End"
          ? academyTabs.length - 1
          : (currentIndex +
              (key === "ArrowRight" ? 1 : -1) +
              academyTabs.length) %
            academyTabs.length;
    const nextTab = academyTabs[nextIndex][0];
    setTab(nextTab);
    tabRefs.current[nextIndex]?.focus();
  }
  const [copyStatus, setCopyStatus] = useState("");
  async function copy(s: string) {
    try {
      await navigator.clipboard.writeText(s);
      setCopyStatus("Copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the prompt text to copy it.");
    }
  }
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl px-5 pt-12 pb-24 sm:px-8"
    >
      <div className="mb-7 grid min-w-0 items-end gap-6 md:grid-cols-[minmax(0,1fr)_9rem]">
        <div className="max-w-3xl min-w-0">
          <CollectionBreadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/side-quests", label: "Side Quests" },
              { label: "Builder Academy" },
            ]}
          />
          <p className="editorial-eyebrow mb-3 text-accent">Builder Academy</p>
          <h1 className="editorial-section-title">
            Learn the basics. Apply with purpose.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            This is the deeper learning experience. Side Quests is the way in.
            Choose a path, read a lesson, then put it into practice.
          </p>
          <a
            href="#academy-sections"
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Browse lessons
          </a>
        </div>
        <div className="hidden w-full max-w-[9rem] md:block">
          <OrbitStudyIllustration variant="academy" />
          <p className="editorial-eyebrow mt-3 text-center text-muted">
            Builder
          </p>
        </div>
      </div>
      <LearningPathPicker onStart={startPath} />
      <div
        id="academy-sections"
        role="tablist"
        aria-label="Academy sections"
        className="mb-7 flex scroll-mt-28 flex-wrap gap-2 border-b border-border pb-4"
      >
        {academyTabs.map(([id, name], index) => (
          <button
            key={id}
            type="button"
            id={`academy-tab-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls="academy-panel"
            tabIndex={tab === id ? 0 : -1}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            className={`${button} ${tab === id ? "bg-foreground text-background" : ""}`}
            onClick={() => setTab(id)}
            onKeyDown={(event) => {
              if (
                ["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                moveTabFocus(id, event.key);
              }
            }}
          >
            {name}
          </button>
        ))}
      </div>
      {tab === "learn" && (
        <div className="grid gap-7 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside
            aria-label="Lessons"
            className="min-w-0 self-start lg:sticky lg:top-24"
          >
            {selectedPath ? (
              <nav
                aria-label="Selected learning path"
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-sm font-semibold">{selectedPath.title}</p>
                <p className="mt-2 text-xs text-muted">
                  Lesson {position + 1} of {sequence.length}
                </p>
                <ol className="mt-3 max-h-[min(55vh,28rem)] space-y-2 overflow-y-auto overscroll-contain p-1">
                  {selectedPath.slugs.map((slug, index) => {
                    const item = lessons.find((l) => l.slug === slug)!;
                    return (
                      <li key={slug}>
                        <button
                          type="button"
                          aria-current={active === slug ? "step" : undefined}
                          aria-label={item.title}
                          className={`min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active === slug ? "border-accent bg-background font-semibold" : "border-border"}`}
                          onClick={() => {
                            setTrack("All");
                            selectLesson(slug, true);
                          }}
                        >
                          {index + 1}. {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-3 text-xs leading-5 text-muted">
                  Suggested order. Skip ahead when useful.
                </p>
                <button
                  type="button"
                  className="mt-2 min-h-11 text-sm text-accent underline"
                  onClick={() => {
                    setPathId(null);
                    requestAnimationFrame(() => headingRef.current?.focus());
                  }}
                >
                  Leave this path
                </button>
              </nav>
            ) : (
              <LessonLibrary
                lessons={filtered}
                active={lesson.slug}
                track={track}
                reviewed={reviewed}
                onTrackChange={(nextTrack) => {
                  setTrack(nextTrack);
                  setPathId(null);
                  const first = lessons.find(
                    (item) => nextTrack === "All" || item.track === nextTrack,
                  );
                  if (first) selectLesson(first.slug);
                }}
                onSelect={selectLesson}
              />
            )}
          </aside>
          <article
            id="academy-panel"
            role="tabpanel"
            aria-labelledby="academy-tab-learn academy-lesson-heading"
            tabIndex={0}
            className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-9"
          >
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">
              {lesson.level} · {lesson.track} · {lesson.minutes} minutes
            </p>
            <p className="mt-2 text-xs text-muted">
              {guidance
                ? availabilityLabels[guidance.availability]
                : "Available"}{" "}
              · Short lesson
            </p>
            <h2
              id="academy-lesson-heading"
              ref={headingRef}
              tabIndex={-1}
              className="mt-2 scroll-mt-28 font-display text-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-4xl"
            >
              {lesson.title}
            </h2>
            <p className="mt-4 leading-7 text-muted">{lesson.summary}</p>
            <LessonOutline />
            <section
              aria-label="Lesson prerequisites"
              className="mt-5 rounded-lg border border-border p-4"
            >
              <h3 className="text-sm font-semibold">Before you start</h3>
              <p className="mt-2 text-sm text-muted">
                {guidance?.prerequisites.length
                  ? "Suggested preparation. You can still read this lesson now."
                  : "No earlier Academy lesson required."}
              </p>
              {guidance?.prerequisites.length ? (
                <ul className="mt-2">
                  {guidance.prerequisites.map((slug) => {
                    const prerequisite = lessons.find(
                      (item) => item.slug === slug,
                    );
                    return prerequisite ? (
                      <li key={slug}>
                        <button
                          type="button"
                          className="min-h-11 text-left text-sm text-accent underline underline-offset-4"
                          onClick={() => {
                            setTrack("All");
                            selectLesson(slug);
                          }}
                        >
                          {prerequisite.title}
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
              {guidance?.preparation ? (
                <a
                  href={guidance.preparation.href}
                  className="mt-1 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                >
                  {guidance.preparation.label}
                </a>
              ) : null}
            </section>
            <div className="my-7 rounded-lg bg-background p-5">
              <h3
                id="lesson-read"
                tabIndex={-1}
                className="scroll-mt-28 font-semibold"
              >
                Think of it like this
              </h3>
              <p className="mt-2 leading-7">{lesson.analogy}</p>
            </div>
            <h3 className="font-semibold">What you should remember</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {lesson.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="mt-7 border-t border-border pt-6">
              <h3
                id="lesson-practice"
                tabIndex={-1}
                className="scroll-mt-28 font-semibold"
              >
                Try it yourself
              </h3>
              <p className="mt-2 leading-7">{lesson.exercise}</p>
              {guidance?.practice ? (
                <a
                  href={guidance.practice.href}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
                >
                  {guidance.practice.label}
                </a>
              ) : null}
            </div>
            {lesson.slug === "idea-to-verified-release" && (
              <DeliveryLifecycleLab />
            )}
            {lesson.slug === "idea-to-verified-release" && (
              <PortfolioOsCaseStudy />
            )}
            {lesson.slug === "evidence-based-product-request" && (
              <ProductRequestLab />
            )}
            {lesson.slug === "security-assessments-buyer-size" && (
              <SecurityReviewLab />
            )}
            {lesson.slug === "cms-fundamentals" && <CmsLab />}
            {lesson.slug === "frontend-building-blocks" && (
              <FrontendLesson
                onSelectLesson={(slug, keepPath) =>
                  selectLesson(slug, keepPath)
                }
              />
            )}
            <fieldset
              id="lesson-check"
              tabIndex={-1}
              className="mt-7 scroll-mt-28 rounded-xl border border-border bg-background p-4 sm:p-5"
            >
              <legend className="px-2 font-semibold">Knowledge check</legend>
              <p className="mb-4 leading-7 font-medium">
                {lesson.check.question}
              </p>
              {lesson.check.choices.map((c, i) => (
                <label
                  key={c}
                  className={`mb-2 flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 ${answer === i ? "border-accent bg-card" : "border-border hover:bg-card"}`}
                >
                  <input
                    className="mt-1.5 shrink-0 accent-accent"
                    type="radio"
                    name={lesson.slug}
                    checked={answer === i}
                    onChange={() => setAnswer(i)}
                  />
                  {c}
                </label>
              ))}
              {answer !== null && (
                <p
                  role="status"
                  className="mt-3 rounded bg-background p-3 text-sm"
                >
                  <strong>
                    {answer === lesson.check.answer ? "Correct." : "Try again."}
                  </strong>{" "}
                  {lesson.check.feedbackByChoice?.[answer] ??
                    lesson.check.explanation}
                </p>
              )}
            </fieldset>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                className="min-h-11 rounded-lg border border-border px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-pressed={reviewed.includes(lesson.slug)}
                onClick={markReviewed}
              >
                {reviewed.includes(lesson.slug)
                  ? "Reviewed this session"
                  : "Mark as reviewed"}
              </button>
              <span className="text-xs leading-5 text-muted">
                Your reading review is self-reported. Quiz answers and practice
                are separate; neither is marked passed by this button.
              </span>
            </div>
            {!lesson.companion && guidance?.guide ? (
              <a
                href={guidance.guide.href}
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4"
              >
                {guidance.guide.label}
              </a>
            ) : null}
            {lesson.companion && (
              <a
                href={lesson.companion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-accent underline underline-offset-2"
              >
                {lesson.companion.label} ↗
              </a>
            )}
            <div className="mt-7 border-t border-border pt-5">
              <p className="text-sm font-semibold">Learn more</p>
              {lesson.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm text-accent underline"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
            <nav
              aria-label="Lesson sequence"
              className="mt-7 border-t border-border pt-5"
            >
              <p className="text-sm text-muted">
                {selectedPath
                  ? selectedPath.title
                  : `${track === "All" ? "All lessons" : track} catalog`}{" "}
                · Lesson {position + 1} of {sequence.length}
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between">
                {position > 0 ? (
                  <button
                    type="button"
                    className={`${button} min-h-11 text-left`}
                    onClick={() =>
                      selectLesson(
                        sequence[position - 1].slug,
                        Boolean(selectedPath),
                      )
                    }
                  >
                    ← Previous: {sequence[position - 1].title}
                  </button>
                ) : null}
                {position >= 0 && position < sequence.length - 1 ? (
                  <button
                    type="button"
                    className={`${button} min-h-11 bg-accent text-left text-accent-foreground`}
                    onClick={() =>
                      selectLesson(
                        sequence[position + 1].slug,
                        Boolean(selectedPath),
                      )
                    }
                  >
                    Next: {sequence[position + 1].title} →
                  </button>
                ) : (
                  <p className="text-sm leading-6">
                    End of this sequence. Try the linked practice or choose
                    another path.
                  </p>
                )}
              </div>
              <Link
                href="/ai-academy/playground"
                className="mt-3 inline-flex min-h-11 items-center text-sm text-accent underline"
              >
                Explore practice labs
              </Link>
            </nav>
          </article>
        </div>
      )}
      {tab === "apply" && (
        <section
          id="academy-panel"
          role="tabpanel"
          aria-labelledby="academy-tab-apply academy-apply-heading"
          tabIndex={0}
        >
          <div className="mb-6 max-w-2xl">
            <h2 id="academy-apply-heading" className="font-display text-4xl">
              Start with your task
            </h2>
            <p className="mt-2 text-muted">
              Choose the problem first. The tool, prompt and eventual skill come
              second. These are starting recommendations—not validated winners.
            </p>
          </div>
          <div className="mb-5 flex flex-wrap gap-3">
            <input
              aria-label="Search workflows"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a task or workflow…"
              className="min-w-0 flex-1 rounded-lg border border-border bg-card p-3"
            />
            <select
              aria-label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-border bg-card p-3"
            >
              {["All", "GTM", "Research", "Coding", "Productivity"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="space-y-3">
              {matches.length === 0 && (
                <p role="status" className="rounded-lg border p-5">
                  No matching workflows. Try another search.
                </p>
              )}
              {matches.map((w) => (
                <button
                  key={w.title}
                  onClick={() => setSelected(w.title)}
                  className={`block w-full rounded-xl border p-5 text-left hover:border-accent ${selected === w.title ? "border-accent bg-card" : "border-border"}`}
                >
                  <span className="text-xs text-muted">
                    {w.category} · {w.difficulty}
                  </span>
                  <h3 className="mt-1 font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted">{w.summary}</p>
                </button>
              ))}
            </div>
            {workflow ? (
              <article className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Workflow recommendation
                </p>
                <h3 className="mt-2 font-display text-3xl">{workflow.title}</h3>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold">Start with</dt>
                    <dd>{workflow.tool}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Reusable asset</dt>
                    <dd>{workflow.asset}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Why this approach</dt>
                    <dd className="text-muted">{workflow.why}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Next step</dt>
                    <dd className="text-muted">{workflow.next}</dd>
                  </div>
                </dl>
                <div className="mt-6 rounded-lg bg-background p-4">
                  <p className="mb-3 font-semibold">Starter prompt</p>
                  <p className="text-sm leading-6 whitespace-pre-wrap">
                    {workflow.prompt}
                  </p>
                </div>
                <button
                  onClick={() => copy(workflow.prompt)}
                  className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                >
                  Copy starter prompt
                </button>
              </article>
            ) : (
              <p role="status" className="py-6 text-sm">
                No matching workflows. Clear the search or choose another
                category.
              </p>
            )}
          </div>
        </section>
      )}
      {tab === "skills" && (
        <section
          id="academy-panel"
          role="tabpanel"
          aria-labelledby="academy-tab-skills academy-skills-heading"
          tabIndex={0}
          className="max-w-4xl"
        >
          <h2 id="academy-skills-heading" className="font-display text-4xl">
            Turn useful work into reusable skills
          </h2>
          <p className="mt-3 leading-7 text-muted">
            You don’t need a skill for every prompt. Promote a process once it
            repeats, needs consistent outputs and can be evaluated.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Prompt", "One clear assignment with expected output."],
              [
                "02",
                "Skill",
                "A versioned procedure with inputs, steps and checks.",
              ],
              [
                "03",
                "Agent",
                "A workflow that can use tools within explicit permissions.",
              ],
            ].map(([n, title, desc]) => (
              <div
                className="rounded-xl border border-border bg-card p-5"
                key={n}
              >
                <p className="text-sm text-accent">{n}</p>
                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Where everything belongs</h3>
            <p className="mt-3 leading-7">
              <strong>Notion</strong> teaches and indexes.{" "}
              <strong>Cursor</strong> develops and tests.{" "}
              <strong>GitHub</strong> stores canonical skill files and version
              history.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.notion.com/p/3f3cdefaec758139a149ef6b77d14f03"
              >
                AI Command Center (workspace access required) ↗
              </a>
              <a
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.notion.com/p/3f3cdefaec758176be84e740fac358f7"
              >
                Skills Handbook (workspace access required) ↗
              </a>
            </div>
          </div>
        </section>
      )}
      {copyStatus ? (
        <p role="status" className="mt-4 text-sm">
          {copyStatus}
        </p>
      ) : null}
      <div className="mt-10">{resources}</div>
      <p className="mt-5 text-xs leading-6 text-muted">
        Reviewed this session: {reviewed.length} / {lessons.length}. Review
        tracking resets when you leave this page.
      </p>
      <footer className="mt-14 border-t border-border pt-5 text-xs leading-6 text-muted">
        Educational prototype · No login, model API calls or persistent progress
        in this version. Review privacy requirements before using internal data.
        Sourced references are linked in lessons; model-specific comparisons
        require evaluation.
      </footer>
    </main>
  );
}
