"use client";

import { Analytics } from "@vercel/analytics/next";
import { filterVercelPageview } from "@/lib/vercel-analytics";

/** Aggregate Web Analytics. The filter runs in the browser and renders nothing. */
export function VercelAnalytics() {
  return <Analytics beforeSend={filterVercelPageview} />;
}
