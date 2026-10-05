// Data module for AI Notes Lab
const NotesLabData = {
  traces: [
    { id: 1, time: '03:12', text: 'Benchmark là mốc tham chiếu để so sánh mô hình.' },
    { id: 2, time: '05:04', text: 'Giữ cùng điều kiện đánh giá khi so sánh kết quả.' },
    { id: 3, time: '05:40', text: 'Khi nào benchmark không còn phù hợp?', unclear: true },
    { id: 4, time: '08:40', text: 'Test set chỉ dùng ở bước đánh giá cuối.' },
    { id: 5, time: '09:16', text: 'Không dùng test set để tinh chỉnh mô hình.' },
    { id: 6, time: '10:03', text: 'Validation set khác test set ở quyết định nào?', unclear: true },
    { id: 7, time: '11:22', text: 'Nếu test nhiều lần thì có bị học test set không?' },
    { id: 8, time: '12:08', text: 'Báo cáo metric cùng giới hạn của dữ liệu.' },
    { id: 9, time: '12:41', text: 'Cần xem lại ví dụ chia train / validation / test.' }
  ],
  excerpts: [
    { time: '03:12', text: 'Benchmark là mốc tham chiếu chuẩn.' },
    { time: '05:40', text: 'Benchmark chỉ đại diện cho một miền dữ liệu cụ thể.' },
    { time: '08:40', text: 'Test set chỉ dùng ở bước đánh giá cuối.' }
  ],
  initialDraftB: {
    main: 'Benchmark giúp so sánh các mô hình trong cùng điều kiện chuẩn. Test set chỉ dùng ở bước đánh giá cuối cùng để kiểm tra độ khái quát hóa.',
    uncertain: 'Benchmark luôn phù hợp và có thể áp dụng cho mọi bài toán mà không cần điều chỉnh.',
    question: 'Validation set và test set khác nhau ở quyết định nào trong quy trình huấn luyện và đánh giá?'
  },
  originalDraftB: {
    main: 'Benchmark là mốc tham chiếu để so sánh mô hình. Test set chỉ dùng ở bước đánh giá cuối.',
    uncertain: 'Khi nào benchmark không còn phù hợp?',
    question: 'Validation set khác test set ở quyết định nào? Nếu test nhiều lần thì có bị học test set không?'
  },
  initialBlocksC: [
    {
      id: 'c1',
      type: 'note',
      time: '03:12',
      text: 'Benchmark là mốc tham chiếu chuẩn dùng để so sánh hiệu năng các mô hình trong cùng điều kiện thực nghiệm.',
      isAi: false,
      isUncertain: false
    },
    {
      id: 'c2',
      type: 'note',
      time: '08:40',
      text: 'Test set chỉ dùng ở bước đánh giá cuối; không dùng để tinh chỉnh mô hình.',
      isAi: true,
      isUncertain: false
    },
    {
      id: 'c3',
      type: 'quiz-binary',
      time: '05:40',
      text: 'Mọi benchmark chuẩn đều phù hợp cho tất cả bài toán thực tế mà không cần điều chỉnh.',
      isAi: false,
      isUncertain: true,
      explanationCorrect: 'Đúng. Benchmark chỉ phù hợp một miền dữ liệu.',
      explanationWrong: 'Sai. Benchmark chỉ đại diện cho một miền dữ liệu cụ thể.'
    },
    {
      id: 'c4',
      type: 'quiz-open',
      time: '10:03',
      text: 'Validation set khác test set ở quyết định nào?',
      isAi: false,
      isUncertain: false,
      answer: 'Validation set dùng chọn mô hình; test set chỉ dùng đánh giá cuối.'
    }
  ],
  facilitator: {
    a: {
      title: 'Option A · Chu Thùy Dương · 2A202602660',
      mechanism: 'User creates · AI on request',
      expect: 'Tự phân loại thẻ vào các cột; chỉ bấm nút AI khi cần kiểm tra trùng lặp.',
      watch: 'Mức độ công sức khi tự xếp tay; nhận ra AI không tự ý di chuyển thẻ.',
      dont: 'Không chỉ bảo người học nên xếp thẻ nào vào cột nào.'
    },
    b: {
      title: 'Option B · Lê Thanh Tình · 2A202602449',
      mechanism: 'User + AI Co-create (Dual-Pane)',
      expect: 'Chọn phạm vi dấu vết, AI dựng nháp; chú ý nhãn Cần kiểm tra và sửa chữ trước khi duyệt.',
      watch: 'Có phát hiện nhãn Cần kiểm tra hay mặc định tin nháp AI; có dùng nút Khôi phục nguyên văn không.',
      dont: 'Không chỉ vị trí cảnh báo hoặc bảo phải sửa câu nào.'
    },
    c: {
      title: 'Option C · Phạm Hương Giang · 2A202602359',
      mechanism: 'AI Initiates · User Reviews',
      expect: 'Nhận đề xuất sau bài học, tương tác câu hỏi Đúng/Sai, loại bỏ mục thừa trước khi lưu.',
      watch: 'Tốc độ tự động có làm lơ là kiểm tra nguồn; phản ứng với câu hỏi trắc nghiệm.',
      dont: 'Không gợi ý đáp án trước khi người học bấm chọn.'
    }
  }
};

if (typeof window !== 'undefined') {
  window.NotesLabData = NotesLabData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotesLabData;
}
