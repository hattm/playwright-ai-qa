import { test, expect } from '@playwright/test';

test.describe('https://the-internet.herokuapp.com - index page checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
  });

  test('page title contains "The Internet"', async ({ page }) => {
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('has <h1> with text "Welcome to the-internet"', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Welcome to the-internet');
  });

  test('has at least 30 links on the index page', async ({ page }) => {
    const linkCount = await page.locator('a').count();
    expect(linkCount).toBeGreaterThanOrEqual(30);
  });
});
