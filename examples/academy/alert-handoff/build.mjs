import { createHash } from "node:crypto";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const files = ["server.mjs", "client.mjs", "index.html"];
const output = await mkdtemp(join(tmpdir(), "academy-alert-handoff-"));
const digest = createHash("sha256");

for (const filename of files) {
  const content = await readFile(new URL(filename, import.meta.url));
  digest.update(JSON.stringify([filename, content.length]));
  digest.update(content);
  await writeFile(join(output, filename), content);
}

await writeFile(join(output, "artifact.json"), JSON.stringify({
  mode: "packaged",
  sha256: digest.digest("hex"),
  files,
}, null, 2) + "\n");

console.log(output);
