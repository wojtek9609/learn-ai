# Learn AI

Live: **https://wojtek9609.github.io/learn-ai/**

## English

A mobile-first, bilingual (PL/EN) static learning app that takes a senior frontend
developer to "AI Engineer / Applied AI". No frameworks, no build step, no npm
dependencies - plain HTML, CSS and ES modules, hash routing, relative URLs only,
so it works served from the `/learn-ai/` subpath.

Every lesson is explained at three levels (Like I'm five / High schooler / Pro),
has one inline SVG diagram with a bilingual caption, and a 4-question quiz.
Scoring 75% or more marks the lesson complete. Progress, language and the chosen
level are stored in `localStorage` under the key `learnai:v1`.

### Curriculum - 8 modules, 44 lessons

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
content/tracks.js + content/tracks/<track-id>/index.js (+ module-01..08-*.js)
.github/workflows/deploy-pages.yml   (GitHub Pages deploy on push to main)
```

`SPEC.md` is the binding contract for the content schema and the app shell.

---

## Polski

Mobilna, dwujezyczna (PL/EN) statyczna aplikacja do nauki, ktora prowadzi
senior frontend developera do roli "AI Engineer / Applied AI". Bez frameworkow,
bez build stepu, bez zaleznosci npm - czysty HTML, CSS i moduly ES, routing po
hashu i wylacznie wzgledne adresy, dzieki czemu dziala z podsciezki `/learn-ai/`.

Kazda lekcja jest wytlumaczona na trzech poziomach (Jak dziecku / Licealista /
Pro), ma jeden diagram SVG z dwujezycznym podpisem oraz quiz z 4 pytaniami.
Wynik 75% lub wyzszy automatycznie zalicza lekcje. Postep, jezyk i wybrany
poziom sa zapisywane w `localStorage` pod kluczem `learnai:v1`.

### Program - 8 modulow, 44 lekcje

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

### Uruchomienie lokalnie

```bash
python3 -m http.server 8000
# potem otworz http://localhost:8000/
```

Otwarcie pliku przez file:// nie zadziala - moduly ES wymagaja serwera HTTP.
