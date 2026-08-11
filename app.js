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

/* --------------------------------------------------------------- i18n ---- */

const I18N = {
  pl: {
    appTitle: 'Learn AI',
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
    backTrack: 'Moduly kierunku',
    comingSoon: 'Wkrotce',
    comingSoonHint: 'Ten kierunek jest w przygotowaniu. Zajrzyj, co bedzie w srodku.',
    plannedLabel: 'Co bedzie w kursie',
    plannedEmpty: 'Plan tego kierunku powstaje. Wroc tu za chwile.',
    openTrack: 'Otworz kierunek',
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
  },
  en: {
    appTitle: 'Learn AI',
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
    backTrack: 'Track modules',
    comingSoon: 'Coming soon',
    comingSoonHint: 'This track is in the works. Take a look at what is planned.',
    plannedLabel: 'What the course will cover',
    plannedEmpty: 'The outline for this track is being written. Check back soon.',
    openTrack: 'Open track',
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

const DEFAULT_STATE = { lang: 'pl', level: 'eli5', done: {} };

function loadState() {
  const state = { ...DEFAULT_STATE, done: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return state;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return state;
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
  } catch (err) {
    console.warn('learn-ai: could not read progress, starting fresh.', err);
  }
  return state;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('learn-ai: could not save progress.', err);
  }
}

const state = loadState();

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
  saveState();
  updateHeaderProgress();
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

  const routeKey = JSON.stringify(route);
  const routeChanged = routeKey !== lastRouteKey;
  lastRouteKey = routeKey;

  document.documentElement.lang = state.lang;
  syncLangButtons();
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
  else html = viewNotFound();

  main.innerHTML = html;

  if (route.name === 'lesson') bindLesson(route.trackId, route.moduleId, route.lessonId);
  animateBars(main);

  if (routeChanged) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    main.focus({ preventScroll: true });
  }
  document.title = pageTitle(route);
}

function pageTitle(route) {
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

      ${ringCard(L.yourProgress, L.lessonsDone(done, total), pct, L.totalMinutes(overallMinutes()))}

      <h2 class="section-title">${esc(L.tracksLabel)}</h2>
      <div class="card-list">${cards}</div>
    </section>`;
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
              <span class="option-text">${esc(tr(opt))}</span>
            </button>`
        )
        .join('');
      return `
        <div class="q" data-question="${qi}">
          <p class="q-text"><span class="q-num" aria-hidden="true">${qi + 1}</span>${esc(tr(item.q))}</p>
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
          ${esc(tr(item.explain))}
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

/* -------------------------------------------------------------- chrome --- */

function syncLangButtons() {
  const toggle = $('#lang-toggle');
  if (!toggle) return;
  toggle.setAttribute('aria-label', t().langAria);
  $$('.lang-btn', toggle).forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === state.lang));
  });
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
