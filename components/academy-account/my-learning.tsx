"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { lessons } from "@/lib/ai-academy";
import { lessonHref } from "@/lib/academy-account/policy";
import { academyAuthClient } from "@/lib/academy-account/client";
import { useLearning } from "./use-learning";
export function MyLearning() {
  const { data, status, busy, message, update } = useLearning();
  const [accountMessage, setAccountMessage] = useState("");
  const [confirm, setConfirm] = useState<"clear" | "delete" | null>(null);
  const [accountBusy, setAccountBusy] = useState(false);
  const confirmationTrigger = useRef<HTMLButtonElement | null>(null);
  function closeConfirmation() {
    setConfirm(null);
    requestAnimationFrame(() => confirmationTrigger.current?.focus());
  }
  const button =
    "min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
  async function accountAction(action: "sign-out" | "delete") {
    setAccountBusy(true);
    setAccountMessage("");
    try {
      const result =
        action === "delete"
          ? await academyAuthClient.deleteUser({})
          : await academyAuthClient.signOut();
      if (result.error) throw new Error("Unavailable");
      window.location.replace("/ai-academy");
    } catch {
      setAccountMessage(
        action === "delete"
          ? "Deletion did not complete. Sign in again to confirm it is you, then return here and try again."
          : "Sign-out did not complete. Please try again.",
      );
      setAccountBusy(false);
    }
  }
  const lastLesson = lessons.find((lesson) => lesson.slug === data.lastLesson);
  return (
    <>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Your saved lessons and self-reported reading progress. Practice results
        stay in their original exercises and are not synced here.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          className={`${button} inline-flex items-center`}
          href="/ai-academy"
        >
          Browse lessons
        </Link>
        <button
          className={button}
          disabled={accountBusy || busy}
          onClick={() => void accountAction("sign-out")}
        >
          Sign out
        </button>
      </div>
      {status === "loading" && (
        <p className="mt-6" role="status">
          Loading your learning…
        </p>
      )}
      {status === "anonymous" && (
        <p className="mt-6">
          Your session has ended.{" "}
          <Link className="text-accent underline" href="/ai-academy/sign-in">
            Sign in again
          </Link>{" "}
          to view your learning.
        </p>
      )}
      {status === "error" && (
        <button
          className={`${button} mt-6`}
          disabled={busy}
          onClick={() => void update()}
        >
          Try again
        </button>
      )}
      {status === "ready" && (
        <>
          <section className="mt-8 rounded-xl border border-border bg-card p-5">
            <h2 className="text-xl font-semibold">Continue learning</h2>
            {lastLesson ? (
              <Link
                className="mt-3 inline-flex min-h-11 items-center text-accent underline"
                href={lessonHref(lastLesson.slug)}
              >
                {lastLesson.title}
              </Link>
            ) : (
              <p className="mt-3 text-muted">
                Open a lesson and choose “Keep my place here” to set your next
                starting point.
              </p>
            )}
          </section>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {(["saved", "reviewed"] as const).map((kind) => {
              const records = data.records.filter((row) => row[kind]);
              return (
                <section
                  key={kind}
                  className="min-w-0 rounded-xl border border-border p-5"
                >
                  <h2 className="text-xl font-semibold">
                    {kind === "saved" ? "Saved lessons" : "Reading reviewed"} (
                    {records.length})
                  </h2>
                  {records.length ? (
                    <ul className="mt-3 divide-y divide-border">
                      {records.map((row) => (
                        <li className="py-3" key={row.slug}>
                          <Link
                            href={lessonHref(row.slug)}
                            className="inline-flex min-h-11 items-center text-accent underline"
                          >
                            {
                              lessons.find((lesson) => lesson.slug === row.slug)
                                ?.title
                            }
                          </Link>
                          <button
                            className={`${button} mt-2 block`}
                            disabled={busy || accountBusy}
                            onClick={() =>
                              void update({
                                slug: row.slug,
                                action: kind === "saved" ? "save" : "review",
                                value: false,
                              })
                            }
                          >
                            {kind === "saved"
                              ? "Remove saved lesson"
                              : "Undo reviewed"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-muted">
                      {kind === "saved"
                        ? "No saved lessons yet. Save one from the Academy when something catches your curiosity."
                        : "No reading marked reviewed yet. This is your own reading record, not an assessment."}
                    </p>
                  )}
                </section>
              );
            })}
          </div>
          <section className="mt-8 border-t border-border pt-6">
            <h2 className="font-semibold">Your account and data</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Clear saved lessons and reading progress, or delete your learner
              account and its learning records. Deletion requires a sign-in
              within the last ten minutes.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                className={button}
                disabled={busy || accountBusy}
                onClick={(event) => {
                  confirmationTrigger.current = event.currentTarget;
                  setConfirm("clear");
                }}
              >
                Clear my learning
              </button>
              <button
                className={button}
                disabled={busy || accountBusy}
                onClick={(event) => {
                  confirmationTrigger.current = event.currentTarget;
                  setConfirm("delete");
                }}
              >
                Delete my learner account
              </button>
              <Link
                className={`${button} inline-flex items-center`}
                href="/ai-academy/sign-in"
              >
                Sign in again
              </Link>
            </div>
            {confirm && (
              <div className="mt-4 rounded-lg border border-border p-4">
                <p>
                  {confirm === "clear"
                    ? "Clear all your saved lessons, reviewed reading and continue point?"
                    : "Delete your learner account and all its learning records? This cannot be undone."}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    className={button}
                    disabled={busy || accountBusy}
                    onClick={async () => {
                      if (confirm === "clear") {
                        await update("clear");
                        closeConfirmation();
                      } else await accountAction("delete");
                    }}
                  >
                    Confirm {confirm === "clear" ? "clear" : "deletion"}
                  </button>
                  <button
                    className={button}
                    disabled={busy || accountBusy}
                    onClick={closeConfirmation}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <Link
              className="mt-3 inline-flex min-h-11 items-center text-accent underline"
              href="/ai-academy/account-privacy"
            >
              Learning account privacy
            </Link>
          </section>
        </>
      )}
      <p role="status" aria-live="polite" className="mt-4 text-sm leading-6">
        {accountMessage || message}
      </p>
    </>
  );
}
