import { defineConfig, devices } from "@playwright/test";

// Explicit local-only suite: it temporarily edits the pilot file and restores it.
// Run in an isolated worktree, never against a hosted origin or another editor.
export default defineConfig({
  testDir: "./tests/editor",
  workers: 1,
  retries: 0,
  timeout: 90_000,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3001",
    reducedMotion: "reduce",
    trace: "off",
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3001",
    env: { KEYSTATIC_LOCAL: "true" },
    url: "http://127.0.0.1:3001/keystatic",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
