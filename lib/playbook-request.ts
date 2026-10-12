/** Public request metadata only; this is not an access grant or content registry. */
export function resolvePlaybookRequest(value: string | string[] | undefined) {
  return value === "multithreading"
    ? "Multithreading & stakeholder mapping"
    : undefined;
}

export function formatWorkRequest(
  focus: string,
  note: string,
  playbook?: string,
) {
  return `Selected Work inquiry — ${playbook ? `${playbook} — ` : ""}${focus}: ${note}`;
}
