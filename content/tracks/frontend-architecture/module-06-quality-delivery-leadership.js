export default {
  id: 'quality-delivery-leadership',
  order: 6,
  icon: '🚀',
  title: { pl: 'Jakość, dostarczanie i przywództwo', en: 'Quality, Delivery & Leadership' },
  description: {
    pl: 'Ostatnia mila architektury: strategia testów, pipeline CI/CD, obserwowalność błędów, bezpieczeństwo frontendu, kultura code review i to, co odróżnia seniora od principala.',
    en: 'The last mile of architecture: test strategy, the CI/CD pipeline, error observability, frontend security, code review culture, and what separates a senior from a principal.'
  },
  lessons: [

    {
      id: 'testing-strategy',
      title: { pl: 'Strategia testów', en: 'Test strategy' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Test trophy', en: 'Test trophy' },
          def: {
            pl: 'Następca piramidy testów: najwięcej wartości dają testy komponentów renderujące prawdziwy DOM, obok cienkiej warstwy testów jednostkowych i garstki E2E.',
            en: 'The successor to the test pyramid: component tests rendering a real DOM carry most of the value, next to a thin unit layer and a handful of E2E tests.'
          }
        },
        {
          term: { pl: 'Test zachowania, nie struktury', en: 'Behaviour over structure' },
          def: {
            pl: 'Test sprawdza kontrakt widoczny dla użytkownika (<em>Escape zamyka modal</em>), a nie szczegół implementacji (<code>klasa chi-modal__header</code>). Tylko pierwszy przeżyje refaktor.',
            en: 'A test asserts the user-visible contract (<em>Escape closes the modal</em>), not an implementation detail (<code>a chi-modal__header class</code>). Only the first one survives a refactor.'
          }
        },
        {
          term: { pl: 'Visual regression', en: 'Visual regression' },
          def: {
            pl: 'Porównanie zrzutów ekranu każdej historii ze Storybooka między wersjami. W design systemie priorytet: padding zmieniony o 4 piksele rozjeżdża layout u czterdziestu konsumentów przy zielonych testach.',
            en: 'Screenshot diffing of every Storybook story between versions. A priority in a design system: a 4 pixel padding change breaks layout for forty consumers while every test stays green.'
          }
        },
        {
          term: { pl: 'Test flaky i kwarantanna', en: 'Flaky test and quarantine' },
          def: {
            pl: 'Test, który raz przechodzi, raz nie, bez zmiany kodu. Przy 3 procentach flaky i 600 testach szansa na zielony przebieg spada niemal do zera - dlatego taki test idzie do kwarantanny z właścicielem i terminem.',
            en: 'A test that passes or fails without any code change. At 3 percent flaky over 600 tests the odds of a green run drop to almost zero, so it goes to quarantine with an owner and a deadline.'
          }
        },
        {
          term: { pl: 'Escape rate', en: 'Escape rate' },
          def: {
            pl: 'Odsetek błędów znalezionych na produkcji, które istniejąca warstwa testów miała szansę złapać. Znacznie uczciwszy wskaźnik jakości niż pokrycie kodu powyżej 80 procent.',
            en: 'The share of production bugs that the existing test layer had a chance to catch. A far more honest quality signal than pushing code coverage past 80 percent.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><text x="20" y="26" font-size="14" fill="var(--muted)">fewer, slower, more confidence per test</text><rect x="200" y="40" width="240" height="52" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="320" y="63" font-size="14" fill="var(--text)" text-anchor="middle">E2E - Playwright</text><text x="320" y="82" font-size="13" fill="var(--muted)" text-anchor="middle">40 flows, 12 min, flaky</text><rect x="140" y="104" width="360" height="52" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="320" y="127" font-size="14" fill="var(--text)" text-anchor="middle">Component + integration</text><text x="320" y="146" font-size="13" fill="var(--muted)" text-anchor="middle">600 tests, 4 min, Testing Library</text><rect x="90" y="168" width="460" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="320" y="191" font-size="14" fill="var(--text)" text-anchor="middle">Unit + contract</text><text x="320" y="210" font-size="13" fill="var(--muted)" text-anchor="middle">3000 tests, 40 s, pure logic and tokens</text><rect x="40" y="232" width="560" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="320" y="255" font-size="14" fill="var(--text)" text-anchor="middle">Static: TypeScript, ESLint, a11y lint</text><text x="320" y="274" font-size="13" fill="var(--muted)" text-anchor="middle">instant, runs while you type</text><text x="20" y="316" font-size="13" fill="var(--muted)">A design system adds a fifth lane next to this stack:</text><rect x="20" y="330" width="600" height="48" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="320" y="360" font-size="14" fill="var(--accent2)" text-anchor="middle">Visual regression on every story - the contract with 40 consumer apps</text></svg>',
        caption: {
          pl: 'Warstwy testów według kosztu i pewności. Design system dokłada piątą warstwę: testy wizualne, bo to one pilnują kontraktu z aplikacjami konsumentów.',
          en: 'Test layers by cost and confidence. A design system adds a fifth lane - visual regression, because that is what guards the contract with consumer apps.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że budujesz klocki Lego, z których czterdzieście innych osób buduje swoje zamki. Jeśli zmienisz kształt jednego klocka, wszystkie ich zamki mogą się rozsypać, a Ty dowiesz się o tym dopiero, gdy przyjdą z płaczem.</p><p>Testy to sposób, żeby dowiedzieć się wcześniej. Są cztery rodzaje sprawdzania. Pierwszy: patrzysz na klocek i widzisz, że jest zielony i ma osiem wypustek - to trwa sekundę. Drugi: próbujesz wcisnąć go w drugi klocek i sprawdzasz, czy trzyma. Trzeci: składasz mały domek i patrzysz, czy stoi. Czwarty: budujesz cały zamek z wieżami i fosą, co zajmuje pół dnia i czasem się przewróci nawet wtedy, gdy wszystko jest dobrze.</p><p>Mądra osoba robi bardzo dużo tych pierwszych, sporo drugich, kilka trzecich i tylko kilka czwartych. Bo jeśli będziesz budować cały zamek za każdym razem, gdy pomalujesz jeden klocek, nigdy nie skończysz.</p>',
          en: '<p>Imagine you make Lego bricks, and forty other people build their castles out of them. If you change the shape of one brick, all their castles can collapse - and you only find out when they show up crying.</p><p>Tests are how you find out earlier. There are four kinds of checking. First: you look at the brick and see it is green with eight studs - that takes a second. Second: you push it into another brick and check that it holds. Third: you build a small house and see whether it stands. Fourth: you build the whole castle with towers and a moat, which takes half a day and sometimes falls over even when everything is fine.</p><p>A smart person does very many of the first kind, a lot of the second, a few of the third, and only a handful of the fourth. Because if you rebuild the entire castle every time you repaint one brick, you will never finish.</p>'
        },
        school: {
          pl: '<p>Strategia testów to nie pytanie "czy testować", tylko "gdzie wydać budżet czasu". Każdy test kosztuje dwa razy: raz przy pisaniu, drugi raz przy każdym uruchomieniu i przy każdej naprawie, gdy zaczyna być flaky (niestabilny, raz przechodzi, raz nie).</p><p>Klasyczna piramida (dużo unitów, mało E2E) w nowoczesnym frontendzie zamieniła się w <strong>test trophy</strong>: najwięcej wartości dają testy komponentów, które renderują prawdziwy DOM i klikają jak użytkownik, a nie sprawdzają wewnętrznego stanu.</p><pre><code>// Testing Library - test zachowania, nie implementacji\nrender(&lt;Modal open onClose={spy} /&gt;);\nawait user.keyboard("{Escape}");\nexpect(spy).toHaveBeenCalled();</code></pre><p>Kluczowa zasada: testuj kontrakt, nie strukturę. Test, który sprawdza, że komponent ma klasę <code>chi-modal__header</code>, pękniesz przy każdym refaktorze. Test, który sprawdza, że Escape zamyka modal, przeżyje trzy przepisania implementacji.</p><p>W design systemie dochodzi warstwa, której nie ma w zwykłej aplikacji: <strong>visual regression</strong> (testy wizualne). Kod może być poprawny, testy zielone, a padding zmieniony o 4 piksele rozjedzie layout w czterdziestu aplikacjach. Narzędzia jak Chromatic albo Playwright z porównaniem screenshotów robią zdjęcie każdej historii ze Storybooka i pokazują diff w PR.</p><p>Praktyczny podział czasu, który działa: 60 procent wysiłku na testy komponentów, 25 procent na czystą logikę (funkcje, generatory tokenów, walidatory), 10 procent na wizualne, 5 procent na E2E dla trzech-czterech krytycznych ścieżek. Jeśli suite jednostkowy trwa dłużej niż minutę, ludzie przestaną go uruchamiać lokalnie i cała inwestycja idzie do kosza.</p>',
          en: '<p>Test strategy is not the question "should we test", it is "where do we spend the time budget". Every test costs twice: once when you write it, and again on every run and every repair once it turns flaky (unstable - passing one run, failing the next).</p><p>The classic pyramid (many unit tests, few E2E) has, in modern frontend, turned into the <strong>test trophy</strong>: most value comes from component tests that render real DOM and click like a user, rather than inspecting internal state.</p><pre><code>// Testing Library - test behaviour, not implementation\nrender(&lt;Modal open onClose={spy} /&gt;);\nawait user.keyboard("{Escape}");\nexpect(spy).toHaveBeenCalled();</code></pre><p>The key rule: test the contract, not the structure. A test asserting the component has a <code>chi-modal__header</code> class breaks on every refactor. A test asserting that Escape closes the modal survives three rewrites of the implementation.</p><p>A design system adds a layer a normal app does not have: <strong>visual regression</strong>. The code can be correct and the tests green while a padding changed by 4 pixels wrecks the layout in forty applications. Tools like Chromatic, or Playwright with screenshot comparison, snapshot every Storybook story and show the diff in the PR.</p><p>A time split that works in practice: 60 percent of the effort on component tests, 25 percent on pure logic (functions, token generators, validators), 10 percent on visual, 5 percent on E2E for three or four critical paths. If the unit suite takes longer than a minute, people stop running it locally and the whole investment is wasted.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principala strategia testów to dokument budżetowy, nie techniczna preferencja. Piszesz w nim, ile minut trwa pipeline, jaki procent flaky akceptujesz i kto płaci za utrzymanie. Bez tych trzech liczb dyskusja zamienia się w wojnę religijną między fanami Cypressa i Playwrighta.</p><p><strong>Kalibracja pod design system.</strong> Utrzymując bibliotekę komponentów dla kilkudziesięciu aplikacji, masz inny profil ryzyka niż zespół produktowy. Twój główny tryb awarii to nie "przycisk nie działa", tylko "przycisk działa inaczej niż wczoraj u czterdziestu konsumentów". Dlatego priorytety wyglądają tak:</p><ul><li><strong>Testy kontraktu API komponentu</strong> - snapshot publicznych propsów i eventów, generowany z typów. Zmiana wykryta w PR jest zmianą breaking, o ile nie jest opisana w changesecie.</li><li><strong>Visual regression na każdej historii</strong>, w dwóch motywach i dwóch szerokościach (360 i 1280). Koszt: przy 400 historiach to około 1600 zrzutów, 6-9 minut na maszynie CI z shardingiem na 4 workery.</li><li><strong>A11y jako test, nie jako audyt</strong> - <code>axe-core</code> na każdej historii wyłapuje 30-40 procent problemów WCAG automatycznie. Reszta wymaga człowieka i czytnika ekranu, ale ta połowa nie powinna zjadać czasu recenzenta.</li><li><strong>E2E tylko na smoke</strong>: aplikacja demo importuje paczkę z rejestru i renderuje stronę z dziesięcioma komponentami. To łapie źle spakowane exporty, brakujące pliki CSS i zepsute side effects - klasę błędów, której żaden test jednostkowy nie widzi, bo działa na źródłach.</li></ul><pre><code>// vitest.config.ts - progi, które realnie broni się w CI\ntest: {\n  coverage: {\n    thresholds: { lines: 80, branches: 70 },\n    exclude: ["**/*.stories.tsx", "**/index.ts"]\n  },\n  retry: process.env.CI ? 1 : 0\n}</code></pre><p><strong>Flaky to dług, nie niedogodność.</strong> Przy 3 procentach niestabilnych testów i suite liczącym 600 pozycji szansa, że cały przebieg przejdzie, spada praktycznie do zera. Wprowadź twardą regułę: test, który dwa razy w tygodniu padł bez zmiany kodu, zostaje oznaczony quarantine i ma właściciela z terminem. Bez tego zespół nauczy się klikać "re-run" i CI przestaje cokolwiek znaczyć.</p><p><strong>Czego nie mierzyć.</strong> Pokrycie kodu powyżej 80 procent kupuje głównie testy pisane pod metrykę. Lepszym wskaźnikiem jest <em>escape rate</em>: ile błędów wykrytych w produkcji miało szansę być złapanych przez istniejącą warstwę testów. Ta liczba, raportowana kwartalnie, przekonuje dyrektora znacznie skuteczniej niż wykres coverage.</p>',
          en: '<p>At principal level the test strategy is a budget document, not a technical preference. It states how many minutes the pipeline takes, what percentage of flakiness you accept, and who pays for maintenance. Without those three numbers the discussion degenerates into a holy war between Cypress and Playwright fans.</p><p><strong>Calibrating for a design system.</strong> Maintaining a component library for dozens of applications gives you a different risk profile than a product team. Your main failure mode is not "the button is broken", it is "the button behaves differently than yesterday across forty consumers". So the priorities look like this:</p><ul><li><strong>Component API contract tests</strong> - a snapshot of public props and events, generated from the types. A diff detected in a PR is a breaking change unless a changeset describes it.</li><li><strong>Visual regression on every story</strong>, in two themes and two widths (360 and 1280). Cost: with 400 stories that is around 1600 snapshots, 6-9 minutes on CI with sharding across 4 workers.</li><li><strong>A11y as a test, not an audit</strong> - <code>axe-core</code> on every story catches 30-40 percent of WCAG issues automatically. The rest needs a human and a screen reader, but that half should not eat reviewer time.</li><li><strong>E2E only as smoke</strong>: a demo app installs the package from the registry and renders a page with ten components. That catches broken export maps, missing CSS files and bad side effects - a class of bug no unit test sees, because unit tests run against source.</li></ul><pre><code>// vitest.config.ts - thresholds that survive contact with CI\ntest: {\n  coverage: {\n    thresholds: { lines: 80, branches: 70 },\n    exclude: ["**/*.stories.tsx", "**/index.ts"]\n  },\n  retry: process.env.CI ? 1 : 0\n}</code></pre><p><strong>Flakiness is debt, not an annoyance.</strong> At 3 percent flaky tests over a 600-test suite the chance of a fully green run drops close to zero. Set a hard rule: a test that fails twice in a week without a code change goes into quarantine with a named owner and a deadline. Without that, the team learns to hit "re-run" and CI stops meaning anything.</p><p><strong>What not to measure.</strong> Coverage above 80 percent mostly buys tests written for the metric. A better indicator is the <em>escape rate</em>: how many production bugs could have been caught by an existing test layer. Reported quarterly, that number convinces a director far more effectively than a coverage chart.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Który test najprawdopodobniej przeżyje refaktor wewnętrzny komponentu?',
            en: 'Which test is most likely to survive an internal refactor of a component?'
          },
          options: [
            { pl: 'Sprawdzający, że root ma klasę chi-modal__header', en: 'One asserting the root has the chi-modal__header class' },
            { pl: 'Sprawdzający, że Escape wywołuje onClose', en: 'One asserting that Escape triggers onClose' },
            { pl: 'Snapshot całego wyrenderowanego HTML', en: 'A snapshot of the entire rendered HTML' },
            { pl: 'Sprawdzający wartość wewnętrznego stanu isOpen', en: 'One asserting the value of internal isOpen state' }
          ],
          correct: 1,
          explain: {
            pl: 'Testuje się kontrakt widoczny dla użytkownika i konsumenta, a nie strukturę. Klasy, snapshoty HTML i stan wewnętrzny to szczegóły implementacyjne.',
            en: 'You test the contract visible to the user and the consumer, not the structure. Class names, HTML snapshots and internal state are implementation details.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w design systemie testy wizualne mają wyższy priorytet niż w zwykłej aplikacji?',
            en: 'Why does visual regression rank higher in a design system than in a normal app?'
          },
          options: [
            { pl: 'Bo są szybsze niż testy jednostkowe', en: 'Because it is faster than unit testing' },
            { pl: 'Bo zastępują testy dostępności', en: 'Because it replaces accessibility testing' },
            { pl: 'Bo zmiana o 4 piksele przechodzi wszystkie testy logiki, a rozjeżdża layout u konsumentów', en: 'Because a 4-pixel change passes every logic test yet breaks layout in consumer apps' },
            { pl: 'Bo Storybook nie pozwala na inne rodzaje testów', en: 'Because Storybook does not allow other kinds of tests' }
          ],
          correct: 2,
          explain: {
            pl: 'Główny tryb awarii biblioteki to niezamierzona zmiana wyglądu propagująca się do wszystkich konsumentów. Żaden test logiki tego nie widzi.',
            en: 'The library main failure mode is an unintended visual change propagating to every consumer. No logic test can see that.'
          }
        },
        {
          q: {
            pl: 'Suite ma 600 testów, z czego 3 procent jest niestabilnych. Co z tego wynika?',
            en: 'A suite has 600 tests, 3 percent of them flaky. What follows?'
          },
          options: [
            { pl: 'Zielony przebieg staje się praktycznie niemożliwy, więc CI traci znaczenie', en: 'A fully green run becomes practically impossible, so CI loses meaning' },
            { pl: 'Wystarczy włączyć retry i problem znika', en: 'Turning on retries makes the problem go away' },
            { pl: 'To normalny poziom, nie wymaga działania', en: 'That is a normal level and needs no action' },
            { pl: 'Trzeba usunąć testy jednostkowe i zostawić E2E', en: 'You should delete unit tests and keep only E2E' }
          ],
          correct: 0,
          explain: {
            pl: 'Przy takim odsetku prawie każdy przebieg ma czerwony element, zespół uczy się klikać re-run i sygnał z CI przestaje cokolwiek znaczyć. Kwarantanna z właścicielem i terminem jest jedynym trwałym lekarstwem.',
            en: 'At that rate almost every run has a red item, the team learns to hit re-run, and the CI signal stops meaning anything. Quarantine with a named owner and a deadline is the only durable cure.'
          }
        },
        {
          q: {
            pl: 'Dyrektor pyta, czy jakość rośnie. Który wskaźnik jest najbardziej przekonujący?',
            en: 'A director asks whether quality is improving. Which indicator is most convincing?'
          },
          options: [
            { pl: 'Pokrycie kodu wzrosło z 78 na 86 procent', en: 'Coverage went from 78 to 86 percent' },
            { pl: 'Liczba testów wzrosła o 400', en: 'The test count grew by 400' },
            { pl: 'Pipeline trwa o 2 minuty krócej', en: 'The pipeline is 2 minutes faster' },
            { pl: 'Escape rate: odsetek błędów produkcyjnych, które istniejąca warstwa testów mogła złapać', en: 'Escape rate: the share of production bugs an existing test layer could have caught' }
          ],
          correct: 3,
          explain: {
            pl: 'Escape rate łączy testy z realnym skutkiem biznesowym i pokazuje, którą warstwę warto wzmocnić. Coverage i liczba testów to metryki wysiłku, nie efektu.',
            en: 'Escape rate ties testing to real business outcomes and shows which layer to strengthen. Coverage and test counts measure effort, not effect.'
          }
        }
      ]
    },

    {
      id: 'frontend-ci-cd',
      title: { pl: 'CI/CD dla frontendu', en: 'Frontend CI/CD' },
      minutes: 13,
      terms: [
        {
          term: { pl: 'Changeset', en: 'Changeset' },
          def: {
            pl: 'Mały plik dołączany do PR-a, który deklaruje, czy zmiana jest patch, minor czy major, i skąd bierze się changelog. Wersjonowanie wynika z intencji autora, a nie z odgadywania przy release.',
            en: 'A small file added to a PR declaring whether the change is patch, minor or major, and feeding the changelog. Versioning comes from author intent instead of guesswork at release time.'
          }
        },
        {
          term: { pl: 'Canary', en: 'Canary' },
          def: {
            pl: 'Nowa wersja trafia najpierw do kilku procent ruchu i przez pół godziny porównujesz metryki błędów z baseline. Ograniczasz zasięg awarii, zanim zobaczy ją cały ruch.',
            en: 'A new version goes to a few percent of traffic first and you compare error metrics against the baseline for half an hour. It caps the blast radius before all traffic sees the failure.'
          }
        },
        {
          term: { pl: 'Rollback jako podmiana wskaźnika', en: 'Rollback as a pointer swap' },
          def: {
            pl: 'Stary build zostaje na CDN, więc cofnięcie to zmiana adresu, a nie nowy build. Dlatego rollback trwa sekundy, a normalny deploy minuty - i dlatego MTTR można mieć poniżej pięciu minut.',
            en: 'The previous build stays on the CDN, so reverting is an address change, not a rebuild. That is why rollback takes seconds while a deploy takes minutes, and why MTTR under five minutes is realistic.'
          }
        },
        {
          term: { pl: 'Required check (bramka blokująca)', en: 'Required check' },
          def: {
            pl: 'Kontrola oznaczona w ustawieniach brancha jako wymagana. Bramka, która nie blokuje mergea, nie jest bramką tylko powiadomieniem - ostrzeżenia są ignorowane po dwóch tygodniach.',
            en: 'A check marked as required in the branch settings. A gate that cannot block a merge is not a gate but a notification, and warnings get ignored within two weeks.'
          }
        },
        {
          term: { pl: 'Metryki DORA', en: 'DORA metrics' },
          def: {
            pl: 'Cztery liczby przetłumaczone na frontend: częstotliwość wydań, lead time od mergea do produkcji, change failure rate i MTTR. To język, w którym dyrektor rozumie prośbę o etat na platformę.',
            en: 'Four numbers translated to frontend: deployment frequency, lead time from merge to production, change failure rate and MTTR. The language in which a director understands a platform headcount request.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6cd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="20" y="40" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="105" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Pull request</text><text x="105" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">changeset required</text><line x1="192" y1="72" x2="228" y2="72" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="232" y="40" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="317" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Gates - 6 min</text><text x="317" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">types, tests, budget</text><line x1="404" y1="72" x2="440" y2="72" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="444" y="40" width="176" height="64" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="532" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Preview URL</text><text x="532" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">per branch, disposable</text><line x1="532" y1="106" x2="532" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="444" y="154" width="176" height="64" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="532" y="182" font-size="14" fill="var(--text)" text-anchor="middle">Canary 5 percent</text><text x="532" y="202" font-size="13" fill="var(--muted)" text-anchor="middle">30 min soak</text><line x1="442" y1="186" x2="406" y2="186" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="232" y="154" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="317" y="182" font-size="14" fill="var(--ok)" text-anchor="middle">Prod 100 percent</text><text x="317" y="202" font-size="13" fill="var(--muted)" text-anchor="middle">immutable assets</text><path d="M232 200 L120 200 L120 130" fill="none" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><text x="30" y="248" font-size="13" fill="var(--err)">rollback = repoint index.html to the previous build, 60 s</text><line x1="20" y1="272" x2="620" y2="272" stroke="var(--border)" stroke-width="2"/><text x="20" y="300" font-size="14" fill="var(--text)">Gate that actually blocks merges:</text><rect x="20" y="314" width="600" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="340" font-size="13" fill="var(--muted)">main bundle 168 kB gz / budget 170 kB - pass</text><text x="40" y="364" font-size="13" fill="var(--err)">new dependency adds 22 kB - fail, needs an explicit budget bump</text></svg>',
        caption: {
          pl: 'Ścieżka commita: bramki, preview per branch, canary i natychmiastowy rollback. Budżet rozmiaru bundla jest bramką, która naprawdę blokuje merge.',
          en: 'A commit path: gates, per-branch previews, canary and instant rollback. The bundle size budget is the gate that actually blocks merges.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden commit przechodzący przez pipeline - łącznie z bramką, która go zatrzymuje.',
          en: 'One commit walking through the pipeline - including the gate that stops it.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="75" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="75" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">commit a1f2c9 - Button: new size token</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">changeset present: minor</text><text x="40" y="274" font-size="13" fill="var(--muted)">CODEOWNERS routed the review to the design system team</text></svg>',
            label: { pl: 'PR otwarty', en: 'PR opened' },
            note: {
              pl: 'Commit ląduje w PR. Changeset i CODEOWNERS decydują, jaka wersja i kto recenzuje - zanim cokolwiek się zbuduje.',
              en: 'The commit lands in a PR. A changeset and CODEOWNERS decide the version bump and the reviewer before anything even builds.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="205" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="205" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">running 6 jobs in parallel</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--ok)">typecheck 41 s - unit 38 s - a11y 55 s - visual 4 min 10 s</text><text x="40" y="274" font-size="13" fill="var(--muted)">size-limit still running</text></svg>',
            label: { pl: 'Bramki startują', en: 'Gates running' },
            note: {
              pl: 'Wszystkie kontrole idą równolegle, nie sekwencyjnie. Czas całego etapu to najwolniejszy job, czyli tutaj testy wizualne.',
              en: 'All checks run in parallel, not in sequence. Stage time equals the slowest job, here the visual tests.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/><text x="205" y="97" font-size="14" fill="var(--err)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="205" cy="160" r="10" fill="var(--err)"/><text x="20" y="200" font-size="14" fill="var(--err)">size-limit failed - merge blocked</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--err)">core.js 192 kB gz / budget 170 kB - over by 22 kB</text><text x="40" y="274" font-size="13" fill="var(--muted)">cause: date-fns imported as a whole namespace</text></svg>',
            label: { pl: 'Bramka blokuje', en: 'A gate blocks' },
            note: {
              pl: 'Budżet rozmiaru zatrzymuje merge z konkretną przyczyną. To najtańsze miejsce, w którym da się wyłapać regresję wydajności.',
              en: 'The size budget stops the merge with a named cause. This is the cheapest place a performance regression can be caught.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="335" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="335" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">fixed with a named import - 169 kB gz</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">preview: pr-4821.ds.example.net - Storybook plus demo app</text><text x="40" y="274" font-size="13" fill="var(--muted)">designers review the real thing, not a screenshot in Figma</text></svg>',
            label: { pl: 'Preview per branch', en: 'Per-branch preview' },
            note: {
              pl: 'Po poprawce PR dostaje własny, jednorazowy URL. Recenzja designu odbywa się na działającym kodzie, a nie na obrazku.',
              en: 'After the fix the PR gets its own disposable URL. Design review happens against running code, not a picture.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/><text x="465" y="97" font-size="14" fill="var(--warn)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="465" cy="160" r="10" fill="var(--warn)"/><text x="20" y="200" font-size="14" fill="var(--text)">5 percent of sessions, 30 minute soak</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">JS error rate 0.11 vs 0.10 percent baseline - within noise</text><text x="40" y="274" font-size="13" fill="var(--muted)">LCP p75 2.3 s vs 2.3 s - no regression</text></svg>',
            label: { pl: 'Canary', en: 'Canary' },
            note: {
              pl: 'Pięć procent ruchu przez pół godziny. Porównujesz błąd JS i LCP z baseline, a nie z wrażeniem, że działa.',
              en: 'Five percent of traffic for half an hour. You compare JS error rate and LCP against a baseline, not against a feeling that it works.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/><text x="580" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Prod</text><circle cx="580" cy="160" r="10" fill="var(--ok)"/><path d="M560 180 L560 210 L120 210 L120 132" fill="none" stroke="var(--err)" stroke-width="2"/><text x="20" y="200" font-size="14" fill="var(--text)">100 percent - version 4.12.0 published</text><rect x="20" y="228" width="600" height="76" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="256" font-size="13" fill="var(--err)">rollback path stays armed: previous build is still on the CDN</text><text x="40" y="280" font-size="13" fill="var(--muted)">repoint the entry HTML, 60 s, no rebuild needed</text></svg>',
            label: { pl: 'Prod i rollback', en: 'Prod and rollback' },
            note: {
              pl: 'Sto procent ruchu, ale poprzedni build zostaje na CDN. Rollback to zmiana wskaźnika, nie nowy deploy - stąd 60 sekund zamiast 20 minut.',
              en: 'Full traffic, but the previous build stays on the CDN. Rollback is a pointer change, not a new deploy - hence 60 seconds instead of 20 minutes.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kuchnię w restauracji, gdzie każde danie przed wyjściem na salę przechodzi przez ten sam rząd kontrolerów. Pierwszy sprawdza, czy talerz jest czysty. Drugi, czy nie ma w środku czegoś, na co ktoś jest uczulony. Trzeci waży porcję, bo obiecaliśmy gościom, że będzie 300 gramów, a nie 500.</p><p>Jeśli którykolwiek kontroler powie "nie", danie wraca do kucharza. Nikt się nie obraża - to szybsze niż przeprosiny przy stoliku.</p><p>Potem jest jeszcze jedna sztuczka. Nowego dania nie podajemy od razu wszystkim. Dajemy je najpierw jednemu stolikowi na pół godziny i patrzymy, czy zjedli. Dopiero jeśli zjedli, idzie na całą salę.</p><p>A gdyby jednak coś byłoby nie tak, stara wersja dania nadal czeka na kuchni. Wystarczy przełożyć karteczkę i w minutę wszyscy dostają to, co działało wczoraj.</p>',
          en: '<p>Picture a restaurant kitchen where every dish passes the same row of inspectors before it reaches the floor. The first checks the plate is clean. The second checks there is nothing inside that someone is allergic to. The third weighs the portion, because we promised guests 300 grams, not 500.</p><p>If any inspector says no, the dish goes back to the cook. Nobody takes offence - that is faster than apologising at the table.</p><p>Then there is one more trick. A new dish does not go out to everyone at once. It goes to a single table for half an hour and we watch whether they eat it. Only if they do does it go to the whole room.</p><p>And if something is still wrong, yesterday version of the dish is still sitting in the kitchen. Move one little card and within a minute everyone gets what worked yesterday.</p>'
        },
        school: {
          pl: '<p>Pipeline CI/CD to nie skrypt buildujący paczkę, tylko lista zdań, które chcesz mieć udowodnione, zanim kod dotknie użytkownika. Każde zdanie to jeden job.</p><p>Dla biblioteki komponentów lista wygląda mniej więcej tak: typy się kompilują, testy przechodzą, dostępność nie ma nowych naruszeń, nic nie zmieniło się wizualnie bez zgody, rozmiar paczki mieści się w budżecie, a wersja jest opisana w changesecie (małe pliki opisujące, czy zmiana jest patch, minor czy major).</p><pre><code># .github/workflows/ci.yml - wszystko równolegle\njobs:\n  check:\n    strategy:\n      matrix:\n        task: [typecheck, unit, a11y, visual, size]\n    steps:\n      - run: pnpm turbo run ${{ matrix.task }}</code></pre><p>Równoległość jest kluczowa: czas etapu to czas najwolniejszego joba, a nie suma. Sekwencyjny pipeline na 12 minut po zrównolegleniu robi się sześcioma.</p><p>Druga połowa to CD, czyli dostarczanie. Trzy rzeczy zmieniają tu wszystko:</p><ul><li><strong>Preview per branch</strong> - każdy PR dostaje własny URL ze Storybookiem. Designer i product owner oglądają działający kod, a nie zrzut ekranu.</li><li><strong>Canary</strong> - nowa wersja idzie najpierw do kilku procent ruchu i przez pół godziny porównujesz metryki błędów z baseline.</li><li><strong>Rollback jako zmiana wskaźnika</strong> - stary build zostaje na CDN, więc cofnięcie to podmiana adresu, sekundy zamiast nowego builda.</li></ul><p>Zasada, którą warto zapamiętać: bramka, która nie blokuje merge, nie jest bramką, tylko powiadomieniem. Ostrzeżenia są ignorowane po dwóch tygodniach, zawsze.</p>',
          en: '<p>A CI/CD pipeline is not a script that builds a package, it is a list of statements you want proven before code touches a user. Each statement is one job.</p><p>For a component library the list looks roughly like this: types compile, tests pass, accessibility has no new violations, nothing changed visually without approval, package size fits the budget, and the version bump is described in a changeset (small files declaring whether a change is patch, minor or major).</p><pre><code># .github/workflows/ci.yml - everything in parallel\njobs:\n  check:\n    strategy:\n      matrix:\n        task: [typecheck, unit, a11y, visual, size]\n    steps:\n      - run: pnpm turbo run ${{ matrix.task }}</code></pre><p>Parallelism is the whole game: stage time is the slowest job, not the sum. A sequential 12-minute pipeline becomes six minutes once fanned out.</p><p>The other half is CD, the delivery side. Three things change everything here:</p><ul><li><strong>Per-branch previews</strong> - every PR gets its own URL with Storybook. Designers and product owners look at running code, not a screenshot.</li><li><strong>Canary</strong> - the new version goes to a few percent of traffic first, and for half an hour you compare error metrics against a baseline.</li><li><strong>Rollback as a pointer change</strong> - the old build stays on the CDN, so reverting swaps an address: seconds instead of a fresh build.</li></ul><p>One rule worth memorising: a gate that does not block the merge is not a gate, it is a notification. Warnings get ignored within two weeks, every single time.</p>'
        },
        pro: {
          pl: '<p>Pipeline jest interfejsem użytkownika Twojej platformy. Każda sekunda czekania mnoży się przez liczbę PR-ów dziennie i liczbę inżynierów, a wynik płaci organizacja. Przy 60 PR-ach dziennie skrócenie pipeline o 4 minuty to około 4 godziny odzyskanego skupienia każdego dnia.</p><p><strong>Cache i graf zadań.</strong> Turborepo albo Nx z remote cache zamienia typowy przebieg z pełnego builda w odczyt artefaktów: przy dobrze ustawionych inputach 70-85 procent zadań kończy się cache hitem w kilka sekund. Warunkiem jest higiena - jeśli do inputów wpadnie <code>Date.now()</code> albo niezablokowany lockfile, cache nigdy nie trafia i płacisz podwójnie.</p><pre><code>// turbo.json - build zależy tylko od tego, co realnie zmienia wynik\n"build": {\n  "dependsOn": ["^build"],\n  "inputs": ["src/**", "package.json", "tsconfig.json"],\n  "outputs": ["dist/**"]\n}</code></pre><p><strong>Publikacja biblioteki.</strong> Changesets plus <code>npm publish --provenance</code> daje wersjonowanie oparte o intencję autora i podpisany łańcuch pochodzenia artefaktu. Publikuj z jednego, chronionego workflow z OIDC zamiast długożyjącego tokenu w sekretach - wyciek tokenu npm w dużej firmie to incydent na poziomie SOC, nie ticket.</p><p><strong>Kanały wydawnicze.</strong> Trzy tagi wystarczą: <code>next</code> z każdego mergea do main, <code>latest</code> co dwa tygodnie, <code>lts</code> dla aplikacji, które nie mogą się ruszać częściej niż kwartalnie. Zespoły produktowe same wybierają tempo ryzyka, a Ty nie musisz negocjować każdego wydania osobno.</p><p><strong>Bramki, które realnie ratują.</strong> Poza testami warto mieć trzy: <em>size-limit</em> z twardym progiem per entry point, <em>diff API</em> (na przykład api-extractor) wykrywający zmiany publicznych typów bez majora, oraz <em>skan zależności</em> odrzucający nowe paczki bez lockfile i bez provenance. Każda z nich musi być required check w ustawieniach brancha, inaczej jest ozdobą.</p><p><strong>Metryki, które raportujesz w górę.</strong> Cztery liczby DORA przetłumaczone na frontend: częstotliwość wydań (ile razy dziennie), lead time (od mergea do produkcji), change failure rate (jaki procent wydań wymagał rollbacku) i MTTR (mediana czasu do rollbacku). Zdrowy design system w dużym telco: wydania codziennie, lead time poniżej 20 minut, CFR poniżej 10 procent, MTTR poniżej 5 minut. Te cztery liczby są językiem, w którym dyrektor rozumie, dlaczego prosisz o etat na platformę.</p>',
          en: '<p>The pipeline is the user interface of your platform. Every second of waiting multiplies by PRs per day and engineers on the org chart, and the organisation pays the bill. At 60 PRs a day, cutting four minutes off the pipeline returns roughly four hours of focus daily.</p><p><strong>Cache and the task graph.</strong> Turborepo or Nx with a remote cache turns the typical run from a full build into an artifact download: with well-defined inputs, 70-85 percent of tasks finish as cache hits within seconds. The precondition is hygiene - if <code>Date.now()</code> or an unpinned lockfile leaks into the inputs, you never hit the cache and pay twice.</p><pre><code>// turbo.json - build depends only on what actually changes the output\n"build": {\n  "dependsOn": ["^build"],\n  "inputs": ["src/**", "package.json", "tsconfig.json"],\n  "outputs": ["dist/**"]\n}</code></pre><p><strong>Publishing the library.</strong> Changesets plus <code>npm publish --provenance</code> gives you intent-based versioning and a signed provenance chain for the artifact. Publish from a single protected workflow using OIDC rather than a long-lived token in secrets - a leaked npm token at a large company is a SOC incident, not a ticket.</p><p><strong>Release channels.</strong> Three tags are enough: <code>next</code> from every merge to main, <code>latest</code> every two weeks, and <code>lts</code> for apps that cannot move more often than quarterly. Product teams pick their own risk cadence and you stop negotiating each release individually.</p><p><strong>Gates that genuinely save you.</strong> Beyond tests, three are worth having: <em>size-limit</em> with a hard threshold per entry point, an <em>API diff</em> (api-extractor, for example) catching public type changes without a major bump, and a <em>dependency scan</em> rejecting new packages without a lockfile entry or provenance. Each must be a required check in branch protection, otherwise it is decoration.</p><p><strong>Metrics you report upward.</strong> The four DORA numbers translated to frontend: deployment frequency (times per day), lead time (merge to production), change failure rate (share of releases needing a rollback) and MTTR (median time to roll back). A healthy design system at a large telco: daily releases, lead time under 20 minutes, CFR under 10 percent, MTTR under 5 minutes. Those four numbers are the language in which a director understands why you are asking for a platform headcount.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Pipeline trwa 12 minut sekwencyjnie: typy 2, unit 2, a11y 1, wizualne 5, rozmiar 2. Ile potrwa po zrównolegleniu?',
            en: 'A sequential pipeline takes 12 minutes: types 2, unit 2, a11y 1, visual 5, size 2. How long after fanning out?'
          },
          options: [
            { pl: 'Około 12 minut, równoległość nic nie zmienia', en: 'About 12 minutes, parallelism changes nothing' },
            { pl: 'Około 5 minut, czyli tyle co najwolniejszy job', en: 'About 5 minutes, the slowest job' },
            { pl: 'Około 2 minut, czyli średnia', en: 'About 2 minutes, the average' },
            { pl: 'Około 6 minut, czyli połowa sumy', en: 'About 6 minutes, half the sum' }
          ],
          correct: 1,
          explain: {
            pl: 'Przy równoległych jobach czas etapu to czas najdłuższego z nich. Dlatego optymalizację warto kierować na najwolniejszy job, a nie na sumę.',
            en: 'With parallel jobs the stage time equals the longest job. That is why optimisation should target the slowest job, not the total.'
          }
        },
        {
          q: {
            pl: 'Dlaczego rollback zajmuje 60 sekund, a nowy deploy 20 minut?',
            en: 'Why does a rollback take 60 seconds while a fresh deploy takes 20 minutes?'
          },
          options: [
            { pl: 'Bo rollback pomija testy', en: 'Because rollback skips the tests' },
            { pl: 'Bo CDN ma szybszy cache dla starych plików', en: 'Because the CDN caches older files faster' },
            { pl: 'Bo poprzedni build już leży na CDN i cofnięcie to zmiana wskaźnika, a nie budowanie', en: 'Because the previous build is already on the CDN, so reverting is a pointer change, not a build' },
            { pl: 'Bo rollback dotyczy tylko 5 procent ruchu', en: 'Because a rollback only affects 5 percent of traffic' }
          ],
          correct: 2,
          explain: {
            pl: 'Niemutowalne, wersjonowane artefakty sprawiają, że wszystkie stare wersje wciąż istnieją. Cofasz się, przestawiając wejście na poprzedni build.',
            en: 'Immutable versioned artifacts mean every old version still exists. You revert by repointing the entry at the previous build.'
          }
        },
        {
          q: {
            pl: 'Zespół dodaje kontrolę rozmiaru bundla, ale ustawia ją jako ostrzeżenie zamiast blokady. Co się stanie?',
            en: 'A team adds a bundle size check but configures it as a warning instead of a blocker. What happens?'
          },
          options: [
            { pl: 'Ostrzeżenie zostanie zignorowane w ciągu kilku tygodni i regresje będą przechodzić', en: 'The warning gets ignored within weeks and regressions sail through' },
            { pl: 'Ostrzeżenia działają tak samo jak blokady, tylko łagodniej', en: 'Warnings work the same as blockers, just more gently' },
            { pl: 'Bundle sam się zoptymalizuje przy następnym buildzie', en: 'The bundle optimises itself on the next build' },
            { pl: 'Ostrzeżenie zablokuje deploy na produkcję', en: 'The warning will block the production deploy' }
          ],
          correct: 0,
          explain: {
            pl: 'Bramka, która nie blokuje merge, jest powiadomieniem. Jeśli progu naprawdę nie da się utrzymać, lepiej podnieść go świadomie w PR niż zostawić ostrzeżenie.',
            en: 'A gate that does not block the merge is a notification. If the threshold truly cannot hold, raise it deliberately in a PR rather than leaving a warning.'
          }
        },
        {
          q: {
            pl: 'Która praktyka publikowania biblioteki najlepiej ogranicza ryzyko supply chain w dużej firmie?',
            en: 'Which publishing practice best limits supply chain risk at a large company?'
          },
          options: [
            { pl: 'Publikowanie z laptopa maintainera z osobistym tokenem npm', en: 'Publishing from the maintainer laptop with a personal npm token' },
            { pl: 'Publikowanie z jednego chronionego workflow przez OIDC, z provenance', en: 'Publishing from one protected workflow via OIDC, with provenance' },
            { pl: 'Publikowanie ręcznie tylko w piątki, po przeglądzie', en: 'Publishing manually on Fridays only, after review' },
            { pl: 'Trzymanie tokenu npm w zmiennej środowiskowej wszystkich repozytoriów', en: 'Storing the npm token in an env var across all repositories' }
          ],
          correct: 1,
          explain: {
            pl: 'OIDC eliminuje długożyjący sekret, a provenance daje podpisany łańcuch: wiadomo, który commit i który workflow wyprodukował artefakt.',
            en: 'OIDC removes the long-lived secret and provenance gives a signed chain: you can tell which commit and which workflow produced the artifact.'
          }
        }
      ]
    },

    {
      id: 'error-observability',
      title: { pl: 'Obserwowalność błędów', en: 'Error observability' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Source mapy', en: 'Source maps' },
          def: {
            pl: 'Pliki mapujące zminifikowany stack (<code>main.9f2a.js:1:48211</code>) na <code>Dropdown.tsx:82</code>. Wysyłasz je z CI do narzędzia błędów i nie publikujesz na produkcji.',
            en: 'Files mapping a minified stack (<code>main.9f2a.js:1:48211</code>) back to <code>Dropdown.tsx:82</code>. You upload them from CI to the error tool and never publish them in production.'
          }
        },
        {
          term: { pl: 'Breadcrumbs', en: 'Breadcrumbs' },
          def: {
            pl: 'Ślad ostatnich akcji użytkownika i zdarzeń aplikacji dołączany do raportu błędu. Bez niego masz komunikat bez historii i nie odtworzysz ścieżki, która doprowadziła do awarii.',
            en: 'The trail of recent user actions and app events attached to an error report. Without it you have a message with no history and cannot reconstruct the path to the failure.'
          }
        },
        {
          term: { pl: 'Sampling', en: 'Sampling' },
          def: {
            pl: 'Błędy zbierasz w stu procentach, tracing przy 5-10 procentach, session replay przy 1 procencie sesji plus wszystkie sesje z błędem. Przy 20 mln odsłon nieprzemyślany sampling to kilkanaście tysięcy dolarów miesięcznie.',
            en: 'Errors at 100 percent, tracing at 5-10 percent, session replay at 1 percent of sessions plus every session with an error. At 20M page views careless sampling costs tens of thousands of dollars a month.'
          }
        },
        {
          term: { pl: 'beforeSend i scrubbing PII', en: 'beforeSend and PII scrubbing' },
          def: {
            pl: 'Hook czyszczący zdarzenie przed wysłaniem: numer telefonu w URL, adres w formularzu, identyfikator abonenta w breadcrumb. W zasięgu RODO logi frontendu są danymi osobowymi i czyści się je u siebie, nie u dostawcy.',
            en: 'A hook that scrubs the event before it leaves: a phone number in the URL, an address in a form, a subscriber id in a breadcrumb. Under GDPR frontend logs are personal data and you scrub them locally, not at the vendor.'
          }
        },
        {
          term: { pl: 'Budżet błędów i SLO', en: 'Error budget and SLO' },
          def: {
            pl: 'Cel typu 99,5 procent sesji bez nieobsłużonego wyjątku w skali tygodnia. Gdy budżet się wyczerpie, priorytetem tygodnia staje się stabilność - to zamienia opinię o jakości w regułę działającą pod presją deadline.',
            en: 'A target such as 99.5 percent of weekly sessions without an unhandled exception. When the budget is spent, stability becomes the week priority, turning quality opinions into a rule that holds under deadline pressure.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6ob-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="20" y="46" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="105" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Browser</text><text x="105" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">minified stack, no names</text><line x1="192" y1="81" x2="228" y2="81" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="232" y="46" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="317" y="74" font-size="14" fill="var(--text)" text-anchor="middle">SDK</text><text x="317" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">release, user, breadcrumbs</text><line x1="404" y1="81" x2="440" y2="81" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="444" y="46" width="176" height="70" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="532" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Sentry issue</text><text x="532" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">grouped by fingerprint</text><line x1="532" y1="118" x2="532" y2="158" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="444" y="162" width="176" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="532" y="190" font-size="14" fill="var(--text)" text-anchor="middle">Alert rule</text><text x="532" y="212" font-size="13" fill="var(--muted)" text-anchor="middle">new in latest release</text><line x1="442" y1="197" x2="406" y2="197" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="232" y="162" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="317" y="190" font-size="14" fill="var(--ok)" text-anchor="middle">Owning team</text><text x="317" y="212" font-size="13" fill="var(--muted)" text-anchor="middle">routed by component</text><rect x="20" y="266" width="600" height="112" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="294" font-size="14" fill="var(--text)">Without a source map upload this whole chain is useless:</text><text x="40" y="320" font-size="13" fill="var(--err)">TypeError: n is not a function - at t (main.9f2a.js:1:48211)</text><text x="40" y="346" font-size="13" fill="var(--ok)">TypeError: onSelect is not a function - Dropdown.tsx:82</text><text x="40" y="370" font-size="13" fill="var(--muted)">same event, one has a name and a line you can act on</text></svg>',
        caption: {
          pl: 'Droga błędu: przeglądarka, SDK, grupowanie, alert i właściciel. Bez wgranych source map cały łańcuch kończy się nieczytelnym stackiem.',
          en: 'The path of an error: browser, SDK, grouping, alert, owner. Without uploaded source maps the whole chain ends in an unreadable stack.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Życie jednego błędu: od nieczytelnego stacku po alert u właściwego zespołu.',
          en: 'The life of one error: from an unreadable stack to an alert at the right team.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/><text x="85" y="76" font-size="14" fill="var(--err)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">18:42 - a user clicks a filter in the billing app</text><text x="40" y="204" font-size="13" fill="var(--err)">TypeError: n is not a function</text><text x="40" y="228" font-size="13" fill="var(--muted)">at t (main.9f2a.js:1:48211)</text><text x="40" y="252" font-size="13" fill="var(--muted)">nobody sees it - the user just reloads the page</text><text x="40" y="280" font-size="13" fill="var(--muted)">this is the default state of most frontends</text></svg>',
            label: { pl: 'Błąd w przeglądarce', en: 'The error in the browser' },
            note: {
              pl: 'Błąd wystąpił u użytkownika i zniknął razem z zakładką. Bez telemetrii nie istnieje w żadnym systemie.',
              en: 'The error happened in a user session and vanished with the tab. Without telemetry it exists in no system at all.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="245" y="76" font-size="14" fill="var(--accent)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">the SDK attaches context and applies the source map</text><text x="40" y="204" font-size="13" fill="var(--ok)">TypeError: onSelect is not a function - Dropdown.tsx:82</text><text x="40" y="228" font-size="13" fill="var(--muted)">release 4.11.3 - design-system 4.11.3 - Chrome 141</text><text x="40" y="252" font-size="13" fill="var(--muted)">breadcrumbs: route change, 2 clicks, one failed fetch</text><text x="40" y="280" font-size="13" fill="var(--muted)">PII scrubbed before the payload leaves the page</text></svg>',
            label: { pl: 'Kontekst i source mapy', en: 'Context and source maps' },
            note: {
              pl: 'Wersja releasu, breadcrumbs i source mapy zamieniają szum w konkretną linię kodu. Bez tego reszta łańcucha nie ma sensu.',
              en: 'Release version, breadcrumbs and source maps turn noise into a concrete line of code. Without them the rest of the chain is pointless.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="3"/><text x="405" y="76" font-size="14" fill="var(--accent2)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">3400 events collapse into ONE issue by fingerprint</text><text x="40" y="204" font-size="13" fill="var(--muted)">users affected: 212 - sessions: 3400 - first seen: 18:42</text><text x="40" y="228" font-size="13" fill="var(--muted)">98 percent of events come from design-system 4.11.3</text><text x="40" y="252" font-size="13" fill="var(--muted)">6 consumer apps affected, all upgraded this morning</text><text x="40" y="280" font-size="13" fill="var(--muted)">grouping is what makes the volume readable</text></svg>',
            label: { pl: 'Grupowanie', en: 'Grouping' },
            note: {
              pl: 'Tysiące zdarzeń składają się w jedno zgłoszenie. Rozkład po wersjach od razu wskazuje winowajcę: konkretne wydanie biblioteki.',
              en: 'Thousands of events collapse into one issue. The version breakdown immediately names the culprit: one library release.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/><text x="560" y="76" font-size="14" fill="var(--warn)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">alert rule: new issue in the latest release, 50 users in 5 min</text><text x="40" y="204" font-size="13" fill="var(--muted)">routed by component path to the design system on-call</text><text x="40" y="228" font-size="13" fill="var(--muted)">18:49 - 7 minutes from first event to a human</text><text x="40" y="252" font-size="13" fill="var(--muted)">no page for issues older than the current release</text><text x="40" y="280" font-size="13" fill="var(--muted)">precision matters more than recall for paging</text></svg>',
            label: { pl: 'Alert do właściciela', en: 'Alert to the owner' },
            note: {
              pl: 'Reguła alertu jest wąska celowo: tylko nowe zgłoszenia w najnowszym wydaniu. Alert, który budzi bez powodu, przestaje być czytany.',
              en: 'The alert rule is deliberately narrow: only new issues in the newest release. An alert that wakes people for nothing stops being read.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/><text x="560" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">18:53 - rollback to 4.11.2, error rate back to baseline</text><text x="40" y="204" font-size="13" fill="var(--muted)">19:40 - real fix shipped as 4.11.4, issue marked resolved</text><text x="40" y="228" font-size="13" fill="var(--muted)">a regression test now covers the missing onSelect guard</text><text x="40" y="252" font-size="13" fill="var(--muted)">the issue auto-reopens if the fingerprint returns</text><text x="40" y="280" font-size="13" fill="var(--muted)">MTTR 11 min - the number you report, not the anecdote</text></svg>',
            label: { pl: 'Naprawa i domknięcie pętli', en: 'Fix and closing the loop' },
            note: {
              pl: 'Najpierw rollback, potem prawdziwa naprawa i test regresyjny. Zgłoszenie samo się otworzy, jeśli ten sam fingerprint wróci.',
              en: 'Rollback first, then the real fix plus a regression test. The issue reopens itself if the same fingerprint comes back.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że prowadzisz sklep, ale nie stoisz w nim. Klienci przychodzą, czasem coś się psuje - drzwi się zacinają, kasa nie drukuje paragonu - a Ty dowiadujesz się o tym tylko wtedy, gdy ktoś wyjątkowo uparty do Ciebie zadzwoni. Większość ludzi po prostu wychodzi i nie wraca.</p><p>Obserwowalność to zainstalowanie w sklepie małego pomocnika, który za każdym razem, gdy coś pójdzie źle, zapisuje karteczkę: co się stało, o której, przy których drzwiach i co klient robił chwilę wcześniej.</p><p>Potem pomocnik robi jeszcze dwie mądre rzeczy. Po pierwsze, składa wszystkie karteczki o tych samych zacinających się drzwiach w jeden stosik, żeby nie utonąć w papierze. Po drugie, jeśli w pięć minut uzbiera się pięćdziesiąt takich karteczek, dzwoni do Ciebie od razu, a nie na koniec miesiąca.</p>',
          en: '<p>Imagine you own a shop but you are never in it. Customers come in, sometimes things break - a door jams, the till will not print a receipt - and you only hear about it when someone unusually stubborn calls you. Most people just leave and never come back.</p><p>Observability is putting a small helper in the shop who, every time something goes wrong, writes a note: what happened, at what time, at which door, and what the customer was doing a moment earlier.</p><p>Then the helper does two more clever things. First, it stacks every note about the same jamming door into one pile so you do not drown in paper. Second, if fifty such notes pile up within five minutes, it calls you straight away rather than at the end of the month.</p>'
        },
        school: {
          pl: '<p>Frontend to jedyna część systemu, która działa na cudzym komputerze. Nie masz tam logów serwera ani dostępu do konsoli. Jeśli nie wyślesz sobie informacji o błędzie, ta informacja przepada razem z zamkniętą zakładką.</p><p>Minimalny sensowny zestaw składa się z czterech elementów.</p><ul><li><strong>Przechwytywanie</strong> - SDK (np. Sentry) podpina się pod <code>window.onerror</code>, <code>unhandledrejection</code> i granice błędów w frameworku.</li><li><strong>Kontekst</strong> - sam komunikat nie wystarczy. Potrzebujesz wersji releasu, wersji biblioteki, przeglądarki i breadcrumbs, czyli śladu ostatnich akcji użytkownika.</li><li><strong>Source mapy</strong> - bez nich stack wygląda tak: <code>at t (main.9f2a.js:1:48211)</code>. Po wgraniu source map ten sam błąd to <code>Dropdown.tsx:82</code>. Mapy wysyłasz z CI i nie publikujesz ich na produkcji.</li><li><strong>Grupowanie i alerty</strong> - trzy tysiące zdarzeń to jedno zgłoszenie, a alert odpala się tylko wtedy, gdy zgłoszenie jest nowe i dotyczy najnowszego wydania.</li></ul><pre><code>Sentry.init({\n  release: "design-system@" + VERSION,\n  tracesSampleRate: 0.1,\n  beforeSend: (e) =&gt; scrubPii(e)\n});</code></pre><p>Osobna, równie ważna warstwa to <strong>RUM</strong> (Real User Monitoring - pomiar u prawdziwych użytkowników). Błędy mówią, co pękło. RUM mówi, co jest wolne u ludzi na starszych telefonach w gorszej sieci, czego nigdy nie zobaczysz na swoim laptopie.</p><p>Zasada praktyczna: alert, który odpala się codziennie i nikt nic z nim nie robi, jest gorszy niż brak alertu, bo uczy zespół ignorowania powiadomień.</p>',
          en: '<p>The frontend is the only part of the system that runs on somebody else computer. There are no server logs there and no console access. If you do not send the error information to yourself, it disappears along with the closed tab.</p><p>A minimum sensible setup has four parts.</p><ul><li><strong>Capture</strong> - an SDK (Sentry, for example) hooks into <code>window.onerror</code>, <code>unhandledrejection</code> and the framework error boundaries.</li><li><strong>Context</strong> - the message alone is not enough. You need the release version, the library version, the browser and breadcrumbs, meaning a trail of the last user actions.</li><li><strong>Source maps</strong> - without them a stack reads <code>at t (main.9f2a.js:1:48211)</code>. With maps uploaded, the same error is <code>Dropdown.tsx:82</code>. Upload them from CI and never publish them to production.</li><li><strong>Grouping and alerts</strong> - three thousand events become one issue, and the alert only fires when the issue is new and belongs to the latest release.</li></ul><pre><code>Sentry.init({\n  release: "design-system@" + VERSION,\n  tracesSampleRate: 0.1,\n  beforeSend: (e) =&gt; scrubPii(e)\n});</code></pre><p>A separate and equally important layer is <strong>RUM</strong> (Real User Monitoring). Errors tell you what broke. RUM tells you what is slow for people on older phones and worse networks - something you will never see on your laptop.</p><p>A practical rule: an alert that fires daily and that nobody acts on is worse than no alert, because it trains the team to ignore notifications.</p>'
        },
        pro: {
          pl: '<p>Utrzymując design system, jesteś w nietypowej pozycji: błędy z Twojego kodu występują w cudzych aplikacjach, na cudzych projektach Sentry, w cudzych budżetach. Sama instrumentacja nie wystarczy - potrzebujesz sposobu, by zobaczyć łącznie to, co dzieje się u czterdziestu konsumentów.</p><p><strong>Wzorzec, który działa.</strong> Biblioteka nie inicjalizuje własnego klienta telemetrii (dwa klienty w jednej stronie to podwójne zdarzenia i wojna o <code>window.onerror</code>). Zamiast tego udostępnia cienkie API zdarzeń, które aplikacja podpina pod swój istniejący klient, a Ty dostajesz zagregowany widok przez tagi:</p><pre><code>// w bibliotece: nie znasz dostawcy telemetrii\nexport function onDsError(handler) { sinks.push(handler); }\n\n// w aplikacji konsumenta\nonDsError((e) =&gt; Sentry.captureException(e.error, {\n  tags: { ds_version: e.dsVersion, ds_component: e.component }\n}));</code></pre><p>Tagi <code>ds_component</code> i <code>ds_version</code> są całą wartością tego rozwiązania: pozwalają zapytać "ile błędów pochodzi z Dropdown w 4.11.x we wszystkich aplikacjach" i skierować alert do właściciela komponentu, nie do zespołu produktowego, który tylko go użył.</p><p><strong>Sampling i koszt.</strong> Błędy zbieraj w stu procentach, tracing przy 5-10 procentach, session replay przy 1 procencie sesji plus 100 procent sesji z błędem. Przy 20 milionach odsłon miesięcznie w dużym telco nieprzemyślany sampling zamienia się w rachunek rzędu kilkunastu tysięcy dolarów miesięcznie za dane, których nikt nie czyta. Ustaw także <code>ignoreErrors</code> na klasyczne śmieci: <code>ResizeObserver loop limit exceeded</code>, błędy z rozszerzeń przeglądarki, <code>Non-Error promise rejection</code> z third party.</p><p><strong>Prywatność.</strong> W telco w zasięgu RODO logi frontendu to dane osobowe. Numer telefonu w URL, adres w formularzu, identyfikator abonenta w breadcrumb - wszystko to musi być wycięte w <code>beforeSend</code>, a nie po stronie dostawcy. Session replay włączasz z maskowaniem domyślnie włączonym i z jawną zgodą prawnika, nie inaczej.</p><p><strong>SLO zamiast wykresów.</strong> Ustal budżet błędów: na przykład 99,5 procent sesji bez nieobsłużonego wyjątku w skali tygodnia. Gdy budżet się wyczerpie, priorytetem tygodnia staje się stabilność, a nie nowe funkcje. To jedyna znana mi konstrukcja, która zamienia dyskusję o jakości z opinii w regułę, która obowiązuje także wtedy, gdy jest presja na deadline.</p>',
          en: '<p>Maintaining a design system puts you in an unusual position: errors from your code happen in other people applications, in other people Sentry projects, on other people budgets. Instrumentation alone is not enough - you need a way to see, in aggregate, what is happening across forty consumers.</p><p><strong>The pattern that works.</strong> The library does not initialise its own telemetry client (two clients on one page means duplicated events and a fight over <code>window.onerror</code>). Instead it exposes a thin event API the app wires into its existing client, and you get the aggregate view through tags:</p><pre><code>// in the library: you do not know the telemetry vendor\nexport function onDsError(handler) { sinks.push(handler); }\n\n// in the consumer app\nonDsError((e) =&gt; Sentry.captureException(e.error, {\n  tags: { ds_version: e.dsVersion, ds_component: e.component }\n}));</code></pre><p>The <code>ds_component</code> and <code>ds_version</code> tags are the entire value here: they let you ask "how many errors come from Dropdown in 4.11.x across all apps" and route the alert to the component owner rather than to a product team that merely used it.</p><p><strong>Sampling and cost.</strong> Capture errors at 100 percent, tracing at 5-10 percent, session replay at 1 percent of sessions plus 100 percent of sessions containing an error. At 20 million monthly page views in a large telco, careless sampling turns into a bill in the low tens of thousands of dollars a month for data nobody reads. Also set <code>ignoreErrors</code> for the classic garbage: <code>ResizeObserver loop limit exceeded</code>, browser extension errors, third-party <code>Non-Error promise rejection</code>.</p><p><strong>Privacy.</strong> In a GDPR-scoped telco, frontend logs are personal data. A phone number in a URL, an address in a form, a subscriber id in a breadcrumb - all of that must be stripped in <code>beforeSend</code>, on your side, not at the vendor. Session replay ships with masking on by default and with explicit legal sign-off, never otherwise.</p><p><strong>SLOs instead of dashboards.</strong> Set an error budget: for instance 99.5 percent of weekly sessions free of an unhandled exception. When the budget is spent, stability becomes the priority for the week instead of new features. That is the only construct I know that turns quality from an opinion into a rule that still holds when a deadline is pressing.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego bez wgranych source map raport błędu jest niemal bezużyteczny?',
            en: 'Why is an error report nearly useless without uploaded source maps?'
          },
          options: [
            { pl: 'Bo stack pokazuje zminifikowane nazwy i offsety w jednej linii bundla', en: 'Because the stack shows minified names and offsets in a single bundle line' },
            { pl: 'Bo bez map SDK nie wysyła żadnych zdarzeń', en: 'Because without maps the SDK sends no events at all' },
            { pl: 'Bo mapy są potrzebne do grupowania po użytkownikach', en: 'Because maps are needed to group by user' },
            { pl: 'Bo przeglądarki blokują raportowanie bez map', en: 'Because browsers block reporting without maps' }
          ],
          correct: 0,
          explain: {
            pl: 'Mapy tłumaczą pozycję w zminifikowanym pliku na plik i linię źródłową. Bez nich masz komunikat bez adresu, więc nie wiesz, gdzie szukać.',
            en: 'Maps translate a position in the minified file into a source file and line. Without them you have a message with no address, so nowhere to look.'
          }
        },
        {
          q: {
            pl: 'Biblioteka komponentów chce zbierać własną telemetrię błędów w aplikacjach konsumentów. Co jest najlepszym rozwiązaniem?',
            en: 'A component library wants its own error telemetry inside consumer apps. What is the best approach?'
          },
          options: [
            { pl: 'Zainicjalizować własnego klienta Sentry wewnątrz biblioteki', en: 'Initialise its own Sentry client inside the library' },
            { pl: 'Podpiąć własny handler pod window.onerror w bibliotece', en: 'Attach its own window.onerror handler in the library' },
            { pl: 'Wystawić cienkie API zdarzeń, które aplikacja podpina pod swojego klienta, plus tagi ds_component i ds_version', en: 'Expose a thin event API the app wires into its own client, plus ds_component and ds_version tags' },
            { pl: 'Nie zbierać nic i polegać na zgłaszaniu błędów przez zespoły', en: 'Collect nothing and rely on teams reporting bugs' }
          ],
          correct: 2,
          explain: {
            pl: 'Drugi klient duplikuje zdarzenia i walczy o globalne handlery. Cienki interfejs plus tagi daje zagregowany widok bez przejmowania kontroli nad stroną konsumenta.',
            en: 'A second client duplicates events and fights over global handlers. A thin interface plus tags gives the aggregate view without seizing control of the consumer page.'
          }
        },
        {
          q: {
            pl: 'Która konfiguracja samplingu jest rozsądna przy 20 milionach odsłon miesięcznie?',
            en: 'Which sampling setup is sensible at 20 million monthly page views?'
          },
          options: [
            { pl: 'Błędy 100 procent, tracing 5-10 procent, replay 1 procent plus wszystkie sesje z błędem', en: 'Errors 100 percent, tracing 5-10 percent, replay 1 percent plus all sessions with an error' },
            { pl: 'Wszystko po 100 procent, dane zawsze się przydają', en: 'Everything at 100 percent, data always comes in handy' },
            { pl: 'Błędy 10 procent, reszta wyłączona', en: 'Errors at 10 percent, everything else off' },
            { pl: 'Replay 100 procent, błędy 1 procent', en: 'Replay 100 percent, errors 1 percent' }
          ],
          correct: 0,
          explain: {
            pl: 'Błędów nie samplujesz, bo rzadkie awarie są najciekawsze. Tracing i replay samplujesz agresywnie, bo to one generują rachunek - z wyjątkiem sesji, w których coś pękło.',
            en: 'You never sample errors, because rare failures are the interesting ones. Tracing and replay get sampled hard, since they drive the bill - except for sessions where something broke.'
          }
        },
        {
          q: {
            pl: 'Po co ustawiać SLO typu 99,5 procent sesji bez nieobsłużonego wyjątku?',
            en: 'Why set an SLO such as 99.5 percent of sessions free of an unhandled exception?'
          },
          options: [
            { pl: 'Żeby mieć ładny wykres dla zarządu', en: 'To have a nice chart for management' },
            { pl: 'Żeby wyczerpany budżet błędów automatycznie zmienił priorytet zespołu na stabilność', en: 'So that a spent error budget automatically shifts the team priority to stability' },
            { pl: 'Żeby ograniczyć koszty narzędzia do monitoringu', en: 'To reduce the cost of the monitoring tool' },
            { pl: 'Żeby zastąpić testy jednostkowe pomiarem produkcyjnym', en: 'To replace unit tests with production measurement' }
          ],
          correct: 1,
          explain: {
            pl: 'SLO z budżetem błędów zamienia jakość z opinii w regułę, która obowiązuje także pod presją deadline. To jego jedyna prawdziwa funkcja.',
            en: 'An SLO with an error budget turns quality from an opinion into a rule that holds even under deadline pressure. That is its one real function.'
          }
        }
      ]
    },

    {
      id: 'frontend-security',
      title: { pl: 'Bezpieczeństwo frontendu', en: 'Frontend security' },
      minutes: 13,
      terms: [
        {
          term: { pl: 'XSS (Cross-Site Scripting)', en: 'XSS (Cross-Site Scripting)' },
          def: {
            pl: 'Wykonanie cudzego skryptu na Twojej stronie przez dane wstrzyknięte do HTML. W bibliotece komponentów klasyczny wektor to prop renderowany przez <code>v-html</code> albo <code>dangerouslySetInnerHTML</code>.',
            en: 'Someone else script running on your page through data injected into HTML. In a component library the classic vector is a prop rendered through <code>v-html</code> or <code>dangerouslySetInnerHTML</code>.'
          }
        },
        {
          term: { pl: 'Bezpieczne domyślne API', en: 'Safe-by-default API' },
          def: {
            pl: 'Niebezpieczne musi być trudne i widoczne: tekst domyślnie, a HTML tylko przez jawnie nazwany prop <code>dangerouslySetHtml</code> z ostrzeżeniem w typach i regułą ESLint wymuszającą przegląd.',
            en: 'Unsafe must be hard and visible: text by default, HTML only through an explicitly named <code>dangerouslySetHtml</code> prop with a warning in the types and an ESLint rule forcing review.'
          }
        },
        {
          term: { pl: 'CSP (Content Security Policy)', en: 'CSP (Content Security Policy)' },
          def: {
            pl: 'Nagłówek mówiący przeglądarce, skąd wolno ładować i wykonywać skrypty. Jeśli polityka zawiera <code>unsafe-inline</code>, praktycznie jej nie ma - to właśnie inline jest wektorem XSS.',
            en: 'A header telling the browser where scripts may be loaded and executed from. A policy containing <code>unsafe-inline</code> is effectively no policy, since inline is the XSS vector.'
          }
        },
        {
          term: { pl: 'Nonce i strict-dynamic', en: 'Nonce and strict-dynamic' },
          def: {
            pl: 'Jednorazowy token generowany per żądanie, który autoryzuje konkretny skrypt inline; <code>strict-dynamic</code> rozciąga zaufanie na skrypty przez niego ładowane. Dla SPA na CDN alternatywą są hashe liczone w buildzie.',
            en: 'A per-request one-time token that authorises a specific inline script; <code>strict-dynamic</code> extends that trust to scripts it loads. For a CDN-hosted SPA the alternative is build-time hashes.'
          }
        },
        {
          term: { pl: 'Kwarantanna zależności', en: 'Dependency quarantine' },
          def: {
            pl: 'Proxy rejestru (Artifactory, Verdaccio) wstrzymujące nowe wersje na 48-72 godziny, plus <code>ignore-scripts</code>, wymóg provenance i dwa zatwierdzenia do publikacji. Tańsze niż jakikolwiek skaner przy przejęciu konta maintainera.',
            en: 'A registry proxy (Artifactory, Verdaccio) holding new versions for 48-72 hours, plus <code>ignore-scripts</code>, a provenance requirement and two approvals to publish. Cheaper than any scanner when a maintainer account is hijacked.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6sec-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--err)"/></marker></defs><text x="20" y="28" font-size="14" fill="var(--muted)">attack path</text><text x="380" y="28" font-size="14" fill="var(--muted)">control that stops it</text><rect x="20" y="42" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="68" font-size="14" fill="var(--text)">User content into innerHTML</text><text x="40" y="90" font-size="13" fill="var(--muted)">a tooltip that renders raw HTML</text><line x1="344" y1="75" x2="376" y2="75" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="42" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="68" font-size="14" fill="var(--ok)">Text nodes by default</text><text x="400" y="90" font-size="13" fill="var(--muted)">opt-in HTML plus sanitizer</text><rect x="20" y="124" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="150" font-size="14" fill="var(--text)">Third-party tag manager script</text><text x="40" y="172" font-size="13" fill="var(--muted)">marketing adds it without review</text><line x1="344" y1="157" x2="376" y2="157" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="124" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="150" font-size="14" fill="var(--ok)">CSP with nonces</text><text x="400" y="172" font-size="13" fill="var(--muted)">strict-dynamic, no unsafe-inline</text><rect x="20" y="206" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="232" font-size="14" fill="var(--text)">Compromised npm dependency</text><text x="40" y="254" font-size="13" fill="var(--muted)">postinstall script, minor bump</text><line x1="344" y1="239" x2="376" y2="239" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="206" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="232" font-size="14" fill="var(--ok)">Lockfile, provenance</text><text x="400" y="254" font-size="13" fill="var(--muted)">ignore-scripts, internal registry</text><rect x="20" y="288" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="314" font-size="14" fill="var(--text)">Token in localStorage</text><text x="40" y="336" font-size="13" fill="var(--muted)">readable by any injected script</text><line x1="344" y1="321" x2="376" y2="321" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="288" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="314" font-size="14" fill="var(--ok)">HttpOnly SameSite cookie</text><text x="400" y="336" font-size="13" fill="var(--muted)">JS cannot read it at all</text><text x="20" y="390" font-size="13" fill="var(--muted)">Every control above is cheap to add before launch and expensive to retrofit after.</text></svg>',
        caption: {
          pl: 'Cztery typowe drogi ataku na frontend i kontrola, która każdą z nich zamyka. Każda jest tania przed startem i droga do wprowadzenia później.',
          en: 'Four typical frontend attack paths and the control that closes each one. Every one is cheap before launch and expensive to retrofit.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie tablicę ogłoszeń w bloku. Każdy może przypiąć karteczkę. Ktoś złośliwy przypina karteczkę, na której pisze: "Uwaga, nowa zasada: zostaw klucze u dozorcy". Ludzie czytają i robią to, co tam napisano, bo tablica wygląda oficjalnie.</p><p>Tak działa najczęstszy atak na strony: ktoś wkleja swój tekst tam, gdzie strona spodziewa się zwykłego napisu, a przeglądarka traktuje to jak instrukcje.</p><p>Są trzy proste obrony. Pierwsza: tablica przyjmuje tylko zwykły tekst, nigdy instrukcji - karteczka może coś mówić, ale nikt jej nie wykonuje. Druga: przy wejściu wisi lista, kto w ogóle może coś przypinać, i wszystko spoza listy jest zdejmowane. Trzecia: klucze nie leżą w skrzynce, do której każdy sięga, tylko u kogoś, kto nie oddaje ich obcym, nawet jeśli ładnie proszą.</p>',
          en: '<p>Picture a noticeboard in an apartment block. Anyone can pin a note. Someone malicious pins one saying: "New rule: leave your keys with the caretaker". People read it and do what it says, because the board looks official.</p><p>That is how the most common attack on websites works: someone pastes their text where the page expected an ordinary label, and the browser treats it as instructions.</p><p>There are three simple defences. First: the board only accepts plain text, never instructions - a note may say things, but nobody executes it. Second: a list at the entrance says who is even allowed to pin anything, and anything from outside the list gets taken down. Third: the keys do not sit in a box everyone can reach, but with someone who never hands them to strangers, however nicely they ask.</p>'
        },
        school: {
          pl: '<p>Bezpieczeństwo frontendu sprowadza się do jednego pytania: kto może wykonać kod na Twojej stronie. Każdy realny atak to jakaś odpowiedź na to pytanie, której nie przewidziałeś.</p><p><strong>XSS</strong> (Cross-Site Scripting) to wstrzyknięcie skryptu przez dane. Klasyk w bibliotece komponentów to prop, który renderuje HTML:</p><pre><code>// źle: konsument poda cokolwiek, my to wykonamy\n&lt;div v-html="props.content" /&gt;\n\n// dobrze: tekst domyślnie, HTML tylko jawnie i po sanitizacji\n&lt;div&gt;{{ props.content }}&lt;/div&gt;</code></pre><p>Reguła: jeśli komponent ma prop typu <code>htmlContent</code>, jego nazwa musi krzyczeć o ryzyku, dokumentacja musi mówić, że wartość musi być już zsanityzowana, a domyślne zachowanie musi być bezpieczne.</p><p><strong>CSP</strong> (Content Security Policy) to nagłówek, który mówi przeglądarce, skąd wolno ładować skrypty. Dobra polityka opiera się na nonce, czyli jednorazowym tokenie generowanym per żądanie:</p><pre><code>Content-Security-Policy: script-src nonce-r4nd0m strict-dynamic;\n  object-src none; base-uri none</code></pre><p>Jeśli w polityce widzisz <code>unsafe-inline</code>, to znaczy, że polityki praktycznie nie ma - właśnie inline jest wektorem XSS.</p><p><strong>Supply chain</strong> to dziś najczęstsza droga włamania na frontend. Nie włamują się do Ciebie, tylko do paczki, której używasz. Podstawy: lockfile commitowany do repo, odnawianie zależności przez bota z przeglądem, wyłączone skrypty postinstall i rejestr wewnętrzny zamiast bezpośredniego npm.</p><p>I jedna rzecz, o której łatwo zapomnieć: token w <code>localStorage</code> jest czytelny dla każdego skryptu na stronie. Ciasteczko z <code>HttpOnly</code> nie jest.</p>',
          en: '<p>Frontend security boils down to one question: who can execute code on your page. Every real attack is some answer to that question you did not anticipate.</p><p><strong>XSS</strong> (Cross-Site Scripting) means injecting a script through data. The classic in a component library is a prop that renders HTML:</p><pre><code>// bad: the consumer passes anything, we execute it\n&lt;div v-html="props.content" /&gt;\n\n// good: text by default, HTML only explicitly and sanitised\n&lt;div&gt;{{ props.content }}&lt;/div&gt;</code></pre><p>The rule: if a component has an <code>htmlContent</code> prop, the name must shout about the risk, the docs must state the value has to arrive already sanitised, and the default behaviour must be the safe one.</p><p><strong>CSP</strong> (Content Security Policy) is a header telling the browser where scripts may load from. A good policy is nonce-based, using a one-time token generated per request:</p><pre><code>Content-Security-Policy: script-src nonce-r4nd0m strict-dynamic;\n  object-src none; base-uri none</code></pre><p>If you see <code>unsafe-inline</code> in a policy, the policy is effectively absent - inline is exactly the XSS vector.</p><p><strong>Supply chain</strong> is today the most common way into a frontend. Nobody breaks into you; they break into a package you depend on. The basics: lockfile committed to the repo, dependency updates via a bot with review, postinstall scripts disabled, and an internal registry instead of hitting npm directly.</p><p>And one thing easy to forget: a token in <code>localStorage</code> is readable by any script on the page. An <code>HttpOnly</code> cookie is not.</p>'
        },
        pro: {
          pl: '<p>W dużym telco frontend jest powierzchnią ataku o wyjątkowo wysokiej stawce: numery abonentów, dane rozliczeniowe, panele samoobsługowe z możliwością zmiany taryfy. Utrzymując design system, kontrolujesz jednocześnie kilkadziesiąt takich powierzchni. Każdy bezpieczny domyślny wybór w bibliotece mnoży się przez liczbę konsumentów - i tak samo mnoży się każda luka.</p><p><strong>Projektowanie API pod bezpieczeństwo.</strong> Niebezpieczne musi być trudne i widoczne. Zamiast propa <code>content</code>, który czasem jest HTML-em, daj slot dla struktury i osobny, jawnie nazwany <code>dangerouslySetHtml</code> z ostrzeżeniem w typach i w docsach. Dodaj regułę ESLint w firmowym presecie, która oznacza każde użycie tego propa jako wymagające przeglądu bezpieczeństwa. Trzysta użyć w organizacji to trzysta miejsc, które trzeba znaleźć - jeśli nie ma reguły, nie znajdziesz ich nigdy.</p><p><strong>CSP w praktyce, nie w teorii.</strong> Wdrożenie polityki od zera w istniejącej aplikacji telco zawsze idzie tak samo: najpierw <code>Content-Security-Policy-Report-Only</code> z endpointem raportującym na dwa tygodnie, potem analiza raportów (zwykle wychodzi 20-40 unikalnych źródeł, z czego połowa to narzędzia marketingowe, o których nikt w IT nie wiedział), potem negocjacje i dopiero na końcu tryb egzekwowania. Nonce wymaga wsparcia po stronie renderującej HTML - dla czystego SPA na CDN alternatywą są hashe, generowane w buildzie.</p><pre><code>// vite: hashe skryptów do polityki, generowane po buildzie\nimport { createHash } from "node:crypto";\nconst hash = createHash("sha256").update(inlineScript).digest("base64");\ncsp.push("sha256-" + hash);</code></pre><p><strong>Łańcuch dostaw jako proces, nie jako skan.</strong> Same alerty z <code>npm audit</code> to szum: większość CVE w zależnościach deweloperskich nie ma wektora w produkcji. Realne kontrole to: <code>ignore-scripts=true</code> w konfiguracji instalatora, proxy rejestru (Artifactory albo Verdaccio) z kwarantanną nowych wersji na 48-72 godziny, wymóg provenance dla publikowanych paczek, oraz SBOM generowany w CI. Najgroźniejszy scenariusz dla design systemu to przejęcie konta maintainera i publikacja złośliwej wersji patch - kwarantanna i wymóg dwóch zatwierdzeń do publikacji są tańszym zabezpieczeniem niż jakikolwiek skaner.</p><p><strong>Czego nie robić.</strong> Nie przechowuj tokenów w <code>localStorage</code>, jeśli masz wybór - przy XSS to natychmiastowa kradzież sesji. Nie ufaj walidacji po stronie klienta jako kontroli bezpieczeństwa; to jest UX, autorytetem jest zawsze backend. Nie dodawaj <code>unsafe-eval</code> dla wygody jednej biblioteki wykresów - koszt to cały sens polityki.</p>',
          en: '<p>In a large telco the frontend is an unusually high-stakes attack surface: subscriber numbers, billing data, self-service panels that can change a tariff. Maintaining the design system, you control dozens of those surfaces at once. Every safe default in the library multiplies by the number of consumers - and so does every hole.</p><p><strong>Designing APIs for security.</strong> The unsafe path must be hard and visible. Instead of a <code>content</code> prop that is sometimes HTML, provide a slot for structure and a separate, explicitly named <code>dangerouslySetHtml</code> with a warning in the types and the docs. Add an ESLint rule in the company preset that flags every use of that prop as requiring a security review. Three hundred usages across the org are three hundred places to find - without the rule you will never find them.</p><p><strong>CSP in practice, not in theory.</strong> Rolling out a policy from scratch in an existing telco app always goes the same way: first <code>Content-Security-Policy-Report-Only</code> with a reporting endpoint for two weeks, then report analysis (typically 20-40 unique sources, half of them marketing tools nobody in IT knew about), then negotiation, and only at the end enforcement mode. Nonces need support from whatever renders the HTML - for a pure SPA on a CDN the alternative is build-time hashes.</p><pre><code>// vite: script hashes for the policy, generated after build\nimport { createHash } from "node:crypto";\nconst hash = createHash("sha256").update(inlineScript).digest("base64");\ncsp.push("sha256-" + hash);</code></pre><p><strong>Supply chain as a process, not a scan.</strong> Raw <code>npm audit</code> alerts are noise: most CVEs in dev dependencies have no production vector. The real controls are: <code>ignore-scripts=true</code> in the installer config, a registry proxy (Artifactory or Verdaccio) quarantining new versions for 48-72 hours, mandatory provenance for published packages, and an SBOM generated in CI. The scariest scenario for a design system is a hijacked maintainer account publishing a malicious patch release - quarantine plus two-person approval for publishing is cheaper protection than any scanner.</p><p><strong>What not to do.</strong> Do not keep tokens in <code>localStorage</code> if you have a choice - under XSS that is instant session theft. Do not treat client-side validation as a security control; it is UX, and the backend is always the authority. Do not add <code>unsafe-eval</code> for the convenience of one charting library - the cost is the entire point of the policy.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Polityka CSP zawiera script-src z unsafe-inline. Co to oznacza w praktyce?',
            en: 'A CSP contains script-src with unsafe-inline. What does that mean in practice?'
          },
          options: [
            { pl: 'Polityka jest bezpieczna, bo blokuje zewnętrzne domeny', en: 'The policy is safe because it blocks external domains' },
            { pl: 'Polityka praktycznie nie chroni przed XSS, bo inline jest głównym wektorem', en: 'The policy barely protects against XSS, since inline is the main vector' },
            { pl: 'Polityka blokuje tylko obrazy', en: 'The policy only blocks images' },
            { pl: 'Polityka wymusza HTTPS na wszystkich zasobach', en: 'The policy forces HTTPS on all resources' }
          ],
          correct: 1,
          explain: {
            pl: 'Wstrzyknięty skrypt niemal zawsze jest inline. Dopuszczając inline, wpuszczasz dokładnie to, przed czym CSP miało chronić.',
            en: 'An injected script is almost always inline. Allowing inline lets in exactly what the CSP was supposed to stop.'
          }
        },
        {
          q: {
            pl: 'Jak najbezpieczniej zaprojektować w bibliotece komponent, który czasem musi wyrenderować HTML od konsumenta?',
            en: 'How should a library component that sometimes must render consumer HTML be designed?'
          },
          options: [
            { pl: 'Prop content, który automatycznie wykrywa czy to HTML', en: 'A content prop that auto-detects whether the value is HTML' },
            { pl: 'Zawsze renderować jako HTML, bo tak jest elastyczniej', en: 'Always render as HTML, it is more flexible' },
            { pl: 'Tekst domyślnie, a HTML wyłącznie przez jawnie nazwany prop dangerouslySetHtml z regułą lintera', en: 'Text by default, HTML only via an explicitly named dangerouslySetHtml prop with a lint rule' },
            { pl: 'Zostawić decyzję konsumentowi bez żadnych ostrzeżeń', en: 'Leave the decision to the consumer with no warnings' }
          ],
          correct: 2,
          explain: {
            pl: 'Bezpieczne musi być domyślne, a niebezpieczne jawne i wyszukiwalne. Reguła lintera daje Ci listę wszystkich ryzykownych użyć w organizacji.',
            en: 'Safe must be the default and unsafe must be explicit and greppable. A lint rule gives you the list of every risky usage across the org.'
          }
        },
        {
          q: {
            pl: 'Która kontrola najskuteczniej ogranicza ryzyko przejęcia konta maintainera zależności?',
            en: 'Which control most effectively limits the risk of a hijacked dependency maintainer account?'
          },
          options: [
            { pl: 'Uruchamianie npm audit w CI', en: 'Running npm audit in CI' },
            { pl: 'Proxy rejestru z kwarantanną nowych wersji na 48-72 godziny', en: 'A registry proxy quarantining new versions for 48-72 hours' },
            { pl: 'Używanie zakresów caret w package.json', en: 'Using caret ranges in package.json' },
            { pl: 'Aktualizowanie wszystkich zależności codziennie', en: 'Updating every dependency daily' }
          ],
          correct: 1,
          explain: {
            pl: 'Złośliwe wydania są zwykle wykrywane i wycofywane w ciągu godzin. Kwarantanna sprawia, że Twoja organizacja nigdy nie instaluje ich w tym oknie.',
            en: 'Malicious releases are usually detected and pulled within hours. Quarantine means your org never installs them during that window.'
          }
        },
        {
          q: {
            pl: 'Wdrażasz CSP w istniejącej aplikacji telco z dziesiątkami integracji. Jaki jest pierwszy krok?',
            en: 'You are rolling out CSP in an existing telco app with dozens of integrations. What is the first step?'
          },
          options: [
            { pl: 'Włączyć restrykcyjną politykę od razu i naprawiać zgłoszenia', en: 'Turn on a strict policy immediately and fix the reports' },
            { pl: 'Dodać unsafe-inline, żeby nic nie pękło', en: 'Add unsafe-inline so nothing breaks' },
            { pl: 'Uruchomić Report-Only z endpointem raportującym i zebrać dane przez dwa tygodnie', en: 'Run Report-Only with a reporting endpoint and collect data for two weeks' },
            { pl: 'Poprosić każdy zespół o listę swoich skryptów', en: 'Ask every team for a list of their scripts' }
          ],
          correct: 2,
          explain: {
            pl: 'Report-Only pokazuje rzeczywiste źródła, w tym narzędzia marketingowe, o których IT nie wie. Lista od zespołów zawsze jest niepełna, bo nikt nie pamięta wszystkiego.',
            en: 'Report-Only reveals the real sources, including marketing tools IT does not know about. A list from teams is always incomplete because nobody remembers everything.'
          }
        }
      ]
    },

    {
      id: 'code-review-culture',
      title: { pl: 'Kultura code review', en: 'Code review culture' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Rozmiar PR-a', en: 'PR size' },
          def: {
            pl: 'Najważniejszy parametr recenzji: skuteczność recenzenta spada po około 400 liniach i po godzinie czytania. PR na 1200 linii nie dostaje recenzji, tylko akceptację. Cel: mediana poniżej 250 linii.',
            en: 'The most important review parameter: reviewer effectiveness falls off past roughly 400 lines and one hour of reading. A 1200 line PR gets an approval, not a review. Target: median under 250 lines.'
          }
        },
        {
          term: { pl: 'Etykiety blocking, suggestion, nit', en: 'blocking, suggestion, nit labels' },
          def: {
            pl: 'Prefiks komentarza mówiący wprost, jaką ma wagę: <code>blocking</code> to poprawność, publiczne API, bezpieczeństwo i dostępność; <code>suggestion</code> zostawia decyzję autorowi; <code>nit</code> nigdy nie blokuje mergea.',
            en: 'A comment prefix stating its weight up front: <code>blocking</code> for correctness, public API, security and accessibility; <code>suggestion</code> leaves the call to the author; <code>nit</code> never blocks a merge.'
          }
        },
        {
          term: { pl: 'CODEOWNERS', en: 'CODEOWNERS' },
          def: {
            pl: 'Plik mapujący ścieżki na właścicieli, których zgoda jest wymagana. Kontrakty mają właścicieli (<code>packages/*/src/index.ts</code>), reszta nie musi - autor nie zgaduje, kogo poprosić.',
            en: 'A file mapping paths to owners whose approval is required. Contracts get owners (<code>packages/*/src/index.ts</code>), the rest does not - the author never guesses whom to ask.'
          }
        },
        {
          term: { pl: 'Współczynnik reworku', en: 'Rework rate' },
          def: {
            pl: 'Odsetek PR-ów wymagających więcej niż dwóch rund recenzji. Jego wzrost prawie zawsze oznacza, że rozmowa o projekcie rozwiązania odbywa się za późno: w PR-ze zamiast w RFC.',
            en: 'The share of PRs needing more than two review rounds. A rise almost always means the design conversation happens too late: in the PR instead of in an RFC.'
          }
        },
        {
          term: { pl: 'Progi wkładu do design systemu', en: 'Contribution thresholds' },
          def: {
            pl: 'Poprawka buga idzie zwykłą ścieżką, nowy wariant wymaga opisu przypadku użycia, a nowy komponent wymaga RFC z minimum dwoma niezależnymi konsumentami. Ostatni próg chroni przed biblioteką komponentów używanych w jednym miejscu.',
            en: 'A bug fix takes the normal path, a new variant needs a use case write-up, and a new component needs an RFC with at least two independent consumers. The last threshold prevents a library of single-use components.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><text x="20" y="28" font-size="14" fill="var(--text)">Time to first review, by PR size</text><rect x="20" y="44" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="80" y="66" font-size="13" fill="var(--ok)" text-anchor="middle">under 100 LOC</text><rect x="150" y="44" width="120" height="34" rx="8" fill="var(--ok)" opacity="0.25"/><text x="286" y="66" font-size="13" fill="var(--muted)">about 1 h</text><rect x="20" y="90" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="80" y="112" font-size="13" fill="var(--accent2)" text-anchor="middle">100-300 LOC</text><rect x="150" y="90" width="220" height="34" rx="8" fill="var(--accent2)" opacity="0.25"/><text x="386" y="112" font-size="13" fill="var(--muted)">about 4 h</text><rect x="20" y="136" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="80" y="158" font-size="13" fill="var(--warn)" text-anchor="middle">300-800 LOC</text><rect x="150" y="136" width="330" height="34" rx="8" fill="var(--warn)" opacity="0.25"/><text x="496" y="158" font-size="13" fill="var(--muted)">about 1 day</text><rect x="20" y="182" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="80" y="204" font-size="13" fill="var(--err)" text-anchor="middle">over 800 LOC</text><rect x="150" y="182" width="400" height="34" rx="8" fill="var(--err)" opacity="0.25"/><text x="556" y="204" font-size="13" fill="var(--muted)">2 days +</text><line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/><text x="20" y="268" font-size="14" fill="var(--text)">Label every comment so intent is never guessed:</text><rect x="20" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="312" font-size="14" fill="var(--err)">blocking</text><text x="40" y="336" font-size="13" fill="var(--muted)">correctness, API,</text><text x="40" y="356" font-size="13" fill="var(--muted)">security, a11y</text><rect x="225" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="245" y="312" font-size="14" fill="var(--accent)">suggestion</text><text x="245" y="336" font-size="13" fill="var(--muted)">worth doing, author</text><text x="245" y="356" font-size="13" fill="var(--muted)">decides now or later</text><rect x="430" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/><text x="450" y="312" font-size="14" fill="var(--muted)">nit</text><text x="450" y="336" font-size="13" fill="var(--muted)">taste only, never</text><text x="450" y="356" font-size="13" fill="var(--muted)">blocks a merge</text></svg>',
        caption: {
          pl: 'Rozmiar PR-a przekłada się wprost na czas oczekiwania na recenzję. Etykietowanie komentarzy usuwa najczęstsze źródło tarcia: zgadywanie, co jest wymagane.',
          en: 'PR size maps directly onto how long a review waits. Labelling comments removes the biggest source of friction: guessing what is mandatory.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że kolega prosi Cię o przeczytanie jego wypracowania. Jeśli przyniesie jedną stronę, przeczytasz ją przy kawie i powiesz coś mądrego. Jeśli przyniesie czterdzieści stron, odłożysz to na jutro, a jutro na pojutrze, a na końcu przekartkujesz i powiesz "spoko".</p><p>Dokładnie tak samo dzieje się z kodem. Małe porcje dostają prawdziwą uwagę, wielkie dostają tylko udawaną.</p><p>Druga rzecz to sposób mówienia. Jest ogromna różnica między "tu jest błąd, program się wywali" a "ja bym to nazwał inaczej, ale rób jak chcesz". Jeśli nie powiesz, które z tych dwóch masz na myśli, autor będzie zgadywał - i albo zignoruje ważną uwagę, albo będzie przez godzinę zmieniał nazwę zmiennej.</p><p>Dlatego dobrzy ludzie piszą wprost: to trzeba poprawić, a to tylko mój gust.</p>',
          en: '<p>Imagine a friend asks you to read their essay. If they bring one page you read it over coffee and say something useful. If they bring forty pages, you put it off until tomorrow, then the day after, and in the end you skim it and say "looks fine".</p><p>Exactly the same thing happens with code. Small portions get real attention; huge ones only get the pretence of it.</p><p>The second thing is how you speak. There is an enormous difference between "this is a bug, the program will crash" and "I would name it differently, but do as you like". If you do not say which of the two you mean, the author has to guess - and will either ignore an important note or spend an hour renaming a variable.</p><p>So good people say it plainly: this must be fixed, and this is only my taste.</p>'
        },
        school: {
          pl: '<p>Code review jest najczęściej używanym narzędziem architektonicznym w firmie. Każdego dnia podejmowane są w nim dziesiątki małych decyzji, które razem definiują, jak wygląda kod za rok. Warto więc traktować go jak proces z parametrami, a nie jak grzecznościowy rytuał.</p><p><strong>Rozmiar jest najważniejszym parametrem.</strong> Badania i codzienna praktyka zgadzają się: recenzent traci skuteczność po mniej więcej 400 liniach i po godzinie czytania. PR na 1200 linii nie dostaje recenzji, tylko akceptację. Rozbijanie zmiany na sekwencję małych PR-ów jest umiejętnością, której warto uczyć zespół wprost.</p><p><strong>Etykiety usuwają tarcie.</strong> Trzy prefiksy w komentarzach załatwiają większość nieporozumień:</p><ul><li><strong>blocking</strong> - poprawność, publiczne API, bezpieczeństwo, dostępność</li><li><strong>suggestion</strong> - warto, ale autor decyduje, teraz czy w kolejnym PR</li><li><strong>nit</strong> - czysty gust, nigdy nie blokuje mergea</li></ul><p><strong>Automatyzuj wszystko, co da się zautomatyzować.</strong> Formatowanie to Prettier, konwencje to ESLint, nazwy plików to reguły. Każdy komentarz o przecinku to zmarnowana uwaga człowieka, która mogła trafić na projekt API.</p><p><strong>CODEOWNERS zamiast pytania na czacie.</strong> W design systemie plik <code>CODEOWNERS</code> kieruje zmiany w <code>packages/tokens</code> do zespołu tokenów, a w <code>packages/react</code> do zespołu komponentów. Autor nie musi wiedzieć, kogo poprosić, a Ty nie musisz pilnować, żeby nikt nie zmienił kontraktu po cichu.</p><p>I rzecz najważniejsza kulturowo: recenzja dotyczy kodu, nie osoby. Sformułowanie "ta funkcja robi trzy rzeczy naraz" i "napisałeś bałagan" niosą tę samą informację techniczną, ale drugie kosztuje zaufanie, którego później brakuje przy trudnych decyzjach.</p>',
          en: '<p>Code review is the most frequently used architectural tool in a company. Dozens of small decisions get made in it every day, and together they define what the codebase looks like in a year. So treat it as a process with parameters, not as a politeness ritual.</p><p><strong>Size is the most important parameter.</strong> Research and daily practice agree: a reviewer loses effectiveness after roughly 400 lines and after an hour of reading. A 1200-line PR does not receive a review, it receives an approval. Splitting a change into a sequence of small PRs is a skill worth teaching the team explicitly.</p><p><strong>Labels remove friction.</strong> Three comment prefixes settle most misunderstandings:</p><ul><li><strong>blocking</strong> - correctness, public API, security, accessibility</li><li><strong>suggestion</strong> - worth doing, but the author decides: now or in a follow-up</li><li><strong>nit</strong> - pure taste, never blocks a merge</li></ul><p><strong>Automate everything automatable.</strong> Formatting is Prettier, conventions are ESLint, file naming is a rule. Every comment about a comma is human attention wasted that could have gone to the API design.</p><p><strong>CODEOWNERS instead of asking in chat.</strong> In a design system, a <code>CODEOWNERS</code> file routes changes in <code>packages/tokens</code> to the tokens team and <code>packages/react</code> to the components team. The author does not need to know who to ask, and you do not need to police silent contract changes.</p><p>And the culturally decisive point: the review is about the code, not the person. "This function does three things at once" and "you wrote a mess" carry the same technical information, but the second one spends trust you will need later, during hard decisions.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principala code review przestaje być kanałem wykrywania bugów, a staje się głównym kanałem propagacji standardów. Nie zrecenzujesz kodu czterdziestu zespołów. Możesz natomiast sprawić, że recenzje w tych zespołach będą wyglądać tak, jak chcesz - przez narzędzia, szablony i kilka publicznych przykładów.</p><p><strong>Metryki, które warto obserwować.</strong> Trzy liczby wystarczą i wszystkie da się wyciągnąć z API GitHuba: mediana czasu do pierwszej recenzji (cel: poniżej 4 godzin roboczych), mediana rozmiaru PR-a (cel: poniżej 250 zmienionych linii) i współczynnik reworku, czyli ile PR-ów wymaga więcej niż dwóch rund. Wzrost tej trzeciej liczby prawie zawsze oznacza, że rozmowa o projekcie rozwiązania odbywa się za późno - w PR-ze zamiast w RFC.</p><p><strong>Kanały o różnej przepustowości.</strong> Nie wszystko musi przejść przez pełną recenzję. W praktyce sprawdza się podział na trzy ścieżki: zmiany wewnętrzne w pakiecie - jeden recenzent z zespołu; zmiany publicznego API - dwóch recenzentów, w tym właściciel z CODEOWNERS i wymagany changeset; zmiany tokenów i motywu - dodatkowo zatwierdzenie od designu, bo skutek widzi czterdzieści aplikacji naraz.</p><pre><code># CODEOWNERS - kontrakty mają właścicieli, reszta nie musi\npackages/tokens/**        @ds-core @design-leads\npackages/*/src/index.ts   @ds-core\ndocs/**                   @ds-docs</code></pre><p><strong>Wkład z zewnątrz.</strong> Design system, do którego nie da się dołożyć komponentu, umiera w ciągu roku - zespoły forkują i budują równoległe biblioteki. Model, który działa, to progi: poprawka buga bez zmiany API idzie zwykłą ścieżką, nowy wariant istniejącego komponentu wymaga krótkiego opisu przypadku użycia, a nowy komponent wymaga RFC z minimum dwoma niezależnymi konsumentami. Ostatni próg jest najważniejszy: chroni przed biblioteką pełną komponentów używanych w jednym miejscu, które i tak musisz utrzymywać.</p><p><strong>Twoja rola w komentarzach.</strong> Jako najstarszy inżynier w wątku masz nieproporcjonalną wagę - Twoje "hmm" jest czytane jako weto. Praktyczne konsekwencje: pisz wprost, czy komentarz blokuje; nie zostawiaj czterdziestu uwag naraz, tylko trzy najważniejsze; a gdy odrzucasz kierunek, zaproponuj alternatywę w tym samym komentarzu. Recenzja bez propozycji jest dla autora ścianą, nie pomocą.</p><p><strong>Jedna rzecz, którą warto robić publicznie:</strong> od czasu do czasu zaakceptuj PR ze zdaniem, dlaczego uważasz to rozwiązanie za dobre. Zespoły uczą się standardu znacznie szybciej z pozytywnych przykładów niż z listy zakazów.</p>',
          en: '<p>At principal level, code review stops being a bug-detection channel and becomes the main channel for propagating standards. You will not review the code of forty teams. You can, however, make the reviews inside those teams look the way you want - through tooling, templates and a handful of public examples.</p><p><strong>Metrics worth watching.</strong> Three numbers are enough and all come from the GitHub API: median time to first review (target: under 4 working hours), median PR size (target: under 250 changed lines) and rework rate, meaning how many PRs need more than two rounds. A rise in that third number almost always means the design conversation is happening too late - in the PR instead of in an RFC.</p><p><strong>Channels with different throughput.</strong> Not everything needs a full review. In practice a three-lane split works: package-internal changes - one reviewer from the team; public API changes - two reviewers including a CODEOWNERS owner, plus a required changeset; token and theme changes - additionally a design approval, since forty applications see the effect at once.</p><pre><code># CODEOWNERS - contracts have owners, the rest does not need them\npackages/tokens/**        @ds-core @design-leads\npackages/*/src/index.ts   @ds-core\ndocs/**                   @ds-docs</code></pre><p><strong>Outside contributions.</strong> A design system nobody can contribute to dies within a year - teams fork it and build parallel libraries. The model that works is tiered: a bug fix with no API change takes the normal path, a new variant of an existing component needs a short use-case write-up, and a new component needs an RFC with at least two independent consumers. That last bar matters most: it protects you from a library full of components used in one place that you must maintain anyway.</p><p><strong>Your own weight in comments.</strong> As the most senior engineer in the thread you carry disproportionate weight - your "hmm" reads as a veto. Practical consequences: state explicitly whether a comment blocks; do not leave forty notes at once, leave the three that matter; and when you reject a direction, offer an alternative in the same comment. A review without a proposal is a wall to the author, not help.</p><p><strong>One thing worth doing in public:</strong> occasionally approve a PR with a sentence about why you think the solution is good. Teams learn a standard far faster from positive examples than from a list of prohibitions.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego PR na 1200 zmienionych linii jest problemem?',
            en: 'Why is a 1200-changed-line PR a problem?'
          },
          options: [
            { pl: 'Bo GitHub nie potrafi wyświetlić takiego diffa', en: 'Because GitHub cannot render such a diff' },
            { pl: 'Bo recenzent traci skuteczność po około 400 liniach, więc dostaje akceptację zamiast recenzji', en: 'Because reviewers lose effectiveness after roughly 400 lines, so it gets an approval instead of a review' },
            { pl: 'Bo CI nie zdąży przetworzyć tylu plików', en: 'Because CI cannot process that many files in time' },
            { pl: 'Bo duże PR-y zawsze zawierają błędy składniowe', en: 'Because large PRs always contain syntax errors' }
          ],
          correct: 1,
          explain: {
            pl: 'Uwaga człowieka jest ograniczonym zasobem. Powyżej kilkuset linii jakość recenzji spada gwałtownie, a zielony ptaszek przestaje cokolwiek gwarantować.',
            en: 'Human attention is a finite resource. Past a few hundred lines review quality collapses and the green check stops guaranteeing anything.'
          }
        },
        {
          q: {
            pl: 'Po co oznaczać komentarze jako blocking, suggestion albo nit?',
            en: 'Why label comments as blocking, suggestion or nit?'
          },
          options: [
            { pl: 'Żeby łatwiej filtrować komentarze w narzędziu', en: 'To make comments easier to filter in the tool' },
            { pl: 'Żeby autor nie musiał zgadywać, co jest wymagane, a co jest gustem recenzenta', en: 'So the author does not have to guess what is required and what is reviewer taste' },
            { pl: 'Żeby zliczać produktywność recenzentów', en: 'To count reviewer productivity' },
            { pl: 'Żeby spełnić wymogi audytu', en: 'To satisfy audit requirements' }
          ],
          correct: 1,
          explain: {
            pl: 'Większość tarcia w recenzjach bierze się z niejasnej intencji. Etykieta rozwiązuje to jednym słowem i skraca liczbę rund.',
            en: 'Most review friction comes from unclear intent. A label resolves it in one word and cuts the number of rounds.'
          }
        },
        {
          q: {
            pl: 'Zespół produktowy chce dodać nowy komponent do design systemu. Jaki próg jest najzdrowszy?',
            en: 'A product team wants to add a new component to the design system. What is the healthiest bar?'
          },
          options: [
            { pl: 'Przyjmować wszystko, żeby nie zniechęcać do wkładu', en: 'Accept everything so contribution is not discouraged' },
            { pl: 'Nie przyjmować nic z zewnątrz, żeby utrzymać spójność', en: 'Accept nothing from outside to keep consistency' },
            { pl: 'Wymagać RFC z co najmniej dwoma niezależnymi konsumentami', en: 'Require an RFC with at least two independent consumers' },
            { pl: 'Wymagać, żeby autor dołączył do zespołu design systemu', en: 'Require the author to join the design system team' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez progu biblioteka zapełnia się komponentami używanymi w jednym miejscu, które i tak utrzymujesz. Z zerowym wkładem zespoły forkują i budują równoległe biblioteki.',
            en: 'With no bar the library fills with single-use components you still maintain. With zero contribution allowed, teams fork and build parallel libraries.'
          }
        },
        {
          q: {
            pl: 'Współczynnik reworku (PR-y wymagające więcej niż dwóch rund) rośnie od kwartału. Co to najczęściej sygnalizuje?',
            en: 'Rework rate (PRs needing more than two rounds) has been rising for a quarter. What does that usually signal?'
          },
          options: [
            { pl: 'Rozmowa o projekcie rozwiązania odbywa się za późno, w PR-ze zamiast w RFC', en: 'The design conversation happens too late, in the PR instead of in an RFC' },
            { pl: 'Recenzenci są zbyt łagodni', en: 'Reviewers are too lenient' },
            { pl: 'Zespół pisze za mało testów', en: 'The team writes too few tests' },
            { pl: 'Narzędzie do recenzji działa wolno', en: 'The review tool is slow' }
          ],
          correct: 0,
          explain: {
            pl: 'Wiele rund oznacza, że kierunek jest negocjowany po napisaniu kodu. Lekiem jest krótki dokument lub rozmowa przed implementacją, nie ostrzejsze recenzje.',
            en: 'Many rounds mean the direction is being negotiated after the code exists. The cure is a short document or conversation before implementation, not harsher reviews.'
          }
        }
      ]
    },

    {
      id: 'principal-track-case-studies',
      title: { pl: 'Ścieżka principala - studia przypadków', en: 'The principal track - case studies' },
      minutes: 14,
      terms: [
        {
          term: { pl: 'Wpływ bez władzy', en: 'Influence without authority' },
          def: {
            pl: 'Nie możesz kazać czterdziestu zespołom niczego zrobić, ale możesz zmieniać koszty: gotowe PR-y, codemod, domyślne ustawienia i widoczny licznik postępu działają tam, gdzie mail z nakazem daje 5 procent adopcji.',
            en: 'You cannot order forty teams to do anything, but you can change costs: ready-made PRs, a codemod, defaults and a visible progress counter work where a mandate email gets 5 percent adoption.'
          }
        },
        {
          term: { pl: 'Codemod', en: 'Codemod' },
          def: {
            pl: 'Skrypt przepisujący kod (jscodeshift) na poziomie AST. W migracji 1240 użyć Buttona pokrył 920 przypadków i ściął koszt dla zespołu z dwóch dni pracy do pięciu minut przeglądu PR-a.',
            en: 'A code rewriting script (jscodeshift) working at AST level. In a 1240-usage Button migration it covered 920 cases and cut the per-team cost from two days of work to five minutes of PR review.'
          }
        },
        {
          term: { pl: 'Zamknięcie drogi powrotnej', en: 'Closing the back door (ratchet)' },
          def: {
            pl: 'Reguła lintera w firmowym presecie blokująca nowe użycia od pierwszego dnia migracji. Bez niej naprawiasz szybciej niż inni psują, ale tylko przez chwilę.',
            en: 'A lint rule in the company preset blocking new usages from day one of a migration. Without it you fix faster than others break things - but only for a while.'
          }
        },
        {
          term: { pl: 'ADR (Architecture Decision Record)', en: 'ADR (Architecture Decision Record)' },
          def: {
            pl: 'Krótki dokument zapisujący decyzję, kontekst i odrzucone opcje. To artefakt poziomu staff: działa także wtedy, gdy nie ma Cię w pokoju, i zostaje w firmie po Twoim odejściu.',
            en: 'A short document recording a decision, its context and the rejected options. A staff-level artifact: it works when you are not in the room and stays in the company after you leave.'
          }
        },
        {
          term: { pl: 'Zamiana konfliktu wartości na liczby', en: 'Turning a values conflict into numbers' },
          def: {
            pl: 'Zamiast bronić budżetu wydajności pokazujesz z RUM wzrost LCP p75 z 2,3 do 3,6 s i spadek konwersji o 4-7 procent, po czym proponujesz wariant. Odpowiedź <em>nie, bo budżet</em> przegrywa z przychodem.',
            en: 'Instead of defending a performance budget you show RUM data: LCP p75 rising from 2.3 to 3.6 s and conversion dropping 4-7 percent, then offer an alternative. <em>No, because budget</em> always loses to revenue.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6pr-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="20" y="28" font-size="14" fill="var(--muted)">what changes between levels is scope and artifact, not skill</text><rect x="20" y="46" width="180" height="86" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="110" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Senior</text><text x="110" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: one team</text><text x="110" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the code</text><line x1="204" y1="89" x2="236" y2="89" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="240" y="46" width="180" height="86" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="330" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Staff</text><text x="330" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: a few teams</text><text x="330" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the ADR</text><line x1="424" y1="89" x2="456" y2="89" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="460" y="46" width="160" height="86" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="540" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Principal</text><text x="540" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: the org</text><text x="540" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the platform</text><line x1="20" y1="160" x2="620" y2="160" stroke="var(--border)" stroke-width="2"/><text x="20" y="190" font-size="14" fill="var(--text)">Case study: retiring the legacy Button across 40 apps</text><rect x="20" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="90" y="234" font-size="14" fill="var(--err)" text-anchor="middle">1240 usages</text><text x="90" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">week 0</text><line x1="164" y1="241" x2="192" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="196" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="266" y="234" font-size="14" fill="var(--warn)" text-anchor="middle">codemod PRs</text><text x="266" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">920 auto-fixed</text><line x1="340" y1="241" x2="368" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="372" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="442" y="234" font-size="14" fill="var(--accent)" text-anchor="middle">lint gate on</text><text x="442" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">no new usages</text><line x1="516" y1="241" x2="544" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="548" y="206" width="72" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="584" y="234" font-size="14" fill="var(--ok)" text-anchor="middle">31</text><text x="584" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">week 12</text><rect x="20" y="298" width="600" height="94" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="326" font-size="13" fill="var(--muted)">The migration worked because the default path was cheaper than doing nothing:</text><text x="40" y="350" font-size="13" fill="var(--muted)">a codemod PR that teams only had to approve, plus a gate stopping new usage,</text><text x="40" y="374" font-size="13" fill="var(--muted)">plus one dashboard everyone could see. No mandate email was ever sent.</text></svg>',
        caption: {
          pl: 'Między poziomami zmienia się zasięg i artefakt, nie umiejętność. Poniżej realna migracja: 1240 użyć do 31 w dwanaście tygodni, bez maila z nakazem.',
          en: 'What changes between levels is scope and artifact, not skill. Below, a real migration: 1240 usages down to 31 in twelve weeks, with no mandate email.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że w całym mieście ludzie używają starych, ciężkich drzwi, które się zacinają. Masz nowe, lepsze. Możesz teraz rozesłać pismo: "od poniedziałku wszyscy wymieniają drzwi". Nikt tego nie zrobi, bo każdy ma ważniejsze rzeczy na głowie.</p><p>Albo możesz zrobić coś innego. Przychodzisz do każdego domu z gotowymi nowymi drzwiami już przykręconymi na próbę i mówisz: "wystarczy, że kiwniesz głową". Potem sprawiasz, że w sklepie nie da się już kupić starych drzwi. Na koniec wieszasz na rynku tablicę, na której widać, ile domów ma już nowe.</p><p>Po trzech miesiącach prawie wszyscy mają nowe drzwi i nikt się nie kłócił. Nie dlatego, że kazałeś, tylko dlatego, że zrobiłeś zmianę łatwiejszą niż jej brak.</p>',
          en: '<p>Imagine a whole town using old, heavy doors that jam. You have better ones. You could send a letter: "from Monday, everyone replaces their door". Nobody will, because everyone has more urgent things going on.</p><p>Or you can do something else. You show up at every house with a new door already test-fitted and say: "all you have to do is nod". Then you make sure the shop no longer sells the old doors. Finally you put a board up in the square showing how many houses already have the new one.</p><p>Three months later almost everyone has new doors and nobody argued. Not because you ordered it, but because you made the change cheaper than not changing.</p>'
        },
        school: {
          pl: '<p>Różnica między seniorem a principalem rzadko dotyczy umiejętności technicznych. Principal często pisze mniej kodu. Zmienia się zasięg wpływu i rodzaj artefaktu, który zostawia po sobie: senior zostawia dobry kod, staff dobrą decyzję udokumentowaną w ADR, principal - platformę i standardy, które działają bez jego obecności.</p><p>Najbardziej praktyczna umiejętność na tym poziomie to <strong>wpływ bez władzy</strong>. Nie możesz kazać czterdziestu zespołom niczego zrobić. Możesz natomiast zmieniać koszty.</p><p>Przykład migracji, która naprawdę działa:</p><ol><li><strong>Zmierz.</strong> Skrypt liczący użycia starego komponentu we wszystkich repozytoriach. Bez liczby dyskutujesz o wrażeniach.</li><li><strong>Usuń tarcie.</strong> Napisz codemod (skrypt przepisujący kod) i otwórz gotowe PR-y w repozytoriach zespołów. Zespół ma tylko kliknąć approve.</li><li><strong>Zamknij drogę powrotną.</strong> Reguła ESLint, która blokuje nowe użycia. Bez tego naprawiasz szybciej, niż inni psują - ale tylko chwilę.</li><li><strong>Pokaż postęp.</strong> Jeden publiczny dashboard z licznikiem. Widoczność robi więcej niż przypomnienia.</li></ol><p>Druga umiejętność to <strong>pisanie</strong>. Dokument na dwie strony, który czytają trzy zespoły, ma większy zasięg niż najlepsza prezentacja na spotkaniu, bo działa też wtedy, gdy Cię nie ma w pokoju i zostaje w firmie po Twoim odejściu.</p><p>Trzecia to <strong>umiejętność powiedzenia nie</strong> w sposób, który nie blokuje ludzi. "Nie, bo nie pasuje do systemu" kończy rozmowę. "Nie w tej formie, ale ten sam efekt osiągniemy tak - i mogę pomóc w środę" utrzymuje i standard, i relację.</p>',
          en: '<p>The difference between a senior and a principal rarely lies in technical skill. A principal often writes less code. What changes is the reach of the influence and the kind of artifact left behind: a senior leaves good code, a staff engineer leaves a good decision documented in an ADR, a principal leaves a platform and standards that work without them in the room.</p><p>The most practical skill at that level is <strong>influence without authority</strong>. You cannot order forty teams to do anything. You can, however, change the costs.</p><p>An example of a migration that actually works:</p><ol><li><strong>Measure.</strong> A script counting usages of the old component across all repositories. Without a number you are debating impressions.</li><li><strong>Remove the friction.</strong> Write a codemod (a script that rewrites code) and open ready-made PRs in the teams repositories. The team only has to click approve.</li><li><strong>Close the way back.</strong> An ESLint rule blocking new usages. Without it you fix faster than others break - but only for a while.</li><li><strong>Show the progress.</strong> One public dashboard with a counter. Visibility does more than reminders.</li></ol><p>The second skill is <strong>writing</strong>. A two-page document read by three teams reaches further than the best presentation in a meeting, because it also works when you are not in the room and it stays in the company after you leave.</p><p>The third is <strong>saying no</strong> in a way that does not block people. "No, it does not fit the system" ends the conversation. "Not in this shape, but we can get the same outcome this way - and I can help on Wednesday" preserves both the standard and the relationship.</p>'
        },
        pro: {
          pl: '<p>Trzy studia przypadków z życia design systemu w dużej organizacji telco. Każde ilustruje inny mechanizm, którym principal zmienia zachowanie systemu, nie mając nad nim władzy formalnej.</p><p><strong>Przypadek 1: wycofanie starego Buttona, 1240 użyć w 40 aplikacjach.</strong> Mail z nakazem daje w takiej skali około 5 procent adopcji w kwartale, bo każdy zespół ma własny backlog i własnego menedżera. Zadziałało co innego: codemod oparty o jscodeshift pokrył 920 z 1240 przypadków, boty otworzyły PR-y w repozytoriach zespołów z zielonym CI i listą zmian, reguła ESLint w firmowym presecie zaczęła blokować nowe użycia od pierwszego dnia, a publiczny dashboard pokazywał licznik per zespół. Po dwunastu tygodniach zostało 31 użyć, wszystkie w dwóch aplikacjach z własnymi, uzasadnionymi wyjątkami. Kluczowa liczba, którą warto mieć w głowie: koszt migracji dla zespołu spadł z około dwóch dni pracy do pięciu minut przeglądu.</p><p><strong>Przypadek 2: dwa równoległe design systemy.</strong> Klasyczna sytuacja po fuzji albo po długim okresie, gdy oficjalna biblioteka nie przyjmowała wkładu. Błędna reakcja to walka o legitymację. Skuteczna ścieżka: policz realny koszt utrzymania obu (u nas wyszło około 1,4 etatu duplikacji rocznie plus niespójność wizualna w ścieżce zakupowej), znajdź w drugim systemie 2-3 rzeczy obiektywnie lepsze i przejmij je razem z autorami, a następnie zaproponuj połączenie, w którym druga strona nie traci twarzy - ich komponenty wchodzą pod ich nazwiskami do wspólnej biblioteki. Fuzja techniczna jest tu łatwiejsza od politycznej i to na tę drugą idzie większość czasu.</p><p><strong>Przypadek 3: budżet wydajności kontra kampania marketingowa.</strong> Marketing chce wpiąć trzy skrypty analityczne, każdy po 40-90 kB, przed pierwszym renderem. Odpowiedź "nie, bo budżet" przegrywa z przychodem. Odpowiedź, która wygrywa, jest oparta o dane: pokazujesz z RUM, że LCP p75 rośnie z 2,3 do 3,6 sekundy, a wewnętrzny test A/B wskazuje spadek konwersji rzędu 4-7 procent przy takim opóźnieniu, po czym proponujesz wariant: jeden skrypt ładowany po interakcji, dwa przez serwerowy tagging. Zamiana konfliktu wartości na porównanie liczb to podstawowa technika tego poziomu.</p><p><strong>Co z tego wynika o samej roli.</strong> Wspólny mianownik wszystkich trzech przypadków: principal zmienia domyślne zachowanie systemu, a nie decyzje pojedynczych ludzi. Domyślne ustawienie, szablon, generator, reguła lintera i bramka w CI mają większy zasięg niż jakakolwiek rozmowa, bo działają przy każdym commicie, także wtedy, gdy jesteś na urlopie.</p><p>Na rozmowie o awans nie pokazujesz więc listy technologii, tylko trzy takie historie z liczbami przed i po, z opisem, kogo trzeba było przekonać, i z uczciwym akapitem o tym, co poszło źle. Ostatni element jest zaskakująco często tym, który decyduje.</p>',
          en: '<p>Three case studies from the life of a design system in a large telco. Each illustrates a different mechanism by which a principal changes system behaviour without formal authority over it.</p><p><strong>Case 1: retiring the legacy Button, 1240 usages across 40 apps.</strong> A mandate email at that scale buys roughly 5 percent adoption in a quarter, because every team has its own backlog and its own manager. What worked was different: a jscodeshift codemod covered 920 of the 1240 cases, bots opened PRs in the teams repositories with green CI and a change list, an ESLint rule in the company preset started blocking new usages on day one, and a public dashboard showed a per-team counter. Twelve weeks later 31 usages remained, all in two apps with their own justified exceptions. The number worth remembering: the migration cost per team fell from about two days of work to five minutes of review.</p><p><strong>Case 2: two parallel design systems.</strong> The classic situation after a merger, or after a long period during which the official library refused contributions. The wrong reaction is fighting over legitimacy. The effective path: quantify the real cost of maintaining both (in our case around 1.4 FTE of duplication per year plus visual inconsistency in the purchase flow), find 2-3 things the other system objectively does better and adopt them together with their authors, then propose a merge in which the other side does not lose face - their components enter the shared library under their names. The technical merge is easier than the political one, and the political one eats most of the time.</p><p><strong>Case 3: a performance budget versus a marketing campaign.</strong> Marketing wants three analytics scripts, 40-90 kB each, before first render. The answer "no, budget" loses against revenue. The answer that wins is built on data: you show from RUM that LCP p75 moves from 2.3 to 3.6 seconds, that an internal A/B test indicates a 4-7 percent conversion drop at that delay, and then you propose a variant - one script loaded after interaction, two through server-side tagging. Converting a values conflict into a comparison of numbers is the core technique at this level.</p><p><strong>What this says about the role.</strong> The common denominator across all three: a principal changes the default behaviour of the system rather than the decisions of individual people. A default setting, a template, a generator, a lint rule and a CI gate reach further than any conversation, because they act on every commit, including while you are on holiday.</p><p>So in a promotion conversation you do not present a list of technologies, you present three such stories with before and after numbers, with who had to be convinced, and with an honest paragraph about what went wrong. That last element is surprisingly often the deciding one.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co najlepiej opisuje różnicę między seniorem a principalem?',
            en: 'What best describes the difference between a senior and a principal?'
          },
          options: [
            { pl: 'Principal zna więcej frameworków', en: 'A principal knows more frameworks' },
            { pl: 'Zmienia się zasięg wpływu i artefakt: od kodu, przez decyzje w ADR, po platformę i standardy', en: 'The reach and the artifact change: from code, through ADR decisions, to platform and standards' },
            { pl: 'Principal zarządza ludźmi, senior nie', en: 'A principal manages people, a senior does not' },
            { pl: 'Principal pisze więcej kodu na tydzień', en: 'A principal writes more code per week' }
          ],
          correct: 1,
          explain: {
            pl: 'To nie jest awans za znajomość technologii. Miarą jest to, co zostaje w organizacji i działa, gdy Ciebie nie ma w pokoju.',
            en: 'This is not a promotion for knowing technologies. The measure is what remains in the organisation and works when you are not in the room.'
          }
        },
        {
          q: {
            pl: 'Który element migracji 1240 użyć był najważniejszy dla utrzymania postępu?',
            en: 'Which element of the 1240-usage migration mattered most for keeping progress?'
          },
          options: [
            { pl: 'Mail z nakazem od dyrektora', en: 'A mandate email from a director' },
            { pl: 'Reguła ESLint blokująca nowe użycia od pierwszego dnia', en: 'An ESLint rule blocking new usages from day one' },
            { pl: 'Prezentacja na spotkaniu wszystkich zespołów', en: 'A presentation at the all-teams meeting' },
            { pl: 'Wpis na wewnętrznym blogu', en: 'An internal blog post' }
          ],
          correct: 1,
          explain: {
            pl: 'Bez zamknięcia drogi powrotnej naprawiasz mniej więcej w tempie, w jakim powstają nowe użycia. Bramka zamienia migrację w proces zbieżny.',
            en: 'Without closing the way back you fix at roughly the rate new usages appear. A gate turns the migration into a converging process.'
          }
        },
        {
          q: {
            pl: 'Inny zespół zbudował równoległy design system. Jaka reakcja jest najskuteczniejsza?',
            en: 'Another team has built a parallel design system. What reaction is most effective?'
          },
          options: [
            { pl: 'Eskalować do dyrektora i żądać wyłączenia ich biblioteki', en: 'Escalate to a director and demand their library be shut down' },
            { pl: 'Zignorować i liczyć, że samo umrze', en: 'Ignore it and hope it dies on its own' },
            { pl: 'Policzyć koszt duplikacji, przejąć 2-3 ich lepsze rozwiązania razem z autorami i zaproponować połączenie bez utraty twarzy', en: 'Quantify the duplication cost, adopt 2-3 of their better ideas together with their authors, and propose a merge with no loss of face' },
            { pl: 'Skopiować ich komponenty do swojej biblioteki bez pytania', en: 'Copy their components into your library without asking' }
          ],
          correct: 2,
          explain: {
            pl: 'Równoległy system to zwykle objaw zamkniętego modelu wkładu, a nie złośliwości. Fuzja techniczna jest łatwa; cały wysiłek idzie w część polityczną.',
            en: 'A parallel system is usually a symptom of a closed contribution model, not malice. The technical merge is easy; the effort goes into the political part.'
          }
        },
        {
          q: {
            pl: 'Marketing chce dodać trzy skrypty po 40-90 kB przed pierwszym renderem. Jaka odpowiedź ma największą szansę zadziałać?',
            en: 'Marketing wants three 40-90 kB scripts before first render. Which response is most likely to work?'
          },
          options: [
            { pl: 'Nie, ponieważ to łamie nasz budżet wydajności', en: 'No, because it breaks our performance budget' },
            { pl: 'Tak, budżet to tylko wskazówka', en: 'Yes, the budget is only a guideline' },
            { pl: 'Dane z RUM o LCP i szacowany wpływ na konwersję plus konkretny wariant: jeden skrypt po interakcji, dwa przez server-side tagging', en: 'RUM data on LCP plus an estimated conversion impact, and a concrete alternative: one script after interaction, two via server-side tagging' },
            { pl: 'Przekazać decyzję dyrektorowi', en: 'Hand the decision to a director' }
          ],
          correct: 2,
          explain: {
            pl: 'Konflikt wartości przegrywa z przychodem, porównanie liczb nie. Alternatywa dowozi cel marketingu, więc rozmowa przestaje być sporem o zasady.',
            en: 'A values conflict loses to revenue; a comparison of numbers does not. The alternative still delivers the marketing goal, so the discussion stops being about principles.'
          }
        }
      ]
    }

  ]
};
