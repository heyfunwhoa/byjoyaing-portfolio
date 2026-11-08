import { useRef, useState } from "react";
import { Search, ArrowUpRight, Check } from "lucide-react";
import type { Lesson, Track } from "@/lib/ai-academy";

const tracks = [
  "All",
  "Foundations",
  "Prompting",
  "Responsible AI",
  "GTM",
  "Builder",
] as const;
const control =
  "min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** A bounded catalog. Searching never changes the open lesson or its answer. */
export function LessonLibrary({
  lessons,
  active,
  track,
  reviewed,
  onTrackChange,
  onSelect,
}: {
  lessons: Lesson[];
  active: string;
  track: Track | "All";
  reviewed: string[];
  onTrackChange: (track: Track | "All") => void;
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = lessons.filter((lesson) =>
    terms.every((term) =>
      `${lesson.title} ${lesson.summary} ${lesson.track}`
        .toLowerCase()
        .includes(term),
    ),
  );
  const selectedInResults = matches.some((lesson) => lesson.slug === active);

  return (
    <section
      aria-labelledby="lesson-library-title"
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 id="lesson-library-title" className="font-semibold">
          Lesson library
        </h2>
        <a
          href="#academy-lesson-heading"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-accent underline underline-offset-4"
        >
          Current lesson <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <label htmlFor="lesson-search" className="mb-2 block text-sm font-medium">
        Search lessons
      </label>
      <div className="relative">
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute top-3.5 left-3 text-muted"
        />
        <input
          id="lesson-search"
          ref={searchRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Topic or question"
          className={`${control} pl-9`}
          aria-describedby="lesson-results"
        />
      </div>
      <label htmlFor="track" className="mt-4 mb-2 block text-sm font-medium">
        Learning track
      </label>
      <select
        id="track"
        value={track}
        onChange={(event) => {
          setQuery("");
          onTrackChange(event.target.value as Track | "All");
        }}
        className={control}
      >
        {tracks.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <p
        id="lesson-results"
        role="status"
        className="mt-3 text-xs leading-5 text-muted"
      >
        {matches.length} {matches.length === 1 ? "lesson" : "lessons"}
        {query.trim() ? " found" : " in this view"}
      </p>
      {query && (
        <button
          type="button"
          className="min-h-11 text-sm text-accent underline underline-offset-4"
          onClick={() => {
            setQuery("");
            searchRef.current?.focus();
          }}
        >
          Clear lesson search
        </button>
      )}
      {matches.length ? (
        <>
          <div className="mt-3 flex flex-col gap-2 text-sm font-medium lg:hidden">
            <label htmlFor="lesson-choice">Choose a lesson</label>
            <select
              id="lesson-choice"
              className={control}
              value={selectedInResults ? active : ""}
              onChange={(event) => onSelect(event.target.value)}
            >
              {!selectedInResults && (
                <option value="" disabled>
                  Choose from the results
                </option>
              )}
              {matches.map((lesson) => (
                <option key={lesson.slug} value={lesson.slug}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 hidden max-h-[min(55vh,28rem)] overflow-y-auto overscroll-contain p-1 lg:block">
            <ul className="space-y-2">
              {matches.map((lesson) => (
                <li key={lesson.slug}>
                  <button
                    type="button"
                    onClick={() => onSelect(lesson.slug)}
                    aria-current={active === lesson.slug ? "true" : undefined}
                    className={`min-h-11 w-full rounded-lg border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active === lesson.slug ? "border-accent bg-background" : "border-transparent hover:border-border hover:bg-background"}`}
                  >
                    <span className="text-xs text-muted">
                      {lesson.track} · {lesson.minutes} min
                    </span>
                    <span className="mt-1 block text-sm leading-6 font-semibold">
                      {lesson.title}
                    </span>
                    {reviewed.includes(lesson.slug) && (
                      <span className="mt-1 flex items-center gap-1 text-xs text-muted">
                        <Check size={12} aria-hidden="true" /> Reviewed this
                        session
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="mt-3 rounded-lg border border-dashed border-border p-4 text-sm leading-6">
          <p className="font-semibold">No lessons found</p>
          <p className="mt-1 text-muted">
            Try a broader topic or clear your search. Your current lesson is
            still open.
          </p>
        </div>
      )}
    </section>
  );
}
