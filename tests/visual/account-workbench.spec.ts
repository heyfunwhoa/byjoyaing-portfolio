import { expect, test } from "@playwright/test";

const route = "/iframe.html?id=design-lab-account-workflow-workbench--account-journey&viewMode=story";

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "From account research to handoff" })).toBeVisible();
});

test("account research completes a reversible handoff and keeps focus on new steps", async ({ page }) => {
  await page.getByRole("searchbox", { name: "Search account or evidence text" }).fill("Northstar");
  await expect(page.getByRole("status").filter({ hasText: "1 of 4" })).toBeVisible();
  await page.getByRole("button", { name: "Inspect evidence" }).click();
  await expect(page.getByRole("heading", { name: "What do we actually know?" })).toBeFocused();
  await expect(page.getByText("Northstar Security · evidence detail")).toBeVisible();
  await page.getByRole("button", { name: "Add to shortlist" }).click();
  await page.getByRole("button", { name: "4. Review output" }).click();
  await expect(page.getByRole("heading", { name: "What should another person receive?" })).toBeFocused();
  await expect(page.getByRole("region", { name: "Fictional export preview" }).getByText("Northstar Security")).toBeVisible();
  await page.getByRole("button", { name: "3. Prioritize" }).click();
  await page.getByRole("checkbox", { name: /Northstar Security/ }).uncheck();
  await page.getByRole("button", { name: "4. Review output" }).click();
  await expect(page.getByText("No accounts selected.")).toBeVisible();
  await page.getByRole("button", { name: "Reset example" }).click();
  await expect(page.getByRole("heading", { name: "How do I find relevant accounts?" })).toBeFocused();
  await expect(page.getByRole("searchbox", { name: "Search account or evidence text" })).toHaveValue("");
});

test("cards, table and empty filters are functional at responsive widths", async ({ page }) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("button", { name: "Table", exact: true }).click();
    await expect(page.getByRole("region", { name: "Account comparison table" })).toBeVisible();
    await page.getByRole("button", { name: "Cards", exact: true }).click();
    await expect(page.getByRole("button", { name: "Inspect evidence" }).first()).toBeVisible();
    await page.getByRole("searchbox", { name: "Search account or evidence text" }).fill("unmatched-example");
    await expect(page.getByText("No matching accounts")).toBeVisible();
    await page.getByRole("button", { name: "Reset filters" }).click();
    await expect(page.getByRole("status").filter({ hasText: "4 of 4" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
});
