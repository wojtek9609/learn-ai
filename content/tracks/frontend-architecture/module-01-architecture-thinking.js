// Track: Frontend Architecture - Module 01 "Architecture thinking"
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema", v4).

// --- local helpers: interactive frames share one exact layout per lesson ---

function arrowDefs(id, color) {
  return '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" ' +
    'orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + color + '"/></marker></defs>';
}

function appBox(x, label, hot) {
  return '<rect x="' + x + '" y="300" width="150" height="62" rx="12" fill="var(--surface)" stroke="' +
    (hot ? 'var(--warn)' : 'var(--border)') + '" stroke-width="' + (hot ? 3 : 2) + '"/>' +
    '<text x="' + (x + 75) + '" y="326" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 75) + '" y="347" text-anchor="middle" font-size="13" fill="var(--muted)">' +
    (hot ? 'rebuild + retest' : 'untouched') + '</text>';
}

// step 0..4 - blast radius of one token change
function frameBlast(step, caption) {
  var hotAll = step === 1 || step === 2;
  var s = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    arrowDefs('fa1', 'var(--muted)') + arrowDefs('fa2', 'var(--err)') +
    '<rect x="240" y="20" width="160" height="52" rx="12" fill="var(--surface)" stroke="' +
    (step === 0 ? 'var(--accent)' : 'var(--border)') + '" stroke-width="' + (step === 0 ? 3 : 2) + '"/>' +
    '<text x="320" y="42" text-anchor="middle" font-size="14" fill="var(--text)">spacing token</text>' +
    '<text x="320" y="61" text-anchor="middle" font-size="13" fill="var(--muted)">8px changes to 12px</text>' +
    '<line x1="320" y1="72" x2="320" y2="108" stroke="var(--muted)" stroke-width="2" marker-end="url(#fa1)"/>' +
    // design system package
    '<rect x="60" y="112" width="520" height="126" rx="14" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
    '<text x="76" y="134" font-size="14" fill="var(--accent)">design system package</text>' +
    '<rect x="80" y="146" width="150" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="155" y="174" text-anchor="middle" font-size="13" fill="var(--muted)">internal styles</text>' +
    '<rect x="248" y="146" width="150" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="323" y="174" text-anchor="middle" font-size="13" fill="var(--muted)">Button internals</text>' +
    '<rect x="416" y="146" width="150" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="491" y="174" text-anchor="middle" font-size="13" fill="var(--muted)">theme internals</text>' +
    '<rect x="80" y="202" width="486" height="24" rx="8" fill="var(--surface)" stroke="' +
    (step >= 3 ? 'var(--ok)' : 'var(--border)') + '" stroke-width="2"/>' +
    '<text x="323" y="219" text-anchor="middle" font-size="13" fill="' + (step >= 3 ? 'var(--ok)' : 'var(--muted)') + '">' +
    (step >= 3 ? 'public entry point - the only supported import' : 'public entry point') + '</text>' +
    // edges down to apps
    '<line x1="155" y1="238" x2="155" y2="292" stroke="' + (hotAll || step >= 3 ? 'var(--warn)' : 'var(--muted)') +
    '" stroke-width="2" marker-end="url(#fa1)"/>' +
    '<line x1="323" y1="238" x2="323" y2="292" stroke="' + (hotAll || step >= 3 ? 'var(--warn)' : 'var(--muted)') +
    '" stroke-width="2" marker-end="url(#fa1)"/>' +
    '<line x1="491" y1="238" x2="491" y2="292" stroke="' + (hotAll || step >= 3 ? 'var(--warn)' : 'var(--muted)') +
    '" stroke-width="2" marker-end="url(#fa1)"/>' +
    appBox(80, 'Shop app', hotAll || step >= 3) +
    appBox(248, 'Self care', hotAll) +
    appBox(416, 'Field tools', hotAll);
  if (step === 2) {
    s += '<path d="M 500 300 C 560 260 600 220 566 194" fill="none" stroke="var(--err)" stroke-width="2" marker-end="url(#fa2)"/>' +
      '<path d="M 120 300 C 40 262 30 210 76 172" fill="none" stroke="var(--err)" stroke-width="2" marker-end="url(#fa2)"/>' +
      '<text x="320" y="386" text-anchor="middle" font-size="14" fill="var(--err)">deep imports skip the contract</text>';
  }
  if (step === 3) {
    s += '<line x1="26" y1="150" x2="70" y2="194" stroke="var(--err)" stroke-width="3"/>' +
      '<line x1="70" y1="150" x2="26" y2="194" stroke="var(--err)" stroke-width="3"/>' +
      '<line x1="572" y1="150" x2="616" y2="194" stroke="var(--err)" stroke-width="3"/>' +
      '<line x1="616" y1="150" x2="572" y2="194" stroke="var(--err)" stroke-width="3"/>';
  }
  s += '<text x="320" y="' + (step === 2 ? 398 : 386) + '" text-anchor="middle" font-size="14" fill="var(--text)">' +
    caption + '</text></svg>';
  return s;
}

function teamBox(x, label, sub, state) {
  var stroke = state === 'hot' ? 'var(--accent)' : (state === 'ok' ? 'var(--ok)' : 'var(--border)');
  return '<rect x="' + x + '" y="24" width="170" height="62" rx="12" fill="var(--surface)" stroke="' + stroke +
    '" stroke-width="' + (state === 'plain' ? 2 : 3) + '"/>' +
    '<text x="' + (x + 85) + '" y="50" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>' +
    '<text x="' + (x + 85) + '" y="71" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text>';
}

// step 0..4 - Conway: from three copies of Button to a platform team
function frameConway(step, bottom) {
  var showPlatform = step >= 2;
  var s = '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    arrowDefs('cw1', 'var(--muted)') + arrowDefs('cw2', 'var(--accent2)') +
    teamBox(20, 'Team Shop', 'stream-aligned', step === 3 ? 'hot' : 'plain') +
    teamBox(235, 'Team Care', 'stream-aligned', 'plain') +
    teamBox(450, 'Team Field', 'stream-aligned', 'plain') +
    '<line x1="105" y1="86" x2="105" y2="' + (showPlatform ? 158 : 288) + '" stroke="var(--muted)" stroke-width="2" marker-end="url(#cw1)"/>' +
    '<line x1="320" y1="86" x2="320" y2="' + (showPlatform ? 158 : 288) + '" stroke="var(--muted)" stroke-width="2" marker-end="url(#cw1)"/>' +
    '<line x1="535" y1="86" x2="535" y2="' + (showPlatform ? 158 : 288) + '" stroke="var(--muted)" stroke-width="2" marker-end="url(#cw1)"/>';
  if (showPlatform) {
    s += '<rect x="120" y="166" width="400" height="62" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="3"/>' +
      '<text x="320" y="192" text-anchor="middle" font-size="14" fill="var(--text)">Platform team: design system</text>' +
      '<text x="320" y="213" text-anchor="middle" font-size="13" fill="var(--muted)">' +
      (step === 3 ? 'collaboration mode, 2 sprints' : 'X-as-a-service, versioned package') + '</text>' +
      '<line x1="200" y1="228" x2="140" y2="288" stroke="var(--accent2)" stroke-width="2" marker-end="url(#cw2)"/>' +
      '<line x1="320" y1="228" x2="320" y2="288" stroke="var(--accent2)" stroke-width="2" marker-end="url(#cw2)"/>' +
      '<line x1="440" y1="228" x2="500" y2="288" stroke="var(--accent2)" stroke-width="2" marker-end="url(#cw2)"/>';
  } else {
    s += '<text x="320" y="200" text-anchor="middle" font-size="14" fill="var(--muted)">no owner between the teams</text>';
  }
  if (step === 3) {
    s += '<path d="M 105 86 C 60 130 60 150 130 172" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#cw1)"/>' +
      '<text x="20" y="150" font-size="13" fill="var(--accent)">pairing</text>';
  }
  if (step === 4) {
    s += '<text x="320" y="252" text-anchor="middle" font-size="13" fill="var(--ok)">enabling mode: office hours, codemods, contribution guide</text>';
  }
  var dup = step <= 1;
  s += '<rect x="30" y="296" width="160" height="58" rx="12" fill="var(--surface)" stroke="' +
    (dup ? 'var(--warn)' : 'var(--ok)') + '" stroke-width="2"/>' +
    '<text x="110" y="320" text-anchor="middle" font-size="13" fill="var(--text)">' + (dup ? 'Button copy #1' : 'Shop UI') + '</text>' +
    '<text x="110" y="341" text-anchor="middle" font-size="13" fill="var(--muted)">' + (dup ? 'own a11y bugs' : 'consumes v3.4') + '</text>' +
    '<rect x="240" y="296" width="160" height="58" rx="12" fill="var(--surface)" stroke="' +
    (dup ? 'var(--warn)' : 'var(--ok)') + '" stroke-width="2"/>' +
    '<text x="320" y="320" text-anchor="middle" font-size="13" fill="var(--text)">' + (dup ? 'Button copy #2' : 'Care UI') + '</text>' +
    '<text x="320" y="341" text-anchor="middle" font-size="13" fill="var(--muted)">' + (dup ? 'own focus ring' : 'consumes v3.4') + '</text>' +
    '<rect x="450" y="296" width="160" height="58" rx="12" fill="var(--surface)" stroke="' +
    (dup ? 'var(--warn)' : 'var(--ok)') + '" stroke-width="2"/>' +
    '<text x="530" y="320" text-anchor="middle" font-size="13" fill="var(--text)">' + (dup ? 'Button copy #3' : 'Field UI') + '</text>' +
    '<text x="530" y="341" text-anchor="middle" font-size="13" fill="var(--muted)">' + (dup ? 'own tokens' : 'consumes v3.3') + '</text>' +
    '<text x="320" y="384" text-anchor="middle" font-size="14" fill="var(--text)">' + bottom + '</text>' +
    '</svg>';
  return s;
}

export default {
  id: 'architecture-thinking',
  order: 1,
  icon: '🧭',
  title: {
    pl: 'Myślenie architektoniczne',
    en: 'Architecture thinking'
  },
  description: {
    pl: 'Czym naprawdę jest architektura frontendu: granice i sprzężenia, decyzje zapisane w ADR-ach, prawo Conwaya i topologie zespołów oraz trzeźwe decyzje build vs buy.',
    en: 'What frontend architecture really is: boundaries and coupling, decisions recorded as ADRs, Conway law and team topologies, and honest build-vs-buy calls.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'what-is-frontend-architecture',
      title: {
        pl: 'Czym jest architektura frontendu',
        en: 'What frontend architecture is'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Architecture = the decisions that are expensive to reverse</text>' +
          '<rect x="24" y="52" width="280" height="230" rx="14" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="164" y="80" text-anchor="middle" font-size="15" fill="var(--ok)">Cheap to change</text>' +
          '<text x="48" y="112" font-size="13" fill="var(--muted)">component internals</text>' +
          '<text x="48" y="140" font-size="13" fill="var(--muted)">CSS of one screen</text>' +
          '<text x="48" y="168" font-size="13" fill="var(--muted)">copy and labels</text>' +
          '<text x="48" y="196" font-size="13" fill="var(--muted)">a single unit test</text>' +
          '<text x="48" y="224" font-size="13" fill="var(--muted)">folder names in one app</text>' +
          '<text x="48" y="258" font-size="13" fill="var(--muted)">fix it on a Friday</text>' +
          '<rect x="336" y="52" width="280" height="230" rx="14" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="476" y="80" text-anchor="middle" font-size="15" fill="var(--warn)">Expensive to reverse</text>' +
          '<text x="360" y="112" font-size="13" fill="var(--muted)">module boundaries</text>' +
          '<text x="360" y="140" font-size="13" fill="var(--muted)">public component API</text>' +
          '<text x="360" y="168" font-size="13" fill="var(--muted)">token and theming contract</text>' +
          '<text x="360" y="196" font-size="13" fill="var(--muted)">rendering strategy</text>' +
          '<text x="360" y="224" font-size="13" fill="var(--muted)">build and release model</text>' +
          '<text x="360" y="258" font-size="13" fill="var(--muted)">costs 40 teams a quarter</text>' +
          '<rect x="24" y="304" width="592" height="72" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="332" text-anchor="middle" font-size="15" fill="var(--text)">Spend your review time on the right column</text>' +
          '<text x="320" y="356" text-anchor="middle" font-size="13" fill="var(--muted)">and make those decisions executable: lint rules, budgets, generators</text>' +
          '</svg>',
        caption: {
          pl: 'Architektura to prawa kolumna: decyzje, których cofnięcie kosztuje kwartał pracy wielu zespołów, a nie kolor przycisku.',
          en: 'Architecture is the right-hand column: decisions whose reversal costs many teams a quarter, not the colour of a button.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że nie budujesz jednego domu, tylko całe osiedle. Kolor kanapy w salonie możesz zmienić w sobotę po południu. Ale gdzie idą rury, gdzie są drogi i jak szerokie są bramy - to decydujesz raz, na początku, i potem musisz z tym żyć przez dwadzieścia lat.</p>' +
            '<p>Architektura to właśnie te rury i drogi. Nie chodzi o to, żeby wszystko było ładne. Chodzi o to, żeby za dwa lata ktoś mógł dobudować nowy blok bez rozkopywania całego osiedla.</p>' +
            '<p>Twoja praca to nie wybieranie kanap. Twoja praca to rozpoznać, co jest kanapą, a co rurą - i pilnować rur. Kiedy ktoś mówi: "przecież to tylko mały skrót", a ten skrót przechodzi przez ścianę nośną, to jest twój moment.</p>' +
            '<p>Najlepsi architekci rzadko mówią "nie". Częściej mówią: "zróbmy to tak, żeby dało się to potem cofnąć".</p>',
          en: '<p>Imagine you are not building one house but an entire housing estate. You can change the colour of the sofa on a Saturday afternoon. But where the pipes run, where the roads go and how wide the gates are - you decide once, at the start, and then you live with it for twenty years.</p>' +
            '<p>Architecture is the pipes and the roads. It is not about making everything pretty. It is about making sure that in two years somebody can add a new block without digging up the whole estate.</p>' +
            '<p>Your job is not picking sofas. Your job is telling which thing is a sofa and which thing is a pipe, and guarding the pipes. When somebody says "it is only a tiny shortcut" and the shortcut goes through a load-bearing wall, that is your moment.</p>' +
            '<p>The best architects rarely say no. They usually say: let us do it in a way we can undo later.</p>'
        },
        school: {
          pl: '<p>Robocza definicja: architektura to zbiór decyzji, które trudno cofnąć, plus ograniczenia, na które wszyscy się zgodzili. Wybór frameworka to tylko jedna z nich, i wcale nie najważniejsza.</p>' +
            '<p>Typowe decyzje architektoniczne we frontendzie:</p>' +
            '<ul>' +
            '<li><strong>Granice modułów</strong> - co wolno importować z czego i przez jaki punkt wejścia.</li>' +
            '<li><strong>Publiczne API komponentów</strong> - propsy, sloty, zdarzenia, czyli to, co obiecujesz utrzymywać.</li>' +
            '<li><strong>Kontrakt tokenów i motywów</strong> - jak aplikacje dostają kolory, odstępy i tryb ciemny.</li>' +
            '<li><strong>Strategia renderowania</strong> - CSR, SSR, SSG, streaming; to decyduje o hostingu i o metrykach.</li>' +
            '<li><strong>Model wydawania</strong> - monorepo czy osobne repozytoria, wersjonowanie, kanały release.</li>' +
            '</ul>' +
            '<p>Wspólny mianownik: każda z nich dotyka wielu zespołów naraz. Zmiana nazwy folderu w jednej aplikacji to sprzątanie. Zmiana propsa w komponencie używanym przez czterdzieści aplikacji to migracja.</p>' +
            '<p>Drugi ważny wniosek: architektura nie jest dokumentem, tylko czynnością. Nie ustala się jej raz na starcie projektu. Ustala się ją ciągle, przy każdej decyzji, która zwiększa albo zmniejsza koszt kolejnych zmian.</p>' +
            '<p>Dlatego dobra architektura ma jedną cechę widoczną gołym okiem: <em>domyślna, wygodna droga jest jednocześnie drogą właściwą</em>. Jeśli poprawne rozwiązanie wymaga przeczytania trzydziestu stron wiki, ludzie wybiorą skrót - i będą mieli rację.</p>' +
            '<p>Prosty test na to, czy decyzja jest architektoniczna: policz, ile zespołów musiałoby coś zrobić, gdybyś ją jutro wycofał. Jeden zespół to zwykła refaktoryzacja. Pięć zespołów to już program migracyjny, harmonogram, komunikacja i ktoś, kto pilnuje, żeby ostatnia aplikacja też przeszła.</p>' +
            '<p>I ostatnia rzecz: architektura nie jest bramką kontrolną. Jeśli twoje decyzje spowalniają zespoły, zamiast im pomagać, prędzej czy później zaczną budować obok ciebie - i wtedy naprawdę tracisz kontrolę nad systemem.</p>',
          en: '<p>Working definition: architecture is the set of decisions that are hard to reverse, plus the constraints everyone agreed to live under. Framework choice is only one of them, and rarely the most important.</p>' +
            '<p>Typical frontend architecture decisions:</p>' +
            '<ul>' +
            '<li><strong>Module boundaries</strong> - what may import what, and through which entry point.</li>' +
            '<li><strong>Public component APIs</strong> - props, slots, events: the surface you promise to maintain.</li>' +
            '<li><strong>Token and theming contract</strong> - how apps receive colours, spacing and dark mode.</li>' +
            '<li><strong>Rendering strategy</strong> - CSR, SSR, SSG, streaming; it dictates hosting and your metrics.</li>' +
            '<li><strong>Release model</strong> - monorepo or many repos, versioning, release channels.</li>' +
            '</ul>' +
            '<p>What they share: each one touches many teams at once. Renaming a folder inside one app is tidying. Renaming a prop on a component used by forty apps is a migration programme.</p>' +
            '<p>Second point: architecture is a verb, not a document. You do not settle it once at project kickoff. You settle it continuously, in every decision that raises or lowers the cost of the next change.</p>' +
            '<p>That is why good architecture has one visible property: <em>the default, convenient path is also the correct path</em>. If doing it right requires reading thirty wiki pages, people will take the shortcut, and they will be right to.</p>'
        },
        pro: {
          pl: '<p>Praktyczna definicja dla poziomu principal: architektura to <strong>ograniczenia, interfejsy i domyślne wartości</strong>, które sprawiają, że pożądane zachowanie jest najtańsze. Nie kontrolujesz czterdziestu zespołów przez review. Kontrolujesz je przez to, co jest łatwe.</p>' +
            '<h4>Uczyń decyzje wykonywalnymi</h4>' +
            '<p>Decyzja, która żyje tylko w Confluence, umiera przy pierwszym deadlinie. Każda ważna decyzja powinna mieć swój odpowiednik w CI:</p>' +
            '<ul>' +
            '<li>granice modułów - <code>dependency-cruiser</code>, <code>eslint-plugin-boundaries</code> albo tagi Nx z regułą <code>enforce-module-boundaries</code>;</li>' +
            '<li>publiczne API paczki - raport z <code>@microsoft/api-extractor</code> commitowany do repo, więc breaking change wywala build zamiast pojawić się w changelogu po fakcie;</li>' +
            '<li>budżety wydajności - <code>size-limit</code> lub Lighthouse CI z twardym progiem, np. 180 kB gzip dla shella;</li>' +
            '<li>regresja wizualna - Chromatic albo Playwright z porównaniem zrzutów dla komponentów design systemu;</li>' +
            '<li>złota ścieżka - generatory (Nx generators, szablony Backstage), żeby nowa aplikacja startowała już zgodna.</li>' +
            '</ul>' +
            '<pre><code>// .dependency-cruiser.cjs\nforbidden: [{\n  name: "no-deep-ds-imports",\n  severity: "error",\n  from: { path: "^apps/" },\n  to: { path: "^packages/design-system/src/(?!index)" }\n}]</code></pre>' +
            '<h4>Liczby, które warto mieć w głowie</h4>' +
            '<p>W telco z ~40 aplikacjami zmiana wymagająca ręcznej migracji to realnie 40 pull requestów, 40 kolejek review i 3-6 miesięcy do pełnego wdrożenia, bo najwolniejszy zespół wyznacza tempo. Ta liczba, a nie elegancja rozwiązania, powinna być pierwszym slajdem każdej propozycji. Jeśli nie umiesz jej podać, nie masz jeszcze propozycji.</p>' +
            '<h4>Odwracalność jako główna oś</h4>' +
            '<p>Podziel decyzje na drzwi jednokierunkowe i dwukierunkowe. Dwukierunkowe deleguj i przyspieszaj. Jednokierunkowe (format tokenów, model wersjonowania, granica między design systemem a produktem) rób wolno, z ADR-em i prototypem na jednej realnej aplikacji.</p>' +
            '<h4>Pułapki i rozmowy rekrutacyjne</h4>' +
            '<p>Najczęstsze antywzorce: architektura jako bramka zamiast jako wsparcie, standard bez migracji ze starego stanu, oraz "wielkie przepisanie" bez ścieżki stopniowej. Na rozmowie na principala pytanie brzmi zwykle nie "co byś wybrał", tylko "jak byś to wdrożył w organizacji, która się z tobą nie zgadza" - i odpowiedź musi zawierać metryki, pilota i plan wycofania.</p>',
          en: '<p>A practical principal-level definition: architecture is the <strong>constraints, interfaces and defaults</strong> that make the desired behaviour the cheapest one. You do not control forty teams through code review. You control them through what is easy.</p>' +
            '<h4>Make decisions executable</h4>' +
            '<p>A decision that only lives in Confluence dies at the first deadline. Every significant decision should have a CI counterpart:</p>' +
            '<ul>' +
            '<li>module boundaries - <code>dependency-cruiser</code>, <code>eslint-plugin-boundaries</code>, or Nx tags with <code>enforce-module-boundaries</code>;</li>' +
            '<li>public package API - a committed <code>@microsoft/api-extractor</code> report, so a breaking change fails the build instead of surfacing in the changelog afterwards;</li>' +
            '<li>performance budgets - <code>size-limit</code> or Lighthouse CI with a hard threshold, for example 180 kB gzip for the shell;</li>' +
            '<li>visual regression - Chromatic or Playwright screenshot diffs for design system components;</li>' +
            '<li>the golden path - generators (Nx generators, Backstage templates) so a new app is born compliant.</li>' +
            '</ul>' +
            '<pre><code>// .dependency-cruiser.cjs\nforbidden: [{\n  name: "no-deep-ds-imports",\n  severity: "error",\n  from: { path: "^apps/" },\n  to: { path: "^packages/design-system/src/(?!index)" }\n}]</code></pre>' +
            '<h4>Numbers worth carrying</h4>' +
            '<p>In a telco with ~40 apps, a change that needs manual migration is realistically 40 pull requests, 40 review queues and 3-6 months to full adoption, because the slowest team sets the pace. That number, not the elegance of the design, belongs on slide one of any proposal. If you cannot state it, you do not have a proposal yet.</p>' +
            '<h4>Reversibility as the main axis</h4>' +
            '<p>Split decisions into one-way and two-way doors. Delegate and speed up the two-way ones. Take the one-way ones slowly - token format, versioning model, the seam between design system and product - with an ADR and a prototype on one real application.</p>' +
            '<h4>Pitfalls and interviews</h4>' +
            '<p>The common anti-patterns: architecture as a gate rather than an enabler, a standard with no migration path off the old state, and the big rewrite with no incremental route. In a principal interview the question is rarely "what would you pick" but "how would you land it in an organisation that disagrees with you" - and the answer needs metrics, a pilot and a rollback plan.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Która z tych decyzji jest najbardziej architektoniczna?',
            en: 'Which of these is the most architectural decision?'
          },
          options: [
            { pl: 'Nazwa folderu w jednej aplikacji', en: 'A folder name inside one app' },
            { pl: 'Kolor hovera na przycisku drugorzędnym', en: 'The hover colour of a secondary button' },
            { pl: 'Format kontraktu tokenów używanego przez wszystkie aplikacje', en: 'The token contract format used by every app' },
            { pl: 'Treść komunikatu o błędzie w formularzu', en: 'The wording of a form error message' }
          ],
          correct: 2,
          explain: {
            pl: 'Kontrakt tokenów dotyka wszystkich konsumentów naraz, więc jego zmiana to migracja, a nie poprawka. Reszta jest lokalna i tania w cofnięciu.',
            en: 'The token contract touches every consumer at once, so changing it is a migration, not a fix. The rest is local and cheap to reverse.'
          }
        },
        {
          q: {
            pl: 'Co najlepiej opisuje "złotą ścieżkę" (golden path) w architekturze?',
            en: 'What best describes a golden path in architecture?'
          },
          options: [
            { pl: 'Domyślna, wygodna droga jest jednocześnie drogą zgodną ze standardem', en: 'The default, convenient route is also the compliant one' },
            { pl: 'Lista zakazów w dokumencie na wiki', en: 'A list of prohibitions on a wiki page' },
            { pl: 'Obowiązkowe review architekta przy każdym PR', en: 'A mandatory architect review on every PR' },
            { pl: 'Jeden framework dla całej firmy, bez wyjątków', en: 'One framework company-wide, no exceptions' }
          ],
          correct: 0,
          explain: {
            pl: 'Złota ścieżka wygrywa przez wygodę: generatory, szablony i domyślne konfiguracje. Zakazy i bramki skalują się gorzej niż dobre domyślne wartości.',
            en: 'A golden path wins through convenience: generators, templates and defaults. Prohibitions and gates scale worse than good defaults.'
          }
        },
        {
          q: {
            pl: 'Proponujesz zmianę propsa w komponencie używanym przez 40 aplikacji. Co powinno być pierwszą liczbą w propozycji?',
            en: 'You propose renaming a prop on a component used by 40 apps. What number belongs first in the proposal?'
          },
          options: [
            { pl: 'Liczba linii kodu w samym komponencie', en: 'The line count of the component itself' },
            { pl: 'Pokrycie testami paczki design systemu', en: 'Test coverage of the design system package' },
            { pl: 'Liczba gwiazdek repozytorium wewnętrznego', en: 'Internal repository star count' },
            { pl: 'Zasięg zmiany: ilu konsumentów i ile czasu do pełnej adopcji', en: 'Blast radius: how many consumers and how long to full adoption' }
          ],
          correct: 3,
          explain: {
            pl: 'Zasięg zmiany i czas adopcji decydują o kosztach organizacyjnych. Najwolniejszy zespół wyznacza tempo, więc to on definiuje harmonogram.',
            en: 'Blast radius and adoption time drive the organisational cost. The slowest team sets the pace, so it defines the timeline.'
          }
        },
        {
          q: {
            pl: 'Zespół zgodził się nie importować wewnętrznych plików design systemu, ale po trzech miesiącach w kodzie jest 60 takich importów. Co jest właściwą reakcją architekta?',
            en: 'A team agreed not to deep-import design system internals, yet three months later there are 60 such imports. What is the right architect response?'
          },
          options: [
            { pl: 'Przypomnieć o ustaleniach na najbliższym spotkaniu gildii', en: 'Remind everyone of the agreement at the next guild meeting' },
            { pl: 'Dodać regułę lintera i codemod, a brakujące API dopisać do publicznego wejścia', en: 'Add a lint rule plus a codemod, and add the missing API to the public entry point' },
            { pl: 'Zablokować wszystkie PR-y tych zespołów do czasu naprawy', en: 'Block all PRs from those teams until it is fixed' },
            { pl: 'Uznać, że skoro tak robią, to reguła była zbędna', en: 'Conclude the rule was pointless since nobody follows it' }
          ],
          correct: 1,
          explain: {
            pl: '60 obejść to sygnał, że publiczne API było niewystarczające. Naprawiasz przyczynę (brakujące API), a zasadę egzekwujesz automatem, nie apelem.',
            en: '60 workarounds signal that the public API was insufficient. Fix the cause by adding the missing API, then enforce the rule with automation, not appeals.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'boundaries-coupling-cohesion',
      title: {
        pl: 'Granice, sprzężenie i spójność',
        en: 'Boundaries, coupling and cohesion'
      },
      minutes: 12,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="160" y="28" text-anchor="middle" font-size="15" fill="var(--err)">High coupling</text>' +
          '<circle cx="80" cy="90" r="26" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="240" cy="90" r="26" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="80" cy="220" r="26" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="240" cy="220" r="26" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="106" y1="90" x2="214" y2="90" stroke="var(--err)" stroke-width="2"/>' +
          '<line x1="80" y1="116" x2="80" y2="194" stroke="var(--err)" stroke-width="2"/>' +
          '<line x1="240" y1="116" x2="240" y2="194" stroke="var(--err)" stroke-width="2"/>' +
          '<line x1="106" y1="220" x2="214" y2="220" stroke="var(--err)" stroke-width="2"/>' +
          '<line x1="99" y1="109" x2="221" y2="201" stroke="var(--err)" stroke-width="2"/>' +
          '<line x1="221" y1="109" x2="99" y2="201" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="160" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">every change touches everything</text>' +
          '<line x1="320" y1="40" x2="320" y2="300" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="28" text-anchor="middle" font-size="15" fill="var(--ok)">High cohesion</text>' +
          '<rect x="366" y="56" width="230" height="90" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="481" y="82" text-anchor="middle" font-size="13" fill="var(--text)">checkout module</text>' +
          '<circle cx="420" cy="112" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="481" cy="112" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="542" cy="112" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="366" y="186" width="230" height="90" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="481" y="212" text-anchor="middle" font-size="13" fill="var(--text)">billing module</text>' +
          '<circle cx="420" cy="242" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="481" cy="242" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<circle cx="542" cy="242" r="16" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="481" y1="146" x2="481" y2="186" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="500" y="172" font-size="13" fill="var(--accent)">one contract</text>' +
          '<rect x="24" y="322" width="592" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="348" text-anchor="middle" font-size="14" fill="var(--text)">A boundary is a promise about what may cross it</text>' +
          '<text x="320" y="370" text-anchor="middle" font-size="13" fill="var(--muted)">public entry point, versioned API, one direction of dependency</text>' +
          '</svg>',
        caption: {
          pl: 'Po lewej wszystko zależy od wszystkiego, po prawej moduły są spójne w środku i łączą się jednym kontraktem.',
          en: 'On the left everything depends on everything; on the right modules are cohesive inside and meet through a single contract.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Zasięg jednej zmiany tokena - przewiń krok po kroku i zobacz, co robi z nim brak granicy, a co dobrze postawiony punkt wejścia.',
          en: 'The blast radius of one token change - step through it and see what a missing boundary does, and what a real entry point does.'
        },
        frames: [
          {
            svg: frameBlast(0, 'One token changes inside the design system'),
            label: { pl: 'Jedna mała zmiana', en: 'One small change' },
            note: {
              pl: 'Projektantka prosi o zmianę odstępu z 8 na 12 pikseli. W kodzie to jedna linia w pliku tokenów.',
              en: 'A designer asks to change one spacing step from 8 to 12 pixels. In code that is a single line in the token file.'
            }
          },
          {
            svg: frameBlast(1, 'Everything downstream rebuilds and needs retesting'),
            label: { pl: 'Fala w dół', en: 'The ripple' },
            note: {
              pl: 'Wszyscy konsumenci muszą przebudować i przetestować wizualnie. Jedna linia zamienia się w trzy kolejki review i trzy okna wdrożeniowe.',
              en: 'Every consumer rebuilds and needs a visual pass. One line becomes three review queues and three deploy windows.'
            }
          },
          {
            svg: frameBlast(2, 'Two apps reach past the entry point'),
            label: { pl: 'Głębokie importy', en: 'Deep imports' },
            note: {
              pl: 'Dwie aplikacje importują pliki wewnętrzne, bo brakowało im czegoś w publicznym API. Teraz twoje "prywatne" pliki są de facto publiczne.',
              en: 'Two apps import internal files because the public API lacked something. Your private files are now a de facto public API.'
            }
          },
          {
            svg: frameBlast(3, 'Boundary restored: exports map plus a lint rule'),
            label: { pl: 'Granica wraca', en: 'Boundary restored' },
            note: {
              pl: 'Pole exports w package.json plus reguła dependency-cruiser odcinają skróty. Brakujące API dopisujesz do punktu wejścia, żeby nikt nie musiał kombinować.',
              en: 'An exports map in package.json plus a dependency-cruiser rule cut the shortcuts. You add the missing API to the entry point so nobody needs a workaround.'
            }
          },
          {
            svg: frameBlast(4, 'Blast radius is now a version bump, not an archaeology dig'),
            label: { pl: 'Zasięg pod kontrolą', en: 'Blast radius under control' },
            note: {
              pl: 'Zmiana wychodzi jako wersja minor, aplikacje przyjmują ją w swoim tempie, a ty wiesz dokładnie, kto jest na jakiej wersji.',
              en: 'The change ships as a minor version, apps adopt it at their own pace, and you know exactly who is on which version.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Mieszkanie bez ścian wygląda przestronnie, dopóki ktoś nie włączy miksera o siódmej rano. Ściany nie są po to, żeby utrudniać życie. Są po to, żeby hałas z kuchni nie budził wszystkich.</p>' +
            '<p>W kodzie jest tak samo. Jeśli każdy plik może sięgnąć do każdego innego, to jedna drobna poprawka budzi całą aplikację: nagle trzeba sprawdzić dwadzieścia miejsc, bo kto wie, kto to podglądał.</p>' +
            '<p>Ściana w kodzie to umowa: "wchodzicie tymi drzwiami, a nie przez okno w łazience". Drzwi mogą być szerokie i wygodne - ale jedne. Wtedy możesz przestawić meble w środku i nikt tego nie zauważy.</p>' +
            '<p>A spójność? To po prostu trzymanie rzeczy z jednej rodziny w jednym pokoju. Talerze w kuchni, skarpetki w sypialni. Nudne, ale kiedy czegoś szukasz o drugiej w nocy, ratuje życie.</p>',
          en: '<p>A flat with no interior walls looks wonderfully spacious, right up until somebody switches on a blender at seven in the morning. Walls are not there to make life harder. They are there so noise from the kitchen does not wake the whole household.</p>' +
            '<p>Code works the same way. If any file can reach into any other file, one tiny fix wakes up the entire application: suddenly you have to check twenty places, because who knows who was peeking.</p>' +
            '<p>A wall in code is an agreement: you come in through this door, not through the bathroom window. The door can be wide and comfortable - but there is only one. Then you can move the furniture around inside and nobody notices.</p>' +
            '<p>And cohesion? That is just keeping things from the same family in the same room. Plates in the kitchen, socks in the bedroom. Boring, but it saves your life when you are looking for something at two in the morning.</p>'
        },
        school: {
          pl: '<p>Dwa pojęcia, jedna intuicja. <strong>Sprzężenie</strong> (coupling) mówi, jak bardzo moduły zależą od siebie. <strong>Spójność</strong> (cohesion) mówi, jak bardzo rzeczy w jednym module należą do siebie. Chcesz niskiego sprzężenia i wysokiej spójności - i praktycznie nigdy odwrotnie.</p>' +
            '<p>Typowe źródła nadmiernego sprzężenia we frontendzie:</p>' +
            '<ul>' +
            '<li>paczka <code>utils</code>, do której trafia wszystko, więc importuje ją każdy plik w repo;</li>' +
            '<li>importy głębokie w rodzaju <code>@ds/components/src/button/internal/styles</code>;</li>' +
            '<li>współdzielony globalny store, w którym dwa moduły czytają te same pola;</li>' +
            '<li>barrel file (<code>index.ts</code> reeksportujący wszystko), który przy okazji psuje tree-shaking.</li>' +
            '</ul>' +
            '<p>Granica to nie folder. Granica to <em>punkt wejścia plus obietnica</em>. W praktyce zapisujesz ją w <code>package.json</code>:</p>' +
            '<pre><code>{\n  "exports": {\n    ".": "./dist/index.js",\n    "./styles.css": "./dist/styles.css"\n  }\n}</code></pre>' +
            '<p>Od tej chwili wszystko poza tymi ścieżkami jest wewnętrzne i możesz to zmieniać bez pytania nikogo o zdanie. To jest cała nagroda za postawienie granicy: <strong>swoboda w środku</strong>.</p>' +
            '<p>Dobry test: jeśli nie potrafisz opisać modułu jednym zdaniem bez słowa "i", jego spójność jest za niska i prawdopodobnie powinien być dwoma modułami.</p>' +
            '<p>Drugi test, jeszcze prostszy: spróbuj usunąć moduł z repozytorium. Jeśli psuje się dziesięć niepowiązanych miejsc, sprzężenie jest za wysokie. Jeśli psuje się jeden obszar - granica jest dobrze postawiona.</p>' +
            '<p>Warto też pamiętać, że granice mają swoją cenę. Każda paczka to konfiguracja, wersja, publikacja i osobne testy. Dlatego nie stawiaj ich profilaktycznie. Stawiaj je tam, gdzie realnie boli: na styku zespołów, wokół rzeczy zmienianych bardzo często i wokół rzeczy, których nie wolno zmieniać bez zapowiedzi.</p>',
          en: '<p>Two terms, one intuition. <strong>Coupling</strong> is how much modules depend on each other. <strong>Cohesion</strong> is how much the things inside one module belong together. You want low coupling and high cohesion, essentially never the reverse.</p>' +
            '<p>Classic sources of excess coupling on the frontend:</p>' +
            '<ul>' +
            '<li>a <code>utils</code> package that collects everything and therefore gets imported by every file in the repo;</li>' +
            '<li>deep imports such as <code>@ds/components/src/button/internal/styles</code>;</li>' +
            '<li>a shared global store where two modules read the same fields;</li>' +
            '<li>a barrel file (<code>index.ts</code> re-exporting everything), which also quietly ruins tree-shaking.</li>' +
            '</ul>' +
            '<p>A boundary is not a folder. A boundary is <em>an entry point plus a promise</em>. In practice you write it down in <code>package.json</code>:</p>' +
            '<pre><code>{\n  "exports": {\n    ".": "./dist/index.js",\n    "./styles.css": "./dist/styles.css"\n  }\n}</code></pre>' +
            '<p>From that moment everything outside those paths is internal and you may change it without asking anyone. That is the whole reward for drawing a boundary: <strong>freedom on the inside</strong>.</p>' +
            '<p>A good test: if you cannot describe a module in one sentence without the word "and", its cohesion is too low and it is probably two modules.</p>' +
            '<p>A second, even simpler test: try deleting the module from the repository. If ten unrelated places break, coupling is too high. If one area breaks, the boundary sits in the right place.</p>' +
            '<p>Remember that boundaries also cost something. Every package means configuration, a version, a publish step and its own test setup. So do not draw them preventively. Draw them where it actually hurts: at the seams between teams, around the things that change very often, and around the things nobody may change without warning.</p>'
        },
        pro: {
          pl: '<p>Traktuj graf zależności jako artefakt architektury, a nie jako efekt uboczny. Dwie liczby warto mierzyć na paczkę: <strong>fan-in</strong> (ilu konsumentów) i <strong>fan-out</strong> (od ilu paczek zależy). Wysoki fan-in oznacza, że każda zmiana jest droga; wysoki fan-out oznacza, że jesteś kruchy na cudze zmiany. Paczka z wysokim jednym i drugim to Twoje ryzyko numer jeden.</p>' +
            '<h4>Egzekwowanie granic</h4>' +
            '<ul>' +
            '<li><strong>Nx tags</strong> - <code>scope:shop</code>, <code>type:feature</code>, <code>type:ui</code> plus reguła <code>enforce-module-boundaries</code>: feature może zależeć od ui, nigdy odwrotnie.</li>' +
            '<li><strong>dependency-cruiser</strong> - reguły cykliczności i zakaz importów głębokich, wynik w formie grafu w CI.</li>' +
            '<li><strong>exports map</strong> - Node egzekwuje ją w runtime, TypeScript przy <code>moduleResolution: bundler</code>; to najtwardsza granica, jaką masz za darmo.</li>' +
            '<li><strong>CODEOWNERS</strong> - granica społeczna: kto musi zaakceptować zmianę w publicznym API.</li>' +
            '</ul>' +
            '<h4>Sprzężenie, którego nie widać w importach</h4>' +
            '<p>Najgorsze zależności nie są w <code>import</code>. To współdzielone selektory CSS i kolejność ładowania arkuszy, globalne z-index, klucze w localStorage, nazwy zdarzeń analitycznych, kształt odpowiedzi API oraz założenia o DOM (np. test e2e szukający <code>.btn-primary</code>). W design systemie klasa CSS jest publicznym API, nawet jeśli nigdzie tego nie napisałeś. Dlatego warto mieć prefiks (<code>chi-</code>) i traktować jego zmianę jak major.</p>' +
            '<pre><code>// nx.json / project.json tag check\n{ "sourceTag": "type:ui",\n  "onlyDependOnLibsWithTags": ["type:ui", "type:tokens"] }</code></pre>' +
            '<h4>Realia skali</h4>' +
            '<p>W monorepo z 40 aplikacjami usunięcie jednego cyklu zależności potrafi skrócić graf zadań Nx i ściąć czas CI o kilkanaście procent, bo cache trafia częściej. To argument, który przechodzi u menedżera lepiej niż czystość projektu: minuty CI mają cenę.</p>' +
            '<h4>Pułapki</h4>' +
            '<p>Po pierwsze, granice postawione za wcześnie kosztują tyle samo co ich brak - trzy paczki dla jednej funkcji to podatek bez korzyści. Po drugie, granica bez wersjonowania jest iluzją: jeśli wszyscy i tak siedzą na <code>main</code>, "publiczne API" to tylko nazwa folderu. Po trzecie, gdy ludzie obchodzą granicę, przyczyną prawie zawsze jest brakująca funkcja w publicznym API, a nie zła wola.</p>',
          en: '<p>Treat the dependency graph as an architecture artefact, not a side effect. Two numbers per package are worth tracking: <strong>fan-in</strong> (how many consumers) and <strong>fan-out</strong> (how many packages it depends on). High fan-in means every change is expensive; high fan-out means you are fragile to other people changes. A package high in both is your number one risk.</p>' +
            '<h4>Enforcing boundaries</h4>' +
            '<ul>' +
            '<li><strong>Nx tags</strong> - <code>scope:shop</code>, <code>type:feature</code>, <code>type:ui</code> plus the <code>enforce-module-boundaries</code> rule: feature may depend on ui, never the other way round.</li>' +
            '<li><strong>dependency-cruiser</strong> - cycle rules and a deep-import ban, with a graph rendered in CI.</li>' +
            '<li><strong>exports map</strong> - enforced by Node at runtime and by TypeScript under <code>moduleResolution: bundler</code>; the hardest boundary you get for free.</li>' +
            '<li><strong>CODEOWNERS</strong> - the social boundary: who must approve a change to the public API.</li>' +
            '</ul>' +
            '<h4>Coupling that never shows up in imports</h4>' +
            '<p>The nastiest dependencies are not <code>import</code> statements. They are shared CSS selectors and stylesheet order, global z-index values, localStorage keys, analytics event names, API response shapes, and DOM assumptions such as an e2e test querying <code>.btn-primary</code>. In a design system a CSS class is public API whether you documented it or not. Hence a prefix such as <code>chi-</code>, and treating a rename as a major version.</p>' +
            '<pre><code>// nx.json / project.json tag check\n{ "sourceTag": "type:ui",\n  "onlyDependOnLibsWithTags": ["type:ui", "type:tokens"] }</code></pre>' +
            '<h4>What scale looks like</h4>' +
            '<p>In a monorepo with 40 apps, removing a single dependency cycle can shrink the Nx task graph and cut CI wall time by low double-digit percentages, because the cache hits more often. That argument lands with a manager better than design purity does: CI minutes have a price.</p>' +
            '<h4>Pitfalls</h4>' +
            '<p>First, boundaries drawn too early cost as much as no boundaries - three packages for one feature is a tax with no benefit. Second, a boundary without versioning is theatre: if everyone is on <code>main</code> anyway, "public API" is just a folder name. Third, when people route around a boundary the cause is almost always a missing capability in the public API, not bad faith.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co oznacza wysoka spójność (cohesion) modułu?',
            en: 'What does high cohesion in a module mean?'
          },
          options: [
            { pl: 'Moduł ma jak najwięcej eksportów', en: 'The module exports as much as possible' },
            { pl: 'Rzeczy w środku modułu dotyczą jednej odpowiedzialności', en: 'The things inside the module serve one responsibility' },
            { pl: 'Moduł nie ma żadnych zależności', en: 'The module has zero dependencies' },
            { pl: 'Moduł jest importowany przez wiele aplikacji', en: 'The module is imported by many apps' }
          ],
          correct: 1,
          explain: {
            pl: 'Spójność dotyczy wnętrza modułu: czy jego elementy należą do siebie. Liczba eksportów czy konsumentów to inna oś (sprzężenie i fan-in).',
            en: 'Cohesion is about the inside of a module: whether its parts belong together. Export count and consumer count are a different axis (coupling and fan-in).'
          }
        },
        {
          q: {
            pl: 'Jaki jest największy praktyczny zysk z ustanowienia twardego punktu wejścia do paczki?',
            en: 'What is the biggest practical payoff of a hard public entry point for a package?'
          },
          options: [
            { pl: 'Mniejszy rozmiar bundle po stronie konsumenta', en: 'A smaller bundle on the consumer side' },
            { pl: 'Szybsze uruchamianie testów jednostkowych', en: 'Faster unit test startup' },
            { pl: 'Swoboda zmiany wszystkiego, co jest wewnątrz', en: 'Freedom to change everything on the inside' },
            { pl: 'Automatyczne generowanie dokumentacji', en: 'Automatic documentation generation' }
          ],
          correct: 2,
          explain: {
            pl: 'Granica kupuje ci prawo do refaktoru wnętrza bez negocjacji z konsumentami. Efekty na bundle czy dokumentację bywają, ale są wtórne.',
            en: 'A boundary buys you the right to refactor internals without negotiating with consumers. Bundle or docs effects may follow, but they are secondary.'
          }
        },
        {
          q: {
            pl: 'Które z poniższych jest sprzężeniem, którego NIE zobaczysz w grafie importów?',
            en: 'Which of these is coupling you will NOT see in the import graph?'
          },
          options: [
            { pl: 'Test e2e opierający się na klasie CSS .btn-primary', en: 'An e2e test relying on the CSS class .btn-primary' },
            { pl: 'Import z paczki @ds/components', en: 'An import from @ds/components' },
            { pl: 'Zależność w package.json', en: 'A dependency listed in package.json' },
            { pl: 'Re-eksport w pliku index.ts', en: 'A re-export in index.ts' }
          ],
          correct: 0,
          explain: {
            pl: 'Selektory CSS, klucze storage i nazwy zdarzeń tworzą realne zależności niewidoczne dla narzędzi analizujących importy. Dlatego zmiana prefiksu klas to breaking change.',
            en: 'CSS selectors, storage keys and event names create real dependencies invisible to import-based tooling. That is why renaming a class prefix is a breaking change.'
          }
        },
        {
          q: {
            pl: 'Twoja paczka ma bardzo wysoki fan-in i wysoki fan-out. Co to znaczy w praktyce?',
            en: 'Your package has very high fan-in and high fan-out. What does that mean in practice?'
          },
          options: [
            { pl: 'Jest dobrze zaprojektowana, skoro wszyscy jej używają', en: 'It is well designed, since everyone uses it' },
            { pl: 'Powinna zostać scalona z aplikacją, która używa jej najczęściej', en: 'It should be merged into the app that uses it most' },
            { pl: 'Wystarczy podnieść pokrycie testami do 90 procent', en: 'Raising test coverage to 90 percent is enough' },
            { pl: 'Jest jednocześnie droga w zmianie i krucha na cudze zmiany - to twoje główne ryzyko', en: 'It is both expensive to change and fragile to other changes - your top risk' }
          ],
          correct: 3,
          explain: {
            pl: 'Wysoki fan-in czyni każdą zmianę migracją, a wysoki fan-out sprawia, że psuje ją cudza zmiana. Zwykle taką paczkę trzeba rozbić na stabilny rdzeń i część zmienną.',
            en: 'High fan-in makes every change a migration; high fan-out means other people break you. Usually such a package needs splitting into a stable core and a volatile part.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'adrs-and-rfcs',
      title: {
        pl: 'ADR-y i RFC: decyzje na piśmie',
        en: 'ADRs and RFCs: decisions in writing'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="adr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="15" fill="var(--text)">RFC opens the debate, ADR closes it</text>' +
          '<rect x="24" y="48" width="270" height="118" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="159" y="74" text-anchor="middle" font-size="14" fill="var(--accent2)">RFC (before)</text>' +
          '<text x="44" y="100" font-size="13" fill="var(--muted)">problem and constraints</text>' +
          '<text x="44" y="124" font-size="13" fill="var(--muted)">2 to 4 options, open comments</text>' +
          '<text x="44" y="148" font-size="13" fill="var(--muted)">timebox: 5 to 10 working days</text>' +
          '<line x1="294" y1="107" x2="344" y2="107" stroke="var(--accent)" stroke-width="2" marker-end="url(#adr1)"/>' +
          '<rect x="348" y="48" width="270" height="118" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="483" y="74" text-anchor="middle" font-size="14" fill="var(--accent)">ADR (after)</text>' +
          '<text x="368" y="100" font-size="13" fill="var(--muted)">context, decision, status</text>' +
          '<text x="368" y="124" font-size="13" fill="var(--muted)">consequences, good and bad</text>' +
          '<text x="368" y="148" font-size="13" fill="var(--muted)">one file in docs/adr, immutable</text>' +
          '<text x="320" y="204" text-anchor="middle" font-size="14" fill="var(--muted)">Status is the only field that moves</text>' +
          '<rect x="40" y="220" width="150" height="52" rx="12" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/>' +
          '<text x="115" y="252" text-anchor="middle" font-size="14" fill="var(--muted)">Proposed</text>' +
          '<line x1="190" y1="246" x2="240" y2="246" stroke="var(--accent)" stroke-width="2" marker-end="url(#adr1)"/>' +
          '<rect x="244" y="220" width="150" height="52" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="319" y="252" text-anchor="middle" font-size="14" fill="var(--ok)">Accepted</text>' +
          '<line x1="394" y1="246" x2="444" y2="246" stroke="var(--accent)" stroke-width="2" marker-end="url(#adr1)"/>' +
          '<rect x="448" y="220" width="150" height="52" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="523" y="252" text-anchor="middle" font-size="14" fill="var(--warn)">Superseded</text>' +
          '<rect x="24" y="304" width="592" height="72" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="332" text-anchor="middle" font-size="14" fill="var(--text)">Never edit an accepted ADR - write the next one and link back</text>' +
          '<text x="320" y="356" text-anchor="middle" font-size="13" fill="var(--muted)">the value is the trail, not the latest page</text>' +
          '</svg>',
        caption: {
          pl: 'RFC to dyskusja przed decyzją, ADR to zapis po niej; zmienia się tylko status, a nowa decyzja zastępuje starą osobnym plikiem.',
          en: 'An RFC is the debate before the decision, an ADR the record after it; only the status moves, and a new decision supersedes the old one in its own file.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Przestawiliście z żoną szafę pod inną ścianę, bo o siódmej rano słońce świeciło prosto w lustro. Rok później wprowadza się szwagier, patrzy i mówi: "przecież szafa powinna stać tam" - i przestawia z powrotem. Za tydzień znowu wszyscy są oślepieni.</p>' +
            '<p>Gdyby ktoś nakleił na szafie karteczkę: "stoi tu z powodu słońca, próbowaliśmy inaczej, było gorzej" - szwagier by jej nie ruszył.</p>' +
            '<p>Tym jest ADR: karteczka na szafie. Krótka notatka, dlaczego coś jest tak, jak jest, co jeszcze rozważaliśmy i z czym musimy teraz żyć. Nie po to, żeby mieć rację. Po to, żeby za rok nikt nie musiał zgadywać.</p>' +
            '<p>A RFC to rozmowa przed przestawieniem szafy. Najpierw pytasz domowników, potem przesuwasz - nie odwrotnie.</p>',
          en: '<p>You and your partner moved the wardrobe to the other wall, because at seven in the morning the sun hit the mirror straight in your eyes. A year later a relative moves in, looks around and says "obviously the wardrobe belongs over there" - and moves it back. A week later everyone is blinded again.</p>' +
            '<p>If somebody had stuck a note on the wardrobe saying "it stands here because of the sun, we tried the other wall, it was worse", the relative would have left it alone.</p>' +
            '<p>That is an ADR: the note on the wardrobe. A short record of why something is the way it is, what else you considered, and what you now have to live with. Not to prove you were right. So that in a year nobody has to guess.</p>' +
            '<p>An RFC is the conversation before moving the wardrobe. You ask the household first, then you push - not the other way round.</p>'
        },
        school: {
          pl: '<p><strong>ADR</strong> (Architecture Decision Record - zapis decyzji architektonicznej) to krótki plik w repozytorium, opisujący jedną decyzję. Najpopularniejszy szablon to MADR i ma cztery sekcje:</p>' +
            '<ol>' +
            '<li><strong>Kontekst</strong> - jaki problem i jakie ograniczenia (termin, zespoły, przeglądarki, budżet).</li>' +
            '<li><strong>Decyzja</strong> - co wybieramy, jednym zdaniem w trybie oznajmującym.</li>' +
            '<li><strong>Status</strong> - Proposed, Accepted, Deprecated, Superseded by ADR-0021.</li>' +
            '<li><strong>Konsekwencje</strong> - co zyskujemy, co tracimy, co teraz jest trudniejsze.</li>' +
            '</ol>' +
            '<p><strong>RFC</strong> (Request for Comments) to etap wcześniejszy: propozycja z kilkoma wariantami, wystawiona na komentarze na określony czas. RFC otwiera dyskusję, ADR ją zamyka i zostaje jako ślad.</p>' +
            '<p>Kluczowe zasady praktyczne:</p>' +
            '<ul>' +
            '<li>ADR trzymaj w repo, w <code>docs/adr/0014-css-variables-for-theming.md</code>, a nie na wiki - żyje wtedy razem z kodem i przechodzi przez code review.</li>' +
            '<li>Zaakceptowanego ADR-a się nie edytuje. Zmieniłeś zdanie? Piszesz nowy i ustawiasz w starym status Superseded z linkiem.</li>' +
            '<li>Jedna decyzja to jeden plik, najlepiej poniżej dwóch stron. Dłuższe nikt nie przeczyta.</li>' +
            '<li>Sekcja o odrzuconych opcjach jest najcenniejsza. To ona ratuje ci kwartał, gdy ktoś proponuje wariant, który już przetestowaliście.</li>' +
            '</ul>' +
            '<p>Największa korzyść jest ludzka: nowa osoba w zespole czyta dwadzieścia ADR-ów i po dwóch godzinach rozumie, dlaczego kod wygląda tak, jak wygląda.</p>' +
            '<p>Kiedy pisać ADR-a? Prosty próg: gdy decyzja dotyczy więcej niż jednego zespołu albo jej cofnięcie zajęłoby więcej niż tydzień. Wyboru biblioteki do formatowania dat w jednej aplikacji nie zapisujesz. Wyboru sposobu motywowania komponentów dla wszystkich aplikacji - owszem.</p>' +
            '<p>I jeszcze jedna korzyść, mniej oczywista: samo pisanie zmusza do uporządkowania myśli. Bardzo często dopiero przy sekcji o konsekwencjach okazuje się, że wybrany wariant jest gorszy, niż wydawał się na tablicy.</p>',
          en: '<p>An <strong>ADR</strong> (Architecture Decision Record) is a short file in the repository describing exactly one decision. The most common template, MADR, has four sections:</p>' +
            '<ol>' +
            '<li><strong>Context</strong> - the problem and the constraints (deadline, teams, browsers, budget).</li>' +
            '<li><strong>Decision</strong> - what we choose, one sentence, in the present tense.</li>' +
            '<li><strong>Status</strong> - Proposed, Accepted, Deprecated, Superseded by ADR-0021.</li>' +
            '<li><strong>Consequences</strong> - what we gain, what we give up, what becomes harder.</li>' +
            '</ol>' +
            '<p>An <strong>RFC</strong> (Request for Comments) is the earlier stage: a proposal with several options, opened for comment for a fixed period. The RFC opens the debate, the ADR closes it and stays as the record.</p>' +
            '<p>Practical rules that matter:</p>' +
            '<ul>' +
            '<li>Keep ADRs in the repo, at <code>docs/adr/0014-css-variables-for-theming.md</code>, not on a wiki - then they live with the code and go through code review.</li>' +
            '<li>Never edit an accepted ADR. Changed your mind? Write a new one and mark the old one Superseded with a link.</li>' +
            '<li>One decision per file, ideally under two pages. Nobody reads longer ones.</li>' +
            '<li>The rejected-options section is the most valuable part. It saves you a quarter when someone proposes an option you already tested.</li>' +
            '</ul>' +
            '<p>The biggest payoff is human: a new joiner reads twenty ADRs and after two hours understands why the code looks the way it does.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principal pisanie jest dźwignią. Nie przepchniesz decyzji w ośmiu zespołach obecnością na spotkaniach - przepchniesz ją dokumentem, który ludzie mogą przeczytać w swoim czasie i skomentować bez konfrontacji.</p>' +
            '<h4>Proces, który działa w dużej organizacji</h4>' +
            '<ol>' +
            '<li>RFC jako pull request z jednym plikiem markdown. Komentarze idą do wątków w kodzie, a nie giną w czacie.</li>' +
            '<li>Timebox: 5-10 dni roboczych, jawnie zapisany w nagłówku. Po terminie obowiązuje "brak sprzeciwu to zgoda" (lazy consensus).</li>' +
            '<li>Jawnie wymienieni recenzenci: po jednej osobie z każdego dotkniętego zespołu plus właściciel obszaru. Bez tego dostaniesz zero komentarzy i sto pytań po wdrożeniu.</li>' +
            '<li>Merge RFC oznacza akceptację, a z niego rodzi się ADR o kolejnym numerze. Narzędzia: <code>adr-tools</code>, log4brains do publikowania, albo katalog Backstage z linkami z komponentów do decyzji.</li>' +
            '<li>Nie zgadzasz się, ale decyzja zapadła? "Disagree and commit" zapisane w ADR-ze jako odnotowane zastrzeżenie. To realnie obniża koszt kolejnych rozmów.</li>' +
            '</ol>' +
            '<pre><code>---\nstatus: accepted\ndate: 2026-03-11\ndeciders: [ds-team, shop, care]\nsupersedes: ADR-0009\n---\n# 0014 - Theming via CSS custom properties\n## Context ...\n## Decision ...\n## Consequences ...</code></pre>' +
            '<h4>Metryki i utrzymanie</h4>' +
            '<p>Zdrowy zestaw dla dużego frontendu to 20-40 aktywnych ADR-ów; 200 oznacza, że zapisujesz zbyt drobne rzeczy, a 3 - że decyzje zapadają w kuluarach. Warto zrobić przegląd raz na kwartał i przestawić nieaktualne na Deprecated. Linkuj identyfikator ADR-a w komentarzu przy nieoczywistym kodzie oraz w opisie reguły lintera - dzięki temu ograniczenie i jego uzasadnienie są o jedno kliknięcie od siebie.</p>' +
            '<h4>Antywzorce</h4>' +
            '<p>ADR pisany po fakcie, żeby usprawiedliwić to, co już wdrożono. ADR bez sekcji konsekwencji (czyli marketing, nie decyzja). ADR jako pełny design doc na dwadzieścia stron. Wreszcie ADR bez daty i bez ludzi - za rok nikt nie wie, czy to obowiązuje. W rozmowie na principala opowieść o decyzji, którą <em>odwróciłeś</em> po dwóch kwartałach, i o tym, jak ADR ułatwił to odwrócenie, wypada lepiej niż lista trafnych wyborów.</p>',
          en: '<p>At principal level, writing is leverage. You will not land a decision across eight teams by attending meetings; you land it with a document people can read on their own time and comment on without confrontation.</p>' +
            '<h4>A process that survives a large organisation</h4>' +
            '<ol>' +
            '<li>RFC as a pull request containing a single markdown file. Comments live in code threads instead of evaporating in chat.</li>' +
            '<li>A timebox of 5-10 working days, stated in the header. After it, lazy consensus applies: no objection means agreement.</li>' +
            '<li>Named reviewers: one person per affected team plus the area owner. Without that you get zero comments and a hundred questions after rollout.</li>' +
            '<li>Merging the RFC means acceptance, and it produces an ADR with the next number. Tooling: <code>adr-tools</code>, log4brains for publishing, or a Backstage catalogue linking components to decisions.</li>' +
            '<li>Disagree but outvoted? Record "disagree and commit" in the ADR as a noted reservation. It measurably lowers the cost of the next conversation.</li>' +
            '</ol>' +
            '<pre><code>---\nstatus: accepted\ndate: 2026-03-11\ndeciders: [ds-team, shop, care]\nsupersedes: ADR-0009\n---\n# 0014 - Theming via CSS custom properties\n## Context ...\n## Decision ...\n## Consequences ...</code></pre>' +
            '<h4>Metrics and upkeep</h4>' +
            '<p>A healthy set for a large frontend is 20-40 active ADRs; 200 means you are recording trivia, and 3 means decisions happen in corridors. Review them quarterly and flip stale ones to Deprecated. Link the ADR id in a code comment next to non-obvious code and in the lint rule message, so the constraint and its rationale are one click apart.</p>' +
            '<h4>Anti-patterns</h4>' +
            '<p>The ADR written afterwards to justify what already shipped. The ADR with no consequences section, which is marketing rather than a decision. The ADR that is really a twenty-page design doc. And the ADR with no date and no people, so a year later nobody knows if it still holds. In a principal interview, a story about a decision you <em>reversed</em> two quarters later, and how the ADR made reversing it cheap, lands better than a list of correct calls.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co odróżnia RFC od ADR-a?',
            en: 'What distinguishes an RFC from an ADR?'
          },
          options: [
            { pl: 'RFC otwiera dyskusję przed decyzją, ADR zapisuje jej wynik', en: 'The RFC opens the debate before the decision, the ADR records the outcome' },
            { pl: 'RFC pisze architekt, ADR pisze menedżer', en: 'An architect writes the RFC, a manager writes the ADR' },
            { pl: 'RFC dotyczy backendu, ADR frontendu', en: 'RFCs are for backend, ADRs for frontend' },
            { pl: 'RFC jest tajny, ADR publiczny', en: 'RFCs are confidential, ADRs public' }
          ],
          correct: 0,
          explain: {
            pl: 'RFC zbiera opinie i warianty w wyznaczonym oknie czasowym, a ADR jest krótkim, trwałym zapisem tego, co ostatecznie wybrano i z jakimi konsekwencjami.',
            en: 'An RFC collects opinions and options within a timebox; an ADR is the short, durable record of what was chosen and with what consequences.'
          }
        },
        {
          q: {
            pl: 'Decyzja z ADR-0009 przestała obowiązywać. Co robisz?',
            en: 'The decision in ADR-0009 no longer holds. What do you do?'
          },
          options: [
            { pl: 'Usuwasz plik z repozytorium', en: 'Delete the file from the repository' },
            { pl: 'Edytujesz treść ADR-0009 na aktualną', en: 'Edit ADR-0009 to describe the new decision' },
            { pl: 'Piszesz nowy ADR i ustawiasz w ADR-0009 status Superseded z linkiem', en: 'Write a new ADR and set ADR-0009 to Superseded with a link' },
            { pl: 'Zostawiasz jak jest i ogłaszasz zmianę na Slacku', en: 'Leave it and announce the change on Slack' }
          ],
          correct: 2,
          explain: {
            pl: 'Wartością ADR-ów jest ślad decyzji w czasie. Edytowanie starych wpisów niszczy historię, a Slack znika po tygodniu.',
            en: 'The value of ADRs is the decision trail over time. Editing old entries destroys the history, and Slack disappears within a week.'
          }
        },
        {
          q: {
            pl: 'Która sekcja ADR-a najczęściej okazuje się najcenniejsza po roku?',
            en: 'Which ADR section most often proves the most valuable a year later?'
          },
          options: [
            { pl: 'Lista autorów', en: 'The list of authors' },
            { pl: 'Rozważone i odrzucone opcje wraz z powodami', en: 'The options considered and rejected, with reasons' },
            { pl: 'Data utworzenia', en: 'The creation date' },
            { pl: 'Numer w nazwie pliku', en: 'The number in the filename' }
          ],
          correct: 1,
          explain: {
            pl: 'Odrzucone opcje chronią przed powtarzaniem tych samych eksperymentów. Reszta jest przydatna, ale to ta sekcja oszczędza realny czas.',
            en: 'Rejected options prevent repeating the same experiments. The rest is useful, but this section is what actually saves time.'
          }
        },
        {
          q: {
            pl: 'Wystawiasz RFC dotyczące ośmiu zespołów i po tygodniu masz zero komentarzy. Najbardziej prawdopodobna przyczyna?',
            en: 'You publish an RFC affecting eight teams and after a week you have zero comments. Most likely cause?'
          },
          options: [
            { pl: 'Wszyscy się zgadzają, więc można wdrażać bez obaw', en: 'Everyone agrees, so it is safe to roll out' },
            { pl: 'Dokument jest zbyt krótki', en: 'The document is too short' },
            { pl: 'RFC nie sprawdzają się w dużych organizacjach', en: 'RFCs do not work in large organisations' },
            { pl: 'Nikt nie został imiennie wskazany jako recenzent i nie ma terminu', en: 'No named reviewers and no deadline' }
          ],
          correct: 3,
          explain: {
            pl: 'Bez imiennych recenzentów i jawnego timeboxa dokument jest dla wszystkich, czyli dla nikogo. Cisza to zwykle brak przeczytania, a nie zgoda - koszt wraca jako sto pytań po wdrożeniu.',
            en: 'Without named reviewers and an explicit timebox the document belongs to everyone, that is to nobody. Silence usually means unread, not agreed - the cost returns as a hundred questions after rollout.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'conways-law-team-topologies',
      title: {
        pl: 'Prawo Conwaya i topologie zespołów',
        en: 'Conway law and team topologies'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="cn1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
          '<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="15" fill="var(--text)">The architecture copies the communication graph</text>' +
          '<rect x="26" y="48" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="111" y="74" text-anchor="middle" font-size="14" fill="var(--text)">Team Shop</text>' +
          '<text x="111" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">talks daily</text>' +
          '<rect x="235" y="48" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="74" text-anchor="middle" font-size="14" fill="var(--text)">Team Care</text>' +
          '<text x="320" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">talks daily</text>' +
          '<rect x="444" y="48" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="529" y="74" text-anchor="middle" font-size="14" fill="var(--text)">Team Field</text>' +
          '<text x="529" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">different floor</text>' +
          '<line x1="196" y1="78" x2="229" y2="78" stroke="var(--ok)" stroke-width="2"/>' +
          '<line x1="405" y1="78" x2="438" y2="78" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 6"/>' +
          '<text x="111" y="150" text-anchor="middle" font-size="13" fill="var(--muted)">strong link</text>' +
          '<text x="529" y="150" text-anchor="middle" font-size="13" fill="var(--muted)">weak link</text>' +
          '<line x1="111" y1="160" x2="111" y2="204" stroke="var(--muted)" stroke-width="2" marker-end="url(#cn1)"/>' +
          '<line x1="320" y1="160" x2="320" y2="204" stroke="var(--muted)" stroke-width="2" marker-end="url(#cn1)"/>' +
          '<line x1="529" y1="160" x2="529" y2="204" stroke="var(--muted)" stroke-width="2" marker-end="url(#cn1)"/>' +
          '<rect x="26" y="212" width="379" height="72" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="215" y="240" text-anchor="middle" font-size="14" fill="var(--text)">one shared module, clean seam</text>' +
          '<text x="215" y="264" text-anchor="middle" font-size="13" fill="var(--muted)">Shop plus Care refactor together</text>' +
          '<rect x="444" y="212" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="529" y="240" text-anchor="middle" font-size="14" fill="var(--text)">its own copy</text>' +
          '<text x="529" y="264" text-anchor="middle" font-size="13" fill="var(--muted)">drifts every quarter</text>' +
          '<rect x="26" y="308" width="588" height="68" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="336" text-anchor="middle" font-size="14" fill="var(--text)">Want a different architecture? Change who talks to whom first</text>' +
          '<text x="320" y="358" text-anchor="middle" font-size="13" fill="var(--muted)">inverse Conway maneuver</text>' +
          '</svg>',
        caption: {
          pl: 'Szwy w systemie pojawiają się tam, gdzie kończy się codzienna komunikacja; słaby link między zespołami zawsze rodzi drugą kopię komponentu.',
          en: 'Seams appear exactly where daily communication stops; a weak link between teams reliably produces a second copy of the component.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Od trzech kopii Buttona do zespołu platformowego - jak zmiana układu zespołów przestawia architekturę.',
          en: 'From three copies of Button to a platform team - how changing the team layout rearranges the architecture.'
        },
        frames: [
          {
            svg: frameConway(0, 'Three teams, three private buttons'),
            label: { pl: 'Stan wyjściowy', en: 'Starting point' },
            note: {
              pl: 'Każdy zespół strumieniowy zbudował własny przycisk, bo nikt nie odpowiadał za część wspólną. Architektura wiernie odwzorowała organizację.',
              en: 'Each stream-aligned team built its own button, because nobody owned the shared part. The architecture faithfully mirrored the org chart.'
            }
          },
          {
            svg: frameConway(1, 'Same bug fixed three times, three different ways'),
            label: { pl: 'Koszt duplikacji', en: 'The cost of duplication' },
            note: {
              pl: 'Ten sam błąd focusa naprawiono trzy razy, w trzech miejscach, w różny sposób. Audyt dostępności zgłasza go i tak, bo jedna kopia została pominięta.',
              en: 'The same focus bug got fixed three times, three ways. The accessibility audit still flags it, because one copy was missed.'
            }
          },
          {
            svg: frameConway(2, 'A platform team owns the shared surface'),
            label: { pl: 'Zespół platformowy', en: 'Platform team' },
            note: {
              pl: 'Design system dostaje właściciela i wydaje wersjonowaną paczkę w trybie X-as-a-service. Zespoły produktowe konsumują ją bez pytania nikogo o zgodę.',
              en: 'The design system gets an owner and ships a versioned package in X-as-a-service mode. Product teams consume it without asking permission.'
            }
          },
          {
            svg: frameConway(3, 'Collaboration mode: build the new component together'),
            label: { pl: 'Tryb współpracy', en: 'Collaboration mode' },
            note: {
              pl: 'Nowy, trudny komponent powstaje w parze z jednym zespołem przez dwa sprinty. To celowo drogi tryb, więc musi mieć datę końca.',
              en: 'A hard new component is built by pairing with one team for two sprints. This mode is deliberately expensive, so it needs an end date.'
            }
          },
          {
            svg: frameConway(4, 'Back to X-as-a-service, plus enabling on the side'),
            label: { pl: 'Powrót do usługi', en: 'Back to a service' },
            note: {
              pl: 'Po zakończeniu współpracy wracasz do trybu usługowego, a wiedzę roznosisz przez tryb wspierający: dyżury, codemody, przewodnik dla kontrybutorów.',
              en: 'Once the collaboration ends you return to service mode and spread knowledge through enabling: office hours, codemods, a contribution guide.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Cztery osoby piszą razem jedną książkę. Zgadnij, ile rozdziałów będzie miała. Cztery. Nie dlatego, że taki jest najlepszy podział treści, tylko dlatego, że tak było najłatwiej się dogadać.</p>' +
            '<p>I jeszcze: te dwie osoby, które siedzą obok siebie, napiszą swoje rozdziały tak, że pięknie się zazębiają. A ta jedna, która pracuje z innego miasta i odzywa się na czacie raz w tygodniu? Jej rozdział będzie o czymś podobnym, ale własnymi słowami, z własnym słownikiem.</p>' +
            '<p>Systemy zawsze rosną w kształcie rozmów w zespole. Jeśli chcesz zmienić kształt systemu, samo przepisanie kodu nie wystarczy - kod wróci do starego kształtu. Najpierw zmień to, kto z kim rozmawia i kto za co odpowiada.</p>',
          en: '<p>Four people write one book together. Guess how many chapters it will have. Four. Not because that is the best way to split the material, but because that was the easiest way to agree.</p>' +
            '<p>And there is more: the two who sit next to each other will write chapters that dovetail beautifully. The one working from another city, who checks in on chat once a week? Her chapter will cover something similar, in her own words, with her own vocabulary.</p>' +
            '<p>Systems always grow into the shape of the conversations in the team. If you want a different shape, rewriting the code is not enough - the code will drift back. First change who talks to whom, and who owns what.</p>'
        },
        school: {
          pl: '<p>Prawo Conwaya z 1967 roku brzmi mniej więcej tak: organizacja projektuje systemy, które są kopią jej struktury komunikacji. To nie jest przestroga, tylko obserwacja - i sprawdza się boleśnie dokładnie.</p>' +
            '<p>Objawy we frontendzie: trzy różne modale w jednej aplikacji, dwa systemy formularzy, komponent z pięcioma propsami typu "variant", bo każdy zespół dołożył swój wariant. Żadne z tego nie jest błędem technicznym. To odbicie organizacji.</p>' +
            '<p><strong>Manewr odwrotnego Conwaya</strong> (inverse Conway maneuver) polega na tym, żeby najpierw ustawić zespoły tak, jak chcesz mieć architekturę, a dopiero potem pisać kod.</p>' +
            '<p>Książka Team Topologies porządkuje to czterema typami zespołów:</p>' +
            '<ul>' +
            '<li><strong>stream-aligned</strong> - zespół produktowy dowożący wartość dla użytkownika;</li>' +
            '<li><strong>platform</strong> - dostarcza wewnętrzny produkt (design system, CI, BFF) jako samoobsługową usługę;</li>' +
            '<li><strong>enabling</strong> - uczy innych i znika, gdy przestaje być potrzebny;</li>' +
            '<li><strong>complicated-subsystem</strong> - trudny fragment wymagający specjalistów, np. odtwarzacz wideo albo silnik map.</li>' +
            '</ul>' +
            '<p>Do tego trzy tryby współpracy: <em>collaboration</em> (razem, drogo, tymczasowo), <em>X-as-a-service</em> (bierzesz i używasz, tanio w skali) oraz <em>facilitating</em> (jeden zespół pomaga drugiemu się nauczyć).</p>' +
            '<p>Zespół design systemu to podręcznikowy zespół platformowy. Domyślnie działa jako usługa - inaczej stanie się wąskim gardłem dla wszystkich pozostałych.</p>' +
            '<p>Praktyczna konsekwencja dla ciebie: zanim zaproponujesz nowy podział kodu, sprawdź, czy istnieje zespół, który będzie za każdy kawałek odpowiadał. Moduł bez właściciela zawsze zamienia się w wysypisko, bo każdy dokłada, a nikt nie sprząta.</p>' +
            '<p>Dlatego pytanie "kto to utrzyma za rok" jest pytaniem architektonicznym, a nie kadrowym, i powinno paść na samym początku dyskusji o granicach.</p>',
          en: '<p>Conway law, from 1967, says roughly this: an organisation designs systems that mirror its own communication structure. It is not a warning, it is an observation - and it holds painfully well.</p>' +
            '<p>Frontend symptoms: three different modals in one app, two form systems, a component with five "variant" props because every team added its own. None of that is a technical mistake. It is a reflection of the org.</p>' +
            '<p>The <strong>inverse Conway maneuver</strong> means arranging teams to match the architecture you want, and only then writing code.</p>' +
            '<p>Team Topologies organises this into four team types:</p>' +
            '<ul>' +
            '<li><strong>stream-aligned</strong> - a product team delivering user value;</li>' +
            '<li><strong>platform</strong> - ships an internal product (design system, CI, BFF) as a self-service offering;</li>' +
            '<li><strong>enabling</strong> - teaches others and disbands once it is no longer needed;</li>' +
            '<li><strong>complicated-subsystem</strong> - a hard piece needing specialists, such as a video player or a mapping engine.</li>' +
            '</ul>' +
            '<p>Plus three interaction modes: <em>collaboration</em> (together, expensive, temporary), <em>X-as-a-service</em> (take it and use it, cheap at scale) and <em>facilitating</em> (one team helps another learn).</p>' +
            '<p>A design system team is the textbook platform team. Its default mode must be a service, otherwise it becomes the bottleneck for everyone else.</p>' +
            '<p>The practical consequence for you: before proposing a new split of the code, check that a team exists to own each piece. A module with no owner always turns into a dumping ground, because everyone adds and nobody tidies.</p>' +
            '<p>That is why the question "who maintains this in a year" is an architectural question rather than a staffing one, and it belongs at the very start of any conversation about boundaries.</p>'
        },
        pro: {
          pl: '<p>W telco z około czterdziestoma zespołami produktowymi i pięcioosobowym zespołem design systemu matematyka jest bezlitosna: nie zrobisz code review każdego użycia, nie napiszesz każdego wariantu i nie zdążysz na żaden cudzy deadline. Jeśli twój zespół jest wąskim gardłem, to problem projektu organizacji, a nie liczby etatów - dosypanie ludzi przesuwa wąskie gardło o jeden kwartał.</p>' +
            '<h4>Domyślnie usługa, wyjątkowo współpraca</h4>' +
            '<p>Zapisz to jawnie w modelu operacyjnym. Tryb usługowy: wersjonowana paczka, changelog, migracje z codemodami, kanał wsparcia z SLO na pierwszą odpowiedź (np. jeden dzień roboczy). Tryb współpracy: tylko dla nowych, trudnych elementów, w parze z jednym zespołem, z datą końca. Współpraca bez daty końca po cichu zamienia się w outsourcing i zjada połowę pojemności zespołu platformowego.</p>' +
            '<h4>Model kontrybucji</h4>' +
            '<p>Federacyjny model działa, ale ma cenę. Realne liczby z dojrzałych design systemów: około 60-70 procent zmian pochodzi od zespołu platformowego, reszta od kontrybutorów, a każdy zewnętrzny PR wymaga 2-3 razy więcej czasu recenzenta niż własny. Warto go mimo to prowadzić, bo kupujesz adopcję i rozumienie - ale zaplanuj na to pojemność, zdefiniuj poziomy (poprawka, wariant, nowy komponent) i wymagaj testów dostępności oraz historyjek Storybooka jako warunku wejścia.</p>' +
            '<h4>Obciążenie poznawcze i granice</h4>' +
            '<p>Team Topologies stawia tezę, że wielkość systemu powinna być ograniczona zdolnością poznawczą zespołu. Praktyczne przełożenie: jeden zespół strumieniowy powinien utrzymywać obszar, który da się rozumieć w całości - zwykle jedna aplikacja plus jej BFF, a nie siedem mikroaplikacji. Kiedy planowany jest podział zespołu, przyjdź z propozycją granicy w kodzie zanim ktoś zrobi to za ciebie.</p>' +
            '<h4>Reorganizacje jako zdarzenie architektoniczne</h4>' +
            '<p>Fuzja dwóch pionów albo przeniesienie zespołu pod inny budżet przepisze twoją architekturę w ciągu dwóch kwartałów, niezależnie od twoich ADR-ów. Traktuj zapowiedź reorganizacji jak zapowiedź migracji: wcześniej wyznacz właścicieli części wspólnych, dopisz CODEOWNERS i przenieś krytyczne paczki tam, gdzie zostanie finansowanie. Umiejętność przewidzenia tego jest jedną z rzeczy, które realnie odróżniają principala od seniora.</p>',
          en: '<p>In a telco with roughly forty product teams and a five-person design system team, the arithmetic is brutal: you cannot review every usage, write every variant, or hit anyone deadline but your own. If your team is the bottleneck, that is an org design problem rather than a headcount problem - adding people moves the bottleneck by one quarter.</p>' +
            '<h4>Service by default, collaboration by exception</h4>' +
            '<p>Write it into the operating model explicitly. Service mode: versioned package, changelog, codemod-backed migrations, a support channel with an SLO for first response (say one working day). Collaboration mode: only for new, hard components, paired with one team, with an end date. Collaboration without an end date quietly becomes outsourcing and eats half the platform team capacity.</p>' +
            '<h4>Contribution model</h4>' +
            '<p>A federated model works, at a price. Realistic numbers from mature design systems: roughly 60-70 percent of changes come from the platform team, the rest from contributors, and each external PR costs a reviewer 2-3 times more time than an internal one. Run it anyway, because you buy adoption and understanding - but budget the capacity, define tiers (fix, variant, new component), and require accessibility tests plus Storybook stories as the entry bar.</p>' +
            '<h4>Cognitive load and boundaries</h4>' +
            '<p>Team Topologies argues that system size should be bounded by what a team can hold in its head. Practically: one stream-aligned team should own a scope it can understand end to end - usually one app plus its BFF, not seven micro-apps. When a team split is being planned, arrive with a proposed boundary in the code before someone draws it for you.</p>' +
            '<h4>Reorgs as architectural events</h4>' +
            '<p>Merging two divisions or moving a team under a different budget will rewrite your architecture within two quarters, regardless of your ADRs. Treat a reorg announcement like a migration announcement: assign owners for shared surfaces early, update CODEOWNERS, and move critical packages to where the funding will be. Seeing that coming is one of the things that genuinely separates a principal from a senior.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Prawo Conwaya mówi, że...',
            en: 'Conway law states that...'
          },
          options: [
            { pl: 'większe zespoły dowożą szybciej', en: 'larger teams deliver faster' },
            { pl: 'systemy odzwierciedlają strukturę komunikacji organizacji, która je buduje', en: 'systems mirror the communication structure of the organisation building them' },
            { pl: 'monorepo zawsze wygrywa z wieloma repozytoriami', en: 'a monorepo always beats many repositories' },
            { pl: 'każdy komponent powinien mieć jednego właściciela', en: 'every component should have exactly one owner' }
          ],
          correct: 1,
          explain: {
            pl: 'To obserwacja o kształcie systemów, nie zalecenie organizacyjne. Dlatego duplikaty komponentów najczęściej pojawiają się dokładnie na granicach zespołów.',
            en: 'It is an observation about the shape of systems, not an org recommendation. That is why duplicate components appear exactly at team boundaries.'
          }
        },
        {
          q: {
            pl: 'Zespół design systemu w dużej organizacji powinien domyślnie działać w trybie...',
            en: 'A design system team in a large organisation should default to which interaction mode?'
          },
          options: [
            { pl: 'X-as-a-service: wersjonowana paczka do samoobsługi', en: 'X-as-a-service: a versioned package for self-service' },
            { pl: 'collaboration z każdym zespołem produktowym', en: 'collaboration with every product team' },
            { pl: 'complicated-subsystem, bo komponenty są trudne', en: 'complicated-subsystem, because components are hard' },
            { pl: 'stream-aligned, bo dowozi wartość dla użytkownika', en: 'stream-aligned, because it delivers user value' }
          ],
          correct: 0,
          explain: {
            pl: 'Tryb usługowy skaluje się liniowo do liczby konsumentów, a współpraca nie. Współpracę rezerwuje się na nowe, trudne rzeczy i zawsze z datą końca.',
            en: 'Service mode scales with the number of consumers; collaboration does not. Reserve collaboration for new, hard work, always with an end date.'
          }
        },
        {
          q: {
            pl: 'Na czym polega manewr odwrotnego Conwaya?',
            en: 'What is the inverse Conway maneuver?'
          },
          options: [
            { pl: 'Na odwróceniu kierunku zależności w grafie importów', en: 'Reversing the direction of dependencies in the import graph' },
            { pl: 'Na cofnięciu ostatniej dużej refaktoryzacji', en: 'Rolling back the last big refactor' },
            { pl: 'Na przebudowie zespołów tak, by odpowiadały docelowej architekturze', en: 'Reshaping teams so they match the target architecture' },
            { pl: 'Na oddaniu decyzji architektonicznych zespołom produktowym', en: 'Handing architecture decisions to product teams' }
          ],
          correct: 2,
          explain: {
            pl: 'Skoro system i tak przyjmie kształt komunikacji, najpierw zmieniasz układ zespołów i własności, a dopiero potem kod. Inaczej refaktor cofnie się w ciągu kilku kwartałów.',
            en: 'Since the system will take the shape of communication anyway, you change the team layout and ownership first, then the code. Otherwise the refactor reverts within a few quarters.'
          }
        },
        {
          q: {
            pl: 'Twój pięcioosobowy zespół design systemu jest wąskim gardłem dla czterdziestu zespołów. Które podejście ma największą szansę zadziałać?',
            en: 'Your five-person design system team is the bottleneck for forty teams. Which approach is most likely to work?'
          },
          options: [
            { pl: 'Wprowadzić obowiązkowe review design systemu w każdym PR-ze produktowym', en: 'Require a design system review on every product PR' },
            { pl: 'Zamrozić nowe komponenty na dwa kwartały', en: 'Freeze new components for two quarters' },
            { pl: 'Zatrudnić pięć kolejnych osób do zespołu', en: 'Hire five more people into the team' },
            { pl: 'Przenieść pracę na samoobsługę: model kontrybucji, codemody, dyżury i automaty w CI', en: 'Shift the work to self-service: contribution model, codemods, office hours, CI automation' }
          ],
          correct: 3,
          explain: {
            pl: 'Wąskie gardło znika, gdy przestajesz być w ścieżce krytycznej: automaty egzekwują zasady, a kontrybucje i codemody przenoszą pracę do zespołów. Dosypanie etatów przesuwa problem o kwartał.',
            en: 'The bottleneck disappears when you leave the critical path: automation enforces the rules, while contributions and codemods move the work to the teams. Headcount only moves the problem by a quarter.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'build-vs-buy-decisions',
      title: {
        pl: 'Build vs buy: kiedy pisać samemu',
        en: 'Build vs buy: when to write it yourself'
      },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="320" y="26" text-anchor="middle" font-size="15" fill="var(--text)">Two questions, four answers</text>' +
          '<line x1="320" y1="46" x2="320" y2="300" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="40" y1="173" x2="600" y2="173" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="44" y="52" width="264" height="112" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="176" y="82" text-anchor="middle" font-size="15" fill="var(--ok)">BUILD</text>' +
          '<text x="176" y="108" text-anchor="middle" font-size="13" fill="var(--muted)">differentiating</text>' +
          '<text x="176" y="130" text-anchor="middle" font-size="13" fill="var(--muted)">no good option exists</text>' +
          '<text x="176" y="152" text-anchor="middle" font-size="13" fill="var(--muted)">your brand, your tokens</text>' +
          '<rect x="332" y="52" width="264" height="112" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="464" y="82" text-anchor="middle" font-size="15" fill="var(--accent)">WRAP</text>' +
          '<text x="464" y="108" text-anchor="middle" font-size="13" fill="var(--muted)">differentiating skin</text>' +
          '<text x="464" y="130" text-anchor="middle" font-size="13" fill="var(--muted)">commodity engine</text>' +
          '<text x="464" y="152" text-anchor="middle" font-size="13" fill="var(--muted)">headless lib plus adapter</text>' +
          '<rect x="44" y="182" width="264" height="112" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="176" y="212" text-anchor="middle" font-size="15" fill="var(--warn)">DROP</text>' +
          '<text x="176" y="238" text-anchor="middle" font-size="13" fill="var(--muted)">nobody needs it</text>' +
          '<text x="176" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">delete and move on</text>' +
          '<rect x="332" y="182" width="264" height="112" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="464" y="212" text-anchor="middle" font-size="15" fill="var(--accent2)">BUY</text>' +
          '<text x="464" y="238" text-anchor="middle" font-size="13" fill="var(--muted)">commodity</text>' +
          '<text x="464" y="260" text-anchor="middle" font-size="13" fill="var(--muted)">mature market, boring</text>' +
          '<text x="60" y="318" font-size="13" fill="var(--muted)">left: no mature option</text>' +
          '<text x="600" y="318" text-anchor="end" font-size="13" fill="var(--muted)">right: mature option exists</text>' +
          '<rect x="24" y="330" width="592" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="362" text-anchor="middle" font-size="14" fill="var(--text)">Vertical axis: is this what your product competes on?</text>' +
          '</svg>',
        caption: {
          pl: 'Dwie osie: czy to nas wyróżnia i czy istnieje dojrzała gotowa opcja; najciekawsze pole to WRAP - kupujesz silnik, budujesz warstwę marki.',
          en: 'Two axes: does it differentiate us, and does a mature option exist; the interesting quadrant is WRAP - buy the engine, build the brand layer.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Możesz piec chleb w domu. Możesz też kupić w piekarni obok. Jedno i drugie ma sens - zależy, czy prowadzisz restaurację, w której chleb jest głównym daniem, czy po prostu chcesz kanapkę.</p>' +
            '<p>Problem w tym, że w kodzie ciągle mylimy jedno z drugim. Ktoś mówi: "ten kalendarzyk zrobię w dwa dni". I rzeczywiście, w dwa dni jest gotowy. Ale potem przez trzy lata ktoś musi go poprawiać: bo nie działa na klawiaturze, bo w Ramadanie miesiące są inne, bo w Australii tydzień zaczyna się gdzie indziej.</p>' +
            '<p>Pieczenie chleba to nie dwie godziny w piekarniku. To codzienne wstawanie o czwartej rano. Zanim powiesz "zrobimy sami", policz te wszystkie poranki - a nie sam pierwszy bochenek.</p>',
          en: '<p>You can bake bread at home. You can also buy it from the bakery next door. Both make sense - it depends on whether you run a restaurant where bread is the main dish, or you just want a sandwich.</p>' +
            '<p>The trouble is that in code we constantly mix the two up. Somebody says: I will build that little calendar in two days. And sure enough, in two days it is there. Then for three years somebody has to keep fixing it: it does not work with a keyboard, months are different during Ramadan, in Australia the week starts somewhere else.</p>' +
            '<p>Baking bread is not two hours in the oven. It is getting up at four every single morning. Before you say "we will build it ourselves", count all those mornings - not just the first loaf.</p>'
        },
        school: {
          pl: '<p>Reguła numer jeden: buduj to, na czym konkurujesz, kupuj resztę. Pytanie brzmi więc: czy klient wybierze naszą ofertę, bo nasz komponent jest lepszy? Przy przycisku odpowiedź brzmi nie. Przy konfiguratorze taryf - być może tak.</p>' +
            '<p>Reguła numer dwa: całkowity koszt posiadania (TCO) to nie koszt napisania. Rozsądny podział to około 30 procent pierwszej wersji i 70 procent utrzymania w perspektywie 2-3 lat: poprawki dostępności, nowe przeglądarki, RTL, tłumaczenia, dokumentacja, wsparcie.</p>' +
            '<p>Trzeźwy przykład. "Prosty date picker w dwa tygodnie" po dodaniu obsługi klawiatury, czytników ekranu, stref czasowych, lokalizacji, zakresów i testów to zwykle 6-8 osobotygodni, a potem stały koszt utrzymania.</p>' +
            '<p>Na co patrzeć przy ocenie gotowego rozwiązania:</p>' +
            '<ul>' +
            '<li>dopasowanie do wymagań dziś i wersje wydawane w ostatnim roku;</li>' +
            '<li>dostępność - deklaracja WCAG i realne testy, nie tylko strona marketingowa;</li>' +
            '<li>rozmiar bundle i możliwość tree-shakingu;</li>' +
            '<li>licencja: MIT to nie to samo co GPL czy licencja komercyjna per developer;</li>' +
            '<li>zdrowie projektu: liczba maintainerów, tempo zamykania zgłoszeń, czy to nie jest projekt jednej osoby;</li>' +
            '<li>furtki awaryjne - czy da się nadpisać style i zachowanie, gdy wymagania się rozjadą.</li>' +
            '</ul>' +
            '<p>Trzecia droga, najczęściej najlepsza: <strong>wrap</strong>. Bierzesz bibliotekę headless (bez stylów), np. Radix albo React Aria, i budujesz na niej własną warstwę wizualną. Kupujesz to, co trudne i nudne - dostępność i zarządzanie fokusem - a budujesz to, co twoje: wygląd i API.</p>',
          en: '<p>Rule one: build what you compete on, buy the rest. So ask: will a customer choose our offer because our component is better? For a button, no. For a tariff configurator, possibly yes.</p>' +
            '<p>Rule two: total cost of ownership is not the cost of writing it. A sane split over 2-3 years is about 30 percent first version and 70 percent maintenance: accessibility fixes, new browsers, RTL, translations, docs, support.</p>' +
            '<p>A sober example. A "simple date picker in two weeks" becomes 6-8 person-weeks once you add keyboard support, screen readers, time zones, locales, ranges and tests - plus a permanent maintenance line.</p>' +
            '<p>What to look at when evaluating an off-the-shelf option:</p>' +
            '<ul>' +
            '<li>fit for today requirements, and how many releases shipped in the last year;</li>' +
            '<li>accessibility - a WCAG statement plus real tests, not just a marketing page;</li>' +
            '<li>bundle size and whether it tree-shakes;</li>' +
            '<li>licence: MIT is not the same as GPL or a commercial per-developer seat;</li>' +
            '<li>project health: number of maintainers, issue turnaround, whether it is one person;</li>' +
            '<li>escape hatches - can you override styling and behaviour when requirements drift.</li>' +
            '</ul>' +
            '<p>The third path, often the best: <strong>wrap</strong>. Take a headless (unstyled) library such as Radix or React Aria and build your own visual layer on top. You buy the hard, boring part - accessibility and focus management - and build the part that is yours: the look and the API.</p>'
        },
        pro: {
          pl: '<p>Decyzja build vs buy w dużym telco to w 40 procentach technika, a w 60 procentach ryzyko, prawo i czas kalendarzowy. Warto to powiedzieć wprost, zanim zespół zacznie porównywać benchmarki.</p>' +
            '<h4>Wymiary, o których łatwo zapomnieć</h4>' +
            '<ul>' +
            '<li><strong>Zakupy i prawo</strong> - ocena dostawcy, DPA i ocena bezpieczeństwa to realnie 6-12 tygodni kalendarzowych. Jeśli projekt startuje za trzy tygodnie, "buy" może być niewykonalne z powodów proceduralnych, a nie technicznych.</li>' +
            '<li><strong>Dostępność</strong> - w telco obowiązuje EN 301 549 i WCAG 2.2 AA, w zamówieniach publicznych jako wymóg umowny. Własny komponent oznacza własny audyt i własne ryzyko kar. To zwykle najmocniejszy argument za "buy" lub "wrap".</li>' +
            '<li><strong>Ryzyko dostawcy</strong> - komercyjna licencja per seat przy 300 deweloperach ma inny wymiar niż przy trzydziestu. Sprawdź warunki wyjścia i dostępność kodu w depozycie.</li>' +
            '<li><strong>Koszt bundle</strong> - policz realnie: ciężki grid potrafi dołożyć 150-300 kB gzip, co przy budżecie LCP na 3G jest decyzją produktową, nie techniczną.</li>' +
            '</ul>' +
            '<h4>Wzorzec adaptera</h4>' +
            '<p>Cokolwiek wybierzesz, nie pozwól, by API dostawcy wyciekło do 40 aplikacji. Publikuj własny komponent, który opakowuje bibliotekę, i eksportuj wyłącznie te propsy, które chcesz utrzymywać. Wtedy wymiana silnika to jedna paczka i jedno wydanie major, a nie 40 migracji.</p>' +
            '<pre><code>// packages/ds/src/date-picker/index.ts\nexport { DatePicker } from "./DatePicker";\nexport type { DatePickerProps } from "./types";\n// vendor import lives ONLY inside ./DatePicker</code></pre>' +
            '<h4>Jak przedstawić to decydentom</h4>' +
            '<p>Trzy scenariusze, każdy z liczbami: koszt wdrożenia w osobotygodniach, roczny koszt utrzymania, czas do pierwszej wersji produkcyjnej i koszt wyjścia. Do tego jawne kryterium unieważnienia decyzji: "jeśli w ciągu roku potrzebujemy więcej niż trzech obejść w kodzie dostawcy, wracamy do tej decyzji". Bez takiego warunku każdy wybór staje się permanentny przez inercję.</p>' +
            '<h4>Typowe błędy</h4>' +
            '<p>Pierwszy: liczenie tylko pierwszej wersji. Drugi: kupowanie ciężkiego frameworka dla jednego ekranu (klasyczne AG Grid tam, gdzie wystarczyłby TanStack Table plus własne komórki). Trzeci: budowanie od zera rzeczy, w których błąd oznacza ryzyko prawne - dostępność, kryptografia, obsługa dat i stref czasowych. Czwarty, najdroższy: rozwidlenie biblioteki open source, po którym nie da się już przyjmować poprawek bezpieczeństwa. Jeśli musisz forkować, traktuj to jak decyzję "build" i przypisz jej właściciela oraz budżet.</p>',
          en: '<p>Build vs buy in a large telco is 40 percent technology and 60 percent risk, legal and calendar time. Say that out loud before the team starts comparing benchmarks.</p>' +
            '<h4>Dimensions that are easy to forget</h4>' +
            '<ul>' +
            '<li><strong>Procurement and legal</strong> - vendor assessment, DPA and a security review realistically take 6-12 calendar weeks. If the project starts in three weeks, "buy" may be impossible for procedural rather than technical reasons.</li>' +
            '<li><strong>Accessibility</strong> - a telco is bound by EN 301 549 and WCAG 2.2 AA, contractually so in public tenders. Your own component means your own audit and your own exposure to penalties. This is usually the strongest argument for buy or wrap.</li>' +
            '<li><strong>Vendor risk</strong> - a commercial per-seat licence looks different at 300 developers than at thirty. Check exit terms and source escrow.</li>' +
            '<li><strong>Bundle cost</strong> - measure it: a heavy grid can add 150-300 kB gzip, which against an LCP budget on 3G is a product decision, not a technical one.</li>' +
            '</ul>' +
            '<h4>The adapter pattern</h4>' +
            '<p>Whatever you pick, do not let the vendor API leak into 40 applications. Publish your own component wrapping the library and export only the props you intend to maintain. Then swapping the engine is one package and one major release, not 40 migrations.</p>' +
            '<pre><code>// packages/ds/src/date-picker/index.ts\nexport { DatePicker } from "./DatePicker";\nexport type { DatePickerProps } from "./types";\n// vendor import lives ONLY inside ./DatePicker</code></pre>' +
            '<h4>How to present it to decision makers</h4>' +
            '<p>Three scenarios, each with numbers: implementation cost in person-weeks, annual maintenance cost, time to first production release, and cost of exit. Add an explicit invalidation trigger: "if within a year we need more than three patches against vendor internals, we revisit this decision". Without such a trigger every choice becomes permanent through inertia.</p>' +
            '<h4>Common mistakes</h4>' +
            '<p>One: costing only the first version. Two: buying a heavy framework for a single screen - the classic AG Grid where TanStack Table plus your own cells would do. Three: writing from scratch things where a bug is a legal risk: accessibility, cryptography, dates and time zones. Four, the most expensive: forking an open source library so hard that you can no longer take security fixes. If you must fork, treat it as a build decision and give it an owner and a budget.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Która zasada najlepiej porządkuje decyzje build vs buy?',
            en: 'Which principle best organises build-vs-buy decisions?'
          },
          options: [
            { pl: 'Buduj wszystko, co da się napisać w mniej niż tydzień', en: 'Build anything you can write in under a week' },
            { pl: 'Kupuj tylko wtedy, gdy nie ma nic na npm', en: 'Buy only when nothing exists on npm' },
            { pl: 'Buduj to, na czym produkt konkuruje, kupuj resztę', en: 'Build what the product competes on, buy the rest' },
            { pl: 'Zawsze buduj, żeby uniknąć zależności od dostawcy', en: 'Always build, to avoid vendor lock-in' }
          ],
          correct: 2,
          explain: {
            pl: 'Zdolność wytwórcza jest ograniczona, więc kieruj ją tam, gdzie tworzy przewagę. Elementy commodity kupuj albo opakowuj biblioteką headless.',
            en: 'Engineering capacity is finite, so point it where it creates advantage. Commodity pieces should be bought or wrapped around a headless library.'
          }
        },
        {
          q: {
            pl: 'Jak w perspektywie 2-3 lat rozkłada się typowy koszt własnego komponentu?',
            en: 'Over 2-3 years, how does the typical cost of a home-grown component split?'
          },
          options: [
            { pl: 'Około 30 procent pierwsza wersja, 70 procent utrzymanie', en: 'About 30 percent first version, 70 percent maintenance' },
            { pl: 'Około 90 procent pierwsza wersja, 10 procent utrzymanie', en: 'About 90 percent first version, 10 percent maintenance' },
            { pl: 'Po połowie, jeśli są testy jednostkowe', en: 'Half and half, if unit tests exist' },
            { pl: 'Utrzymanie jest darmowe, gdy komponent jest mały', en: 'Maintenance is free when the component is small' }
          ],
          correct: 0,
          explain: {
            pl: 'Dominują lata utrzymania: dostępność, nowe przeglądarki, RTL, lokalizacje, dokumentacja i wsparcie. Dlatego "napiszemy w dwa dni" prawie zawsze zaniża koszt.',
            en: 'The maintenance years dominate: accessibility, new browsers, RTL, locales, docs and support. That is why "two days of work" almost always understates the cost.'
          }
        },
        {
          q: {
            pl: 'Dlaczego warto opakować bibliotekę zewnętrzną własnym komponentem w design systemie?',
            en: 'Why wrap a third-party library in your own design system component?'
          },
          options: [
            { pl: 'Bo wrapper zmniejsza rozmiar bundle', en: 'Because a wrapper reduces bundle size' },
            { pl: 'Bo licencje wymagają zmiany nazwy komponentu', en: 'Because licences require renaming the component' },
            { pl: 'Bo wtedy testy jednostkowe są szybsze', en: 'Because unit tests then run faster' },
            { pl: 'Bo wymiana dostawcy staje się zmianą w jednej paczce zamiast migracji w 40 aplikacjach', en: 'Because swapping vendors becomes one package change instead of 40 app migrations' }
          ],
          correct: 3,
          explain: {
            pl: 'Adapter zatrzymuje API dostawcy na granicy paczki. Bez niego nazwy propsów obcej biblioteki stają się twoim publicznym kontraktem na lata.',
            en: 'The adapter stops the vendor API at the package boundary. Without it, someone else prop names become your public contract for years.'
          }
        },
        {
          q: {
            pl: 'Zespół chce napisać własny komponent daty w aplikacji telco objętej zamówieniami publicznymi. Jaki argument najsilniej przemawia za "wrap" zamiast "build"?',
            en: 'A team wants to hand-write a date component in a telco app covered by public procurement. Which argument most strongly favours wrap over build?'
          },
          options: [
            { pl: 'Zgodność z EN 301 549 i WCAG 2.2 AA byłaby wtedy własnym ryzykiem prawnym', en: 'EN 301 549 and WCAG 2.2 AA conformance would become your own legal exposure' },
            { pl: 'Własny komponent miałby więcej propsów', en: 'A home-grown component would have more props' },
            { pl: 'Zespół nie zna dobrze CSS Grid', en: 'The team is not fluent in CSS Grid' },
            { pl: 'Biblioteki zewnętrzne są zawsze mniejsze', en: 'Third-party libraries are always smaller' }
          ],
          correct: 0,
          explain: {
            pl: 'Dostępność w zamówieniach publicznych jest wymogiem umownym, a jej błędy kosztują więcej niż licencja. Headless plus własna warstwa wizualna daje zgodność i kontrolę nad wyglądem.',
            en: 'Accessibility is a contractual requirement in public tenders, and getting it wrong costs more than a licence. Headless plus your own visual layer gives conformance and full control of the look.'
          }
        }
      ]
    }
  ]
};
