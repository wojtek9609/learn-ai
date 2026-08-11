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

    /* -- v6: fiszki w SRS + mikro-sesja -- */
    termCard: 'fiszka',
    termPrompt: 'Co to znaczy?',
    termReveal: 'Pokaz odpowiedz',
    termKnew: 'Umialem',
    termMissed: 'Nie umialem',
    termRequeued: 'Ta fiszka wroci jeszcze w tej sesji.',
    quickTitle: 'Mam 5 minut',
    quickCta: 'Mam 5 minut',
    quickDesc: 'Piec kart powtorki albo najkrotsza nieukonczona lekcja.',
    quickRound: 'Szybka runda',
    sessionRecap: 'Podsumowanie',
    sessionAgain: 'Jeszcze raz',
    recapOk: 'dobrze',
    recapBad: 'zle',
    recapSkipped: 'bez odpowiedzi',

    /* -- v6: pytanie na rozgrzewke, Feynman, zapytaj Claude -- */
    preguessTitle: 'Zgadnij, zanim przeczytasz',
    preguessHint:
      'Jedno pytanie z tej lekcji. Nie liczy sie do wyniku ani do powtorek - chodzi o samo zgadywanie.',
    preguessAfter: 'Teraz przeczytaj lekcje i sprawdz sie.',
    feynmanTitle: 'Wyjasnij wlasnymi slowami',
    feynmanDesc:
      'Napisz to tak, jakbys tlumaczyl koledze z zespolu. Na telefonie mozesz dyktowac klawiatura.',
    feynmanPlaceholder: 'O co tu chodzi? Wyjasnij to wlasnymi slowami...',
    feynmanCompare: 'Porownaj z wersja prosta',
    feynmanHide: 'Ukryj wersje prosta',
    feynmanGap: 'Czego zabraklo?',
    feynmanGapHint:
      'Porownaj oba teksty: ktore pojecia sa w wersji prostej, a nie ma ich w twoim opisie?',
    feynmanSaved: 'Zapisano ✓',
    feynmanSaving: 'Zapisuje...',
    feynmanAria: 'Twoje wyjasnienie tej lekcji',
    askClaude: '💬 Zapytaj Claude o te lekcje',
    askClaudePrompt: (lesson, track, mod) =>
      `Ucze sie tematu "${lesson}" (kurs ${track}, modul ${mod}). Wyjasnij mi to inaczej niz standardowo, sprawdz moje zrozumienie 2-3 pytaniami i podaj jeden praktyczny przyklad z frontendu.`,

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
    statsTitle: 'Statystyki',
    statsLink: 'Statystyki',
    statsDesc: 'Gdzie jest najslabiej i jak regularnie sie uczysz.',
    statsWeakTitle: 'Najslabsze obszary',
    statsWeakHint:
      'Liczymy je z powtorek: im nizsze pudelko i wiecej wpadek, tym slabszy modul. Do rankingu wchodza moduly z co najmniej 3 zaplanowanymi kartami.',
    statsWeakEmpty:
      'Za malo danych. Zrob kilka powtorek - ranking pojawi sie, gdy jakis modul bedzie mial co najmniej 3 zaplanowane karty.',
    statsWeakMeta: (cards, lapses) =>
      `${cards} ${plural(cards, 'karta', 'karty', 'kart')} · ${lapses} ${plural(
        lapses,
        'wpadka',
        'wpadki',
        'wpadek'
      )}`,
    statsWeakScore: (p) => `slabosc ${p}%`,
    statsReviewModule: 'Powtorz ten modul',
    statsHeatTitle: 'Aktywnosc',
    statsHeatHint: 'Ostatnie 16 tygodni. Jeden punkt = zaliczona lekcja albo skonczona sesja.',
    statsHeatSummary: (points, days) =>
      `${points} ${plural(points, 'punkt', 'punkty', 'punktow')} w ${days} ${plural(
        days,
        'dniu',
        'dniach',
        'dniach'
      )}`,
    statsHeatLess: 'mniej',
    statsHeatMore: 'wiecej',
    statsHeatToday: 'dzis',
    statsCellAria: (day, n) =>
      `${day}: ${n} ${plural(n, 'punkt', 'punkty', 'punktow')}`,
    statsWeekdays: ['pon', 'wt', 'sr', 'czw', 'pt', 'sob', 'ndz'],
    statsMonths: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paz', 'lis', 'gru'],
    weakChipLabel: (name) => `Najslabszy obszar: ${name}`,
    weakChipCta: 'Powtorz',
    glossaryTitle: 'Slowniczek',
    glossaryLink: 'Slowniczek',
    glossaryDesc:
      'Wszystkie pojecia ze wszystkich kierunkow, alfabetycznie. Szukaj i wracaj do lekcji zrodlowej.',
    glossaryPlaceholder: 'Szukaj pojecia...',
    glossaryAria: 'Szukaj w slowniczku',
    glossaryTooShort: 'Wpisz co najmniej 2 znaki, zeby filtrowac.',
    glossaryEmpty: 'Zadne pojecie nie pasuje.',
    glossaryCount: (n) => `${n} ${plural(n, 'pojecie', 'pojecia', 'pojec')}`,
    glossaryFiltered: (n, total) => `${n} z ${total}`,
    glossaryNone: 'W tresci nie ma jeszcze zadnych pojec.',
    termsLabel: 'Pojecia w tej lekcji',
    termChipAria: (term) => `Pokaz definicje: ${term}`,
    termMarkAria: (term) => `Pojecie: ${term}. Pokaz definicje.`,
    defSheetAria: 'Definicja pojecia',
    defSheetClose: 'Zamknij',
    defSheetSource: 'Lekcja zrodlowa',
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

    /* -- v6: flashcards in SRS + micro-session -- */
    termCard: 'flashcard',
    termPrompt: 'What does it mean?',
    termReveal: 'Show answer',
    termKnew: 'I knew it',
    termMissed: 'I did not know',
    termRequeued: 'This flashcard comes back later in this session.',
    quickTitle: 'I have 5 minutes',
    quickCta: 'I have 5 minutes',
    quickDesc: 'Five review cards, or the shortest lesson you have not finished.',
    quickRound: 'Quick round',
    sessionRecap: 'Recap',
    sessionAgain: 'Again',
    recapOk: 'correct',
    recapBad: 'wrong',
    recapSkipped: 'unanswered',

    /* -- v6: pre-question, Feynman, ask Claude -- */
    preguessTitle: 'Guess before you read',
    preguessHint:
      'One question from this lesson. It does not count toward your score or your reviews - guessing is the point.',
    preguessAfter: 'Now read the lesson and check yourself.',
    feynmanTitle: 'Explain it in your own words',
    feynmanDesc:
      'Write it the way you would explain it to a teammate. On a phone you can dictate with the keyboard.',
    feynmanPlaceholder: 'So what is this really about? Explain it in your own words...',
    feynmanCompare: 'Compare with the simple version',
    feynmanHide: 'Hide the simple version',
    feynmanGap: 'What was missing?',
    feynmanGapHint:
      'Compare the two: which ideas show up in the simple version but not in your explanation?',
    feynmanSaved: 'Saved ✓',
    feynmanSaving: 'Saving...',
    feynmanAria: 'Your explanation of this lesson',
    askClaude: '💬 Ask Claude about this lesson',
    askClaudePrompt: (lesson, track, mod) =>
      `I am learning about "${lesson}" (course ${track}, module ${mod}). Explain it to me in a different way than usual, check my understanding with 2-3 questions, and give me one practical frontend example.`,

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
    statsTitle: 'Stats',
    statsLink: 'Stats',
    statsDesc: 'Where you are weakest, and how steadily you show up.',
    statsWeakTitle: 'Weakest areas',
    statsWeakHint:
      'Computed from your reviews: the lower the box and the more lapses, the weaker the module. Modules join the ranking once they have at least 3 scheduled cards.',
    statsWeakEmpty:
      'Not enough data yet. Do a few reviews - the ranking shows up once a module has at least 3 scheduled cards.',
    statsWeakMeta: (cards, lapses) =>
      `${cards} ${cards === 1 ? 'card' : 'cards'} · ${lapses} ${lapses === 1 ? 'lapse' : 'lapses'}`,
    statsWeakScore: (p) => `weakness ${p}%`,
    statsReviewModule: 'Review this module',
    statsHeatTitle: 'Activity',
    statsHeatHint: 'Last 16 weeks. One point = a completed lesson or a finished session.',
    statsHeatSummary: (points, days) =>
      `${points} ${points === 1 ? 'point' : 'points'} across ${days} ${days === 1 ? 'day' : 'days'}`,
    statsHeatLess: 'less',
    statsHeatMore: 'more',
    statsHeatToday: 'today',
    statsCellAria: (day, n) => `${day}: ${n} ${n === 1 ? 'point' : 'points'}`,
    statsWeekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    statsMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weakChipLabel: (name) => `Weakest area: ${name}`,
    weakChipCta: 'Review',
    glossaryTitle: 'Glossary',
    glossaryLink: 'Glossary',
    glossaryDesc:
      'Every term from every track, alphabetically. Search it and jump back to the source lesson.',
    glossaryPlaceholder: 'Search a term...',
    glossaryAria: 'Search the glossary',
    glossaryTooShort: 'Type at least 2 characters to filter.',
    glossaryEmpty: 'No term matches that.',
    glossaryCount: (n) => `${n} ${n === 1 ? 'term' : 'terms'}`,
    glossaryFiltered: (n, total) => `${n} of ${total}`,
    glossaryNone: 'No terms in the content yet.',
    termsLabel: 'Terms in this lesson',
    termChipAria: (term) => `Show the definition of ${term}`,
    termMarkAria: (term) => `Term: ${term}. Show the definition.`,
    defSheetAria: 'Term definition',
    defSheetClose: 'Close',
    defSheetSource: 'Source lesson',
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
  notes: {},
};

const MISSED_CAP = 200;
// v6 (Feynman): one free-text note per lesson, keyed `<t>/<m>/<l>`.
const NOTE_CAP = 5000;
const NOTE_KEY_RE = /^[^/]+\/[^/]+\/[^/]+$/;
const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

// v6: an SRS card key is either a quiz card `<t>/<m>/<l>/<qIndex>` or a term
// (flashcard) card `<t>/<m>/<l>/term/<i>`. Anything else in a stored payload is
// not a card this build knows how to schedule, so it is dropped on load.
const SRS_KEY_RE = /^[^/]+\/[^/]+\/[^/]+\/(?:\d+|term\/\d+)$/;

function isSrsKey(id) {
  return typeof id === 'string' && SRS_KEY_RE.test(id);
}

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
    notes: {},
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
        if (!isSrsKey(id) || !raw || typeof raw !== 'object') continue;
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

    if (parsed.notes && typeof parsed.notes === 'object' && !Array.isArray(parsed.notes)) {
      for (const [key, raw] of Object.entries(parsed.notes)) {
        if (!NOTE_KEY_RE.test(key) || !raw || typeof raw !== 'object') continue;
        if (typeof raw.text !== 'string') continue;
        const text = raw.text.slice(0, NOTE_CAP);
        if (!text.trim()) continue;
        state.notes[key] = {
          text,
          at: typeof raw.at === 'string' ? raw.at : new Date().toISOString(),
        };
      }
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
    if (!isSrsKey(id) || target.srs[id]) continue;
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

/* --- v6: Feynman notes ------------------------------------------------ */

function noteText(trackId, moduleId, lessonId) {
  const entry = state.notes[keyOf(trackId, moduleId, lessonId)];
  return entry && typeof entry.text === 'string' ? entry.text : '';
}

// Writes (or clears) the note for one lesson. Returns true when something
// actually changed, so the caller can skip a pointless localStorage write.
function setNote(trackId, moduleId, lessonId, rawText) {
  const key = keyOf(trackId, moduleId, lessonId);
  const text = String(rawText == null ? '' : rawText).slice(0, NOTE_CAP);
  const prev = state.notes[key];
  if (!text.trim()) {
    if (!prev) return false;
    delete state.notes[key];
    saveState();
    return true;
  }
  if (prev && prev.text === text) return false;
  state.notes[key] = { text, at: new Date().toISOString() };
  saveState();
  return true;
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

// Fisher-Yates over option indexes: options render in random order while
// data-o keeps the original index, so answer checking stays untouched.
function shuffledIdx(options) {
  const idx = options.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
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

function glossaryHref() {
  return '#/glossary';
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
  if (parts[0] === 'quick') return { name: 'quick' };
  if (parts[0] === 'stats') return { name: 'stats' };
  if (parts[0] === 'search') return { name: 'search' };
  if (parts[0] === 'glossary') return { name: 'glossary' };
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

  // v6: #/quick decides at navigation time whether it is a five-card round or
  // a jump into the shortest unfinished lesson.
  if (route.name === 'quick' && TRACKS.length) {
    const jump = quickRedirectHref();
    if (jump) {
      location.replace(`${location.pathname}${location.search}${jump}`);
      return;
    }
  }

  // Every render() replaces #main, so the reader never outlives the page it was
  // started on: this covers route changes and the language switch alike.
  ttsStop();
  // v7.1: the definition sheet belongs to the page that opened it.
  closeDefSheet();
  // The Feynman textarea is about to be thrown away with #main - persist
  // whatever the debounce still owes before that happens.
  flushNote();

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
  else if (route.name === 'quick') html = viewReviewSession({ kind: 'all' }, 'quick');
  else if (route.name === 'interview') html = viewInterview(route.trackId);
  else if (route.name === 'search') html = viewSearch();
  else if (route.name === 'glossary') html = viewGlossary();
  else if (route.name === 'stats') html = viewStats();
  else html = viewNotFound();

  main.innerHTML = html;

  if (route.name === 'home') bindHome();
  if (route.name === 'search') bindSearch();
  if (route.name === 'glossary') bindGlossary();
  if (route.name === 'lesson') bindLesson(route.trackId, route.moduleId, route.lessonId);
  if (route.name === 'review' || route.name === 'quick') bindReviewSession();
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
  if (route.name === 'glossary') return `${t().glossaryTitle} - Learn AI`;
  if (route.name === 'stats') return `${t().statsTitle} - Learn AI`;
  if (route.name === 'review') return `${t().reviewTitle} - Learn AI`;
  if (route.name === 'quick') return `${t().quickTitle} - Learn AI`;
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

      ${quickCard(L)}

      ${ringCard(L.yourProgress, L.lessonsDone(done, total), pct, L.totalMinutes(overallMinutes()))}

      ${streakCard(L)}

      ${weakChip(L)}

      ${modeCards(L)}

      <h2 class="section-title">${esc(L.tracksLabel)}</h2>
      <div class="card-list">${cards}</div>

      ${dataBlock(L)}
    </section>`;
}

// v6: the micro-session entry point, right under "continue". Where it lands is
// decided by the router (#/quick), so this stays a plain link.
function quickCard(L) {
  return `
    <a class="quick-card" href="#/quick">
      <span class="quick-icon" aria-hidden="true">⚡</span>
      <span class="quick-body">
        <span class="quick-title">${esc(L.quickCta)}</span>
        <span class="quick-desc">${esc(L.quickDesc)}</span>
      </span>
      <span class="mode-chev" aria-hidden="true">›</span>
    </a>`;
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

      ${renderPreguess(lesson, done, L)}

      <div class="tabs" role="tablist" aria-label="${esc(L.levelAria)}">${tabs}</div>

      ${renderTermChips(lesson, L)}

      ${renderTts()}

      ${renderDiagram(lesson)}

      ${renderInteractive(lesson)}

      <article class="prose" id="level-panel" role="tabpanel" aria-labelledby="tab-${level}">
        ${levelHtml(lesson, level)}
      </article>

      ${renderFeynman(track, mod, lesson, L)}

      ${renderQuiz(track, mod, lesson)}

      ${renderAskClaude(track, mod, lesson, L)}

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

// v7: `lesson.interactive` is EITHER one player object (v4 shape) or an array of
// 1-4 player objects. Everything below works on the normalized list, so both
// shapes render and bind identically.
const MAX_PLAYERS = 4;

// Frames of ONE player block, filtered to the usable ones ([] when malformed).
function interactiveFrames(block) {
  if (!block || block.kind !== 'frames' || !Array.isArray(block.frames)) return [];
  return block.frames.filter(
    (f) => f && typeof f.svg === 'string' && f.svg.trim().startsWith('<svg')
  );
}

// Normalizes `lesson.interactive` into a list of playable players (>= 2 frames
// each), capped at MAX_PLAYERS, in content order.
function interactivePlayers(lesson) {
  const it = lesson && lesson.interactive;
  if (!it) return [];
  const blocks = Array.isArray(it) ? it : [it];
  const players = [];
  for (const block of blocks) {
    const frames = interactiveFrames(block);
    if (frames.length < 2) continue;
    players.push({ frames, caption: tr(block.caption) });
    if (players.length >= MAX_PLAYERS) break;
  }
  return players;
}

function renderInteractivePlayer(player, idx, total, L) {
  const { frames, caption } = player;
  const last = frames.length - 1;
  // Numbering only matters when the lesson stacks several mechanisms.
  const title = total > 1 ? `${L.interactiveTitle} ${idx + 1}/${total}` : L.interactiveTitle;

  return `
    <figure class="player" data-player="${idx}">
      <div class="player-head">
        <h2 class="player-title">${esc(title)}</h2>
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
      ${idx === 0 ? `<p class="player-hint">${esc(L.interactiveHint)}</p>` : ''}
    </figure>`;
}

function renderInteractive(lesson) {
  const L = t();
  const players = interactivePlayers(lesson);
  if (!players.length) return '';
  return players.map((p, i) => renderInteractivePlayer(p, i, players.length, L)).join('');
}

// Binds every player render() just wrote into #main. Each figure gets its own
// independent state; all listeners live on nodes inside that subtree, so the
// next innerHTML swap drops them with the DOM (no manual teardown, no leaks) -
// same lifecycle as the quiz binding.
function bindInteractive(lesson) {
  const players = interactivePlayers(lesson);
  if (!players.length) return;
  const roots = $$('[data-player]');
  roots.forEach((root) => {
    const idx = Number(root.dataset.player);
    const player = players[Number.isFinite(idx) ? idx : -1];
    if (player) bindInteractivePlayer(root, player.frames);
  });
}

function bindInteractivePlayer(root, frames) {
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

const TTS_RATES = [0.7, 0.8, 0.9, 1, 1.2];
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
      <span class="tts-rate-wrap">
        <select class="tts-rate" data-tts-rate aria-label="${esc(L.ttsRate)}">${options}</select>
      </span>
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

/* ------------------------- v6: pre-question, Feynman, ask Claude --------- */

// 1-366. Stable for the whole local day, which is what makes the pre-question
// pick deterministic ("the same question all day, a different one tomorrow").
function dayOfYear(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((now - start) / 86400000);
}

// The question shown before reading. Deterministic within a day so reloading
// the lesson does not reshuffle it mid-thought.
function preguessIndex(lesson) {
  const quiz = Array.isArray(lesson.quiz) ? lesson.quiz : [];
  if (!quiz.length) return -1;
  return dayOfYear() % quiz.length;
}

// Only on lessons that are NOT completed - once you know the material the
// guess is pointless. Answering here never touches SRS, score or activity.
function renderPreguess(lesson, done, L) {
  if (done) return '';
  const qi = preguessIndex(lesson);
  if (qi < 0) return '';
  const item = lesson.quiz[qi];
  if (!item || !Array.isArray(item.options) || !item.options.length) return '';

  const options = shuffledIdx(item.options)
    .map(
      (oi, pos) => `
        <button type="button" class="option" data-o="${oi}">
          <span class="option-key" aria-hidden="true">${String.fromCharCode(65 + pos)}</span>
          <span class="option-text">${tr(item.options[oi])}</span>
        </button>`
    )
    .join('');

  return `
    <details class="preguess" data-preguess data-qi="${qi}" open>
      <summary class="preguess-head">
        <span class="preguess-icon" aria-hidden="true">🤔</span>
        <span class="preguess-title">${esc(L.preguessTitle)}</span>
      </summary>
      <div class="preguess-body">
        <p class="preguess-hint">${esc(L.preguessHint)}</p>
        <p class="q-text">${tr(item.q)}</p>
        <div class="options" role="group">${options}</div>
        <div class="explain-slot" data-preguess-slot></div>
      </div>
    </details>`;
}

function bindPreguess(lesson) {
  const box = $('[data-preguess]');
  if (!box) return;
  const L = t();
  const qi = Number(box.dataset.qi);
  const item = (Array.isArray(lesson.quiz) ? lesson.quiz : [])[qi];
  if (!item) return;
  let answered = false;

  box.addEventListener('click', (ev) => {
    const opt = ev.target.closest('.option');
    if (!opt || opt.disabled || answered) return;
    answered = true;
    const oi = Number(opt.dataset.o);
    const correct = Number(item.correct);

    $$('.option', box).forEach((btn) => {
      const bi = Number(btn.dataset.o);
      btn.disabled = true;
      if (bi === correct) btn.classList.add('is-correct');
      else if (bi === oi) btn.classList.add('is-wrong');
      else btn.classList.add('is-dim');
    });

    const isRight = oi === correct;
    const slot = $('[data-preguess-slot]', box);
    if (slot) {
      slot.innerHTML = `
        <div class="explain ${isRight ? 'is-correct' : 'is-wrong'}">
          <strong>${esc(isRight ? L.correct : L.wrong)}</strong>
          ${tr(item.explain)}
        </div>
        <p class="preguess-after">${esc(L.preguessAfter)}</p>`;
    }
  });
}

// --- Feynman: explain it in your own words ------------------------------

const NOTE_SAVE_DELAY = 600;
let noteTimer = null;
let notePending = null; // { trackId, moduleId, lessonId, text }

// Writes whatever the debounce still owes. Called before a new keystroke wins
// the timer, on route change and on page hide, so nothing typed is ever lost.
function flushNote() {
  if (noteTimer) {
    clearTimeout(noteTimer);
    noteTimer = null;
  }
  if (!notePending) return;
  const p = notePending;
  notePending = null;
  setNote(p.trackId, p.moduleId, p.lessonId, p.text);
}

function queueNote(trackId, moduleId, lessonId, text, onSaved) {
  if (noteTimer) clearTimeout(noteTimer);
  notePending = { trackId, moduleId, lessonId, text };
  noteTimer = setTimeout(() => {
    noteTimer = null;
    flushNote();
    if (typeof onSaved === 'function') onSaved();
  }, NOTE_SAVE_DELAY);
}

function renderFeynman(track, mod, lesson, L) {
  const saved = noteText(track.id, mod.id, lesson.id);
  return `
    <section class="feynman" data-feynman>
      <h2 class="feynman-title">${esc(L.feynmanTitle)}</h2>
      <p class="feynman-desc">${esc(L.feynmanDesc)}</p>
      <textarea class="feynman-input" data-feynman-input rows="6" maxlength="${NOTE_CAP}"
        aria-label="${esc(L.feynmanAria)}"
        placeholder="${esc(L.feynmanPlaceholder)}">${esc(saved)}</textarea>
      <div class="feynman-row">
        <button type="button" class="btn" data-action="compare" aria-expanded="false">
          ${esc(L.feynmanCompare)}
        </button>
        <span class="feynman-status" data-feynman-status role="status" aria-live="polite"
          ${saved ? '' : 'hidden'}>${esc(L.feynmanSaved)}</span>
      </div>
      <div class="feynman-compare" data-feynman-compare hidden>
        <h3 class="feynman-sub">${esc(L.levels.eli5)}</h3>
        <div class="prose" data-feynman-eli5>${levelHtml(lesson, 'eli5')}</div>
        <p class="feynman-gap"><strong>${esc(L.feynmanGap)}</strong> ${esc(L.feynmanGapHint)}</p>
      </div>
    </section>`;
}

function bindFeynman(trackId, moduleId, lessonId) {
  const box = $('[data-feynman]');
  if (!box) return;
  const L = t();
  const input = $('[data-feynman-input]', box);
  const status = $('[data-feynman-status]', box);
  const compare = $('[data-feynman-compare]', box);
  const toggle = box.querySelector('[data-action="compare"]');

  if (input) {
    input.addEventListener('input', () => {
      if (status) {
        status.hidden = false;
        status.textContent = L.feynmanSaving;
      }
      queueNote(trackId, moduleId, lessonId, input.value, () => {
        if (!status) return;
        status.hidden = !input.value.trim();
        status.textContent = L.feynmanSaved;
      });
    });
    input.addEventListener('blur', () => {
      flushNote();
      if (status) {
        status.hidden = !input.value.trim();
        status.textContent = L.feynmanSaved;
      }
    });
  }

  if (toggle && compare) {
    toggle.addEventListener('click', () => {
      const show = compare.hidden;
      compare.hidden = !show;
      toggle.setAttribute('aria-expanded', String(show));
      toggle.textContent = show ? L.feynmanHide : L.feynmanCompare;
      if (show) compare.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

// --- ask Claude ---------------------------------------------------------

function askClaudeHref(track, mod, lesson, L) {
  const prompt = L.askClaudePrompt(tr(lesson.title), tr(track.title), tr(mod.title));
  return `https://claude.ai/new?q=${enc(prompt)}`;
}

function renderAskClaude(track, mod, lesson, L) {
  return `
    <p class="ask-claude">
      <a class="btn btn-block ask-claude-link" href="${askClaudeHref(track, mod, lesson, L)}"
        target="_blank" rel="noopener">${esc(L.askClaude)}</a>
    </p>`;
}

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
      const opts = item.options || [];
      const options = shuffledIdx(opts)
        .map(
          (oi, pos) => `
            <button type="button" class="option" data-q="${qi}" data-o="${oi}">
              <span class="option-key" aria-hidden="true">${String.fromCharCode(65 + pos)}</span>
              <span class="option-text">${tr(opts[oi])}</span>
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

  // v7.1: chips, inline markers and the sheet all read this one list. It is
  // rebuilt per render, so the language switch lands here too.
  setActiveTerms(lessonTerms(lesson));
  highlightTerms(activeTerms);

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
        // The new level is fresh markup - re-run the first-occurrence pass.
        highlightTerms(activeTerms, panel);
      }
    });
  });

  bindInteractive(lesson);
  bindTts(lesson);
  bindPreguess(lesson);
  bindFeynman(track.id, mod.id, lesson.id);

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
    // v6: the pre-question only belongs on an uncompleted lesson. Completing it
    // mid-page (quiz pass or "mark as done") retires the card straight away.
    if (isDone(track.id, mod.id, lesson.id)) {
      const guess = $('[data-preguess]');
      if (guess) guess.remove();
    }
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
const QUICK_DOSE = 5; // v6 micro-session ("I have 5 minutes")
const QUICK_DUE_MIN = 3; // below this many due cards #/quick sends you to a lesson
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

// Flat pool of cards from COMPLETED lessons inside the scope: quiz questions
// plus (v6) the lesson's flashcard terms. Lessons without a `terms` array -
// content is filled in module by module - simply contribute no term cards.
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
        if (!Array.isArray(lesson.terms)) continue;
        lesson.terms.forEach((entry, ti) => {
          if (!entry || typeof entry !== 'object' || !entry.term || !entry.def) return;
          pool.push({
            id: `${track.id}/${mod.id}/${lesson.id}/term/${ti}`,
            kind: 'term',
            term: entry,
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

// What the recap and the flags call a card, whichever kind it is.
function cardLabel(item) {
  return item.kind === 'term' ? tr(item.term.term) : tr(item.question.q);
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
function buildReviewRound(scope, mode, size = REVIEW_DOSE) {
  const { pool, due, fresh, later } = reviewBuckets(scope);
  const ordered =
    mode === 'endless'
      ? due.concat(shuffle(fresh), later)
      : due.concat(shuffle(fresh));
  return {
    items: ordered.slice(0, size),
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

/* --- v6 micro-session ------------------------------------------------- */

// Shortest unfinished lesson across every available track. Ties keep
// curriculum order, because the first match wins.
function shortestUnfinishedLesson() {
  let best = null;
  let bestMinutes = Infinity;
  for (const track of availableTracks()) {
    for (const x of trackLessons(track.id)) {
      if (isDone(track.id, x.module.id, x.lesson.id)) continue;
      const raw = Number(x.lesson.minutes);
      const minutes = Number.isFinite(raw) && raw > 0 ? raw : 999;
      if (minutes < bestMinutes) {
        best = x;
        bestMinutes = minutes;
      }
    }
  }
  return best;
}

// "I have 5 minutes": with at least three due cards it is a five-card round,
// otherwise the router jumps straight into the shortest unfinished lesson.
// Returns a href to redirect to, or null to run the round.
function quickRedirectHref() {
  const { due } = reviewBuckets({ kind: 'all' });
  if (due.length >= QUICK_DUE_MIN) return null;
  const target = shortestUnfinishedLesson();
  return target ? lessonHref(target.track.id, target.module.id, target.lesson.id) : null;
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

// Heading of the running round: endless counts rounds, quick is the v6
// micro-session, everything else is the daily dose.
function roundTitle(mode, round, L) {
  if (mode === 'endless') return L.reviewRound(round);
  if (mode === 'quick') return L.quickRound;
  return L.reviewDoseTitle;
}

function viewReviewSession(scope, mode) {
  const L = t();
  const size = mode === 'quick' ? QUICK_DOSE : REVIEW_DOSE;
  const round = buildReviewRound(scope, mode, size);
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
    size,
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
          <h2 data-review-head>${esc(roundTitle(mode, 1, L))}</h2>
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
        <div class="quiz-actions" data-review-actions>${reviewActionsHtml(round.items[0], L)}</div>
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

// One card, drawn with the same markup a lesson quiz question uses. Term cards
// (v6) share the shell but show only the front until the learner reveals it.
function reviewCardHtml(item, opts, L) {
  const src = `${tr(item.module.title)} · ${tr(item.lesson.title)}`;
  const flags = [];
  if (item.kind === 'term') flags.push({ text: L.termCard, kind: true });
  if (opts.isRepeat) flags.push({ text: L.reviewAgainCard });
  else if (opts.isNew) flags.push({ text: L.reviewNewCard });

  const head = `
      <a class="q-src" href="${lessonHref(item.track.id, item.module.id, item.lesson.id)}">${esc(src)}</a>
      ${
        flags.length
          ? `<span class="q-tags">${flags
              .map(
                (flag) =>
                  `<span class="pill${flag.kind ? ' pill-kind' : ''}">${esc(flag.text)}</span>`
              )
              .join('')}</span>`
          : ''
      }`;

  if (item.kind === 'term') {
    return `
    <div class="q q-term" data-question="${opts.index}">
      ${head}
      <p class="term-front"><span class="q-num" aria-hidden="true">${opts.index + 1}</span>${esc(
        tr(item.term.term)
      )}</p>
      <p class="term-prompt">${esc(L.termPrompt)}</p>
      <div class="term-back" data-term-back hidden></div>
      <div class="explain-slot"></div>
    </div>`;
  }

  return `
    <div class="q" data-question="${opts.index}">
      ${head}
      <p class="q-text"><span class="q-num" aria-hidden="true">${opts.index + 1}</span>${esc(
        tr(item.question.q)
      )}</p>
      <div class="options" role="group">${choiceOptions(item.question, opts.index)}</div>
      <div class="explain-slot"></div>
    </div>`;
}

// Buttons that belong under a freshly drawn card: a term card starts with
// "show answer", a quiz card is answered by tapping an option.
function reviewActionsHtml(item, L) {
  if (!item || item.kind !== 'term') return '';
  return `<button type="button" class="btn btn-primary btn-block" data-action="term-reveal">${esc(
    L.termReveal
  )}</button>`;
}

// The two self-grade buttons of a revealed term card (Anki classic).
function termGradeHtml(L) {
  return `
    <button type="button" class="btn btn-primary btn-block" data-action="term-grade" data-ok="1">✓ ${esc(
      L.termKnew
    )}</button>
    <button type="button" class="btn btn-block btn-term-miss" data-action="term-grade" data-ok="0">✕ ${esc(
      L.termMissed
    )}</button>`;
}

function choiceOptions(question, qi) {
  const opts = question.options || [];
  return shuffledIdx(opts)
    .map(
      (oi, pos) => `
        <button type="button" class="option" data-q="${qi}" data-o="${oi}">
          <span class="option-key" aria-hidden="true">${String.fromCharCode(65 + pos)}</span>
          <span class="option-text">${tr(opts[oi])}</span>
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
    if (action.dataset.action === 'term-reveal') revealTerm();
    if (action.dataset.action === 'term-grade') commit(action.dataset.ok === '1', '');
  });

  function current() {
    return s.queue[s.index] || null;
  }

  function syncHead() {
    const head = $('[data-review-head]', root);
    if (head) head.textContent = roundTitle(s.mode, s.round, L);
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
    if (actionSlot) actionSlot.innerHTML = reviewActionsHtml(item, L);
    syncHead();
  }

  // Term card: flip to the definition, then offer the self-grade buttons.
  function revealTerm() {
    const item = current();
    if (!item || item.kind !== 'term' || s.answeredCurrent) return;
    const wrapper = root.querySelector(`[data-question="${s.index}"]`);
    const back = wrapper ? $('[data-term-back]', wrapper) : null;
    if (!back || !back.hidden) return;
    back.innerHTML = tr(item.term.def);
    back.hidden = false;
    if (actionSlot) actionSlot.innerHTML = termGradeHtml(L);
  }

  function answer(oi) {
    const item = current();
    if (!item || item.kind === 'term' || s.answeredCurrent || !Number.isInteger(oi)) return;

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

    commit(isRight, tr(item.question.explain));
  }

  // Grades whatever card is on screen - a quiz answer or a term self-grade -
  // and puts the round back in "next card" state.
  function commit(isRight, explainHtml) {
    const item = current();
    if (!item || s.answeredCurrent) return;
    // A term card is only gradeable once its definition is on screen.
    if (item.kind === 'term') {
      const back = root.querySelector(`[data-question="${s.index}"] [data-term-back]`);
      if (!back || back.hidden) return;
    }
    s.answeredCurrent = true;

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

    const isTerm = item.kind === 'term';
    const verdict = isTerm ? (isRight ? L.termKnew : L.termMissed) : isRight ? L.correct : L.wrong;
    const note = isRight
      ? L.reviewBackIn(daysBetween(todayKey(), card.due))
      : isTerm
      ? L.termRequeued
      : L.reviewRequeued;
    const wrapper = root.querySelector(`[data-question="${s.index}"]`);
    const slot = wrapper ? $('.explain-slot', wrapper) : null;
    if (slot) {
      slot.innerHTML = `
        <div class="explain ${isRight ? 'is-correct' : 'is-wrong'}">
          <strong>${esc(verdict)}</strong>
          ${explainHtml}
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
    const next = buildReviewRound(s.scope, 'endless', s.size);
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
                   )}">${esc(cardLabel(row.item))}</a></span>
                   <span class="recap-verdict">${esc(row.ok ? L.recapOk : L.recapBad)}</span>
                 </li>`
             )
             .join('')}</ul>`;

    if (resultSlot) {
      resultSlot.innerHTML = `
        <div class="quiz-result ${pass ? 'is-pass' : 'is-fail'}">
          <div class="quiz-score">${pct}%</div>
          <p class="quiz-verdict">${esc(roundTitle(s.mode, s.round, L))} · ${esc(
            L.yourScore
          )}: ${right}/${cards}</p>
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
        <span class="streak-links">
          <a class="streak-stats" href="#/stats">${esc(L.statsLink)} ›</a>
          <a class="streak-stats" href="${glossaryHref()}">${esc(L.glossaryLink)} ›</a>
        </span>
      </div>
      <div class="streak-goal">
        <span class="streak-goal-text">${esc(reached ? L.goalDone : L.goalToday(todayCount, DAILY_GOAL))}</span>
        <span class="bar${reached ? ' is-complete' : ''}"><i data-pct="${pct}"></i></span>
        <span class="streak-hint">${esc(L.goalHint)}</span>
      </div>
    </div>`;
}

/* --- v6: weak areas + activity heatmap -------------------------------- */

// A module needs this many scheduled (already reviewed at least once) cards
// before its weakness score means anything.
const WEAK_MIN_CARDS = 3;
const WEAK_TOP = 3;
// Weakness = mostly "how low are the boxes", plus a lapse penalty.
const WEAK_BOX_WEIGHT = 0.65;
const WEAK_LAPSE_WEIGHT = 0.35;

const HEAT_WEEKS = 16;
const HEAT_DAYS = HEAT_WEEKS * 7;
// Counts per day -> intensity bucket 1..4 (0 is "nothing happened").
const HEAT_STEPS = [1, 2, 3, 5];

// Weakness per module, from the srs cards that belong to it. A card is
// "scheduled" simply by being in `srs` - new cards say nothing about strength.
// Boxes are averaged with a weight of (1 + lapses), so a card you keep failing
// drags its module down harder than a card that just sits in box 1.
function moduleWeakness() {
  const rows = new Map();

  for (const [id, card] of Object.entries(state.srs)) {
    if (!card || typeof card !== 'object') continue;
    const parts = id.split('/');
    const found = getModule(parts[0], parts[1]);
    if (!found || !isAvailable(found.track)) continue;

    const key = `${parts[0]}/${parts[1]}`;
    let row = rows.get(key);
    if (!row) {
      row = {
        track: found.track,
        module: found.module,
        cards: 0,
        lapses: 0,
        reps: 0,
        boxSum: 0,
        weightSum: 0,
      };
      rows.set(key, row);
    }

    const box = clamp(Number(card.box) || 0, 0, SRS_BOX_MAX);
    const lapses = Math.max(0, Number(card.lapses) || 0);
    const weight = 1 + lapses;
    row.cards += 1;
    row.lapses += lapses;
    row.reps += Math.max(0, Number(card.reps) || 0);
    row.boxSum += box * weight;
    row.weightSum += weight;
  }

  const out = [];
  for (const row of rows.values()) {
    if (row.cards < WEAK_MIN_CARDS) continue;
    const avgBox = row.weightSum ? row.boxSum / row.weightSum : 0;
    const boxWeak = 1 - avgBox / SRS_BOX_MAX;
    const attempts = row.reps + row.lapses;
    const lapseRatio = attempts ? row.lapses / attempts : 0;
    const score = clamp(
      Math.round((boxWeak * WEAK_BOX_WEIGHT + lapseRatio * WEAK_LAPSE_WEIGHT) * 100),
      0,
      100
    );
    out.push({ ...row, avgBox, score });
  }

  // Weakest first; ties broken by card count so a bigger sample wins.
  out.sort((a, b) => b.score - a.score || b.cards - a.cards);
  return out;
}

function weakestModule() {
  const rows = moduleWeakness();
  return rows.length ? rows[0] : null;
}

function weakScopeHref(row) {
  return reviewHref({ kind: 'module', trackId: row.track.id, moduleId: row.module.id }, 'endless');
}

// Home chip under the streak card. Absent until a module qualifies.
function weakChip(L) {
  const row = weakestModule();
  if (!row) return '';
  return `
    <a class="weak-chip" href="${weakScopeHref(row)}">
      <span class="weak-chip-icon" aria-hidden="true">🎯</span>
      <span class="weak-chip-text">${esc(L.weakChipLabel(tr(row.module.title)))}</span>
      <span class="weak-chip-cta">${esc(L.weakChipCta)} ›</span>
    </a>`;
}

function weakRowsHtml(rows, L) {
  return rows
    .map(
      (row) => `
      <li class="weak-row">
        <div class="weak-head">
          <span class="weak-icon" aria-hidden="true">${esc(row.module.icon || '📘')}</span>
          <span class="weak-main">
            <span class="weak-name">${esc(tr(row.module.title))}</span>
            <span class="weak-meta">${esc(tr(row.track.title))} · ${esc(
              L.statsWeakMeta(row.cards, row.lapses)
            )}</span>
          </span>
          <span class="weak-score">${esc(L.statsWeakScore(row.score))}</span>
        </div>
        <span class="bar weak-bar"><i data-pct="${row.score}"></i></span>
        <a class="btn btn-block weak-cta" href="${weakScopeHref(row)}">🔁 ${esc(
          L.statsReviewModule
        )}</a>
      </li>`
    )
    .join('');
}

/* --- heatmap ---------------------------------------------------------- */

function heatBucket(count) {
  if (count <= 0) return 0;
  let level = 1;
  for (let i = 1; i < HEAT_STEPS.length; i += 1) {
    if (count >= HEAT_STEPS[i]) level = i + 1;
  }
  return level;
}

// Monday-first weekday index for a Date.
function weekdayIndex(date) {
  return (date.getDay() + 6) % 7;
}

// 16 columns x 7 rows ending on the column that holds today. Cells are emitted
// column by column, which is exactly the order a `grid-auto-flow: column` grid
// wants. Days after today (tail of the last column) are rendered as blanks.
function heatCells() {
  const now = new Date();
  const today = todayKey(now);
  const back = (HEAT_WEEKS - 1) * 7 + weekdayIndex(now);
  const start = new Date(now.getTime());
  start.setDate(start.getDate() - back);

  const cells = [];
  for (let i = 0; i < HEAT_DAYS; i += 1) {
    const d = new Date(start.getTime());
    d.setDate(d.getDate() + i);
    const key = todayKey(d);
    const future = key > today;
    cells.push({
      key,
      date: d,
      count: future ? 0 : activityOn(key),
      future,
      isToday: key === today,
    });
  }
  return cells;
}

// One label per column, printed only when the month changes (GitHub style).
function heatMonthLabels(cells, L) {
  const months = L.statsMonths || [];
  let last = -1;
  const out = [];
  for (let col = 0; col < HEAT_WEEKS; col += 1) {
    const first = cells[col * 7];
    const m = first.date.getMonth();
    const show = m !== last;
    last = m;
    out.push(show ? months[m] || '' : '');
  }
  return out;
}

function heatmapHtml(L) {
  const cells = heatCells();
  const points = cells.reduce((n, c) => n + c.count, 0);
  const activeDays = cells.filter((c) => c.count > 0).length;

  const grid = cells
    .map((cell) => {
      if (cell.future) return '<span class="heat-cell is-blank" aria-hidden="true"></span>';
      const level = heatBucket(cell.count);
      const label = L.statsCellAria(cell.key, cell.count);
      return `<span class="heat-cell${cell.isToday ? ' is-today' : ''}" data-level="${level}"
        title="${esc(label)}${cell.isToday ? ` (${esc(L.statsHeatToday)})` : ''}"><span
        class="sr-only">${esc(label)}</span></span>`;
    })
    .join('');

  const months = heatMonthLabels(cells, L)
    .map((label) => `<span class="heat-month">${esc(label)}</span>`)
    .join('');

  // Only every other weekday gets a label, otherwise the gutter is unreadable
  // on a phone.
  const days = (L.statsWeekdays || [])
    .map(
      (label, i) =>
        `<span class="heat-day">${i % 2 === 0 ? esc(label) : ''}</span>`
    )
    .join('');

  const legend = [0, 1, 2, 3, 4]
    .map((level) => `<span class="heat-cell" data-level="${level}"></span>`)
    .join('');

  return `
    <div class="heat">
      <div class="heat-scroll">
        <div class="heat-inner">
          <div class="heat-months-row">
            <span class="heat-gutter" aria-hidden="true"></span>
            <div class="heat-months">${months}</div>
          </div>
          <div class="heat-body">
            <div class="heat-days" aria-hidden="true">${days}</div>
            <div class="heat-grid" role="img"
              aria-label="${esc(L.statsHeatSummary(points, activeDays))}">${grid}</div>
          </div>
        </div>
      </div>
      <div class="heat-foot">
        <span class="heat-summary">${esc(L.statsHeatSummary(points, activeDays))}</span>
        <span class="heat-legend">
          <span class="heat-legend-label">${esc(L.statsHeatLess)}</span>
          ${legend}
          <span class="heat-legend-label">${esc(L.statsHeatMore)}</span>
        </span>
      </div>
    </div>`;
}

function viewStats() {
  const L = t();
  const rows = moduleWeakness().slice(0, WEAK_TOP);

  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">📊 ${esc(L.statsTitle)}</span>
        <h1>${esc(L.statsTitle)}</h1>
        <p class="hero-sub">${esc(L.statsDesc)}</p>
      </div>

      <h2 class="section-title">${esc(L.statsWeakTitle)}</h2>
      ${
        rows.length
          ? `<ul class="weak-list">${weakRowsHtml(rows, L)}</ul>
             <p class="stats-hint">${esc(L.statsWeakHint)}</p>`
          : `<div class="notice notice-soft">
               <p>${esc(L.statsWeakEmpty)}</p>
               <a class="btn btn-primary" href="${reviewHref(null)}">🔁 ${esc(L.reviewTitle)}</a>
             </div>`
      }

      <h2 class="section-title">${esc(L.statsHeatTitle)}</h2>
      ${heatmapHtml(L)}
      <p class="stats-hint">${esc(L.statsHeatHint)}</p>
    </section>`;
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

/* --- v7.1: glossary layer --------------------------------------------- */

// One lesson's `terms` normalized to the current UI language. Entries without
// both a term and a definition are dropped, so a half-written term never
// reaches a chip, a marker or the glossary.
function lessonTerms(lesson) {
  if (!lesson || !Array.isArray(lesson.terms)) return [];
  const out = [];
  lesson.terms.forEach((entry, idx) => {
    if (!entry || typeof entry !== 'object') return;
    const term = tr(entry.term).trim();
    const def = tr(entry.def).trim();
    if (!term || !def) return;
    out.push({ term, def, idx });
  });
  return out;
}

// The chips row under the level tabs. `data-term-chip` is the index into
// activeTerms, which bindLesson refreshes for the lesson on screen.
function renderTermChips(lesson, L) {
  const terms = lessonTerms(lesson);
  if (!terms.length) return '';
  const chips = terms
    .map(
      (entry, i) => `
        <button type="button" class="term-chip" data-term-chip="${i}"
          aria-label="${esc(L.termChipAria(entry.term))}">${esc(entry.term)}</button>`
    )
    .join('');
  return `<div class="term-chips" role="group" aria-label="${esc(L.termsLabel)}">${chips}</div>`;
}

/* --- shared definition sheet ------------------------------------------ */

// Terms of whatever page is on screen: chips, inline markers and glossary rows
// all address them by index, so only one list has to stay in sync.
let activeTerms = [];
let defSheetEl = null;
let defSheetKeydown = null;
let defSheetLastFocus = null;

function setActiveTerms(list) {
  activeTerms = Array.isArray(list) ? list : [];
}

function openTermByIndex(i) {
  const entry = activeTerms[Number(i)];
  if (!entry) return;
  openDefSheet(entry);
}

// `entry.def` is authored HTML (the content ships inline <code>/<strong>), so
// it goes in as markup; everything else is escaped.
function openDefSheet(entry) {
  if (!entry || !document.body || typeof document.createElement !== 'function') return;
  const L = t();
  closeDefSheet();

  try {
    defSheetLastFocus = document.activeElement || null;
  } catch (err) {
    defSheetLastFocus = null;
  }

  const root = document.createElement('div');
  root.className = 'def-sheet-root';
  root.dataset.defSheet = '1';
  const source =
    entry.href && entry.crumb
      ? `<a class="def-sheet-src" href="${entry.href}">${esc(L.defSheetSource)}: ${esc(
          entry.crumb
        )} ›</a>`
      : '';
  root.innerHTML = `
    <div class="def-sheet-backdrop" data-sheet-backdrop></div>
    <div class="def-sheet" role="dialog" aria-modal="true" aria-label="${esc(L.defSheetAria)}">
      <span class="def-sheet-grip" aria-hidden="true"></span>
      <h2 class="def-sheet-term">${esc(entry.term)}</h2>
      <div class="def-sheet-def">${entry.def}</div>
      ${source}
      <button type="button" class="btn btn-block def-sheet-close" data-sheet-close>${esc(
        L.defSheetClose
      )}</button>
    </div>`;

  document.body.appendChild(root);
  defSheetEl = root;

  defSheetKeydown = (ev) => {
    if (ev && ev.key === 'Escape') closeDefSheet();
  };
  document.addEventListener('keydown', defSheetKeydown);

  const btn = root.querySelector ? root.querySelector('[data-sheet-close]') : null;
  if (btn && typeof btn.focus === 'function') {
    requestAnimationFrame(() => {
      try {
        btn.focus();
      } catch (err) {
        /* detached before the frame ran */
      }
    });
  }
}

function closeDefSheet() {
  if (defSheetKeydown) {
    document.removeEventListener('keydown', defSheetKeydown);
    defSheetKeydown = null;
  }
  if (defSheetEl) {
    if (typeof defSheetEl.remove === 'function') defSheetEl.remove();
    defSheetEl = null;
  }
  if (defSheetLastFocus && typeof defSheetLastFocus.focus === 'function') {
    try {
      defSheetLastFocus.focus({ preventScroll: true });
    } catch (err) {
      /* the opener may be gone with the previous render */
    }
  }
  defSheetLastFocus = null;
}

// One delegated listener for the whole layer, installed once at boot: chips,
// inline markers, glossary rows and the sheet's own close targets.
let glossaryClicksBound = false;

function bindGlossaryClicks() {
  if (glossaryClicksBound) return;
  glossaryClicksBound = true;
  document.addEventListener('click', (ev) => {
    const target = ev && ev.target;
    if (!target || typeof target.closest !== 'function') return;
    if (target.closest('[data-sheet-close]') || target.closest('[data-sheet-backdrop]')) {
      closeDefSheet();
      return;
    }
    if (defSheetEl && target.closest('[data-def-sheet]')) return;
    const opener = target.closest('[data-term-chip], [data-term-mark], [data-gl-term]');
    if (!opener) return;
    const raw =
      opener.dataset.termChip != null
        ? opener.dataset.termChip
        : opener.dataset.termMark != null
          ? opener.dataset.termMark
          : opener.dataset.glTerm;
    openTermByIndex(raw);
  });
}

/* --- inline first-occurrence highlighter ------------------------------ */

// Text nodes inside these never get touched: code samples must stay verbatim,
// and links/buttons already own the tap.
const TERM_SKIP_TAGS = new Set(['CODE', 'PRE', 'A', 'BUTTON', 'SCRIPT', 'STYLE', 'SVG', 'KBD']);
const TERM_WORD_RE = /[\p{L}\p{N}_]/u;

function isWordChar(ch) {
  return typeof ch === 'string' && ch !== '' && TERM_WORD_RE.test(ch);
}

// Post-render DOM pass over the ACTIVE level's text nodes. Wraps the FIRST
// occurrence of each term (case-insensitive) in a tappable marker. Operates on
// text nodes only - never innerHTML surgery - so authored markup survives.
function highlightTerms(terms, root) {
  const host = root || $('#level-panel');
  if (!host || !terms || !terms.length) return 0;
  if (typeof document.createTreeWalker !== 'function' || typeof NodeFilter === 'undefined') {
    return 0;
  }

  // term key -> index in activeTerms; longest first so "context window" wins
  // over "context" when both start at the same offset.
  const pending = [];
  terms.forEach((entry, i) => {
    const key = entry.term.trim().toLowerCase();
    if (key.length < 2) return;
    if (pending.some((p) => p.key === key)) return;
    pending.push({ key, index: i });
  });
  pending.sort((a, b) => b.key.length - a.key.length);
  if (!pending.length) return 0;

  const nodes = [];
  try {
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        for (let el = node.parentNode; el && el !== host; el = el.parentNode) {
          if (el.nodeType !== 1) continue;
          if (TERM_SKIP_TAGS.has(String(el.tagName || '').toUpperCase())) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
  } catch (err) {
    return 0;
  }

  let wrapped = 0;
  for (const start of nodes) {
    if (!pending.length) break;
    let node = start;
    while (node && pending.length) {
      const hay = String(node.nodeValue || '').toLowerCase();
      let best = null;
      for (const cand of pending) {
        let at = hay.indexOf(cand.key);
        while (at !== -1) {
          const before = at > 0 ? hay[at - 1] : '';
          const after = hay[at + cand.key.length] || '';
          if (!isWordChar(before) && !isWordChar(after)) break;
          at = hay.indexOf(cand.key, at + 1);
        }
        if (at === -1) continue;
        if (!best || at < best.at || (at === best.at && cand.key.length > best.cand.key.length)) {
          best = { at, cand };
        }
      }
      if (!best) break;

      const hit = node.splitText(best.at);
      hit.splitText(best.cand.key.length);
      const entry = terms[best.cand.index];
      const mark = document.createElement('button');
      mark.type = 'button';
      mark.className = 'term-mark';
      mark.dataset.termMark = String(best.cand.index);
      mark.setAttribute('aria-label', t().termMarkAria(entry.term));
      mark.textContent = hit.nodeValue;
      if (hit.parentNode) hit.parentNode.replaceChild(mark, hit);
      wrapped += 1;

      const used = pending.indexOf(best.cand);
      if (used !== -1) pending.splice(used, 1);
      node = mark.nextSibling && mark.nextSibling.nodeType === 3 ? mark.nextSibling : null;
    }
  }
  return wrapped;
}

/* --- global glossary route -------------------------------------------- */

const GLOSSARY_MIN = 2;

let glossaryCache = { lang: '', entries: [] };
let glossaryQuery = '';

// Every term from every available track, deduped by term text in the CURRENT
// language (first definition wins) and sorted alphabetically.
function glossaryEntries() {
  if (glossaryCache.lang === state.lang) return glossaryCache.entries;
  const seen = new Set();
  const out = [];
  for (const track of availableTracks()) {
    for (const mod of track.modules || []) {
      for (const lesson of mod.lessons || []) {
        for (const entry of lessonTerms(lesson)) {
          const key = entry.term.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          out.push({
            term: entry.term,
            def: entry.def,
            key,
            hay: `${key} ${stripTags(entry.def).toLowerCase()}`,
            crumb: `${tr(mod.title)} · ${tr(lesson.title)}`,
            href: lessonHref(track.id, mod.id, lesson.id),
          });
        }
      }
    }
  }
  try {
    out.sort((a, b) => a.term.localeCompare(b.term, state.lang === 'pl' ? 'pl' : 'en'));
  } catch (err) {
    out.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  }
  glossaryCache = { lang: state.lang, entries: out };
  return out;
}

function glossarySectionKey(term) {
  const ch = String(term || '').charAt(0).toUpperCase();
  return TERM_WORD_RE.test(ch) && !/\d/.test(ch) ? ch : '#';
}

function glossaryVisible() {
  const all = glossaryEntries();
  const q = glossaryQuery.trim().toLowerCase();
  if (q.length < GLOSSARY_MIN) return all;
  return all.filter((entry) => entry.hay.includes(q));
}

// The rows also feed activeTerms, so tapping a term opens the shared sheet
// with its source-lesson link (the "opened outside that lesson" case).
function glossaryListHtml() {
  const L = t();
  const all = glossaryEntries();
  if (!all.length) return `<p class="search-note">${esc(L.glossaryNone)}</p>`;

  const rows = glossaryVisible();
  setActiveTerms(rows);
  if (!rows.length) return `<p class="search-note">${esc(L.glossaryEmpty)}</p>`;

  const q = glossaryQuery.trim();
  const note =
    q.length < GLOSSARY_MIN
      ? `${esc(L.glossaryCount(all.length))} · ${esc(L.glossaryTooShort)}`
      : esc(L.glossaryFiltered(rows.length, all.length));

  let section = '';
  const parts = [];
  rows.forEach((entry, i) => {
    const key = glossarySectionKey(entry.term);
    if (key !== section) {
      if (section) parts.push('</ul>');
      section = key;
      parts.push(`<h2 class="gl-section">${esc(key)}</h2><ul class="gl-list">`);
    }
    parts.push(`
      <li class="gl-row">
        <button type="button" class="gl-term" data-gl-term="${i}"
          aria-label="${esc(L.termChipAria(entry.term))}">${esc(entry.term)}</button>
        <div class="gl-def">${entry.def}</div>
        <a class="gl-src" href="${entry.href}">${esc(entry.crumb)} ›</a>
      </li>`);
  });
  if (section) parts.push('</ul>');

  return `<p class="search-note">${note}</p>${parts.join('')}`;
}

function viewGlossary() {
  const L = t();
  return `
    <section class="view">
      <a class="back-link" href="#/">← ${esc(L.backHome)}</a>
      <div class="hero">
        <span class="hero-eyebrow">📖 ${esc(L.glossaryTitle)}</span>
        <h1>${esc(L.glossaryTitle)}</h1>
        <p class="hero-sub">${esc(L.glossaryDesc)}</p>
      </div>

      <div class="gl-search">
        <div class="search-box">
          <span class="search-box-icon" aria-hidden="true">🔎</span>
          <input class="search-input" type="search" data-glossary-input
            value="${esc(glossaryQuery)}" placeholder="${esc(L.glossaryPlaceholder)}"
            aria-label="${esc(L.glossaryAria)}" autocomplete="off" enterkeyhint="search">
        </div>
      </div>

      <div class="gl-results" data-glossary-results aria-live="polite">
        ${glossaryListHtml()}
      </div>
    </section>`;
}

function bindGlossary() {
  const input = $('[data-glossary-input]');
  const out = $('[data-glossary-results]');
  if (!input || !out) return;
  input.addEventListener('input', () => {
    glossaryQuery = input.value;
    out.innerHTML = glossaryListHtml();
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

  // v7.1: one delegated listener for chips / inline markers / glossary rows.
  bindGlossaryClicks();

  // A phone can freeze or kill the tab between two keystrokes, so the pending
  // Feynman note is written out the moment the page stops being visible.
  window.addEventListener('pagehide', flushNote);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushNote();
  });

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
