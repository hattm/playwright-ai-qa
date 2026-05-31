/* | Trường | Nội dung | TC-EX-001
|---|---|
| **Test Suite** | Kiểm tra trang https://example.com |
| **Test Case ID** | TC-EX-001 |
| **Test Name** | Trang có đúng 1 thẻ h1, nội dung thẻ h1 là chữ "Example Domain" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://example.com vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Đếm trên trang có bao nhiêu thẻ h1 |
| **Step 4** | Nhìn nội dung chữ bên trong thẻ h1 đó |
| **Expected** | Trên trang có đúng 1 thẻ h1, và nội dung thẻ h1 là chữ "Example Domain" |
| **PASS ví dụ** | Trang example.com hiện ra, có 1 thẻ h1 với chữ "Example Domain" |
| **FAIL ví dụ** | Trang không có thẻ h1 nào, hoặc thẻ h1 có chữ khác "Example Domain" | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
// Gõ xong, paste lại toàn bộ code lên chat → tôi sẽ compare với bản mẫu, chỉ chỗ sai (nếu có).
import { test, expect } from '@playwright/test';
test.describe('Kiểm tra page example', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com');
    });
    test('Trang có đúng 1 thẻ h1, nội dung thẻ h1 là chữ "Example Domain"', async ({ page }) => {
        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
        await expect(h1).toHaveText('Example Domain');

    });
});