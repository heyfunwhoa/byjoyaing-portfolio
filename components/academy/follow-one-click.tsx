"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AcademyBreadcrumb } from "@/components/academy-breadcrumb";
import { MissionLayout } from "@/components/academy/mission-layout";
import {
  checks,
  clickMission,
  emptyProgress,
  parseProgress,
  progressKey,
  recordAnswer,
  type MissionProgress,
} from "@/lib/academy/click-mission";

const button =
  "min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-background motion-reduce:transition-none";
const glossary = [
  ["Browser", "The app you use to visit websites, such as Chrome or Safari."],
  ["Frontend", "The page and controls you see and use."],
  ["Server", "A computer or service running software that answers requests."],
  ["Database", "An organized place where the application saves records."],
  [
    "API",
    "An agreed way for software to ask other software for information or an action.",
  ],
  [
    "Request / response",
    "The question your browser sends, and the reply it receives.",
  ],
];

function RequestWalkthrough() {
  const [allowed, setAllowed] = useState(true);
  const [position, setPosition] = useState(0);
  const stages = [
    [
      "You click",
      "Open Northstar’s brief. The screen shows a loading message.",
    ],
    [
      "The browser asks",
      "It requests the saved account summary through the API.",
    ],
    [
      "The server checks",
      allowed
        ? "Alex is signed in and has permission for this account."
        : "Blair is signed in but does not have permission for this account.",
    ],
    ...(allowed
      ? [
          [
            "The database is read",
            "The server reads the permitted summary. Access checks may also read permission records.",
          ],
        ]
      : []),
    [
      "The server replies",
      allowed
        ? "200: the request worked. A fictional summary is returned, marked ‘Review pending’."
        : "403: access refused. No private summary is returned.",
    ],
    [
      "The browser explains",
      allowed
        ? "Show the brief. A successful request does not prove the content is accurate or current."
        : "Show ‘You cannot access this account.’ This is different from ‘No evidence found’.",
    ],
  ];
  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="font-semibold">Choose a fictional reader</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            [true, "Alex · has access"],
            [false, "Blair · no account access"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={String(value)}
              aria-pressed={allowed === value}
              onClick={() => {
                setAllowed(value === true);
                setPosition(0);
              }}
              className={button}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <ol aria-label="Request flow" className="space-y-2">
        {stages.map(([title, text], i) => (
          <li
            key={title}
            aria-current={i === position ? "step" : undefined}
            className={`rounded-xl border p-4 transition-colors motion-reduce:transition-none ${i === position ? "border-accent bg-background" : "border-border"}`}
          >
            <strong className="text-sm">
              {i + 1}. {title}
              {i === position ? " · Current step" : ""}
            </strong>
            <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
          </li>
        ))}
      </ol>
      <p role="status" className="text-sm">
        Current: {stages[position][0]}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={button}
          disabled={position === stages.length - 1}
          onClick={() => setPosition((p) => p + 1)}
        >
          Advance request
        </button>
        <button type="button" className={button} onClick={() => setPosition(0)}>
          Replay request
        </button>
      </div>
      <p className="text-xs leading-5 text-muted">
        Simulation only. These buttons do not call an API or check real
        permissions. All steps remain readable without animation.
      </p>
    </div>
  );
}

export function FollowOneClick({
  lessonTitle,
  prerequisites,
}: {
  lessonTitle: string;
  prerequisites: readonly string[];
}) {
  const [progress, setProgress] = useState<MissionProgress>(emptyProgress);
  const [storage, setStorage] = useState<"loading" | "device" | "session">(
    "loading",
  );
  const [saved, setSaved] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);
  const [resume, setResume] = useState<number | null>(null);
  const [choices, setChoices] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, number>>({});
  const [resetOpen, setResetOpen] = useState(false);
  useEffect(() => {
    let active = true;
    async function restore() {
      await Promise.resolve();
      if (!active) return;
      try {
        const raw = window.localStorage.getItem(progressKey);
        const restored = parseProgress(raw);
        setProgress(restored);
        setResume(raw ? restored.step : null);
        setSaved(raw !== null);
        setStorage("device");
      } catch {
        setStorage("session");
      }
    }
    void restore();
    return () => {
      active = false;
    };
  }, []);
  function save(next: MissionProgress) {
    setProgress(next);
    try {
      window.localStorage.setItem(progressKey, JSON.stringify(next));
      setStorage("device");
      setSaved(true);
    } catch {
      setStorage("session");
      setSaved(false);
    }
  }
  function reset() {
    try {
      window.localStorage.removeItem(progressKey);
      setStorage("device");
      setResetFailed(false);
    } catch {
      setStorage("session");
      setResetFailed(true);
    }
    setProgress(emptyProgress());
    setChoices({});
    setFeedback({});
    setResume(null);
    setSaved(false);
    setResetOpen(false);
  }
  return (
    <>
      <AcademyBreadcrumb title={clickMission.title} />
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium text-accent">
          Guided practice · {lessonTitle}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          {clickMission.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Open a fictional account brief. Find out who answers the request, why
          access can be refused, and what the screen should say.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          Northstar Labs, Alex and Blair are made up. No installation, account,
          paid service or code experience is required.
        </p>
        {prerequisites.length > 0 ? (
          <details className="mt-4">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">
              Before you start
            </summary>
            <p className="text-sm leading-6 text-muted">
              The parent lesson recommends: {prerequisites.join(", ")}. You can
              still explore this plain-language practice now.
            </p>
          </details>
        ) : null}
      </header>
      <aside
        aria-label="Your practice progress"
        className="mt-6 rounded-xl border border-border p-4"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>Reviewed: {progress.reviewed ? "yes" : "not yet"}</li>
          <li>Practiced: {progress.practiced ? "yes" : "not yet"}</li>
          <li>
            Passed checks: {progress.passedCheckIds.length} / {checks.length}
          </li>
        </ul>
        <p role="status" className="mt-3 text-xs leading-5 text-muted">
          {storage === "loading"
            ? "Checking saved progress…"
            : storage === "session"
              ? "Device storage is unavailable. Progress lasts only while this page stays open."
              : saved
                ? "Saved on this device in this browser. No account sync."
                : "Progress will be saved on this device in this browser."}
        </p>
        {resetFailed ? (
          <p role="alert" className="mt-2 text-sm">
            This page was reset, but the browser would not clear its saved copy.
            It may reappear on reload; clear this site’s storage in browser
            settings if needed.
          </p>
        ) : null}
        <p className="mt-2 text-xs leading-5 text-muted">
          Reviewed is your reading acknowledgment. Practiced means you submitted
          a challenge. Passed checks records correct checked answers, not
          mastery or certification. Refreshing clears answer selections, not
          these progress markers.
        </p>
        {resume !== null && storage !== "loading" ? (
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              className={button}
              type="button"
              onClick={() => {
                save({ ...progress, step: resume });
                setResume(null);
              }}
            >
              Resume at {clickMission.steps[resume]}
            </button>
            <button
              type="button"
              className={button}
              onClick={() => {
                save({ ...progress, step: 0 });
                setResume(null);
              }}
            >
              Read from the beginning
            </button>
          </div>
        ) : null}
        {storage !== "loading" ? (
          <details
            className="mt-3"
            open={resetOpen}
            onToggle={(e) => setResetOpen(e.currentTarget.open)}
          >
            <summary className="min-h-11 cursor-pointer py-3 text-sm underline">
              Reset this mission’s progress
            </summary>
            <p className="text-sm">
              Clear this mission’s saved step and progress markers? Other
              lessons are unaffected.
            </p>
            <button type="button" className={`${button} mt-3`} onClick={reset}>
              Confirm reset
            </button>
          </details>
        ) : null}
      </aside>
      {storage !== "loading" ? (
        <MissionLayout
          steps={clickMission.steps}
          step={progress.step}
          onStep={(step) => {
            save({ ...progress, step });
            setResume(null);
          }}
        >
          {progress.step === 0 ? (
            <>
              <p className="leading-7">
                Think about opening an account in a CRM. You see a company name
                and buttons, but its saved summary may live somewhere else. In
                this example, clicking <strong>Open brief</strong> asks for that
                information.
              </p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {glossary.map(([term, meaning]) => (
                  <div
                    key={term}
                    className="rounded-xl border border-border p-4"
                  >
                    <dt className="font-semibold">{term}</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted">
                      {meaning}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="leading-7">
                These are jobs, not necessarily separate products. The API is
                not the database. The server decides how to answer the request.
              </p>
              <details>
                <summary className="min-h-11 cursor-pointer py-3 font-semibold">
                  Does every click send a request?
                </summary>
                <p className="leading-7 text-muted">
                  No. Opening a panel may only reveal information already
                  delivered. That changes the screen’s state. Saving a note
                  stores information for later: developers call that
                  persistence.
                </p>
              </details>
              <button
                type="button"
                className={button}
                onClick={() => save({ ...progress, reviewed: true })}
              >
                {progress.reviewed
                  ? "Reading marked as reviewed"
                  : "Mark reading as reviewed"}
              </button>
            </>
          ) : null}
          {progress.step === 1 ? (
            <>
              <p className="leading-7">
                Advance the highlighted step, then switch readers. Signing in
                answers “Who are you?” Account permission answers “What may you
                see?”
              </p>
              <RequestWalkthrough />
              <details>
                <summary className="min-h-11 cursor-pointer py-3 font-semibold">
                  Explore HTTP status codes
                </summary>
                <ul className="space-y-2 text-sm leading-6">
                  <li>
                    <strong>200:</strong> The request worked.
                  </li>
                  <li>
                    <strong>401:</strong> Valid authentication is needed.
                  </li>
                  <li>
                    <strong>403:</strong> Access is refused.
                  </li>
                  <li>
                    <strong>404:</strong> Not found, or intentionally not
                    disclosed.
                  </li>
                </ul>
                <p className="mt-3 text-sm leading-6">
                  Some apps use 404 to avoid revealing that a private record
                  exists. Request success and the quality of the returned
                  information are separate.
                </p>
              </details>
            </>
          ) : null}
          {progress.step === 2 ? (
            <>
              {checks.map((check) => (
                <fieldset
                  key={check.id}
                  className="rounded-xl border border-border p-4"
                >
                  <legend className="px-2 font-semibold">
                    {check.id === "denied-message"
                      ? "Fix the explanation"
                      : "Hidden or protected?"}
                  </legend>
                  <p className="mb-4 leading-7">{check.question}</p>
                  {check.choices.map((choice, i) => (
                    <label
                      key={choice}
                      className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm leading-6"
                    >
                      <input
                        type="radio"
                        name={check.id}
                        checked={choices[check.id] === i}
                        onChange={() => {
                          setChoices((p) => ({ ...p, [check.id]: i }));
                          setFeedback((p) => {
                            const next = { ...p };
                            delete next[check.id];
                            return next;
                          });
                        }}
                        className="mt-1 accent-accent"
                      />
                      {choice}
                    </label>
                  ))}
                  <details className="my-3">
                    <summary className="min-h-11 cursor-pointer py-3 text-sm underline">
                      Need a hint?
                    </summary>
                    <p className="text-sm leading-6 text-muted">{check.hint}</p>
                  </details>
                  <button
                    type="button"
                    className={button}
                    disabled={choices[check.id] === undefined}
                    onClick={() => {
                      const answer = choices[check.id];
                      setFeedback((p) => ({ ...p, [check.id]: answer }));
                      save(recordAnswer(progress, check.id, answer));
                    }}
                  >
                    Check answer
                  </button>
                  {feedback[check.id] !== undefined ? (
                    <p
                      role="status"
                      className="mt-4 rounded-xl border border-border bg-background p-4 text-sm leading-6"
                    >
                      <strong>
                        {feedback[check.id] === check.answer
                          ? "Check passed. "
                          : "Keep exploring. "}
                      </strong>
                      {check.explanation}
                    </p>
                  ) : null}
                </fieldset>
              ))}
            </>
          ) : null}
          {progress.step === 3 ? (
            <>
              <p className="leading-7">
                Say it back in your own words. You can speak aloud; nothing is
                recorded or sent anywhere.
              </p>
              <ol className="list-decimal space-y-3 pl-5 leading-7">
                <li>
                  What happens between clicking Open brief and seeing its
                  summary?
                </li>
                <li>Why can a signed-in person still be refused access?</li>
                <li>
                  Why does hiding a panel not protect data already delivered?
                </li>
              </ol>
              <details>
                <summary className="min-h-11 cursor-pointer py-3 font-semibold">
                  Compare with an example explanation
                </summary>
                <p className="leading-7 text-muted">
                  The screen asks for a summary. The server checks permission
                  before returning it. A signed-in person may not be allowed to
                  see every account. Hiding the display is different from
                  refusing to send private data.
                </p>
              </details>
              {progress.passedCheckIds.length === checks.length ? (
                <div
                  role="status"
                  className="rounded-xl border border-accent bg-background p-5"
                >
                  <strong>✓ Both checks passed</strong>
                  <p className="mt-2 text-sm leading-6">
                    You distinguished access refusal from missing evidence, and
                    hiding from protection. This records this activity’s checks;
                    it is not a claim of independent mastery.
                  </p>
                </div>
              ) : (
                <p className="text-sm leading-6 text-muted">
                  You can revisit Try whenever you want. You do not need to pass
                  a check to keep reading.
                </p>
              )}
              <Link
                href="/ai-academy"
                className="inline-flex min-h-11 items-center font-semibold text-accent underline"
              >
                Back to Builder Academy
              </Link>
              <details>
                <summary className="min-h-11 cursor-pointer py-3 font-semibold">
                  Explore further
                </summary>
                <p className="text-sm leading-6">
                  Use these as references, not a memorization task. Retries,
                  caching, webhooks and LLMs belong in later lessons.
                </p>
                <ul className="mt-3 space-y-3 text-sm text-accent underline">
                  <li>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/">
                      MDN: HTTP reference
                    </a>
                  </li>
                  <li>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status">
                      MDN: status codes
                    </a>
                  </li>
                  <li>
                    <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html">
                      OWASP: authorization
                    </a>
                  </li>
                </ul>
              </details>
            </>
          ) : null}
        </MissionLayout>
      ) : null}
    </>
  );
}
