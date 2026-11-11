import { expect, test, type Locator, type Page } from "@playwright/test";

// Run the explicit matrix once in the existing production-build browser suite.
// No credentials, hosted-preview bypasses, external navigation or writes.
test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "site-desktop", "Explicit playbook matrix runs once.");
  await page.route("**/api/contact", (route) => route.abort());
  await page.route("**/api/request-resume", (route) => route.abort());
});

async function expectReflow(page: Page, card?: Locator) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  if (card) {
    const clipped = await card.locator("h3, p, a, summary, dt, dd").evaluateAll((elements) =>
      elements.filter((element) => element.getClientRects().length > 0)
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => element.textContent?.trim().slice(0, 80)),
    );
    expect(clipped, "Visible card content must not clip horizontally").toEqual([]);
  }
}

for (const width of [375, 768, 1280]) {
  test("all playbook outlines support keyboard expansion and reflow at " + width + "px", async ({ page }) => {
    test.setTimeout(60_000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto("/field-notes");
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
    const nav = page.getByRole("navigation", { name: "Field Notes sections", exact: true });
    const names: string[] = [];

    for (const [id, linkName, count] of [
      ["sales-playbooks", "Sales playbooks", 10],
      ["marketing-playbooks", "Marketing playbooks", 8],
    ] as const) {
      await nav.getByRole("link", { name: linkName, exact: true }).click();
      await expect(page).toHaveURL(new RegExp("#" + id + "$"));
      const section = page.locator("#" + id);
      const cards = section.getByRole("article");
      await expect(cards).toHaveCount(count);
      await expect(section.getByRole("heading", { level: 2 })).toBeInViewport();
      await expect(section.locator("details[open]")).toHaveCount(0);
      await expectReflow(page);

      const first = (await cards.nth(0).boundingBox())!;
      const second = (await cards.nth(1).boundingBox())!;
      if (width < 768) {
        expect(second.y).toBeGreaterThanOrEqual(first.y + first.height);
      } else {
        expect(Math.abs(first.y - second.y)).toBeLessThan(2);
        expect(second.x).toBeGreaterThanOrEqual(first.x + first.width);
      }

      // Start at the first connected project, then use actual Tab navigation
      // through every card without resetting focus between cards.
      await cards.first().locator(":scope > div").getByRole("link").first().focus();
      for (let index = 0; index < count; index++) {
        const card = cards.nth(index);
        await expect(card.getByText("Connected work", { exact: true })).toBeVisible();
        const links = card.locator(":scope > div").getByRole("link");
        expect(await links.count()).toBeGreaterThan(0);
        for (const link of await links.all()) {
          await expect(link).toBeFocused();
          await expect(link).toBeVisible();
          const bounds = (await link.boundingBox())!;
          expect(bounds.height).toBeGreaterThanOrEqual(44);
          await page.keyboard.press("Tab");
        }

        const summary = card.locator("summary");
        const details = card.locator("details");
        const name = await summary.getAttribute("aria-label");
        expect(name).toMatch(/^View .+ outline$/);
        names.push(name!);
        await expect(summary).toBeFocused();
        await expect(summary).toBeInViewport();
        expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        expect(await summary.evaluate((element) => {
          const style = getComputedStyle(element);
          return element.matches(":focus-visible") &&
            style.outlineStyle !== "none" &&
            parseFloat(style.outlineWidth) >= 2 &&
            style.outlineColor !== "rgba(0, 0, 0, 0)";
        }), "Keyboard focus must have a visible outline").toBe(true);
        await expect(card.locator("dl")).toBeHidden();
        await page.keyboard.press("Enter");
        await expect(details).toHaveAttribute("open", "");
        await expect(card.locator("dl")).toBeVisible();
        await expect(card.getByText("Next to build", { exact: true })).toBeVisible();
        if (id === "sales-playbooks") {
          await expect(card.getByText("Evidence to move forward", { exact: true })).toBeVisible();
          await expect(card.getByText("When to pause or walk away", { exact: true })).toBeVisible();
        }
        await expectReflow(page, card);
        await page.keyboard.press("Space");
        await expect(details).not.toHaveAttribute("open", "");
        await expect(summary).toBeFocused();
        if (index < count - 1) await page.keyboard.press("Tab");
      }
    }
    expect(new Set(names).size).toBe(18);
    expect(errors).toEqual([]);
  });
}

test("connected work and existing guides support a browser round trip", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/field-notes");
  const sections = page.locator("#sales-playbooks, #marketing-playbooks");
  const connections = sections.locator("article > div a");
  const hrefs = [...new Set(await connections.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!),
  ))];
  expect(hrefs.length).toBeGreaterThan(1);
  for (const href of hrefs) {
    if (!href.startsWith("/")) {
      // Only the inspected public repository may leave the portfolio.
      expect(href).toBe("https://github.com/heyfunwhoa/security-market-map");
      continue;
    }
    expect(href).toMatch(/^\/work\/[a-z0-9-]+$/);
    await connections.and(page.locator('a[href="' + href + '"]')).first().click();
    await expect(page).toHaveURL(new RegExp(href + "$"));
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/field-notes$/);
    await expect(page.locator("#sales-playbooks article")).toHaveCount(10);
  }

  for (const href of ["/field-notes/enterprise-deal", "/field-notes/multithreading"]) {
    const guide = sections.locator('details a[href="' + href + '"]').first();
    const card = guide.locator("..");
    await card.locator("summary").click();
    await guide.click();
    await expect(page).toHaveURL(new RegExp(href + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/field-notes$/);
  }
});

test("outlines remain useful with JavaScript disabled", async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 375, height: 900 },
    serviceWorkers: "block",
  });
  try {
    const page = await context.newPage();
    expect((await page.goto("/field-notes"))?.status()).toBe(200);
    for (const id of ["sales-playbooks", "marketing-playbooks"]) {
      const card = page.locator("#" + id + " article").first();
      await expect(card.getByText("Connected work", { exact: true })).toBeVisible();
      const summary = card.locator("summary");
      await summary.focus();
      await summary.press("Enter");
      await expect(card.locator("details")).toHaveAttribute("open", "");
      await expect(card.getByText("Next to build", { exact: true })).toBeVisible();
      await summary.press("Space");
      await expect(card.locator("dl")).toBeHidden();
    }
  } finally {
    await context.close();
  }
});
