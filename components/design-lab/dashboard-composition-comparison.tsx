"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Team = "All teams" | "Enterprise" | "Mid-market";
type RecordRow = { id: string; month: string; team: Exclude<Team, "All teams">; meetings: number; evaluations: number };
export const dashboardFixture: readonly RecordRow[] = [
  { id: "jan-enterprise", month: "Jan", team: "Enterprise", meetings: 12, evaluations: 4 },
  { id: "feb-enterprise", month: "Feb", team: "Enterprise", meetings: 16, evaluations: 7 },
  { id: "mar-enterprise", month: "Mar", team: "Enterprise", meetings: 20, evaluations: 8 },
  { id: "jan-midmarket", month: "Jan", team: "Mid-market", meetings: 8, evaluations: 3 },
  { id: "feb-midmarket", month: "Feb", team: "Mid-market", meetings: 11, evaluations: 4 },
  { id: "mar-midmarket", month: "Mar", team: "Mid-market", meetings: 14, evaluations: 6 },
];

export function dashboardRows(team: Team, metric: "meetings" | "evaluations") {
  const filtered = dashboardFixture.filter((item) => team === "All teams" || item.team === team);
  return (["Jan", "Feb", "Mar"] as const).map((month) => ({
    month,
    value: filtered.filter((row) => row.month === month).reduce((total, row) => total + row[metric], 0),
  }));
}

export function DashboardCompositionComparison() {
  const headingId = useId();
  const selectId = useId();
  const [team, setTeam] = useState<Team>("All teams");
  const [metric, setMetric] = useState<"meetings" | "evaluations">("meetings");
  const [view, setView] = useState<"chart" | "table">("chart");
  const [showContext, setShowContext] = useState(true);
  const monthly = useMemo(() => dashboardRows(team, metric), [team, metric]);
  const total = monthly.reduce((sum, row) => sum + row.value, 0);
  const max = Math.max(1, ...monthly.map((row) => row.value));
  const filtered = dashboardFixture.filter((row) => team === "All teams" || row.team === team);
  const uniqueTeams = new Set(filtered.map((row) => row.team)).size;

  return (
    <section aria-labelledby={headingId} className="space-y-5">
      <div>
        <p className="editorial-eyebrow text-accent">From components to complete workflows</p>
        <h2 id={headingId} className="mt-2 font-display text-2xl">Compose a useful dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Start with the user question, then combine a filter, metric summary,
          chart, and exact-value table. Change the team, metric, and view to see
          which information stays useful. All values are synthetic.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label htmlFor={selectId + "-team"} className="grid gap-2 text-sm font-medium">
            Team filter
            <select
              id={selectId + "-team"}
              value={team}
              onChange={(event) => setTeam(event.target.value as Team)}
              className="min-h-11 rounded-lg border border-border bg-background px-3"
            >
              <option>All teams</option><option>Enterprise</option><option>Mid-market</option>
            </select>
          </label>
          <label htmlFor={selectId + "-metric"} className="grid gap-2 text-sm font-medium">
            Metric
            <select
              id={selectId + "-metric"}
              value={metric}
              onChange={(event) => setMetric(event.target.value as typeof metric)}
              className="min-h-11 rounded-lg border border-border bg-background px-3"
            >
              <option value="meetings">Qualified meetings</option>
              <option value="evaluations">Evaluations started</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <div role="group" aria-label="Data presentation mode" className="flex gap-2">
            <Button type="button" aria-pressed={view === "chart"} variant={view === "chart" ? "default" : "outline"} onClick={() => setView("chart")}>Chart</Button>
            <Button type="button" aria-pressed={view === "table"} variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>Table</Button>
          </div>
          <Button type="button" variant="outline" aria-pressed={showContext} onClick={() => setShowContext((value) => !value)}>
            {showContext ? "Hide" : "Show"} context
          </Button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted">{metric === "meetings" ? "Qualified meetings" : "Evaluations started"}</p>
            <p className="mt-2 font-display text-3xl tabular-nums">{total}</p>
            <p className="mt-1 text-xs text-muted">Jan–Mar synthetic total</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted">Teams in selection</p>
            <p className="mt-2 font-display text-3xl tabular-nums">{uniqueTeams}</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted">Period</p>
            <p className="mt-2 font-display text-xl">3 months</p>
            <p className="mt-1 text-xs text-muted">Not a live date filter</p>
          </div>
        </div>
        {view === "chart" ? (
          <figure className="mt-5 rounded-lg border border-border bg-background p-4">
            <figcaption className="font-semibold">
              {metric === "meetings" ? "Qualified meetings" : "Evaluations started"} by month
            </figcaption>
            <p className="mt-1 text-xs text-muted">Bars start at zero. Values are labeled explicitly.</p>
            <ul className="mt-4 space-y-4" aria-label="Monthly chart values">
              {monthly.map((row) => (
                <li key={row.month} className="grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                  <span className="text-sm">{row.month}</span>
                  <div className="h-8 overflow-hidden rounded bg-surface-sage">
                    <div
                      className="h-full rounded bg-foreground"
                      style={{ width: (row.value / max) * 100 + "%" }}
                    />
                  </div>
                  <span className="text-right text-sm tabular-nums">{row.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              A horizontal bar chart is appropriate for comparing these discrete month totals.
              Its exact-value table is available using the Table control.
            </p>
          </figure>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-lg border border-border" role="region" tabIndex={0} aria-label="Exact monthly values table">
            <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
              <caption className="p-3 text-left text-xs text-muted">
                Exact {metric === "meetings" ? "qualified meetings" : "evaluations started"} by month, {team.toLowerCase()}
              </caption>
              <thead className="bg-surface-sage"><tr><th scope="col" className="p-3">Month</th><th scope="col" className="p-3">Value</th></tr></thead>
              <tbody>{monthly.map((row) => (
                <tr key={row.month} className="border-t border-border">
                  <th scope="row" className="p-3">{row.month}</th>
                  <td className="p-3 tabular-nums">{row.value}</td>
                </tr>
              ))}</tbody>
              <tfoot><tr className="border-t border-border font-semibold"><th scope="row" className="p-3">Total</th><td className="p-3 tabular-nums">{total}</td></tr></tfoot>
            </table>
          </div>
        )}
        {showContext && (
          <aside className="mt-4 rounded-lg border border-border p-4">
            <h3 className="font-semibold">Interpretation and limitations</h3>
            <p className="mt-2 text-sm leading-6">
              This view shows {total} {metric === "meetings" ? "qualified meetings" : "evaluations"}
              {" "}across {uniqueTeams} {uniqueTeams === 1 ? "team" : "teams"}. It is a fictional
              example, not evidence of conversion rate, revenue, or performance.
              Each total uses the same filtered source rows.
            </p>
          </aside>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Why these components together?</h3>
          <p className="mt-2 text-sm leading-6">
            The filter defines scope, the KPI communicates magnitude, the chart reveals
            relative movement, and the table gives exact values. The context note prevents
            misleading interpretation.
          </p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <h3 className="font-semibold">Apply it to your projects</h3>
          <p className="mt-2 text-sm leading-6">
            GTM Revenue OS could use the composition for campaign metrics.
            Account Signal Engine could adapt it for dated signals, but must distinguish
            observation counts from verified buying intent.
          </p>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted">
        Exercise: Choose the view you would use to answer “Which month was highest?”
        and then “What was February’s exact count?” Explain why they may require different components.
        No data is persisted or synchronized.
      </p>
    </section>
  );
}
