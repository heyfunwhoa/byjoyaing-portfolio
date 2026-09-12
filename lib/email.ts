import { Resend } from "resend";

export const EMAIL_MAX = {
  name: 80,
  email: 120,
  company: 120,
  message: 2000,
  note: 1000,
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isConfiguredApiKey(value: string | undefined) {
  return Boolean(value && value !== "re_xxxxxxxxx" && value.startsWith("re_"));
}

export function getMailConfig() {
  const rawKey = process.env.RESEND_API_KEY;
  const apiKey = isConfiguredApiKey(rawKey) ? rawKey : undefined;
  const inbox = process.env.CONTACT_INBOX ?? process.env.RESUME_INBOX;
  const from =
    process.env.RESEND_FROM ?? "Kristen Joy Aing <onboarding@resend.dev>";

  return { apiKey, inbox, from };
}

export function missingMailConfigResponse() {
  return Response.json(
    {
      error:
        "Email is not configured yet. Email kristen.aing@gmail.com instead.",
    },
    { status: 503 },
  );
}

export function createResend(apiKey: string) {
  return new Resend(apiKey);
}

const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 1000 * 60 * 60 * 2;
const PER_IP_WINDOW_MS = 1000 * 60 * 60;
const PER_IP_MAX = 5;
const PER_EMAIL_WINDOW_MS = 1000 * 60 * 60 * 24;
const PER_EMAIL_MAX = 3;

type Bucket = { count: number; resetAt: number };

const ipHits = new Map<string, Bucket>();
const emailHits = new Map<string, Bucket>();

function prune(map: Map<string, Bucket>) {
  const now = Date.now();
  for (const [key, bucket] of map) {
    if (bucket.resetAt <= now) map.delete(key);
  }
}

function limited(
  map: Map<string, Bucket>,
  key: string,
  max: number,
  windowMs: number,
) {
  prune(map);
  const now = Date.now();
  const existing = map.get(key);
  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (existing.count >= max) return true;
  existing.count += 1;
  return false;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function honeypotFilled(record: Record<string, unknown>) {
  return typeof record.website === "string" && record.website.trim().length > 0;
}

function timingLooksAutomated(record: Record<string, unknown>) {
  const started =
    typeof record.startedAt === "number"
      ? record.startedAt
      : Number(record.startedAt);
  if (!Number.isFinite(started)) return true;
  const elapsed = Date.now() - started;
  return elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS;
}

export function rejectIfBot(request: Request, record: Record<string, unknown>) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request." }, { status: 403 });
  }
  if (honeypotFilled(record)) {
    return Response.json({ ok: true });
  }
  if (timingLooksAutomated(record)) {
    return Response.json(
      { error: "Please wait a moment and try again." },
      { status: 400 },
    );
  }
  return null;
}

export function rejectIfRateLimited(request: Request, email: string) {
  if (
    limited(ipHits, clientIp(request), PER_IP_MAX, PER_IP_WINDOW_MS) ||
    limited(
      emailHits,
      email.toLowerCase(),
      PER_EMAIL_MAX,
      PER_EMAIL_WINDOW_MS,
    )
  ) {
    return Response.json(
      {
        error: "Too many requests. Email kristen.aing@gmail.com instead.",
      },
      { status: 429 },
    );
  }
  return null;
}
