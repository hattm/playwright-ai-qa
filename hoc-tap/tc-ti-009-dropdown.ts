/* | Trường | Nội dung | TC-TI-009
|---|---|
| **Test Suite** | Kiểm tra trang Dropdown https://the-internet.herokuapp.com/dropdown |
| **Test Case ID** | TC-TI-009 |
| **Test Name** | Chọn option trong dropdown |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở https://the-internet.herokuapp.com/dropdown, chờ load xong |
| **Step 2** | Trang có 1 dropdown (id=dropdown), mặc định đang ở "Please select an option" |
| **Step 3** | Chọn "Option 1" trong dropdown |
| **Step 4** | Kiểm tra: dropdown đang chọn Option 1 (value = "1") |
| **Step 5** | Chọn tiếp "Option 2" trong dropdown |
| **Step 6** | Kiểm tra: dropdown đang chọn Option 2 (value = "2") |
| **Expected** | Sau mỗi lần chọn, dropdown phải hiển thị đúng option vừa chọn |
| **PASS ví dụ** | Chọn Option 1 → value "1"; chọn Option 2 → value "2" |
| **FAIL ví dụ** | Sau khi chọn, value vẫn rỗng / sai giá trị | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
//
// ⭐ PATTERN MỚI bài này (lần đầu học):
//   - page.locator('#dropdown')                    → tìm thẻ <select> theo id
//   - await dropdown.selectOption('1');            → CHỌN option theo VALUE = "1"
//        (cách khác: selectOption({ label: 'Option 1' }) → chọn theo CHỮ hiển thị)
//   - await expect(dropdown).toHaveValue('1');     → assert: dropdown đang ở value "1"
//
// Pattern CŨ vẫn dùng: import, test.describe, test.beforeEach + goto, expect
//
// Gợi ý khung:
//   const dropdown = page.locator('#dropdown');
//   await dropdown.selectOption('1');
//   await expect(dropdown).toHaveValue('1');
//   ... rồi làm tương tự cho Option 2 ...

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang Dropdown', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/dropdown');
    });
    test('Chọn option trong dropdown', async ({ page }) => {
        const dropdown = page.locator('#dropdown');
        await dropdown.selectOption('1');
        await expect(dropdown).toHaveValue('1');
        await dropdown.selectOption('2');
        await expect(dropdown).toHaveValue('2');
    });
});