"use client";

import { useState } from "react";
import {
  evaluateJourneyAccess,
  identityJourneys,
  type JourneyKey,
  type JourneyStage,
} from "@/lib/builder-academy/identity-journey";

const stages: { id: JourneyStage; label: string; field: "principal" | "credential" | "permission" | "lifecycle" }[] = [
  { id: "identity", label: "1. Identity", field: "principal" },
  { id: "authentication", label: "2. Authentication", field: "credential" },
  { id: "authorization", label: "3. Authorization", field: "permission" },
  { id: "lifecycle", label: "4. Lifecycle", field: "lifecycle" },
];

export function IdentityJourneyLab() {
  const [journey, setJourney] = useState<JourneyKey>("human");
  const [stage, setStage] = useState<JourneyStage>("identity");
  const [verified, setVerified] = useState(true);
  const [granted, setGranted] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const current = identityJourneys[journey];
  const active = stages.find((item) => item.id === stage) ?? stages[0];
  const decision = evaluateJourneyAccess({
    identityVerified: verified,
    grantActive: granted,
    credentialRevoked: revoked,
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-7" aria-labelledby="journey-heading">
      <h2 id="journey-heading" className="font-display text-2xl sm:text-3xl">Follow an identity through the system</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        A fictional learning simulation — not connected to real identities, credentials, services or access.
      </p>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold">Choose who or what is acting</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(identityJourneys) as JourneyKey[]).map((key) => (
            <label key={key} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${journey === key ? "border-accent bg-background" : "border-border"}`}>
              <input type="radio" name="principal" value={key} checked={journey === key} onChange={() => {setJourney(key); setStage("identity");}} className="accent-accent" />
              {identityJourneys[key].label}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-5 text-xs text-muted">{current.channel} · {current.project}</p>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Identity journey stages">
        {stages.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={stage === id}
            onClick={() => setStage(id)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${stage === id ? "border-accent bg-background text-foreground" : "border-border text-muted hover:border-accent"}`}
          >{label}</button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-background p-5" aria-live="polite">
        <h3 className="text-lg font-semibold">{active.label}</h3>
        <p className="mt-2 leading-7 text-muted">{current[active.field]}</p>
      </div>
      <p className="mt-3 text-sm leading-6"><strong>Key idea:</strong> {current.learning}</p>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-lg font-semibold">Test a permission decision</h3>
        <p className="mt-2 text-sm leading-6 text-muted">These simplified conditions are not a production authorization engine. Change them to see why sign-in is not enough.</p>
        <div className="mt-4 grid gap-3">
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} className="h-4 w-4 accent-accent" /> Identity verified</label>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={granted} onChange={(event) => setGranted(event.target.checked)} className="h-4 w-4 accent-accent" /> Resource permission active</label>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={revoked} onChange={(event) => setRevoked(event.target.checked)} className="h-4 w-4 accent-accent" /> Credential or session revoked</label>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-4" role="status" aria-live="polite">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Simulated result</p>
          <p className="mt-1 text-lg font-semibold">{decision === "allow" ? "Allow access" : "Deny access"}</p>
          <p className="mt-1 text-sm text-muted">
            {decision === "allow" ? "The identity is verified, permission is active, and the credential is not revoked." : "Every required condition must pass. A successful login alone never guarantees access."}
          </p>
        </div>
      </div>
    </section>
  );
}
