import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save the Home cover, render the change, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/home/page.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited =
    "I'm Kristen Aing. Local editorial check for the homepage cover.";
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "Home page", exact: true })
      .first()
      .click();
    const body = page.getByRole("textbox", { name: "Cover body", exact: true });
    await expect(body).toHaveValue(original.body);
    await body.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).body)
      .toBe(edited);
    const reader = await context.newPage();
    await reader.goto("/");
    await expect(reader.getByText(edited)).toBeVisible();
    await expect(
      reader.getByRole("heading", { level: 1, name: original.headline }),
    ).toBeVisible();
    await expect(
      reader.getByRole("link", { name: "Explore Work", exact: true }),
    ).toBeVisible();
    await expect(reader.getByText("03 / A side quest")).toBeVisible();
    await page.reload();
    await expect(body).toHaveValue(edited);
    await body.fill(original.body);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).body)
      .toBe(original.body);
    await reader.reload();
    await expect(reader.getByText(original.body)).toBeVisible();
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
