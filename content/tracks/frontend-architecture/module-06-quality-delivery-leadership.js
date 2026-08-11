export default {
  id: 'quality-delivery-leadership',
  order: 6,
  icon: '🚀',
  title: { pl: 'Jakosc, dostarczanie i przywodztwo', en: 'Quality, Delivery & Leadership' },
  description: {
    pl: 'Ostatnia mila architektury: strategia testow, pipeline CI/CD, obserwowalnosc bledow, bezpieczenstwo frontendu, kultura code review i to, co odroznia seniora od principala.',
    en: 'The last mile of architecture: test strategy, the CI/CD pipeline, error observability, frontend security, code review culture, and what separates a senior from a principal.'
  },
  lessons: [

    {
      id: 'testing-strategy',
      title: { pl: 'Strategia testow', en: 'Test strategy' },
      minutes: 12,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><text x="20" y="26" font-size="14" fill="var(--muted)">fewer, slower, more confidence per test</text><rect x="200" y="40" width="240" height="52" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="320" y="63" font-size="14" fill="var(--text)" text-anchor="middle">E2E - Playwright</text><text x="320" y="82" font-size="13" fill="var(--muted)" text-anchor="middle">40 flows, 12 min, flaky</text><rect x="140" y="104" width="360" height="52" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="320" y="127" font-size="14" fill="var(--text)" text-anchor="middle">Component + integration</text><text x="320" y="146" font-size="13" fill="var(--muted)" text-anchor="middle">600 tests, 4 min, Testing Library</text><rect x="90" y="168" width="460" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="320" y="191" font-size="14" fill="var(--text)" text-anchor="middle">Unit + contract</text><text x="320" y="210" font-size="13" fill="var(--muted)" text-anchor="middle">3000 tests, 40 s, pure logic and tokens</text><rect x="40" y="232" width="560" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="320" y="255" font-size="14" fill="var(--text)" text-anchor="middle">Static: TypeScript, ESLint, a11y lint</text><text x="320" y="274" font-size="13" fill="var(--muted)" text-anchor="middle">instant, runs while you type</text><text x="20" y="316" font-size="13" fill="var(--muted)">A design system adds a fifth lane next to this stack:</text><rect x="20" y="330" width="600" height="48" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="320" y="360" font-size="14" fill="var(--accent2)" text-anchor="middle">Visual regression on every story - the contract with 40 consumer apps</text></svg>',
        caption: {
          pl: 'Warstwy testow wedlug kosztu i pewnosci. Design system doklada piata warstwe: testy wizualne, bo to one pilnuja kontraktu z aplikacjami konsumentow.',
          en: 'Test layers by cost and confidence. A design system adds a fifth lane - visual regression, because that is what guards the contract with consumer apps.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze budujesz klocki Lego, z ktorych czterdziescie innych osob buduje swoje zamki. Jesli zmienisz ksztalt jednego klocka, wszystkie ich zamki moga sie rozsypac, a Ty dowiesz sie o tym dopiero, gdy przyjda z placzem.</p><p>Testy to sposob, zeby dowiedziec sie wczesniej. Sa cztery rodzaje sprawdzania. Pierwszy: patrzysz na klocek i widzisz, ze jest zielony i ma osiem wypustek - to trwa sekunde. Drugi: probujesz wcisnac go w drugi klocek i sprawdzasz, czy trzyma. Trzeci: skladasz maly domek i patrzysz, czy stoi. Czwarty: budujesz caly zamek z wiezami i fosa, co zajmuje pol dnia i czasem sie przewroci nawet wtedy, gdy wszystko jest dobrze.</p><p>Madra osoba robi bardzo duzo tych pierwszych, sporo drugich, kilka trzecich i tylko kilka czwartych. Bo jesli bedziesz budowac caly zamek za kazdym razem, gdy pomalujesz jeden klocek, nigdy nie skonczysz.</p>',
          en: '<p>Imagine you make Lego bricks, and forty other people build their castles out of them. If you change the shape of one brick, all their castles can collapse - and you only find out when they show up crying.</p><p>Tests are how you find out earlier. There are four kinds of checking. First: you look at the brick and see it is green with eight studs - that takes a second. Second: you push it into another brick and check that it holds. Third: you build a small house and see whether it stands. Fourth: you build the whole castle with towers and a moat, which takes half a day and sometimes falls over even when everything is fine.</p><p>A smart person does very many of the first kind, a lot of the second, a few of the third, and only a handful of the fourth. Because if you rebuild the entire castle every time you repaint one brick, you will never finish.</p>'
        },
        school: {
          pl: '<p>Strategia testow to nie pytanie "czy testowac", tylko "gdzie wydac budzet czasu". Kazdy test kosztuje dwa razy: raz przy pisaniu, drugi raz przy kazdym uruchomieniu i przy kazdej naprawie, gdy zaczyna byc flaky (niestabilny, raz przechodzi, raz nie).</p><p>Klasyczna piramida (duzo unitow, malo E2E) w nowoczesnym frontendzie zamienila sie w <strong>test trophy</strong>: najwiecej wartosci daja testy komponentow, ktore renderuja prawdziwy DOM i klikaja jak uzytkownik, a nie sprawdzaja wewnetrznego stanu.</p><pre><code>// Testing Library - test zachowania, nie implementacji\nrender(&lt;Modal open onClose={spy} /&gt;);\nawait user.keyboard("{Escape}");\nexpect(spy).toHaveBeenCalled();</code></pre><p>Kluczowa zasada: testuj kontrakt, nie strukture. Test, ktory sprawdza, ze komponent ma klase <code>chi-modal__header</code>, pekniesz przy kazdym refaktorze. Test, ktory sprawdza, ze Escape zamyka modal, przezyje trzy przepisania implementacji.</p><p>W design systemie dochodzi warstwa, ktorej nie ma w zwyklej aplikacji: <strong>visual regression</strong> (testy wizualne). Kod moze byc poprawny, testy zielone, a padding zmieniony o 4 piksele rozjedzie layout w czterdziestu aplikacjach. Narzedzia jak Chromatic albo Playwright z porownaniem screenshotow robia zdjecie kazdej historii ze Storybooka i pokazuja diff w PR.</p><p>Praktyczny podzial czasu, ktory dziala: 60 procent wysilku na testy komponentow, 25 procent na czysta logike (funkcje, generatory tokenow, walidatory), 10 procent na wizualne, 5 procent na E2E dla trzech-czterech krytycznych sciezek. Jesli suite jednostkowy trwa dluzej niz minute, ludzie przestana go uruchamiac lokalnie i cala inwestycja idzie do kosza.</p>',
          en: '<p>Test strategy is not the question "should we test", it is "where do we spend the time budget". Every test costs twice: once when you write it, and again on every run and every repair once it turns flaky (unstable - passing one run, failing the next).</p><p>The classic pyramid (many unit tests, few E2E) has, in modern frontend, turned into the <strong>test trophy</strong>: most value comes from component tests that render real DOM and click like a user, rather than inspecting internal state.</p><pre><code>// Testing Library - test behaviour, not implementation\nrender(&lt;Modal open onClose={spy} /&gt;);\nawait user.keyboard("{Escape}");\nexpect(spy).toHaveBeenCalled();</code></pre><p>The key rule: test the contract, not the structure. A test asserting the component has a <code>chi-modal__header</code> class breaks on every refactor. A test asserting that Escape closes the modal survives three rewrites of the implementation.</p><p>A design system adds a layer a normal app does not have: <strong>visual regression</strong>. The code can be correct and the tests green while a padding changed by 4 pixels wrecks the layout in forty applications. Tools like Chromatic, or Playwright with screenshot comparison, snapshot every Storybook story and show the diff in the PR.</p><p>A time split that works in practice: 60 percent of the effort on component tests, 25 percent on pure logic (functions, token generators, validators), 10 percent on visual, 5 percent on E2E for three or four critical paths. If the unit suite takes longer than a minute, people stop running it locally and the whole investment is wasted.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principala strategia testow to dokument budzetowy, nie techniczna preferencja. Piszesz w nim, ile minut trwa pipeline, jaki procent flaky akceptujesz i kto placi za utrzymanie. Bez tych trzech liczb dyskusja zamienia sie w wojne religijna miedzy fanami Cypressa i Playwrighta.</p><p><strong>Kalibracja pod design system.</strong> Utrzymujac biblioteke komponentow dla kilkudziesieciu aplikacji, masz inny profil ryzyka niz zespol produktowy. Twoj glowny tryb awarii to nie "przycisk nie dziala", tylko "przycisk dziala inaczej niz wczoraj u czterdziestu konsumentow". Dlatego priorytety wygladaja tak:</p><ul><li><strong>Testy kontraktu API komponentu</strong> - snapshot publicznych propsow i eventow, generowany z typow. Zmiana wykryta w PR jest zmiana breaking, o ile nie jest opisana w changesecie.</li><li><strong>Visual regression na kazdej historii</strong>, w dwoch motywach i dwoch szerokosciach (360 i 1280). Koszt: przy 400 historiach to okolo 1600 zrzutow, 6-9 minut na maszynie CI z shardingiem na 4 workery.</li><li><strong>A11y jako test, nie jako audyt</strong> - <code>axe-core</code> na kazdej historii wylapuje 30-40 procent problemow WCAG automatycznie. Reszta wymaga czlowieka i czytnika ekranu, ale ta polowa nie powinna zjadac czasu recenzenta.</li><li><strong>E2E tylko na smoke</strong>: aplikacja demo importuje paczke z rejestru i renderuje strone z dziesiecioma komponentami. To lapie zle spakowane exporty, brakujace pliki CSS i zepsute side effects - klase bledow, ktorej zaden test jednostkowy nie widzi, bo dziala na zrodlach.</li></ul><pre><code>// vitest.config.ts - progi, ktore realnie broni sie w CI\ntest: {\n  coverage: {\n    thresholds: { lines: 80, branches: 70 },\n    exclude: ["**/*.stories.tsx", "**/index.ts"]\n  },\n  retry: process.env.CI ? 1 : 0\n}</code></pre><p><strong>Flaky to dlug, nie niedogodnosc.</strong> Przy 3 procentach niestabilnych testow i suite liczacym 600 pozycji szansa, ze caly przebieg przejdzie, spada praktycznie do zera. Wprowadz twarda regule: test, ktory dwa razy w tygodniu padl bez zmiany kodu, zostaje oznaczony quarantine i ma wlasciciela z terminem. Bez tego zespol nauczy sie klikac "re-run" i CI przestaje cokolwiek znaczyc.</p><p><strong>Czego nie mierzyc.</strong> Pokrycie kodu powyzej 80 procent kupuje glownie testy pisane pod metryke. Lepszym wskaznikiem jest <em>escape rate</em>: ile bledow wykrytych w produkcji mialo szanse byc zlapanych przez istniejaca warstwe testow. Ta liczba, raportowana kwartalnie, przekonuje dyrektora znacznie skuteczniej niz wykres coverage.</p>',
          en: '<p>At principal level the test strategy is a budget document, not a technical preference. It states how many minutes the pipeline takes, what percentage of flakiness you accept, and who pays for maintenance. Without those three numbers the discussion degenerates into a holy war between Cypress and Playwright fans.</p><p><strong>Calibrating for a design system.</strong> Maintaining a component library for dozens of applications gives you a different risk profile than a product team. Your main failure mode is not "the button is broken", it is "the button behaves differently than yesterday across forty consumers". So the priorities look like this:</p><ul><li><strong>Component API contract tests</strong> - a snapshot of public props and events, generated from the types. A diff detected in a PR is a breaking change unless a changeset describes it.</li><li><strong>Visual regression on every story</strong>, in two themes and two widths (360 and 1280). Cost: with 400 stories that is around 1600 snapshots, 6-9 minutes on CI with sharding across 4 workers.</li><li><strong>A11y as a test, not an audit</strong> - <code>axe-core</code> on every story catches 30-40 percent of WCAG issues automatically. The rest needs a human and a screen reader, but that half should not eat reviewer time.</li><li><strong>E2E only as smoke</strong>: a demo app installs the package from the registry and renders a page with ten components. That catches broken export maps, missing CSS files and bad side effects - a class of bug no unit test sees, because unit tests run against source.</li></ul><pre><code>// vitest.config.ts - thresholds that survive contact with CI\ntest: {\n  coverage: {\n    thresholds: { lines: 80, branches: 70 },\n    exclude: ["**/*.stories.tsx", "**/index.ts"]\n  },\n  retry: process.env.CI ? 1 : 0\n}</code></pre><p><strong>Flakiness is debt, not an annoyance.</strong> At 3 percent flaky tests over a 600-test suite the chance of a fully green run drops close to zero. Set a hard rule: a test that fails twice in a week without a code change goes into quarantine with a named owner and a deadline. Without that, the team learns to hit "re-run" and CI stops meaning anything.</p><p><strong>What not to measure.</strong> Coverage above 80 percent mostly buys tests written for the metric. A better indicator is the <em>escape rate</em>: how many production bugs could have been caught by an existing test layer. Reported quarterly, that number convinces a director far more effectively than a coverage chart.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktory test najprawdopodobniej przezyje refaktor wewnetrzny komponentu?',
            en: 'Which test is most likely to survive an internal refactor of a component?'
          },
          options: [
            { pl: 'Sprawdzajacy, ze root ma klase chi-modal__header', en: 'One asserting the root has the chi-modal__header class' },
            { pl: 'Sprawdzajacy, ze Escape wywoluje onClose', en: 'One asserting that Escape triggers onClose' },
            { pl: 'Snapshot calego wyrenderowanego HTML', en: 'A snapshot of the entire rendered HTML' },
            { pl: 'Sprawdzajacy wartosc wewnetrznego stanu isOpen', en: 'One asserting the value of internal isOpen state' }
          ],
          correct: 1,
          explain: {
            pl: 'Testuje sie kontrakt widoczny dla uzytkownika i konsumenta, a nie strukture. Klasy, snapshoty HTML i stan wewnetrzny to szczegoly implementacyjne.',
            en: 'You test the contract visible to the user and the consumer, not the structure. Class names, HTML snapshots and internal state are implementation details.'
          }
        },
        {
          q: {
            pl: 'Dlaczego w design systemie testy wizualne maja wyzszy priorytet niz w zwyklej aplikacji?',
            en: 'Why does visual regression rank higher in a design system than in a normal app?'
          },
          options: [
            { pl: 'Bo sa szybsze niz testy jednostkowe', en: 'Because it is faster than unit testing' },
            { pl: 'Bo zastepuja testy dostepnosci', en: 'Because it replaces accessibility testing' },
            { pl: 'Bo zmiana o 4 piksele przechodzi wszystkie testy logiki, a rozjezdza layout u konsumentow', en: 'Because a 4-pixel change passes every logic test yet breaks layout in consumer apps' },
            { pl: 'Bo Storybook nie pozwala na inne rodzaje testow', en: 'Because Storybook does not allow other kinds of tests' }
          ],
          correct: 2,
          explain: {
            pl: 'Glowny tryb awarii biblioteki to niezamierzona zmiana wygladu propagujaca sie do wszystkich konsumentow. Zaden test logiki tego nie widzi.',
            en: 'The library main failure mode is an unintended visual change propagating to every consumer. No logic test can see that.'
          }
        },
        {
          q: {
            pl: 'Suite ma 600 testow, z czego 3 procent jest niestabilnych. Co z tego wynika?',
            en: 'A suite has 600 tests, 3 percent of them flaky. What follows?'
          },
          options: [
            { pl: 'Zielony przebieg staje sie praktycznie niemozliwy, wiec CI traci znaczenie', en: 'A fully green run becomes practically impossible, so CI loses meaning' },
            { pl: 'Wystarczy wlaczyc retry i problem znika', en: 'Turning on retries makes the problem go away' },
            { pl: 'To normalny poziom, nie wymaga dzialania', en: 'That is a normal level and needs no action' },
            { pl: 'Trzeba usunac testy jednostkowe i zostawic E2E', en: 'You should delete unit tests and keep only E2E' }
          ],
          correct: 0,
          explain: {
            pl: 'Przy takim odsetku prawie kazdy przebieg ma czerwony element, zespol uczy sie klikac re-run i sygnal z CI przestaje cokolwiek znaczyc. Kwarantanna z wlascicielem i terminem jest jedynym trwalym lekarstwem.',
            en: 'At that rate almost every run has a red item, the team learns to hit re-run, and the CI signal stops meaning anything. Quarantine with a named owner and a deadline is the only durable cure.'
          }
        },
        {
          q: {
            pl: 'Dyrektor pyta, czy jakosc rosnie. Ktory wskaznik jest najbardziej przekonujacy?',
            en: 'A director asks whether quality is improving. Which indicator is most convincing?'
          },
          options: [
            { pl: 'Pokrycie kodu wzroslo z 78 na 86 procent', en: 'Coverage went from 78 to 86 percent' },
            { pl: 'Liczba testow wzrosla o 400', en: 'The test count grew by 400' },
            { pl: 'Pipeline trwa o 2 minuty krocej', en: 'The pipeline is 2 minutes faster' },
            { pl: 'Escape rate: odsetek bledow produkcyjnych, ktore istniejaca warstwa testow mogla zlapac', en: 'Escape rate: the share of production bugs an existing test layer could have caught' }
          ],
          correct: 3,
          explain: {
            pl: 'Escape rate laczy testy z realnym skutkiem biznesowym i pokazuje, ktora warstwe warto wzmocnic. Coverage i liczba testow to metryki wysilku, nie efektu.',
            en: 'Escape rate ties testing to real business outcomes and shows which layer to strengthen. Coverage and test counts measure effort, not effect.'
          }
        }
      ]
    },

    {
      id: 'frontend-ci-cd',
      title: { pl: 'CI/CD dla frontendu', en: 'Frontend CI/CD' },
      minutes: 13,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6cd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="20" y="40" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="105" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Pull request</text><text x="105" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">changeset required</text><line x1="192" y1="72" x2="228" y2="72" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="232" y="40" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="317" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Gates - 6 min</text><text x="317" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">types, tests, budget</text><line x1="404" y1="72" x2="440" y2="72" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="444" y="40" width="176" height="64" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="532" y="68" font-size="14" fill="var(--text)" text-anchor="middle">Preview URL</text><text x="532" y="88" font-size="13" fill="var(--muted)" text-anchor="middle">per branch, disposable</text><line x1="532" y1="106" x2="532" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="444" y="154" width="176" height="64" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="532" y="182" font-size="14" fill="var(--text)" text-anchor="middle">Canary 5 percent</text><text x="532" y="202" font-size="13" fill="var(--muted)" text-anchor="middle">30 min soak</text><line x1="442" y1="186" x2="406" y2="186" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><rect x="232" y="154" width="170" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="317" y="182" font-size="14" fill="var(--ok)" text-anchor="middle">Prod 100 percent</text><text x="317" y="202" font-size="13" fill="var(--muted)" text-anchor="middle">immutable assets</text><path d="M232 200 L120 200 L120 130" fill="none" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6cd-arr)"/><text x="30" y="248" font-size="13" fill="var(--err)">rollback = repoint index.html to the previous build, 60 s</text><line x1="20" y1="272" x2="620" y2="272" stroke="var(--border)" stroke-width="2"/><text x="20" y="300" font-size="14" fill="var(--text)">Gate that actually blocks merges:</text><rect x="20" y="314" width="600" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="340" font-size="13" fill="var(--muted)">main bundle 168 kB gz / budget 170 kB - pass</text><text x="40" y="364" font-size="13" fill="var(--err)">new dependency adds 22 kB - fail, needs an explicit budget bump</text></svg>',
        caption: {
          pl: 'Sciezka commita: bramki, preview per branch, canary i natychmiastowy rollback. Budzet rozmiaru bundla jest bramka, ktora naprawde blokuje merge.',
          en: 'A commit path: gates, per-branch previews, canary and instant rollback. The bundle size budget is the gate that actually blocks merges.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden commit przechodzacy przez pipeline - lacznie z bramka, ktora go zatrzymuje.',
          en: 'One commit walking through the pipeline - including the gate that stops it.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="75" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="75" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">commit a1f2c9 - Button: new size token</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">changeset present: minor</text><text x="40" y="274" font-size="13" fill="var(--muted)">CODEOWNERS routed the review to the design system team</text></svg>',
            label: { pl: 'PR otwarty', en: 'PR opened' },
            note: {
              pl: 'Commit ladauje w PR. Changeset i CODEOWNERS decyduja, jaka wersja i kto recenzuje - zanim cokolwiek sie zbuduje.',
              en: 'The commit lands in a PR. A changeset and CODEOWNERS decide the version bump and the reviewer before anything even builds.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="205" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="205" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">running 6 jobs in parallel</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--ok)">typecheck 41 s - unit 38 s - a11y 55 s - visual 4 min 10 s</text><text x="40" y="274" font-size="13" fill="var(--muted)">size-limit still running</text></svg>',
            label: { pl: 'Bramki startuja', en: 'Gates running' },
            note: {
              pl: 'Wszystkie kontrole ida rownolegle, nie sekwencyjnie. Czas calego etapu to najwolniejszy job, czyli tutaj testy wizualne.',
              en: 'All checks run in parallel, not in sequence. Stage time equals the slowest job, here the visual tests.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/><text x="205" y="97" font-size="14" fill="var(--err)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="205" cy="160" r="10" fill="var(--err)"/><text x="20" y="200" font-size="14" fill="var(--err)">size-limit failed - merge blocked</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--err)">core.js 192 kB gz / budget 170 kB - over by 22 kB</text><text x="40" y="274" font-size="13" fill="var(--muted)">cause: date-fns imported as a whole namespace</text></svg>',
            label: { pl: 'Bramka blokuje', en: 'A gate blocks' },
            note: {
              pl: 'Budzet rozmiaru zatrzymuje merge z konkretna przyczyna. To najtansze miejsce, w ktorym da sie wylapac regresje wydajnosci.',
              en: 'The size budget stops the merge with a named cause. This is the cheapest place a performance regression can be caught.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="335" y="97" font-size="14" fill="var(--accent)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="335" cy="160" r="10" fill="var(--accent)"/><text x="20" y="200" font-size="14" fill="var(--text)">fixed with a named import - 169 kB gz</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">preview: pr-4821.ds.example.net - Storybook plus demo app</text><text x="40" y="274" font-size="13" fill="var(--muted)">designers review the real thing, not a screenshot in Figma</text></svg>',
            label: { pl: 'Preview per branch', en: 'Per-branch preview' },
            note: {
              pl: 'Po poprawce PR dostaje wlasny, jednorazowy URL. Recenzja designu odbywa sie na dzialajacym kodzie, a nie na obrazku.',
              en: 'After the fix the PR gets its own disposable URL. Design review happens against running code, not a picture.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/><text x="465" y="97" font-size="14" fill="var(--warn)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="580" y="97" font-size="14" fill="var(--muted)" text-anchor="middle">Prod</text><circle cx="465" cy="160" r="10" fill="var(--warn)"/><text x="20" y="200" font-size="14" fill="var(--text)">5 percent of sessions, 30 minute soak</text><rect x="20" y="220" width="600" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="250" font-size="13" fill="var(--muted)">JS error rate 0.11 vs 0.10 percent baseline - within noise</text><text x="40" y="274" font-size="13" fill="var(--muted)">LCP p75 2.3 s vs 2.3 s - no regression</text></svg>',
            label: { pl: 'Canary', en: 'Canary' },
            note: {
              pl: 'Piec procent ruchu przez pol godziny. Porownujesz blad JS i LCP z baseline, a nie z wrazeniem, ze dziala.',
              en: 'Five percent of traffic for half an hour. You compare JS error rate and LCP against a baseline, not against a feeling that it works.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="75" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">PR</text><rect x="150" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="205" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Gates</text><rect x="280" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="335" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Preview</text><rect x="410" y="60" width="110" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="465" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Canary</text><rect x="540" y="60" width="80" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/><text x="580" y="97" font-size="14" fill="var(--ok)" text-anchor="middle">Prod</text><circle cx="580" cy="160" r="10" fill="var(--ok)"/><path d="M560 180 L560 210 L120 210 L120 132" fill="none" stroke="var(--err)" stroke-width="2"/><text x="20" y="200" font-size="14" fill="var(--text)">100 percent - version 4.12.0 published</text><rect x="20" y="228" width="600" height="76" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="256" font-size="13" fill="var(--err)">rollback path stays armed: previous build is still on the CDN</text><text x="40" y="280" font-size="13" fill="var(--muted)">repoint the entry HTML, 60 s, no rebuild needed</text></svg>',
            label: { pl: 'Prod i rollback', en: 'Prod and rollback' },
            note: {
              pl: 'Sto procent ruchu, ale poprzedni build zostaje na CDN. Rollback to zmiana wskaznika, nie nowy deploy - stad 60 sekund zamiast 20 minut.',
              en: 'Full traffic, but the previous build stays on the CDN. Rollback is a pointer change, not a new deploy - hence 60 seconds instead of 20 minutes.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie kuchnie w restauracji, gdzie kazde danie przed wyjsciem na sale przechodzi przez ten sam rzad kontrolerow. Pierwszy sprawdza, czy talerz jest czysty. Drugi, czy nie ma w srodku czegos, na co ktos jest uczulony. Trzeci wazy porcje, bo obiecalismy goscom, ze bedzie 300 gramow, a nie 500.</p><p>Jesli ktorykolwiek kontroler powie "nie", danie wraca do kucharza. Nikt sie nie obraza - to szybsze niz przeprosiny przy stoliku.</p><p>Potem jest jeszcze jedna sztuczka. Nowego dania nie podajemy od razu wszystkim. Dajemy je najpierw jednemu stolikowi na pol godziny i patrzymy, czy zjedli. Dopiero jesli zjedli, idzie na cala sale.</p><p>A gdyby jednak cos byloby nie tak, stara wersja dania nadal czeka na kuchni. Wystarczy przelozyc karteczke i w minute wszyscy dostaja to, co dzialalo wczoraj.</p>',
          en: '<p>Picture a restaurant kitchen where every dish passes the same row of inspectors before it reaches the floor. The first checks the plate is clean. The second checks there is nothing inside that someone is allergic to. The third weighs the portion, because we promised guests 300 grams, not 500.</p><p>If any inspector says no, the dish goes back to the cook. Nobody takes offence - that is faster than apologising at the table.</p><p>Then there is one more trick. A new dish does not go out to everyone at once. It goes to a single table for half an hour and we watch whether they eat it. Only if they do does it go to the whole room.</p><p>And if something is still wrong, yesterday version of the dish is still sitting in the kitchen. Move one little card and within a minute everyone gets what worked yesterday.</p>'
        },
        school: {
          pl: '<p>Pipeline CI/CD to nie skrypt buildujacy paczke, tylko lista zdan, ktore chcesz miec udowodnione, zanim kod dotknie uzytkownika. Kazde zdanie to jeden job.</p><p>Dla biblioteki komponentow lista wyglada mniej wiecej tak: typy sie kompiluja, testy przechodza, dostepnosc nie ma nowych naruszen, nic nie zmienilo sie wizualnie bez zgody, rozmiar paczki miesci sie w budzecie, a wersja jest opisana w changesecie (male pliki opisujace, czy zmiana jest patch, minor czy major).</p><pre><code># .github/workflows/ci.yml - wszystko rownolegle\njobs:\n  check:\n    strategy:\n      matrix:\n        task: [typecheck, unit, a11y, visual, size]\n    steps:\n      - run: pnpm turbo run ${{ matrix.task }}</code></pre><p>Rownoleglosc jest kluczowa: czas etapu to czas najwolniejszego joba, a nie suma. Sekwencyjny pipeline na 12 minut po zrownolegleniu robi sie szescioma.</p><p>Druga polowa to CD, czyli dostarczanie. Trzy rzeczy zmieniaja tu wszystko:</p><ul><li><strong>Preview per branch</strong> - kazdy PR dostaje wlasny URL ze Storybookiem. Designer i product owner ogladaja dzialajacy kod, a nie zrzut ekranu.</li><li><strong>Canary</strong> - nowa wersja idzie najpierw do kilku procent ruchu i przez pol godziny porownujesz metryki bledow z baseline.</li><li><strong>Rollback jako zmiana wskaznika</strong> - stary build zostaje na CDN, wiec cofniecie to podmiana adresu, sekundy zamiast nowego builda.</li></ul><p>Zasada, ktora warto zapamietac: bramka, ktora nie blokuje merge, nie jest bramka, tylko powiadomieniem. Ostrzezenia sa ignorowane po dwoch tygodniach, zawsze.</p>',
          en: '<p>A CI/CD pipeline is not a script that builds a package, it is a list of statements you want proven before code touches a user. Each statement is one job.</p><p>For a component library the list looks roughly like this: types compile, tests pass, accessibility has no new violations, nothing changed visually without approval, package size fits the budget, and the version bump is described in a changeset (small files declaring whether a change is patch, minor or major).</p><pre><code># .github/workflows/ci.yml - everything in parallel\njobs:\n  check:\n    strategy:\n      matrix:\n        task: [typecheck, unit, a11y, visual, size]\n    steps:\n      - run: pnpm turbo run ${{ matrix.task }}</code></pre><p>Parallelism is the whole game: stage time is the slowest job, not the sum. A sequential 12-minute pipeline becomes six minutes once fanned out.</p><p>The other half is CD, the delivery side. Three things change everything here:</p><ul><li><strong>Per-branch previews</strong> - every PR gets its own URL with Storybook. Designers and product owners look at running code, not a screenshot.</li><li><strong>Canary</strong> - the new version goes to a few percent of traffic first, and for half an hour you compare error metrics against a baseline.</li><li><strong>Rollback as a pointer change</strong> - the old build stays on the CDN, so reverting swaps an address: seconds instead of a fresh build.</li></ul><p>One rule worth memorising: a gate that does not block the merge is not a gate, it is a notification. Warnings get ignored within two weeks, every single time.</p>'
        },
        pro: {
          pl: '<p>Pipeline jest interfejsem uzytkownika Twojej platformy. Kazda sekunda czekania mnozy sie przez liczbe PR-ow dziennie i liczbe inzynierow, a wynik placi organizacja. Przy 60 PR-ach dziennie skrocenie pipeline o 4 minuty to okolo 4 godziny odzyskanego skupienia kazdego dnia.</p><p><strong>Cache i graf zadan.</strong> Turborepo albo Nx z remote cache zamienia typowy przebieg z pelnego builda w odczyt artefaktow: przy dobrze ustawionych inputach 70-85 procent zadan konczy sie cache hitem w kilka sekund. Warunkiem jest higiena - jesli do inputow wpadnie <code>Date.now()</code> albo niezablokowany lockfile, cache nigdy nie trafia i placisz podwojnie.</p><pre><code>// turbo.json - build zalezy tylko od tego, co realnie zmienia wynik\n"build": {\n  "dependsOn": ["^build"],\n  "inputs": ["src/**", "package.json", "tsconfig.json"],\n  "outputs": ["dist/**"]\n}</code></pre><p><strong>Publikacja biblioteki.</strong> Changesets plus <code>npm publish --provenance</code> daje wersjonowanie oparte o intencje autora i podpisany lancuch pochodzenia artefaktu. Publikuj z jednego, chronionego workflow z OIDC zamiast dlugozyjacego tokenu w sekretach - wyciek tokenu npm w duzej firmie to incydent na poziomie SOC, nie ticket.</p><p><strong>Kanaly wydawnicze.</strong> Trzy tagi wystarcza: <code>next</code> z kazdego mergea do main, <code>latest</code> co dwa tygodnie, <code>lts</code> dla aplikacji, ktore nie moga sie ruszac czesciej niz kwartalnie. Zespoly produktowe same wybieraja tempo ryzyka, a Ty nie musisz negocjowac kazdego wydania osobno.</p><p><strong>Bramki, ktore realnie ratuja.</strong> Poza testami warto miec trzy: <em>size-limit</em> z twardym progiem per entry point, <em>diff API</em> (na przyklad api-extractor) wykrywajacy zmiany publicznych typow bez majora, oraz <em>skan zaleznosci</em> odrzucajacy nowe paczki bez lockfile i bez provenance. Kazda z nich musi byc required check w ustawieniach brancha, inaczej jest ozdoba.</p><p><strong>Metryki, ktore raportujesz w gore.</strong> Cztery liczby DORA przetlumaczone na frontend: czestotliwosc wydan (ile razy dziennie), lead time (od mergea do produkcji), change failure rate (jaki procent wydan wymagal rollbacku) i MTTR (mediana czasu do rollbacku). Zdrowy design system w duzym telco: wydania codziennie, lead time ponizej 20 minut, CFR ponizej 10 procent, MTTR ponizej 5 minut. Te cztery liczby sa jezykiem, w ktorym dyrektor rozumie, dlaczego prosisz o etat na platforme.</p>',
          en: '<p>The pipeline is the user interface of your platform. Every second of waiting multiplies by PRs per day and engineers on the org chart, and the organisation pays the bill. At 60 PRs a day, cutting four minutes off the pipeline returns roughly four hours of focus daily.</p><p><strong>Cache and the task graph.</strong> Turborepo or Nx with a remote cache turns the typical run from a full build into an artifact download: with well-defined inputs, 70-85 percent of tasks finish as cache hits within seconds. The precondition is hygiene - if <code>Date.now()</code> or an unpinned lockfile leaks into the inputs, you never hit the cache and pay twice.</p><pre><code>// turbo.json - build depends only on what actually changes the output\n"build": {\n  "dependsOn": ["^build"],\n  "inputs": ["src/**", "package.json", "tsconfig.json"],\n  "outputs": ["dist/**"]\n}</code></pre><p><strong>Publishing the library.</strong> Changesets plus <code>npm publish --provenance</code> gives you intent-based versioning and a signed provenance chain for the artifact. Publish from a single protected workflow using OIDC rather than a long-lived token in secrets - a leaked npm token at a large company is a SOC incident, not a ticket.</p><p><strong>Release channels.</strong> Three tags are enough: <code>next</code> from every merge to main, <code>latest</code> every two weeks, and <code>lts</code> for apps that cannot move more often than quarterly. Product teams pick their own risk cadence and you stop negotiating each release individually.</p><p><strong>Gates that genuinely save you.</strong> Beyond tests, three are worth having: <em>size-limit</em> with a hard threshold per entry point, an <em>API diff</em> (api-extractor, for example) catching public type changes without a major bump, and a <em>dependency scan</em> rejecting new packages without a lockfile entry or provenance. Each must be a required check in branch protection, otherwise it is decoration.</p><p><strong>Metrics you report upward.</strong> The four DORA numbers translated to frontend: deployment frequency (times per day), lead time (merge to production), change failure rate (share of releases needing a rollback) and MTTR (median time to roll back). A healthy design system at a large telco: daily releases, lead time under 20 minutes, CFR under 10 percent, MTTR under 5 minutes. Those four numbers are the language in which a director understands why you are asking for a platform headcount.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Pipeline trwa 12 minut sekwencyjnie: typy 2, unit 2, a11y 1, wizualne 5, rozmiar 2. Ile potrwa po zrownolegleniu?',
            en: 'A sequential pipeline takes 12 minutes: types 2, unit 2, a11y 1, visual 5, size 2. How long after fanning out?'
          },
          options: [
            { pl: 'Okolo 12 minut, rownoleglosc nic nie zmienia', en: 'About 12 minutes, parallelism changes nothing' },
            { pl: 'Okolo 5 minut, czyli tyle co najwolniejszy job', en: 'About 5 minutes, the slowest job' },
            { pl: 'Okolo 2 minut, czyli srednia', en: 'About 2 minutes, the average' },
            { pl: 'Okolo 6 minut, czyli polowa sumy', en: 'About 6 minutes, half the sum' }
          ],
          correct: 1,
          explain: {
            pl: 'Przy rownoleglych jobach czas etapu to czas najdluzszego z nich. Dlatego optymalizacje warto kierowac na najwolniejszy job, a nie na sume.',
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
            { pl: 'Bo CDN ma szybszy cache dla starych plikow', en: 'Because the CDN caches older files faster' },
            { pl: 'Bo poprzedni build juz lezy na CDN i cofniecie to zmiana wskaznika, a nie budowanie', en: 'Because the previous build is already on the CDN, so reverting is a pointer change, not a build' },
            { pl: 'Bo rollback dotyczy tylko 5 procent ruchu', en: 'Because a rollback only affects 5 percent of traffic' }
          ],
          correct: 2,
          explain: {
            pl: 'Niemutowalne, wersjonowane artefakty sprawiaja, ze wszystkie stare wersje wciaz istnieja. Cofasz sie, przestawiajac wejscie na poprzedni build.',
            en: 'Immutable versioned artifacts mean every old version still exists. You revert by repointing the entry at the previous build.'
          }
        },
        {
          q: {
            pl: 'Zespol dodaje kontrole rozmiaru bundla, ale ustawia ja jako ostrzezenie zamiast blokady. Co sie stanie?',
            en: 'A team adds a bundle size check but configures it as a warning instead of a blocker. What happens?'
          },
          options: [
            { pl: 'Ostrzezenie zostanie zignorowane w ciagu kilku tygodni i regresje beda przechodzic', en: 'The warning gets ignored within weeks and regressions sail through' },
            { pl: 'Ostrzezenia dzialaja tak samo jak blokady, tylko lagodniej', en: 'Warnings work the same as blockers, just more gently' },
            { pl: 'Bundle sam sie zoptymalizuje przy nastepnym buildzie', en: 'The bundle optimises itself on the next build' },
            { pl: 'Ostrzezenie zablokuje deploy na produkcje', en: 'The warning will block the production deploy' }
          ],
          correct: 0,
          explain: {
            pl: 'Bramka, ktora nie blokuje merge, jest powiadomieniem. Jesli progu naprawde nie da sie utrzymac, lepiej podniesc go swiadomie w PR niz zostawic ostrzezenie.',
            en: 'A gate that does not block the merge is a notification. If the threshold truly cannot hold, raise it deliberately in a PR rather than leaving a warning.'
          }
        },
        {
          q: {
            pl: 'Ktora praktyka publikowania biblioteki najlepiej ogranicza ryzyko supply chain w duzej firmie?',
            en: 'Which publishing practice best limits supply chain risk at a large company?'
          },
          options: [
            { pl: 'Publikowanie z laptopa maintainera z osobistym tokenem npm', en: 'Publishing from the maintainer laptop with a personal npm token' },
            { pl: 'Publikowanie z jednego chronionego workflow przez OIDC, z provenance', en: 'Publishing from one protected workflow via OIDC, with provenance' },
            { pl: 'Publikowanie recznie tylko w piatki, po przegladzie', en: 'Publishing manually on Fridays only, after review' },
            { pl: 'Trzymanie tokenu npm w zmiennej srodowiskowej wszystkich repozytoriow', en: 'Storing the npm token in an env var across all repositories' }
          ],
          correct: 1,
          explain: {
            pl: 'OIDC eliminuje dlugozyjacy sekret, a provenance daje podpisany lancuch: wiadomo, ktory commit i ktory workflow wyprodukowal artefakt.',
            en: 'OIDC removes the long-lived secret and provenance gives a signed chain: you can tell which commit and which workflow produced the artifact.'
          }
        }
      ]
    },

    {
      id: 'error-observability',
      title: { pl: 'Obserwowalnosc bledow', en: 'Error observability' },
      minutes: 12,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6ob-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="20" y="46" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="105" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Browser</text><text x="105" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">minified stack, no names</text><line x1="192" y1="81" x2="228" y2="81" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="232" y="46" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="317" y="74" font-size="14" fill="var(--text)" text-anchor="middle">SDK</text><text x="317" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">release, user, breadcrumbs</text><line x1="404" y1="81" x2="440" y2="81" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="444" y="46" width="176" height="70" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="532" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Sentry issue</text><text x="532" y="96" font-size="13" fill="var(--muted)" text-anchor="middle">grouped by fingerprint</text><line x1="532" y1="118" x2="532" y2="158" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="444" y="162" width="176" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="532" y="190" font-size="14" fill="var(--text)" text-anchor="middle">Alert rule</text><text x="532" y="212" font-size="13" fill="var(--muted)" text-anchor="middle">new in latest release</text><line x1="442" y1="197" x2="406" y2="197" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6ob-arr)"/><rect x="232" y="162" width="170" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="317" y="190" font-size="14" fill="var(--ok)" text-anchor="middle">Owning team</text><text x="317" y="212" font-size="13" fill="var(--muted)" text-anchor="middle">routed by component</text><rect x="20" y="266" width="600" height="112" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="294" font-size="14" fill="var(--text)">Without a source map upload this whole chain is useless:</text><text x="40" y="320" font-size="13" fill="var(--err)">TypeError: n is not a function - at t (main.9f2a.js:1:48211)</text><text x="40" y="346" font-size="13" fill="var(--ok)">TypeError: onSelect is not a function - Dropdown.tsx:82</text><text x="40" y="370" font-size="13" fill="var(--muted)">same event, one has a name and a line you can act on</text></svg>',
        caption: {
          pl: 'Droga bledu: przegladarka, SDK, grupowanie, alert i wlasciciel. Bez wgranych source map caly lancuch konczy sie nieczytelnym stackiem.',
          en: 'The path of an error: browser, SDK, grouping, alert, owner. Without uploaded source maps the whole chain ends in an unreadable stack.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Zycie jednego bledu: od nieczytalnego stacku po alert u wlasciwego zespolu.',
          en: 'The life of one error: from an unreadable stack to an alert at the right team.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="3"/><text x="85" y="76" font-size="14" fill="var(--err)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">18:42 - a user clicks a filter in the billing app</text><text x="40" y="204" font-size="13" fill="var(--err)">TypeError: n is not a function</text><text x="40" y="228" font-size="13" fill="var(--muted)">at t (main.9f2a.js:1:48211)</text><text x="40" y="252" font-size="13" fill="var(--muted)">nobody sees it - the user just reloads the page</text><text x="40" y="280" font-size="13" fill="var(--muted)">this is the default state of most frontends</text></svg>',
            label: { pl: 'Blad w przegladarce', en: 'The error in the browser' },
            note: {
              pl: 'Blad wystapil u uzytkownika i zniknal razem z zakladka. Bez telemetrii nie istnieje w zadnym systemie.',
              en: 'The error happened in a user session and vanished with the tab. Without telemetry it exists in no system at all.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><text x="245" y="76" font-size="14" fill="var(--accent)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">the SDK attaches context and applies the source map</text><text x="40" y="204" font-size="13" fill="var(--ok)">TypeError: onSelect is not a function - Dropdown.tsx:82</text><text x="40" y="228" font-size="13" fill="var(--muted)">release 4.11.3 - design-system 4.11.3 - Chrome 141</text><text x="40" y="252" font-size="13" fill="var(--muted)">breadcrumbs: route change, 2 clicks, one failed fetch</text><text x="40" y="280" font-size="13" fill="var(--muted)">PII scrubbed before the payload leaves the page</text></svg>',
            label: { pl: 'Kontekst i source mapy', en: 'Context and source maps' },
            note: {
              pl: 'Wersja releasu, breadcrumbs i source mapy zamieniaja szum w konkretna linie kodu. Bez tego reszta lancucha nie ma sensu.',
              en: 'Release version, breadcrumbs and source maps turn noise into a concrete line of code. Without them the rest of the chain is pointless.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="3"/><text x="405" y="76" font-size="14" fill="var(--accent2)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="560" y="76" font-size="14" fill="var(--muted)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">3400 events collapse into ONE issue by fingerprint</text><text x="40" y="204" font-size="13" fill="var(--muted)">users affected: 212 - sessions: 3400 - first seen: 18:42</text><text x="40" y="228" font-size="13" fill="var(--muted)">98 percent of events come from design-system 4.11.3</text><text x="40" y="252" font-size="13" fill="var(--muted)">6 consumer apps affected, all upgraded this morning</text><text x="40" y="280" font-size="13" fill="var(--muted)">grouping is what makes the volume readable</text></svg>',
            label: { pl: 'Grupowanie', en: 'Grouping' },
            note: {
              pl: 'Tysiace zdarzen skladaja sie w jedno zgloszenie. Rozklad po wersjach od razu wskazuje winowajce: konkretne wydanie biblioteki.',
              en: 'Thousands of events collapse into one issue. The version breakdown immediately names the culprit: one library release.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="3"/><text x="560" y="76" font-size="14" fill="var(--warn)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">alert rule: new issue in the latest release, 50 users in 5 min</text><text x="40" y="204" font-size="13" fill="var(--muted)">routed by component path to the design system on-call</text><text x="40" y="228" font-size="13" fill="var(--muted)">18:49 - 7 minutes from first event to a human</text><text x="40" y="252" font-size="13" fill="var(--muted)">no page for issues older than the current release</text><text x="40" y="280" font-size="13" fill="var(--muted)">precision matters more than recall for paging</text></svg>',
            label: { pl: 'Alert do wlasciciela', en: 'Alert to the owner' },
            note: {
              pl: 'Regula alertu jest waska celowo: tylko nowe zgloszenia w najnowszym wydaniu. Alert, ktory budzi bez powodu, przestaje byc czytany.',
              en: 'The alert rule is deliberately narrow: only new issues in the newest release. An alert that wakes people for nothing stops being read.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><rect x="20" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="85" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Browser</text><rect x="180" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="245" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">SDK</text><rect x="340" y="40" width="130" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="405" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Issue</text><rect x="500" y="40" width="120" height="60" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="3"/><text x="560" y="76" font-size="14" fill="var(--ok)" text-anchor="middle">Owner</text><rect x="20" y="140" width="600" height="160" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="40" y="172" font-size="14" fill="var(--text)">18:53 - rollback to 4.11.2, error rate back to baseline</text><text x="40" y="204" font-size="13" fill="var(--muted)">19:40 - real fix shipped as 4.11.4, issue marked resolved</text><text x="40" y="228" font-size="13" fill="var(--muted)">a regression test now covers the missing onSelect guard</text><text x="40" y="252" font-size="13" fill="var(--muted)">the issue auto-reopens if the fingerprint returns</text><text x="40" y="280" font-size="13" fill="var(--muted)">MTTR 11 min - the number you report, not the anecdote</text></svg>',
            label: { pl: 'Naprawa i domkniecie petli', en: 'Fix and closing the loop' },
            note: {
              pl: 'Najpierw rollback, potem prawdziwa naprawa i test regresyjny. Zgloszenie samo sie otworzy, jesli ten sam fingerprint wroci.',
              en: 'Rollback first, then the real fix plus a regression test. The issue reopens itself if the same fingerprint comes back.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze prowadzisz sklep, ale nie stoisz w nim. Klienci przychodza, czasem cos sie psuje - drzwi sie zacinaja, kasa nie drukuje paragonu - a Ty dowiadujesz sie o tym tylko wtedy, gdy ktos wyjatkowo uparty do Ciebie zadzwoni. Wiekszosc ludzi po prostu wychodzi i nie wraca.</p><p>Obserwowalnosc to zainstalowanie w sklepie malego pomocnika, ktory za kazdym razem, gdy cos pojdzie zle, zapisuje karteczke: co sie stalo, o ktorej, przy ktorych drzwiach i co klient robil chwile wczesniej.</p><p>Potem pomocnik robi jeszcze dwie madre rzeczy. Po pierwsze, sklada wszystkie karteczki o tych samych zacinajacych sie drzwiach w jeden stosik, zeby nie utonac w papierze. Po drugie, jesli w piec minut uzbiera sie piecdziesiat takich karteczek, dzwoni do Ciebie od razu, a nie na koniec miesiaca.</p>',
          en: '<p>Imagine you own a shop but you are never in it. Customers come in, sometimes things break - a door jams, the till will not print a receipt - and you only hear about it when someone unusually stubborn calls you. Most people just leave and never come back.</p><p>Observability is putting a small helper in the shop who, every time something goes wrong, writes a note: what happened, at what time, at which door, and what the customer was doing a moment earlier.</p><p>Then the helper does two more clever things. First, it stacks every note about the same jamming door into one pile so you do not drown in paper. Second, if fifty such notes pile up within five minutes, it calls you straight away rather than at the end of the month.</p>'
        },
        school: {
          pl: '<p>Frontend to jedyna czesc systemu, ktora dziala na cudzym komputerze. Nie masz tam logow serwera ani dostepu do konsoli. Jesli nie wyslesz sobie informacji o bledzie, ta informacja przepada razem z zamknieta zakladka.</p><p>Minimalny sensowny zestaw sklada sie z czterech elementow.</p><ul><li><strong>Przechwytywanie</strong> - SDK (np. Sentry) podpina sie pod <code>window.onerror</code>, <code>unhandledrejection</code> i granice bledow w frameworku.</li><li><strong>Kontekst</strong> - sam komunikat nie wystarczy. Potrzebujesz wersji releasu, wersji biblioteki, przegladarki i breadcrumbs, czyli sladu ostatnich akcji uzytkownika.</li><li><strong>Source mapy</strong> - bez nich stack wyglada tak: <code>at t (main.9f2a.js:1:48211)</code>. Po wgraniu source map ten sam blad to <code>Dropdown.tsx:82</code>. Mapy wysylasz z CI i nie publikujesz ich na produkcji.</li><li><strong>Grupowanie i alerty</strong> - trzy tysiace zdarzen to jedno zgloszenie, a alert odpala sie tylko wtedy, gdy zgloszenie jest nowe i dotyczy najnowszego wydania.</li></ul><pre><code>Sentry.init({\n  release: "design-system@" + VERSION,\n  tracesSampleRate: 0.1,\n  beforeSend: (e) =&gt; scrubPii(e)\n});</code></pre><p>Osobna, rownie wazna warstwa to <strong>RUM</strong> (Real User Monitoring - pomiar u prawdziwych uzytkownikow). Bledy mowia, co peklo. RUM mowi, co jest wolne u ludzi na starszych telefonach w gorszej sieci, czego nigdy nie zobaczysz na swoim laptopie.</p><p>Zasada praktyczna: alert, ktory odpala sie codziennie i nikt nic z nim nie robi, jest gorszy niz brak alertu, bo uczy zespol ignorowania powiadomien.</p>',
          en: '<p>The frontend is the only part of the system that runs on somebody else computer. There are no server logs there and no console access. If you do not send the error information to yourself, it disappears along with the closed tab.</p><p>A minimum sensible setup has four parts.</p><ul><li><strong>Capture</strong> - an SDK (Sentry, for example) hooks into <code>window.onerror</code>, <code>unhandledrejection</code> and the framework error boundaries.</li><li><strong>Context</strong> - the message alone is not enough. You need the release version, the library version, the browser and breadcrumbs, meaning a trail of the last user actions.</li><li><strong>Source maps</strong> - without them a stack reads <code>at t (main.9f2a.js:1:48211)</code>. With maps uploaded, the same error is <code>Dropdown.tsx:82</code>. Upload them from CI and never publish them to production.</li><li><strong>Grouping and alerts</strong> - three thousand events become one issue, and the alert only fires when the issue is new and belongs to the latest release.</li></ul><pre><code>Sentry.init({\n  release: "design-system@" + VERSION,\n  tracesSampleRate: 0.1,\n  beforeSend: (e) =&gt; scrubPii(e)\n});</code></pre><p>A separate and equally important layer is <strong>RUM</strong> (Real User Monitoring). Errors tell you what broke. RUM tells you what is slow for people on older phones and worse networks - something you will never see on your laptop.</p><p>A practical rule: an alert that fires daily and that nobody acts on is worse than no alert, because it trains the team to ignore notifications.</p>'
        },
        pro: {
          pl: '<p>Utrzymujac design system, jestes w nietypowej pozycji: bledy z Twojego kodu wystepuja w cudzych aplikacjach, na cudzych projektach Sentry, w cudzych budzetach. Sama instrumentacja nie wystarczy - potrzebujesz sposobu, by zobaczyc lacznie to, co dzieje sie u czterdziestu konsumentow.</p><p><strong>Wzorzec, ktory dziala.</strong> Biblioteka nie inicjalizuje wlasnego klienta telemetrii (dwa klienty w jednej stronie to podwojne zdarzenia i wojna o <code>window.onerror</code>). Zamiast tego udostepnia cienkie API zdarzen, ktore aplikacja podpina pod swoj istniejacy klient, a Ty dostajesz zagregowany widok przez tagi:</p><pre><code>// w bibliotece: nie znasz dostawcy telemetrii\nexport function onDsError(handler) { sinks.push(handler); }\n\n// w aplikacji konsumenta\nonDsError((e) =&gt; Sentry.captureException(e.error, {\n  tags: { ds_version: e.dsVersion, ds_component: e.component }\n}));</code></pre><p>Tagi <code>ds_component</code> i <code>ds_version</code> sa cala wartoscia tego rozwiazania: pozwalaja zapytac "ile bledow pochodzi z Dropdown w 4.11.x we wszystkich aplikacjach" i skierowac alert do wlasciciela komponentu, nie do zespolu produktowego, ktory tylko go uzyl.</p><p><strong>Sampling i koszt.</strong> Bledy zbieraj w stu procentach, tracing przy 5-10 procentach, session replay przy 1 procencie sesji plus 100 procent sesji z bledem. Przy 20 milionach odslon miesiecznie w duzym telco nieprzemyslany sampling zamienia sie w rachunek rzedu kilkunastu tysiecy dolarow miesiecznie za dane, ktorych nikt nie czyta. Ustaw takze <code>ignoreErrors</code> na klasyczne smieci: <code>ResizeObserver loop limit exceeded</code>, bledy z rozszerzen przegladarki, <code>Non-Error promise rejection</code> z third party.</p><p><strong>Prywatnosc.</strong> W telco w zasiegu RODO logi frontendu to dane osobowe. Numer telefonu w URL, adres w formularzu, identyfikator abonenta w breadcrumb - wszystko to musi byc wyciete w <code>beforeSend</code>, a nie po stronie dostawcy. Session replay wlaczasz z maskowaniem domyslnie wlaczonym i z jawna zgoda prawnika, nie inaczej.</p><p><strong>SLO zamiast wykresow.</strong> Ustal budzet bledow: na przyklad 99,5 procent sesji bez nieobsluzonego wyjatku w skali tygodnia. Gdy budzet sie wyczerpie, priorytetem tygodnia staje sie stabilnosc, a nie nowe funkcje. To jedyna znana mi konstrukcja, ktora zamienia dyskusje o jakosci z opinii w regule, ktora obowiazuje takze wtedy, gdy jest presja na deadline.</p>',
          en: '<p>Maintaining a design system puts you in an unusual position: errors from your code happen in other people applications, in other people Sentry projects, on other people budgets. Instrumentation alone is not enough - you need a way to see, in aggregate, what is happening across forty consumers.</p><p><strong>The pattern that works.</strong> The library does not initialise its own telemetry client (two clients on one page means duplicated events and a fight over <code>window.onerror</code>). Instead it exposes a thin event API the app wires into its existing client, and you get the aggregate view through tags:</p><pre><code>// in the library: you do not know the telemetry vendor\nexport function onDsError(handler) { sinks.push(handler); }\n\n// in the consumer app\nonDsError((e) =&gt; Sentry.captureException(e.error, {\n  tags: { ds_version: e.dsVersion, ds_component: e.component }\n}));</code></pre><p>The <code>ds_component</code> and <code>ds_version</code> tags are the entire value here: they let you ask "how many errors come from Dropdown in 4.11.x across all apps" and route the alert to the component owner rather than to a product team that merely used it.</p><p><strong>Sampling and cost.</strong> Capture errors at 100 percent, tracing at 5-10 percent, session replay at 1 percent of sessions plus 100 percent of sessions containing an error. At 20 million monthly page views in a large telco, careless sampling turns into a bill in the low tens of thousands of dollars a month for data nobody reads. Also set <code>ignoreErrors</code> for the classic garbage: <code>ResizeObserver loop limit exceeded</code>, browser extension errors, third-party <code>Non-Error promise rejection</code>.</p><p><strong>Privacy.</strong> In a GDPR-scoped telco, frontend logs are personal data. A phone number in a URL, an address in a form, a subscriber id in a breadcrumb - all of that must be stripped in <code>beforeSend</code>, on your side, not at the vendor. Session replay ships with masking on by default and with explicit legal sign-off, never otherwise.</p><p><strong>SLOs instead of dashboards.</strong> Set an error budget: for instance 99.5 percent of weekly sessions free of an unhandled exception. When the budget is spent, stability becomes the priority for the week instead of new features. That is the only construct I know that turns quality from an opinion into a rule that still holds when a deadline is pressing.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego bez wgranych source map raport bledu jest niemal bezuzyteczny?',
            en: 'Why is an error report nearly useless without uploaded source maps?'
          },
          options: [
            { pl: 'Bo stack pokazuje zminifikowane nazwy i offsety w jednej linii bundla', en: 'Because the stack shows minified names and offsets in a single bundle line' },
            { pl: 'Bo bez map SDK nie wysyla zadnych zdarzen', en: 'Because without maps the SDK sends no events at all' },
            { pl: 'Bo mapy sa potrzebne do grupowania po uzytkownikach', en: 'Because maps are needed to group by user' },
            { pl: 'Bo przegladarki blokuja raportowanie bez map', en: 'Because browsers block reporting without maps' }
          ],
          correct: 0,
          explain: {
            pl: 'Mapy tlumacza pozycje w zminifikowanym pliku na plik i linie zrodlowa. Bez nich masz komunikat bez adresu, wiec nie wiesz, gdzie szukac.',
            en: 'Maps translate a position in the minified file into a source file and line. Without them you have a message with no address, so nowhere to look.'
          }
        },
        {
          q: {
            pl: 'Biblioteka komponentow chce zbierac wlasna telemetrie bledow w aplikacjach konsumentow. Co jest najlepszym rozwiazaniem?',
            en: 'A component library wants its own error telemetry inside consumer apps. What is the best approach?'
          },
          options: [
            { pl: 'Zainicjalizowac wlasnego klienta Sentry wewnatrz biblioteki', en: 'Initialise its own Sentry client inside the library' },
            { pl: 'Podpiac wlasny handler pod window.onerror w bibliotece', en: 'Attach its own window.onerror handler in the library' },
            { pl: 'Wystawic cienkie API zdarzen, ktore aplikacja podpina pod swojego klienta, plus tagi ds_component i ds_version', en: 'Expose a thin event API the app wires into its own client, plus ds_component and ds_version tags' },
            { pl: 'Nie zbierac nic i polegac na zglaszaniu bledow przez zespoly', en: 'Collect nothing and rely on teams reporting bugs' }
          ],
          correct: 2,
          explain: {
            pl: 'Drugi klient duplikuje zdarzenia i walczy o globalne handlery. Cienki interfejs plus tagi daje zagregowany widok bez przejmowania kontroli nad strona konsumenta.',
            en: 'A second client duplicates events and fights over global handlers. A thin interface plus tags gives the aggregate view without seizing control of the consumer page.'
          }
        },
        {
          q: {
            pl: 'Ktora konfiguracja samplingu jest rozsadna przy 20 milionach odslon miesiecznie?',
            en: 'Which sampling setup is sensible at 20 million monthly page views?'
          },
          options: [
            { pl: 'Bledy 100 procent, tracing 5-10 procent, replay 1 procent plus wszystkie sesje z bledem', en: 'Errors 100 percent, tracing 5-10 percent, replay 1 percent plus all sessions with an error' },
            { pl: 'Wszystko po 100 procent, dane zawsze sie przydaja', en: 'Everything at 100 percent, data always comes in handy' },
            { pl: 'Bledy 10 procent, reszta wylaczona', en: 'Errors at 10 percent, everything else off' },
            { pl: 'Replay 100 procent, bledy 1 procent', en: 'Replay 100 percent, errors 1 percent' }
          ],
          correct: 0,
          explain: {
            pl: 'Bledow nie samplujesz, bo rzadkie awarie sa najciekawsze. Tracing i replay samplujesz agresywnie, bo to one generuja rachunek - z wyjatkiem sesji, w ktorych cos peklo.',
            en: 'You never sample errors, because rare failures are the interesting ones. Tracing and replay get sampled hard, since they drive the bill - except for sessions where something broke.'
          }
        },
        {
          q: {
            pl: 'Po co ustawiac SLO typu 99,5 procent sesji bez nieobsluzonego wyjatku?',
            en: 'Why set an SLO such as 99.5 percent of sessions free of an unhandled exception?'
          },
          options: [
            { pl: 'Zeby miec ladny wykres dla zarzadu', en: 'To have a nice chart for management' },
            { pl: 'Zeby wyczerpany budzet bledow automatycznie zmienil priorytet zespolu na stabilnosc', en: 'So that a spent error budget automatically shifts the team priority to stability' },
            { pl: 'Zeby ograniczyc koszty narzedzia do monitoringu', en: 'To reduce the cost of the monitoring tool' },
            { pl: 'Zeby zastapic testy jednostkowe pomiarem produkcyjnym', en: 'To replace unit tests with production measurement' }
          ],
          correct: 1,
          explain: {
            pl: 'SLO z budzetem bledow zamienia jakosc z opinii w regule, ktora obowiazuje takze pod presja deadline. To jego jedyna prawdziwa funkcja.',
            en: 'An SLO with an error budget turns quality from an opinion into a rule that holds even under deadline pressure. That is its one real function.'
          }
        }
      ]
    },

    {
      id: 'frontend-security',
      title: { pl: 'Bezpieczenstwo frontendu', en: 'Frontend security' },
      minutes: 13,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6sec-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--err)"/></marker></defs><text x="20" y="28" font-size="14" fill="var(--muted)">attack path</text><text x="380" y="28" font-size="14" fill="var(--muted)">control that stops it</text><rect x="20" y="42" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="68" font-size="14" fill="var(--text)">User content into innerHTML</text><text x="40" y="90" font-size="13" fill="var(--muted)">a tooltip that renders raw HTML</text><line x1="344" y1="75" x2="376" y2="75" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="42" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="68" font-size="14" fill="var(--ok)">Text nodes by default</text><text x="400" y="90" font-size="13" fill="var(--muted)">opt-in HTML plus sanitizer</text><rect x="20" y="124" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="150" font-size="14" fill="var(--text)">Third-party tag manager script</text><text x="40" y="172" font-size="13" fill="var(--muted)">marketing adds it without review</text><line x1="344" y1="157" x2="376" y2="157" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="124" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="150" font-size="14" fill="var(--ok)">CSP with nonces</text><text x="400" y="172" font-size="13" fill="var(--muted)">strict-dynamic, no unsafe-inline</text><rect x="20" y="206" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="232" font-size="14" fill="var(--text)">Compromised npm dependency</text><text x="40" y="254" font-size="13" fill="var(--muted)">postinstall script, minor bump</text><line x1="344" y1="239" x2="376" y2="239" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="206" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="232" font-size="14" fill="var(--ok)">Lockfile, provenance</text><text x="400" y="254" font-size="13" fill="var(--muted)">ignore-scripts, internal registry</text><rect x="20" y="288" width="320" height="66" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="314" font-size="14" fill="var(--text)">Token in localStorage</text><text x="40" y="336" font-size="13" fill="var(--muted)">readable by any injected script</text><line x1="344" y1="321" x2="376" y2="321" stroke="var(--err)" stroke-width="2" marker-end="url(#fa6sec-arr)"/><rect x="380" y="288" width="240" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="400" y="314" font-size="14" fill="var(--ok)">HttpOnly SameSite cookie</text><text x="400" y="336" font-size="13" fill="var(--muted)">JS cannot read it at all</text><text x="20" y="390" font-size="13" fill="var(--muted)">Every control above is cheap to add before launch and expensive to retrofit after.</text></svg>',
        caption: {
          pl: 'Cztery typowe drogi ataku na frontend i kontrola, ktora kazda z nich zamyka. Kazda jest tania przed startem i droga do wprowadzenia pozniej.',
          en: 'Four typical frontend attack paths and the control that closes each one. Every one is cheap before launch and expensive to retrofit.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie tablice ogloszen w bloku. Kazdy moze przypiac karteczke. Ktos zlosliwy przypina karteczke, na ktorej pisze: "Uwaga, nowa zasada: zostaw klucze u dozorcy". Ludzie czytaja i robia to, co tam napisano, bo tablica wyglada oficjalnie.</p><p>Tak dziala najczestszy atak na strony: ktos wkleja swoj tekst tam, gdzie strona spodziewa sie zwyklego napisu, a przegladarka traktuje to jak instrukcje.</p><p>Sa trzy proste obrony. Pierwsza: tablica przyjmuje tylko zwykly tekst, nigdy instrukcji - karteczka moze cos mowic, ale nikt jej nie wykonuje. Druga: przy wejsciu wisi lista, kto w ogole moze cos przypinac, i wszystko spoza listy jest zdejmowane. Trzecia: klucze nie leza w skrzynce, do ktorej kazdy siega, tylko u kogos, kto nie oddaje ich obcym, nawet jesli ladnie prosza.</p>',
          en: '<p>Picture a noticeboard in an apartment block. Anyone can pin a note. Someone malicious pins one saying: "New rule: leave your keys with the caretaker". People read it and do what it says, because the board looks official.</p><p>That is how the most common attack on websites works: someone pastes their text where the page expected an ordinary label, and the browser treats it as instructions.</p><p>There are three simple defences. First: the board only accepts plain text, never instructions - a note may say things, but nobody executes it. Second: a list at the entrance says who is even allowed to pin anything, and anything from outside the list gets taken down. Third: the keys do not sit in a box everyone can reach, but with someone who never hands them to strangers, however nicely they ask.</p>'
        },
        school: {
          pl: '<p>Bezpieczenstwo frontendu sprowadza sie do jednego pytania: kto moze wykonac kod na Twojej stronie. Kazdy realny atak to jakas odpowiedz na to pytanie, ktorej nie przewidziales.</p><p><strong>XSS</strong> (Cross-Site Scripting) to wstrzykniecie skryptu przez dane. Klasyk w bibliotece komponentow to prop, ktory renderuje HTML:</p><pre><code>// zle: konsument poda cokolwiek, my to wykonamy\n&lt;div v-html="props.content" /&gt;\n\n// dobrze: tekst domyslnie, HTML tylko jawnie i po sanitizacji\n&lt;div&gt;{{ props.content }}&lt;/div&gt;</code></pre><p>Regula: jesli komponent ma prop typu <code>htmlContent</code>, jego nazwa musi krzyczec o ryzyku, dokumentacja musi mowic, ze wartosc musi byc juz zsanityzowana, a domyslne zachowanie musi byc bezpieczne.</p><p><strong>CSP</strong> (Content Security Policy) to naglowek, ktory mowi przegladarce, skad wolno ladowac skrypty. Dobra polityka opiera sie na nonce, czyli jednorazowym tokenie generowanym per zadanie:</p><pre><code>Content-Security-Policy: script-src nonce-r4nd0m strict-dynamic;\n  object-src none; base-uri none</code></pre><p>Jesli w polityce widzisz <code>unsafe-inline</code>, to znaczy, ze polityki praktycznie nie ma - wlasnie inline jest wektorem XSS.</p><p><strong>Supply chain</strong> to dzis najczestsza droga wlamania na frontend. Nie wlamuja sie do Ciebie, tylko do paczki, ktorej uzywasz. Podstawy: lockfile commitowany do repo, odnawianie zaleznosci przez bota z przegladem, wylaczone skrypty postinstall i rejestr wewnetrzny zamiast bezposredniego npm.</p><p>I jedna rzecz, o ktorej latwo zapomniec: token w <code>localStorage</code> jest czytelny dla kazdego skryptu na stronie. Ciasteczko z <code>HttpOnly</code> nie jest.</p>',
          en: '<p>Frontend security boils down to one question: who can execute code on your page. Every real attack is some answer to that question you did not anticipate.</p><p><strong>XSS</strong> (Cross-Site Scripting) means injecting a script through data. The classic in a component library is a prop that renders HTML:</p><pre><code>// bad: the consumer passes anything, we execute it\n&lt;div v-html="props.content" /&gt;\n\n// good: text by default, HTML only explicitly and sanitised\n&lt;div&gt;{{ props.content }}&lt;/div&gt;</code></pre><p>The rule: if a component has an <code>htmlContent</code> prop, the name must shout about the risk, the docs must state the value has to arrive already sanitised, and the default behaviour must be the safe one.</p><p><strong>CSP</strong> (Content Security Policy) is a header telling the browser where scripts may load from. A good policy is nonce-based, using a one-time token generated per request:</p><pre><code>Content-Security-Policy: script-src nonce-r4nd0m strict-dynamic;\n  object-src none; base-uri none</code></pre><p>If you see <code>unsafe-inline</code> in a policy, the policy is effectively absent - inline is exactly the XSS vector.</p><p><strong>Supply chain</strong> is today the most common way into a frontend. Nobody breaks into you; they break into a package you depend on. The basics: lockfile committed to the repo, dependency updates via a bot with review, postinstall scripts disabled, and an internal registry instead of hitting npm directly.</p><p>And one thing easy to forget: a token in <code>localStorage</code> is readable by any script on the page. An <code>HttpOnly</code> cookie is not.</p>'
        },
        pro: {
          pl: '<p>W duzym telco frontend jest powierzchnia ataku o wyjatkowo wysokiej stawce: numery abonentow, dane rozliczeniowe, panele samoobslugowe z mozliwoscia zmiany taryfy. Utrzymujac design system, kontrolujesz jednoczesnie kilkadziesiat takich powierzchni. Kazdy bezpieczny domyslny wybor w bibliotece mnozy sie przez liczbe konsumentow - i tak samo mnozy sie kazda luka.</p><p><strong>Projektowanie API pod bezpieczenstwo.</strong> Niebezpieczne musi byc trudne i widoczne. Zamiast propa <code>content</code>, ktory czasem jest HTML-em, daj slot dla struktury i osobny, jawnie nazwany <code>dangerouslySetHtml</code> z ostrzezeniem w typach i w docsach. Dodaj regule ESLint w firmowym presecie, ktora oznacza kazde uzycie tego propa jako wymagajace przegladu bezpieczenstwa. Trzysta uzyc w organizacji to trzysta miejsc, ktore trzeba znalezc - jesli nie ma reguly, nie znajdziesz ich nigdy.</p><p><strong>CSP w praktyce, nie w teorii.</strong> Wdrozenie polityki od zera w istniejacej aplikacji telco zawsze idzie tak samo: najpierw <code>Content-Security-Policy-Report-Only</code> z endpointem raportujacym na dwa tygodnie, potem analiza raportow (zwykle wychodzi 20-40 unikalnych zrodel, z czego polowa to narzedzia marketingowe, o ktorych nikt w IT nie wiedzial), potem negocjacje i dopiero na koncu tryb egzekwowania. Nonce wymaga wsparcia po stronie renderujacej HTML - dla czystego SPA na CDN alternatywa sa hashe, generowane w buildzie.</p><pre><code>// vite: hashe skryptow do polityki, generowane po buildzie\nimport { createHash } from "node:crypto";\nconst hash = createHash("sha256").update(inlineScript).digest("base64");\ncsp.push("sha256-" + hash);</code></pre><p><strong>Lancuch dostaw jako proces, nie jako skan.</strong> Same alerty z <code>npm audit</code> to szum: wiekszosc CVE w zaleznosciach deweloperskich nie ma wektora w produkcji. Realne kontrole to: <code>ignore-scripts=true</code> w konfiguracji instalatora, proxy rejestru (Artifactory albo Verdaccio) z kwarantanna nowych wersji na 48-72 godziny, wymog provenance dla publikowanych paczek, oraz SBOM generowany w CI. Najgrozniejszy scenariusz dla design systemu to przejecie konta maintainera i publikacja zlosliwej wersji patch - kwarantanna i wymog dwoch zatwierdzen do publikacji sa tanszym zabezpieczeniem niz jakikolwiek skaner.</p><p><strong>Czego nie robic.</strong> Nie przechowuj tokenow w <code>localStorage</code>, jesli masz wybor - przy XSS to natychmiastowa kradziez sesji. Nie ufaj walidacji po stronie klienta jako kontroli bezpieczenstwa; to jest UX, autorytetem jest zawsze backend. Nie dodawaj <code>unsafe-eval</code> dla wygody jednej biblioteki wykresow - koszt to caly sens polityki.</p>',
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
            { pl: 'Polityka jest bezpieczna, bo blokuje zewnetrzne domeny', en: 'The policy is safe because it blocks external domains' },
            { pl: 'Polityka praktycznie nie chroni przed XSS, bo inline jest glownym wektorem', en: 'The policy barely protects against XSS, since inline is the main vector' },
            { pl: 'Polityka blokuje tylko obrazy', en: 'The policy only blocks images' },
            { pl: 'Polityka wymusza HTTPS na wszystkich zasobach', en: 'The policy forces HTTPS on all resources' }
          ],
          correct: 1,
          explain: {
            pl: 'Wstrzykniety skrypt niemal zawsze jest inline. Dopuszczajac inline, wpuszczasz dokladnie to, przed czym CSP mialo chronic.',
            en: 'An injected script is almost always inline. Allowing inline lets in exactly what the CSP was supposed to stop.'
          }
        },
        {
          q: {
            pl: 'Jak najbezpieczniej zaprojektowac w bibliotece komponent, ktory czasem musi wyrenderowac HTML od konsumenta?',
            en: 'How should a library component that sometimes must render consumer HTML be designed?'
          },
          options: [
            { pl: 'Prop content, ktory automatycznie wykrywa czy to HTML', en: 'A content prop that auto-detects whether the value is HTML' },
            { pl: 'Zawsze renderowac jako HTML, bo tak jest elastyczniej', en: 'Always render as HTML, it is more flexible' },
            { pl: 'Tekst domyslnie, a HTML wylacznie przez jawnie nazwany prop dangerouslySetHtml z regula lintera', en: 'Text by default, HTML only via an explicitly named dangerouslySetHtml prop with a lint rule' },
            { pl: 'Zostawic decyzje konsumentowi bez zadnych ostrzezen', en: 'Leave the decision to the consumer with no warnings' }
          ],
          correct: 2,
          explain: {
            pl: 'Bezpieczne musi byc domyslne, a niebezpieczne jawne i wyszukiwalne. Regula lintera daje Ci liste wszystkich ryzykownych uzyc w organizacji.',
            en: 'Safe must be the default and unsafe must be explicit and greppable. A lint rule gives you the list of every risky usage across the org.'
          }
        },
        {
          q: {
            pl: 'Ktora kontrola najskuteczniej ogranicza ryzyko przejecia konta maintainera zaleznosci?',
            en: 'Which control most effectively limits the risk of a hijacked dependency maintainer account?'
          },
          options: [
            { pl: 'Uruchamianie npm audit w CI', en: 'Running npm audit in CI' },
            { pl: 'Proxy rejestru z kwarantanna nowych wersji na 48-72 godziny', en: 'A registry proxy quarantining new versions for 48-72 hours' },
            { pl: 'Uzywanie zakresow caret w package.json', en: 'Using caret ranges in package.json' },
            { pl: 'Aktualizowanie wszystkich zaleznosci codziennie', en: 'Updating every dependency daily' }
          ],
          correct: 1,
          explain: {
            pl: 'Zlosliwe wydania sa zwykle wykrywane i wycofywane w ciagu godzin. Kwarantanna sprawia, ze Twoja organizacja nigdy nie instaluje ich w tym oknie.',
            en: 'Malicious releases are usually detected and pulled within hours. Quarantine means your org never installs them during that window.'
          }
        },
        {
          q: {
            pl: 'Wdrazasz CSP w istniejacej aplikacji telco z dziesiatkami integracji. Jaki jest pierwszy krok?',
            en: 'You are rolling out CSP in an existing telco app with dozens of integrations. What is the first step?'
          },
          options: [
            { pl: 'Wlaczyc restrykcyjna polityke od razu i naprawiac zgloszenia', en: 'Turn on a strict policy immediately and fix the reports' },
            { pl: 'Dodac unsafe-inline, zeby nic nie peklo', en: 'Add unsafe-inline so nothing breaks' },
            { pl: 'Uruchomic Report-Only z endpointem raportujacym i zebrac dane przez dwa tygodnie', en: 'Run Report-Only with a reporting endpoint and collect data for two weeks' },
            { pl: 'Poprosic kazdy zespol o liste swoich skryptow', en: 'Ask every team for a list of their scripts' }
          ],
          correct: 2,
          explain: {
            pl: 'Report-Only pokazuje rzeczywiste zrodla, w tym narzedzia marketingowe, o ktorych IT nie wie. Lista od zespolow zawsze jest niepelna, bo nikt nie pamieta wszystkiego.',
            en: 'Report-Only reveals the real sources, including marketing tools IT does not know about. A list from teams is always incomplete because nobody remembers everything.'
          }
        }
      ]
    },

    {
      id: 'code-review-culture',
      title: { pl: 'Kultura code review', en: 'Code review culture' },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><text x="20" y="28" font-size="14" fill="var(--text)">Time to first review, by PR size</text><rect x="20" y="44" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="80" y="66" font-size="13" fill="var(--ok)" text-anchor="middle">under 100 LOC</text><rect x="150" y="44" width="120" height="34" rx="8" fill="var(--ok)" opacity="0.25"/><text x="286" y="66" font-size="13" fill="var(--muted)">about 1 h</text><rect x="20" y="90" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="80" y="112" font-size="13" fill="var(--accent2)" text-anchor="middle">100-300 LOC</text><rect x="150" y="90" width="220" height="34" rx="8" fill="var(--accent2)" opacity="0.25"/><text x="386" y="112" font-size="13" fill="var(--muted)">about 4 h</text><rect x="20" y="136" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="80" y="158" font-size="13" fill="var(--warn)" text-anchor="middle">300-800 LOC</text><rect x="150" y="136" width="330" height="34" rx="8" fill="var(--warn)" opacity="0.25"/><text x="496" y="158" font-size="13" fill="var(--muted)">about 1 day</text><rect x="20" y="182" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="80" y="204" font-size="13" fill="var(--err)" text-anchor="middle">over 800 LOC</text><rect x="150" y="182" width="400" height="34" rx="8" fill="var(--err)" opacity="0.25"/><text x="556" y="204" font-size="13" fill="var(--muted)">2 days +</text><line x1="20" y1="240" x2="620" y2="240" stroke="var(--border)" stroke-width="2"/><text x="20" y="268" font-size="14" fill="var(--text)">Label every comment so intent is never guessed:</text><rect x="20" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="40" y="312" font-size="14" fill="var(--err)">blocking</text><text x="40" y="336" font-size="13" fill="var(--muted)">correctness, API,</text><text x="40" y="356" font-size="13" fill="var(--muted)">security, a11y</text><rect x="225" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="245" y="312" font-size="14" fill="var(--accent)">suggestion</text><text x="245" y="336" font-size="13" fill="var(--muted)">worth doing, author</text><text x="245" y="356" font-size="13" fill="var(--muted)">decides now or later</text><rect x="430" y="284" width="190" height="92" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/><text x="450" y="312" font-size="14" fill="var(--muted)">nit</text><text x="450" y="336" font-size="13" fill="var(--muted)">taste only, never</text><text x="450" y="356" font-size="13" fill="var(--muted)">blocks a merge</text></svg>',
        caption: {
          pl: 'Rozmiar PR-a przeklada sie wprost na czas oczekiwania na recenzje. Etykietowanie komentarzy usuwa najczestsze zrodlo tarcia: zgadywanie, co jest wymagane.',
          en: 'PR size maps directly onto how long a review waits. Labelling comments removes the biggest source of friction: guessing what is mandatory.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze kolega prosi Cie o przeczytanie jego wypracowania. Jesli przyniesie jedna strone, przeczytasz ja przy kawie i powiesz cos madrego. Jesli przyniesie czterdziesci stron, odlozysz to na jutro, a jutro na pojutrze, a na koncu przekartkujesz i powiesz "spoko".</p><p>Dokladnie tak samo dzieje sie z kodem. Male porcje dostaja prawdziwa uwage, wielkie dostaja tylko udawana.</p><p>Druga rzecz to sposob mowienia. Jest ogromna roznica miedzy "tu jest blad, program sie wywali" a "ja bym to nazwal inaczej, ale rob jak chcesz". Jesli nie powiesz, ktore z tych dwoch masz na mysli, autor bedzie zgadywal - i albo zignoruje wazna uwage, albo bedzie przez godzine zmienial nazwe zmiennej.</p><p>Dlatego dobrzy ludzie pisza wprost: to trzeba poprawic, a to tylko moj gust.</p>',
          en: '<p>Imagine a friend asks you to read their essay. If they bring one page you read it over coffee and say something useful. If they bring forty pages, you put it off until tomorrow, then the day after, and in the end you skim it and say "looks fine".</p><p>Exactly the same thing happens with code. Small portions get real attention; huge ones only get the pretence of it.</p><p>The second thing is how you speak. There is an enormous difference between "this is a bug, the program will crash" and "I would name it differently, but do as you like". If you do not say which of the two you mean, the author has to guess - and will either ignore an important note or spend an hour renaming a variable.</p><p>So good people say it plainly: this must be fixed, and this is only my taste.</p>'
        },
        school: {
          pl: '<p>Code review jest najczesciej uzywanym narzedziem architektonicznym w firmie. Kazdego dnia podejmowane sa w nim dziesiatki malych decyzji, ktore razem definiuja, jak wyglada kod za rok. Warto wiec traktowac go jak proces z parametrami, a nie jak grzecznosciowy rytual.</p><p><strong>Rozmiar jest najwazniejszym parametrem.</strong> Badania i codzienna praktyka zgadzaja sie: recenzent traci skutecznosc po mniej wiecej 400 liniach i po godzinie czytania. PR na 1200 linii nie dostaje recenzji, tylko akceptacje. Rozbijanie zmiany na sekwencje malych PR-ow jest umiejetnoscia, ktorej warto uczyc zespol wprost.</p><p><strong>Etykiety usuwaja tarcie.</strong> Trzy prefiksy w komentarzach zalatwiaja wiekszosc nieporozumien:</p><ul><li><strong>blocking</strong> - poprawnosc, publiczne API, bezpieczenstwo, dostepnosc</li><li><strong>suggestion</strong> - warto, ale autor decyduje, teraz czy w kolejnym PR</li><li><strong>nit</strong> - czysty gust, nigdy nie blokuje mergea</li></ul><p><strong>Automatyzuj wszystko, co da sie zautomatyzowac.</strong> Formatowanie to Prettier, konwencje to ESLint, nazwy plikow to reguly. Kazdy komentarz o przecinku to zmarnowana uwaga czlowieka, ktora mogla trafic na projekt API.</p><p><strong>CODEOWNERS zamiast pytania na czacie.</strong> W design systemie plik <code>CODEOWNERS</code> kieruje zmiany w <code>packages/tokens</code> do zespolu tokenow, a w <code>packages/react</code> do zespolu komponentow. Autor nie musi wiedziec, kogo poprosic, a Ty nie musisz pilnowac, zeby nikt nie zmienil kontraktu po cichu.</p><p>I rzecz najwazniejsza kulturowo: recenzja dotyczy kodu, nie osoby. Sformulowanie "ta funkcja robi trzy rzeczy naraz" i "napisales balagan" niosa te sama informacje techniczna, ale drugie kosztuje zaufanie, ktorego pozniej brakuje przy trudnych decyzjach.</p>',
          en: '<p>Code review is the most frequently used architectural tool in a company. Dozens of small decisions get made in it every day, and together they define what the codebase looks like in a year. So treat it as a process with parameters, not as a politeness ritual.</p><p><strong>Size is the most important parameter.</strong> Research and daily practice agree: a reviewer loses effectiveness after roughly 400 lines and after an hour of reading. A 1200-line PR does not receive a review, it receives an approval. Splitting a change into a sequence of small PRs is a skill worth teaching the team explicitly.</p><p><strong>Labels remove friction.</strong> Three comment prefixes settle most misunderstandings:</p><ul><li><strong>blocking</strong> - correctness, public API, security, accessibility</li><li><strong>suggestion</strong> - worth doing, but the author decides: now or in a follow-up</li><li><strong>nit</strong> - pure taste, never blocks a merge</li></ul><p><strong>Automate everything automatable.</strong> Formatting is Prettier, conventions are ESLint, file naming is a rule. Every comment about a comma is human attention wasted that could have gone to the API design.</p><p><strong>CODEOWNERS instead of asking in chat.</strong> In a design system, a <code>CODEOWNERS</code> file routes changes in <code>packages/tokens</code> to the tokens team and <code>packages/react</code> to the components team. The author does not need to know who to ask, and you do not need to police silent contract changes.</p><p>And the culturally decisive point: the review is about the code, not the person. "This function does three things at once" and "you wrote a mess" carry the same technical information, but the second one spends trust you will need later, during hard decisions.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principala code review przestaje byc kanalem wykrywania bugow, a staje sie glownym kanalem propagacji standardow. Nie zrecenzujesz kodu czterdziestu zespolow. Mozesz natomiast sprawic, ze recenzje w tych zespolach beda wygladac tak, jak chcesz - przez narzedzia, szablony i kilka publicznych przykladow.</p><p><strong>Metryki, ktore warto obserwowac.</strong> Trzy liczby wystarcza i wszystkie da sie wyciagnac z API GitHuba: mediana czasu do pierwszej recenzji (cel: ponizej 4 godzin roboczych), mediana rozmiaru PR-a (cel: ponizej 250 zmienionych linii) i wspolczynnik reworku, czyli ile PR-ow wymaga wiecej niz dwoch rund. Wzrost tej trzeciej liczby prawie zawsze oznacza, ze rozmowa o projekcie rozwiazania odbywa sie za pozno - w PR-ze zamiast w RFC.</p><p><strong>Kanaly o roznej przepustowosci.</strong> Nie wszystko musi przejsc przez pelna recenzje. W praktyce sprawdza sie podzial na trzy sciezki: zmiany wewnetrzne w pakiecie - jeden recenzent z zespolu; zmiany publicznego API - dwoch recenzentow, w tym wlasciciel z CODEOWNERS i wymagany changeset; zmiany tokenow i motywu - dodatkowo zatwierdzenie od designu, bo skutek widzi czterdziesci aplikacji naraz.</p><pre><code># CODEOWNERS - kontrakty maja wlascicieli, reszta nie musi\npackages/tokens/**        @ds-core @design-leads\npackages/*/src/index.ts   @ds-core\ndocs/**                   @ds-docs</code></pre><p><strong>Wklad z zewnatrz.</strong> Design system, do ktorego nie da sie dolozyc komponentu, umiera w ciagu roku - zespoly forkuja i buduja rownolegle biblioteki. Model, ktory dziala, to progi: poprawka buga bez zmiany API idzie zwykla sciezka, nowy wariant istniejacego komponentu wymaga krotkiego opisu przypadku uzycia, a nowy komponent wymaga RFC z minimum dwoma niezaleznymi konsumentami. Ostatni prog jest najwazniejszy: chroni przed biblioteka pelna komponentow uzywanych w jednym miejscu, ktore i tak musisz utrzymywac.</p><p><strong>Twoja rola w komentarzach.</strong> Jako najstarszy inzynier w watku masz nieproporcjonalna wage - Twoje "hmm" jest czytane jako weto. Praktyczne konsekwencje: pisz wprost, czy komentarz blokuje; nie zostawiaj czterdziestu uwag naraz, tylko trzy najwazniejsze; a gdy odrzucasz kierunek, zaproponuj alternatywe w tym samym komentarzu. Recenzja bez propozycji jest dla autora sciana, nie pomoca.</p><p><strong>Jedna rzecz, ktora warto robic publicznie:</strong> od czasu do czasu zaakceptuj PR ze zdaniem, dlaczego uwazasz to rozwiazanie za dobre. Zespoly ucza sie standardu znacznie szybciej z pozytywnych przykladow niz z listy zakazow.</p>',
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
            { pl: 'Bo GitHub nie potrafi wyswietlic takiego diffa', en: 'Because GitHub cannot render such a diff' },
            { pl: 'Bo recenzent traci skutecznosc po okolo 400 liniach, wiec dostaje akceptacje zamiast recenzji', en: 'Because reviewers lose effectiveness after roughly 400 lines, so it gets an approval instead of a review' },
            { pl: 'Bo CI nie zdazy przetworzyc tylu plikow', en: 'Because CI cannot process that many files in time' },
            { pl: 'Bo duze PR-y zawsze zawieraja bledy skladniowe', en: 'Because large PRs always contain syntax errors' }
          ],
          correct: 1,
          explain: {
            pl: 'Uwaga czlowieka jest ograniczonym zasobem. Powyzej kilkuset linii jakosc recenzji spada gwaltownie, a zielony ptaszek przestaje cokolwiek gwarantowac.',
            en: 'Human attention is a finite resource. Past a few hundred lines review quality collapses and the green check stops guaranteeing anything.'
          }
        },
        {
          q: {
            pl: 'Po co oznaczac komentarze jako blocking, suggestion albo nit?',
            en: 'Why label comments as blocking, suggestion or nit?'
          },
          options: [
            { pl: 'Zeby latwiej filtrowac komentarze w narzedziu', en: 'To make comments easier to filter in the tool' },
            { pl: 'Zeby autor nie musial zgadywac, co jest wymagane, a co jest gustem recenzenta', en: 'So the author does not have to guess what is required and what is reviewer taste' },
            { pl: 'Zeby zliczac produktywnosc recenzentow', en: 'To count reviewer productivity' },
            { pl: 'Zeby spelnic wymogi audytu', en: 'To satisfy audit requirements' }
          ],
          correct: 1,
          explain: {
            pl: 'Wiekszosc tarcia w recenzjach bierze sie z niejasnej intencji. Etykieta rozwiazuje to jednym slowem i skraca liczbe rund.',
            en: 'Most review friction comes from unclear intent. A label resolves it in one word and cuts the number of rounds.'
          }
        },
        {
          q: {
            pl: 'Zespol produktowy chce dodac nowy komponent do design systemu. Jaki prog jest najzdrowszy?',
            en: 'A product team wants to add a new component to the design system. What is the healthiest bar?'
          },
          options: [
            { pl: 'Przyjmowac wszystko, zeby nie zniechecac do wkladu', en: 'Accept everything so contribution is not discouraged' },
            { pl: 'Nie przyjmowac nic z zewnatrz, zeby utrzymac spojnosc', en: 'Accept nothing from outside to keep consistency' },
            { pl: 'Wymagac RFC z co najmniej dwoma niezaleznymi konsumentami', en: 'Require an RFC with at least two independent consumers' },
            { pl: 'Wymagac, zeby autor dolaczyl do zespolu design systemu', en: 'Require the author to join the design system team' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez progu biblioteka zapelnia sie komponentami uzywanymi w jednym miejscu, ktore i tak utrzymujesz. Z zerowym wkladem zespoly forkuja i buduja rownolegle biblioteki.',
            en: 'With no bar the library fills with single-use components you still maintain. With zero contribution allowed, teams fork and build parallel libraries.'
          }
        },
        {
          q: {
            pl: 'Wspolczynnik reworku (PR-y wymagajace wiecej niz dwoch rund) rosnie od kwartalu. Co to najczesciej sygnalizuje?',
            en: 'Rework rate (PRs needing more than two rounds) has been rising for a quarter. What does that usually signal?'
          },
          options: [
            { pl: 'Rozmowa o projekcie rozwiazania odbywa sie za pozno, w PR-ze zamiast w RFC', en: 'The design conversation happens too late, in the PR instead of in an RFC' },
            { pl: 'Recenzenci sa zbyt lagodni', en: 'Reviewers are too lenient' },
            { pl: 'Zespol pisze za malo testow', en: 'The team writes too few tests' },
            { pl: 'Narzedzie do recenzji dziala wolno', en: 'The review tool is slow' }
          ],
          correct: 0,
          explain: {
            pl: 'Wiele rund oznacza, ze kierunek jest negocjowany po napisaniu kodu. Lekiem jest krotki dokument lub rozmowa przed implementacja, nie ostrzejsze recenzje.',
            en: 'Many rounds mean the direction is being negotiated after the code exists. The cure is a short document or conversation before implementation, not harsher reviews.'
          }
        }
      ]
    },

    {
      id: 'principal-track-case-studies',
      title: { pl: 'Sciezka principala - studia przypadkow', en: 'The principal track - case studies' },
      minutes: 14,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit"><defs><marker id="fa6pr-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="20" y="28" font-size="14" fill="var(--muted)">what changes between levels is scope and artifact, not skill</text><rect x="20" y="46" width="180" height="86" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="110" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Senior</text><text x="110" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: one team</text><text x="110" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the code</text><line x1="204" y1="89" x2="236" y2="89" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="240" y="46" width="180" height="86" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="330" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Staff</text><text x="330" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: a few teams</text><text x="330" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the ADR</text><line x1="424" y1="89" x2="456" y2="89" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="460" y="46" width="160" height="86" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="540" y="74" font-size="14" fill="var(--text)" text-anchor="middle">Principal</text><text x="540" y="98" font-size="13" fill="var(--muted)" text-anchor="middle">scope: the org</text><text x="540" y="118" font-size="13" fill="var(--muted)" text-anchor="middle">artifact: the platform</text><line x1="20" y1="160" x2="620" y2="160" stroke="var(--border)" stroke-width="2"/><text x="20" y="190" font-size="14" fill="var(--text)">Case study: retiring the legacy Button across 40 apps</text><rect x="20" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="90" y="234" font-size="14" fill="var(--err)" text-anchor="middle">1240 usages</text><text x="90" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">week 0</text><line x1="164" y1="241" x2="192" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="196" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="266" y="234" font-size="14" fill="var(--warn)" text-anchor="middle">codemod PRs</text><text x="266" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">920 auto-fixed</text><line x1="340" y1="241" x2="368" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="372" y="206" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="442" y="234" font-size="14" fill="var(--accent)" text-anchor="middle">lint gate on</text><text x="442" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">no new usages</text><line x1="516" y1="241" x2="544" y2="241" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa6pr-arr)"/><rect x="548" y="206" width="72" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="584" y="234" font-size="14" fill="var(--ok)" text-anchor="middle">31</text><text x="584" y="256" font-size="13" fill="var(--muted)" text-anchor="middle">week 12</text><rect x="20" y="298" width="600" height="94" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="40" y="326" font-size="13" fill="var(--muted)">The migration worked because the default path was cheaper than doing nothing:</text><text x="40" y="350" font-size="13" fill="var(--muted)">a codemod PR that teams only had to approve, plus a gate stopping new usage,</text><text x="40" y="374" font-size="13" fill="var(--muted)">plus one dashboard everyone could see. No mandate email was ever sent.</text></svg>',
        caption: {
          pl: 'Miedzy poziomami zmienia sie zasieg i artefakt, nie umiejetnosc. Ponizej realna migracja: 1240 uzyc do 31 w dwanascie tygodni, bez maila z nakazem.',
          en: 'What changes between levels is scope and artifact, not skill. Below, a real migration: 1240 usages down to 31 in twelve weeks, with no mandate email.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze w calym miescie ludzie uzywaja starych, ciezkich drzwi, ktore sie zacinaja. Masz nowe, lepsze. Mozesz teraz rozeslac pismo: "od poniedzialku wszyscy wymieniaja drzwi". Nikt tego nie zrobi, bo kazdy ma wazniejsze rzeczy na glowie.</p><p>Albo mozesz zrobic cos innego. Przychodzisz do kazdego domu z gotowymi nowymi drzwiami juz przykreconymi na probe i mowisz: "wystarczy, ze kiwniesz glowa". Potem sprawiasz, ze w sklepie nie da sie juz kupic starych drzwi. Na koniec wieszasz na rynku tablice, na ktorej widac, ile domow ma juz nowe.</p><p>Po trzech miesiacach prawie wszyscy maja nowe drzwi i nikt sie nie klocil. Nie dlatego, ze kazales, tylko dlatego, ze zrobiles zmiane latwiejsza niz jej brak.</p>',
          en: '<p>Imagine a whole town using old, heavy doors that jam. You have better ones. You could send a letter: "from Monday, everyone replaces their door". Nobody will, because everyone has more urgent things going on.</p><p>Or you can do something else. You show up at every house with a new door already test-fitted and say: "all you have to do is nod". Then you make sure the shop no longer sells the old doors. Finally you put a board up in the square showing how many houses already have the new one.</p><p>Three months later almost everyone has new doors and nobody argued. Not because you ordered it, but because you made the change cheaper than not changing.</p>'
        },
        school: {
          pl: '<p>Roznica miedzy seniorem a principalem rzadko dotyczy umiejetnosci technicznych. Principal czesto pisze mniej kodu. Zmienia sie zasieg wplywu i rodzaj artefaktu, ktory zostawia po sobie: senior zostawia dobry kod, staff dobra decyzje udokumentowana w ADR, principal - platforme i standardy, ktore dzialaja bez jego obecnosci.</p><p>Najbardziej praktyczna umiejetnosc na tym poziomie to <strong>wplyw bez wladzy</strong>. Nie mozesz kazac czterdziestu zespolom niczego zrobic. Mozesz natomiast zmieniac koszty.</p><p>Przyklad migracji, ktora naprawde dziala:</p><ol><li><strong>Zmierz.</strong> Skrypt liczacy uzycia starego komponentu we wszystkich repozytoriach. Bez liczby dyskutujesz o wrazeniach.</li><li><strong>Usun tarcie.</strong> Napisz codemod (skrypt przepisujacy kod) i otworz gotowe PR-y w repozytoriach zespolow. Zespol ma tylko kliknac approve.</li><li><strong>Zamknij droge powrotna.</strong> Regula ESLint, ktora blokuje nowe uzycia. Bez tego naprawiasz szybciej, niz inni psuja - ale tylko chwile.</li><li><strong>Pokaz postep.</strong> Jeden publiczny dashboard z licznikiem. Widocznosc robi wiecej niz przypomnienia.</li></ol><p>Druga umiejetnosc to <strong>pisanie</strong>. Dokument na dwie strony, ktory czytaja trzy zespoly, ma wiekszy zasieg niz najlepsza prezentacja na spotkaniu, bo dziala tez wtedy, gdy Cie nie ma w pokoju i zostaje w firmie po Twoim odejsciu.</p><p>Trzecia to <strong>umiejetnosc powiedzenia nie</strong> w sposob, ktory nie blokuje ludzi. "Nie, bo nie pasuje do systemu" konczy rozmowe. "Nie w tej formie, ale ten sam efekt osiagniemy tak - i moge pomoc w srode" utrzymuje i standard, i relacje.</p>',
          en: '<p>The difference between a senior and a principal rarely lies in technical skill. A principal often writes less code. What changes is the reach of the influence and the kind of artifact left behind: a senior leaves good code, a staff engineer leaves a good decision documented in an ADR, a principal leaves a platform and standards that work without them in the room.</p><p>The most practical skill at that level is <strong>influence without authority</strong>. You cannot order forty teams to do anything. You can, however, change the costs.</p><p>An example of a migration that actually works:</p><ol><li><strong>Measure.</strong> A script counting usages of the old component across all repositories. Without a number you are debating impressions.</li><li><strong>Remove the friction.</strong> Write a codemod (a script that rewrites code) and open ready-made PRs in the teams repositories. The team only has to click approve.</li><li><strong>Close the way back.</strong> An ESLint rule blocking new usages. Without it you fix faster than others break - but only for a while.</li><li><strong>Show the progress.</strong> One public dashboard with a counter. Visibility does more than reminders.</li></ol><p>The second skill is <strong>writing</strong>. A two-page document read by three teams reaches further than the best presentation in a meeting, because it also works when you are not in the room and it stays in the company after you leave.</p><p>The third is <strong>saying no</strong> in a way that does not block people. "No, it does not fit the system" ends the conversation. "Not in this shape, but we can get the same outcome this way - and I can help on Wednesday" preserves both the standard and the relationship.</p>'
        },
        pro: {
          pl: '<p>Trzy studia przypadkow z zycia design systemu w duzej organizacji telco. Kazde ilustruje inny mechanizm, ktorym principal zmienia zachowanie systemu, nie majac nad nim wladzy formalnej.</p><p><strong>Przypadek 1: wycofanie starego Buttona, 1240 uzyc w 40 aplikacjach.</strong> Mail z nakazem daje w takiej skali okolo 5 procent adopcji w kwartale, bo kazdy zespol ma wlasny backlog i wlasnego menedzera. Zadzialalo co innego: codemod oparty o jscodeshift pokryl 920 z 1240 przypadkow, boty otworzyly PR-y w repozytoriach zespolow z zielonym CI i lista zmian, regula ESLint w firmowym presecie zaczela blokowac nowe uzycia od pierwszego dnia, a publiczny dashboard pokazywal licznik per zespol. Po dwunastu tygodniach zostalo 31 uzyc, wszystkie w dwoch aplikacjach z wlasnymi, uzasadnionymi wyjatkami. Kluczowa liczba, ktora warto miec w glowie: koszt migracji dla zespolu spadl z okolo dwoch dni pracy do piecu minut przegladu.</p><p><strong>Przypadek 2: dwa rownolegle design systemy.</strong> Klasyczna sytuacja po fuzji albo po dlugim okresie, gdy oficjalna biblioteka nie przyjmowala wkladu. Bledna reakcja to walka o legitymacje. Skuteczna sciezka: policz realny koszt utrzymania obu (u nas wyszlo okolo 1,4 etatu duplikacji rocznie plus niespojnosc wizualna w sciezce zakupowej), znajdz w drugim systemie 2-3 rzeczy obiektywnie lepsze i przejmij je razem z autorami, a nastepnie zaproponuj polaczenie, w ktorym druga strona nie traci twarzy - ich komponenty wchodza pod ich nazwiskami do wspolnej biblioteki. Fuzja techniczna jest tu latwiejsza od politycznej i to na te druga idzie wiekszosc czasu.</p><p><strong>Przypadek 3: budzet wydajnosci kontra kampania marketingowa.</strong> Marketing chce wpiac trzy skrypty analityczne, kazdy po 40-90 kB, przed pierwszym renderem. Odpowiedz "nie, bo budzet" przegrywa z przychodem. Odpowiedz, ktora wygrywa, jest oparta o dane: pokazujesz z RUM, ze LCP p75 rosnie z 2,3 do 3,6 sekundy, a wewnetrzny test A/B wskazuje spadek konwersji rzedu 4-7 procent przy takim opoznieniu, po czym proponujesz wariant: jeden skrypt ladowany po interakcji, dwa przez serwerowy tagging. Zamiana konfliktu wartosci na porownanie liczb to podstawowa technika tego poziomu.</p><p><strong>Co z tego wynika o samej roli.</strong> Wspolny mianownik wszystkich trzech przypadkow: principal zmienia domyslne zachowanie systemu, a nie decyzje pojedynczych ludzi. Domyslne ustawienie, szablon, generator, regula lintera i bramka w CI maja wiekszy zasieg niz jakakolwiek rozmowa, bo dzialaja przy kazdym commicie, takze wtedy, gdy jestes na urlopie.</p><p>Na rozmowie o awans nie pokazujesz wiec listy technologii, tylko trzy takie historie z liczbami przed i po, z opisem, kogo trzeba bylo przekonac, i z uczciwym akapitem o tym, co poszlo zle. Ostatni element jest zaskakujaco czesto tym, ktory decyduje.</p>',
          en: '<p>Three case studies from the life of a design system in a large telco. Each illustrates a different mechanism by which a principal changes system behaviour without formal authority over it.</p><p><strong>Case 1: retiring the legacy Button, 1240 usages across 40 apps.</strong> A mandate email at that scale buys roughly 5 percent adoption in a quarter, because every team has its own backlog and its own manager. What worked was different: a jscodeshift codemod covered 920 of the 1240 cases, bots opened PRs in the teams repositories with green CI and a change list, an ESLint rule in the company preset started blocking new usages on day one, and a public dashboard showed a per-team counter. Twelve weeks later 31 usages remained, all in two apps with their own justified exceptions. The number worth remembering: the migration cost per team fell from about two days of work to five minutes of review.</p><p><strong>Case 2: two parallel design systems.</strong> The classic situation after a merger, or after a long period during which the official library refused contributions. The wrong reaction is fighting over legitimacy. The effective path: quantify the real cost of maintaining both (in our case around 1.4 FTE of duplication per year plus visual inconsistency in the purchase flow), find 2-3 things the other system objectively does better and adopt them together with their authors, then propose a merge in which the other side does not lose face - their components enter the shared library under their names. The technical merge is easier than the political one, and the political one eats most of the time.</p><p><strong>Case 3: a performance budget versus a marketing campaign.</strong> Marketing wants three analytics scripts, 40-90 kB each, before first render. The answer "no, budget" loses against revenue. The answer that wins is built on data: you show from RUM that LCP p75 moves from 2.3 to 3.6 seconds, that an internal A/B test indicates a 4-7 percent conversion drop at that delay, and then you propose a variant - one script loaded after interaction, two through server-side tagging. Converting a values conflict into a comparison of numbers is the core technique at this level.</p><p><strong>What this says about the role.</strong> The common denominator across all three: a principal changes the default behaviour of the system rather than the decisions of individual people. A default setting, a template, a generator, a lint rule and a CI gate reach further than any conversation, because they act on every commit, including while you are on holiday.</p><p>So in a promotion conversation you do not present a list of technologies, you present three such stories with before and after numbers, with who had to be convinced, and with an honest paragraph about what went wrong. That last element is surprisingly often the deciding one.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co najlepiej opisuje roznice miedzy seniorem a principalem?',
            en: 'What best describes the difference between a senior and a principal?'
          },
          options: [
            { pl: 'Principal zna wiecej frameworkow', en: 'A principal knows more frameworks' },
            { pl: 'Zmienia sie zasieg wplywu i artefakt: od kodu, przez decyzje w ADR, po platforme i standardy', en: 'The reach and the artifact change: from code, through ADR decisions, to platform and standards' },
            { pl: 'Principal zarzadza ludzmi, senior nie', en: 'A principal manages people, a senior does not' },
            { pl: 'Principal pisze wiecej kodu na tydzien', en: 'A principal writes more code per week' }
          ],
          correct: 1,
          explain: {
            pl: 'To nie jest awans za znajomosc technologii. Miara jest to, co zostaje w organizacji i dziala, gdy Ciebie nie ma w pokoju.',
            en: 'This is not a promotion for knowing technologies. The measure is what remains in the organisation and works when you are not in the room.'
          }
        },
        {
          q: {
            pl: 'Ktory element migracji 1240 uzyc byl najwazniejszy dla utrzymania postepu?',
            en: 'Which element of the 1240-usage migration mattered most for keeping progress?'
          },
          options: [
            { pl: 'Mail z nakazem od dyrektora', en: 'A mandate email from a director' },
            { pl: 'Regula ESLint blokujaca nowe uzycia od pierwszego dnia', en: 'An ESLint rule blocking new usages from day one' },
            { pl: 'Prezentacja na spotkaniu wszystkich zespolow', en: 'A presentation at the all-teams meeting' },
            { pl: 'Wpis na wewnetrznym blogu', en: 'An internal blog post' }
          ],
          correct: 1,
          explain: {
            pl: 'Bez zamkniecia drogi powrotnej naprawiasz mniej wiecej w tempie, w jakim powstaja nowe uzycia. Bramka zamienia migracje w proces zbiezny.',
            en: 'Without closing the way back you fix at roughly the rate new usages appear. A gate turns the migration into a converging process.'
          }
        },
        {
          q: {
            pl: 'Inny zespol zbudowal rownolegly design system. Jaka reakcja jest najskuteczniejsza?',
            en: 'Another team has built a parallel design system. What reaction is most effective?'
          },
          options: [
            { pl: 'Eskalowac do dyrektora i zadac wylaczenia ich biblioteki', en: 'Escalate to a director and demand their library be shut down' },
            { pl: 'Zignorowac i liczyc, ze samo umrze', en: 'Ignore it and hope it dies on its own' },
            { pl: 'Policzyc koszt duplikacji, przejac 2-3 ich lepsze rozwiazania razem z autorami i zaproponowac polaczenie bez utraty twarzy', en: 'Quantify the duplication cost, adopt 2-3 of their better ideas together with their authors, and propose a merge with no loss of face' },
            { pl: 'Skopiowac ich komponenty do swojej biblioteki bez pytania', en: 'Copy their components into your library without asking' }
          ],
          correct: 2,
          explain: {
            pl: 'Rownolegly system to zwykle objaw zamknietego modelu wkladu, a nie zlosliwosci. Fuzja techniczna jest latwa; caly wysilek idzie w czesc polityczna.',
            en: 'A parallel system is usually a symptom of a closed contribution model, not malice. The technical merge is easy; the effort goes into the political part.'
          }
        },
        {
          q: {
            pl: 'Marketing chce dodac trzy skrypty po 40-90 kB przed pierwszym renderem. Jaka odpowiedz ma najwieksza szanse zadzialac?',
            en: 'Marketing wants three 40-90 kB scripts before first render. Which response is most likely to work?'
          },
          options: [
            { pl: 'Nie, poniewaz to lamie nasz budzet wydajnosci', en: 'No, because it breaks our performance budget' },
            { pl: 'Tak, budzet to tylko wskazowka', en: 'Yes, the budget is only a guideline' },
            { pl: 'Dane z RUM o LCP i szacowany wplyw na konwersje plus konkretny wariant: jeden skrypt po interakcji, dwa przez server-side tagging', en: 'RUM data on LCP plus an estimated conversion impact, and a concrete alternative: one script after interaction, two via server-side tagging' },
            { pl: 'Przekazac decyzje dyrektorowi', en: 'Hand the decision to a director' }
          ],
          correct: 2,
          explain: {
            pl: 'Konflikt wartosci przegrywa z przychodem, porownanie liczb nie. Alternatywa dowozi cel marketingu, wiec rozmowa przestaje byc sporem o zasady.',
            en: 'A values conflict loses to revenue; a comparison of numbers does not. The alternative still delivers the marketing goal, so the discussion stops being about principles.'
          }
        }
      ]
    }

  ]
};
