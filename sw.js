/* ==========================================================================
   Learn AI - service worker (v3)
   Scope is './' because the app is served from the /learn-ai/ subpath.
   VERSION is the literal '__BUILD__' in the dev channel (Tailscale, local
   http.server) and is replaced with the short commit SHA by the Pages
   workflow before upload. Dev channel => network-first, no cache fights.
   ========================================================================== */

const VERSION = '__BUILD__';
// The placeholder is matched by regex on purpose: the deploy step rewrites the
// build-token literal above, and this test must survive that rewrite (a literal
// comparison here could be substituted too and make production look like dev).
const DEV = /^_{2}BUILD_{2}$/.test(VERSION);
const CACHE = `learnai-${VERSION}`;

/* App shell + every content module. Explicit list, no globbing in a SW. */
const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon.svg',
  './content/tracks.js',
  './content/tracks/ai-engineer/index.js',
  './content/tracks/ai-engineer/module-01-llm-fundamentals.js',
  './content/tracks/ai-engineer/module-02-structured-tools.js',
  './content/tracks/ai-engineer/module-03-rag.js',
  './content/tracks/ai-engineer/module-04-agents.js',
  './content/tracks/ai-engineer/module-05-evals.js',
  './content/tracks/ai-engineer/module-06-streaming-ux.js',
  './content/tracks/ai-engineer/module-07-security.js',
  './content/tracks/ai-engineer/module-08-python.js',
  './content/tracks/frontend-architecture/index.js',
  './content/tracks/react/index.js',
  './content/tracks/react-vs-vue/index.js',
  './content/tracks/vue/index.js',
];

/* ------------------------------------------------------------- install --- */

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // addAll is all-or-nothing; add one by one so a single 404 cannot
      // break the whole install (dev channel especially).
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            const res = await fetch(new Request(url, { cache: 'reload' }));
            if (res && res.ok) await cache.put(url, res);
          } catch (err) {
            /* offline or missing file - runtime caching will pick it up */
          }
        })
      );
      if (DEV) await self.skipWaiting();
    })()
  );
});

/* ------------------------------------------------------------ activate --- */

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith('learnai-') && name !== CACHE)
          .map((name) => caches.delete(name))
      );
      if (self.registration.navigationPreload) {
        try {
          await self.registration.navigationPreload.disable();
        } catch (err) {
          /* not supported - ignore */
        }
      }
      await self.clients.claim();
    })()
  );
});

/* ------------------------------------------------------------- message --- */

self.addEventListener('message', (event) => {
  const data = event.data;
  const type = data && data.type;
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (type === 'GET_VERSION') {
    const payload = { type: 'VERSION', version: VERSION, dev: DEV };
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage(payload);
    } else if (event.source) {
      event.source.postMessage(payload);
    }
  }
});

/* --------------------------------------------------------------- fetch --- */

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

async function cachePut(request, response) {
  if (!response || !response.ok || response.type === 'opaque') return;
  const cache = await caches.open(CACHE);
  await cache.put(request, response.clone());
}

/* Release channel: stale-while-revalidate. */
async function staleWhileRevalidate(request, fallbackKey) {
  const cached = (await caches.match(request)) ||
    (fallbackKey ? await caches.match(fallbackKey) : undefined);

  const network = fetch(request)
    .then((response) => {
      cachePut(request, response);
      return response;
    })
    .catch(() => undefined);

  if (cached) return cached;
  const fresh = await network;
  if (fresh) return fresh;
  throw new Error('offline and not cached');
}

/* Dev channel: network-first so edits on the Mac show up on reload. */
async function networkFirst(request, fallbackKey) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    cachePut(request, response);
    return response;
  } catch (err) {
    const cached = (await caches.match(request)) ||
      (fallbackKey ? await caches.match(fallbackKey) : undefined);
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }
  if (!isSameOrigin(url)) return;

  // Navigations always fall back to the app shell (hash routing).
  const isNavigation =
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  const fallbackKey = isNavigation ? './index.html' : undefined;
  const handler = DEV ? networkFirst : staleWhileRevalidate;

  event.respondWith(
    handler(request, fallbackKey).catch(async () => {
      const shell = await caches.match('./index.html');
      if (isNavigation && shell) return shell;
      return new Response('Offline', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    })
  );
});
