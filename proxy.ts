import { trailingSlashRedirectPath } from "@/lib/posthog-browser";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const redirectPath = trailingSlashRedirectPath(request.nextUrl.pathname);
  if (!redirectPath) return NextResponse.next();

  // Next's own URL type adds the trailing slash back when pathname is assigned.
  const url = new URL(request.url);
  url.pathname = redirectPath;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
