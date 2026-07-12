/* =============================================================
   Flash Card Learning — Application Logic
   Handles: Study Page (flashcard), Quiz Page (timer + MCQ)
   ============================================================= */

'use strict';

/* ─── Vocabulary Dataset ─── */
const VOCAB = [
  // Nouns
  { word: 'Adventure',   translation: 'การผจญภัย',   pos: 'Noun',      example: 'Life is a great {word}.',              posClass: 'tag--noun' },
  { word: 'Melancholy',  translation: 'เศร้าหมอง',   pos: 'Noun',      example: 'A deep sense of {word} filled the room.',posClass: 'tag--noun' },
  { word: 'Serenity',    translation: 'ความสงบ',      pos: 'Noun',      example: 'The lake offered pure {word}.',         posClass: 'tag--noun' },
  // Verbs
  { word: 'Persevere',   translation: 'อดทน',         pos: 'Verb',      example: 'You must {word} through hardship.',     posClass: 'tag--verb' },
  { word: 'Flourish',    translation: 'เจริญเติบโต', pos: 'Verb',      example: 'Plants {word} in sunlight.',            posClass: 'tag--verb' },
  { word: 'Navigate',    translation: 'นำทาง',        pos: 'Verb',      example: 'We must {word} through the maze.',      posClass: 'tag--verb' },
  // Adjectives
  { word: 'Ebullient',   translation: 'มีชีวิตชีวา', pos: 'Adjective', example: 'She gave an {word} performance.',       posClass: 'tag--adj' },
  { word: 'Eloquent',    translation: 'คล่องแคล่ว',  pos: 'Adjective', example: 'She is an {word} speaker.',             posClass: 'tag--adj' },
  { word: 'Resilient',   translation: 'ทนทาน',        pos: 'Adjective', example: 'She is a {word} leader.',              posClass: 'tag--adj' },
  { word: 'Diligent',    translation: 'ขยันหมั่นเพียร', pos: 'Adjective', example: 'A {word} student always succeeds.',    posClass: 'tag--adj' },
  // Travel
  { word: 'Destination', translation: 'จุดหมายปลายทาง',pos: 'Travel',    example: 'What is your final {word}?',            posClass: 'tag--primary' },
  { word: 'Itinerary',   translation: 'แผนการเดินทาง',pos: 'Travel',    example: 'We must plan our {word} carefully.',    posClass: 'tag--primary' },
  { word: 'Picturesque', translation: 'สวยงามราวภาพวาด',pos: 'Travel',   example: 'They live in a {word} village.',       posClass: 'tag--primary' },
  // Business
  { word: 'Transaction', translation: 'ธุรกรรม',       pos: 'Business',  example: 'The bank processed the {word}.',       posClass: 'tag--green' },
  { word: 'Negotiate',   translation: 'เจรจาต่อรอง',  pos: 'Business',  example: 'They managed to {word} a good deal.',   posClass: 'tag--green' },
  { word: 'Lucrative',   translation: 'ทำกำไรได้ดี',  pos: 'Business',  example: 'It was a highly {word} business.',      posClass: 'tag--green' },
  // Academic
  { word: 'Curriculum',  translation: 'หลักสูตร',      pos: 'Academic',  example: 'The school is updating its {word}.',    posClass: 'tag--tertiary' },
  { word: 'Synthesize',  translation: 'สังเคราะห์',   pos: 'Academic',  example: 'You should {word} the main arguments.', posClass: 'tag--tertiary' },
  { word: 'Erudite',     translation: 'รอบรู้',        pos: 'Academic',  example: 'He gave an {word} lecture on history.', posClass: 'tag--tertiary' }
];

/* Quiz question pool with multiple-choice answers */
const QUESTIONS = [
  {
    word: 'Ebullient', pos: 'Adjective', posClass: 'tag--adj',
    correct: 0,
    options: ['Cheerful and full of energy', 'Likely to ignite', 'Deeply saddened', 'Very difficult to understand']
  },
  {
    word: 'Resilient', pos: 'Adjective', posClass: 'tag--adj',
    correct: 1,
    options: ['Easily broken', 'Able to recover quickly', 'Lacking energy', 'Overly strict']
  },
  {
    word: 'Melancholy', pos: 'Noun', posClass: 'tag--noun',
    correct: 2,
    options: ['A type of fruit', 'A musical style', 'A deep feeling of sadness', 'An ancient city']
  },
  {
    word: 'Eloquent', pos: 'Adjective', posClass: 'tag--adj',
    correct: 0,
    options: ['Well-spoken and persuasive', 'Secretive', 'Aggressive', 'Confused']
  },
  {
    word: 'Flourish', pos: 'Verb', posClass: 'tag--verb',
    correct: 3,
    options: ['To hide away', 'To fail quickly', 'To argue', 'To grow or develop strongly']
  },
  {
    word: 'Serenity', pos: 'Noun', posClass: 'tag--noun',
    correct: 1,
    options: ['Loud chaos', 'The state of being calm and peaceful', 'A type of storm', 'Anxiety']
  },
  {
    word: 'Diligent', pos: 'Adjective', posClass: 'tag--adj',
    correct: 0,
    options: ['Hardworking and careful', 'Lazy', 'Reckless', 'Distracted']
  },
  {
    word: 'Persevere', pos: 'Verb', posClass: 'tag--verb',
    correct: 2,
    options: ['To give up', 'To celebrate', 'To continue despite difficulty', 'To ignore']
  },
  {
    word: 'Whimsical', pos: 'Adjective', posClass: 'tag--adj',
    correct: 3,
    options: ['Aggressive', 'Boring', 'Precise', 'Playfully quaint or unusual']
  },
  {
    word: 'Adventure', pos: 'Noun', posClass: 'tag--noun',
    correct: 1,
    options: ['A type of vehicle', 'An exciting or risky experience', 'A long sentence', 'A sleeping disorder']
  },
];


/* ═══════════════════════════════════════════
   STUDY PAGE — Flashcard Logic
   ═══════════════════════════════════════════ */
(function initStudyPage() {
  const flashcard = document.getElementById('flashcard');
  if (!flashcard) return; // Only run on study.html

  let currentIndex  = 0;
  let isFlipped     = false;
  let favorited     = new Set(JSON.parse(localStorage.getItem('fc_favorites') || '[]'));
  let mastered      = parseInt(localStorage.getItem('fc_mastered') || '12', 10);
  let sessionCount  = parseInt(localStorage.getItem('fc_session')  || '15', 10);
  const TOTAL_WORDS = 20;

  // Determine active vocabulary based on URL query parameters
  let activeVocab = [...VOCAB];
  const urlParams = new URLSearchParams(window.location.search);
  const filterCat = urlParams.get('category');
  const filterMode = urlParams.get('mode');
  const banner = document.getElementById('filter-banner');

  if (filterCat) {
    activeVocab = VOCAB.filter(v => v.pos.toLowerCase() === filterCat.toLowerCase());
    if (banner) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <span>
          <span class="material-symbols-outlined">filter_alt</span>
          Studying Category: <strong>${filterCat}</strong>
        </span>
        <button onclick="window.location.href='study.html'">Clear</button>
      `;
    }
  } else if (filterMode === 'favorites') {
    activeVocab = VOCAB.filter(v => favorited.has(v.word));
    if (banner) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <span>
          <span class="material-symbols-outlined">grade</span>
          Studying: <strong>Favorites</strong>
        </span>
        <button onclick="window.location.href='study.html'">Clear</button>
      `;
    }
    // If no favorites are selected yet, supply a placeholder explanation card
    if (activeVocab.length === 0) {
      activeVocab = [{
        word: 'No Favorites Yet!',
        translation: 'ยังไม่มีคำศัพท์ที่ถูกใจ',
        pos: 'Info',
        example: 'Click the star button on any card to add it to favorites.',
        posClass: 'tag--primary'
      }];
    }
  }

  /* ── Render current card ── */
  function renderCard() {
    const v = activeVocab[currentIndex % activeVocab.length];

    // Reset flip
    isFlipped = false;
    flashcard.classList.remove('flipped');
    flashcard.setAttribute('aria-pressed', 'false');

    // Front
    const catEl   = document.getElementById('card-category');
    const wordEl  = document.getElementById('card-word');
    if (catEl)  { catEl.textContent  = v.pos; catEl.className = 'tag ' + v.posClass; }
    if (wordEl) wordEl.textContent = v.word;

    // Back
    const transEl  = document.getElementById('card-translation');
    const exampEl  = document.getElementById('card-word-em');
    const textNode = transEl.nextElementSibling;
    if (transEl) transEl.textContent = v.translation;
    
    // Format example sentences replacing "{word}" with highlighted markup
    if (textNode && textNode.classList.contains('card-example')) {
      const sentence = v.example.replace('{word}', `<strong id="card-word-em">${v.word.toLowerCase()}</strong>`);
      textNode.innerHTML = sentence;
    }

    // Favorite button state
    updateFavBtn();

    // Progress
    updateProgress();
  }

  /* ── Flip card ── */
  function flipCard() {
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
    flashcard.setAttribute('aria-pressed', String(isFlipped));
  }

  /* ── Next word ── */
  function nextWord() {
    currentIndex = (currentIndex + 1) % activeVocab.length;
    sessionCount = Math.min(sessionCount + 1, TOTAL_WORDS);
    localStorage.setItem('fc_session', sessionCount);
    renderCard();
  }

  /* ── Progress bar ── */
  function updateProgress() {
    const pct = Math.round((sessionCount / TOTAL_WORDS) * 100);
    const fill  = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    const bar   = document.getElementById('quiz-progressbar');
    if (fill)  fill.style.width = pct + '%';
    if (label) label.textContent = sessionCount + ' / ' + TOTAL_WORDS + ' Words';
    if (bar)   bar.setAttribute('aria-valuenow', pct);
  }

  /* ── Favorite ── */
  function toggleFavorite() {
    const v = VOCAB[currentIndex % VOCAB.length];
    if (favorited.has(v.word)) {
      favorited.delete(v.word);
    } else {
      favorited.add(v.word);
    }
    localStorage.setItem('fc_favorites', JSON.stringify([...favorited]));
    updateFavBtn();
  }

  function updateFavBtn() {
    const v = VOCAB[currentIndex % VOCAB.length];
    const btns = document.querySelectorAll('#btn-favorite, #btn-fav-quick');
    btns.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      const isFav = favorited.has(v.word);
      if (icon) {
        icon.style.fontVariationSettings = isFav ? "'FILL' 1" : "'FILL' 0";
        icon.style.color = isFav ? 'var(--tertiary)' : '';
      }
    });
  }

  /* ── Speak (TTS) ── */
  function speak() {
    const v = VOCAB[currentIndex % VOCAB.length];
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(v.word);
      utt.lang = 'en-US';
      utt.rate = 0.85;
      speechSynthesis.speak(utt);
    }
  }

  /* ── Rate card ── */
  window.rateCard = function(rating, btn) {
    // Brief press animation
    btn.style.transform = 'translate(2px,2px)';
    btn.style.boxShadow = 'var(--shadow-press)';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }, 150);

    if (rating === 'easy' || rating === 'good') {
      mastered = Math.min(mastered + 1, 99);
      localStorage.setItem('fc_mastered', mastered);
      updateStatDisplay();
    }
    setTimeout(nextWord, 180);
  };

  function updateStatDisplay() {
    const el = document.getElementById('stat-mastered');
    if (el) el.textContent = mastered;
  }

  /* ── Event Bindings ── */
  flashcard.addEventListener('click', flipCard);
  flashcard.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
  });

  const nextBtn = document.getElementById('btn-next');
  if (nextBtn) nextBtn.addEventListener('click', nextWord);

  const favBtn = document.getElementById('btn-favorite');
  if (favBtn) favBtn.addEventListener('click', e => { e.stopPropagation(); toggleFavorite(); });

  const favQuick = document.getElementById('btn-fav-quick');
  if (favQuick) favQuick.addEventListener('click', toggleFavorite);

  const speakBtn = document.getElementById('btn-speak');
  if (speakBtn) speakBtn.addEventListener('click', e => { e.stopPropagation(); speak(); });

  /* ── Keyboard shortcuts ── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    switch (e.key) {
      case ' ': e.preventDefault(); flipCard(); break;
      case 'ArrowRight': nextWord(); break;
      case 'ArrowLeft':
        currentIndex = (currentIndex - 1 + activeVocab.length) % activeVocab.length;
        renderCard();
        break;
      case 's': case 'S': speak(); break;
    }
  });

  /* ── Button press micro-interactions ── */
  document.querySelectorAll('.rating-btn, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transition = 'none';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transition = '';
    });
  });

  /* ── Init ── */
  renderCard();
  updateStatDisplay();
})();


/* ═══════════════════════════════════════════
   QUIZ PAGE — Timer + MCQ Logic
   ═══════════════════════════════════════════ */
(function initQuizPage() {
  const optionsList = document.getElementById('options-list');
  if (!optionsList) return; // Only run on quiz.html

  /* State */
  let currentQ    = 0;
  let score       = 0;
  let selected    = -1;
  let timerSec    = 300; // 5 minutes
  let timerHandle = null;

  /* Shuffle QUESTIONS for variety */
  const questions = [...QUESTIONS].sort(() => Math.random() - 0.5);

  /* ── Timer ── */
  function startTimer() {
    timerHandle = setInterval(() => {
      timerSec--;
      const m = String(Math.floor(timerSec / 60)).padStart(2, '0');
      const s = String(timerSec % 60).padStart(2, '0');
      const el = document.getElementById('timer-text');
      if (el) el.textContent = m + ':' + s;
      if (timerSec <= 0) { clearInterval(timerHandle); showResult(); }
    }, 1000);
  }

  /* ── Render question ── */
  function renderQuestion() {
    if (currentQ >= questions.length) { showResult(); return; }

    const q = questions[currentQ];
    selected = -1;

    // Update counter
    const qCurr = document.getElementById('q-current');
    const qTot  = document.getElementById('q-total');
    if (qCurr) qCurr.textContent = currentQ + 1;
    if (qTot)  qTot.textContent  = questions.length;

    // Progress bar
    const pct  = Math.round(((currentQ) / questions.length) * 100);
    const fill = document.getElementById('quiz-progress-fill');
    const bar  = document.getElementById('quiz-progressbar');
    if (fill) fill.style.width = pct + '%';
    if (bar)  bar.setAttribute('aria-valuenow', pct);

    // Question card
    const posEl  = document.getElementById('q-pos');
    const wordEl = document.getElementById('q-word');
    if (posEl)  { posEl.textContent = q.pos; posEl.className = 'tag ' + q.posClass; }
    if (wordEl) wordEl.textContent = q.word;

    // Options
    optionsList.innerHTML = q.options.map((opt, i) => `
      <button
        class="option-btn"
        data-index="${i}"
        onclick="selectOption(${i})"
        role="radio"
        aria-checked="false"
        aria-label="Option ${i + 1}: ${escapeHTML(opt)}"
      >
        <span>${escapeHTML(opt)}</span>
        <div class="option-radio">
          <div class="option-radio-dot"></div>
        </div>
      </button>
    `).join('');

    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.textContent = 'Submit Answer';
    }

    // Animate in
    const qCard = document.getElementById('question-card');
    if (qCard) {
      qCard.classList.remove('animate-in');
      void qCard.offsetWidth;
      qCard.classList.add('animate-in');
    }
    optionsList.classList.remove('animate-in');
    void optionsList.offsetWidth;
    optionsList.classList.add('animate-in');
  }

  /* ── Select option ── */
  window.selectOption = function(index) {
    selected = index;

    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.classList.toggle('selected', i === index);
      btn.setAttribute('aria-checked', i === index ? 'true' : 'false');
    });

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.setAttribute('aria-disabled', 'false');
    }
  };

  /* ── Submit answer ── */
  function submitAnswer() {
    if (selected < 0) return;
    const q = questions[currentQ];
    const correct = selected === q.correct;

    // Visual feedback
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.onclick = null; // Disable re-clicking
      if (i === q.correct) btn.classList.add('correct');
      else if (i === selected && !correct) btn.classList.add('wrong');
    });

    if (correct) score++;

    // Auto advance after feedback
    setTimeout(nextQuestion, 1000);
  }

  /* ── Next question ── */
  window.nextQuestion = function() {
    currentQ++;
    if (currentQ >= questions.length) { showResult(); }
    else { renderQuestion(); }
  };

  /* ── Show result ── */
  function showResult() {
    clearInterval(timerHandle);

    const container    = document.getElementById('quiz-container');
    const resultScreen = document.getElementById('result-screen');
    if (container)    container.style.display    = 'none';
    if (resultScreen) resultScreen.style.display = 'flex';

    const pct = Math.round((score / questions.length) * 100);
    const xp  = score * 10;

    const rScore    = document.getElementById('result-score');
    const rAccuracy = document.getElementById('result-accuracy');
    const rXP       = document.getElementById('result-xp');
    if (rScore)    rScore.textContent    = score + '/' + questions.length;
    if (rAccuracy) rAccuracy.textContent = pct + '%';
    if (rXP)       rXP.textContent       = '+' + xp + ' XP';

    // Persist XP
    const prev = parseInt(localStorage.getItem('fc_xp') || '0', 10);
    localStorage.setItem('fc_xp', prev + xp);
  }

  /* ── Restart ── */
  window.restartQuiz = function() {
    currentQ  = 0;
    score     = 0;
    selected  = -1;
    timerSec  = 300;

    const container    = document.getElementById('quiz-container');
    const resultScreen = document.getElementById('result-screen');
    if (container)    container.style.display    = '';
    if (resultScreen) resultScreen.style.display = 'none';

    questions.sort(() => Math.random() - 0.5);
    renderQuestion();
    clearInterval(timerHandle);
    startTimer();
  };

  /* ── Submit button binding ── */
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) submitBtn.addEventListener('click', submitAnswer);

  /* ── Keyboard shortcuts ── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    const keys = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 };
    if (keys[e.key] !== undefined) selectOption(keys[e.key]);
    if (e.key === 'Enter') submitAnswer();
  });

  /* ── Init ── */
  renderQuestion();
  startTimer();
})();


/* ─────────────────────────────────────────────
   Utility
   ───────────────────────────────────────────── */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}
