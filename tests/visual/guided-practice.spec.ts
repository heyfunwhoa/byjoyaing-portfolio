import { expect, test } from "@playwright/test";

const route = "/iframe.html?id=design-lab-guided-practice-explorer--five-exercises&viewMode=story";
const titles = [
  "Find and compare accounts",
  "Choose form controls",
  "Interpret a dashboard",
  "Inspect evidence and uncertainty",
  "Complete an account handoff",
];

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "Learn to make design decisions" })).toBeVisible();
});

test("compare button reveals a suggested example even without a radio selection for all five exercises", async ({ page }) => {
  for (const title of titles) {
    await page.getByRole("navigation", { name: "Choose a practical exercise" }).getByRole("button", { name: new RegExp(title) }).click();
    const compare = page.getByRole("button", { name: "Compare my decision" });
    await expect(compare).toBeEnabled();
    await compare.click();
    await expect(page.getByRole("heading", { name: "Worked example and tradeoffs" })).toBeVisible();
    await expect(page.getByText("Since no option was selected")).toBeVisible();
    await expect(page.getByText("Suggested example:", { exact: false })).toBeVisible();
  }
});

test("comparison uses selected option and reset clears it", async ({ page }) => {
  const choice = page.getByRole("radio").first();
  await choice.check();
  await page.getByRole("button", { name: "Compare my decision" }).click();
  await expect(page.getByText("Your choice:", { exact: false })).toBeVisible();
  await expect(page.getByText("Since no option was selected")).toHaveCount(0);
  await page.getByRole("button", { name: "Reset answer" }).click();
  await expect(choice).not.toBeChecked();
  await expect(page.getByRole("heading", { name: "Worked example and tradeoffs" })).toHaveCount(0);
});

test("exercise switches clear prior comparison state", async ({ page }) => {
  await page.getByRole("button", { name: "Compare my decision" }).click();
  await page.getByRole("navigation", { name: "Choose a practical exercise" }).getByRole("button", { name: /Choose form controls/ }).click();
  await expect(page.getByRole("heading", { name: "Worked example and tradeoffs" })).toHaveCount(0);
  await expect(page.getByRole("radio").first()).not.toBeChecked();
});
