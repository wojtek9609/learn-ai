export default {
  id: 'components-in-depth',
  order: 3,
  icon: '🧩',
  title: {
    pl: 'Komponenty dogłębnie',
    en: 'Components in depth'
  },
  description: {
    pl: 'Kontrakt komponentu od środka: propsy i zdarzenia, sloty scoped, komponenty dynamiczne i asynchroniczne, Teleport i Transition, typowanie generyczne oraz wzorzec renderless.',
    en: 'The component contract from the inside: props and events, scoped slots, dynamic and async components, Teleport and Transition, generic typing, and the renderless pattern.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'props-events-vmodel-advanced',
      title: {
        pl: 'Propsy, zdarzenia i v-model zaawansowanie',
        en: 'Props, events and v-model, advanced'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">v-model is sugar, not magic</text>' +
          '<rect x="30" y="55" width="230" height="100" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="145" y="85" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
          '<text x="145" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">owns the state</text>' +
          '<text x="145" y="132" fill="var(--muted)" font-size="13" text-anchor="middle">const qty = ref(1)</text>' +
          '<rect x="380" y="55" width="230" height="100" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="495" y="85" fill="var(--text)" font-size="15" text-anchor="middle">Child</text>' +
          '<text x="495" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">renders it</text>' +
          '<text x="495" y="132" fill="var(--muted)" font-size="13" text-anchor="middle">never writes it</text>' +
          '<line x1="262" y1="90" x2="376" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1a)"/>' +
          '<text x="319" y="80" fill="var(--muted)" font-size="13" text-anchor="middle">modelValue</text>' +
          '<line x1="376" y1="130" x2="262" y2="130" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l1a)"/>' +
          '<text x="319" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">update:modelValue</text>' +
          '<rect x="30" y="200" width="580" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="230" fill="var(--text)" font-size="14">v-model:qty="q"  ==  :qty="q" + @update:qty="q = $event"</text>' +
          '<text x="50" y="254" fill="var(--muted)" font-size="13">defineModel() returns a writable ref over exactly that pair</text>' +
          '<rect x="30" y="295" width="280" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="170" y="322" fill="var(--ok)" font-size="14" text-anchor="middle">one-way data, events up</text>' +
          '<text x="170" y="344" fill="var(--muted)" font-size="13" text-anchor="middle">predictable, testable</text>' +
          '<rect x="330" y="295" width="280" height="70" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="470" y="322" fill="var(--err)" font-size="14" text-anchor="middle">mutating a prop object</text>' +
          '<text x="470" y="344" fill="var(--muted)" font-size="13" text-anchor="middle">works, and ruins the trail</text>' +
          '</svg>',
        caption: {
          pl: 'Propsy w dół, zdarzenia w górę. v-model to tylko para prop plus update:prop, a defineModel opakowuje ją w zapisywalny ref.',
          en: 'Props down, events up. v-model is just a prop plus an update:prop event, and defineModel wraps that pair in a writable ref.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Pełny obieg v-model: od wpisania znaku w dziecku, przez emit, po nowy prop wracający w dół.',
          en: 'The full v-model round trip: a keystroke in the child, the emit, and the new prop coming back down.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 1 of 5 - steady state</text>' +
              '<rect x="30" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="145" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
              '<rect x="60" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="145" y="142" fill="var(--text)" font-size="16" text-anchor="middle">qty = 1</text>' +
              '<rect x="380" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="495" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Child input</text>' +
              '<rect x="410" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="495" y="142" fill="var(--text)" font-size="16" text-anchor="middle">value 1</text>' +
              '<line x1="262" y1="100" x2="376" y2="100" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3f1a)"/>' +
              '<text x="319" y="90" fill="var(--muted)" font-size="13" text-anchor="middle">qty</text>' +
              '<line x1="376" y1="170" x2="262" y2="170" stroke="var(--border)" stroke-width="2" marker-end="url(#m3f1a)"/>' +
              '<text x="319" y="192" fill="var(--border)" font-size="13" text-anchor="middle">update:qty</text>' +
              '<rect x="30" y="250" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="282" fill="var(--text)" font-size="14">Parent owns qty. The child only reads it.</text>' +
              '<text x="50" y="308" fill="var(--muted)" font-size="13">Nothing is dirty, no effect is queued.</text>' +
              '</svg>',
            label: { pl: 'Stan spoczynku', en: 'Steady state' },
            note: {
              pl: 'Rodzic trzyma qty, dziecko dostaje je jako prop i tylko wyświetla. Kierunek danych jest jeden.',
              en: 'The parent holds qty, the child receives it as a prop and only displays it. Data flows one way.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 2 of 5 - user types</text>' +
              '<rect x="30" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="145" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
              '<rect x="60" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="145" y="142" fill="var(--text)" font-size="16" text-anchor="middle">qty = 1</text>' +
              '<rect x="380" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="495" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Child input</text>' +
              '<rect x="410" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="495" y="142" fill="var(--warn)" font-size="16" text-anchor="middle">value 2</text>' +
              '<line x1="262" y1="100" x2="376" y2="100" stroke="var(--border)" stroke-width="2" marker-end="url(#m3f2a)"/>' +
              '<text x="319" y="90" fill="var(--border)" font-size="13" text-anchor="middle">qty</text>' +
              '<line x1="376" y1="170" x2="262" y2="170" stroke="var(--border)" stroke-width="2" marker-end="url(#m3f2a)"/>' +
              '<text x="319" y="192" fill="var(--border)" font-size="13" text-anchor="middle">update:qty</text>' +
              '<rect x="30" y="250" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="50" y="282" fill="var(--text)" font-size="14">The DOM node is ahead of component state.</text>' +
              '<text x="50" y="308" fill="var(--muted)" font-size="13">This gap is why an IME or a filter can fight the input.</text>' +
              '</svg>',
            label: { pl: 'DOM wyprzedza stan', en: 'DOM runs ahead' },
            note: {
              pl: 'Natywne pole ma już 2, a qty wciąż 1. Ta luka jest zrodlem bugow z IME i filtrowaniem znaków.',
              en: 'The native field already shows 2 while qty is still 1. That gap is where IME and input-filtering bugs live.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent2)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 3 of 5 - emit</text>' +
              '<rect x="30" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="145" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
              '<rect x="60" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="145" y="142" fill="var(--text)" font-size="16" text-anchor="middle">qty = 1</text>' +
              '<rect x="380" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="495" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Child input</text>' +
              '<rect x="410" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="495" y="142" fill="var(--text)" font-size="16" text-anchor="middle">value 2</text>' +
              '<line x1="262" y1="100" x2="376" y2="100" stroke="var(--border)" stroke-width="2"/>' +
              '<line x1="376" y1="170" x2="262" y2="170" stroke="var(--accent2)" stroke-width="3" marker-end="url(#m3f3a)"/>' +
              '<text x="319" y="192" fill="var(--accent2)" font-size="13" text-anchor="middle">update:qty = 2</text>' +
              '<rect x="30" y="250" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="50" y="282" fill="var(--text)" font-size="14">emit("update:qty", 2) - a plain function call, synchronous.</text>' +
              '<text x="50" y="308" fill="var(--muted)" font-size="13">No reactivity involved yet: it is just an invoked listener prop.</text>' +
              '</svg>',
            label: { pl: 'Emit w gore', en: 'Emit goes up' },
            note: {
              pl: 'emit to zwykłe, synchroniczne wywołanie funkcji przekazanej jako onUpdate:qty. Reaktywność jeszcze nie działa.',
              en: 'emit is an ordinary synchronous call of the onUpdate:qty function prop. No reactivity has fired yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 4 of 5 - parent state changes</text>' +
              '<rect x="30" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="145" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
              '<rect x="60" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="145" y="142" fill="var(--warn)" font-size="16" text-anchor="middle">qty = 2</text>' +
              '<rect x="380" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="495" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Child input</text>' +
              '<rect x="410" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="495" y="142" fill="var(--text)" font-size="16" text-anchor="middle">value 2</text>' +
              '<line x1="262" y1="100" x2="376" y2="100" stroke="var(--border)" stroke-width="2" marker-end="url(#m3f4a)"/>' +
              '<line x1="376" y1="170" x2="262" y2="170" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="30" y="250" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="50" y="282" fill="var(--text)" font-size="14">The ref is written, the parent render effect is queued.</text>' +
              '<text x="50" y="308" fill="var(--muted)" font-size="13">Queued, not run: the job lands in the pre/render queue for this tick.</text>' +
              '</svg>',
            label: { pl: 'Zapis i kolejka', en: 'Write and queue' },
            note: {
              pl: 'Zapis do ref oznacza efekt renderujący rodzica jako brudny i wrzuca go do kolejki zadań bieżącego ticka.',
              en: 'Writing the ref marks the parent render effect dirty and pushes the job into this tick queue.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="m3f5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ok)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 5 of 5 - prop flows back down</text>' +
              '<rect x="30" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="145" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Parent</text>' +
              '<rect x="60" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="145" y="142" fill="var(--ok)" font-size="16" text-anchor="middle">qty = 2</text>' +
              '<rect x="380" y="60" width="230" height="130" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="495" y="90" fill="var(--text)" font-size="15" text-anchor="middle">Child input</text>' +
              '<rect x="410" y="110" width="170" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="495" y="142" fill="var(--ok)" font-size="16" text-anchor="middle">value 2</text>' +
              '<line x1="262" y1="100" x2="376" y2="100" stroke="var(--ok)" stroke-width="3" marker-end="url(#m3f5a)"/>' +
              '<text x="319" y="90" fill="var(--ok)" font-size="13" text-anchor="middle">qty = 2</text>' +
              '<line x1="376" y1="170" x2="262" y2="170" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="30" y="250" width="580" height="80" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="50" y="282" fill="var(--text)" font-size="14">Patch runs, the DOM value already matches, so no write happens.</text>' +
              '<text x="50" y="308" fill="var(--muted)" font-size="13">Reject the value in the parent and the input snaps back - that is the test.</text>' +
              '</svg>',
            label: { pl: 'Prop wraca w dol', en: 'Prop comes back' },
            note: {
              pl: 'Patch porównuje wartość z DOM i nic nie zapisuje. Jeśli rodzic odrzuci zmianę, pole wróci do starej wartości - i to jest dowód, że pętla działa.',
              en: 'The patch compares against the DOM and writes nothing. If the parent rejects the value the field snaps back - which proves the loop is real.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kelnera i kuchnię. Kelner przynosi ci talerz, ale sam nie gotuje. Jeśli chcesz mniej soli, nie wchodzisz do kuchni z solniczką - mówisz kelnerowi, a kelner przekazuje to kucharzowi. Kucharz zmienia potrawę i kelner przynosi nowy talerz.</p><p>W komponentach jest tak samo. Rodzic to kuchnia: on ma jedzenie, czyli dane. Dziecko to kelner: dostaje talerz i go pokazuje. Kiedy ktoś kliknie coś w dziecku, dziecko nie zmienia jedzenia samo. Krzyczy do kuchni: "prosze zmienić na dwa". Kuchnia zmienia i wysyła nowy talerz.</p><p>To wygląda na okrężną drogę, ale dzięki temu zawsze wiadomo, kto naprawdę zmienił dane. Gdyby kelner mógł dosypywać soli po drodze, nikt by nie wiedział, skąd wzięła się dziwna potrawa. A tak - jedna kuchnia, jedna prawda.</p>',
          en: '<p>Picture a waiter and a kitchen. The waiter brings you a plate but does not cook. If you want less salt you do not walk into the kitchen with a salt shaker - you tell the waiter, and the waiter tells the cook. The cook changes the dish and the waiter brings a new plate.</p><p>Components work the same way. The parent is the kitchen: it owns the food, which is the data. The child is the waiter: it gets a plate and shows it. When someone clicks something in the child, the child does not change the food itself. It shouts to the kitchen: "please make it two".</p><p>It looks like the long way round, but it means you always know who really changed the data. If the waiter could add salt on the way, nobody could explain the weird dish. One kitchen, one truth.</p>'
        },
        school: {
          pl: '<p>Kontrakt komponentu ma dwie strony: propsy schodzą w dół, zdarzenia idą w górę. <code>v-model</code> nie łamie tej zasady, tylko ją skraca. Zapis <code>v-model:qty="q"</code> kompiluje się do <code>:qty="q"</code> plus <code>@update:qty="q = $event"</code>. Nic więcej się nie dzieje.</p><p>Od Vue 3.4 masz makro <code>defineModel()</code>, które zwraca zapisywalny ref sprzęgnięty z tą parą:</p><pre><code>const qty = defineModel("qty", { type: Number, default: 1 })\n// qty.value = 5 wywołuje emit("update:qty", 5)</code></pre><p>Ważne: <code>defineModel()</code> nie tworzy własnego stanu. To ref, którego getter czyta prop, a setter emituje zdarzenie. Jeśli rodzic zignoruje emit, wartość wróci do starej - i tak ma być.</p><p>Kilka rzeczy, które łatwo przeoczyć:</p><ul><li><strong>Modyfikatory</strong>: <code>v-model.trim</code> działa tylko na natywnych elementach. Dla własnego komponentu dostajesz je jako prop <code>qtyModifiers</code> i sam decydujesz, co z nimi zrobić.</li><li><strong>Deklaruj emity</strong>: <code>defineEmits</code> to nie tylko typy. Zadeklarowane zdarzenia znikają z <code>$attrs</code>, więc nie wyleją się na element główny jako podwójny listener.</li><li><strong>Propsy są płytko readonly</strong>: nie podmienisz <code>props.user</code>, ale <code>props.user.name = "x"</code> przejdzie bez ostrzeżenia i zmieni obiekt rodzica.</li><li><strong>Wartości domyślne obiektów</strong> podaje się funkcją fabryki, żeby instancje nie dzieliły jednej referencji.</li></ul><p>W bibliotece komponentów traktuj listę propsów i emitów jak publiczne API: każda zmiana nazwy jest zmianą łamiącą.</p>',
          en: '<p>The component contract has two directions: props go down, events go up. <code>v-model</code> does not break that rule, it just shortens it. <code>v-model:qty="q"</code> compiles to <code>:qty="q"</code> plus <code>@update:qty="q = $event"</code>. Nothing more.</p><p>Since Vue 3.4 you have the <code>defineModel()</code> macro, which returns a writable ref wired to that pair:</p><pre><code>const qty = defineModel("qty", { type: Number, default: 1 })\n// qty.value = 5 calls emit("update:qty", 5)</code></pre><p>Important: <code>defineModel()</code> does not create local state. It is a ref whose getter reads the prop and whose setter emits. If the parent ignores the emit, the value snaps back - and that is correct.</p><p>Things that are easy to miss:</p><ul><li><strong>Modifiers</strong>: <code>v-model.trim</code> only works on native elements. For your own component you receive them as a <code>qtyModifiers</code> prop and decide what to do.</li><li><strong>Declare your emits</strong>: <code>defineEmits</code> is not only about types. Declared events are removed from <code>$attrs</code>, so they do not also land on the root element as a duplicate listener.</li><li><strong>Props are shallowly readonly</strong>: you cannot replace <code>props.user</code>, but <code>props.user.name = "x"</code> succeeds silently and mutates the parent object.</li><li><strong>Object defaults</strong> must be factory functions so instances do not share one reference.</li></ul><p>In a component library, treat the props and emits list as public API: renaming anything is a breaking change.</p>'
        },
        pro: {
          pl: '<p>Kilka rzeczy, które w design systemie decydują o jakości kontraktu.</p><p><strong>defineModel jest kompilowany, nie runtime\'owy.</strong> Makro dopisuje do komponentu prop <code>modelValue</code> (lub nazwany), emit <code>update:modelValue</code> oraz prop <code>modelModifiers</code>. Ref, który dostajesz, ma lokalny bufor synchronizowany z propsem - dzięki temu <code>v-model</code> działa też, gdy rodzic użyje zwykłego <code>:modelValue</code> bez listenera, ale wtedy stan rozjeżdża się cicho. W komponentach kontrolowanych warto to jawnie zablokować.</p><pre><code>const value = defineModel({ required: true })\nconst mods = defineModel.modifiers // od 3.4: modyfikatory jako obiekt\n\nfunction onInput(e) {\n  let v = e.target.value\n  if (mods.trim) v = v.trim()\n  value.value = v\n}</code></pre><p><strong>Walidacja propsów kosztuje.</strong> <code>validator</code> i sprawdzanie typów działają tylko w trybie deweloperskim, więc nie licz na nie w produkcji. Za to <code>type</code> nadal ma znaczenie runtime dla boolean casting: prop typu Boolean bez wartości (<code>&lt;Btn disabled&gt;</code>) staje się <code>true</code>, a pusty string też. To jedyny przypadek, gdy Vue rzutuje wartość propsa.</p><p><strong>Fallthrough attributes.</strong> Komponent z jednym korzeniem automatycznie scala <code>$attrs</code> na ten korzeń, w tym <code>class</code>, <code>style</code> i listenery. Przy wielu korzeniach albo wrapperze musisz zrobić <code>defineOptions({ inheritAttrs: false })</code> i ręcznie <code>v-bind="$attrs"</code> na właściwym elemencie - inaczej użytkownik biblioteki nie dostanie <code>aria-*</code> tam, gdzie trzeba. To najczęstszy bug dostępności w opakowanych inputach.</p><p><strong>Kilka v-modeli na jednym komponencie</strong> to standard w komponentach złożonych (na przykład <code>v-model:open</code> plus <code>v-model:query</code>). Każdy jest niezależną parą, więc rodzic może kontrolować jeden aspekt, a drugi zostawić niekontrolowanym.</p><p><strong>Wydajność.</strong> Prop przekazany jako świeży obiekt literal w każdym renderze łamie porównanie referencji i wymusza update dziecka mimo <code>PatchFlags</code>. W listach na 500+ wierszy to widać w profilerze. Przekazuj prymitywy albo stabilne referencje z <code>computed</code>, a callbacki trzymaj poza template, jeśli nie muszą być inline.</p><p><strong>Testowanie.</strong> Kontrakt sprawdzasz przez <code>wrapper.emitted("update:qty")</code>, nie przez zaglądanie do wnętrza komponentu. Jeśli test musi znać stan wewnętrzny, kontrakt jest za słaby.</p>',
          en: '<p>A few things that decide contract quality inside a design system.</p><p><strong>defineModel is compile-time, not runtime.</strong> The macro adds a <code>modelValue</code> prop (or the named one), an <code>update:modelValue</code> emit, and a <code>modelModifiers</code> prop. The ref you get keeps a local buffer synced with the prop, which is why <code>v-model</code> still "works" when a parent passes only <code>:modelValue</code> with no listener - except the state then silently diverges. In controlled components it is worth failing loudly instead.</p><pre><code>const value = defineModel({ required: true })\nconst mods = defineModel.modifiers // 3.4+: modifiers as an object\n\nfunction onInput(e) {\n  let v = e.target.value\n  if (mods.trim) v = v.trim()\n  value.value = v\n}</code></pre><p><strong>Prop validation is not free and not there.</strong> <code>validator</code> and type checks run in dev builds only, so never rely on them in production. <code>type</code> does keep one runtime effect: Boolean casting. A Boolean prop with no value (<code>&lt;Btn disabled&gt;</code>) becomes <code>true</code>, and so does an empty string. It is the only case where Vue coerces a prop.</p><p><strong>Fallthrough attributes.</strong> A single-root component merges <code>$attrs</code> onto that root automatically, including <code>class</code>, <code>style</code> and listeners. With multiple roots or a wrapper you must use <code>defineOptions({ inheritAttrs: false })</code> and bind <code>v-bind="$attrs"</code> onto the right element, otherwise consumers cannot get <code>aria-*</code> where it belongs. This is the single most common accessibility bug in wrapped inputs.</p><p><strong>Multiple v-models</strong> are normal in composite components, for example <code>v-model:open</code> plus <code>v-model:query</code>. Each is an independent pair, so a parent can control one aspect and leave the other uncontrolled.</p><p><strong>Performance.</strong> A prop passed as a fresh object literal on every render breaks reference comparison and forces a child update despite <code>PatchFlags</code>. On 500+ row lists that shows up in the profiler. Pass primitives or stable <code>computed</code> references, and hoist callbacks out of the template when they need not be inline.</p><p><strong>Testing.</strong> Assert the contract via <code>wrapper.emitted("update:qty")</code>, never by reaching into internals. If a test needs internal state, the contract is too weak.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Na co dokładnie kompiluje się v-model:qty="q" na komponencie?',
            en: 'What exactly does v-model:qty="q" compile to on a component?'
          },
          options: [
            { pl: 'Na dwukierunkowe wiązanie obsługiwane przez runtime Vue', en: 'A two-way binding handled by the Vue runtime' },
            { pl: 'Na :qty="q" plus @update:qty="q = $event"', en: 'To :qty="q" plus @update:qty="q = $event"' },
            { pl: 'Na provide/inject pod kluczem qty', en: 'To provide/inject under the key qty' },
            { pl: 'Na reaktywny proxy współdzielony przez oba komponenty', en: 'To a reactive proxy shared by both components' }
          ],
          correct: 1,
          explain: {
            pl: 'To czysty lukier składniowy: prop w dół i zdarzenie w górę. Żaden stan nie jest współdzielony między komponentami.',
            en: 'It is pure syntax sugar: a prop down and an event up. No state is shared between the components.'
          }
        },
        {
          q: {
            pl: 'Komponent ma dwa elementy główne i owija input. Co musisz zrobić, żeby aria-label od użytkownika trafił na input?',
            en: 'A component has two root elements and wraps an input. What must you do so a consumer aria-label reaches the input?'
          },
          options: [
            { pl: 'Nic, Vue zawsze scala atrybuty na pierwszy korzeń', en: 'Nothing, Vue always merges attributes onto the first root' },
            { pl: 'Zadeklarować aria-label jako prop i przekazać ręcznie', en: 'Declare aria-label as a prop and pass it manually' },
            { pl: 'Ustawić inheritAttrs na false i zrobić v-bind="$attrs" na inpucie', en: 'Set inheritAttrs to false and v-bind="$attrs" onto the input' },
            { pl: 'Użyć useAttrs i zapisać atrybuty do refa szablonu', en: 'Use useAttrs and write the attributes into a template ref' }
          ],
          correct: 2,
          explain: {
            pl: 'Przy wielu korzeniach automatyczny fallthrough jest wyłączony. Trzeba jawnie wyłączyć dziedziczenie i związać $attrs tam, gdzie mają trafić.',
            en: 'With multiple roots automatic fallthrough is off. You disable inheritance explicitly and bind $attrs where they belong.'
          }
        },
        {
          q: {
            pl: 'Które stwierdzenie o walidacji propsów w Vue 3 jest prawdziwe?',
            en: 'Which statement about prop validation in Vue 3 is true?'
          },
          options: [
            { pl: 'validator i sprawdzanie typów działają tylko w buildzie deweloperskim', en: 'validator and type checks run in development builds only' },
            { pl: 'validator rzuca wyjątek w produkcji i zatrzymuje render', en: 'validator throws in production and halts the render' },
            { pl: 'Deklaracja type usuwa potrzebę typów TypeScript', en: 'Declaring type removes the need for TypeScript types' },
            { pl: 'Propsy są głęboko readonly, więc mutacja zagnieżdżonych pól jest niemożliwa', en: 'Props are deeply readonly, so mutating nested fields is impossible' }
          ],
          correct: 0,
          explain: {
            pl: 'Walidacja jest wycinana z produkcji. Runtime zostaje tylko przy rzutowaniu Boolean, a propsy są readonly wyłącznie płytko.',
            en: 'Validation is stripped from production. The only runtime leftover is Boolean casting, and props are readonly only shallowly.'
          }
        },
        {
          q: {
            pl: 'Rodzic używa :modelValue bez listenera update:modelValue, a dziecko korzysta z defineModel. Co się dzieje?',
            en: 'A parent passes :modelValue with no update:modelValue listener while the child uses defineModel. What happens?'
          },
          options: [
            { pl: 'Vue rzuca błąd runtime przy pierwszym zapisie', en: 'Vue throws a runtime error on the first write' },
            { pl: 'Dziecko pracuje na lokalnym buforze, który cicho rozjeżdża się z propsem', en: 'The child works off a local buffer that silently diverges from the prop' },
            { pl: 'Zapis do refa jest ignorowany i UI nie reaguje wcale', en: 'Writes to the ref are ignored and the UI does not react at all' },
            { pl: 'Vue automatycznie tworzy brakujący listener w rodzicu', en: 'Vue auto-creates the missing listener in the parent' }
          ],
          correct: 1,
          explain: {
            pl: 'defineModel trzyma lokalny bufor, więc UI działa, ale prawda przestaje być jedna. W komponencie kontrolowanym lepiej to jawnie wykryć i ostrzec.',
            en: 'defineModel keeps a local buffer, so the UI still moves but there is no longer one source of truth. In a controlled component, detect it and warn.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'slots-scoped-slots',
      title: {
        pl: 'Sloty i sloty scoped',
        en: 'Slots and scoped slots'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">A slot is a function the child calls</text>' +
          '<rect x="30" y="55" width="250" height="110" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="83" fill="var(--text)" font-size="15" text-anchor="middle">Parent template</text>' +
          '<text x="155" y="108" fill="var(--muted)" font-size="13" text-anchor="middle">#row="{ item }"</text>' +
          '<text x="155" y="132" fill="var(--muted)" font-size="13" text-anchor="middle">compiled to</text>' +
          '<text x="155" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">(props) =&gt; vnodes</text>' +
          '<line x1="282" y1="110" x2="356" y2="110" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l2a)"/>' +
          '<rect x="360" y="55" width="250" height="110" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="485" y="83" fill="var(--text)" font-size="15" text-anchor="middle">Child</text>' +
          '<text x="485" y="108" fill="var(--muted)" font-size="13" text-anchor="middle">slots.row({ item })</text>' +
          '<text x="485" y="132" fill="var(--muted)" font-size="13" text-anchor="middle">called per row,</text>' +
          '<text x="485" y="152" fill="var(--muted)" font-size="13" text-anchor="middle">inside child render</text>' +
          '<rect x="30" y="205" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="232" fill="var(--text)" font-size="14">Scope: content is compiled in the PARENT scope</text>' +
          '<text x="50" y="254" fill="var(--muted)" font-size="13">child data reaches it only through slot props</text>' +
          '<rect x="30" y="290" width="280" height="75" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="170" y="318" fill="var(--ok)" font-size="14" text-anchor="middle">slot props = the API</text>' +
          '<text x="170" y="341" fill="var(--muted)" font-size="13" text-anchor="middle">item, index, selected</text>' +
          '<rect x="330" y="290" width="280" height="75" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="470" y="318" fill="var(--warn)" font-size="14" text-anchor="middle">v-if around a slot</text>' +
          '<text x="470" y="341" fill="var(--muted)" font-size="13" text-anchor="middle">use slots.x, not $slots.x?.().length</text>' +
          '</svg>',
        caption: {
          pl: 'Slot to funkcja skompilowana w zakresie rodzica, którą wywołuje dziecko. Propsy slotu są jedynym kanałem danych z dziecka do treści rodzica.',
          en: 'A slot is a function compiled in the parent scope and invoked by the child. Slot props are the only channel from child data into parent content.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie ramkę na zdjęcie. Ramka jest gotowa: ma szkło, nóżkę i ładny brzeg. Ale w środku jest dziura, bo to ty wkładasz zdjęcie. Ramka nie wie, co włożysz, i wcale nie musi wiedzieć.</p><p>Slot to właśnie taka dziura w komponencie. Komponent robi całą nudną robotę dookoła, a ty wstawiasz do środka to, co chcesz.</p><p>Teraz ciekawsza wersja. Wyobraź sobie ramkę, która sama mówi: "mam miejsce dokładnie dziesięć na piętnaście, i tu jest światło z lewej". Skoro to wiesz, możesz wybrać lepsze zdjęcie. Ramka podaje ci informacje o swoim wnętrzu, a ty i tak decydujesz, co tam trafi.</p><p>To jest slot scoped: dziecko podaje dane, rodzic decyduje o wyglądzie. Nikt nikomu nie wchodzi w kompetencje.</p>',
          en: '<p>Picture a photo frame. The frame is finished: glass, a stand, a nice edge. But there is a hole in the middle, because you put the photo in. The frame does not know what you will put there, and it does not need to.</p><p>A slot is exactly that hole in a component. The component does all the boring work around the edges, and you drop whatever you want into the middle.</p><p>Now the interesting version. Imagine a frame that tells you: "I have space exactly ten by fifteen, and the light comes from the left." Knowing that, you can pick a better photo. The frame hands you facts about its inside, and you still decide what goes there.</p><p>That is a scoped slot: the child supplies the data, the parent decides the look. Nobody steps on anyone.</p>'
        },
        school: {
          pl: '<p>Kompilator SFC zamienia treść slotu w funkcję. <code>&lt;template #row="{ item }"&gt;</code> staje się mniej więcej <code>row: (props) =&gt; [vnode, vnode]</code>. Ta funkcja trafia do dziecka jako obiekt <code>slots</code>, a dziecko wywołuje ją tam, gdzie chce i tyle razy, ile chce.</p><p>Z tego jednego faktu wynika wszystko inne:</p><ul><li>Treść slotu jest kompilowana w <strong>zakresie rodzica</strong>, więc widzi zmienne rodzica, a nie dziecka. Dane dziecka dostaje wyłącznie przez propsy slotu.</li><li>Dziecko może wywołać slot w pętli, wcale albo warunkowo. Slot nie jest "wstawionym HTML-em", tylko wywołaniem.</li><li>W render function robisz to samo ręcznie: <code>slots.row?.({ item })</code>.</li></ul><pre><code>&lt;!-- DataTable.vue --&gt;\n&lt;tr v-for="(item, i) in rows" :key="item.id"&gt;\n  &lt;slot name="row" :item="item" :index="i"&gt;\n    &lt;td&gt;{{ item.label }}&lt;/td&gt;\n  &lt;/slot&gt;\n&lt;/tr&gt;</code></pre><p>Treść między znacznikami <code>&lt;slot&gt;</code> to <strong>fallback</strong> - renderuje się, gdy rodzic nic nie podał. To najtańszy sposób na dobre domyślne zachowanie w design systemie.</p><p>Sloty dynamiczne (<code>#[name]</code>) pozwalają zbudować tabelę, w której każda kolumna ma opcjonalny slot per klucz. Warunek: sprawdzaj obecność przez <code>slots[key]</code>, a nie przez wywołanie i liczenie węzłów, bo wywołanie w trakcie renderu tworzy zależności i potrafi rozjechać aktualizacje.</p><p>W komponencie rodzica sloty widzisz jako <code>$slots</code> w szablonie i jako obiekt zwrócony przez <code>useSlots()</code> w skrypcie. Oba są tym samym zbiorem funkcji, tylko z innej strony.</p><p>Reguła projektowa: jeśli komponent ma prop typu <code>renderLabel</code>, <code>iconHtml</code> albo <code>footerText</code>, to prawie na pewno powinien mieć slot. Prop przekazuje dane, slot przekazuje wygląd, a mieszanie tych dwóch rzeczy w jednym API kończy się listą propsów, której nikt nie chce utrzymywać.</p>',
          en: '<p>The SFC compiler turns slot content into a function. <code>&lt;template #row="{ item }"&gt;</code> becomes roughly <code>row: (props) =&gt; [vnode, vnode]</code>. That function is handed to the child in its <code>slots</code> object, and the child calls it wherever and however many times it likes.</p><p>Everything else follows from that single fact:</p><ul><li>Slot content compiles in the <strong>parent scope</strong>, so it sees parent variables, not child ones. Child data arrives only through slot props.</li><li>The child may call the slot in a loop, conditionally, or not at all. A slot is not "injected HTML", it is a call.</li><li>In a render function you do it by hand: <code>slots.row?.({ item })</code>.</li></ul><pre><code>&lt;!-- DataTable.vue --&gt;\n&lt;tr v-for="(item, i) in rows" :key="item.id"&gt;\n  &lt;slot name="row" :item="item" :index="i"&gt;\n    &lt;td&gt;{{ item.label }}&lt;/td&gt;\n  &lt;/slot&gt;\n&lt;/tr&gt;</code></pre><p>Content between the <code>&lt;slot&gt;</code> tags is the <strong>fallback</strong>, rendered when the parent supplies nothing. It is the cheapest way to ship a sane default in a design system.</p><p>Dynamic slot names (<code>#[name]</code>) let you build a table where every column has an optional per-key slot. One condition: test presence with <code>slots[key]</code>, never by calling the slot and counting nodes - calling during render creates dependencies and can desynchronise updates.</p><p>Design rule: if a component grows a prop like <code>renderLabel</code> or <code>iconHtml</code>, it probably wants a slot instead.</p>'
        },
        pro: {
          pl: '<p><strong>Sloty a granice aktualizacji.</strong> Slot to funkcja domykająca zakres rodzica, więc gdy rodzic się przerenderuje, funkcja jest nowa. Kompilator ratuje to flagami: sloty w pełni statyczne dostają <code>STABLE</code>, a dziecko może wtedy pominąć wymuszony update. Wystarczy jednak <code>v-if</code> albo <code>v-for</code> wokół <code>&lt;template #x&gt;</code>, żeby slot stał się <code>DYNAMIC</code> i każdy render rodzica wymuszał render dziecka. W ciężkich komponentach (tabela, wirtualizowana lista) to bywa główną przyczyną spadku FPS.</p><pre><code>// stabilne\n&lt;Table&gt;&lt;template #row="{ r }"&gt;&lt;Cell :r="r"/&gt;&lt;/template&gt;&lt;/Table&gt;\n\n// dynamiczne - wymusza update dziecka przy kazdym renderze rodzica\n&lt;Table&gt;&lt;template v-if="editable" #row="{ r }"&gt;...&lt;/template&gt;&lt;/Table&gt;</code></pre><p><strong>Fragmenty i klucze.</strong> Wynik slotu to tablica vnode\'ow, czyli fragment. Jeśli owijasz go w <code>Transition</code> albo <code>KeepAlive</code>, musisz mieć dokładnie jeden element - inaczej Vue ostrzeże i przejście nie zadziała. Praktyczny trick: <code>const [only] = slots.default?.() ?? []</code> w render function i jawne ostrzeżenie w dev.</p><p><strong>Detekcja slotów.</strong> <code>slots.x</code> istnieje nawet wtedy, gdy funkcja zwróci pustą tablicę (na przykład treść jest w <code>v-if</code>, które jest fałszywe). Dlatego "czy slot ma zawartość" nie jest pytaniem, na które da się odpowiedzieć uczciwie przed renderem. Projektuj API tak, żeby nie musieć tego wiedzieć: fallback zamiast rozgałęzienia albo jawny prop.</p><p><strong>Typowanie.</strong> W <code>&lt;script setup lang="ts"&gt;</code> deklarujesz sloty przez <code>defineSlots</code>:</p><pre><code>defineSlots&lt;{\n  row(props: { item: Row; index: number }): any\n  empty?(): any\n}&gt;()</code></pre><p>To daje autouzupełnianie propsów slotu u konsumenta w Volar i jest realną wartością w design systemie - bez tego zespoły zgadują nazwy pól.</p><p><strong>Wzorzec dla bibliotek.</strong> Przekazywanie slotów przez warstwę opakowującą: <code>&lt;template v-for="(_, name) in $slots" #[name]="props"&gt;&lt;slot :name="name" v-bind="props ?? {}"/&gt;&lt;/template&gt;</code>. Pozwala zrobić własny wrapper na komponent CHI albo Headless UI bez ręcznego wypisywania każdego slotu, ale pamiętaj, że robi wszystkie sloty dynamicznymi - używaj świadomie.</p><p><strong>Sloty a KeepAlive i Transition razem.</strong> Jeśli budujesz komponent, który owija zawartość slotu w oba te wrappery, ustal jasno, że kontraktem jest dokładnie jeden element z kluczem. Bez tego konsument dostanie działający komponent w demie i cichą awarię animacji w swoim widoku, a debugowanie tego zajmie mu pół dnia.</p>',
          en: '<p><strong>Slots and update boundaries.</strong> A slot is a closure over the parent scope, so every parent re-render produces a new function. The compiler mitigates this with flags: fully static slots get <code>STABLE</code> and the child can skip a forced update. But a single <code>v-if</code> or <code>v-for</code> around <code>&lt;template #x&gt;</code> makes the slots <code>DYNAMIC</code>, and then every parent render forces a child render. In heavy components - tables, virtualised lists - this is a common cause of frame drops.</p><pre><code>// stable\n&lt;Table&gt;&lt;template #row="{ r }"&gt;&lt;Cell :r="r"/&gt;&lt;/template&gt;&lt;/Table&gt;\n\n// dynamic - forces a child update on every parent render\n&lt;Table&gt;&lt;template v-if="editable" #row="{ r }"&gt;...&lt;/template&gt;&lt;/Table&gt;</code></pre><p><strong>Fragments and keys.</strong> A slot call returns an array of vnodes, that is a fragment. If you wrap it in <code>Transition</code> or <code>KeepAlive</code> you need exactly one element, otherwise Vue warns and the transition silently does nothing. Practical trick: <code>const [only] = slots.default?.() ?? []</code> in a render function plus an explicit dev warning.</p><p><strong>Slot detection.</strong> <code>slots.x</code> exists even when the function returns an empty array, for instance because the content sits inside a falsy <code>v-if</code>. So "does this slot have content" is not a question you can answer honestly before rendering. Design the API so you never need to know: a fallback instead of a branch, or an explicit prop.</p><p><strong>Typing.</strong> In <code>&lt;script setup lang="ts"&gt;</code> declare slots with <code>defineSlots</code>:</p><pre><code>defineSlots&lt;{\n  row(props: { item: Row; index: number }): any\n  empty?(): any\n}&gt;()</code></pre><p>That gives consumers slot-prop completion in Volar, and in a design system it is real value - without it teams guess field names.</p><p><strong>Library pattern.</strong> Forwarding slots through a wrapper layer: <code>&lt;template v-for="(_, name) in $slots" #[name]="props"&gt;&lt;slot :name="name" v-bind="props ?? {}"/&gt;&lt;/template&gt;</code>. It lets you wrap a CHI or Headless UI component without listing every slot by hand, but be aware it makes all slots dynamic - use it deliberately.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'W jakim zakresie kompilowana jest treść slotu?',
            en: 'In which scope is slot content compiled?'
          },
          options: [
            { pl: 'W zakresie dziecka, dlatego widzi jego stan', en: 'In the child scope, which is why it sees child state' },
            { pl: 'W zakresie rodzica, a dane dziecka dostaje tylko przez propsy slotu', en: 'In the parent scope, with child data arriving only via slot props' },
            { pl: 'W globalnym zakresie aplikacji', en: 'In the global app scope' },
            { pl: 'W zakresie najbliższego provide', en: 'In the scope of the nearest provide' }
          ],
          correct: 1,
          explain: {
            pl: 'Slot to domknięcie nad zakresem rodzica. Dlatego propsy slotu są jedynym kontraktem danych z dziecka.',
            en: 'A slot closes over the parent scope. That is why slot props are the only data contract from the child.'
          }
        },
        {
          q: {
            pl: 'Co się dzieje, gdy owiniesz <template #row> w v-if w komponencie rodzica?',
            en: 'What happens when you wrap <template #row> in a v-if in the parent?'
          },
          options: [
            { pl: 'Nic, kompilator i tak traktuje sloty jako stabilne', en: 'Nothing, the compiler treats slots as stable regardless' },
            { pl: 'Sloty stają się dynamiczne i każdy render rodzica wymusza render dziecka', en: 'Slots become dynamic and every parent render forces a child render' },
            { pl: 'Slot jest cache\'owany i przestaje reagować na zmiany danych', en: 'The slot gets cached and stops reacting to data changes' },
            { pl: 'Vue rzuca ostrzeżenie o niestabilnym kluczu', en: 'Vue warns about an unstable key' }
          ],
          correct: 1,
          explain: {
            pl: 'Warunkowe sloty tracą flagę STABLE, więc dziecko nie może pominąć aktualizacji. W ciężkich tabelach to realny koszt.',
            en: 'Conditional slots lose the STABLE flag, so the child cannot skip its update. In heavy tables that cost is measurable.'
          }
        },
        {
          q: {
            pl: 'Dlaczego sprawdzanie zawartości slotu przez $slots.default().length bywa zawodne?',
            en: 'Why is checking slot content with $slots.default().length unreliable?'
          },
          options: [
            { pl: 'Bo $slots nie jest reaktywne w script setup', en: 'Because $slots is not reactive in script setup' },
            { pl: 'Bo funkcja slotu może zwrócić puste komentarze lub fragmenty, a wywołanie w renderze tworzy zależności', en: 'Because the slot function may return empty comment nodes or fragments, and calling it during render creates dependencies' },
            { pl: 'Bo length zwraca liczbę znaków, nie węzłów', en: 'Because length returns characters, not nodes' },
            { pl: 'Bo sloty nazwane nie mają metody default', en: 'Because named slots have no default method' }
          ],
          correct: 1,
          explain: {
            pl: 'Pusty v-if zostawia węzeł komentarza, a wywołanie slotu w trakcie renderu podpina zależności. Lepszy jest fallback albo jawny prop.',
            en: 'A falsy v-if leaves a comment node, and calling the slot during render subscribes to its dependencies. A fallback or explicit prop is safer.'
          }
        },
        {
          q: {
            pl: 'Owijasz slot domyślny w <Transition> i przejście nie działa. Najbardziej prawdopodobna przyczyna?',
            en: 'You wrap the default slot in <Transition> and nothing animates. Most likely cause?'
          },
          options: [
            { pl: 'Transition wymaga dokładnie jednego elementu, a slot zwrócił fragment', en: 'Transition needs exactly one element and the slot returned a fragment' },
            { pl: 'Transition nie działa z zawartością slotu w ogóle', en: 'Transition does not work with slot content at all' },
            { pl: 'Brakuje appear w konfiguracji routera', en: 'The router config is missing appear' },
            { pl: 'Slot był scoped, a Transition obsługuje tylko sloty bez propsów', en: 'The slot was scoped and Transition only supports propless slots' }
          ],
          correct: 0,
          explain: {
            pl: 'Wynik slotu to tablica vnode\'ow. Jeśli jest w niej więcej niż jeden element (albo tekst plus komentarz), Transition nie ma czego animować.',
            en: 'A slot call returns an array of vnodes. With more than one element, or text plus a comment, Transition has nothing single to animate.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'dynamic-async-components',
      title: {
        pl: 'Komponenty dynamiczne i asynchroniczne',
        en: 'Dynamic and async components'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">defineAsyncComponent state machine</text>' +
          '<rect x="30" y="55" width="170" height="70" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="115" y="83" fill="var(--text)" font-size="14" text-anchor="middle">mounted</text>' +
          '<text x="115" y="105" fill="var(--muted)" font-size="13" text-anchor="middle">import() starts</text>' +
          '<line x1="202" y1="90" x2="260" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l3a)"/>' +
          '<rect x="265" y="55" width="170" height="70" rx="14" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/>' +
          '<text x="350" y="83" fill="var(--text)" font-size="14" text-anchor="middle">delay 200ms</text>' +
          '<text x="350" y="105" fill="var(--muted)" font-size="13" text-anchor="middle">render nothing</text>' +
          '<line x1="437" y1="90" x2="495" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l3a)"/>' +
          '<rect x="500" y="55" width="110" height="70" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="555" y="90" fill="var(--warn)" font-size="14" text-anchor="middle">loading</text>' +
          '<text x="555" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">skeleton</text>' +
          '<line x1="115" y1="127" x2="115" y2="210" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l3a)"/>' +
          '<rect x="30" y="215" width="170" height="70" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="115" y="243" fill="var(--ok)" font-size="14" text-anchor="middle">resolved</text>' +
          '<text x="115" y="265" fill="var(--muted)" font-size="13" text-anchor="middle">real component</text>' +
          '<line x1="555" y1="127" x2="555" y2="210" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l3a)"/>' +
          '<rect x="470" y="215" width="140" height="70" rx="14" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="540" y="243" fill="var(--err)" font-size="14" text-anchor="middle">timeout / error</text>' +
          '<text x="540" y="265" fill="var(--muted)" font-size="13" text-anchor="middle">errorComponent</text>' +
          '<rect x="30" y="315" width="580" height="60" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="342" fill="var(--text)" font-size="14">component :is - keep state with KeepAlive, reset it with :key</text>' +
          '<text x="50" y="364" fill="var(--muted)" font-size="13">a chunk that fails once will fail forever unless you re-run the loader</text>' +
          '</svg>',
        caption: {
          pl: 'Cykl życia komponentu asynchronicznego: opóźnienie, stan ładowania, sukces albo błąd. Obok tego component :is i decyzja, czy stan ma przeżyć podmianę.',
          en: 'The async component lifecycle: delay, loading state, success or error. Alongside it, component :is and the choice of whether state survives a swap.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kino z jednym ekranem. Ekran zawsze jest ten sam, ale film się zmienia: raz bajka, raz komedia. Nie budujesz nowego kina dla każdego filmu - wkładasz inną rolkę.</p><p>Tak działa komponent dynamiczny: jedno miejsce, a w środku różne rzeczy, zależnie od tego, co wybierzesz.</p><p>Bywa jednak tak, że rolka nie leży w kinie, tylko trzeba ją przywieźć z magazynu. Wtedy przez chwilę nic nie ma. Dobre kino nie gasi światła od razu - najpierw czeka sekundę (może rolka przyjedzie natychmiast), a jak nie przyjedzie, pokazuje planszę "zaraz zaczynamy". A gdyby ciężarówka utknęła, wyświetla "przepraszamy, spróbuj jeszcze raz" zamiast czarnego ekranu.</p><p>Te trzy plansze - nic, czekamy, nie udało się - to cała sztuka.</p>',
          en: '<p>Picture a cinema with one screen. The screen is always the same, the film changes: a cartoon now, a comedy later. You do not build a new cinema per film - you load a different reel.</p><p>That is a dynamic component: one place, different things inside depending on what you pick.</p><p>Sometimes the reel is not in the building and has to come from a warehouse. For a moment there is nothing. A good cinema does not kill the lights immediately - it waits a second, because the reel might arrive at once, and only then shows a "starting shortly" card. And if the truck gets stuck, it shows "sorry, please try again" instead of a black screen.</p><p>Those three cards - nothing, waiting, failed - are the whole craft.</p>'
        },
        school: {
          pl: '<p><code>&lt;component :is="X"&gt;</code> przyjmuje obiekt komponentu, nazwę zarejestrowanego komponentu albo nazwę taga HTML. W <code>&lt;script setup&gt;</code> przekazujesz zaimportowany obiekt, nie string - stringi działają tylko dla rejestracji globalnej.</p><p>Dwie decyzje przy podmianie:</p><ul><li><strong>Zachować stan?</strong> Owiń w <code>&lt;KeepAlive :include="[...]" :max="10"&gt;</code>. Instancja nie jest niszczona, tylko dezaktywowana, a zamiast <code>onUnmounted</code> dostajesz <code>onDeactivated</code>.</li><li><strong>Wymusić reset?</strong> Dodaj <code>:key</code>, które zmienia się razem z danymi. To jedyny pewny sposób, żeby ten sam komponent z innym ID zaczął od zera.</li></ul><p>Komponent asynchroniczny to leniwy import opakowany w fabrykę:</p><pre><code>const Chart = defineAsyncComponent({\n  loader: () =&gt; import("./HeavyChart.vue"),\n  loadingComponent: ChartSkeleton,\n  errorComponent: ChartError,\n  delay: 200,\n  timeout: 10000\n})</code></pre><p><code>delay</code> to najważniejszy parametr UX. Przez pierwsze 200 ms nie renderuje się nic. Jeśli chunk przyjdzie z cache w 30 ms, użytkownik nie zobaczy mignięcia skeletonu - a mignięcie jest gorsze niż krótka pauza.</p><p><code>timeout</code> nie anuluje pobierania, tylko po zadanym czasie przełącza widok na <code>errorComponent</code>. Zawsze dawaj tam przycisk "spróbuj ponownie", bo dynamiczny import jest cache\'owany przez przeglądarkę razem z odrzuceniem: powtórne wywołanie tego samego <code>import()</code> po błędzie sieci może od razu zwrócić odrzuconą obietnicę.</p><p>Pamiętaj też, że <code>defineAsyncComponent</code> tworzysz raz, poza funkcją renderującą. Fabryka wywołana w środku <code>computed</code> albo w szablonie generuje nowy typ komponentu przy każdym renderze, więc Vue będzie w kółko odmontowywać i montować całe poddrzewo, gubiąc stan i fokus.</p><p>Kiedy w ogóle to stosować? Wtedy, gdy komponent jest ciężki albo rzadko używany: edytor tekstu, mapa, wykres, panel administracyjny. Dla małego przycisku osobny chunk to czysta strata.</p>',
          en: '<p><code>&lt;component :is="X"&gt;</code> accepts a component object, the name of a registered component, or an HTML tag name. In <code>&lt;script setup&gt;</code> pass the imported object, not a string - strings only resolve for globally registered components.</p><p>Two decisions when swapping:</p><ul><li><strong>Keep state?</strong> Wrap it in <code>&lt;KeepAlive :include="[...]" :max="10"&gt;</code>. The instance is deactivated rather than destroyed, and instead of <code>onUnmounted</code> you get <code>onDeactivated</code>.</li><li><strong>Force a reset?</strong> Add a <code>:key</code> that changes with the data. It is the only reliable way to make the same component start fresh for a different ID.</li></ul><p>An async component is a lazy import wrapped in a factory:</p><pre><code>const Chart = defineAsyncComponent({\n  loader: () =&gt; import("./HeavyChart.vue"),\n  loadingComponent: ChartSkeleton,\n  errorComponent: ChartError,\n  delay: 200,\n  timeout: 10000\n})</code></pre><p><code>delay</code> is the UX-critical option. For the first 200 ms nothing renders. If the chunk arrives from cache in 30 ms the user never sees a skeleton flash - and a flash reads worse than a short pause.</p><p><code>timeout</code> does not cancel the fetch; after the given time it swaps the view for <code>errorComponent</code>. Always put a retry button there, because a dynamic import is cached together with its rejection: calling the same <code>import()</code> again after a network failure can hand you the rejected promise immediately.</p>'
        },
        pro: {
          pl: '<p><strong>Retry, który naprawdę działa.</strong> Specyfikacja modułów ES cache\'uje wynik <code>import()</code>, także odrzucony. Ponowne wywołanie tego samego specyfikatora po błędzie sieci zwykle nie odpali nowego żądania. W produkcji dokłada się do tego wdrożenie: po deployu stare hasze chunków znikają, a otwarta karta próbuje pobrać nieistniejący plik i dostaje 404 albo HTML strony błędu, co kończy się <code>Failed to fetch dynamically imported module</code>.</p><pre><code>function lazyWithRetry(path, tries = 2) {\n  return () =&gt; import(/* @vite-ignore */ path)\n    .catch((e) =&gt; {\n      if (tries &lt;= 0) throw e\n      const bust = path + "?t=" + Date.now()\n      return lazyWithRetry(bust, tries - 1)()\n    })\n}</code></pre><p>W praktyce dodaj globalny handler na <code>vite:preloadError</code> i po nieudanym retry zaproponuj przeładowanie strony - to jedyne uczciwe wyjście po zmianie manifestu.</p><p><strong>Async plus Suspense.</strong> <code>defineAsyncComponent</code> obsługuje leniwy komponent, a <code>&lt;Suspense&gt;</code> obsługuje asynchroniczny <code>setup()</code> (top-level await). Można je łączyć: pod <code>Suspense</code> opcje <code>loadingComponent</code> nie działają, bo to <code>Suspense</code> decyduje o fallbacku. Pamiętaj, że <code>Suspense</code> jest wciąż eksperymentalne i najczęściej zamiast niego wystarcza jawny stan ładowania w composable.</p><p><strong>KeepAlive i pamięć.</strong> Domyślnie cache jest nieograniczony, więc panel z dwudziestoma zakładkami wykresów potrafi trzymać dwadzieścia żywych instancji z listenerami i obserwatorami. Ustawiaj <code>:max</code> (LRU), a w <code>onDeactivated</code> zatrzymuj timery i strumienie. Klucz cache to typ komponentu plus klucz vnode - zmiana <code>:key</code> tworzy nowy wpis, nie podmienia istniejącego.</p><p><strong>Granularność chunków.</strong> Lazy-loading pojedynczego przycisku to strata: każdy chunk to osobny request i osobne opóźnienie kolejki. Sensowne progi to komponenty od ~30-50 kB gzip albo takie, które ciągną ciężką zależność (edytor kodu, biblioteka wykresów, mapa). Dla ścieżek, w które użytkownik prawdopodobnie wejdzie, dołóż prefetch na hover albo w <code>requestIdleCallback</code> - zmienia to odczuwalny czas z 600 ms na zero.</p><p><strong>SSR.</strong> Komponenty async są na serwerze rozwiązywane synchronicznie w trakcie renderu, ale <code>loadingComponent</code> nigdy się nie renderuje. Jeśli klient i serwer zdecydują inaczej, dostaniesz błąd hydratacji - stąd wzorzec <code>ClientOnly</code> w Nuxcie.</p>',
          en: '<p><strong>Retry that actually retries.</strong> The ES module spec caches the result of <code>import()</code>, including rejections. Calling the same specifier again after a network failure usually fires no new request. Deployment makes it worse: after a release the old chunk hashes are gone, and an open tab requesting a missing file gets a 404 or an HTML error page, which surfaces as <code>Failed to fetch dynamically imported module</code>.</p><pre><code>function lazyWithRetry(path, tries = 2) {\n  return () =&gt; import(/* @vite-ignore */ path)\n    .catch((e) =&gt; {\n      if (tries &lt;= 0) throw e\n      const bust = path + "?t=" + Date.now()\n      return lazyWithRetry(bust, tries - 1)()\n    })\n}</code></pre><p>In practice also register a global <code>vite:preloadError</code> handler and, once retries are exhausted, offer a full reload - after a manifest change that is the only honest option.</p><p><strong>Async plus Suspense.</strong> <code>defineAsyncComponent</code> handles a lazy component; <code>&lt;Suspense&gt;</code> handles an async <code>setup()</code> (top-level await). They compose, but under <code>Suspense</code> the <code>loadingComponent</code> option is ignored because <code>Suspense</code> owns the fallback. Note that <code>Suspense</code> is still experimental, and an explicit loading state inside a composable usually beats it.</p><p><strong>KeepAlive and memory.</strong> The cache is unbounded by default, so a dashboard with twenty chart tabs can hold twenty live instances with their listeners and observers. Set <code>:max</code> (LRU) and stop timers and streams in <code>onDeactivated</code>. The cache key is the component type plus the vnode key - changing <code>:key</code> creates a new entry rather than replacing one.</p><p><strong>Chunk granularity.</strong> Lazy-loading a single button is a loss: each chunk is another request and another queue delay. Sensible thresholds are components from roughly 30-50 kB gzipped, or ones dragging in a heavy dependency (code editor, charting library, map). For routes users are likely to hit, prefetch on hover or in <code>requestIdleCallback</code> - that turns a perceived 600 ms into zero.</p><p><strong>SSR.</strong> Async components resolve synchronously during server render, and <code>loadingComponent</code> never renders there. If client and server disagree you get a hydration mismatch - which is exactly why Nuxt ships the <code>ClientOnly</code> pattern.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Do czego służy opcja delay w defineAsyncComponent?',
            en: 'What is the delay option in defineAsyncComponent for?'
          },
          options: [
            { pl: 'Opóźnia start pobierania chunku', en: 'It delays the start of the chunk download' },
            { pl: 'Wstrzymuje pokazanie loadingComponent, żeby uniknąć mignięcia skeletonu', en: 'It holds back the loadingComponent to avoid a skeleton flash' },
            { pl: 'Ustawia limit czasu, po którym pokaże się błąd', en: 'It sets the deadline after which the error state shows' },
            { pl: 'Opóźnia hydratację komponentu na kliencie', en: 'It delays client-side hydration of the component' }
          ],
          correct: 1,
          explain: {
            pl: 'Pobieranie startuje od razu. delay decyduje tylko, po jakim czasie pojawi się stan ładowania; limit czasu to timeout.',
            en: 'The download starts immediately. delay only decides when the loading state appears; the deadline is timeout.'
          }
        },
        {
          q: {
            pl: 'Chcesz, żeby ten sam komponent szczegółów zaczynał od zera po zmianie ID rekordu. Co robisz?',
            en: 'You want the same detail component to start fresh when the record ID changes. What do you do?'
          },
          options: [
            { pl: 'Dodajesz :key powiązane z ID, żeby wymusić nową instancję', en: 'Add a :key bound to the ID to force a new instance' },
            { pl: 'Owijasz w KeepAlive', en: 'Wrap it in KeepAlive' },
            { pl: 'Wywołujesz forceUpdate w watcherze', en: 'Call forceUpdate in a watcher' },
            { pl: 'Zmieniasz komponent na asynchroniczny', en: 'Convert it to an async component' }
          ],
          correct: 0,
          explain: {
            pl: 'Zmiana klucza niszczy starą instancję i tworzy nową z czystym stanem. KeepAlive robi dokładnie odwrotność.',
            en: 'Changing the key destroys the old instance and creates a clean one. KeepAlive does the exact opposite.'
          }
        },
        {
          q: {
            pl: 'Po deployu użytkownicy z otwartą kartą widzą błąd Failed to fetch dynamically imported module. Dlaczego zwykły retry nie pomaga?',
            en: 'After a deploy, users with an open tab see Failed to fetch dynamically imported module. Why does a naive retry not help?'
          },
          options: [
            { pl: 'Bo Vue blokuje ponowne montowanie po błędzie', en: 'Because Vue blocks remounting after an error' },
            { pl: 'Bo import() cache\'uje też odrzucenie, a stary hasz chunku i tak już nie istnieje', en: 'Because import() caches the rejection too, and the old chunk hash no longer exists anyway' },
            { pl: 'Bo timeout jest ustawiony za nisko', en: 'Because the timeout is set too low' },
            { pl: 'Bo service worker blokuje ponowne żądania', en: 'Because the service worker blocks repeat requests' }
          ],
          correct: 1,
          explain: {
            pl: 'Ten sam specyfikator zwróci zapamiętane odrzucenie. Trzeba zmienić URL (cache bust) albo uczciwie zaproponować przeładowanie strony.',
            en: 'The same specifier returns the memoised rejection. You need a changed URL (cache bust) or an honest full-page reload prompt.'
          }
        },
        {
          q: {
            pl: 'Panel ma 20 zakładek z wykresami owiniętych w KeepAlive bez dodatkowych opcji. Co jest największym ryzykiem?',
            en: 'A dashboard has 20 chart tabs wrapped in KeepAlive with no extra options. What is the main risk?'
          },
          options: [
            { pl: 'Zakładki będą się przełączać wolniej niż bez KeepAlive', en: 'Tabs will switch more slowly than without KeepAlive' },
            { pl: 'Komponenty stracą stan przy przełączeniu', en: 'Components will lose their state when switching' },
            { pl: 'Cache jest nieograniczony, więc 20 żywych instancji trzyma timery, listenery i pamięć', en: 'The cache is unbounded, so 20 live instances hold timers, listeners and memory' },
            { pl: 'onMounted przestanie się wywoływać w ogóle', en: 'onMounted will stop firing entirely' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez :max KeepAlive trzyma wszystko. Ustaw limit LRU i sprzątaj zasoby w onDeactivated.',
            en: 'Without :max, KeepAlive keeps everything. Set an LRU limit and release resources in onDeactivated.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'teleport-transitions',
      title: {
        pl: 'Teleport i Transition',
        en: 'Teleport and Transition'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Teleport moves the DOM, not the component</text>' +
          '<rect x="30" y="50" width="260" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="76" fill="var(--text)" font-size="14" text-anchor="middle">component tree</text>' +
          '<rect x="55" y="92" width="210" height="40" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="160" y="117" fill="var(--text)" font-size="13" text-anchor="middle">Card (overflow hidden)</text>' +
          '<rect x="80" y="145" width="185" height="40" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="172" y="170" fill="var(--text)" font-size="13" text-anchor="middle">Modal - provide/inject OK</text>' +
          '<rect x="350" y="50" width="260" height="150" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="76" fill="var(--text)" font-size="14" text-anchor="middle">real DOM</text>' +
          '<rect x="375" y="92" width="210" height="40" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/>' +
          '<text x="480" y="117" fill="var(--muted)" font-size="13" text-anchor="middle">body</text>' +
          '<rect x="400" y="145" width="185" height="40" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="492" y="170" fill="var(--text)" font-size="13" text-anchor="middle">modal node, no clipping</text>' +
          '<line x1="270" y1="165" x2="396" y2="165" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m3l4a)"/>' +
          '<text x="333" y="155" fill="var(--accent2)" font-size="13" text-anchor="middle">to="body"</text>' +
          '<rect x="30" y="230" width="580" height="145" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="258" fill="var(--text)" font-size="14">Transition classes, enter direction</text>' +
          '<rect x="50" y="275" width="160" height="42" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="130" y="302" fill="var(--warn)" font-size="13" text-anchor="middle">v-enter-from</text>' +
          '<line x1="212" y1="296" x2="248" y2="296" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4a)"/>' +
          '<rect x="252" y="275" width="160" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="332" y="302" fill="var(--accent)" font-size="13" text-anchor="middle">v-enter-active</text>' +
          '<line x1="414" y1="296" x2="450" y2="296" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l4a)"/>' +
          '<rect x="454" y="275" width="140" height="42" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="524" y="302" fill="var(--ok)" font-size="13" text-anchor="middle">v-enter-to</text>' +
          '<text x="50" y="348" fill="var(--muted)" font-size="13">the swap happens on the next frame, that is what makes CSS animate</text>' +
          '</svg>',
        caption: {
          pl: 'Teleport przenosi węzeł DOM poza kontener obcinający, zachowując miejsce w drzewie komponentów. Transition dokłada i zdejmuje klasy w rytmie klatek.',
          en: 'Teleport moves the DOM node out of a clipping container while keeping its place in the component tree. Transition adds and removes classes in step with animation frames.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Klatka po klatce: dokładnie kiedy Vue dokłada i zdejmuje klasy przejścia oraz co się dzieje po transitionend.',
          en: 'Frame by frame: exactly when Vue adds and removes transition classes, and what happens after transitionend.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 1 - v-if becomes true</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="60" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="105" y="131" fill="var(--warn)" font-size="14" text-anchor="middle">box</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">classes on the node right now</text>' +
              '<rect x="50" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="150" y="257" fill="var(--warn)" font-size="13" text-anchor="middle">v-enter-from</text>' +
              '<rect x="266" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="366" y="257" fill="var(--accent)" font-size="13" text-anchor="middle">v-enter-active</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">Node inserted, start styles applied, nothing animates yet.</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">Browser has not painted this state.</text>' +
              '</svg>',
            label: { pl: 'Wstawienie wezla', en: 'Node inserted' },
            note: {
              pl: 'Vue wstawia element i od razu dokłada v-enter-from oraz v-enter-active. Nic się jeszcze nie animuje.',
              en: 'Vue inserts the element and immediately adds v-enter-from and v-enter-active. Nothing animates yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 2 - forced reflow</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="60" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="105" y="131" fill="var(--warn)" font-size="14" text-anchor="middle">box</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">the start state is now committed</text>' +
              '<rect x="50" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="150" y="257" fill="var(--warn)" font-size="13" text-anchor="middle">v-enter-from</text>' +
              '<rect x="266" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="366" y="257" fill="var(--accent)" font-size="13" text-anchor="middle">v-enter-active</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">Vue reads offsetHeight to force a style flush.</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">Without it the browser would batch both states into one.</text>' +
              '</svg>',
            label: { pl: 'Wymuszony reflow', en: 'Forced reflow' },
            note: {
              pl: 'Vue odczytuje offsetHeight, żeby przeglądarka zatwierdziła stan początkowy. Bez tego oba stany scaliłyby się w jeden i animacji by nie było.',
              en: 'Vue reads offsetHeight so the browser commits the start state. Without it both states collapse into one and no animation runs.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 3 - class swap</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="230" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="275" y="131" fill="var(--accent)" font-size="14" text-anchor="middle">box</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">from is removed, to is added</text>' +
              '<rect x="50" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="257" fill="var(--border)" font-size="13" text-anchor="middle">v-enter-from</text>' +
              '<rect x="266" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="366" y="257" fill="var(--accent)" font-size="13" text-anchor="middle">v-enter-active</text>' +
              '<rect x="482" y="230" width="120" height="42" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="542" y="257" fill="var(--ok)" font-size="13" text-anchor="middle">v-enter-to</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">The CSS transition on v-enter-active now has two states to</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">interpolate between. The animation starts here.</text>' +
              '</svg>',
            label: { pl: 'Podmiana klas', en: 'Class swap' },
            note: {
              pl: 'W następnej klatce Vue zdejmuje v-enter-from i dokłada v-enter-to. Dopiero teraz CSS ma dwa stany i zaczyna interpolować.',
              en: 'On the next frame Vue removes v-enter-from and adds v-enter-to. Only now does CSS have two states to interpolate.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 4 - transitionend</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="480" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="525" y="131" fill="var(--ok)" font-size="14" text-anchor="middle">box</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">all transition classes removed</text>' +
              '<rect x="50" y="230" width="416" height="42" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="258" y="257" fill="var(--ok)" font-size="13" text-anchor="middle">clean node, onAfterEnter fired</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">Vue listens for transitionend on the longest property.</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">No CSS duration means the hook fires immediately.</text>' +
              '</svg>',
            label: { pl: 'Koniec wejscia', en: 'Enter finished' },
            note: {
              pl: 'Po transitionend Vue zdejmuje wszystkie klasy i woła onAfterEnter. Jeśli CSS nie definiuje czasu trwania, dzieje się to natychmiast.',
              en: 'After transitionend Vue strips every class and calls onAfterEnter. With no CSS duration, that happens immediately.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 5 - leave begins</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="480" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="525" y="131" fill="var(--warn)" font-size="14" text-anchor="middle">box</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">node is still in the DOM</text>' +
              '<rect x="50" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="150" y="257" fill="var(--warn)" font-size="13" text-anchor="middle">v-leave-from</text>' +
              '<rect x="266" y="230" width="200" height="42" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="366" y="257" fill="var(--accent)" font-size="13" text-anchor="middle">v-leave-active</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">v-if is already false, but removal is deferred.</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">Two nodes coexist unless you use mode out-in.</text>' +
              '</svg>',
            label: { pl: 'Start wyjscia', en: 'Leave begins' },
            note: {
              pl: 'v-if jest już fałszywe, ale węzeł zostaje w DOM na czas animacji. Bez mode out-in stary i nowy element istnieją równocześnie.',
              en: 'v-if is already false, yet the node stays in the DOM for the animation. Without mode out-in the old and new elements coexist.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Frame 6 - node removed</text>' +
              '<rect x="30" y="55" width="580" height="120" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="82" fill="var(--muted)" font-size="13">element position and opacity</text>' +
              '<rect x="60" y="100" width="90" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>' +
              '<text x="105" y="131" fill="var(--border)" font-size="14" text-anchor="middle">gone</text>' +
              '<line x1="60" y1="165" x2="590" y2="165" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="215" fill="var(--text)" font-size="14">v-leave-to reached, then unmount</text>' +
              '<rect x="50" y="230" width="416" height="42" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="258" y="257" fill="var(--err)" font-size="13" text-anchor="middle">onAfterLeave, element unmounted</text>' +
              '<text x="50" y="320" fill="var(--muted)" font-size="13">A wrong CSS duration leaves ghost nodes on screen.</text>' +
              '<text x="50" y="344" fill="var(--muted)" font-size="13">Set :duration when JS and CSS timings disagree.</text>' +
              '</svg>',
            label: { pl: 'Usuniecie wezla', en: 'Node removed' },
            note: {
              pl: 'Dopiero po zakończeniu animacji Vue odmontowuje element i woła onAfterLeave. Rozjazd czasów CSS i JS zostawia duchy w DOM.',
              en: 'Only after the animation ends does Vue unmount the element and call onAfterLeave. Mismatched CSS and JS timings leave ghost nodes.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że siedzisz w małym pudełku z niskim sufitem. Chcesz podnieść rękę wysoko, ale sufit ci nie pozwala. Ktoś mądry mówi: "wystaw rękę przez okno". Ręka nadal jest twoja, nadal ją czujesz, ale już nie obija się o sufit.</p><p>Tak działa Teleport. Okienko z komunikatem należy do twojego komponentu, ale jego obrazek ląduje na samym wierzchu strony, gdzie nic go nie przycina.</p><p>A Transition to instrukcja "wchodź powoli". Kiedy coś ma się pojawić, ktoś najpierw ustawia je w pozycji startowej, czeka jedno mrugnięcie, a potem mówi "teraz idź". To mrugnięcie jest kluczowe. Bez niego rzecz po prostu pojawia się na miejscu i nikt nie widzi ruchu - jak w filmie, w którym wycięto wszystkie klatki oprócz pierwszej i ostatniej.</p>',
          en: '<p>Imagine sitting in a small box with a low ceiling. You want to raise your arm high, but the ceiling is in the way. Someone sensible says: "stick your arm out the window." The arm is still yours, you still feel it, it just stops hitting the ceiling.</p><p>That is Teleport. The little dialog belongs to your component, but its picture ends up on top of the whole page where nothing crops it.</p><p>Transition is the instruction "come in slowly". When something should appear, someone first puts it in the starting pose, waits one blink, and then says "now go". That blink is the whole trick. Without it the thing simply appears in place and nobody sees movement - like a film with every frame cut except the first and the last.</p>'
        },
        school: {
          pl: '<p><code>&lt;Teleport to="body"&gt;</code> renderuje zawartość w innym miejscu drzewa DOM, ale <strong>nie</strong> zmienia miejsca komponentu w drzewie Vue. Dlatego modal wewnątrz karty z <code>overflow: hidden</code> nadal widzi <code>inject</code> z rodzica, nadal emituje zdarzenia do rodzica i nadal odmontowuje się razem z nim - a mimo to nie jest obcinany ani przykrywany przez sąsiadów z powodu <code>z-index</code>.</p><p>To rozwiązuje trzy klasyczne bugi design systemu: obcinanie przez <code>overflow</code>, uwięzienie w kontekście stackingu (rodzic z <code>transform</code> albo <code>filter</code> tworzy nowy kontekst i <code>position: fixed</code> przestaje działać) oraz konflikty <code>z-index</code>.</p><pre><code>&lt;Teleport to="#overlays" :disabled="isInline"&gt;\n  &lt;div class="dialog" role="dialog" aria-modal="true"&gt;...&lt;/div&gt;\n&lt;/Teleport&gt;</code></pre><p><code>&lt;Transition&gt;</code> nie animuje niczego samo z siebie. Dokłada i zdejmuje sześć klas w określonych momentach: <code>v-enter-from</code>, <code>v-enter-active</code>, <code>v-enter-to</code> i analogicznie dla wyjścia. Animację robi CSS albo twoje hooki JS.</p><p>Rzeczy, które trzeba wiedzieć od razu:</p><ul><li>Transition wymaga <strong>jednego</strong> elementu głównego. Fragment albo dwa węzły równolegle nie zadziałają.</li><li><code>mode="out-in"</code> jest prawie zawsze tym, czego chcesz przy podmianie widoku - inaczej stary i nowy element istnieją naraz i układ skacze.</li><li>Prop <code>appear</code> odpala animację przy pierwszym renderze.</li><li><code>&lt;TransitionGroup&gt;</code> dokłada klasę <code>v-move</code> i używa techniki FLIP, żeby elementy listy płynnie zmieniały pozycję. Wymaga stabilnych kluczy.</li></ul><p>Do modala potrzebujesz obu: Teleport dla warstwy i Transition dla wejścia i wyjścia.</p>',
          en: '<p><code>&lt;Teleport to="body"&gt;</code> renders content elsewhere in the DOM tree but does <strong>not</strong> move the component in the Vue tree. So a modal inside a card with <code>overflow: hidden</code> still sees the parent <code>inject</code>, still emits to the parent, still unmounts with it - and yet is not clipped or covered by neighbours because of <code>z-index</code>.</p><p>That kills three classic design-system bugs: clipping by <code>overflow</code>, being trapped in a stacking context (a parent with <code>transform</code> or <code>filter</code> creates one, and <code>position: fixed</code> stops behaving), and <code>z-index</code> wars.</p><pre><code>&lt;Teleport to="#overlays" :disabled="isInline"&gt;\n  &lt;div class="dialog" role="dialog" aria-modal="true"&gt;...&lt;/div&gt;\n&lt;/Teleport&gt;</code></pre><p><code>&lt;Transition&gt;</code> animates nothing on its own. It adds and removes six classes at defined moments: <code>v-enter-from</code>, <code>v-enter-active</code>, <code>v-enter-to</code>, and the leave equivalents. CSS or your JS hooks do the actual animating.</p><p>Things to know up front:</p><ul><li>Transition needs <strong>one</strong> root element. A fragment or two sibling nodes will not work.</li><li><code>mode="out-in"</code> is almost always what you want when swapping views - otherwise old and new coexist and the layout jumps.</li><li>The <code>appear</code> prop runs the animation on the very first render.</li><li><code>&lt;TransitionGroup&gt;</code> adds a <code>v-move</code> class and uses the FLIP technique so list items glide to new positions. It needs stable keys.</li></ul><p>A modal needs both: Teleport for the layer and Transition for enter and leave.</p>'
        },
        pro: {
          pl: '<p><strong>Mechanika, która tłumaczy większość bugów.</strong> W hooku wejścia Vue wstawia węzeł, dokłada <code>enter-from</code> i <code>enter-active</code>, potem <strong>wymusza reflow</strong> odczytem <code>el.offsetHeight</code>, a dopiero w kolejnej klatce podmienia <code>enter-from</code> na <code>enter-to</code>. Bez wymuszonego flushu przeglądarka scaliłaby oba stany i nie byłoby czego interpolować. Ta sama logika tłumaczy, dlaczego animacja z <code>height: auto</code> nie działa: nie ma dwóch policzalnych wartości.</p><p><strong>Wykrywanie końca.</strong> Vue czyta <code>transitionDuration</code> i <code>animationDuration</code> z elementu i czeka na zdarzenie najdłuższej właściwości. Jeśli twój CSS ma <code>transition: all .3s</code>, a hook JS kończy się po 500 ms, dostaniesz duchy w DOM. Wtedy podajesz jawnie <code>:duration="{ enter: 300, leave: 500 }"</code> albo używasz <code>@after-leave</code> zamiast zgadywania.</p><pre><code>&lt;Transition\n  :css="false"\n  @enter="(el, done) =&gt; anim(el).finished.then(done)"\n  @leave="(el, done) =&gt; anim(el, true).finished.then(done)"\n/&gt;</code></pre><p><code>:css="false"</code> mówi Vue, żeby w ogóle nie dotykał klas ani nie czekał na <code>transitionend</code>. To standard przy Web Animations API, GSAP czy Motion One i eliminuje całą klasę wyścigów.</p><p><strong>Teleport w praktyce design systemu.</strong> Cel musi istnieć w DOM w momencie montowania, inaczej dostaniesz ostrzeżenie i pusty render - w SSR to znaczy, że kontener trzeba wyrenderować po stronie serwera albo teleportować dopiero po <code>onMounted</code>. Kolejność teleportowanych węzłów w kontenerze odpowiada kolejności montowania, więc dwa modale nakładają się w kolejności otwarcia, nie w kolejności <code>z-index</code>. Przy stosie dialogów trzymaj własny rejestr warstw. <code>defer</code> (Vue 3.5) pozwala teleportować do celu montowanego w tym samym cyklu renderu.</p><p><strong>Dostępność.</strong> Teleport nie robi za ciebie nic: focus trap, <code>aria-modal</code>, <code>inert</code> na tle, zamykanie Escape i przywrócenie fokusu do wyzwalacza to twoja robota. Ponieważ węzeł jest w <code>body</code>, kolejność czytania dla screen readera zmienia się względem tego, co widzi w kodzie autor komponentu - to najczęstsza pułapka w audytach.</p><p><strong>Wydajność.</strong> Animuj wyłącznie <code>transform</code> i <code>opacity</code>. <code>TransitionGroup</code> z FLIP czyta pozycje wszystkich elementów przed i po, więc na liście 500 pozycji policzysz to w klatkach; przy dłuższych listach animuj tylko widoczne okno. Szanuj <code>prefers-reduced-motion</code> - to nie jest opcjonalne w produkcie korporacyjnym.</p>',
          en: '<p><strong>The mechanic that explains most bugs.</strong> On enter, Vue inserts the node, adds <code>enter-from</code> and <code>enter-active</code>, then <strong>forces a reflow</strong> by reading <code>el.offsetHeight</code>, and only on the next frame swaps <code>enter-from</code> for <code>enter-to</code>. Without that forced flush the browser would coalesce both states and there would be nothing to interpolate. The same logic explains why animating to <code>height: auto</code> does nothing: there are not two computable values.</p><p><strong>End detection.</strong> Vue reads <code>transitionDuration</code> and <code>animationDuration</code> off the element and waits for the longest property to finish. If your CSS says <code>transition: all .3s</code> but a JS hook finishes at 500 ms, you get ghost nodes. Fix it with an explicit <code>:duration="{ enter: 300, leave: 500 }"</code>, or use <code>@after-leave</code> instead of guessing.</p><pre><code>&lt;Transition\n  :css="false"\n  @enter="(el, done) =&gt; anim(el).finished.then(done)"\n  @leave="(el, done) =&gt; anim(el, true).finished.then(done)"\n/&gt;</code></pre><p><code>:css="false"</code> tells Vue to skip class handling and <code>transitionend</code> listening entirely. It is the standard setup with the Web Animations API, GSAP or Motion One, and it removes a whole class of race conditions.</p><p><strong>Teleport in a real design system.</strong> The target must exist in the DOM at mount time, otherwise you get a warning and an empty render - under SSR that means rendering the container server-side or teleporting only after <code>onMounted</code>. Teleported nodes are appended in mount order, so two modals stack by open order rather than by <code>z-index</code>. For a dialog stack, keep your own layer registry. The <code>defer</code> prop (Vue 3.5) allows teleporting into a target mounted in the same render cycle.</p><p><strong>Accessibility.</strong> Teleport does none of it for you: focus trap, <code>aria-modal</code>, <code>inert</code> on the background, Escape handling and returning focus to the trigger are your job. Because the node lives in <code>body</code>, screen-reader reading order no longer matches what the component author sees in source - the most common finding in audits.</p><p><strong>Performance.</strong> Animate only <code>transform</code> and <code>opacity</code>. <code>TransitionGroup</code> with FLIP reads positions of every item before and after, so a 500-item list costs you frames; on longer lists animate only the visible window. Respect <code>prefers-reduced-motion</code> - in enterprise products that is not optional.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie zmienia Teleport?',
            en: 'What exactly does Teleport change?'
          },
          options: [
            { pl: 'Miejsce komponentu w drzewie Vue, więc provide/inject przestaje działać', en: 'The component position in the Vue tree, so provide/inject stops working' },
            { pl: 'Tylko miejsce w drzewie DOM, drzewo komponentów zostaje bez zmian', en: 'Only the position in the DOM tree; the component tree is untouched' },
            { pl: 'Kolejność montowania komponentów w aplikacji', en: 'The mount order of components in the app' },
            { pl: 'Kontekst reaktywności dla teleportowanej zawartości', en: 'The reactivity context of the teleported content' }
          ],
          correct: 1,
          explain: {
            pl: 'Węzeł ląduje gdzie indziej w DOM, ale logicznie pozostaje dzieckiem tego samego komponentu: inject, emity i cykl życia działają normalnie.',
            en: 'The node lands elsewhere in the DOM but logically stays a child of the same component: inject, emits and lifecycle behave normally.'
          }
        },
        {
          q: {
            pl: 'Dlaczego Vue odczytuje offsetHeight w trakcie hooka wejścia Transition?',
            en: 'Why does Vue read offsetHeight during the Transition enter hook?'
          },
          options: [
            { pl: 'Żeby zmierzyć element do animacji FLIP', en: 'To measure the element for a FLIP animation' },
            { pl: 'Żeby sprawdzić, czy element jest widoczny', en: 'To check whether the element is visible' },
            { pl: 'Żeby wymusić flush stylu i rozdzielić stan początkowy od końcowego na dwie klatki', en: 'To force a style flush and split the start and end states across two frames' },
            { pl: 'Żeby obliczyć czas trwania przejścia', en: 'To compute the transition duration' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez wymuszonego reflow przeglądarka scaliłaby oba stany w jeden i CSS nie miałby czego interpolować.',
            en: 'Without the forced reflow the browser would coalesce both states and CSS would have nothing to interpolate.'
          }
        },
        {
          q: {
            pl: 'CSS animuje 300 ms, a hook JS kończy się po 500 ms. Element zostaje w DOM jako duch. Co robisz?',
            en: 'CSS animates for 300 ms while a JS hook finishes at 500 ms, leaving a ghost node. What do you do?'
          },
          options: [
            { pl: 'Ustawiasz jawnie :duration albo przechodzisz na :css="false" z callbackiem done', en: 'Set an explicit :duration, or switch to :css="false" with the done callback' },
            { pl: 'Dodajesz mode="out-in"', en: 'Add mode="out-in"' },
            { pl: 'Dodajesz appear', en: 'Add appear' },
            { pl: 'Owijasz element w KeepAlive', en: 'Wrap the element in KeepAlive' }
          ],
          correct: 0,
          explain: {
            pl: 'Vue wykrywa koniec z czasów CSS. Gdy prawda jest w JS, trzeba mu ją podać jawnie albo całkiem wyłączyć obsługę CSS.',
            en: 'Vue infers the end from CSS timings. When the truth lives in JS you must state it explicitly or turn CSS handling off.'
          }
        },
        {
          q: {
            pl: 'Modal teleportowany do body ma poprawne style, ale audyt dostępności zgłasza problem. Co jest najbardziej prawdopodobne?',
            en: 'A modal teleported to body looks right but fails an accessibility audit. What is most likely?'
          },
          options: [
            { pl: 'Teleport psuje kontrast kolorów', en: 'Teleport breaks colour contrast' },
            { pl: 'Brak focus trapa, inert na tle i przywrócenia fokusu - Teleport nie robi tego za nas', en: 'No focus trap, no inert background, no focus restore - Teleport does none of that for you' },
            { pl: 'Vue usuwa atrybuty aria z teleportowanych węzłów', en: 'Vue strips aria attributes from teleported nodes' },
            { pl: 'role="dialog" nie działa poza komponentem nadrzędnym', en: 'role="dialog" does not work outside the parent component' }
          ],
          correct: 1,
          explain: {
            pl: 'Teleport rozwiązuje wyłącznie problem warstw w CSS. Zarządzanie fokusem i tłem zawsze pozostaje po stronie komponentu.',
            en: 'Teleport solves the CSS layering problem only. Focus and background management always stay your component responsibility.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'typed-generic-components',
      title: {
        pl: 'Komponenty typowane i generyczne',
        en: 'Typed and generic components'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Type flow through a generic component</text>' +
          '<rect x="30" y="55" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="83" fill="var(--text)" font-size="14" text-anchor="middle">:items="users"</text>' +
          '<text x="155" y="107" fill="var(--muted)" font-size="13" text-anchor="middle">User[] inferred</text>' +
          '<line x1="282" y1="95" x2="356" y2="95" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l5a)"/>' +
          '<rect x="360" y="55" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="485" y="83" fill="var(--text)" font-size="14" text-anchor="middle">generic="T"</text>' +
          '<text x="485" y="107" fill="var(--muted)" font-size="13" text-anchor="middle">T = User</text>' +
          '<line x1="485" y1="137" x2="485" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l5a)"/>' +
          '<rect x="360" y="190" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="485" y="218" fill="var(--ok)" font-size="14" text-anchor="middle">slot props typed</text>' +
          '<text x="485" y="242" fill="var(--muted)" font-size="13" text-anchor="middle">#row="{ item }" is User</text>' +
          '<rect x="30" y="190" width="250" height="80" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="155" y="218" fill="var(--warn)" font-size="14" text-anchor="middle">key: keyof T</text>' +
          '<text x="155" y="242" fill="var(--muted)" font-size="13" text-anchor="middle">typo = build error</text>' +
          '<rect x="30" y="300" width="580" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="50" y="328" fill="var(--text)" font-size="14">vue-tsc checks templates; the runtime knows nothing</text>' +
          '<text x="50" y="352" fill="var(--muted)" font-size="13">types are a build-time contract, not a validator</text>' +
          '</svg>',
        caption: {
          pl: 'Typ przekazany w propsie wędruje przez parametr generyczny aż do propsów slotu. Sprawdza to vue-tsc w czasie builda, nie runtime.',
          en: 'The type passed in a prop travels through the generic parameter all the way into slot props. vue-tsc checks it at build time; the runtime knows nothing.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie pudełko na kanapki. Jedno pudełko, ale można w nim nosić różne rzeczy: kanapki, klocki albo kredki. Pudełko samo w sobie nie wie, co niesie, i to jest jego zaleta - jest uniwersalne.</p><p>Kłopot zaczyna się przy naklejce. Jeśli na pudełku jest napisane po prostu "rzeczy", to potem nie wiesz, czy w środku jest śniadanie, czy klocki. Musisz zaglądać.</p><p>Dlatego mądre pudełko ma okienko: widać przez nie, co jest w środku. Wkładasz kanapki i naklejka sama zmienia się na "kanapki". Wkładasz kredki, robi się "kredki".</p><p>Komponent generyczny to takie pudełko z okienkiem. Podajesz mu listę czegokolwiek, a on zapamiętuje, czego, i przypomina ci o tym wszędzie tam, gdzie z niego korzystasz. Dzięki temu nie pomylisz kredek z kanapkami.</p>',
          en: '<p>Picture a lunch box. One box, but it can carry different things: sandwiches, bricks, crayons. The box itself does not know what is inside, and that is its strength - it is universal.</p><p>The trouble starts with the label. If the box just says "stuff", you cannot tell whether it holds breakfast or building bricks. You have to open it.</p><p>So a clever box has a window: you can see what is inside. Put sandwiches in and the label reads "sandwiches". Put crayons in and it reads "crayons".</p><p>A generic component is that box with a window. You hand it a list of anything, it remembers what kind, and it reminds you everywhere you use it. Which is how you avoid confusing crayons with lunch.</p>'
        },
        school: {
          pl: '<p>W <code>&lt;script setup lang="ts"&gt;</code> propsy deklarujesz typem, a nie obiektem opcji:</p><pre><code>const props = withDefaults(defineProps&lt;{\n  items: Item[]\n  size?: "sm" | "md"\n}&gt;(), { size: "md" })</code></pre><p>Kompilator zamienia to na runtime\'ową deklarację propsów. Ważne ograniczenie: typy muszą być rozwiązywalne lokalnie w pliku albo w zaimportowanym pliku typów. Wyrafinowane typy mapowane z zewnętrznej biblioteki potrafią się nie skompilować.</p><p>Jeśli komponent jest kontenerem na dane (tabela, select, lista), typ elementu powinien wędrować dalej. Od Vue 3.3 służy do tego atrybut <code>generic</code>:</p><pre><code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;\ndefineProps&lt;{ items: T[]; labelKey: keyof T }&gt;()\ndefineSlots&lt;{ row(p: { item: T }): any }&gt;()\n&lt;/script&gt;</code></pre><p>Efekt jest natychmiast widoczny w edytorze: gdy przekażesz <code>:items="users"</code>, w slocie <code>#row="{ item }"</code> <code>item</code> jest typu <code>User</code>, a literówka w <code>labelKey</code> jest błędem kompilacji, nie cichym <code>undefined</code> w komórce tabeli.</p><p>Do zdarzeń używasz sygnatury wywołania, która przy okazji dokumentuje payload:</p><pre><code>const emit = defineEmits&lt;{\n  select: [item: T]\n  "update:page": [page: number]\n}&gt;()</code></pre><p>Typy nie istnieją w runtime. <code>vue-tsc --noEmit</code> w CI jest jedynym miejscem, gdzie ten kontrakt naprawdę się sprawdza - inaczej masz tylko podpowiedzi w edytorze.</p><p>Warto też pamiętać, że <code>defineProps</code> z typem nie da się połączyć z przekazaniem obiektu opcji w tym samym wywołaniu. Wartości domyślne podajesz przez <code>withDefaults</code>, a dla obiektów i tablic nadal potrzebna jest funkcja fabryki, dokładnie jak w wersji runtime\'owej.</p><p>Praktyczny efekt w design systemie jest prosty: literówki w nazwach kolumn, złe warianty i pominięte wymagane propsy wychodzą w CI, a nie na produkcji.</p>',
          en: '<p>In <code>&lt;script setup lang="ts"&gt;</code> you declare props with a type instead of an options object:</p><pre><code>const props = withDefaults(defineProps&lt;{\n  items: Item[]\n  size?: "sm" | "md"\n}&gt;(), { size: "md" })</code></pre><p>The compiler turns that into a runtime props declaration. One real limit: types must be resolvable locally, in the file or in an imported type file. Fancy mapped types from an external library sometimes fail to compile.</p><p>If the component is a data container - table, select, list - the item type should travel through it. Since Vue 3.3 the <code>generic</code> attribute does exactly that:</p><pre><code>&lt;script setup lang="ts" generic="T extends { id: string }"&gt;\ndefineProps&lt;{ items: T[]; labelKey: keyof T }&gt;()\ndefineSlots&lt;{ row(p: { item: T }): any }&gt;()\n&lt;/script&gt;</code></pre><p>The payoff shows up immediately in the editor: pass <code>:items="users"</code> and inside <code>#row="{ item }"</code> the <code>item</code> is a <code>User</code>, while a typo in <code>labelKey</code> becomes a compile error instead of a silent <code>undefined</code> in a table cell.</p><p>For events, use the call-signature form, which doubles as payload documentation:</p><pre><code>const emit = defineEmits&lt;{\n  select: [item: T]\n  "update:page": [page: number]\n}&gt;()</code></pre><p>Types do not exist at runtime. <code>vue-tsc --noEmit</code> in CI is the only place this contract is genuinely enforced - otherwise you have editor hints and nothing more.</p>'
        },
        pro: {
          pl: '<p><strong>Typy nie zastępują walidacji runtime.</strong> Deklaracja typu jest kompilowana do listy propsów bez sprawdzania. Konsument w czystym JS albo dane z API przekazane bez parsowania przejdą bez słowa. W bibliotece design systemu warto dołożyć dev-only assert dla propsów krytycznych (na przykład wariantu, który mapuje się na klasę CSS) i zostawić TypeScript jako pierwszą linię, a nie jedyną.</p><p><strong>Generic i defineModel razem</strong> działają, ale wymagają precyzji - parametr generyczny jest widoczny w całym bloku setup, w tym w <code>defineSlots</code> i <code>defineEmits</code>. Częsty wzorzec dla selecta:</p><pre><code>&lt;script setup lang="ts" generic="T, K extends keyof T"&gt;\nconst props = defineProps&lt;{ options: T[]; valueKey: K }&gt;()\nconst model = defineModel&lt;T[K] | null&gt;({ default: null })\ndefineSlots&lt;{ option(p: { option: T; selected: boolean }): any }&gt;()\n&lt;/script&gt;</code></pre><p>Wnioskowanie idzie w jedną stronę, z <code>options</code>. Jeśli konsument poda <code>:options="[]"</code>, T zwinie się do <code>never</code> i błędy zrobią się nieczytelne - warto dodać domyślny parametr, na przykład <code>generic="T = Record&lt;string, unknown&gt;"</code>.</p><p><strong>Publikowanie typów.</strong> Komponent generyczny da się skonsumować tylko wtedy, gdy do paczki trafią wygenerowane <code>.d.ts</code>. <code>vue-tsc --declaration</code> albo <code>vite-plugin-dts</code> emitują deklaracje dla SFC, ale konsument musi mieć w <code>tsconfig</code> tę samą wersję <code>vue</code> i włączone <code>"types": ["vue"]</code> lub odpowiedni <code>vueCompilerOptions</code>. Rozjazd wersji Volara i biblioteki objawia się typem <code>any</code> w propsach slotu bez żadnego błędu - to bardzo mylące i warto mieć na to test typów.</p><p><strong>Testy typów.</strong> W repo komponentów opłaca się mieć plik <code>*.test-d.ts</code> z <code>expectTypeOf</code> z Vitest: sprawdzasz, że slot dostaje <code>User</code>, że zły <code>labelKey</code> nie kompiluje się i że emit ma poprawny payload. To jedyne testy, które łapią regresję kontraktu typów przy podbiciu wersji Vue.</p><p><strong>Koszt.</strong> Generyki są darmowe w runtime, ale nie w czasie builda: mocno generyczna tabela z warunkowymi typami mapowanymi potrafi dołożyć sekundy do <code>vue-tsc</code> i zauważalnie spowolnić IDE. Jeśli parametr generyczny nie przechodzi do slotu ani do emitu, prawie zawsze wystarczy zwykły union i jest to tańsze w utrzymaniu.</p>',
          en: '<p><strong>Types are not runtime validation.</strong> A type declaration compiles to a props list with no checking. A plain-JS consumer, or API data passed through unparsed, sails right through. In a design-system library it pays to add dev-only asserts for critical props - a variant that maps to a CSS class, say - and treat TypeScript as the first line rather than the only one.</p><p><strong>Generic plus defineModel</strong> works but demands precision: the generic parameter is visible across the whole setup block, including <code>defineSlots</code> and <code>defineEmits</code>. The common select pattern:</p><pre><code>&lt;script setup lang="ts" generic="T, K extends keyof T"&gt;\nconst props = defineProps&lt;{ options: T[]; valueKey: K }&gt;()\nconst model = defineModel&lt;T[K] | null&gt;({ default: null })\ndefineSlots&lt;{ option(p: { option: T; selected: boolean }): any }&gt;()\n&lt;/script&gt;</code></pre><p>Inference flows one way, from <code>options</code>. If a consumer writes <code>:options="[]"</code>, T collapses to <code>never</code> and the errors become unreadable - give the parameter a default such as <code>generic="T = Record&lt;string, unknown&gt;"</code>.</p><p><strong>Shipping types.</strong> A generic component is only consumable if generated <code>.d.ts</code> files end up in the package. <code>vue-tsc --declaration</code> or <code>vite-plugin-dts</code> emit declarations for SFCs, but consumers need the same <code>vue</code> version in their <code>tsconfig</code> and either <code>"types": ["vue"]</code> or matching <code>vueCompilerOptions</code>. A Volar/library version mismatch shows up as <code>any</code> in slot props with no error at all - deeply misleading, and worth a type test.</p><p><strong>Type tests.</strong> In a component repo, a <code>*.test-d.ts</code> file with Vitest <code>expectTypeOf</code> earns its keep: assert that the slot receives <code>User</code>, that a wrong <code>labelKey</code> fails to compile, that the emit payload is right. These are the only tests that catch a type-contract regression when you bump Vue.</p><p><strong>Cost.</strong> Generics are free at runtime but not at build time: a heavily generic table with conditional mapped types can add seconds to <code>vue-tsc</code> and noticeably slow the IDE. If the generic parameter never reaches a slot or an emit, a plain union is almost always enough and cheaper to maintain.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co daje atrybut generic w script setup?',
            en: 'What does the generic attribute on script setup give you?'
          },
          options: [
            { pl: 'Walidację propsów w runtime na podstawie typu', en: 'Runtime prop validation based on the type' },
            { pl: 'Parametr typu widoczny w propsach, emitach i slotach, dzięki czemu typ elementu wędruje przez komponent', en: 'A type parameter visible in props, emits and slots, so the item type travels through the component' },
            { pl: 'Automatyczne generowanie plików .d.ts przy buildzie', en: 'Automatic .d.ts generation at build time' },
            { pl: 'Możliwość użycia komponentu bez rejestracji', en: 'The ability to use the component without registering it' }
          ],
          correct: 1,
          explain: {
            pl: 'To czysto typowy mechanizm czasu kompilacji. Runtime nie wie o nim nic, a deklaracje trzeba wygenerować osobno.',
            en: 'It is a purely compile-time typing mechanism. The runtime knows nothing about it, and declarations must be generated separately.'
          }
        },
        {
          q: {
            pl: 'Konsument w czystym JS przekazuje do typowanego komponentu string tam, gdzie typ mówi number. Co się dzieje?',
            en: 'A plain-JS consumer passes a string where the type says number. What happens?'
          },
          options: [
            { pl: 'Vue rzuca błąd runtime i przerywa render', en: 'Vue throws a runtime error and aborts the render' },
            { pl: 'Nic - typy nie istnieją w runtime, więc wartość przechodzi', en: 'Nothing - types do not exist at runtime, so the value goes through' },
            { pl: 'Wartość jest rzutowana na number', en: 'The value is coerced to a number' },
            { pl: 'Prop dostaje wartość domyślną', en: 'The prop falls back to its default' }
          ],
          correct: 1,
          explain: {
            pl: 'Deklaracja typu kompiluje się do listy propsów bez sprawdzania. Jeśli chcesz twardej gwarancji, dołóż jawny assert w trybie dev.',
            en: 'The type declaration compiles to a props list with no checks. If you need a hard guarantee, add an explicit dev-mode assert.'
          }
        },
        {
          q: {
            pl: 'Po podbiciu wersji biblioteki propsy slotu widać w edytorze jako any, ale nie ma żadnego błędu. Najbardziej prawdopodobna przyczyna?',
            en: 'After a library bump, slot props show as any in the editor with no error at all. Most likely cause?'
          },
          options: [
            { pl: 'Brak defineSlots w komponencie źródłowym', en: 'The source component has no defineSlots' },
            { pl: 'Rozjazd wersji Vue albo Volara między biblioteką a konsumentem, przez co deklaracje nie są rozwiązywane', en: 'A Vue or Volar version mismatch between library and consumer, so the declarations are not resolved' },
            { pl: 'Komponent nie został zarejestrowany globalnie', en: 'The component was not registered globally' },
            { pl: 'W tsconfig brakuje strict', en: 'strict is missing from tsconfig' }
          ],
          correct: 1,
          explain: {
            pl: 'Rozjazd wersji degraduje typy do any zamiast wywalić build - dlatego testy typów w bibliotece komponentów naprawdę się opłacają.',
            en: 'A version mismatch degrades types to any instead of failing the build - which is exactly why type tests in a component library pay off.'
          }
        },
        {
          q: {
            pl: 'Konsument pisze :options="[]" dla komponentu z generic="T". Co jest tu realnym ryzykiem?',
            en: 'A consumer writes :options="[]" for a component with generic="T". What is the real risk?'
          },
          options: [
            { pl: 'T zwija się do never i komunikaty o błędach robią się nieczytelne', en: 'T collapses to never and the error messages become unreadable' },
            { pl: 'Komponent nie zamontuje się w runtime', en: 'The component fails to mount at runtime' },
            { pl: 'Sloty przestają być wywoływane', en: 'Slots stop being invoked' },
            { pl: 'defineModel przestaje emitować zdarzenia', en: 'defineModel stops emitting events' }
          ],
          correct: 0,
          explain: {
            pl: 'Wnioskowanie z pustej tablicy daje never i kaskadę dziwnych błędów. Domyślny parametr generyczny rozwiązuje problem.',
            en: 'Inferring from an empty array yields never and a cascade of odd errors. A default generic parameter fixes it.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 6
    {
      id: 'renderless-headless',
      title: {
        pl: 'Komponenty renderless i headless',
        en: 'Renderless and headless components'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m3l6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Split behaviour from presentation</text>' +
          '<rect x="30" y="55" width="230" height="100" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="145" y="83" fill="var(--text)" font-size="15" text-anchor="middle">composable</text>' +
          '<text x="145" y="107" fill="var(--muted)" font-size="13" text-anchor="middle">state, keyboard,</text>' +
          '<text x="145" y="129" fill="var(--muted)" font-size="13" text-anchor="middle">aria, focus</text>' +
          '<line x1="262" y1="105" x2="336" y2="105" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l6a)"/>' +
          '<rect x="340" y="55" width="270" height="100" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="475" y="83" fill="var(--text)" font-size="15" text-anchor="middle">renderless wrapper</text>' +
          '<text x="475" y="107" fill="var(--muted)" font-size="13" text-anchor="middle">renders nothing itself,</text>' +
          '<text x="475" y="129" fill="var(--muted)" font-size="13" text-anchor="middle">exposes a scoped slot</text>' +
          '<line x1="475" y1="157" x2="475" y2="205" stroke="var(--muted)" stroke-width="2" marker-end="url(#m3l6a)"/>' +
          '<rect x="340" y="210" width="270" height="90" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="475" y="240" fill="var(--ok)" font-size="14" text-anchor="middle">your markup</text>' +
          '<text x="475" y="264" fill="var(--muted)" font-size="13" text-anchor="middle">brand styles, any DOM</text>' +
          '<text x="475" y="286" fill="var(--muted)" font-size="13" text-anchor="middle">getTriggerProps() spread</text>' +
          '<rect x="30" y="210" width="230" height="90" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="145" y="240" fill="var(--warn)" font-size="14" text-anchor="middle">styled component</text>' +
          '<text x="145" y="264" fill="var(--muted)" font-size="13" text-anchor="middle">same composable,</text>' +
          '<text x="145" y="286" fill="var(--muted)" font-size="13" text-anchor="middle">opinionated markup</text>' +
          '<text x="30" y="345" fill="var(--muted)" font-size="13">One behaviour core, two levels of freedom for consumers.</text>' +
          '<text x="30" y="368" fill="var(--muted)" font-size="13">Prefer a composable; add the wrapper only when the template needs it.</text>' +
          '</svg>',
        caption: {
          pl: 'Zachowanie mieszka w composable, wrapper renderless udostępnia je slotem, a warstwa stylowana to tylko jeden z możliwych konsumentów.',
          en: 'Behaviour lives in a composable, a renderless wrapper exposes it through a slot, and the styled layer is just one possible consumer.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie silnik i karoserię samochodu. Silnik odpowiada za to, żeby jechać: kręci kołami, hamuje, przyspiesza. Karoseria odpowiada za to, jak auto wygląda: kolor, kształt, czy ma dach.</p><p>Jeśli zbudujesz jedną wielką bryłę, w której silnik jest przyspawany do karoserii, to każda zmiana koloru oznacza budowanie nowego silnika. Głupota.</p><p>Dlatego mądrzy ludzie robią osobno silnik i osobno nadwozie. Ten sam silnik może jeździć w kombi, w dostawczaku i w małym miejskim aucie.</p><p>W komponentach jest tak samo. Cała mądrość - co się dzieje po kliknięciu, co po strzałce w dół, kto ma teraz zaznaczenie - to silnik. To, jak lista wygląda, to nadwozie. Jak je rozdzielisz, ten sam silnik obsłuży listę w aplikacji, w panelu i na stronie marketingowej, a każda z nich będzie wyglądała inaczej.</p>',
          en: '<p>Picture a car engine and a car body. The engine handles going: it turns the wheels, brakes, accelerates. The body handles looks: colour, shape, whether it has a roof.</p><p>If you build one solid lump with the engine welded to the body, then changing the colour means building a new engine. Silly.</p><p>So sensible people build the engine separately from the shell. The same engine can power an estate, a van, and a small city car.</p><p>Components work the same way. All the cleverness - what happens on a click, what the down arrow does, which item is selected right now - is the engine. How the list looks is the body. Split them and one engine serves the list in your app, in the admin panel, and on the marketing site, each looking completely different.</p>'
        },
        school: {
          pl: '<p>Komponent <strong>renderless</strong> nie renderuje własnego DOM. Cała jego treść to wywołanie slotu z gotowym stanem i handlerami:</p><pre><code>&lt;!-- Toggle.vue --&gt;\n&lt;script setup&gt;\nconst on = ref(false)\nconst toggle = () =&gt; (on.value = !on.value)\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;slot :on="on" :toggle="toggle" /&gt;\n&lt;/template&gt;</code></pre><p>Konsument dostaje logikę, a decyduje o całym markupie. To był kluczowy wzorzec Vue 2, bo mixiny miały konflikty nazw i nie było innego dobrego sposobu na współdzielenie logiki między komponentami.</p><p>W Vue 3 <strong>composable robi to samo taniej</strong>: <code>const { on, toggle } = useToggle()</code>. Żadnej dodatkowej instancji komponentu, żadnego dodatkowego poziomu w drzewie, pełne wnioskowanie typów bez gimnastyki. Jako domyślny wybór bierz composable.</p><p>Renderless nadal ma sens w trzech sytuacjach:</p><ul><li>logika musi być związana z <strong>cyklem życia elementu w szablonie</strong>, na przykład wewnątrz <code>v-for</code>, gdzie każdy wiersz potrzebuje własnej instancji stanu,</li><li>konsument pracuje wyłącznie w szablonie i nie chce pisać skryptu,</li><li>dostarczasz publiczne API dla zespołów, które podmieniają markup, ale nie zachowanie.</li></ul><p><strong>Headless</strong> to szerszy termin: komponenty, które mają DOM i pełną dostępność, ale zero stylu - Radix Vue (Reka UI), Headless UI, TanStack Table. Kupujesz gotową obsługę klawiatury i ARIA, a stylujesz po swojemu.</p><p>Granica jest więc taka: renderless nie ma DOM-u wcale, headless ma DOM bez stylu, a komponent stylowany ma jedno i drugie. W dojrzałym design systemie te trzy warstwy istnieją równocześnie i zespół produktowy wchodzi na tę, której akurat potrzebuje.</p>',
          en: '<p>A <strong>renderless</strong> component renders no DOM of its own. Its entire template is a slot call carrying state and handlers:</p><pre><code>&lt;!-- Toggle.vue --&gt;\n&lt;script setup&gt;\nconst on = ref(false)\nconst toggle = () =&gt; (on.value = !on.value)\n&lt;/script&gt;\n&lt;template&gt;\n  &lt;slot :on="on" :toggle="toggle" /&gt;\n&lt;/template&gt;</code></pre><p>The consumer gets the logic and owns all the markup. This was the key Vue 2 pattern, because mixins clashed on names and there was no other good way to share logic between components.</p><p>In Vue 3 a <strong>composable does the same thing more cheaply</strong>: <code>const { on, toggle } = useToggle()</code>. No extra component instance, no extra tree level, full type inference without gymnastics. Make the composable your default.</p><p>Renderless still earns its place in three cases:</p><ul><li>the logic must be tied to an <strong>element lifecycle inside the template</strong>, for instance inside a <code>v-for</code> where each row needs its own state instance,</li><li>the consumer works in templates only and does not want to write a script block,</li><li>you are shipping a public API for teams that replace markup but not behaviour.</li></ul><p><strong>Headless</strong> is the wider term: components that do render DOM and full accessibility but no styling - Radix Vue (Reka UI), Headless UI, TanStack Table. You buy keyboard handling and ARIA, and style everything yourself.</p>'
        },
        pro: {
          pl: '<p><strong>Koszt renderless jest realny.</strong> Każda instancja to własny obiekt komponentu, własny scope efektów i własna granica aktualizacji. W liście na 1000 wierszy tysiąc wrapperów renderless to tysiąc dodatkowych instancji - w profilerze widać to jako narzut montowania i pamięci. Composable ma zerowy narzut struktury, bo działa w scope komponentu wywołującego.</p><p><strong>Wzorzec prop getters</strong> przenosi z Reacta jedną naprawdę dobrą rzecz: zamiast wypuszczać dwadzieścia luźnych propsów slotu, oddajesz funkcje, które zwracają gotowe zestawy atrybutów.</p><pre><code>&lt;slot\n  :is-open="isOpen"\n  :trigger-props="getTriggerProps()"\n  :panel-props="getPanelProps()"\n/&gt;\n\n&lt;!-- konsument --&gt;\n&lt;button v-bind="triggerProps"&gt;Open&lt;/button&gt;</code></pre><p>Dzięki temu <code>aria-expanded</code>, <code>aria-controls</code>, <code>id</code>, <code>tabindex</code> i handlery klawiatury są częścią kontraktu, a nie czymś, o czym konsument musi pamiętać. Gdy poprawiasz dostępność w bibliotece, wszyscy dostają poprawkę bez zmian w swoim markupie. To główny argument za headless w dużym design systemie.</p><p><strong>Kompozycja kontekstem.</strong> Komponenty złożone (Menu, Tabs, Accordion) w Reka UI używają <code>provide/inject</code> między korzeniem a częściami zamiast slotów z propsami. Konsument pisze <code>&lt;MenuRoot&gt;&lt;MenuTrigger/&gt;&lt;MenuContent/&gt;&lt;/MenuRoot&gt;</code>, a stan płynie niewidocznie. To czytelniejsze niż zagnieżdżone sloty scoped i pozwala pominąć poziomy w drzewie, ale utrudnia użycie części poza korzeniem - zawsze dawaj czytelny błąd w dev, gdy <code>inject</code> nie znajdzie kontekstu.</p><p><strong>Praktyka w design systemie.</strong> Rozsądna warstwowość to trzy poziomy: composable z zachowaniem, opcjonalny wrapper headless z dostępnością i DOM-em, oraz komponent stylowany zgodny z marką. Komponent stylowany powinien być cienki, bo wtedy zespół produktowy może zejść poziom niżej dla nietypowego przypadku zamiast forkować bibliotekę. Największym błędem jest odwrotna kolejność: najpierw komponent stylowany, potem doklejanie propsów typu <code>renderItem</code> i <code>customClass</code>, aż API przestaje się dać utrzymać.</p><p><strong>Testowanie.</strong> Zachowanie testuj na poziomie composable, szybkimi testami jednostkowymi. Dla warstwy headless pisz testy dostępności (rola, focus, klawiatura) w Testing Library. Warstwie stylowanej zostaw testy wizualne. Rozdzielenie warstw sprawia, że każdy poziom testujesz tym, co w nim faktycznie ryzykowne.</p><p><strong>Kiedy nie warto.</strong> Jeśli komponent ma jeden sensowny wygląd i jednego konsumenta, headless jest przerostem formy: dokładasz warstwę pośrednią, która niczego nie upraszcza. Wzorzec zaczyna się opłacać dopiero przy trzecim wariancie wyglądu tego samego zachowania albo gdy zachowanie zawiera dostępność, której nikt nie chce implementować drugi raz.</p>',
          en: '<p><strong>Renderless has a real cost.</strong> Every instance is its own component object, its own effect scope and its own update boundary. In a 1000-row list, a thousand renderless wrappers are a thousand extra instances - visible in the profiler as mount overhead and memory. A composable adds no structural overhead because it runs inside the calling component scope.</p><p><strong>The prop getters pattern</strong> imports one genuinely good idea from React: instead of exposing twenty loose slot props, hand back functions returning ready-made attribute bundles.</p><pre><code>&lt;slot\n  :is-open="isOpen"\n  :trigger-props="getTriggerProps()"\n  :panel-props="getPanelProps()"\n/&gt;\n\n&lt;!-- consumer --&gt;\n&lt;button v-bind="triggerProps"&gt;Open&lt;/button&gt;</code></pre><p>Now <code>aria-expanded</code>, <code>aria-controls</code>, <code>id</code>, <code>tabindex</code> and the keyboard handlers are part of the contract rather than something consumers must remember. When you fix an accessibility bug in the library, everyone gets the fix without touching their markup. That is the core argument for headless in a large design system.</p><p><strong>Context composition.</strong> Composite components (Menu, Tabs, Accordion) in Reka UI use <code>provide/inject</code> between root and parts rather than slots with props. Consumers write <code>&lt;MenuRoot&gt;&lt;MenuTrigger/&gt;&lt;MenuContent/&gt;&lt;/MenuRoot&gt;</code> and state flows invisibly. It reads better than nested scoped slots and lets parts sit at any depth, but it makes using a part outside its root harder - always throw a clear dev error when <code>inject</code> finds no context.</p><p><strong>Design-system practice.</strong> A sane layering is three levels: a behaviour composable, an optional headless wrapper owning DOM and accessibility, and a branded styled component. Keep the styled layer thin, so a product team can drop one level down for an unusual case instead of forking the library. The classic mistake is the reverse order: ship the styled component first, then bolt on <code>renderItem</code> and <code>customClass</code> props until the API is unmaintainable.</p><p><strong>Testing.</strong> Test behaviour at the composable level with fast unit tests. For the headless layer write accessibility tests (role, focus, keyboard) in Testing Library. Leave visual tests to the styled layer. Splitting the layers means each level is tested for what is actually risky there.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest komponent renderless?',
            en: 'What is a renderless component?'
          },
          options: [
            { pl: 'Komponentem renderowanym wyłącznie po stronie serwera', en: 'A component rendered only on the server' },
            { pl: 'Komponentem, który nie renderuje własnego DOM i wystawia logikę przez slot scoped', en: 'A component that renders no DOM of its own and exposes logic through a scoped slot' },
            { pl: 'Komponentem bez propsów', en: 'A component with no props' },
            { pl: 'Komponentem ładowanym leniwie', en: 'A lazily loaded component' }
          ],
          correct: 1,
          explain: {
            pl: 'Renderless dostarcza wyłącznie zachowanie; cały markup pisze konsument w slocie.',
            en: 'Renderless supplies behaviour only; the consumer writes all the markup in the slot.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Vue 3 composable jest zwykle lepszym domyślnym wyborem niż komponent renderless?',
            en: 'Why is a composable usually the better default than a renderless component in Vue 3?'
          },
          options: [
            { pl: 'Bo composable działa też w Vue 2', en: 'Because composables also work in Vue 2' },
            { pl: 'Bo nie tworzy dodatkowej instancji komponentu ani poziomu w drzewie, a typy działają bez gimnastyki', en: 'Because it adds no component instance or tree level, and typing just works' },
            { pl: 'Bo composable jest automatycznie reaktywny głęboko', en: 'Because composables are automatically deeply reactive' },
            { pl: 'Bo renderless nie obsługuje TypeScriptu', en: 'Because renderless components do not support TypeScript' }
          ],
          correct: 1,
          explain: {
            pl: 'Composable działa w scope komponentu wywołującego, więc znika narzut instancji i cała warstwa slotów.',
            en: 'A composable runs in the calling component scope, removing both the instance overhead and the slot plumbing.'
          }
        },
        {
          q: {
            pl: 'Po co w bibliotece headless zwracać funkcje typu getTriggerProps zamiast pojedynczych propsów slotu?',
            en: 'Why does a headless library return functions like getTriggerProps instead of individual slot props?'
          },
          options: [
            { pl: 'Żeby zmniejszyć rozmiar bundla', en: 'To reduce bundle size' },
            { pl: 'Żeby atrybuty ARIA, id i handlery klawiatury były częścią kontraktu i dało się je poprawiać centralnie', en: 'So ARIA attributes, ids and keyboard handlers are part of the contract and can be fixed centrally' },
            { pl: 'Bo Vue nie pozwala na więcej niż dziesięć propsów slotu', en: 'Because Vue caps slot props at ten' },
            { pl: 'Żeby wymusić użycie TypeScriptu', en: 'To force consumers onto TypeScript' }
          ],
          correct: 1,
          explain: {
            pl: 'Konsument robi v-bind na gotowej paczce, więc poprawka dostępności w bibliotece dociera do wszystkich bez zmian w ich markupie.',
            en: 'Consumers v-bind a ready bundle, so an accessibility fix in the library reaches everyone without markup changes.'
          }
        },
        {
          q: {
            pl: 'Tabela renderuje 1000 wierszy, a każdy jest owinięty komponentem renderless. Co jest tu głównym problemem?',
            en: 'A table renders 1000 rows, each wrapped in a renderless component. What is the main problem?'
          },
          options: [
            { pl: '1000 dodatkowych instancji komponentów: narzut montowania, pamięci i granic aktualizacji', en: '1000 extra component instances: mount overhead, memory and update boundaries' },
            { pl: 'Sloty scoped nie działają w v-for', en: 'Scoped slots do not work inside v-for' },
            { pl: 'Reaktywność przestaje śledzić zmiany w tablicy', en: 'Reactivity stops tracking array changes' },
            { pl: 'Vue ogranicza liczbę komponentów renderless na stronę', en: 'Vue limits how many renderless components a page may have' }
          ],
          correct: 0,
          explain: {
            pl: 'Renderless kosztuje jedną instancję na użycie. Przy dużych listach przenieś logikę do composable wywoływanego raz w komponencie wiersza.',
            en: 'Renderless costs one instance per use. On large lists move the logic into a composable called once inside the row component.'
          }
        }
      ]
    }
  ]
}
