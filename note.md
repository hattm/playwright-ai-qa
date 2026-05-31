# Khung sườn file test Playwright — Giải thích từng dòng

> 
## Ghi nhớ khung sườn (luôn đúng thứ tự này)

```
import          →  lấy công cụ                  🔒
describe        →  tạo folder nhóm TC           ✏️ tên
  beforeEach    →  precondition chung           ✏️ URL
  test          →  1 test case                  ✏️ tên TC
    fill/click  →  Step / Action                ✏️ selector + data
    expect      →  Expected / Verify            ✏️ kết quả mong đợi
```

---

## Đối chiếu: TC manual ⇄ Playwright

/*import { test, expect } from '@playwright/test';
test.describe('Tên test suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('URL');

    });
    test('Tên Test Name', async ({ page }) => {
        const linkCount = page.xxx()
        await expect(page).toHaveTitle(xxx);

    });
});*/

**Quy ước:** 🔒 = chép y chang mọi file · ✏️ = sửa theo TC của bạn

## Đọc code kèm giải thích ngay tại dòng

```typescript
import { test, expect } from '@playwright/test';
// 🔒 Lấy công cụ ra dùng. Chép y chang, file nào cũng có dòng đầu này.
//    test = để viết test case | expect = để kiểm tra kết quả


test.describe('Login flow', () => {// Test Suite
// 🔒 test.describe(  → lệnh tạo folder function gom nhóm các TC
// ✏️ 'Login flow'    → tên nhóm, đổi theo chức năng đang test hay gọi là testsuite (vd: 'Đăng nhập')
// 🔒 , () => {        → mở ngoặc chứa nội dung bên trong


    test.beforeEach(async ({ page }) => {// Precondition chung
    // 🔒 test.beforeEach(        → chạy TRƯỚC mỗi TC bên dưới (Playwright tự mở Chrome)
    // 🔒 async ({ page }) => {    → 'page' là cái tab Chrome, Playwright tự đưa vào

        await page.goto('https://app.example.com/login');
        // 🔒 await page.goto(            → lệnh "vào trang"
        // ✏️ 'https://app.example.com/login' → URL trang cần test, đổi theo trang của bạn

    });
    // 🔒 đóng beforeEach
    // 💡 beforeEach = "việc làm trước mỗi TC". Viết 1 lần ở đây, khỏi lặp lại ở từng TC.


    test('Login sai password hiển thị error và giữ ở trang login', async ({ page }) => { 
    // 🔒 test(                          → khai báo một test case
    // ✏️ 'Login sai password...'        → tên TC, đặt theo TC của bạn
    // 🔒 , async ({ page }) => {         → nhận lại tab Chrome từ beforeEach


        // ===== Step (Action) =====
        await page.fill('#username', 'admin');
        // 🔒 await page.fill(   → lệnh "điền chữ vào ô"
        // ✏️ '#username'        → địa chỉ ô (selector), đổi theo trang thật
        // ✏️ 'admin'            → chữ cần gõ vào, đổi theo test data
        // 💡 đọc là: tìm ô id 'username', gõ vào chữ 'admin'

        await page.fill('#password', 'wrong999');
        // ✏️ '#password' → ô mật khẩu | 'wrong999' → mật khẩu sai để test

        await page.click('#submit');
        // 🔒 await page.click( → lệnh "bấm nút"
        // ✏️ '#submit'         → địa chỉ nút bấm, đổi theo trang thật


        // ===== Expected (Verify) =====
        await expect(page.locator('.error')).toHaveText('Invalid credentials');
        // 🔒 await expect(page.locator(  → tìm 1 phần tử trên trang để kiểm tra
        // ✏️ '.error'                    → địa chỉ chỗ hiện lỗi, đổi theo trang
        // 🔒 )).toHaveText(              → "phần tử đó phải có chữ đúng như..."
        // ✏️ 'Invalid credentials'       → chữ mong đợi, đổi theo expected

        await expect(page).toHaveURL(/login/);
        // 🔒 await expect(page).toHaveURL( → "URL hiện tại phải khớp..."
        // ✏️ /login/                       → chữ cần có trong URL, đổi theo expected

    });
    // 🔒 đóng test case

});
// 🔒 đóng describe
```

---

## 🔑 Phân biệt selector (chỗ dễ nhầm nhất)

Để ý **dấu đầu tiên** của địa chỉ phần tử:

| Viết | Nghĩa | HTML tương ứng |
|------|-------|----------------|
| `'#submit'` | dấu `#` = tìm theo **id** | `<button id="submit">` |
| `'.error'` | dấu `.` = tìm theo **class** | `<div class="error">` |

---


Khung này giống hệt cách viết TC trên Excel, chỉ là viết bằng code.

---

## Một số lệnh hay dùng thêm (tham khảo nhanh)

| Lệnh | Việc nó làm |
|------|-------------|
| `await page.goto(url)` | Vào một trang |
| `await page.fill(sel, text)` | Điền chữ vào ô |
| `await page.click(sel)` | Bấm nút / link |
| `await page.locator(sel)` | Tìm một phần tử trên trang |
| `expect(...).toHaveText(text)` | Kiểm tra phần tử có đúng chữ |
| `expect(...).toBeVisible()` | Kiểm tra phần tử có hiển thị |
| `expect(page).toHaveURL(...)` | Kiểm tra URL hiện tại |
| `expect(page).toHaveTitle(...)` | Kiểm tra tiêu đề tab |
