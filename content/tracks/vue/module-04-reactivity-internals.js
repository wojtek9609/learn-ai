// Track vue - module 4: Reactivity internals.
// Deep dive for a developer who already ships Vue daily and maintains
// design-system components: proxies, track/trigger, the scheduler, escape
// hatches, pitfalls and render functions.

// ---------------------------------------------------------------- shared SVG
const I1_BASE =
  '<text x="20" y="26" fill="var(--muted)" font-size="14">One dependency cycle, step by step</text>' +
  '<rect x="20" y="55" width="175" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="107" y="88" fill="var(--text)" font-size="15" text-anchor="middle">effect(fn)</text>' +
  '<text x="107" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">render or watcher</text>' +
  '<rect x="235" y="55" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Proxy</text>' +
  '<text x="320" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">get / set traps</text>' +
  '<rect x="445" y="55" width="175" height="110" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="532" y="84" fill="var(--text)" font-size="15" text-anchor="middle">targetMap</text>' +
  '<text x="532" y="106" fill="var(--muted)" font-size="13" text-anchor="middle">obj -> key -> dep</text>' +
  '<text x="532" y="128" fill="var(--muted)" font-size="13" text-anchor="middle">dep = set of effects</text>' +
  '<rect x="20" y="200" width="175" height="55" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="107" y="233" fill="var(--muted)" font-size="14" text-anchor="middle">activeEffect: null</text>' +
  '<rect x="235" y="300" width="170" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="332" fill="var(--text)" font-size="15" text-anchor="middle">state.n = 1</text>' +
  '<text x="320" y="353" fill="var(--muted)" font-size="13" text-anchor="middle">set trap</text>' +
  '<rect x="445" y="300" width="175" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="532" y="332" fill="var(--text)" font-size="15" text-anchor="middle">trigger()</text>' +
  '<text x="532" y="353" fill="var(--muted)" font-size="13" text-anchor="middle">read the dep back</text>';

const I2_BASE =
  '<text x="20" y="26" fill="var(--muted)" font-size="14">Three mutations, one flush</text>' +
  '<rect x="20" y="50" width="180" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="110" y="82" fill="var(--text)" font-size="15" text-anchor="middle">sync code</text>' +
  '<text x="110" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">a++ ; b++ ; a++</text>' +
  '<rect x="230" y="50" width="180" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="85" fill="var(--text)" font-size="14" text-anchor="middle">pre queue</text>' +
  '<rect x="230" y="126" width="180" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="161" fill="var(--text)" font-size="14" text-anchor="middle">job queue</text>' +
  '<rect x="230" y="202" width="180" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="237" fill="var(--text)" font-size="14" text-anchor="middle">post queue</text>' +
  '<rect x="440" y="126" width="180" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="530" y="161" fill="var(--text)" font-size="14" text-anchor="middle">DOM patch</text>' +
  '<rect x="230" y="300" width="180" height="62" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="320" y="337" fill="var(--text)" font-size="14" text-anchor="middle">microtask flush</text>' +
  '<rect x="440" y="300" width="180" height="62" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="530" y="337" fill="var(--text)" font-size="14" text-anchor="middle">nextTick resolves</text>';

const HI = '" fill="none" stroke="var(--accent)" stroke-width="3"/>';
const OK = '" fill="none" stroke="var(--ok)" stroke-width="3"/>';
const WARN = '" fill="none" stroke="var(--warn)" stroke-width="3"/>';

export default {
  id: 'reactivity-internals',
  order: 4,
  icon: '🔬',
  title: {
    pl: 'Reaktywność od środka',
    en: 'Reactivity internals'
  },
  description: {
    pl: 'Jak naprawdę działa track i trigger, po co jest scheduler, kiedy sięgać po shallow API i markRaw, jakie pułapki gubią reaktywność oraz co daje pisanie render functions zamiast szablonów.',
    en: 'How track and trigger really work, what the scheduler is for, when to reach for shallow APIs and markRaw, which pitfalls silently break reactivity, and what you gain or lose with render functions.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'proxies-track-trigger',
      title: {
        pl: 'Proxy, track i trigger',
        en: 'Proxies, track and trigger'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'track i trigger', en: 'track and trigger' },
          def: {
            pl: 'Dwie operacje rdzenia reaktywności: <code>track</code> w getterze zapisuje aktywny efekt jako zależny od pary obiekt-klucz, a <code>trigger</code> w setterze odpala z powrotem wszystkie efekty zebrane dla tej pary.',
            en: 'The two core reactivity operations: <code>track</code> in the getter records the active effect as depending on an object-key pair, and <code>trigger</code> in the setter replays every effect collected for that pair.'
          }
        },
        {
          term: { pl: 'targetMap', en: 'targetMap' },
          def: {
            pl: 'Globalna <code>WeakMap</code> o kształcie obiekt -&gt; klucz -&gt; dep, w której Vue trzyma zależności. Jest słaba, więc wpisy znikają razem z obiektem oddanym garbage collectorowi.',
            en: 'The global <code>WeakMap</code> shaped object -&gt; key -&gt; dep where Vue keeps dependencies. It is weak, so entries die together with the object once it is garbage collected.'
          }
        },
        {
          term: { pl: 'activeEffect', en: 'activeEffect' },
          def: {
            pl: 'Globalna zmienna wskazująca efekt, który właśnie się wykonuje. Bez niej getter nie wiedziałby, kogo zapisać jako zależnego; po zakończeniu efektu wraca do <code>null</code>.',
            en: 'The global variable pointing at the effect currently running. Without it a getter would not know whom to record as a dependent; it goes back to <code>null</code> once the effect finishes.'
          }
        },
        {
          term: { pl: 'toRaw', en: 'toRaw' },
          def: {
            pl: 'Zdejmuje warstwę proxy i zwraca oryginalny obiekt. Potrzebne, bo zagnieżdżone obiekty są opakowywane leniwie przy odczycie, więc <code>state.item === raw</code> jest fałszem.',
            en: 'Strips the proxy layer and returns the original object. You need it because nested objects are wrapped lazily on read, so <code>state.item === raw</code> is false.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="v4l1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Read path collects, write path replays</text>' +
          '<rect x="20" y="55" width="165" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="102" y="85" fill="var(--text)" font-size="15" text-anchor="middle">effect runs</text>' +
          '<text x="102" y="106" fill="var(--muted)" font-size="13" text-anchor="middle">reads state.n</text>' +
          '<line x1="185" y1="90" x2="235" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<rect x="240" y="55" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="315" y="85" fill="var(--text)" font-size="15" text-anchor="middle">get trap</text>' +
          '<text x="315" y="106" fill="var(--muted)" font-size="13" text-anchor="middle">track()</text>' +
          '<line x1="390" y1="90" x2="440" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<rect x="445" y="40" width="175" height="130" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="532" y="70" fill="var(--text)" font-size="15" text-anchor="middle">targetMap</text>' +
          '<text x="532" y="94" fill="var(--muted)" font-size="13" text-anchor="middle">WeakMap</text>' +
          '<text x="532" y="118" fill="var(--muted)" font-size="13" text-anchor="middle">obj -&gt; key -&gt; dep</text>' +
          '<text x="532" y="146" fill="var(--muted)" font-size="13" text-anchor="middle">dep holds effects</text>' +
          '<rect x="20" y="270" width="165" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="102" y="300" fill="var(--text)" font-size="15" text-anchor="middle">state.n = 1</text>' +
          '<text x="102" y="321" fill="var(--muted)" font-size="13" text-anchor="middle">write</text>' +
          '<line x1="185" y1="305" x2="235" y2="305" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<rect x="240" y="270" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="315" y="300" fill="var(--text)" font-size="15" text-anchor="middle">set trap</text>' +
          '<text x="315" y="321" fill="var(--muted)" font-size="13" text-anchor="middle">trigger()</text>' +
          '<line x1="390" y1="305" x2="500" y2="305" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<line x1="532" y1="305" x2="532" y2="180" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<line x1="445" y1="230" x2="102" y2="230" stroke="var(--accent)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '<text x="120" y="220" fill="var(--accent)" font-size="13">re-run the collected effects</text>' +
          '<line x1="102" y1="230" x2="102" y2="125" stroke="var(--accent)" stroke-width="2" marker-end="url(#v4l1a)"/>' +
          '</svg>',
        caption: {
          pl: 'Odczyt przez get trap zapisuje aktywny efekt w targetMap, zapis przez set trap odczytuje tę samą kolekcję i uruchamia efekty ponownie.',
          en: 'A read goes through the get trap and records the active effect in targetMap; a write goes through the set trap, reads the same collection back and replays those effects.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Pełny cykl życia jednej zależności: od uruchomienia efektu, przez zebranie zależności, po ponowne uruchomienie po mutacji.',
          en: 'The full life of one dependency: effect starts, dependency gets collected, mutation replays it.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I1_BASE +
              '<rect x="20" y="55" width="175" height="80" rx="12' + HI +
              '<rect x="20" y="200" width="175" height="55" rx="12' + HI +
              '<text x="107" y="233" fill="var(--accent)" font-size="14" text-anchor="middle">activeEffect: fn</text>' +
              '</svg>',
            label: { pl: '1. Efekt startuje', en: '1. The effect starts' },
            note: {
              pl: 'Vue odkłada bieżący efekt na stos i ustawia go jako activeEffect. Bez tej globalnej zmiennej getter nie wiedziałby, kto właśnie czyta.',
              en: 'Vue pushes the current effect on a stack and sets it as activeEffect. Without that global, the getter would have no idea who is reading.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I1_BASE +
              '<rect x="235" y="55" width="170" height="80" rx="12' + HI +
              '<line x1="195" y1="95" x2="230" y2="95" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="107" y="233" fill="var(--accent)" font-size="14" text-anchor="middle">activeEffect: fn</text>' +
              '<text x="320" y="165" fill="var(--accent)" font-size="13" text-anchor="middle">get state.n</text>' +
              '</svg>',
            label: { pl: '2. Odczyt trafia w get trap', en: '2. The read hits the get trap' },
            note: {
              pl: 'Funkcja czyta state.n. Proxy przechwytuje odczyt, zwraca wartość i po drodze woła track dla pary (obiekt, klucz).',
              en: 'The function reads state.n. The proxy intercepts it, returns the value and on the way calls track for the (object, key) pair.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I1_BASE +
              '<rect x="445" y="55" width="175" height="110" rx="12' + OK +
              '<line x1="405" y1="95" x2="440" y2="95" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="532" y="192" fill="var(--ok)" font-size="13" text-anchor="middle">dep(n) = { fn }</text>' +
              '</svg>',
            label: { pl: '3. Zależność zapisana', en: '3. Dependency recorded' },
            note: {
              pl: 'W targetMap powstaje wpis: obiekt -> klucz n -> dep zawierający ten efekt. Powiązanie jest dwukierunkowe, więc efekt wie też, w których depach siedzi.',
              en: 'targetMap gains an entry: object -> key n -> dep containing this effect. The link is two-way, so the effect also knows which deps it belongs to.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I1_BASE +
              '<rect x="235" y="300" width="170" height="70" rx="12' + WARN +
              '<rect x="445" y="300" width="175" height="70" rx="12' + WARN +
              '<line x1="405" y1="335" x2="440" y2="335" stroke="var(--warn)" stroke-width="3"/>' +
              '<line x1="532" y1="300" x2="532" y2="175" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="107" y="233" fill="var(--muted)" font-size="14" text-anchor="middle">activeEffect: null</text>' +
              '</svg>',
            label: { pl: '4. Mutacja woła trigger', en: '4. Mutation calls trigger' },
            note: {
              pl: 'Efekt dawno się skończył, activeEffect jest znowu pusty. Zapis state.n = 1 przechodzi przez set trap, który sięga do targetMap po dep dla klucza n.',
              en: 'The effect finished long ago and activeEffect is null again. Writing state.n = 1 goes through the set trap, which looks up the dep for key n in targetMap.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I1_BASE +
              '<rect x="20" y="55" width="175" height="80" rx="12' + HI +
              '<line x1="445" y1="230" x2="110" y2="230" stroke="var(--accent)" stroke-width="3"/>' +
              '<line x1="107" y1="230" x2="107" y2="140" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="230" y="220" fill="var(--accent)" font-size="13">scheduler or direct run</text>' +
              '</svg>',
            label: { pl: '5. Efekt biegnie ponownie', en: '5. The effect runs again' },
            note: {
              pl: 'Efekty z depa wracają do kolejki albo lecą od razu, a przy ponownym biegu zależności są zbierane od nowa - stare, nieodczytane klucze zostają odpięte.',
              en: 'Effects from the dep are queued or run straight away, and on the new run dependencies are collected from scratch, so keys no longer read get unsubscribed.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie gazetę i listę prenumeratorów. Kiedy ktoś pierwszy raz przeczyta stronę o pogodzie, redakcja zapisuje: "ta osoba czyta pogodę". Nie zapisuje jej przy sporcie, bo tam nie zaglądała.</p><p>Potem pogoda się zmienia. Redakcja zagląda do swojej listy tylko przy haśle "pogoda" i wysyła wiadomość dokładnie tym osobom, które tam były zapisane. Kibice sportowi śpią spokojnie, bo ich nikt nie budzi.</p><p>Vue robi dokładnie to samo z twoimi danymi. Każde odczytanie wartości to zapis na listę: "ten kawałek ekranu ogląda tę wartość". Każda zmiana wartości to sprawdzenie listy i obudzenie tylko właściwych kawałków ekranu.</p><p>Cały sekret jest w tym, że Vue nie zgaduje. Ono naprawdę widzi, kto co przeczytał, bo każdy odczyt przechodzi przez małego strażnika przy drzwiach danych.</p>',
          en: '<p>Picture a newspaper with a subscriber list. The first time someone reads the weather page, the office writes down: "this person reads weather". They do not write it under sports, because that person never looked there.</p><p>Later the weather changes. The office checks only the list under "weather" and messages exactly those people. Sports fans keep sleeping, because nobody wakes them.</p><p>Vue does exactly this with your data. Every read is an entry on a list: "this bit of the screen is watching this value". Every write is a lookup in that list and a wake-up call for just the right bits of screen.</p><p>The whole trick is that Vue never guesses. It genuinely sees who read what, because every single read walks past a little guard standing at the door of your data.</p>'
        },
        school: {
          pl: '<p><code>reactive(obj)</code> zwraca Proxy z pułapkami (traps) na <code>get</code>, <code>set</code>, <code>has</code>, <code>deleteProperty</code> i <code>ownKeys</code>. Getter poza zwróceniem wartości wywołuje <code>track</code>, setter wywołuje <code>trigger</code>. To wszystko.</p><p>Klucz do zrozumienia to jedna globalna zmienna: <code>activeEffect</code>. Zanim efekt uruchomi swoją funkcję, ustawia siebie jako aktywny. Dzięki temu getter, który odpala się gdzieś głęboko w szablonie, wie, kogo zapisać.</p><p>Struktura danych po stronie Vue wygląda tak:</p><pre><code>targetMap: WeakMap&lt;object, Map&lt;key, Dep&gt;&gt;\nDep:       kolekcja efektow zaleznych od tej pary</code></pre><p><code>WeakMap</code> jest tu istotny: kiedy twój obiekt idzie do garbage collectora, jego zależności znikają razem z nim.</p><p>Granularność jest na poziomie klucza, nie obiektu. Komponent, który renderuje tylko <code>user.name</code>, nie przerenderuje się po zmianie <code>user.email</code>. To właśnie różni Vue od Reacta, gdzie zmiana stanu domyślnie unieważnia cały komponent.</p><p>Kilka szczegółów, które od razu wyjaśniają dziwne zachowania:</p><ul><li>Proxy jest tworzone leniwie i rekurencyjnie - <code>reactive</code> nie przechodzi całego drzewa od razu, tylko opakowuje zagnieżdżony obiekt w momencie pierwszego odczytu.</li><li><code>ref</code> nie używa Proxy. To zwykła klasa z getterem i setterem na <code>.value</code>, która woła ten sam <code>track</code> i <code>trigger</code>.</li><li><code>for...in</code> i <code>Object.keys</code> śledzą sztuczny klucz iteracji, więc dodanie nowej właściwości też odświeża pętlę.</li></ul><p>Vue 2 robiło to samo przez <code>Object.defineProperty</code> i dlatego nie widziało dodawania kluczy ani zmian indeksów w tablicy. Proxy widzi wszystko, bo przechwytuje operację, a nie pojedynczą właściwość.</p>',
          en: '<p><code>reactive(obj)</code> returns a Proxy with traps on <code>get</code>, <code>set</code>, <code>has</code>, <code>deleteProperty</code> and <code>ownKeys</code>. The getter returns the value and also calls <code>track</code>; the setter calls <code>trigger</code>. That is the whole system.</p><p>The key is one global variable: <code>activeEffect</code>. Before an effect runs its function it marks itself active, so a getter firing deep inside a template knows who to record.</p><p>The bookkeeping looks like this:</p><pre><code>targetMap: WeakMap&lt;object, Map&lt;key, Dep&gt;&gt;\nDep:       the effects that depend on that pair</code></pre><p>The <code>WeakMap</code> matters: when your object becomes garbage, its dependency records go with it.</p><p>Granularity is per key, not per object. A component that renders only <code>user.name</code> will not re-render when <code>user.email</code> changes. That is the real difference from React, where a state change invalidates the whole component by default.</p><p>A few details that immediately explain odd behaviour:</p><ul><li>Proxies are created lazily and recursively - <code>reactive</code> does not walk the tree upfront, it wraps a nested object the first time you read it.</li><li><code>ref</code> uses no Proxy at all. It is a plain class with a getter and setter on <code>.value</code> that call the same <code>track</code> and <code>trigger</code>.</li><li><code>for...in</code> and <code>Object.keys</code> track a synthetic iteration key, so adding a property also refreshes the loop.</li></ul><p>Vue 2 did the same job with <code>Object.defineProperty</code>, which is why it could not see added keys or array index writes. A Proxy intercepts the operation rather than a single property, so it sees everything.</p>'
        },
        pro: {
          pl: '<p>Warstwa <code>@vue/reactivity</code> jest niezależna od renderera i można jej używać samodzielnie. Warto znać jej realny kształt.</p><p><strong>Handlery.</strong> <code>baseHandlers</code> obsługują zwykłe obiekty i tablice, <code>collectionHandlers</code> osobno Map, Set, WeakMap i WeakSet - bo metody kolekcji sięgają do wewnętrznych slotów i wymagają przepięcia <code>this</code> na surowy obiekt. Tablice mają instrumentację: <code>includes</code>, <code>indexOf</code> i <code>lastIndexOf</code> szukają najpierw w proxy, potem w surowej wersji, a <code>push</code>, <code>pop</code>, <code>shift</code> i <code>splice</code> pauzują tracking, żeby odczyt <code>length</code> nie tworzył zależności zapętlającej efekt.</p><p><strong>Tożsamość.</strong> <code>reactiveMap</code> to WeakMap cache, dzięki czemu <code>reactive(o) === reactive(o)</code>, a <code>reactive(reactive(o))</code> zwraca to samo proxy. Nie zwraca go natomiast <code>toRaw</code>, więc porównanie <code>state.items.includes(rawItem)</code> działa dzięki instrumentacji, ale zwykłe <code>state.item === rawItem</code> już nie. Flagi <code>__v_isReactive</code>, <code>__v_isReadonly</code>, <code>__v_raw</code> i <code>__v_skip</code> są czytane w getterze i sterują całym zachowaniem.</p><pre><code>const raw = { id: 1 };\nconst s = reactive({ item: raw });\ns.item === raw          // false\ntoRaw(s.item) === raw   // true</code></pre><p><strong>Zmiana w 3.5.</strong> Wcześniej dep był <code>Map&lt;ReactiveEffect, number&gt;</code> z licznikami wersji trackowania. W 3.5 przepisano to na podwójnie wiązane listy (obiekty <code>Link</code> między <code>Dep</code> a <code>Subscriber</code>), z wersjonowaniem globalnym. Efekt praktyczny: około 56 procent mniej pamięci na dużych grafach reaktywnych, brak alokacji przy re-runie, oraz to, że computed nie propaguje dalej, jeśli po przeliczeniu wartość jest ta sama.</p><p><strong>Koszty.</strong> Dostęp przez Proxy jest wolniejszy od zwykłego mniej więcej o rząd wielkości w mikrobenchmarku, ale w skali aplikacji dominuje liczba zależności, nie koszt pojedynczego odczytu. Realny problem pojawia się przy <code>reactive</code> na tablicy 10-50 tysięcy obiektów: każdy odczyt wiersza tworzy nowe proxy i wpisy w targetMap. Dla takich danych używa się <code>shallowRef</code> plus wymiana referencji.</p><p><strong>Praktyka w design systemie.</strong> Jeśli piszesz komponenty biblioteczne, pamiętaj, że logikę można wyciąć do czystej funkcji na <code>effect</code> i <code>effectScope</code> bez żadnego komponentu - i przetestować ją bez montowania. To najtańszy sposób na testy logiki stanu w CHI-podobnej bibliotece.</p>',
          en: '<p>The <code>@vue/reactivity</code> package is renderer-independent and usable on its own. Its real shape is worth knowing.</p><p><strong>Handlers.</strong> <code>baseHandlers</code> cover plain objects and arrays; <code>collectionHandlers</code> cover Map, Set, WeakMap and WeakSet separately, because collection methods touch internal slots and need <code>this</code> rebound to the raw target. Arrays are instrumented: <code>includes</code>, <code>indexOf</code> and <code>lastIndexOf</code> search the proxy first and then the raw array, while <code>push</code>, <code>pop</code>, <code>shift</code> and <code>splice</code> pause tracking so that reading <code>length</code> does not create a self-triggering dependency.</p><p><strong>Identity.</strong> <code>reactiveMap</code> is a WeakMap cache, so <code>reactive(o) === reactive(o)</code> and <code>reactive(reactive(o))</code> returns the same proxy. Raw identity is a different story: <code>state.items.includes(rawItem)</code> works thanks to instrumentation, but a plain <code>state.item === rawItem</code> does not. The flags <code>__v_isReactive</code>, <code>__v_isReadonly</code>, <code>__v_raw</code> and <code>__v_skip</code> are read inside the getter and drive the whole behaviour.</p><pre><code>const raw = { id: 1 };\nconst s = reactive({ item: raw });\ns.item === raw          // false\ntoRaw(s.item) === raw   // true</code></pre><p><strong>What changed in 3.5.</strong> A dep used to be a <code>Map&lt;ReactiveEffect, number&gt;</code> with track-id version counters. In 3.5 it was rewritten as doubly linked lists (<code>Link</code> nodes between a <code>Dep</code> and a <code>Subscriber</code>) with global versioning. Practical outcome: roughly 56 percent less memory on large reactive graphs, no allocation on re-run, and computeds that stop propagating when a recompute yields the same value.</p><p><strong>Costs.</strong> A proxied read is about an order of magnitude slower than a plain one in a microbenchmark, but at application scale the number of dependencies dominates, not the cost of one read. The real problem shows up with <code>reactive</code> over an array of 10-50 thousand objects: every row read mints a new proxy and targetMap entries. For that data you use <code>shallowRef</code> plus reference replacement.</p><p><strong>Design-system angle.</strong> When you write library components, remember the logic can be lifted into a plain function built on <code>effect</code> and <code>effectScope</code> with no component at all - and tested without mounting. It is the cheapest way to unit-test state logic in a CHI-style library.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie robi getter proxy w reactive poza zwróceniem wartości?',
            en: 'Besides returning the value, what does the reactive proxy getter actually do?'
          },
          options: [
            { pl: 'Kopiuje obiekt, żeby zachować niemutowalność', en: 'Copies the object to keep it immutable' },
            { pl: 'Rejestruje aktywny efekt w depie dla pary obiekt-klucz', en: 'Records the active effect in the dep for the object-key pair' },
            { pl: 'Planuje przerenderowanie komponentu', en: 'Schedules a component re-render' },
            { pl: 'Waliduje typ odczytywanej wartości', en: 'Validates the type of the value being read' }
          ],
          correct: 1,
          explain: {
            pl: 'Odczyt tylko zbiera zależność przez track. Renderowanie planuje dopiero trigger po stronie zapisu.',
            en: 'A read only collects a dependency through track. Rendering is scheduled later, by trigger on the write path.'
          }
        },
        {
          q: {
            pl: 'Dlaczego targetMap jest WeakMap, a nie zwykłą Map?',
            en: 'Why is targetMap a WeakMap rather than a plain Map?'
          },
          options: [
            { pl: 'Bo WeakMap jest szybsza przy odczycie', en: 'Because WeakMap is faster to read from' },
            { pl: 'Bo pozwala trzymać jako klucze także prymitywy', en: 'Because it allows primitives as keys' },
            { pl: 'Bo nie blokuje garbage collectora - zależności giną razem z obiektem', en: 'Because it does not block garbage collection - the deps die with the object' },
            { pl: 'Bo gwarantuje kolejność wstawiania kluczy', en: 'Because it guarantees key insertion order' }
          ],
          correct: 2,
          explain: {
            pl: 'Silna Map trzymałaby referencję do każdego kiedykolwiek zreaktywnionego obiektu i byłaby wyciekiem pamięci.',
            en: 'A strong Map would hold a reference to every object ever made reactive, which is a straight memory leak.'
          }
        },
        {
          q: {
            pl: 'Dlaczego metody Map i Set wymagają osobnych handlerów?',
            en: 'Why do Map and Set need their own handlers?'
          },
          options: [
            { pl: 'Bo Proxy nie potrafi przechwycić get na tych typach', en: 'Because Proxy cannot intercept get on those types' },
            { pl: 'Bo ich metody operują na wewnętrznych slotach i muszą działać na surowym obiekcie', en: 'Because their methods operate on internal slots and must run against the raw target' },
            { pl: 'Bo kolekcje nie mogą być reaktywne w Vue 3', en: 'Because collections cannot be reactive in Vue 3' },
            { pl: 'Bo Vue konwertuje je na zwykłe obiekty', en: 'Because Vue converts them into plain objects' }
          ],
          correct: 1,
          explain: {
            pl: 'Wywołanie map.get na proxy rzuciłoby błąd o niekompatybilnym odbiorniku, więc Vue podmienia this na raw i sam robi track na kluczu.',
            en: 'Calling map.get on the proxy would throw an incompatible receiver error, so Vue rebinds this to the raw target and tracks the key itself.'
          }
        },
        {
          q: {
            pl: 'Masz <code>const raw = { id: 1 }</code> i <code>const s = reactive({ item: raw })</code>. Co zwróci <code>s.item === raw</code>?',
            en: 'You have <code>const raw = { id: 1 }</code> and <code>const s = reactive({ item: raw })</code>. What does <code>s.item === raw</code> return?'
          },
          options: [
            { pl: 'true, bo reactive nie dotyka zagnieżdżonych obiektów', en: 'true, because reactive does not touch nested objects' },
            { pl: 'false, bo odczyt zwraca proxy owijające raw - równość odzyskasz przez toRaw', en: 'false, because the read returns a proxy wrapping raw - use toRaw to compare' },
            { pl: 'true, bo Vue cache-uje tożsamość obiektów', en: 'true, because Vue caches object identity' },
            { pl: 'Rzuci błąd, bo porównanie proxy jest zabronione', en: 'It throws, because comparing a proxy is not allowed' }
          ],
          correct: 1,
          explain: {
            pl: 'Zagnieżdżone obiekty są opakowywane leniwie przy odczycie, więc tożsamość referencji się rozjeżdża. To najczęstsza przyczyna nieudanych porównań i indexOf na surowych danych.',
            en: 'Nested objects are wrapped lazily on read, so reference identity diverges. This is the most common cause of failed comparisons and indexOf calls against raw data.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------ 2
    {
      id: 'effects-and-scheduler',
      title: {
        pl: 'Efekty i scheduler',
        en: 'Effects and the scheduler'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'scheduler efektu', en: 'effect scheduler' },
          def: {
            pl: 'Opcjonalna funkcja efektu wołana zamiast <code>run()</code>, gdy zależność się zmieni. Ten jeden punkt rozszerzenia sprawia, że aktualizacje Vue są kolejkowane, a nie natychmiastowe.',
            en: 'An optional function on an effect that Vue calls instead of <code>run()</code> when a dependency fires. This single extension point is what makes Vue updates queued rather than immediate.'
          }
        },
        {
          term: { pl: 'flush: pre / post / sync', en: 'flush: pre / post / sync' },
          def: {
            pl: 'Moment uruchomienia callbacku <code>watch</code>: <code>pre</code> przed renderem (domyślnie), <code>post</code> po spatchowaniu DOM (pomiary elementów), <code>sync</code> natychmiast, bez batchowania.',
            en: 'When a <code>watch</code> callback runs: <code>pre</code> before render (the default), <code>post</code> after the DOM patch (element measurements), <code>sync</code> immediately with no batching.'
          }
        },
        {
          term: { pl: 'nextTick', en: 'nextTick' },
          def: {
            pl: 'Promise rozwiązywany po flushu kolejki zadań. <code>await nextTick()</code> to jedyny poprawny sposób, by po mutacji stanu zobaczyć już zaktualizowany DOM.',
            en: 'A promise resolved after the job queue flushes. <code>await nextTick()</code> is the only correct way to observe the updated DOM after mutating state.'
          }
        },
        {
          term: { pl: 'effectScope', en: 'effectScope' },
          def: {
            pl: 'Kontener zbierający efekty i watchery, żeby zatrzymać je jednym <code>scope.stop()</code>. Watcher utworzony po <code>await</code> wypada poza scope komponentu i wycieka.',
            en: 'A container that collects effects and watchers so one <code>scope.stop()</code> tears them all down. A watcher created after an <code>await</code> falls outside the component scope and leaks.'
          }
        },
        {
          term: { pl: 'deduplikacja kolejki jobów', en: 'job queue dedupe' },
          def: {
            pl: 'Kolejka aktualizacji odrzuca duplikaty po identyfikatorze joba i sortuje rosnąco po <code>uid</code> komponentu, więc rodzic renderuje się przed dzieckiem, a trzy mutacje dają jeden patch.',
            en: 'The update queue drops duplicates by job id and sorts by ascending component <code>uid</code>, so a parent renders before its child and three mutations produce a single patch.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="v4l2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Mutations are synchronous, work is not</text>' +
          '<rect x="20" y="50" width="180" height="80" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="110" y="82" fill="var(--text)" font-size="15" text-anchor="middle">3 mutations</text>' +
          '<text x="110" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">same tick</text>' +
          '<line x1="200" y1="90" x2="250" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l2a)"/>' +
          '<rect x="255" y="50" width="185" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="347" y="82" fill="var(--text)" font-size="15" text-anchor="middle">queueJob</text>' +
          '<text x="347" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">dedupe by job id</text>' +
          '<line x1="347" y1="130" x2="347" y2="175" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l2a)"/>' +
          '<rect x="150" y="180" width="380" height="150" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="340" y="208" fill="var(--text)" font-size="15" text-anchor="middle">flush in one microtask</text>' +
          '<text x="340" y="240" fill="var(--muted)" font-size="13" text-anchor="middle">1. pre - watch flush pre</text>' +
          '<text x="340" y="266" fill="var(--muted)" font-size="13" text-anchor="middle">2. jobs - render, sorted by uid</text>' +
          '<text x="340" y="292" fill="var(--muted)" font-size="13" text-anchor="middle">3. post - updated, template refs</text>' +
          '<text x="340" y="318" fill="var(--muted)" font-size="13" text-anchor="middle">parent before child</text>' +
          '<line x1="530" y1="255" x2="575" y2="255" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l2a)"/>' +
          '<rect x="20" y="350" width="240" height="55" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="140" y="384" fill="var(--ok)" font-size="14" text-anchor="middle">one DOM patch</text>' +
          '<rect x="290" y="350" width="240" height="55" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="410" y="384" fill="var(--muted)" font-size="14" text-anchor="middle">await nextTick() resumes</text>' +
          '<line x1="340" y1="330" x2="240" y2="348" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l2a)"/>' +
          '</svg>',
        caption: {
          pl: 'Mutacje w jednym ticku wpadają do kolejki z deduplikacją; flush w mikrozadaniu wykonuje pre, potem joby posortowane od rodzica do dziecka, na końcu post.',
          en: 'Mutations in one tick land in a deduplicated queue; a single microtask flush runs pre callbacks, then jobs sorted parent-to-child, then post callbacks.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Trzy synchroniczne mutacje i jedna aktualizacja DOM - co dokładnie dzieje się między nimi.',
          en: 'Three synchronous mutations and one DOM update - what happens in between.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I2_BASE +
              '<rect x="20" y="50" width="180" height="80" rx="12' + WARN +
              '<text x="110" y="152" fill="var(--warn)" font-size="13" text-anchor="middle">still synchronous</text>' +
              '</svg>',
            label: { pl: '1. Kod mutuje stan', en: '1. Code mutates state' },
            note: {
              pl: 'Trzy zapisy w tej samej funkcji. Każdy woła trigger natychmiast - to część synchroniczna i nie da się jej pominąć.',
              en: 'Three writes in one function. Each calls trigger immediately - that part is synchronous and cannot be skipped.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I2_BASE +
              '<rect x="230" y="126" width="180" height="58" rx="12' + HI +
              '<line x1="200" y1="120" x2="225" y2="150" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="530" y="90" fill="var(--accent)" font-size="13" text-anchor="middle">job added once</text>' +
              '</svg>',
            label: { pl: '2. Job trafia do kolejki', en: '2. The job is queued' },
            note: {
              pl: 'Efekt renderujący nie biegnie od razu - jego scheduler wrzuca job do kolejki. Ten sam job, wrzucony trzy razy, zostaje w kolejce raz.',
              en: 'The render effect does not run yet - its scheduler pushes a job into the queue. The same job pushed three times stays in the queue once.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I2_BASE +
              '<rect x="230" y="300" width="180" height="62" rx="12' + HI +
              '<rect x="230" y="50" width="180" height="58" rx="12' + HI +
              '<line x1="320" y1="298" x2="320" y2="112" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="110" y="335" fill="var(--muted)" font-size="13" text-anchor="middle">stack is empty</text>' +
              '</svg>',
            label: { pl: '3. Mikrozadanie startuje', en: '3. The microtask starts' },
            note: {
              pl: 'Gdy stos wywołań się opróżni, promise flushuje kolejkę. Najpierw pre - tam siedzą watchery z domyślnym flush pre, jeszcze przed renderem.',
              en: 'Once the call stack empties, a promise flushes the queue. Pre goes first - that is where watchers with the default pre flush live, still before render.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I2_BASE +
              '<rect x="230" y="126" width="180" height="58" rx="12' + OK +
              '<rect x="440" y="126" width="180" height="58" rx="12' + OK +
              '<line x1="410" y1="155" x2="436" y2="155" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="530" y="206" fill="var(--ok)" font-size="13" text-anchor="middle">single patch</text>' +
              '</svg>',
            label: { pl: '4. Joby renderują', en: '4. Jobs render' },
            note: {
              pl: 'Joby są sortowane rosnąco po uid komponentu, więc rodzic aktualizuje się przed dzieckiem, a dziecko odmontowane przez rodzica nie renderuje się w ogóle.',
              en: 'Jobs are sorted by ascending component uid, so a parent updates before its child, and a child unmounted by that parent never renders at all.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' + I2_BASE +
              '<rect x="230" y="202" width="180" height="58" rx="12' + HI +
              '<rect x="440" y="300" width="180" height="62" rx="12' + OK +
              '<line x1="410" y1="240" x2="500" y2="298" stroke="var(--ok)" stroke-width="3"/>' +
              '</svg>',
            label: { pl: '5. Post i nextTick', en: '5. Post and nextTick' },
            note: {
              pl: 'Na końcu lecą kolejki post: onUpdated, template refy i watchery z flush post. Dopiero potem rozwiązuje się promise z nextTick.',
              en: 'The post queue runs last: onUpdated, template refs and watchers with post flush. Only then does the nextTick promise resolve.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kelnera w małej restauracji. Siedzisz przy stoliku i mówisz: "poproszę zupę". Chwilę później: "i jeszcze chleb". I zaraz: "a właściwie zamiast zupy - rosół".</p><p>Kiepski kelner biegłby do kuchni po każdym zdaniu. Trzy biegi, dwa niepotrzebne, a pierwsze danie i tak trafi do kosza.</p><p>Dobry kelner słucha do końca, zapisuje wszystko na jednej kartce, wykreśla to, co się zmieniło, i idzie do kuchni raz. Kuchnia dostaje jedno spójne zamówienie.</p><p>Vue jest tym dobrym kelnerem. Kiedy zmieniasz kilka rzeczy pod rząd, ono nie przerysowuje ekranu po każdej z nich. Czeka, aż skończysz mówić, składa wszystko w jedną listę zadań i odświeża ekran raz.</p><p>Dlatego czasem tuż po zmianie danych ekran jeszcze ich nie pokazuje. Kelner po prostu jeszcze nie wrócił z kuchni.</p>',
          en: '<p>Picture a waiter in a small restaurant. You say: "soup, please." A moment later: "and some bread." And right after: "actually, make the soup a broth."</p><p>A bad waiter runs to the kitchen after every sentence. Three trips, two of them wasted, and the first dish ends up in the bin anyway.</p><p>A good waiter listens to the end, writes everything on one slip, crosses out what changed, and walks to the kitchen once. The kitchen gets one consistent order.</p><p>Vue is the good waiter. When you change several things in a row it does not repaint the screen after each one. It waits until you stop talking, folds everything into a single to-do list, and updates the screen once.</p><p>That is why the screen sometimes does not show your change immediately. The waiter simply has not come back from the kitchen yet.</p>'
        },
        school: {
          pl: '<p><code>ReactiveEffect</code> to klasa z metodą <code>run()</code> i opcjonalnym <code>scheduler</code>. Kiedy dep zostaje wyzwolony, Vue nie woła <code>run()</code> - woła <code>scheduler()</code>, jeśli istnieje. To jeden punkt rozszerzenia, na którym stoi cała asynchroniczność Vue.</p><ul><li>Efekt renderujący komponentu ma scheduler, który wrzuca job do kolejki.</li><li><code>watch</code> z domyślnym <code>flush: pre</code> wrzuca callback do kolejki pre.</li><li><code>flush: post</code> odkłada go za render.</li><li><code>flush: sync</code> woła go natychmiast, bez kolejki.</li></ul><p>Kolejka jest deduplikowana po identyfikatorze joba i sortowana rosnąco po <code>uid</code> komponentu, czyli po kolejności tworzenia. Rodzic ma mniejszy uid niż dziecko, więc aktualizuje się pierwszy. To nie jest kosmetyka: jeśli rodzic w tym samym ticku usunie dziecko, job dziecka zostanie po prostu pominięty jako nieaktywny.</p><p>Flush odbywa się w mikrozadaniu przez <code>Promise.resolve().then(...)</code>. Dokładnie ten sam promise zwraca <code>nextTick()</code>, dlatego to działa:</p><pre><code>count.value++\nconsole.log(el.textContent) // stara wartosc\nawait nextTick()\nconsole.log(el.textContent) // nowa</code></pre><p>Praktyczna konsekwencja: mutacja jest synchroniczna, reakcja nie. Jeśli w watcherze mierzysz wysokość elementu, musisz użyć <code>flush: post</code>, bo domyślny pre biegnie jeszcze przed patchowaniem DOM.</p><p>Jest też bezpiecznik. Jeśli job podczas flushu w kółko dodaje sam siebie, po około stu iteracjach dostaniesz ostrzeżenie o przekroczeniu limitu rekurencyjnych aktualizacji. To prawie zawsze oznacza watcher, który zmienia własne źródło, albo dwa watchery synchronizujące się nawzajem w obie strony.</p>',
          en: '<p><code>ReactiveEffect</code> is a class with a <code>run()</code> method and an optional <code>scheduler</code>. When a dep fires, Vue does not call <code>run()</code> - it calls <code>scheduler()</code> if one exists. That single extension point is what all of Vue asynchrony is built on.</p><ul><li>A component render effect has a scheduler that pushes a job into the queue.</li><li><code>watch</code> with the default <code>flush: pre</code> pushes the callback into the pre queue.</li><li><code>flush: post</code> defers it past render.</li><li><code>flush: sync</code> calls it immediately, no queue involved.</li></ul><p>The queue is deduplicated by job id and sorted by ascending component <code>uid</code>, which is creation order. A parent has a lower uid than its child, so it updates first. This is not cosmetic: if the parent removes the child in the same tick, the child job is simply skipped as inactive.</p><p>The flush happens in a microtask via <code>Promise.resolve().then(...)</code>. That exact promise is what <code>nextTick()</code> hands you, which is why this works:</p><pre><code>count.value++\nconsole.log(el.textContent) // old value\nawait nextTick()\nconsole.log(el.textContent) // new one</code></pre><p>The practical consequence: the mutation is synchronous, the reaction is not. If a watcher measures element height, it needs <code>flush: post</code>, because the default pre runs before the DOM is patched.</p><p>There is also a fuse. If a job keeps re-queueing itself during a flush, after roughly a hundred iterations you get a maximum recursive updates warning. That almost always means a watcher writing to its own source.</p>'
        },
        pro: {
          pl: '<p>Scheduler to jedna tablica jobów plus tablica post-cbs, indeks bieżącej pozycji i flagi <code>isFlushing</code> oraz <code>isFlushPending</code>. Joby wstawiane w trakcie flushu trafiają na właściwą pozycję przez wyszukiwanie binarne, więc kolejność rodzic-dziecko trzyma się nawet przy zagnieżdżonych aktualizacjach.</p><p><strong>Flagi joba.</strong> Job to funkcja z polami: <code>id</code> (uid komponentu, <code>Infinity</code> dla jobów bez komponentu), <code>flags</code> z bitami <code>ALLOW_RECURSE</code>, <code>QUEUED</code> i <code>DISPOSED</code> oraz <code>i</code> - referencja do instancji, po której sprawdza się, czy komponent nadal żyje. Callbacki <code>watch</code> mają ustawione <code>ALLOW_RECURSE</code>, bo mają prawo zmodyfikować własne źródło raz; efekt renderujący nie ma.</p><p><strong>Computed.</strong> Computed to subscriber i dep naraz, obliczany leniwie. Od 3.4 zamiast prostego boolean <code>dirty</code> jest poziom zabrudzenia: <code>MaybeDirty</code> oznacza "któraś zależność mogła się zmienić" i wymusza sprawdzenie łańcucha przed przeliczeniem. Dzięki temu computed zależny od computed nie przelicza kaskadowo całej gałęzi, jeśli po drodze wartość wyszła identyczna. Efekt uboczny: nie polegaj na tym, że getter computed uruchomi się dokładnie raz na mutację - to nie jest kontrakt.</p><pre><code>watch(source, cb, { flush: "post" })   // po patchu DOM\nwatch(source, cb, { flush: "sync" })   // natychmiast, bez batchowania\n\nconst scope = effectScope()\nscope.run(() => { watchEffect(update) })\nscope.stop()  // zatrzymuje wszystko naraz</code></pre><p><strong>effectScope.</strong> Każdy komponent ma własny scope; watchery utworzone w <code>setup</code> lądują w nim i giną przy unmount. Watcher utworzony w callbacku promise, po await, już nie - jest tworzony po zakończeniu setupu i wycieka. To najczęstszy wyciek w composables. Ratunek: <code>effectScope</code> plus <code>onScopeDispose</code> w composable, albo <code>getCurrentScope()?.run()</code>.</p><p><strong>Kiedy sync boli.</strong> <code>flush: sync</code> wygląda niewinnie w bibliotece komponentów, ale przy 200 wierszach tabeli zamienia jedną aktualizację w 200 osobnych patchy. W design systemie to jest najczęstsza przyczyna raportów, że tabela "przycina" przy filtrowaniu. Domyślnie zostaw pre, po sync sięgaj tylko wtedy, gdy naprawdę potrzebujesz obserwacji przed jakimkolwiek batchowaniem, na przykład przy synchronizacji z zewnętrznym stanem niereaktywnym.</p><p><strong>Debug.</strong> W trybie deweloperskim <code>onTrack</code> i <code>onTrigger</code> na <code>watch</code> oraz <code>computed</code> dają dokładny event z <code>target</code>, <code>key</code> i <code>type</code>. Debugger w <code>onTrigger</code> to najszybsza droga do odpowiedzi "kto właściwie ruszył ten stan".</p>',
          en: '<p>The scheduler is one job array plus a post-callback array, a cursor index, and the <code>isFlushing</code> / <code>isFlushPending</code> flags. Jobs queued during a flush are inserted at the right position by binary search, so parent-before-child ordering survives nested updates.</p><p><strong>Job flags.</strong> A job is a function carrying <code>id</code> (the component uid, <code>Infinity</code> for component-less jobs), a <code>flags</code> bitfield with <code>ALLOW_RECURSE</code>, <code>QUEUED</code> and <code>DISPOSED</code>, and <code>i</code>, the instance reference used to check whether the component is still alive. <code>watch</code> callbacks carry <code>ALLOW_RECURSE</code> because they are allowed to touch their own source once; a render effect is not.</p><p><strong>Computed.</strong> A computed is both a subscriber and a dep, evaluated lazily. Since 3.4 the plain <code>dirty</code> boolean became a dirty level: <code>MaybeDirty</code> means "some dependency may have changed" and forces a chain check before recomputing. A computed built on a computed therefore stops cascading when an intermediate value comes out identical. Side effect: do not rely on a computed getter running exactly once per mutation - that was never the contract.</p><pre><code>watch(source, cb, { flush: "post" })   // after the DOM patch\nwatch(source, cb, { flush: "sync" })   // immediate, no batching\n\nconst scope = effectScope()\nscope.run(() => { watchEffect(update) })\nscope.stop()  // tears everything down at once</code></pre><p><strong>effectScope.</strong> Every component owns a scope; watchers created inside <code>setup</code> land in it and die on unmount. A watcher created in a promise callback after an await does not - it is created past the end of setup and leaks. This is the single most common leak in composables. The fix is <code>effectScope</code> plus <code>onScopeDispose</code> inside the composable, or <code>getCurrentScope()?.run()</code>.</p><p><strong>When sync hurts.</strong> <code>flush: sync</code> looks harmless in a component library, but across 200 table rows it turns one update into 200 separate patches. In a design system this is the number one cause of "the table stutters when I filter" reports. Keep pre as the default and reach for sync only when you genuinely need observation before any batching, for instance when mirroring non-reactive external state.</p><p><strong>Debugging.</strong> In dev builds, <code>onTrack</code> and <code>onTrigger</code> on <code>watch</code> and <code>computed</code> hand you an event with <code>target</code>, <code>key</code> and <code>type</code>. A breakpoint in <code>onTrigger</code> is the fastest route to answering "who actually touched this state".</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym różni się scheduler od run w ReactiveEffect?',
            en: 'What is the difference between scheduler and run on a ReactiveEffect?'
          },
          options: [
            { pl: 'Scheduler decyduje KIEDY efekt zostanie wykonany, run to samo wykonanie', en: 'The scheduler decides WHEN the effect runs; run is the execution itself' },
            { pl: 'Scheduler to wersja asynchroniczna run', en: 'The scheduler is just the async version of run' },
            { pl: 'Scheduler jest używany tylko w trybie deweloperskim', en: 'The scheduler is only used in dev mode' },
            { pl: 'Nie ma różnicy, to aliasy', en: 'No difference, they are aliases' }
          ],
          correct: 0,
          explain: {
            pl: 'Trigger woła scheduler, jeśli jest ustawiony, i dopiero scheduler decyduje, czy odłożyć pracę do kolejki, czy wykonać ją od razu.',
            en: 'Trigger calls the scheduler when one is set, and only the scheduler decides whether to queue the work or run it right away.'
          }
        },
        {
          q: {
            pl: 'Watcher ma zmierzyć wysokość elementu po zmianie danych. Jaki flush?',
            en: 'A watcher needs to measure an element height after data changes. Which flush?'
          },
          options: [
            { pl: 'pre, bo jest domyślny', en: 'pre, because it is the default' },
            { pl: 'sync, bo jest najszybszy', en: 'sync, because it is the fastest' },
            { pl: 'post, bo dopiero wtedy DOM jest już zaktualizowany', en: 'post, because only then is the DOM already patched' },
            { pl: 'Dowolny, wystarczy dodać immediate', en: 'Any of them, just add immediate' }
          ],
          correct: 2,
          explain: {
            pl: 'Pre biegnie przed renderem, więc zobaczyłbyś stare wymiary. Post jest wykonywany po patchu, tuż obok onUpdated.',
            en: 'Pre runs before render, so you would measure stale geometry. Post runs after the patch, right next to onUpdated.'
          }
        },
        {
          q: {
            pl: 'Dlaczego joby są sortowane po uid komponentu?',
            en: 'Why are jobs sorted by component uid?'
          },
          options: [
            { pl: 'Żeby zmniejszyć zużycie pamięci kolejki', en: 'To reduce the memory used by the queue' },
            { pl: 'Żeby rodzic aktualizował się przed dzieckiem, bo może je odmontować', en: 'So a parent updates before its child, since it may unmount that child' },
            { pl: 'Żeby zachować kolejność alfabetyczną nazw komponentów', en: 'To keep component names in alphabetical order' },
            { pl: 'Żeby watchery biegły przed renderem', en: 'To make watchers run before render' }
          ],
          correct: 1,
          explain: {
            pl: 'Rodzic ma niższy uid, bo powstał wcześniej. Aktualizacja od góry pozwala pominąć joby dzieci, które właśnie zniknęły z drzewa.',
            en: 'A parent has a lower uid because it was created first. Updating top-down lets Vue skip jobs for children that just left the tree.'
          }
        },
        {
          q: {
            pl: 'Composable robi <code>await fetchConfig()</code>, a potem tworzy <code>watchEffect</code>. Co jest nie tak?',
            en: 'A composable does <code>await fetchConfig()</code> and then creates a <code>watchEffect</code>. What is wrong?'
          },
          options: [
            { pl: 'watchEffect nie działa po await, po prostu nic nie zrobi', en: 'watchEffect does not work after an await, it simply does nothing' },
            { pl: 'Efekt powstaje poza scope komponentu, więc nie zostanie zatrzymany przy unmount', en: 'The effect is created outside the component scope, so it is never stopped on unmount' },
            { pl: 'Trzeba tylko dodać flush post', en: 'It just needs flush post added' },
            { pl: 'Nic, Vue wykrywa to automatycznie i sprząta', en: 'Nothing, Vue detects it and cleans up automatically' }
          ],
          correct: 1,
          explain: {
            pl: 'Aktywny scope jest ustawiony tylko synchronicznie w trakcie setup. Po await trzeba samemu użyć effectScope i onScopeDispose, inaczej efekt żyje dłużej niż komponent.',
            en: 'The active scope is only set synchronously during setup. After an await you must use effectScope and onScopeDispose yourself, or the effect outlives the component.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------ 3
    {
      id: 'shallow-apis-markraw',
      title: {
        pl: 'shallowRef, markRaw i wyjścia awaryjne',
        en: 'Shallow APIs, markRaw and escape hatches'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'shallowRef', en: 'shallowRef' },
          def: {
            pl: 'Ref reaktywny tylko na podmianę całej wartości <code>.value</code>; wnętrze obiektu nie jest opakowywane w proxy. Domyślny wybór dla dużych list i instancji zewnętrznych bibliotek.',
            en: 'A ref that is reactive only when the whole <code>.value</code> is replaced; the inner object is never wrapped in a proxy. The default choice for large lists and third-party instances.'
          }
        },
        {
          term: { pl: 'shallowReactive', en: 'shallowReactive' },
          def: {
            pl: 'Proxy śledzące wyłącznie właściwości pierwszego poziomu. Zagnieżdżone obiekty zostają surowe, ale <code>ref</code> na pierwszym poziomie nadal jest rozpakowywany.',
            en: 'A proxy that tracks first-level properties only. Nested objects stay raw, though a <code>ref</code> at the first level is still unwrapped.'
          }
        },
        {
          term: { pl: 'markRaw', en: 'markRaw' },
          def: {
            pl: 'Oznacza obiekt flagą <code>__v_skip</code>, przez co <code>reactive</code> nigdy go nie opakuje. Stosowane do instancji bibliotek (mapy, wykresy, edytory), które proxy psuje.',
            en: 'Tags an object with the <code>__v_skip</code> flag so <code>reactive</code> never wraps it. Used for library instances (maps, charts, editors) that a proxy breaks.'
          }
        },
        {
          term: { pl: 'shallowReadonly', en: 'shallowReadonly' },
          def: {
            pl: 'Blokuje zapis tylko na najwyższym poziomie obiektu; zagnieżdżone właściwości pozostają zapisywalne. Tak właśnie zachowuje się obiekt <code>props</code> w komponencie.',
            en: 'Blocks writes at the top level only; nested properties stay writable. This is exactly how the component <code>props</code> object behaves.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">How deep does reactivity go?</text>' +
          '<rect x="20" y="50" width="180" height="150" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="110" y="80" fill="var(--text)" font-size="15" text-anchor="middle">reactive / ref</text>' +
          '<text x="110" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">level 1 tracked</text>' +
          '<text x="110" y="134" fill="var(--muted)" font-size="13" text-anchor="middle">level 2 tracked</text>' +
          '<text x="110" y="158" fill="var(--muted)" font-size="13" text-anchor="middle">level 3 tracked</text>' +
          '<text x="110" y="184" fill="var(--accent)" font-size="13" text-anchor="middle">deep, lazy</text>' +
          '<rect x="230" y="50" width="180" height="150" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="80" fill="var(--text)" font-size="15" text-anchor="middle">shallow*</text>' +
          '<text x="320" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">level 1 tracked</text>' +
          '<text x="320" y="134" fill="var(--muted)" font-size="13" text-anchor="middle">level 2 raw</text>' +
          '<text x="320" y="158" fill="var(--muted)" font-size="13" text-anchor="middle">level 3 raw</text>' +
          '<text x="320" y="184" fill="var(--accent2)" font-size="13" text-anchor="middle">replace to update</text>' +
          '<rect x="440" y="50" width="180" height="150" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="530" y="80" fill="var(--text)" font-size="15" text-anchor="middle">markRaw</text>' +
          '<text x="530" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">never proxied</text>' +
          '<text x="530" y="134" fill="var(--muted)" font-size="13" text-anchor="middle">__v_skip flag</text>' +
          '<text x="530" y="158" fill="var(--muted)" font-size="13" text-anchor="middle">class instances</text>' +
          '<text x="530" y="184" fill="var(--warn)" font-size="13" text-anchor="middle">manual updates</text>' +
          '<rect x="20" y="240" width="600" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="270" fill="var(--text)" font-size="14" text-anchor="middle">10k rows, chart instance, editor model, websocket client</text>' +
          '<text x="320" y="294" fill="var(--muted)" font-size="13" text-anchor="middle">cost of deep proxying outweighs the convenience</text>' +
          '<rect x="20" y="335" width="600" height="65" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="365" fill="var(--ok)" font-size="14" text-anchor="middle">triggerRef + customRef = manual control</text>' +
          '<text x="320" y="388" fill="var(--muted)" font-size="13" text-anchor="middle">you decide when subscribers wake up</text>' +
          '</svg>',
        caption: {
          pl: 'Trzy poziomy głębokości: pełna reaktywność, płytka warstwa jednego poziomu i całkowite wyłączenie przez markRaw - plus ręczne wyzwalanie.',
          en: 'Three depths: full reactivity, a one-level shallow layer, and a full opt-out via markRaw - plus manual triggering.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że pilnujesz walizki na lotnisku. Możesz to robić na trzy sposoby.</p><p>Pierwszy: sprawdzasz każdą skarpetkę, każdą kieszonkę, każde pudełeczko w środku. Wiesz o wszystkim, ale zajmuje ci to godzinę.</p><p>Drugi: pilnujesz tylko samej walizki. Jak ktoś ją zabierze albo podmieni, zauważysz. Co dzieje się w środku, cię nie interesuje.</p><p>Trzeci: mówisz "tej walizki w ogóle nie pilnuję". To walizka twojego znajomego, on sam wie, co w niej jest, i wolisz jej nie ruszać.</p><p>Vue daje dokładnie te trzy tryby. Domyślnie sprawdza każdą skarpetkę. Czasem to za dużo pracy - wtedy mówisz "pilnuj tylko walizki". A czasem masz coś obcego, na przykład gotową bibliotekę z mapą, i najlepiej jest powiedzieć: nie dotykaj tego wcale.</p>',
          en: '<p>Imagine watching a suitcase at an airport. You can do it three ways.</p><p>One: you check every sock, every pocket, every little box inside. You know everything, and it takes an hour.</p><p>Two: you watch the suitcase itself. If someone takes it or swaps it, you notice. What happens inside is not your business.</p><p>Three: you say "I am not watching that one at all." It belongs to a friend, he knows what is in there, and you would rather not touch it.</p><p>Vue gives you exactly those three modes. By default it checks every sock. Sometimes that is too much work, so you say "just watch the suitcase". And sometimes you are holding something foreign, like a ready-made map library, and the best move is: do not touch this at all.</p>'
        },
        school: {
          pl: '<p>Domyślna reaktywność jest głęboka. <code>reactive</code> i <code>ref</code> opakowują zagnieżdżone obiekty leniwie, ale opakowują. Przy dużych strukturach albo obcych obiektach to kosztuje, dlatego istnieją wyjścia awaryjne.</p><ul><li><strong>shallowRef</strong> - śledzi tylko podmianę <code>.value</code>. Mutacja pola w środku nic nie zrobi.</li><li><strong>shallowReactive</strong> - śledzi tylko właściwości pierwszego poziomu.</li><li><strong>markRaw</strong> - trwale wyklucza obiekt z reaktywności przez flagę <code>__v_skip</code>.</li><li><strong>toRaw</strong> - wyciąga oryginał spod proxy.</li><li><strong>triggerRef</strong> - ręcznie budzi subskrybentów <code>shallowRef</code> po mutacji w miejscu.</li><li><strong>customRef</strong> - własna para track i trigger, idealna do debounce.</li></ul><p>Typowy przypadek: instancja klasy z zewnętrznej biblioteki - mapa Leaflet, wykres, edytor Monaco, klient WebSocket. Takie obiekty mają metody, wewnętrzny stan i często same obiekty DOM w środku. Opakowanie ich w proxy w najlepszym razie spowalnia, w najgorszym psuje bibliotekę, bo porównania <code>this</code> przestają działać.</p><pre><code>import { markRaw, shallowRef } from "vue"\n\nconst chart = shallowRef(null)\nonMounted(() => {\n  chart.value = markRaw(new Chart(el.value, config))\n})</code></pre><p>Drugi typowy przypadek: duża lista. Tabela z 20 tysiącami wierszy w <code>ref</code> tworzy proxy dla każdego wiersza przy pierwszym odczycie. Ten sam widok na <code>shallowRef</code> i pełnej wymianie tablicy renderuje się zauważalnie szybciej i zużywa mniej pamięci, bo wierszy i tak nie mutujesz pojedynczo.</p><p>Reguła: reaktywność głęboka jest wygodna, płytka jest szybka, a markRaw jest dla rzeczy, które nie należą do ciebie.</p>',
          en: '<p>Reactivity is deep by default. <code>reactive</code> and <code>ref</code> wrap nested objects lazily, but they do wrap them. On large structures or foreign objects that costs, which is why the escape hatches exist.</p><ul><li><strong>shallowRef</strong> - tracks only <code>.value</code> replacement. Mutating a field inside does nothing.</li><li><strong>shallowReactive</strong> - tracks only root-level properties.</li><li><strong>markRaw</strong> - permanently opts an object out via the <code>__v_skip</code> flag.</li><li><strong>toRaw</strong> - pulls the original out from under a proxy.</li><li><strong>triggerRef</strong> - manually wakes the subscribers of a <code>shallowRef</code> after an in-place mutation.</li><li><strong>customRef</strong> - your own track/trigger pair, perfect for debouncing.</li></ul><p>The classic case is a class instance from an external library - a Leaflet map, a chart, a Monaco editor, a WebSocket client. Those objects carry methods, internal state and often live DOM nodes. Proxying them slows things down at best and breaks the library at worst, because <code>this</code> comparisons stop matching.</p><pre><code>import { markRaw, shallowRef } from "vue"\n\nconst chart = shallowRef(null)\nonMounted(() => {\n  chart.value = markRaw(new Chart(el.value, config))\n})</code></pre><p>The second classic case is a big list. A table of 20 thousand rows in a <code>ref</code> mints a proxy per row on first read. The same view on a <code>shallowRef</code> with whole-array replacement renders noticeably faster and holds less memory, because you were never mutating rows individually anyway.</p><p>Rule of thumb: deep reactivity is convenient, shallow is fast, and markRaw is for things that are not yours.</p>'
        },
        pro: {
          pl: '<p>Wszystkie warianty dzielą ten sam kod - różnią się tylko flagami przekazanymi do fabryki handlerów: <code>isReadonly</code> i <code>shallow</code>. Stąd cztery cache-mapy: <code>reactiveMap</code>, <code>shallowReactiveMap</code>, <code>readonlyMap</code>, <code>shallowReadonlyMap</code>.</p><p><strong>Semantyka markRaw, którą łatwo źle zrozumieć.</strong> Flaga <code>__v_skip</code> jest ustawiana na konkretnym obiekcie i jest niedziedziczna. Obiekt oznaczony markRaw nie zostanie opakowany, ale jego właściwości mogą być reaktywne, jeśli same są proxy. Ponadto markRaw nie chroni przed podmianą referencji - <code>state.map = markRaw(newMap)</code> nadal wyzwoli efekty zależne od klucza <code>map</code>, bo triggeruje set trap rodzica. Nie da się też cofnąć markRaw.</p><p><strong>shallowReactive i zagnieżdżone refy.</strong> W <code>reactive</code> ref na dowolnym poziomie jest automatycznie odpakowywany. W <code>shallowReactive</code> nie jest - <code>state.count</code> zwróci obiekt ref, nie liczbę. To realny bug przy migracji istniejącego store na shallow.</p><pre><code>const s = shallowReactive({ n: ref(0) })\ns.n            // Ref, nie 0\n\nconst list = shallowRef([...rows])\nlist.value.push(row)   // brak reakcji\ntriggerRef(list)       // teraz jest\n\nconst debounced = customRef((track, trigger) => {\n  let t, v = ""\n  return {\n    get() { track(); return v },\n    set(next) {\n      clearTimeout(t)\n      t = setTimeout(() => { v = next; trigger() }, 300)\n    },\n  }\n})</code></pre><p><strong>Kiedy realnie to się opłaca.</strong> Punkt przegięcia to mniej więcej kilka tysięcy obiektów w widocznej strukturze. Przy tabeli 20 tysięcy wierszy po 12 pól głęboka reaktywność to dziesiątki tysięcy proxy i wpisów w targetMap. Zmiana na <code>shallowRef</code> plus niemutowalna wymiana tablicy typowo tnie czas pierwszego renderu o 30-50 procent i wyraźnie zmniejsza szczyty pamięci. Warunek jest jeden: dane muszą być wymieniane, nie mutowane w miejscu.</p><p><strong>W design systemie.</strong> Publiczne API komponentu prawie nigdy nie powinno wymuszać na konsumencie shallow - to detal implementacyjny. Natomiast wewnątrz komponentu warto: instancje obserwatorów (<code>ResizeObserver</code>, <code>IntersectionObserver</code>), referencje do bibliotek zewnętrznych i cache pomiarów trzymaj jako <code>markRaw</code> albo zwykłe zmienne modułowe. Jeśli komponent przyjmuje w propsach obiekt użytkownika i tylko go czyta, rozważ <code>shallowReadonly</code> - dostajesz ostrzeżenia o zapisie bez kosztu głębokiego opakowania.</p><p><strong>Pułapka SSR.</strong> <code>markRaw</code> na obiektach, które trafiają do serializowanego stanu Nuxt, nie przetrwa hydratacji - po stronie klienta to już zwykły obiekt bez flagi. Flagę trzeba nałożyć ponownie po deserializacji.</p>',
          en: '<p>Every variant shares the same code and differs only in flags passed to the handler factory: <code>isReadonly</code> and <code>shallow</code>. Hence four cache maps: <code>reactiveMap</code>, <code>shallowReactiveMap</code>, <code>readonlyMap</code>, <code>shallowReadonlyMap</code>.</p><p><strong>markRaw semantics people get wrong.</strong> The <code>__v_skip</code> flag sits on one specific object and is not inherited. A markRaw object will not be wrapped, but its properties can still be reactive if they are proxies themselves. markRaw also does not protect against reference replacement - <code>state.map = markRaw(newMap)</code> still triggers effects depending on the <code>map</code> key, because it goes through the parent set trap. And markRaw cannot be undone.</p><p><strong>shallowReactive and nested refs.</strong> In <code>reactive</code>, a ref at any depth is unwrapped automatically. In <code>shallowReactive</code> it is not - <code>state.count</code> hands back the ref object, not the number. That is a real bug when migrating an existing store to shallow.</p><pre><code>const s = shallowReactive({ n: ref(0) })\ns.n            // Ref, not 0\n\nconst list = shallowRef([...rows])\nlist.value.push(row)   // no reaction\ntriggerRef(list)       // now there is\n\nconst debounced = customRef((track, trigger) => {\n  let t, v = ""\n  return {\n    get() { track(); return v },\n    set(next) {\n      clearTimeout(t)\n      t = setTimeout(() => { v = next; trigger() }, 300)\n    },\n  }\n})</code></pre><p><strong>When it actually pays off.</strong> The inflection point is somewhere around a few thousand objects in a live structure. A 20 thousand row table with 12 fields each means tens of thousands of proxies and targetMap entries. Moving to <code>shallowRef</code> plus immutable array replacement typically cuts first render time by 30-50 percent and visibly lowers peak memory. One condition: the data must be replaced, not mutated in place.</p><p><strong>In a design system.</strong> A component public API should almost never force shallow on the consumer - that is an implementation detail. Inside the component it is worth it: observer instances (<code>ResizeObserver</code>, <code>IntersectionObserver</code>), external library handles and measurement caches belong in <code>markRaw</code> or plain module variables. If a component takes a user object as a prop and only reads it, consider <code>shallowReadonly</code> - you get write warnings without paying for deep wrapping.</p><p><strong>SSR trap.</strong> <code>markRaw</code> on objects that end up in serialized Nuxt state does not survive hydration - on the client it is a plain object again with no flag. You have to reapply the flag after deserialization.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie śledzi shallowRef?',
            en: 'What exactly does shallowRef track?'
          },
          options: [
            { pl: 'Wszystkie zmiany w obiekcie, ale bez zagnieżdżonych tablic', en: 'All object changes, except nested arrays' },
            { pl: 'Tylko podmianę całej wartości .value', en: 'Only replacement of the whole .value' },
            { pl: 'Pierwsze dwa poziomy zagnieżdżenia', en: 'The first two levels of nesting' },
            { pl: 'Nic, to jest zwykła zmienna', en: 'Nothing, it is just a plain variable' }
          ],
          correct: 1,
          explain: {
            pl: 'shallowRef reaguje wyłącznie na przypisanie do .value. Mutacja w środku wymaga ręcznego triggerRef.',
            en: 'shallowRef reacts only to assigning .value. Mutating inside requires a manual triggerRef.'
          }
        },
        {
          q: {
            pl: 'Trzymasz instancję biblioteki wykresów w reactive i biblioteka zaczyna się dziwnie zachowywać. Dlaczego?',
            en: 'You keep a charting library instance in reactive and the library starts misbehaving. Why?'
          },
          options: [
            { pl: 'Bo reactive zamraża obiekt', en: 'Because reactive freezes the object' },
            { pl: 'Bo proxy zmienia tożsamość obiektu i wewnętrzne porównania biblioteki przestają pasować', en: 'Because the proxy changes object identity and the library internal comparisons stop matching' },
            { pl: 'Bo Vue kopiuje obiekt przy każdym odczycie', en: 'Because Vue clones the object on every read' },
            { pl: 'Bo reactive działa tylko na zwykłych obiektach literalnych', en: 'Because reactive only works on plain object literals' }
          ],
          correct: 1,
          explain: {
            pl: 'Biblioteka porównuje this i przechowuje własne referencje, a przez proxy dostaje raz opakowaną, raz surową wersję. markRaw usuwa problem u źródła.',
            en: 'The library compares this and stores its own references, but through a proxy it sees a wrapped version sometimes and a raw one other times. markRaw removes the problem at the source.'
          }
        },
        {
          q: {
            pl: 'Co zwróci <code>shallowReactive({ n: ref(0) }).n</code>?',
            en: 'What does <code>shallowReactive({ n: ref(0) }).n</code> return?'
          },
          options: [
            { pl: 'Obiekt ref, bo shallowReactive nie odpakowuje refów', en: 'The ref object, because shallowReactive does not unwrap refs' },
            { pl: '0, tak jak w reactive', en: '0, same as in reactive' },
            { pl: 'undefined', en: 'undefined' },
            { pl: 'Proxy opakowujące ref', en: 'A proxy wrapping the ref' }
          ],
          correct: 0,
          explain: {
            pl: 'Automatyczne odpakowywanie refów jest częścią głębokiego trybu. W shallow dostajesz surową wartość właściwości, czyli sam ref.',
            en: 'Automatic ref unwrapping is part of the deep mode. In shallow mode you get the raw property value, which is the ref itself.'
          }
        },
        {
          q: {
            pl: 'Które stwierdzenie o markRaw jest prawdziwe w produkcji?',
            en: 'Which statement about markRaw is true in production?'
          },
          options: [
            { pl: 'Można je cofnąć przez unmarkRaw', en: 'It can be reverted with unmarkRaw' },
            { pl: 'Zapobiega też wyzwoleniu efektów przy podmianie referencji na rodzicu', en: 'It also prevents effects firing when the parent reference is replaced' },
            { pl: 'Flaga nie przetrwa serializacji SSR i trzeba ją nałożyć ponownie po hydratacji', en: 'The flag does not survive SSR serialization and must be reapplied after hydration' },
            { pl: 'Działa rekurencyjnie na wszystkie zagnieżdżone obiekty', en: 'It applies recursively to all nested objects' }
          ],
          correct: 2,
          explain: {
            pl: 'markRaw to zwykła niewyliczalna właściwość na obiekcie - po JSON.stringify i parse znika. Nie jest ani odwracalne, ani dziedziczone, ani nie blokuje set trapa rodzica.',
            en: 'markRaw is a non-enumerable property on the object - it disappears through JSON.stringify and parse. It is neither reversible nor inherited, and it does not block the parent set trap.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------ 4
    {
      id: 'reactivity-pitfalls',
      title: {
        pl: 'Pułapki reaktywności',
        en: 'Reactivity pitfalls'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'utrata reaktywności przy destrukturyzacji', en: 'losing reactivity on destructuring' },
          def: {
            pl: 'Destrukturyzacja obiektu <code>reactive</code> kopiuje prymitywy i zrywa połączenie z proxy. Ratunkiem jest <code>toRefs</code>, getter w <code>watch</code> albo trzymanie wartości w <code>ref</code>.',
            en: 'Destructuring a <code>reactive</code> object copies primitives and cuts the link to the proxy. The fixes are <code>toRefs</code>, a getter in <code>watch</code>, or keeping values in a <code>ref</code>.'
          }
        },
        {
          term: { pl: 'onWatcherCleanup', en: 'onWatcherCleanup' },
          def: {
            pl: 'Rejestruje sprzątanie uruchamiane przed kolejnym odpaleniem watchera - anuluje poprzedni request i usuwa wyścig, w którym wolniejsza odpowiedź nadpisuje nowszą.',
            en: 'Registers cleanup that runs before the next watcher invocation - it cancels the previous request and removes the race where a slower response overwrites a newer one.'
          }
        },
        {
          term: { pl: 'luka w zależności warunkowej', en: 'conditional dependency gap' },
          def: {
            pl: 'Efekt śledzi tylko klucze faktycznie odczytane w danym przebiegu. Gałąź niewykonana w <code>if</code> nie jest zależnością, więc jej późniejsza zmiana niczego nie odświeży.',
            en: 'An effect tracks only the keys it actually read on that run. A branch not taken inside an <code>if</code> is not a dependency, so changing it later refreshes nothing.'
          }
        },
        {
          term: { pl: 'computed bez efektów ubocznych', en: 'side-effect-free computed' },
          def: {
            pl: 'Getter <code>computed</code> ma wyłącznie liczyć wartość. Zapisy do stanu, requesty czy logowanie w getterze dają nieprzewidywalną liczbę wywołań i pętle aktualizacji.',
            en: 'A <code>computed</code> getter must only derive a value. Writes to state, requests or logging inside it give an unpredictable number of calls and update loops.'
          }
        },
        {
          term: { pl: 'onScopeDispose', en: 'onScopeDispose' },
          def: {
            pl: 'Hook sprzątający w composable: odpina listenery i wpisy w globalnym stanie przy niszczeniu scope. Bez niego singleton trzyma referencję do odmontowanego komponentu.',
            en: 'The cleanup hook inside a composable: it removes listeners and global-state entries when the scope is disposed. Without it a singleton keeps a reference to an unmounted component.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="v4l4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--err)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Where the connection breaks</text>' +
          '<rect x="20" y="50" width="175" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="107" y="82" fill="var(--text)" font-size="15" text-anchor="middle">reactive state</text>' +
          '<text x="107" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">proxy, tracked</text>' +
          '<line x1="195" y1="90" x2="245" y2="90" stroke="var(--err)" stroke-width="2" marker-end="url(#v4l4a)"/>' +
          '<text x="220" y="76" fill="var(--err)" font-size="13" text-anchor="middle">x</text>' +
          '<rect x="250" y="50" width="175" height="80" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="337" y="82" fill="var(--text)" font-size="15" text-anchor="middle">const { a } = state</text>' +
          '<text x="337" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">plain value, frozen</text>' +
          '<rect x="450" y="50" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="535" y="82" fill="var(--ok)" font-size="15" text-anchor="middle">toRefs(state)</text>' +
          '<text x="535" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">link preserved</text>' +
          '<rect x="20" y="160" width="600" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="192" fill="var(--muted)" font-size="14" text-anchor="middle">watch(state.count, ...) - watching a number, not a source</text>' +
          '<rect x="20" y="226" width="600" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="258" fill="var(--muted)" font-size="14" text-anchor="middle">refs inside arrays and Maps are never unwrapped</text>' +
          '<rect x="20" y="292" width="600" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="324" fill="var(--muted)" font-size="14" text-anchor="middle">array replaced - old proxy still held by a stale closure</text>' +
          '<rect x="20" y="358" width="600" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="388" fill="var(--warn)" font-size="14" text-anchor="middle">rule: pass sources, not values</text>' +
          '<text x="320" y="410" fill="var(--muted)" font-size="13" text-anchor="middle">a getter or a ref, never a snapshot</text>' +
          '</svg>',
        caption: {
          pl: 'Cztery klasyczne miejsca, w których nić między stanem a efektem się urywa - i jedna reguła, która je wszystkie pokrywa.',
          en: 'Four classic places where the thread between state and effect snaps - and one rule that covers them all.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że masz w domu tablicę z listą zakupów. Kiedy mama dopisze na niej "mleko", ty to widzisz, bo patrzysz na tę samą tablicę.</p><p>A teraz wyobraź sobie, że przepisujesz listę na kartkę i wychodzisz z domu. Mama dopisuje "mleko". Twoja kartka o tym nie wie. Nie dlatego, że coś się zepsuło - po prostu kartka to kopia, a nie tablica.</p><p>To jest jedyny błąd, który w Vue popełniają wszyscy, tylko w dziesięciu przebraniach. Za każdym razem gdzieś po drodze robisz kopię wartości i potem dziwisz się, że nie odświeża się sama.</p><p>Lekarstwo jest zawsze to samo: nie noś ze sobą kartki, noś adres tablicy. Wtedy zawsze patrzysz na oryginał.</p>',
          en: '<p>Imagine a shopping list on a board at home. When mum adds "milk", you see it, because you are both looking at the same board.</p><p>Now imagine you copy the list onto a piece of paper and leave the house. Mum adds "milk". Your paper has no idea. Not because something broke - the paper is a copy, not the board.</p><p>That is the one mistake everybody makes in Vue, just wearing ten different costumes. Somewhere along the way you took a copy of a value, and then you are surprised it does not refresh itself.</p><p>The cure is always the same: do not carry the paper, carry the address of the board. Then you are always looking at the original.</p>'
        },
        school: {
          pl: '<p>Prawie wszystkie utracone reaktywności sprowadzają się do jednego: gdzieś odczytałeś wartość i przekazałeś dalej liczbę zamiast źródła.</p><p><strong>Destrukturyzacja.</strong> <code>const { count } = state</code> odczytuje właściwość raz i zapisuje wynik do zwykłej zmiennej. Rozwiązanie: <code>toRefs(state)</code> albo <code>toRef(state, "count")</code>. Od Vue 3.5 destrukturyzacja propsów w <code>script setup</code> jest wyjątkiem - kompilator sam zamienia ją na dostęp do <code>props.x</code>.</p><p><strong>Zły pierwszy argument watch.</strong> <code>watch(state.count, cb)</code> przekazuje liczbę, więc nie ma czego obserwować. Poprawnie: <code>watch(() =&gt; state.count, cb)</code>.</p><p><strong>Refy w tablicach i mapach.</strong> Automatyczne odpakowywanie działa dla właściwości obiektu reaktywnego, nie dla elementów tablicy ani wartości w Map. <code>arr[0].value</code> jest wymagane.</p><p><strong>Podmiana całego obiektu reactive.</strong> <code>state = newState</code> nie działa, bo zmieniasz lokalną zmienną. Albo używaj <code>ref</code> i podmieniaj <code>.value</code>, albo <code>Object.assign(state, newState)</code>.</p><pre><code>const state = reactive({ a: 1 })\nconst { a } = state           // martwe\nconst { a: aRef } = toRefs(state)  // zywe\nwatch(() =&gt; state.a, cb)      // dobrze</code></pre><p><strong>Watchery poza scope.</strong> Watcher utworzony po <code>await</code> w setupie albo w zwykłej funkcji modułowej nie ma właściciela i nigdy nie zostanie zatrzymany. Przy nawigacji między stronami rośnie liczba martwych obserwatorów.</p><p><strong>Głęboki watch po cichu drogi.</strong> <code>deep: true</code> na dużym obiekcie przechodzi całe drzewo przy każdym sprawdzeniu i zbiera zależność na każdym kluczu. Zwykle wystarczy obserwować konkretny getter.</p>',
          en: '<p>Nearly every lost-reactivity bug comes down to the same thing: somewhere you read a value and passed a number downstream instead of a source.</p><p><strong>Destructuring.</strong> <code>const { count } = state</code> reads the property once and stores the result in a plain variable. Fix: <code>toRefs(state)</code> or <code>toRef(state, "count")</code>. Since Vue 3.5 props destructuring in <code>script setup</code> is the exception - the compiler rewrites it back into <code>props.x</code> access.</p><p><strong>Wrong first argument to watch.</strong> <code>watch(state.count, cb)</code> passes a number, so there is nothing to observe. Correct: <code>watch(() =&gt; state.count, cb)</code>.</p><p><strong>Refs in arrays and maps.</strong> Automatic unwrapping applies to properties of a reactive object, not to array elements or Map values. <code>arr[0].value</code> is required.</p><p><strong>Replacing a whole reactive object.</strong> <code>state = newState</code> does nothing useful, because you reassigned a local variable. Either use a <code>ref</code> and swap <code>.value</code>, or <code>Object.assign(state, newState)</code>.</p><pre><code>const state = reactive({ a: 1 })\nconst { a } = state                // dead\nconst { a: aRef } = toRefs(state)  // alive\nwatch(() =&gt; state.a, cb)           // correct</code></pre><p><strong>Watchers outside a scope.</strong> A watcher created after an <code>await</code> in setup, or inside a plain module function, has no owner and is never stopped. Navigating between pages then grows a pile of dead observers.</p><p><strong>Deep watch is quietly expensive.</strong> <code>deep: true</code> on a large object traverses the whole tree on every check and takes a dependency on every key. Watching one specific getter is usually enough.</p>'
        },
        pro: {
          pl: '<p>Lista pułapek, które realnie zjadają czas w dużym kodzie, z przyczyną w środku systemu.</p><p><strong>1. Tożsamość proxy w kolekcjach.</strong> <code>state.selected = row</code>, gdzie <code>row</code> pochodzi z <code>props.rows</code> (surowe), a potem <code>state.rows.indexOf(state.selected)</code> zwraca -1 albo odwrotnie. Instrumentacja tablic ratuje <code>includes</code> i <code>indexOf</code>, ale nie ratuje <code>Set.has</code>, <code>Map.get</code> ani ręcznych porównań w <code>filter</code>. Normalizuj: albo trzymaj identyfikatory zamiast obiektów, albo konsekwentnie <code>toRaw</code> na granicy.</p><p><strong>2. Watcher, który reaguje na własny zapis.</strong> Dwa watchery synchronizujące dwa pola w obie strony dają pętlę zatrzymywaną dopiero limitem stu rekurencji. Rozwiązanie to jeden kierunek prawdy plus <code>computed</code> z setterem, a nie strażnik <code>if (a !== b)</code>, który maskuje problem.</p><p><strong>3. Wyścig w asynchronicznym watcherze.</strong> Szybkie zmiany źródła dają odpowiedzi wracające w losowej kolejności. Od 3.5 jest <code>onWatcherCleanup</code>, wcześniej trzeci argument <code>onCleanup</code>.</p><pre><code>watch(query, async (q) =&gt; {\n  const ac = new AbortController()\n  onWatcherCleanup(() =&gt; ac.abort())\n  results.value = await search(q, { signal: ac.signal })\n})</code></pre><p><strong>4. Wyciek przez globalny stan.</strong> Moduł trzymający <code>reactive(new Map())</code> z instancjami komponentów albo elementami DOM nie zostanie posprzątany, bo nikt nie usuwa wpisów przy unmount. Efekt: rosnące zużycie pamięci w SPA. Użyj <code>WeakMap</code> albo sprzątaj w <code>onScopeDispose</code>.</p><p><strong>5. Computed z efektem ubocznym.</strong> Getter, który zapisuje do innego stanu, uruchomi się nieprzewidywalną liczbę razy - od 3.4 dzięki poziomom zabrudzenia może nie uruchomić się wcale, jeśli wartość i tak wyjdzie ta sama. Computed ma być czysty.</p><p><strong>6. Nieszczelne zależności warunkowe.</strong> <code>flag.value ? a.value : b.value</code> zbiera zależność tylko na jednej gałęzi. To jest poprawne i pożądane, ale zaskakuje, gdy ktoś liczy na obserwację obu wartości.</p><p><strong>7. Reaktywność w SSR.</strong> Na serwerze <code>watch</code> i <code>watchEffect</code> nie są wykonywane poza <code>immediate</code>, a <code>onMounted</code> nie odpala się wcale. Kod, który liczy na watcher do wypełnienia danych przed renderem, zwróci pusty HTML i dopiero doładuje na kliencie - klasyczne mignięcie i różnica w hydratacji.</p><p><strong>Diagnostyka.</strong> Kiedy nie wiadomo, czemu coś się nie odświeża, sprawdź w tej kolejności: czy obiekt jest proxy (<code>isReactive</code>), czy odczyt następuje wewnątrz efektu, czy efekt nadal żyje, i dopiero potem szukaj winy w danych. W dziewięciu przypadkach na dziesięć odpowiedź brzmi: odczyt wypadł poza efekt.</p>',
          en: '<p>The pitfalls that actually burn hours in a large codebase, each with its cause inside the system.</p><p><strong>1. Proxy identity in collections.</strong> <code>state.selected = row</code> where <code>row</code> came from <code>props.rows</code> (raw), and then <code>state.rows.indexOf(state.selected)</code> returns -1, or the reverse. Array instrumentation saves <code>includes</code> and <code>indexOf</code>, but it does not save <code>Set.has</code>, <code>Map.get</code> or hand-written comparisons inside <code>filter</code>. Normalize: either store ids instead of objects, or apply <code>toRaw</code> consistently at the boundary.</p><p><strong>2. A watcher reacting to its own write.</strong> Two watchers syncing two fields both ways create a loop stopped only by the hundred-recursion limit. The fix is a single source of truth plus a writable <code>computed</code>, not an <code>if (a !== b)</code> guard that hides the design problem.</p><p><strong>3. Races in async watchers.</strong> Fast source changes make responses arrive out of order. Since 3.5 there is <code>onWatcherCleanup</code>; before that, the third <code>onCleanup</code> argument.</p><pre><code>watch(query, async (q) =&gt; {\n  const ac = new AbortController()\n  onWatcherCleanup(() =&gt; ac.abort())\n  results.value = await search(q, { signal: ac.signal })\n})</code></pre><p><strong>4. Leaks through global state.</strong> A module holding <code>reactive(new Map())</code> of component instances or DOM nodes is never cleaned, because nothing removes entries on unmount. Result: memory creep in a long-lived SPA. Use a <code>WeakMap</code>, or clean up in <code>onScopeDispose</code>.</p><p><strong>5. Computeds with side effects.</strong> A getter that writes to other state runs an unpredictable number of times - since 3.4 and dirty levels it may not run at all when the value would come out identical. A computed must be pure.</p><p><strong>6. Conditional dependency gaps.</strong> <code>flag.value ? a.value : b.value</code> only takes a dependency on the branch it walked. That is correct and desirable, but it surprises anyone expecting both values to be observed.</p><p><strong>7. Reactivity under SSR.</strong> On the server <code>watch</code> and <code>watchEffect</code> do not run beyond <code>immediate</code>, and <code>onMounted</code> never fires. Code relying on a watcher to fill data before render returns empty HTML and only fills in on the client - the classic flash plus hydration mismatch.</p><p><strong>Triage.</strong> When something refuses to update, check in this order: is the object actually a proxy (<code>isReactive</code>), does the read happen inside an effect, is that effect still alive, and only then blame the data. Nine times out of ten the answer is that the read escaped the effect.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego <code>const { count } = reactive({ count: 0 })</code> gubi reaktywność?',
            en: 'Why does <code>const { count } = reactive({ count: 0 })</code> lose reactivity?'
          },
          options: [
            { pl: 'Bo destrukturyzacja jest w Vue zabroniona', en: 'Because destructuring is forbidden in Vue' },
            { pl: 'Bo odczyt następuje raz i do zmiennej trafia zwykła liczba, bez połączenia z proxy', en: 'Because the read happens once and a plain number lands in the variable, with no link to the proxy' },
            { pl: 'Bo reactive nie działa na liczbach', en: 'Because reactive does not work on numbers' },
            { pl: 'Bo brakuje .value', en: 'Because .value is missing' }
          ],
          correct: 1,
          explain: {
            pl: 'Proxy przechwytuje operację odczytu, a nie wartość. Po destrukturyzacji nie ma już żadnego odczytu do przechwycenia - stąd toRefs.',
            en: 'A proxy intercepts the read operation, not the value. After destructuring there is no read left to intercept, hence toRefs.'
          }
        },
        {
          q: {
            pl: 'Który zapis poprawnie obserwuje pole obiektu reaktywnego?',
            en: 'Which form correctly watches a field of a reactive object?'
          },
          options: [
            { pl: 'watch(state.count, cb)', en: 'watch(state.count, cb)' },
            { pl: 'watch("count", cb)', en: 'watch("count", cb)' },
            { pl: 'watch(() => state.count, cb)', en: 'watch(() => state.count, cb)' },
            { pl: 'watch(state, cb, { shallow: true })', en: 'watch(state, cb, { shallow: true })' }
          ],
          correct: 2,
          explain: {
            pl: 'Watch potrzebuje źródła, które może odczytać wewnątrz efektu: refa, obiektu reaktywnego albo gettera. Sama wartość nic mu nie mówi.',
            en: 'Watch needs a source it can read inside an effect: a ref, a reactive object, or a getter. A bare value tells it nothing.'
          }
        },
        {
          q: {
            pl: 'Watcher robi zapytanie sieciowe przy każdej zmianie zapytania. Jak uniknąć wyścigu odpowiedzi?',
            en: 'A watcher fires a network request on every query change. How do you avoid a response race?'
          },
          options: [
            { pl: 'Ustawić flush sync', en: 'Set flush to sync' },
            { pl: 'Anulować poprzednie żądanie w onWatcherCleanup lub onCleanup', en: 'Abort the previous request in onWatcherCleanup or onCleanup' },
            { pl: 'Dodać deep true', en: 'Add deep true' },
            { pl: 'Zamienić watch na computed', en: 'Turn the watch into a computed' }
          ],
          correct: 1,
          explain: {
            pl: 'Cleanup jest wywoływany tuż przed kolejnym przebiegiem i przy zatrzymaniu watchera - to właściwe miejsce na AbortController.',
            en: 'Cleanup runs right before the next invocation and when the watcher stops - exactly the right place for an AbortController.'
          }
        },
        {
          q: {
            pl: 'Tabela filtruje wiersze przez <code>rows.indexOf(selected)</code> i czasem zwraca -1. Najbardziej prawdopodobna przyczyna?',
            en: 'A table filters rows with <code>rows.indexOf(selected)</code> and sometimes gets -1. Most likely cause?'
          },
          options: [
            { pl: 'Tablica jest za duża dla indexOf', en: 'The array is too large for indexOf' },
            { pl: 'Mieszasz surowe obiekty z ich proxy - jedna strona porównania jest opakowana, druga nie', en: 'You mix raw objects with their proxies - one side of the comparison is wrapped, the other is not' },
            { pl: 'indexOf nie działa na obiektach reaktywnych', en: 'indexOf does not work on reactive objects' },
            { pl: 'Brakuje klucza key w v-for', en: 'The v-for key attribute is missing' }
          ],
          correct: 1,
          explain: {
            pl: 'Instrumentacja tablic sprawdza obie wersje, ale tylko gdy szukana wartość przechodzi przez proxy tablicy. Gdy referencje pochodzą z różnych warstw, porównania po tożsamości zawodzą - trzymaj identyfikatory albo normalizuj przez toRaw.',
            en: 'Array instrumentation checks both versions, but only when the search value goes through the array proxy. When references come from different layers, identity comparisons fail - store ids or normalize with toRaw.'
          }
        }
      ]
    },

    // ------------------------------------------------------------------ 5
    {
      id: 'render-functions-and-jsx',
      title: {
        pl: 'Render functions i JSX',
        en: 'Render functions and JSX'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'render function', en: 'render function' },
          def: {
            pl: 'Funkcja zwracająca vnode zbudowane przez <code>h()</code> zamiast szablonu. Daje pełną moc JavaScriptu przy budowaniu drzewa, kosztem optymalizacji kompilatora.',
            en: 'A function returning vnodes built with <code>h()</code> instead of a template. It gives you the full power of JavaScript over the tree, at the cost of compiler optimisations.'
          }
        },
        {
          term: { pl: 'patchFlag i block tree', en: 'patchFlag and block tree' },
          def: {
            pl: 'Metadane generowane przez kompilator szablonów: znacznik, co w vnode jest dynamiczne, plus płaska lista dynamicznych dzieci. Ręczne <code>h()</code> ich nie ma, więc idzie pełnym diffem.',
            en: 'Metadata the template compiler emits: a marker of what is dynamic in a vnode plus a flat list of dynamic children. Hand-written <code>h()</code> has neither, so it takes the full diff path.'
          }
        },
        {
          term: { pl: 'mergeProps', en: 'mergeProps' },
          def: {
            pl: 'Jedyny poprawny sposób łączenia <code>class</code>, <code>style</code> i handlerów zdarzeń. Zwykły spread nadpisze <code>onClick</code> rodzica zamiast dołożyć go do istniejącego.',
            en: 'The only correct way to combine <code>class</code>, <code>style</code> and event handlers. A plain spread overwrites the parent <code>onClick</code> instead of adding to it.'
          }
        },
        {
          term: { pl: 'inheritAttrs: false', en: 'inheritAttrs: false' },
          def: {
            pl: 'Wyłącza automatyczne doklejanie atrybutów do korzenia komponentu, żeby rozmieścić je ręcznie przez <code>attrs</code> - podstawa wrapperów w design systemie.',
            en: 'Turns off automatic attribute fallthrough to the root element so you can place <code>attrs</code> yourself - the foundation of design-system wrappers.'
          }
        },
        {
          term: { pl: 'komponent funkcyjny', en: 'functional component' },
          def: {
            pl: 'Zwykła funkcja <code>(props, { slots, emit, attrs })</code> zwracająca vnode, bez instancji i bez hooków cyklu życia. Tania warstwa prezentacyjna, ale bez template refów i z ubogim devtools.',
            en: 'A plain <code>(props, { slots, emit, attrs })</code> function returning a vnode, with no instance and no lifecycle hooks. A cheap presentational layer, but no template refs and thin devtools.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="v4l5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Two roads to the same vnode tree</text>' +
          '<rect x="20" y="50" width="270" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="80" fill="var(--text)" font-size="15" text-anchor="middle">template</text>' +
          '<text x="155" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">compiled at build time</text>' +
          '<rect x="350" y="50" width="270" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="485" y="80" fill="var(--text)" font-size="15" text-anchor="middle">h() or JSX</text>' +
          '<text x="485" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">written by hand</text>' +
          '<line x1="155" y1="120" x2="155" y2="165" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l5a)"/>' +
          '<line x1="485" y1="120" x2="485" y2="245" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l5a)"/>' +
          '<rect x="20" y="170" width="270" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="155" y="200" fill="var(--ok)" font-size="14" text-anchor="middle">patch flags + blocks</text>' +
          '<text x="155" y="222" fill="var(--muted)" font-size="13" text-anchor="middle">static parts hoisted</text>' +
          '<text x="155" y="242" fill="var(--muted)" font-size="13" text-anchor="middle">diff only dynamic nodes</text>' +
          '<line x1="155" y1="250" x2="155" y2="290" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l5a)"/>' +
          '<rect x="350" y="250" width="270" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="485" y="286" fill="var(--warn)" font-size="14" text-anchor="middle">full children diff</text>' +
          '<rect x="20" y="295" width="270" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="331" fill="var(--text)" font-size="14" text-anchor="middle">vnode tree</text>' +
          '<line x1="350" y1="325" x2="295" y2="325" stroke="var(--muted)" stroke-width="2" marker-end="url(#v4l5a)"/>' +
          '<rect x="20" y="370" width="600" height="45" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="398" fill="var(--muted)" font-size="13" text-anchor="middle">same runtime, different amount of information for the diff</text>' +
          '</svg>',
        caption: {
          pl: 'Szablon i render function produkują to samo drzewo vnode, ale tylko kompilator dokłada patch flags, które pozwalają pominąć statyczne fragmenty przy diffowaniu.',
          en: 'Templates and render functions produce the same vnode tree, but only the compiler attaches patch flags that let the diff skip static parts.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że zamawiasz tort. Możesz przynieść cukiernikowi gotowy rysunek: dwa piętra, różowy lukier, napis na górze. Cukiernik zna się na rzeczy i sam wie, co da się przygotować wcześniej, a co trzeba zrobić na ostatnią chwilę.</p><p>Albo możesz wejść do kuchni i zrobić tort sam, warstwa po warstwie. Masz pełną swobodę - możesz zrobić kształt, którego nie ma na żadnym rysunku. Ale cukiernik nie wie już, co planujesz, więc nie może ci niczego przygotować z wyprzedzeniem.</p><p>Szablon w Vue to rysunek. Render function to wejście do kuchni. Oba dają tort. Pierwszy jest szybszy, bo ktoś mądrzejszy planuje za ciebie. Drugi jest potrzebny wtedy, gdy chcesz coś, czego rysunek po prostu nie umie opisać.</p>',
          en: '<p>Imagine ordering a cake. You can hand the baker a drawing: two tiers, pink icing, a message on top. The baker knows the trade and works out what can be prepared in advance and what has to be done at the last minute.</p><p>Or you can walk into the kitchen and build the cake yourself, layer by layer. Total freedom - you can make a shape no drawing describes. But the baker no longer knows your plan, so nothing can be prepared ahead of time.</p><p>A Vue template is the drawing. A render function is walking into the kitchen. Both give you a cake. The first is faster, because someone smarter plans for you. The second is what you need when you want something a drawing simply cannot describe.</p>'
        },
        school: {
          pl: '<p>Szablon nie jest interpretowany w przeglądarce. Kompilator zamienia go w funkcję render zwracającą drzewo vnode. Możesz napisać tę funkcję ręcznie przez <code>h()</code> albo w JSX, jeśli dodasz <code>@vitejs/plugin-vue-jsx</code>.</p><pre><code>import { h, ref } from "vue"\n\nexport default {\n  setup() {\n    const n = ref(0)\n    return () =&gt; h("button", { onClick: () =&gt; n.value++ }, "count " + n.value)\n  },\n}</code></pre><p>Zwrócenie funkcji z <code>setup</code> to najczystszy sposób: zmienne z setupu są w domknięciu, a każde wywołanie funkcji jest kolejnym przebiegiem efektu renderującego.</p><p>Kiedy ręczny render wygrywa:</p><ul><li>Komponent, którego struktura zależy od danych w sposób nie do zapisania w <code>v-if</code>, na przykład rekurencyjne drzewo albo generator tabeli z kolumn opisanych obiektem.</li><li>Komponenty renderless i cienkie wrappery, które tylko przekazują sloty dalej.</li><li>Biblioteki komponentów, gdzie chcesz programowo scalać propsy i atrybuty.</li></ul><p>Czego się traci: optymalizacji kompilatora. Szablon dostaje patch flags (informację, że w tym węźle zmienia się tylko klasa albo tylko tekst), statyczne fragmenty są wyciągane poza render, a całe poddrzewa bez dynamiki są pomijane w diffie. Ręczny <code>h()</code> nie niesie tych informacji, więc runtime porównuje dzieci w pełni.</p><p>Sloty w render functions to funkcje, nie tablice. <code>h(Comp, null, { default: () =&gt; [...] })</code>. Przekazanie tablicy zamiast funkcji działa, ale wypada z optymalizacji i psuje śledzenie zależności, bo zawartość slotu zostaje odczytana w zakresie rodzica.</p>',
          en: '<p>A template is never interpreted in the browser. The compiler turns it into a render function returning a vnode tree. You can write that function by hand with <code>h()</code>, or in JSX if you add <code>@vitejs/plugin-vue-jsx</code>.</p><pre><code>import { h, ref } from "vue"\n\nexport default {\n  setup() {\n    const n = ref(0)\n    return () =&gt; h("button", { onClick: () =&gt; n.value++ }, "count " + n.value)\n  },\n}</code></pre><p>Returning a function from <code>setup</code> is the cleanest form: setup variables live in the closure, and every call of that function is another run of the render effect.</p><p>When a hand-written render wins:</p><ul><li>A component whose structure depends on data in a way <code>v-if</code> cannot express - a recursive tree, or a table generated from a column descriptor object.</li><li>Renderless components and thin wrappers that only forward slots.</li><li>Component libraries where you want to merge props and attributes programmatically.</li></ul><p>What you give up: compiler optimizations. A template gets patch flags (a note that only the class or only the text changes on this node), static fragments are hoisted out of render, and fully static subtrees are skipped during diffing. Hand-written <code>h()</code> carries none of that, so the runtime diffs children in full.</p><p>Slots in render functions are functions, not arrays: <code>h(Comp, null, { default: () =&gt; [...] })</code>. Passing an array works, but it opts out of optimizations and skews dependency tracking, because the slot content is read in the parent scope.</p>'
        },
        pro: {
          pl: '<p><strong>Co dokładnie tracisz.</strong> Kompilator produkuje trzy rzeczy, których <code>h()</code> nie ma: <code>patchFlag</code> na vnode, tablicę <code>dynamicChildren</code> (block tree) i hoisting statycznych vnode oraz obiektów propsów. Dzięki block tree runtime pomija rekurencję po statycznej strukturze i patchuje płaską listę dynamicznych węzłów. Na typowym, mocno statycznym poddrzewie różnica w czasie aktualizacji potrafi być kilkukrotna. Ręczny render zawsze idzie ścieżką pełnego diffowania dzieci, z heurystyką keyed lub unkeyed.</p><p>Wniosek praktyczny: render function nie jest optymalizacją. Sięgasz po nią dla wyrazistości, nie dla wydajności. Wyjątek to sytuacja, w której ręcznie cache-ujesz vnode między przebiegami - wtedy identyczna referencja vnode jest po prostu pomijana w patchu.</p><pre><code>// wrapper design-systemowy: sloty dalej, atrybuty scalone\nexport default defineComponent({\n  name: "DsField",\n  inheritAttrs: false,\n  props: { invalid: Boolean },\n  setup(props, { slots, attrs }) {\n    return () =&gt; h("div", mergeProps(attrs, {\n      class: ["ds-field", { "-invalid": props.invalid }],\n    }), [\n      slots.label?.(),\n      h("div", { class: "ds-field__control" }, slots.default?.({ invalid: props.invalid })),\n      props.invalid &amp;&amp; slots.error?.(),\n    ])\n  },\n})</code></pre><p><strong>Pułapki.</strong> <code>slots.default?.()</code> musi być wywołane w trakcie renderu dziecka, nie wcześniej - inaczej zależności ze slotu zostaną przypisane rodzicowi i dziecko przestanie się odświeżać samodzielnie. Sloty bez klucza w dynamicznej pozycji wymagają <code>key</code> przy warunkowym renderowaniu, tak samo jak w szablonie. <code>mergeProps</code> jest jedynym poprawnym sposobem łączenia klas, styli i handlerów - ręczny spread nadpisze <code>onClick</code> zamiast go dołożyć.</p><p><strong>JSX w Vue kontra React.</strong> Wygląda podobnie, semantyka jest inna: refy nie są odpakowywane, więc piszesz <code>{n.value}</code>; propsy i atrybuty idą jednym obiektem, a runtime rozdziela je po deklaracji <code>props</code>; zdarzenia to <code>onClick</code>, ale modyfikatory dokładasz przez <code>withModifiers</code>; plugin obsługuje też <code>v-model</code> jako cukier. Komponenty funkcyjne to zwykła funkcja <code>(props, { slots, emit, attrs }) =&gt; vnode</code> z opcjonalnymi <code>props</code> i <code>emits</code> na funkcji.</p><p><strong>Kiedy to naprawdę stosować w bibliotece komponentów.</strong> Dobre kandydatury: <code>DsTable</code> generowana z definicji kolumn, komponenty rekurencyjne (<code>DsTreeItem</code>), polimorficzne wrappery z propem <code>as</code>, oraz warstwy przekazujące sloty i atrybuty w dół. Wszystko inne pisz w szablonie - dostajesz optymalizacje, czytelniejsze diffy w code review i działające narzędzia devtools, które przy ręcznym renderze pokazują znacznie mniej.</p>',
          en: '<p><strong>What you actually lose.</strong> The compiler produces three things <code>h()</code> has no way to supply: a <code>patchFlag</code> on the vnode, a <code>dynamicChildren</code> array (the block tree), and hoisting of static vnodes and props objects. Thanks to the block tree the runtime skips recursion over static structure and patches a flat list of dynamic nodes instead. On a typical mostly-static subtree the update time difference can be several times over. A hand-written render always takes the full children-diff path, with the keyed or unkeyed heuristic.</p><p>Practical conclusion: a render function is not an optimization. You reach for it for expressiveness, not speed. The exception is manually caching vnodes across runs - an identical vnode reference is simply skipped during patching.</p><pre><code>// design-system wrapper: forward slots, merge attrs\nexport default defineComponent({\n  name: "DsField",\n  inheritAttrs: false,\n  props: { invalid: Boolean },\n  setup(props, { slots, attrs }) {\n    return () =&gt; h("div", mergeProps(attrs, {\n      class: ["ds-field", { "-invalid": props.invalid }],\n    }), [\n      slots.label?.(),\n      h("div", { class: "ds-field__control" }, slots.default?.({ invalid: props.invalid })),\n      props.invalid &amp;&amp; slots.error?.(),\n    ])\n  },\n})</code></pre><p><strong>Traps.</strong> <code>slots.default?.()</code> must be invoked during the child render, not earlier - otherwise dependencies read inside the slot are attributed to the parent and the child stops updating on its own. Slots rendered conditionally in a dynamic position need a <code>key</code>, exactly as in a template. <code>mergeProps</code> is the only correct way to combine classes, styles and handlers - a manual spread overwrites <code>onClick</code> instead of chaining it.</p><p><strong>Vue JSX versus React JSX.</strong> It looks similar and behaves differently: refs are not unwrapped, so you write <code>{n.value}</code>; props and attributes arrive in one object and the runtime splits them by the <code>props</code> declaration; events are <code>onClick</code>, but modifiers come from <code>withModifiers</code>; the plugin also supports <code>v-model</code> as sugar. A functional component is a plain <code>(props, { slots, emit, attrs }) =&gt; vnode</code> with optional <code>props</code> and <code>emits</code> attached to the function.</p><p><strong>When to really use this in a component library.</strong> Good candidates: a <code>DsTable</code> generated from column definitions, recursive components (<code>DsTreeItem</code>), polymorphic wrappers with an <code>as</code> prop, and pass-through layers forwarding slots and attributes. Write everything else as a template - you get the optimizations, readable diffs in code review, and devtools that show far more than they do for a hand-written render.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co kompilator szablonów dokłada, czego ręczne h() nie ma?',
            en: 'What does the template compiler add that a hand-written h() lacks?'
          },
          options: [
            { pl: 'Patch flags i block tree, dzięki którym diff pomija statyczne części', en: 'Patch flags and a block tree, letting the diff skip static parts' },
            { pl: 'Automatyczne memoizowanie komponentów potomnych', en: 'Automatic memoization of child components' },
            { pl: 'Silniejsze typowanie propsów w czasie działania', en: 'Stronger runtime typing of props' },
            { pl: 'Kompresję drzewa vnode', en: 'Compression of the vnode tree' }
          ],
          correct: 0,
          explain: {
            pl: 'Kompilator wie z góry, co jest dynamiczne, i zapisuje to na vnode. Runtime pisany ręcznie musi porównywać wszystko.',
            en: 'The compiler knows upfront which parts are dynamic and records that on the vnode. A hand-written tree forces the runtime to compare everything.'
          }
        },
        {
          q: {
            pl: 'Jak poprawnie przekazać named slot w render function?',
            en: 'How do you correctly pass a named slot in a render function?'
          },
          options: [
            { pl: 'h(Comp, null, [vnodeA, vnodeB])', en: 'h(Comp, null, [vnodeA, vnodeB])' },
            { pl: 'h(Comp, { slots: [vnodeA] })', en: 'h(Comp, { slots: [vnodeA] })' },
            { pl: 'h(Comp, null, { header: () => vnodeA })', en: 'h(Comp, null, { header: () => vnodeA })' },
            { pl: 'h(Comp, { header: vnodeA })', en: 'h(Comp, { header: vnodeA })' }
          ],
          correct: 2,
          explain: {
            pl: 'Sloty to obiekt funkcji zwracających vnode. Funkcja jest istotna: gwarantuje, że zawartość zostanie odczytana w zakresie renderu dziecka.',
            en: 'Slots are an object of functions returning vnodes. The function matters: it guarantees the content is read inside the child render scope.'
          }
        },
        {
          q: {
            pl: 'Który przypadek najlepiej uzasadnia napisanie komponentu jako render function?',
            en: 'Which case best justifies writing a component as a render function?'
          },
          options: [
            { pl: 'Formularz logowania z dwoma polami', en: 'A login form with two fields' },
            { pl: 'Komponent rekurencyjnego drzewa generowany z opisu danych', en: 'A recursive tree component generated from a data descriptor' },
            { pl: 'Statyczna stopka strony', en: 'A static page footer' },
            { pl: 'Lista z v-for po tablicy stringów', en: 'A list with v-for over an array of strings' }
          ],
          correct: 1,
          explain: {
            pl: 'Struktura zależna od danych w sposób nie do wyrażenia dyrektywami to klasyczne uzasadnienie. Proste, statyczne widoki zyskują na szablonie.',
            en: 'Structure driven by data in a way directives cannot express is the classic justification. Simple static views gain from a template.'
          }
        },
        {
          q: {
            pl: 'Wrapper w design systemie robi <code>h("div", { ...attrs, onClick: handle }, ...)</code>. Co pójdzie źle?',
            en: 'A design-system wrapper does <code>h("div", { ...attrs, onClick: handle }, ...)</code>. What goes wrong?'
          },
          options: [
            { pl: 'Nic, spread jest równoważny mergeProps', en: 'Nothing, spread is equivalent to mergeProps' },
            { pl: 'Handler z attrs zostanie nadpisany zamiast dołożony, a klasy i style się nie połączą', en: 'The handler from attrs is overwritten instead of chained, and classes and styles do not merge' },
            { pl: 'Vue rzuci błąd o duplikacie propsa', en: 'Vue throws a duplicate prop error' },
            { pl: 'Komponent straci reaktywność propsów', en: 'The component loses prop reactivity' }
          ],
          correct: 1,
          explain: {
            pl: 'mergeProps łączy tablice klas, obiekty styli i listy handlerów. Zwykły spread po prostu nadpisuje klucz, więc onClick od konsumenta znika.',
            en: 'mergeProps concatenates class arrays, style objects and handler lists. A plain spread just overwrites the key, so the consumer onClick disappears.'
          }
        }
      ]
    }
  ]
};
