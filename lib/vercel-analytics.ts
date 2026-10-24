import type { BeforeSendEvent } from "@vercel/analytics/next";
import { isReviewedPublicPage } from "./analytics-routes.ts";

/** Keep aggregate pageviews on reviewed public URLs and drop queries, hashes, and other events. */
export function filterVercelPageview(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  if (event.type !== "pageview") return null;
  try {
    const url = new URL(event.url);
    if (!isReviewedPublicPage(url)) return null;
    return { type: "pageview", url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}
