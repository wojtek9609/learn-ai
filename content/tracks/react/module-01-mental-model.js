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
    pl: 'Jak myśleć o UI w Reactcie, gdy masz w głowie Vue: JSX zamiast template, re-render zamiast reaktywności, klucze zamiast trackowania zależności.',
    en: 'How to think about UI in React when your head is full of Vue: JSX instead of templates, re-renders instead of fine-grained reactivity, keys instead of dependency tracking.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'thinking-in-react',
      title: {
        pl: 'Myślenie w Reactcie',
        en: 'Thinking in React'
      },
      minutes: 8,
      terms: [
        {
          term: { pl: 'Lifting state up', en: 'Lifting state up' },
          def: {
            pl: 'Przeniesienie stanu do najbliższego wspólnego rodzica komponentów, które go czytają. Daje jedno źródło prawdy zamiast dwóch kopii synchronizowanych efektem.',
            en: 'Moving state up to the closest common parent of the components that read it. Gives one source of truth instead of two copies synced by an effect.'
          }
        },
        {
          term: { pl: 'Wartość pochodna', en: 'Derived value' },
          def: {
            pl: 'Wszystko, co da się policzyć podczas renderu z innych danych - jak <code>computed</code> w Vue. Przefiltrowana lista <strong>nie</strong> jest stanem.',
            en: 'Anything computable during render from other data - the <code>computed</code> of Vue. A filtered list is <strong>not</strong> state.'
          }
        },
        {
          term: { pl: 'Jedno źródło prawdy', en: 'Single source of truth' },
          def: {
            pl: 'Zasada: jedna wartość ma jednego właściciela i jedną funkcję aktualizującą. Kopia propsa w <code>useState</code> łamie ten kontrakt i się rozjeżdża.',
            en: 'The rule: one value has one owner and one updater. Copying a prop into <code>useState</code> breaks the contract and drifts out of sync.'
          }
        },
        {
          term: { pl: 'Controlled component', en: 'Controlled component' },
          def: {
            pl: 'Komponent, który dostaje <code>value</code> w dół i <code>onChange</code> w górę zamiast trzymać własny stan. Reactowy odpowiednik rozłożonego na części <code>v-model</code>.',
            en: 'A component that receives <code>value</code> down and <code>onChange</code> up instead of holding its own state. The React equivalent of <code>v-model</code> taken apart.'
          }
        },
        {
          term: { pl: 'Kolokacja stanu', en: 'State colocation' },
          def: {
            pl: 'Trzymanie stanu tak nisko w drzewie, jak się da. Stan w korzeniu renderuje całe poddrzewo na każde naciśnięcie klawisza.',
            en: 'Keeping state as low in the tree as possible. Root-level state re-renders the whole subtree on every keystroke.'
          }
        }
      ],
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
          pl: 'Droga od makiety do drzewa komponentów: dzielisz UI na części, stan trzymasz w najbliższym wspólnym rodzicu, w dół lecą propsy, w górę zdarzenia.',
          en: 'From mockup to component tree: split the UI, keep state in the closest common parent, send props down and events up.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że budujesz makietę miasta z klocków. Każdy budynek to osobny klocek, który sam w sobie nic nie wie - dostaje karteczkę z opisem: ile ma pięter, jaki kolor dachu. Klocek nigdy nie zmienia swojej karteczki. Jeśli coś ma się zmienić, mówi o tym głośno osobie, która trzyma pudełko z karteczkami.</p>' +
            '<p>React działa tak samo. Ekran jest podzielony na małe kawałki, a każdy kawałek to funkcja, która dostaje dane i zwraca obrazek. Żadne dziecko nie poprawia danych rodzica. Krzyczy tylko: <em>ktoś kliknął!</em> - a rodzic decyduje, co z tym zrobić.</p>' +
            '<p>Najważniejsza zasada brzmi: <strong>to, co widzisz, to zawsze wynik danych</strong>. Zmieniasz dane - ekran sam się przerysowuje. Nigdy nie chodzisz z pędzelkiem i nie poprawiasz pojedynczych pikseli.</p>',
          en: '<p>Picture building a toy city out of blocks. Each building is its own block that knows nothing by itself - it gets a little card describing it: how many floors, what colour the roof is. The block never edits its own card. If something should change, it shouts to the person holding the box of cards.</p>' +
            '<p>React works the same way. The screen is chopped into small pieces, and each piece is a function that takes data and gives back a picture. No child fixes the parent data. It only shouts: <em>somebody clicked!</em> - and the parent decides what to do about it.</p>' +
            '<p>The golden rule: <strong>what you see is always a result of the data</strong>. Change the data and the screen redraws itself. You never walk around with a brush touching up individual pixels.</p>'
        },
        school: {
          pl: '<p>Jako osoba pisząca w Vue już znasz większość tej filozofii: komponenty, jednokierunkowy przepływ propsów, zdarzenia w górę. React idzie tylko dalej i robi z tego regułę bez wyjątków.</p>' +
            '<h4>W Vue robiłeś tak</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst query = ref("")\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;SearchBar v-model="query" /&gt;\n  &lt;ProductList :query="query" /&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>W Reactcie robisz tak</h4>' +
            '<pre><code>function App() {\n  const [query, setQuery] = useState("")\n  return (\n    &lt;&gt;\n      &lt;SearchBar value={query} onChange={setQuery} /&gt;\n      &lt;ProductList query={query} /&gt;\n    &lt;/&gt;\n  )\n}</code></pre>' +
            '<p>Różnica jest jedna, ale zasadnicza: <strong>w Vue miałeś <code>v-model</code>, czyli lukier na parze props + emit. W Reactcie tego lukru nie ma</strong> - zawsze przekazujesz wartość w dół i funkcję zwrotną w górę. Dlaczego? Bo React chce, żeby w kodzie było widać, kto jest właścicielem danych. Brak magii to tutaj cecha, nie brak.</p>' +
            '<p>Praktyczna procedura, gdy dostajesz makietę:</p>' +
            '<ol>' +
            '<li>Narysuj ramki wokół każdego kawałka UI - to są komponenty.</li>' +
            '<li>Zbuduj wersję całkowicie bez stanu, tylko na propsach.</li>' +
            '<li>Znajdź minimalny zestaw stanu - wszystko, co da się policzyć z czegoś innego, <em>nie</em> jest stanem.</li>' +
            '<li>Umieść każdy kawałek stanu w najbliższym wspólnym rodzicu tych komponentów, które go czytają.</li>' +
            '<li>Dodaj przepływ w górę: przekaż funkcję typu <code>onChange</code> zamiast emitować zdarzenie.</li>' +
            '</ol>' +
            '<p>Punkt trzeci jest najczęstszym źródłem błędów migracji: filtrowana lista to nie stan, tylko wyliczenie z listy i zapytania - dokładnie tak, jak w Vue nie robiłeś <code>ref</code> na to, co powinno być <code>computed</code>.</p>',
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
          pl: '<p>Różnica między Vue a Reactem nie leży w składni, tylko w tym, <strong>kto jest odpowiedzialny za synchronizację</strong>. W Vue framework śledzi zależności przez proxy i sam wie, który efekt odświeżyć. W Reactcie ty deklarujesz całą funkcję widoku, a framework porównuje wynik. To przenosi ciężar decyzji na twoją architekturę danych.</p>' +
            '<h4>Właścicielstwo stanu jako kontrakt</h4>' +
            '<p>W Vue kusi, żeby komponent miał własny <code>ref</code> i dodatkowo <code>watch</code> synchronizujący go z propsem. To działa, ale tworzy dwa źródła prawdy. React nie pozwala tego zrobić po cichu: props jest niemutowalny, a próbę trzymania kopii widać od razu jako <code>useState(props.x)</code>, który nie odświeży się po zmianie propsa. To celowe. Kontrakt brzmi: <strong>jedna wartość, jeden właściciel, jedna funkcja aktualizująca</strong>.</p>' +
            '<pre><code>// Vue: dwa źródła prawdy, łatwo o desync\nconst local = ref(props.value)\nwatch(() =&gt; props.value, v =&gt; local.value = v)\n\n// React: albo kontrolowany, albo w pełni niekontrolowany\nfunction Field({ value, onChange }) {\n  return &lt;input value={value} onChange={e =&gt; onChange(e.target.value)} /&gt;\n}</code></pre>' +
            '<h4>Kolokacja stanu</h4>' +
            '<p>Domyślna heurystyka: stan trzymaj tak nisko w drzewie, jak się da, i podnoś dopiero wtedy, gdy dwa rodzeństwa go potrzebują. Podniesienie stanu do korzenia jest w Reactcie kosztowne, bo powoduje re-render całego poddrzewa - w Vue analogiczny <code>ref</code> w korzeniu odświeżyłby tylko te komponenty, które realnie go czytają. To nie jest teoria: w dużych formularzach różnica między stanem w polu a stanem w formularzu to setki niepotrzebnych wywołań funkcji renderujących na każde naciśnięcie klawisza.</p>' +
            '<h4>Co pytają na rozmowie</h4>' +
            '<ul>' +
            '<li>Czym różni się stan od wartości pochodnej i jak to rozpoznać (test: czy da się to policzyć w czasie renderu z innych danych).</li>' +
            '<li>Dlaczego React nie ma <code>v-model</code> i jak wygląda wzorzec controlled component.</li>' +
            '<li>Kiedy podnieść stan, a kiedy sięgnąć po Context lub Zustand (odpowiedź: gdy przekazujesz props przez więcej niż dwa poziomy tylko po to, by go przekazać dalej).</li>' +
            '</ul>' +
            '<p>Uwaga migracyjna: w projekcie Vue często porządek wymusza Pinia. W Reactcie 80 procent tego, co lądowało w Pinia, to stan serwera i powinno trafić do TanStack Query, a nie do globalnego store. Rozdzielenie stanu serwera od stanu klienta jest największym pojedynczym ulepszeniem architektury przy przesiadce.</p>',
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
            pl: 'Gdzie w Reactcie powinien mieszkać stan czytany przez dwa komponenty rodzeństwa?',
            en: 'Where should state read by two sibling components live in React?'
          },
          options: [
            { pl: 'W najbliższym wspólnym rodzicu', en: 'In the closest common parent' },
            { pl: 'Zawsze w globalnym store', en: 'Always in a global store' },
            { pl: 'W obu komponentach, zsynchronizowany efektem', en: 'In both components, synced with an effect' },
            { pl: 'W module poza drzewem komponentów', en: 'In a module outside the component tree' }
          ],
          correct: 0,
          explain: {
            pl: 'Lifting state up to najbliższy wspólny rodzic daje jedno źródło prawdy. Kopie synchronizowane efektem to gotowy przepis na desync - tak samo jak w Vue duplikat propsa w ref.',
            en: 'Lifting state to the closest common parent gives one source of truth. Effect-synced copies are a recipe for desync, exactly like duplicating a prop into a ref in Vue.'
          }
        },
        {
          q: {
            pl: 'Masz listę produktów i pole wyszukiwania. Czym jest lista przefiltrowana?',
            en: 'You have a product list and a search field. What is the filtered list?'
          },
          options: [
            { pl: 'Osobnym stanem trzymanym w useState', en: 'Separate state held in useState' },
            { pl: 'Wartością pochodną liczoną podczas renderu', en: 'Derived data computed during render' },
            { pl: 'Efektem ubocznym wymagającym useEffect', en: 'A side effect requiring useEffect' },
            { pl: 'Refem, żeby uniknąć re-renderu', en: 'A ref, to avoid a re-render' }
          ],
          correct: 1,
          explain: {
            pl: 'Wszystko, co da się policzyć z innych danych, nie jest stanem. To ta sama zasada, która w Vue każe użyć computed zamiast ref plus watch.',
            en: 'Anything computable from other data is not state. Same principle that makes you reach for computed instead of ref plus watch in Vue.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Reactcie nie ma odpowiednika v-model wbudowanego w język?',
            en: 'Why does React have no built-in v-model equivalent?'
          },
          options: [
            { pl: 'Bo JSX nie obsługuje dyrektyw technicznie', en: 'Because JSX technically cannot support directives' },
            { pl: 'Bo dwukierunkowe wiązanie jest wolniejsze', en: 'Because two-way binding is slower' },
            { pl: 'Bo React chce, by właścicielstwo danych było jawne w kodzie', en: 'Because React wants data ownership to be explicit in code' },
            { pl: 'Bo formularze w Reactcie są zawsze niekontrolowane', en: 'Because React forms are always uncontrolled' }
          ],
          correct: 2,
          explain: {
            pl: 'v-model to lukier na props plus emit. React celowo go nie dodaje, bo chce, żeby z kodu było widać, kto trzyma wartość i kto ją zmienia.',
            en: 'v-model is sugar over props plus emit. React deliberately skips it so the code shows who owns the value and who changes it.'
          }
        },
        {
          q: {
            pl: 'Migrujesz duży formularz z Vue. Trzymasz cały stan w komponencie formularza i przy każdym klawiszu widać zacinanie. Najsensowniejszy pierwszy ruch?',
            en: 'You are migrating a large Vue form. All state sits in the form component and every keystroke stutters. Most sensible first move?'
          },
          options: [
            { pl: 'Owinąć wszystkie pola w React.memo i zostawić stan tam, gdzie jest', en: 'Wrap every field in React.memo and leave the state where it is' },
            { pl: 'Przenieść stan do Contextu na poziomie aplikacji', en: 'Move the state into an app-level Context' },
            { pl: 'Zamienić stan na ref, żeby nie było renderów', en: 'Swap state for a ref so no renders happen' },
            { pl: 'Skolokować stan w polach, a w górę podnosić tylko to, co realnie współdzielone', en: 'Colocate state in the fields and lift only what is genuinely shared' }
          ],
          correct: 3,
          explain: {
            pl: 'Kolokacja rozwiązuje przyczynę: stan wysoko w drzewie renderuje całe poddrzewo. memo łagodzi objaw i dokłada koszt porównań, a Context na górze pogarsza sprawę.',
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
      terms: [
        {
          term: { pl: 'JSX', en: 'JSX' },
          def: {
            pl: 'Cukier składniowy nad wywołaniem funkcji: <code>&lt;Card /&gt;</code> kompiluje się do <code>jsx(Card, props)</code>. Element JSX to zwykła wartość JavaScriptu.',
            en: 'Syntax sugar over a function call: <code>&lt;Card /&gt;</code> compiles to <code>jsx(Card, props)</code>. A JSX element is an ordinary JavaScript value.'
          }
        },
        {
          term: { pl: 'Fragment', en: 'Fragment' },
          def: {
            pl: 'Zapis <code>&lt;&gt;...&lt;/&gt;</code> pozwalający zwrócić kilka węzłów bez dodatkowego <code>div</code> w DOM.',
            en: 'The <code>&lt;&gt;...&lt;/&gt;</code> form that lets a component return several nodes without an extra <code>div</code> in the DOM.'
          }
        },
        {
          term: { pl: 'Patch flags', en: 'Patch flags' },
          def: {
            pl: 'Znaczniki, którymi kompilator Vue oznacza dynamiczne fragmenty szablonu, żeby runtime porównywał tylko je. JSX nie da się tak analizować statycznie.',
            en: 'Markers the Vue compiler puts on the dynamic parts of a template so the runtime only diffs those. JSX cannot be analysed statically that way.'
          }
        },
        {
          term: { pl: 'Falsy zero w JSX', en: 'Falsy zero in JSX' },
          def: {
            pl: 'Zapis <code>{count &amp;&amp; &lt;Badge /&gt;}</code> przy <code>count === 0</code> renderuje na ekranie samotne <code>0</code>. Pisz <code>count &gt; 0 &amp;&amp; ...</code>.',
            en: 'Writing <code>{count &amp;&amp; &lt;Badge /&gt;}</code> renders a bare <code>0</code> when <code>count === 0</code>. Use <code>count &gt; 0 &amp;&amp; ...</code>.'
          }
        },
        {
          term: { pl: 'dangerouslySetInnerHTML', en: 'dangerouslySetInnerHTML' },
          def: {
            pl: 'Odpowiednik <code>v-html</code> - wstawia surowy HTML i wymaga tej samej sanityzacji.',
            en: 'The <code>v-html</code> equivalent - it injects raw HTML and needs the same sanitisation.'
          }
        }
      ],
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
          pl: 'Oba światy kończą w funkcji renderującej i VDOM. Różnica: kompilator Vue wie z góry, co może się zmienić, JSX to zwykły JavaScript, więc tej wiedzy nie ma.',
          en: 'Both worlds end in a render function and a VDOM. The difference: the Vue compiler knows up front what can change, while JSX is plain JavaScript with no such knowledge.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Template w Vue to formularz do wypełnienia: pola są z góry narysowane, ty wpisujesz tylko wartości. Ktoś, kto patrzy na taki formularz, od razu widzi, gdzie są puste miejsca.</p>' +
            '<p>JSX to raczej list pisany odręcznie. Możesz w nim wszystko: wstawić obliczenie, pętlę, warunek. Nikt cię nie ogranicza, ale też nikt z góry nie wie, gdzie będą zmiany - trzeba przeczytać cały list od nowa.</p>' +
            '<p>Dlatego w Vue piszesz <code>v-if</code> i <code>v-for</code>, czyli specjalne słowa frameworka, a w Reactcie piszesz zwykłego ifa i zwykłą pętlę, bo to po prostu kod. Jedno jest bardziej uporządkowane, drugie bardziej swobodne. Oba na końcu rysują ten sam ekran.</p>',
          en: '<p>A Vue template is a form to fill in: the fields are drawn in advance and you only type the values. Anyone looking at the form sees immediately where the blanks are.</p>' +
            '<p>JSX is more like a handwritten letter. You can put anything in it: a calculation, a loop, a condition. Nobody restricts you, but nobody knows in advance where the changes will be either - you have to read the whole letter again.</p>' +
            '<p>That is why Vue gives you <code>v-if</code> and <code>v-for</code>, special framework words, while React lets you write an ordinary if and an ordinary loop, because it is just code. One is tidier, the other freer. Both draw the same screen in the end.</p>'
        },
        school: {
          pl: '<p>JSX to nie język szablonów. To cukier składniowy nad wywołaniem funkcji - Babel albo SWC zamienia <code>&lt;Card title="x" /&gt;</code> na <code>jsx(Card, { title: "x" })</code>. Każde wyrażenie JSX jest wartością, którą możesz przypisać do zmiennej, wrzucić do tablicy albo zwrócić z funkcji.</p>' +
            '<h4>Warunki i listy</h4>' +
            '<pre><code>&lt;!-- Vue --&gt;\n&lt;p v-if="user"&gt;Hi {{ user.name }}&lt;/p&gt;\n&lt;li v-for="t in todos" :key="t.id"&gt;{{ t.text }}&lt;/li&gt;</code></pre>' +
            '<pre><code>// React\n{user &amp;&amp; &lt;p&gt;Hi {user.name}&lt;/p&gt;}\n{todos.map(t =&gt; &lt;li key={t.id}&gt;{t.text}&lt;/li&gt;)}</code></pre>' +
            '<p><strong>W Vue używałeś dyrektyw, w Reactcie używasz wyrażeń JavaScriptu</strong>, bo JSX żyje w środku funkcji, a nie w osobnej sekcji pliku. Wniosek praktyczny: jeśli coś da się zrobić w JS, da się to zrobić w JSX - i odwrotnie, nie ma żadnego dodatkowego API do nauczenia.</p>' +
            '<h4>Drobne pułapki dnia pierwszego</h4>' +
            '<ul>' +
            '<li><code>class</code> to <code>className</code>, a <code>for</code> to <code>htmlFor</code>, bo to obiekt JS, a nie HTML.</li>' +
            '<li>Atrybuty są camelCase: <code>onClick</code>, <code>tabIndex</code>, <code>strokeWidth</code>.</li>' +
            '<li>Komponent musi zwrócić jeden węzeł - stąd fragment <code>&lt;&gt;...&lt;/&gt;</code>, odpowiednik braku wrappera w Vue 3.</li>' +
            '<li><code>{count &amp;&amp; &lt;Badge /&gt;}</code> przy <code>count === 0</code> wyrenderuje zero na ekranie. Używaj <code>count &gt; 0 &amp;&amp; ...</code>.</li>' +
            '<li>Styl inline to obiekt: <code>style={{ marginTop: 8 }}</code>.</li>' +
            '</ul>' +
            '<p>Za to dostajesz coś, czego w template nie ma: komponent jest zwykłą wartością. Możesz go trzymać w mapie, przekazać w propsie, wybrać warunkowo - bez <code>component :is</code> i bez rejestrowania czegokolwiek.</p>',
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
          pl: '<p>Kluczowa konsekwencja architektoniczna jest taka: <strong>template Vue jest analizowalny statycznie, JSX nie</strong>. Kompilator Vue widzi, że <code>&lt;div class="card"&gt;</code> nigdy się nie zmieni, więc hoistuje ten węzeł poza funkcję renderującą i oznacza dynamiczne fragmenty patch flagami. Runtime porównuje wtedy tylko to, co może się różnić. W Reactcie każde wywołanie funkcji komponentu buduje cały obiekt elementów od nowa i diff idzie po całym poddrzewie.</p>' +
            '<pre><code>// Vue - kompilator generuje mniej więcej to\nconst _hoisted = createElementVNode("div", { class: "card" })\n// plus patchFlag: TEXT dla dynamicznego fragmentu\n\n// React - każdy render tworzy nowe obiekty\nfunction Card({ title }) {\n  return jsx("div", { className: "card", children: title })\n}</code></pre>' +
            '<h4>Kompozycja zamiast dyrektyw</h4>' +
            '<p>Brak dyrektyw wymusza inne wzorce. Zamiast <code>v-permission</code> piszesz komponent <code>&lt;Can do="edit"&gt;</code> albo hooka <code>usePermission()</code>. Zamiast <code>v-focus</code> - <code>useEffect</code> z refem albo gotowy hook. W praktyce jest to bardziej typowalne w TypeScripcie: dyrektywy Vue nie mają sensownej sygnatury typu, komponent i hook mają.</p>' +
            '<h4>Typy i narzędzia</h4>' +
            '<p>JSX to zwykły TS, więc generyki, zwężanie typów i inference działają normalnie w całym widoku. W Vue trzeba do tego <code>defineComponent</code>, generycznych SFC (od 3.3) i wsparcia Volar. Za to Vue wygrywa w narzędziach kompilacyjnych - dostajesz optymalizacje za darmo, podczas gdy React do 18 włącznie wymagał ręcznego <code>memo</code> i <code>useMemo</code> (React Compiler w 19 to zmienia, więcej w lekcji o krajobrazie 19).</p>' +
            '<h4>Pułapki produkcyjne</h4>' +
            '<ul>' +
            '<li>Definiowanie komponentu wewnątrz komponentu tworzy nowy typ przy każdym renderze i kasuje stan poddrzewa. To odpowiednik zmiany <code>:is</code> na każdy render.</li>' +
            '<li>Inline obiekty i funkcje w propsach łamią <code>React.memo</code>, bo referencja różni się za każdym razem.</li>' +
            '<li><code>dangerouslySetInnerHTML</code> to odpowiednik <code>v-html</code> i tak samo wymaga sanityzacji.</li>' +
            '</ul>' +
            '<p>Na rozmowie warto umieć powiedzieć jednym zdaniem: JSX kompiluje się do wywołań funkcji, więc React płaci w runtime za elastyczność, którą Vue rozwiązuje w kompilatorze. Warto dodać drugie zdanie o kompromisie: ta elastyczność daje w zamian pełną kompozycyjność widoku, bo fragment JSX można przekazać dalej jak każdą inną wartość, czego stringowy template nie potrafi bez dodatkowego API.</p>',
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
            { pl: 'Wywołaniami funkcji tworzącymi obiekty elementów', en: 'Function calls creating element objects' },
            { pl: 'Osobnym językiem szablonów interpretowanym w runtime', en: 'A separate template language interpreted at runtime' },
            { pl: 'Dyrektywami rejestrowanymi w aplikacji', en: 'Directives registered on the app' }
          ],
          correct: 1,
          explain: {
            pl: 'Babel lub SWC zamienia JSX na wywołania jsx(type, props). Dlatego element JSX jest zwykłą wartością JavaScriptu.',
            en: 'Babel or SWC turns JSX into jsx(type, props) calls. That is why a JSX element is an ordinary JavaScript value.'
          }
        },
        {
          q: {
            pl: 'Jak wygląda odpowiednik v-for z kluczem w Reactcie?',
            en: 'What is the React equivalent of v-for with a key?'
          },
          options: [
            { pl: 'Dyrektywa forEach na elemencie', en: 'A forEach directive on the element' },
            { pl: 'Specjalny komponent React.List', en: 'A special React.List component' },
            { pl: 'items.map z propem key na zwracanym elemencie', en: 'items.map with a key prop on the returned element' },
            { pl: 'Pętla for w ciele komponentu bez klucza', en: 'A for loop in the component body with no key' }
          ],
          correct: 2,
          explain: {
            pl: 'Listy buduje się zwykłym map, a key jest propem specjalnym - tak samo jak :key w Vue, bo oba runtime potrzebują tożsamości elementu.',
            en: 'Lists are built with plain map, and key is a special prop - just like :key in Vue, since both runtimes need element identity.'
          }
        },
        {
          q: {
            pl: 'Dlaczego kompilator Vue może zoptymalizować więcej niż React bez kompilatora?',
            en: 'Why can the Vue compiler optimise more than React without a compiler?'
          },
          options: [
            { pl: 'Bo template jest statycznie analizowalny i wiadomo, co jest dynamiczne', en: 'Because the template is statically analysable so dynamic parts are known' },
            { pl: 'Bo Vue nie używa wirtualnego DOM', en: 'Because Vue does not use a virtual DOM' },
            { pl: 'Bo React zawsze renderuje na serwerze', en: 'Because React always renders on the server' },
            { pl: 'Bo Vue trzyma komponenty w globalnym rejestrze', en: 'Because Vue keeps components in a global registry' }
          ],
          correct: 0,
          explain: {
            pl: 'Statyczne węzły są hoistowane, a dynamiczne dostają patch flagi. JSX to dowolny JavaScript, więc takich gwarancji nie ma.',
            en: 'Static nodes get hoisted and dynamic ones get patch flags. JSX is arbitrary JavaScript, so no such guarantees exist.'
          }
        },
        {
          q: {
            pl: 'Widzisz na ekranie samotne 0 tam, gdzie miał być badge. Najbardziej prawdopodobna przyczyna?',
            en: 'A lone 0 shows up on screen where a badge should be. Most likely cause?'
          },
          options: [
            { pl: 'Brak propa key na elemencie', en: 'A missing key prop on the element' },
            { pl: 'Użycie className zamiast class', en: 'Using className instead of class' },
            { pl: 'Zwrócenie dwóch węzłów bez fragmentu', en: 'Returning two nodes without a fragment' },
            { pl: 'Warunek count && <Badge /> przy count równym 0', en: 'A count && <Badge /> guard when count is 0' }
          ],
          correct: 3,
          explain: {
            pl: 'Operator && zwraca lewą stronę, a React renderuje liczbę 0 jako tekst. W Vue v-if traktowało to jako falsy i nic nie rysowało - stąd zaskoczenie.',
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
      terms: [
        {
          term: { pl: 'Props', en: 'Props' },
          def: {
            pl: 'Argument funkcji komponentu, tylko do odczytu. Mutacja obiektu propsów łamie założenia reconcilera i porównania w <code>React.memo</code>.',
            en: 'The read-only argument of a component function. Mutating the props object breaks reconciler assumptions and <code>React.memo</code> comparisons.'
          }
        },
        {
          term: { pl: 'children', en: 'children' },
          def: {
            pl: 'Prop, do którego trafia JSX zapisany między tagami komponentu. Odpowiednik slotu domyślnego z Vue.',
            en: 'The prop that receives the JSX written between a component tags. The equivalent of the Vue default slot.'
          }
        },
        {
          term: { pl: 'Render prop', en: 'Render prop' },
          def: {
            pl: 'Prop będący funkcją zwracającą JSX, np. <code>renderItem={(item) =&gt; ...}</code>. Reactowy odpowiednik scoped slota, w pełni typowany.',
            en: 'A prop that is a function returning JSX, e.g. <code>renderItem={(item) =&gt; ...}</code>. The React equivalent of a scoped slot, fully typed.'
          }
        },
        {
          term: { pl: 'Callback prop', en: 'Callback prop' },
          def: {
            pl: 'Funkcja przekazana w propsie z prefiksem <code>on</code> (<code>onChange</code>, <code>onSelect</code>). Zastępuje <code>emit</code>, bo React nie ma systemu zdarzeń komponentowych.',
            en: 'A function passed as an <code>on</code>-prefixed prop (<code>onChange</code>, <code>onSelect</code>). It replaces <code>emit</code>, because React has no component event system.'
          }
        },
        {
          term: { pl: 'ComponentPropsWithoutRef', en: 'ComponentPropsWithoutRef' },
          def: {
            pl: 'Typ pomocniczy do rozszerzania natywnych atrybutów elementu, np. <code>ComponentPropsWithoutRef&lt;"button"&gt;</code>. Jawny odpowiednik <code>attrs</code> i <code>inheritAttrs</code>.',
            en: 'A helper type for extending native element attributes, e.g. <code>ComponentPropsWithoutRef&lt;"button"&gt;</code>. The explicit counterpart of <code>attrs</code> and <code>inheritAttrs</code>.'
          }
        }
      ],
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
          pl: 'Propsy w dół, funkcje zwrotne w górę. Gdzie w Vue emitowałeś zdarzenie, w Reactcie wołasz funkcję otrzymaną w propsie.',
          en: 'Props down, callbacks up. Where Vue emits an event, React calls a function it received as a prop.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Komponent to maszynka do robienia obrazków. Wrzucasz do niej składniki, a ona zwraca gotowy kawałek ekranu. Składniki to propsy.</p>' +
            '<p>Ważna zasada: maszynka nie może zjeść swoich składników i podmienić ich na inne. Dostała marchewkę - robi z niej sok marchewkowy. Jeśli chce buraka, musi poprosić tego, kto podaje składniki.</p>' +
            '<p>Jak prosi? Dostaje razem ze składnikami mały dzwonek - funkcję. Dzwoni nim i mówi: <em>chciałabym burak</em>. Osoba na zewnątrz decyduje, czy zmienić składnik. Wtedy maszynka dostanie nowe składniki i zrobi nowy obrazek.</p>' +
            '<p>Dzięki temu zawsze wiadomo, kto za co odpowiada. Nikt nie grzebie w cudzych składnikach po cichu, a jak coś wyjdzie nie tak, od razu wiadomo, gdzie szukać winnego: u tego, kto trzyma składniki.</p>' +
            '<p>Jest jeszcze jedna wygodna rzecz. Do maszynki możesz włożyć nie tylko liczby i napisy, ale też gotowy kawałek innego obrazka. Wtedy maszynka opakowuje go w swoją ramkę i oddaje dalej - i właśnie tak buduje się z małych części całe duże ekrany.</p>',
          en: '<p>A component is a little machine that makes pictures. You drop ingredients in and it hands back a finished piece of screen. The ingredients are props.</p>' +
            '<p>Important rule: the machine cannot eat its ingredients and swap them for different ones. It got a carrot, so it makes carrot juice. If it wants beetroot, it has to ask whoever hands out ingredients.</p>' +
            '<p>How does it ask? Along with the ingredients it receives a small bell - a function. It rings it and says: <em>beetroot please</em>. The person outside decides whether to change the ingredient. Then the machine gets new ingredients and makes a new picture.</p>' +
            '<p>This way it is always clear who is responsible for what. Nobody quietly rummages through somebody else ingredients.</p>'
        },
        school: {
          pl: '<p>Komponent Reacta to funkcja: bierze obiekt propsów i zwraca JSX. Nie ma sekcji <code>script</code>, <code>template</code> i <code>style</code> - jest jedna funkcja i tyle.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup lang="ts"&gt;\nconst props = defineProps&lt;{ label: string; count: number }&gt;()\nconst emit = defineEmits&lt;{ inc: [n: number] }&gt;()\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;button @click="emit(\\u0027inc\\u0027, props.count + 1)"&gt;{{ label }}&lt;/button&gt;\n&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>type Props = { label: string; count: number; onInc: (n: number) =&gt; void }\n\nfunction Counter({ label, count, onInc }: Props) {\n  return &lt;button onClick={() =&gt; onInc(count + 1)}&gt;{label}&lt;/button&gt;\n}</code></pre>' +
            '<p><strong>W Vue deklarowałeś propsy makrem i emitowałeś zdarzenia, w Reactcie propsy to zwykły argument funkcji, a zdarzenia to funkcje przekazane w propsie</strong> - bo React nie ma osobnego systemu zdarzeń komponentowych. Wszystko jest wywołaniem funkcji, więc TypeScript typuje to bez żadnych makr.</p>' +
            '<h4>Dzieci zamiast slotów</h4>' +
            '<pre><code>// Vue:  &lt;Card&gt;&lt;p&gt;tresc&lt;/p&gt;&lt;/Card&gt;  + &lt;slot /&gt;\n// React:\nfunction Card({ children }) {\n  return &lt;div className="card"&gt;{children}&lt;/div&gt;\n}</code></pre>' +
            '<p>Slot domyślny to prop <code>children</code>. Sloty nazwane to po prostu kolejne propsy przyjmujące JSX, na przykład <code>&lt;Card header={&lt;h2&gt;Tytul&lt;/h2&gt;} /&gt;</code>. Nie ma tu nowego mechanizmu - jest ten sam mechanizm co zawsze, użyty do innego celu.</p>' +
            '<p>Wartości domyślne robisz destrukturyzacją: <code>function Card({ size = "md" })</code>. Odpowiednika <code>withDefaults</code> nie potrzebujesz.</p>',
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
          pl: '<p>Props w Reactcie jest niemutowalny nie tylko przez konwencję - mutacja obiektu propsów łamie założenia reconcilera i wywołania <code>React.memo</code>, które porównują referencje. W Vue mutowanie propsa też jest zakazane, ale runtime ostrzega, a reaktywność często i tak zadziała. W Reactcie nic się po prostu nie przerysuje, bo nikt nie śledzi obiektów.</p>' +
            '<h4>Projektowanie API komponentu</h4>' +
            '<ul>' +
            '<li><strong>Nazewnictwo</strong>: props wejściowe rzeczownikowo (<code>value</code>, <code>items</code>), wyjściowe z prefiksem <code>on</code> (<code>onChange</code>, <code>onSelect</code>). To odpowiednik konwencji <code>update:modelValue</code> w Vue.</li>' +
            '<li><strong>Sloty jako propsy</strong>: <code>renderItem={(item) =&gt; &lt;Row {...item} /&gt;}</code> to dokładny odpowiednik scoped slot. Różnica: typ funkcji renderującej jest w pełni wyprowadzany przez TypeScript, czego scoped sloty długo nie miały.</li>' +
            '<li><strong>Rozszerzanie natywnych atrybutów</strong>: <code>type Props = ComponentPropsWithoutRef&lt;"button"&gt; &amp; { tone?: "danger" }</code>. To zastępuje <code>attrs</code> i <code>inheritAttrs</code>, tylko jawnie - musisz sam zrobić <code>{...rest}</code>.</li>' +
            '</ul>' +
            '<pre><code>function Button({ tone = "default", ...rest }: Props) {\n  return &lt;button data-tone={tone} {...rest} /&gt;\n}</code></pre>' +
            '<h4>Praktyka z design systemu</h4>' +
            '<p>Przy komponentach biblioteki (jak CHI) najważniejsza różnica jest taka: w Vue duża część kontraktu jest opisana runtime w <code>defineProps</code> i widoczna w devtools. W Reactcie kontrakt żyje wyłącznie w typach i znika po kompilacji. Dlatego waliduj granice danych osobno (zod na wejściu z API), a w komponentach polegaj na typach i testach.</p>' +
            '<p>Dwie pułapki, które realnie bolą w produkcji:</p>' +
            '<ol>' +
            '<li>Przekazywanie inline obiektu <code>style={{...}}</code> lub świeżej funkcji do zmemoizowanego dziecka niweczy memo. W Vue nie było to problemem, bo aktualizacja szła po zależnościach, a nie po referencjach propsów.</li>' +
            '<li>Spread niezaufanych propsów na element DOM przepuszcza dowolne atrybuty. Filtruj, jeśli komponent jest publicznym API biblioteki.</li>' +
            '</ol>' +
            '<p>Na rozmowie często pada: jak zrobić scoped slot w Reactcie. Odpowiedź brzmi: prop będący funkcją zwracającą JSX, czyli render prop - i warto dodać, że <code>children</code> też może być funkcją.</p>' +
            '<p>Ostatnia rzecz z praktyki zespołowej: skoro kontrakt komponentu to typ, warto go trzymać jako nazwany, eksportowany typ obok komponentu. Konsumenci mogą wtedy budować własne wrappery przez <code>Omit</code> i <code>Pick</code> zamiast kopiować listę propsów, a zmiana kontraktu zapala się w kompilacji u wszystkich naraz - to jest przewaga, której runtime <code>defineProps</code> nie daje.</p>',
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
            pl: 'Co jest odpowiednikiem slotu domyślnego z Vue?',
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
            pl: 'Wszystko, co wpiszesz między tagami komponentu, ląduje w propsie children. Sloty nazwane to po prostu kolejne propsy przyjmujące JSX.',
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
            { pl: 'Wywołuje funkcję otrzymaną w propsie', en: 'It calls a function it received as a prop' },
            { pl: 'Wysyła CustomEvent w DOM', en: 'It dispatches a DOM CustomEvent' }
          ],
          correct: 2,
          explain: {
            pl: 'React nie ma systemu zdarzeń komponentowych. Zamiast emit dostajesz funkcję w propsie i po prostu ją wołasz - to zwykłe wywołanie funkcji.',
            en: 'React has no component event system. Instead of emit you receive a function prop and call it - a plain function call.'
          }
        },
        {
          q: {
            pl: 'Jaki jest odpowiednik scoped slotu, gdy dziecko musi przekazać dane do renderowanej treści?',
            en: 'What replaces a scoped slot when the child must hand data to the rendered content?'
          },
          options: [
            { pl: 'Context', en: 'Context' },
            { pl: 'Prop będący funkcją zwracającą JSX (render prop)', en: 'A prop that is a function returning JSX (a render prop)' },
            { pl: 'forwardRef', en: 'forwardRef' },
            { pl: 'Portal', en: 'A portal' }
          ],
          correct: 1,
          explain: {
            pl: 'Render prop, np. renderItem={(item) => ...}, daje dokładnie to samo co scoped slot i dodatkowo w pełni typuje się w TypeScripcie.',
            en: 'A render prop such as renderItem={(item) => ...} gives exactly what a scoped slot gave, and additionally types cleanly in TypeScript.'
          }
        },
        {
          q: {
            pl: 'Budujesz Button w design systemie i chcesz przepuścić natywne atrybuty przycisku. Co odpowiada mechanizmowi attrs z Vue?',
            en: 'You are building a design-system Button and want native button attributes to pass through. What matches Vue attrs?'
          },
          options: [
            { pl: 'Nic - React przepuszcza atrybuty automatycznie', en: 'Nothing - React forwards attributes automatically' },
            { pl: 'Ustawienie inheritAttrs na true', en: 'Setting inheritAttrs to true' },
            { pl: 'Typ ComponentPropsWithoutRef plus jawny spread reszty propsów', en: 'A ComponentPropsWithoutRef type plus an explicit spread of the rest' },
            { pl: 'Użycie dangerouslySetInnerHTML', en: 'Using dangerouslySetInnerHTML' }
          ],
          correct: 2,
          explain: {
            pl: 'React nie ma automatycznego dziedziczenia atrybutów. Typujesz propsy przez ComponentPropsWithoutRef i sam robisz spread reszty na element.',
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
      terms: [
        {
          term: { pl: 'Faza render', en: 'Render phase' },
          def: {
            pl: 'Wywołanie funkcji komponentu, które buduje elementy. Musi być czysta, bo React może ją przerwać i powtórzyć.',
            en: 'The component function call that builds elements. It must be pure, because React may interrupt and replay it.'
          }
        },
        {
          term: { pl: 'Faza commit', en: 'Commit phase' },
          def: {
            pl: 'Moment, w którym React nanosi obliczone zmiany na DOM i odpala efekty. Długi profil renderu, a nie commitu, wskazuje na zbyt wysoko trzymany stan.',
            en: 'The point where React applies the computed changes to the DOM and runs effects. A long render profile rather than commit points to state held too high.'
          }
        },
        {
          term: { pl: 'StrictMode', en: 'StrictMode' },
          def: {
            pl: 'Tryb deweloperski, który montuje i renderuje komponent dwa razy, żeby ujawnić efekty uboczne i brakujące cleanupy.',
            en: 'A development mode that mounts and renders a component twice to expose side effects and missing cleanups.'
          }
        },
        {
          term: { pl: 'Children jako props', en: 'Children as props' },
          def: {
            pl: 'Trik wydajnościowy: ciężkie poddrzewo tworzy komponent nadrzędny i przekazuje jako <code>children</code>, więc zmiana stanu wrappera go nie renderuje. Działa bez <code>memo</code>.',
            en: 'A performance trick: the heavy subtree is created by the outer component and passed as <code>children</code>, so wrapper state changes do not re-render it. Works without <code>memo</code>.'
          }
        },
        {
          term: { pl: 'useTransition', en: 'useTransition' },
          def: {
            pl: 'Hook oznaczający aktualizację jako niepilną, żeby wpisywanie zostało płynne mimo ciężkiego renderu. Bliźniaczy <code>useDeferredValue</code> robi to dla samej wartości.',
            en: 'A hook that marks an update as non-urgent so typing stays smooth despite a heavy render. Its twin <code>useDeferredValue</code> does the same for a single value.'
          }
        }
      ],
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
          pl: 'Vue odświeża tylko efekty, które czytały zmienioną wartość. React uruchamia ponownie całą funkcję komponentu i jego dzieci, a dopiero diff decyduje, co dotknie DOM.',
          en: 'Vue reruns only the effects that read the changed value. React re-runs the whole component function and its children, and only the diff decides what touches the DOM.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Krok po kroku: co dzieje się od kliknięcia do zmiany piksela w Reactcie.',
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
              pl: 'Drzewo jest wyrenderowane, count wynosi 0. Nic się nie dzieje, dopóki nie zawołasz settera.',
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
            label: { pl: 'Kliknięcie i kolejka', en: 'Click and queue' },
            note: {
              pl: 'setState nie zmienia zmiennej od razu - dopisuje aktualizację do kolejki i planuje render. Dlatego zaraz po nim count nadal ma starą wartość.',
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
            label: { pl: 'Render całego poddrzewa', en: 'Whole subtree renders' },
            note: {
              pl: 'React wywołuje funkcję App i wszystkich jej dzieci, nawet tych, które nie czytają count. W Vue odpaliłby się tylko efekt renderujący Label.',
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
              pl: 'Diff porównuje nowe elementy ze starymi i dotyka tylko jednego węzła tekstowego. Dużo renderów nie oznacza dużo pracy DOM - ale oznacza pracę CPU.',
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
            label: { pl: 'Odcinanie gałęzi', en: 'Cutting the branch' },
            note: {
              pl: 'React.memo albo przeniesienie stanu niżej sprawia, że gałąź bez zależności nie jest w ogóle wywoływana. To ręczny odpowiednik tego, co Vue robi automatycznie.',
              en: 'React.memo or moving the state lower stops an unrelated branch from being called at all. It is the manual version of what Vue does automatically.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kucharza, który na każde zamówienie pisze od nowa całe menu na kartce. Zmieniła się jedna cena? Kartka i tak powstaje od początku.</p>' +
            '<p>Brzmi jak marnotrawstwo, ale jest sztuczka: zanim kelner poniesie kartkę na salę, ktoś porównuje nową wersję ze starą i przepisuje na tablicy tylko tę jedną cyfrę. Reszta zostaje bez ruchu.</p>' +
            '<p>Vue robi to inaczej: pilnuje, kto o co pytał. Skoro tylko jedno danie interesowało się ceną, tylko ono dostaje powiadomienie. Żadnego przepisywania całego menu.</p>' +
            '<p>Oba sposoby dają ten sam wynik na tablicy. Różnica jest w tym, ile pracy idzie w kartkę, której i tak nikt nie zobaczy. Dlatego w Reactcie warto wiedzieć, kiedy kucharz pisze za dużo.</p>',
          en: '<p>Picture a chef who rewrites the entire menu on a sheet of paper for every single order. One price changed? The sheet gets written from scratch anyway.</p>' +
            '<p>Sounds wasteful, but there is a trick: before the waiter carries it out, somebody compares the new sheet with the old one and rewrites only that one digit on the board. Everything else stays untouched.</p>' +
            '<p>Vue does it differently: it keeps track of who asked about what. Since only one dish cared about the price, only that dish gets notified. No rewriting of the whole menu.</p>' +
            '<p>Both approaches put the same thing on the board. The difference is how much effort goes into a sheet nobody will ever see. So in React it pays to know when the chef is writing too much.</p>'
        },
        school: {
          pl: '<p>To jest ta lekcja, po której wszystko inne w Reactcie zaczyna mieć sens. <strong>W Vue funkcja setup uruchamia się raz, a potem reaktywność odświeża tylko te fragmenty, które czytały zmienioną wartość. W Reactcie cała funkcja komponentu wykonuje się od nowa przy każdej zmianie stanu</strong> - bo React nie śledzi, co czytałeś.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;script setup&gt;\nconst count = ref(0)\nconsole.log("setup")   // wypisze się RAZ\n&lt;/script&gt;\n&lt;template&gt;&lt;button @click="count++"&gt;{{ count }}&lt;/button&gt;&lt;/template&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>function Counter() {\n  const [count, setCount] = useState(0)\n  console.log("render")  // wypisze się przy KAŻDYM kliknięciu\n  return &lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;\n}</code></pre>' +
            '<p>Trzy wnioski, które trzeba zapamiętać na zawsze:</p>' +
            '<ol>' +
            '<li>Zwykła zmienna zadeklarowana w ciele komponentu ginie przy każdym renderze. Dlatego stan musi mieszkać w <code>useState</code>, a nie w <code>let</code>.</li>' +
            '<li><code>setCount</code> nie zmienia zmiennej natychmiast. Kolejkuje aktualizację; <code>count</code> w bieżącym renderze pozostaje stary. Jeśli nowa wartość zależy od poprzedniej, używaj wersji funkcyjnej: <code>setCount(c =&gt; c + 1)</code>.</li>' +
            '<li>Re-render nie oznacza dotknięcia DOM. React porównuje wynik ze starym drzewem i patchuje tylko różnice.</li>' +
            '</ol>' +
            '<p>Ważna konsekwencja: stan jest niemutowalny. Gdzie w Vue robiłeś <code>state.items.push(x)</code>, w Reactcie robisz <code>setItems([...items, x])</code>. Nie dlatego, że niemutowalność jest ładniejsza, tylko dlatego, że React porównuje referencje - ten sam obiekt oznacza dla niego brak zmiany.</p>' +
            '<p>Aktualizacje są batchowane: trzy wywołania setterów w jednym handlerze dają jeden render, nie trzy. To odpowiednik kolejki mikrozadań i <code>nextTick</code> w Vue.</p>',
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
          pl: '<p>Model wykonania: <strong>render</strong> (czysta funkcja, buduje elementy), <strong>reconciliation</strong> (porównanie z poprzednim drzewem) i <strong>commit</strong> (mutacje DOM plus efekty). Render może zostać przerwany i powtórzony - dlatego musi być czysty i dlatego <code>StrictMode</code> w devie woła go dwa razy, żeby wyłapać efekty uboczne.</p>' +
            '<h4>Dlaczego to inny model kosztowy niż Vue</h4>' +
            '<p>Vue kosztuje mniej wywołań, bo zależności są śledzone na poziomie wartości. React kosztuje więcej wywołań, ale każde jest tanie i przewidywalne, a diff jest płaski. Praktycznie: aplikacja Reactowa z 2000 komponentów i stanem trzymanym w korzeniu będzie zacinać się na klawiaturze, mimo że DOM prawie się nie zmienia. Profiler pokaże wtedy długi commit fazy render, a nie layout.</p>' +
            '<pre><code>// Zamiast trzymać stan w korzeniu:\nfunction Page() {\n  const [q, setQ] = useState("")     // rerenderuje całą stronę\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;&lt;HeavyTable /&gt;&lt;/&gt;\n}\n\n// Skoloku stan albo przekaż drzewo jako children:\nfunction Page({ children }) {\n  const [q, setQ] = useState("")\n  return &lt;&gt;&lt;Search value={q} onChange={setQ} /&gt;{children}&lt;/&gt;\n}\n// &lt;Page&gt;&lt;HeavyTable /&gt;&lt;/Page&gt; - HeavyTable jest tworzony wyżej,\n// więc jego element nie zmienia referencji i diff go pomija.</code></pre>' +
            '<h4>Kolejność dźwigni</h4>' +
            '<ol>' +
            '<li><strong>Kolokacja</strong> - obniż stan tak nisko, jak się da. Najtańsze i najskuteczniejsze.</li>' +
            '<li><strong>Children jako props</strong> - opisany wyżej trik, działa bez memo.</li>' +
            '<li><strong>React.memo plus useMemo/useCallback</strong> - dopiero gdy pierwsze dwa nie wystarczą. Każde memo kosztuje porównanie i pamięć.</li>' +
            '<li><strong>useTransition / useDeferredValue</strong> - gdy render jest z natury ciężki (filtrowanie dużej listy) i chcesz zachować responsywność wpisywania.</li>' +
            '</ol>' +
            '<p>W React 19 dochodzi kompilator, który automatycznie wstawia memoizację na podstawie analizy kodu - efektywnie zbliżając ergonomię do Vue. Nie zwalnia to jednak z kolokacji: kompilator nie przeniesie stanu za ciebie.</p>' +
            '<p>Liczby, które warto mieć w głowie: render prostego komponentu to około 5-50 mikrosekund, więc 500 niepotrzebnych renderów na keystroke to już odczuwalne kilkanaście milisekund. Budżet na interakcję to 50 ms, więc problem robi się realny szybciej, niż się wydaje.</p>' +
            '<p>Na rozmowie pada klasyk: dlaczego <code>setCount(count + 1)</code> trzy razy pod rząd zwiększy licznik o jeden. Odpowiedź: <code>count</code> jest zamrożony w domknięciu tego renderu, a aktualizacje są kolejkowane - wersja funkcyjna to naprawia.</p>',
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
            pl: 'Ile razy wykona się ciało funkcji komponentu Reacta po dziesięciu zmianach stanu?',
            en: 'How many times does a React component function body run after ten state changes?'
          },
          options: [
            { pl: 'Raz, jak setup w Vue', en: 'Once, like Vue setup' },
            { pl: 'Co najmniej raz na każdą zmianę, która nie została zbatchowana', en: 'At least once per change that was not batched' },
            { pl: 'Tylko przy montowaniu i odmontowaniu', en: 'Only on mount and unmount' },
            { pl: 'Nigdy - JSX jest kompilowany statycznie', en: 'Never - JSX is compiled statically' }
          ],
          correct: 1,
          explain: {
            pl: 'Funkcja komponentu jest wywoływana ponownie przy każdym renderze. Setup w Vue uruchamia się raz, bo reaktywność działa na poziomie wartości.',
            en: 'The component function is called again on every render. Vue setup runs once because reactivity works at the value level.'
          }
        },
        {
          q: {
            pl: 'W jednym handlerze wołasz setCount(count + 1) trzy razy. Jaki będzie wynik?',
            en: 'You call setCount(count + 1) three times in one handler. What is the result?'
          },
          options: [
            { pl: 'Licznik rosnie o trzy', en: 'The counter grows by three' },
            { pl: 'Rzucany jest błąd o zbyt wielu aktualizacjach', en: 'An error about too many updates is thrown' },
            { pl: 'Licznik rosnie o jeden', en: 'The counter grows by one' },
            { pl: 'Następują trzy osobne rendery po jednym przyroście', en: 'Three separate renders happen with one increment each' }
          ],
          correct: 2,
          explain: {
            pl: 'count jest zamrożony w domknięciu bieżącego renderu, więc trzy razy liczysz to samo. setCount(c => c + 1) rozwiązuje problem.',
            en: 'count is frozen in the current render closure, so you compute the same value three times. setCount(c => c + 1) fixes it.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Reactcie nie robisz items.push(x) na stanie?',
            en: 'Why should you not do items.push(x) on React state?'
          },
          options: [
            { pl: 'Bo push jest wolniejszy niż spread', en: 'Because push is slower than a spread' },
            { pl: 'Bo React porównuje referencje i ta sama tablica oznacza brak zmiany', en: 'Because React compares references and the same array means no change' },
            { pl: 'Bo tablice są zamrożone przez Object.freeze', en: 'Because arrays are frozen with Object.freeze' },
            { pl: 'Bo push nie działa w trybie StrictMode', en: 'Because push does not work in StrictMode' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie ma proxy śledzących mutacje jak Vue. Nowa referencja to jedyny sygnał, że coś się zmieniło.',
            en: 'React has no mutation-tracking proxies like Vue. A new reference is the only signal that something changed.'
          }
        },
        {
          q: {
            pl: 'Wpisywanie w pole wyszukiwania zacina się, choć DOM prawie się nie zmienia. Który ruch najczęściej pomaga jako pierwszy?',
            en: 'Typing in a search field stutters even though the DOM barely changes. Which move usually helps first?'
          },
          options: [
            { pl: 'Owinąć wszystko w useMemo', en: 'Wrap everything in useMemo' },
            { pl: 'Zamienić kontrolowany input na niekontrolowany z refem', en: 'Swap the controlled input for an uncontrolled one with a ref' },
            { pl: 'Włączyć StrictMode w produkcji', en: 'Enable StrictMode in production' },
            { pl: 'Obniżyć stan do komponentu pola i oddzielić ciężkie poddrzewo przez children', en: 'Push state down into the field and split off the heavy subtree via children' }
          ],
          correct: 3,
          explain: {
            pl: 'Problem to faza renderu całego poddrzewa, więc kolokacja stanu i przekazanie ciężkiej części jako children usuwa przyczynę. Memo dokłada tylko koszt porównań.',
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
      terms: [
        {
          term: { pl: 'Reconciliation', en: 'Reconciliation' },
          def: {
            pl: 'Algorytm porównujący nowe drzewo elementów ze starym. Liniowy i heurystyczny: porównuje rodzeństwo po kolei, korzystając z mapy kluczy.',
            en: 'The algorithm diffing the new element tree against the old one. Linear and heuristic: it walks siblings in order using a map of keys.'
          }
        },
        {
          term: { pl: 'key', en: 'key' },
          def: {
            pl: 'Specjalny prop nadający elementowi tożsamość wśród rodzeństwa. Musi być stabilny - <code>Math.random()</code> gwarantuje remount przy każdym renderze.',
            en: 'A special prop giving an element identity among its siblings. It must be stable - <code>Math.random()</code> guarantees a remount on every render.'
          }
        },
        {
          term: { pl: 'Remount', en: 'Remount' },
          def: {
            pl: 'Odmontowanie starej instancji i zamontowanie nowej. Ginie stan hooków, odpalają się cleanupy, znika focus, scroll i zaznaczenie tekstu.',
            en: 'Unmounting the old instance and mounting a new one. Hook state is lost, cleanups run, and focus, scroll and text selection disappear.'
          }
        },
        {
          term: { pl: 'key jako reset', en: 'key as a reset' },
          def: {
            pl: 'Zmiana klucza celowo wymusza remount, np. <code>&lt;Form key={userId} /&gt;</code> czyści cały formularz. W Vue pisałbyś do tego <code>watch</code>.',
            en: 'Changing the key deliberately forces a remount, e.g. <code>&lt;Form key={userId} /&gt;</code> clears the whole form. In Vue you would write a <code>watch</code> for that.'
          }
        },
        {
          term: { pl: 'Indeks jako klucz', en: 'Index as key' },
          def: {
            pl: 'Bezpieczny wyłącznie dla listy tylko do odczytu, która nigdy się nie sortuje ani nie dostaje elementów na początek. Inaczej stan wędruje do złych wierszy.',
            en: 'Safe only for a read-only list that never reorders and never gets items prepended. Otherwise state migrates into the wrong rows.'
          }
        }
      ],
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
          pl: 'Klucz mówi Reactowi, który element to ten sam element. Indeks jako klucz przy wstawianiu na początek przesuwa stan do złych wierszy.',
          en: 'A key tells React which element is the same element. Using the index as a key shifts state into the wrong rows when you prepend.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Wstawiamy Zoe na początek listy z polami tekstowymi - najpierw z kluczem po indeksie, potem z kluczem po id.',
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
            label: { pl: 'Punkt wyjścia', en: 'Starting point' },
            note: {
              pl: 'Każdy wiersz ma własny input i własny stan lokalny. Klucze to indeksy: 0, 1, 2.',
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
              pl: 'Nazwy przesunęły się o jeden, ale klucze nie. React uznaje, że to te same instancje i zostawia starą zawartość inputów przy złych osobach.',
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
              pl: 'Trzy wiersze musiały zostać zaktualizowane, a stan inputów trafił do złych osób. Ostatni wiersz zniknął razem ze swoim stanem.',
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
              pl: 'Stabilne id pozwala Reactowi rozpoznać, że Ada i Bo to te same instancje, a Zoe jest nowa. To dokładnie ta sama zasada, co :key w Vue.',
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
              pl: 'Zmiana klucza celowo niszczy instancję i tworzy nową. Zamiast watcha resetującego formularz po zmianie id, dajesz key={userId}.',
              en: 'Changing the key deliberately destroys the instance and creates a new one. Instead of a watcher resetting the form when the id changes, you write key={userId}.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie szatnię z wieszakami. Każda kurtka dostaje numerek. Kiedy przychodzisz po swoją kurtkę, podajesz numerek i dostajesz dokładnie tę swoją.</p>' +
            '<p>A teraz zła wersja: numerki są przypisane do <em>miejsca na drążku</em>, nie do kurtki. Ktoś wciska nową kurtkę na sam początek, wszystko przesuwa się o jedno miejsce - i nagle numerek jeden należy do kogoś innego. Ludzie wychodzą w cudzych płaszczach.</p>' +
            '<p>Dokładnie to robi React, gdy jako numerek dasz pozycję na liście. Trzeba dać numerek, który należy do rzeczy, a nie do półki: identyfikator z bazy.</p>' +
            '<p>Bonus: skoro numerek decyduje o tożsamości, to zmieniając go celowo, mówisz Reactowi <em>to już inna kurtka</em> - i wszystko zaczyna się od nowa.</p>',
          en: '<p>Picture a cloakroom with hangers. Every coat gets a tag. When you come back you hand over the tag and get exactly your coat.</p>' +
            '<p>Now the broken version: tags belong to a <em>spot on the rail</em>, not to a coat. Someone squeezes a new coat in at the front, everything shifts by one place - and suddenly tag one belongs to somebody else. People walk out in strangers coats.</p>' +
            '<p>That is precisely what React does when you use the position in the list as the tag. You need a tag that belongs to the thing, not to the shelf: an id from your database.</p>' +
            '<p>Bonus: since the tag decides identity, changing it on purpose tells React <em>this is a different coat now</em> - and everything starts fresh.</p>'
        },
        school: {
          pl: '<p>Reconciliation to algorytm, który porównuje nowe drzewo elementów ze starym. Reguła jest krótka: <strong>ten sam typ komponentu w tym samym miejscu i z tym samym kluczem oznacza tę samą instancję</strong>, więc stan i DOM są zachowywane. Inny typ albo inny klucz - stara instancja jest odmontowywana, nowa montowana od zera.</p>' +
            '<h4>Vue</h4>' +
            '<pre><code>&lt;TodoRow v-for="t in todos" :key="t.id" :todo="t" /&gt;</code></pre>' +
            '<h4>React</h4>' +
            '<pre><code>{todos.map(t =&gt; &lt;TodoRow key={t.id} todo={t} /&gt;)}</code></pre>' +
            '<p>Wygląda identycznie i w istocie <strong>w Vue używałeś :key i w Reactcie używasz key z tego samego powodu</strong>: oba runtime muszą wiedzieć, który węzeł to który. Różnica jest w konsekwencjach. Vue częściej wybroni się samo, bo ma patch flagi i dodatkowe heurystyki. React bez klucza traktuje pozycję jako tożsamość, więc przy wstawianiu na początek stan komponentów przesuwa się do złych wierszy.</p>' +
            '<p>Trzy praktyczne reguły:</p>' +
            '<ul>' +
            '<li>Klucz musi być <strong>stabilny</strong> - id z bazy albo uuid nadany przy tworzeniu. Nigdy <code>Math.random()</code>, bo to gwarantowany remount przy każdym renderze.</li>' +
            '<li>Indeks jest bezpieczny tylko wtedy, gdy lista jest tylko do odczytu i nigdy nie zmienia kolejności ani długości na początku.</li>' +
            '<li>Klucz jest lokalny dla rodzeństwa, nie globalny - dwie różne listy mogą mieć te same klucze.</li>' +
            '</ul>' +
            '<p>Jest też druga strona medalu: klucz jako narzędzie. <code>&lt;Form key={userId} /&gt;</code> resetuje cały formularz przy zmianie użytkownika. W Vue zwykle pisałbyś do tego <code>watch</code> czyszczący pola - tutaj wystarczy zmienić tożsamość komponentu.</p>',
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
          pl: '<p>Reconciler Reacta jest z założenia heurystyczny i liniowy: nie szuka minimalnej odległości edycyjnej między drzewami, tylko porównuje rodzeństwo po kolei, używając mapy kluczy. Założenie brzmi: elementy różnego typu produkują różne drzewa, a deweloper podpowie tożsamość kluczem. To daje złożoność O(n) zamiast O(n^3).</p>' +
            '<h4>Co dokładnie ginie przy remount</h4>' +
            '<ul>' +
            '<li>Stan hooków (<code>useState</code>, <code>useReducer</code>) tego poddrzewa.</li>' +
            '<li>Efekty - odpalają się cleanupy, potem efekty montujące na nowo. Subskrypcje, timery i zapytania startują od zera.</li>' +
            '<li>Stan DOM nieodzwierciedlony w Reactcie: pozycja scrolla, focus, zaznaczenie tekstu, stan odtwarzania video.</li>' +
            '</ul>' +
            '<p>Ostatni punkt jest tym, co najczęściej trafia na produkcję jako bug zgłaszany przez użytkowników: przy dodaniu rekordu na górę listy pole traci focus w połowie pisania.</p>' +
            '<pre><code>// Anty-wzorzec: nowy typ komponentu na każdy render\nfunction Page() {\n  const Row = ({ item }) =&gt; &lt;li&gt;{item.name}&lt;/li&gt;  // nowa referencja za każdym razem\n  return &lt;ul&gt;{items.map(i =&gt; &lt;Row key={i.id} item={i} /&gt;)}&lt;/ul&gt;\n}\n// Rezultat: całe poddrzewo montuje się od nowa przy każdym renderze.</code></pre>' +
            '<h4>Różnice wobec Vue, które realnie bolą przy migracji</h4>' +
            '<p>W Vue <code>v-if</code> na dwóch gałęziach o tym samym typie komponentu też potrafi ponownie użyć instancji i wymaga <code>key</code>, więc sam problem jest znajomy. Nowe jest to, że w Reactcie <em>pozycja w drzewie</em> jest częścią tożsamości nawet bez list: <code>{cond ? &lt;Input /&gt; : &lt;Input /&gt;}</code> zachowa stan, bo to ten sam typ na tej samej pozycji. To najczęstsze pytanie podchwytliwe na rozmowach.</p>' +
            '<p>Praktyczne wnioski dla dużych list:</p>' +
            '<ol>' +
            '<li>Nadawaj id przy tworzeniu rekordu po stronie klienta (<code>crypto.randomUUID()</code>), nie czekaj na odpowiedź serwera - inaczej optimistic update dostanie nowy klucz i remount.</li>' +
            '<li>Przy wirtualizacji (react-window, TanStack Virtual) klucz musi pochodzić z danych, nie z indeksu okna, inaczej scroll będzie mieszał stan wierszy.</li>' +
            '<li>Sortowanie po stronie klienta bez stabilnych kluczy to najszybsza droga do zgubionego focusu.</li>' +
            '</ol>' +
            '<p>Warto też znać koszt: React nie wykrywa przeniesienia poddrzewa w inne miejsce w drzewie. Przeniesiony komponent zawsze montuje się od nowa, niezależnie od klucza. Vue ma tu takie samo ograniczenie - to nie jest wada implementacji, tylko konsekwencja porównania po rodzeństwie.</p>',
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
            { pl: 'Do ustalenia kolejności CSS', en: 'To determine CSS ordering' },
            { pl: 'Do rozpoznania, który element to ta sama instancja', en: 'To recognise which element is the same instance' },
            { pl: 'Do cacheowania odpowiedzi z API', en: 'To cache API responses' },
            { pl: 'Do wygenerowania atrybutu id w DOM', en: 'To generate a DOM id attribute' }
          ],
          correct: 1,
          explain: {
            pl: 'Klucz to tożsamość elementu w obrębie rodzeństwa. Bez niego React używa pozycji, co przy zmianie kolejności przesuwa stan.',
            en: 'The key is the identity of an element among its siblings. Without one React falls back to position, which shifts state when the order changes.'
          }
        },
        {
          q: {
            pl: 'Co dzieje się ze stanem komponentu, gdy zmienisz jego key?',
            en: 'What happens to a component state when you change its key?'
          },
          options: [
            { pl: 'Stan jest zachowany, zmienia się tylko DOM', en: 'State is preserved, only the DOM changes' },
            { pl: 'Stan jest scalany ze starym', en: 'State is merged with the old one' },
            { pl: 'Instancja jest odmontowywana i tworzona od nowa, stan znika', en: 'The instance unmounts and remounts, state is gone' },
            { pl: 'Nic - key wpływa tylko na wydajność', en: 'Nothing - key only affects performance' }
          ],
          correct: 2,
          explain: {
            pl: 'Inny klucz oznacza inną tożsamość, więc remount. To celowa technika resetowania formularzy, np. key={userId}.',
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
            { pl: 'Zawsze, jeśli elementy nie mają własnego stanu w DOM', en: 'Always, as long as items have no DOM state' },
            { pl: 'Gdy lista jest krótsza niż 50 elementów', en: 'When the list is shorter than 50 items' },
            { pl: 'Nigdy - React to odrzuci', en: 'Never - React rejects it' }
          ],
          correct: 0,
          explain: {
            pl: 'Indeks jest bezpieczny tylko dla listy niezmiennej pod względem kolejności i długości od początku. Każde wstawienie na górę łamie tożsamość.',
            en: 'An index is safe only for a list whose order and leading length never change. Any prepend breaks identity.'
          }
        },
        {
          q: {
            pl: 'Piszesz {isEdit ? <Input /> : <Input />} i dziwisz się, że po przełączeniu wpisany tekst zostaje. Dlaczego?',
            en: 'You write {isEdit ? <Input /> : <Input />} and are surprised the typed text survives the toggle. Why?'
          },
          options: [
            { pl: 'Bo React cacheuje wartości inputów globalnie', en: 'Because React caches input values globally' },
            { pl: 'Bo przeglądarka przywraca wartość z autofill', en: 'Because the browser restores the value from autofill' },
            { pl: 'Bo brakuje atrybutu defaultValue', en: 'Because a defaultValue attribute is missing' },
            { pl: 'Bo to ten sam typ komponentu na tej samej pozycji, więc ta sama instancja', en: 'Because it is the same component type in the same slot, hence the same instance' }
          ],
          correct: 3,
          explain: {
            pl: 'Pozycja w drzewie jest częścią tożsamości. Żeby wymusić świeży komponent, nadaj różne klucze, np. key="edit" i key="view".',
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
      terms: [
        {
          term: { pl: 'React Compiler', en: 'React Compiler' },
          def: {
            pl: 'Kompilator wstawiający memoizację automatycznie na podstawie analizy kodu, więc <code>useMemo</code> i <code>useCallback</code> stają się wyjątkiem. Ufa, że render jest czysty.',
            en: 'A compiler that inserts memoisation automatically from static analysis, making <code>useMemo</code> and <code>useCallback</code> the exception. It trusts that render is pure.'
          }
        },
        {
          term: { pl: 'RSC', en: 'RSC' },
          def: {
            pl: 'React Server Components - komponenty renderowane wyłącznie na serwerze, nieobecne w bundlu i bez hydracji. Mogą robić <code>await db.query()</code> w ciele komponentu.',
            en: 'React Server Components - components rendered only on the server, absent from the bundle and never hydrated. They can <code>await db.query()</code> in the component body.'
          }
        },
        {
          term: { pl: 'use client', en: 'use client' },
          def: {
            pl: 'Dyrektywa oznaczająca granicę między kodem serwerowym a interaktywnym kodem klienta. W architekturze RSC pełni rolę, którą w SPA miała granica bundla.',
            en: 'The directive marking the boundary between server code and interactive client code. In RSC it plays the role the bundle boundary played in an SPA.'
          }
        },
        {
          term: { pl: 'useActionState', en: 'useActionState' },
          def: {
            pl: 'Hook łączący akcję formularza ze stanem wyniku i flagą <code>pending</code>. Działa także bez serwera, więc zastępuje własne composable do stanu ładowania.',
            en: 'A hook that ties a form action to its result state and a <code>pending</code> flag. It works without a server too, replacing a hand-rolled loading-state composable.'
          }
        },
        {
          term: { pl: 'useOptimistic', en: 'useOptimistic' },
          def: {
            pl: 'Hook pokazujący przewidywany wynik akcji zanim serwer odpowie i cofający go przy błędzie.',
            en: 'A hook that shows the predicted result of an action before the server replies, and rolls it back on failure.'
          }
        }
      ],
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
          pl: 'React 19 automatyzuje memoizację i upraszcza formularze, ale nie zmienia modelu mentalnego: nadal renderujesz całą funkcję i nadal sam decydujesz, gdzie mieszka stan.',
          en: 'React 19 automates memoization and simplifies forms, but it does not change the mental model: you still re-run the whole function and you still decide where state lives.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że przez lata jeździłeś autem, w którym trzeba było ręcznie zmieniać biegi, dolewać płyn i pamiętać o światłach. Działa, ale trzeba dużo pamiętać.</p>' +
            '<p>React 19 to ta sama droga i to samo auto, tylko z automatyczną skrzynią. Większość rzeczy, o których trzeba było pamiętać, robi się sama. Silnik się nie zmienił - dalej jedziesz tak samo, tylko mniej się męczysz.</p>' +
            '<p>Doszło też kilka gadżetów: wygodniejsza obsługa formularzy, łatwiejsze czekanie na dane i możliwość przygotowania części ekranu jeszcze na serwerze, zanim auto ruszy.</p>' +
            '<p>Najważniejsze: reguły jazdy są te same. Kto zna drogę, ten nie musi uczyć się od nowa.</p>',
          en: '<p>Imagine you spent years driving a car where you shifted gears by hand, topped up fluids and remembered to switch the lights on. It works, but it is a lot to remember.</p>' +
            '<p>React 19 is the same road and the same car, just with an automatic gearbox. Most of the things you had to remember now happen by themselves. The engine did not change - you drive the same way, only with less effort.</p>' +
            '<p>A few gadgets arrived too: nicer form handling, easier waiting for data, and the ability to prepare part of the screen on the server before the car even moves.</p>' +
            '<p>The important bit: the rules of the road are unchanged. If you know the route, you do not have to relearn it.</p>'
        },
        school: {
          pl: '<p>Jeśli przesiadasz się z Vue 3 w 2026 roku, wchodzisz do Reacta w dobrym momencie - największy zarzut wobec Reacta, czyli ręczna memoizacja, właśnie znika.</p>' +
            '<h4>React Compiler</h4>' +
            '<p>Kompilator analizuje kod i sam wstawia memoizację tam, gdzie ma to sens. <strong>W Vue nigdy nie pisałeś useCallback, bo kompilator i reaktywność robiły to za ciebie - w Reactcie 19 zaczyna być podobnie.</strong> Kod który kiedyś wyglądał tak:</p>' +
            '<pre><code>// React 18\nconst handle = useCallback(() =&gt; onPick(id), [onPick, id])\nconst rows = useMemo(() =&gt; items.filter(f), [items, f])</code></pre>' +
            '<p>teraz można pisać po prostu jako zwykłe wyrażenia, a kompilator dopisze resztę. Kompilator jest opt-in na poziomie pluginu bundlera i wymaga poprawnego kodu (reguła hooków, brak mutacji w renderze).</p>' +
            '<h4>Formularze i akcje</h4>' +
            '<pre><code>function Save() {\n  const [state, action, pending] = useActionState(saveUser, null)\n  return &lt;form action={action}&gt;\n    &lt;input name="name" /&gt;\n    &lt;button disabled={pending}&gt;Save&lt;/button&gt;\n  &lt;/form&gt;\n}</code></pre>' +
            '<p>To odpowiednik tego, co w Vue składałeś z <code>ref(loading)</code>, <code>try/catch</code> i własnego composable. Doszły też <code>useOptimistic</code> (optymistyczne UI bez ręcznego rollbacku) i <code>useFormStatus</code>.</p>' +
            '<h4>Drobiazgi, które uprzyjemniają życie</h4>' +
            '<ul>' +
            '<li><code>ref</code> jest zwykłym propsem - <code>forwardRef</code> odchodzi do lamusa.</li>' +
            '<li><code>&lt;title&gt;</code> i <code>&lt;meta&gt;</code> renderowane w komponencie są automatycznie przenoszone do head, jak w Nuxt.</li>' +
            '<li>Context używasz jako <code>&lt;Ctx value={...}&gt;</code> bez <code>.Provider</code>.</li>' +
            '<li>Hook <code>use()</code> czyta promise albo context i współpracuje z Suspense.</li>' +
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
          pl: '<p>Warto wiedzieć, co React 19 realnie zmienia w decyzjach architektonicznych, a co jest tylko wygodą.</p>' +
            '<h4>Kompilator nie zastępuje architektury</h4>' +
            '<p>React Compiler robi memoizację na poziomie komponentu i wartości - eliminuje większość <code>useMemo</code> i <code>useCallback</code>. Nie przeniesie za ciebie stanu w dół drzewa, nie naprawi złych kluczy i nie usunie efektu, który nie powinien istnieć. Innymi słowy: znika klasa problemów z referencjami, zostaje klasa problemów z projektem stanu. W Vue miałeś analogiczną sytuację - reaktywność dawała automatyzm, ale zła struktura store i tak potrafiła zabić wydajność.</p>' +
            '<p>Wymagania praktyczne: kompilator ufa, że render jest czysty. Mutacja propsa albo zapis do zewnętrznej zmiennej w czasie renderu daje błędną memoizację. Dlatego włączaj go razem z <code>eslint-plugin-react-hooks</code> w wersji z regułą kompilatora i traktuj ostrzeżenia jak błędy typów.</p>' +
            '<h4>RSC - jedyna rzecz bez odpowiednika w Vue</h4>' +
            '<p>Server Components renderują się wyłącznie na serwerze i nie trafiają do bundla. To nie jest SSR: nie ma hydracji tego kodu, a wynik jest serializowanym strumieniem opisu UI. Najbliższa analogia z Nuxt to <code>server components</code> i wyspy, ale model danych jest inny - RSC może bezpośrednio robić <code>await db.query()</code> w ciele komponentu.</p>' +
            '<pre><code>// Server Component - zero JS po stronie klienta\nasync function Report({ id }) {\n  const rows = await db.rows.findMany({ where: { id } })\n  return &lt;Table rows={rows} /&gt;\n}\n\n// Client Component - interaktywność\n"use client"\nexport function Filter() { /* useState itd. */ }</code></pre>' +
            '<p>Konsekwencja dla architektury: granica <code>use client</code> staje się tym, czym w klasycznym SPA była granica bundla. Warto ją projektować świadomie - komponenty prezentacyjne wyżej, interaktywne wyspy niżej i mniejsze.</p>' +
            '<h4>Na co uważać przy wyborze stacku w 2026</h4>' +
            '<ul>' +
            '<li>RSC praktycznie oznacza Next.js App Router albo Waku - w czystym Vite to nadal teren eksperymentalny.</li>' +
            '<li><code>useActionState</code> i <code>useOptimistic</code> działają też bez serwera - warto po nie sięgać nawet w SPA zamiast pisać własne composable do stanu ładowania.</li>' +
            '<li>Migrując projekt Vue, nie zaczynaj od RSC. Najpierw SPA z React Router lub Next w trybie klienckim, potem ewentualnie serwer.</li>' +
            '</ul>' +
            '<p>Na rozmowie o senior/staff pojawia się pytanie: czy kompilator zwalnia z <code>React.memo</code>. Uczciwa odpowiedź: w większości przypadków tak, ale memo nadal ma sens na granicach dużych poddrzew i przy propsach pochodzących spoza Reacta, których kompilator nie widzi.</p>',
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
            { pl: 'Automatycznie wstawia memoizację, zastępując większość useMemo i useCallback', en: 'Inserts memoization automatically, replacing most useMemo and useCallback' },
            { pl: 'Kompiluje JSX do stringów HTML', en: 'Compiles JSX into HTML strings' },
            { pl: 'Usuwa potrzebę stosowania kluczy w listach', en: 'Removes the need for keys in lists' }
          ],
          correct: 1,
          explain: {
            pl: 'Kompilator analizuje kod i memoizuje wartości oraz komponenty. Kluczy ani projektu stanu nie naprawi.',
            en: 'The compiler analyses your code and memoizes values and components. It fixes neither keys nor state design.'
          }
        },
        {
          q: {
            pl: 'Czym różnią się Server Components od SSR?',
            en: 'How do Server Components differ from SSR?'
          },
          options: [
            { pl: 'Niczym, to dwie nazwy tego samego', en: 'Not at all, two names for the same thing' },
            { pl: 'SSR działa tylko w Next.js, a RSC wszędzie', en: 'SSR only works in Next.js while RSC works everywhere' },
            { pl: 'RSC działają wyłącznie w przeglądarce', en: 'RSC run only in the browser' },
            { pl: 'Kod RSC nie trafia do bundla i nie jest hydratowany', en: 'RSC code never enters the bundle and is never hydrated' }
          ],
          correct: 3,
          explain: {
            pl: 'SSR renderuje na serwerze komponenty, które potem hydratują się na kliencie. RSC nigdy nie trafiają do klienta - to strumień opisu UI.',
            en: 'SSR renders components on the server and then hydrates them on the client. RSC never reach the client - the output is a UI description stream.'
          }
        },
        {
          q: {
            pl: 'Co w React 19 zastępuje ręczny composable z ref(loading) i try/catch dla formularza?',
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
            pl: 'useActionState zwraca wynik, akcję i flagę pending, a form action ją podpina. useOptimistic dokłada optymistyczne UI bez ręcznego rollbacku.',
            en: 'useActionState returns the result, the action and a pending flag, and form action wires it up. useOptimistic adds optimistic UI without manual rollback.'
          }
        },
        {
          q: {
            pl: 'Włączasz React Compiler w migrowanym projekcie i część widoków zaczyna pokazywać stare dane. Najbardziej prawdopodobna przyczyna?',
            en: 'You enable React Compiler in a migrated project and some views start showing stale data. Most likely cause?'
          },
          options: [
            { pl: 'Kompilator nie obsługuje TypeScriptu', en: 'The compiler does not support TypeScript' },
            { pl: 'Brakuje React.memo na komponentach nadrzędnych', en: 'Parent components are missing React.memo' },
            { pl: 'Render nie jest czysty - jest mutacja propsów lub zapis do zewnętrznej zmiennej', en: 'Render is not pure - props are mutated or an outer variable is written during render' },
            { pl: 'Klucze list są oparte na id zamiast na indeksie', en: 'List keys use ids instead of indexes' }
          ],
          correct: 2,
          explain: {
            pl: 'Kompilator zakłada czystość renderu. Mutacja w czasie renderu sprawia, że zmemoizowana wartość nie zostaje przeliczona - stąd stare dane.',
            en: 'The compiler assumes render purity. A mutation during render means a memoized value is never recomputed, hence the stale data.'
          }
        }
      ]
    }
  ]
};
