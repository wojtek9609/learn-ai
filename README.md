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

### Curriculum - 4 tracks, 26 modules, 142 lessons

All four tracks are **available** (no coming-soon placeholders left).

| Track | Modules | Lessons |
|-------|---------|---------|
| 🤖 AI Engineer | 8 | 44 |
| 🔵 React (for Vue devs) | 6 | 33 |
| 🟢 Vue 3 in practice | 6 | 33 |
| 🏗️ Frontend Architecture | 6 | 32 |
| **Total** | **26** | **142** |

#### 🤖 AI Engineer - 8 modules, 44 lessons

| # | Module | Lessons |
|---|--------|---------|
| 1 | LLM Fundamentals | 6 - how LLMs work, tokenization, context window, embeddings, sampling params, cost/latency/caching |
| 2 | Structured Output & Tool Calling | 5 - why structured output, JSON Schema, validation & retries, tool calling, MCP |
| 3 | RAG | 6 - what is RAG, chunking, vector databases, hybrid search & reranking, retrieval evaluation, failure modes |
| 4 | Agents | 6 - what is an agent, tool design, planning patterns, context budgets, reliability, guardrails & HITL |
| 5 | Evals & Observability | 5 - why evals, eval types, LLM-as-judge, tooling, CI & regression |
| 6 | Streaming & AI Product UX | 6 - SSE vs WebSockets, partial JSON, generative UI, approval flows, perceived performance, AI UX errors |
| 7 | LLM Security | 5 - prompt injection, jailbreaks vs injection, OWASP LLM Top 10, data leakage & PII, sandboxing |
| 8 | Python for AI Engineers | 5 - reading Python, env tooling, async HTTP, typing & pydantic, scripts & notebooks |

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
aplikacja), wiec nie ma sklepu ani podpisywania. Dwa kanaly:

**Kanal release (to, co wydane)**

1. Otworz **https://wojtek9609.github.io/learn-ai/** w Chrome na telefonie.
2. Menu Chrome (trzy kropki) -> **Zainstaluj aplikacje** / **Dodaj do ekranu
   glownego**.
3. Dziala samodzielnie i offline (service worker cache'uje shell aplikacji i
   wszystkie moduly z tresciami).
4. Auto-aktualizacja: kazdy push na `main` wdraza nowa wersje i stempluje
   `sw.js` skrotem commita, wiec przy kolejnym otwarciu aplikacja pobiera
   nowa wersje - sama albo przez maly toast **Nowa wersja - Odswiez**.

**Kanal dev (niewydane zmiany, przez Tailscale)**

1. Na Macu: `./scripts/dev-tailscale.sh` - serwuje repo na porcie 8080 i
   wystawia je po HTTPS w tailnecie.
2. Na telefonie (ten sam tailnet) otworz **https://macbook-pro.tail4be69a.ts.net**
   i zainstaluj tak samo. To inny origin, wiec instaluje sie jako osobna
   aplikacja i nie rusza instalacji z kanalu release.
3. W tym kanale `sw.js` zachowuje placeholder `__BUILD__`, co przelacza workera
   w tryb network-first - zmiany z Maca widac po odswiezeniu.
4. Zatrzymanie: `./scripts/dev-tailscale.sh --stop`.

### Structure

```
index.html   styles.css   app.js   SPEC.md
manifest.webmanifest   icon.svg   sw.js   scripts/dev-tailscale.sh
content/tracks.js + content/tracks/<track-id>/index.js (+ module-NN-*.js)
  tracks: ai-engineer (8 modules), react (6), vue (6), frontend-architecture (6)
.github/workflows/deploy-pages.yml   (GitHub Pages deploy on push to main)
```

`SPEC.md` is the binding contract for the content schema and the app shell.

---

## Polski

Mobilna, dwujezyczna (PL/EN) statyczna aplikacja do nauki zbudowana wokol
**kierunkow**: "AI Engineer / Applied AI" plus trzy pelne kierunki frontendowe.
Bez frameworkow, bez build stepu, bez zaleznosci npm - czysty HTML, CSS i
moduly ES, routing po hashu i wylacznie wzgledne adresy, dzieki czemu dziala
z podsciezki `/learn-ai/`.

Kazda lekcja jest wytlumaczona na trzech poziomach (Jak dziecku / Licealista /
Pro), ma jeden diagram SVG z dwujezycznym podpisem oraz quiz z 4 pytaniami.
Wybrane lekcje maja dodatkowo **interaktywny odtwarzacz krok po kroku** (3-8
klatek SVG, suwak, przyciski, strzalki i swipe) pod statycznym diagramem.
Wynik 75% lub wyzszy automatycznie zalicza lekcje. Postep, jezyk i wybrany
poziom sa zapisywane w `localStorage` pod kluczem `learnai:v1`.

### Program - 4 kierunki, 26 modulow, 142 lekcje

Wszystkie cztery kierunki sa **dostepne** (nie ma juz zadnych "wkrotce").

| Kierunek | Moduly | Lekcje |
|----------|--------|--------|
| 🤖 AI Engineer | 8 | 44 |
| 🔵 React (dla znajacych Vue) | 6 | 33 |
| 🟢 Vue 3 w praktyce | 6 | 33 |
| 🏗️ Architektura Frontendu | 6 | 32 |
| **Razem** | **26** | **142** |

#### 🤖 AI Engineer - 8 modulow, 44 lekcje

| # | Modul | Lekcje |
|---|-------|--------|
| 1 | Podstawy LLM | 6 - jak dziala LLM, tokenizacja, okno kontekstu, embeddings, parametry samplowania, koszt/latencja/cache |
| 2 | Ustrukturyzowane wyjscie i tool calling | 5 - po co JSON, JSON Schema, walidacja i retry, tool calling, MCP |
| 3 | RAG | 6 - czym jest RAG, chunking, bazy wektorowe, hybrid search i reranking, ewaluacja retrievalu, tryby awarii |
| 4 | Agenci | 6 - czym jest agent, projektowanie narzedzi, wzorce planowania, budzety kontekstu, niezawodnosc, guardrails i HITL |
| 5 | Ewaluacja i obserwowalnosc | 5 - po co evale, rodzaje evali, LLM jako sedzia, narzedzia, CI i regresje |
| 6 | Streaming i UX produktow AI | 6 - SSE vs WebSockets, czesciowy JSON, generative UI, przeplywy akceptacji, odczuwalna wydajnosc, bledy w UX |
| 7 | Bezpieczenstwo LLM | 5 - prompt injection, jailbreak vs injection, OWASP LLM Top 10, wyciek danych i PII, sandboxing |
| 8 | Python dla AI Engineera | 5 - czytanie Pythona, srodowisko i narzedzia, async HTTP, typowanie i pydantic, skrypty i notebooki |

#### 🔵 React (dla znajacych Vue) - 6 modulow, 33 lekcje

Kazda lekcja pokazuje pojecie Reacta obok jego odpowiednika z Vue.

| # | Modul | Lekcje |
|---|-------|--------|
| 1 | Model mentalny Reacta | 6 - myslenie w Reakcie, JSX vs template, komponenty i propsy, re-render vs reaktywnosc, rekoncyliacja i klucze, React 19 |
| 2 | Hooki kontra Composition API | 6 - useState vs ref, useEffect vs watch, useMemo vs computed, useCallback, custom hooki vs composable, useRef i DOM |
| 3 | Wzorce komponentow | 5 - children vs sloty, context vs provide/inject, controlled vs v-model, compound components i render props, error boundaries i Suspense |
| 4 | Stan i dane | 5 - kolokacja i lifting, Zustand vs Pinia, TanStack Query, React Hook Form vs VeeValidate, stan w URL |
| 5 | Frameworki i RSC | 5 - React Router vs Vue Router, Next.js vs Nuxt, server components, pobieranie danych w Next, SPA vs metaframework |
| 6 | Wydajnosc, testy i migracja | 6 - profilowanie re-renderow, memoizacja i kompilator, wirtualizacja list, code splitting, Testing Library vs Vue Test Utils, sciagawka migracji |

#### 🟢 Vue 3 w praktyce - 6 modulow, 33 lekcje

Dla kogos, kto pisze w Vue na co dzien: internals, wzorce, przypadki brzegowe.

| # | Modul | Lekcje |
|---|-------|--------|
| 1 | Fundamenty reaktywnosci | 6 - model proxy, ref vs reactive, computed doglebnie, watch vs watchEffect, dyrektywy, script setup |
| 2 | Composition API w mistrzowskim wydaniu | 5 - z Options do Composition, wzorce composable, cykl zycia, provide/inject, defineProps i defineModel |
| 3 | Komponenty doglebnie | 6 - propsy/eventy/v-model, sloty scoped, komponenty dynamiczne i async, Teleport i Transition, generyki, renderless |
| 4 | Reaktywnosc od srodka | 5 - track i trigger, efekty i scheduler, shallow API i markRaw, pulapki, funkcje renderujace i JSX |
| 5 | Stan, routing i Nuxt | 5 - Pinia podstawy, Pinia zaawansowana, Vue Router, guardy nawigacji, Nuxt 3 |
| 6 | Wydajnosc i testowanie | 6 - v-memo i renderowanie, bundle i lazy loading, Vue Test Utils, testy komponentow, Playwright, Vapor Mode |

#### 🏗️ Architektura Frontendu - 6 modulow, 32 lekcje

Poziom senior -> principal: design systemy w skali, monorepo, dostarczanie, przywodztwo.

| # | Modul | Lekcje |
|---|-------|--------|
| 1 | Myslenie architektoniczne | 5 - czym jest architektura frontendu, granice i sprzezenie, ADR i RFC, prawo Conwaya, build vs buy |
| 2 | Design systemy w skali | 6 - tokeny i motywy, projektowanie API komponentow, wersjonowanie i breaking changes, dokumentacja, testy wizualne, governance |
| 3 | Architektura stanu i danych | 5 - taksonomia stanu, warstwa pobierania danych, realtime i optimistic UI, offline-first PWA, kontrakty API i BFF |
| 4 | Skalowanie kodu | 5 - narzedzia monorepo, micro-frontendy, granice bibliotek, feature flagi, strategia aktualizacji zaleznosci |
| 5 | Architektura wydajnosci | 5 - budzety Web Vitals, strategie renderowania, zasoby i fonty, wzorce runtime, monitoring RUM |
| 6 | Jakosc, dostarczanie i przywodztwo | 6 - strategia testow, CI/CD, obserwowalnosc bledow, bezpieczenstwo frontendu, kultura code review, studia przypadkow |

### Uruchomienie lokalnie

```bash
python3 -m http.server 8000
# potem otworz http://localhost:8000/
```

Otwarcie pliku przez file:// nie zadziala - moduly ES wymagaja serwera HTTP.
