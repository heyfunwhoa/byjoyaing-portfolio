"use client";
import Link from "next/link";
import { useLearning } from "./use-learning";
const button =
  "min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
export function LessonAccountActions({ slug }: { slug: string }) {
  const { data, status, busy, message, update } = useLearning();
  const record = data.records.find((row) => row.slug === slug);
  const signIn = `/ai-academy/sign-in?lesson=${encodeURIComponent(slug)}`;
  return (
    <section
      aria-label="Save your learning"
      className="my-5 rounded-xl border border-border bg-card p-4"
    >
      <p className="font-semibold">Keep your place</p>
      <p className="mt-1 text-sm leading-6 text-muted">
        Save a lesson or choose where to continue. Reading stays public;
        practice answers stay separate.
      </p>
      {status === "anonymous" ? (
        <Link
          className={`${button} mt-3 inline-flex items-center text-accent`}
          href={signIn}
        >
          Sign in to save this lesson
        </Link>
      ) : status === "loading" ? (
        <p className="mt-3 text-sm" role="status">
          Checking your learning account…
        </p>
      ) : status === "error" ? (
        <button
          className={`${button} mt-3`}
          disabled={busy}
          onClick={() => void update()}
        >
          Try again
        </button>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className={button}
            disabled={busy}
            aria-pressed={record?.saved ?? false}
            onClick={() =>
              void update({ slug, action: "save", value: !record?.saved })
            }
          >
            {record?.saved ? "Lesson saved" : "Save this lesson"}
          </button>
          <button
            className={button}
            disabled={busy}
            aria-pressed={record?.reviewed ?? false}
            onClick={() =>
              void update({ slug, action: "review", value: !record?.reviewed })
            }
          >
            {record?.reviewed ? "Reading reviewed" : "Save as reviewed"}
          </button>
          <button
            className={button}
            disabled={busy}
            aria-pressed={data.lastLesson === slug}
            onClick={() => void update({ slug, action: "resume", value: true })}
          >
            {data.lastLesson === slug
              ? "Continue here next time"
              : "Keep my place here"}
          </button>
          <Link
            className={`${button} inline-flex items-center text-accent`}
            href="/ai-academy/my-learning"
          >
            My learning
          </Link>
        </div>
      )}
      <p className="mt-2 text-xs leading-5 text-muted">
        Reviewed means you chose to mark the reading. It is not a quiz result or
        a credential.
      </p>
      <p className="mt-2 text-sm" role="status" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
