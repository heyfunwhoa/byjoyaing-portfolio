"use client";

import { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/** Storybook-only synthetic UI proofs. No runtime packages or app routes. */
function ValidatedFormDemo() {
  const id = useId();
  const [account, setAccount] = useState("");
  const [stage, setStage] = useState("Research");
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && account.trim().length < 3;
  const valid = submitted && !invalid;

  return (
    <section className="mx-auto w-full max-w-xl rounded-xl border border-border bg-card p-5">
      <p className="editorial-eyebrow text-accent">No-dependency baseline · Forms</p>
      <h2 className="mt-2 text-xl font-semibold">Review a synthetic account</h2>
      <p className="mt-2 text-sm text-muted">
        Preview validation and confirmation without storing or sending any data.
      </p>
      <form
        noValidate
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-2">
          <label htmlFor={id + "-account"} className="text-sm font-medium">
            Account name
          </label>
          <input
            id={id + "-account"}
            type="text"
            value={account}
            aria-invalid={invalid}
            aria-describedby={invalid ? id + "-error" : undefined}
            onChange={(event) => {
              setAccount(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Example Organization"
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3"
          />
          {invalid ? (
            <p id={id + "-error"} role="alert" className="text-sm text-accent">
              Enter at least three characters before reviewing.
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <label htmlFor={id + "-stage"} className="text-sm font-medium">
            Review stage
          </label>
          <select
            id={id + "-stage"}
            className="min-h-11 w-full rounded-lg border border-border bg-card px-3"
            value={stage}
            onChange={(event) => {
              setStage(event.target.value);
              setSubmitted(false);
            }}
          >
            <option>Research</option>
            <option>Evidence review</option>
            <option>Ready for approval</option>
          </select>
        </div>
        <button type="submit" className="min-h-11 rounded-lg bg-foreground px-4 text-background">
          Validate sample
        </button>
      </form>
      {valid ? (
        <p role="status" className="mt-4 rounded-lg border border-border p-3 text-sm">
          Preview validated: {account.trim()} is in {stage}. No record was saved.
        </p>
      ) : null}
    </section>
  );
}

type DemoRow = { id: string; account: string; evidence: number; state: string };
const sampleRows: DemoRow[] = [
  { id: "r1", account: "Acorn Demo", evidence: 2, state: "Needs review" },
  { id: "r2", account: "Birch Demo", evidence: 5, state: "Ready for review" },
  { id: "r3", account: "Cedar Demo", evidence: 0, state: "No evidence" },
];

function ReviewTableDemo() {
  const [search, setSearch] = useState("");
  const [descending, setDescending] = useState(false);
  const filtered = sampleRows
    .filter((row) => row.account.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) =>
      descending ? b.account.localeCompare(a.account) : a.account.localeCompare(b.account),
    );
  return (
    <section className="mx-auto w-full max-w-3xl">
      <p className="editorial-eyebrow text-accent">No-dependency baseline · Data</p>
      <h2 className="mt-2 text-xl font-semibold">Research evidence review</h2>
      <p className="mt-2 text-sm text-muted">
        Use a semantic table until sorting, filtering and selection needs justify TanStack Table.
      </p>
      <label className="mt-4 grid gap-2 text-sm font-medium">
        Search demo accounts
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-card px-3"
        />
      </label>
      <p role="status" className="my-3 text-xs text-muted">
        {filtered.length} synthetic accounts
      </p>
      {filtered.length ? (
        <div
          role="region"
          aria-label="Research review table"
          tabIndex={0}
          className="w-full overflow-x-auto rounded-xl border border-border"
        >
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="p-3 text-left text-xs text-muted">
              Fictional account evidence, not buying intent or verified intelligence
            </caption>
            <thead className="bg-surface-sage">
              <tr>
                <th scope="col" aria-sort={descending ? "descending" : "ascending"} className="p-3">
                  <button
                    type="button"
                    className="min-h-11 underline"
                    onClick={() => setDescending((current) => !current)}
                  >
                    Account {descending ? "descending" : "ascending"}
                  </button>
                </th>
                <th scope="col" className="p-3">Evidence items</th>
                <th scope="col" className="p-3">Review state</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  <th scope="row" className="p-3 font-semibold">{row.account}</th>
                  <td className="p-3">{row.evidence}</td>
                  <td className="p-3">{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-lg border border-border p-4 text-sm">
          No matching accounts. Clear the search to see the complete sample.
        </p>
      )}
    </section>
  );
}

const scenarios = [
  { name: "Conservative", arr: 6 },
  { name: "Base", arr: 8 },
  { name: "Stretch", arr: 10 },
] as const;

function ScenarioChartDemo() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="editorial-eyebrow text-accent">No-dependency baseline · Charts</p>
      <h2 className="mt-2 text-xl font-semibold">Scenario comparison</h2>
      <p className="mt-2 text-sm text-muted">
        Illustrative new-business ARR in USD millions. Not a forecast for a real company.
      </p>
      <figure className="mt-5 grid gap-4">
        {scenarios.map((scenario) => (
          <div key={scenario.name} className="grid gap-2">
            <div className="flex justify-between gap-3 text-sm">
              <span>{scenario.name}</span>
              <strong>{"$" + scenario.arr + "M"}</strong>
            </div>
            <div aria-hidden="true" className="h-3 w-full rounded-full bg-surface-sage">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: String(scenario.arr * 10) + "%" }}
              />
            </div>
          </div>
        ))}
        <figcaption className="text-xs text-muted">
          Bars share a zero baseline and the same $10M maximum. Exact values follow.
        </figcaption>
      </figure>
      <table className="mt-5 w-full border-collapse text-left text-sm">
        <caption className="pb-2 text-left text-xs text-muted">
          Exact synthetic scenario values
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-2">Scenario</th>
            <th scope="col" className="py-2 text-right">New ARR (USD)</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.name} className="border-b border-border">
              <th scope="row" className="py-2">{scenario.name}</th>
              <td className="py-2 text-right">{"$" + scenario.arr + ",000,000"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const meta = {
  title: "Design Lab/No Cost Baselines",
  component: ValidatedFormDemo,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ValidatedFormDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ValidatedForm: Story = {};
export const ReviewTable: Story = { render: () => <ReviewTableDemo /> };
export const ScenarioChart: Story = { render: () => <ScenarioChartDemo /> };
