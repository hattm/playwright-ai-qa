/* | Trường | Nội dung | TC-TI-008
|---|---|
| **Test Suite** | Kiểm tra trang Checkboxes https://the-internet.herokuapp.com/checkboxes |
| **Test Case ID** | TC-TI-008 |
| **Test Name** | Tích và bỏ tích checkbox |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở https://the-internet.herokuapp.com/checkboxes, chờ load xong |
| **Step 2** | Trang có 2 checkbox: checkbox 1 (mặc định CHƯA tích), checkbox 2 (mặc định ĐÃ tích) |
| **Step 3** | Tích vào checkbox 1 |
| **Step 4** | Bỏ tích checkbox 2 |
| **Expected** | Sau thao tác: checkbox 1 phải ở trạng thái ĐÃ tích, checkbox 2 phải ở trạng thái CHƯA tích |
| **PASS ví dụ** | checkbox 1 = checked, checkbox 2 = unchecked |
| **FAIL ví dụ** | checkbox 1 vẫn unchecked / checkbox 2 vẫn checked | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
//
// ⭐ PATTERN MỚI bài này (lần đầu học):
//   - page.getByRole('checkbox')          → tìm các ô checkbox theo role
//   - .nth(0) / .nth(1)                    → chọn phần tử thứ 0, thứ 1 (vì có 2 cái giống nhau)
//   - await checkbox.check();              → TÍCH vào ô (chỉ tích nếu đang chưa tích)
//   - await checkbox.uncheck();            → BỎ tích ô
//   - await expect(checkbox).toBeChecked();        → assert: ô đang ĐƯỢC tích
//   - await expect(checkbox).not.toBeChecked();    → assert: ô KHÔNG được tích (thêm .not)
//
// Pattern CŨ vẫn dùng: import, test.describe, test.beforeEach + goto
//
// Gợi ý khung:
//   const cb1 = page.getByRole('checkbox').nth(0);
//   const cb2 = page.getByRole('checkbox').nth(1);
//   ... check / uncheck ...
//   ... expect ...
import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang Checkboxes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
    });
    test('Tích và bỏ tích checkbox', async ({ page }) => {
        const cb1 = page.getByRole('checkbox').nth(0);
        const cb2 = page.getByRole('checkbox').nth(1);
        await cb1.check();
        await cb2.uncheck();
        await expect(cb1).toBeChecked();
        await expect(cb2).not.toBeChecked();
    });

});