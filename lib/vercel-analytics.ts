import type { BeforeSendEvent } from "@vercel/analytics/next";
import { isReviewedPublicPage } from "./analytics-routes.ts";

/** Visit any page with ?dontcountme=1 to stop counting this browser; ?dontcountme=0 turns counting back on. */
export const OPT_OUT_PARAM = "dontcountme";
export const OPT_OUT_KEY = "analytics-opt-out";

type OptOutStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function browserStorage(): OptOutStorage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

/** Applies the opt-out link if present, then reports whether this browser is opted out. */
export function isOptedOut(url: URL, storage = browserStorage()): boolean {
  const value = url.searchParams.get(OPT_OUT_PARAM);
  if (value === "1" || value === "0") {
    try {
      if (value === "1") storage?.setItem(OPT_OUT_KEY, "1");
      else storage?.removeItem(OPT_OUT_KEY);
    } catch {
      // Persistence is best effort; honor the explicit choice for this pageview.
    }
    return value === "1";
  }
  try {
    return storage?.getItem(OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

/** Keep aggregate pageviews on reviewed public URLs and drop queries, hashes, and other events. */
export function filterVercelPageview(
  event: BeforeSendEvent,
  storage = browserStorage(),
): BeforeSendEvent | null {
  if (event.type !== "pageview") return null;
  try {
    const url = new URL(event.url);
    if (isOptedOut(url, storage)) return null;
    if (!isReviewedPublicPage(url)) return null;
    return { type: "pageview", url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}
