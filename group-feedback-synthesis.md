# Báo Cáo Tổng Hợp Phản Hồi Nhóm (Group Feedback Synthesis)

**Tên nhóm:** `3 in 1`

**AI Feature Case:** Case B — AI Notes: Personal Learning Notes

**Thành viên:** Chu Thủy Dương (2A202602660), Lê Thanh Tình (2A202602449), Phạm Hương Giang (2A202602359)

> **Phạm vi dữ liệu:** Bản tổng hợp này dựa trên kết luận của 3 phiên thử nghiệm được ghi trong hồ sơ nhóm của Chu Thủy Dương. Các ghi chú cá nhân chi tiết của từng phiên chưa có trong thư mục hiện tại, vì vậy báo cáo chỉ nêu các xu hướng đã được xác nhận, không tự tạo số liệu hoặc trích dẫn trực tiếp.

---

## 1. Tổng quan các phiên thử nghiệm

Nhóm đã đối chiếu phản hồi từ **3 người dùng** đối với ba hướng thiết kế có mức độ can thiệp của AI khác nhau:

- **Option A — Contextual Pinning & Timeline Highlighter:** người học tự phân loại dấu vết học tập; AI chỉ gợi ý nhãn và giữ liên kết về ngữ cảnh gốc.
- **Option B — Dual-Pane Interactive Canvas & Co-pilot:** AI dựng bản nháp có cấu trúc, đặt cạnh các dấu vết gốc để người học kiểm tra và chỉnh sửa.
- **Option C — Autonomous Active Recall & Smart Quiz Engine:** AI biến highlights và điểm “Chưa hiểu” thành câu hỏi ôn tập ngắn.

Mục tiêu của vòng thử nghiệm là kiểm tra ba giả thuyết: người dùng có sẵn sàng tự tổ chức ghi chú ở Option A hay không; giao diện đối chiếu của Option B có tạo cảm giác kiểm soát hay không; và hoạt động Active Recall của Option C có đủ hấp dẫn nhưng vẫn đáng tin cậy hay không.

## 2. Ma trận tổng hợp phản hồi chéo

| Tiêu chí | Option A | Option B | Option C |
| :--- | :--- | :--- | :--- |
| Giá trị được ghi nhận | Giữ nguyên ngữ cảnh và quyền kiểm soát | Bản nháp có cấu trúc, dễ đối chiếu với nguồn | Biến ghi chú thành hành động ôn tập ngắn |
| Phản hồi chung | Ít được ưu tiên vì vẫn phải tự “dọn dẹp” và phân loại | Cả ba phiên đều phản hồi tích cực với bố cục 2 cột | Được đón nhận tích cực, đặc biệt ở cơ chế trắc nghiệm |
| Điểm nghẽn | Công sức sau buổi học cao; dễ bị bỏ quên | Có thể gây ngợp nếu cột dấu vết quá dài; vẫn cần thời gian duyệt | Rủi ro câu hỏi/đáp án sai ngữ cảnh; thông báo có thể tạo áp lực |
| Vai trò phù hợp | Nguồn dữ liệu và liên kết về bài gốc | Giao diện làm việc chính | Module củng cố sau khi ghi chú đã được duyệt |
| Quyết định | Không chọn làm phương án lõi | Giữ làm nền tảng | Tích hợp vào Option B |

### 2.1. Option A — Contextual Pinning & Timeline Highlighter

Người dùng hiểu giá trị của việc lưu đúng ngữ cảnh, nhưng không muốn tiếp tục thực hiện nhiều thao tác kéo thả và phân loại sau khi học. Phản hồi này bác bỏ giả thuyết rằng tăng quyền kiểm soát thủ công sẽ tự động làm tăng khả năng người học quay lại sử dụng ghi chú. Thành phần nên giữ lại là **timestamp, trích dẫn nguồn và thao tác “Jump to context”**, không phải toàn bộ luồng tổ chức thủ công.

### 2.2. Option B — Dual-Pane Interactive Canvas & Co-pilot

Bố cục hai cột được đón nhận nhất quán vì vừa giảm công sức tổng hợp, vừa cho phép kiểm chứng nội dung AI với nguồn gốc. Khả năng chỉnh sửa bản nháp trước khi lưu giúp AI đóng vai trò cộng tác thay vì tự quyết định. Tuy nhiên, cột nguồn dài có thể chiếm diện tích và gây quá tải thị giác; vì vậy dấu vết nên được thu gọn mặc định và chỉ mở khi người dùng cần đối chiếu.

### 2.3. Option C — Autonomous Active Recall & Smart Quiz Engine

Cơ chế trắc nghiệm tạo động lực hơn việc đọc lại một bản tóm tắt dài, phù hợp với thói quen biến note thành quiz đã được nhận diện từ Day 17. Điểm còn phải kiểm soát là độ chính xác: mỗi câu hỏi, đáp án và lời giải cần liên kết về đoạn bài học gốc; người dùng cũng cần quyền bỏ qua, làm sau hoặc báo câu hỏi sai.

## 3. Các insight xuyên suốt

1. **Người học muốn giảm công sức tổ chức, không muốn mất quyền kiểm soát.** AI nên dựng nháp và đề xuất cấu trúc; quyết định lưu cuối cùng vẫn thuộc về người dùng.
2. **Khả năng truy xuất nguồn là điều kiện tạo niềm tin.** Nội dung do AI sinh cần đi kèm timestamp/slide và trạng thái “Cần kiểm tra” khi chưa chắc chắn.
3. **Đọc lại thụ động không đủ tạo động lực.** Một bước Active Recall ngắn tạo giá trị hành động rõ hơn so với chỉ sinh thêm tài liệu dài.
4. **Giảm tải thị giác là yêu cầu quan trọng.** Nguồn gốc phải luôn truy cập được nhưng không cần luôn chiếm màn hình.
5. **Tự động hóa cần có điểm dừng.** AI có thể gom nhóm, tóm tắt và tạo quiz, nhưng không nên tự lưu nội dung chưa được người học xác nhận.

## 4. Quyết định hội tụ của nhóm

Nhóm chọn **phương án lai ghép Hybrid B + C**:

1. Dùng **Option B** làm luồng chính: chọn dấu vết → AI dựng nháp → người dùng đối chiếu/chỉnh sửa → xác nhận.
2. Sau khi bản ghi chú được xác nhận, dùng **Option C** để tạo một phiên Active Recall khoảng 3 phút từ các điểm “Chưa hiểu” và nội dung trọng tâm.
3. Kế thừa từ **Option A** cơ chế timestamp, trích dẫn nguồn và nhảy về đúng ngữ cảnh.

### Rationale

Phương án kết hợp giải quyết đồng thời hai nhu cầu được lặp lại qua các phiên: cần một bản ghi chú có cấu trúc nhưng không phải tự sắp xếp từ đầu, và cần một cách ôn tập chủ động thay cho đọc lại tài liệu dài. Option B tạo lớp kiểm soát và minh bạch; Option C tạo động lực học; các liên kết nguồn từ Option A giảm rủi ro AI tạo nội dung sai.

## 5. Điều chỉnh cho vòng tiếp theo

- Thu gọn cột **Dấu vết bài giảng** theo mặc định; cho phép mở lại và kéo thay đổi độ rộng.
- Hiển thị nguồn theo từng đoạn AI sinh, gồm slide/timestamp và thao tác nhảy về ngữ cảnh.
- Gắn nhãn **“Cần kiểm tra”** cho nội dung có độ chắc chắn thấp; không tự động lưu trước khi người dùng xác nhận.
- Chỉ sinh quiz sau khi bản nháp đã được duyệt; ưu tiên các điểm “Chưa hiểu”.
- Cho phép **Bỏ qua / Làm sau / Báo câu hỏi sai** để giảm cảm giác bị ép học.
- Ở vòng test kế tiếp, đo: thời gian hoàn thành bản nháp, số lần mở cột nguồn, số chỉnh sửa trước khi lưu, tỷ lệ hoàn thành quiz và mức độ tin tưởng vào câu hỏi/đáp án.

## 6. Câu hỏi còn mở

- Bao nhiêu dấu vết là đủ để tạo bản nháp hữu ích mà không gây ngợp?
- Người dùng có thực sự kiểm tra nguồn hay chỉ cảm thấy an tâm vì nguồn được hiển thị?
- Thời điểm nào phù hợp hơn cho quiz: ngay cuối bài hay sau 24 giờ?
- Khi AI tạo nội dung sai, cơ chế sửa và phản hồi nào giúp khôi phục niềm tin nhanh nhất?
