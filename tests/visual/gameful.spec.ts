import { expect, test } from '@playwright/test';
import { lessons } from '../../lib/ai-academy';
import { learningPaths } from '../../lib/academy/learning-paths';
const route = '/iframe.html?id=design-lab-gameful-workbench--overview&viewMode=story';
test('mission reviews invalidate on edit, cancel preserves work and reset clears it', async ({ page }) => {
  await page.goto(route);
  const mission = page.getByRole('region', { name: 'Build an opportunity brief' });
  const celebrate = mission.getByRole('button', { name: 'Celebrate practice completion' });
  await expect(celebrate).toBeDisabled();
  const reviews = mission.getByRole('checkbox', { name: 'I reviewed this fictional deliverable' });
  await expect(reviews.first()).toBeDisabled();
  for (const field of await mission.getByRole('textbox').all()) await field.fill('Fictional practice artifact');
  for (const checkbox of await reviews.all()) { await checkbox.focus(); await checkbox.press('Space'); }
  await expect(mission.getByRole('progressbar')).toHaveAttribute('value', '4');
  await mission.getByRole('checkbox', { name: 'Enable a brief completion animation' }).check();
  await celebrate.click();
  const feedback = mission.getByText('✓ Four deliverables reviewed. Ready for a coaching conversation.');
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveCSS('animation-name', 'none');
  await mission.getByRole('textbox').first().fill('Changed fictional artifact');
  await expect(reviews.first()).not.toBeChecked();
  await expect(mission.getByRole('progressbar')).toHaveAttribute('value', '3');
  await expect(celebrate).toBeDisabled();
  const reset = mission.getByRole('button', { name: 'Reset mission', exact: true });
  await reset.click();
  await mission.getByRole('button', { name: 'Keep my work' }).click();
  await expect(mission.getByRole('textbox').first()).toHaveValue('Changed fictional artifact');
  await expect(reset).toBeFocused();
  await reset.click();
  await mission.getByRole('button', { name: 'Clear mission', exact: true }).click();
  await expect(mission.getByRole('progressbar')).toHaveAttribute('value', '0');
  await expect(mission.getByRole('textbox').first()).toHaveValue('');
  await expect(reset).toBeFocused();
});
test('exploration checklist preserves status and has a working reset', async ({ page }) => {
  await page.goto(route);
  const section = page.getByRole('region', { name: 'Explore the work behind a project' });
  const first = section.getByRole('checkbox').first();
  await first.check();
  await expect(section.getByRole('status')).toContainText('1 of');
  await expect(section.getByRole('link').first()).toHaveAttribute('href', /^\/work\//);
  await section.getByRole('button', { name: 'Reset exploration checklist' }).click();
  await expect(first).not.toBeChecked();
  await expect(section.getByRole('status')).toContainText('0 of');
});
test('learning uses real check answers, supports keyboard and resets on path change', async ({ page }) => {
  await page.goto(route);
  const section = page.getByRole('region', { name: 'Follow a learning path' });
  const first = lessons.find(item => item.slug === learningPaths[1].slugs[0])!;
  const answer = section.getByRole('radio', { name: first.check.choices[first.check.answer], exact: true });
  await answer.focus();
  await answer.press('Space');
  await expect(section.getByRole('status').first()).toContainText('1 of');
  await expect(section.getByRole('status').last()).toContainText('Practice check passed.');
  await section.getByRole('button', { name: 'Reset practice answers' }).click();
  await expect(answer).not.toBeChecked();
  await answer.check();
  await section.getByRole('combobox').selectOption('0');
  await expect(section.getByRole('status').first()).toContainText('0 of');
  await section.getByRole('combobox').selectOption('1');
  await expect(section.getByRole('status').first()).toContainText('0 of');
});
test('optional graph and native controls fit phone, tablet and desktop', async ({ page }) => {
  await page.goto(route);
  const section = page.getByRole('region', { name: 'Follow a learning path' });
  await section.getByText('Show the optional path map', { exact: true }).click();
  await expect(section.locator('.react-flow')).toBeVisible();
  await expect(section.getByRole('button', { name: /^1\./ })).toBeVisible();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
