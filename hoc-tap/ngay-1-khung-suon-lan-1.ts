
/* Trường | Nội dung |
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
| **FAIL ví dụ** | Không có H1, có 2 H1, hoặc chữ H1 khác | */

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang index có chữ Welcome to the-internet', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');

    });
    test('kiếm tra chữ H có đúng chữ Welcome to the-internet', async ({ page }) => {

   
 });

});


