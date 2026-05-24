# Checkpoint Tuần 1 — 2026-05-24

## Setup môi trường
- Node.js v26.2.0 trên Windows 11
- Claude Code v2.1.150, model Opus 4.7 (1M context), account Claude Team ISC-FTel (khiembt@fpt.com)
- Playwright MCP — 23 tools — connected
- Working dir: `C:\Users\DELL\playwright-ai-qa`
- Stack: `@playwright/test` + TypeScript, project Chromium duy nhất (config mặc định từ `npm init playwright@latest`)

## Output đạt được
- **3 file test** trong `tests/`: `example.spec.ts`, `playwright-site.spec.ts`, `the-internet.spec.ts`
- **Tổng cộng: 9/9 PASS, 0 fail** (`npx playwright test`, runtime 11.1s, 2 workers)
- HTML report: `playwright-report/index.html` (mở bằng `npx playwright show-report` → http://localhost:9323)
- Screenshot evidence: `report-9pass.png` (chụp full report banner All 9 / Passed 9 / Failed 0)

### Chi tiết từng file

**`tests/example.spec.ts`** — describe `"https://example.com - basic content checks"`, 3 test:
| Test case | Assert chính | Thời gian |
|---|---|---|
| `page title contains "Example"` | `expect(page).toHaveTitle(/Example/)` | 773ms |
| `has <h1> with text "Example Domain"` | `toHaveCount(1)` + `toHaveText('Example Domain')` | 869ms |
| `has a "Learn more" link pointing to another page` | `getByRole('link', { name: 'Learn more' })` + `toBeVisible()` + check `href` host khác `page.url()` host | 419ms |

**`tests/playwright-site.spec.ts`** — describe `"https://playwright.dev - homepage checks"`, 3 test:
| Test case | Assert chính | Thời gian |
|---|---|---|
| `page title contains "Playwright"` | `expect(page).toHaveTitle(/Playwright/)` | 1.0s |
| `hero area mentions end-to-end testing` | `toHaveTitle(/end-to-end testing/i)` + `page.locator('h1').first()` visible | 1.0s |
| `has a "Get started" link to /docs` | `getByRole('link', { name: /get started/i }).first()` + `href` matches `/\/docs/` | 817ms |

**`tests/the-internet.spec.ts`** — describe `"https://the-internet.herokuapp.com - index page checks"`, 3 test:
| Test case | Assert chính | Thời gian |
|---|---|---|
| `page title contains "The Internet"` | `expect(page).toHaveTitle(/The Internet/)` | 3.5s |
| `has <h1> with text "Welcome to the-internet"` | `toHaveCount(1)` + `toHaveText('Welcome to the-internet')` | 4.5s |
| `has at least 30 links on the index page` | `page.locator('a').count()` + `toBeGreaterThanOrEqual(30)` (thực tế 46) | 3.8s |

## Lỗi đã gặp và cách Claude tự fix

- **example.com đổi link `"More information..."` → `"Learn more"`**: Claude phát hiện qua MCP `browser_snapshot` + `browser_evaluate` trước khi viết spec, viết spec theo yêu cầu gốc của user → test FAIL đúng như dự đoán → user xác nhận → đổi `getByRole('link', { name: 'Learn more' })` → PASS.
- **playwright.dev hero h1 đã được redesign**: Hero h1 hiện là *"Playwright enables reliable web automation for testing, scripting, and AI agents"* — không còn cụm "end-to-end testing". Cụm này nay chỉ nằm trong `<title>` (`"Fast and reliable end-to-end testing for modern web apps | Playwright"`). Claude adapt sang assert qua `toHaveTitle(/end-to-end testing/i)` thay vì locator `h1` chứa text, đồng thời vẫn check `h1.first()` visible để đảm bảo có hero.
- **HTML report bị stale**: 2 lần re-run dùng `--reporter=list` không ghi đè `playwright-report/`, dẫn đến server show-report hiển thị kết quả CŨ (3 tests, 1 fail). Fix: chạy lại `npx playwright test` không tham số (reporter mặc định = `html`), restart server.
- **Port 9323 EADDRINUSE sau khi kill task**: TaskStop chỉ kill npm wrapper, child node process vẫn giữ port. Fix bằng `Get-NetTCPConnection -LocalPort 9323` → `Stop-Process` PID node.

## Patterns Playwright thực tế xuất hiện trong 3 file

### Import & cấu trúc test
- `import { test, expect } from '@playwright/test'` — bộ đôi `test` (định nghĩa test) + `expect` (assert)
- `test.describe(name, fn)` — gom nhóm test theo trang/feature
- `test.beforeEach(async ({ page }) => {...})` — hook chạy trước mỗi test, dùng để `goto` URL chung
- `test(name, async ({ page }) => {...})` — định nghĩa 1 test case; `page` là fixture browser tab tự động cấp

### Điều hướng
- `page.goto(url)` — mở URL trong tab hiện tại, chờ load xong

### Locator (cách tìm element)
- `page.locator('h1')` — chọn theo CSS selector (đơn giản, dùng cho element generic)
- `page.locator('a').count()` — đếm số element match
- `page.getByRole('link', { name: 'Learn more' })` — chọn theo ARIA role + accessible name (an toàn hơn CSS, gần với cách user nhìn UI)
- `page.getByRole('link', { name: /get started/i })` — name nhận luôn regex
- `locator.first()` — lấy element đầu tiên khi locator match nhiều phần tử (tránh `strict mode violation`)

### Assertion auto-wait (Playwright tự retry tới timeout)
- `expect(page).toHaveTitle(/regex/)` — title trang match regex
- `expect(locator).toHaveText('exact text')` — text content trùng tuyệt đối
- `expect(locator).toHaveCount(n)` — số element đúng `n`
- `expect(locator).toBeVisible()` — element render và nhìn thấy được

### Assertion không auto-wait (sync, dùng cho giá trị đã lấy ra)
- `expect(value).toBeTruthy()` — không null/undefined/'',
- `expect(value).not.toBe(other)` — khác với `other`
- `expect(string).toMatch(/regex/)` — string match regex
- `expect(number).toBeGreaterThanOrEqual(n)` — số ≥ `n`

### Lấy thuộc tính
- `await locator.getAttribute('href')` — lấy attribute thô (async, không auto-wait, không retry)

## Lệnh CLI cần nhớ

| Lệnh | Mục đích |
|---|---|
| `claude` | Mở Claude Code |
| `claude mcp list` | Liệt kê các MCP server đã connect |
| `npm init playwright@latest -- --quiet --browser=chromium --lang=ts --no-examples` | Init Playwright TypeScript không tương tác, chỉ Chromium |
| `npx playwright test` | Chạy toàn bộ test (reporter mặc định = `html`) |
| `npx playwright test tests/example.spec.ts` | Chạy 1 file cụ thể |
| `npx playwright test --reporter=list` | Chạy + in dòng kết quả ra terminal (KHÔNG ghi đè HTML report) |
| `npx playwright test --ui` | Mở UI mode tương tác (xem timeline, time-travel) |
| `npx playwright show-report` | Serve HTML report tại http://localhost:9323 |
| `npx playwright codegen <url>` | Tự record action thành code Playwright |
| `npx playwright install chromium` | Cài binary Chromium dùng nội bộ Playwright |
| `/exit` trong Claude Code | Thoát Claude Code |
| `/mcp` trong Claude Code | Xem trạng thái + tools của các MCP server |

## Bài học rút ra (mindset)
- **Spec ban đầu có thể sai vì web thật đã thay đổi** → luôn để Claude verify DOM thật qua Playwright MCP (`browser_navigate` + `browser_snapshot` + `browser_evaluate`) TRƯỚC khi viết `.spec.ts`. Tiết kiệm vòng FAIL → fix vô ích.
- **AI tự ghi note adaptation là dấu hiệu spec chất lượng cao**: khi DOM khác kỳ vọng, không "fake pass" bằng matcher quá lỏng — phải nêu rõ "test gốc fail vì lý do X, đã đổi sang assert Y", để người review nắm context.
- **9/9 PASS chưa đủ**: vẫn phải review file `.spec.ts` xem có verify đúng *business value* hay chỉ tautology. Ví dụ check "h1 visible" gần như luôn pass — chưa đảm bảo nội dung đúng.
- **Auto-wait vs sync assert**: `expect(locator).toBeVisible()` tự retry tới `timeout` (default 5s); còn `expect(await locator.getAttribute(...))` chỉ chụp giá trị tại 1 thời điểm. Hiểu khác biệt để không gặp flaky test.
- **`getByRole` > CSS selector**: gần với cách user thật tương tác, không vỡ khi class CSS đổi.
- **Reporter ghi đè report folder**: chỉ reporter `html` (mặc định) mới sinh `playwright-report/`. Khi muốn refresh report, đừng truyền `--reporter=list`.

## Việc Tuần 2 (kế hoạch)
- **Đọc hiểu code** (KHÔNG viết mới)
- Học 5 pattern Playwright cơ bản qua việc đọc: locator strategy, auto-wait assertion, fixture `page`, hook `beforeEach`/`afterEach`, retry/timeout config
- **Output**: đọc to lên được 1 file test 20–30 dòng (vd `tests/example.spec.ts`), giải thích từng dòng bằng tiếng Việt
- **Self-check**: nhìn `await page.getByRole('button').click()` giải thích được "tìm nút theo role button, bấm" mà không cần Claude gợi ý
