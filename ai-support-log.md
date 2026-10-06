# AI Support Log — Lê Thanh Tình

> Đây là phản ánh cá nhân. AI được dùng như công cụ hỗ trợ tư duy và sản xuất, không phải người dùng và không phải nguồn xác thực kết quả.

> AI chỉ hỗ trợ xây dựng cấu trúc, diễn đạt và kiểm tra tính nhất quán. AI không được dùng để tạo trích dẫn, quan sát hoặc phản hồi người dùng không tồn tại.

## 1. Phạm vi sử dụng AI

| Thời điểm | Công cụ/model | Tôi yêu cầu AI làm gì | Đầu ra được dùng | Quyết định và kiểm tra của tôi |
|---|---|---|---|---|
| 2026-10-05 | Codex | Đọc tài liệu Day 17 của nhóm, trích xuất dữ kiện và tổ chức lại thành bộ hồ sơ Day 18/19. | Thông tin về case, JTBD, pain point, patterns, contradictions, Parking Lot và bối cảnh thử nghiệm chung. | Tách dữ kiện khỏi diễn giải; không giữ nhãn “Validated” khi số lượt thử nghiệm chưa đủ để chứng minh validation. |
| 2026-10-05 | Codex | Hỗ trợ thiết kế và lập trình ba micro-prototype HTML/CSS/JavaScript bằng dữ liệu mô phỏng. | Shared fixture, ba luồng A/B/C, nhãn nguồn/độ chắc chắn, thao tác sửa–khôi phục–xác nhận và reset path. | Không dùng model hoặc API thật; yêu cầu nhóm tự kiểm thử và chỉ ghi nhận observation có thật. |
| 2026-10-05 | Gemini | Đóng gói ba prototype thành các file HTML chạy offline; rà soát luồng tương tác và hỗ trợ cấu trúc hóa defect log. | `option-a.html`, `option-b.html`, `option-c.html`; các sửa lỗi về undo history, khôi phục textarea, quick-check và highlight trùng thẻ. | Thành viên nhóm trực tiếp chạy thử trên trình duyệt và xác nhận từng sửa đổi trước khi giữ lại. |
| 2026-10-06 | Codex | Rà soát và hoàn thiện AI Support Log dựa trên các artifact hiện có; kiểm tra placeholder và tính nhất quán bằng chứng. | Cấu trúc log hoàn chỉnh, mô tả giới hạn của AI, các quyết định Human–AI và checklist evidence/riêng tư. | Chỉ dùng thông tin truy vết được trong repository; không bổ sung tên tester, trích dẫn, số liệu hoặc observation chưa có biên bản gốc. |
| 2026-10-06 | Codex | Chuẩn hóa biên bản phiên cá nhân sau khi học viên cung cấp và xác nhận dữ liệu test. | Bổ sung ngày 05/10/2026, thời lượng 10 phút, mã P-02599, hành vi mở cột nguồn, phản hồi diễn giải và lựa chọn Hybrid B + C. | Không chuyển phần diễn giải thành quote; ghi rõ không có bản ghi âm hoặc câu chữ nguyên văn. |

## 2. AI đã giúp gì

- Hệ thống hóa các artifact theo cùng một logic: vấn đề → ba phương án → giả thuyết thử nghiệm → phản hồi → quyết định hội tụ.
- Tạo nhanh ba prototype khác nhau về mức độ tự động hóa, giúp nhóm so sánh Option A (kiểm soát thủ công), Option B (đồng sáng tạo) và Option C (Active Recall).
- Hỗ trợ rà soát tính nhất quán giữa prototype và tài liệu, nhất là liên kết nguồn, trạng thái “Cần kiểm tra”, quyền sửa/khôi phục và bước xác nhận trước khi lưu.
- Phát hiện các chỗ có nguy cơ trình bày suy luận như dữ kiện, từ đó thêm giới hạn phạm vi dữ liệu và yêu cầu học viên xác nhận evidence còn thiếu.
- Hỗ trợ diễn đạt quyết định Hybrid B + C ngắn gọn: Option B là giao diện làm việc chính, Option C là module củng cố, còn Option A cung cấp cơ chế truy xuất nguồn.

## 3. AI sai hoặc hời hợt ở đâu

- **Vấn đề:** AI ban đầu có xu hướng coi kết luận “Validated” trong tài liệu nguồn là bằng chứng đã đủ mạnh.
  - **Vì sao không phù hợp:** Ba lượt practice/peer-test chỉ cho thấy tín hiệu ban đầu, chưa đủ để khẳng định nhu cầu đã được validation rộng rãi.
  - **Tôi đã sửa:** Đổi cách diễn đạt thành “xu hướng được ghi nhận”, nêu rõ giới hạn mẫu và giữ các câu hỏi cần kiểm chứng ở vòng tiếp theo.
- **Vấn đề:** AI có thể biến phần tổng hợp nhóm thành observation cá nhân hoặc điền chi tiết còn thiếu theo suy đoán.
  - **Vì sao không phù hợp:** Repository chưa có biên bản quan sát nguyên bản cho phiên của Lê Thanh Tình; tự thêm tên tester, thời lượng, hành vi hoặc quote sẽ làm sai nguồn evidence.
  - **Tôi đã sửa:** Thêm tuyên bố phạm vi dữ liệu, chỉ bổ sung observation sau khi học viên xác nhận và giữ phản hồi ở dạng diễn giải thay vì tạo quote.
- **Vấn đề:** Bản prototype đầu có một số lỗi trạng thái và tương tác như undo/restore chưa nhất quán, quick-check chưa phản hồi đầy đủ và highlight có thể trùng thẻ.
  - **Vì sao không phù hợp:** Các lỗi này làm người học khó khôi phục thao tác và có thể hiểu sai trạng thái nội dung.
  - **Tôi đã sửa:** Yêu cầu rà soát trên trình duyệt, sửa mã và chỉ giữ các thay đổi sau khi nhóm kiểm tra lại luồng nghiệp vụ.

## 4. Human–AI decisions

- Tôi và nhóm chọn bài toán **AI Notes: Personal Learning Notes** dựa trên bằng chứng Day 17 về ghi chú rời rạc, mất ngữ cảnh và nhu cầu ôn tập chủ động; AI không tự chọn bài toán.
- Tôi chấp nhận đề xuất dùng giao diện hai cột của Option B vì người học có thể đối chiếu bản nháp AI với dấu vết gốc và chỉnh sửa trước khi lưu.
- Tôi chấp nhận tích hợp Active Recall của Option C sau bước xác nhận ghi chú vì quiz ngắn tạo hành động ôn tập rõ hơn việc đọc lại một tài liệu dài.
- Tôi không chọn Option A làm luồng chính vì lượng thao tác tổ chức thủ công còn cao; chỉ giữ timestamp, trích dẫn nguồn và “Jump to context”.
- Tôi từ chối để AI tự lưu ghi chú, tự kích hoạt quiz hoặc đưa ra nội dung không có nguồn. Người học phải có quyền sửa, khôi phục, bỏ qua, làm sau và báo câu hỏi sai.
- Tôi chịu trách nhiệm cuối cùng về độ chính xác, quyền riêng tư, khả năng truy cập prototype và các kết luận trong bài nộp.

## 5. Nguyên tắc evidence và riêng tư

- [x] Không đưa dữ liệu cá nhân nhạy cảm của tester vào prompt.
- [x] Không dùng AI để tạo quote, observation hoặc kết quả test giả.
- [x] Phân biệt nội dung có biên bản gốc với phần tổng hợp hoặc diễn giải.
- [x] Không dùng phản hồi của AI thay cho evidence từ người dùng.
- [x] Gắn giới hạn dữ liệu cho phiên cá nhân khi thiếu observation nguyên bản.
- [x] Rà soát nội dung AI trước khi đưa vào bài nộp.

## 6. Reflection cá nhân

AI giúp tôi chuyển nhanh từ dữ liệu rời rạc sang ba phương án có thể tương tác và so sánh, nhưng tốc độ tạo nội dung không đồng nghĩa với độ tin cậy. Giới hạn lớn nhất tôi nhận ra là AI dễ làm cho một suy luận nghe giống dữ kiện, đặc biệt khi biên bản quan sát còn thiếu. Vì vậy, tôi giữ nguồn cạnh nội dung AI, yêu cầu người học xác nhận trước khi lưu và không dùng chi tiết không truy vết được. Ở vòng tiếp theo, tôi sẽ chuẩn hóa biểu mẫu ghi chép ngay từ đầu và dùng AI sau bước thu thập evidence để hỗ trợ phân loại, thay vì để AI lấp khoảng trống dữ liệu.

> **Minh bạch sử dụng AI:** Đoạn reflection trên được AI hỗ trợ biên tập từ các quyết định và giới hạn đã ghi trong hồ sơ; học viên chịu trách nhiệm rà soát nội dung trước khi nộp.
