"use client";

import { useState, type KeyboardEvent } from "react";
import {
  findInstallMethod,
  installMethods,
  installSituations,
  installSources,
  verifyCommands,
  type InstallMethod,
  type InstallSituationId,
} from "@/lib/ai-academy/install-methods";

// Pattern: tabs on wide screens, a labeled native selector on narrow ones
// (docs/design/workbench-reuse.md), matching competitive-intelligence-workflow.
// Compare-all uses a semantic table. Nothing is scored or saved.

function CommandBlock({ command, label }: { command: string; label: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("Copied.");
    } catch {
      setStatus("Copy unavailable here; select the text instead.");
    }
  }
  return (
    <div>
      <pre className="max-w-full whitespace-pre-wrap break-all rounded-lg border border-border bg-card p-3 text-sm leading-6">
        <code>{command}</code>
      </pre>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card px-3 text-sm font-semibold"
        >
          Copy {label}
        </button>
        <p role="status" className="text-sm text-muted">
          {status}
        </p>
      </div>
    </div>
  );
}

function MethodFields({ method }: { method: InstallMethod }) {
  return (
    <dl className="mt-4 grid min-w-0 gap-4 [&>div]:min-w-0">
      <div>
        <dt className="text-sm font-semibold">{method.command ? "Command" : "Step"}</dt>
        <dd className="mt-2">
          {method.command ? (
            <CommandBlock command={method.command} label="command" />
          ) : (
            <p className="text-sm leading-6">{method.manualStep}</p>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-semibold">How it updates</dt>
        <dd className="mt-1 text-sm leading-6 text-muted">{method.updates}</dd>
      </div>
      <div>
        <dt className="text-sm font-semibold">Can a git hook find trufflehog?</dt>
        <dd className="mt-1 text-sm leading-6 text-muted">
          <strong className="text-foreground">{method.hookFinds.answer}</strong>, {method.hookFinds.detail}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-semibold">What you are trusting</dt>
        <dd className="mt-1 text-sm leading-6 text-muted">{method.trust}</dd>
      </div>
    </dl>
  );
}

export function InstallMethodLab() {
  const [situationId, setSituationId] = useState<InstallSituationId>(installSituations[0].id);
  const index = installSituations.findIndex((item) => item.id === situationId);
  const situation = installSituations[index];
  const method = findInstallMethod(situation.method);

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % installSituations.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + installSituations.length) % installSituations.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = installSituations.length - 1;
    else return;
    event.preventDefault();
    const id = installSituations[next].id;
    setSituationId(id);
    document.getElementById(`install-tab-${id}`)?.focus();
  }

  return (
    <section
      aria-labelledby="install-lab-title"
      className="mt-7 min-w-0 rounded-xl border border-border bg-background p-4 sm:p-6"
    >
      <p className="editorial-eyebrow text-accent">Practice lab · Your own machine</p>
      <h3 id="install-lab-title" className="mt-2 text-xl font-semibold">
        Pick an install method
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Start with where the tool needs to run. Each answer uses the same four fields so you can compare them. Example
        tool: TruffleHog.
      </p>

      <div className="mt-5 lg:hidden">
        <label htmlFor="install-situation" className="mb-2 block text-sm font-semibold">
          Where does it need to run? ({index + 1} of {installSituations.length})
        </label>
        <select
          id="install-situation"
          value={situationId}
          onChange={(event) => setSituationId(event.target.value as InstallSituationId)}
          className="min-h-12 w-full min-w-0 rounded-lg border border-border bg-card px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {installSituations.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div
        role="tablist"
        aria-label="Where does it need to run?"
        onKeyDown={onTabKeyDown}
        className="mt-5 hidden flex-wrap gap-2 lg:flex"
      >
        {installSituations.map((item) => {
          const selected = item.id === situationId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`install-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="install-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setSituationId(item.id)}
              className={`min-h-11 rounded-lg border bg-card px-3 text-sm ${
                selected ? "border-accent font-semibold text-accent" : "border-border"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="install-panel"
        role="tabpanel"
        aria-labelledby={`install-tab-${situationId}`}
        className="mt-4 min-w-0 rounded-lg border border-border bg-card/60 p-4"
      >
        <p className="text-sm leading-6 text-muted">{situation.question}</p>
        <p className="mt-3 text-lg font-semibold">Start with: {method.name}</p>
        <p className="mt-1 text-sm leading-6">{situation.why}</p>
        <MethodFields method={method} />
      </div>

      <details className="mt-5 rounded-lg border border-border bg-card px-4 py-1">
        <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold">
          Compare all five methods
        </summary>
        <div
          role="region"
          aria-label="Install methods comparison, scrolls sideways on narrow screens"
          tabIndex={0}
          className="mb-3 mt-2 overflow-x-auto"
        >
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">How the five TruffleHog install methods compare</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-3 font-semibold">Method</th>
                <th scope="col" className="py-2 pr-3 font-semibold">How it updates</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Git hook finds it?</th>
                <th scope="col" className="py-2 font-semibold">What you are trusting</th>
              </tr>
            </thead>
            <tbody>
              {installMethods.map((item) => (
                <tr key={item.id} className="border-b border-border align-top last:border-0">
                  <th scope="row" className="py-2 pr-3 font-semibold">{item.name}</th>
                  <td className="py-2 pr-3 text-muted">{item.updates}</td>
                  <td className="py-2 pr-3 text-muted">
                    <strong className="text-foreground">{item.hookFinds.answer}</strong>, {item.hookFinds.detail}
                  </td>
                  <td className="py-2 text-muted">{item.trust}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-sm font-semibold">You are done when this prints a version</p>
        <div className="mt-2">
          <CommandBlock command={verifyCommands.join("\n")} label="check" />
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">
          If the first line prints nothing, your shell cannot find the command yet. This lab does not check your
          machine or save progress.
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        Sources, checked 26 Nov 2026:{" "}
        {Object.values(installSources).map((source, i, all) => (
          <span key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              {source.label} ↗
            </a>
            {i < all.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
