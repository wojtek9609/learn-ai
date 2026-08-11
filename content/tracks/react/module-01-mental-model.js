// Track react - Module 01 - Mental model (React for senior Vue devs)
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema" + "v4").

export default {
  id: 'mental-model',
  order: 1,
  icon: '🧭',
  title: {
    pl: 'Model mentalny Reacta',
    en: 'The React mental model'
  },
  description: {
    pl: 'Jak myslec o UI w Reactcie, gdy masz w glowie Vue: JSX zamiast template, re-render zamiast reaktywnosci, klucze zamiast trackowania zaleznosci.',
    en: 'How to think about UI in React when your head is full of Vue: JSX instead of templates, re-renders instead of fine-grained reactivity, keys instead of dependency tracking.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'thinking-in-react',
      title: {
        pl: 'Myslenie w Reactcie',
        en: 'Thinking in React'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="r1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
          '<rect x="30" y="30" width="230" height="120" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="145" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Mockup</text>' +
          '<rect x="52" y="72" width="186" height="20" rx="4" fill="var(--border)"/>' +
          '<rect x="52" y="100" width="120" height="16" rx="4" fill="var(--border)"/>' +
          '<rect x="52" y="122" width="150" height="16" rx="4" fill="var(--border)"/>' +
          '<line x1="262" y1="90" x2="320" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#r1a)"/>' +
          '<rect x="330" y="30" width="140" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="400" y="58" text-anchor="middle" font-size="14" fill="var(--text)">App (state)</text>' +
          '<line x1="380" y1="74" x2="360" y2="108" stroke="var(--accent)" stroke-width="2" marker-end="url(#r1a)"/>' +
          '<line x1="425" y1="74" x2="500" y2="108" stroke="var(--accent)" stroke-width="2" marker-end="url(#r1a)"/>' +
          '<rect x="290" y="114" width="140" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="360" y="142" text-anchor="middle" font-size="14" fill="var(--text)">SearchBar</text>' +
          '<rect x="450" y="114" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="525" y="142" text-anchor="middle" font-size="14" fill="var(--text)">ProductList</text>' +
          '<text x="330" y="196" font-size="14" fill="var(--accent)">props go down</text>' +
          '<text x="330" y="218" font-size="14" fill="var(--warn)">events go up</text>' +
          '<path d="M 360 158 L 360 250" fill="none" stroke="var(--warn)" stroke-width="2" marker-end="url(#r1b)" stroke-dasharray="6 5"/>' +
          '<rect x="60" y="250" width="520" height="120" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="280" text-anchor="middle" font-size="15" fill="var(--text)">One source of truth, one owner</text>' +
          '<text x="320" y="306" text-anchor="middle" font-size="13" fill="var(--muted)">state lives in the closest common parent</text>' +
          '<text x="320" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">children get props and callbacks, never mutate them</text>' +
          '<text x="320" y="354" text-anchor="middle" font-size="13" fill="var(--ok)">UI = f(state)</text>' +
          '</svg>',
        caption: {
          pl: 'Droga od makiety do drzewa komponentow: dzielisz UI na czesci, stan trzymasz w najblizszym wspolnym rodzicu, w dol leca propsy, w gore zdarzenia.',
          en: 'From mockup to component tree: split the UI, keep state in the closest common parent, send props down and events up.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze budujesz makiete miasta z klockow. Kazdy budynek to osobny klocek, ktory sam w sobie nic nie wie - dostaje karteczke z opisem: ile ma pieter, jaki kolor dachu. Klocek nigdy nie zmienia swojej karteczki. Jesli cos ma sie zmienic, mowi o tym glosno osobie, ktora trzyma pudelko z karteczkami.</p>' +
            '<p>React dziala tak samo. Ekran jest podzielony na male kawalki, a kazdy kawalek to funkcja, ktora dostaje dane i zwraca obrazek. Zadne dziecko nie poprawia danych rodzica. Krzyczy tylko: <em>ktos kliknal!</em> - a rodzic decyduje, co z tym zrobic.</p>' +
            '<p>Najwazniejsza zasada brzmi: <strong>to, co widzisz, to zawsze wynik danych</strong>. Zmieniasz dane - ekran sam sie przerysowuje. Nigdy nie chodzisz z pedzelkiem i nie poprawiasz pojedynczych pikseli.</p>',
          en: '<p>Picture building a toy city out of blocks. Each building is its own block that knows nothing by itself - it gets a little card describing it: how many floors, what colour the roof is. The block never edits its own card. If something should change, it shouts to the person holding the box of cards.</p>' +
            '<p>React works the same way. The screen is chopped into small pieces, and each piece is a function that takes data and gives back a picture. No child fixes the parent data. It only shouts: <em>somebody clicked!</em> - and the parent decides what to do about it.</p>' +
            '<p>The golden rule: <strong>what you see is always a result of the data</strong>. Change the data and the screen redraws itself. You never walk around with a brush touching up individual pixels.</p>'
        },
        school: {
          pl: '<p>Jako osoba piszaca w Vue juz znasz wiekszosc tej filozofii: komponenty, jednokierunkowy przeplyw propsow, zdarzenia w gore. React idzie tylko dalej i robi z tego regule bez wyjatkow.</p>' +
            '<h4>W Vue robiles tak</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst query = ref("")\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;SearchBar v-model="query" /&gt;\n  &lt;ProductList :query="query" /&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>W Reactcie robisz tak</h4>' +
            '<pre><code>function App() {\n  const [query, setQuery] = useState("")\n  return (\n    &lt;&gt;\n      &lt;SearchBar value={query} onChange={setQuery} /&gt;\n      &lt;ProductList query={query} /&gt;\n    &lt;/&gt;\n  )\n}</code></pre>' +
            '<p>Roznica jest jedna, ale zasadnicza: <strong>w Vue miales <code>v-model</code>, czyli lukier na parze props + emit. W Reactcie tego lukru nie ma</strong> - zawsze przekazujesz wartosc w dol i funkcje zwrotna w gore. Dlaczego? Bo React chce, zeby w kodzie bylo widac, kto jest wlascicielem danych. Brak magii to tutaj cecha, nie brak.</p>' +
            '<p>Praktyczna procedura, gdy dostajesz makiete:</p>' +
            '<ol>' +
            '<li>Narysuj ramki wokol kazdego kawalka UI - to sa komponenty.</li>' +
            '<li>Zbuduj wersje calkowicie bez stanu, tylko na propsach.</li>' +
            '<li>Znajdz minimalny zestaw stanu - wszystko, co da sie policzyc z czegos innego, <em>nie</em> jest stanem.</li>' +
            '<li>Umiesc kazdy kawalek stanu w najblizszym wspolnym rodzicu tych komponentow, ktore go czytaja.</li>' +
            '<li>Dodaj przeplyw w gore: przekaz funkcje typu <code>onChange</code> zamiast emitowac zdarzenie.</li>' +
            '</ol>' +
            '<p>Punkt trzeci jest najczestszym zrodlem bledow migracji: filtrowana lista to nie stan, tylko wyliczenie z listy i zapytania - dokladnie tak, jak w Vue nie robiles <code>ref</code> na to, co powinno byc <code>computed</code>.</p>',
          en: '<p>Coming from Vue you already own most of this philosophy: components, one-way props, events going up. React simply pushes it further and turns it into a rule without exceptions.</p>' +
            '<h4>In Vue you did this</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst query = ref("")\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;SearchBar v-model="query" /&gt;\n  &lt;ProductList :query="query" /&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>In React you do this</h4>' +
            '<pre><code>function App() {\n  const [query, setQuery] = useState("")\n  return (\n    &lt;&gt;\n      &lt;SearchBar value={query} onChange={setQuery} /&gt;\n      &lt;ProductList query={query} /&gt;\n    &lt;/&gt;\n  )\n}</code></pre>' +
            '<p>One difference, and it is fundamental: <strong>in Vue you had <code>v-model</code>, sugar over a props + emit pair. React has no such sugar</strong> - you always pass a value down and a callback up. Why? Because React wants ownership of data to be visible in the code. The missing magic is a feature, not a gap.</p>' +
            '<p>A practical routine when a mockup lands on your desk:</p>' +
            '<ol>' +
            '<li>Draw boxes around every piece of UI - those are your components.</li>' +
            '<li>Build a completely stateless version driven only by props.</li>' +
            '<li>Find the minimal state - anything derivable from something else is <em>not</em> state.</li>' +
            '<li>Put each piece of state in the closest common parent of the components that read it.</li>' +
            '<li>Add the upward flow: pass an <code>onChange</code> style function instead of emitting an event.</li>' +
            '</ol>' +
            '<p>Step three is the classic migration bug: a filtered list is not state, it is a computation over the list and the query - exactly like you would never wrap a <code>computed</code> value in a <code>ref</code> in Vue.</p>'
        },
        pro: {
          pl: '<p>Roznica miedzy Vue a Reactem nie lezy w skladni, tylko w tym, <strong>kto jest odpowiedzialny za synchronizacje</strong>. W Vue framework sledzi zaleznosci przez proxy i sam wie, ktory efekt odswiezyc. W Reactcie ty deklarujesz cala funkcje widoku, a framework porownuje wynik. To przenosi ciezar decyzji na twoja architekture danych.</p>' +
            '<h4>Wlascicielstwo stanu jako kontrakt</h4>' +
            '<p>W Vue kusi, zeby komponent mial wlasny <code>ref</code> i dodatkowo <code>watch</code> synchronizujacy go z propsem. To dziala, ale tworzy dwa zrodla prawdy. React nie pozwala tego zrobic po cichu: props jest niemutowalny, a probe trzymania kopii widac od razu jako <code>useState(props.x)</code>, ktory nie odswiezy sie po zmianie propsa. To celowe. Kontrakt brzmi: <strong>jedna wartosc, jeden wlasciciel, jedna funkcja aktualizujaca</strong>.</p>' +
            '<pre><code>// Vue: dwa zrodla prawdy, latwo o desync\nconst local = ref(props.value)\nwatch(() =&gt; props.value, v =&gt; local.value = v)\n\n// React: albo kontrolowany, albo w pelni niekontrolowany\nfunction Field({ value, onChange }) {\n  return &lt;input value={value} onChange={e =&gt; onChange(e.target.value)} /&gt;\n}</code></pre>' +
            '<h4>Kolokacja stanu</h4>' +
            '<p>Domyslna heurystyka: stan trzymaj tak nisko w drzewie, jak sie da, i podnos dopiero wtedy, gdy dwa rodzenstwa go potrzebuja. Podniesienie stanu do korzenia jest w Reactcie kosztowne, bo powoduje re-render calego poddrzewa - w Vue analogiczny <code>ref</code> w korzeniu odswiezylby tylko te komponenty, ktore realnie go czytaja. To nie jest teoria: w duzych formularzach roznica miedzy stanem w polu a stanem w formularzu to setki niepotrzebnych wywolan funkcji renderujacych na kazde nacisniecie klawisza.</p>' +
            '<h4>Co pytaja na rozmowie</h4>' +
            '<ul>' +
            '<li>Czym rozni sie stan od wartosci pochodnej i jak to rozpoznac (test: czy da sie to policzyc w czasie renderu z innych danych).</li>' +
            '<li>Dlaczego React nie ma <code>v-model</code> i jak wyglada wzorzec controlled component.</li>' +
            '<li>Kiedy podniesc stan, a kiedy siegnac po Context lub Zustand (odpowiedz: gdy przekazujesz props przez wiecej niz dwa poziomy tylko po to, by go przekazac dalej).</li>' +
            '</ul>' +
            '<p>Uwaga migracyjna: w projekcie Vue czesto porzadek wymusza Pinia. W Reactcie 80 procent tego, co ladowalo w Pinia, to stan serwera i powinno trafic do TanStack Query, a nie do globalnego store. Rozdzielenie stanu serwera od stanu klienta jest najwiekszym pojedynczym ulepszeniem architektury przy przesiadce.</p>',
          en: '<p>The gap between Vue and React is not syntax, it is <strong>who is responsible for synchronisation</strong>. Vue tracks dependencies through proxies and knows exactly which effect to rerun. React has you declare the whole view function and then diffs the result. That shifts the decision weight onto your data architecture.</p>' +
            '<h4>State ownership as a contract</h4>' +
            '<p>In Vue it is tempting to give a component its own <code>ref</code> plus a <code>watch</code> that syncs it with a prop. It works, and it creates two sources of truth. React does not let you do that quietly: props are immutable, and an attempt to keep a copy shows up immediately as <code>useState(props.x)</code> that never refreshes when the prop changes. That is deliberate. The contract is: <strong>one value, one owner, one updater</strong>.</p>' +
            '<pre><code>// Vue: two sources of truth, easy to desync\nconst local = ref(props.value)\nwatch(() =&gt; props.value, v =&gt; local.value = v)\n\n// React: either controlled, or fully uncontrolled\nfunction Field({ value, onChange }) {\n  return &lt;input value={value} onChange={e =&gt; onChange(e.target.value)} /&gt;\n}</code></pre>' +
            '<h4>State colocation</h4>' +
            '<p>Default heuristic: keep state as low in the tree as possible and lift it only when two siblings need it. Lifting state to the root is expensive in React because it re-renders the whole subtree - in Vue the equivalent root-level <code>ref</code> would only refresh the components that actually read it. This is not academic: in a large form, the difference between per-field state and form-level state is hundreds of pointless render calls per keystroke.</p>' +
            '<h4>What interviewers ask</h4>' +
            '<ul>' +
            '<li>How state differs from derived data, and how to tell (test: can it be computed during render from other data).</li>' +
            '<li>Why React has no <code>v-model</code> and what the controlled component pattern looks like.</li>' +
            '<li>When to lift state versus reach for Context or Zustand (answer: when a prop travels through more than two levels purely to be passed along).</li>' +
            '</ul>' +
            '<p>Migration note: in Vue projects Pinia often becomes the ordering force. In React roughly 80 percent of what lands in Pinia is server state and belongs in TanStack Query, not a global store. Separating server state from client state is the single biggest architectural upgrade you get from the switch.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Gdzie w Reactcie powinien mieszkac stan czytany przez dwa komponenty rodzenstwa?',
            en: 'Where should state read by two sibling components live in React?'
          },
          options: [
            { pl: 'W najblizszym wspolnym rodzicu', en: 'In the closest common parent' },
            { pl: 'Zawsze w globalnym store', en: 'Always in a global store' },
            { pl: 'W obu komponentach, zsynchronizowany efektem', en: 'In both components, synced with an effect' },
            { pl: 'W module poza drzewem komponentow', en: 'In a module outside the component tree' }
          ],
          correct: 0,
          explain: {
            pl: 'Lifting state up to najblizszy wspolny rodzic daje jedno zrodlo prawdy. Kopie synchronizowane efektem to gotowy przepis na desync - tak samo jak w Vue duplikat propsa w ref.',
            en: 'Lifting state to the closest common parent gives one source of truth. Effect-synced copies are a recipe for desync, exactly like duplicating a prop into a ref in Vue.'
          }
        },
        {
          q: {
            pl: 'Masz liste produktow i pole wyszukiwania. Czym jest lista przefiltrowana?',
            en: 'You have a product list and a search field. What is the filtered list?'
          },
          options: [
            { pl: 'Osobnym stanem trzymanym w useState', en: 'Separate state held in useState' },
            { pl: 'Wartoscia pochodna liczona podczas renderu', en: 'Derived data computed during render' },
            { pl: 'Efektem ubocznym wymagajacym useEffect', en: 'A side effect requiring useEffect' },
            { pl: 'Refem, zeby uniknac re-renderu', en: 'A ref, to avoid a re-render' }
          ],
          correct: 1,
          explain: {
            pl: 'Wszystko, co da sie policzyc z innych danych, nie jest stanem. To ta sama zasada, ktora w Vue kaze uzyc computed zamiast ref plus watch.',
            en: 'Anything computable from other data is not state. Same principle that makes you reach for computed instead of ref plus watch in Vue.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Reactcie nie ma odpowiednika v-model wbudowanego w jezyk?',
            en: 'Why does React have no built-in v-model equivalent?'
          },
          options: [
            { pl: 'Bo JSX nie obsluguje dyrektyw technicznie', en: 'Because JSX technically cannot support directives' },
            { pl: 'Bo dwukierunkowe wiazanie jest wolniejsze', en: 'Because two-way binding is slower' },
            { pl: 'Bo React chce, by wlascicielstwo danych bylo jawne w kodzie', en: 'Because React wants data ownership to be explicit in code' },
            { pl: 'Bo formularze w Reactcie sa zawsze niekontrolowane', en: 'Because React forms are always uncontrolled' }
          ],
          correct: 2,
          explain: {
            pl: 'v-model to lukier na props plus emit. React celowo go nie dodaje, bo chce, zeby z kodu bylo widac, kto trzyma wartosc i kto ja zmienia.',
            en: 'v-model is sugar over props plus emit. React deliberately skips it so the code shows who owns the value and who changes it.'
          }
        },
        {
          q: {
            pl: 'Migrujesz duzy formularz z Vue. Trzymasz caly stan w komponencie formularza i przy kazdym klawiszu widac zacinanie. Najsensowniejszy pierwszy ruch?',
            en: 'You are migrating a large Vue form. All state sits in the form component and every keystroke stutters. Most sensible first move?'
          },
          options: [
            { pl: 'Owinac wszystkie pola w React.memo i zostawic stan tam, gdzie jest', en: 'Wrap every field in React.memo and leave the state where it is' },
            { pl: 'Przeniesc stan do Contextu na poziomie aplikacji', en: 'Move the state into an app-level Context' },
            { pl: 'Zamienic stan na ref, zeby nie bylo renderow', en: 'Swap state for a ref so no renders happen' },
            { pl: 'Skolokowac stan w polach, a w gore podnosic tylko to, co realnie wspoldzielone', en: 'Colocate state in the fields and lift only what is genuinely shared' }
          ],
          correct: 3,
          explain: {
            pl: 'Kolokacja rozwiazuje przyczyne: stan wysoko w drzewie renderuje cale poddrzewo. memo lagodzi objaw i doklada koszt porownan, a Context na gorze pogarsza sprawe.',
            en: 'Colocation fixes the cause: high state re-renders the whole subtree. memo only masks the symptom and adds comparison cost, and app-level Context makes it worse.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'jsx-vs-templates',
      title: {
        pl: 'JSX kontra template Vue',
        en: 'JSX versus Vue templates'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="r2b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent2)"/></marker></defs>' +
          '<text x="160" y="30" text-anchor="middle" font-size="15" fill="var(--accent2)">Vue</text>' +
          '<text x="480" y="30" text-anchor="middle" font-size="15" fill="var(--accent)">React</text>' +
          '<rect x="40" y="46" width="240" height="60" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="160" y="72" text-anchor="middle" font-size="14" fill="var(--text)">template (HTML + v-if)</text>' +
          '<text x="160" y="94" text-anchor="middle" font-size="13" fill="var(--muted)">a static, analysable string</text>' +
          '<rect x="360" y="46" width="240" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="480" y="72" text-anchor="middle" font-size="14" fill="var(--text)">JSX (expressions)</text>' +
          '<text x="480" y="94" text-anchor="middle" font-size="13" fill="var(--muted)">just JavaScript</text>' +
          '<line x1="160" y1="108" x2="160" y2="150" stroke="var(--accent2)" stroke-width="2" marker-end="url(#r2b)"/>' +
          '<line x1="480" y1="108" x2="480" y2="150" stroke="var(--accent)" stroke-width="2" marker-end="url(#r2a)"/>' +
          '<rect x="40" y="156" width="240" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="182" text-anchor="middle" font-size="14" fill="var(--text)">Vue compiler</text>' +
          '<text x="160" y="204" text-anchor="middle" font-size="13" fill="var(--muted)">static hoisting, patch flags</text>' +
          '<text x="160" y="222" text-anchor="middle" font-size="13" fill="var(--ok)">knows what can change</text>' +
          '<rect x="360" y="156" width="240" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="182" text-anchor="middle" font-size="14" fill="var(--text)">Babel / SWC</text>' +
          '<text x="480" y="204" text-anchor="middle" font-size="13" fill="var(--muted)">jsx(Component, props)</text>' +
          '<text x="480" y="222" text-anchor="middle" font-size="13" fill="var(--warn)">no static analysis</text>' +
          '<line x1="160" y1="230" x2="290" y2="272" stroke="var(--accent2)" stroke-width="2" marker-end="url(#r2b)"/>' +
          '<line x1="480" y1="230" x2="350" y2="272" stroke="var(--accent)" stroke-width="2" marker-end="url(#r2a)"/>' +
          '<rect x="180" y="280" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="304" text-anchor="middle" font-size="15" fill="var(--text)">render function to VDOM</text>' +
          '<text x="320" y="326" text-anchor="middle" font-size="13" fill="var(--muted)">then diff and patch the DOM</text>' +
          '<text x="320" y="368" text-anchor="middle" font-size="13" fill="var(--muted)">same destination, different amount of compiler help</text>' +
          '</svg>',
        caption: {
          pl: 'Oba swiaty koncza w funkcji renderujacej i VDOM. Roznica: kompilator Vue wie z gory, co moze sie zmienic, JSX to zwykly JavaScript, wiec tej wiedzy nie ma.',
          en: 'Both worlds end in a render function and a VDOM. The difference: the Vue compiler knows up front what can change, while JSX is plain JavaScript with no such knowledge.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Template w Vue to formularz do wypelnienia: pola sa z gory narysowane, ty wpisujesz tylko wartosci. Ktos, kto patrzy na taki formularz, od razu widzi, gdzie sa puste miejsca.</p>' +
            '<p>JSX to raczej list pisany odrecznie. Mozesz w nim wszystko: wstawic obliczenie, petle, warunek. Nikt cie nie ogranicza, ale tez nikt z gory nie wie, gdzie beda zmiany - trzeba przeczytac caly list od nowa.</p>' +
            '<p>Dlatego w Vue piszesz <code>v-if</code> i <code>v-for</code>, czyli specjalne slowa frameworka, a w Reactcie piszesz zwyklego ifa i zwykla petle, bo to po prostu kod. Jedno jest bardziej uporzadkowane, drugie bardziej swobodne. Oba na koncu rysuja ten sam ekran.</p>',
          en: '<p>A Vue template is a form to fill in: the fields are drawn in advance and you only type the values. Anyone looking at the form sees immediately where the blanks are.</p>' +
            '<p>JSX is more like a handwritten letter. You can put anything in it: a calculation, a loop, a condition. Nobody restricts you, but nobody knows in advance where the changes will be either - you have to read the whole letter again.</p>' +
            '<p>That is why Vue gives you <code>v-if</code> and <code>v-for</code>, special framework words, while React lets you write an ordinary if and an ordinary loop, because it is just code. One is tidier, the other freer. Both draw the same screen in the end.</p>'
        },
        school: {
          pl: '<p>JSX to nie jezyk szablonow. To cukier skladniowy nad wywolaniem funkcji - Babel albo SWC zamienia <code>&lt;Card title="x" /&gt;</code> na <code>jsx(Card, { title: "x" })</code>. Kazde wyrazenie JSX jest wartoscia, ktora mozesz przypisac do zmiennej, wrzucic do tablicy albo zwrocic z funkcji.</p>' +
            '<h4>Warunki i listy</h4>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;p v-if="user"&gt;Hi {{ user.name }}&lt;/p&gt;\n&lt;li v-for="t in todos" :key="t.id"&gt;{{ t.text }}&lt;/li&gt;</code></pre>' +
            '<pre><code>// React\n{user &amp;&amp; &lt;p&gt;Hi {user.name}&lt;/p&gt;}\n{todos.map(t =&gt; &lt;li key={t.id}&gt;{t.text}&lt;/li&gt;)}</code></pre>' +
            '<p><strong>W Vue uzywales dyrektyw, w Reactcie uzywasz wyrazen JavaScriptu</strong>, bo JSX zyje w srodku funkcji, a nie w osobnej sekcji pliku. Wniosek praktyczny: jesli cos da sie zrobic w JS, da sie to zrobic w JSX - i odwrotnie, nie ma zadnego dodatkowego API do nauczenia.</p>' +
            '<h4>Drobne pulapki dnia pierwszego</h4>' +
            '<ul>' +
            '<li><code>class</code> to <code>className</code>, a <code>for</code> to <code>htmlFor</code>, bo to obiekt JS, a nie HTML.</li>' +
            '<li>Atrybuty sa camelCase: <code>onClick</code>, <code>tabIndex</code>, <code>strokeWidth</code>.</li>' +
            '<li>Komponent musi zwrocic jeden wezel - stad fragment <code>&lt;&gt;...&lt;/&gt;</code>, odpowiednik braku wrappera w Vue 3.</li>' +
            '<li><code>{count &amp;&amp; &lt;Badge /&gt;}</code> przy <code>count === 0</code> wyrenderuje zero na ekranie. Uzywaj <code>count &gt; 0 &amp;&amp; ...</code>.</li>' +
            '<li>Styl inline to obiekt: <code>style={{ marginTop: 8 }}</code>.</li>' +
            '</ul>' +
            '<p>Za to dostajesz cos, czego w template nie ma: komponent jest zwykla wartoscia. Mozesz go trzymac w mapie, przekazac w propsie, wybrac warunkowo - bez <code>component :is</code> i bez rejestrowania czegokolwiek.</p>',
          en: '<p>JSX is not a template language. It is syntax sugar over a function call - Babel or SWC turns <code>&lt;Card title="x" /&gt;</code> into <code>jsx(Card, { title: "x" })</code>. Every JSX expression is a value you can assign to a variable, push into an array, or return from a function.</p>' +
            '<h4>Conditions and lists</h4>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;p v-if="user"&gt;Hi {{ user.name }}&lt;/p&gt;\n&lt;li v-for="t in todos" :key="t.id"&gt;{{ t.text }}&lt;/li&gt;</code></pre>' +
            '<pre><code>// React\n{user &amp;&amp; &lt;p&gt;Hi {user.name}&lt;/p&gt;}\n{todos.map(t =&gt; &lt;li key={t.id}&gt;{t.text}&lt;/li&gt;)}</code></pre>' +
            '<p><strong>In Vue you used directives, in React you use JavaScript expressions</strong>, because JSX lives inside a function rather than in a separate section of the file. Practical consequence: if you can do it in JS you can do it in JSX - and there is no extra API to learn.</p>' +
            '<h4>Day-one gotchas</h4>' +
            '<ul>' +
            '<li><code>class</code> becomes <code>className</code> and <code>for</code> becomes <code>htmlFor</code>, because this is a JS object, not HTML.</li>' +
            '<li>Attributes are camelCase: <code>onClick</code>, <code>tabIndex</code>, <code>strokeWidth</code>.</li>' +
            '<li>A component must return a single node - hence the fragment <code>&lt;&gt;...&lt;/&gt;</code>, the equivalent of Vue 3 having no wrapper requirement.</li>' +
            '<li><code>{count &amp;&amp; &lt;Badge /&gt;}</code> renders a literal zero when <code>count === 0</code>. Write <code>count &gt; 0 &amp;&amp; ...</code>.</li>' +
            '<li>Inline style is an object: <code>style={{ marginTop: 8 }}</code>.</li>' +
            '</ul>' +
            '<p>In exchange you get something templates cannot offer: a component is an ordinary value. Keep it in a map, pass it as a prop, pick it conditionally - no <code>component :is</code>, no registration.</p>'
        },
        pro: {
          pl: '<p>Kluczowa konsekwencja architektoniczna jest taka: <strong>template Vue jest analizowalny statycznie, JSX nie</strong>. Kompilator Vue widzi, ze <code>&lt;div class="card"&gt;</code> nigdy sie nie zmieni, wiec hoistuje ten wezel poza funkcje renderujaca i oznacza dynamiczne fragmenty patch flagami. Runtime porownuje wtedy tylko to, co moze sie roznic. W Reactcie kazde wywolanie funkcji komponentu buduje caly obiekt elementow od nowa i diff idzie po calym poddrzewie.</p>' +
            '<pre><code>// Vue - kompilator generuje mniej wiecej to\nconst _hoisted = createElementVNode("div", { class: "card" })\n// plus patchFlag: TEXT dla dynamicznego fragmentu\n\n// React - kazdy render tworzy nowe obiekty\nfunction Card({ title }) {\n  return jsx("div", { className: "card", children: title })\n}</code></pre>' +
            '<h4>Kompozycja zamiast dyrektyw</h4>' +
            '<p>Brak dyrektyw wymusza inne wzorce. Zamiast <code>v-permission</code> piszesz komponent <code>&lt;Can do="edit"&gt;</code> albo hooka <code>usePermission()</code>. Zamiast <code>v-focus</code> - <code>useEffect</code> z refem albo gotowy hook. W praktyce jest to bardziej typowalne w TypeScripcie: dyrektywy Vue nie maja sensownej sygnatury typu, komponent i hook maja.</p>' +
            '<h4>Typy i narzedzia</h4>' +
            '<p>JSX to zwykly TS, wiec generyki, zwezanie typow i inference dzialaja normalnie w calym widoku. W Vue trzeba do tego <code>defineComponent</code>, generycznych SFC (od 3.3) i wsparcia Volar. Za to Vue wygrywa w narzedziach kompilacyjnych - dostajesz optymalizacje za darmo, podczas gdy React do 18 wlacznie wymagal recznego <code>memo</code> i <code>useMemo</code> (React Compiler w 19 to zmienia, wiecej w lekcji o krajobrazie 19).</p>' +
            '<h4>Pulapki produkcyjne</h4>' +
            '<ul>' +
            '<li>Definiowanie komponentu wewnatrz komponentu tworzy nowy typ przy kazdym renderze i kasuje stan poddrzewa. To odpowiednik zmiany <code>:is</code> na kazdy render.</li>' +
            '<li>Inline obiekty i funkcje w propsach lamia <code>React.memo</code>, bo referencja rozni sie za kazdym razem.</li>' +
            '<li><code>dangerouslySetInnerHTML</code> to odpowiednik <code>v-html</code> i tak samo wymaga sanityzacji.</li>' +
            '</ul>' +
            '<p>Na rozmowie warto umiec powiedziec jednym zdaniem: JSX kompiluje sie do wywolan funkcji, wiec React placi w runtime za elastycznosc, ktora Vue rozwiazuje w kompilatorze. Warto dodac drugie zdanie o kompromisie: ta elastycznosc daje w zamian pelna kompozycyjnosc widoku, bo fragment JSX mozna przekazac dalej jak kazda inna wartosc, czego stringowy template nie potrafi bez dodatkowego API.</p>',
          en: '<p>The architectural consequence: <strong>a Vue template is statically analysable, JSX is not</strong>. The Vue compiler sees that <code>&lt;div class="card"&gt;</code> can never change, hoists that node out of the render function and tags dynamic parts with patch flags. The runtime then compares only what could differ. In React every component call rebuilds the whole element object and the diff walks the entire subtree.</p>' +
            '<pre><code>// Vue - the compiler emits roughly this\nconst _hoisted = createElementVNode("div", { class: "card" })\n// plus patchFlag: TEXT for the dynamic part\n\n// React - every render allocates new objects\nfunction Card({ title }) {\n  return jsx("div", { className: "card", children: title })\n}</code></pre>' +
            '<h4>Composition instead of directives</h4>' +
            '<p>No directives forces different patterns. Instead of <code>v-permission</code> you write a <code>&lt;Can do="edit"&gt;</code> component or a <code>usePermission()</code> hook. Instead of <code>v-focus</code> you use <code>useEffect</code> with a ref, or a ready-made hook. In practice this types better: Vue directives have no meaningful type signature, components and hooks do.</p>' +
            '<h4>Types and tooling</h4>' +
            '<p>JSX is plain TS, so generics, narrowing and inference work normally across the whole view. Vue needs <code>defineComponent</code>, generic SFCs (3.3+) and Volar support for the same. Vue wins on compile-time tooling though - you get optimisations for free, whereas React through v18 required manual <code>memo</code> and <code>useMemo</code> (the React Compiler in 19 changes that, see the React 19 lesson).</p>' +
            '<h4>Production traps</h4>' +
            '<ul>' +
            '<li>Defining a component inside a component creates a new type on every render and wipes the subtree state. It is the equivalent of changing <code>:is</code> on every render.</li>' +
            '<li>Inline objects and functions in props defeat <code>React.memo</code>, because the reference differs each time.</li>' +
            '<li><code>dangerouslySetInnerHTML</code> is the <code>v-html</code> equivalent and needs the same sanitisation.</li>' +
            '</ul>' +
            '<p>In an interview, be able to say it in one sentence: JSX compiles to function calls, so React pays at runtime for the flexibility Vue solves in the compiler.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest JSX po kompilacji?',
            en: 'What is JSX after compilation?'
          },
          options: [
            { pl: 'Stringiem HTML wstawianym przez innerHTML', en: 'An HTML string injected via innerHTML' },
            { pl: 'Wywolaniami funkcji tworzacymi obiekty elementow', en: 'Function calls creating element objects' },
            { pl: 'Osobnym jezykiem szablonow interpretowanym w runtime', en: 'A separate template language interpreted at runtime' },
            { pl: 'Dyrektywami rejestrowanymi w aplikacji', en: 'Directives registered on the app' }
          ],
          correct: 1,
          explain: {
            pl: 'Babel lub SWC zamienia JSX na wywolania jsx(type, props). Dlatego element JSX jest zwykla wartoscia JavaScriptu.',
            en: 'Babel or SWC turns JSX into jsx(type, props) calls. That is why a JSX element is an ordinary JavaScript value.'
          }
        },
        {
          q: {
            pl: 'Jak wyglada odpowiednik v-for z kluczem w Reactcie?',
            en: 'What is the React equivalent of v-for with a key?'
          },
          options: [
            { pl: 'Dyrektywa forEach na elemencie', en: 'A forEach directive on the element' },
            { pl: 'Specjalny komponent React.List', en: 'A special React.List component' },
            { pl: 'items.map z propem key na zwracanym elemencie', en: 'items.map with a key prop on the returned element' },
            { pl: 'Petla for w ciele komponentu bez klucza', en: 'A for loop in the component body with no key' }
          ],
          correct: 2,
          explain: {
            pl: 'Listy buduje sie zwyklym map, a key jest propem specjalnym - tak samo jak :key w Vue, bo oba runtime potrzebuja tozsamosci elementu.',
            en: 'Lists are built with plain map, and key is a special prop - just like :key in Vue, since both runtimes need element identity.'
          }
        },
        {
          q: {
            pl: 'Dlaczego kompilator Vue moze zoptymalizowac wiecej niz React bez kompilatora?',
            en: 'Why can the Vue compiler optimise more than React without a compiler?'
          },
          options: [
            { pl: 'Bo template jest statycznie analizowalny i wiadomo, co jest dynamiczne', en: 'Because the template is statically analysable so dynamic parts are known' },
            { pl: 'Bo Vue nie uzywa wirtualnego DOM', en: 'Because Vue does not use a virtual DOM' },
            { pl: 'Bo React zawsze renderuje na serwerze', en: 'Because React always renders on the server' },
            { pl: 'Bo Vue trzyma komponenty w globalnym rejestrze', en: 'Because Vue keeps components in a global registry' }
          ],
          correct: 0,
          explain: {
            pl: 'Statyczne wezly sa hoistowane, a dynamiczne dostaja patch flagi. JSX to dowolny JavaScript, wiec takich gwarancji nie ma.',
            en: 'Static nodes get hoisted and dynamic ones get patch flags. JSX is arbitrary JavaScript, so no such guarantees exist.'
          }
        },
        {
          q: {
            pl: 'Widzisz na ekranie samotne 0 tam, gdzie mial byc badge. Najbardziej prawdopodobna przyczyna?',
            en: 'A lone 0 shows up on screen where a badge should be. Most likely cause?'
          },
          options: [
            { pl: 'Brak propa key na elemencie', en: 'A missing key prop on the element' },
            { pl: 'Uzycie className zamiast class', en: 'Using className instead of class' },
            { pl: 'Zwrocenie dwoch wezlow bez fragmentu', en: 'Returning two nodes without a fragment' },
            { pl: 'Warunek count && <Badge /> przy count rownym 0', en: 'A count && <Badge /> guard when count is 0' }
          ],
          correct: 3,
          explain: {
            pl: 'Operator && zwraca lewa strone, a React renderuje liczbe 0 jako tekst. W Vue v-if traktowalo to jako falsy i nic nie rysowalo - stad zaskoczenie.',
            en: 'The && operator returns the left side and React renders the number 0 as text. Vue v-if treated it as falsy and drew nothing, hence the surprise.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'components-and-props',
      title: {
        pl: 'Komponenty i propsy',
        en: 'Components and props'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="r3b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--warn)"/></marker></defs>' +
          '<rect x="200" y="26" width="240" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="54" text-anchor="middle" font-size="15" fill="var(--text)">Parent</text>' +
          '<text x="320" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">owns value + setValue</text>' +
          '<line x1="260" y1="96" x2="200" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#r3a)"/>' +
          '<text x="130" y="132" font-size="13" fill="var(--accent)">props: value</text>' +
          '<line x1="380" y1="96" x2="440" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#r3a)"/>' +
          '<text x="440" y="132" font-size="13" fill="var(--accent)">props: onChange</text>' +
          '<rect x="120" y="166" width="180" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="210" y="192" text-anchor="middle" font-size="14" fill="var(--text)">Child renders</text>' +
          '<text x="210" y="214" text-anchor="middle" font-size="13" fill="var(--muted)">props are read-only</text>' +
          '<rect x="340" y="166" width="180" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="430" y="192" text-anchor="middle" font-size="14" fill="var(--text)">Child calls back</text>' +
          '<text x="430" y="214" text-anchor="middle" font-size="13" fill="var(--muted)">onChange(next)</text>' +
          '<path d="M 430 230 L 430 264 L 320 264 L 320 100" fill="none" stroke="var(--warn)" stroke-width="2" marker-end="url(#r3b)"/>' +
          '<text x="330" y="286" font-size="13" fill="var(--warn)">the parent updates state, the tree re-renders</text>' +
          '<rect x="60" y="308" width="520" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="334" text-anchor="middle" font-size="14" fill="var(--text)">Vue: defineProps + emit          React: props + callback props</text>' +
          '<text x="320" y="358" text-anchor="middle" font-size="13" fill="var(--muted)">children in React = the default slot in Vue</text>' +
          '</svg>',
        caption: {
          pl: 'Propsy w dol, funkcje zwrotne w gore. Gdzie w Vue emitowales zdarzenie, w Reactcie wolasz funkcje otrzymana w propsie.',
          en: 'Props down, callbacks up. Where Vue emits an event, React calls a function it received as a prop.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Komponent to maszynka do robienia obrazkow. Wrzucasz do niej skladniki, a ona zwraca gotowy kawalek ekranu. Skladniki to propsy.</p>' +
            '<p>Wazna zasada: maszynka nie moze zjesc swoich skladnikow i podmienic ich na inne. Dostala marchewke - robi z niej sok marchewkowy. Jesli chce buraka, musi poprosic tego, kto podaje skladniki.</p>' +
            '<p>Jak prosi? Dostaje razem ze skladnikami maly dzwonek - funkcje. Dzwoni nim i mowi: <em>chcialabym burak</em>. Osoba na zewnatrz decyduje, czy zmienic skladnik. Wtedy maszynka dostanie nowe skladniki i zrobi nowy obrazek.</p>' +
            '<p>Dzieki temu zawsze wiadomo, kto za co odpowiada. Nikt nie grzebie w cudzych skladnikach po cichu, a jak cos wyjdzie nie tak, od razu wiadomo, gdzie szukac winnego: u tego, kto trzyma skladniki.</p>' +
            '<p>Jest jeszcze jedna wygodna rzecz. Do maszynki mozesz wlozyc nie tylko liczby i napisy, ale tez gotowy kawalek innego obrazka. Wtedy maszynka opakowuje go w swoja ramke i oddaje dalej - i wlasnie tak buduje sie z malych czesci cale duze ekrany.</p>',
          en: '<p>A component is a little machine that makes pictures. You drop ingredients in and it hands back a finished piece of screen. The ingredients are props.</p>' +
            '<p>Important rule: the machine cannot eat its ingredients and swap them for different ones. It got a carrot, so it makes carrot juice. If it wants beetroot, it has to ask whoever hands out ingredients.</p>' +
            '<p>How does it ask? Along with the ingredients it receives a small bell - a function. It rings it and says: <em>beetroot please</em>. The person outside decides whether to change the ingredient. Then the machine gets new ingredients and makes a new picture.</p>' +
            '<p>This way it is always clear who is responsible for what. Nobody quietly rummages through somebody else ingredients.</p>'
        },
        school: {
          pl: '<p>Komponent Reacta to funkcja: bierze obiekt propsow i zwraca JSX. Nie ma sekcji <code>script</code>, <code>template</code> i <code>style</code> - jest jedna funkcja i tyle.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup lang="ts"&gt;\nconst props = defineProps&lt;{ label: string; count: number }&gt;()\nconst emit = defineEmits&lt;{ inc: [n: number] }&gt;()\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;button @click="emit(\\u0027inc\\u0027, props.count + 1)"&gt;{{ label }}&lt;/button&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>type Props = { label: string; count: number; onInc: (n: number) =&gt; void }\n\nfunction Counter({ label, count, onInc }: Props) {\n  return &lt;button onClick={() =&gt; onInc(count + 1)}&gt;{label}&lt;/button&gt;\n}</code></pre>' +
            '<p><strong>W Vue deklarowales propsy makrem i emitowales zdarzenia, w Reactcie propsy to zwykly argument funkcji, a zdarzenia to funkcje przekazane w propsie</strong> - bo React nie ma osobnego systemu zdarzen komponentowych. Wszystko jest wywolaniem funkcji, wiec TypeScript typuje to bez zadnych makr.</p>' +
            '<h4>Dzieci zamiast slotow</h4>' +
            '<pre><code>// Vue:  &lt;Card&gt;&lt;p&gt;tresc&lt;/p&gt;&lt;/Card&gt;  + &lt;slot /&gt;\n// React:\nfunction Card({ children }) {\n  return &lt;div className="card"&gt;{children}&lt;/div&gt;\n}</code></pre>' +
            '<p>Slot domyslny to prop <code>children</code>. Sloty nazwane to po prostu kolejne propsy przyjmujace JSX, na przyklad <code>&lt;Card header={&lt;h2&gt;Tytul&lt;/h2&gt;} /&gt;</code>. Nie ma tu nowego mechanizmu - jest ten sam mechanizm co zawsze, uzyty do innego celu.</p>' +
            '<p>Wartosci domyslne robisz destrukturyzacja: <code>function Card({ size = "md" })</code>. Odpowiednika <code>withDefaults</code> nie potrzebujesz.</p>',
          en: '<p>A React component is a function: it takes a props object and returns JSX. There is no <code>script</code> / <code>template</code> / <code>style</code> split - there is one function and that is it.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup lang="ts"&gt;\nconst props = defineProps&lt;{ label: string; count: number }&gt;()\nconst emit = defineEmits&lt;{ inc: [n: number] }&gt;()\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;button @click="emit(\\u0027inc\\u0027, props.count + 1)"&gt;{{ label }}&lt;/button&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>type Props = { label: string; count: number; onInc: (n: number) =&gt; void }\n\nfunction Counter({ label, count, onInc }: Props) {\n  return &lt;button onClick={() =&gt; onInc(count + 1)}&gt;{label}&lt;/button&gt;\n}</code></pre>' +
            '<p><strong>In Vue you declared props with a macro and emitted events; in React props are a plain function argument and events are functions passed as props</strong> - because React has no separate component event system. Everything is a function call, so TypeScript types it with no macros at all.</p>' +
            '<h4>children instead of slots</h4>' +
            '<pre><code>// Vue:  &lt;Card&gt;&lt;p&gt;body&lt;/p&gt;&lt;/Card&gt;  + &lt;slot /&gt;\n// React:\nfunction Card({ children }) {\n  return &lt;div className="card"&gt;{children}&lt;/div&gt;\n}</code></pre>' +
            '<p>The default slot is the <code>children</code> prop. Named slots are simply more props that happen to accept JSX, for example <code>&lt;Card header={&lt;h2&gt;Title&lt;/h2&gt;} /&gt;</code>. There is no new mechanism here - it is the same mechanism used for a different purpose.</p>' +
            '<p>Defaults come from destructuring: <code>function Card({ size = "md" })</code>. You never need a <code>withDefaults</code> equivalent.</p>'
        },
        pro: {
          pl: '<p>Props w Reactcie jest niemutowalny nie tylko przez konwencje - mutacja obiektu propsow lamie zalozenia reconcilera i wywolania <code>React.memo</code>, ktore porownuja referencje. W Vue mutowanie propsa tez jest zakazane, ale runtime ostrzega, a reaktywnosc czesto i tak zadziala. W Reactcie nic sie po prostu nie przerysuje, bo nikt nie sledzi obiektow.</p>' +
            '<h4>Projektowanie API komponentu</h4>' +
            '<ul>' +
            '<li><strong>Nazewnictwo</strong>: props wejsciowe rzeczownikowo (<code>value</code>, <code>items</code>), wyjsciowe z prefiksem <code>on</code> (<code>onChange</code>, <code>onSelect</code>). To odpowiednik konwencji <code>update:modelValue</code> w Vue.</li>' +
            '<li><strong>Sloty jako propsy</strong>: <code>renderItem={(item) =&gt; &lt;Row {...item} /&gt;}</code> to dokladny odpowiednik scoped slot. Roznica: typ funkcji renderujacej jest w pelni wyprowadzany przez TypeScript, czego scoped sloty dlugo nie mialy.</li>' +
            '<li><strong>Rozszerzanie natywnych atrybutow</strong>: <code>type Props = ComponentPropsWithoutRef&lt;"button"&gt; &amp; { tone?: "danger" }</code>. To zastepuje <code>attrs</code> i <code>inheritAttrs</code>, tylko jawnie - musisz sam zrobic <code>{...rest}</code>.</li>' +
            '</ul>' +
            '<pre><code>function Button({ tone = "default", ...rest }: Props) {\n  return &lt;button data-tone={tone} {...rest} /&gt;\n}</code></pre>' +
            '<h4>Praktyka z design systemu</h4>' +
            '<p>Przy komponentach biblioteki (jak CHI) najwazniejsza roznica jest taka: w Vue duza czesc kontraktu jest opisana runtime w <code>defineProps</code> i widoczna w devtools. W Reactcie kontrakt zyje wylacznie w typach i znika po kompilacji. Dlatego waliduj granice danych osobno (zod na wejsciu z API), a w komponentach polegaj na typach i testach.</p>' +
            '<p>Dwie pulapki, ktore realnie boli w produkcji:</p>' +
            '<ol>' +
            '<li>Przekazywanie inline obiektu <code>style={{...}}</code> lub swiezej funkcji do zmemoizowanego dziecka niweczy memo. W Vue nie bylo to problemem, bo aktualizacja szla po zaleznosciach, a nie po referencjach propsow.</li>' +
            '<li>Spread niezaufanych propsow na element DOM przepuszcza dowolne atrybuty. Filtruj, jesli komponent jest publicznym API biblioteki.</li>' +
            '</ol>' +
            '<p>Na rozmowie czesto pada: jak zrobic scoped slot w Reactcie. Odpowiedz brzmi: prop bedacy funkcja zwracajaca JSX, czyli render prop - i warto dodac, ze <code>children</code> tez moze byc funkcja.</p>' +
            '<p>Ostatnia rzecz z praktyki zespolowej: skoro kontrakt komponentu to typ, warto go trzymac jako nazwany, eksportowany typ obok komponentu. Konsumenci moga wtedy budowac wlasne wrappery przez <code>Omit</code> i <code>Pick</code> zamiast kopiowac liste propsow, a zmiana kontraktu zapala sie w kompilacji u wszystkich naraz - to jest przewaga, ktorej runtime <code>defineProps</code> nie daje.</p>',
          en: '<p>Props in React are immutable not merely by convention - mutating the props object breaks reconciler assumptions and any <code>React.memo</code> comparison, which is reference based. Vue also forbids mutating props, but its runtime warns and reactivity often works anyway. In React nothing repaints at all, because nobody is tracking objects.</p>' +
            '<h4>Designing a component API</h4>' +
            '<ul>' +
            '<li><strong>Naming</strong>: inputs as nouns (<code>value</code>, <code>items</code>), outputs prefixed with <code>on</code> (<code>onChange</code>, <code>onSelect</code>). This mirrors the <code>update:modelValue</code> convention in Vue.</li>' +
            '<li><strong>Slots as props</strong>: <code>renderItem={(item) =&gt; &lt;Row {...item} /&gt;}</code> is the exact equivalent of a scoped slot. Difference: the render function type is fully inferred by TypeScript, which scoped slots lacked for years.</li>' +
            '<li><strong>Extending native attributes</strong>: <code>type Props = ComponentPropsWithoutRef&lt;"button"&gt; &amp; { tone?: "danger" }</code>. This replaces <code>attrs</code> and <code>inheritAttrs</code>, only explicitly - you spread <code>{...rest}</code> yourself.</li>' +
            '</ul>' +
            '<pre><code>function Button({ tone = "default", ...rest }: Props) {\n  return &lt;button data-tone={tone} {...rest} /&gt;\n}</code></pre>' +
            '<h4>Design-system practice</h4>' +
            '<p>For library components (think CHI) the key difference is this: in Vue a large part of the contract exists at runtime in <code>defineProps</code> and is visible in devtools. In React the contract lives only in types and evaporates at build time. So validate data boundaries separately (zod on API responses) and rely on types plus tests inside components.</p>' +
            '<p>Two traps that genuinely bite in production:</p>' +
            '<ol>' +
            '<li>Passing an inline <code>style={{...}}</code> object or a fresh function into a memoized child defeats memo. This was a non-issue in Vue because updates followed dependencies, not prop references.</li>' +
            '<li>Spreading untrusted props onto a DOM element leaks arbitrary attributes. Filter them if the component is a public library API.</li>' +
            '</ol>' +
            '<p>A frequent interview question: how do you do a scoped slot in React. The answer is a prop that is a function returning JSX, that is a render prop - and it is worth adding that <code>children</code> can be a function too.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co jest odpowiednikiem slotu domyslnego z Vue?',
            en: 'What is the equivalent of the Vue default slot?'
          },
          options: [
            { pl: 'Prop children', en: 'The children prop' },
            { pl: 'Komponent React.Slot', en: 'A React.Slot component' },
            { pl: 'Hook useSlot', en: 'A useSlot hook' },
            { pl: 'Atrybut slot na elemencie', en: 'A slot attribute on the element' }
          ],
          correct: 0,
          explain: {
            pl: 'Wszystko, co wpiszesz miedzy tagami komponentu, laduje w propsie children. Sloty nazwane to po prostu kolejne propsy przyjmujace JSX.',
            en: 'Whatever you put between the component tags arrives as the children prop. Named slots are simply extra props that accept JSX.'
          }
        },
        {
          q: {
            pl: 'Jak dziecko informuje rodzica o zmianie w Reactcie?',
            en: 'How does a child notify its parent about a change in React?'
          },
          options: [
            { pl: 'Emituje zdarzenie przez emit', en: 'It emits an event with emit' },
            { pl: 'Mutuje otrzymany props', en: 'It mutates the prop it received' },
            { pl: 'Wywoluje funkcje otrzymana w propsie', en: 'It calls a function it received as a prop' },
            { pl: 'Wysyla CustomEvent w DOM', en: 'It dispatches a DOM CustomEvent' }
          ],
          correct: 2,
          explain: {
            pl: 'React nie ma systemu zdarzen komponentowych. Zamiast emit dostajesz funkcje w propsie i po prostu ja wolasz - to zwykle wywolanie funkcji.',
            en: 'React has no component event system. Instead of emit you receive a function prop and call it - a plain function call.'
          }
        },
        {
          q: {
            pl: 'Jaki jest odpowiednik scoped slotu, gdy dziecko musi przekazac dane do renderowanej tresci?',
            en: 'What replaces a scoped slot when the child must hand data to the rendered content?'
          },
          options: [
            { pl: 'Context', en: 'Context' },
            { pl: 'Prop bedacy funkcja zwracajaca JSX (render prop)', en: 'A prop that is a function returning JSX (a render prop)' },
            { pl: 'forwardRef', en: 'forwardRef' },
            { pl: 'Portal', en: 'A portal' }
          ],
          correct: 1,
          explain: {
            pl: 'Render prop, np. renderItem={(item) => ...}, daje dokladnie to samo co scoped slot i dodatkowo w pelni typuje sie w TypeScripcie.',
            en: 'A render prop such as renderItem={(item) => ...} gives exactly what a scoped slot gave, and additionally types cleanly in TypeScript.'
          }
        },
        {
          q: {
            pl: 'Budujesz Button w design systemie i chcesz przepuscic natywne atrybuty przycisku. Co odpowiada mechanizmowi attrs z Vue?',
            en: 'You are building a design-system Button and want native button attributes to pass through. What matches Vue attrs?'
          },
          options: [
            { pl: 'Nic - React przepuszcza atrybuty automatycznie', en: 'Nothing - React forwards attributes automatically' },
            { pl: 'Ustawienie inheritAttrs na true', en: 'Setting inheritAttrs to true' },
            { pl: 'Typ ComponentPropsWithoutRef plus jawny spread reszty propsow', en: 'A ComponentPropsWithoutRef type plus an explicit spread of the rest' },
            { pl: 'Uzycie dangerouslySetInnerHTML', en: 'Using dangerouslySetInnerHTML' }
          ],
          correct: 2,
          explain: {
            pl: 'React nie ma automatycznego dziedziczenia atrybutow. Typujesz propsy przez ComponentPropsWithoutRef i sam robisz spread reszty na element.',
            en: 'React has no automatic attribute inheritance. You type props with ComponentPropsWithoutRef and spread the rest onto the element yourself.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'rendering-and-rerenders',
      title: {
        pl: 'Renderowanie i re-rendery',
        en: 'Rendering and re-renders'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="160" y="28" text-anchor="middle" font-size="15" fill="var(--accent2)">Vue: fine-grained</text>' +
          '<text x="480" y="28" text-anchor="middle" font-size="15" fill="var(--accent)">React: re-render subtree</text>' +
          '<rect x="110" y="44" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="69" text-anchor="middle" font-size="14" fill="var(--muted)">App</text>' +
          '<rect x="40" y="120" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="90" y="145" text-anchor="middle" font-size="14" fill="var(--muted)">Side</text>' +
          '<rect x="180" y="120" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="230" y="145" text-anchor="middle" font-size="14" fill="var(--ok)">Count</text>' +
          '<rect x="180" y="196" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="230" y="221" text-anchor="middle" font-size="14" fill="var(--muted)">Label</text>' +
          '<line x1="160" y1="84" x2="110" y2="116" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="160" y1="84" x2="215" y2="116" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="230" y1="160" x2="230" y2="192" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="268" text-anchor="middle" font-size="13" fill="var(--ok)">only the effect that read the ref reruns</text>' +
          '<rect x="430" y="44" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="480" y="69" text-anchor="middle" font-size="14" fill="var(--warn)">App</text>' +
          '<rect x="360" y="120" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="410" y="145" text-anchor="middle" font-size="14" fill="var(--warn)">Side</text>' +
          '<rect x="500" y="120" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="550" y="145" text-anchor="middle" font-size="14" fill="var(--warn)">Count</text>' +
          '<rect x="500" y="196" width="100" height="40" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="550" y="221" text-anchor="middle" font-size="14" fill="var(--warn)">Label</text>' +
          '<line x1="480" y1="84" x2="430" y2="116" stroke="var(--accent)" stroke-width="2" marker-end="url(#r4a)"/>' +
          '<line x1="480" y1="84" x2="535" y2="116" stroke="var(--accent)" stroke-width="2" marker-end="url(#r4a)"/>' +
          '<line x1="550" y1="160" x2="550" y2="192" stroke="var(--accent)" stroke-width="2" marker-end="url(#r4a)"/>' +
          '<text x="480" y="268" text-anchor="middle" font-size="13" fill="var(--warn)">the whole subtree re-runs, then diffing decides</text>' +
          '<rect x="60" y="300" width="520" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="328" text-anchor="middle" font-size="14" fill="var(--text)">re-render = the function runs again</text>' +
          '<text x="320" y="352" text-anchor="middle" font-size="13" fill="var(--muted)">it does not mean the DOM was touched</text>' +
          '</svg>',
        caption: {
          pl: 'Vue odswieza tylko efekty, ktore czytaly zmieniona wartosc. React uruchamia ponownie cala funkcje komponentu i jego dzieci, a dopiero diff decyduje, co dotknie DOM.',
          en: 'Vue reruns only the effects that read the changed value. React re-runs the whole component function and its children, and only the diff decides what touches the DOM.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Krok po kroku: co dzieje sie od klikniecia do zmiany piksela w Reactcie.',
          en: 'Step by step: what happens from a click to a changed pixel in React.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="230" y="20" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="49" text-anchor="middle" font-size="14" fill="var(--text)">App  count = 0</text>' +
              '<rect x="90" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="180" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Sidebar</text>' +
              '<rect x="370" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="460" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Counter</text>' +
              '<rect x="370" y="190" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="460" y="219" text-anchor="middle" font-size="14" fill="var(--muted)">Label 0</text>' +
              '<line x1="300" y1="66" x2="200" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="340" y1="66" x2="440" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="460" y1="156" x2="460" y2="186" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="60" y="278" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="309" text-anchor="middle" font-size="14" fill="var(--muted)">idle: setState has not been called yet</text>' +
              '</svg>',
            label: { pl: 'Stan spoczynku', en: 'Idle state' },
            note: {
              pl: 'Drzewo jest wyrenderowane, count wynosi 0. Nic sie nie dzieje, dopoki nie zawolasz settera.',
              en: 'The tree is rendered and count is 0. Nothing happens until you call the setter.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="230" y="20" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="320" y="49" text-anchor="middle" font-size="14" fill="var(--ok)">App  setCount(1)</text>' +
              '<rect x="90" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="180" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Sidebar</text>' +
              '<rect x="370" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="460" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Counter</text>' +
              '<rect x="370" y="190" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="460" y="219" text-anchor="middle" font-size="14" fill="var(--muted)">Label 0</text>' +
              '<line x1="300" y1="66" x2="200" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="340" y1="66" x2="440" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="460" y1="156" x2="460" y2="186" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="60" y="278" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="309" text-anchor="middle" font-size="14" fill="var(--ok)">click: state is queued, render is scheduled</text>' +
              '</svg>',
            label: { pl: 'Klikniecie i kolejka', en: 'Click and queue' },
            note: {
              pl: 'setState nie zmienia zmiennej od razu - dopisuje aktualizacje do kolejki i planuje render. Dlatego zaraz po nim count nadal ma stara wartosc.',
              en: 'setState does not mutate a variable on the spot - it queues the update and schedules a render. That is why count still reads the old value right after the call.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="230" y="20" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="320" y="49" text-anchor="middle" font-size="14" fill="var(--warn)">App runs again</text>' +
              '<rect x="90" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="180" y="139" text-anchor="middle" font-size="14" fill="var(--warn)">Sidebar runs</text>' +
              '<rect x="370" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="460" y="139" text-anchor="middle" font-size="14" fill="var(--warn)">Counter runs</text>' +
              '<rect x="370" y="190" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="460" y="219" text-anchor="middle" font-size="14" fill="var(--warn)">Label runs</text>' +
              '<line x1="300" y1="66" x2="200" y2="106" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="340" y1="66" x2="440" y2="106" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="460" y1="156" x2="460" y2="186" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="60" y="278" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="309" text-anchor="middle" font-size="14" fill="var(--warn)">render: every function in the subtree re-runs</text>' +
              '</svg>',
            label: { pl: 'Render calego poddrzewa', en: 'Whole subtree renders' },
            note: {
              pl: 'React wywoluje funkcje App i wszystkich jej dzieci, nawet tych, ktore nie czytaja count. W Vue odpalilby sie tylko efekt renderujacy Label.',
              en: 'React calls App and all of its children, even those that never read count. In Vue only the render effect for Label would rerun.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="230" y="20" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="49" text-anchor="middle" font-size="14" fill="var(--muted)">App  same output</text>' +
              '<rect x="90" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="180" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Sidebar  no diff</text>' +
              '<rect x="370" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="460" y="139" text-anchor="middle" font-size="14" fill="var(--muted)">Counter  no diff</text>' +
              '<rect x="370" y="190" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="460" y="219" text-anchor="middle" font-size="14" fill="var(--ok)">Label 1  text patched</text>' +
              '<line x1="300" y1="66" x2="200" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="340" y1="66" x2="440" y2="106" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="460" y1="156" x2="460" y2="186" stroke="var(--ok)" stroke-width="2"/>' +
              '<rect x="60" y="278" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="309" text-anchor="middle" font-size="14" fill="var(--ok)">commit: one text node changes in the real DOM</text>' +
              '</svg>',
            label: { pl: 'Commit do DOM', en: 'Commit to the DOM' },
            note: {
              pl: 'Diff porownuje nowe elementy ze starymi i dotyka tylko jednego wezla tekstowego. Duzo renderow nie oznacza duzo pracy DOM - ale oznacza prace CPU.',
              en: 'The diff compares new elements with old ones and touches a single text node. Many renders do not mean much DOM work - but they do mean CPU work.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="230" y="20" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="49" text-anchor="middle" font-size="14" fill="var(--muted)">App</text>' +
              '<rect x="90" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="180" y="132" text-anchor="middle" font-size="14" fill="var(--ok)">Sidebar memo</text>' +
              '<text x="180" y="150" text-anchor="middle" font-size="12" fill="var(--muted)">skipped</text>' +
              '<rect x="370" y="110" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="460" y="139" text-anchor="middle" font-size="14" fill="var(--warn)">Counter runs</text>' +
              '<rect x="370" y="190" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="460" y="219" text-anchor="middle" font-size="14" fill="var(--ok)">Label 2</text>' +
              '<line x1="300" y1="66" x2="200" y2="106" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<line x1="340" y1="66" x2="440" y2="106" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="460" y1="156" x2="460" y2="186" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="60" y="278" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="309" text-anchor="middle" font-size="14" fill="var(--ok)">memo or colocation cuts the branch off</text>' +
              '</svg>',
            label: { pl: 'Odcinanie galezi', en: 'Cutting the branch' },
            note: {
              pl: 'React.memo albo przeniesienie stanu nizej sprawia, ze galaz bez zaleznosci nie jest w ogole wywolywana. To reczny odpowiednik tego, co Vue robi automatycznie.',
              en: 'React.memo or moving the state lower stops an unrelated branch from being called at all. It is the manual version of what Vue does automatically.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie kucharza, ktory na kazde zamowienie pisze od nowa cale menu na kartce. Zmienila sie jedna cena? Kartka i tak powstaje od poczatku.</p>' +
            '<p>Brzmi jak marnotrawstwo, ale jest sztuczka: zanim kelner poniesie kartke na sale, ktos porownuje nowa wersje ze stara i przepisuje na tablicy tylko te jedna cyfre. Reszta zostaje bez ruchu.</p>' +
            '<p>Vue robi to inaczej: pilnuje, kto o co pytal. Skoro tylko jedno danie interesowalo sie cena, tylko ono dostaje powiadomienie. Zadnego przepisywania calego menu.</p>' +
            '<p>Oba sposoby daja ten sam wynik na tablicy. Roznica jest w tym, ile pracy idzie w kartke, ktorej i tak nikt nie zobaczy. Dlatego w Reactcie warto wiedziec, kiedy kucharz pisze za duzo.</p>',
          en: '<p>Picture a chef who rewrites the entire menu on a sheet of paper for every single order. One price changed? The sheet gets written from scratch anyway.</p>' +
            '<p>Sounds wasteful, but there is a trick: before the waiter carries it out, somebody compares the new sheet with the old one and rewrites only that one digit on the board. Everything else stays untouched.</p>' +
            '<p>Vue does it differently: it keeps track of who asked about what. Since only one dish cared about the price, only that dish gets notified. No rewriting of the whole menu.</p>' +
            '<p>Both approaches put the same thing on the board. The difference is how much effort goes into a sheet nobody will ever see. So in React it pays to know when the chef is writing too much.</p>'
        },
        school: {
          pl: '<p>To jest ta lekcja, po ktorej wszystko inne w Reactcie zaczyna miec sens. <strong>W Vue funkcja setup uruchamia sie raz, a potem reaktywnosc odswieza tylko te fragmenty, ktore czytaly zmieniona wartosc. W Reactcie cala funkcja komponentu wykonuje sie od nowa przy kazdej zmianie stanu</strong> - bo React nie sledzi, co czytales.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst count = ref(0)\nconsole.log("setup")   // wypisze sie RAZ\n&lt;/script&gt;\n&lt;template&gt;&lt;button @click="count++"&gt;{{ count }}&lt;/button&gt;&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>function Counter() {\n  const [count, setCount] = useState(0)\n  console.log("render")  // wypisze sie przy KAZDYM klikniecie\n  return &lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;\n}</code></pre>' +
            '<p>Trzy wnioski, ktore trzeba zapamietac na zawsze:</p>' +
            '<ol>' +
            '<li>Zwykla zmienna zadeklarowana w ciele komponentu ginie przy kazdym renderze. Dlatego stan musi mieszkac w <code>useState</code>, a nie w <code>let</code>.</li>' +
            '<li><code>setCount</code> nie zmienia zmiennej natychmiast. Kolejkuje aktualizacje; <code>count</code> w biezacym renderze pozostaje stary. Jesli nowa wartosc zalezy od poprzedniej, uzywaj wersji funkcyjnej: <code>setCount(c =&gt; c + 1)</code>.</li>' +
            '<li>Re-render nie oznacza dotkniecia DOM. React porownuje wynik ze starym drzewem i patchuje tylko roznice.</li>' +
            '</ol>' +
            '<p>Wazna konsekwencja: stan jest niemutowalny. Gdzie w Vue robiles <code>state.items.push(x)</code>, w Reactcie robisz <code>setItems([...items, x])</code>. Nie dlatego, ze niemutowalnosc jest ladniejsza, tylko dlatego, ze React porownuje referencje - ten sam obiekt oznacza dla niego brak zmiany.</p>' +
            '<p>Aktualizacje sa batchowane: trzy wywolania setterow w jednym handlerze daja jeden render, nie trzy. To odpowiednik kolejki mikrozadan i <code>nextTick</code> w Vue.</p>',
          en: '<p>This is the lesson after which everything else in React starts making sense. <strong>In Vue setup runs once and reactivity then refreshes only the parts that read the changed value. In React the entire component function runs again on every state change</strong> - because React never tracked what you read.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst count = ref(0)\nconsole.log("setup")   // logs ONCE\n&lt;/script&gt;\n&lt;template&gt;&lt;button @click="count++"&gt;{{ count }}&lt;/button&gt;&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>function Counter() {\n  const [count, setCount] = useState(0)\n  console.log("render")  // logs on EVERY click\n  return &lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;\n}</code></pre>' +
            '<p>Three takeaways to keep forever:</p>' +
            '<ol>' +
            '<li>A plain variable declared in the component body dies on every render. State must live in <code>useState</code>, not in a <code>let</code>.</li>' +
            '<li><code>setCount</code> does not change the variable immediately. It queues an update; <code>count</code> in the current render stays old. If the next value depends on the previous one, use the functional form: <code>setCount(c =&gt; c + 1)</code>.</li>' +
            '<li>A re-render does not mean the DOM was touched. React diffs the result against the old tree and patches only the differences.</li>' +
            '</ol>' +
            '<p>Important consequence: state is immutable. Where Vue let you write <code>state.items.push(x)</code>, React wants <code>setItems([...items, x])</code>. Not because immutability is prettier, but because React compares references - the same object means no change to it.</p>' +
            '<p>Updates are batched: three setter calls in one handler produce one render, not three. It is the equivalent of the microtask queue and <code>nextTick</code> in Vue.</p>'
        },
        pro: {
          pl: '<p>Model wykonania: <strong>render</strong> (czysta funkcja, buduje elementy), <strong>reconciliation</strong> (porownanie z poprzednim drzewem) i <strong>commit</strong> (mutacje DOM plus efekty). Render moze zostac przerwany i powtorzony - dlatego musi byc czysty i dlatego <code>StrictMode</code> w devie wola go dwa razy, zeby wylapac efekty uboczne.</p>' +
            '<h4>Dlaczego to inny model kosztowy niz Vue</h4>' +
            '<p>Vue kosztuje mniej wywolan, bo zaleznosci sa sledzone na poziomie wartosci. React kosztuje wiecej wywolan, ale kazde jest tanie i przewidywalne, a diff jest plaski. Praktycznie: aplikacja Reactowa z 2000 komponentow i stanem trzymanym w korzeniu bedzie zacinac sie na klawiaturze, mimo ze DOM prawie sie nie zmienia. Profiler pokaze wtedy dlugi commit fazy render, a nie layout.</p>' +
            '<pre><code>// Zamiast trzymac stan w korzeniu:\nfunction Page() {\n  const [q, setQ] = useState("")     // rerenderuje cala strone\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;&lt;HeavyTable /&gt;&lt;/&gt;\n}\n\n// Skoloku stan albo przekaz drzewo jako children:\nfunction Page({ children }) {\n  const [q, setQ] = useState("")\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;{children}&lt;/&gt;\n}\n// &lt;Page&gt;&lt;HeavyTable /&gt;&lt;/Page&gt; - HeavyTable jest tworzony wyzej,\n// wiec jego element nie zmienia referencji i diff go pomija.</code></pre>' +
            '<h4>Kolejnosc dzwigni</h4>' +
            '<ol>' +
            '<li><strong>Kolokacja</strong> - obniz stan tak nisko, jak sie da. Najtansze i najskuteczniejsze.</li>' +
            '<li><strong>Children jako props</strong> - opisany wyzej trik, dziala bez memo.</li>' +
            '<li><strong>React.memo plus useMemo/useCallback</strong> - dopiero gdy pierwsze dwa nie wystarcza. Kazde memo kosztuje porownanie i pamiec.</li>' +
            '<li><strong>useTransition / useDeferredValue</strong> - gdy render jest z natury ciezki (filtrowanie duzej listy) i chcesz zachowac responsywnosc wpisywania.</li>' +
            '</ol>' +
            '<p>W React 19 dochodzi kompilator, ktory automatycznie wstawia memoizacje na podstawie analizy kodu - efektywnie zblizajac ergonomie do Vue. Nie zwalnia to jednak z kolokacji: kompilator nie przeniesie stanu za ciebie.</p>' +
            '<p>Liczby, ktore warto miec w glowie: render prostego komponentu to okolo 5-50 mikrosekund, wiec 500 niepotrzebnych renderow na keystroke to juz odczuwalne kilkanascie milisekund. Budzet na interakcje to 50 ms, wiec problem robi sie realny szybciej, niz sie wydaje.</p>' +
            '<p>Na rozmowie pada klasyk: dlaczego <code>setCount(count + 1)</code> trzy razy pod rzad zwiekszy licznik o jeden. Odpowiedz: <code>count</code> jest zamrozony w domknieciu tego renderu, a aktualizacje sa kolejkowane - wersja funkcyjna to naprawia.</p>',
          en: '<p>Execution model: <strong>render</strong> (a pure function that builds elements), <strong>reconciliation</strong> (diff against the previous tree) and <strong>commit</strong> (DOM mutations plus effects). Render can be interrupted and replayed - which is why it must be pure and why <code>StrictMode</code> calls it twice in development to expose side effects.</p>' +
            '<h4>Why the cost model differs from Vue</h4>' +
            '<p>Vue costs fewer calls because dependencies are tracked per value. React costs more calls, but each is cheap and predictable, and the diff is flat. In practice: a React app with 2000 components and root-level state will stutter on keystrokes even though the DOM barely changes. The profiler shows a long render phase, not layout.</p>' +
            '<pre><code>// Instead of keeping state at the root:\nfunction Page() {\n  const [q, setQ] = useState("")     // re-renders the whole page\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;&lt;HeavyTable /&gt;&lt;/&gt;\n}\n\n// Colocate, or pass the tree as children:\nfunction Page({ children }) {\n  const [q, setQ] = useState("")\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;{children}&lt;/&gt;\n}\n// &lt;Page&gt;&lt;HeavyTable /&gt;&lt;/Page&gt; - HeavyTable is created higher up,\n// so its element keeps its reference and the diff skips it.</code></pre>' +
            '<h4>Order of levers</h4>' +
            '<ol>' +
            '<li><strong>Colocation</strong> - push state as low as it goes. Cheapest and most effective.</li>' +
            '<li><strong>Children as props</strong> - the trick above, works without memo.</li>' +
            '<li><strong>React.memo plus useMemo/useCallback</strong> - only when the first two are not enough. Every memo costs a comparison and memory.</li>' +
            '<li><strong>useTransition / useDeferredValue</strong> - when the render is genuinely heavy (filtering a big list) and you want typing to stay responsive.</li>' +
            '</ol>' +
            '<p>React 19 adds a compiler that inserts memoization automatically from static analysis, bringing the ergonomics closer to Vue. It does not excuse bad colocation though: the compiler will not move state for you.</p>' +
            '<p>Numbers worth carrying: rendering a simple component costs roughly 5-50 microseconds, so 500 needless renders per keystroke is already a noticeable ten-plus milliseconds. The interaction budget is 50 ms, so the problem becomes real sooner than people expect.</p>' +
            '<p>The classic interview question: why calling <code>setCount(count + 1)</code> three times in a row increments by one. Answer: <code>count</code> is frozen in that render closure and updates are queued - the functional form fixes it.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ile razy wykona sie cialo funkcji komponentu Reacta po dziesieciu zmianach stanu?',
            en: 'How many times does a React component function body run after ten state changes?'
          },
          options: [
            { pl: 'Raz, jak setup w Vue', en: 'Once, like Vue setup' },
            { pl: 'Co najmniej raz na kazda zmiane, ktora nie zostala zbatchowana', en: 'At least once per change that was not batched' },
            { pl: 'Tylko przy montowaniu i odmontowaniu', en: 'Only on mount and unmount' },
            { pl: 'Nigdy - JSX jest kompilowany statycznie', en: 'Never - JSX is compiled statically' }
          ],
          correct: 1,
          explain: {
            pl: 'Funkcja komponentu jest wywolywana ponownie przy kazdym renderze. Setup w Vue uruchamia sie raz, bo reaktywnosc dziala na poziomie wartosci.',
            en: 'The component function is called again on every render. Vue setup runs once because reactivity works at the value level.'
          }
        },
        {
          q: {
            pl: 'W jednym handlerze wolasz setCount(count + 1) trzy razy. Jaki bedzie wynik?',
            en: 'You call setCount(count + 1) three times in one handler. What is the result?'
          },
          options: [
            { pl: 'Licznik rosnie o trzy', en: 'The counter grows by three' },
            { pl: 'Rzucany jest blad o zbyt wielu aktualizacjach', en: 'An error about too many updates is thrown' },
            { pl: 'Licznik rosnie o jeden', en: 'The counter grows by one' },
            { pl: 'Nastepuja trzy osobne rendery po jednym przyroscie', en: 'Three separate renders happen with one increment each' }
          ],
          correct: 2,
          explain: {
            pl: 'count jest zamrozony w domknieciu biezacego renderu, wiec trzy razy liczysz to samo. setCount(c => c + 1) rozwiazuje problem.',
            en: 'count is frozen in the current render closure, so you compute the same value three times. setCount(c => c + 1) fixes it.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Reactcie nie robisz items.push(x) na stanie?',
            en: 'Why should you not do items.push(x) on React state?'
          },
          options: [
            { pl: 'Bo push jest wolniejszy niz spread', en: 'Because push is slower than a spread' },
            { pl: 'Bo React porownuje referencje i ta sama tablica oznacza brak zmiany', en: 'Because React compares references and the same array means no change' },
            { pl: 'Bo tablice sa zamrozone przez Object.freeze', en: 'Because arrays are frozen with Object.freeze' },
            { pl: 'Bo push nie dziala w trybie StrictMode', en: 'Because push does not work in StrictMode' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie ma proxy sledzacych mutacje jak Vue. Nowa referencja to jedyny sygnal, ze cos sie zmienilo.',
            en: 'React has no mutation-tracking proxies like Vue. A new reference is the only signal that something changed.'
          }
        },
        {
          q: {
            pl: 'Wpisywanie w pole wyszukiwania zacina sie, choc DOM prawie sie nie zmienia. Ktory ruch najczesciej pomaga jako pierwszy?',
            en: 'Typing in a search field stutters even though the DOM barely changes. Which move usually helps first?'
          },
          options: [
            { pl: 'Owinac wszystko w useMemo', en: 'Wrap everything in useMemo' },
            { pl: 'Zamienic kontrolowany input na niekontrolowany z refem', en: 'Swap the controlled input for an uncontrolled one with a ref' },
            { pl: 'Wlaczyc StrictMode w produkcji', en: 'Enable StrictMode in production' },
            { pl: 'Obnizyc stan do komponentu pola i oddzielic ciezkie poddrzewo przez children', en: 'Push state down into the field and split off the heavy subtree via children' }
          ],
          correct: 3,
          explain: {
            pl: 'Problem to faza renderu calego poddrzewa, wiec kolokacja stanu i przekazanie ciezkiej czesci jako children usuwa przyczyne. Memo doklada tylko koszt porownan.',
            en: 'The problem is the render phase over the whole subtree, so colocating state and passing the heavy part as children removes the cause. Memo only adds comparison cost.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      id: 'reconciliation-keys',
      title: {
        pl: 'Reconciliation i klucze',
        en: 'Reconciliation and keys'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="150" y="28" text-anchor="middle" font-size="15" fill="var(--err)">key = index</text>' +
          '<text x="480" y="28" text-anchor="middle" font-size="15" fill="var(--ok)">key = stable id</text>' +
          '<rect x="40" y="46" width="220" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="150" y="69" text-anchor="middle" font-size="13" fill="var(--muted)">0: Ada    1: Bo    2: Cy</text>' +
          '<line x1="150" y1="84" x2="150" y2="112" stroke="var(--accent)" stroke-width="2" marker-end="url(#r5a)"/>' +
          '<text x="150" y="106" text-anchor="middle" font-size="12" fill="var(--muted)"> </text>' +
          '<rect x="40" y="118" width="220" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="150" y="141" text-anchor="middle" font-size="13" fill="var(--err)">0: Zoe   1: Ada   2: Bo</text>' +
          '<text x="150" y="180" text-anchor="middle" font-size="13" fill="var(--err)">every slot changed</text>' +
          '<text x="150" y="202" text-anchor="middle" font-size="13" fill="var(--err)">inputs keep the wrong state</text>' +
          '<rect x="370" y="46" width="230" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="485" y="69" text-anchor="middle" font-size="13" fill="var(--muted)">a1: Ada   b2: Bo   c3: Cy</text>' +
          '<line x1="485" y1="84" x2="485" y2="112" stroke="var(--accent)" stroke-width="2" marker-end="url(#r5a)"/>' +
          '<rect x="370" y="118" width="230" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="141" text-anchor="middle" font-size="13" fill="var(--ok)">z0: Zoe  a1: Ada  b2: Bo</text>' +
          '<text x="485" y="180" text-anchor="middle" font-size="13" fill="var(--ok)">one node inserted</text>' +
          '<text x="485" y="202" text-anchor="middle" font-size="13" fill="var(--ok)">state follows identity</text>' +
          '<rect x="50" y="232" width="540" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="260" text-anchor="middle" font-size="15" fill="var(--text)">The diff rule</text>' +
          '<text x="320" y="288" text-anchor="middle" font-size="13" fill="var(--muted)">same type + same key  =  keep the instance and its state</text>' +
          '<text x="320" y="312" text-anchor="middle" font-size="13" fill="var(--muted)">different type or key  =  unmount, then mount a fresh one</text>' +
          '<text x="320" y="340" text-anchor="middle" font-size="13" fill="var(--accent)">position in the tree is part of the identity</text>' +
          '<text x="320" y="362" text-anchor="middle" font-size="13" fill="var(--muted)">same rule as :key in Vue, with harsher consequences</text>' +
          '</svg>',
        caption: {
          pl: 'Klucz mowi Reactowi, ktory element to ten sam element. Indeks jako klucz przy wstawianiu na poczatek przesuwa stan do zlych wierszy.',
          en: 'A key tells React which element is the same element. Using the index as a key shifts state into the wrong rows when you prepend.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Wstawiamy Zoe na poczatek listy z polami tekstowymi - najpierw z kluczem po indeksie, potem z kluczem po id.',
          en: 'Prepending Zoe to a list of text fields - first with index keys, then with id keys.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Start: three rows, each with its own input state</text>' +
              '<rect x="120" y="60" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="88" font-size="14" fill="var(--muted)">key 0</text>' +
              '<text x="240" y="88" font-size="14" fill="var(--text)">Ada</text>' +
              '<text x="380" y="88" font-size="14" fill="var(--accent2)">typed: aaa</text>' +
              '<rect x="120" y="118" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="146" font-size="14" fill="var(--muted)">key 1</text>' +
              '<text x="240" y="146" font-size="14" fill="var(--text)">Bo</text>' +
              '<text x="380" y="146" font-size="14" fill="var(--accent2)">typed: bbb</text>' +
              '<rect x="120" y="176" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="204" font-size="14" fill="var(--muted)">key 2</text>' +
              '<text x="240" y="204" font-size="14" fill="var(--text)">Cy</text>' +
              '<text x="380" y="204" font-size="14" fill="var(--accent2)">typed: ccc</text>' +
              '<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">state lives in the component instance, not in the data</text>' +
              '</svg>',
            label: { pl: 'Punkt wyjscia', en: 'Starting point' },
            note: {
              pl: 'Kazdy wiersz ma wlasny input i wlasny stan lokalny. Klucze to indeksy: 0, 1, 2.',
              en: 'Each row has its own input and its own local state. The keys are indexes: 0, 1, 2.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--warn)">Zoe is prepended - the data shifts down</text>' +
              '<rect x="120" y="60" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="150" y="88" font-size="14" fill="var(--muted)">key 0</text>' +
              '<text x="240" y="88" font-size="14" fill="var(--warn)">Zoe</text>' +
              '<text x="380" y="88" font-size="14" fill="var(--accent2)">typed: aaa</text>' +
              '<rect x="120" y="118" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="150" y="146" font-size="14" fill="var(--muted)">key 1</text>' +
              '<text x="240" y="146" font-size="14" fill="var(--warn)">Ada</text>' +
              '<text x="380" y="146" font-size="14" fill="var(--accent2)">typed: bbb</text>' +
              '<rect x="120" y="176" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="150" y="204" font-size="14" fill="var(--muted)">key 2</text>' +
              '<text x="240" y="204" font-size="14" fill="var(--warn)">Bo</text>' +
              '<text x="380" y="204" font-size="14" fill="var(--accent2)">typed: ccc</text>' +
              '<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--warn)">keys stayed 0,1,2 so React thinks these are the same rows</text>' +
              '</svg>',
            label: { pl: 'Bug z indeksem', en: 'The index bug' },
            note: {
              pl: 'Nazwy przesunely sie o jeden, ale klucze nie. React uznaje, ze to te same instancje i zostawia stara zawartosc inputow przy zlych osobach.',
              en: 'The names shifted by one but the keys did not. React treats these as the same instances and leaves the old input contents attached to the wrong people.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--err)">Consequence: three rows patched, state mismatched</text>' +
              '<rect x="120" y="60" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/>' +
              '<text x="150" y="88" font-size="14" fill="var(--muted)">key 0</text>' +
              '<text x="240" y="88" font-size="14" fill="var(--err)">Zoe</text>' +
              '<text x="380" y="88" font-size="14" fill="var(--err)">shows aaa</text>' +
              '<rect x="120" y="118" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/>' +
              '<text x="150" y="146" font-size="14" fill="var(--muted)">key 1</text>' +
              '<text x="240" y="146" font-size="14" fill="var(--err)">Ada</text>' +
              '<text x="380" y="146" font-size="14" fill="var(--err)">shows bbb</text>' +
              '<rect x="120" y="176" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/>' +
              '<text x="150" y="204" font-size="14" fill="var(--muted)">key 2</text>' +
              '<text x="240" y="204" font-size="14" fill="var(--err)">Bo</text>' +
              '<text x="380" y="204" font-size="14" fill="var(--err)">shows ccc</text>' +
              '<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--err)">and Cy was unmounted, losing its state entirely</text>' +
              '</svg>',
            label: { pl: 'Skutek', en: 'The consequence' },
            note: {
              pl: 'Trzy wiersze musialy zostac zaktualizowane, a stan inputow trafil do zlych osob. Ostatni wiersz zniknal razem ze swoim stanem.',
              en: 'Three rows had to be patched and the input state landed on the wrong people. The last row was unmounted together with its state.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--ok)">Same change with key = row id</text>' +
              '<rect x="120" y="60" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="150" y="88" font-size="14" fill="var(--ok)">key z0</text>' +
              '<text x="240" y="88" font-size="14" fill="var(--ok)">Zoe</text>' +
              '<text x="380" y="88" font-size="14" fill="var(--ok)">fresh, empty</text>' +
              '<rect x="120" y="118" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="146" font-size="14" fill="var(--muted)">key a1</text>' +
              '<text x="240" y="146" font-size="14" fill="var(--text)">Ada</text>' +
              '<text x="380" y="146" font-size="14" fill="var(--accent2)">typed: aaa</text>' +
              '<rect x="120" y="176" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="204" font-size="14" fill="var(--muted)">key b2</text>' +
              '<text x="240" y="204" font-size="14" fill="var(--text)">Bo</text>' +
              '<text x="380" y="204" font-size="14" fill="var(--accent2)">typed: bbb</text>' +
              '<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--ok)">one insert, zero patches, state stayed with its owner</text>' +
              '</svg>',
            label: { pl: 'Klucz po id', en: 'Keyed by id' },
            note: {
              pl: 'Stabilne id pozwala Reactowi rozpoznac, ze Ada i Bo to te same instancje, a Zoe jest nowa. To dokladnie ta sama zasada, co :key w Vue.',
              en: 'A stable id lets React see that Ada and Bo are the same instances and Zoe is new. Exactly the same principle as :key in Vue.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--accent)">Key as a deliberate reset tool</text>' +
              '<rect x="120" y="60" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="150" y="88" font-size="14" fill="var(--accent)">key user-7</text>' +
              '<text x="300" y="88" font-size="14" fill="var(--text)">EditForm  (draft kept)</text>' +
              '<text x="320" y="132" text-anchor="middle" font-size="14" fill="var(--muted)">user changes to 8</text>' +
              '<rect x="120" y="152" width="400" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="150" y="180" font-size="14" fill="var(--ok)">key user-8</text>' +
              '<text x="300" y="180" font-size="14" fill="var(--ok)">EditForm  (draft cleared)</text>' +
              '<rect x="90" y="222" width="460" height="72" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="250" text-anchor="middle" font-size="13" fill="var(--muted)">changing the key unmounts and remounts on purpose</text>' +
              '<text x="320" y="276" text-anchor="middle" font-size="13" fill="var(--accent)">the React way to say: this is a different thing now</text>' +
              '</svg>',
            label: { pl: 'Klucz jako reset', en: 'Key as a reset' },
            note: {
              pl: 'Zmiana klucza celowo niszczy instancje i tworzy nowa. Zamiast watcha resetujacego formularz po zmianie id, dajesz key={userId}.',
              en: 'Changing the key deliberately destroys the instance and creates a new one. Instead of a watcher resetting the form when the id changes, you write key={userId}.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie szatnie z wieszakami. Kazda kurtka dostaje numerek. Kiedy przychodzisz po swoja kurtke, podajesz numerek i dostajesz dokladnie ta swoja.</p>' +
            '<p>A teraz zla wersja: numerki sa przypisane do <em>miejsca na drazku</em>, nie do kurtki. Ktos wciska nowa kurtke na sam poczatek, wszystko przesuwa sie o jedno miejsce - i nagle numerek jeden nalezy do kogos innego. Ludzie wychodza w cudzych plaszczach.</p>' +
            '<p>Dokladnie to robi React, gdy jako numerek dasz pozycje na liscie. Trzeba dac numerek, ktory nalezy do rzeczy, a nie do polki: identyfikator z bazy.</p>' +
            '<p>Bonus: skoro numerek decyduje o tozsamosci, to zmieniajac go celowo, mowisz Reactowi <em>to juz inna kurtka</em> - i wszystko zaczyna sie od nowa.</p>',
          en: '<p>Picture a cloakroom with hangers. Every coat gets a tag. When you come back you hand over the tag and get exactly your coat.</p>' +
            '<p>Now the broken version: tags belong to a <em>spot on the rail</em>, not to a coat. Someone squeezes a new coat in at the front, everything shifts by one place - and suddenly tag one belongs to somebody else. People walk out in strangers coats.</p>' +
            '<p>That is precisely what React does when you use the position in the list as the tag. You need a tag that belongs to the thing, not to the shelf: an id from your database.</p>' +
            '<p>Bonus: since the tag decides identity, changing it on purpose tells React <em>this is a different coat now</em> - and everything starts fresh.</p>'
        },
        school: {
          pl: '<p>Reconciliation to algorytm, ktory porownuje nowe drzewo elementow ze starym. Regula jest krotka: <strong>ten sam typ komponentu w tym samym miejscu i z tym samym kluczem oznacza te sama instancje</strong>, wiec stan i DOM sa zachowywane. Inny typ albo inny klucz - stara instancja jest odmontowywana, nowa montowana od zera.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;TodoRow v-for="t in todos" :key="t.id" :todo="t" /&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>{todos.map(t =&gt; &lt;TodoRow key={t.id} todo={t} /&gt;)}</code></pre>' +
            '<p>Wyglada identycznie i w istocie <strong>w Vue uzywales :key i w Reactcie uzywasz key z tego samego powodu</strong>: oba runtime musza wiedziec, ktory wezel to ktory. Roznica jest w konsekwencjach. Vue czesciej wybroni sie samo, bo ma patch flagi i dodatkowe heurystyki. React bez klucza traktuje pozycje jako tozsamosc, wiec przy wstawianiu na poczatek stan komponentow przesuwa sie do zlych wierszy.</p>' +
            '<p>Trzy praktyczne reguly:</p>' +
            '<ul>' +
            '<li>Klucz musi byc <strong>stabilny</strong> - id z bazy albo uuid nadany przy tworzeniu. Nigdy <code>Math.random()</code>, bo to gwarantowany remount przy kazdym renderze.</li>' +
            '<li>Indeks jest bezpieczny tylko wtedy, gdy lista jest tylko do odczytu i nigdy nie zmienia kolejnosci ani dlugosci na poczatku.</li>' +
            '<li>Klucz jest lokalny dla rodzenstwa, nie globalny - dwie rozne listy moga miec te same klucze.</li>' +
            '</ul>' +
            '<p>Jest tez druga strona medalu: klucz jako narzedzie. <code>&lt;Form key={userId} /&gt;</code> resetuje caly formularz przy zmianie uzytkownika. W Vue zwykle pisalbys do tego <code>watch</code> czyszczacy pola - tutaj wystarczy zmienic tozsamosc komponentu.</p>',
          en: '<p>Reconciliation is the algorithm that diffs the new element tree against the old one. The rule is short: <strong>the same component type, in the same position, with the same key means the same instance</strong>, so state and DOM survive. A different type or key means the old instance unmounts and a new one mounts from scratch.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;TodoRow v-for="t in todos" :key="t.id" :todo="t" /&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>{todos.map(t =&gt; &lt;TodoRow key={t.id} todo={t} /&gt;)}</code></pre>' +
            '<p>It looks identical, and indeed <strong>you used :key in Vue and you use key in React for the same reason</strong>: both runtimes need to know which node is which. The difference is in the consequences. Vue often gets away with it thanks to patch flags and extra heuristics. React without a key treats position as identity, so prepending shifts component state into the wrong rows.</p>' +
            '<p>Three practical rules:</p>' +
            '<ul>' +
            '<li>The key must be <strong>stable</strong> - a database id or a uuid assigned at creation. Never <code>Math.random()</code>, which guarantees a remount on every render.</li>' +
            '<li>An index is safe only for a read-only list that never reorders and never gets items inserted at the front.</li>' +
            '<li>Keys are local to siblings, not global - two different lists may reuse the same keys.</li>' +
            '</ul>' +
            '<p>There is a flip side: the key as a tool. <code>&lt;Form key={userId} /&gt;</code> resets the whole form when the user changes. In Vue you would usually write a <code>watch</code> to clear the fields - here you just change the component identity.</p>'
        },
        pro: {
          pl: '<p>Reconciler Reacta jest z zalozenia heurystyczny i liniowy: nie szuka minimalnej odleglosci edycyjnej miedzy drzewami, tylko porownuje rodzenstwo po kolei, uzywajac mapy kluczy. Zalozenie brzmi: elementy roznego typu produkuja rozne drzewa, a deweloper podpowie tozsamosc kluczem. To daje zlozonosc O(n) zamiast O(n^3).</p>' +
            '<h4>Co dokladnie ginie przy remount</h4>' +
            '<ul>' +
            '<li>Stan hookow (<code>useState</code>, <code>useReducer</code>) tego poddrzewa.</li>' +
            '<li>Efekty - odpalaja sie cleanupy, potem efekty montujace na nowo. Subskrypcje, timery i zapytania startuja od zera.</li>' +
            '<li>Stan DOM nieodzwierciedlony w Reactcie: pozycja scrolla, focus, zaznaczenie tekstu, stan odtwarzania video.</li>' +
            '</ul>' +
            '<p>Ostatni punkt jest tym, co najczesciej trafia na produkcje jako bug zglaszany przez uzytkownikow: przy dodaniu rekordu na gore listy pole traci focus w polowie pisania.</p>' +
            '<pre><code>// Anty-wzorzec: nowy typ komponentu na kazdy render\nfunction Page() {\n  const Row = ({ item }) =&gt; &lt;li&gt;{item.name}&lt;/li&gt;  // nowa referencja za kazdym razem\n  return &lt;ul&gt;{items.map(i =&gt; &lt;Row key={i.id} item={i} /&gt;)}&lt;/ul&gt;\n}\n// Rezultat: caly poddrzewo montuje sie od nowa przy kazdym renderze.</code></pre>' +
            '<h4>Roznice wobec Vue, ktore realnie bola przy migracji</h4>' +
            '<p>W Vue <code>v-if</code> na dwoch galeziach o tym samym typie komponentu tez potrafi ponownie uzyc instancji i wymaga <code>key</code>, wiec sam problem jest znajomy. Nowe jest to, ze w Reactcie <em>pozycja w drzewie</em> jest czescia tozsamosci nawet bez list: <code>{cond ? &lt;Input /&gt; : &lt;Input /&gt;}</code> zachowa stan, bo to ten sam typ na tej samej pozycji. To najczestsze pytanie podchwytliwe na rozmowach.</p>' +
            '<p>Praktyczne wnioski dla duzych list:</p>' +
            '<ol>' +
            '<li>Nadawaj id przy tworzeniu rekordu po stronie klienta (<code>crypto.randomUUID()</code>), nie czekaj na odpowiedz serwera - inaczej optimistic update dostanie nowy klucz i remount.</li>' +
            '<li>Przy wirtualizacji (react-window, TanStack Virtual) klucz musi pochodzic z danych, nie z indeksu okna, inaczej scroll bedzie mieszal stan wierszy.</li>' +
            '<li>Sortowanie po stronie klienta bez stabilnych kluczy to najszybsza droga do zgubionego focusu.</li>' +
            '</ol>' +
            '<p>Warto tez znac koszt: React nie wykrywa przeniesienia poddrzewa w inne miejsce w drzewie. Przeniesiony komponent zawsze montuje sie od nowa, niezaleznie od klucza. Vue ma tu takie samo ograniczenie - to nie jest wada implementacji, tylko konsekwencja porownania po rodzenstwie.</p>',
          en: '<p>The React reconciler is deliberately heuristic and linear: it does not search for a minimal tree edit distance, it walks siblings in order using a key map. The assumption is that different element types produce different trees and that the developer supplies identity via keys. That buys O(n) instead of O(n^3).</p>' +
            '<h4>What exactly is lost on remount</h4>' +
            '<ul>' +
            '<li>Hook state (<code>useState</code>, <code>useReducer</code>) for that subtree.</li>' +
            '<li>Effects - cleanups fire, then mount effects run again. Subscriptions, timers and queries restart from zero.</li>' +
            '<li>DOM state React does not model: scroll position, focus, text selection, video playback position.</li>' +
            '</ul>' +
            '<p>That last point is the one that reaches production as a user-reported bug: adding a record to the top of a list steals focus mid-typing.</p>' +
            '<pre><code>// Anti-pattern: a new component type on every render\nfunction Page() {\n  const Row = ({ item }) =&gt; &lt;li&gt;{item.name}&lt;/li&gt;  // new reference each time\n  return &lt;ul&gt;{items.map(i =&gt; &lt;Row key={i.id} item={i} /&gt;)}&lt;/ul&gt;\n}\n// Result: the whole subtree remounts on every render.</code></pre>' +
            '<h4>Differences from Vue that actually bite in a migration</h4>' +
            '<p>In Vue, <code>v-if</code> across two branches of the same component type can also reuse the instance and needs a <code>key</code>, so the problem itself is familiar. What is new is that in React <em>position in the tree</em> is part of identity even without lists: <code>{cond ? &lt;Input /&gt; : &lt;Input /&gt;}</code> preserves state, because it is the same type in the same slot. This is the most common trick question in interviews.</p>' +
            '<p>Practical rules for large lists:</p>' +
            '<ol>' +
            '<li>Assign ids when the record is created client-side (<code>crypto.randomUUID()</code>) rather than waiting for the server - otherwise an optimistic update gets a new key and remounts.</li>' +
            '<li>With virtualization (react-window, TanStack Virtual) the key must come from the data, not from the window index, or scrolling will scramble row state.</li>' +
            '<li>Client-side sorting without stable keys is the fastest route to lost focus.</li>' +
            '</ol>' +
            '<p>Also worth knowing the limit: React does not detect a subtree moved elsewhere in the tree. A relocated component always remounts, key or not. Vue has the same limitation - it is not an implementation flaw, it follows from sibling-level diffing.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Po co Reactowi prop key na elementach listy?',
            en: 'Why does React need a key prop on list items?'
          },
          options: [
            { pl: 'Do ustalenia kolejnosci CSS', en: 'To determine CSS ordering' },
            { pl: 'Do rozpoznania, ktory element to ta sama instancja', en: 'To recognise which element is the same instance' },
            { pl: 'Do cacheowania odpowiedzi z API', en: 'To cache API responses' },
            { pl: 'Do wygenerowania atrybutu id w DOM', en: 'To generate a DOM id attribute' }
          ],
          correct: 1,
          explain: {
            pl: 'Klucz to tozsamosc elementu w obrebie rodzenstwa. Bez niego React uzywa pozycji, co przy zmianie kolejnosci przesuwa stan.',
            en: 'The key is the identity of an element among its siblings. Without one React falls back to position, which shifts state when the order changes.'
          }
        },
        {
          q: {
            pl: 'Co dzieje sie ze stanem komponentu, gdy zmienisz jego key?',
            en: 'What happens to a component state when you change its key?'
          },
          options: [
            { pl: 'Stan jest zachowany, zmienia sie tylko DOM', en: 'State is preserved, only the DOM changes' },
            { pl: 'Stan jest scalany ze starym', en: 'State is merged with the old one' },
            { pl: 'Instancja jest odmontowywana i tworzona od nowa, stan znika', en: 'The instance unmounts and remounts, state is gone' },
            { pl: 'Nic - key wplywa tylko na wydajnosc', en: 'Nothing - key only affects performance' }
          ],
          correct: 2,
          explain: {
            pl: 'Inny klucz oznacza inna tozsamosc, wiec remount. To celowa technika resetowania formularzy, np. key={userId}.',
            en: 'A different key means a different identity, so a remount. This is a deliberate technique for resetting forms, for example key={userId}.'
          }
        },
        {
          q: {
            pl: 'Kiedy indeks jest akceptowalnym kluczem?',
            en: 'When is an index an acceptable key?'
          },
          options: [
            { pl: 'Gdy lista jest statyczna, bez sortowania i wstawiania', en: 'When the list is static, never sorted and never inserted into' },
            { pl: 'Zawsze, jesli elementy nie maja wlasnego stanu w DOM', en: 'Always, as long as items have no DOM state' },
            { pl: 'Gdy lista jest krotsza niz 50 elementow', en: 'When the list is shorter than 50 items' },
            { pl: 'Nigdy - React to odrzuci', en: 'Never - React rejects it' }
          ],
          correct: 0,
          explain: {
            pl: 'Indeks jest bezpieczny tylko dla listy niezmiennej pod wzgledem kolejnosci i dlugosci od poczatku. Kazde wstawienie na gore lamie tozsamosc.',
            en: 'An index is safe only for a list whose order and leading length never change. Any prepend breaks identity.'
          }
        },
        {
          q: {
            pl: 'Piszesz {isEdit ? <Input /> : <Input />} i dziwisz sie, ze po przelaczeniu wpisany tekst zostaje. Dlaczego?',
            en: 'You write {isEdit ? <Input /> : <Input />} and are surprised the typed text survives the toggle. Why?'
          },
          options: [
            { pl: 'Bo React cacheuje wartosci inputow globalnie', en: 'Because React caches input values globally' },
            { pl: 'Bo przegladarka przywraca wartosc z autofill', en: 'Because the browser restores the value from autofill' },
            { pl: 'Bo brakuje atrybutu defaultValue', en: 'Because a defaultValue attribute is missing' },
            { pl: 'Bo to ten sam typ komponentu na tej samej pozycji, wiec ta sama instancja', en: 'Because it is the same component type in the same slot, hence the same instance' }
          ],
          correct: 3,
          explain: {
            pl: 'Pozycja w drzewie jest czescia tozsamosci. Zeby wymusic swiezy komponent, nadaj rozne klucze, np. key="edit" i key="view".',
            en: 'Position in the tree is part of identity. To force a fresh component give them different keys, for example key="edit" and key="view".'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 6
    {
      id: 'react19-landscape',
      title: {
        pl: 'Krajobraz React 19',
        en: 'The React 19 landscape'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">What React 19 changes for a Vue dev</text>' +
          '<rect x="30" y="52" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="165" y="78" text-anchor="middle" font-size="14" fill="var(--text)">React Compiler</text>' +
          '<text x="165" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">auto memo, no useCallback</text>' +
          '<text x="165" y="120" text-anchor="middle" font-size="13" fill="var(--ok)">closer to Vue ergonomics</text>' +
          '<rect x="340" y="52" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="475" y="78" text-anchor="middle" font-size="14" fill="var(--text)">Actions + useActionState</text>' +
          '<text x="475" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">pending, errors, optimistic</text>' +
          '<text x="475" y="120" text-anchor="middle" font-size="13" fill="var(--ok)">forms without boilerplate</text>' +
          '<rect x="30" y="148" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="165" y="174" text-anchor="middle" font-size="14" fill="var(--text)">use() hook</text>' +
          '<text x="165" y="196" text-anchor="middle" font-size="13" fill="var(--muted)">read a promise or context</text>' +
          '<text x="165" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">pairs with Suspense</text>' +
          '<rect x="340" y="148" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="475" y="174" text-anchor="middle" font-size="14" fill="var(--text)">Server Components</text>' +
          '<text x="475" y="196" text-anchor="middle" font-size="13" fill="var(--muted)">render on the server only</text>' +
          '<text x="475" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">no Vue equivalent yet</text>' +
          '<rect x="30" y="244" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="165" y="270" text-anchor="middle" font-size="14" fill="var(--text)">ref as a prop</text>' +
          '<text x="165" y="292" text-anchor="middle" font-size="13" fill="var(--muted)">forwardRef retired</text>' +
          '<text x="165" y="312" text-anchor="middle" font-size="13" fill="var(--muted)">metadata hoisting built in</text>' +
          '<rect x="340" y="244" width="270" height="76" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="475" y="270" text-anchor="middle" font-size="14" fill="var(--text)">Still manual</text>' +
          '<text x="475" y="292" text-anchor="middle" font-size="13" fill="var(--muted)">state colocation, keys</text>' +
          '<text x="475" y="312" text-anchor="middle" font-size="13" fill="var(--muted)">effect discipline</text>' +
          '<line x1="320" y1="330" x2="320" y2="352" stroke="var(--accent)" stroke-width="2" marker-end="url(#r6a)"/>' +
          '<rect x="60" y="356" width="520" height="50" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="386" text-anchor="middle" font-size="14" fill="var(--text)">the mental model stays the same: UI = f(state)</text>' +
          '</svg>',
        caption: {
          pl: 'React 19 automatyzuje memoizacje i upraszcza formularze, ale nie zmienia modelu mentalnego: nadal renderujesz cala funkcje i nadal sam decydujesz, gdzie mieszka stan.',
          en: 'React 19 automates memoization and simplifies forms, but it does not change the mental model: you still re-run the whole function and you still decide where state lives.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze przez lata jezdziles autem, w ktorym trzeba bylo recznie zmieniac biegi, dolewac plyn i pamietac o swiatlach. Dziala, ale trzeba duzo pamietac.</p>' +
            '<p>React 19 to ta sama droga i to samo auto, tylko z automatyczna skrzynia. Wiekszosc rzeczy, o ktorych trzeba bylo pamietac, robi sie sama. Silnik sie nie zmienil - dalej jedziesz tak samo, tylko mniej sie meczysz.</p>' +
            '<p>Doszlo tez kilka gadzetow: wygodniejsza obsluga formularzy, latwiejsze czekanie na dane i mozliwosc przygotowania czesci ekranu jeszcze na serwerze, zanim auto ruszy.</p>' +
            '<p>Najwazniejsze: reguly jazdy sa te same. Kto zna droge, ten nie musi uczyc sie od nowa.</p>',
          en: '<p>Imagine you spent years driving a car where you shifted gears by hand, topped up fluids and remembered to switch the lights on. It works, but it is a lot to remember.</p>' +
            '<p>React 19 is the same road and the same car, just with an automatic gearbox. Most of the things you had to remember now happen by themselves. The engine did not change - you drive the same way, only with less effort.</p>' +
            '<p>A few gadgets arrived too: nicer form handling, easier waiting for data, and the ability to prepare part of the screen on the server before the car even moves.</p>' +
            '<p>The important bit: the rules of the road are unchanged. If you know the route, you do not have to relearn it.</p>'
        },
        school: {
          pl: '<p>Jesli przesiadasz sie z Vue 3 w 2026 roku, wchodzisz do Reacta w dobrym momencie - najwiekszy zarzut wobec Reacta, czyli reczna memoizacja, wlasnie znika.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>Kompilator analizuje kod i sam wstawia memoizacje tam, gdzie ma to sens. <strong>W Vue nigdy nie pisales useCallback, bo kompilator i reaktywnosc robily to za ciebie - w Reactcie 19 zaczyna byc podobnie.</strong> Kod ktory kiedys wygladal tak:</p>' +
            '<pre><code>// React 18\nconst handle = useCallback(() =&gt; onPick(id), [onPick, id])\nconst rows = useMemo(() =&gt; items.filter(f), [items, f])</code></pre>' +
            '<p>teraz mozna pisac po prostu jako zwykle wyrazenia, a kompilator dopisze reszte. Kompilator jest opt-in na poziomie pluginu bundlera i wymaga poprawnego kodu (regula hookow, brak mutacji w renderze).</p>' +
            '<h4>Formularze i akcje</h4>' +
            '<pre><code>function Save() {\n  const [state, action, pending] = useActionState(saveUser, null)\n  return &lt;form action={action}&gt;\n    &lt;input name="name" /&gt;\n    &lt;button disabled={pending}&gt;Save&lt;/button&gt;\n  &lt;/form&gt;\n}</code></pre>' +
            '<p>To odpowiednik tego, co w Vue skladales z <code>ref(loading)</code>, <code>try/catch</code> i wlasnego composable. Doszly tez <code>useOptimistic</code> (optymistyczne UI bez recznego rollbacku) i <code>useFormStatus</code>.</p>' +
            '<h4>Drobiazgi, ktore uprzyjemniaja zycie</h4>' +
            '<ul>' +
            '<li><code>ref</code> jest zwyklym propsem - <code>forwardRef</code> odchodzi do lamusa.</li>' +
            '<li><code>&lt;title&gt;</code> i <code>&lt;meta&gt;</code> renderowane w komponencie sa automatycznie przenoszone do head, jak w Nuxt.</li>' +
            '<li>Context uzywasz jako <code>&lt;Ctx value={...}&gt;</code> bez <code>.Provider</code>.</li>' +
            '<li>Hook <code>use()</code> czyta promise albo context i wspolpracuje z Suspense.</li>' +
            '</ul>',
          en: '<p>If you are switching from Vue 3 in 2026 you are entering React at a good moment - the biggest complaint about React, manual memoization, is going away.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>The compiler analyses your code and inserts memoization where it helps. <strong>You never wrote useCallback in Vue because the compiler and reactivity did it for you - React 19 is starting to feel the same.</strong> Code that used to look like this:</p>' +
            '<pre><code>// React 18\nconst handle = useCallback(() =&gt; onPick(id), [onPick, id])\nconst rows = useMemo(() =&gt; items.filter(f), [items, f])</code></pre>' +
            '<p>can now be written as plain expressions, with the compiler filling in the rest. It is opt-in via a bundler plugin and it requires correct code (rules of hooks, no mutation during render).</p>' +
            '<h4>Forms and actions</h4>' +
            '<pre><code>function Save() {\n  const [state, action, pending] = useActionState(saveUser, null)\n  return &lt;form action={action}&gt;\n    &lt;input name="name" /&gt;\n    &lt;button disabled={pending}&gt;Save&lt;/button&gt;\n  &lt;/form&gt;\n}</code></pre>' +
            '<p>This is the equivalent of what you assembled in Vue from a <code>ref(loading)</code>, a <code>try/catch</code> and your own composable. There is also <code>useOptimistic</code> (optimistic UI without manual rollback) and <code>useFormStatus</code>.</p>' +
            '<h4>Small things that make life nicer</h4>' +
            '<ul>' +
            '<li><code>ref</code> is an ordinary prop - <code>forwardRef</code> is retired.</li>' +
            '<li><code>&lt;title&gt;</code> and <code>&lt;meta&gt;</code> rendered inside a component are hoisted into head automatically, like in Nuxt.</li>' +
            '<li>Context is used as <code>&lt;Ctx value={...}&gt;</code> without <code>.Provider</code>.</li>' +
            '<li>The <code>use()</code> hook reads a promise or a context and cooperates with Suspense.</li>' +
            '</ul>'
        },
        pro: {
          pl: '<p>Warto wiedziec, co React 19 realnie zmienia w decyzjach architektonicznych, a co jest tylko wygoda.</p>' +
            '<h4>Kompilator nie zastepuje architektury</h4>' +
            '<p>React Compiler robi memoizacje na poziomie komponentu i wartosci - eliminuje wiekszosc <code>useMemo</code> i <code>useCallback</code>. Nie przeniesie za ciebie stanu w dol drzewa, nie naprawi zlych kluczy i nie usunie efektu, ktory nie powinien istniec. Innymi slowy: znika klasa problemow z referencjami, zostaje klasa problemow z projektem stanu. W Vue miales analogiczna sytuacje - reaktywnosc dawala automatyzm, ale zla struktura store i tak potrafila zabic wydajnosc.</p>' +
            '<p>Wymagania praktyczne: kompilator ufa, ze render jest czysty. Mutacja propsa albo zapis do zewnetrznej zmiennej w czasie renderu daje bledna memoizacje. Dlatego wlaczaj go razem z <code>eslint-plugin-react-hooks</code> w wersji z regula kompilatora i traktuj ostrzezenia jak bledy typow.</p>' +
            '<h4>RSC - jedyna rzecz bez odpowiednika w Vue</h4>' +
            '<p>Server Components renderuja sie wylacznie na serwerze i nie trafiaja do bundla. To nie jest SSR: nie ma hydracji tego kodu, a wynik jest serializowanym strumieniem opisu UI. Najblizsza analogia z Nuxt to <code>server components</code> i wyspy, ale model danych jest inny - RSC moze bezposrednio robic <code>await db.query()</code> w ciele komponentu.</p>' +
            '<pre><code>// Server Component - zero JS po stronie klienta\nasync function Report({ id }) {\n  const rows = await db.rows.findMany({ where: { id } })\n  return &lt;Table rows={rows} /&gt;\n}\n\n// Client Component - interaktywnosc\n"use client"\nexport function Filter() { /* useState itd. */ }</code></pre>' +
            '<p>Konsekwencja dla architektury: granica <code>use client</code> staje sie tym, czym w klasycznym SPA byla granica bundla. Warto ja projektowac swiadomie - komponenty prezentacyjne wyzej, interaktywne wyspy nizej i mniejsze.</p>' +
            '<h4>Na co uwazac przy wyborze stacku w 2026</h4>' +
            '<ul>' +
            '<li>RSC praktycznie oznacza Next.js App Router albo Waku - w czystym Vite to nadal teren eksperymentalny.</li>' +
            '<li><code>useActionState</code> i <code>useOptimistic</code> dzialaja tez bez serwera - warto po nie siegac nawet w SPA zamiast pisac wlasne composable do stanu ladowania.</li>' +
            '<li>Migrujac projekt Vue, nie zaczynaj od RSC. Najpierw SPA z React Router lub Next w trybie klienckim, potem ewentualnie serwer.</li>' +
            '</ul>' +
            '<p>Na rozmowie o senior/staff pojawia sie pytanie: czy kompilator zwalnia z <code>React.memo</code>. Uczciwa odpowiedz: w wiekszosci przypadkow tak, ale memo nadal ma sens na granicach duzych poddrzew i przy propsach pochodzacych spoza Reacta, ktorych kompilator nie widzi.</p>',
          en: '<p>It is worth separating what React 19 genuinely changes in architectural decisions from what is merely convenience.</p>' +
            '<h4>The compiler does not replace architecture</h4>' +
            '<p>React Compiler memoizes at the component and value level - it removes most <code>useMemo</code> and <code>useCallback</code>. It will not move state down the tree for you, will not fix bad keys and will not delete an effect that should never have existed. In other words: a whole class of reference problems disappears and the class of state-design problems remains. Vue had the same dynamic - reactivity gave you automation, but a badly structured store still killed performance.</p>' +
            '<p>Practical requirement: the compiler trusts that render is pure. Mutating a prop or writing to an outer variable during render produces wrong memoization. So enable it together with <code>eslint-plugin-react-hooks</code> including the compiler rule and treat its warnings like type errors.</p>' +
            '<h4>RSC - the one thing with no Vue equivalent</h4>' +
            '<p>Server Components render only on the server and never enter the bundle. This is not SSR: that code is never hydrated, and the output is a serialized stream describing UI. The closest Nuxt analogy is server components and islands, but the data model differs - an RSC can <code>await db.query()</code> directly in the component body.</p>' +
            '<pre><code>// Server Component - zero client JS\nasync function Report({ id }) {\n  const rows = await db.rows.findMany({ where: { id } })\n  return &lt;Table rows={rows} /&gt;\n}\n\n// Client Component - interactivity\n"use client"\nexport function Filter() { /* useState etc. */ }</code></pre>' +
            '<p>Architectural consequence: the <code>use client</code> boundary becomes what the bundle boundary was in a classic SPA. Design it deliberately - presentational components higher up, interactive islands lower and smaller.</p>' +
            '<h4>Choosing a stack in 2026</h4>' +
            '<ul>' +
            '<li>RSC in practice means Next.js App Router or Waku - in plain Vite it is still experimental territory.</li>' +
            '<li><code>useActionState</code> and <code>useOptimistic</code> also work without a server - reach for them in an SPA instead of writing your own loading-state composable.</li>' +
            '<li>When migrating a Vue project, do not start with RSC. Go SPA first with React Router or client-mode Next, then consider the server.</li>' +
            '</ul>' +
            '<p>A senior/staff interview question: does the compiler make <code>React.memo</code> obsolete. The honest answer: mostly yes, but memo still earns its place at the boundary of large subtrees and for props coming from outside React that the compiler cannot see.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co robi React Compiler?',
            en: 'What does the React Compiler do?'
          },
          options: [
            { pl: 'Zamienia komponenty na web components', en: 'Turns components into web components' },
            { pl: 'Automatycznie wstawia memoizacje, zastepujac wiekszosc useMemo i useCallback', en: 'Inserts memoization automatically, replacing most useMemo and useCallback' },
            { pl: 'Kompiluje JSX do stringow HTML', en: 'Compiles JSX into HTML strings' },
            { pl: 'Usuwa potrzebe stosowania kluczy w listach', en: 'Removes the need for keys in lists' }
          ],
          correct: 1,
          explain: {
            pl: 'Kompilator analizuje kod i memoizuje wartosci oraz komponenty. Kluczy ani projektu stanu nie naprawi.',
            en: 'The compiler analyses your code and memoizes values and components. It fixes neither keys nor state design.'
          }
        },
        {
          q: {
            pl: 'Czym roznia sie Server Components od SSR?',
            en: 'How do Server Components differ from SSR?'
          },
          options: [
            { pl: 'Niczym, to dwie nazwy tego samego', en: 'Not at all, two names for the same thing' },
            { pl: 'SSR dziala tylko w Next.js, a RSC wszedzie', en: 'SSR only works in Next.js while RSC works everywhere' },
            { pl: 'RSC dzialaja wylacznie w przegladarce', en: 'RSC run only in the browser' },
            { pl: 'Kod RSC nie trafia do bundla i nie jest hydratowany', en: 'RSC code never enters the bundle and is never hydrated' }
          ],
          correct: 3,
          explain: {
            pl: 'SSR renderuje na serwerze komponenty, ktore potem hydratuja sie na kliencie. RSC nigdy nie trafiaja do klienta - to strumien opisu UI.',
            en: 'SSR renders components on the server and then hydrates them on the client. RSC never reach the client - the output is a UI description stream.'
          }
        },
        {
          q: {
            pl: 'Co w React 19 zastepuje reczny composable z ref(loading) i try/catch dla formularza?',
            en: 'What in React 19 replaces a hand-rolled composable with ref(loading) and try/catch for a form?'
          },
          options: [
            { pl: 'useActionState razem z form action', en: 'useActionState together with form action' },
            { pl: 'useSyncExternalStore', en: 'useSyncExternalStore' },
            { pl: 'forwardRef', en: 'forwardRef' },
            { pl: 'useImperativeHandle', en: 'useImperativeHandle' }
          ],
          correct: 0,
          explain: {
            pl: 'useActionState zwraca wynik, akcje i flage pending, a form action ja podpina. useOptimistic doklada optymistyczne UI bez recznego rollbacku.',
            en: 'useActionState returns the result, the action and a pending flag, and form action wires it up. useOptimistic adds optimistic UI without manual rollback.'
          }
        },
        {
          q: {
            pl: 'Wlaczasz React Compiler w migrowanym projekcie i czesc widokow zaczyna pokazywac stare dane. Najbardziej prawdopodobna przyczyna?',
            en: 'You enable React Compiler in a migrated project and some views start showing stale data. Most likely cause?'
          },
          options: [
            { pl: 'Kompilator nie obsluguje TypeScriptu', en: 'The compiler does not support TypeScript' },
            { pl: 'Brakuje React.memo na komponentach nadrzednych', en: 'Parent components are missing React.memo' },
            { pl: 'Render nie jest czysty - jest mutacja propsow lub zapis do zewnetrznej zmiennej', en: 'Render is not pure - props are mutated or an outer variable is written during render' },
            { pl: 'Klucze list sa oparte na id zamiast na indeksie', en: 'List keys use ids instead of indexes' }
          ],
          correct: 2,
          explain: {
            pl: 'Kompilator zaklada czystosc renderu. Mutacja w czasie renderu sprawia, ze zmemoizowana wartosc nie zostaje przeliczona - stad stare dane.',
            en: 'The compiler assumes render purity. A mutation during render means a memoized value is never recomputed, hence the stale data.'
          }
        }
      ]
    }
  ]
};
