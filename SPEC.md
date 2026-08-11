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

## v4 - Three full frontend tracks + interactive diagrams

The react-vs-vue track was removed (merged conceptually into the react track).
The remaining three mock tracks become FULL courses with the same lesson schema
as ai-engineer. Orders: react 2, vue 3, frontend-architecture 4; all flip to
`status: 'available'`, `planned: []`.

### Interactive diagram widget (new, optional per lesson)

Some concepts are better shown in motion. A lesson MAY have, in addition to the
required static `diagram`, an `interactive` field:

```js
interactive: {
  kind: 'frames',                    // the only supported kind
  caption: { pl: '...', en: '...' }, // what the player shows
  frames: [                          // 3-8 frames, a step-through animation
    {
      svg: '<svg viewBox="0 0 640 400">...</svg>',  // SAME viewBox across all frames
      label: { pl: '...', en: '...' },              // short frame title
      note:  { pl: '...', en: '...' }               // 1-2 sentence explanation
    }
  ]
}
```

- Frames follow the exact same SVG rules as `diagram` (CSS variables only,
  640-wide viewBox, legible on a phone). Consecutive frames should look like
  steps of one animation: same layout, elements move/appear/highlight.
- app.js renders a player: the current frame, a range slider (one tick per
  frame), prev/next buttons (44px), the frame label + note below, all bilingual.
  Swiping between frames is a bonus, arrow keys work on desktop. The player sits
  directly under the static diagram.
- Use it where motion genuinely helps (data flowing through a system, steps of
  an algorithm, before/after states) - target 1-2 interactive lessons per
  module, not every lesson.

### Track react - "React (dla znajacych Vue)" (6 modules, 33 lessons)

Files: `content/tracks/react/module-01-mental-model.js` ... `module-06-perf-testing-migration.js`.
EVERY lesson teaches the React concept side-by-side with its Vue equivalent
(short Vue snippet vs React snippet in school/pro levels; the learner is a
senior Vue dev).

1. `mental-model` (6): thinking-in-react, jsx-vs-templates, components-and-props,
   rendering-and-rerenders (re-render model vs fine-grained reactivity),
   reconciliation-keys, react19-landscape (compiler, what changed).
2. `hooks-vs-composition` (6): usestate-vs-ref, useeffect-vs-watchers,
   derived-state-usememo-vs-computed, usecallback-stable-references,
   custom-hooks-vs-composables, useref-and-dom.
3. `component-patterns` (5): children-vs-slots, context-vs-provide-inject,
   controlled-vs-vmodel, compound-components-render-props,
   error-boundaries-suspense.
4. `state-and-data` (5): state-colocation-lifting, zustand-vs-pinia,
   tanstack-query-server-state, forms-react-hook-form (vs vee-validate),
   url-state-routing-state.
5. `frameworks-rsc` (5): react-router-vs-vue-router, nextjs-vs-nuxt,
   server-components-rsc, data-fetching-patterns-next, choosing-spa-vs-meta.
6. `perf-testing-migration` (6): rerender-profiling, memoization-and-compiler,
   lists-virtualization, code-splitting, testing-library-vs-vue-test-utils,
   vue-to-react-cheatsheet (the migration playbook).

### Track vue - "Vue 3 w praktyce" (6 modules, 33 lessons)

Files: `content/tracks/vue/module-01-reactivity-fundamentals.js` ...
`module-06-performance-testing.js`. The learner already works in Vue daily -
aim DEEP (internals, patterns, edge cases), not introductory.

1. `reactivity-fundamentals` (6): reactivity-mental-model (proxies),
   ref-vs-reactive, computed-in-depth, watch-vs-watcheffect,
   template-directives-essentials, sfc-script-setup.
2. `composition-api-mastery` (5): options-to-composition, composables-design-patterns,
   lifecycle-in-composition, provide-inject-patterns, macros-defineprops-definemodel.
3. `components-in-depth` (6): props-events-vmodel-advanced, slots-scoped-slots,
   dynamic-async-components, teleport-transitions, typed-generic-components,
   renderless-headless.
4. `reactivity-internals` (5): proxies-track-trigger, effects-and-scheduler,
   shallow-apis-markraw, reactivity-pitfalls, render-functions-and-jsx.
5. `state-routing-nuxt` (5): pinia-fundamentals, pinia-advanced-plugins,
   vue-router-essentials, navigation-guards-data, nuxt3-overview.
6. `performance-testing` (6): rendering-optimization-vmemo, bundle-and-lazy,
   vue-test-utils-and-testing-library, component-testing-patterns,
   e2e-playwright, vapor-mode-future.

### Track frontend-architecture - "Architektura Frontendu" (6 modules, 32 lessons)

Files: `content/tracks/frontend-architecture/module-01-architecture-thinking.js`
... `module-06-quality-delivery-leadership.js`. Aim at senior -> principal level;
the learner maintains a design system (CHI) at a large telco.

1. `architecture-thinking` (5): what-is-frontend-architecture,
   boundaries-coupling-cohesion, adrs-and-rfcs, conways-law-team-topologies,
   build-vs-buy-decisions.
2. `design-systems-at-scale` (6): design-tokens-theming, component-api-design,
   versioning-and-breaking-changes, docs-storybook-playgrounds,
   testing-visual-regression, governance-contribution-model.
3. `state-and-data-architecture` (5): state-taxonomy (server/client/url/form),
   data-fetching-layer, realtime-and-optimistic-ui, offline-first-pwa,
   api-contracts-bff.
4. `scaling-codebases` (5): monorepos-tooling (nx, turborepo, pnpm),
   micro-frontends-tradeoffs, shared-libs-boundaries, feature-flags-experiments,
   dependency-upgrades-strategy.
5. `performance-architecture` (5): web-vitals-budgets, rendering-strategies
   (CSR/SSR/SSG/ISR/streaming), asset-strategy-fonts-images,
   runtime-patterns-virtualization, rum-monitoring.
6. `quality-delivery-leadership` (6): testing-strategy, frontend-ci-cd,
   error-observability, frontend-security (XSS, CSP, supply chain),
   code-review-culture, principal-track-case-studies.

### Wiring

- Each track's `index.js` imports its 6 module files, `status: 'available'`,
  `planned: []`, bilingual title/description kept.
- `sw.js` precache list is REGENERATED from disk to include every
  `content/**/*.js` file (old removed react-vs-vue entry must stay gone).
- README curriculum section updated: 4 available tracks, ~142 lessons total.

## v5 - Review, Interview, UX pack, AI-track animations, Listening mode

### Storage additions (key `learnai:v1`, all migration-safe with defaults)

```
lastVisited: { trackId, moduleId, lessonId }        // set on every lesson view
activity:    { 'YYYY-MM-DD': number }               // counts completions + finished review/interview sessions
missed:      [ '<trackId>/<moduleId>/<lessonId>/<qIndex>', ... ]  // quiz/review questions answered wrong (deduped, cap 200)
interview:   { '<trackId>/<qIndex>': 'ok' | 'again' }             // self-assessment for open questions
```

### Review mode (Powtórka) - route `#/review`

- Entry: card on home ("Powtórka" / "Review") + button on module pages that have
  at least one completed lesson ("Powtórz ten moduł" / "Review this module").
- Options screen: scope = "Wszystko" (all completed lessons across tracks) OR one
  module picked from a list of modules with >=1 completed lesson (grouped by
  track, with completed-lesson counts). If nothing is completed yet, friendly
  empty state pointing to the courses.
- Session: EXACTLY 10 questions drawn from the quiz pools of COMPLETED lessons
  in scope (fewer only if the pool is smaller - say so). Selection: up to 3 from
  `missed` first (in scope), the rest random without repeats, shuffled.
- Question UX identical to lesson quizzes (instant feedback + explanation).
  End screen: score, per-question recap, "Jeszcze raz" button.
- After session: wrong answers -> add to `missed`, correct -> remove from
  `missed`; bump today's `activity`.

### Interview mode - route `#/interview`

- Content: per-track question banks at `content/tracks/<trackId>/interview.js`
  (all 4 tracks), plus `content/interview.js` exporting
  `INTERVIEW_BANKS = { [trackId]: bank }` (static imports).
- Bank schema:

```js
export default {
  trackId: 'react',
  questions: [   // 36 per track, order mixed
    { kind: 'choice', level: 'mid'|'senior',
      q: {pl,en}, options: [{pl,en} x4], correct: 0-3, explain: {pl,en} },
    { kind: 'open', level: 'mid'|'senior',
      q: {pl,en},
      answer: {pl,en},              // model answer, HTML, 100-200 words
      keyPoints: [{pl,en} x3-5] }   // the checklist an interviewer listens for
  ]
}
```

  ~60% choice / 40% open. Distinctly HARDER than lesson quizzes: production
  scenarios, tradeoffs, "what breaks when..." - real interview register, both
  languages natural.
- Options screen: track (or "Wszystkie") -> session of 10 (choice questions
  scored like quizzes; open questions: think -> "Pokaż odpowiedź" reveals answer
  + key points -> self-assess "Umiałem" / "Muszę powtórzyć", stored in
  `interview`). "Muszę powtórzyć" questions get selection priority next time.
- End screen: score for choice, self-assessment tally for open; bumps `activity`.

### UX pack

- **Continue**: home, above the track list: "Kontynuuj: <lesson title>" jumping
  to `lastVisited`'s first incomplete lesson (or next lesson if that one is
  done); hidden when nothing visited yet.
- **Search**: icon button in the sticky header -> `#/search`, autofocused input,
  client-side index built lazily on first use (lesson titles + tag-stripped text
  of all three levels, both languages searched regardless of UI language).
  Ranking: title match > content match. Results show track/module breadcrumb +
  matched-fragment snippet. Min 2 chars, results capped at 30.
- **Streak / daily goal**: home card: "Seria: N dni 🔥" (consecutive days with
  >=1 activity, today counts if active) + "Dziś: X / cel 2". Fixed goal of 2.
- **Export/import**: small settings block at the bottom of home:
  Export downloads `learnai-progress.json` AND copies a compact base64 code to
  the clipboard; Import accepts a pasted code or a picked .json file, shows what
  it contains (lesson count, date) and asks in-app confirmation before
  overwriting. No QR (no dependencies allowed).

### Listening mode (TTS) - lesson page

- Toolbar under the level tabs: Play/Pause, Stop, rate select (0.9x / 1x / 1.2x).
- Reads lesson title + the ACTIVE level's content, tags stripped, split into
  paragraph-sized chunks queued sequentially (avoids Chrome's long-utterance
  cutoff). `speechSynthesis` with voice matched to UI language (pl-PL / en-US;
  first available match, else default voice). Cancel on route change, level
  switch, and language switch. Hide the toolbar entirely when
  `speechSynthesis` is unavailable.

### AI Engineer track animations

Add `interactive` frames (existing v4 schema, 3-8 frames) to 12-16 existing
ai-engineer lessons - the ones where motion genuinely explains the mechanism,
e.g.: tokenization (BPE merges), context-window (truncation), embeddings
(vector-space projection), cost-latency-caching (cache hit flow), tool-calling
(the loop), validation-retries (parse-repair-retry), what-is-rag +
hybrid-search-reranking (pipeline), what-is-an-agent (loop with state),
ci-regression (eval gate), sse-vs-websockets (stream frames),
streaming-partial-json, prompt-injection (untrusted content flow),
sandboxing-least-privilege. Target 1-2 per module across all 8 modules.
Only ADD the `interactive` field - do not touch existing lesson content.

### Wiring

- New routes #/review, #/interview, #/search in the hash router; entries on
  home; i18n for every new UI string in both languages.
- sw.js precache regenerated from disk (now includes content/interview.js and
  the 4 interview banks).
- README: document the new features (EN + PL).

## v5.1 - Anki-style review (supersedes the v5 review SESSION rules)

Entry points and scope selection stay as in v5 (home card, module-page button,
"Wszystko" or one module). What changes: scheduling and session flow.

### Card scheduling (SM-2 lite)

- A card = one quiz question of a COMPLETED lesson. Key `<t>/<m>/<l>/<qIndex>`.
- Storage (inside `learnai:v1`): `srs: { '<key>': { box: 0-5, due: 'YYYY-MM-DD', reps, lapses } }`
  plus `reviewDay: { date: 'YYYY-MM-DD', done: number }` for the daily counter.
  The v5 `missed` array is superseded - migrate it once: every key in `missed`
  becomes a card with box 0 due today, then drop `missed`.
- Cards not in `srs` are "new". Intervals by box: 0->today, 1->1d, 2->3d,
  3->7d, 4->14d, 5->30d (cap).
- Correct answer: box+1 (max 5), due = today + interval(box), reps++.
- Wrong answer: box = 0, lapses++, due = today, AND the card re-queues at the
  end of the CURRENT session until answered correctly (Anki learning step).

### Daily dose + endless mode

- **Daily dose**: up to 10 cards: overdue/due first (oldest due date first),
  topped up with new cards (never-reviewed, from completed lessons in scope).
  Home card shows "Powtórki na dziś: N" (count of due, capped display 99+);
  after finishing: "Dzienna dawka zrobiona ✓" state on home.
- **Endless mode**: after the daily dose (or from the options screen) -
  "Dalej bez limitu" / "Keep going": serves rounds of 10 with a mini-summary
  between rounds (score, "Jeszcze 10" / "Koniec"). Pool order: due cards,
  then new cards, then lowest-box cards (weakest first), never the same card
  twice in a round except failed re-queues. Works indefinitely.
- Finishing the daily dose (or any full round of 10) bumps `activity`.
- Empty states: nothing completed -> point to courses; everything reviewed and
  no due cards -> "Wszystko powtórzone na dziś" + offer endless mode anyway.

## v6 - Learning-effectiveness pack

Six features. Storage additions inside `learnai:v1` (migration-safe, validated
in stateFromRaw like existing keys): `notes: { '<t>/<m>/<l>': { text: string (cap 5000), at: ISO } }`.

### 1. Flashcards (fiszki) wired into SRS

- CONTENT: every lesson in all 26 module files gets a new field
  `terms: [ { term: {pl,en}, def: {pl,en} } ]` - 3-5 key terms per lesson.
  `term` is short (1-4 words); `def` is 1-2 sentences, may use inline
  `<code>/<em>/<strong>`. Terms = what a learner should be able to define cold
  (e.g. "reranking", "TTFT", "hydration"). Bilingual, Polish natural.
- APP: a term card = SRS card with key `<t>/<m>/<l>/term/<i>` (srs validation
  must accept both question and term keys). Term cards of COMPLETED lessons
  enter the same scheduling as question cards. Review sessions interleave both
  kinds. Term card UX (Anki classic): front = the term + "?" prompt ->
  "Pokaż odpowiedź" -> definition -> self-grade buttons "Umiałem" (correct) /
  "Nie umiałem" (wrong, requeues like a failed question card).

### 2. Pre-question (Zgadnij, zanim przeczytasz)

- Lesson view, only when the lesson is NOT completed: a collapsed card at the
  top (under the breadcrumb, above tabs): "Zgadnij, zanim przeczytasz" - one
  quiz question of this lesson (pick deterministically: index = day-of-year %
  quiz.length so it is stable within a day). Answering gives instant feedback +
  explanation + "Teraz przeczytaj i sprawdź się" note. Does NOT touch SRS,
  quiz score or activity. Collapsible via <details> or equivalent; collapsed
  state is default-open on first visit of a lesson, remember nothing.

### 3. Weak areas + activity heatmap - route `#/stats` + home chip

- Per-module weakness score from srs cards of that module (only modules with
  >= 3 scheduled cards): weighted avg box (lower = weaker) + lapse ratio.
  `#/stats` shows: top-3 weakest modules with bars + per-module card counts,
  a button per row "Powtórz ten moduł" -> endless review scoped there; below,
  a GitHub-style heatmap of the last 16 weeks of `activity` (CSS grid, 5
  intensity buckets, weekday rows, month labels, today outlined).
- Home: compact chip under the streak card when a weakest module exists:
  "Najsłabszy obszar: <module> -> Powtórz" linking to that scoped review.
  Header: no new icons; stats reachable from a small link on the streak card
  ("Statystyki ->").

### 4. Feynman - explain in your own words

- Lesson view, between content and quiz: card "Wyjaśnij własnymi słowami" -
  textarea (autosaves to `notes` on input, debounced), placeholder telling the
  user to explain it like to a colleague (voice typing on mobile works via the
  keyboard). Button "Porównaj z wersją prostą" reveals the eli5 content of the
  current language inline for self-comparison + note "Czego zabrakło?".
  Saved note persists and pre-fills on revisit; small "saved" indicator.

### 5. Micro-session (Mam 5 minut)

- Home, near the continue card: button "⚡ Mam 5 minut". Logic (route
  `#/quick`): if due SRS cards >= 3 -> review round of FIVE cards (same
  session UI, round size 5, counts toward reviewDay/activity when finished);
  else -> navigate straight to the shortest unfinished lesson (by minutes,
  ties: first in curriculum order).

### 6. Ask Claude deep link

- Lesson view footer (under quiz, above prev/next): link
  "💬 Zapytaj Claude o tę lekcję" -> https://claude.ai/new?q=<encoded>
  where the prompt (in the current UI language) is roughly: "Uczę się tematu
  '<lesson title>' (kurs <track title>, moduł <module title>). Wyjaśnij mi to
  inaczej niż standardowo, sprawdź moje zrozumienie 2-3 pytaniami i podaj
  jeden praktyczny przykład z frontendu." `target="_blank" rel="noopener"`.
  Pure link - no API, no key.

### Wiring

- No new content files (terms live inside existing module files), so sw.js
  precache does not change; do not touch it.
- i18n for every new string in both languages; README gets a short
  "Learning effectiveness" note in both languages.

## v7 - Content quality bar v2 (PILOT: ai-engineer module 1 only)

User feedback driving this version: lessons feel generic; the pro level is
written in expert shorthand although this is FUNDAMENTALS for someone who does
not know the material yet; quiz questions rely on pro-only content; too little
interactivity. The pilot rewrites `content/tracks/ai-engineer/module-01-llm-fundamentals.js`
to the new bar. If accepted, modules 2-8 follow.

### Multiple interactive players per lesson (app change, global)

- `lesson.interactive` may now be EITHER a single player object (back-compat,
  all existing content keeps working) OR an ARRAY of 1-4 player objects
  (same frames schema each). App renders them stacked, in order, under the
  static diagram; each player is independent (own slider/buttons/labels).
  Validation and bind logic must handle both shapes.

### Content rules v2 (apply on top of the v1 "Content schema" section)

- **Every lesson has interactive players covering its key sub-problems** -
  typically 2-3 per lesson, minimum 1. One player = one concrete mechanism
  shown step by step (not a decorative slideshow): e.g. for tokenization -
  (a) BPE merges building tokens from characters, (b) why counting letters in
  a token stream fails, (c) same text tokenized cheap vs expensive.
- **eli5**: 150-250 words. One everyday analogy carried through, playful,
  zero jargon.
- **school**: 300-450 words. Introduces every proper term WITH a plain-language
  definition at first use, one worked example with real numbers, ends with a
  2-3 sentence "co musisz zapamiętać" wrap-up. After reading ONLY this level,
  quiz questions 1-3 must be answerable.
- **pro**: 400-650 words. Full depth - real prices/latencies/sizes, code where
  useful, production pitfalls, interview angles - BUT written as an expert
  explaining to a smart newcomer: every technical term, abbreviation and tool
  name gets an in-line parenthetical definition at first use; no sentence may
  depend on knowledge the lesson has not provided. Longer is fine; unexplained
  shorthand is a defect. Ends with "co z tego wynika w praktyce" (2-3 bullets).
- **quiz**: q1 answerable from eli5, q2-q3 from school, q4 may draw on pro but
  must be SELF-CONTAINED (all needed context inside the question itself).
  Explanations teach the underlying rule, not just the right letter.
- Keep lesson ids and the module id/order/icon. Titles may be sharpened.
  Keep the `terms` field (refine defs only if the rewrite changes framing).
  Update `minutes` to match the longer content. Diagrams: keep or improve.
- Both languages, Polish natural (not translated). All existing SVG and string
  escaping rules apply.

## v7.1 - Glossary layer (tlumaczenie pojec) + shuffled answers

- **Shuffled answers** (done, in app.js): every choice question (lesson quiz,
  review, interview, pre-question) renders its options in random order on
  every render; `data-o` keeps the original index so scoring is untouched;
  A-D letters follow display position.
- **Term chips**: lesson view, directly under the level tabs (above TTS): a
  wrapping row of small chips - one per entry in `lesson.terms` (current UI
  language). Tapping a chip opens the definition sheet.
- **Definition sheet**: a bottom sheet (mobile-first; centered dialog >=560px)
  with the term, its definition (def may contain inline HTML), source lesson
  link when opened outside that lesson, and a close button; closes on
  backdrop tap and Escape. One shared component.
- **Inline term highlight**: after rendering lesson content, a post-render DOM
  pass over the ACTIVE level's text nodes wraps the FIRST occurrence of each
  of the lesson's terms (case-insensitive, current language, skip inside
  <code>/<pre>) in a tappable marker (dotted underline) that opens the sheet.
  Re-runs on level/language switch. Must never break existing markup (operate
  on text nodes only, never innerHTML string surgery).
- **Global glossary** - route `#/glossary`: all terms from ALL tracks (dedupe
  identical term text per language, keep first def), alphabetical sections
  with a sticky search input (min 2 chars filters live), each row: term, def,
  breadcrumb link to the source lesson. Entry point: a small "Slowniczek" /
  "Glossary" link in the home footer area next to Statystyki, plus i18n.
- No content changes, no sw.js changes (no new files). i18n pl+en for all new
  strings.

## Definition of done

- Every JS file passes `node --check`.
- `content/registry.js` imports all 8 modules; a validation script confirms every
  lesson has 3 levels x 2 languages, a diagram whose svg starts with `<svg`, and
  4 quiz questions with 4 options and a valid `correct` index.
- App renders at 360px width, light and dark mode, no console errors.
- Site live at https://wojtek9609.github.io/learn-ai/.
