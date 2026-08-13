// Track: vue - Module 01 - Reactivity fundamentals
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema", v4 interactive).

export default {
  id: 'reactivity-fundamentals',
  order: 1,
  icon: '⚡',
  title: {
    pl: 'Fundamenty reaktywności',
    en: 'Reactivity fundamentals'
  },
  description: {
    pl: 'Jak Vue naprawdę śledzi zależności: Proxy, track i trigger, ref kontra reactive, leniwe computed, warstwy watcherów oraz to, co kompilator robi ze script setup.',
    en: 'How Vue really tracks dependencies: proxies, track and trigger, ref versus reactive, lazy computed, watcher flush layers, and what the compiler does with script setup.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'reactivity-mental-model',
      title: {
        pl: 'Model mentalny reaktywności (Proxy)',
        en: 'The reactivity mental model (proxies)'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Reaktywne proxy', en: 'Reactive proxy' },
          def: { pl: 'Obiekt zwrócony przez <code>reactive()</code> - opakowanie <code>Proxy</code>, którego pułapki <em>get</em> i <em>set</em> uruchamiają śledzenie i powiadamianie. Nie jest tym samym obiektem co źródło: <code>reactive(obj) !== obj</code>.', en: 'The object returned by <code>reactive()</code> - a <code>Proxy</code> wrapper whose <em>get</em> and <em>set</em> traps drive tracking and notification. It is not the same object as the source: <code>reactive(obj) !== obj</code>.' }
        },
        {
          term: { pl: 'track i trigger', en: 'track and trigger' },
          def: { pl: 'Dwie połowy reaktywności: <code>track</code> zapisuje, że aktywny efekt przeczytał dany klucz, a <code>trigger</code> po zapisie unieważnia wszystkich subskrybentów tego klucza.', en: 'The two halves of reactivity: <code>track</code> records that the active effect read a key, and <code>trigger</code> invalidates every subscriber of that key after a write.' }
        },
        {
          term: { pl: 'targetMap', en: 'targetMap' },
          def: { pl: 'Globalna <code>WeakMap</code> obiekt → (klucz → zbiór zależności), czyli cały graf subskrypcji. <code>WeakMap</code> sprawia, że usunięty obiekt nie trzyma efektów przy życiu.', en: 'The global <code>WeakMap</code> of object → (key → dep set) that holds the whole subscription graph. Being a <code>WeakMap</code> means a dropped object does not keep effects alive.' }
        },
        {
          term: { pl: 'effectScope', en: 'effectScope' },
          def: { pl: 'Kontener właścicielski dla efektów: <code>scope.stop()</code> zatrzymuje wszystkie utworzone w nim <code>watch</code> i <code>computed</code>. Każdy komponent ma własny scope, a Pinia tworzy jeden na store.', en: 'An ownership container for effects: <code>scope.stop()</code> stops every <code>watch</code> and <code>computed</code> created inside it. Every component has one, and Pinia creates one per store.' }
        },
        {
          term: { pl: 'markRaw / toRaw', en: 'markRaw / toRaw' },
          def: { pl: 'Furtki wyjścia z reaktywności: <code>markRaw</code> trwale wyklucza obiekt z opakowywania w proxy, <code>toRaw</code> zwraca oryginał spod proxy. Potrzebne przy klasach z prywatnymi polami i wielkich payloadach.', en: 'The escape hatches: <code>markRaw</code> permanently opts an object out of proxying, <code>toRaw</code> returns the original behind a proxy. Needed for classes with private fields and for huge payloads.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="vm1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
          '<rect x="20" y="28" width="180" height="72" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="110" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
          '<text x="110" y="80" text-anchor="middle" font-size="13" fill="var(--muted)">activeEffect</text>' +
          '<line x1="200" y1="64" x2="248" y2="64" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm1a)"/>' +
          '<text x="224" y="46" text-anchor="middle" font-size="13" fill="var(--muted)">read</text>' +
          '<rect x="252" y="28" width="150" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="327" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Proxy get</text>' +
          '<text x="327" y="80" text-anchor="middle" font-size="13" fill="var(--muted)">track(obj, key)</text>' +
          '<line x1="402" y1="64" x2="450" y2="64" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm1a)"/>' +
          '<rect x="454" y="28" width="166" height="72" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="537" y="58" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
          '<text x="537" y="80" text-anchor="middle" font-size="13" fill="var(--muted)">key to dep set</text>' +
          '<rect x="150" y="150" width="340" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="178" text-anchor="middle" font-size="15" fill="var(--text)">state.count = state.count + 1</text>' +
          '<text x="320" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">Proxy set trap fires</text>' +
          '<line x1="537" y1="100" x2="537" y2="183" stroke="var(--accent2)" stroke-width="2"/>' +
          '<line x1="537" y1="183" x2="494" y2="183" stroke="var(--accent2)" stroke-width="2" marker-end="url(#vm1a)"/>' +
          '<line x1="320" y1="216" x2="320" y2="262" stroke="var(--warn)" stroke-width="2" marker-end="url(#vm1b)"/>' +
          '<text x="332" y="242" font-size="13" fill="var(--warn)">trigger()</text>' +
          '<rect x="120" y="266" width="400" height="66" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="294" text-anchor="middle" font-size="15" fill="var(--text)">Scheduler queue</text>' +
          '<text x="320" y="316" text-anchor="middle" font-size="13" fill="var(--muted)">deduped by job id, flushed on a microtask</text>' +
          '<path d="M 120 299 L 60 299 L 60 100" fill="none" stroke="var(--warn)" stroke-width="2" marker-end="url(#vm1b)"/>' +
          '<text x="320" y="370" text-anchor="middle" font-size="14" fill="var(--muted)">Reads subscribe. Writes notify. Nothing is diffed twice.</text>' +
          '</svg>',
        caption: {
          pl: 'Reaktywność Vue to pętla: odczyt przez Proxy zapisuje efekt w depsach, zapis wywołuje trigger, a scheduler zbiera zadania i uruchamia je raz na mikrotask.',
          en: 'Vue reactivity is a loop: a proxied read subscribes the active effect, a write triggers its deps, and the scheduler batches jobs into a single microtask flush.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden cykl track i trigger klatka po klatce: od pustych depsów, przez subskrypcję, po batchowany re-render.',
          en: 'One track-and-trigger cycle frame by frame: from empty deps through subscription to a batched re-render.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="20" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
              '<text x="105" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">idle</text>' +
              '<rect x="235" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Proxy</text>' +
              '<text x="320" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">count: 0</text>' +
              '<rect x="450" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="72" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
              '<text x="535" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">empty</text>' +
              '<rect x="120" y="200" width="400" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="15" fill="var(--text)">Scheduler queue</text>' +
              '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--muted)">0 jobs</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">Step 1: nothing has run yet</text>' +
              '</svg>',
            label: { pl: 'Stan zerowy', en: 'Cold start' },
            note: {
              pl: 'Proxy istnieje, ale nikt jeszcze nic nie odczytał, więc mapa zależności jest pusta.',
              en: 'The proxy exists but nobody has read anything yet, so the dependency map is empty.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vi1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<rect x="20" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
              '<text x="105" y="96" text-anchor="middle" font-size="13" fill="var(--accent)">activeEffect</text>' +
              '<rect x="235" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Proxy get</text>' +
              '<text x="320" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">count: 0</text>' +
              '<line x1="190" y1="80" x2="231" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#vi1a)"/>' +
              '<rect x="450" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="72" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
              '<text x="535" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">empty</text>' +
              '<rect x="120" y="200" width="400" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="15" fill="var(--text)">Scheduler queue</text>' +
              '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--muted)">0 jobs</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">Step 2: render reads state.count</text>' +
              '</svg>',
            label: { pl: 'Render czyta', en: 'Render reads' },
            note: {
              pl: 'Render startuje, ustawia siebie jako activeEffect i sięga po state.count - odczyt wpada w pułapkę get.',
              en: 'The render starts, sets itself as activeEffect and reads state.count, which lands in the get trap.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vi2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent2)"/></marker></defs>' +
              '<rect x="20" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
              '<text x="105" y="96" text-anchor="middle" font-size="13" fill="var(--accent)">subscribed</text>' +
              '<rect x="235" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">track()</text>' +
              '<text x="320" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">dep.add(effect)</text>' +
              '<line x1="405" y1="80" x2="446" y2="80" stroke="var(--accent2)" stroke-width="2" marker-end="url(#vi2a)"/>' +
              '<rect x="450" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="535" y="72" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
              '<text x="535" y="96" text-anchor="middle" font-size="13" fill="var(--accent2)">count: [render]</text>' +
              '<rect x="120" y="200" width="400" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="15" fill="var(--text)">Scheduler queue</text>' +
              '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--muted)">0 jobs</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">Step 3: dependency recorded</text>' +
              '</svg>',
            label: { pl: 'Zależność zapisana', en: 'Dependency recorded' },
            note: {
              pl: 'track() dopisuje efekt do depa dla klucza count. Powiązanie jest dwustronne, więc przy kolejnym renderze da się je posprzątać.',
              en: 'track() adds the effect to the dep for key count. The link is two-way, so stale deps can be cleaned up on the next run.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vi3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
              '<rect x="20" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
              '<text x="105" y="96" text-anchor="middle" font-size="13" fill="var(--warn)">notified</text>' +
              '<rect x="235" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Proxy set</text>' +
              '<text x="320" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">count: 1</text>' +
              '<rect x="450" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="535" y="72" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
              '<text x="535" y="96" text-anchor="middle" font-size="13" fill="var(--accent2)">count: [render]</text>' +
              '<line x1="450" y1="110" x2="410" y2="110" stroke="var(--warn)" stroke-width="2" marker-end="url(#vi3a)"/>' +
              '<line x1="320" y1="120" x2="320" y2="196" stroke="var(--warn)" stroke-width="2" marker-end="url(#vi3a)"/>' +
              '<text x="332" y="166" font-size="13" fill="var(--warn)">trigger()</text>' +
              '<rect x="120" y="200" width="400" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="15" fill="var(--text)">Scheduler queue</text>' +
              '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--muted)">1 job (render)</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">Step 4: write triggers the dep</text>' +
              '</svg>',
            label: { pl: 'Zapis i trigger', en: 'Write and trigger' },
            note: {
              pl: 'Zapis count = 1 uruchamia pułapkę set, trigger czyta depa i wrzuca render do kolejki - jeszcze nic się nie przerysowuje.',
              en: 'Writing count = 1 hits the set trap, trigger reads the dep and queues the render job. Nothing paints yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="20" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Render effect</text>' +
              '<text x="105" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">queued once</text>' +
              '<rect x="235" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Proxy</text>' +
              '<text x="320" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">count: 3</text>' +
              '<rect x="450" y="40" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="535" y="72" text-anchor="middle" font-size="15" fill="var(--text)">targetMap</text>' +
              '<text x="535" y="96" text-anchor="middle" font-size="13" fill="var(--accent2)">count: [render]</text>' +
              '<rect x="120" y="200" width="400" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="15" fill="var(--text)">Flush on microtask</text>' +
              '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--muted)">3 writes, 1 re-render</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">Step 5: batched update, deps re-collected</text>' +
              '</svg>',
            label: { pl: 'Batch i re-render', en: 'Batch and re-render' },
            note: {
              pl: 'Trzy zapisy w tym samym ticku dają jeden re-render. Podczas niego zależności są zbierane od nowa, a nieużywane odpinane.',
              en: 'Three writes in the same tick produce one re-render, during which deps are collected again and unused ones are dropped.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie bibliotekę z portierem przy każdej półce. Kiedy przychodzisz i pytasz o książkę "licznik", portier podaje ci ją, ale najpierw zapisuje w zeszycie: "ta osoba interesuje się licznikiem".</p>' +
            '<p>Później ktoś podmienia zawartość tej książki. Portier zagląda do zeszytu, widzi twoje nazwisko i dzwoni: "hej, licznik się zmienił, przyjdź przeczytać jeszcze raz".</p>' +
            '<p>Nikt nie chodzi po całej bibliotece i nie sprawdza wszystkich półek. Sprawdzane są tylko te książki, o które ktoś naprawdę pytał. Dlatego Vue jest szybkie: wie dokładnie, kto czym się interesuje.</p>' +
            '<p>I jeszcze jedna sztuczka: jeśli ktoś zmieni tę samą książkę trzy razy w ciągu minuty, portier nie dzwoni trzy razy. Czeka chwilę i dzwoni raz. Mniej telefonów, ta sama wiedza.</p>',
          en: '<p>Picture a library with a doorman standing at every shelf. When you ask for the book called "counter", he hands it over, but first he writes in his notebook: "this person cares about counter".</p>' +
            '<p>Later somebody swaps the contents of that book. The doorman checks his notebook, sees your name and calls you: "hey, counter changed, come and read it again".</p>' +
            '<p>Nobody walks the whole library checking every shelf. Only the books that somebody actually asked for are watched. That is why Vue is fast: it knows exactly who cares about what.</p>' +
            '<p>One more trick: if somebody changes that same book three times in a minute, the doorman does not call three times. He waits a moment and calls once. Fewer phone calls, same knowledge.</p>'
        },
        school: {
          pl: '<p>Reaktywność Vue 3 stoi na dwóch operacjach: <code>track</code> przy odczycie i <code>trigger</code> przy zapisie. <code>reactive(obj)</code> zwraca <strong>Proxy</strong> (obiekt pośredniczący) opakowujący twój obiekt. Pułapka <code>get</code> mówi "ktoś to czyta", pułapka <code>set</code> mówi "to się zmieniło".</p>' +
            '<p>Kto to "ktoś"? Aktualnie działający <em>efekt</em>. Efekt to funkcja, którą Vue umie uruchomić ponownie: render komponentu, <code>computed</code>, <code>watchEffect</code>. Przed uruchomieniem Vue ustawia globalny wskaźnik <code>activeEffect</code>, więc każdy odczyt w trakcie wie, komu się podpiąć.</p>' +
            '<p>Powiązania trzyma <code>targetMap</code>: WeakMap z obiektu na Mapę kluczy, a każdy klucz ma zbiór efektów.</p>' +
            '<pre><code>const state = reactive({ count: 0, name: \'Ada\' })\n\nwatchEffect(() =&gt; {\n  console.log(state.count)   // track: count -&gt; ten efekt\n})\n\nstate.name = \'Bo\'   // nic, nikt nie czytal name\nstate.count = 1     // trigger: efekt trafia do kolejki</code></pre>' +
            '<p>Trzy szczegóły, które zmieniają sposób pisania kodu. Po pierwsze, zależności są zbierane <strong>przy każdym uruchomieniu od nowa</strong>: jeśli warunek <code>v-if</code> przestaje czytać jakieś pole, efekt przestaje na nie reagować. Po drugie, śledzenie działa tylko na <em>ścieżkach faktycznie odczytanych</em> - dlatego destrukturyzacja obiektu reaktywnego zabiera reaktywność, bo odczyt dzieje się raz, poza efektem. Po trzecie, trigger nie renderuje od razu, tylko wrzuca zadanie do kolejki schedulera i uruchamia je na mikrotasku, więc dziesięć zmian w jednym handlerze daje jeden re-render.</p>' +
            '<p>To jest fundamentalna różnica względem React: tam re-render to konsekwencja wywołania settera i porównania drzewa, tutaj re-render to subskrypcja, która sama wie, kiedy jest nieaktualna.</p>',
          en: '<p>Vue 3 reactivity rests on two operations: <code>track</code> on read and <code>trigger</code> on write. <code>reactive(obj)</code> returns a <strong>Proxy</strong> wrapping your object. The <code>get</code> trap says "somebody is reading this", the <code>set</code> trap says "this changed".</p>' +
            '<p>Who is "somebody"? The currently running <em>effect</em>: a function Vue knows how to re-run, such as a component render, a <code>computed</code>, or a <code>watchEffect</code>. Before running it, Vue sets a global <code>activeEffect</code> pointer, so every read during that run knows what to subscribe.</p>' +
            '<p>The links live in <code>targetMap</code>: a WeakMap from object to a Map of keys, where each key holds a set of effects.</p>' +
            '<pre><code>const state = reactive({ count: 0, name: \'Ada\' })\n\nwatchEffect(() =&gt; {\n  console.log(state.count)   // track: count -&gt; this effect\n})\n\nstate.name = \'Bo\'   // nothing, nobody read name\nstate.count = 1     // trigger: the effect is queued</code></pre>' +
            '<p>Three details change how you write code. First, deps are re-collected <strong>on every run</strong>: if a <code>v-if</code> branch stops reading a field, the effect stops reacting to it. Second, tracking only covers <em>paths actually read</em>, which is why destructuring a reactive object drops reactivity - the read happens once, outside any effect. Third, trigger does not render immediately: it queues a scheduler job flushed on a microtask, so ten mutations in one handler produce one re-render.</p>' +
            '<p>This is the deep contrast with React: there a re-render is the consequence of calling a setter and diffing a tree, here a re-render is a subscription that knows on its own when it went stale.</p>'
        },
        pro: {
          pl: '<p>Warstwa <code>@vue/reactivity</code> jest niezależna od renderera i można jej używać osobno. Rdzeń to <code>ReactiveEffect</code> ze stosem aktywnych efektów, <code>targetMap</code> jako <code>WeakMap&lt;object, Map&lt;key, Dep&gt;&gt;</code> oraz scheduler.</p>' +
            '<h4>Co dokładnie jest śledzone</h4>' +
            '<ul>' +
            '<li>Odczyt właściwości - <code>track(target, TrackOpTypes.GET, key)</code>.</li>' +
            '<li>Iteracja i <code>Object.keys</code> - specjalny klucz <code>ITERATE_KEY</code>; dodanie lub usunięcie klucza triggeruje właśnie jego, zmiana istniejącej wartości nie.</li>' +
            '<li>Kolekcje - <code>Map</code> i <code>Set</code> mają własne handlery, z <code>MAP_KEY_ITERATE_KEY</code> dla <code>keys()</code>.</li>' +
            '<li>Tablice - metody mutujące są opakowane i na czas działania wyłączają śledzenie (<code>pauseTracking</code>), żeby nie robić nieskończonych pętli przez <code>length</code>.</li>' +
            '</ul>' +
            '<p>Od 3.4 depsy nie są zwykłymi Setami, tylko dwukierunkowymi listami <code>Link</code> z wersjami. Dzięki temu Vue robi <em>propagację leniwą</em>: trigger tylko podnosi wersję i oznacza subskrybentów jako brudnych, a realna ocena dzieje się przy odczycie. To właśnie pozwoliło computed przestać powiadamiać dalej, gdy przeliczona wartość okazała się identyczna.</p>' +
            '<pre><code>import { effect, reactive, stop } from \'@vue/reactivity\'\n\nconst s = reactive({ a: 1, b: 2 })\nconst runner = effect(() =&gt; s.a, {\n  scheduler: () =&gt; queueMicrotask(runner)\n})\ns.b = 99   // brak reakcji: b nigdy nie bylo czytane\nstop(runner)</code></pre>' +
            '<h4>Pułapki produkcyjne</h4>' +
            '<ul>' +
            '<li><strong>Tożsamość</strong>: <code>reactive(obj) !== obj</code>. Porównania po referencji w listach, <code>Set.has</code> czy <code>indexOf</code> na surowym obiekcie potrafią cicho zawieść. <code>toRaw</code> i <code>markRaw</code> to twoje wyjścia awaryjne.</li>' +
            '<li><strong>Głębokość</strong>: <code>reactive</code> jest rekurencyjne i tworzy Proxy leniwie przy odczycie zagnieżdżeń. Duże struktury z API (kilka tysięcy węzłów) opłaca się trzymać w <code>shallowRef</code> albo oznaczyć <code>markRaw</code>.</li>' +
            '<li><strong>Klasy i pola prywatne</strong>: <code>#field</code> rzuca przy dostępie przez Proxy, bo <code>this</code> nie jest instancją. Instancje klas z prywatnymi polami zawijaj w <code>markRaw</code>.</li>' +
            '<li><strong>Wycieki</strong>: efekty tworzone poza <code>setup</code> nie mają właściciela. Używaj <code>effectScope()</code> i <code>scope.stop()</code> - dokładnie tak robi to Pinia dla store.</li>' +
            '<li><strong>Kolejność</strong>: watcher <code>pre</code> działa przed renderem rodzica, render jest zadaniem po nim, <code>post</code> po patchu DOM. Zmiana stanu w efekcie <code>post</code> planuje kolejny cykl, a przekroczenie stu nawrotów daje ostrzeżenie o pętli.</li>' +
            '</ul>' +
            '<p>Na rozmowie warto umieć powiedzieć jednym zdaniem, czym to się różni od sygnałów w Solid czy Angular: model jest ten sam (drobnoziarniste subskrypcje), tylko jednostką inwalidacji w Vue jest komponent, a nie pojedynczy węzeł DOM - dopóki nie wejdzie Vapor Mode.</p>',
          en: '<p>The <code>@vue/reactivity</code> layer is renderer-agnostic and usable standalone. Its core is <code>ReactiveEffect</code> plus an active-effect stack, <code>targetMap</code> as <code>WeakMap&lt;object, Map&lt;key, Dep&gt;&gt;</code>, and the scheduler.</p>' +
            '<h4>What is actually tracked</h4>' +
            '<ul>' +
            '<li>Property reads via <code>track(target, TrackOpTypes.GET, key)</code>.</li>' +
            '<li>Iteration and <code>Object.keys</code> via a synthetic <code>ITERATE_KEY</code>: adding or deleting a key triggers it, mutating an existing value does not.</li>' +
            '<li>Collections: <code>Map</code> and <code>Set</code> get dedicated handlers, with <code>MAP_KEY_ITERATE_KEY</code> for <code>keys()</code>.</li>' +
            '<li>Arrays: mutating methods are instrumented and pause tracking while they run, otherwise <code>length</code> writes would loop forever.</li>' +
            '</ul>' +
            '<p>Since 3.4 deps are not plain Sets but doubly linked <code>Link</code> nodes with versions. That enables <em>lazy propagation</em>: trigger only bumps a version and marks subscribers dirty, while real evaluation happens on read. It is what let computed stop notifying downstream when a recomputation produced the same value.</p>' +
            '<pre><code>import { effect, reactive, stop } from \'@vue/reactivity\'\n\nconst s = reactive({ a: 1, b: 2 })\nconst runner = effect(() =&gt; s.a, {\n  scheduler: () =&gt; queueMicrotask(runner)\n})\ns.b = 99   // no reaction: b was never read\nstop(runner)</code></pre>' +
            '<h4>Production pitfalls</h4>' +
            '<ul>' +
            '<li><strong>Identity</strong>: <code>reactive(obj) !== obj</code>. Reference comparisons in lists, <code>Set.has</code> or <code>indexOf</code> against a raw object fail silently. <code>toRaw</code> and <code>markRaw</code> are the escape hatches.</li>' +
            '<li><strong>Depth</strong>: <code>reactive</code> is recursive and creates nested proxies lazily on read. Large API payloads (thousands of nodes) belong in <code>shallowRef</code> or behind <code>markRaw</code>.</li>' +
            '<li><strong>Classes with private fields</strong>: <code>#field</code> throws through a proxy because <code>this</code> is not the instance. Wrap such instances in <code>markRaw</code>.</li>' +
            '<li><strong>Leaks</strong>: effects created outside <code>setup</code> have no owner. Use <code>effectScope()</code> and <code>scope.stop()</code> - exactly what Pinia does per store.</li>' +
            '<li><strong>Ordering</strong>: <code>pre</code> watchers run before the parent render, the render is the next job, <code>post</code> runs after the DOM patch. Mutating state in a <code>post</code> effect schedules another cycle, and more than a hundred recursions logs an infinite-loop warning.</li>' +
            '</ul>' +
            '<p>In interviews, be able to place this next to Solid or Angular signals in one sentence: the model is the same fine-grained subscription graph, but Vue invalidates at component granularity rather than per DOM node - at least until Vapor Mode lands.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie zwraca wywołanie reactive({ count: 0 })?',
            en: 'What exactly does reactive({ count: 0 }) return?'
          },
          options: [
            { pl: 'Głęboką kopię obiektu z dodanymi getterami', en: 'A deep clone of the object with getters added' },
            { pl: 'Proxy opakowujące oryginalny obiekt', en: 'A Proxy wrapping the original object' },
            { pl: 'Ten sam obiekt, tylko z Object.defineProperty na każdym kluczu', en: 'The same object, with Object.defineProperty on every key' },
            { pl: 'Obiekt zamrożony przez Object.freeze', en: 'An object frozen with Object.freeze' }
          ],
          correct: 1,
          explain: {
            pl: 'Vue 3 używa Proxy, więc oryginał zostaje nietknięty, a pułapki get i set dodają track i trigger. defineProperty to mechanizm z Vue 2.',
            en: 'Vue 3 uses a Proxy, so the original object is untouched while get and set traps add track and trigger. defineProperty was the Vue 2 mechanism.'
          }
        },
        {
          q: {
            pl: 'Efekt czyta state.a tylko wtedy, gdy state.flag jest prawdziwe. Flaga zmienia się na false i efekt się przelicza. Co się dzieje z zależnością od state.a?',
            en: 'An effect reads state.a only when state.flag is true. The flag flips to false and the effect re-runs. What happens to the dependency on state.a?'
          },
          options: [
            { pl: 'Zostaje na zawsze, bo raz zapisana zależność jest trwała', en: 'It stays forever, because a recorded dependency is permanent' },
            { pl: 'Zostaje, ale trigger dla niej jest ignorowany przez scheduler', en: 'It stays, but the scheduler ignores triggers coming from it' },
            { pl: 'Zostaje odpięta, bo zależności są zbierane od nowa przy każdym uruchomieniu', en: 'It is dropped, because deps are re-collected on every run' },
            { pl: 'Zostaje odpięta dopiero po odmontowaniu komponentu', en: 'It is dropped only when the component unmounts' }
          ],
          correct: 2,
          explain: {
            pl: 'Każde uruchomienie efektu buduje świeży zestaw zależności, a stare powiązania są czyszczone. Dzięki temu gałęzie za v-if nie generują martwych subskrypcji.',
            en: 'Every effect run builds a fresh dependency set and stale links are cleaned up, so branches behind a v-if do not leave dead subscriptions behind.'
          }
        },
        {
          q: {
            pl: 'W jednym handlerze kliknięcia robisz pięć zapisów do state. Ile razy uruchomi się render komponentu?',
            en: 'A single click handler performs five writes to state. How many times does the component render run?'
          },
          options: [
            { pl: 'Raz - zadania są deduplikowane w kolejce i flushowane na mikrotasku', en: 'Once - jobs are deduped in the queue and flushed on a microtask' },
            { pl: 'Pięć razy, po jednym na zapis', en: 'Five times, once per write' },
            { pl: 'Dwa razy: pierwszy zapis synchronicznie, reszta zbiorczo', en: 'Twice: the first write synchronously, the rest batched' },
            { pl: 'Zależy od tego, czy zapisy dotyczą tego samego klucza', en: 'It depends on whether the writes touch the same key' }
          ],
          correct: 0,
          explain: {
            pl: 'Trigger wrzuca zadanie do kolejki po id i pomija duplikaty, więc synchroniczna seria zapisów kończy się jednym renderem. Dlatego DOM widzisz aktualny dopiero po await nextTick().',
            en: 'Trigger queues the job by id and skips duplicates, so a synchronous burst of writes ends in one render. That is why you need await nextTick() before reading the DOM.'
          }
        },
        {
          q: {
            pl: 'Wrzucasz do reactive() instancję klasy z prywatnym polem #id, a potem wołasz metodę, która to pole czyta. Co się stanie?',
            en: 'You pass a class instance with a private #id field to reactive() and then call a method that reads that field. What happens?'
          },
          options: [
            { pl: 'Pole będzie reaktywne jak każde inne', en: 'The field becomes reactive like any other' },
            { pl: 'Pole będzie działać, ale bez śledzenia zmian', en: 'The field works, just without change tracking' },
            { pl: 'Vue automatycznie zastosuje markRaw i wypisze ostrzeżenie', en: 'Vue applies markRaw automatically and logs a warning' },
            { pl: 'Poleci TypeError, bo this jest Proxy, a nie instancją klasy', en: 'A TypeError is thrown, because this is the proxy, not the class instance' }
          ],
          correct: 3,
          explain: {
            pl: 'Prywatne pola są przypięte do konkretnej instancji, a Proxy nią nie jest - dostęp rzuca TypeError. Takie obiekty owijaj w markRaw albo trzymaj w shallowRef.',
            en: 'Private fields are bound to the exact instance and a proxy is not that instance, so access throws a TypeError. Wrap such objects in markRaw or keep them in a shallowRef.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'ref-vs-reactive',
      title: {
        pl: 'ref kontra reactive',
        en: 'ref versus reactive'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'ref', en: 'ref' },
          def: { pl: 'Pudełko z jedną zależnością, czytane i zapisywane przez <code>.value</code>. Można podmienić całą zawartość naraz, więc jest domyślnym wyborem dla prymitywów i dla wszystkiego, co zwraca composable.', en: 'A single-dep box read and written through <code>.value</code>. The whole content can be replaced at once, which makes it the default for primitives and for anything a composable returns.' }
        },
        {
          term: { pl: 'reactive', en: 'reactive' },
          def: { pl: 'Głęboki proxy obiektu z zależnością <strong>na klucz</strong>. Nie da się podmienić całego obiektu, a destrukturyzacja zrywa reaktywność - stąd <code>toRefs()</code>.', en: 'A deep object proxy with a dep <strong>per key</strong>. You cannot replace the whole object and destructuring breaks reactivity - hence <code>toRefs()</code>.' }
        },
        {
          term: { pl: 'shallowRef', en: 'shallowRef' },
          def: { pl: 'Ref, który śledzi wyłącznie podmianę <code>.value</code>, nie opakowując zawartości w proxy. Właściwy wybór dla dużych payloadów API i instancji bibliotek (wykresy, mapy, edytory).', en: 'A ref that tracks only <code>.value</code> replacement and never proxies the content. The right choice for large API payloads and library instances (charts, maps, editors).' }
        },
        {
          term: { pl: 'toRefs', en: 'toRefs' },
          def: { pl: 'Zamienia obiekt <code>reactive</code> na zwykły obiekt refów, dzięki czemu destrukturyzacja zachowuje reaktywność. Standard przy propsach i przy zwracaniu stanu z composable.', en: 'Converts a <code>reactive</code> object into a plain object of refs so destructuring keeps reactivity. Standard for props and for returning state from a composable.' }
        },
        {
          term: { pl: 'toValue / MaybeRefOrGetter', en: 'toValue / MaybeRefOrGetter' },
          def: { pl: 'Kontrakt wejściowy composable: przyjmij ref, getter albo zwykłą wartość, a w środku rozpakuj przez <code>toValue()</code>. Dzięki temu jedna funkcja obsługuje wszystkie trzy formy.', en: 'The standard composable input contract: accept a ref, a getter or a plain value and unwrap it with <code>toValue()</code>, so one function handles all three shapes.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="24" width="280" height="150" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="160" y="52" text-anchor="middle" font-size="16" fill="var(--text)">ref(value)</text>' +
          '<text x="160" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">RefImpl object with one dep</text>' +
          '<text x="160" y="102" text-anchor="middle" font-size="13" fill="var(--muted)">tracks on .value get</text>' +
          '<text x="160" y="126" text-anchor="middle" font-size="13" fill="var(--muted)">any type, replaceable</text>' +
          '<text x="160" y="152" text-anchor="middle" font-size="13" fill="var(--ok)">survives passing around</text>' +
          '<rect x="340" y="24" width="280" height="150" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="480" y="52" text-anchor="middle" font-size="16" fill="var(--text)">reactive(object)</text>' +
          '<text x="480" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">Proxy, one dep per key</text>' +
          '<text x="480" y="102" text-anchor="middle" font-size="13" fill="var(--muted)">tracks on property get</text>' +
          '<text x="480" y="126" text-anchor="middle" font-size="13" fill="var(--muted)">objects only, not replaceable</text>' +
          '<text x="480" y="152" text-anchor="middle" font-size="13" fill="var(--err)">breaks on destructuring</text>' +
          '<line x1="160" y1="174" x2="160" y2="216" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm2a)"/>' +
          '<line x1="480" y1="174" x2="480" y2="216" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm2a)"/>' +
          '<rect x="60" y="220" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="248" text-anchor="middle" font-size="14" fill="var(--text)">const n = count.value</text>' +
          '<text x="160" y="272" text-anchor="middle" font-size="13" fill="var(--ok)">still reactive via ref</text>' +
          '<rect x="380" y="220" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="248" text-anchor="middle" font-size="14" fill="var(--text)">const { n } = state</text>' +
          '<text x="480" y="272" text-anchor="middle" font-size="13" fill="var(--err)">plain value, link lost</text>' +
          '<rect x="140" y="318" width="360" height="58" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="344" text-anchor="middle" font-size="14" fill="var(--text)">toRefs / toRef rebuild the link</text>' +
          '<text x="320" y="366" text-anchor="middle" font-size="13" fill="var(--muted)">one ref per key, tracking preserved</text>' +
          '</svg>',
        caption: {
          pl: 'ref pakuje wartość w obiekt z jednym depem, reactive tworzy Proxy z depem na każdy klucz. Stąd bierze się cała różnica w tym, co przetrwa destrukturyzację.',
          en: 'A ref boxes a value into an object with a single dep, reactive builds a proxy with a dep per key. That is the root of every difference around destructuring.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dwa sposoby dawania komuś numeru telefonu. Pierwszy: piszesz numer na kartce i wręczasz. Drugi: dajesz wizytówkę, na której jest napisane "aktualny numer znajdziesz zawsze tutaj".</p>' +
            '<p>Kartka to zwykła wartość. Jeśli zmienisz numer, ktoś z kartką dalej ma stary. Wizytówka to <em>ref</em>: możesz zmieniać, co jest w środku, a każdy, kto ją ma, zawsze zobaczy nowe.</p>' +
            '<p>Jest jeszcze trzecia opcja: cała książka adresowa, w której każda strona sama się aktualizuje. To <em>reactive</em>. Świetnie działa, dopóki trzymasz książkę w całości. Ale gdy wyrwiesz z niej jedną stronę i podasz komuś, ta strona przestaje się aktualizować - to zwykła kartka.</p>' +
            '<p>Dlatego w Vue tak często widzisz <code>.value</code>. To po prostu zaglądanie do wizytówki zamiast trzymania kartki.</p>',
          en: '<p>Picture two ways of giving somebody a phone number. One: you write the number on a scrap of paper and hand it over. Two: you hand over a business card that says "the current number always lives here".</p>' +
            '<p>The scrap of paper is a plain value. Change the number and whoever holds the paper still has the old one. The business card is a <em>ref</em>: you can change what is inside, and everyone holding the card always sees the new value.</p>' +
            '<p>There is a third option: a whole address book where every page updates itself. That is <em>reactive</em>. It works beautifully as long as you keep the book whole. Tear one page out and hand it to somebody, and that page stops updating - it is just paper again.</p>' +
            '<p>That is why you see <code>.value</code> everywhere in Vue. It is simply looking at the card instead of holding the paper.</p>'
        },
        school: {
          pl: '<p><code>ref(x)</code> tworzy obiekt <code>RefImpl</code> z getterem i setterem na <code>.value</code>. Śledzenie odbywa się na jednym depie przypiętym do tego obiektu. Jeśli <code>x</code> jest obiektem, ref w środku i tak przepuszcza go przez <code>reactive</code>, więc dostajesz głęboką reaktywność.</p>' +
            '<p><code>reactive(obj)</code> zwraca Proxy z osobnym depem na każdy klucz. Nie da się go "podmienić w całości": przypisanie do zmiennej trzymającej Proxy niczego nie triggeruje, bo zmienna to nie stan.</p>' +
            '<pre><code>const count = ref(0)\nconst state = reactive({ count: 0 })\n\ncount.value++          // działa\nstate.count++          // działa\n\nlet { count: c } = state   // c to zwykła liczba, koniec reaktywności\nconst { count: r } = toRefs(state)  // r to ref, reaktywność zostaje</code></pre>' +
            '<p>W praktyce najprostsza reguła brzmi: <strong>domyślnie ref, reactive tylko wtedy, gdy naprawdę chcesz zgrupowany, nigdy niepodmieniany obiekt</strong>. Ref jest jednolity - działa dla liczby, stringa, tablicy, mapy i odpowiedzi z API. Jedna konwencja to mniej myślenia w code review.</p>' +
            '<p>W szablonie <code>.value</code> znika, bo kompilator robi automatyczne rozpakowywanie refów na najwyższym poziomie zakresu setup. Uwaga: to rozpakowywanie dotyczy tylko wierzchu. Ref schowany w zwykłym obiekcie (<code>obj.myRef</code>) w szablonie zostanie refem i musisz napisać <code>obj.myRef.value</code>. Ten sam ref umieszczony w obiekcie <code>reactive</code> zostanie rozpakowany - ale już nie w tablicy ani w <code>Map</code>.</p>' +
            '<p>Dla biblioteki komponentów ma to bardzo konkretne znaczenie: publiczne API composables zwracaj jako refy albo obiekt refów, nigdy jako gołe wartości wyciągnięte z Proxy.</p>',
          en: '<p><code>ref(x)</code> creates a <code>RefImpl</code> object with a getter and setter on <code>.value</code>. Tracking happens on one dep attached to that object. If <code>x</code> is an object, the ref pipes it through <code>reactive</code> internally, so you still get deep reactivity.</p>' +
            '<p><code>reactive(obj)</code> returns a proxy with a separate dep per key. It cannot be replaced wholesale: assigning to the variable holding the proxy triggers nothing, because the variable is not the state.</p>' +
            '<pre><code>const count = ref(0)\nconst state = reactive({ count: 0 })\n\ncount.value++          // works\nstate.count++          // works\n\nlet { count: c } = state            // c is a plain number, reactivity gone\nconst { count: r } = toRefs(state)  // r is a ref, reactivity preserved</code></pre>' +
            '<p>The practical rule is short: <strong>default to ref, reach for reactive only when you genuinely want a grouped object that is never replaced</strong>. Refs are uniform - a number, a string, an array, a Map and an API response all look the same. One convention means less thinking in code review.</p>' +
            '<p>In templates the <code>.value</code> disappears because the compiler unwraps top-level refs from the setup scope. Note the word top-level: a ref hidden inside a plain object (<code>obj.myRef</code>) stays a ref in the template and needs <code>obj.myRef.value</code>. The same ref placed inside a <code>reactive</code> object is unwrapped - but not inside an array or a <code>Map</code>.</p>' +
            '<p>For a component library this matters concretely: expose composable APIs as refs or an object of refs, never as bare values pulled out of a proxy.</p>'
        },
        pro: {
          pl: '<p>Wybór między ref a reactive rzadko jest kwestią gustu - decyduje o kształcie API twoich composables i o tym, ile pułapek zostawiasz konsumentom design systemu.</p>' +
            '<h4>Mechanika, która wyjaśnia wszystkie reguły</h4>' +
            '<ul>' +
            '<li>Ref to <em>jeden dep na pudełko</em>. Podmiana <code>.value</code> na nowy obiekt jest legalna i triggeruje wszystko, co czyta ten ref. Idealne do odpowiedzi z fetcha.</li>' +
            '<li>Reactive to <em>dep na klucz</em>. Nie ma czegoś takiego jak "trigger całego obiektu" poza dodaniem lub usunięciem klucza (przez <code>ITERATE_KEY</code>).</li>' +
            '<li><code>toRef(obj, key)</code> tworzy <code>ObjectRefImpl</code>, czyli ref, który przy każdym odczycie sięga do źródła - dlatego działa też dla kluczy jeszcze nieistniejących.</li>' +
            '<li><code>isRef</code>, <code>unref</code> i typ <code>MaybeRefOrGetter</code> plus <code>toValue()</code> to standardowy kontrakt wejścia dla composables od 3.3.</li>' +
            '</ul>' +
            '<pre><code>// odporne API composable: przyjmij ref, getter albo wartość\nimport { toValue, watchEffect, shallowRef } from \'vue\'\n\nexport function useResource(source) {\n  const data = shallowRef(null)\n  watchEffect(async (onCleanup) =&gt; {\n    const id = toValue(source)\n    const ac = new AbortController()\n    onCleanup(() =&gt; ac.abort())\n    data.value = await fetchIt(id, ac.signal)\n  })\n  return { data }\n}</code></pre>' +
            '<h4>Kiedy który wariant</h4>' +
            '<ul>' +
            '<li><strong>ref</strong> - wartość domyślna, prymitywy, wszystko co jest podmieniane w całości, wszystko co wychodzi z composable.</li>' +
            '<li><strong>shallowRef</strong> - duże, niemutowane struktury: odpowiedzi API, wyniki parsowania, instancje bibliotek (chart, mapa, edytor). Oszczędza tworzenie tysięcy Proxy i realnie skraca czas montowania.</li>' +
            '<li><strong>reactive</strong> - lokalny, spójny worek stanu o stałym kształcie, na przykład stan formularza czy obiekt UI wewnątrz jednego komponentu.</li>' +
            '<li><strong>shallowReactive</strong> - rzadko, głównie gdy chcesz reaktywności tylko na pierwszym poziomie w kontenerze wysokiej częstotliwości.</li>' +
            '</ul>' +
            '<h4>Rzeczy, które boleśnie wychodzą w produkcji</h4>' +
            '<ul>' +
            '<li>Ref wewnątrz tablicy nie jest rozpakowywany - <code>list.value[0].value</code> zaskakuje w każdym code review.</li>' +
            '<li><code>reactive([])</code> plus <code>arr = [...]</code> to klasyczna cicha regresja; użyj <code>ref([])</code> albo <code>arr.splice(0, arr.length, ...next)</code>.</li>' +
            '<li>Props destrukturyzowane w <code>&lt;script setup&gt;</code> tracą reaktywność - dopiero 3.5 dodał reaktywną destrukturyzację propsów opartą na kompilatorze. Do tego czasu <code>toRefs(props)</code>.</li>' +
            '<li><code>watch(() =&gt; state, cb)</code> na obiekcie reactive milczy przy mutacjach pól bez <code>deep</code>, ale <code>watch(state, cb)</code> jest automatycznie głęboki - ta asymetria to najczęstsze pytanie na rozmowie o watcherach.</li>' +
            '<li>Wydajność: mikrobenchmarki pokazują, że dostęp przez Proxy kosztuje kilka razy więcej niż odczyt zwykłego pola. Przy setkach tysięcy odczytów na klatkę (wirtualizowane tabele, canvas) opłaca się <code>toRaw</code> w gorącej pętli.</li>' +
            '</ul>',
          en: '<p>Choosing between ref and reactive is rarely taste - it decides the shape of your composable APIs and how many traps you leave for design-system consumers.</p>' +
            '<h4>The mechanics behind every rule</h4>' +
            '<ul>' +
            '<li>A ref is <em>one dep per box</em>. Replacing <code>.value</code> with a whole new object is legal and triggers everyone reading that ref. Perfect for fetch responses.</li>' +
            '<li>Reactive is <em>a dep per key</em>. There is no such thing as triggering the whole object, apart from adding or deleting a key through <code>ITERATE_KEY</code>.</li>' +
            '<li><code>toRef(obj, key)</code> creates an <code>ObjectRefImpl</code>, a ref that re-reads the source on every access, which is why it also works for keys that do not exist yet.</li>' +
            '<li><code>isRef</code>, <code>unref</code>, and the <code>MaybeRefOrGetter</code> type with <code>toValue()</code> are the standard composable input contract since 3.3.</li>' +
            '</ul>' +
            '<pre><code>// resilient composable API: accept a ref, a getter or a raw value\nimport { toValue, watchEffect, shallowRef } from \'vue\'\n\nexport function useResource(source) {\n  const data = shallowRef(null)\n  watchEffect(async (onCleanup) =&gt; {\n    const id = toValue(source)\n    const ac = new AbortController()\n    onCleanup(() =&gt; ac.abort())\n    data.value = await fetchIt(id, ac.signal)\n  })\n  return { data }\n}</code></pre>' +
            '<h4>Which one, when</h4>' +
            '<ul>' +
            '<li><strong>ref</strong> - the default: primitives, anything replaced wholesale, anything a composable returns.</li>' +
            '<li><strong>shallowRef</strong> - large immutable structures: API payloads, parse results, library instances (charts, maps, editors). It avoids creating thousands of proxies and measurably cuts mount time.</li>' +
            '<li><strong>reactive</strong> - a local, cohesive bag of state with a fixed shape, such as form state inside one component.</li>' +
            '<li><strong>shallowReactive</strong> - rare, mostly when you want first-level reactivity only in a high-frequency container.</li>' +
            '</ul>' +
            '<h4>What actually bites in production</h4>' +
            '<ul>' +
            '<li>Refs inside arrays are not unwrapped - <code>list.value[0].value</code> surprises someone in every review.</li>' +
            '<li><code>reactive([])</code> followed by <code>arr = [...]</code> is a classic silent regression; use <code>ref([])</code> or <code>arr.splice(0, arr.length, ...next)</code>.</li>' +
            '<li>Props destructured in <code>&lt;script setup&gt;</code> lose reactivity - compiler-based reactive props destructure only became stable in 3.5. Before that, <code>toRefs(props)</code>.</li>' +
            '<li><code>watch(() =&gt; state, cb)</code> on a reactive object stays silent on field mutations without <code>deep</code>, while <code>watch(state, cb)</code> is implicitly deep. That asymmetry is the most common watcher interview question.</li>' +
            '<li>Performance: microbenchmarks put proxied property access several times slower than a plain read. At hundreds of thousands of reads per frame (virtualized tables, canvas) it pays to <code>toRaw</code> inside the hot loop.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego const { count } = reactive({ count: 0 }) psuje reaktywność?',
            en: 'Why does const { count } = reactive({ count: 0 }) break reactivity?'
          },
          options: [
            { pl: 'Bo destrukturyzacja tworzy kopię Proxy bez pułapek', en: 'Because destructuring clones the proxy without its traps' },
            { pl: 'Bo odczyt dzieje się raz i zapisuje zwykłą wartość, tracąc powiązanie z depem klucza', en: 'Because the read happens once and stores a plain value, losing the link to the key dep' },
            { pl: 'Bo reactive obsługuje tylko klucze typu string', en: 'Because reactive only supports string keys' },
            { pl: 'Bo Vue nie śledzi kluczy odczytanych poza szablonem', en: 'Because Vue does not track keys read outside a template' }
          ],
          correct: 1,
          explain: {
            pl: 'Proxy śledzi odczyty, a nie zmienne. Po destrukturyzacji masz snapshot wartości. toRefs pakuje każdy klucz w ref, który przy każdym użyciu wraca do źródła.',
            en: 'A proxy tracks reads, not variables. After destructuring you hold a snapshot. toRefs boxes each key in a ref that goes back to the source on every access.'
          }
        },
        {
          q: {
            pl: 'Trzymasz w stanie odpowiedź z API: tablicę 5000 obiektów renderowaną w wirtualizowanej tabeli i nigdy nie mutowaną punktowo. Co jest najlepsze?',
            en: 'You hold an API response in state: an array of 5000 objects rendered in a virtualized table and never mutated in place. What is the best fit?'
          },
          options: [
            { pl: 'reactive(rows) dla głębokiej reaktywności', en: 'reactive(rows) for deep reactivity' },
            { pl: 'ref(rows), bo ref zawsze jest tańszy niż reactive', en: 'ref(rows), because a ref is always cheaper than reactive' },
            { pl: 'shallowRef(rows) i podmiana całej tablicy przy każdym odświeżeniu', en: 'shallowRef(rows), replacing the whole array on each refresh' },
            { pl: 'readonly(reactive(rows)), żeby wymusić niezmienność', en: 'readonly(reactive(rows)) to enforce immutability' }
          ],
          correct: 2,
          explain: {
            pl: 'shallowRef nie tworzy Proxy dla żadnego wiersza, a podmiana .value i tak triggeruje render. Zwykły ref na tablicy obiektów zrobi z niej reactive w środku, więc koszt wraca.',
            en: 'shallowRef creates no proxies for the rows, and replacing .value still triggers the render. A plain ref would run the array through reactive internally, bringing the cost back.'
          }
        },
        {
          q: {
            pl: 'Który ref NIE zostanie automatycznie rozpakowany?',
            en: 'Which ref is NOT unwrapped automatically?'
          },
          options: [
            { pl: 'Ref na najwyższym poziomie script setup, użyty w szablonie', en: 'A top-level ref in script setup, used in the template' },
            { pl: 'Ref umieszczony jako właściwość obiektu reactive', en: 'A ref placed as a property of a reactive object' },
            { pl: 'Ref przekazany do computed przez getter', en: 'A ref read through a computed getter' },
            { pl: 'Ref umieszczony jako element tablicy reaktywnej', en: 'A ref stored as an element of a reactive array' }
          ],
          correct: 3,
          explain: {
            pl: 'Rozpakowywanie działa dla wierzchu zakresu setup i dla właściwości obiektów reactive, ale nie dla elementów tablic ani wartości w Map i Set - tam zostaje .value.',
            en: 'Unwrapping applies to the top-level setup scope and to reactive object properties, but not to array elements or Map and Set values, where .value stays.'
          }
        },
        {
          q: {
            pl: 'Composable ma przyjmować id zarówno jako liczbę, jak i jako ref albo getter. Jaki jest idiomatyczny kontrakt w Vue 3.3+?',
            en: 'A composable should accept an id as a number, a ref or a getter. What is the idiomatic Vue 3.3+ contract?'
          },
          options: [
            { pl: 'Typ MaybeRefOrGetter i odczyt przez toValue() wewnątrz efektu', en: 'A MaybeRefOrGetter type read through toValue() inside the effect' },
            { pl: 'Zawsze wymagać refa i rzucać błąd dla wartości surowej', en: 'Always require a ref and throw on a raw value' },
            { pl: 'Owinąć argument w reactive() i czytać przez klucz', en: 'Wrap the argument in reactive() and read it by key' },
            { pl: 'Sprawdzić typeof i zrobić dwie osobne ścieżki kodu', en: 'Check typeof and maintain two separate code paths' }
          ],
          correct: 0,
          explain: {
            pl: 'toValue() normalizuje wartość, ref i getter w jednym miejscu, a odczyt wewnątrz efektu zapewnia poprawne śledzenie. To dziś standard w VueUse i w kodzie rdzenia.',
            en: 'toValue() normalizes value, ref and getter in one place, and reading it inside the effect keeps tracking correct. It is the standard in VueUse and in core code today.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'computed-in-depth',
      title: {
        pl: 'computed od podszewki',
        en: 'computed in depth'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'computed', en: 'computed' },
          def: { pl: 'Leniwy, cache-owany ref wyliczany z innych zależności. Getter uruchamia się dopiero przy odczycie i tylko wtedy, gdy któreś ze źródeł faktycznie się zmieniło.', en: 'A lazy, cached ref derived from other dependencies. The getter runs on read and only when a source has actually changed.' }
        },
        {
          term: { pl: 'Leniwa weryfikacja (dirty levels)', en: 'Lazy verification (dirty levels)' },
          def: { pl: 'Od Vue 3.4 zamiast jednej flagi <code>_dirty</code> są poziomy: <em>na pewno brudny</em> i <em>może brudny</em>. Przed przeliczeniem Vue porównuje wersje źródeł i potrafi zostawić cache nietknięty.', en: 'Since Vue 3.4 a single <code>_dirty</code> flag was replaced by levels: <em>definitely dirty</em> and <em>maybe dirty</em>. Before recomputing, Vue compares source versions and may keep the cache.' }
        },
        {
          term: { pl: 'Zapisywalny computed', en: 'Writable computed' },
          def: { pl: '<code>computed({ get, set })</code> - adapter, który czyta z jednego źródła i zapisuje do innego. Klasyczne opakowanie propa pod <code>v-model</code>, dziś zwykle zastąpione przez <code>defineModel()</code>.', en: '<code>computed({ get, set })</code> - an adapter reading from one source and writing to another. The classic prop wrapper for <code>v-model</code>, today usually replaced by <code>defineModel()</code>.' }
        },
        {
          term: { pl: 'Skrót przy tej samej wartości', en: 'Same-value short-circuit' },
          def: { pl: 'Vue porównuje wynik przez <code>Object.is</code> i nie powiadamia dalej, gdy się nie zmienił. Getter zwracający za każdym razem nowy obiekt lub tablicę nigdy w to nie trafi.', en: 'Vue compares the result with <code>Object.is</code> and stops propagating when it did not change. A getter returning a fresh object or array every time can never hit it.' }
        },
        {
          term: { pl: 'onTrack / onTrigger', en: 'onTrack / onTrigger' },
          def: { pl: 'Haki debugujące (tylko w trybie dev) w drugim argumencie <code>computed</code> i <code>watch</code>: pokazują, która zależność została zebrana i co unieważniło wynik.', en: 'Dev-only debug hooks in the second argument of <code>computed</code> and <code>watch</code>: they show which dependency was collected and what invalidated the result.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="vm3b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
          '<rect x="20" y="40" width="150" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="95" y="70" text-anchor="middle" font-size="15" fill="var(--text)">source refs</text>' +
          '<text x="95" y="94" text-anchor="middle" font-size="13" fill="var(--muted)">version bumps</text>' +
          '<line x1="170" y1="80" x2="222" y2="80" stroke="var(--warn)" stroke-width="2" marker-end="url(#vm3b)"/>' +
          '<text x="196" y="62" text-anchor="middle" font-size="13" fill="var(--warn)">mark</text>' +
          '<rect x="226" y="26" width="190" height="108" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="321" y="54" text-anchor="middle" font-size="15" fill="var(--text)">ComputedRefImpl</text>' +
          '<text x="321" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">cached value</text>' +
          '<text x="321" y="100" text-anchor="middle" font-size="13" fill="var(--warn)">dirty flag</text>' +
          '<text x="321" y="122" text-anchor="middle" font-size="13" fill="var(--muted)">own dep set</text>' +
          '<line x1="416" y1="80" x2="468" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm3a)"/>' +
          '<text x="442" y="62" text-anchor="middle" font-size="13" fill="var(--muted)">read</text>' +
          '<rect x="472" y="40" width="148" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="546" y="70" text-anchor="middle" font-size="15" fill="var(--text)">consumer</text>' +
          '<text x="546" y="94" text-anchor="middle" font-size="13" fill="var(--muted)">render or watcher</text>' +
          '<rect x="90" y="180" width="460" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="208" text-anchor="middle" font-size="15" fill="var(--text)">Pull, not push</text>' +
          '<text x="320" y="230" text-anchor="middle" font-size="13" fill="var(--muted)">a write only marks dirty; the getter runs on the next read</text>' +
          '<rect x="90" y="270" width="220" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="200" y="298" text-anchor="middle" font-size="14" fill="var(--text)">same value out</text>' +
          '<text x="200" y="320" text-anchor="middle" font-size="13" fill="var(--ok)">downstream not notified</text>' +
          '<rect x="330" y="270" width="220" height="66" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="440" y="298" text-anchor="middle" font-size="14" fill="var(--text)">side effects inside</text>' +
          '<text x="440" y="320" text-anchor="middle" font-size="13" fill="var(--err)">run at unpredictable times</text>' +
          '<text x="320" y="372" text-anchor="middle" font-size="14" fill="var(--muted)">computed = ref + memo + dependency graph</text>' +
          '</svg>',
        caption: {
          pl: 'computed to leniwy ref z pamięcią podręczną: zapis do źródła tylko oznacza go jako brudny, a getter uruchamia się dopiero przy odczycie.',
          en: 'A computed is a lazy cached ref: a source write only marks it dirty, and the getter runs on the next read.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Łańcuch computed krok po kroku: leniwe oznaczanie brudnych, przeliczanie na żądanie i ucięcie propagacji, gdy wynik się nie zmienił.',
          en: 'A computed chain step by step: lazy dirty marking, recompute on demand, and propagation cut short when the result did not change.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">2</text>' +
              '<line x1="150" y1="100" x2="186" y2="100" stroke="var(--border)" stroke-width="2" marker-end="url(#vc0)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">true</text>' +
              '<line x1="320" y1="100" x2="356" y2="100" stroke="var(--border)" stroke-width="2" marker-end="url(#vc0)"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">on</text>' +
              '<line x1="490" y1="100" x2="496" y2="100" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--muted)">idle</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">clean, cached</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">clean, cached</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 1: everything settled</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">both getters already ran once, values are cached</text>' +
              '</svg>',
            label: { pl: 'Stan spoczynku', en: 'Settled state' },
            note: {
              pl: 'Oba computed mają policzone i zapamiętane wartości. Kolejne odczyty nie uruchamiają getterów.',
              en: 'Both computeds hold cached values. Further reads do not run their getters at all.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--warn)">0</text>' +
              '<line x1="150" y1="100" x2="186" y2="100" stroke="var(--warn)" stroke-width="2" marker-end="url(#vc1)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">true (stale)</text>' +
              '<line x1="320" y1="100" x2="356" y2="100" stroke="var(--warn)" stroke-width="2" marker-end="url(#vc1)"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">on (stale)</text>' +
              '<line x1="490" y1="100" x2="496" y2="100" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--warn)">queued</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--warn)">dirty</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--warn)">dirty</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 2: count = 0</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">flags flip, zero getters have run so far</text>' +
              '</svg>',
            label: { pl: 'Oznaczenie brudnych', en: 'Marked dirty' },
            note: {
              pl: 'Zapis nie liczy niczego. Vue tylko podnosi wersję źródła i oznacza zależne computed jako brudne, a render trafia do kolejki.',
              en: 'The write computes nothing. Vue just bumps the source version, marks dependent computeds dirty and queues the render.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">0</text>' +
              '<line x1="186" y1="100" x2="150" y2="100" stroke="var(--accent)" stroke-width="2" marker-end="url(#vc2)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--accent)">recomputing</text>' +
              '<line x1="356" y1="100" x2="320" y2="100" stroke="var(--accent)" stroke-width="2" marker-end="url(#vc2)"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--accent)">pulling</text>' +
              '<line x1="496" y1="100" x2="490" y2="100" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--accent)">running</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--accent)">getter runs</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--accent)">waits for source</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 3: the render pulls</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">reading label walks the chain backwards to the source</text>' +
              '</svg>',
            label: { pl: 'Odczyt ciągnie łańcuch', en: 'The read pulls the chain' },
            note: {
              pl: 'Render czyta label, ten sprawdza, czy jego źródła są aktualne, i dopiero to zmusza isPositive do przeliczenia.',
              en: 'The render reads label, label checks whether its sources are current, and only that forces isPositive to recompute.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">0</text>' +
              '<line x1="150" y1="100" x2="186" y2="100" stroke="var(--ok)" stroke-width="2" marker-end="url(#vc3)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--ok)">false</text>' +
              '<line x1="320" y1="100" x2="356" y2="100" stroke="var(--ok)" stroke-width="2" marker-end="url(#vc3)"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--ok)">off</text>' +
              '<line x1="490" y1="100" x2="496" y2="100" stroke="var(--ok)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--ok)">patched</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">clean, new version</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">clean, cached</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 4: one recompute per computed</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">values cached again, DOM patched once</text>' +
              '</svg>',
            label: { pl: 'Przeliczone i zapamiętane', en: 'Recomputed and cached' },
            note: {
              pl: 'Każdy getter poszedł dokładnie raz, niezależnie od tego, ile miejsc w szablonie czyta label.',
              en: 'Each getter ran exactly once, no matter how many places in the template read label.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--warn)">-3</text>' +
              '<line x1="150" y1="100" x2="186" y2="100" stroke="var(--warn)" stroke-width="2" marker-end="url(#vc4)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">false (stale?)</text>' +
              '<line x1="320" y1="100" x2="356" y2="100" stroke="var(--warn)" stroke-width="2" marker-end="url(#vc4)"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">off (stale?)</text>' +
              '<line x1="490" y1="100" x2="496" y2="100" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--warn)">queued</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--warn)">dirty</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--warn)">dirty</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 5: count = -3</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">source changed again, chain marked dirty again</text>' +
              '</svg>',
            label: { pl: 'Kolejna zmiana źródła', en: 'Source changes again' },
            note: {
              pl: 'Wartość źródła jest inna, więc łańcuch znowu robi się brudny - ale nikt jeszcze nie wie, czy wynik faktycznie się zmieni.',
              en: 'The source value differs, so the chain goes dirty again - but nobody knows yet whether the result will actually change.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="vc5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<rect x="20" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="85" y="90" text-anchor="middle" font-size="15" fill="var(--text)">count</text>' +
              '<text x="85" y="114" text-anchor="middle" font-size="14" fill="var(--muted)">-3</text>' +
              '<line x1="150" y1="100" x2="186" y2="100" stroke="var(--ok)" stroke-width="2" marker-end="url(#vc5)"/>' +
              '<rect x="190" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="255" y="90" text-anchor="middle" font-size="15" fill="var(--text)">isPositive</text>' +
              '<text x="255" y="114" text-anchor="middle" font-size="14" fill="var(--ok)">false again</text>' +
              '<line x1="320" y1="100" x2="356" y2="100" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="360" y="60" width="130" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="425" y="90" text-anchor="middle" font-size="15" fill="var(--text)">label</text>' +
              '<text x="425" y="114" text-anchor="middle" font-size="14" fill="var(--ok)">off (kept)</text>' +
              '<line x1="490" y1="100" x2="496" y2="100" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="500" y="60" width="120" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="560" y="90" text-anchor="middle" font-size="15" fill="var(--text)">render</text>' +
              '<text x="560" y="114" text-anchor="middle" font-size="13" fill="var(--ok)">skipped</text>' +
              '<text x="255" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">value unchanged</text>' +
              '<text x="425" y="170" text-anchor="middle" font-size="13" fill="var(--ok)">getter never ran</text>' +
              '<rect x="60" y="230" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">Step 6: propagation cut short</text>' +
              '<text x="320" y="282" text-anchor="middle" font-size="13" fill="var(--muted)">same output, no version bump, no re-render</text>' +
              '</svg>',
            label: { pl: 'Propagacja ucięta', en: 'Propagation cut short' },
            note: {
              pl: 'isPositive przeliczyło się na tę samą wartość, więc jego wersja nie rośnie: label zostaje z cache, a render nie ma nic do roboty.',
              en: 'isPositive recomputed to the same value, so its version does not bump: label keeps its cache and the render has nothing to do.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie leniwego, ale bardzo bystrego księgowego. Pytasz go: "ile mam pieniędzy razem?". Liczy raz, zapisuje wynik na karteczce i podaje. Pytasz drugi raz - nie liczy od nowa, tylko czyta z karteczki.</p>' +
            '<p>Kiedy dorzucasz pieniądze do jednej ze skarbonek, księgowy nie zrywa się do liczenia. Po prostu skreśla karteczkę i mówi: "to już nieaktualne". Policzy dopiero, gdy ktoś naprawdę zapyta.</p>' +
            '<p>Najlepsze jest to, że gdy przeliczy i wyjdzie mu dokładnie ta sama kwota co wcześniej, nikogo nie budzi. Po co robić szum, skoro nic się nie zmieniło?</p>' +
            '<p>I jeszcze jedno: to księgowy, nie hydraulik. Ma liczyć, a nie wysyłać listów, dzwonić po pizzę ani przestawiać mebli. Liczenie i uboczne akcje to dwie różne prace.</p>',
          en: '<p>Picture a lazy but very sharp accountant. You ask: "how much money do I have in total?". He counts once, writes the answer on a sticky note and hands it over. Ask again and he does not count - he reads the note.</p>' +
            '<p>When you drop coins into one of the jars, he does not jump up to recount. He simply crosses out the note and says "this is out of date now". He will count when somebody actually asks.</p>' +
            '<p>The best part: if he recounts and gets exactly the same total as before, he wakes nobody up. Why make noise when nothing changed?</p>' +
            '<p>One more thing: he is an accountant, not a plumber. His job is counting, not sending letters, ordering pizza or moving furniture. Counting and side effects are two different jobs.</p>'
        },
        school: {
          pl: '<p><code>computed(getter)</code> zwraca <code>ComputedRefImpl</code>: obiekt, który jest jednocześnie <em>konsumentem</em> (subskrybuje swoje źródła) i <em>producentem</em> (ma własny dep, do którego zapisują się jego czytelnicy). Ta dwoistość jest sercem grafu zależności.</p>' +
            '<p>Trzy właściwości, które trzeba znać na pamięć:</p>' +
            '<ul>' +
            '<li><strong>Leniwość</strong> - getter nie uruchamia się przy tworzeniu ani przy zmianie źródła, tylko przy pierwszym odczycie po tej zmianie.</li>' +
            '<li><strong>Cache</strong> - dziesięć odczytów w szablonie to jedno wykonanie getter, dopóki nic się nie zmieniło.</li>' +
            '<li><strong>Ucięcie propagacji</strong> - jeśli po przeliczeniu wynik jest identyczny (porównanie przez <code>Object.is</code>), zależne efekty nie są powiadamiane.</li>' +
            '</ul>' +
            '<pre><code>const items = ref([])\nconst query = ref(\'\')\n\nconst visible = computed(() =&gt;\n  items.value.filter(i =&gt; i.name.includes(query.value))\n)\n\n// zapis: computed z setterem\nconst fullName = computed({\n  get: () =&gt; first.value + \' \' + last.value,\n  set: (v) =&gt; { [first.value, last.value] = v.split(\' \') }\n})</code></pre>' +
            '<p>Kiedy <strong>nie</strong> używać computed: gdy w środku dzieje się cokolwiek ubocznego. Fetch, zapis do localStorage, mutacja innego stanu, licznik analityczny - to wszystko trafia do watchera. Powód jest praktyczny: moment wykonania getter zależy od tego, kto i kiedy odczyta wartość, więc efekt uboczny odpali się w losowo wyglądającym miejscu, a przy braku czytelników nie odpali wcale.</p>' +
            '<p>Uwaga na filtrowanie i sortowanie dużych list: computed zapamiętuje wynik, ale <code>sort()</code> mutuje tablicę w miejscu, więc zawsze kopiuj (<code>[...items.value].sort()</code>), inaczej getter mutuje własne źródło i ryzykujesz pętlę.</p>',
          en: '<p><code>computed(getter)</code> returns a <code>ComputedRefImpl</code>: an object that is both a <em>consumer</em> (it subscribes to its sources) and a <em>producer</em> (it owns a dep that its readers subscribe to). That duality is the heart of the dependency graph.</p>' +
            '<p>Three properties worth memorizing:</p>' +
            '<ul>' +
            '<li><strong>Laziness</strong> - the getter does not run on creation nor when a source changes, only on the first read after that change.</li>' +
            '<li><strong>Caching</strong> - ten reads in a template mean one getter execution, as long as nothing changed.</li>' +
            '<li><strong>Short-circuit</strong> - if a recomputation produces an identical value (compared with <code>Object.is</code>), dependent effects are not notified.</li>' +
            '</ul>' +
            '<pre><code>const items = ref([])\nconst query = ref(\'\')\n\nconst visible = computed(() =&gt;\n  items.value.filter(i =&gt; i.name.includes(query.value))\n)\n\n// writable computed\nconst fullName = computed({\n  get: () =&gt; first.value + \' \' + last.value,\n  set: (v) =&gt; { [first.value, last.value] = v.split(\' \') }\n})</code></pre>' +
            '<p>When <strong>not</strong> to use computed: whenever anything side-effecting happens inside. Fetching, writing to localStorage, mutating other state, firing analytics - those belong in a watcher. The reason is practical: when the getter runs depends on who reads the value and when, so the side effect fires at a random-looking moment, and with no readers it never fires at all.</p>' +
            '<p>Careful with filtering and sorting large lists: computed caches the result, but <code>sort()</code> mutates in place, so always copy (<code>[...items.value].sort()</code>) or the getter mutates its own source and you risk a loop.</p>'
        },
        pro: {
          pl: '<p>Od Vue 3.4 <code>ComputedRefImpl</code> nie jest już zwykłym efektem z flagą <code>_dirty</code>. Zależności są listą linków z numerami wersji, a zamiast pojedynczej flagi mamy poziomy zabrudzenia (brudny na pewno kontra "może brudny"). To pozwala na <em>weryfikację leniwą</em>: przed uruchomieniem getter Vue sprawdza wersje źródeł i jeśli żadna faktycznie nie urosła, wynik zostaje.</p>' +
            '<h4>Konsekwencje, które widać w profilerze</h4>' +
            '<ul>' +
            '<li>Łańcuch A do B do C przelicza się <em>od końca</em>, na żądanie, i tylko do miejsca, w którym wersja się zgadza. Głębokie grafy computed nie kosztują liniowo przy każdej zmianie.</li>' +
            '<li>Computed bez aktywnych subskrybentów działa jak zwykła leniwa funkcja - to naturalny odpowiednik memoizacji, tylko z automatycznym unieważnianiem.</li>' +
            '<li>Ucięcie propagacji przy tej samej wartości działa dla wyników porównywalnych przez <code>Object.is</code>. Getter zwracający za każdym razem nowy obiekt lub tablicę (<code>{...x}</code>, <code>.map()</code>) nigdy tego nie osiągnie i będzie triggerował render mimo braku realnej zmiany.</li>' +
            '</ul>' +
            '<pre><code>// stabilna tozsamosc dla drogich konsumentow\nimport { computed, shallowRef, triggerRef } from \'vue\'\n\nconst rows = shallowRef([])\nconst byId = computed(() =&gt; {\n  const m = new Map()\n  for (const r of rows.value) m.set(r.id, r)\n  return m            // nowa Mapa za kazdym razem: swiadoma decyzja\n})\n\n// mutacja w miejscu + recznie wymuszony trigger\nrows.value.push(next)\ntriggerRef(rows)</code></pre>' +
            '<h4>Wzorce dla design systemu</h4>' +
            '<ul>' +
            '<li><strong>Computed jako publiczne API</strong>: composable zwraca <code>readonly</code> computed zamiast surowego refa, więc konsument nie może zapisać do stanu wewnętrznego.</li>' +
            '<li><strong>Writable computed jako adapter</strong>: klasyczne opakowanie propa w <code>v-model</code> bez mutowania propsów; od 3.4 zwykle zastępowane przez <code>defineModel()</code>.</li>' +
            '<li><strong>Rozbijanie grubych computed</strong>: jeden getter liczący filtrowanie, sortowanie i paginację przelicza całość przy zmianie strony. Trzy computed w łańcuchu przeliczą tylko ostatni krok.</li>' +
            '<li><strong>Nie wołaj computed w pętli renderu</strong> z argumentami - <code>computed</code> nie przyjmuje parametrów. Zamiast fabryki computed na wiersz zrób jeden computed zwracający Mapę.</li>' +
            '</ul>' +
            '<h4>Diagnostyka</h4>' +
            '<p><code>onTrack</code> i <code>onTrigger</code> (tylko w trybie deweloperskim) w drugim argumencie <code>computed</code> pokazują, jaka zależność została zebrana i co ją unieważniło - w praktyce najszybszy sposób na znalezienie przypadkowej zależności od <code>Date.now()</code> albo od całego obiektu <code>props</code>. Vue DevTools ma zakładkę z grafem zależności, ale przy dużych drzewach szybsze bywa wstawienie <code>onTrigger: (e) =&gt; debugger</code>.</p>' +
            '<p>I rzecz często pomijana: computed w Vue nie jest darmowe pod SSR - na serwerze getter i tak wykona się raz, a jego wynik nie jest przenoszony do klienta, więc ciężkie obliczenia policzą się dwa razy. Wyniki warte przeniesienia wkładaj do <code>useState</code> w Nuxt albo do payloadu hydracji.</p>',
          en: '<p>Since Vue 3.4 <code>ComputedRefImpl</code> is no longer a plain effect with a <code>_dirty</code> boolean. Dependencies are linked nodes with version numbers, and instead of one flag there are dirty levels (definitely dirty versus maybe dirty). That enables <em>lazy verification</em>: before running the getter, Vue checks source versions and keeps the cached value if none actually advanced.</p>' +
            '<h4>Consequences you can see in a profiler</h4>' +
            '<ul>' +
            '<li>A chain A to B to C is evaluated <em>backwards</em>, on demand, and only down to the point where versions still match. Deep computed graphs do not cost linearly on every change.</li>' +
            '<li>A computed with no active subscribers behaves like a plain lazy function - memoization with automatic invalidation.</li>' +
            '<li>The same-value short-circuit relies on <code>Object.is</code>. A getter returning a fresh object or array every time (<code>{...x}</code>, <code>.map()</code>) can never hit it and will re-trigger renders despite no real change.</li>' +
            '</ul>' +
            '<pre><code>// stable identity for expensive consumers\nimport { computed, shallowRef, triggerRef } from \'vue\'\n\nconst rows = shallowRef([])\nconst byId = computed(() =&gt; {\n  const m = new Map()\n  for (const r of rows.value) m.set(r.id, r)\n  return m            // a new Map each time: a deliberate choice\n})\n\n// in-place mutation plus a manual trigger\nrows.value.push(next)\ntriggerRef(rows)</code></pre>' +
            '<h4>Design-system patterns</h4>' +
            '<ul>' +
            '<li><strong>Computed as public API</strong>: a composable returns a readonly computed instead of the raw ref, so consumers cannot write into internal state.</li>' +
            '<li><strong>Writable computed as an adapter</strong>: the classic prop wrapper for <code>v-model</code> without mutating props; since 3.4 usually replaced by <code>defineModel()</code>.</li>' +
            '<li><strong>Split fat computeds</strong>: one getter doing filtering, sorting and pagination recomputes everything on a page change. Three chained computeds recompute only the last step.</li>' +
            '<li><strong>Do not build per-row computeds</strong> - <code>computed</code> takes no arguments. Instead of a factory per row, return one computed holding a Map.</li>' +
            '</ul>' +
            '<h4>Debugging</h4>' +
            '<p><code>onTrack</code> and <code>onTrigger</code> (dev mode only) in the second argument of <code>computed</code> show which dependency was collected and what invalidated it - in practice the fastest way to find an accidental dependency on <code>Date.now()</code> or on the whole <code>props</code> object. Vue DevTools has a dependency graph view, but on large trees dropping in <code>onTrigger: (e) =&gt; debugger</code> is often quicker.</p>' +
            '<p>One commonly missed point: computed is not free under SSR. The getter still runs once on the server, its result is not transferred to the client, so heavy work happens twice. Put results worth transferring into Nuxt <code>useState</code> or the hydration payload.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Zmieniasz źródłowy ref, od którego zależy computed, ale nikt nie odczytuje tego computed. Kiedy uruchomi się getter?',
            en: 'You change a source ref that a computed depends on, but nobody reads that computed. When does the getter run?'
          },
          options: [
            { pl: 'Natychmiast po zapisie, synchronicznie', en: 'Immediately after the write, synchronously' },
            { pl: 'Na najbliższym flushu schedulera', en: 'On the next scheduler flush' },
            { pl: 'Dopiero przy pierwszym odczycie .value po tej zmianie', en: 'Only on the first .value read after that change' },
            { pl: 'Przy odmontowaniu komponentu', en: 'When the component unmounts' }
          ],
          correct: 2,
          explain: {
            pl: 'Computed jest leniwe: zapis tylko oznacza je jako nieaktualne. Bez czytelnika getter nie odpali się nigdy - dlatego nie wolno wkładać tam efektów ubocznych.',
            en: 'Computed is lazy: a write only marks it stale. With no reader the getter never runs at all, which is exactly why side effects do not belong there.'
          }
        },
        {
          q: {
            pl: 'Getter computed zwraca items.value.map(x => ({ ...x })). Źródło zmienia się na wartość dającą identyczną treść. Co się stanie z komponentami czytającymi ten computed?',
            en: 'A computed getter returns items.value.map(x => ({ ...x })). The source changes to something with identical content. What happens to components reading that computed?'
          },
          options: [
            { pl: 'Nie przerysują się, bo Vue porównuje wynik głęboko', en: 'They do not re-render, because Vue deep-compares the result' },
            { pl: 'Przerysują się, bo każda nowa tablica to nowa referencja i Object.is zwraca false', en: 'They re-render, because a fresh array is a new reference and Object.is returns false' },
            { pl: 'Przerysują się tylko wtedy, gdy computed ma setter', en: 'They re-render only if the computed has a setter' },
            { pl: 'Vue rzuci ostrzeżenie o niestabilnym computed', en: 'Vue logs a warning about an unstable computed' }
          ],
          correct: 1,
          explain: {
            pl: 'Ucięcie propagacji przy tej samej wartości opiera się na Object.is, więc nowo tworzone obiekty i tablice nigdy go nie uzyskają. Stabilna tożsamość wyniku to realna optymalizacja.',
            en: 'The same-value short-circuit relies on Object.is, so freshly created arrays and objects never hit it. Stable result identity is a real optimization.'
          }
        },
        {
          q: {
            pl: 'Które z tych zadań NIE należy do computed?',
            en: 'Which of these does NOT belong inside a computed?'
          },
          options: [
            { pl: 'Zapis wybranego filtra do localStorage', en: 'Persisting the selected filter to localStorage' },
            { pl: 'Zsumowanie cen pozycji koszyka', en: 'Summing the prices of cart items' },
            { pl: 'Zbudowanie mapy id na obiekt z tablicy wierszy', en: 'Building an id-to-object map from a row array' },
            { pl: 'Sformatowanie daty do wyświetlenia', en: 'Formatting a date for display' }
          ],
          correct: 0,
          explain: {
            pl: 'Zapis do localStorage to efekt uboczny - powinien wylądować w watcherze, bo moment wykonania getter jest nieprzewidywalny i zależy od tego, czy ktoś czyta wartość.',
            en: 'Writing to localStorage is a side effect and belongs in a watcher, since getter timing is unpredictable and depends on whether anybody reads the value.'
          }
        },
        {
          q: {
            pl: 'Masz łańcuch: base (ref) -> filtered -> sorted -> paged, każdy jako osobne computed. Użytkownik zmienia stronę. Co się przeliczy w Vue 3.4+?',
            en: 'You have a chain base (ref) -> filtered -> sorted -> paged, each a separate computed. The user changes the page. What recomputes in Vue 3.4+?'
          },
          options: [
            { pl: 'Cały łańcuch od base, bo computed nie cache-uje między krokami', en: 'The whole chain from base, because computeds do not cache between steps' },
            { pl: 'Nic, dopóki nie wywołasz nextTick()', en: 'Nothing until you call nextTick()' },
            { pl: 'Losowo, w zależności od kolejności zdefiniowania computed', en: 'It varies with the order the computeds were defined in' },
            { pl: 'Tylko paged - wersje filtered i sorted się nie zmieniły, więc cache zostaje', en: 'Only paged - versions of filtered and sorted did not change, so their caches stand' }
          ],
          correct: 3,
          explain: {
            pl: 'Ocena idzie od końca i zatrzymuje się tam, gdzie wersje źródeł się zgadzają. Dlatego rozbicie grubego computed na kroki realnie obniża koszt typowych interakcji.',
            en: 'Evaluation walks backwards and stops where source versions still match. That is why splitting a fat computed into steps genuinely lowers the cost of common interactions.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'watch-vs-watcheffect',
      title: {
        pl: 'watch kontra watchEffect',
        en: 'watch versus watchEffect'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'watch kontra watchEffect', en: 'watch versus watchEffect' },
          def: { pl: '<code>watch</code> ma jawne źródło, dostaje starą i nową wartość i domyślnie jest leniwy. <code>watchEffect</code> zbiera zależności sam przy pierwszym uruchomieniu i startuje natychmiast.', en: '<code>watch</code> takes an explicit source, receives old and new values and is lazy by default. <code>watchEffect</code> collects its deps on the first run and fires immediately.' }
        },
        {
          term: { pl: 'flush: pre / post / sync', en: 'flush: pre / post / sync' },
          def: { pl: 'Moment wywołania callbacku względem renderu: <em>pre</em> przed renderem rodzica (domyślnie), <em>post</em> po załataniu DOM, <em>sync</em> natychmiast przy zapisie i bez batchowania.', en: 'When the callback runs relative to render: <em>pre</em> before the parent render (default), <em>post</em> after the DOM patch, <em>sync</em> immediately on write with no batching.' }
        },
        {
          term: { pl: 'deep', en: 'deep' },
          def: { pl: 'Opcja wymuszająca przejście całej struktury przy każdym triggerze. <code>watch(obj, cb)</code> na obiekcie <code>reactive</code> jest głęboki niejawnie, a <code>watch(() =&gt; obj, cb)</code> wcale.', en: 'The option that traverses the whole structure on every trigger. <code>watch(obj, cb)</code> on a <code>reactive</code> object is implicitly deep, while <code>watch(() =&gt; obj, cb)</code> is not.' }
        },
        {
          term: { pl: 'onWatcherCleanup', en: 'onWatcherCleanup' },
          def: { pl: 'Rejestruje sprzątanie uruchamiane przed kolejnym wywołaniem callbacku i przy zatrzymaniu watchera. Miejsce na <code>clearTimeout</code> i <code>AbortController.abort()</code>, czyli na zabicie wyścigu żądań.', en: 'Registers cleanup that runs before the next callback and when the watcher stops. The place for <code>clearTimeout</code> and <code>AbortController.abort()</code> - how you kill request races.' }
        },
        {
          term: { pl: 'Uchwyt stop', en: 'Stop handle' },
          def: { pl: 'Wartość zwracana przez <code>watch</code>: wywołanie jej zatrzymuje watchera. Konieczna dla watcherów tworzonych po <code>await</code> lub w callbacku, bo te nie należą do scope komponentu.', en: 'The value returned by <code>watch</code>: calling it stops the watcher. Required for watchers created after an <code>await</code> or inside a callback, since those do not belong to the component scope.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="24" width="285" height="130" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="162" y="52" text-anchor="middle" font-size="16" fill="var(--text)">watch(source, cb)</text>' +
          '<text x="162" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">explicit dependencies</text>' +
          '<text x="162" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">lazy, gives old and new value</text>' +
          '<text x="162" y="122" text-anchor="middle" font-size="13" fill="var(--muted)">deep and once are opt in</text>' +
          '<text x="162" y="144" text-anchor="middle" font-size="13" fill="var(--ok)">best for reacting to a change</text>' +
          '<rect x="335" y="24" width="285" height="130" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="477" y="52" text-anchor="middle" font-size="16" fill="var(--text)">watchEffect(fn)</text>' +
          '<text x="477" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">deps collected while running</text>' +
          '<text x="477" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">runs once immediately</text>' +
          '<text x="477" y="122" text-anchor="middle" font-size="13" fill="var(--muted)">no old value</text>' +
          '<text x="477" y="144" text-anchor="middle" font-size="13" fill="var(--ok)">best for syncing to state</text>' +
          '<line x1="320" y1="160" x2="320" y2="196" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm4a)"/>' +
          '<text x="320" y="222" text-anchor="middle" font-size="15" fill="var(--text)">flush timing decides when the callback lands</text>' +
          '<line x1="40" y1="300" x2="600" y2="300" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="120" cy="300" r="9" fill="var(--warn)"/>' +
          '<text x="120" y="278" text-anchor="middle" font-size="14" fill="var(--warn)">sync</text>' +
          '<text x="120" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">inside the write</text>' +
          '<circle cx="320" cy="300" r="9" fill="var(--accent)"/>' +
          '<text x="320" y="278" text-anchor="middle" font-size="14" fill="var(--accent)">pre (default)</text>' +
          '<text x="320" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">before the render</text>' +
          '<circle cx="520" cy="300" r="9" fill="var(--ok)"/>' +
          '<text x="520" y="278" text-anchor="middle" font-size="14" fill="var(--ok)">post</text>' +
          '<text x="520" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">after the DOM patch</text>' +
          '<text x="320" y="372" text-anchor="middle" font-size="14" fill="var(--muted)">Read the DOM only in post. Never write state in sync.</text>' +
          '</svg>',
        caption: {
          pl: 'Dwa API na jeden mechanizm efektu: watch deklaruje źródła jawnie, watchEffect zbiera je w locie. Osobną osią jest flush, czyli moment wywołania callbacku.',
          en: 'Two APIs over one effect mechanism: watch declares its sources explicitly, watchEffect collects them as it runs. Flush timing is a separate axis that decides when the callback lands.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dwa rodzaje czujników w domu. Pierwszy to czujnik przy jednych konkretnych drzwiach: powiedziałeś dokładnie, czego ma pilnować, i piszczy tylko wtedy, gdy te drzwi się otworzą. Do tego mówi ci, jak było przedtem i jak jest teraz.</p>' +
            '<p>Drugi to czujnik, który po prostu robi obchód całego domu. Za pierwszym razem sprawdza wszystko po kolei i zapamiętuje, do jakich pokoi w ogóle zaglądał. Od tej pory reaguje, gdy cokolwiek w tych pokojach się ruszy.</p>' +
            '<p>Jest jeszcze pytanie, <em>kiedy</em> czujnik ma zapiszczeć: od razu, jeszcze przed sprzątaniem pokoju, czy dopiero po sprzątaniu, gdy wszystko stoi na miejscu. Jeśli chcesz zmierzyć, ile miejsca zajmuje kanapa, musisz poczekać, aż ktoś ją faktycznie postawi.</p>',
          en: '<p>Picture two kinds of sensors in a house. The first sits on one specific door: you said exactly what to watch, and it beeps only when that door opens. It even tells you how things were before and how they are now.</p>' +
            '<p>The second one just walks the whole house. On its first round it checks everything and remembers which rooms it actually entered. From then on it reacts when anything moves in those rooms.</p>' +
            '<p>There is also the question of <em>when</em> the sensor beeps: right away, before the room gets tidied, or only after the tidying when everything is in place. If you want to measure how much space the sofa takes, you have to wait until somebody actually puts it down.</p>'
        },
        school: {
          pl: '<p>Oba API budują ten sam <code>ReactiveEffect</code>, różnią się sposobem deklarowania zależności i tym, co dostaje callback.</p>' +
            '<pre><code>// jawne źródło, stara i nowa wartość, leniwe\nwatch(() =&gt; props.userId, async (id, prevId, onCleanup) =&gt; {\n  const ac = new AbortController()\n  onCleanup(() =&gt; ac.abort())\n  user.value = await fetchUser(id, ac.signal)\n}, { immediate: true })\n\n// zaleznosci zbierane w trakcie, uruchamia sie od razu\nwatchEffect(() =&gt; {\n  document.title = page.value + \' - \' + count.value\n})</code></pre>' +
            '<p><strong>Kiedy watch</strong>: gdy reagujesz na konkretną zmianę, potrzebujesz poprzedniej wartości, chcesz warunkowo nic nie robić albo źródło jest wąskie i drogie. <strong>Kiedy watchEffect</strong>: gdy synchronizujesz coś z wieloma kawałkami stanu i wypisywanie ich listy byłoby duplikacją.</p>' +
            '<p>Najważniejsza pułapka watchEffect: zależności widzi tylko do pierwszego <code>await</code>. Wszystko, co odczytasz po nim, nie zostanie zebrane, bo <code>activeEffect</code> jest już inny.</p>' +
            '<p>Druga oś to <code>flush</code>. Domyślne <code>pre</code> odpala callback przed renderem komponentu, więc DOM jest jeszcze stary. <code>post</code> odpala po patchu - tego chcesz, gdy mierzysz element, ustawiasz focus albo synchronizujesz zewnętrzną bibliotekę. <code>sync</code> odpala natychmiast w trakcie zapisu i praktycznie nigdy nie jest tym, czego potrzebujesz; przy serii zapisów wykona się tyle razy, ile było zapisów.</p>' +
            '<p><code>onCleanup</code> (a od 3.5 też globalne <code>onWatcherCleanup</code>) uruchamia się przed każdym kolejnym wywołaniem i przy zatrzymaniu watchera. To jest miejsce na <code>AbortController</code>, <code>clearTimeout</code> i odpinanie listenerów - bez tego dostajesz klasyczny race condition, w którym wolniejsza odpowiedź nadpisuje nowszą.</p>',
          en: '<p>Both APIs build the same <code>ReactiveEffect</code>; they differ in how dependencies are declared and what the callback receives.</p>' +
            '<pre><code>// explicit source, old and new value, lazy\nwatch(() =&gt; props.userId, async (id, prevId, onCleanup) =&gt; {\n  const ac = new AbortController()\n  onCleanup(() =&gt; ac.abort())\n  user.value = await fetchUser(id, ac.signal)\n}, { immediate: true })\n\n// deps collected while running, fires once up front\nwatchEffect(() =&gt; {\n  document.title = page.value + \' - \' + count.value\n})</code></pre>' +
            '<p><strong>Use watch</strong> when you react to a specific change, need the previous value, want to bail out conditionally, or the source is narrow and expensive. <strong>Use watchEffect</strong> when you synchronize something with several pieces of state and listing them would be duplication.</p>' +
            '<p>The biggest watchEffect trap: it only sees dependencies up to the first <code>await</code>. Anything read after that is not collected, because <code>activeEffect</code> has already moved on.</p>' +
            '<p>The second axis is <code>flush</code>. The default <code>pre</code> fires before the component render, so the DOM is still the old one. <code>post</code> fires after the patch - what you want when measuring an element, setting focus or syncing an external library. <code>sync</code> fires immediately inside the write and is almost never what you need; on a burst of writes it runs once per write.</p>' +
            '<p><code>onCleanup</code> (and since 3.5 the standalone <code>onWatcherCleanup</code>) runs before every subsequent invocation and when the watcher stops. This is where <code>AbortController</code>, <code>clearTimeout</code> and listener teardown belong - without it you get the classic race where a slower response overwrites a newer one.</p>'
        },
        pro: {
          pl: '<p>Watchery są najczęstszym źródłem subtelnych błędów w dużych aplikacjach Vue, bo łączą trzy niezależne wymiary: co jest źródłem, kiedy leci callback i kto sprząta.</p>' +
            '<h4>Semantyka źródeł</h4>' +
            '<ul>' +
            '<li><code>watch(refObj, cb)</code> na obiekcie <code>reactive</code> jest <strong>domyślnie głęboki</strong>, a <code>watch(() =&gt; obj, cb)</code> nie jest wcale - getter zwraca wciąż tę samą referencję.</li>' +
            '<li><code>deep: true</code> to pełny przejazd po strukturze przy każdym triggerze; od 3.5 można podać <code>deep: 2</code> i ograniczyć głębokość. Na tysiącach węzłów to realny koszt na każdej mutacji.</li>' +
            '<li>Tablica źródeł daje tablice wartości starych i nowych, ale trigger dowolnego elementu odpala callback raz - bez informacji, który się zmienił. Jeśli tego potrzebujesz, porównaj ręcznie.</li>' +
            '<li>Getter zwracający nowy obiekt przy każdym wywołaniu (na przykład <code>{ a: a.value }</code>) będzie odpalał callback zawsze, bo porównanie idzie przez <code>Object.is</code>.</li>' +
            '</ul>' +
            '<h4>Kolejność i pętle</h4>' +
            '<p>W jednym cyklu scheduler wykonuje: watchery <code>pre</code> (posortowane po id komponentu, czyli od rodzica w dół), potem efekty renderujące, potem kolejkę <code>post</code>. Zapis stanu w watcherze <code>pre</code> jest tani, bo dołączy do tego samego renderu. Zapis w <code>post</code> planuje kolejny przebieg i przy braku warunku stopu daje ostrzeżenie o pętli po stu iteracjach.</p>' +
            '<pre><code>// deduplikacja i anulowanie w jednym miejscu\nimport { watch, onWatcherCleanup } from \'vue\'\n\nwatch(query, (q) =&gt; {\n  const t = setTimeout(async () =&gt; {\n    const ac = new AbortController()\n    onWatcherCleanup(() =&gt; ac.abort())\n    results.value = await search(q, ac.signal)\n  }, 250)\n  onWatcherCleanup(() =&gt; clearTimeout(t))\n}, { flush: \'pre\' })</code></pre>' +
            '<h4>Cykl życia i wycieki</h4>' +
            '<ul>' +
            '<li>Watcher utworzony synchronicznie w <code>setup</code> zatrzymuje się sam przy odmontowaniu. Utworzony w callbacku, w <code>setTimeout</code> albo po <code>await</code> - już nie. Wtedy potrzebny jest <code>effectScope</code> albo ręczny <code>stop()</code>.</li>' +
            '<li>Zwracana funkcja stop pozwala zrobić watcher jednorazowy, ale od 3.4 jest do tego opcja <code>once: true</code>.</li>' +
            '<li>Pod SSR watchery nie działają: <code>watchEffect</code> nie wykonuje się na serwerze (poza <code>flush: sync</code> w niektórych ścieżkach), a <code>immediate</code> tak. Kod, który dotyka <code>window</code>, i tak musi być w <code>onMounted</code> albo w <code>post</code>.</li>' +
            '</ul>' +
            '<h4>Zapach kodu</h4>' +
            '<p>Watcher, który wyłącznie wylicza wartość i wpisuje ją do innego refa, to computed napisany źle: gubi leniwość, cache i ucięcie propagacji, a do tego wprowadza jeden tick opóźnienia, przez który UI potrafi mrugnąć. W przeglądzie kodu w design systemie to jedna z pierwszych rzeczy do wyłapania - zaraz obok watcherów na <code>props</code> tam, gdzie wystarczyłby <code>defineModel</code> albo zwykły <code>computed</code>.</p>',
          en: '<p>Watchers are the most common source of subtle bugs in large Vue apps, because they combine three independent axes: what the source is, when the callback fires, and who cleans up.</p>' +
            '<h4>Source semantics</h4>' +
            '<ul>' +
            '<li><code>watch(obj, cb)</code> on a <code>reactive</code> object is <strong>implicitly deep</strong>, while <code>watch(() =&gt; obj, cb)</code> is not deep at all - the getter keeps returning the same reference.</li>' +
            '<li><code>deep: true</code> traverses the whole structure on every trigger; since 3.5 you can pass <code>deep: 2</code> to cap the depth. Across thousands of nodes that is a real per-mutation cost.</li>' +
            '<li>An array source yields arrays of old and new values, but a trigger from any element fires the callback once, without telling you which one changed. Compare manually if you need that.</li>' +
            '<li>A getter returning a fresh object each call (for example <code>{ a: a.value }</code>) fires every time, because comparison goes through <code>Object.is</code>.</li>' +
            '</ul>' +
            '<h4>Ordering and loops</h4>' +
            '<p>Within one cycle the scheduler runs <code>pre</code> watchers (sorted by component id, so parents first), then render effects, then the <code>post</code> queue. Writing state from a <code>pre</code> watcher is cheap because it joins the same render. Writing from <code>post</code> schedules another pass and, without a stop condition, logs an infinite-loop warning after a hundred iterations.</p>' +
            '<pre><code>// debounce and cancellation in one place\nimport { watch, onWatcherCleanup } from \'vue\'\n\nwatch(query, (q) =&gt; {\n  const t = setTimeout(async () =&gt; {\n    const ac = new AbortController()\n    onWatcherCleanup(() =&gt; ac.abort())\n    results.value = await search(q, ac.signal)\n  }, 250)\n  onWatcherCleanup(() =&gt; clearTimeout(t))\n}, { flush: \'pre\' })</code></pre>' +
            '<h4>Lifecycle and leaks</h4>' +
            '<ul>' +
            '<li>A watcher created synchronously in <code>setup</code> stops itself on unmount. One created in a callback, a <code>setTimeout</code> or after an <code>await</code> does not, and needs an <code>effectScope</code> or a manual <code>stop()</code>.</li>' +
            '<li>The returned stop handle can make a one-shot watcher, but since 3.4 there is a <code>once: true</code> option for that.</li>' +
            '<li>Under SSR watchers mostly do not run: <code>watchEffect</code> is skipped on the server while <code>immediate</code> callbacks still fire. Code touching <code>window</code> belongs in <code>onMounted</code> or in a <code>post</code> flush anyway.</li>' +
            '</ul>' +
            '<h4>The smell</h4>' +
            '<p>A watcher whose only job is deriving a value and writing it into another ref is a computed written badly: it loses laziness, caching and the same-value short-circuit, and adds one tick of delay that makes the UI flicker. In design-system reviews it is one of the first things to catch - right next to watchers on <code>props</code> where <code>defineModel</code> or a plain <code>computed</code> would do.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym różni się domyślne zachowanie watch od watchEffect przy pierwszym uruchomieniu?',
            en: 'How does the default first-run behavior of watch differ from watchEffect?'
          },
          options: [
            { pl: 'watchEffect uruchamia się od razu, watch dopiero przy zmianie źródła', en: 'watchEffect runs immediately, watch waits for a source change' },
            { pl: 'Oba uruchamiają się od razu', en: 'Both run immediately' },
            { pl: 'Oba czekają na zmianę źródła', en: 'Both wait for a source change' },
            { pl: 'watch uruchamia się od razu, watchEffect dopiero po zamontowaniu', en: 'watch runs immediately, watchEffect waits for mount' }
          ],
          correct: 0,
          explain: {
            pl: 'watchEffect musi wykonać funkcję, żeby w ogóle poznać zależności, więc odpala się natychmiast. watch jest leniwy, chyba że podasz immediate: true.',
            en: 'watchEffect must execute the function to discover its dependencies, so it fires at once. watch is lazy unless you pass immediate: true.'
          }
        },
        {
          q: {
            pl: 'watchEffect czyta a.value, potem robi await, a po nim czyta b.value. Na co będzie reagować?',
            en: 'A watchEffect reads a.value, then awaits, then reads b.value. What will it react to?'
          },
          options: [
            { pl: 'Na oba, bo Vue śledzi całą funkcję asynchroniczną', en: 'To both, because Vue tracks the whole async function' },
            { pl: 'Na żadne, bo funkcje async nie są śledzone', en: 'To neither, because async functions are not tracked' },
            { pl: 'Tylko na a, bo po await śledzenie już nie działa', en: 'Only to a, because tracking stops after the await' },
            { pl: 'Tylko na b, bo liczy się ostatni odczyt', en: 'Only to b, because the last read wins' }
          ],
          correct: 2,
          explain: {
            pl: 'activeEffect jest ustawiony tylko na czas synchronicznego wykonania. Po await odczyty trafiają w próżnię - dlatego dane do pobrania czytaj przed pierwszym await albo użyj watch z jawnym źródłem.',
            en: 'activeEffect is only set during the synchronous run. Reads after an await are not tracked, so read your inputs before the first await or use watch with an explicit source.'
          }
        },
        {
          q: {
            pl: 'Po zmianie stanu chcesz zmierzyć wysokość elementu, który dopiero się pojawił. Co ustawić?',
            en: 'After a state change you want to measure the height of an element that just appeared. What do you set?'
          },
          options: [
            { pl: 'flush: sync, żeby zdążyć przed renderem', en: 'flush: sync, to get in before the render' },
            { pl: 'deep: true na źródle', en: 'deep: true on the source' },
            { pl: 'immediate: true i pomiar w pierwszym wywołaniu', en: 'immediate: true and measure on the first call' },
            { pl: 'flush: post, bo callback poleci po patchu DOM', en: 'flush: post, because the callback runs after the DOM patch' }
          ],
          correct: 3,
          explain: {
            pl: 'Domyślne pre działa jeszcze przed renderem, więc zobaczyłbyś stary DOM. post odpala po patchu; alternatywą jest await nextTick() w callbacku.',
            en: 'The default pre runs before the render, so you would measure the old DOM. post runs after the patch; the alternative is await nextTick() inside the callback.'
          }
        },
        {
          q: {
            pl: 'Użytkownik szybko wpisuje w wyszukiwarce, a każdy znak odpala fetch w watcherze. Wyniki czasem pokazują starsze zapytanie. Jaka jest właściwa naprawa?',
            en: 'A user types fast, each keystroke fires a fetch from a watcher, and results sometimes show an older query. What is the correct fix?'
          },
          options: [
            { pl: 'Anulowanie poprzedniego żądania w onWatcherCleanup przez AbortController', en: 'Cancel the previous request in onWatcherCleanup with an AbortController' },
            { pl: 'Zmiana flush na sync, żeby żądania szły po kolei', en: 'Switch flush to sync so requests go in order' },
            { pl: 'Dodanie deep: true do źródła', en: 'Add deep: true to the source' },
            { pl: 'Zamiana watch na computed z fetchem w getterze', en: 'Replace the watch with a computed that fetches in its getter' }
          ],
          correct: 0,
          explain: {
            pl: 'To klasyczny race condition: wolniejsza odpowiedź wraca później i nadpisuje nowszą. Cleanup anuluje poprzednie żądanie, zanim ruszy kolejne. flush ani deep nie mają tu nic do rzeczy, a fetch w computed to antywzorzec.',
            en: 'This is the classic race: a slower response returns later and overwrites a newer one. Cleanup aborts the previous request before the next starts. Neither flush nor deep is relevant, and fetching in a computed is an antipattern.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      id: 'template-directives-essentials',
      title: {
        pl: 'Szablony i dyrektywy bez tajemnic',
        en: 'Templates and directives, decoded'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Patch flags i block tree', en: 'Patch flags and block tree' },
          def: { pl: 'Kompilator oznacza każdy węzeł tym, co w nim jest dynamiczne, i spina te węzły w płaską listę bloku. Runtime pomija statyczne poddrzewa zamiast robić pełny diff.', en: 'The compiler marks each node with what is dynamic in it and collects those nodes into a flat block list, so the runtime skips static subtrees instead of doing a full diff.' }
        },
        {
          term: { pl: 'FULL_PROPS', en: 'FULL_PROPS' },
          def: { pl: 'Flaga nadawana m.in. przy <code>v-bind="attrs"</code> bez jawnych kluczy - runtime musi porównać cały obiekt propsów. W komponentach-wrapperach bywa konieczna, ale powinna być świadomą decyzją.', en: 'The flag applied to things like <code>v-bind="attrs"</code> without explicit keys - the runtime must diff the whole props object. Sometimes unavoidable in wrappers, but it should be a deliberate decision.' }
        },
        {
          term: { pl: 'v-memo', en: 'v-memo' },
          def: { pl: 'Pomija łatanie całego poddrzewa, dopóki tablica zależności się nie zmieni. Opłaca się dopiero na dużych listach; gdzie indziej to koszt i łatwe źródło nieodświeżonego UI.', en: 'Skips patching an entire subtree while its dependency array is unchanged. It only pays off on big lists; elsewhere it is pure cost and an easy source of stale UI.' }
        },
        {
          term: { pl: 'Modyfikatory zdarzeń', en: 'Event modifiers' },
          def: { pl: '<code>.stop</code>, <code>.prevent</code>, <code>.self</code>, <code>.capture</code>, <code>.passive</code> kompilują się do opakowań lub opcji listenera - <code>.passive</code> naprawdę trafia do <code>addEventListener</code>.', en: '<code>.stop</code>, <code>.prevent</code>, <code>.self</code>, <code>.capture</code> and <code>.passive</code> compile to wrappers or listener options - <code>.passive</code> genuinely reaches <code>addEventListener</code>.' }
        },
        {
          term: { pl: 'Scalanie class i style', en: 'class and style merging' },
          def: { pl: 'Obiekty i tablice z rodzica i z komponentu są łączone, ale przy konflikcie wygrywa wpis późniejszy. Numer jeden wśród przyczyn <em>moja klasa się nie nakłada</em> przy nadpisywaniu motywu.', en: 'Objects and arrays from the parent and the component are merged, but on conflict the later entry wins. The number one cause of <em>my class does not apply</em> when overriding a theme.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="30" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="60" text-anchor="middle" font-size="15" fill="var(--text)">template</text>' +
          '<text x="105" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">HTML plus directives</text>' +
          '<line x1="190" y1="70" x2="234" y2="70" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm5a)"/>' +
          '<rect x="238" y="30" width="164" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="60" text-anchor="middle" font-size="15" fill="var(--text)">compiler</text>' +
          '<text x="320" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">static analysis</text>' +
          '<line x1="402" y1="70" x2="446" y2="70" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm5a)"/>' +
          '<rect x="450" y="30" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="535" y="60" text-anchor="middle" font-size="15" fill="var(--text)">render fn</text>' +
          '<text x="535" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">vnodes plus flags</text>' +
          '<rect x="30" y="150" width="270" height="98" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="165" y="178" text-anchor="middle" font-size="15" fill="var(--text)">hoisted once</text>' +
          '<text x="165" y="202" text-anchor="middle" font-size="13" fill="var(--muted)">static nodes and props</text>' +
          '<text x="165" y="224" text-anchor="middle" font-size="13" fill="var(--muted)">cached event handlers</text>' +
          '<text x="165" y="242" text-anchor="middle" font-size="13" fill="var(--ok)">skipped on every update</text>' +
          '<rect x="340" y="150" width="270" height="98" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="475" y="178" text-anchor="middle" font-size="15" fill="var(--text)">patch flags</text>' +
          '<text x="475" y="202" text-anchor="middle" font-size="13" fill="var(--muted)">TEXT, CLASS, PROPS</text>' +
          '<text x="475" y="224" text-anchor="middle" font-size="13" fill="var(--muted)">dynamicChildren block tree</text>' +
          '<text x="475" y="242" text-anchor="middle" font-size="13" fill="var(--warn)">only these are diffed</text>' +
          '<rect x="60" y="286" width="240" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="180" y="314" text-anchor="middle" font-size="14" fill="var(--text)">v-if removes the node</text>' +
          '<text x="180" y="336" text-anchor="middle" font-size="13" fill="var(--muted)">new branch, state reset</text>' +
          '<rect x="340" y="286" width="240" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="460" y="314" text-anchor="middle" font-size="14" fill="var(--text)">v-show keeps the node</text>' +
          '<text x="460" y="336" text-anchor="middle" font-size="13" fill="var(--muted)">display toggled, state kept</text>' +
          '</svg>',
        caption: {
          pl: 'Szablon nie jest interpretowany w locie: kompilator zamienia go w funkcję renderującą, w której statyka jest wyciągnięta poza render, a dynamika oznaczona flagami do patchowania.',
          en: 'A template is not interpreted at runtime: the compiler turns it into a render function where static parts are hoisted out and dynamic parts carry patch flags.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że co wieczór nakrywasz ten sam stół. Obrus, świecznik i wazon zawsze stoją tak samo. Zmieniają się tylko talerze i karteczki z imionami gości.</p>' +
            '<p>Głupi sposób: co wieczór zdejmować wszystko i układać od zera. Mądry sposób: obrus i świecznik zostawić w spokoju, a wymieniać tylko to, co naprawdę się zmienia. Vue robi dokładnie to drugie, bo zanim aplikacja ruszy, ktoś przechodzi po twoim szablonie i zaznacza flamastrem: "to się nigdy nie zmienia, a to trzeba sprawdzać".</p>' +
            '<p>Są też dwa sposoby chowania krzesła. Możesz je wynieść z pokoju - wtedy przy powrocie jest zupełnie nowe, bez okruszków. Albo zarzucić na nie prześcieradło - krzesło stoi dalej, tylko go nie widać. Pierwsze to <code>v-if</code>, drugie to <code>v-show</code>.</p>',
          en: '<p>Imagine setting the same dinner table every evening. The tablecloth, the candlestick and the vase always sit in the same spot. Only the plates and the name cards change.</p>' +
            '<p>The dumb way: strip everything each evening and rebuild from scratch. The smart way: leave the tablecloth and candlestick alone and swap only what actually changes. Vue does the second one, because before your app even starts somebody walks through your template and marks it up: "this never changes, this needs checking".</p>' +
            '<p>There are also two ways to hide a chair. You can carry it out of the room - when it comes back it is a brand new chair with no crumbs on it. Or you can throw a sheet over it - the chair is still there, just invisible. The first is <code>v-if</code>, the second is <code>v-show</code>.</p>'
        },
        school: {
          pl: '<p>Szablon SFC jest kompilowany do funkcji renderującej podczas builda (<code>@vue/compiler-sfc</code> w Vite), a nie parsowany w przeglądarce. To otwiera drzwi do optymalizacji, których w JSX-ie nie da się zrobić bez dodatkowego kompilatora.</p>' +
            '<ul>' +
            '<li><strong>Hoisting</strong> - węzły i propsy bez wyrażeń są tworzone raz, poza funkcją renderującą.</li>' +
            '<li><strong>Patch flags</strong> - element z jednym dynamicznym atrybutem dostaje liczbową flagę, a runtime porównuje wyłącznie to pole zamiast całego zestawu propsów.</li>' +
            '<li><strong>Block tree</strong> - dynamiczne potomki są spłaszczane do jednej tablicy, więc diff jest liniowy względem liczby dynamicznych węzłów, a nie całego poddrzewa.</li>' +
            '<li><strong>Cache handlers</strong> - <code>@click="fn(x)"</code> nie tworzy nowej funkcji przy każdym renderze.</li>' +
            '</ul>' +
            '<pre><code>&lt;template&gt;\n  &lt;li v-for="user in users" :key="user.id" :class="{ active: user.id === selectedId }"&gt;\n    {{ user.name }}\n  &lt;/li&gt;\n&lt;/template&gt;</code></pre>' +
            '<p><code>key</code> nie jest kosmetyką. Bez niego Vue porównuje listę po pozycji i przy wstawieniu na początek podmienia zawartość wszystkich elementów zamiast przesunąć węzły. Efekt widać przy zachowanym stanie DOM: przewinięcie, zaznaczenie tekstu, wpisana wartość w inpucie albo aktywna animacja przeskakują do złego wiersza. Indeks jako klucz jest równie zły jak brak klucza, gdy lista się sortuje albo z niej usuwamy.</p>' +
            '<p><code>v-if</code> kontra <code>v-show</code>: pierwsze montuje i odmontowuje komponent (koszt przy przełączaniu, zero kosztu gdy ukryte, stan wewnętrzny znika), drugie tylko przełącza <code>display</code> (koszt pamięci zawsze, przełączanie darmowe, stan zostaje). Dla zakładki przełączanej co sekundę wybierz <code>v-show</code>, dla ciężkiego modala <code>v-if</code>.</p>' +
            '<p>I mała pułapka: w Vue 3 <code>v-if</code> ma wyższy priorytet niż <code>v-for</code> na tym samym elemencie (w Vue 2 było odwrotnie), więc warunek nie widzi zmiennej z pętli. Owiń pętlę w <code>&lt;template v-for&gt;</code>.</p>',
          en: '<p>An SFC template is compiled into a render function at build time (<code>@vue/compiler-sfc</code> inside Vite), not parsed in the browser. That unlocks optimizations JSX cannot do without an extra compiler.</p>' +
            '<ul>' +
            '<li><strong>Hoisting</strong> - nodes and props without expressions are created once, outside the render function.</li>' +
            '<li><strong>Patch flags</strong> - an element with one dynamic attribute gets a numeric flag, and the runtime compares only that field instead of the whole props object.</li>' +
            '<li><strong>Block tree</strong> - dynamic descendants are flattened into one array, so diffing is linear in the number of dynamic nodes rather than the whole subtree.</li>' +
            '<li><strong>Cached handlers</strong> - <code>@click="fn(x)"</code> does not allocate a new function on every render.</li>' +
            '</ul>' +
            '<pre><code>&lt;template&gt;\n  &lt;li v-for="user in users" :key="user.id" :class="{ active: user.id === selectedId }"&gt;\n    {{ user.name }}\n  &lt;/li&gt;\n&lt;/template&gt;</code></pre>' +
            '<p><code>key</code> is not cosmetic. Without it Vue diffs the list by position, so inserting at the front patches the content of every element instead of moving nodes. The damage shows up in preserved DOM state: scroll position, text selection, a typed input value or a running animation jump to the wrong row. Using the index as a key is as bad as no key once the list sorts or removes items.</p>' +
            '<p><code>v-if</code> versus <code>v-show</code>: the first mounts and unmounts (cost on toggle, zero cost while hidden, internal state discarded), the second only toggles <code>display</code> (memory cost always, free toggling, state preserved). For a tab flipped every second pick <code>v-show</code>; for a heavy modal pick <code>v-if</code>.</p>' +
            '<p>One trap: in Vue 3 <code>v-if</code> has higher priority than <code>v-for</code> on the same element (the opposite of Vue 2), so the condition cannot see the loop variable. Wrap the loop in <code>&lt;template v-for&gt;</code>.</p>'
        },
        pro: {
          pl: '<p>Znajomość wyjścia kompilatora zmienia sposób pisania szablonów w bibliotece komponentów. Warto raz wkleić własny szablon do Vue SFC Playground i przeczytać wygenerowany kod - to najszybsza droga do zrozumienia, dlaczego jeden zapis jest darmowy, a inny kosztuje przy każdym renderze.</p>' +
            '<h4>Co psuje optymalizacje kompilatora</h4>' +
            '<ul>' +
            '<li><code>v-bind="attrs"</code> bez konkretnych kluczy wymusza <code>FULL_PROPS</code> - runtime porównuje cały obiekt propsów. W komponentach opakowujących to często konieczne, ale świadomie.</li>' +
            '<li>Dynamiczne nazwy argumentów (<code>:[key]="v"</code>) i <code>v-html</code> wyłączają część statycznej analizy dla węzła.</li>' +
            '<li><code>&lt;component :is&gt;</code> tworzy blok niestabilny (<code>BAIL</code>), więc poddrzewo traci block tree.</li>' +
            '<li>Wyrażenia z efektem ubocznym albo z <code>Math.random()</code> w szablonie łamią cache handlerów i memoizację.</li>' +
            '</ul>' +
            '<h4>Rzeczy, które w design systemie oszczędzają godziny</h4>' +
            '<pre><code>&lt;!-- fragment ze stabilnym kluczem i pominieciem diffu --&gt;\n&lt;tr v-for="row in rows" :key="row.id" v-memo="[row.id, row.selected]"&gt;\n  &lt;td&gt;{{ row.name }}&lt;/td&gt;\n  &lt;td&gt;&lt;Badge :state="row.state" /&gt;&lt;/td&gt;\n&lt;/tr&gt;</code></pre>' +
            '<ul>' +
            '<li><code>v-memo</code> pomija patch całego poddrzewa, gdy tablica zależności się nie zmieniła. Ma sens tylko na dużych listach (tysiące wierszy); wszędzie indziej to koszt bez zysku i łatwe źródło nieaktualnego UI.</li>' +
            '<li>Modyfikatory zdarzeń (<code>.stop</code>, <code>.prevent</code>, <code>.self</code>, <code>.passive</code>, <code>.capture</code>) są kompilowane do opakowań albo do opcji listenera, więc <code>.passive</code> naprawdę trafia do <code>addEventListener</code> - to realna optymalizacja scrolla na mobile.</li>' +
            '<li><code>v-model</code> na komponencie to cukier na propa i zdarzenie <code>update:modelValue</code>, z modyfikatorami <code>.lazy</code>, <code>.number</code>, <code>.trim</code> oraz własnymi, które czytasz z <code>modelModifiers</code>.</li>' +
            '<li>Kolejność w <code>class</code> i <code>style</code>: obiekt i tablica są scalane, ale przy konflikcie wygrywa późniejszy wpis - przy nadpisywaniu stylów motywu w komponentach CHI to najczęstsza przyczyna "nie działa moja klasa".</li>' +
            '<li>Atrybuty przechodnie (fallthrough) trafiają na jeden element główny; przy wielu korzeniach musisz jawnie związać <code>v-bind="$attrs"</code> albo ustawić <code>inheritAttrs: false</code>.</li>' +
            '</ul>' +
            '<h4>Wydajność w liczbach</h4>' +
            '<p>Dla listy 1000 wierszy z jednym dynamicznym polem różnica między naiwnym diffem a block tree z patch flagami to zwykle kilkukrotnie mniej pracy w fazie patchowania. Ale jeśli twoim wąskim gardłem jest layout albo ciężki komponent liścia, żadna z tych flag nie pomoże - najpierw zmierz w zakładce Performance, potem optymalizuj. Dobra kolejność działań na wolnej liście to: klucze, potem wirtualizacja, potem <code>shallowRef</code> na danych, a <code>v-memo</code> dopiero na końcu.</p>',
          en: '<p>Knowing the compiler output changes how you write templates in a component library. Paste one of your own templates into the Vue SFC Playground once and read the generated code - it is the fastest way to see why one form is free and another costs on every render.</p>' +
            '<h4>What defeats compiler optimizations</h4>' +
            '<ul>' +
            '<li><code>v-bind="attrs"</code> without explicit keys forces <code>FULL_PROPS</code>, so the runtime diffs the whole props object. In wrapper components that is often necessary, but make it a decision.</li>' +
            '<li>Dynamic argument names (<code>:[key]="v"</code>) and <code>v-html</code> disable part of the static analysis for that node.</li>' +
            '<li><code>&lt;component :is&gt;</code> produces an unstable block (<code>BAIL</code>), so the subtree loses its block tree.</li>' +
            '<li>Expressions with side effects or <code>Math.random()</code> in the template break handler caching and memoization.</li>' +
            '</ul>' +
            '<h4>Things that save hours in a design system</h4>' +
            '<pre><code>&lt;!-- stable key plus a skipped patch --&gt;\n&lt;tr v-for="row in rows" :key="row.id" v-memo="[row.id, row.selected]"&gt;\n  &lt;td&gt;{{ row.name }}&lt;/td&gt;\n  &lt;td&gt;&lt;Badge :state="row.state" /&gt;&lt;/td&gt;\n&lt;/tr&gt;</code></pre>' +
            '<ul>' +
            '<li><code>v-memo</code> skips patching a whole subtree when its dependency array is unchanged. It pays off only on big lists (thousands of rows); anywhere else it is cost without benefit and an easy source of stale UI.</li>' +
            '<li>Event modifiers (<code>.stop</code>, <code>.prevent</code>, <code>.self</code>, <code>.passive</code>, <code>.capture</code>) compile to wrappers or listener options, so <code>.passive</code> genuinely reaches <code>addEventListener</code> - a real mobile scroll win.</li>' +
            '<li><code>v-model</code> on a component is sugar over a prop plus an <code>update:modelValue</code> event, with <code>.lazy</code>, <code>.number</code>, <code>.trim</code> and custom modifiers you read from <code>modelModifiers</code>.</li>' +
            '<li>Merge order in <code>class</code> and <code>style</code>: objects and arrays are merged, but on conflict the later entry wins - the number one cause of "my class does not apply" when overriding theme styles in CHI components.</li>' +
            '<li>Fallthrough attributes land on a single root element; with multiple roots you must bind <code>v-bind="$attrs"</code> explicitly or set <code>inheritAttrs: false</code>.</li>' +
            '</ul>' +
            '<h4>Performance in numbers</h4>' +
            '<p>For a 1000-row list with one dynamic field, the gap between a naive diff and a block tree with patch flags is typically several times less work in the patch phase. But if your bottleneck is layout or a heavy leaf component, no flag helps - measure in the Performance panel first, optimize second. A good order of attack on a slow list is: keys, then virtualization, then <code>shallowRef</code> on the data, and only then <code>v-memo</code>.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Element w szablonie ma tylko jeden dynamiczny atrybut. Co robi z nim kompilator?',
            en: 'A template element has exactly one dynamic attribute. What does the compiler do with it?'
          },
          options: [
            { pl: 'Nadaje mu patch flag, dzięki czemu runtime porównuje tylko to jedno pole', en: 'It attaches a patch flag so the runtime compares only that one field' },
            { pl: 'Traktuje cały element jako dynamiczny i porównuje wszystkie atrybuty', en: 'It treats the whole element as dynamic and diffs all attributes' },
            { pl: 'Wyciąga element poza render, bo większość atrybutów jest statyczna', en: 'It hoists the element out of the render since most attributes are static' },
            { pl: 'Zamienia go na komponent funkcyjny', en: 'It converts it into a functional component' }
          ],
          correct: 0,
          explain: {
            pl: 'Patch flag to liczba mówiąca runtime, co dokładnie może się zmienić - w tym wypadku jedno pole. Statyczne atrybuty są przy okazji wyciągane poza render.',
            en: 'A patch flag is a number telling the runtime exactly what can change - here a single field. Static attributes are hoisted out of the render along the way.'
          }
        },
        {
          q: {
            pl: 'Renderujesz listę z v-for bez :key i wstawiasz nowy element na początku. Co pójdzie nie tak?',
            en: 'You render a v-for list without :key and insert a new item at the front. What breaks?'
          },
          options: [
            { pl: 'Vue rzuci błąd i nie wyrenderuje listy', en: 'Vue throws an error and refuses to render the list' },
            { pl: 'Lista wyrenderuje się poprawnie, ale stan DOM (focus, wpisane wartości, animacje) przypnie się do złych wierszy', en: 'The list renders correctly, but DOM state (focus, typed values, animations) sticks to the wrong rows' },
            { pl: 'Wszystkie węzły zostaną zniszczone i utworzone od nowa', en: 'Every node is destroyed and recreated' },
            { pl: 'Kolejność elementów odwróci się', en: 'The order of the items gets reversed' }
          ],
          correct: 1,
          explain: {
            pl: 'Bez klucza diff idzie po pozycjach, więc Vue patchuje treść istniejących węzłów zamiast je przesuwać. Tekst będzie dobry, ale stan trzymany w DOM zostanie w starym miejscu.',
            en: 'Without keys the diff goes by position, so Vue patches existing nodes instead of moving them. The text ends up right, but state held in the DOM stays where it was.'
          }
        },
        {
          q: {
            pl: 'Panel filtrów jest przełączany kilka razy na minutę, zawiera formularz i jest lekki. v-if czy v-show?',
            en: 'A filter panel is toggled several times a minute, contains a form and is lightweight. v-if or v-show?'
          },
          options: [
            { pl: 'v-if, bo zawsze oszczędza pamięć', en: 'v-if, because it always saves memory' },
            { pl: 'Bez różnicy, oba działają identycznie', en: 'No difference, they behave identically' },
            { pl: 'v-show, bo przełączanie jest tanie i zachowuje wpisane wartości formularza', en: 'v-show, because toggling is cheap and it preserves the typed form values' },
            { pl: 'v-if z transition, bo tylko tak działa animacja', en: 'v-if with a transition, because animation only works that way' }
          ],
          correct: 2,
          explain: {
            pl: 'v-if odmontowuje komponent, więc wpisane dane znikają, a każde otwarcie kosztuje montowanie. v-show przełącza tylko display. Transition działa z obydwoma.',
            en: 'v-if unmounts the component, so typed data disappears and each open costs a mount. v-show only toggles display, and Transition works with both.'
          }
        },
        {
          q: {
            pl: 'Komponent-wrapper przekazuje dalej v-bind="$attrs" i nagle patchowanie zrobiło się wolniejsze. Dlaczego?',
            en: 'A wrapper component forwards v-bind="$attrs" and patching suddenly got slower. Why?'
          },
          options: [
            { pl: 'Bo $attrs jest głęboko reaktywne i wymusza deep watch', en: 'Because $attrs is deeply reactive and forces a deep watch' },
            { pl: 'Bo atrybuty przechodnie wyłączają kompilację szablonu', en: 'Because fallthrough attributes disable template compilation' },
            { pl: 'Bo $attrs zawsze wymusza pełne przemontowanie poddrzewa', en: 'Because $attrs always forces a full remount of the subtree' },
            { pl: 'Bo v-bind bez konkretnych kluczy ustawia FULL_PROPS i runtime porównuje cały obiekt propsów', en: 'Because v-bind without explicit keys sets FULL_PROPS, so the runtime diffs the entire props object' }
          ],
          correct: 3,
          explain: {
            pl: 'Rozproszenie nieznanych kluczy uniemożliwia statyczną analizę, więc znika optymalizacja pojedynczego pola. W komponentach opakowujących to często cena do zapłacenia - warto ją tylko znać.',
            en: 'Spreading unknown keys defeats static analysis, so the single-field optimization disappears. In wrapper components that is often a price worth paying, as long as you know you are paying it.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 6
    {
      id: 'sfc-script-setup',
      title: {
        pl: 'SFC i script setup od kuchni',
        en: 'SFC and script setup under the hood'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'script setup', en: 'script setup' },
          def: { pl: 'Tryb kompilacji SFC, w którym całe <code>&lt;script&gt;</code> staje się ciałem <code>setup()</code>, a szablon kompiluje się do inline render function w tym samym zakresie - bez proxy <code>this</code>.', en: 'The SFC compilation mode where the whole <code>&lt;script&gt;</code> becomes the <code>setup()</code> body and the template compiles to an inline render function in the same scope - no <code>this</code> proxy.' }
        },
        {
          term: { pl: 'Deklaracja propsów przez typ', en: 'Type-based props declaration' },
          def: { pl: '<code>defineProps&lt;{ ... }&gt;()</code> - kompilator generuje opcje runtime z tego, co potrafi rozwiązać statycznie. Złożone typy degradują się do <code>null</code>, więc walidacja runtime jest słabsza niż sugeruje TypeScript.', en: '<code>defineProps&lt;{ ... }&gt;()</code> - the compiler generates runtime options from what it can statically resolve. Complex types degrade to <code>null</code>, so runtime validation is weaker than TypeScript suggests.' }
        },
        {
          term: { pl: 'defineExpose', en: 'defineExpose' },
          def: { pl: 'Instancja <code>&lt;script setup&gt;</code> jest domyślnie zamknięta, więc <code>ref</code> rodzica nic nie widzi. <code>defineExpose</code> to jawne publiczne API komponentu dla template refs i testów.', en: 'A <code>&lt;script setup&gt;</code> instance is closed by default, so a parent template ref sees nothing. <code>defineExpose</code> is the component explicit public API for template refs and tests.' }
        },
        {
          term: { pl: 'Nazwa komponentu', en: 'Component name' },
          def: { pl: 'Wnioskowana z nazwy pliku; wpływa na rekurencję, DevTools i <code>KeepAlive</code> z <code>include</code>. W plikach generowanych ustaw ją jawnie przez <code>defineOptions({ name })</code>.', en: 'Inferred from the filename; it affects recursion, DevTools and <code>KeepAlive</code> with <code>include</code>. In generated files set it explicitly via <code>defineOptions({ name })</code>.' }
        },
        {
          term: { pl: 'Top-level await', en: 'Top-level await' },
          def: { pl: '<code>await</code> na najwyższym poziomie <code>&lt;script setup&gt;</code> zamienia komponent w asynchroniczny i wymaga granicy <code>&lt;Suspense&gt;</code> wyżej w drzewie.', en: 'An <code>await</code> at the top level of <code>&lt;script setup&gt;</code> turns the component async and requires a <code>&lt;Suspense&gt;</code> boundary above it.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="vm6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="24" width="200" height="200" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="120" y="52" text-anchor="middle" font-size="16" fill="var(--text)">Component.vue</text>' +
          '<text x="120" y="84" text-anchor="middle" font-size="14" fill="var(--accent)">template</text>' +
          '<text x="120" y="112" text-anchor="middle" font-size="14" fill="var(--accent2)">script setup</text>' +
          '<text x="120" y="140" text-anchor="middle" font-size="14" fill="var(--muted)">script (options)</text>' +
          '<text x="120" y="168" text-anchor="middle" font-size="14" fill="var(--warn)">style scoped</text>' +
          '<text x="120" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">one file, four blocks</text>' +
          '<line x1="220" y1="124" x2="264" y2="124" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm6a)"/>' +
          '<text x="242" y="106" text-anchor="middle" font-size="13" fill="var(--muted)">vite</text>' +
          '<rect x="268" y="24" width="180" height="200" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="358" y="52" text-anchor="middle" font-size="16" fill="var(--text)">compiler-sfc</text>' +
          '<text x="358" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">macros erased</text>' +
          '<text x="358" y="110" text-anchor="middle" font-size="13" fill="var(--muted)">bindings analyzed</text>' +
          '<text x="358" y="136" text-anchor="middle" font-size="13" fill="var(--muted)">template inlined</text>' +
          '<text x="358" y="162" text-anchor="middle" font-size="13" fill="var(--muted)">scope id added</text>' +
          '<text x="358" y="196" text-anchor="middle" font-size="13" fill="var(--muted)">build time only</text>' +
          '<line x1="448" y1="124" x2="492" y2="124" stroke="var(--accent)" stroke-width="2" marker-end="url(#vm6a)"/>' +
          '<rect x="496" y="24" width="124" height="200" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="558" y="52" text-anchor="middle" font-size="16" fill="var(--text)">JS object</text>' +
          '<text x="558" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">props</text>' +
          '<text x="558" y="110" text-anchor="middle" font-size="13" fill="var(--muted)">emits</text>' +
          '<text x="558" y="136" text-anchor="middle" font-size="13" fill="var(--muted)">setup()</text>' +
          '<text x="558" y="162" text-anchor="middle" font-size="13" fill="var(--muted)">render()</text>' +
          '<text x="558" y="196" text-anchor="middle" font-size="13" fill="var(--muted)">__scopeId</text>' +
          '<rect x="60" y="262" width="520" height="94" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="292" text-anchor="middle" font-size="15" fill="var(--text)">setup() body runs once per instance</text>' +
          '<text x="320" y="316" text-anchor="middle" font-size="13" fill="var(--muted)">render runs many times, bindings are closed over, nothing is exported</text>' +
          '<text x="320" y="340" text-anchor="middle" font-size="13" fill="var(--muted)">defineExpose is the only public surface for template refs</text>' +
          '</svg>',
        caption: {
          pl: 'script setup nie jest cukrem składniowym w runtime: kompilator wycina makra, analizuje wiązania i wstawia szablon jako funkcję renderującą wewnątrz setup.',
          en: 'script setup is not runtime sugar: the compiler erases the macros, analyzes bindings and inlines the template as a render function inside setup.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie przepis kucharski zapisany na jednej kartce: na górze wygląd dania, w środku lista czynności, na dole opis, jak ma być podane. Wszystko w jednym miejscu, więc nie musisz biegać po trzech szufladach.</p>' +
            '<p>Zanim kucharz zabierze się do pracy, ktoś przepisuje tę kartkę na czystą instrukcję dla maszyny. Skróty typu "jak zwykle" zamienia na konkretne kroki, a rzeczy, które są tylko notatką dla człowieka, w ogóle znikają.</p>' +
            '<p>Ważne: część "lista czynności" wykonuje się raz, kiedy danie zaczyna powstawać. Część "jak podać" powtarza się przy każdym talerzu. Kto tego nie rozróżnia, dziwi się, czemu jego czynność wykonała się tylko jeden raz.</p>' +
            '<p>Na koniec kartka dostaje pieczątkę, żeby jej style nie mieszały się z innymi przepisami w kuchni.</p>',
          en: '<p>Picture a recipe written on a single card: the look of the dish at the top, the list of steps in the middle, plating notes at the bottom. Everything in one place, so you never dig through three drawers.</p>' +
            '<p>Before the cook starts, somebody rewrites that card into clean machine instructions. Shortcuts like "as usual" become concrete steps, and notes meant only for humans disappear entirely.</p>' +
            '<p>Important: the list of steps runs once, when the dish starts coming together. The plating part repeats for every single plate. People who miss that distinction wonder why their step only happened once.</p>' +
            '<p>Finally the card gets a stamp, so its styling does not bleed into the other recipes in the kitchen.</p>'
        },
        school: {
          pl: '<p><code>&lt;script setup&gt;</code> to składnia czasu kompilacji. Ciało bloku staje się ciałem funkcji <code>setup()</code>, a szablon jest wstawiany jako funkcja renderująca w tym samym domknięciu. Dlatego nie musisz niczego zwracać: kompilator wie, jakie wiązania istnieją, i sam podaje je szablonowi.</p>' +
            '<pre><code>&lt;script setup lang="ts"&gt;\nconst props = defineProps&lt;{ items: Item[]; dense?: boolean }&gt;()\nconst emit = defineEmits&lt;{ select: [id: string] }&gt;()\nconst model = defineModel&lt;string&gt;({ default: \'\' })\ndefineOptions({ inheritAttrs: false })\n&lt;/script&gt;</code></pre>' +
            '<p>Makra (<code>defineProps</code>, <code>defineEmits</code>, <code>defineModel</code>, <code>defineExpose</code>, <code>defineOptions</code>, <code>defineSlots</code>) nie są importowane i nie istnieją w runtime - są wycinane i zamieniane na pola obiektu komponentu. Stąd ograniczenie: ich argumenty nie mogą używać zmiennych lokalnych, bo są przenoszone poza zakres setup.</p>' +
            '<p>Najważniejsza rzecz do zapamiętania: <strong>ciało setup wykonuje się raz na instancję</strong>. Nie ma tu odpowiednika reguł hooków z Reacta ani problemu nieaktualnego domknięcia, bo funkcja nie jest uruchamiana przy każdym renderze. Reaktywność jest w refach, nie w kolejności wywołań.</p>' +
            '<p>Komponent z <code>&lt;script setup&gt;</code> jest domyślnie <em>zamknięty</em>: rodzic z refem na komponent nie dostanie się do wnętrza, dopóki nie wystawisz API przez <code>defineExpose({ focus })</code>. Dla biblioteki komponentów to zaleta - imperatywna powierzchnia jest jawną, wersjonowaną decyzją.</p>' +
            '<p><code>&lt;style scoped&gt;</code> dopisuje atrybut <code>data-v-hash</code> do węzłów komponentu i dokleja go do selektorów. Elementy w slotach należą do rodzica, więc reguły dziecka ich nie dosięgną - do tego jest <code>:slotted()</code>, a do celowego wyjścia poza zakres <code>:deep()</code>.</p>',
          en: '<p><code>&lt;script setup&gt;</code> is compile-time syntax. The block body becomes the body of <code>setup()</code>, and the template is inlined as a render function in the same closure. That is why you return nothing: the compiler knows which bindings exist and hands them to the template itself.</p>' +
            '<pre><code>&lt;script setup lang="ts"&gt;\nconst props = defineProps&lt;{ items: Item[]; dense?: boolean }&gt;()\nconst emit = defineEmits&lt;{ select: [id: string] }&gt;()\nconst model = defineModel&lt;string&gt;({ default: \'\' })\ndefineOptions({ inheritAttrs: false })\n&lt;/script&gt;</code></pre>' +
            '<p>The macros (<code>defineProps</code>, <code>defineEmits</code>, <code>defineModel</code>, <code>defineExpose</code>, <code>defineOptions</code>, <code>defineSlots</code>) are not imported and do not exist at runtime - they are erased and turned into fields of the component object. Hence the restriction: their arguments cannot reference local variables, because they are hoisted out of the setup scope.</p>' +
            '<p>The key thing to internalize: <strong>the setup body runs once per instance</strong>. There is no equivalent of the rules of hooks and no stale-closure problem, because the function is not re-invoked on every render. Reactivity lives in refs, not in call order.</p>' +
            '<p>A <code>&lt;script setup&gt;</code> component is <em>closed</em> by default: a parent holding a template ref sees nothing inside until you expose an API with <code>defineExpose({ focus })</code>. For a component library that is a feature - the imperative surface becomes an explicit, versioned decision.</p>' +
            '<p><code>&lt;style scoped&gt;</code> adds a <code>data-v-hash</code> attribute to the component nodes and appends it to selectors. Slot content belongs to the parent, so child rules do not reach it - that is what <code>:slotted()</code> is for, and <code>:deep()</code> for deliberately escaping the scope.</p>'
        },
        pro: {
          pl: '<p>Dla kogoś, kto utrzymuje bibliotekę komponentów, <code>&lt;script setup&gt;</code> to przede wszystkim narzędzie do projektowania publicznego API i do typowania, a dopiero potem wygoda zapisu.</p>' +
            '<h4>Typowanie, które faktycznie działa</h4>' +
            '<ul>' +
            '<li>Deklaracja propsów przez typ generuje walidację w runtime tylko z tego, co kompilator umie rozwiązać. Od 3.3 działają importowane i proste generyczne typy, ale skomplikowane mapowane typy nadal warto spłaszczyć w alias.</li>' +
            '<li>Wartości domyślne przy typowanych propsach: <code>withDefaults()</code> albo, od 3.5, destrukturyzacja propsów z domyślnymi (<code>const { dense = false } = defineProps...</code>), która pozostaje reaktywna dzięki transformacji kompilatora.</li>' +
            '<li>Składnia emitów oparta na krotkach (<code>{ select: [id: string] }</code>) jest krótsza i lepiej się czyta w wygenerowanej dokumentacji niż stara sygnatura wywołania.</li>' +
            '<li>Komponenty generyczne: <code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;</code> - jedyny sposób na w pełni typowaną tabelę czy select bez rzutowań u konsumenta.</li>' +
            '<li><code>defineSlots&lt;{ default(props: { row: T }): any }&gt;()</code> daje podpowiedzi slotów w Volar, co dla design systemu jest większym zyskiem niż typowanie samych propsów.</li>' +
            '</ul>' +
            '<pre><code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;\nconst props = defineProps&lt;{ rows: T[] }&gt;()\ndefineSlots&lt;{ cell(p: { row: T }): any }&gt;()\ndefineExpose({ scrollToRow })\n\nfunction scrollToRow(id: string) { /* ... */ }\n&lt;/script&gt;</code></pre>' +
            '<h4>Pułapki i kompromisy</h4>' +
            '<ul>' +
            '<li>Nie da się dynamicznie zmienić deklaracji propsów w runtime - jeśli naprawdę potrzebujesz obiektu propsów budowanego programowo (na przykład wspólny zestaw dla dziesięciu wariantów), zostaje zwykły <code>defineComponent</code> albo złożenie w drugim bloku <code>&lt;script&gt;</code>.</li>' +
            '<li>Dwa bloki skryptu współistnieją: zwykły <code>&lt;script&gt;</code> wykonuje się raz na moduł i nadaje się na stałe, typy i efekty jednorazowe. Odkąd jest <code>defineOptions</code>, potrzeba drugiego bloku znacznie zmalała.</li>' +
            '<li>Nazwa komponentu wywodzi się z nazwy pliku i wpływa na rekurencję, DevTools oraz <code>KeepAlive</code> z <code>include</code>. Przy generowanych plikach ustaw ją jawnie przez <code>defineOptions({ name })</code>.</li>' +
            '<li>Kod na najwyższym poziomie bloku wykonuje się przy każdym montowaniu, także pod SSR. Wszystko, co dotyka <code>window</code>, <code>document</code> czy <code>localStorage</code>, musi być za <code>onMounted</code> albo za sprawdzeniem <code>import.meta.env.SSR</code>.</li>' +
            '<li><code>await</code> na najwyższym poziomie zamienia komponent w asynchroniczny i wymaga <code>&lt;Suspense&gt;</code> u rodzica; po wznowieniu kontekst instancji jest przywracany, ale rejestracja cyklu życia po pierwszym await bywa zawodna.</li>' +
            '<li>Wydajność stylów: <code>:deep()</code> w bibliotece to zaproszenie dla konsumentów do przypadkowego łamania waszego DOM przy każdej refaktoryzacji. Bezpieczniejsze są zmienne CSS jako publiczny kontrakt motywu plus <code>v-bind()</code> w bloku style, który kompiluje się do zmiennej CSS aktualizowanej reaktywnie.</li>' +
            '</ul>' +
            '<p>W rozmowie rekrutacyjnej wdzięcznym pytaniem jest różnica względem Reacta: tam funkcja komponentu jest zarazem renderem, więc każda zmienna lokalna jest tworzona od nowa i potrzebujesz <code>useCallback</code> i <code>useMemo</code>. Tu setup wykonuje się raz, a render jest osobnym domknięciem - stąd brak memoizacji ręcznej i brak zależności hooków.</p>',
          en: '<p>For anyone maintaining a component library, <code>&lt;script setup&gt;</code> is primarily a tool for designing public API and types, and only secondarily a shorthand.</p>' +
            '<h4>Typing that actually works</h4>' +
            '<ul>' +
            '<li>Type-based prop declaration generates runtime validation only from what the compiler can resolve. Imported and simple generic types work since 3.3, but elaborate mapped types are still worth flattening into an alias.</li>' +
            '<li>Defaults with typed props: <code>withDefaults()</code>, or since 3.5 reactive props destructure with defaults (<code>const { dense = false } = defineProps...</code>), which stays reactive thanks to a compiler transform.</li>' +
            '<li>The tuple emit syntax (<code>{ select: [id: string] }</code>) is shorter and reads better in generated docs than the old call-signature form.</li>' +
            '<li>Generic components: <code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;</code> - the only way to build a fully typed table or select without casts on the consumer side.</li>' +
            '<li><code>defineSlots&lt;{ default(props: { row: T }): any }&gt;()</code> gives slot autocompletion in Volar, which for a design system is worth more than typing the props themselves.</li>' +
            '</ul>' +
            '<pre><code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;\nconst props = defineProps&lt;{ rows: T[] }&gt;()\ndefineSlots&lt;{ cell(p: { row: T }): any }&gt;()\ndefineExpose({ scrollToRow })\n\nfunction scrollToRow(id: string) { /* ... */ }\n&lt;/script&gt;</code></pre>' +
            '<h4>Traps and trade-offs</h4>' +
            '<ul>' +
            '<li>Prop declarations cannot be built dynamically at runtime. If you genuinely need a programmatically assembled props object (a shared set across ten variants, say), fall back to plain <code>defineComponent</code> or compose it in a second <code>&lt;script&gt;</code> block.</li>' +
            '<li>The two script blocks coexist: a plain <code>&lt;script&gt;</code> runs once per module and suits constants, types and one-off side effects. Since <code>defineOptions</code> exists, the need for it has shrunk a lot.</li>' +
            '<li>The component name is inferred from the filename and affects recursion, DevTools and <code>KeepAlive</code> with <code>include</code>. For generated files set it explicitly via <code>defineOptions({ name })</code>.</li>' +
            '<li>Top-level code runs on every mount, including under SSR. Anything touching <code>window</code>, <code>document</code> or <code>localStorage</code> belongs behind <code>onMounted</code> or an <code>import.meta.env.SSR</code> check.</li>' +
            '<li>A top-level <code>await</code> turns the component async and requires a <code>&lt;Suspense&gt;</code> ancestor. The instance context is restored after resuming, but registering lifecycle hooks after the first await is fragile.</li>' +
            '<li>Style surface: shipping <code>:deep()</code> in a library invites consumers to depend on your internal DOM and break on every refactor. CSS variables as the public theming contract are safer, plus <code>v-bind()</code> in the style block, which compiles to a reactively updated CSS variable.</li>' +
            '</ul>' +
            '<p>A rewarding interview answer is the contrast with React: there the component function is also the render, so every local is recreated and you reach for <code>useCallback</code> and <code>useMemo</code>. Here setup runs once and the render is a separate closure - hence no manual memoization and no hook dependency arrays.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ile razy wykonuje się ciało bloku script setup dla jednej instancji komponentu?',
            en: 'How many times does the body of a script setup block run for one component instance?'
          },
          options: [
            { pl: 'Przy każdym renderze, jak funkcja komponentu w React', en: 'On every render, like a React component function' },
            { pl: 'Raz przy montowaniu i raz przy odmontowaniu', en: 'Once on mount and once on unmount' },
            { pl: 'Dokładnie raz, przy tworzeniu instancji', en: 'Exactly once, when the instance is created' },
            { pl: 'Raz na moduł, wspólnie dla wszystkich instancji', en: 'Once per module, shared across all instances' }
          ],
          correct: 2,
          explain: {
            pl: 'setup jest odpowiednikiem konstruktora instancji, a render to osobna funkcja w tym samym domknięciu. Dlatego w Vue nie ma problemu nieaktualnych domknięć ani reguł hooków.',
            en: 'setup acts as the instance constructor while the render is a separate function in the same closure. That is why Vue has no stale-closure problem and no rules of hooks.'
          }
        },
        {
          q: {
            pl: 'Rodzic trzyma template ref na twój komponent z script setup i próbuje wywołać jego metodę open(). Nic nie znajduje. Dlaczego?',
            en: 'A parent holds a template ref to your script setup component and calls its open() method, but finds nothing. Why?'
          },
          options: [
            { pl: 'Bo komponenty z script setup są domyślnie zamknięte i wymagają defineExpose', en: 'Because script setup components are closed by default and require defineExpose' },
            { pl: 'Bo template refy działają tylko na elementach DOM', en: 'Because template refs only work on DOM elements' },
            { pl: 'Bo metoda musi być refem, a nie zwykłą funkcją', en: 'Because the method must be a ref, not a plain function' },
            { pl: 'Bo rodzic czyta ref przed onMounted', en: 'Because the parent reads the ref before onMounted' }
          ],
          correct: 0,
          explain: {
            pl: 'Kompilator nie eksportuje wiązań na zewnątrz. Publiczne API imperatywne deklarujesz jawnie przez defineExpose - co dla biblioteki komponentów jest zaletą, nie przeszkodą.',
            en: 'The compiler does not export bindings outward. The imperative public API is declared explicitly with defineExpose, which for a component library is a feature rather than friction.'
          }
        },
        {
          q: {
            pl: 'Dlaczego defineProps nie może użyć zmiennej zadeklarowanej wyżej w tym samym bloku?',
            en: 'Why can defineProps not reference a variable declared above it in the same block?'
          },
          options: [
            { pl: 'Bo props są tylko do odczytu', en: 'Because props are read-only' },
            { pl: 'Bo makro jest wycinane i jego argument ląduje poza zakresem setup, na poziomie obiektu komponentu', en: 'Because the macro is erased and its argument is hoisted out of setup, onto the component object' },
            { pl: 'Bo TypeScript nie umie tego wywnioskować', en: 'Because TypeScript cannot infer it' },
            { pl: 'Bo defineProps działa dopiero po zamontowaniu', en: 'Because defineProps only runs after mount' }
          ],
          correct: 1,
          explain: {
            pl: 'Makra nie istnieją w runtime - kompilator zamienia je na pola definicji komponentu, która powstaje przed wykonaniem setup. Stąd wymóg literałów i importowanych typów.',
            en: 'Macros do not exist at runtime: the compiler turns them into fields of the component definition, which is created before setup runs. Hence the requirement for literals and imported types.'
          }
        },
        {
          q: {
            pl: 'Piszesz w design systemie komponent tabeli, który ma być w pełni typowany dla dowolnego kształtu wiersza, razem z podpowiedziami slotu na komórkę. Co wybierasz?',
            en: 'You are building a design-system table component that must be fully typed for any row shape, including autocomplete for the cell slot. What do you pick?'
          },
          options: [
            { pl: 'defineProps z typem Record<string, unknown> i rzutowania u konsumenta', en: 'defineProps with Record<string, unknown> and casts on the consumer side' },
            { pl: 'Options API z propsem typu Array i ręczną dokumentacją slotów', en: 'Options API with an Array prop and hand-written slot docs' },
            { pl: 'Zwykły defineComponent z setup(), bo generyki nie działają w SFC', en: 'A plain defineComponent with setup(), since generics do not work in SFCs' },
            { pl: 'script setup z atrybutem generic plus defineSlots dla typowanego slotu', en: 'script setup with the generic attribute plus defineSlots for the typed slot' }
          ],
          correct: 3,
          explain: {
            pl: 'Atrybut generic w bloku script setup przenosi parametr typu na cały komponent, a defineSlots typuje propsy slotu - razem dają pełne podpowiedzi w Volar bez rzutowań u konsumenta.',
            en: 'The generic attribute on script setup lifts the type parameter to the whole component, and defineSlots types the slot props - together they give full Volar autocompletion with no consumer-side casts.'
          }
        }
      ]
    }
  ]
};
