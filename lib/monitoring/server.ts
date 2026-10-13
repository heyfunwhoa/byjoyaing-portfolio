import { PostHog } from "posthog-node";
import { randomUUID } from "node:crypto";
import {
  createErrorBudget,
  monitoringEnabled,
  sanitizeExceptionProperties,
} from "./privacy.ts";

const allowError = createErrorBudget();

export async function reportServerError(error: unknown) {
  if (
    !monitoringEnabled({
      enabled: process.env.POSTHOG_MONITORING_ENABLED,
      token: process.env.POSTHOG_PROJECT_TOKEN,
      host: process.env.POSTHOG_HOST,
      deployment: process.env.VERCEL_ENV,
      mode: process.env.NODE_ENV,
    }) ||
    !allowError()
  )
    return;

  try {
    const client = new PostHog(process.env.POSTHOG_PROJECT_TOKEN!, {
      host: process.env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
      requestTimeout: 1500,
      fetchRetryCount: 0,
      enableExceptionAutocapture: false,
      before_send: (event) =>
        event.event === "$exception"
          ? {
              ...event,
              properties: sanitizeExceptionProperties(
                event.properties,
                "server",
              ),
            }
          : null,
    });
    // Per-error identity: no users, cookies, IPs or account IDs are forwarded.
    await client.captureExceptionImmediate(error, randomUUID());
    await client.shutdown();
  } catch {
    // Preserve the original response even if PostHog is unavailable.
  }
}
