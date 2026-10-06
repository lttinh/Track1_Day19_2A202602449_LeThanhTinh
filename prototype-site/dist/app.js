// ==========================================================================
// VLEARN LMS & AI NOTES PROTOTYPE - APPLICATION ENGINE
// Simplified Topbar · Draggable Note Drawer · Hands-on Interactive Demo
// Group 3 in 1 (Chu Thủy Dương, Lê Thanh Tình, Phạm Hương Giang)
// ==========================================================================

(function () {
  'use strict';

  const Data = window.NotesLabData;
  if (!Data) {
    console.error('NotesLabData not found');
    return;
  }

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const state = {
    option: 'b', // 'a' | 'b' | 'c' | 'hybrid'
    theme: 'dark',
    currentSlide: 3,
    isSyllabusOpen: true,
    isNotebookDrawerOpen: false,
    rightPanelTab: 'aiNotes',
    isRightPanelExpanded: false,
    tracesColCollapsed: true,

    // Option A: Contextual Pinning
    buckets: {
      main: [],
      unclear: [],
      review: []
    },
    historyA: [],
    cardTextsA: {},
    highlightDupsA: false,
    savedA: false,

    // Option B: Dual-Pane Canvas
    selectedB: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    isGeneratingB: false,
    draftB: { ...Data.initialDraftB },
    previousDraftB: null,
    showHintB: false,
    savedB: false,

    // Option C: Active Recall Quiz
    filterC: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    showFilterDrawerC: false,
    removedBlockIdsC: new Set(),
    blockTextsC: {},
    quizAnswerC: null, // 'true' | 'false' | null
    openQuizAnswerVisibleC: false,
    savedC: false,

    // Guide Modal
    guideModalOpen: false
  };

  // Read URL params & body dataset
  const urlParams = new URLSearchParams(window.location.search);
  const paramOpt = urlParams.get('option');
  const bodyOpt = document.body.dataset.option;

  if (paramOpt && ['a', 'b', 'c', 'hybrid'].includes(paramOpt)) {
    state.option = paramOpt;
  } else if (bodyOpt && ['a', 'b', 'c', 'hybrid'].includes(bodyOpt)) {
    state.option = bodyOpt;
  }

  // --------------------------------------------------------------------------
  // DOM REFERENCES
  // --------------------------------------------------------------------------
  const btnToggleSidebarEl = document.querySelector('#btnToggleSidebar');
  const btnCloseSyllabusEl = document.querySelector('#btnCloseSyllabus');
  const syllabusSidebarEl = document.querySelector('#syllabusSidebar');

  const slideCanvasEl = document.querySelector('#slideCanvas');
  const slideContentWrapEl = document.querySelector('#slideContentWrap');
  const btnSlideAiTriggerEl = document.querySelector('#btnSlideAiTrigger');
  const currentSlideNumEl = document.querySelector('#currentSlideNum');
  const totalSlideNumEl = document.querySelector('#totalSlideNum');
  const btnPrevSlideEl = document.querySelector('#btnPrevSlide');
  const btnNextSlideEl = document.querySelector('#btnNextSlide');
  const thumbnailsTrackEl = document.querySelector('#thumbnailsTrack');
  const btnThumbPrevEl = document.querySelector('#btnThumbPrev');
  const btnThumbNextEl = document.querySelector('#btnThumbNext');

  // Slide Toolbar & Note Drawer
  const btnToggleNotebookEl = document.querySelector('#btnToggleNotebook');
  const vlearnNoteDrawerEl = document.querySelector('#vlearnNoteDrawer');
  const noteDrawerHeaderEl = document.querySelector('#noteDrawerHeader');
  const btnDrawerCloseEl = document.querySelector('#btnDrawerClose');
  const btnDrawerExpandEl = document.querySelector('#btnDrawerExpand');
  const drawerNoteInputEl = document.querySelector('#drawerNoteInput');
  const btnClearDrawerNoteEl = document.querySelector('#btnClearDrawerNote');
  const btnDrawerAddNoteEl = document.querySelector('#btnDrawerAddNote');
  const btnOpenFullAiNotesEl = document.querySelector('#btnOpenFullAiNotes');
  const drawerCurrentSlideLabelEl = document.querySelector('#drawerCurrentSlideLabel');
  const drawerAiSyncTextEl = document.querySelector('#drawerAiSyncText');

  // Zoom
  const btnZoomInEl = document.querySelector('#btnZoomIn');
  const btnZoomOutEl = document.querySelector('#btnZoomOut');
  const zoomValueEl = document.querySelector('#zoomValue');
  let currentZoom = 100;

  // Panel Resizer (Draggable Splitter)
  const panelResizerEl = document.querySelector('#panelResizer');

  // Right AI Sidebar
  const rightAiSidebarEl = document.querySelector('#rightAiSidebar');
  const tabAssistantEl = document.querySelector('#tabAssistant');
  const tabAiNotesEl = document.querySelector('#tabAiNotes');
  const assistantChatViewEl = document.querySelector('#assistantChatView');
  const aiNotesWorkspaceViewEl = document.querySelector('#aiNotesWorkspaceView');
  const chatContextSubtitleEl = document.querySelector('#chatContextSubtitle');
  const chatMessagesContainerEl = document.querySelector('#chatMessagesContainer');
  const chatFormEl = document.querySelector('#chatForm');
  const chatInputEl = document.querySelector('#chatInput');
  const btnToggleExpandRightEl = document.querySelector('#btnToggleExpandRight');
  const activeOptionBadgeEl = document.querySelector('#activeOptionBadge');
  const workspaceOptionTagEl = document.querySelector('#workspaceOptionTag');
  const workspacePhilosophyEl = document.querySelector('#workspacePhilosophy');

  // Traces & Action Column
  const btnToggleTracesColEl = document.querySelector('#btnToggleTracesCol');
  const traceCountBadgeEl = document.querySelector('#traceCountBadge');
  const tracesStreamPaneEl = document.querySelector('#tracesStreamPane');
  const sourceListEl = document.querySelector('#sourceList');
  const actionColumnEl = document.querySelector('#actionColumn');

  // Topbar Controls & Guide Modal
  const saveStatusEl = document.querySelector('#saveStatus');
  const btnOpenGuideEl = document.querySelector('#btnOpenGuide');
  const btnResetEl = document.querySelector('#btnReset');
  const btnThemeToggleEl = document.querySelector('#btnThemeToggle');
  const themeToggleTextEl = document.querySelector('#themeToggleText');
  const guideModalOverlayEl = document.querySelector('#guideModalOverlay');
  const btnCloseGuideModalEl = document.querySelector('#btnCloseGuideModal');
  const btnCloseGuideModalBtnEl = document.querySelector('#btnCloseGuideModalBtn');
  const btnTourDemoEl = document.querySelector('#btnTourDemo');
  const toastEl = document.querySelector('#toast');
  const navOptionLinks = document.querySelectorAll('.nav-opt');

  // --------------------------------------------------------------------------
  // AUTOSAVE & TOAST
  // --------------------------------------------------------------------------
  let saveTimer = null;
  let fadeTimer = null;

  function notifySave(msg = 'Đã lưu') {
    if (!saveStatusEl) return;
    clearTimeout(saveTimer);
    clearTimeout(fadeTimer);
    saveStatusEl.textContent = 'Đang lưu';
    saveStatusEl.classList.remove('faded');

    saveTimer = setTimeout(() => {
      saveStatusEl.textContent = msg;
      fadeTimer = setTimeout(() => {
        saveStatusEl.classList.add('faded');
      }, 1400);
    }, 300);
  }

  let toastTimer = null;
  function showToast(message, actionLabel, onAction, duration = 3000) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.innerHTML = '';

    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    toastEl.appendChild(textSpan);

    if (actionLabel && onAction) {
      const actionBtn = document.createElement('button');
      actionBtn.className = 'toast-btn btn-text';
      actionBtn.type = 'button';
      actionBtn.textContent = actionLabel;
      actionBtn.addEventListener('click', () => {
        onAction();
        hideToast();
      });
      toastEl.appendChild(actionBtn);
    }

    toastEl.classList.add('show');
    toastTimer = setTimeout(hideToast, duration);
  }

  function hideToast() {
    if (!toastEl) return;
    toastEl.classList.remove('show');
    clearTimeout(toastTimer);
  }

  // --------------------------------------------------------------------------
  // THEME MANAGEMENT (SÁNG / TỐI)
  // --------------------------------------------------------------------------
  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    state.theme = nextTheme;
    if (themeToggleTextEl) {
      themeToggleTextEl.textContent = nextTheme === 'dark' ? 'Sáng' : 'Tối';
    }
    notifySave();
  }

  if (btnThemeToggleEl) {
    btnThemeToggleEl.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // DRAGGABLE NOTE DRAWER (CHO PHÉP KÉO THẢ KHUNG NOTE)
  // --------------------------------------------------------------------------
  function makeElementDraggable(dragHandle, targetElement) {
    if (!dragHandle || !targetElement) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    dragHandle.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons inside header
      if (e.target.closest('button')) return;

      isDragging = true;
      targetElement.classList.add('dragging');

      startX = e.clientX;
      startY = e.clientY;

      const rect = targetElement.getBoundingClientRect();
      const parentRect = targetElement.parentElement.getBoundingClientRect();

      // Convert to relative coordinates inside slide
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    });

    function onMouseMove(e) {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      const parentRect = targetElement.parentElement.getBoundingClientRect();
      const rect = targetElement.getBoundingClientRect();

      // Constrain within bounds
      newLeft = Math.max(0, Math.min(newLeft, parentRect.width - rect.width));
      newTop = Math.max(0, Math.min(newTop, parentRect.height - rect.height));

      targetElement.style.left = `${newLeft}px`;
      targetElement.style.top = `${newTop}px`;
    }

    function onMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      targetElement.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      notifySave('Đã chuyển vị trí note');
    }
  }

  makeElementDraggable(noteDrawerHeaderEl, vlearnNoteDrawerEl);

  // --------------------------------------------------------------------------
  // DUAL-PANEL RESIZER (KÉO TO/NHỎ BẢNG AI LINH HOẠT THAY VÌ FIX CỨNG)
  // --------------------------------------------------------------------------
  function initPanelResizer() {
    if (!panelResizerEl || !rightAiSidebarEl) return;

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    function onStart(clientX) {
      if (window.innerWidth <= 768) return;
      isResizing = true;
      startX = clientX;
      startWidth = rightAiSidebarEl.getBoundingClientRect().width;

      panelResizerEl.classList.add('resizing');
      rightAiSidebarEl.classList.add('resizing');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }

    function onMove(clientX) {
      if (!isResizing) return;
      const deltaX = startX - clientX;
      let newWidth = startWidth + deltaX;
      const minW = 280;
      const maxW = Math.floor(window.innerWidth * 0.75);
      newWidth = Math.max(minW, Math.min(newWidth, maxW));
      rightAiSidebarEl.style.width = `${newWidth}px`;
    }

    function onMouseMove(e) {
      onMove(e.clientX);
    }

    function onTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        if (e.cancelable) e.preventDefault();
        onMove(e.touches[0].clientX);
      }
    }

    function onEnd() {
      if (!isResizing) return;
      isResizing = false;

      panelResizerEl.classList.remove('resizing');
      rightAiSidebarEl.classList.remove('resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);

      notifySave('Đã chỉnh độ rộng bảng AI');
    }

    panelResizerEl.addEventListener('mousedown', (e) => {
      onStart(e.clientX);
    });

    panelResizerEl.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        onStart(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  initPanelResizer();

  // --------------------------------------------------------------------------
  // GUIDE MODAL POPUP (HƯỚNG DẪN DEMO TỰ THAO TÁC)
  // --------------------------------------------------------------------------
  function openGuideModal() {
    state.guideModalOpen = true;
    if (guideModalOverlayEl) guideModalOverlayEl.classList.remove('hidden');
  }

  function closeGuideModal() {
    state.guideModalOpen = false;
    if (guideModalOverlayEl) guideModalOverlayEl.classList.add('hidden');
  }

  if (btnOpenGuideEl) btnOpenGuideEl.addEventListener('click', openGuideModal);
  if (btnCloseGuideModalEl) btnCloseGuideModalEl.addEventListener('click', closeGuideModal);
  if (btnCloseGuideModalBtnEl) btnCloseGuideModalBtnEl.addEventListener('click', closeGuideModal);

  // Automated Interactive Walkthrough (Demo Tour)
  if (btnTourDemoEl) {
    btnTourDemoEl.addEventListener('click', () => {
      closeGuideModal();
      runInteractiveTourDemo();
    });
  }

  function runInteractiveTourDemo() {
    showToast('Bắt đầu chạy thử kịch bản tự động...');

    // Step 1: Highlight draggable note
    if (vlearnNoteDrawerEl) {
      vlearnNoteDrawerEl.classList.remove('hidden');
      vlearnNoteDrawerEl.classList.add('tour-pulse');
      setTimeout(() => vlearnNoteDrawerEl.classList.remove('tour-pulse'), 1500);
    }

    // Step 2: Open right panel and switch to current option
    setTimeout(() => {
      switchRightTab('aiNotes');
      expandRightSidebar(true);

      if (state.option === 'b' || state.option === 'hybrid') {
        showToast('AI Co-pilot: Tự động kích hoạt bản nháp 2 cột...');
        generateDraftB();
      } else if (state.option === 'a') {
        showToast('Option A: Tự động xếp 2 thẻ mẫu vào cột Ý chính...');
        assignCardToBucket(1, 'main');
        assignCardToBucket(2, 'main');
      } else if (state.option === 'c') {
        showToast('Option C: Đang mô phỏng trả lời câu hỏi phản xạ...');
        state.quizAnswerC = 'false';
        renderAction();
      }
    }, 1200);

    setTimeout(() => {
      showToast('Hoàn tất kịch bản mẫu. Bạn có thể tự do bấm sửa, kéo thả hoặc chọn Option khác!');
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // SLIDE PRESENTATION RENDERING ENGINE
  // --------------------------------------------------------------------------
  function renderSlide(pageNumber) {
    state.currentSlide = pageNumber;
    const slideData = Data.slides.find(s => s.page === pageNumber) || Data.slides[2];

    if (currentSlideNumEl) currentSlideNumEl.textContent = String(pageNumber);
    if (totalSlideNumEl) totalSlideNumEl.textContent = String(Data.slides.length);

    if (chatContextSubtitleEl) {
      chatContextSubtitleEl.textContent = `Đang mở: Slide: Design the experiment - trang ${pageNumber}`;
    }
    if (drawerCurrentSlideLabelEl) {
      const activeTrace = Data.traces.find(t => t.slide === pageNumber) || Data.traces[0];
      drawerCurrentSlideLabelEl.textContent = `Slide ${pageNumber} · ${activeTrace ? activeTrace.time : '00:00'}`;
    }

    if (slideContentWrapEl) {
      slideContentWrapEl.innerHTML = '';

      if (slideData.content.type === 'agenda') {
        const topHeader = document.createElement('div');
        topHeader.className = 'slide-top-header';
        topHeader.textContent = slideData.subtitle || 'AI IN ACTION · DAY 18 · TRACK 1';

        const title = document.createElement('h1');
        title.className = 'slide-main-title';
        title.textContent = slideData.content.heading || 'Day 18 Agenda';

        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'agenda-cards-grid';

        slideData.content.cards.forEach(card => {
          const cardEl = document.createElement('div');
          cardEl.className = 'agenda-card';
          cardEl.innerHTML = `
            <div class="card-num">${card.num}</div>
            <div class="card-title">${card.title}</div>
            <div class="card-desc">${card.desc}</div>
            <div class="card-badge">${card.badge}</div>
          `;
          cardsGrid.appendChild(cardEl);
        });

        slideContentWrapEl.appendChild(topHeader);
        slideContentWrapEl.appendChild(title);
        slideContentWrapEl.appendChild(cardsGrid);

      } else if (slideData.content.type === 'concept' || slideData.content.type === 'intro') {
        const topHeader = document.createElement('div');
        topHeader.className = 'slide-top-header';
        topHeader.textContent = slideData.subtitle || 'HUMAN-CENTERED AI DESIGN';

        const title = document.createElement('h1');
        title.className = 'slide-main-title';
        title.textContent = slideData.content.heading;

        const bulletsList = document.createElement('ul');
        bulletsList.className = 'slide-concept-bullets';

        (slideData.content.bullets || []).forEach(b => {
          const li = document.createElement('li');
          li.textContent = b;
          bulletsList.appendChild(li);
        });

        slideContentWrapEl.appendChild(topHeader);
        slideContentWrapEl.appendChild(title);
        slideContentWrapEl.appendChild(bulletsList);

      } else {
        const topHeader = document.createElement('div');
        topHeader.className = 'slide-top-header';
        topHeader.textContent = slideData.subtitle || 'VLEARN AI';

        const title = document.createElement('h1');
        title.className = 'slide-main-title';
        title.textContent = slideData.content.heading;

        const sub = document.createElement('p');
        sub.style.fontSize = '14px';
        sub.style.color = '#475569';
        sub.textContent = slideData.content.sub;

        slideContentWrapEl.appendChild(topHeader);
        slideContentWrapEl.appendChild(title);
        slideContentWrapEl.appendChild(sub);
      }
    }

    renderThumbnails();
  }

  function renderThumbnails() {
    if (!thumbnailsTrackEl) return;
    thumbnailsTrackEl.innerHTML = '';

    Data.slides.forEach(slide => {
      const thumb = document.createElement('div');
      thumb.className = 'slide-thumb';
      if (slide.page === state.currentSlide) thumb.classList.add('active');
      thumb.textContent = String(slide.page);
      thumb.title = `Trang ${slide.page}: ${slide.title}`;
      thumb.addEventListener('click', () => {
        renderSlide(slide.page);
        showToast(`Đã chuyển tới Slide ${slide.page}`);
      });
      thumbnailsTrackEl.appendChild(thumb);
    });
  }

  // Slide Pager
  if (btnPrevSlideEl) {
    btnPrevSlideEl.addEventListener('click', () => {
      if (state.currentSlide > 1) renderSlide(state.currentSlide - 1);
    });
  }
  if (btnNextSlideEl) {
    btnNextSlideEl.addEventListener('click', () => {
      if (state.currentSlide < Data.slides.length) renderSlide(state.currentSlide + 1);
    });
  }
  if (btnThumbPrevEl) {
    btnThumbPrevEl.addEventListener('click', () => {
      if (thumbnailsTrackEl) thumbnailsTrackEl.scrollLeft -= 120;
    });
  }
  if (btnThumbNextEl) {
    btnThumbNextEl.addEventListener('click', () => {
      if (thumbnailsTrackEl) thumbnailsTrackEl.scrollLeft += 120;
    });
  }

  // Zoom
  if (btnZoomInEl && btnZoomOutEl && zoomValueEl) {
    btnZoomInEl.addEventListener('click', () => {
      currentZoom = Math.min(130, currentZoom + 10);
      zoomValueEl.textContent = `${currentZoom}%`;
      if (slideCanvasEl) slideCanvasEl.style.transform = `scale(${currentZoom / 100})`;
    });
    btnZoomOutEl.addEventListener('click', () => {
      currentZoom = Math.max(90, currentZoom - 10);
      zoomValueEl.textContent = `${currentZoom}%`;
      if (slideCanvasEl) slideCanvasEl.style.transform = `scale(${currentZoom / 100})`;
    });
  }

  // --------------------------------------------------------------------------
  // SỔ GHI CHÚ (NOTE DRAWER) INTERACTIONS
  // --------------------------------------------------------------------------
  function toggleNotebookDrawer() {
    state.isNotebookDrawerOpen = !state.isNotebookDrawerOpen;
    if (vlearnNoteDrawerEl) {
      if (state.isNotebookDrawerOpen) {
        vlearnNoteDrawerEl.classList.remove('hidden');
        if (btnToggleNotebookEl) btnToggleNotebookEl.classList.add('active');
      } else {
        vlearnNoteDrawerEl.classList.add('hidden');
        if (btnToggleNotebookEl) btnToggleNotebookEl.classList.remove('active');
      }
    }
  }

  if (btnToggleNotebookEl) btnToggleNotebookEl.addEventListener('click', toggleNotebookDrawer);
  if (btnDrawerCloseEl) btnDrawerCloseEl.addEventListener('click', toggleNotebookDrawer);

  if (drawerNoteInputEl) {
    drawerNoteInputEl.addEventListener('input', () => notifySave('Đã lưu ghi chú'));
  }
  if (btnClearDrawerNoteEl && drawerNoteInputEl) {
    btnClearDrawerNoteEl.addEventListener('click', () => {
      drawerNoteInputEl.value = '';
      showToast('Đã xóa ghi chú');
    });
  }

  if (btnDrawerAddNoteEl && drawerNoteInputEl) {
    btnDrawerAddNoteEl.addEventListener('click', () => {
      const val = drawerNoteInputEl.value.trim();
      if (!val) {
        drawerNoteInputEl.focus();
        return;
      }
      const newTrace = {
        id: Date.now(),
        time: '13:00',
        slide: state.currentSlide,
        text: val,
        isUserCreated: true,
        tag: 'Ghi chú tự tạo'
      };
      Data.traces.push(newTrace);
      if (state.selectedB) state.selectedB.add(newTrace.id);
      if (state.filterC) state.filterC.add(newTrace.id);
      drawerNoteInputEl.value = '';
      updateTraceCount();
      renderTraces();
      renderAction();
      showToast('Đã thêm ghi chú mới vào danh sách dấu vết');
      notifySave();
    });
  }

  const openRightNotes = () => {
    switchRightTab('aiNotes');
    if (state.option === 'b' || state.option === 'hybrid') expandRightSidebar(true);
    showToast('Đã mở không gian làm việc AI Notes');
  };
  if (btnDrawerExpandEl) btnDrawerExpandEl.addEventListener('click', openRightNotes);
  if (btnOpenFullAiNotesEl) btnOpenFullAiNotesEl.addEventListener('click', openRightNotes);
  if (btnSlideAiTriggerEl) {
    btnSlideAiTriggerEl.addEventListener('click', () => {
      if (!state.isNotebookDrawerOpen) {
        toggleNotebookDrawer();
      }
      switchRightTab('aiNotes');
      showToast(`AI kích hoạt từ Slide ${state.currentSlide}: Đã mở Sổ ghi chú & AI Notes`);
    });
  }

  // --------------------------------------------------------------------------
  // SYLLABUS SIDEBAR TOGGLE
  // --------------------------------------------------------------------------
  function toggleSyllabus() {
    state.isSyllabusOpen = !state.isSyllabusOpen;
    if (syllabusSidebarEl) {
      if (state.isSyllabusOpen) {
        syllabusSidebarEl.classList.remove('collapsed');
      } else {
        syllabusSidebarEl.classList.add('collapsed');
      }
    }
  }

  if (btnToggleSidebarEl) btnToggleSidebarEl.addEventListener('click', toggleSyllabus);
  if (btnCloseSyllabusEl) btnCloseSyllabusEl.addEventListener('click', toggleSyllabus);

  // Syllabus Items click
  document.querySelectorAll('.syllabus-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.syllabus-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const targetSlide = Number(item.dataset.slide) || 3;
      renderSlide(targetSlide);
    });
  });

  // --------------------------------------------------------------------------
  // RIGHT PANEL TABS (TRỢ GIẢNG AI vs AI NOTES)
  // --------------------------------------------------------------------------
  function switchRightTab(tabName) {
    state.rightPanelTab = tabName;
    if (tabName === 'assistant') {
      if (tabAssistantEl) tabAssistantEl.classList.add('active');
      if (tabAiNotesEl) tabAiNotesEl.classList.remove('active');
      if (assistantChatViewEl) assistantChatViewEl.classList.remove('hidden');
      if (aiNotesWorkspaceViewEl) aiNotesWorkspaceViewEl.classList.add('hidden');
    } else {
      if (tabAssistantEl) tabAssistantEl.classList.remove('active');
      if (tabAiNotesEl) tabAiNotesEl.classList.add('active');
      if (assistantChatViewEl) assistantChatViewEl.classList.add('hidden');
      if (aiNotesWorkspaceViewEl) aiNotesWorkspaceViewEl.classList.remove('hidden');
      renderAction();
    }
  }

  if (tabAssistantEl) tabAssistantEl.addEventListener('click', () => switchRightTab('assistant'));
  if (tabAiNotesEl) tabAiNotesEl.addEventListener('click', () => switchRightTab('aiNotes'));

  function expandRightSidebar(forceExpand) {
    state.isRightPanelExpanded = typeof forceExpand === 'boolean' ? forceExpand : !state.isRightPanelExpanded;
    if (rightAiSidebarEl) {
      rightAiSidebarEl.style.width = '';
      if (state.isRightPanelExpanded) {
        rightAiSidebarEl.classList.add('expanded');
      } else {
        rightAiSidebarEl.classList.remove('expanded');
      }
    }
  }

  if (btnToggleExpandRightEl) {
    btnToggleExpandRightEl.addEventListener('click', () => expandRightSidebar());
  }

  // Chat form
  if (chatFormEl && chatInputEl && chatMessagesContainerEl) {
    chatFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInputEl.value.trim();
      if (!val) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.style.justifyContent = 'flex-end';
      userMsg.innerHTML = `<div class="msg-bubble" style="background:var(--vl-primary);color:#fff;">${val}</div>`;
      chatMessagesContainerEl.appendChild(userMsg);

      chatInputEl.value = '';
      chatMessagesContainerEl.scrollTop = chatMessagesContainerEl.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message assistant';
        botMsg.innerHTML = `
          <div class="msg-avatar">✨</div>
          <div class="msg-bubble">Về câu hỏi <em>"${val}"</em> trên Slide ${state.currentSlide}: Nội dung này đã được đồng bộ vào <strong>Sổ ghi chú AI</strong>. Bạn hãy chuyển sang tab AI Notes để cùng kiểm tra nhé!</div>
        `;
        chatMessagesContainerEl.appendChild(botMsg);
        chatMessagesContainerEl.scrollTop = chatMessagesContainerEl.scrollHeight;
      }, 400);
    });
  }

  // --------------------------------------------------------------------------
  // PROTOTYPE OPTION SWITCHER LOGIC
  // --------------------------------------------------------------------------
  function setPrototypeOption(optKey) {
    state.option = optKey;
    document.body.dataset.option = optKey;

    navOptionLinks.forEach(link => {
      if (link.dataset.opt === optKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (activeOptionBadgeEl) {
      activeOptionBadgeEl.textContent = optKey === 'hybrid' ? 'B+C' : optKey.toUpperCase();
    }

    if (workspaceOptionTagEl && workspacePhilosophyEl) {
      if (optKey === 'a') {
        workspaceOptionTagEl.textContent = 'Option A · Timeline & Contextual Pinning';
        workspacePhilosophyEl.textContent = 'Chủ động cao (Low AI)';
      } else if (optKey === 'b') {
        workspaceOptionTagEl.textContent = 'Option B · Co-pilot Dual-Pane Canvas';
        workspacePhilosophyEl.textContent = 'Đồng sáng tạo (Human-in-the-loop)';
      } else if (optKey === 'c') {
        workspaceOptionTagEl.textContent = 'Option C · Active Recall & Smart Quiz';
        workspacePhilosophyEl.textContent = 'Tự động chủ động (High AI)';
      } else if (optKey === 'hybrid') {
        workspaceOptionTagEl.textContent = '✨ Hybrid · Dual-Pane Canvas + Active Recall Quiz';
        workspacePhilosophyEl.textContent = 'Phương án hội tụ nhóm 3 in 1';
      }
    }

    if (optKey === 'b' || optKey === 'hybrid') {
      expandRightSidebar(true);
    } else {
      expandRightSidebar(false);
    }

    // Dấu vết bài giảng: ở Option B, C, Hybrid mặc định ẩn (collapsed) để tối ưu diện tích; ở A thì mở vì cần kéo thả
    if (optKey === 'a') {
      state.tracesColCollapsed = false;
      if (tracesStreamPaneEl) tracesStreamPaneEl.classList.remove('collapsed');
      if (btnToggleTracesColEl) btnToggleTracesColEl.classList.add('active');
    } else {
      state.tracesColCollapsed = true;
      if (tracesStreamPaneEl) tracesStreamPaneEl.classList.add('collapsed');
      if (btnToggleTracesColEl) btnToggleTracesColEl.classList.remove('active');
    }

    renderTraces();
    renderAction();
    notifySave(`Đã chuyển sang Option ${optKey.toUpperCase()}`);
  }

  navOptionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetOpt = link.dataset.opt;
      if (targetOpt) {
        e.preventDefault();
        window.history.pushState({}, '', `?option=${targetOpt}`);
        setPrototypeOption(targetOpt);
      }
    });
  });

  // --------------------------------------------------------------------------
  // TRACES STREAM RENDERING
  // --------------------------------------------------------------------------
  function updateTraceCount() {
    if (traceCountBadgeEl) traceCountBadgeEl.textContent = String(Data.traces.length);
  }

  if (btnToggleTracesColEl && tracesStreamPaneEl) {
    btnToggleTracesColEl.addEventListener('click', () => {
      state.tracesColCollapsed = !state.tracesColCollapsed;
      if (state.tracesColCollapsed) {
        tracesStreamPaneEl.classList.add('collapsed');
        btnToggleTracesColEl.classList.remove('active');
        showToast('Đã thu gọn cột Dấu vết bài giảng');
      } else {
        tracesStreamPaneEl.classList.remove('collapsed');
        btnToggleTracesColEl.classList.add('active');
        showToast('Đã hiển thị cột Dấu vết bài giảng');
      }
    });
  }

  function renderTraces() {
    if (!sourceListEl) return;
    sourceListEl.innerHTML = '';
    updateTraceCount();

    const assignedIdsA = [
      ...state.buckets.main,
      ...state.buckets.unclear,
      ...state.buckets.review
    ];

    Data.traces.forEach((trace) => {
      const item = document.createElement('div');
      item.className = 'source-item';
      item.id = `source-item-${trace.id}`;

      if (state.option === 'a' && assignedIdsA.includes(trace.id)) {
        item.classList.add('assigned');
      }

      if (state.option === 'a') {
        item.draggable = true;
        item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', String(trace.id));
        });
      }

      const metaRow = document.createElement('div');
      metaRow.className = 'source-item-meta';

      const timeSpan = document.createElement('span');
      timeSpan.className = 'time-mono interactive';
      timeSpan.textContent = `P.${trace.slide || 3} · ${trace.time}`;
      timeSpan.title = `Nhảy tới Slide ${trace.slide || 3}`;
      timeSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        if (trace.slide) renderSlide(trace.slide);
        showToast(`Đã chuyển tới Slide ${trace.slide}`);
      });

      metaRow.appendChild(timeSpan);

      if (trace.unclear) {
        const uncBadge = document.createElement('span');
        uncBadge.className = 'trace-unclear-badge';
        uncBadge.textContent = 'Chưa hiểu';
        metaRow.appendChild(uncBadge);
      }

      const textEl = document.createElement('div');
      textEl.className = 'trace-text';
      textEl.textContent = trace.text;

      item.appendChild(metaRow);
      item.appendChild(textEl);

      // Inline Quick Column buttons for Option A
      if (state.option === 'a' && !assignedIdsA.includes(trace.id)) {
        const selector = document.createElement('div');
        selector.className = 'column-selector-inline';

        const cols = [
          { key: 'main', label: 'Ý chính' },
          { key: 'unclear', label: 'Chưa hiểu' },
          { key: 'review', label: 'Xem lại' }
        ];

        cols.forEach(col => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = col.label;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            assignCardToBucket(trace.id, col.key);
          });
          selector.appendChild(btn);
        });

        item.appendChild(selector);
      }

      sourceListEl.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // OPTION A: CONTEXTUAL PINNING (LOW AI / HIGH USER CONTROL)
  // --------------------------------------------------------------------------
  function recordHistoryA() {
    state.historyA.push({
      buckets: {
        main: [...state.buckets.main],
        unclear: [...state.buckets.unclear],
        review: [...state.buckets.review]
      }
    });
    if (state.historyA.length > 20) state.historyA.shift();
  }

  function assignCardToBucket(cardId, targetBucketKey) {
    recordHistoryA();
    Object.keys(state.buckets).forEach(key => {
      state.buckets[key] = state.buckets[key].filter(id => id !== cardId);
    });
    state.buckets[targetBucketKey].push(cardId);
    notifySave();
    renderTraces();
    renderActionA();
  }

  function unassignCard(cardId) {
    recordHistoryA();
    Object.keys(state.buckets).forEach(key => {
      state.buckets[key] = state.buckets[key].filter(id => id !== cardId);
    });
    notifySave();
    renderTraces();
    renderActionA();
  }

  function undoA() {
    if (state.historyA.length === 0) {
      showToast('Không có thao tác hoàn tác');
      return;
    }
    const prev = state.historyA.pop();
    state.buckets = prev.buckets;
    notifySave();
    renderTraces();
    renderActionA();
    showToast('Đã hoàn tác');
  }

  function checkDuplicatesA() {
    state.highlightDupsA = !state.highlightDupsA;
    notifySave();
    renderActionA();
    if (state.highlightDupsA) {
      showToast('AI phát hiện 2 thẻ trùng nội dung (#4 và #5)');
    } else {
      showToast('Đã tắt đánh dấu trùng');
    }
  }

  function renderActionA() {
    if (!actionColumnEl) return;
    actionColumnEl.innerHTML = '';

    const totalAssigned = state.buckets.main.length + state.buckets.unclear.length + state.buckets.review.length;

    const frame1 = document.createElement('div');
    frame1.className = 'step-card';
    frame1.innerHTML = `
      <div class="step-header">
        <span>1. Xếp thẻ vào nhóm</span>
        <span class="text-xs text-muted">${totalAssigned} / ${Data.traces.length} thẻ</span>
      </div>
      <div class="step-guide">Tự do kéo thẻ hoặc bấm nút phân loại bên dưới.</div>
    `;

    const columnsGrid = document.createElement('div');
    columnsGrid.className = 'board-columns-grid';

    const colConfigs = [
      { key: 'main', label: 'Ý chính (Key Points)' },
      { key: 'unclear', label: 'Chưa hiểu (Points to Clarify)' },
      { key: 'review', label: 'Xem lại (Review Later)' }
    ];

    colConfigs.forEach(col => {
      const colEl = document.createElement('div');
      colEl.className = 'board-column';
      colEl.dataset.bucket = col.key;

      colEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        colEl.classList.add('drag-over');
      });
      colEl.addEventListener('dragleave', () => colEl.classList.remove('drag-over'));
      colEl.addEventListener('drop', (e) => {
        e.preventDefault();
        colEl.classList.remove('drag-over');
        const cardId = Number(e.dataTransfer.getData('text/plain'));
        if (cardId) assignCardToBucket(cardId, col.key);
      });

      colEl.innerHTML = `
        <div class="board-column-header">
          <span>${col.label}</span>
          <span class="count">${state.buckets[col.key].length}</span>
        </div>
      `;

      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'board-column-cards';

      state.buckets[col.key].forEach(cardId => {
        const trace = Data.traces.find(t => t.id === cardId);
        if (!trace) return;

        const card = document.createElement('div');
        card.className = 'card-item';
        card.draggable = true;
        card.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', String(cardId)));

        const isDuplicate = state.highlightDupsA && (cardId === 4 || cardId === 5);
        if (isDuplicate) card.classList.add('duplicate');

        const body = document.createElement('div');
        body.className = 'card-body';
        body.contentEditable = 'true';
        body.spellcheck = false;
        body.textContent = state.cardTextsA[cardId] || trace.text;
        body.addEventListener('input', () => {
          state.cardTextsA[cardId] = body.textContent;
          notifySave();
        });

        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.innerHTML = `
          <div class="card-footer-left">
            <span class="time-mono">P.${trace.slide || 3} · ${trace.time}</span>
            ${isDuplicate ? '<span class="label-uncertain">Trùng nội dung</span>' : ''}
          </div>
        `;

        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-text';
        btnRemove.type = 'button';
        btnRemove.textContent = 'Bỏ';
        btnRemove.addEventListener('click', () => unassignCard(cardId));

        footer.appendChild(btnRemove);
        card.appendChild(body);
        card.appendChild(footer);
        cardsContainer.appendChild(card);
      });

      colEl.appendChild(cardsContainer);
      columnsGrid.appendChild(colEl);
    });

    frame1.appendChild(columnsGrid);
    actionColumnEl.appendChild(frame1);

    // AI Tools
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';
    frame2.innerHTML = `<div class="step-header">2. AI Hỗ trợ theo yêu cầu</div>`;

    const toolsRow = document.createElement('div');
    toolsRow.style.display = 'flex';
    toolsRow.style.gap = '6px';

    const btnCheckDup = document.createElement('button');
    btnCheckDup.className = 'btn-outline';
    btnCheckDup.type = 'button';
    btnCheckDup.textContent = state.highlightDupsA ? 'Tắt kiểm tra trùng' : '🔍 Kiểm tra trùng (AI)';
    btnCheckDup.addEventListener('click', checkDuplicatesA);

    const btnUndo = document.createElement('button');
    btnUndo.className = 'btn-outline';
    btnUndo.type = 'button';
    btnUndo.textContent = 'Hoàn tác';
    btnUndo.disabled = state.historyA.length === 0;
    btnUndo.addEventListener('click', undoA);

    toolsRow.appendChild(btnCheckDup);
    toolsRow.appendChild(btnUndo);
    frame2.appendChild(toolsRow);
    actionColumnEl.appendChild(frame2);

    // Save
    const frame3 = document.createElement('div');
    frame3.className = 'step-card';
    frame3.innerHTML = `<div class="step-header">3. Lưu Study Pack</div>`;

    const nextActionBox = document.createElement('div');
    nextActionBox.className = 'next-action-box';

    if (!state.savedA) {
      const hint = document.createElement('span');
      hint.className = 'text-xs text-muted';
      hint.textContent = totalAssigned >= 2 ? 'Sẵn sàng lưu.' : 'Xếp ít nhất 2 thẻ để lưu.';

      const btnSave = document.createElement('button');
      btnSave.className = 'btn-primary';
      btnSave.type = 'button';
      btnSave.disabled = totalAssigned < 2;
      btnSave.textContent = 'Lưu Study Pack';
      btnSave.addEventListener('click', () => {
        state.savedA = true;
        notifySave('Đã lưu Study Pack');
        renderActionA();
        showToast('Đã lưu Study Pack Option A');
      });

      nextActionBox.appendChild(hint);
      nextActionBox.appendChild(btnSave);
    } else {
      const savedMsg = document.createElement('span');
      savedMsg.className = 'text-sm';
      savedMsg.textContent = `Đã lưu ${totalAssigned} thẻ vào Study Pack.`;

      const btnResetA = document.createElement('button');
      btnResetA.className = 'btn-outline';
      btnResetA.type = 'button';
      btnResetA.textContent = 'Làm lại';
      btnResetA.addEventListener('click', () => {
        state.savedA = false;
        renderActionA();
      });

      nextActionBox.appendChild(savedMsg);
      nextActionBox.appendChild(btnResetA);
    }

    frame3.appendChild(nextActionBox);
    actionColumnEl.appendChild(frame3);
  }

  // --------------------------------------------------------------------------
  // OPTION B: DUAL-PANE CO-PILOT CANVAS (BALANCED AI)
  // --------------------------------------------------------------------------
  function toggleTraceB(id) {
    if (state.selectedB.has(id)) {
      state.selectedB.delete(id);
    } else {
      state.selectedB.add(id);
    }
    notifySave();
    renderActionB();
  }

  function selectAllB() {
    Data.traces.forEach(t => state.selectedB.add(t.id));
    notifySave();
    renderActionB();
  }

  function deselectAllB() {
    state.selectedB.clear();
    notifySave();
    renderActionB();
  }

  function generateDraftB() {
    state.isGeneratingB = true;
    renderActionB();

    setTimeout(() => {
      state.isGeneratingB = false;
      state.draftB = { ...Data.initialDraftB };
      notifySave('Đã tạo bản nháp');
      renderActionB();
      showToast('AI Co-pilot đã cấu trúc lại bản nháp');
    }, 350);
  }

  function restoreOriginalB() {
    state.previousDraftB = { ...state.draftB };
    state.draftB = { ...Data.originalDraftB };
    notifySave();
    renderActionB();
    showToast('Đã khôi phục nguyên văn bài giảng', 'Hoàn tác', () => {
      if (state.previousDraftB) {
        state.draftB = { ...state.previousDraftB };
        notifySave();
        renderActionB();
        showToast('Đã hoàn tác khôi phục');
      }
    }, 5000);
  }

  function renderActionB(targetContainer = actionColumnEl, isHybridMode = false) {
    if (!targetContainer) return;
    if (!isHybridMode) targetContainer.innerHTML = '';

    // Step 1: Select traces
    const frame1 = document.createElement('div');
    frame1.className = 'step-card';
    frame1.innerHTML = `
      <div class="step-header">
        <span>1. Dấu vết gửi vào Co-pilot</span>
        <span class="text-xs text-muted">${state.selectedB.size} / ${Data.traces.length}</span>
      </div>
    `;

    const checklistBox = document.createElement('div');
    checklistBox.className = 'checklist-items';

    Data.traces.forEach(trace => {
      const row = document.createElement('label');
      row.className = 'checklist-row';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'checklist-checkbox';
      cb.checked = state.selectedB.has(trace.id);
      cb.addEventListener('change', () => toggleTraceB(trace.id));

      const time = document.createElement('span');
      time.className = 'time-mono';
      time.textContent = `P.${trace.slide || 3} · ${trace.time}`;

      const text = document.createElement('span');
      text.textContent = trace.text;

      row.appendChild(cb);
      row.appendChild(time);
      row.appendChild(text);
      checklistBox.appendChild(row);
    });

    frame1.appendChild(checklistBox);

    const frame1Actions = document.createElement('div');
    frame1Actions.className = 'frame-action-row';

    const leftSelBtns = document.createElement('div');
    leftSelBtns.className = 'select-btn-group';

    const btnAll = document.createElement('button');
    btnAll.className = 'btn-text';
    btnAll.type = 'button';
    btnAll.textContent = 'Tất cả';
    btnAll.addEventListener('click', selectAllB);

    const btnNone = document.createElement('button');
    btnNone.className = 'btn-text';
    btnNone.type = 'button';
    btnNone.textContent = 'Bỏ chọn';
    btnNone.addEventListener('click', deselectAllB);

    leftSelBtns.appendChild(btnAll);
    leftSelBtns.appendChild(btnNone);

    const btnGenerate = document.createElement('button');
    btnGenerate.className = 'btn-primary';
    btnGenerate.type = 'button';
    btnGenerate.disabled = state.selectedB.size === 0 || state.isGeneratingB;
    btnGenerate.textContent = state.isGeneratingB ? 'Đang tạo...' : `Dựng nháp (${state.selectedB.size})`;
    btnGenerate.addEventListener('click', generateDraftB);

    frame1Actions.appendChild(leftSelBtns);
    frame1Actions.appendChild(btnGenerate);
    frame1.appendChild(frame1Actions);
    targetContainer.appendChild(frame1);

    // Step 2: Co-pilot draft
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';
    frame2.innerHTML = `
      <div class="step-header">
        <span>2. Bản nháp đồng biên tập cùng AI</span>
        <span class="text-xs text-muted">Có thể chỉnh sửa</span>
      </div>
    `;

    const docEditor = document.createElement('div');
    docEditor.className = 'doc-editor';

    // Section 1: Khái niệm
    const sec1 = document.createElement('div');
    sec1.className = 'doc-section';
    sec1.innerHTML = `<div class="doc-section-header"><span>Khái niệm then chốt</span><span class="time-mono">P.3 · 03:12</span></div>`;
    const sec1Body = document.createElement('div');
    sec1Body.className = 'doc-editable';
    sec1Body.contentEditable = 'true';
    sec1Body.spellcheck = false;
    sec1Body.textContent = state.draftB.main;
    sec1Body.addEventListener('input', () => {
      state.draftB.main = sec1Body.textContent;
      notifySave();
    });
    sec1.appendChild(sec1Body);
    docEditor.appendChild(sec1);

    // Section 2: Cần kiểm tra
    const sec2 = document.createElement('div');
    sec2.className = 'doc-section uncertain';
    sec2.innerHTML = `
      <div class="doc-section-header">
        <span>Cần kiểm tra</span>
        <span class="label-uncertain">Cần xác nhận</span>
        <span class="time-mono">P.3 · 05:40</span>
      </div>
    `;
    const sec2Body = document.createElement('div');
    sec2Body.className = 'doc-editable';
    sec2Body.contentEditable = 'true';
    sec2Body.spellcheck = false;
    sec2Body.textContent = state.draftB.uncertain;
    sec2Body.addEventListener('input', () => {
      state.draftB.uncertain = sec2Body.textContent;
      notifySave();
    });
    sec2.appendChild(sec2Body);

    const sec2Actions = document.createElement('div');
    sec2Actions.className = 'sec-action-row';
    const btnHint = document.createElement('button');
    btnHint.className = 'btn-text';
    btnHint.type = 'button';
    btnHint.textContent = state.showHintB ? 'Ẩn đối chiếu' : '💡 Xem đối chiếu nguồn gốc';
    btnHint.addEventListener('click', () => {
      state.showHintB = !state.showHintB;
      renderActionB();
    });
    sec2Actions.appendChild(btnHint);

    if (state.showHintB) {
      const hintText = document.createElement('span');
      hintText.className = 'hint-content';
      hintText.textContent = 'Slide 3: Luôn giữ Human Agency thay vì để AI tự quyết định hoàn toàn.';
      sec2Actions.appendChild(hintText);
    }
    sec2.appendChild(sec2Actions);
    docEditor.appendChild(sec2);

    // Section 3: Câu hỏi đào sâu
    const sec3 = document.createElement('div');
    sec3.className = 'doc-section';
    sec3.innerHTML = `<div class="doc-section-header"><span>Câu hỏi đào sâu</span><span class="time-mono">P.5 · 10:03</span></div>`;
    const sec3Body = document.createElement('div');
    sec3Body.className = 'doc-editable';
    sec3Body.contentEditable = 'true';
    sec3Body.spellcheck = false;
    sec3Body.textContent = state.draftB.question;
    sec3Body.addEventListener('input', () => {
      state.draftB.question = sec3Body.textContent;
      notifySave();
    });
    sec3.appendChild(sec3Body);
    docEditor.appendChild(sec3);

    frame2.appendChild(docEditor);

    // Quick AI Actions & Restore
    const quickActionsRow = document.createElement('div');
    quickActionsRow.className = 'quick-ai-actions-row';

    const btnShorten = document.createElement('button');
    btnShorten.className = 'btn-quick-ai';
    btnShorten.type = 'button';
    btnShorten.textContent = '⚡ Tóm tắt ngắn hơn';
    btnShorten.addEventListener('click', () => {
      state.draftB.main = 'Parallel Prototyping: 3 phương án đủ khác biệt. Duy trì Human-in-the-loop để người học giữ quyền kiểm soát tối cao.';
      renderActionB();
      showToast('Đã tóm tắt ngắn hơn');
    });

    const btnAddExample = document.createElement('button');
    btnAddExample.className = 'btn-quick-ai';
    btnAddExample.type = 'button';
    btnAddExample.textContent = '💡 Thêm ví dụ';
    btnAddExample.addEventListener('click', () => {
      state.draftB.main += ' (Ví dụ: So sánh 3 cách ghi chú: kéo thả thẻ, canvas 2 cột và bài tập trắc nghiệm).';
      renderActionB();
      showToast('Đã thêm ví dụ thực tế');
    });

    const btnRestore = document.createElement('button');
    btnRestore.className = 'btn-outline';
    btnRestore.type = 'button';
    btnRestore.textContent = '↺ Khôi phục nguyên văn';
    btnRestore.addEventListener('click', restoreOriginalB);

    quickActionsRow.appendChild(btnShorten);
    quickActionsRow.appendChild(btnAddExample);
    quickActionsRow.appendChild(btnRestore);
    frame2.appendChild(quickActionsRow);
    targetContainer.appendChild(frame2);

    // Save
    if (!isHybridMode) {
      const frame3 = document.createElement('div');
      frame3.className = 'step-card';
      frame3.innerHTML = `<div class="step-header">3. Lưu Study Pack</div>`;

      const nextActionBox = document.createElement('div');
      nextActionBox.className = 'next-action-box';

      if (!state.savedB) {
        const hintStatus = document.createElement('span');
        hintStatus.className = 'text-xs text-muted';
        hintStatus.textContent = 'Kiểm tra kỹ trước khi xác nhận lưu.';

        const btnSave = document.createElement('button');
        btnSave.className = 'btn-primary';
        btnSave.type = 'button';
        btnSave.textContent = 'Lưu Study Pack đồng biên tập';
        btnSave.addEventListener('click', () => {
          state.savedB = true;
          notifySave('Đã lưu Study Pack');
          renderActionB();
          showToast('Đã lưu bản Study Pack hoàn chỉnh');
        });

        nextActionBox.appendChild(hintStatus);
        nextActionBox.appendChild(btnSave);
      } else {
        const savedMsg = document.createElement('span');
        savedMsg.className = 'text-sm';
        savedMsg.textContent = 'Đã lưu Study Pack đồng biên tập.';

        const btnEditAgain = document.createElement('button');
        btnEditAgain.className = 'btn-outline';
        btnEditAgain.type = 'button';
        btnEditAgain.textContent = 'Chỉnh sửa lại';
        btnEditAgain.addEventListener('click', () => {
          state.savedB = false;
          renderActionB();
        });

        nextActionBox.appendChild(savedMsg);
        nextActionBox.appendChild(btnEditAgain);
      }

      frame3.appendChild(nextActionBox);
      targetContainer.appendChild(frame3);
    }
  }

  // --------------------------------------------------------------------------
  // OPTION C: ACTIVE RECALL & SMART QUIZ ENGINE (HIGH AI)
  // --------------------------------------------------------------------------
  function toggleFilterDrawerC() {
    state.showFilterDrawerC = !state.showFilterDrawerC;
    renderActionC();
  }

  function toggleFilterTraceC(id) {
    if (state.filterC.has(id)) {
      state.filterC.delete(id);
    } else {
      state.filterC.add(id);
    }
    notifySave();
    renderActionC();
  }

  function removeBlockC(blockId) {
    state.removedBlockIdsC.add(blockId);
    notifySave();
    renderActionC();
    showToast('Đã loại bỏ mục', 'Hoàn tác', () => {
      state.removedBlockIdsC.delete(blockId);
      notifySave();
      renderActionC();
      showToast('Đã khôi phục mục');
    });
  }

  function renderActionC(targetContainer = actionColumnEl, isHybridMode = false) {
    if (!targetContainer) return;
    if (!isHybridMode) targetContainer.innerHTML = '';

    const activeBlocks = Data.initialBlocksC.filter(b => !state.removedBlockIdsC.has(b.id));

    // Step 1: AI Proposal
    const frame1 = document.createElement('div');
    frame1.className = 'step-card';
    frame1.innerHTML = `
      <div class="step-header">
        <span>1. Đề xuất thông minh (Active Recall)</span>
        <span class="text-xs text-muted">${activeBlocks.length} mục</span>
      </div>
    `;

    const descRow = document.createElement('div');
    descRow.style.display = 'flex';
    descRow.style.alignItems = 'center';
    descRow.style.justifyContent = 'space-between';

    const statusText = document.createElement('span');
    statusText.className = 'text-xs text-muted';
    statusText.textContent = 'AI tự quét các điểm Chưa hiểu để tạo bài luyện.';

    const btnFilter = document.createElement('button');
    btnFilter.className = 'btn-text';
    btnFilter.type = 'button';
    btnFilter.textContent = state.showFilterDrawerC ? 'Đóng bộ lọc' : 'Thu hẹp dấu vết';
    btnFilter.addEventListener('click', toggleFilterDrawerC);

    descRow.appendChild(statusText);
    descRow.appendChild(btnFilter);
    frame1.appendChild(descRow);

    if (state.showFilterDrawerC) {
      const drawer = document.createElement('div');
      drawer.className = 'filter-drawer';

      Data.traces.forEach(trace => {
        const row = document.createElement('label');
        row.className = 'checklist-row';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'checklist-checkbox';
        cb.checked = state.filterC.has(trace.id);
        cb.addEventListener('change', () => toggleFilterTraceC(trace.id));

        const time = document.createElement('span');
        time.className = 'time-mono';
        time.textContent = `P.${trace.slide || 3} · ${trace.time}`;

        const text = document.createElement('span');
        text.textContent = trace.text;

        row.appendChild(cb);
        row.appendChild(time);
        row.appendChild(text);
        drawer.appendChild(row);
      });

      frame1.appendChild(drawer);
    }
    targetContainer.appendChild(frame1);

    // Step 2: Interactive Quiz Cards
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';
    frame2.innerHTML = `
      <div class="step-header">
        <span>2. Kiểm tra phản xạ kiến thức (Active Recall)</span>
        <span class="text-xs text-muted">Trắc nghiệm</span>
      </div>
    `;

    const blocksList = document.createElement('div');
    blocksList.className = 'blocks-list';

    activeBlocks.forEach(block => {
      const blockEl = document.createElement('div');
      blockEl.className = 'block-row-c';

      const metaRow = document.createElement('div');
      metaRow.className = 'block-meta-row';

      const leftMeta = document.createElement('div');
      leftMeta.className = 'block-meta-left';

      const typeLabel = document.createElement('span');
      typeLabel.className = 'block-type-label';
      typeLabel.textContent = block.type === 'note' ? 'Ghi chú' : (block.type === 'quiz-binary' ? 'Trắc nghiệm Đúng/Sai' : 'Câu hỏi mở');
      leftMeta.appendChild(typeLabel);

      if (block.isAi) {
        const aiBadge = document.createElement('span');
        aiBadge.className = 'label-ai';
        aiBadge.textContent = 'AI Sinh';
        leftMeta.appendChild(aiBadge);
      }

      if (block.isUncertain) {
        const uncBadge = document.createElement('span');
        uncBadge.className = 'label-uncertain';
        uncBadge.textContent = 'Từ điểm chưa hiểu';
        leftMeta.appendChild(uncBadge);
      }

      const timeMono = document.createElement('span');
      timeMono.className = 'time-mono';
      timeMono.textContent = `P.${block.slide || 3} · ${block.time}`;
      leftMeta.appendChild(timeMono);

      const btnRemove = document.createElement('button');
      btnRemove.className = 'btn-text';
      btnRemove.type = 'button';
      btnRemove.textContent = 'Bỏ';
      btnRemove.addEventListener('click', () => removeBlockC(block.id));

      metaRow.appendChild(leftMeta);
      metaRow.appendChild(btnRemove);
      blockEl.appendChild(metaRow);

      if (block.type === 'note') {
        const textEditable = document.createElement('div');
        textEditable.className = 'doc-editable';
        textEditable.contentEditable = 'true';
        textEditable.spellcheck = false;
        textEditable.textContent = state.blockTextsC[block.id] || block.text;
        textEditable.addEventListener('input', () => {
          state.blockTextsC[block.id] = textEditable.textContent;
          notifySave();
        });
        blockEl.appendChild(textEditable);

      } else if (block.type === 'quiz-binary') {
        const questionText = document.createElement('div');
        questionText.style.fontSize = '11px';
        questionText.style.fontWeight = '500';
        questionText.textContent = block.text;
        blockEl.appendChild(questionText);

        const quizBtnRow = document.createElement('div');
        quizBtnRow.className = 'quiz-buttons-row';

        const btnTrue = document.createElement('button');
        btnTrue.className = 'btn-outline';
        if (state.quizAnswerC === 'true') btnTrue.classList.add('selected');
        btnTrue.type = 'button';
        btnTrue.textContent = 'Đúng';
        btnTrue.addEventListener('click', () => {
          state.quizAnswerC = 'true';
          renderAction();
        });

        const btnFalse = document.createElement('button');
        btnFalse.className = 'btn-outline';
        if (state.quizAnswerC === 'false') btnFalse.classList.add('selected');
        btnFalse.type = 'button';
        btnFalse.textContent = 'Sai';
        btnFalse.addEventListener('click', () => {
          state.quizAnswerC = 'false';
          renderAction();
        });

        quizBtnRow.appendChild(btnTrue);
        quizBtnRow.appendChild(btnFalse);
        blockEl.appendChild(quizBtnRow);

        if (state.quizAnswerC) {
          const isCorrect = state.quizAnswerC === block.correctChoice;
          const feedback = document.createElement('div');
          feedback.className = `quiz-feedback ${isCorrect ? '' : 'wrong'}`;
          feedback.innerHTML = `<strong>${isCorrect ? '✓ Đáp án đúng!' : '✕ Chưa chính xác!'}</strong><br>${isCorrect ? block.explanationCorrect : block.explanationWrong}<br><span class="time-mono" style="margin-top:2px;display:inline-block;">(Slide ${block.slide} · ${block.time})</span>`;
          blockEl.appendChild(feedback);
        }

      } else if (block.type === 'quiz-open') {
        const questionText = document.createElement('div');
        questionText.style.fontSize = '11px';
        questionText.style.fontWeight = '500';
        questionText.textContent = block.text;
        blockEl.appendChild(questionText);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-text';
        toggleBtn.style.textAlign = 'left';
        toggleBtn.type = 'button';
        toggleBtn.textContent = state.openQuizAnswerVisibleC ? 'Ẩn lời giải' : '👁 Xem đáp án & giải thích';
        toggleBtn.addEventListener('click', () => {
          state.openQuizAnswerVisibleC = !state.openQuizAnswerVisibleC;
          renderAction();
        });
        blockEl.appendChild(toggleBtn);

        if (state.openQuizAnswerVisibleC) {
          const answerBox = document.createElement('div');
          answerBox.className = 'answer-drawer';
          answerBox.textContent = block.answer;
          blockEl.appendChild(answerBox);
        }
      }

      blocksList.appendChild(blockEl);
    });

    frame2.appendChild(blocksList);
    targetContainer.appendChild(frame2);

    // Save
    if (!isHybridMode) {
      const frame3 = document.createElement('div');
      frame3.className = 'step-card';
      frame3.innerHTML = `<div class="step-header">3. Lưu Flashcards</div>`;

      const nextActionBox = document.createElement('div');
      nextActionBox.className = 'next-action-box';

      if (!state.savedC) {
        const btnResetC = document.createElement('button');
        btnResetC.className = 'btn-text';
        btnResetC.type = 'button';
        btnResetC.textContent = 'Khôi phục';
        btnResetC.addEventListener('click', () => {
          state.removedBlockIdsC.clear();
          state.quizAnswerC = null;
          state.openQuizAnswerVisibleC = false;
          renderActionC();
          showToast('Đã khôi phục các mục');
        });

        const btnSave = document.createElement('button');
        btnSave.className = 'btn-primary';
        btnSave.type = 'button';
        btnSave.textContent = `Lưu Flashcards (${activeBlocks.length})`;
        btnSave.disabled = activeBlocks.length === 0;
        btnSave.addEventListener('click', () => {
          state.savedC = true;
          notifySave('Đã lưu Flashcards');
          renderActionC();
          showToast('Đã lưu bộ câu hỏi Active Recall');
        });

        nextActionBox.appendChild(btnResetC);
        nextActionBox.appendChild(btnSave);
      } else {
        const savedMsg = document.createElement('span');
        savedMsg.className = 'text-sm';
        savedMsg.textContent = `Đã lưu Study Pack gồm ${activeBlocks.length} mục.`;

        const btnResetC = document.createElement('button');
        btnResetC.className = 'btn-outline';
        btnResetC.type = 'button';
        btnResetC.textContent = 'Làm lại';
        btnResetC.addEventListener('click', () => {
          state.savedC = false;
          renderActionC();
        });

        nextActionBox.appendChild(savedMsg);
        nextActionBox.appendChild(btnResetC);
      }

      frame3.appendChild(nextActionBox);
      targetContainer.appendChild(frame3);
    }
  }

  // --------------------------------------------------------------------------
  // HYBRID MODE (OPTION B + OPTION C)
  // --------------------------------------------------------------------------
  function renderActionHybrid() {
    if (!actionColumnEl) return;
    actionColumnEl.innerHTML = '';

    renderActionB(actionColumnEl, true);

    const divider = document.createElement('div');
    divider.className = 'hybrid-divider-banner';
    divider.innerHTML = `
      <div>
        <div class="hybrid-divider-title">✨ Module Củng Cố: Active Recall Engine</div>
        <div class="hybrid-divider-desc">AI tự động tạo câu hỏi phản xạ 3 phút từ các điểm vướng mắc ở bản nháp trên.</div>
      </div>
    `;
    actionColumnEl.appendChild(divider);

    renderActionC(actionColumnEl, true);

    const frameSave = document.createElement('div');
    frameSave.className = 'step-card';
    frameSave.innerHTML = `
      <div class="step-header">Lưu Toàn Bộ Study Pack Lai Ghép (Hybrid B+C)</div>
      <div class="next-action-box">
        <span class="text-xs text-muted">Bao gồm bản ghi chép 2 cột + bộ câu hỏi Active Recall.</span>
        <button class="btn-primary" id="btnSaveHybridAll" type="button">Lưu Toàn Bộ Study Pack</button>
      </div>
    `;
    const btnSaveHybridAll = frameSave.querySelector('#btnSaveHybridAll');
    if (btnSaveHybridAll) {
      btnSaveHybridAll.addEventListener('click', () => {
        notifySave('Đã lưu Study Pack Hybrid');
        showToast('Đã lưu toàn bộ Study Pack (Bản nháp 2 cột + Flashcards)');
      });
    }
    actionColumnEl.appendChild(frameSave);
  }

  function renderAction() {
    if (state.option === 'a') renderActionA();
    else if (state.option === 'b') renderActionB();
    else if (state.option === 'c') renderActionC();
    else if (state.option === 'hybrid') renderActionHybrid();
  }

  // --------------------------------------------------------------------------
  // RESET STATE
  // --------------------------------------------------------------------------
  if (btnResetEl) {
    btnResetEl.addEventListener('click', () => {
      state.buckets = { main: [], unclear: [], review: [] };
      state.selectedB = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      state.draftB = { ...Data.initialDraftB };
      state.removedBlockIdsC.clear();
      state.quizAnswerC = null;
      state.openQuizAnswerVisibleC = false;
      state.savedA = false;
      state.savedB = false;
      state.savedC = false;
      renderTraces();
      renderAction();
      showToast('Đã đặt lại dữ liệu thử nghiệm');
    });
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    renderSlide(3);
    setPrototypeOption(state.option);
    switchRightTab('aiNotes');
  }

  init();

})();
