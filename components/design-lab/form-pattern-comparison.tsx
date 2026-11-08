"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

export const formPatternOptions = [
  {
    id: "radio",
    name: "Radio group",
    use: "Exactly one visible choice from a short set.",
    tradeoff: "All choices take space, but people can compare them immediately.",
    example: "Choose one campaign owner.",
  },
  {
    id: "checkbox",
    name: "Checkbox group",
    use: "Any number of independent options.",
    tradeoff: "Works for multiple selections, not a single mutually exclusive answer.",
    example: "Choose which campaign channels to include.",
  },
  {
    id: "select",
    name: "Select menu",
    use: "One choice from a known list without occupying much space.",
    tradeoff: "Choices are hidden until opened; a long list may be difficult to scan.",
    example: "Choose one campaign stage.",
  },
  {
    id: "search",
    name: "Search and choose",
    use: "Find one item in a longer or unfamiliar collection.",
    tradeoff: "Requires typing and a useful no-results state; adds complexity.",
    example: "Find an account for the campaign.",
  },
] as const;

type Pattern = (typeof formPatternOptions)[number]["id"];
const people = ["Account Executive", "SDR", "Partner Manager"];
const channels = ["Email", "Phone", "Event follow-up"];
const accounts = ["Northstar Security", "Horizon Networks", "Lumen Data", "Summit Systems", "Evergreen Cloud"];

export function FormPatternComparison() {
  const heading = useId();
  const label = useId();
  const [pattern, setPattern] = useState<Pattern>("radio");
  const [owner, setOwner] = useState(people[0]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["Email"]);
  const [stage, setStage] = useState("Research");
  const [query, setQuery] = useState("");
  const [account, setAccount] = useState("");
  const current = formPatternOptions.find((item) => item.id === pattern)!;
  const matches = accounts.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const toggleChannel = (name: string, checked: boolean) =>
    setSelectedChannels((current) => checked ? [...current, name] : current.filter((item) => item !== name));
  return (
    <section aria-labelledby={heading} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">Learn by comparing · input patterns</p>
        <h2 id={heading} className="mt-2 font-display text-2xl">Which form control should I use?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Compare four ways to make choices in a fictional campaign workflow.
          Try changing each example to see the difference between one choice,
          multiple choices, and searching a longer list. This is not connected to a CRM.
        </p>
      </div>
      <div role="group" aria-label="Compare form patterns" className="flex flex-wrap gap-2">
        {formPatternOptions.map((item) => (
          <Button key={item.id} type="button"
            aria-pressed={pattern === item.id}
            variant={pattern === item.id ? "default" : "outline"}
            onClick={() => setPattern(item.id)}>{item.name}</Button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="font-semibold">{current.example}</h3>
        <div className="mt-4">
          {pattern === "radio" ? (
            <fieldset className="space-y-2">
              <legend className="mb-2 text-sm font-medium">Campaign owner</legend>
              {people.map((person) => (
                <label key={person} className="flex min-h-11 items-center gap-3 text-sm">
                  <input type="radio" name={heading + "-owner"} value={person}
                    checked={owner === person} onChange={() => setOwner(person)}
                    className="h-4 w-4 accent-current" />{person}
                </label>
              ))}
              <p role="status" className="text-sm text-muted">One owner: {owner}</p>
            </fieldset>
          ) : pattern === "checkbox" ? (
            <fieldset className="space-y-2">
              <legend className="mb-2 text-sm font-medium">Campaign channels</legend>
              {channels.map((channel) => (
                <label key={channel} className="flex min-h-11 items-center gap-3 text-sm">
                  <input type="checkbox" checked={selectedChannels.includes(channel)}
                    onChange={(event) => toggleChannel(channel, event.target.checked)}
                    className="h-4 w-4 accent-current" />{channel}
                </label>
              ))}
              <p role="status" className="text-sm text-muted">
                {selectedChannels.length ? selectedChannels.join(", ") : "No channels selected"}
              </p>
            </fieldset>
          ) : pattern === "select" ? (
            <div className="max-w-sm">
              <label htmlFor={label + "-stage"} className="block text-sm font-medium">Campaign stage</label>
              <select id={label + "-stage"} value={stage}
                onChange={(event) => setStage(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-border bg-background px-3">
                <option>Research</option><option>Outreach</option><option>Evaluation</option><option>Complete</option>
              </select>
              <p role="status" className="mt-3 text-sm text-muted">Selected stage: {stage}</p>
            </div>
          ) : (
            <div className="max-w-md space-y-3">
              <label htmlFor={label + "-account"} className="block text-sm font-medium">Search fictional accounts</label>
              <input id={label + "-account"} type="search" value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a name to filter"
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3" />
              <p role="status" className="text-xs text-muted">{matches.length} matches</p>
              <div role="group" aria-label="Matching accounts" className="flex flex-wrap gap-2">
                {matches.map((item) => (
                  <Button key={item} type="button" variant={account === item ? "default" : "outline"}
                    aria-pressed={account === item} onClick={() => setAccount(item)}>{item}</Button>
                ))}
              </div>
              {!matches.length && (
                <div className="space-y-2">
                  <p className="text-sm text-muted">No accounts match that search.</p>
                  <Button type="button" variant="outline" onClick={() => setQuery("")}>Clear search</Button>
                </div>
              )}
              <p role="status" className="text-sm text-muted">Selected account: {account || "None yet"}</p>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Best use</h3>
          <p className="mt-2 text-sm leading-6">{current.use}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Tradeoff</h3>
          <p className="mt-2 text-sm leading-6">{current.tradeoff}</p>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted">
        This lesson uses native labeled controls and a filterable button list.
        Search and choose is not a full ARIA combobox. A production combobox
        also needs correct focus, keyboard, popup and announcement behavior.
        Keep the actual selection, permissions, and save behavior in the destination application.
      </p>
    </section>
  );
}
