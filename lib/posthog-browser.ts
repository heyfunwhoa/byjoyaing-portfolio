import type { CaptureResult, PostHogConfig, Properties } from "posthog-js";

/** First-party proxy path. Avoid names blockers already know, such as /analytics. */
export const POSTHOG_PROXY_PATH = "/relay";

/** PostHog recommended client defaults for this integration. */
export const POSTHOG_DEFAULTS = "2026-05-30" as const;

const URL_PROPERTIES = ["$current_url", "$referrer", "$pathname"] as const;

const SENSITIVE_PROPERTY_KEYS = new Set([
  "$email",
  "company",
  "email",
  "message",
  "name",
  "phone",
]);

export function posthogIngestionHost(host?: string): string {
  const value = host?.trim() || "https://us.i.posthog.com";
  return value.replace(/\/$/, "");
}

export function posthogAssetHost(ingestionHost: string): string {
  if (ingestionHost.includes("eu.i.posthog.com"))
    return "https://eu-assets.i.posthog.com";
  if (ingestionHost.includes("us.i.posthog.com"))
    return "https://us-assets.i.posthog.com";
  return ingestionHost.replace(".i.posthog.com", "-assets.i.posthog.com");
}

export function posthogUiHost(ingestionHost: string): string {
  return ingestionHost.includes("eu.")
    ? "https://eu.posthog.com"
    : "https://us.posthog.com";
}

export function posthogRewrites(ingestionHost: string) {
  const host = posthogIngestionHost(ingestionHost);
  const assets = posthogAssetHost(host);
  return [
    {
      source: `${POSTHOG_PROXY_PATH}/static/:path*`,
      destination: `${assets}/static/:path*`,
    },
    {
      source: `${POSTHOG_PROXY_PATH}/array/:path*`,
      destination: `${assets}/array/:path*`,
    },
    {
      source: `${POSTHOG_PROXY_PATH}/:path*`,
      destination: `${host}/:path*`,
    },
  ];
}

export function shouldInitPostHog(input: {
  token?: string;
  hostname?: string;
}): boolean {
  if (!input.token?.trim()) return false;
  return !isLocalHostname(input.hostname ?? "");
}

export function stripSensitiveUrl(value: string): string {
  const withoutHash = value.split("#", 1)[0] ?? value;
  return withoutHash.split("?", 1)[0] ?? withoutHash;
}

export function sanitizePostHogEvent(
  event: CaptureResult,
): CaptureResult | null {
  if (event.event === "$identify") return null;

  const properties = omitSensitiveProperties(event.properties);
  for (const key of URL_PROPERTIES) {
    const value = properties[key];
    if (typeof value === "string") properties[key] = stripSensitiveUrl(value);
  }

  return {
    ...event,
    properties,
    $set: event.$set ? omitSensitiveProperties(event.$set) : event.$set,
    $set_once: event.$set_once
      ? omitSensitiveProperties(event.$set_once)
      : event.$set_once,
  };
}

/**
 * Paths other than the PostHog proxy keep the site's current no-trailing-slash URLs.
 * PostHog ingestion uses trailing slashes, so those requests stay untouched.
 */
export function trailingSlashRedirectPath(pathname: string): string | null {
  if (
    pathname === POSTHOG_PROXY_PATH ||
    pathname.startsWith(`${POSTHOG_PROXY_PATH}/`)
  )
    return null;
  if (pathname.length > 1 && pathname.endsWith("/"))
    return pathname.replace(/\/+$/, "") || "/";
  return null;
}

export function posthogClientOptions(host?: string): Partial<PostHogConfig> {
  const ingestionHost = posthogIngestionHost(host);
  return {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: posthogUiHost(ingestionHost),
    defaults: POSTHOG_DEFAULTS,
    person_profiles: "identified_only",
    capture_pageview: "history_change",
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    capture_exceptions: false,
    capture_dead_clicks: false,
    rageclick: false,
    advanced_disable_flags: true,
    mask_all_element_attributes: true,
    autocapture: {
      element_allowlist: ["a", "button"],
      css_selector_ignorelist: [
        ".ph-no-autocapture",
        "[data-ph-no-autocapture]",
        "form",
        "input",
        "textarea",
        "select",
        "label",
      ],
    },
    property_denylist: [...SENSITIVE_PROPERTY_KEYS],
    before_send: sanitizePostHogEvent,
  };
}

function omitSensitiveProperties(properties: Properties): Properties {
  const next: Properties = { ...properties };
  for (const key of Object.keys(next)) {
    if (SENSITIVE_PROPERTY_KEYS.has(key)) delete next[key];
  }
  return next;
}

function isLocalHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host === "0.0.0.0" ||
    host.endsWith(".localhost")
  );
}
