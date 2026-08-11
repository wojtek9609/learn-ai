export default {
  id: 'composition-api-mastery',
  order: 2,
  icon: '🧩',
  title: {
    pl: 'Composition API w mistrzowskim wydaniu',
    en: 'Composition API Mastery'
  },
  description: {
    pl: 'Od Options API do kompozycji: projektowanie composables, cykl życia i effectScope, wzorce provide/inject oraz makra kompilatora - defineProps, defineModel, defineSlots.',
    en: 'From Options API to composition: designing composables, lifecycle and effectScope, provide/inject patterns, and the compiler macros - defineProps, defineModel, defineSlots.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'options-to-composition',
      title: {
        pl: 'Z Options API do Composition API',
        en: 'From Options API to Composition API'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Options API jako warstwa', en: 'Options API as a layer' },
          def: { pl: 'Options API działa dziś <strong>na</strong> Composition API: Vue najpierw woła <code>setup()</code>, a dopiero potem <code>applyOptions()</code> rozwiązuje <code>data</code>, <code>computed</code> i <code>methods</code> na tej samej instancji.', en: 'The Options API today runs <strong>on top of</strong> the Composition API: Vue calls <code>setup()</code> first and only then <code>applyOptions()</code> resolves <code>data</code>, <code>computed</code> and <code>methods</code> on the same instance.' }
        },
        {
          term: { pl: 'setupState i proxyRefs', en: 'setupState and proxyRefs' },
          def: { pl: 'To, co zwróci <code>setup()</code>, ląduje w <code>setupState</code> owiniętym w <code>proxyRefs</code> - dlatego w szablonie refy rozpakowują się same i nie piszesz <code>.value</code>.', en: 'Whatever <code>setup()</code> returns lands in <code>setupState</code> wrapped in <code>proxyRefs</code> - which is why refs unwrap themselves in the template and you skip <code>.value</code>.' }
        },
        {
          term: { pl: 'Kolejność rozwiązywania nazw', en: 'Name resolution order' },
          def: { pl: 'Proxy instancji szuka po kolei w <code>setupState</code>, <code>data</code>, <code>props</code>, <code>ctx</code>. Mixiny wrzucają nazwy do tej wspólnej przestrzeni, a konflikty rozstrzygają się po cichu.', en: 'The instance proxy looks up <code>setupState</code>, then <code>data</code>, <code>props</code>, <code>ctx</code>. Mixins dump names into that shared space and conflicts resolve silently.' }
        },
        {
          term: { pl: 'Composable zamiast mixina', en: 'Composable instead of mixin' },
          def: { pl: 'Funkcja z jawnym wejściem i wyjściem, której wynik nazywasz sam: <code>const { data: user } = useUser()</code>. Zero magii w przestrzeni nazw i typy płynące z sygnatury.', en: 'A function with explicit input and output whose result you name yourself: <code>const { data: user } = useUser()</code>. No namespace magic and types flow from the signature.' }
        },
        {
          term: { pl: 'defineOptions', en: 'defineOptions' },
          def: { pl: 'Makro dla opcji, które nie mają odpowiednika w <code>&lt;script setup&gt;</code>: <code>name</code>, <code>inheritAttrs</code>, opcje niestandardowe. Zastępuje drugi blok <code>&lt;script&gt;</code> w większości przypadków.', en: 'The macro for options that have no <code>&lt;script setup&gt;</code> equivalent: <code>name</code>, <code>inheritAttrs</code>, custom options. It replaces the second <code>&lt;script&gt;</code> block in most cases.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Same component, two ways of slicing it</text>' +
          '<rect x="20" y="46" width="260" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="72" fill="var(--text)" font-size="15" text-anchor="middle">Options API</text>' +
          '<rect x="40" y="88" width="220" height="52" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="52" y="110" fill="var(--muted)" font-size="13">data()</text>' +
          '<rect x="150" y="96" width="44" height="14" rx="7" fill="var(--accent)"/>' +
          '<rect x="200" y="96" width="44" height="14" rx="7" fill="var(--accent2)"/>' +
          '<rect x="40" y="150" width="220" height="52" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="52" y="172" fill="var(--muted)" font-size="13">computed</text>' +
          '<rect x="150" y="158" width="44" height="14" rx="7" fill="var(--accent)"/>' +
          '<rect x="200" y="158" width="44" height="14" rx="7" fill="var(--accent2)"/>' +
          '<rect x="40" y="212" width="220" height="52" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="52" y="234" fill="var(--muted)" font-size="13">methods</text>' +
          '<rect x="150" y="220" width="44" height="14" rx="7" fill="var(--accent)"/>' +
          '<rect x="200" y="220" width="44" height="14" rx="7" fill="var(--accent2)"/>' +
          '<rect x="40" y="274" width="220" height="52" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="52" y="296" fill="var(--muted)" font-size="13">watch</text>' +
          '<rect x="150" y="282" width="44" height="14" rx="7" fill="var(--accent)"/>' +
          '<rect x="200" y="282" width="44" height="14" rx="7" fill="var(--accent2)"/>' +
          '<path d="M292 196 L346 196" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M346 196 L336 190 L336 202 z" fill="var(--muted)"/>' +
          '<rect x="360" y="46" width="260" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="490" y="72" fill="var(--text)" font-size="15" text-anchor="middle">Composition API</text>' +
          '<rect x="380" y="96" width="220" height="106" rx="10" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="396" y="126" fill="var(--accent)" font-size="14">useSearch()</text>' +
          '<text x="396" y="150" fill="var(--muted)" font-size="13">state + computed</text>' +
          '<text x="396" y="174" fill="var(--muted)" font-size="13">watch + methods</text>' +
          '<rect x="380" y="218" width="220" height="106" rx="10" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="396" y="248" fill="var(--accent2)" font-size="14">usePagination()</text>' +
          '<text x="396" y="272" fill="var(--muted)" font-size="13">state + computed</text>' +
          '<text x="396" y="296" fill="var(--muted)" font-size="13">watch + methods</text>' +
          '<text x="20" y="374" fill="var(--muted)" font-size="13">Options groups by kind. Composition groups by feature.</text>' +
          '</svg>',
        caption: {
          pl: 'Options API grupuje kod po rodzaju opcji, Composition API po funkcjonalności - ta sama logika, inna oś podziału.',
          en: 'Options API groups code by option kind, Composition API groups it by feature - same logic, different axis.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Krok po kroku: jak rozproszona po opcjach funkcjonalność zbiera się w jeden composable.',
          en: 'Step by step: how a feature scattered across options collapses into a single composable.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 1 - one component, four option blocks</text>' +
              '<rect x="20" y="46" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="70" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="103" fill="var(--muted)" font-size="13">data()</text>' +
              '<rect x="40" y="140" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="173" fill="var(--muted)" font-size="13">computed</text>' +
              '<rect x="40" y="210" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="243" fill="var(--muted)" font-size="13">methods</text>' +
              '<rect x="40" y="280" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="313" fill="var(--muted)" font-size="13">watch</text>' +
              '<rect x="340" y="46" width="280" height="300" rx="14" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="480" y="200" fill="var(--muted)" font-size="14" text-anchor="middle">empty</text>' +
              '<text x="20" y="374" fill="var(--muted)" font-size="13">Everything lives in one options object.</text>' +
              '</svg>',
            label: { pl: 'Jeden komponent, cztery bloki', en: 'One component, four blocks' },
            note: {
              pl: 'Start: klasyczny komponent Options API. Kod jest posortowany po rodzaju opcji, nie po tym, czemu służy.',
              en: 'Start: a classic Options API component. Code is sorted by option kind, not by what it is for.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 2 - two features are interleaved</text>' +
              '<rect x="20" y="46" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="70" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="103" fill="var(--muted)" font-size="13">data()</text>' +
              '<rect x="150" y="88" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="212" y="88" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="140" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="173" fill="var(--muted)" font-size="13">computed</text>' +
              '<rect x="150" y="158" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="212" y="158" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="210" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="243" fill="var(--muted)" font-size="13">methods</text>' +
              '<rect x="150" y="228" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="212" y="228" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="280" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="313" fill="var(--muted)" font-size="13">watch</text>' +
              '<rect x="150" y="298" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="212" y="298" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="340" y="46" width="280" height="300" rx="14" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="480" y="200" fill="var(--muted)" font-size="14" text-anchor="middle">empty</text>' +
              '<text x="20" y="374" fill="var(--muted)" font-size="13">Search and pagination are cut into eight pieces.</text>' +
              '</svg>',
            label: { pl: 'Dwie funkcjonalności, osiem kawałków', en: 'Two features, eight pieces' },
            note: {
              pl: 'Kolory to dwie niezależne funkcjonalności: wyszukiwanie i paginacja. Każda jest pocięta na cztery kawałki w czterech miejscach pliku.',
              en: 'The colors are two independent features: search and pagination. Each one is cut into four pieces in four places in the file.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 3 - collect the search pieces</text>' +
              '<rect x="20" y="46" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="70" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="103" fill="var(--muted)" font-size="13">data()</text>' +
              '<rect x="212" y="88" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="140" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="173" fill="var(--muted)" font-size="13">computed</text>' +
              '<rect x="212" y="158" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="210" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="243" fill="var(--muted)" font-size="13">methods</text>' +
              '<rect x="212" y="228" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="40" y="280" width="240" height="56" rx="10" fill="none" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="54" y="313" fill="var(--muted)" font-size="13">watch</text>' +
              '<rect x="212" y="298" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<path d="M300 196 L336 196" stroke="var(--accent)" stroke-width="2"/>' +
              '<path d="M340 196 L328 189 L328 203 z" fill="var(--accent)"/>' +
              '<rect x="340" y="60" width="280" height="130" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="360" y="90" fill="var(--accent)" font-size="14">useSearch()</text>' +
              '<rect x="360" y="104" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="420" y="104" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="360" y="132" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="420" y="132" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<text x="360" y="174" fill="var(--muted)" font-size="13">returns refs + actions</text>' +
              '<rect x="340" y="216" width="280" height="130" rx="12" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="480" y="286" fill="var(--muted)" font-size="14" text-anchor="middle">next: pagination</text>' +
              '<text x="20" y="374" fill="var(--muted)" font-size="13">One feature, one file, one import.</text>' +
              '</svg>',
            label: { pl: 'Wyszukiwanie ląduje w composable', en: 'Search moves into a composable' },
            note: {
              pl: 'Cztery kawałki jednej funkcjonalności trafiają do jednej funkcji useSearch, która zwraca refy i akcje. Komponent chudnie.',
              en: 'The four pieces of one feature move into a single useSearch function that returns refs and actions. The component gets thinner.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 4 - both features extracted</text>' +
              '<rect x="20" y="46" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="90" fill="var(--muted)" font-size="13">script setup</text>' +
              '<rect x="40" y="106" width="240" height="40" rx="10" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="54" y="132" fill="var(--accent)" font-size="13">const s = useSearch()</text>' +
              '<rect x="40" y="160" width="240" height="40" rx="10" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="54" y="186" fill="var(--accent2)" font-size="13">const p = usePagination()</text>' +
              '<text x="54" y="240" fill="var(--muted)" font-size="13">template only binds</text>' +
              '<text x="54" y="264" fill="var(--muted)" font-size="13">what it renders</text>' +
              '<rect x="340" y="60" width="280" height="130" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="360" y="90" fill="var(--accent)" font-size="14">useSearch()</text>' +
              '<rect x="360" y="104" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="420" y="104" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="360" y="132" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<rect x="420" y="132" width="50" height="18" rx="9" fill="var(--accent)"/>' +
              '<text x="360" y="174" fill="var(--muted)" font-size="13">testable on its own</text>' +
              '<rect x="340" y="216" width="280" height="130" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="360" y="246" fill="var(--accent2)" font-size="14">usePagination()</text>' +
              '<rect x="360" y="260" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="420" y="260" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="360" y="288" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<rect x="420" y="288" width="50" height="18" rx="9" fill="var(--accent2)"/>' +
              '<text x="360" y="330" fill="var(--muted)" font-size="13">reusable elsewhere</text>' +
              '<text x="20" y="374" fill="var(--muted)" font-size="13">The component became a wiring layer.</text>' +
              '</svg>',
            label: { pl: 'Komponent to już tylko okablowanie', en: 'The component is just wiring' },
            note: {
              pl: 'Po ekstrakcji komponent jest cienką warstwą łączącą composables z szablonem. Każdą funkcjonalność testujesz i reużywasz osobno.',
              en: 'After extraction the component is a thin layer wiring composables to the template. Each feature is tested and reused on its own.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie szafę, w której wszystkie skarpetki leżą w jednej szufladzie, wszystkie koszulki w drugiej, a wszystkie spodenki w trzeciej. Wygląda porządnie. Ale kiedy chcesz iść pobiegać, biegasz po całej szafie i wyciągasz po jednej rzeczy z każdej szuflady. A kiedy przestajesz biegać, musisz pamiętać, co dokładnie odłożyć - i zwykle coś zostaje.</p><p>Composition API to inny pomysł: zamiast szuflad masz gotowe plecaki. W jednym plecaku jest cały strój do biegania, w drugim cały strój na basen. Chcesz biegać - bierzesz plecak. Nie chcesz - odkładasz cały plecak i nic nie zostaje porozrzucane.</p><p>Ten sam plecak możesz też pożyczyć koledze. Szuflady pożyczyć się nie da.</p>',
          en: '<p>Imagine a wardrobe where all socks live in one drawer, all shirts in another, all shorts in a third. It looks tidy. But when you want to go running you walk around the whole wardrobe pulling one item out of each drawer. And when you stop running you have to remember exactly what to put back - and something always gets left out.</p><p>The Composition API is a different idea: instead of drawers you have ready-made backpacks. One backpack holds the whole running outfit, another one the whole swimming outfit. Going running? Grab the backpack. Done? Put the whole backpack away and nothing is left lying around.</p><p>You can also lend a backpack to a friend. You cannot lend a drawer.</p>'
        },
        school: {
          pl: '<p>Options API układa kod po <em>rodzaju</em>: osobno <code>data</code>, osobno <code>computed</code>, osobno <code>methods</code>, osobno <code>watch</code>. Przy komponencie na 60 linii to nie boli. Przy komponencie na 600 linii jedna funkcjonalność jest rozsypana po czterech sekcjach i czytasz plik skacząc w górę i w dół.</p><p>Composition API układa kod po <em>funkcjonalności</em>. Stan, obliczenia, obserwatory i akcje jednej rzeczy leżą obok siebie - a jeśli chcesz, wyprowadzasz je do funkcji <code>useCos()</code>, czyli composable (funkcja kompozycyjna).</p><pre><code>// Options\nexport default {\n  data: () => ({ query: "", page: 1 }),\n  computed: { hasQuery() { return this.query.length > 0 } },\n  watch: { query() { this.page = 1 } }\n}\n\n// Composition\nconst query = ref("")\nconst page = ref(1)\nconst hasQuery = computed(() => query.value.length > 0)\nwatch(query, () => { page.value = 1 })</code></pre><p>Trzy rzeczy warto zapamiętać od razu:</p><ul><li><code>setup</code> (czyli ciało <code>&lt;script setup&gt;</code>) uruchamia się <strong>przed</strong> <code>created</code> i nie ma tam <code>this</code> wskazującego na instancję. Nie potrzebujesz go - masz zwykłe zmienne w domknięciu.</li><li>Zamiast mixinów importujesz funkcje. Widać, skąd bierze się każda nazwa, i nie ma cichych kolizji.</li><li>Options API nie znika i nie jest wolniejsze. Wewnątrz Vue i tak sprowadza je do tego samego mechanizmu reaktywności.</li></ul><p>Migruj przyrostowo: nowe funkcjonalności pisz kompozycyjnie, stare komponenty ruszaj wtedy, gdy i tak w nich siedzisz.</p>',
          en: '<p>The Options API organizes code by <em>kind</em>: <code>data</code> here, <code>computed</code> there, <code>methods</code> somewhere else, <code>watch</code> at the bottom. In a 60-line component that is fine. In a 600-line component a single feature is scattered across four sections and you read the file by jumping up and down.</p><p>The Composition API organizes code by <em>feature</em>. State, derived values, watchers and actions of one thing sit next to each other - and if you want, you lift them into a <code>useSomething()</code> function, a composable.</p><pre><code>// Options\nexport default {\n  data: () => ({ query: "", page: 1 }),\n  computed: { hasQuery() { return this.query.length > 0 } },\n  watch: { query() { this.page = 1 } }\n}\n\n// Composition\nconst query = ref("")\nconst page = ref(1)\nconst hasQuery = computed(() => query.value.length > 0)\nwatch(query, () => { page.value = 1 })</code></pre><p>Three things worth internalising right away:</p><ul><li><code>setup</code> (the body of <code>&lt;script setup&gt;</code>) runs <strong>before</strong> <code>created</code> and has no <code>this</code> pointing at the instance. You do not need one - you have plain closure variables.</li><li>Instead of mixins you import functions. Every name has a visible origin and there are no silent collisions.</li><li>The Options API is not going away and is not slower. Internally Vue funnels it into the same reactivity machinery.</li></ul><p>Migrate incrementally: write new features in composition style, and touch old components when you are in them anyway.</p>'
        },
        pro: {
          pl: '<p>Warto rozumieć, że Options API jest dziś <strong>warstwą na Composition API</strong>. Przy tworzeniu instancji Vue najpierw wywołuje <code>setup()</code>, wynik zapisuje jako <code>setupState</code> (opakowany w <code>proxyRefs</code>, stąd brak <code>.value</code> w szablonie), a dopiero potem <code>applyOptions()</code> rozwiązuje <code>data</code>, <code>computed</code>, <code>methods</code> i <code>watch</code> na tej samej instancji. Dlatego <code>setup</code> widzi tylko <code>props</code> i kontekst - <code>data</code> jeszcze nie istnieje - a opcje mogą sięgnąć po to, co zwrócił <code>setup</code>.</p><p>Twarde różnice, które mają znaczenie w produkcji:</p><ul><li><strong>Rozwiązywanie nazw.</strong> Proxy instancji ma ustaloną kolejność: <code>setupState</code>, <code>data</code>, <code>props</code>, <code>ctx</code>. Mixiny wrzucają nazwy do tej samej przestrzeni, a konflikt wygrywa cicho. Composables zwracają wartości, które nazywasz sam: <code>const { data: user } = useUser()</code>.</li><li><strong>Kompilacja.</strong> <code>&lt;script setup&gt;</code> kompiluje się do inline render function w tym samym zakresie, więc szablon odwołuje się do zmiennych bezpośrednio, a nie przez proxy z <code>this</code>. Efekt: mniej pracy przy każdym renderze i realna minifikacja nazw, bo bundler widzi zwykłe zmienne.</li><li><strong>Typy.</strong> W Options API <code>this</code> jest sklejane z wielu opcji i przy generykach szybko się psuje. W kompozycji typy płyną z funkcji - <code>ref&lt;User | null&gt;(null)</code> po prostu działa, także w generycznych komponentach design systemu.</li></ul><pre><code>// composable zamiast mixinu - jawne wejscie i wyjscie\nexport function useDisclosure(initial = false) {\n  const isOpen = ref(initial)\n  const open = () =&gt; { isOpen.value = true }\n  const close = () =&gt; { isOpen.value = false }\n  return { isOpen: readonly(isOpen), open, close }\n}</code></pre><p>Pułapki przy migracji: destrukturyzacja obiektu <code>reactive</code> zrywa reaktywność (używaj <code>toRefs</code> albo od razu <code>ref</code>); opcje komponentu takie jak <code>name</code> czy <code>inheritAttrs</code> w <code>&lt;script setup&gt;</code> wymagają <code>defineOptions</code>; instancja z <code>&lt;script setup&gt;</code> jest domyślnie zamknięta, więc <code>ref</code> rodzica na komponent dziecka nie zobaczy nic bez <code>defineExpose</code> - to najczęstsza regresja przy przepisywaniu komponentów design systemu, bo testy i wrappery często wołały metody publiczne. Mieszanka <code>&lt;script setup&gt;</code> plus zwykły <code>&lt;script&gt;</code> w jednym pliku jest legalna i ratuje przypadki, gdzie potrzebujesz eksportu obok komponentu.</p>',
          en: '<p>It helps to internalise that the Options API today is <strong>a layer on top of the Composition API</strong>. When an instance is created Vue calls <code>setup()</code> first, stores the result as <code>setupState</code> (wrapped in <code>proxyRefs</code>, which is why templates skip <code>.value</code>), and only then <code>applyOptions()</code> resolves <code>data</code>, <code>computed</code>, <code>methods</code> and <code>watch</code> on the same instance. That is why <code>setup</code> sees only <code>props</code> and the context - <code>data</code> does not exist yet - while options can reach whatever <code>setup</code> returned.</p><p>Hard differences that matter in production:</p><ul><li><strong>Name resolution.</strong> The instance proxy has a fixed order: <code>setupState</code>, <code>data</code>, <code>props</code>, <code>ctx</code>. Mixins dump names into that shared space and conflicts resolve silently. Composables return values you name yourself: <code>const { data: user } = useUser()</code>.</li><li><strong>Compilation.</strong> <code>&lt;script setup&gt;</code> compiles into an inline render function in the same scope, so the template references variables directly instead of going through a <code>this</code> proxy. Less work per render, and real name minification because the bundler sees plain variables.</li><li><strong>Types.</strong> In the Options API <code>this</code> is merged from many options and breaks down quickly around generics. In composition, types flow from functions - <code>ref&lt;User | null&gt;(null)</code> just works, including in generic design-system components.</li></ul><pre><code>// a composable instead of a mixin - explicit input and output\nexport function useDisclosure(initial = false) {\n  const isOpen = ref(initial)\n  const open = () =&gt; { isOpen.value = true }\n  const close = () =&gt; { isOpen.value = false }\n  return { isOpen: readonly(isOpen), open, close }\n}</code></pre><p>Migration traps: destructuring a <code>reactive</code> object breaks reactivity (use <code>toRefs</code>, or use <code>ref</code> from the start); component options such as <code>name</code> or <code>inheritAttrs</code> need <code>defineOptions</code> inside <code>&lt;script setup&gt;</code>; and a <code>&lt;script setup&gt;</code> instance is closed by default, so a parent template ref sees nothing without <code>defineExpose</code> - the single most common regression when rewriting design-system components, because tests and wrappers used to call public methods. Mixing <code>&lt;script setup&gt;</code> with a plain <code>&lt;script&gt;</code> block in one file is legal and rescues the cases where you need a named export beside the component.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest główna oś podziału kodu w Composition API?',
            en: 'What is the main axis along which the Composition API splits code?'
          },
          options: [
            { pl: 'Po typie danych (prymitywy osobno, obiekty osobno)', en: 'By data type (primitives apart from objects)' },
            { pl: 'Po rodzaju opcji: data, computed, methods', en: 'By option kind: data, computed, methods' },
            { pl: 'Po funkcjonalności - cała logika jednej rzeczy razem', en: 'By feature - all logic of one thing together' },
            { pl: 'Po cyklu życia komponentu', en: 'By component lifecycle phase' }
          ],
          correct: 2,
          explain: {
            pl: 'Options API grupuje po rodzaju opcji, Composition po funkcjonalności - dzięki temu jedna rzecz mieszka w jednym miejscu i da się ją wyciągnąć do composable.',
            en: 'Options groups by option kind, composition groups by feature - so one concern lives in one place and can be lifted into a composable.'
          }
        },
        {
          q: {
            pl: 'Kiedy w cyklu tworzenia instancji uruchamia się setup względem opcji data?',
            en: 'When does setup run relative to the data option during instance creation?'
          },
          options: [
            { pl: 'Przed - dlatego w setup nie ma jeszcze this z data', en: 'Before - which is why setup has no this with data yet' },
            { pl: 'Po data, ale przed computed', en: 'After data but before computed' },
            { pl: 'Równolegle, kolejność jest niezdefiniowana', en: 'In parallel, the order is undefined' },
            { pl: 'Dopiero po zamontowaniu komponentu', en: 'Only after the component is mounted' }
          ],
          correct: 0,
          explain: {
            pl: 'Vue woła setup jako pierwsze, zapisuje wynik jako setupState, a dopiero potem applyOptions rozwiązuje data, computed i resztę opcji.',
            en: 'Vue calls setup first and stores the result as setupState; only then does applyOptions resolve data, computed and the rest.'
          }
        },
        {
          q: {
            pl: 'Dlaczego composable jest bezpieczniejszy niż mixin?',
            en: 'Why is a composable safer than a mixin?'
          },
          options: [
            { pl: 'Bo działa szybciej w czasie renderowania', en: 'Because it is faster at render time' },
            { pl: 'Bo Vue automatycznie mergeuje kolidujące nazwy', en: 'Because Vue automatically merges colliding names' },
            { pl: 'Bo mixiny nie działają w Vue 3', en: 'Because mixins do not work in Vue 3' },
            { pl: 'Bo wejście i wyjście są jawne, a nazwy nadajesz przy destrukturyzacji', en: 'Because input and output are explicit and you name things at destructuring' }
          ],
          correct: 3,
          explain: {
            pl: 'Mixin wstrzykuje nazwy do wspólnej przestrzeni instancji i konflikty rozwiązują się cicho. Composable zwraca wartości, którym nadajesz nazwę u siebie.',
            en: 'A mixin injects names into the shared instance namespace and conflicts resolve silently. A composable returns values you name at the call site.'
          }
        },
        {
          q: {
            pl: 'Przepisujesz komponent design systemu na script setup i nagle test wołający wrapper.vm.focus() przestaje działać. Dlaczego?',
            en: 'You rewrite a design-system component to script setup and a test calling wrapper.vm.focus() suddenly fails. Why?'
          },
          options: [
            { pl: 'script setup nie obsługuje metod, tylko computed', en: 'script setup does not support methods, only computed' },
            { pl: 'Instancja jest domyślnie zamknięta - potrzebny jest defineExpose', en: 'The instance is closed by default - defineExpose is required' },
            { pl: 'Metody trzeba zwrócić z bloku return, którego brakuje', en: 'Methods must be returned from a return block that is missing' },
            { pl: 'Nazwa metody koliduje z natywnym focus na elemencie', en: 'The method name collides with the native focus on the element' }
          ],
          correct: 1,
          explain: {
            pl: 'Komponent ze script setup domyślnie nic nie wystawia na zewnątrz. Publiczne API trzeba jawnie ogłosić przez defineExpose - to najczęstsza regresja przy migracji.',
            en: 'A script setup component exposes nothing by default. The public API must be declared explicitly with defineExpose - the most common migration regression.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'composables-design-patterns',
      title: {
        pl: 'Projektowanie composables',
        en: 'Designing composables'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Composable', en: 'Composable' },
          def: { pl: 'Funkcja wykorzystująca reaktywność Vue, wołana synchronicznie w <code>setup</code>, zwracająca stan i akcje. Konwencja <code>useX</code>, wejście przez <code>MaybeRefOrGetter</code>, sprzątanie po sobie.', en: 'A function that uses Vue reactivity, called synchronously in <code>setup</code>, returning state and actions. The <code>useX</code> convention, <code>MaybeRefOrGetter</code> input, and cleanup of its own effects.' }
        },
        {
          term: { pl: 'onScopeDispose', en: 'onScopeDispose' },
          def: { pl: 'Rejestruje sprzątanie w bieżącym <code>effectScope</code>, także poza komponentem. Właściwe miejsce na <code>clearInterval</code>, odpięcie observera czy zamknięcie socketu w composable.', en: 'Registers cleanup on the current <code>effectScope</code>, also outside a component. The right place for <code>clearInterval</code>, detaching an observer or closing a socket inside a composable.' }
        },
        {
          term: { pl: 'createSharedComposable', en: 'createSharedComposable' },
          def: { pl: 'Wzorzec współdzielenia jednej instancji stanu z licznikiem referencji: pierwszy konsument tworzy odczepiony <code>effectScope(true)</code>, ostatni go zatrzymuje.', en: 'The pattern for sharing one state instance with reference counting: the first consumer creates a detached <code>effectScope(true)</code>, the last one stops it.' }
        },
        {
          term: { pl: 'Stan na poziomie modułu i SSR', en: 'Module-level state and SSR' },
          def: { pl: '<code>const state = ref(0)</code> poza funkcją to singleton na proces. Na kliencie bywa wygodny, na serwerze oznacza wyciek danych między requestami różnych użytkowników.', en: '<code>const state = ref(0)</code> outside a function is a per-process singleton. Convenient on the client, but on the server it leaks data between different users requests.' }
        },
        {
          term: { pl: 'Composable synchroniczny, nie async', en: 'Sync composable, not async' },
          def: { pl: 'Po pierwszym <code>await</code> nie ma aktywnej instancji, więc <code>onMounted</code>, <code>inject</code> i rejestracja w scope przestają działać. Zwracaj <code>{ data, error, isLoading, execute }</code> i czekaj w środku efektu.', en: 'After the first <code>await</code> there is no active instance, so <code>onMounted</code>, <code>inject</code> and scope registration stop working. Return <code>{ data, error, isLoading, execute }</code> and await inside the effect instead.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Anatomy of a well-behaved composable</text>' +
          '<rect x="20" y="46" width="180" height="118" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="110" y="74" fill="var(--text)" font-size="14" text-anchor="middle">Input</text>' +
          '<text x="110" y="98" fill="var(--muted)" font-size="13" text-anchor="middle">value | ref | getter</text>' +
          '<text x="110" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">normalized with</text>' +
          '<text x="110" y="142" fill="var(--accent)" font-size="13" text-anchor="middle">toValue()</text>' +
          '<path d="M200 105 L246 105" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M250 105 L238 98 L238 112 z" fill="var(--muted)"/>' +
          '<rect x="252" y="46" width="180" height="118" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="342" y="74" fill="var(--accent)" font-size="14" text-anchor="middle">useThing()</text>' +
          '<text x="342" y="98" fill="var(--muted)" font-size="13" text-anchor="middle">refs + computed</text>' +
          '<text x="342" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">watchers</text>' +
          '<text x="342" y="142" fill="var(--muted)" font-size="13" text-anchor="middle">side effects</text>' +
          '<path d="M432 105 L478 105" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M482 105 L470 98 L470 112 z" fill="var(--muted)"/>' +
          '<rect x="440" y="46" width="180" height="118" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="530" y="74" fill="var(--ok)" font-size="14" text-anchor="middle">Output</text>' +
          '<text x="530" y="98" fill="var(--muted)" font-size="13" text-anchor="middle">flat object of refs</text>' +
          '<text x="530" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">readonly state</text>' +
          '<text x="530" y="142" fill="var(--muted)" font-size="13" text-anchor="middle">+ actions</text>' +
          '<rect x="252" y="200" width="180" height="90" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="342" y="228" fill="var(--warn)" font-size="14" text-anchor="middle">effectScope</text>' +
          '<text x="342" y="252" fill="var(--muted)" font-size="13" text-anchor="middle">owns every effect</text>' +
          '<text x="342" y="274" fill="var(--muted)" font-size="13" text-anchor="middle">created inside</text>' +
          '<path d="M342 164 L342 196" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M342 200 L335 188 L349 188 z" fill="var(--muted)"/>' +
          '<rect x="252" y="326" width="180" height="66" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="342" y="354" fill="var(--err)" font-size="14" text-anchor="middle">onScopeDispose</text>' +
          '<text x="342" y="378" fill="var(--muted)" font-size="13" text-anchor="middle">stops timers, sockets</text>' +
          '<path d="M342 290 L342 322" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M342 326 L335 314 L349 314 z" fill="var(--muted)"/>' +
          '<text x="20" y="424" fill="var(--muted)" font-size="13">Take flexible input, return flat refs, clean up after yourself.</text>' +
          '</svg>',
        caption: {
          pl: 'Dobry composable przyjmuje wartość, ref albo getter, trzyma efekty w scope i sam po sobie sprząta.',
          en: 'A good composable accepts a value, a ref or a getter, keeps effects in a scope, and cleans up after itself.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Composable to taki plecak z poprzedniej lekcji, tylko dobrze spakowany. Dobrze spakowany plecak ma trzy cechy.</p><p>Po pierwsze, nie obraża się o to, co mu dasz. Możesz mu podać książkę albo pudełko z książką - poradzi sobie z obydwoma.</p><p>Po drugie, kiedy go otwierasz, wszystko leży na wierzchu, a nie w pięciu woreczkach w woreczku. Sięgasz i bierzesz.</p><p>Po trzecie - i to jest najważniejsze - kiedy odkładasz plecak, on sam gasi latarkę, którą w nim zapaliłeś. Bo jeśli latarka zostanie zapalona, to za tydzień znajdziesz rozładowaną baterię i nie będziesz wiedział, kto ją zostawił włączoną.</p><p>Zły composable to plecak, który zostawia włączone latarki w każdym pokoju, przez który przeszedłeś.</p>',
          en: '<p>A composable is the backpack from the previous lesson, only packed well. A well-packed backpack has three qualities.</p><p>First, it is not fussy about what you hand it. Give it a book, or a box with a book inside - it copes with both.</p><p>Second, when you open it everything is right there on top, not inside five bags within a bag. You reach in and take.</p><p>Third, and this is the important one, when you put the backpack away it switches off the torch you turned on inside it. Because if the torch stays on, a week later you find a dead battery and nobody knows who left it running.</p><p>A bad composable is a backpack that leaves torches burning in every room you walked through.</p>'
        },
        school: {
          pl: '<p>Composable to zwykła funkcja, więc obowiązują ją zwykłe zasady projektowania API - tylko z reaktywnością w tle. Cztery reguły niosą 90% wartości.</p><p><strong>1. Przyjmuj elastyczne wejście.</strong> Użytkownik nie powinien się zastanawiać, czy podać wartość, ref czy getter. Znormalizuj to funkcją <code>toValue()</code>:</p><pre><code>function useUser(id) {\n  const user = ref(null)\n  watchEffect(async () =&gt; {\n    user.value = await fetchUser(toValue(id))\n  })\n  return { user }\n}\n// useUser(1) | useUser(idRef) | useUser(() =&gt; route.params.id)</code></pre><p><strong>2. Zwracaj płaski obiekt refów.</strong> Wtedy wywołujący może destrukturyzować i zmieniać nazwy: <code>const { user: author } = useUser(id)</code>. Gdybyś zwrócił <code>reactive({...})</code>, destrukturyzacja zerwałaby reaktywność.</p><p><strong>3. Nie oddawaj prawa zapisu za darmo.</strong> Stan zwracaj jako <code>readonly</code>, a zmiany udostępniaj przez akcje. Dokładnie jak w Pinii albo w reduktorze: jedno miejsce, które zna reguły przejścia.</p><p><strong>4. Sprzątaj.</strong> Każdy timer, listener i socket otwarty w composable musisz zamknąć. Do tego służy <code>onScopeDispose</code> - działa wszędzie tam, gdzie istnieje aktywny scope, a nie tylko w komponencie.</p><p>Nazewnictwo: prefiks <code>use</code>, jedna odpowiedzialność, opcje jako ostatni argument w obiekcie (<code>{ immediate, debounce }</code>). Jeśli composable ma więcej niż trzy pozycyjne argumenty, to prawdopodobnie chowasz w nim dwa różne pomysły.</p><p>Warto też z góry zdecydować, czy composable ma stan <em>per instancja</em>, czy <em>współdzielony</em>. Domyślnie każde wywołanie tworzy własny stan i to jest zachowanie, którego ludzie się spodziewają. Współdzielenie zrób świadomie i opisz w nazwie albo w dokumentacji, bo inaczej dwa komponenty zaczną sobie nawzajem nadpisywać dane i nikt nie będzie wiedział dlaczego.</p>',
          en: '<p>A composable is just a function, so ordinary API-design rules apply - only with reactivity underneath. Four rules carry 90% of the value.</p><p><strong>1. Accept flexible input.</strong> Callers should not have to think about whether to pass a value, a ref or a getter. Normalize with <code>toValue()</code>:</p><pre><code>function useUser(id) {\n  const user = ref(null)\n  watchEffect(async () =&gt; {\n    user.value = await fetchUser(toValue(id))\n  })\n  return { user }\n}\n// useUser(1) | useUser(idRef) | useUser(() =&gt; route.params.id)</code></pre><p><strong>2. Return a flat object of refs.</strong> Then the caller can destructure and rename: <code>const { user: author } = useUser(id)</code>. Returning <code>reactive({...})</code> would break reactivity on destructuring.</p><p><strong>3. Do not hand out write access for free.</strong> Return state as <code>readonly</code> and expose mutations as actions. Exactly like Pinia or a reducer: one place that knows the transition rules.</p><p><strong>4. Clean up.</strong> Every timer, listener and socket opened inside a composable must be closed. That is what <code>onScopeDispose</code> is for - it works anywhere an active scope exists, not only inside a component.</p><p>Naming: the <code>use</code> prefix, one responsibility, options as a trailing object argument (<code>{ immediate, debounce }</code>). If a composable takes more than three positional arguments you are probably hiding two ideas in one function.</p>'
        },
        pro: {
          pl: '<p>Sercem sprzątania jest <code>effectScope</code>. Każdy komponent tworzy własny scope; wszystkie <code>computed</code> i <code>watch</code> utworzone synchronicznie w <code>setup</code> rejestrują się w nim i giną razem z komponentem. Composable, który tworzy efekty <em>po</em> awaicie albo w callbacku, wypada z tego scope i zostaje na zawsze - klasyczny wyciek pamięci w aplikacjach z długim życiem sesji.</p><pre><code>export function useInterval(fn, ms) {\n  const id = setInterval(fn, toValue(ms))\n  onScopeDispose(() =&gt; clearInterval(id))\n}\n\n// wspoldzielony stan z liczeniem referencji\nexport function createSharedComposable(composable) {\n  let subscribers = 0, state, scope\n  const dispose = () =&gt; { if (--subscribers === 0) { scope.stop(); state = undefined } }\n  return (...args) =&gt; {\n    subscribers++\n    if (!state) { scope = effectScope(true); state = scope.run(() =&gt; composable(...args)) }\n    onScopeDispose(dispose)\n    return state\n  }\n}</code></pre><p>Zwróć uwagę na <code>effectScope(true)</code> - scope odłączony (detached) nie zostanie zatrzymany razem z komponentem, który przypadkiem był pierwszy. To jest właśnie mechanizm, na którym stoi <code>createSharedComposable</code> z VueUse.</p><p><strong>Stan modułowy a SSR.</strong> <code>const state = ref(0)</code> na poziomie modułu daje singleton na proces. Na kliencie to bywa wygodne, na serwerze to wyciek danych między żądaniami: dwaj użytkownicy dostają ten sam obiekt. W kodzie SSR stan globalny trzymaj w Pinii albo pod <code>app.provide</code> per instancja aplikacji, nigdy w zmiennej modułu.</p><p><strong>Async.</strong> Unikaj <code>async</code> w samym composable: po pierwszym <code>await</code> nie ma aktywnej instancji, więc <code>onMounted</code>, <code>inject</code> i rejestracja w scope przestają działać. Zwracaj zamiast tego <code>{ data, error, isLoading, execute }</code> i rób <code>await</code> w środku efektu. Wyścigi żądań gaś przez <code>onWatcherCleanup</code> (3.5) lub trzeci argument <code>onCleanup</code> we <code>watch</code>, najlepiej z <code>AbortController</code>.</p><p><strong>Testy.</strong> Composable z <code>inject</code> lub hookami cyklu życia testuj w minimalnym hoście: <code>mount(defineComponent({ setup: () =&gt; useThing() &amp;&amp; (() =&gt; null) }))</code> albo przez <code>withSetup</code> na bazie <code>createApp</code>. Czysto obliczeniowe composables testuj bez montowania - to jedna z ich największych zalet w design systemie, bo logika komponentu przestaje wymagać DOM.</p><p><strong>Zwracaj stabilne referencje.</strong> Funkcje z composable powinny być tworzone raz, nie w <code>computed</code>; inaczej każdy konsument, który przekazuje je w propsach, wymusza niepotrzebne aktualizacje po stronie dziecka.</p>',
          en: '<p>The heart of cleanup is <code>effectScope</code>. Every component creates its own scope; every <code>computed</code> and <code>watch</code> created synchronously in <code>setup</code> registers there and dies with the component. A composable that creates effects <em>after</em> an await, or inside a callback, falls out of that scope and lives forever - the classic leak in long-session apps.</p><pre><code>export function useInterval(fn, ms) {\n  const id = setInterval(fn, toValue(ms))\n  onScopeDispose(() =&gt; clearInterval(id))\n}\n\n// shared state with reference counting\nexport function createSharedComposable(composable) {\n  let subscribers = 0, state, scope\n  const dispose = () =&gt; { if (--subscribers === 0) { scope.stop(); state = undefined } }\n  return (...args) =&gt; {\n    subscribers++\n    if (!state) { scope = effectScope(true); state = scope.run(() =&gt; composable(...args)) }\n    onScopeDispose(dispose)\n    return state\n  }\n}</code></pre><p>Note <code>effectScope(true)</code> - a detached scope is not stopped together with whichever component happened to arrive first. That is precisely the mechanism behind VueUse createSharedComposable.</p><p><strong>Module state and SSR.</strong> <code>const state = ref(0)</code> at module level is a per-process singleton. On the client that is sometimes convenient; on the server it is cross-request data leakage - two users share one object. In SSR code keep global state in Pinia or under <code>app.provide</code> per app instance, never in a module variable.</p><p><strong>Async.</strong> Avoid making the composable itself <code>async</code>: after the first <code>await</code> there is no active instance, so <code>onMounted</code>, <code>inject</code> and scope registration stop working. Return <code>{ data, error, isLoading, execute }</code> instead and await inside the effect. Kill request races with <code>onWatcherCleanup</code> (3.5) or the <code>onCleanup</code> third argument of <code>watch</code>, ideally driving an <code>AbortController</code>.</p><p><strong>Testing.</strong> Test composables that use <code>inject</code> or lifecycle hooks inside a minimal host: <code>mount(defineComponent({ setup: () =&gt; useThing() &amp;&amp; (() =&gt; null) }))</code>, or a <code>withSetup</code> helper built on <code>createApp</code>. Test purely computational composables with no mounting at all - one of their biggest wins in a design system, because component logic stops requiring a DOM.</p><p><strong>Return stable references.</strong> Functions returned from a composable should be created once, not inside a <code>computed</code>; otherwise every consumer that forwards them as props triggers avoidable child updates.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Po co composable normalizuje argumenty przez toValue()?',
            en: 'Why does a composable normalize its arguments with toValue()?'
          },
          options: [
            { pl: 'Żeby zamienić refy na wartości głęboko w obiektach', en: 'To unwrap refs deeply inside objects' },
            { pl: 'Żeby przyjąć zarówno zwykłą wartość, jak ref i getter', en: 'To accept a plain value, a ref and a getter alike' },
            { pl: 'Żeby wymusić typ string na wejściu', en: 'To coerce the input to a string' },
            { pl: 'Żeby uniknąć tworzenia computed', en: 'To avoid creating a computed' }
          ],
          correct: 1,
          explain: {
            pl: 'toValue rozpakowuje ref i wywołuje getter, a zwykłą wartość zwraca bez zmian - dzięki temu API composable jest wygodne dla każdego wywołującego.',
            en: 'toValue unwraps a ref, calls a getter, and returns a plain value as is - which makes the composable API comfortable for every caller.'
          }
        },
        {
          q: {
            pl: 'Dlaczego composable powinien zwracać płaski obiekt refów, a nie reactive?',
            en: 'Why should a composable return a flat object of refs rather than a reactive object?'
          },
          options: [
            { pl: 'Bo reactive nie działa w script setup', en: 'Because reactive does not work in script setup' },
            { pl: 'Bo refy są szybsze przy każdym odczycie', en: 'Because refs are faster on every read' },
            { pl: 'Bo reactive nie da się przekazać do watch', en: 'Because a reactive object cannot be passed to watch' },
            { pl: 'Bo destrukturyzacja obiektu reactive zrywa reaktywność, a refów nie', en: 'Because destructuring a reactive object breaks reactivity, while refs survive it' }
          ],
          correct: 3,
          explain: {
            pl: 'Destrukturyzując reactive dostajesz statyczne kopie wartości. Refy przeżywają destrukturyzację i pozwalają wygodnie zmieniać nazwy w miejscu użycia.',
            en: 'Destructuring reactive gives you static value copies. Refs survive destructuring and let the call site rename things comfortably.'
          }
        },
        {
          q: {
            pl: 'Composable otwiera WebSocket. Gdzie najlepiej go zamknąć?',
            en: 'A composable opens a WebSocket. Where is the best place to close it?'
          },
          options: [
            { pl: 'W onScopeDispose - działa też poza komponentem', en: 'In onScopeDispose - it also works outside a component' },
            { pl: 'W onBeforeUnmount, bo tylko tam Vue gwarantuje wywołanie', en: 'In onBeforeUnmount, the only hook Vue guarantees' },
            { pl: 'W bloku finally po awaicie', en: 'In a finally block after the await' },
            { pl: 'Nigdzie - garbage collector zamknie go sam', en: 'Nowhere - the garbage collector closes it' }
          ],
          correct: 0,
          explain: {
            pl: 'onScopeDispose jest przypięte do effectScope, więc zadziała także wtedy, gdy composable działa w scope Pinii albo w scope odłączonym, bez komponentu.',
            en: 'onScopeDispose hangs off the effectScope, so it also fires when the composable runs inside a Pinia store or a detached scope with no component at all.'
          }
        },
        {
          q: {
            pl: 'Trzymasz stan sesji w ref na poziomie modułu. Co pójdzie nie tak w SSR?',
            en: 'You keep session state in a module-level ref. What goes wrong under SSR?'
          },
          options: [
            { pl: 'Hydratacja zgłosi mismatch, ale dane pozostaną poprawne', en: 'Hydration reports a mismatch but the data stays correct' },
            { pl: 'Nic - Vue tworzy nowy moduł na każde żądanie', en: 'Nothing - Vue creates a fresh module per request' },
            { pl: 'Stan jest singletonem na proces, więc wycieka między żądaniami użytkowników', en: 'The state is a per-process singleton, so it leaks across users requests' },
            { pl: 'Ref zostanie zamrożony i przestanie być reaktywny', en: 'The ref becomes frozen and loses reactivity' }
          ],
          correct: 2,
          explain: {
            pl: 'Moduł ładuje się raz na proces serwera, więc ten sam ref obsługuje wszystkie żądania. Stan globalny w SSR trzymaj w Pinii albo pod app.provide per instancja aplikacji.',
            en: 'A module is loaded once per server process, so one ref serves every request. Under SSR keep global state in Pinia or under app.provide per app instance.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'lifecycle-in-composition',
      title: {
        pl: 'Cykl życia w Composition API',
        en: 'Lifecycle in the Composition API'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'currentInstance', en: 'currentInstance' },
          def: { pl: 'Zmienna modułowa ustawiona tylko na czas synchronicznego wykonania <code>setup</code>. Dlatego <code>onMounted</code> czy <code>inject</code> po <code>await</code> trafiają w <code>null</code>.', en: 'A module variable set only for the synchronous execution of <code>setup</code>. That is why <code>onMounted</code> or <code>inject</code> after an <code>await</code> hit <code>null</code>.' }
        },
        {
          term: { pl: 'nextTick', en: 'nextTick' },
          def: { pl: 'Obietnica rozwiązywana po opróżnieniu kolejki zadań, czyli po załataniu DOM. <code>await nextTick()</code> przed pomiarem elementu to standard zamiast zgadywania w <code>setTimeout</code>.', en: 'A promise resolved after the job queue flushes, that is after the DOM patch. <code>await nextTick()</code> before measuring an element is the standard instead of guessing with <code>setTimeout</code>.' }
        },
        {
          term: { pl: 'Suspense i async setup', en: 'Suspense and async setup' },
          def: { pl: 'Komponent z top-level <code>await</code> wymaga granicy <code>&lt;Suspense&gt;</code>, która trzyma fallback i wstrzymuje montowanie rodzeństwa. Nadal eksperymentalne - jawny stan ładowania w composable zwykle wygrywa.', en: 'A component with a top-level <code>await</code> needs a <code>&lt;Suspense&gt;</code> boundary, which owns the fallback and holds back sibling mounting. Still experimental - an explicit loading state in a composable usually wins.' }
        },
        {
          term: { pl: 'onDeactivated', en: 'onDeactivated' },
          def: { pl: 'Wewnątrz <code>&lt;KeepAlive&gt;</code> komponent jest dezaktywowany, a nie odmontowany. Ciężkie integracje (timery, sockety, wykresy) zwalniaj tutaj, nie w <code>onUnmounted</code>.', en: 'Inside <code>&lt;KeepAlive&gt;</code> a component is deactivated, not unmounted. Release heavy integrations (timers, sockets, charts) here, not in <code>onUnmounted</code>.' }
        },
        {
          term: { pl: 'onErrorCaptured', en: 'onErrorCaptured' },
          def: { pl: 'Hak łapiący błędy z poddrzewa; zwrócenie <code>false</code> zatrzymuje propagację do <code>app.config.errorHandler</code>. Baza error boundary wokół slotów konsumenta w design systemie.', en: 'A hook catching errors from the subtree; returning <code>false</code> stops propagation to <code>app.config.errorHandler</code>. The basis of an error boundary around consumer slots in a design system.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Hook order for a parent and its child</text>' +
          '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
          '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
          '<circle cx="90" cy="120" r="9" fill="var(--accent)"/>' +
          '<text x="90" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
          '<circle cx="230" cy="270" r="9" fill="var(--accent2)"/>' +
          '<text x="230" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
          '<circle cx="370" cy="270" r="9" fill="var(--accent2)"/>' +
          '<text x="370" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">mounted</text>' +
          '<circle cx="510" cy="120" r="9" fill="var(--accent)"/>' +
          '<text x="510" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">mounted</text>' +
          '<path d="M90 120 L222 262" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M370 262 L502 126" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M239 270 L361 270" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/>' +
          '<text x="300" y="258" fill="var(--muted)" font-size="13" text-anchor="middle">render + DOM</text>' +
          '<rect x="30" y="336" width="580" height="62" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="48" y="362" fill="var(--warn)" font-size="14">Children mount first, parents last.</text>' +
          '<text x="48" y="386" fill="var(--muted)" font-size="13">Register hooks synchronously in setup, or they are silently dropped.</text>' +
          '<text x="30" y="60" fill="var(--muted)" font-size="13">Time runs left to right</text>' +
          '</svg>',
        caption: {
          pl: 'Setup rodzica biegnie pierwszy, ale onMounted dziecka odpala się przed onMounted rodzica - DOM powstaje od dołu.',
          en: 'The parent setup runs first, but the child onMounted fires before the parent one - the DOM is completed bottom-up.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Przebieg montowania i odmontowania w czasie: kto pierwszy, kto ostatni.',
          en: 'Mount and unmount over time: who runs first and who runs last.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">t1 - parent setup</text>' +
              '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
              '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
              '<circle cx="110" cy="120" r="10" fill="var(--accent)"/>' +
              '<text x="110" y="152" fill="var(--text)" font-size="13" text-anchor="middle">setup</text>' +
              '<rect x="30" y="330" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="48" y="366" fill="var(--muted)" font-size="13">State created. No DOM exists yet.</text>' +
              '</svg>',
            label: { pl: 'Setup rodzica', en: 'Parent setup' },
            note: {
              pl: 'Rodzic tworzy stan i rejestruje hooki. DOM jeszcze nie istnieje, więc odwołania do refów szablonu dają null.',
              en: 'The parent creates state and registers hooks. No DOM exists yet, so template refs are still null.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">t2 - child setup</text>' +
              '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
              '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
              '<circle cx="110" cy="120" r="10" fill="var(--accent)" opacity="0.5"/>' +
              '<text x="110" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
              '<path d="M110 120 L242 262" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="250" cy="270" r="10" fill="var(--accent2)"/>' +
              '<text x="250" y="302" fill="var(--text)" font-size="13" text-anchor="middle">setup</text>' +
              '<rect x="30" y="330" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="48" y="366" fill="var(--muted)" font-size="13">Render of the parent reached the child.</text>' +
              '</svg>',
            label: { pl: 'Setup dziecka', en: 'Child setup' },
            note: {
              pl: 'Render rodzica dotarł do dziecka, więc dziecko odpala własny setup. Provide rodzica jest już widoczne dla inject dziecka.',
              en: 'The parent render reached the child, so the child runs its own setup. The parent provide is already visible to the child inject.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">t3 - child mounted</text>' +
              '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
              '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
              '<circle cx="110" cy="120" r="10" fill="var(--accent)" opacity="0.5"/>' +
              '<text x="110" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
              '<path d="M110 120 L242 262" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="250" cy="270" r="10" fill="var(--accent2)" opacity="0.5"/>' +
              '<text x="250" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
              '<path d="M259 270 L381 270" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<circle cx="390" cy="270" r="10" fill="var(--ok)"/>' +
              '<text x="390" y="302" fill="var(--text)" font-size="13" text-anchor="middle">mounted</text>' +
              '<rect x="30" y="330" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="48" y="366" fill="var(--muted)" font-size="13">Child DOM is in the document. Measuring is safe here.</text>' +
              '</svg>',
            label: { pl: 'Dziecko zamontowane', en: 'Child mounted' },
            note: {
              pl: 'Poddrzewo dziecka jest w dokumencie. To pierwszy moment, w którym wolno mierzyć jego rozmiary albo podpiąć obserwatory DOM.',
              en: 'The child subtree is in the document. This is the first moment you may measure it or attach DOM observers.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">t4 - parent mounted</text>' +
              '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
              '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
              '<circle cx="110" cy="120" r="10" fill="var(--accent)" opacity="0.5"/>' +
              '<text x="110" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
              '<path d="M110 120 L242 262" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="250" cy="270" r="10" fill="var(--accent2)" opacity="0.5"/>' +
              '<text x="250" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">setup</text>' +
              '<path d="M259 270 L381 270" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<circle cx="390" cy="270" r="10" fill="var(--ok)" opacity="0.5"/>' +
              '<text x="390" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">mounted</text>' +
              '<path d="M398 262 L522 126" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="530" cy="120" r="10" fill="var(--ok)"/>' +
              '<text x="530" y="152" fill="var(--text)" font-size="13" text-anchor="middle">mounted</text>' +
              '<rect x="30" y="330" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="48" y="366" fill="var(--muted)" font-size="13">Whole tree is live. Children finished before the parent.</text>' +
              '</svg>',
            label: { pl: 'Rodzic zamontowany', en: 'Parent mounted' },
            note: {
              pl: 'Rodzic montuje się ostatni, bo jego DOM jest kompletny dopiero wtedy, gdy skończyły wszystkie dzieci.',
              en: 'The parent mounts last, because its DOM is only complete once every child has finished.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">t5 - unmount runs the other way</text>' +
              '<line x1="30" y1="120" x2="610" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="30" y1="270" x2="610" y2="270" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="30" y="106" fill="var(--accent)" font-size="14">Parent</text>' +
              '<text x="30" y="256" fill="var(--accent2)" font-size="14">Child</text>' +
              '<circle cx="110" cy="120" r="10" fill="var(--warn)"/>' +
              '<text x="110" y="152" fill="var(--text)" font-size="13" text-anchor="middle">beforeUnmount</text>' +
              '<path d="M110 120 L242 262" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="250" cy="270" r="10" fill="var(--warn)"/>' +
              '<text x="250" y="302" fill="var(--text)" font-size="13" text-anchor="middle">beforeUnmount</text>' +
              '<path d="M259 270 L381 270" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<circle cx="390" cy="270" r="10" fill="var(--err)"/>' +
              '<text x="390" y="302" fill="var(--text)" font-size="13" text-anchor="middle">unmounted</text>' +
              '<path d="M398 262 L522 126" stroke="var(--muted)" stroke-width="2"/>' +
              '<circle cx="530" cy="120" r="10" fill="var(--err)"/>' +
              '<text x="530" y="152" fill="var(--text)" font-size="13" text-anchor="middle">unmounted</text>' +
              '<rect x="30" y="330" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="48" y="366" fill="var(--muted)" font-size="13">beforeUnmount top-down, unmounted bottom-up. Scopes stop with it.</text>' +
              '</svg>',
            label: { pl: 'Odmontowanie', en: 'Unmount' },
            note: {
              pl: 'beforeUnmount leci z góry na dół, unmounted z dołu do góry. Razem z komponentem zatrzymuje się jego effectScope, więc watchery i computed znikają same.',
              en: 'beforeUnmount goes top-down, unmounted bottom-up. The component effectScope stops with it, so watchers and computed disappear on their own.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie budowę domu z matrioszką w środku: dom, w domu pokój, w pokoju szafa. Ekipa zaczyna od góry - najpierw ktoś mówi "budujemy dom", potem "budujemy pokój", potem "budujemy szafę". Ale wstążkę przecina się w odwrotnej kolejności: najpierw gotowa jest szafa, potem pokój, a dom jest gotowy dopiero na końcu, bo dom bez gotowego pokoju gotowy nie jest.</p><p>Kiedy dom się rozbiera, dzieje się to samo, tylko w drugą stronę: najpierw ogłasza się "rozbieramy dom", a znikają najpierw najmniejsze rzeczy.</p><p>Ważna zasada dla ekipy: wszystkie zamówienia trzeba złożyć na samym początku, kiedy majster czyta plan. Jak wpadniesz z zamówieniem, gdy majster już poszedł do domu, nikt go nie przyjmie i nikt cię o tym nie poinformuje.</p>',
          en: '<p>Picture building a house with a nesting doll inside: a house, a room in the house, a wardrobe in the room. The crew starts from the top - first someone says "we are building a house", then "we are building a room", then "we are building a wardrobe". But the ribbon is cut in the opposite order: the wardrobe is finished first, then the room, and the house is only finished at the very end, because a house without a finished room is not finished.</p><p>Taking it apart goes the same way in reverse: the announcement starts at the top, and the smallest things disappear first.</p><p>One rule the crew lives by: all requests must be filed at the very beginning, while the foreman is reading the plan. Turn up with a request after he has gone home and nobody takes it - and nobody tells you either.</p>'
        },
        school: {
          pl: '<p>W Composition API hooki cyklu życia to funkcje, które rejestrujesz w <code>setup</code>: <code>onBeforeMount</code>, <code>onMounted</code>, <code>onBeforeUpdate</code>, <code>onUpdated</code>, <code>onBeforeUnmount</code>, <code>onUnmounted</code>. Nie ma odpowiedników <code>beforeCreate</code> i <code>created</code>, bo samo ciało <code>setup</code> jest tym momentem.</p><pre><code>const el = ref(null)\nonMounted(() =&gt; {\n  const ro = new ResizeObserver(update)\n  ro.observe(el.value)\n  onBeforeUnmount(() =&gt; ro.disconnect())\n})</code></pre><p>Trzy rzeczy, które trzeba mieć w głowie:</p><ul><li><strong>Kolejność.</strong> Setup idzie z góry na dół (rodzic, potem dziecko), ale <code>onMounted</code> odpala się z dołu do góry - dziecko przed rodzicem. Dlatego rodzic w <code>onMounted</code> może zmierzyć całe poddrzewo.</li><li><strong>Rejestracja musi być synchroniczna.</strong> <code>onMounted</code> wywołane po <code>await</code> albo w callbacku nie ma już aktywnej instancji i zostanie po cichu zignorowane (w trybie deweloperskim zobaczysz ostrzeżenie).</li><li><strong>SSR.</strong> Na serwerze nie odpalają się <code>onMounted</code> ani <code>onUnmounted</code>. Cokolwiek dotyka <code>window</code>, <code>document</code> czy <code>localStorage</code>, musi mieszkać w <code>onMounted</code>.</li></ul><p>Do tego dochodzą hooki specjalne: <code>onActivated</code> i <code>onDeactivated</code> dla komponentów w <code>&lt;KeepAlive&gt;</code>, <code>onErrorCaptured</code> do łapania błędów z poddrzewa, oraz <code>onRenderTracked</code> i <code>onRenderTriggered</code>, które w devie pokazują dokładnie, która zależność wymusiła render.</p><p>Jeśli chcesz zobaczyć DOM po zmianie stanu, nie potrzebujesz <code>onUpdated</code> - najczęściej wystarczy <code>await nextTick()</code> tuż po zmianie albo watcher z <code>{ flush: "post" }</code>.</p>',
          en: '<p>In the Composition API lifecycle hooks are functions you register inside <code>setup</code>: <code>onBeforeMount</code>, <code>onMounted</code>, <code>onBeforeUpdate</code>, <code>onUpdated</code>, <code>onBeforeUnmount</code>, <code>onUnmounted</code>. There is no <code>beforeCreate</code> or <code>created</code> equivalent, because the body of <code>setup</code> is that moment.</p><pre><code>const el = ref(null)\nonMounted(() =&gt; {\n  const ro = new ResizeObserver(update)\n  ro.observe(el.value)\n  onBeforeUnmount(() =&gt; ro.disconnect())\n})</code></pre><p>Three things to keep in mind:</p><ul><li><strong>Order.</strong> Setup runs top-down (parent, then child), but <code>onMounted</code> fires bottom-up - child before parent. That is why a parent can measure its whole subtree in <code>onMounted</code>.</li><li><strong>Registration must be synchronous.</strong> An <code>onMounted</code> called after an <code>await</code> or inside a callback has no active instance and is silently ignored (dev mode logs a warning).</li><li><strong>SSR.</strong> On the server neither <code>onMounted</code> nor <code>onUnmounted</code> runs. Anything touching <code>window</code>, <code>document</code> or <code>localStorage</code> belongs inside <code>onMounted</code>.</li></ul><p>On top of that come the special hooks: <code>onActivated</code> and <code>onDeactivated</code> for components inside <code>&lt;KeepAlive&gt;</code>, <code>onErrorCaptured</code> for errors bubbling from the subtree, and <code>onRenderTracked</code> plus <code>onRenderTriggered</code>, which in dev tell you exactly which dependency caused a render.</p><p>If you want to see the DOM after a state change you rarely need <code>onUpdated</code> - <code>await nextTick()</code> right after the change, or a watcher with <code>{ flush: "post" }</code>, is usually the better tool.</p>'
        },
        pro: {
          pl: '<p>Hooki to zwykłe kolejki callbacków wiszące na instancji. <code>onMounted(fn)</code> to w praktyce <code>injectHook("m", fn, currentInstance)</code>, a <code>currentInstance</code> to zmienna modułowa ustawiana tylko na czas synchronicznego wykonania <code>setup</code>. Stąd cała reszta zachowań: rejestracja po awaicie trafia w <code>null</code>, a hook zarejestrowany wewnątrz <code>onMounted</code> jest wciąż poprawny, bo Vue przywraca instancję na czas wywołania hooka.</p><p><strong>Harmonogram.</strong> Efekty renderujące i watchery żyją w kolejce zadań z priorytetami. Watcher z <code>flush: "pre"</code> (domyślny) biegnie przed renderem, <code>"post"</code> po patchu DOM w tym samym tiku, <code>"sync"</code> natychmiast przy zapisie - ostatniego używaj wyłącznie do integracji z bibliotekami wymagającymi synchronicznego stanu, bo psuje batching. <code>onUpdated</code> dziecka odpala się przed <code>onUpdated</code> rodzica i dotyczy każdej aktualizacji poddrzewa, więc jako miejsce na logikę biznesową jest kosztowne i podatne na pętle.</p><pre><code>// pomiar po kazdej zmianie danych, bez onUpdated\nwatch(rows, async () =&gt; {\n  await nextTick()\n  height.value = list.value.offsetHeight\n}, { flush: "post" })</code></pre><p><strong>Async setup i Suspense.</strong> W <code>&lt;script setup&gt;</code> z top-level <code>await</code> komponent staje się async i wymaga <code>&lt;Suspense&gt;</code> w drzewie. Vue przywraca <code>currentInstance</code> po awaicie tylko dla kodu skompilowanego z <code>&lt;script setup&gt;</code>; w ręcznie pisanym <code>async setup()</code> tej gwarancji nie ma, więc rejestruj hooki i wołaj <code>inject</code> przed pierwszym awaitem. Dodatkowo w Suspense montowanie rodzeństwa jest wstrzymywane, co potrafi ukryć problem wydajnościowy w dev i ujawnić go na wolnym łączu.</p><p><strong>Odmontowanie a sprzątanie.</strong> Nie musisz ręcznie zatrzymywać <code>watch</code> i <code>computed</code> utworzonych w <code>setup</code> - są w effectScope komponentu i giną razem z nim. Ręcznie sprzątaj tylko zasoby spoza Vue: timery, obserwatory, sockety, subskrypcje z zewnętrznych bibliotek. W <code>&lt;KeepAlive&gt;</code> komponent nie jest odmontowywany, tylko dezaktywowany, więc integracje ciężkie w zasobach zwalniaj w <code>onDeactivated</code>, a nie w <code>onUnmounted</code>.</p><p><strong>Błędy.</strong> <code>onErrorCaptured</code> zwracające <code>false</code> zatrzymuje propagację w górę i do <code>app.config.errorHandler</code>. W design systemie to bardzo dobre miejsce na granicę błędu wokół slotów użytkownika: łapiesz wyjątek renderu konsumenta, logujesz go z kontekstem komponentu i renderujesz stan zapasowy zamiast wywracać całą stronę.</p>',
          en: '<p>Hooks are plain callback queues hanging off the instance. <code>onMounted(fn)</code> is effectively <code>injectHook("m", fn, currentInstance)</code>, and <code>currentInstance</code> is a module variable set only for the synchronous execution of <code>setup</code>. Everything else follows: registering after an await hits <code>null</code>, while a hook registered inside <code>onMounted</code> is still valid, because Vue restores the instance for the duration of a hook call.</p><p><strong>Scheduling.</strong> Render effects and watchers live in a prioritized job queue. A watcher with <code>flush: "pre"</code> (the default) runs before render, <code>"post"</code> after the DOM patch in the same tick, <code>"sync"</code> immediately on write - use the last one only to integrate libraries that demand synchronous state, since it defeats batching. A child <code>onUpdated</code> fires before the parent one and covers every subtree update, which makes it an expensive and loop-prone place for business logic.</p><pre><code>// measure after every data change, without onUpdated\nwatch(rows, async () =&gt; {\n  await nextTick()\n  height.value = list.value.offsetHeight\n}, { flush: "post" })</code></pre><p><strong>Async setup and Suspense.</strong> A <code>&lt;script setup&gt;</code> with a top-level <code>await</code> turns the component async and requires a <code>&lt;Suspense&gt;</code> boundary above it. Vue restores <code>currentInstance</code> across awaits only for code compiled from <code>&lt;script setup&gt;</code>; a hand-written <code>async setup()</code> has no such guarantee, so register hooks and call <code>inject</code> before the first await. Suspense also holds back sibling mounting, which can hide a performance problem in dev and expose it on a slow connection.</p><p><strong>Unmounting and cleanup.</strong> You never need to stop <code>watch</code> or <code>computed</code> created in <code>setup</code> - they belong to the component effectScope and die with it. Clean up only non-Vue resources by hand: timers, observers, sockets, third-party subscriptions. Inside <code>&lt;KeepAlive&gt;</code> a component is deactivated rather than unmounted, so release heavy integrations in <code>onDeactivated</code>, not <code>onUnmounted</code>.</p><p><strong>Errors.</strong> An <code>onErrorCaptured</code> returning <code>false</code> stops propagation upward and to <code>app.config.errorHandler</code>. In a design system this is an excellent place for an error boundary around consumer slots: you catch a consumer render exception, log it with component context, and render a fallback instead of taking the page down.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'W jakiej kolejności odpalają się onMounted rodzica i dziecka?',
            en: 'In what order do the parent and child onMounted hooks fire?'
          },
          options: [
            { pl: 'Najpierw dziecko, potem rodzic', en: 'Child first, then parent' },
            { pl: 'Najpierw rodzic, potem dziecko', en: 'Parent first, then child' },
            { pl: 'Oba w tym samym mikrotasku, kolejność losowa', en: 'Both in the same microtask, order is random' },
            { pl: 'Zależy od tego, czy dziecko ma propsy', en: 'It depends on whether the child has props' }
          ],
          correct: 0,
          explain: {
            pl: 'Setup idzie z góry na dół, ale montowanie kończy się od dołu: DOM rodzica jest kompletny dopiero, gdy dzieci są gotowe.',
            en: 'Setup runs top-down, but mounting completes bottom-up: the parent DOM is only complete once the children are done.'
          }
        },
        {
          q: {
            pl: 'Dlaczego onMounted wywołane po awaicie w ręcznym async setup() nie zadziała?',
            en: 'Why does onMounted called after an await in a hand-written async setup() not work?'
          },
          options: [
            { pl: 'Bo hooki działają tylko w Options API', en: 'Because hooks only work in the Options API' },
            { pl: 'Bo komponent jest już zamontowany zanim await się rozwiąże', en: 'Because the component is already mounted before the await resolves' },
            { pl: 'Bo rejestracja opiera się na currentInstance, które istnieje tylko podczas synchronicznego setup', en: 'Because registration relies on currentInstance, which only exists during synchronous setup' },
            { pl: 'Bo await zawsze rzuca wyjątek w setup', en: 'Because await always throws inside setup' }
          ],
          correct: 2,
          explain: {
            pl: 'currentInstance to zmienna modułowa ustawiana na czas synchronicznego wykonania setup. Po awaicie jest już null, więc hook trafia w próżnię - w dev pojawia się ostrzeżenie.',
            en: 'currentInstance is a module variable set for the synchronous run of setup. After an await it is null, so the hook goes nowhere - dev mode warns about it.'
          }
        },
        {
          q: {
            pl: 'Chcesz zmierzyć wysokość listy po każdej zmianie danych. Co jest najlepsze?',
            en: 'You want to measure a list height after each data change. What is the best tool?'
          },
          options: [
            { pl: 'onUpdated na komponencie listy', en: 'onUpdated on the list component' },
            { pl: 'watch na danych z flush post', en: 'A watch on the data with flush post' },
            { pl: 'watch z flush sync, żeby mieć aktualny DOM od razu', en: 'A watch with flush sync to have fresh DOM immediately' },
            { pl: 'setTimeout 0 po zmianie stanu', en: 'A setTimeout 0 after the state change' }
          ],
          correct: 1,
          explain: {
            pl: 'Watch z flush post biegnie po patchu DOM i tylko dla interesujących cię danych. onUpdated odpala się przy każdej aktualizacji poddrzewa, a flush sync działa jeszcze przed renderem.',
            en: 'A post-flush watch runs after the DOM patch and only for the data you care about. onUpdated fires on every subtree update, and a sync flush runs before the render even happens.'
          }
        },
        {
          q: {
            pl: 'Komponent design systemu otwiera połączenie w onMounted i zamyka w onUnmounted. Trafia do KeepAlive. Co się stanie?',
            en: 'A design-system component opens a connection in onMounted and closes it in onUnmounted. It gets wrapped in KeepAlive. What happens?'
          },
          options: [
            { pl: 'Nic - KeepAlive odmontowuje komponent normalnie', en: 'Nothing - KeepAlive unmounts the component normally' },
            { pl: 'onMounted odpali się przy każdym powrocie na zakładkę', en: 'onMounted fires again on every return to the tab' },
            { pl: 'Połączenie zostanie zamknięte dwa razy', en: 'The connection is closed twice' },
            { pl: 'Połączenie zostaje otwarte po ukryciu komponentu, bo dostaje deactivated zamiast unmounted', en: 'The connection stays open when the component is hidden, because it gets deactivated instead of unmounted' }
          ],
          correct: 3,
          explain: {
            pl: 'W KeepAlive komponent jest tylko dezaktywowany. Zasoby, które mają zwalniać się przy ukryciu, obsłuż w onDeactivated i wznów w onActivated.',
            en: 'Inside KeepAlive the component is merely deactivated. Resources that should be released when hidden belong in onDeactivated, resumed in onActivated.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'provide-inject-patterns',
      title: {
        pl: 'Wzorce provide i inject',
        en: 'Provide and inject patterns'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'provide / inject', en: 'provide / inject' },
          def: { pl: 'Przekazanie wartości w dół poddrzewa bez prop drillingu. Każda instancja ma obiekt <code>provides</code>, którego prototypem jest <code>provides</code> rodzica, więc <code>inject</code> to odczyt po łańcuchu prototypów.', en: 'Passing a value down a subtree without prop drilling. Every instance has a <code>provides</code> object whose prototype is the parent one, so <code>inject</code> is a prototype-chain read.' }
        },
        {
          term: { pl: 'InjectionKey', en: 'InjectionKey' },
          def: { pl: 'Typowany symbol wiążący typ wartości z kluczem: <code>const FieldKey: InjectionKey&lt;FieldApi&gt; = Symbol()</code>. Eliminuje literały string i daje <code>inject</code> pełne wnioskowanie typu.', en: 'A typed symbol binding a value type to a key: <code>const FieldKey: InjectionKey&lt;FieldApi&gt; = Symbol()</code>. It removes string literals and gives <code>inject</code> full type inference.' }
        },
        {
          term: { pl: 'Fabryka domyślnej wartości', en: 'Default value factory' },
          def: { pl: '<code>inject(Key, factory, true)</code> - trzeci argument mówi, że drugi to fabryka. Jedyny sposób, żeby przypadkiem nie współdzielić jednego obiektu domyślnego między wszystkimi konsumentami.', en: '<code>inject(Key, factory, true)</code> - the third argument says the second one is a factory. The only way to avoid accidentally sharing one default object across every consumer.' }
        },
        {
          term: { pl: 'hasInjectionContext()', en: 'hasInjectionContext()' },
          def: { pl: 'Sprawdza, czy kod działa wewnątrz <code>setup</code>. Pozwala composable z biblioteki użyć wstrzykniętej konfiguracji, a poza komponentem spaść na argument przekazany jawnie - zamiast ostrzeżenia w konsoli.', en: 'Checks whether code runs inside <code>setup</code>. It lets a library composable use injected configuration when available and fall back to an explicit argument outside - instead of a console warning.' }
        },
        {
          term: { pl: 'Rejestracja potomków', en: 'Child registration' },
          def: { pl: 'Komponenty złożone (Tabs, Accordion, RadioGroup) wstrzykują <code>register</code> i <code>unregister</code>, a kolejność ustalają przez <code>compareDocumentPosition</code>, bo kolejność montowania to nie kolejność wizualna.', en: 'Compound components (Tabs, Accordion, RadioGroup) inject <code>register</code> and <code>unregister</code> and order children with <code>compareDocumentPosition</code>, because mount order is not visual order.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Injection walks up the component tree</text>' +
          '<rect x="220" y="46" width="200" height="58" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="72" fill="var(--accent)" font-size="14" text-anchor="middle">ChiTabs</text>' +
          '<text x="320" y="92" fill="var(--muted)" font-size="13" text-anchor="middle">provide(TabsKey, api)</text>' +
          '<path d="M320 104 L320 140" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="220" y="140" width="200" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="172" fill="var(--muted)" font-size="14" text-anchor="middle">layout wrapper</text>' +
          '<path d="M320 192 L320 214" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M120 214 L520 214" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M120 214 L120 250" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M320 214 L320 250" stroke="var(--muted)" stroke-width="2"/>' +
          '<path d="M520 214 L520 250" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="40" y="250" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="120" y="278" fill="var(--accent2)" font-size="14" text-anchor="middle">ChiTab</text>' +
          '<text x="120" y="300" fill="var(--muted)" font-size="13" text-anchor="middle">inject(TabsKey)</text>' +
          '<rect x="240" y="250" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="278" fill="var(--accent2)" font-size="14" text-anchor="middle">ChiTab</text>' +
          '<text x="320" y="300" fill="var(--muted)" font-size="13" text-anchor="middle">inject(TabsKey)</text>' +
          '<rect x="440" y="250" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="520" y="278" fill="var(--err)" font-size="14" text-anchor="middle">Stray ChiTab</text>' +
          '<text x="520" y="300" fill="var(--muted)" font-size="13" text-anchor="middle">no provider found</text>' +
          '<rect x="30" y="342" width="580" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="48" y="366" fill="var(--muted)" font-size="13">Provide an object of readonly state plus actions, keyed by a Symbol.</text>' +
          '<text x="48" y="388" fill="var(--muted)" font-size="13">Throw a clear error when the provider is missing.</text>' +
          '</svg>',
        caption: {
          pl: 'Inject szuka wartości w górę drzewa komponentów, a nie w DOM - komponent bez rodzica-dostawcy musi dostać czytelny błąd.',
          en: 'Inject searches up the component tree, not the DOM - a component with no provider ancestor must fail with a clear error.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że w bloku jest jedno pudełko z zapasowymi kluczami, powieszone na klatce schodowej. Kto potrzebuje klucza, idzie w górę schodów, aż zobaczy pudełko. Nie musi pytać każdego sąsiada po drodze ani przekazywać klucza z rąk do rąk przez pięć pięter.</p><p>Provide to powieszenie pudełka. Inject to pójście w górę po klucz.</p><p>Są dwie zasady. Pierwsza: idzie się tylko w górę, nigdy w bok - sąsiad z drugiej klatki twojego pudełka nie zobaczy. Druga: jeśli ktoś powiesi swoje pudełko niżej, to od tego miejsca w dół obowiązuje jego pudełko, bo jest bliżej.</p><p>I jeszcze jedno: lepiej, żeby w pudełku był guzik "otwórz", a nie same klucze na sznurku. Wtedy nikt niczego nie pogubi.</p>',
          en: '<p>Imagine a block of flats with one box of spare keys hanging in the stairwell. Whoever needs a key walks up the stairs until they see the box. Nobody has to ask every neighbour along the way or pass a key hand to hand across five floors.</p><p>Provide is hanging the box up. Inject is walking up to fetch from it.</p><p>Two rules. First: you only walk up, never sideways - a neighbour in another stairwell will never see your box. Second: if someone hangs their own box lower down, from that point downwards their box wins, because it is closer.</p><p>And one more thing: it is better if the box has an "open" button rather than loose keys on a string. Then nobody loses anything.</p>'
        },
        school: {
          pl: '<p><code>provide</code> i <code>inject</code> rozwiązują problem, który w Reakcie rozwiązuje Context: przekazanie czegoś w dół drzewa bez przepychania propsów przez pięć warstw. Dostawca woła <code>provide(key, value)</code>, dowolny potomek woła <code>inject(key)</code>. Rozwiązywanie idzie w górę <strong>drzewa komponentów</strong>, więc slot renderowany fizycznie gdzie indziej i tak widzi dostawcę ze swojego miejsca w kodzie rodzica.</p><p>Klucz zawsze rób jako <code>Symbol</code> w osobnym pliku - unikasz kolizji nazw i w TypeScripcie dostajesz typ za darmo:</p><pre><code>// keys.ts\nexport const TabsKey = Symbol("chi-tabs") as InjectionKey&lt;TabsApi&gt;\n\n// ChiTabs.vue\nconst active = ref(0)\nprovide(TabsKey, {\n  active: readonly(active),\n  select: (i) =&gt; { active.value = i }\n})\n\n// ChiTab.vue\nconst tabs = inject(TabsKey)\nif (!tabs) throw new Error("ChiTab must be used inside ChiTabs")</code></pre><p>Trzy zasady, które oszczędzają godziny debugowania:</p><ul><li><strong>Podawaj refy, nie odczytane wartości.</strong> <code>provide(Key, count.value)</code> przekaże liczbę raz i na zawsze. <code>provide(Key, count)</code> jest reaktywne.</li><li><strong>Stan tylko do odczytu, zmiany przez akcje.</strong> Dziecko nie powinno móc po cichu podmienić stanu rodzica.</li><li><strong>Brak dostawcy to błąd, nie undefined.</strong> Rzuć wyjątek z nazwą komponentu - to jedyna informacja, jaką dostanie konsument twojego design systemu o czwartej po południu.</li></ul><p><code>provide</code> musi być wywołane synchronicznie w <code>setup</code>, tak samo <code>inject</code>. Dla wartości globalnych masz <code>app.provide()</code>, które działa dla całej aplikacji.</p>',
          en: '<p><code>provide</code> and <code>inject</code> solve the problem React solves with Context: getting something down the tree without threading props through five layers. The provider calls <code>provide(key, value)</code>, any descendant calls <code>inject(key)</code>. Resolution walks up the <strong>component tree</strong>, so slot content rendered physically elsewhere still sees the provider from where it was written in the parent.</p><p>Always make the key a <code>Symbol</code> in a separate file - you avoid name collisions and get the type for free in TypeScript:</p><pre><code>// keys.ts\nexport const TabsKey = Symbol("chi-tabs") as InjectionKey&lt;TabsApi&gt;\n\n// ChiTabs.vue\nconst active = ref(0)\nprovide(TabsKey, {\n  active: readonly(active),\n  select: (i) =&gt; { active.value = i }\n})\n\n// ChiTab.vue\nconst tabs = inject(TabsKey)\nif (!tabs) throw new Error("ChiTab must be used inside ChiTabs")</code></pre><p>Three rules that save hours of debugging:</p><ul><li><strong>Provide refs, not read values.</strong> <code>provide(Key, count.value)</code> hands over a number once and forever. <code>provide(Key, count)</code> is reactive.</li><li><strong>Readonly state, mutations through actions.</strong> A child should not be able to quietly swap out the parent state.</li><li><strong>A missing provider is an error, not undefined.</strong> Throw with the component name - that is the only information a consumer of your design system gets at four in the afternoon.</li></ul><p><code>provide</code> must be called synchronously in <code>setup</code>, and so must <code>inject</code>. For truly global values there is <code>app.provide()</code>, visible to the whole application.</p>'
        },
        pro: {
          pl: '<p>Mechanika: każda instancja ma <code>provides</code>, którego prototypem jest <code>provides</code> rodzica. <code>provide</code> przy pierwszym wywołaniu robi <code>Object.create(parent.provides)</code>, a <code>inject</code> to zwykły odczyt z łańcucha prototypów. Stąd dwa fakty: wyszukiwanie jest O(1) w praktyce, a nadpisanie klucza niżej w drzewie działa jak przesłonięcie w prototypie i obowiązuje tylko dla tego poddrzewa - dokładnie to, czego potrzebujesz przy lokalnym motywie albo zagnieżdżonym formularzu.</p><pre><code>// wstrzykiwany kontrakt zamiast golego stanu\ninterface FieldApi {\n  id: string\n  invalid: Readonly&lt;Ref&lt;boolean&gt;&gt;\n  register(el: HTMLElement): void\n  unregister(el: HTMLElement): void\n}\n\nexport function useField() {\n  const api = inject(FieldKey, null)\n  if (!api) throw new Error("[chi] useField() requires a ChiFormField ancestor")\n  return api\n}</code></pre><p><strong>Rejestracja dzieci.</strong> Compound components (Tabs, Accordion, RadioGroup) najczęściej potrzebują listy potomków w kolejności DOM. Wstrzyknij <code>register</code> i <code>unregister</code>, wołaj je w <code>onMounted</code> i <code>onBeforeUnmount</code>, a kolejność ustalaj przez <code>compareDocumentPosition</code>, bo kolejność montowania nie jest kolejnością wizualną przy <code>Teleport</code>, <code>Suspense</code> czy listach z <code>v-for</code> i kluczami.</p><p><strong>Domyślne wartości.</strong> <code>inject(Key, factory, true)</code> traktuje trzeci argument jako sygnał, że drugi to fabryka - to jedyny sposób, by nie współdzielić przypadkiem jednego obiektu domyślnego między wszystkimi konsumentami.</p><p><strong>Poza komponentem.</strong> Od 3.3 masz <code>hasInjectionContext()</code>. W composable biblioteki pozwala to zdecydować: użyć wstrzykniętej konfiguracji, gdy jesteśmy w setup, a poza nim sięgnąć po jawnie przekazany argument - zamiast rzucać ostrzeżeniem w konsoli użytkownika.</p><p><strong>Pułapki produkcyjne.</strong> Wstrzyknięty obiekt powinien mieć stabilną tożsamość; podmiana całego obiektu przy każdym renderze zmusza konsumentów do resetu lokalnych efektów. Nie przenoś przez inject rzeczy, które są tak naprawdę stanem aplikacji - do tego jest Pinia, która daje devtools, HMR i testy. I pamiętaj, że <code>provide</code> nie przechodzi przez granice aplikacji: mikro-frontend zamontowany osobnym <code>createApp</code> nie zobaczy niczego z aplikacji hosta, nawet jeśli w DOM jest w środku.</p><p><strong>Testowalność.</strong> Komponent zależny od inject testuj przez opcję <code>global.provide</code> w Vue Test Utils - nie musisz montować całego rodzica, wystarczy podstawić kontrakt. To dobry papierek lakmusowy projektu: jeśli podstawienie atrapy wymaga dziesięciu pól, wstrzykiwane API jest za szerokie i warto je rozbić na mniejsze klucze.</p>',
          en: '<p>The mechanics: every instance has a <code>provides</code> object whose prototype is the parent <code>provides</code>. On the first call <code>provide</code> does <code>Object.create(parent.provides)</code>, and <code>inject</code> is a plain prototype-chain read. Two consequences: lookup is effectively O(1), and re-providing a key lower in the tree behaves like a prototype shadow that applies to that subtree only - exactly what you want for a local theme or a nested form.</p><pre><code>// inject a contract, not raw state\ninterface FieldApi {\n  id: string\n  invalid: Readonly&lt;Ref&lt;boolean&gt;&gt;\n  register(el: HTMLElement): void\n  unregister(el: HTMLElement): void\n}\n\nexport function useField() {\n  const api = inject(FieldKey, null)\n  if (!api) throw new Error("[chi] useField() requires a ChiFormField ancestor")\n  return api\n}</code></pre><p><strong>Child registration.</strong> Compound components (Tabs, Accordion, RadioGroup) usually need the list of descendants in DOM order. Inject <code>register</code> and <code>unregister</code>, call them in <code>onMounted</code> and <code>onBeforeUnmount</code>, and sort with <code>compareDocumentPosition</code>, because mount order is not visual order once <code>Teleport</code>, <code>Suspense</code> or keyed <code>v-for</code> lists are involved.</p><p><strong>Defaults.</strong> <code>inject(Key, factory, true)</code> uses the third argument to say the second one is a factory - the only way to avoid accidentally sharing a single default object across every consumer.</p><p><strong>Outside a component.</strong> Since 3.3 there is <code>hasInjectionContext()</code>. In a library composable it lets you decide: use injected configuration when inside setup, and fall back to an explicitly passed argument outside - instead of emitting a warning into your users console.</p><p><strong>Production traps.</strong> The injected object should have a stable identity; replacing the whole object on every render forces consumers to reset local effects. Do not smuggle application state through inject - that is what Pinia is for, with devtools, HMR and testability. And remember that <code>provide</code> does not cross app boundaries: a micro-frontend mounted with its own <code>createApp</code> sees nothing from the host app, even when it sits inside it in the DOM.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Wzdłuż czego inject szuka dostarczonej wartości?',
            en: 'What does inject walk when looking for a provided value?'
          },
          options: [
            { pl: 'Wzdłuż drzewa DOM', en: 'The DOM tree' },
            { pl: 'Po wszystkich zarejestrowanych komponentach globalnych', en: 'All globally registered components' },
            { pl: 'Po module, w którym zdefiniowano klucz', en: 'The module where the key is defined' },
            { pl: 'W górę drzewa komponentów', en: 'Up the component tree' }
          ],
          correct: 3,
          explain: {
            pl: 'Provides każdej instancji dziedziczy prototypowo po provides rodzica w drzewie komponentów, więc treść slotu widzi dostawcę z miejsca, gdzie została napisana.',
            en: 'Each instance provides object prototypally inherits from its parent in the component tree, so slot content sees the provider from where it was written.'
          }
        },
        {
          q: {
            pl: 'Który provide daje reaktywną wartość u konsumenta?',
            en: 'Which provide gives the consumer a reactive value?'
          },
          options: [
            { pl: 'provide(Key, count.value)', en: 'provide(Key, count.value)' },
            { pl: 'provide(Key, readonly(count))', en: 'provide(Key, readonly(count))' },
            { pl: 'provide(Key, toRaw(count))', en: 'provide(Key, toRaw(count))' },
            { pl: 'provide(Key, structuredClone(count.value))', en: 'provide(Key, structuredClone(count.value))' }
          ],
          correct: 1,
          explain: {
            pl: 'Reaktywność niesie ref, nie odczytana z niego wartość. readonly(count) zachowuje reaktywność i jednocześnie blokuje zapis z dziecka.',
            en: 'Reactivity travels with the ref, not with a value read out of it. readonly(count) keeps reactivity while blocking writes from the child.'
          }
        },
        {
          q: {
            pl: 'Chcesz, żeby każdy konsument dostał WŁASNY obiekt domyślny, gdy brak dostawcy. Jak?',
            en: 'You want every consumer to get its OWN default object when no provider exists. How?'
          },
          options: [
            { pl: 'inject(Key, {})', en: 'inject(Key, {})' },
            { pl: 'inject(Key) i utworzyć obiekt ręcznie w computed', en: 'inject(Key) and build the object in a computed' },
            { pl: 'inject(Key, () => ({}), true) - trzeci argument oznacza fabrykę', en: 'inject(Key, () => ({}), true) - the third argument marks a factory' },
            { pl: 'provide(Key, {}) w tym samym komponencie', en: 'provide(Key, {}) in the same component' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez trzeciego argumentu Vue potraktowałoby funkcję jako zwykłą wartość domyślną. Flaga treatDefaultAsFactory wywołuje ją i daje świeży obiekt każdemu konsumentowi.',
            en: 'Without the third argument Vue would treat the function as the default value itself. The treatDefaultAsFactory flag calls it and gives each consumer a fresh object.'
          }
        },
        {
          q: {
            pl: 'ChiTabs zbiera swoje ChiTab przez register w onMounted. Kolejność zakładek bywa zła. Dlaczego?',
            en: 'ChiTabs collects its ChiTab children via register in onMounted. The tab order is sometimes wrong. Why?'
          },
          options: [
            { pl: 'Bo kolejność montowania nie musi odpowiadać kolejności w DOM - trzeba posortować przez compareDocumentPosition', en: 'Because mount order need not match DOM order - sort with compareDocumentPosition' },
            { pl: 'Bo provide nie jest reaktywne i lista nigdy się nie odświeża', en: 'Because provide is not reactive so the list never refreshes' },
            { pl: 'Bo onMounted rodzica odpala się przed dziećmi', en: 'Because the parent onMounted fires before the children' },
            { pl: 'Bo Symbol jako klucz nie gwarantuje kolejności wstrzyknięć', en: 'Because a Symbol key does not guarantee injection order' }
          ],
          correct: 0,
          explain: {
            pl: 'Przy Teleport, Suspense i listach z kluczami dzieci montują się w innej kolejności niż wyglądają. Kolejność wizualną ustala się z pozycji elementów w dokumencie.',
            en: 'With Teleport, Suspense and keyed lists, children mount in a different order than they appear. Visual order comes from the elements positions in the document.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'macros-defineprops-definemodel',
      title: {
        pl: 'Makra kompilatora: defineProps, defineModel i reszta',
        en: 'Compiler macros: defineProps, defineModel and friends'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Makro kompilatora', en: 'Compiler macro' },
          def: { pl: '<code>defineProps</code>, <code>defineEmits</code>, <code>defineModel</code> to instrukcje dla <code>@vue/compiler-sfc</code>, nie funkcje. Wywołanie znika z outputu, więc wszystko musi dać się przeanalizować statycznie.', en: '<code>defineProps</code>, <code>defineEmits</code> and <code>defineModel</code> are instructions to <code>@vue/compiler-sfc</code>, not functions. The call disappears from the output, so everything must be statically analyzable.' }
        },
        {
          term: { pl: 'defineModel', en: 'defineModel' },
          def: { pl: 'Generuje prop <code>modelValue</code>, emit <code>update:modelValue</code> i lokalny bufor w jednym refie. Nazwany wariant <code>defineModel(\'firstName\')</code> daje wiele niezależnych v-modeli.', en: 'Generates the <code>modelValue</code> prop, the <code>update:modelValue</code> emit and a local buffer in one ref. The named form <code>defineModel(\'firstName\')</code> gives several independent v-models.' }
        },
        {
          term: { pl: 'modelModifiers', en: 'modelModifiers' },
          def: { pl: 'Obiekt z modyfikatorami użytymi przez rodzica (<code>v-model.trim</code>). Odbierasz go z <code>defineModel</code> i stosujesz własną transformację w opcji <code>set</code>.', en: 'The object of modifiers the parent used (<code>v-model.trim</code>). You receive it from <code>defineModel</code> and apply your own transform in the <code>set</code> option.' }
        },
        {
          term: { pl: 'Props destructure (3.5)', en: 'Props destructure (3.5)' },
          def: { pl: '<code>const { dense = false } = defineProps...</code> - kompilator zamienia odczyt na dostęp do propa, więc reaktywność zostaje. Ale przekazany dalej binding to już wartość: użyj <code>() =&gt; size</code> lub <code>toRef</code>.', en: '<code>const { dense = false } = defineProps...</code> - the compiler rewrites reads as prop access, so reactivity survives. Passing the binding onward passes a value though: use <code>() =&gt; size</code> or <code>toRef</code>.' }
        },
        {
          term: { pl: 'Typ kontra deklaracja runtime', en: 'Type versus runtime declaration' },
          def: { pl: 'Z typu kompilator emituje uproszczone opcje runtime, a złożone typy degradują się do braku sprawdzania. Dla biblioteki konsumowanej bez TS deklaracja runtime z <code>validator</code> bywa uczciwsza.', en: 'From a type the compiler emits simplified runtime options, and complex types degrade to no checking. For a library consumed without TS, a runtime declaration with a <code>validator</code> is often more honest.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Macros are compiled away, never called at runtime</text>' +
          '<rect x="20" y="48" width="250" height="150" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="76" fill="var(--text)" font-size="14">script setup</text>' +
          '<text x="40" y="104" fill="var(--muted)" font-size="13">defineProps</text>' +
          '<text x="40" y="128" fill="var(--muted)" font-size="13">defineEmits</text>' +
          '<text x="40" y="152" fill="var(--muted)" font-size="13">defineModel</text>' +
          '<text x="40" y="176" fill="var(--muted)" font-size="13">defineSlots</text>' +
          '<path d="M270 122 L326 122" stroke="var(--accent)" stroke-width="2"/>' +
          '<path d="M330 122 L318 115 L318 129 z" fill="var(--accent)"/>' +
          '<text x="298" y="108" fill="var(--accent)" font-size="13" text-anchor="middle">SFC compiler</text>' +
          '<rect x="340" y="48" width="280" height="150" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="360" y="76" fill="var(--text)" font-size="14">runtime options</text>' +
          '<text x="360" y="104" fill="var(--muted)" font-size="13">props: { modelValue: ... }</text>' +
          '<text x="360" y="128" fill="var(--muted)" font-size="13">emits: [update:modelValue]</text>' +
          '<text x="360" y="152" fill="var(--muted)" font-size="13">setup(props, ctx)</text>' +
          '<text x="360" y="176" fill="var(--muted)" font-size="13">types erased</text>' +
          '<rect x="20" y="228" width="600" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="40" y="256" fill="var(--accent2)" font-size="14">defineModel()</text>' +
          '<text x="40" y="282" fill="var(--muted)" font-size="13">prop modelValue + emit update:modelValue + a writable ref</text>' +
          '<rect x="20" y="330" width="600" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="40" y="358" fill="var(--warn)" font-size="14">Must be top level and statically analyzable</text>' +
          '<text x="40" y="384" fill="var(--muted)" font-size="13">No imports, no conditionals, no outside variables in the type.</text>' +
          '</svg>',
        caption: {
          pl: 'Makra nie istnieją w czasie wykonania - kompilator SFC zamienia je na zwykłe opcje props i emits.',
          en: 'Macros do not exist at runtime - the SFC compiler turns them into ordinary props and emits options.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że piszesz list do stolarza i zamiast rysować całą szafkę, przyklejasz naklejkę: "tu ma być szuflada". Stolarz czyta list, widzi naklejkę i robi szufladę. Ale w gotowej szafce naklejki już nie ma - została zamieniona w prawdziwą szufladę.</p><p>Makra w Vue są takimi naklejkami. Piszesz <strong>defineProps</strong>, a narzędzie, które przerabia twój plik, zamienia to na prawdziwy kawałek programu. W gotowym kodzie żadnego "defineProps" nie znajdziesz.</p><p>Dlatego naklejkę trzeba przykleić w widocznym miejscu, na wierzchu listu. Jeśli schowasz ją w środku zdania albo napiszesz "przyklej szufladę, jeśli będzie ładna pogoda", stolarz nie zrozumie. On tylko patrzy na naklejki, nie zgaduje.</p>',
          en: '<p>Imagine writing to a carpenter and, instead of drawing the whole cabinet, sticking on a label: "a drawer goes here". The carpenter reads the letter, sees the label, and builds a drawer. But the finished cabinet has no label on it - the label became a real drawer.</p><p>Macros in Vue are those labels. You write <strong>defineProps</strong>, and the tool that processes your file turns it into an actual piece of program. In the finished code there is no "defineProps" anywhere.</p><p>That is why the label has to go somewhere visible, on top of the letter. Hide it mid-sentence, or write "add a drawer if the weather is nice", and the carpenter is lost. He only looks at labels, he does not guess.</p>'
        },
        school: {
          pl: '<p>W <code>&lt;script setup&gt;</code> nie ma miejsca na <code>props</code>, <code>emits</code> czy <code>name</code> - to nie jest obiekt opcji. Zamiast tego kompilator SFC rozpoznaje <strong>makra</strong>: funkcje, których nigdy nie importujesz i które nie istnieją w czasie wykonania.</p><pre><code>const props = defineProps&lt;{ size?: "sm" | "md"; disabled?: boolean }&gt;()\nconst emit = defineEmits&lt;{ change: [value: string] }&gt;()\nconst model = defineModel&lt;string&gt;({ default: "" })\ndefineOptions({ inheritAttrs: false })\ndefineExpose({ focus })</code></pre><p>Najciekawsze jest <code>defineModel</code> (od Vue 3.4). Jedna linijka zastępuje cały rytuał: props <code>modelValue</code>, emit <code>update:modelValue</code> i computed z getterem i setterem. Dostajesz zapisywalny ref - piszesz <code>model.value = x</code>, a Vue emituje zdarzenie do rodzica. Kiedy rodzic nie użył <code>v-model</code>, ref działa lokalnie, więc komponent jest użyteczny także jako niekontrolowany.</p><p>Kilka reguł, których kompilator pilnuje:</p><ul><li>Makro musi stać na najwyższym poziomie skryptu. Nie w <code>if</code>, nie w funkcji, nie w pętli.</li><li>Typ w <code>defineProps&lt;T&gt;()</code> musi dać się rozwiązać statycznie. Od 3.3 typ może pochodzić z importu, ale nadal nie może być wyliczany.</li><li>Nie mieszaj deklaracji typowej z runtime w jednym wywołaniu - wybierasz jedną.</li></ul><p>Wartości domyślne: albo <code>withDefaults</code>, albo - od 3.5 - destrukturyzacja propsów z domyślnymi: <code>const { size = "md" } = defineProps&lt;Props&gt;()</code>. Kompilator zamienia użycia <code>size</code> na <code>props.size</code>, więc reaktywność zostaje zachowana.</p>',
          en: '<p>Inside <code>&lt;script setup&gt;</code> there is no place to put <code>props</code>, <code>emits</code> or <code>name</code> - it is not an options object. Instead the SFC compiler recognises <strong>macros</strong>: functions you never import and that do not exist at runtime.</p><pre><code>const props = defineProps&lt;{ size?: "sm" | "md"; disabled?: boolean }&gt;()\nconst emit = defineEmits&lt;{ change: [value: string] }&gt;()\nconst model = defineModel&lt;string&gt;({ default: "" })\ndefineOptions({ inheritAttrs: false })\ndefineExpose({ focus })</code></pre><p>The most interesting one is <code>defineModel</code> (Vue 3.4 and up). A single line replaces the whole ritual: the <code>modelValue</code> prop, the <code>update:modelValue</code> emit, and a computed with a getter and setter. You get a writable ref - assign <code>model.value = x</code> and Vue emits the event to the parent. When the parent did not use <code>v-model</code>, the ref works locally, so the component is still usable uncontrolled.</p><p>A few rules the compiler enforces:</p><ul><li>A macro must sit at the top level of the script. Not in an <code>if</code>, not in a function, not in a loop.</li><li>The type in <code>defineProps&lt;T&gt;()</code> must be statically resolvable. Since 3.3 it may come from an import, but it still cannot be computed.</li><li>Do not mix type-based and runtime declaration in one call - pick one.</li></ul><p>Defaults: either <code>withDefaults</code>, or - since 3.5 - reactive props destructure: <code>const { size = "md" } = defineProps&lt;Props&gt;()</code>. The compiler rewrites uses of <code>size</code> into <code>props.size</code>, so reactivity is preserved.</p>'
        },
        pro: {
          pl: '<p>Makra to instrukcje dla <code>@vue/compiler-sfc</code>, nie funkcje. Kompilator wycina wywołanie i generuje odpowiedni fragment opcji komponentu, dlatego wszystko musi być statycznie analizowalne. To wyjaśnia większość dziwnych błędów: literał w typie działa, alias z generyka nie; obiekt zdefiniowany obok pliku nie zostanie zaimportowany do typu propsów, jeśli kompilator nie umie rozwiązać ścieżki (rozwiązywanie typów z zależności w node_modules bywa dodatkowym ustawieniem w vue-tsc).</p><p><strong>Propsy z typu a runtime.</strong> Z <code>defineProps&lt;{ items: Item[] }&gt;()</code> kompilator generuje <code>props: { items: { type: Array, required: true } }</code>. Typy złożone degradują się do <code>null</code> jako typ runtime, więc walidacja runtime jest słabsza, niż sugeruje TypeScript - w bibliotece komponentów, do której sięgają zespoły bez TS, to bywa argumentem za deklaracją runtime z własnym walidatorem.</p><pre><code>// v-model z modyfikatorami i transformacja\nconst [model, modifiers] = defineModel&lt;string&gt;({\n  set(value) { return modifiers.trim ? value.trim() : value }\n})\n// rodzic: &lt;ChiInput v-model.trim="name" /&gt;\n\n// wiele modeli\nconst first = defineModel&lt;string&gt;("firstName")\nconst last = defineModel&lt;string&gt;("lastName")</code></pre><p><strong>Boolean casting.</strong> Prop typu <code>boolean</code> nadal podlega rzutowaniu: obecność atrybutu bez wartości daje <code>true</code>, brak daje <code>false</code> zamiast <code>undefined</code>. W unii <code>boolean | string</code> o wyniku decyduje kolejność typów - klasyczne źródło zaskoczeń w komponentach formularzy.</p><p><strong>Destrukturyzacja propsów (3.5).</strong> Wygodna, ale zmienna po destrukturyzacji jest tylko cukrem składniowym. Przekazana do funkcji, do <code>watch</code> albo do composable traci reaktywność, bo przekazujesz wartość, a nie dostęp. Poprawnie: <code>watch(() =&gt; size, ...)</code> albo <code>useThing(toRef(() =&gt; size))</code>. Eslintowa reguła <code>vue/require-toRef</code> i przegląd kodu ratują tu więcej niż dokumentacja.</p><p><strong>Generyki i typowanie slotów.</strong> <code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;</code> plus <code>defineSlots&lt;{ default(props: { item: T }): any }&gt;()</code> daje w pełni typowany komponent listy - w design systemie to różnica między tabelą, która podpowiada typy w IDE konsumenta, a taką, w której wszystko jest <code>any</code>. Pamiętaj też, że <code>defineExpose</code> definiuje publiczne API komponentu i powinno być traktowane jak kontrakt semver, a nie jak wygodny skrót.</p>',
          en: '<p>Macros are instructions to <code>@vue/compiler-sfc</code>, not functions. The compiler removes the call and generates the matching component options, which is why everything must be statically analyzable. That explains most of the odd errors: a literal type works, an alias behind a generic does not; an object defined next door will not make it into the props type if the compiler cannot resolve the path (resolving types from node_modules dependencies is an extra vue-tsc setting).</p><p><strong>Type-based props versus runtime.</strong> From <code>defineProps&lt;{ items: Item[] }&gt;()</code> the compiler emits <code>props: { items: { type: Array, required: true } }</code>. Complex types degrade to <code>null</code> as the runtime type, so runtime validation is weaker than TypeScript suggests - in a component library consumed by teams without TS, that is a real argument for runtime declaration plus a custom validator.</p><pre><code>// v-model with modifiers and a transform\nconst [model, modifiers] = defineModel&lt;string&gt;({\n  set(value) { return modifiers.trim ? value.trim() : value }\n})\n// parent: &lt;ChiInput v-model.trim="name" /&gt;\n\n// multiple models\nconst first = defineModel&lt;string&gt;("firstName")\nconst last = defineModel&lt;string&gt;("lastName")</code></pre><p><strong>Boolean casting.</strong> A <code>boolean</code> prop is still cast: a bare attribute yields <code>true</code>, an absent one yields <code>false</code> rather than <code>undefined</code>. In a <code>boolean | string</code> union the declaration order decides the outcome - a classic surprise in form components.</p><p><strong>Props destructure (3.5).</strong> Convenient, but the destructured binding is pure syntax sugar. Pass it into a function, a <code>watch</code> or a composable and reactivity is gone, because you passed a value rather than access. Correct: <code>watch(() =&gt; size, ...)</code> or <code>useThing(toRef(() =&gt; size))</code>. The <code>vue/require-toRef</code> lint rule and code review catch more of this than documentation does.</p><p><strong>Generics and typed slots.</strong> <code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;</code> together with <code>defineSlots&lt;{ default(props: { item: T }): any }&gt;()</code> yields a fully typed list component - in a design system that is the difference between a table that autocompletes in the consumer IDE and one where everything is <code>any</code>. Also treat <code>defineExpose</code> as the public API of the component and therefore a semver contract, not a convenient shortcut.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego defineProps nie wymaga importu?',
            en: 'Why does defineProps need no import?'
          },
          options: [
            { pl: 'Bo jest globalne w przeglądarce', en: 'Because it is a browser global' },
            { pl: 'Bo Vue rejestruje je automatycznie przy createApp', en: 'Because Vue registers it automatically in createApp' },
            { pl: 'Bo to makro kompilatora - znika przy kompilacji SFC', en: 'Because it is a compiler macro - it disappears during SFC compilation' },
            { pl: 'Bo bundler dodaje auto-import przez plugin', en: 'Because the bundler adds an auto-import through a plugin' }
          ],
          correct: 2,
          explain: {
            pl: 'Kompilator SFC rozpoznaje wywołanie, wycina je i generuje opcję props. W wygenerowanym kodzie nie ma po nim śladu, więc nie ma czego importować.',
            en: 'The SFC compiler recognises the call, removes it and generates the props option. Nothing remains in the output, so there is nothing to import.'
          }
        },
        {
          q: {
            pl: 'Co dokładnie generuje defineModel()?',
            en: 'What exactly does defineModel() generate?'
          },
          options: [
            { pl: 'Tylko computed nad props.modelValue', en: 'Only a computed over props.modelValue' },
            { pl: 'Globalny store współdzielony przez instancje', en: 'A global store shared between instances' },
            { pl: 'Dwustronne wiązanie na propsie bez emitowania zdarzeń', en: 'A two-way binding on the prop with no events emitted' },
            { pl: 'Props modelValue, emit update:modelValue oraz zapisywalny ref sklejający oba', en: 'A modelValue prop, an update:modelValue emit, and a writable ref tying them together' }
          ],
          correct: 3,
          explain: {
            pl: 'Makro deklaruje props i emit, a zwrócony ref przy zapisie emituje zdarzenie. Gdy rodzic nie podpiął v-model, ref trzyma wartość lokalnie.',
            en: 'The macro declares the prop and the emit, and the returned ref emits on write. With no v-model from the parent, the ref holds the value locally.'
          }
        },
        {
          q: {
            pl: 'Piszesz const { size = "md" } = defineProps<Props>() (Vue 3.5) i przekazujesz size do composable. Co się dzieje?',
            en: 'You write const { size = "md" } = defineProps<Props>() (Vue 3.5) and pass size into a composable. What happens?'
          },
          options: [
            { pl: 'Composable dostaje ref i wszystko działa reaktywnie', en: 'The composable gets a ref and everything stays reactive' },
            { pl: 'Composable dostaje wartość z momentu wywołania - trzeba przekazać getter albo toRef', en: 'The composable gets the value at call time - pass a getter or toRef instead' },
            { pl: 'Kompilator zgłosi błąd i build się nie powiedzie', en: 'The compiler errors and the build fails' },
            { pl: 'Wartość domyślna zostanie zignorowana', en: 'The default value is ignored' }
          ],
          correct: 1,
          explain: {
            pl: 'Destrukturyzacja to cukier: kompilator zamienia odczyty na props.size, ale przekazanie zmiennej dalej przekazuje wartość. Reaktywnie: toRef(() => size) albo () => size.',
            en: 'The destructure is sugar: the compiler rewrites reads to props.size, but passing the binding along passes a value. Reactive: toRef(() => size) or () => size.'
          }
        },
        {
          q: {
            pl: 'Deklarujesz prop typem boolean | string. Konsument pisze <ChiTag closable />. Jaka będzie wartość?',
            en: 'You declare a prop typed boolean | string. A consumer writes <ChiTag closable />. What value arrives?'
          },
          options: [
            { pl: 'true - obowiązuje boolean casting, a kolejność typów decyduje w unii', en: 'true - boolean casting applies, and type order decides in a union' },
            { pl: 'Pusty string, bo atrybut bez wartości to zawsze ""', en: 'An empty string, because a valueless attribute is always ""' },
            { pl: 'undefined, bo nie podano wartości', en: 'undefined, because no value was given' },
            { pl: 'null, bo typ runtime unii degraduje się do null', en: 'null, because the runtime type of a union degrades to null' }
          ],
          correct: 0,
          explain: {
            pl: 'Vue rzutuje propsy boolean: sam atrybut daje true, brak atrybutu daje false. W unii z innym typem o wyniku decyduje kolejność deklaracji - stąd zaskoczenia w komponentach formularzy.',
            en: 'Vue casts boolean props: a bare attribute becomes true and an absent one becomes false. In a union the declaration order decides, which is where form components surprise people.'
          }
        }
      ]
    }
  ]
}
