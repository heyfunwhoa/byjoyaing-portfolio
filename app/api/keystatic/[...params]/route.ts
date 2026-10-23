import {
  keystaticMode,
  localEditorEnabled,
  localEditorRequestAllowed,
  privateNoStore,
} from "@/lib/academy/keystatic-access";

export const runtime = "nodejs";

async function handle(request: Request) {
  const mode = keystaticMode(process.env);
  if (
    !mode ||
    (mode === "local" &&
      (!localEditorEnabled(process.env) || !localEditorRequestAllowed(request)))
  ) {
    return new Response(null, { status: 404 });
  }
  const [{ makeRouteHandler }, { default: config }] = await Promise.all([
    import("@keystatic/next/route-handler"),
    import("../../../../keystatic.config"),
  ]);
  const handlers = makeRouteHandler({ config });
  const response =
    request.method === "POST" ? handlers.POST(request) : handlers.GET(request);
  return privateNoStore(await response);
}

export const GET = handle;
export const POST = handle;
