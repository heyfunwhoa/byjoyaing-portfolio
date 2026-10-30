import test from "node:test";
import assert from "node:assert/strict";
import { academyConfig } from "./config.ts";
import { boundedJson, lessonHref, parseChange } from "./policy.ts";
import { handleLearning, type LearningDependencies } from "./service.ts";
import { handleLearnerAuth } from "./auth-service.ts";
const origin = "https://academy.example";
const request = (method = "GET", body?: unknown, requestOrigin = origin) =>
  new Request(`${origin}/api/academy/learning`, {
    method,
    headers: { origin: requestOrigin, "content-type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
function fixture() {
  const calls: unknown[] = [];
  const dependencies: LearningDependencies = {
    origin,
    session: async () => ({ user: { id: "alice", emailVerified: true } }),
    allow: async () => true,
    store: {
      read: async (id) => {
        calls.push(["read", id]);
        return { records: [], lastLesson: null };
      },
      change: async (id, change) => {
        calls.push(["change", id, change]);
      },
      clear: async (id) => {
        calls.push(["clear", id]);
      },
    },
  };
  return { calls, dependencies };
}
test("config fails closed, requires explicit enablement and trusted HTTPS origin", () => {
  assert.equal(academyConfig({}), null);
  const env = {
    ACADEMY_ACCOUNTS_ENABLED: "true",
    ACADEMY_DATABASE_URL: ["postgresql:", "//example.invalid/academy"].join(""),
    ACADEMY_AUTH_SECRET: "synthetic-only-not-a-secret".repeat(2),
    ACADEMY_AUTH_URL: origin,
    RESEND_API_KEY: "synthetic",
    ACADEMY_AUTH_FROM: "academy@example.invalid",
  };
  assert.ok(academyConfig(env));
  for (const patch of [
    { ACADEMY_ACCOUNTS_ENABLED: "false" },
    { ACADEMY_AUTH_SECRET: "short" },
    { ACADEMY_AUTH_URL: `${origin}/redirect` },
    { ACADEMY_AUTH_URL: "http://example.invalid" },
    { ACADEMY_DATABASE_URL: "https://example.invalid" },
  ])
    assert.equal(academyConfig({ ...env, ...patch }), null);
});
test("lesson/update allowlists reject arbitrary redirects, owner fields and unknown records", () => {
  assert.equal(lessonHref("//evil.example"), "/ai-academy");
  assert.match(
    lessonHref("what-is-ai"),
    /^\/ai-academy\?lesson=what-is-ai#academy-lesson-heading$/,
  );
  for (const value of [
    null,
    [],
    { slug: "unknown", action: "save", value: true },
    { slug: "what-is-ai", action: "save", value: true, userId: "bob" },
    { slug: "what-is-ai", action: "save", value: "yes" },
    { slug: "what-is-ai", action: "resume", value: false },
  ])
    assert.equal(parseChange(value), null);
});
test("anonymous, disabled and cross-origin requests cannot read or mutate", async () => {
  const { dependencies, calls } = fixture();
  assert.equal((await handleLearning(request(), null)).status, 503);
  dependencies.session = async () => null;
  assert.equal((await handleLearning(request(), dependencies)).status, 401);
  assert.equal(
    (
      await handleLearning(
        request("PATCH", {}, "https://evil.example"),
        dependencies,
      )
    ).status,
    403,
  );
  assert.deepEqual(calls, []);
});
test("server identity scopes every read, update and reset; payload ownership is rejected", async () => {
  const { dependencies, calls } = fixture();
  const change = { slug: "what-is-ai", action: "save", value: true };
  assert.equal(
    (
      await handleLearning(
        request("PATCH", { ...change, userId: "bob" }),
        dependencies,
      )
    ).status,
    400,
  );
  assert.deepEqual(calls, []);
  const result = await handleLearning(request("PATCH", change), dependencies);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("cache-control"), "private, no-store");
  assert.deepEqual(calls, [
    ["change", "alice", change],
    ["read", "alice"],
  ]);
  calls.length = 0;
  dependencies.session = async () => ({
    user: { id: "bob", emailVerified: true },
  });
  await handleLearning(request("DELETE"), dependencies);
  assert.deepEqual(calls, [
    ["clear", "bob"],
    ["read", "bob"],
  ]);
});
test("unverified, throttled and unavailable storage fail safely without leaking details", async () => {
  const { dependencies, calls } = fixture();
  dependencies.session = async () => ({
    user: { id: "alice", emailVerified: false },
  });
  assert.equal((await handleLearning(request(), dependencies)).status, 401);
  dependencies.session = async () => ({
    user: { id: "alice", emailVerified: true },
  });
  dependencies.allow = async () => false;
  assert.equal((await handleLearning(request(), dependencies)).status, 429);
  assert.deepEqual(calls, []);
  dependencies.allow = async () => {
    throw new Error("private database details");
  };
  const response = await handleLearning(request(), dependencies);
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /private database/);
});
test("streamed bodies are bounded without relying on Content-Length", async () => {
  await assert.rejects(
    boundedJson(request("POST", { text: "x".repeat(3000) })),
  );
});
test("auth surface disallows token-generation, extra fields, callbacks and foreign origins", async () => {
  let handled = 0;
  const context = {
    config: { origin },
    allow: async () => true,
    auth: {
      handler: async () => {
        handled++;
        return Response.json({ ok: true });
      },
    },
  };
  const call = (path: string, body: unknown, requestOrigin = origin) =>
    handleLearnerAuth(
      new Request(`${origin}/api/academy/auth${path}`, {
        method: "POST",
        headers: { origin: requestOrigin, "content-type": "application/json" },
        body: JSON.stringify(body),
      }),
      context,
    );
  assert.equal(
    (await call("/email-otp/create-verification-otp", {})).status,
    404,
  );
  assert.equal(
    (await call("/delete-user", { callbackURL: "https://evil.example" }))
      .status,
    400,
  );
  assert.equal(
    (
      await call("/sign-in/email-otp", {
        email: "alice@example.invalid",
        otp: "123456",
        userId: "bob",
      })
    ).status,
    400,
  );
  assert.equal(
    (await call("/sign-out", {}, "https://evil.example")).status,
    403,
  );
  assert.equal(handled, 0);
  assert.equal(
    (
      await call("/email-otp/send-verification-otp", {
        email: "alice@example.invalid",
        type: "sign-in",
      })
    ).status,
    200,
  );
  assert.equal(handled, 1);
});
