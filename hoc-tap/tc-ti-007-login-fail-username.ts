/* | Trường | Nội dung | TC-TI-007
|---|---|
| **Test Suite** | Kiểm tra trang đăng nhập https://the-internet.herokuapp.com/login |
| **Test Case ID** | TC-TI-007 |
| **Test Name** | Đăng nhập thất bại với username sai |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com/login vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhập `saiuser` vào ô Username (username SAI) |
| **Step 4** | Nhập `SuperSecretPassword!` vào ô Password (password đúng) |
| **Step 5** | Click nút Login |
| **Step 6** | Nhìn lên trang, kiểm tra banner đỏ xuất hiện và nội dung chữ |
| **Expected** | Trang phải hiện banner ĐỎ chứa chữ "Your username is invalid!" và vẫn ở trang /login |
| **PASS ví dụ** | Sau khi click Login, banner đỏ hiện chữ "Your username is invalid!" |
| **FAIL ví dụ** | Banner không hiện / hiện chữ khác / trang chuyển sang /secure | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
// Gõ xong, paste lại toàn bộ code lên chat → tôi sẽ review, chỉ chỗ sai (nếu có).
//
// Gợi ý: BÀI NÀY giống hệt TC-TI-006, dùng lại đúng các pattern bạn đã thạo:
//   - test.describe('title', () => { ... })   (nhớ: title ở describe, KHÔNG để async)
//   - test.beforeEach(async ({ page }) => { await page.goto(...) })
//   - getByLabel('Username') / getByLabel('Password') → fill(...)
//   - getByRole('button', { name: 'Login' }) → click()
//   - page.locator('#flash') + expect(...).toContainText('...')
//
// Khác biệt: lần này USERNAME nhập sai, và chữ banner kiểm tra là
//   "Your username is invalid!"

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang đăng nhập', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
    });
    test('Đăng nhập thất bại với username sai', async ({ page }) => {
        await page.getByLabel('Username').fill('saiuser');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        const banner = page.locator('#flash');
        await expect(banner).toContainText('Your username is invalid!');
    });
});