"use client";

import {
  accountById,
  demoAccounts,
  demoSignals,
  draftVariants,
  signalCategories,
  signalsForAccount,
  type DemoSignal,
  type SignalCategory,
} from "@/lib/account-intelligence-demo";
import { useMemo, useState, type ReactNode } from "react";

const stages = [
  { id: "accounts", label: "Assigned accounts" },
  { id: "feed", label: "Intelligence feed" },
  { id: "detail", label: "Signal detail" },
  { id: "draft", label: "Outreach draft" },
] as const;

type StageId = (typeof stages)[number]["id"];

function SignalBadge({ category }: { category: SignalCategory }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium tracking-wide text-foreground">
      {category}
    </span>
  );
}

function DemoFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#f7f4ee] text-foreground">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-xs font-medium tracking-wide text-muted">{title}</p>
        <p className="text-[11px] text-muted">Illustrative demo data</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function AccountIntelligenceWorkflow() {
  const [stage, setStage] = useState<StageId>("accounts");
  const [accountFilter, setAccountFilter] = useState<string | "all">("all");
  const [category, setCategory] = useState<SignalCategory | "All">("All");
  const [signalId, setSignalId] = useState(demoSignals[0].id);
  const [draftIndex, setDraftIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftBody, setDraftBody] = useState<string>(draftVariants[0].body);
  const [draftSubject, setDraftSubject] = useState<string>(draftVariants[0].subject);
  const [copied, setCopied] = useState(false);

  const signal = demoSignals.find((item) => item.id === signalId) ?? demoSignals[0];
  const account = accountById(signal.accountId);

  const feed = useMemo(() => {
    return demoSignals.filter((item) => {
      const accountMatch = accountFilter === "all" || item.accountId === accountFilter;
      const categoryMatch = category === "All" || item.category === category;
      return accountMatch && categoryMatch;
    });
  }, [accountFilter, category]);

  function openSignal(next: DemoSignal, nextStage: StageId) {
    setSignalId(next.id);
    setStage(nextStage);
    setEditing(false);
    setCopied(false);
  }

  function showDraft(index: number) {
    const next = draftVariants[index % draftVariants.length];
    setDraftIndex(index % draftVariants.length);
    setDraftSubject(next.subject);
    setDraftBody(next.body);
    setEditing(false);
    setCopied(false);
  }

  async function copyDraft() {
    const text = `Subject: ${draftSubject}\n\n${draftBody}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
      <div
        role="tablist"
        aria-label="Product workflow"
        className="flex gap-2 overflow-x-auto lg:flex-col"
      >
        {stages.map((item, index) => {
          const selected = stage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`workflow-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`workflow-panel-${item.id}`}
              onClick={() => setStage(item.id)}
              className={
                selected
                  ? "shrink-0 rounded-xl border border-accent bg-card px-3 py-3 text-left text-sm font-medium text-accent"
                  : "shrink-0 rounded-xl border border-border bg-card px-3 py-3 text-left text-sm text-foreground hover:border-accent"
              }
            >
              <span className="block text-[11px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`workflow-panel-${stage}`}
        aria-labelledby={`workflow-tab-${stage}`}
        className="min-w-0"
      >
        {stage === "accounts" ? (
          <DemoFrame title="Account intelligence">
            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <p>
                <span className="block text-lg font-semibold">{demoAccounts.length}</span>
                <span className="text-muted">Accounts in this demo</span>
              </p>
              <p>
                <span className="block text-lg font-semibold">{demoSignals.length}</span>
                <span className="text-muted">Sample signals</span>
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">
                  Illustrative assigned accounts. Not a live territory.
                </caption>
                <thead className="text-[11px] font-medium text-muted">
                  <tr>
                    <th className="py-2 pr-3 font-medium">Account</th>
                    <th className="py-2 pr-3 font-medium">Industry</th>
                    <th className="py-2 pr-3 font-medium">Recent signals</th>
                    <th className="py-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {demoAccounts.map((item) => (
                    <tr key={item.id} className="border-t border-border">
                      <td className="py-3 pr-3 font-medium">{item.name}</td>
                      <td className="py-3 pr-3 text-muted">{item.industry}</td>
                      <td className="py-3 pr-3">{signalsForAccount(item.id).length} in demo</td>
                      <td className="py-3">
                        <button
                          type="button"
                          className="rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-accent-foreground"
                          onClick={() => {
                            setAccountFilter(item.id);
                            setCategory("All");
                            setStage("feed");
                          }}
                        >
                          View signals
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">
              In the design, assignments would sync from territory mapping or be typed in. Neither sync exists in this repository.
            </p>
          </DemoFrame>
        ) : null}

        {stage === "feed" ? (
          <DemoFrame title="Intelligence feed">
            <div className="mb-4 flex flex-wrap gap-1" role="group" aria-label="Signal category">
              {(["All", ...signalCategories] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={
                    category === item
                      ? "rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground"
                      : "rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-foreground"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            {accountFilter !== "all" ? (
              <p className="mb-3 text-xs text-muted">
                Filtered to {accountById(accountFilter).name}.{" "}
                <button
                  type="button"
                  className="link-rule font-medium text-foreground"
                  onClick={() => setAccountFilter("all")}
                >
                  Show all demo accounts
                </button>
              </p>
            ) : null}
            <ul className="flex flex-col gap-3">
              {feed.length === 0 ? (
                <li className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
                  No sample signal in that category.
                </li>
              ) : (
                feed.map((item) => {
                  const itemAccount = accountById(item.accountId);
                  return (
                    <li key={item.id} className="rounded-xl border border-border bg-card p-4">
                      <SignalBadge category={item.category} />
                      <p className="mt-2 text-sm text-muted">{itemAccount.name}</p>
                      <p className="mt-1 font-medium">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        <span className="font-medium text-foreground">Observed. </span>
                        {item.observed}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-muted">{item.sourceLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium"
                          onClick={() => openSignal(item, "detail")}
                        >
                          View detail
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-accent-foreground"
                          onClick={() => openSignal(item, "draft")}
                        >
                          Draft outreach
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </DemoFrame>
        ) : null}

        {stage === "detail" ? (
          <DemoFrame title="Signal detail">
            <div className="rounded-xl border border-border bg-card p-4">
              <SignalBadge category={signal.category} />
              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="font-medium">Account</dt>
                  <dd className="text-muted">{account.name}</dd>
                </div>
                <div>
                  <dt className="font-medium">Observed event</dt>
                  <dd className="text-muted">{signal.observed}</dd>
                </div>
                <div>
                  <dt className="font-medium">Published in this demo</dt>
                  <dd className="text-muted">{signal.date}</dd>
                </div>
                <div>
                  <dt className="font-medium">Source</dt>
                  <dd className="text-muted">{signal.sourceLabel}</dd>
                </div>
                <div>
                  <dt className="font-medium">Potential relevance — hypothesis</dt>
                  <dd className="text-muted">{signal.hypothesis}</dd>
                </div>
                <div>
                  <dt className="font-medium">Suggested next step</dt>
                  <dd className="text-muted">{signal.nextStep}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-4 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                onClick={() => openSignal(signal, "draft")}
              >
                Draft outreach from this signal
              </button>
            </div>
          </DemoFrame>
        ) : null}

        {stage === "draft" ? (
          <DemoFrame title="Outreach draft">
            <p className="text-sm text-muted">
              {account.name} · {signal.category}
            </p>
            <p className="mt-3 text-sm leading-6">
              <span className="font-medium">Outreach angle. </span>
              {signal.angle}
            </p>
            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <label className="block text-xs font-medium text-muted" htmlFor="draft-subject">
                Subject
              </label>
              {editing ? (
                <input
                  id="draft-subject"
                  value={draftSubject}
                  onChange={(event) => setDraftSubject(event.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                />
              ) : (
                <p className="mt-1 text-sm font-medium">{draftSubject}</p>
              )}
              <label className="mt-3 block text-xs font-medium text-muted" htmlFor="draft-body">
                Body
              </label>
              {editing ? (
                <textarea
                  id="draft-body"
                  value={draftBody}
                  onChange={(event) => setDraftBody(event.target.value)}
                  rows={8}
                  className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm leading-6"
                />
              ) : (
                <p id="draft-body" className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted">
                  {draftBody}
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-xs font-medium"
                onClick={() => showDraft(draftIndex + 1)}
              >
                Regenerate
              </button>
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-xs font-medium"
                onClick={() => setEditing((value) => !value)}
              >
                {editing ? "Done editing" : "Edit draft"}
              </button>
              <button
                type="button"
                className="rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground"
                onClick={() => void copyDraft()}
              >
                {copied ? "Copied" : "Copy draft"}
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">
              Demo only. Regenerate swaps a local example. No model is called. Human review is required before anyone sends this.
            </p>
          </DemoFrame>
        ) : null}
      </div>
    </div>
  );
}
