// AI Notes Lab - Core Application Engine
// Minimalist, flat, monochrome, single source of truth

(function () {
  'use strict';

  const Data = window.NotesLabData;
  if (!Data) {
    console.error('NotesLabData not found');
    return;
  }

  // --------------------------------------------------------------------------
  // APPLICATION STATE (SINGLE SOURCE OF TRUTH)
  // --------------------------------------------------------------------------
  const state = {
    option: 'a', // 'a' | 'b' | 'c'
    theme: 'light',
    step: 0,

    // Option A: User classifies, AI on request
    buckets: {
      main: [],
      unclear: [],
      review: []
    },
    historyA: [],
    cardTextsA: {},
    highlightDupsA: false,
    selectedUnassignedId: null,
    savedA: false,

    // Option B: Co-create dual-pane
    selectedB: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    isGeneratingB: false,
    draftB: { ...Data.initialDraftB },
    previousDraftB: null,
    showHintB: false,
    savedB: false,

    // Option C: AI autonomous proposal & active recall
    filterC: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    showFilterDrawerC: false,
    removedBlockIdsC: new Set(),
    blockTextsC: {},
    quizAnswerC: null, // 'true' | 'false' | null
    openQuizAnswerVisibleC: false,
    savedC: false,

    // Facilitator mode
    facilitatorMode: false
  };

  // Read URL params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('facilitator') === '1') {
    state.facilitatorMode = true;
    document.body.classList.add('facilitator-active');
  }

  const themeParam = urlParams.get('theme');
  if (themeParam === 'dark') {
    state.theme = 'dark';
    document.documentElement.dataset.theme = 'dark';
  } else {
    state.theme = 'light';
    document.documentElement.dataset.theme = 'light';
  }

  if (urlParams.get('dup') === '1') {
    state.highlightDupsA = true;
  }

  const pageOptionAttr = document.body.dataset.option;
  if (pageOptionAttr && ['a', 'b', 'c'].includes(pageOptionAttr)) {
    state.option = pageOptionAttr;
  } else if (urlParams.get('option') && ['a', 'b', 'c'].includes(urlParams.get('option'))) {
    state.option = urlParams.get('option');
  }

  // --------------------------------------------------------------------------
  // DOM REFERENCES
  // --------------------------------------------------------------------------
  const saveStatusEl = document.querySelector('#saveStatus');
  const btnThemeToggleEl = document.querySelector('#btnThemeToggle');
  const btnResetEl = document.querySelector('#btnReset');
  const btnFacilitatorEl = document.querySelector('#btnFacilitator');
  const facilitatorPanelEl = document.querySelector('#facilitatorPanel');
  const toastEl = document.querySelector('#toast');

  const directNoteFormEl = document.querySelector('#directNoteForm');
  const directNoteInputEl = document.querySelector('#directNoteInput');
  const traceCountEl = document.querySelector('#traceCount');
  const sourceListEl = document.querySelector('#sourceList');
  const actionColumnEl = document.querySelector('#actionColumn');

  // --------------------------------------------------------------------------
  // AUTOSAVE & TOAST
  // --------------------------------------------------------------------------
  let saveTimer = null;
  let fadeTimer = null;

  function notifySave() {
    if (!saveStatusEl) return;
    clearTimeout(saveTimer);
    clearTimeout(fadeTimer);
    saveStatusEl.textContent = 'Đang lưu';
    saveStatusEl.classList.remove('faded');

    saveTimer = setTimeout(() => {
      saveStatusEl.textContent = 'Đã lưu';
      fadeTimer = setTimeout(() => {
        saveStatusEl.classList.add('faded');
      }, 1500);
    }, 400);
  }

  let toastTimer = null;
  function showToast(message, actionLabel, onAction, duration = 2500) {
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
  // THEME MANAGEMENT (LIGHT / DARK TOGGLE)
  // --------------------------------------------------------------------------
  function updateThemeButton() {
    if (!btnThemeToggleEl) return;
    const currentTheme = document.documentElement.dataset.theme;
    btnThemeToggleEl.textContent = currentTheme === 'dark' ? 'Sáng' : 'Tối';
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    state.theme = nextTheme;
    updateThemeButton();
    notifySave();
  }

  if (btnThemeToggleEl) {
    btnThemeToggleEl.addEventListener('click', toggleTheme);
    updateThemeButton();
  }

  // --------------------------------------------------------------------------
  // DIRECT USER NOTE INPUT
  // --------------------------------------------------------------------------
  if (directNoteFormEl && directNoteInputEl) {
    directNoteFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = directNoteInputEl.value.trim();
      if (!val) return;

      const newId = Date.now();
      const newTrace = {
        id: newId,
        time: '13:00',
        text: val,
        isUserCreated: true
      };

      Data.traces.push(newTrace);
      if (state.selectedB) state.selectedB.add(newId);
      if (state.filterC) state.filterC.add(newId);

      directNoteInputEl.value = '';
      updateTraceCount();
      renderLeftColumn();
      notifySave();
      showToast('Đã lưu ghi chú');
    });
  }

  function updateTraceCount() {
    if (traceCountEl) {
      traceCountEl.textContent = String(Data.traces.length);
    }
  }

  // --------------------------------------------------------------------------
  // LEFT COLUMN (MOCK SLIDE + DIRECT NOTE + TRACES)
  // --------------------------------------------------------------------------
  function renderLeftColumn() {
    if (!sourceListEl) return;
    sourceListEl.innerHTML = '';
    updateTraceCount();

    // In Option A, identify assigned traces
    const assignedIdsA = [
      ...state.buckets.main,
      ...state.buckets.unclear,
      ...state.buckets.review
    ];

    Data.traces.forEach((trace) => {
      const item = document.createElement('div');
      item.className = 'source-item';
      item.id = `source-item-${trace.id}`;
      item.tabIndex = 0;

      const isAssignedA = state.option === 'a' && assignedIdsA.includes(trace.id);
      if (isAssignedA) {
        item.classList.add('assigned');
      }

      // Drag and drop for Option A
      if (state.option === 'a') {
        item.draggable = true;
        item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', String(trace.id));
        });

        if (state.selectedUnassignedId === trace.id) {
          item.classList.add('selected');
        }

        item.addEventListener('click', () => {
          state.selectedUnassignedId = trace.id;
          document.querySelectorAll('.source-item').forEach(el => el.classList.remove('selected'));
          item.classList.add('selected');
        });
      }

      const contentBox = document.createElement('div');
      contentBox.className = 'source-item-content';

      const timeSpan = document.createElement('span');
      timeSpan.className = 'time-mono interactive';
      timeSpan.textContent = trace.time;
      timeSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(trace.time + ' · ' + trace.text.slice(0, 32) + '...');
      });

      const textSpan = document.createElement('span');
      textSpan.textContent = trace.text;

      contentBox.appendChild(timeSpan);
      contentBox.appendChild(textSpan);
      item.appendChild(contentBox);

      // Inline column selector buttons for Option A
      if (state.option === 'a' && !isAssignedA) {
        const selector = document.createElement('div');
        selector.className = 'column-selector-inline';

        const cols = [
          { key: 'main', label: 'Ý chính' },
          { key: 'unclear', label: 'Chưa hiểu' },
          { key: 'review', label: 'Xem lại' }
        ];

        cols.forEach(col => {
          const btn = document.createElement('button');
          btn.className = 'btn-text';
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
  // OPTION A: LOGIC & RENDERING
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
    // Remove from existing bucket if any
    Object.keys(state.buckets).forEach(key => {
      state.buckets[key] = state.buckets[key].filter(id => id !== cardId);
    });
    // Add to target bucket
    state.buckets[targetBucketKey].push(cardId);
    state.selectedUnassignedId = null;
    notifySave();
    renderLeftColumn();
    renderActionA();
  }

  function unassignCard(cardId) {
    recordHistoryA();
    Object.keys(state.buckets).forEach(key => {
      state.buckets[key] = state.buckets[key].filter(id => id !== cardId);
    });
    notifySave();
    renderLeftColumn();
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
    renderLeftColumn();
    renderActionA();
    showToast('Đã hoàn tác');
  }

  function checkDuplicatesA() {
    state.highlightDupsA = !state.highlightDupsA;
    notifySave();
    renderActionA();
    if (state.highlightDupsA) {
      showToast('Đã phát hiện 2 thẻ trùng nội dung');
    } else {
      showToast('Đã xóa đánh dấu trùng');
    }
  }

  function renderActionA() {
    if (!actionColumnEl) return;
    actionColumnEl.innerHTML = '';

    const totalAssigned = state.buckets.main.length + state.buckets.unclear.length + state.buckets.review.length;

    // FRAME 1: 1. Xếp thẻ vào nhóm
    const frame1 = document.createElement('div');
    frame1.className = 'step-card';

    const header1 = document.createElement('div');
    header1.className = 'step-header';
    const title1 = document.createElement('span');
    title1.textContent = '1. Xếp thẻ vào nhóm';
    const sub1 = document.createElement('span');
    sub1.className = 'text-sm text-muted';
    sub1.textContent = totalAssigned + ' thẻ';
    header1.appendChild(title1);
    header1.appendChild(sub1);
    frame1.appendChild(header1);

    const guide1 = document.createElement('div');
    guide1.className = 'step-guide';
    guide1.textContent = 'Kéo dấu vết từ cột trái vào 3 nhóm bên dưới.';
    frame1.appendChild(guide1);

    const columnsGrid = document.createElement('div');
    columnsGrid.className = 'board-columns-grid';

    const colConfigs = [
      { key: 'main', label: 'Ý chính' },
      { key: 'unclear', label: 'Chưa hiểu' },
      { key: 'review', label: 'Xem lại' }
    ];

    colConfigs.forEach(col => {
      const colEl = document.createElement('div');
      colEl.className = 'board-column';
      colEl.dataset.bucket = col.key;

      // Drag and drop listeners
      colEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        colEl.classList.add('drag-over');
      });
      colEl.addEventListener('dragleave', () => {
        colEl.classList.remove('drag-over');
      });
      colEl.addEventListener('drop', (e) => {
        e.preventDefault();
        colEl.classList.remove('drag-over');
        const cardId = Number(e.dataTransfer.getData('text/plain'));
        if (cardId) {
          assignCardToBucket(cardId, col.key);
        }
      });

      const colHeader = document.createElement('div');
      colHeader.className = 'board-column-header';
      const colTitle = document.createElement('span');
      colTitle.textContent = col.label;
      const colCount = document.createElement('span');
      colCount.className = 'count';
      colCount.textContent = String(state.buckets[col.key].length);
      colHeader.appendChild(colTitle);
      colHeader.appendChild(colCount);
      colEl.appendChild(colHeader);

      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'board-column-cards';

      state.buckets[col.key].forEach(cardId => {
        const trace = Data.traces.find(t => t.id === cardId);
        if (!trace) return;

        const card = document.createElement('div');
        card.className = 'card-item';
        card.draggable = true;
        card.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', String(cardId));
        });

        // Duplicate check logic (#4 and #5)
        const isDuplicate = state.highlightDupsA && (cardId === 4 || cardId === 5);
        if (isDuplicate) {
          card.classList.add('duplicate');
        }

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

        const leftFooter = document.createElement('div');
        leftFooter.className = 'card-footer-left';

        const time = document.createElement('span');
        time.className = 'time-mono';
        time.textContent = trace.time;
        leftFooter.appendChild(time);

        if (isDuplicate) {
          const dupLabel = document.createElement('span');
          dupLabel.className = 'label-uncertain';
          dupLabel.textContent = 'Trùng nội dung';
          leftFooter.appendChild(dupLabel);
        }

        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-text';
        btnRemove.type = 'button';
        btnRemove.textContent = 'Bỏ';
        btnRemove.addEventListener('click', () => {
          unassignCard(cardId);
        });

        footer.appendChild(leftFooter);
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

    // FRAME 2: 2. Hỗ trợ tra cứu & kiểm tra
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';

    const header2 = document.createElement('div');
    header2.className = 'step-header';
    const title2 = document.createElement('span');
    title2.textContent = '2. Hỗ trợ tra cứu & kiểm tra';
    header2.appendChild(title2);
    frame2.appendChild(header2);

    const toolsRow = document.createElement('div');
    toolsRow.className = 'frame-tools-row';

    const btnCheckDup = document.createElement('button');
    btnCheckDup.className = 'btn-outline';
    btnCheckDup.type = 'button';
    btnCheckDup.textContent = state.highlightDupsA ? 'Tắt kiểm tra trùng' : 'Kiểm tra trùng';
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

    // FRAME 3: 3. Bước tiếp theo
    const frame3 = document.createElement('div');
    frame3.className = 'step-card';

    const header3 = document.createElement('div');
    header3.className = 'step-header';
    const title3 = document.createElement('span');
    title3.textContent = '3. Bước tiếp theo';
    header3.appendChild(title3);
    frame3.appendChild(header3);

    const nextActionBox = document.createElement('div');
    nextActionBox.className = 'next-action-box';

    if (!state.savedA) {
      const hintStatus = document.createElement('span');
      hintStatus.className = 'text-sm text-muted';
      hintStatus.textContent = totalAssigned >= 2
        ? 'Sẵn sàng lưu vào Study Pack.'
        : 'Xếp ít nhất 2 thẻ để tiếp tục.';

      const btnSave = document.createElement('button');
      btnSave.className = 'btn-primary';
      btnSave.type = 'button';
      btnSave.textContent = 'Lưu Study Pack';
      btnSave.disabled = totalAssigned < 2;
      btnSave.addEventListener('click', () => {
        state.savedA = true;
        notifySave();
        renderActionA();
        showToast('Đã lưu Study Pack');
      });

      nextActionBox.appendChild(hintStatus);
      nextActionBox.appendChild(btnSave);
    } else {
      const savedMsg = document.createElement('span');
      savedMsg.className = 'text-sm';
      savedMsg.textContent = 'Đã lưu ' + totalAssigned + ' thẻ vào Study Pack.';

      const rightLinks = document.createElement('div');
      rightLinks.className = 'next-action-links';

      const btnResetA = document.createElement('button');
      btnResetA.className = 'btn-outline';
      btnResetA.type = 'button';
      btnResetA.textContent = 'Làm lại';
      btnResetA.addEventListener('click', () => {
        state.savedA = false;
        renderActionA();
      });

      const linkToB = document.createElement('a');
      linkToB.className = 'btn-text';
      linkToB.href = 'option-b.html';
      linkToB.textContent = 'Chuyển sang B';

      rightLinks.appendChild(btnResetA);
      rightLinks.appendChild(linkToB);

      nextActionBox.appendChild(savedMsg);
      nextActionBox.appendChild(rightLinks);
    }

    frame3.appendChild(nextActionBox);
    actionColumnEl.appendChild(frame3);
  }

  // --------------------------------------------------------------------------
  // OPTION B: LOGIC & RENDERING
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
      notifySave();
      renderActionB();
      showToast('Đã tạo bản nháp');
    }, 450);
  }

  function restoreOriginalB() {
    state.previousDraftB = { ...state.draftB };
    state.draftB = { ...Data.originalDraftB };
    notifySave();
    renderActionB();
    showToast('Đã khôi phục nguyên văn', 'Hoàn tác', () => {
      if (state.previousDraftB) {
        state.draftB = { ...state.previousDraftB };
        notifySave();
        renderActionB();
        showToast('Đã hoàn tác khôi phục');
      }
    }, 5000);
  }

  function renderActionB() {
    if (!actionColumnEl) return;
    actionColumnEl.innerHTML = '';

    // FRAME 1: 1. Chọn dấu vết gửi AI
    const frame1 = document.createElement('div');
    frame1.className = 'step-card';

    const header1 = document.createElement('div');
    header1.className = 'step-header';
    const title1 = document.createElement('span');
    title1.textContent = '1. Chọn dấu vết gửi AI';
    const count1 = document.createElement('span');
    count1.className = 'text-sm text-muted';
    count1.textContent = state.selectedB.size + ' / ' + Data.traces.length;
    header1.appendChild(title1);
    header1.appendChild(count1);
    frame1.appendChild(header1);

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
      time.textContent = trace.time;

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
    btnGenerate.textContent = state.isGeneratingB ? 'Đang tạo...' : `Tạo bản nháp (${state.selectedB.size})`;
    btnGenerate.addEventListener('click', generateDraftB);

    frame1Actions.appendChild(leftSelBtns);
    frame1Actions.appendChild(btnGenerate);
    frame1.appendChild(frame1Actions);

    actionColumnEl.appendChild(frame1);

    // FRAME 2: 2. Đồng biên tập cùng AI
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';

    const header2 = document.createElement('div');
    header2.className = 'step-header';
    const title2 = document.createElement('span');
    title2.textContent = '2. Đồng biên tập cùng AI';
    header2.appendChild(title2);
    frame2.appendChild(header2);

    const docEditor = document.createElement('div');
    docEditor.className = 'doc-editor';

    // Section 1: Khái niệm
    const sec1 = document.createElement('div');
    sec1.className = 'doc-section';

    const sec1Header = document.createElement('div');
    sec1Header.className = 'doc-section-header';
    const sec1Title = document.createElement('span');
    sec1Title.textContent = 'Khái niệm';
    const sec1Time = document.createElement('span');
    sec1Time.className = 'time-mono';
    sec1Time.textContent = '03:12';
    sec1Header.appendChild(sec1Title);
    sec1Header.appendChild(sec1Time);

    const sec1Body = document.createElement('div');
    sec1Body.className = 'doc-editable';
    sec1Body.contentEditable = 'true';
    sec1Body.spellcheck = false;
    sec1Body.textContent = state.draftB.main;
    sec1Body.addEventListener('input', () => {
      state.draftB.main = sec1Body.textContent;
      notifySave();
    });

    sec1.appendChild(sec1Header);
    sec1.appendChild(sec1Body);
    docEditor.appendChild(sec1);

    // Section 2: Cần kiểm tra (Uncertainty flag)
    const sec2 = document.createElement('div');
    sec2.className = 'doc-section uncertain';

    const sec2Header = document.createElement('div');
    sec2Header.className = 'doc-section-header';
    const sec2Title = document.createElement('span');
    sec2Title.textContent = 'Cần kiểm tra';
    const sec2Label = document.createElement('span');
    sec2Label.className = 'label-uncertain';
    sec2Label.textContent = 'Chưa chắc';
    const sec2Time = document.createElement('span');
    sec2Time.className = 'time-mono';
    sec2Time.textContent = '05:40';
    sec2Header.appendChild(sec2Title);
    sec2Header.appendChild(sec2Label);
    sec2Header.appendChild(sec2Time);

    const sec2Body = document.createElement('div');
    sec2Body.className = 'doc-editable';
    sec2Body.contentEditable = 'true';
    sec2Body.spellcheck = false;
    sec2Body.textContent = state.draftB.uncertain;
    sec2Body.addEventListener('input', () => {
      state.draftB.uncertain = sec2Body.textContent;
      notifySave();
    });

    const sec2Actions = document.createElement('div');
    sec2Actions.className = 'sec-action-row';

    const btnHint = document.createElement('button');
    btnHint.className = 'btn-text';
    btnHint.type = 'button';
    btnHint.textContent = state.showHintB ? 'Ẩn gợi ý' : 'Gợi ý';
    btnHint.addEventListener('click', () => {
      state.showHintB = !state.showHintB;
      renderActionB();
    });

    sec2Actions.appendChild(btnHint);

    if (state.showHintB) {
      const hintText = document.createElement('span');
      hintText.className = 'hint-content';
      hintText.textContent = 'Nên bổ sung điều kiện miền dữ liệu áp dụng.';
      sec2Actions.appendChild(hintText);
    }

    sec2.appendChild(sec2Header);
    sec2.appendChild(sec2Body);
    sec2.appendChild(sec2Actions);
    docEditor.appendChild(sec2);

    // Section 3: Câu hỏi
    const sec3 = document.createElement('div');
    sec3.className = 'doc-section';

    const sec3Header = document.createElement('div');
    sec3Header.className = 'doc-section-header';
    const sec3Title = document.createElement('span');
    sec3Title.textContent = 'Câu hỏi';
    const sec3Time = document.createElement('span');
    sec3Time.className = 'time-mono';
    sec3Time.textContent = '10:03';
    sec3Header.appendChild(sec3Title);
    sec3Header.appendChild(sec3Time);

    const sec3Body = document.createElement('div');
    sec3Body.className = 'doc-editable';
    sec3Body.contentEditable = 'true';
    sec3Body.spellcheck = false;
    sec3Body.textContent = state.draftB.question;
    sec3Body.addEventListener('input', () => {
      state.draftB.question = sec3Body.textContent;
      notifySave();
    });

    sec3.appendChild(sec3Header);
    sec3.appendChild(sec3Body);
    docEditor.appendChild(sec3);

    frame2.appendChild(docEditor);

    // Frame 2 Footer: Restore original
    const frame2Footer = document.createElement('div');
    frame2Footer.className = 'frame-footer-row';

    const btnRestore = document.createElement('button');
    btnRestore.className = 'btn-outline';
    btnRestore.type = 'button';
    btnRestore.textContent = 'Khôi phục nguyên văn';
    btnRestore.addEventListener('click', restoreOriginalB);

    frame2Footer.appendChild(btnRestore);
    frame2.appendChild(frame2Footer);

    actionColumnEl.appendChild(frame2);

    // FRAME 3: 3. Bước tiếp theo
    const frame3 = document.createElement('div');
    frame3.className = 'step-card';

    const header3 = document.createElement('div');
    header3.className = 'step-header';
    const title3 = document.createElement('span');
    title3.textContent = '3. Bước tiếp theo';
    header3.appendChild(title3);
    frame3.appendChild(header3);

    const nextActionBox = document.createElement('div');
    nextActionBox.className = 'next-action-box';

    if (!state.savedB) {
      const hintStatus = document.createElement('span');
      hintStatus.className = 'text-sm text-muted';
      hintStatus.textContent = 'Kiểm tra nội dung trước khi lưu Study Pack.';

      const btnSave = document.createElement('button');
      btnSave.className = 'btn-primary';
      btnSave.type = 'button';
      btnSave.textContent = 'Lưu Study Pack';
      btnSave.addEventListener('click', () => {
        state.savedB = true;
        notifySave();
        renderActionB();
        showToast('Đã lưu Study Pack');
      });

      nextActionBox.appendChild(hintStatus);
      nextActionBox.appendChild(btnSave);
    } else {
      const savedMsg = document.createElement('span');
      savedMsg.className = 'text-sm';
      savedMsg.textContent = 'Đã lưu Study Pack đồng biên tập.';

      const rightLinks = document.createElement('div');
      rightLinks.className = 'next-action-links';

      const btnEditAgain = document.createElement('button');
      btnEditAgain.className = 'btn-outline';
      btnEditAgain.type = 'button';
      btnEditAgain.textContent = 'Sửa lại';
      btnEditAgain.addEventListener('click', () => {
        state.savedB = false;
        renderActionB();
      });

      const linkToC = document.createElement('a');
      linkToC.className = 'btn-text';
      linkToC.href = 'option-c.html';
      linkToC.textContent = 'Chuyển sang C';

      rightLinks.appendChild(btnEditAgain);
      rightLinks.appendChild(linkToC);

      nextActionBox.appendChild(savedMsg);
      nextActionBox.appendChild(rightLinks);
    }

    frame3.appendChild(nextActionBox);
    actionColumnEl.appendChild(frame3);
  }

  // --------------------------------------------------------------------------
  // OPTION C: LOGIC & RENDERING
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
    showToast('Đã bỏ mục', 'Hoàn tác', () => {
      state.removedBlockIdsC.delete(blockId);
      notifySave();
      renderActionC();
      showToast('Đã khôi phục mục');
    });
  }

  function renderActionC() {
    if (!actionColumnEl) return;
    actionColumnEl.innerHTML = '';

    const activeBlocks = Data.initialBlocksC.filter(b => !state.removedBlockIdsC.has(b.id));

    // FRAME 1: 1. Đề xuất từ AI
    const frame1 = document.createElement('div');
    frame1.className = 'step-card';

    const header1 = document.createElement('div');
    header1.className = 'step-header';
    const title1 = document.createElement('span');
    title1.textContent = '1. Đề xuất từ AI';
    header1.appendChild(title1);
    frame1.appendChild(header1);

    const descRow = document.createElement('div');
    descRow.className = 'frame-desc-row';

    const statusText = document.createElement('span');
    statusText.className = 'text-sm text-muted';
    statusText.textContent = 'Đã tạo Study Pack từ 9 dấu vết Bài 14.';

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
        time.textContent = trace.time;

        const text = document.createElement('span');
        text.textContent = trace.text;

        row.appendChild(cb);
        row.appendChild(time);
        row.appendChild(text);
        drawer.appendChild(row);
      });

      frame1.appendChild(drawer);
    }

    actionColumnEl.appendChild(frame1);

    // FRAME 2: 2. Duyệt & Trắc nghiệm phản xạ
    const frame2 = document.createElement('div');
    frame2.className = 'step-card';

    const header2 = document.createElement('div');
    header2.className = 'step-header';
    const title2 = document.createElement('span');
    title2.textContent = '2. Duyệt & Trắc nghiệm phản xạ';
    const count2 = document.createElement('span');
    count2.className = 'text-sm text-muted';
    count2.textContent = activeBlocks.length + ' mục';
    header2.appendChild(title2);
    header2.appendChild(count2);
    frame2.appendChild(header2);

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
      typeLabel.textContent = block.type === 'note' ? 'Ghi chú' : (block.type === 'quiz-binary' ? 'Trắc nghiệm' : 'Câu hỏi');
      leftMeta.appendChild(typeLabel);

      if (block.isAi) {
        const aiBadge = document.createElement('span');
        aiBadge.className = 'label-ai';
        aiBadge.textContent = 'AI';
        leftMeta.appendChild(aiBadge);
      }

      if (block.isUncertain) {
        const uncBadge = document.createElement('span');
        uncBadge.className = 'label-uncertain';
        uncBadge.textContent = 'Cần kiểm tra';
        leftMeta.appendChild(uncBadge);
      }

      const timeMono = document.createElement('span');
      timeMono.className = 'time-mono';
      timeMono.textContent = block.time;
      leftMeta.appendChild(timeMono);

      const btnRemove = document.createElement('button');
      btnRemove.className = 'btn-text';
      btnRemove.type = 'button';
      btnRemove.textContent = 'Bỏ';
      btnRemove.addEventListener('click', () => removeBlockC(block.id));

      metaRow.appendChild(leftMeta);
      metaRow.appendChild(btnRemove);
      blockEl.appendChild(metaRow);

      // Block content
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
        questionText.className = 'text-base';
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
          renderActionC();
        });

        const btnFalse = document.createElement('button');
        btnFalse.className = 'btn-outline';
        if (state.quizAnswerC === 'false') btnFalse.classList.add('selected');
        btnFalse.type = 'button';
        btnFalse.textContent = 'Sai';
        btnFalse.addEventListener('click', () => {
          state.quizAnswerC = 'false';
          renderActionC();
        });

        quizBtnRow.appendChild(btnTrue);
        quizBtnRow.appendChild(btnFalse);
        blockEl.appendChild(quizBtnRow);

        if (state.quizAnswerC) {
          const feedback = document.createElement('div');
          feedback.className = 'quiz-feedback';
          feedback.textContent = state.quizAnswerC === 'true'
            ? block.explanationCorrect
            : block.explanationWrong;
          blockEl.appendChild(feedback);
        }
      } else if (block.type === 'quiz-open') {
        const questionText = document.createElement('div');
        questionText.className = 'text-base';
        questionText.textContent = block.text;
        blockEl.appendChild(questionText);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-text btn-align-start';
        toggleBtn.type = 'button';
        toggleBtn.textContent = state.openQuizAnswerVisibleC ? 'Ẩn đáp án' : 'Xem đáp án';
        toggleBtn.addEventListener('click', () => {
          state.openQuizAnswerVisibleC = !state.openQuizAnswerVisibleC;
          renderActionC();
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
    actionColumnEl.appendChild(frame2);

    // FRAME 3: 3. Bước tiếp theo
    const frame3 = document.createElement('div');
    frame3.className = 'step-card';

    const header3 = document.createElement('div');
    header3.className = 'step-header';
    const title3 = document.createElement('span');
    title3.textContent = '3. Bước tiếp theo';
    header3.appendChild(title3);
    frame3.appendChild(header3);

    const nextActionBox = document.createElement('div');
    nextActionBox.className = 'next-action-box';

    if (!state.savedC) {
      const btnResetC = document.createElement('button');
      btnResetC.className = 'btn-text';
      btnResetC.type = 'button';
      btnResetC.textContent = 'Hủy';
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
      btnSave.textContent = `Lưu Study Pack (${activeBlocks.length})`;
      btnSave.disabled = activeBlocks.length === 0;
      btnSave.addEventListener('click', () => {
        state.savedC = true;
        notifySave();
        renderActionC();
        showToast('Đã lưu Study Pack');
      });

      nextActionBox.appendChild(btnResetC);
      nextActionBox.appendChild(btnSave);
    } else {
      const savedMsg = document.createElement('span');
      savedMsg.className = 'text-sm';
      savedMsg.textContent = 'Đã lưu Study Pack gồm ' + activeBlocks.length + ' mục.';

      const rightLinks = document.createElement('div');
      rightLinks.className = 'next-action-links';

      const btnResetC = document.createElement('button');
      btnResetC.className = 'btn-outline';
      btnResetC.type = 'button';
      btnResetC.textContent = 'Làm lại';
      btnResetC.addEventListener('click', () => {
        state.savedC = false;
        renderActionC();
      });

      const linkToA = document.createElement('a');
      linkToA.className = 'btn-text';
      linkToA.href = 'option-a.html';
      linkToA.textContent = 'Chuyển sang A';

      rightLinks.appendChild(btnResetC);
      rightLinks.appendChild(linkToA);

      nextActionBox.appendChild(savedMsg);
      nextActionBox.appendChild(rightLinks);
    }

    frame3.appendChild(nextActionBox);
    actionColumnEl.appendChild(frame3);
  }

  // --------------------------------------------------------------------------
  // FACILITATOR ANNOTATION
  // --------------------------------------------------------------------------
  function renderFacilitator() {
    if (!facilitatorPanelEl) return;
    const meta = Data.facilitator[state.option];
    if (!meta) return;

    facilitatorPanelEl.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'facilitator-title';
    header.textContent = meta.title + ' · ' + meta.mechanism;

    const rowExpect = document.createElement('div');
    rowExpect.textContent = 'Kỳ vọng: ' + meta.expect;

    const rowWatch = document.createElement('div');
    rowWatch.textContent = 'Quan sát: ' + meta.watch;

    const rowDont = document.createElement('div');
    rowDont.textContent = 'Cấm làm: ' + meta.dont;

    facilitatorPanelEl.appendChild(header);
    facilitatorPanelEl.appendChild(rowExpect);
    facilitatorPanelEl.appendChild(rowWatch);
    facilitatorPanelEl.appendChild(rowDont);
  }

  if (btnFacilitatorEl) {
    btnFacilitatorEl.addEventListener('click', () => {
      state.facilitatorMode = !state.facilitatorMode;
      if (state.facilitatorMode) {
        facilitatorPanelEl.classList.remove('hidden');
        renderFacilitator();
      } else {
        facilitatorPanelEl.classList.add('hidden');
      }
    });
  }

  // --------------------------------------------------------------------------
  // RESET ALL STATE
  // --------------------------------------------------------------------------
  if (btnResetEl) {
    btnResetEl.addEventListener('click', () => {
      state.buckets = { main: [], unclear: [], review: [] };
      state.historyA = [];
      state.cardTextsA = {};
      state.highlightDupsA = false;
      state.selectedUnassignedId = null;
      state.savedA = false;

      state.selectedB = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      state.draftB = { ...Data.initialDraftB };
      state.previousDraftB = null;
      state.showHintB = false;
      state.savedB = false;

      state.filterC = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      state.showFilterDrawerC = false;
      state.removedBlockIdsC = new Set();
      state.blockTextsC = {};
      state.quizAnswerC = null;
      state.openQuizAnswerVisibleC = false;
      state.savedC = false;

      renderLeftColumn();
      if (state.option === 'a') renderActionA();
      else if (state.option === 'b') renderActionB();
      else if (state.option === 'c') renderActionC();

      showToast('Đã đặt lại');
      notifySave();
    });
  }

  // --------------------------------------------------------------------------
  // NAVIGATION SETUP
  // --------------------------------------------------------------------------
  function setupNav() {
    const navLinks = document.querySelectorAll('.nav-opt');
    navLinks.forEach(link => {
      const opt = link.dataset.opt;
      if (opt === state.option) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  setupNav();
  renderLeftColumn();

  if (state.option === 'a') {
    renderActionA();
  } else if (state.option === 'b') {
    renderActionB();
  } else if (state.option === 'c') {
    renderActionC();
  }

  if (state.facilitatorMode) {
    facilitatorPanelEl.classList.remove('hidden');
    renderFacilitator();
  }

})();
