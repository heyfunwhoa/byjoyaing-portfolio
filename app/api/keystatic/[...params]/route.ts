import {
  localEditorEnabled,
  localEditorRequestAllowed,
} from "@/lib/academy/keystatic-access";

export const runtime = "nodejs";

async function handle(request: Request) {
  if (!localEditorEnabled(process.env) || !localEditorRequestAllowed(request)) {
    return new Response(null, { status: 404 });
  }
  const [{ makeRouteHandler }, { default: config }] = await Promise.all([
    import("@keystatic/next/route-handler"),
    import("../../../../keystatic.config"),
  ]);
  const handlers = makeRouteHandler({ config });
  return request.method === "POST"
    ? handlers.POST(request)
    : handlers.GET(request);
}

export const GET = handle;
export const POST = handle;
