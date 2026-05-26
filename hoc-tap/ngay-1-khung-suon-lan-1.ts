/*import { test, expect } from '@playwright/test';
test.describe('the Internet- index page', () => {
    test.beforeEach('the-internet.herokuapp.com "The Internet"', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');
    });
    test('page title contain "The Internet', async ({ page }) => {
        await expect(page).toHaveTitle(/The Internet/);
    })
});*/

import { test, expect } from '@playwright/test';
test.describe('Wellcom to the internet - index page', () => {
    test.beforeEach('Welcome to the-internet', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');
    });
    test('Count Title H1', async ({ page }) => {

    });
});

