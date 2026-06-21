# Checkpoint — Giai đoạn THỰC CHIẾN (TC-TI-004 → 012) — cập nhật 2026-06-21

> File này tổng hợp các bài tập **sau** `CHECKPOINT_WEEK2_session3.md`.
> Từ TC-004 trở đi mỗi bài là **một file `.ts` riêng** trong thư mục `hoc-tap/`
> (không gộp vào 1 file spec như TC-001/002/003).
> Quy trình: TC Manual viết sẵn trong block comment đầu file → mình tự gõ code → Claude review + chạy.

---

## Bảng tổng quan

| TC | Trang | File | Pattern mới | Trạng thái |
|---|---|---|---|---|
| TC-004 | A/B Testing | `tc-ti-004-ab-testing.ts` | click link + kiểm tra URL | ✅ PASS |
| TC-005 | Login (PASS) | `tc-ti-005-login-success.ts` | điền form + đăng nhập đúng | ✅ PASS |
| TC-006 | Login (FAIL - sai password) | `tc-ti-006-login-fail.ts` | kiểm tra báo lỗi | ✅ PASS |
| TC-007 | Login (FAIL - sai username) | `tc-ti-007-login-fail-username.ts` | kiểm tra báo lỗi | ✅ PASS |
| TC-008 | Checkboxes | `tc-ti-008-checkboxes.ts` | tích / bỏ tích | ✅ PASS |
| TC-009 | Dropdown | `tc-ti-009-dropdown.ts` | chọn option | ✅ PASS |
| TC-010 | Add/Remove Elements | `tc-ti-010-add-remove.ts` | đếm phần tử động | ✅ PASS |
| TC-011 | JavaScript Alerts | `tc-ti-011-javascript-alerts.ts` | bắt popup trình duyệt | ✅ PASS (3 test) |
| TC-012 | File Upload | `tc-ti-012-file-upload.ts` | upload file | ✅ PASS |

---

## TC-TI-004 — Click link "A/B Testing" → URL chứa "/abtest"

**Pattern mới:**
- `await page.getByRole('link', { name: 'A/B Testing' }).click();` — tìm link theo chữ rồi click
- `await expect(page).toHaveURL(/abtest/);` — kiểm tra URL hiện tại (dùng regex `/abtest/`, không cần URL đầy đủ)

```typescript
await page.getByRole('link', { name: 'A/B Testing' }).click();
await expect(page).toHaveURL(/abtest/);
```

🔑 Ghi nhớ: `toHaveURL` nhận **regex** (`/.../`) → chỉ cần URL *chứa* đoạn đó là PASS.

---

## TC-TI-005 — Đăng nhập THÀNH CÔNG

**Pattern mới:**
- `await page.getByLabel('Username').fill('tomsmith');` — gõ chữ vào ô input (tìm theo nhãn)
- `await page.getByRole('button', { name: 'Login' }).click();` — click nút
- `const banner = page.locator('#flash');` — tìm element theo id
- `await expect(banner).toContainText('...');` — kiểm tra text *chứa* chuỗi

```typescript
await page.getByLabel('Username').fill('tomsmith');
await page.getByLabel('Password').fill('SuperSecretPassword!');
await page.getByRole('button', { name: 'Login' }).click();
const banner = page.locator('#flash');
await expect(banner).toContainText('You logged into a secure area!');
```

Tài khoản test: `tomsmith` / `SuperSecretPassword!`

---

## TC-TI-006 & 007 — Đăng nhập THẤT BẠI

Cùng pattern TC-005, chỉ đổi dữ liệu nhập + chữ mong đợi:
- **TC-006** (sai password): banner chứa `"Your password is invalid!"`
- **TC-007** (sai username): banner chứa `"Your username is invalid!"`

🔑 Ghi nhớ: cùng 1 trang có thể có nhiều TC — đúng/sai chỉ khác **dữ liệu nhập** và **expected**.

---

## TC-TI-008 — Checkboxes (tích / bỏ tích)

**Pattern mới:**
- `page.getByRole('checkbox').nth(0)` — chọn phần tử thứ 0 (vì có 2 checkbox giống nhau → dùng `.nth()` để phân biệt)
- `await cb.check();` — tích (chỉ tích nếu đang chưa tích)
- `await cb.uncheck();` — bỏ tích
- `await expect(cb).toBeChecked();` / `.not.toBeChecked()` — kiểm tra trạng thái

```typescript
const cb1 = page.getByRole('checkbox').nth(0);
const cb2 = page.getByRole('checkbox').nth(1);
await cb1.check();
await cb2.uncheck();
await expect(cb1).toBeChecked();
await expect(cb2).not.toBeChecked();
```

---

## TC-TI-009 — Dropdown (chọn option)

**Pattern mới:**
- `page.locator('#dropdown')` — tìm thẻ `<select>` theo id
- `await dropdown.selectOption('1');` — chọn option theo **value** (hoặc `{ label: 'Option 1' }` theo chữ)
- `await expect(dropdown).toHaveValue('1');` — kiểm tra value đang chọn

```typescript
const dropdown = page.locator('#dropdown');
await dropdown.selectOption('1');
await expect(dropdown).toHaveValue('1');
```

⚠️ Lỗi từng mắc: nhầm `toHaveValue('value 1')` thay vì `'1'` — value là chuỗi `"1"`, KHÔNG kèm chữ "value". Phân biệt **value** (mã ngầm "1") vs **label** (chữ hiển thị "Option 1").

---

## TC-TI-010 — Add/Remove Elements (phần tử động)

**Pattern mới:**
- Click nhiều lần: gọi `.click()` lặp lại
- `page.getByRole('button', { name: 'Delete' })` — locator này giữ **cả nhóm** nút Delete
- `await expect(deleteButtons).toHaveCount(3);` — đếm số lượng
- `await deleteButtons.first().click();` — lấy nút đầu tiên

```typescript
const addBtn = page.getByRole('button', { name: 'Add Element' });
await addBtn.click();
await addBtn.click();
await addBtn.click();
const deleteButtons = page.getByRole('button', { name: 'Delete' });
await expect(deleteButtons).toHaveCount(3);
await deleteButtons.first().click();
await expect(deleteButtons).toHaveCount(2);
```

⚠️ Lỗi từng mắc: bỏ dấu `/` cuối URL `/add_remove_elements/` → trang 404 → timeout. Trang này BẮT BUỘC có `/` cuối (ngoại lệ).

---

## TC-TI-011 — JavaScript Alerts (bắt popup trình duyệt)

**Pattern mới — popup KHÔNG phải HTML, không click bằng locator được:**
- `page.once('dialog', async dialog => { ... })` — ĐĂNG KÝ xử lý popup **TRƯỚC** rồi mới click nút
- Trong đó chọn: `dialog.accept()` (OK), `dialog.dismiss()` (Cancel), `dialog.accept('Xin chao')` (nhập chữ rồi OK)

```typescript
// Alert - bấm OK
page.once('dialog', async dialog => { await dialog.accept(); });
await page.getByRole('button', { name: 'Click for JS Alert' }).click();
await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

// Confirm - bấm Cancel
page.once('dialog', async dialog => { await dialog.dismiss(); });
// Prompt - nhập chữ
page.once('dialog', async dialog => { await dialog.accept('Xin chao'); });
```

⚠️ **THỨ TỰ BẮT BUỘC**: đăng ký `page.once('dialog', ...)` XONG rồi mới `.click()`. Click trước thì Playwright tự đóng popup → sai.
⚠️ Lỗi từng mắc: gõ `accept('xin chao')` thường nhưng expect `'Xin chao'` hoa → trang trả y nguyên chữ gõ nên lệch.

---

## TC-TI-012 — File Upload

**Pattern mới — `<input type="file">` KHÔNG click (hộp thoại Windows nằm ngoài tầm Playwright → treo):**
- `await page.setInputFiles('#file-upload', duongDanFile);` — nhét thẳng đường dẫn vào ô
- `path.join(__dirname, 'files', 'sample-upload.txt')` — `__dirname` = thư mục chứa file `.ts`; `path.join` ghép đường dẫn đúng cho mọi hệ điều hành

```typescript
import path from 'path';
// ...
const duongDanFile = path.join(__dirname, 'files', 'sample-upload.txt');
await page.setInputFiles('#file-upload', duongDanFile);
await page.locator('#file-submit').click();
await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');
```

File mẫu: `hoc-tap/files/sample-upload.txt`
⚠️ `path.join` chỉ ghép chuỗi, KHÔNG báo nếu gõ sai tên. Lỗi từng mắc: `'file'` (thiếu s) và `.text` (thay vì `.txt`).
🔑 `toBeVisible()` = có hiện ra không; `toContainText()` = có chứa chữ này không.

---

## Tổng hợp pattern đã thạo (TC-001 → 012)

| Việc cần làm | Lệnh |
|---|---|
| Vào trang | `await page.goto('url')` |
| Click link/nút theo chữ | `page.getByRole('link'/'button', { name: '...' }).click()` |
| Gõ chữ vào ô | `page.getByLabel('...').fill('...')` |
| Tìm theo id | `page.locator('#id')` |
| Chọn nhiều phần tử giống nhau | `.nth(0)`, `.first()` |
| Checkbox | `.check()`, `.uncheck()` |
| Dropdown | `.selectOption('value')` |
| Upload file | `page.setInputFiles('#id', path)` |
| Popup trình duyệt | `page.once('dialog', d => d.accept()/dismiss())` |
| Kiểm tra tiêu đề tab | `expect(page).toHaveTitle(/.../)` |
| Kiểm tra URL | `expect(page).toHaveURL(/.../)` |
| Kiểm tra text khớp đúng | `expect(loc).toHaveText('...')` |
| Kiểm tra text chứa chuỗi | `expect(loc).toContainText('...')` |
| Kiểm tra số lượng | `expect(loc).toHaveCount(n)` |
| Kiểm tra checkbox | `expect(loc).toBeChecked()` / `.not.toBeChecked()` |
| Kiểm tra value dropdown | `expect(loc).toHaveValue('...')` |
| Kiểm tra hiện ra | `expect(loc).toBeVisible()` |

---

## Lệnh chạy test

```
npx playwright test hoc-tap/tc-ti-012-file-upload.ts --reporter=line
```
(đổi tên file để chạy bài khác; bỏ tên file để chạy tất cả)

---

## Tiếp theo — TC-013

Gợi ý trang chưa làm: **Drag & Drop** (`dragTo`), **Dynamic Loading** (`waitFor`), **Hovers**, **Frames/iFrame**.
Buổi sau chỉ cần nói **"bài 13"** + chọn trang → mình tạo scaffold TC Manual như các bài trên.
