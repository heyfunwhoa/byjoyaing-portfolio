import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { createLab } from "./server.mjs";

async function start(t) {
  const server = createLab().listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return "http://127.0.0.1:" + server.address().port;
}

function submit(url, key, summary, headers = {}) {
  return fetch(url + "/api/review-requests", {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": key, ...headers },
    body: JSON.stringify({ summary }),
  });
}

test("serves the form and reports source mode", async (t) => {
  const url = await start(t);
  const form = await fetch(url);
  assert.match(await form.text(), /Request an alert handoff review/);
  const client = await fetch(url + "/client.mjs");
  assert.equal(client.status, 200);
  await client.text();
  assert.deepEqual(await (await fetch(url + "/version")).json(), { mode: "source" });
  const forbidden = await submit(url, "invalid-origin", "Synthetic", { origin: "https://example.com" });
  assert.equal(forbidden.status, 403);
  await forbidden.json();
});

test("keeps one record if confirmation is lost and the same request is retried", async (t) => {
  const url = await start(t);
  const summary = "Review overnight alert escalations";
  await assert.rejects(submit(url, "one-submission", summary, { "x-lab-drop-response": "1" }));
  const retry = await submit(url, "one-submission", summary, { "x-lab-drop-response": "1" });
  assert.equal(retry.status, 200);
  assert.deepEqual(await retry.json(), { id: 1, reused: true });
  assert.deepEqual(await (await fetch(url + "/api/review-requests")).json(), [{ id: 1, summary }]);
});

test("rejects invalid input and conflicting key reuse without creating extra records", async (t) => {
  const url = await start(t);
  const invalid = await submit(url, "check", " ");
  assert.equal(invalid.status, 400);
  await invalid.json();
  const first = await submit(url, "check", "Fictional review");
  assert.equal(first.status, 201);
  assert.deepEqual(await first.json(), { id: 1, reused: false });
  const conflict = await submit(url, "check", "Different review");
  assert.equal(conflict.status, 409);
  await conflict.json();
  assert.equal((await (await fetch(url + "/api/review-requests")).json()).length, 1);
});
