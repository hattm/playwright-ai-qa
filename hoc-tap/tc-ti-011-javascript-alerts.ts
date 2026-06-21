/* | Trường | Nội dung | TC-TI-011
|---|---|
| **Test Suite** | Kiểm tra trang JavaScript Alerts https://the-internet.herokuapp.com/javascript_alerts |
| **Test Case ID** | TC-TI-011 |
| **Test Name** | Bắt và xử lý 3 loại popup: Alert / Confirm / Prompt |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở https://the-internet.herokuapp.com/javascript_alerts, chờ load xong |
| **Step 2** | Trang có 3 nút: "Click for JS Alert", "Click for JS Confirm", "Click for JS Prompt". Bên dưới có ô #result hiển thị kết quả. |

  --- TC-011a: JS Alert (popup chỉ có nút OK) ---
| **Step 3** | Bấm nút "Click for JS Alert" → hiện popup → bấm OK (accept) |
| **Expected a** | Ô #result hiển thị: "You successfully clicked an alert" |

  --- TC-011b: JS Confirm (popup có OK và Cancel) ---
| **Step 4** | Bấm nút "Click for JS Confirm" → hiện popup → bấm Cancel (dismiss) |
| **Expected b** | Ô #result hiển thị: "You clicked: Cancel" |

  --- TC-011c: JS Prompt (popup cho nhập chữ) ---
| **Step 5** | Bấm nút "Click for JS Prompt" → hiện popup → NHẬP chữ "Xin chao" rồi bấm OK |
| **Expected c** | Ô #result hiển thị: "You entered: Xin chao" |

| **PASS ví dụ** | Cả 3 ô #result hiển thị đúng câu mong đợi ở trên |
| **FAIL ví dụ** | #result rỗng / sai chữ / test bị treo vì không bắt được popup | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
//
// ⭐ PATTERN MỚI bài này (lần đầu học — QUAN TRỌNG):
//
//   Popup của trình duyệt KHÔNG phải phần tử HTML bình thường → KHÔNG click bằng locator được.
//   Phải "đăng ký người xử lý popup" TRƯỚC, rồi mới bấm nút làm hiện popup.
//
//   - page.once('dialog', async dialog => { ... });   → ĐĂNG KÝ xử lý 1 popup sắp hiện
//        (dùng .once = chỉ bắt 1 lần; nếu .on = bắt mọi lần — bài này .once gọn hơn)
//
//   Trong { ... } chọn 1 trong các cách:
//   - await dialog.accept();              → bấm OK (cho Alert / Confirm)
//   - await dialog.dismiss();             → bấm Cancel (cho Confirm)
//   - await dialog.accept('Xin chao');    → NHẬP chữ rồi bấm OK (cho Prompt)
//   - dialog.message();                   → (tùy chọn) đọc nội dung câu hỏi trong popup
//
//   - page.getByRole('button', { name: 'Click for JS Alert' })   → nút mở popup
//   - page.locator('#result')                                    → ô hiển thị kết quả
//   - await expect(result).toHaveText('...');                    → assert chữ trong #result
//
//   ⚠️ THỨ TỰ BẮT BUỘC: đăng ký page.once('dialog', ...) XONG rồi mới .click() nút.
//      Nếu click trước thì Playwright tự đóng popup (mặc định dismiss) → kết quả sai.
//
// Pattern CŨ vẫn dùng: import, test.describe, test.beforeEach + goto, getByRole, expect
//
// Gợi ý khung cho 1 test (TC-011a Alert):
//   test('JS Alert - bam OK', async ({ page }) => {
//     page.once('dialog', async dialog => {
//       await dialog.accept();
//     });
//     await page.getByRole('button', { name: 'Click for JS Alert' }).click();
//     await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
//   });
//
// → Làm tương tự cho TC-011b (Confirm + dismiss) và TC-011c (Prompt + accept('Xin chao')).
//   Nên tách thành 3 test('...') riêng trong cùng 1 test.describe.

import { test, expect } from '@playwright/test';

test.describe('Kiểm tra trang JavaScript Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  });
  test('JS Alert - bấm OK', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('JS Confirm - bấm Cancel', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('JS Prompt- popup cho nhập chữ', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.accept('Xin chao');
    });
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: Xin chao');
  });

});
