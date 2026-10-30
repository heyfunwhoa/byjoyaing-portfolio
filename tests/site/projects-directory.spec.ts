import { expect, test } from "@playwright/test";

test("filters preserve focus, scroll and an open matching preview without route requests", async ({ page }) => {
  await page.goto("/projects?category=customer#directory");
  await page.evaluate(() => document.fonts.ready);
  const card = page.locator("#directory article").filter({
    has: page.getByRole("heading", { name: "Customer Feedback Intelligence", exact: true }),
  });
  const preview = card.locator("details");
  await preview.locator("summary").click();
  const mobile = page.getByRole("combobox", { name: "Project focus", exact: true });
  const control = await mobile.isVisible()
    ? mobile
    : page.getByRole("button", { name: "All work", exact: true });
  await control.focus();
  await control.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);
  const requests: string[] = [];
  page.on("request", request => {
    const url = new URL(request.url());
    if (url.pathname === "/projects" && (request.isNavigationRequest() || url.searchParams.has("_rsc"))) {
      requests.push(request.url());
    }
  });
  if (await mobile.isVisible()) await mobile.selectOption("All work");
  else await control.press("Enter");
  await expect(page).toHaveURL(/\/projects#directory$/);
  await expect(control).toBeFocused();
  await expect(preview).toHaveAttribute("open", "");
  expect(Math.abs(await page.evaluate(() => window.scrollY) - before)).toBeLessThanOrEqual(1);
  expect(requests).toEqual([]);
  const groups = page.locator('#directory [role="group"]');
  for (const group of await groups.all()) {
    if (await group.isVisible()) {
      expect(await group.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    }
  }
});

test("search and clear keep focus and share their state across reload and history", async ({ page }) => {
  await page.goto("/projects#directory");
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await search.pressSequentially("detector coverage");
  await expect(search).toHaveValue("detector coverage");
  await expect(search).toBeFocused();
  await expect(page.getByRole("status")).toHaveText("1 matching project");
  expect(new URL(page.url()).searchParams.get("q")).toBe("detector coverage");
  await page.reload();
  await expect(search).toHaveValue("detector coverage");
  await search.fill("no-such-project-qa");
  await expect(page.getByRole("status")).toHaveText("0 matching projects");
  const clear = page.getByRole("button", { name: "Clear filters", exact: true });
  await clear.focus();
  await clear.press("Enter");
  await expect(clear).toBeFocused();
  await expect(clear).toHaveAttribute("aria-disabled", "true");
  await expect(search).toHaveValue("");
  await expect(page).toHaveURL(/\/projects#directory$/);
  await search.fill("detector");
  await page.getByRole("link", { name: "Read case study: Detector Coverage Atlas", exact: true }).click();
  await expect(page).toHaveURL(/\/work\/detector-coverage-atlas\?from=projects&q=detector$/);
  await page.goBack();
  await expect(search).toHaveValue("detector");
  await expect(page.getByRole("status")).toHaveText("1 matching project");
});

test("changing filters without a fragment does not add an anchor jump", async ({ page }) => {
  await page.goto("/projects");
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await search.fill("detector");
  await expect(page).toHaveURL(/\/projects\?q=detector$/);
});
