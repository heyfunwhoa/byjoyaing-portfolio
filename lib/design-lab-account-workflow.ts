/** Synthetic educational fixture. No customer or CRM records. */
export type WorkbenchAccount = {
  id: string;
  name: string;
  segment: "Enterprise" | "Mid-market";
  signals: number;
  evidence: string;
  observedOn: string;
  status: "Observed" | "Unknown";
};

export const accountWorkbenchFixture: readonly WorkbenchAccount[] = [
  { id: "northstar", name: "Northstar Security", segment: "Enterprise", signals: 3, evidence: "Example service expansion announcement", observedOn: "2026-11-04", status: "Observed" },
  { id: "horizon", name: "Horizon Networks", segment: "Mid-market", signals: 1, evidence: "Example hiring announcement", observedOn: "2026-11-05", status: "Observed" },
  { id: "lumen", name: "Lumen Data", segment: "Enterprise", signals: 0, evidence: "No supported evidence in the fixture", observedOn: "Unknown", status: "Unknown" },
  { id: "summit", name: "Summit Systems", segment: "Mid-market", signals: 2, evidence: "Example operational investment news", observedOn: "2026-11-06", status: "Observed" },
];

export function visibleWorkbenchAccounts(query: string, segment: "All" | WorkbenchAccount["segment"]) {
  const term = query.trim().toLowerCase();
  return accountWorkbenchFixture.filter((account) =>
    (segment === "All" || account.segment === segment) &&
    (account.name.toLowerCase().includes(term) || account.evidence.toLowerCase().includes(term)),
  );
}

export function workbenchExportPreview(ids: readonly string[]) {
  const selected = new Set(ids);
  return accountWorkbenchFixture.filter((account) => selected.has(account.id)).map(({ id, name, segment, signals, status, observedOn }) => ({
    id, name, segment, signals, status, observedOn,
  }));
}
