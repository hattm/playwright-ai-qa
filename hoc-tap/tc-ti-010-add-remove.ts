/* | Trường | Nội dung | TC-TI-010
|---|---|
| **Test Suite** | Kiểm tra trang Add/Remove Elements https://the-internet.herokuapp.com/add_remove_elements/ |
| **Test Case ID** | TC-TI-010 |
| **Test Name** | Thêm và xóa phần tử |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở https://the-internet.herokuapp.com/add_remove_elements/, chờ load xong |
| **Step 2** | Trang có nút "Add Element". Ban đầu chưa có nút "Delete" nào |
| **Step 3** | Click nút "Add Element" 3 lần |
| **Step 4** | Kiểm tra: có đúng 3 nút "Delete" xuất hiện |
| **Step 5** | Click 1 nút "Delete" (nút đầu tiên) |
| **Step 6** | Kiểm tra: còn lại đúng 2 nút "Delete" |
| **Expected** | Mỗi lần Add tạo thêm 1 nút Delete; mỗi lần Delete xóa bớt 1 nút |
| **PASS ví dụ** | Add 3 lần → 3 nút Delete; xóa 1 → còn 2 nút Delete |
| **FAIL ví dụ** | Số nút Delete không khớp (vd add 3 lần nhưng chỉ có 2) | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
//
// ⭐ PATTERN MỚI bài này (lần đầu học):
//   - Click NHIỀU LẦN: gọi .click() lặp lại (hoặc dùng vòng lặp for)
//   - page.getByRole('button', { name: 'Delete' })   → tìm TẤT CẢ nút Delete (nhiều nút cùng tên)
//   - await expect(deleteButtons).toHaveCount(3);     → assert: ĐẾM có đúng 3 nút
//   - deleteButtons.first()                           → lấy nút Delete ĐẦU TIÊN để click
//
// Pattern CŨ vẫn dùng: import, test.describe, test.beforeEach + goto,
//                      getByRole('button', { name: '...' }).click(), expect
//
// Gợi ý khung:
//   const addBtn = page.getByRole('button', { name: 'Add Element' });
//   await addBtn.click();   // lặp 3 lần (hoặc dùng for)
//   const deleteButtons = page.getByRole('button', { name: 'Delete' });
//   await expect(deleteButtons).toHaveCount(3);
//   await deleteButtons.first().click();
//   await expect(deleteButtons).toHaveCount(2);

import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang Add/Remove Elements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    });
    test('Thêm và xóa phần tử', async ({ page }) => {
        const addBtn = page.getByRole('button', { name: 'Add Element' });
        await addBtn.click();
        await addBtn.click();
        await addBtn.click();
        const deleteButtons = page.getByRole('button', { name: 'Delete' })
        await expect(deleteButtons).toHaveCount(3);
        await deleteButtons.first().click();
        await expect(deleteButtons).toHaveCount(2);

    });

});