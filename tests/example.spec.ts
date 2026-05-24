import { test, expect } from '@playwright/test';

test.describe('https://example.com - basic content checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('page title contains "Example"', async ({ page }) => {
    await expect(page).toHaveTitle(/Example/);
  });

  test('has <h1> with text "Example Domain"', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Example Domain');
  });

  test('has a "Learn more" link pointing to another page', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Learn more' });
    await expect(link).toBeVisible();

    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    const currentHost = new URL(page.url()).host;
    const linkHost = new URL(href!, page.url()).host;
    expect(linkHost).not.toBe(currentHost);
  });
});
