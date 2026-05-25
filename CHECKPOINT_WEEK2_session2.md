# Checkpoint Tuần 2 — Buổi 2 — 2026-05-25

## Đã làm hôm nay
- Dịch toàn bộ `playwright-site.spec.ts` ra Test Case Manual
- Học format đọc code: Manual → Code song song → Giải thích từng chữ → 🔒/✏️
- Hiểu được phần nào cố định, phần nào thay đổi trong mọi file test

---

## Mindset quan trọng nhớ lại
- Mục tiêu KHÔNG phải nhớ code — mà là **review hành vi**
- Khi Claude gen code: chạy trên trang đúng → phải PASS, chạy trên trang sai → phải FAIL đúng lý do
- Chỉ cần đọc phần ✏️ để review — phần 🔒 bỏ qua

---

## Quy tắc cố định / thay đổi (áp dụng cho MỌI file test)

🔒 **Cố định — không bao giờ đổi:**
- `import { test, expect } from '@playwright/test'`
- `test.describe(`
- `test.beforeEach(async ({ page }) => {`
- `async ({ page }) => {`
- `await page.goto(`
- `const`
- `= page.locator(` hoặc `= page.getByRole(`
- `await expect(`
- `.first()`
- Tất cả dấu `});`

✏️ **Thay đổi — bạn tự điền theo từng TC:**
- Tên Test Suite
- URL trang cần test
- Tên Test Case
- Chữ cần tìm trong title
- Tên biến (`hero`, `link`...)
- Element cần tìm (`'h1'`, `'a'`...)
- Kết quả mong đợi (`.toBeVisible()`, `.toHaveTitle()`...)
- Attribute cần lấy (`'href'`, `'src'`...)

---

## TC-PS-001 — Tiêu đề tab chứa chữ "Playwright"

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
|---|---|
| **Test Suite** | Kiểm tra trang chủ https://playwright.dev |
| **Test Case ID** | TC-PS-001 |
| **Test Name** | Tiêu đề tab trình duyệt có chứa chữ "Playwright" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://playwright.dev vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhìn lên tiêu đề tab trình duyệt |
| **Expected** | Tiêu đề tab có chứa chữ "Playwright" |
| **PASS ví dụ** | "Fast and reliable end-to-end testing… \| Playwright" |
| **FAIL ví dụ** | "Google" hoặc bất kỳ title nào không có chữ "Playwright" |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://playwright.dev - homepage checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào playwright.dev, chờ load | `await page.goto('https://playwright.dev');` |
| Khai báo TC-PS-001 bắt đầu chạy | `test('page title contains "Playwright"', async ({ page }) => {` |
| Step 3 + Expected — Title phải chứa "Playwright" | `await expect(page).toHaveTitle(/Playwright/);` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://playwright.dev - homepage checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test('page title contains "Playwright"', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
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
test.describe('https://playwright.dev - homepage checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://playwright.dev - homepage checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://playwright.dev'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-PS-001 bắt đầu chạy**
```typescript
test('page title contains "Playwright"', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'page title contains "Playwright"'` — tên TC, đổi theo tên TC của bạn

---
**Step 3 + Expected — Title tab phải chứa "Playwright"**
```typescript
await expect(page).toHaveTitle(/Playwright/);
```
🔒 Cố định:
- `await expect(page).toHaveTitle(` — không đổi khi kiểm tra title

✏️ Thay đổi:
- `/Playwright/` — chữ cần tìm trong title, đổi theo expected của bạn

---

## TC-PS-002 — Vùng hero nhắc đến "end-to-end testing"

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
|---|---|
| **Test Suite** | Kiểm tra trang chủ https://playwright.dev |
| **Test Case ID** | TC-PS-002 |
| **Test Name** | Vùng hero trang chủ nhắc đến "end-to-end testing" |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://playwright.dev vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Nhìn lên tiêu đề tab — tìm cụm chữ "end-to-end testing" |
| **Step 4** | Nhìn vào vùng đầu trang — xác nhận tiêu đề lớn nhất (H1) đang hiển thị |
| **Expected 1** | Tiêu đề tab có chứa "end-to-end testing" (hoa thường không quan trọng) |
| **Expected 2** | H1 đang hiển thị, nhìn thấy được |
| **PASS ví dụ** | Title: "Fast and reliable end-to-end testing… \| Playwright" + H1 nhìn thấy |
| **FAIL ví dụ** | Title không có cụm đó, hoặc H1 bị ẩn |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://playwright.dev - homepage checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào playwright.dev, chờ load | `await page.goto('https://playwright.dev');` |
| Khai báo TC-PS-002 bắt đầu chạy | `test('hero area mentions end-to-end testing', async ({ page }) => {` |
| Step 3 + Expected 1 — Title phải chứa "end-to-end testing" | `await expect(page).toHaveTitle(/end-to-end testing/i);` |
| Bước trung gian — Ghi nhớ H1 đầu tiên | `const hero = page.locator('h1').first();` |
| Step 4 + Expected 2 — H1 phải đang hiển thị | `await expect(hero).toBeVisible();` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://playwright.dev - homepage checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test('hero area mentions end-to-end testing', async ({ page }) => {
    await expect(page).toHaveTitle(/end-to-end testing/i);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
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
test.describe('https://playwright.dev - homepage checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://playwright.dev - homepage checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://playwright.dev'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-PS-002 bắt đầu chạy**
```typescript
test('hero area mentions end-to-end testing', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'hero area mentions end-to-end testing'` — tên TC, đổi theo tên TC của bạn

---
**Step 3 + Expected 1 — Title tab phải chứa "end-to-end testing"**
```typescript
await expect(page).toHaveTitle(/end-to-end testing/i);
```
🔒 Cố định:
- `await expect(page).toHaveTitle(` — không đổi khi kiểm tra title

✏️ Thay đổi:
- `/end-to-end testing/` — cụm chữ cần tìm trong title, đổi theo expected của bạn
- `i` — bỏ qua hoa thường, giữ nếu muốn, bỏ nếu cần khớp chính xác

---
**Bước trung gian — Ghi nhớ H1, chưa phán Pass/Fail**
```typescript
const hero = page.locator('h1').first();
```
🔒 Cố định:
- `const` — khai báo biến, không đổi
- `= page.locator(` — lệnh tìm element, không đổi
- `.first()` — lấy cái đầu tiên khi có nhiều element cùng loại, không đổi

✏️ Thay đổi:
- `hero` — tên biến, đặt tên gì cũng được
- `'h1'` — element cần tìm, đổi theo TC của bạn

---
**Step 4 + Expected 2 — H1 phải đang hiển thị**
```typescript
await expect(hero).toBeVisible();
```
🔒 Cố định:
- `await expect(` — bắt đầu kiểm tra, không đổi

✏️ Thay đổi:
- `hero` — tên biến đã ghi nhớ ở dòng trên, phải trùng tên
- `.toBeVisible()` — kết quả mong đợi, đổi nếu muốn kiểm tra thứ khác

---

## TC-PS-003 — Link "Get started" dẫn vào /docs

### Bảng 1 — Test Case Manual

| Trường | Nội dung |
|---|---|
| **Test Suite** | Kiểm tra trang chủ https://playwright.dev |
| **Test Case ID** | TC-PS-003 |
| **Test Name** | Link "Get started" dẫn vào /docs |
| **Precondition** | Máy tính có kết nối internet |
| **Step 1** | Mở trình duyệt Chrome |
| **Step 2** | Gõ https://playwright.dev vào thanh địa chỉ, nhấn Enter, chờ load xong |
| **Step 3** | Tìm link có chữ "Get started" trên trang |
| **Step 4** | Xác nhận link đó đang hiển thị, nhìn thấy được |
| **Step 5** | Hover vào link đó, xem URL đích ở góc dưới trình duyệt |
| **Expected 1** | Link "Get started" đang hiển thị, không bị ẩn |
| **Expected 2** | URL đích của link có chứa "/docs" |
| **PASS ví dụ** | Link hiển thị + href = "/docs/intro" |
| **FAIL ví dụ** | Link bị ẩn, hoặc href không chứa "/docs" |

### Bảng 2 — Song song Manual ↔ Code

| Manual | Code |
|---|---|
| Precondition — Lấy công cụ ra dùng | `import { test, expect } from '@playwright/test';` |
| Precondition — Tạo folder nhóm các TC | `test.describe('https://playwright.dev - homepage checks', () => {` |
| Step 1 — Mở Chrome | `test.beforeEach(async ({ page }) => {` |
| Step 2 — Vào playwright.dev, chờ load | `await page.goto('https://playwright.dev');` |
| Khai báo TC-PS-003 bắt đầu chạy | `test('has a "Get started" link to /docs', async ({ page }) => {` |
| Step 3 — Tìm link "Get started", lấy cái đầu tiên | `const link = page.getByRole('link', { name: /get started/i }).first();` |
| Step 4 + Expected 1 — Link phải đang hiển thị | `await expect(link).toBeVisible();` |
| Step 5 — Lấy URL đích của link | `const href = await link.getAttribute('href');` |
| Expected 2 — URL đích phải chứa "/docs" | `expect(href).toMatch(/\/docs/);` |

### Code trọn bộ

```typescript
import { test, expect } from '@playwright/test';

test.describe('https://playwright.dev - homepage checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test('has a "Get started" link to /docs', async ({ page }) => {
    const link = page.getByRole('link', { name: /get started/i }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/\/docs/);
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
test.describe('https://playwright.dev - homepage checks', () => {
```
🔒 Cố định:
- `test.describe(` — lệnh tạo folder, không đổi
- `, () => {` — mở ngoặc chứa nội dung, không đổi

✏️ Thay đổi:
- `'https://playwright.dev - homepage checks'` — tên folder, đổi theo trang đang test

---
**Step 1 — Mở Chrome + Step 2 — Vào trang, chờ load**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev');
});
```
🔒 Cố định:
- `test.beforeEach(` — chạy trước mỗi TC, không đổi
- `async ({ page }) => {` — Playwright tự mở Chrome đưa vào đây, không đổi
- `await page.goto(` — lệnh vào trang, không đổi
- `});` — đóng beforeEach, không đổi

✏️ Thay đổi:
- `'https://playwright.dev'` — URL trang cần test, đổi theo trang đang test

---
**Khai báo TC-PS-003 bắt đầu chạy**
```typescript
test('has a "Get started" link to /docs', async ({ page }) => {
```
🔒 Cố định:
- `test(` — khai báo test case, không đổi
- `, async ({ page }) => {` — nhận lại tab Chrome từ beforeEach, không đổi

✏️ Thay đổi:
- `'has a "Get started" link to /docs'` — tên TC, đổi theo tên TC của bạn

---
**Step 3 — Tìm link "Get started", lấy cái đầu tiên**
```typescript
const link = page.getByRole('link', { name: /get started/i }).first();
```
🔒 Cố định:
- `const` — khai báo biến, không đổi
- `= page.getByRole(` — lệnh tìm element theo role, không đổi
- `{ name:` — lọc theo chữ hiển thị, không đổi
- `}).first()` — lấy cái đầu tiên, không đổi

✏️ Thay đổi:
- `link` — tên biến, đặt tên gì cũng được
- `'link'` — loại element, đổi nếu tìm `'button'`, `'heading'`...
- `/get started/i` — chữ hiển thị trên link, đổi theo TC của bạn

---
**Step 4 + Expected 1 — Link phải đang hiển thị**
```typescript
await expect(link).toBeVisible();
```
🔒 Cố định:
- `await expect(` — bắt đầu kiểm tra, không đổi

✏️ Thay đổi:
- `link` — tên biến đã ghi nhớ ở dòng trên, phải trùng tên
- `.toBeVisible()` — kết quả mong đợi, đổi nếu muốn kiểm tra thứ khác

---
**Step 5 — Lấy URL đích của link**
```typescript
const href = await link.getAttribute('href');
```
🔒 Cố định:
- `const` — khai báo biến, không đổi
- `= await` — chờ lấy giá trị xong rồi mới lưu, không đổi
- `.getAttribute(` — lệnh lấy giá trị attribute, không đổi

✏️ Thay đổi:
- `href` — tên biến lưu kết quả, đặt tên gì cũng được
- `link` — tên biến element ở dòng trên, phải trùng tên
- `'href'` — tên attribute cần lấy, đổi nếu cần `'src'`, `'class'`...

---
**Expected 2 — URL đích phải chứa "/docs"**
```typescript
expect(href).toMatch(/\/docs/);
```
🔒 Cố định:
- `expect(` — bắt đầu kiểm tra, không đổi
- `.toMatch(` — giá trị phải khớp với..., không đổi

✏️ Thay đổi:
- `href` — tên biến đã lấy ở dòng trên, phải trùng tên
- `/\/docs/` — chuỗi cần tìm trong URL, đổi theo expected của bạn

---

## Việc còn lại — làm dần các buổi sau

- **Buổi sau:** dịch `the-internet.spec.ts` theo đúng format này (3 TC)
- **Cuối tuần:** tự viết 1 TC Manual mới → bảo Claude gen code → review xem đúng chưa

## Lệnh mở lại buổi sau

```
cd D:\workspace\playwright-ai-qa
claude
```

Nói với Claude: *"Tiếp Tuần 2 — dịch file `the-internet.spec.ts` theo format CHECKPOINT_WEEK2_session2.md"*
