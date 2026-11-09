import { expect, test } from "@playwright/test";

const story =
  "/iframe.html?id=design-lab-relationship-and-evidence-explorer--synthetic-evidence&viewMode=story";

test("relationship evidence remains explicit across verified, inferred, stale and unknown states", async ({
  page,
}) => {
  await page.goto(story);
  await expect(page.getByRole("heading", { name: "What connects this account to a capability?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Relationships (4)" })).toBeVisible();
  await expect(page.getByText("Fictional public service page")).toBeVisible();

  for (const [assessment, relation] of [
    ["Inference", "Platform team"],
    ["Unknown", "Economic buyer"],
    ["Stale", "Cloud integration"],
    ["Verified", "Managed detection"],
  ]) {
    await page.getByRole("button", { name: assessment, exact: true }).click();
    await expect(page.getByRole("heading", { name: "Relationships (1)" })).toBeVisible();
    await expect(page.getByRole("button", { name: new RegExp(relation) })).toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(page.getByRole("heading", { name: relation, exact: true })).toBeVisible();
    await expect(page.getByText(assessment, { exact: true }).last()).toBeVisible();
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Relationships (4)" })).toBeVisible();
});

test("selection and evidence disclosure work with keyboard", async ({ page }) => {
  await page.goto(story);
  const relation = page.getByRole("button", { name: /Northstar MDR.*Platform team/ });
  await relation.focus();
  await page.keyboard.press("Enter");
  await expect(relation).toHaveAttribute("aria-current", "true");
  await expect(page.getByText("Inference from fictional job description")).toBeVisible();

  const toggle = page.getByRole("button", { name: "Hide supporting evidence" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Show supporting evidence" })).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Show supporting evidence" }).click();
  await expect(page.getByText("Inference from fictional job description")).toBeVisible();
});

test("evidence explorer reflows at mobile, tablet, desktop, and 200% CSS zoom", async ({
  page,
}) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(story);
    await expect(page.getByRole("heading", { name: "What connects this account to a capability?" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole("button", { name: "Unknown", exact: true }).click();
    await expect(page.getByText("No confirming source available")).toBeVisible();
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
