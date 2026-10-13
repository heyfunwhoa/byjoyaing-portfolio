import assert from "node:assert/strict";
import test from "node:test";
import type { CaptureResult } from "posthog-js";
import {
  posthogCapabilities,
  posthogClientOptions,
  sanitizePageview,
} from "./posthog-browser.ts";
const env = {
  token: "phc_synthetic",
  host: "https://us.i.posthog.com",
  deployment: "production",
  mode: "production",
};
const event = (name: string, properties = {}): CaptureResult => ({
  uuid: "synthetic",
  event: name,
  properties,
});

test("monitoring and analytics have independent explicit gates", () => {
  assert.deepEqual(posthogCapabilities(env), {
    monitoring: false,
    analytics: false,
  });
  assert.deepEqual(posthogCapabilities({ ...env, enabled: "true" }), {
    monitoring: true,
    analytics: false,
  });
  assert.deepEqual(posthogCapabilities({ ...env, analyticsEnabled: "true" }), {
    monitoring: false,
    analytics: true,
  });
  for (const patch of [
    { deployment: "preview" },
    { mode: "development" },
    { token: "" },
    { host: "https://untrusted.invalid" },
  ]) {
    assert.deepEqual(
      posthogCapabilities({
        ...env,
        enabled: "true",
        analyticsEnabled: "true",
        ...patch,
      }),
      { monitoring: false, analytics: false },
    );
  }
});

test("pageviews retain only reviewed routes and discard nested and person data", () => {
  const result = sanitizePageview({
    ...event("$pageview", {
      $current_url: "https://www.byjoyaing.com/work?token=secret#private",
      email: "secret",
      nested: { private: "secret" },
      $referrer: "secret",
    }),
    $set: { name: "secret" },
  });
  assert.deepEqual(result?.properties, {
    $current_url: "https://www.byjoyaing.com/work",
    $pathname: "/work",
    $process_person_profile: false,
  });
  assert.equal(JSON.stringify(result).includes("secret"), false);
  for (const url of [
    "https://www.byjoyaing.com/work/private-client",
    "https://www.byjoyaing.com/design-lab",
    "https://preview.vercel.app/work",
    "invalid",
  ]) {
    assert.equal(
      sanitizePageview(event("$pageview", { $current_url: url })),
      null,
    );
  }
  assert.equal(sanitizePageview(event("$identify")), null);
});

test("all capability combinations preserve exception privacy and reject unapproved events", () => {
  for (const monitoring of [false, true])
    for (const analytics of [false, true]) {
      const options = posthogClientOptions({
        ...env,
        enabled: String(monitoring),
        analyticsEnabled: String(analytics),
      });
      const filter = options.before_send;
      assert.equal(typeof filter, "function");
      if (typeof filter !== "function") throw new Error("Missing filter");
      assert.equal(options.capture_exceptions, monitoring);
      assert.equal(
        options.capture_pageview,
        analytics ? "history_change" : false,
      );
      assert.equal(options.autocapture, false);
      assert.equal(options.disable_persistence, true);
      assert.equal(options.person_profiles, "never");
      assert.equal(options.disable_session_recording, true);
      assert.equal(filter(event("$autocapture")), null);
      assert.equal(filter(event("$identify")), null);
      assert.equal(
        Boolean(
          filter(
            event("$pageview", { $current_url: "https://byjoyaing.com/about" }),
          ),
        ),
        analytics,
      );
      const error = filter({
        ...event("$exception", {
          message: "secret",
          $exception_list: [{ type: "TypeError", value: "secret" }],
        }),
        $set: { name: "secret" },
      });
      assert.equal(Boolean(error), monitoring);
      assert.equal(JSON.stringify(error).includes("secret"), false);
      for (let i = 0; i < 9; i++) filter(event("$exception"));
      assert.equal(filter(event("$exception")), null);
    }
});
