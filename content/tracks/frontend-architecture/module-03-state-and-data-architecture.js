// Track frontend-architecture - Module 03 - State and data architecture
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema" + "v4").
// String safety: single-quoted concatenated strings only, no template literals.

export default {
  id: 'state-and-data-architecture',
  order: 3,
  icon: '🗃️',
  title: {
    pl: 'Architektura stanu i danych',
    en: 'State and data architecture'
  },
  description: {
    pl: 'Gdzie naprawdę mieszka stan aplikacji, jak zbudować warstwę pobierania danych, jak robić realtime i optimistic UI, tryb offline oraz kontrakty API i BFF.',
    en: 'Where application state actually lives, how to build a data-fetching layer, realtime and optimistic UI, offline mode, plus API contracts and the BFF.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'state-taxonomy',
      title: {
        pl: 'Taksonomia stanu: serwer, klient, URL, formularz',
        en: 'State taxonomy: server, client, URL, form'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Stan serwerowy', en: 'Server state' },
          def: {
            pl: 'Dane, których właścicielem jest backend, a przeglądarka trzyma tylko ich kopię. To cache, nie stan: potrzebuje świeżości i unieważniania, a nie reducerów.',
            en: 'Data owned by the backend, of which the browser only holds a copy. It is a cache, not state: it needs freshness and invalidation, not reducers.'
          }
        },
        {
          term: { pl: 'Stan klienta', en: 'Client state' },
          def: {
            pl: 'Stan istniejący wyłącznie w przeglądarce: otwarty modal, wybrana zakładka, tryb ciemny. Zwykle mały i lokalny - globalny store rzadko jest tu do czegokolwiek potrzebny.',
            en: 'State that exists only in the browser: an open modal, the selected tab, dark mode. Usually small and local - a global store is rarely needed for any of it.'
          }
        },
        {
          term: { pl: 'Stan w URL', en: 'URL state' },
          def: {
            pl: 'Filtry, sortowanie, paginacja i identyfikator wybranego elementu trzymane w adresie. Dzięki temu widok da się wysłać koledze, odświeżyć i cofnąć przyciskiem wstecz.',
            en: 'Filters, sorting, pagination and the selected id kept in the address. That makes a view shareable, refreshable and undoable with the back button.'
          }
        },
        {
          term: { pl: 'Stan formularza', en: 'Form state' },
          def: {
            pl: 'Wartości pól, znaczniki dotknięcia i błędy walidacji w trakcie edycji. Ma własny cykl życia i nie należy ani do globalnego store, ani do cache serwerowego.',
            en: 'Field values, touched flags and validation errors while editing. It has its own lifecycle and belongs neither in the global store nor in the server cache.'
          }
        },
        {
          term: { pl: 'Presentational i connected', en: 'Presentational and connected' },
          def: {
            pl: 'Komponent presentational dostaje wszystko przez propsy i może trafić do design systemu; connected sam pobiera dane i zostaje w aplikacji. Mieszanie ich zabija reużywalność.',
            en: 'A presentational component receives everything through props and can live in the design system; a connected one fetches its own data and stays in the app. Mixing them kills reuse.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="320" y="28" text-anchor="middle" font-size="16" fill="var(--text)">Four kinds of state, four owners</text>' +
          '<rect x="24" y="48" width="286" height="150" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="44" y="76" font-size="15" fill="var(--accent)">Server state</text>' +
          '<text x="44" y="100" font-size="13" fill="var(--muted)">owner: the backend</text>' +
          '<text x="44" y="122" font-size="13" fill="var(--muted)">a cache, never the truth</text>' +
          '<text x="44" y="144" font-size="13" fill="var(--muted)">stale, refetch, invalidate</text>' +
          '<text x="44" y="172" font-size="13" fill="var(--text)">tariffs, invoices, tickets</text>' +
          '<rect x="330" y="48" width="286" height="150" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="350" y="76" font-size="15" fill="var(--accent2)">Client state</text>' +
          '<text x="350" y="100" font-size="13" fill="var(--muted)">owner: this browser tab</text>' +
          '<text x="350" y="122" font-size="13" fill="var(--muted)">dies on reload</text>' +
          '<text x="350" y="144" font-size="13" fill="var(--muted)">no network involved</text>' +
          '<text x="350" y="172" font-size="13" fill="var(--text)">drawer open, theme, wizard step</text>' +
          '<rect x="24" y="214" width="286" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="44" y="242" font-size="15" fill="var(--ok)">URL state</text>' +
          '<text x="44" y="266" font-size="13" fill="var(--muted)">owner: the address bar</text>' +
          '<text x="44" y="288" font-size="13" fill="var(--muted)">shareable, bookmarkable</text>' +
          '<text x="44" y="310" font-size="13" fill="var(--muted)">survives reload and back</text>' +
          '<text x="44" y="338" font-size="13" fill="var(--text)">filters, page, sort, tab</text>' +
          '<rect x="330" y="214" width="286" height="150" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="350" y="242" font-size="15" fill="var(--warn)">Form state</text>' +
          '<text x="350" y="266" font-size="13" fill="var(--muted)">owner: the user, mid-edit</text>' +
          '<text x="350" y="288" font-size="13" fill="var(--muted)">dirty, touched, errors</text>' +
          '<text x="350" y="310" font-size="13" fill="var(--muted)">short lived, high churn</text>' +
          '<text x="350" y="338" font-size="13" fill="var(--text)">the order form being filled</text>' +
          '<rect x="24" y="382" width="592" height="42" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="409" text-anchor="middle" font-size="14" fill="var(--err)">Most global-store pain = server state parked in the wrong box</text>' +
          '</svg>',
        caption: {
          pl: 'Cztery rodzaje stanu mają czterech różnych właścicieli i cztery różne cykle życia. Większość bólu z globalnym store bierze się z wrzucenia stanu serwera do pudełka stanu klienta.',
          en: 'Four kinds of state have four different owners and four different lifecycles. Most global-store pain comes from parking server state in the client-state box.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dużą kuchnię w restauracji. Są w niej cztery miejsca, gdzie leżą rzeczy, i każde ma innego właściciela.</p>' +
            '<p>Jest <strong>magazyn</strong> - tam są prawdziwe zapasy. Kucharz może mieć kartkę z tym, co widział rano w magazynie, ale to tylko kartka. Ktoś mógł w międzyczasie coś zabrać.</p>' +
            '<p>Jest <strong>blat kucharza</strong> - nóż, deska, włączone światło. To znika, gdy kucharz kończy zmianę, i nikogo poza nim nie obchodzi.</p>' +
            '<p>Jest <strong>tabliczka na drzwiach</strong> z napisem, który stolik obsługujemy. Każdy może ją przeczytać i każdy może zrobić jej zdjęcie i wysłać koledze.</p>' +
            '<p>I jest <strong>kartka z zamówieniem w trakcie pisania</strong> - pokreślona, niedokończona, tylko w ręku kelnera.</p>' +
            '<p>Cała sztuka polega na tym, żeby nie mylić tych miejsc. Jeśli kucharz zacznie traktować swoją kartkę jak magazyn, prędzej czy później ugotuje coś, czego nie ma.</p>',
          en: '<p>Picture a big restaurant kitchen. There are four places where things sit, and each has a different owner.</p>' +
            '<p>There is the <strong>storeroom</strong> - the real supplies. A cook can hold a note about what he saw in there this morning, but it is only a note. Someone may have taken things since.</p>' +
            '<p>There is the <strong>cook station</strong> - a knife, a board, a lamp switched on. It disappears when the shift ends and nobody else cares about it.</p>' +
            '<p>There is the <strong>sign on the door</strong> saying which table we are serving. Anyone can read it, and anyone can photograph it and send it to a friend.</p>' +
            '<p>And there is the <strong>half-written order slip</strong> - crossed out, unfinished, alive only in the waiter hand.</p>' +
            '<p>The whole trick is not mixing those places up. If the cook starts treating his note as the storeroom, sooner or later he cooks something that does not exist.</p>'
        },
        school: {
          pl: '<p>Zanim wybierzesz bibliotekę do zarządzania stanem, zadaj jedno pytanie: <strong>kto jest właścicielem tej danej i jak długo ona żyje</strong>. Odpowiedź mieści się zwykle w czterech kategoriach.</p>' +
            '<h4>1. Stan serwera (server state)</h4>' +
            '<p>Faktury, taryfy, zgłoszenia serwisowe. Właścicielem jest backend, a to, co masz w przeglądarce, to <em>kopia z opóźnieniem</em> - dokładnie jak cache w CDN. Kluczowe pytania to nie "gdzie to trzymam", tylko: jak długo jest świeże, kiedy unieważniam, co pokazuje użytkownikowi w międzyczasie.</p>' +
            '<h4>2. Stan klienta (client state)</h4>' +
            '<p>Otwarty modal, wybrana zakładka w panelu, tryb ciemny. Nie ma odpowiednika na serwerze, ginie po odświeżeniu i nikt inny go nie widzi.</p>' +
            '<h4>3. Stan w URL</h4>' +
            '<p>Filtry, strona, sortowanie, wybrany identyfikator. To jedyny stan, który da się wkleić na Slacku i który przeżyje przycisk wstecz.</p>' +
            '<h4>4. Stan formularza</h4>' +
            '<p>Wartości pól w trakcie edycji plus metadane: dirty, touched, błędy walidacji. Zmienia się przy każdym naciśnięciu klawisza, więc trzymanie go w globalnym store to prosta droga do przemielenia całej aplikacji na literkę.</p>' +
            '<pre><code>// zły domyślny odruch\nstore.state.invoices = await api.getInvoices()\n\n// właściwy: to jest cache, nie stan\nconst { data, isStale } = useQuery({\n  queryKey: ["invoices", customerId],\n  queryFn: () =&gt; api.getInvoices(customerId),\n  staleTime: 60_000\n})</code></pre>' +
            '<p>Jeśli w code review zobaczysz obiekt z serwera ręcznie włożony do Pinii albo Zustanda razem z polami <code>loading</code> i <code>error</code>, to prawie zawsze znak, że ktoś właśnie zaczął pisać własny, gorszy cache HTTP.</p>',
          en: '<p>Before you pick a state-management library, ask one question: <strong>who owns this data and how long does it live</strong>. The answer almost always lands in one of four categories.</p>' +
            '<h4>1. Server state</h4>' +
            '<p>Invoices, tariffs, service tickets. The backend owns them; what you hold in the browser is a <em>delayed copy</em> - exactly like a CDN cache. The real questions are not "where do I store it" but: how long is it fresh, when do I invalidate, what does the user see meanwhile.</p>' +
            '<h4>2. Client state</h4>' +
            '<p>An open modal, the selected tab in a panel, dark mode. It has no server counterpart, dies on reload, and nobody else can see it.</p>' +
            '<h4>3. URL state</h4>' +
            '<p>Filters, page, sort order, selected id. It is the only state you can paste into Slack and the only one that survives the back button.</p>' +
            '<h4>4. Form state</h4>' +
            '<p>Field values mid-edit plus metadata: dirty, touched, validation errors. It changes on every keystroke, so putting it in a global store is the shortest path to re-rendering the whole app per character.</p>' +
            '<pre><code>// the bad reflex\nstore.state.invoices = await api.getInvoices()\n\n// the right one: this is a cache, not state\nconst { data, isStale } = useQuery({\n  queryKey: ["invoices", customerId],\n  queryFn: () =&gt; api.getInvoices(customerId),\n  staleTime: 60_000\n})</code></pre>' +
            '<p>If a code review shows a server object hand-copied into Pinia or Zustand together with <code>loading</code> and <code>error</code> fields, that is almost always someone starting to write their own, worse HTTP cache.</p>'
        },
        pro: {
          pl: '<p>Taksonomia stanu to najtańsza decyzja architektoniczna, jaką możesz podjąć, i jedna z najdroższych do cofnięcia. W dużej organizacji telco widać to na liczbach: aplikacja obsługi klienta z 300 komponentami i jednym globalnym store zwykle ma 60-80 procent tego store wypełnione danymi z API, które samo w sobie ma już nagłówki <code>ETag</code> i <code>Cache-Control</code>. Piszemy własny cache i ignorujemy ten, który dostajemy za darmo.</p>' +
            '<h4>Reguła decyzyjna</h4>' +
            '<table>' +
            '<tr><th>Pytanie</th><th>Odpowiedź</th><th>Miejsce</th></tr>' +
            '<tr><td>Czy inny użytkownik może to zmienić?</td><td>tak</td><td>warstwa cache serwera (TanStack Query, RTK Query, Apollo)</td></tr>' +
            '<tr><td>Czy chcę to wkleić komuś w wiadomości?</td><td>tak</td><td>URL (search params)</td></tr>' +
            '<tr><td>Czy zmienia się częściej niż 10 razy na sekundę?</td><td>tak</td><td>lokalnie w komponencie lub w bibliotece formularzy</td></tr>' +
            '<tr><td>Reszta</td><td>-</td><td>mały store klienta (Zustand, Pinia), bez danych z API</td></tr>' +
            '</table>' +
            '<h4>Konsekwencje dla design systemu</h4>' +
            '<p>Komponenty biblioteki (CHI, MUI, Carbon) nie powinny znać żadnej z tych warstw. Moment, w którym <code>DataTable</code> zaczyna sam wołać <code>useQuery</code>, jest momentem, w którym design system przestaje być używalny w innej aplikacji niż ta, w której powstał. Kontrakt brzmi: komponent przyjmuje dane i callbacki, a decyzja o źródle należy do aplikacji. Wyjątkiem są komponenty jawnie "connected", które stoją w osobnym pakiecie i mają własny numer wersji.</p>' +
            '<pre><code>// presentational, w design systemie\n&lt;ChiDataTable rows={rows} sort={sort} onSortChange={setSort} /&gt;\n\n// connected, w aplikacji - stan w URL, dane z cache\nconst [params, setParams] = useSearchParams()\nconst sort = params.get("sort") ?? "createdAt:desc"\nconst { data } = useInvoices({ sort, page: Number(params.get("page") ?? 1) })</code></pre>' +
            '<h4>Pułapki produkcyjne</h4>' +
            '<ul>' +
            '<li><strong>Stan pochodny w store.</strong> Jeśli da się to policzyć w renderze z dwóch innych wartości, to nie jest stan - to selektor.</li>' +
            '<li><strong>Duplikat URL i store.</strong> Filtry trzymane w obu miejscach rozjeżdżają się po przycisku wstecz. Wybierz URL jako jedyne źródło prawdy i czytaj z niego.</li>' +
            '<li><strong>Stan sesji w Redux.</strong> Token i tożsamość użytkownika należą do warstwy auth, nie do drzewa stanu UI - inaczej wyciekają do devtools i do sentry breadcrumbs.</li>' +
            '<li><strong>Wielozakładkowość.</strong> W aplikacji CRM agent ma otwartych 6 zakładek. Bez <code>BroadcastChannel</code> lub współdzielonego cache po IndexedDB zobaczy sześć różnych wersji tej samej faktury.</li>' +
            '</ul>' +
            '<p>Na poziomie principal twoim produktem nie jest wybór biblioteki, tylko <strong>spisana zasada podziału</strong> w ADR, do której może się odwołać sześć zespołów bez ciebie na spotkaniu.</p>',
          en: '<p>State taxonomy is the cheapest architectural decision you can make and one of the most expensive to undo. In a large telco you can see it in numbers: a customer-care app with 300 components and one global store typically has 60-80 percent of that store filled with API data that already ships <code>ETag</code> and <code>Cache-Control</code> headers. We write our own cache and ignore the one we get for free.</p>' +
            '<h4>The decision rule</h4>' +
            '<table>' +
            '<tr><th>Question</th><th>Answer</th><th>Where it belongs</th></tr>' +
            '<tr><td>Can another user change it?</td><td>yes</td><td>server cache layer (TanStack Query, RTK Query, Apollo)</td></tr>' +
            '<tr><td>Would I paste it to a colleague?</td><td>yes</td><td>the URL (search params)</td></tr>' +
            '<tr><td>Does it change more than 10 times a second?</td><td>yes</td><td>component-local state or a form library</td></tr>' +
            '<tr><td>Everything else</td><td>-</td><td>a small client store (Zustand, Pinia), no API payloads</td></tr>' +
            '</table>' +
            '<h4>What this means for a design system</h4>' +
            '<p>Library components (CHI, MUI, Carbon) must know none of these layers. The moment <code>DataTable</code> starts calling <code>useQuery</code> itself is the moment the design system stops being usable in any app other than the one it was born in. The contract is: the component takes data and callbacks, the application decides the source. The exception is explicitly "connected" components, which live in a separate package with their own version number.</p>' +
            '<pre><code>// presentational, inside the design system\n&lt;ChiDataTable rows={rows} sort={sort} onSortChange={setSort} /&gt;\n\n// connected, inside the app - state in the URL, data from cache\nconst [params, setParams] = useSearchParams()\nconst sort = params.get("sort") ?? "createdAt:desc"\nconst { data } = useInvoices({ sort, page: Number(params.get("page") ?? 1) })</code></pre>' +
            '<h4>Production pitfalls</h4>' +
            '<ul>' +
            '<li><strong>Derived state in the store.</strong> If you can compute it during render from two other values, it is not state - it is a selector.</li>' +
            '<li><strong>URL and store duplication.</strong> Filters kept in both drift apart after the back button. Pick the URL as the single source of truth and read from it.</li>' +
            '<li><strong>Session state in Redux.</strong> Tokens and identity belong to the auth layer, not the UI state tree - otherwise they leak into devtools and Sentry breadcrumbs.</li>' +
            '<li><strong>Multi-tab reality.</strong> A CRM agent keeps six tabs open. Without <code>BroadcastChannel</code> or a shared IndexedDB-backed cache they will see six versions of the same invoice.</li>' +
            '</ul>' +
            '<p>At principal level your product is not the library choice, it is <strong>a written partitioning rule</strong> in an ADR that six teams can cite without you in the room.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Który z poniższych jest klasycznym przykładem stanu serwera?',
            en: 'Which of the following is a classic example of server state?'
          },
          options: [
            { pl: 'Czy panel boczny jest rozwinięty', en: 'Whether the side panel is expanded' },
            { pl: 'Lista faktur klienta pobrana z API', en: 'The customer invoice list fetched from the API' },
            { pl: 'Aktualnie wpisywany tekst w polu wyszukiwania', en: 'The text currently being typed into a search box' },
            { pl: 'Wybrany motyw jasny lub ciemny', en: 'The selected light or dark theme' }
          ],
          correct: 1,
          explain: {
            pl: 'Stan serwera to dane, których właścicielem jest backend i które inny użytkownik może zmienić bez twojej wiedzy. Pozostałe trzy odpowiedzi żyją i umierają w tej jednej karcie przeglądarki.',
            en: 'Server state is data the backend owns and another user can change without you knowing. The other three live and die inside this one browser tab.'
          }
        },
        {
          q: {
            pl: 'Dlaczego filtry tabeli warto trzymać w URL, a nie w globalnym store?',
            en: 'Why keep table filters in the URL rather than in a global store?'
          },
          options: [
            { pl: 'Bo URL jest szybszy niż pamięć RAM', en: 'Because the URL is faster than RAM' },
            { pl: 'Bo tylko URL da się zaszyfrować', en: 'Because only the URL can be encrypted' },
            { pl: 'Bo stan w URL jest udostępnialny, przeżywa przeładowanie i działa z przyciskiem wstecz', en: 'Because URL state is shareable, survives reload and works with the back button' },
            { pl: 'Bo store nie obsługuje wartości tekstowych', en: 'Because stores cannot hold string values' }
          ],
          correct: 2,
          explain: {
            pl: 'URL jest jedynym miejscem, które użytkownik może skopiować i wysłać koledze, a przeglądarka traktuje go jak historię nawigacji. To daje trzy funkcje za darmo, które w store musiałbyś napisać ręcznie.',
            en: 'The URL is the only place a user can copy and send to a colleague, and the browser treats it as navigation history. That is three features for free that a store would force you to hand-write.'
          }
        },
        {
          q: {
            pl: 'Komponent DataTable w twoim design systemie zaczyna sam wołać useQuery. Co jest tu głównym ryzykiem architektonicznym?',
            en: 'A DataTable component in your design system starts calling useQuery itself. What is the main architectural risk?'
          },
          options: [
            { pl: 'Komponent stanie się nieużywalny w aplikacjach z innym stosem danych i zwiąże design system z jedną aplikacją', en: 'The component becomes unusable in apps with a different data stack and couples the design system to one application' },
            { pl: 'Zapytania będą wolniejsze o około 30 ms', en: 'Requests get about 30 ms slower' },
            { pl: 'Złamie to reguły CSS specificity', en: 'It breaks CSS specificity rules' },
            { pl: 'TypeScript przestanie wnioskować typy propsów', en: 'TypeScript stops inferring prop types' }
          ],
          correct: 0,
          explain: {
            pl: 'Biblioteka komponentów ma być niezależna od źródła danych. Wciągnięcie warstwy pobierania do środka wymusza ta sama bibliotekę i ten sam kształt API u każdego konsumenta, a przy 20 zespołach to blokada wersji na lata.',
            en: 'A component library must stay independent of the data source. Pulling the fetching layer inside forces the same library and the same API shape on every consumer, which with 20 teams becomes a multi-year version lock.'
          }
        },
        {
          q: {
            pl: 'Agent CRM ma otwartych sześć zakładek z ta sama faktura i widzi w nich różne kwoty. Które podejście realnie rozwiązuje problem?',
            en: 'A CRM agent has six tabs open on the same invoice and sees different amounts in them. Which approach actually solves it?'
          },
          options: [
            { pl: 'Zwiększenie staleTime, żeby dane rzadziej się zmieniały', en: 'Increase staleTime so the data changes less often' },
            { pl: 'Przeniesienie faktury do globalnego store aplikacji', en: 'Move the invoice into the global application store' },
            { pl: 'Wyłączenie cache i pobieranie danych przy każdym renderze', en: 'Disable caching and refetch on every render' },
            { pl: 'Propagacja unieważnień między zakładkami, np. przez BroadcastChannel, plus refetch przy powrocie fokusu', en: 'Propagate invalidations across tabs, e.g. via BroadcastChannel, plus refetch on window focus' }
          ],
          correct: 3,
          explain: {
            pl: 'Globalny store żyje w obrębie jednej karty, więc nic nie zmienia. Problem jest z natury rozproszony: potrzebujesz kanału między kartami i odświeżenia przy powrocie fokusu, a nie dłuższego lub krótszego czasu życia cache.',
            en: 'A global store lives inside a single tab, so it changes nothing. The problem is distributed by nature: you need a cross-tab channel and a refetch on focus, not a longer or shorter cache lifetime.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'data-fetching-layer',
      title: {
        pl: 'Warstwa pobierania danych',
        en: 'The data-fetching layer'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Query key', en: 'Query key' },
          def: {
            pl: 'Ustrukturyzowany klucz identyfikujący wpis w cache, budowany fabryką kluczy. Hierarchia w rodzaju <code>["invoices","list",id]</code> pozwala unieważnić całą domenę jedną linią.',
            en: 'A structured key identifying a cache entry, built by a key factory. A hierarchy such as <code>["invoices","list",id]</code> lets you invalidate a whole domain in one line.'
          }
        },
        {
          term: { pl: 'staleTime i gcTime', en: 'staleTime and gcTime' },
          def: {
            pl: '<code>staleTime</code> mówi, jak długo dane uchodzą za świeże i nie są pobierane ponownie; <code>gcTime</code> mówi, jak długo nieużywany wpis zostaje w pamięci. To dwie różne osie.',
            en: '<code>staleTime</code> says how long data counts as fresh and is not refetched; <code>gcTime</code> says how long an unused entry stays in memory. Two different axes.'
          }
        },
        {
          term: { pl: 'Unieważnienie cache', en: 'Cache invalidation' },
          def: {
            pl: 'Oznaczenie wpisów cache jako nieaktualnych po mutacji, żeby zostały pobrane ponownie. Reguła: mutacja nie aktualizuje ekranów ręcznie, tylko unieważnia klucze.',
            en: 'Marking cache entries out of date after a mutation so they refetch. The rule: a mutation does not hand-update screens, it invalidates keys.'
          }
        },
        {
          term: { pl: 'Hook domenowy', en: 'Domain hook' },
          def: {
            pl: 'Jedyny sposób, w jaki aplikacja sięga po dane: <code>useInvoices()</code> zamiast gołego <code>fetch</code> w komponencie. Ukrywa klucze, retry, timeouty i normalizację błędów.',
            en: 'The single way the app reaches data: <code>useInvoices()</code> instead of a raw <code>fetch</code> inside a component. It hides keys, retries, timeouts and error normalisation.'
          }
        },
        {
          term: { pl: 'Normalizacja błędów', en: 'Error normalisation' },
          def: {
            pl: 'Zamiana błędów transportu na jeden własny kształt: kod, komunikat dla użytkownika i informacja, czy da się ponowić. Dzięki temu UI nie musi znać <code>AxiosError</code>.',
            en: 'Mapping transport errors into one shape of your own: a code, a user-facing message and whether it is retryable. The UI then never has to know about <code>AxiosError</code>.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa3b1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="fa3b2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ok)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="16" fill="var(--text)">Four layers, one direction</text>' +
          '<rect x="70" y="48" width="500" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="72" text-anchor="middle" font-size="15" fill="var(--text)">Components</text>' +
          '<text x="320" y="92" text-anchor="middle" font-size="13" fill="var(--muted)">never call fetch, never know URLs</text>' +
          '<line x1="320" y1="104" x2="320" y2="136" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3b1)"/>' +
          '<rect x="70" y="140" width="500" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="164" text-anchor="middle" font-size="15" fill="var(--accent)">Domain hooks: useInvoices, useTariffs</text>' +
          '<text x="320" y="184" text-anchor="middle" font-size="13" fill="var(--muted)">keys, staleTime, select, invalidation</text>' +
          '<line x1="320" y1="196" x2="320" y2="228" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3b1)"/>' +
          '<rect x="70" y="232" width="500" height="56" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="256" text-anchor="middle" font-size="15" fill="var(--accent2)">Cache client (TanStack Query / RTK Query)</text>' +
          '<text x="320" y="276" text-anchor="middle" font-size="13" fill="var(--muted)">dedupe, retry, background refetch</text>' +
          '<line x1="320" y1="288" x2="320" y2="320" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3b1)"/>' +
          '<rect x="70" y="324" width="500" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="348" text-anchor="middle" font-size="15" fill="var(--text)">Transport: generated client, auth, tracing</text>' +
          '<text x="320" y="368" text-anchor="middle" font-size="13" fill="var(--muted)">one place for headers, errors, retries</text>' +
          '<path d="M 590 352 C 620 300 620 130 344 116" fill="none" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#fa3b2)"/>' +
          '<rect x="70" y="396" width="500" height="34" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="418" text-anchor="middle" font-size="13" fill="var(--ok)">Swap the transport without touching one component</text>' +
          '</svg>',
        caption: {
          pl: 'Warstwowa architektura danych: komponenty widzą tylko hooki domenowe, hooki widzą cache, cache widzi transport. Podmiana REST na GraphQL dotyka jednej warstwy, nie 300 komponentów.',
          en: 'Layered data architecture: components see only domain hooks, hooks see the cache, the cache sees the transport. Swapping REST for GraphQL touches one layer, not 300 components.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Cykl życia jednego wpisu w cache: od pustego stanu, przez stale-while-revalidate, po unieważnienie po mutacji.',
          en: 'The lifecycle of one cache entry: from empty, through stale-while-revalidate, to invalidation after a mutation.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="40" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="14" fill="var(--text)">Component A</text>' +
              '<text x="105" y="94" text-anchor="middle" font-size="13" fill="var(--warn)">spinner</text>' +
              '<rect x="30" y="140" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="172" text-anchor="middle" font-size="14" fill="var(--muted)">Component B</text>' +
              '<text x="105" y="194" text-anchor="middle" font-size="13" fill="var(--muted)">idle</text>' +
              '<rect x="230" y="60" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="88" text-anchor="middle" font-size="14" fill="var(--accent2)">Cache</text>' +
              '<text x="320" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">key: invoices,42</text>' +
              '<text x="320" y="146" text-anchor="middle" font-size="13" fill="var(--err)">empty</text>' +
              '<text x="320" y="172" text-anchor="middle" font-size="13" fill="var(--muted)">inflight: 1</text>' +
              '<rect x="460" y="60" width="150" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="88" text-anchor="middle" font-size="14" fill="var(--text)">API</text>' +
              '<text x="535" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">GET /invoices/42</text>' +
              '<line x1="182" y1="75" x2="226" y2="100" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="414" y1="110" x2="456" y2="110" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="60" y="250" width="520" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--warn)">1. cold miss: one request, one spinner</text>' +
              '</svg>',
            label: { pl: 'Zimny cache', en: 'Cold cache' },
            note: {
              pl: 'Pierwszy komponent pyta o klucz, którego nie ma w cache. Leci jedno zapytanie, użytkownik widzi skeleton.',
              en: 'The first component asks for a key that is not cached. One request goes out and the user sees a skeleton.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="40" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="14" fill="var(--text)">Component A</text>' +
              '<text x="105" y="94" text-anchor="middle" font-size="13" fill="var(--warn)">spinner</text>' +
              '<rect x="30" y="140" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="172" text-anchor="middle" font-size="14" fill="var(--text)">Component B</text>' +
              '<text x="105" y="194" text-anchor="middle" font-size="13" fill="var(--warn)">spinner</text>' +
              '<rect x="230" y="60" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="88" text-anchor="middle" font-size="14" fill="var(--accent2)">Cache</text>' +
              '<text x="320" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">key: invoices,42</text>' +
              '<text x="320" y="146" text-anchor="middle" font-size="13" fill="var(--err)">empty</text>' +
              '<text x="320" y="172" text-anchor="middle" font-size="13" fill="var(--ok)">inflight: 1 (deduped)</text>' +
              '<rect x="460" y="60" width="150" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="88" text-anchor="middle" font-size="14" fill="var(--text)">API</text>' +
              '<text x="535" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">GET /invoices/42</text>' +
              '<line x1="182" y1="75" x2="226" y2="100" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="182" y1="175" x2="226" y2="150" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="414" y1="110" x2="456" y2="110" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="60" y="250" width="520" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--ok)">2. second subscriber joins, still one request</text>' +
              '</svg>',
            label: { pl: 'Deduplikacja', en: 'Deduplication' },
            note: {
              pl: 'Drugi komponent prosi o ten sam klucz w trakcie lotu zapytania. Cache nie wysyła drugiego requestu, tylko dopisuje subskrybenta.',
              en: 'A second component asks for the same key while the request is in flight. The cache does not fire a second request, it just adds a subscriber.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="40" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="14" fill="var(--text)">Component A</text>' +
              '<text x="105" y="94" text-anchor="middle" font-size="13" fill="var(--ok)">data</text>' +
              '<rect x="30" y="140" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="105" y="172" text-anchor="middle" font-size="14" fill="var(--text)">Component B</text>' +
              '<text x="105" y="194" text-anchor="middle" font-size="13" fill="var(--ok)">data</text>' +
              '<rect x="230" y="60" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="320" y="88" text-anchor="middle" font-size="14" fill="var(--ok)">Cache</text>' +
              '<text x="320" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">key: invoices,42</text>' +
              '<text x="320" y="146" text-anchor="middle" font-size="13" fill="var(--ok)">fresh, staleTime 60s</text>' +
              '<text x="320" y="172" text-anchor="middle" font-size="13" fill="var(--muted)">inflight: 0</text>' +
              '<rect x="460" y="60" width="150" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="88" text-anchor="middle" font-size="14" fill="var(--text)">API</text>' +
              '<text x="535" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">idle</text>' +
              '<line x1="182" y1="75" x2="226" y2="100" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="182" y1="175" x2="226" y2="150" stroke="var(--ok)" stroke-width="2"/>' +
              '<rect x="60" y="250" width="520" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--ok)">3. fresh: reads are free for 60 seconds</text>' +
              '</svg>',
            label: { pl: 'Świeże dane', en: 'Fresh data' },
            note: {
              pl: 'Odpowiedź trafia do cache i obaj subskrybenci renderują się z tej samej referencji. Przez staleTime kolejne montowania nic nie kosztują.',
              en: 'The response lands in the cache and both subscribers render from the same reference. Within staleTime, further mounts cost nothing.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="40" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="14" fill="var(--text)">Component A</text>' +
              '<text x="105" y="94" text-anchor="middle" font-size="13" fill="var(--ok)">old data shown</text>' +
              '<rect x="30" y="140" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="105" y="172" text-anchor="middle" font-size="14" fill="var(--text)">Component B</text>' +
              '<text x="105" y="194" text-anchor="middle" font-size="13" fill="var(--ok)">old data shown</text>' +
              '<rect x="230" y="60" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="320" y="88" text-anchor="middle" font-size="14" fill="var(--warn)">Cache</text>' +
              '<text x="320" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">key: invoices,42</text>' +
              '<text x="320" y="146" text-anchor="middle" font-size="13" fill="var(--warn)">stale, refetching</text>' +
              '<text x="320" y="172" text-anchor="middle" font-size="13" fill="var(--muted)">inflight: 1</text>' +
              '<rect x="460" y="60" width="150" height="130" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="535" y="88" text-anchor="middle" font-size="14" fill="var(--text)">API</text>' +
              '<text x="535" y="118" text-anchor="middle" font-size="13" fill="var(--warn)">background GET</text>' +
              '<line x1="182" y1="75" x2="226" y2="100" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="182" y1="175" x2="226" y2="150" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="414" y1="110" x2="456" y2="110" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<rect x="60" y="250" width="520" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--warn)">4. stale-while-revalidate: no spinner, silent refresh</text>' +
              '</svg>',
            label: { pl: 'Odświeżanie w tle', en: 'Background revalidate' },
            note: {
              pl: 'Po powrocie fokusu wpis jest przeterminowany. Użytkownik dalej widzi stare dane, a nowe doleca bez migotania interfejsu.',
              en: 'On window focus the entry is past its staleTime. The user still sees the old data while the new one arrives without a UI flash.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="30" y="40" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="72" text-anchor="middle" font-size="14" fill="var(--text)">Component A</text>' +
              '<text x="105" y="94" text-anchor="middle" font-size="13" fill="var(--accent)">PATCH sent</text>' +
              '<rect x="30" y="140" width="150" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="105" y="172" text-anchor="middle" font-size="14" fill="var(--text)">Component B</text>' +
              '<text x="105" y="194" text-anchor="middle" font-size="13" fill="var(--ok)">new data</text>' +
              '<rect x="230" y="60" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/>' +
              '<text x="320" y="88" text-anchor="middle" font-size="14" fill="var(--err)">Cache</text>' +
              '<text x="320" y="118" text-anchor="middle" font-size="13" fill="var(--muted)">key: invoices,42</text>' +
              '<text x="320" y="146" text-anchor="middle" font-size="13" fill="var(--err)">invalidated</text>' +
              '<text x="320" y="172" text-anchor="middle" font-size="13" fill="var(--ok)">refetched once for both</text>' +
              '<rect x="460" y="60" width="150" height="130" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="535" y="88" text-anchor="middle" font-size="14" fill="var(--text)">API</text>' +
              '<text x="535" y="118" text-anchor="middle" font-size="13" fill="var(--accent)">PATCH then GET</text>' +
              '<line x1="182" y1="75" x2="226" y2="100" stroke="var(--accent)" stroke-width="2"/>' +
              '<line x1="182" y1="175" x2="226" y2="150" stroke="var(--ok)" stroke-width="2"/>' +
              '<line x1="414" y1="110" x2="456" y2="110" stroke="var(--accent)" stroke-width="2"/>' +
              '<rect x="60" y="250" width="520" height="50" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--err)">5. mutation invalidates the key, every subscriber updates</text>' +
              '</svg>',
            label: { pl: 'Unieważnienie po mutacji', en: 'Invalidate after mutation' },
            note: {
              pl: 'Mutacja unieważnia klucz, a nie konkretny komponent. Dzięki temu każdy ekran czytający tę fakturę aktualizuje się sam, bez event busa i bez ręcznej synchronizacji.',
              en: 'The mutation invalidates a key, not a component. Every screen reading that invoice updates itself, with no event bus and no manual syncing.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie biuro, w którym każdy pracownik, gdy potrzebuje dokumentu, sam biegnie do archiwum na drugim końcu miasta. Dwadzieścia osób, dwadzieścia wypraw po ten sam papier. Chaos, korki i różne wersje tego samego dokumentu na biurkach.</p>' +
            '<p>Teraz zatrudniasz jednego kuriera z podręczną szafką. Każdy prosi kuriera. Kurier patrzy do szafki: jeśli ma świeży dokument, oddaje go od ręki. Jeśli trzy osoby proszą o to samo w tej samej chwili, jedzie <em>raz</em>. Jeśli dokument leży już długo, oddaje ci starą kopię i po cichu jedzie po nową.</p>' +
            '<p>Ten kurier to warstwa pobierania danych. Nikt w biurze nie musi znać adresu archiwum ani pamiętać, kiedy ostatnio tam był. Wystarczy poprosić o dokument po nazwie.</p>',
          en: '<p>Picture an office where every worker who needs a document runs to an archive across town on their own. Twenty people, twenty trips for the same sheet of paper. Traffic jams, chaos, and different versions of the same document on different desks.</p>' +
            '<p>Now you hire one courier with a small cabinet. Everyone asks the courier. The courier checks the cabinet: if the document is fresh, you get it instantly. If three people ask for the same thing at the same moment, he goes <em>once</em>. If the document has been sitting there a while, he hands you the old copy and quietly drives off for a new one.</p>' +
            '<p>That courier is the data-fetching layer. Nobody in the office needs the archive address or has to remember when they were last there. You just ask for a document by name.</p>'
        },
        school: {
          pl: '<p>Warstwa pobierania danych to nie jedna biblioteka, tylko <strong>cztery poziomy z jasnym kierunkiem zależności</strong>. Komponenty widzą tylko poziom najwyższy.</p>' +
            '<h4>Poziom 1: transport</h4>' +
            '<p>Jeden klient HTTP, najlepiej wygenerowany z OpenAPI. Tu żyją nagłówki autoryzacji, identyfikatory korelacji, timeouty, mapowanie błędów na typy domenowe. Zero logiki biznesowej.</p>' +
            '<h4>Poziom 2: cache</h4>' +
            '<p>TanStack Query, RTK Query albo Apollo. Robi rzeczy, których sam nie chcesz pisać: deduplikację równoległych zapytań, ponawianie z backoffem, odświeżanie po powrocie fokusu, garbage collection nieużywanych wpisów.</p>' +
            '<h4>Poziom 3: hooki domenowe</h4>' +
            '<pre><code>export function useInvoices(customerId, opts) {\n  return useQuery({\n    queryKey: invoiceKeys.list(customerId),\n    queryFn: () =&gt; api.invoices.list({ customerId }),\n    staleTime: 60_000,\n    ...opts\n  })\n}</code></pre>' +
            '<p>To jest miejsce, w którym mieszkają klucze cache, czasy świeżości i reguły unieważniania. Jeden plik na domenę, właściciel: zespół domenowy.</p>' +
            '<h4>Poziom 4: komponenty</h4>' +
            '<p>Wołają <code>useInvoices()</code> i nic więcej. Nie znają ścieżek URL, nie wiedzą, czy pod spodem jest REST czy GraphQL.</p>' +
            '<p>Dlaczego to się opłaca? Bo migracja z REST na GraphQL, dodanie BFF albo zmiana biblioteki cache dotyka poziomów 1-3, a nie trzystu komponentów rozsianych po monorepo. To jest ten sam argument, który znasz z design systemu: <strong>wąska talia zamiast szerokiego API</strong>.</p>' +
            '<p>Jest jeszcze efekt uboczny, który widać dopiero po kilku miesiącach: testy. Komponent, który woła tylko <code>useInvoices()</code>, testujesz podmieniając jeden hook. Komponent, który sam sięga po <code>fetch</code>, wymaga mockowania sieci, obsługi timeoutów i modli się o stabilność. Warstwy nie są tu estetyką, tylko warunkiem tego, żeby testy jednostkowe były szybkie i deterministyczne.</p>' +
            '<p>Praktyczna zasada podziału własności: transport należy do zespołu platformowego, hooki domenowe do zespołu, który jest właścicielem danej domeny biznesowej, a komponenty do zespołów produktowych. Każda z tych warstw ma wtedy jednego właściciela i jasny powód do zmiany.</p>',
          en: '<p>A data-fetching layer is not one library, it is <strong>four levels with a clear dependency direction</strong>. Components only ever see the top one.</p>' +
            '<h4>Level 1: transport</h4>' +
            '<p>A single HTTP client, ideally generated from OpenAPI. Auth headers, correlation ids, timeouts, and error-to-domain-type mapping live here. No business logic.</p>' +
            '<h4>Level 2: cache</h4>' +
            '<p>TanStack Query, RTK Query or Apollo. It does the things you do not want to write yourself: deduplicating concurrent requests, retry with backoff, refetch on window focus, garbage collecting unused entries.</p>' +
            '<h4>Level 3: domain hooks</h4>' +
            '<pre><code>export function useInvoices(customerId, opts) {\n  return useQuery({\n    queryKey: invoiceKeys.list(customerId),\n    queryFn: () =&gt; api.invoices.list({ customerId }),\n    staleTime: 60_000,\n    ...opts\n  })\n}</code></pre>' +
            '<p>This is where cache keys, freshness windows and invalidation rules live. One file per domain, owned by the domain team.</p>' +
            '<h4>Level 4: components</h4>' +
            '<p>They call <code>useInvoices()</code> and nothing else. They know no URLs and cannot tell whether REST or GraphQL sits underneath.</p>' +
            '<p>Why does it pay off? Because migrating REST to GraphQL, adding a BFF, or swapping the cache library touches levels 1-3, not three hundred components scattered across a monorepo. It is the same argument you know from design systems: <strong>a narrow waist instead of a wide API</strong>.</p>' +
            '<p>There is a side effect that only shows up months later: tests. A component that calls only <code>useInvoices()</code> is tested by swapping one hook. A component that reaches for <code>fetch</code> itself needs network mocking, timeout handling and a prayer for stability. The layering is not aesthetics here, it is the precondition for unit tests being fast and deterministic.</p>' +
            '<p>A practical ownership split: the transport belongs to the platform team, domain hooks to the team that owns that business domain, components to the product teams. Each layer then has one owner and one clear reason to change.</p>'
        },
        pro: {
          pl: '<p>Warstwa pobierania danych jest tym, czym w design systemie są tokeny: niewidoczna, dopóki jej nie ma, i wtedy kosztuje kwartał.</p>' +
            '<h4>Klucze cache to publiczne API</h4>' +
            '<p>Jeśli klucze budujesz ad hoc w komponentach, nikt nigdy nie unieważni ich poprawnie. Zrób z nich moduł z typami:</p>' +
            '<pre><code>export const invoiceKeys = {\n  all: ["invoices"] as const,\n  list: (customerId: string, f?: Filters) =&gt;\n    [...invoiceKeys.all, "list", customerId, f ?? {}] as const,\n  detail: (id: string) =&gt; [...invoiceKeys.all, "detail", id] as const\n}\n\n// unieważnienie hierarchiczne: jedna linia czyści całą domenę\nqueryClient.invalidateQueries({ queryKey: invoiceKeys.all })</code></pre>' +
            '<h4>Liczby, które warto znać</h4>' +
            '<ul>' +
            '<li><code>staleTime</code> jest domyślnie 0. To najczęstsza przyczyna nadmiaru ruchu: bez zmiany dostajesz refetch przy każdym mount i każdym focusie. Dla danych referencyjnych, jak słownik taryf, sensowne jest 5-15 minut, dla salda konta 0-30 sekund.</li>' +
            '<li><code>gcTime</code> (dawniej <code>cacheTime</code>) domyślnie 5 minut - to jak długo nieużywany wpis leży w pamięci, zanim zniknie.</li>' +
            '<li>Deduplikacja realnie ścina ruch. W panelu agenta, gdzie cztery widgety pytają o ten sam profil klienta, jeden klucz zamiast czterech to 75 procent mniej zapytań na każde otwarcie karty.</li>' +
            '<li>Generowany klient z OpenAPI (openapi-typescript, orval, Kubb) usuwa całą klasę błędów typu "backend zmienił pole i nikt nie zauważył" - błąd pojawia się w CI, nie u klienta.</li>' +
            '</ul>' +
            '<h4>Błędy jako dane</h4>' +
            '<p>Transport powinien mapować odpowiedzi HTTP na typy domenowe: 401 to nie "błąd sieci", tylko sygnał odświeżenia sesji; 409 to konflikt wersji do pokazania w UI; 429 to backoff. Komponent, który dostaje surowy <code>AxiosError</code>, zawsze skończy z <code>catch</code> i alertem.</p>' +
            '<h4>Dynamika organizacyjna</h4>' +
            '<p>W telco z dwudziestoma zespołami frontendowymi największym problemem nie jest wybór biblioteki, tylko to, że każdy zespół ma własny <code>fetchWrapper</code> z własnym retry. Efekt: burza retry przy incydencie backendu i N razy większy ruch dokładnie wtedy, gdy system pada. Wspólny pakiet transportu z jitterem i jednym budżetem retry jest tu decyzją niezawodnościową, nie estetyczną. Zapisz to w ADR i podepnij do platform teamu, nie do design systemu - to inny cykl wydawniczy i inny profil ryzyka.</p>',
          en: '<p>The data-fetching layer is to an application what tokens are to a design system: invisible until it is missing, and then it costs a quarter.</p>' +
            '<h4>Cache keys are a public API</h4>' +
            '<p>If keys are assembled ad hoc inside components, nobody will ever invalidate them correctly. Make them a typed module:</p>' +
            '<pre><code>export const invoiceKeys = {\n  all: ["invoices"] as const,\n  list: (customerId: string, f?: Filters) =&gt;\n    [...invoiceKeys.all, "list", customerId, f ?? {}] as const,\n  detail: (id: string) =&gt; [...invoiceKeys.all, "detail", id] as const\n}\n\n// hierarchical invalidation: one line clears the whole domain\nqueryClient.invalidateQueries({ queryKey: invoiceKeys.all })</code></pre>' +
            '<h4>Numbers worth knowing</h4>' +
            '<ul>' +
            '<li><code>staleTime</code> defaults to 0. That is the most common source of excess traffic: unchanged, you refetch on every mount and every focus. Reference data such as a tariff catalogue is fine at 5-15 minutes; an account balance at 0-30 seconds.</li>' +
            '<li><code>gcTime</code> (formerly <code>cacheTime</code>) defaults to 5 minutes - how long an unused entry lingers in memory before it is dropped.</li>' +
            '<li>Deduplication genuinely cuts traffic. In an agent console where four widgets ask for the same customer profile, one key instead of four is 75 percent fewer requests per opened case.</li>' +
            '<li>A generated OpenAPI client (openapi-typescript, orval, Kubb) removes an entire bug class of "the backend renamed a field and nobody noticed" - the failure shows up in CI, not at a customer.</li>' +
            '</ul>' +
            '<h4>Errors as data</h4>' +
            '<p>The transport should map HTTP responses onto domain types: 401 is not a "network error" but a session-refresh signal; 409 is a version conflict to surface in the UI; 429 means back off. A component handed a raw <code>AxiosError</code> always ends in a <code>catch</code> and an alert box.</p>' +
            '<h4>Org dynamics</h4>' +
            '<p>In a telco with twenty frontend teams the hard problem is not the library choice, it is that every team ships its own <code>fetchWrapper</code> with its own retry policy. The result is a retry storm during a backend incident and N times the traffic exactly when the system is falling over. A shared transport package with jitter and a single retry budget is a reliability decision, not an aesthetic one. Write it into an ADR and hang it off the platform team, not the design system - different release cadence, different risk profile.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co robi deduplikacja zapytań w kliencie cache?',
            en: 'What does request deduplication in a cache client do?'
          },
          options: [
            { pl: 'Usuwa duplikaty rekordów z odpowiedzi serwera', en: 'Removes duplicate records from the server response' },
            { pl: 'Łączy wiele równoległych subskrypcji tego samego klucza w jedno zapytanie sieciowe', en: 'Collapses several concurrent subscriptions to the same key into one network request' },
            { pl: 'Kompresuje ciało odpowiedzi przed zapisem do cache', en: 'Compresses the response body before writing it to cache' },
            { pl: 'Zapobiega dwukrotnemu zamontowaniu komponentu', en: 'Prevents a component from mounting twice' }
          ],
          correct: 1,
          explain: {
            pl: 'Jeśli cztery widgety w tej samej chwili proszą o ten sam klucz, leci jeden request, a wszyscy dostają tę samą odpowiedź. To jest główny powód, dla którego panel agenta nie zabija backendu przy otwarciu karty klienta.',
            en: 'If four widgets ask for the same key at the same moment, one request goes out and all of them get the same response. That is the main reason an agent console does not hammer the backend when a case is opened.'
          }
        },
        {
          q: {
            pl: 'Domyślny staleTime w TanStack Query wynosi 0. Jaki jest tego praktyczny skutek?',
            en: 'The default staleTime in TanStack Query is 0. What is the practical consequence?'
          },
          options: [
            { pl: 'Dane nigdy nie trafiają do cache', en: 'Data never enters the cache' },
            { pl: 'Zapytania nigdy nie są ponawiane po błędzie', en: 'Requests are never retried after an error' },
            { pl: 'Dane są uznawane za przeterminowane natychmiast, więc przy każdym mount i powrocie fokusu leci refetch w tle', en: 'Data is considered stale immediately, so every mount and every window focus triggers a background refetch' },
            { pl: 'Cache jest czyszczony przy każdej nawigacji', en: 'The cache is cleared on every navigation' }
          ],
          correct: 2,
          explain: {
            pl: 'Dane nadal są cachowane i pokazywane od ręki, ale są od razu uznane za nieświeże. Dla słowników i danych referencyjnych warto podnieść staleTime do kilku minut, inaczej generujesz ruch bez żadnej wartości dla użytkownika.',
            en: 'The data is still cached and shown instantly, it is just marked stale right away. For catalogues and reference data raise staleTime to minutes, otherwise you generate traffic with no user-visible benefit.'
          }
        },
        {
          q: {
            pl: 'Dlaczego klucze cache warto trzymać w jednym typowanym module zamiast składać je w komponentach?',
            en: 'Why keep cache keys in one typed module instead of assembling them inside components?'
          },
          options: [
            { pl: 'Bo unieważnianie po mutacji wymaga dokładnie tych samych kluczy, a hierarchia kluczy pozwala wyczyścić całą domenę jedną linią', en: 'Because invalidation after a mutation needs exactly the same keys, and a key hierarchy lets you clear a whole domain in one line' },
            { pl: 'Bo biblioteka odmawia działania z kluczami tekstowymi', en: 'Because the library refuses to work with string keys' },
            { pl: 'Bo klucze muszą być unikalne globalnie w całym monorepo', en: 'Because keys must be globally unique across the monorepo' },
            { pl: 'Bo skraca to czas budowania bundla', en: 'Because it shortens bundle build time' }
          ],
          correct: 0,
          explain: {
            pl: 'Unieważnianie działa przez dopasowanie prefiksu klucza. Klucze pisane ręcznie w komponentach rozjeżdżają się literówką albo kolejnością pól i mutacja po cichu nie odświeża połowy ekranów.',
            en: 'Invalidation works by key prefix matching. Hand-written keys drift apart through a typo or a different field order, and a mutation silently fails to refresh half the screens.'
          }
        },
        {
          q: {
            pl: 'Dwadzieścia zespołów ma własne wrappery fetch, każdy z retry 3x bez jittera. Backend zaczyna zwracać 503. Co się stanie i co jest właściwą odpowiedzią architektoniczną?',
            en: 'Twenty teams each ship their own fetch wrapper with 3x retry and no jitter. The backend starts returning 503. What happens, and what is the right architectural answer?'
          },
          options: [
            { pl: 'Nic szczególnego, retry zawsze pomaga; wystarczy zwiększyć liczbę prób', en: 'Nothing much, retries always help; just raise the attempt count' },
            { pl: 'Ruch spadnie samoistnie, więc wystarczy poczekać', en: 'Traffic will drop by itself, so just wait it out' },
            { pl: 'Ruch wzrośnie kilkukrotnie w momencie awarii; potrzebny jest wspólny pakiet transportu z jitterem, budżetem retry i circuit breakerem', en: 'Traffic multiplies exactly during the outage; you need a shared transport package with jitter, a retry budget and a circuit breaker' },
            { pl: 'Przeglądarka sama ograniczy retry do jednego na domenę', en: 'The browser will limit retries to one per domain by itself' }
          ],
          correct: 2,
          explain: {
            pl: 'To klasyczna burza retry: w chwili awarii każdy klient mnoży ruch, dokładnie wtedy, gdy backend go najmniej udźwignie. Bez jittera próby dodatkowo synchronizują się w fale. Lekarstwem jest jeden wspólny transport z limitem prób, a nie polityka na zespół.',
            en: 'This is a textbook retry storm: at the moment of failure every client multiplies traffic, precisely when the backend can least absorb it. Without jitter the attempts also synchronise into waves. The cure is one shared transport with a retry budget, not a per-team policy.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'realtime-and-optimistic-ui',
      title: {
        pl: 'Realtime i optimistic UI',
        en: 'Realtime and optimistic UI'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Optymistyczna aktualizacja', en: 'Optimistic update' },
          def: {
            pl: 'Pokazanie wyniku operacji, zanim serwer odpowie. Opłaca się tylko tam, gdzie porażka jest rzadka i tania w cofnięciu - nigdy przy płatnościach.',
            en: 'Showing the result of an operation before the server answers. Worth it only where failure is rare and cheap to undo - never for payments.'
          }
        },
        {
          term: { pl: 'Snapshot i rollback', en: 'Snapshot and rollback' },
          def: {
            pl: 'Obowiązkowy szkielet optymistycznej mutacji: zatrzymaj trwające zapytania, zrób kopię cache, podmień dane, przy błędzie przywróć kopię, a na końcu unieważnij klucz.',
            en: 'The mandatory skeleton of an optimistic mutation: cancel in-flight queries, snapshot the cache, apply the guess, restore the snapshot on error, and invalidate the key at the end.'
          }
        },
        {
          term: { pl: 'Rewizja encji', en: 'Entity revision' },
          def: {
            pl: 'Numer wersji (<code>rev</code>) niesiony przez zdarzenia i zapisy. Bez niego nie odróżnisz spóźnionego zdarzenia od nowego i nadpiszesz świeże dane starymi.',
            en: 'A version number (<code>rev</code>) carried by events and writes. Without it you cannot tell a late event from a new one, and you overwrite fresh data with stale data.'
          }
        },
        {
          term: { pl: 'SSE i Last-Event-ID', en: 'SSE and Last-Event-ID' },
          def: {
            pl: 'Server-Sent Events to jednokierunkowy strumień po HTTP, z automatycznym reconnectem; nagłówek <code>Last-Event-ID</code> pozwala odebrać zaległe zdarzenia zamiast zgubić je po cichu.',
            en: 'Server-Sent Events is a one-way stream over HTTP with automatic reconnect; the <code>Last-Event-ID</code> header lets you pick up missed events instead of losing them silently.'
          }
        },
        {
          term: { pl: 'Last write wins', en: 'Last write wins' },
          def: {
            pl: 'Najprostsza polityka konfliktu: wygrywa zapis, który dotarł ostatni. Akceptowalna dla statusów, katastrofalna dla pól edytowanych równolegle przez kilka osób.',
            en: 'The simplest conflict policy: the write that arrives last wins. Acceptable for statuses, disastrous for fields several people edit at once.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa3c1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="fa3c2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--err)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="16" fill="var(--text)">Two clocks: the user and the server</text>' +
          '<rect x="30" y="52" width="240" height="66" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="150" y="80" text-anchor="middle" font-size="15" fill="var(--accent)">Optimistic write</text>' +
          '<text x="150" y="102" text-anchor="middle" font-size="13" fill="var(--muted)">UI updates in 0 ms</text>' +
          '<rect x="370" y="52" width="240" height="66" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="490" y="80" text-anchor="middle" font-size="15" fill="var(--accent2)">Realtime push</text>' +
          '<text x="490" y="102" text-anchor="middle" font-size="13" fill="var(--muted)">server tells everyone</text>' +
          '<line x1="150" y1="118" x2="150" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3c1)"/>' +
          '<line x1="490" y1="118" x2="490" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3c1)"/>' +
          '<rect x="90" y="164" width="460" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="192" text-anchor="middle" font-size="15" fill="var(--text)">One reconciliation point: the cache</text>' +
          '<text x="320" y="214" text-anchor="middle" font-size="13" fill="var(--muted)">server value always wins over the guess</text>' +
          '<line x1="240" y1="230" x2="180" y2="272" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3c1)"/>' +
          '<line x1="400" y1="230" x2="460" y2="272" stroke="var(--err)" stroke-width="2" marker-end="url(#fa3c2)"/>' +
          '<rect x="40" y="276" width="240" height="76" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="160" y="304" text-anchor="middle" font-size="15" fill="var(--ok)">Confirmed</text>' +
          '<text x="160" y="326" text-anchor="middle" font-size="13" fill="var(--muted)">guess replaced by truth</text>' +
          '<rect x="360" y="276" width="240" height="76" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="480" y="304" text-anchor="middle" font-size="15" fill="var(--err)">Rolled back</text>' +
          '<text x="480" y="326" text-anchor="middle" font-size="13" fill="var(--muted)">snapshot restored, toast shown</text>' +
          '<rect x="40" y="368" width="560" height="40" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="394" text-anchor="middle" font-size="13" fill="var(--warn)">No snapshot means no rollback: optimism without a plan is a bug</text>' +
          '</svg>',
        caption: {
          pl: 'Zapis optymistyczny i push z serwera spotykają się w jednym miejscu - w cache. Przed każdą zgadywanką robisz snapshot, bo bez niego nie ma czego cofnąć.',
          en: 'Optimistic writes and server pushes meet in one place - the cache. Take a snapshot before every guess, because without one there is nothing to roll back to.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Pełny cykl optimistic update z nieudanym zapisem: snapshot, zgadywanka, błąd, cofnięcie, prawda z serwera.',
          en: 'A full optimistic update cycle with a failed write: snapshot, guess, error, rollback, server truth.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="40" y="50" width="230" height="150" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="78" text-anchor="middle" font-size="14" fill="var(--text)">UI: ticket status</text>' +
              '<rect x="70" y="98" width="170" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="155" y="124" text-anchor="middle" font-size="14" fill="var(--muted)">Open</text>' +
              '<text x="155" y="168" text-anchor="middle" font-size="13" fill="var(--muted)">user clicks Resolve</text>' +
              '<rect x="330" y="50" width="270" height="150" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="465" y="78" text-anchor="middle" font-size="14" fill="var(--accent2)">Cache</text>' +
              '<text x="465" y="106" text-anchor="middle" font-size="13" fill="var(--muted)">tickets/771 = Open</text>' +
              '<text x="465" y="134" text-anchor="middle" font-size="13" fill="var(--muted)">snapshot: none yet</text>' +
              '<text x="465" y="162" text-anchor="middle" font-size="13" fill="var(--muted)">no mutation in flight</text>' +
              '<rect x="60" y="248" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="279" text-anchor="middle" font-size="14" fill="var(--muted)">1. before: one value, agreed by everyone</text>' +
              '</svg>',
            label: { pl: 'Stan wyjściowy', en: 'Starting state' },
            note: {
              pl: 'Zgłoszenie ma status Open zarówno w UI, jak i w cache. Użytkownik za chwilę kliknie Resolve.',
              en: 'The ticket reads Open both in the UI and in the cache. The user is about to click Resolve.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="40" y="50" width="230" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="155" y="78" text-anchor="middle" font-size="14" fill="var(--text)">UI: ticket status</text>' +
              '<rect x="70" y="98" width="170" height="40" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="155" y="124" text-anchor="middle" font-size="14" fill="var(--ok)">Resolved</text>' +
              '<text x="155" y="168" text-anchor="middle" font-size="13" fill="var(--ok)">instant, 0 ms</text>' +
              '<rect x="330" y="50" width="270" height="150" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/>' +
              '<text x="465" y="78" text-anchor="middle" font-size="14" fill="var(--accent)">Cache</text>' +
              '<text x="465" y="106" text-anchor="middle" font-size="13" fill="var(--ok)">tickets/771 = Resolved</text>' +
              '<text x="465" y="134" text-anchor="middle" font-size="13" fill="var(--accent)">snapshot kept: Open</text>' +
              '<text x="465" y="162" text-anchor="middle" font-size="13" fill="var(--warn)">PATCH in flight</text>' +
              '<rect x="60" y="248" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="279" text-anchor="middle" font-size="14" fill="var(--accent)">2. optimistic write + snapshot taken</text>' +
              '</svg>',
            label: { pl: 'Zgadywanka i snapshot', en: 'Guess and snapshot' },
            note: {
              pl: 'Cache dostaje przewidywaną wartość natychmiast, ale najpierw odkłada kopię starej. Bez tej kopii cofnięcie jest niemożliwe.',
              en: 'The cache takes the predicted value immediately, but first it stores a copy of the old one. Without that copy a rollback is impossible.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="40" y="50" width="230" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="155" y="78" text-anchor="middle" font-size="14" fill="var(--text)">UI: ticket status</text>' +
              '<rect x="70" y="98" width="170" height="40" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="155" y="124" text-anchor="middle" font-size="14" fill="var(--ok)">Resolved</text>' +
              '<text x="155" y="168" text-anchor="middle" font-size="13" fill="var(--muted)">user already moved on</text>' +
              '<rect x="330" y="50" width="270" height="150" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/>' +
              '<text x="465" y="78" text-anchor="middle" font-size="14" fill="var(--err)">Cache</text>' +
              '<text x="465" y="106" text-anchor="middle" font-size="13" fill="var(--ok)">tickets/771 = Resolved</text>' +
              '<text x="465" y="134" text-anchor="middle" font-size="13" fill="var(--accent)">snapshot kept: Open</text>' +
              '<text x="465" y="162" text-anchor="middle" font-size="13" fill="var(--err)">409 conflict from API</text>' +
              '<rect x="60" y="248" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="279" text-anchor="middle" font-size="14" fill="var(--err)">3. the server disagrees: 409, someone edited it first</text>' +
              '</svg>',
            label: { pl: 'Serwer odmawia', en: 'The server refuses' },
            note: {
              pl: 'Inny agent zamknął to zgłoszenie sekundę wcześniej, więc API zwraca 409. UI wciąż pokazuje zgadywankę.',
              en: 'Another agent closed the ticket a second earlier, so the API returns 409. The UI is still showing the guess.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="40" y="50" width="230" height="150" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="155" y="78" text-anchor="middle" font-size="14" fill="var(--text)">UI: ticket status</text>' +
              '<rect x="70" y="98" width="170" height="40" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="155" y="124" text-anchor="middle" font-size="14" fill="var(--warn)">Open</text>' +
              '<text x="155" y="168" text-anchor="middle" font-size="13" fill="var(--warn)">toast: could not save</text>' +
              '<rect x="330" y="50" width="270" height="150" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/>' +
              '<text x="465" y="78" text-anchor="middle" font-size="14" fill="var(--warn)">Cache</text>' +
              '<text x="465" y="106" text-anchor="middle" font-size="13" fill="var(--warn)">tickets/771 = Open</text>' +
              '<text x="465" y="134" text-anchor="middle" font-size="13" fill="var(--muted)">snapshot restored</text>' +
              '<text x="465" y="162" text-anchor="middle" font-size="13" fill="var(--muted)">mutation settled</text>' +
              '<rect x="60" y="248" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="279" text-anchor="middle" font-size="14" fill="var(--warn)">4. rollback: onError puts the snapshot back</text>' +
              '</svg>',
            label: { pl: 'Cofnięcie', en: 'Rollback' },
            note: {
              pl: 'Handler onError przywraca snapshot i pokazuje komunikat z konkretem, a nie samym słowem błąd. Użytkownik widzi, że jego zmiana nie przeszła.',
              en: 'The onError handler restores the snapshot and shows a specific message rather than the word error. The user can see the change did not stick.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<rect x="40" y="50" width="230" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="155" y="78" text-anchor="middle" font-size="14" fill="var(--text)">UI: ticket status</text>' +
              '<rect x="70" y="98" width="170" height="40" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="155" y="124" text-anchor="middle" font-size="14" fill="var(--ok)">Closed by KOWALSKI</text>' +
              '<text x="155" y="168" text-anchor="middle" font-size="13" fill="var(--ok)">truth, not a guess</text>' +
              '<rect x="330" y="50" width="270" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/>' +
              '<text x="465" y="78" text-anchor="middle" font-size="14" fill="var(--ok)">Cache</text>' +
              '<text x="465" y="106" text-anchor="middle" font-size="13" fill="var(--ok)">tickets/771 = Closed</text>' +
              '<text x="465" y="134" text-anchor="middle" font-size="13" fill="var(--muted)">snapshot dropped</text>' +
              '<text x="465" y="162" text-anchor="middle" font-size="13" fill="var(--ok)">refetched on settle</text>' +
              '<rect x="60" y="248" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="279" text-anchor="middle" font-size="14" fill="var(--ok)">5. onSettled invalidates: server value wins</text>' +
              '</svg>',
            label: { pl: 'Prawda z serwera', en: 'Server truth' },
            note: {
              pl: 'Na końcu, niezależnie od wyniku, unieważniasz klucz i pobierasz stan z serwera. Dzięki temu UI kończy na prawdzie, a nie na cofniętej zgadywance.',
              en: 'Finally, regardless of the outcome, you invalidate the key and pull the server state. The UI ends on truth rather than on a rolled-back guess.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Zamawiasz kawę i barista od razu pisze twoje imię na kubku, zanim jeszcze cokolwiek zaparzy. Czujesz, że zamówienie <em>już się dzieje</em>, chociaż kawy nie ma. To właśnie optimistic UI: aplikacja zakłada, że się uda, i pokazuje wynik od razu.</p>' +
            '<p>Ale barista trzyma pod ladą kartkę z tym, co było wcześniej. Jeśli okaże się, że mleko się skończyło, wraca do ciebie i mówi: nie wyszło, oddaję pieniądze. Bez tej kartki nie miałby jak niczego cofnąć.</p>' +
            '<p>A realtime to głośnik w kawiarni. Gdy ktoś inny odbierze ostatnie ciastko, wszyscy słyszą to w tej samej chwili i nikt nie stoi przy ladzie z nieaktualną informacją w głowie.</p>' +
            '<p>Razem dają wrażenie, że aplikacja jest szybka i że wszyscy widzą to samo.</p>',
          en: '<p>You order a coffee and the barista writes your name on the cup before brewing anything. It feels like the order is <em>already happening</em>, even though there is no coffee yet. That is optimistic UI: the app assumes success and shows the result straight away.</p>' +
            '<p>But the barista keeps a slip under the counter with what things looked like before. If the milk turns out to be gone, he comes back and says: it did not work, here is your money. Without that slip he could not undo anything.</p>' +
            '<p>Realtime is the loudspeaker in the cafe. When somebody else takes the last pastry, everyone hears it at the same moment and nobody stands at the counter with outdated information in their head.</p>' +
            '<p>Together they make the app feel fast and make everyone see the same thing.</p>'
        },
        school: {
          pl: '<p>Optimistic UI to zakład: pokazujesz wynik operacji, zanim serwer go potwierdzi. Opłaca się, gdy szansa powodzenia jest wysoka, a operacja jest odwracalna - polubienie, zmiana statusu, przeciągnięcie karty. Nie opłaca się przy płatnościach i nieodwracalnych akcjach.</p>' +
            '<p>Wzorzec ma zawsze trzy fazy, i tej środkowej najczęściej brakuje w kodzie:</p>' +
            '<pre><code>useMutation({\n  mutationFn: setStatus,\n  onMutate: async (next) =&gt; {\n    await qc.cancelQueries({ queryKey: key })   // 1. zatrzymaj wyścig\n    const prev = qc.getQueryData(key)           // 2. SNAPSHOT\n    qc.setQueryData(key, next)                  // 3. zgadywanka\n    return { prev }\n  },\n  onError: (_e, _v, ctx) =&gt; qc.setQueryData(key, ctx.prev),  // cofnij\n  onSettled: () =&gt; qc.invalidateQueries({ queryKey: key })   // prawda\n})</code></pre>' +
            '<h4>Realtime: SSE czy WebSocket</h4>' +
            '<p>SSE (Server-Sent Events) to jednokierunkowy strumień po zwykłym HTTP - działa z CDN, proxy i nagłówkami autoryzacji, sam się wznawia. Wystarcza dla 90 procent przypadków typu "powiadom mnie, że coś się zmieniło". WebSocket bierz wtedy, gdy naprawdę potrzebujesz kanału w dwie strony: czat, współedycja, telemetria.</p>' +
            '<h4>Zasada, która oszczędza tygodnie</h4>' +
            '<p>Push z serwera nie powinien renderować się bezpośrednio. Niech <strong>unieważnia klucz w cache</strong> albo aktualizuje wpis w cache. Jeśli komponenty subskrybują socket bezpośrednio, każdy z nich ma własną kopię prawdy i po tygodniu masz dwa niezależne systemy stanu, które trzeba synchronizować ręcznie.</p>' +
            '<p>Warto też z góry ustalić, co użytkownik widzi w czasie oczekiwania. Są trzy sensowne warianty: pełny optymizm bez żadnego wskaźnika, optymizm z delikatnym stanem pending na wierszu oraz zwykły spinner blokujący akcję. Przy operacjach, które udają się ponad 99 procent razy, pierwszy wariant jest najlepszy. Przy 90 procentach lepszy jest drugi, bo cofnięcie nie zaskoczy użytkownika w połowie kolejnego kroku.</p>',
          en: '<p>Optimistic UI is a bet: you show the result of an operation before the server confirms it. It pays off when the success rate is high and the action is reversible - a like, a status change, a dragged card. It does not pay off for payments and irreversible actions.</p>' +
            '<p>The pattern always has three phases, and the middle one is the one usually missing from real code:</p>' +
            '<pre><code>useMutation({\n  mutationFn: setStatus,\n  onMutate: async (next) =&gt; {\n    await qc.cancelQueries({ queryKey: key })   // 1. stop the race\n    const prev = qc.getQueryData(key)           // 2. SNAPSHOT\n    qc.setQueryData(key, next)                  // 3. the guess\n    return { prev }\n  },\n  onError: (_e, _v, ctx) =&gt; qc.setQueryData(key, ctx.prev),  // undo\n  onSettled: () =&gt; qc.invalidateQueries({ queryKey: key })   // truth\n})</code></pre>' +
            '<h4>Realtime: SSE or WebSocket</h4>' +
            '<p>SSE (Server-Sent Events) is a one-way stream over plain HTTP - it works with CDNs, proxies and auth headers, and reconnects on its own. It covers 90 percent of "tell me something changed" cases. Reach for WebSockets when you genuinely need a two-way channel: chat, collaborative editing, telemetry.</p>' +
            '<h4>The rule that saves weeks</h4>' +
            '<p>A server push should not render directly. Let it <strong>invalidate a cache key</strong> or update a cache entry. If components subscribe to the socket themselves, each holds its own copy of the truth, and a week later you own two independent state systems that must be synced by hand.</p>' +
            '<p>Decide up front what the user sees while waiting. There are three reasonable variants: full optimism with no indicator at all, optimism plus a subtle pending state on the row, and a plain blocking spinner. For operations that succeed more than 99 percent of the time the first is best. At 90 percent the second wins, because a rollback will not ambush the user halfway into the next step.</p>'
        },
        pro: {
          pl: '<p>Realtime i optimistic UI to ta sama klasa problemu: <strong>masz dwa zegary, a użytkownik ma widzieć jeden interfejs</strong>. Cała trudność leży w tym, kto wygrywa konflikt i kiedy.</p>' +
            '<h4>Jeden punkt uzgodnienia</h4>' +
            '<p>Wybierz cache jako jedyne miejsce, w którym spotykają się: odpowiedzi HTTP, zdarzenia push i zapisy optymistyczne. Każde inne rozwiązanie prowadzi do rozjazdu przy pierwszym wyścigu. Konkretny mechanizm w TanStack Query to <code>cancelQueries</code> w <code>onMutate</code>: bez niego refetch, który wystartował 200 ms wcześniej, wraca po twojej zgadywance i cicho ją nadpisuje starymi danymi.</p>' +
            '<h4>Kontrakt zdarzeń</h4>' +
            '<pre><code>// dobre zdarzenie: mały, wersjonowany, z id encji\n{ "type": "ticket.updated", "id": "771", "rev": 18, "at": "2026-03-04T10:12:01Z" }\n\n// złe: cały obiekt bez wersji - nie wiesz, czy nie jest starszy\nniż to, co już masz w cache</code></pre>' +
            '<p>Zdarzenia mogą dotrzeć nie po kolei i mogą się zdublować. Numer rewizji pozwala odrzucić zdarzenie starsze niż stan lokalny. Bez tego przy niestabilnym 4G user zobaczy migotanie statusu w obie strony.</p>' +
            '<h4>Reconnect i backfill</h4>' +
            '<p>Każde połączenie się zerwie: tunel, winda, przełączenie z Wi-Fi na LTE. SSE ma <code>Last-Event-ID</code>, które serwer powinien honorować. Jeśli nie honoruje, po reconnect zrób pełne <code>invalidateQueries</code> na widocznych ekranach - to tańszy backfill niż dopisywanie brakujących zdarzeń. Zawsze zakładaj, że strumień zgubił zdarzenia.</p>' +
            '<h4>Skala i koszty</h4>' +
            '<ul>' +
            '<li>Otwarte połączenie to pamięć na serwerze. Przy 5 tysiącach zalogowanych agentów to 5 tysięcy trwałych połączeń - projekt musi to uwzględnić po stronie load balancera i limitów proxy (domyślny timeout idle w nginx to 60 s, więc potrzebujesz heartbeat).</li>' +
            '<li>Przy bardziej niż jednej aktualizacji na sekundę na użytkownika opłaca się batching po stronie serwera zamiast N osobnych zdarzeń.</li>' +
            '<li>Śledź metrykę "odsetek cofniętych mutacji". Powyżej 2-3 procent optymizm przestaje być pomocny i zaczyna być oszustwem wobec użytkownika.</li>' +
            '</ul>' +
            '<h4>Design system</h4>' +
            '<p>Stany pending, rolled-back i conflict muszą być <strong>tokenami i wariantami komponentów</strong>, a nie improwizacją każdego zespołu. W CHI oznacza to jawny wariant <code>is-pending</code> na wierszu tabeli i standardowy komponent konfliktu z akcją "zobacz aktualną wersję". Inaczej dwadzieścia zespołów wymyśli dwadzieścia sposobów pokazania, że coś się nie zapisało, a support dostanie dwadzieścia różnych zgłoszeń.</p>',
          en: '<p>Realtime and optimistic UI are the same class of problem: <strong>you have two clocks and the user must see one interface</strong>. All the difficulty sits in who wins a conflict, and when.</p>' +
            '<h4>One reconciliation point</h4>' +
            '<p>Pick the cache as the single place where HTTP responses, push events and optimistic writes meet. Anything else drifts apart at the first race. The concrete mechanism in TanStack Query is <code>cancelQueries</code> inside <code>onMutate</code>: without it, a refetch that started 200 ms earlier lands after your guess and silently overwrites it with stale data.</p>' +
            '<h4>The event contract</h4>' +
            '<pre><code>// good event: small, versioned, carries the entity id\n{ "type": "ticket.updated", "id": "771", "rev": 18, "at": "2026-03-04T10:12:01Z" }\n\n// bad: a whole object with no revision - you cannot tell whether it is\nolder than what you already hold in cache</code></pre>' +
            '<p>Events can arrive out of order and can be delivered twice. A revision number lets you drop an event older than local state. Without it, a shaky 4G connection makes the status flicker back and forth.</p>' +
            '<h4>Reconnect and backfill</h4>' +
            '<p>Every connection will break: a tunnel, a lift, a Wi-Fi to LTE handover. SSE has <code>Last-Event-ID</code>, which the server should honour. If it does not, run a full <code>invalidateQueries</code> for visible screens after reconnect - that backfill is cheaper than replaying missing events. Always assume the stream lost something.</p>' +
            '<h4>Scale and cost</h4>' +
            '<ul>' +
            '<li>An open connection is server memory. With 5,000 signed-in agents that is 5,000 long-lived connections, which the design must account for at the load balancer and proxy limits (nginx idle timeout defaults to 60 s, so you need a heartbeat).</li>' +
            '<li>Above roughly one update per second per user, server-side batching beats N separate events.</li>' +
            '<li>Track a "share of rolled-back mutations" metric. Past 2-3 percent, optimism stops helping and starts lying to the user.</li>' +
            '</ul>' +
            '<h4>Design system angle</h4>' +
            '<p>Pending, rolled-back and conflict states must be <strong>tokens and component variants</strong>, not something each team improvises. In CHI that means an explicit <code>is-pending</code> variant on a table row and a standard conflict component with a "view the current version" action. Otherwise twenty teams invent twenty ways of saying that something failed to save, and support receives twenty different bug reports.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest optimistic UI?',
            en: 'What is optimistic UI?'
          },
          options: [
            { pl: 'Pokazaniem wyniku operacji zanim serwer ją potwierdzi, z planem cofnięcia w razie błędu', en: 'Showing the result of an operation before the server confirms it, with a rollback plan if it fails' },
            { pl: 'Wyświetlaniem przyjaznych komunikatów o błędach', en: 'Displaying friendly error messages' },
            { pl: 'Ładowaniem danych z wyprzedzeniem przy najechaniu myszką', en: 'Prefetching data on mouse hover' },
            { pl: 'Ukrywaniem spinnerów, żeby aplikacja wyglądała szybciej', en: 'Hiding spinners so the app looks faster' }
          ],
          correct: 0,
          explain: {
            pl: 'Kluczowe są oba elementy: natychmiastowa aktualizacja i możliwość cofnięcia. Sama zgadywanka bez snapshotu to nie optymizm, tylko błąd, który ujawni się przy pierwszym 500 z serwera.',
            en: 'Both halves matter: the instant update and the ability to undo it. A guess without a snapshot is not optimism, it is a bug waiting for the first 500 from the server.'
          }
        },
        {
          q: {
            pl: 'Po co wołać cancelQueries na początku onMutate?',
            en: 'Why call cancelQueries at the start of onMutate?'
          },
          options: [
            { pl: 'Żeby zwolnić pamięć przed zapisem', en: 'To free memory before the write' },
            { pl: 'Żeby refetch będący już w locie nie wrócił później i nie nadpisał aktualizacji optymistycznej starymi danymi', en: 'So an in-flight refetch does not land later and overwrite the optimistic update with stale data' },
            { pl: 'Żeby wymusić ponowne zamontowanie komponentu', en: 'To force the component to remount' },
            { pl: 'Żeby wyłączyć retry dla tej mutacji', en: 'To disable retries for this mutation' }
          ],
          correct: 1,
          explain: {
            pl: 'To klasyczny wyścig: zapytanie wystartowało przed twoją mutacją, ale odpowiedź przychodzi po niej. Bez anulowania cache dostaje starą wartość i użytkownik widzi, jak jego zmiana znika.',
            en: 'It is a classic race: the request started before your mutation but the response arrives after it. Without cancelling, the cache takes the old value and the user watches their change vanish.'
          }
        },
        {
          q: {
            pl: 'Kiedy SSE jest lepszym wyborem niż WebSocket?',
            en: 'When is SSE a better choice than a WebSocket?'
          },
          options: [
            { pl: 'Przy współedycji dokumentu w czasie rzeczywistym', en: 'For real-time collaborative document editing' },
            { pl: 'Przy przesyłaniu dużych plików binarnych', en: 'For transferring large binary files' },
            { pl: 'Gdy potrzebujesz gwarancji dostarczenia każdego zdarzenia dokładnie raz', en: 'When you need exactly-once delivery guarantees for every event' },
            { pl: 'Przy jednokierunkowych powiadomieniach o zmianach, gdzie zależy ci na zwykłym HTTP, nagłówkach autoryzacji i automatycznym wznawianiu', en: 'For one-way change notifications where plain HTTP, auth headers and automatic reconnect matter' }
          ],
          correct: 3,
          explain: {
            pl: 'SSE jedzie po zwykłym HTTP, więc przechodzi przez proxy i CDN, działa z istniejącą autoryzacją i sam się wznawia z Last-Event-ID. WebSocket bierz dopiero wtedy, gdy naprawdę potrzebujesz kanału w dwie strony.',
            en: 'SSE rides plain HTTP, so it passes proxies and CDNs, works with existing auth and reconnects itself using Last-Event-ID. Take a WebSocket only when you genuinely need a two-way channel.'
          }
        },
        {
          q: {
            pl: 'Agenci na niestabilnym LTE zgłaszają, że status zgłoszenia miga tam i z powrotem. Zdarzenia z serwera zawierają cały obiekt, ale bez numeru rewizji. Co jest tu przyczyną i lekarstwem?',
            en: 'Agents on flaky LTE report that a ticket status flickers back and forth. Server events carry the whole object but no revision number. What is the cause and the cure?'
          },
          options: [
            { pl: 'Zbyt niski staleTime; wystarczy go podnieść do 5 minut', en: 'staleTime is too low; raise it to 5 minutes' },
            { pl: 'Zdarzenia docierają nie po kolei i zdublowane, a bez wersji nie da się odrzucić starszego; dodaj monotoniczną rewizję i ignoruj zdarzenia starsze niż stan lokalny', en: 'Events arrive out of order and duplicated, and without a version you cannot drop the older one; add a monotonic revision and ignore events older than local state' },
            { pl: 'Przeglądarka buforuje odpowiedzi SSE; należy dodać nagłówek no-store', en: 'The browser buffers SSE responses; add a no-store header' },
            { pl: 'Należy przejść na WebSocket, bo SSE nie obsługuje kolejności', en: 'Switch to WebSockets, because SSE cannot preserve ordering' }
          ],
          correct: 1,
          explain: {
            pl: 'Przy zrywanym połączeniu dostarczenie zdarzeń jest z natury at-least-once i bez gwarancji kolejności. Wersjonowanie encji pozwala każdemu klientowi lokalnie zdecydować, czy zdarzenie wnosi coś nowego. Zmiana transportu tego nie naprawia.',
            en: 'On a broken-up connection delivery is inherently at-least-once with no ordering guarantee. Versioning the entity lets every client decide locally whether an event adds anything. Changing the transport does not fix it.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'offline-first-pwa',
      title: {
        pl: 'Offline-first i PWA',
        en: 'Offline-first and PWA'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'Outbox', en: 'Outbox' },
          def: {
            pl: 'Trwała kolejka operacji zapisanych lokalnie i wysyłanych, gdy wróci sieć. Kolejkujesz intencję ("zamknij zgłoszenie"), a nie gotowe żądanie HTTP.',
            en: 'A durable queue of operations stored locally and sent when the network returns. You queue the intent (close this ticket), not a prebuilt HTTP request.'
          }
        },
        {
          term: { pl: 'Klucz idempotencji', en: 'Idempotency key' },
          def: {
            pl: 'Identyfikator nadany operacji raz, przy jej utworzeniu, i wysyłany w nagłówku <code>Idempotency-Key</code> przy każdej próbie. Pięć ponowień daje jeden skutek na serwerze.',
            en: 'An id assigned to an operation once, at creation, and sent in the <code>Idempotency-Key</code> header on every attempt. Five retries produce one effect on the server.'
          }
        },
        {
          term: { pl: 'Odrzucenie z rewizją', en: 'Reject with a revision' },
          def: {
            pl: 'Polityka konfliktu, w której serwer odrzuca zapis oparty na starej rewizji i oddaje aktualną wersję, a klient pokazuje użytkownikowi różnicę zamiast po cichu nadpisywać.',
            en: 'A conflict policy where the server rejects a write based on an old revision and returns the current one, so the client shows the user a diff instead of silently overwriting.'
          }
        },
        {
          term: { pl: 'CRDT', en: 'CRDT' },
          def: {
            pl: 'Struktura danych zbieżna bez centralnego rozjemcy (Yjs, Automerge). Rozwiązuje edycję współbieżną, ale kosztuje rozmiarem bundle i przebudową modelu danych.',
            en: 'A data structure that converges with no central referee (Yjs, Automerge). It solves concurrent editing but costs bundle size and a rework of the data model.'
          }
        },
        {
          term: { pl: 'Powłoka aplikacji', en: 'App shell' },
          def: {
            pl: 'Minimalny HTML, CSS i JS precache-owany przez service workera, żeby aplikacja wystartowała bez sieci. Dane dochodzą osobno, z lokalnej bazy albo z cache.',
            en: 'The minimal HTML, CSS and JS precached by the service worker so the app boots with no network. Data arrives separately, from a local database or the cache.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa3d1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="16" fill="var(--text)">Write to the queue, not to the network</text>' +
          '<rect x="40" y="48" width="230" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="155" y="84" text-anchor="middle" font-size="15" fill="var(--text)">UI action</text>' +
          '<line x1="155" y1="108" x2="155" y2="146" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3d1)"/>' +
          '<rect x="40" y="150" width="230" height="80" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="155" y="180" text-anchor="middle" font-size="15" fill="var(--accent2)">Outbox in IndexedDB</text>' +
          '<text x="155" y="204" text-anchor="middle" font-size="13" fill="var(--muted)">op id, payload, attempts</text>' +
          '<line x1="270" y1="190" x2="368" y2="190" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3d1)"/>' +
          '<rect x="372" y="150" width="228" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="486" y="180" text-anchor="middle" font-size="15" fill="var(--text)">Sync worker</text>' +
          '<text x="486" y="204" text-anchor="middle" font-size="13" fill="var(--muted)">drains when online</text>' +
          '<line x1="486" y1="230" x2="486" y2="268" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa3d1)"/>' +
          '<rect x="372" y="272" width="228" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="486" y="302" text-anchor="middle" font-size="15" fill="var(--ok)">API</text>' +
          '<text x="486" y="324" text-anchor="middle" font-size="13" fill="var(--muted)">Idempotency-Key</text>' +
          '<rect x="40" y="252" width="230" height="90" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="155" y="280" text-anchor="middle" font-size="15" fill="var(--warn)">Conflict policy</text>' +
          '<text x="155" y="304" text-anchor="middle" font-size="13" fill="var(--muted)">last write wins, or</text>' +
          '<text x="155" y="326" text-anchor="middle" font-size="13" fill="var(--muted)">ask the user</text>' +
          '<rect x="40" y="362" width="560" height="48" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="382" text-anchor="middle" font-size="13" fill="var(--muted)">Offline is not an error state: it is a normal mode of the app</text>' +
          '<text x="320" y="402" text-anchor="middle" font-size="13" fill="var(--err)">Hardest part is not caching, it is merging</text>' +
          '</svg>',
        caption: {
          pl: 'W trybie offline-first akcja użytkownika trafia do kolejki w IndexedDB, a nie do sieci. Osobny worker opróżnia kolejkę, gdy wróci łączność, a klucz idempotencji chroni przed dublami.',
          en: 'In offline-first, a user action goes into an IndexedDB queue rather than onto the network. A separate worker drains it when connectivity returns, and an idempotency key protects against duplicates.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie listonosza, który pracuje w górach. Czasem ma zasięg, czasem nie. Gdyby przy każdym liście musiał dzwonić do centrali, stałyby w miejscu godzinami.</p>' +
            '<p>Zamiast tego ma <strong>torbę</strong>. Wrzuca do niej wszystko, co ma do wysłania, i idzie dalej. Gdy dojdzie na szczyt i złapie zasięg, torba opróżniania się sama.</p>' +
            '<p>Ma też <strong>notes z kopiami</strong> najważniejszych papierów, więc nawet bez zasięgu może komuś pokazać, co jest w umowie.</p>' +
            '<p>Jedna rzecz jest trudna. Jeśli w międzyczasie ktoś w centrali zmienił ten sam papier, po powrocie są dwie wersje. Ktoś musi zdecydować, która jest ważniejsza - i to jest naprawdę trudna część, a nie sama torba.</p>',
          en: '<p>Picture a postman working in the mountains. Sometimes he has signal, sometimes he does not. If he had to phone the office for every letter, he would stand still for hours.</p>' +
            '<p>Instead he carries a <strong>bag</strong>. Everything he needs to send goes in the bag and he keeps walking. When he reaches the ridge and catches a signal, the bag empties itself.</p>' +
            '<p>He also carries a <strong>notebook of copies</strong> of the important papers, so even with no signal he can show somebody what the contract says.</p>' +
            '<p>One thing is hard. If somebody at the office changed the same paper meanwhile, there are now two versions. Someone has to decide which one counts - and that, not the bag, is the genuinely hard part.</p>'
        },
        school: {
          pl: '<p>Offline-first nie oznacza "aplikacja pokazuje komunikat, gdy nie ma sieci". Oznacza, że <strong>brak sieci jest normalnym trybem pracy</strong>, a nie awarią. To realny wymóg w telco: technik w piwnicy, kurier w windzie, agent w terenie.</p>' +
            '<h4>Trzy niezależne warstwy</h4>' +
            '<ol>' +
            '<li><strong>Powłoka aplikacji.</strong> Service worker precachuje HTML, CSS, JS i ikony. Tu wystarcza gotowe strategie z Workboxa: cache-first dla plików z hashem w nazwie, network-first dla nawigacji.</li>' +
            '<li><strong>Dane do odczytu.</strong> Trzymane w IndexedDB, zwykle przez persystencję cache (np. persistQueryClient w TanStack Query albo własny adapter na Dexie). Użytkownik widzi ostatni znany stan z jasną informacją, kiedy pochodzi.</li>' +
            '<li><strong>Zapisy.</strong> Kolejka outbox: akcja zapisuje się lokalnie i czeka. Przeglądarki Chromium mają Background Sync, który obudzi service workera po powrocie sieci; w Safari go nie ma, więc i tak potrzebujesz zwykłego drenu przy starcie aplikacji i przy zdarzeniu <code>online</code>.</li>' +
            '</ol>' +
            '<pre><code>async function enqueue(op) {\n  op.id = crypto.randomUUID()   // klucz idempotencji\n  await db.outbox.add(op)\n  if (navigator.onLine) drain()\n}</code></pre>' +
            '<h4>Czego nie robić offline</h4>' +
            '<p>Operacji nieodwracalnych i takich, które wymagają aktualnego stanu serwera: płatności, aktywacji usługi, rezerwacji ostatniej sztuki. Lepiej jawnie je zablokować z czytelnym komunikatem niż obiecać użytkownikowi coś, co za godzinę odrzuci backend.</p>' +
            '<p>Testowanie? Przełącznik offline w DevTools to za mało. Realny scenariusz to <em>złe</em> łącze, nie brak łącza: 3 sekundy opóźnienia i 30 procent utraconych pakietów. Użyj profilu throttlingu i wymuś częściowe niepowodzenia.</p>',
          en: '<p>Offline-first does not mean "the app shows a banner when the network is down". It means <strong>no network is a normal operating mode</strong>, not a failure. In a telco this is a real requirement: a technician in a basement, a courier in a lift, a field agent in a rural cell.</p>' +
            '<h4>Three independent layers</h4>' +
            '<ol>' +
            '<li><strong>The app shell.</strong> A service worker precaches HTML, CSS, JS and icons. Off-the-shelf Workbox strategies are enough: cache-first for hashed assets, network-first for navigations.</li>' +
            '<li><strong>Read data.</strong> Stored in IndexedDB, usually via cache persistence (persistQueryClient in TanStack Query, or your own Dexie adapter). The user sees the last known state with a clear indication of when it is from.</li>' +
            '<li><strong>Writes.</strong> An outbox queue: the action is stored locally and waits. Chromium browsers have Background Sync to wake the service worker when connectivity returns; Safari does not, so you need a plain drain on app start and on the <code>online</code> event anyway.</li>' +
            '</ol>' +
            '<pre><code>async function enqueue(op) {\n  op.id = crypto.randomUUID()   // idempotency key\n  await db.outbox.add(op)\n  if (navigator.onLine) drain()\n}</code></pre>' +
            '<h4>What not to allow offline</h4>' +
            '<p>Irreversible actions and anything needing current server state: payments, service activation, reserving the last item in stock. Blocking them explicitly with a readable message beats promising the user something the backend will reject an hour later.</p>' +
            '<p>Testing? The DevTools offline toggle is not enough. The realistic scenario is a <em>bad</em> link, not a missing one: 3 seconds of latency and 30 percent packet loss. Use a throttling profile and force partial failures.</p>'
        },
        pro: {
          pl: '<p>Offline-first to decyzja produktowa przebrana za techniczną. Zanim napiszesz linijkę kodu, ustal z biznesem <strong>które operacje mają działać bez sieci i jaka jest polityka konfliktów</strong>. Bez tej odpowiedzi każda implementacja będzie zła.</p>' +
            '<h4>Idempotencja jest kontraktem z backendem</h4>' +
            '<p>Kolejka offline gwarantuje dostarczenie <em>co najmniej raz</em>. Klient wysyła, traci zasięg przed odpowiedzią, ponawia - i backend widzi dwa żądania. Jedyna poprawna odpowiedź to nagłówek <code>Idempotency-Key</code> generowany w momencie <strong>utworzenia operacji</strong>, nie w momencie wysyłki, oraz deduplikacja po stronie serwera przez 24 godziny. To rozmowa z zespołem backendu, którą trzeba odbyć na starcie, nie po pierwszym incydencie z podwójnym zamówieniem.</p>' +
            '<pre><code>// operacja powstaje raz, nawet jeśli wysyłka nastąpi 5 razy\nconst op = { id: crypto.randomUUID(), type: "ticket.close", ticketId, rev }\nawait db.outbox.add(op)\n\n// przy każdej próbie leci ten sam klucz\nfetch(url, { method: "POST", headers: { "Idempotency-Key": op.id }, body })</code></pre>' +
            '<h4>Konflikty: wybierz świadomie</h4>' +
            '<ul>' +
            '<li><strong>Last write wins.</strong> Najtańsze, akceptowalne dla notatek i pól opisowych. Nieakceptowalne dla statusów i kwot.</li>' +
            '<li><strong>Odrzucenie z rewizją.</strong> Klient wysyła <code>rev</code>, backend zwraca 409 z aktualną wersją, UI pokazuje ekran porównania. Najlepszy stosunek jakości do złożoności w aplikacjach biznesowych.</li>' +
            '<li><strong>CRDT (np. Yjs, Automerge).</strong> Automatyczne scalanie bez konfliktów, ale płacisz rozmiarem dokumentu i zupełnie inną architekturą danych. Uzasadnione przy współedycji, nie przy formularzu zgłoszenia.</li>' +
            '</ul>' +
            '<h4>Twarde ograniczenia platformy</h4>' +
            '<ul>' +
            '<li>iOS czyści dane witryny po około 7 dniach braku interakcji, jeśli PWA nie jest dodana do ekranu głównego. Kolejka offline może po prostu zniknąć - trzeba to zaprojektować, nie zignorować.</li>' +
            '<li>Limity magazynu są udziałem od dostępnego dysku (rzędu kilku procent). Dla 500 zgłoszeń z załącznikami to realny sufit - trzymaj metadane, nie pliki.</li>' +
            '<li>Background Sync nie istnieje w Safari i Firefoksie. Zaprojektuj dren przy starcie jako ścieżkę główną, a Background Sync jako bonus.</li>' +
            '<li>Migracje schematu IndexedDB są jak migracje bazy - potrzebujesz numeru wersji i ścieżki upgrade, bo stare urządzenia potrafią wrócić po pół roku.</li>' +
            '</ul>' +
            '<h4>Perspektywa principal</h4>' +
            '<p>Najczęstszy błąd organizacyjny: każdy zespół buduje własny outbox. Sensowniejsze jest jedno maleńkie SDK (kolejka, idempotencja, wskaźnik stanu połączenia, hooki polityki konfliktów) utrzymywane przez platform team, plus komponenty stanu offline w design systemie. Wtedy dyskusja w zespołach schodzi z "jak zrobić kolejkę" na "które operacje wpuszczamy offline" - czyli tam, gdzie faktycznie jest ryzyko.</p>',
          en: '<p>Offline-first is a product decision dressed as a technical one. Before writing a line of code, settle with the business <strong>which operations must work without a network and what the conflict policy is</strong>. Without that answer every implementation is the wrong one.</p>' +
            '<h4>Idempotency is a contract with the backend</h4>' +
            '<p>An offline queue guarantees <em>at-least-once</em> delivery. The client sends, loses signal before the response, retries - and the backend sees two requests. The only correct answer is an <code>Idempotency-Key</code> header generated when the operation is <strong>created</strong>, not when it is sent, plus server-side deduplication for 24 hours. That is a conversation to have with the backend team up front, not after the first duplicate-order incident.</p>' +
            '<pre><code>// the operation is created once, even if it is sent 5 times\nconst op = { id: crypto.randomUUID(), type: "ticket.close", ticketId, rev }\nawait db.outbox.add(op)\n\n// every attempt carries the same key\nfetch(url, { method: "POST", headers: { "Idempotency-Key": op.id }, body })</code></pre>' +
            '<h4>Conflicts: choose deliberately</h4>' +
            '<ul>' +
            '<li><strong>Last write wins.</strong> Cheapest, acceptable for notes and free-text fields. Unacceptable for statuses and amounts.</li>' +
            '<li><strong>Reject with a revision.</strong> The client sends <code>rev</code>, the backend answers 409 with the current version, the UI shows a comparison screen. Best quality-to-complexity ratio for business apps.</li>' +
            '<li><strong>CRDTs (Yjs, Automerge).</strong> Automatic conflict-free merging, paid for in document size and an entirely different data architecture. Justified for collaborative editing, not for a ticket form.</li>' +
            '</ul>' +
            '<h4>Hard platform limits</h4>' +
            '<ul>' +
            '<li>iOS evicts site data after roughly 7 days without interaction unless the PWA is installed to the home screen. The offline queue can simply disappear - design for it rather than ignore it.</li>' +
            '<li>Storage quota is a share of free disk (a few percent). For 500 tickets with attachments that is a real ceiling - keep metadata, not files.</li>' +
            '<li>Background Sync does not exist in Safari or Firefox. Make the on-startup drain the primary path and Background Sync a bonus.</li>' +
            '<li>IndexedDB schema migrations behave like database migrations - you need a version number and an upgrade path, because old devices come back after six months.</li>' +
            '</ul>' +
            '<h4>The principal view</h4>' +
            '<p>The classic organisational failure is every team building its own outbox. Far better is one tiny SDK (queue, idempotency, connectivity indicator, conflict-policy hooks) owned by the platform team, plus offline-state components in the design system. Then the team-level conversation moves from "how do we build a queue" to "which operations do we allow offline" - which is where the actual risk lives.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Do czego służy kolejka outbox w aplikacji offline-first?',
            en: 'What is an outbox queue for in an offline-first app?'
          },
          options: [
            { pl: 'Do przechowywania logów błędów do późniejszej analizy', en: 'Storing error logs for later analysis' },
            { pl: 'Do buforowania obrazków i czcionek', en: 'Buffering images and fonts' },
            { pl: 'Do zapisywania lokalnie operacji zapisu i wysłania ich, gdy wróci łączność', en: 'Storing write operations locally and sending them once connectivity returns' },
            { pl: 'Do kompresowania odpowiedzi API przed zapisem na dysk', en: 'Compressing API responses before writing them to disk' }
          ],
          correct: 2,
          explain: {
            pl: 'Outbox odwraca kierunek myślenia: akcja użytkownika trafia najpierw do trwałej kolejki, a sama wysyłka jest osobnym, ponawialnym procesem. Dzięki temu utrata zasięgu nie gubi pracy użytkownika.',
            en: 'The outbox inverts the flow: a user action first lands in a durable queue, and sending is a separate retryable process. Losing signal then does not lose the user work.'
          }
        },
        {
          q: {
            pl: 'Dlaczego klucz idempotencji powinien powstawać przy tworzeniu operacji, a nie przy każdej próbie wysłania?',
            en: 'Why should an idempotency key be created when the operation is created, not on each send attempt?'
          },
          options: [
            { pl: 'Bo dzięki temu wszystkie ponowienia tej samej operacji mają ten sam klucz i backend może je zdeduplikować', en: 'Because then all retries of the same operation share one key and the backend can deduplicate them' },
            { pl: 'Bo generowanie UUID jest kosztowne obliczeniowo', en: 'Because generating a UUID is computationally expensive' },
            { pl: 'Bo przeglądarka nie pozwala generować UUID w service workerze', en: 'Because the browser cannot generate UUIDs in a service worker' },
            { pl: 'Bo klucz musi być zgodny z identyfikatorem sesji', en: 'Because the key must match the session id' }
          ],
          correct: 0,
          explain: {
            pl: 'Klucz generowany przy wysyłce byłby za każdym razem inny, więc ponowienie po utracie odpowiedzi wyglądałoby dla backendu jak nowa operacja - i klient dostałby dwa zamówienia zamiast jednego.',
            en: 'A key generated at send time would differ on every attempt, so a retry after a lost response would look like a brand new operation to the backend - and the customer would get two orders instead of one.'
          }
        },
        {
          q: {
            pl: 'Która operacja jest najgorszym kandydatem do wykonywania w trybie offline?',
            en: 'Which operation is the worst candidate for offline execution?'
          },
          options: [
            { pl: 'Dopisanie notatki technicznej do zgłoszenia', en: 'Adding a technical note to a ticket' },
            { pl: 'Oznaczenie zgłoszenia jako przeczytane', en: 'Marking a ticket as read' },
            { pl: 'Zapisanie odczytu licznika w terenie', en: 'Recording a meter reading in the field' },
            { pl: 'Aktywacja płatnej usługi na koncie klienta', en: 'Activating a paid service on a customer account' }
          ],
          correct: 3,
          explain: {
            pl: 'Aktywacja jest nieodwracalna i zależy od aktualnego stanu konta oraz limitów po stronie serwera. Obiecanie jej offline kończy się odrzuceniem godzinę później i reklamacją - lepiej jawnie zablokować akcję.',
            en: 'Activation is irreversible and depends on current account state and server-side limits. Promising it offline ends in a rejection an hour later and a complaint - better to block the action explicitly.'
          }
        },
        {
          q: {
            pl: 'Technicy zgłaszają, że po weekendzie aplikacja na iPhonach traci zakolejkowane zapisy. Jaka jest najbardziej prawdopodobna przyczyna?',
            en: 'Technicians report that after a weekend the app on iPhones loses queued writes. What is the most likely cause?'
          },
          options: [
            { pl: 'IndexedDB nie obsługuje zapisów większych niż 1 MB', en: 'IndexedDB cannot store writes larger than 1 MB' },
            { pl: 'Service worker wygasa po 24 godzinach i kasuje wszystkie bazy', en: 'The service worker expires after 24 hours and wipes every database' },
            { pl: 'Safari usuwa dane witryny po około 7 dniach bez interakcji, jeśli PWA nie jest zainstalowana na ekranie głównym', en: 'Safari evicts site data after about 7 days without interaction unless the PWA is installed to the home screen' },
            { pl: 'Background Sync w iOS wysyła dane, ale nie zapisuje potwierdzeń', en: 'Background Sync on iOS sends the data but never records the confirmations' }
          ],
          correct: 2,
          explain: {
            pl: 'To udokumentowane zachowanie ITP w Safari. Instalacja PWA na ekranie głównym zdejmuje ten limit, ale i tak warto ostrzegać użytkownika o niewysłanych operacjach i synchronizować przy każdym otwarciu aplikacji.',
            en: 'This is documented ITP behaviour in Safari. Installing the PWA to the home screen lifts the limit, but you should still warn the user about unsent operations and sync on every app open.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'api-contracts-bff',
      title: {
        pl: 'Kontrakty API i BFF',
        en: 'API contracts and the BFF'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'BFF (backend for frontend)', en: 'BFF (backend for frontend)' },
          def: {
            pl: 'Cienka warstwa serwerowa dopasowująca dane do jednego klienta lub ekranu: agreguje, przycina i nazywa pola po ludzku. Nie jest miejscem na logikę biznesową.',
            en: 'A thin server layer shaping data for one client or one screen: it aggregates, trims and renames fields to something human. It is not a place for business logic.'
          }
        },
        {
          term: { pl: 'Kontrakt API', en: 'API contract' },
          def: {
            pl: 'Specyfikacja (OpenAPI, GraphQL SDL, Protobuf) traktowana jako artefakt weryfikowalny maszynowo, a nie opis na Confluence. Kontraktem jest plik w repozytorium, nie rozmowa.',
            en: 'A specification (OpenAPI, GraphQL SDL, Protobuf) treated as a machine-verifiable artifact, not a Confluence page. The contract is a file in the repo, not a conversation.'
          }
        },
        {
          term: { pl: 'Generowanie typów z kontraktu', en: 'Contract-driven type generation' },
          def: {
            pl: 'Typy TypeScriptu tworzone ze specyfikacji w CI (<code>openapi-typescript</code>). Różnica w wygenerowanych plikach oznacza zmianę kontraktu i wywala build, zanim trafi ona na produkcję.',
            en: 'TypeScript types produced from the spec in CI (<code>openapi-typescript</code>). A diff in the generated files means the contract moved, and it fails the build before it reaches production.'
          }
        },
        {
          term: { pl: 'Test kontraktowy sterowany konsumentem', en: 'Consumer-driven contract test' },
          def: {
            pl: 'Konsument publikuje swoje oczekiwania (Pact), a dostawca weryfikuje je w swoim CI. Złamanie kontraktu psuje build dostawcy, a nie twój ekran w piątek wieczorem.',
            en: 'The consumer publishes its expectations (Pact) and the provider verifies them in its own CI. Breaking the contract fails the provider build, not your screen on a Friday evening.'
          }
        },
        {
          term: { pl: 'Nagłówek Sunset', en: 'Sunset header' },
          def: {
            pl: 'Nagłówek HTTP ogłaszający datę wyłączenia endpointu. Razem z zadeklarowanym oknem deprecjacji zamienia wygaszanie wersji API w plan zamiast w incydent.',
            en: 'An HTTP header announcing the date an endpoint goes away. With a declared deprecation window it turns an API version shutdown into a plan rather than an incident.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa3e1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker>' +
          '<marker id="fa3e2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--err)"/></marker></defs>' +
          '<text x="320" y="26" text-anchor="middle" font-size="16" fill="var(--text)">Without a BFF vs with a BFF</text>' +
          '<rect x="24" y="46" width="280" height="184" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="164" y="72" text-anchor="middle" font-size="14" fill="var(--err)">7 calls, waterfall</text>' +
          '<rect x="104" y="86" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="164" y="108" text-anchor="middle" font-size="13" fill="var(--text)">Screen</text>' +
          '<line x1="130" y1="120" x2="76" y2="160" stroke="var(--err)" stroke-width="2" marker-end="url(#fa3e2)"/>' +
          '<line x1="164" y1="120" x2="164" y2="160" stroke="var(--err)" stroke-width="2" marker-end="url(#fa3e2)"/>' +
          '<line x1="198" y1="120" x2="252" y2="160" stroke="var(--err)" stroke-width="2" marker-end="url(#fa3e2)"/>' +
          '<rect x="34" y="164" width="80" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="74" y="186" text-anchor="middle" font-size="13" fill="var(--muted)">billing</text>' +
          '<rect x="124" y="164" width="80" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="164" y="186" text-anchor="middle" font-size="13" fill="var(--muted)">crm</text>' +
          '<rect x="214" y="164" width="80" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="254" y="186" text-anchor="middle" font-size="13" fill="var(--muted)">network</text>' +
          '<text x="164" y="218" text-anchor="middle" font-size="13" fill="var(--err)">mobile TTFB suffers</text>' +
          '<rect x="336" y="46" width="280" height="184" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="476" y="72" text-anchor="middle" font-size="14" fill="var(--ok)">1 call, shaped payload</text>' +
          '<rect x="416" y="86" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="476" y="108" text-anchor="middle" font-size="13" fill="var(--text)">Screen</text>' +
          '<line x1="476" y1="120" x2="476" y2="140" stroke="var(--ok)" stroke-width="2" marker-end="url(#fa3e1)"/>' +
          '<rect x="406" y="144" width="140" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="476" y="166" text-anchor="middle" font-size="13" fill="var(--accent)">BFF</text>' +
          '<line x1="430" y1="178" x2="396" y2="196" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="476" y1="178" x2="476" y2="196" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="522" y1="178" x2="556" y2="196" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="476" y="218" text-anchor="middle" font-size="13" fill="var(--ok)">fan-out server side</text>' +
          '<rect x="24" y="248" width="592" height="176" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="276" text-anchor="middle" font-size="15" fill="var(--text)">The contract is the artifact, not the docs</text>' +
          '<text x="320" y="304" text-anchor="middle" font-size="13" fill="var(--muted)">OpenAPI or GraphQL schema in git, reviewed like code</text>' +
          '<text x="320" y="328" text-anchor="middle" font-size="13" fill="var(--muted)">types generated in CI, drift fails the build</text>' +
          '<text x="320" y="352" text-anchor="middle" font-size="13" fill="var(--muted)">consumer-driven tests: Pact, schema diff gates</text>' +
          '<text x="320" y="376" text-anchor="middle" font-size="13" fill="var(--warn)">additive changes ship freely, removals need a deprecation window</text>' +
          '<text x="320" y="404" text-anchor="middle" font-size="13" fill="var(--ok)">who owns the BFF decides how fast the frontend can move</text>' +
          '</svg>',
        caption: {
          pl: 'BFF zamienia siedem zapytań z telefonu na jedno, przenosząc łączenie danych na serwer. Kontraktem jest wersjonowany schemat w repozytorium, a nie dokumentacja na Confluence.',
          en: 'A BFF turns seven phone-side requests into one by moving the joining to the server. The contract is a versioned schema in the repository, not a page on Confluence.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że chcesz zrobić obiad i wysyłasz dziecko po zakupy do piątki różnych sklepów. Każda wyprawa to osobne wyjście z domu, a dziecko wraca za każdym razem. Obiad będzie wieczorem.</p>' +
            '<p>Lepiej zatrudnić jedną osobę, która robi wszystkie zakupy naraz i przynosi jedną torbę z dokładnie tym, co potrzebne do tego przepisu. Ta osoba to BFF - pomocnik po stronie kuchni, który zna twój przepis.</p>' +
            '<p>Jest jeszcze druga rzecz: <strong>lista zakupów</strong>. Jeśli jest spisana i obie strony ją podpisały, nikt nie przyniesie mleka zamiast śmietany. A gdy ktoś chce coś z listy usunąć, musi uprzedzić wcześniej - nie w dniu obiadu.</p>',
          en: '<p>Imagine you want to cook dinner and you send a child shopping to five different shops. Each trip is a separate journey and the child comes home in between. Dinner will be ready by nightfall.</p>' +
            '<p>Better to hire one person who does all the shopping in one go and brings back a single bag with exactly what the recipe needs. That person is the BFF - a helper on the kitchen side who knows your recipe.</p>' +
            '<p>There is a second thing: <strong>the shopping list</strong>. If it is written down and both sides signed it, nobody brings milk instead of cream. And if somebody wants to remove an item, they have to say so in advance - not on the day of the dinner.</p>'
        },
        school: {
          pl: '<p>Kontrakt API to nie dokumentacja, tylko <strong>artefakt, który da się zweryfikować maszynowo</strong>. W praktyce oznacza to schemat OpenAPI albo schemat GraphQL trzymany w gicie i recenzowany jak kod.</p>' +
            '<h4>Dlaczego generowanie typów zmienia wszystko</h4>' +
            '<pre><code># w CI\nnpx openapi-typescript ./contracts/billing.yaml -o ./src/api/billing.d.ts\ngit diff --exit-code ./src/api   # różnica = kontrakt się zmienił</code></pre>' +
            '<p>Ręcznie pisany interfejs TypeScript to życzenie, nie kontrakt. Wygenerowany z pliku, który jest źródłem prawdy dla backendu, zamienia zmianę pola w błąd kompilacji zamiast w błędny ekran u klienta.</p>' +
            '<h4>BFF: backend for frontend</h4>' +
            '<p>W dużej firmie ekran "podsumowanie klienta" potrafi zbierać dane z billingu, CRM, katalogu usług i systemu sieciowego. Cztery zapytania po 200 ms z telefonu w LTE to łatwo sekunda z górką, zanim cokolwiek się pokaże. BFF łączy je po stronie serwera, gdzie opóźnienia są jednocyfrowe, i zwraca jeden obiekt dopasowany do ekranu.</p>' +
            '<p>Zysk to nie tylko szybkość. BFF pozwala też ukryć dziwactwa systemów źródłowych - trzy różne formaty daty, pola nazwane <code>CUST_NM</code>, kody statusu w postaci liczb - zamiast rozsmarowywać je po komponentach.</p>' +
            '<h4>Cena</h4>' +
            '<p>BFF to kolejna usługa do wdrażania, monitorowania i dyżurowania. Reguła kciuka: bierz go, gdy masz co najmniej dwa problemy z listy - dużo zapytań na ekran, brzydkie modele źródłowe, potrzeba ukrycia sekretów, agregacja pod mobilkę. Dla jednego zapytania na ekran to czysty narzut.</p>',
          en: '<p>An API contract is not documentation, it is <strong>an artifact you can verify by machine</strong>. In practice that means an OpenAPI document or a GraphQL schema kept in git and reviewed like code.</p>' +
            '<h4>Why generating types changes everything</h4>' +
            '<pre><code># in CI\nnpx openapi-typescript ./contracts/billing.yaml -o ./src/api/billing.d.ts\ngit diff --exit-code ./src/api   # a diff means the contract moved</code></pre>' +
            '<p>A hand-written TypeScript interface is a wish, not a contract. Generated from the file that is the backend source of truth, it turns a renamed field into a compile error instead of a broken screen at a customer.</p>' +
            '<h4>BFF: backend for frontend</h4>' +
            '<p>In a large company a "customer summary" screen can pull from billing, CRM, the service catalogue and a network system. Four 200 ms requests from a phone on LTE easily add up to a second before anything appears. A BFF joins them server side, where latencies are single digit, and returns one object shaped for the screen.</p>' +
            '<p>The gain is not only speed. A BFF also hides the quirks of source systems - three date formats, fields named <code>CUST_NM</code>, numeric status codes - instead of smearing them across components.</p>' +
            '<h4>The price</h4>' +
            '<p>A BFF is one more service to deploy, monitor and be on call for. Rule of thumb: adopt it when at least two of these are true - many requests per screen, ugly upstream models, secrets to hide, mobile-driven aggregation. For one request per screen it is pure overhead.</p>'
        },
        pro: {
          pl: '<p>Kontrakt API jest granicą organizacyjną zapisaną w pliku. Jego jakość decyduje o tym, czy frontend potrzebuje spotkania z backendem, żeby zmienić ekran.</p>' +
            '<h4>Wersjonowanie i okno deprecjacji</h4>' +
            '<p>Zmiany addytywne (nowe opcjonalne pole, nowa wartość enuma po stronie odpowiedzi) są bezpieczne, o ile klienci ignorują nieznane pola - to trzeba zapisać w regule, bo generowane parsery ze <code>strict</code> potrafią się na tym wywrócić. Usunięcia i zmiany semantyki wymagają okna: typowo <strong>dwa kwartały</strong> w organizacji, gdzie aplikacja mobilna ma ogon starych wersji. Praktyczny mechanizm: nagłówek <code>Sunset</code> plus telemetria użycia pola, żeby wiedzieć, kiedy realnie można usunąć, a nie zgadywać.</p>' +
            '<h4>Testy sterowane konsumentem</h4>' +
            '<pre><code>// Pact: konsument publikuje oczekiwania, dostawca je weryfikuje w swoim CI\npact.addInteraction({\n  state: "customer 42 has 2 invoices",\n  uponReceiving: "a request for invoices",\n  withRequest: { method: "GET", path: "/v1/customers/42/invoices" },\n  willRespondWith: { status: 200, body: like({ items: eachLike({ id: "1" }) }) }\n})</code></pre>' +
            '<p>Wartość Pacta nie leży w testach, tylko w tym, że <strong>psuje build dostawcy</strong>, gdy złamie kontrakt. Bez tego każda dyskusja o zgodności kończy się na dobrych chęciach. Alternatywa lżejsza: bramka na diff schematu w CI (oasdiff, graphql-inspector) blokująca zmiany breaking bez etykiety <code>approved-breaking</code>.</p>' +
            '<h4>GraphQL czy OpenAPI</h4>' +
            '<p>GraphQL rozwiązuje over-fetching i pozwala frontendowi dobierać pola bez zmian po stronie serwera - kosztem cachowania (mniej działa darmowy cache HTTP), złożoności autoryzacji na poziomie pola i realnego ryzyka kosztownych zapytań. W telco często najlepszy kompromis to <strong>REST z BFF na ekran</strong>: prosty do cachowania, łatwy do przewidzenia, bez federacji do utrzymania. GraphQL Federation ma sens, gdy masz dedykowany zespół platformowy, który ją utrzyma - a nie jako projekt poboczny jednego zespołu.</p>' +
            '<h4>Kto jest właścicielem BFF</h4>' +
            '<p>To najważniejsze pytanie w całej lekcji. BFF utrzymywany przez zespół backendu staje się kolejną kolejką żądań i frontend czeka tygodniami na dodanie pola. BFF utrzymywany przez zespół frontendowy działa szybko, ale wymaga, żeby ten zespół umiał go wdrażać, monitorować i pełnić dyżur - to realne zobowiązanie, nie deklaracja. Prawo Conwaya nie negocjuje: <strong>kształt twojego API będzie kształtem twojej organizacji</strong>. Jeśli chcesz frontend, który dowozi w dniach, granica BFF musi leżeć wewnątrz zespołu frontendowego, z jasnym kontraktem operacyjnym: SLO, alerty, runbook.</p>' +
            '<p>Zapisz to w ADR razem z liczbami: obecne p95 łączenia danych na kliencie, docelowe po BFF, koszt utrzymania w osobodniach na kwartał. Bez liczb ta dyskusja zawsze przegrywa z "nie mamy ludzi".</p>',
          en: '<p>An API contract is an organisational boundary written into a file. Its quality decides whether the frontend needs a meeting with the backend in order to change a screen.</p>' +
            '<h4>Versioning and the deprecation window</h4>' +
            '<p>Additive changes (a new optional field, a new response enum value) are safe provided clients ignore unknown fields - which must be written down as a rule, because generated parsers in <code>strict</code> mode happily blow up on it. Removals and semantic changes need a window: typically <strong>two quarters</strong> in an organisation with a long tail of old mobile versions. The practical mechanism is a <code>Sunset</code> header plus per-field usage telemetry, so removal is measured rather than guessed.</p>' +
            '<h4>Consumer-driven contract tests</h4>' +
            '<pre><code>// Pact: the consumer publishes expectations, the provider verifies them in its own CI\npact.addInteraction({\n  state: "customer 42 has 2 invoices",\n  uponReceiving: "a request for invoices",\n  withRequest: { method: "GET", path: "/v1/customers/42/invoices" },\n  willRespondWith: { status: 200, body: like({ items: eachLike({ id: "1" }) }) }\n})</code></pre>' +
            '<p>The value of Pact is not in the tests, it is that it <strong>breaks the provider build</strong> when the contract breaks. Without that, every compatibility discussion ends in good intentions. A lighter alternative: a schema-diff gate in CI (oasdiff, graphql-inspector) blocking breaking changes unless labelled <code>approved-breaking</code>.</p>' +
            '<h4>GraphQL or OpenAPI</h4>' +
            '<p>GraphQL fixes over-fetching and lets the frontend pick fields without server changes - at the cost of caching (free HTTP caching mostly stops working), field-level authorisation complexity, and a real risk of expensive queries. In telco the sweet spot is often <strong>REST plus a per-screen BFF</strong>: easy to cache, easy to predict, no federation to maintain. GraphQL Federation makes sense when a dedicated platform team owns it - not as one team side project.</p>' +
            '<h4>Who owns the BFF</h4>' +
            '<p>That is the most important question in this lesson. A BFF owned by the backend team becomes another intake queue and the frontend waits weeks to add a field. A BFF owned by the frontend team moves fast but requires that team to deploy it, monitor it and carry the pager - a real commitment, not a declaration. Conway law does not negotiate: <strong>the shape of your API will be the shape of your organisation</strong>. If you want a frontend that ships in days, the BFF boundary has to sit inside the frontend team, with an explicit operational contract: SLOs, alerts, a runbook.</p>' +
            '<p>Write it into an ADR with numbers attached: current p95 for client-side joining, target after the BFF, maintenance cost in person-days per quarter. Without numbers this discussion always loses to "we do not have the people".</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co oznacza skrót BFF?',
            en: 'What does BFF stand for?'
          },
          options: [
            { pl: 'Backend For Frontend - warstwa serwerowa dopasowana do potrzeb konkretnego klienta', en: 'Backend For Frontend - a server layer shaped for the needs of one specific client' },
            { pl: 'Batch Fetch Framework - biblioteka do łączenia zapytań w przeglądarce', en: 'Batch Fetch Framework - a library for merging requests in the browser' },
            { pl: 'Binary Format Filter - warstwa kompresji odpowiedzi', en: 'Binary Format Filter - a response compression layer' },
            { pl: 'Backend Failure Fallback - mechanizm awaryjny przy awarii API', en: 'Backend Failure Fallback - an emergency mechanism when the API is down' }
          ],
          correct: 0,
          explain: {
            pl: 'BFF to cienka warstwa serwerowa, która agreguje i przekształca dane pod jeden typ klienta. Kluczowe słowo to for - istnieje po to, żeby służyć konkretnemu frontendowi, a nie być uniwersalnym API.',
            en: 'A BFF is a thin server layer that aggregates and reshapes data for one client type. The key word is for - it exists to serve a specific frontend, not to be a universal API.'
          }
        },
        {
          q: {
            pl: 'Dlaczego typy TypeScript generowane z OpenAPI są lepsze niż pisane ręcznie?',
            en: 'Why are TypeScript types generated from OpenAPI better than hand-written ones?'
          },
          options: [
            { pl: 'Bo zajmują mniej miejsca w bundlu', en: 'Because they take less space in the bundle' },
            { pl: 'Bo pochodzą z tego samego źródła prawdy co backend, więc rozjazd kontraktu ujawnia się jako błąd kompilacji w CI', en: 'Because they come from the same source of truth as the backend, so contract drift surfaces as a compile error in CI' },
            { pl: 'Bo generatory tworzą dokładniejsze typy generyczne', en: 'Because generators produce more precise generic types' },
            { pl: 'Bo pozwalają pominąć walidację odpowiedzi w czasie działania', en: 'Because they let you skip runtime response validation' }
          ],
          correct: 1,
          explain: {
            pl: 'Ręcznie pisany typ opisuje to, w co wierzysz, a nie to, co zwraca serwer. Generowanie przenosi wykrycie zmiany z produkcji do pipeline CI. Uwaga: to nadal nie zastępuje walidacji w runtime na granicy systemu.',
            en: 'A hand-written type describes what you believe, not what the server returns. Generation moves detection from production into the CI pipeline. Note it still does not replace runtime validation at the boundary.'
          }
        },
        {
          q: {
            pl: 'Która zmiana w API jest zwykle bezpieczna dla istniejących klientów?',
            en: 'Which API change is normally safe for existing clients?'
          },
          options: [
            { pl: 'Zmiana typu pola z liczby na tekst', en: 'Changing a field type from number to string' },
            { pl: 'Dodanie nowego, opcjonalnego pola w odpowiedzi', en: 'Adding a new optional field to the response' },
            { pl: 'Usunięcie nieużywanej wartości enuma z żądania', en: 'Removing an unused enum value from the request' },
            { pl: 'Zmiana domyślnej strony paginacji z 1 na 0', en: 'Changing the default pagination page from 1 to 0' }
          ],
          correct: 1,
          explain: {
            pl: 'Zmiany addytywne są bezpieczne, pod warunkiem że klienci ignorują nieznane pola. Zmiana typu, semantyki albo wartości domyślnej łamie kontrakt cicho - kod się kompiluje, a zachowanie się zmienia.',
            en: 'Additive changes are safe provided clients ignore unknown fields. Changing a type, a semantic or a default breaks the contract silently - the code still compiles while behaviour shifts.'
          }
        },
        {
          q: {
            pl: 'Zespół frontendowy chce BFF, żeby przyspieszyć dostarczanie. Backend proponuje, że będzie go utrzymywać u siebie. Jakie jest tu główne ryzyko z punktu widzenia architektury?',
            en: 'A frontend team wants a BFF to speed up delivery. The backend team offers to own it. What is the main architectural risk?'
          },
          options: [
            { pl: 'BFF będzie wolniejszy, bo wdrożony w innym klastrze', en: 'The BFF will be slower because it is deployed in a different cluster' },
            { pl: 'Nie da się generować typów z BFF utrzymywanego przez inny zespół', en: 'You cannot generate types from a BFF owned by another team' },
            { pl: 'Granica BFF przestanie odpowiadać granicy zespołu, więc każda zmiana ekranu znów będzie wymagała kolejki u backendu i cel przyspieszenia zniknie', en: 'The BFF boundary stops matching the team boundary, so every screen change queues at the backend again and the speed goal disappears' },
            { pl: 'GraphQL przestanie działać z takim układem własności', en: 'GraphQL stops working with that ownership layout' }
          ],
          correct: 2,
          explain: {
            pl: 'Sensem BFF jest to, że zespół frontendowy sam kształtuje odpowiedź pod swój ekran. Gdy właścicielem jest inny zespół, dokładasz warstwę i zachowujesz ten sam czas oczekiwania - klasyczny przypadek prawa Conwaya. Własność jest tu ważniejsza niż technologia.',
            en: 'The point of a BFF is that the frontend team shapes the response for its own screen. With another team owning it you add a layer and keep the same wait time - a textbook Conway law outcome. Ownership matters more than the technology here.'
          }
        }
      ]
    }
  ]
};
