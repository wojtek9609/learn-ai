/* ==========================================================================
   Learn AI - app shell (v2: multi-track)
   Plain ES module. Hash router, i18n, level tabs, quiz engine, localStorage
   progress. Served from a subpath (/learn-ai/) so every URL is relative.
   ========================================================================== */

import {
  TRACKS,
  DEFAULT_TRACK_ID,
  isAvailable,
  availableTracks,
  getTrack,
  getModule,
  getLesson,
  trackLessons,
} from './content/tracks.js';

import { interviewTrackIds, getInterviewBank } from './content/interview.js';

/* --------------------------------------------------------------- i18n ---- */

const I18N = {
  pl: {
    eyebrow: 'Platforma kursow',
    heroTitle: 'Ucz sie tego, co dalej',
    heroSub:
      'Kilka kierunkow, jeden format: kazda lekcja na trzech poziomach, z diagramem i quizem. Postep zapisuje sie lokalnie.',
    yourProgress: 'Twoj postep',
    lessonsDone: (d, t) => `${d} z ${t} lekcji ukonczonych`,
    tracksLabel: 'Kierunki',
    trackEyebrow: 'Kierunek',
    modulesLabel: 'Moduly',
    lessonsLabel: 'Lekcje',
    moduleCount: (n) => `${n} ${plural(n, 'modul', 'moduly', 'modulow')}`,
    lessonCount: (n) => `${n} ${plural(n, 'lekcja', 'lekcje', 'lekcji')}`,
    minutesShort: (n) => `${n} min`,
    totalMinutes: (n) => `${n} min czytania`,
    done: 'ukonczone',
    completed: 'Ukonczona',
    bestScore: (s) => `wynik ${s}%`,
    back: 'Wstecz',
    backHome: 'Kierunki',
    comingSoon: 'Wkrotce',
    comingSoonHint: 'Ten kierunek jest w przygotowaniu. Zajrzyj, co bedzie w srodku.',
    plannedLabel: 'Co bedzie w kursie',
    plannedEmpty: 'Plan tego kierunku powstaje. Wroc tu za chwile.',
    seePlan: 'Zobacz plan',
    levels: { eli5: 'Jak dziecku', school: 'Licealista', pro: 'Pro' },
    levelAria: 'Poziom wyjasnienia',
    quizTitle: 'Quiz',
    quizIntro:
      'Odpowiedz na 4 pytania. Wynik 75% lub wyzszy automatycznie zalicza lekcje.',
    quizProgress: (a, t) => `${a}/${t} odpowiedzi`,
    correct: 'Dobrze!',
    wrong: 'Niedokladnie',
    yourScore: 'Twoj wynik',
    passed: 'Lekcja zaliczona. Swietna robota!',
    failed: 'Potrzebujesz 75%, zeby zaliczyc. Sprobuj jeszcze raz.',
    tryAgain: 'Sprobuj ponownie',
    markDone: 'Oznacz jako ukonczona',
    markedDone: 'Ukonczona',
    unmark: 'Cofnij ukonczenie',
    prev: 'Poprzednia',
    next: 'Nastepna',
    notFoundTitle: 'Nie znaleziono',
    notFoundBody: 'Ta strona nie istnieje. Wroc na strone glowna.',
    noContentTitle: 'Brak tresci',
    noContentBody:
      'Nie udalo sie zaladowac kierunkow z katalogu content/. Sprawdz konsole przegladarki.',
    footer: 'Learn AI - statyczny kurs bez frameworkow. Postep zapisany lokalnie.',
    langAria: 'Jezyk',
    updateTitle: 'Nowa wersja',
    updateAction: 'Odswiez',
    versionLabel: (v) => `wersja ${v}`,
    versionDev: 'wersja dev',
    interactiveTitle: 'Krok po kroku',
    interactiveHint: 'Przewijaj suwakiem lub strzalkami, zeby zobaczyc kolejne kroki.',
    frameOf: (i, n) => `Krok ${i} z ${n}`,
    framePrev: 'Poprzedni krok',
    frameNext: 'Nastepny krok',
    frameSlider: 'Wybierz krok animacji',

    /* -- v5: tryb sluchania -- */
    ttsLabel: 'Sluchaj',
    ttsPlay: 'Odtworz',
    ttsPause: 'Pauza',
    ttsResume: 'Wznow',
    ttsStop: 'Zatrzymaj',
    ttsRate: 'Tempo czytania',

    /* -- v5.1: powtorka w stylu Anki -- */
    reviewTitle: 'Powtorka',
    reviewDesc: 'Dzienna dawka pytan z lekcji, ktore juz zaliczyles.',
    reviewModuleCta: 'Powtorz ten modul',
    reviewScopeLabel: 'Zakres powtorki',
    reviewAll: 'Wszystko',
    reviewAllDesc: (n) =>
      `${n} ${plural(n, 'ukonczona lekcja', 'ukonczone lekcje', 'ukonczonych lekcji')} we wszystkich kierunkach`,
    reviewPickModule: 'Albo jeden modul',
    reviewModuleDone: (d, tt) => `${d}/${tt} ${plural(tt, 'lekcja', 'lekcje', 'lekcji')} zaliczone`,
    reviewEmptyTitle: 'Nie ma jeszcze czego powtarzac',
    reviewEmptyBody:
      'Zalicz najpierw dowolna lekcje (quiz 75% albo przycisk "Oznacz jako ukonczona") i wroc tutaj.',
    reviewGoCourses: 'Przejdz do kierunkow',
    reviewNoQuestions: 'Ukonczone lekcje w tym zakresie nie maja pytan quizowych.',
    reviewPoolSmall: (n) =>
      `W tym zakresie jest tylko ${n} ${plural(n, 'pytanie', 'pytania', 'pytan')} - tyle liczy ta sesja.`,
    reviewSessionIntro:
      'Jedno pytanie naraz. Bledne wraca jeszcze w tej sesji, dobre - dopiero za jakis czas.',
    reviewDue: (n) => `Powtorki na dzis: ${n}`,
    reviewDoneToday: 'Dzienna dawka zrobiona ✓',
    reviewDoseTitle: 'Dzienna dawka',
    reviewRound: (n) => `Runda ${n}`,
    reviewCardOf: (i, n) => `Karta ${i} z ${n}`,
    reviewNext: 'Dalej',
    reviewEndless: 'Dalej bez limitu',
    reviewEndlessHint: 'Rundy po 10 pytan, tak dlugo jak chcesz.',
    reviewMore: 'Jeszcze 10',
    reviewStop: 'Koniec',
    reviewNewCard: 'nowa',
    reviewAgainCard: 'jeszcze raz',
    reviewRequeued: 'To pytanie wroci jeszcze w tej sesji.',
    reviewBackIn: (n) =>
      n <= 0
        ? 'Wroci jeszcze dzis.'
        : n === 1
        ? 'Wroci jutro.'
        : `Wroci za ${n} ${plural(n, 'dzien', 'dni', 'dni')}.`,
    reviewAllDoneTitle: 'Wszystko powtorzone na dzis',
    reviewAllDoneBody:
      'Zadne pytanie nie czeka dzis na powtorke. Jesli masz ochote, cwicz dalej bez limitu.',
    sessionRecap: 'Podsumowanie',
    sessionAgain: 'Jeszcze raz',
    recapOk: 'dobrze',
    recapBad: 'zle',
    recapSkipped: 'bez odpowiedzi',

    /* -- v5: rozmowa rekrutacyjna -- */
    interviewTitle: 'Rozmowa rekrutacyjna',
    interviewDesc: 'Trudniejsze pytania - zamkniete i otwarte, jak na prawdziwej rozmowie.',
    interviewScopeLabel: 'Z jakiego kierunku pytamy?',
    interviewAll: 'Wszystkie kierunki',
    interviewAllDesc: (n) => `${n} ${plural(n, 'pytanie', 'pytania', 'pytan')} w puli`,
    interviewBankSize: (n) => `${n} ${plural(n, 'pytanie', 'pytania', 'pytan')}`,
    interviewEmptyTitle: 'Brak pytan',
    interviewEmptyBody: 'Baza pytan rekrutacyjnych nie jest jeszcze gotowa. Zajrzyj pozniej.',
    interviewSessionIntro:
      'Dziesiec pytan. Przy pytaniach otwartych najpierw odpowiedz sobie na glos, potem odslon wzorzec.',
    interviewOpenQ: 'Pytanie otwarte',
    interviewChoiceQ: 'Pytanie zamkniete',
    interviewShow: 'Pokaz odpowiedz',
    interviewModelAnswer: 'Wzorcowa odpowiedz',
    interviewKeyPoints: 'Na to czeka rekruter',
    interviewKnew: 'Umialem',
    interviewRepeat: 'Musze powtorzyc',
    interviewChoiceScore: (r, n) => `Zamkniete: ${r}/${n} poprawnych`,
    interviewOpenTally: (ok, again) => `Otwarte: ${ok} umiane, ${again} do powtorki`,
    interviewNoOpen: 'Brak pytan otwartych w tej sesji.',
    interviewNoChoice: 'Brak pytan zamknietych w tej sesji.',
    levelMid: 'mid',
    levelSenior: 'senior',
    sessionQuestions: (n) => `${n} ${plural(n, 'pytanie', 'pytania', 'pytan')}`,

    /* -- v5: UX pack -- */
    continueEyebrow: 'Kontynuuj',
    continueCta: 'Wracaj do nauki',
    searchTitle: 'Szukaj',
    searchAria: 'Szukaj w kursach',
    searchPlaceholder: 'Czego szukasz?',
    searchHint:
      'Minimum 2 znaki. Przeszukujemy tytuly i tresc wszystkich trzech poziomow, po polsku i po angielsku.',
    searchTooShort: 'Wpisz co najmniej 2 znaki.',
    searchResults: (n) => `${n} ${plural(n, 'wynik', 'wyniki', 'wynikow')}`,
    searchCapped: (n) => `Pokazujemy pierwsze ${n}.`,
    searchEmpty: 'Nic nie pasuje. Sprobuj innego slowa.',
    streakTitle: 'Seria',
    streakValue: (n) => `${n} ${plural(n, 'dzien', 'dni', 'dni')} 🔥`,
    streakNone: 'Zacznij dzis swoja serie 🔥',
    goalToday: (x, g) => `Dzis: ${x} / cel ${g}`,
    goalDone: 'Cel dnia zrobiony ✓',
    goalHint: 'Jedna zaliczona lekcja albo skonczona sesja = jeden punkt.',
    dataTitle: 'Kopia postepu',
    dataDesc: 'Zapisz postep do pliku albo przenies go na inne urzadzenie kodem.',
    dataExport: '⬇ Eksportuj',
    dataCodeLabel: 'Kod postepu',
    dataCopied: 'Plik pobrany, kod skopiowany do schowka.',
    dataCopyFailed: 'Plik pobrany. Kod masz w polu obok - skopiuj go recznie.',
    dataPasteLabel: 'Wklej kod albo wybierz plik',
    dataPastePlaceholder: 'Wklej tutaj kod postepu...',
    dataPickFile: '📄 Wybierz plik',
    dataCheck: 'Sprawdz dane',
    dataBad: 'Nie rozpoznaje tych danych. Wklej kod z eksportu albo wybierz plik learnai-progress.json.',
    dataPreview: (n, when) =>
      `${n} ${plural(n, 'ukonczona lekcja', 'ukonczone lekcje', 'ukonczonych lekcji')}, zapis z ${when}.`,
    dataConfirmQ: 'Nadpisac obecny postep tymi danymi?',
    dataConfirm: 'Nadpisz postep',
    dataCancel: 'Anuluj',
    dataImported: 'Postep wczytany.',
  },
  en: {
    eyebrow: 'Learning platform',
    heroTitle: 'Learn what comes next',
    heroSub:
      'Several tracks, one format: every lesson at three levels, with a diagram and a quiz. Progress is stored locally.',
    yourProgress: 'Your progress',
    lessonsDone: (d, t) => `${d} of ${t} lessons completed`,
    tracksLabel: 'Tracks',
    trackEyebrow: 'Track',
    modulesLabel: 'Modules',
    lessonsLabel: 'Lessons',
    moduleCount: (n) => `${n} ${n === 1 ? 'module' : 'modules'}`,
    lessonCount: (n) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`,
    minutesShort: (n) => `${n} min`,
    totalMinutes: (n) => `${n} min read`,
    done: 'done',
    completed: 'Completed',
    bestScore: (s) => `best ${s}%`,
    back: 'Back',
    backHome: 'Tracks',
    comingSoon: 'Coming soon',
    comingSoonHint: 'This track is in the works. Take a look at what is planned.',
    plannedLabel: 'What the course will cover',
    plannedEmpty: 'The outline for this track is being written. Check back soon.',
    seePlan: 'See the plan',
    levels: { eli5: "Like I'm five", school: 'High schooler', pro: 'Pro' },
    levelAria: 'Explanation level',
    quizTitle: 'Quiz',
    quizIntro:
      'Answer 4 questions. Scoring 75% or higher completes the lesson automatically.',
    quizProgress: (a, t) => `${a}/${t} answered`,
    correct: 'Correct!',
    wrong: 'Not quite',
    yourScore: 'Your score',
    passed: 'Lesson complete. Nice work!',
    failed: 'You need 75% to pass. Give it another go.',
    tryAgain: 'Try again',
    markDone: 'Mark as done',
    markedDone: 'Completed',
    unmark: 'Mark as not done',
    prev: 'Previous',
    next: 'Next',
    notFoundTitle: 'Not found',
    notFoundBody: 'That page does not exist. Head back home.',
    noContentTitle: 'No content',
    noContentBody:
      'Tracks from content/ could not be loaded. Check the browser console.',
    footer: 'Learn AI - a static, framework-free course. Progress stored locally.',
    langAria: 'Language',
    updateTitle: 'New version',
    updateAction: 'Refresh',
    versionLabel: (v) => `version ${v}`,
    versionDev: 'dev version',
    interactiveTitle: 'Step by step',
    interactiveHint: 'Drag the slider or use the arrow keys to walk through the steps.',
    frameOf: (i, n) => `Step ${i} of ${n}`,
    framePrev: 'Previous step',
    frameNext: 'Next step',
    frameSlider: 'Pick an animation step',

    /* -- v5: listening mode -- */
    ttsLabel: 'Listen',
    ttsPlay: 'Play',
    ttsPause: 'Pause',
    ttsResume: 'Resume',
    ttsStop: 'Stop',
    ttsRate: 'Reading speed',

    /* -- v5.1: Anki-style review -- */
    reviewTitle: 'Review',
    reviewDesc: 'A daily dose of questions from the lessons you have already completed.',
    reviewModuleCta: 'Review this module',
    reviewScopeLabel: 'Review scope',
    reviewAll: 'Everything',
    reviewAllDesc: (n) => `${n} completed ${n === 1 ? 'lesson' : 'lessons'} across all tracks`,
    reviewPickModule: 'Or a single module',
    reviewModuleDone: (d, tt) => `${d}/${tt} ${tt === 1 ? 'lesson' : 'lessons'} completed`,
    reviewEmptyTitle: 'Nothing to review yet',
    reviewEmptyBody:
      'Complete any lesson first (score 75% on its quiz or use "Mark as done") and come back here.',
    reviewGoCourses: 'Browse the tracks',
    reviewNoQuestions: 'The completed lessons in this scope have no quiz questions.',
    reviewPoolSmall: (n) =>
      `This scope only has ${n} ${n === 1 ? 'question' : 'questions'} - that is the whole session.`,
    reviewSessionIntro:
      'One question at a time. A miss comes back later in this session, a hit comes back in a few days.',
    reviewDue: (n) => `Reviews due today: ${n}`,
    reviewDoneToday: 'Daily dose done ✓',
    reviewDoseTitle: 'Daily dose',
    reviewRound: (n) => `Round ${n}`,
    reviewCardOf: (i, n) => `Card ${i} of ${n}`,
    reviewNext: 'Next',
    reviewEndless: 'Keep going',
    reviewEndlessHint: 'Rounds of ten, for as long as you like.',
    reviewMore: 'Ten more',
    reviewStop: 'Finish',
    reviewNewCard: 'new',
    reviewAgainCard: 'again',
    reviewRequeued: 'This one comes back later in this session.',
    reviewBackIn: (n) =>
      n <= 0 ? 'Comes back today.' : n === 1 ? 'Comes back tomorrow.' : `Comes back in ${n} days.`,
    reviewAllDoneTitle: 'All reviewed for today',
    reviewAllDoneBody:
      'Nothing is due right now. If you feel like it, keep going without a limit.',
    sessionRecap: 'Recap',
    sessionAgain: 'Again',
    recapOk: 'correct',
    recapBad: 'wrong',
    recapSkipped: 'unanswered',

    /* -- v5: interview -- */
    interviewTitle: 'Interview mode',
    interviewDesc: 'Harder questions - multiple choice and open-ended, interview register.',
    interviewScopeLabel: 'Which track are we interviewing for?',
    interviewAll: 'All tracks',
    interviewAllDesc: (n) => `${n} ${n === 1 ? 'question' : 'questions'} in the pool`,
    interviewBankSize: (n) => `${n} ${n === 1 ? 'question' : 'questions'}`,
    interviewEmptyTitle: 'No questions',
    interviewEmptyBody: 'The interview question bank is not ready yet. Check back later.',
    interviewSessionIntro:
      'Ten questions. For open ones, answer out loud first, then reveal the model answer.',
    interviewOpenQ: 'Open question',
    interviewChoiceQ: 'Multiple choice',
    interviewShow: 'Show answer',
    interviewModelAnswer: 'Model answer',
    interviewKeyPoints: 'What the interviewer listens for',
    interviewKnew: 'I knew it',
    interviewRepeat: 'Need to review',
    interviewChoiceScore: (r, n) => `Multiple choice: ${r}/${n} correct`,
    interviewOpenTally: (ok, again) => `Open: ${ok} solid, ${again} to revisit`,
    interviewNoOpen: 'No open questions in this session.',
    interviewNoChoice: 'No multiple-choice questions in this session.',
    levelMid: 'mid',
    levelSenior: 'senior',
    sessionQuestions: (n) => `${n} ${n === 1 ? 'question' : 'questions'}`,

    /* -- v5: UX pack -- */
    continueEyebrow: 'Continue',
    continueCta: 'Back to learning',
    searchTitle: 'Search',
    searchAria: 'Search the courses',
    searchPlaceholder: 'What are you looking for?',
    searchHint:
      'At least 2 characters. We search lesson titles and the text of all three levels, in both Polish and English.',
    searchTooShort: 'Type at least 2 characters.',
    searchResults: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
    searchCapped: (n) => `Showing the first ${n}.`,
    searchEmpty: 'Nothing matched. Try another word.',
    streakTitle: 'Streak',
    streakValue: (n) => `${n} ${n === 1 ? 'day' : 'days'} 🔥`,
    streakNone: 'Start your streak today 🔥',
    goalToday: (x, g) => `Today: ${x} / goal ${g}`,
    goalDone: 'Daily goal done ✓',
    goalHint: 'One completed lesson or one finished session = one point.',
    dataTitle: 'Progress backup',
    dataDesc: 'Save your progress to a file, or move it to another device with a code.',
    dataExport: '⬇ Export',
    dataCodeLabel: 'Progress code',
    dataCopied: 'File downloaded, code copied to the clipboard.',
    dataCopyFailed: 'File downloaded. The code is in the box - copy it manually.',
    dataPasteLabel: 'Paste a code or pick a file',
    dataPastePlaceholder: 'Paste your progress code here...',
    dataPickFile: '📄 Pick a file',
    dataCheck: 'Check the data',
    dataBad: 'That data is not recognised. Paste an exported code or pick a learnai-progress.json file.',
    dataPreview: (n, when) =>
      `${n} completed ${n === 1 ? 'lesson' : 'lessons'}, saved ${when}.`,
    dataConfirmQ: 'Overwrite your current progress with this data?',
    dataConfirm: 'Overwrite progress',
    dataCancel: 'Cancel',
    dataImported: 'Progress imported.',
  },
};

function plural(n, one, few, many) {
  if (n === 1) return one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/* ------------------------------------------------------------- storage --- */

const STORAGE_KEY = 'learnai:v1';
const LEVELS = ['eli5', 'school', 'pro'];
const LANGS = ['pl', 'en'];
const PASS_SCORE = 75;

// v5/v5.1 additions (lastVisited / activity / missed / interview / srs /
// reviewDay) are read defensively: any shape we do not recognise falls back to
// the default.
const DEFAULT_STATE = {
  lang: 'pl',
  level: 'eli5',
  done: {},
  lastVisited: null,
  activity: {},
  missed: [],
  interview: {},
  srs: {},
  reviewDay: { date: '', done: 0 },
};

const MISSED_CAP = 200;
const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

// v5.1 SM-2 lite. Declared up here because the missed -> srs migration runs
// inside stateFromRaw(), i.e. before the review section is evaluated.
const SRS_BOX_MAX = 5;
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30]; // days to wait, indexed by box

function freshState() {
  return {
    ...DEFAULT_STATE,
    done: {},
    lastVisited: null,
    activity: {},
    missed: [],
    interview: {},
    srs: {},
    reviewDay: { date: '', done: 0 },
  };
}

// Turns anything (localStorage JSON, an imported payload) into a valid state
// object. Unknown / malformed fields silently fall back to the defaults.
function stateFromRaw(parsed) {
  const state = freshState();
  if (parsed && typeof parsed === 'object') {
    if (LANGS.includes(parsed.lang)) state.lang = parsed.lang;
    if (LEVELS.includes(parsed.level)) state.level = parsed.level;
    if (parsed.done && typeof parsed.done === 'object') {
      for (const [key, value] of Object.entries(parsed.done)) {
        if (!value || typeof value !== 'object') continue;
        const score = Number(value.score);
        state.done[key] = {
          score: Number.isFinite(score) ? clamp(Math.round(score), 0, 100) : 100,
          at: typeof value.at === 'string' ? value.at : new Date().toISOString(),
        };
      }
    }

    const lv = parsed.lastVisited;
    if (
      lv &&
      typeof lv === 'object' &&
      typeof lv.trackId === 'string' &&
      typeof lv.moduleId === 'string' &&
      typeof lv.lessonId === 'string'
    ) {
      state.lastVisited = { trackId: lv.trackId, moduleId: lv.moduleId, lessonId: lv.lessonId };
    }

    if (parsed.activity && typeof parsed.activity === 'object') {
      for (const [day, count] of Object.entries(parsed.activity)) {
        if (!DATE_KEY_RE.test(day)) continue;
        const n = Number(count);
        if (Number.isFinite(n) && n > 0) state.activity[day] = Math.round(n);
      }
    }

    if (Array.isArray(parsed.missed)) {
      const seen = new Set();
      for (const id of parsed.missed) {
        if (typeof id !== 'string' || !id || seen.has(id)) continue;
        seen.add(id);
        state.missed.push(id);
      }
      if (state.missed.length > MISSED_CAP) {
        state.missed = state.missed.slice(state.missed.length - MISSED_CAP);
      }
    }

    if (parsed.interview && typeof parsed.interview === 'object') {
      for (const [id, verdict] of Object.entries(parsed.interview)) {
        if (verdict === 'ok' || verdict === 'again') state.interview[id] = verdict;
      }
    }

    if (parsed.srs && typeof parsed.srs === 'object' && !Array.isArray(parsed.srs)) {
      for (const [id, raw] of Object.entries(parsed.srs)) {
        if (!id || typeof id !== 'string' || !raw || typeof raw !== 'object') continue;
        const box = Number(raw.box);
        const reps = Number(raw.reps);
        const lapses = Number(raw.lapses);
        state.srs[id] = {
          box: Number.isFinite(box) ? clamp(Math.round(box), 0, SRS_BOX_MAX) : 0,
          due: DATE_KEY_RE.test(raw.due) ? raw.due : todayKey(),
          reps: Number.isFinite(reps) && reps > 0 ? Math.round(reps) : 0,
          lapses: Number.isFinite(lapses) && lapses > 0 ? Math.round(lapses) : 0,
        };
      }
    }

    const rd = parsed.reviewDay;
    if (rd && typeof rd === 'object' && !Array.isArray(rd)) {
      const doneCount = Number(rd.done);
      state.reviewDay = {
        date: DATE_KEY_RE.test(rd.date) ? rd.date : '',
        done: Number.isFinite(doneCount) && doneCount > 0 ? Math.round(doneCount) : 0,
      };
      if (!state.reviewDay.date) state.reviewDay.done = 0;
    }
  }
  migrateMissedToSrs(state);
  return state;
}

// v5.1: the v5 `missed` array is superseded by `srs`. Every key it still holds
// (old localStorage, an old export someone imports) becomes a box-0 card due
// today, then the array is emptied. Runs on every state that comes from raw
// data, so there is nothing left to migrate the second time around.
function migrateMissedToSrs(target) {
  if (!Array.isArray(target.missed) || !target.missed.length) return target;
  const today = todayKey();
  for (const id of target.missed) {
    if (typeof id !== 'string' || !id || target.srs[id]) continue;
    target.srs[id] = { box: 0, due: today, reps: 0, lapses: 0 };
  }
  target.missed = [];
  return target;
}

// Set when the stored payload still carried v5 `missed` keys, so boot writes
// the migrated (v5.1) shape back exactly once.
let migratedOnLoad = false;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.missed) && parsed.missed.length) migratedOnLoad = true;
    return stateFromRaw(parsed);
  } catch (err) {
    console.warn('learn-ai: could not read progress, starting fresh.', err);
    return freshState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('learn-ai: could not save progress.', err);
  }
}

const state = loadState();

if (migratedOnLoad) saveState();

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function t() {
  return I18N[state.lang] || I18N.pl;
}

function tr(field) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[state.lang] || field.en || field.pl || '';
}

/* ------------------------------------------------------------ progress --- */

function keyOf(trackId, moduleId, lessonId) {
  return `${trackId}/${moduleId}/${lessonId}`;
}

function isDone(trackId, moduleId, lessonId) {
  return Boolean(state.done[keyOf(trackId, moduleId, lessonId)]);
}

function scoreOf(trackId, moduleId, lessonId) {
  const entry = state.done[keyOf(trackId, moduleId, lessonId)];
  return entry ? entry.score : null;
}

function markDone(trackId, moduleId, lessonId, score) {
  const key = keyOf(trackId, moduleId, lessonId);
  const prev = state.done[key];
  const best = Math.max(prev ? prev.score : 0, clamp(Math.round(score), 0, 100));
  state.done[key] = { score: best, at: new Date().toISOString() };
  if (!prev) bumpActivity();
  saveState();
  updateHeaderProgress();
}

/* ------------------------------------------------------ activity + srs --- */

function todayKey(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Local-date arithmetic, same YYYY-MM-DD alphabet as `activity` keys, so plain
// string comparison is a valid date comparison everywhere below.
function dayKeyPlus(days, from = new Date()) {
  const d = new Date(from.getTime());
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

function daysBetween(fromKey, toKey) {
  const a = new Date(`${fromKey}T00:00:00`);
  const b = new Date(`${toKey}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

// One "activity" = a completed lesson or a finished review/interview session.
function bumpActivity(n = 1) {
  const key = todayKey();
  state.activity[key] = (Number(state.activity[key]) || 0) + n;
  saveState();
}

/* --- SM-2 lite scheduling -------------------------------------------- */

function srsInterval(box) {
  return SRS_INTERVALS[clamp(Math.round(box) || 0, 0, SRS_BOX_MAX)];
}

function srsCard(id) {
  return state.srs[id] || null;
}

// A card is due when it has never been scheduled past today. New (unscheduled)
// cards are NOT due - the daily dose tops up with them separately.
function srsIsDue(id, today = todayKey()) {
  const card = state.srs[id];
  return Boolean(card) && card.due <= today;
}

// The whole scheduler: correct promotes one box and pushes the card that many
// days out, wrong resets to box 0 and makes it due again today (the caller also
// re-queues it inside the running session).
function srsGrade(id, correct) {
  const today = todayKey();
  const prev = state.srs[id];
  const card = prev
    ? { box: prev.box, due: prev.due, reps: prev.reps, lapses: prev.lapses }
    : { box: 0, due: today, reps: 0, lapses: 0 };

  if (correct) {
    card.box = Math.min(SRS_BOX_MAX, card.box + 1);
    card.reps += 1;
    card.due = dayKeyPlus(srsInterval(card.box));
  } else {
    card.box = 0;
    card.lapses += 1;
    card.due = today;
  }

  state.srs[id] = card;
  saveState();
  return card;
}

/* --- daily counter ---------------------------------------------------- */

// reviewDay is a "today only" counter: any stale date reads as zero.
function reviewDoneToday() {
  return state.reviewDay.date === todayKey() ? state.reviewDay.done : 0;
}

function addReviewDone(n) {
  const today = todayKey();
  if (state.reviewDay.date !== today) state.reviewDay = { date: today, done: 0 };
  state.reviewDay.done += n;
  saveState();
}

function unmarkDone(trackId, moduleId, lessonId) {
  delete state.done[keyOf(trackId, moduleId, lessonId)];
  saveState();
  updateHeaderProgress();
}

function pctOf(done, total) {
  return total ? Math.round((done / total) * 100) : 0;
}

function moduleProgress(trackId, mod) {
  const lessons = mod.lessons || [];
  const done = lessons.filter((l) => isDone(trackId, mod.id, l.id)).length;
  return { done, total: lessons.length, pct: pctOf(done, lessons.length) };
}

function trackProgress(trackId) {
  const lessons = trackLessons(trackId);
  const done = lessons.filter((x) => isDone(trackId, x.module.id, x.lesson.id)).length;
  return { done, total: lessons.length, pct: pctOf(done, lessons.length) };
}

// Overall progress counts AVAILABLE tracks only.
function overallProgress() {
  let done = 0;
  let total = 0;
  for (const track of availableTracks()) {
    const p = trackProgress(track.id);
    done += p.done;
    total += p.total;
  }
  return { done, total, pct: pctOf(done, total) };
}

function overallMinutes() {
  let minutes = 0;
  for (const track of availableTracks()) {
    for (const { lesson } of trackLessons(track.id)) minutes += lesson.minutes || 0;
  }
  return minutes;
}

function trackMinutes(trackId) {
  return trackLessons(trackId).reduce((n, { lesson }) => n + (lesson.minutes || 0), 0);
}

/* --------------------------------------------------------------- utils --- */

function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const enc = encodeURIComponent;

function trackHref(trackId) {
  return `#/t/${enc(trackId)}`;
}

// `mode` is the v5.1 endless flag: it rides in the hash so "keep going" is a
// plain link and every session view can be re-rendered from the URL alone.
function reviewHref(scope, mode) {
  if (!scope) return '#/review';
  const tail = mode === 'endless' ? '/endless' : '';
  if (scope.kind === 'all') return `#/review/all${tail}`;
  return `#/review/${enc(scope.trackId)}/${enc(scope.moduleId)}${tail}`;
}

function interviewHref(trackId) {
  return trackId ? `#/interview/${enc(trackId)}` : '#/interview';
}

function moduleHref(trackId, moduleId) {
  return `#/t/${enc(trackId)}/m/${enc(moduleId)}`;
}

function lessonHref(trackId, moduleId, lessonId) {
  return `#/t/${enc(trackId)}/l/${enc(moduleId)}/${enc(lessonId)}`;
}

/* -------------------------------------------------------------- router --- */

function parseHash() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean).map(decodeURIComponent);
  if (parts.length === 0) return { name: 'home' };

  // v1 legacy routes -> redirect into the default track.
  if (parts[0] === 'm' && parts[1]) {
    return { name: 'redirect', to: moduleHref(DEFAULT_TRACK_ID, parts[1]) };
  }
  if (parts[0] === 'l' && parts[1] && parts[2]) {
    return { name: 'redirect', to: lessonHref(DEFAULT_TRACK_ID, parts[1], parts[2]) };
  }

  // v5 modes. Without a scope segment they show their options screen; with one
  // they run a session, so "Again" is just a re-render of the same URL.
  if (parts[0] === 'review') {
    if (parts.length === 1) return { name: 'review', scope: null, mode: 'daily' };
    if (parts[1] === 'all') {
      return {
        name: 'review',
        scope: { kind: 'all' },
        mode: parts[2] === 'endless' ? 'endless' : 'daily',
      };
    }
    if (parts[1] && parts[2]) {
      return {
        name: 'review',
        scope: { kind: 'module', trackId: parts[1], moduleId: parts[2] },
        mode: parts[3] === 'endless' ? 'endless' : 'daily',
      };
    }
    return { name: 'review', scope: null, mode: 'daily' };
  }
  if (parts[0] === 'search') return { name: 'search' };
  if (parts[0] === 'interview') {
    if (parts.length === 1) return { name: 'interview', trackId: null };
    return { name: 'interview', trackId: parts[1] };
  }

  if (parts[0] === 't' && parts[1]) {
    const trackId = parts[1];
    if (parts.length === 2) return { name: 'track', trackId };
    if (parts[2] === 'm' && parts[3]) {
      return { name: 'module', trackId, moduleId: parts[3] };
    }
    if (parts[2] === 'l' && parts[3] && parts[4]) {
      return { name: 'lesson', trackId, moduleId: parts[3], lessonId: parts[4] };
    }
  }
  return { name: 'notfound' };
}

let lastRouteKey = '';

function render() {
  const main = $('#main');
  if (!main) return;
  const route = parseHash();

  if (route.name === 'redirect') {
    location.replace(`${location.pathname}${location.search}${route.to}`);
    return;
  }

  // Every render() replaces #main, so the reader never outlives the page it was
  // started on: this covers route changes and the language switch alike.
  ttsStop();

  const routeKey = JSON.stringify(route);
  const routeChanged = routeKey !== lastRouteKey;
  lastRouteKey = routeKey;

  // "Continue" needs a breadcrumb of where the learner actually was, so every
  // lesson view (not just navigation) refreshes lastVisited before drawing.
  if (route.name === 'lesson') noteVisit(route.trackId, route.moduleId, route.lessonId);

  document.documentElement.lang = state.lang;
  syncLangButtons();
  syncSearchButton();
  updateHeaderProgress();
  renderFooter(route.name === 'home');

  if (!TRACKS.length) {
    main.innerHTML = viewNoContent();
    return;
  }

  let html;
  if (route.name === 'home') html = viewHome();
  else if (route.name === 'track') html = viewTrack(route.trackId);
  else if (route.name === 'module') html = viewModule(route.trackId, route.moduleId);
  else if (route.name === 'lesson') html = viewLesson(route.trackId, route.moduleId, route.lessonId);
  else if (route.name === 'review') html = viewReview(route.scope, route.mode);
  else if (route.name === 'interview') html = viewInterview(route.trackId);
  else if (route.name === 'search') html = viewSearch();
  else html = viewNotFound();

  main.innerHTML = html;

  if (route.name === 'home') bindHome();
  if (route.name === 'search') bindSearch();
  if (route.name === 'lesson') bindLesson(route.trackId, route.moduleId, route.lessonId);
  if (route.name === 'review') bindReviewSession();
  if (route.name === 'interview') bindInterviewSession();
  animateBars(main);

  if (routeChanged) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    main.focus({ preventScroll: true });
  }
  document.title = pageTitle(route);
}

function pageTitle(route) {
  if (route.name === 'search') return `${t().searchTitle} - Learn AI`;
  if (route.name === 'review') return `${t().reviewTitle} - Learn AI`;
  if (route.name === 'interview') return `${t().interviewTitle} - Learn AI`;
  if (route.name === 'track') {
    const track = getTrack(route.trackId);
    if (track) return `${tr(track.title)} - Learn AI`;
  }
  if (route.name === 'module') {
    const found = getModule(route.trackId, route.moduleId);
    if (found) return `${tr(found.module.title)} - Learn AI`;
  }
  if (route.name === 'lesson') {
    const found = getLesson(route.trackId, route.moduleId, route.lessonId);
    if (found) return `${tr(found.lesson.title)} - Learn AI`;
  }
  return 'Learn AI';
}

function animateBars(root) {
  requestAnimationFrame(() => {
    $$('[data-pct]', root).forEach((el) => {
      el.style.width = `${el.dataset.pct}%`;
    });
    $$('[data-ring-offset]', root).forEach((el) => {
      el.style.strokeDashoffset = el.dataset.ringOffset;
    });
  });
}

/* --------------------------------------------------------------- views --- */

function viewHome() {
  const L = t();
  const { done, total, pct } = overallProgress();

  const cards = TRACKS.map((track) =>
    isAvailable(track) ? availableTrackCard(track, L) : comingSoonTrackCard(track, L)
  ).join('');

  return `
    <section class="view">
      <div class="hero">
        <span class="hero-eyebrow">${esc(L.eyebrow)}</span>
        <h1>${esc(L.heroTitle)}</h1>
        <p class="hero-sub">${esc(L.heroSub)}</p>
      </div>

      ${continueCard(L)}

      ${ringCard(L.yourProgress, L.lessonsDone(done, total), pct, L.totalMinutes(overallMinutes()))}

      ${streakCard(L)}

      ${modeCards(L)}

      <h2 class="section-title">${esc(L.tracksLabel)}</h2>
      <div class="card-list">${cards}</div>

      ${dataBlock(L)}
    </section>`;
}

// Home entry points for the two v5 practice modes.
function modeCards(L) {
  const interviewCount = interviewTrackIds().reduce((n, id) => {
    const bank = getInterviewBank(id);
    return n + (bank ? bank.questions.length : 0);
  }, 0);

  const dose = reviewDoseStatus();
  const stat = dose.finished ? L.reviewDoneToday : L.reviewDue(capCount(dose.waiting));

  return `
    <div class="mode-cards">
      <a class="mode-card${dose.finished ? ' is-review-done' : ''}" href="${reviewHref(null)}">
        <span class="mode-icon" aria-hidden="true">🔁</span>
        <span class="mode-body">
          <span class="mode-title">${esc(L.reviewTitle)}</span>
          <span class="mode-desc">${esc(L.reviewDesc)}</span>
          <span class="mode-stat">${esc(stat)}</span>
        </span>
        <span class="mode-chev" aria-hidden="true">›</span>
      </a>
      <a class="mode-card" href="${interviewHref(null)}">
        <span class="mode-icon" aria-hidden="true">🎤</span>
        <span class="mode-body">
          <span class="mode-title">${esc(L.interviewTitle)}</span>
          <span class="mode-desc">${esc(L.interviewDesc)}</span>
          <span class="mode-stat">${esc(L.interviewAllDesc(interviewCount))}</span>
        </span>
        <span class="mode-chev" aria-hidden="true">›</span>
      </a>
    </div>`;
}

function availableTrackCard(track, L) {
  const p = trackProgress(track.id);
  const complete = p.total > 0 && p.done === p.total;
  return `
    <a class="module-card track-card" href="${trackHref(track.id)}">
      <div class="module-head">
        <div class="module-icon" aria-hidden="true">${esc(track.icon || '📘')}</div>
        <div class="module-body">
          <div class="module-order">${esc(L.moduleCount((track.modules || []).length))}</div>
          <div class="module-title">${esc(tr(track.title))}${
            complete ? ' <span class="badge-done" aria-hidden="true">✓</span>' : ''
          }</div>
          <p class="module-desc">${esc(tr(track.description))}</p>
        </div>
      </div>
      <div class="module-foot">
        <span>${esc(L.lessonCount(p.total))}</span>
        <span class="bar${complete ? ' is-complete' : ''}"><i data-pct="${p.pct}"></i></span>
        <span>${p.done}/${p.total}</span>
      </div>
    </a>`;
}

function comingSoonTrackCard(track, L) {
  const planned = (track.planned || []).length;
  return `
    <a class="module-card track-card is-soon" href="${trackHref(track.id)}">
      <div class="module-head">
        <div class="module-icon" aria-hidden="true">${esc(track.icon || '📘')}</div>
        <div class="module-body">
          <div class="module-order">
            <span class="badge-soon">${esc(L.comingSoon)}</span>
          </div>
          <div class="module-title">${esc(tr(track.title))}</div>
          <p class="module-desc">${esc(tr(track.description))}</p>
        </div>
      </div>
      <div class="module-foot">
        <span>${esc(L.moduleCount(planned))}</span>
        <span class="soon-cta">${esc(L.seePlan)} ›</span>
      </div>
    </a>`;
}

function ringCard(title, sub, pct, extra) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return `
    <div class="progress-card">
      <div class="ring">
        <svg viewBox="0 0 72 72" role="img" aria-label="${esc(sub)}">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--accent)"/>
              <stop offset="100%" stop-color="var(--accent2)"/>
            </linearGradient>
          </defs>
          <circle class="ring-track" cx="36" cy="36" r="${r}"></circle>
          <circle class="ring-fill" cx="36" cy="36" r="${r}"
            stroke-dasharray="${c.toFixed(2)}"
            stroke-dashoffset="${c.toFixed(2)}"
            data-ring-offset="${offset.toFixed(2)}"></circle>
        </svg>
        <div class="ring-label">${pct}%</div>
      </div>
      <div class="progress-meta">
        <p class="progress-title">${esc(title)}</p>
        <p class="progress-sub">${esc(sub)}</p>
        ${extra ? `<p class="progress-sub">${esc(extra)}</p>` : ''}
      </div>
    </div>`;
}

function viewTrack(trackId) {
  const track = getTrack(trackId);
  if (!track) return viewNotFound();
  return isAvailable(track) ? viewTrackModules(track) : viewTrackPlanned(track);
}

function viewTrackModules(track) {
  const L = t();
  const p = trackProgress(track.id);

  const cards = (track.modules || [])
    .map((mod) => {
      const mp = moduleProgress(track.id, mod);
      const complete = mp.total > 0 && mp.done === mp.total;
      return `
        <a class="module-card" href="${moduleHref(track.id, mod.id)}">
          <div class="module-head">
            <div class="module-icon" aria-hidden="true">${esc(mod.icon || '📘')}</div>
            <div class="module-body">
              <div class="module-order">${String(mod.order).padStart(2, '0')}</div>
              <div class="module-title">${esc(tr(mod.title))}${
                complete ? ' <span class="badge-done" aria-hidden="true">✓</span>' : ''
              }</div>
              <p class="module-desc">${esc(tr(mod.description))}</p>
            </div>
          </div>
          <div class="module-foot">
            <span>${esc(L.lessonCount(mp.total))}</span>
            <span class="bar${complete ? ' is-complete' : ''}"><i data-pct="${mp.pct}"></i></span>
            <span>${mp.done}/${mp.total}</span>
          </div>
        </a>`;
    })
    .join('');

  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">${esc(track.icon || '📘')} ${esc(L.trackEyebrow)}</span>
        <h1>${esc(tr(track.title))}</h1>
        <p class="hero-sub">${esc(tr(track.description))}</p>
      </div>

      ${ringCard(L.yourProgress, L.lessonsDone(p.done, p.total), p.pct, L.totalMinutes(trackMinutes(track.id)))}

      <h2 class="section-title">${esc(L.modulesLabel)}</h2>
      <div class="card-list">${cards}</div>
    </section>`;
}

function viewTrackPlanned(track) {
  const L = t();
  const planned = track.planned || [];

  const items = planned.length
    ? planned
        .map(
          (item, i) => `
            <li class="planned-item">
              <span class="planned-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <span class="planned-body">
                <span class="planned-title">${esc(tr(item.title))}</span>
                <span class="planned-desc">${esc(tr(item.description))}</span>
              </span>
            </li>`
        )
        .join('')
    : `<li class="planned-item"><span class="planned-body"><span class="planned-desc">${esc(
        L.plannedEmpty
      )}</span></span></li>`;

  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">${esc(track.icon || '📘')} <span class="badge-soon">${esc(
          L.comingSoon
        )}</span></span>
        <h1>${esc(tr(track.title))}</h1>
        <p class="hero-sub">${esc(tr(track.description))}</p>
      </div>

      <div class="notice notice-soft">
        <p>${esc(L.comingSoonHint)}</p>
      </div>

      <h2 class="section-title">${esc(L.plannedLabel)}</h2>
      <ul class="planned-list">${items}</ul>
    </section>`;
}

function viewModule(trackId, moduleId) {
  const L = t();
  const found = getModule(trackId, moduleId);
  if (!found) return viewNotFound();
  const { track, module: mod } = found;
  const p = moduleProgress(track.id, mod);

  const items = (mod.lessons || [])
    .map((lesson, i) => {
      const done = isDone(track.id, mod.id, lesson.id);
      const score = scoreOf(track.id, mod.id, lesson.id);
      return `
        <li>
          <a class="lesson-item${done ? ' is-done' : ''}"
             href="${lessonHref(track.id, mod.id, lesson.id)}">
            <span class="lesson-check" aria-hidden="true">✓</span>
            <span class="lesson-main">
              <span class="lesson-name">${i + 1}. ${esc(tr(lesson.title))}</span>
              <span class="lesson-meta">
                <span>${esc(L.minutesShort(lesson.minutes || 5))}</span>
                ${score != null ? `<span class="lesson-score">${esc(L.bestScore(score))}</span>` : ''}
              </span>
            </span>
            <span class="lesson-chev" aria-hidden="true">›</span>
          </a>
        </li>`;
    })
    .join('');

  return `
    <section class="view">
      <a class="back-link" href="${trackHref(track.id)}">← ${esc(tr(track.title))}</a>
      <div class="hero">
        <span class="hero-eyebrow">${esc(mod.icon || '📘')} ${esc(L.modulesLabel)} ${String(mod.order).padStart(2, '0')}</span>
        <h1>${esc(tr(mod.title))}</h1>
        <p class="hero-sub">${esc(tr(mod.description))}</p>
      </div>

      ${ringCard(L.yourProgress, `${p.done}/${p.total} ${L.done}`, p.pct, '')}

      ${
        p.done > 0
          ? `<div class="module-actions">
               <a class="btn btn-primary btn-block" href="${reviewHref({
                 kind: 'module',
                 trackId: track.id,
                 moduleId: mod.id,
               })}">🔁 ${esc(L.reviewModuleCta)}</a>
             </div>`
          : ''
      }

      <h2 class="section-title">${esc(L.lessonsLabel)}</h2>
      <ul class="lesson-list">${items}</ul>
    </section>`;
}

function viewLesson(trackId, moduleId, lessonId) {
  const L = t();
  const found = getLesson(trackId, moduleId, lessonId);
  if (!found) return viewNotFound();
  const { track, module: mod, lesson } = found;

  const flat = trackLessons(track.id);
  const idx = flat.findIndex((x) => x.module.id === moduleId && x.lesson.id === lessonId);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;

  const level = LEVELS.includes(state.level) ? state.level : 'eli5';
  const tabs = LEVELS.map(
    (lv) => `
      <button type="button" class="tab" role="tab" data-level="${lv}"
        aria-selected="${lv === level}" id="tab-${lv}" aria-controls="level-panel">
        ${esc(L.levels[lv])}
      </button>`
  ).join('');

  const done = isDone(track.id, mod.id, lesson.id);
  const score = scoreOf(track.id, mod.id, lesson.id);

  return `
    <section class="view">
      <div class="crumbs">
        <a href="${trackHref(track.id)}">${esc(tr(track.title))}</a>
        <span aria-hidden="true">/</span>
        <a href="${moduleHref(track.id, mod.id)}">${esc(tr(mod.title))}</a>
      </div>

      <div class="lesson-header">
        <h1>${esc(tr(lesson.title))}</h1>
        <div class="lesson-tagline">
          <span>${esc(L.minutesShort(lesson.minutes || 5))}</span>
          ${done ? `<span class="lesson-score">✓ ${esc(L.completed)}${score != null ? ` · ${esc(L.bestScore(score))}` : ''}</span>` : ''}
        </div>
      </div>

      <div class="tabs" role="tablist" aria-label="${esc(L.levelAria)}">${tabs}</div>

      ${renderTts()}

      ${renderDiagram(lesson)}

      ${renderInteractive(lesson)}

      <article class="prose" id="level-panel" role="tabpanel" aria-labelledby="tab-${level}">
        ${levelHtml(lesson, level)}
      </article>

      ${renderQuiz(track, mod, lesson)}

      <nav class="lesson-nav" aria-label="${esc(L.lessonsLabel)}">
        ${
          prev
            ? `<a class="nav-card is-prev" href="${lessonHref(track.id, prev.module.id, prev.lesson.id)}">
                 <span class="nav-dir">← ${esc(L.prev)}</span>
                 <span class="nav-title">${esc(tr(prev.lesson.title))}</span>
               </a>`
            : '<span class="nav-card nav-empty" aria-hidden="true"></span>'
        }
        ${
          next
            ? `<a class="nav-card is-next" href="${lessonHref(track.id, next.module.id, next.lesson.id)}">
                 <span class="nav-dir">${esc(L.next)} →</span>
                 <span class="nav-title">${esc(tr(next.lesson.title))}</span>
               </a>`
            : '<span class="nav-card nav-empty" aria-hidden="true"></span>'
        }
      </nav>
    </section>`;
}

function levelHtml(lesson, level) {
  const levels = lesson.levels || {};
  const entry = levels[level] || levels.school || levels.eli5 || levels.pro;
  const html = tr(entry);
  return html || '<p></p>';
}

function renderDiagram(lesson) {
  const d = lesson.diagram;
  if (!d || typeof d.svg !== 'string' || !d.svg.trim().startsWith('<svg')) return '';
  const caption = tr(d.caption);
  return `
    <figure class="diagram">
      <div class="diagram-svg">${d.svg}</div>
      ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
    </figure>`;
}

/* --------------------------------------------- interactive frames player -- */

// Returns the frames of a valid `interactive` block, or [] when the lesson has
// none / it is malformed. Keeps every consumer below free of defensive checks.
function interactiveFrames(lesson) {
  const it = lesson && lesson.interactive;
  if (!it || it.kind !== 'frames' || !Array.isArray(it.frames)) return [];
  return it.frames.filter(
    (f) => f && typeof f.svg === 'string' && f.svg.trim().startsWith('<svg')
  );
}

function renderInteractive(lesson) {
  const L = t();
  const frames = interactiveFrames(lesson);
  if (frames.length < 2) return '';
  const caption = tr(lesson.interactive.caption);
  const last = frames.length - 1;

  return `
    <figure class="player" data-player>
      <div class="player-head">
        <h2 class="player-title">${esc(L.interactiveTitle)}</h2>
        <span class="player-step" data-player-step>${esc(L.frameOf(1, frames.length))}</span>
      </div>

      <div class="player-stage" data-player-stage aria-live="polite">${frames[0].svg}</div>

      <div class="player-controls">
        <button type="button" class="player-btn" data-player-nav="-1"
          aria-label="${esc(L.framePrev)}" title="${esc(L.framePrev)}" disabled>‹</button>
        <input class="player-range" type="range" min="0" max="${last}" step="1" value="0"
          data-player-range aria-label="${esc(L.frameSlider)}">
        <button type="button" class="player-btn" data-player-nav="1"
          aria-label="${esc(L.frameNext)}" title="${esc(L.frameNext)}">›</button>
      </div>

      <div class="player-dots" aria-hidden="true">${frames
        .map((_, i) => `<span class="player-dot${i === 0 ? ' is-on' : ''}" data-player-dot="${i}"></span>`)
        .join('')}</div>

      <div class="player-info">
        <p class="player-label" data-player-label>${esc(tr(frames[0].label))}</p>
        <p class="player-note" data-player-note>${esc(tr(frames[0].note))}</p>
      </div>

      ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
      <p class="player-hint">${esc(L.interactiveHint)}</p>
    </figure>`;
}

// Binds the player that render() just wrote into #main. Every listener lives on
// nodes inside that subtree, so the next innerHTML swap drops them with the DOM
// (no manual teardown, no leaks) - same lifecycle as the quiz binding.
function bindInteractive(lesson) {
  const root = $('[data-player]');
  if (!root) return;
  const frames = interactiveFrames(lesson);
  if (frames.length < 2) return;

  const L = t();
  const last = frames.length - 1;
  const stage = $('[data-player-stage]', root);
  // Every other node below is optional, but the stage is what the player IS -
  // without it show() would throw and take the rest of bindLesson (quiz, TTS)
  // down with it.
  if (!stage) return;
  const range = $('[data-player-range]', root);
  const stepEl = $('[data-player-step]', root);
  const labelEl = $('[data-player-label]', root);
  const noteEl = $('[data-player-note]', root);
  const dots = $$('[data-player-dot]', root);
  let index = 0;

  function show(next) {
    const i = clamp(Math.round(Number(next) || 0), 0, last);
    if (i === index && stage.dataset.frame === String(i)) return;
    index = i;
    const frame = frames[i];
    stage.dataset.frame = String(i);
    stage.innerHTML = frame.svg;
    if (labelEl) labelEl.textContent = tr(frame.label);
    if (noteEl) noteEl.textContent = tr(frame.note);
    if (stepEl) stepEl.textContent = L.frameOf(i + 1, frames.length);
    if (range && Number(range.value) !== i) range.value = String(i);
    dots.forEach((d, di) => d.classList.toggle('is-on', di === i));
    $$('[data-player-nav]', root).forEach((btn) => {
      const dir = Number(btn.dataset.playerNav);
      btn.disabled = dir < 0 ? i === 0 : i === last;
    });
  }

  show(0);

  root.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-player-nav]');
    if (!btn || btn.disabled) return;
    show(index + Number(btn.dataset.playerNav));
  });

  if (range) {
    range.addEventListener('input', () => show(range.value));
  }

  // Arrow keys work whenever focus is inside the player (buttons, slider, stage).
  root.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      if (ev.target === range) return; // the range input handles those natively
      ev.preventDefault();
      show(index + (ev.key === 'ArrowLeft' ? -1 : 1));
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      show(0);
    } else if (ev.key === 'End') {
      ev.preventDefault();
      show(last);
    }
  });

  // Bonus: horizontal swipe on the stage.
  let startX = null;
  let startY = null;
  stage.addEventListener(
    'touchstart',
    (ev) => {
      const touch = ev.touches && ev.touches[0];
      startX = touch ? touch.clientX : null;
      startY = touch ? touch.clientY : null;
    },
    { passive: true }
  );
  stage.addEventListener(
    'touchend',
    (ev) => {
      if (startX == null) return;
      const touch = ev.changedTouches && ev.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );
}

/* --------------------------------------------- v5: listening mode (TTS) -- */

const TTS_RATES = [0.9, 1, 1.2];
// Chrome cuts long utterances off; paragraph chunks stay well under the limit
// and long paragraphs get split again on sentence boundaries.
const TTS_CHUNK_MAX = 280;

const tts = {
  rate: 1,
  chunks: [],
  index: 0,
  status: 'idle', // 'idle' | 'playing' | 'paused'
  gen: 0, // bumped on every stop/start so stale utterance callbacks are ignored
};

// The only place that touches the Web Speech API surface. Returns null when the
// browser has no speechSynthesis - every caller then degrades to "no toolbar".
function speechApi() {
  if (typeof window === 'undefined') return null;
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') return null;
  return synth;
}

function ttsLangTag() {
  return state.lang === 'pl' ? 'pl-PL' : 'en-US';
}

// First voice whose lang matches the UI language (exact tag wins over the bare
// language prefix); null -> the platform default voice reads it.
function ttsVoice() {
  const synth = speechApi();
  if (!synth || typeof synth.getVoices !== 'function') return null;
  let voices = [];
  try {
    voices = synth.getVoices() || [];
  } catch (err) {
    return null;
  }
  const tag = ttsLangTag().toLowerCase();
  const prefix = tag.slice(0, 2);
  const norm = (v) => String(v.lang || '').toLowerCase().replace('_', '-');
  return (
    voices.find((v) => norm(v) === tag) ||
    voices.find((v) => norm(v).startsWith(prefix)) ||
    null
  );
}

function ttsSplitLong(text) {
  if (text.length <= TTS_CHUNK_MAX) return [text];
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const out = [];
  let buf = '';
  for (const sentence of sentences) {
    if (buf && (buf + sentence).length > TTS_CHUNK_MAX) {
      out.push(buf.trim());
      buf = '';
    }
    buf += sentence;
    while (buf.length > TTS_CHUNK_MAX) {
      out.push(buf.slice(0, TTS_CHUNK_MAX).trim());
      buf = buf.slice(TTS_CHUNK_MAX);
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out.filter(Boolean);
}

// Lesson title + the ACTIVE level, tags stripped, one chunk per block element.
function ttsChunksFor(lesson, level) {
  const blocks = String(levelHtml(lesson, level))
    .replace(/<\/(p|li|h2|h3|h4|blockquote|tr|pre)>/gi, '\n\n')
    .split(/\n{2,}/)
    .map(stripTags)
    .filter(Boolean);
  const title = stripTags(tr(lesson.title));
  const all = title ? [title].concat(blocks) : blocks;
  return all.reduce((acc, part) => acc.concat(ttsSplitLong(part)), []);
}

function ttsStop() {
  const synth = speechApi();
  tts.gen += 1;
  tts.status = 'idle';
  tts.chunks = [];
  tts.index = 0;
  if (synth) {
    try {
      synth.cancel();
    } catch (err) {
      /* nothing to cancel */
    }
  }
  ttsSyncUi();
}

function ttsSpeakFrom(i) {
  const synth = speechApi();
  if (!synth) return;
  if (i >= tts.chunks.length) {
    ttsStop();
    return;
  }
  tts.index = i;
  const gen = tts.gen;
  const utter = new window.SpeechSynthesisUtterance(tts.chunks[i]);
  const voice = ttsVoice();
  if (voice) utter.voice = voice;
  utter.lang = voice ? voice.lang : ttsLangTag();
  utter.rate = tts.rate;
  utter.onend = () => {
    if (gen !== tts.gen || tts.status === 'idle') return;
    ttsSpeakFrom(i + 1);
  };
  utter.onerror = () => {
    if (gen !== tts.gen) return;
    ttsStop();
  };
  try {
    synth.speak(utter);
  } catch (err) {
    ttsStop();
  }
}

function ttsStart(lesson, level) {
  const synth = speechApi();
  if (!synth) return;
  const chunks = ttsChunksFor(lesson, level);
  if (!chunks.length) return;
  tts.gen += 1;
  try {
    synth.cancel();
  } catch (err) {
    /* nothing to cancel */
  }
  tts.chunks = chunks;
  tts.status = 'playing';
  ttsSyncUi();
  ttsSpeakFrom(0);
}

// Keeps the toolbar in sync with the engine. No-op when the lesson view (and
// with it the toolbar) is gone - the DOM is the single source of truth.
function ttsSyncUi() {
  const root = $('[data-tts]');
  if (!root) return;
  const L = t();
  const toggle = $('[data-tts-toggle]', root);
  const stop = $('[data-tts-stop]', root);
  const playing = tts.status === 'playing';
  const label = playing ? L.ttsPause : tts.status === 'paused' ? L.ttsResume : L.ttsPlay;
  if (toggle) {
    toggle.textContent = playing ? '⏸' : '▶';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.setAttribute('aria-pressed', String(playing));
  }
  if (stop) stop.disabled = tts.status === 'idle';
  root.classList.toggle('is-active', tts.status !== 'idle');
}

function renderTts() {
  if (!speechApi()) return '';
  const L = t();
  const options = TTS_RATES.map(
    (r) => `<option value="${r}"${r === tts.rate ? ' selected' : ''}>${r}x</option>`
  ).join('');
  return `
    <div class="tts" data-tts>
      <span class="tts-label">🎧 ${esc(L.ttsLabel)}</span>
      <button type="button" class="tts-btn" data-tts-toggle aria-pressed="false"
        aria-label="${esc(L.ttsPlay)}" title="${esc(L.ttsPlay)}">▶</button>
      <button type="button" class="tts-btn" data-tts-stop disabled
        aria-label="${esc(L.ttsStop)}" title="${esc(L.ttsStop)}">■</button>
      <select class="tts-rate" data-tts-rate aria-label="${esc(L.ttsRate)}">${options}</select>
    </div>`;
}

// Same lifecycle as the other lesson widgets: listeners live on nodes inside
// #main, so the next render() drops them together with the toolbar.
function bindTts(lesson) {
  const root = $('[data-tts]');
  if (!root) return;
  const synth = speechApi();
  if (!synth) return;

  const currentLevel = () => (LEVELS.includes(state.level) ? state.level : 'eli5');

  const toggle = $('[data-tts-toggle]', root);
  if (toggle) {
    toggle.addEventListener('click', () => {
      if (tts.status === 'playing') {
        tts.status = 'paused';
        try {
          synth.pause();
        } catch (err) {
          ttsStop();
          return;
        }
        ttsSyncUi();
        return;
      }
      if (tts.status === 'paused') {
        tts.status = 'playing';
        try {
          synth.resume();
        } catch (err) {
          ttsStop();
          return;
        }
        ttsSyncUi();
        return;
      }
      ttsStart(lesson, currentLevel());
    });
  }

  const stop = $('[data-tts-stop]', root);
  if (stop) stop.addEventListener('click', ttsStop);

  const rate = $('[data-tts-rate]', root);
  if (rate) {
    rate.addEventListener('change', () => {
      const value = Number(rate.value);
      tts.rate = TTS_RATES.includes(value) ? value : 1;
      // Rate only applies to a fresh utterance, so restart the current chunk.
      if (tts.status !== 'idle') {
        const from = tts.index;
        const chunks = tts.chunks;
        tts.gen += 1;
        try {
          synth.cancel();
        } catch (err) {
          /* nothing to cancel */
        }
        tts.chunks = chunks;
        tts.status = 'playing';
        ttsSyncUi();
        ttsSpeakFrom(from);
      }
    });
  }

  ttsSyncUi();
}

function viewNotFound() {
  const L = t();
  return `
    <section class="view">
      <div class="notice">
        <h2>${esc(L.notFoundTitle)}</h2>
        <p>${esc(L.notFoundBody)}</p>
        <a class="btn btn-primary" href="#/">${esc(L.backHome)}</a>
      </div>
    </section>`;
}

function viewNoContent() {
  const L = t();
  return `
    <section class="view">
      <div class="notice">
        <h2>${esc(L.noContentTitle)}</h2>
        <p>${esc(L.noContentBody)}</p>
      </div>
    </section>`;
}

/* ---------------------------------------------------------------- quiz --- */

function renderQuiz(track, mod, lesson) {
  const L = t();
  const quiz = Array.isArray(lesson.quiz) ? lesson.quiz : [];
  const done = isDone(track.id, mod.id, lesson.id);

  if (!quiz.length) {
    return `
      <section class="quiz" data-quiz>
        <div class="quiz-head"><h2>${esc(L.quizTitle)}</h2></div>
        <div class="quiz-actions">${markButton(done, L)}</div>
      </section>`;
  }

  const questions = quiz
    .map((item, qi) => {
      const options = (item.options || [])
        .map(
          (opt, oi) => `
            <button type="button" class="option" data-q="${qi}" data-o="${oi}">
              <span class="option-key" aria-hidden="true">${String.fromCharCode(65 + oi)}</span>
              <span class="option-text">${tr(opt)}</span>
            </button>`
        )
        .join('');
      return `
        <div class="q" data-question="${qi}">
          <p class="q-text"><span class="q-num" aria-hidden="true">${qi + 1}</span>${tr(item.q)}</p>
          <div class="options" role="group">${options}</div>
          <div class="explain-slot"></div>
        </div>`;
    })
    .join('');

  return `
    <section class="quiz" data-quiz>
      <div class="quiz-head">
        <h2>${esc(L.quizTitle)}</h2>
        <span class="quiz-count" data-quiz-count>${esc(L.quizProgress(0, quiz.length))}</span>
      </div>
      <p class="quiz-intro">${esc(L.quizIntro)}</p>
      ${questions}
      <div data-quiz-result></div>
      <div class="quiz-actions">
        <button type="button" class="btn btn-block" data-action="retry" hidden>${esc(L.tryAgain)}</button>
        ${markButton(done, L)}
      </div>
    </section>`;
}

function markButton(done, L) {
  return done
    ? `<button type="button" class="btn btn-ok btn-block" data-action="unmark">✓ ${esc(L.markedDone)}</button>`
    : `<button type="button" class="btn btn-primary btn-block" data-action="mark">${esc(L.markDone)}</button>`;
}

function bindLesson(trackId, moduleId, lessonId) {
  const found = getLesson(trackId, moduleId, lessonId);
  if (!found) return;
  const { track, module: mod, lesson } = found;
  const L = t();

  // Level tabs
  $$('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lv = btn.dataset.level;
      if (!LEVELS.includes(lv) || lv === state.level) return;
      ttsStop(); // the reader is tied to the level it started on
      state.level = lv;
      saveState();
      $$('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.level === lv)));
      const panel = $('#level-panel');
      if (panel) {
        panel.innerHTML = levelHtml(lesson, lv);
        panel.setAttribute('aria-labelledby', `tab-${lv}`);
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      }
    });
  });

  bindInteractive(lesson);
  bindTts(lesson);

  const quizEl = $('[data-quiz]');
  if (!quizEl) return;

  const quiz = Array.isArray(lesson.quiz) ? lesson.quiz : [];
  const answers = new Array(quiz.length).fill(null);

  quizEl.addEventListener('click', (ev) => {
    const opt = ev.target.closest('.option');
    if (opt && !opt.disabled) {
      answerQuestion(Number(opt.dataset.q), Number(opt.dataset.o));
      return;
    }
    const action = ev.target.closest('[data-action]');
    if (!action) return;
    if (action.dataset.action === 'retry') resetQuiz();
    if (action.dataset.action === 'mark') {
      markDone(track.id, mod.id, lesson.id, 100);
      refreshMarkButton();
    }
    if (action.dataset.action === 'unmark') {
      unmarkDone(track.id, mod.id, lesson.id);
      refreshMarkButton();
    }
  });

  function answerQuestion(qi, oi) {
    if (!Number.isInteger(qi) || !Number.isInteger(oi)) return;
    if (answers[qi] != null) return;
    const item = quiz[qi];
    if (!item) return;
    answers[qi] = oi;

    const correct = Number(item.correct);
    const wrapper = quizEl.querySelector(`[data-question="${qi}"]`);
    if (!wrapper) return;

    $$('.option', wrapper).forEach((btn) => {
      const bi = Number(btn.dataset.o);
      btn.disabled = true;
      if (bi === correct) btn.classList.add('is-correct');
      else if (bi === oi) btn.classList.add('is-wrong');
      else btn.classList.add('is-dim');
    });

    const isRight = oi === correct;
    const slot = $('.explain-slot', wrapper);
    if (slot) {
      slot.innerHTML = `
        <div class="explain ${isRight ? 'is-correct' : 'is-wrong'}">
          <strong>${esc(isRight ? L.correct : L.wrong)}</strong>
          ${tr(item.explain)}
        </div>`;
    }

    updateCount();
    if (answers.every((a) => a != null)) finishQuiz();
  }

  function updateCount() {
    const el = $('[data-quiz-count]', quizEl);
    if (el) el.textContent = L.quizProgress(answers.filter((a) => a != null).length, quiz.length);
  }

  function finishQuiz() {
    const right = quiz.reduce((n, item, i) => n + (answers[i] === Number(item.correct) ? 1 : 0), 0);
    const pct = quiz.length ? Math.round((right / quiz.length) * 100) : 0;
    const pass = pct >= PASS_SCORE;

    const slot = $('[data-quiz-result]', quizEl);
    if (slot) {
      slot.innerHTML = `
        <div class="quiz-result ${pass ? 'is-pass' : 'is-fail'}">
          <div class="quiz-score">${pct}%</div>
          <p class="quiz-verdict">${esc(L.yourScore)}: ${right}/${quiz.length} · ${esc(pass ? L.passed : L.failed)}</p>
        </div>`;
    }

    const retry = quizEl.querySelector('[data-action="retry"]');
    if (retry) retry.hidden = false;

    if (pass) {
      markDone(track.id, mod.id, lesson.id, pct);
      refreshMarkButton();
    }
  }

  function resetQuiz() {
    for (let i = 0; i < answers.length; i += 1) answers[i] = null;
    $$('.option', quizEl).forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove('is-correct', 'is-wrong', 'is-dim');
    });
    $$('.explain-slot', quizEl).forEach((el) => {
      el.innerHTML = '';
    });
    const slot = $('[data-quiz-result]', quizEl);
    if (slot) slot.innerHTML = '';
    const retry = quizEl.querySelector('[data-action="retry"]');
    if (retry) retry.hidden = true;
    updateCount();
    quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function refreshMarkButton() {
    const actions = $('.quiz-actions', quizEl);
    if (!actions) return;
    const old = actions.querySelector('[data-action="mark"], [data-action="unmark"]');
    if (!old) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = markButton(isDone(track.id, mod.id, lesson.id), L);
    const fresh = tmp.firstElementChild;
    if (fresh) actions.replaceChild(fresh, old);
    updateLessonHeaderState();
  }

  function updateLessonHeaderState() {
    const tagline = $('.lesson-tagline');
    if (!tagline) return;
    const existing = tagline.querySelector('.lesson-score');
    if (existing) existing.remove();
    if (isDone(track.id, mod.id, lesson.id)) {
      const score = scoreOf(track.id, mod.id, lesson.id);
      const span = document.createElement('span');
      span.className = 'lesson-score';
      span.textContent = `✓ ${L.completed}${score != null ? ` · ${L.bestScore(score)}` : ''}`;
      tagline.appendChild(span);
    }
  }
}

/* ------------------------------------------- v5: review + interview ------ */

const SESSION_SIZE = 10;
const REVIEW_DOSE = 10; // cards per daily dose and per endless round
const INTERVIEW_AGAIN_PICK = 4;

// The items the currently rendered session view wrote into #main. bind* reads
// this instead of re-drawing (a second draw would be a different random set).
let sessionItems = [];

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/* --- review ---------------------------------------------------------- */

// Every module of an available track with at least one completed lesson.
function reviewableModules() {
  const out = [];
  for (const track of availableTracks()) {
    for (const mod of track.modules || []) {
      const lessons = mod.lessons || [];
      const done = lessons.filter((l) => isDone(track.id, mod.id, l.id)).length;
      if (done > 0) out.push({ track, module: mod, done, total: lessons.length });
    }
  }
  return out;
}

function completedLessonCount() {
  return reviewableModules().reduce((n, entry) => n + entry.done, 0);
}

// Flat pool of quiz questions from COMPLETED lessons inside the scope.
function reviewPool(scope) {
  const pool = [];
  for (const track of availableTracks()) {
    if (scope.kind === 'module' && track.id !== scope.trackId) continue;
    for (const mod of track.modules || []) {
      if (scope.kind === 'module' && mod.id !== scope.moduleId) continue;
      for (const lesson of mod.lessons || []) {
        if (!isDone(track.id, mod.id, lesson.id)) continue;
        (lesson.quiz || []).forEach((question, qi) => {
          if (!question || !Array.isArray(question.options)) return;
          pool.push({
            id: `${track.id}/${mod.id}/${lesson.id}/${qi}`,
            kind: 'choice',
            question,
            track,
            module: mod,
            lesson,
          });
        });
      }
    }
  }
  return pool;
}

// Splits the scope's cards into the three buckets the scheduler cares about:
// due (or overdue), never-seen, and scheduled for a later day.
function reviewBuckets(scope) {
  const pool = reviewPool(scope);
  const today = todayKey();
  const due = [];
  const fresh = [];
  const later = [];

  for (const item of pool) {
    if (!state.srs[item.id]) fresh.push(item);
    else if (srsIsDue(item.id, today)) due.push(item);
    else later.push(item);
  }

  // Oldest due date first; same day -> weakest box first.
  due.sort((a, b) => {
    const ca = state.srs[a.id];
    const cb = state.srs[b.id];
    return ca.due < cb.due ? -1 : ca.due > cb.due ? 1 : ca.box - cb.box || (a.id < b.id ? -1 : 1);
  });
  // Weakest first, then whatever comes back soonest.
  later.sort((a, b) => {
    const ca = state.srs[a.id];
    const cb = state.srs[b.id];
    return ca.box - cb.box || (ca.due < cb.due ? -1 : ca.due > cb.due ? 1 : a.id < b.id ? -1 : 1);
  });

  return { pool, due, fresh, later };
}

// Daily dose: due first (oldest first), topped up with new cards. Endless
// rounds fall through to the weakest scheduled cards once those run out.
function buildReviewRound(scope, mode) {
  const { pool, due, fresh, later } = reviewBuckets(scope);
  const ordered =
    mode === 'endless'
      ? due.concat(shuffle(fresh), later)
      : due.concat(shuffle(fresh));
  return {
    items: ordered.slice(0, REVIEW_DOSE),
    poolSize: pool.length,
    dueCount: due.length,
    newCount: fresh.length,
  };
}

// What the home card reports: how many cards wait today across every track,
// and whether the daily dose counts as done.
function reviewDoseStatus() {
  const { pool, due, fresh } = reviewBuckets({ kind: 'all' });
  const waiting = due.length + fresh.length;
  const doneToday = reviewDoneToday();
  return {
    poolSize: pool.length,
    due: due.length,
    fresh: fresh.length,
    waiting,
    doneToday,
    finished: pool.length > 0 && (waiting === 0 || doneToday >= REVIEW_DOSE),
  };
}

function capCount(n) {
  return n > 99 ? '99+' : String(n);
}

function scopeTitle(scope) {
  const L = t();
  if (!scope || scope.kind === 'all') return L.reviewAll;
  const found = getModule(scope.trackId, scope.moduleId);
  return found ? tr(found.module.title) : L.reviewAll;
}

function viewReview(scope, mode) {
  return scope
    ? viewReviewSession(scope, mode === 'endless' ? 'endless' : 'daily')
    : viewReviewOptions();
}

function viewReviewOptions() {
  const L = t();
  const modules = reviewableModules();

  if (!modules.length) {
    return `
      <section class="view">
        <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
        <div class="notice">
          <h2>${esc(L.reviewEmptyTitle)}</h2>
          <p>${esc(L.reviewEmptyBody)}</p>
          <a class="btn btn-primary" href="#/">${esc(L.reviewGoCourses)}</a>
        </div>
      </section>`;
  }

  const byTrack = new Map();
  for (const entry of modules) {
    if (!byTrack.has(entry.track.id)) byTrack.set(entry.track.id, { track: entry.track, rows: [] });
    byTrack.get(entry.track.id).rows.push(entry);
  }

  const groups = Array.from(byTrack.values())
    .map(
      (group) => `
        <div class="scope-group">
          <h3 class="scope-group-title">${esc(group.track.icon || '📘')} ${esc(tr(group.track.title))}</h3>
          <ul class="scope-list">
            ${group.rows
              .map(
                (row) => `
                  <li>
                    <a class="scope-item" href="${reviewHref({
                      kind: 'module',
                      trackId: row.track.id,
                      moduleId: row.module.id,
                    })}">
                      <span class="scope-icon" aria-hidden="true">${esc(row.module.icon || '📘')}</span>
                      <span class="scope-main">
                        <span class="scope-name">${esc(tr(row.module.title))}</span>
                        <span class="scope-meta">${esc(L.reviewModuleDone(row.done, row.total))}</span>
                      </span>
                      <span class="lesson-chev" aria-hidden="true">›</span>
                    </a>
                  </li>`
              )
              .join('')}
          </ul>
        </div>`
    )
    .join('');

  const dose = reviewDoseStatus();

  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">🔁 ${esc(L.reviewTitle)}</span>
        <h1>${esc(L.reviewTitle)}</h1>
        <p class="hero-sub">${esc(L.reviewDesc)}</p>
      </div>

      ${
        dose.waiting === 0
          ? `<div class="notice notice-soft">
               <p><strong>${esc(L.reviewAllDoneTitle)}</strong></p>
               <p>${esc(L.reviewAllDoneBody)}</p>
             </div>`
          : ''
      }

      <h2 class="section-title">${esc(L.reviewScopeLabel)}</h2>
      <a class="scope-item scope-all" href="${reviewHref({ kind: 'all' })}">
        <span class="scope-icon" aria-hidden="true">🌍</span>
        <span class="scope-main">
          <span class="scope-name">${esc(L.reviewAll)}</span>
          <span class="scope-meta">${esc(L.reviewDue(capCount(dose.waiting)))} · ${esc(
            L.reviewAllDesc(completedLessonCount())
          )}</span>
        </span>
        <span class="lesson-chev" aria-hidden="true">›</span>
      </a>

      <div class="review-actions">
        <a class="btn btn-block" href="${reviewHref({ kind: 'all' }, 'endless')}">∞ ${esc(
          L.reviewEndless
        )}</a>
        <p class="review-hint">${esc(L.reviewEndlessHint)}</p>
      </div>

      <h2 class="section-title">${esc(L.reviewPickModule)}</h2>
      ${groups}
    </section>`;
}

// The running round. viewReviewSession() fills it, bindReviewSession() drives
// it; the next render() replaces #main and with it every listener, so a stale
// session object is simply overwritten.
let reviewSession = null;

function viewReviewSession(scope, mode) {
  const L = t();
  const round = buildReviewRound(scope, mode);
  reviewSession = null;

  if (!round.poolSize) {
    return reviewNoticeView(L.reviewEmptyTitle, L.reviewNoQuestions, '');
  }

  // Daily dose with nothing due and nothing new: everything is scheduled for a
  // later day. Endless mode never lands here (it also serves scheduled cards).
  if (!round.items.length) {
    return reviewNoticeView(
      L.reviewAllDoneTitle,
      L.reviewAllDoneBody,
      `<a class="btn btn-primary btn-block" href="${reviewHref(scope, 'endless')}">∞ ${esc(
        L.reviewEndless
      )}</a>`
    );
  }

  reviewSession = {
    scope,
    mode,
    round: 1,
    queue: round.items.slice(),
    index: 0,
    results: [], // { item, ok } - first attempt per card, in answer order
    recorded: new Set(),
    repeated: new Set(),
    answeredCurrent: false,
  };

  return `
    <section class="view">
      <a class="back-link" href="${reviewHref(null)}">← ${esc(L.reviewScopeLabel)}</a>
      <div class="hero">
        <span class="hero-eyebrow">🔁 ${esc(L.reviewTitle)}</span>
        <h1>${esc(scopeTitle(scope))}</h1>
        <p class="hero-sub">${esc(L.reviewSessionIntro)}</p>
      </div>

      ${
        round.poolSize < SESSION_SIZE
          ? `<div class="notice notice-soft"><p>${esc(L.reviewPoolSmall(round.poolSize))}</p></div>`
          : ''
      }

      <section class="quiz" data-session="review">
        <div class="quiz-head">
          <h2 data-review-head>${esc(
            mode === 'endless' ? L.reviewRound(1) : L.reviewDoseTitle
          )}</h2>
          <span class="quiz-count" data-session-count>${esc(
            L.reviewCardOf(1, round.items.length)
          )}</span>
        </div>
        <div data-review-card>${reviewCardHtml(round.items[0], {
          index: 0,
          isNew: !srsCard(round.items[0].id),
          isRepeat: false,
        }, L)}</div>
        <div data-session-result></div>
        <div class="quiz-actions" data-review-actions></div>
      </section>
    </section>`;
}

// Shared shell for the review dead ends (no questions in scope / nothing due).
function reviewNoticeView(title, body, extraCta) {
  const L = t();
  return `
    <section class="view">
      <a class="back-link" href="${reviewHref(null)}">← ${esc(L.reviewTitle)}</a>
      <div class="notice">
        <h2>${esc(title)}</h2>
        <p>${esc(body)}</p>
        <div class="quiz-actions">
          ${extraCta}
          <a class="btn btn-block" href="${reviewHref(null)}">${esc(L.reviewScopeLabel)}</a>
        </div>
      </div>
    </section>`;
}

// One card, drawn with the same markup a lesson quiz question uses.
function reviewCardHtml(item, opts, L) {
  const src = `${tr(item.module.title)} · ${tr(item.lesson.title)}`;
  const flags = [];
  if (opts.isRepeat) flags.push(L.reviewAgainCard);
  else if (opts.isNew) flags.push(L.reviewNewCard);

  return `
    <div class="q" data-question="${opts.index}">
      <a class="q-src" href="${lessonHref(item.track.id, item.module.id, item.lesson.id)}">${esc(src)}</a>
      ${
        flags.length
          ? `<span class="q-tags">${flags
              .map((flag) => `<span class="pill">${esc(flag)}</span>`)
              .join('')}</span>`
          : ''
      }
      <p class="q-text"><span class="q-num" aria-hidden="true">${opts.index + 1}</span>${esc(
        tr(item.question.q)
      )}</p>
      <div class="options" role="group">${choiceOptions(item.question, opts.index)}</div>
      <div class="explain-slot"></div>
    </div>`;
}

function choiceOptions(question, qi) {
  return (question.options || [])
    .map(
      (opt, oi) => `
        <button type="button" class="option" data-q="${qi}" data-o="${oi}">
          <span class="option-key" aria-hidden="true">${String.fromCharCode(65 + oi)}</span>
          <span class="option-text">${tr(opt)}</span>
        </button>`
    )
    .join('');
}

/* --- interview -------------------------------------------------------- */

function interviewPool(trackId) {
  const ids = trackId && trackId !== 'all' ? [trackId] : interviewTrackIds();
  const pool = [];
  for (const id of ids) {
    const bank = getInterviewBank(id);
    if (!bank) continue;
    const track = getTrack(id);
    bank.questions.forEach((question, qi) => {
      if (!question || !question.q) return;
      const kind = question.kind === 'open' ? 'open' : 'choice';
      if (kind === 'choice' && !Array.isArray(question.options)) return;
      pool.push({ id: `${id}/${qi}`, kind, question, track, trackId: id });
    });
  }
  return pool;
}

// Questions previously self-assessed as "need to review" come back first.
function drawInterview(trackId) {
  const pool = interviewPool(trackId);
  const again = shuffle(pool.filter((x) => state.interview[x.id] === 'again')).slice(
    0,
    INTERVIEW_AGAIN_PICK
  );
  const taken = new Set(again.map((x) => x.id));
  const rest = shuffle(pool.filter((x) => !taken.has(x.id)));
  return { items: shuffle(again.concat(rest).slice(0, SESSION_SIZE)), poolSize: pool.length };
}

function viewInterview(trackId) {
  return trackId ? viewInterviewSession(trackId) : viewInterviewOptions();
}

function viewInterviewOptions() {
  const L = t();
  const ids = interviewTrackIds();

  if (!ids.length) {
    return `
      <section class="view">
        <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
        <div class="notice">
          <h2>${esc(L.interviewEmptyTitle)}</h2>
          <p>${esc(L.interviewEmptyBody)}</p>
          <a class="btn btn-primary" href="#/">${esc(L.reviewGoCourses)}</a>
        </div>
      </section>`;
  }

  const total = ids.reduce((n, id) => {
    const bank = getInterviewBank(id);
    return n + (bank ? bank.questions.length : 0);
  }, 0);

  const rows = ids
    .map((id) => {
      const bank = getInterviewBank(id);
      const track = getTrack(id);
      const title = track ? tr(track.title) : id;
      return `
        <li>
          <a class="scope-item" href="${interviewHref(id)}">
            <span class="scope-icon" aria-hidden="true">${esc((track && track.icon) || '📘')}</span>
            <span class="scope-main">
              <span class="scope-name">${esc(title)}</span>
              <span class="scope-meta">${esc(L.interviewBankSize(bank.questions.length))}</span>
            </span>
            <span class="lesson-chev" aria-hidden="true">›</span>
          </a>
        </li>`;
    })
    .join('');

  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">🎤 ${esc(L.interviewTitle)}</span>
        <h1>${esc(L.interviewTitle)}</h1>
        <p class="hero-sub">${esc(L.interviewDesc)}</p>
      </div>

      <h2 class="section-title">${esc(L.interviewScopeLabel)}</h2>
      <a class="scope-item scope-all" href="${interviewHref('all')}">
        <span class="scope-icon" aria-hidden="true">🌍</span>
        <span class="scope-main">
          <span class="scope-name">${esc(L.interviewAll)}</span>
          <span class="scope-meta">${esc(L.interviewAllDesc(total))}</span>
        </span>
        <span class="lesson-chev" aria-hidden="true">›</span>
      </a>

      <ul class="scope-list">${rows}</ul>
    </section>`;
}

function viewInterviewSession(trackId) {
  const L = t();
  const { items, poolSize } = drawInterview(trackId);
  sessionItems = items;

  if (!items.length) {
    return `
      <section class="view">
        <a class="back-link" href="${interviewHref(null)}">← ${esc(L.interviewTitle)}</a>
        <div class="notice">
          <h2>${esc(L.interviewEmptyTitle)}</h2>
          <p>${esc(L.interviewEmptyBody)}</p>
          <a class="btn btn-primary" href="${interviewHref(null)}">${esc(L.interviewScopeLabel)}</a>
        </div>
      </section>`;
  }

  const track = trackId !== 'all' ? getTrack(trackId) : null;
  const heading = track ? tr(track.title) : L.interviewAll;

  const questions = items.map((item, qi) => interviewQuestionHtml(item, qi, L)).join('');

  return `
    <section class="view">
      <a class="back-link" href="${interviewHref(null)}">← ${esc(L.interviewScopeLabel)}</a>
      <div class="hero">
        <span class="hero-eyebrow">🎤 ${esc(L.interviewTitle)}</span>
        <h1>${esc(heading)}</h1>
        <p class="hero-sub">${esc(L.interviewSessionIntro)}</p>
      </div>

      ${
        poolSize < SESSION_SIZE
          ? `<div class="notice notice-soft"><p>${esc(L.reviewPoolSmall(poolSize))}</p></div>`
          : ''
      }

      <section class="quiz" data-session="interview">
        <div class="quiz-head">
          <h2>${esc(L.sessionQuestions(items.length))}</h2>
          <span class="quiz-count" data-session-count>${esc(L.quizProgress(0, items.length))}</span>
        </div>
        ${questions}
        <div data-session-result></div>
        <div class="quiz-actions">
          <button type="button" class="btn btn-primary btn-block" data-action="session-again">${esc(
            L.sessionAgain
          )}</button>
          <a class="btn btn-block" href="${interviewHref(null)}">${esc(L.interviewScopeLabel)}</a>
        </div>
      </section>
    </section>`;
}

function interviewQuestionHtml(item, qi, L) {
  const q = item.question;
  const trackName = item.track ? tr(item.track.title) : item.trackId;
  const levelLabel = q.level === 'senior' ? L.levelSenior : L.levelMid;
  const tags = `
    <span class="q-tags">
      <span class="pill">${esc(trackName)}</span>
      <span class="pill">${esc(levelLabel)}</span>
      <span class="pill pill-kind">${esc(item.kind === 'open' ? L.interviewOpenQ : L.interviewChoiceQ)}</span>
    </span>`;

  const head = `
    ${tags}
    <p class="q-text"><span class="q-num" aria-hidden="true">${qi + 1}</span>${tr(q.q)}</p>`;

  if (item.kind === 'choice') {
    return `
      <div class="q" data-question="${qi}">
        ${head}
        <div class="options" role="group">${choiceOptions(q, qi)}</div>
        <div class="explain-slot"></div>
      </div>`;
  }

  return `
    <div class="q q-open" data-question="${qi}">
      ${head}
      <div class="reveal-slot"></div>
      <div class="quiz-actions">
        <button type="button" class="btn btn-primary btn-block" data-action="reveal" data-q="${qi}">${esc(
          L.interviewShow
        )}</button>
      </div>
    </div>`;
}

function interviewRevealHtml(item, qi, L) {
  const q = item.question;
  const points = Array.isArray(q.keyPoints) ? q.keyPoints : [];
  return `
    <div class="model-answer">
      <h4>${esc(L.interviewModelAnswer)}</h4>
      <div class="prose prose-compact">${tr(q.answer) || ''}</div>
      ${
        points.length
          ? `<h4>${esc(L.interviewKeyPoints)}</h4>
             <ul class="key-points">${points.map((p) => `<li>${tr(p)}</li>`).join('')}</ul>`
          : ''
      }
      <div class="self-assess" data-self="${qi}">
        <button type="button" class="btn btn-ok btn-block" data-action="self-ok" data-q="${qi}">✓ ${esc(
          L.interviewKnew
        )}</button>
        <button type="button" class="btn btn-warn btn-block" data-action="self-again" data-q="${qi}">↻ ${esc(
          L.interviewRepeat
        )}</button>
      </div>
    </div>`;
}

/* --- review session binding (Anki flow) ------------------------------- */

// One card at a time: answer -> feedback + schedule -> "Next". A wrong answer
// re-queues the card at the end of the round, so the round only ends once every
// card has been answered correctly at least once. Listeners live inside #main,
// so the next render() drops them with the DOM.
function bindReviewSession() {
  const root = $('[data-session="review"]');
  const s = reviewSession;
  if (!root || !s || !s.queue.length) return;

  const L = t();
  const cardSlot = $('[data-review-card]', root);
  const resultSlot = $('[data-session-result]', root);
  const actionSlot = $('[data-review-actions]', root);

  root.addEventListener('click', (ev) => {
    const opt = ev.target.closest('.option');
    if (opt && !opt.disabled) {
      answer(Number(opt.dataset.o));
      return;
    }
    const action = ev.target.closest('[data-action]');
    if (!action) return;
    if (action.dataset.action === 'review-next') advance();
    if (action.dataset.action === 'review-more') nextRound();
  });

  function current() {
    return s.queue[s.index] || null;
  }

  function syncHead() {
    const head = $('[data-review-head]', root);
    if (head) head.textContent = s.mode === 'endless' ? L.reviewRound(s.round) : L.reviewDoseTitle;
    const count = $('[data-session-count]', root);
    if (count) {
      count.textContent = L.reviewCardOf(
        Math.min(s.index + 1, s.queue.length),
        s.queue.length
      );
    }
  }

  function drawCard() {
    const item = current();
    if (!item || !cardSlot) return;
    s.answeredCurrent = false;
    cardSlot.innerHTML = reviewCardHtml(
      item,
      { index: s.index, isNew: !srsCard(item.id), isRepeat: s.repeated.has(item.id) },
      L
    );
    if (actionSlot) actionSlot.innerHTML = '';
    syncHead();
  }

  function answer(oi) {
    const item = current();
    if (!item || s.answeredCurrent || !Number.isInteger(oi)) return;
    s.answeredCurrent = true;

    const correct = Number(item.question.correct);
    const isRight = oi === correct;
    const wrapper = root.querySelector(`[data-question="${s.index}"]`);
    if (wrapper) {
      $$('.option', wrapper).forEach((btn) => {
        const bi = Number(btn.dataset.o);
        btn.disabled = true;
        if (bi === correct) btn.classList.add('is-correct');
        else if (bi === oi) btn.classList.add('is-wrong');
        else btn.classList.add('is-dim');
      });
    }

    const card = srsGrade(item.id, isRight);

    // The recap scores the FIRST attempt at each card; the re-queued copies
    // only decide when the round ends.
    if (!s.recorded.has(item.id)) {
      s.recorded.add(item.id);
      s.results.push({ item, ok: isRight });
    }
    if (!isRight) {
      s.queue.push(item);
      s.repeated.add(item.id);
    }

    const note = isRight ? L.reviewBackIn(daysBetween(todayKey(), card.due)) : L.reviewRequeued;
    const slot = wrapper ? $('.explain-slot', wrapper) : null;
    if (slot) {
      slot.innerHTML = `
        <div class="explain ${isRight ? 'is-correct' : 'is-wrong'}">
          <strong>${esc(isRight ? L.correct : L.wrong)}</strong>
          ${tr(item.question.explain)}
          <span class="srs-note">${esc(note)}</span>
        </div>`;
    }

    if (actionSlot) {
      actionSlot.innerHTML = `<button type="button" class="btn btn-primary btn-block" data-action="review-next">${esc(
        L.reviewNext
      )} →</button>`;
    }
    syncHead();
  }

  function advance() {
    if (!s.answeredCurrent) return;
    s.index += 1;
    if (s.index >= s.queue.length) {
      finishRound();
      return;
    }
    drawCard();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function nextRound() {
    const next = buildReviewRound(s.scope, 'endless');
    if (!next.items.length) return;
    s.round += 1;
    s.queue = next.items.slice();
    s.index = 0;
    s.results = [];
    s.recorded = new Set();
    s.repeated = new Set();
    if (resultSlot) resultSlot.innerHTML = '';
    drawCard();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // A full round (the daily dose, or one endless round) is one activity point
  // and moves the daily counter.
  function finishRound() {
    const cards = s.results.length;
    const right = s.results.filter((r) => r.ok).length;
    const pct = cards ? Math.round((right / cards) * 100) : 0;
    const pass = pct >= PASS_SCORE;

    addReviewDone(cards);
    bumpActivity();

    if (cardSlot) cardSlot.innerHTML = '';
    const count = $('[data-session-count]', root);
    if (count) count.textContent = L.quizProgress(cards, cards);

    const recap =
      s.mode === 'endless'
        ? ''
        : `<h3 class="section-title">${esc(L.sessionRecap)}</h3>
           <ul class="recap-list">${s.results
             .map(
               (row) => `
                 <li class="recap-item ${row.ok ? 'is-ok' : 'is-bad'}">
                   <span class="recap-mark" aria-hidden="true">${row.ok ? '✓' : '✕'}</span>
                   <span class="recap-body"><a href="${lessonHref(
                     row.item.track.id,
                     row.item.module.id,
                     row.item.lesson.id
                   )}">${tr(row.item.question.q)}</a></span>
                   <span class="recap-verdict">${esc(row.ok ? L.recapOk : L.recapBad)}</span>
                 </li>`
             )
             .join('')}</ul>`;

    if (resultSlot) {
      resultSlot.innerHTML = `
        <div class="quiz-result ${pass ? 'is-pass' : 'is-fail'}">
          <div class="quiz-score">${pct}%</div>
          <p class="quiz-verdict">${esc(
            s.mode === 'endless' ? L.reviewRound(s.round) : L.reviewDoseTitle
          )} · ${esc(L.yourScore)}: ${right}/${cards}</p>
        </div>
        ${recap}`;
      resultSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (actionSlot) {
      actionSlot.innerHTML =
        s.mode === 'endless'
          ? `<button type="button" class="btn btn-primary btn-block" data-action="review-more">${esc(
              L.reviewMore
            )}</button>
             <a class="btn btn-block" href="${reviewHref(null)}">${esc(L.reviewStop)}</a>`
          : `<a class="btn btn-primary btn-block" href="${reviewHref(s.scope, 'endless')}">∞ ${esc(
              L.reviewEndless
            )}</a>
             <a class="btn btn-block" href="${reviewHref(null)}">${esc(L.reviewScopeLabel)}</a>`;
    }
  }
}

/* --- interview session binding ---------------------------------------- */

// Interview keeps the v5 flow: one long list of questions, answered in any
// order, scored once the last one is done.
function bindInterviewSession() {
  const kind = 'interview';
  const root = $(`[data-session="${kind}"]`);
  if (!root) return;
  const items = sessionItems;
  if (!items.length) return;

  const L = t();
  const verdicts = new Array(items.length).fill(null); // 'ok' | 'bad' | 'again'
  let finished = false;

  root.addEventListener('click', (ev) => {
    const opt = ev.target.closest('.option');
    if (opt && !opt.disabled) {
      answerChoice(Number(opt.dataset.q), Number(opt.dataset.o));
      return;
    }
    const action = ev.target.closest('[data-action]');
    if (!action) return;
    const name = action.dataset.action;
    if (name === 'session-again') {
      render(); // same route, fresh draw
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    if (name === 'reveal') reveal(Number(action.dataset.q));
    if (name === 'self-ok') selfAssess(Number(action.dataset.q), 'ok');
    if (name === 'self-again') selfAssess(Number(action.dataset.q), 'again');
  });

  function answerChoice(qi, oi) {
    if (!Number.isInteger(qi) || !Number.isInteger(oi)) return;
    const item = items[qi];
    if (!item || verdicts[qi] != null) return;

    const correct = Number(item.question.correct);
    const wrapper = root.querySelector(`[data-question="${qi}"]`);
    if (!wrapper) return;

    $$('.option', wrapper).forEach((btn) => {
      const bi = Number(btn.dataset.o);
      btn.disabled = true;
      if (bi === correct) btn.classList.add('is-correct');
      else if (bi === oi) btn.classList.add('is-wrong');
      else btn.classList.add('is-dim');
    });

    const isRight = oi === correct;
    verdicts[qi] = isRight ? 'ok' : 'bad';

    const slot = $('.explain-slot', wrapper);
    if (slot) {
      slot.innerHTML = `
        <div class="explain ${isRight ? 'is-correct' : 'is-wrong'}">
          <strong>${esc(isRight ? L.correct : L.wrong)}</strong>
          ${tr(item.question.explain)}
        </div>`;
    }

    state.interview[item.id] = isRight ? 'ok' : 'again';
    saveState();

    afterAnswer();
  }

  function reveal(qi) {
    const item = items[qi];
    if (!item || item.kind !== 'open') return;
    const wrapper = root.querySelector(`[data-question="${qi}"]`);
    if (!wrapper) return;
    const slot = $('.reveal-slot', wrapper);
    if (!slot || slot.dataset.open === '1') return;
    slot.dataset.open = '1';
    slot.innerHTML = interviewRevealHtml(item, qi, L);
    const btn = wrapper.querySelector('[data-action="reveal"]');
    if (btn) btn.hidden = true;
  }

  function selfAssess(qi, verdict) {
    const item = items[qi];
    if (!item || verdicts[qi] != null) return;
    verdicts[qi] = verdict;
    state.interview[item.id] = verdict === 'ok' ? 'ok' : 'again';
    saveState();

    const wrapper = root.querySelector(`[data-question="${qi}"]`);
    if (wrapper) {
      wrapper.classList.add(verdict === 'ok' ? 'is-self-ok' : 'is-self-again');
      $$('.self-assess .btn', wrapper).forEach((btn) => {
        btn.disabled = true;
        const picked =
          (verdict === 'ok' && btn.dataset.action === 'self-ok') ||
          (verdict === 'again' && btn.dataset.action === 'self-again');
        btn.classList.toggle('is-picked', picked);
      });
    }
    afterAnswer();
  }

  function afterAnswer() {
    const answered = verdicts.filter((v) => v != null).length;
    const count = $('[data-session-count]', root);
    if (count) count.textContent = L.quizProgress(answered, items.length);
    if (answered === items.length && !finished) {
      finished = true;
      finish();
    }
  }

  function finish() {
    const choices = items.filter((x) => x.kind === 'choice');
    const rightCount = items.reduce(
      (n, item, i) => n + (item.kind === 'choice' && verdicts[i] === 'ok' ? 1 : 0),
      0
    );
    const opens = items.filter((x) => x.kind === 'open');
    const openOk = items.reduce(
      (n, item, i) => n + (item.kind === 'open' && verdicts[i] === 'ok' ? 1 : 0),
      0
    );
    const pct = choices.length ? Math.round((rightCount / choices.length) * 100) : 0;
    const pass = choices.length > 0 && pct >= PASS_SCORE;

    const recap = items
      .map((item, i) => {
        const good = verdicts[i] === 'ok';
        const label = verdicts[i] == null ? L.recapSkipped : good ? L.recapOk : L.recapBad;
        const body = tr(item.question.q);
        return `
          <li class="recap-item ${good ? 'is-ok' : 'is-bad'}">
            <span class="recap-mark" aria-hidden="true">${good ? '✓' : '✕'}</span>
            <span class="recap-body">${body}</span>
            <span class="recap-verdict">${esc(label)}</span>
          </li>`;
      })
      .join('');

    const summary = `<p class="quiz-verdict">${
      choices.length ? esc(L.interviewChoiceScore(rightCount, choices.length)) : esc(L.interviewNoChoice)
    }${
      opens.length
        ? ` · ${esc(L.interviewOpenTally(openOk, opens.length - openOk))}`
        : ` · ${esc(L.interviewNoOpen)}`
    }</p>`;

    const slot = $('[data-session-result]', root);
    if (slot) {
      slot.innerHTML = `
        <div class="quiz-result ${pass ? 'is-pass' : 'is-fail'}">
          <div class="quiz-score">${choices.length ? `${pct}%` : '—'}</div>
          ${summary}
        </div>
        <h3 class="section-title">${esc(L.sessionRecap)}</h3>
        <ul class="recap-list">${recap}</ul>`;
      slot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    bumpActivity();
  }
}

/* ------------------------------------------------------- v5: UX pack ----- */

/* --- continue -------------------------------------------------------- */

// Called from render() on every lesson view, so "Continue" always points at
// the last thing the learner actually opened.
function noteVisit(trackId, moduleId, lessonId) {
  if (!getLesson(trackId, moduleId, lessonId)) return;
  const lv = state.lastVisited;
  if (lv && lv.trackId === trackId && lv.moduleId === moduleId && lv.lessonId === lessonId) return;
  state.lastVisited = { trackId, moduleId, lessonId };
  saveState();
}

// The lesson the Continue card jumps to: the last visited one when it is still
// unfinished, otherwise the next unfinished lesson in that track.
function continueTarget() {
  const lv = state.lastVisited;
  if (!lv) return null;
  const found = getLesson(lv.trackId, lv.moduleId, lv.lessonId);
  if (!found) return null;
  if (!isDone(lv.trackId, lv.moduleId, lv.lessonId)) return found;

  const flat = trackLessons(lv.trackId);
  const idx = flat.findIndex((x) => x.module.id === lv.moduleId && x.lesson.id === lv.lessonId);
  for (let i = idx + 1; i < flat.length; i += 1) {
    const x = flat[i];
    if (!isDone(lv.trackId, x.module.id, x.lesson.id)) return x;
  }
  for (let i = 0; i < idx; i += 1) {
    const x = flat[i];
    if (!isDone(lv.trackId, x.module.id, x.lesson.id)) return x;
  }
  return found;
}

function continueCard(L) {
  const target = continueTarget();
  if (!target) return '';
  const { track, module: mod, lesson } = target;
  return `
    <a class="continue-card" href="${lessonHref(track.id, mod.id, lesson.id)}">
      <span class="continue-icon" aria-hidden="true">▶</span>
      <span class="continue-body">
        <span class="continue-eyebrow">${esc(L.continueEyebrow)}</span>
        <span class="continue-title">${esc(tr(lesson.title))}</span>
        <span class="continue-crumb">${esc(tr(track.title))} · ${esc(tr(mod.title))}</span>
      </span>
      <span class="continue-cta">${esc(L.continueCta)} ›</span>
    </a>`;
}

/* --- streak + daily goal --------------------------------------------- */

const DAILY_GOAL = 2;

function activityOn(dayKey) {
  const n = Number(state.activity[dayKey]);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function dayKeyShift(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return todayKey(d);
}

// Consecutive days with at least one activity. Today counts when it is active;
// when it is not, the streak is measured from yesterday (a day is only lost
// after it passes unused).
function streakLength() {
  let start = 0;
  if (!activityOn(dayKeyShift(0))) {
    if (!activityOn(dayKeyShift(-1))) return 0;
    start = -1;
  }
  let n = 0;
  for (let i = start; i > start - 400; i -= 1) {
    if (!activityOn(dayKeyShift(i))) break;
    n += 1;
  }
  return n;
}

function streakCard(L) {
  const streak = streakLength();
  const todayCount = activityOn(dayKeyShift(0));
  const reached = todayCount >= DAILY_GOAL;
  const pct = clamp(Math.round((todayCount / DAILY_GOAL) * 100), 0, 100);

  return `
    <div class="streak-card${reached ? ' is-reached' : ''}">
      <div class="streak-main">
        <p class="streak-title">${esc(L.streakTitle)}</p>
        <p class="streak-value">${esc(streak ? L.streakValue(streak) : L.streakNone)}</p>
      </div>
      <div class="streak-goal">
        <span class="streak-goal-text">${esc(reached ? L.goalDone : L.goalToday(todayCount, DAILY_GOAL))}</span>
        <span class="bar${reached ? ' is-complete' : ''}"><i data-pct="${pct}"></i></span>
        <span class="streak-hint">${esc(L.goalHint)}</span>
      </div>
    </div>`;
}

/* --- search ----------------------------------------------------------- */

const SEARCH_MIN = 2;
const SEARCH_LIMIT = 30;

let searchIndexCache = null;
let searchQuery = '';

function stripTags(html) {
  return String(html == null ? '' : html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// Built once, on the first search. Both languages go into every entry, so a
// Polish UI still finds English wording and vice versa.
function buildSearchIndex() {
  const out = [];
  for (const track of availableTracks()) {
    for (const mod of track.modules || []) {
      for (const lesson of mod.lessons || []) {
        const titles = [];
        const bodies = [];
        for (const lang of LANGS) {
          const title = (lesson.title || {})[lang];
          if (title) titles.push(String(title));
          const levels = lesson.levels || {};
          for (const level of LEVELS) {
            const body = stripTags((levels[level] || {})[lang]);
            if (body) bodies.push(body);
          }
        }
        const body = bodies.join('  ');
        out.push({
          track,
          module: mod,
          lesson,
          titles: titles.join(' · '),
          titleHay: titles.join(' · ').toLowerCase(),
          body,
          bodyHay: body.toLowerCase(),
        });
      }
    }
  }
  return out;
}

function getSearchIndex() {
  if (!searchIndexCache) searchIndexCache = buildSearchIndex();
  return searchIndexCache;
}

// Title matches outrank content matches; a whole-phrase hit outranks a
// scattered all-terms hit.
function runSearch(rawQuery) {
  const q = String(rawQuery || '').trim().toLowerCase();
  if (q.length < SEARCH_MIN) return { results: [], total: 0 };
  const terms = q.split(/\s+/).filter((term) => term.length >= SEARCH_MIN);

  const hits = [];
  for (const entry of getSearchIndex()) {
    let score = 0;
    let at = -1;
    let needle = q;

    if (entry.titleHay.includes(q)) score += 120;
    if (entry.titleHay.startsWith(q)) score += 25;
    const bodyAt = entry.bodyHay.indexOf(q);
    if (bodyAt !== -1) {
      score += 40;
      at = bodyAt;
    }

    if (!score && terms.length > 1) {
      if (terms.every((term) => entry.titleHay.includes(term))) score += 70;
      if (terms.every((term) => entry.bodyHay.includes(term))) {
        score += 20;
        at = entry.bodyHay.indexOf(terms[0]);
        needle = terms[0];
      }
    }

    if (!score) continue;
    hits.push({ entry, score, snippet: snippetHtml(entry.body, at, needle) });
  }

  hits.sort((a, b) => b.score - a.score || a.entry.titles.localeCompare(b.entry.titles));
  return { results: hits.slice(0, SEARCH_LIMIT), total: hits.length };
}

// A ~180 char window around the match, with the match itself wrapped in <mark>.
function snippetHtml(text, at, needle) {
  const source = String(text || '');
  if (!source) return '';
  const start = at < 0 ? 0 : Math.max(0, at - 70);
  const slice = source.slice(start, start + 190);
  const prefix = start > 0 ? '… ' : '';
  const suffix = start + 190 < source.length ? ' …' : '';
  const lower = slice.toLowerCase();
  const hit = needle ? lower.indexOf(String(needle).toLowerCase()) : -1;
  if (hit === -1) return `${prefix}${esc(slice)}${suffix}`;
  const end = hit + String(needle).length;
  return (
    prefix +
    esc(slice.slice(0, hit)) +
    `<mark>${esc(slice.slice(hit, end))}</mark>` +
    esc(slice.slice(end)) +
    suffix
  );
}

function searchResultsHtml() {
  const L = t();
  const q = searchQuery.trim();
  if (q.length < SEARCH_MIN) {
    return `<p class="search-note">${esc(L.searchTooShort)}</p>`;
  }
  const { results, total } = runSearch(q);
  if (!results.length) {
    return `<p class="search-note">${esc(L.searchEmpty)}</p>`;
  }

  const rows = results
    .map(
      (hit) => `
        <li>
          <a class="result-item" href="${lessonHref(
            hit.entry.track.id,
            hit.entry.module.id,
            hit.entry.lesson.id
          )}">
            <span class="result-crumb">${esc(tr(hit.entry.track.title))} · ${esc(
              tr(hit.entry.module.title)
            )}</span>
            <span class="result-title">${esc(tr(hit.entry.lesson.title))}</span>
            <span class="result-snippet">${hit.snippet}</span>
          </a>
        </li>`
    )
    .join('');

  return `
    <p class="search-note">${esc(L.searchResults(total))}${
      total > results.length ? ` ${esc(L.searchCapped(results.length))}` : ''
    }</p>
    <ul class="result-list">${rows}</ul>`;
}

function viewSearch() {
  const L = t();
  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">🔎 ${esc(L.searchTitle)}</span>
        <h1>${esc(L.searchTitle)}</h1>
        <p class="hero-sub">${esc(L.searchHint)}</p>
      </div>

      <div class="search-box">
        <span class="search-box-icon" aria-hidden="true">🔎</span>
        <input class="search-input" type="search" data-search-input
          value="${esc(searchQuery)}" placeholder="${esc(L.searchPlaceholder)}"
          aria-label="${esc(L.searchAria)}" autocomplete="off" enterkeyhint="search">
      </div>

      <div class="search-results" data-search-results aria-live="polite">
        ${searchResultsHtml()}
      </div>
    </section>`;
}

function bindSearch() {
  const input = $('[data-search-input]');
  const out = $('[data-search-results]');
  if (!input || !out) return;

  input.addEventListener('input', () => {
    searchQuery = input.value;
    out.innerHTML = searchResultsHtml();
  });

  // render() focuses #main after binding, so grab focus on the next frame.
  requestAnimationFrame(() => {
    input.focus();
    const len = input.value.length;
    try {
      input.setSelectionRange(len, len);
    } catch (err) {
      /* type=search may reject selection APIs in some engines */
    }
  });
}

/* --- export / import -------------------------------------------------- */

const EXPORT_FILE = 'learnai-progress.json';

let pendingImport = null;

function utf8ToB64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function b64ToUtf8(code) {
  const bin = atob(String(code).replace(/\s+/g, ''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function exportJson() {
  return JSON.stringify({
    app: 'learn-ai',
    version: 1,
    exportedAt: new Date().toISOString(),
    state: {
      lang: state.lang,
      level: state.level,
      done: state.done,
      lastVisited: state.lastVisited,
      activity: state.activity,
      missed: state.missed,
      interview: state.interview,
      srs: state.srs,
      reviewDay: state.reviewDay,
    },
  });
}

function downloadText(filename, text) {
  try {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  } catch (err) {
    console.warn('learn-ai: download failed.', err);
    return false;
  }
}

// Accepts both what Export produces: the raw .json file and the base64 code.
function parseImportText(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  let json = raw;
  if (!raw.startsWith('{')) {
    try {
      json = b64ToUtf8(raw);
    } catch (err) {
      return null;
    }
  }
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;
  const body = parsed.state && typeof parsed.state === 'object' ? parsed.state : parsed;
  if (!body.done || typeof body.done !== 'object' || Array.isArray(body.done)) return null;
  const next = stateFromRaw(body);
  return {
    next,
    lessons: Object.keys(next.done).length,
    at: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : null,
  };
}

function formatWhen(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  try {
    return d.toLocaleDateString(state.lang === 'pl' ? 'pl-PL' : 'en-GB');
  } catch (err) {
    return iso.slice(0, 10);
  }
}

function dataBlock(L) {
  return `
    <section class="data-card" data-data>
      <h2 class="section-title">${esc(L.dataTitle)}</h2>
      <p class="data-desc">${esc(L.dataDesc)}</p>

      <div class="data-row">
        <button type="button" class="btn btn-primary btn-block" data-action="export">${esc(
          L.dataExport
        )}</button>
        <button type="button" class="btn btn-block" data-action="pick">${esc(L.dataPickFile)}</button>
        <input type="file" accept="application/json,.json" data-data-file hidden>
      </div>

      <label class="data-label" for="data-code">${esc(L.dataPasteLabel)}</label>
      <textarea class="data-code" id="data-code" rows="3" spellcheck="false"
        aria-label="${esc(L.dataCodeLabel)}"
        placeholder="${esc(L.dataPastePlaceholder)}" data-data-code></textarea>

      <div class="data-row">
        <button type="button" class="btn btn-block" data-action="check">${esc(L.dataCheck)}</button>
      </div>

      <div class="data-status" data-data-status role="status"></div>
    </section>`;
}

function bindHome() {
  const root = $('[data-data]');
  if (!root) return;
  const L = t();
  const codeEl = $('[data-data-code]', root);
  const fileEl = $('[data-data-file]', root);
  const statusEl = $('[data-data-status]', root);
  pendingImport = null;

  function note(text, tone) {
    if (!statusEl) return;
    statusEl.innerHTML = `<p class="data-note${tone ? ` is-${tone}` : ''}">${esc(text)}</p>`;
  }

  function offerImport(parsed) {
    pendingImport = parsed;
    if (!statusEl) return;
    statusEl.innerHTML = `
      <div class="data-confirm">
        <p class="data-preview">${esc(L.dataPreview(parsed.lessons, formatWhen(parsed.at)))}</p>
        <p class="data-question">${esc(L.dataConfirmQ)}</p>
        <div class="data-row">
          <button type="button" class="btn btn-primary btn-block" data-action="import-confirm">${esc(
            L.dataConfirm
          )}</button>
          <button type="button" class="btn btn-block" data-action="import-cancel">${esc(
            L.dataCancel
          )}</button>
        </div>
      </div>`;
  }

  function check(text) {
    const parsed = parseImportText(text);
    if (!parsed) {
      pendingImport = null;
      note(L.dataBad, 'bad');
      return;
    }
    offerImport(parsed);
  }

  root.addEventListener('click', (ev) => {
    const action = ev.target.closest('[data-action]');
    if (!action) return;
    const name = action.dataset.action;

    if (name === 'export') {
      const json = exportJson();
      downloadText(EXPORT_FILE, json);
      const code = utf8ToB64(json);
      if (codeEl) codeEl.value = code;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(code)
          .then(() => note(L.dataCopied, 'ok'))
          .catch(() => note(L.dataCopyFailed, 'warn'));
      } else {
        note(L.dataCopyFailed, 'warn');
      }
      return;
    }

    if (name === 'pick') {
      if (fileEl) fileEl.click();
      return;
    }

    if (name === 'check') {
      check(codeEl ? codeEl.value : '');
      return;
    }

    if (name === 'import-cancel') {
      pendingImport = null;
      if (statusEl) statusEl.innerHTML = '';
      return;
    }

    if (name === 'import-confirm') {
      if (!pendingImport) return;
      const next = pendingImport.next;
      pendingImport = null;
      for (const key of Object.keys(state)) delete state[key];
      Object.assign(state, next);
      saveState();
      render();
      updateHeaderProgress();
      const freshStatus = $('[data-data-status]');
      if (freshStatus) {
        freshStatus.innerHTML = `<p class="data-note is-ok">${esc(t().dataImported)}</p>`;
      }
    }
  });

  if (fileEl) {
    fileEl.addEventListener('change', () => {
      const file = fileEl.files && fileEl.files[0];
      if (!file) return;
      file
        .text()
        .then((text) => {
          if (codeEl) codeEl.value = '';
          check(text);
        })
        .catch(() => note(L.dataBad, 'bad'))
        .finally(() => {
          fileEl.value = '';
        });
    });
  }
}

/* -------------------------------------------------------------- chrome --- */

function syncLangButtons() {
  const toggle = $('#lang-toggle');
  if (!toggle) return;
  toggle.setAttribute('aria-label', t().langAria);
  $$('.lang-btn', toggle).forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === state.lang));
  });
}

function syncSearchButton() {
  const link = $('#search-link');
  if (!link) return;
  const label = t().searchAria;
  link.setAttribute('aria-label', label);
  link.setAttribute('title', label);
  if (parseHash().name === 'search') link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
}

function updateHeaderProgress() {
  const fill = $('#header-progress-fill');
  if (!fill) return;
  fill.style.width = `${overallProgress().pct}%`;
}

function renderFooter(showVersion) {
  const footer = $('#app-footer');
  if (!footer) return;
  const L = t();
  const version = showVersion && swVersion
    ? `<span class="app-version" title="build">${esc(
        swVersion === 'dev' ? L.versionDev : L.versionLabel(swVersion)
      )}</span>`
    : '';
  footer.innerHTML = `<span>${esc(L.footer)}</span>${version}`;
}

function setLang(lang) {
  if (!LANGS.includes(lang) || lang === state.lang) return;
  state.lang = lang;
  saveState();
  render(); // route unchanged -> re-renders in place, no scroll jump
}

/* ----------------------------------------------------------------- pwa --- */

let swVersion = '';
let updateToastShown = false;
let reloading = false;

function showUpdateToast(worker) {
  if (updateToastShown || !worker) return;
  updateToastShown = true;

  const L = t();
  const toast = document.createElement('div');
  toast.className = 'update-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML =
    `<span class="update-toast-text">${esc(L.updateTitle)}</span>` +
    `<button type="button" class="update-toast-btn">${esc(L.updateAction)}</button>`;

  toast.querySelector('.update-toast-btn').addEventListener('click', () => {
    toast.classList.add('is-busy');
    try {
      worker.postMessage({ type: 'SKIP_WAITING' });
    } catch (err) {
      location.reload();
    }
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-in'));
}

function readVersion(registration) {
  const worker =
    navigator.serviceWorker.controller || registration.active || null;
  if (!worker || !('MessageChannel' in window)) return;

  const channel = new MessageChannel();
  const timer = setTimeout(() => {
    channel.port1.onmessage = null;
  }, 3000);

  channel.port1.onmessage = (ev) => {
    clearTimeout(timer);
    const data = ev.data || {};
    if (data.type !== 'VERSION') return;
    swVersion = data.dev ? 'dev' : String(data.version || '').slice(0, 12);
    renderFooter(parseHash().name === 'home');
  };

  try {
    worker.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
  } catch (err) {
    clearTimeout(timer);
  }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol === 'file:') return;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    location.reload();
  });

  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then((registration) => {
      readVersion(registration);

      if (registration.waiting && navigator.serviceWorker.controller) {
        showUpdateToast(registration.waiting);
      }

      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast(installing);
          }
          if (installing.state === 'activated' && !swVersion) {
            readVersion(registration);
          }
        });
      });

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState !== 'visible') return;
        registration.update().catch(() => {});
      });
    })
    .catch(() => {
      /* no service worker (file://, unsupported, offline first load) */
    });
}

/* ---------------------------------------------------------------- boot --- */

function boot() {
  $$('#lang-toggle .lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  window.addEventListener('hashchange', render);

  // Voices load asynchronously in Chrome; warm the list and stop any speech
  // when the page goes away (speechSynthesis outlives a normal unload).
  const synth = speechApi();
  if (synth) {
    try {
      synth.getVoices();
    } catch (err) {
      /* ignore */
    }
    window.addEventListener('pagehide', ttsStop);
  }

  if (!location.hash) {
    location.replace(`${location.pathname}${location.search}#/`);
  }
  render();
  registerServiceWorker();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
