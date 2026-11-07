import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { pathToFileURL } from "node:url";

const files = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/client.mjs", ["client.mjs", "text/javascript; charset=utf-8"]],
]);

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

export function createLab() {
  const db = new DatabaseSync(":memory:");
  db.exec("CREATE TABLE reviews (id INTEGER PRIMARY KEY, request_key TEXT NOT NULL UNIQUE, summary TEXT NOT NULL)");
  const findReview = db.prepare("SELECT id, summary FROM reviews WHERE request_key = ?");
  const saveReview = db.prepare("INSERT INTO reviews (request_key, summary) VALUES (?, ?)");
  const listReviews = db.prepare("SELECT id, summary FROM reviews ORDER BY id");
  const versionFile = new URL("artifact.json", import.meta.url);
  let version = { mode: "source" };
  try {
    version = JSON.parse(readFileSync(versionFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  async function handle(request, response) {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'");
    const address = server.address();
    const expectedHost = "127.0.0.1:" + address.port;
    if (request.headers.host !== expectedHost ||
        (request.headers.origin && request.headers.origin !== "http://" + expectedHost)) {
      return sendJson(response, 403, { error: "Use this lab through its printed local address." });
    }

    if (request.method === "GET" && files.has(request.url)) {
      const [filename, type] = files.get(request.url);
      const body = readFileSync(new URL(filename, import.meta.url));
      response.writeHead(200, { "Content-Type": type });
      return response.end(body);
    }
    if (request.method === "GET" && request.url === "/version") {
      return sendJson(response, 200, version);
    }
    if (request.method === "GET" && request.url === "/api/review-requests") {
      return sendJson(response, 200, listReviews.all());
    }
    if (request.method !== "POST" || request.url !== "/api/review-requests") {
      return sendJson(response, 404, { error: "Unknown route." });
    }
    if (request.headers["content-type"] !== "application/json") {
      return sendJson(response, 415, { error: "Use a JSON request." });
    }
    const key = request.headers["idempotency-key"];
    if (typeof key !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(key)) {
      return sendJson(response, 400, { error: "Use a valid request key." });
    }

    const chunks = [];
    let length = 0;
    for await (const chunk of request.iterator({ destroyOnReturn: false })) {
      length += chunk.length;
      if (length > 4096) {
        response.setHeader("Connection", "close");
        return sendJson(response, 413, { error: "The request is too large." });
      }
      chunks.push(chunk);
    }

    let payload;
    try {
      payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return sendJson(response, 400, { error: "Check the JSON format." });
    }
    const summary = typeof payload?.summary === "string" ? payload.summary.trim() : "";
    if (!summary || summary.length > 240) {
      return sendJson(response, 400, { error: "Enter a summary of 1 to 240 characters." });
    }

    const existing = findReview.get(key);
    if (existing) {
      if (existing.summary !== summary) {
        return sendJson(response, 409, { error: "This key already belongs to another summary." });
      }
      return sendJson(response, 200, { id: existing.id, reused: true });
    }

    // The synchronous lookup and insert have no await between them. SQLite also enforces uniqueness.
    const { lastInsertRowid: id } = saveReview.run(key, summary);
    if (request.headers["x-lab-drop-response"] === "1") {
      return response.destroy();
    }
    return sendJson(response, 201, { id, reused: false });
  }

  const server = createServer((request, response) => {
    handle(request, response).catch(() => {
      if (!response.headersSent && !response.destroyed) {
        sendJson(response, 500, { error: "The lab could not confirm the request." });
      }
    });
  });
  server.on("close", () => db.close());
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.argv[2] ?? 4310);
  createLab().listen(port, "127.0.0.1", function () {
    console.log("Open http://127.0.0.1:" + this.address().port);
  });
}
