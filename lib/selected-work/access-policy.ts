/**
 * Fail-closed resource authorization core for future Selected Work pages.
 * This module only decides; it does NOT authenticate a user or retrieve files.
 * All of its inputs must come from trusted server-side auth/database lookups.
 */
export type Viewer = {
  authenticated: boolean;
  verifiedEmail: boolean;
  requestStatus: "pending" | "approved" | "denied" | "withdrawn";
};

export type ResourceGrant = {
  resourceKey: string;
  expiresAtMs: number;
  revokedAtMs: number | null;
};

export function canAccessSelectedWork(
  viewer: Viewer | null,
  resourceKey: string,
  isPublished: boolean,
  grants: readonly ResourceGrant[],
  nowMs: number,
): boolean {
  if (!viewer?.authenticated || !viewer.verifiedEmail || viewer.requestStatus !== "approved") return false;
  if (!isPublished || !resourceKey || !Number.isFinite(nowMs)) return false;
  return grants.some(
    (grant) =>
      grant.resourceKey === resourceKey &&
      Number.isFinite(grant.expiresAtMs) &&
      grant.expiresAtMs > nowMs &&
      grant.revokedAtMs === null,
  );
}
