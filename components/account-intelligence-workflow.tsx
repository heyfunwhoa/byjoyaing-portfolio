"use client";

import { useState } from "react";
import { accountRecords } from "@/lib/account-intelligence-records";

export function AccountIntelligenceWorkflow() {
  const [id, setId] = useState<string>(accountRecords[0].id);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState("");
  const record =
    accountRecords.find((item) => item.id === id) ?? accountRecords[0];
  const text =
    notes[id] ??
    [
      record.company,
      record.context,
      record.action,
      record.outcome,
      record.source.href,
      record.artifact.href,
    ].join("\n\n");

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
    } catch {
      setCopied("");
    }
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Choose an example"
        className="flex flex-wrap gap-2"
      >
        {accountRecords.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={record.id === item.id}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent aria-pressed:border-accent aria-pressed:bg-accent/10"
            onClick={() => {
              setId(item.id);
              setCopied("");
            }}
          >
            {item.company}
          </button>
        ))}
      </div>
      <article
        className="mt-4 rounded-xl border border-border bg-background p-5 sm:p-6"
        aria-labelledby="record-title"
      >
        <p className="text-sm text-muted">{record.kind}</p>
        <h3 id="record-title" className="mt-1 font-display text-2xl">
          {record.title}
        </h3>
        <dl className="mt-4 grid gap-4 text-base leading-7">
          <div>
            <dt className="font-semibold">Context</dt>
            <dd>{record.context}</dd>
          </div>
          <div>
            <dt className="font-semibold">What I did</dt>
            <dd>{record.action}</dd>
          </div>
          <div>
            <dt className="font-semibold">What came of it</dt>
            <dd>{record.outcome}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-x-6 text-sm">
          <a
            href={record.artifact.href}
            className="inline-flex min-h-11 items-center text-accent underline"
          >
            {record.artifact.label}
          </a>
          <a
            href={record.source.href}
            className="inline-flex min-h-11 items-center text-accent underline"
          >
            {record.source.label}
          </a>
        </div>
      </article>
      <details
        key={record.id}
        className="mt-3 rounded-xl border border-border p-4"
      >
        <summary className="cursor-pointer text-sm font-medium">
          Edit or copy a reading note
        </summary>
        <label className="mt-4 block text-sm" htmlFor="account-reading-note">
          Your note for {record.company}
        </label>
        <textarea
          id="account-reading-note"
          rows={7}
          value={text}
          className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm"
          onChange={(event) => {
            setNotes({ ...notes, [id]: event.target.value });
            setCopied("");
          }}
        />
        <button
          type="button"
          onClick={copyNote}
          className="mt-2 min-h-11 rounded-md border border-border px-4 text-sm font-medium"
        >
          {copied === text && text ? "Copied" : "Copy note"}
        </button>
      </details>
    </div>
  );
}
