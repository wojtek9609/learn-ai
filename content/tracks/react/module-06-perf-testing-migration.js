// Track react - Module 06 - Performance, testing and migration from Vue.
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema", v4).

export default {
  id: 'perf-testing-migration',
  order: 6,
  icon: '🚀',
  title: {
    pl: 'Wydajnosc, testy i migracja',
    en: 'Performance, testing and migration'
  },
  description: {
    pl: 'Profilowanie renderow, memoizacja i React Compiler, wirtualizacja list, code splitting, testy w Testing Library oraz kompletna sciaga migracyjna Vue -> React.',
    en: 'Render profiling, memoization and the React Compiler, list virtualization, code splitting, Testing Library, and a complete Vue-to-React migration cheatsheet.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'rerender-profiling',
      title: {
        pl: 'Profilowanie renderow',
        en: 'Profiling re-renders'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Faza render kontra commit', en: 'Render phase vs commit phase' },
          def: { pl: 'Render wykonuje funkcje komponentow i buduje elementy - jest tani. Commit mutuje DOM i uruchamia efekty layoutowe - jest drogi. Problemem sa dopiero fazy dluzsze niz jedna klatka (16 ms).', en: 'The render phase runs component functions and builds elements - it is cheap. The commit mutates the DOM and runs layout effects - it is expensive. Only phases longer than one frame (16 ms) are a real problem.' }
        },
        {
          term: { pl: 'React DevTools Profiler', en: 'React DevTools Profiler' },
          def: { pl: 'Flamegraph, wykres rankingowy i powody renderow dla kazdego commitu. Nie widzi kosztu stylowania i layoutu - do tego sluzy panel Performance w Chrome.', en: 'Flamegraph, ranked chart and render reasons for every commit. It cannot see style and layout cost - the Chrome Performance panel is for that.' }
        },
        {
          term: { pl: 'Highlight updates', en: 'Highlight updates' },
          def: { pl: 'Opcja DevTools obrysowujaca rerenderowane komponenty. Ramka wokol calej strony przy wpisywaniu jednego znaku to klasyczny objaw stanu trzymanego za wysoko.', en: 'The DevTools option that outlines re-rendered components. A border around the whole page while you type one character is the classic symptom of state held too high.' }
        },
        {
          term: { pl: 'INP', en: 'INP' },
          def: { pl: 'Interaction to Next Paint - metryka Core Web Vitals mierzaca opoznienie od interakcji do odmalowania. To ona ocenia wydajnosc w Lighthouse, a nie liczba renderow.', en: 'Interaction to Next Paint - the Core Web Vitals metric measuring the delay from interaction to paint. It is what judges you in Lighthouse, not a render count.' }
        },
        {
          term: { pl: 'Komponent Profiler', en: 'The Profiler component' },
          def: { pl: 'Programowy pomiar wybranego poddrzewa: callback <code>onRender</code> dostaje faze i czas trwania, wiec mozna raportowac je do telemetrii jak web vitals.', en: 'Programmatic measurement of a chosen subtree: the <code>onRender</code> callback receives the phase and duration, so you can report them to telemetry like web vitals.' }
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
          pl: 'W Reactie zmiana stanu uruchamia funkcje calego poddrzewa, a dopiero diff decyduje o DOM. W Vue budzi sie tylko efekt renderujacy komponentu, ktory czyta dany ref.',
          en: 'In React a state change re-runs the whole subtree of component functions and only the diff decides what touches the DOM. In Vue only the render effect that reads that ref wakes up.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Kaskada renderow krok po kroku: od setState, przez ponowne wywolanie funkcji, po jedna zmiane w DOM - i to samo zdarzenie w Vue.',
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
              pl: 'Drzewo jest wyrenderowane, zaden komponent nie liczy sie ponownie. Row pokazuje licznik trzymany w App.',
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
              pl: 'setCount nie zmienia niczego od razu - planuje render komponentu, ktory ten stan posiada, czyli App.',
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
              pl: 'React wykonuje funkcje App i wszystkich potomkow, ktore nie sa zapamietane. To zwykly JavaScript, jeszcze bez dotykania DOM.',
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
              pl: 'Diff porownuje nowe elementy ze starymi i zmienia jeden wezel tekstowy. Cztery renderowania byly zbedne - to je widzisz w Profilerze.',
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
              pl: 'Ref wie, ktory efekt renderujacy go czytal, wiec budzi tylko Row. Dlatego w Vue nie masz odpowiednika React.memo - reaktywnosc robi to za ciebie.',
              en: 'The ref knows which render effect read it, so only Row wakes up. That is why Vue has no React.memo equivalent - reactivity does that job for you.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie gazete. W Vue redaktor wie dokladnie, ktore zdanie sie zmienilo, i podmienia tylko je. W Reactie drukarz za kazdym razem sklada calu strone od nowa, porownuje ja z poprzednia i wymienia tylko te litery, ktore faktycznie sie roznia.</p>' +
            '<p>Brzmi rozrzutnie? Zwykle jest bardzo szybkie, bo skladanie strony to tylko liczenie w pamieci, a nie malowanie po ekranie. Problem zaczyna sie, gdy strona ma trzysta akapitow i kazdy z nich liczy sobie cos ciezkiego.</p>' +
            '<p>Dlatego zanim cokolwiek naprawisz, musisz <strong>zobaczyc</strong>, co sie sklada od nowa. Sluzy do tego Profiler: nagrywasz kilka sekund klikania, a on rysuje slupki - kto sie przeliczyl, ile razy i jak dlugo. Bez tego nagrania optymalizowanie jest jak naprawianie samochodu przez sluchanie: czasem trafisz, czesciej zrobisz halas i nic wiecej.</p>',
          en: '<p>Picture a newspaper. In Vue the editor knows exactly which sentence changed and swaps just that sentence. In React the typesetter lays out the entire page again, compares it with the previous page and replaces only the letters that actually differ.</p>' +
            '<p>Wasteful? Usually it is very fast, because laying out the page is just arithmetic in memory, not painting on the screen. Trouble starts when the page has three hundred paragraphs and each one computes something heavy.</p>' +
            '<p>So before you fix anything you have to <strong>see</strong> what is being laid out again. That is what the Profiler is for: you record a few seconds of clicking and it draws bars - who recomputed, how many times and for how long. Without that recording, optimizing is like fixing a car by listening to it: sometimes you get lucky, more often you just make noise.</p>'
        },
        school: {
          pl: '<p>W Vue reaktywnosc jest drobnoziarnista. Kazdy komponent ma swoj <em>render effect</em>, ktory zapamietuje, ktore refy przeczytal. Zmiana refa budzi tylko te efekty. W Reactie nie ma sledzenia zaleznosci: zmiana stanu oznacza, ze funkcja komponentu wykona sie ponownie, a wraz z nia funkcje wszystkich dzieci, ktore nie sa zapamietane.</p>' +
            '<h4>To samo zdarzenie w obu bibliotekach</h4>' +
            '<pre><code>// Vue: count.value++ budzi tylko efekt, ktory czytal count\nconst count = ref(0)\nfunction inc() { count.value++ }\n\n// React: setCount planuje render App i calego poddrzewa\nconst [count, setCount] = useState(0)\nfunction inc() { setCount(c =&gt; c + 1) }</code></pre>' +
            '<p>W Vue robiles X: nie myslales o tym, kto sie przerenderuje, bo proxy wiedzialo za ciebie. W Reactie robisz Y: zakladasz, ze przerenderuje sie cale poddrzewo, i sprawdzasz w Profilerze, czy to boli - bo React nie ma informacji o zaleznosciach, ma tylko drzewo.</p>' +
            '<h4>Jak nagrac profil</h4>' +
            '<p>Instalujesz React DevTools, przechodzisz na zakladke <strong>Profiler</strong>, wlaczasz opcje <em>Record why each component rendered</em>, klikasz nagrywanie, wykonujesz jedna konkretna interakcje i zatrzymujesz. Dostajesz flamegraph: szerokosc slupka to czas commitu, a po kliknieciu komponentu widzisz powod - <em>props changed</em>, <em>hook changed</em>, <em>parent rendered</em>.</p>' +
            '<p>Ten ostatni powod jest najciekawszy. <em>Parent rendered</em> znaczy, ze komponent przeliczyl sie bez zadnej realnej zmiany danych. Jesli takich jest kilkadziesiat i lacznie zajmuja 2 ms, zostaw je w spokoju. Jesli jeden zajmuje 80 ms, masz swoj cel. Odpowiednikiem po stronie Vue jest zakladka Performance w Vue DevTools, tylko tam zwykle szukasz zbyt szerokich computed, a nie kaskady renderow.</p>',
          en: '<p>Vue reactivity is fine-grained. Every component has its own <em>render effect</em> that records which refs it read. Changing a ref wakes only those effects. React does no dependency tracking: a state change means the component function runs again, and with it every child function that is not memoized.</p>' +
            '<h4>The same event in both libraries</h4>' +
            '<pre><code>// Vue: count.value++ wakes only the effect that read count\nconst count = ref(0)\nfunction inc() { count.value++ }\n\n// React: setCount schedules a render of App and its subtree\nconst [count, setCount] = useState(0)\nfunction inc() { setCount(c =&gt; c + 1) }</code></pre>' +
            '<p>In Vue you did X: you never thought about who re-renders, because the proxy knew for you. In React you do Y: you assume the whole subtree re-runs and you check in the Profiler whether it hurts - because React has no dependency information, only a tree.</p>' +
            '<h4>How to record a profile</h4>' +
            '<p>Install React DevTools, open the <strong>Profiler</strong> tab, enable <em>Record why each component rendered</em>, hit record, perform one specific interaction, then stop. You get a flamegraph: bar width is commit time, and clicking a component shows the reason - <em>props changed</em>, <em>hook changed</em>, <em>parent rendered</em>.</p>' +
            '<p>That last reason is the interesting one. <em>Parent rendered</em> means the component recomputed with no real data change. If there are fifty of those and together they cost 2 ms, leave them alone. If one costs 80 ms, you have found your target. The Vue-side equivalent is the Performance tab in Vue DevTools, except there you usually hunt for over-broad computed values rather than a render cascade.</p>'
        },
        pro: {
          pl: '<p>Zasada numer jeden: renderowanie w Reactie jest tanie, a <em>commit</em> jest drogi. Render to wykonanie funkcji i zbudowanie obiektow elementow; commit to mutacje DOM oraz efekty layoutu. Profiler pokazuje oba, ale to commit i dlugie renderowania powyzej jednej klatki (16 ms przy 60 Hz) sa realnym problemem.</p>' +
            '<h4>Narzedzia, ktorych naprawde uzywasz</h4>' +
            '<ul>' +
            '<li><strong>React DevTools Profiler</strong> - flamegraph, ranked chart, powody renderow. Dziala tylko w buildzie developerskim lub w profiling buildzie (<code>react-dom/profiling</code>).</li>' +
            '<li><strong>Highlight updates</strong> - najszybszy sygnal ostrzegawczy: migajaca ramka wokol calej strony przy wpisywaniu jednej litery to klasyczny stan trzymany za wysoko.</li>' +
            '<li><strong>Performance panel w Chrome</strong> - jedyne miejsce, gdzie zobaczysz long tasks, layout thrashing i INP. Profiler nie widzi kosztu stylow i layoutu.</li>' +
            '<li><strong>Programowy <code>&lt;Profiler&gt;</code></strong> - opakuj podejrzane poddrzewo i wysylaj czasy do telemetrii, tak jak wysylasz web vitals.</li>' +
            '</ul>' +
            '<pre><code>// React: pomiar produkcyjny wybranego poddrzewa\n&lt;Profiler id="table" onRender={(id, phase, actual) =&gt; {\n  if (actual &gt; 50) report({ id, phase, actual })\n}}&gt;\n  &lt;DataTable rows={rows} /&gt;\n&lt;/Profiler&gt;\n\n// Vue: odpowiednik to wlasny hook renderTracked / renderTriggered\nonRenderTriggered((e) =&gt; console.log(e.key, e.type))</code></pre>' +
            '<p>W Vue debugowalismy pytaniem <em>co wywolalo ten render</em> - i dostawalismy konkretny klucz reaktywny z <code>onRenderTriggered</code>. W Reactie pytanie brzmi <em>dlaczego to poddrzewo w ogole sie wykonalo</em>, bo domyslna odpowiedz to zawsze "bo rodzic sie wykonal". Dlatego naprawa niemal nigdy nie zaczyna sie od <code>memo</code>, tylko od struktury.</p>' +
            '<h4>Kolejnosc napraw</h4>' +
            '<ol>' +
            '<li><strong>Zejdz ze stanem nizej</strong> (colocation). Stan pola tekstowego w formularzu, a nie w layoucie strony.</li>' +
            '<li><strong>Przekaz dzieci jako <code>children</code></strong>. Element przekazany z gory nie przelicza sie, gdy rodzic sie renderuje - to darmowa memoizacja bez <code>memo</code>.</li>' +
            '<li><strong>Rozetnij konteksty</strong>. Jeden kontekst z dziesiecioma polami budzi wszystkich konsumentow przy kazdej zmianie; podziel go albo uzyj selektorow ze store.</li>' +
            '<li><strong>Dopiero teraz memoizuj</strong> - i tylko to, co Profiler wskazal.</li>' +
            '</ol>' +
            '<p>Pulapki: <code>StrictMode</code> w devie wykonuje renderowanie dwukrotnie, wiec liczby sa zawyzone, a wnioski nadal poprawne. Profiluj na buildzie produkcyjnym z throttlingiem CPU 4x, bo na MacBooku wszystko jest szybkie. I mierz interakcje, nie ladowanie: metryka, ktora oceni cie w Lighthouse i w rekrutacji, to INP, a nie liczba renderow.</p>',
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
            pl: 'Co dokladnie dzieje sie po wywolaniu setState w komponencie nadrzednym?',
            en: 'What exactly happens after calling setState in a parent component?'
          },
          options: [
            { pl: 'React aktualizuje tylko te wezly DOM, ktore czytaly ten stan', en: 'React updates only the DOM nodes that read that state' },
            { pl: 'Funkcje komponentu i jego niezapamietanych dzieci wykonuja sie ponownie, a diff decyduje o DOM', en: 'The component function and its non-memoized children re-run, and the diff decides the DOM' },
            { pl: 'Cala aplikacja jest montowana od nowa', en: 'The whole application remounts' },
            { pl: 'Nic, dopoki nie wywolasz forceUpdate', en: 'Nothing, until you call forceUpdate' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie sledzi zaleznosci jak Vue - planuje render poddrzewa, wykonuje funkcje i dopiero porownanie elementow decyduje, co trafi do DOM.',
            en: 'React does not track dependencies the way Vue does - it schedules a subtree render, runs the functions, and only the element comparison decides what reaches the DOM.'
          }
        },
        {
          q: {
            pl: 'W Profilerze widzisz powod renderu "parent rendered". Co to znaczy?',
            en: 'The Profiler shows the render reason "parent rendered". What does it mean?'
          },
          options: [
            { pl: 'Propsy komponentu zmienily wartosc', en: 'The props of the component changed value' },
            { pl: 'Komponent subskrybuje kontekst, ktory sie zmienil', en: 'The component subscribes to a context that changed' },
            { pl: 'Komponent wykonal sie tylko dlatego, ze rodzic sie wykonal, bez zmiany danych', en: 'The component ran only because its parent ran, with no data change' },
            { pl: 'Komponent zostal odmontowany i zamontowany ponownie', en: 'The component was unmounted and mounted again' }
          ],
          correct: 2,
          explain: {
            pl: 'To sygnal potencjalnie zbednego renderu. Sam w sobie nie jest bledem - staje sie problemem dopiero, gdy ten render kosztuje mierzalny czas.',
            en: 'It flags a potentially wasted render. On its own it is not a bug - it becomes a problem only when that render costs measurable time.'
          }
        },
        {
          q: {
            pl: 'Ktore narzedzie pokaze ci koszt layoutu i long tasks, ktorego React Profiler nie widzi?',
            en: 'Which tool shows layout cost and long tasks that the React Profiler cannot see?'
          },
          options: [
            { pl: 'Panel Performance w Chrome DevTools', en: 'The Performance panel in Chrome DevTools' },
            { pl: 'Zakladka Components w React DevTools', en: 'The Components tab in React DevTools' },
            { pl: 'Vue DevTools w trybie zgodnosci', en: 'Vue DevTools in compatibility mode' },
            { pl: 'Analizator bundla', en: 'The bundle analyzer' }
          ],
          correct: 0,
          explain: {
            pl: 'React Profiler mierzy tylko czas w Reactie. Style, layout, paint i INP zobaczysz wylacznie w panelu Performance przegladarki.',
            en: 'The React Profiler measures only time spent inside React. Style, layout, paint and INP live exclusively in the browser Performance panel.'
          }
        },
        {
          q: {
            pl: 'Pisanie w jednym polu formularza przerysowuje caly dashboard po 120 ms. Co robisz najpierw?',
            en: 'Typing in one form field re-renders the whole dashboard in 120 ms. What do you do first?'
          },
          options: [
            { pl: 'Owijasz kazdy komponent dashboardu w React.memo', en: 'Wrap every dashboard component in React.memo' },
            { pl: 'Dodajesz debounce na zdarzeniu onChange', en: 'Add a debounce on the onChange handler' },
            { pl: 'Wlaczasz React Compiler i liczysz, ze zniknie', en: 'Turn on the React Compiler and hope it goes away' },
            { pl: 'Przenosisz stan pola do samego pola albo do mniejszego komponentu formularza', en: 'Move the field state into the field itself or into a smaller form component' }
          ],
          correct: 3,
          explain: {
            pl: 'Kolokacja stanu usuwa przyczyne, a nie objaw: skoro dashboard nie czyta tej wartosci, nie ma powodu, by w ogole znajdowala sie nad nim. Debounce tylko opoznia bol, a memo obudowuje go boilerplatem.',
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
          def: { pl: 'HOC porownujacy propsy <strong>plytko</strong> i pomijajacy render, gdy sie nie zmienily. Jeden literal obiektu w JSX wystarczy, zeby kontrakt przestal dzialac.', en: 'A HOC that compares props <strong>shallowly</strong> and skips the render when nothing changed. One object literal in JSX is enough to break the contract.' }
        },
        {
          term: { pl: 'useMemo i useCallback', en: 'useMemo and useCallback' },
          def: { pl: 'Utrwalanie wartosci i funkcji miedzy renderami. <code>useCallback(fn, deps)</code> to dokladnie <code>useMemo(() =&gt; fn, deps)</code>, a React ma prawo cache odrzucic - to nie jest gwarancja.', en: 'Preserving values and functions across renders. <code>useCallback(fn, deps)</code> is precisely <code>useMemo(() =&gt; fn, deps)</code>, and React may drop the cache - it is not a guarantee.' }
        },
        {
          term: { pl: 'Stabilna tozsamosc propsow', en: 'Stable prop identity' },
          def: { pl: 'Warunek dzialania memoizacji: producent propsow musi oddawac te same referencje. Bez tego <code>memo</code> nigdy nie wygra i dokladasz tylko koszt porownania.', en: 'The precondition for memoization: the props producer must hand back the same references. Without it <code>memo</code> can never win and you only pay for the comparison.' }
        },
        {
          term: { pl: 'Forma updater', en: 'Updater form' },
          def: { pl: '<code>setZoom(z =&gt; z + 1)</code> zamiast <code>setZoom(zoom + 1)</code>. Pozwala trzymac pusta tablice zaleznosci i eliminuje stale closures - odpowiednik <code>count.value++</code> z Vue.', en: '<code>setZoom(z =&gt; z + 1)</code> instead of <code>setZoom(zoom + 1)</code>. It keeps the dependency array empty and removes stale closures - the equivalent of <code>count.value++</code> in Vue.' }
        },
        {
          term: { pl: 'React Compiler', en: 'React Compiler' },
          def: { pl: 'Plugin Babela wstawiajacy memoizacje automatycznie, z dokladnoscia do pojedynczych wyrazen. Dziala tylko na kodzie zgodnym z reguami hookow; zlej architektury stanu nie naprawi.', en: 'A Babel plugin that inserts memoization automatically, at the granularity of single expressions. It only applies to code that follows the rules of hooks; it will not fix bad state architecture.' }
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
          pl: 'Memoizacja w Reactie to walka o stabilna tozsamosc referencji. Vue nigdy jej nie toczylo, bo computed cachuje po wartosci, a React Compiler dopisuje te memoizacje sam.',
          en: 'React memoization is a fight for stable reference identity. Vue never fought it because computed caches by value, and the React Compiler now inserts that memoization for you.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze codziennie przynosisz kolezance to samo pudelko sniadaniowe. Ona sprawdza, czy pudelko jest to samo co wczoraj. Jesli tak - nie otwiera go, ufa, ze srodek sie nie zmienil.</p>' +
            '<p>Klopot w tym, ze ty co rano przekladasz sniadanie do <em>nowego</em> pudelka. Zawartosc identyczna, ale pudelko inne, wiec kolezanka za kazdym razem wszystko sprawdza od nowa. Tak wlasnie dziala React: porownuje pudelka, nie zawartosc.</p>' +
            '<p>Sa dwa wyjscia. Pierwsze: samemu pilnowac, zeby pudelko bylo to samo - to sa useMemo i useCallback. Drugie, nowsze: zatrudnic asystenta, ktory robi to za ciebie przy pakowaniu. Tym asystentem jest React Compiler. W Vue ten asystent byl w zestawie od poczatku, dlatego nigdy nie musiales o pudelkach myslec.</p>',
          en: '<p>Imagine you bring a friend the same lunchbox every day. She checks whether it is the same box as yesterday. If it is, she does not open it - she trusts that the contents did not change.</p>' +
            '<p>The catch is that every morning you move the lunch into a <em>new</em> box. Identical contents, different box, so your friend re-checks everything from scratch. That is exactly how React works: it compares boxes, not contents.</p>' +
            '<p>There are two ways out. The first is to keep the box yourself, which is what useMemo and useCallback do. The second, newer one, is to hire an assistant who does it for you at packing time. That assistant is the React Compiler. In Vue the assistant came in the box from day one, which is why you never had to think about lunchboxes at all.</p>'
        },
        school: {
          pl: '<p><code>React.memo</code> opakowuje komponent i porownuje propsy plytko (<code>Object.is</code> pole po polu). Jesli wszystkie sa identyczne referencyjnie, render jest pomijany. Problem: kazdy render rodzica tworzy nowe literaly obiektow i nowe funkcje, wiec memo prawie zawsze przegrywa - dopoki nie ustabilizujesz tych referencji.</p>' +
            '<h4>Vue kontra React</h4>' +
            '<pre><code>// Vue: computed cachuje wynik i porownuje po wartosci\nconst total = computed(() =&gt; items.value.reduce((a, i) =&gt; a + i.price, 0))\n\n// React: useMemo cachuje po tablicy zaleznosci\nconst total = useMemo(\n  () =&gt; items.reduce((a, i) =&gt; a + i.price, 0),\n  [items]\n)</code></pre>' +
            '<p>W Vue robiles X: pisalies <code>computed</code> dla wygody i czytelnosci, a cache dostawales gratis. W Reactie robisz Y: <code>useMemo</code> jest optymalizacja z realnym kosztem (pamiec plus porownanie zaleznosci) i piszesz go tylko wtedy, gdy obliczenie jest drogie albo gdy wynik trafia jako props do komponentu w <code>memo</code>. Powod Z: Vue cachuje po wartosci reaktywnej, React tylko po tozsamosci referencji z tablicy zaleznosci.</p>' +
            '<h4>Trzy narzedzia</h4>' +
            '<ul>' +
            '<li><code>useMemo</code> - stabilizuje <strong>wartosc</strong> (obiekt, tablica, wynik obliczenia).</li>' +
            '<li><code>useCallback</code> - stabilizuje <strong>funkcje</strong>, czyli useMemo dla funkcji.</li>' +
            '<li><code>React.memo</code> - kaze komponentowi pominac render, gdy propsy sa referencyjnie takie same.</li>' +
            '</ul>' +
            '<p>Dzialaja tylko razem. <code>memo</code> bez stabilnych propsow nic nie da, a <code>useCallback</code> bez <code>memo</code> po drugiej stronie to czysty narzut. To najczestszy blad osob przychodzacych z Vue: memoizuja wszystko odruchowo i dokladaja kod, ktory nic nie przyspiesza.</p>',
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
          pl: '<p>Memoizacja recznie pisana jest kontraktem miedzy dwoma miejscami w kodzie: producent propsow musi utrzymac tozsamosc, konsument musi byc opakowany w <code>memo</code>. Kontrakt jest niewidoczny dla typow i latwo go zlamac jednym nowym literalem obiektu w JSX.</p>' +
            '<pre><code>// zle: memo nigdy nie zadziala\n&lt;Chart config={{ theme: "dark" }} onZoom={() =&gt; setZoom(z + 1)} /&gt;\n\n// dobrze: stabilna wartosc i stabilna funkcja\nconst config = useMemo(() =&gt; ({ theme }), [theme])\nconst onZoom = useCallback(() =&gt; setZoom(z =&gt; z + 1), [])\n&lt;Chart config={config} onZoom={onZoom} /&gt;</code></pre>' +
            '<p>Zwroc uwage na <code>setZoom(z =&gt; z + 1)</code>. Forma funkcyjna pozwala miec pusta tablice zaleznosci i eliminuje stale closure - to odpowiednik pisania <code>count.value++</code> w Vue, gdzie zawsze czytales aktualna wartosc, bo siegales do proxy, a nie do zmiennej przechwyconej w tym renderze.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>React Compiler (stabilny od 2025, wtyczka Babel <code>babel-plugin-react-compiler</code>, wlaczana takze przez konfiguracje Next.js) analizuje komponenty i sam wstawia memoizacje na poziomie pojedynczych wyrazen. Efekt jest blizszy Vue niz klasycznemu Reactowi: piszesz zwykly kod, a cache generuje sie w buildzie.</p>' +
            '<ul>' +
            '<li>Dziala tylko na kodzie zgodnym z regulami hookow i bez mutacji propsow ani stanu podczas renderowania. Reszte kompilator po cichu pomija - sprawdzasz to wtyczka ESLint i panelem Components, ktory pokazuje znaczek <em>Memo</em>.</li>' +
            '<li>Nie zastepuje architektury. Zle rozlozony stan i przeciazony kontekst nadal beda wolne.</li>' +
            '<li>Migracja: wlacz kompilator, usun <code>useCallback</code> i <code>useMemo</code>, ktore istnialy tylko dla wydajnosci, ale zostaw te, ktore sa <em>semantyczne</em> - na przyklad stabilna tozsamosc obiektu przekazywanego do <code>useEffect</code> albo do biblioteki zewnetrznej.</li>' +
            '</ul>' +
            '<p>Liczby dla kontekstu: typowy render komponentu to dziesiate czesci milisekundy, wiec memoizowanie taniego komponentu jest strata. Oplaca sie przy tabelach po kilkaset wierszy, wykresach, edytorach i wszystkim, co liczy w renderze cokolwiek powyzej 1 ms. Alternatywa bez memoizacji jest zwykle najlepsza: przekaz poddrzewo jako <code>children</code>, przenies stan nizej, albo trzymaj go w store z selektorami (Zustand, Redux Toolkit), gdzie subskrypcja jest juz drobnoziarnista - dokladnie tak jak w Pinii.</p>' +
            '<p>Na rozmowie kwalifikacyjnej: <code>memo</code> porownuje propsy plytko, <code>useMemo</code> nie gwarantuje zachowania cache (React moze go porzucic), a <code>useCallback(fn, deps)</code> to dokladnie <code>useMemo(() =&gt; fn, deps)</code>.</p>',
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
            pl: 'Dlaczego React.memo czesto nie dziala mimo poprawnego uzycia?',
            en: 'Why does React.memo often fail even when used correctly?'
          },
          options: [
            { pl: 'Bo rodzic przekazuje nowe literaly obiektow i nowe funkcje przy kazdym renderze', en: 'Because the parent passes fresh object literals and fresh functions on every render' },
            { pl: 'Bo memo dziala tylko w komponentach klasowych', en: 'Because memo works only in class components' },
            { pl: 'Bo memo porownuje propsy gleboko i jest wolniejsze niz render', en: 'Because memo compares props deeply and is slower than rendering' },
            { pl: 'Bo StrictMode wylacza memoizacje', en: 'Because StrictMode disables memoization' }
          ],
          correct: 0,
          explain: {
            pl: 'Porownanie jest plytkie i oparte na tozsamosci referencji, wiec nowy obiekt o identycznej zawartosci lamie memoizacje.',
            en: 'The comparison is shallow and identity-based, so a new object with identical contents defeats the memoization.'
          }
        },
        {
          q: {
            pl: 'Ktore zdanie najlepiej opisuje roznice miedzy computed w Vue a useMemo w Reactie?',
            en: 'Which statement best describes computed in Vue versus useMemo in React?'
          },
          options: [
            { pl: 'Sa identyczne, tylko inaczej nazwane', en: 'They are identical, just named differently' },
            { pl: 'computed sam wykrywa zaleznosci i jest domyslnym sposobem pisania pochodnych, useMemo wymaga recznej listy i jest optymalizacja', en: 'computed discovers dependencies itself and is the default way to write derived state, while useMemo needs a manual list and is an optimization' },
            { pl: 'useMemo cachuje miedzy odmontowaniami komponentu, computed nie', en: 'useMemo caches across unmounts, computed does not' },
            { pl: 'computed dziala tylko w szablonie, useMemo tylko w JSX', en: 'computed works only in templates, useMemo only in JSX' }
          ],
          correct: 1,
          explain: {
            pl: 'Pochodne w Reactie mozesz liczyc zwyklym wyrazeniem; useMemo dokladasz dopiero, gdy koszt obliczenia lub stabilnosc referencji faktycznie ma znaczenie.',
            en: 'Derived values in React can just be plain expressions; you reach for useMemo only when computation cost or reference stability genuinely matters.'
          }
        },
        {
          q: {
            pl: 'Co dokladnie robi React Compiler?',
            en: 'What does the React Compiler actually do?'
          },
          options: [
            { pl: 'Zamienia JSX na szablony Vue', en: 'Converts JSX into Vue templates' },
            { pl: 'Wprowadza drobnoziarnista reaktywnosc opartsa na sygnalach w czasie dzialania', en: 'Introduces signal-based fine-grained reactivity at runtime' },
            { pl: 'Automatycznie usuwa efekty uboczne z komponentow', en: 'Automatically removes side effects from components' },
            { pl: 'Analizuje kod w buildzie i sam wstawia memoizacje wartosci oraz komponentow', en: 'Analyses code at build time and inserts memoization of values and components for you' }
          ],
          correct: 3,
          explain: {
            pl: 'To transformacja buildowa, a nie nowy model reaktywnosci - React nadal renderuje poddrzewa, tylko wiekszosc z nich pomija dzieki wygenerowanemu cache.',
            en: 'It is a build-time transformation, not a new reactivity model - React still renders subtrees, it just skips most of them thanks to the generated cache.'
          }
        },
        {
          q: {
            pl: 'Wlaczasz React Compiler w istniejacym projekcie. Ktore memoizacje warto zostawic?',
            en: 'You enable the React Compiler in an existing project. Which memoizations are worth keeping?'
          },
          options: [
            { pl: 'Wszystkie - kompilator ich nie rusza, wiec nic nie szkodza', en: 'All of them - the compiler ignores them, so they do no harm' },
            { pl: 'Te semantyczne: stabilna tozsamosc obiektow trafiajacych do useEffect albo do bibliotek zewnetrznych', en: 'The semantic ones: stable identity for objects handed to useEffect or to third-party libraries' },
            { pl: 'Tylko useCallback, bo kompilator nie obsluguje funkcji', en: 'Only useCallback, because the compiler cannot handle functions' },
            { pl: 'Zadne - kompilator gwarantuje memoizacje kazdego komponentu', en: 'None - the compiler guarantees memoization of every component' }
          ],
          correct: 1,
          explain: {
            pl: 'Memoizacja bywa czescia kontraktu, a nie tylko optymalizacja: jesli od tozsamosci referencji zalezy uruchomienie efektu lub zachowanie zewnetrznej biblioteki, zostaw ja jawna. Kompilator pomija tez kod lamiacy reguly, wiec nie gwarantuje pokrycia calego drzewa.',
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
          def: { pl: 'Renderowanie wylacznie wierszy widocznych w oknie przewijania, wyliczonych z wysokosci kontenera, offsetu scrolla i szacowanej wysokosci wiersza.', en: 'Rendering only the rows visible in the scroll window, derived from container height, scroll offset and estimated row height.' }
        },
        {
          term: { pl: 'overscan', en: 'overscan' },
          def: { pl: 'Bufor wierszy renderowanych poza widocznym obszarem, zeby przy szybkim scrollu nie migaly puste pasy. Zwykle 3-10; wiecej to marnowana praca.', en: 'A buffer of rows rendered outside the viewport so fast scrolling does not show blank bands. Usually 3-10; more is wasted work.' }
        },
        {
          term: { pl: 'measureElement', en: 'measureElement' },
          def: { pl: 'Mechanizm TanStack Virtual oparty na <code>ResizeObserver</code>, ktory po zamontowaniu koryguje szacowana wysokosc wiersza i przelicza offsety. Bez niego scrollbar skacze.', en: 'The TanStack Virtual mechanism backed by <code>ResizeObserver</code> that corrects the estimated row height after mount and recomputes offsets. Without it the scrollbar jumps.' }
        },
        {
          term: { pl: 'content-visibility: auto', en: 'content-visibility: auto' },
          def: { pl: 'Wlasciwosc CSS pomijajaca layout tresci poza ekranem. Tansza alternatywa dla wirtualizacji, warta sprawdzenia zanim dolozysz biblioteke.', en: 'A CSS property that skips layout for off-screen content. A cheaper alternative to virtualization, worth trying before you add a library.' }
        },
        {
          term: { pl: 'Stabilny key', en: 'Stable key' },
          def: { pl: 'Klucz oparty na identyfikatorze rekordu, nie na indeksie. Przy wirtualizacji indeks zmienia sie razem z oknem, co daje efektowne bledy fokusu i stanu wiersza.', en: 'A key based on the record id, not the index. With virtualization the index shifts along with the window, producing spectacular focus and row-state bugs.' }
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
          pl: 'Wirtualizacja: dane maja 10 000 wierszy, DOM tylko widoczne okno plus overscan, a wysoki spacer utrzymuje prawidlowy pasek przewijania.',
          en: 'Virtualization: the data has 10,000 rows, the DOM holds only the visible window plus overscan, and a tall spacer keeps the scrollbar honest.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Masz ksiazke telefoniczna z dziesiecioma tysiacami nazwisk. Nikt nie kladzie na stole wszystkich stron naraz. Trzymasz otwarta jedna, a reszta czeka zamknieta - i to wystarcza, bo i tak widzisz tylko to, co masz przed oczami.</p>' +
            '<p>Przegladarka dziala tak samo. Dziesiec tysiecy wierszy w HTML to dziesiec tysiecy pudelek do policzenia, ustawienia i pomalowania. Telefon sie na tym zatnie. Wirtualizacja mowi: narysuj tylko dwadziescia wierszy, ktore akurat widac, a pod spodem podloz bardzo wysoki pusty kawalek, zeby pasek przewijania nie klamal.</p>' +
            '<p>Kiedy uzytkownik przewija, podmieniasz zawartosc tych dwudziestu wierszy. To jak przesuwanie okienka po dlugiej tasmie. Tasma jest ogromna, okienko male i zawsze tak samo tanie w rysowaniu.</p>',
          en: '<p>You have a phone book with ten thousand names in it. Nobody spreads every page across the table. You keep one page open and the rest stays closed - which is fine, because you can only look at what is in front of you anyway.</p>' +
            '<p>The browser behaves the same way. Ten thousand rows of HTML means ten thousand boxes to measure, lay out and paint. A phone will choke on that. Virtualization says: draw only the twenty rows that are actually visible and put a very tall empty block underneath so the scrollbar does not lie.</p>' +
            '<p>When the user scrolls, you swap the contents of those twenty rows. It is like sliding a small window along a very long strip of film. The strip is enormous, the window is small, and drawing it always costs the same.</p>'
        },
        school: {
          pl: '<p>Zacznijmy od kluczy, bo to wspolny fundament. W Vue pisales <code>v-for="item in items" :key="item.id"</code> i wiedziales, ze bez klucza Vue uzyje strategii <em>in-place patch</em>. W Reactie robisz to samo, tylko klucz podajesz jako props elementu, a React uzywa go do dopasowania elementow miedzy renderami.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;Row v-for="row in rows" :key="row.id" :row="row" /&gt;\n\n// React\n{rows.map(row =&gt; &lt;Row key={row.id} row={row} /&gt;)}</code></pre>' +
            '<p>Powod Z jest identyczny w obu bibliotekach: klucz to tozsamosc wiersza. Indeks jako klucz przy sortowaniu lub usuwaniu powoduje, ze stan wewnetrzny (zaznaczone pole, focus, animacja) przykleja sie do zlego wiersza.</p>' +
            '<h4>Kiedy wirtualizowac</h4>' +
            '<p>Do okolo 200-300 prostych wierszy nie rob nic. Powyzej tysiaca wierszy albo przy bogatych wierszach (awatary, wykresy, edytowalne pola) DOM staje sie waskim gardlem i widac to jako zacinanie przy przewijaniu oraz dlugi czas montowania.</p>' +
            '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual"\n\nconst rowVirtualizer = useVirtualizer({\n  count: rows.length,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 40,\n  overscan: 5\n})</code></pre>' +
            '<p>Biblioteka liczy, ktore indeksy sa widoczne, i zwraca ich pozycje. Ty renderujesz tylko je, kazdy pozycjonowany absolutnie wewnatrz kontenera o wysokosci calej listy. W Vue robiles X przez <code>vue-virtual-scroller</code> albo ten sam TanStack Virtual w wersji dla Vue - to ta sama biblioteka rdzeniowa, wiec wiedza przenosi sie w calosci.</p>',
          en: '<p>Start with keys, because that is the shared foundation. In Vue you wrote <code>v-for="item in items" :key="item.id"</code> and knew that without a key Vue falls back to its <em>in-place patch</em> strategy. In React you do the same thing, except the key is a prop on the element and React uses it to match elements between renders.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;Row v-for="row in rows" :key="row.id" :row="row" /&gt;\n\n// React\n{rows.map(row =&gt; &lt;Row key={row.id} row={row} /&gt;)}</code></pre>' +
            '<p>Reason Z is identical in both libraries: the key is the identity of the row. Using the index as a key means that when rows are sorted or removed, internal state (a checked box, focus, an animation) sticks to the wrong row.</p>' +
            '<h4>When to virtualize</h4>' +
            '<p>Below roughly 200-300 simple rows, do nothing. Above a thousand rows, or with rich rows (avatars, sparklines, editable fields), the DOM becomes the bottleneck and you see it as scroll jank and a long mount time.</p>' +
            '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual"\n\nconst rowVirtualizer = useVirtualizer({\n  count: rows.length,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 40,\n  overscan: 5\n})</code></pre>' +
            '<p>The library computes which indices are visible and returns their offsets. You render only those, each absolutely positioned inside a container as tall as the full list. In Vue you did X with <code>vue-virtual-scroller</code> or the Vue build of the same TanStack Virtual - it is the same core library, so the knowledge transfers completely.</p>'
        },
        pro: {
          pl: '<p>Wirtualizacja to trzy liczby: wysokosc kontenera, pozycja przewijania i szacowana wysokosc wiersza. Z nich wynika zakres indeksow, ktore renderujesz, powiekszony o <strong>overscan</strong> - bufor wierszy poza ekranem, ktory zapobiega bialym pasom przy szybkim przewijaniu. Typowo 3-10 wierszy; wiecej to niepotrzebny koszt.</p>' +
            '<h4>Wysokosci dynamiczne</h4>' +
            '<p>Stala wysokosc jest latwa. Zmienna wymaga pomiaru: TanStack Virtual udostepnia <code>measureElement</code> oparty na <code>ResizeObserver</code>, ktory po zamontowaniu koryguje szacunek i przelicza offsety. Bez tego pasek przewijania skacze. Ten sam mechanizm dziala w wersji dla Vue, bo rdzen jest bezframeworkowy.</p>' +
            '<pre><code>&lt;div ref={parentRef} style={{ height: 600, overflow: "auto" }}&gt;\n  &lt;div style={{ height: v.getTotalSize(), position: "relative" }}&gt;\n    {v.getVirtualItems().map(item =&gt; (\n      &lt;div key={rows[item.index].id}\n           ref={v.measureElement}\n           data-index={item.index}\n           style={{ position: "absolute", top: 0,\n                    transform: "translateY(" + item.start + "px)" }}&gt;\n        &lt;Row row={rows[item.index]} /&gt;\n      &lt;/div&gt;\n    ))}\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre>' +
            '<h4>Pulapki produkcyjne</h4>' +
            '<ul>' +
            '<li><strong>Ctrl+F i dostepnosc</strong> - tresci poza oknem nie ma w DOM, wiec wyszukiwarka przegladarki jej nie znajdzie. Dla tabel dodaj <code>role="grid"</code> oraz <code>aria-rowcount</code>, zeby czytnik ekranu znal pelny rozmiar.</li>' +
            '<li><strong>Sticky header i kolumny</strong> - pozycjonowanie absolutne wewnatrz kontenera przewijania lubi sie gryzc ze <code>position: sticky</code>; trzymaj naglowek poza kontenerem wirtualizowanym.</li>' +
            '<li><strong>Utrata stanu wiersza</strong> - odmontowany wiersz traci stan lokalny. Rozwinieta sekcja czy zaznaczenie musza mieszkac w stanie listy, nie w wierszu.</li>' +
            '<li><strong>Zle klucze</strong> - przy indeksach wirtualizacja zamienia rowniez tozsamosci, co daje spektakularne bugi z focusem.</li>' +
            '</ul>' +
            '<p>Zanim siegniesz po wirtualizacje, sprawdz tansze opcje: paginacja lub nieskonczone przewijanie z <code>useInfiniteQuery</code> (TanStack Query), <code>content-visibility: auto</code> w CSS, ktore pomija layout poza ekranem prawie za darmo, oraz <code>React.memo</code> na komponencie wiersza. W Vue mieliscie do tego jeszcze <code>v-memo</code>, ktore pomijalo patchowanie poddrzewa po liscie zaleznosci - w Reactie nie ma bezposredniego odpowiednika, najblizej jest zapamietany komponent wiersza ze stabilnymi propsami albo React Compiler, ktory zrobi to samo automatycznie.</p>' +
            '<p>Rzad wielkosci: 5 000 wierszy tabeli po 6 kolumn to zwykle ponad 500 ms montowania i kilkaset megabajtow pamieci w Chrome. Ta sama lista zwirtualizowana montuje sie w 20-40 ms i przewija stabilnie w 60 fps na sredniej klasy Androidzie.</p>',
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
            { pl: 'Zeby przegladarka wczytala wszystkie wiersze z wyprzedzeniem', en: 'So the browser can preload every row in advance' },
            { pl: 'Zeby pasek przewijania odpowiadal pelnej liczbie wierszy', en: 'So the scrollbar matches the full number of rows' },
            { pl: 'Zeby React mogl obliczyc klucze', en: 'So React can compute the keys' },
            { pl: 'Zeby uniknac uzycia position: absolute', en: 'To avoid using position: absolute' }
          ],
          correct: 1,
          explain: {
            pl: 'W DOM istnieje tylko widoczne okno, wiec bez spacera o pelnej wysokosci przewijanie konczyloby sie po kilkunastu wierszach.',
            en: 'Only the visible window exists in the DOM, so without a full-height spacer the scroll would end after a dozen rows.'
          }
        },
        {
          q: {
            pl: 'Kiedy uzycie indeksu tablicy jako klucza jest bezpieczne?',
            en: 'When is using the array index as a key safe?'
          },
          options: [
            { pl: 'Zawsze, React i tak porownuje zawartosc', en: 'Always, React compares contents anyway' },
            { pl: 'Tylko przy listach powyzej tysiaca elementow', en: 'Only for lists over a thousand items' },
            { pl: 'Gdy lista jest statyczna i nigdy nie zmienia kolejnosci ani dlugosci', en: 'When the list is static and never changes order or length' },
            { pl: 'Gdy kazdy wiersz jest opakowany w React.memo', en: 'When every row is wrapped in React.memo' }
          ],
          correct: 2,
          explain: {
            pl: 'Reguly sa te same co w v-for w Vue: indeks jest tozsamoscia pozycji, a nie danych, wiec przy sortowaniu lub usuwaniu stan przyklei sie do zlego elementu.',
            en: 'The rule matches v-for in Vue: an index identifies a position, not the data, so sorting or deleting sticks state onto the wrong item.'
          }
        },
        {
          q: {
            pl: 'Co robi parametr overscan w wirtualizatorze?',
            en: 'What does the overscan option do in a virtualizer?'
          },
          options: [
            { pl: 'Renderuje kilka dodatkowych wierszy poza widocznym oknem, zeby uniknac bialych pasow', en: 'Renders a few extra rows beyond the visible window to avoid blank bands' },
            { pl: 'Ogranicza liczbe zdarzen przewijania na sekunde', en: 'Limits the number of scroll events per second' },
            { pl: 'Wlacza pomiar wysokosci wierszy', en: 'Enables row height measurement' },
            { pl: 'Buforuje dane pobrane z serwera', en: 'Caches data fetched from the server' }
          ],
          correct: 0,
          explain: {
            pl: 'Overscan to bufor renderowania. Zbyt maly daje migotanie przy szybkim przewijaniu, zbyt duzy niweczy zysk z wirtualizacji.',
            en: 'Overscan is a render buffer. Too little causes flicker on fast scroll, too much cancels the benefit of virtualizing at all.'
          }
        },
        {
          q: {
            pl: 'Zwirtualizowana tabela ma rozwijane wiersze. Po przewinieciu w dol i z powrotem rozwiniecie znika. Dlaczego?',
            en: 'A virtualized table has expandable rows. After scrolling away and back, the expansion is gone. Why?'
          },
          options: [
            { pl: 'Bo klucze sa niestabilne i React miesza wiersze', en: 'Because keys are unstable and React mixes up rows' },
            { pl: 'Bo wiersz poza oknem zostal odmontowany razem ze swoim stanem lokalnym', en: 'Because the off-screen row was unmounted together with its local state' },
            { pl: 'Bo overscan jest ustawiony na zero', en: 'Because overscan is set to zero' },
            { pl: 'Bo ResizeObserver resetuje stan po pomiarze', en: 'Because ResizeObserver resets state after measuring' }
          ],
          correct: 1,
          explain: {
            pl: 'Wirtualizacja odmontowuje komponenty poza oknem, a useState zyje tylko tak dlugo jak komponent. Stan rozwiniecia musi trafic do zbioru trzymanego przez liste, na przyklad Set z identyfikatorami.',
            en: 'Virtualization unmounts off-screen components and useState lives only as long as the component. Expansion state must move up into the list, for example a Set of ids.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'code-splitting',
      title: {
        pl: 'Code splitting i leniwe ladowanie',
        en: 'Code splitting and lazy loading'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Code splitting', en: 'Code splitting' },
          def: { pl: 'Podzial bundla na chunki ladowane na zadanie - zwykle po trasach. Optymalizuje metryki startu: LCP i TBT, bo 300 kB gzip to okolo 1,5-2 s parsowania na sredniej klasy Androidzie.', en: 'Splitting the bundle into on-demand chunks, usually along routes. It optimizes startup metrics, LCP and TBT, because 300 kB gzipped is roughly 1.5-2 s of parse time on a mid-range Android.' }
        },
        {
          term: { pl: 'Prefetch na hover', en: 'Prefetch on hover' },
          def: { pl: 'Start importu na <code>onMouseEnter</code> i <code>onFocus</code>, dzieki czemu klikniecie jest natychmiastowe. Next robi to automatycznie dla <code>next/link</code> w viewporcie.', en: 'Kicking off the import on <code>onMouseEnter</code> and <code>onFocus</code> so the click feels instant. Next does it automatically for a <code>next/link</code> in the viewport.' }
        },
        {
          term: { pl: 'Kaskada chunkow', en: 'Chunk waterfall' },
          def: { pl: 'Leniwy komponent, ktory dopiero po zamontowaniu zaczyna pobierac dane - dwie rundy czekania zamiast jednej. Lekarstwo: start zapytania rownolegle z importem.', en: 'A lazy component that only starts fetching data after it mounts - two rounds of waiting instead of one. The cure: start the request in parallel with the import.' }
        },
        {
          term: { pl: 'Stale chunk po deployu', en: 'Stale chunk after deploy' },
          def: { pl: 'Otwarta karta prosi o plik z poprzedniego builda i dostaje 404. Trzeba obsluzyc blad importu i zaproponowac przeladowanie strony.', en: 'An open tab requests a file from the previous build and gets a 404. You must handle the import failure and offer a reload.' }
        },
        {
          term: { pl: 'Budzet bundla', en: 'Bundle budget' },
          def: { pl: 'Ustalony limit rozmiaru shella, zwykle 150-200 kB gzip, pilnowany w CI. Bez niego kazdy sprint doklada kilka kilobajtow i nikt tego nie zauwaza.', en: 'An agreed size limit for the shell, usually 150-200 kB gzipped, enforced in CI. Without it every sprint adds a few kilobytes and nobody notices.' }
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
          pl: 'Jeden bundle kontra shell plus chunki na trasy: React uzywa lazy i Suspense, Vue defineAsyncComponent, ale pod spodem to ten sam dynamiczny import bundlera.',
          en: 'One bundle versus a shell plus route chunks: React uses lazy and Suspense, Vue uses defineAsyncComponent, and underneath both are the same bundler dynamic import.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jak dzieli sie bundle i co dzieje sie w czasie nawigacji: od jednej paczki, przez fallback Suspense, po prefetch kolejnej trasy.',
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
              pl: 'Wszystkie trasy sa w jednej paczce. Uzytkownik, ktory chce tylko listy, i tak pobiera edytor tekstu.',
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
            label: { pl: 'Podzial na chunki', en: 'Split into chunks' },
            note: {
              pl: 'Kazdy dynamiczny import tworzy osobny plik. Pierwsze ladowanie to juz tylko shell z routerem i layoutem.',
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
              pl: 'Modul zostaje w pamieci i w cache HTTP, wiec powrot na te trase nie pokazuje juz fallbacku.',
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
              pl: 'Wywolanie importu na hover lub w bezczynnosci sprawia, ze klikniecie jest natychmiastowe. Next.js robi to dla Link automatycznie.',
              en: 'Calling the import on hover or during idle time makes the click feel instant. Next.js does this for Link automatically.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie przeprowadzke. Mozesz przywiezc wszystkie pudla naraz - i przez godzine blokowac klatke schodowa. Albo przywiezc najpierw lozko i czajnik, a reszte dowozic wtedy, kiedy naprawde bedzie potrzebna.</p>' +
            '<p>Strona internetowa ma dokladnie ten sam wybor. Caly kod aplikacji moze przyjechac jedna wielka paczka, ktora uzytkownik pobiera, zanim cokolwiek zobaczy. Albo mozesz wyslac najpierw to, co widac na pierwszym ekranie, a ciezkie rzeczy - edytor, wykresy, mape - dowiezc dopiero, gdy ktos w nie kliknie.</p>' +
            '<p>Ten drugi sposob nazywa sie code splitting. Nie zmniejsza laczej ilosci kodu, tylko zmienia kolejnosc. A poniewaz wiekszosc ludzi nigdy nie wchodzi do polowy zakladek, ta reszta czesto nie musi przyjechac w ogole.</p>',
          en: '<p>Picture moving house. You can bring every box at once and block the stairwell for an hour. Or you can bring the bed and the kettle first and deliver the rest when it is actually needed.</p>' +
            '<p>A website faces exactly the same choice. All your application code can arrive as one big package that the user downloads before seeing anything. Or you can send what is visible on the first screen first and deliver the heavy things - the editor, the charts, the map - only when someone clicks into them.</p>' +
            '<p>The second approach is called code splitting. It does not reduce the total amount of code, it changes the order. And since most people never open half of the tabs, that remainder often never has to arrive at all.</p>'
        },
        school: {
          pl: '<p>Punktem wyjscia jest dynamiczny import, ktory rozumieja wszystkie bundlery (Vite, webpack, Rspack). Kazde wywolanie <code>import()</code> tworzy osobny chunk pobierany dopiero w momencie wywolania.</p>' +
            '<pre><code>&lt;!-- Vue --&gt;\nconst Editor = defineAsyncComponent({\n  loader: () =&gt; import("./Editor.vue"),\n  loadingComponent: Spinner\n})\n\n// React\nconst Editor = lazy(() =&gt; import("./Editor"))\n\n&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;\n  &lt;Editor /&gt;\n&lt;/Suspense&gt;</code></pre>' +
            '<p>W Vue robiles X: stan ladowania konfigurowales wewnatrz komponentu asynchronicznego, wiec kazdy mial swoj wlasny spinner. W Reactie robisz Y: <code>lazy</code> zajmuje sie wylacznie samym importem, a stan ladowania deklarujesz <em>wyzej</em>, granica <code>Suspense</code>. Powod Z: dzieki temu jedna granica moze objac kilka leniwych komponentow i pokazac jeden spojny szkielet zamiast pieciu migajacych spinnerow.</p>' +
            '<h4>Gdzie ciac</h4>' +
            '<ul>' +
            '<li><strong>Po trasach</strong> - najwiekszy zysk przy najmniejszym wysilku, tak samo jak leniwe trasy w Vue Router.</li>' +
            '<li><strong>Ciezkie biblioteki</strong> - edytor tekstu, biblioteka wykresow, mapa, kod eksportu do PDF.</li>' +
            '<li><strong>Rzadkie interakcje</strong> - modal ustawien zaawansowanych, panel administracyjny, kreator importu.</li>' +
            '</ul>' +
            '<p>Nie dziel na drobne kawalki bez potrzeby. Kazdy chunk to osobne zadanie sieciowe, a dwadziescia malych plikow potrafi byc wolniejsze niz jeden sredni, zwlaszcza przy wysokim opoznieniu w sieci komorkowej.</p>' +
            '<p>Zawsze mierz. <code>rollup-plugin-visualizer</code> dla Vite albo <code>@next/bundle-analyzer</code> rysuja mape bundla, na ktorej od razu widac, ze polowa rozmiaru to jedna biblioteka do formatowania dat, ktorej uzywasz w dwoch miejscach.</p>',
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
          pl: '<p>Code splitting optymalizuje metryki startu: LCP i TBT. Rzad wielkosci, ktory warto pamietac - 300 kB JavaScriptu po gzipie to okolo 1,5-2 s samego parsowania i wykonania na sredniej klasy telefonie z Androidem, zanim cokolwiek sie wydarzy. Dlatego budzet dla shella zwykle ustawia sie w okolicach 150-200 kB.</p>' +
            '<h4>Wzorce, ktorych uzywasz w praktyce</h4>' +
            '<pre><code>// 1. Trasa jako granica (React Router)\nconst routes = [{\n  path: "/reports",\n  lazy: async () =&gt; ({ Component: (await import("./Reports")).default })\n}]\n\n// 2. Prefetch na hover - klikniecie jest juz natychmiastowe\nconst load = () =&gt; import("./Editor")\n&lt;Link to="/editor" onMouseEnter={load} onFocus={load}&gt;Editor&lt;/Link&gt;\n\n// 3. Import warunkowy zamiast leniwego komponentu\nasync function exportPdf(doc) {\n  const { jsPDF } = await import("jspdf")\n  return new jsPDF().text(doc.title, 10, 10).save()\n}</code></pre>' +
            '<p>Wzorzec drugi to dokladnie to, co Next.js robi automatycznie dla <code>next/link</code> w widoku, a Nuxt dla <code>NuxtLink</code>. Jesli zostajesz na czystym SPA, dopisz go sam - to kilkanascie linijek, a odczuwalna roznica jest duza.</p>' +
            '<h4>Pulapki</h4>' +
            '<ul>' +
            '<li><strong>Wodospad chunkow</strong> - leniwy komponent, ktory dopiero po zamontowaniu zaczyna pobierac dane, daje dwie serie oczekiwania. Startuj fetch danych rownolegle z importem (loader trasy albo prefetch w TanStack Query).</li>' +
            '<li><strong>Przesuwanie ukladu</strong> - fallback o innej wysokosci niz docelowa tresc psuje CLS. Fallback ma byc szkieletem o tych samych wymiarach, nie spinnerem posrodku.</li>' +
            '<li><strong>Stary chunk po deployu</strong> - uzytkownik z otwarta karta prosi o plik z poprzedniego builda i dostaje 404. Obsluz blad importu i zaproponuj przeladowanie; w Next.js dziala to poprzez granice bledu wokol trasy.</li>' +
            '<li><strong>Fallback przy nawigacji</strong> - <code>startTransition</code> pozwala pokazac stary ekran zamiast fallbacku, dopoki nowa trasa sie laduje; bez tego kazde klikniecie miga szkieletem.</li>' +
            '<li><strong>Duplikacja zaleznosci</strong> - biblioteka uzyta w trzech chunkach zostanie wciagnieta trzy razy, chyba ze bundler wydzieli ja do wspolnego chunku. Sprawdz to w analizatorze, nie w zalozeniach.</li>' +
            '</ul>' +
            '<p>Warto tez pamietac, ze <code>Suspense</code> w Reactie jest ogolniejszym mechanizmem niz w Vue: obsluguje nie tylko leniwe komponenty, ale rowniez pobieranie danych w React Server Components i strumieniowanie HTML z serwera. To ten sam prymityw, ktorego w Vue uzywalibyscie przez <code>&lt;Suspense&gt;</code> z async setup - z ta roznica, ze w Reactie jest to stabilna, powszechnie uzywana czesc architektury, a nie funkcja eksperymentalna.</p>' +
            '<p>Na koniec zdrowa kolejnosc dzialan: najpierw usun to, czego nie potrzebujesz (moment.js, duplikaty lodash, cala biblioteka ikon), potem podziel po trasach, potem dodaj prefetch, a dopiero na koncu dziel na drobniejsze kawalki. Analizator bundla przed i po - inaczej optymalizujesz na wyczucie.</p>',
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
            { pl: 'Kazdy plik komponentu', en: 'Every component file' },
            { pl: 'Wywolanie dynamicznego import()', en: 'A dynamic import() call' },
            { pl: 'Uzycie Suspense', en: 'Using Suspense' },
            { pl: 'Eksport domyslny', en: 'A default export' }
          ],
          correct: 1,
          explain: {
            pl: 'lazy i defineAsyncComponent to tylko opakowania nad dynamicznym importem - to on jest granica podzialu widoczna dla bundlera.',
            en: 'lazy and defineAsyncComponent are only wrappers over a dynamic import - the import is the split point the bundler sees.'
          }
        },
        {
          q: {
            pl: 'Czym rozni sie obsluga stanu ladowania w React lazy od defineAsyncComponent w Vue?',
            en: 'How does the loading state differ between React lazy and Vue defineAsyncComponent?'
          },
          options: [
            { pl: 'React nie obsluguje stanu ladowania w ogole', en: 'React has no loading state at all' },
            { pl: 'Vue laduje synchronicznie, React asynchronicznie', en: 'Vue loads synchronously, React asynchronously' },
            { pl: 'W Vue spinner konfigurujesz w komponencie, w Reactie deklarujesz go wyzej jako fallback granicy Suspense', en: 'In Vue the spinner is configured on the component, in React it is declared above as a Suspense boundary fallback' },
            { pl: 'React wymaga osobnego chunku na kazdy spinner', en: 'React requires a separate chunk for each spinner' }
          ],
          correct: 2,
          explain: {
            pl: 'Przeniesienie fallbacku wyzej pozwala jednej granicy obsluzyc kilka leniwych elementow naraz i pokazac jeden szkielet.',
            en: 'Hoisting the fallback lets one boundary cover several lazy elements at once and show a single skeleton.'
          }
        },
        {
          q: {
            pl: 'Ktore ciecie da zwykle najwiekszy zysk przy najmniejszym nakladzie?',
            en: 'Which split usually gives the biggest win for the least effort?'
          },
          options: [
            { pl: 'Podzial po trasach', en: 'Splitting by route' },
            { pl: 'Osobny chunk dla kazdego przycisku', en: 'A separate chunk for every button' },
            { pl: 'Podzial plikow CSS', en: 'Splitting the CSS files' },
            { pl: 'Przeniesienie typow TypeScript do osobnego pakietu', en: 'Moving TypeScript types into a separate package' }
          ],
          correct: 0,
          explain: {
            pl: 'Trasa to naturalna granica: uzytkownik i tak jest w danej chwili tylko na jednej, a przejscie miedzy nimi ma juz zaakceptowany kontekst ladowania.',
            en: 'A route is a natural boundary: the user is only on one at a time, and navigating already carries an accepted loading context.'
          }
        },
        {
          q: {
            pl: 'Po wdrozeniu code splittingu nawigacja miga szkieletem przy kazdym klikniecu, mimo ze chunki sa male. Co pomoze najbardziej?',
            en: 'After adding code splitting, navigation flashes a skeleton on every click even though the chunks are small. What helps most?'
          },
          options: [
            { pl: 'Zwiekszyc rozmiar chunkow, laczac trasy', en: 'Increase chunk size by merging routes back together' },
            { pl: 'Prefetch na hover plus startTransition, zeby stary ekran zostal do czasu zaladowania', en: 'Prefetch on hover plus startTransition so the old screen stays until the new one is ready' },
            { pl: 'Zastapic Suspense recznym useState z flaga loading', en: 'Replace Suspense with a manual useState loading flag' },
            { pl: 'Wylaczyc cache HTTP dla chunkow', en: 'Disable HTTP caching for chunks' }
          ],
          correct: 1,
          explain: {
            pl: 'Problemem nie jest rozmiar, tylko moment: prefetch usuwa oczekiwanie jeszcze przed klikniecem, a startTransition sprawia, ze React nie zastepuje widocznej tresci fallbackiem.',
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
          term: { pl: 'Hierarchia zapytan', en: 'Query hierarchy' },
          def: { pl: 'Kolejnosc wyboru selektora: <code>getByRole</code> z dostepna nazwa, potem <code>getByLabelText</code>, potem <code>getByText</code>, a <code>getByTestId</code> na koncu. Test, ktorego nie da sie napisac po roli, zwykle wskazuje realny problem z dostepnoscia.', en: 'The selector order: <code>getByRole</code> with an accessible name, then <code>getByLabelText</code>, then <code>getByText</code>, with <code>getByTestId</code> last. A test you cannot write by role usually points at a genuine accessibility problem.' }
        },
        {
          term: { pl: 'userEvent', en: 'userEvent' },
          def: { pl: 'Symulacja pelnej sekwencji interakcji (pointerdown, focus, keydown, input) zamiast pojedynczego syntetycznego zdarzenia z <code>fireEvent</code>. Lapie bledy, ktorych klikniecie nie dotyka.', en: 'Replays the whole interaction sequence (pointerdown, focus, keydown, input) instead of the single synthetic event <code>fireEvent</code> dispatches. It catches bugs a plain click never touches.' }
        },
        {
          term: { pl: 'findBy* i waitFor', en: 'findBy* and waitFor' },
          def: { pl: 'Asynchroniczne oczekiwanie na wynik. React nie ma jednego deterministycznego ticka jak <code>nextTick()</code> - czekasz na efekt, nie na cykl.', en: 'Asynchronous waiting for a result. React has no single deterministic tick like <code>nextTick()</code> - you wait for an outcome, not for a cycle.' }
        },
        {
          term: { pl: 'act()', en: 'act()' },
          def: { pl: 'Opakowanie gwarantujace, ze aktualizacje stanu zostana przetworzone przed asercja. Ostrzezenie "not wrapped in act" prawie zawsze oznacza brakujacy <code>await</code> albo niewyczyszczony timer.', en: 'A wrapper guaranteeing state updates are flushed before your assertion. The "not wrapped in act" warning almost always means a missing <code>await</code> or an uncleaned timer.' }
        },
        {
          term: { pl: 'MSW', en: 'MSW' },
          def: { pl: 'Mock Service Worker - mockowanie na poziomie sieci, nie modulu. Te same handlery dzialaja w projekcie Vue i Reactowym oraz w Playwrighcie.', en: 'Mock Service Worker - mocking at the network level rather than the module level. The same handlers work in a Vue project, a React one and in Playwright.' }
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
          pl: 'Stos testowy jest niemal identyczny w obu swiatach - zmienia sie tylko biblioteka renderujaca i to, czy siegasz do wnetrza komponentu, czy tylko do tego, co widzi uzytkownik.',
          en: 'The testing stack is nearly identical in both worlds - only the render library changes, and whether you reach into component internals or stay with what the user can see.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Sa dwa sposoby sprawdzenia, czy ekspres do kawy dziala. Pierwszy: rozkrecic obudowe i zmierzyc napiecie na kazdym kabelku. Drugi: wcisnac przycisk i zobaczyc, czy do kubka leci kawa.</p>' +
            '<p>Drugi sposob jest lepszy, bo nie obchodzi go, jak ekspres jest zbudowany w srodku. Mozesz wymienic pol mechanizmu, a test nadal bedzie mial sens - sprawdza to, czego oczekuje czlowiek, a nie to, jak inzynier ulozyl kable.</p>' +
            '<p>Testowanie komponentow dziala tak samo. Zamiast pytac "czy zmienna isOpen ma wartosc true", pytasz "czy widze na ekranie okno z tekstem Zapisz". Kiedy potem przepiszesz komponent, test przezyje. Testy, ktore rozkrecaja obudowe, psuja sie przy kazdym remoncie - i to one sprawiaja, ze ludzie zaczynaja nienawidzic testow.</p>',
          en: '<p>There are two ways to check whether a coffee machine works. One: unscrew the case and measure the voltage on every wire. Two: press the button and see whether coffee comes out.</p>' +
            '<p>The second way is better because it does not care how the machine is built inside. You can replace half the mechanism and the test still makes sense - it checks what a human expects rather than how an engineer routed the wiring.</p>' +
            '<p>Component testing works the same way. Instead of asking "is the isOpen variable true", you ask "can I see a dialog with the text Save on screen". When you later rewrite the component, the test survives. Tests that unscrew the case break during every renovation - and those are the tests that make people start hating testing.</p>'
        },
        school: {
          pl: '<p>Vue Test Utils daje ci <code>wrapper</code>, czyli uchwyt do instancji komponentu. Mozesz przez niego czytac <code>vm</code>, ustawiac dane przez <code>setData</code>, sprawdzac <code>emitted()</code> i wyszukiwac po <code>findComponent</code>. To wygodne, ale wiaze test z budowa komponentu.</p>' +
            '<p>React Testing Library takiego uchwytu nie ma i to jest celowe. Dostajesz zamontowany DOM i zapytania takie, jakich uzylby uzytkownik lub czytnik ekranu.</p>' +
            '<pre><code>// Vue Test Utils\nconst wrapper = mount(Counter)\nawait wrapper.find("button").trigger("click")\nexpect(wrapper.vm.count).toBe(1)\n\n// React Testing Library\nrender(&lt;Counter /&gt;)\nawait userEvent.click(screen.getByRole("button", { name: /add/i }))\nexpect(screen.getByText("1")).toBeInTheDocument()</code></pre>' +
            '<p>W Vue robiles X: sprawdzales stan wewnetrzny, bo byl pod reka. W Reactie robisz Y: sprawdzasz to, co pojawilo sie na ekranie, bo stanu w hooku po prostu nie da sie odczytac z zewnatrz. Powod Z: to ograniczenie okazalo sie zaleta - test przezywa refaktor z useState na useReducer albo na store, bo nie wie, jak komponent jest zbudowany w srodku.</p>' +
            '<h4>Ta sama filozofia w Vue</h4>' +
            '<p>Istnieje <code>@testing-library/vue</code>, ktore daje dokladnie te same zapytania dla komponentow Vue. Jesli piszesz tak juz dzisiaj, przesiadka na React kosztuje cie jedna linijke: <code>render(&lt;Counter /&gt;)</code> zamiast <code>render(Counter)</code>. Reszta pliku testowego wyglada identycznie, lacznie z <code>screen</code>, <code>userEvent</code> i <code>waitFor</code>.</p>' +
            '<p>Runner tez zostaje ten sam. Vitest, jsdom, snapshoty, coverage - konfiguracja rozni sie jedna wtyczka: <code>@vitejs/plugin-react</code> zamiast <code>@vitejs/plugin-vue</code>.</p>',
          en: '<p>Vue Test Utils hands you a <code>wrapper</code>, a handle on the component instance. Through it you read <code>vm</code>, set data with <code>setData</code>, inspect <code>emitted()</code> and search with <code>findComponent</code>. Convenient, but it ties the test to how the component is built.</p>' +
            '<p>React Testing Library gives you no such handle, and that is deliberate. You get a mounted DOM and queries shaped the way a user or a screen reader would look at it.</p>' +
            '<pre><code>// Vue Test Utils\nconst wrapper = mount(Counter)\nawait wrapper.find("button").trigger("click")\nexpect(wrapper.vm.count).toBe(1)\n\n// React Testing Library\nrender(&lt;Counter /&gt;)\nawait userEvent.click(screen.getByRole("button", { name: /add/i }))\nexpect(screen.getByText("1")).toBeInTheDocument()</code></pre>' +
            '<p>In Vue you did X: you asserted on internal state because it was right there. In React you do Y: you assert on what appeared on screen, because hook state simply cannot be read from outside. Reason Z: that limitation turned out to be a feature - the test survives a refactor from useState to useReducer or to a store, because it never knew how the component was built.</p>' +
            '<h4>The same philosophy in Vue</h4>' +
            '<p>There is <code>@testing-library/vue</code>, which offers exactly the same queries for Vue components. If you already write tests that way, moving to React costs you one line: <code>render(&lt;Counter /&gt;)</code> instead of <code>render(Counter)</code>. The rest of the file looks identical, including <code>screen</code>, <code>userEvent</code> and <code>waitFor</code>.</p>' +
            '<p>The runner stays the same too. Vitest, jsdom, snapshots, coverage - the configuration differs by one plugin: <code>@vitejs/plugin-react</code> instead of <code>@vitejs/plugin-vue</code>.</p>'
        },
        pro: {
          pl: '<p>Zasada przewodnia Testing Library brzmi: im bardziej test przypomina sposob uzywania aplikacji, tym wieksza daje pewnosc. Praktycznie oznacza to hierarchie zapytan - najpierw <code>getByRole</code> z nazwa dostepna, potem <code>getByLabelText</code> dla formularzy, potem <code>getByText</code>, a <code>getByTestId</code> dopiero jako ostatnia deska ratunku. Efekt uboczny jest przyjemny: test, ktorego nie da sie napisac przez role, zwykle wskazuje realny problem z dostepnoscia.</p>' +
            '<h4>Rzeczy, ktore w Reactie robi sie inaczej</h4>' +
            '<ul>' +
            '<li><strong>Zdarzenia</strong> - uzywaj <code>userEvent</code>, nie <code>fireEvent</code>. userEvent odtwarza pelna sekwencje (pointerdown, focus, keydown, input), przez co lapie bledy, ktorych sztuczny click nie dotknie.</li>' +
            '<li><strong>Asynchronicznosc</strong> - <code>findBy*</code> i <code>waitFor</code> zamiast <code>await nextTick()</code>. React nie ma jednego, deterministycznego tiku jak Vue; ma kolejki zadan i transitions, wiec czekasz na <em>rezultat</em>, a nie na cykl.</li>' +
            '<li><strong>act()</strong> - RTL owija zdarzenia w act automatycznie. Ostrzezenie "not wrapped in act" prawie zawsze oznacza aktualizacje stanu po zakonczeniu testu, czyli brakujace <code>await</code> lub niesprzatniety timer.</li>' +
            '<li><strong>Hooki</strong> - <code>renderHook</code> z <code>@testing-library/react</code> testuje customowy hook bez komponentu, tak jak testowales composable, wywolujac go w <code>withSetup</code>.</li>' +
            '</ul>' +
            '<pre><code>test("saves the profile", async () =&gt; {\n  const user = userEvent.setup()\n  render(&lt;ProfileForm onSave={onSave} /&gt;, { wrapper: Providers })\n\n  await user.type(screen.getByLabelText(/display name/i), "Ada")\n  await user.click(screen.getByRole("button", { name: /save/i }))\n\n  expect(await screen.findByText(/saved/i)).toBeVisible()\n  expect(onSave).toHaveBeenCalledWith({ displayName: "Ada" })\n})</code></pre>' +
            '<p>Zwroc uwage na opcje <code>wrapper</code>. W Vue montowales z <code>global.plugins</code>, podajac router, Pinie i i18n. W Reactie opakowujesz komponent w te same providery jako drzewo JSX - to ta sama idea, inna skladnia. Warto miec wlasne <code>renderWithProviders</code> i eksportowac je zamiast surowego <code>render</code>.</p>' +
            '<h4>Sensowna piramida</h4>' +
            '<p>Testy jednostkowe czystych funkcji i hookow sa tanie i szybkie. Testy komponentow w jsdom to trzon - zwykle 60-70 procent zestawu, kilkaset milisekund na plik. Sieciowe zaleznosci mockuj przez <strong>MSW</strong>, nie przez podmienianie <code>fetch</code>; ten sam handler zadzialal ci w Vue i zadziala tu, bo operuje na poziomie sieci, a nie modulu. Na koncu kilkadziesiat scenariuszy end-to-end w Playwright plus testy komponentowe Playwrighta dla tych przypadkow, w ktorych jsdom klamie: prawdziwy layout, focus trap, przewijanie, IntersectionObserver.</p>' +
            '<p>Czego unikac: snapshotow calych drzew (nikt ich nie czyta, wszyscy je zatwierdzaja w ciemno), asercji na klasach CSS, testow, ktore wolaja setter stanu zamiast klikac. Jesli test wie, ze komponent uzywa useReducer, przetrwa refaktor tylko przypadkiem.</p>',
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
            pl: 'Dlaczego React Testing Library nie daje dostepu do stanu komponentu?',
            en: 'Why does React Testing Library give no access to component state?'
          },
          options: [
            { pl: 'Bo React nie ma stanu lokalnego', en: 'Because React has no local state' },
            { pl: 'Bo to celowa decyzja: test ma sprawdzac zachowanie widoczne dla uzytkownika, nie budowe komponentu', en: 'Because it is deliberate: tests should assert user-visible behaviour rather than component internals' },
            { pl: 'Bo jsdom nie potrafi odczytac hookow', en: 'Because jsdom cannot read hooks' },
            { pl: 'Bo dostep do stanu jest platny w wersji enterprise', en: 'Because state access is a paid enterprise feature' }
          ],
          correct: 1,
          explain: {
            pl: 'Test oparty na wyniku widocznym w DOM przezywa refaktor implementacji, a to jest glowny powod, dla ktorego w ogole pisze sie testy komponentow.',
            en: 'A test based on what is visible in the DOM survives an implementation refactor, which is the main reason to write component tests at all.'
          }
        },
        {
          q: {
            pl: 'Co jest odpowiednikiem await nextTick() z Vue w testach Reacta?',
            en: 'What is the React testing equivalent of await nextTick() from Vue?'
          },
          options: [
            { pl: 'await flushPromises() zawsze i wszedzie', en: 'await flushPromises() everywhere' },
            { pl: 'setTimeout z zerem', en: 'setTimeout with zero delay' },
            { pl: 'Reczne wywolanie rerender()', en: 'Calling rerender() manually' },
            { pl: 'findBy* albo waitFor, czyli czekanie na rezultat zamiast na cykl', en: 'findBy* or waitFor - waiting for a result instead of a cycle' }
          ],
          correct: 3,
          explain: {
            pl: 'React nie ma jednego deterministycznego tiku, wiec czekasz na warunek koncowy. To rowniez czyni test odporniejszym na zmiane sposobu aktualizacji.',
            en: 'React has no single deterministic tick, so you wait for an end condition. That also makes the test resilient to changes in how updates are scheduled.'
          }
        },
        {
          q: {
            pl: 'Ktore zapytanie powinno byc pierwszym wyborem?',
            en: 'Which query should be your first choice?'
          },
          options: [
            { pl: 'getByRole z nazwa dostepna', en: 'getByRole with an accessible name' },
            { pl: 'getByTestId', en: 'getByTestId' },
            { pl: 'container.querySelector po klasie CSS', en: 'container.querySelector by CSS class' },
            { pl: 'getByDisplayValue', en: 'getByDisplayValue' }
          ],
          correct: 0,
          explain: {
            pl: 'Role odpowiadaja temu, jak element widzi uzytkownik i czytnik ekranu. Jesli nie da sie znalezc elementu po roli, zwykle brakuje mu etykiety lub semantyki.',
            en: 'Roles match how a user and a screen reader perceive the element. If you cannot find something by role, it usually lacks a label or proper semantics.'
          }
        },
        {
          q: {
            pl: 'Test przechodzi lokalnie, ale w CI rzuca ostrzezenie "not wrapped in act". Co jest najbardziej prawdopodobna przyczyna?',
            en: 'A test passes locally but warns "not wrapped in act" in CI. What is the most likely cause?'
          },
          options: [
            { pl: 'Brakuje wywolania act wokol render', en: 'A missing act call around render' },
            { pl: 'jsdom jest w zlej wersji', en: 'jsdom is on the wrong version' },
            { pl: 'Stan aktualizuje sie po zakonczeniu testu - brak await na asercji asynchronicznej albo niesprzatniety timer', en: 'State updates after the test finished - a missing await on an async assertion, or an uncleaned timer' },
            { pl: 'Uzyto userEvent zamiast fireEvent', en: 'userEvent was used instead of fireEvent' }
          ],
          correct: 2,
          explain: {
            pl: 'RTL owija zdarzenia w act samo, wiec ostrzezenie prawie zawsze wskazuje na wyciekajaca asynchronicznosc: nieoczekiwane zapytanie, timer albo subskrypcje bez czyszczenia. Dodawanie recznego act tylko zaklada plaster na objaw.',
            en: 'RTL wraps events in act for you, so the warning almost always points at leaking asynchrony: an unawaited request, a timer, or a subscription without cleanup. Adding manual act only bandages the symptom.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 6
    {
      id: 'vue-to-react-cheatsheet',
      title: {
        pl: 'Sciaga migracyjna Vue -> React',
        en: 'The Vue-to-React migration cheatsheet'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Strangler fig', en: 'Strangler fig' },
          def: { pl: 'Migracja przez wspolistnienie: reverse proxy kieruje wybrane sciezki do nowej aplikacji, a stara dziala dalej. Najbezpieczniejsza strategia, kosztem podwojonego bundla na granicy.', en: 'Migration by coexistence: a reverse proxy routes selected paths to the new app while the old one keeps running. The safest strategy, at the cost of a doubled bundle at the boundary.' }
        },
        {
          term: { pl: 'Web components jako most', en: 'Web components as a bridge' },
          def: { pl: 'Komponenty design systemu opakowane w custom elements dzialaja w obu swiatach. Uwaga na propsy obiektowe i zdarzenia - atrybuty przenosza wylacznie stringi.', en: 'Design system components wrapped as custom elements work in both worlds. Watch out for object props and events - attributes carry strings only.' }
        },
        {
          term: { pl: 'Warstwa domenowa', en: 'Framework-agnostic domain layer' },
          def: { pl: 'Walidacja zod, klienci API i formatowanie wyciagniete do pakietu niezaleznego od frameworka. Zwykle 30-40 procent kodu, ktory przenosi sie bez zmian.', en: 'Zod validation, API clients and formatting extracted into a framework-agnostic package. Typically 30-40 percent of the code, and it moves unchanged.' }
        },
        {
          term: { pl: 'Kontrakt value/onChange', en: 'The value/onChange contract' },
          def: { pl: 'Reactowy odpowiednik <code>v-model</code>: zamiast dwukierunkowego wiazania przekazujesz jawnie <code>value</code> i <code>onChange</code>.', en: 'The React equivalent of <code>v-model</code>: instead of two-way binding you pass <code>value</code> and <code>onChange</code> explicitly.' }
        },
        {
          term: { pl: 'Stale closure', en: 'Stale closure' },
          def: { pl: 'Funkcja pamieta wartosci z renderu, ktory ja stworzyl. W Vue problem nie istnial, bo czytales przez proxy. Lekarstwo: forma updater, <code>useRef</code> i uczciwe tablice zaleznosci.', en: 'A function remembers the values from the render that created it. In Vue this did not exist, because you read through a proxy. The cure: the updater form, <code>useRef</code> and honest dependency arrays.' }
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
          pl: 'Mapa pojec: wiekszosc rzeczy ma bezposredni odpowiednik, ale kilka trzeba przemyslec od nowa - zwlaszcza niemutowalnosc i v-model.',
          en: 'The concept map: most things map directly, but a few must be rethought - immutability and v-model above all.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>To troche tak jak przesiadka z auta z automatem na auto z manualem. Jedziesz w to samo miejsce, znasz zasady ruchu, umiesz parkowac. Zmienia sie to, ile decyzji podejmujesz sam.</p>' +
            '<p>Vue duzo robilo za ciebie w tle: pilnowalo, co sie zmienilo, i odswiezalo dokladnie to jedno miejsce. React mowi: powiedz mi wprost, kiedy cos jest nowe, a ja przerysuje ten fragment ekranu od poczatku.</p>' +
            '<p>Dlatego przy przesiadce najwazniejsze nie jest nauczenie sie nowych nazw. Najwazniejsze jest jedno przyzwyczajenie: nie zmieniaj starego obiektu, tylko zrob nowy. Reszta - inne slowa na to samo - wchodzi w kilka dni. To nawyk zajmuje kilka tygodni, bo palce pamietaja stara droge.</p>',
          en: '<p>It is a bit like moving from an automatic car to a manual one. Same destination, same traffic rules, you still know how to park. What changes is how many decisions you make yourself.</p>' +
            '<p>Vue did a lot in the background: it tracked what changed and refreshed exactly that one spot. React says: tell me explicitly when something is new and I will redraw that piece of the screen from scratch.</p>' +
            '<p>So the important part of switching is not learning new names. It is one habit: do not change the old object, make a new one. The rest - different words for the same thing - lands within days. The habit takes weeks, because your fingers remember the old route.</p>'
        },
        school: {
          pl: '<p>Zacznijmy od tabeli, ktora warto miec przypieta nad biurkiem.</p>' +
            '<table>' +
            '<tr><th>Vue 3</th><th>React 19</th></tr>' +
            '<tr><td>ref, reactive</td><td>useState, useReducer</td></tr>' +
            '<tr><td>computed</td><td>zwykle wyrazenie, useMemo gdy drogie</td></tr>' +
            '<tr><td>watch, watchEffect</td><td>useEffect - tylko do synchronizacji z zewnetrznym swiatem</td></tr>' +
            '<tr><td>props + emit</td><td>props + funkcje w propsach (onChange)</td></tr>' +
            '<tr><td>v-model</td><td>value + onChange (kontrolowane pole)</td></tr>' +
            '<tr><td>slots, scoped slots</td><td>children, props typu ReactNode, render props</td></tr>' +
            '<tr><td>provide / inject</td><td>Context</td></tr>' +
            '<tr><td>composables</td><td>custom hooks</td></tr>' +
            '<tr><td>Pinia</td><td>Zustand (klient) + TanStack Query (serwer)</td></tr>' +
            '<tr><td>Vue Router, Nuxt</td><td>React Router, Next.js</td></tr>' +
            '</table>' +
            '<p>Najwiekszy prog to nie tabela, tylko sposob aktualizacji.</p>' +
            '<pre><code>// Vue: mutujesz, proxy zauwazy\nstate.user.name = "Ada"\nstate.items.push(item)\n\n// React: tworzysz nowa referencje\nsetUser(u =&gt; ({ ...u, name: "Ada" }))\nsetItems(items =&gt; [...items, item])</code></pre>' +
            '<p>W Vue robiles X, czyli mutowales obiekt, bo proxy przechwytywalo zapis. W Reactie robisz Y, czyli zwracasz nowa wartosc. Powod Z jest prosty: React nie obserwuje twoich obiektow, tylko porownuje referencje z poprzedniego renderu, wiec mutacja jest dla niego niewidoczna i ekran po prostu sie nie odswiezy.</p>' +
            '<p>Druga pulapka to <code>useEffect</code>. To nie jest <code>watch</code>. Jesli piszesz efekt tylko po to, zeby przeliczyc jedna wartosc z drugiej, prawie zawsze wystarczy zwykle wyrazenie w ciele komponentu. Efekt zostaw dla rzeczy spoza Reacta: subskrypcji, timerow, integracji z biblioteka, ktora sama trzyma stan.</p>' +
            '<p>Trzecia rzecz to sposob czytania kodu. W SFC szukales trzech blokow: template, script, style. W Reactie komponent jest jedna funkcja, ktora zwraca JSX, a style siedza obok jako CSS Modules albo klasy narzedziowe. Po tygodniu ta jednorodnosc zaczyna byc wygodna: caly komponent czytasz od gory do dolu, bez skakania miedzy sekcjami.</p>',
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
          pl: '<p>Migracja calego produktu rzadko wyglada jak przepisanie. Wyglada jak wspolistnienie: nowe ekrany w Reactie, stare w Vue, wspolna warstwa danych i wspolne tokeny designu.</p>' +
            '<h4>Strategie</h4>' +
            '<ul>' +
            '<li><strong>Strangler fig po trasach</strong> - reverse proxy kieruje wybrane sciezki do nowej aplikacji. Najprostsze i najbezpieczniejsze; wada to podwojony bundle na granicy.</li>' +
            '<li><strong>Web components jako most</strong> - komponenty designu opakowane w custom elements dzialaja w obu swiatach. Uwaga na propsy obiektowe i zdarzenia: przez atrybuty przechodza tylko stringi, wiec potrzebujesz cienkiego wrappera z <code>ref</code>.</li>' +
            '<li><strong>Micro-frontends</strong> - Module Federation lub import maps. Wybieraj tylko wtedy, gdy granica jest rowniez granica zespolu, inaczej kupujesz koszt operacyjny bez zysku.</li>' +
            '<li><strong>Wspolna logika</strong> - warstwe domenowa (walidacja zod, klienci API, formatowanie) wyciagnij do pakietu bez zaleznosci od frameworka jeszcze <em>przed</em> migracja. To zwykle 30-40 procent kodu i przenosi sie bez zmian.</li>' +
            '</ul>' +
            '<h4>Pulapki, ktore kosztuja najwiecej czasu</h4>' +
            '<pre><code>// v-model na komponencie -&gt; jawny kontrakt w Reactie\n// Vue\n&lt;CurrencyInput v-model="amount" /&gt;\n\n// React\n&lt;CurrencyInput value={amount} onChange={setAmount} /&gt;</code></pre>' +
            '<ul>' +
            '<li><strong>Formularze</strong> - kontrolowane pola przy kazdym znaku renderuja formularz. Przy duzych formularzach uzyj React Hook Form (niekontrolowane pola z refami) - to najblizszy odpowiednik komfortu, ktory dawalo vee-validate razem z v-model.</li>' +
            '<li><strong>Reguly hookow</strong> - brak warunkowych wywolan i brak petli. W composables mogles wolac co chciales i gdzie chciales, bo setup wykonywal sie raz.</li>' +
            '<li><strong>Stale closure</strong> - funkcja pamieta wartosci z renderu, w ktorym powstala. W Vue nie istnialo, bo czytales z proxy. Lekarstwo: forma funkcyjna settera, <code>useRef</code> dla wartosci mutowalnych, poprawne zaleznosci.</li>' +
            '<li><strong>Podwojne wywolanie efektow</strong> - <code>StrictMode</code> montuje, odmontowuje i montuje ponownie. To nie bug, to test, czy sprzatasz po sobie.</li>' +
            '<li><strong>Style</strong> - <code>scoped</code> z SFC nie ma odpowiednika w rdzeniu Reacta. Uzyj CSS Modules (najblizsze), Tailwinda albo istniejacych tokenow z systemu designu.</li>' +
            '</ul>' +
            '<h4>Plan na pierwsze tygodnie</h4>' +
            '<ol>' +
            '<li>Wydziel logike domenowa do pakietu niezaleznego od frameworka i przykryj ja testami.</li>' +
            '<li>Zbuduj jeden ekran w Reactie od zera - najlepiej sredniej trudnosci, z formularzem i lista.</li>' +
            '<li>Ustal warstwe danych: TanStack Query dla stanu serwera, Zustand dla reszty. Nie odtwarzaj Pinii jeden do jednego.</li>' +
            '<li>Skonfiguruj Vitest plus Testing Library w tym samym repo, zeby oba swiaty raportowaly do jednego CI.</li>' +
            '<li>Wlacz React Compiler i wtyczke ESLint z regulami hookow - kompilator wychwyci wiekszosc odruchow z Vue, ktore lamia reguly.</li>' +
            '</ol>' +
            '<p>Perspektywa na rozmowe kwalifikacyjna: seniorow z Vue ceni sie za to, ze rozumieja koszt reaktywnosci. Umiejetnosc powiedzenia, dlaczego React wybral niemutowalnosc i ponowne wykonywanie funkcji zamiast sledzenia zaleznosci - i co ten wybor daje w zamian (przewidywalnosc, concurrent rendering, server components) - jest warta wiecej niz znajomosc kazdego hooka z osobna.</p>',
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
            { pl: 'Funkcja przekazana jako props, na przyklad onChange', en: 'A function passed as a prop, for example onChange' },
            { pl: 'dispatchEvent na elemencie DOM', en: 'dispatchEvent on the DOM element' },
            { pl: 'Kontekst z providerem zdarzen', en: 'A context with an event provider' },
            { pl: 'useImperativeHandle', en: 'useImperativeHandle' }
          ],
          correct: 0,
          explain: {
            pl: 'React nie ma osobnego kanalu zdarzen komponentu - dane ida w dol jako propsy, a informacje w gore przekazujesz wywolujac funkcje otrzymana w propsach.',
            en: 'React has no separate component event channel - data flows down as props and you send information up by calling a function received in props.'
          }
        },
        {
          q: {
            pl: 'Dlaczego mutacja obiektu w stanie Reacta nie odswieza ekranu?',
            en: 'Why does mutating an object in React state not update the screen?'
          },
          options: [
            { pl: 'Bo React zamraza obiekty stanu', en: 'Because React freezes state objects' },
            { pl: 'Bo React porownuje referencje z poprzedniego renderu i nie obserwuje zapisow do obiektu', en: 'Because React compares references from the previous render and does not observe writes to the object' },
            { pl: 'Bo mutacja dziala tylko poza StrictMode', en: 'Because mutation only works outside StrictMode' },
            { pl: 'Bo trzeba wywolac forceUpdate po kazdej mutacji', en: 'Because you must call forceUpdate after each mutation' }
          ],
          correct: 1,
          explain: {
            pl: 'Vue widzialo zapis dzieki proxy, React nie ma takiego przechwycenia. Dlatego kontraktem aktualizacji jest nowa referencja, a nie zmieniona zawartosc.',
            en: 'Vue saw the write through a proxy; React has no such interception. That is why the update contract is a new reference rather than changed contents.'
          }
        },
        {
          q: {
            pl: 'Ktore stwierdzenie o useEffect w kontekscie migracji jest prawdziwe?',
            en: 'Which statement about useEffect in a migration context is true?'
          },
          options: [
            { pl: 'To dokladny odpowiednik watch i tak nalezy go uzywac', en: 'It is an exact watch equivalent and should be used that way' },
            { pl: 'Uruchamia sie przed renderem, wiec zastepuje computed', en: 'It runs before render, so it replaces computed' },
            { pl: 'Sluzy do synchronizacji z zewnetrznym swiatem, a wartosci pochodne licz zwyklym wyrazeniem', en: 'It exists to synchronize with the outside world; derive values with a plain expression instead' },
            { pl: 'Nie mozna go czyscic, w przeciwienstwie do watch z opcja stop', en: 'It cannot be cleaned up, unlike a watch with a stop handle' }
          ],
          correct: 2,
          explain: {
            pl: 'Efekt uzyty do liczenia stanu z innego stanu daje dodatkowy render i latwo prowadzi do niespojnosci. Reguly hookow i dokumentacja Reacta nazywaja to wprost antywzorcem.',
            en: 'An effect used to compute state from other state causes an extra render and easily drifts out of sync. React documentation calls this out explicitly as an anti-pattern.'
          }
        },
        {
          q: {
            pl: 'Migrujesz duzy produkt Vue do Reacta bez zatrzymywania rozwoju. Ktore podejscie ma najlepszy stosunek ryzyka do efektu?',
            en: 'You are migrating a large Vue product to React without pausing feature work. Which approach has the best risk-to-reward ratio?'
          },
          options: [
            { pl: 'Przepisac cala aplikacje w osobnej galezi i wdrozyc jednym duzym releasem', en: 'Rewrite the whole app in a branch and ship it in one big release' },
            { pl: 'Zaczac od Module Federation, zeby kazdy komponent mogl byc w dowolnym frameworku', en: 'Start with Module Federation so any component can live in either framework' },
            { pl: 'Wyciagnac logike domenowa do pakietu bez frameworka i migrowac trasa po trasie', en: 'Extract domain logic into a framework-agnostic package and migrate route by route' },
            { pl: 'Uruchomic React wewnatrz kazdego komponentu Vue przez mikroaplikacje', en: 'Mount React inside every Vue component as a micro app' }
          ],
          correct: 2,
          explain: {
            pl: 'Wydzielenie logiki daje natychmiastowa wartosc niezaleznie od migracji, a granica trasy jest naturalna i odwracalna. Duzy przepis i mikrofrontendy dokladaja ryzyko i koszt operacyjny, ktory rzadko sie zwraca.',
            en: 'Extracting logic pays off immediately regardless of the migration, and a route boundary is natural and reversible. A big-bang rewrite and micro-frontends add risk and operational cost that rarely pays back.'
          }
        }
      ]
    }
  ]
};
