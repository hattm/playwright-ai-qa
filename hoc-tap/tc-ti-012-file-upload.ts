/* | Trường | Nội dung | TC-TI-012
|---|---|
| **Test Suite** | Kiểm tra trang File Upload https://the-internet.herokuapp.com/upload |
| **Test Case ID** | TC-TI-012 |
| **Test Name** | Tải lên 1 file và kiểm tra tên file hiển thị |
| **Precondition** | Máy tính có kết nối internet; có sẵn file mẫu `hoc-tap/files/sample-upload.txt` |
| **Step 1** | Mở https://the-internet.herokuapp.com/upload, chờ load xong |
| **Step 2** | Trang có ô chọn file (#file-upload) và nút "Upload" (#file-submit). |
| **Step 3** | Đính kèm file `hoc-tap/files/sample-upload.txt` vào ô chọn file |
| **Step 4** | Bấm nút "Upload" |
| **Expected** | Trang chuyển sang trang kết quả: hiện tiêu đề "File Uploaded!" và tên file "sample-upload.txt" |
| **PASS ví dụ** | Tiêu đề là "File Uploaded!" và vùng #uploaded-files chứa "sample-upload.txt" |
| **FAIL ví dụ** | Không thấy "File Uploaded!" / sai tên file / test treo vì chọn sai đường dẫn file | */


// 👇 Bạn tự gõ code Playwright vào dưới đây.
//
// ⭐ PATTERN MỚI bài này (lần đầu học — QUAN TRỌNG):
//
//   Ô chọn file là thẻ <input type="file">. KHÔNG bấm vào nó để mở hộp thoại chọn file của Windows
//   (Playwright không bấm được hộp thoại đó). Thay vào đó ta "đính kèm thẳng" đường dẫn file bằng:
//
//   - await page.setInputFiles('#file-upload', duongDanFile);
//        → đính kèm file vào ô <input type="file"> mà KHÔNG cần mở hộp thoại nào.
//
//   ❓ duongDanFile lấy ở đâu? File mẫu nằm tại hoc-tap/files/sample-upload.txt.
//      Cách AN TOÀN nhất (chạy đúng dù đứng ở thư mục nào) là ghép đường dẫn từ vị trí file test:
//
//        import path from 'path';
//        const duongDanFile = path.join(__dirname, 'files', 'sample-upload.txt');
//        // __dirname = thư mục chứa file .ts này (tức hoc-tap/)
//
//   Sau khi upload xong, kiểm tra 2 thứ trên trang kết quả:
//   - page.locator('#uploaded-files')   → vùng hiển thị TÊN file vừa upload
//   - page.getByRole('heading', { name: 'File Uploaded!' })  → tiêu đề báo thành công
//   - await expect(...).toHaveText('...') hoặc .toContainText('...')
//
//   Selector trên trang:
//   - '#file-upload'  → ô chọn file (input)
//   - '#file-submit'  → nút Upload
//   - '#uploaded-files' → nơi hiện tên file sau khi upload
//
// Pattern CŨ vẫn dùng: import, test.describe, test.beforeEach + goto, locator, click, expect
//
// Gợi ý khung:
//   import { test, expect } from '@playwright/test';
//   import path from 'path';
//
//   test.describe('Kiểm tra trang File Upload', () => {
//     test.beforeEach(async ({ page }) => {
//       await page.goto('https://the-internet.herokuapp.com/upload');
//     });
//
//     test('Upload 1 file thanh cong', async ({ page }) => {
//       const duongDanFile = path.join(__dirname, 'files', 'sample-upload.txt');
//       await page.setInputFiles('#file-upload', duongDanFile);
//       await page.locator('#file-submit').click();
//       await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
//       await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');
//     });
//
//   });

import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Kiểm tra trang File Upload', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
    });

    test('Tải lên 1 file và kiểm tra tên file hiển thị', async ({ page }) => {
        const duongDanFile = path.join(__dirname,'files','sample-upload.txt');
        await page.setInputFiles('#file-upload',duongDanFile);
        await page.locator('#file-submit').click();
        await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
        await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');
    });
});
