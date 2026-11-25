import assert from "node:assert/strict";
import test from "node:test";
import { filterVercelPageview } from "./vercel-analytics.ts";

test("vercel pageviews keep reviewed routes and strip queries and hashes", () => {
  const result = filterVercelPageview({
    type: "pageview",
    url: "https://www.kristenaing.com/work?token=secret#private",
  });
  assert.deepEqual(result, {
    type: "pageview",
    url: "https://www.kristenaing.com/work",
  });
  assert.equal(JSON.stringify(result).includes("secret"), false);
  for (const url of [
    "https://www.kristenaing.com/work/private-client",
    "https://www.kristenaing.com/design-lab",
    "https://www.kristenaing.com/connect",
    "https://preview.vercel.app/work",
    "http://www.kristenaing.com/work",
    "invalid",
  ]) {
    assert.equal(filterVercelPageview({ type: "pageview", url }), null);
  }
  assert.equal(
    filterVercelPageview({
      type: "event",
      url: "https://www.kristenaing.com/contact",
    }),
    null,
  );
});

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

test("the dontcountme link stops and restarts counting for this browser", () => {
  const storage = memoryStorage();
  const page = {
    type: "pageview" as const,
    url: "https://www.kristenaing.com/work",
  };
  assert.notEqual(filterVercelPageview(page, storage), null);
  assert.equal(
    filterVercelPageview(
      {
        type: "pageview",
        url: "https://www.kristenaing.com/work?dontcountme=1",
      },
      storage,
    ),
    null,
  );
  assert.equal(filterVercelPageview(page, storage), null);
  assert.notEqual(
    filterVercelPageview(
      {
        type: "pageview",
        url: "https://www.kristenaing.com/work?dontcountme=0",
      },
      storage,
    ),
    null,
  );
  assert.notEqual(filterVercelPageview(page, storage), null);
});

test("counting continues when storage is unavailable or throws", () => {
  const page = {
    type: "pageview" as const,
    url: "https://www.kristenaing.com/work",
  };
  assert.notEqual(filterVercelPageview(page, undefined), null);
  const broken = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
    removeItem: () => {},
  };
  assert.notEqual(filterVercelPageview(page, broken), null);
});
