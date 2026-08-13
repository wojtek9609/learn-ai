// Track react - module 5: Frameworks, routing and React Server Components.
// Every lesson is taught side-by-side with the Vue / Nuxt equivalent.

export default {
  id: 'frameworks-rsc',
  order: 5,
  icon: '🌐',
  title: { pl: 'Frameworki i RSC', en: 'Frameworks & RSC' },
  description: {
    pl: 'Routing, meta-frameworki i React Server Components widziane oczami osoby, która zna Vue Router i Nuxt. Co się mapuje 1:1, a co jest naprawdę nowym modelem.',
    en: 'Routing, meta-frameworks and React Server Components seen through the eyes of someone who knows Vue Router and Nuxt. What maps 1:1, and what is a genuinely new model.'
  },
  lessons: [

    // ---------------------------------------------------------------- 1
    {
      id: 'react-router-vs-vue-router',
      title: { pl: 'React Router kontra Vue Router', en: 'React Router vs Vue Router' },
      minutes: 10,
      terms: [
        {
          term: { pl: 'loader', en: 'loader' },
          def: { pl: 'Funkcja przypisana do trasy, która pobiera dane <strong>zanim</strong> komponent się wyrenderuje. Zastępuje pobieranie w <code>onMounted</code> i domyślnie blokuje nawigację do czasu rozwiązania.', en: 'A function attached to a route that fetches data <strong>before</strong> the component renders. It replaces fetching in <code>onMounted</code> and blocks navigation until it resolves.' }
        },
        {
          term: { pl: 'action', en: 'action' },
          def: { pl: 'Odpowiednik loadera dla mutacji: obsługuje wysłany <code>&lt;Form method="post"&gt;</code>, a po zakończeniu router sam rewaliduje aktywne loadery.', en: 'The mutation counterpart of a loader: it handles a submitted <code>&lt;Form method="post"&gt;</code>, and afterwards the router revalidates every active loader on its own.' }
        },
        {
          term: { pl: 'Równoległe loadery', en: 'Parallel loaders' },
          def: { pl: 'Przy zagnieżdżonych trasach wszystkie loadery startują jednocześnie, zamiast kaskady mount-fetch-mount znanej z Vue Routera. Jedno okno czekania zamiast trzech.', en: 'With nested routes every loader starts at once instead of the mount-fetch-mount cascade familiar from Vue Router. One waiting window instead of three.' }
        },
        {
          term: { pl: 'Rewalidacja po akcji', en: 'Post-action revalidation' },
          def: { pl: 'Po udanej akcji router odświeża dane wszystkich aktywnych tras. To <code>queryClient.invalidateQueries()</code> wbudowane w routing.', en: 'After a successful action the router refreshes the data of every active route. It is <code>queryClient.invalidateQueries()</code> baked into routing.' }
        },
        {
          term: { pl: 'useNavigation', en: 'useNavigation' },
          def: { pl: 'Hook zwracający stan nawigacji (<code>idle</code>, <code>loading</code>, <code>submitting</code>) - gotowy odpowiednik ręcznie pisanego <code>isSubmitting</code>.', en: 'The hook returning navigation state (<code>idle</code>, <code>loading</code>, <code>submitting</code>) - a ready-made replacement for the hand-rolled <code>isSubmitting</code>.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
          + '<text x="20" y="28" font-family="inherit" font-size="15" fill="var(--accent2)">Vue Router</text>'
          + '<text x="340" y="28" font-family="inherit" font-size="15" fill="var(--accent)">React Router</text>'
          + '<line x1="320" y1="40" x2="320" y2="290" stroke="var(--border)" stroke-width="2"/>'
          + '<rect x="20" y="50" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="155" y="76" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">route table</text>'
          + '<text x="155" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">createRouter({ routes })</text>'
          + '<rect x="350" y="50" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="485" y="76" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">route table</text>'
          + '<text x="485" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">createBrowserRouter(routes)</text>'
          + '<rect x="20" y="130" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="155" y="156" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">where the child renders</text>'
          + '<text x="155" y="176" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">&lt;router-view /&gt;</text>'
          + '<rect x="350" y="130" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="485" y="156" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">where the child renders</text>'
          + '<text x="485" y="176" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">&lt;Outlet /&gt;</text>'
          + '<rect x="20" y="210" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="155" y="236" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">data before the view</text>'
          + '<text x="155" y="256" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">beforeEnter + fetch in setup</text>'
          + '<rect x="350" y="210" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="485" y="236" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">data before the view</text>'
          + '<text x="485" y="256" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">loader() + action()</text>'
          + '<text x="20" y="325" font-family="inherit" font-size="13" fill="var(--muted)">Same three ideas. The one real difference is that React Router</text>'
          + '<text x="20" y="347" font-family="inherit" font-size="13" fill="var(--muted)">owns data loading and mutations, not just navigation.</text>'
          + '</svg>',
        caption: {
          pl: 'Trzy te same pojęcia w obu routerach. Prawdziwa różnica: React Router w trybie data bierze na siebie także pobieranie danych i mutacje.',
          en: 'The same three concepts in both routers. The real difference: in data mode React Router also owns data loading and mutations.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie hotel. Router to recepcjonista: mówisz mu numer pokoju, a on prowadzi Cię korytarzami do właściwych drzwi. W hotelu Vue recepcjonista ma listę pokoi i mówi tylko "proszę, tu Pan mieszka". Co będzie w środku - łóżko, ręczniki, mydło - to już zmartwienie pokoju.</p><p>W hotelu React nowszej generacji recepcjonista robi coś więcej: zanim otworzy drzwi, dzwoni do obsługi i każe przygotować pokój. Kiedy wchodzisz, ręczniki już leżą. Nie oglądasz sprzątania, nie widzisz pustego pokoju z napisem "ładowanie".</p><p>Obaj recepcjoniści prowadzą Cię tak samo. Różnica polega na tym, kto zamawia ręczniki. W jednym hotelu robi to pokój, gdy już w nim jesteś. W drugim - recepcja, zanim wejdziesz. Dlatego drugi hotel częściej wita Cię gotowym pokojem zamiast pustej sali z kręceniem się kółka.</p>',
          en: '<p>Picture a hotel. The router is the receptionist: you say a room number and they walk you down the corridors to the right door. In the Vue hotel the receptionist only says "here you go, this is your room". What is inside - bed, towels, soap - is the room getting itself ready.</p><p>In the newer React hotel the receptionist does more: before opening the door they ring housekeeping and have the room prepared. When you walk in, the towels are already there. You never watch the cleaning, you never see an empty room with a "loading" sign.</p><p>Both receptionists walk you the same way. The difference is who orders the towels. In one hotel the room does it once you are already inside. In the other the front desk does it before you enter. That is why the second hotel greets you with a finished room instead of an empty one with a spinner in the middle.</p>'
        },
        school: {
          pl: '<p>Znasz Vue Router, więc 80 procent React Routera już umiesz. Tabela tras zamienia się w tablicę obiektów, <code>&lt;router-view /&gt;</code> nazywa się <code>&lt;Outlet /&gt;</code>, <code>&lt;router-link&gt;</code> to <code>&lt;Link&gt;</code>, a <code>useRoute()</code> i <code>useRouter()</code> to <code>useParams()</code> i <code>useNavigate()</code>. Zagnieżdżenie tras działa identycznie.</p><p>Vue:</p><pre><code>const routes = [\n  { path: "/orders", component: OrdersLayout,\n    children: [{ path: ":id", component: OrderDetail }] }\n];\n// OrdersLayout.vue\n&lt;template&gt;&lt;router-view /&gt;&lt;/template&gt;</code></pre><p>React:</p><pre><code>const router = createBrowserRouter([\n  { path: "/orders", element: &lt;OrdersLayout /&gt;,\n    children: [{ path: ":id", element: &lt;OrderDetail /&gt; }] }\n]);\nfunction OrdersLayout() { return &lt;Outlet /&gt;; }</code></pre><p>Teraz różnica, która naprawdę ma znaczenie. W Vue dane zwykle pobierasz w komponencie: <code>onMounted</code> albo <code>watch</code> na <code>route.params.id</code>, plus własne <code>isLoading</code>. Nawigacja kończy się natychmiast, a komponent chwilę pokazuje spinner.</p><p>W React Routerze w trybie data trasę opisujesz razem z jej danymi. <code>loader</code> to funkcja, która biegnie <em>przed</em> renderem, a <code>action</code> obsługuje wysłanie formularza.</p><pre><code>{ path: ":id",\n  loader: ({ params }) =&gt; fetch("/api/orders/" + params.id),\n  element: &lt;OrderDetail /&gt; }\n\nfunction OrderDetail() {\n  const order = useLoaderData();   // dane już są\n  return &lt;h1&gt;{order.title}&lt;/h1&gt;;\n}</code></pre><p>W Vue robiłeś X: komponent montuje się pusty i sam sobie dociąga dane. W React robisz Y: router czeka na dane i dopiero potem pokazuje widok. Dlaczego Z: bo dzięki temu znika migotanie spinnerów, a router może równolegle pobrać dane dla wszystkich zagnieżdżonych tras zamiast jednej po drugiej.</p>',
          en: '<p>You know Vue Router, so you already know 80 percent of React Router. The route table becomes an array of objects, <code>&lt;router-view /&gt;</code> is called <code>&lt;Outlet /&gt;</code>, <code>&lt;router-link&gt;</code> is <code>&lt;Link&gt;</code>, and <code>useRoute()</code> / <code>useRouter()</code> become <code>useParams()</code> / <code>useNavigate()</code>. Nested routes work identically.</p><p>Vue:</p><pre><code>const routes = [\n  { path: "/orders", component: OrdersLayout,\n    children: [{ path: ":id", component: OrderDetail }] }\n];\n// OrdersLayout.vue\n&lt;template&gt;&lt;router-view /&gt;&lt;/template&gt;</code></pre><p>React:</p><pre><code>const router = createBrowserRouter([\n  { path: "/orders", element: &lt;OrdersLayout /&gt;,\n    children: [{ path: ":id", element: &lt;OrderDetail /&gt; }] }\n]);\nfunction OrdersLayout() { return &lt;Outlet /&gt;; }</code></pre><p>Now the difference that actually matters. In Vue you usually fetch inside the component: <code>onMounted</code> or a <code>watch</code> on <code>route.params.id</code>, plus your own <code>isLoading</code> flag. Navigation completes instantly and the component shows a spinner for a moment.</p><p>React Router in data mode describes a route together with its data. A <code>loader</code> runs <em>before</em> the render, an <code>action</code> handles form submissions.</p><pre><code>{ path: ":id",\n  loader: ({ params }) =&gt; fetch("/api/orders/" + params.id),\n  element: &lt;OrderDetail /&gt; }\n\nfunction OrderDetail() {\n  const order = useLoaderData();   // data is already here\n  return &lt;h1&gt;{order.title}&lt;/h1&gt;;\n}</code></pre><p>In Vue you did X: the component mounts empty and pulls its own data. In React you do Y: the router waits for the data and only then shows the view. Because Z: spinner flicker disappears, and the router can load data for all nested routes in parallel instead of one after another.</p>'
        },
        pro: {
          pl: '<p>React Router 7 (dawniej Remix) ma trzy tryby: <em>declarative</em> (stare <code>&lt;Routes&gt;</code>, zachowuje się jak Vue Router), <em>data</em> (<code>createBrowserRouter</code> plus loadery) i <em>framework</em> (pełny SSR, własny build). Vue Router ma tylko odpowiednik pierwszego trybu, a rola loaderów spada tam na guardy i biblioteki typu Pinia Colada albo VueUse.</p><p>Mapa pojęć, która warto zapamiętać przed rozmową rekrutacyjną:</p><table><tr><th>Vue Router</th><th>React Router</th></tr><tr><td>router.beforeEach</td><td>loader z redirect() lub middleware</td></tr><tr><td>onBeforeRouteLeave</td><td>useBlocker</td></tr><tr><td>route.meta</td><td>handle</td></tr><tr><td>defineAsyncComponent</td><td>lazy: () =&gt; import(...)</td></tr><tr><td>router.isReady()</td><td>navigation.state</td></tr><tr><td>ręczne isSubmitting</td><td>useFetcher / useNavigation</td></tr></table><p>Kluczowa mechanika trybu data to <strong>równoległe loadery</strong>. Dla URL <code>/orders/42/items</code> router odpala loadery layoutu, detalu i listy jednocześnie, a widok pojawia się, gdy wszystkie są gotowe. W Vue ten sam układ zwykle daje kaskadę: layout montuje się, dziecko montuje się, każde odpala swojego fetcha - trzy sekwencyjne round-tripy po 120 ms zamiast jednego.</p><p>Mutacje mają swoją wersję tego samego pomysłu. W Vue piszesz <code>isSubmitting</code>, <code>error</code>, potem ręcznie odświeżasz store. W React:</p><pre><code>&lt;Form method="post"&gt;&lt;input name="title" /&gt;&lt;/Form&gt;\n\nasync function action({ request }) {\n  const data = await request.formData();\n  await api.rename(data.get("title"));\n  return redirect("/orders");   // rewalidacja loaderów gratis\n}\n\nconst nav = useNavigation();\nnav.state === "submitting";     // twój isSubmitting</code></pre><p>Po zakończeniu akcji router automatycznie rewaliduje wszystkie aktywne loadery. To odpowiednik <code>queryClient.invalidateQueries()</code>, tylko wbudowany w routing. Efekt uboczny jest bardzo przyjemny: znika cała warstwa ręcznego synchronizowania store po mutacji, która w projektach Vue potrafi zajmować kilkaset linii i i tak gubi jeden przypadek brzegowy.</p><p>Warto też wiedzieć, że <code>useFetcher()</code> pozwala wywołać akcję albo loader bez nawigacji. To odpowiednik sytuacji, w której we Vue wołałeś metodę ze store bezpośrednio z komponentu: przycisk lubię, przełącznik statusu, autosave formularza.</p><p>Pułapki z produkcji: (1) <code>useNavigate()</code> w efekcie zamiast <code>&lt;Link&gt;</code> zabija prefetch i środkowy przycisk myszy; (2) w trybie data <code>&lt;Outlet context&gt;</code> zastępuje <code>provide/inject</code> tylko dla drzewa tras, nie dla całej aplikacji; (3) domyślnie loader blokuje nawigację - wolne endpointy trzeba oddać przez <code>defer</code>/<code>Await</code>, inaczej kliknięcie w link wygląda jak zawieszona aplikacja; (4) jeśli już używasz TanStack Query, nie duplikuj cache - loader może wołać <code>queryClient.ensureQueryData()</code> i zostawić cache jednemu właścicielowi.</p>',
          en: '<p>React Router 7 (formerly Remix) has three modes: <em>declarative</em> (old <code>&lt;Routes&gt;</code>, behaves just like Vue Router), <em>data</em> (<code>createBrowserRouter</code> plus loaders) and <em>framework</em> (full SSR with its own build). Vue Router only has an equivalent of the first mode; the loader role there falls to guards and libraries like Pinia Colada or VueUse.</p><p>The mapping worth memorising before an interview:</p><table><tr><th>Vue Router</th><th>React Router</th></tr><tr><td>router.beforeEach</td><td>loader with redirect() or middleware</td></tr><tr><td>onBeforeRouteLeave</td><td>useBlocker</td></tr><tr><td>route.meta</td><td>handle</td></tr><tr><td>defineAsyncComponent</td><td>lazy: () =&gt; import(...)</td></tr><tr><td>router.isReady()</td><td>navigation.state</td></tr><tr><td>manual isSubmitting</td><td>useFetcher / useNavigation</td></tr></table><p>The key mechanic of data mode is <strong>parallel loaders</strong>. For <code>/orders/42/items</code> the router fires the layout, detail and list loaders at the same time and shows the view when all resolve. The same nesting in Vue usually produces a cascade: layout mounts, child mounts, each fires its own fetch - three sequential 120 ms round-trips instead of one.</p><p>Mutations get the same treatment. In Vue you hand-roll <code>isSubmitting</code>, <code>error</code>, then refresh a store yourself. In React:</p><pre><code>&lt;Form method="post"&gt;&lt;input name="title" /&gt;&lt;/Form&gt;\n\nasync function action({ request }) {\n  const data = await request.formData();\n  await api.rename(data.get("title"));\n  return redirect("/orders");   // loader revalidation for free\n}\n\nconst nav = useNavigation();\nnav.state === "submitting";     // your isSubmitting</code></pre><p>When an action finishes, the router revalidates every active loader automatically. It is <code>queryClient.invalidateQueries()</code> baked into routing.</p><p>Production traps: (1) calling <code>useNavigate()</code> from an effect instead of rendering a <code>&lt;Link&gt;</code> kills prefetch and middle-click; (2) in data mode <code>&lt;Outlet context&gt;</code> replaces <code>provide/inject</code> only for the route tree, not for the whole app; (3) a loader blocks navigation by default - slow endpoints must be handed over with <code>defer</code>/<code>Await</code>, otherwise clicking a link looks like a frozen app; (4) if you already use TanStack Query, do not duplicate caches - have the loader call <code>queryClient.ensureQueryData()</code> and keep a single cache owner.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w React Routerze odpowiada znacznikowi <router-view /> z Vue?',
            en: 'What is the React Router equivalent of Vue <router-view />?'
          },
          options: [
            { pl: '<Suspense />', en: '<Suspense />' },
            { pl: '<Outlet />', en: '<Outlet />' },
            { pl: '<Slot />', en: '<Slot />' },
            { pl: '<Portal />', en: '<Portal />' }
          ],
          correct: 1,
          explain: {
            pl: '<Outlet /> to miejsce, w którym renderuje się trasa potomna - dokładnie ta sama rola co <router-view /> w layoucie Vue.',
            en: '<Outlet /> is where the child route renders - exactly the role <router-view /> plays inside a Vue layout.'
          }
        },
        {
          q: {
            pl: 'Czym różni się loader z React Routera od pobierania danych w onMounted we Vue?',
            en: 'How does a React Router loader differ from fetching in Vue onMounted?'
          },
          options: [
            { pl: 'Loader działa tylko na serwerze i nigdy w przeglądarce', en: 'A loader only runs on the server, never in the browser' },
            { pl: 'Loader jest wywoływany przed renderem widoku, więc komponent dostaje gotowe dane', en: 'A loader runs before the view renders, so the component receives ready data' },
            { pl: 'Loader zastępuje Context i stan globalny', en: 'A loader replaces Context and global state' },
            { pl: 'Loader jest synchroniczny i nie może zwrócić Promise', en: 'A loader is synchronous and cannot return a Promise' }
          ],
          correct: 1,
          explain: {
            pl: 'Loader biegnie w fazie nawigacji, przed renderem. Dlatego komponent nie potrzebuje własnego isLoading, a loadery zagnieżdżonych tras lecą równolegle.',
            en: 'A loader runs during navigation, before render. That is why the component needs no isLoading of its own, and nested-route loaders run in parallel.'
          }
        },
        {
          q: {
            pl: 'Masz zagnieżdżone trasy layout -> detal -> lista, każda z własnym zapytaniem po 120 ms. Co daje tryb data React Routera w porównaniu z fetchowaniem w komponentach?',
            en: 'You have nested routes layout -> detail -> list, each with its own 120 ms request. What does React Router data mode give you versus fetching inside components?'
          },
          options: [
            { pl: 'Nic, oba podejścia są sekwencyjne', en: 'Nothing, both approaches are sequential' },
            { pl: 'Zapytania są deduplikowane, ale nadal sekwencyjne', en: 'Requests are deduplicated but still sequential' },
            { pl: 'Trzy zapytania startują równolegle, więc czekasz raz zamiast trzy razy', en: 'The three requests start in parallel, so you wait once instead of three times' },
            { pl: 'Zapytania są przenoszone na serwer i cache CDN', en: 'The requests move to the server and a CDN cache' }
          ],
          correct: 2,
          explain: {
            pl: 'Router zna całe dopasowane drzewo tras zanim cokolwiek wyrenderuje, więc może odpalić wszystkie loadery naraz. Fetch w onMounted tworzy kaskadę, bo dziecko montuje się dopiero po rodzicu.',
            en: 'The router knows the whole matched route tree before rendering anything, so it can fire every loader at once. Fetching in onMounted creates a cascade because the child mounts only after the parent.'
          }
        },
        {
          q: {
            pl: 'Jeden z loaderów woła wolny raport (3 s). Użytkownik klika link i aplikacja wygląda na zawieszoną. Co jest poprawnym rozwiązaniem?',
            en: 'One loader calls a slow report (3 s). The user clicks a link and the app looks frozen. What is the correct fix?'
          },
          options: [
            { pl: 'Zwrócić z loadera niezakończony Promise i wyrenderować go przez <Await> w <Suspense>', en: 'Return the unresolved promise from the loader and render it with <Await> inside <Suspense>' },
            { pl: 'Przenieść zapytanie do useEffect w komponencie i zapomnieć o loaderze', en: 'Move the request into a component useEffect and drop the loader' },
            { pl: 'Ustawić shouldRevalidate na false', en: 'Set shouldRevalidate to false' },
            { pl: 'Zamienić <Link> na useNavigate()', en: 'Swap <Link> for useNavigate()' }
          ],
          correct: 0,
          explain: {
            pl: 'Loader może zwrócić mieszankę danych gotowych i odroczonych. Szybka część renderuje się od razu, wolna część dostaje fallback z Suspense - bez powrotu do ręcznego isLoading.',
            en: 'A loader can return a mix of resolved and deferred data. The fast part renders immediately, the slow part gets a Suspense fallback - without going back to hand-rolled isLoading.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'nextjs-vs-nuxt',
      title: { pl: 'Next.js kontra Nuxt', en: 'Next.js vs Nuxt' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'App Router', en: 'App Router' },
          def: { pl: 'Katalog <code>app/</code> z konwencjami <code>layout.tsx</code>, <code>page.tsx</code> i <code>route.ts</code>, w którym komponenty są domyślnie serwerowe. Odpowiednik <code>pages/</code> plus <code>layouts/</code> z Nuxta, ale z innym modelem wykonania.', en: 'The <code>app/</code> directory with its <code>layout.tsx</code>, <code>page.tsx</code> and <code>route.ts</code> conventions, where components are server-side by default. The Nuxt <code>pages/</code> plus <code>layouts/</code> equivalent, with a different execution model.' }
        },
        {
          term: { pl: 'revalidate (ISR)', en: 'revalidate (ISR)' },
          def: { pl: 'Eksport segmentu trasy określający, co ile sekund odświeżyć prerenderowaną stronę. Odpowiednik <code>routeRules</code> z Nuxta w wariancie ISR.', en: 'A route segment export saying how often, in seconds, to refresh the prerendered page. The ISR flavour of Nuxt <code>routeRules</code>.' }
        },
        {
          term: { pl: 'cache: "no-store"', en: 'cache: "no-store"' },
          def: { pl: 'Wypisanie pojedynczego <code>fetch()</code> z cache danych Next. Jego brak to najczęstszy bug produkcyjny: strona pokazuje dane sprzed dwóch godzin.', en: 'Opting a single <code>fetch()</code> out of the Next data cache. Forgetting it is the most common production bug: the page shows data from two hours ago.' }
        },
        {
          term: { pl: 'dynamic = "force-dynamic"', en: 'dynamic = "force-dynamic"' },
          def: { pl: 'Wymuszenie renderowania segmentu na każde żądanie. Ten sam efekt daje niejawnie <code>cookies()</code> albo <code>headers()</code> wywołane w layoucie.', en: 'Forcing a segment to render on every request. Calling <code>cookies()</code> or <code>headers()</code> in a layout has the same effect implicitly.' }
        },
        {
          term: { pl: 'Brak auto-importów i modułów', en: 'No auto-imports, no module system' },
          def: { pl: 'Next nie ma odpowiednika <code>@nuxtjs/*</code> ani auto-importów: każdy <code>Link</code>, hook czy integracje podpinasz ręcznie przez providery i config. Mniej magii, więcej boilerplate.', en: 'Next has no <code>@nuxtjs/*</code> equivalent and no auto-imports: every <code>Link</code>, hook and integration is wired by hand through providers and config. Less magic, more boilerplate.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
          + '<defs><marker id="nx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>'
          + '<text x="20" y="30" font-family="inherit" font-size="15" fill="var(--accent2)">Nuxt 3</text>'
          + '<text x="380" y="30" font-family="inherit" font-size="15" fill="var(--accent)">Next.js (App Router)</text>'
          + '<rect x="20" y="50" width="230" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="135" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">pages/orders.vue</text>'
          + '<rect x="380" y="50" width="240" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="500" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">app/orders/page.tsx</text>'
          + '<line x1="256" y1="73" x2="374" y2="73" stroke="var(--muted)" stroke-width="2" marker-end="url(#nx-arrow)"/>'
          + '<rect x="20" y="116" width="230" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="135" y="145" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">useAsyncData / useFetch</text>'
          + '<rect x="380" y="116" width="240" height="46" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="500" y="145" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">async Server Component</text>'
          + '<line x1="256" y1="139" x2="374" y2="139" stroke="var(--muted)" stroke-width="2" marker-end="url(#nx-arrow)"/>'
          + '<rect x="20" y="182" width="230" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="135" y="211" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">server/api/x.ts</text>'
          + '<rect x="380" y="182" width="240" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="500" y="211" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">route.ts / server action</text>'
          + '<line x1="256" y1="205" x2="374" y2="205" stroke="var(--muted)" stroke-width="2" marker-end="url(#nx-arrow)"/>'
          + '<rect x="20" y="248" width="230" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="135" y="277" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">nuxt.config.ts + modules</text>'
          + '<rect x="380" y="248" width="240" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="500" y="277" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">next.config.js (no modules)</text>'
          + '<line x1="256" y1="271" x2="374" y2="271" stroke="var(--muted)" stroke-width="2" marker-end="url(#nx-arrow)"/>'
          + '<text x="20" y="335" font-family="inherit" font-size="13" fill="var(--muted)">Rows 1, 3 and 4 map almost 1:1. Row 2 is the real jump:</text>'
          + '<text x="20" y="357" font-family="inherit" font-size="13" fill="var(--warn)">the component itself becomes server code.</text>'
          + '</svg>',
        caption: {
          pl: 'Większość Nuxta mapuje się na Next.js niemal 1:1. Skok jest w jednym wierszu: sam komponent staje się kodem serwerowym.',
          en: 'Most of Nuxt maps to Next.js almost 1:1. The jump is in a single row: the component itself becomes server code.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Nuxt i Next to dwie sieci restauracji z tym samym menu, ale inna kuchnia. Obie dają Ci gotową salę, kelnerów, rachunki i dostawę - nie musisz sam budować lokalu.</p><p>W restauracji Nuxt kucharz przygotowuje danie, a kelner przynosi do stolika komplet składników, żeby przy Tobie złożyć kanapkę jeszcze raz - tak na wszelki wypadek, gdybyś chciał coś przesunąć.</p><p>W nowej restauracji Next kucharz składa kanapkę do końca w kuchni i przynosi ją gotową. Do stolika trafiają tylko te elementy, które naprawdę musisz ruszać sam, na przykład solniczka.</p><p>Efekt: mniej rzeczy jedzie na wózku z kuchni, więc obsługa jest szybsza. Cena jest taka, że musisz wiedzieć, które kawałki zostają w kuchni, a które idą na stół - i tego właśnie uczy się cały ten moduł.</p>',
          en: '<p>Nuxt and Next are two restaurant chains with the same menu but different kitchens. Both hand you a finished dining room, waiters, receipts and delivery - you do not have to build the place yourself.</p><p>In the Nuxt restaurant the chef prepares the dish, and the waiter brings a full set of ingredients to your table so the sandwich can be assembled again in front of you, just in case you want to move something.</p><p>In the new Next restaurant the chef finishes the sandwich in the kitchen and brings it done. Only the pieces you genuinely need to touch yourself - the salt shaker, say - make it to your table.</p><p>The result: less stuff rides out on the trolley, so service is faster. The price is that you have to know which pieces stay in the kitchen and which go to the table - and that is exactly what this module teaches.</p>'
        },
        school: {
          pl: '<p>Nuxt i Next rozwiązują ten sam zestaw problemów: routing po plikach, SSR, prerendering, endpointy API, obrazki, metatagi, deploy. Jeśli robiłeś projekt w Nuxcie, znasz całą listę zadań - zmienia się tylko słownictwo i jedno założenie.</p><p>Nuxt:</p><pre><code>// pages/orders/[id].vue\n&lt;script setup&gt;\nconst route = useRoute();\nconst { data: order } = await useFetch("/api/orders/" + route.params.id);\n&lt;/script&gt;\n&lt;template&gt;&lt;h1&gt;{{ order.title }}&lt;/h1&gt;&lt;/template&gt;</code></pre><p>Next (App Router):</p><pre><code>// app/orders/[id]/page.tsx\nexport default async function Page({ params }) {\n  const order = await db.order.find(params.id);   // biegnie na serwerze\n  return &lt;h1&gt;{order.title}&lt;/h1&gt;;\n}</code></pre><p>Wygląda podobnie, ale różnica jest fundamentalna. W Nuxcie ten komponent wykonuje się <strong>dwa razy</strong>: raz na serwerze, potem jeszcze raz w przeglądarce podczas hydracji. Dlatego <code>useFetch</code> musi przemycić wynik przez <code>__NUXT__</code> i dlatego kod komponentu ląduje się do bundla.</p><p>W Next App Router komponent domyślnie jest <strong>Server Component</strong> i wykonuje się tylko na serwerze. Nie ma go w bundlu. Możesz w nim wołać bazę danych albo czytać sekret ze zmiennych środowiskowych, bo ten kod nigdy nie trafia do przeglądarki. Kiedy potrzebujesz interaktywności, dopisujesz <code>"use client"</code> na górze pliku i ten kawałek wraca do normalnego, znanego Ci świata Reacta.</p><p>W Nuxcie robiłeś X: pisałeś jeden komponent i ufałeś, że framework poskleja SSR z hydracją. W Nexcie robisz Y: sam decydujesz, który plik jest serwerowy, a który kliencki. Dlaczego Z: bo tylko wtedy framework może <em>nie wysłać</em> kodu do przeglądarki, a nie tylko wykonać go szybciej.</p>',
          en: '<p>Nuxt and Next solve the same set of problems: file-based routing, SSR, prerendering, API endpoints, images, meta tags, deployment. If you have shipped a Nuxt project you already know the whole checklist - only the vocabulary and one assumption change.</p><p>Nuxt:</p><pre><code>// pages/orders/[id].vue\n&lt;script setup&gt;\nconst route = useRoute();\nconst { data: order } = await useFetch("/api/orders/" + route.params.id);\n&lt;/script&gt;\n&lt;template&gt;&lt;h1&gt;{{ order.title }}&lt;/h1&gt;&lt;/template&gt;</code></pre><p>Next (App Router):</p><pre><code>// app/orders/[id]/page.tsx\nexport default async function Page({ params }) {\n  const order = await db.order.find(params.id);   // runs on the server\n  return &lt;h1&gt;{order.title}&lt;/h1&gt;;\n}</code></pre><p>They look similar, but the difference is fundamental. In Nuxt that component runs <strong>twice</strong>: once on the server, then again in the browser during hydration. That is why <code>useFetch</code> has to smuggle the result through <code>__NUXT__</code>, and why the component code ships in the bundle.</p><p>In the Next App Router a component is a <strong>Server Component</strong> by default and runs only on the server. It is not in the bundle at all. You can query a database or read a secret from environment variables inside it, because that code never reaches the browser. When you need interactivity you add <code>"use client"</code> at the top of a file and that piece returns to the normal React world you know.</p><p>In Nuxt you did X: write one component and trust the framework to stitch SSR and hydration together. In Next you do Y: you decide which file is server and which is client. Because Z: only then can the framework <em>not send</em> the code to the browser, instead of merely running it faster.</p>'
        },
        pro: {
          pl: '<p>Praktyczna mapa, która warto mieć pod ręką przy migracji:</p><table><tr><th>Nuxt 3</th><th>Next.js App Router</th></tr><tr><td>pages/ + layouts/</td><td>app/ z layout.tsx na każdym poziomie</td></tr><tr><td>useAsyncData / useFetch</td><td>await w Server Component albo fetch z cache</td></tr><tr><td>server/api/*.ts (Nitro)</td><td>app/api/*/route.ts, plus Server Actions</td></tr><tr><td>useState (SSR-safe)</td><td>useState klienta lub props z serwera</td></tr><tr><td>definePageMeta</td><td>export const metadata / generateMetadata</td></tr><tr><td>nuxt.config + moduły</td><td>next.config, brak systemu modułów</td></tr><tr><td>Nitro presets (dowolny host)</td><td>Vercel first, adaptery dla reszty</td></tr><tr><td>routeRules (ISR, swr)</td><td>revalidate, dynamic, fetch cache</td></tr></table><p>Trzy rzeczy zaskakują osoby przychodzące z Nuxta.</p><p><strong>1. Brak systemu modułów.</strong> W Nuxcie <code>@nuxtjs/i18n</code> albo <code>@pinia/nuxt</code> wpina się w build i auto-importy jedną linijką. Next nie ma odpowiednika - integracje robisz ręcznie, przez providery i konfigurację. Mniej magii, więcej boilerplate.</p><p><strong>2. Brak auto-importów.</strong> Każde <code>useState</code>, <code>Link</code>, <code>clsx</code> importujesz jawnie. Po dwóch dniach przestaje to boleć, ale pierwszego dnia boli.</p><p><strong>3. Cache jest domyślny i agresywny.</strong> <code>fetch()</code> w Next bywa cache owany na poziomie requestu i na poziomie danych; segmenty tras mają <code>revalidate</code>, a Server Actions mogą wołać <code>revalidatePath()</code>. W Nuxcie odpowiednikiem są <code>routeRules</code>, ale tam więcej jest jawne. Najczęstszy bug produkcyjny brzmi: strona pokazuje dane sprzed dwóch godzin, bo ktoś nie ustawił <code>cache: "no-store"</code>.</p><pre><code>// Next: opt-out na poziomie zapytania\nconst res = await fetch(url, { cache: "no-store" });\n// albo na poziomie segmentu trasy\nexport const revalidate = 60;   // ISR co 60 s\nexport const dynamic = "force-dynamic";</code></pre><p>Kiedy <em>nie</em> brać Nexta: gdy deployujesz na własny Kubernetes bez Vercela i nie chcesz walczyć z adapterami, gdy aplikacja jest w całości za loginem (SEO nieistotne, SSR to koszt bez zysku) albo gdy zespół ma dwóch ludzi i nie udźwignie modelu server/client. Wtedy Vite plus React Router w trybie data daje 90 procent wartości przy ułamku złożoności. TanStack Start to trzecia opcja, bardziej zbliżona filozofią do Nuxta niż do App Routera.</p>',
          en: '<p>A practical migration map worth keeping open:</p><table><tr><th>Nuxt 3</th><th>Next.js App Router</th></tr><tr><td>pages/ + layouts/</td><td>app/ with layout.tsx at every level</td></tr><tr><td>useAsyncData / useFetch</td><td>await inside a Server Component, or cached fetch</td></tr><tr><td>server/api/*.ts (Nitro)</td><td>app/api/*/route.ts, plus Server Actions</td></tr><tr><td>useState (SSR-safe)</td><td>client useState, or props from the server</td></tr><tr><td>definePageMeta</td><td>export const metadata / generateMetadata</td></tr><tr><td>nuxt.config + modules</td><td>next.config, no module system</td></tr><tr><td>Nitro presets (any host)</td><td>Vercel first, adapters for the rest</td></tr><tr><td>routeRules (ISR, swr)</td><td>revalidate, dynamic, fetch cache</td></tr></table><p>Three things surprise people arriving from Nuxt.</p><p><strong>1. No module system.</strong> In Nuxt, <code>@nuxtjs/i18n</code> or <code>@pinia/nuxt</code> hooks into the build and auto-imports with one line. Next has no equivalent - you wire integrations by hand through providers and config. Less magic, more boilerplate.</p><p><strong>2. No auto-imports.</strong> Every <code>useState</code>, <code>Link</code>, <code>clsx</code> is an explicit import. It stops hurting after two days, but day one hurts.</p><p><strong>3. Caching is on by default and aggressive.</strong> <code>fetch()</code> in Next can be cached per request and per data layer; route segments carry <code>revalidate</code>, and Server Actions can call <code>revalidatePath()</code>. Nuxt has <code>routeRules</code> for the same job, but more of it is explicit. The single most common production bug reads: the page shows data from two hours ago because nobody set <code>cache: "no-store"</code>.</p><pre><code>// Next: opt out per request\nconst res = await fetch(url, { cache: "no-store" });\n// or per route segment\nexport const revalidate = 60;   // ISR every 60 s\nexport const dynamic = "force-dynamic";</code></pre><p>When <em>not</em> to take Next: when you deploy to your own Kubernetes without Vercel and do not want to fight adapters, when the whole app sits behind a login (SEO irrelevant, SSR is cost with no upside), or when the team is two people who cannot carry the server/client model. Then Vite plus React Router in data mode gives 90 percent of the value at a fraction of the complexity. TanStack Start is a third option, philosophically closer to Nuxt than to the App Router.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co odpowiada plikowi server/api/orders.ts z Nuxta w Next.js App Router?',
            en: 'What is the App Router equivalent of Nuxt server/api/orders.ts?'
          },
          options: [
            { pl: 'app/orders/page.tsx', en: 'app/orders/page.tsx' },
            { pl: 'app/api/orders/route.ts', en: 'app/api/orders/route.ts' },
            { pl: 'next.config.js', en: 'next.config.js' },
            { pl: 'middleware.ts', en: 'middleware.ts' }
          ],
          correct: 1,
          explain: {
            pl: 'route.ts eksportuje handlery GET/POST i pełni dokładnie rolę endpointu Nitro. Dodatkowo Next ma Server Actions, które często pozwalają w ogóle nie tworzyć endpointu.',
            en: 'route.ts exports GET/POST handlers and plays exactly the Nitro endpoint role. Next also has Server Actions, which often remove the need for an endpoint at all.'
          }
        },
        {
          q: {
            pl: 'Ile razy wykonuje się domyślny komponent strony w Next App Router w porównaniu ze stroną Nuxta?',
            en: 'How many times does a default App Router page component run compared with a Nuxt page?'
          },
          options: [
            { pl: 'Tak samo: dwa razy, na serwerze i przy hydracji', en: 'The same: twice, on the server and during hydration' },
            { pl: 'Raz, tylko na serwerze - do przeglądarki nie trafia jego kod', en: 'Once, on the server only - its code never reaches the browser' },
            { pl: 'Raz, tylko w przeglądarce', en: 'Once, in the browser only' },
            { pl: 'Trzy razy, bo dochodzi prerendering', en: 'Three times, because prerendering is added' }
          ],
          correct: 1,
          explain: {
            pl: 'Server Component wykonuje się wyłącznie na serwerze i nie jest częścią bundla klienta. Dopiero plik z "use client" zachowuje się jak znany z Nuxta komponent uruchamiany po obu stronach.',
            en: 'A Server Component runs on the server only and is not part of the client bundle. Only a file marked "use client" behaves like the familiar Nuxt component that runs on both sides.'
          }
        },
        {
          q: {
            pl: 'Która rzecz z Nuxta NIE ma bezpośredniego odpowiednika w Next.js?',
            en: 'Which Nuxt feature has NO direct Next.js equivalent?'
          },
          options: [
            { pl: 'Routing po plikach', en: 'File-based routing' },
            { pl: 'System modułów rozszerzających build i auto-importy', en: 'A module system that extends the build and auto-imports' },
            { pl: 'Metatagi definiowane w kodzie strony', en: 'Meta tags defined in page code' },
            { pl: 'Endpointy API w tym samym projekcie', en: 'API endpoints in the same project' }
          ],
          correct: 1,
          explain: {
            pl: 'Next nie ma odpowiednika modułów Nuxta ani auto-importów. Integracje wpina się ręcznie przez providery i konfigurację, co jest mniej magiczne, ale bardziej gadatliwe.',
            en: 'Next has no counterpart to Nuxt modules or auto-imports. Integrations are wired manually through providers and config: less magic, more verbosity.'
          }
        },
        {
          q: {
            pl: 'Po wdrożeniu strona cenowa w Next pokazuje dane sprzed dwóch godzin, choć API zwraca świeże. Co sprawdzasz najpierw?',
            en: 'After a deploy your Next pricing page shows two-hour-old data although the API returns fresh values. What do you check first?'
          },
          options: [
            { pl: 'Czy komponent ma "use client"', en: 'Whether the component has "use client"' },
            { pl: 'Czy w bundlu nie ma duplikatu Reacta', en: 'Whether React is duplicated in the bundle' },
            { pl: 'Warstwę cache: cache fetcha oraz revalidate/dynamic na segmencie trasy', en: 'The caching layer: fetch cache plus revalidate/dynamic on the route segment' },
            { pl: 'Czy nie brakuje klucza key na liście', en: 'Whether a list is missing its key prop' }
          ],
          correct: 2,
          explain: {
            pl: 'W Next cache działa domyślnie na kilku poziomach naraz. Dane biznesowe wymagają jawnego cache: "no-store" albo krótkiego revalidate na segmencie - to najczęstsza przyczyna nieświeżych stron.',
            en: 'Next caches at several layers by default. Business data needs an explicit cache: "no-store" or a short segment revalidate - by far the most common cause of stale pages.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'server-components-rsc',
      title: { pl: 'React Server Components', en: 'React Server Components' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'RSC payload', en: 'RSC payload' },
          def: { pl: 'Strumieniowy format opisujący drzewo Reacta, w którym komponenty klienckie są jedynie referencjami do chunków. Nie jest ani HTML-em, ani JSON-em.', en: 'A streaming format describing a React tree in which client components are only references to chunks. It is neither HTML nor JSON.' }
        },
        {
          term: { pl: '"use client" jako granica', en: '"use client" as a boundary' },
          def: { pl: 'Dyrektywa nie oznacza pliku, tylko wyznacza <strong>granicę</strong>: wszystko, co ten plik importuje, staje się kodem klienckim. Wstawiona w <code>app/layout.tsx</code> kasuje RSC w całej aplikacji.', en: 'The directive does not label a file, it marks a <strong>boundary</strong>: everything that file imports becomes client code. Put it in <code>app/layout.tsx</code> and RSC is gone from the whole app.' }
        },
        {
          term: { pl: 'Serializowalne propsy', en: 'Serializable props' },
          def: { pl: 'Przez granicę serwer-klient przechodzą tylko dane dające się zserializować. Funkcje, klasy czy <code>Map</code> z kluczami obiektowymi nie przejdą - wyjątkiem są Server Actions, przekazywane jako referencja.', en: 'Only serializable data crosses the server-client boundary. Functions, classes or a <code>Map</code> with object keys do not pass - Server Actions are the exception, passed as a reference.' }
        },
        {
          term: { pl: 'Wzorzec children przez granicę', en: 'Children across the boundary' },
          def: { pl: 'Komponent kliencki nie może wyrenderować serwerowego, ale może go dostać jako <code>children</code>: <code>&lt;ClientProvider&gt;{serverTree}&lt;/ClientProvider&gt;</code>.', en: 'A client component cannot render a server one, but it can receive it as <code>children</code>: <code>&lt;ClientProvider&gt;{serverTree}&lt;/ClientProvider&gt;</code>.' }
        },
        {
          term: { pl: 'Server Action', en: 'Server Action' },
          def: { pl: 'Funkcja serwerowa oznaczona <code>"use server"</code>, wołana z klienta jak zwykła funkcja. Pod spodem to POST na wygenerowany endpoint, więc traktuj ją jak publiczne API: waliduj wejście i sprawdzaj autoryzację.', en: 'A server function marked <code>"use server"</code> and called from the client like a normal function. Under the hood it is a POST to a generated endpoint, so treat it as a public API: validate input and check authorization.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
          + '<defs><marker id="rsc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>'
          + '<rect x="20" y="50" width="250" height="230" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="145" y="76" font-family="inherit" font-size="15" fill="var(--accent2)" text-anchor="middle">Server</text>'
          + '<rect x="40" y="94" width="210" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="145" y="126" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">page.tsx (server)</text>'
          + '<rect x="40" y="162" width="210" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="145" y="194" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">db, secrets, big libs</text>'
          + '<rect x="40" y="228" width="210" height="36" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="145" y="252" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">&lt;Chart /&gt; placeholder</text>'
          + '<rect x="370" y="50" width="250" height="230" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="495" y="76" font-family="inherit" font-size="15" fill="var(--accent)" text-anchor="middle">Browser</text>'
          + '<rect x="390" y="94" width="210" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="495" y="119" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">HTML from server</text>'
          + '<text x="495" y="137" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">no JS needed</text>'
          + '<rect x="390" y="162" width="210" height="102" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="495" y="196" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">&lt;Chart /&gt; hydrated</text>'
          + '<text x="495" y="218" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">the only JS island</text>'
          + '<text x="495" y="242" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">shipped to the client</text>'
          + '<line x1="276" y1="165" x2="364" y2="165" stroke="var(--accent)" stroke-width="2" marker-end="url(#rsc-arrow)"/>'
          + '<text x="320" y="150" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">RSC</text>'
          + '<text x="320" y="188" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">payload</text>'
          + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Server components render to a payload, not to HTML strings.</text>'
          + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">Only components marked "use client" ship JavaScript.</text>'
          + '</svg>',
        caption: {
          pl: 'Komponenty serwerowe renderują się do payloadu RSC, nie do stringa HTML. Do przeglądarki jedzie tylko JavaScript wysp oznaczonych "use client".',
          en: 'Server components render into an RSC payload, not an HTML string. Only islands marked "use client" ship JavaScript to the browser.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Przejdź przez pełną ścieżkę jednego żądania: od kliknięcia w link, przez render na serwerze, po interakcję, która nie rusza serwera.',
          en: 'Step through the full path of one request: from the link click, through the server render, to an interaction that never touches the server.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<defs><marker id="rf1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>'
              + '<rect x="20" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="86" font-family="inherit" font-size="15" fill="var(--muted)" text-anchor="middle">Server</text>'
              + '<rect x="40" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">page.tsx (server)</text>'
              + '<rect x="40" y="168" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="198" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">db.orders.find()</text>'
              + '<rect x="370" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="495" y="86" font-family="inherit" font-size="15" fill="var(--accent)" text-anchor="middle">Browser</text>'
              + '<rect x="390" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="495" y="134" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">click on /orders</text>'
              + '<line x1="364" y1="200" x2="276" y2="200" stroke="var(--accent)" stroke-width="2" marker-end="url(#rf1-a)"/>'
              + '<text x="320" y="188" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">GET</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Step 1 of 5: the request leaves the browser. Zero application</text>'
              + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">JavaScript has been downloaded yet.</text>'
              + '</svg>',
            label: { pl: 'Zadanie wychodzi', en: 'Request goes out' },
            note: {
              pl: 'Przeglądarka prosi o /orders. Na tym etapie nie ściągnęła jeszcze ani jednego kilobajta kodu aplikacji.',
              en: 'The browser asks for /orders. At this point it has not downloaded a single kilobyte of application code.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<rect x="20" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>'
              + '<text x="145" y="86" font-family="inherit" font-size="15" fill="var(--accent2)" text-anchor="middle">Server</text>'
              + '<rect x="40" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
              + '<text x="145" y="134" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">page.tsx runs</text>'
              + '<rect x="40" y="168" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="145" y="198" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">db.orders.find() ok</text>'
              + '<rect x="370" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="495" y="86" font-family="inherit" font-size="15" fill="var(--muted)" text-anchor="middle">Browser</text>'
              + '<rect x="390" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="495" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">waiting</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Step 2 of 5: the component awaits the database directly.</text>'
              + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">No /api endpoint, no fetch, no serialization in between.</text>'
              + '</svg>',
            label: { pl: 'Serwer renderuje', en: 'Server renders' },
            note: {
              pl: 'Komponent robi await na bazie bezpośrednio. Nie ma warstwy /api pośrodku, bo ten kod i tak nigdy nie opuści serwera.',
              en: 'The component awaits the database directly. There is no /api layer in between, because this code never leaves the server anyway.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<defs><marker id="rf3-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>'
              + '<rect x="20" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>'
              + '<text x="145" y="86" font-family="inherit" font-size="15" fill="var(--accent2)" text-anchor="middle">Server</text>'
              + '<rect x="40" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="134" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">page.tsx done</text>'
              + '<rect x="40" y="168" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="145" y="198" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">&lt;Chart /&gt; = a slot</text>'
              + '<rect x="370" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="495" y="86" font-family="inherit" font-size="15" fill="var(--muted)" text-anchor="middle">Browser</text>'
              + '<rect x="390" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="495" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">receiving stream</text>'
              + '<line x1="276" y1="200" x2="364" y2="200" stroke="var(--accent)" stroke-width="2" marker-end="url(#rf3-a)"/>'
              + '<text x="320" y="188" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">payload</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Step 3 of 5: HTML plus an RSC payload stream out. Client</text>'
              + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">components appear in it as references, not as code.</text>'
              + '</svg>',
            label: { pl: 'Payload leci do klienta', en: 'Payload streams down' },
            note: {
              pl: 'Payload RSC to opis drzewa, nie HTML i nie JSON. Komponenty klienckie są w nim tylko referencjami do chunków, które przeglądarka dociągnie osobno.',
              en: 'The RSC payload is a tree description, neither HTML nor JSON. Client components appear only as references to chunks the browser fetches separately.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<rect x="20" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="86" font-family="inherit" font-size="15" fill="var(--muted)" text-anchor="middle">Server</text>'
              + '<rect x="40" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">idle</text>'
              + '<rect x="370" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="495" y="86" font-family="inherit" font-size="15" fill="var(--accent)" text-anchor="middle">Browser</text>'
              + '<rect x="390" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="495" y="134" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">table visible</text>'
              + '<rect x="390" y="168" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="495" y="198" font-family="inherit" font-size="13" fill="var(--accent)" text-anchor="middle">&lt;Chart /&gt; hydrated</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Step 4 of 5: the table was readable before any JS ran.</text>'
              + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">Only the chart island downloads and hydrates.</text>'
              + '</svg>',
            label: { pl: 'Hydruje się tylko wyspa', en: 'Only the island hydrates' },
            note: {
              pl: 'Tabela była czytelna zanim wykonał się jakikolwiek JavaScript. Hydracja dotyczy wyłącznie komponentu z "use client".',
              en: 'The table was readable before any JavaScript ran. Hydration touches only the component marked "use client".'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<rect x="20" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>'
              + '<text x="145" y="86" font-family="inherit" font-size="15" fill="var(--muted)" text-anchor="middle">Server</text>'
              + '<rect x="40" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="145" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">not called again</text>'
              + '<rect x="370" y="60" width="250" height="220" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="495" y="86" font-family="inherit" font-size="15" fill="var(--accent)" text-anchor="middle">Browser</text>'
              + '<rect x="390" y="104" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="495" y="134" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">table unchanged</text>'
              + '<rect x="390" y="168" width="210" height="50" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="495" y="198" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">setZoom(2) re-render</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Step 5 of 5: zooming the chart is pure client state. The</text>'
              + '<text x="20" y="352" font-family="inherit" font-size="13" fill="var(--muted)">server tree is frozen until a router navigation or revalidation.</text>'
              + '</svg>',
            label: { pl: 'Interakcja bez serwera', en: 'Interaction without the server' },
            note: {
              pl: 'Zmiana zoomu to zwykły stan klienta. Drzewo serwerowe jest zamrożone do czasu nawigacji albo jawnej rewalidacji - to najważniejsza różnica wobec hydracji Nuxta.',
              en: 'Changing the zoom is plain client state. The server tree stays frozen until a navigation or an explicit revalidation - the key difference from Nuxt hydration.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że zamawiasz mebel. Są dwa sklepy.</p><p>Pierwszy sklep przysyła Ci karton z deskami, śrubkami, kluczem imbusowym i instrukcją. Składasz szafkę sam w salonie. Działa, ale zajmuje czas i przez chwilę masz bałagan.</p><p>Drugi sklep składa szafkę u siebie w warsztacie i przywozi gotową. Do domu wjeżdża sam mebel, bez skrzynki z narzędziami. Tylko szuflada, którą chcesz otwierać i zamykać, przyjeżdża z prowadnicami - bo to jedyna część, która naprawdę musi się ruszać.</p><p>Komponenty serwerowe to ten drugi sklep. Większość strony jest składana na serwerze i przyjeżdża gotowa. Do przeglądarki jedzie tylko tyle narzędzi, ile potrzeba na te elementy, które klikasz. Mniej pudeł na wózku znaczy szybszą dostawę i mniej roboty przy rozpakowywaniu.</p>',
          en: '<p>Imagine ordering furniture. There are two shops.</p><p>The first shop sends you a box of planks, screws, an Allen key and instructions. You assemble the cabinet yourself in the living room. It works, but it takes time and the place is a mess for a while.</p><p>The second shop assembles the cabinet in its own workshop and delivers it finished. Only the furniture arrives, no toolbox. The one drawer you want to open and close arrives with runners fitted - because that is the only part that genuinely has to move.</p><p>Server components are the second shop. Most of the page is assembled on the server and arrives finished. The browser gets only as many tools as the parts you actually click require. Fewer boxes on the trolley means faster delivery and less unpacking.</p>'
        },
        school: {
          pl: '<p>W Vue każdy komponent jest z definicji kliencki. SSR w Nuxcie renderuje go raz na serwerze do stringa HTML, a potem przeglądarka <em>musi</em> pobrać ten sam komponent i wykonać go ponownie, żeby podpiąć listenery. Nazywasz to hydracją. Konsekwencja: kod każdego komponentu jest w bundlu, nawet jeśli komponent to statyczna tabelka.</p><p>React Server Components zmieniają to założenie. Domyślnie komponent w katalogu <code>app/</code> jest serwerowy: wykonuje się raz, na serwerze, i <strong>nie trafia do bundla</strong>.</p><p>Nuxt:</p><pre><code>&lt;script setup&gt;\nconst { data } = await useFetch("/api/orders");\n&lt;/script&gt;\n&lt;template&gt;&lt;OrdersTable :rows="data" /&gt;&lt;/template&gt;\n// cały ten komponent ląduje się też w przeglądarce</code></pre><p>React (RSC):</p><pre><code>// app/orders/page.tsx  - brak "use client"\nimport { db } from "@/lib/db";\n\nexport default async function Page() {\n  const rows = await db.order.findMany();   // tylko serwer\n  return &lt;OrdersTable rows={rows} /&gt;;\n}</code></pre><p>Zwróć uwagę na dwie rzeczy. Po pierwsze, funkcja komponentu jest <code>async</code> i robi <code>await</code> wprost na bazie - nie ma warstwy <code>/api</code>, bo nikt z zewnątrz tego kodu nie zobaczy. Po drugie, jeśli <code>OrdersTable</code> też nie ma <code>"use client"</code>, to żadna z tych rzeczy nie pojawi się w bundlu.</p><p>Interaktywność odzyskujesz jedną dyrektywą:</p><pre><code>"use client";\nexport function Chart({ rows }) {\n  const [zoom, setZoom] = useState(1);   // stan, efekty, onClick\n  return &lt;div onClick={() =&gt; setZoom(zoom + 1)}&gt;...&lt;/div&gt;;\n}</code></pre><p>W Vue robiłeś X: pisałeś jeden rodzaj komponentu i godziłeś się, że wszystko jedzie do klienta. W React robisz Y: dzielisz drzewo na serwerową skórę i klienckie wyspy. Dlaczego Z: bo pytanie "czy ten kod musi być w przeglądarce" ma dla większości ekranów odpowiedź "nie", a to bezpośrednio przekłada się na rozmiar bundla.</p>',
          en: '<p>In Vue every component is a client component by definition. Nuxt SSR renders it once on the server into an HTML string, and then the browser <em>must</em> download that same component and run it again to attach listeners. You call that hydration. The consequence: every component ships in the bundle, even a static table.</p><p>React Server Components change the assumption. By default a component in <code>app/</code> is a server component: it runs once, on the server, and <strong>never enters the bundle</strong>.</p><p>Nuxt:</p><pre><code>&lt;script setup&gt;\nconst { data } = await useFetch("/api/orders");\n&lt;/script&gt;\n&lt;template&gt;&lt;OrdersTable :rows="data" /&gt;&lt;/template&gt;\n// this whole component also loads in the browser</code></pre><p>React (RSC):</p><pre><code>// app/orders/page.tsx  - no "use client"\nimport { db } from "@/lib/db";\n\nexport default async function Page() {\n  const rows = await db.order.findMany();   // server only\n  return &lt;OrdersTable rows={rows} /&gt;;\n}</code></pre><p>Notice two things. First, the component function is <code>async</code> and awaits the database directly - there is no <code>/api</code> layer, because nobody outside will ever see this code. Second, if <code>OrdersTable</code> also lacks <code>"use client"</code>, none of it appears in the bundle.</p><p>You get interactivity back with one directive:</p><pre><code>"use client";\nexport function Chart({ rows }) {\n  const [zoom, setZoom] = useState(1);   // state, effects, onClick\n  return &lt;div onClick={() =&gt; setZoom(zoom + 1)}&gt;...&lt;/div&gt;;\n}</code></pre><p>In Vue you did X: write one kind of component and accept that everything ships to the client. In React you do Y: split the tree into a server skin and client islands. Because Z: for most screens the question "does this code need to be in the browser" answers itself with "no", and that translates straight into bundle size.</p>'
        },
        pro: {
          pl: '<p>Payload RSC nie jest ani HTML-em, ani JSON-em. To strumieniowy format opisujący drzewo Reacta, w którym komponenty klienckie występują jako referencje do chunków (<code>$L1</code>, <code>"chunk-abc.js#Chart"</code>). Klient dostaje więc kompletne drzewo bez kodu, który je wyprodukował. To też odpowiedź na pytanie z rozmowy rekrutacyjnej "czym RSC różni się od SSR": SSR produkuje HTML i nadal wysyła cały bundle, RSC eliminuje bundle dla części drzewa.</p><p>Zasady, które trzeba znać na pamięć:</p><ul><li><code>"use client"</code> to <strong>granica</strong>, nie etykieta pliku. Wszystko, co ten plik importuje, staje się klienckie. Jeden nieostrożny import w liście w layoucie potrafi wciągnąć pół aplikacji do bundla.</li><li>Server Component może renderować Client Component. Odwrotnie - nie, chyba że przekażesz go jako <code>children</code>. To standardowy wzorzec: <code>&lt;ClientProvider&gt;{serverTree}&lt;/ClientProvider&gt;</code>.</li><li>Propsy przez granicę muszą być serializowalne. Funkcje, klasy, instancje <code>Date</code> w polach niestandardowych, <code>Map</code> z kluczami obiektowymi - nie przejdą. Wyjątkiem są Server Actions, które serializują się jako referencja.</li><li>Server Components nie mają stanu ani efektów. Nie ma <code>useState</code>, <code>useEffect</code>, <code>window</code>. Są jednorazowe.</li></ul><p>Odpowiednik z Vue istnieje, ale jest ostrożniejszy: Nuxt Server Components (<code>Foo.server.vue</code>) i wyspy renderują się na serwerze i też nie idą do bundla. Różnica jest w skali - w Nuxcie to opt-in dla wybranych komponentów, w App Routerze to domyślny tryb całego drzewa.</p><p>Mutacje domykają model. Server Action to funkcja serwerowa wywoływana z klienta jak zwykła funkcja:</p><pre><code>// actions.ts\n"use server";\nexport async function rename(id: string, title: string) {\n  await db.order.update({ where: { id }, data: { title } });\n  revalidatePath("/orders");\n}</code></pre><p>Pod spodem to POST do wygenerowanego endpointu z referencją do akcji. Dlatego traktuj to jak publiczne API: waliduj wejście (zod) i sprawdzaj autoryzację w środku akcji, bo argumenty przychodzą od klienta.</p><p>Realne liczby: przepisanie ciężkiego dashboardu na RSC typowo ścina bundle klienta o 30-60 procent, bo formatowanie dat, markdown, wykresy statyczne i warstwa danych zostają na serwerze. Koszt: dłuższy TTFB, trudniejsze debugowanie (stack trace po dwóch stronach), i konieczna dyscyplina przy granicy. Najczęstszy błąd zespołów migrujących z Nuxta to postawienie <code>"use client"</code> w <code>app/layout.tsx</code> - wtedy cały RSC znika, a zostaje zwykły SSR z gorszym DX.</p>',
          en: '<p>The RSC payload is neither HTML nor JSON. It is a streaming format describing a React tree in which client components appear as references to chunks (<code>$L1</code>, <code>"chunk-abc.js#Chart"</code>). The client therefore receives a complete tree without the code that produced it. That is also the interview answer to "how is RSC different from SSR": SSR produces HTML and still ships the whole bundle; RSC removes the bundle for part of the tree.</p><p>Rules worth knowing by heart:</p><ul><li><code>"use client"</code> is a <strong>boundary</strong>, not a file label. Everything that file imports becomes client code. One careless import in a leaf inside a layout can drag half the app into the bundle.</li><li>A Server Component can render a Client Component. Not the other way round - unless you pass it as <code>children</code>. That is the standard pattern: <code>&lt;ClientProvider&gt;{serverTree}&lt;/ClientProvider&gt;</code>.</li><li>Props crossing the boundary must be serializable. Functions, classes, <code>Date</code> inside exotic fields, a <code>Map</code> with object keys - none of them pass. Server Actions are the exception; they serialize as a reference.</li><li>Server Components have no state and no effects. No <code>useState</code>, no <code>useEffect</code>, no <code>window</code>. They run exactly once.</li></ul><p>Vue has an equivalent, but a more cautious one: Nuxt Server Components (<code>Foo.server.vue</code>) and islands render on the server and also stay out of the bundle. The difference is scale - in Nuxt it is opt-in per component, in the App Router it is the default mode of the whole tree.</p><p>Mutations close the model. A Server Action is a server function you call from the client like an ordinary function:</p><pre><code>// actions.ts\n"use server";\nexport async function rename(id: string, title: string) {\n  await db.order.update({ where: { id }, data: { title } });\n  revalidatePath("/orders");\n}</code></pre><p>Under the hood it is a POST to a generated endpoint carrying an action reference. Treat it as a public API: validate the input (zod) and check authorization inside the action, because the arguments come from the client.</p><p>Real numbers: rewriting a heavy dashboard onto RSC typically cuts the client bundle by 30-60 percent, because date formatting, markdown, static charts and the data layer all stay on the server. The cost: higher TTFB, harder debugging (stack traces on two sides), and discipline at the boundary. The most common mistake teams migrating from Nuxt make is putting <code>"use client"</code> in <code>app/layout.tsx</code> - that erases RSC entirely and leaves plain SSR with worse DX.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym różni się Server Component od zwykłego SSR znanego z Nuxta?',
            en: 'How does a Server Component differ from the plain SSR you know from Nuxt?'
          },
          options: [
            { pl: 'Niczym, to tylko inna nazwa tego samego', en: 'Not at all, it is just another name for the same thing' },
            { pl: 'Renderuje się na serwerze i jego kod nie trafia do bundla klienta', en: 'It renders on the server and its code never enters the client bundle' },
            { pl: 'Renderuje się w web workerze', en: 'It renders in a web worker' },
            { pl: 'Działa tylko przy generowaniu statycznym', en: 'It only works during static generation' }
          ],
          correct: 1,
          explain: {
            pl: 'SSR renderuje HTML, ale i tak wysyła komponent do przeglądarki, bo musi go zhydrować. RSC eliminuje ten kod z bundla, bo komponent nigdy nie jest hydrowany.',
            en: 'SSR renders HTML but still ships the component to the browser because it must hydrate it. RSC removes that code from the bundle because the component is never hydrated.'
          }
        },
        {
          q: {
            pl: 'Czego NIE możesz użyć wewnątrz Server Component?',
            en: 'What can you NOT use inside a Server Component?'
          },
          options: [
            { pl: 'await na zapytaniu do bazy danych', en: 'await on a database query' },
            { pl: 'Zmiennych środowiskowych z sekretami', en: 'Environment variables holding secrets' },
            { pl: 'useState i onClick', en: 'useState and onClick' },
            { pl: 'Renderowania komponentu klienckiego', en: 'Rendering a client component' }
          ],
          correct: 2,
          explain: {
            pl: 'Server Component wykonuje się raz i nie ma cyklu życia po stronie klienta, więc stan i handlery zdarzeń są niedostępne. Do tego służy wyspa z "use client".',
            en: 'A Server Component runs once and has no client-side lifecycle, so state and event handlers are unavailable. That is what a "use client" island is for.'
          }
        },
        {
          q: {
            pl: 'Dodajesz "use client" na górze app/layout.tsx, żeby użyć w nim ThemeProvidera. Co się stanie?',
            en: 'You add "use client" at the top of app/layout.tsx so you can use a ThemeProvider there. What happens?'
          },
          options: [
            { pl: 'Nic, dyrektywa dotyczy tylko tego jednego pliku', en: 'Nothing, the directive affects only that one file' },
            { pl: 'Całe drzewo poniżej staje się klienckie i tracisz korzyści RSC', en: 'The whole tree below becomes client code and you lose the RSC benefits' },
            { pl: 'Next zgłosi błąd kompilacji i nie zbuduje aplikacji', en: 'Next throws a compile error and refuses to build' },
            { pl: 'Layout zacznie się renderować dwa razy na serwerze', en: 'The layout starts rendering twice on the server' }
          ],
          correct: 1,
          explain: {
            pl: 'To granica, nie etykieta pliku. Poprawny wzorzec: layout zostaje serwerowy, a klienckiego providera owijasz wokół {children}, które nadal są drzewem serwerowym.',
            en: 'It is a boundary, not a file label. The correct pattern: keep the layout on the server and wrap the client provider around {children}, which stays a server tree.'
          }
        },
        {
          q: {
            pl: 'Server Action przyjmuje orderId i nowy status. Co MUSISZ zrobić w środku akcji?',
            en: 'A Server Action takes an orderId and a new status. What MUST you do inside the action?'
          },
          options: [
            { pl: 'Owinąć wszystko w useEffect', en: 'Wrap everything in a useEffect' },
            { pl: 'Nic, Next sam sprawdza uprawnienia wywołującego', en: 'Nothing, Next checks the caller permissions for you' },
            { pl: 'Zwrócić odpowiedź jako JSON.stringify', en: 'Return the response through JSON.stringify' },
            { pl: 'Zwalidować argumenty i sprawdzić autoryzację, bo akcja jest publicznym endpointem', en: 'Validate the arguments and check authorization, because the action is a public endpoint' }
          ],
          correct: 3,
          explain: {
            pl: 'Server Action kompiluje się do wywoływalnego endpointu POST. Każdy może go wywołać z dowolnymi argumentami, więc walidacja (np. zod) i kontrola dostępu muszą być w środku.',
            en: 'A Server Action compiles into a callable POST endpoint. Anyone can invoke it with arbitrary arguments, so validation (zod, for example) and access control must live inside it.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'data-fetching-patterns-next',
      title: { pl: 'Wzorce pobierania danych w Next', en: 'Data fetching patterns in Next' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Deduplikacja w renderze', en: 'Per-render deduplication' },
          def: { pl: 'Ten sam <code>fetch()</code> w jednym przebiegu renderowania wykona się raz; funkcje spoza fetch owijasz w <code>cache()</code>. Dzięki temu wołasz <code>getCurrentUser()</code> w layoucie i na stronie zamiast przekazywać propsy.', en: 'The same <code>fetch()</code> in one render pass runs once; non-fetch functions get wrapped in <code>cache()</code>. That lets you call <code>getCurrentUser()</code> in the layout and the page instead of drilling props.' }
        },
        {
          term: { pl: 'Data Cache i revalidateTag', en: 'Data Cache and revalidateTag' },
          def: { pl: 'Trwały cache między żądaniami, sterowany przez <code>revalidate</code> i tagi. <code>revalidateTag("orders")</code> unieważnia wszystkie wpisy z danym tagiem.', en: 'A persistent cache across requests, driven by <code>revalidate</code> and tags. <code>revalidateTag("orders")</code> invalidates every entry carrying that tag.' }
        },
        {
          term: { pl: 'Full Route Cache', en: 'Full Route Cache' },
          def: { pl: 'Prerenderowany HTML wraz z RSC payloadem dla tras statycznych. Jedno wywołanie <code>cookies()</code> przełącza segment w tryb dynamiczny i cache znika.', en: 'Prerendered HTML plus the RSC payload for static routes. A single <code>cookies()</code> call flips the segment to dynamic and the cache is gone.' }
        },
        {
          term: { pl: 'Wzorzec preload', en: 'The preload pattern' },
          def: { pl: 'Wystartowanie zapytania bez <code>await</code> na początku komponentu rodzica, żeby dane dziecka ładowały się równolegle. Rozwiązuje kaskadę, której <code>Promise.all</code> nie sięga.', en: 'Kicking off a query without <code>await</code> at the top of the parent so the child data loads in parallel. It solves the waterfall <code>Promise.all</code> cannot reach.' }
        },
        {
          term: { pl: 'Kaskada zapytań (waterfall)', en: 'Request waterfall' },
          def: { pl: 'Sekwencyjne pobieranie danych, gdzie każdy krok czeka na poprzedni. Najczęstsze źródło: <code>useEffect</code> plus <code>fetch</code> w komponencie klienckim tam, gdzie wystarczyło serwerowe <code>await</code>.', en: 'Sequential fetching where each step waits for the previous one. The most common source: <code>useEffect</code> plus <code>fetch</code> in a client component where a server <code>await</code> would do.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
          + '<text x="20" y="30" font-family="inherit" font-size="15" fill="var(--err)">Waterfall: await one after another</text>'
          + '<rect x="20" y="46" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="110" y="66" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">user 200ms</text>'
          + '<rect x="204" y="86" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="294" y="106" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">orders 200ms</text>'
          + '<rect x="388" y="126" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="478" y="146" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">stats 200ms</text>'
          + '<text x="20" y="182" font-family="inherit" font-size="13" fill="var(--err)">total 600 ms before anything renders</text>'
          + '<line x1="20" y1="200" x2="620" y2="200" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="20" y="232" font-family="inherit" font-size="15" fill="var(--ok)">Parallel: start all, await once</text>'
          + '<rect x="20" y="248" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="110" y="268" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">user 200ms</text>'
          + '<rect x="20" y="286" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="110" y="306" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">orders 200ms</text>'
          + '<rect x="20" y="324" width="180" height="30" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="110" y="344" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">stats 200ms</text>'
          + '<line x1="210" y1="248" x2="210" y2="354" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="228" y="304" font-family="inherit" font-size="13" fill="var(--ok)">total 200 ms</text>'
          + '<text x="228" y="326" font-family="inherit" font-size="13" fill="var(--muted)">same three queries</text>'
          + '</svg>',
        caption: {
          pl: 'Trzy te same zapytania. Sekwencyjne await dają 600 ms, równoległy start i jedno await - 200 ms.',
          en: 'The same three queries. Sequential awaits cost 600 ms; starting them together and awaiting once costs 200 ms.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Ta sama strona w czterech wariantach pobierania danych. Patrz na moment, w którym użytkownik pierwszy raz coś widzi.',
          en: 'The same page in four data-fetching variants. Watch the moment the user first sees anything.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<text x="20" y="34" font-family="inherit" font-size="15" fill="var(--err)">1. Sequential awaits</text>'
              + '<rect x="20" y="56" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="90" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">user</text>'
              + '<rect x="170" y="106" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="240" y="129" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">orders</text>'
              + '<rect x="320" y="156" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="390" y="179" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">stats</text>'
              + '<line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="20" y="232" font-family="inherit" font-size="13" fill="var(--muted)">time</text>'
              + '<line x1="470" y1="220" x2="470" y2="260" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="470" y="282" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">first paint 600 ms</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Each await starts only after the previous one resolved.</text>'
              + '</svg>',
            label: { pl: 'Kaskada', en: 'Waterfall' },
            note: {
              pl: 'Trzy await pod sobą. Każde zapytanie startuje dopiero po poprzednim, więc czasy się sumują: 600 ms do pierwszego pixela.',
              en: 'Three awaits in a row. Each request starts only after the previous resolved, so the times add up: 600 ms to first paint.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<text x="20" y="34" font-family="inherit" font-size="15" fill="var(--ok)">2. Promise.all</text>'
              + '<rect x="20" y="56" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="90" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">user</text>'
              + '<rect x="20" y="106" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="90" y="129" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">orders</text>'
              + '<rect x="20" y="156" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="90" y="179" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">stats</text>'
              + '<line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="20" y="232" font-family="inherit" font-size="13" fill="var(--muted)">time</text>'
              + '<line x1="170" y1="220" x2="170" y2="260" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="200" y="282" font-family="inherit" font-size="13" fill="var(--ok)">first paint 200 ms</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">All three start together; you wait for the slowest one.</text>'
              + '</svg>',
            label: { pl: 'Równolegle', en: 'Parallel' },
            note: {
              pl: 'Startujesz wszystkie trzy naraz i robisz jedno await na Promise.all. Czekasz tyle, ile trwa najwolniejsze zapytanie.',
              en: 'You start all three at once and await Promise.all once. You wait as long as the slowest query, not the sum.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<text x="20" y="34" font-family="inherit" font-size="15" fill="var(--accent)">3. Suspense streaming</text>'
              + '<rect x="20" y="56" width="60" height="34" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="50" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">shell</text>'
              + '<rect x="20" y="106" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="90" y="129" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">orders</text>'
              + '<rect x="20" y="156" width="300" height="34" rx="6" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
              + '<text x="170" y="179" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">slow stats report</text>'
              + '<line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="20" y="232" font-family="inherit" font-size="13" fill="var(--muted)">time</text>'
              + '<line x1="90" y1="220" x2="90" y2="260" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="120" y="282" font-family="inherit" font-size="13" fill="var(--accent)">first paint 40 ms</text>'
              + '<line x1="330" y1="220" x2="330" y2="260" stroke="var(--warn)" stroke-width="2"/>'
              + '<text x="348" y="282" font-family="inherit" font-size="13" fill="var(--warn)">stats fill in later</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">The shell ships instantly; slow parts stream into their slots.</text>'
              + '</svg>',
            label: { pl: 'Strumieniowanie', en: 'Streaming' },
            note: {
              pl: 'Wolny fragment owijasz w Suspense z fallbackiem. Szkielet strony jedzie natychmiast, a raport dokłada się do gotowej dziury w layoucie.',
              en: 'Wrap the slow part in Suspense with a fallback. The page shell ships instantly and the report streams into its reserved hole in the layout.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">'
              + '<text x="20" y="34" font-family="inherit" font-size="15" fill="var(--accent2)">4. Request dedupe + cache</text>'
              + '<rect x="20" y="56" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
              + '<text x="90" y="79" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Header: user</text>'
              + '<rect x="20" y="106" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>'
              + '<text x="90" y="129" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">Sidebar: user</text>'
              + '<rect x="20" y="156" width="140" height="34" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>'
              + '<text x="90" y="179" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">Page: user</text>'
              + '<text x="190" y="129" font-family="inherit" font-size="13" fill="var(--accent2)">same URL in one request</text>'
              + '<text x="190" y="151" font-family="inherit" font-size="13" fill="var(--accent2)">= one network call</text>'
              + '<line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="20" y="232" font-family="inherit" font-size="13" fill="var(--muted)">time</text>'
              + '<line x1="170" y1="220" x2="170" y2="260" stroke="var(--accent2)" stroke-width="2"/>'
              + '<text x="200" y="282" font-family="inherit" font-size="13" fill="var(--accent2)">first paint 200 ms</text>'
              + '<text x="20" y="330" font-family="inherit" font-size="13" fill="var(--muted)">Three components ask for the user; the framework fetches once.</text>'
              + '</svg>',
            label: { pl: 'Deduplikacja', en: 'Deduplication' },
            note: {
              pl: 'Trzy komponenty pytają o tego samego użytkownika. W obrębie jednego renderu Next scala te wywołania w jedno - dlatego nie musisz przekazywać danych propsami przez pół drzewa.',
              en: 'Three components ask for the same user. Within one render Next collapses those calls into one - which is why you do not need to thread the data through half the tree as props.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wysyłasz trzy osoby po zakupy: jedna po chleb, druga po mleko, trzecia po ser. Każdy sklep jest o pięć minut drogi.</p><p>Wersja pierwsza: wysyłasz jedną osobę, czekasz aż wróci, dopiero potem wysyłasz drugą. Piętnaście minut i przez cały ten czas stoisz przy drzwiach.</p><p>Wersja druga: wysyłasz wszystkich naraz. Pięć minut i są wszyscy.</p><p>Wersja trzecia jest najsprytniejsza. Nakrywasz do stołu od razu, nie czekając na nikogo. Talerze, sztućce, serwetki już są. Kiedy ktoś wraca z serem, po prostu odkładasz ser na wolne miejsce. Goście cały czas widzą, że coś się dzieje, zamiast gapić się na pusty pokój.</p><p>I jeszcze jedno: jeśli trzy osoby chcą iść po to samo mleko, wystarczy wysłać jedną. Tym zajmuje się framework, sam z siebie.</p>',
          en: '<p>You send three people shopping: one for bread, one for milk, one for cheese. Every shop is five minutes away.</p><p>Version one: you send one person, wait for them to come back, and only then send the next. Fifteen minutes, and you stand by the door the whole time.</p><p>Version two: you send all three at once. Five minutes and everyone is back.</p><p>Version three is the clever one. You set the table immediately, without waiting for anybody. Plates, cutlery, napkins are already there. When someone returns with the cheese you simply put it in the empty spot. Your guests see something happening the whole time instead of staring at an empty room.</p><p>One more thing: if three people want to fetch the same milk, sending one is enough. The framework handles that part by itself.</p>'
        },
        school: {
          pl: '<p>W Nuxcie masz jedno narzędzie na wszystko: <code>useAsyncData</code> / <code>useFetch</code> z kluczem, który służy do cache i deduplikacji. W Next App Router narzędzia są trzy i wybierasz świadomie: <code>await</code> w Server Component, <code>&lt;Suspense&gt;</code> do strumieniowania i TanStack Query po stronie klienta dla danych, które zmieniają się w trakcie sesji.</p><p>Najczęstszy błąd migracji wygląda tak:</p><pre><code>// źle: kaskada, 600 ms\nconst user   = await getUser();\nconst orders = await getOrders();\nconst stats  = await getStats();</code></pre><p>Poprawka jest banalna, ale trzeba o niej pamiętać, bo <code>await</code> wygląda niewinnie:</p><pre><code>// dobrze: równolegle, 200 ms\nconst [user, orders, stats] = await Promise.all([\n  getUser(), getOrders(), getStats()\n]);</code></pre><p>Nuxt dla porównania robi to tak - i tu też trzeba uważać, żeby nie ustawić sekwencji:</p><pre><code>const [{ data: user }, { data: orders }] = await Promise.all([\n  useAsyncData("user", fetchUser),\n  useAsyncData("orders", fetchOrders)\n]);</code></pre><p>Trzeci wzorzec nie ma dobrego odpowiednika w Nuxcie. Jeśli jeden fragment jest wolny, nie musi blokować całej strony:</p><pre><code>&lt;Suspense fallback={&lt;StatsSkeleton /&gt;}&gt;\n  &lt;SlowStats /&gt;   {/* własny await w środku */}\n&lt;/Suspense&gt;</code></pre><p>Serwer wysyła szkielet strony natychmiast, a gdy <code>SlowStats</code> się doliczy, dokłada jego HTML do już wyświetlonej strony. Użytkownik widzi treść po 40 ms zamiast po 3 sekundach.</p><p>W Nuxcie robiłeś X: jedno <code>useFetch</code> z kluczem i <code>pending</code>. W Next robisz Y: decydujesz, co jest krytyczne dla pierwszego renderu, a co może dopłynąć później. Dlaczego Z: bo w RSC czekanie odbywa się na serwerze i blokuje odpowiedź, więc granica Suspense jest jedynym sposobem, żeby użytkownik zobaczył cokolwiek wcześniej.</p>',
          en: '<p>In Nuxt you have one tool for everything: <code>useAsyncData</code> / <code>useFetch</code> with a key that drives caching and deduplication. In the Next App Router there are three tools and you pick deliberately: <code>await</code> inside a Server Component, <code>&lt;Suspense&gt;</code> for streaming, and TanStack Query on the client for data that changes during the session.</p><p>The most common migration mistake looks like this:</p><pre><code>// bad: waterfall, 600 ms\nconst user   = await getUser();\nconst orders = await getOrders();\nconst stats  = await getStats();</code></pre><p>The fix is trivial but easy to forget, because <code>await</code> looks so innocent:</p><pre><code>// good: parallel, 200 ms\nconst [user, orders, stats] = await Promise.all([\n  getUser(), getOrders(), getStats()\n]);</code></pre><p>Nuxt does the same thing this way - and the same trap applies:</p><pre><code>const [{ data: user }, { data: orders }] = await Promise.all([\n  useAsyncData("user", fetchUser),\n  useAsyncData("orders", fetchOrders)\n]);</code></pre><p>The third pattern has no good Nuxt equivalent. If one fragment is slow, it does not have to block the whole page:</p><pre><code>&lt;Suspense fallback={&lt;StatsSkeleton /&gt;}&gt;\n  &lt;SlowStats /&gt;   {/* its own await inside */}\n&lt;/Suspense&gt;</code></pre><p>The server sends the page shell immediately and, once <code>SlowStats</code> resolves, appends its HTML to the page already on screen. The user sees content after 40 ms instead of 3 seconds.</p><p>In Nuxt you did X: one <code>useFetch</code> with a key and a <code>pending</code> flag. In Next you do Y: you decide what is critical for the first render and what may arrive later. Because Z: in RSC the waiting happens on the server and blocks the response, so a Suspense boundary is the only way for the user to see anything sooner.</p>'
        },
        pro: {
          pl: '<p>Cztery warstwy, które trzeba rozróżnić, bo każda ma inny czas życia:</p><ul><li><strong>Deduplikacja w obrębie jednego renderu.</strong> <code>fetch()</code> z tym samym URL i nagłówkami w jednym przebiegu renderowania jest wywoływany raz. Dla funkcji spoza fetch używasz <code>cache()</code> z Reacta. To odpowiednik klucza w <code>useAsyncData</code>, tylko automatyczny. Praktyczny skutek: <code>getCurrentUser()</code> możesz wołać w layoucie, w nagłówku i na stronie, zamiast przekazywać użytkownika propsami przez pół drzewa.</li><li><strong>Data cache między żądaniami.</strong> Trwały cache na dysku lub w Redisie, sterowany przez <code>revalidate</code>, tagi (<code>next: { tags: ["orders"] }</code>) i <code>revalidateTag()</code>. To najbliższy odpowiednik <code>routeRules</code> z Nuxta.</li><li><strong>Full route cache.</strong> Prerenderowany HTML i payload RSC dla tras statycznych. Wystarczy jedno użycie <code>cookies()</code> albo <code>headers()</code>, żeby segment przełączył się na dynamiczny - i to jest przyczyna większości pytań "dlaczego moja strona nie jest statyczna".</li><li><strong>Cache klienta.</strong> Router trzyma payload RSC odwiedzonych tras, żeby przycisk wstecz był natychmiastowy.</li></ul><p>Wzorzec preload rozwiązuje kaskadę, której <code>Promise.all</code> nie łapie - taką między rodzicem a dzieckiem:</p><pre><code>export const getOrder = cache(async (id: string) =&gt; db.order.find(id));\nexport const preload = (id: string) =&gt; { void getOrder(id); };\n\nexport default async function Page({ params }) {\n  preload(params.id);            // start teraz, nie czekaj\n  const user = await getUser();  // 200 ms, w tle leci order\n  return &lt;Detail id={params.id} user={user} /&gt;;\n}</code></pre><p>Kiedy mimo wszystko sięgnąć po TanStack Query: dane zmieniają się w trakcie sesji (polling, filtry, nieskończone listy, optimistic updates), a nawigacja routera byłaby zbyt gruboziarnista. Typowa produkcyjna architektura to hybryda - pierwszy render z serwera dla SEO i TTFB, a interaktywne widgety na kliencie z <code>initialData</code> wstrzykniętym z Server Component.</p><p>Pułapki, które bolą: (1) <code>fetch</code> z <code>cache: "force-cache"</code> na endpoincie z cenami - klasyczny incydent; (2) <code>cookies()</code> wywołane w layoucie wyłącza statykę dla całego drzewa; (3) Server Action, która zapisuje dane, ale nie woła <code>revalidatePath</code>/<code>revalidateTag</code> - UI pokazuje stare dane aż do twardego odświeżenia; (4) mieszanie <code>useEffect</code> plus <code>fetch</code> w komponencie klienckim tam, gdzie wystarczyłby <code>await</code> na serwerze - to znowu kaskada, tylko przeniesiona do przeglądarki i dodatkowo obciążona TTFB.</p>',
          en: '<p>Four layers you must keep apart, because each has a different lifetime:</p><ul><li><strong>Per-render deduplication.</strong> A <code>fetch()</code> with the same URL and headers inside one render pass runs once. For non-fetch functions you wrap them in React <code>cache()</code>. It is the <code>useAsyncData</code> key, only automatic. Practical effect: you can call <code>getCurrentUser()</code> in the layout, the header and the page instead of threading the user through half the tree as props.</li><li><strong>Data cache across requests.</strong> A persistent cache on disk or in Redis, driven by <code>revalidate</code>, tags (<code>next: { tags: ["orders"] }</code>) and <code>revalidateTag()</code>. This is the closest match to Nuxt <code>routeRules</code>.</li><li><strong>Full route cache.</strong> Prerendered HTML plus RSC payload for static routes. A single <code>cookies()</code> or <code>headers()</code> call flips the segment to dynamic - and that is behind most "why is my page not static" questions.</li><li><strong>Client cache.</strong> The router keeps RSC payloads of visited routes so the back button is instant.</li></ul><p>The preload pattern solves the waterfall <code>Promise.all</code> cannot reach - the one between a parent and a child:</p><pre><code>export const getOrder = cache(async (id: string) =&gt; db.order.find(id));\nexport const preload = (id: string) =&gt; { void getOrder(id); };\n\nexport default async function Page({ params }) {\n  preload(params.id);            // start now, do not await\n  const user = await getUser();  // 200 ms, order loads in the background\n  return &lt;Detail id={params.id} user={user} /&gt;;\n}</code></pre><p>When to reach for TanStack Query anyway: data that changes during the session (polling, filters, infinite lists, optimistic updates) where a router navigation would be too coarse. The typical production architecture is a hybrid - first render from the server for SEO and TTFB, interactive widgets on the client with <code>initialData</code> injected from a Server Component.</p><p>Traps that hurt: (1) <code>fetch</code> with <code>cache: "force-cache"</code> on a pricing endpoint - a classic incident; (2) <code>cookies()</code> called in a layout disables static rendering for the whole tree; (3) a Server Action that writes data but never calls <code>revalidatePath</code>/<code>revalidateTag</code> - the UI shows stale data until a hard refresh; (4) reaching for <code>useEffect</code> plus <code>fetch</code> in a client component where a server <code>await</code> would do - that is the waterfall again, moved into the browser and stacked on top of TTFB.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Trzy niezależne zapytania po 200 ms są wywołane trzema kolejnymi await. Ile trwa render?',
            en: 'Three independent 200 ms queries are called with three consecutive awaits. How long does the render take?'
          },
          options: [
            { pl: 'Około 200 ms, bo Node zrównolegla je automatycznie', en: 'About 200 ms, because Node parallelizes them automatically' },
            { pl: 'Około 600 ms, bo każde czeka na poprzednie', en: 'About 600 ms, because each waits for the previous one' },
            { pl: 'Około 400 ms', en: 'About 400 ms' },
            { pl: 'Zależnie od rozmiaru bundla', en: 'It depends on the bundle size' }
          ],
          correct: 1,
          explain: {
            pl: 'await blokuje wykonanie funkcji, więc kolejne zapytanie w ogóle nie startuje przed rozwiązaniem poprzedniego. Promise.all skraca to do 200 ms.',
            en: 'await blocks the function, so the next request does not even start before the previous resolves. Promise.all brings it down to 200 ms.'
          }
        },
        {
          q: {
            pl: 'Po co owijać wolny komponent w <Suspense> w Next App Router?',
            en: 'Why wrap a slow component in <Suspense> in the Next App Router?'
          },
          options: [
            { pl: 'Żeby wyciszyć błędy tego poddrzewa', en: 'To swallow errors from that subtree' },
            { pl: 'Żeby wymusić renderowanie po stronie klienta', en: 'To force client-side rendering' },
            { pl: 'Żeby reszta strony poszła do przeglądarki od razu, a wolna część dopłynęła później', en: 'So the rest of the page ships immediately and the slow part streams in later' },
            { pl: 'Żeby włączyć cache dla tego zapytania', en: 'To enable caching for that query' }
          ],
          correct: 2,
          explain: {
            pl: 'Granica Suspense pozwala serwerowi wysłać szkielet strony natychmiast i dosyłać HTML wolnego fragmentu strumieniem. Błędami zajmuje się error boundary, nie Suspense.',
            en: 'A Suspense boundary lets the server flush the page shell immediately and stream the slow fragment HTML afterwards. Errors are the job of an error boundary, not Suspense.'
          }
        },
        {
          q: {
            pl: 'Layout, nagłówek i strona wołają to samo getCurrentUser() w jednym renderze. Co się stanie w Next?',
            en: 'The layout, the header and the page all call the same getCurrentUser() in one render. What happens in Next?'
          },
          options: [
            { pl: 'Zapytanie poleci raz, bo fetch i cache() deduplikują je w obrębie renderu', en: 'The query runs once, because fetch and cache() deduplicate it within the render' },
            { pl: 'Zapytanie poleci trzy razy, trzeba ręcznie przekazać dane propsami', en: 'The query runs three times, so you must thread the data down as props' },
            { pl: 'Next zgłosi ostrzeżenie o zduplikowanym zapytaniu', en: 'Next logs a duplicate-query warning' },
            { pl: 'Zadziała tylko pierwsze wywołanie, pozostałe zwrócą undefined', en: 'Only the first call works, the rest return undefined' }
          ],
          correct: 0,
          explain: {
            pl: 'Deduplikacja w obrębie renderu jest wbudowana: fetch po URL i nagłówkach, a własne funkcje po opakowaniu w cache(). To odpowiednik klucza z useAsyncData, tylko automatyczny.',
            en: 'Per-render deduplication is built in: fetch by URL and headers, your own functions once wrapped in cache(). It is the useAsyncData key, only automatic.'
          }
        },
        {
          q: {
            pl: 'Server Action zapisuje zmianę statusu, zwraca sukces, ale lista nadal pokazuje stary status do twardego odświeżenia. Czego brakuje?',
            en: 'A Server Action saves a status change and returns success, but the list still shows the old status until a hard refresh. What is missing?'
          },
          options: [
            { pl: 'Dyrektywy "use client" na komponencie listy', en: 'A "use client" directive on the list component' },
            { pl: 'Wywołania revalidatePath lub revalidateTag po zapisie', en: 'A revalidatePath or revalidateTag call after the write' },
            { pl: 'Owinięcia listy w <Suspense>', en: 'Wrapping the list in <Suspense>' },
            { pl: 'Ustawienia dynamic na force-static', en: 'Setting dynamic to force-static' }
          ],
          correct: 1,
          explain: {
            pl: 'Zapis nie unieważnia sam z siebie cache danych ani cache trasy. Akcja musi jawnie zawołać revalidatePath albo revalidateTag - to odpowiednik invalidateQueries z TanStack Query.',
            en: 'A write does not invalidate the data cache or the route cache by itself. The action must explicitly call revalidatePath or revalidateTag - the equivalent of invalidateQueries in TanStack Query.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'choosing-spa-vs-meta',
      title: { pl: 'SPA czy meta-framework: jak wybrać', en: 'SPA or meta-framework: how to choose' },
      minutes: 9,
      terms: [
        {
          term: { pl: 'SPA', en: 'SPA' },
          def: { pl: 'Aplikacja jako statyczne pliki na CDN albo za Nginksem: brak runtime, brak zimnych startów, brak dyżuru o trzeciej w nocy. Jedno źródło prawdy po stronie klienta.', en: 'The app as static files on a CDN or behind Nginx: no runtime, no cold starts, no 3 a.m. pager. One client-side source of truth.' }
        },
        {
          term: { pl: 'Meta-framework', en: 'Meta-framework' },
          def: { pl: 'Framework dokładający do Reacta routing, renderowanie serwerowe i warstwę danych (Next, React Router w trybie framework, TanStack Start). Kosztem jest kontener Node i większa złożoność operacyjna.', en: 'A framework adding routing, server rendering and a data layer on top of React (Next, React Router framework mode, TanStack Start). The price is a Node container and more operational complexity.' }
        },
        {
          term: { pl: 'Tryb framework (React Router 7)', en: 'Framework mode (React Router 7)' },
          def: { pl: 'Ścieżka pośrednia: SSR, loadery i akcje bez RSC. Dla zespołu po Nuxcie najłagodniejsze przejście, bo model "trasa posiada swoje dane" jest już znany.', en: 'The middle path: SSR, loaders and actions without RSC. For a team arriving from Nuxt it is the gentlest transition, because the "a route owns its data" model is already familiar.' }
        },
        {
          term: { pl: 'Vendor lock-in', en: 'Vendor lock-in' },
          def: { pl: 'Uzależnienie od dostawcy: ISR, obrazy, middleware i Server Actions działają najlepiej na Vercelu, a <code>next start</code> na własnym klastrze wymaga dołożenia cache w Redisie i CDN rozumiejącego tagi.', en: 'Dependence on a provider: ISR, images, middleware and Server Actions work best on Vercel, while <code>next start</code> on your own cluster needs a Redis-backed cache and a tag-aware CDN.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg">'
          + '<defs><marker id="ch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>'
          + '<rect x="150" y="20" width="340" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="320" y="52" font-family="inherit" font-size="14" fill="var(--text)" text-anchor="middle">Does an anonymous visitor need this page?</text>'
          + '<line x1="240" y1="76" x2="150" y2="116" stroke="var(--muted)" stroke-width="2" marker-end="url(#ch-arrow)"/>'
          + '<text x="168" y="106" font-family="inherit" font-size="13" fill="var(--muted)">no</text>'
          + '<line x1="400" y1="76" x2="490" y2="116" stroke="var(--muted)" stroke-width="2" marker-end="url(#ch-arrow)"/>'
          + '<text x="452" y="106" font-family="inherit" font-size="13" fill="var(--muted)">yes</text>'
          + '<rect x="20" y="124" width="240" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="140" y="156" font-family="inherit" font-size="14" fill="var(--text)" text-anchor="middle">App behind a login</text>'
          + '<rect x="380" y="124" width="240" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="500" y="156" font-family="inherit" font-size="14" fill="var(--text)" text-anchor="middle">SEO or first paint matters</text>'
          + '<line x1="140" y1="180" x2="140" y2="216" stroke="var(--muted)" stroke-width="2" marker-end="url(#ch-arrow)"/>'
          + '<line x1="500" y1="180" x2="500" y2="216" stroke="var(--muted)" stroke-width="2" marker-end="url(#ch-arrow)"/>'
          + '<rect x="20" y="224" width="240" height="72" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="140" y="252" font-family="inherit" font-size="14" fill="var(--ok)" text-anchor="middle">Vite + React Router</text>'
          + '<text x="140" y="276" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">static host, no server</text>'
          + '<rect x="380" y="224" width="240" height="72" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="500" y="252" font-family="inherit" font-size="14" fill="var(--accent)" text-anchor="middle">Next / Nuxt / TanStack Start</text>'
          + '<text x="500" y="276" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">you now run a server</text>'
          + '<text x="20" y="348" font-family="inherit" font-size="13" fill="var(--muted)">The question is not which is more modern. It is whether you</text>'
          + '<text x="20" y="370" font-family="inherit" font-size="13" fill="var(--muted)">are willing to own a Node runtime in production: deploys,</text>'
          + '<text x="20" y="392" font-family="inherit" font-size="13" fill="var(--muted)">cold starts, memory, logs, on-call.</text>'
          + '</svg>',
        caption: {
          pl: 'Pytanie nie brzmi "co nowocześniejsze", tylko "czy bierzesz na siebie serwer Node na produkcji": deploye, zimne starty, pamięć, logi, dyżury.',
          en: 'The question is not "which is more modern" but "are you taking on a Node runtime in production": deploys, cold starts, memory, logs, on-call.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że otwierasz lodziarnię. Masz dwa pomysły.</p><p>Pomysł pierwszy: wózek. Stawiasz go rano, zwijasz wieczorem, nie płacisz czynszu, nie masz kuchni ani instalacji. Wystarczy, że ludzie wiedzą, gdzie stoisz. Jeśli sprzedajesz stałym klientom z sąsiedztwa, wózek jest idealny.</p><p>Pomysł drugi: lokal z zapleczem. Kosztuje więcej, trzeba w nim sprzątać, pilnować lodówek i mieć kogoś na miejscu. Ale wystawa jest widoczna z ulicy, więc przechodnie wchodzą sami, a lody są gotowe od razu po wejściu.</p><p>Jeśli Twoi klienci i tak przychodzą z kluczem do drzwi - bierz wózek. Jeśli chcesz, żeby ktoś zupełnie obcy zobaczył Cię z ulicy i wszedł, potrzebujesz witryny, czyli zaplecza. Żadna z tych opcji nie jest lepsza. Są lepsze do czegoś innego.</p>',
          en: '<p>Imagine opening an ice cream business. You have two ideas.</p><p>Idea one: a cart. You roll it out in the morning, pack it away at night, pay no rent, run no kitchen, install nothing. People just need to know where you stand. If you sell to the same neighbours every day, the cart is perfect.</p><p>Idea two: a shop with a back room. It costs more, it needs cleaning, the fridges need watching and somebody has to be there. But the window is visible from the street, so passers-by walk in on their own, and the ice cream is ready the moment they enter.</p><p>If your customers arrive holding their own key to the door - take the cart. If you want a complete stranger to spot you from the street and walk in, you need the window, which means the back room. Neither option is better. They are better at different things.</p>'
        },
        school: {
          pl: '<p>Idąc z Vue do Reacta łatwo założyć, że skoro w Vue naturalnym wyborem był Nuxt, to w Reactie naturalnym wyborem jest Next. To założenie kosztuje zespoły dużo czasu. Next w wersji App Router to znacznie większa zmiana modelu niż Nuxt wobec czystego Vue.</p><p>Zacznij od jednego pytania: <strong>czy anonimowy użytkownik ogląda te strony?</strong></p><ul><li><strong>Nie</strong> - panel admina, narzędzie wewnętrzne, aplikacja B2B za loginem. SEO nie istnieje, a SSR daje tylko szybszy pierwszy render kosztem całej infrastruktury. Bierz Vite plus React Router w trybie data. Deploy to wrzucenie plików statycznych na CDN, dokładnie jak <code>vite build</code> w projekcie Vue.</li><li><strong>Tak</strong> - marketing, katalog, dokumentacja, sklep. Potrzebujesz HTML-a dla robotów i szybkiego pierwszego pixela. Bierz Next, Nuxt albo TanStack Start.</li></ul><p>Warto też policzyć, co realnie przenosisz. Zespół znający Nuxta dostaje w Next:</p><table><tr><th>To samo</th><th>Nowe do nauczenia</th></tr><tr><td>routing po plikach</td><td>granica server/client</td></tr><tr><td>SSR i prerendering</td><td>cztery warstwy cache</td></tr><tr><td>endpointy API</td><td>Server Actions</td></tr><tr><td>metatagi</td><td>brak auto-importów i modułów</td></tr></table><p>W Vue robiłeś X: wybierałeś między Vue plus Vite a Nuxtem, a różnica była głównie ilościowa (Nuxt to Vue z bateriami). W React robisz Y: wybierasz między dwoma różnymi modelami wykonania. Dlaczego Z: bo App Router zmienia to, gdzie w ogóle wykonuje się Twój komponent, a nie tylko to, ile konfiguracji dostajesz gratis.</p>',
          en: '<p>Coming from Vue it is easy to assume that since Nuxt was the natural choice there, Next is the natural choice in React. That assumption costs teams a lot of time. Next with the App Router is a far bigger model change than Nuxt is over plain Vue.</p><p>Start from one question: <strong>does an anonymous visitor look at these pages?</strong></p><ul><li><strong>No</strong> - admin panel, internal tool, B2B app behind a login. SEO does not exist, and SSR only buys a faster first render at the price of a whole infrastructure. Take Vite plus React Router in data mode. Deploying means dropping static files onto a CDN, exactly like <code>vite build</code> in a Vue project.</li><li><strong>Yes</strong> - marketing, catalogue, docs, storefront. You need HTML for crawlers and a fast first pixel. Take Next, Nuxt or TanStack Start.</li></ul><p>It also pays to count what actually transfers. A team that knows Nuxt gets this in Next:</p><table><tr><th>Same as before</th><th>New to learn</th></tr><tr><td>file-based routing</td><td>the server/client boundary</td></tr><tr><td>SSR and prerendering</td><td>four caching layers</td></tr><tr><td>API endpoints</td><td>Server Actions</td></tr><tr><td>meta tags</td><td>no auto-imports, no modules</td></tr></table><p>In Vue you did X: you chose between Vue plus Vite and Nuxt, and the difference was mostly quantitative (Nuxt is Vue with batteries). In React you do Y: you choose between two different execution models. Because Z: the App Router changes where your component runs at all, not merely how much configuration you get for free.</p>'
        },
        pro: {
          pl: '<p>Decyzja jest architektoniczna, nie estetyczna. Cztery osie, które realnie różnicują opcje:</p><ul><li><strong>Hosting.</strong> SPA to pliki na S3 albo w Nginx: brak runtime, brak zimnych startów, zerowa obsługa. Next poza Vercelem oznacza kontener z Node, autoscaling, health checki i budzik o trzeciej w nocy. Nuxt z Nitro deployuje się łatwiej na dowolną platformę - to realna przewaga, którą tracisz przechodząc na Next.</li><li><strong>Model danych.</strong> W SPA masz jedno źródło prawdy po stronie klienta (TanStack Query albo loadery routera) i jedno API. W App Routerze masz dwa światy naraz plus cztery warstwy cache, które trzeba trzymać w głowie przy code review.</li><li><strong>Rozmiar zespołu.</strong> Granica server/client działa, gdy ktoś jej pilnuje. Przy dwóch osobach i deadlinie jedno <code>"use client"</code> w layoucie kasuje cały zysk, a projekt zostaje z podwojoną złożonością i zerową korzyścią.</li><li><strong>Vendor lock-in.</strong> ISR, obrazy, middleware i Server Actions działają najlepiej na Vercelu. <code>next start</code> we własnym klastrze działa, ale część funkcji wymaga dodatkowej roboty (cache w Redis, CDN z obsługą tagów).</li></ul><p>Pragmatyczne rekomendacje dla typowych projektów frontendowych w dużej firmie:</p><table><tr><th>Projekt</th><th>Wybór</th></tr><tr><td>panel admina za SSO</td><td>Vite + React Router (data mode)</td></tr><tr><td>portal samoobsługowy klienta</td><td>Next, ale strefa za loginem może być SPA</td></tr><tr><td>strona marketingowa</td><td>Next lub Astro</td></tr><tr><td>docs design systemu</td><td>Astro albo Storybook, nie Next</td></tr><tr><td>migracja dużej apki Vue</td><td>SPA najpierw, RSC później i tylko jeśli jest za co</td></tr></table><p>Osobna ścieżka pośrednia: React Router 7 w trybie framework daje SSR, loadery i akcje bez RSC. Dla zespołu z Nuxta to najłagodniejsze przejście, bo model mentalny (trasa ma dane, akcja rewaliduje) jest bliski temu, co już znasz, a nie trzeba uczyć się granicy server/client od pierwszego dnia.</p><p>Ostatnia uwaga, przydatna na rozmowie: umiejętność powiedzenia "tu Next nie jest potrzebny i oto dlaczego" jest ceniona wyżej niż znajomość każdego API App Routera. Architekt to ktoś, kto odrzuca opcję z uzasadnieniem, a nie ktoś, kto dokłada kolejną warstwę.</p>',
          en: '<p>This is an architectural decision, not an aesthetic one. Four axes actually separate the options:</p><ul><li><strong>Hosting.</strong> An SPA is files on S3 or behind Nginx: no runtime, no cold starts, no operations. Next outside Vercel means a Node container, autoscaling, health checks and a pager at 3 a.m. Nuxt with Nitro deploys far more easily to any platform - a real advantage you give up when moving to Next.</li><li><strong>Data model.</strong> In an SPA you have one client-side source of truth (TanStack Query or router loaders) and one API. In the App Router you have two worlds at once plus four caching layers you must hold in your head during code review.</li><li><strong>Team size.</strong> The server/client boundary works when somebody polices it. With two people and a deadline, one <code>"use client"</code> in a layout erases the entire benefit and the project keeps the doubled complexity with none of the payoff.</li><li><strong>Vendor lock-in.</strong> ISR, images, middleware and Server Actions work best on Vercel. <code>next start</code> on your own cluster works, but some features need extra effort (Redis-backed cache, a CDN that understands tags).</li></ul><p>Pragmatic recommendations for typical enterprise frontend projects:</p><table><tr><th>Project</th><th>Choice</th></tr><tr><td>admin panel behind SSO</td><td>Vite + React Router (data mode)</td></tr><tr><td>customer self-service portal</td><td>Next, but the logged-in zone can stay an SPA</td></tr><tr><td>marketing site</td><td>Next or Astro</td></tr><tr><td>design system docs</td><td>Astro or Storybook, not Next</td></tr><tr><td>migrating a large Vue app</td><td>SPA first, RSC later and only if it pays</td></tr></table><p>There is a middle path: React Router 7 in framework mode gives you SSR, loaders and actions without RSC. For a team arriving from Nuxt it is the gentlest transition, because the mental model (a route owns its data, an action revalidates) is close to what you already know and you do not have to learn the server/client boundary on day one.</p><p>A final note, useful in interviews: being able to say "Next is not needed here, and here is why" is valued more highly than knowing every App Router API. An architect is someone who rejects options with a rationale, not someone who adds one more layer.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Budujesz panel administracyjny dostępny tylko po zalogowaniu przez SSO. Co jest domyślnie rozsądniejszym wyborem?',
            en: 'You are building an admin panel available only after SSO login. What is the more sensible default?'
          },
          options: [
            { pl: 'Next.js z App Routerem, bo jest nowocześniejszy', en: 'Next.js with the App Router, because it is more modern' },
            { pl: 'Vite plus React Router jako SPA na statycznym hostingu', en: 'Vite plus React Router as an SPA on static hosting' },
            { pl: 'Osobna aplikacja Nuxt obok', en: 'A separate Nuxt app alongside' },
            { pl: 'Generowanie statyczne wszystkich stron', en: 'Static generation of every page' }
          ],
          correct: 1,
          explain: {
            pl: 'Za loginem SEO nie istnieje, więc główna korzyść SSR znika, a koszt utrzymania serwera Node zostaje. SPA na CDN jest tańsza i prostsza w utrzymaniu.',
            en: 'Behind a login SEO does not exist, so the main SSR benefit disappears while the cost of running a Node server remains. An SPA on a CDN is cheaper and simpler to operate.'
          }
        },
        {
          q: {
            pl: 'Która umiejętność z Nuxta przenosi się do Next.js NAJMNIEJ bezpośrednio?',
            en: 'Which Nuxt skill transfers to Next.js LEAST directly?'
          },
          options: [
            { pl: 'Routing po strukturze katalogów', en: 'Routing from the directory structure' },
            { pl: 'Definiowanie metatagów strony', en: 'Defining page meta tags' },
            { pl: 'Podział kodu na serwerowy i kliencki wewnątrz jednego drzewa komponentów', en: 'Splitting one component tree into server and client code' },
            { pl: 'Pisanie endpointów API w tym samym repo', en: 'Writing API endpoints in the same repo' }
          ],
          correct: 2,
          explain: {
            pl: 'Routing, metatagi i endpointy mają w Next bezpośrednie odpowiedniki. Granica server/client jest nowym modelem, którego w Nuxcie nie używa się na co dzień.',
            en: 'Routing, meta tags and endpoints have direct counterparts in Next. The server/client boundary is a new model that Nuxt developers do not use day to day.'
          }
        },
        {
          q: {
            pl: 'Zespół chce SSR i loadery, ale nie chce jeszcze uczyć się granicy server/client. Co jest sensowną drogą pośrednią?',
            en: 'A team wants SSR and loaders but is not ready to learn the server/client boundary. What is a sensible middle path?'
          },
          options: [
            { pl: 'React Router 7 w trybie framework', en: 'React Router 7 in framework mode' },
            { pl: 'Next App Router z "use client" w layoucie głównym', en: 'The Next App Router with "use client" in the root layout' },
            { pl: 'Ręczny SSR na własnym serwerze Express', en: 'Hand-rolled SSR on your own Express server' },
            { pl: 'Czysty Vite bez routera', en: 'Plain Vite with no router' }
          ],
          correct: 0,
          explain: {
            pl: 'Tryb framework daje SSR, loadery i akcje bez RSC. Model "trasa ma swoje dane, akcja rewaliduje" jest bliski Nuxtowi, a granicy server/client uczysz się dopiero, gdy jej potrzebujesz.',
            en: 'Framework mode gives SSR, loaders and actions without RSC. The "a route owns its data, an action revalidates" model is close to Nuxt, and you learn the server/client boundary only when you need it.'
          }
        },
        {
          q: {
            pl: 'Który argument NIE jest dobrym powodem, żeby wybrać Next.js zamiast SPA?',
            en: 'Which argument is NOT a good reason to pick Next.js over an SPA?'
          },
          options: [
            { pl: 'Anonimowi użytkownicy i roboty muszą dostać gotowy HTML', en: 'Anonymous visitors and crawlers need ready HTML' },
            { pl: 'Chcemy zmniejszyć bundle klienta przenosząc ciężką logikę na serwer', en: 'We want a smaller client bundle by moving heavy logic to the server' },
            { pl: 'Next jest nowszy i więcej osób o nim mówi', en: 'Next is newer and more people talk about it' },
            { pl: 'Potrzebujemy szybkiego pierwszego renderu na słabych urządzeniach', en: 'We need a fast first render on low-end devices' }
          ],
          correct: 2,
          explain: {
            pl: 'Popularność nie jest kryterium architektonicznym. Next kosztuje utrzymanie runtime i więcej złożoności, więc musi to opłacić konkretna korzyść: SEO, TTFB albo rozmiar bundla.',
            en: 'Popularity is not an architectural criterion. Next costs you a runtime to operate and extra complexity, so a concrete benefit must pay for it: SEO, TTFB or bundle size.'
          }
        }
      ]
    }

  ]
};
