import { ArrowRight } from "lucide-react";
import { learningPaths } from "@/lib/academy/learning-paths";
import { lessons } from "@/lib/ai-academy";

export function LearningPathPicker({
  onStart,
}: {
  onStart: (id: string) => void;
}) {
  const recommended = learningPaths[0];
  const firstLesson = lessons.find(
    (lesson) => lesson.slug === recommended.slugs[0],
  )!;
  return (
    <section aria-label="Choose a learning path" className="mb-8">
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="editorial-eyebrow text-accent">
            New to building software?
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Start with the full picture
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {recommended.outcome}
          </p>
          <p className="mt-3 text-xs text-muted">
            {recommended.slugs.length} lessons · First lesson:{" "}
            {firstLesson.minutes} min · No coding prerequisite
          </p>
        </div>
        <button
          type="button"
          onClick={() => onStart(recommended.id)}
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start recommended path <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <details className="mt-3 rounded-xl border border-border">
        <summary className="min-h-11 cursor-pointer px-5 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          Explore learning paths ({learningPaths.length})
        </summary>
        <div className="px-5 pb-5">
          <p className="text-sm leading-6 text-muted">
            Choose the outcome you need. You can skip ahead or switch paths at
            any time.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {learningPaths.map((path) => (
              <li
                key={path.id}
                className="flex flex-col rounded-xl border border-border bg-card p-4"
              >
                <p className="text-xs text-muted">
                  {path.slugs.length} lessons
                </p>
                <h3 className="mt-2 font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-6">{path.outcome}</p>
                <p className="mt-2 mb-4 text-xs leading-5 text-muted">
                  {path.prerequisite}
                </p>
                <button
                  type="button"
                  className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-left text-sm font-medium hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label={`Start this path: ${path.title}`}
                  onClick={() => onStart(path.id)}
                >
                  Start this path <ArrowRight size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
