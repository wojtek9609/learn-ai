# Learn AI

Live: **https://wojtek9609.github.io/learn-ai/**

## English

A mobile-first, bilingual (PL/EN) static learning app built around **tracks**
(kierunki): "AI Engineer / Applied AI" plus three full frontend tracks.
No frameworks, no build step, no npm dependencies - plain HTML, CSS and ES
modules, hash routing, relative URLs only, so it works served from the
`/learn-ai/` subpath.

Every lesson is explained at three levels (Like I'm five / High schooler / Pro),
has one inline SVG diagram with a bilingual caption, and a 4-question quiz.
Selected lessons also carry an **interactive step-through player** (3-8 SVG
frames with a slider, prev/next buttons, arrow keys and swipe) under the static
diagram. Scoring 75% or more marks the lesson complete. Progress, language and
the chosen level are stored in `localStorage` under the key `learnai:v1`.

On top of the lessons sits a practice layer: **review**, a **mock interview**
(4 banks x 36 questions), bilingual **search**, a **continue** card and a daily
**streak**, **export/import** of progress, and a **listening mode** that reads
a lesson out loud. See "Practice modes and tools" below.

### Curriculum - 4 tracks, 27 modules, 153 lessons

All four tracks are **available** (no coming-soon placeholders left).

| Track | Modules | Lessons |
|-------|---------|---------|
| 🤖 AI Engineer | 9 | 55 |
| 🔵 React (for Vue devs) | 6 | 33 |
| 🟢 Vue 3 in practice | 6 | 33 |
| 🏗️ Frontend Architecture | 6 | 32 |
| **Total** | **27** | **153** |

#### 🤖 AI Engineer - 9 modules, 55 lessons

| # | Module | Lessons |
|---|--------|---------|
| 1 | LLM Fundamentals | 6 - how LLMs work, tokenization, context window, embeddings, sampling params, cost/latency/caching |
| 2 | Structured Output & Tool Calling | 5 - why structured output, JSON Schema, validation & retries, tool calling, MCP |
| 3 | RAG | 6 - what is RAG, chunking, vector databases, hybrid search & reranking, retrieval evaluation, failure modes |
| 4 | Agents | 6 - what is an agent, tool design, planning patterns, context budgets, reliability, guardrails & HITL |
| 5 | Evals & Observability | 6 - why evals, eval types, LLM-as-judge, tooling, CI & regression, request economics (batch, cache, fallback) |
| 6 | Streaming & AI Product UX | 6 - SSE vs WebSockets, partial JSON, generative UI, approval flows, perceived performance, AI UX errors |
| 7 | LLM Security | 5 - prompt injection, jailbreaks vs injection, OWASP LLM Top 10, data leakage & PII, sandboxing |
| 8 | Python for AI Engineers | 7 - reading Python, env tooling, async HTTP, typing & pydantic, scripts & notebooks, FastAPI endpoints, pytest |
| 9 | Cloud & Infrastructure | 8 - what is cloud, VMs & scaling & networking, containers & Docker, Kubernetes, serverless, microservices, queues & events, CI/CD |

#### 🔵 React (for Vue devs) - 6 modules, 33 lessons

Every lesson teaches the React concept side by side with its Vue equivalent.

| # | Module | Lessons |
|---|--------|---------|
| 1 | The React mental model | 6 - thinking in React, JSX vs templates, components & props, re-renders vs fine-grained reactivity, reconciliation & keys, the React 19 landscape |
| 2 | Hooks vs the Composition API | 6 - useState vs ref, useEffect vs watchers, useMemo vs computed, useCallback, custom hooks vs composables, useRef & the DOM |
| 3 | Component patterns | 5 - children vs slots, context vs provide/inject, controlled vs v-model, compound components & render props, error boundaries & Suspense |
| 4 | State & Data | 5 - colocation & lifting, Zustand vs Pinia, TanStack Query, React Hook Form vs VeeValidate, URL state |
| 5 | Frameworks & RSC | 5 - React Router vs Vue Router, Next.js vs Nuxt, server components, data fetching in Next, SPA vs meta-framework |
| 6 | Performance, testing and migration | 6 - re-render profiling, memoization & the compiler, virtualization, code splitting, Testing Library vs Vue Test Utils, the Vue-to-React cheatsheet |

#### 🟢 Vue 3 in practice - 6 modules, 33 lessons

Aimed at a developer who already writes Vue daily: internals, patterns, edge cases.

| # | Module | Lessons |
|---|--------|---------|
| 1 | Reactivity fundamentals | 6 - the proxy mental model, ref vs reactive, computed in depth, watch vs watchEffect, template directives, script setup |
| 2 | Composition API mastery | 5 - Options to Composition, composable design patterns, lifecycle, provide/inject, defineProps & defineModel |
| 3 | Components in depth | 6 - props/events/v-model, scoped slots, dynamic & async components, Teleport & Transition, typed generic components, renderless components |
| 4 | Reactivity internals | 5 - track & trigger, effects and the scheduler, shallow APIs & markRaw, pitfalls, render functions & JSX |
| 5 | State, Routing & Nuxt | 5 - Pinia fundamentals, Pinia plugins, Vue Router, navigation guards, Nuxt 3 |
| 6 | Performance and testing | 6 - v-memo & rendering, bundles & lazy loading, Vue Test Utils, component testing, Playwright E2E, Vapor Mode |

#### 🏗️ Frontend Architecture - 6 modules, 32 lessons

Senior to principal level: design systems at scale, monorepos, delivery, leadership.

| # | Module | Lessons |
|---|--------|---------|
| 1 | Architecture thinking | 5 - what frontend architecture is, boundaries & coupling, ADRs and RFCs, Conway's law, build vs buy |
| 2 | Design systems at scale | 6 - design tokens & theming, component API design, versioning & breaking changes, docs & playgrounds, visual regression, governance |
| 3 | State and data architecture | 5 - state taxonomy, the data-fetching layer, realtime & optimistic UI, offline-first PWA, API contracts & BFF |
| 4 | Scaling codebases | 5 - monorepo tooling, micro-frontend trade-offs, shared library boundaries, feature flags, dependency upgrades |
| 5 | Performance architecture | 5 - Web Vitals budgets, rendering strategies, asset strategy, runtime patterns, RUM monitoring |
| 6 | Quality, delivery & leadership | 6 - testing strategy, frontend CI/CD, error observability, frontend security, code review culture, principal-track case studies |

### Practice modes and tools

Beyond reading lessons, the app has a practice layer built on the progress you
have already made. Everything is client-side and lives in the same
`localStorage` key.

**🔁 Review (`#/review`)** - spaced practice over quiz questions from lessons
you have **completed**. Start it from the home card, or from a module page
("Review this module") once at least one lesson there is done. Pick a scope -
everything, or a single module - and get a session of 10 questions drawn from
that pool, with the questions you previously got wrong given priority. The
question UX is identical to a lesson quiz (instant colouring plus the
explanation); the end screen shows the score and a per-question recap. Wrong
answers go back into the missed pool, correct ones leave it.

**🎤 Interview (`#/interview`)** - a mock technical interview, deliberately
harder than the lesson quizzes: production scenarios, trade-offs, "what breaks
when...". Each track has its own bank of 36 questions (144 in total), roughly
60% multiple choice and 40% open. Choose one track or all of them, then answer
10. Choice questions are scored like a quiz. For an open question you think
first, tap "Show answer" to reveal a model answer plus the key points an
interviewer listens for, and then self-assess: "I knew it" / "Need to review".
Anything you marked "Need to review" is served first next time.

**🔎 Search (`#/search`)** - the magnifier in the sticky header. The index is
built lazily on first use from lesson titles and the tag-stripped text of all
three levels, in **both languages at once**, so an English query finds Polish
lessons and the other way round. Minimum 2 characters, title matches rank above
content matches, results show a track/module breadcrumb plus the matching
snippet, capped at 30.

**Continue & streak** - the home screen shows a "Continue" card that jumps
straight back to the last lesson you opened (or the next unfinished one), plus
a streak card: consecutive days with at least one activity, and today's count
against a fixed daily goal of 2. Completing a lesson or finishing a review or
interview session counts as activity.

**Export / import** - a small settings block at the bottom of the home screen.
Export downloads `learnai-progress.json` and copies a compact base64 code to
the clipboard. Import takes either a pasted code or a picked `.json` file,
tells you what it contains (lesson count and date) and asks for confirmation
before it overwrites what you have. Useful for moving progress between the
browser and the installed Android app - there is no account and no server.

**🎧 Listening mode** - on every lesson page, a toolbar under the level tabs:
play/pause, stop and a reading speed (0.9x / 1x / 1.2x). It reads the lesson
title and the **currently selected level**, tags stripped, split into
paragraph-sized chunks so Chrome does not cut off long utterances. The voice
follows the UI language (pl-PL / en-US, falling back to the default voice).
Speech stops on navigation, on a level switch and on a language switch. If the
browser has no `speechSynthesis` support, the toolbar is not rendered at all.

### Learning effectiveness

Six features built around how memory actually works: retrieval practice,
spacing, self-explanation and honest feedback about what you are worst at.

**🃏 Flashcards** - every lesson carries 3-5 key terms (`terms`), the things you
should be able to define cold. Once a lesson is completed its term cards join
the same spaced-repetition schedule as its quiz questions, and review sessions
interleave both kinds. A term card is Anki classic: the term on the front, tap
"Show answer" for the definition, then grade yourself "I knew it" / "I didn't".
A miss re-queues the card in the current round, exactly like a failed question.

**🤔 Guess before you read** - on a lesson you have not completed yet, a card
above the level tabs asks one of that lesson's quiz questions before you read
anything. The pick is stable for the whole day. Answering gives instant
feedback plus the explanation, and touches nothing: no score, no scheduling,
no activity. Guessing wrong first makes the reading stick better.

**📊 Weak areas and heatmap (`#/stats`)** - reachable from the "Statistics" link
on the streak card. It ranks your three weakest modules from their scheduled
cards (average box, weighted by how often you lapsed on them), each with a
"Review this module" button that opens an endless session scoped there. Below
it, a GitHub-style heatmap of the last 16 weeks of activity. When a weakest
module exists, the home screen shows a compact chip linking straight to it.

**✍️ Feynman: explain it in your own words** - between the lesson content and
the quiz, a textarea that autosaves as you type (debounced, capped at 5000
characters, one note per lesson, pre-filled when you come back). "Compare with
the simple version" reveals the ELI5 text inline so you can see what you left
out. Voice typing works through the phone keyboard.

**⚡ I have 5 minutes (`#/quick`)** - a button on the home screen. With at least
three cards due it runs a five-card review round that counts toward the day;
otherwise it drops you straight into the shortest unfinished lesson.

**💬 Ask Claude** - under the quiz, a link that opens claude.ai pre-filled with
a prompt about this exact lesson: explain it differently, check my
understanding with a few questions, give one practical frontend example. Pure
link, no API key, no data leaves the app.

### Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

A plain file:// open will not work - ES modules require an HTTP origin.

### Install on Android

The app is a PWA (Progressive Web App - a website installable like a native app),
so there is no store and no signing. Two channels:

**Release channel (what is shipped)**

1. Open **https://wojtek9609.github.io/learn-ai/** in Chrome on the phone.
2. Chrome menu (three dots) -> **Install app** / **Add to Home screen**.
3. It runs standalone and works offline (the service worker precaches the app
   shell and all content modules).
4. Auto-updates: every push to `main` redeploys and stamps `sw.js` with the
   commit SHA, so the next time the app is opened it picks the new version up -
   either silently or via the small **New version - Refresh** toast.

**Dev channel (unreleased work, over Tailscale)**

1. On the Mac: `./scripts/dev-tailscale.sh` - it serves the repo on port 8080
   and exposes it over HTTPS on the tailnet.
2. On the phone (same tailnet), open **https://macbook-pro.tail4be69a.ts.net**
   and install it the same way. It is a different origin, so it installs as a
   separate app and never touches the released install.
3. In this channel `sw.js` keeps the `__BUILD__` placeholder, which switches the
   worker to network-first - edits on the Mac show up on reload.
4. Stop with `./scripts/dev-tailscale.sh --stop`.

### Instalacja na Androidzie

Aplikacja jest PWA (Progressive Web App - strona instalowalna jak natywna
aplikacja), więc nie ma sklepu ani podpisywania. Dwa kanały:

**Kanał release (to, co wydane)**

1. Otwórz **https://wojtek9609.github.io/learn-ai/** w Chrome na telefonie.
2. Menu Chrome (trzy kropki) -> **Zainstaluj aplikację** / **Dodaj do ekranu
   głównego**.
3. Działa samodzielnie i offline (service worker cache'uje shell aplikacji i
   wszystkie moduły z treściami).
4. Auto-aktualizacja: każdy push na `main` wdraża nową wersję i stempluje
   `sw.js` skrótem commita, więc przy kolejnym otwarciu aplikacja pobiera
   nową wersję - sama albo przez mały toast **Nowa wersja - Odśwież**.

**Kanał dev (niewydane zmiany, przez Tailscale)**

1. Na Macu: `./scripts/dev-tailscale.sh` - serwuje repo na porcie 8080 i
   wystawia je po HTTPS w tailnecie.
2. Na telefonie (ten sam tailnet) otwórz **https://macbook-pro.tail4be69a.ts.net**
   i zainstaluj tak samo. To inny origin, więc instaluje się jako osobna
   aplikacja i nie rusza instalacji z kanału release.
3. W tym kanale `sw.js` zachowuje placeholder `__BUILD__`, co przełącza workera
   w tryb network-first - zmiany z Maca widać po odświeżeniu.
4. Zatrzymanie: `./scripts/dev-tailscale.sh --stop`.

### Structure

```
index.html   styles.css   app.js   SPEC.md
manifest.webmanifest   icon.svg   sw.js   scripts/dev-tailscale.sh
content/tracks.js + content/tracks/<track-id>/index.js (+ module-NN-*.js)
  tracks: ai-engineer (9 modules), react (6), vue (6), frontend-architecture (6)
content/interview.js + content/tracks/<track-id>/interview.js  (4 banks x 36 questions)
.github/workflows/deploy-pages.yml   (GitHub Pages deploy on push to main)
```

`SPEC.md` is the binding contract for the content schema and the app shell.

---

## Polski

Mobilna, dwujęzyczna (PL/EN) statyczna aplikacja do nauki zbudowana wokół
**kierunków**: "AI Engineer / Applied AI" plus trzy pełne kierunki frontendowe.
Bez frameworków, bez build stepu, bez zależności npm - czysty HTML, CSS i
moduły ES, routing po hashu i wyłącznie względne adresy, dzięki czemu działa
z podścieżki `/learn-ai/`.

Każda lekcja jest wytłumaczona na trzech poziomach (Jak dziecku / Licealista /
Pro), ma jeden diagram SVG z dwujęzycznym podpisem oraz quiz z 4 pytaniami.
Wybrane lekcje mają dodatkowo **interaktywny odtwarzacz krok po kroku** (3-8
klatek SVG, suwak, przyciski, strzałki i swipe) pod statycznym diagramem.
Wynik 75% lub wyższy automatycznie zalicza lekcję. Postęp, język i wybrany
poziom są zapisywane w `localStorage` pod kluczem `learnai:v1`.

Na lekcjach nadbudowana jest warstwa ćwiczeń: **powtórka**, symulowana
**rozmowa kwalifikacyjna** (4 banki po 36 pytań), dwujęzyczne **wyszukiwanie**,
kafel **kontynuuj** i dzienna **seria**, **eksport/import** postępu oraz
**tryb słuchania**, który czyta lekcję na głos. Szczegóły niżej, w sekcji
"Tryby ćwiczeń i narzędzia".

### Program - 4 kierunki, 27 modułów, 153 lekcje

Wszystkie cztery kierunki są **dostępne** (nie ma już żadnych "wkrótce").

| Kierunek | Moduły | Lekcje |
|----------|--------|--------|
| 🤖 AI Engineer | 9 | 55 |
| 🔵 React (dla znających Vue) | 6 | 33 |
| 🟢 Vue 3 w praktyce | 6 | 33 |
| 🏗️ Architektura Frontendu | 6 | 32 |
| **Razem** | **27** | **153** |

#### 🤖 AI Engineer - 9 modułów, 55 lekcji

| # | Moduł | Lekcje |
|---|-------|--------|
| 1 | Podstawy LLM | 6 - jak działa LLM, tokenizacja, okno kontekstu, embeddings, parametry samplowania, koszt/latencja/cache |
| 2 | Ustrukturyzowane wyjście i tool calling | 5 - po co JSON, JSON Schema, walidacja i retry, tool calling, MCP |
| 3 | RAG | 6 - czym jest RAG, chunking, bazy wektorowe, hybrid search i reranking, ewaluacja retrievalu, tryby awarii |
| 4 | Agenci | 6 - czym jest agent, projektowanie narzędzi, wzorce planowania, budżety kontekstu, niezawodność, guardrails i HITL |
| 5 | Ewaluacja i obserwowalność | 6 - po co evale, rodzaje evali, LLM jako sędzia, narzędzia, CI i regresje, ekonomia requestu (batch, cache, fallback) |
| 6 | Streaming i UX produktów AI | 6 - SSE vs WebSockets, częściowy JSON, generative UI, przepływy akceptacji, odczuwalna wydajność, błędy w UX |
| 7 | Bezpieczeństwo LLM | 5 - prompt injection, jailbreak vs injection, OWASP LLM Top 10, wyciek danych i PII, sandboxing |
| 8 | Python dla AI Engineera | 7 - czytanie Pythona, środowisko i narzędzia, async HTTP, typowanie i pydantic, skrypty i notebooki, endpointy FastAPI, pytest |
| 9 | Chmura i infrastruktura | 8 - czym jest chmura, maszyny wirtualne i skalowanie, kontenery i Docker, Kubernetes, serverless, mikroserwisy, kolejki i zdarzenia, CI/CD |

#### 🔵 React (dla znających Vue) - 6 modułów, 33 lekcje

Każda lekcja pokazuje pojęcie Reacta obok jego odpowiednika z Vue.

| # | Moduł | Lekcje |
|---|-------|--------|
| 1 | Model mentalny Reacta | 6 - myślenie w Reakcie, JSX vs template, komponenty i propsy, re-render vs reaktywność, rekoncyliacja i klucze, React 19 |
| 2 | Hooki kontra Composition API | 6 - useState vs ref, useEffect vs watch, useMemo vs computed, useCallback, custom hooki vs composable, useRef i DOM |
| 3 | Wzorce komponentów | 5 - children vs sloty, context vs provide/inject, controlled vs v-model, compound components i render props, error boundaries i Suspense |
| 4 | Stan i dane | 5 - kolokacja i lifting, Zustand vs Pinia, TanStack Query, React Hook Form vs VeeValidate, stan w URL |
| 5 | Frameworki i RSC | 5 - React Router vs Vue Router, Next.js vs Nuxt, server components, pobieranie danych w Next, SPA vs metaframework |
| 6 | Wydajność, testy i migracja | 6 - profilowanie re-renderów, memoizacja i kompilator, wirtualizacja list, code splitting, Testing Library vs Vue Test Utils, ściągawka migracji |

#### 🟢 Vue 3 w praktyce - 6 modułów, 33 lekcje

Dla kogoś, kto pisze w Vue na co dzień: internals, wzorce, przypadki brzegowe.

| # | Moduł | Lekcje |
|---|-------|--------|
| 1 | Fundamenty reaktywności | 6 - model proxy, ref vs reactive, computed dogłębnie, watch vs watchEffect, dyrektywy, script setup |
| 2 | Composition API w mistrzowskim wydaniu | 5 - z Options do Composition, wzorce composable, cykl życia, provide/inject, defineProps i defineModel |
| 3 | Komponenty dogłębnie | 6 - propsy/eventy/v-model, sloty scoped, komponenty dynamiczne i async, Teleport i Transition, generyki, renderless |
| 4 | Reaktywność od środka | 5 - track i trigger, efekty i scheduler, shallow API i markRaw, pułapki, funkcje renderujące i JSX |
| 5 | Stan, routing i Nuxt | 5 - Pinia podstawy, Pinia zaawansowana, Vue Router, guardy nawigacji, Nuxt 3 |
| 6 | Wydajność i testowanie | 6 - v-memo i renderowanie, bundle i lazy loading, Vue Test Utils, testy komponentów, Playwright, Vapor Mode |

#### 🏗️ Architektura Frontendu - 6 modułów, 32 lekcje

Poziom senior -> principal: design systemy w skali, monorepo, dostarczanie, przywództwo.

| # | Moduł | Lekcje |
|---|-------|--------|
| 1 | Myślenie architektoniczne | 5 - czym jest architektura frontendu, granice i sprzężenie, ADR i RFC, prawo Conwaya, build vs buy |
| 2 | Design systemy w skali | 6 - tokeny i motywy, projektowanie API komponentów, wersjonowanie i breaking changes, dokumentacja, testy wizualne, governance |
| 3 | Architektura stanu i danych | 5 - taksonomia stanu, warstwa pobierania danych, realtime i optimistic UI, offline-first PWA, kontrakty API i BFF |
| 4 | Skalowanie kodu | 5 - narzędzia monorepo, micro-frontendy, granice bibliotek, feature flagi, strategia aktualizacji zależności |
| 5 | Architektura wydajności | 5 - budżety Web Vitals, strategie renderowania, zasoby i fonty, wzorce runtime, monitoring RUM |
| 6 | Jakość, dostarczanie i przywództwo | 6 - strategia testów, CI/CD, obserwowalność błędów, bezpieczeństwo frontendu, kultura code review, studia przypadków |

### Tryby ćwiczeń i narzędzia

Poza czytaniem lekcji aplikacja ma warstwę ćwiczeniową zbudowaną na tym, co już
przerobiłeś. Wszystko dzieje się po stronie przeglądarki i siedzi w tym samym
kluczu `localStorage`.

**🔁 Powtórka (`#/review`)** - ćwiczenie pytań quizowych z lekcji, które masz
**zaliczone**. Wchodzisz z kafla na stronie głównej albo ze strony modułu
(przycisk "Powtórz ten moduł"), gdy jest w nim co najmniej jedna zaliczona
lekcja. Wybierasz zakres - wszystko albo jeden moduł - i dostajesz sesję 10
pytań z tej puli, przy czym pytania, w których ostatnio się myliłeś, mają
pierwszeństwo. Obsługa pytania jest taka sama jak w quizie w lekcji
(natychmiastowe kolorowanie i wyjaśnienie), a ekran końcowy pokazuje wynik i
podsumowanie pytanie po pytaniu. Błędne odpowiedzi wracają do puli powtórek,
poprawne z niej wypadają.

**🎤 Rozmowa kwalifikacyjna (`#/interview`)** - symulacja rozmowy technicznej,
celowo trudniejsza niż quizy w lekcjach: scenariusze produkcyjne, kompromisy,
"co się zepsuje, gdy...". Każdy kierunek ma własny bank 36 pytań (razem 144),
w okolicach 60% zamkniętych i 40% otwartych. Wybierasz jeden kierunek albo
wszystkie i odpowiadasz na 10. Pytania zamknięte są punktowane jak quiz. Przy
pytaniu otwartym najpierw myślisz, potem "Pokaż odpowiedź" odsłania wzorcową
odpowiedź i listę punktów, których słuchałby rekruter, i oceniasz się sam:
"Umiałem" / "Muszę powtórzyć". To, co oznaczysz jako do powtórki, dostaniesz
następnym razem w pierwszej kolejności.

**🔎 Szukaj (`#/search`)** - lupka w przyklejonym nagłówku. Indeks powstaje
leniwie przy pierwszym użyciu z tytułów lekcji i tekstu wszystkich trzech
poziomów bez tagów, **w obu językach naraz** - angielskie zapytanie znajdzie
więc polską lekcję i odwrotnie. Minimum 2 znaki, trafienia w tytuł są wyżej niż
w treści, wyniki pokazują ścieżkę kierunek/moduł oraz pasujący fragment,
maksymalnie 30 pozycji.

**Kontynuuj i seria** - strona główna pokazuje kafel "Kontynuuj", który wraca
do ostatnio otwartej lekcji (albo do następnej nieukończonej), oraz kafel
serii: liczba dni z rzędu z co najmniej jedną aktywnością i dzisiejszy licznik
względem stałego celu 2. Jako aktywność liczy się zaliczenie lekcji albo
ukończenie sesji powtórki lub rozmowy.

**Eksport / import** - mały blok ustawień na dole strony głównej. Eksport
pobiera `learnai-progress.json` i kopiuje do schowka zwięzły kod base64.
Import przyjmuje wklejony kod albo wskazany plik `.json`, pokazuje, co jest w
środku (liczba lekcji i data), i prosi o potwierdzenie, zanim nadpisze bieżący
postęp. Przydatne do przenoszenia postępu między przeglądarką a zainstalowaną
aplikacją na Androidzie - nie ma tu żadnego konta ani serwera.

**🎧 Tryb słuchania** - na każdej stronie lekcji, pasek pod zakładkami poziomu:
odtwarzanie/pauza, stop i tempo czytania (0.9x / 1x / 1.2x). Czyta tytuł lekcji
i **aktualnie wybrany poziom**, bez tagów, podzielony na kawałki wielkości
akapitu, żeby Chrome nie ucinał długich wypowiedzi. Głos idzie za językiem
interfejsu (pl-PL / en-US, w razie braku głos domyślny). Mowa zatrzymuje się
przy zmianie strony, poziomu i języka. Jeśli przeglądarka nie ma
`speechSynthesis`, pasek w ogóle się nie pojawia.

### Skuteczność nauki

Sześć funkcji zbudowanych wokół tego, jak naprawdę działa pamięć: przypominanie
sobie zamiast czytania, rozłożenie w czasie, tłumaczenie własnymi słowami i
uczciwa informacja o tym, co idzie najgorzej.

**🃏 Fiszki** - każda lekcja ma 3-5 kluczowych pojęć (`terms`), czyli to, co
powinieneś umieć zdefiniować z głowy. Gdy lekcja jest zaliczona, jej fiszki
wchodzą do tego samego harmonogramu powtórek co pytania quizowe, a sesje
przeplatają oba rodzaje kart. Fiszka działa jak w Anki: z przodu pojęcie,
"Pokaż odpowiedź" odsłania definicję, potem oceniasz się sam "Umiałem" /
"Nie umiałem". Nieudana karta wraca na koniec bieżącej rundy, tak samo jak
źle odpowiedziane pytanie.

**🤔 Zgadnij, zanim przeczytasz** - w lekcji, której jeszcze nie zaliczyłeś, nad
zakładkami poziomu pojawia się karta z jednym pytaniem quizowym z tej lekcji,
jeszcze przed czytaniem. Wybór pytania jest stały przez cały dzień. Odpowiedź
daje natychmiastową informację zwrotną i wyjaśnienie, ale nie rusza niczego:
ani wyniku, ani harmonogramu powtórek, ani aktywności. Nietrafiona próba
sprawia, że późniejsze czytanie zostaje w głowie dużo lepiej.

**📊 Słabe obszary i mapa aktywności (`#/stats`)** - wejście z linku
"Statystyki" na kaflu serii. Ekran ustawia w kolejności trzy najsłabsze moduły
na podstawie ich zaplanowanych kart (średnie pudełko ważone liczbą wpadek),
każdy z przyciskiem "Powtórz ten moduł", który otwiera sesję bez limitu w tym
zakresie. Niżej mapa aktywności z ostatnich 16 tygodni w stylu GitHuba. Gdy
jakiś moduł kwalifikuje się jako najsłabszy, na stronie głównej pojawia się
mały chip prowadzący prosto do jego powtórki.

**✍️ Feynman: wyjaśnij własnymi słowami** - między treścią lekcji a quizem pole
tekstowe, które zapisuje się samo w trakcie pisania (z opóźnieniem, limit 5000
znaków, jedna notatka na lekcję, wypełniona przy powrocie). "Porównaj z wersją
prostą" pokazuje obok tekst ELI5, żebyś zobaczył, czego zabrakło. Dyktowanie
głosem działa przez klawiaturę telefonu.

**⚡ Mam 5 minut (`#/quick`)** - przycisk na stronie głównej. Jeśli czeka co
najmniej trzy karty, uruchamia pięciokartową rundę powtórki liczoną do dnia;
jeśli nie, przenosi cię prosto do najkrótszej nieukończonej lekcji.

**💬 Zapytaj Claude** - pod quizem link, który otwiera claude.ai z gotowym
promptem o tej konkretnej lekcji: wyjaśnij inaczej, sprawdź moje zrozumienie
kilkoma pytaniami, podaj jeden praktyczny przykład z frontendu. Czysty link,
bez klucza API, żadne dane nie wychodzą z aplikacji.

### Uruchomienie lokalnie

```bash
python3 -m http.server 8000
# potem otwórz http://localhost:8000/
```

Otwarcie pliku przez file:// nie zadziała - moduły ES wymagają serwera HTTP.
