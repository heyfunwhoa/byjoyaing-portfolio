import assert from "node:assert/strict";
import test from "node:test";
import {
  createErrorBudget,
  monitoringEnabled,
  sanitizeExceptionProperties,
} from "./privacy.ts";

test("monitoring requires explicit production approval and a recognized host", () => {
  const env = {
    enabled: "true",
    token: "phc_synthetic",
    host: "https://us.i.posthog.com",
    deployment: "production",
    mode: "production",
  };
  assert.equal(monitoringEnabled(env), true);
  for (const patch of [
    { enabled: undefined },
    { token: undefined },
    { deployment: "preview" },
    { mode: "development" },
    { host: "https://unexpected.invalid" },
  ]) {
    assert.equal(monitoringEnabled({ ...env, ...patch }), false);
  }
});

test("exception payload drops private data, nested context and URL query strings", () => {
  const secret = "synthetic-secret-do-not-send";
  const output = sanitizeExceptionProperties(
    {
      $current_url: `https://example.com/private?token=${secret}`,
      email: "synthetic@example.com",
      request: { body: secret },
      $set: { secret },
      $exception_list: [
        {
          type: "TypeError",
          value: secret,
          mechanism: { data: secret },
          stacktrace: {
            frames: [
              {
                filename: `https://example.com/_next/static/chunk.js?token=${secret}`,
                lineno: 12,
                colno: 4,
                function: secret,
                pre_context: [secret],
                vars: { secret },
              },
            ],
          },
        },
      ],
    },
    "server",
  );
  const json = JSON.stringify(output);
  assert.equal(json.includes(secret), false);
  assert.equal(json.includes("example.com"), false);
  assert.equal(output.$exception_list[0].type, "TypeError");
  assert.deepEqual(output.$exception_list[0].stacktrace.frames[0], {
    filename: "chunk.js",
    lineno: 12,
    colno: 4,
  });
});

test("unknown error types and non-code filenames cannot leak strings", () => {
  const output = sanitizeExceptionProperties(
    {
      $exception_list: [
        {
          type: "private company name",
          stacktrace: { frames: [{ filename: "private customer name" }] },
        },
      ],
    },
    "browser",
  );
  assert.equal(output.$exception_list[0].type, "Error");
  assert.deepEqual(output.$exception_list[0].stacktrace.frames, [{}]);
});

test("flood protection limits errors per minute and resets", () => {
  let time = 0;
  const allow = createErrorBudget(2, () => time);
  assert.equal(allow(), true);
  assert.equal(allow(), true);
  assert.equal(allow(), false);
  time = 60_000;
  assert.equal(allow(), true);
});
