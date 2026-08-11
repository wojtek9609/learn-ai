// Track react - Module 02 - Hooks vs Composition API
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema", "v4").
// Audience: senior Vue developer moving to React. Every lesson is taught
// side-by-side with the Vue 3 equivalent.

// --- small local helpers so the interactive frames share one exact layout ---

function boxL1(x, y, w, label, sub, active) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="72" rx="12" fill="var(--surface)" ' +
    'stroke="' + (active ? 'var(--accent)' : 'var(--border)') + '" stroke-width="' + (active ? 3 : 2) + '"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 30) + '" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 52) + '" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text>';
}

function frameL1(activeReact, activeVue, bottom) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    '<defs><marker id="h1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
    '<text x="20" y="28" font-size="14" fill="var(--accent)">React</text>' +
    boxL1(20, 40, 170, 'setCount(1)', 'event handler', activeReact === 0) +
    '<line x1="196" y1="76" x2="219" y2="76" stroke="var(--muted)" stroke-width="2" marker-end="url(#h1a)"/>' +
    boxL1(225, 40, 170, 'component re-runs', 'whole function', activeReact === 1) +
    '<line x1="401" y1="76" x2="424" y2="76" stroke="var(--muted)" stroke-width="2" marker-end="url(#h1a)"/>' +
    boxL1(430, 40, 190, 'diff and commit', 'React patches DOM', activeReact === 2) +
    '<text x="20" y="180" font-size="14" fill="var(--accent2)">Vue</text>' +
    boxL1(20, 192, 170, 'count.value = 1', 'same click', activeVue === 0) +
    '<line x1="196" y1="228" x2="219" y2="228" stroke="var(--muted)" stroke-width="2" marker-end="url(#h1a)"/>' +
    boxL1(225, 192, 170, 'one effect wakes up', 'the one that read it', activeVue === 1) +
    '<line x1="401" y1="228" x2="424" y2="228" stroke="var(--muted)" stroke-width="2" marker-end="url(#h1a)"/>' +
    boxL1(430, 192, 190, 'text node updated', 'nothing else runs', activeVue === 2) +
    '<line x1="20" y1="320" x2="620" y2="320" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="320" y="352" text-anchor="middle" font-size="15" fill="var(--text)">' + bottom + '</text>' +
    '</svg>';
}

function stationL2(x, label, active) {
  return '<rect x="' + x + '" y="86" width="106" height="64" rx="12" fill="var(--surface)" ' +
    'stroke="' + (active ? 'var(--accent)' : 'var(--border)') + '" stroke-width="' + (active ? 3 : 2) + '"/>' +
    '<text x="' + (x + 53) + '" y="124" text-anchor="middle" font-size="13" fill="' + (active ? 'var(--text)' : 'var(--muted)') + '">' + label + '</text>';
}

function frameL2(active, vueLine1, vueLine2, bottom) {
  var xs = [20, 146, 272, 398, 524];
  var names = ['render', 'paint', 'cleanup', 'effect', 'unmount'];
  var s = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    '<text x="20" y="40" font-size="15" fill="var(--accent)">React: useEffect timeline</text>' +
    '<line x1="20" y1="68" x2="620" y2="68" stroke="var(--border)" stroke-width="2"/>';
  for (var i = 0; i < xs.length; i++) {
    s += stationL2(xs[i], names[i], active === i);
    s += '<circle cx="' + (xs[i] + 53) + '" cy="68" r="' + (active === i ? 8 : 5) + '" fill="' +
      (active === i ? 'var(--accent)' : 'var(--border)') + '"/>';
  }
  s += '<rect x="20" y="196" width="600" height="96" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
    '<text x="40" y="226" font-size="14" fill="var(--accent2)">Vue at this moment</text>' +
    '<text x="40" y="252" font-size="13" fill="var(--text)">' + vueLine1 + '</text>' +
    '<text x="40" y="274" font-size="13" fill="var(--muted)">' + vueLine2 + '</text>' +
    '<text x="320" y="336" text-anchor="middle" font-size="15" fill="var(--text)">' + bottom + '</text>' +
    '</svg>';
  return s;
}

export default {
  id: 'hooks-vs-composition',
  order: 2,
  icon: '🪝',
  title: {
    pl: 'Hooki kontra Composition API',
    en: 'Hooks vs the Composition API'
  },
  description: {
    pl: 'useState, useEffect, useMemo, useCallback, useRef i własne hooki - każdy postawiony obok swojego odpowiednika z Vue 3: ref, watch, computed, composable i template ref.',
    en: 'useState, useEffect, useMemo, useCallback, useRef and custom hooks - each one placed next to its Vue 3 counterpart: ref, watch, computed, composables and template refs.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'usestate-vs-ref',
      title: {
        pl: 'useState kontra ref: migawka zamiast pudełka',
        en: 'useState vs ref: a snapshot, not a box'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'useState', en: 'useState' },
          def: {
            pl: 'Indeksowany slot na liscie hooków fibera, nie pudełko z wartością. Setter jedynie planuje aktualizację - bieżący render nadal widzi starą migawkę.',
            en: 'An indexed slot in the fiber hook list, not a box holding a value. The setter only schedules an update - the current render still sees the old snapshot.'
          }
        },
        {
          term: { pl: 'Bail-out przez Object.is', en: 'Object.is bail-out' },
          def: {
            pl: 'Jeśli podasz wartość identyczną referencyjnie z obecną, React pomija render. Dlatego <code>items.push(x); setItems(items)</code> nie robi nic.',
            en: 'If you pass a value referentially identical to the current one, React skips the render. That is why <code>items.push(x); setItems(items)</code> does nothing.'
          }
        },
        {
          term: { pl: 'Stale closure', en: 'Stale closure' },
          def: {
            pl: 'Domknięcie zamrożone w danym renderze, które widzi nieaktualny stan - typowo w <code>setInterval</code> albo w handlerze WebSocketa. W Vue nie istnieje, bo <code>.value</code> zawsze czyta bieżące pudełko.',
            en: 'A closure frozen in one render that sees stale state - typically inside <code>setInterval</code> or a WebSocket handler. It does not exist in Vue, where <code>.value</code> always reads the current box.'
          }
        },
        {
          term: { pl: 'Funkcyjna aktualizacja', en: 'Functional updater' },
          def: {
            pl: 'Postać <code>setCount(prev =&gt; prev + 1)</code>, która liczy z najświeższej wartości zamiast z domknięcia. Lekarstwo na trzy setery pod rząd i na stale closure.',
            en: 'The <code>setCount(prev =&gt; prev + 1)</code> form that computes from the freshest value instead of a closure. The cure for three setters in a row and for stale closures.'
          }
        },
        {
          term: { pl: 'useReducer', en: 'useReducer' },
          def: {
            pl: 'Jedna funkcja przejścia dla kilku powiązanych pól plus stabilna tożsamość <code>dispatch</code>, której nigdy nie trzeba memoizować. Najbliższy odpowiednik akcji Pinii w skali komponentu.',
            en: 'One transition function for several related fields plus a stable <code>dispatch</code> identity you never memoise. The closest thing to a Pinia action at component scope.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--accent2)">Vue: one box, mutated in place</text>' +
          '<rect x="20" y="46" width="180" height="76" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="110" y="76" text-anchor="middle" font-size="14" fill="var(--text)">count = ref(0)</text>' +
          '<text x="110" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">setup runs once</text>' +
          '<line x1="206" y1="84" x2="244" y2="84" stroke="var(--muted)" stroke-width="2" marker-end="url(#d1a)"/>' +
          '<rect x="250" y="46" width="180" height="76" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="340" y="76" text-anchor="middle" font-size="14" fill="var(--text)">count.value = 1</text>' +
          '<text x="340" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">same object, new value</text>' +
          '<line x1="436" y1="84" x2="474" y2="84" stroke="var(--muted)" stroke-width="2" marker-end="url(#d1a)"/>' +
          '<rect x="480" y="46" width="140" height="76" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="550" y="84" text-anchor="middle" font-size="14" fill="var(--text)">patch one node</text>' +
          '<line x1="20" y1="160" x2="620" y2="160" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="200" font-size="15" fill="var(--accent)">React: a new snapshot per render</text>' +
          '<rect x="20" y="216" width="180" height="76" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="110" y="246" text-anchor="middle" font-size="14" fill="var(--text)">count = 0</text>' +
          '<text x="110" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">render #1 const</text>' +
          '<line x1="206" y1="254" x2="244" y2="254" stroke="var(--muted)" stroke-width="2" marker-end="url(#d1a)"/>' +
          '<rect x="250" y="216" width="180" height="76" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="340" y="246" text-anchor="middle" font-size="14" fill="var(--text)">setCount(1)</text>' +
          '<text x="340" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">request a new render</text>' +
          '<line x1="436" y1="254" x2="474" y2="254" stroke="var(--muted)" stroke-width="2" marker-end="url(#d1a)"/>' +
          '<rect x="480" y="216" width="140" height="76" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="550" y="246" text-anchor="middle" font-size="14" fill="var(--text)">count = 1</text>' +
          '<text x="550" y="270" text-anchor="middle" font-size="13" fill="var(--muted)">render #2 const</text>' +
          '<text x="320" y="350" text-anchor="middle" font-size="14" fill="var(--warn)">render #1 still sees 0 forever - that is the stale closure</text>' +
          '<text x="320" y="386" text-anchor="middle" font-size="14" fill="var(--muted)">Vue mutates state, React replaces it</text>' +
          '</svg>',
        caption: {
          pl: 'Vue trzyma stan w jednym pudełku i podmienia jego zawartość. React tworzy nową migawkę wartości przy każdym renderze, a stara migawka zostaje zamrożona na zawsze.',
          en: 'Vue keeps state in one box and swaps its contents. React creates a fresh snapshot of the value on every render, and the old snapshot stays frozen forever.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jedno kliknięcie, dwa modele aktualizacji - przewiń krok po kroku i zobacz, ile pracy wykonuje każda z bibliotek.',
          en: 'One click, two update models - step through it and see how much work each library actually does.'
        },
        frames: [
          {
            svg: frameL1(0, 0, 'The same click starts both pipelines'),
            label: { pl: 'Klik', en: 'The click' },
            note: {
              pl: 'W Reactie wołasz setter, w Vue przypisujesz do .value. Do tego momentu obie biblioteki wyglądają tak samo.',
              en: 'In React you call a setter, in Vue you assign to .value. Up to this point both libraries look identical.'
            }
          },
          {
            svg: frameL1(1, -1, 'React re-runs the entire component function'),
            label: { pl: 'React: cały komponent od nowa', en: 'React: whole component re-runs' },
            note: {
              pl: 'Ciało funkcji komponentu wykonuje się w całości: nowe zmienne, nowe funkcje, nowy JSX. Hooki po prostu odczytują swoje sloty w tej samej kolejności.',
              en: 'The component body runs top to bottom again: new variables, new functions, new JSX. Hooks just read their slots in the same order.'
            }
          },
          {
            svg: frameL1(-1, 1, 'Vue wakes only the effect that read count'),
            label: { pl: 'Vue: budzi się jeden efekt', en: 'Vue: one effect wakes up' },
            note: {
              pl: 'Proxy zapamiętało, kto czytał count. Setup się nie powtarza - odpala się wyłącznie efekt renderujący ten fragment szablonu.',
              en: 'The proxy remembered who read count. setup never runs again - only the render effect for that piece of template fires.'
            }
          },
          {
            svg: frameL1(2, -1, 'React compares the new tree with the old one'),
            label: { pl: 'React: diff i commit', en: 'React: diff and commit' },
            note: {
              pl: 'React porównuje nowe drzewo elementów ze starym i dotyka tylko tych węzłów DOM, które faktycznie się zmieniły.',
              en: 'React compares the new element tree with the previous one and touches only the DOM nodes that really changed.'
            }
          },
          {
            svg: frameL1(2, 2, 'Same pixels, very different amount of work'),
            label: { pl: 'Ten sam wynik', en: 'Same result' },
            note: {
              pl: 'Efekt wizualny jest identyczny. Vue zapłaciło za śledzenie zależności, React za ponowne wykonanie funkcji - i dlatego w Reactie tak liczy się to, co robisz w ciele komponentu.',
              en: 'The visual result is identical. Vue paid for dependency tracking, React paid by re-running a function - which is why what you put in a React component body matters so much.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dwa sposoby pokazania komuś, ile masz cukierków.</p>' +
            '<p>Pierwszy to tablica na ścianie. Napisana jest na niej trójka. Zjadasz cukierka, ścierasz trójkę, piszesz dwójkę. Tablica cały czas jest ta sama, zmienia się tylko cyfra na niej. Tak działa Vue: masz jedno pudełko, wchodzisz do niego i podmieniasz zawartość.</p>' +
            '<p>Drugi sposób to robienie zdjęć. Trzymasz trzy cukierki, pstryk, jest zdjęcie. Zjadasz jednego i nie poprawiasz starego zdjęcia, tylko robisz nowe. Na starym dalej są trzy cukierki i to jest zupełnie w porządku, bo ono opowiada o przeszłości. Tak właśnie działa React: przy każdej zmianie powstaje nowe zdjęcie całego komponentu.</p>' +
            '<p>Dlatego w Vue mówisz "zmień tę liczbę", a w Reactie mówisz "zrób nowe zdjęcie, na którym jest dwójka". Wygląda to na więcej pracy, ale za to nigdy nie pomylisz, które zdjęcie jest z którego momentu.</p>',
          en: '<p>Imagine two ways of showing someone how many sweets you have.</p>' +
            '<p>The first is a whiteboard on the wall. It says three. You eat one, wipe out the three, write a two. The board is always the same board, only the number on it changes. That is Vue: you have one box and you swap what is inside it.</p>' +
            '<p>The second way is taking photos. You hold three sweets, click, there is a photo. You eat one and you do not correct the old photo - you take a new one. The old photo still shows three sweets and that is fine, because it describes the past. That is React: every change produces a brand new photo of the whole component.</p>' +
            '<p>So in Vue you say "change that number", and in React you say "take a new photo where the number is two". It looks like more work, but you can never mix up which photo belongs to which moment.</p>'
        },
        school: {
          pl: '<p>W Vue stan mieszka w obiekcie. <code>ref(0)</code> zwraca pudełko z polem <code>.value</code>, a funkcja <code>setup</code> uruchamia się dokładnie raz na instancję komponentu.</p>' +
            '<pre><code>// Vue\n' +
            'const count = ref(0)\n' +
            'function inc() {\n' +
            '  count.value++\n' +
            '}\n' +
            '// setup nigdy nie wykona sie drugi raz</code></pre>' +
            '<p>W Reactie stan mieszka w komponencie, ale to, co masz w ręce, to tylko odczytana wartość - migawka (snapshot) z tego jednego renderu.</p>' +
            '<pre><code>// React\n' +
            'const [count, setCount] = useState(0)\n' +
            'function inc() {\n' +
            '  setCount(count + 1)\n' +
            '}\n' +
            '// cale cialo komponentu wykona sie ponownie</code></pre>' +
            '<p>W Vue robiłeś <code>count.value++</code>, bo mutowałeś jedno stałe pudełko. W Reactie robisz <code>setCount(...)</code>, bo <code>count</code> to <code>const</code> przypisany w tym renderze - nie da się go zmienić, można tylko poprosić o kolejny render z nową wartością.</p>' +
            '<p>Konsekwencja, która gryzie na starcie: dwa <code>setCount(count + 1)</code> pod rząd w jednym handlerze dadzą wynik 1, a nie 2. Oba czytają tę samą migawkę. W Vue <code>count.value++</code> dwa razy da 2, bo za każdym razem czytasz aktualny stan pudełka.</p>' +
            '<p>Ratunek jest prosty i warto go wyrobić od pierwszego dnia: gdy nowa wartość zależy od starej, przekaż funkcję.</p>' +
            '<pre><code>setCount(prev =&gt; prev + 1)\n' +
            'setCount(prev =&gt; prev + 1) // teraz naprawde 2</code></pre>' +
            '<p>Druga różnica to obiekty. W Vue <code>reactive({ a: 1 })</code> pozwala pisać <code>state.a = 2</code>. W Reactie musisz stworzyć nowy obiekt: <code>setUser({ ...user, name: "Ada" })</code>. React porównuje referencje, więc mutacja w miejscu jest dla niego niewidoczna.</p>',
          en: '<p>In Vue, state lives in an object. <code>ref(0)</code> returns a box with a <code>.value</code> field, and <code>setup</code> runs exactly once per component instance.</p>' +
            '<pre><code>// Vue\n' +
            'const count = ref(0)\n' +
            'function inc() {\n' +
            '  count.value++\n' +
            '}\n' +
            '// setup will never run a second time</code></pre>' +
            '<p>In React, state lives in the component, but what you hold in your hand is only a read value - a snapshot from this one render.</p>' +
            '<pre><code>// React\n' +
            'const [count, setCount] = useState(0)\n' +
            'function inc() {\n' +
            '  setCount(count + 1)\n' +
            '}\n' +
            '// the whole component body will run again</code></pre>' +
            '<p>In Vue you wrote <code>count.value++</code> because you were mutating one stable box. In React you call <code>setCount(...)</code> because <code>count</code> is a <code>const</code> bound during this render - you cannot change it, you can only ask for another render with a new value.</p>' +
            '<p>The consequence that bites everyone on day one: two <code>setCount(count + 1)</code> calls in the same handler produce 1, not 2. Both read the same snapshot. In Vue, <code>count.value++</code> twice gives you 2, because each read sees the current contents of the box.</p>' +
            '<p>The fix is simple and worth internalising immediately: when the new value depends on the old one, pass a function.</p>' +
            '<pre><code>setCount(prev =&gt; prev + 1)\n' +
            'setCount(prev =&gt; prev + 1) // genuinely 2 now</code></pre>' +
            '<p>The second difference is objects. In Vue, <code>reactive({ a: 1 })</code> lets you write <code>state.a = 2</code>. In React you must build a new object: <code>setUser({ ...user, name: "Ada" })</code>. React compares references, so an in-place mutation is invisible to it.</p>'
        },
        pro: {
          pl: '<p>Model mentalny, który warto mieć na rozmowie: <strong>Vue śledzi zależności, React śledzi renderowanie</strong>. <code>ref</code> to obiekt z getterem i setterem na <code>.value</code>, który przy odczycie zapisuje aktualny efekt jako subskrybenta, a przy zapisie budzi wszystkich subskrybentów. <code>useState</code> nie śledzi niczego - to indeksowany slot w liście hooków fibera, a setter jedynie planuje aktualizację.</p>' +
            '<p>Stąd trzy rzeczy, które w produkcji faktycznie robią różnicę.</p>' +
            '<p><strong>1. Bail-out przez Object.is.</strong> Jeśli przekażesz tę samą wartość co obecna, React (od 18 z automatycznym batchingiem) potrafi pominąć render. Dlatego <code>setItems(items)</code> po mutacji tablicy w miejscu nie zrobi nic - to najczęstszy bug migrantów z Vue.</p>' +
            '<pre><code>// zle: Vue-owy odruch\n' +
            'items.push(next)\n' +
            'setItems(items)        // ta sama referencja =&gt; brak renderu\n' +
            '// dobrze\n' +
            'setItems(prev =&gt; [...prev, next])</code></pre>' +
            '<p><strong>2. Stale closure.</strong> Każdy render tworzy nowe domknięcia nad wartościami z tego renderu. Callback zapisany w <code>setInterval</code> albo w evencie WebSocketu widzi stan sprzed pół godziny. W Vue ten problem nie istnieje, bo <code>count.value</code> zawsze czyta bieżące pudełko. W Reactie odpowiednikiem jest updater funkcyjny albo <code>useRef</code> trzymany jako "żywe" pudełko.</p>' +
            '<p><strong>3. Kształt stanu.</strong> Przy stanie o kilku powiązanych polach <code>useReducer</code> bije zestaw <code>useState</code>: masz jedno przejście, jeden dispatch i stabilną referencję <code>dispatch</code>, której nie trzeba memoizować. To najbliższy odpowiednik akcji ze store Pinii, tylko lokalny dla komponentu.</p>' +
            '<pre><code>const [state, dispatch] = useReducer(reducer, { step: 0, data: null })\n' +
            'dispatch({ type: "next" })</code></pre>' +
            '<p>Drobiazgi, o które pytają rekruterzy: <code>useState(() =&gt; heavyInit())</code> uruchamia inicjalizator tylko przy montowaniu (odpowiednik leniwego <code>ref</code> liczonego raz w <code>setup</code>); <code>key</code> na komponencie resetuje cały jego stan i jest czystszy niż ręczne czyszczenie w efekcie; React 18 batchuje aktualizacje także w <code>setTimeout</code> i w handlerach <code>fetch</code>, więc "po secie stan jeszcze stary" jest zawsze prawdą, nie czasem. Vue ma tu <code>nextTick</code>, React nie daje żadnego await na render - jeśli potrzebujesz nowej wartości, po prostu ją policz lokalnie.</p>',
          en: '<p>The mental model worth having in an interview: <strong>Vue tracks dependencies, React tracks renders</strong>. A <code>ref</code> is an object with a getter/setter on <code>.value</code>; reading it registers the current effect as a subscriber, writing it wakes every subscriber. <code>useState</code> tracks nothing - it is an indexed slot in the fiber hook list, and the setter merely schedules an update.</p>' +
            '<p>Three consequences actually matter in production.</p>' +
            '<p><strong>1. The Object.is bail-out.</strong> If you pass the value that is already there, React can skip the render entirely. So <code>setItems(items)</code> after mutating the array in place does nothing - the single most common bug for people coming from Vue.</p>' +
            '<pre><code>// wrong: the Vue reflex\n' +
            'items.push(next)\n' +
            'setItems(items)        // same reference =&gt; no render\n' +
            '// right\n' +
            'setItems(prev =&gt; [...prev, next])</code></pre>' +
            '<p><strong>2. Stale closures.</strong> Every render creates fresh closures over that render values. A callback stored in <code>setInterval</code> or a WebSocket handler sees state from half an hour ago. This problem does not exist in Vue because <code>count.value</code> always reads the current box. The React answers are the functional updater or a <code>useRef</code> used as a live box.</p>' +
            '<p><strong>3. State shape.</strong> For several related fields, <code>useReducer</code> beats a pile of <code>useState</code>: one transition, one dispatch, and a stable <code>dispatch</code> identity you never need to memoise. It is the closest thing to a Pinia action, scoped to a component.</p>' +
            '<pre><code>const [state, dispatch] = useReducer(reducer, { step: 0, data: null })\n' +
            'dispatch({ type: "next" })</code></pre>' +
            '<p>Details interviewers ask about: <code>useState(() =&gt; heavyInit())</code> runs the initialiser on mount only (the equivalent of a lazily computed <code>ref</code> in <code>setup</code>); a <code>key</code> on a component resets all of its state and is cleaner than clearing things by hand in an effect; React 18 batches updates inside <code>setTimeout</code> and <code>fetch</code> handlers too, so "state is still old right after the setter" is always true, not sometimes. Vue gives you <code>nextTick</code>; React gives you nothing to await - if you need the new value, just compute it locally.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego w Reactie nie można napisać count++ tak jak count.value++ w Vue?',
            en: 'Why can you not write count++ in React the way you write count.value++ in Vue?'
          },
          options: [
            { pl: 'Bo React zabrania operatora ++ w JSX', en: 'Because React forbids the ++ operator inside JSX' },
            { pl: 'Bo count to stała odczytana w tym renderze, a nie pudełko na stan', en: 'Because count is a const read during this render, not a state box' },
            { pl: 'Bo useState działa tylko z obiektami', en: 'Because useState only works with objects' },
            { pl: 'Bo React mutuje stan dopiero po zamontowaniu', en: 'Because React only mutates state after mount' }
          ],
          correct: 1,
          explain: {
            pl: 'useState zwraca wartość-migawkę z bieżącego renderu. Żeby cokolwiek zmienić, prosisz o nowy render setterem - w Vue mutowałeś jedno trwałe pudełko.',
            en: 'useState hands you a snapshot value from the current render. To change anything you request a new render via the setter - in Vue you mutated one long-lived box.'
          }
        },
        {
          q: {
            pl: 'Handler robi setCount(count + 1) dwa razy pod rząd, count wynosi 0. Co zobaczysz po renderze?',
            en: 'A handler calls setCount(count + 1) twice in a row with count at 0. What do you see after the render?'
          },
          options: [
            { pl: '2, bo React sumuje wywołania', en: '2, because React adds the calls up' },
            { pl: '0, bo drugie wywołanie anuluje pierwsze', en: '0, because the second call cancels the first' },
            { pl: '1, bo oba wywołania czytają tę samą migawkę count', en: '1, because both calls read the same snapshot of count' },
            { pl: 'Błąd runtime o podwójnej aktualizacji', en: 'A runtime error about a double update' }
          ],
          correct: 2,
          explain: {
            pl: 'Oba wywołania widzą count === 0, więc oba żądają wartości 1. Updater funkcyjny setCount(prev => prev + 1) rozwiązuje problem, bo dostaje najświeższy stan z kolejki.',
            en: 'Both calls see count === 0, so both request 1. The functional updater setCount(prev => prev + 1) fixes it because each one receives the latest queued state.'
          }
        },
        {
          q: {
            pl: 'Przenosisz z Vue kod, który robił items.push(x). Jak wygląda poprawna wersja w Reactie?',
            en: 'You are porting Vue code that did items.push(x). What is the correct React version?'
          },
          options: [
            { pl: 'items.push(x); setItems(items)', en: 'items.push(x); setItems(items)' },
            { pl: 'setItems(prev => [...prev, x])', en: 'setItems(prev => [...prev, x])' },
            { pl: 'items = [...items, x]', en: 'items = [...items, x]' },
            { pl: 'setItems(items.push(x))', en: 'setItems(items.push(x))' }
          ],
          correct: 1,
          explain: {
            pl: 'React porównuje referencje przez Object.is, więc mutacja w miejscu jest dla niego niewidoczna, a push zwraca długość tablicy. Potrzebna jest nowa tablica.',
            en: 'React compares references with Object.is, so an in-place mutation is invisible to it, and push returns a length. You need a brand new array.'
          }
        },
        {
          q: {
            pl: 'Timer uruchomiony raz przy montowaniu loguje ciągle count równy 0, choć w UI widać 7. Co jest przyczyną?',
            en: 'A timer started once on mount keeps logging count as 0 even though the UI shows 7. What is going on?'
          },
          options: [
            { pl: 'Stale closure - callback trzyma count z pierwszego renderu', en: 'A stale closure - the callback holds count from the first render' },
            { pl: 'setInterval nie działa w React 18', en: 'setInterval does not work in React 18' },
            { pl: 'StrictMode wyłącza aktualizacje stanu w timerach', en: 'StrictMode disables state updates inside timers' },
            { pl: 'Trzeba dodać await przed setCount', en: 'You need to await the setCount call' }
          ],
          correct: 0,
          explain: {
            pl: 'Callback został utworzony w renderze, w którym count wynosił 0, i domyka się nad tą wartością. Ratunkiem jest updater funkcyjny albo useRef trzymany jako żywe pudełko - dokładnie to, czym ref jest w Vue.',
            en: 'The callback was created in a render where count was 0 and closes over that value. Use a functional updater or a useRef kept as a live box - which is exactly what a Vue ref is.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'useeffect-vs-watchers',
      title: {
        pl: 'useEffect kontra watch i watchEffect',
        en: 'useEffect vs watch and watchEffect'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'useEffect', en: 'useEffect' },
          def: {
            pl: 'Narzędzie do synchronizacji komponentu z systemem zewnętrznym: subskrypcją, timerem, WebSocketem, API przeglądarki. Prawie wszystko inne policzysz w czasie renderu.',
            en: 'The tool for synchronising a component with an external system: a subscription, a timer, a WebSocket, a browser API. Nearly everything else can be computed during render.'
          }
        },
        {
          term: { pl: 'Funkcja czyszcząca', en: 'Cleanup function' },
          def: {
            pl: 'Funkcja zwracana z efektu, wołana przed kolejnym uruchomieniem i przy odmontowaniu. Brak <code>socket.close()</code> to najczęstszy wyciek przy migracji z Vue.',
            en: 'The function returned from an effect, called before the next run and on unmount. A missing <code>socket.close()</code> is the most common leak when migrating from Vue.'
          }
        },
        {
          term: { pl: 'Podwójne wywołanie w StrictMode', en: 'StrictMode double invoke' },
          def: {
            pl: 'W devie React montuje, sprząta i montuje ponownie. To nie błąd, tylko test poprawności twojego cleanupu.',
            en: 'In development React mounts, cleans up and mounts again. Not a bug - a test of whether your cleanup is correct.'
          }
        },
        {
          term: { pl: 'Wyścig w efekcie', en: 'Effect race condition' },
          def: {
            pl: 'Dwa pobrania danych kończące się w złej kolejności nadpisują świeższy wynik starszym. Wzorzec strażnika <code>let alive = true</code> plus cleanup rozwiązuje to ręcznie, a TanStack Query automatycznie.',
            en: 'Two fetches finishing out of order overwrite the fresher result with the older one. The <code>let alive = true</code> guard plus cleanup fixes it by hand; TanStack Query does it for you.'
          }
        },
        {
          term: { pl: 'useSyncExternalStore', en: 'useSyncExternalStore' },
          def: {
            pl: 'Hook do subskrybowania zewnętrznego store bezpiecznie w trybie współbieżnym. Używa go Zustand, tak jak Pinia jedzie na reaktywności Vue.',
            en: 'The hook for subscribing to an external store safely under concurrent rendering. Zustand uses it, much as Pinia rides on Vue reactivity.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--accent2)">Vue: watch fires BEFORE the DOM update</text>' +
          '<rect x="20" y="46" width="150" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="95" y="86" text-anchor="middle" font-size="14" fill="var(--text)">source changes</text>' +
          '<line x1="176" y1="79" x2="214" y2="79" stroke="var(--muted)" stroke-width="2" marker-end="url(#d2a)"/>' +
          '<rect x="220" y="46" width="150" height="66" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="295" y="86" text-anchor="middle" font-size="14" fill="var(--text)">watch callback</text>' +
          '<line x1="376" y1="79" x2="414" y2="79" stroke="var(--muted)" stroke-width="2" marker-end="url(#d2a)"/>' +
          '<rect x="420" y="46" width="200" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="520" y="86" text-anchor="middle" font-size="14" fill="var(--text)">DOM patched</text>' +
          '<line x1="20" y1="150" x2="620" y2="150" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="190" font-size="15" fill="var(--accent)">React: useEffect fires AFTER paint</text>' +
          '<rect x="20" y="206" width="150" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="95" y="246" text-anchor="middle" font-size="14" fill="var(--text)">render</text>' +
          '<line x1="176" y1="239" x2="214" y2="239" stroke="var(--muted)" stroke-width="2" marker-end="url(#d2a)"/>' +
          '<rect x="220" y="206" width="150" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="295" y="246" text-anchor="middle" font-size="14" fill="var(--text)">commit + paint</text>' +
          '<line x1="376" y1="239" x2="414" y2="239" stroke="var(--muted)" stroke-width="2" marker-end="url(#d2a)"/>' +
          '<rect x="420" y="206" width="200" height="66" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="520" y="238" text-anchor="middle" font-size="14" fill="var(--text)">cleanup, then effect</text>' +
          '<text x="520" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">user already saw the frame</text>' +
          '<text x="320" y="330" text-anchor="middle" font-size="14" fill="var(--warn)">setState inside an effect = a second render</text>' +
          '<text x="320" y="368" text-anchor="middle" font-size="14" fill="var(--muted)">watch = react to a change, useEffect = sync with the outside world</text>' +
          '</svg>',
        caption: {
          pl: 'watch w Vue odpala się przed aktualizacją DOM i jest częścią przepływu reaktywnego. useEffect w Reactie odpala się po namalowaniu klatki i służy do synchronizacji ze światem zewnętrznym.',
          en: 'A Vue watch runs before the DOM update and is part of the reactive flow. A React useEffect runs after the frame is painted and exists to synchronise with the outside world.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Pełny cykl życia useEffect klatka po klatce, z ciągłym podglądem tego, co w tym samym momencie zrobiłoby Vue.',
          en: 'The full useEffect lifecycle frame by frame, with a running commentary on what Vue would do at the same moment.'
        },
        frames: [
          {
            svg: frameL2(0, 'setup() has already run once, long before this.', 'The render effect recomputes the template.', 'Render: React builds the new tree'),
            label: { pl: 'Render', en: 'Render' },
            note: {
              pl: 'React wykonuje ciało komponentu i tworzy nowy JSX. Nic z efektów jeszcze nie działa - dokładnie tak samo, jak render Vue nie odpala watcherów post.',
              en: 'React runs the component body and produces new JSX. No effect has run yet - just as a Vue render does not run post-flush watchers.'
            }
          },
          {
            svg: frameL2(1, 'Vue would already have run the watch callback here.', 'Default flush is pre: before the DOM is patched.', 'Paint: the user sees the new frame'),
            label: { pl: 'Commit i paint', en: 'Commit and paint' },
            note: {
              pl: 'DOM jest zaktualizowany i przeglądarka rysuje klatkę. To najważniejsza różnica: Vue zdążyło już wywołać callback watch, React jeszcze niczego nie odpalił.',
              en: 'The DOM is updated and the browser paints. This is the key difference: Vue has already run its watch callback, React has not run anything yet.'
            }
          },
          {
            svg: frameL2(2, 'Vue equivalent: onCleanup(fn) inside watch.', 'Also onWatcherCleanup or a manual stop handle.', 'Cleanup of the previous effect runs first'),
            label: { pl: 'Sprzątanie poprzedniego efektu', en: 'Previous cleanup runs' },
            note: {
              pl: 'Zanim efekt wystartuje ponownie, React woła funkcję zwróconą z poprzedniego przebiegu. Tu odpinasz listenery i przerywasz nieaktualne żądania.',
              en: 'Before the effect runs again React calls the function returned from the previous pass. This is where you detach listeners and abort stale requests.'
            }
          },
          {
            svg: frameL2(3, 'Vue: watch(source, cb) with an explicit source.', 'React: the dependency array is that source, by hand.', 'Effect body runs with the current deps'),
            label: { pl: 'Ciało efektu', en: 'Effect body' },
            note: {
              pl: 'Efekt wykonuje się z wartościami z tego renderu. Tablica zależności to twoje ręczne odwzorowanie tego, co Vue wykrywa automatycznie przez proxy.',
              en: 'The effect runs with this render values. The dependency array is your manual version of what Vue detects automatically through proxies.'
            }
          },
          {
            svg: frameL2(4, 'Vue: onUnmounted, or the scope disposing the watcher.', 'Effect scopes clean up automatically on teardown.', 'Unmount: the last cleanup runs'),
            label: { pl: 'Odmontowanie', en: 'Unmount' },
            note: {
              pl: 'Przy usunięciu komponentu odpala się ostatni cleanup. W Vue efekt zniknąłby razem ze scope komponentu - w Reactie ta sama funkcja obsługuje oba przypadki.',
              en: 'When the component is removed the final cleanup runs. In Vue the watcher would die with the component scope - in React the same function handles both cases.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że masz w domu psa i akwarium.</p>' +
            '<p>Kiedy ktoś zmienia pogodę za oknem, ty od razu bierzesz kurtkę albo ją odwieszasz. Reagujesz na zmianę, natychmiast, zanim jeszcze wyjdziesz z domu. To jest watch we Vue: coś się zmieniło, więc coś robisz.</p>' +
            '<p>Ale karmienie ryb to inna historia. Rybom jest wszystko jedno, co się zmieniło w twoim domu. One po prostu istnieją poza tobą i trzeba je regularnie dokarmiać. Zajmujesz się tym, kiedy już wszystko inne jest ogarnięte. To jest useEffect w Reactie: sprzątanie relacji ze światem, który nie należy do twojego komponentu.</p>' +
            '<p>I jeszcze jedno: jeśli wyjeżdżasz na wakacje, musisz komuś oddać klucze i poprosić o karmienie ryb, a po powrocie odebrać klucze z powrotem. Ta funkcja, którą React każe zwrócić z efektu, to właśnie odbieranie kluczy. Bez tego zostaje bałagan.</p>',
          en: '<p>Imagine you have a dog and a fish tank at home.</p>' +
            '<p>When the weather outside changes, you immediately grab a coat or hang it back up. You react to a change, straight away, before you even leave. That is a Vue watch: something changed, so you do something.</p>' +
            '<p>Feeding the fish is a different story. The fish do not care what changed in your house. They simply exist outside of you and need feeding regularly. You deal with them once everything else is sorted. That is a React useEffect: managing your relationship with a world that does not belong to your component.</p>' +
            '<p>One more thing: if you go on holiday you hand someone the keys and ask them to feed the fish, and when you come back you take the keys again. That function React asks you to return from an effect is exactly the taking-the-keys part. Without it you leave a mess behind.</p>'
        },
        school: {
          pl: '<p>Największa pułapka migracji: <code>useEffect</code> wygląda jak <code>watch</code>, ale ma inną rolę. <code>watch</code> to część systemu reaktywnego, <code>useEffect</code> to furtka do świata poza Reactem.</p>' +
            '<pre><code>// Vue\n' +
            'watch(userId, async (id, prevId, onCleanup) =&gt; {\n' +
            '  const ctrl = new AbortController()\n' +
            '  onCleanup(() =&gt; ctrl.abort())\n' +
            '  user.value = await fetchUser(id, ctrl.signal)\n' +
            '})</code></pre>' +
            '<pre><code>// React\n' +
            'useEffect(() =&gt; {\n' +
            '  const ctrl = new AbortController()\n' +
            '  fetchUser(userId, ctrl.signal).then(setUser)\n' +
            '  return () =&gt; ctrl.abort()\n' +
            '}, [userId])</code></pre>' +
            '<p>W Vue źródło podawałeś jawnie jako pierwszy argument, a przy <code>watchEffect</code> Vue samo wykrywało zależności podczas pierwszego przebiegu. W Reactie zawsze wypisujesz zależności ręcznie w tablicy, bo React nie ma proxy i nie widzi, co przeczytałeś. Dlatego <code>eslint-plugin-react-hooks</code> to nie kaprys, tylko brakujący element systemu.</p>' +
            '<p>Druga różnica to moment. <code>watch</code> domyślnie odpala się <em>przed</em> aktualizacją DOM (flush pre), <code>useEffect</code> <em>po</em> namalowaniu klatki. Jeśli musisz zmierzyć element albo poprawić pozycję zanim użytkownik zobaczy przeskok, użyj <code>useLayoutEffect</code> - to najbliższy odpowiednik <code>watch</code> z <code>flush: post</code>, tylko synchroniczny.</p>' +
            '<p>Trzecia różnica jest kulturowa. W Vue watcher bywa naturalnym miejscem na wyliczenie czegoś. W Reactie efekt, który tylko ustawia stan na podstawie propsów, to zapach kodu - policz to podczas renderu albo użyj <code>useMemo</code>. Zasada brzmi: jeśli nie ma tu żadnego systemu zewnętrznego, prawdopodobnie nie potrzebujesz efektu.</p>' +
            '<p>Warto też zapamiętać, że pusta tablica zależności to nie jest odpowiednik <code>onMounted</code>. To po prostu efekt, który nigdy nie musi się powtórzyć, a mimo to zawsze ma swój cleanup wykonywany przy odmontowaniu komponentu.</p>',
          en: '<p>The biggest migration trap: <code>useEffect</code> looks like <code>watch</code> but plays a different role. <code>watch</code> is part of the reactivity system; <code>useEffect</code> is the escape hatch to the world outside React.</p>' +
            '<pre><code>// Vue\n' +
            'watch(userId, async (id, prevId, onCleanup) =&gt; {\n' +
            '  const ctrl = new AbortController()\n' +
            '  onCleanup(() =&gt; ctrl.abort())\n' +
            '  user.value = await fetchUser(id, ctrl.signal)\n' +
            '})</code></pre>' +
            '<pre><code>// React\n' +
            'useEffect(() =&gt; {\n' +
            '  const ctrl = new AbortController()\n' +
            '  fetchUser(userId, ctrl.signal).then(setUser)\n' +
            '  return () =&gt; ctrl.abort()\n' +
            '}, [userId])</code></pre>' +
            '<p>In Vue you named the source explicitly as the first argument, and with <code>watchEffect</code> Vue discovered dependencies during the first run. In React you always list dependencies by hand, because React has no proxies and cannot see what you read. That is why <code>eslint-plugin-react-hooks</code> is not a nicety - it is the missing half of the mechanism.</p>' +
            '<p>The second difference is timing. <code>watch</code> defaults to running <em>before</em> the DOM update (pre flush); <code>useEffect</code> runs <em>after</em> paint. If you must measure an element or fix a position before the user sees a jump, reach for <code>useLayoutEffect</code> - the closest thing to a <code>flush: post</code> watcher, only synchronous.</p>' +
            '<p>The third difference is cultural. In Vue a watcher is often a fine place to compute something. In React an effect that only sets state from props is a code smell - compute it during render or with <code>useMemo</code>. The rule of thumb: if no external system is involved, you probably do not need an effect.</p>'
        },
        pro: {
          pl: '<p>Produkcyjna definicja: <strong>useEffect synchronizuje komponent z systemem zewnętrznym</strong> - subskrypcją, timerem, WebSocketem, analityką, API przeglądarki. Wszystko inne prawie zawsze da się policzyć podczas renderu.</p>' +
            '<p><strong>StrictMode i podwójne wywołanie.</strong> W trybie deweloperskim React 18/19 montuje komponent, sprząta i montuje ponownie. To nie bug, tylko test poprawności twojego cleanupu. Kod w stylu <code>socket.connect()</code> bez <code>socket.close()</code> w cleanupie natychmiast się wysypie - w Vue analogiczny błąd wyszedłby dopiero na produkcji po kilkunastu nawigacjach.</p>' +
            '<p><strong>Wyścigi.</strong> Domyślny wzorzec ze zmienną-strażnikiem jest tak powszechny, że warto go znać na pamięć:</p>' +
            '<pre><code>useEffect(() =&gt; {\n' +
            '  let alive = true\n' +
            '  load(query).then(res =&gt; { if (alive) setData(res) })\n' +
            '  return () =&gt; { alive = false }\n' +
            '}, [query])</code></pre>' +
            '<p>W praktyce w produkcji tego nie piszesz - TanStack Query robi to za ciebie, tak jak w świecie Vue robi to VueUse albo Nuxt <code>useAsyncData</code>. Ręczny fetch w efekcie to wzorzec z tutoriali, nie z aplikacji.</p>' +
            '<p><strong>Zależności obiektowe.</strong> Obiekt lub funkcja w tablicy zależności zmienia tożsamość co render, więc efekt lata w pętli. Vue tego problemu nie ma, bo porównuje wartości reaktywne, a nie referencje domknięć. W Reactie masz trzy wyjścia: rozbij obiekt na prymitywy (<code>[opts.id, opts.mode]</code>), przenieś obiekt poza komponent, albo owiń go w <code>useMemo</code>.</p>' +
            '<p><strong>Zamiast efektu.</strong> Do subskrypcji zewnętrznych stanów istnieje <code>useSyncExternalStore</code> - bezpieczny przy współbieżnym renderowaniu i wymagany przez biblioteki store (Zustand używa go pod spodem, tak jak Pinia opiera się na reaktywności Vue). Do przejść stanu na podstawie propsów użyj <code>key</code> albo wyliczenia podczas renderu. Do pomiarów layoutu <code>useLayoutEffect</code>, do rejestracji efektów w bibliotekach CSS-in-JS <code>useInsertionEffect</code>.</p>' +
            '<p><strong>Kolejność i wydajność.</strong> Efekty potomków wykonują się przed efektami rodzica, więc pomiar w rodzicu widzi już zamontowane dzieci. Jeśli efekt ustawia stan, płacisz za drugi render przed pokazaniem klatki - przy listach powyżej kilkuset elementów to bywa różnica rzędu kilkudziesięciu milisekund w profilerze.</p>' +
            '<p>Podsumowanie mapowania: <code>watch(src, cb)</code> to <code>useEffect(cb, [src])</code> plus jawny cleanup; <code>watchEffect</code> nie ma odpowiednika, bo React nie autotrackuje; <code>watch(..., { immediate: true })</code> to domyślne zachowanie useEffect; <code>watch(..., { flush: post })</code> to useLayoutEffect z drugiej strony, bo domyślny useEffect jest jeszcze późniejszy.</p>',
          en: '<p>The production definition: <strong>useEffect synchronises a component with an external system</strong> - a subscription, a timer, a WebSocket, analytics, a browser API. Nearly everything else can be computed during render.</p>' +
            '<p><strong>StrictMode and the double invoke.</strong> In development React 18/19 mounts, cleans up, and mounts again. That is not a bug, it is a test of your cleanup. Code like <code>socket.connect()</code> without a matching <code>socket.close()</code> blows up immediately - in Vue the same mistake would only surface in production after a dozen navigations.</p>' +
            '<p><strong>Race conditions.</strong> The guard-variable pattern is common enough to memorise:</p>' +
            '<pre><code>useEffect(() =&gt; {\n' +
            '  let alive = true\n' +
            '  load(query).then(res =&gt; { if (alive) setData(res) })\n' +
            '  return () =&gt; { alive = false }\n' +
            '}, [query])</code></pre>' +
            '<p>In real applications you rarely write it - TanStack Query does it for you, exactly as VueUse or Nuxt <code>useAsyncData</code> does in the Vue world. Hand-rolled fetching in an effect is a tutorial pattern, not a product pattern.</p>' +
            '<p><strong>Object dependencies.</strong> An object or function in the dependency array gets a new identity every render, so the effect loops. Vue never hits this because it compares reactive values, not closure references. React gives you three outs: destructure to primitives (<code>[opts.id, opts.mode]</code>), hoist the object out of the component, or wrap it in <code>useMemo</code>.</p>' +
            '<p><strong>Instead of an effect.</strong> For subscribing to external stores there is <code>useSyncExternalStore</code> - concurrent-safe and required by store libraries (Zustand uses it under the hood, much as Pinia rides on Vue reactivity). For state derived from props, use a <code>key</code> or compute during render. For layout measurement use <code>useLayoutEffect</code>, and for CSS-in-JS rule injection <code>useInsertionEffect</code>.</p>' +
            '<p>The mapping in one line: <code>watch(src, cb)</code> is <code>useEffect(cb, [src])</code> plus an explicit cleanup; <code>watchEffect</code> has no equivalent because React does not auto-track; <code>{ immediate: true }</code> is the default useEffect behaviour; and <code>{ flush: post }</code> lands between useLayoutEffect and useEffect, since plain useEffect is later still.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kiedy odpala się callback useEffect w stosunku do domyślnego watch we Vue?',
            en: 'When does a useEffect callback run compared with a default Vue watch?'
          },
          options: [
            { pl: 'Wcześniej - jeszcze przed renderem', en: 'Earlier - before the render even happens' },
            { pl: 'Później - po commicie i namalowaniu klatki', en: 'Later - after commit and after paint' },
            { pl: 'Dokładnie w tym samym momencie', en: 'At exactly the same moment' },
            { pl: 'Tylko przy odmontowaniu komponentu', en: 'Only when the component unmounts' }
          ],
          correct: 1,
          explain: {
            pl: 'watch działa domyślnie w fazie pre, czyli przed aktualizacją DOM. useEffect jest asynchroniczny i uruchamia się po namalowaniu klatki; jeśli potrzebujesz wcześniej, sięgasz po useLayoutEffect.',
            en: 'A watch defaults to the pre flush, before the DOM is patched. useEffect is asynchronous and runs after paint; when you need it earlier you reach for useLayoutEffect.'
          }
        },
        {
          q: {
            pl: 'Co jest reactowym odpowiednikiem parametru onCleanup z callbacku watch?',
            en: 'What is the React equivalent of the onCleanup argument in a watch callback?'
          },
          options: [
            { pl: 'Drugi argument useEffect', en: 'The second argument to useEffect' },
            { pl: 'Hook useCleanup', en: 'A useCleanup hook' },
            { pl: 'Funkcja zwrócona z callbacku efektu', en: 'The function returned from the effect callback' },
            { pl: 'Metoda componentWillUnmount', en: 'The componentWillUnmount method' }
          ],
          correct: 2,
          explain: {
            pl: 'React wywołuje zwróconą funkcję przed każdym kolejnym przebiegiem efektu oraz przy odmontowaniu - jedna funkcja obsługuje oba przypadki.',
            en: 'React calls the returned function before every subsequent run of the effect and once on unmount - one function covers both cases.'
          }
        },
        {
          q: {
            pl: 'Efekt z zależnością [options], gdzie options to obiekt literalny tworzony w komponencie, wpada w nieskończoną pętlę. Najlepsza pierwsza reakcja?',
            en: 'An effect with [options] as a dependency, where options is an object literal created in the component, loops forever. Best first move?'
          },
          options: [
            { pl: 'Rozbić obiekt na prymitywy albo owinąć go w useMemo', en: 'Destructure it to primitives, or wrap it in useMemo' },
            { pl: 'Usunąć tablicę zależności', en: 'Remove the dependency array' },
            { pl: 'Dodać JSON.stringify wewnątrz efektu', en: 'Add a JSON.stringify inside the effect' },
            { pl: 'Wyłączyć regułę lintera i zostawić pustą tablicę', en: 'Disable the lint rule and leave an empty array' }
          ],
          correct: 0,
          explain: {
            pl: 'Obiekt literalny ma nową tożsamość w każdym renderze, a React porównuje referencje. Prymitywy albo stabilna referencja z useMemo rozwiązują problem u źródła; usunięcie tablicy pogorszy sprawę.',
            en: 'An object literal has a fresh identity every render and React compares references. Primitives or a stable useMemo reference fix the cause; removing the array makes it worse.'
          }
        },
        {
          q: {
            pl: 'W StrictMode efekt wykonuje się dwa razy po zamontowaniu. Co to najczęściej oznacza?',
            en: 'In StrictMode your effect runs twice on mount. What does that usually mean?'
          },
          options: [
            { pl: 'Że React ma buga i trzeba wyłączyć StrictMode', en: 'React has a bug and StrictMode must be disabled' },
            { pl: 'Że komponent jest zamontowany dwa razy w drzewie', en: 'The component is mounted twice in the tree' },
            { pl: 'Że tablica zależności jest za długa', en: 'The dependency array is too long' },
            { pl: 'Że React celowo testuje, czy cleanup poprawnie cofa efekt', en: 'React is deliberately testing whether your cleanup undoes the effect' }
          ],
          correct: 3,
          explain: {
            pl: 'Podwójne montowanie tylko w devie ujawnia efekty bez symetrycznego sprzątania. Jeśli po poprawnym cleanupie wszystko działa, kod jest odporny także na Fast Refresh i przyszłe funkcje współbieżne.',
            en: 'The dev-only double mount surfaces effects without symmetric cleanup. Once the cleanup is right, the code also survives Fast Refresh and future concurrent features.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'derived-state-usememo-vs-computed',
      title: {
        pl: 'Stan pochodny: useMemo kontra computed',
        en: 'Derived state: useMemo vs computed'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'useMemo', en: 'useMemo' },
          def: {
            pl: 'Ręcznie zbudowany <code>computed</code>: bez autotrackingu i bez leniwości, liczy się przy każdej zmianie zależności niezależnie od tego, czy ktoś czyta wynik.',
            en: 'A hand-built <code>computed</code>: no auto-tracking and no laziness, it recomputes whenever a dependency changes whether or not anyone reads the result.'
          }
        },
        {
          term: { pl: 'Tablica zależności', en: 'Dependency array' },
          def: {
            pl: 'Jawna lista wartości porównywanych przez <code>Object.is</code>. Obiekt lub funkcja tworzone w renderze mają nową tożsamość za każdym razem, więc memo nigdy nie trafia.',
            en: 'The explicit list of values compared with <code>Object.is</code>. An object or function created during render has a new identity every time, so the memo never hits.'
          }
        },
        {
          term: { pl: 'Optymalizacja bez gwarancji', en: 'Optimisation without guarantees' },
          def: {
            pl: 'React może w każdej chwili wyrzucić zapamiętaną wartość i policzyć ją ponownie. Nigdy nie buduj na <code>useMemo</code> logiki poprawnościowej.',
            en: 'React may drop a memoised value at any time and recompute it. Never build correctness logic on top of <code>useMemo</code>.'
          }
        },
        {
          term: { pl: 'Stabilność referencji', en: 'Reference stability' },
          def: {
            pl: 'Główny sensowny powód użycia <code>useMemo</code>: wynik idzie jako props do komponentu w <code>memo</code> albo do tablicy zależności innego hooka.',
            en: 'The main legitimate reason to reach for <code>useMemo</code>: the result goes as a prop into a <code>memo</code> component or into another hook dependency array.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--accent2)">computed: a node in a dependency graph</text>' +
          '<rect x="20" y="46" width="130" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="85" y="82" text-anchor="middle" font-size="14" fill="var(--text)">items</text>' +
          '<rect x="20" y="118" width="130" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="85" y="154" text-anchor="middle" font-size="14" fill="var(--text)">query</text>' +
          '<line x1="156" y1="76" x2="234" y2="105" stroke="var(--accent2)" stroke-width="2" marker-end="url(#d3a)"/>' +
          '<line x1="156" y1="148" x2="234" y2="119" stroke="var(--accent2)" stroke-width="2" marker-end="url(#d3a)"/>' +
          '<rect x="240" y="82" width="180" height="60" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="330" y="108" text-anchor="middle" font-size="14" fill="var(--text)">filtered</text>' +
          '<text x="330" y="128" text-anchor="middle" font-size="13" fill="var(--muted)">tracked automatically</text>' +
          '<line x1="426" y1="112" x2="474" y2="112" stroke="var(--muted)" stroke-width="2" marker-end="url(#d3a)"/>' +
          '<rect x="480" y="82" width="140" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="550" y="118" text-anchor="middle" font-size="14" fill="var(--text)">lazy + cached</text>' +
          '<line x1="20" y1="212" x2="620" y2="212" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="252" font-size="15" fill="var(--accent)">useMemo: a cache keyed by a hand-written array</text>' +
          '<rect x="20" y="268" width="240" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="140" y="296" text-anchor="middle" font-size="14" fill="var(--text)">[items, query]</text>' +
          '<text x="140" y="318" text-anchor="middle" font-size="13" fill="var(--muted)">you write this list</text>' +
          '<line x1="266" y1="303" x2="314" y2="303" stroke="var(--muted)" stroke-width="2" marker-end="url(#d3a)"/>' +
          '<rect x="320" y="268" width="300" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="470" y="296" text-anchor="middle" font-size="14" fill="var(--text)">Object.is on every item</text>' +
          '<text x="470" y="318" text-anchor="middle" font-size="13" fill="var(--muted)">any change =&gt; recompute now</text>' +
          '<text x="320" y="382" text-anchor="middle" font-size="14" fill="var(--warn)">computed is lazy, useMemo runs during render</text>' +
          '</svg>',
        caption: {
          pl: 'computed to węzeł w grafie zależności: leniwy, cache dopóki źródła się nie zmienią. useMemo to zwykły cache z kluczem, który sam wypisujesz - liczy się od razu, w trakcie renderu.',
          en: 'A computed is a node in a dependency graph: lazy, cached until its sources change. useMemo is a plain cache keyed by an array you write yourself - and it computes immediately, during render.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że mama pyta cię co wieczór, ile masz w skarbonce.</p>' +
            '<p>Możesz za każdym razem wysypać wszystko na dywan i przeliczyć monety od nowa. Zajmuje to pięć minut i strasznie nudzi.</p>' +
            '<p>Możesz też zapisać wynik na karteczce przyklejonej do skarbonki. Jeśli nikt nic nie wrzucił ani nie wyjął, po prostu czytasz karteczkę. Liczysz na nowo dopiero wtedy, kiedy coś się zmieniło. To jest właśnie zapamiętywanie wyniku.</p>' +
            '<p>Vue jest jak bardzo uważny domownik: sam widzi, kiedy ktoś dotknął skarbonki, i sam zrywa karteczkę. Ty nic nie musisz mówić.</p>' +
            '<p>React jest jak domownik, który patrzy w bok. Musisz mu napisać na kartce: "przelicz, jeśli zmieni się skarbonka albo kurs walut". Jeśli o czymś zapomnisz, będzie ci podawał stary wynik z uśmiechem na twarzy.</p>',
          en: '<p>Imagine your mum asks you every evening how much is in your piggy bank.</p>' +
            '<p>You could tip everything onto the carpet and count the coins again each time. It takes five minutes and it is deeply boring.</p>' +
            '<p>Or you could write the answer on a sticky note attached to the piggy bank. If nobody added or removed anything, you just read the note. You only recount when something actually changed. That is caching a result.</p>' +
            '<p>Vue is like a very attentive housemate: it notices by itself when someone touched the piggy bank and tears the note off. You do not have to say a word.</p>' +
            '<p>React is like a housemate who is looking the other way. You have to hand them a list: "recount if the piggy bank changes, or if the exchange rate changes". Forget an item on that list and they will keep handing you the old number with a smile.</p>'
        },
        school: {
          pl: '<p>Na pierwszy rzut oka to ten sam pomysł: nie licz drugi raz tego, co się nie zmieniło.</p>' +
            '<pre><code>// Vue\n' +
            'const filtered = computed(() =&gt;\n' +
            '  items.value.filter(i =&gt; i.name.includes(query.value))\n' +
            ')</code></pre>' +
            '<pre><code>// React\n' +
            'const filtered = useMemo(\n' +
            '  () =&gt; items.filter(i =&gt; i.name.includes(query)),\n' +
            '  [items, query]\n' +
            ')</code></pre>' +
            '<p>W Vue nie pisałeś listy zależności, bo proxy zapisało, że callback czytał <code>items.value</code> i <code>query.value</code>. W Reactie musisz tę listę podać, bo React nie ma pojęcia, co przeczytałeś - zna tylko tablicę, którą mu wręczyłeś, i porównuje ją element po elemencie przez <code>Object.is</code>.</p>' +
            '<p>Są jeszcze trzy różnice, które łatwo przeoczyć.</p>' +
            '<ul>' +
            '<li><strong>Leniwość.</strong> <code>computed</code> nie policzy się, dopóki ktoś nie odczyta <code>.value</code>. <code>useMemo</code> wykonuje się w trakcie renderu, nawet jeśli wynik trafi do gałęzi, która się nie wyrenderuje.</li>' +
            '<li><strong>Gwarancje.</strong> Cache Vue jest kontraktem. Cache Reacta to podpowiedź - React ma prawo wyrzucić zapamiętany wynik, na przykład przy odmontowaniu ukrytego poddrzewa.</li>' +
            '<li><strong>Zapisywalność.</strong> <code>computed</code> z getterem i setterem obsługuje dwukierunkowe wiązanie. W Reactie nie ma czegoś takiego; zapis to zawsze wywołanie settera stanu.</li>' +
            '</ul>' +
            '<p>Najważniejsza rada praktyczna: nie owijaj wszystkiego w <code>useMemo</code> odruchowo. Zwykłe <code>const total = a + b</code> jest szybsze niż porównanie tablicy zależności. W Vue <code>computed</code> stosowałeś domyślnie, w Reactie stosujesz go świadomie.</p>' +
            '<p>Odwrotna zależność też jest prawdziwa: jeśli wartość i tak trafia do propsów komponentu owiniętego w <code>memo</code>, to <code>useMemo</code> opłaca się nawet przy tanim obliczeniu, bo chodzi wtedy o stabilną referencję, a nie o oszczędzony czas procesora.</p>',
          en: '<p>At first glance it is the same idea: do not recompute what has not changed.</p>' +
            '<pre><code>// Vue\n' +
            'const filtered = computed(() =&gt;\n' +
            '  items.value.filter(i =&gt; i.name.includes(query.value))\n' +
            ')</code></pre>' +
            '<pre><code>// React\n' +
            'const filtered = useMemo(\n' +
            '  () =&gt; items.filter(i =&gt; i.name.includes(query)),\n' +
            '  [items, query]\n' +
            ')</code></pre>' +
            '<p>In Vue you never wrote a dependency list, because the proxy recorded that the callback read <code>items.value</code> and <code>query.value</code>. In React you must supply that list, because React has no idea what you read - it only knows the array you handed it and compares it element by element with <code>Object.is</code>.</p>' +
            '<p>Three further differences are easy to miss.</p>' +
            '<ul>' +
            '<li><strong>Laziness.</strong> A <code>computed</code> does not evaluate until someone reads <code>.value</code>. A <code>useMemo</code> runs during render, even if the result goes into a branch that never renders.</li>' +
            '<li><strong>Guarantees.</strong> Vue caching is a contract. React memoisation is a hint - React is allowed to throw a cached value away, for instance when an offscreen subtree is discarded.</li>' +
            '<li><strong>Writability.</strong> A <code>computed</code> with a getter and setter supports two-way binding. React has no such thing; writing always means calling a state setter.</li>' +
            '</ul>' +
            '<p>The most useful practical rule: do not reflexively wrap everything in <code>useMemo</code>. A plain <code>const total = a + b</code> is cheaper than comparing a dependency array. In Vue you reached for <code>computed</code> by default; in React you reach for <code>useMemo</code> deliberately.</p>'
        },
        pro: {
          pl: '<p><code>useMemo</code> nie jest odpowiednikiem <code>computed</code> - jest odpowiednikiem <em>ręcznie zbudowanego</em> <code>computed</code>, bez auto-trackingu i bez leniwości. Ta różnica decyduje o tym, kiedy warto go użyć.</p>' +
            '<p><strong>Kiedy naprawdę się opłaca.</strong> Są dokładnie trzy uzasadnione powody:</p>' +
            '<ol>' +
            '<li>Obliczenie jest kosztowne - sortowanie kilku tysięcy rekordów, parsowanie, praca na dużym drzewie. Poniżej mniej więcej 1 ms zysk jest w granicach szumu.</li>' +
            '<li>Wynik jest przekazywany jako props do komponentu owiniętego w <code>memo</code> - wtedy chodzi o stabilność referencji, nie o czas liczenia.</li>' +
            '<li>Wynik trafia do tablicy zależności innego hooka i musi mieć stabilną tożsamość.</li>' +
            '</ol>' +
            '<pre><code>const rows = useMemo(\n' +
            '  () =&gt; heavySort(data, sortKey),\n' +
            '  [data, sortKey]\n' +
            ')\n' +
            '// bez memo kazdy render sortowalby od nowa i tworzyl nowa tablice</code></pre>' +
            '<p><strong>Kompilator zmienia rachunek.</strong> React Compiler (stabilny od React 19, opcjonalny plugin do bundlera) automatycznie wstawia memoizację na poziomie wartości - w praktyce dostajesz to, co Vue miało od zawsze, tylko na etapie kompilacji, a nie w runtime. W nowych projektach z włączonym kompilatorem ręczne <code>useMemo</code> staje się wyjątkiem, mniej więcej tak jak <code>v-memo</code> w Vue.</p>' +
            '<p><strong>Pułapki produkcyjne.</strong> Memoizacja po obiekcie, który i tak jest tworzony od nowa co render, to czysty koszt bez zysku - łatwo o to przy propsach z rozpakowaniem. Selektory ze store bez memoizacji (na przykład <code>useStore(s =&gt; ({ a: s.a, b: s.b }))</code> w Zustandzie) tworzą nowy obiekt przy każdym wywołaniu i wymuszają render; w Pinii tego problemu nie miałeś, bo <code>storeToRefs</code> zwraca stabilne refy.</p>' +
            '<p><strong>Wzorzec zamiast memo.</strong> Bardzo często lepszym rozwiązaniem niż memoizacja jest zmiana kształtu drzewa: wyciągnij drogi fragment do osobnego komponentu i przekaż go przez <code>children</code>. Rodzic renderuje się, dziecko nie - bez ani jednego <code>useMemo</code>. To dokładnie ta sama intuicja, którą w Vue realizowałeś slotami.</p>' +
            '<p>Na rozmowie kwalifikacyjnej różnicą, którą warto wymienić, jest leniwość i to, że memoizacja Reacta jest optymalizacją bez gwarancji - nigdy nie wolno budować na niej logiki poprawnościowej.</p>',
          en: '<p><code>useMemo</code> is not the equivalent of <code>computed</code> - it is the equivalent of a <em>hand-built</em> <code>computed</code>, with no auto-tracking and no laziness. That difference decides when it is worth using.</p>' +
            '<p><strong>When it genuinely pays.</strong> There are exactly three legitimate reasons:</p>' +
            '<ol>' +
            '<li>The computation is expensive - sorting a few thousand rows, parsing, walking a big tree. Below roughly 1 ms the win is inside the noise.</li>' +
            '<li>The result is passed as a prop to a <code>memo</code>-wrapped component - here the point is reference stability, not compute time.</li>' +
            '<li>The result feeds another hook dependency array and needs a stable identity.</li>' +
            '</ol>' +
            '<pre><code>const rows = useMemo(\n' +
            '  () =&gt; heavySort(data, sortKey),\n' +
            '  [data, sortKey]\n' +
            ')\n' +
            '// without memo every render re-sorts and produces a new array</code></pre>' +
            '<p><strong>The compiler changes the maths.</strong> React Compiler (stable with React 19, an optional bundler plugin) inserts value-level memoisation for you - in practice you get what Vue always had, only at build time instead of runtime. In new projects with the compiler on, hand-written <code>useMemo</code> becomes the exception, roughly like <code>v-memo</code> in Vue.</p>' +
            '<p><strong>Production traps.</strong> Memoising on an object that is recreated every render anyway is pure cost with no benefit - easy to hit with destructured props. Unmemoised store selectors (say <code>useStore(s =&gt; ({ a: s.a, b: s.b }))</code> in Zustand) build a new object per call and force a render; you never met this in Pinia because <code>storeToRefs</code> hands back stable refs.</p>' +
            '<p><strong>A pattern instead of memo.</strong> Very often the better fix is reshaping the tree: extract the expensive part into its own component and pass it through <code>children</code>. The parent re-renders, the child does not - without a single <code>useMemo</code>. That is exactly the instinct you exercised with slots in Vue.</p>' +
            '<p>The interview-worthy difference is laziness, plus the fact that React memoisation is an optimisation without guarantees - never build correctness on top of it.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym różni się moment wykonania computed od useMemo?',
            en: 'How does the evaluation timing of computed differ from useMemo?'
          },
          options: [
            { pl: 'computed liczy się leniwie przy odczycie, useMemo w trakcie renderu', en: 'computed evaluates lazily on read, useMemo runs during render' },
            { pl: 'Oba liczą się dopiero po zamontowaniu', en: 'Both evaluate only after mount' },
            { pl: 'computed liczy się przy każdym renderze, useMemo raz', en: 'computed runs on every render, useMemo runs once' },
            { pl: 'Oba liczą się asynchronicznie w mikrotasku', en: 'Both evaluate asynchronously in a microtask' }
          ],
          correct: 0,
          explain: {
            pl: 'computed jest leniwy: nie dotkniesz .value, nie ma obliczenia. useMemo wykonuje callback w trakcie renderu, nawet jeśli wynik nigdy nie zostanie wyświetlony.',
            en: 'A computed is lazy: no read of .value, no computation. useMemo runs its callback during render even if the result is never displayed.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w Reactie trzeba pisać tablicę zależności, a w Vue nie?',
            en: 'Why does React need a dependency array while Vue does not?'
          },
          options: [
            { pl: 'Bo React nie obsługuje obiektów zagnieżdżonych', en: 'Because React does not support nested objects' },
            { pl: 'Bo Vue śledzi odczyty przez proxy, a React nie ma żadnego trackingu', en: 'Because Vue tracks reads through proxies and React has no tracking at all' },
            { pl: 'Bo tablica zależności jest tylko po to, żeby uspokoić lintera', en: 'Because the array exists purely to satisfy the linter' },
            { pl: 'Bo React liczy zależności dopiero po pierwszym renderze', en: 'Because React infers dependencies after the first render' }
          ],
          correct: 1,
          explain: {
            pl: 'Reaktywność Vue opiera się na proxy, które notują każdy odczyt. React wykonuje zwykłą funkcję JS i nie widzi, co przeczytałeś - tablica jest jedynym źródłem tej wiedzy.',
            en: 'Vue reactivity rests on proxies that record every read. React just calls a plain JS function and cannot see what you read - the array is its only source of that knowledge.'
          }
        },
        {
          q: {
            pl: 'Który przypadek NIE jest dobrym powodem do użycia useMemo?',
            en: 'Which case is NOT a good reason to use useMemo?'
          },
          options: [
            { pl: 'Sortowanie kilku tysięcy wierszy przy każdym renderze', en: 'Sorting several thousand rows on every render' },
            { pl: 'Stabilna referencja obiektu przekazywanego do komponentu w memo', en: 'A stable object reference passed to a memo-wrapped component' },
            { pl: 'Dodanie dwóch liczb do wyświetlenia w nagłówku', en: 'Adding two numbers to display in a header' },
            { pl: 'Wynik trafiający do tablicy zależności innego hooka', en: 'A value that feeds another hook dependency array' }
          ],
          correct: 2,
          explain: {
            pl: 'Przy trywialnym obliczeniu porównanie tablicy zależności kosztuje więcej niż samo dodawanie. Memoizacja to narzędzie do drogich obliczeń i do stabilizowania referencji.',
            en: 'For a trivial computation, comparing the dependency array costs more than the addition itself. Memoisation is for expensive work and for stabilising references.'
          }
        },
        {
          q: {
            pl: 'Zespół włącza React Compiler w projekcie na React 19. Co to zmienia w praktyce?',
            en: 'A team enables React Compiler on a React 19 project. What actually changes?'
          },
          options: [
            { pl: 'Komponenty przestają się re-renderować', en: 'Components stop re-rendering' },
            { pl: 'useMemo i useCallback zostają usunięte z API Reacta', en: 'useMemo and useCallback are removed from the React API' },
            { pl: 'React zaczyna śledzić zależności przez proxy w runtime', en: 'React starts tracking dependencies with runtime proxies' },
            { pl: 'Memoizacja wstawiana jest automatycznie na etapie kompilacji, więc ręczne memo staje się wyjątkiem', en: 'Memoisation is inserted automatically at build time, so hand-written memo becomes the exception' }
          ],
          correct: 3,
          explain: {
            pl: 'Kompilator analizuje kod i sam dodaje cache dla wartości i funkcji. Nadal jest to model re-renderowania, a nie reaktywność Vue - zmienia się tylko to, kto pisze memoizację.',
            en: 'The compiler analyses the code and inserts caching for values and functions itself. It is still a re-render model, not Vue reactivity - only the author of the memoisation changes.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'usecallback-stable-references',
      title: {
        pl: 'useCallback i stabilne referencje funkcji',
        en: 'useCallback and stable function references'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'useCallback', en: 'useCallback' },
          def: {
            pl: 'Utrwala tożsamość funkcji między renderami. Sam z siebie nie przyspiesza niczego - ma sens tylko wtedy, gdy ktoś tę tożsamość porównuje.',
            en: 'Keeps a function identity stable across renders. On its own it speeds up nothing - it only matters when something compares that identity.'
          }
        },
        {
          term: { pl: 'React.memo', en: 'React.memo' },
          def: {
            pl: 'Opakowanie pomijające render dziecka, gdy wszystkie propsy są referencyjnie takie same. Jeden <code>style={{ margin: 8 }}</code> unieważnia całą sztuczkę.',
            en: 'A wrapper that skips a child render when every prop is referentially equal. A single <code>style={{ margin: 8 }}</code> undoes the whole thing.'
          }
        },
        {
          term: { pl: 'Kaskada memoizacji', en: 'Memoisation cascade' },
          def: {
            pl: 'Żeby <code>memo</code> zadziałało, musi trzymać cały łańcuch: dziecko w <code>memo</code>, każdy props stabilny, obiekty wyniesione poza render. Klasyczne pytanie rekrutacyjne o to, czemu memo nie działa.',
            en: 'For <code>memo</code> to work the whole chain must hold: the child wrapped in <code>memo</code>, every prop stable, objects hoisted out of render. The classic interview question about why memo does nothing.'
          }
        },
        {
          term: { pl: 'Wzorzec latest ref', en: 'Latest-ref pattern' },
          def: {
            pl: 'Ref trzymający najświeższą wersję callbacku plus stabilna funkcja opakowująca. Daje niezmienną tożsamość bez stale closure, gdy callback idzie do biblioteki zewnętrznej.',
            en: 'A ref holding the newest version of a callback plus a stable wrapper function. Gives a fixed identity without a stale closure when the callback goes to an external library.'
          }
        },
        {
          term: { pl: 'useEffectEvent', en: 'useEffectEvent' },
          def: {
            pl: 'Eksperymentalny hook, który standaryzuje wzorzec latest ref: stabilna funkcja czytająca zawsze bieżące propsy i stan.',
            en: 'An experimental hook standardising the latest-ref pattern: a stable function that always reads current props and state.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--accent)">Without useCallback</text>' +
          '<rect x="20" y="46" width="170" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="76" text-anchor="middle" font-size="14" fill="var(--text)">render #1</text>' +
          '<text x="105" y="98" text-anchor="middle" font-size="13" fill="var(--muted)">onSave = fn A</text>' +
          '<line x1="196" y1="79" x2="234" y2="79" stroke="var(--muted)" stroke-width="2" marker-end="url(#d4a)"/>' +
          '<rect x="240" y="46" width="170" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="325" y="76" text-anchor="middle" font-size="14" fill="var(--text)">render #2</text>' +
          '<text x="325" y="98" text-anchor="middle" font-size="13" fill="var(--muted)">onSave = fn B</text>' +
          '<line x1="416" y1="79" x2="454" y2="79" stroke="var(--muted)" stroke-width="2" marker-end="url(#d4a)"/>' +
          '<rect x="460" y="46" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="540" y="76" text-anchor="middle" font-size="14" fill="var(--text)">memo child</text>' +
          '<text x="540" y="98" text-anchor="middle" font-size="13" fill="var(--muted)">A !== B, re-renders</text>' +
          '<line x1="20" y1="152" x2="620" y2="152" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="192" font-size="15" fill="var(--ok)">With useCallback(fn, deps)</text>' +
          '<rect x="20" y="208" width="170" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="238" text-anchor="middle" font-size="14" fill="var(--text)">render #1</text>' +
          '<text x="105" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">onSave = fn A</text>' +
          '<line x1="196" y1="241" x2="234" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#d4a)"/>' +
          '<rect x="240" y="208" width="170" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="325" y="238" text-anchor="middle" font-size="14" fill="var(--text)">render #2</text>' +
          '<text x="325" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">onSave = fn A</text>' +
          '<line x1="416" y1="241" x2="454" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#d4a)"/>' +
          '<rect x="460" y="208" width="160" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="540" y="238" text-anchor="middle" font-size="14" fill="var(--text)">memo child</text>' +
          '<text x="540" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">skips render</text>' +
          '<text x="320" y="330" text-anchor="middle" font-size="14" fill="var(--warn)">useCallback alone does nothing - the child must be memo</text>' +
          '<text x="320" y="368" text-anchor="middle" font-size="14" fill="var(--muted)">In Vue methods live on the instance and never change identity</text>' +
          '</svg>',
        caption: {
          pl: 'Funkcja zdefiniowana w komponencie Reacta ma nową tożsamość przy każdym renderze. useCallback ją stabilizuje, ale zysk pojawia się dopiero wtedy, gdy dziecko faktycznie porównuje propsy.',
          en: 'A function defined inside a React component gets a new identity on every render. useCallback stabilises it, but the payoff only exists when the child actually compares props.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że masz przyjaciela, który mieszka w tym samym domu od dziesięciu lat. Znasz jego adres na pamięć, nigdy się nie zmienia. Kiedy listonosz przynosi list, od razu wie, gdzie iść. Tak działają funkcje w Vue - mają jeden stały adres.</p>' +
            '<p>A teraz wyobraź sobie kolegę, który co tydzień się przeprowadza. Ta sama osoba, ten sam charakter, ten sam numer telefonu - ale inny adres. Listonosz za każdym razem musi sprawdzać wszystko od nowa, bo widzi nowy adres i myśli: "aha, coś się zmieniło, trzeba się tym zająć". Tak działają funkcje w Reactie.</p>' +
            '<p>useCallback to umowa z tym kolegą: "przeprowadzaj się tylko wtedy, kiedy naprawdę coś się w twoim życiu zmieni". Wtedy listonosz może spokojnie machnąć ręką i pójść dalej.</p>' +
            '<p>Ale uwaga: to działa tylko wtedy, gdy listonosz w ogóle sprawdza adresy. Jeśli i tak puka do wszystkich drzwi po kolei, umowa nic nie daje.</p>',
          en: '<p>Imagine you have a friend who has lived in the same house for ten years. You know the address by heart and it never changes. When the postman brings a letter he knows exactly where to go. That is how functions behave in Vue - one fixed address.</p>' +
            '<p>Now imagine a friend who moves house every week. Same person, same personality, same phone number - but a different address. Every single time, the postman has to check everything again, because he sees a new address and thinks "something changed here, better deal with it". That is how functions behave in React.</p>' +
            '<p>useCallback is a deal with that friend: "only move when something in your life really changes". Then the postman can shrug and walk on.</p>' +
            '<p>But careful: this only helps if the postman checks addresses at all. If he knocks on every door regardless, the deal buys you nothing.</p>'
        },
        school: {
          pl: '<p>W Vue metoda albo funkcja zdefiniowana w <code>setup</code> powstaje raz i żyje tak długo jak komponent. Jej tożsamość jest stała, więc nikt nigdy nie zastanawia się nad "referencją funkcji".</p>' +
            '<pre><code>// Vue - setup wykonuje sie raz\n' +
            'function save(payload) {\n' +
            '  api.save(payload)\n' +
            '}\n' +
            '// &lt;Child :on-save="save" /&gt; - zawsze ta sama funkcja</code></pre>' +
            '<p>W Reactie ciało komponentu wykonuje się przy każdym renderze, więc literał funkcyjny to za każdym razem nowy obiekt.</p>' +
            '<pre><code>// React\n' +
            'const save = useCallback((payload) =&gt; {\n' +
            '  api.save(payload)\n' +
            '}, [])\n' +
            '// &lt;Child onSave={save} /&gt; - stabilna referencja</code></pre>' +
            '<p>W Vue nie musiałeś nic robić, bo <code>setup</code> odpalał się raz. W Reactie musisz świadomie zamrozić funkcję, bo inaczej każdy render tworzy nową i wszystko, co porównuje propsy albo zależności, uzna to za zmianę.</p>' +
            '<p>Kluczowa rzecz, którą wielu ludzi rozumie za późno: <strong>samo useCallback nie przyspiesza niczego</strong>. Zysk pojawia się dopiero, gdy odbiorca funkcji ją porównuje. Są dokładnie trzy tacy odbiorcy:</p>' +
            '<ul>' +
            '<li>komponent potomny owinięty w <code>React.memo</code>,</li>' +
            '<li>tablica zależności innego hooka (<code>useEffect</code>, <code>useMemo</code>),</li>' +
            '<li>zewnętrzna subskrypcja, którą rejestrujesz i wyrejestrowujesz po referencji.</li>' +
            '</ul>' +
            '<p>Jeśli przekazujesz funkcję do zwykłego <code>&lt;button onClick={...}&gt;</code>, <code>useCallback</code> jest czystym narzutem: dodatkowa tablica, dodatkowe porównanie, zero korzyści.</p>' +
            '<p>Dlatego w Reactie warto najpierw zapytać, kto tę funkcję porównuje, a dopiero potem sięgać po hooka. W Vue takie pytanie nie miało sensu, bo tożsamość funkcji nigdy nie brała udziału w decyzji o odświeżeniu widoku.</p>',
          en: '<p>In Vue, a method or a function defined in <code>setup</code> is created once and lives as long as the component. Its identity is fixed, so nobody ever thinks about "function references".</p>' +
            '<pre><code>// Vue - setup runs once\n' +
            'function save(payload) {\n' +
            '  api.save(payload)\n' +
            '}\n' +
            '// &lt;Child :on-save="save" /&gt; - always the same function</code></pre>' +
            '<p>In React the component body runs on every render, so a function literal is a brand new object each time.</p>' +
            '<pre><code>// React\n' +
            'const save = useCallback((payload) =&gt; {\n' +
            '  api.save(payload)\n' +
            '}, [])\n' +
            '// &lt;Child onSave={save} /&gt; - stable reference</code></pre>' +
            '<p>In Vue you did nothing because <code>setup</code> ran once. In React you must freeze the function deliberately, otherwise every render mints a new one and anything comparing props or dependencies calls it a change.</p>' +
            '<p>The key point people learn too late: <strong>useCallback on its own speeds up nothing</strong>. The benefit exists only when the consumer compares the function. There are exactly three such consumers:</p>' +
            '<ul>' +
            '<li>a child wrapped in <code>React.memo</code>,</li>' +
            '<li>the dependency array of another hook (<code>useEffect</code>, <code>useMemo</code>),</li>' +
            '<li>an external subscription you add and remove by reference.</li>' +
            '</ul>' +
            '<p>If you are handing the function to a plain <code>&lt;button onClick={...}&gt;</code>, <code>useCallback</code> is pure overhead: an extra array, an extra comparison, no gain.</p>'
        },
        pro: {
          pl: '<p>Referencyjna niestabilność to podatek, który React płaci za model "komponent to funkcja". Vue tego podatku nie płaci, bo <code>setup</code> jest jednorazowy - i właśnie dlatego cała rodzina <code>memo</code> / <code>useCallback</code> / <code>useMemo</code> nie ma w Vue odpowiednika poza <code>v-memo</code>.</p>' +
            '<p><strong>Kaskada memoizacji.</strong> Realny problem nie polega na jednym <code>useCallback</code>, tylko na tym, że żeby zadziałał, musi być spełniony cały łańcuch: dziecko owinięte w <code>memo</code>, wszystkie jego propsy stabilne, obiekty stylów wyciągnięte poza render. Wystarczy jeden <code>style={{ margin: 8 }}</code>, żeby zniweczyć całą pracę. To bardzo częsty temat na rozmowach: "dlaczego memo nie działa".</p>' +
            '<p><strong>Wzorzec latest ref.</strong> Gdy potrzebujesz funkcji o stałej tożsamości, ale zawsze widzącej świeży stan (callbacki do zewnętrznych bibliotek, mapy, edytory, WebSocket), <code>useCallback</code> z pustą tablicą złapie stale closure. Rozwiązaniem jest ref trzymający najnowszą wersję:</p>' +
            '<pre><code>const cbRef = useRef(onEvent)\n' +
            'useLayoutEffect(() =&gt; { cbRef.current = onEvent })\n' +
            'const stable = useCallback((...args) =&gt; cbRef.current(...args), [])</code></pre>' +
            '<p>To jest ręczna wersja tego, co w RFC nazywano <code>useEvent</code>, a co dziś w dokumentacji figuruje jako eksperymentalny <code>useEffectEvent</code>. W Vue nie potrzebowałeś tego nigdy, bo funkcja z <code>setup</code> zawsze czytała aktualne refy.</p>' +
            '<p><strong>Alternatywy zamiast memoizacji.</strong> Zanim dosypiesz <code>useCallback</code>, sprawdź trzy tańsze ruchy: przenieś stan niżej, tam gdzie faktycznie żyje; przekaż drogie poddrzewo przez <code>children</code>, żeby rodzic nie odtwarzał jego elementów; przenieś funkcję poza komponent, jeśli nie domyka się nad niczym. <code>dispatch</code> z <code>useReducer</code> i settery z <code>useState</code> są stabilne z definicji i nie wymagają owijania.</p>' +
            '<p><strong>Miara zamiast przeczuć.</strong> Zanim uznasz, że problemem jest tożsamość funkcji, włącz React DevTools Profiler i sprawdź, ile faktycznie kosztuje sporny render. Bardzo często okazuje się, że komponent renderuje się w pół milisekundy, a prawdziwym winowajcą jest zupełnie inne poddrzewo albo synchroniczny layout thrashing.</p>' +
            '<p><strong>React Compiler.</strong> Z włączonym kompilatorem większość <code>useCallback</code> staje się zbędna - kompilator sam utrzymuje cache tożsamości. W istniejących projektach zostawia się je jednak w spokoju: usuwanie memoizacji "bo kompilator" bez profilowania to najlepszy sposób na regresję wydajności tuż przed wydaniem.</p>',
          en: '<p>Reference instability is the tax React pays for the "a component is a function" model. Vue never pays it, because <code>setup</code> runs once - which is exactly why the whole <code>memo</code> / <code>useCallback</code> / <code>useMemo</code> family has no Vue counterpart beyond <code>v-memo</code>.</p>' +
            '<p><strong>The memoisation cascade.</strong> The real problem is never one <code>useCallback</code>; it is that the whole chain must hold: the child wrapped in <code>memo</code>, every one of its props stable, style objects hoisted out of render. A single <code>style={{ margin: 8 }}</code> undoes all of it. This is a classic interview question: "why is my memo not working".</p>' +
            '<p><strong>The latest-ref pattern.</strong> When you need a function with a fixed identity that still sees fresh state (callbacks handed to external libraries, maps, editors, sockets), <code>useCallback</code> with an empty array captures a stale closure. The fix is a ref holding the newest version:</p>' +
            '<pre><code>const cbRef = useRef(onEvent)\n' +
            'useLayoutEffect(() =&gt; { cbRef.current = onEvent })\n' +
            'const stable = useCallback((...args) =&gt; cbRef.current(...args), [])</code></pre>' +
            '<p>This is the manual version of what the RFC called <code>useEvent</code> and what the docs now list as the experimental <code>useEffectEvent</code>. You never needed it in Vue, because a function from <code>setup</code> always read current refs.</p>' +
            '<p><strong>Alternatives before memoisation.</strong> Before adding another <code>useCallback</code>, try three cheaper moves: push state down to where it actually lives; pass the expensive subtree through <code>children</code> so the parent does not recreate its elements; hoist the function out of the component if it closes over nothing. <code>dispatch</code> from <code>useReducer</code> and <code>useState</code> setters are stable by definition and never need wrapping.</p>' +
            '<p><strong>React Compiler.</strong> With the compiler on, most <code>useCallback</code> calls become redundant - it maintains identity caches itself. In existing codebases you still leave them alone: stripping memoisation "because compiler" without profiling is a reliable way to ship a performance regression.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego w Vue nikt nie martwi się tożsamością funkcji, a w Reactie tak?',
            en: 'Why does nobody worry about function identity in Vue, while React developers do?'
          },
          options: [
            { pl: 'Bo Vue kompiluje funkcje do stringów', en: 'Because Vue compiles functions into strings' },
            { pl: 'Bo setup wykonuje się raz, więc funkcja powstaje raz', en: 'Because setup runs once, so the function is created once' },
            { pl: 'Bo Vue porównuje funkcje po ich treści', en: 'Because Vue compares functions by their source text' },
            { pl: 'Bo Vue nie przekazuje funkcji przez propsy', en: 'Because Vue does not pass functions through props' }
          ],
          correct: 1,
          explain: {
            pl: 'W Vue setup uruchamia się raz na instancję i tworzy funkcje raz. W Reactie ciało komponentu wykonuje się przy każdym renderze, więc każdy literał funkcyjny to nowy obiekt.',
            en: 'Vue runs setup once per instance and creates functions once. React re-runs the component body on every render, so each function literal is a new object.'
          }
        },
        {
          q: {
            pl: 'Owijasz handler w useCallback, ale dziecko nadal renderuje się przy każdym renderze rodzica. Najbardziej prawdopodobna przyczyna?',
            en: 'You wrap a handler in useCallback but the child still re-renders with every parent render. Most likely cause?'
          },
          options: [
            { pl: 'Tablica zależności jest pusta', en: 'The dependency array is empty' },
            { pl: 'useCallback działa tylko w komponentach klasowych', en: 'useCallback only works in class components' },
            { pl: 'Dziecko nie jest owinięte w memo albo dostaje inny niestabilny props', en: 'The child is not wrapped in memo, or receives another unstable prop' },
            { pl: 'Handler jest asynchroniczny', en: 'The handler is async' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez React.memo dziecko renderuje się zawsze razem z rodzicem. A nawet z memo wystarczy jeden niestabilny props, na przykład obiekt stylu tworzony inline, żeby porównanie zawiodło.',
            en: 'Without React.memo the child always re-renders with its parent. Even with memo, one unstable prop such as an inline style object is enough to break the comparison.'
          }
        },
        {
          q: {
            pl: 'Które z tych referencji są stabilne między renderami bez żadnego owijania?',
            en: 'Which of these are stable across renders without any wrapping?'
          },
          options: [
            { pl: 'setter z useState i dispatch z useReducer', en: 'the useState setter and the useReducer dispatch' },
            { pl: 'każda funkcja strzałkowa w ciele komponentu', en: 'every arrow function in the component body' },
            { pl: 'obiekty literalne przekazywane w propsach', en: 'object literals passed as props' },
            { pl: 'wynik useMemo bez tablicy zależności', en: 'the result of useMemo with no dependency array' }
          ],
          correct: 0,
          explain: {
            pl: 'React gwarantuje stałą tożsamość setterów stanu i funkcji dispatch, dlatego linter nie wymaga ich w tablicach zależności. Wszystko inne trzeba stabilizować samodzielnie.',
            en: 'React guarantees stable identities for state setters and dispatch, which is why the linter does not require them in dependency arrays. Everything else you stabilise yourself.'
          }
        },
        {
          q: {
            pl: 'Potrzebujesz callbacku o stałej tożsamości dla biblioteki mapy, ale widzącego zawsze aktualny stan. Co robisz?',
            en: 'You need a fixed-identity callback for a mapping library that must always see current state. What do you do?'
          },
          options: [
            { pl: 'useCallback z pustą tablicą zależności', en: 'useCallback with an empty dependency array' },
            { pl: 'Wymieniasz cały stan w tablicy zależności', en: 'List all of the state in the dependency array' },
            { pl: 'Trzymasz najnowszą funkcję w ref i wołasz ją przez stabilny wrapper', en: 'Keep the latest function in a ref and call it through a stable wrapper' },
            { pl: 'Przenosisz funkcję poza komponent', en: 'Move the function outside the component' }
          ],
          correct: 2,
          explain: {
            pl: 'Pusta tablica daje stabilność, ale zamraża stan; pełna tablica psuje stabilność. Wzorzec latest ref - aktualizowany w efekcie ref plus stały wrapper - daje jedno i drugie i jest podstawą eksperymentalnego useEffectEvent.',
            en: 'An empty array is stable but freezes state; a full array destroys stability. The latest-ref pattern - a ref updated in an effect plus a fixed wrapper - gives you both, and underpins the experimental useEffectEvent.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'custom-hooks-vs-composables',
      title: {
        pl: 'Własne hooki kontra composables',
        en: 'Custom hooks vs composables'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Custom hook', en: 'Custom hook' },
          def: {
            pl: 'Zwykła funkcja o nazwie zaczynającej się od <code>use</code>, która woła inne hooki. Odpowiednik composable: jedno zadanie, argumenty na wejściu, minimalna powierzchnia zwracana.',
            en: 'A plain function whose name starts with <code>use</code> and which calls other hooks. The composable equivalent: one job, arguments in, a minimal returned surface.'
          }
        },
        {
          term: { pl: 'Zasady hooków', en: 'Rules of Hooks' },
          def: {
            pl: 'Hooki wołasz zawsze na najwyższym poziomie i zawsze w tej samej kolejności, bo są dopasowywane po indeksie. Hook wołany warunkowo to gwarantowana awaria, nie kwestia stylu.',
            en: 'Call hooks at the top level and always in the same order, because they are matched by index. A conditionally called hook is a guaranteed crash, not a style issue.'
          }
        },
        {
          term: { pl: 'Hook nie współdzieli stanu', en: 'Hooks do not share state' },
          def: {
            pl: 'Dwa komponenty wołające <code>useCart()</code> mają dwa niezależne koszyki. Współdzielenie daje dopiero podniesiony stan z <code>Context</code>, store albo <code>useSyncExternalStore</code>.',
            en: 'Two components calling <code>useCart()</code> hold two independent carts. Sharing comes only from lifted state plus <code>Context</code>, a store, or <code>useSyncExternalStore</code>.'
          }
        },
        {
          term: { pl: 'renderHook', en: 'renderHook' },
          def: {
            pl: 'Narzędzie z Testing Library do testowania hooka bez pisania komponentu-hosta, odpowiednik montowania hosta dla composable.',
            en: 'The Testing Library utility for testing a hook without writing a host component - the counterpart of mounting a host for a composable.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--accent2)">Composable: called once per instance</text>' +
          '<rect x="20" y="46" width="200" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="120" y="76" text-anchor="middle" font-size="14" fill="var(--text)">setup()</text>' +
          '<text x="120" y="98" text-anchor="middle" font-size="13" fill="var(--muted)">useMouse() runs once</text>' +
          '<line x1="226" y1="81" x2="284" y2="81" stroke="var(--muted)" stroke-width="2" marker-end="url(#d5a)"/>' +
          '<rect x="290" y="46" width="330" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="455" y="76" text-anchor="middle" font-size="14" fill="var(--text)">returns refs, kept alive by the scope</text>' +
          '<text x="455" y="98" text-anchor="middle" font-size="13" fill="var(--muted)">order and conditions do not matter</text>' +
          '<line x1="20" y1="152" x2="620" y2="152" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="20" y="192" font-size="15" fill="var(--accent)">Hook: called on every render</text>' +
          '<rect x="20" y="208" width="200" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="120" y="238" text-anchor="middle" font-size="14" fill="var(--text)">render #n</text>' +
          '<text x="120" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">useMouse() runs again</text>' +
          '<line x1="226" y1="243" x2="284" y2="243" stroke="var(--muted)" stroke-width="2" marker-end="url(#d5a)"/>' +
          '<rect x="290" y="208" width="330" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="455" y="238" text-anchor="middle" font-size="14" fill="var(--text)">reads hook slots 1, 2, 3 in order</text>' +
          '<text x="455" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">no ifs, no loops, no early return</text>' +
          '<text x="320" y="332" text-anchor="middle" font-size="14" fill="var(--ok)">Both: plain functions, shared logic, private state per caller</text>' +
          '<text x="320" y="370" text-anchor="middle" font-size="14" fill="var(--muted)">Neither shares state between components on its own</text>' +
          '</svg>',
        caption: {
          pl: 'Composable wywołuje się raz w setup, więc kolejność i warunki nie mają znaczenia. Hook wywołuje się przy każdym renderze i identyfikuje swój stan po kolejności - stąd reguły hooków.',
          en: 'A composable runs once in setup, so order and conditions are irrelevant. A hook runs on every render and identifies its state by call order - hence the rules of hooks.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie przepis na naleśniki zapisany na kartce. Kartka jest jedna, ale każdy, kto z niej korzysta, ma własną miskę, własne jajka i własny bałagan w kuchni. Przepis niczego nie posiada - tylko mówi, co robić.</p>' +
            '<p>Tak działają i hooki w Reactie, i composables w Vue. To zwykłe przepisy na kawałek zachowania: "śledź pozycję myszki", "pobierz dane", "zapamiętaj coś w przeglądarce". Każdy komponent, który z nich korzysta, dostaje własną kopię wszystkiego.</p>' +
            '<p>Jest jedna śmieszna różnica. Przepis Vue czytasz raz, na początku gotowania, i potem już tylko gotujesz. Przepis Reacta czytasz od nowa za każdym razem, kiedy ktoś zajrzy do kuchni - i to całą kartkę od góry, w tej samej kolejności. Dlatego w Reactie nie wolno pomijać kroków ani czytać ich raz tak, raz inaczej. React liczy kroki i po numerach odnajduje twoje rzeczy.</p>',
          en: '<p>Imagine a pancake recipe on a card. There is one card, but everyone who uses it has their own bowl, their own eggs and their own mess in the kitchen. The recipe owns nothing - it only says what to do.</p>' +
            '<p>That is what React hooks and Vue composables both are. Plain recipes for a piece of behaviour: "track the mouse", "fetch some data", "remember this in the browser". Every component that uses one gets its own private copy of everything.</p>' +
            '<p>There is one funny difference. You read the Vue recipe once, at the start of cooking, and after that you just cook. You read the React recipe again every single time somebody looks into the kitchen - the whole card, from the top, in the same order. That is why in React you must never skip steps or read them in a different order. React counts the steps and finds your things by their number.</p>'
        },
        school: {
          pl: '<p>Ta para jest najbliższym odpowiednikiem w całym module. Jedno i drugie to zwykła funkcja, która zamyka w sobie kawałek logiki ze stanem, a każdy wywołujący dostaje własną, prywatną instancję.</p>' +
            '<pre><code>// Vue - composable\n' +
            'export function useMouse() {\n' +
            '  const x = ref(0)\n' +
            '  const y = ref(0)\n' +
            '  const move = e =&gt; { x.value = e.pageX; y.value = e.pageY }\n' +
            '  onMounted(() =&gt; window.addEventListener("mousemove", move))\n' +
            '  onUnmounted(() =&gt; window.removeEventListener("mousemove", move))\n' +
            '  return { x, y }\n' +
            '}</code></pre>' +
            '<pre><code>// React - custom hook\n' +
            'export function useMouse() {\n' +
            '  const [pos, setPos] = useState({ x: 0, y: 0 })\n' +
            '  useEffect(() =&gt; {\n' +
            '    const move = e =&gt; setPos({ x: e.pageX, y: e.pageY })\n' +
            '    window.addEventListener("mousemove", move)\n' +
            '    return () =&gt; window.removeEventListener("mousemove", move)\n' +
            '  }, [])\n' +
            '  return pos\n' +
            '}</code></pre>' +
            '<p>Różnice są trzy i wszystkie wynikają z modelu wykonania. W Vue funkcja wykonuje się raz, więc możesz ją wywołać warunkowo, w pętli albo w bloku <code>if</code>. W Reactie funkcja wykonuje się przy każdym renderze, a stan jest identyfikowany po kolejności wywołań hooków - dlatego obowiązują reguły hooków: tylko na najwyższym poziomie, tylko w komponentach i innych hookach.</p>' +
            '<p>Druga różnica to kształt zwracanej wartości. Composable zwraca refy, więc destrukturyzacja nie psuje reaktywności. Hook zwraca zwykłe wartości - kopie z tego renderu - więc destrukturyzacja jest nie tylko dozwolona, ale naturalna.</p>' +
            '<p>Trzecia: konwencja nazewnicza <code>use</code> w Vue jest tylko dobrym zwyczajem, a w Reactie to sygnał dla lintera i kompilatora. Nazwij hook <code>getMouse</code>, a stracisz połowę narzędzi.</p>',
          en: '<p>This pair is the closest match in the whole module. Both are plain functions that wrap a piece of stateful logic, and every caller gets its own private instance.</p>' +
            '<pre><code>// Vue - composable\n' +
            'export function useMouse() {\n' +
            '  const x = ref(0)\n' +
            '  const y = ref(0)\n' +
            '  const move = e =&gt; { x.value = e.pageX; y.value = e.pageY }\n' +
            '  onMounted(() =&gt; window.addEventListener("mousemove", move))\n' +
            '  onUnmounted(() =&gt; window.removeEventListener("mousemove", move))\n' +
            '  return { x, y }\n' +
            '}</code></pre>' +
            '<pre><code>// React - custom hook\n' +
            'export function useMouse() {\n' +
            '  const [pos, setPos] = useState({ x: 0, y: 0 })\n' +
            '  useEffect(() =&gt; {\n' +
            '    const move = e =&gt; setPos({ x: e.pageX, y: e.pageY })\n' +
            '    window.addEventListener("mousemove", move)\n' +
            '    return () =&gt; window.removeEventListener("mousemove", move)\n' +
            '  }, [])\n' +
            '  return pos\n' +
            '}</code></pre>' +
            '<p>There are three differences and all of them come from the execution model. In Vue the function runs once, so you may call it conditionally, in a loop, or inside an <code>if</code>. In React the function runs on every render and its state is identified by hook call order - hence the rules of hooks: top level only, components and other hooks only.</p>' +
            '<p>The second difference is the shape of the return value. A composable returns refs, so destructuring does not break reactivity. A hook returns plain values - copies from this render - so destructuring is not just allowed, it is the natural thing to do.</p>' +
            '<p>Third: the <code>use</code> naming convention is merely good manners in Vue, while in React it is a signal to the linter and the compiler. Name your hook <code>getMouse</code> and you lose half of your tooling.</p>'
        },
        pro: {
          pl: '<p>Jeżeli szukasz jednego miejsca, w którym twoja wiedza z Vue przenosi się jeden do jednego, to właśnie tutaj. Zasady projektowania composables - jedno zadanie, przyjmuj argumenty, zwracaj minimalny interfejs, sprzątaj po sobie - obowiązują w hookach bez żadnej zmiany. VueUse i usehooks-ts to zresztą niemal ten sam katalog rozwiązań.</p>' +
            '<p><strong>Argumenty reaktywne.</strong> W Vue composable często przyjmował <code>MaybeRefOrGetter</code> i normalizował go przez <code>toValue</code>, bo argument musiał pozostać żywy między renderami. W Reactie ten problem znika: hook dostaje świeże wartości przy każdym renderze, bo cały czas jest wołany na nowo. Przekazujesz zwykły string, a nie ref.</p>' +
            '<pre><code>// Vue\n' +
            'function useUser(id) { watch(() =&gt; toValue(id), load, { immediate: true }) }\n' +
            '// React\n' +
            'function useUser(id) { useEffect(() =&gt; { load(id) }, [id]) }</code></pre>' +
            '<p><strong>Czego hook nie robi.</strong> Ani hook, ani composable nie dzielą stanu między komponentami. Dwa komponenty wołające <code>useCart()</code> mają dwa niezależne koszyki. Współdzielenie osiąga się przez stan podniesiony wyżej i <code>Context</code>, przez store (Zustand, Jotai, Redux Toolkit) albo przez <code>useSyncExternalStore</code>. W Vue mogłeś oszukać: moduł-singleton z <code>ref</code> poza funkcją działał jako globalny store, bo reaktywność żyje poza komponentem. W Reactie ten sam trik nie zadziała - moduł nie powiadomi Reacta o zmianie, dopóki nie podepniesz subskrypcji.</p>' +
            '<p><strong>Zwracany kształt.</strong> Krotka (jak <code>useState</code>) jest dobra dla dokładnie dwóch wartości, które wołający będzie chciał nazwać po swojemu. Powyżej tego zwracaj obiekt. Zadbaj o stabilność referencji zwracanych funkcji, jeśli spodziewasz się, że trafią do tablic zależności - albo od razu zwracaj <code>dispatch</code>.</p>' +
            '<p><strong>Testy i pułapki.</strong> Hooki testuje się przez <code>renderHook</code> z Testing Library, tak jak composables przez zamontowanie komponentu-hosta. Najczęstsze błędy produkcyjne: hook czytający <code>window</code> podczas renderu (wybucha w SSR w Next.js - w Nuxt miałeś ten sam problem z <code>process.client</code>), hook z rosnącym zbiorem zależności, który re-subskrybuje przy każdym renderze, oraz hook, który wewnątrz woła kolejny hook warunkowo. Ten ostatni nie jest kwestią stylu - to gwarantowana awaria po pierwszym warunku, który zmieni wartość.</p>',
          en: '<p>If there is one place where your Vue knowledge transfers one-to-one, this is it. The design rules for composables - one job, take arguments, return a minimal surface, clean up after yourself - apply to hooks unchanged. VueUse and usehooks-ts are essentially the same catalogue twice.</p>' +
            '<p><strong>Reactive arguments.</strong> In Vue a composable often accepted a <code>MaybeRefOrGetter</code> and normalised it with <code>toValue</code>, because the argument had to stay alive between renders. That problem disappears in React: the hook receives fresh values on every render because it is being called again anyway. You pass a plain string, not a ref.</p>' +
            '<pre><code>// Vue\n' +
            'function useUser(id) { watch(() =&gt; toValue(id), load, { immediate: true }) }\n' +
            '// React\n' +
            'function useUser(id) { useEffect(() =&gt; { load(id) }, [id]) }</code></pre>' +
            '<p><strong>What a hook does not do.</strong> Neither hooks nor composables share state between components. Two components calling <code>useCart()</code> hold two independent carts. Sharing comes from lifted state plus <code>Context</code>, from a store (Zustand, Jotai, Redux Toolkit), or from <code>useSyncExternalStore</code>. In Vue you could cheat: a module singleton with a <code>ref</code> outside the function worked as a global store, because reactivity lives outside the component. The same trick fails in React - the module cannot tell React anything until you wire up a subscription.</p>' +
            '<p><strong>Return shape.</strong> A tuple (like <code>useState</code>) is right for exactly two values the caller will want to rename. Beyond that, return an object. Keep returned functions referentially stable if you expect them to land in dependency arrays - or just return <code>dispatch</code>.</p>' +
            '<p><strong>Testing and traps.</strong> Hooks are tested with <code>renderHook</code> from Testing Library, much as composables are tested by mounting a host component. The common production failures: a hook reading <code>window</code> during render (it explodes under Next.js SSR - the same trouble you had with <code>process.client</code> in Nuxt), a hook with a growing dependency set that re-subscribes on every render, and a hook that calls another hook conditionally. That last one is not a style issue - it is a guaranteed crash the first time the condition flips.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ile razy wykonuje się ciało własnego hooka w porównaniu z ciałem composable?',
            en: 'How often does a custom hook body run compared with a composable body?'
          },
          options: [
            { pl: 'Oba raz na instancję komponentu', en: 'Both once per component instance' },
            { pl: 'Hook przy każdym renderze, composable raz w setup', en: 'The hook on every render, the composable once in setup' },
            { pl: 'Hook raz, composable przy każdej zmianie danych', en: 'The hook once, the composable on every data change' },
            { pl: 'Oba przy każdym renderze', en: 'Both on every render' }
          ],
          correct: 1,
          explain: {
            pl: 'Composable jest częścią jednorazowego setup. Hook to zwykłe wywołanie funkcji w ciele komponentu, więc powtarza się przy każdym renderze - stąd reguły kolejności.',
            en: 'A composable is part of the one-shot setup. A hook is just a function call in the component body, so it repeats on every render - hence the ordering rules.'
          }
        },
        {
          q: {
            pl: 'Dwa komponenty wołają useCart(). Co dostają?',
            en: 'Two components both call useCart(). What do they get?'
          },
          options: [
            { pl: 'Wspólny stan, bo hooki są globalne', en: 'Shared state, because hooks are global' },
            { pl: 'Wspólny stan tylko wtedy, gdy hook używa useRef', en: 'Shared state only if the hook uses useRef' },
            { pl: 'Dwie niezależne kopie stanu', en: 'Two independent copies of the state' },
            { pl: 'Błąd o zduplikowanym hooku', en: 'A duplicate-hook error' }
          ],
          correct: 2,
          explain: {
            pl: 'Hook to przepis, nie singleton - dokładnie jak composable. Współdzielenie wymaga Contextu, store albo useSyncExternalStore.',
            en: 'A hook is a recipe, not a singleton - exactly like a composable. Sharing requires Context, a store, or useSyncExternalStore.'
          }
        },
        {
          q: {
            pl: 'Dlaczego hooka nie wolno wywołać wewnątrz if, skoro composable można?',
            en: 'Why can a hook not be called inside an if, when a composable can?'
          },
          options: [
            { pl: 'Bo React identyfikuje stan hooka po kolejności wywołań w renderze', en: 'Because React identifies hook state by call order within a render' },
            { pl: 'Bo instrukcje warunkowe nie działają w JSX', en: 'Because conditionals do not work in JSX' },
            { pl: 'Bo linter nie potrafi sparsować bloków if', en: 'Because the linter cannot parse if blocks' },
            { pl: 'Bo hooki są asynchroniczne', en: 'Because hooks are asynchronous' }
          ],
          correct: 0,
          explain: {
            pl: 'React trzyma listę slotów na fiberze i przypisuje je po indeksie. Pominięcie hooka przesuwa całą listę i twój useState nagle czyta cudzy stan.',
            en: 'React keeps a list of slots on the fiber and matches them by index. Skipping a hook shifts the whole list and your useState suddenly reads somebody else state.'
          }
        },
        {
          q: {
            pl: 'W Vue robiłeś globalny store, deklarując ref poza funkcją composable. Dlaczego ten trik nie działa w Reactie?',
            en: 'In Vue you built a global store by declaring a ref outside the composable. Why does that trick fail in React?'
          },
          options: [
            { pl: 'Bo ES modules nie działają w Reactie', en: 'Because ES modules do not work in React' },
            { pl: 'Bo React zabrania stanu poza komponentem', en: 'Because React forbids state outside components' },
            { pl: 'Bo zmienna modułowa nie powiadomi Reacta o zmianie, dopóki nie podepniesz subskrypcji', en: 'Because a module variable cannot notify React of a change until you wire a subscription' },
            { pl: 'Bo React czyści moduły przy każdym renderze', en: 'Because React resets modules on every render' }
          ],
          correct: 2,
          explain: {
            pl: 'Reaktywność Vue żyje w samych danych, więc singleton z ref po prostu działa. React nie ma trackingu - potrzebujesz Contextu, store z subskrypcją albo useSyncExternalStore, żeby render w ogóle się odbył.',
            en: 'Vue reactivity lives in the data itself, so a ref singleton simply works. React has no tracking - you need Context, a subscribing store, or useSyncExternalStore before any render happens.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 6
    {
      id: 'useref-and-dom',
      title: {
        pl: 'useRef i dostęp do DOM',
        en: 'useRef and reaching the DOM'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'useRef', en: 'useRef' },
          def: {
            pl: 'Mutowalne pudełko <code>{ current }</code>, które przeżywa rendery i <em>nie</em> powoduje re-renderu przy zapisie. Odpowiednik zwykłego <code>let</code> w <code>setup</code>, a nie odpowiednik <code>ref</code>.',
            en: 'A mutable <code>{ current }</code> box that survives renders and does <em>not</em> trigger a re-render when written. The equivalent of a plain <code>let</code> in <code>setup</code>, not of <code>ref</code>.'
          }
        },
        {
          term: { pl: 'Ref callback', en: 'Ref callback' },
          def: {
            pl: 'Funkcja podana w atrybucie <code>ref</code>, wołana z węzłem przy podpięciu i z <code>null</code> przy odpięciu. Jedyny sensowny sposób na pomiar elementu w chwili pojawienia się.',
            en: 'A function passed to the <code>ref</code> attribute, called with the node on attach and with <code>null</code> on detach. The only sane way to measure an element the moment it appears.'
          }
        },
        {
          term: { pl: 'forwardRef', en: 'forwardRef' },
          def: {
            pl: 'Opakowanie przekazujące <code>ref</code> do wnętrza komponentu funkcyjnego, wymagane do Reacta 18. Od Reacta 19 <code>ref</code> jest zwykłym propsem i <code>forwardRef</code> odchodzi.',
            en: 'The wrapper that forwards a <code>ref</code> into a function component, required up to React 18. Since React 19 <code>ref</code> is an ordinary prop and <code>forwardRef</code> is on its way out.'
          }
        },
        {
          term: { pl: 'useImperativeHandle', en: 'useImperativeHandle' },
          def: {
            pl: 'Zawęża to, co komponent wystawia przez ref - bezpośredni odpowiednik <code>defineExpose</code>. Wystawiaj czasowniki (<code>focus</code>, <code>scrollToTop</code>), nie surowe węzły.',
            en: 'Narrows what a component exposes through its ref - the direct counterpart of <code>defineExpose</code>. Expose verbs (<code>focus</code>, <code>scrollToTop</code>), not raw nodes.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="d6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="180" y="30" width="280" height="76" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="60" text-anchor="middle" font-size="15" fill="var(--text)">useRef(initial)</text>' +
          '<text x="320" y="84" text-anchor="middle" font-size="13" fill="var(--muted)">one mutable box, survives renders</text>' +
          '<line x1="250" y1="112" x2="160" y2="168" stroke="var(--muted)" stroke-width="2" marker-end="url(#d6a)"/>' +
          '<line x1="390" y1="112" x2="480" y2="168" stroke="var(--muted)" stroke-width="2" marker-end="url(#d6a)"/>' +
          '<rect x="20" y="174" width="260" height="90" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="150" y="204" text-anchor="middle" font-size="14" fill="var(--text)">DOM handle</text>' +
          '<text x="150" y="226" text-anchor="middle" font-size="13" fill="var(--muted)">ref={inputRef} on a tag</text>' +
          '<text x="150" y="248" text-anchor="middle" font-size="13" fill="var(--muted)">Vue: ref="input" in template</text>' +
          '<rect x="360" y="174" width="260" height="90" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="490" y="204" text-anchor="middle" font-size="14" fill="var(--text)">instance variable</text>' +
          '<text x="490" y="226" text-anchor="middle" font-size="13" fill="var(--muted)">timer id, previous value</text>' +
          '<text x="490" y="248" text-anchor="middle" font-size="13" fill="var(--muted)">Vue: a plain let in setup</text>' +
          '<rect x="120" y="304" width="400" height="76" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="334" text-anchor="middle" font-size="14" fill="var(--text)">Writing .current never triggers a render</text>' +
          '<text x="320" y="358" text-anchor="middle" font-size="13" fill="var(--muted)">if the UI must change, it belongs in state</text>' +
          '</svg>',
        caption: {
          pl: 'useRef to jedno mutowalne pudełko przeżywające rendery, używane do dwóch rzeczy: uchwytu do DOM i zmiennej instancyjnej. Zapis do .current nigdy nie odświeża widoku.',
          en: 'useRef is one mutable box that survives renders, used for two things: a DOM handle and an instance variable. Writing to .current never refreshes the view.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że w klasie jest tablica, na której nauczyciel pisze rzeczy dla wszystkich, oraz mały karteczkowy notesik, który trzymasz w kieszeni.</p>' +
            '<p>Kiedy nauczyciel pisze coś na tablicy, wszyscy podnoszą głowy i patrzą. Coś się dzieje, klasa reaguje. To jest stan.</p>' +
            '<p>Kiedy zapisujesz coś w swoim notesiku - na przykład, że pożyczyłeś koledze gumkę - nikt się nawet nie odwraca. Notesik służy do zapamiętywania rzeczy, które są ci potrzebne, ale które nikogo poza tobą nie obchodzą. To jest właśnie ref.</p>' +
            '<p>Notesik ma jeszcze jedno zastosowanie: wpisujesz do niego, gdzie w klasie siedzi konkretna osoba, żeby móc do niej podejść. W Reactie dokładnie tak łapiesz prawdziwy element strony, kiedy chcesz na przykład ustawić kursor w polu tekstowym.</p>' +
            '<p>Złota zasada: jeśli po zmianie coś ma wyglądać inaczej - to na tablicę. Jeśli tylko ty musisz to pamiętać - do notesika.</p>',
          en: '<p>Imagine your classroom has a blackboard the teacher writes on for everyone, and a tiny notebook you keep in your pocket.</p>' +
            '<p>When the teacher writes on the board, everyone looks up. Something happens, the class reacts. That is state.</p>' +
            '<p>When you write something in your notebook - that you lent a friend an eraser, say - nobody even turns around. The notebook is for remembering things you need but nobody else cares about. That is a ref.</p>' +
            '<p>The notebook has one more use: you jot down where a particular person sits so you can walk over to them. In React that is exactly how you grab a real element on the page when you want to, for example, put the cursor into a text field.</p>' +
            '<p>The golden rule: if something should look different after the change, it goes on the board. If only you need to remember it, it goes in the notebook.</p>'
        },
        school: {
          pl: '<p><code>useRef</code> ma mylącą nazwę, bo nie ma nic wspólnego z <code>ref</code> z Vue. Reaktywny odpowiednik Vue-owego <code>ref</code> to <code>useState</code>. <code>useRef</code> odpowiada dwóm zupełnie innym rzeczom: template refom oraz zwykłej zmiennej w <code>setup</code>.</p>' +
            '<p>Zastosowanie pierwsze - uchwyt do DOM:</p>' +
            '<pre><code>// Vue\n' +
            '// &lt;input ref="inputEl"&gt;\n' +
            'const inputEl = ref(null)\n' +
            'onMounted(() =&gt; inputEl.value.focus())</code></pre>' +
            '<pre><code>// React\n' +
            'const inputEl = useRef(null)\n' +
            'useEffect(() =&gt; { inputEl.current.focus() }, [])\n' +
            '// &lt;input ref={inputEl} /&gt;</code></pre>' +
            '<p>Wygląda niemal identycznie. Vue używa pola <code>.value</code>, React pola <code>.current</code>, w obu przypadkach jest to <code>null</code> do momentu zamontowania.</p>' +
            '<p>Zastosowanie drugie - zmienna instancyjna, która ma przeżyć render, ale nie ma go wywoływać:</p>' +
            '<pre><code>// Vue - zwykla zmienna wystarczy, setup jest jednorazowy\n' +
            'let timerId = null\n' +
            '\n' +
            '// React - zwykla zmienna wyzerowalaby sie co render\n' +
            'const timerId = useRef(null)</code></pre>' +
            '<p>To jest sedno różnicy. W Vue pisałeś po prostu <code>let</code>, bo <code>setup</code> wykonywał się raz. W Reactie potrzebujesz <code>useRef</code>, bo ciało komponentu wykonuje się od nowa przy każdym renderze i zwykła zmienna nie ma szans niczego zapamiętać.</p>' +
            '<p>Ostatnia zasada, twarda: <strong>nie czytaj ani nie zapisuj <code>.current</code> podczas renderu</strong>. Render musi być czystą funkcją propsów i stanu. Ref dotykasz w event handlerach i w efektach.</p>' +
            '<p>Prosty test decyzyjny: zadaj sobie pytanie, czy po zmianie tej wartości interfejs ma wyglądać inaczej. Jeśli tak, to jest stan i wymaga <code>useState</code>. Jeśli nie, to jest ref i zapis do niego powinien przejść zupełnie niezauważony.</p>',
          en: '<p><code>useRef</code> has a confusing name, because it has nothing to do with a Vue <code>ref</code>. The reactive equivalent of a Vue <code>ref</code> is <code>useState</code>. <code>useRef</code> maps to two completely different things: template refs and a plain variable in <code>setup</code>.</p>' +
            '<p>Use one - a DOM handle:</p>' +
            '<pre><code>// Vue\n' +
            '// &lt;input ref="inputEl"&gt;\n' +
            'const inputEl = ref(null)\n' +
            'onMounted(() =&gt; inputEl.value.focus())</code></pre>' +
            '<pre><code>// React\n' +
            'const inputEl = useRef(null)\n' +
            'useEffect(() =&gt; { inputEl.current.focus() }, [])\n' +
            '// &lt;input ref={inputEl} /&gt;</code></pre>' +
            '<p>Almost identical. Vue uses a <code>.value</code> field, React uses <code>.current</code>, and in both cases it is <code>null</code> until mount.</p>' +
            '<p>Use two - an instance variable that must survive a render without causing one:</p>' +
            '<pre><code>// Vue - a plain variable is enough, setup runs once\n' +
            'let timerId = null\n' +
            '\n' +
            '// React - a plain variable would reset every render\n' +
            'const timerId = useRef(null)</code></pre>' +
            '<p>That is the heart of it. In Vue you simply wrote <code>let</code>, because <code>setup</code> ran once. In React you need <code>useRef</code>, because the component body runs again on every render and a plain variable has no chance of remembering anything.</p>' +
            '<p>One hard rule to finish: <strong>do not read or write <code>.current</code> during render</strong>. Render must be a pure function of props and state. You touch refs in event handlers and in effects.</p>'
        },
        pro: {
          pl: '<p>Prawidłowa mapa pojęć wygląda tak: Vue <code>ref</code> to React <code>useState</code>; Vue template ref to React <code>useRef</code> podpięty przez atrybut <code>ref</code>; zwykły <code>let</code> w <code>setup</code> to React <code>useRef</code> bez DOM. Pomylenie pierwszej pary z drugą jest najczęstszym błędem migrantów i skutkuje UI, które "nie chce się odświeżyć".</p>' +
            '<p><strong>Ref jako callback.</strong> Atrybut <code>ref</code> przyjmuje nie tylko obiekt, ale i funkcję - wołaną z węzłem przy podpięciu i z <code>null</code> przy odpięciu. To jedyny sensowny sposób na mierzenie elementu od razu po jego pojawieniu się oraz na zbieranie refów z listy. W React 19 funkcja może dodatkowo zwrócić cleanup, co domyka symetrię.</p>' +
            '<pre><code>const measure = useCallback(node =&gt; {\n' +
            '  if (node) setHeight(node.getBoundingClientRect().height)\n' +
            '}, [])\n' +
            '&lt;div ref={measure} /&gt;</code></pre>' +
            '<p><strong>Refy do komponentów.</strong> W Vue dostęp do instancji dziecka wymagał <code>defineExpose</code>. W Reactie do wersji 18 potrzebny był <code>forwardRef</code>; od React 19 <code>ref</code> jest zwykłym propsem funkcyjnego komponentu i <code>forwardRef</code> odchodzi do lamusa. Zawężanie tego, co wystawiasz, robi <code>useImperativeHandle</code> - to bezpośredni odpowiednik <code>defineExpose</code> i tak samo należy przez niego wystawiać czasowniki (<code>focus</code>, <code>scrollToTop</code>), a nie surowe węzły.</p>' +
            '<p><strong>Kiedy ref bije stan.</strong> Wartości zmieniające się bardzo często i nieoglądane w UI - pozycja przy przeciąganiu, bufor scrolla, identyfikator <code>requestAnimationFrame</code>, poprzednia wartość propsa do porównania, flaga "już wysłano". Trzymanie ich w stanie generuje render na każdą klatkę animacji i realnie zabija wydajność listy.</p>' +
            '<p><strong>Poprzednia wartość.</strong> Klasyczny mikrowzorzec, którego w Vue nie potrzebowałeś, bo <code>watch</code> dostawał stary argument za darmo: trzymasz poprzedni props w refie aktualizowanym w efekcie i porównujesz go w kolejnym przebiegu. To najprostsze narzędzie do wykrycia, że zmiana faktycznie nastąpiła, a nie że komponent po prostu przerenderował się z innego powodu.</p>' +
            '<p><strong>Pułapki.</strong> Ref nie powiadamia o podpięciu: jeśli element pojawia się warunkowo, <code>useEffect</code> z pustą tablicą zobaczy <code>null</code> - użyj wtedy ref-callbacku. W SSR (Next.js, tak jak w Nuxt) <code>.current</code> jest zawsze <code>null</code> na serwerze, więc każdy dostęp musi żyć w efekcie. I ostatnie: mutowanie <code>.current</code> podczas renderu psuje współbieżne renderowanie i Strict Mode - React ma prawo wykonać render dwa razy albo go porzucić.</p>',
          en: '<p>The correct concept map is: a Vue <code>ref</code> is React <code>useState</code>; a Vue template ref is React <code>useRef</code> attached via the <code>ref</code> attribute; a plain <code>let</code> in <code>setup</code> is React <code>useRef</code> without a DOM node. Confusing the first pair with the second is the classic migration bug and produces a UI that "refuses to update".</p>' +
            '<p><strong>Ref as a callback.</strong> The <code>ref</code> attribute accepts a function as well as an object - called with the node on attach and with <code>null</code> on detach. It is the only sane way to measure an element the moment it appears, and to collect refs from a list. In React 19 the function may also return a cleanup, which closes the symmetry.</p>' +
            '<pre><code>const measure = useCallback(node =&gt; {\n' +
            '  if (node) setHeight(node.getBoundingClientRect().height)\n' +
            '}, [])\n' +
            '&lt;div ref={measure} /&gt;</code></pre>' +
            '<p><strong>Refs to components.</strong> In Vue, reaching a child instance required <code>defineExpose</code>. In React up to 18 you needed <code>forwardRef</code>; since React 19, <code>ref</code> is an ordinary prop of a function component and <code>forwardRef</code> is on its way out. Narrowing what you expose is <code>useImperativeHandle</code> - the direct counterpart of <code>defineExpose</code>, and the same discipline applies: expose verbs (<code>focus</code>, <code>scrollToTop</code>), not raw nodes.</p>' +
            '<p><strong>When a ref beats state.</strong> Values that change very often and are never rendered - drag position, a scroll buffer, a <code>requestAnimationFrame</code> id, a previous prop value for comparison, an "already submitted" flag. Keeping those in state renders on every animation frame and genuinely destroys list performance.</p>' +
            '<p><strong>Traps.</strong> A ref does not notify you when it is attached: if the element appears conditionally, a <code>useEffect</code> with an empty array will see <code>null</code> - use a ref callback instead. Under SSR (Next.js, just like Nuxt) <code>.current</code> is always <code>null</code> on the server, so every access must live inside an effect. And finally, mutating <code>.current</code> during render breaks concurrent rendering and Strict Mode - React is free to run a render twice or throw it away.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co jest prawidłowym reactowym odpowiednikiem ref(0) z Vue, jeśli wartość ma być widoczna w UI?',
            en: 'What is the correct React equivalent of a Vue ref(0) when the value must be visible in the UI?'
          },
          options: [
            { pl: 'useRef(0)', en: 'useRef(0)' },
            { pl: 'useState(0)', en: 'useState(0)' },
            { pl: 'useMemo(() => 0, [])', en: 'useMemo(() => 0, [])' },
            { pl: 'Zwykła zmienna let', en: 'A plain let variable' }
          ],
          correct: 1,
          explain: {
            pl: 'Mimo podobieństwa nazw useRef nie jest reaktywny. Vue-owy ref, który wpływa na widok, mapuje się na useState; useRef odpowiada template refowi i zwykłej zmiennej w setup.',
            en: 'Despite the name, useRef is not reactive. A Vue ref that drives the view maps to useState; useRef corresponds to a template ref and to a plain variable in setup.'
          }
        },
        {
          q: {
            pl: 'Kiedy inputRef.current jest po raz pierwszy różny od null?',
            en: 'When does inputRef.current first stop being null?'
          },
          options: [
            { pl: 'Natychmiast po wywołaniu useRef', en: 'Immediately after useRef is called' },
            { pl: 'Podczas pierwszego renderu, przed zwróceniem JSX', en: 'During the first render, before the JSX is returned' },
            { pl: 'Po commicie, więc dopiero w efekcie albo w handlerze', en: 'After commit, so first in an effect or a handler' },
            { pl: 'Dopiero po pierwszej zmianie stanu', en: 'Only after the first state change' }
          ],
          correct: 2,
          explain: {
            pl: 'React podpina węzeł DOM w fazie commit, już po wykonaniu funkcji renderującej. Dlatego dostęp do .current w ciele komponentu zobaczy null.',
            en: 'React attaches the DOM node during commit, after the render function has run. That is why touching .current in the component body sees null.'
          }
        },
        {
          q: {
            pl: 'Który przypadek jest dobrym powodem, żeby użyć useRef zamiast useState?',
            en: 'Which case is a good reason to use useRef instead of useState?'
          },
          options: [
            { pl: 'Licznik pokazywany w nagłówku', en: 'A counter shown in the header' },
            { pl: 'Identyfikator setInterval, który trzeba wyczyścić', en: 'A setInterval id you need to clear later' },
            { pl: 'Lista wyników wyświetlana w tabeli', en: 'A list of results rendered in a table' },
            { pl: 'Flaga otwarcia modala', en: 'A modal open flag' }
          ],
          correct: 1,
          explain: {
            pl: 'Identyfikator timera musi przeżyć rendery, ale nikt go nie ogląda - zapis do .current nie powinien odświeżać widoku. Wszystko, co widać w UI, należy do stanu.',
            en: 'A timer id must survive renders but nobody looks at it - writing .current should not refresh the view. Anything visible in the UI belongs in state.'
          }
        },
        {
          q: {
            pl: 'Musisz udostępnić rodzicowi metodę focus() swojego komponentu. Co jest odpowiednikiem Vue-owego defineExpose?',
            en: 'You need to expose a focus() method of your component to its parent. What is the counterpart of Vue defineExpose?'
          },
          options: [
            { pl: 'useImperativeHandle', en: 'useImperativeHandle' },
            { pl: 'useLayoutEffect', en: 'useLayoutEffect' },
            { pl: 'createPortal', en: 'createPortal' },
            { pl: 'useSyncExternalStore', en: 'useSyncExternalStore' }
          ],
          correct: 0,
          explain: {
            pl: 'useImperativeHandle definiuje dokładnie to, co widzi rodzic przez ref - tak jak defineExpose w Vue. Od React 19 ref jest zwykłym propsem, więc forwardRef nie jest już potrzebny.',
            en: 'useImperativeHandle defines exactly what the parent sees through the ref, just like defineExpose in Vue. Since React 19 ref is an ordinary prop, so forwardRef is no longer needed.'
          }
        }
      ]
    }
  ]
};
