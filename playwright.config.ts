import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/visual",
  timeout: 25_000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  expect: { toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.01 } },
  use: { baseURL: "http://127.0.0.1:6006", trace: "retain-on-failure", screenshot: "only-on-failure", reducedMotion: "reduce" },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"], browserName: "chromium" } },
  ],
  webServer: { command: "npm run storybook -- --ci --no-open", url: "http://127.0.0.1:6006/iframe.html", reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
