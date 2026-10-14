import { makeRouteHandler } from "@keystatic/next/route-handler";
import { keystaticLocalEnabled } from "@/lib/keystatic-local";
import config from "../../../../keystatic.config";

export const dynamic = "force-dynamic";

const handler = makeRouteHandler({ config });

function disabled() {
  return new Response(null, { status: 404 });
}

export function GET(request: Request) {
  if (!keystaticLocalEnabled()) return disabled();
  return handler.GET(request);
}

export function POST(request: Request) {
  if (!keystaticLocalEnabled()) return disabled();
  return handler.POST(request);
}
