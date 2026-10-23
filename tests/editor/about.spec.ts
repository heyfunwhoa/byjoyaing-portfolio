import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save About, render the change, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/about/page.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = "Strategist. Leader. Builder. Local editorial check.";
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "About page", exact: true })
      .first()
      .click();
    const headline = page.getByRole("textbox", {
      name: "Headline",
      exact: true,
    });
    await expect(headline).toHaveValue(original.headline);
    await headline.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).headline)
      .toBe(edited);
    const reader = await context.newPage();
    await reader.goto("/about");
    await expect(
      reader.getByRole("heading", { level: 1, name: edited }),
    ).toBeVisible();
    await expect(
      reader.getByRole("tab", { name: "Strategist", exact: true }),
    ).toBeVisible();
    await expect(reader.getByText("Career at a glance")).toBeVisible();
    await page.reload();
    await expect(headline).toHaveValue(edited);
    await headline.fill(original.headline);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).headline)
      .toBe(original.headline);
    await reader.reload();
    await expect(reader.getByRole("heading", { level: 1 })).toHaveText(
      original.headline,
    );
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
