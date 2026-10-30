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
