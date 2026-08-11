export default {
  id: 'performance-testing',
  order: 6,
  icon: '🚀',
  title: {
    pl: 'Wydajność i testowanie',
    en: 'Performance and testing'
  },
  description: {
    pl: 'Jak Vue naprawdę renderuje i jak to przyspieszyć, jak ciąć bundle, jak testować komponenty design systemu na wszystkich poziomach piramidy i co przyniesie Vapor Mode.',
    en: 'How Vue actually renders and how to speed it up, how to cut the bundle, how to test design-system components at every level of the pyramid, and what Vapor Mode changes.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'rendering-optimization-vmemo',
      title: {
        pl: 'Optymalizacja renderowania i v-memo',
        en: 'Rendering optimization and v-memo'
      },
      minutes: 13,
      terms: [
        {
          term: { pl: 'patch flags', en: 'patch flags' },
          def: {
            pl: 'Znaczniki generowane przez kompilator szablonów przy vnode, mówiące runtime, co dokładnie może się zmienić (klasa, tekst, propsy). Dzięki nim patch pomija statyczną część drzewa.',
            en: 'Markers the template compiler attaches to a vnode telling the runtime exactly what can change (class, text, props). They let the patch skip the static part of the tree.'
          }
        },
        {
          term: { pl: 'v-memo', en: 'v-memo' },
          def: {
            pl: 'Dyrektywa pomijająca aktualizację poddrzewa, dopóki żadna wartość z podanej listy się nie zmieni. Pominięcie w liście pola, które poddrzewo renderuje, zostawia nieaktualny widok.',
            en: 'A directive that skips updating a subtree until one of the listed values changes. Leaving out a field the subtree renders leaves stale content on screen.'
          }
        },
        {
          term: { pl: 'stabilność slotów', en: 'slot stability' },
          def: {
            pl: 'Slot bez warunków i bez domknięć na zmienny stan jest oznaczony jako <code>STABLE</code>, więc render rodzica nie wymusza renderu dziecka. <code>v-if</code> na <code>template</code> ze slotem to psuje.',
            en: 'A slot with no conditionals and no closures over changing state is marked <code>STABLE</code>, so a parent render does not force a child render. A <code>v-if</code> on the slot <code>template</code> breaks that.'
          }
        },
        {
          term: { pl: 'shallowRef z triggerRef', en: 'shallowRef with triggerRef' },
          def: {
            pl: 'Para dla dużych struktur danych: wartość trzymana bez proxy, a odświeżenie wymuszane ręcznie po mutacji. Zdejmuje koszt trackowania dziesiątek tysięcy pól.',
            en: 'The pair for large data structures: the value is held without a proxy and the refresh is forced manually after a mutation. It removes the cost of tracking tens of thousands of fields.'
          }
        },
        {
          term: { pl: 'wirtualizacja listy', en: 'list virtualisation' },
          def: {
            pl: 'Renderowanie tylko widocznych wierszy plus bufor. Przy tabelach na tysiące wierszy daje rząd wielkości więcej niż jakikolwiek mikro-tuning patchowania.',
            en: 'Rendering only the visible rows plus a buffer. On tables with thousands of rows it beats any micro-tuning of the patch path by an order of magnitude.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m6l1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Four gates between a state change and the DOM</text>' +
          '<rect x="30" y="45" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="50" y="72" fill="var(--text)" font-size="15">1. Effect scheduler</text>' +
          '<text x="50" y="94" fill="var(--muted)" font-size="13">dedupes the component render job inside one tick</text>' +
          '<line x1="320" y1="105" x2="320" y2="128" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l1a)"/>' +
          '<rect x="30" y="130" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="50" y="157" fill="var(--text)" font-size="15">2. shouldUpdateComponent</text>' +
          '<text x="50" y="179" fill="var(--muted)" font-size="13">same props and stable slots means the child never renders</text>' +
          '<line x1="320" y1="190" x2="320" y2="213" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l1a)"/>' +
          '<rect x="30" y="215" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="50" y="242" fill="var(--text)" font-size="15">3. v-memo / v-once cache</text>' +
          '<text x="50" y="264" fill="var(--muted)" font-size="13">deps unchanged means the old vnode subtree is reused as is</text>' +
          '<line x1="320" y1="275" x2="320" y2="298" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l1a)"/>' +
          '<rect x="30" y="300" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="50" y="327" fill="var(--text)" font-size="15">4. Patch flags + block tree</text>' +
          '<text x="50" y="349" fill="var(--muted)" font-size="13">only flagged dynamic bindings are compared, static nodes skipped</text>' +
          '<rect x="30" y="382" width="580" height="42" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="409" fill="var(--warn)" font-size="14" text-anchor="middle">Measure first: most slow lists fail at gate 2, not gate 4</text>' +
          '</svg>',
        caption: {
          pl: 'Aktualizacja przechodzi przez cztery bramki: scheduler, porównanie propsów, cache v-memo i patch flagi. Każda z nich potrafi zatrzymać pracę, zanim dotknie DOM.',
          en: 'An update passes four gates: the scheduler, the props comparison, the v-memo cache and patch flags. Each one can stop the work before it ever touches the DOM.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Ten sam wiersz listy przechodzi przez kolejne bramki - zobacz, gdzie praca faktycznie znika.',
          en: 'One list row walking through the gates - watch where the work actually disappears.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 1 of 5 - one field changes</text>' +
              '<rect x="30" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="150" y="78" fill="var(--text)" font-size="15" text-anchor="middle">rows[7].selected</text>' +
              '<text x="150" y="102" fill="var(--warn)" font-size="14" text-anchor="middle">false to true</text>' +
              '<rect x="370" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="490" y="78" fill="var(--text)" font-size="15" text-anchor="middle">Table render effect</text>' +
              '<text x="490" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">queued once</text>' +
              '<rect x="30" y="150" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="176" fill="var(--muted)" font-size="13">Gate 2 shouldUpdateComponent</text>' +
              '<text x="50" y="198" fill="var(--muted)" font-size="13">Gate 3 v-memo</text>' +
              '<rect x="30" y="230" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="256" fill="var(--muted)" font-size="13">Gate 4 patch flags</text>' +
              '<text x="50" y="278" fill="var(--muted)" font-size="13">DOM write</text>' +
              '<rect x="30" y="320" width="580" height="50" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="351" fill="var(--muted)" font-size="14" text-anchor="middle">2000 rows in the list, 1 row actually dirty</text>' +
              '</svg>',
            label: { pl: 'Zmiana stanu', en: 'State change' },
            note: {
              pl: 'Jedno pole w tablicy 2000 wierszy staje się brudne. Scheduler kolejkuje render tabeli dokładnie raz, niezależnie od liczby zapisów w tym ticku.',
              en: 'One field in a 2000-row array turns dirty. The scheduler queues the table render exactly once, no matter how many writes happen in that tick.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 2 of 5 - parent renders, children compared</text>' +
              '<rect x="30" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="78" fill="var(--text)" font-size="15" text-anchor="middle">rows[7].selected</text>' +
              '<text x="150" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">already true</text>' +
              '<rect x="370" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="490" y="78" fill="var(--text)" font-size="15" text-anchor="middle">Table render effect</text>' +
              '<text x="490" y="102" fill="var(--accent)" font-size="13" text-anchor="middle">running now</text>' +
              '<rect x="30" y="150" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="50" y="176" fill="var(--text)" font-size="14">Gate 2 shouldUpdateComponent - 2000 prop checks</text>' +
              '<text x="50" y="198" fill="var(--muted)" font-size="13">1999 rows keep identical props, 1 row differs</text>' +
              '<rect x="30" y="230" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="256" fill="var(--muted)" font-size="13">Gate 4 patch flags</text>' +
              '<text x="50" y="278" fill="var(--muted)" font-size="13">DOM write</text>' +
              '<rect x="30" y="320" width="580" height="50" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="351" fill="var(--warn)" font-size="14" text-anchor="middle">Cheap per row, but you still pay it 2000 times</text>' +
              '</svg>',
            label: { pl: 'Porównanie propsów', en: 'Props comparison' },
            note: {
              pl: 'Render rodzica tworzy 2000 nowych vnode wierszy i dla każdego porównuje propsy. Pojedyncze porównanie jest tanie, ale suma jest tym, co widzisz w profilerze.',
              en: 'The parent render creates 2000 fresh row vnodes and compares props for each. One comparison is cheap, but the sum is what you see in the profiler.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 3 of 5 - v-memo short circuit</text>' +
              '<rect x="30" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="78" fill="var(--text)" font-size="15" text-anchor="middle">v-memo deps</text>' +
              '<text x="150" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">[row.id, row.selected]</text>' +
              '<rect x="370" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="490" y="78" fill="var(--text)" font-size="15" text-anchor="middle">1999 rows</text>' +
              '<text x="490" y="102" fill="var(--ok)" font-size="13" text-anchor="middle">cached vnode reused</text>' +
              '<rect x="30" y="150" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="50" y="176" fill="var(--ok)" font-size="14">Gate 3 v-memo - deps identical, subtree returned as is</text>' +
              '<text x="50" y="198" fill="var(--muted)" font-size="13">no child render, no prop diff, no patch</text>' +
              '<rect x="30" y="230" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="50" y="256" fill="var(--text)" font-size="14">Gate 4 reached by exactly 1 row</text>' +
              '<text x="50" y="278" fill="var(--muted)" font-size="13">the one whose selected flag flipped</text>' +
              '<rect x="30" y="320" width="580" height="50" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="351" fill="var(--ok)" font-size="14" text-anchor="middle">Work is now proportional to what changed</text>' +
              '</svg>',
            label: { pl: 'Cache v-memo', en: 'The v-memo cache' },
            note: {
              pl: 'v-memo porównuje listę zależności wiersz po wierszu. Gdy nic się nie zmieniło, zwraca poprzedni vnode i cała gałąź jest pomijana.',
              en: 'v-memo compares the dependency array row by row. When nothing changed it returns the previous vnode and the whole branch is skipped.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 4 of 5 - patch flags inside the dirty row</text>' +
              '<rect x="30" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="78" fill="var(--text)" font-size="15" text-anchor="middle">Row vnode</text>' +
              '<text x="150" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">block with 2 dynamic kids</text>' +
              '<rect x="370" y="50" width="240" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="490" y="78" fill="var(--text)" font-size="15" text-anchor="middle">Static nodes</text>' +
              '<text x="490" y="102" fill="var(--ok)" font-size="13" text-anchor="middle">hoisted, never visited</text>' +
              '<rect x="30" y="150" width="270" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="165" y="178" fill="var(--text)" font-size="14" text-anchor="middle">CLASS flag</text>' +
              '<text x="165" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">is-selected toggled</text>' +
              '<rect x="340" y="150" width="270" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="475" y="178" fill="var(--text)" font-size="14" text-anchor="middle">TEXT flag</text>' +
              '<text x="475" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">one text node updated</text>' +
              '<rect x="30" y="245" width="580" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="50" y="271" fill="var(--ok)" font-size="14">2 DOM operations total</text>' +
              '<text x="50" y="293" fill="var(--muted)" font-size="13">classList.toggle plus one textContent assignment</text>' +
              '<rect x="30" y="330" width="580" height="45" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="358" fill="var(--muted)" font-size="14" text-anchor="middle">The block tree walks only the flagged children</text>' +
              '</svg>',
            label: { pl: 'Patch flagi', en: 'Patch flags' },
            note: {
              pl: 'Wewnątrz brudnego wiersza kompilator zostawił mapę: tylko klasa i jeden tekst są dynamiczne. Reszta poddrzewa nie jest nawet odwiedzana.',
              en: 'Inside the dirty row the compiler left a map: only the class and one text node are dynamic. The rest of the subtree is never even visited.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 5 of 5 - the trap</text>' +
              '<rect x="30" y="50" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="50" y="78" fill="var(--err)" font-size="15">v-memo="[row.id]" but the template also reads row.label</text>' +
              '<text x="50" y="104" fill="var(--muted)" font-size="13">label changes, deps do not, the cached vnode stays</text>' +
              '<rect x="30" y="155" width="270" height="80" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="165" y="185" fill="var(--text)" font-size="14" text-anchor="middle">Screen shows</text>' +
              '<text x="165" y="212" fill="var(--err)" font-size="16" text-anchor="middle">old label</text>' +
              '<rect x="340" y="155" width="270" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="185" fill="var(--text)" font-size="14" text-anchor="middle">State holds</text>' +
              '<text x="475" y="212" fill="var(--ok)" font-size="16" text-anchor="middle">new label</text>' +
              '<rect x="30" y="265" width="580" height="105" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="50" y="294" fill="var(--warn)" font-size="14">Rule of thumb</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">v-memo deps must list every reactive value the subtree reads</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">below roughly 1000 rows the bookkeeping costs more than it saves</text>' +
              '</svg>',
            label: { pl: 'Pułapka nieaktualnych zależności', en: 'The stale-deps trap' },
            note: {
              pl: 'v-memo wyłącza reaktywność w tym poddrzewie i oddaje ci ręczną kontrolę. Pominięta zależność to nie wolniejszy UI, tylko UI pokazujący nieprawdę.',
              en: 'v-memo switches reactivity off for that subtree and hands you manual control. A missing dependency is not a slower UI, it is a UI showing something false.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że co rano przepisujesz na tablicy listę dwustu rzeczy do zrobienia. Wczoraj zmienił się jeden punkt, ale ty i tak przepisujesz wszystkie dwieście. Ręka boli, a tablica wygląda prawie tak samo.</p><p>Vue jest sprytniejsze. Zanim cokolwiek napisze, robi trzy rzeczy. Po pierwsze, czeka chwilkę i zbiera wszystkie zmiany naraz, żeby nie biegać do tablicy dziesięć razy. Po drugie, patrzy na każdy punkt i pyta: czy ten się w ogóle zmienił? Jeśli nie, przechodzi dalej. Po trzecie, w tym jednym punkcie, który się zmienił, poprawia tylko to jedno słowo, a nie całe zdanie.</p><p>Jest jeszcze sztuczka o nazwie <code>v-memo</code>. To karteczka przyklejona do punktu z napisem: "sprawdź tylko te dwie rzeczy, reszta na pewno się nie zmieniła". Bardzo szybkie - ale jeśli skłamiesz na karteczce, tablica będzie pokazywać starą treść, a nikt nie zauważy dlaczego.</p>',
          en: '<p>Imagine copying a list of two hundred chores onto a whiteboard every morning. Only one line changed since yesterday, but you copy all two hundred anyway. Your hand hurts and the board looks almost the same.</p><p>Vue is smarter than that. Before writing anything it does three things. First it waits a moment and collects all the changes at once, so it does not run to the board ten times. Second it looks at every line and asks: did this one actually change? If not, it moves on. Third, in the one line that did change, it fixes just that single word instead of the whole sentence.</p><p>There is also a trick called <code>v-memo</code>. It is a sticky note on a line saying: "only check these two things, everything else definitely stayed the same". Very fast - but if the note lies, the board keeps showing the old text and nobody can tell why.</p>'
        },
        school: {
          pl: '<p>Vue nie jest wolne dlatego, że diffuje virtual DOM. Jest szybkie, bo w większości przypadków wcale go nie diffuje. Kompilator szablonów analizuje statycznie każdy węzeł i dokłada <strong>patch flagi</strong> - liczbowe bitmaski mówiące runtime, co konkretnie może się zmienić: klasa, styl, tekst, propsy. Węzły całkowicie statyczne są <em>hoistowane</em> poza funkcję render i tworzone raz na życie modułu.</p><p>Drugim mechanizmem jest <strong>block tree</strong>. Blok to poddrzewo o stabilnym kształcie; runtime trzyma płaską tablicę jego dynamicznych dzieci i przy aktualizacji iteruje po tej tablicy, zamiast schodzić rekurencyjnie przez cały DOM wirtualny. Dlatego dodanie stu statycznych <code>&lt;div&gt;</code> do szablonu praktycznie nic nie kosztuje przy aktualizacji.</p><p>Trzeci mechanizm dotyczy komponentów. Kiedy rodzic się renderuje, tworzy nowe vnode dla dzieci, ale zanim je zaktualizuje, wywołuje <code>shouldUpdateComponent</code>: porównuje propsy płytko i sprawdza stabilność slotów. Jeśli nic się nie zmieniło, dziecko w ogóle się nie renderuje.</p><pre><code>&lt;li v-for="row in rows" :key="row.id"\n    v-memo="[row.id, row.selected]"&gt;\n  &lt;RowCells :row="row" /&gt;\n&lt;/li&gt;</code></pre><p><code>v-memo</code> to ręczna wersja tej bramki. Podajesz tablicę zależności; jeśli wszystkie są identyczne jak przy poprzednim renderze, Vue zwraca zapamiętany vnode i pomija całą gałąź. Zysk pojawia się dopiero na naprawdę dużych listach - rzędu tysiąca wierszy w górę. Poniżej tego progu samo prowadzenie cache kosztuje więcej, niż oszczędzasz, a ryzyko nieaktualnego UI zostaje.</p><p>Zanim cokolwiek zoptymalizujesz, włącz <code>app.config.performance = true</code> i zajrzyj do zakładki Performance w Vue DevTools. Zobaczysz, który komponent renderuje się za często - a to prawie nigdy nie jest ten, który typujesz.</p>',
          en: '<p>Vue is not slow because it diffs a virtual DOM. It is fast because most of the time it does not diff one at all. The template compiler statically analyses every node and attaches <strong>patch flags</strong> - numeric bitmasks telling the runtime exactly what can change: class, style, text, props. Fully static nodes are <em>hoisted</em> out of the render function and created once per module lifetime.</p><p>The second mechanism is the <strong>block tree</strong>. A block is a subtree with a stable shape; the runtime keeps a flat array of its dynamic children and, on update, iterates that array instead of recursing through the whole virtual tree. That is why adding a hundred static <code>&lt;div&gt;</code> elements to a template costs essentially nothing at update time.</p><p>The third mechanism concerns components. When a parent renders it creates fresh child vnodes, but before updating them it calls <code>shouldUpdateComponent</code>: a shallow props comparison plus a slot stability check. If nothing changed, the child never renders.</p><pre><code>&lt;li v-for="row in rows" :key="row.id"\n    v-memo="[row.id, row.selected]"&gt;\n  &lt;RowCells :row="row" /&gt;\n&lt;/li&gt;</code></pre><p><code>v-memo</code> is the manual version of that gate. You give it a dependency array; if every entry is identical to the previous render, Vue returns the memoised vnode and skips the entire branch. The win only shows up on genuinely large lists, roughly a thousand rows and up. Below that threshold the bookkeeping costs more than it saves, and the stale-UI risk stays with you.</p><p>Before optimising anything, set <code>app.config.performance = true</code> and open the Performance tab in Vue DevTools. You will see which component re-renders too often - and it is almost never the one you guessed.</p>'
        },
        pro: {
          pl: '<p><strong>Gdzie realnie ucieka czas.</strong> W aplikacjach z design systemem profil prawie zawsze wygląda tak samo: nie DOM patching, tylko nadmiarowe wywołania funkcji render dzieci i tworzenie vnode. Bramka numer dwa (<code>shouldUpdateComponent</code>) przepuszcza za dużo, bo props jest nowym obiektem przy każdym renderze rodzica.</p><pre><code>// kazdy render rodzica tworzy nowy obiekt -&gt; dziecko renderuje sie zawsze\n&lt;ChiButton :config="{ size: \'sm\', tone: tone }" /&gt;\n\n// stabilna referencja -&gt; porownanie plytkie wychodzi rowne\nconst config = computed(() =&gt; ({ size: \'sm\', tone: tone.value }))</code></pre><p>Uwaga na szczegół: <code>computed</code> też zwróci nowy obiekt, gdy zmieni się <code>tone</code>, ale nie przy każdym renderze rodzica - i o to chodzi. Inline handlery są mniej groźne, bo kompilator włącza <code>cacheHandlers</code> i trzyma je w cache renderu.</p><p><strong>Stabilność slotów.</strong> Slot owinięty w <code>v-if</code> albo <code>v-for</code> traci flagę <code>STABLE</code> i wymusza update dziecka przy każdym renderze rodzica. W wirtualizowanej tabeli z <code>&lt;template v-if="editable" #cell&gt;</code> to jest zwykle cała regresja wydajności - jeden warunek w szablonie konsumenta.</p><p><strong>Kiedy sięgać po co.</strong></p><ul><li><code>v-once</code> - poddrzewo, które nigdy się nie zmienia (nagłówek, legenda). Zero kosztu utrzymania.</li><li><code>v-memo</code> - duże <code>v-for</code>, gdzie zmienia się garstka wierszy. Musi być na tym samym elemencie co <code>v-for</code>, a lista zależności musi obejmować wszystko, co poddrzewo czyta.</li><li><code>shallowRef</code> plus <code>triggerRef</code> - kolekcje 10k+ obiektów, gdzie głęboka reaktywność kosztuje więcej niż daje; oszczędzasz tworzenie proxy i śledzenie zależności.</li><li><code>markRaw</code> - instancje z bibliotek zewnętrznych (mapy, wykresy, edytory), których Vue nie ma prawa opakowywać.</li></ul><p><strong>Wirtualizacja bije wszystko.</strong> Powyżej kilkuset widocznych wierszy żadna mikrooptymalizacja nie dogoni renderowania tylko widocznego okna. TanStack Virtual albo vue-virtual-scroller redukują liczbę węzłów o rzędy wielkości; <code>v-memo</code> jest wtedy dodatkiem, nie rozwiązaniem.</p><p><strong>Higiena kluczy.</strong> <code>:key="index"</code> w liście, która się sortuje lub filtruje, powoduje, że Vue patchuje w miejscu zamiast przenosić węzły - gubisz stan inputów i focus, a przy komponentach z ciężkim <code>onMounted</code> płacisz podwójnie. Klucz musi być tożsamością danych, nie pozycją.</p><p><strong>Mierzenie.</strong> Vue DevTools Performance daje czas per komponent, ale prawdę o użytkowniku daje INP w polu. Renderowanie długiej listy w jednym bloku potrafi zjeść 200-400 ms na średnim telefonie; podział na porcje przez <code>requestIdleCallback</code> albo <code>scheduler.yield</code> nie skraca sumy pracy, ale ratuje responsywność.</p>',
          en: '<p><strong>Where the time actually goes.</strong> In design-system-heavy apps the profile looks the same almost every time: it is not DOM patching, it is excess child render calls and vnode creation. Gate two (<code>shouldUpdateComponent</code>) lets too much through because a prop is a brand new object on every parent render.</p><pre><code>// new object every parent render -&gt; child always re-renders\n&lt;ChiButton :config="{ size: \'sm\', tone: tone }" /&gt;\n\n// stable reference -&gt; the shallow comparison comes out equal\nconst config = computed(() =&gt; ({ size: \'sm\', tone: tone.value }))</code></pre><p>Note the subtlety: <code>computed</code> also returns a new object when <code>tone</code> changes, but not on every parent render - and that is exactly the point. Inline handlers are less dangerous, because the compiler enables <code>cacheHandlers</code> and keeps them in the render cache.</p><p><strong>Slot stability.</strong> A slot wrapped in <code>v-if</code> or <code>v-for</code> loses its <code>STABLE</code> flag and forces a child update on every parent render. In a virtualised table, a consumer writing <code>&lt;template v-if="editable" #cell&gt;</code> is usually the entire performance regression - one conditional in someone else\'s template.</p><p><strong>What to reach for, and when.</strong></p><ul><li><code>v-once</code> - a subtree that never changes (a header, a legend). Zero maintenance cost.</li><li><code>v-memo</code> - large <code>v-for</code> lists where a handful of rows change. It must sit on the same element as the <code>v-for</code>, and the dependency list must cover everything the subtree reads.</li><li><code>shallowRef</code> plus <code>triggerRef</code> - collections of 10k+ objects where deep reactivity costs more than it gives; you skip proxy creation and dependency tracking.</li><li><code>markRaw</code> - third-party instances (maps, charts, editors) that Vue has no business wrapping in a proxy.</li></ul><p><strong>Virtualisation beats all of it.</strong> Past a few hundred visible rows no micro-optimisation catches up with rendering only the visible window. TanStack Virtual or vue-virtual-scroller cut node counts by orders of magnitude; <code>v-memo</code> is then a garnish, not the fix.</p><p><strong>Key hygiene.</strong> <code>:key="index"</code> in a list that sorts or filters makes Vue patch in place instead of moving nodes - you lose input state and focus, and with components that do heavy work in <code>onMounted</code> you pay twice. A key must be data identity, never position.</p><p><strong>Measuring.</strong> Vue DevTools Performance gives you per-component timings, but the truth about users lives in field INP. Rendering a long list in one block can eat 200-400 ms on a mid-range phone; chunking it with <code>requestIdleCallback</code> or <code>scheduler.yield</code> does not reduce total work but it does save responsiveness.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co robią patch flagi generowane przez kompilator szablonów?',
            en: 'What do the patch flags generated by the template compiler do?'
          },
          options: [
            { pl: 'Cache\'ują wynik funkcji render dla całego komponentu', en: 'Cache the whole render function output for a component' },
            { pl: 'Zastępują klucze w listach v-for', en: 'Replace keys in v-for lists' },
            { pl: 'Mówią runtime, które konkretnie bindingi węzła mogą się zmienić', en: 'Tell the runtime which specific bindings of a node can change' },
            { pl: 'Wymuszają płytkie porównanie propsów w komponentach dzieci', en: 'Force a shallow props comparison in child components' }
          ],
          correct: 2,
          explain: {
            pl: 'Patch flaga to bitmaska typu CLASS, TEXT czy PROPS. Dzięki niej runtime porównuje tylko oznaczone bindingi, a węzły statyczne są hoistowane i nigdy nie odwiedzane.',
            en: 'A patch flag is a bitmask such as CLASS, TEXT or PROPS. It lets the runtime compare only the flagged bindings, while static nodes are hoisted and never visited.'
          }
        },
        {
          q: {
            pl: 'Lista ma v-memo="[row.id]", a szablon wiersza renderuje też row.status. Status się zmienia. Co zobaczy użytkownik?',
            en: 'A list uses v-memo="[row.id]" while the row template also renders row.status. Status changes. What does the user see?'
          },
          options: [
            { pl: 'Stary status, bo zapamiętany vnode zostaje użyty ponownie', en: 'The old status, because the memoised vnode is reused' },
            { pl: 'Nowy status, bo v-memo śledzi wszystkie zależności reaktywne', en: 'The new status, because v-memo tracks all reactive dependencies' },
            { pl: 'Ostrzeżenie w konsoli i pełny ponowny render wiersza', en: 'A console warning plus a full re-render of the row' },
            { pl: 'Pusty wiersz, bo cache został unieważniony', en: 'An empty row, because the cache was invalidated' }
          ],
          correct: 0,
          explain: {
            pl: 'v-memo porównuje wyłącznie podaną tablicę. Reaktywność w tym poddrzewie jest wyłączona, więc pominięta zależność daje cichy, nieaktualny UI bez żadnego ostrzeżenia.',
            en: 'v-memo compares only the array you pass. Reactivity in that subtree is off, so a missing dependency produces a silently stale UI with no warning at all.'
          }
        },
        {
          q: {
            pl: 'Dlaczego :config="{ size: \'sm\' }" na komponencie potomnym psuje optymalizację?',
            en: 'Why does :config="{ size: \'sm\' }" on a child component defeat an optimisation?'
          },
          options: [
            { pl: 'Obiekty inline nie są reaktywne, więc dziecko nigdy się nie aktualizuje', en: 'Inline objects are not reactive, so the child never updates' },
            { pl: 'Kompilator nie potrafi wygenerować patch flagi dla obiektu', en: 'The compiler cannot generate a patch flag for an object' },
            { pl: 'Vue głęboko porównuje obiekt, co jest kosztowne', en: 'Vue deep-compares the object, which is expensive' },
            { pl: 'To nowa referencja przy każdym renderze, więc płytkie porównanie propsów zawsze wychodzi różne', en: 'It is a new reference on every render, so the shallow props comparison always differs' }
          ],
          correct: 3,
          explain: {
            pl: 'shouldUpdateComponent porównuje propsy płytko. Nowy literał obiektu to nowa referencja, więc bramka przepuszcza render dziecka za każdym razem.',
            en: 'shouldUpdateComponent compares props shallowly. A fresh object literal is a fresh reference, so the gate lets the child render through every single time.'
          }
        },
        {
          q: {
            pl: 'Wirtualizowana tabela zwolniła po tym, jak konsument dodał <template v-if="editable" #cell>. Dlaczego?',
            en: 'A virtualised table got slower after a consumer added <template v-if="editable" #cell>. Why?'
          },
          options: [
            { pl: 'v-if tworzy nowy scope reaktywny dla każdej komórki', en: 'v-if creates a new reactive scope for every cell' },
            { pl: 'Sloty przestają być STABLE, więc każdy render rodzica wymusza update dziecka', en: 'The slots stop being STABLE, so every parent render forces a child update' },
            { pl: 'v-if wyłącza hoistowanie węzłów statycznych w całym komponencie', en: 'v-if disables static hoisting across the whole component' },
            { pl: 'Vue przełącza tabelę na pełny diff virtual DOM bez patch flag', en: 'Vue switches the table to a full virtual DOM diff without patch flags' }
          ],
          correct: 1,
          explain: {
            pl: 'Warunek wokół template ze slotem zmienia flagę slotów na DYNAMIC. Bramka porównania propsów jest wtedy omijana i dziecko renderuje się zawsze - w komponencie design systemu regresję wnosi konsument, nie autor.',
            en: 'A conditional around a slot template flips the slot flag to DYNAMIC. The props gate is then bypassed and the child always renders - in a design-system component the regression comes from the consumer, not the author.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'bundle-and-lazy',
      title: {
        pl: 'Bundle, code splitting i leniwe ładowanie',
        en: 'Bundle, code splitting and lazy loading'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'code splitting', en: 'code splitting' },
          def: {
            pl: 'Każdy <code>import()</code> tworzy w buildzie Vite/Rollup osobny chunk. Statyczny import tego samego modułu gdzie indziej wciąga go z powrotem do głównego bundla.',
            en: 'Every <code>import()</code> creates a separate chunk in a Vite/Rollup build. A static import of the same module elsewhere pulls it back into the main bundle.'
          }
        },
        {
          term: { pl: 'defineAsyncComponent', en: 'defineAsyncComponent' },
          def: {
            pl: 'Leniwie ładowany komponent z opcjami <code>delay</code>, <code>timeout</code> oraz komponentami loading i error. Delay około 200 ms zapobiega mignięciu spinnera na szybkim łączu.',
            en: 'A lazily loaded component with <code>delay</code>, <code>timeout</code> and loading/error components. A delay of around 200 ms stops the spinner flashing on a fast connection.'
          }
        },
        {
          term: { pl: 'request waterfall', en: 'request waterfall' },
          def: {
            pl: 'Łańcuch sekwencyjnych pobrań: trasa ładuje komponent, ten dopiero swój wykres, a ten dopiero dane. Każdy poziom to dodatkowy round trip, więc zagnieżdżone lazy trzeba preloadować.',
            en: 'A chain of sequential fetches: the route loads a component, which loads its chart, which loads data. Each level is an extra round trip, so nested lazy loads need preloading.'
          }
        },
        {
          term: { pl: 'modulepreload i prefetch', en: 'modulepreload and prefetch' },
          def: {
            pl: 'Podpowiedzi dla przeglądarki, by pobrała chunk zanim będzie potrzebny - <code>modulepreload</code> dla bieżącej nawigacji, prefetch linków dla prawdopodobnej następnej.',
            en: 'Hints telling the browser to fetch a chunk before it is needed - <code>modulepreload</code> for the current navigation, link prefetch for the likely next one.'
          }
        },
        {
          term: { pl: 'tree shaking i sideEffects', en: 'tree shaking and sideEffects' },
          def: {
            pl: 'Usuwanie nieużywanego kodu z paczek ESM. Flaga <code>sideEffects: false</code> nic nie da, jeśli paczka ma barrel index z globalnym CSS albo globalną rejestracją komponentów.',
            en: 'Dropping unused code from ESM packages. The <code>sideEffects: false</code> flag helps nothing if the package has a barrel index with global CSS or global component registration.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m6l2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">One graph, three kinds of edges</text>' +
          '<rect x="200" y="45" width="240" height="62" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="72" fill="var(--text)" font-size="15" text-anchor="middle">entry chunk</text>' +
          '<text x="320" y="94" fill="var(--muted)" font-size="13" text-anchor="middle">runtime + shell + router</text>' +
          '<line x1="250" y1="107" x2="150" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l2a)"/>' +
          '<line x1="390" y1="107" x2="490" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l2a)"/>' +
          '<rect x="30" y="155" width="240" height="62" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="150" y="182" fill="var(--text)" font-size="15" text-anchor="middle">route chunk</text>' +
          '<text x="150" y="204" fill="var(--muted)" font-size="13" text-anchor="middle">() =&gt; import(...)</text>' +
          '<rect x="370" y="155" width="240" height="62" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="490" y="182" fill="var(--text)" font-size="15" text-anchor="middle">shared vendor</text>' +
          '<text x="490" y="204" fill="var(--muted)" font-size="13" text-anchor="middle">vue, pinia, design system</text>' +
          '<line x1="150" y1="217" x2="150" y2="255" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l2a)"/>' +
          '<rect x="30" y="260" width="240" height="62" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="150" y="287" fill="var(--text)" font-size="15" text-anchor="middle">async component</text>' +
          '<text x="150" y="309" fill="var(--warn)" font-size="13" text-anchor="middle">second waterfall hop</text>' +
          '<rect x="370" y="260" width="240" height="62" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="490" y="287" fill="var(--ok)" font-size="14" text-anchor="middle">cached across routes</text>' +
          '<text x="490" y="309" fill="var(--muted)" font-size="13" text-anchor="middle">stable hash, long max-age</text>' +
          '<rect x="30" y="345" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="372" fill="var(--text)" font-size="14">Budget thinking: what must arrive before first interaction?</text>' +
          '<text x="50" y="394" fill="var(--muted)" font-size="13">everything else is a deferred edge, not a smaller file</text>' +
          '</svg>',
        caption: {
          pl: 'Bundle to graf: chunk wejściowy, chunki tras ładowane na żądanie i współdzielony vendor. Optymalizacja polega na przesuwaniu krawędzi w czasie, nie na magicznym zmniejszaniu plików.',
          en: 'A bundle is a graph: the entry chunk, on-demand route chunks and shared vendor code. Optimising it means moving edges in time, not magically shrinking files.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Oś czasu pierwszego wejścia na stronę: co pobiera przeglądarka i kiedy użytkownik może kliknąć.',
          en: 'The timeline of a first page load: what the browser fetches and when the user can actually click.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 1 of 4 - everything in one chunk</text>' +
              '<line x1="40" y1="330" x2="610" y2="330" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="356" fill="var(--muted)" font-size="13">0 ms</text>' +
              '<text x="560" y="356" fill="var(--muted)" font-size="13">3000 ms</text>' +
              '<rect x="40" y="70" width="470" height="44" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="275" y="98" fill="var(--err)" font-size="15" text-anchor="middle">app.js  920 kB</text>' +
              '<rect x="40" y="130" width="470" height="44" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="275" y="158" fill="var(--warn)" font-size="15" text-anchor="middle">parse + execute</text>' +
              '<line x1="510" y1="60" x2="510" y2="330" stroke="var(--err)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="510" y="300" fill="var(--err)" font-size="14" text-anchor="end">interactive </text>' +
              '<rect x="40" y="210" width="570" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="60" y="238" fill="var(--text)" font-size="14">Every route, every modal, every chart ships up front.</text>' +
              '<text x="60" y="262" fill="var(--muted)" font-size="13">Parse cost scales with bytes even on a warm cache.</text>' +
              '</svg>',
            label: { pl: 'Jeden wielki chunk', en: 'One big chunk' },
            note: {
              pl: 'Startowo cała aplikacja jest jednym plikiem. Użytkownik czeka na kod ekranów, których nigdy nie otworzy, i płaci nie tylko transferem, ale też parsowaniem.',
              en: 'To start with, the whole app is one file. The user waits for code for screens they will never open, and pays in parse time as well as transfer.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 2 of 4 - split by route</text>' +
              '<line x1="40" y1="330" x2="610" y2="330" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="356" fill="var(--muted)" font-size="13">0 ms</text>' +
              '<text x="560" y="356" fill="var(--muted)" font-size="13">3000 ms</text>' +
              '<rect x="40" y="70" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="115" y="98" fill="var(--ok)" font-size="14" text-anchor="middle">entry 160 kB</text>' +
              '<rect x="200" y="70" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="260" y="98" fill="var(--accent2)" font-size="14" text-anchor="middle">route A</text>' +
              '<rect x="40" y="130" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="115" y="158" fill="var(--accent)" font-size="14" text-anchor="middle">vendor</text>' +
              '<line x1="330" y1="60" x2="330" y2="330" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="326" y="300" fill="var(--ok)" font-size="14" text-anchor="end">interactive </text>' +
              '<rect x="40" y="210" width="570" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="60" y="238" fill="var(--text)" font-size="14">Routes A and vendor load in parallel, the rest waits.</text>' +
              '<text x="60" y="262" fill="var(--muted)" font-size="13">Vendor stays cached when app code is redeployed.</text>' +
              '</svg>',
            label: { pl: 'Podział na trasy', en: 'Split by route' },
            note: {
              pl: 'Dynamiczny import w definicji trasy tnie graf. Vendor wyciągnięty osobno przeżywa kolejne deploye w cache przeglądarki.',
              en: 'A dynamic import in the route definition cuts the graph. Vendor pulled out separately survives later deploys in the browser cache.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 3 of 4 - the hidden waterfall</text>' +
              '<line x1="40" y1="330" x2="610" y2="330" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="356" fill="var(--muted)" font-size="13">0 ms</text>' +
              '<text x="560" y="356" fill="var(--muted)" font-size="13">3000 ms</text>' +
              '<rect x="40" y="70" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="115" y="98" fill="var(--ok)" font-size="14" text-anchor="middle">entry 160 kB</text>' +
              '<rect x="200" y="70" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="260" y="98" fill="var(--accent2)" font-size="14" text-anchor="middle">route A</text>' +
              '<rect x="330" y="70" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="405" y="98" fill="var(--warn)" font-size="14" text-anchor="middle">chart widget</text>' +
              '<line x1="490" y1="60" x2="490" y2="330" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="486" y="300" fill="var(--warn)" font-size="14" text-anchor="end">content complete </text>' +
              '<rect x="40" y="210" width="570" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="60" y="238" fill="var(--text)" font-size="14">An async component inside an async route = a second hop.</text>' +
              '<text x="60" y="262" fill="var(--muted)" font-size="13">The browser cannot discover it until route A has executed.</text>' +
              '</svg>',
            label: { pl: 'Ukryty waterfall', en: 'The hidden waterfall' },
            note: {
              pl: 'Komponent async zagnieżdżony w trasie async to drugi round trip - przeglądarka poznaje jego URL dopiero po wykonaniu kodu trasy.',
              en: 'An async component nested inside an async route is a second round trip - the browser only learns its URL after the route code runs.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="26" fill="var(--muted)" font-size="14">Step 4 of 4 - prefetch flattens it</text>' +
              '<line x1="40" y1="330" x2="610" y2="330" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="40" y="356" fill="var(--muted)" font-size="13">0 ms</text>' +
              '<text x="560" y="356" fill="var(--muted)" font-size="13">3000 ms</text>' +
              '<rect x="40" y="70" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="115" y="98" fill="var(--ok)" font-size="14" text-anchor="middle">entry 160 kB</text>' +
              '<rect x="200" y="70" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="260" y="98" fill="var(--accent2)" font-size="14" text-anchor="middle">route A</text>' +
              '<rect x="200" y="130" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="275" y="158" fill="var(--ok)" font-size="14" text-anchor="middle">chart prefetched</text>' +
              '<line x1="360" y1="60" x2="360" y2="330" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="356" y="300" fill="var(--ok)" font-size="14" text-anchor="end">content complete </text>' +
              '<rect x="40" y="210" width="570" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="60" y="238" fill="var(--text)" font-size="14">modulepreload or a hover-triggered import runs it early.</text>' +
              '<text x="60" y="262" fill="var(--muted)" font-size="13">Same bytes, one fewer serialised round trip.</text>' +
              '</svg>',
            label: { pl: 'Prefetch spłaszcza kaskadę', en: 'Prefetch flattens the cascade' },
            note: {
              pl: 'Ten sam transfer, ale równolegle. Vite wstrzykuje modulepreload dla statycznie wykrywalnych zależności, resztę przyspieszasz importem na hover lub w bezczynności.',
              en: 'The same bytes, but in parallel. Vite injects modulepreload for statically discoverable dependencies; the rest you warm up with a hover or idle-time import.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie przeprowadzkę. Możesz wrzucić wszystko do jednej gigantycznej skrzyni i taszczyć ją po schodach - albo spakować kilka pudełek i wnosić tylko te, które są dziś potrzebne. Kuchnię wnosisz od razu, bo trzeba coś zjeść. Ozdoby świąteczne mogą poczekać do grudnia.</p><p>Kod aplikacji działa tak samo. Domyślnie wszystko ląduje w jednej wielkiej skrzyni, którą przeglądarka musi ściągnąć i rozpakować, zanim cokolwiek pokaże. Podział na pudełka polega na tym, że mówisz: ten ekran wczytaj dopiero, gdy ktoś na niego wejdzie.</p><p>Jest jeden haczyk. Jeśli w pudełku znajdziesz karteczkę "reszta jest w piwnicy", musisz zejść jeszcze raz. Dlatego czasem lepiej wysłać kogoś po to pudełko wcześniej - zanim w ogóle będzie potrzebne. To się nazywa prefetch i jest po prostu uprzejmym uprzedzeniem przeglądarki, co zaraz się przyda.</p>',
          en: '<p>Picture moving house. You can throw everything into one giant crate and haul it up the stairs - or pack a few boxes and carry up only the ones you need today. The kitchen goes first, because you have to eat. Christmas decorations can wait until December.</p><p>Application code works the same way. By default everything lands in one huge crate that the browser must download and unpack before it shows anything. Splitting into boxes means saying: load this screen only when somebody actually opens it.</p><p>There is one catch. If you open a box and find a note saying "the rest is in the basement", you have to walk down again. So sometimes it is better to send someone for that box early - before it is needed at all. That is called prefetching, and it is just politely warning the browser about what is coming.</p>'
        },
        school: {
          pl: '<p>Vite buduje przez Rollupa, a Rollup myśli grafem modułów. Każdy statyczny <code>import</code> zaciąga moduł do tego samego chunku; każdy <strong>dynamiczny</strong> <code>import()</code> tworzy punkt cięcia, czyli nowy chunk ładowany dopiero wtedy, gdy kod dojdzie do tej linijki.</p><pre><code>const routes = [\n  { path: \'/reports\',\n    component: () =&gt; import(\'./views/ReportsView.vue\') }\n]</code></pre><p>To jest 90 procent zysku w typowej aplikacji: trasy ładowane na żądanie. Drugie narzędzie to <code>defineAsyncComponent</code> dla ciężkich rzeczy wewnątrz strony - edytora tekstu, wykresu, mapy.</p><pre><code>const HeavyChart = defineAsyncComponent({\n  loader: () =&gt; import(\'./HeavyChart.vue\'),\n  loadingComponent: ChartSkeleton,\n  delay: 200,\n  timeout: 10000\n})</code></pre><p><code>delay: 200</code> jest ważne: bez niego przy szybkim łączu skeleton mignie na 30 ms i wygląda to jak usterka.</p><p>Trzecia sprawa to <strong>tree shaking</strong>. Rollup usuwa nieużywane eksporty, ale tylko wtedy, gdy potrafi udowodnić brak efektów ubocznych. Klasyczny problem design systemu: plik <code>index.ts</code>, który reeksportuje 120 komponentów. Importujesz jeden przycisk, a bundler nie potrafi bezpiecznie odciąć reszty, bo któryś moduł rejestruje globalny styl albo dyrektywę. Rozwiązania: pole <code>sideEffects</code> w <code>package.json</code>, osobne wejścia per komponent, albo automatyczny import przez <code>unplugin-vue-components</code>.</p><p>Ostatnia rzecz: mierz, nie zgaduj. <code>rollup-plugin-visualizer</code> pokazuje mapę bundla i zwykle wskazuje jednego winowajcę - moment.js, pełne locale, cała biblioteka ikon albo <code>lodash</code> zaimportowany domyślnie zamiast per funkcja.</p>',
          en: '<p>Vite builds through Rollup, and Rollup thinks in a module graph. Every static <code>import</code> pulls a module into the same chunk; every <strong>dynamic</strong> <code>import()</code> creates a cut point, a new chunk fetched only when execution reaches that line.</p><pre><code>const routes = [\n  { path: \'/reports\',\n    component: () =&gt; import(\'./views/ReportsView.vue\') }\n]</code></pre><p>That is 90 percent of the win in a typical app: routes loaded on demand. The second tool is <code>defineAsyncComponent</code> for heavy things inside a page - a rich text editor, a chart, a map.</p><pre><code>const HeavyChart = defineAsyncComponent({\n  loader: () =&gt; import(\'./HeavyChart.vue\'),\n  loadingComponent: ChartSkeleton,\n  delay: 200,\n  timeout: 10000\n})</code></pre><p><code>delay: 200</code> matters: without it, on a fast connection the skeleton flashes for 30 ms and reads as a glitch.</p><p>The third topic is <strong>tree shaking</strong>. Rollup drops unused exports, but only when it can prove there are no side effects. The classic design-system problem: an <code>index.ts</code> re-exporting 120 components. You import one button and the bundler cannot safely cut the rest, because some module registers a global style or a directive. Fixes: the <code>sideEffects</code> field in <code>package.json</code>, per-component entry points, or automatic imports via <code>unplugin-vue-components</code>.</p><p>Last thing: measure, do not guess. <code>rollup-plugin-visualizer</code> draws the bundle map and usually points at a single culprit - moment.js with every locale, a whole icon library, or <code>lodash</code> imported as a default instead of per function.</p>'
        },
        pro: {
          pl: '<p><strong>Budżet zamiast intuicji.</strong> Rozsądny cel dla aplikacji korporacyjnej to 150-200 kB gzip krytycznej ścieżki JS. Sam runtime Vue 3 to około 34 kB gzip, Vue Router i Pinia razem kolejne 15-20 kB. Reszta budżetu to twój kod i design system - i to tam zwykle znika 600 kB.</p><p><strong>manualChunks świadomie.</strong> Domyślna strategia Vite bywa zła w dwie strony: albo robi jeden gigantyczny vendor, który unieważnia się przy każdym bumpie dowolnej zależności, albo rozdrabnia na 200 plików i płacisz narzutem HTTP nawet po HTTP/2.</p><pre><code>build: {\n  rollupOptions: {\n    output: {\n      manualChunks(id) {\n        if (id.includes(\'node_modules/@vue\')) return \'vue-core\'\n        if (id.includes(\'node_modules/@chi\')) return \'design-system\'\n      }\n    }\n  }\n}</code></pre><p>Dziel według <em>tempa zmian</em>, nie według rozmiaru: rdzeń frameworka zmienia się raz na kwartał, design system raz na sprint, kod aplikacji codziennie. Każda z tych grup powinna mieć własny hash.</p><p><strong>Waterfall to prawdziwy koszt.</strong> Bajty na dobrym łączu są tanie, round trip nie. Komponent async wewnątrz trasy async to dwa serializowane pobrania, przy RTT 150 ms na LTE to 300 ms zanim cokolwiek się pojawi. Vite wstrzykuje <code>&lt;link rel="modulepreload"&gt;</code> dla statycznie wykrywalnych zależności chunku trasy, ale zagnieżdżone <code>import()</code> wykrywalne nie są. Rozwiązania: prefetch na hover lub focus linku, ładowanie w <code>requestIdleCallback</code>, albo w Nuxt <code>&lt;NuxtLink prefetch&gt;</code> plus lazy hydration.</p><pre><code>// rozgrzej chunk zanim uzytkownik kliknie\nconst warm = () =&gt; import(\'./views/ReportsView.vue\')\n&lt;a @mouseenter="warm" @focus="warm" ...&gt;</code></pre><p><strong>CSS liczy się tak samo.</strong> Vite domyślnie robi code split CSS per chunk asynchroniczny, więc styl trasy przyjeżdża razem z jej JS - i blokuje render, gdy dojedzie za późno. W design systemie sprawdź, czy nie wysyłasz całego arkusza CHI w entry tylko dlatego, że jeden komponent robi globalny import.</p><p><strong>Pułapki, które widać dopiero w CI.</strong> Build z <code>vue.esm-bundler</code> zamiast <code>vue.runtime.esm-bundler</code> dokłada kompilator szablonów, około 14 kB gzip, i przy okazji pozwala na <code>template</code> jako string - łatwo wpaść przy migracji starego kodu. Barrel file w monorepo potrafi wciągnąć cały pakiet mimo <code>sideEffects: false</code>, jeśli któryś plik ma efekt na poziomie modułu. Postaw bramkę w CI: <code>size-limit</code> albo prosty skrypt porównujący sumę gzip do progu, i traktuj przekroczenie jak failujący test, nie jak notatkę w PR.</p>',
          en: '<p><strong>A budget instead of intuition.</strong> A sane target for an enterprise app is 150-200 kB gzip of critical-path JS. The Vue 3 runtime alone is around 34 kB gzip, Vue Router plus Pinia another 15-20 kB. The rest of the budget is your code and the design system - and that is where 600 kB usually disappears.</p><p><strong>Deliberate manualChunks.</strong> The Vite default can fail in both directions: either one giant vendor chunk that invalidates whenever any dependency is bumped, or 200 tiny files whose overhead you pay even over HTTP/2.</p><pre><code>build: {\n  rollupOptions: {\n    output: {\n      manualChunks(id) {\n        if (id.includes(\'node_modules/@vue\')) return \'vue-core\'\n        if (id.includes(\'node_modules/@chi\')) return \'design-system\'\n      }\n    }\n  }\n}</code></pre><p>Split by <em>rate of change</em>, not by size: framework core changes quarterly, the design system every sprint, app code daily. Each of those groups deserves its own hash.</p><p><strong>The waterfall is the real cost.</strong> Bytes on a good connection are cheap, round trips are not. An async component inside an async route is two serialised fetches; at 150 ms RTT on LTE that is 300 ms before anything appears. Vite injects <code>&lt;link rel="modulepreload"&gt;</code> for statically discoverable dependencies of a route chunk, but nested <code>import()</code> calls are not discoverable. Fixes: prefetch on link hover or focus, load during <code>requestIdleCallback</code>, or in Nuxt use <code>&lt;NuxtLink prefetch&gt;</code> plus lazy hydration.</p><pre><code>// warm the chunk before the user clicks\nconst warm = () =&gt; import(\'./views/ReportsView.vue\')\n&lt;a @mouseenter="warm" @focus="warm" ...&gt;</code></pre><p><strong>CSS counts just as much.</strong> Vite code-splits CSS per async chunk by default, so a route stylesheet arrives with its JS - and blocks rendering when it arrives late. In a design system, check you are not shipping the entire CHI stylesheet in the entry simply because one component does a global import.</p><p><strong>Traps you only notice in CI.</strong> Building against <code>vue.esm-bundler</code> instead of <code>vue.runtime.esm-bundler</code> adds the template compiler, roughly 14 kB gzip, and incidentally lets string <code>template</code> options work - easy to hit while migrating old code. A barrel file in a monorepo can drag in a whole package despite <code>sideEffects: false</code> if any file has a module-level effect. Put a gate in CI: <code>size-limit</code> or a small script comparing gzip totals against a threshold, and treat a breach as a failing test, not a note in the pull request.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie tworzy nowy chunk w buildzie Vite/Rollup?',
            en: 'What exactly creates a new chunk in a Vite/Rollup build?'
          },
          options: [
            { pl: 'Każdy plik .vue w katalogu views', en: 'Every .vue file in the views directory' },
            { pl: 'Dynamiczny import() albo jawna reguła manualChunks', en: 'A dynamic import() or an explicit manualChunks rule' },
            { pl: 'Użycie defineAsyncComponent bez importu dynamicznego', en: 'Using defineAsyncComponent without a dynamic import' },
            { pl: 'Przekroczenie przez moduł 50 kB', en: 'A module growing past 50 kB' }
          ],
          correct: 1,
          explain: {
            pl: 'Punkt cięcia grafu powstaje przy dynamicznym import() lub gdy sam wskażesz go w manualChunks. defineAsyncComponent jest tylko opakowaniem - bez import() nic nie zostanie wydzielone.',
            en: 'The graph is cut at a dynamic import() or where you declare it in manualChunks. defineAsyncComponent is only a wrapper - without an import() nothing gets split out.'
          }
        },
        {
          q: {
            pl: 'Dlaczego defineAsyncComponent zwykle konfiguruje się z delay około 200 ms?',
            en: 'Why is defineAsyncComponent usually configured with a delay of around 200 ms?'
          },
          options: [
            { pl: 'Bo Vue potrzebuje czasu na zarejestrowanie komponentu', en: 'Because Vue needs time to register the component' },
            { pl: 'Bo opóźnia start pobierania i odciąża sieć', en: 'Because it delays the fetch and relieves the network' },
            { pl: 'Bo bez tego timeout nie działa', en: 'Because the timeout does not work without it' },
            { pl: 'Bo przy szybkim łączu skeleton mignąłby na chwilę i wyglądał jak usterka', en: 'Because on a fast connection the skeleton would flash briefly and read as a glitch' }
          ],
          correct: 3,
          explain: {
            pl: 'delay dotyczy tylko momentu pokazania loadingComponent, nie startu pobierania. Chroni przed migotaniem, gdy chunk przychodzi w kilkadziesiąt milisekund.',
            en: 'delay only governs when loadingComponent appears, not when fetching starts. It prevents flicker when the chunk arrives within a few tens of milliseconds.'
          }
        },
        {
          q: {
            pl: 'Trasa jest ładowana leniwie, a w środku ma komponent async z wykresem. Jaki jest główny koszt tej konstrukcji?',
            en: 'A route is lazy-loaded and contains an async chart component inside. What is the main cost of this setup?'
          },
          options: [
            { pl: 'Drugi, serializowany round trip - przeglądarka nie zna URL zanim kod trasy się nie wykona', en: 'A second, serialised round trip - the browser cannot know the URL until the route code runs' },
            { pl: 'Podwojony transfer, bo Vue pobiera oba chunki dwa razy', en: 'Doubled transfer, because Vue fetches both chunks twice' },
            { pl: 'Utrata tree shakingu w chunku trasy', en: 'Loss of tree shaking inside the route chunk' },
            { pl: 'Wymuszona pełna hydratacja poddrzewa', en: 'A forced full hydration of the subtree' }
          ],
          correct: 0,
          explain: {
            pl: 'Zagnieżdżone import() nie jest statycznie wykrywalne, więc modulepreload go nie obejmie. Przy RTT 150 ms to około 300 ms zamiast 150. Ratuje prefetch na hover albo w bezczynności.',
            en: 'A nested import() is not statically discoverable, so modulepreload cannot cover it. At 150 ms RTT that is roughly 300 ms instead of 150. Hover or idle prefetching fixes it.'
          }
        },
        {
          q: {
            pl: 'Importujesz jeden komponent z pakietu design systemu, a bundle rośnie o cały pakiet mimo sideEffects: false. Najbardziej prawdopodobna przyczyna?',
            en: 'You import one component from a design-system package and the bundle grows by the whole package despite sideEffects: false. Most likely cause?'
          },
          options: [
            { pl: 'Rollup nie robi tree shakingu dla plików .vue', en: 'Rollup does not tree-shake .vue files' },
            { pl: 'Pakiet jest publikowany jako CommonJS, więc analiza statyczna jest niemożliwa, albo któryś moduł w barrelu ma efekt na poziomie modułu', en: 'The package ships as CommonJS so static analysis is impossible, or some module in the barrel has a module-level side effect' },
            { pl: 'sideEffects: false działa tylko w webpacku, Vite je ignoruje', en: 'sideEffects: false only works in webpack, Vite ignores it' },
            { pl: 'Za mało chunków, trzeba dodać manualChunks', en: 'Too few chunks, you need to add manualChunks' }
          ],
          correct: 1,
          explain: {
            pl: 'Tree shaking wymaga ESM i braku efektów na poziomie modułu. Rejestracja globalnej dyrektywy, import CSS albo build CJS wystarczą, żeby bundler musiał zachować wszystko - stąd osobne wejścia per komponent w bibliotekach.',
            en: 'Tree shaking needs ESM and no module-level effects. Registering a global directive, importing CSS, or a CJS build is enough to force the bundler to keep everything - hence per-component entry points in libraries.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'vue-test-utils-and-testing-library',
      title: {
        pl: 'Vue Test Utils i Testing Library',
        en: 'Vue Test Utils and Testing Library'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'mount i shallowMount', en: 'mount versus shallowMount' },
          def: {
            pl: '<code>mount</code> montuje prawdziwe drzewo komponentów, <code>shallowMount</code> zastępuje dzieci stubami. W bibliotece komponentów stuby ukrywają dokładnie te integracje, które chcesz sprawdzić.',
            en: '<code>mount</code> mounts the real component tree, <code>shallowMount</code> replaces children with stubs. For a component library, stubs hide exactly the integration you wanted to verify.'
          }
        },
        {
          term: { pl: 'Testing Library', en: 'Testing Library' },
          def: {
            pl: 'Podejście testujące jak użytkownik: zapytania po roli, etykiecie i tekście zamiast po klasach i wewnętrznych elementach. Takie testy przeżywają refaktor markupu.',
            en: 'An approach that tests like a user: queries by role, label and text rather than classes and internal elements. Such tests survive a markup refactor.'
          }
        },
        {
          term: { pl: 'ograniczenia jsdom', en: 'the jsdom wall' },
          def: {
            pl: 'jsdom nie ma silnika layoutu: <code>getBoundingClientRect</code> zwraca zera, brakuje <code>IntersectionObserver</code>, <code>ResizeObserver</code> i <code>matchMedia</code>. Pozycjonowanie testuje się w prawdziwej przeglądarce.',
            en: 'jsdom has no layout engine: <code>getBoundingClientRect</code> returns zeros, and <code>IntersectionObserver</code>, <code>ResizeObserver</code> and <code>matchMedia</code> are missing. Positioning belongs in a real browser.'
          }
        },
        {
          term: { pl: 'fake timers', en: 'fake timers' },
          def: {
            pl: 'Sterowanie czasem w testach debounce i animacji. Po przesunięciu zegara potrzebna jest wersja async (<code>advanceTimersByTimeAsync</code>) i <code>await nextTick()</code>, bo aktualizacja Vue leci mikrozadaniem.',
            en: 'Controlling time in debounce and animation tests. After moving the clock you need the async variant (<code>advanceTimersByTimeAsync</code>) plus <code>await nextTick()</code>, because the Vue update runs in a microtask.'
          }
        },
        {
          term: { pl: 'testowanie composables w scope', en: 'testing composables in a scope' },
          def: {
            pl: 'Composable z watcherami uruchamia się w <code>effectScope</code> albo w komponencie testowym, żeby dało się go posprzątać i sprawdzić, że <code>onScopeDispose</code> naprawdę odpina zasoby.',
            en: 'A composable with watchers is run inside an <code>effectScope</code> or a test component, so it can be disposed and you can assert that <code>onScopeDispose</code> really releases its resources.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Two libraries, one mount, different questions</text>' +
          '<rect x="30" y="45" width="270" height="150" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="165" y="74" fill="var(--text)" font-size="15" text-anchor="middle">Vue Test Utils</text>' +
          '<text x="50" y="104" fill="var(--muted)" font-size="13">wrapper.vm, setProps</text>' +
          '<text x="50" y="128" fill="var(--muted)" font-size="13">emitted(), stubs, shallow</text>' +
          '<text x="50" y="152" fill="var(--muted)" font-size="13">asks: is the instance right?</text>' +
          '<text x="50" y="178" fill="var(--warn)" font-size="13">couples tests to internals</text>' +
          '<rect x="340" y="45" width="270" height="150" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="475" y="74" fill="var(--text)" font-size="15" text-anchor="middle">Testing Library</text>' +
          '<text x="360" y="104" fill="var(--muted)" font-size="13">getByRole, findByText</text>' +
          '<text x="360" y="128" fill="var(--muted)" font-size="13">userEvent, no vm access</text>' +
          '<text x="360" y="152" fill="var(--muted)" font-size="13">asks: can a user do it?</text>' +
          '<text x="360" y="178" fill="var(--ok)" font-size="13">survives refactors</text>' +
          '<rect x="30" y="220" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="248" fill="var(--text)" font-size="14">Both mount a real component into jsdom</text>' +
          '<text x="50" y="272" fill="var(--muted)" font-size="13">Testing Library is a thin layer over Vue Test Utils</text>' +
          '<text x="50" y="294" fill="var(--muted)" font-size="13">the difference is which queries you are allowed to write</text>' +
          '<rect x="30" y="320" width="580" height="85" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="50" y="348" fill="var(--err)" font-size="14">jsdom has no layout engine</text>' +
          '<text x="50" y="372" fill="var(--muted)" font-size="13">no real sizes, no scroll, ResizeObserver must be stubbed</text>' +
          '<text x="50" y="394" fill="var(--muted)" font-size="13">anything geometric belongs in browser mode or Playwright</text>' +
          '</svg>',
        caption: {
          pl: 'Testing Library to cienka warstwa nad Vue Test Utils - obie montują ten sam komponent, ale pozwalają zadawać inne pytania. Granicą obu jest jsdom bez silnika layoutu.',
          en: 'Testing Library is a thin layer over Vue Test Utils - both mount the same component but allow different questions. The shared limit is jsdom, which has no layout engine.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że sprawdzasz nową kuchenkę mikrofalową. Możesz zdjąć obudowę i sprawdzić, czy w środku każdy kabelek jest tam, gdzie go zaprojektowano. Albo możesz wstawić kubek z wodą, nacisnąć przyciski jak normalny człowiek i sprawdzić, czy woda jest ciepła.</p><p>Pierwsze podejście widzi więcej, ale gdy ktoś przełoży kabelek w lepsze miejsce, test krzyczy, choć kuchenka działa idealnie. Drugie podejście sprawdza tylko to, co obchodzi użytkownika, więc przeżywa przeprojektowanie wnętrza.</p><p>W testach komponentów mamy dokładnie te dwa narzędzia. Jedno pozwala zajrzeć do środka komponentu, drugie każe klikać i czytać ekran tak, jak robi to człowiek.</p><p>Jest jeszcze jedna ważna rzecz: cała ta kuchnia jest udawana. To symulacja przeglądarki bez prawdziwego wyświetlania, więc nic nie ma rozmiaru ani pozycji. Pytanie "czy to się mieści na ekranie" po prostu nie ma tu sensownej odpowiedzi.</p>',
          en: '<p>Imagine checking a new microwave. You can take the casing off and verify that every wire sits exactly where the design says. Or you can put in a cup of water, press the buttons like a normal person, and check whether the water got warm.</p><p>The first approach sees more, but the moment someone moves a wire to a better place the test screams even though the microwave works perfectly. The second only checks what the user cares about, so it survives an internal redesign.</p><p>Component testing gives you exactly those two tools. One lets you look inside the component, the other makes you click and read the screen the way a person would.</p><p>One more important thing: the whole kitchen is pretend. It is a browser simulation with no actual display, so nothing has a size or a position. The question "does this fit on screen" simply has no honest answer here.</p>'
        },
        school: {
          pl: '<p>Vue Test Utils (VTU) montuje komponent w jsdom i zwraca <code>wrapper</code> z dostępem do instancji: <code>wrapper.vm</code>, <code>setProps</code>, <code>emitted()</code>, <code>findComponent</code>. Testing Library dla Vue jest zbudowane <em>na</em> VTU, ale celowo odbiera ci dostęp do instancji i zostawia zapytania po tym, co widzi użytkownik: rola ARIA, tekst, etykieta.</p><pre><code>import { render, screen } from \'@testing-library/vue\'\nimport userEvent from \'@testing-library/user-event\'\n\ntest(\'toggles the panel\', async () =&gt; {\n  render(ChiAccordion, { props: { title: \'Billing\' } })\n  await userEvent.click(screen.getByRole(\'button\', { name: \'Billing\' }))\n  expect(screen.getByRole(\'region\')).toBeVisible()\n})</code></pre><p>Domyślnie sięgaj po Testing Library, a po VTU wtedy, gdy testujesz kontrakt niewidoczny w DOM - najczęściej emitowane zdarzenia design systemu.</p><p><strong>Asynchroniczność.</strong> Vue aktualizuje DOM w mikrozadaniu, więc po każdej zmianie stanu trzeba poczekać. W VTU jest to <code>await nextTick()</code> albo <code>await wrapper.setProps(...)</code>; przy obietnicach dochodzi <code>flushPromises()</code>. W Testing Library zapytania <code>findBy*</code> same ponawiają próbę, więc jawnych <code>nextTick</code> jest znacznie mniej - i to jest realny powód, dla którego te testy są mniej migotliwe.</p><p><strong>Konfiguracja.</strong> Vitest z <code>@vitejs/plugin-vue</code> i <code>environment: \'jsdom\'</code> (albo <code>happy-dom</code>, szybszym, ale mniej kompletnym). Globalne wtyczki - router, Pinia, i18n - podaje się przez opcję <code>global.plugins</code>, najlepiej w jednym własnym helperze <code>renderWithApp</code>, żeby nie powtarzać setupu w 300 plikach.</p><p><strong>Kompozable</strong> testuje się bez komponentu, ale potrzebują aktywnej instancji, jeśli używają lifecycle albo <code>inject</code>. Pomocniczy <code>withSetup</code> montuje minimalny komponent i zwraca wynik funkcji setup.</p>',
          en: '<p>Vue Test Utils (VTU) mounts a component into jsdom and returns a <code>wrapper</code> with access to the instance: <code>wrapper.vm</code>, <code>setProps</code>, <code>emitted()</code>, <code>findComponent</code>. Testing Library for Vue is built <em>on top of</em> VTU but deliberately takes instance access away and leaves you queries based on what a user perceives: ARIA role, text, label.</p><pre><code>import { render, screen } from \'@testing-library/vue\'\nimport userEvent from \'@testing-library/user-event\'\n\ntest(\'toggles the panel\', async () =&gt; {\n  render(ChiAccordion, { props: { title: \'Billing\' } })\n  await userEvent.click(screen.getByRole(\'button\', { name: \'Billing\' }))\n  expect(screen.getByRole(\'region\')).toBeVisible()\n})</code></pre><p>Reach for Testing Library by default, and for VTU when you test a contract invisible in the DOM - most often the emitted events of a design-system component.</p><p><strong>Asynchrony.</strong> Vue flushes DOM updates in a microtask, so every state change needs a wait. In VTU that is <code>await nextTick()</code> or <code>await wrapper.setProps(...)</code>; with promises you add <code>flushPromises()</code>. In Testing Library the <code>findBy*</code> queries retry on their own, so explicit <code>nextTick</code> calls almost disappear - and that is a real reason those tests flake less.</p><p><strong>Setup.</strong> Vitest with <code>@vitejs/plugin-vue</code> and <code>environment: \'jsdom\'</code> (or <code>happy-dom</code>, faster but less complete). Global plugins - router, Pinia, i18n - go through the <code>global.plugins</code> option, ideally inside one <code>renderWithApp</code> helper so you do not repeat setup across 300 files.</p><p><strong>Composables</strong> are tested without a component, but they need a live instance if they use lifecycle hooks or <code>inject</code>. A small <code>withSetup</code> helper mounts a minimal component and returns the setup result.</p>'
        },
        pro: {
          pl: '<p><strong>Co naprawdę robi mount.</strong> VTU tworzy prawdziwą aplikację (<code>createApp</code>) i montuje ją do odłączonego <code>div</code>. Odłączonego - stąd większość niespodzianek: Teleport do <code>document.body</code> wyląduje poza wrapperem, focus zachowuje się inaczej, a <code>:focus-visible</code> i style w ogóle nie są liczone. Gdy testujesz modal albo dropdown, montuj z <code>attachTo: document.body</code> i sprzątaj przez <code>wrapper.unmount()</code>, inaczej kolejne testy znajdą dwa dialogi.</p><p><strong>Stuby to dług.</strong> <code>shallowMount</code> i <code>global.stubs</code> kuszą, bo test jest szybszy, ale zamieniają test integracyjny w test snapshotu nazw komponentów. W design systemie to szczególnie bolesne: stub gubi realny render slotów i przepływ atrybutów, czyli dokładnie to, co najczęściej się psuje. Stubuj to, co jest poza twoją kontrolą (ciężki wykres, mapa), nie własne komponenty.</p><pre><code>const { emitted } = mount(ChiSelect, { props: { modelValue: null } })\nawait userEvent.click(screen.getByRole(\'combobox\'))\nawait userEvent.click(screen.getByRole(\'option\', { name: \'Poland\' }))\nexpect(emitted()[\'update:modelValue\']).toEqual([[\'PL\']])</code></pre><p>To jest rozsądny środek: interakcja jak u użytkownika, asercja na kontrakcie komponentu.</p><p><strong>Kompozable i scope.</strong> Test kompozabla z <code>watch</code> albo <code>onScopeDispose</code> wymaga <code>effectScope</code>, inaczej efekty nigdy nie zostaną posprzątane i wyciekną między testami.</p><pre><code>function withSetup(fn) {\n  let result\n  const app = createApp({ setup() { result = fn(); return () =&gt; null } })\n  app.mount(document.createElement(\'div\'))\n  return [result, () =&gt; app.unmount()]\n}</code></pre><p><strong>Bariery jsdom.</strong> Brak silnika layoutu oznacza <code>getBoundingClientRect</code> zwracające same zera, brak <code>IntersectionObserver</code> i <code>ResizeObserver</code>, brak realnego <code>matchMedia</code>. Można je stubować, ale każdy stub to fikcja, która kiedyś rozjedzie się z rzeczywistością. Wszystko, co dotyczy geometrii - wirtualizacja, pozycjonowanie popovera, focus trap w prawdziwym drzewie - należy do Vitest browser mode (Playwright pod spodem) albo do testu e2e.</p><p><strong>Determinizm.</strong> <code>vi.useFakeTimers()</code> dla debounce i throttle, ale pamiętaj o <code>await vi.advanceTimersByTimeAsync(300)</code>, bo synchroniczny wariant nie przepuszcza mikrozadań Vue. Losowe identyfikatory z <code>useId</code> są stabilne w obrębie aplikacji, ale między testami nie - w snapshotach je normalizuj, jeśli w ogóle robisz snapshoty.</p>',
          en: '<p><strong>What mount actually does.</strong> VTU creates a real application with <code>createApp</code> and mounts it into a detached <code>div</code>. Detached - which is where most surprises come from: a Teleport to <code>document.body</code> lands outside the wrapper, focus behaves differently, and <code>:focus-visible</code> or any style computation simply does not happen. When testing a modal or a dropdown, mount with <code>attachTo: document.body</code> and clean up via <code>wrapper.unmount()</code>, otherwise later tests find two dialogs.</p><p><strong>Stubs are debt.</strong> <code>shallowMount</code> and <code>global.stubs</code> are tempting because the test runs faster, but they turn an integration test into a snapshot of component names. In a design system that hurts specifically: a stub loses real slot rendering and attribute fallthrough, which is exactly what breaks most often. Stub what is outside your control - a heavy chart, a map - not your own components.</p><pre><code>const { emitted } = mount(ChiSelect, { props: { modelValue: null } })\nawait userEvent.click(screen.getByRole(\'combobox\'))\nawait userEvent.click(screen.getByRole(\'option\', { name: \'Poland\' }))\nexpect(emitted()[\'update:modelValue\']).toEqual([[\'PL\']])</code></pre><p>That is the sensible middle: interact like a user, assert on the component contract.</p><p><strong>Composables and scope.</strong> Testing a composable that uses <code>watch</code> or <code>onScopeDispose</code> needs an <code>effectScope</code>, otherwise effects are never disposed and leak across tests.</p><pre><code>function withSetup(fn) {\n  let result\n  const app = createApp({ setup() { result = fn(); return () =&gt; null } })\n  app.mount(document.createElement(\'div\'))\n  return [result, () =&gt; app.unmount()]\n}</code></pre><p><strong>The jsdom wall.</strong> No layout engine means <code>getBoundingClientRect</code> returns all zeros, no <code>IntersectionObserver</code> or <code>ResizeObserver</code>, no real <code>matchMedia</code>. You can stub them, but every stub is a fiction that eventually drifts from reality. Anything geometric - virtualisation, popover placement, a focus trap in a real tree - belongs in Vitest browser mode (Playwright underneath) or in an end-to-end test.</p><p><strong>Determinism.</strong> Use <code>vi.useFakeTimers()</code> for debounce and throttle, but remember <code>await vi.advanceTimersByTimeAsync(300)</code>, because the synchronous variant does not let Vue microtasks through. Ids from <code>useId</code> are stable within an app but not across tests - normalise them in snapshots, if you take snapshots at all.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest podstawowa różnica między Vue Test Utils a Testing Library dla Vue?',
            en: 'What is the fundamental difference between Vue Test Utils and Testing Library for Vue?'
          },
          options: [
            { pl: 'Testing Library celowo nie daje dostępu do instancji i wymusza zapytania z perspektywy użytkownika', en: 'Testing Library deliberately withholds instance access and forces user-perspective queries' },
            { pl: 'Testing Library uruchamia testy w prawdziwej przeglądarce, VTU w jsdom', en: 'Testing Library runs in a real browser while VTU runs in jsdom' },
            { pl: 'VTU nie potrafi symulować zdarzeń użytkownika', en: 'VTU cannot simulate user events' },
            { pl: 'Testing Library nie montuje komponentu, tylko renderuje go do stringa', en: 'Testing Library does not mount the component, it renders it to a string' }
          ],
          correct: 0,
          explain: {
            pl: 'Testing Library jest cienką warstwą nad VTU i montuje dokładnie tak samo. Różnica jest w dostępnym API: zamiast wrapper.vm dostajesz zapytania po roli, tekście i etykiecie.',
            en: 'Testing Library is a thin layer over VTU and mounts in exactly the same way. The difference is the API surface: instead of wrapper.vm you get role, text and label queries.'
          }
        },
        {
          q: {
            pl: 'Test popovera sprawdza, czy nie wychodzi poza viewport. Dlaczego w jsdom to nie zadziała?',
            en: 'A popover test checks it does not overflow the viewport. Why will that not work in jsdom?'
          },
          options: [
            { pl: 'jsdom blokuje position: absolute', en: 'jsdom blocks position: absolute' },
            { pl: 'Trzeba dodać await nextTick przed asercją', en: 'You need an await nextTick before the assertion' },
            { pl: 'jsdom nie ma silnika layoutu, więc getBoundingClientRect zwraca same zera', en: 'jsdom has no layout engine, so getBoundingClientRect returns all zeros' },
            { pl: 'Teleport nie działa w środowisku testowym', en: 'Teleport does not work in a test environment' }
          ],
          correct: 2,
          explain: {
            pl: 'jsdom parsuje DOM i CSS, ale nic nie układa. Testy geometryczne przenieś do Vitest browser mode albo Playwrighta - stubowanie rozmiarów daje tylko fałszywe poczucie pokrycia.',
            en: 'jsdom parses DOM and CSS but lays nothing out. Move geometric tests to Vitest browser mode or Playwright - stubbing sizes only buys a false sense of coverage.'
          }
        },
        {
          q: {
            pl: 'Dlaczego shallowMount jest zwykle złym domyślnym wyborem w testach komponentów design systemu?',
            en: 'Why is shallowMount usually a poor default for design-system component tests?'
          },
          options: [
            { pl: 'Jest wolniejszy od pełnego mount', en: 'It is slower than a full mount' },
            { pl: 'Nie obsługuje propsów ani zdarzeń', en: 'It does not support props or events' },
            { pl: 'Stubuje dzieci, więc gubi render slotów i przepływ atrybutów - dokładnie to, co się psuje', en: 'It stubs children, losing slot rendering and attribute fallthrough - exactly what tends to break' },
            { pl: 'Nie działa z script setup', en: 'It does not work with script setup' }
          ],
          correct: 2,
          explain: {
            pl: 'Stub zamienia test integracyjny w asercję na nazwach komponentów. Kontrakt design systemu żyje w slotach, atrybutach i ARIA, a tego stub nie renderuje.',
            en: 'A stub turns an integration test into an assertion about component names. A design-system contract lives in slots, attributes and ARIA, none of which a stub renders.'
          }
        },
        {
          q: {
            pl: 'Test kompozabla z debounce używa vi.useFakeTimers() i vi.advanceTimersByTime(300), ale asercja widzi starą wartość. Co jest nie tak?',
            en: 'A debounced composable test uses vi.useFakeTimers() and vi.advanceTimersByTime(300), yet the assertion sees the old value. What is wrong?'
          },
          options: [
            { pl: 'Fake timery nie działają z kompozablami Vue', en: 'Fake timers do not work with Vue composables' },
            { pl: 'Trzeba przepuścić mikrozadania - użyć wariantu async advanceTimersByTimeAsync albo dodać await nextTick', en: 'Microtasks must be flushed - use the async advanceTimersByTimeAsync variant or add an await nextTick' },
            { pl: 'Debounce wymaga prawdziwych timerów, fake timery trzeba wyłączyć', en: 'Debounce needs real timers, fake timers must be disabled' },
            { pl: 'Kompozabl musi być zamontowany przez shallowMount', en: 'The composable must be mounted with shallowMount' }
          ],
          correct: 1,
          explain: {
            pl: 'Vue planuje aktualizacje w kolejce mikrozadań. Synchroniczne przewinięcie timerów odpala callback, ale efekt i render czekają na flush - stąd await na wariancie async.',
            en: 'Vue schedules updates on the microtask queue. Advancing timers synchronously fires the callback, but the effect and render still wait for a flush - hence awaiting the async variant.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'component-testing-patterns',
      title: {
        pl: 'Wzorce testowania komponentów',
        en: 'Component testing patterns'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'test kontraktu a test implementacji', en: 'contract test versus implementation test' },
          def: {
            pl: 'Kontrakt to, co widzi i robi konsument komponentu: propsy, emity, sloty, dostępność. Implementacja to nazwy klas i stan wewnętrzny - test na nich pęka przy każdym refaktorze.',
            en: 'The contract is what a consumer sees and does: props, emits, slots, accessibility. The implementation is class names and internal state - a test on those breaks on every refactor.'
          }
        },
        {
          term: { pl: 'kontrakt v-model', en: 'the v-model contract' },
          def: {
            pl: 'Komponent kontrolowany przyjmuje <code>modelValue</code> i emituje <code>update:modelValue</code>, nie zmieniając własnego stanu bez odpowiedzi rodzica. Test: nie podnoś propa i sprawdź, że wartość stoi.',
            en: 'A controlled component takes <code>modelValue</code> and emits <code>update:modelValue</code> without changing its own state until the parent responds. The test: do not lift the prop, and assert the value stays put.'
          }
        },
        {
          term: { pl: 'przekazywanie slotów i atrybutów', en: 'slot and attribute forwarding' },
          def: {
            pl: 'Wrapper w design systemie musi przekazać w dół sloty, <code>class</code>, <code>style</code>, handlery i atrybuty ARIA. To najczęstsza cicha regresja i najtańszy test do napisania.',
            en: 'A design-system wrapper must pass slots, <code>class</code>, <code>style</code>, handlers and ARIA attributes down. This is the most common silent regression and the cheapest test to write.'
          }
        },
        {
          term: { pl: 'dług snapshotów', en: 'snapshot debt' },
          def: {
            pl: 'Duże snapshoty DOM komponentów bibliotecznych zmieniają się przy każdej kosmetyce, więc są akceptowane bez czytania. Lepsze są celowane asercje na role, atrybuty i emitowane zdarzenia.',
            en: 'Large DOM snapshots of library components change on every cosmetic tweak, so they get approved unread. Targeted assertions on roles, attributes and emitted events are better.'
          }
        },
        {
          term: { pl: 'test dostępności', en: 'accessibility test' },
          def: {
            pl: 'Automatyczna kontrola przez <code>vitest-axe</code> lub <code>axe-core</code> łapie brakujące etykiety, kontrast i złamane role. Wykrywa tylko część problemów, ale najtańszą część.',
            en: 'An automated check with <code>vitest-axe</code> or <code>axe-core</code> catches missing labels, contrast and broken roles. It finds only a subset of issues, but the cheapest subset.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Test the contract, not the implementation</text>' +
          '<rect x="30" y="45" width="580" height="140" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="50" y="73" fill="var(--ok)" font-size="15">Public contract - worth testing</text>' +
          '<text x="50" y="101" fill="var(--muted)" font-size="13">props in, rendered output out</text>' +
          '<text x="50" y="125" fill="var(--muted)" font-size="13">emitted events and their payloads</text>' +
          '<text x="50" y="149" fill="var(--muted)" font-size="13">slots, attribute fallthrough, ARIA wiring</text>' +
          '<text x="50" y="173" fill="var(--muted)" font-size="13">keyboard interaction and focus order</text>' +
          '<rect x="30" y="205" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="50" y="233" fill="var(--err)" font-size="15">Internals - not worth testing</text>' +
          '<text x="50" y="261" fill="var(--muted)" font-size="13">names of internal refs and computeds</text>' +
          '<text x="50" y="285" fill="var(--muted)" font-size="13">which child component was used</text>' +
          '<text x="50" y="309" fill="var(--muted)" font-size="13">full DOM snapshots of a styled component</text>' +
          '<rect x="30" y="345" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="50" y="373" fill="var(--text)" font-size="14">Good question: would this test fail if I rewrote the internals?</text>' +
          '<text x="50" y="395" fill="var(--muted)" font-size="13">if yes, and behaviour is unchanged, the test is a liability</text>' +
          '</svg>',
        caption: {
          pl: 'Kontrakt komponentu to propsy, zdarzenia, sloty, atrybuty i klawiatura. Wszystko, co pod spodem, ma prawo się zmienić bez czerwonego testu.',
          en: 'A component contract is props, events, slots, attributes and the keyboard. Everything underneath is free to change without turning a test red.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że oceniasz automat z kawą. Dobre sprawdzenie wygląda tak: wrzucam monetę, wciskam "espresso", dostaję espresso. Jeśli tak jest, automat działa - niezależnie od tego, jakie rurki ma w środku.</p><p>Złe sprawdzenie wygląda tak: otwieram klapkę i sprawdzam, czy trzecia rurka od lewej nazywa się dokładnie "rurka3". Kiedy serwisant wymieni ją na lepszą, twoja lista kontrolna zaświeci na czerwono, choć kawa smakuje tak samo. Zaczniesz jej nie ufać, a potem przestaniesz czytać.</p><p>Dlatego przy komponentach sprawdzamy to, co widzi i robi człowiek: co wpisujesz, co się pokazuje, co się dzieje po kliknięciu i czy da się to obsłużyć samą klawiaturą. Nazwy rzeczy w środku to nie nasza sprawa.</p>',
          en: '<p>Imagine judging a coffee machine. A good check looks like this: I put in a coin, press "espresso", I get espresso. If that holds, the machine works - whatever pipes it has inside.</p><p>A bad check looks like this: I open the hatch and verify that the third pipe from the left is still called exactly "pipe3". When a technician swaps it for a better one, your checklist goes red even though the coffee tastes the same. You start distrusting the list, and then you stop reading it.</p><p>So with components we check what a person sees and does: what you type, what appears, what happens on a click, and whether the whole thing can be driven from the keyboard alone. The names of the parts inside are none of our business.</p>'
        },
        school: {
          pl: '<p>Test komponentu ma sens tylko wtedy, gdy opisuje kontrakt. Dla komponentu design systemu kontrakt to pięć rzeczy: propsy wejściowe, wyrenderowany rezultat, emitowane zdarzenia z ładunkiem, sloty i przekazywane atrybuty, oraz obsługa klawiatury i ARIA.</p><p>Praktyczna heurystyka: <em>czy ten test spadnie, jeśli przepiszę wnętrze komponentu, nie zmieniając zachowania?</em> Jeśli tak, test jest kosztem, nie zabezpieczeniem.</p><p><strong>Warianty testuj tabelą.</strong> Komponent z pięcioma rozmiarami i czterema tonami to dwadzieścia kombinacji - nie pisz dwudziestu bloków <code>it</code>.</p><pre><code>it.each([\n  [\'sm\', \'primary\'],\n  [\'lg\', \'danger\']\n])(\'renders %s %s\', async (size, tone) =&gt; {\n  render(ChiButton, { props: { size, tone }, slots: { default: \'Save\' } })\n  expect(screen.getByRole(\'button\', { name: \'Save\' })).toBeVisible()\n})</code></pre><p><strong>Testuj klawiaturę.</strong> W design systemie to nie jest bonus, tylko główny powód istnienia komponentu. Dropdown musi otwierać się Enterem i spacją, zamykać Escape, przesuwać zaznaczenie strzałkami i zwracać focus do triggera. Cztery asercje, które wyłapują więcej regresji niż cały snapshot.</p><p><strong>Snapshoty ograniczaj.</strong> Snapshot całego DOM komponentu ze stylami psuje się przy każdej kosmetycznej zmianie i nikt go nie czyta przy review - wszyscy naciskają <code>-u</code>. Jeśli już, rób małe, celowane snapshoty jednego fragmentu, na przykład wygenerowanych powiązań <code>aria-describedby</code>.</p><p><strong>Izoluj zależności</strong> przez <code>global.provide</code> zamiast mockowania modułów - komponent, który przyjmuje kontekst przez <code>inject</code>, jest po prostu łatwiejszy do testowania i to jest sygnał projektowy, nie przypadek.</p>',
          en: '<p>A component test earns its place only when it describes a contract. For a design-system component that contract is five things: incoming props, rendered output, emitted events with their payloads, slots and forwarded attributes, and keyboard plus ARIA behaviour.</p><p>A practical heuristic: <em>would this test fail if I rewrote the internals without changing behaviour?</em> If yes, the test is a cost, not a safety net.</p><p><strong>Table-drive the variants.</strong> A component with five sizes and four tones is twenty combinations - do not write twenty <code>it</code> blocks.</p><pre><code>it.each([\n  [\'sm\', \'primary\'],\n  [\'lg\', \'danger\']\n])(\'renders %s %s\', async (size, tone) =&gt; {\n  render(ChiButton, { props: { size, tone }, slots: { default: \'Save\' } })\n  expect(screen.getByRole(\'button\', { name: \'Save\' })).toBeVisible()\n})</code></pre><p><strong>Test the keyboard.</strong> In a design system this is not a bonus, it is the main reason the component exists. A dropdown must open on Enter and Space, close on Escape, move the active option with arrows, and return focus to the trigger. Four assertions that catch more regressions than an entire snapshot.</p><p><strong>Keep snapshots small.</strong> A full DOM snapshot of a styled component breaks on every cosmetic change and nobody reads it in review - everyone just presses <code>-u</code>. If you must, take tiny targeted snapshots of one fragment, for example the generated <code>aria-describedby</code> wiring.</p><p><strong>Isolate dependencies</strong> with <code>global.provide</code> rather than module mocking - a component that receives context through <code>inject</code> is simply easier to test, and that is a design signal, not a coincidence.</p>'
        },
        pro: {
          pl: '<p><strong>Piramida dla biblioteki komponentów.</strong> W praktyce działa podział: dużo testów kontraktu w jsdom (szybkie, sekundy), warstwa testów w prawdziwej przeglądarce dla wszystkiego geometrycznego i focusowego, cienka warstwa e2e na krytycznych ścieżkach aplikacji konsumenckich, plus osobno regresja wizualna. Regresja wizualna nie jest testem jednostkowym i nie powinna mieszkać w tym samym runnerze - jej sygnał to "piksel się zmienił", a nie "zachowanie się zepsuło".</p><p><strong>Testowanie przekazywania slotów i atrybutów.</strong> To najczęściej łamany kontrakt w wrapperach.</p><pre><code>const { container } = render(ChiField, {\n  attrs: { \'data-testid\': \'field\', \'aria-describedby\': \'hint\' },\n  slots: { label: \'Email\', hint: \'We never share it\' }\n})\nconst input = screen.getByLabelText(\'Email\')\nexpect(input).toHaveAttribute(\'aria-describedby\', expect.stringContaining(\'hint\'))</code></pre><p>Sprawdzasz tu jedną rzecz, ale bardzo wartościową: że atrybut konsumenta doszedł do właściwego elementu, a nie osiadł na zewnętrznym <code>div</code>.</p><p><strong>Kontrakt v-model.</strong> Komponent kontrolowany nie powinien zmieniać własnego stanu bez potwierdzenia rodzica. Test: wyrenderuj z <code>modelValue</code>, wykonaj interakcję, sprawdź, że emitowane jest <code>update:modelValue</code> <em>i</em> że widok nadal pokazuje starą wartość, dopóki prop się nie zmieni. Ten test wyłapuje najczęstszy błąd projektowy - lokalny bufor w środku, który cicho rozjeżdża się ze źródłem prawdy.</p><p><strong>Determinizm i migotanie.</strong> Główne źródła flaków to: brak <code>await</code> przed asercją, prawdziwe timery, animacje (<code>Transition</code> emituje zdarzenia zależne od czasu - w testach wyłączaj przez globalny stub albo <code>prefers-reduced-motion</code>), oraz stan pozostawiony w <code>document.body</code> przez Teleport. Wymuś czyszczenie w <code>afterEach</code>; Testing Library robi to samo, VTU nie.</p><p><strong>Pokrycie kłamie.</strong> 90 procent linii w komponencie przycisku znaczy tyle, że go zamontowałeś. Bardziej sensowna metryka dla design systemu to udział komponentów z testem klawiatury i testem a11y (<code>vitest-axe</code> albo <code>axe-core</code> w browser mode) - to koreluje z realnymi zgłoszeniami od zespołów konsumenckich.</p><p><strong>Testy jako dokumentacja API.</strong> Jeśli nazwiesz bloki <code>describe</code> od nazw propsów i zdarzeń, plik testu staje się czytelną specyfikacją komponentu. W bibliotece używanej przez kilkanaście zespołów to często jedyna specyfikacja, która nie jest nieaktualna.</p>',
          en: '<p><strong>The pyramid for a component library.</strong> What works in practice: many contract tests in jsdom (fast, seconds), a layer of real-browser tests for anything geometric or focus-related, a thin end-to-end layer over the critical paths of consumer apps, plus visual regression kept separate. Visual regression is not a unit test and should not live in the same runner - its signal is "a pixel changed", not "behaviour broke".</p><p><strong>Testing slot and attribute forwarding.</strong> This is the most frequently broken contract in wrappers.</p><pre><code>const { container } = render(ChiField, {\n  attrs: { \'data-testid\': \'field\', \'aria-describedby\': \'hint\' },\n  slots: { label: \'Email\', hint: \'We never share it\' }\n})\nconst input = screen.getByLabelText(\'Email\')\nexpect(input).toHaveAttribute(\'aria-describedby\', expect.stringContaining(\'hint\'))</code></pre><p>You assert one thing, but a very valuable one: that a consumer attribute reached the right element instead of settling on an outer <code>div</code>.</p><p><strong>The v-model contract.</strong> A controlled component must not change its own state without the parent confirming. The test: render with <code>modelValue</code>, interact, assert that <code>update:modelValue</code> is emitted <em>and</em> that the view still shows the old value until the prop changes. This catches the most common design bug - a hidden local buffer that silently drifts from the source of truth.</p><p><strong>Determinism and flake.</strong> The main flake sources are: a missing <code>await</code> before an assertion, real timers, animations (<code>Transition</code> emits time-dependent events - disable it in tests with a global stub or <code>prefers-reduced-motion</code>), and state left in <code>document.body</code> by a Teleport. Force cleanup in <code>afterEach</code>; Testing Library does it for you, VTU does not.</p><p><strong>Coverage lies.</strong> Ninety percent line coverage on a button component means you mounted it. A more meaningful design-system metric is the share of components that have a keyboard test and an accessibility test (<code>vitest-axe</code>, or <code>axe-core</code> in browser mode) - that correlates with actual tickets from consumer teams.</p><p><strong>Tests as API documentation.</strong> If you name <code>describe</code> blocks after props and events, the test file becomes a readable component specification. In a library used by a dozen teams that is often the only specification that is not out of date.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Która heurystyka najlepiej odróżnia test kontraktu od testu implementacji?',
            en: 'Which heuristic best separates a contract test from an implementation test?'
          },
          options: [
            { pl: 'Czy test używa mount zamiast shallowMount', en: 'Whether the test uses mount instead of shallowMount' },
            { pl: 'Czy test ma mniej niż dziesięć linii', en: 'Whether the test is under ten lines' },
            { pl: 'Czy test korzysta z Testing Library', en: 'Whether the test uses Testing Library' },
            { pl: 'Czy test spadnie po przepisaniu wnętrza bez zmiany zachowania', en: 'Whether the test fails after rewriting the internals without changing behaviour' }
          ],
          correct: 3,
          explain: {
            pl: 'Kontrakt to zachowanie widoczne z zewnątrz. Test, który czerwienieje przy refaktorze bez zmiany zachowania, blokuje pracę zamiast ją chronić.',
            en: 'A contract is externally visible behaviour. A test that goes red on a behaviour-preserving refactor blocks work instead of protecting it.'
          }
        },
        {
          q: {
            pl: 'Jak najlepiej sprawdzić, że komponent pola formularza jest naprawdę kontrolowany?',
            en: 'What is the best way to verify that a form field component is genuinely controlled?'
          },
          options: [
            { pl: 'Sprawdzić, że wewnętrzny ref nie istnieje', en: 'Assert that no internal ref exists' },
            { pl: 'Zrobić interakcję i sprawdzić, że emituje update:modelValue, a widok wciąż pokazuje starą wartość', en: 'Interact, then assert it emits update:modelValue while the view still shows the old value' },
            { pl: 'Zrobić snapshot DOM po interakcji', en: 'Take a DOM snapshot after the interaction' },
            { pl: 'Sprawdzić, że defineModel został użyty', en: 'Assert that defineModel was used' }
          ],
          correct: 1,
          explain: {
            pl: 'Komponent kontrolowany prosi o zmianę, ale jej sam nie stosuje. Jeśli widok zmienia się bez nowego propsa, w środku jest lokalny bufor - i to jest błąd, nie optymalizacja.',
            en: 'A controlled component requests a change but does not apply it itself. If the view moves without a new prop there is a local buffer inside - a bug, not an optimisation.'
          }
        },
        {
          q: {
            pl: 'Dlaczego duże snapshoty DOM komponentów design systemu zwykle szkodzą?',
            en: 'Why do large DOM snapshots of design-system components usually do harm?'
          },
          options: [
            { pl: 'Vitest ich nie obsługuje dla plików .vue', en: 'Vitest does not support them for .vue files' },
            { pl: 'Spowalniają CI o rzędy wielkości', en: 'They slow CI down by orders of magnitude' },
            { pl: 'Psują się przy kosmetycznych zmianach i nikt ich nie czyta - wszyscy aktualizują je bezrefleksyjnie', en: 'They break on cosmetic changes and nobody reads them - everyone just updates them blindly' },
            { pl: 'Nie da się ich uruchomić w trybie watch', en: 'They cannot run in watch mode' }
          ],
          correct: 2,
          explain: {
            pl: 'Snapshot bez czytelnika to nie test, tylko rytuał. Małe, celowane asercje - na przykład na powiązaniach ARIA - dają realny sygnał przy review.',
            en: 'A snapshot nobody reads is a ritual, not a test. Small targeted assertions - for example on ARIA wiring - give a real signal in review.'
          }
        },
        {
          q: {
            pl: 'Testy modala przechodzą pojedynczo, ale w pełnym przebiegu znajdują dwa dialogi. Najbardziej prawdopodobna przyczyna?',
            en: 'Modal tests pass in isolation but find two dialogs in a full run. Most likely cause?'
          },
          options: [
            { pl: 'Teleport zostawił węzły w document.body, bo brakuje unmount lub cleanup w afterEach', en: 'The Teleport left nodes in document.body because unmount or afterEach cleanup is missing' },
            { pl: 'Vitest uruchamia pliki równolegle w tym samym DOM', en: 'Vitest runs files in parallel inside the same DOM' },
            { pl: 'Modal renderuje się dwa razy z powodu StrictMode', en: 'The modal renders twice because of StrictMode' },
            { pl: 'getByRole dialog łapie też element ukryty przez v-show', en: 'getByRole dialog also matches an element hidden by v-show' }
          ],
          correct: 0,
          explain: {
            pl: 'Teleport montuje poza wrapperem, więc automatyczne sprzątanie wrappera go nie dotyczy. Testing Library czyści po każdym teście, przy gołym VTU trzeba to zrobić samemu.',
            en: 'A Teleport mounts outside the wrapper, so wrapper-scoped cleanup does not cover it. Testing Library cleans up after each test; with bare VTU you must do it yourself.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'e2e-playwright',
      title: {
        pl: 'Testy e2e w Playwright',
        en: 'End-to-end testing with Playwright'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'locator', en: 'locator' },
          def: {
            pl: 'Leniwy opis elementu w Playwright, rozwiązywany dopiero przy akcji i z wbudowanym czekaniem. Dlatego <code>await expect(locator)</code> nie potrzebuje ręcznych sleepów.',
            en: 'A lazy description of an element in Playwright, resolved only at action time and with built-in waiting. That is why <code>await expect(locator)</code> needs no manual sleeps.'
          }
        },
        {
          term: { pl: 'getByRole', en: 'getByRole' },
          def: {
            pl: 'Zapytanie po roli dostępności i nazwie. Nie pęka przy zmianie klas CSS w design systemie, a przy okazji weryfikuje, że komponent ma poprawną semantykę.',
            en: 'A query by accessibility role and name. It does not break when design-system CSS classes change, and it verifies the component has correct semantics along the way.'
          }
        },
        {
          term: { pl: 'trace viewer', en: 'trace viewer' },
          def: {
            pl: 'Zapis przebiegu testu: snapshoty DOM przed i po każdej akcji, sieć i konsola. Z ustawieniem <code>trace: on-first-retry</code> to najszybsza droga do diagnozy testu padającego tylko na CI.',
            en: 'A recording of the run: DOM snapshots before and after each action, network and console. With <code>trace: on-first-retry</code> it is the fastest route to diagnosing a CI-only failure.'
          }
        },
        {
          term: { pl: 'sharding i retries', en: 'sharding and retries' },
          def: {
            pl: 'Podział zestawu na równoległe części (<code>--shard=1/4</code>) plus ponowienia na CI. Skraca czas, ale ponowienia mają maskować flake infrastruktury, nie realne błędy.',
            en: 'Splitting the suite into parallel parts (<code>--shard=1/4</code>) plus retries on CI. It cuts wall time, but retries should mask infrastructure flake, never real bugs.'
          }
        },
        {
          term: { pl: 'visual regression', en: 'visual regression' },
          def: {
            pl: 'Porównanie zrzutu ekranu z wzorcem przez <code>toHaveScreenshot()</code>. Wzorce generuje się w tym samym obrazie kontenera co CI, bo rendering fontów różni się między systemami.',
            en: 'Comparing a screenshot against a baseline with <code>toHaveScreenshot()</code>. Baselines must be generated in the same container image as CI, because font rendering differs across systems.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m6l5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Why Playwright assertions do not flake</text>' +
          '<rect x="30" y="50" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="155" y="78" fill="var(--err)" font-size="15" text-anchor="middle">imperative style</text>' +
          '<text x="155" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">find node, then assert</text>' +
          '<text x="155" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">one shot, races the app</text>' +
          '<rect x="360" y="50" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="78" fill="var(--ok)" font-size="15" text-anchor="middle">locator style</text>' +
          '<text x="485" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">a query, resolved later</text>' +
          '<text x="485" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">retried until timeout</text>' +
          '<line x1="155" y1="132" x2="155" y2="168" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l5a)"/>' +
          '<line x1="485" y1="132" x2="485" y2="168" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l5a)"/>' +
          '<rect x="30" y="172" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="200" fill="var(--muted)" font-size="13" text-anchor="middle">fix with sleep(500)</text>' +
          '<text x="155" y="224" fill="var(--err)" font-size="13" text-anchor="middle">slow and still flaky</text>' +
          '<rect x="360" y="172" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="485" y="200" fill="var(--muted)" font-size="13" text-anchor="middle">actionability checks</text>' +
          '<text x="485" y="224" fill="var(--ok)" font-size="13" text-anchor="middle">visible, stable, enabled</text>' +
          '<rect x="30" y="270" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="50" y="298" fill="var(--text)" font-size="14">getByRole(\'button\', { name: \'Save\' }) reads the a11y tree</text>' +
          '<text x="50" y="320" fill="var(--muted)" font-size="13">so a broken label breaks the test - that is a feature</text>' +
          '<rect x="30" y="350" width="580" height="55" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="383" fill="var(--warn)" font-size="14" text-anchor="middle">Every waitForTimeout in a suite is a future flake</text>' +
          '</svg>',
        caption: {
          pl: 'Locator to zapytanie, nie znaleziony węzeł. Asercje web-first ponawiają je aż do timeoutu, dlatego dobrze napisany test e2e nie potrzebuje ani jednego sleepa.',
          en: 'A locator is a query, not a found node. Web-first assertions retry it until the timeout, which is why a well-written end-to-end test needs no sleep at all.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że prosisz kogoś: "przynieś mi kubek ze stołu". Jeśli ta osoba pobiegnie natychmiast, może dotrzeć zanim ktokolwiek postawi kubek - i wróci z pustymi rękami. Możesz kazać jej odczekać pięć sekund, ale przy wolnym dniu i tak będzie za wcześnie, a przy szybkim po prostu marnujesz czas.</p><p>Lepsze polecenie brzmi: "poczekaj przy stole, aż pojawi się kubek, i wtedy go przynieś - ale nie dłużej niż pół minuty". Nie zgadujesz czasu, tylko opisujesz warunek.</p><p>Tak właśnie działa dobre narzędzie do testów całej aplikacji. Nie mówisz "kliknij teraz", tylko "kliknij przycisk Zapisz, gdy będzie widoczny i klikalny". Dzięki temu test nie kłamie ani gdy serwer zwolni, ani gdy przyspieszy. A gdy coś pójdzie nie tak, dostajesz nagranie z całej próby.</p>',
          en: '<p>Imagine asking someone: "bring me the mug from the table". If they sprint off immediately they might arrive before anyone puts a mug there - and come back empty-handed. You could tell them to wait five seconds, but on a slow day that is still too early, and on a fast day you just wasted time.</p><p>A better instruction is: "wait by the table until a mug appears, then bring it - but give up after half a minute". You are not guessing a duration, you are describing a condition.</p><p>That is how a good whole-app testing tool works. You do not say "click now", you say "click the Save button once it is visible and clickable". The test then stays honest whether the server slows down or speeds up. And when something does go wrong, you get a recording of the whole attempt.</p>'
        },
        school: {
          pl: '<p>Playwright zbudowany jest wokół dwóch pomysłów. Pierwszy to <strong>locator</strong>: <code>page.getByRole(\'button\', { name: \'Save\' })</code> nie wyszukuje elementu od razu, tylko zapamiętuje zapytanie. Drugi to <strong>asercje web-first</strong>: <code>await expect(locator).toBeVisible()</code> ponawia zapytanie aż do skutku lub timeoutu. Razem eliminują 90 procent powodów, dla których testy e2e mają złą reputację.</p><pre><code>test(\'creates an invoice\', async ({ page }) =&gt; {\n  await page.goto(\'/invoices\')\n  await page.getByRole(\'button\', { name: \'New invoice\' }).click()\n  await page.getByLabel(\'Customer\').fill(\'Acme\')\n  await page.getByRole(\'button\', { name: \'Save\' }).click()\n  await expect(page.getByRole(\'status\')).toHaveText(/saved/i)\n})</code></pre><p>Zanim Playwright kliknie, sprawdza <em>actionability</em>: element jest podłączony do DOM, widoczny, stabilny (nie animuje się), włączony i nie zasłonięty. To dlatego <code>waitForTimeout</code> jest zapachem - jeśli musisz go dodać, zwykle asercja jest postawiona na złym elemencie.</p><p><strong>Wybieraj po roli.</strong> <code>getByRole</code> czyta drzewo dostępności, więc test wywraca się, gdy przycisk straci etykietę. Selektory CSS na klasach design systemu wywracają się przy każdym refaktorze stylów i nie mówią nic o użytkowniku.</p><p><strong>Izolacja.</strong> Każdy test dostaje świeży kontekst przeglądarki, czyli czyste cookies i storage. Logowanie robi się raz w <code>globalSetup</code> i zapisuje do <code>storageState</code>, którego używają wszystkie testy - to zwykle największa oszczędność czasu w całym pakiecie.</p><p><strong>Mockowanie sieci</strong> przez <code>page.route()</code> pozwala testować stany błędu i puste listy bez stawiania backendu w takim stanie. Uwaga: im więcej zamockujesz, tym bliżej jesteś testu integracyjnego - a wtedy warto zapytać, czy nie taniej byłoby zrobić go w Vitest.</p>',
          en: '<p>Playwright is built on two ideas. The first is the <strong>locator</strong>: <code>page.getByRole(\'button\', { name: \'Save\' })</code> does not search for an element immediately, it stores a query. The second is <strong>web-first assertions</strong>: <code>await expect(locator).toBeVisible()</code> re-runs that query until it passes or times out. Together they remove 90 percent of the reasons end-to-end tests earned their bad reputation.</p><pre><code>test(\'creates an invoice\', async ({ page }) =&gt; {\n  await page.goto(\'/invoices\')\n  await page.getByRole(\'button\', { name: \'New invoice\' }).click()\n  await page.getByLabel(\'Customer\').fill(\'Acme\')\n  await page.getByRole(\'button\', { name: \'Save\' }).click()\n  await expect(page.getByRole(\'status\')).toHaveText(/saved/i)\n})</code></pre><p>Before clicking, Playwright runs <em>actionability</em> checks: the element is attached, visible, stable (not animating), enabled and not obscured. That is why <code>waitForTimeout</code> is a smell - if you need one, the assertion is usually pointed at the wrong element.</p><p><strong>Select by role.</strong> <code>getByRole</code> reads the accessibility tree, so the test breaks when a button loses its label. CSS selectors on design-system class names break on every styling refactor and say nothing about the user.</p><p><strong>Isolation.</strong> Every test gets a fresh browser context, meaning clean cookies and storage. You log in once in <code>globalSetup</code>, save <code>storageState</code>, and reuse it everywhere - usually the single biggest time saving in the suite.</p><p><strong>Network mocking</strong> via <code>page.route()</code> lets you test error states and empty lists without forcing the backend into that state. Careful though: the more you mock, the closer you are to an integration test - at which point ask whether Vitest would be cheaper.</p>'
        },
        pro: {
          pl: '<p><strong>Ile e2e jest sensowne.</strong> Dla aplikacji korporacyjnej realny cel to kilkanaście do kilkudziesięciu scenariuszy pokrywających ścieżki, których awaria kosztuje pieniądze: logowanie, główny formularz, płatność, eksport. Cały pakiet powinien mieścić się w 10 minutach na CI - przy dłuższym czasie ludzie przestają czekać i zaczynają mergować z czerwonym.</p><p><strong>Skalowanie w CI.</strong> <code>--shard=1/4</code> na czterech runnerach plus <code>fullyParallel: true</code> i workery dobrane do liczby rdzeni. <code>retries: 2</code> tylko w CI, nigdy lokalnie - lokalnie flak ma boleć. Ważne: retry maskuje niestabilność, więc traktuj raport "flaky" jak backlog, a nie jak sukces. Playwright oznacza takie testy osobno właśnie po to.</p><pre><code>export default defineConfig({\n  fullyParallel: true,\n  retries: process.env.CI ? 2 : 0,\n  reporter: [[\'html\'], [\'blob\']],\n  use: { trace: \'on-first-retry\', video: \'retain-on-failure\' }\n})</code></pre><p><strong>Trace viewer</strong> to argument, który rozstrzyga dyskusję "u mnie działa". Zapis zawiera snapshoty DOM przed i po każdej akcji, konsolę, żądania sieciowe i timeline. Przy <code>trace: \'on-first-retry\'</code> koszt jest znikomy, a debug awarii z nocnego przebiegu skraca się z godziny do kilku minut.</p><p><strong>Regresja wizualna.</strong> <code>await expect(page).toHaveScreenshot()</code> działa, ale tylko wtedy, gdy baseline powstaje w tym samym środowisku co porównanie - w praktyce w kontenerze Dockera z obrazem Playwrighta, bo rendering fontów różni się między macOS a Linuksem. Ustaw <code>maxDiffPixelRatio</code> zamiast zera i wyłącz animacje (<code>animations: \'disabled\'</code>), inaczej dostaniesz szum zamiast sygnału.</p><p><strong>Dla design systemu</strong> osobno warto rozważyć Playwright component testing: montuje komponent Vue w prawdziwej przeglądarce, więc dostajesz layout, focus i prawdziwe zdarzenia klawiatury, bez kosztu uruchamiania całej aplikacji. To jest właściwe miejsce na testy focus trapa, pozycjonowania popovera i wirtualizacji - te, które w jsdom są tylko udawane.</p><p><strong>Antywzorce, które widać w każdym starym pakiecie:</strong> selektory po klasach CSS, zależności między testami (test 3 zakłada dane utworzone przez test 2), współdzielone konto testowe modyfikowane równolegle, <code>waitForTimeout</code> jako lek na wszystko oraz asercje na dokładnych stringach zamiast wyrażeń regularnych w aplikacji wielojęzycznej.</p>',
          en: '<p><strong>How much end-to-end is sensible.</strong> For an enterprise app the realistic target is a dozen to a few dozen scenarios covering paths whose failure costs money: login, the main form, payment, export. The whole suite should fit inside 10 minutes on CI - beyond that people stop waiting and start merging on red.</p><p><strong>Scaling in CI.</strong> <code>--shard=1/4</code> across four runners plus <code>fullyParallel: true</code> and workers matched to core count. <code>retries: 2</code> in CI only, never locally - locally a flake should hurt. Important: retries mask instability, so treat the "flaky" report as a backlog rather than a success. Playwright marks those tests separately for exactly that reason.</p><pre><code>export default defineConfig({\n  fullyParallel: true,\n  retries: process.env.CI ? 2 : 0,\n  reporter: [[\'html\'], [\'blob\']],\n  use: { trace: \'on-first-retry\', video: \'retain-on-failure\' }\n})</code></pre><p><strong>The trace viewer</strong> is the artefact that ends every "works on my machine" argument. A trace holds DOM snapshots before and after each action, the console, network requests and a timeline. With <code>trace: \'on-first-retry\'</code> the cost is negligible, and debugging a nightly failure drops from an hour to a few minutes.</p><p><strong>Visual regression.</strong> <code>await expect(page).toHaveScreenshot()</code> works, but only when the baseline is produced in the same environment as the comparison - in practice inside the Playwright Docker image, because font rendering differs between macOS and Linux. Set a <code>maxDiffPixelRatio</code> rather than zero and disable animations with <code>animations: \'disabled\'</code>, otherwise you get noise instead of signal.</p><p><strong>For a design system</strong> consider Playwright component testing separately: it mounts a Vue component in a real browser, so you get layout, focus and genuine keyboard events without paying to boot the whole app. That is the right home for focus-trap tests, popover placement and virtualisation - the ones jsdom can only pretend to run.</p><p><strong>Antipatterns visible in every legacy suite:</strong> selectors bound to CSS class names, inter-test dependencies (test 3 assumes data created by test 2), a shared test account mutated in parallel, <code>waitForTimeout</code> as a cure-all, and assertions on exact strings instead of regular expressions in a multilingual app.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest locator w Playwright?',
            en: 'What is a locator in Playwright?'
          },
          options: [
            { pl: 'Uchwytem do znalezionego węzła DOM', en: 'A handle to an already found DOM node' },
            { pl: 'Zapytaniem, które jest rozwiązywane dopiero przy akcji lub asercji i ponawiane', en: 'A query resolved only at action or assertion time, and retried' },
            { pl: 'Aliasem dla querySelector z timeoutem', en: 'An alias for querySelector with a timeout' },
            { pl: 'Snapshotem drzewa dostępności', en: 'A snapshot of the accessibility tree' }
          ],
          correct: 1,
          explain: {
            pl: 'Locator jest leniwy. Dlatego przetrwa ponowny render Vue, który zniszczyłby wcześniej pobrany uchwyt do elementu.',
            en: 'A locator is lazy. That is why it survives a Vue re-render that would invalidate a previously captured element handle.'
          }
        },
        {
          q: {
            pl: 'Dlaczego getByRole jest preferowane nad selektorem po klasie CSS design systemu?',
            en: 'Why is getByRole preferred over a selector on a design-system CSS class?'
          },
          options: [
            { pl: 'Bo czyta drzewo dostępności, więc test odzwierciedla to, co widzi użytkownik, i wykrywa zepsute etykiety', en: 'Because it reads the accessibility tree, so the test mirrors what a user perceives and catches broken labels' },
            { pl: 'Bo jest szybsze o rząd wielkości', en: 'Because it is an order of magnitude faster' },
            { pl: 'Bo klasy CSS nie działają w kontekstach izolowanych', en: 'Because CSS classes do not work in isolated contexts' },
            { pl: 'Bo tylko getByRole obsługuje auto-waiting', en: 'Because only getByRole supports auto-waiting' }
          ],
          correct: 0,
          explain: {
            pl: 'Klasa to szczegół implementacji stylów i zmienia się przy refaktorze. Rola i dostępna nazwa to kontrakt z użytkownikiem, także tym korzystającym z czytnika ekranu.',
            en: 'A class is a styling implementation detail that changes on refactor. Role and accessible name are the contract with the user, including screen reader users.'
          }
        },
        {
          q: {
            pl: 'Test wywala się w CI, ale przechodzi lokalnie. Które ustawienie najbardziej skraca diagnozę?',
            en: 'A test fails in CI but passes locally. Which setting shortens diagnosis the most?'
          },
          options: [
            { pl: 'Zwiększenie globalnego timeoutu do 60 sekund', en: 'Raising the global timeout to 60 seconds' },
            { pl: 'Dodanie waitForTimeout przed asercją', en: 'Adding a waitForTimeout before the assertion' },
            { pl: 'Ustawienie retries na 5', en: 'Setting retries to 5' },
            { pl: 'trace: on-first-retry, czyli nagranie snapshotów DOM, sieci i konsoli', en: 'trace: on-first-retry, capturing DOM snapshots, network and console' }
          ],
          correct: 3,
          explain: {
            pl: 'Trace viewer pokazuje stan strony przed i po każdej akcji. Timeouty i retry tylko przesuwają problem, nie mówią, co się stało.',
            en: 'The trace viewer shows page state before and after every action. Timeouts and retries only move the problem; they never tell you what happened.'
          }
        },
        {
          q: {
            pl: 'Porównania zrzutów ekranu przechodzą lokalnie na macOS, a w CI na Linuksie zawsze zawodzą. Główna przyczyna?',
            en: 'Screenshot comparisons pass locally on macOS but always fail in Linux CI. Main cause?'
          },
          options: [
            { pl: 'Baseline musi powstawać w tym samym środowisku - rendering fontów i antyaliasing różnią się między systemami', en: 'The baseline must be produced in the same environment - font rendering and antialiasing differ across systems' },
            { pl: 'Playwright nie obsługuje zrzutów ekranu w trybie headless', en: 'Playwright does not support screenshots in headless mode' },
            { pl: 'W CI trzeba wyłączyć fullyParallel, bo zrzuty się mieszają', en: 'CI requires disabling fullyParallel because screenshots get mixed up' },
            { pl: 'maxDiffPixelRatio działa tylko lokalnie', en: 'maxDiffPixelRatio only works locally' }
          ],
          correct: 0,
          explain: {
            pl: 'Baseline generuj w obrazie Dockera Playwrighta, tym samym, który biega w CI. Dodatkowo wyłącz animacje i ustaw rozsądny próg różnicy, inaczej dostajesz szum zamiast sygnału.',
            en: 'Generate baselines inside the Playwright Docker image that CI actually runs. Also disable animations and set a sane diff threshold, otherwise you get noise instead of signal.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 6
    {
      id: 'vapor-mode-future',
      title: {
        pl: 'Vapor Mode i przyszłość Vue',
        en: 'Vapor Mode and the future of Vue'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Vapor Mode', en: 'Vapor Mode' },
          def: {
            pl: 'Alternatywny tryb kompilacji Vue: szablon zamienia się w kod tworzący i aktualizujący DOM bezpośrednio, bez vnode i bez runtime wirtualnego DOM.',
            en: 'An alternative Vue compilation mode: the template becomes code that creates and updates DOM directly, with no vnodes and no virtual DOM runtime.'
          }
        },
        {
          term: { pl: 'aktualizacje drobnoziarniste', en: 'fine-grained updates' },
          def: {
            pl: 'Zamiast diffowania drzewa vnode każde wiązanie ma własny efekt aktualizujący konkretny węzeł. Koszt aktualizacji zależy od liczby zmienionych wiązań, nie od rozmiaru komponentu.',
            en: 'Instead of diffing a vnode tree, each binding owns an effect that updates one node. Update cost scales with the number of changed bindings, not with component size.'
          }
        },
        {
          term: { pl: 'włączanie per komponent', en: 'per-component opt-in' },
          def: {
            pl: 'Vapor włącza się dla pojedynczych komponentów, a tryb klasyczny i vapor mogą współistnieć w jednym drzewie. Migracja jest więc stopniowa i nie wymaga przepisania aplikacji.',
            en: 'Vapor is enabled per component, and classic and vapor components can coexist in one tree. Migration is therefore incremental and needs no application rewrite.'
          }
        },
        {
          term: { pl: 'API zależne od vnode', en: 'vnode-dependent API' },
          def: {
            pl: 'Render functions, ręczne <code>h()</code>, grzebanie w <code>$slots()</code> i inspekcja <code>vnode.type</code> nie mają odpowiednika w vapor - ten kod w bibliotece komponentów jest najbardziej zagrożony.',
            en: 'Render functions, hand-written <code>h()</code>, poking at <code>$slots()</code> and inspecting <code>vnode.type</code> have no vapor equivalent - that code in a component library is the most at risk.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m6l6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Same template, two compilation targets</text>' +
          '<rect x="30" y="45" width="250" height="50" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="76" fill="var(--text)" font-size="15" text-anchor="middle">template</text>' +
          '<rect x="360" y="45" width="250" height="50" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="485" y="76" fill="var(--text)" font-size="15" text-anchor="middle">template</text>' +
          '<line x1="155" y1="95" x2="155" y2="128" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l6a)"/>' +
          '<line x1="485" y1="95" x2="485" y2="128" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l6a)"/>' +
          '<rect x="30" y="130" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="158" fill="var(--text)" font-size="14" text-anchor="middle">render fn to vnodes</text>' +
          '<text x="155" y="182" fill="var(--muted)" font-size="13" text-anchor="middle">objects created per update</text>' +
          '<rect x="360" y="130" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="158" fill="var(--ok)" font-size="14" text-anchor="middle">direct DOM ops</text>' +
          '<text x="485" y="182" fill="var(--muted)" font-size="13" text-anchor="middle">one effect per binding</text>' +
          '<line x1="155" y1="200" x2="155" y2="233" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l6a)"/>' +
          '<line x1="485" y1="200" x2="485" y2="233" stroke="var(--muted)" stroke-width="2" marker-end="url(#m6l6a)"/>' +
          '<rect x="30" y="235" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="263" fill="var(--text)" font-size="14" text-anchor="middle">diff + patch</text>' +
          '<text x="155" y="287" fill="var(--muted)" font-size="13" text-anchor="middle">guided by patch flags</text>' +
          '<rect x="360" y="235" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="263" fill="var(--ok)" font-size="14" text-anchor="middle">no diff at all</text>' +
          '<text x="485" y="287" fill="var(--muted)" font-size="13" text-anchor="middle">signal writes the node</text>' +
          '<rect x="30" y="325" width="250" height="45" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="353" fill="var(--accent)" font-size="14" text-anchor="middle">classic mode</text>' +
          '<rect x="360" y="325" width="250" height="45" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="485" y="353" fill="var(--accent2)" font-size="14" text-anchor="middle">vapor mode</text>' +
          '<rect x="30" y="385" width="580" height="45" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="413" fill="var(--warn)" font-size="14" text-anchor="middle">Both can coexist in one app, opt-in per component</text>' +
          '</svg>',
        caption: {
          pl: 'Ten sam szablon, dwa cele kompilacji. Vapor pomija warstwę vnode i generuje bezpośrednie operacje na DOM, sterowane pojedynczymi efektami reaktywnymi.',
          en: 'The same template, two compilation targets. Vapor skips the vnode layer entirely and emits direct DOM operations driven by individual reactive effects.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że masz tablicę ogłoszeń i asystenta. Do tej pory za każdą zmianą asystent przepisywał całą tablicę na kartkę, porównywał kartkę ze starą kartką i dopiero potem poprawiał to, co się różni. To działa i jest zaskakująco szybkie - ale ta kartka to dodatkowa robota.</p><p>Nowy pomysł jest taki: przy pierwszym rozwieszaniu ogłoszeń asystent zapamiętuje, do której pinezki podpięta jest która informacja. Gdy coś się zmienia, idzie prosto do tej pinezki. Żadnych kartek, żadnego porównywania.</p><p>To dokładnie ta zmiana, którą przynosi Vapor Mode. Efekt jest taki, że aplikacja startuje szybciej i zużywa mniej pamięci, szczególnie na słabszych telefonach. Najlepsze jest to, że piszesz dokładnie tak samo - decyzja "asystent z kartką czy bez" zapada przy budowaniu, komponent po komponencie.</p>',
          en: '<p>Picture a notice board and an assistant. Until now, on every change the assistant copied the whole board onto a sheet of paper, compared that sheet with the old sheet, and only then fixed whatever differed. It works and it is surprisingly fast - but the sheet is extra work.</p><p>The new idea is this: the first time the notices go up, the assistant memorises which pin holds which piece of information. When something changes, they walk straight to that pin. No paper, no comparing.</p><p>That is exactly the change Vapor Mode brings. The result is a faster start and less memory use, especially on weaker phones. The best part is that you write the same code as before - the "with paper or without" decision happens at build time, component by component.</p>'
        },
        school: {
          pl: '<p>Klasyczne Vue kompiluje szablon do funkcji render zwracającej drzewo vnode - zwykłych obiektów opisujących DOM. Przy aktualizacji runtime porównuje nowe drzewo ze starym (prowadzony patch flagami) i stosuje różnice. <strong>Vapor Mode</strong> kompiluje ten sam szablon inaczej: do kodu, który raz tworzy węzły DOM i podpina do każdego dynamicznego miejsca osobny efekt reaktywny.</p><pre><code>// mentalny odpowiednik tego, co generuje vapor\nconst el = template(\'&lt;span class="badge"&gt;&lt;/span&gt;\')()\nrenderEffect(() =&gt; setText(el, count.value))</code></pre><p>Nie ma vnode, nie ma diffowania, nie ma warstwy pośredniej. Zmiana <code>count</code> odpala jeden efekt, który pisze do jednego węzła tekstowego. To ten sam model, który mają Solid i Svelte 5, ale w Vue jest <em>opcjonalny</em> i włączany per komponent przez <code>&lt;script setup vapor&gt;</code>.</p><p>Zyski są przede wszystkim w pamięci i w czasie startu: nie alokujesz drzewa obiektów przy każdym renderze, a runtime potrzebny do obsługi komponentu jest mniejszy. Największą różnicę widać w interfejsach z tysiącami węzłów i na urządzeniach o słabym CPU.</p><p>Vapor nie jest darmowy. Znika warstwa vnode, więc rzeczy zbudowane na vnode wymagają innego podejścia - ręczne funkcje render, JSX i część bibliotek zakładających klasyczny runtime. Dlatego strategia jest hybrydowa: komponenty vapor i klasyczne współistnieją w jednej aplikacji, a granice między nimi obsługuje interop.</p><p>Równolegle Vue 3.5 przyniosło rzeczy, z których korzystasz od razu bez żadnej migracji: destrukturyzację reaktywnych propsów, <code>useTemplateRef</code>, <code>onWatcherCleanup</code>, wyraźnie niższe zużycie pamięci przez system reaktywności i leniwą hydratację komponentów async.</p>',
          en: '<p>Classic Vue compiles a template into a render function returning a vnode tree - plain objects describing the DOM. On update the runtime compares the new tree against the old one (guided by patch flags) and applies the differences. <strong>Vapor Mode</strong> compiles the same template differently: into code that creates DOM nodes once and attaches a separate reactive effect to each dynamic spot.</p><pre><code>// the mental equivalent of what vapor emits\nconst el = template(\'&lt;span class="badge"&gt;&lt;/span&gt;\')()\nrenderEffect(() =&gt; setText(el, count.value))</code></pre><p>No vnodes, no diffing, no intermediate layer. Changing <code>count</code> fires one effect that writes to one text node. It is the same model Solid and Svelte 5 use, except in Vue it is <em>optional</em> and enabled per component through <code>&lt;script setup vapor&gt;</code>.</p><p>The wins are mostly in memory and startup: you no longer allocate an object tree on every render, and the runtime needed to drive a component is smaller. The difference is largest in interfaces with thousands of nodes and on CPU-constrained devices.</p><p>Vapor is not free. The vnode layer disappears, so anything built on vnodes needs a different approach - hand-written render functions, JSX, and libraries that assume the classic runtime. Hence the hybrid strategy: vapor and classic components coexist in one app, with interop handling the boundaries.</p><p>In parallel, Vue 3.5 shipped things you benefit from with no migration at all: reactive props destructure, <code>useTemplateRef</code>, <code>onWatcherCleanup</code>, markedly lower memory use in the reactivity system, and lazy hydration for async components.</p>'
        },
        pro: {
          pl: '<p><strong>Co się realnie zmienia w modelu wykonania.</strong> W klasycznym Vue jednostką aktualizacji jest komponent: jeden efekt renderu na instancję, a granularność wewnątrz zapewniają patch flagi. W Vapor jednostką jest <em>binding</em>: każde dynamiczne miejsce ma własny efekt. Znika pojęcie "komponent się przerenderował", bo nie ma czego renderować - jest tylko zbiór efektów przypisanych do węzłów. Ma to konsekwencje: <code>v-memo</code> traci sens, <code>shouldUpdateComponent</code> przestaje być bramką, a wzorce optymalizacyjne oparte na stabilnych referencjach propsów tracą znaczenie, bo prop nie wywołuje już renderu poddrzewa.</p><p><strong>Rdzeń reaktywności.</strong> Vue 3.6 przeszło na model inspirowany alien-signals - dwukierunkowe listy powiązań zamiast zbiorów, propagacja w wersjach zamiast pełnego przechodzenia grafu. Efekt to niższy narzut przy tworzeniu i czyszczeniu efektów oraz mniej alokacji przy dużej liczbie computed. To zmiana wewnętrzna: publiczne API <code>ref</code>, <code>computed</code>, <code>watch</code> zostaje takie samo, ale profil pamięci twojej aplikacji zmienia się bez jednej linii diffa.</p><p><strong>Co planować w design systemie.</strong> Komponenty pisane jako <code>&lt;script setup&gt;</code> plus szablon są kandydatem do vapor bez zmian w kodzie. Ryzyko koncentruje się gdzie indziej:</p><ul><li>Ręczne funkcje render i JSX - w vapor działają inaczej albo wcale; jeśli używasz ich do komponentów dynamicznych, przygotuj wariant szablonowy.</li><li>Kod grzebiący w <code>vnode</code>, <code>$slots()</code> jako tablicy vnode, filtrowanie dzieci po <code>type</code> - to wzorce mocno związane z klasycznym runtime.</li><li>Biblioteki zewnętrzne z własnymi dyrektywami lub renderami niskopoziomowymi.</li></ul><p><strong>Migracja jest stopniowa z definicji.</strong> Opt-in jest per komponent, więc realna strategia to: najpierw liście drzewa - przyciski, ikony, komórki tabel, czyli te, których jest najwięcej i które mają najprostszy kontrakt. Tam efekt jest największy, a ryzyko najmniejsze. Granice interop kosztują, więc nie warto robić szachownicy vapor-klasyczny w środku jednego ekranu.</p><p><strong>Uczciwe oczekiwania.</strong> Vapor to nie jest darmowe dwukrotne przyspieszenie każdej aplikacji. Jeśli twoje wąskie gardło to 2 MB JS, N+1 na API albo nieindeksowana lista, warstwa vnode nie jest twoim problemem. Zmierz najpierw. Vapor wygrywa tam, gdzie licznik węzłów i częstotliwość aktualizacji są wysokie - dashboardy, tabele czasu rzeczywistego, edytory - i wszędzie tam, gdzie liczy się zużycie pamięci na słabym urządzeniu.</p>',
          en: '<p><strong>What actually changes in the execution model.</strong> In classic Vue the unit of update is the component: one render effect per instance, with patch flags providing granularity inside. In Vapor the unit is the <em>binding</em>: every dynamic spot owns an effect. The notion of "the component re-rendered" disappears, because there is nothing to render - only a set of effects bound to nodes. Consequences follow: <code>v-memo</code> loses its purpose, <code>shouldUpdateComponent</code> stops being a gate, and optimisation patterns built on stable prop references stop mattering, because a prop no longer triggers a subtree render.</p><p><strong>The reactivity core.</strong> Vue 3.6 moved to an alien-signals-inspired model - doubly linked dependency lists instead of sets, versioned propagation instead of walking the whole graph. The result is lower overhead when creating and tearing down effects, and fewer allocations with many computeds. It is an internal change: the public <code>ref</code>, <code>computed</code> and <code>watch</code> API stays identical, yet your application memory profile shifts without a single line of diff.</p><p><strong>What to plan for in a design system.</strong> Components written as <code>&lt;script setup&gt;</code> plus a template are vapor candidates with no code change. The risk sits elsewhere:</p><ul><li>Hand-written render functions and JSX - in vapor they behave differently or not at all; if you use them for dynamic components, prepare a template variant.</li><li>Code poking at <code>vnode</code>, treating <code>$slots()</code> as a vnode array, filtering children by <code>type</code> - patterns tightly coupled to the classic runtime.</li><li>Third-party libraries shipping custom directives or low-level renderers.</li></ul><p><strong>Migration is incremental by construction.</strong> Opt-in is per component, so the realistic strategy is leaves first - buttons, icons, table cells: the most numerous components with the simplest contracts. That is where the effect is largest and the risk smallest. Interop boundaries cost something, so avoid a vapor-classic chessboard inside a single screen.</p><p><strong>Honest expectations.</strong> Vapor is not a free 2x for every application. If your bottleneck is 2 MB of JavaScript, an N+1 on the API, or an unvirtualised list, the vnode layer is not your problem. Measure first. Vapor wins where node counts and update frequency are high - dashboards, realtime tables, editors - and anywhere memory footprint on a weak device is what hurts.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Na czym polega główna różnica Vapor Mode wobec klasycznego trybu Vue?',
            en: 'What is the main difference between Vapor Mode and classic Vue?'
          },
          options: [
            { pl: 'Zamienia Proxy na gettery i settery w systemie reaktywności', en: 'It swaps Proxy for getters and setters in the reactivity system' },
            { pl: 'Przenosi renderowanie na serwer', en: 'It moves rendering to the server' },
            { pl: 'Kompiluje szablon do bezpośrednich operacji na DOM, bez warstwy vnode i bez diffowania', en: 'It compiles the template into direct DOM operations, with no vnode layer and no diffing' },
            { pl: 'Zastępuje Composition API nowym API sygnałów', en: 'It replaces the Composition API with a new signals API' }
          ],
          correct: 2,
          explain: {
            pl: 'Vapor to inny cel kompilacji tego samego szablonu. Kod użytkownika zostaje ten sam, znika natomiast tworzenie i porównywanie drzewa vnode.',
            en: 'Vapor is a different compilation target for the same template. Your code stays the same; what disappears is creating and diffing the vnode tree.'
          }
        },
        {
          q: {
            pl: 'Dlaczego v-memo traci sens w komponencie vapor?',
            en: 'Why does v-memo lose its purpose in a vapor component?'
          },
          options: [
            { pl: 'Bo kompilator vapor nie obsługuje v-for', en: 'Because the vapor compiler does not support v-for' },
            { pl: 'Bo v-memo działa tylko w trybie deweloperskim', en: 'Because v-memo only works in development builds' },
            { pl: 'Bo vapor zawsze renderuje cały komponent od nowa', en: 'Because vapor always re-renders the whole component' },
            { pl: 'Bo nie ma renderu poddrzewa do pominięcia - aktualizacja dotyczy pojedynczego bindingu', en: 'Because there is no subtree render to skip - an update touches a single binding' }
          ],
          correct: 3,
          explain: {
            pl: 'v-memo cache\'uje wynik funkcji render, czyli poddrzewo vnode. W vapor jednostką aktualizacji jest binding, więc nie ma czego zapamiętywać.',
            en: 'v-memo caches a render function result, that is a vnode subtree. In vapor the unit of update is a binding, so there is nothing to memoise.'
          }
        },
        {
          q: {
            pl: 'Który kod w bibliotece komponentów jest najbardziej zagrożony przy przejściu na vapor?',
            en: 'Which code in a component library is most at risk when moving to vapor?'
          },
          options: [
            { pl: 'Kod operujący na vnode: ręczne funkcje render, JSX, filtrowanie dzieci slotu po type', en: 'Code operating on vnodes: hand-written render functions, JSX, filtering slot children by type' },
            { pl: 'Komponenty ze script setup i zwykłym szablonem', en: 'Components using script setup with a plain template' },
            { pl: 'Kompozable używające ref i computed', en: 'Composables using ref and computed' },
            { pl: 'Style scoped', en: 'Scoped styles' }
          ],
          correct: 0,
          explain: {
            pl: 'Znika warstwa, na której ten kod się opiera. Komponenty szablonowe i kompozable przechodzą bez zmian, bo publiczne API reaktywności zostaje identyczne.',
            en: 'The layer that code depends on disappears. Template components and composables carry over unchanged, because the public reactivity API stays identical.'
          }
        },
        {
          q: {
            pl: 'Aplikacja ładuje 2 MB JavaScriptu i renderuje niezwirtualizowaną listę 5000 wierszy. Czy vapor to naprawi?',
            en: 'An app ships 2 MB of JavaScript and renders an unvirtualised 5000-row list. Will vapor fix it?'
          },
          options: [
            { pl: 'Tak, vapor automatycznie wirtualizuje długie listy', en: 'Yes, vapor virtualises long lists automatically' },
            { pl: 'Nie w istotnym stopniu - wąskim gardłem jest rozmiar bundla i liczba węzłów, a nie warstwa vnode', en: 'Not meaningfully - the bottleneck is bundle size and node count, not the vnode layer' },
            { pl: 'Tak, bo vapor eliminuje koszt parsowania JavaScriptu', en: 'Yes, because vapor removes the JavaScript parsing cost' },
            { pl: 'Nie, bo vapor działa tylko w SSR', en: 'No, because vapor only works in SSR' }
          ],
          correct: 1,
          explain: {
            pl: 'Vapor obniża narzut na aktualizację i pamięć, ale 5000 węzłów DOM nadal kosztuje layout i paint. Najpierw wirtualizacja i budżet bundla, potem mikroarchitektura runtime.',
            en: 'Vapor lowers update overhead and memory, but 5000 DOM nodes still cost layout and paint. Virtualise and fix the bundle budget first; runtime micro-architecture second.'
          }
        }
      ]
    }
  ]
};
