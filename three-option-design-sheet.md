# Bảng Thiết Kế 3 Phương Án Prototype (Three-Option Design Sheet)

**Nhóm:** `3 in 1`  
**Học viên:** Lê Thanh Tình (2A202602449)  
**AI Feature Case:** Case B — AI Notes: Personal Learning Notes  

---

## 1. Bối cảnh & Bài toán cần giải quyết (Kế thừa từ Day 17)

- **Job to be Done (JTBD):**  
  > *Khi hoàn thành một buổi học trực tuyến có nhiều kiến thức mới hoặc phức tạp, tôi muốn nhanh chóng tổng hợp và khôi phục đúng ngữ cảnh của các ghi chú, highlights và điểm chưa hiểu, để có thể ôn tập, làm bài tập hoặc áp dụng kiến thức mà không phải tốn hàng giờ đọc lại toàn bộ bài giảng từ đầu.*
- **Pain Point trọng tâm:**  
  Các dấu vết học tập (ghi chú, highlights, ảnh chụp màn hình) thường rời rạc, mất ngữ cảnh sau bài học; học viên lười đọc lại các bản tóm tắt văn bản dài (thụ động), đồng thời gặp trở ngại khi phải tự tổ chức lại nội dung.
- **Mục tiêu của vòng Prototype:**  
  Thiết kế và kiểm thử 3 hướng tiếp cận khác nhau về mức độ can thiệp của AI, cơ chế tương tác và mức độ kiểm soát của người dùng để tìm ra giải pháp tối ưu nhất cho học viên.

---

## 2. Chi tiết 3 Phương Án Thiết Kế (Options A, B, C)

### Option A: Contextual Pinning & Timeline Highlighter (Low AI / High User Control)

- **Triết lý thiết kế:** Tôn trọng tối đa thói quen ghi chú thủ công của học viên; AI đóng vai trò người phụ tá thầm lặng, không tự ý viết lại hay tóm tắt nội dung mà chỉ giúp neo giữ ngữ cảnh và sắp xếp theo trục thời gian.
- **Mô tả giải pháp:**
  - Trong lúc xem video hoặc đọc bài, khi người dùng bôi đen (highlight) hoặc bấm nút "Chưa hiểu", hệ thống tự động gắn kèm mốc thời gian (timestamp) và đoạn văn bản gốc của bài học.
  - Sau buổi học, hệ thống hiển thị thanh **Timeline View** gồm các thẻ ghi chú đã được pin.
  - Người dùng tự kéo thả, nhóm thẻ vào các thư mục hoặc chủ đề tự đặt tên.
  - **AI Capability:** AI chỉ hỗ trợ gợi ý tag (nhãn phân loại) dựa trên nội dung câu và cung cấp tính năng "Jump to context" (click vào thẻ để nhảy về đúng đoạn video/bài học gốc).
- **Mức độ kiểm soát của User:** 90% do người dùng chủ động phân loại, kiểm tra và sắp xếp; 10% AI hỗ trợ gắn tag.
- **Ưu điểm:** Độ tin cậy tuyệt đối, người dùng hoàn toàn làm chủ tài liệu, không sợ AI bịa đặt hay làm mất ý gốc.
- **Rủi ro / Điểm nghẽn:** Người dùng vẫn phải bỏ nhiều công sức kéo thả và tổ chức sau buổi học; nếu lười, các thẻ ghi chú vẫn nằm yên mà không được sử dụng.

---

### Option B: Dual-Pane Interactive Canvas & Co-pilot Notes (Balanced AI / Co-creation)

- **Triết lý thiết kế:** Hợp tác đồng sáng tạo (Human-in-the-loop). AI tổ chức thông tin thành bản nháp có cấu trúc, nhưng đặt cạnh nguồn gốc và người dùng là người biên tập cuối cùng.
- **Mô tả giải pháp:**
  - Khi hoàn thành bài học, người dùng bấm **"Tạo AI Notes"**.
  - Giao diện mở ra ở dạng **Dual-Pane (2 cột song song)**:
    - *Cột trái:* Danh sách đầy đủ các trích dẫn gốc, highlights, câu hỏi và điểm đánh dấu "Chưa hiểu" theo mạch bài học.
    - *Cột phải:* Bản ghi chú tổng hợp do AI sắp xếp theo cấu trúc: `Khái niệm then chốt` → `Điểm cần làm rõ (từ các thắc mắc/chưa hiểu)` → `Ví dụ áp dụng` → `Checklist hành động`.
  - Mỗi đoạn văn do AI sinh ra đều có liên kết (hyperlink) trỏ trực tiếp về câu trích dẫn tương ứng ở cột trái.
  - Người dùng có thể click để sửa trực tiếp câu từ, thêm bớt ý, hoặc bấm nút *"Tái cấu trúc"* cho từng đoạn nhỏ trước khi bấm *"Xác nhận & Lưu"*.
- **Mức độ kiểm soát của User:** Cân bằng 50-50. AI làm phần việc nặng là gom nhóm và lên khung; người dùng kiểm duyệt, bổ sung insight cá nhân và chốt văn bản.
- **Ưu điểm:** Tiết kiệm đáng kể thời gian tổng hợp; cấu trúc rõ ràng; tính minh bạch cao nhờ đối chiếu 2 cột song song (loại bỏ nỗi lo AI hallucination).
- **Rủi ro / Điểm nghẽn:** Đòi hỏi người dùng phải dành 3-5 phút ngồi đọc soát và chỉnh sửa ngay sau buổi học; nếu bài học quá dài có thể gây ngợp thông tin ở cột trái.

---

### Option C: Autonomous Active Recall & Smart Quiz Engine (High AI / Proactive Learning)

- **Triết lý thiết kế:** Hướng đến hành vi học tập chủ động (Active Recall). Thay vì tạo thêm một tài liệu để người dùng "đọc lại", AI biến các dấu vết và điểm khó hiểu thành các bài tập kiểm tra phản xạ kiến thức.
- **Mô tả giải pháp:**
  - Dựa trên insight thực tế từ Day 17 (người học thường nạp note vào AI để làm quiz ôn tập), hệ thống tự động quét các điểm highlight và những câu người dùng bấm "Chưa hiểu".
  - Ngay sau bài học hoặc sau 24 giờ (theo thuật toán Spaced Repetition):
    - AI gửi thông báo: *"Bạn có 3 điểm chưa hiểu trong bài vừa qua. Thử trả lời 3 câu hỏi nhanh để kiểm tra nhé!"*.
    - Giao diện hiển thị: 3-5 câu hỏi trắc nghiệm ngắn + 1 câu hỏi tình huống thực tế dựa đúng vào những chỗ người dùng bị vướng.
    - Khi làm bài xong, AI giải thích chi tiết đáp án đúng/sai, trích dẫn bài học gốc và tự động lưu kết quả vào thẻ ghi nhớ (Flashcard Deck).
- **Mức độ kiểm soát của User:** 20% can thiệp vào việc tạo (chủ yếu là trả lời bài tập); 80% do AI tự động trích xuất và sinh câu hỏi.
- **Ưu điểm:** Kích thích phản xạ học tập vượt trội (Active Recall); biến kiến thức thành hành động cụ thể; không làm người học ngán ngẩm vì phải đọc tài liệu dài.
- **Rủi ro / Điểm nghẽn:** Nguy cơ AI đặt câu hỏi sai ngữ cảnh hoặc đưa đáp án sai (Hallucination); người học có thể cảm thấy áp lực nếu bị "ép" làm bài kiểm tra khi đang mệt mỏi.

---

## 3. Bảng Ma Trận So Sánh 3 Phương Án

| Tiêu chí đánh giá | Option A: Contextual Pinning | Option B: Dual-Pane Canvas | Option C: Active Recall Quiz |
| :--- | :--- | :--- | :--- |
| **Mức độ can thiệp của AI** | Thấp (Chỉ hỗ trợ gắn tag & timeline) | Vừa (Cộng tác đồng sáng tạo, gom nhóm) | Cao (Tự động sinh câu hỏi & đánh giá) |
| **Công sức người dùng sau bài học** | Cao (Tự kéo thả, tổ chức thủ công) | Trung bình (Duyệt, chỉnh sửa bản nháp 3-5p) | Thấp (Chỉ mở ra làm 3 câu trắc nghiệm nhanh) |
| **Tính minh bạch & Khả năng kiểm chứng** | Tuyệt đối (100% là ghi chú gốc) | Rất cao (Có cột gốc đối chiếu song song) | Trung bình (Cần đối chiếu đáp án với bài gốc) |
| **Rủi ro AI Ảo giác (Hallucination)** | Gần như bằng 0 | Thấp (Người dùng rà soát trước khi lưu) | Có thể xảy ra nếu AI sinh câu hỏi/đáp án sai |
| **Mức độ thúc đẩy ôn tập thực tế** | Thấp (Dễ bị bỏ quên sau khi lưu) | Trung bình - Khá (Có tài liệu cấu trúc đẹp) | Rất cao (Thực hành Active Recall ngay lập tức) |
| **Tính khả thi về mặt kỹ thuật** | Rất cao, dễ triển khai | Khả thi, đòi hỏi thiết kế UX 2 cột tốt | Khả thi với Prompt Engineering & RAG chặt chẽ |

---

## 4. Giả Thuyết Cần Kiểm Tra Qua Vòng Thử Nghiệm Prototype

1. **Về Option A:** Liệu người dùng có thực sự chịu bỏ công tự sắp xếp các thẻ ghi chú sau buổi học, hay họ vẫn bỏ mặc như cách họ lưu bookmark hiện nay?
2. **Về Option B:** Giao diện 2 cột đối chiếu có mang lại cảm giác an tâm và kiểm soát cho người dùng không? Thời gian chỉnh sửa trung bình là bao lâu?
3. **Về Option C:** Người dùng có thích làm bài tập trắc nghiệm do AI tạo ra từ điểm yếu của mình không? Họ có tin tưởng vào tính chính xác của câu hỏi và đáp án không?
