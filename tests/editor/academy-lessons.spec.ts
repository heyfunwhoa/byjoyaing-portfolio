import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("edit and save the reading-code lesson, render it, then roll back through the editor", async ({
  page,
  context,
}) => {
  const path = "content/academy/lessons/reading-code-and-yaml.json";
  const originalBytes = readFileSync(path, "utf8");
  const original = JSON.parse(originalBytes);
  const edited = `${original.summary} Local editorial check.`;
  try {
    await page.goto("/keystatic");
    await page
      .getByRole("link", { name: "Reading code and YAML", exact: true })
      .first()
      .click();
    const summary = page.getByRole("textbox", { name: "Summary", exact: true });
    await expect(summary).toHaveValue(original.summary);
    await summary.fill(edited);
    const save = page.getByRole("button", { name: "Save", exact: true });
    await save.focus();
    await page.keyboard.press("Enter");
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(edited);
    const saved = JSON.parse(readFileSync(path, "utf8"));
    expect(saved.id).toBe("reading-code-and-yaml");
    expect(saved).not.toHaveProperty("check");
    expect(saved).not.toHaveProperty("companion");
    const reader = await context.newPage();
    await reader.goto("/ai-academy");
    await reader.getByText(/^Explore learning paths \(\d+\)$/).click();
    await reader
      .getByRole("button", {
        name: "Start this path: Build and release safely",
        exact: true,
      })
      .click();
    const article = reader.getByRole("article", {
      name: "Reading code, files, JSON and YAML",
    });
    await expect(article).toContainText(edited);
    await expect(article).toContainText(
      "A YAML file parses, but verified is at the root instead of inside account.",
    );
    await expect(
      article.getByRole("link", {
        name: "Read the full lesson, glossary and answer key",
      }),
    ).toBeVisible();
    await page.reload();
    await expect(summary).toHaveValue(edited);
    await summary.fill(original.summary);
    await save.click();
    await expect
      .poll(() => JSON.parse(readFileSync(path, "utf8")).summary)
      .toBe(original.summary);
    await reader.reload();
    await reader.getByText(/^Explore learning paths \(\d+\)$/).click();
    await reader
      .getByRole("button", {
        name: "Start this path: Build and release safely",
        exact: true,
      })
      .click();
    await expect(
      reader.getByRole("article", {
        name: "Reading code, files, JSON and YAML",
      }),
    ).not.toContainText("Local editorial check.");
    expect(JSON.parse(readFileSync(path, "utf8"))).toEqual(original);
  } finally {
    writeFileSync(path, originalBytes);
  }
});
