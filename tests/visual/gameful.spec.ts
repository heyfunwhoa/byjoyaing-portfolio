import { expect, test } from '@playwright/test';
import { lessons } from '../../lib/ai-academy';
import { learningPaths } from '../../lib/academy/learning-paths';
const route = '/iframe.html?id=design-lab-gameful-workbench--overview&viewMode=story';
test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole('heading', { name: 'Make progress visible' })).toBeVisible();
});
test('mission reviews invalidate on edit, cancel preserves work and reset clears it', async ({ page }) => {
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
  const section = page.getByRole('region', { name: 'Follow a learning path' });
  await section.getByText('Show the optional path map', { exact: true }).click();
  await expect(section.locator('.react-flow')).toBeVisible();
  await expect(section.getByRole('button', { name: /^1\./ })).toBeVisible();
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test('scripted discovery has consequences and a clean restart', async ({ page }) => {
  await page.getByRole('button', { name: 'Start a discovery conversation' }).press('Enter');
  const scene = page.getByRole('region', { name: 'Practice a discovery conversation' });
  await expect(scene.getByRole('heading')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(scene.getByRole('button', { name: 'Ask what changed and how onboarding works today.' })).toBeFocused();
  await scene.getByRole('button', { name: 'Offer a demo immediately.' }).click();
  await expect(scene).toContainText('A demo invitation is not evidence');
  await scene.getByRole('button', { name: 'Return to discovery.' }).click();
  await scene.getByRole('button', { name: 'Ask the service owner to measure a sample of recent onboardings.' }).click();
  await scene.getByRole('button', { name: 'Identify the service owner, technical evaluator and budget approver.' }).click();
  await scene.getByRole('button', { name: 'Propose one workflow with a baseline, owner and agreed success measure.' }).click();
  await expect(scene.getByRole('status')).toContainText('Conversation complete');
  await expect(scene).toContainText('Their approval is still unconfirmed');
  await scene.getByRole('button', { name: 'Restart conversation' }).click();
  await expect(scene.getByRole('listitem')).toHaveCount(1);
});

test('hex map and quiz support keyboard, scoring, reset and narrow screens', async ({ page }) => {
  await page.getByRole('button', { name: 'Explore learning territories and quizzes' }).click();
  const territory = page.getByRole('region', { name: 'Explore a learning territory', exact: true });
  const pathIndex = learningPaths.findIndex(path => path.id === 'foundations');
  expect(pathIndex).toBeGreaterThanOrEqual(0);
  const path = learningPaths[pathIndex];
  const questionCount = path.slugs.length;
  const tile = territory.getByRole('button', { name: `Territory ${pathIndex + 1}: ${path.title}`, exact: true });
  await tile.focus(); await tile.press('Enter');
  const quiz = territory.getByRole('region', { name: `${path.title}: practice challenge` });
  for (let i = 0; i < path.slugs.length; i++) {
    const lesson = lessons.find(item => item.slug === path.slugs[i])!;
    const answer = quiz.getByRole('radio', { name: lesson.check.choices[lesson.check.answer], exact: true });
    await answer.focus(); await answer.press('Space');
    await expect(quiz.getByRole('status')).toContainText('Correct.');
    await quiz.getByRole('button', { name: i === path.slugs.length - 1 ? 'Finish challenge' : 'Next question' }).click();
  }
  await expect(quiz).toContainText(`Attempt complete: ${questionCount} of ${questionCount} correct.`);
  await quiz.getByRole('button', { name: 'Restart challenge' }).click();
  await expect(quiz).toContainText(`Question 1 of ${questionCount}`);
  await expect(quiz.getByRole('radio', { checked: true })).toHaveCount(0);
  const first = lessons.find(item => item.slug === path.slugs[0])!;
  await quiz.getByRole('radio').nth((first.check.answer + 1) % first.check.choices.length).check();
  await expect(quiz.getByRole('status')).toContainText('Not quite.');
  await territory.getByRole('button', { name: `1. ${learningPaths[0].title}`, exact: true }).click();
  await territory.getByRole('button', { name: `${pathIndex + 1}. ${path.title}`, exact: true }).click();
  await expect(quiz).toContainText(`Question 1 of ${questionCount}`);
  await expect(quiz.getByRole('radio', { checked: true })).toHaveCount(0);
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

// Exercise every jump with a keyboard; preserve in-progress notes while navigating.
test('prototype chooser reaches every destination without clearing practice', async ({ page }) => {
  const chooser = page.getByRole('navigation', { name: 'Choose what to try' });
  const note = page.getByRole('region', { name: 'Build an opportunity brief' }).getByRole('textbox').first();
  await note.fill('Fictional note retained while exploring');
  for (const link of await chooser.getByRole('link').all()) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    await link.focus();
    await link.press('Enter');
    const target = page.locator(`[id="${href!.slice(1)}"]`);
    await expect(target).toBeFocused();
    await expect(target).toBeInViewport();
  }
  await expect(note).toHaveValue('Fictional note retained while exploring');
});
