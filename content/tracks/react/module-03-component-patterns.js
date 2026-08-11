// Track: react - module 3: Component patterns (for senior Vue developers).
// Every lesson teaches the React pattern side by side with its Vue 3 equivalent.

export default {
  id: 'component-patterns',
  order: 3,
  icon: '🧩',
  title: {
    pl: 'Wzorce komponentow',
    en: 'Component patterns'
  },
  description: {
    pl: 'Sloty, provide/inject, v-model i renderless components przelozone na children, Context, kontrolowane inputy, compound components oraz Suspense i error boundaries.',
    en: 'Slots, provide/inject, v-model and renderless components mapped onto children, Context, controlled inputs, compound components, Suspense and error boundaries.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'children-vs-slots',
      title: {
        pl: 'children kontra sloty',
        en: 'children vs slots'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'children', en: 'children' },
          def: {
            pl: 'Props, do ktorego kompiluje sie JSX zapisany miedzy tagami komponentu. To wartosc policzona przez rodzica, a nie funkcja wolana przez dziecko jak slot we Vue.',
            en: 'The prop that JSX written between a component tags compiles into. It is a value computed by the parent, not a function called by the child like a Vue slot.'
          }
        },
        {
          term: { pl: 'Props typu element', en: 'Element prop' },
          def: {
            pl: 'Zamiennik slotow nazwanych: zwykly props przyjmujacy JSX, np. <code>header</code> albo <code>footer</code>. W TypeScripcie widac w podpowiedziach, jakie dziury ma komponent.',
            en: 'The replacement for named slots: a plain prop that accepts JSX, such as <code>header</code> or <code>footer</code>. TypeScript then shows in autocomplete what holes the component has.'
          }
        },
        {
          term: { pl: 'ReactNode', en: 'ReactNode' },
          def: {
            pl: 'Typ dla dowolnej tresci renderowalnej. <code>ReactElement</code> bierz tylko wtedy, gdy naprawde potrzebujesz dokladnie jednego elementu.',
            en: 'The type for any renderable content. Reach for <code>ReactElement</code> only when you genuinely need exactly one element.'
          }
        },
        {
          term: { pl: 'cloneElement', en: 'cloneElement' },
          def: {
            pl: 'Reactowy odpowiednik grzebania w VNode-ach dziecka, razem z <code>React.Children.map</code>. Kruchy i odradzany w dokumentacji Reacta 19 - uzyj Contextu.',
            en: 'The React way of rummaging in a child VNode, together with <code>React.Children.map</code>. Fragile and discouraged in the React 19 docs - use Context instead.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l1arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Same hole in the layout, two mechanisms</text>' +
          '<rect x="20" y="50" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="160" y="78" fill="var(--accent2)" font-size="15" text-anchor="middle">Vue: slots</text>' +
          '<rect x="45" y="100" width="230" height="56" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="124" fill="var(--text)" font-size="14" text-anchor="middle">Child template</text>' +
          '<text x="160" y="144" fill="var(--muted)" font-size="13" text-anchor="middle">slot name=header</text>' +
          '<line x1="160" y1="156" x2="160" y2="196" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1arrow)"/>' +
          '<rect x="45" y="200" width="230" height="56" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="224" fill="var(--text)" font-size="14" text-anchor="middle">Compiler builds</text>' +
          '<text x="160" y="244" fill="var(--muted)" font-size="13" text-anchor="middle">slot functions</text>' +
          '<line x1="160" y1="256" x2="160" y2="296" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1arrow)"/>' +
          '<rect x="45" y="300" width="230" height="34" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="160" y="322" fill="var(--ok)" font-size="13" text-anchor="middle">rendered in the hole</text>' +
          '<rect x="340" y="50" width="280" height="300" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="480" y="78" fill="var(--accent)" font-size="15" text-anchor="middle">React: props</text>' +
          '<rect x="365" y="100" width="230" height="56" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="124" fill="var(--text)" font-size="14" text-anchor="middle">JSX in props</text>' +
          '<text x="480" y="144" fill="var(--muted)" font-size="13" text-anchor="middle">children, header</text>' +
          '<line x1="480" y1="156" x2="480" y2="196" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1arrow)"/>' +
          '<rect x="365" y="200" width="230" height="56" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="224" fill="var(--text)" font-size="14" text-anchor="middle">Plain values</text>' +
          '<text x="480" y="244" fill="var(--muted)" font-size="13" text-anchor="middle">elements or functions</text>' +
          '<line x1="480" y1="256" x2="480" y2="296" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1arrow)"/>' +
          '<rect x="365" y="300" width="230" height="34" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="480" y="322" fill="var(--ok)" font-size="13" text-anchor="middle">placed by the parent</text>' +
          '<text x="20" y="378" fill="var(--muted)" font-size="13">No slot API in React: content is just another prop.</text>' +
          '</svg>',
        caption: {
          pl: 'Vue rozwiazuje dziury w layoucie osobnym API slotow; React przekazuje ten sam content jako zwykly props, w tym children.',
          en: 'Vue fills layout holes with a dedicated slot API; React passes the same content as an ordinary prop, children included.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie ramke na zdjecie. Ramka jest zawsze taka sama: ma szklo, tekturke i zawieszke. Ale to, co w niej wisi, wybierasz ty. Ramka nie musi wiedziec, czy w srodku jest kot, dyplom czy rysunek dziecka.</p><p>W komponentach robimy dokladnie to samo. Piszesz raz ladna ramke, na przyklad karte z cieniem i zaokraglonymi rogami, a to, co w niej stoi, wrzuca ktos inny.</p><p>We Vue mowisz ramce: <strong>tu jest dziura, wsadz cos</strong>. Ta dziura nazywa sie slot. W Reactie nie ma zadnej specjalnej dziury. Zawartosc przekazujesz ramce jak kazda inna rzecz, na przyklad jak kolor czy tytul. Nazywa sie to children, czyli po prostu dzieci.</p><p>Efekt jest identyczny. Roznica jest taka, ze Vue ma osobny mechanizm na ten jeden przypadek, a React uzywa tego samego mechanizmu co do wszystkiego innego. Mniej pojec do zapamietania, wiecej swobody.</p>',
          en: '<p>Picture a photo frame. The frame is always the same: glass, backing board, a hook. What hangs inside is up to you. The frame does not need to know whether it holds a cat, a diploma or a childs drawing.</p><p>Components work the same way. You write the pretty frame once, say a card with a shadow and rounded corners, and somebody else drops the content in.</p><p>In Vue you tell the frame: <strong>here is a hole, put something in it</strong>. That hole is called a slot. In React there is no special hole. You hand the content to the frame the same way you hand it a colour or a title. It is called children.</p><p>The result is identical. The difference is that Vue has a dedicated mechanism for this one case, while React reuses the mechanism it already uses for everything else. Fewer concepts to remember, more freedom.</p>'
        },
        school: {
          pl: '<p>We Vue sloty to osobne API jezyka szablonow. Masz <code>slot</code> domyslny, sloty nazwane i scoped slots, ktore oddaja dane z dziecka do rodzica.</p><pre><code>&lt;!-- Vue: Card.vue --&gt;\n&lt;div class="card"&gt;\n  &lt;header&gt;&lt;slot name="header" /&gt;&lt;/header&gt;\n  &lt;slot /&gt;\n&lt;/div&gt;\n\n&lt;!-- uzycie --&gt;\n&lt;Card&gt;\n  &lt;template #header&gt;&lt;h3&gt;Faktura&lt;/h3&gt;&lt;/template&gt;\n  &lt;p&gt;Tresc&lt;/p&gt;\n&lt;/Card&gt;</code></pre><p>W Reactie nie ma slotow, bo nie sa potrzebne. JSX jest wyrazeniem, wiec element mozna wsadzic do zmiennej, do tablicy i do propsa.</p><pre><code>// React: Card.jsx\nfunction Card({ header, children }) {\n  return (\n    &lt;div className="card"&gt;\n      &lt;header&gt;{header}&lt;/header&gt;\n      {children}\n    &lt;/div&gt;\n  );\n}\n\n&lt;Card header={&lt;h3&gt;Faktura&lt;/h3&gt;}&gt;\n  &lt;p&gt;Tresc&lt;/p&gt;\n&lt;/Card&gt;</code></pre><p><strong>We Vue robiles slot domyslny, w Reactie robisz props <code>children</code>, bo JSX miedzy tagami to tylko cukier skladniowy na ten wlasnie props.</strong> Dosłownie: <code>&lt;Card&gt;x&lt;/Card&gt;</code> kompiluje sie do <code>createElement(Card, null, x)</code>.</p><p>Sloty nazwane zamieniasz na zwykle propsy typu element: <code>header</code>, <code>footer</code>, <code>actions</code>. Konwencja w duzych design systemach jest taka, ze glowna tresc idzie przez <code>children</code>, a wszystko dodatkowe przez nazwane propsy. Dzieki temu w TypeScripcie widzisz w podpowiedziach, jakie dziury ma komponent, czego przy slotach Vue nie dostajesz za darmo.</p><p>Scoped slots to osobna historia: skoro dziecko ma oddac dane, props musi byc funkcja, a nie gotowym elementem. O tym w lekcji o render props.</p><p>Warto tez zapamietac jedna drobna roznice w codziennej pracy: we Vue pytasz o obecnosc slota przez <code>$slots.header</code>, a w Reactie po prostu sprawdzasz, czy props zostal podany. Zero dodatkowego API, zwykly warunek w JavaScripcie.</p>',
          en: '<p>In Vue, slots are a separate template-language API. You get the default <code>slot</code>, named slots and scoped slots, which hand data from the child back to the parent.</p><pre><code>&lt;!-- Vue: Card.vue --&gt;\n&lt;div class="card"&gt;\n  &lt;header&gt;&lt;slot name="header" /&gt;&lt;/header&gt;\n  &lt;slot /&gt;\n&lt;/div&gt;\n\n&lt;!-- usage --&gt;\n&lt;Card&gt;\n  &lt;template #header&gt;&lt;h3&gt;Invoice&lt;/h3&gt;&lt;/template&gt;\n  &lt;p&gt;Body&lt;/p&gt;\n&lt;/Card&gt;</code></pre><p>React has no slots because it does not need them. JSX is an expression, so an element can live in a variable, an array or a prop.</p><pre><code>// React: Card.jsx\nfunction Card({ header, children }) {\n  return (\n    &lt;div className="card"&gt;\n      &lt;header&gt;{header}&lt;/header&gt;\n      {children}\n    &lt;/div&gt;\n  );\n}\n\n&lt;Card header={&lt;h3&gt;Invoice&lt;/h3&gt;}&gt;\n  &lt;p&gt;Body&lt;/p&gt;\n&lt;/Card&gt;</code></pre><p><strong>In Vue you wrote a default slot, in React you read the <code>children</code> prop, because JSX between the tags is only syntax sugar for that prop.</strong> Literally: <code>&lt;Card&gt;x&lt;/Card&gt;</code> compiles to <code>createElement(Card, null, x)</code>.</p><p>Named slots become ordinary element-typed props: <code>header</code>, <code>footer</code>, <code>actions</code>. The convention in large design systems is that the main body arrives through <code>children</code> and everything extra through named props. In TypeScript your editor then lists every hole the component has, which Vue slots do not give you for free.</p><p>Scoped slots are a different story: if the child must hand data back, the prop has to be a function rather than a finished element. That is the render-props lesson.</p>'
        },
        pro: {
          pl: '<p>Kluczowa zmiana modelu: we Vue slot jest <em>funkcja renderujaca</em> tworzona przez kompilator i wywolywana przez dziecko. W Reactie <code>children</code> to <em>wartosc</em>, zwykle drzewo elementow, ktore rodzic policzyl zanim dziecko w ogole ruszylo.</p><pre><code>// Vue: slot jest lazy, dziecko decyduje czy go wywolac\n&lt;template&gt;\n  &lt;div v-if="open"&gt;&lt;slot /&gt;&lt;/div&gt;\n&lt;/template&gt;\n\n// React: element jest juz stworzony, ale NIE zamontowany\nfunction Panel({ open, children }) {\n  return open ? &lt;div&gt;{children}&lt;/div&gt; : null;\n}</code></pre><p>Roznica jest subtelna i wazna. <code>&lt;Heavy /&gt;</code> jako children tworzy jedynie obiekt opisu (typ plus propsy) - to kosztuje nanosekundy. Ciala komponentu React nie wykona, dopoki nie znajdzie sie w zwroconym drzewie. Natomiast <strong>wyrazenia</strong> w propsach licza sie od razu: <code>header={expensiveCalc()}</code> policzy sie zawsze. We Vue slot by tego nie policzyl. Jesli musisz zachowac leniwosc, przekaz funkcje: <code>renderHeader={() =&gt; expensiveCalc()}</code>.</p><p>Druga roznica dotyczy tozsamosci. Kiedy rodzic sie przerenderowuje, tworzy nowe obiekty elementow dla children, wiec <code>React.memo</code> na dziecku nie pomoze, jesli children sa inline. Znany trik:</p><pre><code>// children jako props: zmiana stanu Layout nie odswieza Sidebar\nfunction Layout({ children }) {\n  const [tab, setTab] = useState(0);\n  return &lt;main&gt;{children}&lt;/main&gt;;\n}\n&lt;Layout&gt;&lt;Sidebar /&gt;&lt;/Layout&gt;</code></pre><p>Element <code>&lt;Sidebar /&gt;</code> powstal w komponencie nadrzednym; stan <code>tab</code> wewnatrz <code>Layout</code> go nie unieważnia, wiec React porownuje ten sam obiekt i pomija poddrzewo. To reactowy odpowiednik tego, co we Vue dostajesz z automatu dzieki granularnej reaktywnosci.</p><p>Praktyka produkcyjna:</p><ul><li>Typuj jako <code>React.ReactNode</code> dla contentu i <code>React.ReactElement</code>, gdy naprawde potrzebujesz jednego elementu.</li><li>Unikaj <code>React.Children.map</code> i <code>cloneElement</code> - to reactowy odpowiednik grzebania w VNode-ach dziecka, kruchy i oficjalnie odradzany w dokumentacji React 19. Zamiast tego uzyj Context (patrz nastepna lekcja).</li><li>Puste children to <code>undefined</code>, nie pusta tablica. Sprawdzaj <code>children == null</code>, nie <code>children.length</code>.</li><li>Nie ma odpowiednika <code>$slots.header</code>, ale <code>props.header == null</code> daje ci to samo pytanie: czy rodzic cos podal.</li></ul><p>Na rozmowie pada: czym rozni sie slot od children. Dobra odpowiedz: slot jest funkcja wywolywana przez dziecko, children sa wartoscia obliczona przez rodzica, i z tego wynikaja roznice w leniwosci oraz w tym, kiedy poddrzewo sie przerenderowuje.</p>',
          en: '<p>The model shift that matters: in Vue a slot is a <em>render function</em> produced by the compiler and invoked by the child. In React <code>children</code> is a <em>value</em>, an element tree the parent already built before the child ran at all.</p><pre><code>// Vue: the slot is lazy, the child decides whether to call it\n&lt;template&gt;\n  &lt;div v-if="open"&gt;&lt;slot /&gt;&lt;/div&gt;\n&lt;/template&gt;\n\n// React: the element exists, but is NOT mounted\nfunction Panel({ open, children }) {\n  return open ? &lt;div&gt;{children}&lt;/div&gt; : null;\n}</code></pre><p>The difference is subtle and important. <code>&lt;Heavy /&gt;</code> as children only allocates a descriptor object (type plus props) - nanoseconds. React will not run the component body until it appears in a returned tree. But <strong>expressions</strong> in props evaluate immediately: <code>header={expensiveCalc()}</code> always runs. A Vue slot would not have run it. If you need laziness back, pass a function: <code>renderHeader={() =&gt; expensiveCalc()}</code>.</p><p>The second difference is identity. When a parent re-renders it builds fresh element objects for its children, so <code>React.memo</code> on the child cannot help if the children are inline. Hence the classic trick:</p><pre><code>// children as a prop: Layout state does not refresh Sidebar\nfunction Layout({ children }) {\n  const [tab, setTab] = useState(0);\n  return &lt;main&gt;{children}&lt;/main&gt;;\n}\n&lt;Layout&gt;&lt;Sidebar /&gt;&lt;/Layout&gt;</code></pre><p><code>&lt;Sidebar /&gt;</code> was created by the grandparent; the <code>tab</code> state inside <code>Layout</code> does not invalidate it, so React compares the identical object and skips the subtree. This is the React equivalent of what Vue gives you automatically through fine-grained reactivity.</p><p>Production notes:</p><ul><li>Type content as <code>React.ReactNode</code>, and <code>React.ReactElement</code> only when you truly need a single element.</li><li>Avoid <code>React.Children.map</code> and <code>cloneElement</code> - that is the React equivalent of poking at a childs VNodes: brittle, and explicitly discouraged in the React 19 docs. Use Context instead (next lesson).</li><li>Empty children is <code>undefined</code>, not an empty array. Check <code>children == null</code>, never <code>children.length</code>.</li><li>There is no <code>$slots.header</code> equivalent, but <code>props.header == null</code> answers the same question: did the parent supply anything.</li></ul><p>Interview question: how does a slot differ from children. Good answer: a slot is a function the child calls, children is a value the parent computed, and that produces the differences in laziness and in when a subtree re-renders.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w Reactie odpowiada domyslnemu slotowi z Vue?',
            en: 'What is the React counterpart of the Vue default slot?'
          },
          options: [
            { pl: 'Specjalny komponent Slot z biblioteki react-dom', en: 'A special Slot component from react-dom' },
            { pl: 'Props children, czyli JSX zapisany miedzy tagami komponentu', en: 'The children prop, that is the JSX written between the component tags' },
            { pl: 'Dyrektywa v-slot dostepna w JSX', en: 'A v-slot directive available in JSX' },
            { pl: 'Hook useSlot', en: 'The useSlot hook' }
          ],
          correct: 1,
          explain: {
            pl: 'JSX miedzy tagami kompiluje sie do trzeciego argumentu createElement, czyli do propsa children. Zadnego osobnego API nie ma.',
            en: 'JSX between the tags compiles to the third argument of createElement, which is the children prop. There is no separate API.'
          }
        },
        {
          q: {
            pl: 'Slot Vue jest leniwy. Co jest odpowiednikiem tej leniwosci w Reactie?',
            en: 'A Vue slot is lazy. What corresponds to that laziness in React?'
          },
          options: [
            { pl: 'Element w children powstaje od razu, ale komponent nie wykona sie dopoki nie trafi do zwroconego drzewa', en: 'The children element is created immediately, but the component body does not run until it lands in the returned tree' },
            { pl: 'React w ogole nie tworzy elementow, dopoki nie sa widoczne', en: 'React does not create elements at all until they are visible' },
            { pl: 'Kazdy props jest obliczany leniwie', en: 'Every prop is evaluated lazily' },
            { pl: 'Leniwosc dziala tylko z React.lazy', en: 'Laziness only exists with React.lazy' }
          ],
          correct: 0,
          explain: {
            pl: 'Tworzenie elementu to tani obiekt opisu. Prawdziwe wywolanie funkcji komponentu nastepuje przy renderze. Ale wyrazenia w propsach licza sie natychmiast - tu leniwosci nie ma.',
            en: 'Creating an element is a cheap descriptor object; the component function runs only at render time. Expressions inside props, however, evaluate at once - no laziness there.'
          }
        },
        {
          q: {
            pl: 'Jak przelozysz slot nazwany header na Reacta zgodnie z dobra praktyka?',
            en: 'What is the idiomatic React translation of a named header slot?'
          },
          options: [
            { pl: 'Przeszukac children i wyciagnac element o odpowiednim typie', en: 'Scan children and pull out the element with the right type' },
            { pl: 'Uzyc cloneElement na pierwszym dziecku', en: 'Use cloneElement on the first child' },
            { pl: 'Dodac zwykly props header typu ReactNode', en: 'Add an ordinary header prop typed as ReactNode' },
            { pl: 'Zdefiniowac globalny Context o nazwie header', en: 'Define a global Context named header' }
          ],
          correct: 2,
          explain: {
            pl: 'Nazwany props jest jawny, widoczny w typach i nie zalezy od kolejnosci dzieci. Grzebanie w children jest kruche i odradzane.',
            en: 'A named prop is explicit, visible in the types and independent of child ordering. Inspecting children is brittle and discouraged.'
          }
        },
        {
          q: {
            pl: 'Layout ma wlasny stan i renderuje {children}. Dlaczego kosztowny Sidebar podany jako children nie przerenderowuje sie przy zmianie tego stanu?',
            en: 'Layout has its own state and renders {children}. Why does an expensive Sidebar passed as children not re-render when that state changes?'
          },
          options: [
            { pl: 'Bo children sa domyslnie owiniete w React.memo', en: 'Because children are wrapped in React.memo by default' },
            { pl: 'Bo element Sidebar stworzyl komponent nadrzedny i to ten sam obiekt, wiec React pomija poddrzewo', en: 'Because the Sidebar element was created by the grandparent and is the same object, so React skips the subtree' },
            { pl: 'Bo React porownuje wyrenderowany DOM i nie widzi roznic', en: 'Because React diffs the rendered DOM and sees no differences' },
            { pl: 'Bo przerenderuje sie zawsze, to pytanie z bledem', en: 'It does re-render; the question is wrong' }
          ],
          correct: 1,
          explain: {
            pl: 'Stan Layoutu nie tworzy nowego elementu dla children. React widzi identyczna referencje i nie schodzi glebiej. To najtanszy sposob na optymalizacje bez memo.',
            en: 'Layout state does not create a new element for children. React sees an identical reference and stops descending. It is the cheapest optimisation available without memo.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'context-vs-provide-inject',
      title: {
        pl: 'Context kontra provide/inject',
        en: 'Context vs provide/inject'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Context', en: 'Context' },
          def: {
            pl: 'Mechanizm dystrybucji wartosci w dol drzewa, odpowiednik <code>provide</code> i <code>inject</code>. Nie jest store: nie ma selektorow, wiec zmiana wartosci budzi wszystkich konsumentow.',
            en: 'A mechanism for distributing a value down the tree, the counterpart of <code>provide</code> and <code>inject</code>. It is not a store: no selectors, so a value change wakes every consumer.'
          }
        },
        {
          term: { pl: 'Stabilna wartosc providera', en: 'Stable provider value' },
          def: {
            pl: 'Nowy obiekt literalny w propsie <code>value</code> renderuje wszystkich konsumentow na kazdy render providera. Ratunkiem jest <code>useMemo</code> na wartosci.',
            en: 'A fresh object literal in the <code>value</code> prop re-renders every consumer on each provider render. The fix is a <code>useMemo</code> around the value.'
          }
        },
        {
          term: { pl: 'Podzial contextu', en: 'Context splitting' },
          def: {
            pl: 'Rozbicie jednego duzego contextu na rzadko zmienne <em>akcje</em> i czesto zmienny <em>stan</em>. Komponent wolajacy tylko <code>logout</code> przestaje sie wtedy renderowac przy kazdej zmianie danych.',
            en: 'Splitting one large context into rarely changing <em>actions</em> and frequently changing <em>state</em>. A component that only calls <code>logout</code> then stops re-rendering on every data change.'
          }
        },
        {
          term: { pl: 'Domyslna wartosc contextu', en: 'Context default value' },
          def: {
            pl: 'Cicha pulapka: komponent uzyty poza providerem dostaje ja bez ostrzezenia. Przekaz <code>null</code> i opakuj odczyt w hooka, ktory rzuca bledem.',
            en: 'A silent trap: a component used outside the provider gets it with no warning. Pass <code>null</code> and wrap the read in a hook that throws.'
          }
        },
        {
          term: { pl: 'Pozycja renderu, nie DOM', en: 'Render position, not DOM' },
          def: {
            pl: 'Context czyta sie w gore od miejsca, w ktorym element powstal. Gdy komponent przyszedl przez <code>children</code>, providerem jest ten, kto ten element stworzyl.',
            en: 'Context is read upward from where the element was created. When a component arrived via <code>children</code>, its provider is whoever created that element.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l2arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Value travels down the tree, not through props</text>' +
          '<rect x="220" y="50" width="200" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="74" fill="var(--text)" font-size="14" text-anchor="middle">Provider</text>' +
          '<text x="320" y="94" fill="var(--muted)" font-size="13" text-anchor="middle">theme = dark</text>' +
          '<line x1="320" y1="106" x2="320" y2="146" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l2arrow)"/>' +
          '<rect x="220" y="150" width="200" height="50" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="181" fill="var(--muted)" font-size="14" text-anchor="middle">Layout (no props)</text>' +
          '<line x1="320" y1="200" x2="320" y2="240" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l2arrow)"/>' +
          '<rect x="220" y="244" width="200" height="50" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="275" fill="var(--muted)" font-size="14" text-anchor="middle">Panel (no props)</text>' +
          '<line x1="320" y1="294" x2="320" y2="334" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l2arrow)"/>' +
          '<rect x="180" y="338" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="362" fill="var(--ok)" font-size="14" text-anchor="middle">Consumer</text>' +
          '<text x="320" y="382" fill="var(--muted)" font-size="13" text-anchor="middle">use(Ctx) / inject(key)</text>' +
          '<rect x="20" y="150" width="170" height="90" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="180" fill="var(--accent2)" font-size="13" text-anchor="middle">Vue</text>' +
          '<text x="105" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">ref stays reactive</text>' +
          '<text x="105" y="222" fill="var(--muted)" font-size="13" text-anchor="middle">only users update</text>' +
          '<rect x="450" y="150" width="170" height="90" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="535" y="180" fill="var(--accent)" font-size="13" text-anchor="middle">React</text>' +
          '<text x="535" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">new value re-renders</text>' +
          '<text x="535" y="222" fill="var(--warn)" font-size="13" text-anchor="middle">every consumer</text>' +
          '</svg>',
        caption: {
          pl: 'Oba mechanizmy omijaja props drilling, ale Vue przekazuje reaktywna referencje, a React nowa wartosc, ktora budzi wszystkich konsumentow.',
          en: 'Both mechanisms skip prop drilling, but Vue passes a reactive reference while React passes a new value that wakes every consumer.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie stary dom, w ktorym na parterze stoi radio. Radio gra na caly dom. Nikt nie musi biegac po schodach i powtarzać kazdemu pietru, jaka piosenka leci. Wystarczy, ze ktokolwiek chce posluchac, otworzy drzwi pokoju.</p><p>W aplikacji jest podobnie. Czasem cos dotyczy calego domu: motyw jasny albo ciemny, zalogowany uzytkownik, jezyk. Podawanie tego pokoj po pokoju byloby meczace, bo srodkowe pietra wcale tego nie potrzebuja - tylko przekazuja dalej.</p><p>Wiec zamiast tego wlaczamy radio. Ktos na gorze mowi: <strong>od teraz gra ciemny motyw</strong>. Kazdy pokoj nizej moze tego posluchac bez pytania sasiada.</p><p>Vue i React maja obie takie radio, tylko inaczej nazwane. I jest jeden haczyk: w Reactie, gdy zmienisz piosenke, budzi sie kazdy pokoj, ktory sluchal - nawet jesli chcial tylko glosnosc. Trzeba to robic z glowa.</p>',
          en: '<p>Picture an old house with a radio in the hallway downstairs. The radio plays through the whole house. Nobody has to run up the stairs telling each floor which song is on. Anyone who wants to listen just opens their door.</p><p>Apps are the same. Some things concern the whole house: light or dark theme, the signed-in user, the language. Passing that room by room would be exhausting, because the middle floors do not need it at all - they only forward it.</p><p>So we switch the radio on instead. Someone at the top says: <strong>from now on the dark theme is playing</strong>. Every room below can listen without asking a neighbour.</p><p>Vue and React both have this radio, under different names. There is one catch: in React, when the song changes, every listening room wakes up - even the one that only cared about the volume. You have to use it thoughtfully.</p>'
        },
        school: {
          pl: '<p>Problem jest ten sam w obu bibliotekach: props drilling, czyli przepychanie wartosci przez piec komponentow, z ktorych cztery jej nie uzywaja.</p><pre><code>// Vue: provide / inject\n// Theme.vue (rodzic)\nconst theme = ref("dark");\nprovide("theme", theme);\n\n// Button.vue (gdziekolwiek nizej)\nconst theme = inject("theme");\n// theme.value dziala reaktywnie</code></pre><pre><code>// React: Context\nconst ThemeContext = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("dark");\n  return (\n    &lt;ThemeContext value={theme}&gt;\n      &lt;Page /&gt;\n    &lt;/ThemeContext&gt;\n  );\n}\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n}</code></pre><p><strong>We Vue wstrzykiwales reaktywna referencje, w Reactie przekazujesz zwykla wartosc, bo React nie ma reaktywnosci na poziomie obiektu - ma tylko rendery.</strong> Konsekwencja: we Vue zmiana <code>theme.value</code> odswieza dokladnie te komponenty, ktore czytaja te referencje. W Reactie nowa wartosc contextu powoduje ponowny render <em>wszystkich</em> konsumentow, nawet jesli czytaja tylko jedno pole obiektu.</p><p>Druga roznica to klucze. Vue uzywa stringa lub <code>InjectionKey</code>, wiec latwo o literowke i o brak typu. React uzywa obiektu contextu, wiec pomylka jest niemozliwa, a typ wynika z <code>createContext&lt;Theme&gt;()</code>.</p><p>Trzecia: w React 19 <code>&lt;ThemeContext&gt;</code> jest samo w sobie providerem, <code>.Provider</code> nie jest juz potrzebny, a nowy hook <code>use(ThemeContext)</code> mozna wywolac warunkowo, czego <code>useContext</code> nie pozwalal.</p><p>Zasada praktyczna, ta sama co we Vue: context sluzy do rzeczy rzadko zmiennych i szeroko potrzebnych. Do stanu, ktory zmienia sie co klikniecie, uzyj Zustand albo TanStack Query - dokladnie tak, jak we Vue siegasz po Pinie zamiast po provide.</p>',
          en: '<p>The problem is identical in both libraries: prop drilling, pushing a value through five components of which four never use it.</p><pre><code>// Vue: provide / inject\n// Theme.vue (parent)\nconst theme = ref("dark");\nprovide("theme", theme);\n\n// Button.vue (anywhere below)\nconst theme = inject("theme");\n// theme.value is reactive</code></pre><pre><code>// React: Context\nconst ThemeContext = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("dark");\n  return (\n    &lt;ThemeContext value={theme}&gt;\n      &lt;Page /&gt;\n    &lt;/ThemeContext&gt;\n  );\n}\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n}</code></pre><p><strong>In Vue you injected a reactive reference; in React you pass a plain value, because React has no object-level reactivity - it only has renders.</strong> The consequence: in Vue, changing <code>theme.value</code> refreshes exactly the components that read that ref. In React a new context value re-renders <em>every</em> consumer, even one that reads a single field of an object.</p><p>Second difference: keys. Vue uses a string or an <code>InjectionKey</code>, so typos and missing types are easy. React uses the context object itself, so a mismatch is impossible and the type follows from <code>createContext&lt;Theme&gt;()</code>.</p><p>Third: in React 19 <code>&lt;ThemeContext&gt;</code> is the provider itself, <code>.Provider</code> is no longer needed, and the new <code>use(ThemeContext)</code> hook may be called conditionally, which <code>useContext</code> never allowed.</p><p>The rule of thumb is the one you already apply in Vue: context is for rarely changing, widely needed values. For state that changes on every click reach for Zustand or TanStack Query, exactly as you reach for Pinia instead of provide.</p>'
        },
        pro: {
          pl: '<p>Wydajnosc jest tu jedyna prawdziwa roznica architektoniczna. Vue subskrybuje efekt renderujacy do konkretnego <code>ref</code>. React nie subskrybuje niczego - propaguje zmiane po drzewie i budzi kazdy komponent, ktory zawolal <code>useContext</code> dla tego contextu. <code>React.memo</code> po drodze tego nie zatrzyma.</p><pre><code>// ANTYWZORZEC: nowy obiekt przy kazdym renderze\n&lt;AuthContext value={{ user, login, logout }}&gt;\n\n// LEPIEJ: stabilna referencja\nconst value = useMemo(\n  () =&gt; ({ user, login, logout }),\n  [user, login, logout]\n);\n&lt;AuthContext value={value}&gt;</code></pre><p>Standardowy chwyt na duze konteksty to rozbicie na dwa: osobno rzadko zmienne <em>akcje</em> (stabilne na zawsze), osobno czesto zmienny <em>stan</em>. Komponent, ktory tylko wywoluje <code>logout</code>, nie przerenderuje sie przy kazdej zmianie usera.</p><pre><code>const StateCtx = createContext(null);\nconst ActionsCtx = createContext(null);\n\nfunction Provider({ children }) {\n  const [state, dispatch] = useReducer(reducer, init);\n  const actions = useMemo(() =&gt; ({\n    login: (u) =&gt; dispatch({ type: "login", u }),\n    logout: () =&gt; dispatch({ type: "logout" }),\n  }), []);\n  return (\n    &lt;ActionsCtx value={actions}&gt;\n      &lt;StateCtx value={state}&gt;{children}&lt;/StateCtx&gt;\n    &lt;/ActionsCtx&gt;\n  );\n}</code></pre><p>Co jeszcze warto wiedziec:</p><ul><li>Domyslna wartosc z <code>createContext</code> jest cicha pulapka - komponent uzyty poza providerem dostanie ja bez ostrzezenia. Daj <code>null</code> i wlasny hook, ktory rzuca blad. To odpowiednik <code>inject(key)</code> bez wartosci domyslnej.</li><li>Context czyta sie w gore od miejsca renderu, nie od miejsca w DOM. Jesli komponent trafil tam przez <code>children</code>, providerem jest ten, ktory element <em>stworzyl</em>, dokladnie jak w Vue.</li><li>Zagniezdzone providery nadpisuja sie po poddrzewie - to samo zachowanie co przy <code>provide</code> w Vue i to jest kanoniczna technika w compound components.</li><li>W RSC (React Server Components) context nie dziala w komponentach serwerowych. Provider musi byc plikiem z <code>use client</code>. We Vue z Nuxtem tego ograniczenia nie ma.</li><li>Gdy dane sa duze i selektywnie czytane, uzyj <code>useSyncExternalStore</code> albo od razu Zustand. Zustand jest tu odpowiednikiem Pinii, w tym z selektorami, ktorych Context nie ma.</li></ul><p>Pytanie rekrutacyjne: dlaczego Context nie zastepuje Reduxa. Odpowiedz: Context jest mechanizmem dystrybucji, nie sklepem stanu - nie ma selektorow, wiec kazda zmiana wartosci to render wszystkich konsumentow.</p>',
          en: '<p>Performance is the one real architectural difference. Vue subscribes a render effect to a specific <code>ref</code>. React subscribes to nothing - it propagates the change down the tree and wakes every component that called <code>useContext</code> for that context. A <code>React.memo</code> in between will not stop it.</p><pre><code>// ANTIPATTERN: a new object on every render\n&lt;AuthContext value={{ user, login, logout }}&gt;\n\n// BETTER: a stable reference\nconst value = useMemo(\n  () =&gt; ({ user, login, logout }),\n  [user, login, logout]\n);\n&lt;AuthContext value={value}&gt;</code></pre><p>The standard remedy for a large context is splitting it in two: rarely changing <em>actions</em> (stable forever) in one, frequently changing <em>state</em> in the other. A component that only calls <code>logout</code> then survives every user update.</p><pre><code>const StateCtx = createContext(null);\nconst ActionsCtx = createContext(null);\n\nfunction Provider({ children }) {\n  const [state, dispatch] = useReducer(reducer, init);\n  const actions = useMemo(() =&gt; ({\n    login: (u) =&gt; dispatch({ type: "login", u }),\n    logout: () =&gt; dispatch({ type: "logout" }),\n  }), []);\n  return (\n    &lt;ActionsCtx value={actions}&gt;\n      &lt;StateCtx value={state}&gt;{children}&lt;/StateCtx&gt;\n    &lt;/ActionsCtx&gt;\n  );\n}</code></pre><p>Other things worth knowing:</p><ul><li>The default value from <code>createContext</code> is a silent trap - a component used outside the provider gets it with no warning. Pass <code>null</code> and wrap it in a hook that throws. That is the equivalent of <code>inject(key)</code> with no default.</li><li>Context is read upward from the render position, not the DOM position. If a component arrived via <code>children</code>, the provider is whoever <em>created</em> the element, exactly as in Vue.</li><li>Nested providers shadow each other per subtree - the same behaviour as nested <code>provide</code> in Vue, and the canonical technique behind compound components.</li><li>Under RSC (React Server Components) context does not work in server components; the provider must live in a <code>use client</code> file. Vue with Nuxt has no such restriction.</li><li>When the data is large and read selectively, use <code>useSyncExternalStore</code> or go straight to Zustand. Zustand is the Pinia equivalent here, selectors included - something Context lacks.</li></ul><p>Interview question: why does Context not replace Redux. Answer: Context is a distribution mechanism, not a store - it has no selectors, so any value change re-renders every consumer.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktora para odpowiada sobie najlepiej?',
            en: 'Which pair maps onto each other best?'
          },
          options: [
            { pl: 'provide/inject we Vue i Context w Reactie', en: 'Vue provide/inject and React Context' },
            { pl: 'provide/inject we Vue i useState w Reactie', en: 'Vue provide/inject and React useState' },
            { pl: 'provide/inject we Vue i props w Reactie', en: 'Vue provide/inject and React props' },
            { pl: 'provide/inject we Vue i useRef w Reactie', en: 'Vue provide/inject and React useRef' }
          ],
          correct: 0,
          explain: {
            pl: 'Oba rozwiazuja ten sam problem: udostepnienie wartosci calemu poddrzewu z pominieciem posrednich komponentow.',
            en: 'Both solve the same problem: exposing a value to a whole subtree while skipping the intermediate components.'
          }
        },
        {
          q: {
            pl: 'Dlaczego przekazanie do providera obiektu tworzonego inline jest problemem?',
            en: 'Why is passing an inline-created object to a provider a problem?'
          },
          options: [
            { pl: 'React zabrania obiektow w contextcie', en: 'React forbids objects in context' },
            { pl: 'Kazdy render rodzica tworzy nowa referencje, wiec wszyscy konsumenci renderuja sie ponownie', en: 'Every parent render creates a new reference, so all consumers re-render' },
            { pl: 'Obiekt nie przechodzi przez granice RSC', en: 'The object cannot cross the RSC boundary' },
            { pl: 'Powstaje wyciek pamieci', en: 'It leaks memory' }
          ],
          correct: 1,
          explain: {
            pl: 'React porownuje wartosc contextu przez Object.is. Nowy obiekt to nowa wartosc, wiec budzi kazdego konsumenta. Ratunkiem jest useMemo albo rozbicie contextu.',
            en: 'React compares the context value with Object.is. A fresh object is a new value, so it wakes every consumer. The fix is useMemo or splitting the context.'
          }
        },
        {
          q: {
            pl: 'We Vue inject zwraca ref i tylko komponenty czytajace go sie odswiezaja. Co jest najblizsza odpowiednia strategia w Reactie?',
            en: 'In Vue inject returns a ref and only the components reading it refresh. What is the closest React strategy?'
          },
          options: [
            { pl: 'Owinac konsumentow w React.memo', en: 'Wrap consumers in React.memo' },
            { pl: 'Uzyc useRef zamiast useState w providerze', en: 'Use useRef instead of useState in the provider' },
            { pl: 'Rozbic context na kilka mniejszych albo uzyc sklepu z selektorami, np. Zustand', en: 'Split the context into smaller ones, or use a store with selectors such as Zustand' },
            { pl: 'Wywolywac useContext warunkowo', en: 'Call useContext conditionally' }
          ],
          correct: 2,
          explain: {
            pl: 'Context nie ma selektorow, wiec granularnosc uzyskujesz dzielac go na mniejsze konteksty albo wychodzac do sklepu z subskrypcja per selektor. memo nie zatrzymuje propagacji contextu.',
            en: 'Context has no selectors, so granularity comes from splitting it or moving to a store with per-selector subscriptions. memo does not stop context propagation.'
          }
        },
        {
          q: {
            pl: 'Komponent uzyty poza providerem czyta context stworzony przez createContext("light"). Co sie stanie?',
            en: 'A component used outside the provider reads a context created with createContext("light"). What happens?'
          },
          options: [
            { pl: 'React rzuci blad w trybie deweloperskim', en: 'React throws in development mode' },
            { pl: 'Dostanie undefined i komponent sie wywali', en: 'It receives undefined and the component crashes' },
            { pl: 'Renderowanie zostanie zawieszone do czasu pojawienia sie providera', en: 'Rendering suspends until a provider appears' },
            { pl: 'Cicho dostanie wartosc domyslna "light" i blad wyjdzie dopiero na produkcji', en: 'It silently gets the default "light" and the bug surfaces only in production' }
          ],
          correct: 3,
          explain: {
            pl: 'Wartosc domyslna maskuje brak providera. Dlatego w produkcyjnym kodzie daje sie null i wlasny hook rzucajacy czytelny blad, podobnie jak inject bez wartosci domyslnej we Vue.',
            en: 'The default value masks a missing provider. That is why production code passes null and adds a hook that throws a readable error, much like inject without a default in Vue.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'controlled-vs-vmodel',
      title: {
        pl: 'Kontrolowane inputy kontra v-model',
        en: 'Controlled inputs vs v-model'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Controlled input', en: 'Controlled input' },
          def: {
            pl: 'Pole, dla ktorego jedynym zrodlem prawdy jest stan Reacta, a DOM jest tylko widokiem. Wlacza je props <code>value</code> plus <code>onChange</code>.',
            en: 'A field whose single source of truth is React state, with the DOM as a view only. The <code>value</code> prop plus <code>onChange</code> turns it on.'
          }
        },
        {
          term: { pl: 'Uncontrolled input', en: 'Uncontrolled input' },
          def: {
            pl: 'Pole, w ktorym prawda zyje w DOM, a wartosc czytasz refem albo z <code>FormData</code>. Wlacza je <code>defaultValue</code> i kosztuje zero renderow na znak.',
            en: 'A field whose truth lives in the DOM, read through a ref or from <code>FormData</code>. Turned on with <code>defaultValue</code>, it costs zero renders per character.'
          }
        },
        {
          term: { pl: 'Przelaczenie controlled na uncontrolled', en: 'Controlled to uncontrolled switch' },
          def: {
            pl: 'Zmiana <code>value</code> z <code>undefined</code> na string w trakcie zycia pola daje ostrzezenie Reacta i realny blad. Pisz <code>value={data?.name ?? ""}</code>.',
            en: 'Flipping <code>value</code> from <code>undefined</code> to a string mid-life produces a React warning and a real bug. Write <code>value={data?.name ?? ""}</code>.'
          }
        },
        {
          term: { pl: 'onChange to natywny input', en: 'onChange is really input' },
          def: {
            pl: 'W Reactie <code>onChange</code> odpala sie przy kazdym znaku, a nie na blur jak natywne <code>change</code>. Odpowiednikiem <code>v-model.lazy</code> jest <code>onBlur</code>.',
            en: 'In React <code>onChange</code> fires on every character, not on blur like the native <code>change</code> event. The <code>v-model.lazy</code> equivalent is <code>onBlur</code>.'
          }
        },
        {
          term: { pl: 'react-hook-form', en: 'react-hook-form' },
          def: {
            pl: 'Produkcyjna odpowiedz na koszt kontrolowanych formularzy: pola zostaja niekontrolowane, a subskrypcja idzie per pole. Odkupuje granularnosc, ktora Vue daje z automatu.',
            en: 'The production answer to the cost of controlled forms: fields stay uncontrolled and subscriptions are per field. It buys back the granularity Vue gives you by default.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l3arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">v-model is one directive, React shows the whole loop</text>' +
          '<rect x="20" y="60" width="240" height="140" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="140" y="88" fill="var(--accent2)" font-size="15" text-anchor="middle">Vue</text>' +
          '<text x="140" y="118" fill="var(--text)" font-size="14" text-anchor="middle">v-model = name</text>' +
          '<text x="140" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">bind value + listen</text>' +
          '<text x="140" y="170" fill="var(--muted)" font-size="13" text-anchor="middle">sugar over :value</text>' +
          '<rect x="380" y="60" width="240" height="140" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="500" y="88" fill="var(--accent)" font-size="15" text-anchor="middle">React</text>' +
          '<text x="500" y="118" fill="var(--text)" font-size="14" text-anchor="middle">value + onChange</text>' +
          '<text x="500" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">state is the source</text>' +
          '<text x="500" y="170" fill="var(--muted)" font-size="13" text-anchor="middle">DOM only mirrors it</text>' +
          '<rect x="140" y="250" width="160" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="220" y="286" fill="var(--text)" font-size="14" text-anchor="middle">state</text>' +
          '<rect x="360" y="250" width="160" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="440" y="286" fill="var(--text)" font-size="14" text-anchor="middle">input DOM</text>' +
          '<line x1="300" y1="268" x2="356" y2="268" stroke="var(--ok)" stroke-width="2" marker-end="url(#m3l3arrow)"/>' +
          '<line x1="360" y1="296" x2="304" y2="296" stroke="var(--warn)" stroke-width="2" marker-end="url(#m3l3arrow)"/>' +
          '<text x="330" y="336" fill="var(--muted)" font-size="13" text-anchor="middle">value down, events up</text>' +
          '<text x="20" y="372" fill="var(--muted)" font-size="13">Skip onChange and the field looks frozen.</text>' +
          '</svg>',
        caption: {
          pl: 'v-model to skrot na dwie rzeczy naraz; React kaze napisac obie polowy petli, dzieki czemu widac, ze zrodlem prawdy jest stan.',
          en: 'v-model is shorthand for two things at once; React makes you write both halves of the loop, which shows that state is the source of truth.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden nacisniety klawisz przechodzi przez cala petle kontrolowanego inputa - od zdarzenia do nowej wartosci w DOM.',
          en: 'One keystroke travelling through the full controlled-input loop, from event to new value in the DOM.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f0a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Controlled input loop - idle</text>' +
              '<rect x="40" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="90" fill="var(--text)" font-size="14" text-anchor="middle">1. input DOM</text>' +
              '<text x="140" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">value = An</text>' +
              '<rect x="400" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="90" fill="var(--text)" font-size="14" text-anchor="middle">2. onChange</text>' +
              '<text x="500" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">e.target.value</text>' +
              '<rect x="400" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="280" fill="var(--text)" font-size="14" text-anchor="middle">3. setName</text>' +
              '<text x="500" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">schedules render</text>' +
              '<rect x="40" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="280" fill="var(--text)" font-size="14" text-anchor="middle">4. re-render</text>' +
              '<text x="140" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">value = name</text>' +
              '<line x1="240" y1="96" x2="396" y2="96" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f0a)"/>' +
              '<line x1="500" y1="132" x2="500" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f0a)"/>' +
              '<line x1="400" y1="286" x2="244" y2="286" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f0a)"/>' +
              '<line x1="140" y1="250" x2="140" y2="136" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f0a)"/>' +
              '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">state: name = An</text>' +
              '</svg>',
            label: { pl: 'Stan spoczynku', en: 'Idle state' },
            note: {
              pl: 'Stan trzyma napis An, a input tylko go odbija. Petla czeka na zdarzenie.',
              en: 'State holds the text An and the input merely mirrors it. The loop is waiting for an event.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker><marker id="m3f1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Controlled input loop - keystroke</text>' +
              '<rect x="40" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="140" y="90" fill="var(--accent)" font-size="14" text-anchor="middle">1. input DOM</text>' +
              '<text x="140" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">user types a</text>' +
              '<rect x="400" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="90" fill="var(--text)" font-size="14" text-anchor="middle">2. onChange</text>' +
              '<text x="500" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">e.target.value</text>' +
              '<rect x="400" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="280" fill="var(--text)" font-size="14" text-anchor="middle">3. setName</text>' +
              '<text x="500" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">schedules render</text>' +
              '<rect x="40" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="280" fill="var(--text)" font-size="14" text-anchor="middle">4. re-render</text>' +
              '<text x="140" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">value = name</text>' +
              '<line x1="240" y1="96" x2="396" y2="96" stroke="var(--accent)" stroke-width="2" marker-end="url(#m3f1b)"/>' +
              '<line x1="500" y1="132" x2="500" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f1a)"/>' +
              '<line x1="400" y1="286" x2="244" y2="286" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f1a)"/>' +
              '<line x1="140" y1="250" x2="140" y2="136" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f1a)"/>' +
              '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">state: name = An (not yet changed)</text>' +
              '</svg>',
            label: { pl: 'Uzytkownik pisze', en: 'User types' },
            note: {
              pl: 'DOM chwilowo pokazuje Ana, ale stan wciaz ma An. Zdarzenie rusza w gore petli.',
              en: 'The DOM briefly shows Ana while state still holds An. The event starts moving up the loop.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker><marker id="m3f2b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Controlled input loop - handler runs</text>' +
              '<rect x="40" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="90" fill="var(--text)" font-size="14" text-anchor="middle">1. input DOM</text>' +
              '<text x="140" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">value = Ana</text>' +
              '<rect x="400" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="500" y="90" fill="var(--accent)" font-size="14" text-anchor="middle">2. onChange</text>' +
              '<text x="500" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">reads Ana</text>' +
              '<rect x="400" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="280" fill="var(--text)" font-size="14" text-anchor="middle">3. setName</text>' +
              '<text x="500" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">schedules render</text>' +
              '<rect x="40" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="280" fill="var(--text)" font-size="14" text-anchor="middle">4. re-render</text>' +
              '<text x="140" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">value = name</text>' +
              '<line x1="240" y1="96" x2="396" y2="96" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f2a)"/>' +
              '<line x1="500" y1="132" x2="500" y2="246" stroke="var(--accent)" stroke-width="2" marker-end="url(#m3f2b)"/>' +
              '<line x1="400" y1="286" x2="244" y2="286" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f2a)"/>' +
              '<line x1="140" y1="250" x2="140" y2="136" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f2a)"/>' +
              '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">handler receives the new text</text>' +
              '</svg>',
            label: { pl: 'Handler czyta wartosc', en: 'Handler reads the value' },
            note: {
              pl: 'onChange dostaje e.target.value, czyli Ana. To jedyne miejsce, w ktorym React dowiaduje sie o zmianie.',
              en: 'onChange receives e.target.value, that is Ana. This is the only place where React learns about the change.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker><marker id="m3f3b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Controlled input loop - state updated</text>' +
              '<rect x="40" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="90" fill="var(--text)" font-size="14" text-anchor="middle">1. input DOM</text>' +
              '<text x="140" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">value = Ana</text>' +
              '<rect x="400" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="90" fill="var(--text)" font-size="14" text-anchor="middle">2. onChange</text>' +
              '<text x="500" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">done</text>' +
              '<rect x="400" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="500" y="280" fill="var(--accent)" font-size="14" text-anchor="middle">3. setName</text>' +
              '<text x="500" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">name = Ana</text>' +
              '<rect x="40" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="140" y="280" fill="var(--text)" font-size="14" text-anchor="middle">4. re-render</text>' +
              '<text x="140" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">queued</text>' +
              '<line x1="240" y1="96" x2="396" y2="96" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f3a)"/>' +
              '<line x1="500" y1="132" x2="500" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f3a)"/>' +
              '<line x1="400" y1="286" x2="244" y2="286" stroke="var(--accent)" stroke-width="2" marker-end="url(#m3f3b)"/>' +
              '<line x1="140" y1="250" x2="140" y2="136" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f3a)"/>' +
              '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">state: name = Ana</text>' +
              '</svg>',
            label: { pl: 'Stan zaktualizowany', en: 'State updated' },
            note: {
              pl: 'setName zapisuje nowa wartosc i planuje render. Nic nie dzieje sie synchronicznie - zmienna name w tym wywolaniu wciaz ma stara wartosc.',
              en: 'setName stores the new value and schedules a render. Nothing happens synchronously - the name variable in this call still holds the old value.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker><marker id="m3f4b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Controlled input loop - render closes the loop</text>' +
              '<rect x="40" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="90" fill="var(--ok)" font-size="14" text-anchor="middle">1. input DOM</text>' +
              '<text x="140" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">value = Ana</text>' +
              '<rect x="400" y="60" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="90" fill="var(--text)" font-size="14" text-anchor="middle">2. onChange</text>' +
              '<text x="500" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">idle again</text>' +
              '<rect x="400" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="500" y="280" fill="var(--text)" font-size="14" text-anchor="middle">3. setName</text>' +
              '<text x="500" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">committed</text>' +
              '<rect x="40" y="250" width="200" height="72" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="140" y="280" fill="var(--ok)" font-size="14" text-anchor="middle">4. re-render</text>' +
              '<text x="140" y="302" fill="var(--muted)" font-size="13" text-anchor="middle">value prop = Ana</text>' +
              '<line x1="240" y1="96" x2="396" y2="96" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f4a)"/>' +
              '<line x1="500" y1="132" x2="500" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f4a)"/>' +
              '<line x1="400" y1="286" x2="244" y2="286" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f4a)"/>' +
              '<line x1="140" y1="250" x2="140" y2="136" stroke="var(--ok)" stroke-width="2" marker-end="url(#m3f4b)"/>' +
              '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">DOM and state agree again</text>' +
              '</svg>',
            label: { pl: 'Render domyka petle', en: 'Render closes the loop' },
            note: {
              pl: 'Komponent renderuje sie ponownie i wpisuje value z nowego stanu. Gdyby setName nie zostalo wywolane, input cofnalby sie do An i wygladalby na zablokowany.',
              en: 'The component re-renders and writes value from the new state. Had setName not been called, the input would snap back to An and look frozen.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie tablice w kuchni, na ktorej zapisujesz liste zakupow. Sa dwa sposoby pracy z taka tablica.</p><p>Pierwszy: kazdy pisze na niej bezposrednio kreda. Szybko, ale nikt nie wie, co tam wlasciwie jest, dopoki nie podejdzie i nie przeczyta.</p><p>Drugi: prawdziwa lista lezy w zeszycie, a tablica tylko ja przepisuje. Chcesz cos dopisac? Mowisz o tym, ktos poprawia zeszyt, a tablica sama sie odswieza. Zeszyt jest zawsze prawda.</p><p>React wybiera drugi sposob. Pole tekstowe nic nie pamieta samo z siebie - pokazuje to, co jest w zeszycie, czyli w stanie. Kazde nacisniecie klawisza to zgloszenie: <strong>zapisz to prosze w zeszycie</strong>.</p><p>Vue robi to samo, tylko chowa jedna linijke pod nazwa v-model. Efekt taki sam, roznica jest taka, ze w Reactie widzisz obie polowki na wlasne oczy. Jesli zapomnisz o polowce, ktora zapisuje zeszyt, tablica bedzie wygladac na zepsuta.</p>',
          en: '<p>Picture a kitchen chalkboard where you keep the shopping list. There are two ways to work with it.</p><p>First: everybody writes on it directly in chalk. Fast, but nobody knows what is on the list until they walk over and read it.</p><p>Second: the real list lives in a notebook, and the board just copies it. Want to add something? You say so, someone updates the notebook, and the board refreshes itself. The notebook is always the truth.</p><p>React picks the second way. A text field remembers nothing on its own - it displays whatever is in the notebook, that is the state. Every keystroke is a request: <strong>please write this in the notebook</strong>.</p><p>Vue does the same thing, it just hides one line of it behind the name v-model. Same result; the difference is that React makes you see both halves. Forget the half that updates the notebook and the board looks broken.</p>'
        },
        school: {
          pl: '<p>We Vue piszesz jedna linijke i temat jest zamkniety:</p><pre><code>&lt;!-- Vue --&gt;\n&lt;script setup&gt;\nconst name = ref("");\n&lt;/script&gt;\n&lt;input v-model="name" /&gt;</code></pre><p>W Reactie piszesz obie polowy:</p><pre><code>// React\nfunction NameField() {\n  const [name, setName] = useState("");\n  return (\n    &lt;input\n      value={name}\n      onChange={(e) =&gt; setName(e.target.value)}\n    /&gt;\n  );\n}</code></pre><p><strong>We Vue uzywales v-model, w Reactie laczysz value i onChange, bo React nie ma dwukierunkowego wiazania - ma jednokierunkowy przeplyw danych i zdarzenia wracajace w gore.</strong> To nie jest gorzej, tylko jawniej: v-model tez rozwija sie do <code>:value</code> plus <code>@input</code>, tylko robi to za ciebie kompilator.</p><p>Ta jawnosc od razu sie oplaca, bo transformacje wpisujesz w miejscu, gdzie i tak jestes:</p><pre><code>onChange={(e) =&gt; setName(e.target.value.toUpperCase())}</code></pre><p>We Vue potrzebowalbys do tego modyfikatora, computed z setterem albo watcha.</p><p>Wazna pulapka: jesli podasz <code>value</code> bez <code>onChange</code>, React zablokuje pole i wypisze ostrzezenie. To odpowiednik <code>:value="name"</code> bez nasluchu we Vue - tam tez nic by sie nie wpisalo.</p><p>Wlasny komponent tez rozni sie tylko konwencja nazw. Vue oczekuje propsa <code>modelValue</code> i zdarzenia <code>update:modelValue</code> (albo makra <code>defineModel</code>). React oczekuje pary <code>value</code> i <code>onChange</code>, ktora sam ustalasz - to zwykle propsy, wiec komponent moze miec ich kilka: <code>value</code>, <code>onChange</code>, <code>selected</code>, <code>onSelect</code>. We Vue byloby to <code>v-model:selected</code>.</p>',
          en: '<p>In Vue you write one line and the topic is closed:</p><pre><code>&lt;!-- Vue --&gt;\n&lt;script setup&gt;\nconst name = ref("");\n&lt;/script&gt;\n&lt;input v-model="name" /&gt;</code></pre><p>In React you write both halves:</p><pre><code>// React\nfunction NameField() {\n  const [name, setName] = useState("");\n  return (\n    &lt;input\n      value={name}\n      onChange={(e) =&gt; setName(e.target.value)}\n    /&gt;\n  );\n}</code></pre><p><strong>In Vue you used v-model, in React you combine value and onChange, because React has no two-way binding - it has one-way data flow plus events travelling back up.</strong> That is not worse, only more explicit: v-model also expands to <code>:value</code> plus <code>@input</code>, the compiler just does it for you.</p><p>The explicitness pays off immediately, because transformations go exactly where you already are:</p><pre><code>onChange={(e) =&gt; setName(e.target.value.toUpperCase())}</code></pre><p>In Vue that would need a modifier, a computed with a setter, or a watcher.</p><p>An important trap: pass <code>value</code> without <code>onChange</code> and React freezes the field and logs a warning. That is the equivalent of <code>:value="name"</code> with no listener in Vue - nothing would type there either.</p><p>Custom components differ only in naming conventions. Vue expects a <code>modelValue</code> prop and an <code>update:modelValue</code> event (or the <code>defineModel</code> macro). React expects a <code>value</code> and <code>onChange</code> pair that you define yourself - they are ordinary props, so a component can have several: <code>value</code>, <code>onChange</code>, <code>selected</code>, <code>onSelect</code>. In Vue that would be <code>v-model:selected</code>.</p>'
        },
        pro: {
          pl: '<p>Kontrolowany kontra niekontrolowany to decyzja architektoniczna, nie stylistyczna. Kontrolowany znaczy: stan Reacta jest jedynym zrodlem prawdy, DOM jest widokiem. Niekontrolowany znaczy: prawda siedzi w DOM, a ty czytasz ja refem albo przez FormData.</p><pre><code>// niekontrolowany - zero renderow na klawisz\nfunction Search() {\n  const ref = useRef(null);\n  return (\n    &lt;form action={(fd) =&gt; find(fd.get("q"))}&gt;\n      &lt;input name="q" defaultValue="" ref={ref} /&gt;\n    &lt;/form&gt;\n  );\n}</code></pre><p>Klucz: <code>value</code> robi input kontrolowanym, <code>defaultValue</code> niekontrolowanym. Przejscie z <code>undefined</code> na string w trakcie zycia komponentu daje ostrzezenie React i realny bug - typowo, gdy dane przychodza z API. Uzywaj <code>value={data?.name ?? ""}</code>.</p><p>Wlasny komponent z para value/onChange:</p><pre><code>// React\nfunction Money({ value, onChange }) {\n  return &lt;input value={value} onChange={(e) =&gt; onChange(clamp(e.target.value))} /&gt;;\n}\n\n// Vue: to samo przez defineModel\n// const model = defineModel();\n// &lt;input :value="model" @input="model = clamp($event.target.value)" /&gt;</code></pre><p>Rzeczy, na ktorych ludzie sie przewracaja:</p><ul><li><strong>Kursor skacze na koniec.</strong> Jesli w onChange formatujesz tekst (np. wstawiasz spacje w numerze karty), musisz recznie przywrocic <code>selectionStart</code> w <code>useLayoutEffect</code>. Vue ma ten sam problem, tylko rzadziej sie na niego trafia, bo formatuje sie w <code>@blur</code>.</li><li><strong>IME i jezyki azjatyckie.</strong> Kontrolowany input plus agresywne formatowanie psuje skladanie znakow. Reaguj na <code>compositionstart</code> i <code>compositionend</code>; we Vue robi to za ciebie <code>v-model</code>.</li><li><strong>Wydajnosc.</strong> Kazdy klawisz to render calego komponentu z formularzem. Przy 30 polach w jednym komponencie widac to na slabszych telefonach. Odpowiedz produkcyjna: react-hook-form, ktory trzyma pola niekontrolowane i subskrybuje sie punktowo - to jest reactowy sposob odzyskania granularnosci, ktora we Vue masz z pudelka.</li><li><strong>onChange w Reactie to tak naprawde input.</strong> Odpala sie przy kazdym znaku, nie przy blurze jak natywne zdarzenie change. Odpowiednik <code>v-model.lazy</code> to <code>onBlur</code>.</li><li><strong>Debounce.</strong> Nie debouncuj <code>value</code>, bo pole zacznie gubic znaki. Debouncuj efekt uboczny albo uzyj <code>useDeferredValue</code> dla ciezkiej listy wynikow.</li></ul><p>Pytanie rekrutacyjne: kiedy input niekontrolowany. Odpowiedz: gdy nie potrzebujesz wartosci przy kazdym znaku - proste formularze, upload plikow, integracje z bibliotekami, ktore same pisza po DOM.</p>',
          en: '<p>Controlled versus uncontrolled is an architectural decision, not a stylistic one. Controlled means React state is the single source of truth and the DOM is a view. Uncontrolled means the truth lives in the DOM and you read it through a ref or FormData.</p><pre><code>// uncontrolled - zero renders per keystroke\nfunction Search() {\n  const ref = useRef(null);\n  return (\n    &lt;form action={(fd) =&gt; find(fd.get("q"))}&gt;\n      &lt;input name="q" defaultValue="" ref={ref} /&gt;\n    &lt;/form&gt;\n  );\n}</code></pre><p>The switch: <code>value</code> makes an input controlled, <code>defaultValue</code> makes it uncontrolled. Flipping from <code>undefined</code> to a string mid-life produces a React warning and a real bug - classically when data arrives from an API. Write <code>value={data?.name ?? ""}</code>.</p><p>A custom component with a value/onChange pair:</p><pre><code>// React\nfunction Money({ value, onChange }) {\n  return &lt;input value={value} onChange={(e) =&gt; onChange(clamp(e.target.value))} /&gt;;\n}\n\n// Vue: the same thing via defineModel\n// const model = defineModel();\n// &lt;input :value="model" @input="model = clamp($event.target.value)" /&gt;</code></pre><p>Where people actually trip:</p><ul><li><strong>The caret jumps to the end.</strong> If onChange reformats the text (spacing a card number, say) you must restore <code>selectionStart</code> yourself in <code>useLayoutEffect</code>. Vue has the same problem; it bites less often because people format on <code>@blur</code>.</li><li><strong>IME and CJK input.</strong> A controlled input plus aggressive formatting breaks character composition. Handle <code>compositionstart</code> and <code>compositionend</code>; Vue <code>v-model</code> does this for you.</li><li><strong>Performance.</strong> Every keystroke re-renders the whole form component. With 30 fields in one component you feel it on mid-range phones. The production answer is react-hook-form, which keeps fields uncontrolled and subscribes per field - the React way of buying back the granularity Vue gives you by default.</li><li><strong>React onChange is really input.</strong> It fires per character, not on blur like the native change event. The <code>v-model.lazy</code> equivalent is <code>onBlur</code>.</li><li><strong>Debouncing.</strong> Never debounce <code>value</code> or the field starts dropping characters. Debounce the side effect, or use <code>useDeferredValue</code> for an expensive result list.</li></ul><p>Interview question: when do you use an uncontrolled input. Answer: when you do not need the value on every keystroke - simple forms, file uploads, and integrations with libraries that write to the DOM themselves.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Do czego rozwija sie v-model na natywnym inpucie?',
            en: 'What does v-model on a native input expand to?'
          },
          options: [
            { pl: 'Do dwukierunkowego wiazania na poziomie DOM, ktorego React nie ma', en: 'To DOM-level two-way binding that React lacks' },
            { pl: 'Do bindowania value oraz nasluchu zdarzenia, czyli dokladnie tego, co w Reactie piszesz recznie', en: 'To a value binding plus an event listener, exactly what you write by hand in React' },
            { pl: 'Do watchera na refie', en: 'To a watcher on the ref' },
            { pl: 'Do provide/inject', en: 'To provide/inject' }
          ],
          correct: 1,
          explain: {
            pl: 'To cukier skladniowy kompilatora. React nie ma tego cukru, wiec obie polowy sa widoczne w kodzie.',
            en: 'It is compiler sugar. React has no such sugar, so both halves stay visible in your code.'
          }
        },
        {
          q: {
            pl: 'Input dostaje value bez onChange. Co zobaczy uzytkownik?',
            en: 'An input gets value without onChange. What does the user see?'
          },
          options: [
            { pl: 'Pole dziala normalnie, React sam aktualizuje stan', en: 'The field works normally, React updates the state itself' },
            { pl: 'Pole nie przyjmuje znakow, a React ostrzega w konsoli', en: 'The field accepts no characters and React warns in the console' },
            { pl: 'Aplikacja rzuca wyjatkiem przy montowaniu', en: 'The app throws on mount' },
            { pl: 'Pole staje sie niekontrolowane', en: 'The field becomes uncontrolled' }
          ],
          correct: 1,
          explain: {
            pl: 'Po kazdym znaku React przywraca wartosc ze stanu, ktory sie nie zmienil, wiec pole wyglada na zamrozone. Do odczytu bez edycji sluzy readOnly.',
            en: 'After each character React restores the value from state, which never changed, so the field looks frozen. For read-only display use readOnly.'
          }
        },
        {
          q: {
            pl: 'Formularz z 30 polami w jednym komponencie muli na telefonie. Jakie rozwiazanie jest reactowo poprawne?',
            en: 'A 30-field form in a single component lags on mobile. Which fix is idiomatic React?'
          },
          options: [
            { pl: 'Debounce na propsie value kazdego pola', en: 'Debounce the value prop of every field' },
            { pl: 'Zamienic useState na useRef i renderowac recznie', en: 'Swap useState for useRef and render manually' },
            { pl: 'Owinac formularz w Context', en: 'Wrap the form in a Context' },
            { pl: 'Uzyc react-hook-form z polami niekontrolowanymi i subskrypcja per pole', en: 'Use react-hook-form with uncontrolled fields and per-field subscriptions' }
          ],
          correct: 3,
          explain: {
            pl: 'Zamiast renderowac caly formularz przy kazdym znaku, react-hook-form trzyma prawde w DOM i budzi tylko zainteresowane pola. Debounce na value gubi znaki.',
            en: 'Instead of re-rendering the whole form per character, react-hook-form keeps the truth in the DOM and wakes only the interested fields. Debouncing value drops characters.'
          }
        },
        {
          q: {
            pl: 'Pole edycji dostaje value={user?.name}, a user przychodzi z API po sekundzie. Na czym polega blad?',
            en: 'An edit field gets value={user?.name} and user arrives from the API a second later. What is the bug?'
          },
          options: [
            { pl: 'Input startuje jako niekontrolowany (undefined) i zmienia sie w kontrolowany, co React zglasza jako ostrzezenie i co gubi wpisany tekst', en: 'The input starts uncontrolled (undefined) and becomes controlled, which React warns about and which loses typed text' },
            { pl: 'Nic sie nie stanie, React obsluguje undefined poprawnie', en: 'Nothing happens, React handles undefined fine' },
            { pl: 'Trzeba dodac key, zeby wymusic remount', en: 'You must add a key to force a remount' },
            { pl: 'Blad wystapi tylko w StrictMode', en: 'The bug only appears in StrictMode' }
          ],
          correct: 0,
          explain: {
            pl: 'undefined oznacza input niekontrolowany. Zawsze podawaj wartosc domyslna, na przyklad value={user?.name ?? ""}, albo montuj formularz dopiero po zaladowaniu danych.',
            en: 'undefined means uncontrolled. Always supply a fallback, for example value={user?.name ?? ""}, or mount the form only once the data has loaded.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'compound-components-render-props',
      title: {
        pl: 'Compound components i render props',
        en: 'Compound components and render props'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Compound components', en: 'Compound components' },
          def: {
            pl: 'Rodzina powiazanych komponentow dzielaca stan przez wewnetrzny Context, np. <code>Tabs</code>, <code>Tabs.Trigger</code>, <code>Tabs.Panel</code>. Odpowiednik <code>provide</code> z <code>InjectionKey</code> we Vue.',
            en: 'A family of related components sharing state through an internal Context, e.g. <code>Tabs</code>, <code>Tabs.Trigger</code>, <code>Tabs.Panel</code>. The Vue counterpart is <code>provide</code> with an <code>InjectionKey</code>.'
          }
        },
        {
          term: { pl: 'Render prop', en: 'Render prop' },
          def: {
            pl: 'Props bedacy funkcja, ktora rodzic wola z danymi i ktora zwraca JSX. Odpowiednik scoped slota - dzieli logike razem z kontrola nad kawalkiem drzewa.',
            en: 'A prop that is a function the parent calls with data and which returns JSX. The scoped-slot equivalent - it shares logic together with control over a slice of the tree.'
          }
        },
        {
          term: { pl: 'Function as children', en: 'Function as children' },
          def: {
            pl: 'Wariant render propa, w ktorym funkcja idzie przez <code>children</code>: <code>&lt;List&gt;{(item) =&gt; ...}&lt;/List&gt;</code>. Kosztuje nowa funkcje na kazdy render, wiec psuje <code>React.memo</code>.',
            en: 'The render-prop variant where the function travels through <code>children</code>: <code>&lt;List&gt;{(item) =&gt; ...}&lt;/List&gt;</code>. It allocates a new function per render, so it defeats <code>React.memo</code>.'
          }
        },
        {
          term: { pl: 'Headless UI', en: 'Headless UI' },
          def: {
            pl: 'Biblioteka dajaca zachowanie, stan i dostepnosc bez wlasnych stylow ani sztywnej struktury DOM. Dzis domyslnie budowana wlasnie na compound components.',
            en: 'A library that provides behaviour, state and accessibility with no styles of its own and no rigid DOM structure. Today it is built on compound components by default.'
          }
        },
        {
          term: { pl: 'Hook straznik', en: 'Guard hook' },
          def: {
            pl: 'Hook typu <code>useTabs()</code>, ktory rzuca bledem, gdy czesc rodziny zostala uzyta poza rodzicem. Zastepuje kruche sprawdzanie typow dzieci przez <code>Children.map</code>.',
            en: 'A hook such as <code>useTabs()</code> that throws when part of the family is used outside its parent. It replaces fragile child-type checks via <code>Children.map</code>.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l4arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Two ways to hand state back to the caller</text>' +
          '<rect x="20" y="50" width="280" height="170" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="160" y="78" fill="var(--accent2)" font-size="15" text-anchor="middle">Scoped slot (Vue)</text>' +
          '<rect x="45" y="96" width="230" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="124" fill="var(--muted)" font-size="13" text-anchor="middle">slot :item = row</text>' +
          '<line x1="160" y1="142" x2="160" y2="166" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4arrow)"/>' +
          '<rect x="45" y="170" width="230" height="40" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="160" y="196" fill="var(--ok)" font-size="13" text-anchor="middle">parent renders the row</text>' +
          '<rect x="340" y="50" width="280" height="170" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="480" y="78" fill="var(--accent)" font-size="15" text-anchor="middle">Render prop (React)</text>' +
          '<rect x="365" y="96" width="230" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="124" fill="var(--muted)" font-size="13" text-anchor="middle">children(row)</text>' +
          '<line x1="480" y1="142" x2="480" y2="166" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4arrow)"/>' +
          '<rect x="365" y="170" width="230" height="40" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="480" y="196" fill="var(--ok)" font-size="13" text-anchor="middle">caller returns the JSX</text>' +
          '<rect x="20" y="250" width="600" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="278" fill="var(--text)" font-size="15" text-anchor="middle">Compound components: shared state via Context</text>' +
          '<rect x="45" y="296" width="170" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="130" y="323" fill="var(--text)" font-size="13" text-anchor="middle">Tabs (state)</text>' +
          '<line x1="215" y1="318" x2="255" y2="318" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4arrow)"/>' +
          '<rect x="260" y="296" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="335" y="323" fill="var(--muted)" font-size="13" text-anchor="middle">Tabs.List</text>' +
          '<line x1="410" y1="318" x2="450" y2="318" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4arrow)"/>' +
          '<rect x="455" y="296" width="150" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="530" y="323" fill="var(--muted)" font-size="13" text-anchor="middle">Tabs.Panel</text>' +
          '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">children stay free, state stays private</text>' +
          '</svg>',
        caption: {
          pl: 'Scoped slot i render prop robia to samo: oddaja dane do rodzica. Compound components ida krok dalej i dziela stan przez Context.',
          en: 'A scoped slot and a render prop do the same job: hand data back to the caller. Compound components go further and share state through Context.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie ekspres do kawy w biurze. Mozna go zbudowac na dwa sposoby.</p><p>Pierwszy: jeden wielki przycisk i dwadziescia pokretel z tylu. Kazdy nowy pomysl to nowe pokretlo. Po roku nikt nie wie, co robi pokretlo numer siedemnascie.</p><p>Drugi: zestaw czesci, ktore do siebie pasuja - mlynek, zaparzacz, spieniacz. Ustawiasz je w kolejnosci, ktora ci pasuje, a one same gadaja miedzy soba i wiedza, ze naleza do jednego ekspresu.</p><p>Drugi sposob to <strong>compound components</strong>, czyli komponenty skladane. Zamiast dwudziestu opcji dajesz klocki.</p><p>Jest tez druga sztuczka. Czasem klocek wie cos, czego ty nie wiesz - na przyklad ktora zakladka jest otwarta. Wtedy klocek podaje ci te informacje, a ty decydujesz, jak ja narysowac. To jakbys powiedzial ekspresowi: <em>ty pilnuj temperatury, ja wybieram kubek</em>.</p>',
          en: '<p>Picture the coffee machine in an office. You can build it two ways.</p><p>First: one giant button and twenty knobs at the back. Every new idea adds a knob. A year later nobody knows what knob seventeen does.</p><p>Second: a set of parts that fit together - grinder, brewer, frother. You arrange them in the order you like and they talk among themselves, knowing they belong to one machine.</p><p>The second way is <strong>compound components</strong>. Instead of twenty options you hand out building blocks.</p><p>There is a second trick too. Sometimes a block knows something you do not - which tab is open, say. The block hands you that information and you decide how to draw it. It is like telling the machine: <em>you watch the temperature, I pick the cup</em>.</p>'
        },
        school: {
          pl: '<p>Znasz ten problem z design systemu: komponent zaczyna od trzech propsow, a po roku ma <code>showIcon</code>, <code>iconPosition</code>, <code>headerVariant</code> i <code>dense</code>. To jest konfiguracja zamiast kompozycji.</p><p>We Vue ratunkiem byly sloty, zwlaszcza scoped:</p><pre><code>&lt;!-- Vue --&gt;\n&lt;DataList :items="rows"&gt;\n  &lt;template #row="{ item, selected }"&gt;\n    &lt;b :class="{ on: selected }"&gt;{{ item.name }}&lt;/b&gt;\n  &lt;/template&gt;\n&lt;/DataList&gt;</code></pre><p>W Reactie odpowiednikiem scoped slota jest <strong>render prop</strong>: props, ktory jest funkcja i dostaje dane od dziecka.</p><pre><code>// React\n&lt;DataList items={rows}&gt;\n  {({ item, selected }) =&gt; (\n    &lt;b className={selected ? "on" : ""}&gt;{item.name}&lt;/b&gt;\n  )}\n&lt;/DataList&gt;</code></pre><p><strong>We Vue oddawales dane przez v-slot z parametrem, w Reactie przekazujesz funkcje jako children, bo children to zwykla wartosc, a funkcja to tez wartosc.</strong> Zadnego nowego API - dziecko po prostu wywoluje <code>children(dane)</code>.</p><p>Druga technika to compound components. Komponent nadrzedny trzyma stan i wystawia go przez Context, a czesci skladowe go czytaja:</p><pre><code>&lt;Tabs defaultValue="a"&gt;\n  &lt;Tabs.List&gt;\n    &lt;Tabs.Trigger value="a"&gt;Ogolne&lt;/Tabs.Trigger&gt;\n    &lt;Tabs.Trigger value="b"&gt;Zaawansowane&lt;/Tabs.Trigger&gt;\n  &lt;/Tabs.List&gt;\n  &lt;Tabs.Panel value="a"&gt;...&lt;/Tabs.Panel&gt;\n&lt;/Tabs&gt;</code></pre><p>Uzytkownik ustawia elementy tam, gdzie chce, dokladac wlasne opakowania i klasy, a stan aktywnej zakladki pozostaje prywatny. To ta sama idea, ktora we Vue realizujesz przez <code>provide</code> w rodzicu i <code>inject</code> w czesciach - Radix UI i Headless UI zbudowaly na tym cale biblioteki.</p><p>Zasada wyboru jest prosta i taka sama jak we Vue: jesli komponent dostaje kolejnego propsa typu boolean, ktory tylko wlacza inny kawalek widoku, prawdopodobnie powinien byc to osobny element skladowy albo dziura na tresc.</p>',
          en: '<p>You know the design-system problem: a component starts with three props and a year later it has <code>showIcon</code>, <code>iconPosition</code>, <code>headerVariant</code> and <code>dense</code>. That is configuration instead of composition.</p><p>In Vue the escape hatch was slots, especially scoped ones:</p><pre><code>&lt;!-- Vue --&gt;\n&lt;DataList :items="rows"&gt;\n  &lt;template #row="{ item, selected }"&gt;\n    &lt;b :class="{ on: selected }"&gt;{{ item.name }}&lt;/b&gt;\n  &lt;/template&gt;\n&lt;/DataList&gt;</code></pre><p>The React equivalent of a scoped slot is a <strong>render prop</strong>: a prop that is a function and receives data from the child.</p><pre><code>// React\n&lt;DataList items={rows}&gt;\n  {({ item, selected }) =&gt; (\n    &lt;b className={selected ? "on" : ""}&gt;{item.name}&lt;/b&gt;\n  )}\n&lt;/DataList&gt;</code></pre><p><strong>In Vue you handed data back through v-slot with a payload; in React you pass a function as children, because children is just a value and a function is a value too.</strong> No new API - the child simply calls <code>children(data)</code>.</p><p>The second technique is compound components. The parent holds the state and exposes it through Context while the parts read it:</p><pre><code>&lt;Tabs defaultValue="a"&gt;\n  &lt;Tabs.List&gt;\n    &lt;Tabs.Trigger value="a"&gt;General&lt;/Tabs.Trigger&gt;\n    &lt;Tabs.Trigger value="b"&gt;Advanced&lt;/Tabs.Trigger&gt;\n  &lt;/Tabs.List&gt;\n  &lt;Tabs.Panel value="a"&gt;...&lt;/Tabs.Panel&gt;\n&lt;/Tabs&gt;</code></pre><p>The caller arranges the parts freely, adds their own wrappers and classes, and the active-tab state stays private. It is the same idea you implement in Vue with <code>provide</code> in the parent and <code>inject</code> in the parts - Radix UI and Headless UI built entire libraries on it.</p>'
        },
        pro: {
          pl: '<p>Compound components sa dzis domyslnym wzorcem dla headless UI, bo rozwiazuja trzy problemy naraz: eksplozje propsow, sztywna strukture DOM i dostepnosc, ktora chcesz miec w bibliotece, a nie w kazdej aplikacji.</p><pre><code>const TabsCtx = createContext(null);\n\nfunction Tabs({ defaultValue, children }) {\n  const [value, setValue] = useState(defaultValue);\n  const ctx = useMemo(() =&gt; ({ value, setValue }), [value]);\n  return &lt;TabsCtx value={ctx}&gt;{children}&lt;/TabsCtx&gt;;\n}\n\nfunction useTabs() {\n  const ctx = useContext(TabsCtx);\n  if (!ctx) throw new Error("Tabs.* must be used inside &lt;Tabs&gt;");\n  return ctx;\n}\n\nTabs.Trigger = function Trigger({ value, children }) {\n  const t = useTabs();\n  return (\n    &lt;button role="tab" aria-selected={t.value === value}\n      onClick={() =&gt; t.setValue(value)}&gt;{children}&lt;/button&gt;\n  );\n};</code></pre><p>Vue rozwiazuje to samo przez <code>provide</code> plus <code>InjectionKey</code>, tylko czesci sa osobnymi plikami SFC zamiast wlasciwosci obiektu. Kropka w <code>Tabs.Trigger</code> nie ma zadnej magii - to zwykla wlasciwosc funkcji, ktora poprawia czytelnosc importow i podpowiedzi w edytorze.</p><p>Render props kontra hooki. Historycznie render props byly w Reactie sposobem na wspoldzielenie logiki; hooki przejely wiekszosc tych zastosowan. Dzis reguly sa proste:</p><ul><li>Logika bez wlasnego JSX - <strong>custom hook</strong>. To odpowiednik composable we Vue i domyslny wybor.</li><li>Dziecko renderuje strukture, a wolajacy ma wypelnic jej kawalek - <strong>render prop</strong> albo <code>children</code> jako funkcja. Klasyka: wirtualizowane listy (<code>react-window</code>), <code>Autocomplete</code>, biblioteki wykresow.</li><li>Zestaw powiazanych elementow o wspolnym stanie - <strong>compound components</strong>.</li></ul><p>Koszty, o ktorych trzeba wiedziec:</p><ul><li>Render prop tworzy nowa funkcje przy kazdym renderze, wiec <code>React.memo</code> na dziecku przestaje dzialac. Przy duzych listach to widac w profilerze.</li><li>Zagniezdzanie render props daje piramide wciec - to wlasnie boli w starym kodzie i to wlasnie naprawily hooki.</li><li>Compound components z Contextem koszuja jeden render calego poddrzewa przy kazdej zmianie wartosci; przy zakladkach to nieistotne, przy tabeli z zaznaczaniem wierszy juz nie - wtedy dziel context albo trzymaj zaznaczenie w sklepie z selektorami.</li><li>Nie waliduj typow dzieci przez <code>Children.map</code> i sprawdzanie <code>child.type</code>. Zlamie sie przy owinieciu w <code>&lt;div&gt;</code> albo w <code>&lt;Fragment&gt;</code>. Blad z <code>useTabs</code> wystarczy.</li></ul><p>Pytanie na rozmowie: czym rozni sie render prop od custom hooka. Odpowiedz: hook dzieli logike, render prop dzieli logike razem z kontrola nad fragmentem drzewa; jesli nie potrzebujesz tego drugiego, hook jest prostszy i tanszy.</p>',
          en: '<p>Compound components are the default pattern for headless UI today, because they solve three problems at once: prop explosion, rigid DOM structure, and accessibility that belongs in the library rather than in every app.</p><pre><code>const TabsCtx = createContext(null);\n\nfunction Tabs({ defaultValue, children }) {\n  const [value, setValue] = useState(defaultValue);\n  const ctx = useMemo(() =&gt; ({ value, setValue }), [value]);\n  return &lt;TabsCtx value={ctx}&gt;{children}&lt;/TabsCtx&gt;;\n}\n\nfunction useTabs() {\n  const ctx = useContext(TabsCtx);\n  if (!ctx) throw new Error("Tabs.* must be used inside &lt;Tabs&gt;");\n  return ctx;\n}\n\nTabs.Trigger = function Trigger({ value, children }) {\n  const t = useTabs();\n  return (\n    &lt;button role="tab" aria-selected={t.value === value}\n      onClick={() =&gt; t.setValue(value)}&gt;{children}&lt;/button&gt;\n  );\n};</code></pre><p>Vue solves the same thing with <code>provide</code> plus an <code>InjectionKey</code>, only the parts are separate SFC files rather than properties on an object. The dot in <code>Tabs.Trigger</code> carries no magic - it is a plain function property that keeps imports tidy and autocomplete useful.</p><p>Render props versus hooks. Historically render props were the React way of sharing logic; hooks took over most of those cases. The rules today are simple:</p><ul><li>Logic with no JSX of its own - a <strong>custom hook</strong>. That is the composable equivalent and the default choice.</li><li>The child renders a structure and the caller must fill in a slice of it - a <strong>render prop</strong> or function-as-children. Classic cases: virtualised lists (<code>react-window</code>), <code>Autocomplete</code>, charting libraries.</li><li>A family of related elements sharing state - <strong>compound components</strong>.</li></ul><p>Costs you must know about:</p><ul><li>A render prop allocates a new function on every render, so <code>React.memo</code> on the child stops working. On large lists you see it in the profiler.</li><li>Nesting render props produces the indentation pyramid - the pain in older codebases, and exactly what hooks fixed.</li><li>Compound components with Context cost a subtree render on every value change; irrelevant for tabs, not irrelevant for a table with row selection - there you split the context or move selection into a store with selectors.</li><li>Do not validate child types via <code>Children.map</code> and <code>child.type</code>. It breaks the moment someone wraps a part in a <code>&lt;div&gt;</code> or a <code>&lt;Fragment&gt;</code>. The throw inside <code>useTabs</code> is enough.</li></ul><p>Interview question: how does a render prop differ from a custom hook. Answer: a hook shares logic, a render prop shares logic together with control over a slice of the tree; if you do not need the second part, the hook is simpler and cheaper.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w Reactie odpowiada scoped slotowi z Vue?',
            en: 'What is the React counterpart of a Vue scoped slot?'
          },
          options: [
            { pl: 'Context', en: 'Context' },
            { pl: 'Render prop, czyli funkcja przekazana jako props lub children', en: 'A render prop, that is a function passed as a prop or as children' },
            { pl: 'useImperativeHandle', en: 'useImperativeHandle' },
            { pl: 'cloneElement', en: 'cloneElement' }
          ],
          correct: 1,
          explain: {
            pl: 'Scoped slot to funkcja, ktora dziecko wywoluje z danymi. W Reactie ta funkcja to po prostu props - najczesciej children.',
            en: 'A scoped slot is a function the child calls with data. In React that function is simply a prop, most often children.'
          }
        },
        {
          q: {
            pl: 'Jak Tabs.Panel dowiaduje sie, ktora zakladka jest aktywna?',
            en: 'How does Tabs.Panel learn which tab is active?'
          },
          options: [
            { pl: 'Z Contextu wystawionego przez Tabs, dokladnie jak inject z provide we Vue', en: 'From a Context provided by Tabs, exactly like inject from provide in Vue' },
            { pl: 'Rodzic klonuje dzieci i wstrzykuje im props', en: 'The parent clones its children and injects the prop' },
            { pl: 'Ze zmiennej globalnej modulu', en: 'From a module-level global' },
            { pl: 'Z atrybutu data w DOM', en: 'From a data attribute in the DOM' }
          ],
          correct: 0,
          explain: {
            pl: 'Context pozwala uzytkownikowi dowolnie owijac czesci i przestawiac je w strukturze. Klonowanie dzieci zalamuje sie przy pierwszym opakowaniu w div.',
            en: 'Context lets the caller wrap and rearrange parts freely. Cloning children breaks the first time somebody wraps a part in a div.'
          }
        },
        {
          q: {
            pl: 'Kiedy custom hook jest lepszy niz render prop?',
            en: 'When is a custom hook better than a render prop?'
          },
          options: [
            { pl: 'Zawsze, render props zostaly usuniete w React 19', en: 'Always, render props were removed in React 19' },
            { pl: 'Nigdy, hooki nie potrafia dzielic logiki', en: 'Never, hooks cannot share logic' },
            { pl: 'Gdy dzielisz sama logike i nie musisz kontrolowac fragmentu drzewa renderowanego przez dziecko', en: 'When you share logic only and do not need control over a slice of the tree the child renders' },
            { pl: 'Gdy potrzebujesz dostepu do DOM', en: 'When you need DOM access' }
          ],
          correct: 2,
          explain: {
            pl: 'Hook zwraca dane i funkcje, a JSX piszesz normalnie. Render prop zostaw tam, gdzie to dziecko decyduje o strukturze, a ty wypelniasz dziure.',
            en: 'A hook returns data and functions while you write JSX normally. Keep render props for cases where the child owns the structure and you fill a hole in it.'
          }
        },
        {
          q: {
            pl: 'Wirtualizowana lista z render propem renderuje wolno mimo React.memo na wierszu. Najbardziej prawdopodobna przyczyna?',
            en: 'A virtualised list with a render prop renders slowly despite React.memo on the row. Most likely cause?'
          },
          options: [
            { pl: 'memo nie dziala na komponentach funkcyjnych', en: 'memo does not work on function components' },
            { pl: 'Inline funkcja render prop ma nowa tozsamosc przy kazdym renderze, wiec porownanie propsow zawsze zawodzi', en: 'The inline render-prop function has a new identity every render, so the props comparison always fails' },
            { pl: 'Wirtualizacja wylacza memoizacje', en: 'Virtualisation disables memoisation' },
            { pl: 'Context zawsze omija memo', en: 'Context always bypasses memo' }
          ],
          correct: 1,
          explain: {
            pl: 'Nowa funkcja to nowy props. Wyciagnij ja poza render albo owin w useCallback, ewentualnie przekaz zamiast niej komponent wiersza.',
            en: 'A fresh function is a fresh prop. Hoist it out of the render, wrap it in useCallback, or pass a row component instead.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'error-boundaries-suspense',
      title: {
        pl: 'Error boundaries i Suspense',
        en: 'Error boundaries and Suspense'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Error boundary', en: 'Error boundary' },
          def: {
            pl: 'Komponent klasowy lapiacy bledy renderu swojego poddrzewa i pokazujacy fallback. Odpowiednik <code>onErrorCaptured</code>, tyle ze musi byc osobnym komponentem.',
            en: 'A class component that catches render errors from its subtree and shows a fallback. The <code>onErrorCaptured</code> equivalent, except it must be a separate component.'
          }
        },
        {
          term: { pl: 'getDerivedStateFromError', en: 'getDerivedStateFromError' },
          def: {
            pl: 'Statyczna metoda wolana w czasie renderu, ktora zamienia zlapany blad w stan granicy. Powod, dla ktorego error boundary nadal musi byc klasa.',
            en: 'A static method called during render that turns a caught error into boundary state. The reason an error boundary still has to be a class.'
          }
        },
        {
          term: { pl: 'Suspense', en: 'Suspense' },
          def: {
            pl: 'Granica pokazujaca fallback, gdy komponent w srodku zawiesil render w oczekiwaniu na dane. W Next.js kazda granica to osobny kawalek strumienia HTML.',
            en: 'A boundary that shows a fallback while a component inside has suspended waiting for data. In Next.js each boundary is a separate chunk of the HTML stream.'
          }
        },
        {
          term: { pl: 'use()', en: 'use()' },
          def: {
            pl: 'Hook Reacta 19 czytajacy promise albo context; zawiesza render do rozwiazania promisy. Promisa musi byc cache-owana, bo <code>use(fetch(...))</code> w ciele komponentu petli sie w nieskonczonosc.',
            en: 'The React 19 hook that reads a promise or a context; it suspends the render until the promise settles. The promise must be cached, because <code>use(fetch(...))</code> in the component body loops forever.'
          }
        },
        {
          term: { pl: 'resetKeys', en: 'resetKeys' },
          def: {
            pl: 'Mechanizm z <code>react-error-boundary</code> pozwalajacy wyjsc z fallbacku - typowo przy zmianie trasy plus wyczyszczeniu cache zapytan. Sam fallback bez drogi powrotnej to za malo.',
            en: 'The <code>react-error-boundary</code> mechanism for getting out of a fallback - typically on a route change plus clearing the query cache. A fallback with no way back is not enough.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l5arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Two boundaries wrapping the same subtree</text>' +
          '<rect x="30" y="50" width="580" height="330" rx="16" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="55" y="78" fill="var(--err)" font-size="14">ErrorBoundary - catches throws</text>' +
          '<rect x="60" y="96" width="520" height="264" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="85" y="124" fill="var(--accent)" font-size="14">Suspense - catches pending data</text>' +
          '<rect x="95" y="146" width="450" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="172" fill="var(--text)" font-size="14" text-anchor="middle">Child component</text>' +
          '<text x="320" y="192" fill="var(--muted)" font-size="13" text-anchor="middle">reads data, may throw</text>' +
          '<line x1="230" y1="206" x2="180" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l5arrow)"/>' +
          '<line x1="410" y1="206" x2="460" y2="246" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l5arrow)"/>' +
          '<rect x="95" y="250" width="200" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="195" y="276" fill="var(--warn)" font-size="14" text-anchor="middle">pending</text>' +
          '<text x="195" y="296" fill="var(--muted)" font-size="13" text-anchor="middle">fallback spinner</text>' +
          '<rect x="360" y="250" width="200" height="60" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="460" y="276" fill="var(--err)" font-size="14" text-anchor="middle">error</text>' +
          '<text x="460" y="296" fill="var(--muted)" font-size="13" text-anchor="middle">retry UI</text>' +
          '<text x="320" y="344" fill="var(--muted)" font-size="13" text-anchor="middle">nearest boundary above wins</text>' +
          '<text x="30" y="404" fill="var(--muted)" font-size="13">Vue: onErrorCaptured plus Suspense in the same roles.</text>' +
          '</svg>',
        caption: {
          pl: 'Error boundary lapie wyjatki, Suspense lapie oczekiwanie na dane. Obie granice dzialaja na najblizszym przodku w gore drzewa.',
          en: 'An error boundary catches throws, Suspense catches pending data. Both resolve to the nearest ancestor boundary up the tree.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Zycie jednego poddrzewa: render, zawieszenie, fallback, dane albo blad przechwycony przez granice.',
          en: 'The life of one subtree: render, suspend, fallback, then data or an error caught by the boundary.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Boundaries - first render</text>' +
              '<rect x="30" y="50" width="580" height="230" rx="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="55" y="78" fill="var(--muted)" font-size="14">ErrorBoundary</text>' +
              '<rect x="60" y="96" width="520" height="160" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="85" y="124" fill="var(--accent)" font-size="14">Suspense</text>' +
              '<rect x="100" y="146" width="440" height="86" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="182" fill="var(--text)" font-size="15" text-anchor="middle">Profile renders</text>' +
              '<text x="320" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">calls use(promise)</text>' +
              '<rect x="30" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="120" y="339" fill="var(--accent)" font-size="13" text-anchor="middle">1 render</text>' +
              '<rect x="230" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">2 fallback</text>' +
              '<rect x="430" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="520" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">3 result</text>' +
              '</svg>',
            label: { pl: 'Pierwszy render', en: 'First render' },
            note: {
              pl: 'Komponent startuje normalnie i siega po dane, ktorych jeszcze nie ma.',
              en: 'The component starts rendering normally and reaches for data that is not there yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Boundaries - the child suspends</text>' +
              '<rect x="30" y="50" width="580" height="230" rx="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="55" y="78" fill="var(--muted)" font-size="14">ErrorBoundary</text>' +
              '<rect x="60" y="96" width="520" height="160" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="85" y="124" fill="var(--warn)" font-size="14">Suspense catches it</text>' +
              '<rect x="100" y="146" width="440" height="86" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="182" fill="var(--warn)" font-size="15" text-anchor="middle">Profile suspends</text>' +
              '<text x="320" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">promise not settled</text>' +
              '<rect x="30" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="120" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">1 render</text>' +
              '<rect x="230" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="339" fill="var(--warn)" font-size="13" text-anchor="middle">2 fallback</text>' +
              '<rect x="430" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="520" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">3 result</text>' +
              '</svg>',
            label: { pl: 'Zawieszenie', en: 'Suspension' },
            note: {
              pl: 'Dane jeszcze nie dotarly, wiec render zostaje przerwany i szuka najblizszej granicy Suspense w gore drzewa.',
              en: 'The data has not arrived, so the render is interrupted and looks for the nearest Suspense boundary above.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Boundaries - fallback on screen</text>' +
              '<rect x="30" y="50" width="580" height="230" rx="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="55" y="78" fill="var(--muted)" font-size="14">ErrorBoundary</text>' +
              '<rect x="60" y="96" width="520" height="160" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="85" y="124" fill="var(--warn)" font-size="14">Suspense</text>' +
              '<rect x="100" y="146" width="440" height="86" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="182" fill="var(--warn)" font-size="15" text-anchor="middle">Skeleton fallback</text>' +
              '<text x="320" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">Profile state is kept</text>' +
              '<rect x="30" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="120" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">1 render</text>' +
              '<rect x="230" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="339" fill="var(--warn)" font-size="13" text-anchor="middle">2 fallback</text>' +
              '<rect x="430" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="520" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">3 result</text>' +
              '</svg>',
            label: { pl: 'Fallback na ekranie', en: 'Fallback on screen' },
            note: {
              pl: 'Uzytkownik widzi szkielet. Reszta strony poza granica dziala normalnie - dokladnie jak default i fallback w Suspense Vue.',
              en: 'The user sees a skeleton. Everything outside the boundary keeps working - exactly like the default and fallback slots of Vue Suspense.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Boundaries - data arrives</text>' +
              '<rect x="30" y="50" width="580" height="230" rx="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="55" y="78" fill="var(--muted)" font-size="14">ErrorBoundary</text>' +
              '<rect x="60" y="96" width="520" height="160" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="85" y="124" fill="var(--ok)" font-size="14">Suspense resolved</text>' +
              '<rect x="100" y="146" width="440" height="86" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="182" fill="var(--ok)" font-size="15" text-anchor="middle">Profile content</text>' +
              '<text x="320" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">rendered with data</text>' +
              '<rect x="30" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="120" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">1 render</text>' +
              '<rect x="230" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">2 fallback</text>' +
              '<rect x="430" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="520" y="339" fill="var(--ok)" font-size="13" text-anchor="middle">3 result</text>' +
              '</svg>',
            label: { pl: 'Dane dotarly', en: 'Data arrives' },
            note: {
              pl: 'Promise sie rozwiazal, React renderuje poddrzewo jeszcze raz i podmienia fallback na tresc.',
              en: 'The promise settled, React re-renders the subtree and swaps the fallback for real content.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Boundaries - the other branch: it throws</text>' +
              '<rect x="30" y="50" width="580" height="230" rx="16" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="55" y="78" fill="var(--err)" font-size="14">ErrorBoundary catches it</text>' +
              '<rect x="60" y="96" width="520" height="160" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="85" y="124" fill="var(--muted)" font-size="14">Suspense (skipped)</text>' +
              '<rect x="100" y="146" width="440" height="86" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="182" fill="var(--err)" font-size="15" text-anchor="middle">Something went wrong</text>' +
              '<text x="320" y="206" fill="var(--muted)" font-size="13" text-anchor="middle">retry button, page alive</text>' +
              '<rect x="30" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="120" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">1 render</text>' +
              '<rect x="230" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="339" fill="var(--muted)" font-size="13" text-anchor="middle">2 fallback</text>' +
              '<rect x="430" y="310" width="180" height="46" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="520" y="339" fill="var(--err)" font-size="13" text-anchor="middle">3 error</text>' +
              '</svg>',
            label: { pl: 'Sciezka bledu', en: 'The error branch' },
            note: {
              pl: 'Gdy promise odrzuci albo render rzuci wyjatkiem, przejmuje to error boundary. Reszta aplikacji zyje dalej.',
              en: 'If the promise rejects or the render throws, the error boundary takes over. The rest of the app stays alive.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie restauracje. Kelner idzie po zamowienie do kuchni. Moga zdarzyc sie dwie rzeczy.</p><p>Pierwsza: danie sie jeszcze robi. Wtedy kelner nie stoi w milczeniu przy stoliku - przynosi pieczywo i mowi, ze zaraz bedzie. Goscie wiedza, ze wszystko idzie zgodnie z planem.</p><p>Druga: kucharz przypalil danie. Wtedy tez nie zamykamy calej restauracji. Kelner przychodzi, przeprasza i pyta, czy zamowic cos innego. Reszta sali je spokojnie dalej.</p><p>W aplikacji sa dokladnie te dwie sytuacje. <strong>Czekamy</strong> na dane albo <strong>cos poszlo nie tak</strong>. React ma na to dwa ogrodzenia: jedno pokazuje pieczywo, czyli szkielet strony, drugie lapie przypalone danie i pokazuje uprzejmy komunikat z przyciskiem <em>sprobuj jeszcze raz</em>.</p><p>Najwazniejsze jest to, ze ogrodzenie otacza tylko jeden stolik. Reszta aplikacji dziala dalej.</p>',
          en: '<p>Picture a restaurant. The waiter goes to the kitchen for your order. Two things can happen.</p><p>First: the dish is still cooking. The waiter does not stand silently by your table - he brings bread and says it is on its way. The guests know the plan is holding.</p><p>Second: the chef burnt the dish. We still do not close the whole restaurant. The waiter apologises and asks whether you would like something else. The rest of the room keeps eating.</p><p>Apps have exactly these two situations. Either we are <strong>waiting</strong> for data, or <strong>something went wrong</strong>. React has two fences for that: one shows the bread, that is a page skeleton, the other catches the burnt dish and shows a polite message with a <em>try again</em> button.</p><p>The key part is that a fence surrounds one table only. The rest of the app carries on.</p>'
        },
        school: {
          pl: '<p>We Vue znasz oba mechanizmy, tylko pod innymi nazwami.</p><pre><code>&lt;!-- Vue --&gt;\n&lt;Suspense&gt;\n  &lt;template #default&gt;&lt;Profile /&gt;&lt;/template&gt;\n  &lt;template #fallback&gt;&lt;Skeleton /&gt;&lt;/template&gt;\n&lt;/Suspense&gt;\n\n&lt;script setup&gt;\nonErrorCaptured((err) =&gt; { report(err); return false; });\n&lt;/script&gt;</code></pre><p>W Reactie to dwa osobne komponenty:</p><pre><code>// React\n&lt;ErrorBoundary fallback={&lt;Retry /&gt;}&gt;\n  &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;\n    &lt;Profile /&gt;\n  &lt;/Suspense&gt;\n&lt;/ErrorBoundary&gt;</code></pre><p><strong>We Vue uzywales hooka cyklu zycia onErrorCaptured w dowolnym komponencie, w Reactie musisz uzyc komponentu granicznego, bo tylko klasa z getDerivedStateFromError potrafi zlapac blad z renderu poddrzewa.</strong> Hooka do tego nie ma i w React 19 nadal nie ma - w praktyce importujesz gotowy <code>react-error-boundary</code> zamiast pisac klase.</p><p>Podzial obowiazkow jest czysty:</p><ul><li><strong>Suspense</strong> lapie oczekiwanie. Komponent, ktory nie ma jeszcze danych, przerywa render, a najblizszy Suspense w gore pokazuje fallback.</li><li><strong>Error boundary</strong> lapie wyjatki rzucone podczas renderu, w metodach cyklu zycia i w konstruktorach dzieci.</li></ul><p>Czego error boundary <em>nie</em> lapie: bledow w handlerach zdarzen (<code>onClick</code>), w kodzie asynchronicznym poza renderem i w samej granicy. To dokladnie ta sama pulapka co w Vue - <code>onErrorCaptured</code> tez nie zlapie odrzuconego promise z <code>setTimeout</code>.</p><p>Praktyka: jedna granica na trase i po jednej wokol ryzykownych wysepek - wykresu, widgetu z zewnetrznego API, edytora. Zbyt szeroka granica zamienia maly blad w bialy ekran, zbyt waska daje interfejs w kropki.</p>',
          en: '<p>You know both mechanisms from Vue, just under different names.</p><pre><code>&lt;!-- Vue --&gt;\n&lt;Suspense&gt;\n  &lt;template #default&gt;&lt;Profile /&gt;&lt;/template&gt;\n  &lt;template #fallback&gt;&lt;Skeleton /&gt;&lt;/template&gt;\n&lt;/Suspense&gt;\n\n&lt;script setup&gt;\nonErrorCaptured((err) =&gt; { report(err); return false; });\n&lt;/script&gt;</code></pre><p>In React they are two separate components:</p><pre><code>// React\n&lt;ErrorBoundary fallback={&lt;Retry /&gt;}&gt;\n  &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;\n    &lt;Profile /&gt;\n  &lt;/Suspense&gt;\n&lt;/ErrorBoundary&gt;</code></pre><p><strong>In Vue you used the onErrorCaptured lifecycle hook inside any component; in React you need a boundary component, because only a class with getDerivedStateFromError can catch a render error from its subtree.</strong> There is no hook for it, still not in React 19 - in practice you import <code>react-error-boundary</code> instead of writing the class.</p><p>The division of labour is clean:</p><ul><li><strong>Suspense</strong> catches waiting. A component without its data yet interrupts the render, and the nearest Suspense above shows the fallback.</li><li><strong>An error boundary</strong> catches exceptions thrown during render, in lifecycle methods and in child constructors.</li></ul><p>What an error boundary does <em>not</em> catch: errors in event handlers (<code>onClick</code>), in async code outside render, and inside the boundary itself. That is the same trap as in Vue - <code>onErrorCaptured</code> will not catch a rejected promise from a <code>setTimeout</code> either.</p><p>Practice: one boundary per route, plus one around each risky island - a chart, a third-party widget, an editor. Too wide a boundary turns a small failure into a white screen; too narrow gives you a UI full of holes.</p>'
        },
        pro: {
          pl: '<p>Suspense w Reactie odpalasz nie przez API danych, tylko przez mechanizm renderu: komponent, ktory czyta jeszcze nierozwiazany promise, przerywa render. Od React 19 robi to hook <code>use</code>.</p><pre><code>// React 19\nfunction Profile({ userPromise }) {\n  const user = use(userPromise); // suspenduje dopoki nie rozwiazany\n  return &lt;h1&gt;{user.name}&lt;/h1&gt;;\n}\n\n&lt;ErrorBoundary FallbackComponent={Retry}&gt;\n  &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;\n    &lt;Profile userPromise={fetchUser(id)} /&gt;\n  &lt;/Suspense&gt;\n&lt;/ErrorBoundary&gt;</code></pre><p>Krytyczna zasada: promise musi powstac <em>poza</em> renderem albo byc cache-owany. <code>use(fetch(...))</code> wprost w ciele komponentu tworzy nowy promise przy kazdej probie i daje nieskonczona petle. Dlatego promise pochodzi z RSC, z TanStack Query albo z wlasnego cache po kluczu. We Vue tego problemu nie ma, bo <code>async setup</code> odpala sie raz.</p><p>Minimalna granica bledu, jesli nie chcesz zaleznosci:</p><pre><code>class ErrorBoundary extends React.Component {\n  state = { error: null };\n  static getDerivedStateFromError(error) { return { error }; }\n  componentDidCatch(error, info) { logToSentry(error, info.componentStack); }\n  render() {\n    if (this.state.error) return this.props.fallback;\n    return this.props.children;\n  }\n}</code></pre><p>Produkcyjne szczegoly, ktore odrozniaja dzialajaca aplikacje od demo:</p><ul><li><strong>Reset.</strong> Sam fallback nie wystarcza - potrzebujesz drogi powrotnej. <code>react-error-boundary</code> daje <code>resetKeys</code> i <code>onReset</code>; typowo resetujesz przy zmianie trasy i czyscisz cache zapytania.</li><li><strong>Aktualizacje bez migotania.</strong> Zmiana danych w juz zamontowanym poddrzewie znowu pokazalaby fallback. <code>startTransition</code> albo <code>useDeferredValue</code> utrzymuja stara tresc, dopoki nowa nie bedzie gotowa. To odpowiednik <code>&lt;Suspense timeout&gt;</code>, o ktorym mysli sie we Vue.</li><li><strong>SSR i streaming.</strong> W Next.js kazda granica Suspense to osobny kawalek strumienia HTML - to jest mechanizm, dzieki ktoremu <code>loading.tsx</code> dziala. Zla granulacja granic wprost pogarsza LCP.</li><li><strong>Hydration.</strong> Blad niezgodnosci przy hydracji zlapie granica, ale React i tak przerenderuje klienta od zera - w konsoli zobaczysz ostrzezenie, ktore trzeba naprawic u zrodla.</li><li><strong>Telemetria.</strong> <code>componentDidCatch</code> dostaje <code>info.componentStack</code>; wysylaj to do Sentry razem z identyfikatorem trasy. Bez tego stacktrace z zminifikowanego builda jest bezuzyteczny.</li><li><strong>Nie lap bledow biznesowych.</strong> Blad 404 to stan interfejsu, nie wyjatek. Granica jest dla awarii, ktorych nie przewidziales.</li></ul><p>Pytanie rekrutacyjne: czemu error boundary musi byc klasa. Odpowiedz: bo lapanie bledu wymaga fazy commit i metody statycznej wywolywanej podczas renderu; ekwiwalentu w hookach nie ma i React nie planuje go w najblizszym czasie.</p>',
          en: '<p>React triggers Suspense through the render mechanism rather than a data API: a component that reads a still-pending promise interrupts the render. Since React 19 the <code>use</code> hook does this.</p><pre><code>// React 19\nfunction Profile({ userPromise }) {\n  const user = use(userPromise); // suspends until settled\n  return &lt;h1&gt;{user.name}&lt;/h1&gt;;\n}\n\n&lt;ErrorBoundary FallbackComponent={Retry}&gt;\n  &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;\n    &lt;Profile userPromise={fetchUser(id)} /&gt;\n  &lt;/Suspense&gt;\n&lt;/ErrorBoundary&gt;</code></pre><p>Critical rule: the promise must be created <em>outside</em> the render or be cached. Writing <code>use(fetch(...))</code> in the component body creates a new promise on every attempt and loops forever. That is why the promise comes from an RSC, from TanStack Query, or from your own keyed cache. Vue avoids this because <code>async setup</code> runs once.</p><p>A minimal error boundary if you want no dependency:</p><pre><code>class ErrorBoundary extends React.Component {\n  state = { error: null };\n  static getDerivedStateFromError(error) { return { error }; }\n  componentDidCatch(error, info) { logToSentry(error, info.componentStack); }\n  render() {\n    if (this.state.error) return this.props.fallback;\n    return this.props.children;\n  }\n}</code></pre><p>Production details that separate a working app from a demo:</p><ul><li><strong>Reset.</strong> A fallback alone is not enough - you need a way back. <code>react-error-boundary</code> gives you <code>resetKeys</code> and <code>onReset</code>; typically you reset on route change and clear the query cache.</li><li><strong>Updates without flicker.</strong> Changing data in an already mounted subtree would show the fallback again. <code>startTransition</code> or <code>useDeferredValue</code> keep the old content until the new one is ready. That is the equivalent of the <code>&lt;Suspense timeout&gt;</code> you wish for in Vue.</li><li><strong>SSR and streaming.</strong> In Next.js every Suspense boundary is a separate chunk of the HTML stream - that is the machinery behind <code>loading.tsx</code>. Badly placed boundaries directly hurt LCP.</li><li><strong>Hydration.</strong> A hydration mismatch is caught by the boundary, but React re-renders the client from scratch anyway - the console warning points at a bug you must fix at the source.</li><li><strong>Telemetry.</strong> <code>componentDidCatch</code> receives <code>info.componentStack</code>; ship it to Sentry along with the route id. Without it a minified stack trace is useless.</li><li><strong>Do not catch business errors.</strong> A 404 is a UI state, not an exception. Boundaries are for failures you did not anticipate.</li></ul><p>Interview question: why must an error boundary be a class. Answer: catching requires a commit phase plus a static method invoked during render; there is no hook equivalent and React has no near-term plan for one.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co jest reactowym odpowiednikiem onErrorCaptured z Vue?',
            en: 'What is the React counterpart of Vue onErrorCaptured?'
          },
          options: [
            { pl: 'Hook useError', en: 'The useError hook' },
            { pl: 'Komponent error boundary oparty na klasie z getDerivedStateFromError', en: 'A class-based error boundary component with getDerivedStateFromError' },
            { pl: 'Blok try/catch wokol JSX', en: 'A try/catch block around the JSX' },
            { pl: 'Suspense z propsem onError', en: 'Suspense with an onError prop' }
          ],
          correct: 1,
          explain: {
            pl: 'React nie ma hooka do lapania bledow renderu. Granica musi byc klasa, dlatego w praktyce uzywa sie biblioteki react-error-boundary.',
            en: 'React has no hook for catching render errors. The boundary must be a class, which is why most teams use react-error-boundary.'
          }
        },
        {
          q: {
            pl: 'Ktorego bledu error boundary NIE zlapie?',
            en: 'Which error will an error boundary NOT catch?'
          },
          options: [
            { pl: 'Wyjatku rzuconego w handlerze onClick', en: 'A throw inside an onClick handler' },
            { pl: 'Wyjatku w ciele komponentu podczas renderu', en: 'A throw in the component body during render' },
            { pl: 'Wyjatku w useMemo podczas renderu', en: 'A throw inside useMemo during render' },
            { pl: 'Wyjatku w komponencie zagniezdzonym trzy poziomy nizej', en: 'A throw in a component three levels below' }
          ],
          correct: 0,
          explain: {
            pl: 'Handlery zdarzen dzialaja poza renderem, wiec obsluz je zwyklym try/catch i stanem bledu. To samo ograniczenie ma onErrorCaptured we Vue.',
            en: 'Event handlers run outside render, so handle them with a plain try/catch and an error state. Vue onErrorCaptured has the same limitation.'
          }
        },
        {
          q: {
            pl: 'Dlaczego use(fetch(url)) wywolane wprost w ciele komponentu wpada w nieskonczona petle?',
            en: 'Why does use(fetch(url)) called directly in a component body loop forever?'
          },
          options: [
            { pl: 'Bo fetch nie zwraca promise', en: 'Because fetch does not return a promise' },
            { pl: 'Bo use dziala tylko w komponentach serwerowych', en: 'Because use only works in server components' },
            { pl: 'Bo Suspense ma limit trzech prob', en: 'Because Suspense has a three-attempt limit' },
            { pl: 'Bo kazda proba renderu tworzy nowy promise, ktory natychmiast znow zawiesza komponent', en: 'Because every render attempt creates a new promise, which immediately suspends the component again' }
          ],
          correct: 3,
          explain: {
            pl: 'Promise musi byc stabilny miedzy proba a proba: tworzony w RSC, w loaderze albo cache-owany po kluczu, na przyklad przez TanStack Query.',
            en: 'The promise must be stable across attempts: created in an RSC, in a loader, or cached by key, for example by TanStack Query.'
          }
        },
        {
          q: {
            pl: 'Zmiana filtra powoduje ponowne pobranie danych i caly panel miga szkieletem. Co jest wlasciwym rozwiazaniem?',
            en: 'Changing a filter refetches data and the whole panel flashes a skeleton. What is the right fix?'
          },
          options: [
            { pl: 'Owinac aktualizacje w startTransition albo uzyc useDeferredValue, zeby stara tresc zostala na ekranie', en: 'Wrap the update in startTransition or use useDeferredValue so the old content stays on screen' },
            { pl: 'Usunac granice Suspense', en: 'Remove the Suspense boundary' },
            { pl: 'Dodac key do panelu, zeby wymusic remount', en: 'Add a key to the panel to force a remount' },
            { pl: 'Przeniesc granice bledu wyzej', en: 'Move the error boundary higher' }
          ],
          correct: 0,
          explain: {
            pl: 'Aktualizacje w transition nie chowaja juz widocznej tresci za fallbackiem. Fallback zostaje dla pierwszego zaladowania, gdzie faktycznie nie ma czego pokazac.',
            en: 'Transition updates do not hide already visible content behind the fallback. The fallback stays for the initial load, where there is genuinely nothing to show.'
          }
        }
      ]
    }
  ]
};
