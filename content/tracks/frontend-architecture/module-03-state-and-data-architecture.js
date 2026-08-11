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
    pl: 'Gdzie naprawde mieszka stan aplikacji, jak zbudowac warstwe pobierania danych, jak robic realtime i optimistic UI, tryb offline oraz kontrakty API i BFF.',
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
          pl: 'Cztery rodzaje stanu maja czterech roznych wlascicieli i cztery rozne cykle zycia. Wiekszosc bolu z globalnym store bierze sie z wrzucenia stanu serwera do pudelka stanu klienta.',
          en: 'Four kinds of state have four different owners and four different lifecycles. Most global-store pain comes from parking server state in the client-state box.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie duza kuchnie w restauracji. Sa w niej cztery miejsca, gdzie leza rzeczy, i kazde ma innego wlasciciela.</p>' +
            '<p>Jest <strong>magazyn</strong> - tam sa prawdziwe zapasy. Kucharz moze miec kartke z tym, co widzial rano w magazynie, ale to tylko kartka. Ktos mogl w miedzyczasie cos zabrac.</p>' +
            '<p>Jest <strong>blat kucharza</strong> - noz, deska, wlaczone swiatlo. To znika, gdy kucharz konczy zmiane, i nikogo poza nim nie obchodzi.</p>' +
            '<p>Jest <strong>tabliczka na drzwiach</strong> z napisem, ktory stolik obslugujemy. Kazdy moze ja przeczytac i kazdy moze zrobic jej zdjecie i wyslac koledze.</p>' +
            '<p>I jest <strong>kartka z zamowieniem w trakcie pisania</strong> - pokreslona, niedokonczona, tylko w reku kelnera.</p>' +
            '<p>Cala sztuka polega na tym, zeby nie mylic tych miejsc. Jesli kucharz zacznie traktowac swoja kartke jak magazyn, predzej czy pozniej ugotuje cos, czego nie ma.</p>',
          en: '<p>Picture a big restaurant kitchen. There are four places where things sit, and each has a different owner.</p>' +
            '<p>There is the <strong>storeroom</strong> - the real supplies. A cook can hold a note about what he saw in there this morning, but it is only a note. Someone may have taken things since.</p>' +
            '<p>There is the <strong>cook station</strong> - a knife, a board, a lamp switched on. It disappears when the shift ends and nobody else cares about it.</p>' +
            '<p>There is the <strong>sign on the door</strong> saying which table we are serving. Anyone can read it, and anyone can photograph it and send it to a friend.</p>' +
            '<p>And there is the <strong>half-written order slip</strong> - crossed out, unfinished, alive only in the waiter hand.</p>' +
            '<p>The whole trick is not mixing those places up. If the cook starts treating his note as the storeroom, sooner or later he cooks something that does not exist.</p>'
        },
        school: {
          pl: '<p>Zanim wybierzesz biblioteke do zarzadzania stanem, zadaj jedno pytanie: <strong>kto jest wlascicielem tej danej i jak dlugo ona zyje</strong>. Odpowiedz miesci sie zwykle w czterech kategoriach.</p>' +
            '<h4>1. Stan serwera (server state)</h4>' +
            '<p>Faktury, taryfy, zgloszenia serwisowe. Wlascicielem jest backend, a to, co masz w przegladarce, to <em>kopia z opoznieniem</em> - dokladnie jak cache w CDN. Kluczowe pytania to nie "gdzie to trzymam", tylko: jak dlugo jest swieze, kiedy uniewazniam, co pokazuje uzytkownikowi w miedzyczasie.</p>' +
            '<h4>2. Stan klienta (client state)</h4>' +
            '<p>Otwarty modal, wybrana zakladka w panelu, tryb ciemny. Nie ma odpowiednika na serwerze, ginie po odswiezeniu i nikt inny go nie widzi.</p>' +
            '<h4>3. Stan w URL</h4>' +
            '<p>Filtry, strona, sortowanie, wybrany identyfikator. To jedyny stan, ktory da sie wkleic na Slacku i ktory przezyje przycisk wstecz.</p>' +
            '<h4>4. Stan formularza</h4>' +
            '<p>Wartosci pol w trakcie edycji plus metadane: dirty, touched, bledy walidacji. Zmienia sie przy kazdym nacisnieciu klawisza, wiec trzymanie go w globalnym store to prosta droga do przemielenia calej aplikacji na literke.</p>' +
            '<pre><code>// zly domyslny odruch\nstore.state.invoices = await api.getInvoices()\n\n// wlasciwy: to jest cache, nie stan\nconst { data, isStale } = useQuery({\n  queryKey: ["invoices", customerId],\n  queryFn: () =&gt; api.getInvoices(customerId),\n  staleTime: 60_000\n})</code></pre>' +
            '<p>Jesli w code review zobaczysz obiekt z serwera recznie wlozony do Pinii albo Zustanda razem z polami <code>loading</code> i <code>error</code>, to prawie zawsze znak, ze ktos wlasnie zaczal pisac wlasny, gorszy cache HTTP.</p>',
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
          pl: '<p>Taksonomia stanu to najtansza decyzja architektoniczna, jaka mozesz podjac, i jedna z najdrozszych do cofniecia. W duzej organizacji telco widac to na liczbach: aplikacja obslugi klienta z 300 komponentami i jednym globalnym store zwykle ma 60-80 procent tego store wypelnione danymi z API, ktore samo w sobie ma juz naglowki <code>ETag</code> i <code>Cache-Control</code>. Piszemy wlasny cache i ignorujemy ten, ktory dostajemy za darmo.</p>' +
            '<h4>Regula decyzyjna</h4>' +
            '<table>' +
            '<tr><th>Pytanie</th><th>Odpowiedz</th><th>Miejsce</th></tr>' +
            '<tr><td>Czy inny uzytkownik moze to zmienic?</td><td>tak</td><td>warstwa cache serwera (TanStack Query, RTK Query, Apollo)</td></tr>' +
            '<tr><td>Czy chce to wkleic komus w wiadomosci?</td><td>tak</td><td>URL (search params)</td></tr>' +
            '<tr><td>Czy zmienia sie czesciej niz 10 razy na sekunde?</td><td>tak</td><td>lokalnie w komponencie lub w bibliotece formularzy</td></tr>' +
            '<tr><td>Reszta</td><td>-</td><td>maly store klienta (Zustand, Pinia), bez danych z API</td></tr>' +
            '</table>' +
            '<h4>Konsekwencje dla design systemu</h4>' +
            '<p>Komponenty biblioteki (CHI, MUI, Carbon) nie powinny znac zadnej z tych warstw. Moment, w ktorym <code>DataTable</code> zaczyna sam wolac <code>useQuery</code>, jest momentem, w ktorym design system przestaje byc uzywalny w innej aplikacji niz ta, w ktorej powstal. Kontrakt brzmi: komponent przyjmuje dane i callbacki, a decyzja o zrodle nalezy do aplikacji. Wyjatkiem sa komponenty jawnie "connected", ktore stoja w osobnym pakiecie i maja wlasny numer wersji.</p>' +
            '<pre><code>// presentational, w design systemie\n&lt;ChiDataTable rows={rows} sort={sort} onSortChange={setSort} /&gt;\n\n// connected, w aplikacji - stan w URL, dane z cache\nconst [params, setParams] = useSearchParams()\nconst sort = params.get("sort") ?? "createdAt:desc"\nconst { data } = useInvoices({ sort, page: Number(params.get("page") ?? 1) })</code></pre>' +
            '<h4>Pulapki produkcyjne</h4>' +
            '<ul>' +
            '<li><strong>Stan pochodny w store.</strong> Jesli da sie to policzyc w renderze z dwoch innych wartosci, to nie jest stan - to selektor.</li>' +
            '<li><strong>Duplikat URL i store.</strong> Filtry trzymane w obu miejscach rozjezdzaja sie po przycisku wstecz. Wybierz URL jako jedyne zrodlo prawdy i czytaj z niego.</li>' +
            '<li><strong>Stan sesji w Redux.</strong> Token i tozsamosc uzytkownika naleza do warstwy auth, nie do drzewa stanu UI - inaczej wyciekaja do devtools i do sentry breadcrumbs.</li>' +
            '<li><strong>Wielozakladkowosc.</strong> W aplikacji CRM agent ma otwartych 6 zakladek. Bez <code>BroadcastChannel</code> lub wspoldzielonego cache po IndexedDB zobaczy szesc roznych wersji tej samej faktury.</li>' +
            '</ul>' +
            '<p>Na poziomie principal twoim produktem nie jest wybor biblioteki, tylko <strong>spisana zasada podzialu</strong> w ADR, do ktorej moze sie odwolac szesc zespolow bez ciebie na spotkaniu.</p>',
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
            pl: 'Ktory z ponizszych jest klasycznym przykladem stanu serwera?',
            en: 'Which of the following is a classic example of server state?'
          },
          options: [
            { pl: 'Czy panel boczny jest rozwiniety', en: 'Whether the side panel is expanded' },
            { pl: 'Lista faktur klienta pobrana z API', en: 'The customer invoice list fetched from the API' },
            { pl: 'Aktualnie wpisywany tekst w polu wyszukiwania', en: 'The text currently being typed into a search box' },
            { pl: 'Wybrany motyw jasny lub ciemny', en: 'The selected light or dark theme' }
          ],
          correct: 1,
          explain: {
            pl: 'Stan serwera to dane, ktorych wlascicielem jest backend i ktore inny uzytkownik moze zmienic bez twojej wiedzy. Pozostale trzy odpowiedzi zyja i umieraja w tej jednej karcie przegladarki.',
            en: 'Server state is data the backend owns and another user can change without you knowing. The other three live and die inside this one browser tab.'
          }
        },
        {
          q: {
            pl: 'Dlaczego filtry tabeli warto trzymac w URL, a nie w globalnym store?',
            en: 'Why keep table filters in the URL rather than in a global store?'
          },
          options: [
            { pl: 'Bo URL jest szybszy niz pamiec RAM', en: 'Because the URL is faster than RAM' },
            { pl: 'Bo tylko URL da sie zaszyfrowac', en: 'Because only the URL can be encrypted' },
            { pl: 'Bo stan w URL jest udostepnialny, przezywa przeladowanie i dziala z przyciskiem wstecz', en: 'Because URL state is shareable, survives reload and works with the back button' },
            { pl: 'Bo store nie obsluguje wartosci tekstowych', en: 'Because stores cannot hold string values' }
          ],
          correct: 2,
          explain: {
            pl: 'URL jest jedynym miejscem, ktore uzytkownik moze skopiowac i wyslac koledze, a przegladarka traktuje go jak historie nawigacji. To daje trzy funkcje za darmo, ktore w store musialbys napisac recznie.',
            en: 'The URL is the only place a user can copy and send to a colleague, and the browser treats it as navigation history. That is three features for free that a store would force you to hand-write.'
          }
        },
        {
          q: {
            pl: 'Komponent DataTable w twoim design systemie zaczyna sam wolac useQuery. Co jest tu glownym ryzykiem architektonicznym?',
            en: 'A DataTable component in your design system starts calling useQuery itself. What is the main architectural risk?'
          },
          options: [
            { pl: 'Komponent stanie sie nieuzywalny w aplikacjach z innym stosem danych i zwiaze design system z jedna aplikacja', en: 'The component becomes unusable in apps with a different data stack and couples the design system to one application' },
            { pl: 'Zapytania beda wolniejsze o okolo 30 ms', en: 'Requests get about 30 ms slower' },
            { pl: 'Zlamie to reguly CSS specificity', en: 'It breaks CSS specificity rules' },
            { pl: 'TypeScript przestanie wnioskowac typy propsow', en: 'TypeScript stops inferring prop types' }
          ],
          correct: 0,
          explain: {
            pl: 'Biblioteka komponentow ma byc niezalezna od zrodla danych. Wciagniecie warstwy pobierania do srodka wymusza ta sama biblioteke i ten sam ksztalt API u kazdego konsumenta, a przy 20 zespolach to blokada wersji na lata.',
            en: 'A component library must stay independent of the data source. Pulling the fetching layer inside forces the same library and the same API shape on every consumer, which with 20 teams becomes a multi-year version lock.'
          }
        },
        {
          q: {
            pl: 'Agent CRM ma otwartych szesc zakladek z ta sama faktura i widzi w nich rozne kwoty. Ktore podejscie realnie rozwiazuje problem?',
            en: 'A CRM agent has six tabs open on the same invoice and sees different amounts in them. Which approach actually solves it?'
          },
          options: [
            { pl: 'Zwiekszenie staleTime, zeby dane rzadziej sie zmienialy', en: 'Increase staleTime so the data changes less often' },
            { pl: 'Przeniesienie faktury do globalnego store aplikacji', en: 'Move the invoice into the global application store' },
            { pl: 'Wylaczenie cache i pobieranie danych przy kazdym renderze', en: 'Disable caching and refetch on every render' },
            { pl: 'Propagacja uniewaznien miedzy zakladkami, np. przez BroadcastChannel, plus refetch przy powrocie fokusu', en: 'Propagate invalidations across tabs, e.g. via BroadcastChannel, plus refetch on window focus' }
          ],
          correct: 3,
          explain: {
            pl: 'Globalny store zyje w obrebie jednej karty, wiec nic nie zmienia. Problem jest z natury rozproszony: potrzebujesz kanalu miedzy kartami i odswiezenia przy powrocie fokusu, a nie dluzszego lub krotszego czasu zycia cache.',
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
          pl: 'Warstwowa architektura danych: komponenty widza tylko hooki domenowe, hooki widza cache, cache widzi transport. Podmiana REST na GraphQL dotyka jednej warstwy, nie 300 komponentow.',
          en: 'Layered data architecture: components see only domain hooks, hooks see the cache, the cache sees the transport. Swapping REST for GraphQL touches one layer, not 300 components.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Cykl zycia jednego wpisu w cache: od pustego stanu, przez stale-while-revalidate, po uniewaznienie po mutacji.',
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
              pl: 'Pierwszy komponent pyta o klucz, ktorego nie ma w cache. Leci jedno zapytanie, uzytkownik widzi skeleton.',
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
              pl: 'Drugi komponent prosi o ten sam klucz w trakcie lotu zapytania. Cache nie wysyla drugiego requestu, tylko dopisuje subskrybenta.',
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
            label: { pl: 'Swieze dane', en: 'Fresh data' },
            note: {
              pl: 'Odpowiedz trafia do cache i obaj subskrybenci renderuja sie z tej samej referencji. Przez staleTime kolejne montowania nic nie kosztuja.',
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
            label: { pl: 'Odswiezanie w tle', en: 'Background revalidate' },
            note: {
              pl: 'Po powrocie fokusu wpis jest przeterminowany. Uzytkownik dalej widzi stare dane, a nowe doleca bez migotania interfejsu.',
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
            label: { pl: 'Uniewaznienie po mutacji', en: 'Invalidate after mutation' },
            note: {
              pl: 'Mutacja uniewaznia klucz, a nie konkretny komponent. Dzieki temu kazdy ekran czytajacy te fakture aktualizuje sie sam, bez event busa i bez recznej synchronizacji.',
              en: 'The mutation invalidates a key, not a component. Every screen reading that invoice updates itself, with no event bus and no manual syncing.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie biuro, w ktorym kazdy pracownik, gdy potrzebuje dokumentu, sam biegnie do archiwum na drugim koncu miasta. Dwadziescia osob, dwadziescia wypraw po ten sam papier. Chaos, korki i rozne wersje tego samego dokumentu na biurkach.</p>' +
            '<p>Teraz zatrudniasz jednego kuriera z podreczna szafka. Kazdy prosi kuriera. Kurier patrzy do szafki: jesli ma swiezy dokument, oddaje go od reki. Jesli trzy osoby prosza o to samo w tej samej chwili, jedzie <em>raz</em>. Jesli dokument lezy juz dlugo, oddaje ci stara kopie i po cichu jedzie po nowa.</p>' +
            '<p>Ten kurier to warstwa pobierania danych. Nikt w biurze nie musi znac adresu archiwum ani pamietac, kiedy ostatnio tam byl. Wystarczy poprosic o dokument po nazwie.</p>',
          en: '<p>Picture an office where every worker who needs a document runs to an archive across town on their own. Twenty people, twenty trips for the same sheet of paper. Traffic jams, chaos, and different versions of the same document on different desks.</p>' +
            '<p>Now you hire one courier with a small cabinet. Everyone asks the courier. The courier checks the cabinet: if the document is fresh, you get it instantly. If three people ask for the same thing at the same moment, he goes <em>once</em>. If the document has been sitting there a while, he hands you the old copy and quietly drives off for a new one.</p>' +
            '<p>That courier is the data-fetching layer. Nobody in the office needs the archive address or has to remember when they were last there. You just ask for a document by name.</p>'
        },
        school: {
          pl: '<p>Warstwa pobierania danych to nie jedna biblioteka, tylko <strong>cztery poziomy z jasnym kierunkiem zaleznosci</strong>. Komponenty widza tylko poziom najwyzszy.</p>' +
            '<h4>Poziom 1: transport</h4>' +
            '<p>Jeden klient HTTP, najlepiej wygenerowany z OpenAPI. Tu zyja naglowki autoryzacji, identyfikatory korelacji, timeouty, mapowanie bledow na typy domenowe. Zero logiki biznesowej.</p>' +
            '<h4>Poziom 2: cache</h4>' +
            '<p>TanStack Query, RTK Query albo Apollo. Robi rzeczy, ktorych sam nie chcesz pisac: deduplikacje rownoleglych zapytan, ponawianie z backoffem, odswiezanie po powrocie fokusu, garbage collection nieuzywanych wpisow.</p>' +
            '<h4>Poziom 3: hooki domenowe</h4>' +
            '<pre><code>export function useInvoices(customerId, opts) {\n  return useQuery({\n    queryKey: invoiceKeys.list(customerId),\n    queryFn: () =&gt; api.invoices.list({ customerId }),\n    staleTime: 60_000,\n    ...opts\n  })\n}</code></pre>' +
            '<p>To jest miejsce, w ktorym mieszkaja klucze cache, czasy swiezosci i reguly uniewazniania. Jeden plik na domene, wlasciciel: zespol domenowy.</p>' +
            '<h4>Poziom 4: komponenty</h4>' +
            '<p>Wolaja <code>useInvoices()</code> i nic wiecej. Nie znaja sciezek URL, nie wiedza, czy pod spodem jest REST czy GraphQL.</p>' +
            '<p>Dlaczego to sie oplaca? Bo migracja z REST na GraphQL, dodanie BFF albo zmiana biblioteki cache dotyka poziomow 1-3, a nie trzystu komponentow rozsianych po monorepo. To jest ten sam argument, ktory znasz z design systemu: <strong>waska talia zamiast szerokiego API</strong>.</p>' +
            '<p>Jest jeszcze efekt uboczny, ktory widac dopiero po kilku miesiacach: testy. Komponent, ktory wola tylko <code>useInvoices()</code>, testujesz podmieniajac jeden hook. Komponent, ktory sam siega po <code>fetch</code>, wymaga mockowania sieci, obslugi timeoutow i modli sie o stabilnosc. Warstwy nie sa tu estetyka, tylko warunkiem tego, zeby testy jednostkowe byly szybkie i deterministyczne.</p>' +
            '<p>Praktyczna zasada podzialu wlasnosci: transport nalezy do zespolu platformowego, hooki domenowe do zespolu, ktory jest wlascicielem danej domeny biznesowej, a komponenty do zespolow produktowych. Kazda z tych warstw ma wtedy jednego wlasciciela i jasny powod do zmiany.</p>',
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
          pl: '<p>Warstwa pobierania danych jest tym, czym w design systemie sa tokeny: niewidoczna, dopoki jej nie ma, i wtedy kosztuje kwartal.</p>' +
            '<h4>Klucze cache to publiczne API</h4>' +
            '<p>Jesli klucze budujesz ad hoc w komponentach, nikt nigdy nie uniewazni ich poprawnie. Zrob z nich modul z typami:</p>' +
            '<pre><code>export const invoiceKeys = {\n  all: ["invoices"] as const,\n  list: (customerId: string, f?: Filters) =&gt;\n    [...invoiceKeys.all, "list", customerId, f ?? {}] as const,\n  detail: (id: string) =&gt; [...invoiceKeys.all, "detail", id] as const\n}\n\n// uniewaznienie hierarchiczne: jedna linia czysci cala domene\nqueryClient.invalidateQueries({ queryKey: invoiceKeys.all })</code></pre>' +
            '<h4>Liczby, ktore warto znac</h4>' +
            '<ul>' +
            '<li><code>staleTime</code> jest domyslnie 0. To najczestsza przyczyna nadmiaru ruchu: bez zmiany dostajesz refetch przy kazdym mount i kazdym focusie. Dla danych referencyjnych, jak slownik taryf, sensowne jest 5-15 minut, dla salda konta 0-30 sekund.</li>' +
            '<li><code>gcTime</code> (dawniej <code>cacheTime</code>) domyslnie 5 minut - to jak dlugo nieuzywany wpis lezy w pamieci, zanim zniknie.</li>' +
            '<li>Deduplikacja realnie sciela ruch. W panelu agenta, gdzie cztery widgety pytaja o ten sam profil klienta, jeden klucz zamiast czterech to 75 procent mniej zapytan na kazde otwarcie karty.</li>' +
            '<li>Generowany klient z OpenAPI (openapi-typescript, orval, Kubb) usuwa cala klase bledow typu "backend zmienil pole i nikt nie zauwazyl" - blad pojawia sie w CI, nie u klienta.</li>' +
            '</ul>' +
            '<h4>Bledy jako dane</h4>' +
            '<p>Transport powinien mapowac odpowiedzi HTTP na typy domenowe: 401 to nie "blad sieci", tylko sygnal odswiezenia sesji; 409 to konflikt wersji do pokazania w UI; 429 to backoff. Komponent, ktory dostaje surowy <code>AxiosError</code>, zawsze skonczy z <code>catch</code> i alertem.</p>' +
            '<h4>Dynamika organizacyjna</h4>' +
            '<p>W telco z dwudziestoma zespolami frontendowymi najwiekszym problemem nie jest wybor biblioteki, tylko to, ze kazdy zespol ma wlasny <code>fetchWrapper</code> z wlasnym retry. Efekt: burza retry przy incydencie backendu i N razy wiekszy ruch dokladnie wtedy, gdy system pada. Wspolny pakiet transportu z jitterem i jednym budzetem retry jest tu decyzja niezawodnosciowa, nie estetyczna. Zapisz to w ADR i podepnij do platform teamu, nie do design systemu - to inny cykl wydawniczy i inny profil ryzyka.</p>',
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
            pl: 'Co robi deduplikacja zapytan w kliencie cache?',
            en: 'What does request deduplication in a cache client do?'
          },
          options: [
            { pl: 'Usuwa duplikaty rekordow z odpowiedzi serwera', en: 'Removes duplicate records from the server response' },
            { pl: 'Laczy wiele rownoleglych subskrypcji tego samego klucza w jedno zapytanie sieciowe', en: 'Collapses several concurrent subscriptions to the same key into one network request' },
            { pl: 'Kompresuje cialo odpowiedzi przed zapisem do cache', en: 'Compresses the response body before writing it to cache' },
            { pl: 'Zapobiega dwukrotnemu zamontowaniu komponentu', en: 'Prevents a component from mounting twice' }
          ],
          correct: 1,
          explain: {
            pl: 'Jesli cztery widgety w tej samej chwili prosza o ten sam klucz, leci jeden request, a wszyscy dostaja te sama odpowiedz. To jest glowny powod, dla ktorego panel agenta nie zabija backendu przy otwarciu karty klienta.',
            en: 'If four widgets ask for the same key at the same moment, one request goes out and all of them get the same response. That is the main reason an agent console does not hammer the backend when a case is opened.'
          }
        },
        {
          q: {
            pl: 'Domyslny staleTime w TanStack Query wynosi 0. Jaki jest tego praktyczny skutek?',
            en: 'The default staleTime in TanStack Query is 0. What is the practical consequence?'
          },
          options: [
            { pl: 'Dane nigdy nie trafiaja do cache', en: 'Data never enters the cache' },
            { pl: 'Zapytania nigdy nie sa ponawiane po bledzie', en: 'Requests are never retried after an error' },
            { pl: 'Dane sa uznawane za przeterminowane natychmiast, wiec przy kazdym mount i powrocie fokusu leci refetch w tle', en: 'Data is considered stale immediately, so every mount and every window focus triggers a background refetch' },
            { pl: 'Cache jest czyszczony przy kazdej nawigacji', en: 'The cache is cleared on every navigation' }
          ],
          correct: 2,
          explain: {
            pl: 'Dane nadal sa cachowane i pokazywane od reki, ale sa od razu uznane za nieswieze. Dla slownikow i danych referencyjnych warto podniesc staleTime do kilku minut, inaczej generujesz ruch bez zadnej wartosci dla uzytkownika.',
            en: 'The data is still cached and shown instantly, it is just marked stale right away. For catalogues and reference data raise staleTime to minutes, otherwise you generate traffic with no user-visible benefit.'
          }
        },
        {
          q: {
            pl: 'Dlaczego klucze cache warto trzymac w jednym typowanym module zamiast skladac je w komponentach?',
            en: 'Why keep cache keys in one typed module instead of assembling them inside components?'
          },
          options: [
            { pl: 'Bo uniewaznianie po mutacji wymaga dokladnie tych samych kluczy, a hierarchia kluczy pozwala wyczyscic cala domene jedna linia', en: 'Because invalidation after a mutation needs exactly the same keys, and a key hierarchy lets you clear a whole domain in one line' },
            { pl: 'Bo biblioteka odmawia dzialania z kluczami tekstowymi', en: 'Because the library refuses to work with string keys' },
            { pl: 'Bo klucze musza byc unikalne globalnie w calym monorepo', en: 'Because keys must be globally unique across the monorepo' },
            { pl: 'Bo skraca to czas budowania bundla', en: 'Because it shortens bundle build time' }
          ],
          correct: 0,
          explain: {
            pl: 'Uniewaznianie dziala przez dopasowanie prefiksu klucza. Klucze pisane recznie w komponentach rozjezdzaja sie literowka albo kolejnoscia pol i mutacja po cichu nie odswieza polowy ekranow.',
            en: 'Invalidation works by key prefix matching. Hand-written keys drift apart through a typo or a different field order, and a mutation silently fails to refresh half the screens.'
          }
        },
        {
          q: {
            pl: 'Dwadziescia zespolow ma wlasne wrappery fetch, kazdy z retry 3x bez jittera. Backend zaczyna zwracac 503. Co sie stanie i co jest wlasciwa odpowiedzia architektoniczna?',
            en: 'Twenty teams each ship their own fetch wrapper with 3x retry and no jitter. The backend starts returning 503. What happens, and what is the right architectural answer?'
          },
          options: [
            { pl: 'Nic szczegolnego, retry zawsze pomaga; wystarczy zwiekszyc liczbe prob', en: 'Nothing much, retries always help; just raise the attempt count' },
            { pl: 'Ruch spadnie samoistnie, wiec wystarczy poczekac', en: 'Traffic will drop by itself, so just wait it out' },
            { pl: 'Ruch wzrosnie kilkukrotnie w momencie awarii; potrzebny jest wspolny pakiet transportu z jitterem, budzetem retry i circuit breakerem', en: 'Traffic multiplies exactly during the outage; you need a shared transport package with jitter, a retry budget and a circuit breaker' },
            { pl: 'Przegladarka sama ograniczy retry do jednego na domene', en: 'The browser will limit retries to one per domain by itself' }
          ],
          correct: 2,
          explain: {
            pl: 'To klasyczna burza retry: w chwili awarii kazdy klient mnozy ruch, dokladnie wtedy, gdy backend go najmniej udzwignie. Bez jittera proby dodatkowo synchronizuja sie w fale. Lekarstwem jest jeden wspolny transport z limitem prob, a nie polityka na zespol.',
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
          pl: 'Zapis optymistyczny i push z serwera spotykaja sie w jednym miejscu - w cache. Przed kazda zgadywanka robisz snapshot, bo bez niego nie ma czego cofnac.',
          en: 'Optimistic writes and server pushes meet in one place - the cache. Take a snapshot before every guess, because without one there is nothing to roll back to.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Pelny cykl optimistic update z nieudanym zapisem: snapshot, zgadywanka, blad, cofniecie, prawda z serwera.',
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
            label: { pl: 'Stan wyjsciowy', en: 'Starting state' },
            note: {
              pl: 'Zgloszenie ma status Open zarowno w UI, jak i w cache. Uzytkownik za chwile kliknie Resolve.',
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
              pl: 'Cache dostaje przewidywana wartosc natychmiast, ale najpierw odklada kopie starej. Bez tej kopii cofniecie jest niemozliwe.',
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
              pl: 'Inny agent zamknal to zgloszenie sekunde wczesniej, wiec API zwraca 409. UI wciaz pokazuje zgadywanke.',
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
            label: { pl: 'Cofniecie', en: 'Rollback' },
            note: {
              pl: 'Handler onError przywraca snapshot i pokazuje komunikat z konkretem, a nie samym slowem blad. Uzytkownik widzi, ze jego zmiana nie przeszla.',
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
              pl: 'Na koncu, niezaleznie od wyniku, uniewazniasz klucz i pobierasz stan z serwera. Dzieki temu UI konczy na prawdzie, a nie na cofnietej zgadywance.',
              en: 'Finally, regardless of the outcome, you invalidate the key and pull the server state. The UI ends on truth rather than on a rolled-back guess.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Zamawiasz kawe i barista od razu pisze twoje imie na kubku, zanim jeszcze cokolwiek zaparzy. Czujesz, ze zamowienie <em>juz sie dzieje</em>, chociaz kawy nie ma. To wlasnie optimistic UI: aplikacja zaklada, ze sie uda, i pokazuje wynik od razu.</p>' +
            '<p>Ale barista trzyma pod lada kartke z tym, co bylo wczesniej. Jesli okaze sie, ze mleko sie skonczylo, wraca do ciebie i mowi: nie wyszlo, oddaje pieniadze. Bez tej kartki nie mialby jak niczego cofnac.</p>' +
            '<p>A realtime to glosnik w kawiarni. Gdy ktos inny odbierze ostatnie ciastko, wszyscy slysza to w tej samej chwili i nikt nie stoi przy ladzie z nieaktualna informacja w glowie.</p>' +
            '<p>Razem daja wrazenie, ze aplikacja jest szybka i ze wszyscy widza to samo.</p>',
          en: '<p>You order a coffee and the barista writes your name on the cup before brewing anything. It feels like the order is <em>already happening</em>, even though there is no coffee yet. That is optimistic UI: the app assumes success and shows the result straight away.</p>' +
            '<p>But the barista keeps a slip under the counter with what things looked like before. If the milk turns out to be gone, he comes back and says: it did not work, here is your money. Without that slip he could not undo anything.</p>' +
            '<p>Realtime is the loudspeaker in the cafe. When somebody else takes the last pastry, everyone hears it at the same moment and nobody stands at the counter with outdated information in their head.</p>' +
            '<p>Together they make the app feel fast and make everyone see the same thing.</p>'
        },
        school: {
          pl: '<p>Optimistic UI to zaklad: pokazujesz wynik operacji, zanim serwer go potwierdzi. Oplaca sie, gdy szansa powodzenia jest wysoka, a operacja jest odwracalna - polubienie, zmiana statusu, przeciagniecie karty. Nie oplaca sie przy platnosciach i nieodwracalnych akcjach.</p>' +
            '<p>Wzorzec ma zawsze trzy fazy, i tej srodkowej najczesciej brakuje w kodzie:</p>' +
            '<pre><code>useMutation({\n  mutationFn: setStatus,\n  onMutate: async (next) =&gt; {\n    await qc.cancelQueries({ queryKey: key })   // 1. zatrzymaj wyscig\n    const prev = qc.getQueryData(key)           // 2. SNAPSHOT\n    qc.setQueryData(key, next)                  // 3. zgadywanka\n    return { prev }\n  },\n  onError: (_e, _v, ctx) =&gt; qc.setQueryData(key, ctx.prev),  // cofnij\n  onSettled: () =&gt; qc.invalidateQueries({ queryKey: key })   // prawda\n})</code></pre>' +
            '<h4>Realtime: SSE czy WebSocket</h4>' +
            '<p>SSE (Server-Sent Events) to jednokierunkowy strumien po zwyklym HTTP - dziala z CDN, proxy i naglowkami autoryzacji, sam sie wznawia. Wystarcza dla 90 procent przypadkow typu "powiadom mnie, ze cos sie zmienilo". WebSocket bierz wtedy, gdy naprawde potrzebujesz kanalu w dwie strony: czat, wspoledycja, telemetria.</p>' +
            '<h4>Zasada, ktora oszczedza tygodnie</h4>' +
            '<p>Push z serwera nie powinien renderowac sie bezposrednio. Niech <strong>uniewaznia klucz w cache</strong> albo aktualizuje wpis w cache. Jesli komponenty subskrybuja socket bezposrednio, kazdy z nich ma wlasna kopie prawdy i po tygodniu masz dwa niezalezne systemy stanu, ktore trzeba synchronizowac recznie.</p>' +
            '<p>Warto tez z gory ustalic, co uzytkownik widzi w czasie oczekiwania. Sa trzy sensowne warianty: pelny optymizm bez zadnego wskaznika, optymizm z delikatnym stanem pending na wierszu oraz zwykly spinner blokujacy akcje. Przy operacjach, ktore udaja sie ponad 99 procent razy, pierwszy wariant jest najlepszy. Przy 90 procentach lepszy jest drugi, bo cofniecie nie zaskoczy uzytkownika w polowie kolejnego kroku.</p>',
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
          pl: '<p>Realtime i optimistic UI to ta sama klasa problemu: <strong>masz dwa zegary, a uzytkownik ma widziec jeden interfejs</strong>. Cala trudnosc lezy w tym, kto wygrywa konflikt i kiedy.</p>' +
            '<h4>Jeden punkt uzgodnienia</h4>' +
            '<p>Wybierz cache jako jedyne miejsce, w ktorym spotykaja sie: odpowiedzi HTTP, zdarzenia push i zapisy optymistyczne. Kazde inne rozwiazanie prowadzi do rozjazdu przy pierwszym wyscigu. Konkretny mechanizm w TanStack Query to <code>cancelQueries</code> w <code>onMutate</code>: bez niego refetch, ktory wystartowal 200 ms wczesniej, wraca po twojej zgadywance i cicho ja nadpisuje starymi danymi.</p>' +
            '<h4>Kontrakt zdarzen</h4>' +
            '<pre><code>// dobre zdarzenie: maly, wersjonowany, z id encji\n{ "type": "ticket.updated", "id": "771", "rev": 18, "at": "2026-03-04T10:12:01Z" }\n\n// zle: caly obiekt bez wersji - nie wiesz, czy nie jest starszy\nniz to, co juz masz w cache</code></pre>' +
            '<p>Zdarzenia moga dotrzec nie po kolei i moga sie zdublowac. Numer rewizji pozwala odrzucic zdarzenie starsze niz stan lokalny. Bez tego przy niestabilnym 4G user zobaczy migotanie statusu w obie strony.</p>' +
            '<h4>Reconnect i backfill</h4>' +
            '<p>Kazde polaczenie sie zerwie: tunel, winda, przelaczenie z Wi-Fi na LTE. SSE ma <code>Last-Event-ID</code>, ktore serwer powinien honorowac. Jesli nie honoruje, po reconnect zrob pelne <code>invalidateQueries</code> na widocznych ekranach - to tanszy backfill niz dopisywanie brakujacych zdarzen. Zawsze zakladaj, ze strumien zgubil zdarzenia.</p>' +
            '<h4>Skala i koszty</h4>' +
            '<ul>' +
            '<li>Otwarte polaczenie to pamiec na serwerze. Przy 5 tysiacach zalogowanych agentow to 5 tysiecy trwalych polaczen - projekt musi to uwzglednic po stronie load balancera i limitow proxy (domyslny timeout idle w nginx to 60 s, wiec potrzebujesz heartbeat).</li>' +
            '<li>Przy bardziej niz jednej aktualizacji na sekunde na uzytkownika oplaca sie batching po stronie serwera zamiast N osobnych zdarzen.</li>' +
            '<li>Sledz metryke "odsetek cofnietych mutacji". Powyzej 2-3 procent optymizm przestaje byc pomocny i zaczyna byc oszustwem wobec uzytkownika.</li>' +
            '</ul>' +
            '<h4>Design system</h4>' +
            '<p>Stany pending, rolled-back i conflict musza byc <strong>tokenami i wariantami komponentow</strong>, a nie improwizacja kazdego zespolu. W CHI oznacza to jawny wariant <code>is-pending</code> na wierszu tabeli i standardowy komponent konfliktu z akcja "zobacz aktualna wersje". Inaczej dwadziescia zespolow wymysli dwadziescia sposobow pokazania, ze cos sie nie zapisalo, a support dostanie dwadziescia roznych zgloszen.</p>',
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
            { pl: 'Pokazaniem wyniku operacji zanim serwer ja potwierdzi, z planem cofniecia w razie bledu', en: 'Showing the result of an operation before the server confirms it, with a rollback plan if it fails' },
            { pl: 'Wyswietlaniem przyjaznych komunikatow o bledach', en: 'Displaying friendly error messages' },
            { pl: 'Ladowaniem danych z wyprzedzeniem przy najechaniu myszka', en: 'Prefetching data on mouse hover' },
            { pl: 'Ukrywaniem spinnerow, zeby aplikacja wygladala szybciej', en: 'Hiding spinners so the app looks faster' }
          ],
          correct: 0,
          explain: {
            pl: 'Kluczowe sa oba elementy: natychmiastowa aktualizacja i mozliwosc cofniecia. Sama zgadywanka bez snapshotu to nie optymizm, tylko blad, ktory ujawni sie przy pierwszym 500 z serwera.',
            en: 'Both halves matter: the instant update and the ability to undo it. A guess without a snapshot is not optimism, it is a bug waiting for the first 500 from the server.'
          }
        },
        {
          q: {
            pl: 'Po co wolac cancelQueries na poczatku onMutate?',
            en: 'Why call cancelQueries at the start of onMutate?'
          },
          options: [
            { pl: 'Zeby zwolnic pamiec przed zapisem', en: 'To free memory before the write' },
            { pl: 'Zeby refetch bedacy juz w locie nie wrocil pozniej i nie nadpisal aktualizacji optymistycznej starymi danymi', en: 'So an in-flight refetch does not land later and overwrite the optimistic update with stale data' },
            { pl: 'Zeby wymusic ponowne zamontowanie komponentu', en: 'To force the component to remount' },
            { pl: 'Zeby wylaczyc retry dla tej mutacji', en: 'To disable retries for this mutation' }
          ],
          correct: 1,
          explain: {
            pl: 'To klasyczny wyscig: zapytanie wystartowalo przed twoja mutacja, ale odpowiedz przychodzi po niej. Bez anulowania cache dostaje stara wartosc i uzytkownik widzi, jak jego zmiana znika.',
            en: 'It is a classic race: the request started before your mutation but the response arrives after it. Without cancelling, the cache takes the old value and the user watches their change vanish.'
          }
        },
        {
          q: {
            pl: 'Kiedy SSE jest lepszym wyborem niz WebSocket?',
            en: 'When is SSE a better choice than a WebSocket?'
          },
          options: [
            { pl: 'Przy wspoledycji dokumentu w czasie rzeczywistym', en: 'For real-time collaborative document editing' },
            { pl: 'Przy przesylaniu duzych plikow binarnych', en: 'For transferring large binary files' },
            { pl: 'Gdy potrzebujesz gwarancji dostarczenia kazdego zdarzenia dokladnie raz', en: 'When you need exactly-once delivery guarantees for every event' },
            { pl: 'Przy jednokierunkowych powiadomieniach o zmianach, gdzie zalezy ci na zwyklym HTTP, naglowkach autoryzacji i automatycznym wznawianiu', en: 'For one-way change notifications where plain HTTP, auth headers and automatic reconnect matter' }
          ],
          correct: 3,
          explain: {
            pl: 'SSE jedzie po zwyklym HTTP, wiec przechodzi przez proxy i CDN, dziala z istniejaca autoryzacja i sam sie wznawia z Last-Event-ID. WebSocket bierz dopiero wtedy, gdy naprawde potrzebujesz kanalu w dwie strony.',
            en: 'SSE rides plain HTTP, so it passes proxies and CDNs, works with existing auth and reconnects itself using Last-Event-ID. Take a WebSocket only when you genuinely need a two-way channel.'
          }
        },
        {
          q: {
            pl: 'Agenci na niestabilnym LTE zglaszaja, ze status zgloszenia miga tam i z powrotem. Zdarzenia z serwera zawieraja caly obiekt, ale bez numeru rewizji. Co jest tu przyczyna i lekarstwem?',
            en: 'Agents on flaky LTE report that a ticket status flickers back and forth. Server events carry the whole object but no revision number. What is the cause and the cure?'
          },
          options: [
            { pl: 'Zbyt niski staleTime; wystarczy go podniesc do 5 minut', en: 'staleTime is too low; raise it to 5 minutes' },
            { pl: 'Zdarzenia docieraja nie po kolei i zdublowane, a bez wersji nie da sie odrzucic starszego; dodaj monotoniczna rewizje i ignoruj zdarzenia starsze niz stan lokalny', en: 'Events arrive out of order and duplicated, and without a version you cannot drop the older one; add a monotonic revision and ignore events older than local state' },
            { pl: 'Przegladarka buforuje odpowiedzi SSE; nalezy dodac naglowek no-store', en: 'The browser buffers SSE responses; add a no-store header' },
            { pl: 'Nalezy przejsc na WebSocket, bo SSE nie obsluguje kolejnosci', en: 'Switch to WebSockets, because SSE cannot preserve ordering' }
          ],
          correct: 1,
          explain: {
            pl: 'Przy zrywanym polaczeniu dostarczenie zdarzen jest z natury at-least-once i bez gwarancji kolejnosci. Wersjonowanie encji pozwala kazdemu klientowi lokalnie zdecydowac, czy zdarzenie wnosi cos nowego. Zmiana transportu tego nie naprawia.',
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
          pl: 'W trybie offline-first akcja uzytkownika trafia do kolejki w IndexedDB, a nie do sieci. Osobny worker oproznia kolejke, gdy wroci lacznosc, a klucz idempotencji chroni przed dublami.',
          en: 'In offline-first, a user action goes into an IndexedDB queue rather than onto the network. A separate worker drains it when connectivity returns, and an idempotency key protects against duplicates.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie listonosza, ktory pracuje w gorach. Czasem ma zasieg, czasem nie. Gdyby przy kazdym liscie musial dzwonic do centrali, staly by w miejscu godzinami.</p>' +
            '<p>Zamiast tego ma <strong>torbe</strong>. Wrzuca do niej wszystko, co ma do wyslania, i idzie dalej. Gdy dojdzie na szczyt i zlapie zasieg, torba oprozniania sie sama.</p>' +
            '<p>Ma tez <strong>notes z kopiami</strong> najwazniejszych papierow, wiec nawet bez zasiegu moze komus pokazac, co jest w umowie.</p>' +
            '<p>Jedna rzecz jest trudna. Jesli w miedzyczasie ktos w centrali zmienil ten sam papier, po powrocie sa dwie wersje. Ktos musi zdecydowac, ktora jest wazniejsza - i to jest naprawde trudna czesc, a nie sama torba.</p>',
          en: '<p>Picture a postman working in the mountains. Sometimes he has signal, sometimes he does not. If he had to phone the office for every letter, he would stand still for hours.</p>' +
            '<p>Instead he carries a <strong>bag</strong>. Everything he needs to send goes in the bag and he keeps walking. When he reaches the ridge and catches a signal, the bag empties itself.</p>' +
            '<p>He also carries a <strong>notebook of copies</strong> of the important papers, so even with no signal he can show somebody what the contract says.</p>' +
            '<p>One thing is hard. If somebody at the office changed the same paper meanwhile, there are now two versions. Someone has to decide which one counts - and that, not the bag, is the genuinely hard part.</p>'
        },
        school: {
          pl: '<p>Offline-first nie oznacza "aplikacja pokazuje komunikat, gdy nie ma sieci". Oznacza, ze <strong>brak sieci jest normalnym trybem pracy</strong>, a nie awaria. To realny wymog w telco: technik w piwnicy, kurier w windzie, agent w terenie.</p>' +
            '<h4>Trzy niezalezne warstwy</h4>' +
            '<ol>' +
            '<li><strong>Powloka aplikacji.</strong> Service worker precachuje HTML, CSS, JS i ikony. Tu wystarcza gotowe strategie z Workboxa: cache-first dla plikow z hashem w nazwie, network-first dla nawigacji.</li>' +
            '<li><strong>Dane do odczytu.</strong> Trzymane w IndexedDB, zwykle przez persystencje cache (np. persistQueryClient w TanStack Query albo wlasny adapter na Dexie). Uzytkownik widzi ostatni znany stan z jasna informacja, kiedy pochodzi.</li>' +
            '<li><strong>Zapisy.</strong> Kolejka outbox: akcja zapisuje sie lokalnie i czeka. Przegladarki Chromium maja Background Sync, ktory obudzi service workera po powrocie sieci; w Safari go nie ma, wiec i tak potrzebujesz zwyklego drenu przy starcie aplikacji i przy zdarzeniu <code>online</code>.</li>' +
            '</ol>' +
            '<pre><code>async function enqueue(op) {\n  op.id = crypto.randomUUID()   // klucz idempotencji\n  await db.outbox.add(op)\n  if (navigator.onLine) drain()\n}</code></pre>' +
            '<h4>Czego nie robic offline</h4>' +
            '<p>Operacji nieodwracalnych i takich, ktore wymagaja aktualnego stanu serwera: platnosci, aktywacji uslugi, rezerwacji ostatniej sztuki. Lepiej jawnie je zablokowac z czytelnym komunikatem niz obiecac uzytkownikowi cos, co za godzine odrzuci backend.</p>' +
            '<p>Testowanie? Przelacznik offline w DevTools to za malo. Realny scenariusz to <em>zle</em> lacze, nie brak lacza: 3 sekundy opoznienia i 30 procent utraconych pakietow. Uzyj profilu throttlingu i wymus czesciowe niepowodzenia.</p>',
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
          pl: '<p>Offline-first to decyzja produktowa przebrana za techniczna. Zanim napiszesz linijke kodu, ustal z biznesem <strong>ktore operacje maja dzialac bez sieci i jaka jest polityka konfliktow</strong>. Bez tej odpowiedzi kazda implementacja bedzie zla.</p>' +
            '<h4>Idempotencja jest kontraktem z backendem</h4>' +
            '<p>Kolejka offline gwarantuje dostarczenie <em>co najmniej raz</em>. Klient wysyla, traci zasieg przed odpowiedzia, ponawia - i backend widzi dwa zadania. Jedyna poprawna odpowiedz to naglowek <code>Idempotency-Key</code> generowany w momencie <strong>utworzenia operacji</strong>, nie w momencie wysylki, oraz deduplikacja po stronie serwera przez 24 godziny. To rozmowa z zespolem backendu, ktora trzeba odbyc na starcie, nie po pierwszym incydencie z podwojnym zamowieniem.</p>' +
            '<pre><code>// operacja powstaje raz, nawet jesli wysylka nastapi 5 razy\nconst op = { id: crypto.randomUUID(), type: "ticket.close", ticketId, rev }\nawait db.outbox.add(op)\n\n// przy kazdej probie leci ten sam klucz\nfetch(url, { method: "POST", headers: { "Idempotency-Key": op.id }, body })</code></pre>' +
            '<h4>Konflikty: wybierz swiadomie</h4>' +
            '<ul>' +
            '<li><strong>Last write wins.</strong> Najtansze, akceptowalne dla notatek i pol opisowych. Nieakceptowalne dla statusow i kwot.</li>' +
            '<li><strong>Odrzucenie z rewizja.</strong> Klient wysyla <code>rev</code>, backend zwraca 409 z aktualna wersja, UI pokazuje ekran porownania. Najlepszy stosunek jakosci do zlozonosci w aplikacjach biznesowych.</li>' +
            '<li><strong>CRDT (np. Yjs, Automerge).</strong> Automatyczne scalanie bez konfliktow, ale placisz rozmiarem dokumentu i zupelnie inna architektura danych. Uzasadnione przy wspoledycji, nie przy formularzu zgloszenia.</li>' +
            '</ul>' +
            '<h4>Twarde ograniczenia platformy</h4>' +
            '<ul>' +
            '<li>iOS czysci dane witryny po okolo 7 dniach braku interakcji, jesli PWA nie jest dodana do ekranu glownego. Kolejka offline moze po prostu zniknac - trzeba to zaprojektowac, nie zignorowac.</li>' +
            '<li>Limity magazynu sa udzialem od dostepnego dysku (rzedu kilku procent). Dla 500 zgloszen z zalacznikami to realny sufit - trzymaj metadane, nie pliki.</li>' +
            '<li>Background Sync nie istnieje w Safari i Firefoksie. Zaprojektuj dren przy starcie jako sciezke glowna, a Background Sync jako bonus.</li>' +
            '<li>Migracje schematu IndexedDB sa jak migracje bazy - potrzebujesz numeru wersji i sciezki upgrade, bo stare urzadzenia potrafia wrocic po pol roku.</li>' +
            '</ul>' +
            '<h4>Perspektywa principal</h4>' +
            '<p>Najczestszy blad organizacyjny: kazdy zespol buduje wlasny outbox. Sensowniejsze jest jedno malenkie SDK (kolejka, idempotencja, wskaznik stanu polaczenia, hooki polityki konfliktow) utrzymywane przez platform team, plus komponenty stanu offline w design systemie. Wtedy dyskusja w zespolach schodzi z "jak zrobic kolejke" na "ktore operacje wpuszczamy offline" - czyli tam, gdzie faktycznie jest ryzyko.</p>',
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
            pl: 'Do czego sluzy kolejka outbox w aplikacji offline-first?',
            en: 'What is an outbox queue for in an offline-first app?'
          },
          options: [
            { pl: 'Do przechowywania logow bledow do pozniejszej analizy', en: 'Storing error logs for later analysis' },
            { pl: 'Do buforowania obrazkow i czcionek', en: 'Buffering images and fonts' },
            { pl: 'Do zapisywania lokalnie operacji zapisu i wyslania ich, gdy wroci lacznosc', en: 'Storing write operations locally and sending them once connectivity returns' },
            { pl: 'Do kompresowania odpowiedzi API przed zapisem na dysk', en: 'Compressing API responses before writing them to disk' }
          ],
          correct: 2,
          explain: {
            pl: 'Outbox odwraca kierunek myslenia: akcja uzytkownika trafia najpierw do trwalej kolejki, a sama wysylka jest osobnym, ponawialnym procesem. Dzieki temu utrata zasiegu nie gubi pracy uzytkownika.',
            en: 'The outbox inverts the flow: a user action first lands in a durable queue, and sending is a separate retryable process. Losing signal then does not lose the user work.'
          }
        },
        {
          q: {
            pl: 'Dlaczego klucz idempotencji powinien powstawac przy tworzeniu operacji, a nie przy kazdej probie wyslania?',
            en: 'Why should an idempotency key be created when the operation is created, not on each send attempt?'
          },
          options: [
            { pl: 'Bo dzieki temu wszystkie ponowienia tej samej operacji maja ten sam klucz i backend moze je zdeduplikowac', en: 'Because then all retries of the same operation share one key and the backend can deduplicate them' },
            { pl: 'Bo generowanie UUID jest kosztowne obliczeniowo', en: 'Because generating a UUID is computationally expensive' },
            { pl: 'Bo przegladarka nie pozwala generowac UUID w service workerze', en: 'Because the browser cannot generate UUIDs in a service worker' },
            { pl: 'Bo klucz musi byc zgodny z identyfikatorem sesji', en: 'Because the key must match the session id' }
          ],
          correct: 0,
          explain: {
            pl: 'Klucz generowany przy wysylce byl by za kazdym razem inny, wiec ponowienie po utracie odpowiedzi wygladaloby dla backendu jak nowa operacja - i klient dostalby dwa zamowienia zamiast jednego.',
            en: 'A key generated at send time would differ on every attempt, so a retry after a lost response would look like a brand new operation to the backend - and the customer would get two orders instead of one.'
          }
        },
        {
          q: {
            pl: 'Ktora operacja jest najgorszym kandydatem do wykonywania w trybie offline?',
            en: 'Which operation is the worst candidate for offline execution?'
          },
          options: [
            { pl: 'Dopisanie notatki technicznej do zgloszenia', en: 'Adding a technical note to a ticket' },
            { pl: 'Oznaczenie zgloszenia jako przeczytane', en: 'Marking a ticket as read' },
            { pl: 'Zapisanie odczytu licznika w terenie', en: 'Recording a meter reading in the field' },
            { pl: 'Aktywacja platnej uslugi na koncie klienta', en: 'Activating a paid service on a customer account' }
          ],
          correct: 3,
          explain: {
            pl: 'Aktywacja jest nieodwracalna i zalezy od aktualnego stanu konta oraz limitow po stronie serwera. Obiecanie jej offline konczy sie odrzuceniem godzine pozniej i reklamacja - lepiej jawnie zablokowac akcje.',
            en: 'Activation is irreversible and depends on current account state and server-side limits. Promising it offline ends in a rejection an hour later and a complaint - better to block the action explicitly.'
          }
        },
        {
          q: {
            pl: 'Technicy zglaszaja, ze po weekendzie aplikacja na iPhonach traci zakolejkowane zapisy. Jaka jest najbardziej prawdopodobna przyczyna?',
            en: 'Technicians report that after a weekend the app on iPhones loses queued writes. What is the most likely cause?'
          },
          options: [
            { pl: 'IndexedDB nie obsluguje zapisow wiekszych niz 1 MB', en: 'IndexedDB cannot store writes larger than 1 MB' },
            { pl: 'Service worker wygasa po 24 godzinach i kasuje wszystkie bazy', en: 'The service worker expires after 24 hours and wipes every database' },
            { pl: 'Safari usuwa dane witryny po okolo 7 dniach bez interakcji, jesli PWA nie jest zainstalowana na ekranie glownym', en: 'Safari evicts site data after about 7 days without interaction unless the PWA is installed to the home screen' },
            { pl: 'Background Sync w iOS wysyla dane, ale nie zapisuje potwierdzen', en: 'Background Sync on iOS sends the data but never records the confirmations' }
          ],
          correct: 2,
          explain: {
            pl: 'To udokumentowane zachowanie ITP w Safari. Instalacja PWA na ekranie glownym zdejmuje ten limit, ale i tak warto ostrzegac uzytkownika o niewyslanych operacjach i synchronizowac przy kazdym otwarciu aplikacji.',
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
          pl: 'BFF zamienia siedem zapytan z telefonu na jedno, przenoszac laczenie danych na serwer. Kontraktem jest wersjonowany schemat w repozytorium, a nie dokumentacja na Confluence.',
          en: 'A BFF turns seven phone-side requests into one by moving the joining to the server. The contract is a versioned schema in the repository, not a page on Confluence.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze chcesz zrobic obiad i wysylasz dziecko po zakupy do piatki roznych sklepow. Kazda wyprawa to osobne wyjscie z domu, a dziecko wraca za kazdym razem. Obiad bedzie wieczorem.</p>' +
            '<p>Lepiej zatrudnic jedna osobe, ktora robi wszystkie zakupy naraz i przynosi jedna torbe z dokladnie tym, co potrzebne do tego przepisu. Ta osoba to BFF - pomocnik po stronie kuchni, ktory zna twoj przepis.</p>' +
            '<p>Jest jeszcze druga rzecz: <strong>lista zakupow</strong>. Jesli jest spisana i obie strony ja podpisaly, nikt nie przyniesie mleka zamiast smietany. A gdy ktos chce cos z listy usunac, musi uprzedzic wczesniej - nie w dniu obiadu.</p>',
          en: '<p>Imagine you want to cook dinner and you send a child shopping to five different shops. Each trip is a separate journey and the child comes home in between. Dinner will be ready by nightfall.</p>' +
            '<p>Better to hire one person who does all the shopping in one go and brings back a single bag with exactly what the recipe needs. That person is the BFF - a helper on the kitchen side who knows your recipe.</p>' +
            '<p>There is a second thing: <strong>the shopping list</strong>. If it is written down and both sides signed it, nobody brings milk instead of cream. And if somebody wants to remove an item, they have to say so in advance - not on the day of the dinner.</p>'
        },
        school: {
          pl: '<p>Kontrakt API to nie dokumentacja, tylko <strong>artefakt, ktory da sie zweryfikowac maszynowo</strong>. W praktyce oznacza to schemat OpenAPI albo schemat GraphQL trzymany w gicie i recenzowany jak kod.</p>' +
            '<h4>Dlaczego generowanie typow zmienia wszystko</h4>' +
            '<pre><code># w CI\nnpx openapi-typescript ./contracts/billing.yaml -o ./src/api/billing.d.ts\ngit diff --exit-code ./src/api   # roznica = kontrakt sie zmienil</code></pre>' +
            '<p>Recznie pisany interfejs TypeScript to zyczenie, nie kontrakt. Wygenerowany z pliku, ktory jest zrodlem prawdy dla backendu, zamienia zmiane pola w blad kompilacji zamiast w bledny ekran u klienta.</p>' +
            '<h4>BFF: backend for frontend</h4>' +
            '<p>W duzej firmie ekran "podsumowanie klienta" potrafi zbierac dane z billingu, CRM, katalogu uslug i systemu sieciowego. Cztery zapytania po 200 ms z telefonu w LTE to latwo sekunda z gorka, zanim cokolwiek sie pokaze. BFF laczy je po stronie serwera, gdzie opoznienia sa jednocyfrowe, i zwraca jeden obiekt dopasowany do ekranu.</p>' +
            '<p>Zysk to nie tylko szybkosc. BFF pozwala tez ukryc dziwactwa systemow zrodlowych - trzy rozne formaty daty, pola nazwane <code>CUST_NM</code>, kody statusu w postaci liczb - zamiast rozsmarowywac je po komponentach.</p>' +
            '<h4>Cena</h4>' +
            '<p>BFF to kolejna usluga do wdrazania, monitorowania i dyzurowania. Regula kciuka: bierz go, gdy masz co najmniej dwa problemy z listy - duzo zapytan na ekran, brzydkie modele zrodlowe, potrzeba ukrycia sekretow, agregacja pod mobilke. Dla jednego zapytania na ekran to czysty narzut.</p>',
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
          pl: '<p>Kontrakt API jest granica organizacyjna zapisana w pliku. Jego jakosc decyduje o tym, czy frontend potrzebuje spotkania z backendem, zeby zmienic ekran.</p>' +
            '<h4>Wersjonowanie i okno deprecjacji</h4>' +
            '<p>Zmiany addytywne (nowe opcjonalne pole, nowa wartosc enuma po stronie odpowiedzi) sa bezpieczne, o ile klienci ignoruja nieznane pola - to trzeba zapisac w regule, bo generowane parsery ze <code>strict</code> potrafia sie na tym wywrocic. Usuniecia i zmiany semantyki wymagaja okna: typowo <strong>dwa kwartaly</strong> w organizacji, gdzie aplikacja mobilna ma ogon starych wersji. Praktyczny mechanizm: naglowek <code>Sunset</code> plus telemetria uzycia pola, zeby wiedziec, kiedy realnie mozna usunac, a nie zgadywac.</p>' +
            '<h4>Testy sterowane konsumentem</h4>' +
            '<pre><code>// Pact: konsument publikuje oczekiwania, dostawca je weryfikuje w swoim CI\npact.addInteraction({\n  state: "customer 42 has 2 invoices",\n  uponReceiving: "a request for invoices",\n  withRequest: { method: "GET", path: "/v1/customers/42/invoices" },\n  willRespondWith: { status: 200, body: like({ items: eachLike({ id: "1" }) }) }\n})</code></pre>' +
            '<p>Wartosc Pacta nie lezy w testach, tylko w tym, ze <strong>psuje build dostawcy</strong>, gdy zlamie kontrakt. Bez tego kazda dyskusja o zgodnosci konczy sie na dobrych checiach. Alternatywa lzejsza: bramka na diff schematu w CI (oasdiff, graphql-inspector) blokujaca zmiany breaking bez etykiety <code>approved-breaking</code>.</p>' +
            '<h4>GraphQL czy OpenAPI</h4>' +
            '<p>GraphQL rozwiazuje over-fetching i pozwala frontendowi dobierac pola bez zmian po stronie serwera - kosztem cachowania (mniej dziala darmowy cache HTTP), zlozonosci autoryzacji na poziomie pola i realnego ryzyka kosztownych zapytan. W telco czesto najlepszy kompromis to <strong>REST z BFF na ekran</strong>: prosty do cachowania, latwy do przewidzenia, bez federacji do utrzymania. GraphQL Federation ma sens, gdy masz dedykowany zespol platformowy, ktory ja utrzyma - a nie jako projekt poboczny jednego zespolu.</p>' +
            '<h4>Kto jest wlascicielem BFF</h4>' +
            '<p>To najwazniejsze pytanie w calej lekcji. BFF utrzymywany przez zespol backendu staje sie kolejna kolejka zadan i frontend czeka tygodniami na dodanie pola. BFF utrzymywany przez zespol frontendowy dziala szybko, ale wymaga, zeby ten zespol umial go wdrazac, monitorowac i pelnic dyzur - to realne zobowiazanie, nie deklaracja. Prawo Conwaya nie negocjuje: <strong>ksztalt twojego API bedzie ksztaltem twojej organizacji</strong>. Jesli chcesz frontend, ktory dowozi w dniach, granica BFF musi lezec wewnatrz zespolu frontendowego, z jasnym kontraktem operacyjnym: SLO, alerty, runbook.</p>' +
            '<p>Zapisz to w ADR razem z liczbami: obecne p95 laczenia danych na kliencie, docelowe po BFF, koszt utrzymania w osobodniach na kwartal. Bez liczb ta dyskusja zawsze przegrywa z "nie mamy ludzi".</p>',
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
            pl: 'Co oznacza skrot BFF?',
            en: 'What does BFF stand for?'
          },
          options: [
            { pl: 'Backend For Frontend - warstwa serwerowa dopasowana do potrzeb konkretnego klienta', en: 'Backend For Frontend - a server layer shaped for the needs of one specific client' },
            { pl: 'Batch Fetch Framework - biblioteka do laczenia zapytan w przegladarce', en: 'Batch Fetch Framework - a library for merging requests in the browser' },
            { pl: 'Binary Format Filter - warstwa kompresji odpowiedzi', en: 'Binary Format Filter - a response compression layer' },
            { pl: 'Backend Failure Fallback - mechanizm awaryjny przy awarii API', en: 'Backend Failure Fallback - an emergency mechanism when the API is down' }
          ],
          correct: 0,
          explain: {
            pl: 'BFF to cienka warstwa serwerowa, ktora agreguje i przeksztalca dane pod jeden typ klienta. Kluczowe slowo to for - istnieje po to, zeby sluzyc konkretnemu frontendowi, a nie byc uniwersalnym API.',
            en: 'A BFF is a thin server layer that aggregates and reshapes data for one client type. The key word is for - it exists to serve a specific frontend, not to be a universal API.'
          }
        },
        {
          q: {
            pl: 'Dlaczego typy TypeScript generowane z OpenAPI sa lepsze niz pisane recznie?',
            en: 'Why are TypeScript types generated from OpenAPI better than hand-written ones?'
          },
          options: [
            { pl: 'Bo zajmuja mniej miejsca w bundlu', en: 'Because they take less space in the bundle' },
            { pl: 'Bo pochodza z tego samego zrodla prawdy co backend, wiec rozjazd kontraktu ujawnia sie jako blad kompilacji w CI', en: 'Because they come from the same source of truth as the backend, so contract drift surfaces as a compile error in CI' },
            { pl: 'Bo generatory tworza dokladniejsze typy generyczne', en: 'Because generators produce more precise generic types' },
            { pl: 'Bo pozwalaja pominac walidacje odpowiedzi w czasie dzialania', en: 'Because they let you skip runtime response validation' }
          ],
          correct: 1,
          explain: {
            pl: 'Recznie pisany typ opisuje to, w co wierzysz, a nie to, co zwraca serwer. Generowanie przenosi wykrycie zmiany z produkcji do pipeline CI. Uwaga: to nadal nie zastepuje walidacji w runtime na granicy systemu.',
            en: 'A hand-written type describes what you believe, not what the server returns. Generation moves detection from production into the CI pipeline. Note it still does not replace runtime validation at the boundary.'
          }
        },
        {
          q: {
            pl: 'Ktora zmiana w API jest zwykle bezpieczna dla istniejacych klientow?',
            en: 'Which API change is normally safe for existing clients?'
          },
          options: [
            { pl: 'Zmiana typu pola z liczby na tekst', en: 'Changing a field type from number to string' },
            { pl: 'Dodanie nowego, opcjonalnego pola w odpowiedzi', en: 'Adding a new optional field to the response' },
            { pl: 'Usuniecie nieuzywanej wartosci enuma z zadania', en: 'Removing an unused enum value from the request' },
            { pl: 'Zmiana domyslnej strony paginacji z 1 na 0', en: 'Changing the default pagination page from 1 to 0' }
          ],
          correct: 1,
          explain: {
            pl: 'Zmiany addytywne sa bezpieczne, pod warunkiem ze klienci ignoruja nieznane pola. Zmiana typu, semantyki albo wartosci domyslnej lamie kontrakt cicho - kod sie kompiluje, a zachowanie sie zmienia.',
            en: 'Additive changes are safe provided clients ignore unknown fields. Changing a type, a semantic or a default breaks the contract silently - the code still compiles while behaviour shifts.'
          }
        },
        {
          q: {
            pl: 'Zespol frontendowy chce BFF, zeby przyspieszyc dostarczanie. Backend proponuje, ze bedzie go utrzymywac u siebie. Jakie jest tu glowne ryzyko z punktu widzenia architektury?',
            en: 'A frontend team wants a BFF to speed up delivery. The backend team offers to own it. What is the main architectural risk?'
          },
          options: [
            { pl: 'BFF bedzie wolniejszy, bo wdrozony w innym klastrze', en: 'The BFF will be slower because it is deployed in a different cluster' },
            { pl: 'Nie da sie generowac typow z BFF utrzymywanego przez inny zespol', en: 'You cannot generate types from a BFF owned by another team' },
            { pl: 'Granica BFF przestanie odpowiadac granicy zespolu, wiec kazda zmiana ekranu znow bedzie wymagala kolejki u backendu i cel przyspieszenia zniknie', en: 'The BFF boundary stops matching the team boundary, so every screen change queues at the backend again and the speed goal disappears' },
            { pl: 'GraphQL przestanie dzialac z takim ukladem wlasnosci', en: 'GraphQL stops working with that ownership layout' }
          ],
          correct: 2,
          explain: {
            pl: 'Sensem BFF jest to, ze zespol frontendowy sam ksztaltuje odpowiedz pod swoj ekran. Gdy wlascicielem jest inny zespol, dokladasz warstwe i zachowujesz ten sam czas oczekiwania - klasyczny przypadek prawa Conwaya. Wlasnosc jest tu wazniejsza niz technologia.',
            en: 'The point of a BFF is that the frontend team shapes the response for its own screen. With another team owning it you add a layer and keep the same wait time - a textbook Conway law outcome. Ownership matters more than the technology here.'
          }
        }
      ]
    }
  ]
};
