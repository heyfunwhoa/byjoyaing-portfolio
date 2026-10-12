import { posthogClientOptions, shouldInitPostHog } from "@/lib/posthog-browser";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token && shouldInitPostHog({ token, hostname: window.location.hostname })) {
  void import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(
        token,
        posthogClientOptions(process.env.NEXT_PUBLIC_POSTHOG_HOST),
      );
    })
    .catch((error: unknown) => {
      console.error("PostHog init failed", error);
    });
}
