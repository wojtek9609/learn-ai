// Interview question bank - track "vue".
// Senior-level Vue 3 interview register: reactivity internals, composition
// patterns, performance, Pinia/router edge cases, testing strategy.
// Distinctly harder than lesson quizzes: production scenarios, tradeoffs,
// debugging stories and "what breaks when" questions.
// Schema: v5 "Bank schema" - 36 questions, ~60% choice / ~40% open.

export default {
  trackId: 'vue',
  questions: [
    // 1
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Na code review widzisz: const { count } = reactive({ count: 0 }) w composable, a potem return { count }. Komponent renderuje wartość, ale nigdy się nie odświeża. Co dokładnie się stało?',
        en: 'In review you see const { count } = reactive({ count: 0 }) inside a composable, then return { count }. The component renders the value but never updates. What exactly happened?',
      },
      options: [
        {
          pl: 'reactive() działa tylko na obiektach zwróconych z setup(), więc proxy nigdy nie powstało',
          en: 'reactive() only works on objects returned from setup(), so no proxy was ever created',
        },
        {
          pl: 'Destrukturyzacja odczytała prymityw przez get trap i wyniosła go poza proxy - dalej masz zwykłą liczbę, której nikt nie śledzi',
          en: 'Destructuring read the primitive through the get trap and lifted it out of the proxy - you now hold a plain number that nothing tracks',
        },
        {
          pl: 'reactive() jest shallow, więc zagnieżdżone pola nie są reaktywne',
          en: 'reactive() is shallow, so nested fields are not reactive',
        },
        {
          pl: 'Trzeba było użyć toRaw() przed zwróceniem obiektu z composable',
          en: 'You needed toRaw() before returning the object from the composable',
        },
      ],
      correct: 1,
      explain: {
        pl: 'Proxy śledzi dostęp do właściwości, nie wartości. Destrukturyzacja to jednorazowy odczyt - połączenie z targetMap znika. Ratunek: toRefs()/toRef(), albo od razu ref() dla prymitywów. To najczęstszy powód martwej reaktywności w composables.',
        en: 'A proxy tracks property access, not values. Destructuring is a one-time read, so the link to targetMap is gone. Fix: toRefs()/toRef(), or just use ref() for primitives. This is the single most common cause of dead reactivity in composables.',
      },
    },
    // 2
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Opisz, co dzieje się od środka między odczytem state.user.name w szablonie a ponownym renderem po state.user.name = "Ada". Użyj poprawnych nazw: track, trigger, targetMap, effect.',
        en: 'Walk through what happens internally between reading state.user.name in a template and the re-render after state.user.name = "Ada". Use the real names: track, trigger, targetMap, effect.',
      },
      answer: {
        pl: '<p>Render komponentu działa wewnątrz <code>ReactiveEffect</code>, który na czas wykonania ustawia się jako <em>activeEffect</em>. Odczyt <code>state.user</code> trafia w <code>get</code> trap proxy, który woła <code>track(target, key)</code>. Track sięga do globalnego <code>targetMap</code> (WeakMap: obiekt na depsMap), w nim do <code>depsMap</code> (Map: klucz na Dep) i dopisuje activeEffect do zbioru zależności. Relacja jest dwustronna - efekt też trzyma listę swoich Dep, żeby dało się je posprzątać.</p>' +
          '<p>Zagnieżdżony obiekt jest opakowywany w proxy leniwie, dopiero przy odczycie, więc <code>user.name</code> tworzy drugą parę track. Zapis wchodzi w <code>set</code> trap, który porównuje wartości przez <code>Object.is</code>: ten sam wynik kończy pracę bez efektu ubocznego. Różna wartość woła <code>trigger</code>, który z targetMap wyciąga zbiór efektów i przekazuje je do schedulera.</p>' +
          '<p>Efekt renderujący ma scheduler, więc nie wykonuje się natychmiast, tylko ląduje w kolejce mikrozadań i deduplikuje się. Dlatego sto mutacji w jednej funkcji daje jeden render, a <code>await nextTick()</code> jest punktem, w którym DOM jest już aktualny.</p>',
        en: '<p>A component render runs inside a <code>ReactiveEffect</code> that installs itself as <em>activeEffect</em> while it executes. Reading <code>state.user</code> hits the proxy <code>get</code> trap, which calls <code>track(target, key)</code>. Track walks the global <code>targetMap</code> (a WeakMap of object to depsMap), then <code>depsMap</code> (a Map of key to Dep), and adds activeEffect to that dependency set. The link is bidirectional: the effect also stores its Deps so they can be cleaned up.</p>' +
          '<p>Nested objects are wrapped in proxies lazily, on read, so <code>user.name</code> creates a second track pair. The assignment enters the <code>set</code> trap, which compares with <code>Object.is</code>: an identical value ends there with no side effect. A different value calls <code>trigger</code>, which pulls the effect set out of targetMap and hands it to the scheduler.</p>' +
          '<p>The render effect has a scheduler, so it does not run inline: it is queued as a microtask and deduplicated. That is why a hundred mutations in one function produce one render, and why <code>await nextTick()</code> is the point where the DOM is already up to date.</p>',
      },
      keyPoints: [
        { pl: 'get trap woła track i zapisuje activeEffect w targetMap, depsMap, Dep', en: 'The get trap calls track and stores activeEffect in targetMap, depsMap, Dep' },
        { pl: 'Proxy dla zagnieżdżonych obiektów tworzy się leniwie, przy odczycie', en: 'Proxies for nested objects are created lazily, on read' },
        { pl: 'set trap porównuje przez Object.is - identyczna wartość nie woła trigger', en: 'The set trap compares with Object.is - an identical value never triggers' },
        { pl: 'Efekt renderujący ma scheduler: kolejka mikrozadań, deduplikacja, jeden render', en: 'The render effect has a scheduler: microtask queue, dedupe, one render' },
        { pl: 'nextTick() to moment po wykonaniu kolejki, czyli po aktualizacji DOM', en: 'nextTick() is the point after the queue flushes, i.e. after the DOM update' },
      ],
    },
    // 3
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'W <script setup> masz const items = ref([]) oraz const box = reactive({ items: ref([]) }). Gdzie w szablonie musisz napisać .value?',
        en: 'In <script setup> you have const items = ref([]) and const box = reactive({ items: ref([]) }). Where do you need .value in the template?',
      },
      options: [
        {
          pl: 'Nigdzie - oba przypadki są rozpakowywane, bo ref wewnątrz reactive też jest unwrapowany',
          en: 'Nowhere - both are unwrapped, because a ref inside reactive is unwrapped too',
        },
        {
          pl: 'Tylko przy items, bo top-level refy w szablonie wymagają jawnego .value',
          en: 'Only on items, because top-level refs require an explicit .value in templates',
        },
        {
          pl: 'Tylko przy box.items, bo reactive nie rozpakowuje refów',
          en: 'Only on box.items, because reactive does not unwrap refs',
        },
        {
          pl: 'W obu, jeśli tablica jest pusta przy pierwszym renderze',
          en: 'On both, if the array is empty on first render',
        },
      ],
      correct: 0,
      explain: {
        pl: 'Szablon rozpakowuje refy z top-level bindingów, a reactive() rozpakowuje refy w swoich właściwościach. Pułapka jest gdzie indziej: w tablicach i Mapach unwrapping nie działa, więc arr.value[0].value już jest potrzebne.',
        en: 'Templates unwrap top-level ref bindings, and reactive() unwraps refs stored in its properties. The trap is elsewhere: unwrapping does not apply inside arrays or Maps, so arr.value[0].value is required there.',
      },
    },
    // 4
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Zespół zgłasza, że computed czasem zwraca nieaktualne dane. W środku jest: return this.items.filter(i => i.date > Date.now()). Diagnoza?',
        en: 'A team reports a computed sometimes returns stale data. Inside it: return this.items.filter(i => i.date > Date.now()). Diagnosis?',
      },
      options: [
        {
          pl: 'filter() nie jest śledzony, trzeba użyć pętli for..of',
          en: 'filter() is not tracked, you have to use a for..of loop',
        },
        {
          pl: 'Computed w Options API nie cachuje, więc problem leży gdzie indziej',
          en: 'Computed in the Options API does not cache, so the problem is elsewhere',
        },
        {
          pl: 'Trzeba dodać deep: true do computed',
          en: 'You need to add deep: true to the computed',
        },
        {
          pl: 'Date.now() nie jest zależnością reaktywną, więc cache computed nie ma powodu się unieważnić, dopóki nie zmieni się items',
          en: 'Date.now() is not a reactive dependency, so the computed cache has no reason to invalidate until items changes',
        },
      ],
      correct: 3,
      explain: {
        pl: 'Computed unieważnia się tylko wtedy, gdy zmieni się jego reaktywna zależność. Czas, Math.random(), localStorage czy wynik fetch nie są śledzone. Rozwiązanie: wprowadź reaktywne "teraz" (ref aktualizowany interwałem) albo policz to poza cache.',
        en: 'A computed invalidates only when one of its reactive dependencies changes. Time, Math.random(), localStorage or a fetch result are not tracked. Fix: introduce a reactive now (a ref updated on an interval) or compute it outside the cache.',
      },
    },
    // 5
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Po tygodniu w produkcji SPA zjada 1.5 GB RAM i zwalnia. Profil pokazuje tysiące żywych efektów po komponentach, których już nie ma w drzewie. Opowiedz, jak to diagnozujesz i naprawiasz.',
        en: 'After a week in production the SPA eats 1.5 GB of RAM and crawls. A profile shows thousands of live effects belonging to components no longer in the tree. Walk me through diagnosing and fixing it.',
      },
      answer: {
        pl: '<p>Zaczynam od heap snapshotów: dwa zrzuty rozdzielone kilkoma cyklami nawigacji i porównanie w trybie <em>Objects allocated between snapshots</em>. Retainer path zwykle prowadzi do konkretnego composable albo do zewnętrznej biblioteki trzymającej callback.</p>' +
          '<p>Typowe źródła: watch albo watchEffect utworzony poza <code>setup()</code> (na przykład w handlerze albo w funkcji async po await) - wtedy nie ma aktywnej instancji, więc efekt nie należy do scope komponentu i nikt go nie zatrzyma. Dalej: subskrypcje (WebSocket, EventSource, addEventListener, IntersectionObserver, setInterval) bez sprzątania oraz store trzymający referencje do węzłów DOM albo instancji komponentów.</p>' +
          '<p>Naprawa: każdy composable, który tworzy efekty, sprząta się sam - <code>onScopeDispose</code> (działa też poza komponentem) zamiast samego <code>onUnmounted</code>. Dla pracy poza cyklem życia opakowuję całość w <code>effectScope()</code> i wołam <code>scope.stop()</code> przy zamknięciu. Watcher tworzony po await dostaje jawny uchwyt stop. Na koniec dodaję test regresyjny: montuj i odmontowuj widok w pętli i sprawdź, że liczba obiektów po wymuszonym GC nie rośnie liniowo.</p>',
        en: '<p>I start with heap snapshots: two dumps separated by several navigation cycles, compared in <em>Objects allocated between snapshots</em> mode. The retainer path usually points at one composable or an external library holding a callback.</p>' +
          '<p>Typical sources: a watch or watchEffect created outside <code>setup()</code> - for example in a handler or in an async function after an await - where there is no active instance, so the effect is not owned by the component scope and nothing stops it. Then: subscriptions (WebSocket, EventSource, addEventListener, IntersectionObserver, setInterval) with no teardown, and stores holding references to DOM nodes or component instances.</p>' +
          '<p>The fix: every composable that creates effects cleans up after itself using <code>onScopeDispose</code> (which also works outside components) rather than only <code>onUnmounted</code>. For work outside the lifecycle I wrap everything in an <code>effectScope()</code> and call <code>scope.stop()</code> on teardown. A watcher created after an await gets an explicit stop handle. Finally I add a regression test: mount and unmount the view in a loop and assert that object counts after a forced GC do not grow linearly.</p>',
      },
      keyPoints: [
        { pl: 'Heap snapshot i retainer path zamiast zgadywania', en: 'Heap snapshot plus retainer path instead of guessing' },
        { pl: 'Efekty tworzone po await albo poza setup() nie należą do scope komponentu', en: 'Effects created after an await or outside setup() do not belong to the component scope' },
        { pl: 'onScopeDispose i effectScope() jako kontrakt sprzątania w composables', en: 'onScopeDispose and effectScope() as the cleanup contract in composables' },
        { pl: 'Subskrypcje i timery zawsze z jawnym teardownem', en: 'Subscriptions and timers always with explicit teardown' },
        { pl: 'Test regresyjny mount/unmount w pętli pilnuje, żeby nie wróciło', en: 'A mount/unmount loop regression test keeps it from coming back' },
      ],
    },
    // 6
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'watch(state, (nv, ov) => diff(ov, nv), { deep: true }) na obiekcie reactive. Dlaczego diff zawsze zwraca pusty wynik?',
        en: 'watch(state, (nv, ov) => diff(ov, nv), { deep: true }) on a reactive object. Why does diff always return nothing?',
      },
      options: [
        {
          pl: 'deep: true wyłącza przekazywanie oldValue',
          en: 'deep: true disables passing oldValue',
        },
        {
          pl: 'Watcher na obiekcie dostaje tę samą referencję jako nv i ov - Vue nie robi kopii poprzedniego stanu',
          en: 'A watcher on an object receives the same reference as nv and ov - Vue does not clone the previous state',
        },
        {
          pl: 'diff musi być wywołany w nextTick, inaczej widzi stan sprzed mutacji',
          en: 'diff must run in nextTick, otherwise it sees the pre-mutation state',
        },
        {
          pl: 'Watcher z flush: pre nie ma dostępu do poprzedniej wartości',
          en: 'A watcher with flush: pre has no access to the previous value',
        },
      ],
      correct: 1,
      explain: {
        pl: 'Przy źródle będącym obiektem mutowanym w miejscu nv === ov. Jeśli potrzebujesz diffa, śledź getter zwracający strukturalną kopię (na przykład () => structuredClone(toRaw(state))) albo pilnuj konkretnych pól - kosztem wydajności przy dużych obiektach.',
        en: 'When the source is an object mutated in place, nv === ov. If you need a diff, watch a getter returning a structural copy (e.g. () => structuredClone(toRaw(state))) or watch specific fields - at a performance cost on large objects.',
      },
    },
    // 7
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Które zdanie o watchEffect kontra watch jest prawdziwe w produkcyjnym kodzie?',
        en: 'Which statement about watchEffect versus watch is true in production code?',
      },
      options: [
        {
          pl: 'watchEffect uruchamia się natychmiast i zbiera zależności dynamicznie, więc gałąź warunkowa może wypaść z subskrypcji',
          en: 'watchEffect runs immediately and collects dependencies dynamically, so a conditional branch can drop out of the subscription',
        },
        {
          pl: 'watchEffect zawsze jest deep, a watch zawsze shallow',
          en: 'watchEffect is always deep and watch is always shallow',
        },
        {
          pl: 'watch domyślnie działa z flush: post, a watchEffect z flush: sync',
          en: 'watch defaults to flush: post and watchEffect to flush: sync',
        },
        {
          pl: 'watchEffect nie przyjmuje funkcji sprzątającej',
          en: 'watchEffect does not accept a cleanup function',
        },
      ],
      correct: 0,
      explain: {
        pl: 'Oba domyślnie mają flush: pre i oba przyjmują onCleanup. Różnica jest w modelu zależności: watchEffect śledzi to, co faktycznie zostało odczytane w danym przebiegu - jeśli warunek odetnie gałąź, jej zależności znikają do czasu ponownego odczytu.',
        en: 'Both default to flush: pre and both accept onCleanup. The difference is the dependency model: watchEffect tracks whatever was actually read in that run - if a condition cuts a branch, its dependencies disappear until read again.',
      },
    },
    // 8
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'W aplikacji Nuxt użytkownik A widzi na chwilę dane użytkownika B. Podejrzewasz stan współdzielony na serwerze. Jak to potwierdzasz i jakie są zasady pisania composables bezpiecznych dla SSR?',
        en: 'In a Nuxt app user A briefly sees user B data. You suspect shared server state. How do you confirm it, and what are the rules for SSR-safe composables?',
      },
      answer: {
        pl: '<p>Potwierdzenie: dwa równoległe requesty z różnymi sesjami, logowanie identyfikatora requestu wewnątrz composable i sprawdzenie, czy moduł trzyma stan poza funkcją. Klasyczny błąd to <code>const user = ref(null)</code> na poziomie modułu - w SSR moduł jest ładowany raz na proces, więc ten ref jest wspólny dla wszystkich równoczesnych requestów. W przeglądarce nikt tego nie zauważy, bo tam proces to jedna karta.</p>' +
          '<p>Zasady: stan per request trzymamy w <code>useState(key, init)</code> (Nuxt wiąże go z kontekstem requestu i serializuje do payloadu) albo w instancji Pinia tworzonej per aplikacja. Żadnych singletonów na poziomie modułu poza czystą konfiguracją. Dostęp do <code>window</code>, <code>document</code> czy <code>localStorage</code> tylko w <code>onMounted</code> lub pod <code>import.meta.client</code>. Żadnych efektów ubocznych w ciele composable, które zakładają przeglądarkę.</p>' +
          '<p>Do tego uwaga na cache: jeśli trasa jest cachowana na CDN, a render zawiera dane użytkownika, wyciek jest gwarantowany niezależnie od kodu. Spersonalizowane trasy oznaczam jako niecachowalne. Regresje łapie test integracyjny wysyłający dwa requesty z różnymi ciasteczkami i porównujący HTML.</p>',
        en: '<p>Confirmation: fire two concurrent requests with different sessions, log a request id inside the composable, and check whether the module holds state outside the function. The classic bug is <code>const user = ref(null)</code> at module scope - under SSR the module is loaded once per process, so that ref is shared by every concurrent request. Nobody notices in the browser, where the process is a single tab.</p>' +
          '<p>The rules: per-request state lives in <code>useState(key, init)</code> (Nuxt binds it to the request context and serializes it into the payload) or in a Pinia instance created per app. No module-level singletons other than pure configuration. Touch <code>window</code>, <code>document</code> or <code>localStorage</code> only inside <code>onMounted</code> or behind <code>import.meta.client</code>. No side effects in the composable body that assume a browser.</p>' +
          '<p>Also watch caching: if a route is cached at the CDN and the render contains user data, the leak is guaranteed regardless of code. I mark personalized routes as non-cacheable. An integration test that sends two requests with different cookies and diffs the HTML catches regressions.</p>',
      },
      keyPoints: [
        { pl: 'Stan na poziomie modułu jest współdzielony między requestami w SSR', en: 'Module-level state is shared across requests under SSR' },
        { pl: 'useState albo Pinia per aplikacja zamiast singletonów', en: 'useState or a per-app Pinia instance instead of singletons' },
        { pl: 'API przeglądarki tylko w onMounted albo pod import.meta.client', en: 'Browser APIs only in onMounted or behind import.meta.client' },
        { pl: 'Cache CDN na spersonalizowanej trasie wycieknie niezależnie od kodu', en: 'CDN caching on a personalized route leaks regardless of code' },
        { pl: 'Test: dwa równoległe requesty z różnymi sesjami i diff HTML', en: 'Test: two concurrent requests with different sessions, diff the HTML' },
      ],
    },
    // 9
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Piszesz warstwę cache poza komponentami: tworzy watchery i interwały, używana też w testach node bez montowania. Czym to opakować, żeby dało się wszystko zatrzymać jednym wywołaniem?',
        en: 'You are writing a caching layer outside components: it creates watchers and intervals and is also used in node tests without mounting. What do you wrap it in so everything stops with one call?',
      },
      options: [
        { pl: 'getCurrentInstance() i ręczne onUnmounted', en: 'getCurrentInstance() plus manual onUnmounted' },
        { pl: 'markRaw() na obiekcie cache', en: 'markRaw() on the cache object' },
        { pl: 'effectScope() - scope.run(fn) tworzy efekty w jego obrębie, a scope.stop() zatrzymuje wszystkie naraz, wraz z zagnieżdżonymi', en: 'effectScope() - scope.run(fn) creates effects inside it and scope.stop() halts them all at once, nested ones included' },
        { pl: 'Store Pinia, bo store sam sprząta efekty przy HMR', en: 'A Pinia store, because stores clean their effects on HMR' },
      ],
      correct: 2,
      explain: {
        pl: 'effectScope to właśnie kontener na efekty bez komponentu - Pinia używa go pod spodem dla store. W środku działa onScopeDispose, więc composable może zarejestrować własne sprzątanie, nie wiedząc, czy jest w komponencie.',
        en: 'effectScope is exactly a container for effects without a component - Pinia uses it under the hood for stores. onScopeDispose works inside it, so a composable can register cleanup without knowing whether it is in a component.',
      },
    },
    // 10
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Tabela z 20 000 wierszy przychodzących z WebSocketa co sekundę. Zamiana ref na shallowRef pomaga, bo...',
        en: 'A table of 20 000 rows arriving over a WebSocket every second. Switching ref to shallowRef helps because...',
      },
      options: [
        { pl: 'shallowRef pomija render virtual DOM dla dzieci', en: 'shallowRef skips virtual DOM rendering for children' },
        { pl: 'shallowRef automatycznie debounce-uje aktualizacje', en: 'shallowRef debounces updates automatically' },
        { pl: 'Znika koszt tworzenia proxy i śledzenia dla każdego obiektu wiersza - trigger dzieje się tylko przy podmianie całej referencji', en: 'The cost of creating proxies and tracking every row object disappears - trigger happens only when the whole reference is replaced' },
        { pl: 'shallowRef trzyma dane poza stertą JS', en: 'shallowRef stores data outside the JS heap' },
      ],
      correct: 2,
      explain: {
        pl: 'Głębokie proxy dla 20 000 obiektów to 20 000 opakowań i setki tysięcy wpisów w depsMap. shallowRef daje jeden punkt unieważnienia. Warunek: musisz podmieniać całą tablicę, mutacja w miejscu nic nie zrobi. Uzupełnij to wirtualizacją listy.',
        en: 'Deep proxies for 20 000 objects mean 20 000 wrappers and hundreds of thousands of depsMap entries. shallowRef gives you one invalidation point. The catch: you must replace the whole array, in-place mutation does nothing. Pair it with list virtualization.',
      },
    },
    // 11
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Jak ułożyłbyś strategię testów dla aplikacji Vue z 300 komponentami i 15 osobami w zespole? Co i na jakim poziomie testujesz?',
        en: 'How would you shape the testing strategy for a Vue app with 300 components and a 15-person team? What do you test at which level?',
      },
      answer: {
        pl: '<p>Fundament to szybkie testy jednostkowe w Vitest dla logiki bez DOM: composables, funkcje czyste, mappery, akcje i gettery Pinia. Są tanie, więc mogą być liczne i uruchamiają się przy każdym zapisie pliku.</p>' +
          '<p>Warstwa środkowa to testy komponentów. Używam Testing Library albo Vue Test Utils, ale zawsze testuję kontrakt: propsy wchodzą, emitowane zdarzenia i widoczny tekst wychodzą. Żadnego zaglądania w <code>wrapper.vm</code>, żadnych asercji na klasy CSS będące szczegółem implementacji, bo to generuje testy psujące się przy każdym refaktorze. Komponenty z realnym CSS i logiką layoutu idą do testów komponentowych w Playwright albo Cypress, gdzie działa prawdziwa przeglądarka.</p>' +
          '<p>Na górze wąska warstwa E2E: dziesięć do dwudziestu przepływów, które realnie zarabiają - logowanie, checkout, krytyczny formularz. Są wolne i kruche, więc nie dublują logiki niżej. Do tego snapshoty wizualne dla design systemu i MSW jako jedno źródło mocków sieci, współdzielone przez wszystkie poziomy.</p>' +
          '<p>Reguły zespołowe: pokrycie nie jest celem samym w sobie, ale każdy błąd produkcyjny dostaje test regresyjny, a testy nie mogą zależeć od kolejności uruchomienia.</p>',
        en: '<p>The base layer is fast Vitest unit tests for logic without a DOM: composables, pure functions, mappers, Pinia actions and getters. They are cheap, so they can be numerous and run on every file save.</p>' +
          '<p>The middle layer is component tests. I use Testing Library or Vue Test Utils, but always test the contract: props go in, emitted events and visible text come out. No reaching into <code>wrapper.vm</code>, no asserting CSS classes that are implementation details, because that produces tests which break on every refactor. Components with real CSS and layout logic go into component tests in Playwright or Cypress, where a real browser runs.</p>' +
          '<p>On top, a thin E2E layer: ten to twenty flows that actually make money - login, checkout, the critical form. They are slow and flaky, so they must not duplicate the logic below. Add visual snapshots for the design system and MSW as the single source of network mocks shared by every level.</p>' +
          '<p>Team rules: coverage is not a goal in itself, but every production bug earns a regression test, and no test may depend on execution order.</p>',
      },
      keyPoints: [
        { pl: 'Dużo taniej logiki w Vitest, mało drogich testów E2E', en: 'Lots of cheap logic tests in Vitest, few expensive E2E tests' },
        { pl: 'Testy komponentów sprawdzają kontrakt: propsy wchodzą, emity i tekst wychodzą', en: 'Component tests assert the contract: props in, emits and visible text out' },
        { pl: 'Zero asercji na wrapper.vm i na klasy CSS będące szczegółem implementacji', en: 'No assertions on wrapper.vm or CSS classes that are implementation details' },
        { pl: 'MSW jako jedno źródło mocków sieci na wszystkich poziomach', en: 'MSW as the single source of network mocks across all levels' },
        { pl: 'Każdy błąd produkcyjny dostaje test regresyjny', en: 'Every production bug earns a regression test' },
      ],
    },
    // 12
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'v-for po liście zadań z :key="index". Użytkownik usuwa pierwszy element i nagle checkbox zaznaczony w wierszu 3 ląduje w wierszu 2, a input traci tekst. Dlaczego?',
        en: 'v-for over a task list with :key="index". The user deletes the first item and suddenly a checkbox ticked in row 3 lands in row 2 and an input loses its text. Why?',
      },
      options: [
        { pl: 'Vue nie obsługuje usuwania z początku tablicy bez nextTick', en: 'Vue cannot handle removal from the head of an array without nextTick' },
        { pl: 'Checkbox wymaga v-model.lazy przy v-for', en: 'Checkboxes require v-model.lazy inside v-for' },
        { pl: 'Trzeba dodać :key na elemencie nadrzędnym, nie na iterowanym', en: 'The :key belongs on the parent element, not the iterated one' },
        { pl: 'Klucz to pozycja, a nie tożsamość, więc po usunięciu Vue dopasowuje stary vnode do innego elementu i reużywa jego stanu DOM oraz stanu komponentu', en: 'The key is a position, not an identity, so after removal Vue matches an old vnode to a different item and reuses its DOM and component state' },
      ],
      correct: 3,
      explain: {
        pl: 'Klucz to obietnica tożsamości dla algorytmu patchowania. Indeks jest stabilny tylko przy listach tylko do odczytu, bez zmian kolejności. Używaj id z backendu, a przy jego braku - stabilnego identyfikatora nadanego przy tworzeniu.',
        en: 'A key is an identity promise for the patch algorithm. Index is stable only for read-only lists that never reorder. Use the backend id, or a stable id assigned at creation time when there is none.',
      },
    },
    // 13
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Które użycie v-memo jest realną optymalizacją, a nie strzałem w stopę?',
        en: 'Which use of v-memo is a real optimization rather than a foot-gun?',
      },
      options: [
        { pl: 'v-memo bez tablicy na komponencie, żeby zamrozić go na zawsze', en: 'v-memo with no array on a component, to freeze it forever' },
        { pl: 'v-memo="[item]" na każdym wierszu małej listy 20 pozycji', en: 'v-memo="[item]" on every row of a small 20-item list' },
        { pl: 'v-memo="[item.id === selectedId]" na wierszu dużej wirtualizowanej tabeli, gdzie zmiana zaznaczenia jest jedynym powodem przerysowania', en: 'v-memo="[item.id === selectedId]" on a row of a large virtualized table where selection change is the only reason to repaint' },
        { pl: 'v-memo na elemencie głównym aplikacji, żeby ograniczyć rendery globalnie', en: 'v-memo on the app root element to limit renders globally' },
      ],
      correct: 2,
      explain: {
        pl: 'v-memo opłaca się tylko na dużych listach z wąskim, jawnym warunkiem zmiany. Błędna tablica zależności daje ciche zamrożenie UI, a przy małych listach sam koszt porównania zjada zysk. To narzędzie ostatniej instancji, po wirtualizacji.',
        en: 'v-memo pays off only on large lists with a narrow, explicit change condition. A wrong dependency array silently freezes the UI, and on small lists the comparison cost eats the gain. It is a last-resort tool, after virtualization.',
      },
    },
    // 14
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Widok z tabelą i filtrami zacina się przy pisaniu w polu wyszukiwania: każdy znak to 300 ms blokady. Opisz ścieżkę od pomiaru do naprawy.',
        en: 'A view with a table and filters janks while typing in the search box: every keystroke blocks for 300 ms. Describe the path from measurement to fix.',
      },
      answer: {
        pl: '<p>Najpierw pomiar, nie zgadywanie. Performance panel z CPU throttling 4x i nagranie kilku znaków: interesuje mnie podział czasu na skrypt, recalculate style i layout. Równolegle Vue Devtools, zakładka Performance, pokazuje, które komponenty renderują się ponownie i ile razy.</p>' +
          '<p>Najczęstsze przyczyny w takim widoku: filtrowanie i sortowanie liczone w szablonie albo w metodzie zamiast w <code>computed</code>, więc praca powtarza się przy każdym renderze; brak wirtualizacji, czyli 5000 wierszy w DOM; głębokie proxy na dużym zbiorze danych; watcher z <code>deep: true</code> na całej tablicy; wymuszony reflow przez odczyt <code>offsetHeight</code> w pętli.</p>' +
          '<p>Naprawa po kolei, z pomiarem po każdym kroku: debounce 150-250 ms na zapytaniu (osobny ref dla wartości pola i osobny dla zapytania), przeniesienie ciężkiej pracy do computed, <code>shallowRef</code> z niemutowalną podmianą danych, wirtualizacja listy, a jeśli sam filtr jest kosztowny - przeniesienie go na serwer albo do Web Workera. Na koniec stabilne <code>:key</code> i ewentualnie <code>v-memo</code> na wierszu. Wynik zamykam w budżecie: INP poniżej 200 ms, pilnowanym w CI na reprezentatywnym zbiorze danych.</p>',
        en: '<p>Measure first, do not guess. Performance panel with 4x CPU throttling, recording a few keystrokes: I want the split between scripting, recalculate style and layout. In parallel the Vue Devtools Performance tab shows which components re-render and how often.</p>' +
          '<p>The usual causes in such a view: filtering and sorting computed in the template or a method instead of a <code>computed</code>, so the work repeats on every render; no virtualization, meaning 5000 rows in the DOM; deep proxies over a large dataset; a <code>deep: true</code> watcher on the whole array; forced reflow from reading <code>offsetHeight</code> in a loop.</p>' +
          '<p>Fix them one at a time, measuring after each: debounce the query by 150-250 ms (separate refs for the input value and the query), move heavy work into a computed, use <code>shallowRef</code> with immutable replacement, virtualize the list, and if the filter itself is expensive move it to the server or a Web Worker. Finally stable <code>:key</code> values and possibly <code>v-memo</code> on the row. I close it with a budget: INP under 200 ms, enforced in CI against a representative dataset.</p>',
      },
      keyPoints: [
        { pl: 'Najpierw profil: Performance panel z throttlingiem plus Vue Devtools', en: 'Profile first: Performance panel with throttling plus Vue Devtools' },
        { pl: 'Praca w szablonie zamiast w computed to koszt powtarzany co render', en: 'Work in the template instead of a computed is cost repeated every render' },
        { pl: 'Wirtualizacja i shallowRef dla dużych zbiorów danych', en: 'Virtualization and shallowRef for large datasets' },
        { pl: 'Debounce zapytania oddzielony od wartości pola', en: 'Debounce the query separately from the input value' },
        { pl: 'Zamknięcie tematu budżetem wydajności pilnowanym w CI', en: 'Close it with a performance budget enforced in CI' },
      ],
    },
    // 15
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Błąd w produkcji: "getActivePinia() was called but there was no active Pinia". Rzuca się z funkcji pomocniczej importowanej w router guardzie. Najlepsza naprawa?',
        en: 'Production error: "getActivePinia() was called but there was no active Pinia". It is thrown from a helper imported in a router guard. Best fix?',
      },
      options: [
        { pl: 'Wywołać useStore() dopiero w ciele guarda, po tym jak app.use(pinia) już się wykonało - a nie na poziomie modułu', en: 'Call useStore() inside the guard body, after app.use(pinia) has run - not at module scope' },
        { pl: 'Zamienić store na reactive() z globalnym eksportem', en: 'Replace the store with a globally exported reactive()' },
        { pl: 'Dodać setActivePinia(createPinia()) w każdym pliku, który używa store', en: 'Add setActivePinia(createPinia()) in every file that uses a store' },
        { pl: 'Przenieść guard do komponentu, bo guardy nie mają dostępu do Pinia', en: 'Move the guard into a component, because guards cannot access Pinia' },
      ],
      correct: 0,
      explain: {
        pl: 'useStore() jest z założenia leniwe - musi zostać wywołane, gdy instancja Pinia jest już aktywna. Wywołanie na poziomie modułu wykonuje się w czasie importu, często przed app.use(pinia). W testach i w SSR zamiast tego jawnie ustawiasz instancję przez setActivePinia w setupie.',
        en: 'useStore() is lazy by design - it must be called once a Pinia instance is active. Calling it at module scope runs at import time, often before app.use(pinia). In tests and SSR you instead set the instance explicitly with setActivePinia in setup.',
      },
    },
    // 16
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'const { items, total } = useCartStore() - lista przestaje się odświeżać, ale wywołanie akcji nadal działa. Co się dzieje?',
        en: 'const { items, total } = useCartStore() - the list stops updating but calling actions still works. What is going on?',
      },
      options: [
        { pl: 'Akcje są reaktywne, a stan nie - to normalne zachowanie Pinia', en: 'Actions are reactive and state is not - that is normal Pinia behaviour' },
        { pl: 'Destrukturyzacja zdejmuje stan i gettery z proxy store, a akcje to zwykłe funkcje, więc przeżywają. Do stanu użyj storeToRefs()', en: 'Destructuring strips state and getters off the store proxy; actions are plain functions so they survive. Use storeToRefs() for state' },
        { pl: 'Brakuje wywołania store.$subscribe()', en: 'A store.$subscribe() call is missing' },
        { pl: 'Store musi być zdefiniowany składnią options, żeby destrukturyzacja działała', en: 'The store must use the options syntax for destructuring to work' },
      ],
      correct: 1,
      explain: {
        pl: 'Store to obiekt reaktywny - ten sam mechanizm co przy reactive(). storeToRefs() zwraca refy dla stanu i getterów, pomijając akcje. Akcje można destrukturyzować bezpiecznie, bo nie zależą od śledzenia właściwości.',
        en: 'A store is a reactive object - the same mechanism as reactive(). storeToRefs() returns refs for state and getters while skipping actions. Actions can be destructured safely because they do not rely on property tracking.',
      },
    },
    // 17
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Aplikacja ma jeden store Pinia z 40 polami stanu i 25 akcjami. Zespół narzeka na konflikty w gicie i trudne testy. Jak przeprojektowałbyś warstwę stanu?',
        en: 'The app has one Pinia store with 40 state fields and 25 actions. The team complains about git conflicts and hard tests. How would you redesign the state layer?',
      },
      answer: {
        pl: '<p>Zaczynam od pytania, co w ogóle należy do store. Stan serwera (dane z API, cache, retry, inwalidacja) ma inne wymagania niż stan klienta i zwykle lepiej leży w warstwie zapytań: TanStack Query albo useAsyncData w Nuxt. Stan URL należy do routera. W Pinia zostaje stan naprawdę globalny i międzyekranowy: sesja, uprawnienia, koszyk, ustawienia, powiadomienia.</p>' +
          '<p>Resztę tnę według domeny, nie według typu danych: <code>useAuthStore</code>, <code>useCartStore</code>, <code>useCheckoutStore</code>. Każdy store ma wąskie publiczne API i własny plik, co samo z siebie rozwiązuje konflikty w gicie. Zależności między store’ami są jednokierunkowe - checkout woła cart, nigdy odwrotnie - bo cykle kończą się nieskończonymi aktualizacjami i nietestowalnym kodem.</p>' +
          '<p>Stan lokalny widoku zostaje w komponencie albo w composable; nie każdy ref musi być globalny. Powtarzalne zachowania (persystencja, logowanie, reset przy wylogowaniu) wchodzą jako plugin Pinia zamiast kopiuj-wklej. Testy piszę na createTestingPinia z jawnym stanem początkowym i asercjami na akcje.</p>' +
          '<p>Migracja przyrostowa: nowe funkcje w nowych store’ach, a stary store kurczy się przy okazji dotykania kodu, zamiast wielkiego refaktoru na raz.</p>',
        en: '<p>I start by asking what belongs in a store at all. Server state (API data, caching, retries, invalidation) has different requirements from client state and usually belongs in a query layer - TanStack Query or useAsyncData in Nuxt. URL state belongs to the router. What stays in Pinia is genuinely global, cross-screen state: session, permissions, cart, settings, notifications.</p>' +
          '<p>The rest I split by domain, not by data type: <code>useAuthStore</code>, <code>useCartStore</code>, <code>useCheckoutStore</code>. Each store has a narrow public API and its own file, which alone fixes the git conflicts. Dependencies between stores stay one-directional - checkout calls cart, never the reverse - because cycles end in update loops and untestable code.</p>' +
          '<p>View-local state stays in the component or a composable; not every ref must be global. Repeated behaviours (persistence, logging, reset on logout) become a Pinia plugin instead of copy-paste. Tests use createTestingPinia with an explicit initial state and assertions on actions.</p>' +
          '<p>Migration is incremental: new features get new stores and the old store shrinks whenever the code is touched, rather than one big-bang refactor.</p>',
      },
      keyPoints: [
        { pl: 'Rozdziel stan serwera, stan URL i stan klienta - nie wszystko idzie do Pinia', en: 'Separate server state, URL state and client state - not everything belongs in Pinia' },
        { pl: 'Podział według domeny, jeden plik na store, wąskie publiczne API', en: 'Split by domain, one file per store, narrow public API' },
        { pl: 'Zależności między store’ami jednokierunkowe, bez cykli', en: 'One-directional dependencies between stores, no cycles' },
        { pl: 'Powtarzalne zachowania jako plugin Pinia', en: 'Repeated behaviours as a Pinia plugin' },
        { pl: 'Migracja przyrostowa zamiast wielkiego refaktoru', en: 'Incremental migration instead of a big-bang refactor' },
      ],
    },
    // 18
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Getter Pinia liczy sumę 5000 pozycji koszyka. Jest odczytywany w 12 komponentach przy każdym renderze. Kiedy realnie się przeliczy?',
        en: 'A Pinia getter sums 5000 cart items. It is read in 12 components on every render. When does it actually recompute?',
      },
      options: [
        { pl: 'Raz na każdy odczyt, czyli 12 razy na render', en: 'Once per read, so 12 times per render' },
        { pl: 'Raz na render całej aplikacji', en: 'Once per whole-app render' },
        { pl: 'Tylko wtedy, gdy zmieni się reaktywna zależność gettera; potem pierwszy odczyt liczy, a pozostałe biorą wynik z cache', en: 'Only when a reactive dependency of the getter changes; then the first read computes and the rest hit the cache' },
        { pl: 'Nigdy, dopóki nie wywołasz store.$reset()', en: 'Never, until you call store.$reset()' },
      ],
      correct: 2,
      explain: {
        pl: 'Gettery to computed pod spodem: cache unieważnia trigger, nie render. Uwaga na gettery z argumentem, czyli zwracające funkcję - one cache nie mają i liczą się przy każdym wywołaniu.',
        en: 'Getters are computed under the hood: the cache is invalidated by trigger, not by rendering. Watch out for parametrized getters that return a function though - those have no cache and run on every call.',
      },
    },
    // 19
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'W guardzie beforeEach: jeśli brak tokenu, wołasz next("/login"), a na końcu funkcji zawsze next(). W logach masz ostrzeżenia o wielokrotnym next i losowe puste ekrany. Jak to naprawić właściwie?',
        en: 'In a beforeEach guard: if there is no token you call next("/login"), and at the end of the function always next(). Logs show duplicate-next warnings and random blank screens. What is the proper fix?',
      },
      options: [
        { pl: 'Dodać return przed każdym next(), a najlepiej zwracać wartość (false, trasę albo undefined) zamiast wołać next', en: 'Add return before every next(), or better: return a value (false, a route, or undefined) instead of calling next' },
        { pl: 'Owinąć guard w setTimeout, żeby nawigacje się nie nakładały', en: 'Wrap the guard in setTimeout so navigations do not overlap' },
        { pl: 'Zamienić beforeEach na afterEach', en: 'Swap beforeEach for afterEach' },
        { pl: 'Użyć router.replace() wewnątrz guarda zamiast next', en: 'Use router.replace() inside the guard instead of next' },
      ],
      correct: 0,
      explain: {
        pl: 'next() może być wywołane dokładnie raz na przebieg guarda; drugie wywołanie daje niezdefiniowane zachowanie. Vue Router 4 pozwala po prostu zwrócić wynik z guarda, co eliminuje całą klasę błędów, zwłaszcza w guardach asynchronicznych.',
        en: 'next() may be called exactly once per guard run; a second call is undefined behaviour. Vue Router 4 lets you simply return a value from the guard, which removes this entire class of bugs, especially in async guards.',
      },
    },
    // 20
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Nuxt zgłasza hydration mismatch tylko na produkcji i tylko dla części użytkowników. Jak zawężasz przyczynę i jakie są typowe źródła?',
        en: 'Nuxt reports a hydration mismatch only in production and only for some users. How do you narrow it down, and what are the typical sources?',
      },
      answer: {
        pl: '<p>Mismatch znaczy, że HTML z serwera różni się od pierwszego renderu klienta. Zawężam przez porównanie: pobieram surowy HTML odpowiedzi (curl, bez JS) i zestawiam z DOM po hydracji wokół węzła wskazanego przez ostrzeżenie. Włączam <code>debug</code> w konfiguracji, żeby dostać czytelniejszy komunikat ze ścieżką komponentu.</p>' +
          '<p>Typowe źródła: czas i strefa czasowa, bo <code>new Date().toLocaleString()</code> renderuje inaczej na serwerze i u użytkownika; <code>Math.random()</code> lub generowane identyfikatory; odczyt <code>window</code>, <code>localStorage</code> albo szerokości ekranu w setupie, przez co serwer widzi inny wariant; różnice danych między requestem SSR a pierwszym fetchem klienta, gdy nie ma współdzielonego payloadu, bo użyto gołego fetch zamiast <code>useAsyncData</code> z kluczem; niepoprawny HTML, na przykład <code>div</code> wewnątrz <code>p</code>, który przeglądarka przestawia; wreszcie rozszerzenia przeglądarki wstrzykujące węzły - to tłumaczy "tylko część użytkowników".</p>' +
          '<p>Naprawa zależnie od źródła: formatowanie dat na stałej strefie albo dopiero po <code>onMounted</code>, <code>useId()</code> zamiast losowych identyfikatorów, <code>ClientOnly</code> dla fragmentów zależnych od przeglądarki, <code>useAsyncData</code> z jawnym kluczem, poprawiony HTML. Na koniec test E2E, który failuje na ostrzeżeniu hydracji.</p>',
        en: '<p>A mismatch means the server HTML differs from the first client render. I narrow it by comparison: fetch the raw response HTML (curl, no JS) and diff it against the hydrated DOM around the node the warning points at. I enable <code>debug</code> in the config to get a clearer message with the component path.</p>' +
          '<p>Typical sources: time and timezone, because <code>new Date().toLocaleString()</code> renders differently on the server and on the user machine; <code>Math.random()</code> or generated ids; reading <code>window</code>, <code>localStorage</code> or viewport width during setup, so the server sees a different variant; data differences between the SSR request and the first client fetch when there is no shared payload, because a bare fetch was used instead of <code>useAsyncData</code> with a key; invalid HTML such as a <code>div</code> inside a <code>p</code>, which the browser rearranges; and finally browser extensions injecting nodes - that explains "only some users".</p>' +
          '<p>The fix depends on the source: format dates in a fixed timezone or after <code>onMounted</code>, <code>useId()</code> instead of random ids, <code>ClientOnly</code> for browser-dependent fragments, <code>useAsyncData</code> with an explicit key, corrected HTML. Finally an E2E test configured to fail on hydration warnings.</p>',
      },
      keyPoints: [
        { pl: 'Porównaj surowy HTML z serwera z DOM po hydracji', en: 'Diff the raw server HTML against the hydrated DOM' },
        { pl: 'Czas, losowość i API przeglądarki w setupie to najczęstsze źródła', en: 'Time, randomness and browser APIs during setup are the usual sources' },
        { pl: 'Współdzielony payload przez useAsyncData z jawnym kluczem', en: 'Share the payload via useAsyncData with an explicit key' },
        { pl: 'Niepoprawny HTML i rozszerzenia przeglądarki też dają mismatch', en: 'Invalid HTML and browser extensions also cause mismatches' },
        { pl: 'ClientOnly jako świadomy wybór, nie zamiatanie pod dywan', en: 'ClientOnly as a deliberate choice, not as sweeping it under the rug' },
      ],
    },
    // 21
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Trasa /user/:id. Przejście z /user/1 na /user/2 nie odświeża danych, bo pobierasz je w onMounted. Które rozwiązanie jest najbardziej idiomatyczne?',
        en: 'Route /user/:id. Navigating from /user/1 to /user/2 does not refresh data because you fetch in onMounted. Which solution is the most idiomatic?',
      },
      options: [
        { pl: 'Dodać window.location.reload() w guardzie', en: 'Add window.location.reload() in a guard' },
        { pl: 'Przenieść fetch do onUpdated', en: 'Move the fetch into onUpdated' },
        { pl: 'Wyłączyć keep-alive dla tej trasy', en: 'Disable keep-alive for that route' },
        { pl: 'Użyć watch(() => route.params.id, fetchUser, { immediate: true }), a świadomie :key="route.fullPath" na RouterView tylko wtedy, gdy chcesz pełnego remountu', en: 'Use watch(() => route.params.id, fetchUser, { immediate: true }), and :key="route.fullPath" on RouterView only when you deliberately want a full remount' },
      ],
      correct: 3,
      explain: {
        pl: 'Router reużywa instancję komponentu, gdy zmieniają się tylko parametry - to celowa optymalizacja. Watch na parametrze zachowuje stan i unika migotania. Klucz na RouterView remontuje wszystko, więc działa, ale kosztuje pełny cykl życia i utratę stanu lokalnego.',
        en: 'The router reuses the component instance when only params change - that is a deliberate optimization. Watching the param keeps state and avoids flicker. Keying RouterView remounts everything, so it works but costs a full lifecycle and loses local state.',
      },
    },
    // 22
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Komponent z async setup() wstawiony bez <Suspense>. Co się stanie?',
        en: 'A component with async setup() rendered without <Suspense>. What happens?',
      },
      options: [
        { pl: 'Renderuje się natychmiast z pustymi danymi, a potem sam się aktualizuje', en: 'It renders immediately with empty data and then updates itself' },
        { pl: 'Vue zgłosi błąd i komponent się nie zamontuje - async setup wymaga granicy Suspense wśród przodków', en: 'Vue errors out and the component never mounts - async setup requires a Suspense boundary among its ancestors' },
        { pl: 'Zadziała, ale bez SSR', en: 'It works, just not under SSR' },
        { pl: 'Zablokuje wątek główny do czasu rozwiązania promisy', en: 'It blocks the main thread until the promise resolves' },
      ],
      correct: 1,
      explain: {
        pl: 'Async setup działa wyłącznie pod Suspense, bo to Suspense zarządza stanem oczekiwania. Warto pamiętać, że Suspense wciąż jest oznaczone jako eksperymentalne, a jego fallback obejmuje całe poddrzewo - w dużych widokach często lepiej sprawdza się jawny stan ładowania per sekcja.',
        en: 'Async setup only works under Suspense, because Suspense owns the pending state. Note that Suspense is still marked experimental and its fallback covers the whole subtree - in large views an explicit per-section loading state is often better.',
      },
    },
    // 23
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Jak testujesz composable, który używa lifecycle hooków, watcherów i timerów - bez montowania całego widoku? Pokaż podejście i pułapki.',
        en: 'How do you test a composable that uses lifecycle hooks, watchers and timers - without mounting a whole view? Show the approach and the traps.',
      },
      answer: {
        pl: '<p>Rozdzielam dwa przypadki. Composable bez lifecycle to zwykła funkcja: wywołuję ją bezpośrednio w teście, mutuję wejściowe refy i po <code>await nextTick()</code> sprawdzam wyniki. Watchery działają tu normalnie, bo nie wymagają instancji komponentu.</p>' +
          '<p>Composable z <code>onMounted</code>, <code>onUnmounted</code> albo <code>inject</code> potrzebuje kontekstu. Używam minimalnego komponentu-hosta: <code>mount(defineComponent({ setup() { result = useThing(); return () => h("div") } }))</code>, opcjonalnie z <code>global.provide</code>. Alternatywą dla samych efektów jest <code>effectScope()</code> i <code>scope.stop()</code>, co odpali <code>onScopeDispose</code> i pozwoli sprawdzić sprzątanie.</p>' +
          '<p>Pułapki: brak <code>await nextTick()</code> albo <code>flushPromises()</code>, przez co asercja biegnie przed aktualizacją i test jest losowy; prawdziwe timery zamiast <code>vi.useFakeTimers()</code> i jawnego sterowania czasem; globalne singletony przeciekające między testami, na co pomaga reset Pinia i <code>vi.resetModules()</code>; testowanie implementacji zamiast kontraktu; wreszcie brak testu ścieżki błędu i ścieżki odmontowania, a to właśnie tam mieszkają wycieki.</p>' +
          '<p>Zawsze dopisuję jeden test sprawdzający, że po odmontowaniu subskrypcja została zamknięta.</p>',
        en: '<p>I split two cases. A composable without lifecycle hooks is just a function: I call it directly in the test, mutate the input refs and assert after <code>await nextTick()</code>. Watchers work fine there because they do not need a component instance.</p>' +
          '<p>A composable using <code>onMounted</code>, <code>onUnmounted</code> or <code>inject</code> needs context. I use a minimal host component: <code>mount(defineComponent({ setup() { result = useThing(); return () => h("div") } }))</code>, optionally with <code>global.provide</code>. For effects alone, an <code>effectScope()</code> plus <code>scope.stop()</code> is an alternative that fires <code>onScopeDispose</code> and lets me assert cleanup.</p>' +
          '<p>Traps: missing <code>await nextTick()</code> or <code>flushPromises()</code>, so the assertion runs before the update and the test becomes flaky; real timers instead of <code>vi.useFakeTimers()</code> and explicit time control; global singletons leaking between tests, which resetting Pinia and <code>vi.resetModules()</code> fixes; testing implementation instead of the contract; and finally never testing the error path or the unmount path, which is exactly where leaks live.</p>' +
          '<p>I always add one test asserting that the subscription is closed after unmount.</p>',
      },
      keyPoints: [
        { pl: 'Bez lifecycle: wywołaj funkcję wprost i asertuj po nextTick', en: 'Without lifecycle: call the function directly and assert after nextTick' },
        { pl: 'Z lifecycle: minimalny komponent-host albo effectScope', en: 'With lifecycle: a minimal host component or an effectScope' },
        { pl: 'Fałszywe timery zamiast realnego czekania', en: 'Fake timers instead of real waiting' },
        { pl: 'Reset globalnych singletonów między testami', en: 'Reset global singletons between tests' },
        { pl: 'Osobny test na sprzątanie po odmontowaniu', en: 'A dedicated test for cleanup after unmount' },
      ],
    },
    // 24
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Modal w <Teleport to="#modals"> z <Transition> znika bez animacji i czasem rzuca błędem przy nawigacji. Najbardziej prawdopodobna przyczyna?',
        en: 'A modal in <Teleport to="#modals"> with a <Transition> disappears with no animation and sometimes throws on navigation. Most likely cause?',
      },
      options: [
        { pl: 'Teleport nie współpracuje z Transition - to niewspierana kombinacja', en: 'Teleport does not work with Transition - the combination is unsupported' },
        { pl: 'Trzeba dodać appear na Transition, inaczej animacja wyjścia nie działa', en: 'You must add appear to Transition, otherwise the leave animation does not run' },
        { pl: 'Modal musi być opakowany w KeepAlive', en: 'The modal must be wrapped in KeepAlive' },
        { pl: 'Kontener docelowy jest usuwany albo jeszcze nie istnieje w momencie montowania; Transition musi być wewnątrz Teleport, a cel musi żyć dłużej niż zawartość', en: 'The target container is removed or does not exist yet at mount time; the Transition must live inside the Teleport and the target must outlive the content' },
      ],
      correct: 3,
      explain: {
        pl: 'Teleport przenosi DOM, ale cykl życia zostaje w miejscu deklaracji. Jeśli cel należy do znikającego widoku, animacja wyjścia nie ma gdzie się odbyć. Cel trzymaj poza aplikacją routowaną (na przykład w index.html) albo użyj disabled bądź defer, gdy montuje się później.',
        en: 'Teleport moves the DOM but the lifecycle stays where the component is declared. If the target belongs to a disappearing view, the leave animation has nowhere to run. Keep the target outside the routed app (e.g. in index.html) or use disabled or defer when it mounts later.',
      },
    },
    // 25
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'provide("theme", theme.value) w rodzicu, inject("theme") w dziecku. Zmiana motywu nie dociera. Która poprawka jest właściwa i dlaczego?',
        en: 'provide("theme", theme.value) in the parent and inject("theme") in the child. Theme changes never arrive. Which fix is right and why?',
      },
      options: [
        { pl: 'provide("theme", theme) - przekazujesz ref, a nie jego odczytaną wartość; do zapisu z dziecka dołóż jawną funkcję aktualizującą', en: 'provide("theme", theme) - pass the ref itself, not its read value; add an explicit updater function for writes from the child' },
        { pl: 'inject("theme", null, true) wymusza reaktywność', en: 'inject("theme", null, true) forces reactivity' },
        { pl: 'Trzeba wywołać provide w onMounted, żeby wartość była już gotowa', en: 'You must call provide in onMounted so the value is ready' },
        { pl: 'provide działa tylko z reactive(), nigdy z ref()', en: 'provide only works with reactive(), never with ref()' },
      ],
      correct: 0,
      explain: {
        pl: 'provide zapisuje przekazaną wartość raz, więc prymityw zostaje odcięty od źródła. Przekazuj ref albo computed. Dobra praktyka: udostępniaj readonly(state) plus akcje, żeby dziecko nie mutowało stanu rodzica po cichu, oraz używaj typowanego InjectionKey w TypeScript.',
        en: 'provide stores the value once, so a primitive is cut off from its source. Pass the ref or a computed. Good practice: expose readonly(state) plus actions so the child cannot silently mutate parent state, and use a typed InjectionKey in TypeScript.',
      },
    },
    // 26
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Wymień scenariusze, w których reaktywność Vue cicho przestaje działać - kod nie rzuca błędu, ale UI się nie odświeża. Dla każdego podaj mechanizm i naprawę.',
        en: 'List the scenarios where Vue reactivity silently stops working - no error is thrown but the UI does not update. Give the mechanism and the fix for each.',
      },
      answer: {
        pl: '<p><strong>Destrukturyzacja</strong> obiektu reactive lub store: odczyt przez get trap wyciąga wartość poza proxy. Naprawa: <code>toRefs</code>, <code>storeToRefs</code> albo <code>ref</code> dla prymitywów.</p>' +
          '<p><strong>Podmiana całego obiektu</strong> przypisanego do zmiennej z reactive (<code>state = { ... }</code>): tracisz referencję do proxy. Naprawa: mutuj pola, użyj <code>Object.assign</code> albo trzymaj obiekt w <code>ref</code>.</p>' +
          '<p><strong>Utrata .value</strong>: przekazanie <code>ref.value</code> do funkcji, która ma reagować na zmiany. Naprawa: przekazuj ref albo getter.</p>' +
          '<p><strong>Struktury nieśledzalne</strong>: pola klas z prywatnymi polami, obiekty z <code>markRaw</code>, instancje bibliotek (mapy, wykresy) - proxy ich nie obejmie albo celowo je pomija.</p>' +
          '<p><strong>Odczyt poza efektem</strong>: kod w <code>setTimeout</code> albo po <code>await</code> nie ma już activeEffect, więc nic nie zostaje zapisane w targetMap.</p>' +
          '<p><strong>Shallow API</strong>: <code>shallowRef</code> lub <code>shallowReactive</code> mutowane w głąb. Naprawa: podmieniaj referencję albo wołaj <code>triggerRef</code>.</p>' +
          '<p><strong>Zależności niereaktywne</strong> w computed: czas, losowość, localStorage - cache nie ma powodu się unieważnić.</p>' +
          '<p>Wspólny mianownik: reaktywność wymaga dostępu do właściwości proxy w trakcie działania efektu. Wszystko, co zrywa którykolwiek z tych trzech warunków, zrywa reaktywność.</p>',
        en: '<p><strong>Destructuring</strong> a reactive object or a store: the get trap read lifts the value out of the proxy. Fix: <code>toRefs</code>, <code>storeToRefs</code>, or a <code>ref</code> for primitives.</p>' +
          '<p><strong>Replacing the whole object</strong> held in a reactive variable (<code>state = { ... }</code>): you lose the proxy reference. Fix: mutate fields, use <code>Object.assign</code>, or hold the object in a <code>ref</code>.</p>' +
          '<p><strong>Losing .value</strong>: passing <code>ref.value</code> into a function that is supposed to react to changes. Fix: pass the ref or a getter.</p>' +
          '<p><strong>Untrackable structures</strong>: classes with private fields, objects under <code>markRaw</code>, library instances (maps, charts) - the proxy cannot or deliberately does not cover them.</p>' +
          '<p><strong>Reads outside an effect</strong>: code in <code>setTimeout</code> or after an <code>await</code> no longer has an activeEffect, so nothing is recorded in targetMap.</p>' +
          '<p><strong>Shallow APIs</strong>: <code>shallowRef</code> or <code>shallowReactive</code> mutated deeply. Fix: replace the reference or call <code>triggerRef</code>.</p>' +
          '<p><strong>Non-reactive dependencies</strong> in a computed: time, randomness, localStorage - the cache has no reason to invalidate.</p>' +
          '<p>The common thread: reactivity needs a proxy property access while an effect is running. Anything that breaks one of those three conditions breaks reactivity.</p>',
      },
      keyPoints: [
        { pl: 'Destrukturyzacja i podmiana całego obiektu zrywają połączenie z proxy', en: 'Destructuring and whole-object replacement break the proxy link' },
        { pl: 'Odczyt poza efektem (po await, w setTimeout) nie jest śledzony', en: 'Reads outside an effect (after await, in setTimeout) are not tracked' },
        { pl: 'markRaw, klasy z prywatnymi polami i instancje bibliotek nie są proxowane', en: 'markRaw, classes with private fields and library instances are not proxied' },
        { pl: 'Shallow API wymaga podmiany referencji albo triggerRef', en: 'Shallow APIs need reference replacement or triggerRef' },
        { pl: 'Zasada: proxy, dostęp do właściwości i aktywny efekt', en: 'The rule: proxy plus property access plus an active effect' },
      ],
    },
    // 27
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Zamieniasz ręcznie napisany v-model (props.modelValue plus emit) na defineModel(). Co realnie zyskujesz?',
        en: 'You replace a hand-written v-model (props.modelValue plus emit) with defineModel(). What do you actually gain?',
      },
      options: [
        { pl: 'Dwukierunkowe wiązanie bez emitowania zdarzeń - defineModel mutuje propsy rodzica', en: 'Two-way binding without events - defineModel mutates the parent props' },
        { pl: 'Automatyczną walidację wartości', en: 'Automatic value validation' },
        { pl: 'Zapisywalny ref, który pod spodem nadal deklaruje props i emit, obsługuje modyfikatory i wiele nazwanych modeli - mniej boilerplate przy tej samej semantyce', en: 'A writable ref that still declares the prop and emit underneath, supports modifiers and multiple named models - less boilerplate with the same semantics' },
        { pl: 'Działa tylko w Options API', en: 'It only works in the Options API' },
      ],
      correct: 2,
      explain: {
        pl: 'defineModel to makro kompilatora: generuje props modelValue i emit update:modelValue, a zwraca ref, który przy zapisie emituje. Przepływ danych pozostaje jednokierunkowy w dół - komponent nadal nie mutuje stanu rodzica bezpośrednio.',
        en: 'defineModel is a compiler macro: it generates the modelValue prop and the update:modelValue emit, returning a ref that emits on write. Data flow stays one-way down - the component still does not mutate parent state directly.',
      },
    },
    // 28
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Test klika przycisk, który woła API i renderuje wynik. Asercja czasem przechodzi, czasem nie. Które wyjaśnienie jest poprawne?',
        en: 'A test clicks a button that calls an API and renders the result. The assertion passes sometimes. Which explanation is correct?',
      },
      options: [
        { pl: 'await nextTick() czeka też na promisy sieciowe, więc problem musi leżeć w mocku', en: 'await nextTick() also waits for network promises, so the problem must be the mock' },
        { pl: 'nextTick opróżnia tylko kolejkę renderowania Vue; na rozwiązanie promis potrzeba flushPromises() albo oczekiwania na sam mock', en: 'nextTick only flushes the Vue render queue; resolving promises needs flushPromises() or awaiting the mock itself' },
        { pl: 'trigger("click") jest synchroniczne, więc żadne czekanie nie jest potrzebne', en: 'trigger("click") is synchronous, so no waiting is needed at all' },
        { pl: 'Testy Vue wymagają jawnego wywołania app.mount()', en: 'Vue tests require an explicit app.mount() call' },
      ],
      correct: 1,
      explain: {
        pl: 'trigger zwraca nextTick, ale to tylko jedna tura. Po fetchu potrzebne jest wypchnięcie mikrozadań (flushPromises), a przy timerach - fałszywe timery. Czekanie na warunek (findByText z Testing Library) jest odporniejsze niż stała liczba ticków.',
        en: 'trigger returns nextTick, but that is only one turn. After a fetch you need to flush microtasks (flushPromises), and with timers, fake timers. Waiting for a condition (findByText from Testing Library) is more robust than a fixed number of ticks.',
      },
    },
    // 29
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Kiedy w produkcyjnym projekcie mówisz "tu piszemy render function albo JSX zamiast szablonu"? Jaki jest koszt tej decyzji?',
        en: 'When do you say "this one gets a render function or JSX instead of a template" in a production project? What does that decision cost?',
      },
      answer: {
        pl: '<p>Szablon jest domyślnym wyborem, bo daje kompilatorowi informacje statyczne: hoisting statycznych węzłów, patch flags, bloki drzewa. Render function traci te optymalizacje, więc sięgam po nią tylko wtedy, gdy szablon nie potrafi wyrazić problemu w rozsądny sposób.</p>' +
          '<p>Dobre przypadki: komponent dobierający tag albo strukturę dynamicznie na podstawie danych (nagłówek o poziomie z propsa, generyczny renderer tabeli sterowany konfiguracją kolumn); komponenty wyższego rzędu i wrappery przekazujące nieznane z góry sloty i atrybuty; biblioteki komponentów, gdzie liczba wariantów rozsadziłaby szablon na dziesiątki <code>v-if</code>; rekurencyjne struktury drzewiaste.</p>' +
          '<p>Koszt: gorsza dostępność dla reszty zespołu i narzędzi (szablon czyta każdy, wywołania <code>h()</code> już nie), utrata części optymalizacji kompilatora, większe ryzyko błędów przy kluczach i slotach oraz słabsze wsparcie w devtoolsach. Dlatego trzymam takie komponenty jako małe, dobrze nazwane wyspy z testami kontraktu, a nie jako styl całego projektu.</p>' +
          '<p>W praktyce w dużej aplikacji to jeden na kilkadziesiąt komponentów - i zawsze z komentarzem, dlaczego szablon nie wystarczył.</p>',
        en: '<p>A template is the default because it gives the compiler static information: static node hoisting, patch flags, block trees. A render function loses those optimizations, so I only reach for one when a template cannot express the problem sensibly.</p>' +
          '<p>Good cases: a component that picks its tag or structure dynamically from data (a heading whose level comes from a prop, a generic table renderer driven by a column config); higher-order components and wrappers forwarding slots and attributes not known upfront; component libraries where the variant count would explode a template into dozens of <code>v-if</code> branches; recursive tree structures.</p>' +
          '<p>The cost: worse accessibility for the rest of the team and the tooling (everyone reads templates, fewer read <code>h()</code> calls), loss of some compiler optimizations, more room for key and slot mistakes, and weaker devtools support. So I keep such components as small, well-named islands with contract tests, not as a project-wide style.</p>' +
          '<p>In a large app that is roughly one component in several dozen - and always with a comment explaining why a template was not enough.</p>',
      },
      keyPoints: [
        { pl: 'Szablon jest domyślny: hoisting, patch flags, bloki', en: 'Templates are the default: hoisting, patch flags, block trees' },
        { pl: 'Render function dla dynamicznej struktury, HOC i rekurencji', en: 'Render functions for dynamic structure, HOCs and recursion' },
        { pl: 'Koszt: czytelność dla zespołu i utrata części optymalizacji', en: 'Cost: team readability and loss of some compiler optimizations' },
        { pl: 'Trzymaj to jako małe wyspy z testami kontraktu', en: 'Keep it as small islands with contract tests' },
        { pl: 'Zawsze udokumentuj, dlaczego szablon nie wystarczył', en: 'Always document why a template was not enough' },
      ],
    },
    // 30
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Widok listy w <KeepAlive>. Po powrocie z detalu dane są nieaktualne, bo odświeżasz je w onMounted. Poprawne podejście?',
        en: 'A list view inside <KeepAlive>. Returning from the detail view shows stale data because you refresh in onMounted. Correct approach?',
      },
      options: [
        { pl: 'onMounted i tak odpali się ponownie, więc problem leży gdzie indziej', en: 'onMounted fires again anyway, so the problem is elsewhere' },
        { pl: 'Dodać :key ze znacznikiem czasu, żeby KeepAlive nie cachował', en: 'Add a :key with a timestamp so KeepAlive never caches' },
        { pl: 'Użyć onUpdated, które odpala się przy każdej aktywacji', en: 'Use onUpdated, which fires on every activation' },
        { pl: 'Przenieść odświeżanie do onActivated, a sprzątanie do onDeactivated, bo instancja z cache montuje się tylko raz', en: 'Move the refresh into onActivated and teardown into onDeactivated, because a cached instance mounts only once' },
      ],
      correct: 3,
      explain: {
        pl: 'KeepAlive zamienia unmount i mount na deactivate i activate - o to właśnie chodzi w cache, ale hooki muszą za tym nadążyć. Pamiętaj też o limicie max oraz o tym, że timery i subskrypcje w widoku z cache dalej żyją, jeśli nie zatrzymasz ich w onDeactivated.',
        en: 'KeepAlive swaps unmount and mount for deactivate and activate - that is the point of caching, but the hooks must follow. Also remember the max limit, and that timers or subscriptions in a cached view keep running unless you stop them in onDeactivated.',
      },
    },
    // 31
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Wrzucasz instancję mapy Leaflet do reactive({ map }). Aplikacja dramatycznie zwalnia i pojawiają się dziwne błędy biblioteki. Dlaczego markRaw to właściwa odpowiedź?',
        en: 'You put a Leaflet map instance into reactive({ map }). The app slows dramatically and the library throws odd errors. Why is markRaw the right answer?',
      },
      options: [
        { pl: 'markRaw zamraża obiekt, więc biblioteka nie może go zmieniać', en: 'markRaw freezes the object so the library cannot change it' },
        { pl: 'markRaw oznacza obiekt jako pomijany przez system reaktywności, więc nie powstaje głębokie proxy nad setkami wewnętrznych węzłów, a biblioteka dostaje swoje prawdziwe referencje zamiast proxy', en: 'markRaw flags the object as skipped by reactivity, so no deep proxy is built over hundreds of internal nodes and the library gets its real references instead of proxies' },
        { pl: 'markRaw przenosi obiekt poza pamięć komponentu', en: 'markRaw moves the object out of component memory' },
        { pl: 'markRaw jest tylko podpowiedzią dla devtoolsów', en: 'markRaw is only a devtools hint' },
      ],
      correct: 1,
      explain: {
        pl: 'Proxy nad instancją biblioteki to nie tylko koszt - to także błędy tożsamości, bo porównania typu this === node zawodzą, gdy biblioteka raz dostaje proxy, a raz surowy obiekt. markRaw albo shallowRef to standardowe rozwiązanie dla map, wykresów i edytorów.',
        en: 'Proxying a library instance is not only a cost - it also breaks identity, because this === node comparisons fail when the library sometimes gets a proxy and sometimes the raw object. markRaw or shallowRef is the standard answer for maps, charts and editors.',
      },
    },
    // 32
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Dostajesz aplikację Vue 3 napisaną w Options API: 400 komponentów, miksiny, zero testów. Zespół chce Composition API. Jak to prowadzisz, żeby nie zatrzymać dostaw?',
        en: 'You inherit a Vue 3 app written in the Options API: 400 components, mixins, no tests. The team wants Composition API. How do you run this without stopping delivery?',
      },
      answer: {
        pl: '<p>Zaczynam od tego, że Options API nie jest zepsute i nie ma tu żadnego terminu - to znaczy, że migracja może być oportunistyczna. Zdejmuję ze stołu wielki refaktor i ustalam regułę: nowy kod w <code>script setup</code>, stary przepisujemy tylko wtedy, gdy i tak go dotykamy.</p>' +
          '<p>Priorytet to miksiny, bo to one realnie bolą: niejawne źródło właściwości, kolizje nazw, brak typów. Każdy miksin dostaje odpowiednik jako composable z jawnym wejściem i wyjściem. Migruję po jednym, zaczynając od najczęściej używanego, i przez chwilę utrzymuję oba, żeby nie robić jednego wielkiego pull requesta.</p>' +
          '<p>Przed przepisaniem komponentu piszę test kontraktowy na jego obecne zachowanie - to jedyna siatka bezpieczeństwa w projekcie bez testów. Dopiero potem zmieniam środek. Dzięki temu refaktor jest weryfikowalny, a nie deklaratywny.</p>' +
          '<p>Do tego: mierzalny cel widoczny dla zespołu (liczba plików z miksinami, procent plików na <code>script setup</code>), reguła lintera zakazująca nowych miksinów, wspólna konwencja nazewnictwa composables i krótki dokument decyzji, żeby nie toczyć tej dyskusji na każdym review. Bez tego migracja zatrzyma się w połowie i zostawi dwa style na zawsze.</p>',
        en: '<p>I start from the fact that the Options API is not broken and there is no deadline - which means migration can be opportunistic. I take the big-bang refactor off the table and set a rule: new code in <code>script setup</code>, old code rewritten only when we touch it anyway.</p>' +
          '<p>Mixins get priority because they are what actually hurts: an implicit source of properties, name collisions, no types. Each mixin gets a composable equivalent with explicit inputs and outputs. I migrate one at a time, starting with the most used, keeping both around briefly so there is no single mega pull request.</p>' +
          '<p>Before rewriting a component I write a contract test for its current behaviour - in a project with no tests that is the only safety net. Only then do I change the inside. That makes the refactor verifiable rather than declarative.</p>' +
          '<p>On top: a measurable target visible to the team (files still using mixins, percentage of files on <code>script setup</code>), a lint rule banning new mixins, one naming convention for composables, and a short decision record so the discussion is not relitigated in every review. Without that the migration stalls halfway and leaves two styles forever.</p>',
      },
      keyPoints: [
        { pl: 'Migracja oportunistyczna: nowy kod nowym stylem, stary przy okazji', en: 'Opportunistic migration: new code in the new style, old code when touched' },
        { pl: 'Miksiny najpierw - zamiana na composables z jawnym API', en: 'Mixins first - replaced by composables with an explicit API' },
        { pl: 'Test kontraktowy przed przepisaniem komponentu', en: 'A contract test before rewriting a component' },
        { pl: 'Lint i metryka postępu, żeby migracja się nie zatrzymała', en: 'Lint rules and a progress metric so the migration does not stall' },
        { pl: 'Zapisana decyzja zamiast dyskusji na każdym review', en: 'A written decision instead of a debate in every review' },
      ],
    },
    // 33
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Chcesz, żeby przejście na nową trasę nastąpiło dopiero po pobraniu danych, a jednocześnie żeby dało się anulować powolne przejście. Które podejście jest najzdrowsze produkcyjnie?',
        en: 'You want navigation to happen only after data loads, while still being able to cancel a slow transition. Which approach is healthiest in production?',
      },
      options: [
        { pl: 'Pobierać wszystko globalnie w beforeEach, blokując router do skutku', en: 'Fetch everything in a global beforeEach, blocking the router until done' },
        { pl: 'Użyć afterEach, bo tam można anulować nawigację', en: 'Use afterEach, because navigation can be cancelled there' },
        { pl: 'Pobierać dane w komponencie ze stanem ładowania, a guardów używać tylko do autoryzacji i przekierowań - blokujące pobieranie w guardzie zamraża UI i nie daje użytkownikowi żadnego feedbacku', en: 'Fetch in the component with a loading state and use guards only for authorization and redirects - blocking fetches in a guard freeze the UI and give the user no feedback' },
        { pl: 'Zawsze używać beforeRouteEnter z next(vm => ...), to jedyny poprawny wzorzec', en: 'Always use beforeRouteEnter with next(vm => ...) - the only correct pattern' },
      ],
      correct: 2,
      explain: {
        pl: 'Pobieranie w guardzie daje martwy klik: stara strona stoi, nic się nie dzieje. Wzorzec produkcyjny to natychmiastowa nawigacja, szkielet zamiast treści i anulowanie starego żądania przez AbortController przy kolejnej nawigacji. Guard blokujący zostaw dla autoryzacji i danych decydujących o przekierowaniu.',
        en: 'Fetching in a guard produces a dead click: the old page just sits there. The production pattern is navigate immediately, show a skeleton, and abort the previous request with AbortController on the next navigation. Reserve blocking guards for authorization and data that decides the redirect.',
      },
    },
    // 34
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Bundle głównej trasy urósł do 1.4 MB po gzipie mimo lazy loadingu tras. Jak to diagnozujesz i jakie są typowe pułapki code splittingu w Vue?',
        en: 'The main route bundle grew to 1.4 MB gzipped despite lazy-loaded routes. How do you diagnose it, and what are the classic Vue code-splitting traps?',
      },
      answer: {
        pl: '<p>Diagnoza: <code>rollup-plugin-visualizer</code> albo <code>vite build --sourcemap</code> i analiza mapy, żeby zobaczyć, co realnie siedzi w chunku wejściowym. Interesuje mnie nie tylko rozmiar, ale i to, który import wciągnął zależność - graf jest ważniejszy niż lista.</p>' +
          '<p>Typowe pułapki: import biblioteki w pliku współdzielonym, na przykład <code>utils/index.ts</code>, bo reeksport z barrel file wciąga wszystko do wejścia mimo leniwej trasy; globalna rejestracja komponentów w <code>main.ts</code>, przez co cały design system ładuje się od razu; pakiety bez tree shakingu albo <code>lodash</code> zamiast <code>lodash-es</code>; moment.js z pełnym zestawem locale; ikony importowane jako cały pakiet; dynamiczny import ze zmienną ścieżką, który zmusza bundler do wciągnięcia wszystkich pasujących plików; wreszcie statyczny import tego samego modułu obok dynamicznego, co po cichu kasuje osobny chunk.</p>' +
          '<p>Naprawa: <code>defineAsyncComponent</code> dla ciężkich widgetów (edytor, wykres, mapa), likwidacja barrel files na granicach modułów, lokalna rejestracja komponentów, wymiana bibliotek na lżejsze, prefetch prawdopodobnej następnej trasy. Na koniec budżet rozmiaru w CI, który failuje PR przy przekroczeniu - inaczej regres wróci za miesiąc.</p>',
        en: '<p>Diagnosis: <code>rollup-plugin-visualizer</code> or <code>vite build --sourcemap</code> plus map analysis to see what actually sits in the entry chunk. I care not just about size but about which import pulled a dependency in - the graph matters more than the list.</p>' +
          '<p>Classic traps: importing a library in a shared file such as <code>utils/index.ts</code>, because a barrel re-export drags everything into the entry despite the lazy route; global component registration in <code>main.ts</code>, so the whole design system loads upfront; packages with no tree shaking, or <code>lodash</code> instead of <code>lodash-es</code>; moment.js with all locales; icons imported as an entire package; a dynamic import with a variable path, which forces the bundler to include every matching file; and finally a static import of the same module next to the dynamic one, which silently kills the separate chunk.</p>' +
          '<p>Fixes: <code>defineAsyncComponent</code> for heavy widgets (editor, chart, map), removing barrel files at module boundaries, local component registration, swapping libraries for lighter ones, prefetching the likely next route. Finally a size budget in CI that fails the PR on regression - otherwise the problem returns within a month.</p>',
      },
      keyPoints: [
        { pl: 'Analizuj graf importów, nie tylko listę rozmiarów', en: 'Analyze the import graph, not just a size list' },
        { pl: 'Barrel files i globalna rejestracja komponentów niszczą splitting', en: 'Barrel files and global component registration destroy splitting' },
        { pl: 'Statyczny import obok dynamicznego kasuje osobny chunk', en: 'A static import next to a dynamic one cancels the separate chunk' },
        { pl: 'defineAsyncComponent dla ciężkich widgetów, nie tylko dla tras', en: 'defineAsyncComponent for heavy widgets, not only for routes' },
        { pl: 'Budżet rozmiaru w CI, inaczej regres wraca', en: 'A size budget in CI, otherwise the regression returns' },
      ],
    },
    // 35
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'defineAsyncComponent z loadingComponent i delay: 200. Na szybkim łączu użytkownicy zgłaszają migotanie spinnera. Co robi delay i jak to naprawić?',
        en: 'defineAsyncComponent with loadingComponent and delay: 200. On fast connections users report spinner flicker. What does delay do and how do you fix it?',
      },
      options: [
        { pl: 'delay opóźnia start pobierania komponentu, więc należy go zmniejszyć do zera', en: 'delay postpones the start of the fetch, so it should be lowered to zero' },
        { pl: 'delay dotyczy tylko errorComponent', en: 'delay applies to errorComponent only' },
        { pl: 'delay wymusza ponowną próbę pobrania po 200 ms', en: 'delay forces a retry of the fetch after 200 ms' },
        { pl: 'delay to czas, po którym pokazuje się loadingComponent; migotanie znika, gdy zwiększysz delay ponad typowy czas ładowania albo wymusisz minimalny czas wyświetlania spinnera', en: 'delay is how long before the loadingComponent appears; flicker goes away when you raise the delay above the typical load time or enforce a minimum spinner duration' },
      ],
      correct: 3,
      explain: {
        pl: 'Pobieranie startuje od razu; delay chroni przed pokazywaniem spinnera dla ładowań krótszych niż próg. Warto też ustawić timeout i errorComponent, bo komponent asynchroniczny bez obsługi błędu przy zerwanej sieci daje pusty ekran, podobnie jak po deployu ze zmienionymi hashami plików.',
        en: 'The fetch starts immediately; delay prevents showing a spinner for loads shorter than the threshold. Also set timeout plus an errorComponent, because an async component with no error handling gives a blank screen on a flaky network or after a deploy that changed file hashes.',
      },
    },
    // 36
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Jak zaprojektowałbyś composable useResource(fetcher, options) do użytku w całej firmie? Omów API, przypadki brzegowe i to, czego świadomie nie robisz.',
        en: 'How would you design a useResource(fetcher, options) composable meant for company-wide use? Cover the API, the edge cases, and what you deliberately leave out.',
      },
      answer: {
        pl: '<p>API: wejście jako refy lub gettery, a nie odczytane wartości - dzięki temu composable sam reaguje na zmianę parametrów. Wyjście to <code>{ data, error, status, refresh, abort }</code>, gdzie <code>status</code> jest jawną maszyną stanów (idle, pending, success, error), a nie zbiorem niezależnych flag <code>isLoading</code> i <code>isError</code>, które potrafią się rozjechać.</p>' +
          '<p>Przypadki brzegowe, które musi obsłużyć: wyścigi, gdy odpowiedź na stary parametr przychodzi po nowej - zawsze odrzucam wynik nieaktualnego żądania i używam <code>AbortController</code>; odmontowanie w trakcie lotu; ponowne wywołanie przed zakończeniem poprzedniego; rozróżnienie błędów sieciowych, błędów HTTP i błędów parsowania; SSR, czyli brak <code>window</code> i stan per request; sprzątanie przez <code>onScopeDispose</code>, żeby działał także poza komponentem.</p>' +
          '<p>Czego świadomie nie robię: nie wbudowuję cache między komponentami, deduplikacji, retry z backoffem ani inwalidacji. To osobny, trudny problem z dojrzałymi rozwiązaniami - jeśli zespół tego potrzebuje, bierzemy TanStack Query zamiast hodować własne. Nie ukrywam też transportu: fetcher jest wstrzykiwany, więc composable da się testować bez sieci.</p>' +
          '<p>Do tego dokumentacja z jednym przykładem użycia oraz testy na wyścig i na odmontowanie, bo to właśnie te dwa przypadki łamią domowe implementacje.</p>',
        en: '<p>The API: inputs as refs or getters, not read values - that lets the composable react to parameter changes itself. The output is <code>{ data, error, status, refresh, abort }</code>, where <code>status</code> is an explicit state machine (idle, pending, success, error) rather than independent <code>isLoading</code> and <code>isError</code> flags that can drift out of sync.</p>' +
          '<p>Edge cases it must handle: races, where a response for an old parameter arrives after a new one - I always discard results from a stale request and use <code>AbortController</code>; unmount mid-flight; re-invocation before the previous call finishes; distinguishing network errors, HTTP errors and parse errors; SSR, meaning no <code>window</code> and per-request state; cleanup through <code>onScopeDispose</code> so it also works outside components.</p>' +
          '<p>What I deliberately leave out: cross-component caching, deduplication, retry with backoff, invalidation. That is a separate hard problem with mature solutions - if the team needs it, we adopt TanStack Query instead of growing our own. I also do not hide the transport: the fetcher is injected, so the composable is testable without a network.</p>' +
          '<p>Plus documentation with one usage example and tests for the race and the unmount cases, because those are exactly the two that break homegrown implementations.</p>',
      },
      keyPoints: [
        { pl: 'Wejścia jako refy lub gettery, żeby composable sam reagował na zmiany', en: 'Inputs as refs or getters so the composable reacts to changes itself' },
        { pl: 'Jawna maszyna stanów zamiast rozjeżdżających się flag', en: 'An explicit state machine instead of flags that drift apart' },
        { pl: 'Wyścigi i odmontowanie: AbortController plus odrzucanie starych wyników', en: 'Races and unmount: AbortController plus discarding stale results' },
        { pl: 'Sprzątanie przez onScopeDispose, działa także poza komponentem', en: 'Cleanup via onScopeDispose so it works outside components too' },
        { pl: 'Świadome granice: cache i retry to TanStack Query, nie własny kod', en: 'Deliberate boundaries: caching and retries are TanStack Query, not homegrown' },
      ],
    },
  ],
};
