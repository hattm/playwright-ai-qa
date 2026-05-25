# Checkpoint Tuần 2 — Buổi 3 — 2026-05-25

## Đã làm hôm nay
- Dịch toàn bộ `the-internet.spec.ts` ra Test Case Manual
- Học thêm 2 pattern mới: `.toHaveCount()`, `.toBeGreaterThanOrEqual()`
- Hiểu sự khác biệt giữa `await expect(...)` và `expect(...)` không có await

---

## Pattern mới học hôm nay

### `.toHaveCount(n)` — đếm số lượng element
Dùng khi muốn kiểm tra có đúng bao nhiêu element trên trang.
```typescript
await expect(h1).toHaveCount(1);  // phải có đúng 1 thẻ h1
```

### `.toHaveText('...')` — kiểm tra chữ khớp chính xác
Khác với `.toHaveTitle()` (kiểm tra title tab), cái này kiểm tra chữ bên trong element.
```typescript
await expect(h1).toHaveText('Welcome to the-internet');  // chữ phải khớp y chang
```

### `.count()` + `toBeGreaterThanOrEqual(n)` — đếm rồi so sánh số
Dùng khi muốn kiểm tra số lượng tối thiểu, không cần biết con số chính xác.
```typescript
const linkCount = await page.locator('a').count();   // đếm, lưu vào biến
expect(linkCount).toBeGreaterThanOrEqual(30);         // số đó phải >= 30
```

### Tại sao dòng cuối KHÔNG có `await`?
- `await expect(locator)...` — locator là element trên trang, cần chờ browser xử lý
- `expect(linkCount)...` — linkCount là **con số** đã lấy ra rồi, không cần chờ gì nữa

---

## TC-TI-001 — Tiêu đề tab chứa chữ "The Internet"

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
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
| **FAIL ví dụ** | "Google" hoặc bất kỳ title nào không có chữ "The Internet" |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://the-internet.herokuapp.com - index page checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào the-internet, chờ load | `await page.goto('https://the-internet.herokuapp.com');` |
| Khai báo TC-TI-001 bắt đầu chạy | `test('page title contains "The Internet"', async ({ page }) => {` |
| Step 3 + Expected — Title phải chứa "The Internet" | `await expect(page).toHaveTitle(/The Internet/);` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://the-internet.herokuapp.com - index page checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
  });

  test('page title contains "The Internet"', async ({ page }) => {
    await expect(page).toHaveTitle(/The Internet/);
  });

});
```

### Giải thích — 🔒 Cố định   ✏️ Thay đổi

---
**Precondition — Lấy công cụ ra dùng**
```typescript
import { test, expect } from '@playwright/test';
```
🔒 Cố định:
- `import { test, expect } from '@playwright/test'` — không bao giờ đổi, file nào cũng chép y chang

---
**Precondition — Tạo folder nhóm các TC**
```typescript
test.describe('https://the-internet.herokuapp.com - index page checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com - index page checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-TI-001 bắt đầu chạy**
```typescript
test('page title contains "The Internet"', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'page title contains "The Internet"'` — tên TC, đổi theo tên TC của bạn

---
**Step 3 + Expected — Title tab phải chứa "The Internet"**
```typescript
await expect(page).toHaveTitle(/The Internet/);
```
🔒 Cố định:
- `await expect(page).toHaveTitle(` — không đổi khi kiểm tra title

✏️ Thay đổi:
- `/The Internet/` — chữ cần tìm trong title, đổi theo expected của bạn

---

## TC-TI-002 — H1 có đúng chữ "Welcome to the-internet"

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
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
| **FAIL ví dụ** | Không có H1, có 2 H1, hoặc chữ H1 khác |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://the-internet.herokuapp.com - index page checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào the-internet, chờ load | `await page.goto('https://the-internet.herokuapp.com');` |
| Khai báo TC-TI-002 bắt đầu chạy | `test('has <h1> with text "Welcome to the-internet"', async ({ page }) => {` |
| Bước trung gian — Ghi nhớ vị trí H1 | `const h1 = page.locator('h1');` |
| Step 3 + Expected 1 — Phải có đúng 1 H1 | `await expect(h1).toHaveCount(1);` |
| Step 4 + Expected 2 — Chữ H1 phải khớp chính xác | `await expect(h1).toHaveText('Welcome to the-internet');` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://the-internet.herokuapp.com - index page checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
  });

  test('has <h1> with text "Welcome to the-internet"', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Welcome to the-internet');
  });

});
```

### Giải thích — 🔒 Cố định   ✏️ Thay đổi

---
**Precondition — Lấy công cụ ra dùng**
```typescript
import { test, expect } from '@playwright/test';
```
🔒 Cố định:
- `import { test, expect } from '@playwright/test'` — không bao giờ đổi, file nào cũng chép y chang

---
**Precondition — Tạo folder nhóm các TC**
```typescript
test.describe('https://the-internet.herokuapp.com - index page checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com - index page checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-TI-002 bắt đầu chạy**
```typescript
test('has <h1> with text "Welcome to the-internet"', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'has <h1> with text "Welcome to the-internet"'` — tên TC, đổi theo tên TC của bạn

---
**Bước trung gian — Ghi nhớ H1, chưa phán Pass/Fail**
```typescript
const h1 = page.locator('h1');
```
🔒 Cố định:
- `const` — khai báo biến, không đổi
- `= page.locator(` — lệnh tìm element, không đổi

✏️ Thay đổi:
- `h1` — tên biến, đặt tên gì cũng được
- `'h1'` — element cần tìm, đổi theo TC của bạn

---
**Step 3 + Expected 1 — Phải có đúng 1 H1**
```typescript
await expect(h1).toHaveCount(1);
```
🔒 Cố định:
- `await expect(` — bắt đầu kiểm tra, không đổi
- `.toHaveCount(` — kiểm tra số lượng element, không đổi

✏️ Thay đổi:
- `h1` — tên biến đã ghi nhớ ở dòng trên, phải trùng tên
- `1` — số lượng mong đợi, đổi nếu cần đếm số khác

---
**Step 4 + Expected 2 — Chữ H1 phải khớp chính xác**
```typescript
await expect(h1).toHaveText('Welcome to the-internet');
```
🔒 Cố định:
- `await expect(` — bắt đầu kiểm tra, không đổi
- `.toHaveText(` — kiểm tra nội dung chữ khớp chính xác, không đổi

✏️ Thay đổi:
- `h1` — tên biến đã ghi nhớ ở dòng trên, phải trùng tên
- `'Welcome to the-internet'` — chữ mong đợi, đổi theo expected của bạn

---

## TC-TI-003 — Trang index có ít nhất 30 link

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
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
| **FAIL ví dụ** | Đếm được 5 link → 5 < 30 → FAIL |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://the-internet.herokuapp.com - index page checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào the-internet, chờ load | `await page.goto('https://the-internet.herokuapp.com');` |
| Khai báo TC-TI-003 bắt đầu chạy | `test('has at least 30 links on the index page', async ({ page }) => {` |
| Step 3 — Đếm toàn bộ link, lưu con số lại | `const linkCount = await page.locator('a').count();` |
| Expected — Số link phải từ 30 trở lên | `expect(linkCount).toBeGreaterThanOrEqual(30);` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://the-internet.herokuapp.com - index page checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
  });

  test('has at least 30 links on the index page', async ({ page }) => {
    const linkCount = await page.locator('a').count();
    expect(linkCount).toBeGreaterThanOrEqual(30);
  });

});
```

### Giải thích — 🔒 Cố định   ✏️ Thay đổi

---
**Precondition — Lấy công cụ ra dùng**
```typescript
import { test, expect } from '@playwright/test';
```
🔒 Cố định:
- `import { test, expect } from '@playwright/test'` — không bao giờ đổi, file nào cũng chép y chang

---
**Precondition — Tạo folder nhóm các TC**
```typescript
test.describe('https://the-internet.herokuapp.com - index page checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com - index page checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://the-internet.herokuapp.com'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-TI-003 bắt đầu chạy**
```typescript
test('has at least 30 links on the index page', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'has at least 30 links on the index page'` — tên TC, đổi theo tên TC của bạn

---
**Step 3 — Đếm toàn bộ link, lưu con số lại**
```typescript
const linkCount = await page.locator('a').count();
```
🔒 Cố định:
- `const` — khai báo biến, không đổi
- `= await` — chờ đếm xong rồi mới lưu kết quả, không đổi
- `page.locator(` — lệnh tìm element, không đổi
- `).count()` — đếm số lượng element tìm được, không đổi

✏️ Thay đổi:
- `linkCount` — tên biến lưu con số, đặt tên gì cũng được
- `'a'` — element cần đếm, đổi nếu muốn đếm `'button'`, `'img'`...

---
**Expected — Số link phải từ 30 trở lên**
```typescript
expect(linkCount).toBeGreaterThanOrEqual(30);
```
> **Lưu ý:** Dòng này KHÔNG có `await` — vì `linkCount` là con số đã lấy ra rồi, không phải element trên trang, nên không cần chờ.

🔒 Cố định:
- `expect(` — bắt đầu kiểm tra, không đổi
- `.toBeGreaterThanOrEqual(` — con số phải lớn hơn hoặc bằng..., không đổi

✏️ Thay đổi:
- `linkCount` — tên biến đã đếm ở dòng trên, phải trùng tên
- `30` — ngưỡng tối thiểu, đổi theo expected của bạn

---

## Tổng kết Tuần 2 — đã hoàn thành

| File | TC | Trạng thái |
|---|---|---|
| `example.spec.ts` | TC-EX-001, 002, 003 | ✅ Buổi 1 |
| `playwright-site.spec.ts` | TC-PS-001, 002, 003 | ✅ Buổi 2 |
| `the-internet.spec.ts` | TC-TI-001, 002, 003 | ✅ Buổi 3 |

---

## Việc còn lại — bài tập thực chiến cuối tuần

**Tự viết 1 TC Manual mới → bảo Claude gen code → review**

Quy trình:
```
1. Chọn 1 trang web bất kỳ bạn đang test
2. Viết 1 TC Manual theo đúng Bảng 1 ở trên
3. Đưa cho Claude: "Dựa vào TC này, gen code Playwright cho tôi"
4. Claude gen code xong → chạy trên trang đúng → phải PASS
5. Đổi URL sang trang sai → phải FAIL đúng lý do
6. Đọc phần ✏️ trong code → đối chiếu với TC của mình → đúng chưa?
```

---

## Lệnh mở lại buổi sau

```
cd D:\workspace\playwright-ai-qa
claude
```

Nói với Claude: *"Tuần 2 đã xong 3 file. Bắt đầu bài tập thực chiến: tôi tự viết TC Manual, bạn gen code, tôi review."*
