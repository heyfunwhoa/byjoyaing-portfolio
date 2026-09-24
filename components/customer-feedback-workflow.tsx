"use client";

import {
  feedbackRecords,
  followUpDrafts,
  recordsForTheme,
  themeFilters,
  themes,
  type FeedbackRecord,
  type FeedbackSource,
  type ThemeFilter,
} from "@/lib/customer-feedback-demo";
import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react";

const stages = [
  { id: "inbox", label: "Feedback inbox" },
  { id: "normalize", label: "Normalization" },
  { id: "themes", label: "Theme intelligence" },
  { id: "decision", label: "Product decision" },
  { id: "loop", label: "Close the loop" },
] as const;

type StageId = (typeof stages)[number]["id"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#f7f4ee]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-xs font-medium tracking-wide text-muted">{title}</p>
        <p className="text-[11px] text-muted">Illustrative demo data</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground">
      {children}
    </span>
  );
}

const sourceEdge: Record<FeedbackSource, string> = {
  Sales: "border-l-accent",
  "Customer Success": "border-l-foreground/50",
  Support: "border-l-foreground/30",
  "Closed-lost": "border-l-foreground/70",
};

export function CustomerFeedbackWorkflow() {
  const [stage, setStage] = useState<StageId>("inbox");
  const [recordId, setRecordId] = useState(feedbackRecords[0].id);
  const [themeName, setThemeName] = useState(feedbackRecords[0].suggestedTheme);
  const [confirmed, setConfirmed] = useState(false);
  const [filter, setFilter] = useState<ThemeFilter>("All");
  const [themeId, setThemeId] = useState(themes[0].id);
  const [decision, setDecision] = useState<"pending" | "accepted">("pending");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(followUpDrafts.identity);
  const [copied, setCopied] = useState(false);

  const record = feedbackRecords.find((item) => item.id === recordId) ?? feedbackRecords[0];
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];
  const themeRecords = recordsForTheme(theme.name);

  const visibleThemes = useMemo(() => {
    if (filter === "Signal volume") return themes.filter((theme) => theme.signalCount >= 2);
    if (filter === "Account count") return themes.filter((theme) => theme.accountCount >= 2);
    if (filter === "Commercial context") {
      return themes.filter((theme) => theme.commercial.startsWith("One"));
    }
    if (filter === "Product status") return themes.filter((theme) => theme.status === "In review");
    return themes;
  }, [filter]);

  function selectRecord(next: FeedbackRecord) {
    setRecordId(next.id);
    setThemeName(next.suggestedTheme);
    setConfirmed(false);
    setDecision("pending");
    setStage("normalize");
  }

  function openTheme(nextId: string, name: string) {
    setThemeId(nextId);
    setThemeName(name);
    setDecision("pending");
    setDraft(followUpDrafts[nextId] ?? followUpDrafts.identity);
    setEditing(false);
    setCopied(false);
    setStage("decision");
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = stages.findIndex((item) => item.id === stage);
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + stages.length) % stages.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = stages.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const id = stages[next].id;
    setStage(id);
    document.getElementById(`feedback-tab-${id}`)?.focus();
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <div
        role="tablist"
        aria-label="Feedback workflow"
        onKeyDown={onTabKeyDown}
        className="flex gap-2 overflow-x-auto lg:flex-col"
      >
        {stages.map((item, index) => {
          const selected = stage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`feedback-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`feedback-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setStage(item.id)}
              className={
                selected
                  ? "shrink-0 rounded-xl border border-accent bg-card px-3 py-3 text-left text-sm font-medium text-accent"
                  : "shrink-0 rounded-xl border border-border bg-card px-3 py-3 text-left text-sm"
              }
            >
              <span className="block text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`feedback-panel-${stage}`} aria-labelledby={`feedback-tab-${stage}`} className="min-w-0">
        {stage === "inbox" ? (
          <Frame title="Feedback inbox">
            <ul className="flex flex-col gap-3">
              {feedbackRecords.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectRecord(item)}
                    className={`w-full rounded-xl border border-border border-l-4 bg-card p-4 text-left hover:border-accent ${sourceEdge[item.source]}`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <Pill>{item.source}</Pill>
                      <Pill>{item.status}</Pill>
                    </div>
                    <p className="mt-2 text-sm font-medium">{item.account}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.quote}</p>
                    <p className="mt-2 text-xs text-muted">
                      {item.date} · Category: {item.suggestedTheme}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </Frame>
        ) : null}

        {stage === "normalize" ? (
          <Frame title="Normalization">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-medium text-muted">Original request</p>
                <p className="mt-2 text-sm leading-6">{record.quote}</p>
                <p className="mt-3 text-xs text-muted">
                  {record.account} · {record.source} · {record.date}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
                <label className="block text-xs font-medium text-muted" htmlFor="theme-name">
                  Suggested theme
                </label>
                <input
                  id="theme-name"
                  value={themeName}
                  onChange={(event) => {
                    setThemeName(event.target.value);
                    setConfirmed(false);
                  }}
                  className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5"
                />
                <p className="mt-3">
                  <span className="font-medium">Customer need. </span>
                  {record.need}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Source reference. </span>
                  {record.source}, {record.date}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Account context. </span>
                  {record.account} · {record.owner}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Review status. </span>
                  {confirmed ? "Confirmed in this demo" : record.status}
                </p>
                <p className="mt-2 text-muted">
                  The suggestion is sample data, not a model score. Correcting it stays in the browser.
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground"
                  onClick={() => setConfirmed(true)}
                >
                  {confirmed ? "Classification confirmed" : "Confirm classification"}
                </button>
              </div>
            </div>
          </Frame>
        ) : null}

        {stage === "themes" ? (
          <Frame title="Theme intelligence">
            <div className="mb-4 flex flex-wrap gap-1" role="group" aria-label="Theme filter">
              {themeFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                  className={
                    filter === item
                      ? "rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground"
                      : "rounded-full border border-border px-2.5 py-1 text-[11px] font-medium"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <ul className="grid gap-3">
              {visibleThemes.length === 0 ? (
                <li className="rounded-xl border border-dashed border-border p-4 text-sm text-muted">
                  No sample theme matches that filter.
                </li>
              ) : (
                visibleThemes.map((theme) => (
                  <li key={theme.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex flex-wrap gap-2">
                      <Pill>{theme.status}</Pill>
                      <Pill>{`${theme.signalCount} signals`}</Pill>
                      <Pill>{`${theme.accountCount} accounts`}</Pill>
                    </div>
                    <p className="mt-2 font-medium">{theme.name}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{theme.commercial}</p>
                    <button
                      type="button"
                      className="mt-3 rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-accent-foreground"
                      onClick={() => openTheme(theme.id, theme.name)}
                    >
                      View decision
                    </button>
                  </li>
                ))
              )}
            </ul>
          </Frame>
        ) : null}

        {stage === "decision" ? (
          <Frame title="Product decision">
            <div className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
              <div className="flex flex-wrap gap-2">
                <Pill>{theme.status}</Pill>
              </div>
              <p className="mt-2 font-medium">{theme.name}</p>
              <p className="mt-2 text-muted">{theme.summary}</p>
              <p className="mt-3 font-medium">Supporting feedback</p>
              <ul className="mt-1 space-y-2 text-muted">
                {themeRecords.map((item) => (
                  <li key={item.id}>
                    {item.account} ({item.source}): {item.quote}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <span className="font-medium">Affected accounts. </span>
                {[...new Set(themeRecords.map((item) => item.account))].join(", ")}
              </p>
              <p className="mt-2">
                <span className="font-medium">Associated opportunities. </span>
                {theme.commercial}
              </p>
              <p className="mt-2">
                <span className="font-medium">Customer commitments. </span>
                {theme.commitment}
              </p>
              <p className="mt-2">
                <span className="font-medium">Product owner. </span>
                {theme.owner}
              </p>
              <p className="mt-2">
                <span className="font-medium">Product status. </span>
                {decision === "accepted" ? "Reviewed in this demo. Not shipped." : theme.status}
              </p>
              <p className="mt-2 text-muted">
                <span className="font-medium text-foreground">Decision rationale. </span>
                {theme.rationale}
              </p>
              <button
                type="button"
                className="mt-4 rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground"
                onClick={() => setDecision("accepted")}
              >
                {decision === "accepted" ? "Marked reviewed in this demo" : "Confirm product review"}
              </button>
              <p className="mt-2 text-xs text-muted">
                Confirming here does not write a roadmap item. Shipping a related feature would still not close every original request.
              </p>
            </div>
          </Frame>
        ) : null}

        {stage === "loop" ? (
          <Frame title="Close the loop">
            <dl className="grid gap-3 text-sm leading-6">
              {themeRecords.map((item) => (
                <div key={item.id}>
                  <dt className="font-medium">
                    Original request · {item.account}
                  </dt>
                  <dd className="text-muted">
                    {item.quote} · {item.owner} · {item.status}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-medium">Product update</dt>
                <dd className="text-muted">
                  {decision === "accepted"
                    ? "Demo status: reviewed, not shipped. Each original request stays open until someone writes that account."
                    : "No product status yet. Confirm the review on the previous step, or leave this open."}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Review status</dt>
                <dd className="text-muted">Draft only. A person has to approve it before it could be sent.</dd>
              </div>
            </dl>
            <label className="mt-4 block text-xs font-medium text-muted" htmlFor="follow-up">
              Suggested follow-up
            </label>
            {editing ? (
              <textarea
                id="follow-up"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={7}
                className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm leading-6"
              />
            ) : (
              <p id="follow-up" className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted">
                {draft}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rounded-md border border-border px-3 py-2 text-xs font-medium" onClick={() => setEditing((value) => !value)}>
                {editing ? "Done editing" : "Edit draft"}
              </button>
              <button type="button" className="rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground" onClick={() => void copyDraft()}>
                {copied ? "Copied" : "Copy draft"}
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">Human review is required before sending. This demo does not email anyone.</p>
          </Frame>
        ) : null}
      </div>
    </div>
  );
}
