// Track react - Module 06 - Performance, testing and migration from Vue.
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema", v4).

export default {
  id: 'perf-testing-migration',
  order: 6,
  icon: '🚀',
  title: {
    pl: 'Wydajność, testy i migracja',
    en: 'Performance, testing and migration'
  },
  description: {
    pl: 'Profilowanie renderów, memoizacja i React Compiler, wirtualizacja list, code splitting, testy w Testing Library oraz kompletna ściąga migracyjna Vue -> React.',
    en: 'Render profiling, memoization and the React Compiler, list virtualization, code splitting, Testing Library, and a complete Vue-to-React migration cheatsheet.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'rerender-profiling',
      title: {
        pl: 'Profilowanie renderów',
        en: 'Profiling re-renders'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Faza render kontra commit', en: 'Render phase vs commit phase' },
          def: { pl: 'Render wykonuje funkcje komponentów i buduje elementy - jest tani. Commit mutuje DOM i uruchamia efekty layoutowe - jest drogi. Problemem są dopiero fazy dłuższe niż jedna klatka (16 ms).', en: 'The render phase runs component functions and builds elements - it is cheap. The commit mutates the DOM and runs layout effects - it is expensive. Only phases longer than one frame (16 ms) are a real problem.' }
        },
        {
          term: { pl: 'React DevTools Profiler', en: 'React DevTools Profiler' },
          def: { pl: 'Flamegraph, wykres rankingowy i powody renderów dla każdego commitu. Nie widzi kosztu stylowania i layoutu - do tego służy panel Performance w Chrome.', en: 'Flamegraph, ranked chart and render reasons for every commit. It cannot see style and layout cost - the Chrome Performance panel is for that.' }
        },
        {
          term: { pl: 'Highlight updates', en: 'Highlight updates' },
          def: { pl: 'Opcją DevTools obrysowująca rerenderowane komponenty. Ramka wokół całej strony przy wpisywaniu jednego znaku to klasyczny objaw stanu trzymanego za wysoko.', en: 'The DevTools option that outlines re-rendered components. A border around the whole page while you type one character is the classic symptom of state held too high.' }
        },
        {
          term: { pl: 'INP', en: 'INP' },
          def: { pl: 'Interaction to Next Paint - metryka Core Web Vitals mierząca opóźnienie od interakcji do odmalowania. To ona ocenia wydajność w Lighthouse, a nie liczba renderów.', en: 'Interaction to Next Paint - the Core Web Vitals metric measuring the delay from interaction to paint. It is what judges you in Lighthouse, not a render count.' }
        },
        {
          term: { pl: 'Komponent Profiler', en: 'The Profiler component' },
          def: { pl: 'Programowy pomiar wybranego poddrzewa: callback <code>onRender</code> dostaje fazę i czas trwania, więc można raportować je do telemetrii jak web vitals.', en: 'Programmatic measurement of a chosen subtree: the <code>onRender</code> callback receives the phase and duration, so you can report them to telemetry like web vitals.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="28" font-size="15" fill="var(--muted)">React: state change re-runs the subtree</text>' +
          '<rect x="240" y="40" width="160" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="69" text-anchor="middle" font-size="15" fill="var(--text)">App setState</text>' +
          '<line x1="300" y1="86" x2="150" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#p1a)"/>' +
          '<line x1="340" y1="86" x2="480" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#p1a)"/>' +
          '<rect x="60" y="124" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="150" y="153" text-anchor="middle" font-size="14" fill="var(--text)">Sidebar re-runs</text>' +
          '<rect x="400" y="124" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="490" y="153" text-anchor="middle" font-size="14" fill="var(--text)">Table re-runs</text>' +
          '<line x1="490" y1="170" x2="490" y2="204" stroke="var(--accent)" stroke-width="2" marker-end="url(#p1a)"/>' +
          '<rect x="400" y="208" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="490" y="237" text-anchor="middle" font-size="14" fill="var(--text)">1 DOM patch</text>' +
          '<text x="20" y="300" font-size="15" fill="var(--muted)">Vue: only the effects that read the ref run</text>' +
          '<rect x="60" y="314" width="230" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="175" y="346" text-anchor="middle" font-size="14" fill="var(--muted)">parents untouched</text>' +
          '<rect x="330" y="314" width="250" height="52" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="455" y="346" text-anchor="middle" font-size="14" fill="var(--text)">1 render effect + 1 DOM patch</text>' +
          '</svg>',
        caption: {
          pl: 'W Reactie zmiana stanu uruchamia funkcje całego poddrzewa, a dopiero diff decyduje o DOM. W Vue budzi się tylko efekt renderujący komponentu, który czyta dany ref.',
          en: 'In React a state change re-runs the whole subtree of component functions and only the diff decides what touches the DOM. In Vue only the render effect that reads that ref wakes up.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Kaskada renderów krok po kroku: od setState, przez ponowne wywołanie funkcji, po jedną zmianę w DOM - i to samo zdarzenie w Vue.',
          en: 'The render cascade step by step: from setState through re-running functions to a single DOM change - and the same event in Vue.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="240" y="20" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="51" text-anchor="middle" font-size="15" fill="var(--text)">App</text>' +
              '<line x1="280" y1="70" x2="115" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="320" y1="70" x2="320" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="360" y1="70" x2="525" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="115" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Header</text>' +
              '<rect x="245" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Main</text>' +
              '<rect x="450" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="525" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Footer</text>' +
              '<line x1="320" y1="170" x2="320" y2="220" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="245" y="220" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Row</text>' +
              '<text x="320" y="320" text-anchor="middle" font-size="15" fill="var(--muted)">Idle: nothing is running</text>' +
              '</svg>',
            label: { pl: 'Spoczynek', en: 'Idle' },
            note: {
              pl: 'Drzewo jest wyrenderowane, żaden komponent nie liczy się ponownie. Row pokazuje licznik trzymany w App.',
              en: 'The tree is rendered and no component is computing. Row displays a counter that lives in App.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="240" y="20" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="51" text-anchor="middle" font-size="15" fill="var(--text)">App setState</text>' +
              '<line x1="280" y1="70" x2="115" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="320" y1="70" x2="320" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="360" y1="70" x2="525" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="115" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Header</text>' +
              '<rect x="245" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Main</text>' +
              '<rect x="450" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="525" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Footer</text>' +
              '<line x1="320" y1="170" x2="320" y2="220" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="245" y="220" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Row</text>' +
              '<text x="320" y="320" text-anchor="middle" font-size="15" fill="var(--warn)">setCount schedules a render of App</text>' +
              '</svg>',
            label: { pl: 'Zmiana stanu', en: 'State change' },
            note: {
              pl: 'setCount nie zmienia niczego od razu - planuje render komponentu, który ten stan posiada, czyli App.',
              en: 'setCount changes nothing immediately - it schedules a render of the component that owns the state, App.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="240" y="20" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="51" text-anchor="middle" font-size="15" fill="var(--text)">App runs</text>' +
              '<line x1="280" y1="70" x2="115" y2="120" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="320" y1="70" x2="320" y2="120" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="360" y1="70" x2="525" y2="120" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="40" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="115" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Header runs</text>' +
              '<rect x="245" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Main runs</text>' +
              '<rect x="450" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="525" y="151" text-anchor="middle" font-size="14" fill="var(--text)">Footer runs</text>' +
              '<line x1="320" y1="170" x2="320" y2="220" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="245" y="220" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Row runs</text>' +
              '<text x="320" y="320" text-anchor="middle" font-size="15" fill="var(--warn)">5 component functions execute</text>' +
              '</svg>',
            label: { pl: 'Kaskada funkcji', en: 'Function cascade' },
            note: {
              pl: 'React wykonuje funkcje App i wszystkich potomków, które nie są zapamiętane. To zwykły JavaScript, jeszcze bez dotykania DOM.',
              en: 'React executes App and every descendant that is not memoized. This is plain JavaScript, no DOM touched yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="240" y="20" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="51" text-anchor="middle" font-size="15" fill="var(--muted)">App diffed</text>' +
              '<line x1="280" y1="70" x2="115" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="320" y1="70" x2="320" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="360" y1="70" x2="525" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="115" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">no change</text>' +
              '<rect x="245" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">no change</text>' +
              '<rect x="450" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="525" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">no change</text>' +
              '<line x1="320" y1="170" x2="320" y2="220" stroke="var(--ok)" stroke-width="2"/>' +
              '<rect x="245" y="220" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Row text updated</text>' +
              '<text x="320" y="320" text-anchor="middle" font-size="15" fill="var(--ok)">1 DOM write, 4 wasted renders</text>' +
              '</svg>',
            label: { pl: 'Diff i DOM', en: 'Diff and DOM' },
            note: {
              pl: 'Diff porównuje nowe elementy ze starymi i zmienia jeden węzeł tekstowy. Cztery renderowania były zbędne - to je widzisz w Profilerze.',
              en: 'The diff compares new elements with old ones and rewrites one text node. Four renders were wasted - that is exactly what the Profiler shows you.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="240" y="20" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="51" text-anchor="middle" font-size="15" fill="var(--muted)">App (Vue)</text>' +
              '<line x1="280" y1="70" x2="115" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="320" y1="70" x2="320" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="360" y1="70" x2="525" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="40" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="115" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">not notified</text>' +
              '<rect x="245" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">not notified</text>' +
              '<rect x="450" y="120" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="525" y="151" text-anchor="middle" font-size="14" fill="var(--muted)">not notified</text>' +
              '<line x1="320" y1="170" x2="320" y2="220" stroke="var(--accent2)" stroke-width="2"/>' +
              '<rect x="245" y="220" width="150" height="50" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Row effect runs</text>' +
              '<text x="320" y="320" text-anchor="middle" font-size="15" fill="var(--accent2)">Vue: 1 render effect, 1 DOM write</text>' +
              '</svg>',
            label: { pl: 'To samo w Vue', en: 'The same in Vue' },
            note: {
              pl: 'Ref wie, który efekt renderujący go czytał, więc budzi tylko Row. Dlatego w Vue nie masz odpowiednika React.memo - reaktywność robi to za ciebie.',
              en: 'The ref knows which render effect read it, so only Row wakes up. That is why Vue has no React.memo equivalent - reactivity does that job for you.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie gazetę. W Vue redaktor wie dokładnie, które zdanie się zmieniło, i podmienia tylko je. W Reactie drukarz za każdym razem składa całą stronę od nowa, porównuje ją z poprzednią i wymienia tylko te litery, które faktycznie się różnią.</p>' +
            '<p>Brzmi rozrzutnie? Zwykle jest bardzo szybkie, bo składanie strony to tylko liczenie w pamięci, a nie malowanie po ekranie. Problem zaczyna się, gdy strona ma trzysta akapitów i każdy z nich liczy sobie coś ciężkiego.</p>' +
            '<p>Dlatego zanim cokolwiek naprawisz, musisz <strong>zobaczyć</strong>, co się składa od nowa. Służy do tego Profiler: nagrywasz kilka sekund klikania, a on rysuje słupki - kto się przeliczył, ile razy i jak długo. Bez tego nagrania optymalizowanie jest jak naprawianie samochodu przez słuchanie: czasem trafisz, częściej zrobisz hałas i nic więcej.</p>',
          en: '<p>Picture a newspaper. In Vue the editor knows exactly which sentence changed and swaps just that sentence. In React the typesetter lays out the entire page again, compares it with the previous page and replaces only the letters that actually differ.</p>' +
            '<p>Wasteful? Usually it is very fast, because laying out the page is just arithmetic in memory, not painting on the screen. Trouble starts when the page has three hundred paragraphs and each one computes something heavy.</p>' +
            '<p>So before you fix anything you have to <strong>see</strong> what is being laid out again. That is what the Profiler is for: you record a few seconds of clicking and it draws bars - who recomputed, how many times and for how long. Without that recording, optimizing is like fixing a car by listening to it: sometimes you get lucky, more often you just make noise.</p>'
        },
        school: {
          pl: '<p>W Vue reaktywność jest drobnoziarnista. Każdy komponent ma swój <em>render effect</em>, który zapamiętuje, które refy przeczytał. Zmiana refa budzi tylko te efekty. W Reactie nie ma śledzenia zależności: zmiana stanu oznacza, że funkcja komponentu wykona się ponownie, a wraz z nią funkcje wszystkich dzieci, które nie są zapamiętane.</p>' +
            '<h4>To samo zdarzenie w obu bibliotekach</h4>' +
            '<pre><code>// Vue: count.value++ budzi tylko efekt, który czytał count\nconst count = ref(0)\nfunction inc() { count.value++ }\n\n// React: setCount planuje render App i całego poddrzewa\nconst [count, setCount] = useState(0)\nfunction inc() { setCount(c =&gt; c + 1) }</code></pre>' +
            '<p>W Vue robiłeś X: nie myślałeś o tym, kto się przerenderuje, bo proxy wiedziało za ciebie. W Reactie robisz Y: zakładasz, że przerenderuje się całe poddrzewo, i sprawdzasz w Profilerze, czy to boli - bo React nie ma informacji o zależnościach, ma tylko drzewo.</p>' +
            '<h4>Jak nagrać profil</h4>' +
            '<p>Instalujesz React DevTools, przechodzisz na zakładkę <strong>Profiler</strong>, włączasz opcję <em>Record why each component rendered</em>, klikasz nagrywanie, wykonujesz jedną konkretną interakcję i zatrzymujesz. Dostajesz flamegraph: szerokość słupka to czas commitu, a po kliknięciu komponentu widzisz powód - <em>props changed</em>, <em>hook changed</em>, <em>parent rendered</em>.</p>' +
            '<p>Ten ostatni powód jest najciekawszy. <em>Parent rendered</em> znaczy, że komponent przeliczył się bez żadnej realnej zmiany danych. Jeśli takich jest kilkadziesiąt i łącznie zajmują 2 ms, zostaw je w spokoju. Jeśli jeden zajmuje 80 ms, masz swój cel. Odpowiednikiem po stronie Vue jest zakładka Performance w Vue DevTools, tylko tam zwykle szukasz zbyt szerokich computed, a nie kaskady renderów.</p>',
          en: '<p>Vue reactivity is fine-grained. Every component has its own <em>render effect</em> that records which refs it read. Changing a ref wakes only those effects. React does no dependency tracking: a state change means the component function runs again, and with it every child function that is not memoized.</p>' +
            '<h4>The same event in both libraries</h4>' +
            '<pre><code>// Vue: count.value++ wakes only the effect that read count\nconst count = ref(0)\nfunction inc() { count.value++ }\n\n// React: setCount schedules a render of App and its subtree\nconst [count, setCount] = useState(0)\nfunction inc() { setCount(c =&gt; c + 1) }</code></pre>' +
            '<p>In Vue you did X: you never thought about who re-renders, because the proxy knew for you. In React you do Y: you assume the whole subtree re-runs and you check in the Profiler whether it hurts - because React has no dependency information, only a tree.</p>' +
            '<h4>How to record a profile</h4>' +
            '<p>Install React DevTools, open the <strong>Profiler</strong> tab, enable <em>Record why each component rendered</em>, hit record, perform one specific interaction, then stop. You get a flamegraph: bar width is commit time, and clicking a component shows the reason - <em>props changed</em>, <em>hook changed</em>, <em>parent rendered</em>.</p>' +
            '<p>That last reason is the interesting one. <em>Parent rendered</em> means the component recomputed with no real data change. If there are fifty of those and together they cost 2 ms, leave them alone. If one costs 80 ms, you have found your target. The Vue-side equivalent is the Performance tab in Vue DevTools, except there you usually hunt for over-broad computed values rather than a render cascade.</p>'
        },
        pro: {
          pl: '<p>Zasada numer jeden: renderowanie w Reactie jest tanie, a <em>commit</em> jest drogi. Render to wykonanie funkcji i zbudowanie obiektów elementów; commit to mutacje DOM oraz efekty layoutu. Profiler pokazuje oba, ale to commit i długie renderowania powyżej jednej klatki (16 ms przy 60 Hz) są realnym problemem.</p>' +
            '<h4>Narzędzia, których naprawdę używasz</h4>' +
            '<ul>' +
            '<li><strong>React DevTools Profiler</strong> - flamegraph, ranked chart, powody renderów. Działa tylko w buildzie developerskim lub w profiling buildzie (<code>react-dom/profiling</code>).</li>' +
            '<li><strong>Highlight updates</strong> - najszybszy sygnał ostrzegawczy: migająca ramka wokół całej strony przy wpisywaniu jednej litery to klasyczny stan trzymany za wysoko.</li>' +
            '<li><strong>Performance panel w Chrome</strong> - jedyne miejsce, gdzie zobaczysz long tasks, layout thrashing i INP. Profiler nie widzi kosztu stylów i layoutu.</li>' +
            '<li><strong>Programowy <code>&lt;Profiler&gt;</code></strong> - opakuj podejrzane poddrzewo i wysyłaj czasy do telemetrii, tak jak wysyłasz web vitals.</li>' +
            '</ul>' +
            '<pre><code>// React: pomiar produkcyjny wybranego poddrzewa\n&lt;Profiler id="table" onRender={(id, phase, actual) =&gt; {\n  if (actual &gt; 50) report({ id, phase, actual })\n}}&gt;\n  &lt;DataTable rows={rows} /&gt;\n&lt;/Profiler&gt;\n\n// Vue: odpowiednik to własny hook renderTracked / renderTriggered\nonRenderTriggered((e) =&gt; console.log(e.key, e.type))</code></pre>' +
            '<p>W Vue debugowaliśmy pytaniem <em>co wywołało ten render</em> - i dostawaliśmy konkretny klucz reaktywny z <code>onRenderTriggered</code>. W Reactie pytanie brzmi <em>dlaczego to poddrzewo w ogóle się wykonało</em>, bo domyślna odpowiedź to zawsze "bo rodzic się wykonał". Dlatego naprawa niemal nigdy nie zaczyna się od <code>memo</code>, tylko od struktury.</p>' +
            '<h4>Kolejność napraw</h4>' +
            '<ol>' +
            '<li><strong>Zejdź ze stanem niżej</strong> (colocation). Stan pola tekstowego w formularzu, a nie w layoucie strony.</li>' +
            '<li><strong>Przekaż dzieci jako <code>children</code></strong>. Element przekazany z góry nie przelicza się, gdy rodzic się renderuje - to darmowa memoizacja bez <code>memo</code>.</li>' +
            '<li><strong>Rozetnij konteksty</strong>. Jeden kontekst z dziesięcioma polami budzi wszystkich konsumentów przy każdej zmianie; podziel go albo użyj selektorów ze store.</li>' +
            '<li><strong>Dopiero teraz memoizuj</strong> - i tylko to, co Profiler wskazał.</li>' +
            '</ol>' +
            '<p>Pułapki: <code>StrictMode</code> w devie wykonuje renderowanie dwukrotnie, więc liczby są zawyżone, a wnioski nadal poprawne. Profiluj na buildzie produkcyjnym z throttlingiem CPU 4x, bo na MacBooku wszystko jest szybkie. I mierz interakcje, nie ładowanie: metryka, która oceni cię w Lighthouse i w rekrutacji, to INP, a nie liczba renderów.</p>',
          en: '<p>Rule one: rendering in React is cheap, <em>committing</em> is expensive. A render runs functions and builds element objects; the commit mutates the DOM and runs layout effects. The Profiler shows both, but commits and renders longer than one frame (16 ms at 60 Hz) are the real problem.</p>' +
            '<h4>The tools you actually use</h4>' +
            '<ul>' +
            '<li><strong>React DevTools Profiler</strong> - flamegraph, ranked chart, render reasons. Works in a development build or a profiling build (<code>react-dom/profiling</code>).</li>' +
            '<li><strong>Highlight updates</strong> - the fastest warning signal: a border flashing around the whole page while you type one character is the classic state-held-too-high bug.</li>' +
            '<li><strong>Chrome Performance panel</strong> - the only place that shows long tasks, layout thrashing and INP. The Profiler cannot see style and layout cost.</li>' +
            '<li><strong>The programmatic <code>&lt;Profiler&gt;</code></strong> - wrap a suspicious subtree and ship timings to telemetry the same way you ship web vitals.</li>' +
            '</ul>' +
            '<pre><code>// React: production measurement of one subtree\n&lt;Profiler id="table" onRender={(id, phase, actual) =&gt; {\n  if (actual &gt; 50) report({ id, phase, actual })\n}}&gt;\n  &lt;DataTable rows={rows} /&gt;\n&lt;/Profiler&gt;\n\n// Vue: the closest equivalent is a debug hook\nonRenderTriggered((e) =&gt; console.log(e.key, e.type))</code></pre>' +
            '<p>In Vue we debugged by asking <em>what triggered this render</em> and got a concrete reactive key from <code>onRenderTriggered</code>. In React the question is <em>why did this subtree run at all</em>, because the default answer is always "because the parent ran". That is why the fix almost never starts with <code>memo</code> - it starts with structure.</p>' +
            '<h4>Order of fixes</h4>' +
            '<ol>' +
            '<li><strong>Push state down</strong> (colocation). The text input state belongs to the field, not to the page layout.</li>' +
            '<li><strong>Pass subtrees as <code>children</code></strong>. An element handed in from above is not recreated when the parent renders - free memoization without <code>memo</code>.</li>' +
            '<li><strong>Split contexts</strong>. One context with ten fields wakes every consumer on every change; split it or use store selectors.</li>' +
            '<li><strong>Only now memoize</strong> - and only what the Profiler pointed at.</li>' +
            '</ol>' +
            '<p>Pitfalls: <code>StrictMode</code> double-invokes renders in development, so the numbers are inflated while the conclusions still hold. Profile a production build with 4x CPU throttling, because everything is fast on a MacBook. And measure interactions, not loads: the metric that judges you in Lighthouse and in interviews is INP, not a render count.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie dzieje się po wywołaniu setState w komponencie nadrzędnym?',
            en: 'What exactly happens after calling setState in a parent component?'
          },
          options: [
            { pl: 'React aktualizuje tylko te węzły DOM, które czytały ten stan', en: 'React updates only the DOM nodes that read that state' },
            { pl: 'Funkcje komponentu i jego niezapamiętanych dzieci wykonują się ponownie, a diff decyduje o DOM', en: 'The component function and its non-memoized children re-run, and the diff decides the DOM' },
            { pl: 'Cała aplikacja jest montowana od nowa', en: 'The whole application remounts' },
            { pl: 'Nic, dopóki nie wywołasz forceUpdate', en: 'Nothing, until you call forceUpdate' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie śledzi zależności jak Vue - planuje render poddrzewa, wykonuje funkcje i dopiero porównanie elementów decyduje, co trafi do DOM.',
            en: 'React does not track dependencies the way Vue does - it schedules a subtree render, runs the functions, and only the element comparison decides what reaches the DOM.'
          }
        },
        {
          q: {
            pl: 'W Profilerze widzisz powód renderu "parent rendered". Co to znaczy?',
            en: 'The Profiler shows the render reason "parent rendered". What does it mean?'
          },
          options: [
            { pl: 'Propsy komponentu zmieniły wartość', en: 'The props of the component changed value' },
            { pl: 'Komponent subskrybuje kontekst, który się zmienił', en: 'The component subscribes to a context that changed' },
            { pl: 'Komponent wykonał się tylko dlatego, że rodzic się wykonał, bez zmiany danych', en: 'The component ran only because its parent ran, with no data change' },
            { pl: 'Komponent został odmontowany i zamontowany ponownie', en: 'The component was unmounted and mounted again' }
          ],
          correct: 2,
          explain: {
            pl: 'To sygnał potencjalnie zbędnego renderu. Sam w sobie nie jest błędem - staje się problemem dopiero, gdy ten render kosztuje mierzalny czas.',
            en: 'It flags a potentially wasted render. On its own it is not a bug - it becomes a problem only when that render costs measurable time.'
          }
        },
        {
          q: {
            pl: 'Które narzędzie pokaże ci koszt layoutu i long tasks, którego React Profiler nie widzi?',
            en: 'Which tool shows layout cost and long tasks that the React Profiler cannot see?'
          },
          options: [
            { pl: 'Panel Performance w Chrome DevTools', en: 'The Performance panel in Chrome DevTools' },
            { pl: 'Zakładka Components w React DevTools', en: 'The Components tab in React DevTools' },
            { pl: 'Vue DevTools w trybie zgodności', en: 'Vue DevTools in compatibility mode' },
            { pl: 'Analizator bundla', en: 'The bundle analyzer' }
          ],
          correct: 0,
          explain: {
            pl: 'React Profiler mierzy tylko czas w Reactie. Style, layout, paint i INP zobaczysz wyłącznie w panelu Performance przeglądarki.',
            en: 'The React Profiler measures only time spent inside React. Style, layout, paint and INP live exclusively in the browser Performance panel.'
          }
        },
        {
          q: {
            pl: 'Pisanie w jednym polu formularza przerysowuje cały dashboard po 120 ms. Co robisz najpierw?',
            en: 'Typing in one form field re-renders the whole dashboard in 120 ms. What do you do first?'
          },
          options: [
            { pl: 'Owijasz każdy komponent dashboardu w React.memo', en: 'Wrap every dashboard component in React.memo' },
            { pl: 'Dodajesz debounce na zdarzeniu onChange', en: 'Add a debounce on the onChange handler' },
            { pl: 'Włączasz React Compiler i liczysz, że zniknie', en: 'Turn on the React Compiler and hope it goes away' },
            { pl: 'Przenosisz stan pola do samego pola albo do mniejszego komponentu formularza', en: 'Move the field state into the field itself or into a smaller form component' }
          ],
          correct: 3,
          explain: {
            pl: 'Kolokacja stanu usuwa przyczynę, a nie objaw: skoro dashboard nie czyta tej wartości, nie ma powodu, by w ogóle znajdowała się nad nim. Debounce tylko opóźnia ból, a memo obudowuje go boilerplatem.',
            en: 'Colocating state removes the cause rather than the symptom: if the dashboard never reads that value, there is no reason for it to live above the dashboard. Debouncing only delays the pain and memo wraps it in boilerplate.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'memoization-and-compiler',
      title: {
        pl: 'Memoizacja i React Compiler',
        en: 'Memoization and the React Compiler'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'React.memo', en: 'React.memo' },
          def: { pl: 'HOC porównujący propsy <strong>płytko</strong> i pomijający render, gdy się nie zmieniły. Jeden literał obiektu w JSX wystarczy, żeby kontrakt przestał działać.', en: 'A HOC that compares props <strong>shallowly</strong> and skips the render when nothing changed. One object literal in JSX is enough to break the contract.' }
        },
        {
          term: { pl: 'useMemo i useCallback', en: 'useMemo and useCallback' },
          def: { pl: 'Utrwalanie wartości i funkcji między renderami. <code>useCallback(fn, deps)</code> to dokładnie <code>useMemo(() =&gt; fn, deps)</code>, a React ma prawo cache odrzucić - to nie jest gwarancja.', en: 'Preserving values and functions across renders. <code>useCallback(fn, deps)</code> is precisely <code>useMemo(() =&gt; fn, deps)</code>, and React may drop the cache - it is not a guarantee.' }
        },
        {
          term: { pl: 'Stabilna tożsamość propsów', en: 'Stable prop identity' },
          def: { pl: 'Warunek działania memoizacji: producent propsów musi oddawać te same referencje. Bez tego <code>memo</code> nigdy nie wygra i dokładasz tylko koszt porównania.', en: 'The precondition for memoization: the props producer must hand back the same references. Without it <code>memo</code> can never win and you only pay for the comparison.' }
        },
        {
          term: { pl: 'Forma updater', en: 'Updater form' },
          def: { pl: '<code>setZoom(z =&gt; z + 1)</code> zamiast <code>setZoom(zoom + 1)</code>. Pozwala trzymać pustą tablicę zależności i eliminuje stale closures - odpowiednik <code>count.value++</code> z Vue.', en: '<code>setZoom(z =&gt; z + 1)</code> instead of <code>setZoom(zoom + 1)</code>. It keeps the dependency array empty and removes stale closures - the equivalent of <code>count.value++</code> in Vue.' }
        },
        {
          term: { pl: 'React Compiler', en: 'React Compiler' },
          def: { pl: 'Plugin Babela wstawiający memoizacje automatycznie, z dokładnością do pojedynczych wyrażeń. Działa tylko na kodzie zgodnym z regułami hooków; złej architektury stanu nie naprawi.', en: 'A Babel plugin that inserts memoization automatically, at the granularity of single expressions. It only applies to code that follows the rules of hooks; it will not fix bad state architecture.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="30" y="30" width="240" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="55" text-anchor="middle" font-size="15" fill="var(--text)">Parent renders</text>' +
          '<text x="150" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">new object and function created</text>' +
          '<line x1="270" y1="60" x2="335" y2="60" stroke="var(--accent)" stroke-width="2" marker-end="url(#p2a)"/>' +
          '<rect x="340" y="30" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="475" y="55" text-anchor="middle" font-size="15" fill="var(--text)">memo child re-renders</text>' +
          '<text x="475" y="76" text-anchor="middle" font-size="13" fill="var(--err)">props identity changed</text>' +
          '<line x1="475" y1="90" x2="475" y2="130" stroke="var(--accent)" stroke-width="2" marker-end="url(#p2a)"/>' +
          '<rect x="340" y="134" width="270" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="475" y="159" text-anchor="middle" font-size="15" fill="var(--text)">useMemo + useCallback</text>' +
          '<text x="475" y="180" text-anchor="middle" font-size="13" fill="var(--ok)">identity is now stable</text>' +
          '<rect x="30" y="230" width="580" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="255" text-anchor="middle" font-size="15" fill="var(--text)">React Compiler: memoization inserted at build time</text>' +
          '<text x="320" y="277" text-anchor="middle" font-size="13" fill="var(--muted)">you delete memo, useMemo and useCallback from source</text>' +
          '<rect x="30" y="310" width="580" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="335" text-anchor="middle" font-size="15" fill="var(--muted)">Vue: computed caches by value, no identity problem</text>' +
          '<text x="320" y="357" text-anchor="middle" font-size="13" fill="var(--muted)">templates are compiled and hoist static nodes for you</text>' +
          '</svg>',
        caption: {
          pl: 'Memoizacja w Reactie to walka o stabilną tożsamość referencji. Vue nigdy jej nie toczyło, bo computed cachuje po wartości, a React Compiler dopisuje te memoizacje sam.',
          en: 'React memoization is a fight for stable reference identity. Vue never fought it because computed caches by value, and the React Compiler now inserts that memoization for you.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że codziennie przynosisz koleżance to samo pudełko śniadaniowe. Ona sprawdza, czy pudełko jest to samo co wczoraj. Jeśli tak - nie otwiera go, ufa, że środek się nie zmienił.</p>' +
            '<p>Kłopot w tym, że ty co rano przekładasz śniadanie do <em>nowego</em> pudełka. Zawartość identyczna, ale pudełko inne, więc koleżanka za każdym razem wszystko sprawdza od nowa. Tak właśnie działa React: porównuje pudełka, nie zawartość.</p>' +
            '<p>Są dwa wyjścia. Pierwsze: samemu pilnować, żeby pudełko było to samo - to są useMemo i useCallback. Drugie, nowsze: zatrudnić asystenta, który robi to za ciebie przy pakowaniu. Tym asystentem jest React Compiler. W Vue ten asystent był w zestawie od początku, dlatego nigdy nie musiałeś o pudełkach myśleć.</p>',
          en: '<p>Imagine you bring a friend the same lunchbox every day. She checks whether it is the same box as yesterday. If it is, she does not open it - she trusts that the contents did not change.</p>' +
            '<p>The catch is that every morning you move the lunch into a <em>new</em> box. Identical contents, different box, so your friend re-checks everything from scratch. That is exactly how React works: it compares boxes, not contents.</p>' +
            '<p>There are two ways out. The first is to keep the box yourself, which is what useMemo and useCallback do. The second, newer one, is to hire an assistant who does it for you at packing time. That assistant is the React Compiler. In Vue the assistant came in the box from day one, which is why you never had to think about lunchboxes at all.</p>'
        },
        school: {
          pl: '<p><code>React.memo</code> opakowuje komponent i porównuje propsy płytko (<code>Object.is</code> pole po polu). Jeśli wszystkie są identyczne referencyjnie, render jest pomijany. Problem: każdy render rodzica tworzy nowe literały obiektów i nowe funkcje, więc memo prawie zawsze przegrywa - dopóki nie ustabilizujesz tych referencji.</p>' +
            '<h4>Vue kontra React</h4>' +
            '<pre><code>// Vue: computed cachuje wynik i porównuje po wartości\nconst total = computed(() =&gt; items.value.reduce((a, i) =&gt; a + i.price, 0))\n\n// React: useMemo cachuje po tablicy zależności\nconst total = useMemo(\n  () =&gt; items.reduce((a, i) =&gt; a + i.price, 0),\n  [items]\n)</code></pre>' +
            '<p>W Vue robiłeś X: pisałeś <code>computed</code> dla wygody i czytelności, a cache dostawałeś gratis. W Reactie robisz Y: <code>useMemo</code> jest optymalizacją z realnym kosztem (pamięć plus porównanie zależności) i piszesz go tylko wtedy, gdy obliczenie jest drogie albo gdy wynik trafia jako props do komponentu w <code>memo</code>. Powód Z: Vue cachuje po wartości reaktywnej, React tylko po tożsamości referencji z tablicy zależności.</p>' +
            '<h4>Trzy narzędzia</h4>' +
            '<ul>' +
            '<li><code>useMemo</code> - stabilizuje <strong>wartość</strong> (obiekt, tablica, wynik obliczenia).</li>' +
            '<li><code>useCallback</code> - stabilizuje <strong>funkcję</strong>, czyli useMemo dla funkcji.</li>' +
            '<li><code>React.memo</code> - każe komponentowi pominąć render, gdy propsy są referencyjnie takie same.</li>' +
            '</ul>' +
            '<p>Działają tylko razem. <code>memo</code> bez stabilnych propsów nic nie da, a <code>useCallback</code> bez <code>memo</code> po drugiej stronie to czysty narzut. To najczęstszy błąd osób przychodzących z Vue: memoizują wszystko odruchowo i dokładają kod, który nic nie przyspiesza.</p>',
          en: '<p><code>React.memo</code> wraps a component and compares props shallowly (<code>Object.is</code>, field by field). If every field is referentially identical the render is skipped. The catch: each parent render creates fresh object literals and fresh functions, so memo almost always loses - unless you stabilize those references.</p>' +
            '<h4>Vue versus React</h4>' +
            '<pre><code>// Vue: computed caches the result and compares by value\nconst total = computed(() =&gt; items.value.reduce((a, i) =&gt; a + i.price, 0))\n\n// React: useMemo caches against a dependency array\nconst total = useMemo(\n  () =&gt; items.reduce((a, i) =&gt; a + i.price, 0),\n  [items]\n)</code></pre>' +
            '<p>In Vue you did X: you wrote <code>computed</code> for convenience and readability, and caching came free. In React you do Y: <code>useMemo</code> is an optimization with a real cost (memory plus dependency comparison), so you write it only when the computation is expensive or when the result is passed as a prop into a <code>memo</code> component. Reason Z: Vue caches by reactive value, React caches only by reference identity from the dependency array.</p>' +
            '<h4>Three tools</h4>' +
            '<ul>' +
            '<li><code>useMemo</code> - stabilizes a <strong>value</strong> (object, array, computed result).</li>' +
            '<li><code>useCallback</code> - stabilizes a <strong>function</strong>; it is useMemo for functions.</li>' +
            '<li><code>React.memo</code> - tells a component to skip rendering when props are referentially equal.</li>' +
            '</ul>' +
            '<p>They only work as a set. <code>memo</code> without stable props does nothing, and <code>useCallback</code> without <code>memo</code> on the other side is pure overhead. This is the most common mistake people bring from Vue: they memoize everything reflexively and add code that speeds up nothing.</p>'
        },
        pro: {
          pl: '<p>Memoizacja ręcznie pisana jest kontraktem między dwoma miejscami w kodzie: producent propsów musi utrzymać tożsamość, konsument musi być opakowany w <code>memo</code>. Kontrakt jest niewidoczny dla typów i łatwo go złamać jednym nowym literałem obiektu w JSX.</p>' +
            '<pre><code>// źle: memo nigdy nie zadziała\n&lt;Chart config={{ theme: "dark" }} onZoom={() =&gt; setZoom(z + 1)} /&gt;\n\n// dobrze: stabilna wartość i stabilna funkcja\nconst config = useMemo(() =&gt; ({ theme }), [theme])\nconst onZoom = useCallback(() =&gt; setZoom(z =&gt; z + 1), [])\n&lt;Chart config={config} onZoom={onZoom} /&gt;</code></pre>' +
            '<p>Zwróć uwagę na <code>setZoom(z =&gt; z + 1)</code>. Forma funkcyjna pozwala mieć pustą tablicę zależności i eliminuje stale closure - to odpowiednik pisania <code>count.value++</code> w Vue, gdzie zawsze czytałeś aktualną wartość, bo sięgałeś do proxy, a nie do zmiennej przechwyconej w tym renderze.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>React Compiler (stabilny od 2025, wtyczka Babel <code>babel-plugin-react-compiler</code>, włączana także przez konfigurację Next.js) analizuje komponenty i sam wstawia memoizacje na poziomie pojedynczych wyrażeń. Efekt jest bliższy Vue niż klasycznemu Reactowi: piszesz zwykły kod, a cache generuje się w buildzie.</p>' +
            '<ul>' +
            '<li>Działa tylko na kodzie zgodnym z regułami hooków i bez mutacji propsów ani stanu podczas renderowania. Resztę kompilator po cichu pomija - sprawdzasz to wtyczką ESLint i panelem Components, który pokazuje znaczek <em>Memo</em>.</li>' +
            '<li>Nie zastępuje architektury. Źle rozłożony stan i przeciążony kontekst nadal będą wolne.</li>' +
            '<li>Migracja: włącz kompilator, usuń <code>useCallback</code> i <code>useMemo</code>, które istniały tylko dla wydajności, ale zostaw te, które są <em>semantyczne</em> - na przykład stabilna tożsamość obiektu przekazywanego do <code>useEffect</code> albo do biblioteki zewnętrznej.</li>' +
            '</ul>' +
            '<p>Liczby dla kontekstu: typowy render komponentu to dziesiąte części milisekundy, więc memoizowanie taniego komponentu jest strata. Opłaca się przy tabelach po kilkaset wierszy, wykresach, edytorach i wszystkim, co liczy w renderze cokolwiek powyżej 1 ms. Alternatywa bez memoizacji jest zwykle najlepsza: przekaż poddrzewo jako <code>children</code>, przenieś stan niżej, albo trzymaj go w store z selektorami (Zustand, Redux Toolkit), gdzie subskrypcja jest już drobnoziarnista - dokładnie tak jak w Pinii.</p>' +
            '<p>Na rozmowie kwalifikacyjnej: <code>memo</code> porównuje propsy płytko, <code>useMemo</code> nie gwarantuje zachowania cache (React może go porzucić), a <code>useCallback(fn, deps)</code> to dokładnie <code>useMemo(() =&gt; fn, deps)</code>.</p>',
          en: '<p>Hand-written memoization is a contract between two places in the code: the props producer must preserve identity and the consumer must be wrapped in <code>memo</code>. The contract is invisible to the type system and one fresh object literal in JSX breaks it.</p>' +
            '<pre><code>// bad: memo can never win\n&lt;Chart config={{ theme: "dark" }} onZoom={() =&gt; setZoom(z + 1)} /&gt;\n\n// good: stable value and stable function\nconst config = useMemo(() =&gt; ({ theme }), [theme])\nconst onZoom = useCallback(() =&gt; setZoom(z =&gt; z + 1), [])\n&lt;Chart config={config} onZoom={onZoom} /&gt;</code></pre>' +
            '<p>Note <code>setZoom(z =&gt; z + 1)</code>. The updater form lets the dependency array stay empty and removes stale closures - it is the equivalent of writing <code>count.value++</code> in Vue, where you always read the current value because you went through a proxy rather than a variable captured in this render.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>The React Compiler (stable since 2025, shipped as <code>babel-plugin-react-compiler</code> and enabled by a flag in Next.js config) analyses components and inserts memoization itself, at the granularity of individual expressions. The result feels closer to Vue than to classic React: you write plain code and the cache is generated at build time.</p>' +
            '<ul>' +
            '<li>It only applies to code that follows the rules of hooks and never mutates props or state during render. Anything else is silently skipped - you verify with the ESLint plugin and the Components panel, which shows a <em>Memo</em> badge.</li>' +
            '<li>It does not replace architecture. Badly placed state and an overloaded context are still slow.</li>' +
            '<li>Migration: turn the compiler on, delete <code>useCallback</code> and <code>useMemo</code> that existed purely for performance, but keep the <em>semantic</em> ones - a stable object identity handed to <code>useEffect</code> or to a third-party library, for example.</li>' +
            '</ul>' +
            '<p>Numbers for context: a typical component render costs tenths of a millisecond, so memoizing a cheap component is a loss. It pays off for tables of a few hundred rows, charts, editors, and anything that computes more than about 1 ms during render. The non-memo alternative is usually better still: pass the subtree as <code>children</code>, push state down, or keep it in a store with selectors (Zustand, Redux Toolkit) where the subscription is already fine-grained - exactly like Pinia.</p>' +
            '<p>Interview notes: <code>memo</code> compares props shallowly, <code>useMemo</code> is not a caching guarantee (React may drop it), and <code>useCallback(fn, deps)</code> is precisely <code>useMemo(() =&gt; fn, deps)</code>.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego React.memo często nie działa mimo poprawnego użycia?',
            en: 'Why does React.memo often fail even when used correctly?'
          },
          options: [
            { pl: 'Bo rodzic przekazuje nowe literały obiektów i nowe funkcje przy każdym renderze', en: 'Because the parent passes fresh object literals and fresh functions on every render' },
            { pl: 'Bo memo działa tylko w komponentach klasowych', en: 'Because memo works only in class components' },
            { pl: 'Bo memo porównuje propsy głęboko i jest wolniejsze niż render', en: 'Because memo compares props deeply and is slower than rendering' },
            { pl: 'Bo StrictMode wyłącza memoizacje', en: 'Because StrictMode disables memoization' }
          ],
          correct: 0,
          explain: {
            pl: 'Porównanie jest płytkie i oparte na tożsamości referencji, więc nowy obiekt o identycznej zawartości łamie memoizacje.',
            en: 'The comparison is shallow and identity-based, so a new object with identical contents defeats the memoization.'
          }
        },
        {
          q: {
            pl: 'Które zdanie najlepiej opisuje różnicę między computed w Vue a useMemo w Reactie?',
            en: 'Which statement best describes computed in Vue versus useMemo in React?'
          },
          options: [
            { pl: 'Są identyczne, tylko inaczej nazwane', en: 'They are identical, just named differently' },
            { pl: 'computed sam wykrywa zależności i jest domyślnym sposobem pisania pochodnych, useMemo wymaga ręcznej listy i jest optymalizacja', en: 'computed discovers dependencies itself and is the default way to write derived state, while useMemo needs a manual list and is an optimization' },
            { pl: 'useMemo cachuje między odmontowaniami komponentu, computed nie', en: 'useMemo caches across unmounts, computed does not' },
            { pl: 'computed działa tylko w szablonie, useMemo tylko w JSX', en: 'computed works only in templates, useMemo only in JSX' }
          ],
          correct: 1,
          explain: {
            pl: 'Pochodne w Reactie możesz liczyć zwykłym wyrażeniem; useMemo dokładasz dopiero, gdy koszt obliczenia lub stabilność referencji faktycznie ma znaczenie.',
            en: 'Derived values in React can just be plain expressions; you reach for useMemo only when computation cost or reference stability genuinely matters.'
          }
        },
        {
          q: {
            pl: 'Co dokładnie robi React Compiler?',
            en: 'What does the React Compiler actually do?'
          },
          options: [
            { pl: 'Zamienia JSX na szablony Vue', en: 'Converts JSX into Vue templates' },
            { pl: 'Wprowadza drobnoziarnistą reaktywność opartą na sygnałach w czasie działania', en: 'Introduces signal-based fine-grained reactivity at runtime' },
            { pl: 'Automatycznie usuwa efekty uboczne z komponentów', en: 'Automatically removes side effects from components' },
            { pl: 'Analizuje kod w buildzie i sam wstawia memoizacje wartości oraz komponentów', en: 'Analyses code at build time and inserts memoization of values and components for you' }
          ],
          correct: 3,
          explain: {
            pl: 'To transformacja buildowa, a nie nowy model reaktywności - React nadal renderuje poddrzewa, tylko większość z nich pomija dzięki wygenerowanemu cache.',
            en: 'It is a build-time transformation, not a new reactivity model - React still renders subtrees, it just skips most of them thanks to the generated cache.'
          }
        },
        {
          q: {
            pl: 'Włączasz React Compiler w istniejącym projekcie. Które memoizacje warto zostawić?',
            en: 'You enable the React Compiler in an existing project. Which memoizations are worth keeping?'
          },
          options: [
            { pl: 'Wszystkie - kompilator ich nie rusza, więc nic nie szkodzą', en: 'All of them - the compiler ignores them, so they do no harm' },
            { pl: 'Te semantyczne: stabilna tożsamość obiektów trafiających do useEffect albo do bibliotek zewnętrznych', en: 'The semantic ones: stable identity for objects handed to useEffect or to third-party libraries' },
            { pl: 'Tylko useCallback, bo kompilator nie obsługuje funkcji', en: 'Only useCallback, because the compiler cannot handle functions' },
            { pl: 'Żadne - kompilator gwarantuje memoizacje każdego komponentu', en: 'None - the compiler guarantees memoization of every component' }
          ],
          correct: 1,
          explain: {
            pl: 'Memoizacja bywa częścią kontraktu, a nie tylko optymalizacja: jeśli od tożsamości referencji zależy uruchomienie efektu lub zachowanie zewnętrznej biblioteki, zostaw ją jawną. Kompilator pomija też kod łamiący reguły, więc nie gwarantuje pokrycia całego drzewa.',
            en: 'Memoization is sometimes part of a contract rather than an optimization: if effect firing or a third-party library depends on reference identity, keep it explicit. The compiler also skips rule-breaking code, so full coverage is not guaranteed.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'lists-virtualization',
      title: {
        pl: 'Listy i wirtualizacja',
        en: 'Lists and virtualization'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Wirtualizacja listy', en: 'List virtualization' },
          def: { pl: 'Renderowanie wyłącznie wierszy widocznych w oknie przewijania, wyliczonych z wysokości kontenera, offsetu scrolla i szacowanej wysokości wiersza.', en: 'Rendering only the rows visible in the scroll window, derived from container height, scroll offset and estimated row height.' }
        },
        {
          term: { pl: 'overscan', en: 'overscan' },
          def: { pl: 'Bufor wierszy renderowanych poza widocznym obszarem, żeby przy szybkim scrollu nie migały puste pasy. Zwykle 3-10; więcej to marnowana praca.', en: 'A buffer of rows rendered outside the viewport so fast scrolling does not show blank bands. Usually 3-10; more is wasted work.' }
        },
        {
          term: { pl: 'measureElement', en: 'measureElement' },
          def: { pl: 'Mechanizm TanStack Virtual oparty na <code>ResizeObserver</code>, który po zamontowaniu koryguje szacowaną wysokość wiersza i przelicza offsety. Bez niego scrollbar skacze.', en: 'The TanStack Virtual mechanism backed by <code>ResizeObserver</code> that corrects the estimated row height after mount and recomputes offsets. Without it the scrollbar jumps.' }
        },
        {
          term: { pl: 'content-visibility: auto', en: 'content-visibility: auto' },
          def: { pl: 'Właściwość CSS pomijająca layout treści poza ekranem. Tańsza alternatywa dla wirtualizacji, warta sprawdzenia zanim dołożysz bibliotekę.', en: 'A CSS property that skips layout for off-screen content. A cheaper alternative to virtualization, worth trying before you add a library.' }
        },
        {
          term: { pl: 'Stabilny key', en: 'Stable key' },
          def: { pl: 'Klucz oparty na identyfikatorze rekordu, nie na indeksie. Przy wirtualizacji indeks zmienia się razem z oknem, co daje efektowne błędy fokusu i stanu wiersza.', en: 'A key based on the record id, not the index. With virtualization the index shifts along with the window, producing spectacular focus and row-state bugs.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="28" font-size="15" fill="var(--muted)">10 000 rows in the data, 12 rows in the DOM</text>' +
          '<rect x="30" y="44" width="180" height="320" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="120" y="68" text-anchor="middle" font-size="14" fill="var(--muted)">data array</text>' +
          '<rect x="46" y="80" width="148" height="14" rx="3" fill="var(--border)"/>' +
          '<rect x="46" y="100" width="148" height="14" rx="3" fill="var(--border)"/>' +
          '<rect x="46" y="120" width="148" height="14" rx="3" fill="var(--accent)"/>' +
          '<rect x="46" y="140" width="148" height="14" rx="3" fill="var(--accent)"/>' +
          '<rect x="46" y="160" width="148" height="14" rx="3" fill="var(--accent)"/>' +
          '<rect x="46" y="180" width="148" height="14" rx="3" fill="var(--border)"/>' +
          '<rect x="46" y="200" width="148" height="14" rx="3" fill="var(--border)"/>' +
          '<rect x="46" y="220" width="148" height="14" rx="3" fill="var(--border)"/>' +
          '<rect x="38" y="112" width="164" height="70" rx="6" fill="none" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="120" y="256" text-anchor="middle" font-size="13" fill="var(--muted)">window = visible range</text>' +
          '<rect x="250" y="44" width="170" height="150" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="335" y="70" text-anchor="middle" font-size="14" fill="var(--text)">rendered rows</text>' +
          '<text x="335" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">key = row.id</text>' +
          '<text x="335" y="120" text-anchor="middle" font-size="13" fill="var(--muted)">absolute top offset</text>' +
          '<text x="335" y="144" text-anchor="middle" font-size="13" fill="var(--muted)">+ overscan 3</text>' +
          '<rect x="450" y="44" width="160" height="150" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="530" y="70" text-anchor="middle" font-size="14" fill="var(--text)">spacer height</text>' +
          '<text x="530" y="96" text-anchor="middle" font-size="13" fill="var(--muted)">10 000 x 40 px</text>' +
          '<text x="530" y="122" text-anchor="middle" font-size="13" fill="var(--muted)">keeps the scrollbar</text>' +
          '<text x="530" y="148" text-anchor="middle" font-size="13" fill="var(--muted)">honest</text>' +
          '<rect x="250" y="230" width="360" height="134" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="430" y="258" text-anchor="middle" font-size="15" fill="var(--text)">Vue v-for :key vs React list key</text>' +
          '<text x="430" y="284" text-anchor="middle" font-size="13" fill="var(--muted)">same rule: stable id, never the index</text>' +
          '<text x="430" y="310" text-anchor="middle" font-size="13" fill="var(--muted)">TanStack Virtual works in both</text>' +
          '<text x="430" y="336" text-anchor="middle" font-size="13" fill="var(--muted)">v-memo has no React twin, memo comes close</text>' +
          '</svg>',
        caption: {
          pl: 'Wirtualizacja: dane mają 10 000 wierszy, DOM tylko widoczne okno plus overscan, a wysoki spacer utrzymuje prawidłowy pasek przewijania.',
          en: 'Virtualization: the data has 10,000 rows, the DOM holds only the visible window plus overscan, and a tall spacer keeps the scrollbar honest.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Masz książkę telefoniczną z dziesięcioma tysiącami nazwisk. Nikt nie kładzie na stole wszystkich stron naraz. Trzymasz otwartą jedną, a reszta czeka zamknięta - i to wystarcza, bo i tak widzisz tylko to, co masz przed oczami.</p>' +
            '<p>Przeglądarka działa tak samo. Dziesięć tysięcy wierszy w HTML to dziesięć tysięcy pudełek do policzenia, ustawienia i pomalowania. Telefon się na tym zatnie. Wirtualizacja mówi: narysuj tylko dwadzieścia wierszy, które akurat widać, a pod spodem podłóż bardzo wysoki pusty kawałek, żeby pasek przewijania nie kłamał.</p>' +
            '<p>Kiedy użytkownik przewija, podmieniasz zawartość tych dwudziestu wierszy. To jak przesuwanie okienka po długiej taśmie. Taśma jest ogromna, okienko małe i zawsze tak samo tanie w rysowaniu.</p>',
          en: '<p>You have a phone book with ten thousand names in it. Nobody spreads every page across the table. You keep one page open and the rest stays closed - which is fine, because you can only look at what is in front of you anyway.</p>' +
            '<p>The browser behaves the same way. Ten thousand rows of HTML means ten thousand boxes to measure, lay out and paint. A phone will choke on that. Virtualization says: draw only the twenty rows that are actually visible and put a very tall empty block underneath so the scrollbar does not lie.</p>' +
            '<p>When the user scrolls, you swap the contents of those twenty rows. It is like sliding a small window along a very long strip of film. The strip is enormous, the window is small, and drawing it always costs the same.</p>'
        },
        school: {
          pl: '<p>Zacznijmy od kluczy, bo to wspólny fundament. W Vue pisałeś <code>v-for="item in items" :key="item.id"</code> i wiedziałeś, że bez klucza Vue użyje strategii <em>in-place patch</em>. W Reactie robisz to samo, tylko klucz podajesz jako props elementu, a React używa go do dopasowania elementów między renderami.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;Row v-for="row in rows" :key="row.id" :row="row" /&gt;\n\n// React\n{rows.map(row =&gt; &lt;Row key={row.id} row={row} /&gt;)}</code></pre>' +
            '<p>Powód Z jest identyczny w obu bibliotekach: klucz to tożsamość wiersza. Indeks jako klucz przy sortowaniu lub usuwaniu powoduje, że stan wewnętrzny (zaznaczone pole, focus, animacja) przykleja się do złego wiersza.</p>' +
            '<h4>Kiedy wirtualizować</h4>' +
            '<p>Do około 200-300 prostych wierszy nie rob nic. Powyżej tysiąca wierszy albo przy bogatych wierszach (awatary, wykresy, edytowalne pola) DOM staje się wąskim gardlem i widać to jako zacinanie przy przewijaniu oraz długi czas montowania.</p>' +
            '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual"\n\nconst rowVirtualizer = useVirtualizer({\n  count: rows.length,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 40,\n  overscan: 5\n})</code></pre>' +
            '<p>Biblioteka liczy, które indeksy są widoczne, i zwraca ich pozycje. Ty renderujesz tylko je, każdy pozycjonowany absolutnie wewnątrz kontenera o wysokości całej listy. W Vue robiłeś X przez <code>vue-virtual-scroller</code> albo ten sam TanStack Virtual w wersji dla Vue - to ta sama biblioteka rdzeniowa, więc wiedza przenosi się w całości.</p>',
          en: '<p>Start with keys, because that is the shared foundation. In Vue you wrote <code>v-for="item in items" :key="item.id"</code> and knew that without a key Vue falls back to its <em>in-place patch</em> strategy. In React you do the same thing, except the key is a prop on the element and React uses it to match elements between renders.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;Row v-for="row in rows" :key="row.id" :row="row" /&gt;\n\n// React\n{rows.map(row =&gt; &lt;Row key={row.id} row={row} /&gt;)}</code></pre>' +
            '<p>Reason Z is identical in both libraries: the key is the identity of the row. Using the index as a key means that when rows are sorted or removed, internal state (a checked box, focus, an animation) sticks to the wrong row.</p>' +
            '<h4>When to virtualize</h4>' +
            '<p>Below roughly 200-300 simple rows, do nothing. Above a thousand rows, or with rich rows (avatars, sparklines, editable fields), the DOM becomes the bottleneck and you see it as scroll jank and a long mount time.</p>' +
            '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual"\n\nconst rowVirtualizer = useVirtualizer({\n  count: rows.length,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 40,\n  overscan: 5\n})</code></pre>' +
            '<p>The library computes which indices are visible and returns their offsets. You render only those, each absolutely positioned inside a container as tall as the full list. In Vue you did X with <code>vue-virtual-scroller</code> or the Vue build of the same TanStack Virtual - it is the same core library, so the knowledge transfers completely.</p>'
        },
        pro: {
          pl: '<p>Wirtualizacja to trzy liczby: wysokość kontenera, pozycja przewijania i szacowana wysokość wiersza. Z nich wynika zakres indeksów, które renderujesz, powiększony o <strong>overscan</strong> - bufor wierszy poza ekranem, który zapobiega białym pasom przy szybkim przewijaniu. Typowo 3-10 wierszy; więcej to niepotrzebny koszt.</p>' +
            '<h4>Wysokości dynamiczne</h4>' +
            '<p>Stała wysokość jest łatwa. Zmienna wymaga pomiaru: TanStack Virtual udostępnia <code>measureElement</code> oparty na <code>ResizeObserver</code>, który po zamontowaniu koryguje szacunek i przelicza offsety. Bez tego pasek przewijania skacze. Ten sam mechanizm działa w wersji dla Vue, bo rdzeń jest bezframeworkowy.</p>' +
            '<pre><code>&lt;div ref={parentRef} style={{ height: 600, overflow: "auto" }}&gt;\n  &lt;div style={{ height: v.getTotalSize(), position: "relative" }}&gt;\n    {v.getVirtualItems().map(item =&gt; (\n      &lt;div key={rows[item.index].id}\n           ref={v.measureElement}\n           data-index={item.index}\n           style={{ position: "absolute", top: 0,\n                    transform: "translateY(" + item.start + "px)" }}&gt;\n        &lt;Row row={rows[item.index]} /&gt;\n      &lt;/div&gt;\n    ))}\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre>' +
            '<h4>Pułapki produkcyjne</h4>' +
            '<ul>' +
            '<li><strong>Ctrl+F i dostępność</strong> - treści poza oknem nie ma w DOM, więc wyszukiwarka przeglądarki jej nie znajdzie. Dla tabel dodaj <code>role="grid"</code> oraz <code>aria-rowcount</code>, żeby czytnik ekranu znał pełny rozmiar.</li>' +
            '<li><strong>Sticky header i kolumny</strong> - pozycjonowanie absolutne wewnątrz kontenera przewijania lubi się gryźć ze <code>position: sticky</code>; trzymaj nagłówek poza kontenerem wirtualizowanym.</li>' +
            '<li><strong>Utrata stanu wiersza</strong> - odmontowany wiersz traci stan lokalny. Rozwinięta sekcja czy zaznaczenie muszą mieszkać w stanie listy, nie w wierszu.</li>' +
            '<li><strong>Źle klucze</strong> - przy indeksach wirtualizacja zamienia również tożsamości, co daje spektakularne bugi z focusem.</li>' +
            '</ul>' +
            '<p>Zanim siegniesz po wirtualizacje, sprawdź tańsze opcje: paginacja lub nieskończone przewijanie z <code>useInfiniteQuery</code> (TanStack Query), <code>content-visibility: auto</code> w CSS, które pomija layout poza ekranem prawie za darmo, oraz <code>React.memo</code> na komponencie wiersza. W Vue mieliście do tego jeszcze <code>v-memo</code>, które pomijało patchowanie poddrzewa po liście zależności - w Reactie nie ma bezpośredniego odpowiednika, najbliżej jest zapamiętany komponent wiersza ze stabilnymi propsami albo React Compiler, który zrobi to samo automatycznie.</p>' +
            '<p>Rząd wielkości: 5 000 wierszy tabeli po 6 kolumn to zwykle ponad 500 ms montowania i kilkaset megabajtów pamięci w Chrome. Ta sama lista zwirtualizowana montuje się w 20-40 ms i przewija stabilnie w 60 fps na średniej klasy Androidzie.</p>',
          en: '<p>Virtualization comes down to three numbers: container height, scroll offset and estimated row height. From those you derive the index range you render, widened by <strong>overscan</strong> - a buffer of off-screen rows that prevents blank bands during fast scrolling. Typically 3-10 rows; more is wasted work.</p>' +
            '<h4>Dynamic heights</h4>' +
            '<p>Fixed heights are easy. Variable heights need measurement: TanStack Virtual exposes <code>measureElement</code> backed by <code>ResizeObserver</code>, which corrects the estimate after mount and recomputes offsets. Without it the scrollbar jumps. The same mechanism exists in the Vue build, because the core is framework-agnostic.</p>' +
            '<pre><code>&lt;div ref={parentRef} style={{ height: 600, overflow: "auto" }}&gt;\n  &lt;div style={{ height: v.getTotalSize(), position: "relative" }}&gt;\n    {v.getVirtualItems().map(item =&gt; (\n      &lt;div key={rows[item.index].id}\n           ref={v.measureElement}\n           data-index={item.index}\n           style={{ position: "absolute", top: 0,\n                    transform: "translateY(" + item.start + "px)" }}&gt;\n        &lt;Row row={rows[item.index]} /&gt;\n      &lt;/div&gt;\n    ))}\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre>' +
            '<h4>Production pitfalls</h4>' +
            '<ul>' +
            '<li><strong>Ctrl+F and accessibility</strong> - content outside the window is not in the DOM, so browser find will not locate it. For tables add <code>role="grid"</code> and <code>aria-rowcount</code> so screen readers know the true size.</li>' +
            '<li><strong>Sticky headers and columns</strong> - absolute positioning inside a scroll container fights <code>position: sticky</code>; keep the header outside the virtualized container.</li>' +
            '<li><strong>Lost row state</strong> - an unmounted row loses local state. An expanded section or a selection must live in the list state, not in the row.</li>' +
            '<li><strong>Bad keys</strong> - with index keys, virtualization also shuffles identity, which produces spectacular focus bugs.</li>' +
            '</ul>' +
            '<p>Before reaching for virtualization, check the cheaper options: pagination or infinite scroll with <code>useInfiniteQuery</code> (TanStack Query), the CSS property <code>content-visibility: auto</code> which skips off-screen layout almost for free, and <code>React.memo</code> on the row component. In Vue you also had <code>v-memo</code>, which skipped patching a subtree based on a dependency list - React has no direct equivalent; the closest is a memoized row component with stable props, or the React Compiler doing that automatically.</p>' +
            '<p>Order of magnitude: 5,000 table rows with 6 columns typically means over 500 ms to mount and a few hundred megabytes of memory in Chrome. The same list virtualized mounts in 20-40 ms and scrolls at a steady 60 fps on a mid-range Android device.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Po co przy wirtualizacji potrzebny jest wysoki, pusty kontener?',
            en: 'Why does a virtualized list need a tall, empty container?'
          },
          options: [
            { pl: 'Żeby przeglądarka wczytała wszystkie wiersze z wyprzedzeniem', en: 'So the browser can preload every row in advance' },
            { pl: 'Żeby pasek przewijania odpowiadał pełnej liczbie wierszy', en: 'So the scrollbar matches the full number of rows' },
            { pl: 'Żeby React mógł obliczyć klucze', en: 'So React can compute the keys' },
            { pl: 'Żeby uniknąć użycia position: absolute', en: 'To avoid using position: absolute' }
          ],
          correct: 1,
          explain: {
            pl: 'W DOM istnieje tylko widoczne okno, więc bez spacera o pełnej wysokości przewijanie kończyłoby się po kilkunastu wierszach.',
            en: 'Only the visible window exists in the DOM, so without a full-height spacer the scroll would end after a dozen rows.'
          }
        },
        {
          q: {
            pl: 'Kiedy użycie indeksu tablicy jako klucza jest bezpieczne?',
            en: 'When is using the array index as a key safe?'
          },
          options: [
            { pl: 'Zawsze, React i tak porównuje zawartość', en: 'Always, React compares contents anyway' },
            { pl: 'Tylko przy listach powyżej tysiąca elementów', en: 'Only for lists over a thousand items' },
            { pl: 'Gdy lista jest statyczna i nigdy nie zmienia kolejności ani długości', en: 'When the list is static and never changes order or length' },
            { pl: 'Gdy każdy wiersz jest opakowany w React.memo', en: 'When every row is wrapped in React.memo' }
          ],
          correct: 2,
          explain: {
            pl: 'Reguły są te same co w v-for w Vue: indeks jest tożsamością pozycji, a nie danych, więc przy sortowaniu lub usuwaniu stan przyklei się do złego elementu.',
            en: 'The rule matches v-for in Vue: an index identifies a position, not the data, so sorting or deleting sticks state onto the wrong item.'
          }
        },
        {
          q: {
            pl: 'Co robi parametr overscan w wirtualizatorze?',
            en: 'What does the overscan option do in a virtualizer?'
          },
          options: [
            { pl: 'Renderuje kilka dodatkowych wierszy poza widocznym oknem, żeby uniknąć białych pasów', en: 'Renders a few extra rows beyond the visible window to avoid blank bands' },
            { pl: 'Ogranicza liczbę zdarzeń przewijania na sekundę', en: 'Limits the number of scroll events per second' },
            { pl: 'Włącza pomiar wysokości wierszy', en: 'Enables row height measurement' },
            { pl: 'Buforuje dane pobrane z serwera', en: 'Caches data fetched from the server' }
          ],
          correct: 0,
          explain: {
            pl: 'Overscan to bufor renderowania. Zbyt mały daje migotanie przy szybkim przewijaniu, zbyt duży niweczy zysk z wirtualizacji.',
            en: 'Overscan is a render buffer. Too little causes flicker on fast scroll, too much cancels the benefit of virtualizing at all.'
          }
        },
        {
          q: {
            pl: 'Zwirtualizowana tabela ma rozwijane wiersze. Po przewinięciu w dół i z powrotem rozwinięcie znika. Dlaczego?',
            en: 'A virtualized table has expandable rows. After scrolling away and back, the expansion is gone. Why?'
          },
          options: [
            { pl: 'Bo klucze są niestabilne i React miesza wiersze', en: 'Because keys are unstable and React mixes up rows' },
            { pl: 'Bo wiersz poza oknem został odmontowany razem ze swoim stanem lokalnym', en: 'Because the off-screen row was unmounted together with its local state' },
            { pl: 'Bo overscan jest ustawiony na zero', en: 'Because overscan is set to zero' },
            { pl: 'Bo ResizeObserver resetuje stan po pomiarze', en: 'Because ResizeObserver resets state after measuring' }
          ],
          correct: 1,
          explain: {
            pl: 'Wirtualizacja odmontowuje komponenty poza oknem, a useState żyje tylko tak długo jak komponent. Stan rozwinięcia musi trafić do zbioru trzymanego przez listę, na przykład Set z identyfikatorami.',
            en: 'Virtualization unmounts off-screen components and useState lives only as long as the component. Expansion state must move up into the list, for example a Set of ids.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'code-splitting',
      title: {
        pl: 'Code splitting i leniwe ładowanie',
        en: 'Code splitting and lazy loading'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Code splitting', en: 'Code splitting' },
          def: { pl: 'Podział bundla na chunki ładowane na zadanie - zwykle po trasach. Optymalizuje metryki startu: LCP i TBT, bo 300 kB gzip to około 1,5-2 s parsowania na średniej klasy Androidzie.', en: 'Splitting the bundle into on-demand chunks, usually along routes. It optimizes startup metrics, LCP and TBT, because 300 kB gzipped is roughly 1.5-2 s of parse time on a mid-range Android.' }
        },
        {
          term: { pl: 'Prefetch na hover', en: 'Prefetch on hover' },
          def: { pl: 'Start importu na <code>onMouseEnter</code> i <code>onFocus</code>, dzięki czemu kliknięcie jest natychmiastowe. Next robi to automatycznie dla <code>next/link</code> w viewporcie.', en: 'Kicking off the import on <code>onMouseEnter</code> and <code>onFocus</code> so the click feels instant. Next does it automatically for a <code>next/link</code> in the viewport.' }
        },
        {
          term: { pl: 'Kaskada chunków', en: 'Chunk waterfall' },
          def: { pl: 'Leniwy komponent, który dopiero po zamontowaniu zaczyna pobierać dane - dwie rundy czekania zamiast jednej. Lekarstwo: start zapytania równolegle z importem.', en: 'A lazy component that only starts fetching data after it mounts - two rounds of waiting instead of one. The cure: start the request in parallel with the import.' }
        },
        {
          term: { pl: 'Stale chunk po deployu', en: 'Stale chunk after deploy' },
          def: { pl: 'Otwarta karta prosi o plik z poprzedniego builda i dostaje 404. Trzeba obsłużyć błąd importu i zaproponować przeładowanie strony.', en: 'An open tab requests a file from the previous build and gets a 404. You must handle the import failure and offer a reload.' }
        },
        {
          term: { pl: 'Budżet bundla', en: 'Bundle budget' },
          def: { pl: 'Ustalony limit rozmiaru shella, zwykle 150-200 kB gzip, pilnowany w CI. Bez niego każdy sprint dokłada kilka kilobajtów i nikt tego nie zauważa.', en: 'An agreed size limit for the shell, usually 150-200 kB gzipped, enforced in CI. Without it every sprint adds a few kilobytes and nobody notices.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="30" y="30" width="240" height="90" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="150" y="60" text-anchor="middle" font-size="15" fill="var(--text)">One bundle</text>' +
          '<text x="150" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">900 kB gzipped</text>' +
          '<text x="150" y="106" text-anchor="middle" font-size="13" fill="var(--err)">slow first paint</text>' +
          '<line x1="270" y1="75" x2="345" y2="75" stroke="var(--accent)" stroke-width="2" marker-end="url(#p4a)"/>' +
          '<rect x="350" y="30" width="260" height="90" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="480" y="60" text-anchor="middle" font-size="15" fill="var(--text)">Shell + route chunks</text>' +
          '<text x="480" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">180 kB now, rest on demand</text>' +
          '<text x="480" y="106" text-anchor="middle" font-size="13" fill="var(--ok)">fast first paint</text>' +
          '<rect x="60" y="170" width="150" height="66" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="135" y="198" text-anchor="middle" font-size="14" fill="var(--text)">shell</text>' +
          '<text x="135" y="220" text-anchor="middle" font-size="13" fill="var(--muted)">router + layout</text>' +
          '<rect x="245" y="170" width="150" height="66" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="198" text-anchor="middle" font-size="14" fill="var(--text)">route: reports</text>' +
          '<text x="320" y="220" text-anchor="middle" font-size="13" fill="var(--muted)">charts 320 kB</text>' +
          '<rect x="430" y="170" width="150" height="66" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="505" y="198" text-anchor="middle" font-size="14" fill="var(--text)">route: editor</text>' +
          '<text x="505" y="220" text-anchor="middle" font-size="13" fill="var(--muted)">rich text 260 kB</text>' +
          '<rect x="60" y="280" width="520" height="86" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="308" text-anchor="middle" font-size="15" fill="var(--text)">React: lazy + Suspense fallback</text>' +
          '<text x="320" y="332" text-anchor="middle" font-size="13" fill="var(--muted)">Vue: defineAsyncComponent with loadingComponent</text>' +
          '<text x="320" y="354" text-anchor="middle" font-size="13" fill="var(--muted)">both compile to the same dynamic import</text>' +
          '</svg>',
        caption: {
          pl: 'Jeden bundle kontra shell plus chunki na trasy: React używa lazy i Suspense, Vue defineAsyncComponent, ale pod spodem to ten sam dynamiczny import bundlera.',
          en: 'One bundle versus a shell plus route chunks: React uses lazy and Suspense, Vue uses defineAsyncComponent, and underneath both are the same bundler dynamic import.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jak dzieli się bundle i co dzieje się w czasie nawigacji: od jednej paczki, przez fallback Suspense, po prefetch kolejnej trasy.',
          en: 'How a bundle splits and what happens during navigation: from a single package through the Suspense fallback to prefetching the next route.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="24" width="580" height="22" rx="6" fill="var(--err)"/>' +
              '<text x="320" y="70" text-anchor="middle" font-size="15" fill="var(--text)">initial download: 900 kB</text>' +
              '<rect x="40" y="100" width="560" height="120" rx="12" fill="none" stroke="var(--err)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<rect x="60" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="166" text-anchor="middle" font-size="14" fill="var(--text)">shell</text>' +
              '<rect x="240" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="166" text-anchor="middle" font-size="14" fill="var(--text)">reports</text>' +
              '<rect x="420" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="166" text-anchor="middle" font-size="14" fill="var(--text)">editor</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">everything ships on first load</text>' +
              '</svg>',
            label: { pl: 'Jeden bundle', en: 'One bundle' },
            note: {
              pl: 'Wszystkie trasy są w jednej paczce. Użytkownik, który chce tylko listy, i tak pobiera edytor tekstu.',
              en: 'Every route sits in one package. A user who only wants the list still downloads the rich text editor.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="24" width="120" height="22" rx="6" fill="var(--ok)"/>' +
              '<text x="320" y="70" text-anchor="middle" font-size="15" fill="var(--text)">initial download: 180 kB</text>' +
              '<rect x="60" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="166" text-anchor="middle" font-size="14" fill="var(--text)">shell loaded</text>' +
              '<rect x="240" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="320" y="166" text-anchor="middle" font-size="14" fill="var(--muted)">reports chunk</text>' +
              '<rect x="420" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="500" y="166" text-anchor="middle" font-size="14" fill="var(--muted)">editor chunk</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">route chunks are separate files now</text>' +
              '</svg>',
            label: { pl: 'Podział na chunki', en: 'Split into chunks' },
            note: {
              pl: 'Każdy dynamiczny import tworzy osobny plik. Pierwsze ładowanie to już tylko shell z routerem i layoutem.',
              en: 'Each dynamic import creates its own file. The first load now carries only the shell with the router and layout.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="24" width="120" height="22" rx="6" fill="var(--ok)"/>' +
              '<text x="320" y="70" text-anchor="middle" font-size="15" fill="var(--warn)">user navigates to /reports</text>' +
              '<rect x="60" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="166" text-anchor="middle" font-size="14" fill="var(--text)">shell loaded</text>' +
              '<rect x="240" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="166" text-anchor="middle" font-size="14" fill="var(--text)">fetching 320 kB</text>' +
              '<rect x="420" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="500" y="166" text-anchor="middle" font-size="14" fill="var(--muted)">editor chunk</text>' +
              '<rect x="240" y="220" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="251" text-anchor="middle" font-size="14" fill="var(--text)">Suspense fallback</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--muted)">skeleton shows while the chunk downloads</text>' +
              '</svg>',
            label: { pl: 'Fallback Suspense', en: 'Suspense fallback' },
            note: {
              pl: 'Podczas pobierania chunku React renderuje fallback. To odpowiednik loadingComponent w defineAsyncComponent.',
              en: 'While the chunk downloads React renders the fallback. It is the equivalent of loadingComponent in defineAsyncComponent.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="24" width="330" height="22" rx="6" fill="var(--ok)"/>' +
              '<text x="320" y="70" text-anchor="middle" font-size="15" fill="var(--text)">reports rendered, chunk cached</text>' +
              '<rect x="60" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="166" text-anchor="middle" font-size="14" fill="var(--text)">shell loaded</text>' +
              '<rect x="240" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="166" text-anchor="middle" font-size="14" fill="var(--text)">reports loaded</text>' +
              '<rect x="420" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="500" y="166" text-anchor="middle" font-size="14" fill="var(--muted)">editor chunk</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--ok)">second visit to /reports is instant</text>' +
              '</svg>',
            label: { pl: 'Chunk w cache', en: 'Chunk cached' },
            note: {
              pl: 'Moduł zostaje w pamięci i w cache HTTP, więc powrót na tę trasę nie pokazuje już fallbacku.',
              en: 'The module stays in memory and in the HTTP cache, so returning to that route no longer shows a fallback.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="24" width="330" height="22" rx="6" fill="var(--ok)"/>' +
              '<text x="320" y="70" text-anchor="middle" font-size="15" fill="var(--accent2)">hover on the editor link: prefetch</text>' +
              '<rect x="60" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="166" text-anchor="middle" font-size="14" fill="var(--text)">shell loaded</text>' +
              '<rect x="240" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="166" text-anchor="middle" font-size="14" fill="var(--text)">reports loaded</text>' +
              '<rect x="420" y="130" width="160" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="500" y="166" text-anchor="middle" font-size="14" fill="var(--text)">editor prefetching</text>' +
              '<text x="320" y="330" text-anchor="middle" font-size="15" fill="var(--accent2)">latency hidden before the click</text>' +
              '</svg>',
            label: { pl: 'Prefetch', en: 'Prefetch' },
            note: {
              pl: 'Wywołanie importu na hover lub w bezczynności sprawia, że kliknięcie jest natychmiastowe. Next.js robi to dla Link automatycznie.',
              en: 'Calling the import on hover or during idle time makes the click feel instant. Next.js does this for Link automatically.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie przeprowadzkę. Możesz przywieźć wszystkie pudła naraz - i przez godzinę blokować klatkę schodową. Albo przywieźć najpierw łóżko i czajnik, a resztę dowozić wtedy, kiedy naprawdę będzie potrzebna.</p>' +
            '<p>Strona internetowa ma dokładnie ten sam wybór. Cały kod aplikacji może przyjechać jedna wielka paczka, która użytkownik pobiera, zanim cokolwiek zobaczy. Albo możesz wysłać najpierw to, co widać na pierwszym ekranie, a ciężkie rzeczy - edytor, wykresy, mape - dowieźć dopiero, gdy ktoś w nie kliknie.</p>' +
            '<p>Ten drugi sposób nazywa się code splitting. Nie zmniejsza łącznej ilości kodu, tylko zmienia kolejność. A ponieważ większość ludzi nigdy nie wchodzi do połowy zakładek, ta reszta często nie musi przyjechać w ogóle.</p>',
          en: '<p>Picture moving house. You can bring every box at once and block the stairwell for an hour. Or you can bring the bed and the kettle first and deliver the rest when it is actually needed.</p>' +
            '<p>A website faces exactly the same choice. All your application code can arrive as one big package that the user downloads before seeing anything. Or you can send what is visible on the first screen first and deliver the heavy things - the editor, the charts, the map - only when someone clicks into them.</p>' +
            '<p>The second approach is called code splitting. It does not reduce the total amount of code, it changes the order. And since most people never open half of the tabs, that remainder often never has to arrive at all.</p>'
        },
        school: {
          pl: '<p>Punktem wyjścia jest dynamiczny import, który rozumieją wszystkie bundlery (Vite, webpack, Rspack). Każde wywołanie <code>import()</code> tworzy osobny chunk pobierany dopiero w momencie wywołania.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\nconst Editor = defineAsyncComponent({\n  loader: () =&gt; import("./Editor.vue"),\n  loadingComponent: Spinner\n})\n\n// React\nconst Editor = lazy(() =&gt; import("./Editor"))\n\n&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;\n  &lt;Editor /&gt;\n&lt;/Suspense&gt;</code></pre>' +
            '<p>W Vue robiłeś X: stan ładowania konfigurowałeś wewnątrz komponentu asynchronicznego, więc każdy miał swój własny spinner. W Reactie robisz Y: <code>lazy</code> zajmuje się wyłącznie samym importem, a stan ładowania deklarujesz <em>wyżej</em>, granica <code>Suspense</code>. Powód Z: dzięki temu jedna granica może objąć kilka leniwych komponentów i pokazać jeden spójny szkielet zamiast pięciu migających spinnerów.</p>' +
            '<h4>Gdzie ciąć</h4>' +
            '<ul>' +
            '<li><strong>Po trasach</strong> - największy zysk przy najmniejszym wysiłku, tak samo jak leniwe trasy w Vue Router.</li>' +
            '<li><strong>Ciężkie biblioteki</strong> - edytor tekstu, biblioteka wykresów, mapa, kod eksportu do PDF.</li>' +
            '<li><strong>Rzadkie interakcje</strong> - modal ustawień zaawansowanych, panel administracyjny, kreator importu.</li>' +
            '</ul>' +
            '<p>Nie dziel na drobne kawałki bez potrzeby. Każdy chunk to osobne zadanie sieciowe, a dwadzieścia małych plików potrafi być wolniejsze niż jeden średni, zwłaszcza przy wysokim opóźnieniu w sieci komórkowej.</p>' +
            '<p>Zawsze mierz. <code>rollup-plugin-visualizer</code> dla Vite albo <code>@next/bundle-analyzer</code> rysują mape bundla, na której od razu widać, że połowa rozmiaru to jedna biblioteka do formatowania dat, której używasz w dwóch miejscach.</p>',
          en: '<p>The starting point is the dynamic import, understood by every bundler (Vite, webpack, Rspack). Each <code>import()</code> call produces a separate chunk fetched only when that call runs.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\nconst Editor = defineAsyncComponent({\n  loader: () =&gt; import("./Editor.vue"),\n  loadingComponent: Spinner\n})\n\n// React\nconst Editor = lazy(() =&gt; import("./Editor"))\n\n&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;\n  &lt;Editor /&gt;\n&lt;/Suspense&gt;</code></pre>' +
            '<p>In Vue you did X: the loading state was configured inside the async component, so each one owned its own spinner. In React you do Y: <code>lazy</code> handles only the import, and the loading state is declared <em>above</em>, at a <code>Suspense</code> boundary. Reason Z: one boundary can then cover several lazy components and show a single coherent skeleton instead of five flickering spinners.</p>' +
            '<h4>Where to cut</h4>' +
            '<ul>' +
            '<li><strong>By route</strong> - the biggest win for the least effort, exactly like lazy routes in Vue Router.</li>' +
            '<li><strong>Heavy libraries</strong> - the rich text editor, the charting library, the map, the PDF export code.</li>' +
            '<li><strong>Rare interactions</strong> - the advanced settings modal, the admin panel, the import wizard.</li>' +
            '</ul>' +
            '<p>Do not shatter the app into tiny pieces for the sake of it. Every chunk is another network request, and twenty small files can be slower than one medium file, especially with high latency on mobile.</p>' +
            '<p>Always measure. <code>rollup-plugin-visualizer</code> for Vite or <code>@next/bundle-analyzer</code> draw a treemap of the bundle where you immediately see that half the size is one date formatting library used in two places.</p>'
        },
        pro: {
          pl: '<p>Code splitting optymalizuje metryki startu: LCP i TBT. Rząd wielkości, który warto pamiętać - 300 kB JavaScriptu po gzipie to około 1,5-2 s samego parsowania i wykonania na średniej klasy telefonie z Androidem, zanim cokolwiek się wydarzy. Dlatego budżet dla shella zwykle ustawia się w okolicach 150-200 kB.</p>' +
            '<h4>Wzorce, których używasz w praktyce</h4>' +
            '<pre><code>// 1. Trasa jako granica (React Router)\nconst routes = [{\n  path: "/reports",\n  lazy: async () =&gt; ({ Component: (await import("./Reports")).default })\n}]\n\n// 2. Prefetch na hover - kliknięcie jest już natychmiastowe\nconst load = () =&gt; import("./Editor")\n&lt;Link to="/editor" onMouseEnter={load} onFocus={load}&gt;Editor&lt;/Link&gt;\n\n// 3. Import warunkowy zamiast leniwego komponentu\nasync function exportPdf(doc) {\n  const { jsPDF } = await import("jspdf")\n  return new jsPDF().text(doc.title, 10, 10).save()\n}</code></pre>' +
            '<p>Wzorzec drugi to dokładnie to, co Next.js robi automatycznie dla <code>next/link</code> w widoku, a Nuxt dla <code>NuxtLink</code>. Jeśli zostajesz na czystym SPA, dopisz go sam - to kilkanaście linijek, a odczuwalna różnica jest duża.</p>' +
            '<h4>Pułapki</h4>' +
            '<ul>' +
            '<li><strong>Wodospad chunków</strong> - leniwy komponent, który dopiero po zamontowaniu zaczyna pobierać dane, daje dwie serie oczekiwania. Startuj fetch danych równolegle z importem (loader trasy albo prefetch w TanStack Query).</li>' +
            '<li><strong>Przesuwanie układu</strong> - fallback o innej wysokości niż docelowa treść psuje CLS. Fallback ma być szkieletem o tych samych wymiarach, nie spinnerem pośrodku.</li>' +
            '<li><strong>Stary chunk po deployu</strong> - użytkownik z otwartą kartą prosi o plik z poprzedniego builda i dostaje 404. Obsłuż błąd importu i zaproponuj przeładowanie; w Next.js działa to poprzez granicę błędu wokół trasy.</li>' +
            '<li><strong>Fallback przy nawigacji</strong> - <code>startTransition</code> pozwala pokazać stary ekran zamiast fallbacku, dopóki nowa trasa się ładuje; bez tego każde kliknięcie miga szkieletem.</li>' +
            '<li><strong>Duplikacja zależności</strong> - biblioteka użyta w trzech chunkach zostanie wciągnięta trzy razy, chyba że bundler wydzieli ją do wspólnego chunku. Sprawdź to w analizatorze, nie w założeniach.</li>' +
            '</ul>' +
            '<p>Warto też pamiętać, że <code>Suspense</code> w Reactie jest ogólniejszym mechanizmem niż w Vue: obsługuje nie tylko leniwe komponenty, ale również pobieranie danych w React Server Components i strumieniowanie HTML z serwera. To ten sam prymityw, którego w Vue używalibyście przez <code>&lt;Suspense&gt;</code> z async setup - z tą różnicą, że w Reactie jest to stabilna, powszechnie używana część architektury, a nie funkcja eksperymentalna.</p>' +
            '<p>Na koniec zdrowa kolejność działań: najpierw usuń to, czego nie potrzebujesz (moment.js, duplikaty lodash, cała biblioteka ikon), potem podziel po trasach, potem dodaj prefetch, a dopiero na końcu dziel na drobniejsze kawałki. Analizator bundla przed i po - inaczej optymalizujesz na wyczucie.</p>',
          en: '<p>Code splitting optimizes startup metrics: LCP and TBT. A useful order of magnitude - 300 kB of gzipped JavaScript is roughly 1.5-2 s of parse and execute on a mid-range Android phone before anything happens. That is why the shell budget usually lands around 150-200 kB.</p>' +
            '<h4>Patterns you actually use</h4>' +
            '<pre><code>// 1. Route as the boundary (React Router)\nconst routes = [{\n  path: "/reports",\n  lazy: async () =&gt; ({ Component: (await import("./Reports")).default })\n}]\n\n// 2. Prefetch on hover - the click is already instant\nconst load = () =&gt; import("./Editor")\n&lt;Link to="/editor" onMouseEnter={load} onFocus={load}&gt;Editor&lt;/Link&gt;\n\n// 3. Conditional import instead of a lazy component\nasync function exportPdf(doc) {\n  const { jsPDF } = await import("jspdf")\n  return new jsPDF().text(doc.title, 10, 10).save()\n}</code></pre>' +
            '<p>Pattern two is exactly what Next.js does automatically for a <code>next/link</code> in the viewport, and Nuxt for <code>NuxtLink</code>. If you stay on a plain SPA, write it yourself - it is a dozen lines and the perceived difference is large.</p>' +
            '<h4>Pitfalls</h4>' +
            '<ul>' +
            '<li><strong>Chunk waterfalls</strong> - a lazy component that only starts fetching data after it mounts produces two rounds of waiting. Start the data fetch in parallel with the import (a route loader or a TanStack Query prefetch).</li>' +
            '<li><strong>Layout shift</strong> - a fallback of a different height than the real content wrecks CLS. The fallback should be a skeleton with the same dimensions, not a centered spinner.</li>' +
            '<li><strong>Stale chunks after deploy</strong> - a user with an open tab requests a file from the previous build and gets a 404. Handle the import failure and offer a reload; in Next.js this runs through an error boundary around the route.</li>' +
            '<li><strong>Fallback during navigation</strong> - <code>startTransition</code> keeps the old screen visible instead of the fallback while the new route loads; without it every click flashes a skeleton.</li>' +
            '<li><strong>Duplicated dependencies</strong> - a library used by three chunks gets pulled in three times unless the bundler hoists it into a shared chunk. Verify that in the analyzer, not in your assumptions.</li>' +
            '</ul>' +
            '<p>Worth noting: <code>Suspense</code> in React is a broader mechanism than in Vue. It covers not only lazy components but also data fetching in React Server Components and HTML streaming from the server. It is the same primitive you would reach for in Vue via <code>&lt;Suspense&gt;</code> with async setup - except in React it is a stable, widely used part of the architecture rather than an experimental feature.</p>' +
            '<p>Finally, a healthy order of operations: first delete what you do not need (moment.js, duplicated lodash, an entire icon library), then split by route, then add prefetching, and only then cut finer. Run the bundle analyzer before and after - otherwise you are optimizing by feel.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co tworzy osobny chunk w bundlerze?',
            en: 'What creates a separate chunk in a bundler?'
          },
          options: [
            { pl: 'Każdy plik komponentu', en: 'Every component file' },
            { pl: 'Wywołanie dynamicznego import()', en: 'A dynamic import() call' },
            { pl: 'Użycie Suspense', en: 'Using Suspense' },
            { pl: 'Eksport domyślny', en: 'A default export' }
          ],
          correct: 1,
          explain: {
            pl: 'lazy i defineAsyncComponent to tylko opakowania nad dynamicznym importem - to on jest granica podziału widoczna dla bundlera.',
            en: 'lazy and defineAsyncComponent are only wrappers over a dynamic import - the import is the split point the bundler sees.'
          }
        },
        {
          q: {
            pl: 'Czym różni się obsługa stanu ładowania w React lazy od defineAsyncComponent w Vue?',
            en: 'How does the loading state differ between React lazy and Vue defineAsyncComponent?'
          },
          options: [
            { pl: 'React nie obsługuje stanu ładowania w ogóle', en: 'React has no loading state at all' },
            { pl: 'Vue ładuje synchronicznie, React asynchronicznie', en: 'Vue loads synchronously, React asynchronously' },
            { pl: 'W Vue spinner konfigurujesz w komponencie, w Reactie deklarujesz go wyżej jako fallback granicy Suspense', en: 'In Vue the spinner is configured on the component, in React it is declared above as a Suspense boundary fallback' },
            { pl: 'React wymaga osobnego chunku na każdy spinner', en: 'React requires a separate chunk for each spinner' }
          ],
          correct: 2,
          explain: {
            pl: 'Przeniesienie fallbacku wyżej pozwala jednej granicy obsłużyć kilka leniwych elementów naraz i pokazać jeden szkielet.',
            en: 'Hoisting the fallback lets one boundary cover several lazy elements at once and show a single skeleton.'
          }
        },
        {
          q: {
            pl: 'Które cięcie da zwykle największy zysk przy najmniejszym nakładzie?',
            en: 'Which split usually gives the biggest win for the least effort?'
          },
          options: [
            { pl: 'Podział po trasach', en: 'Splitting by route' },
            { pl: 'Osobny chunk dla każdego przycisku', en: 'A separate chunk for every button' },
            { pl: 'Podział plików CSS', en: 'Splitting the CSS files' },
            { pl: 'Przeniesienie typów TypeScript do osobnego pakietu', en: 'Moving TypeScript types into a separate package' }
          ],
          correct: 0,
          explain: {
            pl: 'Trasa to naturalna granica: użytkownik i tak jest w danej chwili tylko na jednej, a przejście między nimi ma już zaakceptowany kontekst ładowania.',
            en: 'A route is a natural boundary: the user is only on one at a time, and navigating already carries an accepted loading context.'
          }
        },
        {
          q: {
            pl: 'Po wdrożeniu code splittingu nawigacja miga szkieletem przy każdym kliknięciu, mimo że chunki są małe. Co pomoże najbardziej?',
            en: 'After adding code splitting, navigation flashes a skeleton on every click even though the chunks are small. What helps most?'
          },
          options: [
            { pl: 'Zwiększyć rozmiar chunków, łącząc trasy', en: 'Increase chunk size by merging routes back together' },
            { pl: 'Prefetch na hover plus startTransition, żeby stary ekran został do czasu załadowania', en: 'Prefetch on hover plus startTransition so the old screen stays until the new one is ready' },
            { pl: 'Zastąpić Suspense ręcznym useState z flagą loading', en: 'Replace Suspense with a manual useState loading flag' },
            { pl: 'Wyłączyć cache HTTP dla chunków', en: 'Disable HTTP caching for chunks' }
          ],
          correct: 1,
          explain: {
            pl: 'Problemem nie jest rozmiar, tylko moment: prefetch usuwa oczekiwanie jeszcze przed kliknięciem, a startTransition sprawia, że React nie zastępuje widocznej treści fallbackiem.',
            en: 'The problem is timing rather than size: prefetching removes the wait before the click, and startTransition stops React from replacing visible content with a fallback.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'testing-library-vs-vue-test-utils',
      title: {
        pl: 'Testing Library kontra Vue Test Utils',
        en: 'Testing Library versus Vue Test Utils'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Hierarchia zapytań', en: 'Query hierarchy' },
          def: { pl: 'Kolejność wyboru selektora: <code>getByRole</code> z dostępną nazwą, potem <code>getByLabelText</code>, potem <code>getByText</code>, a <code>getByTestId</code> na końcu. Test, którego nie da się napisać po roli, zwykle wskazuje realny problem z dostępnością.', en: 'The selector order: <code>getByRole</code> with an accessible name, then <code>getByLabelText</code>, then <code>getByText</code>, with <code>getByTestId</code> last. A test you cannot write by role usually points at a genuine accessibility problem.' }
        },
        {
          term: { pl: 'userEvent', en: 'userEvent' },
          def: { pl: 'Symulacja pełnej sekwencji interakcji (pointerdown, focus, keydown, input) zamiast pojedynczego syntetycznego zdarzenia z <code>fireEvent</code>. Łapie błędy, których kliknięcie nie dotyka.', en: 'Replays the whole interaction sequence (pointerdown, focus, keydown, input) instead of the single synthetic event <code>fireEvent</code> dispatches. It catches bugs a plain click never touches.' }
        },
        {
          term: { pl: 'findBy* i waitFor', en: 'findBy* and waitFor' },
          def: { pl: 'Asynchroniczne oczekiwanie na wynik. React nie ma jednego deterministycznego ticka jak <code>nextTick()</code> - czekasz na efekt, nie na cykl.', en: 'Asynchronous waiting for a result. React has no single deterministic tick like <code>nextTick()</code> - you wait for an outcome, not for a cycle.' }
        },
        {
          term: { pl: 'act()', en: 'act()' },
          def: { pl: 'Opakowanie gwarantujące, że aktualizacje stanu zostaną przetworzone przed asercją. Ostrzeżenie "not wrapped in act" prawie zawsze oznacza brakujący <code>await</code> albo niewyczyszczony timer.', en: 'A wrapper guaranteeing state updates are flushed before your assertion. The "not wrapped in act" warning almost always means a missing <code>await</code> or an uncleaned timer.' }
        },
        {
          term: { pl: 'MSW', en: 'MSW' },
          def: { pl: 'Mock Service Worker - mockowanie na poziomie sieci, nie modułu. Te same handlery działają w projekcie Vue i Reactowym oraz w Playwrighcie.', en: 'Mock Service Worker - mocking at the network level rather than the module level. The same handlers work in a Vue project, a React one and in Playwright.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="30" y="30" width="250" height="120" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Vue Test Utils</text>' +
          '<text x="155" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">wrapper.vm, setData</text>' +
          '<text x="155" y="106" text-anchor="middle" font-size="13" fill="var(--muted)">emitted(), findComponent</text>' +
          '<text x="155" y="130" text-anchor="middle" font-size="13" fill="var(--warn)">couples to internals</text>' +
          '<rect x="360" y="30" width="250" height="120" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Testing Library</text>' +
          '<text x="485" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">getByRole, getByLabelText</text>' +
          '<text x="485" y="106" text-anchor="middle" font-size="13" fill="var(--muted)">userEvent.click</text>' +
          '<text x="485" y="130" text-anchor="middle" font-size="13" fill="var(--ok)">couples to behaviour</text>' +
          '<line x1="280" y1="90" x2="355" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#p5a)"/>' +
          '<text x="320" y="200" text-anchor="middle" font-size="15" fill="var(--muted)">same runner, same queries, both frameworks</text>' +
          '<rect x="60" y="220" width="150" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="135" y="248" text-anchor="middle" font-size="14" fill="var(--text)">Vitest</text>' +
          '<text x="135" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">runner</text>' +
          '<rect x="245" y="220" width="150" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="248" text-anchor="middle" font-size="14" fill="var(--text)">jsdom</text>' +
          '<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">fake DOM</text>' +
          '<rect x="430" y="220" width="150" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="505" y="248" text-anchor="middle" font-size="14" fill="var(--text)">MSW</text>' +
          '<text x="505" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">network mocks</text>' +
          '<rect x="60" y="310" width="520" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="338" text-anchor="middle" font-size="15" fill="var(--text)">Playwright component tests for the real browser</text>' +
          '<text x="320" y="360" text-anchor="middle" font-size="13" fill="var(--muted)">when layout, focus or scrolling actually matter</text>' +
          '</svg>',
        caption: {
          pl: 'Stos testowy jest niemal identyczny w obu światach - zmienia się tylko biblioteka renderująca i to, czy sięgasz do wnętrza komponentu, czy tylko do tego, co widzi użytkownik.',
          en: 'The testing stack is nearly identical in both worlds - only the render library changes, and whether you reach into component internals or stay with what the user can see.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Są dwa sposoby sprawdzenia, czy ekspres do kawy działa. Pierwszy: rozkręcić obudowę i zmierzyć napięcie na każdym kabelku. Drugi: wcisnąć przycisk i zobaczyć, czy do kubka leci kawa.</p>' +
            '<p>Drugi sposób jest lepszy, bo nie obchodzi go, jak ekspres jest zbudowany w środku. Możesz wymienić pół mechanizmu, a test nadal będzie miał sens - sprawdza to, czego oczekuje człowiek, a nie to, jak inżynier ułożył kable.</p>' +
            '<p>Testowanie komponentów działa tak samo. Zamiast pytać "czy zmienna isOpen ma wartość true", pytasz "czy widzę na ekranie okno z tekstem Zapisz". Kiedy potem przepiszesz komponent, test przeżyje. Testy, które rozkręcają obudowę, psują się przy każdym remoncie - i to one sprawiają, że ludzie zaczynają nienawidzić testów.</p>',
          en: '<p>There are two ways to check whether a coffee machine works. One: unscrew the case and measure the voltage on every wire. Two: press the button and see whether coffee comes out.</p>' +
            '<p>The second way is better because it does not care how the machine is built inside. You can replace half the mechanism and the test still makes sense - it checks what a human expects rather than how an engineer routed the wiring.</p>' +
            '<p>Component testing works the same way. Instead of asking "is the isOpen variable true", you ask "can I see a dialog with the text Save on screen". When you later rewrite the component, the test survives. Tests that unscrew the case break during every renovation - and those are the tests that make people start hating testing.</p>'
        },
        school: {
          pl: '<p>Vue Test Utils daje ci <code>wrapper</code>, czyli uchwyt do instancji komponentu. Możesz przez niego czytać <code>vm</code>, ustawiać dane przez <code>setData</code>, sprawdzać <code>emitted()</code> i wyszukiwać po <code>findComponent</code>. To wygodne, ale wiąże test z budową komponentu.</p>' +
            '<p>React Testing Library takiego uchwytu nie ma i to jest celowe. Dostajesz zamontowany DOM i zapytania takie, jakich użyłby użytkownik lub czytnik ekranu.</p>' +
            '<pre><code>// Vue Test Utils\nconst wrapper = mount(Counter)\nawait wrapper.find("button").trigger("click")\nexpect(wrapper.vm.count).toBe(1)\n\n// React Testing Library\nrender(&lt;Counter /&gt;)\nawait userEvent.click(screen.getByRole("button", { name: /add/i }))\nexpect(screen.getByText("1")).toBeInTheDocument()</code></pre>' +
            '<p>W Vue robiłeś X: sprawdzałeś stan wewnętrzny, bo był pod ręką. W Reactie robisz Y: sprawdzasz to, co pojawiło się na ekranie, bo stanu w hooku po prostu nie da się odczytać z zewnątrz. Powód Z: to ograniczenie okazało się zaleta - test przeżywa refaktor z useState na useReducer albo na store, bo nie wie, jak komponent jest zbudowany w środku.</p>' +
            '<h4>Ta sama filozofia w Vue</h4>' +
            '<p>Istnieje <code>@testing-library/vue</code>, które daje dokładnie te same zapytania dla komponentów Vue. Jeśli piszesz tak już dzisiaj, przesiadka na React kosztuje cię jedną linijkę: <code>render(&lt;Counter /&gt;)</code> zamiast <code>render(Counter)</code>. Reszta pliku testowego wygląda identycznie, łącznie z <code>screen</code>, <code>userEvent</code> i <code>waitFor</code>.</p>' +
            '<p>Runner też zostaje ten sam. Vitest, jsdom, snapshoty, coverage - konfiguracja różni się jedną wtyczką: <code>@vitejs/plugin-react</code> zamiast <code>@vitejs/plugin-vue</code>.</p>',
          en: '<p>Vue Test Utils hands you a <code>wrapper</code>, a handle on the component instance. Through it you read <code>vm</code>, set data with <code>setData</code>, inspect <code>emitted()</code> and search with <code>findComponent</code>. Convenient, but it ties the test to how the component is built.</p>' +
            '<p>React Testing Library gives you no such handle, and that is deliberate. You get a mounted DOM and queries shaped the way a user or a screen reader would look at it.</p>' +
            '<pre><code>// Vue Test Utils\nconst wrapper = mount(Counter)\nawait wrapper.find("button").trigger("click")\nexpect(wrapper.vm.count).toBe(1)\n\n// React Testing Library\nrender(&lt;Counter /&gt;)\nawait userEvent.click(screen.getByRole("button", { name: /add/i }))\nexpect(screen.getByText("1")).toBeInTheDocument()</code></pre>' +
            '<p>In Vue you did X: you asserted on internal state because it was right there. In React you do Y: you assert on what appeared on screen, because hook state simply cannot be read from outside. Reason Z: that limitation turned out to be a feature - the test survives a refactor from useState to useReducer or to a store, because it never knew how the component was built.</p>' +
            '<h4>The same philosophy in Vue</h4>' +
            '<p>There is <code>@testing-library/vue</code>, which offers exactly the same queries for Vue components. If you already write tests that way, moving to React costs you one line: <code>render(&lt;Counter /&gt;)</code> instead of <code>render(Counter)</code>. The rest of the file looks identical, including <code>screen</code>, <code>userEvent</code> and <code>waitFor</code>.</p>' +
            '<p>The runner stays the same too. Vitest, jsdom, snapshots, coverage - the configuration differs by one plugin: <code>@vitejs/plugin-react</code> instead of <code>@vitejs/plugin-vue</code>.</p>'
        },
        pro: {
          pl: '<p>Zasada przewodnia Testing Library brzmi: im bardziej test przypomina sposób używania aplikacji, tym większa daje pewność. Praktycznie oznacza to hierarchie zapytań - najpierw <code>getByRole</code> z nazwą dostępną, potem <code>getByLabelText</code> dla formularzy, potem <code>getByText</code>, a <code>getByTestId</code> dopiero jako ostatnia deska ratunku. Efekt uboczny jest przyjemny: test, którego nie da się napisać przez rolę, zwykle wskazuje realny problem z dostępnością.</p>' +
            '<h4>Rzeczy, które w Reactie robi się inaczej</h4>' +
            '<ul>' +
            '<li><strong>Zdarzenia</strong> - używaj <code>userEvent</code>, nie <code>fireEvent</code>. userEvent odtwarza pełną sekwencję (pointerdown, focus, keydown, input), przez co łapie błędy, których sztuczny click nie dotknie.</li>' +
            '<li><strong>Asynchroniczność</strong> - <code>findBy*</code> i <code>waitFor</code> zamiast <code>await nextTick()</code>. React nie ma jednego, deterministycznego tiku jak Vue; ma kolejki zadań i transitions, więc czekasz na <em>rezultat</em>, a nie na cykl.</li>' +
            '<li><strong>act()</strong> - RTL owija zdarzenia w act automatycznie. Ostrzeżenie "not wrapped in act" prawie zawsze oznacza aktualizacje stanu po zakończeniu testu, czyli brakujące <code>await</code> lub niesprzątnięty timer.</li>' +
            '<li><strong>Hooki</strong> - <code>renderHook</code> z <code>@testing-library/react</code> testuje customowy hook bez komponentu, tak jak testowałeś composable, wywołując go w <code>withSetup</code>.</li>' +
            '</ul>' +
            '<pre><code>test("saves the profile", async () =&gt; {\n  const user = userEvent.setup()\n  render(&lt;ProfileForm onSave={onSave} /&gt;, { wrapper: Providers })\n\n  await user.type(screen.getByLabelText(/display name/i), "Ada")\n  await user.click(screen.getByRole("button", { name: /save/i }))\n\n  expect(await screen.findByText(/saved/i)).toBeVisible()\n  expect(onSave).toHaveBeenCalledWith({ displayName: "Ada" })\n})</code></pre>' +
            '<p>Zwróć uwagę na opcje <code>wrapper</code>. W Vue montowałeś z <code>global.plugins</code>, podając router, Pinię i i18n. W Reactie opakowujesz komponent w te same providery jako drzewo JSX - to ta sama idea, inna składnia. Warto mieć własne <code>renderWithProviders</code> i eksportować je zamiast surowego <code>render</code>.</p>' +
            '<h4>Sensowna piramida</h4>' +
            '<p>Testy jednostkowe czystych funkcji i hooków są tanie i szybkie. Testy komponentów w jsdom to trzon - zwykle 60-70 procent zestawu, kilkaset milisekund na plik. Sieciowe zależności mockuj przez <strong>MSW</strong>, nie przez podmienianie <code>fetch</code>; ten sam handler zadziałał ci w Vue i zadziała tu, bo operuje na poziomie sieci, a nie modułu. Na końcu kilkadziesiąt scenariuszy end-to-end w Playwright plus testy komponentowe Playwrighta dla tych przypadków, w których jsdom kłamie: prawdziwy layout, focus trap, przewijanie, IntersectionObserver.</p>' +
            '<p>Czego unikać: snapshotów całych drzew (nikt ich nie czyta, wszyscy je zatwierdzają w ciemno), asercji na klasach CSS, testów, które wołają setter stanu zamiast klikać. Jeśli test wie, że komponent używa useReducer, przetrwa refaktor tylko przypadkiem.</p>',
          en: '<p>The guiding rule of Testing Library: the more your test resembles the way the software is used, the more confidence it gives. In practice that means a query hierarchy - <code>getByRole</code> with an accessible name first, then <code>getByLabelText</code> for forms, then <code>getByText</code>, with <code>getByTestId</code> as the last resort. A pleasant side effect: a test you cannot write by role usually points at a genuine accessibility problem.</p>' +
            '<h4>Things done differently in React</h4>' +
            '<ul>' +
            '<li><strong>Events</strong> - use <code>userEvent</code>, not <code>fireEvent</code>. userEvent replays the whole sequence (pointerdown, focus, keydown, input) and therefore catches bugs a synthetic click never touches.</li>' +
            '<li><strong>Async</strong> - <code>findBy*</code> and <code>waitFor</code> instead of <code>await nextTick()</code>. React has no single deterministic tick like Vue; it has task queues and transitions, so you wait for a <em>result</em> rather than a cycle.</li>' +
            '<li><strong>act()</strong> - RTL wraps events in act for you. A "not wrapped in act" warning almost always means a state update after the test finished, that is a missing <code>await</code> or an uncleaned timer.</li>' +
            '<li><strong>Hooks</strong> - <code>renderHook</code> from <code>@testing-library/react</code> tests a custom hook without a component, just as you tested a composable by calling it inside a <code>withSetup</code> helper.</li>' +
            '</ul>' +
            '<pre><code>test("saves the profile", async () =&gt; {\n  const user = userEvent.setup()\n  render(&lt;ProfileForm onSave={onSave} /&gt;, { wrapper: Providers })\n\n  await user.type(screen.getByLabelText(/display name/i), "Ada")\n  await user.click(screen.getByRole("button", { name: /save/i }))\n\n  expect(await screen.findByText(/saved/i)).toBeVisible()\n  expect(onSave).toHaveBeenCalledWith({ displayName: "Ada" })\n})</code></pre>' +
            '<p>Note the <code>wrapper</code> option. In Vue you mounted with <code>global.plugins</code>, passing the router, Pinia and i18n. In React you wrap the component in those same providers as a JSX tree - same idea, different syntax. Keep your own <code>renderWithProviders</code> and export it instead of the raw <code>render</code>.</p>' +
            '<h4>A sensible pyramid</h4>' +
            '<p>Unit tests of pure functions and hooks are cheap and fast. Component tests in jsdom are the core - usually 60-70 percent of the suite at a few hundred milliseconds per file. Mock network dependencies with <strong>MSW</strong> rather than by replacing <code>fetch</code>; the handler that worked in your Vue project works here, because it operates at the network level rather than the module level. Then a few dozen end-to-end scenarios in Playwright, plus Playwright component tests for the cases where jsdom lies: real layout, focus traps, scrolling, IntersectionObserver.</p>' +
            '<p>What to avoid: whole-tree snapshots (nobody reads them, everyone approves them blindly), assertions on CSS classes, and tests that call a state setter instead of clicking. If a test knows the component uses useReducer, it survives a refactor only by luck.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego React Testing Library nie daje dostępu do stanu komponentu?',
            en: 'Why does React Testing Library give no access to component state?'
          },
          options: [
            { pl: 'Bo React nie ma stanu lokalnego', en: 'Because React has no local state' },
            { pl: 'Bo to celowa decyzja: test ma sprawdzać zachowanie widoczne dla użytkownika, nie budowę komponentu', en: 'Because it is deliberate: tests should assert user-visible behaviour rather than component internals' },
            { pl: 'Bo jsdom nie potrafi odczytać hooków', en: 'Because jsdom cannot read hooks' },
            { pl: 'Bo dostęp do stanu jest płatny w wersji enterprise', en: 'Because state access is a paid enterprise feature' }
          ],
          correct: 1,
          explain: {
            pl: 'Test oparty na wyniku widocznym w DOM przeżywa refaktor implementacji, a to jest główny powód, dla którego w ogóle pisze się testy komponentów.',
            en: 'A test based on what is visible in the DOM survives an implementation refactor, which is the main reason to write component tests at all.'
          }
        },
        {
          q: {
            pl: 'Co jest odpowiednikiem await nextTick() z Vue w testach Reacta?',
            en: 'What is the React testing equivalent of await nextTick() from Vue?'
          },
          options: [
            { pl: 'await flushPromises() zawsze i wszędzie', en: 'await flushPromises() everywhere' },
            { pl: 'setTimeout z zerem', en: 'setTimeout with zero delay' },
            { pl: 'Ręczne wywołanie rerender()', en: 'Calling rerender() manually' },
            { pl: 'findBy* albo waitFor, czyli czekanie na rezultat zamiast na cykl', en: 'findBy* or waitFor - waiting for a result instead of a cycle' }
          ],
          correct: 3,
          explain: {
            pl: 'React nie ma jednego deterministycznego tiku, więc czekasz na warunek końcowy. To również czyni test odporniejszym na zmianę sposobu aktualizacji.',
            en: 'React has no single deterministic tick, so you wait for an end condition. That also makes the test resilient to changes in how updates are scheduled.'
          }
        },
        {
          q: {
            pl: 'Które zapytanie powinno być pierwszym wyborem?',
            en: 'Which query should be your first choice?'
          },
          options: [
            { pl: 'getByRole z nazwą dostępną', en: 'getByRole with an accessible name' },
            { pl: 'getByTestId', en: 'getByTestId' },
            { pl: 'container.querySelector po klasie CSS', en: 'container.querySelector by CSS class' },
            { pl: 'getByDisplayValue', en: 'getByDisplayValue' }
          ],
          correct: 0,
          explain: {
            pl: 'Role odpowiadają temu, jak element widzi użytkownik i czytnik ekranu. Jeśli nie da się znaleźć elementu po roli, zwykle brakuje mu etykiety lub semantyki.',
            en: 'Roles match how a user and a screen reader perceive the element. If you cannot find something by role, it usually lacks a label or proper semantics.'
          }
        },
        {
          q: {
            pl: 'Test przechodzi lokalnie, ale w CI rzuca ostrzeżenie "not wrapped in act". Co jest najbardziej prawdopodobna przyczyna?',
            en: 'A test passes locally but warns "not wrapped in act" in CI. What is the most likely cause?'
          },
          options: [
            { pl: 'Brakuje wywołania act wokół render', en: 'A missing act call around render' },
            { pl: 'jsdom jest w złej wersji', en: 'jsdom is on the wrong version' },
            { pl: 'Stan aktualizuje się po zakończeniu testu - brak await na asercji asynchronicznej albo niesprzątnięty timer', en: 'State updates after the test finished - a missing await on an async assertion, or an uncleaned timer' },
            { pl: 'Użyto userEvent zamiast fireEvent', en: 'userEvent was used instead of fireEvent' }
          ],
          correct: 2,
          explain: {
            pl: 'RTL owija zdarzenia w act samo, więc ostrzeżenie prawie zawsze wskazuje na wyciekającą asynchroniczność: nieoczekiwane zapytanie, timer albo subskrypcje bez czyszczenia. Dodawanie ręcznego act tylko zakłada plaster na objaw.',
            en: 'RTL wraps events in act for you, so the warning almost always points at leaking asynchrony: an unawaited request, a timer, or a subscription without cleanup. Adding manual act only bandages the symptom.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 6
    {
      id: 'vue-to-react-cheatsheet',
      title: {
        pl: 'Ściąga migracyjna Vue -> React',
        en: 'The Vue-to-React migration cheatsheet'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Strangler fig', en: 'Strangler fig' },
          def: { pl: 'Migracja przez współistnienie: reverse proxy kieruje wybrane ścieżki do nowej aplikacji, a stara działa dalej. Najbezpieczniejsza strategia, kosztem podwojonego bundla na granicy.', en: 'Migration by coexistence: a reverse proxy routes selected paths to the new app while the old one keeps running. The safest strategy, at the cost of a doubled bundle at the boundary.' }
        },
        {
          term: { pl: 'Web components jako most', en: 'Web components as a bridge' },
          def: { pl: 'Komponenty design systemu opakowane w custom elements działają w obu światach. Uwaga na propsy obiektowe i zdarzenia - atrybuty przenoszą wyłącznie stringi.', en: 'Design system components wrapped as custom elements work in both worlds. Watch out for object props and events - attributes carry strings only.' }
        },
        {
          term: { pl: 'Warstwa domenowa', en: 'Framework-agnostic domain layer' },
          def: { pl: 'Walidacja zod, klienci API i formatowanie wyciągnięte do pakietu niezależnego od frameworka. Zwykle 30-40 procent kodu, który przenosi się bez zmian.', en: 'Zod validation, API clients and formatting extracted into a framework-agnostic package. Typically 30-40 percent of the code, and it moves unchanged.' }
        },
        {
          term: { pl: 'Kontrakt value/onChange', en: 'The value/onChange contract' },
          def: { pl: 'Reactowy odpowiednik <code>v-model</code>: zamiast dwukierunkowego wiązania przekazujesz jawnie <code>value</code> i <code>onChange</code>.', en: 'The React equivalent of <code>v-model</code>: instead of two-way binding you pass <code>value</code> and <code>onChange</code> explicitly.' }
        },
        {
          term: { pl: 'Stale closure', en: 'Stale closure' },
          def: { pl: 'Funkcja pamięta wartości z renderu, który ją stworzył. W Vue problem nie istniał, bo czytałeś przez proxy. Lekarstwo: forma updater, <code>useRef</code> i uczciwe tablice zależności.', en: 'A function remembers the values from the render that created it. In Vue this did not exist, because you read through a proxy. The cure: the updater form, <code>useRef</code> and honest dependency arrays.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent2)"/></marker></defs>' +
          '<text x="150" y="30" text-anchor="middle" font-size="16" fill="var(--text)">Vue 3</text>' +
          '<text x="490" y="30" text-anchor="middle" font-size="16" fill="var(--text)">React 19</text>' +
          '<rect x="30" y="48" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="75" text-anchor="middle" font-size="14" fill="var(--text)">ref / reactive</text>' +
          '<rect x="370" y="48" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="75" text-anchor="middle" font-size="14" fill="var(--text)">useState / useReducer</text>' +
          '<line x1="272" y1="69" x2="366" y2="69" stroke="var(--accent2)" stroke-width="2" marker-end="url(#p6a)"/>' +
          '<rect x="30" y="106" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="133" text-anchor="middle" font-size="14" fill="var(--text)">computed</text>' +
          '<rect x="370" y="106" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="133" text-anchor="middle" font-size="14" fill="var(--text)">plain expression / useMemo</text>' +
          '<line x1="272" y1="127" x2="366" y2="127" stroke="var(--accent2)" stroke-width="2" marker-end="url(#p6a)"/>' +
          '<rect x="30" y="164" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="191" text-anchor="middle" font-size="14" fill="var(--text)">watch / watchEffect</text>' +
          '<rect x="370" y="164" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="191" text-anchor="middle" font-size="14" fill="var(--text)">useEffect (sync only)</text>' +
          '<line x1="272" y1="185" x2="366" y2="185" stroke="var(--accent2)" stroke-width="2" marker-end="url(#p6a)"/>' +
          '<rect x="30" y="222" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="249" text-anchor="middle" font-size="14" fill="var(--text)">slots / scoped slots</text>' +
          '<rect x="370" y="222" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="249" text-anchor="middle" font-size="14" fill="var(--text)">children / render props</text>' +
          '<line x1="272" y1="243" x2="366" y2="243" stroke="var(--accent2)" stroke-width="2" marker-end="url(#p6a)"/>' +
          '<rect x="30" y="280" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="307" text-anchor="middle" font-size="14" fill="var(--text)">Pinia</text>' +
          '<rect x="370" y="280" width="240" height="42" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="307" text-anchor="middle" font-size="14" fill="var(--text)">Zustand + TanStack Query</text>' +
          '<line x1="272" y1="301" x2="366" y2="301" stroke="var(--accent2)" stroke-width="2" marker-end="url(#p6a)"/>' +
          '<rect x="30" y="352" width="580" height="68" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="380" text-anchor="middle" font-size="15" fill="var(--text)">No 1:1 mapping: v-model, provide/inject depth, v-memo</text>' +
          '<text x="320" y="404" text-anchor="middle" font-size="13" fill="var(--muted)">immutability replaces mutation as the update contract</text>' +
          '</svg>',
        caption: {
          pl: 'Mapa pojęć: większość rzeczy ma bezpośredni odpowiednik, ale kilka trzeba przemyśleć od nowa - zwłaszcza niemutowalność i v-model.',
          en: 'The concept map: most things map directly, but a few must be rethought - immutability and v-model above all.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>To trochę tak jak przesiadka z auta z automatem na auto z manualem. Jedziesz w to samo miejsce, znasz zasady ruchu, umiesz parkować. Zmienia się to, ile decyzji podejmujesz sam.</p>' +
            '<p>Vue dużo robiło za ciebie w tle: pilnowało, co się zmieniło, i odświeżało dokładnie to jedno miejsce. React mówi: powiedz mi wprost, kiedy coś jest nowe, a ja przerysuje ten fragment ekranu od początku.</p>' +
            '<p>Dlatego przy przesiadce najważniejsze nie jest nauczenie się nowych nazw. Najważniejsze jest jedno przyzwyczajenie: nie zmieniaj starego obiektu, tylko zrób nowy. Reszta - inne słowa na to samo - wchodzi w kilka dni. To nawyk zajmuje kilka tygodni, bo palce pamiętają starą drogę.</p>',
          en: '<p>It is a bit like moving from an automatic car to a manual one. Same destination, same traffic rules, you still know how to park. What changes is how many decisions you make yourself.</p>' +
            '<p>Vue did a lot in the background: it tracked what changed and refreshed exactly that one spot. React says: tell me explicitly when something is new and I will redraw that piece of the screen from scratch.</p>' +
            '<p>So the important part of switching is not learning new names. It is one habit: do not change the old object, make a new one. The rest - different words for the same thing - lands within days. The habit takes weeks, because your fingers remember the old route.</p>'
        },
        school: {
          pl: '<p>Zacznijmy od tabeli, która warto mieć przypięta nad biurkiem.</p>' +
            '<table>' +
            '<tr><th>Vue 3</th><th>React 19</th></tr>' +
            '<tr><td>ref, reactive</td><td>useState, useReducer</td></tr>' +
            '<tr><td>computed</td><td>zwykle wyrażenie, useMemo gdy drogie</td></tr>' +
            '<tr><td>watch, watchEffect</td><td>useEffect - tylko do synchronizacji z zewnętrznym światem</td></tr>' +
            '<tr><td>props + emit</td><td>props + funkcje w propsach (onChange)</td></tr>' +
            '<tr><td>v-model</td><td>value + onChange (kontrolowane pole)</td></tr>' +
            '<tr><td>slots, scoped slots</td><td>children, props typu ReactNode, render props</td></tr>' +
            '<tr><td>provide / inject</td><td>Context</td></tr>' +
            '<tr><td>composables</td><td>custom hooks</td></tr>' +
            '<tr><td>Pinia</td><td>Zustand (klient) + TanStack Query (serwer)</td></tr>' +
            '<tr><td>Vue Router, Nuxt</td><td>React Router, Next.js</td></tr>' +
            '</table>' +
            '<p>Największy próg to nie tabela, tylko sposób aktualizacji.</p>' +
            '<pre><code>// Vue: mutujesz, proxy zauważy\nstate.user.name = "Ada"\nstate.items.push(item)\n\n// React: tworzysz nową referencję\nsetUser(u =&gt; ({ ...u, name: "Ada" }))\nsetItems(items =&gt; [...items, item])</code></pre>' +
            '<p>W Vue robiłeś X, czyli mutowałeś obiekt, bo proxy przechwytywało zapis. W Reactie robisz Y, czyli zwracasz nową wartość. Powód Z jest prosty: React nie obserwuje twoich obiektów, tylko porównuje referencję z poprzedniego renderu, więc mutacja jest dla niego niewidoczna i ekran po prostu się nie odświeży.</p>' +
            '<p>Druga pułapka to <code>useEffect</code>. To nie jest <code>watch</code>. Jeśli piszesz efekt tylko po to, żeby przeliczyć jedną wartość z drugiej, prawie zawsze wystarczy zwykle wyrażenie w ciele komponentu. Efekt zostaw dla rzeczy spoza Reacta: subskrypcji, timerów, integracji z biblioteką, która sama trzyma stan.</p>' +
            '<p>Trzecia rzecz to sposób czytania kodu. W SFC szukałeś trzech bloków: template, script, style. W Reactie komponent jest jedna funkcja, która zwraca JSX, a style siedza obok jako CSS Modules albo klasy narzędziowe. Po tygodniu ta jednorodność zaczyna być wygodna: cały komponent czytasz od góry do dołu, bez skakania między sekcjami.</p>',
          en: '<p>Start with the table worth pinning above your desk.</p>' +
            '<table>' +
            '<tr><th>Vue 3</th><th>React 19</th></tr>' +
            '<tr><td>ref, reactive</td><td>useState, useReducer</td></tr>' +
            '<tr><td>computed</td><td>a plain expression, useMemo when expensive</td></tr>' +
            '<tr><td>watch, watchEffect</td><td>useEffect - only to sync with the outside world</td></tr>' +
            '<tr><td>props + emit</td><td>props + function props (onChange)</td></tr>' +
            '<tr><td>v-model</td><td>value + onChange (a controlled input)</td></tr>' +
            '<tr><td>slots, scoped slots</td><td>children, ReactNode props, render props</td></tr>' +
            '<tr><td>provide / inject</td><td>Context</td></tr>' +
            '<tr><td>composables</td><td>custom hooks</td></tr>' +
            '<tr><td>Pinia</td><td>Zustand (client) + TanStack Query (server)</td></tr>' +
            '<tr><td>Vue Router, Nuxt</td><td>React Router, Next.js</td></tr>' +
            '</table>' +
            '<p>The real hurdle is not the table, it is how updates happen.</p>' +
            '<pre><code>// Vue: mutate, the proxy notices\nstate.user.name = "Ada"\nstate.items.push(item)\n\n// React: create a new reference\nsetUser(u =&gt; ({ ...u, name: "Ada" }))\nsetItems(items =&gt; [...items, item])</code></pre>' +
            '<p>In Vue you did X - you mutated the object, because the proxy intercepted the write. In React you do Y - you return a new value. Reason Z is simple: React does not observe your objects, it compares references against the previous render, so a mutation is invisible to it and the screen simply does not update.</p>' +
            '<p>The second trap is <code>useEffect</code>. It is not <code>watch</code>. If you are writing an effect purely to derive one value from another, a plain expression in the component body is almost always enough.</p>'
        },
        pro: {
          pl: '<p>Migracja całego produktu rzadko wygląda jak przepisanie. Wygląda jak współistnienie: nowe ekrany w Reactie, stare w Vue, wspólna warstwa danych i wspólne tokeny designu.</p>' +
            '<h4>Strategie</h4>' +
            '<ul>' +
            '<li><strong>Strangler fig po trasach</strong> - reverse proxy kieruje wybrane ścieżki do nowej aplikacji. Najprostsze i najbezpieczniejsze; wada to podwojony bundle na granicy.</li>' +
            '<li><strong>Web components jako most</strong> - komponenty designu opakowane w custom elements działają w obu światach. Uwaga na propsy obiektowe i zdarzenia: przez atrybuty przechodzą tylko stringi, więc potrzebujesz cienkiego wrappera z <code>ref</code>.</li>' +
            '<li><strong>Micro-frontends</strong> - Module Federation lub import maps. Wybieraj tylko wtedy, gdy granica jest również granica zespołu, inaczej kupujesz koszt operacyjny bez zysku.</li>' +
            '<li><strong>Wspólna logika</strong> - warstwę domenową (walidacja zod, klienci API, formatowanie) wyciągnij do pakietu bez zależności od frameworka jeszcze <em>przed</em> migracją. To zwykle 30-40 procent kodu i przenosi się bez zmian.</li>' +
            '</ul>' +
            '<h4>Pułapki, które kosztują najwięcej czasu</h4>' +
            '<pre><code>// v-model na komponencie -&gt; jawny kontrakt w Reactie\n// Vue\n&lt;CurrencyInput v-model="amount" /&gt;\n\n// React\n&lt;CurrencyInput value={amount} onChange={setAmount} /&gt;</code></pre>' +
            '<ul>' +
            '<li><strong>Formularze</strong> - kontrolowane pola przy każdym znaku renderują formularz. Przy dużych formularzach użyj React Hook Form (niekontrolowane pola z refami) - to najbliższy odpowiednik komfortu, który dawało vee-validate razem z v-model.</li>' +
            '<li><strong>Reguły hooków</strong> - brak warunkowych wywołań i brak pętli. W composables mogłeś wołać co chciałeś i gdzie chciałeś, bo setup wykonywał się raz.</li>' +
            '<li><strong>Stale closure</strong> - funkcja pamięta wartości z renderu, w którym powstała. W Vue nie istniało, bo czytałeś z proxy. Lekarstwo: forma funkcyjna settera, <code>useRef</code> dla wartości mutowalnych, poprawne zależności.</li>' +
            '<li><strong>Podwójne wywołanie efektów</strong> - <code>StrictMode</code> montuje, odmontowuje i montuje ponownie. To nie bug, to test, czy sprzątasz po sobie.</li>' +
            '<li><strong>Style</strong> - <code>scoped</code> z SFC nie ma odpowiednika w rdzeniu Reacta. Użyj CSS Modules (najbliższe), Tailwinda albo istniejących tokenów z systemu designu.</li>' +
            '</ul>' +
            '<h4>Plan na pierwsze tygodnie</h4>' +
            '<ol>' +
            '<li>Wydziel logikę domenową do pakietu niezależnego od frameworka i przykryj ją testami.</li>' +
            '<li>Zbuduj jeden ekran w Reactie od zera - najlepiej średniej trudności, z formularzem i listą.</li>' +
            '<li>Ustal warstwę danych: TanStack Query dla stanu serwera, Zustand dla reszty. Nie odtwarzaj Pinii jeden do jednego.</li>' +
            '<li>Skonfiguruj Vitest plus Testing Library w tym samym repo, żeby oba światy raportowały do jednego CI.</li>' +
            '<li>Włącz React Compiler i wtyczkę ESLint z regułami hooków - kompilator wychwyci większość odruchów z Vue, które łamią reguły.</li>' +
            '</ol>' +
            '<p>Perspektywa na rozmowę kwalifikacyjna: seniorów z Vue ceni się za to, że rozumieją koszt reaktywności. Umiejętność powiedzenia, dlaczego React wybrał niemutowalność i ponowne wykonywanie funkcji zamiast śledzenia zależności - i co ten wybór daje w zamian (przewidywalność, concurrent rendering, server components) - jest warta więcej niż znajomość każdego hooka z osobna.</p>',
          en: '<p>Migrating a whole product rarely looks like a rewrite. It looks like coexistence: new screens in React, old ones in Vue, a shared data layer and shared design tokens.</p>' +
            '<h4>Strategies</h4>' +
            '<ul>' +
            '<li><strong>Strangler fig by route</strong> - a reverse proxy sends selected paths to the new app. Simplest and safest; the downside is a doubled bundle at the boundary.</li>' +
            '<li><strong>Web components as a bridge</strong> - design system components wrapped as custom elements work in both worlds. Watch out for object props and events: attributes only carry strings, so you need a thin wrapper using a <code>ref</code>.</li>' +
            '<li><strong>Micro-frontends</strong> - Module Federation or import maps. Pick this only when the boundary is also a team boundary, otherwise you buy operational cost without the benefit.</li>' +
            '<li><strong>Shared logic</strong> - extract the domain layer (zod validation, API clients, formatting) into a framework-agnostic package <em>before</em> the migration. It is typically 30-40 percent of the code and it moves unchanged.</li>' +
            '</ul>' +
            '<h4>The pitfalls that cost the most time</h4>' +
            '<pre><code>// v-model on a component -&gt; an explicit contract in React\n// Vue\n&lt;CurrencyInput v-model="amount" /&gt;\n\n// React\n&lt;CurrencyInput value={amount} onChange={setAmount} /&gt;</code></pre>' +
            '<ul>' +
            '<li><strong>Forms</strong> - controlled inputs re-render the form on every keystroke. For large forms use React Hook Form (uncontrolled inputs with refs) - the closest match to the comfort vee-validate plus v-model used to give you.</li>' +
            '<li><strong>Rules of hooks</strong> - no conditional calls, no loops. In composables you could call anything anywhere, because setup ran once.</li>' +
            '<li><strong>Stale closures</strong> - a function remembers the values from the render that created it. This did not exist in Vue because you read through a proxy. The cure: the updater form of setters, <code>useRef</code> for mutable values, and honest dependency arrays.</li>' +
            '<li><strong>Double-invoked effects</strong> - <code>StrictMode</code> mounts, unmounts and mounts again. Not a bug, a test of whether you clean up.</li>' +
            '<li><strong>Styles</strong> - SFC <code>scoped</code> has no core React equivalent. Use CSS Modules (the closest match), Tailwind, or the tokens your design system already exposes.</li>' +
            '</ul>' +
            '<h4>A plan for the first weeks</h4>' +
            '<ol>' +
            '<li>Extract domain logic into a framework-agnostic package and cover it with tests.</li>' +
            '<li>Build one screen in React from scratch - ideally a medium one with a form and a list.</li>' +
            '<li>Decide the data layer: TanStack Query for server state, Zustand for the rest. Do not recreate Pinia one to one.</li>' +
            '<li>Set up Vitest plus Testing Library in the same repo so both worlds report into one CI pipeline.</li>' +
            '<li>Turn on the React Compiler and the ESLint hooks plugin - the compiler catches most Vue reflexes that break the rules.</li>' +
            '</ol>' +
            '<p>An interview perspective: senior Vue developers are valued for understanding the cost of reactivity. Being able to explain why React chose immutability and re-running functions over dependency tracking - and what that choice buys (predictability, concurrent rendering, server components) - is worth more than knowing every hook by name.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co jest odpowiednikiem emit z Vue w Reactie?',
            en: 'What is the React equivalent of a Vue emit?'
          },
          options: [
            { pl: 'Funkcja przekazana jako props, na przykład onChange', en: 'A function passed as a prop, for example onChange' },
            { pl: 'dispatchEvent na elemencie DOM', en: 'dispatchEvent on the DOM element' },
            { pl: 'Kontekst z providerem zdarzeń', en: 'A context with an event provider' },
            { pl: 'useImperativeHandle', en: 'useImperativeHandle' }
          ],
          correct: 0,
          explain: {
            pl: 'React nie ma osobnego kanału zdarzeń komponentu - dane idą w dół jako propsy, a informacje w górę przekazujesz wywołując funkcję otrzymaną w propsach.',
            en: 'React has no separate component event channel - data flows down as props and you send information up by calling a function received in props.'
          }
        },
        {
          q: {
            pl: 'Dlaczego mutacja obiektu w stanie Reacta nie odświeża ekranu?',
            en: 'Why does mutating an object in React state not update the screen?'
          },
          options: [
            { pl: 'Bo React zamraża obiekty stanu', en: 'Because React freezes state objects' },
            { pl: 'Bo React porównuje referencję z poprzedniego renderu i nie obserwuje zapisów do obiektu', en: 'Because React compares references from the previous render and does not observe writes to the object' },
            { pl: 'Bo mutacja działa tylko poza StrictMode', en: 'Because mutation only works outside StrictMode' },
            { pl: 'Bo trzeba wywołać forceUpdate po każdej mutacji', en: 'Because you must call forceUpdate after each mutation' }
          ],
          correct: 1,
          explain: {
            pl: 'Vue widziało zapis dzięki proxy, React nie ma takiego przechwycenia. Dlatego kontraktem aktualizacji jest nowa referencja, a nie zmieniona zawartość.',
            en: 'Vue saw the write through a proxy; React has no such interception. That is why the update contract is a new reference rather than changed contents.'
          }
        },
        {
          q: {
            pl: 'Które stwierdzenie o useEffect w kontekście migracji jest prawdziwe?',
            en: 'Which statement about useEffect in a migration context is true?'
          },
          options: [
            { pl: 'To dokładny odpowiednik watch i tak należy go używać', en: 'It is an exact watch equivalent and should be used that way' },
            { pl: 'Uruchamia się przed renderem, więc zastępuje computed', en: 'It runs before render, so it replaces computed' },
            { pl: 'Służy do synchronizacji z zewnętrznym światem, a wartości pochodne licz zwykłym wyrażeniem', en: 'It exists to synchronize with the outside world; derive values with a plain expression instead' },
            { pl: 'Nie można go czyścić, w przeciwieństwie do watch z opcją stop', en: 'It cannot be cleaned up, unlike a watch with a stop handle' }
          ],
          correct: 2,
          explain: {
            pl: 'Efekt użyty do liczenia stanu z innego stanu daje dodatkowy render i łatwo prowadzi do niespójności. Reguły hooków i dokumentacja Reacta nazywają to wprost antywzorcem.',
            en: 'An effect used to compute state from other state causes an extra render and easily drifts out of sync. React documentation calls this out explicitly as an anti-pattern.'
          }
        },
        {
          q: {
            pl: 'Migrujesz duży produkt Vue do Reacta bez zatrzymywania rozwoju. Które podejście ma najlepszy stosunek ryzyka do efektu?',
            en: 'You are migrating a large Vue product to React without pausing feature work. Which approach has the best risk-to-reward ratio?'
          },
          options: [
            { pl: 'Przepisać całą aplikację w osobnej gałęzi i wdrożyć jednym dużym releasem', en: 'Rewrite the whole app in a branch and ship it in one big release' },
            { pl: 'Zacząć od Module Federation, żeby każdy komponent mógł być w dowolnym frameworku', en: 'Start with Module Federation so any component can live in either framework' },
            { pl: 'Wyciągnąć logikę domenową do pakietu bez frameworka i migrować trasa po trasie', en: 'Extract domain logic into a framework-agnostic package and migrate route by route' },
            { pl: 'Uruchomić React wewnątrz każdego komponentu Vue przez mikroaplikacje', en: 'Mount React inside every Vue component as a micro app' }
          ],
          correct: 2,
          explain: {
            pl: 'Wydzielenie logiki daje natychmiastowa wartość niezależnie od migracji, a granica trasy jest naturalna i odwracalna. Duży przepis i mikrofrontendy dokładają ryzyko i koszt operacyjny, który rzadko się zwraca.',
            en: 'Extracting logic pays off immediately regardless of the migration, and a route boundary is natural and reversible. A big-bang rewrite and micro-frontends add risk and operational cost that rarely pays back.'
          }
        }
      ]
    }
  ]
};
