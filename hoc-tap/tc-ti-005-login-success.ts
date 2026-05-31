/* | Trường | Nội dung | TC-TI-005
|---|---|
| **Test Suite** | Kiểm tra trang đăng nhập https://the-internet.herokuapp.com/login |
| **Test Case ID** | TC-TI-005 |
| **Test Name** | Đăng nhập thành công với username và password hợp lệ |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com/login vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhập `tomsmith` vào ô Username |
| **Step 4** | Nhập `SuperSecretPassword!` vào ô Password |
| **Step 5** | Click nút Login |
| **Step 6** | Nhìn lên trang, kiểm tra banner xuất hiện và nội dung chữ |
| **Expected** | Trang phải hiện banner xanh chứa chữ "You logged into a secure area!" |
| **PASS ví dụ** | Sau khi click Login, trang chuyển sang /secure và banner xanh hiện chữ "You logged into a secure area!" |
| **FAIL ví dụ** | Sau khi click Login, không thấy banner xanh / banner hiện chữ khác / trang vẫn ở /login | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
// Gõ xong, paste lại toàn bộ code lên chat → tôi sẽ compare với bản mẫu, chỉ chỗ sai (nếu có).
//
// Gợi ý 4 pattern mới (lần đầu học):
//   - await page.getByLabel('...').fill('...');          // gõ chữ vào ô input
//   - await page.getByRole('button', { name: '...' }).click();   // click button
//   - const banner = page.locator('#flash');             // tìm element theo ID
//   - await expect(banner).toContainText('...');         // assert text CHỨA chuỗi

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang đăng nhập', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
    });
    test('Đăng nhập thành công với username và password hợp lệ', async ({ page }) => {
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        const banner = page.locator('#flash');
        await expect(banner).toContainText('You logged into a secure area!');
    });
})

