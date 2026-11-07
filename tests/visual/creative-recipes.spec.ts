import { expect, test } from '@playwright/test';
test('creative recipes expose useful outputs with keyboard disclosures and bounded layout', async ({ page }) => {
  await page.goto('/iframe.html?id=design-lab-creative-recipes--overview&viewMode=story');
  await expect(page.getByRole('heading', { name: 'Make a marketing asset, then test whether it helps' })).toBeVisible();
  const summaries = page.locator('summary');
  await expect(summaries).toHaveCount(6);
  for (const summary of await summaries.all()) {
    await summary.focus();
    await summary.press('Enter');
    await expect(summary.locator('..')).toHaveAttribute('open', '');
  }
  await expect(page.getByText(/Hand off the selected recipe/)).toBeVisible();
  const registry = page.getByRole('link', { name: /Open the creative model/ });
  await expect(registry).toHaveAttribute('href', /ai-creative-model-registry\.md$/);
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
