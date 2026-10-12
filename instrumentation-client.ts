import posthog from "posthog-js";
import {
  createErrorBudget,
  monitoringEnabled,
  sanitizeExceptionProperties,
} from "./lib/monitoring/privacy";

const enabled = monitoringEnabled({
  enabled: process.env.NEXT_PUBLIC_POSTHOG_MONITORING_ENABLED,
  token: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  deployment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  mode: process.env.NODE_ENV,
});

if (enabled) {
  const allowError = createErrorBudget();
  try {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_exceptions: true,
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
        if (!event || event.event !== "$exception" || !allowError())
          return null;
        return {
          ...event,
          properties: sanitizeExceptionProperties(event.properties, "browser"),
        };
      },
    });
  } catch {
    // Monitoring must not stop hydration or application use.
  }
}
