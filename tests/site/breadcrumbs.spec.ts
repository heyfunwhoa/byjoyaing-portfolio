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
    expect(destinations.every(href => ["/", "/ai-academy", "/ai-academy/playground"].includes(href!))).toBe(true);
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
