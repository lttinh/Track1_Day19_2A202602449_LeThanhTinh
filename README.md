# Track 1 — Day 19: Prototype & User Feedback

## Thông tin bài nộp cá nhân

- **Họ và tên:** Lê Thanh Tình
- **Mã học viên:** 2A202602449
- **Nhóm:** `3 in 1`
- **AI Feature Case:** Case B — AI Notes: Personal Learning Notes
- **Phạm vi bài nộp:** Thiết kế ba phương án, thử nghiệm prototype với người dùng, tổng hợp evidence và ghi nhận việc sử dụng AI.

### Thành viên nhóm

- Chu Thủy Dương (2A202602660)
- **Lê Thanh Tình (2A202602449) — chủ sở hữu hồ sơ này**
- Phạm Hương Giang (2A202602359)

---

## Tổng quan bài làm của tôi

Trong bài lab này, tôi sử dụng bài toán chung của nhóm về **AI Notes** để so sánh ba mức độ hỗ trợ của AI. Mục tiêu của tôi là tìm ra cách giúp người học tổ chức ghi chú nhanh hơn nhưng vẫn có thể kiểm tra nguồn, chỉnh sửa nội dung và chủ động quyết định trước khi lưu.

Tôi thực hiện một phiên thử nghiệm cá nhân ngày **05/10/2026**, kéo dài **10 phút**, với người tham gia mang mã ẩn danh **P-02599**. Evidence được xác nhận cho thấy người tham gia đã mở cột nguồn trong Option B để kiểm tra bản nháp AI, đánh giá bố cục hai cột dễ kiểm tra hơn và thích quiz ngắn hơn việc đọc lại ghi chú dài. Cuối phiên, P-02599 chọn **Hybrid B + C**.

## Danh mục bài nộp

| Tài liệu | Vai trò trong bài nộp của Lê Thanh Tình | Liên kết |
| :--- | :--- | :--- |
| **Three-Option Design Sheet** | Trình bày ba phương án A/B/C, mức độ can thiệp của AI, quyền kiểm soát của người học và giả thuyết cần kiểm tra. | [three-option-design-sheet.md](./three-option-design-sheet.md) |
| **Prototype Links** | Cung cấp demo chạy offline cho A/B/C/Hybrid và hướng dẫn truy cập các luồng tương tác. | [prototype-link.md](./prototype-link.md) |
| **Prototype Feedback Note** | Biên bản phiên cá nhân của tôi với P-02599, gồm nhiệm vụ, evidence được xác nhận và lựa chọn cuối phiên. | [prototype-feedback-note.md](./prototype-feedback-note.md) |
| **Group Feedback Synthesis** | Đối chiếu kết quả cá nhân với xu hướng chung của nhóm và giải thích quyết định hội tụ. | [group-feedback-synthesis.md](./group-feedback-synthesis.md) |
| **AI Support Log** | Khai báo tôi đã dùng AI vào đâu, giới hạn của AI và những quyết định cuối cùng do con người chịu trách nhiệm. | [ai-support-log.md](./ai-support-log.md) |

---

## Ba phương án tôi đưa vào thử nghiệm

### Option A — Contextual Pinning & Timeline Highlighter

Người học tự đánh dấu và phân loại dấu vết học tập; AI chỉ hỗ trợ gợi ý nhãn và giữ liên kết về slide hoặc timestamp. Phương án này có độ kiểm soát cao nhưng yêu cầu nhiều thao tác thủ công.

### Option B — Dual-Pane Interactive Canvas

AI tổ chức nội dung thành bản nháp ở một cột, trong khi cột còn lại giữ dấu vết nguồn. Người học đối chiếu, chỉnh sửa và xác nhận trước khi lưu. Đây là phương án giúp cân bằng giữa tiết kiệm thời gian và khả năng kiểm chứng.

### Option C — Active Recall & Smart Quiz

AI chuyển highlights và các điểm “Chưa hiểu” thành câu hỏi ôn tập ngắn. Phương án này tạo động lực học chủ động nhưng cần gắn nguồn cho câu hỏi, đáp án và phần giải thích.

## Kết quả phiên thử nghiệm cá nhân

| Nội dung | Kết quả được xác nhận |
| :--- | :--- |
| Người tham gia | P-02599 |
| Ngày và thời lượng | 05/10/2026 — 10 phút |
| Hành vi quan sát | Mở cột nguồn ở Option B để kiểm tra bản nháp AI |
| Phản hồi diễn giải | Bố cục hai cột dễ kiểm tra hơn; quiz ngắn hấp dẫn hơn đọc lại ghi chú dài |
| Lựa chọn cuối phiên | Hybrid B + C |

Phản hồi được trình bày dưới dạng **diễn giải**, không phải trích dẫn nguyên văn, vì phiên thử nghiệm không có bản ghi âm.

## Quyết định của tôi

Từ evidence của phiên cá nhân và kết quả tổng hợp nhóm, tôi chọn **Hybrid B + C**:

1. Dùng Option B làm giao diện chính để người học kiểm tra và sửa bản nháp AI.
2. Chỉ tạo quiz của Option C sau khi người học đã xác nhận ghi chú.
3. Giữ cơ chế nguồn của Option A gồm slide, timestamp và thao tác quay lại ngữ cảnh.
4. Không để AI tự lưu nội dung hoặc tự ép người học làm quiz.
5. Cho phép người học sửa, khôi phục, bỏ qua, làm sau và báo câu hỏi sai.

## Chạy prototype

Prototype dùng dữ liệu mô phỏng, **không gọi API và không yêu cầu API key**.

1. Mở [`prototype-site/dist/index.html`](./prototype-site/dist/index.html) bằng Chrome hoặc Edge.
2. Chọn Option A, B, C hoặc Hybrid trên thanh điều hướng.
3. Dùng nút **Hướng dẫn** để chạy kịch bản demo.

## Giới hạn và trách nhiệm cá nhân

- Tôi không dùng AI để tạo phản hồi hoặc trích dẫn giả từ người tham gia.
- Tôi phân biệt evidence của P-02599 với xu hướng tổng hợp của nhóm.
- Tôi dùng phản hồi dạng diễn giải vì không có bản ghi âm nguyên văn.
- Tôi chịu trách nhiệm rà soát độ chính xác của hồ sơ, khả năng truy cập prototype và quyết định thiết kế cuối cùng.
