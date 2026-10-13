import assert from "node:assert/strict";
import test from "node:test";
import { completePageMetadata } from "./page-metadata.ts";

test("route metadata uses its own canonical, title, description and share image", () => {
  const metadata = completePageMetadata(
    {
      title: "Account intelligence",
      description: "A research workflow.",
      alternates: { languages: { en: "/en" } },
    },
    "/work/account-intelligence",
  );
  assert.equal(metadata.alternates?.canonical, "/work/account-intelligence");
  assert.deepEqual(metadata.alternates?.languages, { en: "/en" });
  assert.equal(metadata.openGraph?.title, "Account intelligence");
  assert.equal(metadata.openGraph?.description, "A research workflow.");
  assert.equal(metadata.openGraph?.url, "/work/account-intelligence");
  assert.equal(metadata.twitter?.title, "Account intelligence");
  assert.deepEqual(metadata.twitter?.images, metadata.openGraph?.images);
});

test("completing metadata preserves noindex and an absolute homepage title", () => {
  const robots = { index: false, follow: false };
  const metadata = completePageMetadata(
    { title: { absolute: "My homepage" }, robots },
    "/prototype",
  );
  assert.deepEqual(metadata.robots, robots);
  assert.deepEqual(metadata.title, { absolute: "My homepage" });
  assert.equal(metadata.openGraph?.title, "My homepage");
});
