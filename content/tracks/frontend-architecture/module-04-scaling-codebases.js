export default {
  id: 'scaling-codebases',
  order: 4,
  icon: '🧱',
  title: { pl: 'Skalowanie kodu', en: 'Scaling Codebases' },
  description: {
    pl: 'Co się psuje, gdy jeden design system i kilkadziesiąt aplikacji dzieli setka ludzi: monorepo i cache zadań, micro-frontendy, granice bibliotek, feature flagi oraz strategia aktualizacji zależności.',
    en: 'What breaks when one design system and dozens of apps are shared by a hundred people: monorepos and task caching, micro-frontends, library boundaries, feature flags and a dependency upgrade strategy.'
  },
  lessons: [
    {
      id: 'monorepos-tooling',
      title: { pl: 'Monorepo i narzędzia: pnpm, Turborepo, Nx', en: 'Monorepos and tooling: pnpm, Turborepo, Nx' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Monorepo', en: 'Monorepo' },
          def: {
            pl: 'Jedno repozytorium z wieloma aplikacjami i bibliotekami wersjonowanymi razem. To nie monolit: kod dalej dzieli się na paczki, tylko leżą obok siebie i zmieniają się w jednym commicie.',
            en: 'One repository holding many applications and libraries versioned together. Not a monolith: the code is still split into packages, they just sit side by side and change in one commit.'
          }
        },
        {
          term: { pl: 'Zmiana atomowa (atomic change)', en: 'Atomic change' },
          def: {
            pl: 'Nowe API komponentu i wszystkie miejsca jego użycia poprawione w jednym pull requeście. Likwiduje okno, w którym połowa firmy siedzi jeszcze na starej wersji.',
            en: 'A new component API and every call site fixed in one pull request. It removes the window in which half the company still sits on the old version.'
          }
        },
        {
          term: { pl: 'Graf affected', en: 'Affected graph' },
          def: {
            pl: 'Zbiór projektów dotkniętych zmianą, wyliczony z diffa do gałęzi bazowej i przejścia grafu zależności w górę. <code>nx affected</code> uruchamia zadania wyłącznie dla tego zbioru.',
            en: 'The set of projects touched by a change, computed from the diff against the base branch and a walk up the dependency graph. <code>nx affected</code> runs tasks only for that set.'
          }
        },
        {
          term: { pl: 'Hash wejść zadania', en: 'Task input hash' },
          def: {
            pl: 'Odcisk plików wejściowych, zależności, konfiguracji zadania i zadeklarowanych zmiennych środowiskowych. Ten sam hash musi oznaczać ten sam wynik, inaczej cache kłamie.',
            en: 'A fingerprint of the input files, dependencies, task configuration and declared environment variables. The same hash must mean the same result, otherwise the cache lies.'
          }
        },
        {
          term: { pl: 'Zdalny cache (remote cache)', en: 'Remote cache' },
          def: {
            pl: 'Współdzielone składowisko wyników zadań (S3, Nx Cloud), z którego CI i laptopy kopiują gotowe artefakty zamiast liczyć je ponownie. Zdrowy wskaźnik trafień to <strong>60-80 procent</strong>.',
            en: 'A shared store of task results (S3, Nx Cloud) from which CI and laptops copy finished artifacts instead of recomputing them. A healthy hit rate is <strong>60-80 percent</strong>.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="mono1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="320" y="28" text-anchor="middle" font-size="15" fill="var(--text)">One repo, one task graph</text>' +
          '<rect x="30" y="50" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="115" y="76" text-anchor="middle" font-size="14" fill="var(--text)">app: self-care</text>' +
          '<text x="115" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">build 4 min</text>' +
          '<rect x="235" y="50" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="76" text-anchor="middle" font-size="14" fill="var(--text)">app: shop</text>' +
          '<text x="320" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">build 6 min</text>' +
          '<rect x="440" y="50" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="525" y="76" text-anchor="middle" font-size="14" fill="var(--text)">app: admin</text>' +
          '<text x="525" y="95" text-anchor="middle" font-size="13" fill="var(--muted)">build 3 min</text>' +
          '<rect x="130" y="175" width="180" height="56" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="220" y="200" text-anchor="middle" font-size="14" fill="var(--text)">lib: design system</text>' +
          '<text x="220" y="219" text-anchor="middle" font-size="13" fill="var(--muted)">components</text>' +
          '<rect x="350" y="175" width="180" height="56" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="440" y="200" text-anchor="middle" font-size="14" fill="var(--text)">lib: data client</text>' +
          '<text x="440" y="219" text-anchor="middle" font-size="13" fill="var(--muted)">api sdk</text>' +
          '<rect x="235" y="290" width="180" height="56" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="325" y="315" text-anchor="middle" font-size="14" fill="var(--text)">lib: tokens</text>' +
          '<text x="325" y="334" text-anchor="middle" font-size="13" fill="var(--muted)">changed here</text>' +
          '<path d="M115,175 L115,110" stroke="var(--muted)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<path d="M220,171 L300,110" stroke="var(--muted)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<path d="M440,171 L360,110" stroke="var(--muted)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<path d="M500,171 L520,110" stroke="var(--muted)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<path d="M280,290 L230,236" stroke="var(--ok)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<path d="M370,290 L425,236" stroke="var(--ok)" stroke-width="2" marker-end="url(#mono1-a)"/>' +
          '<text x="40" y="380" font-size="13" fill="var(--muted)">edit tokens = 3 apps affected, everything else stays cached</text>' +
          '</svg>',
        caption: {
          pl: 'Monorepo to nie folder ze wszystkim, tylko graf zadań: narzędzie wie, co zależy od czego, i przelicza wyłącznie to, na co realnie wpłynęła zmiana.',
          en: 'A monorepo is not a folder with everything in it, it is a task graph: the tool knows what depends on what and only recomputes what the change actually touched.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden pull request w monorepo: od zmienionego pliku, przez graf affected, po trafienia w zdalny cache.',
          en: 'One pull request in a monorepo: from the changed file, through the affected graph, to remote cache hits.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">PR touches one file in lib: tokens</text>' +
              '<rect x="40" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="120" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">app: self-care</text>' +
              '<rect x="240" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">app: shop</text>' +
              '<rect x="440" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="520" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">app: admin</text>' +
              '<rect x="140" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="220" y="190" text-anchor="middle" font-size="14" fill="var(--muted)">lib: design system</text>' +
              '<rect x="340" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="420" y="190" text-anchor="middle" font-size="14" fill="var(--muted)">lib: data client</text>' +
              '<rect x="240" y="260" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="290" text-anchor="middle" font-size="14" fill="var(--text)">lib: tokens</text>' +
              '<text x="320" y="340" text-anchor="middle" font-size="13" fill="var(--muted)">git diff origin/main...HEAD</text>' +
              '</svg>',
            label: { pl: 'Zmiana w jednym pliku', en: 'One file changed' },
            note: {
              pl: 'Narzędzie startuje od diffa względem bazy, nie od listy projektów. Zmieniona jest tylko biblioteka tokens.',
              en: 'The tool starts from the diff against the merge base, not from a list of projects. Only the tokens library changed.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Affected set walks up the dependency graph</text>' +
              '<rect x="40" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="120" y="90" text-anchor="middle" font-size="14" fill="var(--text)">app: self-care</text>' +
              '<rect x="240" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="90" text-anchor="middle" font-size="14" fill="var(--text)">app: shop</text>' +
              '<rect x="440" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="520" y="90" text-anchor="middle" font-size="14" fill="var(--text)">app: admin</text>' +
              '<rect x="140" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="220" y="190" text-anchor="middle" font-size="14" fill="var(--text)">lib: design system</text>' +
              '<rect x="340" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="420" y="190" text-anchor="middle" font-size="14" fill="var(--muted)">lib: data client</text>' +
              '<rect x="240" y="260" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="290" text-anchor="middle" font-size="14" fill="var(--text)">lib: tokens</text>' +
              '<path d="M300,260 L230,215" stroke="var(--warn)" stroke-width="2"/>' +
              '<path d="M220,156 L130,115" stroke="var(--warn)" stroke-width="2"/>' +
              '<path d="M240,156 L310,115" stroke="var(--warn)" stroke-width="2"/>' +
              '<path d="M280,160 L500,115" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="340" text-anchor="middle" font-size="13" fill="var(--muted)">5 projects affected, data client untouched</text>' +
              '</svg>',
            label: { pl: 'Graf affected', en: 'The affected graph' },
            note: {
              pl: 'Zmiana propaguje się w górę do wszystkich konsumentów. Data client nie zależy od tokens, więc wypada z zestawu zadań.',
              en: 'The change propagates upward to every consumer. The data client does not depend on tokens, so it drops out of the task set.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Each task gets a hash of its inputs</text>' +
              '<rect x="40" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="120" y="82" text-anchor="middle" font-size="14" fill="var(--text)">self-care build</text>' +
              '<text x="120" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">hash a91f</text>' +
              '<rect x="240" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="82" text-anchor="middle" font-size="14" fill="var(--text)">shop build</text>' +
              '<text x="320" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">hash 3c07</text>' +
              '<rect x="440" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="520" y="82" text-anchor="middle" font-size="14" fill="var(--text)">admin build</text>' +
              '<text x="520" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">hash 77be</text>' +
              '<rect x="140" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="220" y="182" text-anchor="middle" font-size="14" fill="var(--text)">ds test</text>' +
              '<text x="220" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">hash 5d12</text>' +
              '<rect x="340" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="420" y="190" text-anchor="middle" font-size="14" fill="var(--muted)">data client: skipped</text>' +
              '<rect x="140" y="255" width="360" height="60" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--text)">hash = files + deps + env + task config</text>' +
              '<text x="320" y="301" text-anchor="middle" font-size="13" fill="var(--muted)">same inputs must mean same outputs</text>' +
              '</svg>',
            label: { pl: 'Hash wejść', en: 'Input hashing' },
            note: {
              pl: 'Cache jest tak dobry, jak precyzyjny jest hash. Nieujęta zmienna środowiskowa daje fałszywe trafienie, ujęcie znacznika czasu zabija cache całkowicie.',
              en: 'The cache is only as good as the hash. A missing env var gives false hits, a timestamp in the inputs kills caching entirely.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Remote cache answers before anything runs</text>' +
              '<rect x="40" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="120" y="82" text-anchor="middle" font-size="14" fill="var(--text)">self-care build</text>' +
              '<text x="120" y="100" text-anchor="middle" font-size="13" fill="var(--ok)">cache hit 2 s</text>' +
              '<rect x="240" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="82" text-anchor="middle" font-size="14" fill="var(--text)">shop build</text>' +
              '<text x="320" y="100" text-anchor="middle" font-size="13" fill="var(--err)">miss, runs 6 min</text>' +
              '<rect x="440" y="60" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="520" y="82" text-anchor="middle" font-size="14" fill="var(--text)">admin build</text>' +
              '<text x="520" y="100" text-anchor="middle" font-size="13" fill="var(--ok)">cache hit 2 s</text>' +
              '<rect x="140" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="220" y="182" text-anchor="middle" font-size="14" fill="var(--text)">ds test</text>' +
              '<text x="220" y="200" text-anchor="middle" font-size="13" fill="var(--ok)">cache hit 3 s</text>' +
              '<rect x="340" y="160" width="160" height="50" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="420" y="190" text-anchor="middle" font-size="14" fill="var(--muted)">data client: skipped</text>' +
              '<rect x="140" y="255" width="360" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="280" text-anchor="middle" font-size="14" fill="var(--text)">remote cache: S3 bucket or Nx Cloud</text>' +
              '<text x="320" y="301" text-anchor="middle" font-size="13" fill="var(--muted)">a colleague already built this exact hash</text>' +
              '</svg>',
            label: { pl: 'Trafienia w cache', en: 'Cache hits' },
            note: {
              pl: 'Zdalny cache dzieli wyniki między CI a laptopami. Trafienie to skopiowanie artefaktu i logów, a nie ponowne uruchomienie zadania.',
              en: 'The remote cache shares results between CI and laptops. A hit means copying the artifact and the logs, not rerunning the task.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Pipeline result</text>' +
              '<rect x="60" y="70" width="230" height="90" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="175" y="100" text-anchor="middle" font-size="14" fill="var(--text)">Naive: build everything</text>' +
              '<text x="175" y="124" text-anchor="middle" font-size="15" fill="var(--err)">28 min</text>' +
              '<text x="175" y="146" text-anchor="middle" font-size="13" fill="var(--muted)">every PR, every time</text>' +
              '<rect x="350" y="70" width="230" height="90" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="465" y="100" text-anchor="middle" font-size="14" fill="var(--text)">Affected plus cache</text>' +
              '<text x="465" y="124" text-anchor="middle" font-size="15" fill="var(--ok)">7 min</text>' +
              '<text x="465" y="146" text-anchor="middle" font-size="13" fill="var(--muted)">one real build</text>' +
              '<rect x="60" y="200" width="520" height="110" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="230" text-anchor="middle" font-size="14" fill="var(--text)">What you must protect</text>' +
              '<text x="320" y="256" text-anchor="middle" font-size="13" fill="var(--muted)">deterministic tasks, declared inputs and outputs</text>' +
              '<text x="320" y="278" text-anchor="middle" font-size="13" fill="var(--muted)">no writes outside the output folder</text>' +
              '<text x="320" y="300" text-anchor="middle" font-size="13" fill="var(--muted)">cache hit rate as a tracked metric</text>' +
              '</svg>',
            label: { pl: 'Efekt i warunki', en: 'Payoff and conditions' },
            note: {
              pl: 'Cztery razy krótszy pipeline nie bierze się z narzędzia, tylko z determinizmu zadań. Pilnuj wskaźnika trafień w cache jak każdego innego SLO.',
              en: 'A four times shorter pipeline comes from deterministic tasks, not from the tool. Track cache hit rate like any other SLO.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie ogromną kuchnię, w której gotuje sto osób. Każdy zespół ma swoje danie, ale wszyscy używają tego samego sosu bazowego. Kiedyś każdy miał własną kuchnię i własny przepis na sos - i wychodziło sto różnych sosów.</p><p>Monorepo to jedna wspólna kuchnia. Sos stoi w jednym garnku, wszyscy biorą z tego samego. Zmieniasz sos raz i od razu widzisz, komu zepsułeś danie, jeszcze zanim ktokolwiek to zje.</p><p>Problem jest taki, że gdyby przy każdej drobnej zmianie gotować wszystko od nowa, obiad byłby o północy. Dlatego kuchnia ma tablicę: co z czego się robi. Zmieniłeś sos - podgrzewamy tylko te trzy dania, które sos zawierają. Reszta stoi gotowa w lodówce.</p><p>W lodówce trzymamy też dania ugotowane wcześniej przez kolegów. Jeśli ktoś już zrobił dokładnie to samo, po prostu wyjmujemy gotowe. Cała sztuka polega na tym, żeby dania były przewidywalne - ten sam przepis musi zawsze dawać ten sam smak.</p>',
          en: '<p>Picture a huge kitchen where a hundred people cook. Every team makes its own dish, but everyone uses the same base sauce. It used to be that each cook had a private kitchen and a private sauce recipe, so there were a hundred slightly different sauces.</p><p>A monorepo is one shared kitchen. The sauce lives in one pot and everyone takes from it. You change the sauce once and immediately see whose dish you ruined, before anyone eats it.</p><p>The catch is that recooking everything after every small change would mean serving dinner at midnight. So the kitchen keeps a board of what is made from what. You changed the sauce, so only the three dishes containing it get reheated. The rest stays ready in the fridge.</p><p>The fridge also holds dishes your colleagues cooked earlier. If someone already made exactly this, you just take the finished plate. The whole trick is making dishes predictable: the same recipe must always give the same taste.</p>'
        },
        school: {
          pl: '<p>Monorepo to jedno repozytorium, w którym mieszka wiele aplikacji i wiele bibliotek, wersjonowanych razem. To nie to samo co monolit: kod dalej dzieli się na paczki, po prostu leżą obok siebie i są aktualizowane w jednym commicie.</p><p>Najważniejsza korzyść dla kogoś, kto utrzymuje design system, nazywa się <strong>atomic change</strong> (zmiana atomowa). Zmieniasz API komponentu i w tym samym pull requeście poprawiasz wszystkie 40 miejsc użycia. Nie ma okresu, w którym połowa firmy siedzi na starej wersji, bo nikt nie zdążył podbić zależności.</p><p>Warstwy narzędzi układają się tak:</p><ul><li><strong>pnpm workspaces</strong> - instalacja i dowiązania między paczkami. pnpm używa twardych dowiązań do współdzielonego magazynu, więc <code>node_modules</code> zajmuje ułamek tego co przy npm i instalacja jest kilkukrotnie szybsza.</li><li><strong>Turborepo</strong> - uruchamianie zadań w kolejności wynikającej z grafu zależności, z cache lokalnym i zdalnym. Konfiguracja to jeden plik.</li><li><strong>Nx</strong> - to samo plus generatory, reguły granic modułów, wtyczki i wykres projektów. Więcej mocy, więcej konfiguracji.</li></ul><pre><code>pnpm nx affected -t build test lint --base=origin/main</code></pre><p>Ta komenda jest sednem tematu. Narzędzie liczy diff względem gałęzi bazowej, wyznacza zbiór projektów dotkniętych zmianą i uruchamia zadania tylko dla nich. Każde zadanie dostaje hash z plików wejściowych, zależności i konfiguracji, a wynik ląduje w cache.</p><p>Analogia frontendowa: to dokładnie ta sama idea, co memoizacja w React. Nie przeliczasz komponentu, którego propsy się nie zmieniły. Tu propsami są pliki i zależności.</p>',
          en: '<p>A monorepo is one repository holding many applications and many libraries, versioned together. It is not a monolith: the code is still split into packages, they simply sit side by side and get updated in one commit.</p><p>The biggest win for anyone maintaining a design system is the <strong>atomic change</strong>. You change a component API and fix all 40 call sites in the same pull request. There is no window where half the company sits on the old version because nobody got around to bumping the dependency.</p><p>The tooling layers stack like this:</p><ul><li><strong>pnpm workspaces</strong> - installation and linking between packages. pnpm hard-links from a shared store, so <code>node_modules</code> takes a fraction of the npm footprint and installs run several times faster.</li><li><strong>Turborepo</strong> - runs tasks in dependency-graph order with local and remote caching. Configuration is a single file.</li><li><strong>Nx</strong> - the same plus generators, module boundary rules, plugins and a project graph. More power, more configuration.</li></ul><pre><code>pnpm nx affected -t build test lint --base=origin/main</code></pre><p>That command is the heart of the topic. The tool diffs against the base branch, computes the set of projects the change touches and runs tasks only for those. Every task gets a hash of its input files, dependencies and configuration, and the result lands in the cache.</p><p>Frontend analogy: this is exactly memoization in React. You do not recompute a component whose props did not change. Here the props are files and dependencies.</p>'
        },
        pro: {
          pl: '<p>W skali telco pytanie nie brzmi monorepo czy polyrepo, tylko: gdzie stawiam granicę repozytorium, żeby koszt koordynacji był najniższy. Monorepo zamienia problem wersjonowania na problem wydajności CI, a problem wydajności CI da się kupić za pieniądze i inżynierię. Problem koordynacji dwudziestu zespołów siedzących na sześciu wersjach design systemu kupić się nie da.</p><h4>Realne liczby</h4><p>Repo z 40 projektami i 300 tysiącami linii to zwykle 20-30 minut pełnego builda i 6-9 minut przy affected plus cache. Migracja z npm na pnpm potrafi ściąć czas instalacji z 4 minut do 50 sekund i zmniejszyć <code>node_modules</code> z 2 GB do 400 MB. Zdrowy wskaźnik trafień w zdalny cache na CI to 60-80 procent. Poniżej 40 procent masz niedeterministyczne zadania i to jest bug do zdiagnozowania, nie stan natury.</p><h4>Nx czy Turborepo</h4><ul><li><strong>Turborepo</strong>: mniejszy koncepcyjnie, konfiguracja w <code>turbo.json</code>, świetny gdy każdy projekt ma już własne skrypty i chcesz tylko orkiestracji plus cache. Bierz, gdy zespoły są dojrzałe i chcą autonomii.</li><li><strong>Nx</strong>: wykres projektów, <code>nx release</code>, generatory wymuszające strukturę, migracje wersji (<code>nx migrate</code>) i reguły granic. Bierz, gdy jesteś właścicielem platformy i chcesz standaryzować sto repozytoriów w jedno.</li></ul><p>Praktyczna rada polityczna: Nx daje więcej dźwigni platformowej, ale zwiększa liczbę rzeczy, których zespoły nie rozumieją i za które będą winić Ciebie. Jeżeli nie masz dedykowanej osoby od platformy w wymiarze co najmniej pół etatu, Turborepo jest bezpieczniejszym wyborem.</p><h4>Konfiguracja, która realnie decyduje</h4><pre><code>{\n  "tasks": {\n    "build": {\n      "dependsOn": ["^build"],\n      "inputs": ["src/**", "package.json", "$TURBO_DEFAULT$"],\n      "outputs": ["dist/**"],\n      "env": ["NEXT_PUBLIC_API_URL"]\n    }\n  }\n}</code></pre><p>Deklaracja <code>env</code> to najczęstsze źródło zatrutego cache: build zapieczony ze zmienną z innego środowiska trafia na produkcję i wygląda jak duch. Analogicznie zadanie zapisujące poza <code>outputs</code> daje trafienia w cache, po których brakuje plików.</p><h4>Twarde pułapki</h4><ul><li><strong>CODEOWNERS i review.</strong> Jedno repo bez granic własności oznacza, że każdy PR czeka na Ciebie. Ustaw właścicieli katalogowo i wymagaj recenzji tylko od właściciela zmienianego obszaru.</li><li><strong>Historia i wydajność gita.</strong> Powyżej kilkuset tysięcy plików potrzebujesz <code>partial clone</code> i <code>sparse-checkout</code>, inaczej klonowanie boli.</li><li><strong>Nie wszystko musi wejść.</strong> Repo mobilne z 4 GB assetów i innym cyklem wydawniczym zostaw osobno. Monorepo to narzędzie dla kodu, który zmienia się razem.</li></ul><p>Na rozmowie na poziomie principal oczekuje się zdania: monorepo jest odpowiedzią na koszt koordynacji, a nie na koszt kodu, i płaci się za nie dyscypliną narzędziową.</p>',
          en: '<p>At telco scale the question is not monorepo versus polyrepo, it is where to draw the repository boundary so coordination cost is lowest. A monorepo converts a versioning problem into a CI performance problem, and CI performance can be bought with money and engineering. The coordination problem of twenty teams sitting on six versions of the design system cannot be bought.</p><h4>Real numbers</h4><p>A repo with 40 projects and 300k lines typically means a 20-30 minute full build and 6-9 minutes with affected plus caching. Migrating from npm to pnpm often cuts install time from 4 minutes to 50 seconds and shrinks <code>node_modules</code> from 2 GB to 400 MB. A healthy remote cache hit rate in CI is 60-80 percent. Below 40 percent you have non-deterministic tasks, and that is a bug to diagnose, not a fact of life.</p><h4>Nx or Turborepo</h4><ul><li><strong>Turborepo</strong>: conceptually smaller, configured in <code>turbo.json</code>, excellent when every project already owns its scripts and you only want orchestration plus caching. Pick it when teams are mature and want autonomy.</li><li><strong>Nx</strong>: project graph, <code>nx release</code>, generators that enforce structure, version migrations (<code>nx migrate</code>) and boundary rules. Pick it when you own the platform and want to standardize a hundred repos into one.</li></ul><p>A political note: Nx gives more platform leverage but increases the number of things teams do not understand and will blame you for. Without at least a half-time platform owner, Turborepo is the safer bet.</p><h4>The configuration that actually decides outcomes</h4><pre><code>{\n  "tasks": {\n    "build": {\n      "dependsOn": ["^build"],\n      "inputs": ["src/**", "package.json", "$TURBO_DEFAULT$"],\n      "outputs": ["dist/**"],\n      "env": ["NEXT_PUBLIC_API_URL"]\n    }\n  }\n}</code></pre><p>The <code>env</code> declaration is the most common source of cache poisoning: a build baked with a variable from another environment reaches production and looks like a ghost. Equally, a task writing outside <code>outputs</code> produces cache hits with missing files.</p><h4>Hard pitfalls</h4><ul><li><strong>CODEOWNERS and review load.</strong> One repo with no ownership boundaries means every PR waits on you. Assign owners per directory and require review only from the owner of the changed area.</li><li><strong>Git performance.</strong> Past a few hundred thousand files you need partial clone and sparse-checkout, otherwise cloning hurts.</li><li><strong>Not everything belongs inside.</strong> A mobile repo with 4 GB of assets and a different release cadence stays separate. A monorepo is for code that changes together.</li></ul><p>At principal level the expected sentence is: a monorepo answers coordination cost, not code cost, and you pay for it with tooling discipline.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Co robi komenda typu nx affected lub turbo run z filtrem po zmianach?', en: 'What does a command like nx affected or a change-filtered turbo run actually do?' },
          options: [
            { pl: 'Uruchamia zadania tylko dla projektów dotkniętych zmianą względem gałęzi bazowej', en: 'Runs tasks only for projects touched by the change relative to the base branch' },
            { pl: 'Buduje wszystkie projekty, ale w kolejności alfabetycznej', en: 'Builds every project, just in alphabetical order' },
            { pl: 'Usuwa nieużywane zależności z package.json', en: 'Removes unused dependencies from package.json' },
            { pl: 'Scala wszystkie paczki w jeden bundle', en: 'Merges all packages into a single bundle' }
          ],
          correct: 0,
          explain: {
            pl: 'Narzędzie liczy diff do bazy, przechodzi graf zależności w górę i uruchamia zadania wyłącznie dla dotkniętych projektów. Reszta idzie z cache lub jest pomijana.',
            en: 'The tool diffs against the base, walks the dependency graph upward and runs tasks only for the touched projects. The rest comes from cache or is skipped.'
          }
        },
        {
          q: { pl: 'Największa przewaga monorepo dla właściciela design systemu to:', en: 'The biggest monorepo advantage for a design system owner is:' },
          options: [
            { pl: 'Mniejszy rozmiar bundle w produkcji', en: 'Smaller production bundle size' },
            { pl: 'Brak potrzeby pisania testów', en: 'Not having to write tests' },
            { pl: 'Zmiana atomowa: nowe API komponentu i wszystkie miejsca użycia w jednym PR', en: 'The atomic change: a new component API and every call site in one PR' },
            { pl: 'Automatyczne generowanie dokumentacji', en: 'Automatic documentation generation' }
          ],
          correct: 2,
          explain: {
            pl: 'Monorepo likwiduje okno, w którym konsumenci siedzą na starych wersjach. Rozmiar bundle i dokumentacja to zupełnie inne osie.',
            en: 'A monorepo removes the window in which consumers sit on old versions. Bundle size and docs are entirely different axes.'
          }
        },
        {
          q: { pl: 'Wskaźnik trafień w zdalny cache na CI spadł do 25 procent. Najbardziej prawdopodobna przyczyna?', en: 'Your remote cache hit rate in CI dropped to 25 percent. Most likely cause?' },
          options: [
            { pl: 'Za mało pamięci RAM na runnerach CI', en: 'Not enough RAM on the CI runners' },
            { pl: 'Zadania nie są deterministyczne: znacznik czasu lub niezadeklarowana zmienna środowiskowa wchodzi do hasha', en: 'Tasks are not deterministic: a timestamp or an undeclared env var enters the hash' },
            { pl: 'Zespół pisze zbyt duże pull requesty', en: 'The team writes overly large pull requests' },
            { pl: 'Cache zdalny działa tylko dla zadań testowych', en: 'Remote caching only works for test tasks' }
          ],
          correct: 1,
          explain: {
            pl: 'Cache trafia tylko wtedy, gdy hash wejść się powtarza. Wstrzykiwany build timestamp albo zmienna spoza deklaracji inputs zmieniają hash przy każdym uruchomieniu.',
            en: 'Caches hit only when the input hash repeats. An injected build timestamp or a variable outside the declared inputs changes the hash on every run.'
          }
        },
        {
          q: { pl: 'Zadanie build zapisuje wygenerowane typy do katalogu poza zadeklarowanym outputs. Co się stanie po trafieniu w cache?', en: 'A build task writes generated types outside its declared outputs directory. What happens on a cache hit?' },
          options: [
            { pl: 'Nic, cache i tak przywraca całe drzewo katalogów', en: 'Nothing, the cache restores the whole directory tree anyway' },
            { pl: 'Zadanie zostanie automatycznie uruchomione ponownie', en: 'The task will be rerun automatically' },
            { pl: 'Cache odmówi zapisu takiego zadania', en: 'The cache will refuse to store such a task' },
            { pl: 'Kolejne zadania zobaczą brakujące pliki i wywalą się losowo, głównie na CI', en: 'Downstream tasks see missing files and fail randomly, mostly in CI' }
          ],
          correct: 3,
          explain: {
            pl: 'Cache przywraca dokładnie to, co zadeklarowano w outputs. Efekty uboczne poza tym katalogiem znikają przy trafieniu, co daje klasyczne u mnie działa.',
            en: 'The cache restores exactly what outputs declared. Side effects outside that directory vanish on a hit, producing the classic works-on-my-machine failure.'
          }
        }
      ]
    },
    {
      id: 'micro-frontends-tradeoffs',
      title: { pl: 'Micro-frontendy: kiedy warto, a kiedy to koszt bez zysku', en: 'Micro-frontends: when they pay off and when they are pure cost' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Micro-frontend (MFE)', en: 'Micro-frontend (MFE)' },
          def: {
            pl: 'Kawałek interfejsu budowany, testowany i wdrażany niezależnie, składany w całość dopiero u użytkownika albo na krawędzi. Kupuje jedno: niezależny cykl wydawniczy zespołu.',
            en: 'A slice of UI built, tested and deployed independently, composed into a whole only in the browser or at the edge. It buys exactly one thing: an independent release cadence per team.'
          }
        },
        {
          term: { pl: 'Shell (aplikacja gospodarz)', en: 'Shell (host app)' },
          def: {
            pl: 'Aplikacja platformowa, która trzyma routing, sesję i layout, a następnie montuje w wyznaczonych miejscach zdalne moduły. Właściciel shella jest właścicielem kontraktu.',
            en: 'The platform application that owns routing, session and layout and mounts remote modules into designated slots. Whoever owns the shell owns the contract.'
          }
        },
        {
          term: { pl: 'Module Federation', en: 'Module Federation' },
          def: {
            pl: 'Mechanizm bundlera (webpack 5, Rspack, wtyczka Vite) pozwalający pobrać moduł z innego builda po URL w czasie działania aplikacji, przez plik <code>remoteEntry</code>.',
            en: 'A bundler mechanism (webpack 5, Rspack, a Vite plugin) that fetches a module from another build by URL at runtime, through a <code>remoteEntry</code> file.'
          }
        },
        {
          term: { pl: 'Shared singleton', en: 'Shared singleton' },
          def: {
            pl: 'Zależność (React, design system, klient sesji) ładowana raz dla wszystkich MFE. Usuwa duplikację kodu, ale wymusza wspólną, kompatybilną wersję - czyli przywraca sprzężenie.',
            en: 'A dependency (React, the design system, the session client) loaded once for all MFEs. It removes duplication but forces one compatible version, which brings the coupling back.'
          }
        },
        {
          term: { pl: 'Kontrakt montowania', en: 'Mount contract' },
          def: {
            pl: 'Jawnie wersjonowane API między shellem a MFE (<code>apiVersion</code>, przekazywane dane, callbacki). Bez wersjonowania pierwsze złamanie kontraktu blokuje wszystkie zespoły naraz.',
            en: 'The explicitly versioned API between shell and MFE (<code>apiVersion</code>, passed data, callbacks). Without versioning, the first break blocks every team at once.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="mfe1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="140" y="30" width="360" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="56" text-anchor="middle" font-size="15" fill="var(--text)">Shell: routing, auth, layout</text>' +
          '<text x="320" y="77" text-anchor="middle" font-size="13" fill="var(--muted)">owned by the platform team</text>' +
          '<rect x="20" y="160" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="110" y="188" text-anchor="middle" font-size="14" fill="var(--text)">MFE: billing</text>' +
          '<text x="110" y="209" text-anchor="middle" font-size="13" fill="var(--muted)">team A, own deploy</text>' +
          '<rect x="230" y="160" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="188" text-anchor="middle" font-size="14" fill="var(--text)">MFE: offers</text>' +
          '<text x="320" y="209" text-anchor="middle" font-size="13" fill="var(--muted)">team B, own deploy</text>' +
          '<rect x="440" y="160" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="530" y="188" text-anchor="middle" font-size="14" fill="var(--text)">MFE: support</text>' +
          '<text x="530" y="209" text-anchor="middle" font-size="13" fill="var(--muted)">team C, own deploy</text>' +
          '<path d="M250,90 L120,155" stroke="var(--muted)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<path d="M320,90 L320,155" stroke="var(--muted)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<path d="M390,90 L520,155" stroke="var(--muted)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<rect x="140" y="300" width="360" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="328" text-anchor="middle" font-size="14" fill="var(--text)">Shared singletons</text>' +
          '<text x="320" y="350" text-anchor="middle" font-size="13" fill="var(--muted)">framework, design system, auth token</text>' +
          '<path d="M110,232 L250,296" stroke="var(--warn)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<path d="M320,232 L320,296" stroke="var(--warn)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<path d="M530,232 L390,296" stroke="var(--warn)" stroke-width="2" marker-end="url(#mfe1-a)"/>' +
          '<text x="320" y="400" text-anchor="middle" font-size="13" fill="var(--muted)">every singleton is a coupling you pay for at runtime</text>' +
          '</svg>',
        caption: {
          pl: 'Micro-frontendy kupują niezależny deploy zespołów, ale wszystko, co współdzielone w runtime - framework, design system, sesja - wraca jako sprzężenie i ryzyko produkcyjne.',
          en: 'Micro-frontends buy independent team deploys, but everything shared at runtime - framework, design system, session - comes back as coupling and production risk.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie galerię handlową. Jest jeden budynek, jedno wejście, jedna ochrona i jeden system klimatyzacji. W środku każdy sklep urządza się sam i otwiera, kiedy chce. To są micro-frontendy: jedna strona, ale różne kawałki robione przez różne ekipy.</p><p>Brzmi świetnie, bo nikt nie czeka na nikogo z otwarciem. Tylko że galeria ma części wspólne. Jeśli jeden sklep wystawi na korytarz swoją muzykę na cały regulator, słychać ją wszędzie. Jeśli ochrona zmieni zasady wejścia, wszystkie sklepy muszą się dostosować tego samego dnia.</p><p>Dlatego galeria działa tylko wtedy, gdy jest duża. Przy trzech sklepach taniej jest zrobić jeden zwykły sklep z trzema działami, niż budować całą infrastrukturę wspólnych korytarzy, wind i ochrony.</p><p>Zasada jest prosta: micro-frontendy rozwiązują problem ludzi, którzy sobie przeszkadzają, a nie problem kodu, który jest brzydki. Jeśli nie masz wielu ekip, które realnie sobie przeszkadzają, budujesz sobie galerię dla trzech sklepów.</p>',
          en: '<p>Picture a shopping mall. One building, one entrance, one security team, one air conditioning system. Inside, every shop fits out its own space and opens whenever it likes. That is micro-frontends: one page, but different pieces built by different crews.</p><p>It sounds great, because nobody waits for anybody else to open. But the mall has shared parts. If one shop blasts its music into the corridor, everyone hears it. If security changes the entry rules, every shop has to adapt on the same day.</p><p>That is why malls only work when they are big. With three shops it is cheaper to build one ordinary shop with three departments than to build corridors, lifts and a security desk.</p><p>The rule is simple: micro-frontends solve a problem of people getting in each other way, not a problem of ugly code. If you do not have many crews genuinely blocking each other, you are building a mall for three shops.</p>'
        },
        school: {
          pl: '<p><strong>Micro-frontend</strong> (MFE) to kawałek interfejsu budowany, testowany i wdrażany niezależnie, składany w całość dopiero u użytkownika albo na krawędzi. Typowe techniki składania:</p><ul><li><strong>Runtime, Module Federation</strong> (webpack 5, Vite plugin, Rspack) - shell pobiera zdalny moduł po URL w czasie działania aplikacji.</li><li><strong>Build time</strong> - każdy MFE publikuje paczkę npm, shell ją instaluje. Najprostsze, ale traci niezależny deploy.</li><li><strong>Server side lub edge</strong> - składanie fragmentów HTML, np. przez Nginx SSI albo warstwę BFF.</li><li><strong>Web Components</strong> - MFE eksponuje custom element, shell go po prostu montuje. Neutralne frameworkowo, świetne dla design systemów.</li></ul><p>Kluczowe pytanie brzmi: co kupujesz. Kupujesz jedno - <em>niezależny cykl wydawniczy</em>. Zespół billing wdraża w środę, zespół offers w czwartek, i nie muszą uzgadniać release train.</p><p>Płacisz za to trzema rzeczami. Po pierwsze rozmiarem: jeżeli trzy MFE ładują własną kopię Reacta, użytkownik pobiera trzy razy framework. Po drugie kompatybilnością: shell i MFE komunikują się po kontrakcie, który staje się publicznym API i wymaga wersjonowania. Po trzecie debugowaniem: błąd widoczny na ekranie może pochodzić z kodu wdrożonego przez inny zespół dwie godziny temu.</p><pre><code>// shell: kontrakt musi byc jawny i wersjonowany\nmount(el, {\n  apiVersion: 1,\n  user: { id, segment },\n  onNavigate: (path) =&gt; router.push(path)\n});</code></pre><p>Analogia: MFE to mikroserwisy przeniesione do przeglądarki, tylko bez sieciowej izolacji. Wszystkie działają w jednym procesie, na jednym DOM i na jednej puli pamięci.</p>',
          en: '<p>A <strong>micro-frontend</strong> (MFE) is a slice of UI built, tested and deployed independently, composed into a whole only in the browser or at the edge. Typical composition techniques:</p><ul><li><strong>Runtime, Module Federation</strong> (webpack 5, a Vite plugin, Rspack) - the shell fetches a remote module by URL while the app is running.</li><li><strong>Build time</strong> - each MFE publishes an npm package the shell installs. Simplest, but you lose independent deploys.</li><li><strong>Server side or edge</strong> - HTML fragment composition, for example via Nginx SSI or a BFF layer.</li><li><strong>Web Components</strong> - the MFE exposes a custom element and the shell just mounts it. Framework neutral, excellent for design systems.</li></ul><p>The key question is what you are buying. You buy exactly one thing: an <em>independent release cadence</em>. The billing team ships on Wednesday, the offers team on Thursday, and they never negotiate a release train.</p><p>You pay in three currencies. Size: if three MFEs load their own copy of React, the user downloads the framework three times. Compatibility: shell and MFE talk over a contract that becomes a public API and needs versioning. Debuggability: an error on screen may come from code another team deployed two hours ago.</p><pre><code>// shell: the contract must be explicit and versioned\nmount(el, {\n  apiVersion: 1,\n  user: { id, segment },\n  onNavigate: (path) =&gt; router.push(path)\n});</code></pre><p>The analogy: MFEs are microservices moved into the browser, minus the network isolation. They all run in one process, on one DOM, on one memory pool.</p>'
        },
        pro: {
          pl: '<p>Micro-frontendy to rozwiązanie organizacyjne udające architektoniczne. Jedyna uczciwa przesłanka brzmi: mamy N zespołów, których cykle wydawnicze realnie się blokują, i koszt tej blokady jest wyższy niż koszt utrzymania platformy kompozycyjnej. W telco taki próg pojawia się zwykle powyżej pięciu, sześciu autonomicznych zespołów produktowych na jednym portalu.</p><h4>Koszty, które trzeba wycenić przed decyzją</h4><ul><li><strong>Waga runtime.</strong> React 18 plus ReactDOM to około 45 kB gzip. Trzy niezdedublowane kopie to 135 kB czystej straty i, co gorsze, trzy niezależne drzewa reconcilera. Module Federation ma <code>shared: { react: { singleton: true, requiredVersion } }</code>, ale singleton oznacza, że wszystkie MFE muszą chodzić na kompatybilnej wersji, czyli właśnie odzyskałeś sprzężenie, przed którym uciekałeś.</li><li><strong>Design system jako singleton.</strong> To jest Twój codzienny ból. CHI ładowany dwa razy to podwójne style, konflikty custom elements (<code>customElements.define</code> rzuci przy drugiej rejestracji tej samej nazwy) i rozjechany theming. Web Components z jawnym rejestrem wersji i strategią pierwszy wygrywa są tu bezpieczniejsze niż moduły ESM.</li><li><strong>Wydajność wejścia.</strong> Kompozycja runtime dokłada kaskadę requestów: shell, remoteEntry, chunk MFE. To zwykle 200-500 ms do LCP na 4G. Prefetch remoteEntry w shellu bywa najtańszą wygraną.</li><li><strong>Obserwowalność.</strong> Potrzebujesz jednego source mapa i jednego Sentry z tagiem wersji per MFE, inaczej triage trwa godzinami.</li></ul><h4>Kontrakt, który ratuje projekt</h4><pre><code>// wersjonowany kontrakt montowania, MFE deklaruje, co obsluguje\nexport const contract = { apiVersion: 2, requires: ["session", "navigate"] };\nexport function mount(el, host) {\n  if (host.apiVersion &lt; 2) return host.fallback("upgrade shell");\n  // ...\n}</code></pre><p>Bez tego pierwsze twarde złamanie kontraktu zablokuje wszystkie zespoły naraz i cała obietnica niezależności wyparuje w jednym incydencie.</p><h4>Alternatywy, które zwykle wygrywają</h4><p>Zanim wprowadzisz MFE, sprawdź trzy tańsze opcje. Monorepo z osobnymi pipeline per aplikacja daje niezależny deploy bez kompozycji runtime. Podział na osobne aplikacje pod różnymi ścieżkami (twarda nawigacja między <code>/billing</code> a <code>/shop</code>) daje pełną izolację za darmo, jeśli użytkownik i tak nie przechodzi między nimi co 10 sekund. Wreszcie same feature flagi rozwiązują większość konfliktów wydawniczych, o których myślisz, że wymagają MFE.</p><p>Zdanie na poziomie principal: micro-frontendy to zamiana kosztu koordynacji na koszt runtime i operacji. Rekomendujesz je tylko wtedy, gdy potrafisz nazwać zespoły, które dziś na siebie czekają, i pokazać liczbę zablokowanych wdrożeń w miesiącu.</p>',
          en: '<p>Micro-frontends are an organizational solution wearing an architectural costume. The only honest premise is: we have N teams whose release cycles genuinely block each other, and that blocking costs more than running a composition platform. At a telco that threshold usually appears above five or six autonomous product teams on one portal.</p><h4>Costs to price before deciding</h4><ul><li><strong>Runtime weight.</strong> React 18 plus ReactDOM is roughly 45 kB gzipped. Three undeduplicated copies is 135 kB of pure waste and, worse, three independent reconciler trees. Module Federation offers <code>shared: { react: { singleton: true, requiredVersion } }</code>, but singleton means every MFE must run a compatible version, which is exactly the coupling you were escaping.</li><li><strong>The design system as a singleton.</strong> This is your daily pain. CHI loaded twice means duplicated styles, custom element collisions (<code>customElements.define</code> throws on a second registration of the same name) and broken theming. Web Components with an explicit version registry and a first-wins policy are safer here than ESM modules.</li><li><strong>Entry performance.</strong> Runtime composition adds a request waterfall: shell, remoteEntry, MFE chunk. That is typically 200-500 ms of LCP on 4G. Prefetching remoteEntry from the shell is often the cheapest win.</li><li><strong>Observability.</strong> You need one source map pipeline and one Sentry with a version tag per MFE, otherwise triage takes hours.</li></ul><h4>The contract that saves the project</h4><pre><code>// versioned mount contract, the MFE declares what it supports\nexport const contract = { apiVersion: 2, requires: ["session", "navigate"] };\nexport function mount(el, host) {\n  if (host.apiVersion &lt; 2) return host.fallback("upgrade shell");\n  // ...\n}</code></pre><p>Without it the first hard contract break blocks every team at once and the whole independence promise evaporates in a single incident.</p><h4>Alternatives that usually win</h4><p>Before introducing MFEs, check three cheaper options. A monorepo with per-application pipelines gives independent deploys without runtime composition. Splitting into separate apps under different paths (a hard navigation between <code>/billing</code> and <code>/shop</code>) gives full isolation for free if users do not hop between them every ten seconds. Finally, feature flags alone resolve most of the release conflicts you think require MFEs.</p><p>The principal-level sentence: micro-frontends trade coordination cost for runtime and operational cost. Recommend them only when you can name the teams waiting on each other today and show the number of blocked deployments per month.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Jaką konkretną korzyść kupujesz, wprowadzając micro-frontendy?', en: 'What concrete benefit do micro-frontends actually buy you?' },
          options: [
            { pl: 'Mniejszy bundle dla użytkownika', en: 'A smaller bundle for the user' },
            { pl: 'Niezależny cykl wydawniczy zespołów', en: 'An independent release cadence per team' },
            { pl: 'Lepszą wydajność renderowania', en: 'Better rendering performance' },
            { pl: 'Prostsze debugowanie produkcji', en: 'Simpler production debugging' }
          ],
          correct: 1,
          explain: {
            pl: 'MFE kupują autonomię wdrożeń. Rozmiar, wydajność i debugowanie zwykle się pogarszają - to jest cena, którą płacisz.',
            en: 'MFEs buy deployment autonomy. Size, performance and debuggability usually get worse - that is the price you pay.'
          }
        },
        {
          q: { pl: 'Ustawiasz React jako shared singleton w Module Federation. Jaki jest tego skutek uboczny?', en: 'You mark React as a shared singleton in Module Federation. What is the side effect?' },
          options: [
            { pl: 'Każdy MFE dostaje własną, izolowaną instancję Reacta', en: 'Each MFE gets its own isolated React instance' },
            { pl: 'Nie da się już używać hooków w MFE', en: 'Hooks stop working inside MFEs' },
            { pl: 'Wszystkie MFE muszą chodzić na kompatybilnej wersji Reacta, czyli wraca sprzężenie', en: 'Every MFE must run a compatible React version, so the coupling returns' },
            { pl: 'Shell przestaje kontrolować routing', en: 'The shell loses control of routing' }
          ],
          correct: 2,
          explain: {
            pl: 'Singleton usuwa duplikację kodu, ale wymusza wspólną wersję. To klasyczny kompromis: albo rozmiar, albo niezależność wersji.',
            en: 'A singleton removes duplication but forces a shared version. That is the classic tradeoff: bundle size or version independence.'
          }
        },
        {
          q: { pl: 'Dwa MFE ładują różne wersje tego samego design systemu opartego o Web Components. Co się stanie najpierw?', en: 'Two MFEs load different versions of the same Web Components design system. What breaks first?' },
          options: [
            { pl: 'Druga rejestracja tej samej nazwy custom elementu rzuci błąd i jeden MFE się nie wyrenderuje', en: 'The second registration of the same custom element name throws and one MFE fails to render' },
            { pl: 'Przeglądarka automatycznie wybierze nowszą wersję', en: 'The browser automatically picks the newer version' },
            { pl: 'Style zostaną scalone bez konfliktów dzięki Shadow DOM', en: 'Styles merge conflict-free thanks to Shadow DOM' },
            { pl: 'Nic, custom elementy są izolowane per moduł', en: 'Nothing, custom elements are isolated per module' }
          ],
          correct: 0,
          explain: {
            pl: 'Rejestr custom elementów jest globalny dla dokumentu, więc drugie customElements.define z tą samą nazwą rzuca wyjątek. Potrzebujesz jawnej strategii wersjonowania i pierwszy wygrywa.',
            en: 'The custom element registry is global to the document, so a second customElements.define with the same name throws. You need an explicit versioning and first-wins strategy.'
          }
        },
        {
          q: { pl: 'Zespół chce MFE, bo build jednej aplikacji trwa 25 minut i wszyscy czekają. Najlepsza rekomendacja principala?', en: 'A team wants MFEs because one app takes 25 minutes to build and everyone waits. Best principal-level recommendation?' },
          options: [
            { pl: 'Wprowadzić Module Federation, bo to jedyny sposób na krótsze buildy', en: 'Adopt Module Federation, the only way to shorten builds' },
            { pl: 'Najpierw naprawić CI: affected plus cache i osobne pipeline, bo to nie jest problem architektury runtime', en: 'Fix CI first: affected plus caching and per-app pipelines, because this is not a runtime architecture problem' },
            { pl: 'Podzielić repozytorium na osobne repo per zespół i wersjonować przez npm', en: 'Split into one repo per team and version everything through npm' },
            { pl: 'Zrezygnować z testów w pipeline, żeby build był szybszy', en: 'Drop tests from the pipeline to make the build faster' }
          ],
          correct: 1,
          explain: {
            pl: 'Wolny pipeline to problem narzędzi CI, a nie kompozycji runtime. MFE dołożyłyby koszt operacyjny, nie skracając buildu w sposób, którego nie da się osiągnąć taniej.',
            en: 'A slow pipeline is a CI tooling problem, not a runtime composition problem. MFEs would add operational cost without a build win you cannot get more cheaply.'
          }
        }
      ]
    },
    {
      id: 'shared-libs-boundaries',
      title: { pl: 'Biblioteki współdzielone i granice modułów', en: 'Shared libraries and module boundaries' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Taksonomia bibliotek', en: 'Library taxonomy' },
          def: {
            pl: 'Każda paczka dostaje typ warstwy (<code>app</code>, <code>feature</code>, <code>ui</code>, <code>util</code>, <code>data</code>) i zakres biznesowy (<code>scope:billing</code>). Bez tagów nie da się zapisać żadnej reguły zależności.',
            en: 'Every package gets a layer type (<code>app</code>, <code>feature</code>, <code>ui</code>, <code>util</code>, <code>data</code>) and a business scope (<code>scope:billing</code>). Without tags no dependency rule can be expressed.'
          }
        },
        {
          term: { pl: 'Reguły granic modułów', en: 'Module boundary rules' },
          def: {
            pl: 'Lint egzekwowany w CI (<code>@nx/enforce-module-boundaries</code>, dependency-cruiser), który pozwala zależnościom iść tylko w dół warstw i w obrębie zakresu. Naruszenie musi blokować merge.',
            en: 'A lint rule enforced in CI (<code>@nx/enforce-module-boundaries</code>, dependency-cruiser) that lets dependencies point only downward through layers and inside a scope. A violation must block the merge.'
          }
        },
        {
          term: { pl: 'Publiczne API paczki', en: 'Package public API' },
          def: {
            pl: 'Biblioteka eksportuje wyłącznie przez <code>index.ts</code>, a pole <code>exports</code> w <code>package.json</code> blokuje import po głębokiej ścieżce. Dopiero wtedy wnętrze zostaje refaktorowalne.',
            en: 'A library exports only through <code>index.ts</code>, and the <code>exports</code> field in <code>package.json</code> blocks deep imports. Only then does its internals stay refactorable.'
          }
        },
        {
          term: { pl: 'Reguła trzeciego użycia', en: 'Rule of three' },
          def: {
            pl: 'Kod trafia do biblioteki współdzielonej dopiero przy trzecim użyciu i tylko wtedy, gdy trzy przypadki są takie same <em>z tego samego powodu</em>. Duplikacja jest tańsza niż zła abstrakcja.',
            en: 'Code moves into a shared library only at the third usage, and only when the three cases are the same <em>for the same reason</em>. Duplication is cheaper than a wrong abstraction.'
          }
        },
        {
          term: { pl: 'Fan-in', en: 'Fan-in' },
          def: {
            pl: 'Liczba paczek zależnych od danej biblioteki. Wysoki fan-in katalogu typu <code>shared-utils</code> to zapowiedź incydentu: każda zmiana dotyka wszystkich konsumentów naraz.',
            en: 'The number of packages depending on a given library. A high fan-in on something like <code>shared-utils</code> predicts an incident: every change touches all consumers at once.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="lib1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ok)"/></marker>' +
          '<marker id="lib1-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--err)"/></marker></defs>' +
          '<rect x="30" y="30" width="580" height="66" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="58" text-anchor="middle" font-size="15" fill="var(--text)">type:app  billing, shop, admin</text>' +
          '<text x="320" y="79" text-anchor="middle" font-size="13" fill="var(--muted)">may depend on feature, ui, util</text>' +
          '<rect x="30" y="140" width="580" height="66" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="168" text-anchor="middle" font-size="15" fill="var(--text)">type:feature  checkout, tariff-picker</text>' +
          '<text x="320" y="189" text-anchor="middle" font-size="13" fill="var(--muted)">may depend on ui, util. never on app</text>' +
          '<rect x="30" y="250" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="170" y="278" text-anchor="middle" font-size="15" fill="var(--text)">type:ui  design system</text>' +
          '<text x="170" y="299" text-anchor="middle" font-size="13" fill="var(--muted)">no business logic</text>' +
          '<rect x="330" y="250" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="470" y="278" text-anchor="middle" font-size="15" fill="var(--text)">type:util  formatters, http</text>' +
          '<text x="470" y="299" text-anchor="middle" font-size="13" fill="var(--muted)">leaf, depends on nothing</text>' +
          '<path d="M170,246 L170,212" stroke="var(--ok)" stroke-width="2" marker-end="url(#lib1-a)"/>' +
          '<path d="M470,246 L470,212" stroke="var(--ok)" stroke-width="2" marker-end="url(#lib1-a)"/>' +
          '<path d="M320,136 L320,102" stroke="var(--ok)" stroke-width="2" marker-end="url(#lib1-a)"/>' +
          '<path d="M100,250 L100,110" stroke="var(--err)" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#lib1-b)"/>' +
          '<text x="120" y="358" font-size="13" fill="var(--err)">forbidden: ui importing app code or feature code</text>' +
          '<text x="120" y="384" font-size="13" fill="var(--muted)">enforced by lint rules, not by a wiki page</text>' +
          '</svg>',
        caption: {
          pl: 'Granice istnieją tylko wtedy, gdy pilnuje ich narzędzie. Warstwy z tagami plus reguła lintera zamieniają dobre intencje w błąd builda.',
          en: 'Boundaries exist only when a tool enforces them. Tagged layers plus a lint rule turn good intentions into a build error.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dom, w którym wszyscy chodzą wszędzie. Ktoś przechodzi przez łazienkę do kuchni, ktoś inny trzyma buty w lodówce. Na początku, gdy mieszkają tam dwie osoby, to nawet działa. Przy dwudziestu jest chaos.</p><p>Dlatego robimy drzwi i mówimy, kto którymi może chodzić. Piwnica jest dla wszystkich, ale piwnica nie ma prawa wchodzić na piętro. Kuchnia może brać rzeczy z piwnicy, ale nie może zaglądać do cudzych sypialni.</p><p>Najważniejsze jest to, że drzwi muszą być prawdziwe. Kartka na ścianie z napisem tędy nie chodzić nie działa, bo po pół roku nikt jej nie czyta, a nowi w ogóle jej nie widzieli.</p><p>W kodzie takim prawdziwym drzwiom mówimy reguła w linterze. Jeżeli ktoś spróbuje przejść przez ścianę, komputer od razu mówi nie i nie wpuszcza zmiany. Nikt nie musi się kłócić na spotkaniu, bo zasada broni się sama.</p>',
          en: '<p>Picture a house where everyone walks everywhere. Someone cuts through the bathroom to reach the kitchen, someone else keeps shoes in the fridge. With two residents it somehow works. With twenty it is chaos.</p><p>So you install doors and say who may use which. The basement serves everybody, but the basement has no business going upstairs. The kitchen may take things from the basement but may not wander into other people bedrooms.</p><p>The important part is that the doors must be real. A note on the wall saying do not walk here stops working after six months, because nobody reads it and newcomers never saw it.</p><p>In code, those real doors are called a lint rule. If someone tries to walk through a wall, the computer says no immediately and refuses the change. Nobody has to argue in a meeting, because the rule defends itself.</p>'
        },
        school: {
          pl: '<p>W dużym repozytorium największym zagrożeniem nie jest zły kod, tylko przypadkowe zależności. Wystarczy jeden import z biblioteki UI do modułu domenowego i po roku nie da się już wydzielić ani jednego, ani drugiego.</p><p>Skuteczny model ma trzy elementy.</p><p><strong>1. Taksonomia bibliotek.</strong> Każda paczka dostaje typ: <code>app</code>, <code>feature</code> (logika domenowa plus widoki), <code>ui</code> (komponenty bez wiedzy o domenie), <code>util</code> (czyste funkcje) i <code>data</code> (dostęp do API). Do tego zakres, czyli obszar biznesowy: <code>scope:billing</code>, <code>scope:shared</code>.</p><p><strong>2. Reguły zależności.</strong> Zależności idą tylko w dół warstw i tylko wewnątrz zakresu albo do <code>scope:shared</code>. W Nx robi to <code>@nx/enforce-module-boundaries</code>, w zwykłym repo <code>eslint-plugin-boundaries</code> albo <code>dependency-cruiser</code>.</p><pre><code>{\n  "sourceTag": "type:ui",\n  "onlyDependOnLibsWithTags": ["type:ui", "type:util"]\n}</code></pre><p><strong>3. Publiczne API paczki.</strong> Każda biblioteka eksportuje wyłącznie przez <code>index.ts</code>, a pole <code>exports</code> w <code>package.json</code> blokuje import po głębokiej ścieżce. Dzięki temu wnętrze pozostaje refaktorowalne, bo nikt nie zdążył się o nie oprzeć.</p><p>Analogia z TypeScriptu: to jest różnica między <code>public</code> a <code>private</code>, tylko na poziomie paczek zamiast klas. Bez tego każda linijka Twojego design systemu jest publicznym API, o czym dowiadujesz się dopiero przy próbie usunięcia czegokolwiek.</p><p>Warto też pilnować rozmiaru: biblioteka, do której wszyscy wrzucają wszystko, zwykle nazywa się <code>common</code> lub <code>shared-utils</code> i po dwóch latach jest najbardziej sprzężonym punktem systemu.</p>',
          en: '<p>In a large repository the biggest threat is not bad code, it is accidental dependencies. One import from the UI library into a domain module and a year later you can extract neither of them.</p><p>An effective model has three parts.</p><p><strong>1. A library taxonomy.</strong> Every package gets a type: <code>app</code>, <code>feature</code> (domain logic plus views), <code>ui</code> (components with no domain knowledge), <code>util</code> (pure functions) and <code>data</code> (API access). Plus a scope, the business area: <code>scope:billing</code>, <code>scope:shared</code>.</p><p><strong>2. Dependency rules.</strong> Dependencies flow downward through layers and only inside a scope or into <code>scope:shared</code>. Nx does this with <code>@nx/enforce-module-boundaries</code>; in a plain repo use <code>eslint-plugin-boundaries</code> or <code>dependency-cruiser</code>.</p><pre><code>{\n  "sourceTag": "type:ui",\n  "onlyDependOnLibsWithTags": ["type:ui", "type:util"]\n}</code></pre><p><strong>3. A package public API.</strong> Every library exports only through <code>index.ts</code>, and the <code>exports</code> field in <code>package.json</code> blocks deep imports. That keeps the internals refactorable, because nobody had the chance to lean on them.</p><p>The TypeScript analogy: this is <code>public</code> versus <code>private</code>, applied to packages instead of classes. Without it every line of your design system is public API, which you discover the first time you try to delete something.</p><p>Watch the size too: the library everyone dumps things into is usually called <code>common</code> or <code>shared-utils</code>, and after two years it is the most coupled point in the system.</p>'
        },
        pro: {
          pl: '<p>Granice to jedyny mechanizm, który skaluje się lepiej niż dyscyplina ludzi. Przy stu deweloperach każda zasada, której nie egzekwuje CI, jest zasadą nieistniejącą - z prostego powodu statystycznego: wystarczy jedna osoba, która jej nie zna, i po jednym sprincie masz precedens.</p><h4>Trzy poziomy egzekwowania</h4><ol><li><strong>Lint granic.</strong> <code>@nx/enforce-module-boundaries</code> lub <code>dependency-cruiser</code> uruchamiane w CI na całym grafie, nie tylko na zmienionych plikach. Błąd granicy musi blokować merge.</li><li><strong>Pola <code>exports</code> i <code>sideEffects</code>.</strong> <code>exports</code> zamyka głębokie importy na poziomie runtime i bundlera, więc nawet obejście lintera nic nie da. <code>sideEffects: false</code> pozwala bundlerowi usuwać nieużywane eksporty, co jest warunkiem sensownego tree-shakingu dużego design systemu.</li><li><strong>CODEOWNERS.</strong> Techniczna granica bez granicy własności to fikcja. Katalog bez właściciela w ciągu roku staje się wysypiskiem.</li></ol><h4>Projektowanie warstwy shared</h4><p>Reguła praktyczna: kod trafia do biblioteki współdzielonej dopiero przy trzecim użyciu, i tylko wtedy, gdy trzy przypadki wyglądają tak samo <em>z tego samego powodu</em>. Dwa fragmenty przypadkowo identyczne dziś rozjadą się za pół roku i wtedy dostaniesz parametr boolowski, potem drugi, a na końcu funkcję z ośmioma flagami. Preferuj duplikację nad złą abstrakcją: usunięcie duplikatu jest tanie, rozplątanie abstrakcji nie jest.</p><h4>Wersjonowanie w środku monorepo</h4><pre><code># fixed: jedna wersja dla calego design systemu\n# independent: kazda paczka wlasna wersja\nnx release --projects=tag:type:ui --dry-run</code></pre><p>Dla design systemu w telco wersjonowanie <em>fixed</em> jest zwykle lepsze: konsumenci zewnętrzni (aplikacje w innych repozytoriach) instalują jedną spójną wersję i nie muszą godzić macierzy kompatybilności. Wewnątrz monorepo i tak wszyscy jadą na HEAD, więc numer wersji służy głównie światu zewnętrznemu.</p><h4>Metryki, które warto pokazywać zarządowi</h4><ul><li>Liczba naruszeń granic w miesiącu i czas do naprawy.</li><li>Liczba głębokich importów spoza <code>index.ts</code>: docelowo zero.</li><li>Współczynnik rozgałęzienia (fan-in) najbardziej zależnych paczek - jeżeli <code>shared-utils</code> ma fan-in 38, to jest Twój przyszły incydent.</li><li>Odsetek komponentów design systemu z co najmniej jednym konsumentem: martwe komponenty to koszt utrzymania bez zwrotu.</li></ul><p>Element organizacyjny: granice zawsze będą kwestionowane, gdy blokują pilny release. Miej gotowy proces wyjątku - jawny plik allowlist z terminem ważności i właścicielem, przeglądany co kwartał. Wyjątek bez daty przydatności to po prostu nowa reguła.</p>',
          en: '<p>Boundaries are the only mechanism that scales better than human discipline. At a hundred developers, any rule CI does not enforce is a rule that does not exist, for a simple statistical reason: one person who has not heard of it, one sprint, and you have a precedent.</p><h4>Three enforcement levels</h4><ol><li><strong>Boundary linting.</strong> <code>@nx/enforce-module-boundaries</code> or <code>dependency-cruiser</code> run in CI over the whole graph, not only changed files. A boundary error must block the merge.</li><li><strong>The <code>exports</code> and <code>sideEffects</code> fields.</strong> <code>exports</code> closes deep imports at the runtime and bundler level, so routing around the linter buys nothing. <code>sideEffects: false</code> lets bundlers drop unused exports, a precondition for tree-shaking a large design system.</li><li><strong>CODEOWNERS.</strong> A technical boundary without an ownership boundary is fiction. A directory with no owner becomes a landfill within a year.</li></ol><h4>Designing the shared layer</h4><p>Practical rule: code moves into a shared library at the third usage, and only when all three cases look the same <em>for the same reason</em>. Two accidentally identical snippets will diverge in six months, and then you get a boolean parameter, then a second one, and finally a function with eight flags. Prefer duplication over the wrong abstraction: removing a duplicate is cheap, untangling an abstraction is not.</p><h4>Versioning inside a monorepo</h4><pre><code># fixed: one version for the whole design system\n# independent: each package versioned on its own\nnx release --projects=tag:type:ui --dry-run</code></pre><p>For a telco design system, <em>fixed</em> versioning usually wins: external consumers (apps in other repos) install one coherent version and never reconcile a compatibility matrix. Inside the monorepo everyone rides HEAD anyway, so the version number mostly serves the outside world.</p><h4>Metrics worth showing leadership</h4><ul><li>Boundary violations per month and time to fix.</li><li>Deep imports bypassing <code>index.ts</code>: target zero.</li><li>Fan-in of the most depended-on packages - if <code>shared-utils</code> has a fan-in of 38, that is your future incident.</li><li>Share of design system components with at least one consumer: dead components are maintenance cost with no return.</li></ul><p>The organizational piece: boundaries always get questioned when they block an urgent release. Have an exception process ready - an explicit allowlist file with an expiry date and an owner, reviewed quarterly. An exception with no expiry is just a new rule.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Po co bibliotece pole exports w package.json?', en: 'Why does a library need the exports field in package.json?' },
          options: [
            { pl: 'Żeby przyspieszyć instalację zależności', en: 'To speed up dependency installation' },
            { pl: 'Żeby zablokować importy po głębokiej ścieżce i utrzymać wnętrze paczki prywatnym', en: 'To block deep-path imports and keep the package internals private' },
            { pl: 'Żeby wygenerować dokumentację API', en: 'To generate API documentation' },
            { pl: 'Żeby ustawić kolejność ładowania modułów', en: 'To set module loading order' }
          ],
          correct: 1,
          explain: {
            pl: 'exports definiuje publiczną powierzchnię paczki na poziomie runtime i bundlera. Bez tego każdy plik wewnętrzny jest publicznym API.',
            en: 'exports defines the package public surface at the runtime and bundler level. Without it every internal file is public API.'
          }
        },
        {
          q: { pl: 'Która zależność łamie typową taksonomię warstw?', en: 'Which dependency violates a typical layer taxonomy?' },
          options: [
            { pl: 'feature importuje ui', en: 'feature imports ui' },
            { pl: 'app importuje feature', en: 'app imports feature' },
            { pl: 'ui importuje util', en: 'ui imports util' },
            { pl: 'util importuje feature', en: 'util imports feature' }
          ],
          correct: 3,
          explain: {
            pl: 'util jest liściem grafu i nie może zależeć od niczego wyżej. Import z warstwy feature zamienia go w ukryty moduł domenowy.',
            en: 'util is a leaf in the graph and must not depend on anything above it. Importing from feature turns it into a hidden domain module.'
          }
        },
        {
          q: { pl: 'Dwa zespoły mają prawie identyczną funkcję formatującą numer telefonu. Co robisz jako principal?', en: 'Two teams have nearly identical phone number formatting functions. What do you do as principal?' },
          options: [
            { pl: 'Natychmiast wydzielasz do shared-utils, duplikacja to zawsze błąd', en: 'Extract to shared-utils immediately, duplication is always a bug' },
            { pl: 'Sprawdzasz, czy są takie same z tego samego powodu, i przy dwóch przypadkach zostawiasz duplikację', en: 'Check whether they are the same for the same reason, and with only two cases leave the duplication' },
            { pl: 'Dodajesz parametr boolowski i jedną funkcję dla obu przypadków', en: 'Add a boolean parameter and one function covering both cases' },
            { pl: 'Przenosisz obie do biblioteki ui', en: 'Move both into the ui library' }
          ],
          correct: 1,
          explain: {
            pl: 'Przypadkowa duplikacja nie jest tym samym co wspólna abstrakcja. Reguła trzeciego użycia i pytanie o powód chronią przed funkcją z ośmioma flagami.',
            en: 'Incidental duplication is not a shared abstraction. The rule of three and the same-reason test protect you from a function with eight flags.'
          }
        },
        {
          q: { pl: 'Reguła granic blokuje pilny release. Jakie rozwiązanie jest najzdrowsze długoterminowo?', en: 'A boundary rule blocks an urgent release. What is the healthiest long-term solution?' },
          options: [
            { pl: 'Wyłączyć regułę w CI do czasu, aż zespół znajdzie czas', en: 'Disable the rule in CI until the team finds time' },
            { pl: 'Dodać eslint-disable w kilku plikach i iść dalej', en: 'Sprinkle eslint-disable in a few files and move on' },
            { pl: 'Jawny wpis na allowliście z właścicielem i datą wygaśnięcia, przeglądany co kwartał', en: 'An explicit allowlist entry with an owner and an expiry date, reviewed quarterly' },
            { pl: 'Przenieść cały kod do scope:shared, żeby reguła przestała obowiązywać', en: 'Move all the code into scope:shared so the rule stops applying' }
          ],
          correct: 2,
          explain: {
            pl: 'Wyjątki są nieuniknione, ale muszą być widoczne, przypisane i terminowe. Wyjątek bez daty przydatności staje się cichą nową regułą.',
            en: 'Exceptions are unavoidable, but they must be visible, owned and time-boxed. An exception with no expiry quietly becomes the new rule.'
          }
        }
      ]
    },
    {
      id: 'feature-flags-experiments',
      title: { pl: 'Feature flagi i eksperymenty', en: 'Feature flags and experiments' },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Feature flaga', en: 'Feature flag' },
          def: {
            pl: 'Przełącznik rozdzielający <strong>deployment</strong> (kod na produkcji) od <strong>release</strong> (użytkownik widzi funkcję). To on umożliwia trunk based development bez długo żyjących gałęzi.',
            en: 'A switch that separates <strong>deployment</strong> (code in production) from <strong>release</strong> (the user sees the feature). It is what makes trunk based development possible without long-lived branches.'
          }
        },
        {
          term: { pl: 'Kill switch (ops toggle)', en: 'Kill switch (ops toggle)' },
          def: {
            pl: 'Długo żyjąca flaga operacyjna, która pozwala natychmiast wyłączyć kosztowną funkcję pod obciążeniem. Inny cykl życia niż release toggle - nie usuwa się jej po rollout.',
            en: 'A long-lived operational flag that instantly disables an expensive feature under load. A different lifecycle than a release toggle: it is not deleted after rollout.'
          }
        },
        {
          term: { pl: 'Lepkie kubełkowanie', en: 'Sticky bucketing' },
          def: {
            pl: 'Deterministyczne przypisanie wariantu z hasha <code>userId + flagKey</code>, dzięki czemu ten sam użytkownik zawsze widzi ten sam wariant. <code>Math.random()</code> daje migotanie i bezwartościowe dane.',
            en: 'Deterministic variant assignment from a hash of <code>userId + flagKey</code>, so the same user always sees the same variant. <code>Math.random()</code> gives flicker and worthless data.'
          }
        },
        {
          term: { pl: 'Data ważności flagi', en: 'Flag expiry date' },
          def: {
            pl: 'Obowiązkowe pole <code>expiresAt</code>. Po terminie CI ostrzega, a po 30 dniach blokuje merge - to jedyny znany sposób, żeby po dwóch latach nie mieć 200 martwych flag.',
            en: 'A mandatory <code>expiresAt</code> field. Past the date CI warns, after 30 days it blocks the merge - the only known way to avoid 200 dead flags after two years.'
          }
        },
        {
          term: { pl: 'Podglądanie wyników (peeking)', en: 'Peeking' },
          def: {
            pl: 'Zatrzymywanie eksperymentu w momencie, gdy <em>p</em> spadnie poniżej 0,05. Wielokrotnie zawyża odsetek fałszywych odkryć: kryterium stopu i wielkość próby ustala się przed startem.',
            en: 'Stopping an experiment the moment <em>p</em> drops below 0.05. It inflates the false discovery rate many times over: the stopping rule and sample size are fixed before the start.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="ff1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="30" y="40" width="180" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="120" y="66" text-anchor="middle" font-size="14" fill="var(--text)">Deploy</text>' +
          '<text x="120" y="87" text-anchor="middle" font-size="13" fill="var(--muted)">code on prod, flag off</text>' +
          '<rect x="230" y="40" width="180" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="66" text-anchor="middle" font-size="14" fill="var(--text)">Release</text>' +
          '<text x="320" y="87" text-anchor="middle" font-size="13" fill="var(--muted)">flag on for a cohort</text>' +
          '<rect x="430" y="40" width="180" height="64" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="520" y="66" text-anchor="middle" font-size="14" fill="var(--text)">Cleanup</text>' +
          '<text x="520" y="87" text-anchor="middle" font-size="13" fill="var(--muted)">delete flag and old path</text>' +
          '<path d="M210,72 L226,72" stroke="var(--muted)" stroke-width="2" marker-end="url(#ff1-a)"/>' +
          '<path d="M410,72 L426,72" stroke="var(--muted)" stroke-width="2" marker-end="url(#ff1-a)"/>' +
          '<rect x="90" y="170" width="460" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="198" text-anchor="middle" font-size="14" fill="var(--text)">Evaluation: user id hashed to a bucket</text>' +
          '<text x="320" y="220" text-anchor="middle" font-size="13" fill="var(--muted)">same user, same bucket, every request</text>' +
          '<rect x="90" y="290" width="215" height="64" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="197" y="316" text-anchor="middle" font-size="14" fill="var(--text)">Kill switch</text>' +
          '<text x="197" y="337" text-anchor="middle" font-size="13" fill="var(--muted)">seconds, no deploy</text>' +
          '<rect x="335" y="290" width="215" height="64" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="442" y="316" text-anchor="middle" font-size="14" fill="var(--text)">Flag debt</text>' +
          '<text x="442" y="337" text-anchor="middle" font-size="13" fill="var(--muted)">every flag doubles paths</text>' +
          '<path d="M320,240 L250,286" stroke="var(--muted)" stroke-width="2" marker-end="url(#ff1-a)"/>' +
          '<path d="M320,240 L400,286" stroke="var(--muted)" stroke-width="2" marker-end="url(#ff1-a)"/>' +
          '</svg>',
        caption: {
          pl: 'Flaga oddziela wdrożenie od udostępnienia: kod jedzie na produkcję wyłączony, włączasz go dla kohorty, a potem obowiązkowo sprzątasz.',
          en: 'A flag separates deploy from release: code ships to production turned off, you enable it for a cohort, and then you must clean it up.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Cykl życia jednej flagi: od wdrożenia wyłączonego kodu, przez stopniowy rollout, po usunięcie starej ścieżki.',
          en: 'The lifecycle of one flag: from shipping disabled code, through a gradual rollout, to deleting the old path.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Day 1: deployed, flag off for everyone</text>' +
              '<rect x="60" y="60" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="62" y="62" width="516" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>' +
              '<text x="320" y="92" text-anchor="middle" font-size="14" fill="var(--muted)">100 percent old checkout</text>' +
              '<rect x="60" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="185" y="178" text-anchor="middle" font-size="14" fill="var(--text)">new-checkout: off</text>' +
              '<text x="185" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">code merged and live</text>' +
              '<rect x="330" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="455" y="178" text-anchor="middle" font-size="14" fill="var(--text)">conversion 3.10 percent</text>' +
              '<text x="455" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">baseline captured</text>' +
              '<text x="320" y="290" text-anchor="middle" font-size="13" fill="var(--muted)">deploy is not release</text>' +
              '</svg>',
            label: { pl: 'Wdrożenie bez udostępnienia', en: 'Deploy without release' },
            note: {
              pl: 'Kod jest na produkcji, ale nikt go nie widzi. Merge do main przestaje być momentem ryzyka.',
              en: 'The code is in production but nobody sees it. Merging to main stops being the moment of risk.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Day 2: internal staff plus 1 percent</text>' +
              '<rect x="60" y="60" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="60" y="60" width="60" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="90" y="92" text-anchor="middle" font-size="13" fill="var(--accent)">1%</text>' +
              '<text x="360" y="92" text-anchor="middle" font-size="14" fill="var(--muted)">old checkout</text>' +
              '<rect x="60" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="185" y="178" text-anchor="middle" font-size="14" fill="var(--text)">new-checkout: 1 percent</text>' +
              '<text x="185" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">sticky by user id hash</text>' +
              '<rect x="330" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="455" y="178" text-anchor="middle" font-size="14" fill="var(--text)">errors flat</text>' +
              '<text x="455" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">watching for 24 h</text>' +
              '<text x="320" y="290" text-anchor="middle" font-size="13" fill="var(--muted)">smallest blast radius that still produces signal</text>' +
              '</svg>',
            label: { pl: 'Canary na 1 procent', en: 'One percent canary' },
            note: {
              pl: 'Pierwszy krok ma wykryć awarie, nie zmierzyć konwersję. Przy 1 procencie widać błędy JS i puste ekrany, nie subtelne różnice biznesowe.',
              en: 'The first step is meant to catch breakage, not to measure conversion. At 1 percent you see JS errors and blank screens, not subtle business deltas.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Day 5: 50 / 50 experiment</text>' +
              '<rect x="60" y="60" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="60" y="60" width="260" height="52" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="190" y="92" text-anchor="middle" font-size="14" fill="var(--accent)">variant B 50%</text>' +
              '<text x="450" y="92" text-anchor="middle" font-size="14" fill="var(--muted)">control A 50%</text>' +
              '<rect x="60" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="185" y="178" text-anchor="middle" font-size="14" fill="var(--text)">B: 3.42 percent</text>' +
              '<text x="185" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">n = 41 000</text>' +
              '<rect x="330" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="455" y="178" text-anchor="middle" font-size="14" fill="var(--text)">A: 3.11 percent</text>' +
              '<text x="455" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">n = 40 800</text>' +
              '<text x="320" y="290" text-anchor="middle" font-size="13" fill="var(--muted)">stop rule fixed in advance: 2 weeks, no peeking</text>' +
              '</svg>',
            label: { pl: 'Eksperyment 50/50', en: 'The 50/50 experiment' },
            note: {
              pl: 'Dopiero teraz mierzysz efekt biznesowy. Kryterium stopu i wielkość próby ustalasz przed startem, inaczej znajdziesz wynik, którego szukasz.',
              en: 'Only now do you measure business impact. Fix the stop rule and sample size before starting, or you will find the result you were looking for.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Day 6: error spike, kill switch flipped</text>' +
              '<rect x="60" y="60" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="60" y="60" width="30" height="52" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="330" y="92" text-anchor="middle" font-size="14" fill="var(--muted)">back to old checkout in 40 seconds</text>' +
              '<rect x="60" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="185" y="178" text-anchor="middle" font-size="14" fill="var(--text)">payment errors x8</text>' +
              '<text x="185" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">only on Safari 16</text>' +
              '<rect x="330" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="455" y="178" text-anchor="middle" font-size="14" fill="var(--text)">flag off, no deploy</text>' +
              '<text x="455" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">rollback without a release</text>' +
              '<text x="320" y="290" text-anchor="middle" font-size="13" fill="var(--muted)">this is the whole reason flags exist</text>' +
              '</svg>',
            label: { pl: 'Wyłącznik bezpieczeństwa', en: 'The kill switch' },
            note: {
              pl: 'Rollback flagą trwa sekundy, rollback deployem minuty albo godziny. Ta różnica decyduje o rozmiarze incydentu.',
              en: 'A flag rollback takes seconds, a deploy rollback takes minutes or hours. That difference decides the size of the incident.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="320" y="30" text-anchor="middle" font-size="15" fill="var(--text)">Day 20: 100 percent, then delete the flag</text>' +
              '<rect x="60" y="60" width="520" height="52" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="92" text-anchor="middle" font-size="14" fill="var(--ok)">100 percent new checkout</text>' +
              '<rect x="60" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="185" y="178" text-anchor="middle" font-size="14" fill="var(--text)">old path deleted</text>' +
              '<text x="185" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">flag removed from code</text>' +
              '<rect x="330" y="150" width="250" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="455" y="178" text-anchor="middle" font-size="14" fill="var(--text)">tests halved</text>' +
              '<text x="455" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">one path, not two</text>' +
              '<text x="320" y="290" text-anchor="middle" font-size="13" fill="var(--muted)">a flag with no expiry date is permanent complexity</text>' +
              '</svg>',
            label: { pl: 'Sprzątanie', en: 'Cleanup' },
            note: {
              pl: 'Usunięcie flagi jest częścią funkcjonalności, nie zadaniem na później. Każda żyjąca flaga podwaja liczbę ścieżek do przetestowania.',
              en: 'Removing the flag is part of the feature, not a task for later. Every living flag doubles the number of paths you must test.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że w domu masz nowy piekarnik, ale jeszcze go nikomu nie pokazujesz. Stoi podłączony, zakryty prześcieradłem. Kiedy uznasz, że jest gotowy, ściągasz prześcieradło - najpierw dla siebie, potem dla rodziny, w końcu dla gości.</p><p>Feature flaga to takie prześcieradło. Nowa funkcja jedzie na stronę razem z resztą kodu, ale jest niewidoczna. Włączasz ją przełącznikiem, kiedy chcesz, i dla kogo chcesz.</p><p>Najlepsze jest to, że jak coś zacznie się dymić, nie musisz wywozić piekarnika z domu. Zarzucasz prześcieradło z powrotem i w kilka sekund wszystko wraca do normy. Bez tego trzeba by wzywać ekipę i wynosić sprzęt godzinami.</p><p>Jest jeden haczyk: jak nazbierasz w domu trzydzieści zakrytych prześcieradłem sprzętów, nikt już nie pamięta, co pod nimi jest. Dlatego każde prześcieradło musi mieć karteczkę z datą, kiedy je zdejmujemy na dobre.</p>',
          en: '<p>Imagine a new oven at home that you have not shown to anyone yet. It is plugged in and covered with a sheet. When you decide it is ready you pull the sheet off - first for yourself, then for the family, finally for guests.</p><p>A feature flag is that sheet. The new feature ships to the site with everything else, but stays invisible. You switch it on when you want and for whoever you want.</p><p>The best part is that if something starts smoking you do not have to carry the oven out of the house. You throw the sheet back over it and everything is normal within seconds. Without that you would be calling a crew and hauling equipment for hours.</p><p>There is one catch: if thirty covered appliances pile up, nobody remembers what is under the sheets. So every sheet needs a note with the date it comes off for good.</p>'
        },
        school: {
          pl: '<p>Feature flaga rozdziela dwa zdarzenia, które w klasycznym modelu były jednym: <strong>deployment</strong> (kod ląduje na produkcji) i <strong>release</strong> (użytkownik widzi funkcję). To pozwala mergować małe kawałki do <code>main</code> codziennie, bez długo żyjących gałęzi.</p><p>Wyróżniamy kilka rodzajów flag i nie należy ich mylić:</p><ul><li><strong>Release toggle</strong> - żyje tygodnie, kończy się usunięciem po pełnym rollout.</li><li><strong>Experiment</strong> - dzieli ruch na warianty i mierzy metrykę biznesową. Żyje tyle, ile eksperyment.</li><li><strong>Ops toggle, kill switch</strong> - żyje długo, służy do wyłączenia kosztownej funkcji pod obciążeniem.</li><li><strong>Permission</strong> - zwykle nie jest flagą, tylko uprawnieniem, i powinno mieszkać w modelu domenowym.</li></ul><p>Ocena flagi musi być <em>deterministyczna i lepka</em>: ten sam użytkownik zawsze trafia do tego samego wariantu, także po odświeżeniu i na innym urządzeniu.</p><pre><code>const bucket = hash(userId + flagKey) % 100;\nconst enabled = bucket &lt; rolloutPercent;</code></pre><p>Losowanie przez <code>Math.random()</code> to najczęstszy błąd początkujących: interfejs zaczyna migać między wariantami przy każdym renderze, a dane z eksperymentu są bezwartościowe.</p><p>Frontendowo warto pamiętać o dwóch rzeczach. Po pierwsze flagi powinny być dostarczone przed pierwszym renderem (SSR albo bootstrap w HTML), inaczej użytkownik zobaczy migotanie starej wersji. Po drugie kod obu wariantów siedzi w bundlu, więc duża flaga to realny koszt rozmiaru, o ile nie połączysz jej z dynamicznym importem.</p><p>Narzędzia: LaunchDarkly, Unleash, Flagsmith, GrowthBook lub własna tabela w bazie z endpointem i cache. Kupujesz przede wszystkim audyt zmian i UI dla nietechnicznych.</p>',
          en: '<p>A feature flag separates two events that used to be one: <strong>deployment</strong> (code lands in production) and <strong>release</strong> (a user sees the feature). That lets you merge small pieces into <code>main</code> daily, with no long-lived branches.</p><p>There are several flag types and mixing them up hurts:</p><ul><li><strong>Release toggle</strong> - lives for weeks, ends with deletion after full rollout.</li><li><strong>Experiment</strong> - splits traffic into variants and measures a business metric. Lives as long as the experiment.</li><li><strong>Ops toggle, kill switch</strong> - long-lived, used to disable an expensive feature under load.</li><li><strong>Permission</strong> - usually not a flag at all but an entitlement, and it belongs in the domain model.</li></ul><p>Flag evaluation must be <em>deterministic and sticky</em>: the same user always lands in the same variant, across refreshes and devices.</p><pre><code>const bucket = hash(userId + flagKey) % 100;\nconst enabled = bucket &lt; rolloutPercent;</code></pre><p>Rolling with <code>Math.random()</code> is the classic beginner mistake: the UI flickers between variants on every render and the experiment data is worthless.</p><p>Two frontend-specific notes. First, flags should be available before the first render (SSR or a bootstrap payload in the HTML), otherwise users see a flash of the old version. Second, both code paths sit in the bundle, so a large flag is a real size cost unless you pair it with a dynamic import.</p><p>Tools: LaunchDarkly, Unleash, Flagsmith, GrowthBook, or your own database table behind an endpoint with caching. What you mostly buy is a change audit log and a UI for non-engineers.</p>'
        },
        pro: {
          pl: '<p>Flagi są jedynym mechanizmem, który pozwala dużej organizacji jechać na trunk based development bez heroizmu. Jednocześnie są najszybszym znanym sposobem na wyprodukowanie długu, którego nikt nie widzi w statystykach jakości. Twoja rola przy design systemie jest tu podwójna: dostarczasz mechanizm i pilnujesz jego higieny.</p><h4>Twarde reguły operacyjne</h4><ul><li><strong>Data ważności jest polem obowiązkowym.</strong> Flaga bez <code>expiresAt</code> nie przechodzi review. Po terminie CI zaczyna ostrzegać, po 30 dniach blokuje merge. Bez tego typowa organizacja telco ma po dwóch latach 200 flag, z czego 60 procent jest permanentnie włączonych.</li><li><strong>Maksymalnie jedna flaga na ścieżkę krytyczną.</strong> Dwie flagi to cztery kombinacje, pięć flag to 32. Nie przetestujesz tego, więc realnie testujesz jedną ścieżkę i modlisz się o resztę.</li><li><strong>Flagi w design systemie są zabronione.</strong> Komponent nie może pytać o flagę, bo wtedy jego zachowanie zależy od stanu środowiska konsumenta i nie da się go przetestować ani udokumentować. Flaga zostaje w aplikacji, komponent dostaje prop.</li></ul><h4>Wydajność i migotanie</h4><p>Klienckie SDK, które pobiera flagi po hydratacji, generuje CLS i flash of old content. Poprawnie: serwer ewaluuje flagi i wstrzykuje wynik w HTML, klient tylko czyta. Payload flag trzymaj poniżej 5 kB i tnij po segmencie użytkownika, a nie wysyłaj całego katalogu 200 flag do przeglądarki - to jest zarazem wyciek informacji o niewydanych funkcjach.</p><pre><code>&lt;script&gt;window.__FLAGS__ = {"new-checkout":true,"tariff-v2":false};&lt;/script&gt;</code></pre><h4>Eksperymenty, czyli gdzie ludzie oszukują sami siebie</h4><p>Trzy błędy widzę najczęściej. Podglądanie wyników i zatrzymywanie eksperymentu, gdy p spadnie poniżej 0,05, zawyża odsetek fałszywych odkryć wielokrotnie - kryterium stopu i wielkość próby ustala się przed startem. Drugi błąd to metryka zastępcza: kliknięcia w nowy przycisk rosną o 20 procent, a przychód stoi. Trzeci to zbyt krótki okres: przy cyklu zakupowym telco liczonym w tygodniach eksperyment na trzy dni mierzy głównie efekt nowości. Realistycznie: żeby wykryć wzrost konwersji z 3,0 na 3,3 procent przy sensownej mocy statystycznej, potrzebujesz rzędu 50-60 tysięcy użytkowników na wariant.</p><h4>Sprzątanie jako proces, nie jako intencja</h4><p>Praktyka, która działa: skrypt w CI czyta katalog flag i szuka kluczy w kodzie. Flaga włączona na 100 procent od 14 dni automatycznie generuje pull request usuwający martwą gałąź (narzędzia w stylu Piranha robią to na poziomie AST). Zadanie sprzątania idzie do backlogu w tym samym sprincie, w którym rollout dobił do 100 procent, i jest częścią definicji ukończenia funkcjonalności.</p><p>Zdanie na rozmowę: flagi zamieniają ryzyko wydania na złożoność kodu. Ta wymiana jest opłacalna wyłącznie wtedy, gdy złożoność jest tymczasowa i wygasa automatycznie.</p>',
          en: '<p>Flags are the only mechanism that lets a large organization run trunk based development without heroics. They are also the fastest known way to produce debt that never shows up in quality metrics. Owning a design system puts you on both sides: you provide the mechanism and you police its hygiene.</p><h4>Hard operational rules</h4><ul><li><strong>An expiry date is a mandatory field.</strong> A flag with no <code>expiresAt</code> does not pass review. Past the date CI warns; after 30 days it blocks the merge. Without this a typical telco has 200 flags after two years, 60 percent of them permanently on.</li><li><strong>At most one flag per critical path.</strong> Two flags mean four combinations, five flags mean 32. You will not test that, so in practice you test one path and pray about the rest.</li><li><strong>No flags inside the design system.</strong> A component must not read a flag, because then its behavior depends on the consumer environment and it can be neither tested nor documented. The flag stays in the application; the component gets a prop.</li></ul><h4>Performance and flicker</h4><p>A client SDK that fetches flags after hydration produces CLS and a flash of old content. Do it properly: the server evaluates flags and injects the result into the HTML, the client only reads it. Keep the flag payload under 5 kB and slice it by user segment rather than shipping a catalog of 200 flags to the browser - that is also a leak of unreleased feature names.</p><pre><code>&lt;script&gt;window.__FLAGS__ = {"new-checkout":true,"tariff-v2":false};&lt;/script&gt;</code></pre><h4>Experiments, where people fool themselves</h4><p>Three mistakes dominate. Peeking at results and stopping the moment p drops below 0.05 inflates the false discovery rate several times over - fix the stop rule and sample size before you start. Second, the surrogate metric: clicks on the new button rise 20 percent while revenue stays flat. Third, too short a window: with a telco purchase cycle measured in weeks, a three day experiment mostly measures novelty. Realistically, detecting a lift from 3.0 to 3.3 percent conversion at reasonable power needs on the order of 50-60 thousand users per variant.</p><h4>Cleanup as a process, not an intention</h4><p>What works in practice: a CI script reads the flag catalog and greps the code for keys. A flag at 100 percent for 14 days automatically opens a pull request deleting the dead branch (tools like Piranha do this at the AST level). The cleanup ticket enters the backlog in the same sprint the rollout reached 100 percent, and it is part of the definition of done for the feature.</p><p>The interview sentence: flags trade release risk for code complexity. The trade only pays off when that complexity is temporary and expires automatically.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Co przede wszystkim umożliwia feature flaga?', en: 'What does a feature flag primarily enable?' },
          options: [
            { pl: 'Oddzielenie wdrożenia kodu od udostępnienia funkcji użytkownikom', en: 'Separating code deployment from releasing the feature to users' },
            { pl: 'Zmniejszenie rozmiaru bundle', en: 'Reducing bundle size' },
            { pl: 'Automatyczne testowanie regresji wizualnej', en: 'Automatic visual regression testing' },
            { pl: 'Szybszy build w CI', en: 'A faster CI build' }
          ],
          correct: 0,
          explain: {
            pl: 'Flaga rozdziela deployment i release. Rozmiar bundle zwykle rośnie, bo obie ścieżki kodu jadą razem.',
            en: 'A flag separates deployment from release. Bundle size usually grows, because both code paths ship together.'
          }
        },
        {
          q: { pl: 'Dlaczego przypisanie do wariantu przez Math.random() jest błędem?', en: 'Why is assigning variants with Math.random() a bug?' },
          options: [
            { pl: 'Jest zbyt wolne przy dużym ruchu', en: 'It is too slow at high traffic' },
            { pl: 'Nie działa w Safari', en: 'It does not work in Safari' },
            { pl: 'Nie jest lepkie: ten sam użytkownik zmienia wariant między renderami, więc dane są bezwartościowe', en: 'It is not sticky: the same user flips variants between renders, making the data worthless' },
            { pl: 'Wymaga zgody na cookies', en: 'It requires cookie consent' }
          ],
          correct: 2,
          explain: {
            pl: 'Ocena flagi musi być deterministyczna, zwykle przez hash z identyfikatora użytkownika i klucza flagi. Inaczej interfejs miga, a eksperyment nic nie mierzy.',
            en: 'Flag evaluation must be deterministic, usually a hash of user id plus flag key. Otherwise the UI flickers and the experiment measures nothing.'
          }
        },
        {
          q: { pl: 'Zespół chce dodać flagę wewnątrz komponentu design systemu. Dlaczego to zły pomysł?', en: 'A team wants to read a flag inside a design system component. Why is that a bad idea?' },
          options: [
            { pl: 'Bo flagi nie działają w Web Components', en: 'Because flags do not work in Web Components' },
            { pl: 'Bo zachowanie komponentu zaczyna zależeć od środowiska konsumenta, więc nie da się go przetestować ani udokumentować', en: 'Because component behavior starts depending on the consumer environment, so it cannot be tested or documented' },
            { pl: 'Bo SDK flag jest zbyt duże', en: 'Because the flag SDK is too large' },
            { pl: 'Bo flagi wymagają serwera', en: 'Because flags require a server' }
          ],
          correct: 1,
          explain: {
            pl: 'Komponent biblioteczny musi być funkcją propsów. Flagę zostawia się w aplikacji, a komponent dostaje jawny prop lub wariant.',
            en: 'A library component must be a function of its props. The flag stays in the application and the component receives an explicit prop or variant.'
          }
        },
        {
          q: { pl: 'Eksperyment po trzech dniach pokazuje p = 0,04. Kryterium stopu ustalono na dwa tygodnie. Co robisz?', en: 'After three days an experiment shows p = 0.04. The pre-agreed stop rule was two weeks. What do you do?' },
          options: [
            { pl: 'Wdrażasz wariant B na 100 procent, wynik jest istotny', en: 'Roll variant B to 100 percent, the result is significant' },
            { pl: 'Przerywasz eksperyment i zmieniasz metrykę na taką, która wygląda lepiej', en: 'Stop the experiment and switch to a metric that looks better' },
            { pl: 'Kontynuujesz do ustalonego terminu, bo wcześniejsze zatrzymanie zawyża odsetek fałszywych odkryć', en: 'Continue to the agreed date, because early stopping inflates the false discovery rate' },
            { pl: 'Zwiększasz ruch wariantu B do 90 procent, żeby szybciej zebrać dane', en: 'Raise variant B traffic to 90 percent to gather data faster' }
          ],
          correct: 2,
          explain: {
            pl: 'Podglądanie i zatrzymywanie na pierwszym istotnym wyniku to klasyczne p-hacking. Kryterium stopu ustala się przed startem, a przy potrzebie wcześniejszego wglądu stosuje się testy sekwencyjne.',
            en: 'Peeking and stopping at the first significant result is textbook p-hacking. Fix the stop rule up front, and if you need early looks use a sequential test.'
          }
        }
      ]
    },
    {
      id: 'dependency-upgrades-strategy',
      title: { pl: 'Strategia aktualizacji zależności', en: 'Dependency upgrade strategy' },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Lockfile i frozen-lockfile', en: 'Lockfile and frozen-lockfile' },
          def: {
            pl: 'Lockfile commitowany do repo plus <code>pnpm install --frozen-lockfile</code> w CI. Gwarantuje, że pipeline instaluje dokładnie te wersje co deweloper, i wykrywa niezaktualizowany lock.',
            en: 'A lockfile committed to the repo plus <code>pnpm install --frozen-lockfile</code> in CI. It guarantees the pipeline installs exactly the developer versions and catches a stale lock.'
          }
        },
        {
          term: { pl: 'Bot aktualizacyjny (Renovate)', en: 'Update bot (Renovate)' },
          def: {
            pl: 'Renovate lub Dependabot otwierający PR-y z podbiciami. Sens daje dopiero podział na strumienie ryzyka: patche i minory grupowane z automerge, majory jako osobny ticket, CVE poza kolejką.',
            en: 'Renovate or Dependabot opening bump PRs. It only pays off with risk streams: grouped patches and minors on automerge, majors as separate tickets, CVEs jumping the queue.'
          }
        },
        {
          term: { pl: 'Codemod', en: 'Codemod' },
          def: {
            pl: 'Skrypt (jscodeshift, <code>nx migrate</code>, <code>react-codemod</code>) przepisujący kod na poziomie AST. Dwa dni na własny codemod zwykle biją dwa tygodnie ręcznego przepisywania i są powtarzalne.',
            en: 'A script (jscodeshift, <code>nx migrate</code>, <code>react-codemod</code>) that rewrites code at the AST level. Two days on your own codemod usually beat two weeks of manual edits and are repeatable.'
          }
        },
        {
          term: { pl: 'Dual publishing i EOL', en: 'Dual publishing and EOL' },
          def: {
            pl: 'Przy zmianie łamiącej publikujesz równolegle linię <code>4.x</code> (tylko poprawki bezpieczeństwa) i <code>5.x</code>. Ogłoszona data końca wsparcia jest ważniejsza niż sama migracja.',
            en: 'On a breaking change you publish a <code>4.x</code> line (security fixes only) alongside <code>5.x</code>. The announced end-of-life date matters more than the migration itself.'
          }
        },
        {
          term: { pl: 'Atak na łańcuch dostaw', en: 'Supply chain attack' },
          def: {
            pl: 'Włamanie nie do Ciebie, tylko do paczki, której używasz. Kontrole: <code>--ignore-scripts</code> w CI, cooldown na świeże wersje, przypinanie akcji do SHA i publikacja z <code>--provenance</code>.',
            en: 'A break-in not into you but into a package you use. Controls: <code>--ignore-scripts</code> in CI, a cooldown on fresh versions, pinning actions to a SHA and publishing with <code>--provenance</code>.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="dep1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="30" y="30" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="155" y="58" text-anchor="middle" font-size="14" fill="var(--text)">Patch and minor</text>' +
          '<text x="155" y="80" text-anchor="middle" font-size="13" fill="var(--muted)">grouped weekly, auto-merge on green</text>' +
          '<rect x="360" y="30" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="485" y="58" text-anchor="middle" font-size="14" fill="var(--text)">Major</text>' +
          '<text x="485" y="80" text-anchor="middle" font-size="13" fill="var(--muted)">own ticket, own owner</text>' +
          '<rect x="30" y="150" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="155" y="178" text-anchor="middle" font-size="14" fill="var(--text)">Security advisory</text>' +
          '<text x="155" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">out of band, hours not weeks</text>' +
          '<rect x="360" y="150" width="250" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="485" y="178" text-anchor="middle" font-size="14" fill="var(--text)">Framework upgrade</text>' +
          '<text x="485" y="200" text-anchor="middle" font-size="13" fill="var(--muted)">codemod plus pilot app</text>' +
          '<rect x="150" y="280" width="340" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="308" text-anchor="middle" font-size="15" fill="var(--text)">One pipeline gates all four</text>' +
          '<text x="320" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">lint, types, unit, visual regression, e2e smoke</text>' +
          '<path d="M155,104 L200,276" stroke="var(--muted)" stroke-width="2" marker-end="url(#dep1-a)"/>' +
          '<path d="M485,104 L440,276" stroke="var(--muted)" stroke-width="2" marker-end="url(#dep1-a)"/>' +
          '<path d="M170,224 L250,276" stroke="var(--muted)" stroke-width="2" marker-end="url(#dep1-a)"/>' +
          '<path d="M470,224 L390,276" stroke="var(--muted)" stroke-width="2" marker-end="url(#dep1-a)"/>' +
          '<text x="320" y="390" text-anchor="middle" font-size="13" fill="var(--muted)">upgrade confidence is a test suite property, not a bravery property</text>' +
          '</svg>',
        caption: {
          pl: 'Cztery różne strumienie aktualizacji o różnym ryzyku wpadają do jednej bramki jakości. To testy, a nie odwaga, decydują o tym, jak często możesz aktualizować.',
          en: 'Four upgrade streams with different risk profiles pass through one quality gate. Your test suite, not your courage, decides how often you can upgrade.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że nigdy nie sprzątasz mieszkania. Przez pierwszy tydzień jest w porządku. Po roku nie da się wejść do pokoju, a samo posprzątanie zajmuje cały weekend i psuje humor wszystkim domownikom.</p><p>Z bibliotekami jest identycznie. Jeżeli aktualizujesz je co tydzień po trochu, każda zmiana jest maleńka i nudna. Jeżeli odkładasz to na potem, po dwóch latach masz projekt, w którym podniesienie jednej rzeczy wymaga podniesienia trzydziestu innych naraz.</p><p>Dlatego zatrudniamy robota. Robot codziennie sprawdza, czy coś ma nową wersję, i sam przynosi gotową propozycję zmiany. Jeśli wszystkie testy świecą na zielono, sam ją wprowadza i nikt nawet nie musi patrzeć.</p><p>Robot nie zastąpi jednak testów. Jeśli nie masz jak sprawdzić, że aplikacja dalej działa, każda aktualizacja jest rzutem monetą. Dlatego najpierw testy, potem robot - w tej kolejności.</p>',
          en: '<p>Imagine never cleaning your flat. The first week is fine. After a year you cannot get into the room, and cleaning it takes a whole weekend and ruins everyone mood.</p><p>Libraries work exactly the same way. If you update them a little every week, each change is tiny and boring. If you keep postponing, after two years you have a project where bumping one thing requires bumping thirty others at once.</p><p>So we hire a robot. Every day the robot checks whether anything has a new version and brings a ready-made change proposal. If all the tests are green it merges the change itself and nobody even has to look.</p><p>But the robot does not replace tests. If you have no way to check the app still works, every update is a coin flip. So tests first, robot second, in that order.</p>'
        },
        school: {
          pl: '<p>Aktualizacje zależności to nie sprzątanie po godzinach, tylko element architektury: określają, jak szybko możesz reagować na CVE (podatność bezpieczeństwa) i jak duży jest koszt wejścia na nową wersję frameworka.</p><p>Podstawowe narzędzie to <strong>Renovate</strong> albo <strong>Dependabot</strong>. Renovate ma bogatszą konfigurację i lepiej radzi sobie w monorepo, bo umie grupować pakiety i respektować workspace.</p><pre><code>{\n  "packageRules": [\n    { "matchUpdateTypes": ["patch", "minor"],\n      "groupName": "weekly patches",\n      "automerge": true },\n    { "matchUpdateTypes": ["major"],\n      "dependencyDashboardApproval": true }\n  ],\n  "schedule": ["before 6am on monday"]\n}</code></pre><p>Klucz to podział na strumienie o różnym ryzyku. Patche i wersje minor idą zgrupowane raz w tygodniu i wjeżdżają automatycznie, gdy pipeline jest zielony. Major to osobny ticket z właścicielem i estymacją. Podatności bezpieczeństwa idą poza kolejką, tego samego dnia.</p><p>Trzy dodatkowe elementy, bez których to nie działa:</p><ul><li><strong>Lockfile w repo</strong> i instalacja przez <code>pnpm install --frozen-lockfile</code> w CI, żeby build był powtarzalny.</li><li><strong>Zakresy wersji</strong>: aplikacje przypinają dokładnie, biblioteki publikowane deklarują szerokie peerDependencies, inaczej wymusisz na konsumentach duplikaty.</li><li><strong>Testy regresji wizualnej</strong> dla design systemu, bo podbicie wersji o jeden patch potrafi przesunąć layout o 3 piksele w 40 miejscach naraz.</li></ul><p>Analogia: to jest to samo co migracje bazy danych. Małe, częste i odwracalne wygrywają z jedną wielką migracją raz na dwa lata.</p>',
          en: '<p>Dependency upgrades are not after-hours housekeeping, they are architecture: they determine how fast you can react to a CVE (a security vulnerability) and how expensive it is to move to a new framework version.</p><p>The base tools are <strong>Renovate</strong> and <strong>Dependabot</strong>. Renovate has richer configuration and handles monorepos better, because it can group packages and respect workspaces.</p><pre><code>{\n  "packageRules": [\n    { "matchUpdateTypes": ["patch", "minor"],\n      "groupName": "weekly patches",\n      "automerge": true },\n    { "matchUpdateTypes": ["major"],\n      "dependencyDashboardApproval": true }\n  ],\n  "schedule": ["before 6am on monday"]\n}</code></pre><p>The key is splitting upgrades into streams by risk. Patches and minors go out grouped once a week and merge automatically on a green pipeline. Majors get their own ticket with an owner and an estimate. Security advisories jump the queue and land the same day.</p><p>Three supporting pieces, without which none of this works:</p><ul><li><strong>A committed lockfile</strong> and <code>pnpm install --frozen-lockfile</code> in CI, so builds are reproducible.</li><li><strong>Version ranges</strong>: applications pin exactly, published libraries declare wide peerDependencies, otherwise you force duplicates on consumers.</li><li><strong>Visual regression tests</strong> for the design system, because a single patch bump can shift layout by 3 pixels in 40 places at once.</li></ul><p>The analogy: this is database migrations. Small, frequent and reversible beats one giant migration every two years.</p>'
        },
        pro: {
          pl: '<p>Strategia aktualizacji jest funkcją dwóch zmiennych: jakości pakietu testów i liczby konsumentów. Przy design systemie w telco masz najgorszą kombinację - dziesiątki konsumentów, z których część jest poza Twoim repozytorium i ma własny cykl wydawniczy. Dlatego Twoja strategia musi obejmować także to, jak <em>Ty</em> wypuszczasz zmiany łamiące, nie tylko jak je konsumujesz.</p><h4>Budżet i rytm</h4><p>Zdrowy poziom to 10-15 procent czasu zespołu platformowego na utrzymanie, w tym aktualizacje. To nie jest strata, to jest składka ubezpieczeniowa. Praktyczne progi: żadna zależność produkcyjna starsza niż dwa wydania major, czas od opublikowania CVE o wysokiej krytyczności do wdrożenia poniżej 72 godzin, mediana wieku zależności poniżej 90 dni. Te trzy liczby wystarczą jako dashboard dla zarządu.</p><h4>Duże migracje</h4><ul><li><strong>Codemody.</strong> React ma <code>react-codemod</code>, Vue <code>@vue/compat</code>, Nx <code>nx migrate</code>, Angular <code>ng update</code>. Zawsze sprawdź, czy istnieje codemod, zanim wyślesz dziesięć osób na ręczne przepisywanie. jscodeshift plus dwa dni na własny skrypt zwykle bije dwa tygodnie ręcznej roboty i jest odtwarzalne dla spóźnionych zespołów.</li><li><strong>Aplikacja pilotażowa.</strong> Wybierz jedną średnią, niekrytyczną aplikację jako pierwszą ofiarę. Wnioski z pilota zapisz jako przewodnik migracji, zanim ruszy reszta.</li><li><strong>Tryby zgodności.</strong> Vue 3 <code>@vue/compat</code>, React <code>StrictMode</code> jako wykrywacz problemów przed migracją, Node w wersji LTS jako punkt odniesienia.</li><li><strong>Dual publishing.</strong> Przy zmianie łamiącej w design systemie publikuj równolegle linię <code>4.x</code> (tylko poprawki bezpieczeństwa, jasna data końca wsparcia) i <code>5.x</code>. Ogłoszenie daty EOL jest ważniejsze niż sama migracja: bez niej zespoły nigdy nie znajdą priorytetu.</li></ul><h4>Łańcuch dostaw</h4><pre><code>pnpm audit --prod\npnpm install --frozen-lockfile --ignore-scripts\nnpm publish --provenance   # sigstore attestation</code></pre><p>Trzy praktyki dają największy zwrot: <code>--ignore-scripts</code> w CI (skrypty postinstall to główny wektor ataku na łańcuch dostaw), przypinanie akcji GitHub do SHA zamiast do tagu, oraz <code>--provenance</code> przy publikacji, żeby konsumenci mogli zweryfikować pochodzenie paczki. Do tego cooldown w Renovate: nie przyjmuj wersji młodszej niż 3 dni, bo to okno, w którym wykrywa się większość skompromitowanych paczek.</p><h4>Polityka i psychologia</h4><p>Największą przeszkodą nie jest technika, tylko to, że aktualizacje nie mają właściciela biznesowego. Skuteczna narracja: nie mówisz o długu technicznym, tylko o czasie reakcji na incydent bezpieczeństwa i o koszcie zatrudnienia ludzi do stosu sprzed czterech lat. Pokaż konkretnie: przy zależnościach starszych niż dwa lata typowa aktualizacja krytyczna zajmuje 3-6 tygodni zamiast jednego dnia, bo trzeba podnieść cały łańcuch przechodni.</p><p>Zdanie na poziomie principal: częstotliwość aktualizacji jest miarą zaufania do pakietu testów. Jeżeli boisz się podbić wersję minor, prawdziwym problemem nie jest zależność, tylko brak automatycznej weryfikacji.</p>',
          en: '<p>Upgrade strategy is a function of two variables: test suite quality and consumer count. With a telco design system you have the worst combination - dozens of consumers, some outside your repository and on their own release cadence. So your strategy must also cover how <em>you</em> ship breaking changes, not only how you consume them.</p><h4>Budget and rhythm</h4><p>A healthy level is 10-15 percent of platform team time on maintenance, upgrades included. That is not waste, it is an insurance premium. Practical thresholds: no production dependency more than two majors behind, time from a high-severity CVE to deployed fix under 72 hours, median dependency age under 90 days. Those three numbers are enough as a leadership dashboard.</p><h4>Large migrations</h4><ul><li><strong>Codemods.</strong> React has <code>react-codemod</code>, Vue has <code>@vue/compat</code>, Nx has <code>nx migrate</code>, Angular has <code>ng update</code>. Always check for a codemod before sending ten people to rewrite by hand. jscodeshift plus two days on a custom script usually beats two weeks of manual work and is replayable for teams that arrive late.</li><li><strong>A pilot application.</strong> Pick one medium, non-critical app as the first victim. Turn the pilot lessons into a migration guide before the rest start.</li><li><strong>Compatibility modes.</strong> Vue 3 <code>@vue/compat</code>, React <code>StrictMode</code> as a pre-migration problem detector, Node LTS as the baseline.</li><li><strong>Dual publishing.</strong> For a breaking design system change, publish a <code>4.x</code> line (security fixes only, an announced end-of-life date) alongside <code>5.x</code>. Announcing the EOL date matters more than the migration itself: without it teams never find the priority.</li></ul><h4>Supply chain</h4><pre><code>pnpm audit --prod\npnpm install --frozen-lockfile --ignore-scripts\nnpm publish --provenance   # sigstore attestation</code></pre><p>Three practices return the most: <code>--ignore-scripts</code> in CI (postinstall scripts are the main supply chain attack vector), pinning GitHub Actions to a SHA rather than a tag, and <code>--provenance</code> on publish so consumers can verify package origin. Add a Renovate cooldown: do not accept a version younger than three days, the window in which most compromised packages are caught.</p><h4>Politics and psychology</h4><p>The hardest obstacle is not technical, it is that upgrades have no business owner. The narrative that works: do not talk about technical debt, talk about incident response time and the cost of hiring for a four-year-old stack. Make it concrete: with dependencies two years behind, a typical critical upgrade takes 3-6 weeks instead of one day, because you must lift the whole transitive chain.</p><p>The principal-level sentence: upgrade frequency measures trust in your test suite. If you are afraid of a minor bump, the dependency is not the real problem - missing automated verification is.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Dlaczego lockfile powinien być w repozytorium, a CI powinno instalować z flagą frozen-lockfile?', en: 'Why should the lockfile be committed and CI install with a frozen-lockfile flag?' },
          options: [
            { pl: 'Żeby build był powtarzalny i CI nie wciągnęło po cichu innych wersji niż lokalnie', en: 'So builds are reproducible and CI cannot silently pull different versions than local' },
            { pl: 'Żeby zmniejszyć rozmiar repozytorium', en: 'To reduce repository size' },
            { pl: 'Żeby Renovate mógł działać', en: 'So that Renovate can run at all' },
            { pl: 'Żeby przyspieszyć tree-shaking', en: 'To speed up tree-shaking' }
          ],
          correct: 0,
          explain: {
            pl: 'Lockfile zapisuje dokładne wersje całego drzewa przechodniego. Bez frozen-lockfile CI może rozwiązać inne wersje i produkować błędy niemożliwe do odtworzenia lokalnie.',
            en: 'The lockfile records exact versions of the whole transitive tree. Without frozen-lockfile, CI may resolve different versions and produce failures you cannot reproduce locally.'
          }
        },
        {
          q: { pl: 'Które podejście do konfiguracji Renovate jest najzdrowsze w dużym monorepo?', en: 'Which Renovate configuration approach is healthiest in a large monorepo?' },
          options: [
            { pl: 'Osobny PR dla każdego pakietu, wszystkie wymagają ręcznego review', en: 'A separate PR per package, all requiring manual review' },
            { pl: 'Wyłączyć wszystko poza podatnościami bezpieczeństwa', en: 'Disable everything except security advisories' },
            { pl: 'Grupować patche i minory z automatycznym mergem na zielonym CI, majory jako osobne tickety', en: 'Group patches and minors with automerge on green CI, majors as separate tickets' },
            { pl: 'Aktualizować wszystko naraz raz na kwartał', en: 'Update everything at once, once per quarter' }
          ],
          correct: 2,
          explain: {
            pl: 'Podział na strumienie o różnym ryzyku ogranicza szum bez utraty kontroli. Osobny PR na pakiet zabija zespół recenzjami, a kwartalna kumulacja zamienia aktualizację w projekt.',
            en: 'Splitting by risk stream cuts noise without losing control. A PR per package drowns the team in reviews, and quarterly batching turns upgrades into a project.'
          }
        },
        {
          q: { pl: 'Publikujesz wersję 5.0 design systemu ze zmianami łamiącymi. Co jest najważniejsze dla zespołów konsumujących?', en: 'You are publishing design system 5.0 with breaking changes. What matters most to consuming teams?' },
          options: [
            { pl: 'Ładny changelog i wpis na blogu', en: 'A pretty changelog and a blog post' },
            { pl: 'Codemod plus utrzymywana linia 4.x z ogłoszoną datą końca wsparcia', en: 'A codemod plus a maintained 4.x line with an announced end-of-life date' },
            { pl: 'Wymuszenie migracji w ciągu tygodnia', en: 'Forcing everyone to migrate within a week' },
            { pl: 'Zachowanie wstecznej kompatybilności w nieskończoność', en: 'Keeping backwards compatibility forever' }
          ],
          correct: 1,
          explain: {
            pl: 'Zespoły potrzebują ścieżki wyjścia i twardego terminu. Codemod obniża koszt, a data EOL tworzy priorytet - bez niej migracja nigdy nie wygra z pracą produktową.',
            en: 'Teams need an escape path and a hard deadline. The codemod lowers cost and the EOL date creates priority - without it migration never beats product work.'
          }
        },
        {
          q: { pl: 'Który zestaw praktyk najmocniej zmniejsza ryzyko ataku na łańcuch dostaw w frontendzie?', en: 'Which set of practices most reduces frontend supply chain risk?' },
          options: [
            { pl: 'Instalacja z ignore-scripts w CI, przypinanie akcji GitHub do SHA i okres karencji dla świeżych wersji', en: 'Installing with ignore-scripts in CI, pinning GitHub Actions to a SHA and a cooldown on fresh releases' },
            { pl: 'Używanie wyłącznie pakietów z ponad milionem pobrań tygodniowo', en: 'Using only packages with over a million weekly downloads' },
            { pl: 'Uruchamianie npm audit raz na kwartał', en: 'Running npm audit once a quarter' },
            { pl: 'Trzymanie zależności zamrożonych przez rok', en: 'Freezing dependencies for a year' }
          ],
          correct: 0,
          explain: {
            pl: 'Skrypty postinstall to główny wektor wykonania obcego kodu, tag akcji można przesunąć na złośliwy commit, a większość skompromitowanych paczek wykrywa się w pierwszych dniach. Zamrożenie zależności podnosi ryzyko, bo blokuje łatki bezpieczeństwa.',
            en: 'Postinstall scripts are the main arbitrary-code vector, an action tag can be moved to a malicious commit, and most compromised packages are caught within days. Freezing dependencies raises risk, because it blocks security patches.'
          }
        }
      ]
    }
  ]
};
