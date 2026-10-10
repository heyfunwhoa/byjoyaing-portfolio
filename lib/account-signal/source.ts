const MAX_BODY_CHARS = 50_000;
const ALLOWED_DOMAIN = "limacharlie.io";

export function canonicalSourceUrl(raw: string): URL | undefined {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:") return undefined;
  if (url.username || url.password) return undefined;
  const host = url.hostname.toLowerCase();
  const allowed = host === ALLOWED_DOMAIN || host.endsWith(`.${ALLOWED_DOMAIN}`);
  if (!allowed) return undefined;
  url.hash = "";
  url.hostname = host;
  return url;
}

export function htmlToText(html: string): string {
  const withoutActive = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  const withoutTags = withoutActive.replace(/<[^>]+>/g, " ");
  const decoded = withoutTags
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&para;/g, " ");
  return decoded.replace(/\s+/g, " ").trim();
}

export function readTitle(html: string): string | undefined {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  const title = match?.[1]?.replace(/\s+/g, " ").trim();
  return title || undefined;
}

export function readMetaDescription(html: string): string | undefined {
  const match = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*>/i,
  );
  if (!match) return undefined;
  const content = match[0].match(/content=["']([^"']*)["']/i);
  const description = content?.[1]?.replace(/\s+/g, " ").trim();
  return description || undefined;
}

export function rejectUnsafeSnapshot(body: string): string | undefined {
  if (!body.trim()) return "Source body is empty.";
  if (body.length > MAX_BODY_CHARS) return "Source body exceeds the size limit.";
  if (body.includes("\0")) return "Source body contains a null byte.";
  if (/<script\b/i.test(body) && !/<\/script>/i.test(body)) {
    return "Source body contains an unclosed script tag.";
  }
  return undefined;
}
