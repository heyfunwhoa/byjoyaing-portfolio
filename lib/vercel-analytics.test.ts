import assert from "node:assert/strict";
import test from "node:test";
import { filterVercelPageview } from "./vercel-analytics.ts";

test("vercel pageviews keep reviewed routes and strip queries and hashes", () => {
  const result = filterVercelPageview({
    type: "pageview",
    url: "https://www.byjoyaing.com/work?token=secret#private",
  });
  assert.deepEqual(result, {
    type: "pageview",
    url: "https://www.byjoyaing.com/work",
  });
  assert.equal(JSON.stringify(result).includes("secret"), false);
  for (const url of [
    "https://www.byjoyaing.com/work/private-client",
    "https://www.byjoyaing.com/design-lab",
    "https://www.byjoyaing.com/connect",
    "https://preview.vercel.app/work",
    "http://www.byjoyaing.com/work",
    "invalid",
  ]) {
    assert.equal(filterVercelPageview({ type: "pageview", url }), null);
  }
  assert.equal(
    filterVercelPageview({
      type: "event",
      url: "https://www.byjoyaing.com/contact",
    }),
    null,
  );
});
