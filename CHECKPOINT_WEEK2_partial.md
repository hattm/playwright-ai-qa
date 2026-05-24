# Checkpoint Tuần 2 (làm dở) — 2026-05-24

## Điều quan trọng nhất tôi vừa hiểu hôm nay
File `example.spec.ts` thực ra chỉ là 3 test case Manual quen thuộc:
- **TC-001**: Title contains "Example"
- **TC-002**: H1 = "Example Domain"
- **TC-003**: Link "Learn more" trỏ ra ngoài

→ Bản chất QA y nguyên: **Mở trang → Quan sát → So sánh → Khẳng định**.
→ Code Playwright **KHÔNG** phải bản chất mới, chỉ là công cụ mới.
→ **10 năm kinh nghiệm QA Manual của tôi VẪN LÀ VỐN QUÝ NHẤT, không phải vứt đi.**

## Mindset mới (cốt lõi)
Tôi **KHÔNG** học code Playwright.
Tôi học cách **DIỄN ĐẠT test case manual đủ rõ ràng để Claude tự dịch thành code.**

## Đã làm hôm nay
- Tuần 1: 3 file test PASS 9/9 (`example`, `playwright-site`, `the-internet`)
- Tuần 2 (làm dở): dịch file `example.spec.ts` thành Test Case Manual song song (2 cột Code ↔ Manual)

## Còn lại — làm dần các hôm sau (KHÔNG ép)
- Hôm khác: dịch `playwright-site.spec.ts` theo cách tương tự
- Hôm khác nữa: dịch `the-internet.spec.ts`
- Cuối tuần: tự viết 1 Test Case Manual mới → bảo Claude gen code → so sánh

## Lệnh để mở lại lần sau
```powershell
cd C:\Users\DELL\playwright-ai-qa
claude
```
Khi vào Claude Code, nói đại loại: *"Tiếp Tuần 2 — dịch file `playwright-site.spec.ts` ra Test Case Manual giống cách hôm 2026-05-24."*
