"use client";

import { useState } from "react";

type LabStep = { title: string; why: string; instruction: string; command?: string; expected: string; ifStuck: string };
type LabPath = "next" | "express" | "n8n";

const steps: Record<LabPath, LabStep[]> = {
  next: [
    { title: "Check your environment", why: "Next.js needs Node.js and a project.", instruction: "Open Terminal in a disposable Next.js App Router project. Check Node.js, then start the development server.", command: "node --version\nnpm run dev", expected: "Terminal shows a local address such as http://localhost:3000. Keep that window open.", ifStuck: "If node is unavailable, install supported Node.js LTS. If the project has no package.json, open the correct folder; if dependencies are missing, run npm install using the project's lockfile." },
    { title: "Create the route file", why: "The file location determines the URL.", instruction: "Create app/api/tasks/route.ts. Copy the Next.js example from the lab above into that file, then save it.", expected: "The project recognizes GET /api/tasks without a separate server project.", ifStuck: "Use app/api/... for the App Router, not pages/api/...; verify the file is named route.ts and exports GET." },
    { title: "Send a request", why: "A working API proves the browser and server can exchange structured data.", instruction: "In another Terminal tab, call the endpoint and inspect the status, headers and body.", command: "curl -i http://localhost:3000/api/tasks", expected: "HTTP 200, JSON content type, and the two synthetic tasks with IDs t1 and t2.", ifStuck: "Connection refused means the server or port may be wrong. A 404 usually means the route file path or route name is incorrect." },
    { title: "Add health and test failure", why: "Real APIs have both successful responses and error states.", instruction: "Create app/api/health/route.ts returning Response.json({ status: 'ok' }). Then test both a valid and an unknown URL.", command: "curl -i http://localhost:3000/api/health\ncurl -i http://localhost:3000/api/not-found", expected: "The health request returns JSON and HTTP 200; the unknown URL returns HTTP 404.", ifStuck: "A route file cannot be named page.tsx. Check the terminal output for syntax or compilation errors." },
  ],
  express: [
    { title: "Create an isolated project", why: "Express is a library installed into a Node.js project.", instruction: "Use a new empty folder, initialize npm, and install Express. Avoid modifying an existing production repository.", command: "mkdir api-express-lab\ncd api-express-lab\nnpm init -y\nnpm install express", expected: "You see package.json and node_modules in the lab folder.", ifStuck: "Check node --version and npm --version. Run the commands in a writable folder and inspect any npm error output." },
    { title: "Write the server", why: "Unlike a Next.js route file, you explicitly create and start the HTTP server.", instruction: "Create server.js and paste the Express example from the lab above.", expected: "The file defines GET /tasks and listens on port 3001 unless PORT is set.", ifStuck: "Check that server.js is in the directory containing package.json and that Express finished installing." },
    { title: "Run it and inspect JSON", why: "The Node.js process must be alive to accept requests.", instruction: "Start the server in one Terminal tab. Send a request from another.", command: "node server.js\n# In another Terminal tab:\ncurl -i http://localhost:3001/tasks", expected: "HTTP 200 and two JSON tasks. Terminal stays occupied while the server runs.", ifStuck: "If the port is in use, close the existing service or set PORT=3002 and retry on 3002. If Express cannot be found, run npm install express in this folder." },
    { title: "Understand 404s and lifecycle", why: "APIs need deliberate failure handling and process management.", instruction: "Request a missing path, stop the server with Ctrl+C and try the valid request again.", command: "curl -i http://localhost:3001/not-found\n# After Ctrl+C:\ncurl -i http://localhost:3001/tasks", expected: "Unknown route returns HTTP 404; after stopping, the client cannot connect. Restart node server.js to recover.", ifStuck: "If a request still works after stopping, another service may own port 3001. Inspect the port before assuming the correct program responded." },
  ],
  n8n: [
    { title: "Use your existing n8n editor", why: "The workflow engine is already your running server.", instruction: "Create a disposable inactive workflow with no external credentials or real customer records.", expected: "A draft workflow is visible in your existing n8n instance.", ifStuck: "If you cannot access the editor, do not create a paid workspace just for the lab. Review the conceptual steps first." },
    { title: "Configure the receiving endpoint", why: "The Webhook node listens for an incoming HTTP request.", instruction: "Add a Webhook node: method GET, path academy-tasks, and response mode Using Respond to Webhook Node.", expected: "n8n displays distinct test and production webhook URLs.", ifStuck: "Use the exact URL shown by the node. A production URL generally requires the workflow to be activated; start with the test URL instead." },
    { title: "Build the response", why: "Workflow nodes can construct a JSON response without a separate Express app.", instruction: "Add Edit Fields in JSON mode with the two fictional tasks from the lab above, followed by Respond to Webhook configured to return the JSON result. Connect the nodes.", expected: "The response node is connected and receives a JSON item with a tasks array.", ifStuck: "Inspect the Edit Fields output. Confirm Respond to Webhook is configured to return the object, not an empty response or plain-text expression." },
    { title: "Listen, test, and deactivate", why: "Test URLs are deliberately temporary, while production webhooks create an ongoing entry point.", instruction: "Click Listen for Test Event, call the test URL shown by n8n, inspect returned JSON, then leave the workflow inactive.", expected: "The test request returns the synthetic tasks and appears in the workflow test execution.", ifStuck: "Test listening can time out. Click Listen again; confirm the HTTP method is GET and that the URL is the test URL currently displayed." },
  ],
};

export function ApiLabWalkthrough({ path }: { path: LabPath }) {
  const [done, setDone] = useState<Record<LabPath, number[]>>({ next: [], express: [], n8n: [] });
  const [expanded, setExpanded] = useState<Record<LabPath, number>>({ next: 0, express: 0, n8n: 0 });
  const current = steps[path];
  const completed = done[path];
  const openIndex = expanded[path];
  return <section aria-labelledby="api-walkthrough" className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-7">
    <h3 id="api-walkthrough" className="font-display text-2xl">Follow the build walkthrough</h3>
    <p className="mt-2 text-sm leading-6 text-muted">Work through one step at a time. Check steps only after you have tried them. Checkmarks stay in this browser session; they do not verify that code ran on your computer.</p>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <strong className="text-sm">{completed.length} of {current.length} steps checked</strong>
      <button type="button" onClick={() => { setDone((state) => ({ ...state, [path]: [] })); setExpanded((state) => ({ ...state, [path]: 0 })); }} className="rounded-lg border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Reset this walkthrough</button>
    </div>
    <ol className="mt-5 space-y-3">{current.map((step, index) => <li key={step.title} className="rounded-lg border border-border p-4">
      <button type="button" aria-expanded={openIndex === index} onClick={() => setExpanded((state) => ({ ...state, [path]: index }))} className="flex w-full items-center justify-between gap-4 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span>Step {index + 1}: {step.title}</span><span className="text-xs text-muted">{completed.includes(index) ? "Checked" : openIndex === index ? "Open" : "View"}</span>
      </button>
      {openIndex === index && <div className="mt-4 space-y-3 text-sm leading-7">
        <p className="text-muted"><strong>Why:</strong> {step.why}</p>
        <p><strong>Do:</strong> {step.instruction}</p>
        {step.command && <div><p className="font-semibold">Terminal commands (run in the stated location)</p><pre className="mt-2 overflow-x-auto rounded-lg bg-background p-3 text-xs leading-6"><code>{step.command}</code></pre></div>}
        <p><strong>Expected result:</strong> {step.expected}</p>
        <details className="rounded-lg border border-border p-3"><summary className="cursor-pointer font-semibold">Troubleshooting if it doesn't work</summary><p className="mt-2 text-muted">{step.ifStuck}</p></details>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-background p-3">
          <input type="checkbox" checked={completed.includes(index)} onChange={(event) => setDone((state) => ({ ...state, [path]: event.target.checked ? [...state[path], index] : state[path].filter((n) => n !== index) }))} className="mt-1 accent-accent" />
          <span>I tried this step and checked its expected result</span>
        </label>
        {index < current.length - 1 && <button type="button" className="rounded-lg border border-border px-3 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" onClick={() => setExpanded((state) => ({ ...state, [path]: index + 1 }))}>Next step →</button>}
      </div>}
    </li>)}</ol>
    {completed.length === current.length && <p role="status" className="mt-4 rounded-lg border border-border p-3 text-sm">All walkthrough steps checked for {path === "next" ? "Next.js" : path === "express" ? "Express" : "n8n"}. Now compare the implementation approach and complete the knowledge check.</p>}
  </section>;
}
