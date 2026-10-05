# Prototype Links — A/B/C & Hướng Dẫn Trải Nghiệm

**Nhóm:** `3 in 1`  
**Thành viên:**  
- Chu Thùy Dương — 2A202602660 (Phụ trách Option A)  
- Lê Thanh Tình — 2A202602449 (Phụ trách Option B)  
- Phạm Hương Giang — 2A202602359 (Phụ trách Option C)  
**AI Feature Case:** Case B — AI Notes: Personal Learning Notes  

---

## 1. Điều kiện test chung

- **Target user:** Học viên học nội dung trực tuyến mới hoặc phức tạp, gần đây đã ghi chú, highlight hoặc lưu nội dung.
- **Situation:** Sau một bài học (Bài 14: Model Evaluation), học viên cần chuẩn bị để ôn tập, làm bài lab hoặc áp dụng kiến thức.
- **Task dành cho tester:** Trong 5 phút, dùng từng prototype để biến cùng một bộ dấu vết học tập thành một study pack có thể kiểm tra và dùng lại.
- **Starting content:** Cùng một fixture giả lập từ Bài 14: đoạn nội dung nguồn, 4 highlights, 2 điểm “Chưa hiểu”, 1 câu hỏi và 2 ghi chú nháp; có nội dung về “benchmark” và “test set”.
- **Desired outcome:** Một study pack được tổ chức, truy được về nguồn, phân biệt phần AI tạo và được user quyết định trước khi lưu.
- **Thứ tự test:** Luân phiên thứ tự giữa các tester (ví dụ: T1: B → C → A; T2: C → A → B; T3: A → B → C) để giảm thiểu order bias.

---

## 2. Danh sách file HTML Prototype (Mở được trực tiếp với Giảng viên / TA)

Nhóm đã hoàn thiện và đóng gói thành công bộ 3 file HTML prototype độc lập (tự chứa toàn bộ giao diện và logic tương tác qua JavaScript thuần, không phụ thuộc backend hay model API thật). Giảng viên và TA có thể click trực tiếp để mở trên bất kỳ trình duyệt nào:

| Prototype | File HTML tương ứng | Cơ chế Human–AI | Phụ trách | Trạng thái truy cập |
|---|---|---|---|---|
| **Option A — Tự xếp thẻ có nguồn** | [Mở file option-a.html](./prototype-site/dist/option-a.html) | **User creates · AI supports on request**: Người học tự kéo/chọn thẻ vào 3 nhóm (`Ý chính / Chưa hiểu / Xem lại`). AI chỉ tra nguồn hoặc báo trùng lặp khi người học nhấn nút gọi. | Chu Thùy Dương | [x] Mở trực tiếp bằng trình duyệt (Offline/Local) |
| **Option B — Đồng biên tập bản note** | [Mở file option-b.html](./prototype-site/dist/option-b.html) | **User + AI Co-create (Dual-Pane)**: Người học chọn mục tiêu và các dấu vết gửi tới AI. AI tạo draft đối chiếu 2 cột song song kèm cờ cảnh báo suy luận chưa chắc. Người học trực tiếp click sửa chữ (inline edit) và duyệt bản lưu. | Lê Thanh Tình | [x] Mở trực tiếp bằng trình duyệt (Offline/Local) |
| **Option C — Study Pack chủ động** | [Mở file option-c.html](./prototype-site/dist/option-c.html) | **AI Initiates · User Reviews**: AI chủ động đề xuất study pack + bài trắc nghiệm phản xạ 3 phút (Active Recall) chuyển hóa từ điểm "Chưa hiểu". Người học tương tác làm bài, loại bỏ item thừa và duyệt lưu. | Phạm Hương Giang | [x] Mở trực tiếp bằng trình duyệt (Offline/Local) |
| **Hub tổng hợp (A/B/C Switcher)** | [Mở file index.html](./prototype-site/dist/index.html) | Trung tâm điều hướng tổng hợp, hỗ trợ chuyển đổi linh hoạt cả 3 Option trên cùng một màn hình, có nút bật/tắt Facilitator Annotation. | Cả nhóm | [x] Mở trực tiếp bằng trình duyệt (Offline/Local) |

> **Hướng dẫn mở nhanh cho Giảng viên / TA:**  
> - Cách 1: Click đúp trực tiếp vào các tệp `.html` trong thư mục `prototype-site/dist/` bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox). Đường dẫn tệp dạng `file:///.../prototype-site/dist/index.html`.  
> - Cách 2: Mở bằng tiện ích Live Server trong VS Code hoặc lệnh `npx serve prototype-site/dist`.  
> - Chế độ Facilitator Annotation: Mở `prototype-site/dist/index.html?facilitator=1` hoặc nhấn nút **"👁 Hiện Annotation"** trên thanh tiêu đề để xem ghi chú quan sát.

---

## 3. Test Prompt dành cho Tester

> *"Bạn vừa hoàn thành Bài 14 và cần chuẩn bị để ôn tập/làm bài. Trong 5 phút, với bộ nội dung nguồn, highlights, điểm “Chưa hiểu”, câu hỏi và ghi chú nháp đã cho, hãy dùng lần lượt từng prototype để tạo một study pack bạn có thể kiểm tra và dùng lại. Hãy nói thành tiếng điều bạn đang nghĩ (think-aloud). Tôi đang kiểm tra tính thân thiện của prototype, không kiểm tra bạn; tôi sẽ không hướng dẫn cách dùng giao diện."*

*(Nguyên tắc: Không pitch giải pháp, không giải thích cơ chế trước khi test, không hỏi câu dẫn dắt cảm tính).*

---

## 4. Biên bản Peer-Test chéo giữa 3 thành viên & Ghi lại lỗi (Defect Log)

Trước khi đem prototype đi test với người dùng ngoài nhóm, cả 3 thành viên đã tiến hành **Peer Test chéo** trên mã nguồn và giao diện thực tế của nhau vào ngày 2026-10-05.

### 4.1. Phân công thử nghiệm chéo
1. **Lê Thanh Tình** (phụ trách Option B) → Test chéo Option A (Chu Thùy Dương) và Option C (Phạm Hương Giang).
2. **Chu Thùy Dương** (phụ trách Option A) → Test chéo Option B (Lê Thanh Tình) và Option C (Phạm Hương Giang).
3. **Phạm Hương Giang** (phụ trách Option C) → Test chéo Option A (Chu Thùy Dương) và Option B (Lê Thanh Tình).

### 4.2. Bảng ghi lại lỗi (Defect & Usability Bug Log)

| Bug ID | Option | Người phát hiện | Người phụ trách | Mô tả lỗi / Thao tác thực tế | Kỳ vọng vs Thực tế | Mức độ | Biện pháp xử lý & Trạng thái |
|---|---|---|---|---|---|---|---|
| **BUG-A01** | Option A | Lê Thanh Tình | Chu Thùy Dương | Danh sách dấu vết chưa xếp ban đầu bị cắt `slice(0, 5)` chỉ hiện 5 thẻ đầu tiên. | **Kỳ vọng:** Người dùng nhìn thấy đủ 9 dấu vết hoặc có thanh cuộn/thông báo số lượng.<br>**Thực tế:** Người dùng tưởng chỉ có 5 thẻ. | Medium | **Đã sửa:** Hiển thị toàn bộ dấu vết với khung cuộn `max-height: 280px` và thêm huy hiệu đếm thẻ `X/9`. |
| **BUG-A02** | Option A | Lê Thanh Tình | Chu Thùy Dương | Thao tác `undo` thẻ xếp gần nhất luôn xóa cứng từ nhóm `review` → `unclear` → `main`. | **Kỳ vọng:** Hoàn tác đúng thẻ vừa bấm gần nhất theo thứ tự thời gian.<br>**Thực tế:** Xóa nhầm thẻ của nhóm khác. | High | **Đã sửa:** Bổ sung `history stack` lưu `{id, bucket}` để pop đúng thẻ vừa thêm. |
| **BUG-A03** | Option A | Phạm Hương Giang | Chu Thùy Dương | Bấm nút *"AI: kiểm tra trùng"* chỉ hiện thông báo Toast, không làm rõ trên màn hình thẻ nào trùng. | **Kỳ vọng:** Làm nổi bật trực quan 2 thẻ trùng.<br>**Thực tế:** Không biết thẻ nào trùng nếu không đọc kỹ chữ trong toast. | Medium | **Đã sửa:** Thêm hiệu ứng highlight viền cam xung quanh Thẻ 4 & Thẻ 5 (đều nói về Test set). |
| **BUG-B01** | Option B | Chu Thùy Dương | Lê Thanh Tình | Nút *"Khôi phục nguyên văn"* chỉ hiện Toast chứ văn bản trong `textarea` không thay đổi. | **Kỳ vọng:** Nội dung trong textarea khôi phục lại văn bản gốc.<br>**Thực tế:** Chữ trong textarea vẫn giữ nguyên văn bản của AI. | High | **Đã sửa:** Cập nhật lại giá trị các trường `textarea` về văn bản nguyên gốc của các dấu vết Bài 14. |
| **BUG-B02** | Option B | Chu Thùy Dương | Lê Thanh Tình | Người dùng gõ sửa nội dung trong các thẻ, nhưng bấm *"Xác nhận"* thì màn hình Result không hiển thị lại phần đã sửa. | **Kỳ vọng:** Result phản ánh đúng nội dung người dùng vừa gõ.<br>**Thực tế:** Hiển thị văn bản mặc định ban đầu. | Medium | **Đã sửa:** Lắng nghe sự kiện `input` và đồng bộ nội dung từ `textarea` vào `state.draft` trước khi chuyển sang Result. |
| **BUG-B03** | Option B | Phạm Hương Giang | Lê Thanh Tình | Click vào source chip (ví dụ "Nguồn 03:12 · 08:40") ở cột phải chỉ hiện Toast. | **Kỳ vọng:** Cuộn và làm nổi bật thẻ nguồn tương ứng ở cột trái.<br>**Thực tế:** Người dùng phải tự căng mắt tìm ở cột trái. | Low | **Đã sửa:** Thêm hàm `highlightSourceCard()` tự động cuộn (scrollIntoView) và viền xanh thẻ nguồn bên trái. |
| **BUG-C01** | Option C | Lê Thanh Tình | Phạm Hương Giang | Thẻ trắc nghiệm Quick-check 1 *"Mọi benchmark đều phù hợp..."* là câu hỏi nhưng không có nút trả lời Đúng/Sai. | **Kỳ vọng:** Có nút tương tác Đúng/Sai để người học thử phản xạ.<br>**Thực tế:** Chỉ có nút xóa "Loại khỏi pack". | High | **Đã sửa:** Thêm cụm nút bấm `[Đúng]` / `[Sai]` và hiển thị feedback giải thích đúng/sai tức thì. |
| **BUG-C02** | Option C | Lê Thanh Tình | Phạm Hương Giang | Nút *"Thu hẹp input"* bấm vào thì văng về màn hình bắt đầu bài học. | **Kỳ vọng:** Mở bộ lọc danh sách dấu vết để người dùng tick chọn lại phạm vi.<br>**Thực tế:** Mất toàn bộ ngữ cảnh đang review. | Medium | **Đã sửa:** Tích hợp bộ lọc checkbox thu hẹp input ngay phía trên khung review draft. |
| **BUG-C03** | Option C | Chu Thùy Dương | Phạm Hương Giang | Nếu bấm "Loại khỏi pack" hết cả 4 mục thì nút xác nhận vẫn sáng `Xác nhận 0 mục`. | **Kỳ vọng:** Nút xác nhận bị vô hiệu hóa khi không còn mục nào.<br>**Thực tế:** Vẫn cho phép bấm lưu một study pack rỗng. | Low | **Đã sửa:** Thêm điều kiện `disabled` cho nút xác nhận khi `activeItems.length === 0`. |

---

## 5. Checklist Test-Ready Check (Đã nghiệm thu)

- [x] Bản HTML cục bộ mở được không cần đăng nhập, hoàn toàn độc lập, tương thích mọi trình duyệt.
- [x] Mỗi prototype có điểm bắt đầu rõ ràng và kịch bản gợi ý 5 phút.
- [x] UI có đầy đủ microcopy expectation/limit; tester tự thao tác được mà không cần giải thích cơ chế.
- [x] Ba option dùng chung visual system, typography, màu sắc và mức fidelity tương đương.
- [x] Cả ba option dùng cùng một data fixture (Bài 14: 9 dấu vết) và chung một kết quả mong muốn.
- [x] Khoảng 70% context, content và visual components được dùng chung.
- [x] Mỗi option chỉ gồm 3 trạng thái quanh critical interaction.
- [x] Đã hoàn tất phiên Peer Test chéo giữa 3 thành viên và sửa chữa toàn bộ 9 lỗi phát hiện được trên code HTML/JS.
- [x] Cơ chế phục hồi (Reset / Undo / Dừng / Khôi phục) hoạt động chính xác trên cả 3 file HTML.
