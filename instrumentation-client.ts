import posthog from "posthog-js";
import {
  posthogCapabilities,
  posthogClientOptions,
} from "./lib/posthog-browser";

const env = {
  enabled: process.env.NEXT_PUBLIC_POSTHOG_MONITORING_ENABLED,
  analyticsEnabled: process.env.NEXT_PUBLIC_POSTHOG_ANALYTICS_ENABLED,
  token: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  deployment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  mode: process.env.NODE_ENV,
};
const capabilities = posthogCapabilities(env);
const isConnectionPage =
  window.location.pathname.replace(/\/+$/, "") === "/connect";
if (!isConnectionPage && (capabilities.monitoring || capabilities.analytics)) {
  try {
    posthog.init(env.token!, posthogClientOptions(env));
  } catch {
    // Telemetry must not stop hydration or application use.
  }
}
