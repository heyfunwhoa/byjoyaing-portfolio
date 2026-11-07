# Alert handoff capstone

**Outcome.** Trace a form submission into a saved database row, change one recovery behavior, and verify the packaged version in a local preview. Allow about 30 minutes.

Start with the [API walkthrough](../../../docs/builder-academy/follow-one-api-request.md) and [build outputs](../../../docs/builder-academy/source-to-running-software.md#what-the-build-produces). Use Node.js 24 and fictional details. The lab uses Node's built-in HTTP and SQLite modules and binds to loopback. Each process has a fresh in-memory database. Stopping it clears the reviews. Keep the lab on your own machine.

## 1. Run the source and inspect one request

From the repository root:

```sh
node examples/academy/alert-handoff/server.mjs
```

Open the printed address. In browser DevTools, open Network and submit a fictional summary with **Lose the first confirmation after saving** selected. Find the POST request and its payload. The browser should show an uncertain result and retain the summary.

Press **Try again**. Compare the request keys on both attempts. The second response should confirm the existing review ID. Open **Inspect saved reviews** and look for that ID once. Follow the code from `client.mjs` to the POST handler and the `reviews` table in `server.mjs`.

## 2. Make a small change and package it

Before editing, write one testable expectation. For example, the uncertain-result message should say that **Try again checks the same review**, and the draft should remain visible. Edit the message in `client.mjs` and retry the source walkthrough. Refresh the page to load the edit. Run the server tests:

```sh
node --test examples/academy/alert-handoff/server.test.mjs
node examples/academy/alert-handoff/build.mjs
```

The build copies the files needed to run the app into a new temporary folder and writes `artifact.json` with a SHA-256 fingerprint of those files. It packages JavaScript and HTML as they are. This example needs no compilation. Keep the printed folder path and compare its manifest with the source process's **Inspect the running version** result.

## 3. Run the packaged version as a local preview

In a second terminal, replace the example path with the folder printed by the build:

```sh
node "/path/to/printed-folder/server.mjs" 4311
```

Open the new printed address. Confirm **Inspect the running version** reports `packaged` and matches the manifest fingerprint. Repeat the failure and retry, checking that your changed message appears and exactly one matching review is stored. This is a local preview exercise. Each process has its own empty database when it starts.

**Record your evidence.** Write down the change you intended, the fingerprint and local port you verified, the two request outcomes, the confirmed review ID, the matching row count, and your go or pause decision. If the message is stale, check which process and fingerprint you are using before packaging again. To practice reverting, run an earlier reviewed artifact and confirm its fingerprint and behavior. Stop both processes with Ctrl+C when finished.

**Transfer.** Apply the same test to a fictional report export request. Describe what you would inspect if the job starts and the browser misses its confirmation.

[Node.js 24 SQLite documentation](https://nodejs.org/docs/latest-v24.x/api/sqlite.html)
