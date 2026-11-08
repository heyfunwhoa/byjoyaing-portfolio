import { expect, test } from "@playwright/test";

test("project stories keep one contribution and reveal legacy status links", async ({ page }) => {
  test.skip(test.info().project.name !== "site-desktop", "This journey includes its own viewport matrix.");
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of ["revenue-planning-simulator", "product-release-intelligence"]) {
      await page.goto(`/work/${slug}`);
      const main = page.getByRole("main");
      const contribution = main.locator("#contribution p");
      const contributionText = await contribution.innerText();
      await expect(main.getByText(contributionText, { exact: true })).toHaveCount(1);
      const details = main.locator("#how-it-works");
      const status = details.locator("#where-it-stands");
      const stageText = await status.locator("p").first().textContent();
      await expect(main.getByText(stageText!, { exact: true })).toHaveCount(1);
      await expect(status).toBeHidden();
      await expect(main.getByRole("link", { name: "Current status", exact: true })).toHaveCount(0);

      const headings = await main.locator("#problem h2, #contribution h2, #example h2").allTextContents();
      expect(headings).toEqual(["The problem", "My contribution", "One example"]);
      await main.getByRole("link", { name: "How it works", exact: true }).click();
      await expect(status).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

      const summary = details.locator("summary");
      await summary.focus();
      await page.keyboard.press("Space");
      await expect(details).not.toHaveAttribute("open", "");
      await expect(summary).toBeFocused();
      expect(await summary.evaluate((element) => Number.parseFloat(getComputedStyle(element).outlineWidth))).toBeGreaterThan(0);
      await page.keyboard.press("Enter");
      await expect(status).toBeVisible();

      await page.goto(`/work/${slug}#where-it-stands`);
      await expect(status).toBeVisible();
      await page.reload();
      await expect(status).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
  }
});

test("side quests offers one academy entry, one revenue system, and no status pills", async ({ page }) => {
  test.skip(test.info().project.name !== "site-desktop", "Run the presentation journey once.");
  await page.goto("/side-quests");
  await expect(page.getByRole("heading", { name: "GTM Revenue OS" })).toBeVisible();
  const academy = page.getByRole("link", { name: "Open Builder Academy" });
  await expect(academy).toHaveAttribute("href", "/ai-academy");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Planning$/ })).toHaveAttribute("href", "/work/revenue-planning-simulator");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Coverage and capacity$/ })).toHaveAttribute("href", "/work/gtm-operating-plan");
  await expect(page.getByRole("link", { name: /Explore the project\s*:\s*Pipeline review$/ })).toHaveAttribute("href", "/work/revenue-intelligence");
  await expect(page.getByRole("link", { name: "Request a walkthrough" })).toHaveAttribute("href", "/contact");
  await expect(page.getByText("Prototype", { exact: true })).toHaveCount(0);
  await expect(page.locator("a[href*='gtm-revenue-os'], a[href*='vercel.app']")).toHaveCount(0);

  await academy.focus();
  await expect(academy).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/ai-academy$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/side-quests");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.goto("/projects");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/projects");
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  const card = page.locator("#directory article").filter({
    has: page.getByRole("heading", { name: "Revenue Planning Simulator", exact: true }),
  });
  await expect(card.getByText("Intended value:")).toBeVisible();
  await expect(card.getByText("Contribution:")).toBeVisible();
  const details = card.locator("details");
  await details.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(card.getByText(/Recorded stage:/)).toBeVisible();
  await expect(card.getByText(/does not save a scenario/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
