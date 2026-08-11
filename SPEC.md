# Learn AI - Full Specification

Mobile-first, bilingual (Polish + English) static learning app that teaches the
complete "AI Engineer / Applied AI" + "AI Product / Agent UX Engineer" curriculum.
Deployed on GitHub Pages: https://wojtek9609.github.io/learn-ai/

## Goals

- Cover everything needed to move from senior frontend to AI Engineer (career paths
  1 and 2): LLM fundamentals, structured output + tool calling, RAG, agents,
  evals/observability, streaming + AI UX, security, and enough Python.
- Every lesson explained at THREE levels: ELI5 (like I'm five), high schooler,
  professional. The learner picks the level with tabs.
- One inline SVG diagram per lesson that genuinely helps understanding.
- A quiz per lesson with instant feedback. Progress tracked in localStorage.
- Fully bilingual: every piece of content and UI text exists in Polish and English,
  toggle in the header, persisted.
- No build step, no frameworks, no dependencies: plain HTML + CSS + ES modules.
  Must work served from a subpath (/learn-ai/) - hash routing, relative URLs only.

## Target learner

Senior frontend developer (TypeScript, React, design systems, 9+ years).
Use web-dev analogies aggressively: HTTP, caching, CDN, TypeScript types, zod,
React state, REST APIs, npm. Assume zero ML background and no Python fluency.

## File layout

```
learn-ai/
  index.html
  styles.css
  app.js
  .nojekyll
  README.md
  SPEC.md                (this file)
  .github/workflows/deploy-pages.yml
  content/
    registry.js          (imports all 8 module files, exports MODULES sorted by order)
    module-01-llm-fundamentals.js
    module-02-structured-tools.js
    module-03-rag.js
    module-04-agents.js
    module-05-evals.js
    module-06-streaming-ux.js
    module-07-security.js
    module-08-python.js
```

## Content schema (EXACT contract - every module file must follow it)

Each `content/module-XX-<name>.js` is a plain ES module with NO imports:

```js
export default {
  id: 'llm-fundamentals',          // kebab-case, stable, see module list below
  order: 1,
  icon: '🧠',                      // one emoji
  title: { pl: '...', en: '...' },
  description: { pl: '...', en: '...' },   // 1-2 sentences
  lessons: [
    {
      id: 'tokenization',          // kebab-case, unique within module
      title: { pl: '...', en: '...' },
      minutes: 8,                  // realistic reading time for the "school" level
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">...</svg>',
        caption: { pl: '...', en: '...' }
      },
      levels: {
        eli5:   { pl: '<p>...</p>', en: '<p>...</p>' },
        school: { pl: '...', en: '...' },
        pro:    { pl: '...', en: '...' }
      },
      quiz: [
        {
          q: { pl: '...', en: '...' },
          options: [
            { pl: '...', en: '...' },   // exactly 4 options
            { pl: '...', en: '...' },
            { pl: '...', en: '...' },
            { pl: '...', en: '...' }
          ],
          correct: 2,              // index 0-3 of the correct option
          explain: { pl: '...', en: '...' }   // 1-2 sentences shown after answering
        }
        // exactly 4 questions per lesson
      ]
    }
  ]
}
```

### Content rules

- `levels.*` values are HTML strings. Allowed tags: `<p>`, `<ul>`, `<ol>`, `<li>`,
  `<strong>`, `<em>`, `<code>`, `<pre><code>`, `<h4>`, `<table>`, `<tr>`, `<th>`, `<td>`,
  `<blockquote>`. No `<script>`, no `<img>`, no external resources.
- **eli5**: 100-200 words. One everyday analogy carried through. Zero jargon.
  Friendly, even funny. If a technical word is unavoidable, explain it in brackets.
- **school**: 200-350 words. Introduce correct terminology gently, one concrete
  example, may include a tiny code or pseudo-code snippet.
- **pro**: 300-500 words. Precise, production-oriented. Include a short code sample
  in `<pre><code>` when it helps. Mention real numbers (costs, latencies, sizes),
  pitfalls, and what matters in interviews and production. Reference real tools by
  name (Claude API, OpenAI API, pgvector, Qdrant, Langfuse, Braintrust, zod, MCP...).
- Polish is a NATURAL Polish version, not a literal translation. Keep established
  English terms (embeddings, context window, tool calling) with a short Polish gloss
  in parentheses on first use within a lesson.
- Web-dev analogies wherever possible (learner is a senior TS/React dev).
- **quiz**: exactly 4 questions, 4 options each, exactly one correct. Mix difficulty:
  q1 easy, q2-3 medium, q4 tricky/production-flavored. Explanations teach, not just
  confirm. Shuffle which index is correct across questions.
- **diagram SVG**: self-contained inline SVG, `viewBox="0 0 640 400"` (taller allowed
  up to 640x520 if needed), no fixed width/height attributes. Must use ONLY these CSS
  variables for every color: `var(--text)`, `var(--muted)`, `var(--accent)`,
  `var(--accent2)`, `var(--ok)`, `var(--warn)`, `var(--err)`, `var(--surface)`,
  `var(--border)`. `font-family="inherit"`, font-size 13-18px. Labels in English.
  Simple and legible on a 360px-wide phone: max ~6 boxes, thick lines (stroke-width
  2), generous spacing. Arrows via marker or simple polygons.
- **JS string safety**: module files use template literals (backticks) for HTML
  strings. Inside them escape every backtick as \` and every `${` as `\${`.
  Prefer avoiding backticks in content entirely (code samples live in
  `<pre><code>`, which needs no backticks). ASCII quotes in code samples.

## App shell

- **index.html**: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
  theme-color meta, `<script type="module" src="./app.js">`. Title "Learn AI".
  Also `.nojekyll` file at repo root (empty).
- **styles.css**: mobile-first. CSS variables in `:root` (light) and dark values under
  `@media (prefers-color-scheme: dark)`:
  `--bg`, `--surface`, `--text`, `--muted`, `--accent` (indigo/violet family),
  `--accent2` (teal/cyan family), `--ok` (green), `--warn` (amber), `--err` (red),
  `--border`. System font stack. Tap targets >= 44px. Content max-width 720px,
  centered on desktop. `env(safe-area-inset-bottom)` padding. Polished, modern,
  portfolio-quality: cards with soft shadows, rounded corners (12-16px), smooth
  transitions, progress bars with animation.
- **app.js**: vanilla JS, ES module. Hash router:
  - `#/` home: app title, overall progress (completed/total lessons + animated ring
    or bar), module cards (icon, title, description, per-module progress bar,
    lesson count).
  - `#/m/<moduleId>` module page: lesson list with checkmarks for completed,
    minutes, quiz best score if taken.
  - `#/l/<moduleId>/<lessonId>` lesson page: title, minutes, level tabs, diagram
    (with caption) above content, content, quiz at the bottom, prev/next lesson
    links, back link.
- **Level tabs**: order eli5 → school → pro. Labels:
  pl: "Jak dziecku" / "Licealista" / "Pro"; en: "Like I'm five" / "High schooler" / "Pro".
  Remember last chosen level globally (localStorage).
- **Quiz UX**: tap an option → immediately colored correct (green) / wrong (red,
  correct one revealed green) + explanation appears. After all 4 answered, show
  score. Score >= 75% marks the lesson complete automatically (store best score).
  "Try again" button resets the quiz. Also a manual "Mark as done" button.
- **Progress**: localStorage key `learnai:v1`:
  `{ lang: 'pl'|'en', level: 'eli5'|'school'|'pro', done: { '<moduleId>/<lessonId>': { score: 0-100, at: '<ISO date>' } } }`.
  Language default: 'pl'. Migration-safe reads (try/catch, fallback to defaults).
- **Language toggle**: "PL / EN" buttons in the sticky header, persisted, re-renders
  current view. ALL UI strings from an i18n dict in app.js (both languages).
- Rendering via template strings + `innerHTML` is fine (content is our own).
  No XSS concerns beyond not breaking HTML.

## Modules and lessons (8 modules, 44 lessons)

1. **module-01-llm-fundamentals.js** - id `llm-fundamentals`, order 1, icon 🧠,
   title en "LLM Fundamentals". 6 lessons:
   - `how-llms-work`: next-token prediction, training vs inference, why it "knows" things, hallucinations as a feature of sampling.
   - `tokenization`: BPE basics, tokens != words, why counting letters in "strawberry" fails, token costs, tokenizer differences.
   - `context-window`: what fits, truncation, lost-in-the-middle, needle-in-a-haystack, context vs RAG vs fine-tuning.
   - `embeddings`: text → vector, cosine similarity, semantic search, use cases (search, dedup, clustering, RAG).
   - `sampling-params`: temperature, top_p, why temperature 0 is still not fully deterministic, when to use what.
   - `cost-latency-caching`: per-token pricing (input vs output), latency drivers (TTFT vs tokens/s), prompt caching mechanics and cache-friendly prompt design.
2. **module-02-structured-tools.js** - id `structured-output-tools`, order 2, icon 🛠️,
   title en "Structured Output & Tool Calling". 5 lessons:
   - `why-structured-output`: free text vs JSON contracts, the parallel to typed APIs vs stringly-typed.
   - `json-schema`: JSON Schema essentials, zod as the TS-native way, schema = prompt.
   - `validation-retries`: parse → validate → repair → retry loops, partial credit, logging failures.
   - `tool-calling`: the loop (model requests tool → you execute → return result → model continues), tool schemas, errors as data.
   - `mcp`: Model Context Protocol - servers, tools, resources, why a standard matters, relation to tool calling.
3. **module-03-rag.js** - id `rag`, order 3, icon 📚, title en "RAG". 6 lessons:
   - `what-is-rag`: retrieval + generation, why not fine-tuning, when RAG is the wrong tool.
   - `chunking`: strategies (fixed, semantic, structural), sizes, overlap, metadata.
   - `vector-databases`: pgvector, Qdrant, what an index does (HNSW intuition), filtering.
   - `hybrid-search-reranking`: BM25 + vectors, why hybrid wins, rerankers as a second pass.
   - `retrieval-evaluation`: golden sets, precision/recall@k, MRR, evaluating retrieval SEPARATELY from generation.
   - `rag-failure-modes`: bad chunks, stale data, lost-in-the-middle, missing citations, silent retrieval misses.
4. **module-04-agents.js** - id `agents`, order 4, icon 🤖, title en "Agents". 6 lessons:
   - `what-is-an-agent`: tool loop with autonomy vs fixed workflow, when agents are overkill.
   - `tool-design`: naming, descriptions, schemas, granularity, errors as data the model can act on.
   - `planning-patterns`: ReAct, plan-then-execute, reflection, orchestrator + subagents.
   - `context-token-budgets`: context management, compaction/summarization, memory files, budgets.
   - `reliability`: idempotency, retries, checkpoints, resumability, timeouts.
   - `guardrails-hitl`: permissions, approval flows (human-in-the-loop), sandboxing, blast radius.
5. **module-05-evals.js** - id `evals-observability`, order 5, icon 📊,
   title en "Evals & Observability". 5 lessons:
   - `why-evals`: vibes don't scale, evals as unit tests for prompts, the differentiator on the job market.
   - `eval-types`: golden sets, assertions/code checks, pairwise comparison, human review, A/B.
   - `llm-as-judge`: rubrics, judge biases (position, length, self-preference), calibrating against humans.
   - `tooling`: Langfuse, Braintrust, tracing (spans for LLM calls, tools, retrieval), OpenTelemetry.
   - `ci-regression`: eval suites in CI, gating deploys, drift monitoring in prod, cost tracking.
6. **module-06-streaming-ux.js** - id `streaming-ai-ux`, order 6, icon ⚡,
   title en "Streaming & AI Product UX". 6 lessons:
   - `sse-vs-websockets`: SSE mechanics, fetch streams, when WebSockets, reconnects.
   - `streaming-partial-json`: parsing incomplete JSON, incremental rendering of structured output.
   - `generative-ui`: streaming components, tool-driven UI, mapping model output to UI safely.
   - `hitl-approval-flows`: previews, diffs, confirm/undo, progressive autonomy.
   - `perceived-performance`: TTFT as the UX metric, optimistic UI, skeletons, streaming vs spinner psychology.
   - `ai-ux-errors`: refusals, fallbacks, empty states, uncertainty display, building trust.
7. **module-07-security.js** - id `security`, order 7, icon 🔒,
   title en "LLM Security". 5 lessons:
   - `prompt-injection`: direct vs indirect, why it is NOT solved, untrusted content in context.
   - `jailbreaks-vs-injection`: the difference, why it matters for product design.
   - `owasp-llm-top10`: a guided tour of the OWASP Top 10 for LLM applications.
   - `data-leakage-pii`: system prompt leaks, PII in logs/traces, retention, redaction.
   - `sandboxing-least-privilege`: tool permissions, egress control, human gates for irreversible actions.
8. **module-08-python.js** - id `python-for-ai`, order 8, icon 🐍,
   title en "Python for AI Engineers". 5 lessons:
   - `reading-python`: syntax mapped 1:1 to TypeScript (dicts, list comprehensions, decorators, dunder).
   - `env-tooling`: uv, venv, pip, pyproject.toml - mapped to npm/package.json mental model.
   - `async-http`: requests vs httpx, asyncio vs the JS event loop, common gotchas.
   - `typing-pydantic`: type hints, pydantic ≈ zod, dataclasses, mypy in passing mode.
   - `scripts-notebooks`: Jupyter, quick scripts, uv run, when notebooks beat scripts.

## Deployment

- GitHub Pages via Actions: `.github/workflows/deploy-pages.yml` using
  `actions/configure-pages@v5` with `enablement: true`, `actions/upload-pages-artifact@v3`
  (path: `.`), `actions/deploy-pages@v4`. Trigger: push to main. Permissions:
  `pages: write`, `id-token: write`, `contents: read`.

## Tracks architecture (v2 - applied by a refactor step after the initial build)

The app is a multi-track learning platform, not a single course. A **track**
(kierunek) is a full course; modules belong to tracks. The module/lesson schema
above stays EXACTLY the same.

### File layout v2

```
content/
  tracks.js                        (track registry: imports every track index, exports TRACKS sorted by order)
  tracks/
    ai-engineer/
      index.js                     (track meta + imports its 8 modules, exports the track object)
      module-01-llm-fundamentals.js  ... module-08-python.js   (moved here, unchanged)
    react/index.js                 (mock, coming-soon)
    vue/index.js                   (mock, coming-soon)
    react-vs-vue/index.js          (mock, coming-soon)
    frontend-architecture/index.js (mock, coming-soon)
```

`content/registry.js` is removed (replaced by tracks.js + per-track index.js).

### Track schema

```js
export default {
  id: 'ai-engineer',               // kebab-case, stable
  order: 1,
  icon: '🤖',
  status: 'available',             // 'available' | 'coming-soon'
  title: { pl: '...', en: '...' },
  description: { pl: '...', en: '...' },   // 1-2 sentences
  modules: [ /* module objects, existing schema; [] for coming-soon */ ],
  planned: [ /* for coming-soon: outline of planned modules */
    { title: { pl: '...', en: '...' }, description: { pl: '...', en: '...' } }
  ]
}
```

### Routing v2

- `#/` home: hero + track cards. Available tracks: icon, title, description,
  overall track progress bar, lesson count. Coming-soon tracks: greyed card with
  a "Wkrótce" / "Coming soon" badge, tappable to a page listing planned modules.
- `#/t/<trackId>` track page: what the old home was (module cards + track progress).
- `#/t/<trackId>/m/<moduleId>` module page, `#/t/<trackId>/l/<moduleId>/<lessonId>`
  lesson page - same as v1 but track-scoped.
- Old v1 routes (`#/m/...`, `#/l/...`) redirect into the `ai-engineer` track.

### Progress v2

`done` keys become `'<trackId>/<moduleId>/<lessonId>'` (same value shape).
No user data exists before v2 ships, so no migration logic needed.

### Mock tracks (status coming-soon, both languages, 4-6 planned entries each)

1. `react` 🔵 order 2 - pl "React (dla znających Vue)" / en "React (for Vue devs)".
   Every concept taught side-by-side with its Vue equivalent (ref vs useState,
   computed vs useMemo, watch vs useEffect, slots vs children, Pinia vs Zustand...).
2. `vue` 🟢 order 3 - pl "Vue 3 w praktyce" / en "Vue 3 in practice".
   Composition API, reactivity internals, component patterns, Pinia, testing.
3. `react-vs-vue` ⚖️ order 4 - pl "React vs Vue" / en "React vs Vue".
   Paradigm comparison, when to pick which, migration strategies, hiring market.
4. `frontend-architecture` 🏗️ order 5 - pl "Architektura Frontendu" /
   en "Frontend Architecture". Design systems at scale, monorepos, micro-frontends,
   state management architecture, performance budgets, ADRs.

### Extensibility contract

Adding a new track = create `content/tracks/<id>/index.js` (+ module files) and
add ONE import line in `content/tracks.js`. Adding a module to a track = add the
module file and import it in that track's `index.js`. Zero changes in app.js.
Flipping a mock track live = fill `modules`, change `status` to 'available'.

## v3 - Android app (PWA) + release channels

Goal: installable Android app with offline support, auto-updating on every
release (= push to main), plus a Tailscale dev channel to preview unreleased
versions on the phone before releasing.

### PWA layer

- `manifest.webmanifest`: name "Learn AI", short_name "Learn AI",
  `start_url: "./"`, `scope: "./"`, `display: "standalone"`, theme_color and
  background_color matching the CSS variables (both provided), `icons`: SVG icon
  with `sizes: "any"` and purposes `any` and `maskable` (Chrome on Android accepts
  SVG manifest icons). If a PNG can be generated locally without new dependencies
  (e.g. `qlmanage -t -s 512` + `sips`), add 192px and 512px PNGs too - but do not
  add npm/build dependencies for this.
- `icon.svg`: bold, simple mark (e.g. rounded square, accent gradient background,
  a brain/spark glyph) - legible at 48px, safe zone for maskable (80% inner circle).
- `sw.js` (service worker, at repo root, registered with relative path and scope
  `./` because the app lives under /learn-ai/):
  - `const VERSION = '__BUILD__'` - placeholder replaced with the short commit SHA
    at deploy time. Cache name includes VERSION.
  - Install: precache app shell (`./`, `index.html`, `styles.css`, `app.js`,
    `manifest.webmanifest`, `icon.svg`) plus ALL `content/**/*.js` files
    (the list is small and static - enumerate it explicitly in sw.js).
  - Fetch: stale-while-revalidate for same-origin GETs, navigation fallback to
    `./index.html`.
  - Activate: delete old caches; `clients.claim()`.
  - Listen for `{type:'SKIP_WAITING'}` message -> `self.skipWaiting()`.
- `app.js`: register `./sw.js`; when an update is waiting, show a small toast
  "Nowa wersja - Odśwież" / "New version - Refresh" which posts SKIP_WAITING and
  reloads on `controllerchange`. Trigger `registration.update()` on
  `visibilitychange` (app resume) so updates land without reinstalls.
  Show the running VERSION discreetly in the home footer.
- `index.html`: link the manifest, `theme-color` metas (light and dark),
  `apple-touch-icon` for completeness.

### Release channel (auto-update "jak wydajemy")

- Push to main -> Pages workflow replaces `__BUILD__` in sw.js with the commit
  SHA (`sed` step before upload) -> deployed sw.js differs by bytes -> Chrome on
  Android installs the new version on next app open (or via the refresh toast).
- No store, no signing, no manual steps: release = git push.

### Dev channel (updates "przez Tailscale jak sa")

- `scripts/dev-tailscale.sh`: serves the repo directory over HTTPS on the tailnet
  (HTTPS is required for service workers / PWA install):
  1. `python3 -m http.server 8080 --directory <repo>` in the background
  2. `tailscale serve --bg --https=443 http://localhost:8080`
  3. prints the URL to open on the phone: `https://macbook-pro.tail4be69a.ts.net`
  Plus a `--stop` flag that kills the server and runs `tailscale serve reset`.
- The dev origin is different from the release origin, so on the phone it
  installs/caches as a SEPARATE app instance ("Learn AI dev") - the release
  install is untouched. Dev sw.js keeps `__BUILD__` unreplaced; treat it as
  cache-bust-on-every-load (VERSION === '__BUILD__' -> network-first fetch
  strategy so edits on the Mac show up on reload without cache fights).
- README gets an "Install on Android" section covering both channels
  (Chrome menu -> "Add to Home screen" / "Install app").

## Definition of done

- Every JS file passes `node --check`.
- `content/registry.js` imports all 8 modules; a validation script confirms every
  lesson has 3 levels x 2 languages, a diagram whose svg starts with `<svg`, and
  4 quiz questions with 4 options and a valid `correct` index.
- App renders at 360px width, light and dark mode, no console errors.
- Site live at https://wojtek9609.github.io/learn-ai/.
