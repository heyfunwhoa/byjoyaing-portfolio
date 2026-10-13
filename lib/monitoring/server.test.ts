import assert from "node:assert/strict";
import test from "node:test";
import { gunzipSync } from "node:zlib";
import { reportServerError } from "./server.ts";

const keys = [
  "POSTHOG_MONITORING_ENABLED",
  "POSTHOG_PROJECT_TOKEN",
  "POSTHOG_HOST",
  "VERCEL_ENV",
  "NODE_ENV",
] as const;

test("disabled monitoring makes no network requests", async () => {
  const saved = process.env.POSTHOG_MONITORING_ENABLED;
  const original = globalThis.fetch;
  let calls = 0;
  try {
    delete process.env.POSTHOG_MONITORING_ENABLED;
    globalThis.fetch = async () => {
      calls++;
      throw new Error("Unexpected network");
    };
    await reportServerError(new Error("synthetic private text"));
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = original;
    if (saved === undefined) delete process.env.POSTHOG_MONITORING_ENABLED;
    else process.env.POSTHOG_MONITORING_ENABLED = saved;
  }
});

test("actual SDK transport is redacted and transport failure does not escape", async () => {
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const original = globalThis.fetch;
  const bodies: string[] = [];
  try {
    Object.assign(process.env, {
      POSTHOG_MONITORING_ENABLED: "true",
      POSTHOG_PROJECT_TOKEN: "phc_synthetic",
      POSTHOG_HOST: "https://us.i.posthog.com",
      VERCEL_ENV: "production",
      NODE_ENV: "production",
    });
    globalThis.fetch = async (_url, init) => {
      const body = init?.body;
      bodies.push(
        body instanceof Uint8Array
          ? gunzipSync(body).toString("utf8")
          : String(body),
      );
      return new Response("{}", { status: 200 });
    };
    const error = new TypeError("synthetic-secret-do-not-send");
    error.stack =
      "TypeError: synthetic-secret-do-not-send\n    at action (/private/customer/handler.ts:12:4)";
    await reportServerError(error);
    assert.ok(bodies.length > 0);
    const payload = bodies.join("");
    assert.equal(payload.includes("synthetic-secret-do-not-send"), false);
    assert.equal(payload.includes("/private/customer"), false);
    assert.ok(payload.includes("handler.ts"));
    globalThis.fetch = async () => {
      throw new Error("Synthetic outage");
    };
    await assert.doesNotReject(reportServerError(error));
  } finally {
    globalThis.fetch = original;
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else
        (process.env as Record<string, string | undefined>)[key] = saved[key];
    }
  }
});
