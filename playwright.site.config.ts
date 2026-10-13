import { defineConfig, devices } from "@playwright/test";

// Remote runs are read-only browser journeys. No provider keys or bypass headers.
const remote = process.env.SMOKE_BASE_URL;
if (remote && !["https://www.byjoyaing.com", "https://byjoyaing.com"].includes(remote)) {
  throw new Error("SMOKE_BASE_URL must be a public portfolio production origin.");
}

export default defineConfig({
  testDir: "./tests/site",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: remote ?? "http://127.0.0.1:3000",
    reducedMotion: "reduce",
    serviceWorkers: "block",
    // Avoid retaining third-party traffic or visitor data from hosted runs.
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  projects: [
    { name: "site-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "site-mobile", use: { ...devices["Pixel 7"], browserName: "chromium" } },
  ],
  webServer: remote ? undefined : {
    command: "npm run start -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
