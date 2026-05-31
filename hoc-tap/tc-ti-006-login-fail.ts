/* | Trường | Nội dung | TC-TI-006
|---|---|
| **Test Suite** | Kiểm tra trang đăng nhập https://the-internet.herokuapp.com/login |
| **Test Case ID** | TC-TI-006 |
| **Test Name** | Đăng nhập thất bại với password sai |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com/login vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhập `tomsmith` vào ô Username (username ĐÚNG) |
| **Step 4** | Nhập `SaiPassword123` vào ô Password (password SAI) |
| **Step 5** | Click nút Login |
| **Step 6** | Nhìn lên trang, kiểm tra banner đỏ xuất hiện và nội dung chữ |
| **Expected** | Trang phải hiện banner ĐỎ chứa chữ "Your password is invalid!" và vẫn ở trang /login |
| **PASS ví dụ** | Sau khi click Login, banner đỏ hiện chữ "Your password is invalid!" |
| **FAIL ví dụ** | Banner không hiện / hiện chữ khác / trang chuyển sang /secure | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
// Gõ xong, paste lại toàn bộ code lên chat → tôi sẽ review, chỉ chỗ sai (nếu có).
//
// Gợi ý: BÀI NÀY dùng lại đúng 4 pattern bạn vừa học ở TC-TI-005:
//   - test.describe / test.beforeEach / goto
//   - getByLabel('Username') / getByLabel('Password') → fill(...)
//   - getByRole('button', { name: 'Login' }) → click()
//   - page.locator('#flash') + expect(...).toContainText('...')
//
// Khác biệt duy nhất: password nhập SAI, và chữ trong banner kiểm tra là
//   "Your password is invalid!"  (không phải "You logged into a secure area!")

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang đăng nhập sai mật khẩu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
    });
    test('Đăng nhập thất bại với password sai', async ({ page }) => {
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SaiPassword123');
        await page.getByRole('button', { name: 'Login' }).click();
        const banner = page.locator('#flash');
        await expect(banner).toContainText('Your password is invalid!');
    });
});