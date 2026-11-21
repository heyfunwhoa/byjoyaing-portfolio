import { expect, test } from "@playwright/test";

const route = "/iframe.html?id=design-lab-component-learning--explorer&viewMode=story";

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "Component learning explorer" })).toBeVisible();
});

test("spacing review button produces visible feedback and can reset", async ({ page }) => {
  await page.getByRole("navigation", { name: "Choose a lesson" }).getByRole("button", { name: /Spacing/ }).click();
  await page.getByRole("button", { name: "Review example" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Review complete:" })).toBeVisible();
  await page.getByRole("button", { name: "Reset review" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Choose Review example" })).toBeVisible();
});

test("hierarchy buttons respond locally and never send data", async ({ page }) => {
  await page.getByRole("navigation", { name: "Choose a lesson" }).getByRole("button", { name: /Alignment|Hierarchy/ }).click();
  await page.getByRole("button", { name: "Review Northstar" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Northstar: three fictional signals" })).toBeVisible();
  await page.getByRole("button", { name: "See all accounts" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Fictional accounts:" })).toBeVisible();
  await page.getByRole("button", { name: "Three equal actions" }).click();
  for (const action of ["Research", "Draft", "Send"]) {
    await page.getByRole("button", { name: action, exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: action === "Send" ? "no email or data was sent" : action + " selected:" })).toBeVisible();
  }
  await page.getByRole("button", { name: "One next action" }).click();
  await expect(page.getByRole("status").filter({ hasText: "No customer records are accessed." })).toBeVisible();
});
