import { test, expect } from '@playwright/test';

test.describe('https://playwright.dev - homepage checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test('page title contains "Playwright"', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('hero area mentions end-to-end testing', async ({ page }) => {
    await expect(page).toHaveTitle(/end-to-end testing/i);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
  });

  test('has a "Get started" link to /docs', async ({ page }) => {
    const link = page.getByRole('link', { name: /get started/i }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/\/docs/);
  });
});
