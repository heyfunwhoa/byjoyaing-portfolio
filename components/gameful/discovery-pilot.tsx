'use client';
import { lazy, Suspense, useState } from 'react';
const Scenario = lazy(() => import('./discovery-scenario').then(module => ({ default: module.DiscoveryScenario })));
export function DiscoveryPilot() {
  const [started, setStarted] = useState(false);
  return started ? <Suspense fallback={<p role="status">Loading the practice conversation…</p>}><Scenario /></Suspense> : <button className="min-h-11 rounded-lg border px-4 py-2" onClick={() => setStarted(true)}>Start a discovery conversation</button>;
}
