# AI Support Log — Lê Thanh Tình

> Đây là phản ánh cá nhân. AI được dùng như công cụ hỗ trợ tư duy và sản xuất, không phải người dùng và không phải nguồn validation.

> **Phần đóng góp cá nhân và reflection phải do Lê Thanh Tình tự viết.** AI chỉ được hỗ trợ đặt khung/câu hỏi và không được tạo quote, observation hoặc feedback không tồn tại.

## 1. Phạm vi sử dụng AI

| Thời điểm | Công cụ/model | Tôi yêu cầu AI làm gì | Đầu ra được dùng | Quyết định cuối cùng của tôi |
|---|---|---|---|---|
| [YYYY-MM-DD] | [Tên công cụ/model] | [Ví dụ: tạo khung artifact nộp bài] | [Phần đã dùng] | [Tôi kiểm tra/chỉnh gì] |
| 2026-10-05 | Codex | Đọc `README17.md`, `Giang_notes.md` và `Dương_notes.md`, trích dữ kiện Day 17 và đưa vào bộ hồ sơ Day 18. | Thông tin nhóm/case, Hypothesis Problem, Evidence Huddle, patterns, contradictions, Parking Lot và shared test context. | Facts được tách khỏi diễn giải; kết luận “Validated” trong note nguồn không được giữ vì ba lượt practice chưa đủ để validation. |
| 2026-10-05 | Codex | Hỗ trợ thiết kế và code ba micro-prototype bằng HTML/CSS/JavaScript với canned output. | Shared fixture, ba flow A/B/C, source/uncertainty labels, control/recovery, reset path và facilitator annotation. | Prototype không dùng model/API thật; nhóm cần tự peer-test, xác nhận nội dung và ghi observation thật trước khi nộp. |
| 2026-10-05 | Gemini | Hoàn thiện Chặng 4: Đóng gói thành 3 file HTML prototype độc lập (option-a.html, option-b.html, option-c.html) mở trực tiếp offline; cấu trúc hóa biên bản Peer-Test chéo và sửa 9 lỗi thực tế trong mã nguồn JS/HTML. | 3 file HTML prototype độc lập, mã nguồn app.js đã fix lỗi (undo history, restore textarea, interactive quick-check, highlight trùng thẻ), biên bản Defect Log trong prototype-link.md và README.md. | Thành viên trong nhóm trực tiếp kiểm thử trên trình duyệt, xác nhận các lỗi được fix đúng logic nghiệp vụ và bảo đảm quyền kiểm soát của người học. |

## 2. AI đã giúp gì

- [Ví dụ: đề xuất cấu trúc nhất quán để không bỏ sót expectation, agency, uncertainty và recovery.]
- [Ví dụ: chỉ ra hai option mới chỉ khác wording/layout.]
- [Ví dụ: hỗ trợ diễn đạt Next Change ngắn gọn và có giới hạn.]

## 3. AI sai hoặc hời hợt ở đâu

- **Vấn đề:** [AI suy đoán/khái quát quá mức/đưa nội dung không có evidence].
  - **Vì sao không phù hợp:** [Đối chiếu với observation hoặc bối cảnh thật].
  - **Tôi đã sửa:** [Hành động cụ thể].
- **Vấn đề:** [AI trộn observation với interpretation hoặc coi preference là validation].
  - **Vì sao không phù hợp:** [Giải thích].
  - **Tôi đã sửa:** [Hành động cụ thể].

## 4. Human–AI decisions

- Tôi tự quyết định [Hypothesis Problem/phạm vi task/cách chia việc user–AI] dựa trên [evidence].
- Tôi chấp nhận đề xuất AI về [nội dung] sau khi kiểm tra [tiêu chí/evidence].
- Tôi từ chối đề xuất AI về [nội dung] vì [lý do].
- Tôi tự chịu trách nhiệm về tính chính xác, quyền riêng tư, quyền truy cập link và kết luận cuối cùng.

## 5. Nguyên tắc evidence và riêng tư

- [ ] Không đưa dữ liệu cá nhân nhạy cảm của tester vào prompt.
- [ ] Không tạo quote, observation hoặc kết quả test giả bằng AI.
- [ ] Mọi synthesis đều truy ngược được về Feedback Notes thật.
- [ ] Không dùng phản hồi AI thay cho evidence từ người dùng.
- [ ] Đã rà soát nội dung AI trước khi đưa vào bài nộp.

## 6. Reflection cá nhân

Phần này do tôi tự viết, không dùng AI viết thay:

> [Tự viết 3–5 câu: AI thay đổi cách bạn làm việc thế nào, giới hạn lớn nhất bạn nhận ra là gì, và lần sau bạn sẽ dùng AI khác đi ra sao.]

