import assert from "node:assert/strict";
import test from "node:test";
import type { CaptureResult } from "posthog-js";
import {
  POSTHOG_PROXY_PATH,
  posthogAssetHost,
  posthogClientOptions,
  posthogRewrites,
  posthogUiHost,
  sanitizePostHogEvent,
  shouldInitPostHog,
  stripSensitiveUrl,
  trailingSlashRedirectPath,
} from "./posthog-browser.ts";

test("PostHog stays off without a token and on local hosts", () => {
  assert.equal(
    shouldInitPostHog({ token: "", hostname: "www.byjoyaing.com" }),
    false,
  );
  assert.equal(
    shouldInitPostHog({ token: "phc_test", hostname: "localhost" }),
    false,
  );
  assert.equal(
    shouldInitPostHog({ token: "phc_test", hostname: "127.0.0.1" }),
    false,
  );
  assert.equal(
    shouldInitPostHog({ token: "phc_test", hostname: "[::1]" }),
    false,
  );
  assert.equal(
    shouldInitPostHog({ token: "phc_test", hostname: "www.byjoyaing.com" }),
    true,
  );
});

test("URL sanitizing removes query strings and hashes", () => {
  assert.equal(
    stripSensitiveUrl(
      "https://www.byjoyaing.com/contact?email=person@example.com#access",
    ),
    "https://www.byjoyaing.com/contact",
  );
  assert.equal(stripSensitiveUrl("/work?token=secret"), "/work");
});

test("events drop identify calls and contact fields", () => {
  const pageview = sanitizePostHogEvent({
    uuid: "1",
    event: "$pageview",
    properties: {
      $current_url:
        "https://www.byjoyaing.com/contact?email=person@example.com#write",
      $referrer: "https://example.com/in?q=private",
      $pathname: "/contact?email=person@example.com",
      email: "person@example.com",
      message: "hello",
    },
    $set: { name: "Pat", $browser: "Chrome" },
  } as CaptureResult);

  assert.ok(pageview);
  assert.equal(
    pageview.properties.$current_url,
    "https://www.byjoyaing.com/contact",
  );
  assert.equal(pageview.properties.$referrer, "https://example.com/in");
  assert.equal(pageview.properties.$pathname, "/contact");
  assert.equal(pageview.properties.email, undefined);
  assert.equal(pageview.properties.message, undefined);
  assert.equal(pageview.$set?.name, undefined);
  assert.equal(pageview.$set?.$browser, "Chrome");

  assert.equal(
    sanitizePostHogEvent({
      uuid: "2",
      event: "$identify",
      properties: {},
    } as CaptureResult),
    null,
  );
});

test("client options keep capture anonymous and off forms, replay, and surveys", () => {
  const options = posthogClientOptions("https://eu.i.posthog.com");
  assert.equal(options.api_host, POSTHOG_PROXY_PATH);
  assert.equal(options.ui_host, "https://eu.posthog.com");
  assert.equal(options.person_profiles, "identified_only");
  assert.equal(options.disable_session_recording, true);
  assert.equal(options.disable_surveys, true);
  assert.equal(options.capture_exceptions, false);
  assert.equal(options.advanced_disable_flags, true);
  assert.equal(options.mask_all_element_attributes, true);
  assert.deepEqual(options.autocapture, {
    element_allowlist: ["a", "button"],
    css_selector_ignorelist: [
      ".ph-no-autocapture",
      "[data-ph-no-autocapture]",
      "form",
      "input",
      "textarea",
      "select",
      "label",
    ],
  });
});

test("rewrites send static assets to the matching regional asset host", () => {
  assert.equal(
    posthogAssetHost("https://us.i.posthog.com"),
    "https://us-assets.i.posthog.com",
  );
  assert.equal(
    posthogUiHost("https://us.i.posthog.com"),
    "https://us.posthog.com",
  );
  const rewrites = posthogRewrites("https://us.i.posthog.com/");
  assert.deepEqual(
    rewrites.map((rewrite) => rewrite.source),
    [
      `${POSTHOG_PROXY_PATH}/static/:path*`,
      `${POSTHOG_PROXY_PATH}/array/:path*`,
      `${POSTHOG_PROXY_PATH}/:path*`,
    ],
  );
  assert.equal(
    rewrites[0]?.destination,
    "https://us-assets.i.posthog.com/static/:path*",
  );
  assert.equal(rewrites[2]?.destination, "https://us.i.posthog.com/:path*");
});

test("trailing slashes stay on the PostHog proxy and redirect elsewhere", () => {
  assert.equal(trailingSlashRedirectPath("/about/"), "/about");
  assert.equal(trailingSlashRedirectPath("/"), null);
  assert.equal(trailingSlashRedirectPath("/relay/e/"), null);
  assert.equal(trailingSlashRedirectPath("/relay"), null);
});
