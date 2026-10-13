import type { CaptureResult, PostHogConfig } from "posthog-js";
import {
  createErrorBudget,
  monitoringEnabled,
  sanitizeExceptionProperties,
} from "./monitoring/privacy.ts";

type Environment = Parameters<typeof monitoringEnabled>[0] & {
  analyticsEnabled?: string;
};
const publicPaths = new Set([
  "/",
  "/about",
  "/work",
  "/contact",
  "/side-quests",
  "/academy",
]);

/** Both capabilities require explicit production enablement; a token alone is insufficient. */
export function posthogCapabilities(env: Environment) {
  return {
    monitoring: monitoringEnabled(env),
    analytics: monitoringEnabled({ ...env, enabled: env.analyticsEnabled }),
  };
}

/** Only reviewed public landing pages, never arbitrary slugs, queries, referrers or form data. */
export function sanitizePageview(event: CaptureResult): CaptureResult | null {
  if (event.event !== "$pageview") return null;
  try {
    const url = new URL(String(event.properties.$current_url));
    if (
      !["https://byjoyaing.com", "https://www.byjoyaing.com"].includes(
        url.origin,
      ) ||
      !publicPaths.has(url.pathname)
    )
      return null;
    return {
      uuid: event.uuid,
      event: "$pageview",
      properties: {
        $current_url: `${url.origin}${url.pathname}`,
        $pathname: url.pathname,
        $process_person_profile: false,
      },
    };
  } catch {
    return null;
  }
}

export function posthogClientOptions(env: Environment): Partial<PostHogConfig> {
  const { monitoring, analytics } = posthogCapabilities(env);
  const allowError = createErrorBudget();
  return {
    api_host: env.host,
    autocapture: false,
    capture_pageview: analytics ? "history_change" : false,
    capture_pageleave: false,
    capture_exceptions: monitoring,
    disable_session_recording: true,
    disable_persistence: true,
    persistence: "memory",
    person_profiles: "never",
    capture_performance: false,
    enable_recording_console_log: false,
    enable_heatmaps: false,
    disable_surveys: true,
    advanced_disable_feature_flags: true,
    before_send: (event) => {
      if (!event) return null;
      // Also suppress events after client-side navigation from another page.
      if (
        typeof window !== "undefined" &&
        /^\/connect(?:\/|$)/.test(window.location.pathname)
      )
        return null;
      if (event.event === "$exception") {
        if (!monitoring || !allowError()) return null;
        return {
          uuid: event.uuid,
          event: event.event,
          properties: sanitizeExceptionProperties(event.properties, "browser"),
        };
      }
      return analytics ? sanitizePageview(event) : null;
    },
  };
}
