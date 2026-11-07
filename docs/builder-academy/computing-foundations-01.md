# How computers, programs and the internet fit together

**Builder Academy · Foundations · Orientation / Beginner · 30–40 minutes**

**Lesson ID:** `computing-foundations-01`  
**Status:** Draft companion guide for review. This file does not by itself register a lesson or prove publication.  
**Prerequisites:** None.  
**Learning pathway:** Foundations F0 → F1 → F2 → `reading-code-and-yaml` → programming → frontend/backend → APIs → AI models → tools/agents.  
**Audience:** Someone who has used websites and applications but wants to understand what runs where before building AI agents.

## What you will be able to do

1. Explain hardware, an operating system, a program and a process in everyday language.
2. Distinguish a browser from a web server and your local computer from a remote/cloud machine.
3. Trace one request through DNS, HTTPS, application logic and saved data.
4. Explain where a future AI model or tool-using agent could fit into an ordinary app.
5. Demonstrate the basics using a safe, local, no-account exercise.

## Start with a familiar story

Imagine opening a fictional account research dashboard. The screen is the **frontend**, but the entire system is not sitting inside the page. Some work happens in your browser, some on a server, and information may be saved to a database.

A useful mental model is: **machine → operating system → running program → communication → other services → saved data.**

- **Hardware:** physical components. The CPU executes instructions, RAM holds working information temporarily and storage retains files between sessions. A GPU accelerates certain parallel workloads, including many AI computations.
- **Operating system:** software such as macOS, Windows or Linux that manages hardware resources, processes, files and permissions.
- **Program:** instructions packaged as an application or command. **Process:** a running instance of a program. A program may start multiple processes or threads.
- **Runtime:** the environment that executes code. For example, Node.js can run JavaScript outside a browser.
- **Binary:** data represented as bytes; executable binaries are a particular type. Not every binary file is executable.
- **Terminal and shell:** a text interface and command interpreter used to request operations from the operating system.
- **Local:** running on your machine. **Remote/cloud:** running on a machine accessed over a network, usually operated by a hosting provider or organization.

### Trace a request

```text
You open https://example.com
        |
Your browser asks DNS for a destination address
        |
Browser establishes an HTTPS connection
        |
Server or CDN responds with page resources
        |
Browser renders the frontend
        |
Frontend may call a backend API
        |
Backend validates permissions and inputs
        |
Backend reads/writes a database (when needed)
        |
Browser shows the response
```

A real architecture can vary: static sites may have no dynamic backend; servers may call other services; a CDN may serve resources directly. This is a common teaching path, not a mandatory topology.

### What changes when AI is added?

A model is a computational system that processes inputs and produces predictions or generated outputs. An AI-powered application may call a model API through its backend. An **agent** is additional software that manages a goal, state and authorized tool use around a model. The model does not automatically own a browser, a database, credentials or permission to take actions.

```text
Browser → Application backend → Model API
                 |                 |
                 |                 └─ AI output, to validate and review
                 |
                 ├─ Existing business rules + database
                 └─ Optional tools / agent execution with independent permissions
```

You do not need AI, MCP, Docker, or an SDK to understand the first example. Those concepts build on these foundations.

## Guided practice: safe workstation orientation

**Option A: No terminal required.** Open your operating system's file browser. Locate a folder and identify its full path. Find one text or Markdown file, identify its extension and describe which application opens it. Then draw: physical device → operating system → app → file.

**Option B: macOS/Linux terminal (read-only).** Open Terminal and type the following commands **one line at a time**:

```sh
pwd
ls
uname -s
```

- `pwd` prints the current working directory.
- `ls` lists items in that directory.
- `uname -s` prints the kernel/operating-system name on common Unix-like systems.
- These commands are for inspection; do not paste unknown shell scripts or secrets.
- If `ls` returns `Permission denied`, describe the error instead of forcing access.

**Predict before running:** Which command answers “Where am I in the filesystem?” Which describes what is in the current folder? What would change after using a different directory?

## Guided practice: follow a browser request

1. Choose a public website. Do not use an employer or private customer page.
2. Open the browser developer tools, select **Network**, and reload the page.
3. Find one request. Note the URL, method (such as GET), status (such as 200 or 404), and resource type.
4. Identify what you *observed* versus what you *inferred*. A 200 response means the request succeeded at the HTTP level; it does not prove the page's business logic is correct.
5. Draw where DNS, HTTPS, your browser, the server and any possible database would fit. Label unseen components “inferred/unknown.”

**Troubleshooting:** If there are no entries, open Network before reloading. If the site is cached, inspect another public request rather than disabling security. If you cannot open developer tools, use the conceptual diagram and state “not tested.”

## Knowledge check

1. What is the difference between a file stored on disk and a process running in memory?
2. Does opening a website always cause the browser to write directly to a database?
3. Can a static HTML website function without a custom application backend?
4. What does HTTP 404 tell you, and what does it *not* prove?
5. Why is a prompt saying “don't access private data” not the same as a technical permission boundary?

**Suggested answers:** (1) A file persists as stored data, while a process is an executing program instance; (2) no, the app or server commonly coordinates access, and some sites do not use a DB; (3) yes; (4) the requested resource was not found at that address, but it does not prove the whole service is down; (5) instructions can be ignored or overridden, while authorization must be enforced outside the model.

## Completion evidence

- Explain CPU, RAM, storage, OS, program, process and runtime without referring to this guide.
- Demonstrate either safe local file inspection or safe terminal commands, recording what happened.
- Draw a browser-to-server request and label which components you actually observed.
- Write down one remaining question and identify the next lesson.

**Reading is not completion.** An instructor or learner should assess the exercise; no grade, cloud resource, or account is created by this Markdown file.

## What comes next

- [Reading code, files, JSON and YAML](reading-code-and-yaml.md)
- [Frontend building blocks](frontend-building-blocks.md)
- [MCP versus REST APIs](mcp-vs-rest-api.md) **after** the application and API foundations.
- [AI agent harnesses](ai-agent-harnesses.md) **after** models, APIs and tools.

## Source references and review notes

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Node.js: introduction](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [GNU Coreutils manual](https://www.gnu.org/software/coreutils/manual/)
- [Apple Terminal user guide](https://support.apple.com/guide/terminal/welcome/mac)

**Editorial review needed:** technical accuracy, current links, brand tone and novice usability. No production or external services should be required for the basic exercise. Content and URLs have not been validated by a live test in this PR.
