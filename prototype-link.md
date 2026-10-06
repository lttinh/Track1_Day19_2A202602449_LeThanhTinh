# Danh Sách Liên Kết Prototype (Prototype Links)

**Tên nhóm:** `3 in 1`  
**Thành viên:**  
- Chu Thủy Dương (2A202602660)  
- Lê Thanh Tình (2A202602449)  
- Phạm Hương Giang (2A202602359)  
**AI Feature Case:** Case B — AI Notes: Personal Learning Notes  

---

## Liên kết Prototype tương tác của nhóm

Dưới đây là liên kết đến các phiên bản prototype cho cả 3 phương án thiết kế và phương án lai ghép của nhóm `3 in 1`:

| Phương án | Tên giải pháp | Công cụ | Liên kết Prototype tương tác |
| :--- | :--- | :--- | :--- |
| Option A | *Contextual Pinning & Timeline Highlighter* | HTML/JS/CSS | [Trải nghiệm Prototype Option A](./prototype-site/dist/option-a.html) |
| Option B | *Dual-Pane Interactive Canvas & Co-pilot Notes* | HTML/JS/CSS | [Trải nghiệm Prototype Option B](./prototype-site/dist/option-b.html) |
| Option C | *Autonomous Active Recall & Smart Quiz Engine* | HTML/JS/CSS | [Trải nghiệm Prototype Option C](./prototype-site/dist/option-c.html) |
| Phương án Lai Ghép (Hybrid) | *Dual-Pane Canvas (B) + Active Recall Quiz (C)* | HTML/JS/CSS | [Trải nghiệm Prototype Hybrid (B+C)](./prototype-site/dist/index.html?option=hybrid) (Phương án nhóm chọn) |
| Hub Tổng Hợp | *Bộ điều hướng VLearn A/B/C/Hybrid* | HTML/JS/CSS | [Mở Hub Prototype VLearn](./prototype-site/dist/index.html) |

---

## Các tính năng tương tác nổi bật trong bản nâng cấp mới:
1. **Đóng/mở Sổ ghi chú nổi (Floating Note Drawer):** Mặc định ẩn gọn gàng, học viên bấm nút `[ Sổ ghi chú 1 ]` ở thanh công cụ hoặc nút Sparkle trên slide để mở ra; hỗ trợ kéo thả tự do trên màn hình slide.
2. **Ẩn/Hiện cột Dấu vết bài giảng theo ngữ cảnh:** Ở Option B, C và Hybrid, cột dấu vết phụ được mặc định thu gọn (`collapsed`) để giải phóng không gian soạn thảo Co-pilot; khi cần đối chiếu học viên chỉ cần bấm nút `Dấu vết (9)` ở thanh trên. Ở Option A thì vẫn mở sẵn để phục vụ thao tác kéo thả 3 cột.
3. **Thanh chia linh hoạt (Draggable Resizer):** Cho phép rê chuột hoặc chạm kéo thanh splitter ở giữa để thu nhỏ/phóng to bảng Dual Panel theo ý muốn (từ 280px lên đến 75vw) thay vì fix cứng kích thước.
4. **Responsive đa thiết bị:** Tự động tối ưu bố cục trên Desktop, Laptop 13-14 inch, Tablet và Mobile.
5. **Popup hướng dẫn tương tác & Kịch bản tự động:** Nút `💡 Hướng dẫn` tích hợp sẵn tour demo tự động chạy thử phản xạ AI và cho phép người dùng tự tay thao tác trực tiếp.