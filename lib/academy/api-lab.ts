export type ApiLabSection = "concepts" | "styles" | "build" | "check";

export const apiVocabulary = [
  { name: "API", meaning: "An agreed interface that lets software request data or actions." },
  { name: "Endpoint", meaning: "A specific URL or operation exposed through an API." },
  { name: "HTTP", meaning: "The request and response protocol commonly used by web APIs." },
  { name: "JSON", meaning: "A structured text format often returned by APIs." },
  { name: "SDK", meaning: "A Software Development Kit: libraries, helpers, types, documentation or tools that make building with an API easier." },
  { name: "Framework", meaning: "A toolkit and conventions used to organize an app, such as Express or Next.js." },
  { name: "Runtime", meaning: "The environment that executes code, such as Node.js running JavaScript." },
] as const;

export const apiStyles = [
  { name: "REST", meaning: "Work with resources using HTTP methods.", example: "GET /accounts/123", fit: "Most standard app and CRM integrations" },
  { name: "GraphQL", meaning: "Ask for the fields you need from a typed schema.", example: "account { name contacts { name } }", fit: "Complex connected data across clients" },
  { name: "Webhook", meaning: "Another service sends your endpoint a notification about an event.", example: "Meeting ended → review workflow", fit: "Integration automations and events" },
  { name: "WebSocket", meaning: "Maintain a two-way, persistent connection.", example: "Live transcript ↔ coaching prompts", fit: "Bidirectional realtime interaction" },
  { name: "SSE", meaning: "Stream updates from a server to a client over HTTP.", example: "AI response appears progressively", fit: "One-way server-to-client updates" },
  { name: "gRPC", meaning: "Call typed remote procedures, commonly using Protocol Buffers.", example: "Worker calls inference service", fit: "Service-to-service communication" },
  { name: "RPC / JSON-RPC", meaning: "Invoke a named action on a remote system.", example: "calculateForecast({...})", fit: "Action-oriented remote functions" },
  { name: "SOAP", meaning: "Exchange structured XML messages with defined contracts.", example: "Enterprise system integration", fit: "Some legacy enterprise systems" },
] as const;

export const apiImplementations = [
  {
    id: "next", label: "Next.js", where: "Inside an existing web application", path: "app/api/tasks/route.ts",
    run: "npm run dev", url: "http://localhost:3000/api/tasks",
    description: "The framework turns a route file into an HTTP endpoint; no separate server project needed.",
    code: `export async function GET() {
  return Response.json({
    tasks: [
      { id: "t1", title: "Learn an API" },
      { id: "t2", title: "Compare deployments" }
    ]
  });
}`,
  },
  {
    id: "express", label: "Express / Node.js", where: "A standalone server process", path: "server.js",
    run: "npm init -y && npm install express && node server.js", url: "http://localhost:3001/tasks",
    description: "Express matches each request to JavaScript you wrote. The Node.js process must be running.",
    code: `const express = require("express");
const app = express();
app.get("/tasks", (_req, res) => {
  res.json({
    tasks: [
      { id: "t1", title: "Learn an API" },
      { id: "t2", title: "Compare deployments" }
    ]
  });
});
app.listen(Number(process.env.PORT || 3001), "0.0.0.0");`,
  },
  {
    id: "n8n", label: "n8n", where: "In an existing authorized workflow editor", path: "Webhook → Edit Fields → Respond to Webhook",
    run: "Listen for Test Event, then call the test URL shown by n8n", url: "Generated /webhook-test/academy-tasks URL",
    description: "A GET Webhook receives the request. Edit Fields produces the two sample tasks, and Respond to Webhook returns JSON. No standalone Node.js server is written.",
    code: `Webhook: GET /academy-tasks
  ↓
Edit Fields (JSON output):
{"tasks":[{"id":"t1","title":"Learn an API"},
          {"id":"t2","title":"Compare deployments"}]}
  ↓
Respond to Webhook: JSON result`,
  },
] as const;

export const apiLabQuestions = [
  { question: "What does an SDK usually help a developer do?", choices: ["Use an existing API with helper code", "Replace all APIs", "Provide electricity to a server"], correct: 0, feedback: "An SDK makes it easier to build with an API. The API remains the underlying interface." },
  { question: "Your app needs live two-way sales-call messages. What is a natural option?", choices: ["SOAP only", "WebSocket", "A static image"], correct: 1, feedback: "WebSockets allow ongoing bidirectional messages. REST can still handle ordinary account retrieval." },
  { question: "Which pattern notifies n8n when an external meeting ends?", choices: ["Webhook", "CSS", "A database index"], correct: 0, feedback: "A webhook delivers an event to your receiving endpoint. Validate authenticity and handle retries." },
  { question: "What is the main difference among Next.js, Express and n8n in this lab?", choices: ["They return different customer data", "They create the same synthetic response through different implementation approaches", "Only one uses HTTP"], correct: 1, feedback: "The response has the same meaning, but the route, execution environment and implementation differ." },
] as const;

export function scoreApiLab(answers: Record<number, number>) {
  return {
    answered: apiLabQuestions.filter((_, i) => answers[i] !== undefined).length,
    correct: apiLabQuestions.filter((q, i) => answers[i] === q.correct).length,
    total: apiLabQuestions.length,
  };
}
