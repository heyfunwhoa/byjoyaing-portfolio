"use client";

import {
  capabilityRows,
  changeCategories,
  demoChange,
  discoveryQuestions,
  guidance,
  hypothesis,
  providers,
  starterObservation,
  type ChangeCategory,
  type Observation,
} from "@/lib/competitive-intelligence-demo";
import { useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";

const stages = [
  { id: "landscape", label: "Competitive landscape" },
  { id: "change", label: "Change detection" },
  { id: "impact", label: "Impact analysis" },
  { id: "brief", label: "Competitive brief" },
  { id: "feedback", label: "Field feedback" },
] as const;

const briefTabs = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "questions", label: "Discovery questions" },
  { id: "evidence", label: "Evidence" },
  { id: "field", label: "Field feedback" },
] as const;

type StageId = (typeof stages)[number]["id"];
type BriefTab = (typeof briefTabs)[number]["id"];

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
    <span className="inline-flex rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium">
      {children}
    </span>
  );
}

const loop = [
  "Competitive opportunity",
  "Field observation",
  "Evidence submission",
  "Internal review",
  "Approved finding",
  "Updated brief",
];

export function CompetitiveIntelligenceWorkflow() {
  const [stage, setStage] = useState<StageId>("landscape");
  const [providerId, setProviderId] = useState(providers[0].id);
  const [category, setCategory] = useState<ChangeCategory | "All">("All");
  const [changeReviewed, setChangeReviewed] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [impactReviewed, setImpactReviewed] = useState(false);
  const [briefTab, setBriefTab] = useState<BriefTab>("overview");
  const [observations, setObservations] = useState<Observation[]>([starterObservation]);
  const [opportunity, setOpportunity] = useState("");
  const [requirement, setRequirement] = useState("");
  const [observation, setObservation] = useState("");
  const [evidence, setEvidence] = useState("");
  const [update, setUpdate] = useState("");

  const provider = providers.find((item) => item.id === providerId) ?? providers[0];
  const showChange = provider.id === demoChange.providerId && (category === "All" || category === demoChange.category);
  const approved = observations.filter((item) => item.status === "Approved for this demo" && item.providerId === provider.id);

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = stages.findIndex((item) => item.id === stage);
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % stages.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + stages.length) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    const id = stages[next].id;
    setStage(id);
    document.getElementById(`ci-tab-${id}`)?.focus();
  }

  function onBriefKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = briefTabs.findIndex((item) => item.id === briefTab);
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % briefTabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + briefTabs.length) % briefTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = briefTabs.length - 1;
    else return;
    event.preventDefault();
    const id = briefTabs[next].id;
    setBriefTab(id);
    document.getElementById(`brief-tab-${id}`)?.focus();
  }

  function submitObservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!opportunity.trim() || !observation.trim() || !evidence.trim()) return;
    setObservations((current) => [
      {
        id: `local-${current.length + 1}`,
        providerId,
        opportunity: opportunity.trim(),
        requirement: requirement.trim() || "Not stated.",
        observation: observation.trim(),
        evidence: evidence.trim(),
        update: update.trim() || "No suggested update.",
        status: "Needs review",
      },
      ...current,
    ]);
    setOpportunity("");
    setRequirement("");
    setObservation("");
    setEvidence("");
    setUpdate("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <div role="tablist" aria-label="Competitive workflow" onKeyDown={onTabKeyDown} className="flex gap-2 overflow-x-auto lg:flex-col">
        {stages.map((item, index) => {
          const selected = stage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ci-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="ci-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setStage(item.id)}
              className={
                selected
                  ? "shrink-0 rounded-lg border border-accent bg-card px-3 py-3 text-left text-sm font-medium text-accent"
                  : "shrink-0 rounded-lg border border-border bg-card px-3 py-3 text-left text-sm"
              }
            >
              <span className="block text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="ci-panel" aria-labelledby={`ci-tab-${stage}`} className="min-w-0">
        {stage === "landscape" ? (
          <Frame title="Provider dashboard">
            <ul className="flex flex-col gap-3">
              {providers.map((item) => {
                const selected = item.id === provider.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setProviderId(item.id)}
                      aria-pressed={selected}
                      className={`w-full rounded-xl border bg-card p-4 text-left ${selected ? "border-accent" : "border-border"}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{item.name}</p>
                        <Pill>{item.category}</Pill>
                        <Pill>{item.monitoring}</Pill>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                      <p className="mt-2 text-xs text-muted">
                        Last reviewed {item.lastReviewed} · Brief: {item.brief} · Recent changes: {item.recentChanges}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Frame>
        ) : null}

        {stage === "change" ? (
          <Frame title="Change review">
            <div className="mb-4 flex flex-wrap gap-1" role="group" aria-label="Change category">
              {(["All", ...changeCategories] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={
                    category === item
                      ? "rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground"
                      : "rounded-full border border-border px-2.5 py-1 text-[11px] font-medium"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            {showChange ? (
              <div className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
                <div className="flex flex-wrap gap-2">
                  <Pill>{provider.name}</Pill>
                  <Pill>{demoChange.category}</Pill>
                  <Pill>{changeReviewed ? "Reviewed in this demo" : "Needs review"}</Pill>
                </div>
                <p className="mt-3">
                  <span className="font-medium">Source. </span>
                  {demoChange.sourceLabel}
                </p>
                <p className="mt-1 text-xs text-muted">{demoChange.date}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-background p-3">
                    <p className="text-xs font-medium text-muted">Previous snapshot</p>
                    <p className="mt-2">{demoChange.previous}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3">
                    <p className="text-xs font-medium text-muted">Current snapshot</p>
                    <p className="mt-2">
                      Finds, <mark className="bg-accent/15 px-0.5">verifies, and analyzes</mark> leaked credentials.
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  <span className="font-medium">Observed change. </span>
                  {demoChange.detected}
                </p>
                <p className="mt-2 text-muted">Interpretation is on the next step. It is not part of the source text.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={demoChange.sourceUrl} target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-2 text-xs font-medium">
                    View original source
                  </a>
                  <button type="button" className="rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground" onClick={() => setChangeReviewed(true)}>
                    {changeReviewed ? "Change marked reviewed" : "Review change"}
                  </button>
                  <button type="button" className="rounded-md border border-border px-3 py-2 text-xs font-medium" onClick={() => setHistoryOpen((open) => !open)}>
                    {historyOpen ? "Hide history" : "View history"}
                  </button>
                </div>
                {historyOpen ? (
                  <p className="mt-3 text-xs leading-5 text-muted">
                    No snapshot history is stored. September 2026 is when this sample was checked against the public description. The pair above is demo text.
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border p-4 text-sm leading-6 text-muted">
                {provider.name} has no monitored change in this demo. The only before-and-after is an illustrative pair for TruffleHog, and it is not a historical vendor diff.
              </p>
            )}
          </Frame>
        ) : null}

        {stage === "impact" ? (
          <Frame title="Impact analysis">
            {provider.id === demoChange.providerId ? (
              <div className="grid gap-3 text-sm leading-6">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-medium text-muted">Observed change</p>
                  <p className="mt-2">{demoChange.detected}</p>
                  <p className="mt-3 text-xs text-muted">Supporting source: {demoChange.sourceUrl}</p>
                </div>
                <div className="rounded-xl border border-dashed border-foreground/30 p-4">
                  <p className="text-xs font-medium">Hypothesis, not a fact</p>
                  <p className="mt-2 text-muted">
                    A designed system could ask a model to draft why a change matters. This page does not call a model. The note below was written for the sample.
                  </p>
                  <p className="mt-3">{hypothesis}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p>
                    <span className="font-medium">Relevant requirement. </span>
                    Which credential types are detected, which are verified, and which are not evaluated.
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Question to validate. </span>
                    {discoveryQuestions[0]}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Suggested field guidance. </span>
                    {guidance}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    Review status: {impactReviewed ? "Marked reviewed in this demo. Not published." : "Needs a person. Not auto-approved."}
                  </p>
                  <button type="button" className="mt-3 rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground" onClick={() => setImpactReviewed(true)}>
                    {impactReviewed ? "Marked reviewed in this demo" : "Mark hypothesis reviewed"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border p-4 text-sm leading-6 text-muted">
                No impact note for {provider.name}. This demo does not invent a customer implication without a reviewed source.
              </p>
            )}
          </Frame>
        ) : null}

        {stage === "brief" ? (
          <Frame title="Competitive brief">
            {provider.brief === "None" ? (
              <p className="rounded-xl border border-dashed border-border p-4 text-sm leading-6 text-muted">
                {provider.name} has no approved brief. The landscape row is a placeholder so the set is visible. It is not a comparison and not a score.
              </p>
            ) : (
              <div>
                <div role="tablist" aria-label="Brief sections" onKeyDown={onBriefKeyDown} className="flex gap-2 overflow-x-auto">
                  {briefTabs.map((item) => {
                    const selected = briefTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        id={`brief-tab-${item.id}`}
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setBriefTab(item.id)}
                        className={
                          selected
                            ? "shrink-0 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
                            : "shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium"
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-xl border border-border bg-card p-4 text-sm leading-6" role="tabpanel" aria-labelledby={`brief-tab-${briefTab}`}>
                  {briefTab === "overview" ? (
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="mt-2 text-muted">{provider.description}</p>
                      <p className="mt-3">
                        <span className="font-medium">Customer scenario. </span>
                        A technical evaluation where someone asks whether a credential type is covered.
                      </p>
                      <p className="mt-2">
                        <span className="font-medium">Documented distinction. </span>
                        Finding a credential pattern and verifying that the credential works are separate steps. An unreviewed cell is not a gap.
                      </p>
                    </div>
                  ) : null}
                  {briefTab === "capabilities" ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[32rem] text-left text-sm">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted">
                            <th className="py-2 pr-3 font-medium">Dimension</th>
                            <th className="py-2 pr-3 font-medium">TruffleHog</th>
                            <th className="py-2 font-medium">Other providers in this demo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capabilityRows.map((row) => (
                            <tr key={row.dimension} className="border-b border-border">
                              <td className="py-2 pr-3">{row.dimension}</td>
                              <td className="py-2 pr-3 text-muted">{row.trufflehog}</td>
                              <td className="py-2 text-muted">{row.others}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-3 text-xs text-muted">No scores and no winner. Blank cells stay Not evaluated.</p>
                    </div>
                  ) : null}
                  {briefTab === "questions" ? (
                    <ul className="space-y-2">
                      {discoveryQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  ) : null}
                  {briefTab === "evidence" ? (
                    <dl className="space-y-3">
                      <div>
                        <dt className="font-medium">Source</dt>
                        <dd className="text-muted">
                          <a href={demoChange.sourceUrl} className="link-rule" target="_blank" rel="noreferrer">
                            {demoChange.sourceUrl}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium">Review date</dt>
                        <dd className="text-muted">September 2026. Checked for this portfolio sample. Not a live competitive record.</dd>
                      </div>
                      <div>
                        <dt className="font-medium">Approved finding</dt>
                        <dd className="text-muted">
                          The public project describes itself as finding, verifying, and analyzing leaked credentials. A coverage answer still has to say which types were reviewed.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium">Evidence status</dt>
                        <dd className="text-muted">Reviewed against that public description. The before-and-after on the change step is demo text, not this evidence.</dd>
                      </div>
                    </dl>
                  ) : null}
                  {briefTab === "field" ? (
                    <div>
                      {approved.length === 0 ? (
                        <p className="text-muted">No approved field note for this provider yet. Submissions stay in review until a person accepts them in the last step.</p>
                      ) : (
                        <ul className="space-y-3">
                          {approved.map((item) => (
                            <li key={item.id}>
                              <p>{item.observation}</p>
                              <p className="mt-1 text-xs text-muted">{item.status}. Local to this browser session.</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </Frame>
        ) : null}

        {stage === "feedback" ? (
          <Frame title="Field feedback">
            <ol className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {loop.map((step, index) => (
                <li key={step} className="rounded-lg border border-border bg-card px-3 py-2 text-xs leading-5">
                  <span className="text-muted">{String(index + 1).padStart(2, "0")}</span> {step}
                </li>
              ))}
            </ol>
            <form onSubmit={submitObservation} className="grid gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <label className="block">
                <span className="text-xs font-medium text-muted">Provider</span>
                <select value={providerId} onChange={(event) => setProviderId(event.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5">
                  {providers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Opportunity context</span>
                <input value={opportunity} onChange={(event) => setOpportunity(event.target.value)} required className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Observed customer requirement</span>
                <input value={requirement} onChange={(event) => setRequirement(event.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Competitive observation</span>
                <textarea value={observation} onChange={(event) => setObservation(event.target.value)} required rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Supporting evidence</span>
                <input value={evidence} onChange={(event) => setEvidence(event.target.value)} required className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Suggested update</span>
                <textarea value={update} onChange={(event) => setUpdate(event.target.value)} rows={2} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5" />
              </label>
              <button type="submit" className="w-fit rounded-md bg-accent px-3 py-2 text-xs font-medium text-accent-foreground">
                Submit for review
              </button>
              <p className="text-xs leading-5 text-muted">A submission does not become field guidance until a person approves it. This demo does not save or send it.</p>
            </form>
            <ul className="mt-4 flex flex-col gap-3">
              {observations.map((item) => {
                const name = providers.find((providerItem) => providerItem.id === item.providerId)?.name ?? item.providerId;
                return (
                  <li key={item.id} className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
                    <div className="flex flex-wrap gap-2">
                      <Pill>{name}</Pill>
                      <Pill>{item.status}</Pill>
                    </div>
                    <p className="mt-2">{item.observation}</p>
                    <p className="mt-1 text-xs text-muted">
                      {item.opportunity} · {item.evidence}
                    </p>
                    {item.status === "Needs review" ? (
                      <button
                        type="button"
                        className="mt-3 rounded-md border border-border px-3 py-2 text-xs font-medium"
                        onClick={() =>
                          setObservations((current) =>
                            current.map((entry) => (entry.id === item.id ? { ...entry, status: "Approved for this demo" } : entry)),
                          )
                        }
                      >
                        Approve for this demo
                      </button>
                    ) : (
                      <p className="mt-2 text-xs text-muted">Approved only in this browser session. It does not update a field document.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Frame>
        ) : null}
      </div>
    </div>
  );
}
