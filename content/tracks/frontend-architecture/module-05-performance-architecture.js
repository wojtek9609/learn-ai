// Track: frontend-architecture - module 5: Performance architecture.
// Audience: senior -> principal frontend engineer maintaining a design system at a large telco.

export default {
  id: 'performance-architecture',
  order: 5,
  icon: '🚀',
  title: { pl: 'Architektura wydajności', en: 'Performance architecture' },
  description: {
    pl: 'Wydajność jako decyzja architektoniczna, nie sprint optymalizacyjny: Web Vitals i budżety, strategie renderowania, assety, wzorce runtime i RUM.',
    en: 'Performance as an architectural decision rather than an optimisation sprint: Web Vitals and budgets, rendering strategies, assets, runtime patterns and RUM.',
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'web-vitals-budgets',
      title: { pl: 'Web Vitals i budżety wydajności', en: 'Web Vitals and performance budgets' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'LCP (Largest Contentful Paint)', en: 'LCP (Largest Contentful Paint)' },
          def: {
            pl: 'Moment narysowania największego elementu treści w widocznym obszarze. Dobry wynik to poniżej <strong>2,5 s</strong> na p75; zwykle decyduje o nim obraz lub nagłówek nad foldem.',
            en: 'The moment the largest content element in the viewport is painted. Good is under <strong>2.5 s</strong> at p75, and it is usually decided by the hero image or heading above the fold.'
          }
        },
        {
          term: { pl: 'INP (Interaction to Next Paint)', en: 'INP (Interaction to Next Paint)' },
          def: {
            pl: 'Opóźnienie między interakcją a narysowaniem kolejnej klatki, mierzone przez całą sesję. Dobry wynik to poniżej <strong>200 ms</strong>. Od marca 2024 zastąpił FID i to nie to samo co TBT.',
            en: 'The delay between an interaction and the next paint, measured across the whole session. Good is under <strong>200 ms</strong>. It replaced FID in March 2024 and is not the same as TBT.'
          }
        },
        {
          term: { pl: 'CLS (Cumulative Layout Shift)', en: 'CLS (Cumulative Layout Shift)' },
          def: {
            pl: 'Skumulowana miara nieoczekiwanych przeskoków układu. Dobry wynik to poniżej <strong>0,1</strong>; główne źródła to obrazy bez rezerwacji miejsca, podmiana fontu i treść wstrzykiwana po hydracji.',
            en: 'A cumulative measure of unexpected layout shifts. Good is under <strong>0.1</strong>; the main sources are unsized images, font swaps and content injected after hydration.'
          }
        },
        {
          term: { pl: 'p75', en: 'p75' },
          def: {
            pl: '75. percentyl, czyli wartość, poniżej której mieści się trzech na czterech użytkowników. Web Vitals raportuje się właśnie tak, bo średnia ukrywa najgorszą ćwiartkę ruchu.',
            en: 'The 75th percentile: the value three out of four users stay below. Web Vitals are reported this way because an average hides the worst quarter of traffic.'
          }
        },
        {
          term: { pl: 'Budżet wydajności', en: 'Performance budget' },
          def: {
            pl: 'Liczba zapisana w repozytorium i pilnowana przez CI (<code>size-limit</code>, asercje Lighthouse CI). Budżet bez właściciela i bez prawa blokowania merge jest tylko wykresem.',
            en: 'A number committed to the repo and enforced by CI (<code>size-limit</code>, Lighthouse CI assertions). A budget with no owner and no power to block a merge is just a chart.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
          + '<text x="20" y="28" font-size="15" fill="var(--text)">Core Web Vitals: p75 of real users</text>'
          + '<text x="20" y="82" font-size="14" fill="var(--text)">LCP</text>'
          + '<rect x="90" y="58" width="230" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="205" y="80" text-anchor="middle" font-size="13" fill="var(--ok)">good &lt;= 2.5 s</text>'
          + '<rect x="326" y="58" width="140" height="34" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="396" y="80" text-anchor="middle" font-size="13" fill="var(--warn)">&lt;= 4.0 s</text>'
          + '<rect x="472" y="58" width="148" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="546" y="80" text-anchor="middle" font-size="13" fill="var(--err)">poor</text>'
          + '<text x="20" y="152" font-size="14" fill="var(--text)">INP</text>'
          + '<rect x="90" y="128" width="230" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="205" y="150" text-anchor="middle" font-size="13" fill="var(--ok)">good &lt;= 200 ms</text>'
          + '<rect x="326" y="128" width="140" height="34" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="396" y="150" text-anchor="middle" font-size="13" fill="var(--warn)">&lt;= 500 ms</text>'
          + '<rect x="472" y="128" width="148" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="546" y="150" text-anchor="middle" font-size="13" fill="var(--err)">poor</text>'
          + '<text x="20" y="222" font-size="14" fill="var(--text)">CLS</text>'
          + '<rect x="90" y="198" width="230" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="205" y="220" text-anchor="middle" font-size="13" fill="var(--ok)">good &lt;= 0.1</text>'
          + '<rect x="326" y="198" width="140" height="34" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="396" y="220" text-anchor="middle" font-size="13" fill="var(--warn)">&lt;= 0.25</text>'
          + '<rect x="472" y="198" width="148" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="546" y="220" text-anchor="middle" font-size="13" fill="var(--err)">poor</text>'
          + '<rect x="20" y="272" width="600" height="104" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="40" y="302" font-size="14" fill="var(--accent)">Budget enforced on every pull request</text>'
          + '<text x="40" y="330" font-size="13" fill="var(--text)">JS on checkout route: 170 KB gzip max</text>'
          + '<text x="40" y="356" font-size="13" fill="var(--muted)">lab LCP 2.2 s on Moto G Power, 4G profile</text>'
          + '</svg>',
        caption: {
          pl: 'Progi Core Web Vitals liczone dla p75 realnych użytkowników, a pod spodem budżet, który blokuje pull requesta zanim regresja trafi na produkcję.',
          en: 'Core Web Vitals thresholds measured at the p75 of real users, with a budget underneath that blocks a pull request before the regression reaches production.',
        },
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że prowadzisz kawiarnię. Trzy rzeczy decydują o tym, czy ludzie wrócą: jak szybko dostają kawę, jak szybko kelner reaguje na machnięcie ręką i czy stolik nie ucieka nagle w bok, gdy sięgasz po filiżankę.</p>'
            + '<p>Strona internetowa ma dokładnie te same trzy rzeczy i nazywają się <strong>Web Vitals</strong>. Pierwsza: jak szybko pojawia się największy kawałek treści. Druga: jak szybko strona odpowiada na kliknięcie. Trzecia: czy nic nie podskakuje pod palcem w ostatniej chwili.</p>'
            + '<p>A <strong>budżet</strong> to obietnica, którą składasz sobie na piśmie: nasza kawa wyjeżdża w dwie minuty, kropka. Kiedy ktoś chce dorzucić do menu nowe, wolniejsze ciasto, najpierw sprawdzacie, czy kawa dalej wyjeżdża w dwie minuty. Jeśli nie, coś musi z menu wypaść.</p>'
            + '<p>Bez tej obietnicy każdy dokłada po odrobinie, nikt nie czuje się winny, a po roku ludzie stoją w kolejce dwadzieścia minut i nikt nie wie, kto to zepsuł.</p>',
          en: '<p>Imagine you run a coffee shop. Three things decide whether people come back: how fast they get their coffee, how fast a waiter reacts when they wave, and whether the table suddenly slides sideways as they reach for the cup.</p>'
            + '<p>A web page has exactly the same three things and they are called <strong>Web Vitals</strong>. First: how fast the biggest piece of content shows up. Second: how fast the page answers a tap. Third: whether anything jumps around under your finger at the last moment.</p>'
            + '<p>A <strong>budget</strong> is a promise you write down: our coffee leaves the bar in two minutes, full stop. When somebody wants to add a new, slower cake to the menu, you first check whether the coffee still leaves in two minutes. If it does not, something else has to go.</p>'
            + '<p>Without that promise everybody adds a little bit, nobody feels guilty, and a year later people queue for twenty minutes and no one knows who broke it.</p>',
        },
        school: {
          pl: '<p>Google zdefiniowało trzy <strong>Core Web Vitals</strong> i cała branża się na nie zgodziła, bo są mierzalne u realnych użytkowników:</p>'
            + '<ul>'
            + '<li><strong>LCP</strong> (Largest Contentful Paint - moment narysowania największego elementu treści): dobry poniżej 2,5 s.</li>'
            + '<li><strong>INP</strong> (Interaction to Next Paint - opóźnienie między interakcją a kolejnym rysowaniem klatki): dobry poniżej 200 ms. Od marca 2024 zastąpił FID.</li>'
            + '<li><strong>CLS</strong> (Cumulative Layout Shift - skumulowane przeskoki układu): dobry poniżej 0,1.</li>'
            + '</ul>'
            + '<p>Kluczowy szczegół: liczysz je jako <strong>p75</strong>, czyli 75. percentyl. To nie średnia. Jeśli Twoja mediana LCP to 1,4 s, a p75 wynosi 3,8 s, masz problem u jednej czwartej ludzi, których średnia skutecznie ukrywa. Dla telekomu z dziesięcioma milionami wizyt miesięcznie ta jedna czwarta to ponad dwa miliony sesji.</p>'
            + '<p>Budżet wydajności to liczba zapisana w repozytorium, której CI pilnuje za Ciebie. Najprostsza wersja to limit rozmiaru bundla:</p>'
            + '<pre><code>// .size-limit.json\n[\n  { "path": "dist/checkout.js", "limit": "170 kB" },\n  { "path": "dist/design-system.js", "limit": "48 kB" }\n]</code></pre>'
            + '<p>Kiedy ktoś doda bibliotekę do formatowania dat ważącą 60 kB, pull request robi się czerwony i rozmowa dzieje się <em>przed</em> mergem, a nie pół roku później na retrospektywie. To dokładnie ta sama logika co testy jednostkowe: nie ufasz dyscyplinie, ufasz automatowi.</p>'
            + '<p>Budżet bez właściciela jest tylko liczbą. Ktoś musi mieć prawo powiedzieć nie albo świadomie go podnieść i to zapisać.</p>',
          en: '<p>Google defined three <strong>Core Web Vitals</strong> and the industry agreed on them, because they can be measured on real users:</p>'
            + '<ul>'
            + '<li><strong>LCP</strong> (Largest Contentful Paint - when the biggest content element is painted): good below 2.5 s.</li>'
            + '<li><strong>INP</strong> (Interaction to Next Paint - the delay between an interaction and the next painted frame): good below 200 ms. It replaced FID in March 2024.</li>'
            + '<li><strong>CLS</strong> (Cumulative Layout Shift): good below 0.1.</li>'
            + '</ul>'
            + '<p>The key detail: you measure them at the <strong>p75</strong>, the 75th percentile. Not the average. If your median LCP is 1.4 s while p75 is 3.8 s, you have a problem for a quarter of your users that the average hides. For a telco with ten million visits a month that quarter is over two million sessions.</p>'
            + '<p>A performance budget is a number in the repository that CI enforces for you. The simplest version is a bundle size limit:</p>'
            + '<pre><code>// .size-limit.json\n[\n  { "path": "dist/checkout.js", "limit": "170 kB" },\n  { "path": "dist/design-system.js", "limit": "48 kB" }\n]</code></pre>'
            + '<p>When somebody adds a 60 kB date formatting library the pull request turns red and the conversation happens <em>before</em> the merge, not six months later in a retro. It is the same logic as unit tests: you do not trust discipline, you trust automation.</p>'
            + '<p>A budget without an owner is just a number. Someone must have the authority to say no, or to raise it deliberately and write down why.</p>',
        },
        pro: {
          pl: '<p>Na poziomie principal wydajność przestaje być zadaniem, a staje się <strong>ograniczeniem projektowym</strong>: liczbą, którą architektura musi respektować tak samo jak wymóg dostępności czy zgodności z RODO.</p>'
            + '<h4>Trzy warstwy pomiaru, nie jedna</h4>'
            + '<ul>'
            + '<li><strong>Lab</strong> (Lighthouse CI, WebPageTest): deterministyczny, dobry do porównań między commitami, kłamie o realnych warunkach.</li>'
            + '<li><strong>Field / RUM</strong> (biblioteka web-vitals, SpeedCurve, Datadog RUM): prawda o użytkownikach, wolna pętla zwrotna, wymaga ruchu.</li>'
            + '<li><strong>CrUX</strong>: dane Chrome dla p75 z 28 dni, tym karmi się Search Console. Zmiana widoczna dopiero po tygodniach.</li>'
            + '</ul>'
            + '<p>Bramka w CI musi być tania i deterministyczna, dlatego opiera się o lab i o rozmiar artefaktów. Rzeczywista ocena jakości opiera się o field.</p>'
            + '<pre><code>// lighthouserc.json\n{\n  "ci": {\n    "collect": { "numberOfRuns": 3, "settings": { "preset": "desktop" } },\n    "assert": {\n      "assertions": {\n        "largest-contentful-paint": ["error", { "maxNumericValue": 2200 }],\n        "total-blocking-time":      ["error", { "maxNumericValue": 200 }],\n        "cumulative-layout-shift":  ["error", { "maxNumericValue": 0.05 }]\n      }\n    }\n  }\n}</code></pre>'
            + '<h4>Budżet jako kontrakt zespołowy</h4>'
            + '<p>Rozbij globalny budżet na <strong>koperty per trasa</strong> i per pakiet. W telekomie realny podział to np. 170 kB gzip JS na ścieżce zakupowej, 90 kB na koszyku samoobsługowym, 48 kB na całym design systemie. Design system jest tu szczególny: każdy kilobajt mnoży się przez liczbę aplikacji, które go konsumują. Jeśli dorzucisz do wspólnego entry pointa ikonki ważące 30 kB, właśnie dodałeś 30 kB czternastu zespołom naraz, których nawet nie znasz.</p>'
            + '<p>Dlatego w bibliotece pilnuj trzech rzeczy: <code>sideEffects: false</code> w package.json, wejścia per komponent (subpath exports), oraz raportu <code>size-limit</code> komentowanego na PR. Statoscope albo <code>rollup-plugin-visualizer</code> przydają się do jednorazowej diagnozy, nie do bramki.</p>'
            + '<h4>Pułapki, o które pytają na rozmowach</h4>'
            + '<ul>'
            + '<li><strong>TBT nie jest INP.</strong> TBT mierzysz w labie na starcie strony, INP zbierasz przez całe życie sesji. Można mieć 100 punktów w Lighthouse i katastrofalny INP na widgetach, które użytkownik klika po dwóch minutach.</li>'
            + '<li><strong>Średnia zamiast p75.</strong> Klasyczny błąd raportu do zarządu, który maskuje segment Androida budżetowego.</li>'
            + '<li><strong>Budżet bez okresu przejściowego.</strong> Wprowadzony jednym commitem blokuje wszystkim pracę i zostaje wyłączony w piątek. Wprowadzaj go najpierw jako ostrzeżenie z raportem trendu, po dwóch sprintach jako błąd.</li>'
            + '</ul>'
            + '<p>Praktyka, która zmienia rozmowę z produktem: przelicz milisekundy na pieniądze. Jeśli w Twoim funnelu 100 ms LCP to historycznie 0,4 proc. konwersji, to zamiast bronić estetyki kodu negocjujesz konkretną kwotę i nagle budżet ma sponsora poza inżynierią.</p>',
          en: '<p>At principal level performance stops being a task and becomes a <strong>design constraint</strong>: a number the architecture has to respect the same way it respects accessibility or GDPR requirements.</p>'
            + '<h4>Three measurement layers, not one</h4>'
            + '<ul>'
            + '<li><strong>Lab</strong> (Lighthouse CI, WebPageTest): deterministic, great for commit-to-commit comparison, lies about real conditions.</li>'
            + '<li><strong>Field / RUM</strong> (the web-vitals library, SpeedCurve, Datadog RUM): the truth about users, slow feedback loop, needs traffic.</li>'
            + '<li><strong>CrUX</strong>: Chrome p75 data over a 28-day window, the source Search Console uses. Changes show up only after weeks.</li>'
            + '</ul>'
            + '<p>The CI gate must be cheap and deterministic, so it leans on lab metrics and artifact size. The actual quality judgement leans on field data.</p>'
            + '<pre><code>// lighthouserc.json\n{\n  "ci": {\n    "collect": { "numberOfRuns": 3, "settings": { "preset": "desktop" } },\n    "assert": {\n      "assertions": {\n        "largest-contentful-paint": ["error", { "maxNumericValue": 2200 }],\n        "total-blocking-time":      ["error", { "maxNumericValue": 200 }],\n        "cumulative-layout-shift":  ["error", { "maxNumericValue": 0.05 }]\n      }\n    }\n  }\n}</code></pre>'
            + '<h4>The budget as a team contract</h4>'
            + '<p>Split the global budget into <strong>envelopes per route</strong> and per package. In a telco a realistic split is 170 kB gzip of JS on the purchase path, 90 kB on the self-service basket, 48 kB for the whole design system. The design system is special: every kilobyte is multiplied by the number of apps consuming it. Add 30 kB of icons to the shared entry point and you just added 30 kB to fourteen teams at once, most of whom you have never met.</p>'
            + '<p>So in the library guard three things: <code>sideEffects: false</code> in package.json, per-component entry points via subpath exports, and a <code>size-limit</code> report commented on the PR. Statoscope or <code>rollup-plugin-visualizer</code> are for one-off diagnosis, not for the gate.</p>'
            + '<h4>Traps interviewers ask about</h4>'
            + '<ul>'
            + '<li><strong>TBT is not INP.</strong> TBT is a lab metric at page load, INP is collected across the whole session. You can score 100 in Lighthouse and have a catastrophic INP on widgets the user clicks two minutes in.</li>'
            + '<li><strong>Averages instead of p75.</strong> The classic board-report mistake that hides the budget-Android segment.</li>'
            + '<li><strong>A budget with no ramp.</strong> Introduced in one commit it blocks everybody and gets switched off on Friday. Ship it as a warning with a trend report first, promote it to an error two sprints later.</li>'
            + '</ul>'
            + '<p>The practice that changes the conversation with product: convert milliseconds into money. If 100 ms of LCP has historically been worth 0.4 percent of conversion in your funnel, you stop defending code aesthetics and start negotiating a number, and suddenly the budget has a sponsor outside engineering.</p>',
        },
      },
      quiz: [
        {
          q: {
            pl: 'Który zestaw metryk to dzisiejsze Core Web Vitals?',
            en: 'Which set of metrics are today the Core Web Vitals?',
          },
          options: [
            { pl: 'FCP, TTI, TBT', en: 'FCP, TTI, TBT' },
            { pl: 'LCP, INP, CLS', en: 'LCP, INP, CLS' },
            { pl: 'LCP, FID, TTFB', en: 'LCP, FID, TTFB' },
            { pl: 'Lighthouse score, INP, rozmiar bundla', en: 'Lighthouse score, INP, bundle size' },
          ],
          correct: 1,
          explain: {
            pl: 'INP zastąpił FID w marcu 2024. FCP, TTI, TBT i TTFB są przydatnymi metrykami diagnostycznymi, ale nie należą do Core Web Vitals.',
            en: 'INP replaced FID in March 2024. FCP, TTI, TBT and TTFB are useful diagnostic metrics but are not Core Web Vitals.',
          },
        },
        {
          q: {
            pl: 'Dlaczego Web Vitals raportuje się jako p75, a nie jako średnią?',
            en: 'Why are Web Vitals reported at p75 rather than as an average?',
          },
          options: [
            { pl: 'Bo p75 jest tańsze obliczeniowo w hurtowni danych', en: 'Because p75 is computationally cheaper in the data warehouse' },
            { pl: 'Bo Chrome nie potrafi wyliczyć średniej z pola', en: 'Because Chrome cannot compute an average from field data' },
            { pl: 'Bo średnia maskuje wolny ogon rozkładu i całe segmenty urządzeń', en: 'Because an average hides the slow tail of the distribution and whole device segments' },
            { pl: 'Bo p75 jest odporne na próbkowanie i pozwala mierzyć 1 proc. ruchu', en: 'Because p75 is sampling-proof and lets you measure 1 percent of traffic' },
          ],
          correct: 2,
          explain: {
            pl: 'Rozkłady wydajności są mocno skośne. p75 gwarantuje, że mówisz o doświadczeniu trzech czwartych sesji, a nie o wygodnej średniej ciągniętej przez szybkie desktopy.',
            en: 'Performance distributions are heavily skewed. p75 guarantees you describe the experience of three quarters of sessions instead of a convenient average pulled up by fast desktops.',
          },
        },
        {
          q: {
            pl: 'Dodajesz do wspólnego entry pointa design systemu 30 kB ikon. Jaki jest największy koszt architektoniczny?',
            en: 'You add 30 kB of icons to the shared design-system entry point. What is the biggest architectural cost?',
          },
          options: [
            { pl: 'Koszt mnoży się przez wszystkie aplikacje konsumujące bibliotekę', en: 'The cost is multiplied across every application consuming the library' },
            { pl: 'Wydłuża się czas builda biblioteki w CI', en: 'The library build time in CI gets longer' },
            { pl: 'Rośnie zużycie pamięci przy hydracji', en: 'Memory usage during hydration goes up' },
            { pl: 'Storybook przestanie się poprawnie budować', en: 'Storybook will stop building correctly' },
          ],
          correct: 0,
          explain: {
            pl: 'Biblioteka współdzielona ma dźwignię: jeden kilobajt razy czternaście aplikacji. Dlatego ikony i inne opcjonalne zasoby powinny mieć osobne wejścia (subpath exports), a nie leżeć w barrelu.',
            en: 'A shared library has leverage: one kilobyte times fourteen apps. That is why icons and other optional assets belong behind subpath exports, not in the barrel file.',
          },
        },
        {
          q: {
            pl: 'Aplikacja ma 98 punktów w Lighthouse, ale p75 INP z RUM wynosi 480 ms. Co jest najbardziej prawdopodobne?',
            en: 'An app scores 98 in Lighthouse but the p75 INP from RUM is 480 ms. What is the most likely explanation?',
          },
          options: [
            { pl: 'RUM jest źle skonfigurowany, bo Lighthouse mierzy to samo', en: 'RUM is misconfigured, because Lighthouse measures the same thing' },
            { pl: 'Serwer ma zbyt wysoki TTFB w godzinach szczytu', en: 'The server has a high TTFB during peak hours' },
            { pl: 'Obrazy nie mają wymiarów, więc rośnie CLS i zaburza INP', en: 'Images lack dimensions, so CLS grows and distorts INP' },
            { pl: 'Ciężkie interakcje występują po załadowaniu, poza oknem pomiaru Lighthouse', en: 'The heavy interactions happen after load, outside the Lighthouse measurement window' },
          ],
          correct: 3,
          explain: {
            pl: 'Lighthouse ocenia głównie start strony i TBT. INP zbiera się przez całą sesję, więc filtry, tabele czy modale klikane po minucie nie mają szans pojawić się w audycie labowym.',
            en: 'Lighthouse mostly grades page load and TBT. INP is collected across the whole session, so filters, tables or modals clicked a minute in never show up in a lab audit.',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'rendering-strategies',
      title: { pl: 'Strategie renderowania: CSR, SSR, SSG, ISR, streaming', en: 'Rendering strategies: CSR, SSR, SSG, ISR, streaming' },
      minutes: 13,
      terms: [
        {
          term: { pl: 'TTFB (Time To First Byte)', en: 'TTFB (Time To First Byte)' },
          def: {
            pl: 'Czas do pierwszego bajtu odpowiedzi. Przy SSR zależy od najwolniejszego backendu w łańcuchu, przy SSG i ISR odpowiada CDN z gotowego pliku.',
            en: 'Time to the first byte of the response. Under SSR it depends on the slowest backend in the chain; under SSG and ISR the CDN answers from a ready file.'
          }
        },
        {
          term: { pl: 'SSR (Server-Side Rendering)', en: 'SSR (Server-Side Rendering)' },
          def: {
            pl: 'HTML generowany na żądanie, per użytkownik. Zawsze świeży i indeksowalny, ale oznacza serwer: skalowanie, obserwowalność, incydenty i realny rachunek przy 10 mln żądań miesięcznie.',
            en: 'HTML generated per request, per user. Always fresh and indexable, but it means a server: scaling, observability, incidents and a real bill at 10M requests a month.'
          }
        },
        {
          term: { pl: 'ISR (Incremental Static Regeneration)', en: 'ISR (Incremental Static Regeneration)' },
          def: {
            pl: 'Statyczny HTML z datą ważności (<code>revalidate</code>): pierwszy użytkownik po wygaśnięciu dostaje starą wersję, a świeża powstaje w tle. Cena to unieważnianie cache na wszystkich POP-ach CDN.',
            en: 'Static HTML with a time to live (<code>revalidate</code>): the first user after expiry gets the stale copy while a fresh one is built in the background. The price is cache invalidation across every CDN POP.'
          }
        },
        {
          term: { pl: 'Streaming SSR', en: 'Streaming SSR' },
          def: {
            pl: 'Serwer wypycha HTML kawałkami, a granice <code>&lt;Suspense&gt;</code> pozwalają wysłać szkielet natychmiast i dosłać wolną sekcję później. Backend nie przyspiesza, ale treść pojawia się kilka razy wcześniej.',
            en: 'The server pushes HTML in chunks, and <code>&lt;Suspense&gt;</code> boundaries let the shell go out immediately while a slow section arrives later. The backend gets no faster, but content appears several times sooner.'
          }
        },
        {
          term: { pl: 'Hydracja (hydration)', en: 'Hydration' },
          def: {
            pl: 'Doczepianie interaktywności Reacta lub Vue do HTML z serwera. Między pierwszym paintem a końcem hydracji strona wygląda na gotową i nie reaguje - na tanim telefonie to 800-1500 ms.',
            en: 'Attaching React or Vue interactivity to server HTML. Between first paint and the end of hydration the page looks ready and does not respond - on a cheap phone that is 800-1500 ms.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
          + '<text x="20" y="26" font-size="15" fill="var(--text)">Where the HTML is produced</text>'
          + '<line x1="70" y1="330" x2="620" y2="330" stroke="var(--border)" stroke-width="2"/>'
          + '<line x1="70" y1="330" x2="70" y2="60" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="345" y="362" text-anchor="middle" font-size="13" fill="var(--muted)">freshness of data</text>'
          + '<text x="52" y="200" text-anchor="middle" font-size="13" fill="var(--muted)" transform="rotate(-90 52 200)">time to first content</text>'
          + '<rect x="110" y="76" width="150" height="52" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="185" y="98" text-anchor="middle" font-size="13" fill="var(--text)">CSR</text>'
          + '<text x="185" y="118" text-anchor="middle" font-size="12" fill="var(--muted)">slow, always fresh</text>'
          + '<rect x="410" y="240" width="160" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="490" y="262" text-anchor="middle" font-size="13" fill="var(--text)">SSG</text>'
          + '<text x="490" y="282" text-anchor="middle" font-size="12" fill="var(--muted)">fast, can be stale</text>'
          + '<rect x="240" y="160" width="160" height="52" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="320" y="182" text-anchor="middle" font-size="13" fill="var(--text)">SSR</text>'
          + '<text x="320" y="202" text-anchor="middle" font-size="12" fill="var(--muted)">server does the work</text>'
          + '<rect x="410" y="150" width="160" height="52" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="490" y="172" text-anchor="middle" font-size="13" fill="var(--text)">ISR</text>'
          + '<text x="490" y="192" text-anchor="middle" font-size="12" fill="var(--muted)">cache with revalidate</text>'
          + '<rect x="150" y="240" width="200" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="250" y="262" text-anchor="middle" font-size="13" fill="var(--text)">Streaming SSR</text>'
          + '<text x="250" y="282" text-anchor="middle" font-size="12" fill="var(--muted)">shell now, data later</text>'
          + '</svg>',
        caption: {
          pl: 'Strategie renderowania na dwóch osiach: jak szybko użytkownik widzi treść i jak świeże są dane. Streaming SSR to próba zjedzenia ciastka i zachowania go.',
          en: 'Rendering strategies on two axes: how fast the user sees content and how fresh the data is. Streaming SSR is the attempt to have the cake and eat it.',
        },
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Oś czasu jednego żądania w streaming SSR: co dokładnie ląduje w przeglądarce i kiedy.',
          en: 'The timeline of a single streaming SSR request: what exactly lands in the browser and when.',
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<rect x="60" y="30" width="520" height="220" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<text x="320" y="145" text-anchor="middle" font-size="14" fill="var(--muted)">blank page</text>'
              + '<line x1="60" y1="300" x2="580" y2="300" stroke="var(--border)" stroke-width="2"/>'
              + '<circle cx="60" cy="300" r="8" fill="var(--accent)"/>'
              + '<text x="60" y="332" text-anchor="middle" font-size="13" fill="var(--accent)">0 ms</text>'
              + '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">request leaves the phone</text>'
              + '</svg>',
            label: { pl: 'Żądanie wysłane', en: 'Request sent' },
            note: {
              pl: 'Użytkownik widzi jeszcze poprzednią stronę albo biel. Tu liczy się tylko RTT i czas, w jakim serwer zacznie odpowiadać.',
              en: 'The user still sees the previous page or white. Only RTT and how fast the server starts answering matter here.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<rect x="60" y="30" width="520" height="220" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="80" y="48" width="480" height="40" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="320" y="74" text-anchor="middle" font-size="13" fill="var(--text)">header and nav</text>'
              + '<text x="320" y="170" text-anchor="middle" font-size="14" fill="var(--muted)">nothing here yet</text>'
              + '<line x1="60" y1="300" x2="580" y2="300" stroke="var(--border)" stroke-width="2"/>'
              + '<line x1="60" y1="300" x2="170" y2="300" stroke="var(--accent)" stroke-width="6"/>'
              + '<circle cx="170" cy="300" r="8" fill="var(--accent)"/>'
              + '<text x="170" y="332" text-anchor="middle" font-size="13" fill="var(--accent)">180 ms</text>'
              + '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">first chunk flushed: the shell</text>'
              + '</svg>',
            label: { pl: 'Shell wypchnięty', en: 'Shell flushed' },
            note: {
              pl: 'Serwer nie czeka na dane. Wysyła gotowy nagłówek i szkielet strony jako pierwszy chunk, więc TTFB nie zależy już od najwolniejszego backendu.',
              en: 'The server does not wait for data. It flushes the header and page skeleton as the first chunk, so TTFB no longer depends on the slowest backend.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<rect x="60" y="30" width="520" height="220" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="80" y="48" width="480" height="40" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="320" y="74" text-anchor="middle" font-size="13" fill="var(--text)">header and nav</text>'
              + '<rect x="80" y="104" width="480" height="60" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>'
              + '<text x="320" y="140" text-anchor="middle" font-size="13" fill="var(--warn)">skeleton: tariff list</text>'
              + '<rect x="80" y="180" width="480" height="52" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>'
              + '<text x="320" y="212" text-anchor="middle" font-size="13" fill="var(--warn)">skeleton: recommendations</text>'
              + '<line x1="60" y1="300" x2="580" y2="300" stroke="var(--border)" stroke-width="2"/>'
              + '<line x1="60" y1="300" x2="270" y2="300" stroke="var(--accent)" stroke-width="6"/>'
              + '<circle cx="270" cy="300" r="8" fill="var(--accent)"/>'
              + '<text x="270" y="332" text-anchor="middle" font-size="13" fill="var(--accent)">350 ms</text>'
              + '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">Suspense fallbacks painted</text>'
              + '</svg>',
            label: { pl: 'Fallbacki Suspense', en: 'Suspense fallbacks' },
            note: {
              pl: 'Każda granica Suspense rezerwuje miejsce o właściwej wysokości. To nie tylko estetyka - dzięki temu późniejsze wstawienie treści nie generuje CLS.',
              en: 'Every Suspense boundary reserves space at the right height. This is not only cosmetic - it stops the later content insertion from producing CLS.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<rect x="60" y="30" width="520" height="220" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="80" y="48" width="480" height="40" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="320" y="74" text-anchor="middle" font-size="13" fill="var(--text)">header and nav</text>'
              + '<rect x="80" y="104" width="480" height="60" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="320" y="140" text-anchor="middle" font-size="13" fill="var(--text)">tariff list, real data</text>'
              + '<rect x="80" y="180" width="480" height="52" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>'
              + '<text x="320" y="212" text-anchor="middle" font-size="13" fill="var(--warn)">skeleton: recommendations</text>'
              + '<line x1="60" y1="300" x2="580" y2="300" stroke="var(--border)" stroke-width="2"/>'
              + '<line x1="60" y1="300" x2="420" y2="300" stroke="var(--accent)" stroke-width="6"/>'
              + '<circle cx="420" cy="300" r="8" fill="var(--accent)"/>'
              + '<text x="420" y="332" text-anchor="middle" font-size="13" fill="var(--accent)">700 ms</text>'
              + '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">slot swapped in place, LCP here</text>'
              + '</svg>',
            label: { pl: 'Dane dopływają', en: 'Data streams in' },
            note: {
              pl: 'Szybkie API domyka swoją granicę i podmienia skeleton, a wolne rekomendacje nadal ładują się obok. Jeden wolny endpoint nie blokuje już całej strony.',
              en: 'The fast API resolves its boundary and swaps the skeleton, while the slow recommendations keep loading next to it. One slow endpoint no longer blocks the whole page.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<rect x="60" y="30" width="520" height="220" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="80" y="48" width="480" height="40" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="320" y="74" text-anchor="middle" font-size="13" fill="var(--text)">header and nav</text>'
              + '<rect x="80" y="104" width="480" height="60" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="320" y="140" text-anchor="middle" font-size="13" fill="var(--text)">tariff list, real data</text>'
              + '<rect x="80" y="180" width="480" height="52" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="320" y="212" text-anchor="middle" font-size="13" fill="var(--text)">recommendations, interactive</text>'
              + '<line x1="60" y1="300" x2="580" y2="300" stroke="var(--border)" stroke-width="2"/>'
              + '<line x1="60" y1="300" x2="520" y2="300" stroke="var(--accent2)" stroke-width="6"/>'
              + '<circle cx="520" cy="300" r="8" fill="var(--accent2)"/>'
              + '<text x="520" y="332" text-anchor="middle" font-size="13" fill="var(--accent2)">1100 ms</text>'
              + '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">hydration done, clicks respond</text>'
              + '</svg>',
            label: { pl: 'Hydracja i interaktywność', en: 'Hydration and interactivity' },
            note: {
              pl: 'Dopiero teraz kliknięcia działają. Między 350 a 1100 ms strona wygląda na gotową, ale nie odpowiada - to najczęstsze źródło skarg na INP i uncanny valley SSR.',
              en: 'Only now do clicks work. Between 350 and 1100 ms the page looks ready but does not respond - the most common source of INP complaints and the SSR uncanny valley.',
            },
          },
        ],
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie pizzerię. Są cztery sposoby, żeby podać klientowi pizzę.</p>'
            + '<p><strong>Pierwszy:</strong> dajesz mu mąkę, ser i przepis, niech sobie zrobi sam w domu. Szybko wychodzi z lokalu, ale je dopiero po godzinie. To jest robienie strony w przeglądarce.</p>'
            + '<p><strong>Drugi:</strong> pieczesz na miejscu, na zamówienie. Klient chwilę czeka przy ladzie, ale wychodzi z gorącą pizzą. To jest serwer, który składa stronę.</p>'
            + '<p><strong>Trzeci:</strong> upiekłeś tysiąc pizz w nocy i trzymasz je na półce. Klient dostaje swoją natychmiast, tylko może być z wczoraj. To strony przygotowane z góry.</p>'
            + '<p><strong>Czwarty, najsprytniejszy:</strong> podajesz od razu talerz, sztućce i chleb, a pizza dojeżdża do stolika, kiedy się dopiecze. Klient już siedzi, już coś ma, nie gapi się w pustkę.</p>'
            + '<p>Cała sztuka polega na tym, żeby wiedzieć, która pizza jest z półki, a która musi być świeża.</p>',
          en: '<p>Picture a pizzeria. There are four ways to serve a customer.</p>'
            + '<p><strong>One:</strong> hand them flour, cheese and a recipe and let them bake at home. They leave fast but eat in an hour. That is building the page in the browser.</p>'
            + '<p><strong>Two:</strong> bake it on the spot, to order. They wait at the counter for a while, then walk out with a hot pizza. That is the server assembling the page.</p>'
            + '<p><strong>Three:</strong> you baked a thousand pizzas overnight and keep them on a shelf. The customer gets one instantly, but it may be yesterday\'s. Those are pages prepared in advance.</p>'
            + '<p><strong>Four, the clever one:</strong> you immediately bring a plate, cutlery and bread, and the pizza arrives at the table once it is out of the oven. The customer is already seated, already has something, not staring at nothing.</p>'
            + '<p>The whole craft is knowing which pizza can come from the shelf and which one has to be fresh.</p>',
        },
        school: {
          pl: '<p>Pięć nazw, które padają na każdym przeglądzie architektury:</p>'
            + '<ul>'
            + '<li><strong>CSR</strong> (Client-Side Rendering): serwer wysyła pusty div i bundle JS. Świetne dla panelu administracyjnego za loginem, fatalne dla strony z ofertą, którą ma indeksować Google.</li>'
            + '<li><strong>SSR</strong> (Server-Side Rendering): HTML powstaje na żądanie. Zawsze świeży, ale TTFB zależy od najwolniejszego backendu w łańcuchu.</li>'
            + '<li><strong>SSG</strong> (Static Site Generation): HTML powstaje w czasie builda i leży na CDN. Najszybsze, co istnieje, ale build 40 tysięcy stron trwa godziny.</li>'
            + '<li><strong>ISR</strong> (Incremental Static Regeneration): statyk z datą ważności. Pierwszy użytkownik po wygaśnięciu dostaje starą wersję, a w tle powstaje nowa.</li>'
            + '<li><strong>Streaming SSR</strong>: serwer wypycha HTML kawałkami, zamiast czekać na całość.</li>'
            + '</ul>'
            + '<p>Streaming to najciekawszy przypadek, bo rozbija stronę na niezależne sekcje:</p>'
            + '<pre><code>&lt;Suspense fallback={&lt;TariffSkeleton /&gt;}&gt;\n  &lt;TariffList /&gt;   {/* czeka na wolne API billingowe */}\n&lt;/Suspense&gt;</code></pre>'
            + '<p>Nagłówek, nawigacja i stopka lecą do przeglądarki po 150 ms, a lista taryf dojeżdża po sekundzie i wskakuje w zarezerwowane miejsce. Użytkownik widzi treść trzy razy szybciej, mimo że backend nie przyspieszył ani o milisekundę.</p>'
            + '<p>Ważne, żeby nie myśleć o tym jako o wyborze jednej strategii na całą aplikację. W realnym portalu telekomu strona główna bywa ISR z rewalidacją co 5 minut, konfigurator taryf jest streaming SSR, a Moje Konto to zwykły CSR za loginem, bo i tak nikt go nie indeksuje.</p>',
          en: '<p>Five names that come up in every architecture review:</p>'
            + '<ul>'
            + '<li><strong>CSR</strong> (Client-Side Rendering): the server sends an empty div plus a JS bundle. Great for an admin panel behind a login, terrible for an offer page Google must index.</li>'
            + '<li><strong>SSR</strong> (Server-Side Rendering): HTML is produced per request. Always fresh, but TTFB depends on the slowest backend in the chain.</li>'
            + '<li><strong>SSG</strong> (Static Site Generation): HTML is produced at build time and sits on a CDN. The fastest thing that exists, but building 40 thousand pages takes hours.</li>'
            + '<li><strong>ISR</strong> (Incremental Static Regeneration): static with an expiry date. The first user after expiry gets the stale copy while a fresh one is generated in the background.</li>'
            + '<li><strong>Streaming SSR</strong>: the server flushes HTML in chunks instead of waiting for the whole document.</li>'
            + '</ul>'
            + '<p>Streaming is the most interesting case because it splits the page into independent sections:</p>'
            + '<pre><code>&lt;Suspense fallback={&lt;TariffSkeleton /&gt;}&gt;\n  &lt;TariffList /&gt;   {/* waits for the slow billing API */}\n&lt;/Suspense&gt;</code></pre>'
            + '<p>Header, nav and footer reach the browser after 150 ms, while the tariff list arrives a second later and drops into reserved space. The user sees content three times sooner even though the backend did not get a millisecond faster.</p>'
            + '<p>The important part is not to treat this as one strategy for the whole app. In a real telco portal the homepage may be ISR revalidated every 5 minutes, the tariff configurator streaming SSR, and My Account plain CSR behind a login because nobody indexes it anyway.</p>',
        },
        pro: {
          pl: '<p>Strategia renderowania jest decyzją <strong>per trasa</strong>, a jej prawdziwym kryterium nie jest moda, tylko trzy pytania: kto musi to zobaczyć bez logowania, jak bardzo dane mogą być nieświeże i kto zapłaci za serwer.</p>'
            + '<h4>Macierz decyzyjna, której używam</h4>'
            + '<table>'
            + '<tr><th>Trasa</th><th>Strategia</th><th>Dlaczego</th></tr>'
            + '<tr><td>Landing kampanii</td><td>SSG na CDN</td><td>SEO, szczyt 200 tys. odsłon w godzinę po spocie TV</td></tr>'
            + '<tr><td>Katalog ofert</td><td>ISR, revalidate 300 s</td><td>ceny zmieniają się rzadko, treść musi być w indeksie</td></tr>'
            + '<tr><td>Konfigurator taryfy</td><td>Streaming SSR</td><td>dane per użytkownik, wolne API billingowe</td></tr>'
            + '<tr><td>Moje Konto</td><td>CSR + prefetch</td><td>za loginem, zero wartości SEO, dużo interakcji</td></tr>'
            + '</table>'
            + '<h4>Koszty, o których nikt nie mówi na starcie</h4>'
            + '<p>SSR to jest <strong>serwer</strong>: skalowanie, obserwowalność, rotacja sekretów, incydenty o trzeciej w nocy i rachunek, który przy 10 mln żądań miesięcznie potrafi urosnąć z zera do kilku tysięcy euro. SSG to <strong>build</strong>: przy 40 tysiącach stron produktowych pełny build trwa godzinę, więc potrzebujesz on-demand ISR albo partial prerendering, inaczej literówka w cenniku czeka na deploy. ISR to <strong>cache invalidation</strong>, czyli jeden z dwóch klasycznie trudnych problemów, tylko rozproszony po wszystkich POP-ach CDN-u.</p>'
            + '<pre><code>// Next.js App Router, per-route\nexport const revalidate = 300;            // ISR\nexport const dynamic = "force-dynamic";   // SSR na żądanie\n\n// unieważnienie punktowe po zmianie w CMS\nrevalidateTag("tariffs");</code></pre>'
            + '<h4>Hydracja to ukryty koszt SSR</h4>'
            + '<p>Sam HTML z serwera poprawia LCP, ale nie poprawia INP. Między pierwszym paintem a końcem hydracji strona wygląda na gotową i nie odpowiada. Na telefonie za 600 zł ta luka to realnie 800-1500 ms. Odpowiedzi architektoniczne: selektywna hydracja (React Server Components, Astro islands), <code>client:visible</code> dla widgetów pod foldem, Qwik z resumability jako opcja skrajna. W praktyce najtańsza wygrana to po prostu mniej komponentów klienckich - w RSC granica <code>use client</code> jest granicą budżetu.</p>'
            + '<h4>Perspektywa design systemu</h4>'
            + '<p>Twoja biblioteka musi działać we wszystkich tych trybach naraz, bo konsumenci mają różne stacki - Nuxt, Next, stara aplikacja SPA na Vite. To wymusza konkretne reguły: żadnego dostępu do <code>window</code> na poziomie modułu, identyfikatory generowane deterministycznie (<code>useId</code>, nie <code>Math.random</code>), stan portali i modali odporny na brak DOM, oraz komponenty czysto prezentacyjne domyślnie bez <code>use client</code>. Jeden nieostrożny <code>document.querySelector</code> w kodzie inicjalizującym potrafi wywalić SSR czternastu aplikacjom - i to Ty będziesz to debugować.</p>'
            + '<p>Antywzorzec, który widuję najczęściej: cała aplikacja przepisana na SSR, bo tak było w prezentacji na konferencji, przy czym 80 proc. ruchu i tak ląduje za loginem. Zapłaciliście za serwery, dostaliście wolniejsze wdrożenia i nowy pager.</p>',
          en: '<p>Rendering strategy is a <strong>per-route</strong> decision, and the real criterion is not fashion but three questions: who has to see this without logging in, how stale can the data be, and who pays for the servers.</p>'
            + '<h4>The decision matrix I use</h4>'
            + '<table>'
            + '<tr><th>Route</th><th>Strategy</th><th>Why</th></tr>'
            + '<tr><td>Campaign landing</td><td>SSG on the CDN</td><td>SEO, a 200k-view spike in the hour after a TV spot</td></tr>'
            + '<tr><td>Offer catalogue</td><td>ISR, revalidate 300 s</td><td>prices change rarely, content must be indexed</td></tr>'
            + '<tr><td>Tariff configurator</td><td>Streaming SSR</td><td>per-user data, slow billing API</td></tr>'
            + '<tr><td>My Account</td><td>CSR plus prefetch</td><td>behind a login, zero SEO value, interaction heavy</td></tr>'
            + '</table>'
            + '<h4>The costs nobody mentions upfront</h4>'
            + '<p>SSR means a <strong>server</strong>: scaling, observability, secret rotation, 3 a.m. incidents and a bill that at 10 million requests a month can go from zero to several thousand euro. SSG means a <strong>build</strong>: with 40 thousand product pages a full build takes an hour, so you need on-demand ISR or partial prerendering, otherwise a typo in the price list waits for a deploy. ISR means <strong>cache invalidation</strong>, one of the two classically hard problems, now distributed across every CDN POP.</p>'
            + '<pre><code>// Next.js App Router, per route\nexport const revalidate = 300;            // ISR\nexport const dynamic = "force-dynamic";   // per-request SSR\n\n// targeted invalidation after a CMS change\nrevalidateTag("tariffs");</code></pre>'
            + '<h4>Hydration is the hidden cost of SSR</h4>'
            + '<p>Server HTML improves LCP but does nothing for INP. Between first paint and the end of hydration the page looks ready and does not respond. On a 150 euro Android phone that gap is realistically 800-1500 ms. The architectural answers: selective hydration (React Server Components, Astro islands), <code>client:visible</code> for below-the-fold widgets, Qwik with resumability as the extreme option. In practice the cheapest win is simply fewer client components - in RSC the <code>use client</code> boundary is a budget boundary.</p>'
            + '<h4>The design-system angle</h4>'
            + '<p>Your library has to work in all of these modes at once, because consumers run different stacks - Nuxt, Next, an old Vite SPA. That forces concrete rules: no module-level <code>window</code> access, deterministic ids (<code>useId</code>, never <code>Math.random</code>), portal and modal state that survives having no DOM, and purely presentational components shipping without <code>use client</code>. One careless <code>document.querySelector</code> in init code can break SSR for fourteen apps - and you will be the one debugging it.</p>'
            + '<p>The anti-pattern I see most: the whole app rewritten to SSR because a conference talk said so, while 80 percent of traffic sits behind a login anyway. You paid for servers, got slower deploys and a new pager rotation.</p>',
        },
      },
      quiz: [
        {
          q: {
            pl: 'Która strategia daje najniższy TTFB przy nagłym szczycie ruchu po spocie telewizyjnym?',
            en: 'Which strategy gives the lowest TTFB during a sudden traffic spike after a TV spot?',
          },
          options: [
            { pl: 'SSR z autoskalowaniem podów', en: 'SSR with pod autoscaling' },
            { pl: 'CSR z agresywnym prefetchem', en: 'CSR with aggressive prefetch' },
            { pl: 'SSG serwowane z CDN', en: 'SSG served from a CDN' },
            { pl: 'Streaming SSR z Suspense', en: 'Streaming SSR with Suspense' },
          ],
          correct: 2,
          explain: {
            pl: 'Statyczny plik na krawędzi CDN nie wymaga żadnego obliczenia i skaluje się liniowo. SSR musi w tym czasie skalować pody i chronić backend przed lawiną.',
            en: 'A static file at the CDN edge needs no computation and scales linearly. SSR meanwhile has to scale pods and shield the backend from the stampede.',
          },
        },
        {
          q: {
            pl: 'Co realnie zyskujesz, opakowując wolną sekcję w granicę Suspense przy streaming SSR?',
            en: 'What do you actually gain by wrapping a slow section in a Suspense boundary under streaming SSR?',
          },
          options: [
            { pl: 'Reszta strony może zostać wysłana i narysowana, nie czekając na te dane', en: 'The rest of the page can be flushed and painted without waiting for that data' },
            { pl: 'Zapytanie do API wykonuje się szybciej, bo trafia do osobnego wątku', en: 'The API call runs faster because it goes to a separate thread' },
            { pl: 'Hydracja całej strony kończy się wcześniej', en: 'Hydration of the whole page finishes earlier' },
            { pl: 'Dane są automatycznie cache-owane na krawędzi CDN', en: 'The data is automatically cached at the CDN edge' },
          ],
          correct: 0,
          explain: {
            pl: 'Suspense nie przyspiesza backendu ani hydracji - odblokowuje wysyłkę reszty dokumentu. Zyskujesz TTFB i LCP, a nie czas odpowiedzi API.',
            en: 'Suspense speeds up neither the backend nor hydration - it unblocks flushing the rest of the document. You gain TTFB and LCP, not API response time.',
          },
        },
        {
          q: {
            pl: 'Zespół zgłasza: strona wygląda na gotową po 400 ms, ale kliknięcia nic nie robią przez kolejną sekundę. Co to jest?',
            en: 'A team reports: the page looks ready after 400 ms but clicks do nothing for another second. What is this?',
          },
          options: [
            { pl: 'Zbyt agresywna rewalidacja ISR', en: 'Overly aggressive ISR revalidation' },
            { pl: 'Brak wymiarów obrazów powodujący CLS', en: 'Missing image dimensions causing CLS' },
            { pl: 'Zbyt niski limit połączeń HTTP/2', en: 'A too low HTTP/2 connection limit' },
            { pl: 'Luka hydracyjna: HTML jest, ale JS jeszcze nie podpiął handlerów', en: 'The hydration gap: HTML is there but JS has not attached handlers yet' },
          ],
          correct: 3,
          explain: {
            pl: 'To klasyczna uncanny valley SSR. Lekarstwem jest mniej kodu klienckiego i selektywna hydracja (RSC, wyspy), a nie szybszy serwer.',
            en: 'This is the classic SSR uncanny valley. The cure is less client code and selective hydration (RSC, islands), not a faster server.',
          },
        },
        {
          q: {
            pl: 'Które ograniczenie w bibliotece komponentów jest najważniejsze, żeby działała u konsumentów renderujących po stronie serwera?',
            en: 'Which constraint in a component library matters most so it works for server-rendering consumers?',
          },
          options: [
            { pl: 'Publikowanie wyłącznie w formacie ESM', en: 'Publishing in ESM format only' },
            { pl: 'Zero dostępu do window/document na poziomie modułu i deterministyczne id', en: 'No module-level window/document access and deterministic ids' },
            { pl: 'Style wyłącznie w CSS Modules zamiast CSS-in-JS', en: 'Styles only in CSS Modules instead of CSS-in-JS' },
            { pl: 'Oznaczanie każdego komponentu dyrektywą use client', en: 'Marking every component with the use client directive' },
          ],
          correct: 1,
          explain: {
            pl: 'Kod modułu wykonuje się na serwerze, gdzie nie ma DOM, a losowe id psują dopasowanie hydracji. Oznaczanie wszystkiego jako use client to odwrotność celu - przenosi całą bibliotekę do bundla klienta.',
            en: 'Module code runs on the server where there is no DOM, and random ids break hydration matching. Marking everything as use client is the opposite of the goal - it drags the whole library into the client bundle.',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'asset-strategy-fonts-images',
      title: { pl: 'Strategia assetów: fonty i obrazy', en: 'Asset strategy: fonts and images' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'srcset i sizes', en: 'srcset and sizes' },
          def: {
            pl: '<code>srcset</code> podaje warianty szerokości pliku, <code>sizes</code> mówi przeglądarce, ile miejsca obraz zajmie w layoucie. Bez <code>sizes</code> przeglądarka zgaduje i zwykle pobiera za duży plik.',
            en: '<code>srcset</code> lists the available file widths and <code>sizes</code> tells the browser how much layout space the image will take. Without <code>sizes</code> the browser guesses and usually downloads too much.'
          }
        },
        {
          term: { pl: 'fetchpriority="high"', en: 'fetchpriority="high"' },
          def: {
            pl: 'Podbicie priorytetu pobierania, które daje się <strong>wyłącznie</strong> obrazowi LCP. Wszystkie pozostałe obrazy poniżej folda dostają <code>loading="lazy"</code>.',
            en: 'A download priority boost given to the LCP image <strong>only</strong>. Every other below-the-fold image gets <code>loading="lazy"</code> instead.'
          }
        },
        {
          term: { pl: 'font-display: swap', en: 'font-display: swap' },
          def: {
            pl: 'Tekst rysuje się natychmiast fontem zastępczym i podmienia po pobraniu właściwego kroju. Bez tego użytkownik ogląda niewidzialny tekst, a treść czeka na plik fontu.',
            en: 'Text paints immediately with a fallback font and swaps once the real face loads. Without it the user stares at invisible text while the font file downloads.'
          }
        },
        {
          term: { pl: 'Metric overrides', en: 'Metric overrides' },
          def: {
            pl: 'Deskryptory <code>size-adjust</code>, <code>ascent-override</code> i podobne, które sprawiają, że font zastępczy zajmuje dokładnie tyle miejsca co docelowy. Podmiana kroju nie przesuwa wtedy układu i CLS zostaje przy zerze.',
            en: 'Descriptors like <code>size-adjust</code> and <code>ascent-override</code> that make the fallback font occupy exactly the same space as the real one. The swap then shifts nothing and CLS stays at zero.'
          }
        },
        {
          term: { pl: 'Cache-Control: immutable', en: 'Cache-Control: immutable' },
          def: {
            pl: 'Zasoby z hashem w nazwie dostają <code>max-age=31536000, immutable</code>, a dokument HTML <code>no-cache</code> z ETagiem. Ta jedna para reguł robi dla powracających użytkowników więcej niż tydzień mikrooptymalizacji.',
            en: 'Hashed assets get <code>max-age=31536000, immutable</code> while the HTML document gets <code>no-cache</code> with an ETag. That single pair does more for returning users than a week of micro-optimisation.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
          + '<defs><marker id="fa5-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>'
          + '<text x="20" y="28" font-size="15" fill="var(--accent)">Images</text>'
          + '<rect x="20" y="44" width="170" height="58" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="105" y="70" text-anchor="middle" font-size="13" fill="var(--text)">source 4000 px</text>'
          + '<text x="105" y="90" text-anchor="middle" font-size="12" fill="var(--muted)">2.4 MB JPEG</text>'
          + '<line x1="192" y1="73" x2="228" y2="73" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa5-arrow)"/>'
          + '<rect x="232" y="44" width="170" height="58" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="317" y="70" text-anchor="middle" font-size="13" fill="var(--text)">CDN transform</text>'
          + '<text x="317" y="90" text-anchor="middle" font-size="12" fill="var(--muted)">AVIF, width, DPR</text>'
          + '<line x1="404" y1="73" x2="440" y2="73" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa5-arrow)"/>'
          + '<rect x="444" y="44" width="176" height="58" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="532" y="70" text-anchor="middle" font-size="13" fill="var(--text)">42 KB on phone</text>'
          + '<text x="532" y="90" text-anchor="middle" font-size="12" fill="var(--muted)">width and height set</text>'
          + '<line x1="20" y1="140" x2="620" y2="140" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="20" y="176" font-size="15" fill="var(--accent)">Fonts</text>'
          + '<rect x="20" y="192" width="180" height="62" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="110" y="218" text-anchor="middle" font-size="13" fill="var(--text)">self-host woff2</text>'
          + '<text x="110" y="238" text-anchor="middle" font-size="12" fill="var(--muted)">subset latin-ext</text>'
          + '<line x1="202" y1="223" x2="238" y2="223" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa5-arrow)"/>'
          + '<rect x="242" y="192" width="180" height="62" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="332" y="218" text-anchor="middle" font-size="13" fill="var(--text)">preload 1 file</text>'
          + '<text x="332" y="238" text-anchor="middle" font-size="12" fill="var(--muted)">the one above fold</text>'
          + '<line x1="424" y1="223" x2="460" y2="223" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa5-arrow)"/>'
          + '<rect x="464" y="192" width="156" height="62" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="542" y="218" text-anchor="middle" font-size="13" fill="var(--text)">swap plus</text>'
          + '<text x="542" y="238" text-anchor="middle" font-size="12" fill="var(--muted)">metric overrides</text>'
          + '<rect x="20" y="292" width="600" height="84" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="40" y="322" font-size="14" fill="var(--warn)">Rule of thumb</text>'
          + '<text x="40" y="348" font-size="13" fill="var(--text)">Every byte you do not send is the fastest byte.</text>'
          + '<text x="40" y="368" font-size="13" fill="var(--muted)">Assets are usually 70 percent of page weight.</text>'
          + '</svg>',
        caption: {
          pl: 'Dwie ścieżki, które decydują o wadze strony: obraz przechodzący przez transformację CDN oraz font hostowany lokalnie, subsetowany i preloadowany.',
          en: 'The two pipelines that decide page weight: an image going through a CDN transform, and a self-hosted font that is subset and preloaded.',
        },
      },
      levels: {
        eli5: {
          pl: '<p>Pakujesz się na wycieczkę. Możesz wrzucić do plecaka całą szafę albo tylko to, co naprawdę założysz. Waga plecaka to waga Twojej strony, a plecak niesie użytkownik, często na słabym telefonie w pociągu.</p>'
            + '<p>Zdjęcia to najcięższe rzeczy w tym plecaku. Robisz zdjęcie aparatem za dwadzieścia tysięcy, a potem wysyłasz je komuś, kto ogląda je na ekranie wielkości karty kredytowej. To tak, jakbyś wysłał plakat kinowy, bo ktoś poprosił o znaczek pocztowy.</p>'
            + '<p>Litery też coś ważą. Twoja firma ma swój piękny krój pisma i to jest w porządku, ale zanim się on ściągnie, tekst albo znika, albo pojawia się w innej czcionce i wszystko przeskakuje - jakby ktoś w ostatniej chwili przestawił meble.</p>'
            + '<p>Sztuczka jest prosta: wyślij mniejsze zdjęcie, wyślij tylko te litery, których używasz, i zawsze zostaw miejsce, żeby nic nie skakało.</p>',
          en: '<p>You are packing for a trip. You can throw the whole wardrobe into the backpack or only what you will actually wear. The weight of that backpack is the weight of your page, and the user carries it, often on a weak phone on a train.</p>'
            + '<p>Photos are the heaviest thing in there. You take a picture with a very expensive camera and then send it to someone looking at a screen the size of a credit card. That is like mailing a cinema poster when somebody asked for a postage stamp.</p>'
            + '<p>Letters weigh something too. Your company has a beautiful typeface and that is fine, but until it downloads the text either disappears or shows up in another font and everything jumps around - as if someone rearranged the furniture at the last second.</p>'
            + '<p>The trick is simple: send a smaller photo, send only the letters you use, and always leave room so nothing jumps.</p>',
        },
        school: {
          pl: '<p>W typowym serwisie obrazy i fonty to około 70 proc. wagi strony, a jednocześnie to najłatwiejsze wygrane w całym repertuarze optymalizacji, bo nie wymagają refaktoru kodu.</p>'
            + '<h4>Obrazy</h4>'
            + '<p>Cztery decyzje: format, wymiar, priorytet, rezerwacja miejsca.</p>'
            + '<pre><code>&lt;img\n  src="/cdn/hero?w=800&amp;f=auto"\n  srcset="/cdn/hero?w=400&amp;f=auto 400w,\n          /cdn/hero?w=800&amp;f=auto 800w"\n  sizes="(max-width: 640px) 100vw, 800px"\n  width="800" height="450"\n  fetchpriority="high"\n  alt="Oferta swiatlowodu" /&gt;</code></pre>'
            + '<p><code>width</code> i <code>height</code> nie służą do stylowania - rezerwują proporcje, więc CLS zostaje przy zerze. <code>fetchpriority="high"</code> daje się TYLKO obrazowi LCP; wszystkie inne dostają <code>loading="lazy"</code>. AVIF jest zwykle 30-50 proc. mniejszy od JPEG przy tej samej jakości.</p>'
            + '<h4>Fonty</h4>'
            + '<p>Hostuj lokalnie, w woff2, z subsetem znaków (dla polskiego: latin plus latin-ext). Jeden krój w dwóch grubościach zamiast pięciu wariantów to często 200 kB oszczędności. Preloaduj dokładnie ten jeden plik, który rysuje tekst nad foldem, i użyj <code>font-display: swap</code>, żeby treść była czytelna od pierwszej klatki.</p>'
            + '<pre><code>@font-face {\n  font-family: "TelcoSans";\n  src: url(/fonts/telco-sans.woff2) format("woff2");\n  font-display: swap;\n  size-adjust: 102%;      /* dopasowanie do fontu zastępczego */\n  ascent-override: 92%;\n}</code></pre>'
            + '<p>Te ostatnie dwie linijki to metric overrides: sprawiają, że font zastępczy zajmuje dokładnie tyle samo miejsca co docelowy, więc podmiana nie przesuwa układu. Bez nich <code>swap</code> ratuje czytelność, ale generuje skok CLS.</p>'
            + '<p>Na koniec nagłówki cache. Pliki z hashem w nazwie mogą leżeć w pamięci przeglądarki rok (<code>max-age=31536000, immutable</code>), a sam dokument HTML powinien mieć <code>no-cache</code> z ETagiem, żeby nowe wydanie było widoczne natychmiast. Ta jedna para reguł potrafi zrobić dla powracających użytkowników więcej niż tydzień grzebania w kodzie.</p>',
          en: '<p>In a typical site images and fonts are about 70 percent of page weight, and at the same time they are the easiest wins in the whole optimisation repertoire because they need no code refactor.</p>'
            + '<h4>Images</h4>'
            + '<p>Four decisions: format, dimensions, priority, reserved space.</p>'
            + '<pre><code>&lt;img\n  src="/cdn/hero?w=800&amp;f=auto"\n  srcset="/cdn/hero?w=400&amp;f=auto 400w,\n          /cdn/hero?w=800&amp;f=auto 800w"\n  sizes="(max-width: 640px) 100vw, 800px"\n  width="800" height="450"\n  fetchpriority="high"\n  alt="Fibre offer" /&gt;</code></pre>'
            + '<p><code>width</code> and <code>height</code> are not for styling - they reserve the aspect ratio so CLS stays at zero. <code>fetchpriority="high"</code> goes ONLY on the LCP image; everything else gets <code>loading="lazy"</code>. AVIF is typically 30-50 percent smaller than JPEG at the same quality.</p>'
            + '<h4>Fonts</h4>'
            + '<p>Self-host, use woff2, subset the character set (for Polish: latin plus latin-ext). One family in two weights instead of five variants often saves 200 kB. Preload exactly the one file that paints above-the-fold text, and use <code>font-display: swap</code> so content is readable from the first frame.</p>'
            + '<pre><code>@font-face {\n  font-family: "TelcoSans";\n  src: url(/fonts/telco-sans.woff2) format("woff2");\n  font-display: swap;\n  size-adjust: 102%;      /* match the fallback font */\n  ascent-override: 92%;\n}</code></pre>'
            + '<p>Those last two lines are metric overrides: they make the fallback font occupy exactly the same space as the real one, so the swap does not move the layout. Without them <code>swap</code> saves readability but produces a CLS spike.</p>'
            + '<p>Finally, cache headers. Hashed files can live in the browser cache for a year (<code>max-age=31536000, immutable</code>), while the HTML document itself should be <code>no-cache</code> with an ETag so a new release shows up immediately. That single pair of rules can do more for returning users than a week of digging through code.</p>',
        },
        pro: {
          pl: '<p>Assety to obszar, w którym architekt frontendu ma największą dźwignię przy najmniejszym oporze politycznym: nikt nie broni honoru 2,4-megabajtowego JPEG-a.</p>'
            + '<h4>Pipeline zamiast dobrych intencji</h4>'
            + '<p>Regułą, którą chcesz wyegzekwować, jest: <strong>żaden obraz nie trafia do przeglądarki bezpośrednio z CMS-a</strong>. Zawsze przechodzi przez warstwę transformującą - Cloudinary, imgproxy, Thumbor, Next/Image z loaderem albo transformacje na Akamai. Warstwa decyduje o formacie na podstawie nagłówka Accept, o szerokości na podstawie parametru i o jakości (q=70-75 jest w AVIF praktycznie nieodróżnialne). Sam <code>&lt;picture&gt;</code> z ręcznie wyliczonymi wariantami działa, ale nie skaluje się do redakcji, która wrzuca 300 zdjęć tygodniowo.</p>'
            + '<p>W design systemie oznacza to komponent <code>Image</code>, który wymusza <code>alt</code>, wymaga proporcji i sam składa <code>srcset</code>. Kiedy raz przekonasz czternaście zespołów, żeby go używały, przyszła zmiana progów DPR albo dodanie AVIF to jeden release biblioteki, a nie migracja w czternastu repozytoriach.</p>'
            + '<h4>Fonty: koszt, którego marketing nie widzi</h4>'
            + '<p>Firmowy krój w pięciu grubościach, dwóch szerokościach i italiku to realnie 400-600 kB, blokujące renderowanie tekstu w krytycznej ścieżce. Praktyczny kompromis dla telekomu:</p>'
            + '<ul>'
            + '<li>font zmienny (variable) zamiast osobnych plików na grubość - jeden plik 90 kB zamiast pięciu po 40 kB, plus pełny zakres wag,</li>'
            + '<li>subset unicode-range na latin i latin-ext, reszta doładowywana leniwie tylko dla stron, które jej potrzebują,</li>'
            + '<li><code>preload</code> na dokładnie jeden zasób, bo każdy kolejny konkuruje z obrazem LCP o to samo pasmo,</li>'
            + '<li>metric overrides dopasowane narzędziem typu Fontaine albo <code>next/font</code>, żeby CLS z podmiany był zerowy.</li>'
            + '</ul>'
            + '<pre><code>&lt;link rel="preload" as="font" type="font/woff2"\n      href="/fonts/telco-var.woff2" crossorigin&gt;</code></pre>'
            + '<p>Atrybut <code>crossorigin</code> jest obowiązkowy nawet przy tym samym origin - bez niego przeglądarka pobierze plik drugi raz. To jeden z najczęściej spotykanych cichych błędów w audytach.</p>'
            + '<h4>Ikony i inne cichociemne</h4>'
            + '<p>Sprite SVG w jednym pliku z cache na rok bije komponenty ikon w JS, bo ikony przestają być kodem, który trzeba sparsować i wykonać. Jeśli biblioteka eksportuje 400 ikon z barrela, jeden nieuważny import wciąga wszystkie - stąd wymóg subpath exports i testu rozmiaru na PR.</p>'
            + '<h4>Nagłówki cache to też architektura</h4>'
            + '<p>Zasoby z hashem w nazwie: <code>Cache-Control: public, max-age=31536000, immutable</code>. Dokument HTML: <code>no-cache</code> plus ETag. Ta jedna para reguł robi więcej dla powracających użytkowników niż tydzień mikrooptymalizacji, a i tak regularnie zastaję ją ustawioną na siedem dni bez immutable, co zmusza przeglądarkę do rewalidacji przy każdej nawigacji.</p>',
          en: '<p>Assets are where a frontend architect has the most leverage at the lowest political cost: nobody defends the honour of a 2.4 MB JPEG.</p>'
            + '<h4>A pipeline instead of good intentions</h4>'
            + '<p>The rule you want to enforce is: <strong>no image reaches the browser straight from the CMS</strong>. It always passes a transformation layer - Cloudinary, imgproxy, Thumbor, Next/Image with a loader, or Akamai image transforms. The layer picks the format from the Accept header, the width from a parameter and the quality (q=70-75 is practically indistinguishable in AVIF). A hand-written <code>&lt;picture&gt;</code> with manual variants works, but does not scale to an editorial team uploading 300 photos a week.</p>'
            + '<p>In the design system this means an <code>Image</code> component that enforces <code>alt</code>, requires an aspect ratio and builds <code>srcset</code> itself. Once you convince fourteen teams to use it, changing DPR thresholds or adding AVIF is one library release instead of a migration across fourteen repositories.</p>'
            + '<h4>Fonts: the cost marketing does not see</h4>'
            + '<p>A corporate typeface in five weights, two widths and italics is realistically 400-600 kB blocking text rendering on the critical path. The practical compromise for a telco:</p>'
            + '<ul>'
            + '<li>a variable font instead of one file per weight - a single 90 kB file instead of five 40 kB ones, plus the full weight range,</li>'
            + '<li>unicode-range subsets for latin and latin-ext, everything else lazily loaded only for pages that need it,</li>'
            + '<li><code>preload</code> for exactly one resource, because each extra one competes with the LCP image for the same bandwidth,</li>'
            + '<li>metric overrides generated by Fontaine or <code>next/font</code> so the swap costs zero CLS.</li>'
            + '</ul>'
            + '<pre><code>&lt;link rel="preload" as="font" type="font/woff2"\n      href="/fonts/telco-var.woff2" crossorigin&gt;</code></pre>'
            + '<p>The <code>crossorigin</code> attribute is mandatory even on the same origin - without it the browser downloads the file a second time. It is one of the most common silent bugs found in audits.</p>'
            + '<h4>Icons and other stowaways</h4>'
            + '<p>An SVG sprite in one file cached for a year beats JS icon components, because icons stop being code that must be parsed and executed. If the library exports 400 icons from a barrel, one careless import pulls them all in - hence the requirement for subpath exports and a size check on the PR.</p>'
            + '<h4>Cache headers are architecture too</h4>'
            + '<p>Hashed assets: <code>Cache-Control: public, max-age=31536000, immutable</code>. The HTML document: <code>no-cache</code> plus an ETag. That single pair of rules does more for returning users than a week of micro-optimisation, and I still routinely find it set to seven days without immutable, forcing revalidation on every navigation.</p>',
        },
      },
      quiz: [
        {
          q: {
            pl: 'Po co ustawiać atrybuty width i height na znaczniku img, skoro rozmiar i tak nadaje CSS?',
            en: 'Why set width and height attributes on an img tag if CSS sizes it anyway?',
          },
          options: [
            { pl: 'Żeby przeglądarka mogła pominąć dekodowanie obrazu', en: 'So the browser can skip decoding the image' },
            { pl: 'Żeby przeglądarka zarezerwowała proporcje i uniknęła przeskoku układu', en: 'So the browser reserves the aspect ratio and avoids a layout shift' },
            { pl: 'Żeby CDN wiedział, jaki wariant wygenerować', en: 'So the CDN knows which variant to generate' },
            { pl: 'Żeby obraz dostał wyższy priorytet pobierania', en: 'So the image gets a higher fetch priority' },
          ],
          correct: 1,
          explain: {
            pl: 'Przeglądarka wylicza z nich aspect-ratio i rezerwuje miejsce zanim plik dotrze. To najprostsza droga do CLS bliskiego zeru.',
            en: 'The browser derives an aspect-ratio from them and reserves space before the file arrives. It is the simplest path to a near-zero CLS.',
          },
        },
        {
          q: {
            pl: 'Które podejście najbardziej ogranicza CLS przy własnym kroju firmowym?',
            en: 'Which approach best limits CLS with a custom corporate typeface?',
          },
          options: [
            { pl: 'font-display: block, żeby nie było widać podmiany', en: 'font-display: block so the swap is invisible' },
            { pl: 'Ładowanie fontu z Google Fonts zamiast lokalnie', en: 'Loading the font from Google Fonts instead of self-hosting' },
            { pl: 'font-display: swap plus metric overrides dopasowujące font zastępczy', en: 'font-display: swap plus metric overrides matching the fallback font' },
            { pl: 'Preload wszystkich plików fontu naraz', en: 'Preloading all font files at once' },
          ],
          correct: 2,
          explain: {
            pl: 'swap chroni czytelność, a size-adjust i ascent-override sprawiają, że font zastępczy zajmuje tyle samo miejsca, więc podmiana nic nie przesuwa. block zamienia CLS na niewidoczny tekst.',
            en: 'swap protects readability while size-adjust and ascent-override make the fallback occupy the same space, so the swap moves nothing. block trades CLS for invisible text.',
          },
        },
        {
          q: {
            pl: 'Zapominasz o atrybucie crossorigin przy preloadzie fontu z tego samego origin. Co się stanie?',
            en: 'You omit the crossorigin attribute when preloading a same-origin font. What happens?',
          },
          options: [
            { pl: 'Nic, atrybut ma znaczenie tylko przy innym origin', en: 'Nothing, the attribute only matters cross-origin' },
            { pl: 'Font zostanie pobrany dwa razy, bo preload nie trafi w to samo żądanie', en: 'The font is downloaded twice, because the preload does not match the real request' },
            { pl: 'Przeglądarka zablokuje preload z powodu CORS', en: 'The browser blocks the preload because of CORS' },
            { pl: 'Font straci możliwość cache-owania', en: 'The font becomes uncacheable' },
          ],
          correct: 1,
          explain: {
            pl: 'Fonty są zawsze pobierane w trybie anonimowego CORS-u, więc preload bez crossorigin tworzy osobny wpis w cache i plik leci drugi raz. Marnujesz pasmo dokładnie tam, gdzie chciałeś zaoszczędzić.',
            en: 'Fonts are always fetched in anonymous CORS mode, so a preload without crossorigin creates a separate cache entry and the file is fetched again. You waste bandwidth exactly where you meant to save it.',
          },
        },
        {
          q: {
            pl: 'Redakcja wrzuca 300 zdjęć tygodniowo do CMS-a. Jakie rozwiązanie architektoniczne jest właściwe?',
            en: 'An editorial team uploads 300 photos a week to the CMS. What is the right architectural answer?',
          },
          options: [
            { pl: 'Warstwa transformująca na CDN plus komponent Image w design systemie', en: 'A CDN transformation layer plus an Image component in the design system' },
            { pl: 'Szkolenie redakcji z eksportu AVIF w Squoosh', en: 'Training the editors to export AVIF in Squoosh' },
            { pl: 'Lint blokujący commity ze zbyt dużymi plikami graficznymi', en: 'A lint rule blocking commits with oversized image files' },
            { pl: 'Włączenie loading="lazy" na wszystkich obrazach', en: 'Turning on loading="lazy" for all images' },
          ],
          correct: 0,
          explain: {
            pl: 'Procesy oparte na dyscyplinie ludzi rozpadają się przy tej skali, a zdjęcia z CMS-a i tak nie przechodzą przez repozytorium. Transformacja w locie plus jeden komponent to jedyne rozwiązanie, które skaluje się bez zmian w czternastu aplikacjach.',
            en: 'Processes that rely on human discipline collapse at this scale, and CMS photos never pass through the repository anyway. On-the-fly transformation plus one component is the only answer that scales without touching fourteen apps.',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'runtime-patterns-virtualization',
      title: { pl: 'Wzorce runtime: wirtualizacja i wątek główny', en: 'Runtime patterns: virtualization and the main thread' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Wirtualizacja (windowing)', en: 'Virtualization (windowing)' },
          def: {
            pl: 'Trzymanie w DOM tylko widocznych wierszy plus zapasu, przy zachowaniu pełnej wysokości kontenera. Cena: <code>ctrl+F</code>, dostępność, druk i eksport wymagają osobnej obsługi.',
            en: 'Keeping only the visible rows plus an overscan in the DOM while the container keeps its full height. The price: <code>ctrl+F</code>, accessibility, printing and export all need explicit handling.'
          }
        },
        {
          term: { pl: 'Long task', en: 'Long task' },
          def: {
            pl: 'Zadanie na wątku głównym trwające ponad <strong>50 ms</strong>. W jego trakcie kliknięcie użytkownika po prostu czeka, więc long taski są bezpośrednią przyczyną złego INP.',
            en: 'A main-thread task longer than <strong>50 ms</strong>. While it runs, a user click simply waits, which makes long tasks the direct cause of bad INP.'
          }
        },
        {
          term: { pl: 'Ustąpienie wątku (yielding)', en: 'Yielding to the main thread' },
          def: {
            pl: 'Świadome oddanie kontroli przeglądarce w środku długiej pracy: <code>await scheduler.yield()</code> lub <code>postTask</code> z priorytetem. Praca trwa tyle samo, ale interakcje wchodzą pomiędzy.',
            en: 'Deliberately handing control back to the browser in the middle of long work: <code>await scheduler.yield()</code> or <code>postTask</code> with a priority. The work takes as long, but interactions slot in between.'
          }
        },
        {
          term: { pl: 'Web Worker', en: 'Web Worker' },
          def: {
            pl: 'Osobny wątek na pracę niedotykającą DOM: parsowanie dużego JSON-a, filtrowanie, kryptografia. Uwaga na koszt serializacji - opłaca się przy dłuższej pracy lub obiektach transferowalnych.',
            en: 'A separate thread for work that never touches the DOM: parsing big JSON, filtering, crypto. Watch the serialization cost - it pays off for longer work or transferable objects.'
          }
        },
        {
          term: { pl: 'content-visibility: auto', en: 'content-visibility: auto' },
          def: {
            pl: 'Pozwala przeglądarce pominąć layout i paint sekcji poza ekranem; razem z <code>contain-intrinsic-size</code> potrafi ściąć czas layoutu o połowę bez ani jednej linii JS.',
            en: 'Lets the browser skip layout and paint for off-screen sections; together with <code>contain-intrinsic-size</code> it can halve layout time without a single line of JS.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
          + '<text x="20" y="28" font-size="15" fill="var(--err)">Without virtualization</text>'
          + '<rect x="20" y="44" width="270" height="120" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
          + '<text x="155" y="86" text-anchor="middle" font-size="14" fill="var(--text)">12 000 rows in DOM</text>'
          + '<text x="155" y="112" text-anchor="middle" font-size="13" fill="var(--muted)">~180 000 nodes</text>'
          + '<text x="155" y="140" text-anchor="middle" font-size="13" fill="var(--err)">INP 900 ms, 320 MB</text>'
          + '<text x="350" y="28" font-size="15" fill="var(--ok)">With virtualization</text>'
          + '<rect x="350" y="44" width="270" height="120" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="485" y="86" text-anchor="middle" font-size="14" fill="var(--text)">14 rows in DOM</text>'
          + '<text x="485" y="112" text-anchor="middle" font-size="13" fill="var(--muted)">window plus overscan</text>'
          + '<text x="485" y="140" text-anchor="middle" font-size="13" fill="var(--ok)">INP 90 ms, 60 MB</text>'
          + '<text x="20" y="208" font-size="15" fill="var(--text)">Main thread budget per frame: 16 ms</text>'
          + '<rect x="20" y="224" width="600" height="46" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<rect x="22" y="226" width="150" height="42" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="97" y="252" text-anchor="middle" font-size="13" fill="var(--accent)">input</text>'
          + '<rect x="176" y="226" width="230" height="42" rx="6" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="291" y="252" text-anchor="middle" font-size="13" fill="var(--accent2)">render and layout</text>'
          + '<rect x="410" y="226" width="208" height="42" rx="6" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="514" y="252" text-anchor="middle" font-size="13" fill="var(--warn)">paint</text>'
          + '<rect x="20" y="300" width="600" height="76" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="40" y="330" font-size="14" fill="var(--text)">One long task of 300 ms blows the whole INP budget.</text>'
          + '<text x="40" y="356" font-size="13" fill="var(--muted)">Split it, yield to the browser, or move it off the thread.</text>'
          + '</svg>',
        caption: {
          pl: 'Wirtualizacja zamienia liczbę wierszy w DOM na stałą, a budżet 16 ms na klatkę pokazuje, dlaczego jedno długie zadanie rujnuje INP.',
          en: 'Virtualization turns the number of DOM rows into a constant, and the 16 ms frame budget shows why a single long task ruins INP.',
        },
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jak działa okno wirtualizacji podczas przewijania listy 12 000 pozycji.',
          en: 'How the virtualization window behaves while scrolling a list of 12 000 items.',
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<text x="30" y="28" font-size="13" fill="var(--muted)">full data set</text>'
              + '<rect x="30" y="40" width="90" height="260" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="34" y="44" width="82" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="75" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">12 000</text>'
              + '<text x="190" y="28" font-size="13" fill="var(--muted)">rendered viewport</text>'
              + '<rect x="190" y="40" width="230" height="260" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="305" y="80" text-anchor="middle" font-size="13" fill="var(--text)">row 1</text>'
              + '<text x="305" y="120" text-anchor="middle" font-size="13" fill="var(--text)">row 2</text>'
              + '<text x="305" y="160" text-anchor="middle" font-size="13" fill="var(--text)">row 3</text>'
              + '<text x="305" y="200" text-anchor="middle" font-size="13" fill="var(--text)">row 4</text>'
              + '<text x="305" y="240" text-anchor="middle" font-size="13" fill="var(--text)">row 5</text>'
              + '<text x="305" y="280" text-anchor="middle" font-size="13" fill="var(--text)">row 6</text>'
              + '<rect x="450" y="40" width="160" height="120" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="530" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">DOM rows</text>'
              + '<text x="530" y="112" text-anchor="middle" font-size="18" fill="var(--ok)">14</text>'
              + '<text x="530" y="140" text-anchor="middle" font-size="12" fill="var(--muted)">6 visible, 8 overscan</text>'
              + '<text x="450" y="230" font-size="13" fill="var(--text)">scrollTop: 0 px</text>'
              + '<text x="450" y="258" font-size="13" fill="var(--muted)">offset: 0</text>'
              + '</svg>',
            label: { pl: 'Start listy', en: 'Top of the list' },
            note: {
              pl: 'Kontener ma pełną wysokość 12 000 wierszy, ale w DOM istnieje tylko okno widocznych pozycji plus zapas (overscan).',
              en: 'The container is as tall as all 12 000 rows, yet only the window of visible items plus an overscan buffer exists in the DOM.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<text x="30" y="28" font-size="13" fill="var(--muted)">full data set</text>'
              + '<rect x="30" y="40" width="90" height="260" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="34" y="96" width="82" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="75" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">12 000</text>'
              + '<text x="190" y="28" font-size="13" fill="var(--muted)">rendered viewport</text>'
              + '<rect x="190" y="40" width="230" height="260" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="305" y="80" text-anchor="middle" font-size="13" fill="var(--text)">row 41</text>'
              + '<text x="305" y="120" text-anchor="middle" font-size="13" fill="var(--text)">row 42</text>'
              + '<text x="305" y="160" text-anchor="middle" font-size="13" fill="var(--text)">row 43</text>'
              + '<text x="305" y="200" text-anchor="middle" font-size="13" fill="var(--text)">row 44</text>'
              + '<text x="305" y="240" text-anchor="middle" font-size="13" fill="var(--text)">row 45</text>'
              + '<text x="305" y="280" text-anchor="middle" font-size="13" fill="var(--text)">row 46</text>'
              + '<rect x="450" y="40" width="160" height="120" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="530" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">DOM rows</text>'
              + '<text x="530" y="112" text-anchor="middle" font-size="18" fill="var(--ok)">14</text>'
              + '<text x="530" y="140" text-anchor="middle" font-size="12" fill="var(--muted)">nodes recycled</text>'
              + '<text x="450" y="230" font-size="13" fill="var(--text)">scrollTop: 2 400 px</text>'
              + '<text x="450" y="258" font-size="13" fill="var(--muted)">offset: translateY</text>'
              + '</svg>',
            label: { pl: 'Przewijanie w dół', en: 'Scrolling down' },
            note: {
              pl: 'Te same węzły DOM dostają nowe dane i nową wartość translateY. Nic nie jest tworzone ani niszczone, więc koszt klatki nie rośnie.',
              en: 'The same DOM nodes receive new data and a new translateY. Nothing is created or destroyed, so the frame cost stays flat.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<text x="30" y="28" font-size="13" fill="var(--muted)">full data set</text>'
              + '<rect x="30" y="40" width="90" height="260" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="34" y="220" width="82" height="40" rx="6" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
              + '<text x="75" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">12 000</text>'
              + '<text x="190" y="28" font-size="13" fill="var(--muted)">rendered viewport</text>'
              + '<rect x="190" y="40" width="230" height="260" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5"/>'
              + '<text x="305" y="160" text-anchor="middle" font-size="14" fill="var(--warn)">blank rows</text>'
              + '<text x="305" y="188" text-anchor="middle" font-size="13" fill="var(--muted)">fling outran the window</text>'
              + '<rect x="450" y="40" width="160" height="120" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
              + '<text x="530" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">DOM rows</text>'
              + '<text x="530" y="112" text-anchor="middle" font-size="18" fill="var(--warn)">14</text>'
              + '<text x="530" y="140" text-anchor="middle" font-size="12" fill="var(--muted)">overscan too small</text>'
              + '<text x="450" y="230" font-size="13" fill="var(--text)">scrollTop: 9 800 px</text>'
              + '<text x="450" y="258" font-size="13" fill="var(--muted)">velocity: high</text>'
              + '</svg>',
            label: { pl: 'Szybki rzut i puste pola', en: 'Fast fling, blank rows' },
            note: {
              pl: 'Przy bardzo szybkim przewijaniu render nie nadąża za scrollem i użytkownik widzi puste miejsca. To realny koszt wirtualizacji, nie błąd biblioteki.',
              en: 'On a very fast fling rendering cannot keep up with the scroll and the user sees empty space. That is the real cost of virtualization, not a library bug.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<text x="30" y="28" font-size="13" fill="var(--muted)">full data set</text>'
              + '<rect x="30" y="40" width="90" height="260" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="34" y="220" width="82" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="75" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">12 000</text>'
              + '<text x="190" y="28" font-size="13" fill="var(--muted)">rendered viewport</text>'
              + '<rect x="190" y="40" width="230" height="260" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="305" y="80" text-anchor="middle" font-size="13" fill="var(--text)">row 9 601</text>'
              + '<text x="305" y="120" text-anchor="middle" font-size="13" fill="var(--text)">row 9 602</text>'
              + '<text x="305" y="160" text-anchor="middle" font-size="13" fill="var(--text)">row 9 603</text>'
              + '<text x="305" y="200" text-anchor="middle" font-size="13" fill="var(--text)">row 9 604</text>'
              + '<text x="305" y="240" text-anchor="middle" font-size="13" fill="var(--text)">row 9 605</text>'
              + '<text x="305" y="280" text-anchor="middle" font-size="13" fill="var(--text)">row 9 606</text>'
              + '<rect x="450" y="40" width="160" height="120" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
              + '<text x="530" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">DOM rows</text>'
              + '<text x="530" y="112" text-anchor="middle" font-size="18" fill="var(--ok)">22</text>'
              + '<text x="530" y="140" text-anchor="middle" font-size="12" fill="var(--muted)">overscan raised to 8</text>'
              + '<text x="450" y="230" font-size="13" fill="var(--text)">scrollTop: 9 800 px</text>'
              + '<text x="450" y="258" font-size="13" fill="var(--muted)">no blank frames</text>'
              + '</svg>',
            label: { pl: 'Większy overscan', en: 'Bigger overscan' },
            note: {
              pl: 'Zwiększenie zapasu z 4 do 8 wierszy po każdej stronie kosztuje kilkanaście węzłów, a likwiduje puste kadry. To świadomy handel pamięcią za płynność.',
              en: 'Raising the buffer from 4 to 8 rows on each side costs a dozen nodes and removes the blank frames. A deliberate trade of memory for smoothness.',
            },
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
              + '<text x="30" y="28" font-size="13" fill="var(--muted)">full data set</text>'
              + '<rect x="30" y="40" width="90" height="260" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
              + '<rect x="34" y="220" width="82" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="75" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">12 000</text>'
              + '<text x="190" y="28" font-size="13" fill="var(--muted)">rendered viewport</text>'
              + '<rect x="190" y="40" width="230" height="260" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
              + '<text x="305" y="80" text-anchor="middle" font-size="13" fill="var(--text)">row 9 601</text>'
              + '<text x="305" y="120" text-anchor="middle" font-size="13" fill="var(--text)">row 9 602</text>'
              + '<rect x="200" y="140" width="210" height="44" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="305" y="168" text-anchor="middle" font-size="13" fill="var(--err)">ctrl+F finds nothing</text>'
              + '<text x="305" y="216" text-anchor="middle" font-size="13" fill="var(--text)">row 9 604</text>'
              + '<text x="305" y="256" text-anchor="middle" font-size="13" fill="var(--text)">row 9 605</text>'
              + '<rect x="450" y="40" width="160" height="120" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>'
              + '<text x="530" y="76" text-anchor="middle" font-size="13" fill="var(--muted)">not in DOM</text>'
              + '<text x="530" y="112" text-anchor="middle" font-size="18" fill="var(--err)">11 978</text>'
              + '<text x="530" y="140" text-anchor="middle" font-size="12" fill="var(--muted)">invisible to find and a11y</text>'
              + '<text x="450" y="230" font-size="13" fill="var(--text)">needs aria-rowcount</text>'
              + '<text x="450" y="258" font-size="13" fill="var(--muted)">and an in-app search</text>'
              + '</svg>',
            label: { pl: 'Rachunek za wirtualizację', en: 'The bill for virtualization' },
            note: {
              pl: 'Wiersze poza oknem nie istnieją dla ctrl+F, czytników ekranu ani drukowania. Musisz oddać te funkcje explicite: aria-rowcount, własna wyszukiwarka, tryb eksportu.',
              en: 'Rows outside the window do not exist for ctrl+F, screen readers or printing. You must give those capabilities back explicitly: aria-rowcount, an in-app search, an export mode.',
            },
          },
        ],
      },
      levels: {
        eli5: {
          pl: '<p>Masz książkę telefoniczną z dwunastoma tysiącami nazwisk. Możesz rozłożyć wszystkie kartki naraz na podłodze w salonie - i faktycznie widać wszystko - ale pokój przestaje być używalny i nie da się przez niego przejść.</p>'
            + '<p>Mądrzejszy sposób: trzymasz w rękach sześć kartek, dokładnie te, na które patrzysz. Kiedy przesuwasz wzrok w dół, ktoś podaje Ci kolejne, a te za plecami zabiera. W rękach zawsze masz sześć kartek, nieważne czy nazwisk jest tysiąc, czy milion.</p>'
            + '<p>Druga sprawa: masz tylko jedną parę rąk. Jeśli zajmiesz je na trzy sekundy przeliczaniem czegoś w pamięci, nie odbierzesz w tym czasie żadnej kartki i wszystko stoi. Dlatego długie zadania trzeba kroić na kawałki i między nimi rozglądać się dookoła.</p>'
            + '<p>Ale uwaga - kartek, których nie trzymasz, nie da się przeszukać wzrokiem. Za tę wygodę zawsze coś płacisz.</p>',
          en: '<p>You have a phone book with twelve thousand names. You could spread every page across the living room floor - you would see everything - but the room becomes unusable and you cannot walk through it.</p>'
            + '<p>The smarter way: hold six pages in your hands, exactly the ones you are looking at. As your eyes move down, someone hands you the next ones and takes away the ones behind you. You always hold six pages, whether there are a thousand names or a million.</p>'
            + '<p>Second thing: you only have one pair of hands. If you tie them up for three seconds doing mental arithmetic, you cannot take any page during that time and everything stalls. That is why long jobs must be cut into pieces with a look around in between.</p>'
            + '<p>But careful - the pages you are not holding cannot be searched with your eyes. You always pay something for that convenience.</p>',
        },
        school: {
          pl: '<p><strong>Wirtualizacja</strong> (windowing) to trzymanie w DOM tylko tych elementów listy, które są widoczne, plus mały zapas. Kontener dostaje pełną wysokość, żeby scrollbar zachowywał się normalnie, a widoczne wiersze są przesuwane transformem.</p>'
            + '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual";\n\nconst rows = useVirtualizer({\n  count: 12000,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 48,\n  overscan: 8,\n});</code></pre>'
            + '<p>Efekt jest drastyczny: zamiast 180 tysięcy węzłów DOM masz kilkanaście, zużycie pamięci spada z 320 do 60 MB, a INP z 900 do 90 ms. Standardowe biblioteki to TanStack Virtual, react-window, a w Vue vue-virtual-scroller.</p>'
            + '<h4>Drugi front: wątek główny</h4>'
            + '<p>Przeglądarka ma jeden wątek na JavaScript, styl, layout i paint. Przy 60 klatkach na sekundę na jedną klatkę przypada 16 ms. Każde zadanie dłuższe niż 50 ms Chrome nazywa <em>long task</em> i jest to zadanie, w trakcie którego kliknięcie użytkownika po prostu czeka.</p>'
            + '<p>Trzy narzędzia, żeby to rozbroić:</p>'
            + '<ul>'
            + '<li><strong>Ustąpienie wątku</strong>: <code>await scheduler.yield()</code> w środku pętli albo podział pracy na porcje.</li>'
            + '<li><strong>Web Worker</strong>: parsowanie 5 MB JSON-a, filtrowanie, kryptografia - wszystko, co nie dotyka DOM.</li>'
            + '<li><strong>Deprioryzacja</strong>: React <code>useDeferredValue</code>, Vue <code>v-memo</code>, CSS <code>content-visibility: auto</code> dla sekcji poza ekranem.</li>'
            + '</ul>'
            + '<p>Warto zapamiętać kolejność diagnozy: najpierw zmierz w zakładce Performance, gdzie idzie czas, a dopiero potem wybierz narzędzie. Wirtualizacja tabeli, która ma 40 wierszy, to czysta strata czasu i komplikacja kodu.</p>',
          en: '<p><strong>Virtualization</strong> (windowing) means keeping only the visible list items in the DOM, plus a small buffer. The container gets the full height so the scrollbar behaves normally, and visible rows are positioned with a transform.</p>'
            + '<pre><code>import { useVirtualizer } from "@tanstack/react-virtual";\n\nconst rows = useVirtualizer({\n  count: 12000,\n  getScrollElement: () =&gt; parentRef.current,\n  estimateSize: () =&gt; 48,\n  overscan: 8,\n});</code></pre>'
            + '<p>The effect is drastic: instead of 180 thousand DOM nodes you have a dozen, memory drops from 320 to 60 MB and INP from 900 to 90 ms. The standard libraries are TanStack Virtual, react-window, and vue-virtual-scroller in Vue.</p>'
            + '<h4>The second front: the main thread</h4>'
            + '<p>The browser has one thread for JavaScript, style, layout and paint. At 60 frames per second each frame gets 16 ms. Chrome calls any task longer than 50 ms a <em>long task</em>, and during it a user click simply waits.</p>'
            + '<p>Three tools to defuse this:</p>'
            + '<ul>'
            + '<li><strong>Yielding</strong>: <code>await scheduler.yield()</code> inside the loop, or chunking the work.</li>'
            + '<li><strong>Web Worker</strong>: parsing 5 MB of JSON, filtering, crypto - anything that does not touch the DOM.</li>'
            + '<li><strong>Deprioritising</strong>: React <code>useDeferredValue</code>, Vue <code>v-memo</code>, CSS <code>content-visibility: auto</code> for offscreen sections.</li>'
            + '</ul>'
            + '<p>Remember the order of diagnosis: first measure in the Performance panel where the time goes, then pick the tool. Virtualizing a table with 40 rows is pure waste and extra complexity.</p>',
        },
        pro: {
          pl: '<p>Wzorce runtime to obszar, gdzie łatwo zbudować imponującą technicznie rzecz, która pogarsza produkt. Dlatego zaczynam od kosztów, nie od korzyści.</p>'
            + '<h4>Co realnie tracisz przy wirtualizacji</h4>'
            + '<ul>'
            + '<li><strong>ctrl+F przestaje działać.</strong> Dla operatora contact center, który przez cały dzień szuka numeru w tabeli, to regresja funkcjonalna, nie detal.</li>'
            + '<li><strong>Dostępność wymaga pracy.</strong> Musisz podać <code>aria-rowcount</code>, <code>aria-rowindex</code>, obsłużyć Home/End i PageUp/PageDown ręcznie, bo czytnik ekranu widzi tylko okno.</li>'
            + '<li><strong>Drukowanie i eksport</strong> potrzebują osobnej ścieżki. W telekomie to zwykle wymóg regulacyjny, nie zachcianka.</li>'
            + '<li><strong>Wiersze o zmiennej wysokości</strong> to najtrudniejszy przypadek: potrzebujesz pomiaru dynamicznego, a błędna estymacja daje skaczący scrollbar.</li>'
            + '</ul>'
            + '<p>Zanim zwirtualizujesz, sprawdź, czy prawdziwym rozwiązaniem nie jest paginacja serwerowa albo lepszy filtr. Użytkownik, który scrolluje 12 tysięcy wierszy, zwykle sygnalizuje brak wyszukiwarki, a nie brak wydajności.</p>'
            + '<h4>Budżet wątku głównego</h4>'
            + '<p>INP mierzy najgorszą interakcję w sesji i składa się z trzech części: opóźnienia wejścia, czasu obsługi zdarzenia i opóźnienia prezentacji. Najczęstszy winowajca to nie sam handler, tylko rendery wywołane synchronicznie po nim.</p>'
            + '<pre><code>// źle: 12 000 elementów filtrowanych synchronicznie na każde naciśnięcie klawisza\nonInput(e) { setRows(all.filter(matcher(e.target.value))); }\n\n// lepiej: natychmiastowe pole tekstowe, odroczona lista\nconst query = useState("");\nconst deferred = useDeferredValue(query);\nconst rows = useMemo(() =&gt; all.filter(matcher(deferred)), [deferred]);</code></pre>'
            + '<p>Kolejne poziomy, kiedy to nie wystarczy: <code>scheduler.yield()</code> (Chrome 129+) do przerywania długich pętli z zachowaniem kolejności, <code>postTask</code> z priorytetami, a przy naprawdę ciężkim przetwarzaniu Web Worker z Comlink. Uwaga na koszt serializacji: przesłanie 5 MB obiektów do workera potrafi kosztować więcej niż samo obliczenie, więc opłaca się dopiero przy strukturach transferowalnych albo dłuższej pracy.</p>'
            + '<h4>Tanie wygrane, o których się zapomina</h4>'
            + '<p><code>content-visibility: auto</code> z <code>contain-intrinsic-size</code> na długich sekcjach marketingowych potrafi ściąć czas layoutu o połowę bez żadnego JS. <code>will-change</code> stosowany hurtowo działa odwrotnie - tworzy warstwy kompozytora i zjada pamięć GPU. Animacje wyłącznie na <code>transform</code> i <code>opacity</code>. Detektory rozmiaru oparte o <code>ResizeObserver</code> zamiast nasłuchiwania na resize.</p>'
            + '<h4>Perspektywa design systemu</h4>'
            + '<p>Nie oddawaj czternastu zespołom surowej biblioteki wirtualizacji. Dostarcz jeden komponent <code>DataTable</code>, który ma wirtualizację, dostępność, sortowanie i eksport rozwiązane raz, poprawnie, i przetestowane wizualnie. To jest dokładnie ten rodzaj złożoności, dla którego istnieje design system: gdy koszt zrobienia tego dobrze przekracza możliwości pojedynczego zespołu produktowego.</p>',
          en: '<p>Runtime patterns are an area where it is easy to build something technically impressive that makes the product worse. So I start from the costs, not the benefits.</p>'
            + '<h4>What virtualization actually takes away</h4>'
            + '<ul>'
            + '<li><strong>ctrl+F stops working.</strong> For a contact-centre agent who spends the day hunting a number in a table, that is a functional regression, not a detail.</li>'
            + '<li><strong>Accessibility needs work.</strong> You must supply <code>aria-rowcount</code>, <code>aria-rowindex</code> and handle Home/End and PageUp/PageDown yourself, because the screen reader only sees the window.</li>'
            + '<li><strong>Printing and export</strong> need a separate path. In a telco that is usually a regulatory requirement, not a nice-to-have.</li>'
            + '<li><strong>Variable row heights</strong> are the hardest case: you need dynamic measurement, and a wrong estimate gives a jumping scrollbar.</li>'
            + '</ul>'
            + '<p>Before you virtualize, check whether the real answer is server-side pagination or a better filter. A user scrolling 12 thousand rows is usually signalling a missing search box, not missing performance.</p>'
            + '<h4>The main-thread budget</h4>'
            + '<p>INP measures the worst interaction in a session and has three parts: input delay, event processing time, presentation delay. The usual culprit is not the handler itself but the renders it triggers synchronously.</p>'
            + '<pre><code>// bad: 12 000 items filtered synchronously on every keystroke\nonInput(e) { setRows(all.filter(matcher(e.target.value))); }\n\n// better: instant text field, deferred list\nconst query = useState("");\nconst deferred = useDeferredValue(query);\nconst rows = useMemo(() =&gt; all.filter(matcher(deferred)), [deferred]);</code></pre>'
            + '<p>The next levels when that is not enough: <code>scheduler.yield()</code> (Chrome 129+) to break long loops while keeping ordering, <code>postTask</code> with priorities, and for genuinely heavy processing a Web Worker with Comlink. Watch the serialisation cost: sending 5 MB of objects to a worker can cost more than the computation, so it pays off only with transferable structures or longer work.</p>'
            + '<h4>Cheap wins people forget</h4>'
            + '<p><code>content-visibility: auto</code> with <code>contain-intrinsic-size</code> on long marketing sections can halve layout time with zero JS. <code>will-change</code> applied in bulk does the opposite - it creates compositor layers and eats GPU memory. Animate only <code>transform</code> and <code>opacity</code>. Use <code>ResizeObserver</code> instead of listening to window resize.</p>'
            + '<h4>The design-system angle</h4>'
            + '<p>Do not hand fourteen teams a raw virtualization library. Ship one <code>DataTable</code> component with virtualization, accessibility, sorting and export solved once, correctly, and covered by visual regression tests. This is exactly the kind of complexity a design system exists for: when doing it properly costs more than a single product team can afford.</p>',
        },
      },
      quiz: [
        {
          q: {
            pl: 'Co dokładnie robi wirtualizacja listy?',
            en: 'What does list virtualization actually do?',
          },
          options: [
            { pl: 'Kompresuje dane wierszy, żeby zajmowały mniej pamięci', en: 'Compresses row data so it takes less memory' },
            { pl: 'Renderuje w DOM tylko widoczne wiersze plus zapas, zachowując pełną wysokość kontenera', en: 'Renders only the visible rows plus a buffer in the DOM while keeping the container at full height' },
            { pl: 'Przenosi renderowanie listy do Web Workera', en: 'Moves list rendering into a Web Worker' },
            { pl: 'Ładuje kolejne strony danych z serwera przy scrollu', en: 'Loads more pages of data from the server while scrolling' },
          ],
          correct: 1,
          explain: {
            pl: 'Ostatnia opcja to infinite scroll - często stosowany razem z wirtualizacją, ale to inna technika. Wirtualizacja dotyczy liczby węzłów w DOM, nie źródła danych.',
            en: 'The last option is infinite scroll - often combined with virtualization but a different technique. Virtualization is about the number of DOM nodes, not the data source.',
          },
        },
        {
          q: {
            pl: 'Od jakiego czasu trwania Chrome klasyfikuje zadanie na wątku głównym jako long task?',
            en: 'At what duration does Chrome classify a main-thread task as a long task?',
          },
          options: [
            { pl: '16 ms', en: '16 ms' },
            { pl: '100 ms', en: '100 ms' },
            { pl: '50 ms', en: '50 ms' },
            { pl: '200 ms', en: '200 ms' },
          ],
          correct: 2,
          explain: {
            pl: '50 ms to próg long taska. 16 ms to budżet klatki przy 60 fps, a 200 ms to próg dobrego INP - trzy różne liczby, które łatwo pomylić.',
            en: '50 ms is the long-task threshold. 16 ms is the frame budget at 60 fps and 200 ms is the good-INP threshold - three different numbers that are easy to confuse.',
          },
        },
        {
          q: {
            pl: 'Agenci contact center skarżą się, że po wdrożeniu wirtualizacji nie mogą znaleźć numeru przez ctrl+F. Co jest właściwą reakcją?',
            en: 'Contact-centre agents complain that after virtualization they cannot find a number with ctrl+F. What is the right response?',
          },
          options: [
            { pl: 'Wyłączyć wirtualizację, bo dostępność jest ważniejsza od wydajności', en: 'Turn virtualization off, because accessibility beats performance' },
            { pl: 'Zwiększyć overscan tak, żeby cała tabela była w DOM', en: 'Raise the overscan until the whole table is in the DOM' },
            { pl: 'Dostarczyć wyszukiwarkę w aplikacji plus atrybuty aria-rowcount i aria-rowindex', en: 'Ship an in-app search plus aria-rowcount and aria-rowindex attributes' },
            { pl: 'Poinstruować agentów, żeby korzystali z filtrów kolumnowych', en: 'Instruct the agents to use the column filters' },
          ],
          correct: 2,
          explain: {
            pl: 'Wirtualizacja zabiera funkcję przeglądarki, więc trzeba ją oddać w aplikacji. Zwiększanie overscanu do pełnej tabeli likwiduje cały zysk, a instruowanie użytkowników to przerzucanie kosztu na nich.',
            en: 'Virtualization removes a browser capability, so you give it back in the app. Raising overscan to the whole table erases the benefit, and instructing users just shifts the cost onto them.',
          },
        },
        {
          q: {
            pl: 'Filtrowanie 12 tysięcy wierszy przy każdym naciśnięciu klawisza zabija INP. Która zmiana daje największy efekt najmniejszym kosztem?',
            en: 'Filtering 12 thousand rows on every keystroke kills INP. Which change gives the biggest effect at the lowest cost?',
          },
          options: [
            { pl: 'Przeniesienie filtrowania do Web Workera przez Comlink', en: 'Moving filtering into a Web Worker via Comlink' },
            { pl: 'Odroczenie listy przez useDeferredValue, przy natychmiastowym polu tekstowym', en: 'Deferring the list with useDeferredValue while the input stays instant' },
            { pl: 'Dodanie will-change: transform na kontenerze listy', en: 'Adding will-change: transform on the list container' },
            { pl: 'Zwiększenie overscanu wirtualizera', en: 'Increasing the virtualizer overscan' },
          ],
          correct: 1,
          explain: {
            pl: 'Odroczenie oddziela pilną aktualizację pola od nieprzynaglej listy, kosztuje kilka linijek i natychmiast poprawia odczuwalną responsywność. Worker rozważ dopiero, gdy samo obliczenie nadal przekracza budżet klatki.',
            en: 'Deferring separates the urgent input update from the non-urgent list, costs a few lines and immediately improves felt responsiveness. Reach for a worker only if the computation itself still blows the frame budget.',
          },
        },
      ],
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'rum-monitoring',
      title: { pl: 'RUM: monitoring realnych użytkowników', en: 'RUM: real user monitoring' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'RUM (Real User Monitoring)', en: 'RUM (Real User Monitoring)' },
          def: {
            pl: 'Zbieranie metryk z przeglądarek prawdziwych użytkowników zamiast z testu syntetycznego. Wartość daje dopiero z wymiarami: trasa (znormalizowana, nie surowy URL), urządzenie, sieć, wersja wydania.',
            en: 'Collecting metrics from real users browsers instead of a synthetic test. It only becomes useful with dimensions: route (normalised, not the raw URL), device, network, release version.'
          }
        },
        {
          term: { pl: 'navigator.sendBeacon', en: 'navigator.sendBeacon' },
          def: {
            pl: 'Wysyłka telemetrii, która dojdzie nawet gdy użytkownik zamyka kartę - zwykły <code>fetch</code> zostanie anulowany. Wyzwalaj ją w <code>visibilitychange</code>, bo <code>unload</code> na mobile często się nie odpala.',
            en: 'A telemetry send that survives the user closing the tab, where a plain <code>fetch</code> would be cancelled. Trigger it on <code>visibilitychange</code>, since <code>unload</code> often never fires on mobile.'
          }
        },
        {
          term: { pl: 'CrUX', en: 'CrUX' },
          def: {
            pl: 'Zagregowane dane Chrome z 28 dni, którymi karmi się Search Console. Wiarygodne, ale wolne i tylko dla Chrome; własny RUM widzi też Safari i ma dane w minutach.',
            en: 'Aggregated 28-day Chrome data that feeds Search Console. Trustworthy but slow and Chrome-only; your own RUM also sees Safari and reports within minutes.'
          }
        },
        {
          term: { pl: 'Atrybucja (web-vitals/attribution)', en: 'Attribution (web-vitals/attribution)' },
          def: {
            pl: 'Rozszerzenie biblioteki web-vitals, które przy INP zwraca selektor klikniętego elementu, a przy LCP wskazuje element i przyczynę opóźnienia. Zamienia zgłoszenie <em>jest wolno</em> w konkretny ticket.',
            en: 'The web-vitals extension that returns the interacted element selector for INP and the element plus delay cause for LCP. It turns <em>it feels slow</em> into an actionable ticket.'
          }
        },
        {
          term: { pl: 'Ślepota SPA (soft navigation)', en: 'SPA blindness (soft navigation)' },
          def: {
            pl: 'Domyślnie LCP mierzy się tylko dla pierwszej nawigacji, więc przejścia w routerze nie istnieją w danych. Potrzebujesz własnych znaczników albo Soft Navigations API.',
            en: 'By default LCP is measured only for the first navigation, so router transitions never appear in the data. You need your own marks or the Soft Navigations API.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
          + '<defs><marker id="rum5-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>'
          + '<rect x="20" y="52" width="150" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>'
          + '<text x="95" y="80" text-anchor="middle" font-size="13" fill="var(--text)">browser</text>'
          + '<text x="95" y="102" text-anchor="middle" font-size="12" fill="var(--muted)">web-vitals lib</text>'
          + '<line x1="172" y1="87" x2="208" y2="87" stroke="var(--muted)" stroke-width="2" marker-end="url(#rum5-arrow)"/>'
          + '<rect x="212" y="52" width="150" height="70" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>'
          + '<text x="287" y="80" text-anchor="middle" font-size="13" fill="var(--text)">sendBeacon</text>'
          + '<text x="287" y="102" text-anchor="middle" font-size="12" fill="var(--muted)">on page hide</text>'
          + '<line x1="364" y1="87" x2="400" y2="87" stroke="var(--muted)" stroke-width="2" marker-end="url(#rum5-arrow)"/>'
          + '<rect x="404" y="52" width="216" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="512" y="80" text-anchor="middle" font-size="13" fill="var(--text)">collector</text>'
          + '<text x="512" y="102" text-anchor="middle" font-size="12" fill="var(--muted)">SpeedCurve, Datadog</text>'
          + '<line x1="512" y1="124" x2="512" y2="164" stroke="var(--muted)" stroke-width="2" marker-end="url(#rum5-arrow)"/>'
          + '<rect x="330" y="168" width="290" height="86" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>'
          + '<text x="475" y="196" text-anchor="middle" font-size="13" fill="var(--text)">p75 sliced by route,</text>'
          + '<text x="475" y="218" text-anchor="middle" font-size="13" fill="var(--text)">device, country, release</text>'
          + '<text x="475" y="242" text-anchor="middle" font-size="12" fill="var(--muted)">alerting on regressions</text>'
          + '<rect x="20" y="168" width="280" height="86" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>'
          + '<text x="160" y="196" text-anchor="middle" font-size="13" fill="var(--warn)">CrUX</text>'
          + '<text x="160" y="218" text-anchor="middle" font-size="12" fill="var(--muted)">28 day window, Chrome only</text>'
          + '<text x="160" y="242" text-anchor="middle" font-size="12" fill="var(--muted)">what Google ranks on</text>'
          + '<rect x="20" y="292" width="600" height="84" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>'
          + '<text x="40" y="322" font-size="14" fill="var(--text)">Lab tells you why. Field tells you whether it matters.</text>'
          + '<text x="40" y="352" font-size="13" fill="var(--muted)">Attribution data turns a number into an owner.</text>'
          + '</svg>',
        caption: {
          pl: 'Ścieżka danych RUM: biblioteka w przeglądarce, beacon przy chowaniu strony, kolektor i wykresy p75 cięte po trasie, urządzeniu i wydaniu, obok wolnych danych CrUX.',
          en: 'The RUM data path: a browser library, a beacon on page hide, a collector, and p75 charts sliced by route, device and release, next to the slow CrUX data.',
        },
      },
      levels: {
        eli5: {
          pl: '<p>Piekarnia może sprawdzać jakość chleba na dwa sposoby. Pierwszy: piekarz co rano piecze jeden bochenek w idealnych warunkach i sam go próbuje. Drugi: pytasz stu klientów, jak im smakowało.</p>'
            + '<p>Ten pierwszy sposób jest wygodny i powtarzalny, ale piekarz zawsze próbuje chleba ciepłego, prosto z pieca, stojąc w ciepłej kuchni. Klient je go po godzinie w zimnym autobusie i to jego opinia decyduje, czy wróci.</p>'
            + '<p><strong>RUM</strong> to właśnie pytanie prawdziwych klientów. Twoja strona po cichu zapisuje, ile naprawdę trwało ładowanie u kogoś w pociągu pod Radomiem na sześcioletnim telefonie, i wysyła tę liczbę do Ciebie.</p>'
            + '<p>Bez tego siedzisz w ciepłej kuchni z szybkim internetem i szczerze wierzysz, że wszystko śmiga. A potem ktoś dzwoni i mówi, że u niego nic się nie otwiera - i nie masz pojęcia, czy to jeden pechowiec, czy pół kraju.</p>',
          en: '<p>A bakery can check bread quality two ways. One: the baker bakes a loaf every morning under perfect conditions and tastes it himself. Two: you ask a hundred customers how it was.</p>'
            + '<p>The first way is convenient and repeatable, but the baker always tastes warm bread straight from the oven while standing in a warm kitchen. The customer eats it an hour later on a cold bus, and their opinion decides whether they come back.</p>'
            + '<p><strong>RUM</strong> is exactly that: asking real customers. Your page quietly records how long loading really took for someone on a train on a six-year-old phone, and sends that number to you.</p>'
            + '<p>Without it you sit in the warm kitchen with fast internet and sincerely believe everything flies. Then somebody calls to say nothing opens for them - and you have no idea whether that is one unlucky person or half the country.</p>',
        },
        school: {
          pl: '<p><strong>RUM</strong> (Real User Monitoring - monitoring realnych użytkowników) zbiera metryki wydajności z przeglądarek prawdziwych ludzi, zamiast z syntetycznego testu. Instrumentacja jest zaskakująco tania:</p>'
            + '<pre><code>import { onLCP, onINP, onCLS } from "web-vitals/attribution";\n\nfunction report(metric) {\n  navigator.sendBeacon("/rum", JSON.stringify({\n    name: metric.name,\n    value: metric.value,\n    route: currentRouteId,\n    release: BUILD_SHA,\n    target: metric.attribution.interactionTarget,\n  }));\n}\n\nonLCP(report); onINP(report); onCLS(report);</code></pre>'
            + '<p>Trzy szczegóły decydują o tym, czy dane są użyteczne:</p>'
            + '<ul>'
            + '<li><strong>sendBeacon</strong>, nie fetch. Beacon dojdzie nawet wtedy, gdy użytkownik zamyka kartę; zwykłe żądanie zostanie anulowane.</li>'
            + '<li><strong>Wysyłka w visibilitychange</strong>, nie w unload. Na mobile zdarzenie unload często w ogóle się nie odpala.</li>'
            + '<li><strong>Wymiary</strong> (route, typ urządzenia, kraj, wersja wydania). Bez nich masz jedną liczbę dla całego serwisu i nie da się nic z niej wywnioskować.</li>'
            + '</ul>'
            + '<p>Paczka <code>web-vitals/attribution</code> jest tu kluczowa: przy INP zwraca selektor elementu, który spowodował najgorszą interakcję, a przy LCP - który element był tym największym i co go opóźniło. Dzięki temu ticket brzmi nie jak nie działa, tylko przycisk zmiany taryfy na Androidzie ma INP 620 ms.</p>'
            + '<p>Warto rozumieć różnicę wobec <strong>CrUX</strong>: CrUX to zagregowane dane Chrome z 28 dni, którymi karmi się Search Console. Są wiarygodne i wolne. Twój własny RUM widzi też Safari, ma dane w minutach i pozwala ciąć po czym chcesz.</p>',
          en: '<p><strong>RUM</strong> (Real User Monitoring) collects performance metrics from the browsers of real people instead of from a synthetic test. The instrumentation is surprisingly cheap:</p>'
            + '<pre><code>import { onLCP, onINP, onCLS } from "web-vitals/attribution";\n\nfunction report(metric) {\n  navigator.sendBeacon("/rum", JSON.stringify({\n    name: metric.name,\n    value: metric.value,\n    route: currentRouteId,\n    release: BUILD_SHA,\n    target: metric.attribution.interactionTarget,\n  }));\n}\n\nonLCP(report); onINP(report); onCLS(report);</code></pre>'
            + '<p>Three details decide whether the data is useful:</p>'
            + '<ul>'
            + '<li><strong>sendBeacon</strong>, not fetch. A beacon still arrives when the user closes the tab; a normal request gets cancelled.</li>'
            + '<li><strong>Send on visibilitychange</strong>, not unload. On mobile the unload event often never fires at all.</li>'
            + '<li><strong>Dimensions</strong> (route, device class, country, release). Without them you have one number for the whole site and can conclude nothing from it.</li>'
            + '</ul>'
            + '<p>The <code>web-vitals/attribution</code> build is key here: for INP it returns the selector of the element behind the worst interaction, and for LCP which element was the largest and what delayed it. That turns a ticket from it is slow into the tariff-change button on Android has an INP of 620 ms.</p>'
            + '<p>Understand the difference from <strong>CrUX</strong>: CrUX is aggregated Chrome data over 28 days and it is what Search Console reports. It is credible and slow. Your own RUM also sees Safari, has data within minutes, and lets you slice by whatever you want.</p>',
        },
        pro: {
          pl: '<p>RUM jest tym momentem, w którym wydajność przestaje być opinią. Dopóki nie masz danych z pola, każda dyskusja o priorytetach kończy się przy tym, kto mówi głośniej.</p>'
            + '<h4>Model danych, który się broni</h4>'
            + '<p>Zdarzenie powinno nieść: metrykę i wartość, identyfikator trasy (a nie surowy URL - inaczej rozsadzisz kardynalność), klasę urządzenia, typ połączenia, kraj, wersję wydania, wariant testu A/B, typ nawigacji (nowa czy wznowiona z bfcache) oraz dane atrybucji. Wersja wydania jest najważniejsza z pozoru nudnym polem: bez niej nie odróżnisz regresji od sezonowości.</p>'
            + '<p>Próbkowanie: przy 10 mln wizyt miesięcznie 100 proc. ruchu to niepotrzebny koszt hurtowni. 10-20 proc. w zupełności wystarcza do stabilnego p75 per trasa, ale <strong>nie próbkuj po żądaniu, tylko po sesji</strong> - inaczej stracisz spójność między metrykami tej samej wizyty.</p>'
            + '<h4>Alertowanie, które nie budzi bez sensu</h4>'
            + '<p>Progi bezwzględne na p75 generują szum przy każdym weekendzie. Lepiej działa alert na zmianę względną w oknie kroczącym, ograniczony do tras o istotnym ruchu:</p>'
            + '<pre><code>alert: LCPRegression\nexpr: p75_lcp{route="checkout"} &gt; 1.2 * p75_lcp_7d_ago{route="checkout"}\n  and sessions{route="checkout"} &gt; 5000\nfor: 30m</code></pre>'
            + '<p>Sprzęgnij to z wdrożeniami. Deploy marker na wykresie i alert porównujący 30 minut po wydaniu do 30 minut przed to najskuteczniejsza pojedyncza rzecz, jaką możesz zbudować - zamienia trzytygodniowe śledztwo w jedno zdanie: to weszło z release 2024.31.</p>'
            + '<h4>Podłącz metryki biznesowe do tego samego strumienia</h4>'
            + '<p>Jeśli w tym samym zdarzeniu masz krok lejka zakupowego, możesz policzyć konwersję w kubełkach LCP. Realny wynik z takiej analizy - że sesje z LCP powyżej 4 s konwertują o jedną trzecią gorzej - jest argumentem, którego nie da się zbyć na przeglądzie portfela projektów. To także najskuteczniejszy sposób, żeby dostać etat na wydajność.</p>'
            + '<h4>Pułapki</h4>'
            + '<ul>'
            + '<li><strong>Ślepota SPA.</strong> Domyślnie LCP mierzy się tylko dla pierwszej nawigacji. Przejścia w routerze wymagają własnych znaczników lub Soft Navigations API - inaczej Twoje najgorsze ekrany nie istnieją w danych.</li>'
            + '<li><strong>Kardynalność.</strong> Surowy URL z identyfikatorem klienta w ścieżce wysadzi rachunek i indeksy. Normalizuj do wzorca trasy.</li>'
            + '<li><strong>Prywatność.</strong> RUM to dane osobowe, gdy dołożysz IP albo identyfikator użytkownika. W telekomie oznacza to zgodę marketingową lub zapis o uzasadnionym interesie, retencję 30-90 dni i przegląd u inspektora ochrony danych. Zaplanuj to na starcie, nie po wdrożeniu.</li>'
            + '<li><strong>Sam agent RUM waży.</strong> Skrypty komercyjne to 30-60 kB i własne long taski. Ironia bywa dotkliwa; sprawdź jego wpływ na te metryki, które ma mierzyć.</li>'
            + '</ul>'
            + '<p>Dojrzały stan docelowy: budżet w CI blokuje regresje przed wdrożeniem, RUM potwierdza je w polu i pokazuje właściciela, a CrUX służy tylko do rozmowy o SEO. Trzy warstwy, trzy różne pytania.</p>',
          en: '<p>RUM is the moment performance stops being an opinion. Until you have field data, every prioritisation debate ends with whoever talks loudest.</p>'
            + '<h4>A data model that holds up</h4>'
            + '<p>Each event should carry: the metric and value, a route id (not the raw URL, or you blow up cardinality), device class, connection type, country, release version, A/B variant, navigation type (fresh or restored from bfcache) and attribution data. Release version is the most important boring field: without it you cannot tell a regression from seasonality.</p>'
            + '<p>Sampling: at 10 million visits a month, 100 percent of traffic is a pointless warehouse bill. 10-20 percent is plenty for a stable p75 per route, but <strong>sample by session, not by request</strong> - otherwise you lose coherence between metrics of the same visit.</p>'
            + '<h4>Alerting that does not wake people for nothing</h4>'
            + '<p>Absolute thresholds on p75 produce noise every weekend. A relative change over a rolling window, restricted to routes with meaningful traffic, works far better:</p>'
            + '<pre><code>alert: LCPRegression\nexpr: p75_lcp{route="checkout"} &gt; 1.2 * p75_lcp_7d_ago{route="checkout"}\n  and sessions{route="checkout"} &gt; 5000\nfor: 30m</code></pre>'
            + '<p>Couple this with deployments. A deploy marker on the chart plus an alert comparing 30 minutes after a release to 30 minutes before is the single most effective thing you can build - it turns a three-week investigation into one sentence: this came in with release 2024.31.</p>'
            + '<h4>Put business metrics in the same stream</h4>'
            + '<p>If the same event carries the funnel step, you can compute conversion bucketed by LCP. A real finding from that analysis - that sessions above 4 s LCP convert a third worse - is an argument nobody can wave away in a portfolio review. It is also the most effective way to get a headcount for performance work.</p>'
            + '<h4>Traps</h4>'
            + '<ul>'
            + '<li><strong>SPA blindness.</strong> By default LCP is measured only for the first navigation. Router transitions need your own marks or the Soft Navigations API - otherwise your worst screens do not exist in the data.</li>'
            + '<li><strong>Cardinality.</strong> A raw URL with a customer id in the path will wreck your bill and your indexes. Normalise to the route pattern.</li>'
            + '<li><strong>Privacy.</strong> RUM becomes personal data the moment you add IP or a user id. In a telco that means marketing consent or a legitimate-interest record, 30-90 day retention and a review with the data protection officer. Plan it upfront, not after rollout.</li>'
            + '<li><strong>The RUM agent itself has weight.</strong> Commercial scripts are 30-60 kB with their own long tasks. The irony can be painful; measure its impact on the very metrics it reports.</li>'
            + '</ul>'
            + '<p>The mature end state: the CI budget blocks regressions before release, RUM confirms them in the field and points at an owner, and CrUX is only used for the SEO conversation. Three layers, three different questions.</p>',
        },
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego metryki RUM wysyła się przez navigator.sendBeacon, a nie zwykłym fetch?',
            en: 'Why are RUM metrics sent with navigator.sendBeacon rather than a regular fetch?',
          },
          options: [
            { pl: 'Bo sendBeacon kompresuje ładunek automatycznie', en: 'Because sendBeacon compresses the payload automatically' },
            { pl: 'Bo beacon zostanie wysłany także wtedy, gdy strona jest zamykana', en: 'Because a beacon is still delivered when the page is being closed' },
            { pl: 'Bo fetch nie działa w zdarzeniu visibilitychange', en: 'Because fetch does not work in a visibilitychange handler' },
            { pl: 'Bo sendBeacon omija limity CORS', en: 'Because sendBeacon bypasses CORS limits' },
          ],
          correct: 1,
          explain: {
            pl: 'Przeglądarka anuluje zwykłe żądania przy zamykaniu karty, a beacon przekazuje do wysłania w tle. Dlatego jest to standardowy transport dla telemetrii końca sesji.',
            en: 'The browser cancels normal requests when the tab closes, while a beacon is handed off for background delivery. That makes it the standard transport for end-of-session telemetry.',
          },
        },
        {
          q: {
            pl: 'Czym różni się CrUX od własnego RUM?',
            en: 'How does CrUX differ from your own RUM?',
          },
          options: [
            { pl: 'CrUX mierzy w labie, RUM mierzy w polu', en: 'CrUX measures in the lab, RUM measures in the field' },
            { pl: 'CrUX obejmuje wszystkie przeglądarki, RUM tylko Chrome', en: 'CrUX covers every browser, RUM only Chrome' },
            { pl: 'CrUX to zagregowane dane Chrome z 28 dni, RUM daje własne wymiary niemal na żywo', en: 'CrUX is aggregated Chrome data over 28 days, RUM gives your own dimensions in near real time' },
            { pl: 'CrUX raportuje mediany, RUM raportuje p75', en: 'CrUX reports medians, RUM reports p75' },
          ],
          correct: 2,
          explain: {
            pl: 'Oba są danymi z pola. CrUX jest wolny, ograniczony do Chrome i bez Twoich wymiarów, ale to on zasila Search Console, więc oba są potrzebne z różnych powodów.',
            en: 'Both are field data. CrUX is slow, Chrome-only and has none of your dimensions, but it is what feeds Search Console, so you need both for different reasons.',
          },
        },
        {
          q: {
            pl: 'Wysyłasz w zdarzeniu RUM pełny URL, łącznie z identyfikatorem klienta w ścieżce. Jaki jest główny problem?',
            en: 'You send the full URL in the RUM event, including a customer id in the path. What is the main problem?',
          },
          options: [
            { pl: 'Eksplozja kardynalności i dane osobowe w telemetrii', en: 'Cardinality explosion and personal data in telemetry' },
            { pl: 'Beacon przekroczy limit 64 kB ładunku', en: 'The beacon will exceed the 64 kB payload limit' },
            { pl: 'Metryki LCP przestaną się zbierać', en: 'LCP metrics will stop being collected' },
            { pl: 'Kolektor odrzuci zdarzenia z powodu CORS', en: 'The collector will reject events because of CORS' },
          ],
          correct: 0,
          explain: {
            pl: 'Unikalne URL-e rozsadzają indeksy i rachunek za hurtownię, a identyfikator klienta czyni z telemetrii dane osobowe podlegające RODO. Normalizuj do wzorca trasy.',
            en: 'Unique URLs wreck indexes and the warehouse bill, and a customer id turns telemetry into personal data under GDPR. Normalise to a route pattern.',
          },
        },
        {
          q: {
            pl: 'Aplikacja SPA ma świetne wyniki w RUM, ale użytkownicy narzekają na wolne przejścia między ekranami. Najbardziej prawdopodobna przyczyna?',
            en: 'An SPA shows great RUM numbers but users complain about slow transitions between screens. Most likely cause?',
          },
          options: [
            { pl: 'Próbkowanie ustawione zbyt nisko', en: 'Sampling set too low' },
            { pl: 'Beacony gubią się przy zamykaniu karty', en: 'Beacons are lost when the tab closes' },
            { pl: 'Metryki są liczone tylko dla pierwszej nawigacji, nawigacje w routerze nie są mierzone', en: 'Metrics are only computed for the first navigation, router transitions are not measured' },
            { pl: 'CrUX opóźnia dane o 28 dni', en: 'CrUX delays the data by 28 days' },
          ],
          correct: 2,
          explain: {
            pl: 'To klasyczna ślepota SPA: LCP i CLS domyślnie dotyczą pierwszego wczytania dokumentu. Potrzebujesz własnych znaczników przejść albo Soft Navigations API, żeby te ekrany w ogóle pojawiły się w danych.',
            en: 'This is classic SPA blindness: LCP and CLS by default cover the first document load only. You need your own transition marks or the Soft Navigations API before those screens exist in the data at all.',
          },
        },
      ],
    },
  ],
};
