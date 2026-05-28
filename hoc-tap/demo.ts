// khai báo thư viện 
import { test, expect } from '@playwright/test';
// Test Suite
test.describe('Login flow', () => {                                    
// Precondition chung
    test.beforeEach(async ({ page }) => {                              
        await page.goto('https://app.example.com/login');
    });
// TC ID + Test Name
    test('Login sai password hiển thị error và giữ ở trang login',async ({ page }) => { 
        // Step 1 Step (Action)     
            await page.fill('#username', 'admin');                                              
            await page.fill('#password', 'wrong999');                                        
            await page.click('#submit');  
        // Expected (Verify)                                                      
            await expect(page.locator('.error')).toHaveText('Invalid credentials');                         
            await expect(page).toHaveURL(/login/);                         
        
    });

});

/* ### Actions (Step)
await page.goto('url');                          // Mở URL
await page.fill('#id', 'text');                  // Nhập text vào input
await page.click('#id');                         // Click element
await page.selectOption('#dropdown', 'value');   // Chọn dropdown
await page.check('#checkbox');                   // Tick checkbox
```

### Expected (Verify)
await expect(page).toHaveTitle(/X/);             // Title chứa X
await expect(page).toHaveURL(/X/);               // URL chứa X
await expect(locator).toBeVisible();             // Element hiện ra
await expect(locator).toHaveText('X');           // Text bằng X
await expect(locator).toBeDisabled();            // Button disabled
await expect(locator).toBeChecked();             // Checkbox đã tick
await expect(locator).toHaveCount(N);            // Có N phần tử */

/* Note
Checklist tự kiểm tra

Trước khi commit 1 file test, hỏi:

- [ ] Mỗi `test()` có Test Name rõ ràng (Action + Expected)?
- [ ] Step lặp lại đã đưa vào `beforeEach`?
- [ ] Mọi dòng `page.xxx`/`expect` đều có `await`?
- [ ] Mỗi TC có ít nhất 1 `expect(...)`?
- [ ] Đặt tên Suite phản ánh module/feature đang test? */