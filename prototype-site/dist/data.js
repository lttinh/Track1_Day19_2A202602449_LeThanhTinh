// Data module for VLearn - AI Notes: Personal Learning Notes
// Course: Ngày 3 - Day 18+19 Design the Experiment - Human-Centered AI Design
// Group: 3 in 1 (Chu Thủy Dương, Lê Thanh Tình, Phạm Hương Giang)

const NotesLabData = {
  course: {
    id: 'day-18-19',
    title: 'Ngày 3 · Day 18+19 Design the Experiment - Human-Centered AI Design',
    progress: '0/38 hoạt động',
    currentLesson: 'Slide: Design the experiment',
    currentSlideIndex: 3,
    totalSlides: 23,
    userGreeting: 'Chiều nay DƯƠNG có vướng chỗ nào không?'
  },

  slides: [
    {
      page: 1,
      title: 'Design the Experiment',
      subtitle: 'Human-Centered AI Design · Track 1',
      tag: 'Slide 1 / 23',
      content: {
        type: 'title',
        heading: 'Design the Experiment',
        sub: 'Thiết kế thử nghiệm đa phương án & Đánh giá phản hồi người dùng thực tế'
      }
    },
    {
      page: 2,
      title: 'Giới thiệu & Mục tiêu buổi học',
      subtitle: 'Phó Anh Nguyên & AI Team',
      tag: 'Slide 2 / 23',
      content: {
        type: 'intro',
        heading: 'Mục tiêu ngày 18 & 19',
        bullets: [
          'Hiểu nguyên lý Parallel Prototyping trong thiết kế trải nghiệm AI.',
          'Xây dựng 3 phương án prototype với mức độ can thiệp AI khác nhau.',
          'Kiểm thử giả thuyết với người dùng thật và tổng hợp ma trận quyết định.'
        ]
      }
    },
    {
      page: 3,
      title: 'Day 18 Agenda',
      subtitle: 'AI IN ACTION · DAY 18 · TRACK 1',
      tag: 'Slide 3 / 23',
      content: {
        type: 'agenda',
        heading: 'Day 18 Agenda',
        cards: [
          {
            num: '01',
            title: 'Design the Experiment',
            desc: 'Tạo các lựa chọn đủ khác và xác định điều muốn học.',
            badge: 'OPTIONS + INTENT'
          },
          {
            num: '02',
            title: 'Human-Centered AI Design',
            desc: 'Thiết kế kỳ vọng, vai trò, quyền kiểm soát và recovery.',
            badge: 'CHOICES + GUARDRAIL'
          },
          {
            num: '03',
            title: 'Learn from Users',
            desc: 'Quan sát hành vi, so sánh trade-off và chọn bước tiếp theo.',
            badge: 'BEHAVIOR + NEXT'
          }
        ]
      }
    },
    {
      page: 4,
      title: 'Parallel Prototyping',
      subtitle: 'Tại sao cần ít nhất 3 phương án?',
      tag: 'Slide 4 / 23',
      content: {
        type: 'concept',
        heading: 'Parallel Prototyping',
        bullets: [
          'Tránh hiệu ứng "bám chấp ý tưởng đầu tiên" (Einstellung effect).',
          'Tạo các trục phân kỳ rõ nét: Mức độ tự động hóa AI (Low - Balanced - High).',
          'Cho phép người dùng so sánh trade-off trực tiếp thay vì đánh giá đơn lẻ.'
        ]
      }
    },
    {
      page: 5,
      title: 'Thiết kế khi AI sai',
      subtitle: 'Recovery & Transparency',
      tag: 'Slide 5 / 23',
      content: {
        type: 'concept',
        heading: 'Thiết kế khi AI sai (Design for Failure)',
        bullets: [
          'Không che giấu sự không chắc chắn của mô hình (Confidence / Uncertainty flags).',
          'Cung cấp cơ chế khôi phục nguyên văn (Undo / Restore verbatim) một chạm.',
          'Đối chiếu nguồn gốc minh bạch để loại bỏ nỗi sợ Hallucination.'
        ]
      }
    },
    {
      page: 6,
      title: 'Active Recall & Spaced Repetition',
      subtitle: 'Biến dấu vết thành phản xạ học tập',
      tag: 'Slide 6 / 23',
      content: {
        type: 'concept',
        heading: 'Active Recall trong học tập trực tuyến',
        bullets: [
          'Đọc lại ghi chú thụ động chỉ mang lại ảo tưởng thành thạo.',
          'Kiểm tra phản xạ nhanh 3 phút (Active Recall) tăng tỷ lệ ghi nhớ lên gấp 3 lần.',
          'Ưu tiên tạo câu hỏi từ chính những điểm người học bấm "Chưa hiểu".'
        ]
      }
    }
  ],

  // Traces linked to VLearn slides and video timestamps
  traces: [
    {
      id: 1,
      time: '03:12',
      slide: 3,
      text: 'Parallel Prototyping: Tạo ít nhất 3 phương án đủ khác biệt về mức độ can thiệp AI trước khi hội tụ.',
      unclear: false,
      tag: 'Phương pháp luận'
    },
    {
      id: 2,
      time: '05:04',
      slide: 3,
      text: 'Human-Centered AI: Thiết kế kỳ vọng đúng, vai trò hỗ trợ và quyền kiểm soát tối cao cho người học (Human Agency).',
      unclear: false,
      tag: 'AI UX'
    },
    {
      id: 3,
      time: '05:40',
      slide: 3,
      text: 'Khi nào AI nên tự động thực hiện và khi nào chỉ nên gợi ý? Ranh giới giữa tự động hóa và tước quyền người dùng.',
      unclear: true,
      tag: 'Điểm nghẽn'
    },
    {
      id: 4,
      time: '08:40',
      slide: 4,
      text: 'Thiết kế khi AI sai: Cung cấp đường lui (recovery mechanism) và giải thích minh bạch nguồn gốc bài giảng.',
      unclear: false,
      tag: 'Guardrails'
    },
    {
      id: 5,
      time: '09:16',
      slide: 4,
      text: 'Không che giấu giới hạn của AI: Luôn để người dùng có quyền khôi phục nguyên văn bản ghi gốc.',
      unclear: false,
      tag: 'Guardrails'
    },
    {
      id: 6,
      time: '10:03',
      slide: 5,
      text: 'Làm sao đo lường trade-off giữa tự động hóa cao và sự mệt mỏi nhận thức (cognitive load) của học viên?',
      unclear: true,
      tag: 'Nghiên cứu'
    },
    {
      id: 7,
      time: '11:22',
      slide: 6,
      text: 'Active Recall: Tự kiểm tra phản xạ kiến thức ngay sau bài học giúp nhớ sâu gấp 3 lần việc đọc lại bản tóm tắt thụ động.',
      unclear: false,
      tag: 'Tối ưu học tập'
    },
    {
      id: 8,
      time: '12:08',
      slide: 6,
      text: 'Dual-Pane Canvas: Đặt nguồn gốc bài học song song cạnh bản nháp AI giúp triệt tiêu hoàn toàn nỗi sợ AI bịa đặt.',
      unclear: false,
      tag: 'Kiến trúc UI'
    },
    {
      id: 9,
      time: '12:41',
      slide: 6,
      text: 'Spaced Repetition: Nhắc nhở làm bài tập ngắt quãng sau 24h dựa đúng trên các điểm người học từng bấm Chưa hiểu.',
      unclear: false,
      tag: 'Active Recall'
    }
  ],

  // Draft templates for Option B (Co-pilot Dual-Pane Canvas)
  initialDraftB: {
    main: 'Parallel Prototyping yêu cầu tạo 3 phương án đủ khác biệt về mức độ can thiệp của AI (Low / Balanced / High). Cần thiết kế Human-in-the-loop để người học luôn giữ quyền kiểm soát tối cao và dễ dàng khôi phục nguyên văn khi AI hiểu sai ý.',
    uncertain: 'AI nên tự động gom nhóm toàn bộ ghi chú và tự quyết định cấu trúc thư mục mà không cần người dùng xác nhận lại.',
    question: 'Làm sao cân bằng giữa tính tự động của AI và việc kích hoạt phản xạ Active Recall mà không gây ngợp thông tin cho học viên sau buổi học?'
  },

  originalDraftB: {
    main: 'Parallel Prototyping: Tạo ít nhất 3 phương án đủ khác biệt trước khi chọn. Thiết kế kỳ vọng đúng và trao quyền kiểm soát cho người dùng.',
    uncertain: 'Khi nào AI nên tự động thực hiện và khi nào chỉ nên gợi ý? Ranh giới tự động hóa và tước quyền người dùng.',
    question: 'Làm sao đo lường trade-off giữa tự động hóa cao và sự mệt mỏi nhận thức của học viên sau bài học dài?'
  },

  // Interactive Blocks for Option C (Autonomous Active Recall & Smart Quiz Engine)
  initialBlocksC: [
    {
      id: 'c1',
      type: 'note',
      slide: 3,
      time: '03:12',
      text: 'Parallel Prototyping: Nguyên lý cốt lõi là tạo các phương án đủ khác nhau về triết lý AI can thiệp (Low, Balanced, High) để quan sát trade-off hành vi của người học.',
      isAi: false,
      isUncertain: false
    },
    {
      id: 'c2',
      type: 'note',
      slide: 4,
      time: '08:40',
      text: 'Recovery & Transparency: Mọi đề xuất của AI Notes phải có trích dẫn nguồn (Slide / Timestamp) và nút khôi phục nguyên văn một chạm.',
      isAi: true,
      isUncertain: false
    },
    {
      id: 'c3',
      type: 'quiz-binary',
      slide: 3,
      time: '05:40',
      text: 'Trong thiết kế Human-Centered AI, AI nên tự động quyết định cấu trúc và lưu ghi chú của người học mà không cần bước xác nhận?',
      isAi: true,
      isUncertain: true,
      correctChoice: 'false',
      explanationCorrect: 'Chính xác! Người học luôn cần giữ quyền kiểm soát tối cao (Human Agency); AI chỉ đóng vai trò đồng sáng tạo và gợi ý bản nháp có cấu trúc.',
      explanationWrong: 'Chưa chính xác. Nếu AI tự ý lưu mà không qua bước duyệt, người học sẽ mất niềm tin và sợ AI bịa đặt hoặc làm mất ý định ban đầu.'
    },
    {
      id: 'c4',
      type: 'quiz-open',
      slide: 6,
      time: '11:22',
      text: 'Tại sao việc làm bài trắc nghiệm nhanh 3 phút (Active Recall) lại hiệu quả hơn việc đọc lại một bản ghi chú tóm tắt hoàn chỉnh?',
      isAi: true,
      isUncertain: false,
      answer: 'Active Recall buộc não bộ phải chủ động truy xuất thông tin từ trí nhớ, giúp củng cố liên kết nơ-ron thần kinh và kiểm chứng ngay những điểm chưa hiểu thực tế, thay vì tạo cảm giác "ảo tưởng thành thạo" khi đọc lướt văn bản có sẵn.'
    }
  ],

  // Facilitator Guidelines (Testing Scripts & Field Observation Notes)
  facilitator: {
    a: {
      title: 'Option A · Chu Thủy Dương · 2A202602660',
      name: 'Chu Thủy Dương',
      participant: 'P01 — Nam (Học viên Data Analyst)',
      mechanism: 'User-Driven Pinning & Tagging (Low AI / High Agency)',
      expect: 'Người dùng kéo thả thẻ vào 3 cột (Ý chính / Chưa hiểu / Xem lại); bấm nút AI chỉ khi cần kiểm tra trùng lặp.',
      watch: 'Quan sát sự ngập ngừng sau bài học; user có thấy nản khi phải tự phân loại thủ công không; có nhận ra tính năng Jump to Slide không.',
      dont: 'Không chỉ bảo người học phải xếp thẻ vào cột nào. Hãy để user tự thao tác và quan sát thời gian hoàn thành.'
    },
    b: {
      title: 'Option B · Lê Thanh Tình · 2A202602449',
      name: 'Lê Thanh Tình',
      participant: 'P02 — Minh (Học viên Fullstack Web)',
      mechanism: 'Dual-Pane Interactive Canvas & Co-pilot (Balanced AI)',
      expect: 'User chọn các dấu vết cần gửi, AI dựng bản nháp 2 cột song song; phát hiện nhãn Cần kiểm tra (Uncertainty flag) và sửa trực tiếp.',
      watch: 'User có phát hiện nhãn màu vàng "Cần kiểm tra" không; có dùng nút "Khôi phục nguyên văn" không; đánh giá cảm giác minh bạch nguồn.',
      dont: 'Không chỉ vị trí cảnh báo hoặc nhắc user phải sửa câu nào trước.'
    },
    c: {
      title: 'Option C · Phạm Hương Giang · 2A202602359',
      name: 'Phạm Hương Giang',
      participant: 'P03 — Lan (Sinh viên khối Kinh tế)',
      mechanism: 'Autonomous Active Recall & Smart Quiz Engine (High AI)',
      expect: 'Nhận đề xuất sau bài học, tương tác làm quiz Đúng/Sai và câu hỏi phản xạ nhanh; đánh giá tính chính xác của đáp án.',
      watch: 'User có hào hứng làm bài test ngắn không; phản ứng thế nào khi câu hỏi đánh đúng vào điểm bấm "Chưa hiểu"; có sợ AI sai không.',
      dont: 'Không giải thích trước đáp án câu hỏi trắc nghiệm.'
    },
    hybrid: {
      title: 'Hybrid (B + C) · Quyết định hội tụ nhóm 3 in 1',
      name: 'Nhóm 3 in 1',
      participant: 'Hội tụ từ P01, P02, P03',
      mechanism: 'Dual-Pane Workspace (B) + Active Recall Quiz Module (C)',
      expect: 'Trải nghiệm không gian ghi chép 2 cột minh bạch của Option B, đồng thời làm bài củng cố kiến thức nhanh 3 phút của Option C ở cuối bài.',
      watch: 'Độ mượt mà khi chuyển từ biên tập ghi chép sang làm bài tập phản xạ; mức độ hài lòng tổng thể so với các phương án đơn lẻ.',
      dont: 'Tôn trọng nhịp học tập tự nhiên của người dùng.'
    }
  }
};

if (typeof window !== 'undefined') {
  window.NotesLabData = NotesLabData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotesLabData;
}
