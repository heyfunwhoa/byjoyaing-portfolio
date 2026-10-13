/** Public request metadata only; this is not an access grant or content registry. */
const requestContexts: Record<string, string> = {
  multithreading: "Multithreading & stakeholder mapping",
  "enterprise-deal": "Strategic enterprise deal anatomy",
  "enterprise-selling": "Enterprise deal execution",
  "team-enablement": "Coaching and team development",
  "competitive-evidence": "Competitive positioning and field guidance",
};

export function resolvePlaybookRequest(value: string | string[] | undefined) {
  return typeof value === "string" && Object.hasOwn(requestContexts, value)
    ? requestContexts[value]
    : undefined;
}

export function formatWorkRequest(
  focus: string,
  note: string,
  playbook?: string,
) {
  return `Selected Work inquiry — ${playbook ? `${playbook} — ` : ""}${focus}: ${note}`;
}
