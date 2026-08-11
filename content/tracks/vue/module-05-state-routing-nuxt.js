export default {
  id: 'state-routing-nuxt',
  order: 5,
  icon: '🗺️',
  title: {
    pl: 'Stan, routing i Nuxt',
    en: 'State, Routing & Nuxt'
  },
  description: {
    pl: 'Pinia od środka i jej pluginy, matcher i guardy Vue Routera, pobieranie danych bez wyścigów oraz architektura Nuxt 3: Nitro, payload i hydracja.',
    en: 'Pinia internals and plugins, the Vue Router matcher and guards, race-free data fetching, and the Nuxt 3 architecture: Nitro, payload and hydration.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'pinia-fundamentals',
      title: {
        pl: 'Pinia od podstaw - ale porządnie',
        en: 'Pinia fundamentals - done properly'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">One Pinia instance, many stores, many components</text>' +
          '<rect x="20" y="46" width="600" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="74" fill="var(--accent)" font-size="15">createPinia() - the registry on app level</text>' +
          '<rect x="44" y="90" width="170" height="86" rx="10" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="129" y="116" fill="var(--text)" font-size="14" text-anchor="middle">useCartStore</text>' +
          '<text x="129" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">state / getters</text>' +
          '<text x="129" y="162" fill="var(--muted)" font-size="13" text-anchor="middle">actions</text>' +
          '<rect x="234" y="90" width="170" height="86" rx="10" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="319" y="116" fill="var(--text)" font-size="14" text-anchor="middle">useUserStore</text>' +
          '<text x="319" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">state / getters</text>' +
          '<text x="319" y="162" fill="var(--muted)" font-size="13" text-anchor="middle">actions</text>' +
          '<rect x="424" y="90" width="170" height="86" rx="10" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
          '<text x="509" y="130" fill="var(--muted)" font-size="14" text-anchor="middle">created lazily</text>' +
          '<text x="509" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">on first use</text>' +
          '<path d="M129 196 L129 246" stroke="var(--accent)" stroke-width="2"/>' +
          '<path d="M129 250 L122 238 L136 238 z" fill="var(--accent)"/>' +
          '<path d="M319 196 L319 246" stroke="var(--accent2)" stroke-width="2"/>' +
          '<path d="M319 250 L312 238 L326 238 z" fill="var(--accent2)"/>' +
          '<rect x="40" y="252" width="260" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="170" y="280" fill="var(--text)" font-size="14" text-anchor="middle">CartBadge.vue</text>' +
          '<text x="170" y="304" fill="var(--muted)" font-size="13" text-anchor="middle">storeToRefs(store)</text>' +
          '<rect x="330" y="252" width="260" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="460" y="280" fill="var(--text)" font-size="14" text-anchor="middle">CheckoutPage.vue</text>' +
          '<text x="460" y="304" fill="var(--muted)" font-size="13" text-anchor="middle">store.checkout()</text>' +
          '<rect x="40" y="340" width="550" height="54" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="315" y="372" fill="var(--ok)" font-size="14" text-anchor="middle">Same store id = same instance inside one Pinia</text>' +
          '</svg>',
        caption: {
          pl: 'Pinia to rejestr na poziomie aplikacji: store powstaje leniwie przy pierwszym użyciu, a wszystkie komponenty dostają tę samą instancję.',
          en: 'Pinia is an app-level registry: a store is created lazily on first use and every component gets the very same instance.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie biurową lodówkę. Każdy pracownik może do niej podejść, zajrzeć i coś wziąć albo dołożyć. Nikt nie nosi własnej lodówki w plecaku - jest jedna, wspólna, i wszyscy widzą to samo mleko.</p><p>Pinia to taka lodówka dla danych w aplikacji. Zamiast przekazywać koszyk zakupowy z rodzica do dziecka, do wnuka i do prawnuka, po prostu każdy kto potrzebuje - podchodzi do lodówki i pyta: co jest w koszyku?</p><p>Lodówek może być kilka, każda na co innego: jedna na zakupy, jedna na dane użytkownika. Ale każda ma swoją nazwę i jest tylko jedna sztuka danej nazwy. Jeśli dwie osoby otworzą tę samą lodówkę, zobaczą dokładnie to samo w środku - i gdy jedna dołoży ser, druga natychmiast go widzi.</p><p>Ważna zasada dobrego biura: jeśli coś zmieniasz w lodówce, robisz to przez wyznaczoną osobę - żeby wiadomo było, kto i po co ruszył ser.</p>',
          en: '<p>Picture the office fridge. Anyone can walk up, look inside, take something out or put something in. Nobody carries their own fridge in a backpack - there is one shared fridge and everybody sees the same milk.</p><p>Pinia is that fridge for your application data. Instead of passing the shopping cart from a parent to a child to a grandchild to a great-grandchild, whoever needs it just walks up and asks: what is in the cart?</p><p>You can have several fridges, each for a different thing: one for shopping, one for the user. But each has a name, and there is exactly one fridge per name. If two people open the same fridge they see exactly the same contents - and when one adds cheese, the other sees it immediately.</p><p>One rule of a well-run office: when you change something in the fridge, you do it through the designated person, so everyone knows who moved the cheese and why.</p>'
        },
        school: {
          pl: '<p>Store w Pinii deklarujesz raz i importujesz wszędzie. Dwie składnie robią to samo, ale mają inny charakter:</p><pre><code>// setup store - to po prostu composable z id\nexport const useCart = defineStore("cart", () =&gt; {\n  const items = ref([])\n  const total = computed(() =&gt;\n    items.value.reduce((s, i) =&gt; s + i.price * i.qty, 0))\n  function add(product) {\n    const hit = items.value.find(i =&gt; i.id === product.id)\n    hit ? hit.qty++ : items.value.push({ ...product, qty: 1 })\n  }\n  return { items, total, add }\n})\n\n// options store - bliżej Vuexa, dostajesz $reset za darmo\nexport const useCart2 = defineStore("cart2", {\n  state: () =&gt; ({ items: [] }),\n  getters: { total: (s) =&gt; s.items.length },\n  actions: { add(p) { this.items.push(p) } }\n})</code></pre><p>Pierwsze wywołanie <code>useCart()</code> tworzy instancję i chowa ją w rejestrze Pinii, każde kolejne zwraca tę samą. To jest cała magia - reszta to zwykła reaktywność Vue, którą już znasz.</p><p>Trzy rzeczy, które warto mieć w palcach:</p><ul><li><strong>Nie destrukturyzuj store bezpośrednio.</strong> <code>const { total } = useCart()</code> zrywa reaktywność, bo wyciąga wartość z proxy. Do stanu i getterów używaj <code>storeToRefs(store)</code>, a akcje bierz zwyczajnie - one nie muszą być reaktywne.</li><li><strong>Store to nie skrzynka na wszystko.</strong> Stan serwerowy z cache i deduplikacją lepiej trzymać w TanStack Query albo <code>useAsyncData</code>. Do Pinii trafia stan, który naprawdę jest wspólny dla wielu widoków: sesja, koszyk, ustawienia, otwarty panel.</li><li><strong>Store woła store.</strong> Wewnątrz akcji możesz zwyczajnie wywołać <code>useUser()</code> - to zwykła funkcja, żadnej rejestracji modułów jak w Vuexie.</li></ul><p>Mutacji nie ma i nie są potrzebne: zmieniasz stan wprost albo grupujesz zmiany przez <code>store.$patch()</code>. Devtools i tak zobaczą każdą zmianę.</p>',
          en: '<p>You declare a store once and import it everywhere. Two syntaxes do the same job with a different flavour:</p><pre><code>// setup store - literally a composable with an id\nexport const useCart = defineStore("cart", () =&gt; {\n  const items = ref([])\n  const total = computed(() =&gt;\n    items.value.reduce((s, i) =&gt; s + i.price * i.qty, 0))\n  function add(product) {\n    const hit = items.value.find(i =&gt; i.id === product.id)\n    hit ? hit.qty++ : items.value.push({ ...product, qty: 1 })\n  }\n  return { items, total, add }\n})\n\n// options store - closer to Vuex, and you get $reset for free\nexport const useCart2 = defineStore("cart2", {\n  state: () =&gt; ({ items: [] }),\n  getters: { total: (s) =&gt; s.items.length },\n  actions: { add(p) { this.items.push(p) } }\n})</code></pre><p>The first <code>useCart()</code> call creates the instance and stores it in the Pinia registry; every later call returns the same one. That is the whole trick - everything else is plain Vue reactivity you already know.</p><p>Three things worth having in your fingers:</p><ul><li><strong>Do not destructure the store directly.</strong> <code>const { total } = useCart()</code> breaks reactivity because it pulls a value out of the proxy. Use <code>storeToRefs(store)</code> for state and getters; take actions plainly - they do not need to be reactive.</li><li><strong>A store is not a junk drawer.</strong> Server state with caching and dedupe belongs in TanStack Query or <code>useAsyncData</code>. Pinia is for state that is genuinely shared across views: session, cart, preferences, which panel is open.</li><li><strong>Stores call stores.</strong> Inside an action you simply call <code>useUser()</code> - it is an ordinary function, no module registration like in Vuex.</li></ul><p>There are no mutations and none are needed: mutate state directly, or group changes with <code>store.$patch()</code>. Devtools will see every change either way.</p>'
        },
        pro: {
          pl: '<p>Mechanika, która tłumaczy większość zagadek: <code>defineStore</code> zwraca funkcję, która w środku robi <code>getActivePinia()</code>, sprawdza <code>pinia._s.get(id)</code> i albo zwraca gotową instancję, albo tworzy nową w dedykowanym <code>effectScope</code>. Stąd dwa fakty produkcyjne. Po pierwsze, poza komponentem (np. w guardzie routera zdefiniowanym na module) aktywna Pinia może jeszcze nie istnieć - dlatego <code>useStore()</code> wołaj wewnątrz guarda, nie na poziomie modułu. Po drugie, cały store da się zdemontować przez <code>store.$dispose()</code>, bo jego computed i watchery żyją w jednym scope.</p><p>Setup store vs options store to nie kwestia gustu:</p><ul><li><code>$reset()</code> istnieje tylko w options store, bo Pinia zna tam fabrykę <code>state()</code>. W setup store musisz go dopisać sam (najczęściej pluginem albo własną akcją <code>reset()</code>).</li><li>W setup store <em>musisz</em> zwrócić każdy ref, który ma być częścią <code>$state</code>. Ref niezwrócony pozostaje prywatnym stanem instancji - to celowy i bardzo użyteczny wzorzec na stan wewnętrzny.</li><li>Serializacja SSR patrzy tylko na <code>$state</code>. Prywatne refy nie trafią do payloadu i po hydracji wrócą do wartości początkowych.</li></ul><pre><code>const store = useCart()\nstore.$patch({ coupon: "X" })                 // obiekt: płytki merge\nstore.$patch((s) =&gt; { s.items.push(item) })   // funkcja: mutacje kolekcji\nstore.$subscribe((mutation, state) =&gt; {\n  // mutation.type: direct | patch object | patch function\n  localStorage.setItem("cart", JSON.stringify(state))\n}, { detached: true })\nstore.$onAction(({ name, after, onError }) =&gt; {\n  const t0 = performance.now()\n  after(() =&gt; track(name, performance.now() - t0))\n  onError((e) =&gt; report(name, e))\n})</code></pre><p>Uwaga na cykl życia subskrypcji: <code>$subscribe</code> i <code>$onAction</code> wywołane w komponencie są domyślnie związane z tym komponentem i znikają przy unmount. Do zapisu w localStorage albo telemetrii chcesz <code>{ detached: true }</code> - inaczej dostaniesz błąd typu "działa, dopóki ten jeden komponent jest na ekranie", trudny do zdiagnozowania.</p><p>Typowanie: w setup store typy wynikają z zwracanego obiektu, więc <code>ref&lt;Item[]&gt;([])</code> zamiast <code>ref([])</code> to jedyna rzecz, o której trzeba pamiętać. HMR działa, jeśli dodasz standardowy blok <code>acceptHMRUpdate(useCart, import.meta.hot)</code> - bez tego edycja store powoduje pełny reload i utratę stanu, co przy pracy nad kreatorami wieloetapowymi jest bardzo męczące. W testach zamiast mockować store wstrzykuj <code>createTestingPinia()</code>, które domyślnie zaślepia akcje i pozwala je asertować przez <code>expect(store.add).toHaveBeenCalled()</code>.</p>',
          en: '<p>The mechanic that explains most puzzles: <code>defineStore</code> returns a function that internally calls <code>getActivePinia()</code>, checks <code>pinia._s.get(id)</code> and either returns the existing instance or creates one inside a dedicated <code>effectScope</code>. Two production consequences follow. First, outside a component (say in a router guard defined at module level) there may be no active Pinia yet - so call <code>useStore()</code> inside the guard, never at module scope. Second, a whole store can be torn down with <code>store.$dispose()</code>, because its computeds and watchers all live in one scope.</p><p>Setup store versus options store is not a matter of taste:</p><ul><li><code>$reset()</code> exists only in options stores, because there Pinia knows the <code>state()</code> factory. In a setup store you add it yourself (usually via a plugin or an explicit <code>reset()</code> action).</li><li>In a setup store you <em>must</em> return every ref that should be part of <code>$state</code>. A ref you do not return stays private instance state - a deliberate and very useful pattern for internal bookkeeping.</li><li>SSR serialization only looks at <code>$state</code>. Private refs never reach the payload and fall back to their initial values after hydration.</li></ul><pre><code>const store = useCart()\nstore.$patch({ coupon: "X" })                 // object: shallow merge\nstore.$patch((s) =&gt; { s.items.push(item) })   // function: collection mutations\nstore.$subscribe((mutation, state) =&gt; {\n  // mutation.type: direct | patch object | patch function\n  localStorage.setItem("cart", JSON.stringify(state))\n}, { detached: true })\nstore.$onAction(({ name, after, onError }) =&gt; {\n  const t0 = performance.now()\n  after(() =&gt; track(name, performance.now() - t0))\n  onError((e) =&gt; report(name, e))\n})</code></pre><p>Mind the subscription lifecycle: <code>$subscribe</code> and <code>$onAction</code> called inside a component are bound to that component and disappear on unmount. Persistence and telemetry want <code>{ detached: true }</code> - otherwise you ship the delightful bug class of "works as long as this one component is on screen".</p><p>Typing: in a setup store types come from the returned object, so <code>ref&lt;Item[]&gt;([])</code> instead of <code>ref([])</code> is the only thing to remember. HMR works if you add the standard <code>acceptHMRUpdate(useCart, import.meta.hot)</code> block - without it editing a store triggers a full reload and wipes state, which is painful while building multi-step wizards. In tests, instead of mocking a store inject <code>createTestingPinia()</code>, which stubs actions by default and lets you assert <code>expect(store.add).toHaveBeenCalled()</code>.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dostajesz przy drugim wywołaniu useCart() w innym komponencie?',
            en: 'What do you get from a second useCart() call in a different component?'
          },
          options: [
            { pl: 'Nową, niezależną instancję store', en: 'A new, independent store instance' },
            { pl: 'Tę samą instancję z rejestru aktywnej Pinii', en: 'The same instance from the active Pinia registry' },
            { pl: 'Kopię stanu, zsynchronizowaną przez watchery', en: 'A copy of the state kept in sync by watchers' },
            { pl: 'Błąd - store można użyć tylko raz', en: 'An error - a store may only be used once' }
          ],
          correct: 1,
          explain: {
            pl: 'Pinia trzyma store pod jego id w mapie instancji. Pierwsze użycie tworzy store leniwie, każde kolejne zwraca dokładnie ten sam obiekt.',
            en: 'Pinia keeps stores by id in an instance map. The first use creates the store lazily; every later call returns exactly the same object.'
          }
        },
        {
          q: {
            pl: 'Dlaczego const { total } = useCart() psuje reaktywność, a storeToRefs nie?',
            en: 'Why does const { total } = useCart() break reactivity while storeToRefs does not?'
          },
          options: [
            { pl: 'Bo destrukturyzacja czyta wartość z proxy raz, a storeToRefs zwraca refy', en: 'Because destructuring reads the value off the proxy once, while storeToRefs returns refs' },
            { pl: 'Bo gettery są leniwe i wymagają jawnego wywołania', en: 'Because getters are lazy and need an explicit call' },
            { pl: 'Bo storeToRefs tworzy nowy watcher dla każdego pola', en: 'Because storeToRefs creates a watcher for each field' },
            { pl: 'Bo destrukturyzacja jest zabroniona na obiektach reactive w trybie strict', en: 'Because destructuring reactive objects is forbidden in strict mode' }
          ],
          correct: 0,
          explain: {
            pl: 'Store jest reaktywnym proxy - destrukturyzacja kopiuje bieżącą wartość i tracisz połączenie. storeToRefs opakowuje stan i gettery w refy, które dalej śledzą zmiany.',
            en: 'A store is a reactive proxy - destructuring copies the current value and drops the link. storeToRefs wraps state and getters into refs that keep tracking.'
          }
        },
        {
          q: {
            pl: 'Piszesz setup store i chcesz metodę $reset(). Co jest prawdą?',
            en: 'You write a setup store and want a $reset() method. What is true?'
          },
          options: [
            { pl: '$reset działa zawsze, to część API każdego store', en: '$reset always works, it is part of every store API' },
            { pl: '$reset wymaga włączenia flagi w createPinia()', en: '$reset needs a flag enabled in createPinia()' },
            { pl: '$reset nie istnieje w setup store - trzeba go dopisać samemu lub pluginem', en: '$reset does not exist in a setup store - you add it yourself or via a plugin' },
            { pl: '$reset istnieje, ale czyści też gettery', en: '$reset exists but also clears getters' }
          ],
          correct: 2,
          explain: {
            pl: 'Pinia potrafi zresetować stan tylko wtedy, gdy zna fabrykę state(), czyli w options store. W setup store dodajesz własną akcję reset albo plugin, który podmienia $state.',
            en: 'Pinia can reset state only when it knows the state() factory, i.e. in options stores. In a setup store you add your own reset action or a plugin that replaces $state.'
          }
        },
        {
          q: {
            pl: 'Zapis koszyka do localStorage przez store.$subscribe w komponencie CartDrawer działa tylko wtedy, gdy szuflada jest otwarta. Dlaczego?',
            en: 'Persisting the cart to localStorage via store.$subscribe inside CartDrawer only works while the drawer is open. Why?'
          },
          options: [
            { pl: 'localStorage jest blokowany, gdy komponent jest odmontowany', en: 'localStorage is blocked while the component is unmounted' },
            { pl: '$subscribe wywołany w komponencie jest domyślnie usuwany przy unmount - potrzebne detached: true', en: 'A $subscribe registered in a component is removed on unmount by default - it needs detached: true' },
            { pl: '$subscribe reaguje tylko na $patch, a nie na bezpośrednie mutacje', en: '$subscribe only fires for $patch, not for direct mutations' },
            { pl: 'Store jest niszczony razem z pierwszym komponentem, który go użył', en: 'The store is destroyed together with the first component that used it' }
          ],
          correct: 1,
          explain: {
            pl: 'Subskrypcja jest domyślnie związana z instancją komponentu i znika przy jego unmount. Do persystencji i telemetrii rejestruj ją z { detached: true } albo w pluginie Pinii.',
            en: 'The subscription is bound to the component instance and dies with it on unmount. For persistence and telemetry register it with { detached: true } or from a Pinia plugin.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'pinia-advanced-plugins',
      title: {
        pl: 'Pinia zaawansowana: pluginy, SSR, testy',
        en: 'Advanced Pinia: plugins, SSR, testing'
      },
      minutes: 12,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">A plugin runs once per store, at creation time</text>' +
          '<rect x="20" y="46" width="180" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="110" y="80" fill="var(--text)" font-size="14" text-anchor="middle">useCart()</text>' +
          '<text x="110" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">first call</text>' +
          '<path d="M200 86 L246 86" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M250 86 L238 79 L238 93 z" fill="var(--muted)"/>' +
          '<rect x="252" y="46" width="180" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="342" y="80" fill="var(--accent)" font-size="14" text-anchor="middle">store created</text>' +
          '<text x="342" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">in effectScope</text>' +
          '<path d="M342 126 L342 168" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M342 172 L335 160 L349 160 z" fill="var(--muted)"/>' +
          '<rect x="120" y="176" width="440" height="130" rx="14" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="340" y="202" fill="var(--accent2)" font-size="14" text-anchor="middle">pinia.use(context) - the plugin chain</text>' +
          '<rect x="140" y="216" width="130" height="72" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="205" y="244" fill="var(--text)" font-size="13" text-anchor="middle">persist</text>' +
          '<text x="205" y="266" fill="var(--muted)" font-size="13" text-anchor="middle">$subscribe</text>' +
          '<rect x="284" y="216" width="130" height="72" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="349" y="244" fill="var(--text)" font-size="13" text-anchor="middle">telemetry</text>' +
          '<text x="349" y="266" fill="var(--muted)" font-size="13" text-anchor="middle">$onAction</text>' +
          '<rect x="428" y="216" width="130" height="72" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="493" y="244" fill="var(--text)" font-size="13" text-anchor="middle">inject</text>' +
          '<text x="493" y="266" fill="var(--muted)" font-size="13" text-anchor="middle">return { api }</text>' +
          '<path d="M340 306 L340 340" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M340 344 L333 332 L347 332 z" fill="var(--muted)"/>' +
          '<rect x="120" y="348" width="440" height="54" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="340" y="380" fill="var(--ok)" font-size="14" text-anchor="middle">augmented store handed to the caller</text>' +
          '</svg>',
        caption: {
          pl: 'Plugin Pinii dostaje kontekst każdego nowo tworzonego store i może dołożyć właściwości, subskrypcje albo wstrzyknąć zależności.',
          en: 'A Pinia plugin receives the context of every newly created store and can add properties, subscriptions or inject dependencies.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wróćmy do biurowych lodówek. Wyobraź sobie, że szef mówi: od dziś każda nowa lodówka, którą wstawimy do biura, dostaje trzy rzeczy - naklejkę z nazwą, mały notes na drzwiach, gdzie zapisuje się każde otwarcie, i termometr.</p><p>Nikt nie musi tego pamiętać przy każdej lodówce z osobna. To jest jedna zasada, ogłoszona raz, która sama dokłada się do wszystkiego, co nowe.</p><p>W Pinii ta zasada nazywa się pluginem. Piszesz ją raz i od tej pory każdy nowy magazyn danych dostaje na przykład automatyczne zapisywanie na dysku, żeby po zamknięciu strony nic nie znikło.</p><p>Jest jeszcze druga sztuczka. Czasem obiad jest gotowany w kuchni na górze (serwer), a jedzony na dole (przeglądarka). Trzeba przenieść zawartość lodówki na dół tak, żeby nic się nie wylało. To przenoszenie ma swoją nazwę i osobne zasady - i o nie właśnie chodzi w tej lekcji.</p>',
          en: '<p>Back to the office fridges. Imagine the boss announces: from today every new fridge we bring in gets three things - a name sticker, a small notepad on the door where every opening is logged, and a thermometer.</p><p>Nobody has to remember this fridge by fridge. It is one rule, announced once, that attaches itself to everything new.</p><p>In Pinia that rule is called a plugin. You write it once and from then on every new data store gets, for example, automatic saving to disk so nothing vanishes when the page closes.</p><p>There is a second trick. Sometimes lunch is cooked in the upstairs kitchen (the server) and eaten downstairs (the browser). The contents of the fridge have to be carried down without spilling. That carrying has a name and its own rules - and that is what this lesson is really about.</p>'
        },
        school: {
          pl: '<p>Plugin Pinii to funkcja, którą rejestrujesz przez <code>pinia.use()</code>. Uruchamia się raz dla każdego <em>tworzonego</em> store i dostaje kontekst: <code>store</code>, <code>options</code> (to, co przekazano do <code>defineStore</code>), <code>app</code> i samą instancję <code>pinia</code>.</p><pre><code>pinia.use(({ store, options }) =&gt; {\n  if (!options.persist) return\n  const key = "app:" + store.$id\n  const saved = localStorage.getItem(key)\n  if (saved) store.$patch(JSON.parse(saved))\n  store.$subscribe((_m, state) =&gt; {\n    localStorage.setItem(key, JSON.stringify(state))\n  }, { detached: true })\n})</code></pre><p>Wszystko, co plugin zwróci jako obiekt, jest dopinane do store - tak dodaje się wspólne API, na przykład klienta HTTP albo router. Właściwości dopisane przez <code>store.$x = ...</code> też działają, ale zwracany obiekt jest lepiej widoczny w devtools i łatwiej go otypować.</p><p>Do typów służy rozszerzenie interfejsu:</p><pre><code>declare module "pinia" {\n  interface PiniaCustomProperties { api: ApiClient }\n  interface DefineStoreOptionsBase&lt;S, Store&gt; { persist?: boolean }\n}</code></pre><p>Drugi duży temat to SSR. Na serwerze każdy request musi mieć własną Pinię - inaczej stan jednego użytkownika wycieknie do drugiego. Nuxt robi to za ciebie modułem <code>@pinia/nuxt</code>. W ręcznym SSR tworzysz Pinię per request, serializujesz <code>pinia.state.value</code> do HTML, a w kliencie robisz <code>pinia.state.value = window.__PINIA__</code> <em>przed</em> montowaniem aplikacji.</p><p>W testach nie mockuj modułu store. Zamiast tego podaj <code>createTestingPinia({ initialState })</code> - dostajesz prawdziwe gettery, zaślepione akcje i możliwość asercji, że akcja została wywołana.</p>',
          en: '<p>A Pinia plugin is a function registered with <code>pinia.use()</code>. It runs once per <em>created</em> store and receives a context: <code>store</code>, <code>options</code> (whatever was passed to <code>defineStore</code>), <code>app</code> and the <code>pinia</code> instance itself.</p><pre><code>pinia.use(({ store, options }) =&gt; {\n  if (!options.persist) return\n  const key = "app:" + store.$id\n  const saved = localStorage.getItem(key)\n  if (saved) store.$patch(JSON.parse(saved))\n  store.$subscribe((_m, state) =&gt; {\n    localStorage.setItem(key, JSON.stringify(state))\n  }, { detached: true })\n})</code></pre><p>Anything the plugin returns as an object is merged onto the store - that is how you add shared APIs such as an HTTP client or the router. Assigning <code>store.$x = ...</code> works too, but the returned object shows up better in devtools and is easier to type.</p><p>Typing is done by augmenting interfaces:</p><pre><code>declare module "pinia" {\n  interface PiniaCustomProperties { api: ApiClient }\n  interface DefineStoreOptionsBase&lt;S, Store&gt; { persist?: boolean }\n}</code></pre><p>The second big topic is SSR. On the server every request needs its own Pinia - otherwise one user state leaks into another. Nuxt handles that for you through <code>@pinia/nuxt</code>. In a hand-rolled SSR setup you create a Pinia per request, serialize <code>pinia.state.value</code> into the HTML, and on the client do <code>pinia.state.value = window.__PINIA__</code> <em>before</em> mounting the app.</p><p>In tests, do not mock the store module. Pass <code>createTestingPinia({ initialState })</code> instead - you get real getters, stubbed actions and the ability to assert that an action was called.</p>'
        },
        pro: {
          pl: '<p>Kolejność wykonania jest tu wszystkim. Plugin uruchamia się <strong>po</strong> zbudowaniu store, a <strong>przed</strong> zwróceniem go z <code>useStore()</code>, wewnątrz <code>effectScope</code> tego store. To znaczy, że <code>watch</code> albo <code>computed</code> utworzone w pluginie są automatycznie sprzątane przez <code>store.$dispose()</code> - i to jedyny mechanizm, który chroni cię przed wyciekiem watcherów w długo żyjącej sesji SPA.</p><p>Pułapki, które kosztują wieczory:</p><ul><li><strong>Plugin nie widzi store utworzonych wcześniej.</strong> Rejestruj wszystkie pluginy zaraz po <code>createPinia()</code>, przed <code>app.use(pinia)</code> i przed jakimkolwiek <code>useStore()</code> na poziomie modułu.</li><li><strong>Persystencja na SSR.</strong> <code>localStorage</code> nie istnieje na serwerze. Plugin persystencji musi mieć strażnika <code>import.meta.client</code> (albo <code>typeof window !== "undefined"</code>), inaczej build Nuxta wywali się przy prerenderze.</li><li><strong>Hydracja i nadpisanie stanu.</strong> Jeśli plugin czyta localStorage synchronicznie przy tworzeniu store, a serwer wyrenderował inne dane, dostaniesz hydration mismatch. Bezpieczny wzorzec to odczyt w <code>onMounted</code> lub w pluginie Nuxta z <code>mode: "client"</code>.</li><li><strong>Partial persist.</strong> Serializuj tylko podzbiór: <code>{ paths: ["items", "coupon"] }</code>. Token sesji w localStorage to podatność na XSS, a nie funkcjonalność.</li></ul><pre><code>// SSR w skrócie - jedna Pinia na request\nconst pinia = createPinia()\napp.use(pinia)\nawait renderToString(app)\nhtml += "&lt;script&gt;window.__PINIA__=" +\n  devalue(pinia.state.value) + "&lt;/script&gt;"\n\n// klient, przed app.mount()\nif (window.__PINIA__) pinia.state.value = window.__PINIA__</code></pre><p>Użyj <code>devalue</code> zamiast <code>JSON.stringify</code>: obsługuje cykle, <code>Map</code>, <code>Set</code>, <code>Date</code> i - co ważniejsze - escapuje <code>&lt;/script&gt;</code>, czyli zamyka klasyczną dziurę XSS w payloadzie SSR. Nuxt robi dokładnie to.</p><p>Wzorce, które sprawdzają się w design systemie i dużej aplikacji: fabryka store dla wielu instancji (<code>defineStore("wizard-" + id, ...)</code>) plus <code>$dispose()</code> przy zamknięciu kreatora; plugin dopinający <code>store.$hydrated</code>, żeby komponenty wiedziały, że stan jest już prawdziwy; oraz <code>$onAction</code> jako jedno miejsce na tracing - opakuj <code>after</code> i <code>onError</code> w span OpenTelemetry i masz pełną oś czasu akcji bez zaśmiecania kodu domenowego. Do audytu wydajności pamiętaj, że gettery Pinii to zwykłe <code>computed</code>: są cache-owane per store, ale getter przyjmujący argument (<code>(id) =&gt; ...</code>) zwraca funkcję i traci cache - w listach na tysiąc pozycji to widać na wykresie flame.</p>',
          en: '<p>Ordering is everything here. A plugin runs <strong>after</strong> the store is built and <strong>before</strong> <code>useStore()</code> returns it, inside that store <code>effectScope</code>. This means a <code>watch</code> or <code>computed</code> created in a plugin is cleaned up by <code>store.$dispose()</code> - and that is the only mechanism keeping watcher leaks out of a long-lived SPA session.</p><p>Traps that cost evenings:</p><ul><li><strong>A plugin cannot see stores created before it.</strong> Register every plugin right after <code>createPinia()</code>, before <code>app.use(pinia)</code> and before any module-level <code>useStore()</code>.</li><li><strong>Persistence under SSR.</strong> <code>localStorage</code> does not exist on the server. A persistence plugin needs an <code>import.meta.client</code> guard (or <code>typeof window !== "undefined"</code>), otherwise the Nuxt prerender build explodes.</li><li><strong>Hydration versus restored state.</strong> If the plugin synchronously reads localStorage at store creation while the server rendered different data, you get a hydration mismatch. The safe pattern is reading in <code>onMounted</code> or in a Nuxt plugin with <code>mode: "client"</code>.</li><li><strong>Partial persist.</strong> Serialize a subset only: <code>{ paths: ["items", "coupon"] }</code>. A session token in localStorage is an XSS liability, not a feature.</li></ul><pre><code>// SSR in a nutshell - one Pinia per request\nconst pinia = createPinia()\napp.use(pinia)\nawait renderToString(app)\nhtml += "&lt;script&gt;window.__PINIA__=" +\n  devalue(pinia.state.value) + "&lt;/script&gt;"\n\n// client, before app.mount()\nif (window.__PINIA__) pinia.state.value = window.__PINIA__</code></pre><p>Use <code>devalue</code> rather than <code>JSON.stringify</code>: it handles cycles, <code>Map</code>, <code>Set</code>, <code>Date</code> and - more importantly - escapes <code>&lt;/script&gt;</code>, closing the classic SSR payload XSS hole. Nuxt does exactly this.</p><p>Patterns that pay off in a design system and a large app: a store factory for multiple instances (<code>defineStore("wizard-" + id, ...)</code>) plus <code>$dispose()</code> when the wizard closes; a plugin attaching <code>store.$hydrated</code> so components know the state is real; and <code>$onAction</code> as the single place for tracing - wrap <code>after</code> and <code>onError</code> in an OpenTelemetry span and you get a full action timeline without polluting domain code. For performance audits remember Pinia getters are plain <code>computed</code>: cached per store, but a getter taking an argument (<code>(id) =&gt; ...</code>) returns a function and loses caching - on thousand-row lists that shows up in the flame chart.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kiedy uruchamia się plugin Pinii?',
            en: 'When does a Pinia plugin run?'
          },
          options: [
            { pl: 'Raz przy starcie aplikacji, dla wszystkich zadeklarowanych store', en: 'Once at app start, for all declared stores' },
            { pl: 'Przy każdej mutacji stanu', en: 'On every state mutation' },
            { pl: 'Raz dla każdego store, w momencie jego tworzenia', en: 'Once per store, at the moment it is created' },
            { pl: 'Przy każdym renderze komponentu używającego store', en: 'On every render of a component using the store' }
          ],
          correct: 2,
          explain: {
            pl: 'Store powstaje leniwie, a plugin odpala się dokładnie wtedy - po zbudowaniu store, a przed zwróceniem go z useStore().',
            en: 'Stores are created lazily and the plugin fires exactly then - after the store is built and before useStore() returns it.'
          }
        },
        {
          q: {
            pl: 'Dlaczego na SSR tworzy się nową Pinię dla każdego requestu?',
            en: 'Why do you create a fresh Pinia per request under SSR?'
          },
          options: [
            { pl: 'Żeby stan jednego użytkownika nie wyciekł do innego', en: 'So that one user state does not leak into another' },
            { pl: 'Bo Pinia nie umie działać w Node bez reinicjalizacji', en: 'Because Pinia cannot run in Node without reinitialisation' },
            { pl: 'Żeby przyspieszyć renderToString przez mniejszy graf reaktywności', en: 'To speed up renderToString with a smaller reactivity graph' },
            { pl: 'Bo tak wymaga protokół hydracji Vue', en: 'Because the Vue hydration protocol requires it' }
          ],
          correct: 0,
          explain: {
            pl: 'Moduł na serwerze jest współdzielony między requestami, więc singleton store stałby się globalnym stanem wszystkich użytkowników naraz - klasyczny wyciek danych.',
            en: 'Server modules are shared across requests, so a singleton store would become global state for all users at once - a classic data leak.'
          }
        },
        {
          q: {
            pl: 'Plugin persystencji zapisuje stan, ale przy prerenderze Nuxta build się wywala. Najbardziej prawdopodobna przyczyna?',
            en: 'Your persistence plugin works but the Nuxt prerender build crashes. Most likely cause?'
          },
          options: [
            { pl: 'JSON.stringify nie radzi sobie z proxy Pinii', en: 'JSON.stringify cannot handle the Pinia proxy' },
            { pl: 'Plugin sięga po localStorage, którego nie ma w środowisku serwerowym', en: 'The plugin touches localStorage, which does not exist on the server' },
            { pl: '$subscribe jest niedostępne poza komponentem', en: '$subscribe is unavailable outside a component' },
            { pl: 'Pluginy Pinii nie działają razem z modułem @pinia/nuxt', en: 'Pinia plugins do not work with the @pinia/nuxt module' }
          ],
          correct: 1,
          explain: {
            pl: 'Prerender uruchamia kod w Node. Każdy dostęp do window, document czy localStorage musi być za strażnikiem import.meta.client albo w pluginie client-only.',
            en: 'Prerendering runs the code in Node. Any access to window, document or localStorage must sit behind an import.meta.client guard or in a client-only plugin.'
          }
        },
        {
          q: {
            pl: 'Dlaczego payload SSR serializuje się przez devalue, a nie JSON.stringify?',
            en: 'Why is the SSR payload serialized with devalue rather than JSON.stringify?'
          },
          options: [
            { pl: 'Bo devalue jest szybszy o rząd wielkości', en: 'Because devalue is an order of magnitude faster' },
            { pl: 'Bo JSON.stringify pomija gettery', en: 'Because JSON.stringify skips getters' },
            { pl: 'Bo devalue obsługuje cykle i typy jak Map/Date oraz escapuje zamknięcie tagu script', en: 'Because devalue handles cycles and types like Map/Date and escapes the closing script tag' },
            { pl: 'Bo tylko devalue potrafi zapisać refy z zachowaniem reaktywności', en: 'Because only devalue can serialize refs keeping reactivity' }
          ],
          correct: 2,
          explain: {
            pl: 'Wstrzyknięty JSON z treścią zamykającą tag script to gotowy XSS, a zwykły JSON gubi Date, Map i cykle. devalue rozwiązuje oba problemy - dlatego używa go Nuxt.',
            en: 'Injected JSON containing a closing script tag is a ready-made XSS, and plain JSON loses Date, Map and cycles. devalue fixes both - which is why Nuxt uses it.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'vue-router-essentials',
      title: {
        pl: 'Vue Router: matcher, zagnieżdżenia, reużycie',
        en: 'Vue Router: matcher, nesting, reuse'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">/orders/42/items?page=2 - from URL to nested views</text>' +
          '<rect x="20" y="44" width="600" height="50" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="75" fill="var(--text)" font-size="14" text-anchor="middle">URL string</text>' +
          '<path d="M320 94 L320 128" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M320 132 L313 120 L327 120 z" fill="var(--muted)"/>' +
          '<rect x="20" y="136" width="600" height="66" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="164" fill="var(--accent)" font-size="14" text-anchor="middle">matcher - ranked path parsing</text>' +
          '<text x="320" y="188" fill="var(--muted)" font-size="13" text-anchor="middle">static beats param beats wildcard</text>' +
          '<path d="M320 202 L320 236" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M320 240 L313 228 L327 228 z" fill="var(--muted)"/>' +
          '<rect x="20" y="244" width="600" height="76" rx="12" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="272" fill="var(--accent2)" font-size="14" text-anchor="middle">route.matched = [ OrdersLayout, OrderPage, ItemsTab ]</text>' +
          '<text x="320" y="298" fill="var(--muted)" font-size="13" text-anchor="middle">params { id: 42 } + query { page: 2 }</text>' +
          '<path d="M320 320 L320 350" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M320 354 L313 342 L327 342 z" fill="var(--muted)"/>' +
          '<rect x="60" y="358" width="520" height="62" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="80" y="372" width="480" height="34" rx="9" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="100" y="380" width="440" height="18" rx="7" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="394" fill="var(--ok)" font-size="13" text-anchor="middle">RouterView depth 0 - 1 - 2</text>' +
          '</svg>',
        caption: {
          pl: 'Matcher zamienia URL na uporządkowaną listę dopasowanych rekordów, a każdy poziom listy zasila kolejny zagnieżdżony RouterView.',
          en: 'The matcher turns the URL into an ordered list of matched records, and each level of that list feeds the next nested RouterView.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Router to szatniarz w wielkim budynku. Podajesz mu numerek - adres strony - a on wie dokładnie, którą kurtkę wydać i z której szafy.</p><p>Ale ten budynek ma piętra. Numerek nie wskazuje jednej rzeczy, tylko drogę: najpierw skrzydło budynku, potem piętro, potem konkretny pokój. Dlatego wynik to nie jedna kurtka, tylko cała lista przystanków po drodze.</p><p>Każdy przystanek ma w ścianie dziurę, w którą wpada następny przystanek. Skrzydło pokazuje piętra, piętro pokazuje pokoje. Jak zmienisz tylko pokój, cała reszta zostaje na miejscu - nikt nie przebudowuje piętra, bo poszedłeś do sąsiedniego biura.</p><p>I ostatnia rzecz: jeśli numerek pasuje do kilku szaf naraz, szatniarz wybiera tę najbardziej konkretną. Szafa z twoim imieniem wygrywa z szafą podpisaną cokolwiek.</p>',
          en: '<p>The router is the cloakroom attendant in a huge building. You hand over a ticket - the page address - and they know exactly which coat to fetch and from which locker.</p><p>But this building has floors. The ticket does not point at one thing, it describes a route: first the wing, then the floor, then the room. So the answer is not one coat but a whole list of stops along the way.</p><p>Every stop has a hole in the wall where the next stop appears. The wing shows floors, the floor shows rooms. Change only the room and everything else stays put - nobody rebuilds the floor because you walked into the office next door.</p><p>One last thing: if a ticket matches several lockers at once, the attendant picks the most specific one. A locker with your name beats a locker labelled anything.</p>'
        },
        school: {
          pl: '<p>Vue Router 4 nie porównuje ścieżek po kolei aż coś trafi. Buduje matcher, który każdemu wzorcowi przypisuje <em>ranking</em>: segment statyczny jest ważniejszy od parametru, parametr od parametru opcjonalnego, a wildcard <code>/:path(.*)</code> jest zawsze najsłabszy. Dlatego kolejność definicji tras w tablicy prawie nigdy nie ma znaczenia - liczy się konkretność wzorca.</p><pre><code>const routes = [\n  { path: "/orders", component: OrdersLayout, children: [\n    { path: "", name: "orders", component: OrdersList },\n    { path: ":id", component: OrderPage, props: true, children: [\n      { path: "items", name: "order-items", component: ItemsTab }\n    ]}\n  ]},\n  { path: "/:pathMatch(.*)*", component: NotFound }\n]</code></pre><p>Zagnieżdżenie działa tak: dopasowanie daje tablicę <code>route.matched</code>, a każdy <code>&lt;RouterView&gt;</code> renderuje komponent ze swojego poziomu zagnieżdżenia. Layout zostaje zamontowany raz i przeżywa nawigacje między dziećmi.</p><p>Cztery rzeczy, które w praktyce gryzą najczęściej:</p><ul><li><strong>Reużycie komponentu.</strong> Przejście z <code>/orders/1</code> na <code>/orders/2</code> nie tworzy nowej instancji - <code>onMounted</code> się nie wywoła. Albo obserwuj <code>() =&gt; route.params.id</code>, albo wymuś remount przez <code>&lt;RouterView :key="route.fullPath" /&gt;</code> (świadomie, bo tracisz stan).</li><li><strong>Params są stringami.</strong> <code>route.params.id</code> to zawsze tekst, nawet gdy w URL widzisz liczbę. Waliduj na wejściu, najlepiej razem z <code>props: route =&gt; ({ id: Number(route.params.id) })</code>.</li><li><strong>Query to nie params.</strong> Zmiana query nie zmienia dopasowanego rekordu, ale jest reaktywna - i domyślnie nie wywoła <code>beforeRouteUpdate</code> inaczej niż params.</li><li><strong>Leniwe trasy.</strong> <code>component: () =&gt; import("./OrderPage.vue")</code> daje osobny chunk na trasę - najprostszy zysk wydajnościowy w całej aplikacji.</li></ul>',
          en: '<p>Vue Router 4 does not walk paths in order until something sticks. It builds a matcher that gives every pattern a <em>rank</em>: a static segment outranks a param, a param outranks an optional param, and the wildcard <code>/:path(.*)</code> always ranks last. That is why the order of routes in the array almost never matters - specificity does.</p><pre><code>const routes = [\n  { path: "/orders", component: OrdersLayout, children: [\n    { path: "", name: "orders", component: OrdersList },\n    { path: ":id", component: OrderPage, props: true, children: [\n      { path: "items", name: "order-items", component: ItemsTab }\n    ]}\n  ]},\n  { path: "/:pathMatch(.*)*", component: NotFound }\n]</code></pre><p>Nesting works like this: a match yields the <code>route.matched</code> array, and each <code>&lt;RouterView&gt;</code> renders the component from its own nesting depth. The layout mounts once and survives navigations between its children.</p><p>Four things that bite most often in practice:</p><ul><li><strong>Component reuse.</strong> Going from <code>/orders/1</code> to <code>/orders/2</code> does not create a new instance - <code>onMounted</code> will not fire. Either watch <code>() =&gt; route.params.id</code>, or force a remount with <code>&lt;RouterView :key="route.fullPath" /&gt;</code> (deliberately, because you lose state).</li><li><strong>Params are strings.</strong> <code>route.params.id</code> is always text even when the URL shows a number. Validate at the boundary, ideally together with <code>props: route =&gt; ({ id: Number(route.params.id) })</code>.</li><li><strong>Query is not params.</strong> Changing the query does not change the matched record, yet it is reactive - and it does not trigger <code>beforeRouteUpdate</code> the same way params do.</li><li><strong>Lazy routes.</strong> <code>component: () =&gt; import("./OrderPage.vue")</code> gives a per-route chunk - the cheapest performance win in the whole app.</li></ul>'
        },
        pro: {
          pl: '<p>Matcher to <code>createRouterMatcher</code>: każdy <code>path</code> jest tokenizowany i dostaje wektor score porównywany leksykograficznie. Trasa nazwana ma jedno ważne zastosowanie poza wygodą - <code>router.resolve({ name, params })</code> generuje URL bez sklejania stringów, więc zmiana wzorca ścieżki nie zmusza cię do grepowania po całej aplikacji. W dużym projekcie warto do tego dołożyć typowane trasy (<code>unplugin-vue-router</code> albo typed routes w Nuxt 3), bo literówka w nazwie trasy jest błędem runtime, którego nie wyłapie żaden test jednostkowy komponentu.</p><p>Model obiektu route: <code>useRoute()</code> zwraca reaktywne proxy bieżącej lokalizacji, <em>nie</em> ref. Destrukturyzacja (<code>const { params } = useRoute()</code>) zrywa reaktywność dokładnie tak jak w Pinii. Kluczowe pola: <code>path</code>, <code>fullPath</code> (z query i hashem), <code>params</code>, <code>query</code>, <code>hash</code>, <code>meta</code> (scalone ze wszystkich rekordów w <code>matched</code>) oraz <code>matched</code>.</p><pre><code>const router = createRouter({\n  history: createWebHistory(import.meta.env.BASE_URL),\n  routes,\n  scrollBehavior(to, from, saved) {\n    if (saved) return saved                  // back/forward\n    if (to.hash) return { el: to.hash, behavior: "smooth" }\n    if (to.path === from.path) return {}     // tylko query - nie skacz\n    return { top: 0 }\n  }\n})</code></pre><p>Rzeczy, które w produkcji robią różnicę:</p><ul><li><strong>History mode i base.</strong> <code>createWebHistory(base)</code> wymaga fallbacku serwera na <code>index.html</code>; brak konfiguracji to 404 po odświeżeniu na podstronie. Aplikacja pod subpathem musi mieć base zgodny z tym, co poda bundler, inaczej assety i nawigacja rozjadą się dopiero na środowisku, nie lokalnie.</li><li><strong>Błąd ładowania chunku.</strong> Po deployu stare hashe znikają i leniwy import trasy rzuca. Podepnij <code>router.onError</code>, wykryj komunikat o dynamicznym imporcie i zrób twardy <code>location.assign(to.fullPath)</code> - to standardowy sposób na przeżycie deployu podczas otwartej sesji użytkownika.</li><li><strong>Widoki nazwane.</strong> <code>components: { default: Body, aside: Filters }</code> plus dwa <code>&lt;RouterView name="aside"&gt;</code> to czysty sposób na layout z panelem bocznym bez teleportów i providów.</li><li><strong>Alias vs redirect.</strong> Alias zostawia URL w spokoju (dwa adresy, jeden rekord), redirect zmienia adres i historię. Do zachowania starych linków po refaktorze IA używaj redirectów, do wsparcia dwóch nazw sekcji - aliasu.</li><li><strong>router.push zwraca Promise.</strong> Rozwiązuje się <code>undefined</code> przy sukcesie albo <code>NavigationFailure</code> przy anulowaniu lub duplikacie. Cicho ignorowana odmowa nawigacji to najczęstsze źródło zgłoszeń, że przycisk czasem nic nie robi.</li></ul>',
          en: '<p>The matcher is <code>createRouterMatcher</code>: every <code>path</code> is tokenized and gets a score vector compared lexicographically. Named routes have one important use beyond convenience - <code>router.resolve({ name, params })</code> builds URLs without string concatenation, so changing a path pattern does not force you to grep the whole app. In a large project add typed routes on top (<code>unplugin-vue-router</code> or Nuxt 3 typed routes), because a typo in a route name is a runtime error no component unit test will catch.</p><p>The route object model: <code>useRoute()</code> returns a reactive proxy of the current location, <em>not</em> a ref. Destructuring it (<code>const { params } = useRoute()</code>) breaks reactivity exactly like in Pinia. Key fields: <code>path</code>, <code>fullPath</code> (query and hash included), <code>params</code>, <code>query</code>, <code>hash</code>, <code>meta</code> (merged across all records in <code>matched</code>) and <code>matched</code>.</p><pre><code>const router = createRouter({\n  history: createWebHistory(import.meta.env.BASE_URL),\n  routes,\n  scrollBehavior(to, from, saved) {\n    if (saved) return saved                  // back/forward\n    if (to.hash) return { el: to.hash, behavior: "smooth" }\n    if (to.path === from.path) return {}     // query only - do not jump\n    return { top: 0 }\n  }\n})</code></pre><p>Things that matter in production:</p><ul><li><strong>History mode and base.</strong> <code>createWebHistory(base)</code> needs a server fallback to <code>index.html</code>; without it a refresh on a deep link is a 404. An app served from a subpath must use a base matching the bundler config, or assets and navigation break on the environment rather than locally.</li><li><strong>Chunk load failures.</strong> After a deploy the old hashes disappear and a lazy route import throws. Hook <code>router.onError</code>, detect the dynamic import message and do a hard <code>location.assign(to.fullPath)</code> - the standard way to survive a deploy during an open user session.</li><li><strong>Named views.</strong> <code>components: { default: Body, aside: Filters }</code> plus two <code>&lt;RouterView name="aside"&gt;</code> is the clean way to build a sidebar layout without teleports or provides.</li><li><strong>Alias versus redirect.</strong> An alias leaves the URL alone (two addresses, one record); a redirect rewrites the address and the history entry. Use redirects to keep old links alive after an IA refactor, aliases to support two names for one section.</li><li><strong>router.push returns a Promise.</strong> It resolves to <code>undefined</code> on success or a <code>NavigationFailure</code> when the navigation was aborted or duplicated. A silently swallowed failure is the single most common source of "the button sometimes does nothing" tickets.</li></ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co zawiera route.matched?',
            en: 'What does route.matched contain?'
          },
          options: [
            { pl: 'Wszystkie trasy, które pasowałyby do URL, posortowane po rankingu', en: 'All routes that could match the URL, sorted by rank' },
            { pl: 'Historię ostatnich nawigacji', en: 'The history of recent navigations' },
            { pl: 'Uporządkowaną listę rekordów od korzenia do liścia dla bieżącego dopasowania', en: 'The ordered list of records from root to leaf for the current match' },
            { pl: 'Listę parametrów wyciągniętych z URL', en: 'The list of params extracted from the URL' }
          ],
          correct: 2,
          explain: {
            pl: 'matched to ścieżka w drzewie tras: rodzic, dziecko, wnuk. Każdy poziom zasila kolejny zagnieżdżony RouterView, a meta ze wszystkich poziomów są scalane.',
            en: 'matched is the path through the route tree: parent, child, grandchild. Each level feeds the next nested RouterView, and meta from all levels is merged.'
          }
        },
        {
          q: {
            pl: 'Przechodzisz z /orders/1 na /orders/2 i onMounted nie odpala. Dlaczego?',
            en: 'You navigate from /orders/1 to /orders/2 and onMounted does not fire. Why?'
          },
          options: [
            { pl: 'Bo Vue Router cachuje komponenty w KeepAlive domyślnie', en: 'Because Vue Router keeps components in KeepAlive by default' },
            { pl: 'Bo ten sam rekord trasy = ta sama instancja komponentu, zmieniają się tylko params', en: 'Because the same route record means the same component instance, only params change' },
            { pl: 'Bo onMounted działa tylko przy pierwszym renderze aplikacji', en: 'Because onMounted only runs on the first render of the app' },
            { pl: 'Bo nawigacja z tym samym prefiksem ścieżki jest traktowana jak zmiana query', en: 'Because navigating within the same path prefix is treated as a query change' }
          ],
          correct: 1,
          explain: {
            pl: 'Router reużywa instancję, gdy dopasowany rekord się nie zmienia. Reaguj przez watch na params albo świadomie wymuś remount kluczem na RouterView.',
            en: 'The router reuses the instance when the matched record does not change. React with a watch on params, or deliberately force a remount with a key on RouterView.'
          }
        },
        {
          q: {
            pl: 'Masz trasy /users/new i /users/:id. Czy kolejność w tablicy routes decyduje o dopasowaniu /users/new?',
            en: 'You have /users/new and /users/:id. Does their order in the routes array decide how /users/new matches?'
          },
          options: [
            { pl: 'Tak, wygrywa pierwsza pasująca trasa w tablicy', en: 'Yes, the first matching route in the array wins' },
            { pl: 'Nie - matcher rankuje wzorce i segment statyczny wygrywa z parametrem', en: 'No - the matcher ranks patterns and a static segment outranks a param' },
            { pl: 'Tak, ale tylko w trybie history', en: 'Yes, but only in history mode' },
            { pl: 'Nie, bo obie trasy zostaną dopasowane jednocześnie', en: 'No, because both routes match simultaneously' }
          ],
          correct: 1,
          explain: {
            pl: 'Vue Router 4 liczy score wzorca: statyczny segment bije parametr, parametr bije wildcard. Dlatego /users/new trafi we właściwą trasę niezależnie od kolejności.',
            en: 'Vue Router 4 scores patterns: a static segment beats a param, a param beats a wildcard. So /users/new hits the right route regardless of ordering.'
          }
        },
        {
          q: {
            pl: 'Po wdrożeniu nowej wersji użytkownicy z otwartą kartą dostają biały ekran przy wejściu w leniwie ładowaną trasę. Najlepsza reakcja?',
            en: 'After a deploy, users with an open tab get a blank screen when entering a lazily loaded route. Best response?'
          },
          options: [
            { pl: 'Wyłączyć code splitting tras', en: 'Turn off route-level code splitting' },
            { pl: 'Dodać KeepAlive na RouterView', en: 'Add KeepAlive around RouterView' },
            { pl: 'Zwiększyć timeout defineAsyncComponent', en: 'Increase the defineAsyncComponent timeout' },
            { pl: 'Złapać router.onError na błędzie dynamicznego importu i przeładować stronę pod docelowy URL', en: 'Catch router.onError on the dynamic import failure and hard-reload to the target URL' }
          ],
          correct: 3,
          explain: {
            pl: 'Stare chunki znikają po deployu, więc import trasy rzuca. Twarde przeładowanie pobiera nowy manifest i użytkownik ląduje dokładnie tam, gdzie chciał.',
            en: 'Old chunks vanish after a deploy so the route import throws. A hard reload fetches the new manifest and lands the user exactly where they wanted to go.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'navigation-guards-data',
      title: {
        pl: 'Guardy nawigacji i pobieranie danych',
        en: 'Navigation guards and data fetching'
      },
      minutes: 13,
      diagram: {
        svg: '<svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Navigation resolution - every step may cancel or redirect</text>' +
          '<rect x="60" y="42" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="69" fill="var(--text)" font-size="14" text-anchor="middle">1. leave guards of the old route</text>' +
          '<rect x="60" y="94" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="121" fill="var(--accent)" font-size="14" text-anchor="middle">2. router.beforeEach - global gate</text>' +
          '<rect x="60" y="146" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="173" fill="var(--text)" font-size="14" text-anchor="middle">3. beforeRouteUpdate on reused components</text>' +
          '<rect x="60" y="198" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="225" fill="var(--text)" font-size="14" text-anchor="middle">4. beforeEnter of the route record</text>' +
          '<rect x="60" y="250" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="277" fill="var(--accent2)" font-size="14" text-anchor="middle">5. resolve async components</text>' +
          '<rect x="60" y="302" width="520" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="329" fill="var(--text)" font-size="14" text-anchor="middle">6. beforeRouteEnter + beforeResolve</text>' +
          '<rect x="60" y="354" width="520" height="42" rx="10" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="381" fill="var(--ok)" font-size="14" text-anchor="middle">7. URL changes, afterEach, DOM updated</text>' +
          '<path d="M596 60 L616 60 L616 378 L596 378" fill="none" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="606" y="424" fill="var(--err)" font-size="13" text-anchor="middle">abort</text>' +
          '<text x="20" y="440" fill="var(--muted)" font-size="13">Returning false or a location at any step ends this navigation.</text>' +
          '</svg>',
        caption: {
          pl: 'Nawigacja to potok kroków rozwiązywany asynchronicznie - URL zmienia się dopiero na końcu, a każdy krok może ją przerwać lub przekierować.',
          en: 'A navigation is a pipeline resolved asynchronously - the URL changes only at the end, and any step can abort or redirect it.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Prześledź jedną nawigację: gdzie czeka guard, kiedy leci fetch i co się dzieje, gdy w połowie użytkownik klika coś innego.',
          en: 'Follow one navigation: where the guard waits, when the fetch fires, and what happens when the user clicks something else halfway through.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 1 - the user clicks a link</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--accent)" font-size="14" text-anchor="middle">RouterLink</text>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">/orders/42</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="330" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">beforeEach</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">component</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--text)" font-size="15">/orders</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--text)" font-size="15">order list, still interactive</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">Nothing has changed yet - the old page is fully alive.</text>' +
              '</svg>',
            label: { pl: 'Klik - nawigacja startuje', en: 'Click - navigation starts' },
            note: {
              pl: 'Router dostaje zgłoszenie nawigacji. URL i ekran są nadal stare, bo nic jeszcze nie zostało rozstrzygnięte.',
              en: 'The router receives a navigation request. URL and screen are still the old ones, because nothing has been resolved yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 2 - the async guard blocks</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">RouterLink</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="330" y="78" fill="var(--warn)" font-size="14" text-anchor="middle">beforeEach</text>' +
              '<text x="330" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">await session</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">component</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--text)" font-size="15">/orders</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--warn)" font-size="15">still old page - user sees no feedback</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">A slow guard looks like a frozen UI. Show a top progress bar.</text>' +
              '</svg>',
            label: { pl: 'Guard czeka na sesję', en: 'The guard awaits the session' },
            note: {
              pl: 'Asynchroniczny beforeEach wstrzymuje całą nawigację. Bez paska postępu użytkownik widzi zamrożony interfejs i klika drugi raz.',
              en: 'An async beforeEach holds the whole navigation. Without a progress bar the user sees a frozen UI and clicks again.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 3 - route component chunk resolves</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">RouterLink</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="330" y="88" fill="var(--ok)" font-size="14" text-anchor="middle">guard passed</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--accent)" font-size="14" text-anchor="middle">component</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">chunk loaded</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--ok)" font-size="15">/orders/42</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--accent)" font-size="15">order page shell + skeleton</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">URL and shell commit first, data comes next.</text>' +
              '</svg>',
            label: { pl: 'Trasa wchodzi, dane jeszcze nie', en: 'Route commits, data does not' },
            note: {
              pl: 'Guardy przeszły, chunk się doładował, URL się zmienił. Komponent montuje szkielet i dopiero teraz startuje pobieranie danych.',
              en: 'Guards passed, the chunk loaded, the URL changed. The component mounts a skeleton and only now starts fetching data.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 4 - fetch in flight, user clicks again</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--err)" font-size="14" text-anchor="middle">new click</text>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">/orders/43</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="330" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">beforeEach</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--warn)" font-size="14" text-anchor="middle">fetch 42</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">still pending</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--text)" font-size="15">/orders/43</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--err)" font-size="15">two responses racing for one view</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">Slow response for 42 may land after the fast one for 43.</text>' +
              '</svg>',
            label: { pl: 'Wyścig dwóch odpowiedzi', en: 'Two responses race' },
            note: {
              pl: 'Komponent jest reużyty, więc drugi fetch startuje obok pierwszego. Wolniejsza odpowiedź dla 42 może nadpisać świeże dane 43.',
              en: 'The component is reused, so a second fetch starts alongside the first. The slower response for 42 can overwrite the fresh data for 43.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 5 - abort the stale request</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">watch params</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="330" y="78" fill="var(--err)" font-size="14" text-anchor="middle">onCleanup</text>' +
              '<text x="330" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">abort 42</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="530" y="88" fill="var(--accent)" font-size="14" text-anchor="middle">fetch 43</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--ok)" font-size="15">/orders/43</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--accent)" font-size="15">skeleton for 43 only</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">One in-flight request per view, keyed by params.</text>' +
              '</svg>',
            label: { pl: 'Stary request anulowany', en: 'Stale request aborted' },
            note: {
              pl: 'Watcher z onCleanup przerywa poprzedni fetch przez AbortController. W widoku żyje zawsze tylko jedno aktualne zapytanie.',
              en: 'A watcher with onCleanup aborts the previous fetch through AbortController. Only one current request lives in the view at a time.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 6 - settled state</text>' +
              '<rect x="20" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">watch params</text>' +
              '<rect x="240" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="330" y="88" fill="var(--muted)" font-size="14" text-anchor="middle">no pending</text>' +
              '<rect x="440" y="46" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="530" y="88" fill="var(--ok)" font-size="14" text-anchor="middle">data 43</text>' +
              '<rect x="20" y="150" width="600" height="90" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="180" fill="var(--muted)" font-size="13">URL bar</text>' +
              '<text x="40" y="212" fill="var(--ok)" font-size="15">/orders/43</text>' +
              '<rect x="20" y="264" width="600" height="90" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="294" fill="var(--muted)" font-size="13">Screen</text>' +
              '<text x="40" y="326" fill="var(--ok)" font-size="15">order 43 rendered, scroll restored</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">URL, data and scroll position finally agree.</text>' +
              '</svg>',
            label: { pl: 'Spójny stan końcowy', en: 'Consistent final state' },
            note: {
              pl: 'URL, dane i pozycja scrolla wreszcie mówią to samo. To jest właściwy warunek zaliczenia nawigacji, nie samo wywołanie push.',
              en: 'URL, data and scroll position finally agree. That, not the push call itself, is the real definition of a completed navigation.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wchodzisz do kina. Zanim usiądziesz, ktoś sprawdza bilet. Jeśli biletu nie ma, nie wchodzisz - i co ważne, nadal stoisz w holu, a nie w połowie sali.</p><p>Tak samo działa router. Zanim pokaże nową stronę, pyta strażników: wolno tu wejść? Dopiero gdy wszyscy przytakną, zmienia się adres i obrazek na ekranie.</p><p>Czasem strażnik musi gdzieś zadzwonić i to trwa. Jeśli w tym czasie nic nie mrugnie na ekranie, wyglądasz jak zawieszony - dlatego dobre strony pokazują wtedy cienki pasek u góry.</p><p>Jest jeszcze jedna pułapka. Zamawiasz popcorn, po chwili się rozmyślasz i zamawiasz nachosy. Jeśli nikt nie odwoła popcornu, dostaniesz jedno i drugie, i to w losowej kolejności. Programy mają tak samo z danymi: stare zamówienie trzeba odwołać, zanim wróci i namiesza.</p>',
          en: '<p>You walk into a cinema. Before you sit down someone checks your ticket. No ticket, no entry - and importantly you are still in the lobby, not halfway down the aisle.</p><p>The router works the same way. Before showing a new page it asks its guards: is this allowed? Only when they all nod does the address change and the picture swap.</p><p>Sometimes a guard has to phone someone and that takes a while. If nothing flickers on screen meanwhile, you look frozen - which is why good sites show a thin bar at the top.</p><p>There is one more trap. You order popcorn, change your mind and order nachos. If nobody cancels the popcorn you get both, in random order. Programs have exactly this problem with data: the old order has to be cancelled before it comes back and makes a mess.</p>'
        },
        school: {
          pl: '<p>Nawigacja w Vue Router jest asynchroniczna i ma ustaloną kolejność kroków. W skrócie: guardy opuszczenia starej trasy, globalny <code>beforeEach</code>, <code>beforeRouteUpdate</code> na komponentach reużytych, <code>beforeEnter</code> rekordu, rozwiązanie komponentów asynchronicznych, <code>beforeRouteEnter</code>, globalny <code>beforeResolve</code>, a na końcu potwierdzenie: zmiana URL, <code>afterEach</code>, aktualizacja DOM i scroll.</p><p>Guard może zwrócić trzy rzeczy: <code>undefined</code> lub <code>true</code> (przepuść), <code>false</code> (anuluj) albo obiekt lokalizacji (przekieruj). Stary styl z <code>next()</code> nadal działa, ale mieszanie obu prowadzi do klasycznego błędu podwójnego wywołania next.</p><pre><code>router.beforeEach(async (to) =&gt; {\n  const auth = useAuth()            // w środku, nie na poziomie modułu\n  if (!auth.ready) await auth.restore()\n  if (to.meta.requiresAuth &amp;&amp; !auth.user) {\n    return { name: "login", query: { next: to.fullPath } }\n  }\n})</code></pre><p>Największa decyzja projektowa to <em>kiedy</em> pobierać dane. Są dwie szkoły:</p><ul><li><strong>Fetch przed nawigacją</strong> (w guardzie): nowy widok pojawia się od razu z danymi, bez skeletonów. Cena to widoczna zwłoka po kliknięciu i konieczność pokazania paska postępu.</li><li><strong>Fetch po nawigacji</strong> (w komponencie): natychmiastowa reakcja i szkielet zamiast pustki. Cena to layout shift i stany ładowania w każdym widoku.</li></ul><p>W praktyce łączy się oba: krytyczna weryfikacja dostępu w guardzie, dane widoku w komponencie. Pamiętaj tylko, że komponent trasy bywa reużywany - dane pobieraj w <code>watch</code> na <code>() =&gt; route.params.id</code> z opcją <code>{ immediate: true }</code>, a nie w samym <code>onMounted</code>.</p><p>I zawsze anuluj poprzednie żądanie. <code>watch</code> daje ci <code>onCleanup</code> - w środku wywołujesz <code>controller.abort()</code> i nie ma wyścigów.</p>',
          en: '<p>Navigation in Vue Router is asynchronous and follows a fixed order. In short: leave guards of the old route, the global <code>beforeEach</code>, <code>beforeRouteUpdate</code> on reused components, the record <code>beforeEnter</code>, async component resolution, <code>beforeRouteEnter</code>, the global <code>beforeResolve</code>, and finally the commit: URL change, <code>afterEach</code>, DOM update and scroll.</p><p>A guard can return three things: <code>undefined</code> or <code>true</code> (let it through), <code>false</code> (abort) or a location object (redirect). The old <code>next()</code> style still works, but mixing both produces the classic double-call-of-next bug.</p><pre><code>router.beforeEach(async (to) =&gt; {\n  const auth = useAuth()            // inside, not at module scope\n  if (!auth.ready) await auth.restore()\n  if (to.meta.requiresAuth &amp;&amp; !auth.user) {\n    return { name: "login", query: { next: to.fullPath } }\n  }\n})</code></pre><p>The big design decision is <em>when</em> to fetch. There are two schools:</p><ul><li><strong>Fetch before navigating</strong> (in a guard): the new view appears complete, no skeletons. The price is a visible delay after the click and the need for a progress bar.</li><li><strong>Fetch after navigating</strong> (in the component): instant response and a skeleton instead of a blank. The price is layout shift and loading states in every view.</li></ul><p>In practice you combine them: critical access checks in the guard, view data in the component. Just remember that a route component may be reused - fetch inside a <code>watch</code> on <code>() =&gt; route.params.id</code> with <code>{ immediate: true }</code>, not in <code>onMounted</code> alone.</p><p>And always cancel the previous request. <code>watch</code> hands you <code>onCleanup</code>; call <code>controller.abort()</code> there and the race disappears.</p>'
        },
        pro: {
          pl: '<p>Kilka faktów o potoku, które w code review wychodzą najczęściej. Guardy tego samego poziomu są wykonywane <strong>sekwencyjnie</strong>, więc trzy globalne <code>beforeEach</code> po 150 ms każdy dają 450 ms opóźnienia przy każdym kliknięciu w aplikacji. <code>beforeResolve</code> jest ostatnim momentem, w którym można jeszcze anulować, a jednocześnie pierwszym, w którym wszystkie komponenty asynchroniczne są już rozwiązane - to właściwe miejsce na globalne pobieranie danych, jeśli decydujesz się na model fetch-before-navigate. <code>afterEach</code> nie może już nic zmienić i służy do telemetrii oraz tytułu strony.</p><p><code>beforeRouteEnter</code> jako jedyny nie ma dostępu do <code>this</code> ani do instancji, bo ta jeszcze nie istnieje; dostęp dostajesz przez callback <code>next(vm =&gt; ...)</code>. W <code>&lt;script setup&gt;</code> ten guard w ogóle nie istnieje - masz tylko <code>onBeforeRouteUpdate</code> i <code>onBeforeRouteLeave</code>, i to jest w porządku, bo logika wejścia należy do <code>beforeEnter</code> rekordu albo do samego setupu.</p><pre><code>// widok odporny na wyścigi i na reużycie komponentu\nconst route = useRoute()\nconst data = shallowRef(null)\nconst pending = ref(false)\n\nwatch(() =&gt; route.params.id, async (id, _old, onCleanup) =&gt; {\n  const ac = new AbortController()\n  onCleanup(() =&gt; ac.abort())\n  pending.value = true\n  try {\n    data.value = await api.order(id, { signal: ac.signal })\n  } catch (e) {\n    if (e.name !== "AbortError") error.value = e\n  } finally {\n    if (!ac.signal.aborted) pending.value = false\n  }\n}, { immediate: true })\n\nonBeforeRouteLeave(() =&gt; form.dirty ? confirm("Porzucic zmiany?") : true)</code></pre><p>Rzeczy, o które pytają na rozmowach i które boli w produkcji:</p><ul><li><strong>Pętle przekierowań.</strong> Guard, który przekierowuje na <code>/login</code>, musi mieć warunek wyjścia dla samej trasy logowania, inaczej dostaniesz <code>Maximum call stack</code> lub błąd o przekroczeniu limitu przekierowań.</li><li><strong>Nawigacja anulowana to nie błąd.</strong> <code>router.push()</code> rozwiązuje się z <code>NavigationFailure</code>; użyj <code>isNavigationFailure(err, NavigationFailureType.aborted)</code>, żeby odróżnić anulowanie od awarii i nie zaśmiecać Sentry.</li><li><strong>Guard nie jest zabezpieczeniem.</strong> To warstwa UX. Autoryzacja żyje na serwerze - guard tylko oszczędza użytkownikowi widoku, którego i tak nie zobaczy z danymi.</li><li><strong>Blokada wyjścia z formularza.</strong> <code>onBeforeRouteLeave</code> łapie tylko nawigacje wewnątrz aplikacji. Zamknięcie karty wymaga dodatkowo <code>beforeunload</code>, a natywny dialog przeglądarki nie da się ostylować.</li><li><strong>Scroll.</strong> Przy fetch-after-navigate <code>scrollBehavior</code> odpala się, zanim dane wypełnią stronę, więc przywrócenie pozycji po powrocie zawodzi. Zwróć z <code>scrollBehavior</code> Promise rozwiązywany po pojawieniu się treści albo trzymaj wysokość skeletonu równą docelowej.</li></ul><p>Ekosystem idzie w stronę data loaders (<code>unplugin-vue-router/data-loaders</code>): deklarujesz loader obok komponentu, a router równolegle pobiera dane i rozwiązuje chunk, dając model podobny do loaderów React Router i do <code>useAsyncData</code> w Nuxcie - bez ręcznego żonglowania AbortControllerami w każdym widoku.</p>',
          en: '<p>A few pipeline facts that keep surfacing in code review. Guards at the same level run <strong>sequentially</strong>, so three global <code>beforeEach</code> hooks at 150 ms each add 450 ms to every click in the app. <code>beforeResolve</code> is the last point where you can still abort and the first where all async components are resolved - the right hook for global data fetching if you commit to the fetch-before-navigate model. <code>afterEach</code> can no longer change anything and exists for telemetry and the page title.</p><p><code>beforeRouteEnter</code> is the only guard with no <code>this</code> and no instance, because the instance does not exist yet; you reach it through the <code>next(vm =&gt; ...)</code> callback. In <code>&lt;script setup&gt;</code> that guard does not exist at all - you get <code>onBeforeRouteUpdate</code> and <code>onBeforeRouteLeave</code> only, which is fine, since entry logic belongs in the record <code>beforeEnter</code> or in setup itself.</p><pre><code>// a view that survives races and component reuse\nconst route = useRoute()\nconst data = shallowRef(null)\nconst pending = ref(false)\n\nwatch(() =&gt; route.params.id, async (id, _old, onCleanup) =&gt; {\n  const ac = new AbortController()\n  onCleanup(() =&gt; ac.abort())\n  pending.value = true\n  try {\n    data.value = await api.order(id, { signal: ac.signal })\n  } catch (e) {\n    if (e.name !== "AbortError") error.value = e\n  } finally {\n    if (!ac.signal.aborted) pending.value = false\n  }\n}, { immediate: true })\n\nonBeforeRouteLeave(() =&gt; form.dirty ? confirm("Discard changes?") : true)</code></pre><p>What interviewers ask about and what hurts in production:</p><ul><li><strong>Redirect loops.</strong> A guard redirecting to <code>/login</code> needs an escape condition for the login route itself, otherwise you get a maximum call stack error or a redirect limit failure.</li><li><strong>An aborted navigation is not an error.</strong> <code>router.push()</code> resolves with a <code>NavigationFailure</code>; use <code>isNavigationFailure(err, NavigationFailureType.aborted)</code> to separate cancellation from real failures and keep Sentry clean.</li><li><strong>A guard is not security.</strong> It is a UX layer. Authorization lives on the server - the guard merely spares the user a view that would arrive empty anyway.</li><li><strong>Unsaved-changes blocking.</strong> <code>onBeforeRouteLeave</code> only catches in-app navigations. Closing the tab additionally needs <code>beforeunload</code>, and the native dialog cannot be styled.</li><li><strong>Scroll.</strong> With fetch-after-navigate, <code>scrollBehavior</code> runs before the data fills the page, so restoring the position on back fails. Return a Promise from <code>scrollBehavior</code> that resolves once content appears, or keep skeleton heights equal to the final ones.</li></ul><p>The ecosystem is moving towards data loaders (<code>unplugin-vue-router/data-loaders</code>): you declare a loader next to the component and the router fetches data in parallel with resolving the chunk, giving a model close to React Router loaders and Nuxt <code>useAsyncData</code> - without juggling AbortControllers by hand in every view.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kiedy dokładnie zmienia się adres w pasku przeglądarki przy nawigacji SPA?',
            en: 'When exactly does the browser address bar change during an SPA navigation?'
          },
          options: [
            { pl: 'Natychmiast po kliknięciu w RouterLink', en: 'Immediately after the RouterLink click' },
            { pl: 'Po zatwierdzeniu nawigacji, gdy wszystkie guardy przeszły', en: 'After the navigation is confirmed, once all guards passed' },
            { pl: 'Po zamontowaniu nowego komponentu i pobraniu danych', en: 'After the new component mounts and data arrives' },
            { pl: 'Równolegle z pierwszym guardem', en: 'In parallel with the first guard' }
          ],
          correct: 1,
          explain: {
            pl: 'URL jest zmieniany dopiero na etapie potwierdzenia nawigacji. Dlatego anulowany guard zostawia użytkownika na starym adresie, bez migotania paska.',
            en: 'The URL is written only at the confirmation step. That is why an aborted guard leaves the user on the old address with no flicker.'
          }
        },
        {
          q: {
            pl: 'Który guard nie ma dostępu do instancji komponentu?',
            en: 'Which guard has no access to the component instance?'
          },
          options: [
            { pl: 'beforeRouteUpdate', en: 'beforeRouteUpdate' },
            { pl: 'beforeRouteLeave', en: 'beforeRouteLeave' },
            { pl: 'beforeRouteEnter - instancja jeszcze nie istnieje', en: 'beforeRouteEnter - the instance does not exist yet' },
            { pl: 'afterEach', en: 'afterEach' }
          ],
          correct: 2,
          explain: {
            pl: 'beforeRouteEnter odpala się przed utworzeniem instancji, więc do vm dostajesz się dopiero przez callback next(vm => ...). Pozostałe guardy komponentu mają this.',
            en: 'beforeRouteEnter runs before the instance is created, so you reach the vm through the next(vm => ...) callback. The other component guards have this.'
          }
        },
        {
          q: {
            pl: 'Widok szczegółu zamówienia pobiera dane w onMounted. Po przejściu z /orders/1 na /orders/2 dane się nie zmieniają. Co naprawić?',
            en: 'An order detail view fetches in onMounted. Going from /orders/1 to /orders/2 leaves the data unchanged. What is the fix?'
          },
          options: [
            { pl: 'Pobierać w watch na route.params z immediate, bo komponent jest reużywany', en: 'Fetch in a watch on route.params with immediate, because the component is reused' },
            { pl: 'Przenieść fetch do computed', en: 'Move the fetch into a computed' },
            { pl: 'Wyłączyć cache HTTP dla tego endpointu', en: 'Disable HTTP caching for that endpoint' },
            { pl: 'Zamienić RouterLink na zwykły anchor', en: 'Replace RouterLink with a plain anchor' }
          ],
          correct: 0,
          explain: {
            pl: 'Ten sam rekord trasy oznacza tę samą instancję, więc onMounted nie odpali drugi raz. Reaktywne źródło to params, więc watch z immediate obsługuje i pierwsze wejście, i każdą zmianę.',
            en: 'The same route record means the same instance, so onMounted will not run again. Params are the reactive source, so a watch with immediate covers both first entry and every change.'
          }
        },
        {
          q: {
            pl: 'Sentry zapełnia się wyjątkami z router.push przy szybkim klikaniu w menu. Co jest najbardziej prawdopodobne?',
            en: 'Sentry fills up with exceptions from router.push when users click the menu fast. Most likely explanation?'
          },
          options: [
            { pl: 'Guardy są wywoływane równolegle i kolidują', en: 'Guards run in parallel and collide' },
            { pl: 'Router gubi historię przy szybkich nawigacjach', en: 'The router loses history on fast navigations' },
            { pl: 'To NavigationFailure z anulowania lub duplikatu, a nie prawdziwy błąd', en: 'These are NavigationFailure results from aborts or duplicates, not real errors' },
            { pl: 'Leniwe chunki są pobierane wielokrotnie i zwracają 404', en: 'Lazy chunks are fetched repeatedly and return 404' }
          ],
          correct: 2,
          explain: {
            pl: 'Nowa nawigacja anuluje poprzednią, a push do tego samego adresu daje duplikat. Odfiltruj je przez isNavigationFailure i loguj tylko realne awarie.',
            en: 'A new navigation aborts the previous one, and pushing the current location yields a duplicate. Filter them with isNavigationFailure and log only real failures.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'nuxt3-overview',
      title: {
        pl: 'Nuxt 3: Nitro, payload i hydracja',
        en: 'Nuxt 3: Nitro, payload and hydration'
      },
      minutes: 14,
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">One request through a universal Nuxt app</text>' +
          '<rect x="20" y="46" width="600" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="74" fill="var(--accent)" font-size="15">server - Nitro</text>' +
          '<rect x="44" y="88" width="164" height="88" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="126" y="122" fill="var(--text)" font-size="13" text-anchor="middle">route rules</text>' +
          '<text x="126" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">ssr / isr / spa</text>' +
          '<rect x="224" y="88" width="164" height="88" rx="10" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="306" y="122" fill="var(--accent)" font-size="13" text-anchor="middle">render app</text>' +
          '<text x="306" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">useAsyncData runs</text>' +
          '<rect x="404" y="88" width="192" height="88" rx="10" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="500" y="122" fill="var(--accent2)" font-size="13" text-anchor="middle">HTML + payload</text>' +
          '<text x="500" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">devalue serialized</text>' +
          '<path d="M320 196 L320 236" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M320 240 L313 228 L327 228 z" fill="var(--muted)"/>' +
          '<rect x="20" y="248" width="600" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="276" fill="var(--accent2)" font-size="15">browser</text>' +
          '<rect x="44" y="290" width="164" height="88" rx="10" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="126" y="324" fill="var(--ok)" font-size="13" text-anchor="middle">HTML visible</text>' +
          '<text x="126" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">not interactive</text>' +
          '<rect x="224" y="290" width="164" height="88" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="306" y="324" fill="var(--text)" font-size="13" text-anchor="middle">hydrate</text>' +
          '<text x="306" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">reuse payload</text>' +
          '<rect x="404" y="290" width="192" height="88" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="500" y="324" fill="var(--text)" font-size="13" text-anchor="middle">interactive</text>' +
          '<text x="500" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">no refetch</text>' +
          '<text x="20" y="424" fill="var(--muted)" font-size="13">The payload is what stops the client from fetching everything twice.</text>' +
          '</svg>',
        caption: {
          pl: 'Nitro renderuje HTML i dokleja payload, a przeglądarka hydratuje ten sam stan zamiast pobierać dane po raz drugi.',
          en: 'Nitro renders the HTML and attaches the payload; the browser hydrates that same state instead of fetching the data a second time.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Od zapytania HTTP do interaktywnej strony: gdzie powstaje payload i co dokładnie robi hydracja.',
          en: 'From HTTP request to an interactive page: where the payload comes from and what hydration actually does.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 1 - request reaches Nitro</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="155" y="74" fill="var(--accent)" font-size="14" text-anchor="middle">server</text>' +
              '<rect x="44" y="92" width="222" height="34" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="155" y="115" fill="var(--text)" font-size="13" text-anchor="middle">GET /orders/42</text>' +
              '<rect x="44" y="136" width="222" height="34" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="159" fill="var(--muted)" font-size="13" text-anchor="middle">route rule: ssr</text>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="485" y="122" fill="var(--muted)" font-size="14" text-anchor="middle">browser: empty</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">payload</text>' +
              '<text x="40" y="276" fill="var(--muted)" font-size="14">nothing collected yet</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">Nitro decides how this URL is served before Vue runs.</text>' +
              '</svg>',
            label: { pl: 'Nitro przyjmuje request', en: 'Nitro takes the request' },
            note: {
              pl: 'Zanim uruchomi się Vue, Nitro sprawdza route rules: renderować na serwerze, oddać cache ISR czy wysłać czysty shell SPA.',
              en: 'Before Vue runs, Nitro checks the route rules: render on the server, serve an ISR cache entry, or ship a plain SPA shell.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 2 - useAsyncData runs on the server</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="155" y="74" fill="var(--accent)" font-size="14" text-anchor="middle">server</text>' +
              '<rect x="44" y="92" width="222" height="34" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="115" fill="var(--muted)" font-size="13" text-anchor="middle">setup() of the page</text>' +
              '<rect x="44" y="136" width="222" height="34" rx="8" fill="none" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="155" y="159" fill="var(--warn)" font-size="13" text-anchor="middle">await order:42</text>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="485" y="122" fill="var(--muted)" font-size="14" text-anchor="middle">browser: empty</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">payload</text>' +
              '<text x="40" y="276" fill="var(--warn)" font-size="14">key order:42 - pending</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">The key is what links this fetch to the client later.</text>' +
              '</svg>',
            label: { pl: 'Dane pobierane po stronie serwera', en: 'Data fetched on the server' },
            note: {
              pl: 'useAsyncData blokuje render do czasu odpowiedzi i rejestruje wynik pod kluczem. Ten klucz jest jedynym łącznikiem między serwerem a klientem.',
              en: 'useAsyncData blocks the render until the response arrives and records the result under a key. That key is the only link between server and client.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 3 - HTML and payload are sent</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="155" y="74" fill="var(--ok)" font-size="14" text-anchor="middle">server done</text>' +
              '<rect x="44" y="92" width="222" height="34" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="115" fill="var(--muted)" font-size="13" text-anchor="middle">renderToString</text>' +
              '<rect x="44" y="136" width="222" height="34" rx="8" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="155" y="159" fill="var(--ok)" font-size="13" text-anchor="middle">devalue payload</text>' +
              '<path d="M296 116 L344 116" stroke="var(--muted)" stroke-width="2"/>' +
              '<path d="M348 116 L336 109 L336 123 z" fill="var(--muted)"/>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="485" y="90" fill="var(--text)" font-size="14" text-anchor="middle">browser paints</text>' +
              '<text x="485" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">order 42 visible</text>' +
              '<text x="485" y="152" fill="var(--warn)" font-size="13" text-anchor="middle">buttons still dead</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">payload</text>' +
              '<text x="40" y="276" fill="var(--ok)" font-size="14">key order:42 - resolved, inlined in HTML</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">First contentful paint happens without any JS executed.</text>' +
              '</svg>',
            label: { pl: 'HTML widoczny, strona martwa', en: 'HTML visible, page inert' },
            note: {
              pl: 'Użytkownik widzi pełną treść, ale JavaScript jeszcze nie działa. Kliknięcia w tym oknie czasu przepadają - to znany koszt SSR.',
              en: 'The user sees full content but JavaScript has not run yet. Clicks in this window are lost - the well-known cost of SSR.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 4 - hydration reuses the payload</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="155" y="122" fill="var(--muted)" font-size="14" text-anchor="middle">server idle</text>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="485" y="74" fill="var(--accent)" font-size="14" text-anchor="middle">browser hydrating</text>' +
              '<rect x="372" y="92" width="226" height="34" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="485" y="115" fill="var(--muted)" font-size="13" text-anchor="middle">setup() runs again</text>' +
              '<rect x="372" y="136" width="226" height="34" rx="8" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="485" y="159" fill="var(--ok)" font-size="13" text-anchor="middle">order:42 read from payload</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">payload</text>' +
              '<text x="40" y="276" fill="var(--accent)" font-size="14">consumed - no second network call</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">Same key, same data - the fetch is skipped entirely.</text>' +
              '</svg>',
            label: { pl: 'Hydracja czyta payload', en: 'Hydration reads the payload' },
            note: {
              pl: 'setup strony wykonuje się drugi raz, ale useAsyncData widzi klucz w payloadzie i nie strzela do API. Dlatego klucze muszą być stabilne.',
              en: 'The page setup runs a second time, but useAsyncData finds the key in the payload and skips the API call. Hence keys must be stable.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 5 - a mismatch would look like this</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="74" fill="var(--muted)" font-size="14" text-anchor="middle">server rendered</text>' +
              '<rect x="44" y="100" width="222" height="60" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="136" fill="var(--text)" font-size="13" text-anchor="middle">12:00:00</text>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="485" y="74" fill="var(--err)" font-size="14" text-anchor="middle">client rendered</text>' +
              '<rect x="372" y="100" width="226" height="60" rx="8" fill="none" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="485" y="136" fill="var(--err)" font-size="13" text-anchor="middle">12:00:03</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">console</text>' +
              '<text x="40" y="276" fill="var(--err)" font-size="14">Hydration node mismatch - DOM patched</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">Any value that differs per environment breaks the match.</text>' +
              '</svg>',
            label: { pl: 'Niedopasowanie hydracji', en: 'Hydration mismatch' },
            note: {
              pl: 'Date.now, random, szerokość okna czy localStorage dają inny wynik po obu stronach. Takie fragmenty renderuj tylko na kliencie albo dopiero po zamontowaniu.',
              en: 'Date.now, random, window width or localStorage produce different results on each side. Render such parts client-only or after mount.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 6 - client-side navigation from here on</text>' +
              '<rect x="20" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="74" fill="var(--muted)" font-size="14" text-anchor="middle">Nitro</text>' +
              '<rect x="44" y="100" width="222" height="60" rx="8" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="155" y="136" fill="var(--accent2)" font-size="13" text-anchor="middle">/api/orders/43 only</text>' +
              '<rect x="350" y="46" width="270" height="140" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="485" y="74" fill="var(--ok)" font-size="14" text-anchor="middle">app interactive</text>' +
              '<rect x="372" y="100" width="226" height="60" rx="8" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="485" y="136" fill="var(--ok)" font-size="13" text-anchor="middle">route change, no reload</text>' +
              '<rect x="20" y="212" width="600" height="140" rx="12" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="40" y="240" fill="var(--muted)" font-size="13">payload</text>' +
              '<text x="40" y="276" fill="var(--ok)" font-size="14">new keys added client-side</text>' +
              '<text x="20" y="386" fill="var(--muted)" font-size="13">One SSR pass, then a normal SPA.</text>' +
              '</svg>',
            label: { pl: 'Dalej to zwykłe SPA', en: 'From here it is a plain SPA' },
            note: {
              pl: 'Po hydracji kolejne nawigacje nie renderują HTML na serwerze - lecą tylko zapytania o dane. SSR płacisz raz, przy pierwszym wejściu.',
              en: 'After hydration further navigations do not render HTML on the server - only data requests go out. You pay for SSR once, on first entry.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Zamawiasz mebel. Są dwa sposoby dostawy. Pierwszy: dostajesz karton z częściami i instrukcją, i sam składasz - przez pierwsze pół godziny nie masz na czym usiąść. Drugi: kurier przywozi krzesło już złożone, a potem tylko dokręca kółka.</p><p>Nuxt to ten drugi sposób. Strona jest budowana w magazynie, czyli na serwerze, i przyjeżdża do ciebie gotowa do oglądania. Dopiero potem program dokręca kółka, żeby przyciski zaczęły działać.</p><p>Razem z meblem przyjeżdża mała koperta z listą, co gdzie jest. Dzięki niej monter nie mierzy wszystkiego od nowa - patrzy na kartkę i wie.</p><p>Jedna zasada jest święta: krzesło z magazynu i krzesło po dokręceniu kółek muszą wyglądać identycznie. Jeśli w magazynie namalowano zegar pokazujący dwunastą, a monter dorysuje wpół do pierwszej, ktoś zgłosi reklamację.</p>',
          en: '<p>You order furniture. There are two delivery options. One: a box of parts and a manual, and for the first half hour you have nothing to sit on. Two: the courier brings the chair assembled and only screws the wheels on.</p><p>Nuxt is the second option. The page is built in the warehouse - the server - and arrives ready to look at. Only afterwards does the program screw the wheels on so the buttons start working.</p><p>An envelope travels with the furniture listing what is where. Thanks to it the fitter does not measure everything again - they read the note and know.</p><p>One rule is sacred: the chair from the warehouse and the chair after the wheels go on must look identical. If the warehouse painted a clock showing twelve and the fitter draws half past twelve, somebody files a complaint.</p>'
        },
        school: {
          pl: '<p>Nuxt 3 to Vue plus warstwa serwerowa. Ta warstwa nazywa się Nitro i to ona odpowiada za render na serwerze, endpointy w <code>server/api</code>, cache i deployment na dowolną platformę - Node, Vercel, Cloudflare Workers - bez zmian w kodzie.</p><p>Rzeczy, które dostajesz z pudełka: routing z katalogu <code>pages/</code>, layouty, auto-importy composables i komponentów, middleware trasy, konfiguracja runtime z podziałem na sekrety serwerowe i klucze publiczne, oraz cały ekosystem modułów.</p><p>Sercem pracy z danymi jest <code>useAsyncData</code> i jego skrót <code>useFetch</code>:</p><pre><code>const route = useRoute()\nconst { data, pending, error, refresh } = await useAsyncData(\n  () =&gt; "order:" + route.params.id,        // klucz zależny od params\n  () =&gt; $fetch("/api/orders/" + route.params.id),\n  { watch: [() =&gt; route.params.id] }\n)</code></pre><p>Trzy zasady, bez których to nie działa:</p><ul><li><strong>Klucz jest kontraktem.</strong> Pod tym kluczem wynik trafia do payloadu na serwerze i pod tym samym kluczem jest odczytywany w kliencie. Klucz niezależny od parametrów oznacza, że po nawigacji zobaczysz cudze dane.</li><li><strong>Wołaj w setup, nie w callbacku.</strong> <code>useAsyncData</code> i <code>useFetch</code> muszą wystartować synchronicznie w setupie, żeby Nuxt mógł je policzyć przed zakończeniem renderu. W handlerze przycisku używasz zwykłego <code>$fetch</code>.</li><li><strong>Payload musi być serializowalny.</strong> Funkcje, klasy i instancje nie przejdą przez granicę serwer-klient.</li></ul><p>Do stanu współdzielonego jest <code>useState(key, init)</code> - odpowiednik <code>ref</code>, który jest bezpieczny na SSR i trafia do payloadu. Zwykły moduł z <code>const count = ref(0)</code> na serwerze byłby wspólny dla wszystkich użytkowników naraz. Pinia z modułem <code>@pinia/nuxt</code> rozwiązuje ten sam problem, gdy potrzebujesz akcji i getterów.</p>',
          en: '<p>Nuxt 3 is Vue plus a server layer. That layer is Nitro, and it owns server rendering, the <code>server/api</code> endpoints, caching and deployment to any platform - Node, Vercel, Cloudflare Workers - without touching your code.</p><p>What you get out of the box: file-based routing from <code>pages/</code>, layouts, auto-imports for composables and components, route middleware, runtime config split into server secrets and public keys, and the whole module ecosystem.</p><p>The heart of data work is <code>useAsyncData</code> and its shorthand <code>useFetch</code>:</p><pre><code>const route = useRoute()\nconst { data, pending, error, refresh } = await useAsyncData(\n  () =&gt; "order:" + route.params.id,        // key derived from params\n  () =&gt; $fetch("/api/orders/" + route.params.id),\n  { watch: [() =&gt; route.params.id] }\n)</code></pre><p>Three rules without which this falls apart:</p><ul><li><strong>The key is a contract.</strong> The result is stored in the payload under that key on the server and read back under the same key on the client. A key that ignores params means you will see somebody else data after navigating.</li><li><strong>Call it in setup, not in a callback.</strong> <code>useAsyncData</code> and <code>useFetch</code> must start synchronously in setup so Nuxt can await them before finishing the render. In a click handler you use plain <code>$fetch</code>.</li><li><strong>The payload must be serializable.</strong> Functions, classes and instances do not cross the server-client boundary.</li></ul><p>For shared state there is <code>useState(key, init)</code> - a ref that is SSR-safe and lands in the payload. A module-level <code>const count = ref(0)</code> would be shared by all users at once on the server. Pinia with the <code>@pinia/nuxt</code> module solves the same problem when you need actions and getters.</p>'
        },
        pro: {
          pl: '<p>Nuxt 3 warto czytać jako trzy warstwy: Vue w środku, Nitro na zewnątrz i warstwa build (Vite plus system modułów, który generuje kod i typy do <code>.nuxt/</code>). Auto-importy nie są magią runtime - to transformacja kompilatora oparta o wygenerowany manifest, dlatego działają w IDE i są tree-shakowalne.</p><p><strong>Rendering nie jest globalną decyzją.</strong> <code>routeRules</code> pozwala mieszać strategie per ścieżka, a Nitro egzekwuje je na brzegu:</p><pre><code>// nuxt.config.ts\nrouteRules: {\n  "/": { prerender: true },\n  "/blog/**": { isr: 3600 },\n  "/app/**": { ssr: false },              // shell SPA za loginem\n  "/api/**": { cors: true, headers: { "cache-control": "s-maxage=60" } },\n  "/legacy/**": { redirect: "/app" }\n}</code></pre><p>To jest najsilniejsze narzędzie architektoniczne w Nuxcie: marketing prerenderowany, blog na ISR, panel jako czyste SPA - jedna aplikacja, jeden deploy.</p><p><strong>Payload i hydracja.</strong> Nuxt serializuje payload przez <code>devalue</code>, więc <code>Date</code>, <code>Map</code>, <code>Set</code> i referencje cykliczne przechodzą, a <code>&lt;/script&gt;</code> jest escapowane. Wielkość payloadu to realna metryka wydajności - zwrócenie z API całego obiektu zamówienia z historią statusów potrafi dorzucić 200 kB do HTML, które i tak parsuje główny wątek. Dlatego <code>useFetch</code> ma <code>pick</code> i <code>transform</code>: przycinaj dane <em>zanim</em> trafią do payloadu.</p><p>Pułapki, które w produkcji kosztują najwięcej:</p><ul><li><strong>Podwójne pobranie.</strong> Jeśli klucz jest niestabilny (np. domyślny, generowany z pozycji wywołania, przy dwóch różnych ścieżkach), klient nie znajdzie wpisu w payloadzie i strzeli drugi raz. Widać to od razu w zakładce Network zaraz po hydracji.</li><li><strong>Wyciek sekretów.</strong> Wszystko w <code>runtimeConfig.public</code> ląduje w bundlu klienta. Klucze API trzymaj w <code>runtimeConfig</code> bez public i używaj ich wyłącznie w <code>server/</code>.</li><li><strong>Mismatch hydracji.</strong> <code>Date.now()</code>, losowość, <code>window.innerWidth</code>, motyw z localStorage. Rozwiązania: <code>&lt;ClientOnly&gt;</code> z fallbackiem, plugin <code>.client.ts</code>, albo render dopiero po <code>onMounted</code>. Vue 3.5 daje też lazy hydration, czyli hydratowanie komponentu dopiero, gdy wejdzie w viewport lub przy interakcji - w Nuxcie przez <code>&lt;LazyMyWidget hydrate-on-visible /&gt;</code>.</li><li><strong>Middleware.</strong> <code>defineNuxtRouteMiddleware</code> działa i na serwerze, i w kliencie - przekierowanie po sesji z cookie musi to uwzględniać, bo na serwerze nie ma dostępu do localStorage. Do przekierowań używaj <code>navigateTo</code>, a do błędów <code>createError({ statusCode: 404 })</code>, żeby Nitro faktycznie odpowiedziało kodem 404, a nie stroną 200 z komunikatem.</li><li><strong>Nitro to nie tylko SSR.</strong> <code>server/api/*.ts</code> daje ci pełnoprawny BFF w tym samym repo, z <code>$fetch</code>, który przy wywołaniu z serwera odpytuje handler bezpośrednio, bez pętli przez sieć.</li></ul><p>Porównanie z Next.js dla kontekstu: Nuxt nie ma odpowiednika React Server Components; wszystko jest komponentem Vue, który renderuje się raz na serwerze i raz przy hydracji. Zamiast tego dostajesz server components w postaci wysp (<code>.server.vue</code>) i granularną kontrolę przez route rules. Prostsze do przewidzenia, choć bez oszczędności na rozmiarze bundla, jaką dają RSC.</p>',
          en: '<p>Read Nuxt 3 as three layers: Vue inside, Nitro outside, and a build layer (Vite plus a module system that generates code and types into <code>.nuxt/</code>). Auto-imports are not runtime magic - they are a compiler transform driven by a generated manifest, which is why they work in the IDE and stay tree-shakeable.</p><p><strong>Rendering is not one global decision.</strong> <code>routeRules</code> lets you mix strategies per path and Nitro enforces them at the edge:</p><pre><code>// nuxt.config.ts\nrouteRules: {\n  "/": { prerender: true },\n  "/blog/**": { isr: 3600 },\n  "/app/**": { ssr: false },              // SPA shell behind login\n  "/api/**": { cors: true, headers: { "cache-control": "s-maxage=60" } },\n  "/legacy/**": { redirect: "/app" }\n}</code></pre><p>This is the strongest architectural lever in Nuxt: marketing prerendered, blog on ISR, dashboard as a pure SPA - one app, one deploy.</p><p><strong>Payload and hydration.</strong> Nuxt serializes the payload with <code>devalue</code>, so <code>Date</code>, <code>Map</code>, <code>Set</code> and cyclic references survive and <code>&lt;/script&gt;</code> is escaped. Payload size is a real performance metric - returning a full order object with its status history can add 200 kB of HTML that the main thread still has to parse. That is why <code>useFetch</code> offers <code>pick</code> and <code>transform</code>: trim the data <em>before</em> it reaches the payload.</p><p>The traps that cost most in production:</p><ul><li><strong>Double fetching.</strong> If the key is unstable (for example the default one, derived from the call site, across two different paths), the client will not find the payload entry and fetches again. It shows up in the Network tab right after hydration.</li><li><strong>Leaking secrets.</strong> Everything under <code>runtimeConfig.public</code> ends up in the client bundle. Keep API keys in <code>runtimeConfig</code> without public and use them only inside <code>server/</code>.</li><li><strong>Hydration mismatch.</strong> <code>Date.now()</code>, randomness, <code>window.innerWidth</code>, a theme from localStorage. Fixes: <code>&lt;ClientOnly&gt;</code> with a fallback, a <code>.client.ts</code> plugin, or rendering after <code>onMounted</code>. Vue 3.5 also brings lazy hydration - hydrating a component only when it enters the viewport or on interaction - exposed in Nuxt as <code>&lt;LazyMyWidget hydrate-on-visible /&gt;</code>.</li><li><strong>Middleware.</strong> <code>defineNuxtRouteMiddleware</code> runs on both server and client, so a cookie-based session redirect must account for the absence of localStorage on the server. Use <code>navigateTo</code> for redirects and <code>createError({ statusCode: 404 })</code> for failures, so Nitro actually answers with a 404 instead of a 200 page carrying an error message.</li><li><strong>Nitro is more than SSR.</strong> <code>server/api/*.ts</code> gives you a first-class BFF in the same repo, and a server-side <code>$fetch</code> call hits the handler directly instead of looping through the network.</li></ul><p>For context against Next.js: Nuxt has no React Server Components equivalent; everything is a Vue component rendered once on the server and once during hydration. Instead you get server components as islands (<code>.server.vue</code>) and granular control through route rules. Easier to reason about, though without the bundle-size savings RSC provide.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest Nitro w Nuxt 3?',
            en: 'What is Nitro in Nuxt 3?'
          },
          options: [
            { pl: 'Kompilatorem szablonów Vue', en: 'The Vue template compiler' },
            { pl: 'Serwerowym silnikiem Nuxta: render SSR, API, cache i deployment', en: 'The Nuxt server engine: SSR rendering, API routes, caching and deployment' },
            { pl: 'Warstwą zarządzania stanem zastępującą Pinię', en: 'A state management layer replacing Pinia' },
            { pl: 'Bundlerem zastępującym Vite', en: 'A bundler replacing Vite' }
          ],
          correct: 1,
          explain: {
            pl: 'Nitro odpowiada za wszystko po stronie serwera: renderowanie, endpointy server/api, cache i budowanie pod konkretną platformę hostingową.',
            en: 'Nitro owns everything server-side: rendering, the server/api endpoints, caching and building for a specific hosting platform.'
          }
        },
        {
          q: {
            pl: 'Po co useAsyncData wymaga klucza?',
            en: 'Why does useAsyncData require a key?'
          },
          options: [
            { pl: 'Do sortowania zapytań według priorytetu', en: 'To sort requests by priority' },
            { pl: 'Do generowania nagłówków cache HTTP', en: 'To generate HTTP cache headers' },
            { pl: 'Żeby wynik z serwera dało się znaleźć w payloadzie podczas hydracji', en: 'So the server result can be found in the payload during hydration' },
            { pl: 'Żeby TypeScript wywnioskował typ odpowiedzi', en: 'So TypeScript can infer the response type' }
          ],
          correct: 2,
          explain: {
            pl: 'Klucz łączy wywołanie na serwerze z tym samym wywołaniem w kliencie. Bez stabilnego klucza klient nie znajdzie danych w payloadzie i pobierze je drugi raz.',
            en: 'The key links the server call to the same call on the client. Without a stable key the client misses the payload entry and fetches again.'
          }
        },
        {
          q: {
            pl: 'Chcesz stronę marketingową prerenderowaną, bloga z ISR i panel jako SPA - w jednej aplikacji. Jak?',
            en: 'You want a prerendered marketing page, an ISR blog and an SPA dashboard - in one app. How?'
          },
          options: [
            { pl: 'Trzy osobne aplikacje Nuxt za reverse proxy', en: 'Three separate Nuxt apps behind a reverse proxy' },
            { pl: 'Przez routeRules w nuxt.config, osobna strategia per wzorzec ścieżki', en: 'With routeRules in nuxt.config, a separate strategy per path pattern' },
            { pl: 'Ustawiając ssr: false globalnie i dodając prerender w CI', en: 'By setting ssr: false globally and prerendering in CI' },
            { pl: 'To niemożliwe - Nuxt wybiera jeden tryb dla całej aplikacji', en: 'Not possible - Nuxt picks one mode for the whole app' }
          ],
          correct: 1,
          explain: {
            pl: 'routeRules definiuje strategię per ścieżka: prerender, isr, ssr: false, redirect czy nagłówki cache. To główny mechanizm hybrydowego renderowania w Nuxcie.',
            en: 'routeRules defines a per-path strategy: prerender, isr, ssr: false, redirect or cache headers. It is the main hybrid rendering mechanism in Nuxt.'
          }
        },
        {
          q: {
            pl: 'W konsoli po pierwszym wejściu widzisz ostrzeżenie o hydration mismatch na komponencie pokazującym względny czas ("2 minuty temu"). Najlepsza poprawka?',
            en: 'After first load the console warns about a hydration mismatch on a relative-time component ("2 minutes ago"). Best fix?'
          },
          options: [
            { pl: 'Wyłączyć SSR dla całej aplikacji', en: 'Disable SSR for the whole app' },
            { pl: 'Zignorować - to tylko ostrzeżenie w trybie dev', en: 'Ignore it - it is only a dev-mode warning' },
            { pl: 'Renderować czas dopiero po zamontowaniu lub w ClientOnly z fallbackiem', en: 'Render the time only after mount, or inside ClientOnly with a fallback' },
            { pl: 'Przenieść formatowanie czasu do computed', en: 'Move the time formatting into a computed' }
          ],
          correct: 2,
          explain: {
            pl: 'Czas liczony na serwerze i w kliencie różni się o sekundy, więc drzewa się nie zgadzają. Taki fragment renderuj po stronie klienta, z neutralnym fallbackiem w HTML z serwera.',
            en: 'Time computed on the server differs from the client by seconds, so the trees disagree. Render that part client-side with a neutral fallback in the server HTML.'
          }
        }
      ]
    }
  ]
}
