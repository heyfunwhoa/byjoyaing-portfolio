"use client";

import { useState } from "react";
import { evidenceForStage } from "@/lib/builder-academy/credential-evidence-sources";
import { detectionMethods, investigationStages, evaluateCredentialRisk, initialRiskInput, type RiskInput } from "@/lib/builder-academy/credential-risk";

export function CredentialRiskExplorer() {
  const [input, setInput] = useState<RiskInput>(initialRiskInput);
  const [step, setStep] = useState(0);
  const result = evaluateCredentialRisk(input);
  const update = <K extends keyof RiskInput>(key: K, value: RiskInput[K]) => setInput((old) => ({ ...old, [key]: value }));
  const stages = investigationStages.map((stage) => stage.label);
  const active = result.findings[step];
  const [showSources, setShowSources] = useState(true);
  const sources = evidenceForStage(active.category);
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-7" aria-labelledby="risk-title">
      <h2 id="risk-title" className="font-display text-2xl sm:text-3xl">From leaked secret to identity risk</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Synthetic example: a possible API credential is detected in a fictional repository commit. Explore how distinct detection methods, identification, verification, blast radius, investigation and remediation differ. No real credentials are used or verified.</p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Investigation stages">
        {stages.map((name, index) => (
          <button type="button" key={name} aria-pressed={step === index} onClick={() => setStep(index)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${step === index ? "border-accent bg-background font-semibold" : "border-border text-muted"}`}>
            {index + 1}. {name}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-background p-5" aria-live="polite">
        <h3 className="font-semibold">{active.category}</h3>
        <p className="mt-2 leading-6 text-muted">{active.message}</p>
      </div>
      <div className="mt-5 rounded-xl border border-border p-4">
        <button type="button" className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-semibold" aria-expanded={showSources} aria-controls="investigation-sources" onClick={() => setShowSources(!showSources)}>
          <span>Evidence sources & methods ({sources.length})</span><span aria-hidden="true">{showSources ? "−" : "+"}</span>
        </button>
        {showSources && <div id="investigation-sources" className="mt-3 grid gap-3">
          {sources.map((source) => <article key={source.id} className="rounded-lg border border-border bg-background p-4">
            <h4 className="font-semibold">{source.name}</h4>
            <p className="mt-2 text-sm"><strong>Method:</strong> {source.method}</p>
            <p className="mt-1 text-sm"><strong>Evidence:</strong> {source.establishes}</p>
            <p className="mt-1 text-sm text-muted"><strong>Limitation:</strong> {source.limitation}</p>
            <p className="mt-1 text-xs text-muted">Example: {source.example}</p>
            <a className="mt-2 inline-block text-sm text-accent underline underline-offset-4" href={source.reference} target="_blank" rel="noopener noreferrer">Read reference</a>
          </article>)}
          <p className="text-xs text-muted">Illustrative sources, not live connectors. No credential data is sent to external services.</p>
        </div>}
      </div>
      <fieldset className="mt-6 grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 text-sm font-semibold">Change the fictional evidence</legend>
        <label className="flex flex-col gap-2 text-sm">Detection technique
          <select value={input.detectionMethod} onChange={(event) => update("detectionMethod", event.target.value as RiskInput["detectionMethod"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            {(Object.keys(detectionMethods) as RiskInput["detectionMethod"][]).map((method) => <option key={method} value={method}>{detectionMethods[method].label}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">Credential validity
          <select value={input.valid} onChange={(event) => update("valid", event.target.value as RiskInput["valid"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            <option value="unknown">Unknown</option><option value="yes">Reported valid</option><option value="no">Reported invalid</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">Effective permissions
          <select value={input.privilege} onChange={(event) => update("privilege", event.target.value as RiskInput["privilege"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            <option value="unknown">Unknown</option><option value="limited">Limited</option><option value="broad">Broad</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">Reachable environment
          <select value={input.resourceReach} onChange={(event) => update("resourceReach", event.target.value as RiskInput["resourceReach"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            <option value="unknown">Unknown</option><option value="development">Development</option><option value="production">Production</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">Sensitive data reachability
          <select value={input.sensitiveDataReachable} onChange={(event) => update("sensitiveDataReachable", event.target.value as RiskInput["sensitiveDataReachable"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            <option value="unknown">Unknown</option><option value="yes">Potentially reachable</option><option value="no">No identified path</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">Observed activity
          <select value={input.unusualActivity} onChange={(event) => update("unusualActivity", event.target.value as RiskInput["unusualActivity"])} className="min-h-11 rounded-md border border-border bg-background p-2">
            <option value="unknown">Unknown</option><option value="no">No unusual activity observed</option><option value="yes">Unusual activity observed</option>
          </select>
        </label>
        <div className="flex flex-col justify-center gap-3 text-sm">
          <label className="flex items-center gap-3"><input type="checkbox" checked={input.exposed} onChange={(event) => update("exposed", event.target.checked)} /> Exposure confirmed</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={input.credentialTypeKnown} onChange={(event) => update("credentialTypeKnown", event.target.checked)} /> Credential type identified</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={input.identityOwnerKnown} onChange={(event) => update("identityOwnerKnown", event.target.checked)} /> Workload owner known</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={input.revoked} onChange={(event) => update("revoked", event.target.checked)} /> Credential revoked</label>
        </div>
      </fieldset>
      <div className="mt-6 rounded-xl border border-border bg-background p-4" role="status" aria-live="polite">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Educational triage result</p>
        <p className="mt-1 text-lg font-semibold">{result.status === "contained" ? "Credential contained — follow-up remains" : result.status === "investigate" ? "Prioritize investigation" : "Review and collect evidence"}</p>
        <p className="mt-2 text-sm text-muted">Not a production risk score, incident severity, or claim of malicious use.</p>
      </div>
      <h3 className="mt-6 font-semibold">Remediation checklist</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">{result.actions.map((action) => <li key={action}>{action}</li>)}</ol>
      <button type="button" onClick={() => {setInput(initialRiskInput);setStep(0);}} className="mt-6 min-h-11 rounded-md border border-border px-4 py-2 text-sm font-medium">Reset lab</button>
    </section>
  );
}
