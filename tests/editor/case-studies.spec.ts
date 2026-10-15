import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save a case-study summary, render it, then restore the sentence", async ({
  page,
  context,
}) => {
  const path = "content/work/studies/detector-coverage-atlas.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = `${original.summary} Local editorial check.`;
  try {
    await page.goto("/keystatic/collection/caseStudies/item/detector-coverage-atlas");
    const summary = page.getByRole("textbox", {
      name: "Public summary",
      exact: true,
    });
    await expect(summary).toHaveValue(original.summary);
    await summary.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(edited);
    const reader = await context.newPage();
    await reader.goto("/projects");
    await expect(reader.getByText(edited, { exact: true })).toBeVisible();
    await expect(reader.getByRole("link", { name: "Detector Coverage Atlas" }).first()).toBeVisible();
    await page.reload();
    await expect(summary).toHaveValue(edited);
    await summary.fill(original.summary);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(original.summary);
    await reader.reload();
    await expect(reader.getByText(original.summary, { exact: true })).toBeVisible();
    await expect(reader.getByText("Local editorial check.", { exact: false })).toHaveCount(0);
    const restored = JSON.parse(readFileSync(path, "utf8"));
    expect(restored.summary).toBe(original.summary);
    expect(restored.owner).toBe(original.owner);
    expect(restored.publicationStatus).toBe(original.publicationStatus);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
