
/* | Trường | Nội dung | TC03
|---|---|
| **Test Suite** | Kiểm tra trang index https://the-internet.herokuapp.com |
| **Test Case ID** | TC-TI-003 |
| **Test Name** | Trang index có ít nhất 30 link |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Đếm toàn bộ link (`<a>`) trên trang |
| **Expected** | Số link đếm được phải từ 30 trở lên |
| **PASS ví dụ** | Đếm được 46 link → 46 ≥ 30 → PASS |
| **FAIL ví dụ** | Đếm được 5 link → 5 < 30 → FAIL | */

/*import { test, expect } from '@playwright/test';
test.describe('check index page theinternetherokuappcom', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');

    });
    test('Trang index có ít nhất 30 link', async ({ page }) => {
        const linkCount = page.locator('a').count();
        expect(linkCount).toBeGreaterThanOrEqual(30)

    });
});*/

/*| Trường | Nội dung | TC-02
|---|---|
| **Test Suite** | Kiểm tra trang index https://the-internet.herokuapp.com |
| **Test Case ID** | TC-TI-002 |
| **Test Name** | H1 có đúng chữ "Welcome to the-internet" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Đếm số tiêu đề lớn nhất (H1) trên trang |
| **Step 4** | Đọc nội dung chữ của H1 đó |
| **Expected 1** | Trang có đúng 1 H1, không nhiều hơn không ít hơn |
| **Expected 2** | Chữ trong H1 là chính xác "Welcome to the-internet" |
| **PASS ví dụ** | Đúng 1 H1, chữ = "Welcome to the-internet" |
| **FAIL ví dụ** | Không có H1, có 2 H1, hoặc chữ H1 khác |*/

/*import { test, expect } from '@playwright/test';
test.describe('check page index', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');
    });
    test('H1 có đúng chữ "Welcome to the-internet"', async ({ page }) => {
        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
        await expect(h1).toHaveText('Welcome to the-internet');
    });
})
*/

/*| Trường | Nội dung | TC -01
|---|---|
| **Test Suite** | Kiểm tra trang index https://the-internet.herokuapp.com |
| **Test Case ID** | TC-TI-001 |
| **Test Name** | Tiêu đề tab trình duyệt có chứa chữ "The Internet" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhìn lên tiêu đề tab trình duyệt |
| **Expected** | Tiêu đề tab có chứa chữ "The Internet" |
| **PASS ví dụ** | "The Internet" |
| **FAIL ví dụ** | "Google" hoặc bất kỳ title nào không có chữ "The Internet" |*/

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang index', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');
    })
    test('Tiêu đề tab trình duyệt có chứa chữ "The Internet"', async ({ page }) => {
        await expect(page).toHaveTitle(/The Internet/);
    });

});

