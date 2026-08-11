// Track react - interview question bank (v5 "Bank schema", see SPEC.md).
// Plain ES module, no imports. 36 questions, mixed order, ~60% choice / ~40% open.
// Audience: senior frontend dev coming from Vue 3, interviewing for React roles.
// Register: production scenarios, tradeoffs, debugging stories, "what breaks when".

export default {
  trackId: 'react',
  questions: [

    // 1 - choice / senior - rendering model
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Rodzic trzyma stan formularza. Dziecko <code>&lt;HeavyChart data={data} /&gt;</code> dostaje ten sam obiekt <code>data</code> przy każdym wpisanym znaku, bo <code>data</code> pochodzi ze stałej referencji spoza komponentu. Co dzieje się z <code>HeavyChart</code> przy każdym naciśnięciu klawisza?',
        en: 'A parent holds form state. Its child <code>&lt;HeavyChart data={data} /&gt;</code> receives the exact same <code>data</code> object on every keystroke, because <code>data</code> is a constant defined outside the component. What happens to <code>HeavyChart</code> on each keypress?'
      },
      options: [
        { pl: 'Nic - React porównuje propsy i pomija komponent, bo referencja się nie zmieniła.', en: 'Nothing - React compares props and skips the component because the reference did not change.' },
        { pl: 'Funkcja komponentu wykonuje się ponownie; React porówna wynik z poprzednim drzewem i najpewniej nie ruszy DOM.', en: 'The component function re-runs; React diffs the result against the previous tree and most likely touches no DOM.' },
        { pl: 'Komponent jest odmontowywany i montowany od nowa, więc traci swój stan wewnętrzny.', en: 'The component unmounts and remounts, so it loses its internal state.' },
        { pl: 'React uruchamia go ponownie tylko wtedy, gdy czyta kontekst lub store.', en: 'React re-runs it only if it reads a context or a store.' }
      ],
      correct: 1,
      explain: {
        pl: 'To sedno różnicy wobec Vue. W Vue efekt renderujący budzi się tylko wtedy, gdy zmienia się odczytany przez niego ref. W React re-render rodzica domyślnie ponownie wywołuje funkcję każdego dziecka - niezależnie od propsów. Równe propsy nie zatrzymują renderu, zatrzymuje go dopiero <code>React.memo</code> (lub React Compiler). Sam re-render bywa tani: kosztowna jest praca w środku (obliczenia, tworzenie dużych struktur), nie samo wywołanie.',
        en: 'This is the core difference from Vue. In Vue a render effect wakes up only when a ref it read changes. In React, re-rendering the parent re-invokes every child function by default, regardless of props. Equal props do not stop the render - only <code>React.memo</code> (or the React Compiler) does. The re-render itself is often cheap; what costs is the work inside it (computation, building large structures), not the call.'
      }
    },

    // 2 - open / mid - rendering model vs reactivity
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Przychodzisz z Vue. Wytłumacz rozmówcy różnicę między modelem renderowania React a drobnoziarnistą reaktywnością Vue - i jakie praktyczne konsekwencje ma to dla kodu, który piszesz na co dzień.',
        en: 'You are coming from Vue. Explain to the interviewer the difference between the React rendering model and Vue fine-grained reactivity - and what practical consequences it has for the code you write every day.'
      },
      answer: {
        pl: '<p>Vue śledzi zależności na poziomie pojedynczej wartości. Proxy zapisuje, który efekt odczytał który <code>ref</code>, więc zmiana budzi dokładnie te efekty i tylko one przeliczają swój fragment szablonu. Komponent jako funkcja wykonuje się raz - <code>setup()</code> to konstruktor.</p><p>React nie śledzi niczego. <code>setState</code> oznacza komponent jako brudny, a React wywołuje jego funkcję - i funkcje całego poddrzewa - od nowa, po czym porównuje zwrócone drzewo elementów z poprzednim i aplikuje minimalną zmianę w DOM. Ciało komponentu jest więc kodem renderującym, nie konstruktorem: wykonuje się setki razy.</p><p>Konsekwencje: każda wartość tworzona w ciele jest nową referencją przy każdym renderze, więc tożsamość propsów, zależności efektów i klucze list stają się realnym problemem inżynierskim. Optymalizacja jest opt-in (<code>memo</code>, <code>useMemo</code>, <code>useCallback</code>, React Compiler), a nie darmowa. Za to model jest przewidywalny: nie ma ukrytych subskrypcji, cały przepływ danych widać w kodzie.</p>',
        en: '<p>Vue tracks dependencies per value. A proxy records which effect read which <code>ref</code>, so a change wakes exactly those effects and only they recompute their slice of the template. The component function runs once - <code>setup()</code> is a constructor.</p><p>React tracks nothing. <code>setState</code> marks the component dirty and React calls its function - and the whole subtree below - again, then diffs the returned element tree against the previous one and applies the minimal DOM change. The component body is therefore render code, not a constructor: it runs hundreds of times.</p><p>Consequences: every value created in the body is a fresh reference on every render, so prop identity, effect dependencies and list keys become real engineering concerns. Optimization is opt-in (<code>memo</code>, <code>useMemo</code>, <code>useCallback</code>, React Compiler), not free. In exchange the model is predictable: there are no hidden subscriptions and the whole data flow is visible in the code.</p>'
      },
      keyPoints: [
        { pl: 'Vue: śledzenie zależności per wartość, efekt renderujący budzi się punktowo.', en: 'Vue: per-value dependency tracking, the render effect wakes up surgically.' },
        { pl: 'React: brak śledzenia, re-render całego poddrzewa i diff drzewa elementów.', en: 'React: no tracking, re-render of the whole subtree plus an element-tree diff.' },
        { pl: 'Ciało komponentu React to kod renderu, a nie setup wykonywany raz.', en: 'A React component body is render code, not a setup that runs once.' },
        { pl: 'Tożsamość referencji ma znaczenie: propsy, deps, klucze.', en: 'Reference identity matters: props, deps, keys.' },
        { pl: 'Optymalizacja jest opt-in; przewidywalność kosztem darmowej wydajności.', en: 'Optimization is opt-in; predictability at the cost of free performance.' }
      ]
    },

    // 3 - choice / mid - stale closure
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Licznik ustawiony przez <code>useEffect(() =&gt; { const id = setInterval(() =&gt; setCount(count + 1), 1000); return () =&gt; clearInterval(id); }, [])</code> zatrzymuje się na 1. Dlaczego?',
        en: 'A counter set up with <code>useEffect(() =&gt; { const id = setInterval(() =&gt; setCount(count + 1), 1000); return () =&gt; clearInterval(id); }, [])</code> gets stuck at 1. Why?'
      },
      options: [
        { pl: '<code>setInterval</code> jest czyszczony po pierwszym tiku przez funkcję sprzątającą.', en: '<code>setInterval</code> is cleared after the first tick by the cleanup function.' },
        { pl: '<code>setCount</code> jest niestabilne i po pierwszym wywołaniu wskazuje na stary komponent.', en: '<code>setCount</code> is unstable and after the first call points at the old component.' },
        { pl: 'React batchuje aktualizacje z timerów, więc wszystkie tiki scalają się w jedną.', en: 'React batches timer updates, so all ticks collapse into one.' },
        { pl: 'Callback domyka <code>count</code> z pierwszego renderu i na zawsze liczy 0 + 1.', en: 'The callback closes over <code>count</code> from the first render and forever computes 0 + 1.' }
      ],
      correct: 3,
      explain: {
        pl: 'Klasyczny stale closure (zamknięcie na nieaktualnej wartości). Efekt z pustą tablicą zależności uruchamia się raz i zamyka w sobie zmienne z pierwszego renderu, gdzie <code>count === 0</code>. Poprawki: aktualizacja funkcyjna <code>setCount(c =&gt; c + 1)</code>, która nie potrzebuje wartości z domknięcia, albo <code>useRef</code> na najświeższym callbacku. W Vue ten problem nie istnieje, bo <code>count.value</code> czyta żywy obiekt, a nie kopię ze snapshotu renderu.',
        en: 'A classic stale closure. An effect with an empty dependency array runs once and captures the variables of the first render, where <code>count === 0</code>. Fixes: the functional update <code>setCount(c =&gt; c + 1)</code> (it needs no captured value), or a <code>useRef</code> holding the latest callback. In Vue this problem does not exist because <code>count.value</code> reads a live object, not a snapshot copy of the render.'
      }
    },

    // 4 - choice / senior - batching
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'W React 18+ w handlerze kliknięcia wołasz <code>setA(1)</code>, potem <code>await fetch(...)</code>, a po nim <code>setB(2)</code> i <code>setC(3)</code>. Ile razy komponent się wyrenderuje (poza renderem początkowym)?',
        en: 'In React 18+, inside a click handler you call <code>setA(1)</code>, then <code>await fetch(...)</code>, then <code>setB(2)</code> and <code>setC(3)</code>. How many times does the component render (beyond the initial render)?'
      },
      options: [
        { pl: 'Trzy razy - każde <code>set</code> to osobny render.', en: 'Three times - each <code>set</code> is a separate render.' },
        { pl: 'Raz - React scala wszystkie aktualizacje z jednego handlera.', en: 'Once - React merges all updates from a single handler.' },
        { pl: 'Dwa razy - jeden render przed <code>await</code> i jeden po nim, bo aktualizacje po awaicie też są batchowane.', en: 'Twice - one render before the <code>await</code> and one after it, because post-await updates are also batched.' },
        { pl: 'Dwa razy, ale tylko w trybie deweloperskim; produkcyjnie raz.', en: 'Twice, but only in development mode; once in production.' }
      ],
      correct: 2,
      explain: {
        pl: 'Automatic batching (automatyczne scalanie aktualizacji) z React 18 obejmuje także kod po <code>await</code>, w promisach i timerach - ale granicą pozostaje mikrotask. Aktualizacje przed awaitem tworzą jeden render, aktualizacje po awaicie drugi. W React 17 kod po awaicie renderowałby się dwa razy dodatkowo. Jeśli chcesz wymusić synchroniczne przetworzenie (np. pomiar DOM przed kolejnym krokiem), jest <code>flushSync</code> - używany oszczędnie, bo łamie batching.',
        en: 'React 18 automatic batching also covers code after <code>await</code>, in promises and timers - but the boundary is still the microtask. Updates before the await form one render, updates after it a second one. In React 17 the post-await code would have caused two extra renders. If you need synchronous processing (for example a DOM measurement before the next step), <code>flushSync</code> exists - use it sparingly, it defeats batching.'
      }
    },

    // 5 - open / senior - debugging story
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Historia z produkcji: inputy w tabeli tracą focus po każdym wpisanym znaku, a stan wierszy się resetuje. Profiler pokazuje montowanie i odmontowywanie całego poddrzewa. Jak diagnozujesz i co jest najczęstszą przyczyną?',
        en: 'Production story: inputs in a table lose focus after every typed character and row state resets. The Profiler shows the whole subtree mounting and unmounting. How do you diagnose it and what is the most common root cause?'
      },
      answer: {
        pl: '<p>Utrata focusu plus reset stanu to podpis remountu, a nie re-renderu. React zachowuje instancję komponentu tylko wtedy, gdy w tej samej pozycji drzewa trafia na ten sam <em>typ</em> i ten sam <em>klucz</em>. Zmiana któregokolwiek z nich niszczy DOM i stan.</p><p>Diagnoza: w React DevTools Profiler patrzę na przyczynę commita i na to, czy węzeł ma znacznik <em>mount</em>. Potem szukam dwóch wzorców. Pierwszy: komponent zdefiniowany <strong>wewnątrz</strong> ciała innego komponentu - przy każdym renderze powstaje nowa funkcja, więc nowy typ, więc remount. Drugi: klucze listy generowane per render, np. <code>key={Math.random()}</code> lub klucz zawierający zmienną wartość.</p><p>Rzadsze przyczyny: warunkowe opakowanie w inny element (<code>cond ? &lt;div&gt;&lt;Row/&gt;&lt;/div&gt; : &lt;Row/&gt;</code>) oraz <code>key</code> na wrapperze zmieniany celowo, żeby wyczyścić stan. Poprawka: wynoszę definicję komponentu na moduł, stabilizuję klucze na ID z danych i utrzymuję stały kształt drzewa.</p>',
        en: '<p>Focus loss plus state reset is the signature of a remount, not a re-render. React preserves a component instance only when the same tree position holds the same <em>type</em> and the same <em>key</em>. Changing either destroys the DOM and the state.</p><p>Diagnosis: in the React DevTools Profiler I look at what caused the commit and whether the node is flagged as <em>mount</em>. Then I hunt for two patterns. First: a component defined <strong>inside</strong> another component body - each render creates a new function, hence a new type, hence a remount. Second: list keys generated per render, such as <code>key={Math.random()}</code> or a key containing a changing value.</p><p>Rarer causes: conditionally wrapping in a different element (<code>cond ? &lt;div&gt;&lt;Row/&gt;&lt;/div&gt; : &lt;Row/&gt;</code>) and a deliberately changed <code>key</code> on a wrapper used to reset state. The fix: hoist the component definition to module scope, key rows by stable data IDs, and keep the tree shape constant.</p>'
      },
      keyPoints: [
        { pl: 'Utrata focusu i reset stanu = remount, nie re-render.', en: 'Focus loss plus state reset means remount, not re-render.' },
        { pl: 'Tożsamość = pozycja w drzewie + typ + klucz.', en: 'Identity equals tree position plus type plus key.' },
        { pl: 'Najczęstsza przyczyna: komponent zdefiniowany w ciele innego komponentu.', en: 'Most common cause: a component defined inside another component body.' },
        { pl: 'Druga przyczyna: niestabilne klucze listy.', en: 'Second cause: unstable list keys.' },
        { pl: 'Narzędzie: Profiler i znacznik mount, nie zgadywanie.', en: 'Tooling: the Profiler and its mount flag, not guesswork.' }
      ]
    },

    // 6 - choice / senior - keys
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Lista zadań renderowana z <code>key={index}</code>, każdy wiersz ma niekontrolowany <code>&lt;input&gt;</code> z notatką. Użytkownik usuwa pierwszy wiersz. Co widzi?',
        en: 'A todo list rendered with <code>key={index}</code>, each row containing an uncontrolled <code>&lt;input&gt;</code> for a note. The user deletes the first row. What do they see?'
      },
      options: [
        { pl: 'Notatki przesuwają się o jeden wiersz w górę i trafiają do złych zadań.', en: 'Notes shift up by one row and end up attached to the wrong todos.' },
        { pl: 'Wszystkie notatki znikają, bo React odmontowuje całą listę.', en: 'All notes disappear because React unmounts the whole list.' },
        { pl: 'Nic złego - React dopasowuje wiersze po zawartości propsów.', en: 'Nothing bad - React matches rows by prop content.' },
        { pl: 'React zgłasza ostrzeżenie i sam przepina stan po ID z danych.', en: 'React logs a warning and re-attaches state by the data ID on its own.' }
      ],
      correct: 0,
      explain: {
        pl: 'Klucz mówi Reactowi, która instancja odpowiada któremu elementowi danych. Przy <code>key={index}</code> po usunięciu pierwszego elementu indeks 0 nadal istnieje, więc React uznaje, że to ten sam wiersz - zmienia tylko propsy, a zachowuje stan DOM, czyli treść inputa. Efekt: notatki przesuwają się o jeden. To ten sam mechanizm co <code>:key</code> w Vue, tylko w React skutki są częściej widoczne, bo więcej stanu żyje wewnątrz komponentów.',
        en: 'The key tells React which instance corresponds to which data item. With <code>key={index}</code>, after removing the first item index 0 still exists, so React treats it as the same row - it swaps props but keeps the DOM state, meaning the input content. The result: notes shift by one. It is the same mechanism as <code>:key</code> in Vue, but in React the fallout shows up more often because more state lives inside components.'
      }
    },

    // 7 - choice / mid - useMemo semantics
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Które stwierdzenie o <code>useMemo</code> jest prawdziwe w produkcyjnym React?',
        en: 'Which statement about <code>useMemo</code> is true in production React?'
      },
      options: [
        { pl: 'To gwarancja cache - React nigdy nie przeliczy wartości przy niezmienionych zależnościach.', en: 'It is a cache guarantee - React will never recompute the value while dependencies are unchanged.' },
        { pl: 'Działa jak <code>computed</code> w Vue: przelicza się leniwie dopiero przy odczycie.', en: 'It behaves like Vue <code>computed</code>: it recomputes lazily on read.' },
        { pl: 'To podpowiedź wydajnościowa; React może wyrzucić zapamiętaną wartość, a przy odmontowaniu robi to na pewno.', en: 'It is a performance hint; React may drop the memoized value, and on unmount it certainly does.' },
        { pl: 'Zapamiętuje wartość globalnie dla wszystkich instancji komponentu.', en: 'It memoizes the value globally across all instances of the component.' }
      ],
      correct: 2,
      explain: {
        pl: 'Dokumentacja Reacta mówi wprost: <code>useMemo</code> to optymalizacja, nie gwarancja semantyczna. Cache żyje w danej instancji hooka i może zostać odrzucony (np. przy przyszłych trybach off-screen). Nigdy nie umieszczaj tam efektów ubocznych ani logiki, która musi wykonać się dokładnie raz. Vue <code>computed</code> jest inne: to prawdziwy, leniwy, cachowany węzeł w grafie reaktywności, który przelicza się tylko gdy brudna zależność zostanie odczytana.',
        en: 'The React docs are explicit: <code>useMemo</code> is an optimization, not a semantic guarantee. The cache lives in that hook instance and may be discarded (for example by future off-screen modes). Never put side effects or exactly-once logic there. Vue <code>computed</code> is different: it is a real lazy cached node in the reactivity graph that recomputes only when a dirty dependency is read.'
      }
    },

    // 8 - open / mid - useCallback
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Kiedy <code>useCallback</code> faktycznie coś daje, a kiedy jest tylko szumem? Podaj konkretne kryteria, których używasz w code review.',
        en: 'When does <code>useCallback</code> actually pay off and when is it just noise? Give the concrete criteria you use in code review.'
      },
      answer: {
        pl: '<p><code>useCallback</code> nie przyspiesza samej funkcji - stabilizuje jej referencję. Ma sens tylko wtedy, gdy ta referencja jest przez coś <em>porównywana</em>.</p><p>Trzy uzasadnione przypadki: funkcja idzie jako props do dziecka opakowanego w <code>React.memo</code>; funkcja jest zależnością <code>useEffect</code> i bez stabilizacji efekt byłby uruchamiany w kółko (np. otwiera WebSocket); funkcja trafia do wartości kontekstu lub customowego hooka, który oddaje ją dalej. W każdym innym miejscu - handler <code>onClick</code> na <code>&lt;button&gt;</code>, callback konsumowany lokalnie - to czysty koszt: dodatkowa tablica zależności, dodatkowa alokacja, więcej powierzchni na błąd w postaci stale closure.</p><p>W review pytam więc: kto porównuje tę referencję? Jeśli nikt, usuwam hook. Jeśli to <code>memo</code>, sprawdzam czy dziecko naprawdę jest drogie, bo inaczej optymalizujemy render, który kosztuje mikrosekundy. React Compiler przenosi tę decyzję do kompilatora, ale w kodzie bez niego kryterium pozostaje takie samo.</p>',
        en: '<p><code>useCallback</code> does not make the function faster - it stabilizes its reference. It only matters when something actually <em>compares</em> that reference.</p><p>Three justified cases: the function is passed as a prop to a child wrapped in <code>React.memo</code>; the function is a <code>useEffect</code> dependency and without stabilization the effect would re-run endlessly (for example opening a WebSocket); the function goes into a context value or a custom hook that hands it further down. Anywhere else - an <code>onClick</code> handler on a <code>&lt;button&gt;</code>, a locally consumed callback - it is pure cost: an extra dependency array, an extra allocation, more surface for stale-closure bugs.</p><p>So in review I ask: who compares this reference? If nobody does, I delete the hook. If it is <code>memo</code>, I check the child is genuinely expensive, otherwise we are optimizing a render that costs microseconds. The React Compiler moves this decision into the compiler, but without it the criterion stays the same.</p>'
      },
      keyPoints: [
        { pl: 'Stabilizuje referencję, nie przyspiesza funkcji.', en: 'It stabilizes a reference, it does not speed up the function.' },
        { pl: 'Ma sens tylko gdy referencja jest porównywana: memo, deps efektu, wartość kontekstu.', en: 'Only useful when the reference is compared: memo, effect deps, context value.' },
        { pl: 'Bez konsumenta porównania to koszt i ryzyko stale closure.', en: 'With no comparing consumer it is cost plus stale-closure risk.' },
        { pl: 'Sprawdź, czy memoizowane dziecko naprawdę jest drogie.', en: 'Verify the memoized child is genuinely expensive.' },
        { pl: 'React Compiler przejmuje tę decyzję, ale kryterium się nie zmienia.', en: 'The React Compiler takes over the decision, but the criterion is unchanged.' }
      ]
    },

    // 9 - choice / senior - RSC
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Czego <strong>nie</strong> możesz zrobić w React Server Component?',
        en: 'What can you <strong>not</strong> do inside a React Server Component?'
      },
      options: [
        { pl: 'Użyć <code>await</code> bezpośrednio w ciele komponentu.', en: 'Use <code>await</code> directly in the component body.' },
        { pl: 'Czytać zmienne środowiskowe i sekrety.', en: 'Read environment variables and secrets.' },
        { pl: 'Wyrenderować komponent klienta jako dziecko.', en: 'Render a client component as a child.' },
        { pl: 'Użyć <code>useState</code> lub podpiąć <code>onClick</code>.', en: 'Use <code>useState</code> or attach an <code>onClick</code> handler.' }
      ],
      correct: 3,
      explain: {
        pl: 'Server Component wykonuje się tylko na serwerze i nigdy nie trafia do bundla, więc nie ma stanu, efektów ani handlerów zdarzeń - nie ma czego rehydratować. Może być <code>async</code>, czytać sekrety i renderować komponenty klienta jako dzieci (przekazując im serializowalne propsy lub <code>children</code>). Najbliższa analogia z Nuxt to komponent renderowany wyłącznie na serwerze, tyle że RSC serializuje wynik jako strumień opisu UI, nie jako HTML do przejęcia.',
        en: 'A Server Component runs only on the server and never ships in the bundle, so it has no state, no effects and no event handlers - there is nothing to hydrate. It may be <code>async</code>, read secrets and render client components as children (passing serializable props or <code>children</code>). The closest Nuxt analogy is a server-only component, except RSC serializes its output as a stream of UI description rather than HTML to take over.'
      }
    },

    // 10 - choice / senior - "use client"
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Plik z dyrektywą <code>"use client"</code> importuje moduł <code>utils.ts</code>, który z kolei importuje ciężką bibliotekę serwerową. Co się dzieje?',
        en: 'A file with the <code>"use client"</code> directive imports <code>utils.ts</code>, which in turn imports a heavy server-side library. What happens?'
      },
      options: [
        { pl: 'Nic - <code>"use client"</code> dotyczy tylko tego jednego pliku.', en: 'Nothing - <code>"use client"</code> applies to that single file only.' },
        { pl: 'Next.js zamieni ten import na wywołanie RPC do serwera.', en: 'Next.js rewrites that import into an RPC call to the server.' },
        { pl: 'Bundler automatycznie wytnie kod serwerowy przez tree shaking.', en: 'The bundler automatically strips the server code via tree shaking.' },
        { pl: 'Cały graf importów poniżej granicy trafia do bundla klienta, razem z tą biblioteką.', en: 'The entire import graph below the boundary is bundled for the client, including that library.' }
      ],
      correct: 3,
      explain: {
        pl: '<code>"use client"</code> to nie adnotacja pliku, tylko <em>granica</em> grafu modułów: wszystko, co jest importowane z tej strony granicy, staje się kodem klienta. Stąd typowa regresja - jeden nierozważny import podnosi bundle o setki kilobajtów albo wywala build, bo biblioteka sięga po <code>fs</code>. Praktyka: trzymać granicę jak najniżej w drzewie, przekazywać dane jako propsy z komponentów serwerowych i pilnować rozmiaru bundla w CI.',
        en: '<code>"use client"</code> is not a file annotation but a <em>boundary</em> in the module graph: everything imported from that side becomes client code. Hence the classic regression - one careless import adds hundreds of kilobytes to the bundle or breaks the build because the library reaches for <code>fs</code>. Practice: push the boundary as low in the tree as possible, pass data down as props from server components, and gate bundle size in CI.'
      }
    },

    // 11 - open / senior - state architecture
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Zespół wrzucił wszystko - dane z API, filtry, modale, formularze - do jednego globalnego store (w Vue byłoby to jedno wielkie store Pinia). Jak przebudowałbyś architekturę stanu w aplikacji React i czym uzasadnisz podział?',
        en: 'A team dumped everything - API data, filters, modals, forms - into one global store (in Vue it would be one giant Pinia store). How would you rearchitect state in a React app and how do you justify the split?'
      },
      answer: {
        pl: '<p>Zaczynam od taksonomii, nie od biblioteki. Stan serwera to cache zdalnych danych: ma właściciela poza aplikacją, może być nieaktualny, potrzebuje deduplikacji, retry, inwalidacji i statusów ładowania. To zadanie dla TanStack Query, nie dla globalnego store - trzymanie go ręcznie w Pinii czy Zustandzie oznacza ręcznie napisany, gorszy cache.</p><p>Stan URL (filtry, paginacja, zakładki) trzymam w query params: dostaję udostępnianie linkiem, przycisk wstecz i deep linking za darmo. Stan formularza zostaje lokalny albo w React Hook Form - globalizowanie go generuje niepotrzebne rendery i utrudnia reset. Stan UI (otwarty modal, sidebar) kolokuję jak najbliżej miejsca użycia; jeśli musi być dzielony, kontekst z wąskim zakresem.</p><p>Dopiero to, co naprawdę jest globalne i klienckie - motyw, użytkownik, koszyk, kolejka undo - trafia do Zustanda z selektorami. Kryterium: kto jest źródłem prawdy i jaki jest czas życia danej. Efektem ubocznym jest mniej re-renderów, bo subskrypcje są wąskie.</p>',
        en: '<p>I start from a taxonomy, not from a library. Server state is a cache of remote data: it is owned outside the app, it can go stale, and it needs dedup, retries, invalidation and loading status. That is TanStack Query work, not global store work - keeping it by hand in Pinia or Zustand means a hand-written, worse cache.</p><p>URL state (filters, pagination, tabs) goes into query params: you get shareable links, the back button and deep linking for free. Form state stays local or in React Hook Form - globalizing it creates needless renders and complicates resets. UI state (open modal, sidebar) is colocated as close to its use as possible; if it must be shared, a narrowly scoped context.</p><p>Only what is genuinely global and client-owned - theme, current user, cart, undo queue - goes to Zustand with selectors. The criterion is: who owns the truth and what is the lifetime of the value. A side effect is fewer re-renders, because subscriptions are narrow.</p>'
      },
      keyPoints: [
        { pl: 'Taksonomia: stan serwera, URL, formularza, UI, globalny kliencki.', en: 'Taxonomy: server, URL, form, UI and global client state.' },
        { pl: 'Stan serwera do TanStack Query - cache, inwalidacja, retry gotowe.', en: 'Server state belongs in TanStack Query - cache, invalidation, retries built in.' },
        { pl: 'Filtry i paginacja do URL: linki, wstecz, deep linking.', en: 'Filters and pagination in the URL: links, back button, deep linking.' },
        { pl: 'Kolokacja stanu UI zamiast globalnego worka.', en: 'Colocate UI state instead of one global bag.' },
        { pl: 'Zustand z selektorami tylko dla prawdziwie globalnych danych.', en: 'Zustand with selectors only for genuinely global data.' }
      ]
    },

    // 12 - choice / mid - zustand vs pinia
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Komponent robi <code>const store = useStore()</code> i używa tylko <code>store.theme</code>. Store Zustanda zmienia niezwiązane pole <code>store.notifications</code>. Co się stanie i jak to naprawić?',
        en: 'A component does <code>const store = useStore()</code> and uses only <code>store.theme</code>. The Zustand store changes an unrelated field <code>store.notifications</code>. What happens and how do you fix it?'
      },
      options: [
        { pl: 'Komponent się przerenderuje; naprawą jest selektor <code>useStore(s =&gt; s.theme)</code>.', en: 'The component re-renders; the fix is a selector <code>useStore(s =&gt; s.theme)</code>.' },
        { pl: 'Nic - Zustand śledzi, które pola były odczytane, tak jak Pinia.', en: 'Nothing - Zustand tracks which fields were read, just like Pinia.' },
        { pl: 'Komponent się przerenderuje i jedyną naprawą jest opakowanie w <code>React.memo</code>.', en: 'The component re-renders and the only fix is wrapping it in <code>React.memo</code>.' },
        { pl: 'Zustand rzuci ostrzeżenie o subskrypcji całego store.', en: 'Zustand logs a warning about subscribing to the whole store.' }
      ],
      correct: 0,
      explain: {
        pl: 'Bez selektora subskrybujesz cały obiekt stanu, więc każda zmiana budzi komponent. Selektor zawęża subskrypcję, a przy zwracaniu obiektu lub tablicy dodaj płytkie porównanie (<code>useShallow</code>), inaczej nowa referencja i tak wywoła render. Pinia działa inaczej: destrukturyzacja jest tam pułapką innego rodzaju (traci reaktywność, stąd <code>storeToRefs</code>), ale samo czytanie pola przez proxy śledzi zależność automatycznie.',
        en: 'Without a selector you subscribe to the whole state object, so any change wakes the component. A selector narrows the subscription; when returning an object or array add a shallow comparison (<code>useShallow</code>), otherwise a fresh reference triggers a render anyway. Pinia behaves differently: destructuring is a trap of another kind there (it loses reactivity, hence <code>storeToRefs</code>), but simply reading a field through the proxy tracks the dependency automatically.'
      }
    },

    // 13 - choice / senior - context
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: '<code>&lt;AppContext.Provider value={{ user, setUser, theme }}&gt;</code> stoi w korzeniu aplikacji, a rodzic trzyma jeszcze stan animacji zmieniany 60 razy na sekundę. Co jest największym problemem?',
        en: '<code>&lt;AppContext.Provider value={{ user, setUser, theme }}&gt;</code> sits at the app root, and the parent also holds animation state changing 60 times per second. What is the biggest problem?'
      },
      options: [
        { pl: 'Kontekst nie obsługuje obiektów, trzeba przekazać wartość prymitywną.', en: 'Context does not support objects, you must pass a primitive value.' },
        { pl: 'Literał obiektu tworzy nową wartość przy każdym renderze, więc wszyscy konsumenci renderują się 60 razy na sekundę.', en: 'The object literal creates a new value on every render, so every consumer re-renders 60 times per second.' },
        { pl: 'Konsumenci dostaną <code>undefined</code>, bo wartość jest odtwarzana.', en: 'Consumers will receive <code>undefined</code> because the value is recreated.' },
        { pl: 'React zrzuci Provider do najbliższego <code>Suspense</code>.', en: 'React will hoist the Provider into the nearest <code>Suspense</code>.' }
      ],
      correct: 1,
      explain: {
        pl: 'Kontekst porównuje wartość przez <code>Object.is</code>, a nie po polach - nowy literał to zawsze zmiana. Co gorsza, <code>React.memo</code> na dziecku tego nie zatrzyma: konsument czytający kontekst renderuje się mimo memo. Standardowe lekarstwa: <code>useMemo</code> na wartości, rozbicie na osobne konteksty (dane vs settery, bo settery są stabilne), a przy dużej częstotliwości - store zewnętrzny z selektorami zamiast kontekstu. Vue <code>provide/inject</code> nie ma tego problemu, bo wstrzykuje reaktywne referencje.',
        en: 'Context compares its value with <code>Object.is</code>, not field by field - a new literal is always a change. Worse, <code>React.memo</code> on a child does not stop it: a consumer reading the context re-renders despite memo. Standard remedies: <code>useMemo</code> the value, split into separate contexts (data vs setters, since setters are stable), and for high-frequency updates use an external store with selectors instead of context. Vue <code>provide/inject</code> avoids this because it injects reactive references.'
      }
    },

    // 14 - open / senior - perf debugging methodology
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Użytkownicy zgłaszają, że pisanie w wyszukiwarce w aplikacji React "klei się". Opisz swoją metodykę debugowania wydajności - od pomiaru do poprawki - i powiedz, czego <em>nie</em> robisz na starcie.',
        en: 'Users report that typing in the search box of a React app feels sluggish. Describe your performance debugging methodology - from measurement to fix - and say what you do <em>not</em> do first.'
      },
      answer: {
        pl: '<p>Czego nie robię: nie rozsypuję <code>memo</code> i <code>useCallback</code> po kodzie. To najczęstszy błąd - kosztuje czytelność, a zwykle nie dotyka przyczyny.</p><p>Najpierw pomiar. Panel Performance w Chrome z throttlingiem CPU 4x, nagranie kilku znaków: sprawdzam, czy długie zadania to skrypt, layout, czy paint. Równolegle React DevTools Profiler z opcją "Highlight updates" i "Why did this render" - interesuje mnie liczba commitów na znak, najdroższy węzeł i przyczyna renderu.</p><p>Potem klasyfikuję problem. Za dużo commitów: brak debounce, stan trzymany za wysoko, nowa wartość kontekstu, subskrypcja całego store. Mało commitów, ale drogich: ciężkie obliczenia w renderze, długie listy bez wirtualizacji, drogi wykres przerysowywany bez potrzeby. Layout thrashing: pomiary DOM w pętli.</p><p>Poprawki w kolejności siły: przeniesienie stanu w dół, <code>useDeferredValue</code> lub <code>useTransition</code> dla listy wyników, wirtualizacja, dopiero na końcu memoizacja punktowa. Każda zmiana weryfikowana tym samym nagraniem - inaczej to nie optymalizacja, tylko przeczucie.</p>',
        en: '<p>What I do not do: sprinkle <code>memo</code> and <code>useCallback</code> across the code. That is the most common mistake - it costs readability and usually misses the cause.</p><p>Measure first. Chrome Performance panel with 4x CPU throttling, recording a few keystrokes: I check whether the long tasks are script, layout or paint. In parallel the React DevTools Profiler with "Highlight updates" and "Why did this render" - I care about commits per keystroke, the most expensive node, and the render trigger.</p><p>Then I classify. Too many commits: no debounce, state held too high, a fresh context value, a whole-store subscription. Few but expensive commits: heavy computation in render, long lists without virtualization, an expensive chart redrawn needlessly. Layout thrashing: DOM measurements in a loop.</p><p>Fixes ordered by leverage: push state down, <code>useDeferredValue</code> or <code>useTransition</code> for the result list, virtualization, and only then targeted memoization. Every change verified with the same recording - otherwise it is not optimization, it is a hunch.</p>'
      },
      keyPoints: [
        { pl: 'Najpierw pomiar: panel Performance z throttlingiem plus React Profiler.', en: 'Measure first: Performance panel with throttling plus the React Profiler.' },
        { pl: 'Rozróżnienie: za dużo commitów vs pojedyncze drogie commity.', en: 'Distinguish too many commits from a few expensive commits.' },
        { pl: 'Kolejność poprawek: stan w dół, transitions, wirtualizacja, potem memo.', en: 'Fix order: push state down, transitions, virtualization, then memo.' },
        { pl: 'Antywzorzec: memoizacja na oślep przed pomiarem.', en: 'Anti-pattern: blind memoization before measuring.' },
        { pl: 'Weryfikacja tym samym scenariuszem pomiarowym.', en: 'Verify with the same measurement scenario.' }
      ]
    },

    // 15 - choice / mid - derived state
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'W komponencie jest <code>const [full, setFull] = useState("")</code> oraz <code>useEffect(() =&gt; setFull(first + " " + last), [first, last])</code>. Co jest tu nie tak?',
        en: 'A component has <code>const [full, setFull] = useState("")</code> plus <code>useEffect(() =&gt; setFull(first + " " + last), [first, last])</code>. What is wrong here?'
      },
      options: [
        { pl: 'Nic - to standardowy sposób na stan pochodny w React.', en: 'Nothing - this is the standard way to derive state in React.' },
        { pl: 'Brakuje <code>full</code> w tablicy zależności, przez co powstaje stale closure.', en: 'The dependency array is missing <code>full</code>, which creates a stale closure.' },
        { pl: 'To synchronizacja stanu pochodnego przez efekt: dodatkowy render, moment niespójności i zbędny stan - wystarczy <code>const full = first + " " + last</code>.', en: 'It syncs derived state through an effect: an extra render, a moment of inconsistency and redundant state - <code>const full = first + " " + last</code> is enough.' },
        { pl: 'Efekt nigdy się nie uruchomi, bo <code>first</code> i <code>last</code> to propsy.', en: 'The effect will never run because <code>first</code> and <code>last</code> are props.' }
      ],
      correct: 2,
      explain: {
        pl: 'Klasyczny antywzorzec "you might not need an effect". Wartość da się policzyć w renderze, więc nie potrzebuje ani stanu, ani efektu. Efekt daje dodatkowy commit i jedną klatkę, w której <code>full</code> jest nieaktualne. Jeśli obliczenie jest naprawdę kosztowne, opakuj je w <code>useMemo</code> - to bezpośredni odpowiednik Vue <code>computed</code>. Efekt rezerwuj na synchronizację ze światem zewnętrznym, nie na wyliczanie danych z danych.',
        en: 'The classic "you might not need an effect" anti-pattern. The value is computable during render, so it needs neither state nor an effect. The effect adds a commit and one frame where <code>full</code> is stale. If the computation is genuinely expensive, wrap it in <code>useMemo</code> - the direct counterpart of Vue <code>computed</code>. Reserve effects for synchronizing with the outside world, not for deriving data from data.'
      }
    },

    // 16 - open / senior - useLayoutEffect
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Tooltip pozycjonowany po zmierzeniu elementu miga w złym miejscu przez jedną klatkę. Wyjaśnij mechanizm i kiedy sięgasz po <code>useLayoutEffect</code> zamiast <code>useEffect</code> - łącznie z kosztem tej decyzji i zachowaniem w SSR.',
        en: 'A tooltip positioned after measuring an element flashes in the wrong place for one frame. Explain the mechanism and when you reach for <code>useLayoutEffect</code> instead of <code>useEffect</code> - including its cost and its SSR behavior.'
      },
      answer: {
        pl: '<p>Kolejność jest taka: React renderuje, mutuje DOM (commit), potem przeglądarka maluje, a dopiero po malowaniu odpala <code>useEffect</code>. Jeśli w tym efekcie mierzysz element i ustawiasz pozycję, użytkownik zdążył zobaczyć jedną klatkę ze starą pozycją - stąd mignięcie.</p><p><code>useLayoutEffect</code> wykonuje się synchronicznie po commicie, a przed malowaniem. Pomiar i korekta trafiają do tej samej klatki, więc mignięcia nie ma. Używam go dokładnie tam, gdzie wynik efektu jest widoczny wizualnie i zależy od zmierzonego layoutu: pozycjonowanie popoverów, przywracanie pozycji scrolla, pomiar wysokości przed animacją.</p><p>Koszt: blokuje malowanie, więc ciężka praca w środku bezpośrednio wydłuża klatkę i psuje INP. Nigdy nie wkładam tam fetchowania ani logiki, która może poczekać.</p><p>W SSR <code>useLayoutEffect</code> nie wykonuje się wcale i React ostrzega w konsoli - na serwerze nie ma layoutu do zmierzenia. Rozwiązanie to render bez pozycji do momentu hydracji albo <code>useIsomorphicLayoutEffect</code>, który na serwerze degraduje się do <code>useEffect</code>.</p>',
        en: '<p>The order is: React renders, mutates the DOM (commit), the browser paints, and only after paint does <code>useEffect</code> run. If that effect measures an element and sets the position, the user has already seen one frame at the old position - hence the flash.</p><p><code>useLayoutEffect</code> runs synchronously after commit and before paint. Measurement and correction land in the same frame, so there is no flash. I use it exactly where the effect result is visually observable and depends on measured layout: positioning popovers, restoring scroll position, measuring height before an animation.</p><p>The cost: it blocks paint, so heavy work inside directly lengthens the frame and hurts INP. I never put fetching or deferrable logic there.</p><p>Under SSR <code>useLayoutEffect</code> does not run at all and React warns in the console - there is no layout to measure on the server. The remedy is rendering without a position until hydration, or an <code>useIsomorphicLayoutEffect</code> that degrades to <code>useEffect</code> on the server.</p>'
      },
      keyPoints: [
        { pl: 'Kolejność: render, commit, paint, useEffect - stąd mignięcie.', en: 'Order: render, commit, paint, useEffect - hence the flash.' },
        { pl: 'useLayoutEffect działa po commicie a przed malowaniem.', en: 'useLayoutEffect runs after commit and before paint.' },
        { pl: 'Właściwe zastosowania: pomiar layoutu, pozycjonowanie, przywracanie scrolla.', en: 'Proper uses: layout measurement, positioning, scroll restoration.' },
        { pl: 'Koszt: blokuje klatkę, więc żadnej ciężkiej pracy ani fetchy.', en: 'Cost: it blocks the frame, so no heavy work and no fetching.' },
        { pl: 'W SSR nie działa i ostrzega; potrzebny izomorficzny fallback.', en: 'It does not run in SSR and warns; you need an isomorphic fallback.' }
      ]
    },

    // 17 - open / senior - hydration mismatch
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Na produkcji w Next.js pojawia się "Hydration failed because the server rendered HTML did not match the client". Jak podchodzisz do śledztwa i jakie są typowe przyczyny oraz poprawne rozwiązania?',
        en: 'In production on Next.js you see "Hydration failed because the server rendered HTML did not match the client". How do you investigate, and what are the typical causes and correct fixes?'
      },
      answer: {
        pl: '<p>Hydracja zakłada, że pierwszy render na kliencie wyprodukuje dokładnie to samo drzewo, co serwer. Jeśli się rozjedzie, React w wersji 18+ porzuca hydrację tego poddrzewa i renderuje je od zera - stąd mignięcie, utrata stanu i skok kosztu.</p><p>Śledztwo: zaczynam od komunikatu, który od React 19 pokazuje diff serwer/klient, i lokalizuję komponent. Potem sprawdzam listę podejrzanych: <code>Date.now()</code>, <code>new Date().toLocaleString()</code> i formatowanie zależne od strefy czasowej lub locale, <code>Math.random()</code>, odczyt <code>window</code>, <code>localStorage</code> albo <code>matchMedia</code> w renderze, różnice w <code>navigator</code>, oraz rozszerzenia przeglądarki wstrzykujące atrybuty. Osobna kategoria to niepoprawny HTML - <code>&lt;div&gt;</code> wewnątrz <code>&lt;p&gt;</code> - bo parser przeglądarki przestawia węzły.</p><p>Poprawki: wartości zależne od klienta czytam w <code>useEffect</code> i renderuję neutralny placeholder do czasu montowania, daty formatuję deterministycznie z jawną strefą, a tam gdzie różnica jest świadoma i lokalna używam <code>suppressHydrationWarning</code>. Komponenty czysto klienckie ładowane dynamicznie z <code>ssr: false</code>.</p>',
        en: '<p>Hydration assumes the first client render produces exactly the tree the server produced. On mismatch, React 18+ abandons hydration for that subtree and re-renders it from scratch - hence flashing, lost state and a performance hit.</p><p>Investigation: I start from the message, which since React 19 shows a server/client diff, and locate the component. Then I run through the usual suspects: <code>Date.now()</code>, <code>new Date().toLocaleString()</code> and any timezone- or locale-dependent formatting, <code>Math.random()</code>, reading <code>window</code>, <code>localStorage</code> or <code>matchMedia</code> during render, <code>navigator</code> differences, and browser extensions injecting attributes. A separate category is invalid HTML - a <code>&lt;div&gt;</code> inside a <code>&lt;p&gt;</code> - because the browser parser reshuffles nodes.</p><p>Fixes: read client-dependent values in <code>useEffect</code> and render a neutral placeholder until mounted, format dates deterministically with an explicit timezone, and where the difference is intentional and local use <code>suppressHydrationWarning</code>. Purely client components get dynamic import with <code>ssr: false</code>.</p>'
      },
      keyPoints: [
        { pl: 'Rozjazd powoduje porzucenie hydracji poddrzewa i pełny re-render.', en: 'A mismatch makes React drop hydration for the subtree and fully re-render it.' },
        { pl: 'Typowe źródła: czas, locale, losowość, window/localStorage w renderze.', en: 'Typical sources: time, locale, randomness, window/localStorage during render.' },
        { pl: 'Niepoprawny HTML też powoduje rozjazd przez parser przeglądarki.', en: 'Invalid HTML also causes a mismatch through the browser parser.' },
        { pl: 'Poprawka: wartości klienckie po montowaniu, deterministyczne formatowanie.', en: 'Fix: client values after mount, deterministic formatting.' },
        { pl: 'suppressHydrationWarning i ssr:false jako narzędzia punktowe.', en: 'suppressHydrationWarning and ssr:false as targeted tools.' }
      ]
    },

    // 18 - choice / senior - suspense streaming
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'W App Routerze owijasz wolny komponent serwerowy w <code>&lt;Suspense fallback={&lt;Skeleton/&gt;}&gt;</code>. Co to realnie zmienia w dostarczaniu strony?',
        en: 'In the App Router you wrap a slow server component in <code>&lt;Suspense fallback={&lt;Skeleton/&gt;}&gt;</code>. What does that actually change in how the page is delivered?'
      },
      options: [
        { pl: 'Nic w sieci - <code>Suspense</code> działa tylko po hydracji na kliencie.', en: 'Nothing on the wire - <code>Suspense</code> only works on the client after hydration.' },
        { pl: 'Serwer czeka na wszystkie dane, ale pokazuje skeleton, żeby ukryć opóźnienie.', en: 'The server waits for all data but shows a skeleton to hide the delay.' },
        { pl: 'Reszta strony leci do przeglądarki od razu, a wolny fragment dopływa później w tym samym strumieniu i zastępuje skeleton.', en: 'The rest of the page ships immediately and the slow chunk streams in later in the same response, replacing the skeleton.' },
        { pl: 'Fragment zostaje przeniesiony do renderowania po stronie klienta i pobrany osobnym requestem.', en: 'The chunk is moved to client-side rendering and fetched with a separate request.' }
      ],
      correct: 2,
      explain: {
        pl: 'To jest sens streaming SSR: granica <code>Suspense</code> pozwala serwerowi wysłać shell natychmiast i dosyłać gotowe fragmenty w jednym strumieniu. Poprawia TTFB i LCP, bo szybka część nie czeka na najwolniejsze zapytanie. Ważna konsekwencja produkcyjna: skoro nagłówki poszły już do klienta, po rozpoczęciu strumienia nie zmienisz statusu HTTP ani przekierowania - obsługa błędów musi być lokalna, przez <code>error.tsx</code>. Odpowiednik w Nuxt to lazy hydration i wyspy, ale mechanika strumienia jest inna.',
        en: 'That is the point of streaming SSR: a <code>Suspense</code> boundary lets the server flush the shell immediately and push finished chunks in one stream. It improves TTFB and LCP because the fast part does not wait for the slowest query. An important production consequence: once headers are sent you cannot change the HTTP status or redirect mid-stream - error handling must be local, via <code>error.tsx</code>. The Nuxt analogue is lazy hydration and islands, but the streaming mechanics differ.'
      }
    },

    // 19 - choice / mid - controlled inputs
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Input z <code>value={query}</code> bez <code>onChange</code> nie daje się edytować i React krzyczy w konsoli. Jaka jest najbliższa analogia z Vue i poprawne wyjście?',
        en: 'An input with <code>value={query}</code> and no <code>onChange</code> cannot be edited and React logs a warning. What is the closest Vue analogy and the correct way out?'
      },
      options: [
        { pl: 'To jak <code>v-model</code> bez emita: trzeba dodać <code>onChange</code>, albo użyć <code>defaultValue</code> dla pola niekontrolowanego.', en: 'It is like <code>v-model</code> without the emit: add <code>onChange</code>, or use <code>defaultValue</code> for an uncontrolled field.' },
        { pl: 'Trzeba dodać <code>readOnly</code>, bo React wymaga jawnej deklaracji trybu.', en: 'You must add <code>readOnly</code>, because React requires an explicit mode declaration.' },
        { pl: 'Należy zamienić <code>value</code> na <code>ref</code> i czytać wartość z DOM.', en: 'You should replace <code>value</code> with a <code>ref</code> and read the value from the DOM.' },
        { pl: 'Problem znika po opakowaniu w <code>&lt;form&gt;</code> z <code>onSubmit</code>.', en: 'The problem disappears once you wrap it in a <code>&lt;form&gt;</code> with <code>onSubmit</code>.' }
      ],
      correct: 0,
      explain: {
        pl: 'W React <code>value</code> plus <code>onChange</code> to ręcznie rozpisany <code>v-model</code>: props w dół, zdarzenie w górę. Bez handlera pole jest przypięte do stanu, który nigdy się nie zmienia. <code>defaultValue</code> przełącza pole w tryb niekontrolowany - React ustawia wartość początkową i oddaje kontrolę DOM. Osobna pułapka produkcyjna: przejście z <code>undefined</code> na wartość przełącza pole z niekontrolowanego na kontrolowane i wywołuje ostrzeżenie - inicjalizuj pustym stringiem.',
        en: 'In React, <code>value</code> plus <code>onChange</code> is <code>v-model</code> spelled out: prop down, event up. Without a handler the field is pinned to state that never changes. <code>defaultValue</code> switches it to uncontrolled - React sets the initial value and hands control to the DOM. A separate production trap: going from <code>undefined</code> to a value flips the field from uncontrolled to controlled and triggers a warning - initialize with an empty string.'
      }
    },

    // 20 - open / mid - children vs slots
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Jak w React odwzorować slot domyślny, sloty nazwane i slot scoped z Vue? Pokaż mechanizmy i powiedz, które rozwiązanie wybierasz w bibliotece komponentów i dlaczego.',
        en: 'How do you map Vue default slots, named slots and scoped slots to React? Show the mechanisms and say which one you pick in a component library and why.'
      },
      answer: {
        pl: '<p>Slot domyślny to po prostu props <code>children</code> - dowolny węzeł React przekazany między tagami.</p><p>Sloty nazwane nie mają dedykowanej składni, więc przekazuję elementy jako zwykłe propsy: <code>&lt;Card header={&lt;Title/&gt;} footer={&lt;Actions/&gt;} /&gt;</code>. Drugi wariant to komponenty złożone (<code>Card.Header</code>, <code>Card.Body</code>) - czytelniejsze w użyciu, ale wymagają kontekstu do komunikacji między częściami i są trudniejsze do walidacji typami.</p><p>Slot scoped, czyli przekazanie danych z dziecka do rodzica, realizuje się funkcją: <code>children</code> jako funkcja albo props typu <code>renderRow={(row) =&gt; ...}</code>. To dokładnie ten sam kontrakt, tylko jawny - Vue robi to w szablonie przez <code>v-slot="{ row }"</code>.</p><p>W bibliotece komponentów domyślnie wybieram propsy typu ReactNode dla prostych slotów i render props tam, gdzie potrzebne są dane wewnętrzne, bo oba warianty są w pełni typowalne w TypeScript. Komponenty złożone rezerwuję na rozbudowane widgety, gdzie ergonomia użycia wygrywa z prostotą implementacji.</p>',
        en: '<p>The default slot is simply the <code>children</code> prop - any React node passed between the tags.</p><p>Named slots have no dedicated syntax, so I pass elements as ordinary props: <code>&lt;Card header={&lt;Title/&gt;} footer={&lt;Actions/&gt;} /&gt;</code>. The second option is compound components (<code>Card.Header</code>, <code>Card.Body</code>) - nicer at the call site, but they need context to communicate between parts and are harder to type-check.</p><p>Scoped slots, meaning passing data from child up to the caller, are done with a function: <code>children</code> as a function, or a prop like <code>renderRow={(row) =&gt; ...}</code>. That is the same contract, just explicit - Vue expresses it in the template with <code>v-slot="{ row }"</code>.</p><p>In a component library I default to ReactNode props for simple slots and render props where internal data is needed, because both are fully typeable in TypeScript. Compound components I reserve for rich widgets where call-site ergonomics beat implementation simplicity.</p>'
      },
      keyPoints: [
        { pl: 'Slot domyślny = props children.', en: 'Default slot equals the children prop.' },
        { pl: 'Sloty nazwane = propsy typu ReactNode lub komponenty złożone.', en: 'Named slots equal ReactNode props or compound components.' },
        { pl: 'Slot scoped = render prop lub children jako funkcja.', en: 'Scoped slot equals a render prop or children as a function.' },
        { pl: 'Komponenty złożone wymagają kontekstu i gorzej się typują.', en: 'Compound components need context and type worse.' },
        { pl: 'Wybór w bibliotece: typowalność i przewidywalny kontrakt API.', en: 'Library choice: typeability and a predictable API contract.' }
      ]
    },

    // 21 - choice / senior - StrictMode
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Po włączeniu <code>StrictMode</code> w dev logi pokazują dwa wywołania API przy montowaniu komponentu. Jaka jest poprawna reakcja?',
        en: 'After enabling <code>StrictMode</code> in dev, logs show two API calls on component mount. What is the correct reaction?'
      },
      options: [
        { pl: 'Wyłączyć <code>StrictMode</code> - to znany artefakt narzędziowy bez znaczenia.', en: 'Turn off <code>StrictMode</code> - it is a known tooling artifact of no consequence.' },
        { pl: 'Dodać flagę w <code>useRef</code>, która zablokuje drugie wywołanie.', en: 'Add a <code>useRef</code> flag that blocks the second call.' },
        { pl: 'Potraktować to jako wykryty brak sprzątania: efekt musi być odporny na mount-unmount-mount, więc dodać <code>AbortController</code> w cleanupie.', en: 'Treat it as a detected missing cleanup: the effect must survive mount-unmount-mount, so add an <code>AbortController</code> in the cleanup.' },
        { pl: 'Przenieść fetch do <code>useMemo</code>, bo memo wykonuje się raz.', en: 'Move the fetch into <code>useMemo</code>, since memo runs once.' }
      ],
      correct: 2,
      explain: {
        pl: '<code>StrictMode</code> celowo montuje, odmontowuje i montuje komponent ponownie w dev, żeby ujawnić efekty bez poprawnego sprzątania. To symulacja realnych sytuacji: szybka nawigacja tam i z powrotem, przywracanie widoku z cache. Blokada refem ukrywa objaw, ale zostawia wyścig i wyciek subskrypcji. Poprawnie: cleanup anulujący żądanie (<code>AbortController</code>), odpinający listenery i zamykający połączenia - albo oddanie fetchowania warstwie z deduplikacją, jak TanStack Query.',
        en: '<code>StrictMode</code> deliberately mounts, unmounts and remounts a component in dev to expose effects without proper cleanup. It simulates real situations: fast back-and-forth navigation, restoring a cached view. A ref guard hides the symptom but leaves the race and the leaked subscription. The correct fix is a cleanup that aborts the request (<code>AbortController</code>), detaches listeners and closes connections - or delegating fetching to a deduplicating layer such as TanStack Query.'
      }
    },

    // 22 - open / mid - useRef vs useState vs Vue ref
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Nazwa myli osoby przychodzące z Vue: <code>useRef</code> w React to nie jest <code>ref()</code> z Vue. Wyjaśnij różnicę, podaj właściwe zastosowania <code>useRef</code> i powiedz, kiedy jego użycie jest błędem.',
        en: 'The name misleads people coming from Vue: React <code>useRef</code> is not Vue <code>ref()</code>. Explain the difference, give the proper uses of <code>useRef</code>, and say when using it is a mistake.'
      },
      answer: {
        pl: '<p>Vue <code>ref()</code> to reaktywne pudełko: odczyt <code>.value</code> rejestruje zależność, a zapis budzi efekty i odświeża szablon. Odpowiednikiem w React jest <code>useState</code>, a nie <code>useRef</code>.</p><p>React <code>useRef</code> to zwykły, mutowalny obiekt <code>{ current }</code>, który przeżywa kolejne rendery i którego zmiana <strong>nie</strong> powoduje renderu. Najbliższa analogia to pole instancji klasy albo zmienna zadeklarowana w <code>setup()</code> Vue bez reaktywności.</p><p>Właściwe zastosowania: uchwyt do węzła DOM, identyfikator timera lub subskrypcji, poprzednia wartość propsa, licznik prób, cache obliczeń, przechowywanie najświeższego callbacka, żeby uciec od stale closure w interwale.</p><p>Błędem jest trzymanie w refie czegokolwiek, co ma być widoczne w UI - ekran po prostu się nie odświeży i powstaje trudny do wykrycia rozjazd między danymi a widokiem. Drugim błędem jest czytanie lub zapisywanie <code>ref.current</code> w trakcie renderu: to łamie czystość renderu, psuje renderowanie współbieżne i wyłącza komponent z optymalizacji React Compilera. Refa dotyka się w efektach i handlerach.</p>',
        en: '<p>Vue <code>ref()</code> is a reactive box: reading <code>.value</code> registers a dependency and writing it wakes effects and refreshes the template. Its React counterpart is <code>useState</code>, not <code>useRef</code>.</p><p>React <code>useRef</code> is a plain mutable <code>{ current }</code> object that survives renders and whose mutation does <strong>not</strong> trigger a render. The closest analogy is a class instance field, or a non-reactive variable declared in a Vue <code>setup()</code>.</p><p>Proper uses: a handle to a DOM node, a timer or subscription id, a previous prop value, a retry counter, a computation cache, or holding the latest callback to escape a stale closure inside an interval.</p><p>It is a mistake to keep anything the UI must display in a ref - the screen simply will not refresh and you get a hard-to-spot drift between data and view. The second mistake is reading or writing <code>ref.current</code> during render: it breaks render purity, hurts concurrent rendering and opts the component out of React Compiler optimization. Refs are touched in effects and handlers.</p>'
      },
      keyPoints: [
        { pl: 'Vue ref() jest reaktywne - jego odpowiednikiem jest useState.', en: 'Vue ref() is reactive - its counterpart is useState.' },
        { pl: 'useRef to mutowalne pudełko bez re-renderu, jak pole instancji.', en: 'useRef is a mutable box with no re-render, like an instance field.' },
        { pl: 'Zastosowania: węzły DOM, timery, poprzednie wartości, najświeższy callback.', en: 'Uses: DOM nodes, timers, previous values, latest callback.' },
        { pl: 'Błąd: trzymanie w refie danych widocznych w UI.', en: 'Mistake: keeping UI-visible data in a ref.' },
        { pl: 'Błąd: dotykanie ref.current w trakcie renderu.', en: 'Mistake: touching ref.current during render.' }
      ]
    },

    // 23 - open / senior - migration
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Twój zespół Vue ma przejąć utrzymanie dużej aplikacji React. Co - poza składnią - najczęściej łamie się takim zespołom w pierwszych miesiącach i jak przygotowałbyś migrację kompetencji?',
        en: 'Your Vue team is taking over maintenance of a large React application. Beyond syntax, what most often breaks for such teams in the first months, and how would you prepare the skills migration?'
      },
      answer: {
        pl: '<p>Składnia to najłatwiejsza część. Łamie się model mentalny. Zespół przyzwyczajony do reaktywności pisze kod tak, jakby ciało komponentu wykonywało się raz, i produkuje trzy klasy błędów: stale closures w efektach i callbackach, efekty używane jako watchery do wyliczania stanu pochodnego oraz niestabilne referencje wysadzające wydajność i pętle efektów.</p><p>Druga rzecz to brak konwencji. Vue narzuca strukturę SFC i router; React nie narzuca niczego, więc bez decyzji architektonicznych powstają trzy sposoby fetchowania i cztery style stanu.</p><p>Przygotowanie: krótki warsztat o modelu renderowania i o tożsamości wartości - to fundament wszystkich pozostałych zasad. Potem ustalone z góry decyzje: TanStack Query na stan serwera, jedna biblioteka formularzy, jedna do stanu globalnego, jasna granica <code>"use client"</code>. Do tego eslint-plugin-react-hooks jako błąd, nie ostrzeżenie, i lista antywzorców w code review: efekt liczący dane, komponent w komponencie, klucz z indeksu.</p><p>Na koniec nauka narzędzi: Profiler, "why did this render", i nawyk mierzenia przed optymalizacją.</p>',
        en: '<p>Syntax is the easy part. What breaks is the mental model. A team used to reactivity writes code as if the component body ran once, and produces three classes of bugs: stale closures in effects and callbacks, effects used as watchers to compute derived state, and unstable references that wreck performance and cause effect loops.</p><p>The second issue is the absence of conventions. Vue imposes SFC structure and a router; React imposes nothing, so without architectural decisions you end up with three ways to fetch and four styles of state.</p><p>Preparation: a short workshop on the rendering model and on value identity - that is the foundation of every other rule. Then decisions made upfront: TanStack Query for server state, one forms library, one global-state library, a clear <code>"use client"</code> boundary. Plus eslint-plugin-react-hooks as an error rather than a warning, and a review checklist of anti-patterns: effects that compute data, components defined inside components, index keys.</p><p>Finally, tooling literacy: the Profiler, "why did this render", and the habit of measuring before optimizing.</p>'
      },
      keyPoints: [
        { pl: 'Główna bariera to model mentalny, nie składnia.', en: 'The main barrier is the mental model, not syntax.' },
        { pl: 'Trzy typowe błędy: stale closures, efekty jako watchery, niestabilne referencje.', en: 'Three typical bugs: stale closures, effects as watchers, unstable references.' },
        { pl: 'React nie narzuca konwencji - trzeba je ustalić decyzją zespołową.', en: 'React imposes no conventions - the team must decide them.' },
        { pl: 'Reguły lintera dla hooków jako błąd w CI.', en: 'Hook lint rules as errors in CI.' },
        { pl: 'Nauka Profilera i mierzenia przed optymalizacją.', en: 'Teach the Profiler and measuring before optimizing.' }
      ]
    },

    // 24 - choice / senior - next caching
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'W Next.js App Router strona z <code>fetch(url)</code> pokazuje na produkcji dane sprzed godziny, choć lokalnie zawsze są świeże. Co jest najbardziej prawdopodobną przyczyną?',
        en: 'In the Next.js App Router a page using <code>fetch(url)</code> shows hour-old data in production while it is always fresh locally. What is the most likely cause?'
      },
      options: [
        { pl: 'Przeglądarka cachuje odpowiedź HTML mimo braku nagłówków.', en: 'The browser caches the HTML response despite missing headers.' },
        { pl: 'Server Components nie mogą pobierać świeżych danych - trzeba przenieść fetch na klienta.', en: 'Server Components cannot fetch fresh data - the fetch must move to the client.' },
        { pl: 'CDN zawsze ignoruje nagłówki Next.js i cachuje na godzinę.', en: 'The CDN always ignores Next.js headers and caches for an hour.' },
        { pl: 'Trasa została uznana za statyczną i zaprerenderowana w buildzie lub cache danych zwraca zapisaną odpowiedź; potrzebne jest <code>revalidate</code>, <code>cache: "no-store"</code> albo dynamiczne API.', en: 'The route was treated as static and prerendered at build time, or the data cache returns a stored response; you need <code>revalidate</code>, <code>cache: "no-store"</code> or a dynamic API.' }
      ],
      correct: 3,
      explain: {
        pl: 'To najczęstsza pułapka App Routera: lokalnie w dev cache jest w dużej mierze wyłączony, więc problem widać dopiero po deployu. Trasa bez dynamicznych sygnałów może zostać wyrenderowana raz w buildzie, a dane mogą dodatkowo siedzieć w cache danych. Świadome sterowanie: <code>export const revalidate = 60</code>, <code>export const dynamic = "force-dynamic"</code>, <code>fetch(url, { cache: "no-store" })</code> albo <code>next: { tags: [...] }</code> plus <code>revalidateTag</code> przy zapisie. Ustawienia zmieniały się między wersjami Next - w odpowiedzi warto zaznaczyć, że weryfikujesz je dla konkretnej wersji.',
        en: 'This is the classic App Router trap: locally in dev caching is largely disabled, so the issue only appears after deploy. A route with no dynamic signals may be rendered once at build time, and the data may additionally sit in the data cache. Deliberate control: <code>export const revalidate = 60</code>, <code>export const dynamic = "force-dynamic"</code>, <code>fetch(url, { cache: "no-store" })</code>, or <code>next: { tags: [...] }</code> plus <code>revalidateTag</code> on write. Defaults changed across Next versions - it is worth saying you verify them for the specific version in use.'
      }
    },

    // 25 - choice / senior - server actions
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Które stwierdzenie o Server Actions w Next.js jest prawdziwe z punktu widzenia bezpieczeństwa?',
        en: 'Which statement about Next.js Server Actions is true from a security standpoint?'
      },
      options: [
        { pl: 'To publiczne endpointy HTTP z wygenerowanym identyfikatorem - każda akcja musi sama sprawdzać sesję, uprawnienia i walidować dane wejściowe.', en: 'They are public HTTP endpoints with a generated id - each action must check the session, permissions and validate its input itself.' },
        { pl: 'Są wywoływalne tylko z własnych komponentów, więc nie wymagają autoryzacji ani walidacji wejścia.', en: 'They are callable only from your own components, so they need no authorization or input validation.' },
        { pl: 'Next.js automatycznie odrzuca wywołania od niezalogowanych użytkowników.', en: 'Next.js automatically rejects calls from unauthenticated users.' },
        { pl: 'Argumenty akcji są kryptograficznie podpisane, więc nie da się ich podmienić.', en: 'Action arguments are cryptographically signed, so they cannot be tampered with.' }
      ],
      correct: 0,
      explain: {
        pl: 'Server Action to cukier składniowy nad endpointem RPC: framework generuje identyfikator i deserializuje argumenty, ale poza tym jest to zwykły punkt wejścia dostępny dla każdego, kto zna ten identyfikator. Traktuj każdą akcję jak kontroler API - autoryzacja na wejściu, walidacja schematem (zod), rate limiting przy operacjach wrażliwych. Framework daje ochronę CSRF opartą na sprawdzaniu origin, ale nie zastąpi autoryzacji domenowej.',
        en: 'A Server Action is syntax sugar over an RPC endpoint: the framework generates an id and deserializes arguments, but otherwise it is an ordinary entry point reachable by anyone who knows that id. Treat every action like an API controller - authorize at the top, validate with a schema (zod), rate limit sensitive operations. The framework provides origin-based CSRF protection, but that does not replace domain authorization.'
      }
    },

    // 26 - open / senior - react compiler
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Co dokładnie robi React Compiler, czego <em>nie</em> naprawi, i jak zmienia twoje podejście do <code>memo</code>, <code>useMemo</code> i <code>useCallback</code> w istniejącej dużej bazie kodu?',
        en: 'What exactly does the React Compiler do, what does it <em>not</em> fix, and how does it change your approach to <code>memo</code>, <code>useMemo</code> and <code>useCallback</code> in a large existing codebase?'
      },
      answer: {
        pl: '<p>Kompilator analizuje komponenty i hooki na etapie buildu i automatycznie wstawia memoizację: cachuje wartości i funkcje tworzone w renderze oraz pomija ponowne renderowanie dzieci, gdy propsy są referencyjnie stabilne. Efekt jest zbliżony do ręcznego rozstawienia <code>useMemo</code> i <code>useCallback</code>, tylko dokładniejszy i bez kosztu w czytelności.</p><p>Warunek jest twardy: kod musi przestrzegać Rules of React - czysty render, brak mutacji propsów i stanu w trakcie renderu, hooki wywoływane bezwarunkowo. Kompilator wykrywa naruszenia i po prostu pomija taki komponent, więc efektem złego kodu jest brak optymalizacji, a nie awaria.</p><p>Czego nie naprawi: zbyt szeroko trzymanego stanu, nadmiarowych efektów, drogich obliczeń wykonywanych mimo wszystko, braku wirtualizacji długich list, ciężkiego bundla i niepotrzebnych zapytań sieciowych. To nie jest zamiennik architektury.</p><p>W dużej bazie kodu włączam go stopniowo (per katalog), z eslint-plugin-react-compiler jako bramką, i nie usuwam hurtem istniejącej memoizacji - najpierw mierzę, potem sprzątam tam, gdzie kompilator faktycznie przejął robotę.</p>',
        en: '<p>The compiler analyzes components and hooks at build time and inserts memoization automatically: it caches values and functions created during render and skips re-rendering children whose props are referentially stable. The result is close to hand-placed <code>useMemo</code> and <code>useCallback</code>, only more precise and without the readability cost.</p><p>There is a hard precondition: the code must follow the Rules of React - pure render, no mutation of props or state during render, hooks called unconditionally. The compiler detects violations and simply skips such a component, so bad code yields missing optimization rather than breakage.</p><p>What it does not fix: state held too high, redundant effects, expensive computation that still has to run, missing virtualization on long lists, a heavy bundle and unnecessary network requests. It is not a substitute for architecture.</p><p>In a large codebase I roll it out gradually (directory by directory) with eslint-plugin-react-compiler as the gate, and I do not rip out existing memoization wholesale - I measure first, then clean up where the compiler has actually taken over.</p>'
      },
      keyPoints: [
        { pl: 'Automatyczna memoizacja wartości, funkcji i renderów dzieci na etapie buildu.', en: 'Automatic memoization of values, functions and child renders at build time.' },
        { pl: 'Wymaga przestrzegania Rules of React; naruszenia = pominięty komponent.', en: 'Requires the Rules of React; violations mean the component is skipped.' },
        { pl: 'Nie naprawia architektury stanu, efektów ani rozmiaru bundla.', en: 'It does not fix state architecture, effects or bundle size.' },
        { pl: 'Wdrożenie stopniowe z linterem jako bramką.', en: 'Gradual rollout with the linter as a gate.' },
        { pl: 'Nie usuwać istniejącej memoizacji bez pomiaru.', en: 'Do not remove existing memoization without measuring.' }
      ]
    },

    // 27 - choice / mid - props sync
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Komponent modala ma <code>const [draft, setDraft] = useState(props.value)</code>. Rodzic zmienia <code>props.value</code> po otwarciu modala, ale pole nadal pokazuje starą wartość. Które rozwiązanie jest najczystsze?',
        en: 'A modal component has <code>const [draft, setDraft] = useState(props.value)</code>. The parent changes <code>props.value</code> after the modal opens, but the field still shows the old value. Which fix is cleanest?'
      },
      options: [
        { pl: 'Dodać <code>useEffect(() =&gt; setDraft(props.value), [props.value])</code>.', en: 'Add <code>useEffect(() =&gt; setDraft(props.value), [props.value])</code>.' },
        { pl: 'Zamienić stan na <code>useRef</code> i wymuszać render ręcznie.', en: 'Replace the state with a <code>useRef</code> and force renders manually.' },
        { pl: 'Nadać modalowi <code>key</code> zależny od edytowanego rekordu, żeby React zresetował stan przez remount.', en: 'Give the modal a <code>key</code> derived from the edited record so React resets state through a remount.' },
        { pl: 'Użyć <code>useMemo</code> z zależnością <code>props.value</code>.', en: 'Use <code>useMemo</code> with <code>props.value</code> as a dependency.' }
      ],
      correct: 2,
      explain: {
        pl: 'Argument <code>useState</code> to wartość <em>początkowa</em> - czytana tylko przy montowaniu, dokładnie jak <code>ref(props.value)</code> w <code>setup()</code> we Vue. Reset przez <code>key</code> jest zalecany przez dokumentację: jasno wyraża intencję "to jest nowa edycja" i zeruje cały stan formularza za jednym zamachem. Wariant z efektem działa, ale dokłada render, moment niespójności i łatwo o nadpisanie tego, co użytkownik właśnie wpisał.',
        en: 'The <code>useState</code> argument is the <em>initial</em> value - read only at mount, exactly like Vue <code>ref(props.value)</code> inside <code>setup()</code>. Resetting via <code>key</code> is the documented recommendation: it states the intent "this is a new edit" and clears the whole form state in one move. The effect variant works but adds a render, a moment of inconsistency, and it easily overwrites what the user just typed.'
      }
    },

    // 28 - choice / senior - external store / tearing
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Integrujesz zewnętrzne źródło (np. <code>matchMedia</code> albo store spoza React). Dlaczego <code>useSyncExternalStore</code> jest lepsze niż <code>useState</code> + <code>useEffect</code> z subskrypcją?',
        en: 'You integrate an external source (say <code>matchMedia</code> or a non-React store). Why is <code>useSyncExternalStore</code> better than <code>useState</code> plus a subscribing <code>useEffect</code>?'
      },
      options: [
        { pl: 'Jest szybsze, bo pomija fazę commit.', en: 'It is faster because it skips the commit phase.' },
        { pl: 'Automatycznie memoizuje wartość, więc nie trzeba selektorów.', en: 'It memoizes the value automatically, so selectors are unnecessary.' },
        { pl: 'Działa poza komponentami, więc można go wołać w zwykłych funkcjach.', en: 'It works outside components, so you can call it from plain functions.' },
        { pl: 'Gwarantuje spójny odczyt w całym drzewie podczas renderowania współbieżnego i obsługuje snapshot serwerowy przy hydracji, eliminując tearing i mignięcie.', en: 'It guarantees a consistent read across the tree under concurrent rendering and provides a server snapshot for hydration, eliminating tearing and flashing.' }
      ],
      correct: 3,
      explain: {
        pl: 'Przy renderowaniu współbieżnym React może przerwać i wznowić render. Jeśli źródło zmieni się w trakcie, część drzewa zobaczy starą wartość, a część nową - to tearing (rozdarcie odczytu). <code>useSyncExternalStore</code> daje Reactowi jawny <code>getSnapshot</code>, dzięki czemu odczyt jest spójny, a osobny <code>getServerSnapshot</code> zapewnia zgodność przy hydracji. Wariant z efektem dodatkowo zawsze maluje pierwszą klatkę ze złą wartością, bo subskrypcja startuje po malowaniu.',
        en: 'Under concurrent rendering React can interrupt and resume a render. If the source changes mid-render, part of the tree sees the old value and part the new one - that is tearing. <code>useSyncExternalStore</code> gives React an explicit <code>getSnapshot</code>, making reads consistent, while a separate <code>getServerSnapshot</code> keeps hydration matching. The effect-based variant additionally always paints the first frame with the wrong value, because the subscription starts after paint.'
      }
    },

    // 29 - open / senior - long lists
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Tabela z 10 000 wierszy, każdy z kilkoma kontrolkami, scrolluje się skokowo, a filtrowanie zawiesza wątek na sekundę. Jak to naprawiasz i jakie są pułapki wybranego rozwiązania?',
        en: 'A table with 10,000 rows, each with several controls, scrolls in jerks and filtering freezes the thread for a second. How do you fix it and what are the pitfalls of your chosen approach?'
      },
      answer: {
        pl: '<p>Pierwsza przyczyna jest zwykle prosta: renderujemy dziesięć tysięcy wierszy, czyli setki tysięcy węzłów DOM. Żadna memoizacja tego nie uratuje, bo koszt jest w DOM i layoucie. Rozwiązaniem jest wirtualizacja - TanStack Virtual albo react-window - renderująca tylko okno widoczne plus overscan.</p><p>Druga przyczyna to praca w renderze: filtrowanie i sortowanie dziesięciu tysięcy rekordów przy każdym znaku. Tu pomaga <code>useDeferredValue</code> na zapytaniu (React renderuje listę w niskim priorytecie i nie blokuje inputa), memoizacja wyniku filtrowania, a przy naprawdę dużych zbiorach - przeniesienie filtrowania na serwer albo do Web Workera.</p><p>Pułapki wirtualizacji: wiersze o zmiennej wysokości wymagają pomiaru i powodują skoki scrolla; wyszukiwanie w przeglądarce (Ctrl+F) i drukowanie widzą tylko wyrenderowane wiersze; dostępność wymaga poprawnych ról ARIA i obsługi klawiatury, bo semantyka tabeli się rozjeżdża; testy end-to-end muszą scrollować, żeby znaleźć element. Dlatego zawsze pytam, czy użytkownik naprawdę potrzebuje 10 000 wierszy naraz - paginacja bywa lepszym rozwiązaniem produktowym.</p>',
        en: '<p>The first cause is usually simple: we render ten thousand rows, meaning hundreds of thousands of DOM nodes. No amount of memoization saves that, because the cost is in DOM and layout. The fix is virtualization - TanStack Virtual or react-window - rendering only the visible window plus overscan.</p><p>The second cause is work during render: filtering and sorting ten thousand records on every keystroke. Here <code>useDeferredValue</code> on the query helps (React renders the list at low priority and keeps the input responsive), plus memoizing the filtered result, and for genuinely large sets moving filtering to the server or a Web Worker.</p><p>Virtualization pitfalls: variable row heights need measurement and cause scroll jumps; browser find (Ctrl+F) and printing only see rendered rows; accessibility needs correct ARIA roles and keyboard handling because table semantics break; end-to-end tests must scroll to find elements. So I always ask whether the user truly needs 10,000 rows at once - pagination is often the better product answer.</p>'
      },
      keyPoints: [
        { pl: 'Koszt leży w liczbie węzłów DOM - potrzebna wirtualizacja, nie memoizacja.', en: 'The cost is DOM node count - virtualization is needed, not memoization.' },
        { pl: 'Filtrowanie: useDeferredValue, memoizacja, serwer lub Web Worker.', en: 'Filtering: useDeferredValue, memoization, server or a Web Worker.' },
        { pl: 'Pułapki: zmienne wysokości, Ctrl+F, druk, dostępność, testy e2e.', en: 'Pitfalls: variable heights, Ctrl+F, printing, accessibility, e2e tests.' },
        { pl: 'Zawsze rozważyć paginację jako rozwiązanie produktowe.', en: 'Always consider pagination as the product-level answer.' },
        { pl: 'Mierzyć przed i po - panel Performance, nie przeczucie.', en: 'Measure before and after with the Performance panel, not by feel.' }
      ]
    },

    // 30 - choice / mid - error boundaries
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Masz Error Boundary wokół całej aplikacji, a mimo to błąd rzucony w <code>onClick</code> i błąd z odrzuconego promisa w <code>fetch</code> wywalają aplikację do konsoli bez fallbacku. Dlaczego?',
        en: 'You have an Error Boundary around the whole app, yet an error thrown in <code>onClick</code> and a rejected promise from <code>fetch</code> both blow up in the console with no fallback. Why?'
      },
      options: [
        { pl: 'Error Boundary działa tylko w komponentach klasowych, więc trzeba przepisać aplikację.', en: 'Error Boundaries only work in class components, so the app must be rewritten.' },
        { pl: 'Error Boundary łapie błędy z renderu, cyklu życia i konstruktorów poddrzewa, ale nie z handlerów zdarzeń ani z kodu asynchronicznego.', en: 'Error Boundaries catch errors from render, lifecycle and constructors in the subtree, but not from event handlers or async code.' },
        { pl: 'Boundary musi być poniżej miejsca błędu, nie powyżej.', en: 'The boundary must sit below the error, not above it.' },
        { pl: 'React 19 usunął Error Boundaries na rzecz <code>Suspense</code>.', en: 'React 19 removed Error Boundaries in favor of <code>Suspense</code>.' }
      ],
      correct: 1,
      explain: {
        pl: 'Granica błędu przechwytuje wyjątki, które przechodzą przez mechanizm renderowania React. Handler zdarzenia wykonuje się poza tym przepływem, a odrzucony promise w ogóle nie propaguje się przez drzewo. Praktycznie: <code>try/catch</code> w handlerach, obsługa błędów w warstwie danych (TanStack Query ma <code>onError</code> i może rzucać do granicy przez <code>throwOnError</code>), globalne nasłuchy <code>error</code> i <code>unhandledrejection</code> dla raportowania do Sentry. Granice ustawia się też wielopoziomowo, żeby padał widget, a nie cała strona.',
        en: 'An error boundary catches exceptions that pass through the React rendering machinery. An event handler runs outside that flow, and a rejected promise never propagates through the tree at all. Practically: <code>try/catch</code> in handlers, error handling in the data layer (TanStack Query has <code>onError</code> and can rethrow to a boundary via <code>throwOnError</code>), plus global <code>error</code> and <code>unhandledrejection</code> listeners for Sentry reporting. Boundaries are also nested, so a widget fails instead of the whole page.'
      }
    },

    // 31 - choice / senior - transitions
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Kiedy <code>useTransition</code> jest właściwym narzędziem, a kiedy tylko maskuje problem?',
        en: 'When is <code>useTransition</code> the right tool, and when does it merely mask a problem?'
      },
      options: [
        { pl: 'Zawsze - obniża priorytet każdej aktualizacji, więc warto owijać nim wszystkie <code>set</code>.', en: 'Always - it lowers the priority of any update, so wrap every <code>set</code> in it.' },
        { pl: 'Gdy pilna aktualizacja (wpisywanie, kliknięcie zakładki) musi być natychmiastowa, a wynikająca z niej duża aktualizacja może poczekać i zostać przerwana; nie zastąpi jednak usunięcia zbyt drogiej pracy z renderu.', en: 'When an urgent update (typing, clicking a tab) must be instant while the large update it triggers can wait and be interrupted; it does not replace removing genuinely expensive work from render.' },
        { pl: 'Do opóźnienia zapytań sieciowych zamiast debounce.', en: 'To delay network requests instead of debouncing.' },
        { pl: 'Tylko w komponentach serwerowych, do strumieniowania fragmentów.', en: 'Only in server components, for streaming chunks.' }
      ],
      correct: 1,
      explain: {
        pl: 'Transitions dzielą aktualizacje na pilne i niepilne. Dzięki temu input pozostaje responsywny, bo React może przerwać render ciężkiej listy, gdy przyjdzie kolejny znak, a <code>isPending</code> daje sygnał do UI. To nie jest jednak przyspieszenie: jeśli render listy trwa 300 ms, to nadal trwa 300 ms - poprawia się odczuwalna responsywność, nie praca do wykonania. Jeśli drogie jest samo obliczenie, potrzebna jest memoizacja, wirtualizacja albo przerzucenie pracy poza główny wątek. <code>useDeferredValue</code> to wariant dla wartości, a nie dla wywołania.',
        en: 'Transitions split updates into urgent and non-urgent. The input stays responsive because React can interrupt rendering the heavy list when the next keystroke arrives, and <code>isPending</code> gives the UI a signal. It is not a speedup though: if the list render takes 300 ms it still takes 300 ms - perceived responsiveness improves, the work does not shrink. If the computation itself is expensive you need memoization, virtualization or moving work off the main thread. <code>useDeferredValue</code> is the variant for a value rather than a call.'
      }
    },

    // 32 - open / mid - effects vs watchers
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Porównaj <code>useEffect</code> z <code>watch</code> i <code>watchEffect</code> z Vue. Wymień co najmniej trzy różnice, które realnie zmieniają sposób pisania kodu.',
        en: 'Compare <code>useEffect</code> with Vue <code>watch</code> and <code>watchEffect</code>. Name at least three differences that genuinely change how you write code.'
      },
      answer: {
        pl: '<p>Po pierwsze, zależności. <code>watchEffect</code> zbiera je automatycznie w czasie wykonania, a <code>watch</code> dostaje jawne źródło. <code>useEffect</code> ma tablicę pisaną ręcznie i porównywaną przez <code>Object.is</code> - stąd cała klasa błędów z pominiętymi zależnościami i niestabilnymi referencjami. Linter reguł hooków jest tu obowiązkowy.</p><p>Po drugie, moment uruchomienia. Vue domyślnie odpala watcher przed aktualizacją DOM (można to zmienić przez <code>flush: "post"</code> lub <code>"sync"</code>), a <code>useEffect</code> wykonuje się po commicie i po malowaniu; przed malowaniem jest <code>useLayoutEffect</code>.</p><p>Po trzecie, wartości. Vue daje w callbacku starą i nową wartość oraz czyta zawsze żywy stan; React widzi jedynie snapshot swojego renderu, więc poprzednią wartość trzeba trzymać samemu w refie.</p><p>Po czwarte, sprzątanie. W React zwracana funkcja czyści przy każdym powtórzeniu efektu i przy odmontowaniu, a <code>StrictMode</code> celowo testuje ten cykl. W Vue <code>onCleanup</code> jest opcjonalne i rzadziej używane.</p><p>Wniosek praktyczny: w React efekt to synchronizacja ze światem zewnętrznym, nie sposób na liczenie stanu pochodnego.</p>',
        en: '<p>First, dependencies. <code>watchEffect</code> collects them automatically at runtime and <code>watch</code> takes an explicit source. <code>useEffect</code> has a hand-written array compared with <code>Object.is</code> - hence a whole class of bugs from omitted deps and unstable references. The hooks linter is mandatory here.</p><p>Second, timing. Vue runs watchers before the DOM update by default (changeable with <code>flush: "post"</code> or <code>"sync"</code>), while <code>useEffect</code> runs after commit and after paint; the pre-paint slot is <code>useLayoutEffect</code>.</p><p>Third, values. Vue hands the callback old and new values and always reads live state; React only sees the snapshot of its render, so you keep the previous value yourself in a ref.</p><p>Fourth, cleanup. In React the returned function runs before every re-run and on unmount, and <code>StrictMode</code> deliberately exercises that cycle. In Vue <code>onCleanup</code> is optional and used less often.</p><p>The practical conclusion: in React an effect is synchronization with the outside world, not a way to compute derived state.</p>'
      },
      keyPoints: [
        { pl: 'Zależności: automatyczne w Vue, ręczna tablica w React.', en: 'Dependencies: automatic in Vue, a manual array in React.' },
        { pl: 'Timing: watcher przed aktualizacją DOM, useEffect po malowaniu.', en: 'Timing: watchers before DOM update, useEffect after paint.' },
        { pl: 'Vue daje starą i nową wartość; React widzi snapshot renderu.', en: 'Vue gives old and new values; React sees a render snapshot.' },
        { pl: 'Sprzątanie w React jest centralne i testowane przez StrictMode.', en: 'Cleanup is central in React and exercised by StrictMode.' },
        { pl: 'Efekt to synchronizacja z zewnętrznym światem, nie stan pochodny.', en: 'An effect is external synchronization, not derived state.' }
      ]
    },

    // 33 - choice / senior - server/client props
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Komponent serwerowy przekazuje do komponentu klienta props <code>onSave={() =&gt; db.save()}</code>. Co się stanie?',
        en: 'A server component passes <code>onSave={() =&gt; db.save()}</code> as a prop to a client component. What happens?'
      },
      options: [
        { pl: 'Build lub render zakończy się błędem: propsy przez granicę muszą być serializowalne, chyba że funkcja jest oznaczona jako Server Action.', en: 'The build or render errors out: props crossing the boundary must be serializable, unless the function is marked as a Server Action.' },
        { pl: 'Zadziała - Next.js zamieni funkcję w wywołanie RPC automatycznie.', en: 'It works - Next.js turns the function into an RPC call automatically.' },
        { pl: 'Funkcja przejdzie, ale wykona się na kliencie z pustym <code>db</code>.', en: 'The function goes through but runs on the client with an empty <code>db</code>.' },
        { pl: 'Props zostanie po cichu pominięty, a komponent dostanie <code>undefined</code>.', en: 'The prop is silently dropped and the component receives <code>undefined</code>.' }
      ],
      correct: 0,
      explain: {
        pl: 'Granica serwer-klient to granica serializacji: przechodzą dane (obiekty, tablice, prymitywy, daty, <code>Map</code>, elementy React), nie przechodzą zwykłe funkcje, klasy z metodami ani domknięcia nad zasobami serwerowymi. Wyjątkiem są funkcje oznaczone <code>"use server"</code> - wtedy framework przesyła referencję do akcji, a nie kod. To samo dotyczy przypadkowego przekazania całego klienta ORM albo obiektu requestu, co jest też ryzykiem wycieku danych.',
        en: 'The server-client boundary is a serialization boundary: data crosses it (objects, arrays, primitives, dates, <code>Map</code>, React elements), plain functions, classes with methods and closures over server resources do not. The exception is functions marked <code>"use server"</code> - then the framework ships an action reference, not code. The same applies to accidentally passing a whole ORM client or the request object, which is also a data-leak risk.'
      }
    },

    // 34 - open / senior - code splitting
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Zespół dodał <code>React.lazy</code> na dwudziestu komponentach i bundle rzeczywiście zmalał, ale metryka INP i odczuwalna szybkość się pogorszyły. Wyjaśnij, co poszło nie tak i jak podchodzisz do dzielenia kodu świadomie.',
        en: 'A team applied <code>React.lazy</code> to twenty components and the bundle did shrink, but INP and perceived speed got worse. Explain what went wrong and how you approach code splitting deliberately.'
      },
      answer: {
        pl: '<p>Dzielenie kodu nie usuwa pracy, tylko przesuwa ją w czasie. Jeśli granice są postawione zbyt głęboko i zbyt gęsto, użytkownik zamiast jednego pobrania dostaje kaskadę małych żądań sieciowych, każde z własnym RTT, i łańcuch fallbacków <code>Suspense</code>, który objawia się migotaniem layoutu. Do tego dochodzi powtarzający się kod współdzielony między chunkami, jeśli konfiguracja bundlera tego nie scala.</p><p>Moje kryteria: dzielę po trasach i po dużych, rzadko używanych wyspach - edytor tekstu, biblioteka wykresów, modal z mapą. Nie dzielę małych komponentów będących częścią pierwszego widoku. Każdy fallback ma wymiary zbliżone do docelowej treści, żeby nie generować CLS.</p><p>Do tego prefetch intencyjny: ładowanie chunku na hover lub focus linku, a w Next.js prefetch tras w viewporcie. Weryfikacja przez bundle analyzer i pomiar na wolnej sieci z throttlingiem, nie na lokalnym localhoscie, gdzie każdy chunk przychodzi w jedną milisekundę.</p>',
        en: '<p>Code splitting does not remove work, it moves it in time. If boundaries sit too deep and too densely, instead of one download the user gets a cascade of small network requests, each with its own RTT, plus a chain of <code>Suspense</code> fallbacks that shows up as layout flicker. On top of that, code shared between chunks gets duplicated unless the bundler config merges it.</p><p>My criteria: split by route and by large, rarely used islands - a rich text editor, a charting library, a map modal. I do not split small components that are part of the first view. Every fallback is sized close to the real content so it does not cause CLS.</p><p>Then intent-based prefetching: load the chunk on link hover or focus, and in Next.js prefetch routes in the viewport. Verification through a bundle analyzer and measurement on a throttled slow network, not on localhost where every chunk arrives in a millisecond.</p>'
      },
      keyPoints: [
        { pl: 'Split przesuwa pracę w czasie i tworzy kaskadę żądań sieciowych.', en: 'Splitting shifts work in time and creates a waterfall of requests.' },
        { pl: 'Zbyt głęboki podział daje migotanie fallbacków i CLS.', en: 'Splitting too deep produces fallback flicker and CLS.' },
        { pl: 'Dzielić po trasach i dużych rzadkich wyspach, nie po drobiazgach.', en: 'Split by route and large rare islands, not by small pieces.' },
        { pl: 'Prefetch na hover/focus i prefetch tras w viewporcie.', en: 'Prefetch on hover/focus and prefetch routes in the viewport.' },
        { pl: 'Weryfikacja bundle analyzerem i pomiarem na throttlowanej sieci.', en: 'Verify with a bundle analyzer and measurements on a throttled network.' }
      ]
    },

    // 35 - choice / senior - refs in React 19
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Piszesz komponent <code>Input</code> w bibliotece designu i chcesz, żeby konsument mógł dostać referencję do natywnego <code>&lt;input&gt;</code>. Jak wygląda to w React 19?',
        en: 'You are writing an <code>Input</code> component in a design system and want consumers to get a reference to the native <code>&lt;input&gt;</code>. How does that look in React 19?'
      },
      options: [
        { pl: '<code>ref</code> jest zwykłym propsem funkcji komponentu, więc <code>forwardRef</code> nie jest już potrzebne; callback ref może też zwracać funkcję sprzątającą.', en: '<code>ref</code> is an ordinary prop of the function component, so <code>forwardRef</code> is no longer required; a callback ref may also return a cleanup function.' },
        { pl: '<code>forwardRef</code> jest nadal jedynym sposobem, a próba użycia <code>ref</code> jako propsa rzuca błąd.', en: '<code>forwardRef</code> remains the only way, and using <code>ref</code> as a prop throws.' },
        { pl: 'Trzeba użyć <code>useImperativeHandle</code>, bo natywne węzły nie są już eksponowane.', en: 'You must use <code>useImperativeHandle</code>, because native nodes are no longer exposed.' },
        { pl: 'Referencje przekazuje się przez kontekst, ponieważ <code>ref</code> jest zarezerwowane dla komponentów klasowych.', en: 'Refs are passed through context, because <code>ref</code> is reserved for class components.' }
      ],
      correct: 0,
      explain: {
        pl: 'React 19 pozwala odbierać <code>ref</code> bezpośrednio w propsach komponentu funkcyjnego, a <code>forwardRef</code> zostaje jako wsteczna zgodność. Dodatkowo callback ref może zwrócić funkcję czyszczącą, więc odpięcie obserwatora czy listenera nie wymaga już sprawdzania <code>null</code>. <code>useImperativeHandle</code> nadal ma sens, gdy chcesz wystawić wąskie API (np. <code>focus</code>, <code>scrollIntoView</code>) zamiast surowego węzła - w bibliotece designu to zwykle lepszy kontrakt.',
        en: 'React 19 lets a function component receive <code>ref</code> directly in props, with <code>forwardRef</code> kept for backward compatibility. Additionally a callback ref may return a cleanup function, so detaching an observer or listener no longer needs a <code>null</code> check. <code>useImperativeHandle</code> still makes sense when you want to expose a narrow API (for example <code>focus</code>, <code>scrollIntoView</code>) instead of the raw node - in a design system that is usually the better contract.'
      }
    },

    // 36 - choice / mid - url state
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Lista produktów z filtrami trzymanymi w <code>useState</code>. Użytkownicy skarżą się, że nie mogą wysłać linku do przefiltrowanego widoku, a przycisk wstecz zamyka stronę. Jaka zmiana architektoniczna rozwiązuje oba problemy naraz?',
        en: 'A product list keeps its filters in <code>useState</code>. Users complain they cannot share a link to a filtered view and the back button leaves the page. Which architectural change solves both at once?'
      },
      options: [
        { pl: 'Przenieść filtry do globalnego store z persystencją w <code>localStorage</code>.', en: 'Move filters into a global store persisted to <code>localStorage</code>.' },
        { pl: 'Trzymać filtry w parametrach URL i czytać je przez router jako źródło prawdy.', en: 'Keep filters in URL search params and read them through the router as the source of truth.' },
        { pl: 'Dodać <code>useEffect</code> zapisujący filtry do <code>history.state</code>.', en: 'Add a <code>useEffect</code> writing filters into <code>history.state</code>.' },
        { pl: 'Użyć kontekstu, żeby filtry przetrwały nawigację między trasami.', en: 'Use context so filters survive navigation between routes.' }
      ],
      correct: 1,
      explain: {
        pl: 'Stan URL to osobna kategoria stanu: należy do adresu, nie do komponentu. Przeniesienie filtrów do query params daje za darmo udostępnianie linkiem, działający przycisk wstecz, odświeżenie strony bez utraty widoku i - w Next.js - możliwość pobrania danych już na serwerze. <code>localStorage</code> psuje udostępnianie i tworzy niespójność między kartami, a kontekst nie zmienia adresu, więc nie rozwiązuje żadnego z dwóch zgłoszeń.',
        en: 'URL state is its own category: it belongs to the address, not to a component. Moving filters into query params gives you shareable links, a working back button, refresh without losing the view, and - in Next.js - the option to fetch data on the server. <code>localStorage</code> breaks sharing and creates cross-tab inconsistency, while context does not change the address, so it solves neither complaint.'
      }
    }

  ]
};
