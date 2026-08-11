// Track: React (for Vue devs) - Module 4: State and data.
// Every lesson maps the React approach onto the Vue equivalent the learner already knows.

export default {
  id: 'state-and-data',
  order: 4,
  icon: '🗃️',
  title: {
    pl: 'Stan i dane',
    en: 'State & Data'
  },
  description: {
    pl: 'Gdzie trzymać stan w Reactcie, gdy przychodzisz z Vue: kolokacja i podnoszenie stanu, Zustand obok Pinii, TanStack Query zamiast store na dane z serwera, formularze i URL jako źródło prawdy.',
    en: 'Where state belongs in React when you come from Vue: colocation and lifting, Zustand next to Pinia, TanStack Query instead of a store for server data, forms, and the URL as a source of truth.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'state-colocation-lifting',
      title: {
        pl: 'Kolokacja i podnoszenie stanu',
        en: 'State colocation and lifting'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Kolokacja stanu', en: 'State colocation' },
          def: { pl: 'Zasada trzymania stanu w komponencie, który faktycznie go używa, zamiast wysoko w drzewie. W Reactcie to decyzja wydajnościowa, bo właściciel stanu wyznacza zasięg rerenderu.', en: 'Keeping state inside the component that actually uses it instead of high in the tree. In React this is a performance decision, because the state owner defines the re-render scope.' }
        },
        {
          term: { pl: 'Podnoszenie stanu (lifting state up)', en: 'Lifting state up' },
          def: { pl: 'Przeniesienie stanu do najbliższego wspólnego rodzica, gdy dwa komponenty rodzeństwa potrzebują tej samej wartości. W dół idzie <code>value</code>, w górę <code>onChange</code> - odpowiednik pary props i emit z Vue.', en: 'Moving state into the nearest common parent once two siblings need the same value. <code>value</code> flows down and <code>onChange</code> flows up - the equivalent of the Vue props and emit pair.' }
        },
        {
          term: { pl: 'Zasięg rerenderu', en: 'Re-render scope' },
          def: { pl: 'Poddrzewo, które React wykonuje ponownie po <code>setState</code>: komponent-właściciel i <strong>wszystko pod nim</strong>, niezależnie od tego, kto wartość przeczytał.', en: 'The subtree React re-runs after <code>setState</code>: the owner component and <strong>everything beneath it</strong>, regardless of who actually read the value.' }
        },
        {
          term: { pl: 'Kompozycja przez children', en: 'Composition via children' },
          def: { pl: 'Ciężkie poddrzewo przekazane jako <code>props.children</code> jest tworzone przez rodzica właściciela, więc zachowuje tożsamość elementu i React je pomija przy rerenderze. Darmowa memoizacja, najbliższy odpowiednik slotów.', en: 'A heavy subtree passed as <code>props.children</code> is created by the owner parent, so the element keeps its identity and React skips it on re-render. Free memoization, the closest analogue to slots.' }
        },
        {
          term: { pl: 'Reset przez key', en: 'Reset via key' },
          def: { pl: 'Idiomatyczny sposób na wyczyszczenie stanu komponentu przy zmianie rekordu: zmiana propa <code>key</code> montuje go od nowa. Zastępuje <code>watch</code> kopiujący props do lokalnego stanu.', en: 'The idiomatic way to clear component state when the record changes: changing the <code>key</code> prop remounts it. It replaces the <code>watch</code> that copied props into local state.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--warn)" font-size="14">State too high</text>' +
          '<text x="340" y="26" fill="var(--ok)" font-size="14">State colocated</text>' +
          '<line x1="320" y1="40" x2="320" y2="290" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="60" y="50" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="130" y="79" fill="var(--text)" font-size="14" text-anchor="middle">App + query</text>' +
          '<line x1="130" y1="96" x2="75" y2="140" stroke="var(--muted)" stroke-width="2"/>' +
          '<line x1="130" y1="96" x2="205" y2="140" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="20" y="140" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="75" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
          '<rect x="150" y="140" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="205" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
          '<line x1="205" y1="184" x2="205" y2="230" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="150" y="230" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="205" y="258" fill="var(--muted)" font-size="13" text-anchor="middle">Input</text>' +
          '<rect x="380" y="50" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="450" y="79" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
          '<line x1="450" y1="96" x2="395" y2="140" stroke="var(--muted)" stroke-width="2"/>' +
          '<line x1="450" y1="96" x2="525" y2="140" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="340" y="140" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="395" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
          '<rect x="470" y="140" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="525" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
          '<line x1="525" y1="184" x2="525" y2="230" stroke="var(--muted)" stroke-width="2"/>' +
          '<rect x="470" y="230" width="110" height="44" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="525" y="252" fill="var(--text)" font-size="13" text-anchor="middle">Input</text>' +
          '<text x="525" y="268" fill="var(--ok)" font-size="13" text-anchor="middle">+ query</text>' +
          '<text x="20" y="325" fill="var(--muted)" font-size="13">In React the state owner defines the re-render subtree.</text>' +
          '<text x="20" y="350" fill="var(--muted)" font-size="13">Keep state as low as possible, lift it only when a sibling needs it.</text>' +
          '<text x="20" y="375" fill="var(--muted)" font-size="13">Vue reactivity is fine-grained, so this choice bites harder in React.</text>' +
          '</svg>',
        caption: {
          pl: 'Ten sam ekran z dwoma miejscami na stan: gdy trzymasz go w App, przy każdym znaku rerenderuje się całe poddrzewo; gdy siedzi w Input, tylko Input.',
          en: 'One screen, two homes for state: keep it in App and every keystroke re-renders the whole subtree; keep it in Input and only Input re-renders.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Życie jednego kawałka stanu: od lokalnego pola, przez wymuszone podniesienie, po naprawę zasięgu rerenderów.',
          en: 'The life of one piece of state: local field, forced lift, then fixing the re-render scope.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">1. State lives where it is used</text>' +
              '<rect x="250" y="60" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="89" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
              '<line x1="320" y1="106" x2="165" y2="170" stroke="var(--muted)" stroke-width="2"/>' +
              '<line x1="320" y1="106" x2="475" y2="170" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="90" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="165" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
              '<rect x="400" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="475" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
              '<line x1="165" y1="216" x2="165" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<line x1="475" y1="216" x2="475" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="90" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="165" y="309" fill="var(--muted)" font-size="13" text-anchor="middle">Badge</text>' +
              '<rect x="400" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Input</text>' +
              '<rect x="430" y="340" width="90" height="30" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="360" fill="var(--ok)" font-size="13" text-anchor="middle">query</text>' +
              '</svg>',
            label: { pl: 'Stan lokalny', en: 'Local state' },
            note: {
              pl: 'useState siedzi w Input. Rerenderuje się tylko Input, reszta drzewa nawet nie wie, że coś piszesz.',
              en: 'useState sits in Input. Only Input re-renders; the rest of the tree does not even know you are typing.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--warn)" font-size="14">2. A sibling needs the same value</text>' +
              '<rect x="250" y="60" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="89" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
              '<line x1="320" y1="106" x2="165" y2="170" stroke="var(--muted)" stroke-width="2"/>' +
              '<line x1="320" y1="106" x2="475" y2="170" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="90" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="165" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
              '<rect x="400" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="475" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
              '<line x1="165" y1="216" x2="165" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<line x1="475" y1="216" x2="475" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="90" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="165" y="309" fill="var(--err)" font-size="13" text-anchor="middle">Badge needs query</text>' +
              '<rect x="400" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Input</text>' +
              '<line x1="400" y1="303" x2="240" y2="303" stroke="var(--err)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="320" y="360" fill="var(--err)" font-size="13" text-anchor="middle">no path between siblings</text>' +
              '</svg>',
            label: { pl: 'Rodzeństwo potrzebuje danych', en: 'A sibling needs the data' },
            note: {
              pl: 'Dane w Reactcie płyną tylko w dół. Między rodzeństwem nie ma połączenia, więc ten przerywany strzałek nie da się zbudować.',
              en: 'Data in React flows down only. There is no sibling channel, so that dashed arrow cannot exist.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--accent)" font-size="14">3. Lift to the nearest common parent</text>' +
              '<rect x="250" y="60" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="89" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
              '<rect x="275" y="10" width="90" height="30" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="30" fill="var(--accent)" font-size="13" text-anchor="middle">query</text>' +
              '<line x1="320" y1="106" x2="165" y2="170" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="320" y1="106" x2="475" y2="170" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="90" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="165" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
              '<rect x="400" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="475" y="199" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
              '<line x1="165" y1="216" x2="165" y2="280" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="475" y1="216" x2="475" y2="280" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="90" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="165" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Badge (prop)</text>' +
              '<rect x="400" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Input (prop)</text>' +
              '<text x="320" y="370" fill="var(--muted)" font-size="13" text-anchor="middle">value down, onChange up</text>' +
              '</svg>',
            label: { pl: 'Podnieś stan', en: 'Lift the state' },
            note: {
              pl: 'Stan ląduje w najbliższym wspólnym rodzicu. W dół idzie wartość, w górę callback - to odpowiednik pary props i emit z Vue.',
              en: 'State moves to the nearest common parent. Value flows down, a callback flows up - the equivalent of the Vue props and emit pair.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--warn)" font-size="14">4. The cost: the whole subtree re-renders</text>' +
              '<rect x="250" y="60" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="89" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
              '<rect x="275" y="10" width="90" height="30" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="30" fill="var(--warn)" font-size="13" text-anchor="middle">query</text>' +
              '<line x1="320" y1="106" x2="165" y2="170" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="320" y1="106" x2="475" y2="170" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="90" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="165" y="199" fill="var(--warn)" font-size="13" text-anchor="middle">Sidebar re-renders</text>' +
              '<rect x="400" y="170" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="475" y="199" fill="var(--warn)" font-size="13" text-anchor="middle">Panel re-renders</text>' +
              '<line x1="165" y1="216" x2="165" y2="280" stroke="var(--warn)" stroke-width="2"/>' +
              '<line x1="475" y1="216" x2="475" y2="280" stroke="var(--warn)" stroke-width="2"/>' +
              '<rect x="90" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="165" y="309" fill="var(--warn)" font-size="13" text-anchor="middle">Badge</text>' +
              '<rect x="400" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="475" y="309" fill="var(--warn)" font-size="13" text-anchor="middle">Input</text>' +
              '<text x="320" y="370" fill="var(--muted)" font-size="13" text-anchor="middle">every keystroke walks the whole tree</text>' +
              '</svg>',
            label: { pl: 'Koszt podniesienia', en: 'The cost of lifting' },
            note: {
              pl: 'W Vue ref w rodzicu nie budzi dzieci, które go nie czytają. W Reactcie każdy znak przelatuje przez całe poddrzewo App.',
              en: 'In Vue a parent ref never wakes children that do not read it. In React every keystroke walks the entire App subtree.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--ok)" font-size="14">5. Shrink the owner instead of globalising</text>' +
              '<rect x="250" y="60" width="140" height="46" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="89" fill="var(--text)" font-size="14" text-anchor="middle">App</text>' +
              '<line x1="320" y1="106" x2="320" y2="132" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="230" y="132" width="180" height="30" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="152" fill="var(--ok)" font-size="13" text-anchor="middle">SearchProvider + query</text>' +
              '<line x1="280" y1="162" x2="165" y2="190" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="360" y1="162" x2="475" y2="190" stroke="var(--ok)" stroke-width="2"/>' +
              '<rect x="90" y="190" width="150" height="40" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="165" y="215" fill="var(--muted)" font-size="13" text-anchor="middle">Sidebar</text>' +
              '<rect x="400" y="190" width="150" height="40" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="475" y="215" fill="var(--muted)" font-size="13" text-anchor="middle">Panel</text>' +
              '<line x1="165" y1="230" x2="165" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<line x1="475" y1="230" x2="475" y2="280" stroke="var(--muted)" stroke-width="2"/>' +
              '<rect x="90" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="165" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Badge</text>' +
              '<rect x="400" y="280" width="150" height="46" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="475" y="309" fill="var(--text)" font-size="13" text-anchor="middle">Input</text>' +
              '<text x="320" y="370" fill="var(--muted)" font-size="13" text-anchor="middle">smallest owner + children as props</text>' +
              '</svg>',
            label: { pl: 'Zawęź właściciela', en: 'Shrink the owner' },
            note: {
              pl: 'Zamiast wrzucać query do globalnego store, wstawiasz mały komponent-właściciela nad dwoma zainteresowanymi. Zasięg rerenderu wraca do rozmiaru problemu.',
              en: 'Instead of pushing query into a global store, insert a small owner component above just the two consumers. The re-render scope shrinks back to the size of the problem.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie pilota do telewizora. Trzymasz go w salonie, bo tam oglądasz. Nikt nie wpada na pomysł, żeby wynieść go na strych i za każdym razem biegać po schodach.</p><p>Ale załóżmy, że dwa pokoje mają jeden telewizor na ścianie działowej. Wtedy pilot musi leżeć w przedpokoju, do którego oba pokoje mają dostęp. Nie na strychu. W przedpokoju. Czyli w najbliższym miejscu wspólnym dla obu pokoi.</p><p>Stan w aplikacji działa tak samo. Trzymasz go najbliżej miejsca, gdzie jest używany. Gdy nagle dwa różne kawałki ekranu potrzebują tej samej wartości, przenosisz ją o piętro wyżej - do wspólnego rodzica - i podajesz w dół.</p><p>Dlaczego nie wrzucić wszystkiego od razu na strych? Bo w Reactcie każde ruszenie pilotem budzi cały dom poniżej tego miejsca. Im wyżej leży pilot, tym więcej pokoi się przebudza przy każdym kliknięciu.</p>',
          en: '<p>Picture the TV remote. You keep it in the living room, because that is where you watch. Nobody decides to store it in the attic and run up the stairs every time.</p><p>Now suppose two rooms share one TV mounted in the wall between them. The remote has to live in the hallway both rooms can reach. Not the attic. The hallway - the nearest place common to both rooms.</p><p>State in an app works the same way. You keep it as close as possible to where it is used. The moment two different parts of the screen need the same value, you move it one floor up, into the shared parent, and hand it down.</p><p>Why not put everything in the attic right away? Because in React, touching the remote wakes up the entire house below that spot. The higher the remote sits, the more rooms wake up on every single click.</p>'
        },
        school: {
          pl: '<p>W Vue rzadko zastanawiasz się, gdzie fizycznie leży <code>ref</code>. Reaktywność jest drobnoziarnista: efekt renderujący komponent subskrybuje tylko te wartości, które faktycznie przeczytał. Możesz trzymać <code>ref</code> wysoko, wstrzyknąć go przez <code>provide/inject</code> albo wyciągnąć z Pinii - komponenty, które go nie czytają, nie ruszą się z miejsca.</p><p>W Reactcie miejsce stanu to decyzja o wydajności. <code>useState</code> nie jest subskrypcją wartości, tylko wskazówką dla Reacta: <em>ten</em> komponent wykona się od nowa, a wraz z nim całe jego poddrzewo. Właściciel stanu wyznacza zasięg rerenderu.</p><p>Stąd dwie reguły, które w Reactcie są dosłownie doktryną:</p><ul><li><strong>Kolokacja</strong> - stan zaczyna życie w komponencie, który go używa.</li><li><strong>Podnoszenie stanu (lifting)</strong> - dopiero gdy drugi komponent potrzebuje tej samej wartości, przenosisz ją do najbliższego wspólnego rodzica.</li></ul><p>Tak wygląda ta sama para w obu światach:</p><pre><code>// Vue - dziecko ma swoje, rodzic nie musi wiedziec\nconst query = ref("")\n\n// ...a gdy trzeba dzielic, po prostu:\n// const store = useSearchStore()</code></pre><pre><code>// React - podnosisz do wspolnego rodzica\nconst [query, setQuery] = useState("")\n\nreturn (\n  &lt;&gt;\n    &lt;Input value={query} onChange={setQuery} /&gt;\n    &lt;Badge count={query.length} /&gt;\n  &lt;/&gt;\n)</code></pre><p>W Vue zrobiłeś X: sięgnąłeś po store albo provide/inject, bo to nic nie kosztuje. W Reactcie robisz Y: podnosisz stan o dokładnie jedno piętro, bo Z - każde piętro w górę powiększa poddrzewo, które przelicza się przy każdej zmianie.</p>',
          en: '<p>In Vue you rarely think about where a <code>ref</code> physically lives. Reactivity is fine-grained: a component render effect subscribes only to the values it actually read. You can keep a <code>ref</code> high up, inject it with <code>provide/inject</code>, or pull it from Pinia - components that never read it simply do not move.</p><p>In React the location of state is a performance decision. <code>useState</code> is not a subscription to a value, it is a note to React: <em>this</em> component will run again, and its whole subtree with it. The owner of the state defines the re-render scope.</p><p>Hence two rules that in React are close to doctrine:</p><ul><li><strong>Colocation</strong> - state starts life inside the component that uses it.</li><li><strong>Lifting state up</strong> - only once a second component needs the same value do you move it into the nearest common parent.</li></ul><p>The same pair in both worlds:</p><pre><code>// Vue - the child owns it, the parent need not know\nconst query = ref("")\n\n// ...and when it must be shared, you simply:\n// const store = useSearchStore()</code></pre><pre><code>// React - lift into the common parent\nconst [query, setQuery] = useState("")\n\nreturn (\n  &lt;&gt;\n    &lt;Input value={query} onChange={setQuery} /&gt;\n    &lt;Badge count={query.length} /&gt;\n  &lt;/&gt;\n)</code></pre><p>In Vue you did X: reached for a store or provide/inject, because it costs nothing. In React you do Y: lift the state exactly one floor, because Z - every extra floor upward enlarges the subtree that recomputes on each change.</p>'
        },
        pro: {
          pl: '<p>Praktyczna hierarchia decyzji, w tej kolejności: stan lokalny → podniesiony do najbliższego wspólnego rodzica → URL → cache serwerowy (TanStack Query) → store globalny. Store globalny jest ostatnią, nie pierwszą opcją, dokładnie odwrotnie niż nawyk wyniesiony z Pinii.</p><p><strong>Vue robiło X, React robi Y.</strong> W Vue <code>ref</code> podniesiony wysoko jest darmowy, bo tracking działa na poziomie odczytu właściwości. W Reactcie podniesienie stanu o trzy poziomy zamienia jedno wywołanie funkcji w setki. Powód (Z): React nie wie, kto co przeczytał - rerenderuje po prostu poddrzewo właściciela.</p><p>Trzy techniki, które ratują sytuację, gdy stan musi jednak siedzieć wysoko:</p><ul><li><strong>Kompozycja przez children.</strong> Element przekazany jako <code>props.children</code> jest tworzony przez rodzica właściciela, więc jego referencja nie zmienia się przy rerenderze właściciela i React pomija to poddrzewo. To najbliższy odpowiednik slotów - i tak jak slot w Vue nie przelicza się, gdy zmienia się stan gospodarza.</li><li><strong>Wydzielenie właściciela.</strong> Zamiast trzymać <code>query</code> w <code>App</code>, robisz mały <code>SearchProvider</code> otaczający tylko dwóch konsumentów.</li><li><strong>Subskrypcja zewnętrzna.</strong> <code>useSyncExternalStore</code> (albo Zustand pod spodem) pozwala komponentowi przeczytać wycinek stanu bez rerenderowania rodziców - to najbliższe temu, co Vue daje z pudełka.</li></ul><pre><code>// Zamiast: rodzic z ciezkim poddrzewem\nfunction App() {\n  const [query, setQuery] = useState("");\n  return (\n    &lt;Layout&gt;\n      &lt;SearchBox value={query} onChange={setQuery} /&gt;\n      &lt;ExpensiveTable /&gt;   {/* przeliczane przy kazdym znaku */}\n    &lt;/Layout&gt;\n  );\n}\n\n// Po wydzieleniu wlasciciela: ExpensiveTable jest children,\n// wiec jego element nie zmienia tozsamosci i React go pomija.\nfunction App() {\n  return (\n    &lt;SearchProvider&gt;\n      &lt;ExpensiveTable /&gt;\n    &lt;/SearchProvider&gt;\n  );\n}</code></pre><p>Antywzorce, które widać na code review u ludzi po Vue:</p><ul><li><strong>Synchronizacja propsa do stanu przez useEffect.</strong> W Vue pisałeś <code>watch(() =&gt; props.value, v =&gt; local.value = v)</code> i to było normalne. W Reactcie to podwójny render i klasa błędów z rozjazdem. Albo wyprowadzasz wartość w trakcie renderu, albo resetujesz komponent przez <code>key</code>.</li><li><strong>Stan pochodny w useState.</strong> <code>fullName</code> liczysz w renderze, nie trzymasz w stanie. Odpowiednik <code>computed</code> to zwykłe wyrażenie, a <code>useMemo</code> dokładasz tylko przy realnym koszcie.</li><li><strong>Store globalny na dane jednego ekranu.</strong> Zombie state po odmontowaniu, wycieki między routami, brak resetu.</li></ul><p>Kompilator Reacta 19 zdejmuje z ciebie ręczne <code>memo</code> i <code>useCallback</code>, ale nie przenosi stanu za ciebie. Zła architektura stanu zostaje złą architekturą stanu, tyle że z mniejszym narzutem alokacji.</p>',
          en: '<p>The practical decision ladder, in order: local state → lifted to the nearest common parent → the URL → the server cache (TanStack Query) → a global store. The global store is the last option, not the first - exactly the reverse of the reflex you bring from Pinia.</p><p><strong>Vue did X, React does Y.</strong> In Vue a high-up <code>ref</code> is free, because tracking happens at property-read level. In React, lifting state three levels turns one function call into hundreds. The reason (Z): React does not know who read what, so it simply re-renders the owner subtree.</p><p>Three techniques that save you when state genuinely has to sit high:</p><ul><li><strong>Composition via children.</strong> An element passed as <code>props.children</code> is created by the owner parent, so its identity does not change when the owner re-renders and React skips that subtree. It is the closest analogue to slots - and just like a Vue slot, it does not recompute when the host state changes.</li><li><strong>Extract the owner.</strong> Instead of holding <code>query</code> in <code>App</code>, build a small <code>SearchProvider</code> that wraps only the two consumers.</li><li><strong>External subscription.</strong> <code>useSyncExternalStore</code> (or Zustand on top of it) lets a component read a slice without re-rendering its parents - the closest thing to what Vue gives you out of the box.</li></ul><pre><code>// Before: owner with a heavy subtree\nfunction App() {\n  const [query, setQuery] = useState("");\n  return (\n    &lt;Layout&gt;\n      &lt;SearchBox value={query} onChange={setQuery} /&gt;\n      &lt;ExpensiveTable /&gt;   {/* recomputed on every keystroke */}\n    &lt;/Layout&gt;\n  );\n}\n\n// After extracting the owner: ExpensiveTable is children,\n// so its element keeps identity and React skips it.\nfunction App() {\n  return (\n    &lt;SearchProvider&gt;\n      &lt;ExpensiveTable /&gt;\n    &lt;/SearchProvider&gt;\n  );\n}</code></pre><p>Anti-patterns you see in code review from Vue people:</p><ul><li><strong>Syncing a prop into state with useEffect.</strong> In Vue you wrote <code>watch(() =&gt; props.value, v =&gt; local.value = v)</code> and it was fine. In React that is a double render plus a whole class of desync bugs. Either derive during render, or reset the component with <code>key</code>.</li><li><strong>Derived state in useState.</strong> Compute <code>fullName</code> during render instead of storing it. The <code>computed</code> equivalent is a plain expression; add <code>useMemo</code> only when the cost is real.</li><li><strong>A global store for one screen.</strong> Zombie state after unmount, leaks across routes, no reset path.</li></ul><p>The React 19 compiler removes the manual <code>memo</code> and <code>useCallback</code> chores, but it does not move your state for you. Bad state architecture stays bad state architecture, only with less allocation overhead.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w Reactcie wyznacza zasięg rerenderu przy zmianie stanu?',
            en: 'What defines the re-render scope in React when state changes?'
          },
          options: [
            { pl: 'Komponenty, które faktycznie odczytały daną wartość', en: 'The components that actually read the value' },
            { pl: 'Komponent będący właścicielem stanu i całe jego poddrzewo', en: 'The component that owns the state and its entire subtree' },
            { pl: 'Tylko komponenty owinięte w memo', en: 'Only components wrapped in memo' },
            { pl: 'Cała aplikacja od korzenia', en: 'The whole app from the root' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie śledzi odczytów jak Vue - rerenderuje właściciela i wszystko pod nim. Dlatego miejsce stanu jest decyzją wydajnościową, a nie tylko porządkową.',
            en: 'React does not track reads the way Vue does - it re-renders the owner and everything beneath it. That is why state placement is a performance decision, not just tidiness.'
          }
        },
        {
          q: {
            pl: 'Dwa komponenty rodzeństwa potrzebują tej samej wartości. Jaki jest domyślny ruch w Reactcie?',
            en: 'Two sibling components need the same value. What is the default move in React?'
          },
          options: [
            { pl: 'Dodać globalny store', en: 'Add a global store' },
            { pl: 'Zsynchronizować dwa useState przez useEffect', en: 'Sync two useState hooks with useEffect' },
            { pl: 'Podnieść stan do najbliższego wspólnego rodzica', en: 'Lift the state into the nearest common parent' },
            { pl: 'Użyć useRef, żeby uniknąć rerenderu', en: 'Use useRef to avoid the re-render' }
          ],
          correct: 2,
          explain: {
            pl: 'Najbliższy wspólny rodzic daje jedno źródło prawdy bez globalnego stanu. Synchronizacja dwóch kopii przez efekt to klasyczne źródło rozjazdów.',
            en: 'The nearest common parent gives one source of truth without going global. Syncing two copies through an effect is a classic desync bug factory.'
          }
        },
        {
          q: {
            pl: 'Dlaczego przekazanie ciężkiego komponentu jako children ratuje wydajność, gdy stan siedzi w rodzicu?',
            en: 'Why does passing a heavy component as children rescue performance when state lives in the parent?'
          },
          options: [
            { pl: 'Bo element children tworzy komponent wyżej, więc jego referencja się nie zmienia i React pomija to poddrzewo', en: 'Because the children element is created higher up, its identity does not change and React skips that subtree' },
            { pl: 'Bo children są renderowane leniwie dopiero po pierwszym wyświetleniu', en: 'Because children are rendered lazily after the first paint' },
            { pl: 'Bo React automatycznie owija children w memo', en: 'Because React wraps children in memo automatically' },
            { pl: 'Bo children trafiają do osobnego korzenia renderowania', en: 'Because children go into a separate render root' }
          ],
          correct: 0,
          explain: {
            pl: 'To kwestia tożsamości elementu: skoro rodzic właściciela go nie przetworzył od nowa, React widzi ten sam obiekt i nie schodzi głębiej. To najbliższy odpowiednik zachowania slotów z Vue.',
            en: 'It is about element identity: the owner parent did not recreate it, React sees the same object and stops descending. This is the closest analogue to how Vue slots behave.'
          }
        },
        {
          q: {
            pl: 'Przenosisz komponent z Vue, gdzie miałeś watch kopiujący props do lokalnego ref przy zmianie wybranego rekordu. Co jest właściwym odpowiednikiem w Reactcie?',
            en: 'You are porting a Vue component that had a watch copying props into a local ref whenever the selected record changed. What is the right React equivalent?'
          },
          options: [
            { pl: 'useEffect ustawiający setState przy zmianie propsa', en: 'A useEffect that calls setState when the prop changes' },
            { pl: 'useMemo zwracający nowy obiekt stanu', en: 'A useMemo returning a fresh state object' },
            { pl: 'Zapis wartości w useRef i ręczny forceUpdate', en: 'Storing the value in useRef plus a manual forceUpdate' },
            { pl: 'Nadanie komponentowi prop key z id rekordu, żeby zresetował stan', en: 'Giving the component a key prop with the record id so its state resets' }
          ],
          correct: 3,
          explain: {
            pl: 'Zmiana key montuje komponent od nowa razem z czystym stanem - to idiomatyczny reset w Reactcie. Wariant z useEffect działa, ale kosztuje dodatkowy render i pokazuje przez chwilę stare dane.',
            en: 'Changing the key remounts the component with fresh state - the idiomatic React reset. The useEffect variant works but costs an extra render and briefly shows stale data.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'zustand-vs-pinia',
      title: {
        pl: 'Zustand kontra Pinia',
        en: 'Zustand vs Pinia'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Selektor (selector)', en: 'Selector' },
          def: { pl: 'Funkcja <code>s =&gt; s.pole</code> przekazana do hooka Zustanda, która deklaruje subskrybowany wycinek store. Bez selektora subskrybujesz cały obiekt stanu i rerenderujesz się przy każdej zmianie.', en: 'The <code>s =&gt; s.field</code> function passed to a Zustand hook that declares which slice you subscribe to. Without a selector you subscribe to the whole state object and re-render on every change.' }
        },
        {
          term: { pl: 'Porównanie przez Object.is', en: 'Object.is comparison' },
          def: { pl: 'Zustand po każdej aktualizacji uruchamia selektor i porównuje wynik przez <code>Object.is</code>. Dlatego mutacja stanu nie zadziała, a <code>set</code> musi zwracać nowe referencje.', en: 'After every update Zustand runs your selector and compares the result with <code>Object.is</code>. That is why mutating state does nothing and <code>set</code> must return new references.' }
        },
        {
          term: { pl: 'useShallow', en: 'useShallow' },
          def: { pl: 'Komparator pozwalający pobrać kilka pól jednym selektorem bez pętli rerenderów. Bez niego selektor zwracający nowy obiekt daje za każdym razem nową referencję.', en: 'A comparator that lets one selector return several fields without a re-render loop. Without it, a selector returning a fresh object produces a new reference every time.' }
        },
        {
          term: { pl: 'Middleware', en: 'Middleware' },
          def: { pl: 'Warstwy owijające store: <code>persist</code> (odpowiednik pinia-plugin-persistedstate), <code>immer</code> (składnia z mutacją), <code>devtools</code>, <code>subscribeWithSelector</code>.', en: 'Layers wrapping the store: <code>persist</code> (the pinia-plugin-persistedstate equivalent), <code>immer</code> (mutation-style syntax), <code>devtools</code>, <code>subscribeWithSelector</code>.' }
        },
        {
          term: { pl: 'Store per request (SSR)', en: 'Per-request store (SSR)' },
          def: { pl: 'Zustand nie ma rejestru store, więc na serwerze instancję trzeba tworzyć w kontekście na każde żądanie. Moduł-singleton oznacza współdzielenie pamięci między użytkownikami.', en: 'Zustand has no store registry, so on the server you must create the instance inside a context per request. A module singleton means sharing memory between users.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r4m2arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Pinia: store is reactive, reads are tracked</text>' +
          '<rect x="20" y="45" width="170" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="105" y="72" fill="var(--text)" font-size="14" text-anchor="middle">Pinia store</text>' +
          '<text x="105" y="93" fill="var(--muted)" font-size="13" text-anchor="middle">proxy state</text>' +
          '<line x1="190" y1="80" x2="270" y2="80" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m2arrow)"/>' +
          '<rect x="275" y="45" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="355" y="72" fill="var(--text)" font-size="13" text-anchor="middle">store.cart.length</text>' +
          '<text x="355" y="93" fill="var(--muted)" font-size="13" text-anchor="middle">read = subscribe</text>' +
          '<line x1="435" y1="80" x2="500" y2="80" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m2arrow)"/>' +
          '<rect x="505" y="45" width="115" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="562" y="86" fill="var(--ok)" font-size="13" text-anchor="middle">exact update</text>' +
          '<line x1="20" y1="150" x2="620" y2="150" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="185" fill="var(--muted)" font-size="14">Zustand: you subscribe with a selector</text>' +
          '<rect x="20" y="205" width="170" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="105" y="232" fill="var(--text)" font-size="14" text-anchor="middle">Zustand store</text>' +
          '<text x="105" y="253" fill="var(--muted)" font-size="13" text-anchor="middle">plain object</text>' +
          '<line x1="190" y1="240" x2="270" y2="240" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m2arrow)"/>' +
          '<rect x="275" y="205" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="355" y="232" fill="var(--text)" font-size="13" text-anchor="middle">useCart(s =&gt; s.count)</text>' +
          '<text x="355" y="253" fill="var(--muted)" font-size="13" text-anchor="middle">selector + Object.is</text>' +
          '<line x1="435" y1="240" x2="500" y2="240" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m2arrow)"/>' +
          '<rect x="505" y="205" width="115" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="562" y="246" fill="var(--ok)" font-size="13" text-anchor="middle">re-render</text>' +
          '<text x="20" y="320" fill="var(--warn)" font-size="13">No selector = subscribe to the whole store = re-render on every change.</text>' +
          '<text x="20" y="348" fill="var(--muted)" font-size="13">Pinia tracks reads for you. Zustand makes the subscription explicit.</text>' +
          '<text x="20" y="376" fill="var(--muted)" font-size="13">Same idea, opposite defaults.</text>' +
          '</svg>',
        caption: {
          pl: 'Pinia śledzi odczyty automatycznie, w Zustandzie subskrypcję deklarujesz sam selektorem - brak selektora oznacza subskrypcję całego store.',
          en: 'Pinia tracks reads for you; in Zustand you declare the subscription with a selector - no selector means subscribing to the entire store.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie tablicę ogłoszeń w biurze. Wisi na niej wszystko: kto ma dyżur, jaka jest kawa w kuchni, kiedy jest impreza.</p><p>W jednym biurze (Pinia) jest miły recepcjonista. Zauważa, kto na co patrzy, i dzwoni tylko do tych osób, których ogłoszenie się zmieniło. Nic nie musisz mówić - on po prostu widzi twoje spojrzenie.</p><p>W drugim biurze (Zustand) nie ma recepcjonisty, tylko formularz przy wejściu: <em>napisz, o czym chcesz wiedzieć</em>. Wpisujesz "tylko kawa" i dostajesz maila wyłącznie o kawie. Jak nic nie wpiszesz, dostajesz maila o każdej zmianie na całej tablicy i po tygodniu masz dość.</p><p>Oba biura mają tę samą tablicę i te same ogłoszenia. Różnica jest w tym, kto pilnuje, na co patrzysz: w jednym system, w drugim ty. To dokładnie ta sama różnica, którą zobaczysz między Pinią a Zustandem.</p>',
          en: '<p>Picture the notice board in an office. Everything is pinned to it: who is on duty, what coffee is in the kitchen, when the party is.</p><p>In one office (Pinia) there is a friendly receptionist. He notices what you look at and calls only the people whose notice actually changed. You never tell him anything - he just watches your eyes.</p><p>In the other office (Zustand) there is no receptionist, only a form by the door: <em>write down what you care about</em>. You write "coffee only" and get emails about coffee only. Write nothing, and you get an email for every change on the whole board until you give up.</p><p>Both offices have the same board and the same notices. The difference is who keeps track of what you look at: the system in one case, you in the other. That is exactly the difference between Pinia and Zustand.</p>'
        },
        school: {
          pl: '<p>Pinia i Zustand rozwiązują ten sam problem: stan współdzielony poza drzewem komponentów. Różnią się mechanizmem powiadamiania.</p><p>W Pinii store jest reaktywnym obiektem. Wywołujesz <code>useCartStore()</code>, czytasz <code>store.items</code> i Vue zapamiętuje ten odczyt. Zmiana <code>items</code> odświeża tylko te komponenty, które je czytały. Nie deklarujesz niczego.</p><pre><code>// Vue + Pinia\nexport const useCart = defineStore("cart", () =&gt; {\n  const items = ref([])\n  const count = computed(() =&gt; items.value.length)\n  function add(p) { items.value.push(p) }\n  return { items, count, add }\n})\n\n// w komponencie\nconst cart = useCart()   // cart.count dziala od reki</code></pre><p>W Zustandzie store to zwykły obiekt trzymany poza Reactem, a hook jest subskrypcją. Selektor mówi, którego wycinka pilnować. Po każdej aktualizacji Zustand uruchamia twój selektor i porównuje wynik przez <code>Object.is</code>. Różny wynik oznacza rerender.</p><pre><code>// React + Zustand\nexport const useCart = create((set) =&gt; ({\n  items: [],\n  add: (p) =&gt; set((s) =&gt; ({ items: [...s.items, p] })),\n}))\n\n// w komponencie - selektor jest obowiazkowy w praktyce\nconst count = useCart((s) =&gt; s.items.length)\nconst add = useCart((s) =&gt; s.add)</code></pre><p>W Vue robiłeś X - brałeś cały store i czytałeś z niego, co chcesz. W Reactcie robisz Y - pobierasz osobno każdy potrzebny wycinek, bo Z: bez selektora subskrybujesz cały obiekt stanu i komponent rerenderuje się przy każdej zmianie czegokolwiek w store.</p><p>Druga pułapka: selektor zwracający nowy obiekt (<code>s =&gt; ({ a: s.a, b: s.b })</code>) za każdym razem daje nową referencję, więc <code>Object.is</code> zawsze widzi zmianę. Albo bierzesz dwa osobne selektory, albo dokładasz komparator (<code>useShallow</code>).</p>',
          en: '<p>Pinia and Zustand solve the same problem: shared state outside the component tree. They differ in how they notify.</p><p>In Pinia the store is a reactive object. You call <code>useCartStore()</code>, read <code>store.items</code>, and Vue records that read. Changing <code>items</code> refreshes only the components that read it. You declare nothing.</p><pre><code>// Vue + Pinia\nexport const useCart = defineStore("cart", () =&gt; {\n  const items = ref([])\n  const count = computed(() =&gt; items.value.length)\n  function add(p) { items.value.push(p) }\n  return { items, count, add }\n})\n\n// in a component\nconst cart = useCart()   // cart.count just works</code></pre><p>In Zustand the store is a plain object living outside React, and the hook is a subscription. The selector says which slice to watch. After each update Zustand runs your selector and compares the result with <code>Object.is</code>. A different result means a re-render.</p><pre><code>// React + Zustand\nexport const useCart = create((set) =&gt; ({\n  items: [],\n  add: (p) =&gt; set((s) =&gt; ({ items: [...s.items, p] })),\n}))\n\n// in a component - a selector is mandatory in practice\nconst count = useCart((s) =&gt; s.items.length)\nconst add = useCart((s) =&gt; s.add)</code></pre><p>In Vue you did X - grabbed the whole store and read whatever you needed. In React you do Y - pull each slice separately, because Z: without a selector you subscribe to the entire state object and re-render on any change anywhere in the store.</p><p>Second trap: a selector returning a new object (<code>s =&gt; ({ a: s.a, b: s.b })</code>) produces a fresh reference every time, so <code>Object.is</code> always sees a change. Either use two separate selectors, or add a comparator (<code>useShallow</code>).</p>'
        },
        pro: {
          pl: '<p>Mapa pojęć jeden do jednego:</p><table><tr><th>Pinia</th><th>Zustand</th></tr><tr><td><code>defineStore</code></td><td><code>create</code></td></tr><tr><td><code>state</code> / <code>ref</code></td><td>pola w obiekcie zwróconym z <code>create</code></td></tr><tr><td><code>getters</code> / <code>computed</code></td><td>selektor albo pochodna liczona w komponencie</td></tr><tr><td><code>actions</code></td><td>funkcje wołające <code>set</code> (mogą być async)</td></tr><tr><td><code>$patch</code></td><td><code>set(partial)</code> - płytki merge domyślnie</td></tr><tr><td><code>$subscribe</code></td><td><code>store.subscribe</code> / <code>subscribeWithSelector</code></td></tr><tr><td><code>$reset</code></td><td>ręcznie: <code>set(initialState, true)</code></td></tr><tr><td>plugin persistedstate</td><td>middleware <code>persist</code></td></tr></table><p><strong>Mutowalność.</strong> W Pinii piszesz <code>items.value.push(p)</code>. W Zustandzie nie wolno mutować - <code>set</code> musi dostać nowe referencje, bo porównanie jest po tożsamości. Jeśli tęsknisz za mutacją, dokładasz middleware <code>immer</code> i wracasz do składni z <code>push</code>, płacąc kilka kilobajtów bundle.</p><pre><code>import { create } from "zustand";\nimport { persist, subscribeWithSelector } from "zustand/middleware";\nimport { immer } from "zustand/middleware/immer";\nimport { useShallow } from "zustand/react/shallow";\n\ntype CartState = {\n  items: Item[];\n  add: (i: Item) =&gt; void;\n};\n\nexport const useCart = create&lt;CartState&gt;()(\n  persist(\n    subscribeWithSelector(\n      immer((set) =&gt; ({\n        items: [],\n        add: (i) =&gt; set((s) =&gt; { s.items.push(i); }),\n      }))\n    ),\n    { name: "cart" }\n  )\n);\n\n// poza Reactem - odpowiednik uzycia store w serwisie\nuseCart.getState().add(item);\n\n// wiele pol jednym selektorem\nconst { items, add } = useCart(useShallow((s) =&gt; ({ items: s.items, add: s.add })));</code></pre><p><strong>Czego w Zustandzie nie ma, a miałeś w Pinii.</strong> Nie ma devtools z osi czasu bez middleware <code>devtools</code>. Nie ma automatycznego <code>$reset</code>. Nie ma odpowiednika <code>storeToRefs</code>, bo problem nie istnieje - nie ma reaktywnych referencji do rozpakowania. Nie ma też rejestru store, więc SSR wymaga instancji per request: w Next.js tworzysz store w kontekście, inaczej dwa requesty współdzielą pamięć na serwerze. W Nuxt Pinia załatwiała to za ciebie.</p><p><strong>Kiedy w ogóle sięgać po store.</strong> Znaczna część tego, co w projektach Vue ląduje w Pinii, to dane z serwera - te w Reactcie idą do TanStack Query, nie do Zustanda. Store zostaw na stan klienta, którego URL nie utrzyma: otwarty panel, tryb edycji, kolejka toastów, koszyk offline. Realistyczny podział to jeden store globalny plus 2-3 store domenowe, nie po jednym na widok.</p><p><strong>Alternatywy.</strong> Redux Toolkit, gdy zespół chce jawnego audytu akcji i devtools z podróżą w czasie. Jotai, gdy myślisz atomami - najbliższe modelowi <code>ref</code> z Vue. Context sam w sobie nie jest menedżerem stanu: nie ma selektorów, więc każda zmiana wartości rerenderuje wszystkich konsumentów.</p>',
          en: '<p>A one-to-one concept map:</p><table><tr><th>Pinia</th><th>Zustand</th></tr><tr><td><code>defineStore</code></td><td><code>create</code></td></tr><tr><td><code>state</code> / <code>ref</code></td><td>fields on the object returned from <code>create</code></td></tr><tr><td><code>getters</code> / <code>computed</code></td><td>a selector, or derivation in the component</td></tr><tr><td><code>actions</code></td><td>functions calling <code>set</code> (async is fine)</td></tr><tr><td><code>$patch</code></td><td><code>set(partial)</code> - shallow merge by default</td></tr><tr><td><code>$subscribe</code></td><td><code>store.subscribe</code> / <code>subscribeWithSelector</code></td></tr><tr><td><code>$reset</code></td><td>manual: <code>set(initialState, true)</code></td></tr><tr><td>persistedstate plugin</td><td><code>persist</code> middleware</td></tr></table><p><strong>Mutability.</strong> In Pinia you write <code>items.value.push(p)</code>. In Zustand mutation is forbidden - <code>set</code> must receive new references, because comparison is by identity. If you miss mutation, add the <code>immer</code> middleware and get <code>push</code> syntax back for a few kilobytes of bundle.</p><pre><code>import { create } from "zustand";\nimport { persist, subscribeWithSelector } from "zustand/middleware";\nimport { immer } from "zustand/middleware/immer";\nimport { useShallow } from "zustand/react/shallow";\n\ntype CartState = {\n  items: Item[];\n  add: (i: Item) =&gt; void;\n};\n\nexport const useCart = create&lt;CartState&gt;()(\n  persist(\n    subscribeWithSelector(\n      immer((set) =&gt; ({\n        items: [],\n        add: (i) =&gt; set((s) =&gt; { s.items.push(i); }),\n      }))\n    ),\n    { name: "cart" }\n  )\n);\n\n// outside React - the equivalent of using a store in a service\nuseCart.getState().add(item);\n\n// several fields in one selector\nconst { items, add } = useCart(useShallow((s) =&gt; ({ items: s.items, add: s.add })));</code></pre><p><strong>What Zustand lacks that Pinia gave you.</strong> No timeline devtools without the <code>devtools</code> middleware. No automatic <code>$reset</code>. No <code>storeToRefs</code> equivalent, because the problem does not exist - there are no reactive refs to unwrap. No store registry either, so SSR needs a per-request instance: in Next.js you create the store inside a context provider, otherwise two requests share memory on the server. Nuxt plus Pinia handled that for you.</p><p><strong>When to reach for a store at all.</strong> A large share of what ends up in Pinia in Vue projects is server data - in React that goes to TanStack Query, not Zustand. Keep the store for client state the URL cannot hold: an open panel, edit mode, a toast queue, an offline cart. A realistic split is one global store plus two or three domain stores, not one per view.</p><p><strong>Alternatives.</strong> Redux Toolkit when the team wants explicit action auditing and time-travel devtools. Jotai when you think in atoms - the closest thing to the Vue <code>ref</code> model. Context on its own is not a state manager: it has no selectors, so any value change re-renders every consumer.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest podstawowa różnica w modelu subskrypcji między Pinią a Zustandem?',
            en: 'What is the core subscription difference between Pinia and Zustand?'
          },
          options: [
            { pl: 'Pinia działa tylko w SSR, Zustand tylko po stronie klienta', en: 'Pinia works only in SSR, Zustand only on the client' },
            { pl: 'Pinia śledzi odczyty automatycznie, w Zustandzie deklarujesz wycinek selektorem', en: 'Pinia tracks reads automatically; in Zustand you declare the slice with a selector' },
            { pl: 'Pinia używa Context, Zustand używa Proxy', en: 'Pinia uses Context, Zustand uses Proxy' },
            { pl: 'Zustand nie pozwala na akcje asynchroniczne', en: 'Zustand does not allow async actions' }
          ],
          correct: 1,
          explain: {
            pl: 'Pinia opiera się na reaktywności Vue i widzi, co przeczytałeś. Zustand nic nie śledzi, więc selektor jest twoją deklaracją zainteresowania.',
            en: 'Pinia rides on Vue reactivity and sees what you read. Zustand tracks nothing, so the selector is how you declare interest.'
          }
        },
        {
          q: {
            pl: 'Co się stanie, gdy w komponencie napiszesz const state = useCart() bez selektora?',
            en: 'What happens if you write const state = useCart() with no selector in a component?'
          },
          options: [
            { pl: 'Komponent rerenderuje się przy każdej zmianie czegokolwiek w store', en: 'The component re-renders on any change anywhere in the store' },
            { pl: 'Zustand rzuci błędem w trybie deweloperskim', en: 'Zustand throws in development mode' },
            { pl: 'Dostaniesz zamrożoną kopię stanu z chwili montowania', en: 'You get a frozen snapshot from mount time' },
            { pl: 'Nic, Zustand sam wykryje odczytane pola', en: 'Nothing, Zustand detects the fields you read' }
          ],
          correct: 0,
          explain: {
            pl: 'Bez selektora porównywany jest cały obiekt stanu, a ten po każdym set ma nową referencję. Efekt to rerender przy każdej zmianie, także zupełnie niezwiązanej.',
            en: 'With no selector the whole state object is compared, and it gets a new reference after every set. The result is a re-render on every change, including unrelated ones.'
          }
        },
        {
          q: {
            pl: 'Dane produktów pobierane z API trafiały u ciebie do Pinii. Gdzie powinny trafić w projekcie React?',
            en: 'Product data fetched from an API used to live in Pinia for you. Where should it go in a React project?'
          },
          options: [
            { pl: 'Do Zustanda, jeden do jednego jak w Pinii', en: 'Into Zustand, one to one with Pinia' },
            { pl: 'Do Contextu na poziomie korzenia', en: 'Into a root-level Context' },
            { pl: 'Do useState w komponencie strony', en: 'Into useState on the page component' },
            { pl: 'Do cache TanStack Query, a Zustand zostaje na stan klienta', en: 'Into the TanStack Query cache, leaving Zustand for client state' }
          ],
          correct: 3,
          explain: {
            pl: 'Dane serwerowe mają cache, ponowne pobrania, unieważnianie i stany błędów - store tego nie daje. Zustand zostawiasz na stan czysto kliencki.',
            en: 'Server data needs caching, refetching, invalidation and error states - a store gives you none of that. Keep Zustand for purely client state.'
          }
        },
        {
          q: {
            pl: 'Selektor useCart(s => ({ items: s.items, total: s.total })) powoduje rerender przy każdej akcji, nawet niezwiązanej. Dlaczego?',
            en: 'The selector useCart(s => ({ items: s.items, total: s.total })) re-renders on every action, even unrelated ones. Why?'
          },
          options: [
            { pl: 'Bo selektory nie mogą zwracać więcej niż jednego pola', en: 'Because selectors cannot return more than one field' },
            { pl: 'Bo selektor tworzy nowy obiekt, a domyślne porównanie Object.is zawsze widzi zmianę', en: 'Because the selector builds a new object and the default Object.is comparison always sees a change' },
            { pl: 'Bo brakuje middleware immer', en: 'Because the immer middleware is missing' },
            { pl: 'Bo store nie został owinięty w Provider', en: 'Because the store was not wrapped in a Provider' }
          ],
          correct: 1,
          explain: {
            pl: 'Nowy literał obiektowy to za każdym razem nowa referencja. Rozwiązanie to dwa osobne selektory albo useShallow jako komparator - w Pinii problem nie istniał, bo porównanie odbywa się per właściwość.',
            en: 'A fresh object literal is a fresh reference every time. Fix it with two separate selectors or useShallow as the comparator - in Pinia the problem never existed because comparison happens per property.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'tanstack-query-server-state',
      title: {
        pl: 'TanStack Query i stan serwera',
        en: 'TanStack Query and server state'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'queryKey', en: 'queryKey' },
          def: { pl: 'Hierarchiczna tablica identyfikująca wpis w cache. Musi zawierać <strong>każdą</strong> zmienną wejściową (filtry, strona, id użytkownika), bo inaczej po przelogowaniu zobaczysz cudze dane.', en: 'The hierarchical array identifying a cache entry. It must contain <strong>every</strong> input variable (filters, page, user id), otherwise you show another account data after re-login.' }
        },
        {
          term: { pl: 'staleTime', en: 'staleTime' },
          def: { pl: 'Czas, przez który dane liczone są jako świeże i nie są dociągane ponownie. Domyślne <code>0</code> potrafi podwoić ruch do API w aplikacji z częstym przełączaniem zakładek.', en: 'How long data counts as fresh and is not refetched. The default <code>0</code> can double API traffic in an app with heavy tab switching.' }
        },
        {
          term: { pl: 'gcTime', en: 'gcTime' },
          def: { pl: 'Czas życia wpisu bez subskrybentów, zanim trafi do garbage collectora (domyślnie 5 minut). Dawniej <code>cacheTime</code>; nie mylić ze <code>staleTime</code>.', en: 'How long an entry with no subscribers stays in memory before garbage collection (5 minutes by default). Formerly <code>cacheTime</code>; not to be confused with <code>staleTime</code>.' }
        },
        {
          term: { pl: 'invalidateQueries', en: 'invalidateQueries' },
          def: { pl: 'Oznacza wpisy pasujące do prefiksu klucza jako nieświeże i dociąga te, które ktoś ogląda. Odpowiednik ręcznego <code>refresh()</code> z Nuxta, tylko działający po prefiksie.', en: 'Marks entries matching a key prefix as stale and refetches the ones being watched. The equivalent of a manual Nuxt <code>refresh()</code>, but working by prefix.' }
        },
        {
          term: { pl: 'Aktualizacja optymistyczna', en: 'Optimistic update' },
          def: { pl: 'Wzorzec <code>onMutate</code> - <code>onError</code> - <code>onSettled</code>: anulujesz zapytania, zapisujesz poprzedni snapshot, wstawiasz nową wartość i cofasz ją przy błędzie.', en: 'The <code>onMutate</code> - <code>onError</code> - <code>onSettled</code> pattern: cancel queries, snapshot the previous value, write the new one, and roll back on failure.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r4m3arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Two kinds of state, two homes</text>' +
          '<rect x="20" y="50" width="180" height="120" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="110" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Client state</text>' +
          '<text x="110" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">modal open, filters</text>' +
          '<text x="110" y="124" fill="var(--muted)" font-size="13" text-anchor="middle">you own the truth</text>' +
          '<text x="110" y="150" fill="var(--accent)" font-size="13" text-anchor="middle">useState / Zustand</text>' +
          '<rect x="230" y="50" width="200" height="120" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="330" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Server state</text>' +
          '<text x="330" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">orders, profile, list</text>' +
          '<text x="330" y="124" fill="var(--muted)" font-size="13" text-anchor="middle">a cached copy</text>' +
          '<text x="330" y="150" fill="var(--accent2)" font-size="13" text-anchor="middle">TanStack Query</text>' +
          '<line x1="430" y1="110" x2="500" y2="110" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m3arrow)"/>' +
          '<rect x="505" y="70" width="115" height="80" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="562" y="116" fill="var(--muted)" font-size="13" text-anchor="middle">API</text>' +
          '<rect x="20" y="205" width="600" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="232" fill="var(--text)" font-size="14" text-anchor="middle">queryKey: [orders, status, page]</text>' +
          '<text x="320" y="256" fill="var(--muted)" font-size="13" text-anchor="middle">the key IS the cache identity and the dependency array</text>' +
          '<text x="20" y="315" fill="var(--warn)" font-size="13">Putting server data in a store means owning cache, staleness and refetch.</text>' +
          '<text x="20" y="343" fill="var(--muted)" font-size="13">Query owns it: dedupe, retry, refocus refetch, invalidation.</text>' +
          '<text x="20" y="371" fill="var(--muted)" font-size="13">Pinia store for orders is the pattern you leave behind.</text>' +
          '</svg>',
        caption: {
          pl: 'Podział na stan klienta i stan serwera: pierwszy trzymasz u siebie, drugi jest tylko cache, którego właścicielem jest backend.',
          en: 'Split state into client state and server state: you own the first, the second is merely a cache whose owner is the backend.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Cykl życia jednego zapytania w cache: od pustego cache, przez fresh i stale, po odświeżenie w tle.',
          en: 'The lifecycle of one query in the cache: empty cache, fresh, stale, then a background refetch.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="r4f1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">1. Mount: cache miss</text>' +
              '<rect x="30" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="175" fill="var(--text)" font-size="14" text-anchor="middle">Component</text>' +
              '<text x="110" y="200" fill="var(--warn)" font-size="13" text-anchor="middle">isPending</text>' +
              '<rect x="240" y="120" width="170" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="325" y="152" fill="var(--text)" font-size="14" text-anchor="middle">Query cache</text>' +
              '<text x="325" y="178" fill="var(--muted)" font-size="13" text-anchor="middle">[orders, open]</text>' +
              '<rect x="270" y="195" width="110" height="32" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/>' +
              '<text x="325" y="217" fill="var(--muted)" font-size="13" text-anchor="middle">empty</text>' +
              '<rect x="450" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">Server</text>' +
              '<line x1="410" y1="185" x2="445" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4f1a)"/>' +
              '<text x="320" y="330" fill="var(--muted)" font-size="13" text-anchor="middle">first subscriber triggers one fetch</text>' +
              '</svg>',
            label: { pl: 'Pusty cache', en: 'Cache miss' },
            note: {
              pl: 'Pierwszy komponent z tym queryKey uruchamia zapytanie. Kolejne subskrypcje w tym samym momencie są deduplikowane, nie mnożą requestów.',
              en: 'The first component with this queryKey fires the request. Further subscribers at the same moment are deduplicated, not multiplied.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="r4f2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--ok)" font-size="14">2. Data cached, status fresh</text>' +
              '<rect x="30" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="110" y="175" fill="var(--text)" font-size="14" text-anchor="middle">Component</text>' +
              '<text x="110" y="200" fill="var(--ok)" font-size="13" text-anchor="middle">renders data</text>' +
              '<rect x="240" y="120" width="170" height="130" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="325" y="152" fill="var(--text)" font-size="14" text-anchor="middle">Query cache</text>' +
              '<text x="325" y="178" fill="var(--muted)" font-size="13" text-anchor="middle">[orders, open]</text>' +
              '<rect x="270" y="195" width="110" height="32" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="325" y="217" fill="var(--ok)" font-size="13" text-anchor="middle">fresh</text>' +
              '<rect x="450" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">Server</text>' +
              '<line x1="445" y1="185" x2="415" y2="185" stroke="var(--ok)" stroke-width="2" marker-end="url(#r4f2a)"/>' +
              '<text x="320" y="330" fill="var(--muted)" font-size="13" text-anchor="middle">within staleTime nothing hits the network</text>' +
              '</svg>',
            label: { pl: 'Dane fresh', en: 'Data is fresh' },
            note: {
              pl: 'Przez czas staleTime cache uchodzi za aktualny. Wejście na ten sam ekran po raz drugi nie wywoła żadnego requestu.',
              en: 'For the duration of staleTime the cache counts as current. Revisiting the same screen fires no request at all.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--warn)" font-size="14">3. staleTime elapsed: stale but shown</text>' +
              '<rect x="30" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="110" y="175" fill="var(--text)" font-size="14" text-anchor="middle">Component</text>' +
              '<text x="110" y="200" fill="var(--ok)" font-size="13" text-anchor="middle">still renders data</text>' +
              '<rect x="240" y="120" width="170" height="130" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="325" y="152" fill="var(--text)" font-size="14" text-anchor="middle">Query cache</text>' +
              '<text x="325" y="178" fill="var(--muted)" font-size="13" text-anchor="middle">[orders, open]</text>' +
              '<rect x="270" y="195" width="110" height="32" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="325" y="217" fill="var(--warn)" font-size="13" text-anchor="middle">stale</text>' +
              '<rect x="450" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">Server</text>' +
              '<text x="320" y="330" fill="var(--muted)" font-size="13" text-anchor="middle">stale does not mean hidden - no spinner here</text>' +
              '</svg>',
            label: { pl: 'Dane stale', en: 'Data goes stale' },
            note: {
              pl: 'Stale to tylko etykieta: dane dalej widać. Query zaplanuje odświeżenie przy najbliższym wyzwalaczu, nie natychmiast.',
              en: 'Stale is only a label: the data stays on screen. Query schedules a refresh at the next trigger, not immediately.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="r4f4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--accent)" font-size="14">4. Window refocus: background refetch</text>' +
              '<rect x="30" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="110" y="170" fill="var(--text)" font-size="14" text-anchor="middle">Component</text>' +
              '<text x="110" y="193" fill="var(--ok)" font-size="13" text-anchor="middle">old data visible</text>' +
              '<text x="110" y="215" fill="var(--accent)" font-size="13" text-anchor="middle">isFetching</text>' +
              '<rect x="240" y="120" width="170" height="130" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="325" y="152" fill="var(--text)" font-size="14" text-anchor="middle">Query cache</text>' +
              '<text x="325" y="178" fill="var(--muted)" font-size="13" text-anchor="middle">[orders, open]</text>' +
              '<rect x="270" y="195" width="110" height="32" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="325" y="217" fill="var(--accent)" font-size="13" text-anchor="middle">refetching</text>' +
              '<rect x="450" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">Server</text>' +
              '<line x1="410" y1="185" x2="445" y2="185" stroke="var(--accent)" stroke-width="2" marker-end="url(#r4f4a)"/>' +
              '<text x="320" y="330" fill="var(--muted)" font-size="13" text-anchor="middle">refocus, reconnect, mount or invalidate</text>' +
              '</svg>',
            label: { pl: 'Odświeżenie w tle', en: 'Background refetch' },
            note: {
              pl: 'Powrót do zakładki, powrót sieci, ponowne zamontowanie albo invalidateQueries uruchamiają pobranie bez chowania starych danych.',
              en: 'Refocus, reconnect, a remount or invalidateQueries all trigger a fetch without hiding the data already on screen.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="r4f5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--ok)" font-size="14">5. Cache updated, all subscribers refresh</text>' +
              '<rect x="30" y="110" width="160" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="110" y="152" fill="var(--text)" font-size="14" text-anchor="middle">List view</text>' +
              '<rect x="30" y="200" width="160" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="110" y="242" fill="var(--text)" font-size="14" text-anchor="middle">Header badge</text>' +
              '<rect x="240" y="120" width="170" height="130" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="325" y="152" fill="var(--text)" font-size="14" text-anchor="middle">Query cache</text>' +
              '<text x="325" y="178" fill="var(--muted)" font-size="13" text-anchor="middle">[orders, open]</text>' +
              '<rect x="270" y="195" width="110" height="32" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="325" y="217" fill="var(--ok)" font-size="13" text-anchor="middle">fresh</text>' +
              '<rect x="450" y="140" width="160" height="90" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">Server</text>' +
              '<line x1="445" y1="185" x2="415" y2="185" stroke="var(--ok)" stroke-width="2" marker-end="url(#r4f5a)"/>' +
              '<line x1="240" y1="150" x2="195" y2="145" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="240" y1="220" x2="195" y2="235" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="330" fill="var(--muted)" font-size="13" text-anchor="middle">one cache entry, many consumers</text>' +
              '</svg>',
            label: { pl: 'Jeden cache, wielu odbiorców', en: 'One cache, many consumers' },
            note: {
              pl: 'Każdy komponent z tym samym queryKey dostaje nowe dane naraz. To zastępuje ręczne rozsyłanie zmian ze store Pinii.',
              en: 'Every component with the same queryKey gets the new data at once. This replaces manually propagating changes from a Pinia store.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że pożyczasz książkę z biblioteki. Masz ją u siebie na biurku, ale to nie twoja książka. Prawdziwa wersja jest w bibliotece i tam mogą dopisać errata albo wymienić wydanie.</p><p>Twoja kopia na biurku jest wygodna: czytasz od razu, bez chodzenia. Ale po jakimś czasie warto zerknąć, czy w bibliotece nie ma nowszej. Nie chowasz przy tym swojej książki do szuflady - dalej czytasz starą, a jak przyjdzie nowa, po prostu ją podmieniasz.</p><p>Dane z serwera są dokładnie taką pożyczoną książką. Nie są twoje, tylko wypożyczone. Dlatego traktujesz je inaczej niż własne notatki: pilnujesz, kiedy się zestarzały, sprawdzasz co jakiś czas, czy nie ma nowszej wersji, i nigdy nie udajesz, że twoja kopia to oryginał.</p><p>Jest narzędzie, które prowadzi tę bibliotekę za ciebie. Ty tylko mówisz, jakiej książki chcesz.</p>',
          en: '<p>Imagine borrowing a book from the library. It sits on your desk, but it is not your book. The real version lives in the library, where they may add errata or swap in a new edition.</p><p>Your copy on the desk is convenient: you read it immediately, no walking. But after a while it is worth checking whether the library has a newer one. You do not put your copy in a drawer while you check - you keep reading the old one and swap it when the new one arrives.</p><p>Server data is exactly that borrowed book. It is not yours, it is on loan. So you treat it differently from your own notes: you watch when it went old, you check now and then for a newer version, and you never pretend your copy is the original.</p><p>There is a tool that runs this library for you. You just say which book you want.</p>'
        },
        school: {
          pl: '<p>Najważniejsza zmiana nawyku przy przejściu z Vue: <strong>przestań trzymać dane serwera w store</strong>. W projektach Vue naturalne było zrobić <code>useOrdersStore</code> z akcją <code>fetchOrders</code>, tablicą <code>orders</code> i flagą <code>loading</code>. W Reactcie tę rolę przejmuje TanStack Query - biblioteka, która jest cache, a nie store.</p><p>Różnica jest w tym, kto jest właścicielem prawdy. Stan klienta (otwarty modal, wybrana zakładka) należy do ciebie. Stan serwera to tylko lokalna kopia czegoś, co żyje w bazie i może się zmienić bez twojego udziału.</p><pre><code>// Vue - typowy store Pinii na dane\nconst orders = ref([])\nconst loading = ref(false)\nasync function fetchOrders() {\n  loading.value = true\n  orders.value = await api.getOrders()\n  loading.value = false\n}</code></pre><pre><code>// React - to samo w jednej linijce zapytania\nconst { data, isPending, error } = useQuery({\n  queryKey: ["orders", status],\n  queryFn: () =&gt; api.getOrders(status),\n  staleTime: 30_000,\n})</code></pre><p>W Vue robiłeś X - pisałeś ręcznie akcję, flagę ładowania i obsługę błędu dla każdego zasobu. W Reactcie robisz Y - deklarujesz klucz i funkcję pobierającą, bo Z: cache jest globalny i adresowany kluczem, więc deduplikacja, ponowne pobrania, retry i unieważnianie dzieją się poza twoim kodem.</p><p><code>queryKey</code> jest sercem całości. To jednocześnie tożsamość wpisu w cache i tablica zależności: zmiana <code>status</code> to inny klucz, czyli inny wpis i automatycznie nowe pobranie. Nie potrzebujesz <code>watch</code> ani <code>useEffect</code>.</p><p>Zapisy idą przez <code>useMutation</code>, a po sukcesie unieważniasz odpowiedni klucz:</p><pre><code>const qc = useQueryClient()\nconst m = useMutation({\n  mutationFn: api.createOrder,\n  onSuccess: () =&gt; qc.invalidateQueries({ queryKey: ["orders"] }),\n})</code></pre><p>Warto wiedzieć, że ta sama biblioteka istnieje jako <code>@tanstack/vue-query</code>. Wzorzec nie jest reactowy - po prostu w Reactcie stał się standardem, bo React nie ma nic wbudowanego, podczas gdy Nuxt dawał ci <code>useAsyncData</code>.</p>',
          en: '<p>The biggest habit change coming from Vue: <strong>stop keeping server data in a store</strong>. In Vue projects it felt natural to write <code>useOrdersStore</code> with a <code>fetchOrders</code> action, an <code>orders</code> array and a <code>loading</code> flag. In React that role goes to TanStack Query - a library that is a cache, not a store.</p><p>The difference is who owns the truth. Client state (an open modal, the selected tab) belongs to you. Server state is a local copy of something that lives in a database and can change without you.</p><pre><code>// Vue - a typical Pinia data store\nconst orders = ref([])\nconst loading = ref(false)\nasync function fetchOrders() {\n  loading.value = true\n  orders.value = await api.getOrders()\n  loading.value = false\n}</code></pre><pre><code>// React - the same thing as one query\nconst { data, isPending, error } = useQuery({\n  queryKey: ["orders", status],\n  queryFn: () =&gt; api.getOrders(status),\n  staleTime: 30_000,\n})</code></pre><p>In Vue you did X - hand-wrote an action, a loading flag and error handling for every resource. In React you do Y - declare a key and a fetcher, because Z: the cache is global and key-addressed, so deduplication, refetching, retries and invalidation happen outside your code.</p><p>The <code>queryKey</code> is the heart of it. It is both the cache entry identity and a dependency array: changing <code>status</code> means a different key, a different entry, and an automatic fetch. No <code>watch</code>, no <code>useEffect</code>.</p><p>Writes go through <code>useMutation</code>, and on success you invalidate the matching key:</p><pre><code>const qc = useQueryClient()\nconst m = useMutation({\n  mutationFn: api.createOrder,\n  onSuccess: () =&gt; qc.invalidateQueries({ queryKey: ["orders"] }),\n})</code></pre><p>Worth knowing: the same library exists as <code>@tanstack/vue-query</code>. The pattern is not React-specific - it just became the standard in React, because React ships nothing built in while Nuxt handed you <code>useAsyncData</code>.</p>'
        },
        pro: {
          pl: '<p>Model cache w czterech pojęciach. <code>staleTime</code> mówi, jak długo dane uchodzą za świeże (domyślnie 0 - czyli natychmiast stale). <code>gcTime</code> (dawniej <code>cacheTime</code>, domyślnie 5 minut) mówi, jak długo wpis bez subskrybentów zostaje w pamięci. Wyzwalacze odświeżenia to montowanie, powrót fokusu okna, powrót sieci i interwał. <code>invalidateQueries</code> oznacza wpis jako stale i odświeża go, jeśli ktoś go ogląda.</p><p><strong>Vue robiło X, React robi Y.</strong> W Nuxcie <code>useAsyncData</code> dawało cache per klucz w obrębie strony i deduplikację, ale unieważnianie i tak robiłeś ręcznie przez <code>refresh()</code>. Query idzie dalej: cache jest globalny, klucze są hierarchiczne, a unieważnianie działa prefiksem, bo Z - to nie warstwa pobierania, tylko synchronizacja stanu asynchronicznego.</p><pre><code>// hierarchia kluczy - invalidacja prefiksem lapie wszystko nizej\nconst keys = {\n  all: ["orders"] as const,\n  list: (f: Filters) =&gt; [...keys.all, "list", f] as const,\n  detail: (id: string) =&gt; [...keys.all, "detail", id] as const,\n};\n\nconst { data } = useQuery({\n  queryKey: keys.list(filters),\n  queryFn: ({ signal }) =&gt; api.list(filters, signal),\n  staleTime: 60_000,\n  placeholderData: (prev) =&gt; prev,   // brak migotania przy zmianie strony\n  select: (res) =&gt; res.items,        // transformacja bez rerenderu innych\n});\n\n// optimistic update z pelnym rollbackiem\nconst mutation = useMutation({\n  mutationFn: api.rename,\n  onMutate: async (next) =&gt; {\n    await qc.cancelQueries({ queryKey: keys.detail(next.id) });\n    const prev = qc.getQueryData(keys.detail(next.id));\n    qc.setQueryData(keys.detail(next.id), next);\n    return { prev };\n  },\n  onError: (_e, next, ctx) =&gt; qc.setQueryData(keys.detail(next.id), ctx.prev),\n  onSettled: (_d, _e, next) =&gt; qc.invalidateQueries({ queryKey: keys.detail(next.id) }),\n});</code></pre><p>Decyzje, które realnie widać w produkcie:</p><ul><li><strong>staleTime 0 jako domyślne</strong> potrafi podwoić ruch do API na aplikacji z dużą liczbą przełączeń zakładek. Dla danych zmieniających się rzadko (słowniki, profil) ustaw 5-30 minut; dla list transakcyjnych 15-60 sekund.</li><li><strong>Klucz musi zawierać każdą zmienną wejściową.</strong> Pominięcie <code>page</code> albo id użytkownika to klasyczny wyciek danych między kontami po przelogowaniu.</li><li><strong>placeholderData: (prev) =&gt; prev</strong> zamiast <code>keepPreviousData</code> (usunięte w v5) daje płynną paginację bez skoku layoutu.</li><li><strong>Nie duplikuj cache do useState.</strong> Kopiowanie <code>data</code> do lokalnego stanu w efekcie to najczęstszy błąd migrujących z Pinii - wraca rozjazd, który Query właśnie eliminowało.</li><li><strong>SSR</strong>: w Next.js prefetchujesz na serwerze i przekazujesz <code>dehydrate(queryClient)</code> do <code>HydrationBoundary</code>. To odpowiednik <code>payload</code> z Nuxta.</li><li><strong>DevTools</strong> (<code>@tanstack/react-query-devtools</code>) pokazują każdy wpis, jego status i obserwatorów - na code review rozstrzygają spór o to, czy zapytanie faktycznie leci dwa razy.</li></ul><p>Na rozmowie o pracę pytanie brzmi zwykle: czym różni się stan serwera od stanu klienta. Zła odpowiedź: niczym, jedno i drugie trzymam w store. Dobra: stan serwera to cache cudzej prawdy, więc potrzebuje staleness, deduplikacji, ponowień i unieważniania, a stan klienta niczego z tej listy.</p>',
          en: '<p>The cache model in four concepts. <code>staleTime</code> says how long data counts as fresh (default 0 - stale immediately). <code>gcTime</code> (formerly <code>cacheTime</code>, default 5 minutes) says how long an entry with no subscribers stays in memory. Refetch triggers are mount, window refocus, reconnect and interval. <code>invalidateQueries</code> marks an entry stale and refetches it if anyone is watching.</p><p><strong>Vue did X, React does Y.</strong> In Nuxt, <code>useAsyncData</code> gave you a per-key cache within the page plus deduplication, but you still invalidated by hand with <code>refresh()</code>. Query goes further: the cache is global, keys are hierarchical, and invalidation works by prefix, because Z - it is not a fetching layer, it is async state synchronisation.</p><pre><code>// key hierarchy - a prefix invalidation catches everything below\nconst keys = {\n  all: ["orders"] as const,\n  list: (f: Filters) =&gt; [...keys.all, "list", f] as const,\n  detail: (id: string) =&gt; [...keys.all, "detail", id] as const,\n};\n\nconst { data } = useQuery({\n  queryKey: keys.list(filters),\n  queryFn: ({ signal }) =&gt; api.list(filters, signal),\n  staleTime: 60_000,\n  placeholderData: (prev) =&gt; prev,   // no flicker when the page changes\n  select: (res) =&gt; res.items,        // transform without re-rendering others\n});\n\n// optimistic update with a full rollback\nconst mutation = useMutation({\n  mutationFn: api.rename,\n  onMutate: async (next) =&gt; {\n    await qc.cancelQueries({ queryKey: keys.detail(next.id) });\n    const prev = qc.getQueryData(keys.detail(next.id));\n    qc.setQueryData(keys.detail(next.id), next);\n    return { prev };\n  },\n  onError: (_e, next, ctx) =&gt; qc.setQueryData(keys.detail(next.id), ctx.prev),\n  onSettled: (_d, _e, next) =&gt; qc.invalidateQueries({ queryKey: keys.detail(next.id) }),\n});</code></pre><p>Decisions that show up in the product:</p><ul><li><strong>The default staleTime of 0</strong> can double API traffic in an app with heavy tab switching. For slow-moving data (lookups, profile) set 5-30 minutes; for transactional lists, 15-60 seconds.</li><li><strong>The key must contain every input variable.</strong> Forgetting <code>page</code> or the user id is the classic cross-account data leak after re-login.</li><li><strong>placeholderData: (prev) =&gt; prev</strong> replaces <code>keepPreviousData</code> (removed in v5) and gives smooth pagination with no layout jump.</li><li><strong>Do not mirror the cache into useState.</strong> Copying <code>data</code> into local state inside an effect is the most common mistake for Pinia migrants - it reintroduces exactly the desync Query removed.</li><li><strong>SSR</strong>: in Next.js you prefetch on the server and pass <code>dehydrate(queryClient)</code> into <code>HydrationBoundary</code>. That is the Nuxt <code>payload</code> equivalent.</li><li><strong>DevTools</strong> (<code>@tanstack/react-query-devtools</code>) show every entry, its status and its observers - they settle the code-review argument about whether a request really fires twice.</li></ul><p>In interviews the question is usually: how does server state differ from client state. Bad answer: it does not, I keep both in a store. Good answer: server state is a cache of someone else\'s truth, so it needs staleness, deduplication, retries and invalidation, while client state needs none of that.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym w TanStack Query jest queryKey?',
            en: 'What is the queryKey in TanStack Query?'
          },
          options: [
            { pl: 'Tożsamością wpisu w cache i jednocześnie listą zależności zapytania', en: 'The identity of the cache entry and at the same time the query dependency list' },
            { pl: 'Nagłówkiem HTTP wysyłanym z żądaniem', en: 'An HTTP header sent with the request' },
            { pl: 'Nazwą pliku w localStorage', en: 'A file name in localStorage' },
            { pl: 'Identyfikatorem komponentu, który zamówił dane', en: 'The id of the component that requested the data' }
          ],
          correct: 0,
          explain: {
            pl: 'Klucz adresuje wpis w cache, a jego zmiana wywołuje nowe pobranie - dlatego zastępuje watch z Vue i tablicę zależności useEffect.',
            en: 'The key addresses the cache entry, and changing it triggers a fetch - which is why it replaces a Vue watch and a useEffect dependency array.'
          }
        },
        {
          q: {
            pl: 'Co oznacza status stale dla danych, które użytkownik ma na ekranie?',
            en: 'What does the stale status mean for data the user has on screen?'
          },
          options: [
            { pl: 'Dane znikają i pojawia się spinner', en: 'The data disappears and a spinner shows' },
            { pl: 'Wpis został usunięty z pamięci', en: 'The entry was dropped from memory' },
            { pl: 'Zapytanie zostało anulowane', en: 'The query was cancelled' },
            { pl: 'Dane dalej są wyświetlane, ale kwalifikują się do odświeżenia przy najbliższym wyzwalaczu', en: 'The data stays visible but becomes eligible for a refetch at the next trigger' }
          ],
          correct: 3,
          explain: {
            pl: 'Stale to etykieta świeżości, nie usunięcie. Za usuwanie wpisu bez subskrybentów odpowiada gcTime.',
            en: 'Stale is a freshness label, not a deletion. Removing an entry with no subscribers is what gcTime does.'
          }
        },
        {
          q: {
            pl: 'Migrujesz store Pinii z listą zamówień. Co powinno zostać w Zustandzie, a co przejść do Query?',
            en: 'You are migrating a Pinia store holding an order list. What stays in Zustand and what moves to Query?'
          },
          options: [
            { pl: 'Wszystko do Zustanda, Query tylko do pierwszego pobrania', en: 'Everything into Zustand, Query only for the first fetch' },
            { pl: 'Lista zamówień do Query, a wybrany widok i otwarty panel do Zustanda', en: 'The order list into Query, the selected view and open panel into Zustand' },
            { pl: 'Wszystko do Query, łącznie ze stanem otwartego modala', en: 'Everything into Query, including the open-modal state' },
            { pl: 'Lista do Contextu, filtry do Query', en: 'The list into Context, the filters into Query' }
          ],
          correct: 1,
          explain: {
            pl: 'Podział idzie po właścicielu prawdy: dane z backendu to cache, a preferencje interfejsu to stan klienta. Trzymanie obu w jednym miejscu odbiera Query całą jego wartość.',
            en: 'The split follows who owns the truth: backend data is a cache, UI preferences are client state. Keeping both in one place throws away everything Query gives you.'
          }
        },
        {
          q: {
            pl: 'Po zapisie formularza robisz invalidateQueries, ale użytkownik przez sekundę widzi stare dane i nie podoba się to produktowi. Co jest właściwym rozwiązaniem?',
            en: 'After a form save you call invalidateQueries, but the user sees stale data for a second and product is unhappy. What is the right fix?'
          },
          options: [
            { pl: 'Ustawić staleTime na 0 w całej aplikacji', en: 'Set staleTime to 0 across the whole app' },
            { pl: 'Skopiować odpowiedź mutacji do useState i renderować z niego', en: 'Copy the mutation response into useState and render from there' },
            { pl: 'Zrobić optimistic update w onMutate z zapisem poprzedniej wartości i rollbackiem w onError', en: 'Do an optimistic update in onMutate, snapshot the previous value, and roll back in onError' },
            { pl: 'Wywołać location.reload po zapisie', en: 'Call location.reload after saving' }
          ],
          correct: 2,
          explain: {
            pl: 'onMutate podmienia dane w cache natychmiast, a snapshot pozwala cofnąć zmianę, gdy serwer odrzuci zapis. Kopiowanie do useState przywraca dokładnie ten rozjazd, którego chcesz uniknąć.',
            en: 'onMutate writes the new data into the cache immediately, and the snapshot lets you roll back if the server rejects it. Copying into useState reintroduces exactly the desync you are trying to avoid.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'forms-react-hook-form',
      title: {
        pl: 'Formularze: React Hook Form kontra vee-validate',
        en: 'Forms: React Hook Form vs vee-validate'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Pole niekontrolowane', en: 'Uncontrolled input' },
          def: { pl: 'Input trzymający wartość w DOM i w refie zamiast w stanie Reacta. Dzięki temu wpisywanie nie rerenderuje całego formularza - stąd szybkość React Hook Form.', en: 'An input holding its value in the DOM and a ref instead of React state. Typing therefore does not re-render the whole form - that is where React Hook Form speed comes from.' }
        },
        {
          term: { pl: 'register', en: 'register' },
          def: { pl: 'Funkcja podpinająca pole do formularza (<code>{...register("email")}</code>). Odpowiednik <code>useField</code> plus <code>v-model</code> z vee-validate.', en: 'The function that wires a field into the form (<code>{...register("email")}</code>). The vee-validate <code>useField</code> plus <code>v-model</code> equivalent.' }
        },
        {
          term: { pl: 'resolver', en: 'resolver' },
          def: { pl: 'Adapter walidacji schematem, najczęściej <code>zodResolver(schema)</code>. Ten sam schemat uruchamiasz na serwerze - klient odpowiada za wygodę, nie za bezpieczeństwo.', en: 'The schema validation adapter, usually <code>zodResolver(schema)</code>. You run the same schema on the server - the client is responsible for comfort, not security.' }
        },
        {
          term: { pl: 'formState', en: 'formState' },
          def: { pl: 'Proxy z <code>errors</code>, <code>isDirty</code>, <code>isSubmitting</code>: odczyt pola tworzy subskrypcję, więc komponent budzi się tylko dla tego, co faktycznie czyta.', en: 'A Proxy holding <code>errors</code>, <code>isDirty</code>, <code>isSubmitting</code>: reading a field creates a subscription, so the component only wakes for what it actually reads.' }
        },
        {
          term: { pl: 'useFieldArray', en: 'useFieldArray' },
          def: { pl: 'Hook do dynamicznych list pól (<code>fields</code>, <code>append</code>, <code>remove</code>) - odpowiednik <code>useFieldArray</code> z vee-validate.', en: 'The hook for dynamic field lists (<code>fields</code>, <code>append</code>, <code>remove</code>) - the vee-validate <code>useFieldArray</code> equivalent.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r4m4arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Controlled: every keystroke is a render</text>' +
          '<rect x="20" y="45" width="130" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="85" y="81" fill="var(--text)" font-size="13" text-anchor="middle">keystroke</text>' +
          '<line x1="150" y1="75" x2="205" y2="75" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m4arrow)"/>' +
          '<rect x="210" y="45" width="140" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="280" y="81" fill="var(--warn)" font-size="13" text-anchor="middle">setState</text>' +
          '<line x1="350" y1="75" x2="405" y2="75" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m4arrow)"/>' +
          '<rect x="410" y="45" width="210" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="515" y="81" fill="var(--warn)" font-size="13" text-anchor="middle">whole form re-renders</text>' +
          '<line x1="20" y1="140" x2="620" y2="140" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="175" fill="var(--muted)" font-size="14">Uncontrolled (RHF): the DOM holds the value</text>' +
          '<rect x="20" y="195" width="130" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="85" y="231" fill="var(--text)" font-size="13" text-anchor="middle">keystroke</text>' +
          '<line x1="150" y1="225" x2="205" y2="225" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m4arrow)"/>' +
          '<rect x="210" y="195" width="140" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="280" y="220" fill="var(--ok)" font-size="13" text-anchor="middle">ref + subscription</text>' +
          '<text x="280" y="242" fill="var(--muted)" font-size="13" text-anchor="middle">no render</text>' +
          '<line x1="350" y1="225" x2="405" y2="225" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m4arrow)"/>' +
          '<rect x="410" y="195" width="210" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="515" y="220" fill="var(--ok)" font-size="13" text-anchor="middle">only the error slot</text>' +
          '<text x="515" y="242" fill="var(--muted)" font-size="13" text-anchor="middle">re-renders</text>' +
          '<text x="20" y="305" fill="var(--muted)" font-size="13">v-model hides this choice: Vue writes back without re-running the component.</text>' +
          '<text x="20" y="333" fill="var(--muted)" font-size="13">React makes it explicit: value + onChange, or register a ref.</text>' +
          '<text x="20" y="361" fill="var(--muted)" font-size="13">Same zod schema validates both worlds.</text>' +
          '</svg>',
        caption: {
          pl: 'Dwa modele pola formularza w Reactcie: kontrolowany rerenderuje formularz przy każdym znaku, niekontrolowany trzyma wartość w DOM i budzi tylko komunikat błędu.',
          en: 'Two field models in React: controlled re-renders the form on every keystroke, uncontrolled keeps the value in the DOM and only wakes the error slot.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że wypełniasz papierowy formularz przy okienku. Są dwa sposoby.</p><p>Pierwszy: przy każdej literce podajesz kartkę urzędnikowi, on ją przepisuje do komputera, oddaje ci z powrotem i piszesz kolejną literkę. Działa, ale przy dłuższym formularzu urzędnik pada.</p><p>Drugi: piszesz spokojnie całą kartkę sam, a urzędnik tylko zerka z boku i mówi "tu brakuje kodu pocztowego". Zagląda, kiedy trzeba, a nie po każdym ruchu długopisu.</p><p>W Vue urzędnik był niewidzialny - kartka i komputer były magicznie połączone, więc nigdy nie musiałeś wybierać. W Reactcie musisz wskazać sposób palcem. Ten pierwszy jest prostszy do zrozumienia, ten drugi znacznie szybszy przy dużych formularzach i dlatego wygrywa w praktyce.</p>',
          en: '<p>Imagine filling in a paper form at a counter. There are two ways.</p><p>First: after every single letter you hand the sheet to the clerk, he types it into his computer, hands it back, and you write the next letter. It works, but on a long form the clerk collapses.</p><p>Second: you calmly fill in the whole sheet yourself, and the clerk just glances over and says "the postcode is missing". He looks when it matters, not after every stroke of the pen.</p><p>In Vue the clerk was invisible - the sheet and the computer were magically joined, so you never had to choose. In React you have to point at one of the two. The first is easier to understand, the second is far faster on big forms, and that is why it wins in practice.</p>'
        },
        school: {
          pl: '<p><code>v-model</code> ukrywał przed tobą jedną decyzję: kto jest właścicielem wartości pola. Vue trzymało ją w <code>ref</code>, zapisywało do niej przy <code>input</code> i odświeżało tylko ten fragment szablonu, którego to dotyczyło. Komponent nie wykonywał się od nowa.</p><p>React tego nie ma. Pole kontrolowane oznacza <code>value</code> plus <code>onChange</code>, a każde naciśnięcie klawisza to <code>setState</code> i przerenderowanie całego komponentu formularza. Przy pięciu polach to nieistotne. Przy czterdziestu, z walidacją i maskami, robi się zauważalny lag na słabszym telefonie.</p><pre><code>// Vue + vee-validate\n&lt;script setup&gt;\nconst { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) })\nconst { value: email, errorMessage } = useField("email")\n&lt;/script&gt;\n&lt;input v-model="email" /&gt;\n&lt;span&gt;{{ errorMessage }}&lt;/span&gt;</code></pre><pre><code>// React + React Hook Form\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(schema),\n})\n\n&lt;input {...register("email")} /&gt;\n&lt;span&gt;{errors.email?.message}&lt;/span&gt;</code></pre><p>W Vue robiłeś X - wiązałeś pole przez <code>v-model</code> i nie myślałeś o renderach. W Reactcie robisz Y - rejestrujesz pole przez <code>register</code>, które podpina <code>ref</code> do elementu DOM, bo Z: dzięki temu wartość żyje w DOM, a React nie musi się budzić przy każdym znaku. Rerenderuje się tylko to miejsce, które subskrybowało błąd.</p><p>Reszta układanki jest wspólna dla obu światów. Schemat walidacji piszesz w zod, a łączysz go resolverem: <code>zodResolver</code> w React Hook Form, <code>toTypedSchema</code> w vee-validate. Ten sam plik ze schematem możesz współdzielić z backendem.</p><p>Pola, których nie da się zarejestrować bezpośrednio - komponenty z biblioteki UI, datepickery, selecty - owijasz w <code>&lt;Controller&gt;</code>. To wyspa kontrolowana w niekontrolowanym formularzu.</p>',
          en: '<p><code>v-model</code> hid one decision from you: who owns the field value. Vue kept it in a <code>ref</code>, wrote to it on <code>input</code>, and refreshed only the piece of template that cared. The component never re-ran.</p><p>React has none of that. A controlled field means <code>value</code> plus <code>onChange</code>, and every keypress is a <code>setState</code> plus a re-render of the whole form component. With five fields that is irrelevant. With forty, plus validation and masks, it becomes visible lag on a mid-range phone.</p><pre><code>// Vue + vee-validate\n&lt;script setup&gt;\nconst { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) })\nconst { value: email, errorMessage } = useField("email")\n&lt;/script&gt;\n&lt;input v-model="email" /&gt;\n&lt;span&gt;{{ errorMessage }}&lt;/span&gt;</code></pre><pre><code>// React + React Hook Form\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(schema),\n})\n\n&lt;input {...register("email")} /&gt;\n&lt;span&gt;{errors.email?.message}&lt;/span&gt;</code></pre><p>In Vue you did X - bound the field with <code>v-model</code> and never thought about renders. In React you do Y - register the field with <code>register</code>, which attaches a <code>ref</code> to the DOM element, because Z: the value then lives in the DOM and React need not wake up on every keystroke. Only the part that subscribed to the error re-renders.</p><p>The rest of the puzzle is shared between both worlds. You write the validation schema in zod and plug it in with a resolver: <code>zodResolver</code> for React Hook Form, <code>toTypedSchema</code> for vee-validate. The same schema file can be shared with the backend.</p><p>Fields you cannot register directly - UI-library components, date pickers, custom selects - get wrapped in <code>&lt;Controller&gt;</code>. That is a controlled island inside an uncontrolled form.</p>'
        },
        pro: {
          pl: '<p>Mapa jeden do jednego dla kogoś, kto zna vee-validate:</p><table><tr><th>vee-validate</th><th>React Hook Form</th></tr><tr><td><code>useForm({ validationSchema })</code></td><td><code>useForm({ resolver: zodResolver(s) })</code></td></tr><tr><td><code>useField</code> + <code>v-model</code></td><td><code>register(name)</code></td></tr><tr><td>komponent <code>&lt;Field&gt;</code></td><td><code>&lt;Controller&gt;</code></td></tr><tr><td><code>errorMessage</code></td><td><code>formState.errors[name]</code></td></tr><tr><td><code>handleSubmit</code></td><td><code>handleSubmit(onValid, onInvalid)</code></td></tr><tr><td><code>useFieldArray</code></td><td><code>useFieldArray</code></td></tr><tr><td><code>setErrors</code> z backendu</td><td><code>setError(name, { message })</code></td></tr></table><p><strong>Dlaczego RHF jest szybki.</strong> Formularz jest przechowywany w <code>ref</code> poza cyklem renderowania, a komponenty subskrybują tylko te fragmenty <code>formState</code>, które faktycznie odczytały - to Proxy, więc odczyt <code>errors</code> zapisuje subskrypcję, a nieodczytanie <code>isDirty</code> oznacza brak rerenderów z tego tytułu. To zaskakująco bliskie temu, co robi Vue, tylko ograniczone do jednej biblioteki zamiast całego frameworka.</p><pre><code>const schema = z.object({\n  email: z.string().email(),\n  items: z.array(z.object({ sku: z.string().min(1), qty: z.number().int().positive() })).min(1),\n});\ntype Values = z.infer&lt;typeof schema&gt;;\n\nconst form = useForm&lt;Values&gt;({\n  resolver: zodResolver(schema),\n  mode: "onTouched",          // walidacja po blur, potem na biezaco\n  defaultValues: { email: "", items: [] },\n});\n\nconst { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });\n\n// wartosc jednego pola bez rerenderu calego formularza\nconst qty = useWatch({ control: form.control, name: "items.0.qty" });\n\nasync function onSubmit(values: Values) {\n  const res = await api.save(values);\n  if (!res.ok) res.fieldErrors.forEach((e) =&gt; form.setError(e.path, { message: e.message }));\n}</code></pre><p>Pułapki, które kosztują czas:</p><ul><li><strong>defaultValues muszą istnieć od pierwszego renderu.</strong> Formularz startujący od <code>undefined</code>, a potem dostający dane z API, przechodzi z niekontrolowanego na kontrolowany i React krzyczy w konsoli. Rozwiązanie: <code>reset(data)</code> po pobraniu, albo <code>key</code> na formularzu.</li><li><strong>Rejestrowanie w warunku.</strong> Pole zniknięte z drzewa domyślnie zostaje w wartościach; <code>shouldUnregister: true</code> zmienia to zachowanie i bywa źródłem zaskoczeń przy krokowych formularzach.</li><li><strong>mode</strong> ma realny wpływ na odczucia: <code>onSubmit</code> (domyślne) bywa zbyt późne, <code>onChange</code> krzyczy o błędach, zanim użytkownik skończy pisać. <code>onTouched</code> to bezpieczny domyślny wybór.</li><li><strong>Serwer jest ostateczną walidacją.</strong> Ten sam schemat zod uruchamiaj po obu stronach; klient odpowiada za komfort, nie za bezpieczeństwo.</li><li><strong>Server Actions w Next.js</strong> zmieniają układ: <code>useActionState</code> i natywny <code>&lt;form action&gt;</code> pozwalają wysłać formularz bez JS, a RHF wchodzi tam, gdzie potrzebujesz bogatej walidacji na kliencie.</li></ul><p>Jeśli wolisz podejście z vee-validate, gdzie schemat i pola są ściśle sklejone, spójrz na TanStack Form - jest niezależny od frameworka i ma jedno API dla Reacta i Vue.</p>',
          en: '<p>A one-to-one map for someone who knows vee-validate:</p><table><tr><th>vee-validate</th><th>React Hook Form</th></tr><tr><td><code>useForm({ validationSchema })</code></td><td><code>useForm({ resolver: zodResolver(s) })</code></td></tr><tr><td><code>useField</code> + <code>v-model</code></td><td><code>register(name)</code></td></tr><tr><td><code>&lt;Field&gt;</code> component</td><td><code>&lt;Controller&gt;</code></td></tr><tr><td><code>errorMessage</code></td><td><code>formState.errors[name]</code></td></tr><tr><td><code>handleSubmit</code></td><td><code>handleSubmit(onValid, onInvalid)</code></td></tr><tr><td><code>useFieldArray</code></td><td><code>useFieldArray</code></td></tr><tr><td><code>setErrors</code> from the backend</td><td><code>setError(name, { message })</code></td></tr></table><p><strong>Why RHF is fast.</strong> The form lives in a <code>ref</code> outside the render cycle, and components subscribe only to the parts of <code>formState</code> they actually read - it is a Proxy, so reading <code>errors</code> records a subscription while never reading <code>isDirty</code> means no re-renders from it. That is surprisingly close to what Vue does, only scoped to one library instead of the whole framework.</p><pre><code>const schema = z.object({\n  email: z.string().email(),\n  items: z.array(z.object({ sku: z.string().min(1), qty: z.number().int().positive() })).min(1),\n});\ntype Values = z.infer&lt;typeof schema&gt;;\n\nconst form = useForm&lt;Values&gt;({\n  resolver: zodResolver(schema),\n  mode: "onTouched",          // validate after blur, then live\n  defaultValues: { email: "", items: [] },\n});\n\nconst { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });\n\n// one field value without re-rendering the whole form\nconst qty = useWatch({ control: form.control, name: "items.0.qty" });\n\nasync function onSubmit(values: Values) {\n  const res = await api.save(values);\n  if (!res.ok) res.fieldErrors.forEach((e) =&gt; form.setError(e.path, { message: e.message }));\n}</code></pre><p>Pitfalls that cost time:</p><ul><li><strong>defaultValues must exist from the first render.</strong> A form starting at <code>undefined</code> and later receiving API data flips from uncontrolled to controlled and React warns in the console. Fix it with <code>reset(data)</code> after fetching, or a <code>key</code> on the form.</li><li><strong>Conditional registration.</strong> A field removed from the tree keeps its value by default; <code>shouldUnregister: true</code> changes that and regularly surprises people building wizards.</li><li><strong>mode</strong> genuinely changes the feel: <code>onSubmit</code> (the default) can be too late, <code>onChange</code> shouts errors before the user finishes typing. <code>onTouched</code> is the safe default.</li><li><strong>The server is the real validation.</strong> Run the same zod schema on both sides; the client is responsible for comfort, not security.</li><li><strong>Next.js Server Actions</strong> shift the picture: <code>useActionState</code> and a native <code>&lt;form action&gt;</code> let a form submit without JS, and RHF steps in where you need rich client-side validation.</li></ul><p>If you prefer the vee-validate style where schema and fields are tightly glued, look at TanStack Form - it is framework-agnostic and offers one API across React and Vue.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie robi register("email") w React Hook Form?',
            en: 'What does register("email") actually do in React Hook Form?'
          },
          options: [
            { pl: 'Tworzy useState dla tego pola', en: 'Creates a useState for that field' },
            { pl: 'Zwraca props, w tym ref, dzięki którym wartość żyje w DOM, a nie w stanie Reacta', en: 'Returns props including a ref, so the value lives in the DOM instead of React state' },
            { pl: 'Rejestruje pole w globalnym store formularzy', en: 'Registers the field in a global forms store' },
            { pl: 'Włącza walidację po stronie serwera', en: 'Turns on server-side validation' }
          ],
          correct: 1,
          explain: {
            pl: 'To model niekontrolowany: RHF podpina się do elementu przez ref i czyta wartość, gdy jej potrzebuje. Dlatego pisanie nie wywołuje rerenderu formularza.',
            en: 'It is the uncontrolled model: RHF attaches to the element through a ref and reads the value when it needs it. That is why typing does not re-render the form.'
          }
        },
        {
          q: {
            pl: 'Jaki jest odpowiednik komponentu Field z vee-validate, gdy podpinasz select z biblioteki UI?',
            en: 'What is the vee-validate Field equivalent when wiring up a UI-library select?'
          },
          options: [
            { pl: 'useFieldArray', en: 'useFieldArray' },
            { pl: 'Controller', en: 'Controller' },
            { pl: 'useWatch', en: 'useWatch' },
            { pl: 'zodResolver', en: 'zodResolver' }
          ],
          correct: 1,
          explain: {
            pl: 'Controller tworzy kontrolowaną wyspę w niekontrolowanym formularzu i dostarcza value oraz onChange komponentowi, który nie przyjmuje ref.',
            en: 'Controller creates a controlled island inside an uncontrolled form, supplying value and onChange to a component that cannot take a ref.'
          }
        },
        {
          q: {
            pl: 'Dlaczego duży formularz z polami kontrolowanymi potrafi zauważalnie zwolnić w Reactcie, a analogiczny z v-model w Vue nie?',
            en: 'Why does a large controlled form get noticeably slow in React while the same form with v-model in Vue does not?'
          },
          options: [
            { pl: 'Bo Vue debounceuje zdarzenie input', en: 'Because Vue debounces the input event' },
            { pl: 'Bo React nie obsługuje zdarzeń natywnych', en: 'Because React does not use native events' },
            { pl: 'Bo v-model zapisuje do ref bez wykonywania komponentu od nowa, a setState rerenderuje cały komponent formularza', en: 'Because v-model writes to a ref without re-running the component, while setState re-renders the whole form component' },
            { pl: 'Bo Vue renderuje formularze na serwerze', en: 'Because Vue renders forms on the server' }
          ],
          correct: 2,
          explain: {
            pl: 'To wprost konsekwencja modelu aktualizacji: Vue odświeża fragment szablonu, React wykonuje funkcję komponentu od nowa razem z całym poddrzewem.',
            en: 'It follows directly from the update model: Vue refreshes a template fragment, React re-runs the component function together with its whole subtree.'
          }
        },
        {
          q: {
            pl: 'Formularz edycji dostaje dane z API po zamontowaniu i w konsoli pojawia się ostrzeżenie o zmianie pola z niekontrolowanego na kontrolowane. Jaka jest właściwa naprawa?',
            en: 'An edit form receives API data after mount and the console warns about a field switching from uncontrolled to controlled. What is the right fix?'
          },
          options: [
            { pl: 'Podać kompletne defaultValues od startu i wywołać reset(data) po pobraniu', en: 'Provide complete defaultValues from the start and call reset(data) once the data arrives' },
            { pl: 'Wyłączyć StrictMode', en: 'Turn off StrictMode' },
            { pl: 'Zamienić wszystkie pola na Controller', en: 'Convert every field to Controller' },
            { pl: 'Ustawić mode na onChange', en: 'Set mode to onChange' }
          ],
          correct: 0,
          explain: {
            pl: 'Ostrzeżenie bierze się z wartości undefined w pierwszym renderze. Pełne defaultValues plus reset po pobraniu rozwiązują to bez zmiany architektury formularza.',
            en: 'The warning comes from an undefined value on the first render. Complete defaultValues plus a reset after fetching solve it without changing the form architecture.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'url-state-routing-state',
      title: {
        pl: 'URL jako stan aplikacji',
        en: 'The URL as application state'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Stan w URL', en: 'URL state' },
          def: { pl: 'Stan, który da się udostępnić linkiem, odświeżyć i cofnąć: filtry, paginacja, otwarta zakładka. Adres jest wtedy jedynym źródłem prawdy, a nie kopią stanu ze store.', en: 'State that survives a link, a refresh and the back button: filters, pagination, the open tab. The address is then the single source of truth, not a copy of store state.' }
        },
        {
          term: { pl: 'useSearchParams', en: 'useSearchParams' },
          def: { pl: 'Hook czytający i zapisujący query string. Każda zmiana rerenderuje wszystkich konsumentów w poddrzewie, więc czytaj go jak najbliżej miejsca użycia.', en: 'The hook that reads and writes the query string. Every change re-renders all consumers in the subtree, so read it as close to its use as possible.' }
        },
        {
          term: { pl: 'Koercja parametrów', en: 'Parameter coercion' },
          def: { pl: 'Wartości z URL są zawsze stringami, więc parsujesz je schematem (<code>z.coerce.number().catch(1)</code>), zamiast ufać <code>Number(params.get("page"))</code>.', en: 'URL values are always strings, so you parse them with a schema (<code>z.coerce.number().catch(1)</code>) instead of trusting <code>Number(params.get("page"))</code>.' }
        },
        {
          term: { pl: 'replace kontra push', en: 'replace vs push' },
          def: { pl: '<code>replace</code> nadpisuje wpis w historii (debounce w wyszukiwarce), <code>push</code> dodaje nowy (przełączenie zakładki, wejście w szczegół). Zły wybór psuje przycisk wstecz.', en: '<code>replace</code> overwrites the history entry (a debounced search box), <code>push</code> adds a new one (switching tabs, opening a detail). The wrong choice breaks the back button.' }
        },
        {
          term: { pl: 'Reset zależnych parametrów', en: 'Resetting dependent params' },
          def: { pl: 'Zmiana filtra musi wyczyścić <code>page</code>, inaczej użytkownik ląduje na pustej stronie trzeciej. Klasyczny błąd zgłaszany przez QA.', en: 'Changing a filter must clear <code>page</code>, otherwise the user lands on an empty page three. A classic QA ticket.' }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="r4m5arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Which state belongs in the URL?</text>' +
          '<rect x="20" y="45" width="600" height="56" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="70" fill="var(--accent)" font-size="14" text-anchor="middle">/orders?status=open&amp;page=3&amp;q=acme</text>' +
          '<text x="320" y="90" fill="var(--muted)" font-size="13" text-anchor="middle">shareable, bookmarkable, survives reload</text>' +
          '<rect x="20" y="130" width="290" height="130" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="165" y="158" fill="var(--ok)" font-size="14" text-anchor="middle">Put in the URL</text>' +
          '<text x="165" y="184" fill="var(--muted)" font-size="13" text-anchor="middle">filters, sort, page</text>' +
          '<text x="165" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">search query, tab</text>' +
          '<text x="165" y="228" fill="var(--muted)" font-size="13" text-anchor="middle">selected entity id</text>' +
          '<text x="165" y="250" fill="var(--muted)" font-size="13" text-anchor="middle">date range</text>' +
          '<rect x="330" y="130" width="290" height="130" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="475" y="158" fill="var(--warn)" font-size="14" text-anchor="middle">Keep out of the URL</text>' +
          '<text x="475" y="184" fill="var(--muted)" font-size="13" text-anchor="middle">unsaved form draft</text>' +
          '<text x="475" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">hover, focus, scroll</text>' +
          '<text x="475" y="228" fill="var(--muted)" font-size="13" text-anchor="middle">tokens, anything secret</text>' +
          '<text x="475" y="250" fill="var(--muted)" font-size="13" text-anchor="middle">huge blobs of data</text>' +
          '<line x1="320" y1="101" x2="320" y2="128" stroke="var(--muted)" stroke-width="2" marker-end="url(#r4m5arrow)"/>' +
          '<text x="20" y="300" fill="var(--muted)" font-size="13">The URL is the only state a user can send to a colleague.</text>' +
          '<text x="20" y="328" fill="var(--muted)" font-size="13">push = new history entry, replace = no entry (use it for typing).</text>' +
          '<text x="20" y="356" fill="var(--muted)" font-size="13">Feed the URL straight into the queryKey.</text>' +
          '</svg>',
        caption: {
          pl: 'Co trafia do adresu, a co zostaje w pamięci: filtry, sortowanie i strona są dzielone linkiem, a wersje robocze i stan interfejsu nie.',
          en: 'What belongs in the address bar and what stays in memory: filters, sorting and page are shareable, drafts and UI state are not.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że pokazujesz koledze fajny widok w aplikacji z mapą: powiększona dzielnica, włączone tylko piekarnie, posortowane po ocenie.</p><p>Jeśli adres w przeglądarce zapamiętał te ustawienia, wystarczy, że wyślesz link. Kolega klika i widzi dokładnie to samo. Jeśli nie zapamiętał, musisz napisać instrukcję: "wejdź w filtry, zaznacz piekarnie, przewiń, zmień sortowanie".</p><p>Adres jest jak notatka przyklejona do lodówki. Wszystko, co na niej zapiszesz, przetrwa odświeżenie strony, powrót przyciskiem wstecz i wysłanie na komunikatorze. Wszystko, czego nie zapiszesz, znika, gdy tylko zamkniesz kartę.</p><p>Dlatego rzeczy typu "co wybrałem" i "na której stronie jestem" warto trzymać właśnie tam. A rzeczy typu "co mam pod kursorem" - już nie, bo nikt nie chce dostać linku do twojego kursora.</p>',
          en: '<p>Imagine showing a friend a nice view in a map app: a neighbourhood zoomed in, only bakeries visible, sorted by rating.</p><p>If the address bar remembered those settings, you just send the link. Your friend clicks and sees exactly the same thing. If it did not, you have to write instructions: "open filters, tick bakeries, scroll, change the sorting".</p><p>The address is like a note stuck to the fridge. Everything you write on it survives a page reload, the back button, and being pasted into a chat. Everything you do not write on it disappears the moment you close the tab.</p><p>So things like "what I selected" and "which page I am on" are worth keeping there. Things like "what my cursor is hovering" are not - nobody wants a link to your cursor.</p>'
        },
        school: {
          pl: '<p>URL to najstarszy i najbardziej niedoceniany menedżer stanu. Jest współdzielony, trwały po odświeżeniu, obsługuje przycisk wstecz i nie wymaga ani jednej linijki biblioteki.</p><p>Model mentalny jest ten sam w Vue i w Reactcie, różni się API. Vue Router daje ci reaktywne <code>route.query</code>, więc czytasz je jak każdy inny stan. React Router w wersji 6 i 7 daje parę w stylu <code>useState</code>.</p><pre><code>// Vue Router\nconst route = useRoute()\nconst router = useRouter()\nconst status = computed(() =&gt; route.query.status ?? "open")\nfunction setStatus(v) {\n  router.replace({ query: { ...route.query, status: v } })\n}</code></pre><pre><code>// React Router\nconst [params, setParams] = useSearchParams()\nconst status = params.get("status") ?? "open"\nfunction setStatus(v) {\n  const next = new URLSearchParams(params)\n  next.set("status", v)\n  setParams(next, { replace: true })\n}</code></pre><p>W Vue robiłeś X - traktowałeś <code>route.query</code> jak reaktywny obiekt i często dokładałeś <code>watch</code>, żeby po zmianie filtra pobrać dane. W Reactcie robisz Y - odczyt z URL wpina się prosto w <code>queryKey</code>, bo Z: skoro klucz zawiera filtr, zmiana adresu sama wywołuje nowe pobranie i żaden watcher nie jest potrzebny.</p><pre><code>const { data } = useQuery({\n  queryKey: ["orders", status, page],\n  queryFn: () =&gt; api.list({ status, page }),\n})</code></pre><p>Jedna decyzja, która wraca na każdym projekcie: <code>push</code> czy <code>replace</code>. Nowy wpis w historii ma sens przy świadomej zmianie widoku, na przykład wyborze zakładki. Przy pisaniu w polu wyszukiwania <code>push</code> zapycha historię - dwadzieścia znaków to dwadzieścia kliknięć wstecz. Tam używasz <code>replace</code>, zwykle z debounce.</p><p>Zasada podsumowująca: jeśli użytkownik mógłby chcieć wysłać ten widok koledze albo wrócić do niego jutro z zakładki, wartość należy do URL. Jeśli nie, zostaje w pamięci komponentu.</p>',
          en: '<p>The URL is the oldest and most underrated state manager. It is shareable, survives reloads, supports the back button and needs no library at all.</p><p>The mental model is the same in Vue and React; only the API differs. Vue Router hands you a reactive <code>route.query</code>, so you read it like any other state. React Router 6 and 7 give you a <code>useState</code>-shaped pair.</p><pre><code>// Vue Router\nconst route = useRoute()\nconst router = useRouter()\nconst status = computed(() =&gt; route.query.status ?? "open")\nfunction setStatus(v) {\n  router.replace({ query: { ...route.query, status: v } })\n}</code></pre><pre><code>// React Router\nconst [params, setParams] = useSearchParams()\nconst status = params.get("status") ?? "open"\nfunction setStatus(v) {\n  const next = new URLSearchParams(params)\n  next.set("status", v)\n  setParams(next, { replace: true })\n}</code></pre><p>In Vue you did X - treated <code>route.query</code> as a reactive object and often added a <code>watch</code> to refetch when a filter changed. In React you do Y - the value read from the URL goes straight into the <code>queryKey</code>, because Z: once the key contains the filter, changing the address triggers the fetch by itself and no watcher is needed.</p><pre><code>const { data } = useQuery({\n  queryKey: ["orders", status, page],\n  queryFn: () =&gt; api.list({ status, page }),\n})</code></pre><p>One decision comes back on every project: <code>push</code> or <code>replace</code>. A new history entry makes sense for a deliberate view change, such as picking a tab. While typing in a search box, <code>push</code> floods history - twenty characters means twenty back clicks. There you use <code>replace</code>, usually with a debounce.</p><p>The summarising rule: if a user might want to send this view to a colleague or return to it tomorrow from a bookmark, the value belongs in the URL. If not, it stays in component memory.</p>'
        },
        pro: {
          pl: '<p>Pełna taksonomia stanu w aplikacji frontendowej: stan serwera (cache Query), stan URL (adres), stan globalny klienta (Zustand), stan lokalny (useState), stan formularza (RHF) i stan efemeryczny (useRef, brak rerenderu). Większość sporów o architekturę w zespołach bierze się z wrzucania wszystkiego do jednej z tych szuflad - najczęściej do globalnego store, bo tak było w Pinii.</p><p><strong>Vue robiło X, React robi Y.</strong> Vue Router dostarcza <code>route</code> jako obiekt reaktywny wstrzykiwany do każdego komponentu, więc odczyt query jest darmowy i wszędzie dostępny. React Router udostępnia hooki związane z kontekstem routera, a każda zmiana parametrów rerenderuje wszystkich konsumentów w poddrzewie. Powód (Z): brak drobnoziarnistego trackingu - stąd konwencja odczytu URL możliwie blisko miejsca użycia, a nie w komponencie strony i przekazywania w dół propsami.</p><p>Typowany, deklaratywny odczyt jest w praktyce niezbędny, bo query to zawsze stringi:</p><pre><code>const Filters = z.object({\n  status: z.enum(["open", "closed"]).catch("open"),\n  page: z.coerce.number().int().min(1).catch(1),\n  q: z.string().trim().catch(""),\n});\n\nfunction useFilters() {\n  const [params, setParams] = useSearchParams();\n  const value = Filters.parse(Object.fromEntries(params));\n\n  const set = useCallback((patch: Partial&lt;z.infer&lt;typeof Filters&gt;&gt;, replace = true) =&gt; {\n    const next = new URLSearchParams(params);\n    Object.entries(patch).forEach(([k, v]) =&gt; {\n      if (v === "" || v == null) next.delete(k);   // czysty adres bez pustych parametrow\n      else next.set(k, String(v));\n    });\n    if ("q" in patch || "status" in patch) next.delete("page");  // reset paginacji\n    setParams(next, { replace });\n  }, [params, setParams]);\n\n  return [value, set] as const;\n}</code></pre><p>Rzeczy, które w produkcji rozstrzygają o jakości:</p><ul><li><strong>Reset zależnych parametrów.</strong> Zmiana filtra bez wyzerowania <code>page</code> daje pustą trzecią stronę wyników - klasyczny błąd zgłaszany przez QA.</li><li><strong>Nie serializuj wszystkiego.</strong> Przeglądarki radzą sobie z bardzo długimi adresami, ale serwery i proxy często tną około 2000 znaków, a długie linki psują się w komunikatorach. Duże struktury trzymaj po stronie serwera i odwołuj się do nich identyfikatorem.</li><li><strong>Zero danych wrażliwych.</strong> Adresy trafiają do logów serwera, nagłówka <code>Referer</code> i historii przeglądarki.</li><li><strong>Debounce plus replace</strong> dla pola wyszukiwania; <code>push</code> zostaw na zmianę zakładki lub otwarcie szczegółu, żeby przycisk wstecz robił to, czego użytkownik oczekuje.</li><li><strong>Nawigacja jest asynchroniczna.</strong> W React Routerze 7 z <code>useTransition</code> albo w Next.js z App Routerem stara treść zostaje na ekranie w trakcie przejścia - to dobrze wygląda, ale wymaga wskaźnika oczekiwania, inaczej interfejs sprawia wrażenie zawieszonego.</li><li><strong>Next.js</strong>: <code>useSearchParams</code> jest tylko po stronie klienta i wymusza granicę Suspense; w Server Components ten sam stan czytasz z propsa <code>searchParams</code> i pobierasz dane na serwerze.</li></ul><p>Praktyczny efekt uboczny: gdy filtry siedzą w URL, testy end-to-end i zgłoszenia od QA robią się trywialne. Wystarczy link, żeby odtworzyć stan - bez klikania przez pięć kroków interfejsu.</p>',
          en: '<p>The full state taxonomy in a frontend app: server state (the Query cache), URL state (the address), global client state (Zustand), local state (useState), form state (RHF) and ephemeral state (useRef, no re-render). Most architecture arguments in teams come from dumping everything into one of those drawers - usually the global store, because that is what Pinia trained you to do.</p><p><strong>Vue did X, React does Y.</strong> Vue Router provides <code>route</code> as a reactive object injected into every component, so reading the query is free and available anywhere. React Router exposes hooks tied to router context, and any parameter change re-renders every consumer in the subtree. The reason (Z): no fine-grained tracking - hence the convention of reading the URL as close to its use as possible, rather than reading it in the page component and drilling props down.</p><p>A typed, declarative read is effectively mandatory, because query values are always strings:</p><pre><code>const Filters = z.object({\n  status: z.enum(["open", "closed"]).catch("open"),\n  page: z.coerce.number().int().min(1).catch(1),\n  q: z.string().trim().catch(""),\n});\n\nfunction useFilters() {\n  const [params, setParams] = useSearchParams();\n  const value = Filters.parse(Object.fromEntries(params));\n\n  const set = useCallback((patch: Partial&lt;z.infer&lt;typeof Filters&gt;&gt;, replace = true) =&gt; {\n    const next = new URLSearchParams(params);\n    Object.entries(patch).forEach(([k, v]) =&gt; {\n      if (v === "" || v == null) next.delete(k);   // keep the address clean\n      else next.set(k, String(v));\n    });\n    if ("q" in patch || "status" in patch) next.delete("page");  // reset pagination\n    setParams(next, { replace });\n  }, [params, setParams]);\n\n  return [value, set] as const;\n}</code></pre><p>What decides quality in production:</p><ul><li><strong>Reset dependent parameters.</strong> Changing a filter without clearing <code>page</code> lands the user on an empty page three - a classic QA ticket.</li><li><strong>Do not serialise everything.</strong> Browsers handle very long addresses, but servers and proxies often cut around 2000 characters, and long links break in chat apps. Keep large structures server-side and reference them by id.</li><li><strong>No sensitive data.</strong> URLs end up in server logs, the <code>Referer</code> header and browser history.</li><li><strong>Debounce plus replace</strong> for a search box; keep <code>push</code> for switching tabs or opening a detail view, so the back button does what the user expects.</li><li><strong>Navigation is asynchronous.</strong> In React Router 7 with <code>useTransition</code>, or in Next.js with the App Router, the old content stays on screen during a transition - it looks good but needs a pending indicator, otherwise the UI feels frozen.</li><li><strong>Next.js</strong>: <code>useSearchParams</code> is client-only and forces a Suspense boundary; in Server Components you read the same state from the <code>searchParams</code> prop and fetch on the server.</li></ul><p>A practical side effect: once filters live in the URL, end-to-end tests and QA reports become trivial. A link is enough to reproduce the state - no clicking through five steps of UI.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Który stan najlepiej pasuje do URL?',
            en: 'Which state belongs in the URL?'
          },
          options: [
            { pl: 'Niezapisana wersja robocza formularza', en: 'An unsaved form draft' },
            { pl: 'Aktywny filtr i numer strony listy', en: 'The active filter and the list page number' },
            { pl: 'Token sesji użytkownika', en: 'The user session token' },
            { pl: 'Pozycja przewinięcia i element pod kursorem', en: 'Scroll position and the hovered element' }
          ],
          correct: 1,
          explain: {
            pl: 'Filtry i paginacja to dokładnie ten stan, który użytkownik chce wysłać linkiem i odtworzyć po odświeżeniu. Tokeny nie mogą tam trafić, bo adresy lądują w logach i historii.',
            en: 'Filters and pagination are exactly the state a user wants to share by link and restore after a reload. Tokens must never go there, since URLs land in logs and history.'
          }
        },
        {
          q: {
            pl: 'Jaki jest w React Routerze odpowiednik route.query i router.replace z Vue?',
            en: 'What is the React Router equivalent of Vue route.query and router.replace?'
          },
          options: [
            { pl: 'useNavigate z opcją state', en: 'useNavigate with the state option' },
            { pl: 'useLoaderData', en: 'useLoaderData' },
            { pl: 'useSearchParams i setParams z opcją replace', en: 'useSearchParams plus setParams with the replace option' },
            { pl: 'useLocation z ręcznym parsowaniem hasha', en: 'useLocation with manual hash parsing' }
          ],
          correct: 2,
          explain: {
            pl: 'useSearchParams zwraca parę w stylu useState nad parametrami zapytania, a flaga replace decyduje, czy powstanie nowy wpis w historii.',
            en: 'useSearchParams returns a useState-shaped pair over the query string, and the replace flag decides whether a new history entry is created.'
          }
        },
        {
          q: {
            pl: 'Dlaczego przy zmianie filtra warto usunąć parametr page z adresu?',
            en: 'Why should you drop the page parameter from the URL when a filter changes?'
          },
          options: [
            { pl: 'Bo inaczej użytkownik ląduje na stronie, której w nowym zbiorze wyników już nie ma', en: 'Because otherwise the user lands on a page that no longer exists in the new result set' },
            { pl: 'Bo React Router nie obsługuje dwóch parametrów naraz', en: 'Because React Router cannot handle two parameters at once' },
            { pl: 'Bo paginacja nie może być trzymana w URL', en: 'Because pagination cannot live in the URL' },
            { pl: 'Bo queryKey przyjmuje tylko jedną wartość', en: 'Because a queryKey accepts only one value' }
          ],
          correct: 0,
          explain: {
            pl: 'Zawężenie filtra zwykle skraca listę, więc strona trzecia bywa pusta. Reset zależnych parametrów to obowiązkowy element każdego hooka od filtrów.',
            en: 'Narrowing a filter usually shortens the list, so page three comes back empty. Resetting dependent parameters is a mandatory part of any filter hook.'
          }
        },
        {
          q: {
            pl: 'Pole wyszukiwania zapisuje każdą literę do URL przez push i przycisk wstecz przestał być użyteczny. Co jest właściwym rozwiązaniem?',
            en: 'A search box pushes every letter into the URL and the back button became useless. What is the right fix?'
          },
          options: [
            { pl: 'Przenieść zapytanie do globalnego store i usunąć je z adresu', en: 'Move the query into a global store and remove it from the address' },
            { pl: 'Zablokować przycisk wstecz zdarzeniem beforeunload', en: 'Block the back button with a beforeunload handler' },
            { pl: 'Zapisywać zapytanie z debounce i przez replace zamiast push', en: 'Write the query with a debounce and with replace instead of push' },
            { pl: 'Trzymać zapytanie w useRef i odczytywać dopiero przy submicie', en: 'Keep the query in useRef and read it only on submit' }
          ],
          correct: 2,
          explain: {
            pl: 'replace aktualizuje bieżący wpis historii zamiast dokładać nowy, a debounce ogranicza liczbę zapisów. Adres dalej można wysłać linkiem, a wstecz wraca do poprzedniego widoku.',
            en: 'replace updates the current history entry instead of adding one, and the debounce limits how often you write. The URL stays shareable and back returns to the previous view.'
          }
        }
      ]
    }
  ]
};
