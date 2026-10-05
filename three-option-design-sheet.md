# Three-option Design Sheet

> Điền sheet này bằng evidence và quyết định thật của nhóm. A/B/C phải giải quyết cùng một problem và task, nhưng khác mechanism hoặc cách chia việc user–AI.

## 1. Shared frame

| Thành phần chung | Nội dung |
|---|---|
| Target user | Học viên học nội dung trực tuyến mới hoặc phức tạp, gần đây đã ghi chú, highlight hoặc lưu nội dung. |
| Situation | Sau một bài học, học viên cần chuẩn bị để ôn tập, làm bài hoặc áp dụng kiến thức. |
| Task | Trong 5 phút, biến các dấu vết rời rạc của một bài học thành một study pack có thể kiểm tra và dùng lại. |
| Starting content/data | Cùng một fixture giả lập từ Bài 14: đoạn nội dung nguồn, 4 highlights, 2 điểm “Chưa hiểu”, 1 câu hỏi và 2 ghi chú nháp; có nội dung về “benchmark” và “test set”. |
| Desired outcome | Một study pack được tổ chức, truy được về nguồn, phân biệt phần AI tạo và được user quyết định trước khi lưu. |
| Evidence từ Day 17 | Ba note cùng gợi ý friction khi quay lại ghi chú; hai note có workaround Google/ChatGPT; hai note ghi nhận công sức chuyển tab/cửa sổ hoặc dừng nội dung; một note có sự kiện mất 20 phút tìm note và nộp trễ. Xem [README17](./README17.md), [Giang_notes](./Giang_notes.md), [Dương_notes](./Dương_notes.md). Đây là evidence practice, chưa phải validation. |
| Điều chưa biết | User cần note tĩnh hay active recall; pain chính nằm ở capture/tổng hợp/retrieval; search/ChatGPT hiện tại có đủ tốt không; cần mức tự động hóa và quyền kiểm soát nào. |

### Comparison Contract

| Giữ cố định (khoảng 70%) | Nội dung thống nhất |
|---|---|
| User và situation | Học viên vừa kết thúc bài học trực tuyến mới/phức tạp và cần chuẩn bị để ôn tập/làm bài. |
| Outcome task | Trong 5 phút tạo một study pack có thể kiểm tra và dùng lại; user xác nhận trước khi lưu. |
| Dữ liệu/content mẫu | Một fixture Bài 14 duy nhất gồm nội dung nguồn, 4 highlights, 2 điểm “Chưa hiểu”, 1 câu hỏi và 2 note nháp. |
| Visual components | Cùng typography, màu, navigation, source chips, edit controls và màn hình kết quả. |
| Mức fidelity và số trạng thái | Mỗi option có 3 trạng thái quanh critical interaction, mức hoàn thiện tương đương. |

| Chủ động thay đổi để so sánh | A | B | C |
|---|---|---|---|
| Core mechanism | User kéo thả dấu vết vào mẫu; AI chỉ truy nguồn/gợi ý trùng theo yêu cầu. | User chọn mục tiêu và input; AI tạo nháp để hai bên đồng biên tập. | AI tự tạo study pack và quick-check khi kết thúc bài; user review. |
| Phân chia việc user–AI | User tạo cấu trúc và nội dung; AI hỗ trợ tra cứu, không tự áp dụng. | User định phạm vi và duyệt; AI nhóm/diễn đạt phần đã chọn. | AI khởi tạo/soạn nháp; user kiểm tra, sửa, bỏ hoặc xác nhận. |
| Trade-off dự kiến | Kiểm soát cao nhưng tốn công. | Cân bằng tốc độ và kiểm soát nhưng cần nhiều lượt duyệt. | Nhanh và ít thao tác nhưng tăng rủi ro sai/ngộ nhận, đòi hỏi review kỹ. |

### Critical interaction

- **Điểm bắt đầu:** User vừa kết thúc Bài 14 và nhìn thấy cùng bộ dấu vết học tập chưa được tổ chức.
- **Quyết định hoặc hành động then chốt:** User tạo, đồng tạo hoặc review cấu trúc study pack tùy option và xử lý ít nhất một nội dung chưa chắc.
- **Điểm kết thúc:** User có thể kiểm tra nguồn, chỉnh sửa và xác nhận hoặc từ chối study pack trước khi lưu.

### Phân công build

| Option | Người phụ trách chính |
|---|---|
| A — Tự xếp thẻ có nguồn | Chu Thùy Dương — 2A202602660 |
| B — Đồng biên tập bản note | Lê Thanh Tình — 2A202602449 |
| C — Study Pack chủ động | Phạm Hương Giang — 2A202602359 |

## 2. Option A — Tự xếp thẻ có nguồn

- **Core mechanism:** User-led/no-inference: kéo thả dấu vết vào mẫu `Ý chính / Chưa hiểu / Cần xem lại`; AI chỉ hỗ trợ tra nguồn và phát hiện trùng theo yêu cầu.
- **User flow:** Chọn và xếp thẻ → gọi hỗ trợ nguồn nếu cần → kiểm tra và lưu.
- **Expectation:** AI không tóm tắt, viết thay hoặc tự di chuyển thẻ; gợi ý không được áp dụng nếu user chưa chọn.
- **Agency:** User đặt tên nhóm, di chuyển, sửa, xóa, bỏ qua gợi ý và quyết định toàn bộ bản cuối.
- **Evidence/uncertainty:** Mỗi thẻ giữ timestamp/source; gợi ý trùng ghi rõ “có thể trùng” và cho xem hai nguồn.
- **Recovery:** Undo mọi thao tác; khôi phục thẻ gốc; tắt AI và hoàn thành hoàn toàn thủ công.
- **Vai trò người dùng:** Tạo cấu trúc, phân loại và quyết định nội dung.
- **Vai trò AI:** Truy xuất đoạn nguồn và nêu khả năng trùng khi user yêu cầu.
- **Điểm cần quan sát khi test:** User có hiểu cách tổ chức và chấp nhận công sức để đổi lấy kiểm soát không?
- **Prototype:** [Mở file option-a.html](./prototype-site/dist/option-a.html)

## 3. Option B — Đồng biên tập bản note

- **Core mechanism:** Co-create: user chọn mục tiêu ôn tập và các dấu vết; AI nhóm và tạo nháp để user duyệt theo từng phần.
- **User flow:** Chọn mục tiêu/input → xem và chỉnh nháp AI → xác nhận bản cuối.
- **Expectation:** AI chỉ dùng các dấu vết đã chọn, có thể nhóm hoặc diễn đạt sai và không tự lưu.
- **Agency:** User loại input, sửa trực tiếp, di chuyển mục, yêu cầu tạo lại một phần hoặc quay về tự xếp.
- **Evidence/uncertainty:** Mỗi câu AI tạo có source chips; nội dung suy luận hoặc thiếu nguồn được gắn nhãn “Cần kiểm tra”.
- **Recovery:** Undo theo phiên bản; khôi phục nguyên văn; tạo lại riêng một mục; chuyển sang mẫu thủ công.
- **Vai trò người dùng:** Chọn phạm vi, chỉnh nội dung và phê duyệt.
- **Vai trò AI:** Nhóm và diễn đạt lại các dấu vết đã chọn thành bản nháp.
- **Điểm cần quan sát khi test:** User có phát hiện/sửa phần chưa chắc hay mặc định tin nháp AI?
- **Prototype:** [Mở file option-b.html](./prototype-site/dist/option-b.html)

## 4. Option C — Study Pack chủ động

- **Core mechanism:** AI-initiated: khi bài học kết thúc, AI tự đề xuất study pack gồm note có cấu trúc và quick-check từ toàn bộ dấu vết.
- **User flow:** Nhận đề xuất tự động → review nguồn/nội dung/quick-check → sửa, bỏ hoặc xác nhận.
- **Expectation:** AI có thể chọn thiếu, tóm tắt sai hoặc tạo câu hỏi chưa phù hợp; bản nháp không tự lưu và không thay dữ liệu gốc.
- **Agency:** User tắt tạo tự động, loại từng mục, chuyển nội dung giữa note/quick-check, sửa hoặc từ chối toàn bộ.
- **Evidence/uncertainty:** Mỗi mục có nguồn và nhãn `Từ ghi chú / AI diễn đạt / Cần kiểm tra`; câu hỏi không đủ căn cứ bị cảnh báo.
- **Recovery:** Giữ nguyên dấu vết gốc; discard bản AI; undo; tạo lại với phạm vi hẹp hơn hoặc chuyển sang Option A.
- **Vai trò người dùng:** Review, sửa và quyết định có lưu hay không.
- **Vai trò AI:** Chủ động nhóm, tóm tắt và tạo quick-check sau bài học.
- **Điểm cần quan sát khi test:** Lợi ích tốc độ có bù được công sức/rủi ro review và user có nhận ra phần AI tạo không?
- **Prototype:** [Mở file option-c.html](./prototype-site/dist/option-c.html)

## 5. Kiểm tra khả năng so sánh

| Tiêu chí | A | B | C |
|---|---|---|---|
| Cùng user/situation/task | Có | Có | Có |
| Cùng content đầu vào | Có | Có | Có |
| Mức độ hoàn thiện tương đương | 3 trạng thái | 3 trạng thái | 3 trạng thái |
| Khác mechanism thực chất | User tự tạo; AI chỉ trợ giúp theo yêu cầu | User–AI đồng tạo | AI chủ động tạo; user review |
| User hiểu AI sẽ làm gì | Microcopy: chỉ tra nguồn/gợi ý trùng, không tự áp dụng | Preview input và notice AI tạo draft, có thể sai | Banner AI tự tạo draft, cần review, không thay note gốc |
| User có quyền sửa/dừng | Sửa/xóa thẻ, bỏ gợi ý, tắt AI | Stop, sửa, reject từng mục hoặc toàn bộ | Stop/dismiss, sửa, loại mục, từ chối toàn bộ |
| Có recovery path | Undo, khôi phục thẻ gốc, làm thủ công | Undo version, khôi phục nguyên văn, chuyển A | Giữ source, discard draft, thu hẹp input, chuyển A/B |

### Distance check

- **A khác B vì:** A để user tự tạo cấu trúc và AI không tạo nội dung; B để AI tạo nháp từ phạm vi do user chọn rồi hai bên đồng biên tập.
- **B khác C vì:** B chỉ chạy khi user chọn mục tiêu/input và yêu cầu; C tự khởi tạo study pack sau bài học rồi mời user review.
- **A khác C vì:** A đặt toàn bộ việc tạo và quyết định ban đầu ở user; C đặt việc khởi tạo và soạn nháp ở AI nhưng giữ phê duyệt cuối ở user.

### Gate 2 — Meaningful options

- [x] Cùng target user, situation, task, desired outcome và fixture.
- [x] Khác mechanism, trigger và Human–AI division.
- [x] Distance check không dựa vào màu, layout hoặc wording.
- [x] Mỗi option có trade-off hợp lý; không có option bị cố tình làm kém.

## 6. Chặng 3 — Human–AI Design Pass

Phạm vi review chỉ là critical interaction: biến fixture Bài 14 thành study pack và quyết định có lưu bản cuối hay không. Nhóm không thiết kế toàn bộ product.

### 6.1. Bốn quyết định thiết kế

#### Expectation

- **Option A:** Trước khi dùng nút hỗ trợ, UI ghi “AI chỉ tìm đoạn nguồn và gợi ý dấu vết có thể trùng; AI không viết hoặc tự di chuyển thẻ”. Limit: gợi ý trùng có thể sai và nguồn chỉ nằm trong fixture Bài 14.
- **Option B:** Trước nút `Tạo bản nháp`, UI preview chính xác các dấu vết sẽ được gửi và ghi “AI sẽ nhóm, diễn đạt lại; có thể bỏ sót hoặc diễn đạt sai; chưa tự lưu”.
- **Option C:** Banner cuối bài báo “AI sẽ tạo một study pack nháp từ toàn bộ 9 dấu vết, gồm note và quick-check”. Limit: kết quả có thể chọn thiếu, tóm tắt sai hoặc tạo câu hỏi chưa phù hợp; dữ liệu gốc không bị thay thế.

#### Role and Agency

- **Option A:** User tạo cấu trúc, phân loại và quyết định nội dung. AI **Don't Act** mặc định; chỉ **Ask/Act** sau yêu cầu tra nguồn hoặc kiểm tra trùng. Nếu AI sai, thiệt hại thấp vì chưa có thay đổi tự động và user nhìn thấy thẻ gốc.
- **Option B:** User chọn mục tiêu/input và bấm tạo; AI **Ask** bằng preview phạm vi rồi **Act** để tạo nháp. Nếu AI sai, user có thể mất thời gian sửa hoặc hiểu sai nội dung; sai được hỗ trợ phát hiện qua source chips, nhãn `AI diễn đạt` và `Cần kiểm tra`.
- **Option C:** AI **Act** để chuẩn bị bản nháp sau trigger kết thúc bài, nhưng phải **Ask** trước khi lưu hoặc dùng làm quick-check. Nếu AI sai, rủi ro cao hơn vì output có vẻ hoàn chỉnh; user có thể học sai hoặc bỏ sót điểm quan trọng, nên review nguồn là bắt buộc trước xác nhận.

#### Evidence and Uncertainty

- Mọi nội dung đều liên kết về dấu vết và đoạn nguồn trong Bài 14.
- Nội dung nguyên văn mang nhãn `Từ ghi chú`; nội dung AI viết lại mang nhãn `AI diễn đạt`.
- Nội dung thiếu nguồn, mâu thuẫn hoặc có mức tin cậy thấp mang nhãn `Cần kiểm tra`, không được trình bày như fact chắc chắn.
- User có thể mở source chip để so sánh output với nguyên văn mà không rời task.

#### Control and Recovery

- Cả ba option đều có preview, edit, reject/dismiss, undo và quyền xác nhận cuối trước khi lưu.
- Dấu vết gốc luôn được giữ nguyên; AI không ghi đè source data.
- A cho phép tắt hỗ trợ và tiếp tục thủ công; B cho phép khôi phục nguyên văn hoặc chuyển sang mẫu A; C cho phép discard toàn bộ draft, thu hẹp input hoặc chuyển sang A/B.
- `Dừng tạo` có trên B/C; thao tác dừng không xóa lựa chọn hoặc dấu vết đã có.

### 6.2. Human–AI Decision Table

| Human–AI decision | Option A — Tự xếp thẻ có nguồn | Option B — Đồng biên tập bản note | Option C — Study Pack chủ động |
|---|---|---|---|
| **User làm gì? AI làm gì?** | User kéo thẻ, đặt nhóm, sửa và lưu. AI chỉ mở đoạn nguồn/gợi ý trùng khi được gọi. | User chọn mục tiêu và dấu vết, yêu cầu tạo, sửa và duyệt. AI nhóm/diễn đạt phần đã chọn thành draft. | User review, sửa, loại hoặc xác nhận. AI tự chuẩn bị note và quick-check từ toàn bộ dấu vết sau bài học. |
| **AI Act / Ask / Don't Act? Vì sao?** | **Don't Act** mặc định; **Ask/Act** theo yêu cầu. Vì user-led cần tránh suy luận hoặc thay đổi ngoài ý muốn. | **Ask** trước bằng preview input; **Act** sau khi user bấm tạo. Vì AI tạo nội dung nhưng phạm vi phải do user quyết định. | **Act** để tạo draft sau trigger; **Ask** trước khi lưu/dùng. Vì lợi ích là giảm thao tác, nhưng hậu quả khi tin nhầm cao hơn. |
| **User hiểu capability/limit bằng gì?** | Microcopy cạnh nút AI và trạng thái “Không tự áp dụng”; nói rõ AI không viết/tự xếp thẻ. | Preview input và notice trước nút tạo; nhắc AI có thể nhóm/diễn đạt sai và không tự lưu. | Banner trigger, danh sách dữ liệu sẽ dùng và nhãn “Bản nháp AI — cần review”; nói rõ note gốc không bị thay. |
| **Evidence/uncertainty được thể hiện thế nào?** | Source/timestamp trên từng thẻ; gợi ý trùng là “có thể trùng” và hiện hai nguồn cạnh nhau. | Source chips theo từng ý; nhãn `AI diễn đạt`; phần thiếu/mâu thuẫn mang `Cần kiểm tra`. | Source chips và nhãn loại nội dung trên cả note/quiz; item yếu nguồn bị cảnh báo và không được chọn sẵn để lưu. |
| **User kiểm soát và recovery thế nào?** | Bỏ qua gợi ý, edit, undo, khôi phục thẻ gốc, tắt AI và tiếp tục thủ công. | Stop, edit, reject từng mục, undo theo phiên bản, khôi phục nguyên văn, tạo lại một phần hoặc chuyển sang A. | Stop/dismiss, reject từng mục hoặc toàn bộ, sửa, undo, thu hẹp input, tạo lại hoặc chuyển sang A/B; chỉ lưu khi user xác nhận. |
| **Nếu AI sai, user mất gì và sai có dễ phát hiện không?** | Chủ yếu mất ít thời gian xem gợi ý; khá dễ phát hiện vì AI không đổi nội dung và hai nguồn được đặt cạnh nhau. | Có thể mất thời gian sửa hoặc mang ý sai vào note; phát hiện ở mức vừa nhờ đối chiếu source và nhãn uncertainty. | Có thể học sai/bỏ sót nội dung và tin vào output hoàn chỉnh; khó phát hiện hơn, nên bắt buộc review item có nguồn trước khi lưu. |
| **Ai quyết định cuối?** | User. | User. | User. |

### 6.3. Feedback and data check

| Quyết định | Áp dụng chung cho prototype A/B/C |
|---|---|
| Dữ liệu được dùng | Chỉ fixture giả lập Bài 14 trong phiên test; không dùng dữ liệu học tập thật hoặc thông tin nhạy cảm của tester. |
| Phạm vi xử lý | AI chỉ được dùng các dấu vết hiển thị trong phiên; không tự truy cập file, Drive, lịch sử chat hoặc bài học khác. |
| Feedback ảnh hưởng khi nào? | Edit/reject chỉ thay đổi draft hiện tại. Prototype không học và không ghi nhớ feedback cho lần sau. |
| Rút quyền/xóa dữ liệu | User có thể bỏ từng dấu vết khỏi input, bấm `Dừng tạo`, `Xóa bản nháp` hoặc thoát mà không lưu. |
| Lưu trữ | Chỉ bản được user xác nhận mới được mô phỏng là đã lưu; fixture và feedback không được gửi hoặc lưu thật trong micro-prototype. |

### 6.4. GATE 3 — Human control

- [x] Mỗi option nêu rõ phần việc của user và AI.
- [x] Mỗi option xác định AI Act, Ask hoặc Don't Act tại critical moment và lý do.
- [x] Capability và limit được báo trước khi AI hoạt động.
- [x] Output AI truy được về nguồn và thể hiện uncertainty.
- [x] Agency tăng theo mức hậu quả khi sai; Option C yêu cầu review rõ nhất.
- [x] Cả ba option có đường stop, edit, reject, undo/dismiss và manual fallback.
- [x] User quyết định cuối và dữ liệu gốc không bị AI ghi đè.
- [x] Phạm vi dữ liệu, feedback memory và cách rút quyền đã được nêu rõ.

