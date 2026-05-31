/* | Trường | Nội dung | TC-TI-004
|---|---|
| **Test Suite** | Kiểm tra trang https://the-internet.herokuapp.com |
| **Test Case ID** | TC-TI-004 |
| **Test Name** | Click vào link "A/B Testing" thì URL phải chứa chữ "/abtest" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://the-internet.herokuapp.com vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Tìm link có chữ "A/B Testing" trên trang |
| **Step 4** | Click vào link đó |
| **Step 5** | Nhìn lên thanh địa chỉ trình duyệt, xem URL mới là gì |
| **Expected** | URL trình duyệt sau khi click phải chứa chữ "/abtest" |
| **PASS ví dụ** | Click vào "A/B Testing" → URL biến từ https://the-internet.herokuapp.com thành https://the-internet.herokuapp.com/abtest |
| **FAIL ví dụ** | Click vào link mà URL không đổi, hoặc URL mới không chứa "/abtest" | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
// Gõ xong, paste lại toàn bộ code lên chat → tôi sẽ compare với bản mẫu, chỉ chỗ sai (nếu có).
//
// Gợi ý 2 pattern mới (lần đầu học):
//   - await page.getByRole('link', { name: '...' }).click();
//   - await expect(page).toHaveURL(/.../);

/*┌───────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────┐
│                      Manual                       │                              Code                              │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Precondition — Lấy công cụ ra dùng                │ import { test, expect } from '@playwright/test';               │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Precondition — Tạo folder nhóm TC                 │ test.describe('...', () => {                                   │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Step 1 — Mở Chrome                                │ test.beforeEach(async ({ page }) => {                          │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Step 2 — Vào the-internet, chờ load               │ await page.goto('https://the-internet.herokuapp.com');         │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Khai báo TC-TI-004 bắt đầu chạy                   │ test('TC-TI-004: ...', async ({ page }) => {                   │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Step 3 + Step 4 — Tìm link "A/B Testing" và click │ await page.getByRole('link', { name: 'A/B Testing' }).click(); │
├───────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ Step 5 + Expected — URL phải chứa "/abtest"       │ await expect(page).toHaveURL(/\/abtest/);                      │
└───────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────┘*/
import { test, expect } from '@playwright/test';
test.describe('Kiểm tra trang the internet', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com');
    });
    test('Click vào link "A/B Testing" thì URL phải chứa chữ "abtest"', async ({ page }) => {
        await page.getByRole('link', { name: 'A/B Testing' }).click();
        await expect(page).toHaveURL(/abtest/);
    });
});