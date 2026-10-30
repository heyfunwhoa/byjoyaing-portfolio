import { expect, test } from "@playwright/test";

const lessons = [
  ["/ai-academy/programming", "Programming Foundations"],
  ["/ai-academy/version-control", "Git Workflow Essentials"],
  ["/ai-academy/systems", "Systems Engineering"],
  ["/ai-academy/dependencies/lockfiles", "Lockfiles & Reproducible Builds"],
  ["/ai-academy/devops/build-rate-limits", "Build Rate Limits"],
  ["/ai-academy/playground", "Playground"],
  ["/ai-academy/playground/skill-builder", "Build a Skill"],
  ["/ai-academy/playground/research-pipeline", "Research Pipeline Simulator"],
  ["/ai-academy/journeys/prompting", "Prompting Journey"],
  ["/ai-academy/journeys/source-verification", "Source Verification Journey"],
  ["/builder-academy/identity-journey", "Identity Journey Lab"],
  ["/builder-academy/credential-risk", "Credential to Identity Risk"],
];

test("direct lesson links expose a usable hierarchy without missing category pages", async ({ page }) => {
  for (const [url, title] of lessons) {
    await page.goto(url);
    const trail = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
    await expect(trail).toHaveCount(1);
    await expect(trail.locator('[aria-current="page"]')).toHaveText(title);
    await expect(trail.getByRole("link", { name: "Builder Academy", exact: true })).toHaveAttribute("href", "/ai-academy");
    const destinations = await trail.getByRole("link").evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(destinations.every(href => ["/", "/side-quests", "/ai-academy", "/ai-academy/playground"].includes(href!))).toBe(true);
    for (const link of await trail.getByRole("link").all()) {
      const box = await link.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    expect(await trail.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
});

test("a nested lab can return through Playground to Academy using keyboard links", async ({ page }) => {
  await page.goto("/ai-academy/playground/research-pipeline");
  let trail = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
  const parent = trail.getByRole("link", { name: "Playground", exact: true });
  await parent.focus();
  await expect(parent).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/ai-academy\/playground$/);
  trail = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
  await trail.getByRole("link", { name: "Builder Academy", exact: true }).click();
  await expect(page).toHaveURL(/\/ai-academy$/);
});

const supportingPages = [
  ["/projects?category=technical", "Projects", "Side Quests", "/side-quests"],
  ["/experience", "Experience", "Work", "/work"],
  ["/capabilities", "Capabilities", "Work", "/work"],
  ["/ai-academy", "Builder Academy", "Side Quests", "/side-quests"],
  ["/builder-guide", "Builder Guide", "Home", "/"],
  ["/account-signal", "LimaCharlie research brief", "Side Quests", "/side-quests"],
  ["/private-work", "Private case studies", "Field Notes", "/field-notes"],
];

test("supporting pages have one wrapping breadcrumb and working parent links", async ({ page }) => {
  for (const [url, title, parentName, parentUrl] of supportingPages) {
    await page.goto(url);
    const trail = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
    await expect(trail).toHaveCount(1);
    await expect(trail.locator('[aria-current="page"]')).toHaveText(title);
    await expect(trail.locator('[aria-current="page"]')).not.toHaveAttribute("href");
    expect(await trail.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    const parent = trail.getByRole("link", { name: parentName, exact: true });
    await expect(parent).toHaveAttribute("href", parentUrl);
    await parent.focus();
    await expect(parent).toBeFocused();
    await parent.press("Enter");
    await expect(page).toHaveURL(new RegExp(parentUrl === "/" ? "/$" : parentUrl + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("primary destinations do not repeat the header hierarchy", async ({ page }) => {
  for (const url of ["/", "/about", "/work", "/field-notes", "/side-quests", "/contact"]) {
    await page.goto(url);
    await expect(page.getByRole("navigation", { name: "Breadcrumb", exact: true })).toHaveCount(0);
  }
});

test("case studies restore directory filters after reload", async ({ page }) => {
  await page.goto("/projects?category=technical&q=Atlas#directory");
  const openCase = page.locator('#directory a[href^="/work/detector-coverage-atlas?"]').last();
  await openCase.click();
  await expect(page).toHaveURL(/from=projects/);
  await page.reload();
  const back = page.getByRole("navigation", { name: "Breadcrumb", exact: true }).getByRole("link", { name: "Projects", exact: true });
  await expect(back).toHaveAttribute("href", "/projects?category=technical&q=Atlas#directory");
  await back.press("Enter");
  await expect(page.getByRole("searchbox", { name: "Search projects" })).toHaveValue("Atlas");
  await expect(page.getByRole("status")).toContainText("1 matching project");
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page.getByRole("searchbox", { name: "Search projects" })).toHaveValue("");
});

test("direct case links return to all projects and return targets stay local", async ({ page }) => {
  await page.goto("/work/detector-coverage-atlas");
  await expect(page.getByRole("navigation", { name: "Breadcrumb", exact: true }).getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("href", "/projects#directory");
  await page.goto("/work/detector-coverage-atlas?from=projects&stage=Build&q=hello%26world&returnTo=https://example.com");
  const back = page.getByRole("navigation", { name: "Breadcrumb", exact: true }).getByRole("link", { name: "Projects", exact: true });
  await expect(back).toHaveAttribute("href", "/projects?stage=Build&q=hello%26world#directory");
  await back.click();
  await expect(page.getByRole("searchbox", { name: "Search projects" })).toHaveValue("hello&world");
});

test("project sequence follows filtered results and preserves context in both directions", async ({ page }) => {
  await page.goto("/projects?category=customer#directory");
  const destinations = await page.locator('#directory h3 a').evaluateAll(links => links.map(link => link.getAttribute("href")!));
  expect(destinations.length).toBeGreaterThan(1);
  await page.locator('#directory h3 a').first().click();
  let sequence = page.getByRole("navigation", { name: "Project results", exact: true });
  await expect(sequence.getByRole("link", { name: /^Previous/ })).toHaveCount(0);
  await expect(sequence.getByRole("link", { name: /^Next/ })).toHaveAttribute("href", destinations[1]);
  await sequence.getByRole("link", { name: /^Next/ }).press("Enter");
  sequence = page.getByRole("navigation", { name: "Project results", exact: true });
  await expect(sequence.getByRole("link", { name: /^Previous/ })).toHaveAttribute("href", destinations[0]);
  await sequence.getByRole("link", { name: /^Previous/ }).press("Enter");
  await expect(page).toHaveURL(new RegExp(destinations[0].replace(/[?]/g, "\\?") + "$"));
  await page.goto("/work/detector-coverage-atlas?from=projects&q=Atlas");
  await expect(page.getByRole("navigation", { name: "Project results", exact: true })).toHaveCount(0);
});
