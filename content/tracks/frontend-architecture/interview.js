export default {
  trackId: 'frontend-architecture',
  questions: [
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Trzy micro-frontendy dzielą Reacta jako singleton przez Module Federation. Zespol A podbija swoja wersje z 18.2 na 19.0 i wdraza. Po wdrozeniu cala aplikacja pada z bledem "Invalid hook call" - takze w zespolach B i C. Co sie tu naprawde stalo?',
        en: 'Three micro-frontends share React as a singleton via Module Federation. Team A bumps its version from 18.2 to 19.0 and ships. After the deploy the whole app dies with "Invalid hook call" - including teams B and C. What actually happened?'
      },
      options: [
        { pl: 'React 19 usunal hooki uzywane przez B i C, wiec ich kod jest niekompatybilny na poziomie API', en: 'React 19 removed the hooks used by B and C, so their code is API-incompatible' },
        { pl: 'Problem jest w cache CDN: przegladarka ma stary chunk runtime i wystarczy purge', en: 'The problem is CDN cache: the browser holds an old runtime chunk and a purge fixes it' },
        { pl: 'Module Federation nie wspiera Reacta jako shared dependency - trzeba go bundlowac osobno w kazdym remote', en: 'Module Federation does not support React as a shared dependency - it must be bundled separately in every remote' },
        { pl: 'Kontener zaladowal jedna instancje Reacta wybrana po najwyzszej wersji (semver), a B i C zostaly skompilowane pod inne wewnetrzne API dispatchera hookow', en: 'The container loaded a single React instance chosen by highest semver, and B and C were compiled against a different internal hook-dispatcher API' }
      ],
      correct: 3,
      explain: {
        pl: 'Shared singleton oznacza, ze wygrywa JEDNA instancja - domyslnie ta o najwyzszej wersji. B i C dostaja runtime, ktorego nie widzialy w build-time, a hooki lamia sie na wewnetrznym dispatcherze. Dlatego przy singletonach ustawia sie requiredVersion i strictVersion, a upgrade frameworka jest zdarzeniem calej platformy, nie decyzja jednego zespolu.',
        en: 'A shared singleton means ONE instance wins - by default the highest version. B and C get a runtime they never saw at build time, and hooks break on the internal dispatcher. That is why singletons need requiredVersion/strictVersion, and why a framework upgrade is a platform-wide event, not one team’s call.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Masz wprowadzic budzety wydajnosciowe w organizacji z 40 frontendowcami i 6 zespolami. Jak je zdefiniujesz i jak sprawisz, zeby faktycznie dzialaly, a nie byly ignorowanym warningiem w CI?',
        en: 'You need to introduce performance budgets in an org with 40 frontend engineers and 6 teams. How do you define them and make them actually stick instead of becoming an ignored CI warning?'
      },
      answer: {
        pl: '<p>Zaczynam od <strong>pomiaru, nie od limitu</strong>. Przez 2-4 tygodnie zbieram RUM (Real User Monitoring - dane od realnych uzytkownikow) i ustawiam budzety na obecnym p75, nie na wymarzonej wartosci. Budzet, ktorego nikt nie spelnia w dniu wprowadzenia, jest martwy.</p><p>Definiuje dwie warstwy: <em>metryki uzytkownika</em> (LCP, INP, CLS na p75, per kluczowa sciezka) oraz <em>proxy w CI</em> (rozmiar bundla per route, liczba requestow blokujacych, waga third-party). Proxy sa deterministyczne i mozna je egzekwowac na PR; metryki RUM sa wolniejsze i sluza do trendu.</p><p>Egzekwowanie robie stopniowo: najpierw komentarz bota na PR z diffem rozmiaru, potem blokada tylko przy przekroczeniu progu o wiecej niz X%, z jawnym mechanizmem <code>budget-exception</code> wymagajacym ADR i daty wygasniecia. Wlascicielstwo per route przypisuje zespolowi, nie platformie - platforma daje narzedzia i dashboard.</p><p>Na koniec: budzet bez rytualu umiera, wiec miesieczny przeglad regresji i jeden widoczny wskaznik w przegladzie kwartalnym.</p>',
        en: '<p>I start with <strong>measurement, not a limit</strong>. For 2-4 weeks I collect RUM (Real User Monitoring - field data from actual users) and set budgets at today’s p75, not at an aspirational number. A budget nobody meets on day one is dead on arrival.</p><p>I define two layers: <em>user metrics</em> (LCP, INP, CLS at p75, per critical journey) and <em>CI proxies</em> (bundle bytes per route, blocking request count, third-party weight). Proxies are deterministic and enforceable on a PR; RUM is slower and drives the trend.</p><p>Enforcement ramps: first a bot comment with the size diff, then a hard fail only when the regression exceeds X%, with an explicit <code>budget-exception</code> path requiring an ADR and an expiry date. Ownership sits with the feature team per route, not with the platform team - platform supplies tooling and the dashboard.</p><p>Finally, a budget without a ritual dies: a monthly regression review and one visible metric in the quarterly business review.</p>'
      },
      keyPoints: [
        { pl: 'Budzety ustawiane na zmierzonym p75 z RUM, nie na wartosciach zyczeniowych', en: 'Budgets set from measured RUM p75, not aspirational numbers' },
        { pl: 'Dwie warstwy: metryki uzytkownika (LCP/INP/CLS) i deterministyczne proxy w CI (bajty, requesty)', en: 'Two layers: user metrics (LCP/INP/CLS) and deterministic CI proxies (bytes, requests)' },
        { pl: 'Stopniowe egzekwowanie: komentarz na PR, potem blokada, z jawnym procesem wyjatkow z data waznosci', en: 'Ramped enforcement: PR comment, then hard fail, with an explicit expiring exception process' },
        { pl: 'Wlascicielstwo per route/zespol; platforma dostarcza narzedzia, nie wina', en: 'Per-route/team ownership; platform provides tooling, not blame' },
        { pl: 'Rytual przegladu regresji, inaczej budzet zamienia sie w ignorowany warning', en: 'A recurring regression review, otherwise the budget decays into an ignored warning' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Design system publikuje tokeny jako zmienne CSS. Zmieniasz wartosc <code>--color-danger</code> z czerwieni na ciemniejszy odcien, bo produkt chce lepszy kontrast. Ktore z tych podejsc najlepiej opisuje charakter tej zmiany w semver?',
        en: 'A design system ships tokens as CSS variables. You change <code>--color-danger</code> from red to a darker shade for better contrast. Which statement best describes the semver nature of this change?'
      },
      options: [
        { pl: 'To patch - zmienia sie tylko wartosc, nie nazwa tokenu, wiec API pozostaje identyczne', en: 'It is a patch - only the value changes, not the token name, so the API is identical' },
        { pl: 'To major - kazda zmiana w design systemie musi byc major, bo dotyka wszystkich konsumentow', en: 'It is a major - every design system change must be major because it touches all consumers' },
        { pl: 'To zmiana wizualnie lamiaca (minor lub major zaleznie od kontraktu), bo konsumenci moga miec snapshoty, screenshoty i wlasne nadpisania oparte o konkretna wartosc', en: 'It is a visually breaking change (minor or major depending on your contract), because consumers have snapshots, screenshots and overrides tied to the concrete value' },
        { pl: 'To nie jest zmiana wersjonowana w ogole - tokeny powinny byc dostarczane poza pakietem npm', en: 'It is not a versioned change at all - tokens should be delivered outside the npm package' }
      ],
      correct: 2,
      explain: {
        pl: 'Kontrakt design systemu to nie tylko sygnatury TypeScript - to takze wyglad. Zmiana wartosci tokenu wysadza testy wizualne i recznie dopasowane nadpisania u konsumentow. Dojrzale zespoly definiuja wprost, czy zmiany wizualne sa objete semver, i dostarczaja changelog wizualny plus okres migracji.',
        en: 'A design system contract is not only TypeScript signatures - it is also appearance. Changing a token value breaks visual tests and hand-tuned overrides downstream. Mature teams state explicitly whether visual changes are covered by semver and ship a visual changelog plus a migration window.'
      }
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'W monorepo z 90 pakietami CI trwa 45 minut, bo kazdy PR odpala wszystko. Wlaczasz build oparty o graf zaleznosci ("affected"). Po dwoch tygodniach na produkcji laduje bug, ktorego test istnial i przechodzil - ale nie zostal uruchomiony na tym PR. Jaka jest najbardziej prawdopodobna przyczyna?',
        en: 'In a 90-package monorepo, CI takes 45 minutes because every PR runs everything. You switch to an affected-graph build. Two weeks later a bug ships whose test existed and passed - but was never run on that PR. What is the most likely cause?'
      },
      options: [
        { pl: 'Graf widzi tylko zaleznosci zadeklarowane w package.json, a ten test polegal na zaleznosci ukrytej: pliku konfiguracyjnym, generowanym typie albo imporcie po sciezce wzglednej poza pakietem', en: 'The graph only sees dependencies declared in package.json, and this test relied on a hidden dependency: a config file, a generated type, or a relative import reaching outside the package' },
        { pl: 'Cache zdalny zwrocil stary wynik, bo hash inputow nie uwzglednial wersji Node w obrazie CI', en: 'The remote cache replayed a stale result because the input hash ignored the Node version in the CI image' },
        { pl: 'Testy e2e nigdy nie sa czescia grafu affected i trzeba je zawsze uruchamiac', en: 'E2E tests are never part of the affected graph and must always run' },
        { pl: 'Merge queue uruchomil testy na branchu zamiast na wyniku merge', en: 'The merge queue ran tests on the branch instead of on the merge result' }
      ],
      correct: 0,
      explain: {
        pl: 'Kazdy "affected" jest tak dobry jak graf, ktory go zasila. Niezadeklarowane krawedzie - globalny setup, wspoldzielone fixture, import w gore drzewa, artefakt generowany przez inny pakiet - sa dla grafu niewidzialne. Dlatego wprowadza sie lintery granic (np. zakaz importow spoza pakietu), jawne inputy w hashu i okresowy pelny build nocny jako siatke bezpieczenstwa.',
        en: 'Affected builds are only as good as the graph feeding them. Undeclared edges - a global setup file, a shared fixture, an import reaching up the tree, an artifact generated by another package - are invisible to the graph. Hence boundary lint rules, explicit hash inputs, and a nightly full build as a safety net.'
      }
    },
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Jak dzielisz stan w duzej aplikacji frontendowej i dlaczego ten podzial ma wieksze znaczenie architektoniczne niz wybor biblioteki?',
        en: 'How do you categorize state in a large frontend application, and why does that categorization matter architecturally more than the library choice?'
      },
      answer: {
        pl: '<p>Dziele stan na cztery rodzaje. <strong>Stan serwera</strong> (dane z API) - to w istocie cache z TTL, unieważnianiem i wyscigami; obsluguje go warstwa fetchujaca (TanStack Query, RTK Query, loadery routera), nie globalny store. <strong>Stan URL</strong> - filtry, paginacja, wybrana zakladka; nalezy do adresu, bo daje deep linki, przycisk wstecz i shareability za darmo. <strong>Stan klienta</strong> - koszyk, kreator, tryb edycji; to jedyny prawdziwy kandydat na store. <strong>Stan efemeryczny UI</strong> - hover, otwarty dropdown, focus; zostaje w komponencie.</p><p>Ten podzial jest wazniejszy niz biblioteka, bo wiekszosc bolu w duzych aplikacjach bierze sie z pomylenia kategorii: trzymanie odpowiedzi API w Reduksie tworzy reczna inwalidacje i dryf cache, a trzymanie filtrow w stanie lokalnym psuje nawigacje.</p><p>W rozmowie dodalbym konsekwencje: kategoria determinuje wlascicielstwo, strategie testowania i to, co sie dzieje przy offline oraz przy dwoch kartach przegladarki.</p>',
        en: '<p>I split state into four kinds. <strong>Server state</strong> (API data) is really a cache with TTL, invalidation and race conditions; it belongs in a fetching layer (TanStack Query, RTK Query, router loaders), not a global store. <strong>URL state</strong> - filters, pagination, active tab - belongs in the address bar, which buys deep links, back-button behaviour and shareability for free. <strong>Client state</strong> - cart, wizard progress, edit mode - is the only genuine store candidate. <strong>Ephemeral UI state</strong> - hover, open dropdown, focus - stays in the component.</p><p>The taxonomy beats the library choice because most pain in large apps comes from miscategorising: putting API responses in Redux invents manual invalidation and cache drift, while putting filters in local state breaks navigation.</p><p>In an interview I would add the consequences: the category determines ownership, test strategy, and what happens offline and across two browser tabs.</p>'
      },
      keyPoints: [
        { pl: 'Cztery kategorie: serwerowy, URL, kliencki, efemeryczny UI', en: 'Four categories: server, URL, client, ephemeral UI' },
        { pl: 'Stan serwera to cache - inwalidacja, TTL, wyscigi - a nie zwykle pole w store', en: 'Server state is a cache - invalidation, TTL, races - not a plain store field' },
        { pl: 'Stan URL daje deep linki, wstecz i wspoldzielenie bez dodatkowego kodu', en: 'URL state gives deep links, back button and sharing for free' },
        { pl: 'Zle przypisanie kategorii, a nie zla biblioteka, generuje wiekszosc dlugu', en: 'Miscategorisation, not the wrong library, generates most of the debt' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Aplikacja robi 7 rownoleglych wywolan do mikroserwisow, zeby zlozyc jeden ekran; p75 LCP wynosi 4.1 s na 4G. Zespol proponuje BFF (Backend For Frontend). Jaka jest NAJMOCNIEJSZA architektoniczna przeslanka za BFF w tym przypadku?',
        en: 'An app makes 7 parallel microservice calls to compose one screen; p75 LCP is 4.1 s on 4G. The team proposes a BFF (Backend For Frontend). What is the STRONGEST architectural argument for the BFF here?'
      },
      options: [
        { pl: 'BFF pozwala frontendowi uzywac GraphQL zamiast REST', en: 'A BFF lets the frontend use GraphQL instead of REST' },
        { pl: 'BFF przenosi agregacje i waterfall do sieci datacenter, daje jeden kontrakt dopasowany do ekranu i miejsce na spojne cache oraz obsluge czesciowych awarii', en: 'A BFF moves aggregation and the waterfall into the datacenter network, gives one screen-shaped contract, and creates a place for coherent caching and partial-failure handling' },
        { pl: 'BFF eliminuje potrzebe wersjonowania API mikroserwisow', en: 'A BFF removes the need to version microservice APIs' },
        { pl: 'BFF zmniejsza rozmiar bundla JS, bo logika agregacji znika z klienta', en: 'A BFF shrinks the JS bundle because aggregation logic leaves the client' }
      ],
      correct: 1,
      explain: {
        pl: 'Zysk bierze sie z latencji: siedem round-tripow po mobilnym RTT zastepujesz jednym, a reszta dzieje sie w sieci o milisekundowych opoznieniach. Dodatkowo BFF jest naturalnym miejscem na degradacje (zwroc ekran bez sekcji rekomendacji, gdy jej serwis pada). Mniejszy bundel to skutek uboczny, nie sedno.',
        en: 'The win is latency: seven round-trips over mobile RTT collapse into one, and the rest happens on a millisecond-latency network. The BFF is also the natural place for graceful degradation (render the page without the recommendations block when that service is down). A smaller bundle is a side effect, not the point.'
      }
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Strona produktowa renderowana serwerowo ma swietny LCP 1.4 s, ale INP na p75 wynosi 480 ms i uzytkownicy skarza sie, ze "klikniecie nic nie robi przez sekunde". Co jest najbardziej prawdopodobna przyczyna i wlasciwa reakcja architektoniczna?',
        en: 'A server-rendered product page has an excellent LCP of 1.4 s, but p75 INP is 480 ms and users report that "clicks do nothing for a second". What is the most likely cause and the right architectural response?'
      },
      options: [
        { pl: 'Serwer jest wolny - trzeba dolozyc instancje renderujace', en: 'The server is slow - add more rendering instances' },
        { pl: 'CLS powoduje, ze klikniecia trafiaja w zly element - trzeba zarezerwowac miejsce na obrazki', en: 'CLS makes clicks land on the wrong element - reserve space for images' },
        { pl: 'Za duze obrazki - konwersja do AVIF naprawi INP', en: 'Images are too large - converting to AVIF will fix INP' },
        { pl: 'Hydracja calej strony blokuje watek glowny dlugimi zadaniami; odpowiedzia jest selektywna hydracja/wyspy, odchudzenie JS na sciezce krytycznej i przeniesienie pracy poza main thread', en: 'Hydrating the whole page blocks the main thread with long tasks; the answer is selective hydration/islands, trimming critical-path JS, and moving work off the main thread' }
      ],
      correct: 3,
      explain: {
        pl: 'LCP i INP mierza rozne rzeczy: pierwsze - jak szybko widac, drugie - jak szybko reaguje. Klasyczny SSR bez wysp wysyla cala strone do hydracji, wiec main thread jest zajety dokladnie wtedy, gdy uzytkownik zaczyna klikac. Leczenie: mniej JS, hydracja tylko interaktywnych fragmentow, dzielenie dlugich zadan (yield, scheduler).',
        en: 'LCP and INP measure different things: how fast it appears versus how fast it responds. Classic all-at-once SSR hydration occupies the main thread exactly when users start clicking. The cure is less JS, hydrating only interactive regions, and breaking up long tasks (yielding, the scheduler).'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Zbudowaliscie design system, ale po roku tylko 3 z 9 zespolow go uzywaja; reszta ma wlasne komponenty i mowi, ze "wasz jest za sztywny". Nie masz nad nimi wladzy formalnej. Co robisz?',
        en: 'You built a design system, but a year in only 3 of 9 teams use it; the rest maintain their own components and say yours "is too rigid". You have no formal authority over them. What do you do?'
      },
      answer: {
        pl: '<p>Najpierw traktuje to jako <strong>problem produktowy, nie zgodnosciowy</strong>. Robie wywiady z 3-4 zespolami odmawiajacymi i szukam wzorca: zwykle to brak escape hatchy (mozliwosci nadpisania stylu, przekazania <code>ref</code>, kompozycji), zbyt wolna sciezka dodania czegos nowego albo brak wsparcia dla ich przypadku (formularze, tabele, wykresy).</p><p>Potem pokazuje dane, nie opinie: ile duplikatow buttona istnieje, ile bugow a11y zglosil audyt, ile czasu zespol traci na przepisywanie modalu. Liczby przekonuja managerow, ktorzy naprawde decyduja o priorytecie.</p><p>Zmieniam model wspolpracy na <em>federacyjny</em>: jasna sciezka kontrybucji z SLA na review, kanal wsparcia, "adopter of the month", pary z zespolem wdrozeniowym na pierwszy tydzien. Naprawiam trzy najbardziej blokujace luki i wypuszczam codemod, ktory robi migracje za nich.</p><p>Na koniec dogaduje z liderami <em>miekkie egzekwowanie</em>: nowe ekrany domyslnie na DS, stare bez deadline’u. Adopcja rosnie, gdy DS oszczedza czas, a nie gdy jest nakazany.</p>',
        en: '<p>First I treat it as a <strong>product problem, not a compliance problem</strong>. I interview 3-4 refusing teams and look for the pattern: usually missing escape hatches (style overrides, <code>ref</code> forwarding, composition), a contribution path that is too slow, or no coverage for their domain (forms, tables, charts).</p><p>Then I bring data, not opinions: how many duplicate buttons exist, how many a11y defects the audit found, how many days a team spends re-implementing a modal. Numbers persuade the managers who actually set priorities.</p><p>I move the operating model to <em>federated</em>: a documented contribution path with a review SLA, a support channel, visible credit for contributors, and pairing with the first adopting team for a week. I fix the three most blocking gaps and ship a codemod that performs the migration for them.</p><p>Finally I negotiate <em>soft enforcement</em> with leads: new screens default to the DS, legacy screens get no deadline. Adoption grows when the system saves time, not when it is mandated.</p>'
      },
      keyPoints: [
        { pl: 'Diagnoza przez rozmowy: escape hatche, szybkosc kontrybucji, pokrycie przypadkow', en: 'Diagnose by interviewing: escape hatches, contribution speed, use-case coverage' },
        { pl: 'Argumentacja danymi (duplikaty, bugi a11y, czas zespolow), nie autorytetem', en: 'Argue with data (duplication, a11y defects, team hours), not authority' },
        { pl: 'Model federacyjny: sciezka kontrybucji, SLA na review, widoczne uznanie', en: 'Federated model: contribution path, review SLA, visible credit' },
        { pl: 'Obnizanie kosztu adopcji: codemody, pairing, migracja robiona za konsumenta', en: 'Lower adoption cost: codemods, pairing, doing the migration for consumers' },
        { pl: 'Miekkie egzekwowanie na nowym kodzie zamiast twardego deadline’u na wszystkim', en: 'Soft enforcement on new code instead of a hard deadline on everything' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Wypuszczasz w bibliotece komponentow zmiane: <code>&lt;Button variant="primary"&gt;</code> nadal dziala, ale prop <code>size="small"</code> zostal przemianowany na <code>size="sm"</code>, a stary emituje deprecation warning i dalej dziala. Jaka wersje semver publikujesz?',
        en: 'You ship a component-library change: <code>&lt;Button variant="primary"&gt;</code> still works, but <code>size="small"</code> is renamed to <code>size="sm"</code>; the old value still works and logs a deprecation warning. Which semver bump do you publish?'
      },
      options: [
        { pl: 'minor, bo dodano nowa akceptowana wartosc przy zachowaniu wstecznej kompatybilnosci', en: 'minor, because a new accepted value was added while staying backward compatible' },
        { pl: 'major, bo zmienil sie publiczny prop', en: 'major, because a public prop changed' },
        { pl: 'patch, bo to tylko zmiana nazewnictwa bez nowej funkcjonalnosci', en: 'patch, because it is only a naming change with no new functionality' },
        { pl: 'prerelease, bo deprecation zawsze wymaga kanalu next', en: 'prerelease, because deprecations always require a next channel' }
      ],
      correct: 0,
      explain: {
        pl: 'Dopoki stara wartosc dziala, kontrakt nie jest zlamany - to dodanie funkcji, czyli minor. Usuniecie <code>small</code> bedzie dopiero majorem i powinno przyjsc z codemodem oraz wczesniejszym oknem deprecacji. W TypeScripcie uwaga: zwezenie typu unii bywa lamiace w build-time nawet gdy runtime dziala.',
        en: 'As long as the old value works, the contract is intact - this is an addition, hence minor. Removing <code>small</code> is the major, and it should arrive with a codemod after a deprecation window. TypeScript caveat: narrowing a union type can be build-time breaking even when runtime still works.'
      }
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Po dwoch latach macie 180 aktywnych feature flag; 60% z nich jest wlaczonych na 100% ruchu od ponad pol roku. Jaki jest najpowazniejszy skutek architektoniczny tego stanu?',
        en: 'After two years you have 180 live feature flags; 60% have been at 100% rollout for over six months. What is the most serious architectural consequence?'
      },
      options: [
        { pl: 'Rosnace koszty dostawcy flag i wolniejsze SDK przy starcie aplikacji', en: 'Rising vendor cost and a slower flag SDK at app startup' },
        { pl: 'Flagi psuja cache CDN, bo kazda odpowiedz staje sie unikalna', en: 'Flags break CDN caching because every response becomes unique' },
        { pl: 'Kombinatoryczna eksplozja sciezek kodu: liczba testowalnych stanow rosnie wykladniczo, a martwe galezie ukrywaja bugi i blokuja refaktory', en: 'Combinatorial explosion of code paths: the number of testable states grows exponentially, dead branches hide bugs and block refactors' },
        { pl: 'Utrata mozliwosci rollbacku, bo flagi nadpisuja deploye', en: 'Loss of rollback ability, because flags override deploys' }
      ],
      correct: 2,
      explain: {
        pl: 'Flaga to rozgalezienie w produkcji. Kazda dolozona flaga podwaja teoretyczna przestrzen stanow, wiec zaden zestaw testow jej nie pokrywa, a refaktor musi zachowac obie galezie. Higiena: kazda flaga ma wlasciciela i date wygasniecia, a sprzatanie po pelnym rolloucie jest czescia definicji ukonczenia zadania.',
        en: 'A flag is a branch in production. Each added flag doubles the theoretical state space, so no test suite covers it, and every refactor must preserve both branches. Hygiene: every flag gets an owner and an expiry date, and cleanup after full rollout is part of the definition of done.'
      }
    },
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'LCP na kluczowej stronie skoczylo z 2.1 s do 3.8 s w ciagu tygodnia. Nikt nie przyznaje sie do zmiany wydajnosciowej. Opisz, jak to debugujesz krok po kroku.',
        en: 'LCP on a key page jumped from 2.1 s to 3.8 s within a week. Nobody admits to shipping a performance change. Walk through how you debug it.'
      },
      answer: {
        pl: '<p>Najpierw <strong>zawezam populacje</strong> w RUM: czy regresja dotyczy wszystkich, czy jednego kraju, urzadzenia, przegladarki albo segmentu z flaga? Regresja tylko na mobile albo tylko dla zalogowanych od razu wskazuje inne przyczyny niz globalna.</p><p>Potem sprawdzam, <em>ktory element</em> jest LCP - czesto zmienil sie sam element (hero z obrazka na blok tekstu ladowany po API). Nastepnie rozbijam LCP na fazy: TTFB, opoznienie zasobu, czas pobierania, czas renderu. Ta jedna dekompozycja zwykle wskazuje winowajce: skok TTFB to backend lub cache miss na CDN, skok "resource load delay" to zwykle utrata <code>preload</code> albo obrazek odkrywany dopiero po JS.</p><p>Rownolegle koreluje timeline regresji z lista deployow, zmian flag i wdrozen third-party - tag manager potrafi wprowadzic skrypt bez zadnego PR.</p><p>Weryfikuje hipoteze na WebPageTest z porownaniem waterfalli sprzed i po, a nastepnie potwierdzam napraw w RUM, nie w labie.</p>',
        en: '<p>First I <strong>segment the population</strong> in RUM: is the regression global, or limited to one country, device class, browser, or a flagged cohort? Mobile-only or logged-in-only points at very different causes than a global shift.</p><p>Next I check <em>which element</em> is the LCP - often the element itself changed (hero moved from an image to a text block rendered after an API call). Then I decompose LCP into phases: TTFB, resource load delay, resource load time, render delay. That single breakdown usually names the culprit: a TTFB jump means backend or CDN cache misses, a load-delay jump usually means a lost <code>preload</code> or an image only discoverable after JS runs.</p><p>In parallel I correlate the regression timeline with deploys, flag changes and third-party rollouts - a tag manager can inject a script with no PR at all.</p><p>I confirm the hypothesis with before/after waterfalls in WebPageTest, then validate the fix in RUM, not in the lab.</p>'
      },
      keyPoints: [
        { pl: 'Segmentacja RUM: kraj, urzadzenie, przegladarka, kohorta flagi', en: 'Segment RUM by country, device, browser, flag cohort' },
        { pl: 'Sprawdzenie, czy zmienil sie sam element LCP', en: 'Check whether the LCP element itself changed' },
        { pl: 'Rozbicie LCP na fazy: TTFB, load delay, load time, render delay', en: 'Decompose LCP into TTFB, load delay, load time, render delay' },
        { pl: 'Korelacja z deployami, flagami i third-party wpuszczonym przez tag manager', en: 'Correlate with deploys, flags and third-party injected via tag manager' },
        { pl: 'Potwierdzenie naprawy w danych polowych, nie tylko w Lighthouse', en: 'Confirm the fix in field data, not only in Lighthouse' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Host i remote w Module Federation dziela biblioteke <code>@acme/tokens</code>. Host ma 3.4.0, remote zbudowany tydzien wczesniej ma 3.2.0 z <code>singleton: true</code> i <code>strictVersion: false</code>. Co dzieje sie w runtime i jakie jest ryzyko?',
        en: 'A Module Federation host and remote share <code>@acme/tokens</code>. The host has 3.4.0; the remote, built a week earlier, has 3.2.0 with <code>singleton: true</code> and <code>strictVersion: false</code>. What happens at runtime and what is the risk?'
      },
      options: [
        { pl: 'Kazdy zaladuje swoja kopie - marnujemy bajty, ale zachowanie jest poprawne', en: 'Each loads its own copy - wasted bytes but correct behaviour' },
        { pl: 'Zaladuje sie jedna kopia (zwykle 3.4.0), a remote po cichu dziala na nowszym kodzie - niezgodnosc ujawni sie dopiero na produkcji jako subtelny bug wizualny lub runtime', en: 'One copy loads (usually 3.4.0) and the remote silently runs against newer code - the mismatch surfaces only in production as a subtle visual or runtime bug' },
        { pl: 'Build sie nie powiedzie, bo Module Federation wymaga identycznych wersji singletonow', en: 'The build fails, because Module Federation requires identical singleton versions' },
        { pl: 'Remote zostanie odrzucony przez host i strona pokaze error boundary', en: 'The host rejects the remote and the page shows an error boundary' }
      ],
      correct: 1,
      explain: {
        pl: 'Przy <code>strictVersion: false</code> niezgodnosc daje jedynie ostrzezenie w konsoli - kod remote wykonuje sie na wersji hosta. To dokladnie ten rodzaj bledu, ktory przechodzi wszystkie testy zespolu i wybucha w integracji. Dlatego micro-frontendy potrzebuja testow integracyjnych na realnych, wdrozonych remote’ach oraz dyscypliny wersjonowania kontraktow wspoldzielonych.',
        en: 'With <code>strictVersion: false</code> a mismatch only logs a console warning - the remote executes against the host’s version. This is exactly the class of bug that passes every team-local test and explodes on integration. Hence micro-frontends need integration tests against real deployed remotes plus disciplined versioning of shared contracts.'
      }
    },
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Jak wybierasz strategie renderowania (CSR, SSR, SSG, ISR, streaming) dla konkretnego widoku? Podaj kryteria i przyklad, gdzie wybor jest nieoczywisty.',
        en: 'How do you choose a rendering strategy (CSR, SSR, SSG, ISR, streaming) for a given view? Give criteria and an example where the choice is non-obvious.'
      },
      answer: {
        pl: '<p>Decyduje na poziomie <strong>widoku, nie aplikacji</strong>, i pytam o cztery rzeczy: kto to widzi (bot/SEO czy zalogowany uzytkownik), jak swieze musza byc dane, czy tresc jest personalizowana i jaki jest koszt bledu (pusty ekran vs stale ceny).</p><p>Strona marketingowa: SSG lub ISR - tresc rzadko sie zmienia, chcemy CDN i zerowy TTFB. Lista produktow z cenami i stanem magazynu: SSR ze streamingiem - SEO i swiezosc, przy czym powolne fragmenty (rekomendacje) leca w Suspense. Panel administracyjny za loginem: CSR - SEO nieistotne, a SSR dodaje koszt i zlozonosc sesji. Nieoczywisty przypadek to strona produktu w e-commerce z cena zalezna od kraju: kuszace SSG psuje personalizacje, wiec zwykle konczy sie ISR dla szkieletu plus dogranie ceny na kliencie lub edge z krotkim TTL.</p><p>Dodalbym tez koszt operacyjny: SSR to serwery, kolejki i cold starty, wiec wybor to takze decyzja o tym, co zespol utrzyma o 3 w nocy.</p>',
        en: '<p>I decide <strong>per view, not per app</strong>, and ask four questions: who sees it (crawlers/SEO or authenticated users), how fresh the data must be, whether the content is personalized, and the cost of being wrong (blank screen vs stale prices).</p><p>Marketing pages: SSG or ISR - rarely changing, CDN-served, near-zero TTFB. A product list with prices and stock: streaming SSR - SEO plus freshness, with slow fragments (recommendations) deferred behind Suspense. An authenticated admin panel: CSR - SEO is irrelevant and SSR adds cost and session complexity. The non-obvious case is an e-commerce product page with country-dependent pricing: tempting SSG breaks personalization, so it usually lands on ISR for the shell plus client- or edge-resolved price with a short TTL.</p><p>I would also raise operational cost: SSR means servers, queues and cold starts, so the choice is also a decision about what the team can operate at 3 a.m.</p>'
      },
      keyPoints: [
        { pl: 'Decyzja per widok, nie per aplikacja', en: 'Decide per view, not per application' },
        { pl: 'Kryteria: SEO, swiezosc danych, personalizacja, koszt bledu', en: 'Criteria: SEO, data freshness, personalization, cost of being wrong' },
        { pl: 'Streaming/Suspense jako sposob na wolne fragmenty bez blokowania calosci', en: 'Streaming/Suspense to isolate slow fragments without blocking the page' },
        { pl: 'Hybrydy (ISR + dogranie personalizacji) dla przypadkow granicznych', en: 'Hybrids (ISR plus late personalization) for edge cases' },
        { pl: 'Koszt operacyjny i utrzymania jako pelnoprawne kryterium', en: 'Operational and on-call cost as a first-class criterion' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Implementujesz optymistyczny UI dla "polub" i "komentarz" w aplikacji spolecznosciowej z niestabilna siecia. Ktore podejscie najlepiej radzi sobie z sytuacja, gdy serwer odrzuci mutacje po 8 sekundach, a uzytkownik zdazyl juz wykonac trzy kolejne akcje?',
        en: 'You implement optimistic UI for "like" and "comment" in a social app on flaky networks. Which approach best handles the server rejecting a mutation after 8 seconds, by which time the user has performed three more actions?'
      },
      options: [
        { pl: 'Natychmiastowy revert do stanu sprzed mutacji przez zapisany snapshot calego cache', en: 'Immediately revert to the pre-mutation state using a saved snapshot of the whole cache' },
        { pl: 'Blokada UI do czasu potwierdzenia kazdej mutacji', en: 'Blocking the UI until each mutation is confirmed' },
        { pl: 'Pelny refetch calego ekranu po kazdym bledzie', en: 'A full refetch of the entire screen after every error' },
        { pl: 'Kolejka mutacji z identyfikatorami i deterministycznym ponownym odtworzeniem: usuwasz odrzucona mutacje z kolejki i przeliczasz stan optymistyczny od potwierdzonej bazy serwerowej', en: 'A mutation queue with ids and deterministic replay: drop the rejected mutation and recompute optimistic state from the confirmed server baseline' }
      ],
      correct: 3,
      explain: {
        pl: 'Snapshot calego cache cofa takze poprawne, pozniejsze akcje - klasyczny bug "znikniete komentarze". Prawidlowy model to baza serwerowa plus uporzadkowana lista mutacji w locie; odrzucenie usuwa jeden element i wynik jest przeliczany. Pelny refetch bywa akceptowalnym uproszczeniem, ale gubi niepotwierdzone akcje i kosztuje ruch.',
        en: 'Snapshotting the whole cache also rolls back later, valid actions - the classic "my comments vanished" bug. The correct model is a confirmed server baseline plus an ordered list of in-flight mutations; a rejection removes one entry and the result is recomputed. Full refetch is an acceptable simplification but discards unconfirmed work and costs bandwidth.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Czym jest ADR (Architecture Decision Record) i jak sprawiasz, zeby ADR-y realnie wplywaly na decyzje, zamiast lezec w repo jako dokumentacja-cmentarz?',
        en: 'What is an ADR (Architecture Decision Record) and how do you make ADRs actually influence decisions rather than rot in the repo as documentation graveyard?'
      },
      answer: {
        pl: '<p>ADR to krotki, niemodyfikowalny zapis <em>jednej</em> decyzji: kontekst, rozwazane opcje, wybor i konsekwencje. Kluczowa wartosc to nie sam wybor, tylko <strong>kontekst i odrzucone alternatywy</strong> - za rok nikt nie pamieta, dlaczego nie wzieliscie GraphQL, i dyskusja wraca od zera.</p><p>Zeby dzialaly, trzymam je w repo obok kodu, numerowane, w jednostronicowym szablonie - jesli pisanie zajmuje dzien, nikt nie napisze. Zamiast edytowac stary ADR, dopisuje nowy ze statusem "supersedes ADR-014"; historia decyzji jest wtedy czytelna.</p><p>Wciagam je w przeplyw pracy: wiekszy PR linkuje ADR, a review architektoniczne to komentarze do draftu (RFC) z jasna data zamkniecia dyskusji, po ktorej ktos decyduje - konsensus nie jest wymagany, wysluchanie jest. Nowi ludzie dostaja liste ADR w onboardingu.</p><p>Sygnal, ze to dziala: ktos w code review linkuje ADR jako argument, zamiast toczyc te sama debate trzeci raz.</p>',
        en: '<p>An ADR is a short, immutable record of <em>one</em> decision: context, options considered, the choice, and the consequences. The real value is not the choice but the <strong>context and the rejected alternatives</strong> - a year later nobody remembers why you passed on GraphQL, and the debate restarts from zero.</p><p>To make them work I keep them in the repo next to the code, numbered, on a one-page template - if writing one takes a day, nobody writes one. Instead of editing an old ADR I add a new one marked "supersedes ADR-014", which keeps the decision history readable.</p><p>I wire them into the workflow: substantial PRs link an ADR, and architecture review is comments on a draft (RFC) with an explicit closing date after which someone decides - consensus is not required, being heard is. New joiners get the ADR list during onboarding.</p><p>The signal that it works: someone cites an ADR in code review instead of relitigating the same debate a third time.</p>'
      },
      keyPoints: [
        { pl: 'Struktura: kontekst, opcje, decyzja, konsekwencje - jedna strona', en: 'Structure: context, options, decision, consequences - one page' },
        { pl: 'Najwieksza wartosc: zapis odrzuconych alternatyw i kontekstu', en: 'The biggest value is recording rejected alternatives and context' },
        { pl: 'Niemodyfikowalnosc i supersedowanie zamiast edycji starych zapisow', en: 'Immutability and supersession instead of editing old records' },
        { pl: 'Wpiecie w proces: link z PR, RFC z data zamkniecia, decydent a nie konsensus', en: 'Wired into process: linked from PRs, RFC with a closing date, a decider not consensus' },
        { pl: 'Uzycie w onboardingu i w code review jako zywy argument', en: 'Used in onboarding and cited in code review as a live argument' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Wirtualizujesz tabele z 50 000 wierszy. Po wdrozeniu Ctrl+F w przegladarce nie znajduje tresci, a uzytkownicy czytnikow ekranu zglaszaja, ze tabela "ma 30 wierszy". Ktore stwierdzenie najlepiej opisuje kompromis?',
        en: 'You virtualize a 50,000-row table. After shipping, browser Ctrl+F finds nothing and screen-reader users report the table "has 30 rows". Which statement best captures the tradeoff?'
      },
      options: [
        { pl: 'To wlasciwosc wirtualizacji: w DOM istnieje tylko okno widoczne, wiec trzeba dodac <code>aria-rowcount</code>, <code>aria-rowindex</code> oraz wlasne wyszukiwanie po stronie danych', en: 'It is inherent to virtualization: only the visible window exists in the DOM, so you must add <code>aria-rowcount</code>, <code>aria-rowindex</code> and your own data-side search' },
        { pl: 'To bug implementacji - poprawna wirtualizacja renderuje wszystkie wiersze w DOM, tylko je ukrywa', en: 'It is an implementation bug - correct virtualization renders all rows in the DOM and just hides them' },
        { pl: 'Wystarczy <code>content-visibility: auto</code> zamiast wirtualizacji i problem znika bez kosztow', en: 'Just use <code>content-visibility: auto</code> instead of virtualization and the problem disappears for free' },
        { pl: 'Czytniki ekranu i tak nie obsluguja duzych tabel, wiec to nie jest problem architektoniczny', en: 'Screen readers cannot handle large tables anyway, so this is not an architectural problem' }
      ],
      correct: 0,
      explain: {
        pl: 'Wirtualizacja kupuje wydajnosc kosztem kompletnosci DOM, a wraz z nia znika natywne szukanie, zaznaczanie tekstu, drukowanie i pelna semantyka tabeli. Trzeba to swiadomie odtworzyc: atrybuty ARIA z prawdziwymi indeksami, wyszukiwanie i eksport oparte o dane, a nie o DOM. <code>content-visibility</code> pomaga w renderze, ale nie ratuje przy 50 tys. wezlow.',
        en: 'Virtualization buys performance by giving up a complete DOM, and with it native find, text selection, printing and full table semantics. You must rebuild those deliberately: ARIA attributes with true indices, plus search and export driven by data rather than DOM. <code>content-visibility</code> helps rendering but does not save you at 50k nodes.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Zespol chce zbudowac wlasny edytor tekstu sformatowanego zamiast uzyc gotowego (TipTap, Lexical, Slate). Jak prowadzisz decyzje build vs buy i co decyduje?',
        en: 'A team wants to build its own rich-text editor instead of adopting one (TipTap, Lexical, Slate). How do you run the build-vs-buy decision, and what decides it?'
      },
      answer: {
        pl: '<p>Pierwsze pytanie: czy to jest nasz <strong>rdzenny wyroznik</strong>? Jesli sprzedajemy narzedzie do pisania, edytor moze byc rdzeniem. Jesli sprzedajemy CRM, edytor jest infrastruktura i wlasna implementacja to koszt bez przewagi.</p><p>Potem licze <em>calkowity koszt posiadania</em>, nie koszt pierwszej wersji. Edytory sa notorycznie podstepne: IME dla jezykow azjatyckich, wklejanie z Worda, undo/redo, wspolpraca w czasie rzeczywistym, dostepnosc, mobilne klawiatury. Pierwsza wersja to 3 tygodnie, dojrzalosc to lata pracy zespolu.</p><p>Analizuje ryzyko po stronie "buy": licencja, tempo rozwoju projektu, liczba maintainerow, mozliwosc rozszerzenia i to, czy da sie awaryjnie zforkowac. Sprawdzam tez koszt wyjscia - czy dane sa w otwartym formacie, czy w prywatnej strukturze.</p><p>Zwykle konczy sie na <em>buy plus cienka warstwa adaptera</em>: uzywamy biblioteki, ale izolujemy ja wlasnym API, zeby wymiana byla mozliwa. Decyzje zapisuje w ADR z warunkami rewizji.</p>',
        en: '<p>First question: is this a <strong>core differentiator</strong>? If we sell a writing tool, the editor can be core. If we sell a CRM, the editor is infrastructure and building it buys cost without advantage.</p><p>Then I estimate <em>total cost of ownership</em>, not the cost of v1. Editors are notoriously deceptive: IME for CJK input, pasting from Word, undo/redo, real-time collaboration, accessibility, mobile keyboards. V1 is three weeks; maturity is team-years.</p><p>I assess the buy-side risk: license, project velocity, maintainer count, extensibility, and whether we could fork it in an emergency. I also check exit cost - is the document stored in an open format or a proprietary structure?</p><p>The usual outcome is <em>buy plus a thin adapter layer</em>: use the library but wrap it behind our own API so replacement stays possible. I record the decision in an ADR with explicit revisit triggers.</p>'
      },
      keyPoints: [
        { pl: 'Test rdzennego wyroznika: czy to nasza przewaga, czy infrastruktura', en: 'Core-differentiator test: is this our advantage or plumbing' },
        { pl: 'TCO zamiast kosztu v1 - edge case’y (IME, wklejanie, a11y, undo) dominuja', en: 'TCO rather than v1 cost - edge cases (IME, paste, a11y, undo) dominate' },
        { pl: 'Ryzyko dostawcy: licencja, maintainerzy, rozszerzalnosc, mozliwosc forka', en: 'Vendor risk: license, maintainers, extensibility, fork-ability' },
        { pl: 'Koszt wyjscia i format danych', en: 'Exit cost and data format lock-in' },
        { pl: 'Kompromis: adopcja za wlasnym adapterem plus ADR z warunkami rewizji', en: 'Compromise: adopt behind an adapter plus an ADR with revisit triggers' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Wdrazasz scisla CSP (Content Security Policy) na aplikacji React z SSR. Po wlaczeniu <code>script-src \'self\' \'nonce-...\'</code> strona renderuje sie, ale analityka i widget czatu przestaja dzialac, a w konsoli sa bledy inline style. Jaka jest poprawna reakcja architektoniczna?',
        en: 'You roll out a strict CSP (Content Security Policy) on a server-rendered React app. With <code>script-src \'self\' \'nonce-...\'</code> the page renders, but analytics and the chat widget break and the console shows inline style violations. What is the right architectural response?'
      },
      options: [
        { pl: 'Dodac <code>\'unsafe-inline\'</code> do script-src i style-src - to jedyny sposob, zeby third-party dzialalo', en: 'Add <code>\'unsafe-inline\'</code> to script-src and style-src - the only way third-party works' },
        { pl: 'Zrezygnowac z CSP - w SPA i tak nie chroni, bo cala logika jest po stronie klienta', en: 'Drop CSP - in a SPA it protects nothing since all logic is client-side' },
        { pl: 'Uruchomic najpierw <code>Content-Security-Policy-Report-Only</code> z raportowaniem, skatalogowac realne zaleznosci, przypiac je nonce’ami lub hashami, a dla stylow uzyc nonce/hash zamiast globalnego unsafe-inline', en: 'Ship <code>Content-Security-Policy-Report-Only</code> first with reporting, inventory the real dependencies, pin them via nonces or hashes, and use nonce/hash for styles instead of a blanket unsafe-inline' },
        { pl: 'Przeniesc wszystkie skrypty third-party do iframe z <code>sandbox</code> i zostawic CSP bez zmian', en: 'Move all third-party scripts into a sandboxed iframe and leave CSP untouched' }
      ],
      correct: 2,
      explain: {
        pl: 'CSP wdraza sie iteracyjnie: tryb report-only ujawnia realny inwentarz zasobow, w tym skrypty wpuszczane przez tag manager. Dodanie <code>unsafe-inline</code> praktycznie kasuje ochrone przed XSS, ktora byla celem. Izolacja third-party w iframe bywa dobra taktyka uzupelniajaca, ale sama nie zastapi polityki.',
        en: 'CSP is rolled out iteratively: report-only mode reveals the real resource inventory, including scripts injected by a tag manager. Adding <code>unsafe-inline</code> effectively cancels the XSS protection you were buying. Sandboxing third-party in an iframe is a good complementary tactic but does not replace the policy.'
      }
    },
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Testy regresji wizualnej w design systemie generuja tyle falszywych alarmow, ze zespoly klikaja "approve all". Jak to naprawiasz?',
        en: 'Visual regression tests in your design system produce so many false positives that teams just click "approve all". How do you fix it?'
      },
      answer: {
        pl: '<p>Zaczynam od <strong>zrodel niedeterminizmu</strong>, bo to zwykle one, nie same testy. Typowe winowajcy: fonty ladowane z sieci, animacje i przejscia, kursory, daty i losowe dane, obrazy z zewnetrznych URL-i, roznice renderowania miedzy maszyna developera a CI. Naprawa: zamrozone fonty w obrazie, <code>prefers-reduced-motion</code> lub globalne wylaczenie animacji w trybie testowym, deterministyczne dane i zegar, snapshoty robione wylacznie w kontenerze CI.</p><p>Potem redukuje <em>zakres</em>: nie snapshotuje calych stron, tylko komponenty i ich kluczowe stany (hover, disabled, error, dlugi tekst, RTL). Mniej, ale sensowniejszych obrazkow.</p><p>Nastepnie kalibruje prog roznicy i wprowadzam maskowanie obszarow z natury zmiennych (awatary, wykresy).</p><p>Na koniec proces: jesli mimo to zostaje szum, wylaczam test zamiast zostawiac zielone-czerwone tlo, ktore uczy ludzi ignorowania. Zaufanie do zestawu testow jest zasobem - raz stracone, kosztuje wiecej niz bug, ktoremu mial zapobiec.</p>',
        en: '<p>I start with <strong>sources of non-determinism</strong>, because they cause this far more often than the tests themselves. Usual suspects: network-loaded fonts, animations and transitions, cursors, dates and random data, remote image URLs, and renderer differences between a laptop and CI. Fixes: fonts baked into the image, animations disabled in test mode, deterministic data and a frozen clock, and snapshots captured only inside the CI container.</p><p>Then I shrink <em>scope</em>: stop snapshotting whole pages and capture components in their meaningful states (hover, disabled, error, long text, RTL). Fewer images, each carrying signal.</p><p>Next I calibrate the diff threshold and mask inherently volatile regions (avatars, charts).</p><p>Finally the process: if noise persists, I delete the test rather than leave a red/green wallpaper that trains people to ignore CI. Trust in the suite is an asset - once lost it costs more than the bug it was meant to catch.</p>'
      },
      keyPoints: [
        { pl: 'Eliminacja niedeterminizmu: fonty, animacje, czas, losowe dane, srodowisko', en: 'Remove non-determinism: fonts, animations, time, random data, environment' },
        { pl: 'Snapshoty tylko w jednym srodowisku (kontener CI), nigdy lokalnie', en: 'Capture snapshots in a single environment (CI container), never locally' },
        { pl: 'Waskie snapshoty komponentow i stanow zamiast calych stron', en: 'Narrow component/state snapshots instead of full pages' },
        { pl: 'Progi roznicy i maskowanie obszarow z natury zmiennych', en: 'Diff thresholds and masking of inherently volatile regions' },
        { pl: 'Usuwanie halasliwych testow - zaufanie do CI jest zasobem', en: 'Delete noisy tests - trust in CI is an asset' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Komponent <code>&lt;Select&gt;</code> w design systemie ma juz 19 propow i kazdy nowy przypadek uzycia dodaje kolejny. Ktora zmiana API najlepiej rozwiazuje przyczyne, a nie objaw?',
        en: 'A design-system <code>&lt;Select&gt;</code> already has 19 props and each new use case adds another. Which API change addresses the cause rather than the symptom?'
      },
      options: [
        { pl: 'Zgrupowac propy w obiekty konfiguracyjne, np. <code>config={{...}}</code>, zeby lista byla krotsza', en: 'Group props into config objects like <code>config={{...}}</code> so the list looks shorter' },
        { pl: 'Rozbic na komponenty zlozone (compound) z jawna kompozycja: <code>Select.Trigger</code>, <code>Select.Options</code>, <code>Select.Option</code>, oraz udostepnic headless hook dla nietypowych przypadkow', en: 'Split into compound components with explicit composition: <code>Select.Trigger</code>, <code>Select.Options</code>, <code>Select.Option</code>, plus expose a headless hook for unusual cases' },
        { pl: 'Dodac prop <code>renderEverything</code> przyjmujacy funkcje renderujaca cala kontrolke', en: 'Add a <code>renderEverything</code> prop taking a function that renders the entire control' },
        { pl: 'Zamrozic API i kazac zespolom kopiowac komponent do swoich repozytoriow', en: 'Freeze the API and let teams copy the component into their own repos' }
      ],
      correct: 1,
      explain: {
        pl: 'Eksplozja propow to sygnal, ze komponent probuje przewidziec kazdy uklad. Kompozycja przenosi decyzje ukladowe do konsumenta, zostawiajac w bibliotece zachowanie i dostepnosc, a headless hook obsluguje przypadki, ktorych nie da sie zlozyc. Grupowanie propow tylko ukrywa zlozonosc, a render-prop na wszystko oznacza brak kontraktu.',
        en: 'Prop explosion signals a component trying to anticipate every layout. Composition hands layout decisions to the consumer while the library keeps behaviour and accessibility, and a headless hook covers cases composition cannot express. Grouping props only hides the complexity, and a render-everything prop means there is no contract at all.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Lighthouse w CI daje stabilne 95, a uzytkownicy narzekaja na wolnosc. Jak zbudujesz program pomiaru wydajnosci, ktory pokazuje prawde?',
        en: 'Lighthouse in CI reports a steady 95 while users complain the app is slow. How would you build a performance measurement program that tells the truth?'
      },
      answer: {
        pl: '<p>Lab i pole mierza rozne swiaty. Lighthouse to jedna sztuczna sesja: zimny cache, jedno urzadzenie, jedna siec, brak rozszerzen, brak realnego stanu konta. Uzytkownicy maja stary Android, 3 sekundy TTFB przez slaby ISP, 200 wierszy w koszyku i pluginy przegladarki.</p><p>Buduje wiec <strong>RUM jako zrodlo prawdy</strong>: web-vitals wysylane przez <code>sendBeacon</code>, atrybuty per sesja (kraj, typ urzadzenia, typ sieci, wersja aplikacji, kohorta flagi, typ strony). Patrze na <em>p75 i p95</em>, nigdy na srednia - srednia ukrywa dokladnie ta grupe, ktora sie skarzy.</p><p>Lab zostaje, ale w innej roli: wykrywanie regresji na PR w stabilnym srodowisku, nie ocena doswiadczenia. Traktuje go jak test jednostkowy wydajnosci.</p><p>Dokladam atrybucje (ktory element to LCP, ktory element i skrypt powoduja najgorszy INP), zeby dane byly akcjonowalne, oraz alerty na trendzie tygodniowym, nie na pojedynczym pomiarze. Na koniec segmentuje po przychodzie lub konwersji - to zamienia wykres w argument budzetowy.</p>',
        en: '<p>Lab and field measure different worlds. Lighthouse is one synthetic session: cold cache, one device, one network, no extensions, no real account state. Users are on an old Android, 3-second TTFB via a weak ISP, 200 rows in the cart, and browser plugins.</p><p>So I make <strong>RUM the source of truth</strong>: web-vitals shipped via <code>sendBeacon</code>, with per-session attributes (country, device class, network type, app version, flag cohort, page type). I look at <em>p75 and p95</em>, never the mean - the mean hides exactly the cohort that is complaining.</p><p>Lab stays, in a different role: regression detection on PRs in a stable environment, not an assessment of experience. I treat it as a performance unit test.</p><p>I add attribution (which element is the LCP, which element and script drive worst INP) so data is actionable, and alert on weekly trend rather than single samples. Finally I segment by revenue or conversion, which turns a chart into a budget argument.</p>'
      },
      keyPoints: [
        { pl: 'Rozroznienie lab vs field i przypisanie im roznych rol', en: 'Distinguish lab from field and give each a distinct role' },
        { pl: 'RUM jako zrodlo prawdy, z atrybutami sesji do segmentacji', en: 'RUM as source of truth, with session attributes for segmentation' },
        { pl: 'p75/p95 zamiast sredniej', en: 'p75/p95 instead of averages' },
        { pl: 'Atrybucja (element LCP, zrodlo INP), zeby dane byly akcjonowalne', en: 'Attribution (LCP element, INP source) to make data actionable' },
        { pl: 'Powiazanie z metrykami biznesowymi, alerty na trendzie', en: 'Tie to business metrics; alert on trend not single samples' }
      ]
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Wlaczacie automatyczne PR-y z aktualizacjami zaleznosci (Renovate/Dependabot) w monorepo. Po miesiacu zespol tonie w 30 otwartych PR-ach tygodniowo. Ktora konfiguracja najlepiej rozwiazuje problem bez rezygnacji z aktualizacji?',
        en: 'You enable automated dependency-update PRs (Renovate/Dependabot) in a monorepo. A month later the team drowns in 30 open PRs per week. Which configuration best solves this without giving up updates?'
      },
      options: [
        { pl: 'Zmniejszyc czestotliwosc do raz na kwartal, zeby PR-y sie kumulowaly', en: 'Reduce frequency to quarterly so PRs accumulate' },
        { pl: 'Przeniesc zaleznosci do peerDependencies, zeby bot ich nie widzial', en: 'Move dependencies to peerDependencies so the bot ignores them' },
        { pl: 'Przypiac wszystkie wersje dokladnie i wylaczyc bota', en: 'Pin every version exactly and turn the bot off' },
        { pl: 'Grupowac aktualizacje (dev-deps, patche, ekosystemy) w zbiorcze PR-y, automerge patchy i dev-deps przy zielonym CI, a manualnie obslugiwac tylko majory i zaleznosci runtime', en: 'Group updates (dev-deps, patches, ecosystems) into batched PRs, automerge patches and dev-deps on green CI, and handle only majors and runtime deps manually' }
      ],
      correct: 3,
      explain: {
        pl: 'Cel to utrzymanie malego, ciaglego strumienia zmian przy minimum uwagi ludzi. Grupowanie i automerge dzialaja tylko wtedy, gdy CI jest wiarygodne - dlatego inwestycja w testy jest warunkiem wstepnym. Kwartalne kumulowanie zamienia dziesiec malych ryzyk w jedno duze i wlasnie tak powstaja wielomiesieczne migracje.',
        en: 'The goal is a small continuous stream of change with minimal human attention. Grouping and automerge only work when CI is trustworthy - reliable tests are the precondition. Quarterly batching converts ten small risks into one large one, which is exactly how multi-month migrations are born.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Masz aplikacje AngularJS z 2016 roku, 400 tysiecy linii, 60 osob, ktore dowoza feature’y kazdego sprintu. Biznes nie zgodzi sie na zamrozenie. Jak przeprowadzisz migracje?',
        en: 'You own a 2016 AngularJS app: 400k lines, 60 engineers shipping features every sprint. The business will not accept a freeze. How do you run the migration?'
      },
      answer: {
        pl: '<p>Wykluczam przepisanie od zera - przy 60 osobach dowozacych rownolegle nowa aplikacja nigdy nie dogoni starej. Wybieram <strong>wzorzec dusiciela</strong> (strangler fig): nowa architektura rosnie wokol starej i przejmuje ja fragment po fragmencie.</p><p>Technicznie potrzebuje warstwy granicznej: jednego shella routujacego, ktory potrafi obsluzyc oba swiaty (proxy na poziomie sciezek albo web components jako most), wspoldzielonej sesji i tokenow oraz wspolnych tokenow designu, zeby uzytkownik nie widzial dwoch produktow.</p><p>Kolejnosc migracji wybieram po wartosci i ryzyku: najpierw jeden mniejszy, ale prawdziwy przeplyw end-to-end, ktory udowodni sciezke i wyprodukuje szablon dla innych zespolow, potem obszary najczesciej zmieniane. Legacy, ktorego nikt nie dotyka, moze zostac latami - to poprawna decyzja, nie porazka.</p><p>Zarzadczo: mierzalny wskaznik (procent ruchu na nowym stacku) raportowany co miesiac, zakaz nowego kodu w legacy, budzet migracyjny wpisany w kazdy sprint zamiast osobnego projektu, ktory pierwszy padnie przy presji.</p>',
        en: '<p>I rule out a rewrite - with 60 engineers shipping in parallel, a from-scratch app never catches up. I use the <strong>strangler fig</strong> pattern: the new architecture grows around the old one and takes it over piece by piece.</p><p>Technically I need a boundary layer: one routing shell that can serve both worlds (path-level proxying, or web components as the bridge), shared session and tokens, and shared design tokens so users never see two products.</p><p>I sequence by value and risk: first one smaller but genuine end-to-end flow that proves the path and produces a template for other teams, then the most frequently changed areas. Legacy that nobody touches can stay for years - that is a correct decision, not a failure.</p><p>Management side: a measurable indicator (share of traffic on the new stack) reported monthly, a rule that no new code lands in legacy, and migration budget baked into every sprint rather than a separate project that dies first under pressure.</p>'
      },
      keyPoints: [
        { pl: 'Strangler fig zamiast big-bang rewrite przy aktywnym rozwoju', en: 'Strangler fig rather than a big-bang rewrite while development continues' },
        { pl: 'Warstwa graniczna: shell routujacy, wspolna sesja, wspolne tokeny designu', en: 'Boundary layer: routing shell, shared session, shared design tokens' },
        { pl: 'Pierwszy pionowy przeplyw jako dowod sciezki i szablon dla zespolow', en: 'A first vertical slice as proof of path and a template for teams' },
        { pl: 'Priorytet obszarow czesto zmienianych; nietykany legacy moze zostac', en: 'Prioritise high-churn areas; untouched legacy may simply remain' },
        { pl: 'Mierzalny wskaznik postepu i budzet w kazdym sprincie, nie osobny projekt', en: 'A measurable progress metric and per-sprint budget, not a side project' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Bundle glownej trasy urosl z 210 kB do 480 kB gzip po jednym PR, ktory "tylko dodal formatowanie dat i mala ikonke". Ktora przyczyna jest najbardziej prawdopodobna i najlepiej wykrywalna?',
        en: 'The main route bundle grew from 210 kB to 480 kB gzipped after a PR that "only added date formatting and one small icon". Which cause is most likely, and most detectable?'
      },
      options: [
        { pl: 'Dodano zaleznosc bez tree-shakingu importowana barelem (np. <code>import { format } from \'lib\'</code> ciagnace caly pakiet lub wszystkie locale)', en: 'A non-tree-shakeable dependency imported via a barrel (e.g. <code>import { format } from \'lib\'</code> pulling the whole package or every locale)' },
        { pl: 'Ikona SVG zostala wstawiona jako base64 i zajela 270 kB', en: 'The SVG icon was inlined as base64 and cost 270 kB' },
        { pl: 'Bundler zmienil poziom kompresji gzip', en: 'The bundler changed its gzip compression level' },
        { pl: 'Nowa zaleznosc rozbila code splitting, bo dodano dynamiczny import', en: 'The new dependency broke code splitting because a dynamic import was added' }
      ],
      correct: 0,
      explain: {
        pl: 'Klasyk: jedna funkcja pociaga caly pakiet plus komplet lokalizacji, bo import idzie przez plik-baryl albo pakiet nie jest ESM. Wykrywasz to raportem bundlera (<code>--stats</code>, source-map-explorer) porownanym miedzy commitami. Dlatego budzet rozmiaru per route powinien byc sprawdzany na kazdym PR, a nie raz na kwartal.',
        en: 'A classic: one function drags in the whole package plus all locales because the import goes through a barrel file or the package is not ESM. You detect it with a bundle report (<code>--stats</code>, source-map-explorer) diffed across commits. This is why per-route size budgets belong on every PR, not in a quarterly audit.'
      }
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'W Sentry widzisz 4000 wystapien bledu <code>t is not a function</code> ze stackiem pelnym <code>a.js:1:24817</code>. Deploye sa minifikowane. Co jest podstawowa przyczyna nieczytelnosci i wlasciwym rozwiazaniem?',
        en: 'Sentry shows 4,000 occurrences of <code>t is not a function</code> with stacks full of <code>a.js:1:24817</code>. Deploys are minified. What is the root cause of the unreadability and the right fix?'
      },
      options: [
        { pl: 'Trzeba wylaczyc minifikacje na produkcji, zeby stacki byly czytelne', en: 'Disable minification in production so stacks are readable' },
        { pl: 'Blad jest niediagnozowalny, bo pochodzi z rozszerzenia przegladarki', en: 'The error is undiagnosable because it comes from a browser extension' },
        { pl: 'Brakuje source map powiazanych z konkretnym releasem - trzeba je generowac, uploadowac przy deployu z identyfikatorem release i nie serwowac publicznie', en: 'Release-linked source maps are missing - generate them, upload them at deploy time with a release id, and do not serve them publicly' },
        { pl: 'Trzeba dodac wiecej blokow try/catch, zeby zlapac kontekst', en: 'Add more try/catch blocks to capture context' }
      ],
      correct: 2,
      explain: {
        pl: 'Source mapy to element pipeline’u wdrozeniowego, nie ciekawostka. Kluczowe jest powiazanie mapy z wersja artefaktu (release id / commit sha), bo inaczej mapowanie trafia w zly kod. Mapy uploaduje sie do systemu obserwowalnosci, a nie wystawia publicznie - inaczej oddajesz kod zrodlowy.',
        en: 'Source maps are part of the deploy pipeline, not a curiosity. The critical part is binding the map to the artifact version (release id / commit sha), otherwise symbolication points at the wrong code. Upload maps to the observability backend rather than serving them publicly, or you are handing out your source.'
      }
    },
    {
      kind: 'open',
      level: 'mid',
      q: {
        pl: 'Jak zaprojektowalbys strategie testow dla aplikacji frontendowej rozwijanej przez 6 zespolow, tak zeby CI trwalo ponizej 15 minut i zeby ludzie ufali wynikom?',
        en: 'How would you design the test strategy for a frontend app built by 6 teams so that CI stays under 15 minutes and people trust the results?'
      },
      answer: {
        pl: '<p>Kieruje sie ksztaltem "trofeum": najwiecej wartosci daja <strong>testy integracyjne komponentow</strong> (renderowanie z prawdziwym DOM, interakcja jak uzytkownik, zamockowana siec na poziomie HTTP), bo lapia realne bugi i nie rozsypuja sie przy refaktorze. Testy jednostkowe zostawiam dla logiki czystej: kalkulacje, reducery, parsery, formatowanie.</p><p>E2E ograniczam do kilkunastu <em>krytycznych sciezek biznesowych</em> (logowanie, zakup, platnosc), uruchamianych na srodowisku po deployu, nie na kazdym PR. Statyczna analiza i TypeScript traktuje jako pierwsza warstwe - najtansza z mozliwych.</p><p>Zeby zmiescic sie w 15 minutach: rownolegly shard, uruchamianie tylko dotknietych pakietow, cache zaleznosci i buildow, e2e w tle. Testy sa flaky-zero-tolerance: test niestabilny idzie na kwarantanne w 24 h i albo zostaje naprawiony, albo skasowany.</p><p>Wlasnosc jest przy zespolach, ale kontrakty miedzy zespolami sprawdzam osobno (contract testy), zeby nikt nie odkrywal zmiany API dopiero na e2e.</p>',
        en: '<p>I follow the testing trophy: most value comes from <strong>component integration tests</strong> (real DOM rendering, user-like interaction, network mocked at the HTTP layer), because they catch real bugs and survive refactors. Unit tests are reserved for pure logic: calculations, reducers, parsers, formatting.</p><p>E2E is limited to a dozen or so <em>critical business journeys</em> (login, checkout, payment), run against a deployed environment rather than on every PR. Static analysis and TypeScript are the first and cheapest layer.</p><p>To stay under 15 minutes: parallel sharding, running only affected packages, dependency and build caching, and e2e out of the blocking path. Flakiness gets zero tolerance: an unstable test is quarantined within 24 hours and then fixed or deleted.</p><p>Ownership sits with teams, but cross-team contracts get their own contract tests so nobody discovers an API change during an e2e run.</p>'
      },
      keyPoints: [
        { pl: 'Trofeum: nacisk na testy integracyjne komponentow, unit dla czystej logiki', en: 'Trophy shape: emphasis on component integration tests, units for pure logic' },
        { pl: 'E2E tylko dla krytycznych sciezek, poza blokujacym CI', en: 'E2E only for critical journeys, outside the blocking CI path' },
        { pl: 'Budzet czasu: sharding, affected, cache', en: 'Time budget: sharding, affected-only runs, caching' },
        { pl: 'Zerowa tolerancja dla flaky - kwarantanna i termin naprawy', en: 'Zero tolerance for flakiness - quarantine with a fix deadline' },
        { pl: 'Contract testy na granicach miedzy zespolami', en: 'Contract tests on cross-team boundaries' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Cztery zespoly produktowe wspoldziela jedno repozytorium i jeden pipeline deployu; kazdy release wymaga koordynacji i trwa 3 dni. CTO pyta, czy podzielic na micro-frontendy. Ktora diagnoza jest architektonicznie najtrafniejsza?',
        en: 'Four product teams share one repository and one deploy pipeline; each release needs coordination and takes 3 days. The CTO asks whether to split into micro-frontends. Which diagnosis is architecturally most accurate?'
      },
      options: [
        { pl: 'Problem jest w narzedziach - szybszy bundler i wiecej runnerow rozwiaza koordynacje', en: 'It is a tooling problem - a faster bundler and more runners will solve coordination' },
        { pl: 'Prawdziwym problemem jest sprzezenie deployu, nie liczba repozytoriow; najpierw wprowadz niezalezny deploy (flagi, wersjonowane artefakty, deploy per obszar), bo micro-frontendy bez tego dodaja koszt runtime bez zysku', en: 'The real problem is deploy coupling, not repository count; introduce independent deploy first (flags, versioned artifacts, per-area deploys), because micro-frontends without it add runtime cost with no gain' },
        { pl: 'Nalezy natychmiast podzielic na 4 repozytoria - prawo Conwaya wymusza zgodnosc struktury kodu ze struktura zespolow', en: 'Split into 4 repos immediately - Conway’s law demands code structure match team structure' },
        { pl: 'Trzeba scalic zespoly w jeden, zeby wyeliminowac koordynacje', en: 'Merge the teams into one to eliminate coordination' }
      ],
      correct: 1,
      explain: {
        pl: 'Micro-frontendy kupuja niezaleznosc wdrozeniowa, a placi sie za nia w runtime: wspoldzielone zaleznosci, spojnosc wizualna, wydajnosc, debugowanie przez granice. Jesli mozna uzyskac niezalezny deploy w monorepo - a czesto mozna - to tansza droga. Prawo Conwaya to obserwacja o komunikacji, a nie nakaz jednego repo na zespol.',
        en: 'Micro-frontends buy deploy independence and charge for it at runtime: shared dependencies, visual consistency, performance, cross-boundary debugging. If independent deploys are achievable inside the monorepo - and they often are - that is the cheaper path. Conway’s law is an observation about communication, not a mandate of one repo per team.'
      }
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Aplikacja offline-first synchronizuje notatki. Uzytkownik edytuje te sama notatke na telefonie w metrze i na laptopie. Po powrocie sieci obie wersje sa wysylane. Ktore podejscie jest najbardziej odpowiedzialne architektonicznie?',
        en: 'An offline-first app syncs notes. A user edits the same note on a phone in the subway and on a laptop. When connectivity returns both versions are pushed. Which approach is the most architecturally responsible?'
      },
      options: [
        { pl: 'Last write wins na podstawie zegara klienta - proste i wystarczajace', en: 'Last-write-wins based on the client clock - simple and sufficient' },
        { pl: 'Zapisywanie tylko diffow tekstowych bez wersjonowania - konflikt nie moze wtedy powstac', en: 'Store only text diffs without versioning - then conflicts cannot occur' },
        { pl: 'Blokada edycji offline, gdy notatka jest otwarta na innym urzadzeniu', en: 'Block offline editing whenever the note is open on another device' },
        { pl: 'Jawny model konfliktu: wersjonowanie po stronie serwera (etag/vector clock), wykrycie rozbieznosci i albo scalanie na poziomie pola/CRDT, albo pokazanie uzytkownikowi decyzji - z zachowaniem obu wersji', en: 'An explicit conflict model: server-side versioning (etag/vector clock), divergence detection, then either field-level/CRDT merge or a user-facing decision - never discarding a version' }
      ],
      correct: 3,
      explain: {
        pl: 'Last write wins po zegarze klienta cicho kasuje prace uzytkownika, a zegary urzadzen sa niewiarygodne. Odpowiedzialny system wykrywa rozbieznosc wzgledem znanej wersji bazowej i albo laczy deterministycznie (CRDT, merge per pole), albo pyta - ale nigdy nie traci danych bez sladu. Blokady offline lamia sama obietnice trybu offline.',
        en: 'Client-clock last-write-wins silently destroys user work, and device clocks are unreliable. A responsible system detects divergence from a known base version and either merges deterministically (CRDT, per-field merge) or asks the user - but never loses data silently. Offline locks contradict the whole promise of offline mode.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Product manager mowi: "nie mamy czasu na dlug techniczny w tym kwartale". Jestes staff engineerem i wiesz, ze warstwa danych blokuje kazdy nowy feature. Jak prowadzisz te rozmowe?',
        en: 'A product manager says: "we have no time for tech debt this quarter". You are the staff engineer and you know the data layer blocks every new feature. How do you run that conversation?'
      },
      answer: {
        pl: '<p>Przestaje uzywac slowa "dlug techniczny" - dla PM-a to prosba o czas bez zwrotu. Przekladam problem na <strong>jezyk efektu</strong>: "kazdy feature dotykajacy listy zamowien kosztuje o 5-8 dni wiecej i wprowadza srednio dwa bugi; w tym kwartale masz cztery takie funkcje, wiec placisz za to okolo miesiaca".</p><p>Przynosze dowody, nie odczucia: czas cyklu tych zadan, liczba incydentow z tego obszaru, komentarze z code review, dane z trackera.</p><p>Potem oferuje <em>opcje, nie ultimatum</em>: pelny refaktor (6 tygodni), waski refaktor obejmujacy tylko sciezke potrzebna do dwoch najblizszych featureow (2 tygodnie, wpiety w te featury), albo swiadome nic-nie-robienie z zapisanym ryzykiem. Zwykle wygrywa opcja srodkowa, bo nie konkuruje z roadmapa - jest jej czescia.</p><p>Na koniec ustalam sposob weryfikacji: jesli po refaktorze czas dostarczenia kolejnych zadan w tym obszarze nie spadnie, przyznaje sie do bledu. To buduje kredyt zaufania na nastepna rozmowe.</p>',
        en: '<p>I stop saying "tech debt" - to a PM it sounds like asking for time with no return. I translate it into <strong>outcome language</strong>: "every feature that touches the orders list costs 5-8 extra days and ships about two defects; you have four such features this quarter, so you are already paying roughly a month".</p><p>I bring evidence, not feelings: cycle time on those tickets, incident counts from that area, review comments, tracker data.</p><p>Then I offer <em>options, not an ultimatum</em>: a full refactor (6 weeks), a narrow refactor covering only the path the next two features need (2 weeks, folded into those features), or a deliberate do-nothing with the risk written down. The middle option usually wins because it does not compete with the roadmap - it is part of it.</p><p>Finally I define how we check the claim: if delivery time in that area does not drop after the refactor, I say so openly. That builds the credit I will need for the next conversation.</p>'
      },
      keyPoints: [
        { pl: 'Przetlumaczenie dlugu na koszt biznesowy: dni, bugi, incydenty', en: 'Translate debt into business cost: days, defects, incidents' },
        { pl: 'Dowody z danych (cycle time, incydenty), nie odczucia inzynierow', en: 'Evidence from data (cycle time, incidents), not engineering feelings' },
        { pl: 'Opcje z kosztem i ryzykiem zamiast ultimatum', en: 'Options with cost and risk instead of an ultimatum' },
        { pl: 'Refaktor wpiety w featury (incrementalny), nie osobny projekt', en: 'Refactor folded into features incrementally, not a separate project' },
        { pl: 'Jawne kryterium weryfikacji i gotowosc przyznania sie do bledu', en: 'An explicit success check and willingness to be proven wrong' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'CLS na stronie wynosi 0.28, a zrodlem jest naglowek, ktory po zaladowaniu wlasnego fontu robi sie o 6 px wyzszy. Ktore rozwiazanie usuwa przyczyne przy zachowaniu brandowego fontu?',
        en: 'A page has CLS 0.28 caused by a heading that grows 6 px taller once the brand font loads. Which fix removes the cause while keeping the brand font?'
      },
      options: [
        { pl: 'Preload fontu, <code>font-display: swap</code> oraz dopasowanie metryk fontu zastepczego (<code>size-adjust</code>, <code>ascent-override</code>) tak, by fallback zajmowal identyczna wysokosc', en: 'Preload the font, <code>font-display: swap</code>, and match fallback metrics (<code>size-adjust</code>, <code>ascent-override</code>) so the fallback occupies identical height' },
        { pl: '<code>font-display: block</code>, zeby tekst pojawil sie dopiero po zaladowaniu fontu', en: '<code>font-display: block</code> so text appears only after the font loads' },
        { pl: 'Ustawic staly <code>height</code> na kazdym naglowku', en: 'Set a fixed <code>height</code> on every heading' },
        { pl: 'Zrezygnowac z wlasnego fontu i uzyc systemowego', en: 'Drop the custom font and use a system font' }
      ],
      correct: 0,
      explain: {
        pl: 'Przesuniecie bierze sie z roznicy metryk miedzy fontem zastepczym a docelowym. Deskryptory <code>size-adjust</code>, <code>ascent-override</code> i <code>descent-override</code> pozwalaja zbudowac fallback o tych samych wymiarach, wiec swap staje sie niewidoczny. <code>font-display: block</code> zamienia CLS na niewidoczny tekst (gorszy LCP), a sztywne wysokosci psuja sie przy zawijaniu i tlumaczeniach.',
        en: 'The shift comes from metric differences between fallback and target font. The <code>size-adjust</code>, <code>ascent-override</code> and <code>descent-override</code> descriptors let you build a fallback with identical dimensions, making the swap invisible. <code>font-display: block</code> trades CLS for invisible text (worse LCP), and fixed heights break with wrapping and translations.'
      }
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Frontend i backend rozwijaja sie niezaleznie. Backend zmienia pole <code>total</code> z liczby na obiekt <code>{ amount, currency }</code>; testy jednostkowe frontu przechodza, bo mock byl aktualizowany recznie. Ktore narzedzie zapobiegloby temu najskuteczniej?',
        en: 'Frontend and backend evolve independently. The backend changes <code>total</code> from a number to <code>{ amount, currency }</code>; frontend unit tests pass because the mock was hand-updated. Which practice would have prevented this most reliably?'
      },
      options: [
        { pl: 'Wiecej testow jednostkowych na komponencie wyswietlajacym cene', en: 'More unit tests on the price-rendering component' },
        { pl: 'Wprowadzenie <code>any</code> na granicy API, zeby zmiany nie lamaly builda', en: 'Using <code>any</code> at the API boundary so changes never break the build' },
        { pl: 'Testy kontraktowe lub generowanie typow i mockow ze wspolnego zrodla schematu (OpenAPI/GraphQL), weryfikowane w CI obu stron', en: 'Contract tests, or generating types and mocks from a shared schema source (OpenAPI/GraphQL) verified in both sides’ CI' },
        { pl: 'Reczny code review kontraktow przed kazdym wdrozeniem backendu', en: 'Manual review of contracts before every backend deploy' }
      ],
      correct: 2,
      explain: {
        pl: 'Reczny mock zawsze bedzie dryfowal wzgledem realnego API - to nie kwestia dyscypliny, tylko czasu. Jedno zrodlo prawdy dla schematu i weryfikacja po obu stronach zamienia niema awarie produkcyjna w czerwony build. Walidacja runtime (np. zod) na granicy dodaje druga siatke bezpieczenstwa.',
        en: 'A hand-written mock always drifts from the real API - that is a matter of time, not discipline. A single schema source of truth verified on both sides turns a silent production failure into a red build. Runtime validation (e.g. zod) at the boundary adds a second safety net.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Wdrozenie o 16:00 w piatek wywolalo 40-minutowa awarie checkoutu; przyczyna byl twoj PR. Jak prowadzisz postmortem i co konkretnie zmieniasz jako lider techniczny?',
        en: 'A Friday 4 p.m. deploy caused a 40-minute checkout outage; the cause was your PR. How do you run the postmortem and what do you change as a technical leader?'
      },
      answer: {
        pl: '<p>Prowadze postmortem <strong>bezobwiniajacy</strong> i skoro to moj PR, to jest szczegolnie wazne - jesli autor sam sie publicznie biczuje, uczy zespol, ze bledy sie ukrywa. Zaczynam od faktow i osi czasu: kiedy wdrozono, kiedy pierwszy sygnal, kiedy ktos zauwazyl, kiedy rollback.</p><p>Najciekawsze pytanie to nie "kto sie pomylil", tylko <em>dlaczego system pozwolil temu dojsc do uzytkownikow</em>: czego nie zlapal review, czego nie zlapal test, dlaczego alert przyszedl po 25 minutach zamiast po 2, dlaczego rollback trwal 12 minut.</p><p>Z tego wychodza konkretne zmiany: test na brakujacej sciezce, alert na spadku konwersji checkoutu (metryka biznesowa, nie tylko 5xx), canary z automatycznym cofnieciem, jednoprzyciskowy rollback. Kazda akcja ma wlasciciela i date, inaczej dokument jest fikcja.</p><p>Kwestia piatku traktuje osobno: zamiast zakazu wdrozen wolna poprawe bezpieczenstwa wdrozen, bo zakaz kumuluje ryzyko na poniedzialek. Jesli jednak wykrywalnosc jest slaba, tymczasowe okno wdrozeniowe jest uczciwym srodkiem doraznym.</p>',
        en: '<p>I run a <strong>blameless</strong> postmortem, and since it was my PR that matters even more - if the author flagellates publicly, the team learns to hide mistakes. I start with facts and a timeline: deploy time, first signal, first human notice, rollback.</p><p>The interesting question is not "who erred" but <em>why the system let this reach users</em>: what review missed, what tests missed, why the alert took 25 minutes instead of 2, why rollback took 12 minutes.</p><p>That produces concrete changes: a test for the uncovered path, an alert on checkout conversion drop (a business metric, not just 5xx), canary deploys with automatic rollback, and one-click rollback. Every action item gets an owner and a date, otherwise the document is fiction.</p><p>I treat the Friday question separately: rather than banning deploys I prefer making deploys safer, because a ban piles risk onto Monday. But if detection is genuinely weak, a temporary deploy window is an honest stopgap.</p>'
      },
      keyPoints: [
        { pl: 'Postmortem bezobwiniajacy, zwlaszcza gdy winnym jest autor prowadzacy', en: 'Blameless postmortem, especially when the author is the facilitator' },
        { pl: 'Os czasu i pytanie o system, nie o osobe: co przepuscilo blad do uzytkownikow', en: 'Timeline and a systems question: what let the defect reach users' },
        { pl: 'Skrocenie czasu wykrycia i cofniecia (alerty biznesowe, canary, szybki rollback)', en: 'Shorten detection and recovery (business alerts, canary, fast rollback)' },
        { pl: 'Akcje z wlascicielem i data, inaczej dokument jest fikcja', en: 'Action items with owner and date, otherwise the doc is fiction' },
        { pl: 'Bezpieczenstwo wdrozen zamiast zakazu piatkow, z uczciwym wyjatkiem doraznym', en: 'Safer deploys over Friday bans, with an honest temporary exception' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Po kazdym wdrozeniu czesc uzytkownikow widzi bialy ekran i w Sentry pojawia sie <code>Failed to fetch dynamically imported module</code>. Stare chunki sa usuwane z CDN przy deployu. Ktore rozwiazanie jest architektonicznie poprawne?',
        en: 'After every deploy some users see a white screen and Sentry reports <code>Failed to fetch dynamically imported module</code>. Old chunks are purged from the CDN on deploy. Which fix is architecturally correct?'
      },
      options: [
        { pl: 'Wylaczyc code splitting, zeby istnial tylko jeden bundle', en: 'Disable code splitting so only one bundle exists' },
        { pl: 'Zachowac stare wersje chunkow przez okno przejsciowe (immutable, hashowane nazwy, retencja np. 30 dni) i dodac obsluge bledu importu z propozycja przeladowania strony', en: 'Retain old chunk versions for a transition window (immutable hashed filenames, e.g. 30-day retention) and handle the import failure by prompting a reload' },
        { pl: 'Ustawic <code>Cache-Control: no-store</code> na wszystkich zasobach', en: 'Set <code>Cache-Control: no-store</code> on all assets' },
        { pl: 'Wymuszac twarde przeladowanie u kazdego uzytkownika po kazdym deployu', en: 'Force a hard reload for every user after every deploy' }
      ],
      correct: 1,
      explain: {
        pl: 'Uzytkownik z otwarta karta ma w pamieci stary manifest i prosi o chunk, ktorego juz nie ma. Poprawny model to niemutowalne, hashowane artefakty przechowywane przez okno przejsciowe plus lagodna obsluga bledu (banner "dostepna nowa wersja"). <code>no-store</code> zabija cache i wydajnosc, a wymuszony reload gubi prace uzytkownika w formularzach.',
        en: 'A user with an open tab holds the old manifest and requests a chunk that no longer exists. The correct model is immutable hashed artifacts kept for a transition window plus graceful failure handling (a "new version available" banner). <code>no-store</code> destroys caching and performance, and forced reloads discard in-progress form work.'
      }
    },
    {
      kind: 'choice',
      level: 'mid',
      q: {
        pl: 'Audyt dostepnosci znajduje 300 naruszen w aplikacji, z czego 180 pochodzi z komponentow design systemu. Jaka jest najskuteczniejsza strategia naprawy w skali organizacji?',
        en: 'An accessibility audit finds 300 violations, 180 of which originate in design-system components. What is the most effective organization-scale remediation strategy?'
      },
      options: [
        { pl: 'Naprawic je w design systemie u zrodla i wypuscic w jednej wersji, dodajac testy a11y do CI biblioteki, a zespolom zostawic tylko naruszenia specyficzne dla ich kodu', en: 'Fix them at the source in the design system and ship one release, adding a11y tests to the library CI, leaving teams only their own code-specific violations' },
        { pl: 'Rozdzielic wszystkie 300 naruszen po zespolach produktowych, zeby kazdy naprawil swoje', en: 'Distribute all 300 violations to product teams so each fixes its own' },
        { pl: 'Dodac overlay dostepnosciowy jako szybkie rozwiazanie na poziomie strony', en: 'Add an accessibility overlay as a quick page-level fix' },
        { pl: 'Zglosic naruszenia jako dlug i zaplanowac je na przyszly rok', en: 'File the violations as debt and schedule them for next year' }
      ],
      correct: 0,
      explain: {
        pl: 'To najmocniejszy argument za design systemem: jedna naprawa mnozy sie przez wszystkich konsumentow. Domykasz to testami (axe w CI, testy klawiaturowe) tak, by regresja nie wrocila. Overlaye nie naprawiaja przyczyn i sa krytykowane przez uzytkownikow technologii asystujacych.',
        en: 'This is the strongest argument for a design system: one fix multiplies across every consumer. You lock it in with tests (axe in CI, keyboard tests) so the regression cannot return. Overlays do not fix root causes and are widely criticised by assistive-technology users.'
      }
    },
    {
      kind: 'open',
      level: 'senior',
      q: {
        pl: 'Kiedy micro-frontendy sa dobra decyzja, a kiedy monorepo z jednym deployem wygrywa? Jakich sygnalow szukasz i jaki jest realny koszt kazdego wyboru?',
        en: 'When are micro-frontends the right call, and when does a single-deploy monorepo win? What signals do you look for and what is the real cost of each?'
      },
      answer: {
        pl: '<p>Micro-frontendy kupuja jedno: <strong>niezaleznosc wdrozeniowa i organizacyjna</strong>. Maja sens, gdy zespoly maja rozne cykle wydawnicze, rozne stacki (np. przejeta firma), albo gdy skala organizacji sprawia, ze koordynacja jednego release’u jest realnym kosztem tygodniowym. Sygnaly: 6+ niezaleznych zespolow, wlasciwe granice domenowe, dojrzale devops, gotowosc na wlasna platforme.</p><p>Cena jest realna: duplikacja zaleznosci i wiekszy transfer, ryzyko niespojnosci wizualnej, trudniejsze debugowanie przez granice, wolniejsza nawigacja miedzy obszarami, koniecznosc kontraktow na wspoldzielony stan i wersje frameworka.</p><p>Monorepo z jednym deployem wygrywa niemal zawsze przy 1-4 zespolach: atomowe refaktory przez cala baze kodu, jedna wersja zaleznosci, prosty debug i tanszy runtime. Skalowanie robi sie narzedziami: affected build, cache zdalny, code ownership, granice wymuszane linterem, a niezaleznosc wdrozeniowa flagami.</p><p>Moja zasada: najpierw wyczerp monorepo z niezaleznym deployem; siegaj po micro-frontendy dopiero, gdy blokada jest organizacyjna, nie techniczna.</p>',
        en: '<p>Micro-frontends buy exactly one thing: <strong>deploy and organizational independence</strong>. They make sense when teams have different release cadences, different stacks (an acquisition, say), or when org scale makes coordinating a single release a genuine weekly cost. Signals: 6+ independent teams, real domain boundaries, mature devops, appetite to run a platform.</p><p>The price is real: duplicated dependencies and more bytes, visual-consistency risk, harder cross-boundary debugging, slower navigation between areas, and mandatory contracts for shared state and framework versions.</p><p>A single-deploy monorepo wins almost always at 1-4 teams: atomic cross-codebase refactors, one dependency version, easy debugging, cheaper runtime. You scale it with tooling instead: affected builds, remote cache, code ownership, lint-enforced boundaries - and you buy deploy independence with feature flags.</p><p>My rule: exhaust the monorepo-with-independent-deploys option first; reach for micro-frontends only when the blocker is organizational rather than technical.</p>'
      },
      keyPoints: [
        { pl: 'Micro-frontendy kupuja niezaleznosc wdrozeniowa/organizacyjna, nie jakosc kodu', en: 'Micro-frontends buy deploy/org independence, not code quality' },
        { pl: 'Sygnaly za: wiele zespolow, rozne cykle wydawnicze, rozne stacki, dojrzale devops', en: 'Signals for: many teams, differing release cadences, mixed stacks, mature devops' },
        { pl: 'Koszt runtime: duplikacja zaleznosci, spojnosc wizualna, debug przez granice', en: 'Runtime cost: duplicated deps, visual consistency, cross-boundary debugging' },
        { pl: 'Monorepo skaluje sie narzedziami: affected, cache, granice, ownership', en: 'Monorepos scale with tooling: affected builds, cache, boundaries, ownership' },
        { pl: 'Najpierw niezalezny deploy w monorepo, micro-frontendy jako ostatecznosc', en: 'Independent deploys inside the monorepo first; micro-frontends as a last resort' }
      ]
    },
    {
      kind: 'choice',
      level: 'senior',
      q: {
        pl: 'Marketing dodaje przez tag manager czwarty skrypt third-party. INP na p75 rosnie z 180 ms do 420 ms, ale tylko na Androidzie. Ktore podejscie najlepiej godzi potrzeby biznesu z wydajnoscia?',
        en: 'Marketing adds a fourth third-party script via tag manager. p75 INP rises from 180 ms to 420 ms, but only on Android. Which approach best reconciles business needs with performance?'
      },
      options: [
        { pl: 'Zablokowac wszystkie skrypty marketingowe polityka inzynierska', en: 'Block all marketing scripts by engineering policy' },
        { pl: 'Przeniesc caly frontend na SSR, co zniweluje wplyw skryptow', en: 'Move the whole frontend to SSR, which will neutralise the scripts' },
        { pl: 'Zwiekszyc limit INP w budzecie, bo tagi sa wymogiem biznesowym', en: 'Raise the INP budget because the tags are a business requirement' },
        { pl: 'Wprowadzic zarzadzana sciezke dla third-party: budzet wagi i czasu na main thread, ladowanie asynchroniczne po interakcji lub w web workerze, oraz obowiazkowy przeglad wydajnosci przed wpuszczeniem tagu', en: 'Introduce a managed third-party path: a weight and main-thread time budget, async loading after interaction or in a web worker, and a mandatory performance review before a tag ships' }
      ],
      correct: 3,
      explain: {
        pl: 'Skrypty third-party to wykonywanie obcego kodu na twoim main threadzie - dlatego zwykle bija w INP i najmocniej na slabych CPU. Blokada calkowita przegrywa politycznie, wiec skuteczniejszy jest kontrakt: budzet, izolacja (Partytown/worker, ladowanie leniwe), pomiar wplywu i mozliwosc wylaczenia. To zamienia konflikt w proces.',
        en: 'Third-party scripts execute foreign code on your main thread, which is why they hit INP hardest on weak CPUs. A blanket ban loses politically, so a contract works better: a budget, isolation (Partytown/worker, lazy loading), measured impact and a kill switch. That converts a conflict into a process.'
      }
    }
  ]
}
