export default {
  id: 'evals-observability',
  order: 5,
  icon: '📊',
  title: { pl: 'Ewaluacje i obserwowalność', en: 'Evals & Observability' },
  description: {
    pl: 'Jak zmierzyć, czy Twoja aplikacja LLM naprawdę działa: zestawy testowe, sędzia-model, tracing i bramki w CI zamiast klikania na czuja.',
    en: 'How to measure whether your LLM app actually works: golden sets, LLM judges, tracing and CI gates instead of shipping on vibes.'
  },
  lessons: [
    {
      id: 'why-evals',
      title: { pl: 'Dlaczego ewaluacje (evals)', en: 'Why evals' },
      minutes: 9,
      terms: [
        { term: { pl: 'Eval (ewaluacja)', en: 'Eval' }, def: { pl: 'Zestaw zapisanych wejść plus kryterium poprawności, uruchamiany po każdej zmianie promptu, modelu lub retrievera. Odpowiednik <code>npm test</code> dla aplikacji LLM.', en: 'A set of saved inputs plus a pass criterion, run after every change to the prompt, model or retriever. The <code>npm test</code> of LLM apps.' } },
        { term: { pl: 'Pass rate', en: 'Pass rate' }, def: { pl: 'Odsetek przypadków, które przeszły cały zestaw. Nie musi być wysoki, musi być <em>porównywalny</em> między wersją A i B.', en: 'The percentage of cases that passed the suite. It does not have to be high, it has to be <em>comparable</em> between version A and B.' } },
        { term: { pl: 'Wariancja przebiegu', en: 'Run variance' }, def: { pl: 'Nawet przy temperature 0 wynik nie jest w pełni deterministyczny. Przy 50 przypadkach błąd standardowy to około 4-5 punktów procentowych, więc małe różnice to szum.', en: 'Even at temperature 0 results are not fully deterministic. At 50 cases the standard error is around 4-5 percentage points, so small deltas are noise.' } },
        { term: { pl: 'Przypadek regresyjny', en: 'Regression case' }, def: { pl: 'Każdy bug zgłoszony przez użytkownika dopisany do zestawu jako nowy przypadek, dokładnie jak test regresyjny po incydencie.', en: 'Every user-reported bug added to the suite as a new case, exactly like a regression test after an incident.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev1-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="20" y="30" font-family="inherit" font-size="15" fill="var(--warn)">Shipping on vibes</text><rect x="20" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="85" y="78" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Edit the</text><text x="85" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">prompt</text><line x1="152" y1="82" x2="176" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="180" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="245" y="78" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Try 2 inputs</text><text x="245" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">by hand</text><line x1="312" y1="82" x2="336" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="340" y="50" width="120" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="400" y="88" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Ship</text><line x1="462" y1="82" x2="486" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="490" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="555" y="78" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">Silent</text><text x="555" y="96" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">regression</text><line x1="20" y1="160" x2="620" y2="160" stroke="var(--border)" stroke-width="2"/><text x="20" y="205" font-family="inherit" font-size="15" fill="var(--ok)">Shipping with evals</text><rect x="20" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="85" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Edit the</text><text x="85" y="271" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">prompt</text><line x1="152" y1="257" x2="176" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="180" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="245" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Run 200</text><text x="245" y="271" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">saved cases</text><line x1="312" y1="257" x2="336" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="340" y="225" width="120" height="64" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="400" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">87 to 91</text><text x="400" y="271" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">pass rate</text><line x1="462" y1="257" x2="486" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="490" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="555" y="253" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">Ship, or</text><text x="555" y="271" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">revert</text><text x="20" y="340" font-family="inherit" font-size="13" fill="var(--muted)">Same edit, same model. The only difference is that one loop</text><text x="20" y="362" font-family="inherit" font-size="13" fill="var(--muted)">produces a number you can compare across versions.</text></svg>',
        caption: {
          pl: 'Ta sama zmiana promptu w dwóch pętlach: na czuja i z zestawem testowym. Różnica to liczba, którą da się porównać między wersjami.',
          en: 'The same prompt change in two loops: by vibes and with a saved test set. The difference is a number you can compare across versions.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że gotujesz zupę dla stu osób. Dorzucasz szczyptę soli, próbujesz jedną łyżeczkę i mówisz: "no, chyba lepiej". Następnego dnia dorzucasz czosnek, znowu jedna łyżeczka, znowu "chyba lepiej". Po tygodniu zupa jest okropna, ale nie wiesz, który składnik ją zepsuł, bo za każdym razem próbowałeś tylko raz i tylko sam.</p><p>Teraz inna wersja: masz dziesięć osób, które zawsze próbują tę samą zupę i zawsze mówią, czy jest za słona, za ostra, czy w sam raz. Zapisujesz ich oceny. Kiedy dorzucisz czosnek, od razu widzisz: siedem osób mówi lepiej, trzy gorzej. Kiedy zupa nagle spada z ośmiu punktów na cztery, wiesz dokładnie, która zmiana to zrobiła.</p><p>Ewaluacje to właśnie ci probierze. Zbiór pytań, na które znasz dobre odpowiedzi, uruchamiany za każdym razem, gdy coś zmieniasz. Bez nich zgadujesz. Z nimi wiesz.</p>',
          en: '<p>Imagine cooking soup for a hundred people. You add a pinch of salt, taste one spoonful, and say "yeah, better". Next day you add garlic, one spoonful again, "better again". A week later the soup is awful, but you have no idea which ingredient ruined it, because every time you tasted once, and only you tasted.</p><p>Now a different version: ten people always taste the same soup and always say whether it is too salty, too spicy, or just right. You write their scores down. When you add garlic you immediately see: seven say better, three say worse. When the soup suddenly drops from eight points to four, you know exactly which change did it.</p><p>Evals are those tasters. A collection of questions you already know good answers to, run every single time you change something. Without them you are guessing. With them you know.</p>'
        },
        school: {
          pl: '<p>Kiedy piszesz zwykły kod, masz testy. Zmieniasz funkcję, odpalasz <code>npm test</code>, widzisz czerwono albo zielono. Przy aplikacjach z LLM ludzie zwykle tego nie robią. Zmieniają prompt, wklejają jedno pytanie do czatu, patrzą na odpowiedź i mówią "spoko, działa". To jest testowanie na czuja i nie skaluje się ani trochę.</p><p>Problem jest taki, że model nie ma sztywnego kontraktu. Ta sama zmiana, która poprawia odpowiedzi na pytania o faktury, może zepsuć odpowiedzi na pytania o zwroty. Nie zobaczysz tego, jeśli sprawdzisz dwa przypadki, które akurat przyszły Ci do głowy. Zobaczysz to dopiero, gdy zgłoszą to użytkownicy, czyli tydzień później i w gorszym miejscu.</p><p><strong>Eval (ewaluacja)</strong> to zestaw zapisanych przykładów wejścia razem z opisem, jak wygląda dobra odpowiedź, plus sposób sprawdzenia. Najprostsza wersja to zwykła tablica:</p><pre><code>const cases = [\n  { input: "Gdzie jest moja paczka 12345?",\n    mustCall: "get_order_status",\n    mustNotSay: ["nie mam dostepu"] },\n  { input: "Chce zwrot", mustCall: "start_return" }\n];</code></pre><p>Uruchamiasz to na 100 albo 300 takich przypadków i dostajesz jedną liczbę: ile procent przeszło. Ta liczba nie musi być idealna. Musi być porównywalna między wersją A i wersją B. Wtedy nagle "chyba lepiej" zamienia się w "87 procent poszło na 91 procent, mergujemy".</p><p>Efekt uboczny jest ciekawy: sam proces pisania przypadków testowych zmusza Cię do zdefiniowania, co w ogóle znaczy dobra odpowiedź. Bardzo często to jest najtrudniejsza część całego projektu.</p>',
          en: '<p>When you write normal code you have tests. You change a function, run <code>npm test</code>, and see red or green. With LLM apps most people skip that. They tweak a prompt, paste one question into a chat, look at the answer and say "cool, works". That is vibes-testing and it does not scale at all.</p><p>The problem is that the model has no rigid contract. The same change that improves answers about invoices can quietly break answers about refunds. You will not catch it by checking the two cases that happened to come to mind. You will catch it when users report it, a week later and in a worse place.</p><p>An <strong>eval</strong> is a set of saved inputs plus a description of what a good answer looks like, plus a way to check it. The simplest version is a plain array:</p><pre><code>const cases = [\n  { input: "Where is my parcel 12345?",\n    mustCall: "get_order_status",\n    mustNotSay: ["I do not have access"] },\n  { input: "I want a refund", mustCall: "start_return" }\n];</code></pre><p>You run that over 100 or 300 such cases and you get one number: what percentage passed. That number does not have to be perfect. It has to be comparable between version A and version B. Suddenly "feels better" turns into "87 percent went to 91 percent, merge it".</p><p>There is a nice side effect: writing the cases forces you to define what a good answer even means. Very often that is the hardest part of the whole project.</p>'
        },
        pro: {
          pl: '<p>Ewaluacje to dziś największy wyróżnik na rynku pracy w AI. Prompt napisze każdy. Postawienie pętli, która mówi, czy nowy prompt, nowy model albo nowy retriever jest lepszy od poprzedniego, to już inżynieria i to jest to, o co pytają na rozmowach.</p><p>Kilka twardych zasad, które warto mieć w głowie:</p><ul><li><strong>Zacznij od 20 przypadków, nie od 2000.</strong> Dwadzieścia realnych przykładów z produkcji da Ci więcej niż dwieście wymyślonych. Rozbudowuj zestaw przy każdym bugu: każdy raport od użytkownika ładnie zamienia się w nowy case, dokładnie jak regression test po incydencie.</li><li><strong>Mierz osobno komponenty i cały system.</strong> W RAG-u osobno oceniasz retrieval (recall@k), osobno generację. Jeśli mierzysz tylko końcową odpowiedź, nie wiesz, czy naprawiać chunking czy prompt.</li><li><strong>Pilnuj wariancji.</strong> Przy temperature 0 model i tak nie jest w pełni deterministyczny (kolejność redukcji zmiennoprzecinkowych, batching po stronie dostawcy, MoE routing). Różnica 87 do 89 procent na 50 przypadkach to szum. Przy n=50 błąd standardowy proporcji to około 4-5 punktów procentowych, więc albo powiększasz zestaw, albo odpalasz 3 przebiegi i patrzysz na średnią.</li><li><strong>Trzymaj zestaw w repo, nie w głowie.</strong> Pliki JSONL obok kodu, wersjonowane w git, plus dataset w Langfuse albo Braintrust dla widoku historycznego.</li></ul><p>Minimalny bieg testowy wygląda mniej więcej tak:</p><pre><code>import { readFileSync } from "node:fs";\n\nconst cases = readFileSync("evals/support.jsonl", "utf8")\n  .trim().split("\\n").map(JSON.parse);\n\nlet pass = 0;\nfor (const c of cases) {\n  const out = await runAgent(c.input);\n  const ok = c.mustCall.every(t =&gt; out.toolCalls.includes(t));\n  if (ok) pass++;\n  else console.log("FAIL", c.id, out.toolCalls);\n}\nconsole.log("pass rate", (pass / cases.length * 100).toFixed(1));</code></pre><p>Koszt jest realny, ale mniejszy niż się wydaje. 300 przypadków po około 3 tysiące tokenów wejścia i 400 wyjścia to przy cenach rzędu 3 dolarów za milion tokenów wejścia i 15 za milion wyjścia około 4-5 dolarów za pełny przebieg. Odpalany przy każdym PR-ze to kilkadziesiąt dolarów miesięcznie, czyli mniej niż jedna godzina debugowania produkcji.</p><p>Najczęstsza pułapka: zestaw, w którym wszystko przechodzi. Jeśli masz 100 procent, zestaw jest za łatwy i niczego już nie wykrywa. Celuj w 70-90 procent i dokładaj trudne przypadki, gdy tylko wynik zaczyna się sufitować.</p>',
          en: '<p>Evals are currently the biggest differentiator on the AI job market. Anyone can write a prompt. Building the loop that tells you whether a new prompt, a new model or a new retriever is better than the last one is engineering, and that is what interviews probe.</p><p>A few hard rules worth carrying around:</p><ul><li><strong>Start with 20 cases, not 2000.</strong> Twenty real production examples beat two hundred invented ones. Grow the set on every bug: each user report converts cleanly into a new case, exactly like a regression test after an incident.</li><li><strong>Measure components and the whole system separately.</strong> In RAG you score retrieval (recall@k) apart from generation. If you only score the final answer you cannot tell whether to fix chunking or the prompt.</li><li><strong>Respect variance.</strong> At temperature 0 the model is still not fully deterministic (floating-point reduction order, provider-side batching, MoE routing). A move from 87 to 89 percent on 50 cases is noise. At n=50 the standard error of a proportion is roughly 4-5 percentage points, so either grow the set or run 3 passes and average.</li><li><strong>Keep the set in the repo, not in your head.</strong> JSONL files next to the code, versioned in git, plus a dataset in Langfuse or Braintrust for the historical view.</li></ul><p>A minimal run looks roughly like this:</p><pre><code>import { readFileSync } from "node:fs";\n\nconst cases = readFileSync("evals/support.jsonl", "utf8")\n  .trim().split("\\n").map(JSON.parse);\n\nlet pass = 0;\nfor (const c of cases) {\n  const out = await runAgent(c.input);\n  const ok = c.mustCall.every(t =&gt; out.toolCalls.includes(t));\n  if (ok) pass++;\n  else console.log("FAIL", c.id, out.toolCalls);\n}\nconsole.log("pass rate", (pass / cases.length * 100).toFixed(1));</code></pre><p>The cost is real but smaller than people fear. 300 cases at about 3k input and 400 output tokens, at prices around 3 dollars per million input and 15 per million output tokens, comes to roughly 4-5 dollars per full run. Run on every PR that is tens of dollars a month, less than one hour of production debugging.</p><p>The most common trap: a suite where everything passes. If you are at 100 percent the set is too easy and detects nothing. Aim for 70-90 percent and add hard cases as soon as the score starts hitting the ceiling.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest najbliższa analogia ewaluacji w świecie frontendu?',
            en: 'What is the closest frontend-world analogy for evals?'
          },
          options: [
            { pl: 'Linter, który sprawdza styl kodu', en: 'A linter checking code style' },
            { pl: 'Zestaw testów regresyjnych uruchamianych przy każdej zmianie', en: 'A regression test suite run on every change' },
            { pl: 'Source mapy do debugowania', en: 'Source maps for debugging' },
            { pl: 'Tree shaking w bundlerze', en: 'Bundler tree shaking' }
          ],
          correct: 1,
          explain: {
            pl: 'Ewaluacje pełnią dokładnie tę samą rolę co testy regresyjne: chronią przed cichym zepsuciem czegoś, co działało, gdy zmieniasz prompt, model albo retriever.',
            en: 'Evals play exactly the role of regression tests: they protect against silently breaking something that used to work when you change a prompt, model or retriever.'
          }
        },
        {
          q: {
            pl: 'Twój zestaw ewaluacyjny ma 40 przypadków i przechodzi 100 procent od trzech miesięcy. Co to najpewniej oznacza?',
            en: 'Your eval set has 40 cases and has passed 100 percent for three months. What does that most likely mean?'
          },
          options: [
            { pl: 'Aplikacja jest gotowa, można przestać mierzyć', en: 'The app is done, you can stop measuring' },
            { pl: 'Model przestał halucynować', en: 'The model stopped hallucinating' },
            { pl: 'Zestaw jest za łatwy i nie wykrywa już regresji', en: 'The set is too easy and no longer detects regressions' },
            { pl: 'Trzeba obniżyć temperature', en: 'You should lower the temperature' }
          ],
          correct: 2,
          explain: {
            pl: 'Zestaw przy sufitowej wartości nie niesie informacji. Dokładaj trudne przypadki z produkcji, aż wynik zejdzie w okolice 70-90 procent.',
            en: 'A suite pinned at the ceiling carries no information. Add hard production cases until the score drops back toward 70-90 percent.'
          }
        },
        {
          q: {
            pl: 'Dlaczego nie wystarczy ręcznie sprawdzić dwóch przykładów po zmianie promptu?',
            en: 'Why is manually checking two examples after a prompt change not enough?'
          },
          options: [
            { pl: 'Bo zmiana która poprawia jedną klasę wejść, często psuje inną, której nie sprawdziłeś', en: 'Because a change that improves one class of inputs often breaks another one you did not check' },
            { pl: 'Bo API nie pozwala na ręcznie wysyłane zapytania', en: 'Because the API does not allow manually sent requests' },
            { pl: 'Bo prompty są cachowane i wynik i tak byłby stary', en: 'Because prompts are cached, so the result would be stale anyway' },
            { pl: 'Bo temperature 0 zawsze zwraca to samo', en: 'Because temperature 0 always returns the same thing' }
          ],
          correct: 0,
          explain: {
            pl: 'Model nie ma sztywnego kontraktu, więc efekty zmiany rozlewają się po całej przestrzeni wejść. Dwa przykłady pokrywają jej ułamek promila.',
            en: 'The model has no rigid contract, so a change ripples across the whole input space. Two examples cover a vanishing fraction of it.'
          }
        },
        {
          q: {
            pl: 'Na 50 przypadkach wynik wzrósł z 86 na 88 procent po zmianie promptu. Co robisz?',
            en: 'On 50 cases the score went from 86 to 88 percent after a prompt change. What do you do?'
          },
          options: [
            { pl: 'Mergujesz, dwa punkty to wyraźna poprawa', en: 'Merge, two points is a clear improvement' },
            { pl: 'Cofasz zmianę, bo poprawa jest za mała żeby była prawdziwa', en: 'Revert, the gain is too small to be real' },
            { pl: 'Traktujesz to jako szum: powiększasz zestaw lub odpalasz kilka przebiegów', en: 'Treat it as noise: grow the set or run several passes' },
            { pl: 'Zmieniasz metrykę na taką, która pokazuje większą różnicę', en: 'Switch to a metric that shows a bigger difference' }
          ],
          correct: 2,
          explain: {
            pl: 'Przy n=50 błąd standardowy proporcji to około 4-5 punktów procentowych, więc 2 punkty mieszczą się w szumie. Więcej danych albo powtórzone przebiegi rozstrzygają sprawę.',
            en: 'At n=50 the standard error of a proportion is around 4-5 percentage points, so 2 points sits inside the noise. More data or repeated runs settle it.'
          }
        }
      ]
    },

    {
      id: 'eval-types',
      title: { pl: 'Rodzaje ewaluacji', en: 'Types of evals' },
      minutes: 11,
      terms: [
        { term: { pl: 'Golden set', en: 'Golden set' }, def: { pl: 'Ręcznie zatwierdzony zbiór wejść z oczekiwanymi odpowiedziami. Rośnie z produkcji i służy jako punkt odniesienia dla każdej wersji.', en: 'A hand-curated set of inputs with expected answers. It grows from production and serves as the reference point for every version.' } },
        { term: { pl: 'Asercja deterministyczna', en: 'Deterministic assertion' }, def: { pl: 'Zwykły kod sprawdzający twarde warunki: poprawny schemat JSON, wywołane narzędzie, brak zakazanej frazy. Najtańsza i najstabilniejsza warstwa, 60-70 procent checków.', en: 'Plain code checking hard conditions: valid JSON schema, tool actually called, forbidden phrase absent. The cheapest and most stable layer, 60-70 percent of checks.' } },
        { term: { pl: 'Porównanie parami', en: 'Pairwise comparison' }, def: { pl: 'Zamiast oceny bezwzględnej sędzia albo człowiek wybiera lepszą z dwóch odpowiedzi. Łatwiejsze do wykonania i stabilniejsze niż skala 1-10.', en: 'Instead of an absolute score, a judge or a human picks the better of two answers. Easier to do and more stable than a 1-10 scale.' } },
        { term: { pl: 'Holdout set', en: 'Holdout set' }, def: { pl: 'Część przypadków nigdy nie używana przy tuningu promptu. Chroni przed przeuczeniem się pod własny zestaw testowy.', en: 'A slice of cases never used while tuning the prompt. It guards against overfitting to your own test set.' } },
        { term: { pl: 'A/B na ruchu', en: 'A/B on traffic' }, def: { pl: 'Ostateczny sąd: dwie wersje na żywych użytkownikach porównywane metrykami produktowymi (retencja, eskalacje, konwersja), nie samym pass rate.', en: 'The final verdict: two versions on live users compared with product metrics (retention, escalations, conversion), not just pass rate.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev2-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><line x1="48" y1="40" x2="48" y2="352" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev2-arrow)"/><text x="20" y="30" font-family="inherit" font-size="13" fill="var(--muted)">cheap</text><text x="20" y="380" font-family="inherit" font-size="13" fill="var(--muted)">costly</text><rect x="80" y="36" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="98" y="64" font-family="inherit" font-size="14" fill="var(--text)">Code assertions</text><text x="98" y="86" font-family="inherit" font-size="13" fill="var(--muted)">JSON parses, schema valid, no PII</text><text x="424" y="74" font-family="inherit" font-size="13" fill="var(--muted)">every commit</text><rect x="80" y="118" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="98" y="146" font-family="inherit" font-size="14" fill="var(--text)">Golden set</text><text x="98" y="168" font-family="inherit" font-size="13" fill="var(--muted)">expected output, exact or fuzzy match</text><text x="424" y="156" font-family="inherit" font-size="13" fill="var(--muted)">every PR</text><rect x="80" y="200" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="98" y="228" font-family="inherit" font-size="14" fill="var(--text)">LLM as judge</text><text x="98" y="250" font-family="inherit" font-size="13" fill="var(--muted)">rubric score, pairwise A vs B</text><text x="424" y="238" font-family="inherit" font-size="13" fill="var(--muted)">nightly</text><rect x="80" y="282" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="98" y="310" font-family="inherit" font-size="14" fill="var(--text)">Humans and A/B</text><text x="98" y="332" font-family="inherit" font-size="13" fill="var(--muted)">review queue, live traffic split</text><text x="424" y="320" font-family="inherit" font-size="13" fill="var(--muted)">weekly</text><text x="80" y="386" font-family="inherit" font-size="13" fill="var(--muted)">Push every check as far up this ladder as it will go.</text></svg>',
        caption: {
          pl: 'Drabina ewaluacji: im wyżej, tym taniej i częściej. Każdy sprawdzian przesuwaj tak wysoko, jak się da.',
          en: 'The eval ladder: the higher you go, the cheaper and more frequent. Push every check as high up as it will go.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wróć do zupy. Są cztery sposoby, żeby sprawdzić, czy wyszła dobra, i każdy kosztuje inaczej.</p><p>Pierwszy: patrzysz, czy w garnku w ogóle jest zupa, a nie woda z makaronem. To zajmuje sekundę i nic nie kosztuje. Drugi: masz zapisany przepis babci i porównujesz, czy Twoja zupa ma te same składniki. Też tanie, ale trzeba mieć przepis. Trzeci: prosisz kolegę kucharza, żeby spróbował i powiedział, która z dwóch zup jest lepsza. Kosztuje trochę czasu i kolega czasem się myli. Czwarty: zapraszasz stu prawdziwych gości i patrzysz, która zupa znika z talerzy. To najprawdziwsza odpowiedź, ale najdroższa i najwolniejsza.</p><p>Mądry kucharz używa wszystkich czterech, tylko w innych momentach. Pierwsze dwa przy każdym mieszaniu łyżką, trzeci raz dziennie, czwarty raz na tydzień.</p>',
          en: '<p>Back to the soup. There are four ways to check whether it turned out well, and each costs something different.</p><p>First: you look whether there is soup in the pot at all, and not just water with noodles. That takes a second and costs nothing. Second: you have grandma\'s written recipe and you compare whether your soup has the same ingredients. Also cheap, but you need the recipe. Third: you ask a fellow cook to taste and say which of two soups is better. That costs some time and the friend is sometimes wrong. Fourth: you invite a hundred real guests and watch which soup disappears from the plates. That is the truest answer, and the most expensive and slowest one.</p><p>A smart cook uses all four, just at different moments. The first two on every stir of the spoon, the third once a day, the fourth once a week.</p>'
        },
        school: {
          pl: '<p>Ewaluacje układają się w drabinkę od najtańszych do najdroższych. Zasada jest prosta: każdy sprawdzian przesuwaj tak wysoko, jak da radę.</p><p><strong>1. Asercje w kodzie.</strong> Zwykły kod, zero modelu, milisekundy. Czy odpowiedź to poprawny JSON. Czy przechodzi schema z zod. Czy nie zawiera numeru karty. Czy długość mieści się w limicie. Czy agent wywołał narzędzie <code>get_order_status</code>, a nie <code>refund</code>. To łapie zaskakująco dużo błędów i kosztuje dokładnie nic.</p><p><strong>2. Golden set (zestaw wzorcowy).</strong> Zapisane pary wejście-oczekiwane wyjście. Działa świetnie, gdy odpowiedź jest wąska: klasyfikacja intencji, ekstrakcja pola z faktury, wybór narzędzia. Porównanie może być dokładne albo rozmyte, na przykład "musi zawierać numer zamówienia i słowo zwrot".</p><p><strong>3. Model jako sędzia.</strong> Gdy dobrych odpowiedzi jest wiele, na przykład przy podsumowaniu maila, prosisz drugi model, żeby ocenił wynik według rubryki albo wskazał lepszą z dwóch wersji. Tanie w porównaniu z człowiekiem, ale ma swoje uprzedzenia (o tym w następnej lekcji).</p><p><strong>4. Ludzie i testy A/B.</strong> Kolejka do przeglądu dla zespołu supportu, kciuki w górę i w dół od użytkowników, wreszcie podział ruchu 50/50 między dwie wersje promptu i porównanie tego, co naprawdę Cię interesuje: liczby eskalacji do człowieka, czasu rozwiązania, retencji.</p><p>Bardzo ważna para pojęć: <strong>pairwise (porównanie parami)</strong> jest dużo łatwiejsze i stabilniejsze niż ocena bezwzględna. Zapytanie "która odpowiedź jest lepsza, A czy B" daje spójniejsze wyniki niż "oceń tę odpowiedź od 1 do 10", zarówno u ludzi, jak i u modeli. Dokładnie tak samo jak w code review: łatwiej powiedzieć, która z dwóch implementacji jest czystsza, niż przyznać jednej ocenę 7/10.</p>',
          en: '<p>Evals form a ladder from cheapest to most expensive. The rule is simple: push every check as high up as it will go.</p><p><strong>1. Code assertions.</strong> Plain code, no model, milliseconds. Is the response valid JSON. Does it pass a zod schema. Does it contain a card number. Is the length within limits. Did the agent call <code>get_order_status</code> and not <code>refund</code>. This catches a surprising number of bugs and costs exactly nothing.</p><p><strong>2. Golden set.</strong> Saved input-to-expected-output pairs. Works great when the answer is narrow: intent classification, extracting a field from an invoice, picking a tool. The comparison can be exact or fuzzy, for example "must contain the order number and the word refund".</p><p><strong>3. LLM as judge.</strong> When many answers are good, for example when summarising an email, you ask a second model to score the output against a rubric or to pick the better of two versions. Cheap compared to a human, but it carries biases (next lesson).</p><p><strong>4. Humans and A/B tests.</strong> A review queue for the support team, thumbs up and down from users, and finally a 50/50 traffic split between two prompt versions comparing what you actually care about: escalation rate, time to resolution, retention.</p><p>One very important pair of concepts: <strong>pairwise comparison</strong> is far easier and more stable than absolute scoring. Asking "which answer is better, A or B" gives more consistent results than "rate this answer 1 to 10", both for humans and for models. Exactly like code review: it is easier to say which of two implementations is cleaner than to give one a 7 out of 10.</p>'
        },
        pro: {
          pl: '<p>W produkcji układa się to w piramidę, którą zna każdy, kto pisał testy: dużo tanich na dole, mało drogich na górze. Konkretny podział, który dobrze działa:</p><h4>Warstwa 1: deterministyczne asercje (60-70 procent przypadków)</h4><p>Zero wywołań modelu poza samym generowaniem odpowiedzi. Walidacja zod albo JSON Schema, regexy na PII, sprawdzenie sekwencji tool calls, limity tokenów, obecność cytowań z retrievalu. Czas: milisekundy. Odpalane przy każdym commicie razem z jednostkowymi.</p><h4>Warstwa 2: golden set z rozmytym dopasowaniem</h4><p>Do zadań z wąskim wyjściem używasz exact match albo znormalizowanego porównania. Do dłuższych tekstów: <code>ROUGE-L</code>, podobieństwo embeddingowe (cosine powyżej 0.85 względem referencji) albo lista wymaganych i zakazanych fraz. Podobieństwo embeddingowe jest wygodne, ale kłamie przy negacji, więc nigdy nie używaj go samego do faktów.</p><h4>Warstwa 3: sędzia modelowy z rubryką</h4><p>Najlepiej pairwise względem zapisanej baseline. Wynik agregujesz jako win rate: ile procent przypadków nowa wersja wygrała z poprzednią. Koszt to zwykle sam prompt sędziego, ok. 1500 tokenów na przypadek.</p><h4>Warstwa 4: ludzie i A/B na ruchu</h4><p>Kolejka przeglądowa w Langfuse albo Braintrust, gdzie annotator oznacza 30-50 śladów tygodniowo, plus eksperyment na ruchu. Pamiętaj, że do wykrycia poprawy o 2 punkty procentowe w metryce biznesowej przy bazie 20 procent potrzebujesz rzędu kilkunastu tysięcy sesji na wariant, więc A/B to narzędzie do dużych zmian, nie do tweaków promptu.</p><pre><code>// warstwa 1 i 2 w jednym runnerze\nconst checks = {\n  schema: (o) =&gt; Reply.safeParse(o.json).success,\n  citations: (o) =&gt; o.json.citations.length &gt; 0,\n  noPii: (o) =&gt; !/\\b\\d{16}\\b/.test(o.text),\n  toolOrder: (o, c) =&gt; o.toolCalls.join("&gt;") === c.expectedTools.join("&gt;")\n};\n\nconst results = cases.map((c) =&gt; {\n  const out = run(c);\n  return Object.entries(checks)\n    .map(([name, fn]) =&gt; ({ case: c.id, name, ok: fn(out, c) }));\n});</code></pre><p>Dwie rzeczy, o które pytają na rozmowach. Po pierwsze, <strong>rozdzielaj metryki na komponenty</strong>: w RAG-u recall@10 dla retrievalu, faithfulness dla generacji, end-to-end pass rate dla całości. Po drugie, <strong>trzymaj zbiór holdout</strong>: jeśli cały czas dostrajasz prompt do tych samych 200 przypadków, po miesiącu masz klasyczny overfitting do zestawu testowego. Odłóż 20-30 procent przypadków, których nie oglądasz podczas iterowania, i sprawdzaj je tylko przed wydaniem.</p>',
          en: '<p>In production this stacks into a pyramid anyone who has written tests will recognise: many cheap ones at the bottom, few expensive ones at the top. A concrete split that works well:</p><h4>Layer 1: deterministic assertions (60-70 percent of checks)</h4><p>Zero model calls beyond generating the answer itself. zod or JSON Schema validation, PII regexes, tool-call sequence checks, token limits, presence of retrieval citations. Runtime: milliseconds. Run on every commit alongside unit tests.</p><h4>Layer 2: golden set with fuzzy matching</h4><p>For narrow-output tasks use exact match or normalised comparison. For longer text: <code>ROUGE-L</code>, embedding similarity (cosine above 0.85 against the reference) or a list of required and forbidden phrases. Embedding similarity is convenient but lies about negation, so never use it alone for factual claims.</p><h4>Layer 3: LLM judge with a rubric</h4><p>Preferably pairwise against a saved baseline. Aggregate the result as a win rate: what percentage of cases the new version beat the previous one. Cost is basically the judge prompt, around 1500 tokens per case.</p><h4>Layer 4: humans and A/B on traffic</h4><p>A review queue in Langfuse or Braintrust where an annotator labels 30-50 traces per week, plus a traffic experiment. Remember that detecting a 2 percentage point lift on a business metric with a 20 percent base needs on the order of tens of thousands of sessions per arm, so A/B is a tool for big changes, not prompt tweaks.</p><pre><code>// layers 1 and 2 in one runner\nconst checks = {\n  schema: (o) =&gt; Reply.safeParse(o.json).success,\n  citations: (o) =&gt; o.json.citations.length &gt; 0,\n  noPii: (o) =&gt; !/\\b\\d{16}\\b/.test(o.text),\n  toolOrder: (o, c) =&gt; o.toolCalls.join("&gt;") === c.expectedTools.join("&gt;")\n};\n\nconst results = cases.map((c) =&gt; {\n  const out = run(c);\n  return Object.entries(checks)\n    .map(([name, fn]) =&gt; ({ case: c.id, name, ok: fn(out, c) }));\n});</code></pre><p>Two things interviewers ask about. First, <strong>split metrics per component</strong>: in RAG that is recall@10 for retrieval, faithfulness for generation, end-to-end pass rate for the whole. Second, <strong>keep a holdout set</strong>: if you keep tuning the prompt against the same 200 cases, after a month you have textbook overfitting to your test set. Hold back 20-30 percent of cases you never look at while iterating and check them only before a release.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Który rodzaj sprawdzenia jest najtańszy i powinien być uruchamiany najczęściej?',
            en: 'Which kind of check is cheapest and should run most often?'
          },
          options: [
            { pl: 'Ocena przez ludzkiego annotatora', en: 'Human annotator review' },
            { pl: 'Test A/B na ruchu produkcyjnym', en: 'An A/B test on production traffic' },
            { pl: 'Deterministyczna asercja w kodzie, np. walidacja zod', en: 'A deterministic code assertion, e.g. zod validation' },
            { pl: 'Sędzia modelowy z rubryką', en: 'An LLM judge with a rubric' }
          ],
          correct: 2,
          explain: {
            pl: 'Asercje w kodzie kosztują milisekundy i zero tokenów, więc można je odpalać przy każdym commicie. Łapią zaskakująco dużą część realnych błędów.',
            en: 'Code assertions cost milliseconds and zero tokens, so they can run on every commit. They catch a surprisingly large share of real bugs.'
          }
        },
        {
          q: {
            pl: 'Dlaczego porównanie parami (A vs B) daje stabilniejsze wyniki niż ocena w skali 1-10?',
            en: 'Why does pairwise comparison (A vs B) give more stable results than a 1-10 rating?'
          },
          options: [
            { pl: 'Bo wybór lepszej z dwóch opcji nie wymaga wspólnej, ustalonej skali', en: 'Because picking the better of two does not require a shared, calibrated scale' },
            { pl: 'Bo zużywa mniej tokenów wyjściowych', en: 'Because it uses fewer output tokens' },
            { pl: 'Bo można go liczyć bez wywołania modelu', en: 'Because it can be computed without a model call' },
            { pl: 'Bo eliminuje halucynacje w odpowiedziach', en: 'Because it eliminates hallucinations in the answers' }
          ],
          correct: 0,
          explain: {
            pl: 'Skale bezwzględne dryfują u ludzi i u modeli: to samo "7" znaczy co innego w poniedziałek i w piątek. Porównanie względne omija ten problem.',
            en: 'Absolute scales drift for humans and models alike: the same "7" means different things on Monday and Friday. A relative comparison sidesteps that.'
          }
        },
        {
          q: {
            pl: 'Sprawdzasz podobieństwo embeddingowe odpowiedzi do referencji i dostajesz cosine 0.93. Co może być nie tak?',
            en: 'You compare an answer to a reference by embedding similarity and get cosine 0.93. What might still be wrong?'
          },
          options: [
            { pl: 'Cosine nigdy nie przekracza 0.9, więc wynik jest błędny', en: 'Cosine never exceeds 0.9, so the number is wrong' },
            { pl: 'Podobieństwo embeddingowe wymaga temperature 0', en: 'Embedding similarity requires temperature 0' },
            { pl: 'Embeddingi działają tylko dla języka angielskiego', en: 'Embeddings only work for English' },
            { pl: 'Odpowiedź może być zaprzeczeniem referencji i wciąż mieć bardzo wysokie podobieństwo', en: 'The answer may be the negation of the reference and still score very high' }
          ],
          correct: 3,
          explain: {
            pl: '"Zamówienie zostało wysłane" i "Zamówienie nie zostało wysłane" leżą bardzo blisko w przestrzeni embeddingów. Do faktów potrzebujesz asercji lub sędziego, nie samego cosine.',
            en: '"The order shipped" and "The order did not ship" sit very close in embedding space. For factual claims you need an assertion or a judge, not cosine alone.'
          }
        },
        {
          q: {
            pl: 'Od miesiąca dostrajasz prompt do tych samych 200 przypadków, wynik wzrósł z 74 na 93 procent, ale użytkownicy nie zauważyli poprawy. Najbardziej prawdopodobna przyczyna?',
            en: 'For a month you have tuned the prompt against the same 200 cases, the score went from 74 to 93 percent, but users noticed no improvement. Most likely cause?'
          },
          options: [
            { pl: 'Model dostawcy został po cichu podmieniony', en: 'The provider silently swapped the model' },
            { pl: 'Overfitting do zestawu ewaluacyjnego, brak zbioru holdout', en: 'Overfitting to the eval set, no holdout split' },
            { pl: 'Za niska temperature w produkcji', en: 'Temperature too low in production' },
            { pl: 'Za małe okno kontekstowe', en: 'Context window too small' }
          ],
          correct: 1,
          explain: {
            pl: 'Ciągłe iterowanie na tych samych przykładach to klasyczne przeuczenie na zbiorze testowym. Odłóż 20-30 procent przypadków jako holdout i oglądaj je tylko przed wydaniem.',
            en: 'Iterating forever on the same examples is textbook test-set overfitting. Hold back 20-30 percent of cases and look at them only before a release.'
          }
        }
      ]
    },

    {
      id: 'llm-as-judge',
      title: { pl: 'Model jako sędzia', en: 'LLM as judge' },
      minutes: 12,
      terms: [
        { term: { pl: 'LLM as judge', en: 'LLM as judge' }, def: { pl: 'Użycie modelu do oceny odpowiedzi innego modelu według rubryki. Skaluje ocenę tam, gdzie asercja nie wystarcza, a człowiek jest za drogi.', en: 'Using a model to grade another model output against a rubric. It scales judgement where an assertion is not enough and a human is too expensive.' } },
        { term: { pl: 'Rubryka', en: 'Rubric' }, def: { pl: 'Jawne kryteria oceny z definicjami poziomów i przykładami. Bez rubryki sędzia ocenia styl, a nie poprawność.', en: 'Explicit grading criteria with level definitions and examples. Without a rubric the judge grades style, not correctness.' } },
        { term: { pl: 'Position bias', en: 'Position bias' }, def: { pl: 'Sędzia systematycznie faworyzuje odpowiedź podaną jako pierwsza. Kontrola: ocena w obu kolejnościach i uśrednienie.', en: 'The judge systematically favours whichever answer comes first. Control: score both orderings and average.' } },
        { term: { pl: 'Length bias', en: 'Length bias' }, def: { pl: 'Dłuższa odpowiedź dostaje wyższą ocenę niezależnie od treści. Kontrola: limit długości w rubryce i jawny zakaz nagradzania rozwlekłości.', en: 'Longer answers score higher regardless of content. Control: a length cap in the rubric and an explicit ban on rewarding verbosity.' } },
        { term: { pl: 'Kalibracja sędziego', en: 'Judge calibration' }, def: { pl: 'Porównanie ocen sędziego z ocenami ludzi na wspólnej próbce i pomiar zgodności. Nieskalibrowany sędzia to metryka, która kłamie w spójny sposób.', en: 'Comparing judge scores with human scores on a shared sample and measuring agreement. An uncalibrated judge is a metric that lies consistently.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev3-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="16" y="30" width="150" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="91" y="56" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Question</text><text x="91" y="76" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">plus rubric</text><rect x="16" y="118" width="150" height="56" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="91" y="152" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Answer A</text><rect x="16" y="196" width="150" height="56" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="91" y="230" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Answer B</text><line x1="168" y1="60" x2="234" y2="130" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><line x1="168" y1="146" x2="234" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><line x1="168" y1="224" x2="234" y2="176" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="240" y="110" width="160" height="90" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="320" y="145" font-family="inherit" font-size="14" fill="var(--text)" text-anchor="middle">Judge model</text><text x="320" y="168" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">reason, then</text><text x="320" y="186" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">verdict</text><line x1="402" y1="155" x2="452" y2="155" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="458" y="122" width="166" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="541" y="150" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Winner plus</text><text x="541" y="170" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">short reason</text><line x1="320" y1="202" x2="320" y2="252" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ev3-arrow)"/><rect x="150" y="258" width="340" height="60" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="320" y="284" font-family="inherit" font-size="13" fill="var(--warn)" text-anchor="middle">Biases: position, length, self-preference</text><text x="320" y="306" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">swap A and B, cap length, use a different family</text><line x1="320" y1="320" x2="320" y2="348" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="150" y="354" width="340" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="320" y="380" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Calibrate against 100 human labels</text><text x="320" y="402" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">target agreement above 80 percent</text></svg>',
        caption: {
          pl: 'Sędzia modelowy: rubryka, uzasadnienie przed werdyktem, świadome neutralizowanie uprzedzeń i kalibracja względem ocen ludzi.',
          en: 'An LLM judge: a rubric, reasoning before the verdict, deliberate bias control, and calibration against human labels.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Ta sama para odpowiedzi przechodzi przez sędziego dwa razy - zamiana miejscami obnaża position bias, a kalibracja mówi, czy w ogóle warto ufać tym liczbom.',
          en: 'One pair of answers goes through the judge twice - swapping the order exposes position bias, and calibration says whether the numbers are worth trusting at all.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 1 of 5 - rubric and two candidate answers</text>' +
              '<rect x="30" y="50" width="200" height="92" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="130" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Rubric, 4 yes/no</text>' +
              '<text x="130" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">grounded, on topic,</text>' +
              '<text x="130" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">tone, no false promise</text>' +
              '<rect x="30" y="160" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="130" y="192" fill="var(--text)" font-size="14" text-anchor="middle">Answer A - 90 words</text>' +
              '<rect x="30" y="230" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="130" y="262" fill="var(--text)" font-size="14" text-anchor="middle">Answer B - 240 words</text>' +
              '<rect x="265" y="130" width="150" height="100" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="340" y="172" fill="var(--text)" font-size="15" text-anchor="middle">Judge model</text>' +
              '<text x="340" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">idle</text>' +
              '<rect x="450" y="145" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="187" fill="var(--muted)" font-size="14" text-anchor="middle">no verdict yet</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--muted)" font-size="14" text-anchor="middle">both answers are factually fine - only style differs</text>' +
              '</svg>',
            label: { pl: 'Rubryka i para odpowiedzi', en: 'Rubric and a pair' },
            note: {
              pl: 'Rubryka to cztery pytania tak/nie, nie ocena od 1 do 10. Obie odpowiedzi są poprawne merytorycznie, różnią się tylko długością i stylem.',
              en: 'The rubric is four yes/no questions, not a 1-to-10 score. Both answers are factually correct; they differ only in length and style.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 2 of 5 - first pass, order A then B</text>' +
              '<rect x="30" y="50" width="200" height="92" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="130" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Rubric, 4 yes/no</text>' +
              '<text x="130" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">criteria first,</text>' +
              '<text x="130" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">verdict last</text>' +
              '<rect x="30" y="160" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="130" y="192" fill="var(--text)" font-size="14" text-anchor="middle">slot 1: Answer A</text>' +
              '<rect x="30" y="230" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="130" y="262" fill="var(--text)" font-size="14" text-anchor="middle">slot 2: Answer B</text>' +
              '<line x1="234" y1="187" x2="251" y2="180" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="265,177 251,174 253,188" fill="var(--muted)"/>' +
              '<line x1="234" y1="257" x2="251" y2="215" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="265,205 250,209 259,220" fill="var(--muted)"/>' +
              '<rect x="265" y="130" width="150" height="100" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="340" y="168" fill="var(--text)" font-size="15" text-anchor="middle">Judge model</text>' +
              '<text x="340" y="192" fill="var(--accent)" font-size="13" text-anchor="middle">reason, then</text>' +
              '<text x="340" y="212" fill="var(--accent)" font-size="13" text-anchor="middle">verdict</text>' +
              '<line x1="419" y1="180" x2="436" y2="180" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="450,180 436,173 436,187" fill="var(--muted)"/>' +
              '<rect x="450" y="145" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="530" y="175" fill="var(--ok)" font-size="15" text-anchor="middle">winner: A</text>' +
              '<text x="530" y="197" fill="var(--muted)" font-size="13" text-anchor="middle">clearer, cites source</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--muted)" font-size="14" text-anchor="middle">one run, one verdict - looks convincing, proves nothing</text>' +
              '</svg>',
            label: { pl: 'Pierwszy przebieg', en: 'First pass' },
            note: {
              pl: 'Sędzia najpierw uzasadnia, potem ogłasza werdykt - odwrotna kolejność wyraźnie obniża jakość. Wygrywa A, z sensownym uzasadnieniem.',
              en: 'The judge reasons first and only then states the verdict; the reverse order measurably degrades quality. A wins, with a sensible justification.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 3 of 5 - same pair, positions swapped</text>' +
              '<rect x="30" y="50" width="200" height="92" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="130" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Rubric, 4 yes/no</text>' +
              '<text x="130" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">identical prompt,</text>' +
              '<text x="130" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">only slots swapped</text>' +
              '<rect x="30" y="160" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="130" y="192" fill="var(--text)" font-size="14" text-anchor="middle">slot 1: Answer B</text>' +
              '<rect x="30" y="230" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="130" y="262" fill="var(--text)" font-size="14" text-anchor="middle">slot 2: Answer A</text>' +
              '<line x1="234" y1="187" x2="251" y2="180" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="265,177 251,174 253,188" fill="var(--muted)"/>' +
              '<line x1="234" y1="257" x2="251" y2="215" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="265,205 250,209 259,220" fill="var(--muted)"/>' +
              '<rect x="265" y="130" width="150" height="100" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="340" y="168" fill="var(--text)" font-size="15" text-anchor="middle">Judge model</text>' +
              '<text x="340" y="192" fill="var(--accent)" font-size="13" text-anchor="middle">same rubric,</text>' +
              '<text x="340" y="212" fill="var(--accent)" font-size="13" text-anchor="middle">same temperature</text>' +
              '<line x1="419" y1="180" x2="436" y2="180" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="450,180 436,173 436,187" fill="var(--muted)"/>' +
              '<rect x="450" y="145" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="530" y="175" fill="var(--err)" font-size="15" text-anchor="middle">winner: B</text>' +
              '<text x="530" y="197" fill="var(--muted)" font-size="13" text-anchor="middle">more thorough</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--err)" font-size="14" text-anchor="middle">verdict flipped - the judge scored the slot, not the answer</text>' +
              '</svg>',
            label: { pl: 'Zamiana miejscami', en: 'Positions swapped' },
            note: {
              pl: 'Ten sam prompt, te same odpowiedzi, tylko inna kolejność - i werdykt się odwraca. To position bias, wzmocniony przez dłuższą odpowiedź B.',
              en: 'Same prompt, same answers, only a different order - and the verdict flips. That is position bias, amplified by B simply being longer.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 4 of 5 - measure the bias over 500 pairs</text>' +
              '<rect x="30" y="50" width="200" height="92" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="130" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Consistency rate</text>' +
              '<text x="130" y="104" fill="var(--warn)" font-size="15" text-anchor="middle">0.62</text>' +
              '<text x="130" y="126" fill="var(--muted)" font-size="13" text-anchor="middle">healthy is above 0.8</text>' +
              '<rect x="30" y="160" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="130" y="184" fill="var(--muted)" font-size="13" text-anchor="middle">length vs win rate</text>' +
              '<text x="130" y="204" fill="var(--warn)" font-size="13" text-anchor="middle">correlation 0.71</text>' +
              '<rect x="30" y="230" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="130" y="254" fill="var(--muted)" font-size="13" text-anchor="middle">judge family = model</text>' +
              '<text x="130" y="274" fill="var(--warn)" font-size="13" text-anchor="middle">self-preference risk</text>' +
              '<rect x="265" y="130" width="150" height="100" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="340" y="168" fill="var(--text)" font-size="15" text-anchor="middle">Fixes</text>' +
              '<text x="340" y="192" fill="var(--muted)" font-size="13" text-anchor="middle">score both orders,</text>' +
              '<text x="340" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">count only matches</text>' +
              '<line x1="419" y1="180" x2="436" y2="180" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="450,180 436,173 436,187" fill="var(--muted)"/>' +
              '<rect x="450" y="145" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="530" y="175" fill="var(--text)" font-size="14" text-anchor="middle">rubric v2: length</text>' +
              '<text x="530" y="197" fill="var(--text)" font-size="14" text-anchor="middle">is not a virtue</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--accent)" font-size="14" text-anchor="middle">a judge is a production model - it needs its own metrics</text>' +
              '</svg>',
            label: { pl: 'Pomiar uprzedzeń', en: 'Bias measured' },
            note: {
              pl: 'Consistency rate 0.62 oznacza, że prawie cztery pary na dziesięć zmieniają werdykt po zamianie. Każdą parę oceniaj w obu kolejnościach i licz tylko zgodne.',
              en: 'A consistency rate of 0.62 means nearly four pairs in ten flip after the swap. Score every pair in both orders and count only the agreeing ones.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 5 of 5 - calibrate against human labels</text>' +
              '<rect x="30" y="50" width="200" height="92" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="130" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Rubric v2</text>' +
              '<text x="130" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">both orders scored,</text>' +
              '<text x="130" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">judge model pinned</text>' +
              '<rect x="30" y="160" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="130" y="192" fill="var(--text)" font-size="14" text-anchor="middle">150 human labels</text>' +
              '<rect x="30" y="230" width="200" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="130" y="262" fill="var(--text)" font-size="14" text-anchor="middle">same 150 judged</text>' +
              '<line x1="234" y1="187" x2="251" y2="180" stroke="var(--accent)" stroke-width="2"/>' +
              '<polygon points="265,177 251,174 253,188" fill="var(--accent)"/>' +
              '<line x1="234" y1="257" x2="251" y2="215" stroke="var(--accent)" stroke-width="2"/>' +
              '<polygon points="265,205 250,209 259,220" fill="var(--accent)"/>' +
              '<rect x="265" y="130" width="150" height="100" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="340" y="168" fill="var(--text)" font-size="15" text-anchor="middle">Agreement</text>' +
              '<text x="340" y="196" fill="var(--ok)" font-size="15" text-anchor="middle">87 percent</text>' +
              '<text x="340" y="216" fill="var(--muted)" font-size="13" text-anchor="middle">kappa 0.71</text>' +
              '<line x1="419" y1="180" x2="436" y2="180" stroke="var(--ok)" stroke-width="2"/>' +
              '<polygon points="450,180 436,173 436,187" fill="var(--ok)"/>' +
              '<rect x="450" y="145" width="160" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="530" y="175" fill="var(--ok)" font-size="14" text-anchor="middle">judge promoted</text>' +
              '<text x="530" y="197" fill="var(--muted)" font-size="13" text-anchor="middle">to CI scorer</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--warn)" font-size="14" text-anchor="middle">re-calibrate after every judge model swap</text>' +
              '</svg>',
            label: { pl: 'Kalibracja', en: 'Calibration' },
            note: {
              pl: 'Dopiero zgodność 87 procent z ludźmi i kappa 0.71 pozwalają używać sędziego jako metryki w CI. Po każdej podmianie modelu sędziego kalibrację robisz od nowa.',
              en: 'Only 87 percent agreement with humans and a kappa of 0.71 make the judge usable as a CI metric. After every judge model swap you calibrate again from scratch.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie konkurs na najlepsze ciasto, w którym jurorem jest ktoś, kto sam piecze ciasta. Bywa świetny, ale ma dziwne nawyki. Zawsze bardziej lubi ciasto, które próbuje jako pierwsze. Zawsze wybiera większe, nawet jeśli mniejsze smakuje lepiej. I podejrzanie często wygrywa ciasto zrobione według jego własnego przepisu.</p><p>Da się z nim pracować, tylko trzeba go pilnować. Dajesz mu kartkę z dokładną listą, na co ma patrzeć: czy jest słodkie, czy nie jest suche, czy pachnie wanilią. Podajesz mu te same dwa ciasta drugi raz, tylko zamienione miejscami, i sprawdzasz, czy nie zmienił zdania. Raz na jakiś czas dajesz mu ciasta, o których już wiesz, które jest lepsze, żeby sprawdzić, czy nadal ma smak.</p><p>Wtedy taki juror jest bardzo przydatny, bo może ocenić tysiąc ciast w godzinę. Sto prawdziwych osób potrzebowałoby na to tygodnia.</p>',
          en: '<p>Picture a cake contest judged by someone who also bakes cakes. He can be excellent, but he has odd habits. He always likes the cake he tastes first a bit more. He always picks the bigger one, even when the smaller one tastes better. And suspiciously often the winner is the cake made from his own recipe.</p><p>You can work with him, you just have to keep an eye on him. You hand him a card with an exact list of what to look for: is it sweet enough, is it dry, does it smell of vanilla. You give him the same two cakes a second time with the positions swapped and check whether he changes his mind. Every so often you slip in cakes where you already know the better one, to check his palate is still working.</p><p>Handled that way, this judge is extremely useful, because he can score a thousand cakes in an hour. A hundred real people would need a week.</p>'
        },
        school: {
          pl: '<p>Duża część zadań z LLM nie ma jednej poprawnej odpowiedzi. Podsumowanie rozmowy z klientem, uprzejma odmowa, wyjaśnienie błędu w kodzie: dobrych wersji są setki. Nie porównasz tego stringiem. Ludzie potrafią to ocenić, ale są wolni i drodzy. Rozwiązaniem pośrednim jest <strong>LLM as judge (model jako sędzia)</strong>: drugi model, który dostaje rubrykę i ocenia wynik pierwszego.</p><p>Rubryka to zwykła lista kryteriów z jasnymi progami, dokładnie jak checklista w code review. Nie "oceń jakość", tylko:</p><pre><code>1. Czy odpowiedz odnosi sie do pytania uzytkownika? tak/nie\n2. Czy kazde twierdzenie o faktach ma cytowanie z kontekstu? tak/nie\n3. Czy ton jest uprzejmy i bez zargonu? tak/nie\n4. Czy odpowiedz obiecuje cos, czego firma nie moze spelnic? tak/nie</code></pre><p>Cztery pytania tak/nie dają dużo bardziej powtarzalny wynik niż jedna ocena od 1 do 10.</p><p>Sędzia ma trzy dobrze udokumentowane skrzywienia. <strong>Position bias</strong>: przy porównaniu dwóch odpowiedzi częściej wybiera pierwszą. <strong>Length bias</strong>: dłuższa odpowiedź wydaje mu się lepsza, nawet gdy jest rozwodniona. <strong>Self-preference</strong>: model chętniej nagradza teksty pisane przez siebie albo przez modele z tej samej rodziny.</p><p>Lekarstwa są proste. Każdą parę oceniaj dwa razy, raz w kolejności A-B, raz B-A, i licz tylko te przypadki, gdzie werdykt się zgadza. Trzymaj obie odpowiedzi w podobnej długości albo dopisz do rubryki "długość nie jest zaletą". Do oceny wyników modelu X używaj sędziego z innej rodziny.</p><p>Na koniec najważniejsze: sędziego trzeba <strong>skalibrować</strong>. Oznacz ręcznie 100 przykładów, uruchom na nich sędziego i policz zgodność. Poniżej 80 procent zgodności z człowiekiem popraw rubrykę, zanim zaczniesz ufać liczbom.</p>',
          en: '<p>A large share of LLM tasks have no single correct answer. Summarising a customer conversation, a polite refusal, explaining a bug in code: there are hundreds of good versions. You cannot compare that with a string equality. Humans can judge it, but they are slow and expensive. The middle ground is <strong>LLM as judge</strong>: a second model that gets a rubric and scores the first one\'s output.</p><p>A rubric is a plain list of criteria with clear thresholds, exactly like a code review checklist. Not "rate the quality", but:</p><pre><code>1. Does the answer address the user question? yes/no\n2. Does every factual claim carry a citation from the context? yes/no\n3. Is the tone polite and jargon-free? yes/no\n4. Does the answer promise something the company cannot deliver? yes/no</code></pre><p>Four yes/no questions give a far more repeatable result than one 1-to-10 score.</p><p>Judges have three well documented biases. <strong>Position bias</strong>: when comparing two answers they pick the first one more often. <strong>Length bias</strong>: a longer answer feels better, even when it is padded. <strong>Self-preference</strong>: a model rewards text written by itself or by models from the same family.</p><p>The fixes are simple. Score every pair twice, once as A-B and once as B-A, and only count cases where the verdict agrees. Keep both answers at similar length, or add "length is not a virtue" to the rubric. To judge output from model X, use a judge from a different family.</p><p>Finally, the important part: the judge must be <strong>calibrated</strong>. Hand-label 100 examples, run the judge over them, and compute agreement. Below 80 percent agreement with humans, fix the rubric before you start trusting the numbers.</p>'
        },
        pro: {
          pl: '<p>Sędzia modelowy to nie magia, tylko kolejny model produkcyjny, który ma własne evale. Traktuj go tak samo jak resztę systemu.</p><h4>Konstrukcja promptu sędziego</h4><p>Kolejność ma znaczenie: najpierw kryteria, potem dane, potem prośba o krótkie uzasadnienie, dopiero na końcu werdykt w ustalonym formacie. Odwrotna kolejność (werdykt najpierw) wyraźnie obniża jakość, bo model traci możliwość "przemyślenia" przed decyzją. Wymuszaj strukturę przez tool calling albo structured output, nie przez parsowanie prozy.</p><pre><code>const Verdict = z.object({\n  addresses_question: z.boolean(),\n  grounded_in_context: z.boolean(),\n  policy_violation: z.boolean(),\n  reason: z.string().max(280),\n  winner: z.enum(["A", "B", "tie"])\n});</code></pre><h4>Kontrola uprzedzeń</h4><ul><li><strong>Position bias.</strong> Każdą parę puszczaj w obu kolejnościach. Consistency rate (odsetek par, gdzie werdykt się nie zmienił po zamianie) to sama w sobie metryka zdrowia sędziego; poniżej 0.8 rubryka jest za miękka.</li><li><strong>Length bias.</strong> Wyloguj korelację między długością odpowiedzi a wygraną. Jeśli win rate rośnie liniowo z liczbą tokenów, masz problem, nie sygnał.</li><li><strong>Self-preference.</strong> Nie oceniaj Claude Sonnet sędzią Claude Sonnet w ostatecznych porównaniach modeli. Do porównań wewnętrznych (prompt A vs prompt B na tym samym modelu) to mniej istotne.</li></ul><h4>Kalibracja i koszt</h4><p>Zbierz 100-200 ręcznie oznaczonych przykładów, licz Cohen kappa albo zwykłą zgodność. Kappa 0.6-0.8 to poziom, przy którym sędzia jest użyteczny; poniżej 0.4 mierzysz własny prompt sędziego, nie system. Kalibrację powtarzaj po każdej podmianie modelu sędziego, bo <em>upgrade modelu potrafi zmienić wyniki historycznych evali</em>. Dlatego pinuj konkretną wersję modelu sędziego (na przykład snapshot z datą, a nie alias "latest") w konfiguracji evali.</p><p>Koszt: przy około 1200 tokenach wejścia i 200 wyjścia na ocenę i cenach klasy 1 dolar za milion wejścia oraz 5 za milion wyjścia, jedna ocena kosztuje ułamek centa, a 500 ocen w obu kolejnościach to około 2-3 dolarów. Do sędziego często wystarcza tańszy, szybki model, o ile przechodzi kalibrację.</p><p>Gdzie sędziowie zawodzą: liczenie i arytmetyka, zgodność z długą polityką (lepiej rozbij na osobne, wąskie checki), zadania wymagające wiedzy dziedzinowej, której sędzia nie ma. Każda taka klasa to kandydat na deterministyczną asercję albo kolejkę do człowieka. Narzędzia takie jak Langfuse i Braintrust mają gotowe wsparcie na sędziów jako "scorers" wraz z historią wyników i kolejką do przeglądu ludzkiego, więc nie pisz tego od zera.</p>',
          en: '<p>An LLM judge is not magic, it is just another production model that needs its own evals. Treat it like the rest of the system.</p><h4>Judge prompt construction</h4><p>Order matters: criteria first, then the data, then a request for a short justification, and only at the end the verdict in a fixed format. The reverse order (verdict first) measurably degrades quality, because the model loses the chance to reason before deciding. Force the structure with tool calling or structured output, not by parsing prose.</p><pre><code>const Verdict = z.object({\n  addresses_question: z.boolean(),\n  grounded_in_context: z.boolean(),\n  policy_violation: z.boolean(),\n  reason: z.string().max(280),\n  winner: z.enum(["A", "B", "tie"])\n});</code></pre><h4>Bias control</h4><ul><li><strong>Position bias.</strong> Run every pair in both orders. The consistency rate (share of pairs whose verdict survives the swap) is itself a judge-health metric; below 0.8 your rubric is too soft.</li><li><strong>Length bias.</strong> Log the correlation between answer length and winning. If win rate climbs linearly with token count, you have a problem, not a signal.</li><li><strong>Self-preference.</strong> Do not judge Claude Sonnet output with a Claude Sonnet judge in final model comparisons. For internal comparisons (prompt A vs prompt B on the same model) it matters much less.</li></ul><h4>Calibration and cost</h4><p>Collect 100-200 hand-labelled examples and compute Cohen kappa or plain agreement. Kappa of 0.6-0.8 is the range where a judge is useful; below 0.4 you are measuring your judge prompt, not your system. Re-calibrate after every judge model swap, because <em>a model upgrade can change the results of historical evals</em>. That is why you pin a specific judge model version (a dated snapshot, not a "latest" alias) in the eval config.</p><p>Cost: at roughly 1200 input and 200 output tokens per judgement and prices around 1 dollar per million input and 5 per million output, one judgement costs a fraction of a cent, and 500 judgements in both orders lands near 2-3 dollars. A cheaper, fast model is often enough as a judge, provided it passes calibration.</p><p>Where judges fail: counting and arithmetic, compliance with a long policy document (split that into separate narrow checks), and tasks needing domain knowledge the judge does not have. Every such class is a candidate for a deterministic assertion or a human queue. Tools like Langfuse and Braintrust ship judges as first-class "scorers" with score history and a human review queue, so do not build it from scratch.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kiedy sędzia modelowy ma najwięcej sensu?',
            en: 'When does an LLM judge make the most sense?'
          },
          options: [
            { pl: 'Gdy poprawnych odpowiedzi jest wiele i nie da się ich porównać dokładnym dopasowaniem', en: 'When many answers are correct and exact matching is impossible' },
            { pl: 'Gdy sprawdzasz, czy odpowiedź jest poprawnym JSON-em', en: 'When checking whether the answer is valid JSON' },
            { pl: 'Gdy chcesz obniżyć koszt wywołań produkcyjnych', en: 'When you want to reduce production call costs' },
            { pl: 'Gdy potrzebujesz policzyć, ile razy model użył narzędzia', en: 'When you need to count how many times the model used a tool' }
          ],
          correct: 0,
          explain: {
            pl: 'Do JSON-a i liczenia tool calls masz deterministyczne asercje, które są darmowe i pewne. Sędzia jest dla zadań otwartych, jak podsumowania czy ton wypowiedzi.',
            en: 'JSON validity and tool-call counting have deterministic assertions that are free and certain. A judge is for open-ended tasks like summaries or tone.'
          }
        },
        {
          q: {
            pl: 'Co to jest position bias u sędziego i jak się z nim radzisz?',
            en: 'What is position bias in a judge and how do you handle it?'
          },
          options: [
            { pl: 'Preferowanie odpowiedzi z góry kontekstu; skracasz kontekst', en: 'Preferring answers from the top of the context; you shorten the context' },
            { pl: 'Preferowanie odpowiedzi podanej jako pierwsza; oceniasz każdą parę w obu kolejnościach', en: 'Preferring the answer presented first; you score every pair in both orders' },
            { pl: 'Preferowanie odpowiedzi w języku promptu; tłumaczysz wszystko na angielski', en: 'Preferring answers in the prompt language; you translate everything to English' },
            { pl: 'Preferowanie pierwszego narzędzia z listy; sortujesz narzędzia alfabetycznie', en: 'Preferring the first tool in the list; you sort tools alphabetically' }
          ],
          correct: 1,
          explain: {
            pl: 'Zamiana miejscami A i B i liczenie tylko zgodnych werdyktów neutralizuje efekt, a odsetek zgodnych par jest przy okazji dobrą metryką jakości sędziego.',
            en: 'Swapping A and B and counting only agreeing verdicts neutralises the effect, and the share of consistent pairs doubles as a judge quality metric.'
          }
        },
        {
          q: {
            pl: 'Jaka jest sensowna kolejność elementów w promptcie sędziego?',
            en: 'What is a sensible order of elements in a judge prompt?'
          },
          options: [
            { pl: 'Werdykt, potem kryteria, potem dane', en: 'Verdict, then criteria, then the data' },
            { pl: 'Kryteria, dane, krótkie uzasadnienie, na końcu werdykt w stałym formacie', en: 'Criteria, data, short justification, verdict last in a fixed format' },
            { pl: 'Dane, werdykt, uzasadnienie, kryteria', en: 'Data, verdict, justification, criteria' },
            { pl: 'Kolejność nie ma znaczenia dla wyniku', en: 'The order does not affect the result' }
          ],
          correct: 1,
          explain: {
            pl: 'Wymuszenie uzasadnienia przed werdyktem daje modelowi miejsce na rozumowanie. Werdykt na początku zamraża decyzję, którą reszta tekstu tylko racjonalizuje.',
            en: 'Forcing a justification before the verdict gives the model room to reason. A verdict up front freezes a decision the rest of the text merely rationalises.'
          }
        },
        {
          q: {
            pl: 'Podniosłeś wersję modelu sędziego i wyniki historycznych evali się zmieniły. Najlepsza reakcja?',
            en: 'You upgraded the judge model version and historical eval scores changed. Best response?'
          },
          options: [
            { pl: 'Nadpisać stare wyniki nowymi, bo nowy sędzia jest lepszy', en: 'Overwrite the old scores, since the new judge is better' },
            { pl: 'Zignorować, bo evale i tak są przybliżone', en: 'Ignore it, evals are approximate anyway' },
            { pl: 'Pinować konkretną wersję sędziego, przeliczyć baseline i powtórzyć kalibrację na oznaczonych przykładach', en: 'Pin a specific judge version, recompute the baseline and redo calibration on labelled examples' },
            { pl: 'Wrócić do oceny ręcznej i zrezygnować z sędziego', en: 'Go back to manual review and drop the judge' }
          ],
          correct: 2,
          explain: {
            pl: 'Sędzia to część pomiaru, więc jego wersja musi być przypięta jak każda inna zależność. Po zmianie porównuj tylko wyniki policzone tym samym sędzią.',
            en: 'The judge is part of your instrument, so its version must be pinned like any dependency. After a change, only compare scores produced by the same judge.'
          }
        }
      ]
    },

    {
      id: 'tooling',
      title: { pl: 'Narzędzia i tracing', en: 'Tooling and tracing' },
      minutes: 10,
      terms: [
        { term: { pl: 'Trace', en: 'Trace' }, def: { pl: 'Zapis całego przebiegu jednego zadania: prompt, wywołania modelu, narzędzia, retrieval, koszt i czas. Podstawowa jednostka debugowania produkcji.', en: 'The record of one full run: prompt, model calls, tools, retrieval, cost and latency. The basic unit of debugging in production.' } },
        { term: { pl: 'Span', en: 'Span' }, def: { pl: 'Pojedynczy krok wewnątrz trace (jedno wywołanie LLM, jedno narzędzie, jedno wyszukiwanie) z własnym czasem, wejściem i wyjściem.', en: 'A single step inside a trace (one LLM call, one tool, one search) with its own timing, input and output.' } },
        { term: { pl: 'Langfuse', en: 'Langfuse' }, def: { pl: 'Otwartoźródłowa platforma obserwowalności LLM: tracing, datasety, oceny i koszty. Alternatywa komercyjna to Braintrust.', en: 'Open-source LLM observability platform: tracing, datasets, scores and cost. The commercial alternative is Braintrust.' } },
        { term: { pl: 'OpenTelemetry GenAI', en: 'OpenTelemetry GenAI' }, def: { pl: 'Standardowe atrybuty spanów dla modeli (<code>gen_ai.request.model</code>, <code>gen_ai.usage.input_tokens</code>) pozwalające wpiąć tracing LLM w istniejący backend obserwowalności.', en: 'Standard span attributes for models (<code>gen_ai.request.model</code>, <code>gen_ai.usage.input_tokens</code>) that let LLM tracing plug into an existing observability backend.' } },
        { term: { pl: 'Eksport asynchroniczny', en: 'Async trace export' }, def: { pl: 'Wysyłka traców w tle, z buforowaniem i limitem, nigdy na ścieżce krytycznej odpowiedzi. Padnięty kolektor nie może wywrócić produktu.', en: 'Shipping traces in the background, buffered and capped, never on the critical response path. A dead collector must not take the product down.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><text x="16" y="28" font-family="inherit" font-size="14" fill="var(--muted)">One trace: POST /chat, 2.42 s total</text><rect x="16" y="46" width="600" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="30" y="68" font-family="inherit" font-size="13" fill="var(--text)">trace: chat.request</text><text x="520" y="68" font-family="inherit" font-size="13" fill="var(--muted)">2420 ms</text><rect x="46" y="94" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="60" y="116" font-family="inherit" font-size="13" fill="var(--text)">retrieval</text><text x="176" y="116" font-family="inherit" font-size="13" fill="var(--muted)">180 ms, 8 chunks</text><rect x="46" y="142" width="320" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="60" y="164" font-family="inherit" font-size="13" fill="var(--text)">llm call 1</text><text x="376" y="164" font-family="inherit" font-size="13" fill="var(--muted)">1120 ms, 4.1k in</text><rect x="76" y="190" width="150" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="90" y="212" font-family="inherit" font-size="13" fill="var(--text)">tool get_order</text><text x="236" y="212" font-family="inherit" font-size="13" fill="var(--muted)">240 ms, ok</text><rect x="46" y="238" width="250" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="60" y="260" font-family="inherit" font-size="13" fill="var(--text)">llm call 2</text><text x="306" y="260" font-family="inherit" font-size="13" fill="var(--muted)">820 ms, 0.4k out</text><rect x="76" y="286" width="130" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="90" y="308" font-family="inherit" font-size="13" fill="var(--err)">judge score</text><text x="216" y="308" font-family="inherit" font-size="13" fill="var(--muted)">0.42, flagged</text><line x1="16" y1="340" x2="616" y2="340" stroke="var(--border)" stroke-width="2"/><text x="16" y="366" font-family="inherit" font-size="13" fill="var(--muted)">Every span carries: input, output, tokens, cost, latency,</text><text x="16" y="386" font-family="inherit" font-size="13" fill="var(--muted)">user id, session id, prompt version.</text></svg>',
        caption: {
          pl: 'Ślad (trace) jednego zapytania rozbity na spany: retrieval, wywołania modelu, narzędzia i wynik sędziego. To DevTools Network dla aplikacji LLM.',
          en: 'One request trace broken into spans: retrieval, model calls, tools and judge score. This is the Network tab for LLM apps.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Kiedy strona internetowa działa wolno, otwierasz w przeglądarce zakładkę, która pokazuje wszystkie małe prośby, jakie strona wysłała, i ile każda trwała. Od razu widać, że to jedno zdjęcie ładowało sześć sekund. Bez tej zakładki można tylko zgadywać i patrzeć w sufit.</p><p>Aplikacja z modelem AI ma dokładnie ten sam problem, tylko w środku dzieje się inaczej. Użytkownik pyta o coś, program szuka w dokumentach, pyta model, model prosi o sprawdzenie zamówienia, program sprawdza, model pisze odpowiedź. Pięć kroków, każdy może być winowajcą.</p><p>Tracing to właśnie ta zakładka dla AI. Każdy krok zapisuje się sam: co dostał, co zwrócił, ile to trwało i ile kosztowało. Kiedy ktoś napisze "bot odpowiedział bez sensu", nie zgadujesz. Otwierasz jego rozmowę, przewijasz kroki i widzisz dokładnie ten moment, w którym coś poszło nie tak.</p>',
          en: '<p>When a website feels slow you open the browser tab that lists every little request the page made and how long each took. You immediately see that one image took six seconds. Without that tab you can only guess and stare at the ceiling.</p><p>An app built on an AI model has exactly the same problem, only the insides look different. A user asks something, the program searches documents, asks the model, the model asks for an order lookup, the program looks it up, the model writes the answer. Five steps, any of them can be the culprit.</p><p>Tracing is that browser tab for AI. Every step records itself: what it received, what it returned, how long it took and what it cost. When someone writes "the bot answered nonsense", you do not guess. You open their conversation, scroll through the steps and see the exact moment things went sideways.</p>'
        },
        school: {
          pl: '<p>Aplikacja LLM to rozproszony system w miniaturze. Jedno zapytanie użytkownika rozpada się na retrieval, kilka wywołań modelu, wywołania narzędzi i czasem ocenę sędziego. Zwykły <code>console.log</code> tego nie ogarnie, bo interesuje Cię nie pojedyncza linia, tylko cała kaskada.</p><p>Słownik jest pożyczony z OpenTelemetry i jest mały:</p><ul><li><strong>Trace (ślad)</strong> to cały cykl obsługi jednego zapytania, czyli odpowiednik jednego wpisu w zakładce Network.</li><li><strong>Span</strong> to pojedynczy krok w środku śladu: wywołanie modelu, wyszukanie w bazie wektorowej, wywołanie narzędzia. Spany zagnieżdżają się w drzewo.</li><li><strong>Session</strong> łączy wiele śladów tego samego użytkownika w jedną rozmowę.</li><li><strong>Score</strong> to metryka doklejona do śladu: kciuk użytkownika, wynik sędziego, flaga od moderacji.</li></ul><p>Instrumentacja w kodzie jest zaskakująco lekka:</p><pre><code>const trace = langfuse.trace({ name: "chat", userId, sessionId });\n\nconst span = trace.span({ name: "retrieval", input: { query } });\nconst chunks = await search(query);\nspan.end({ output: { count: chunks.length } });\n\nconst gen = trace.generation({\n  name: "answer", model: "claude-sonnet",\n  input: messages, metadata: { promptVersion: "v7" }\n});\nconst res = await callModel(messages);\ngen.end({ output: res.text, usage: res.usage });</code></pre><p>Najważniejsze pole to <code>promptVersion</code> albo inny tag wersji. Bez niego nie odpowiesz na najczęstsze pytanie w zespole: czy skoki błędów zaczęły się po naszym deployu, czy same z siebie.</p><p>Drugie zastosowanie tracingu jest jeszcze ciekawsze: prawdziwe ślady z produkcji są najlepszym źródłem nowych przypadków ewaluacyjnych. Widzisz złą odpowiedź, klikasz "dodaj do datasetu" i masz kolejny test regresyjny za darmo.</p>',
          en: '<p>An LLM app is a distributed system in miniature. One user request fans out into retrieval, several model calls, tool calls and sometimes a judge score. A plain <code>console.log</code> cannot cope, because what you care about is not a single line but the whole cascade.</p><p>The vocabulary is borrowed from OpenTelemetry and it is small:</p><ul><li>A <strong>trace</strong> is the full handling of one request, the equivalent of one row in the Network tab.</li><li>A <strong>span</strong> is a single step inside the trace: a model call, a vector search, a tool invocation. Spans nest into a tree.</li><li>A <strong>session</strong> groups many traces from the same user into one conversation.</li><li>A <strong>score</strong> is a metric attached to a trace: a user thumb, a judge result, a moderation flag.</li></ul><p>Instrumenting the code is surprisingly light:</p><pre><code>const trace = langfuse.trace({ name: "chat", userId, sessionId });\n\nconst span = trace.span({ name: "retrieval", input: { query } });\nconst chunks = await search(query);\nspan.end({ output: { count: chunks.length } });\n\nconst gen = trace.generation({\n  name: "answer", model: "claude-sonnet",\n  input: messages, metadata: { promptVersion: "v7" }\n});\nconst res = await callModel(messages);\ngen.end({ output: res.text, usage: res.usage });</code></pre><p>The most valuable field is <code>promptVersion</code> or any version tag. Without it you cannot answer the most common question in the team: did the error spike start after our deploy, or on its own.</p><p>The second use of tracing is even better: real production traces are the best source of new eval cases. You spot a bad answer, click "add to dataset", and you have another regression test for free.</p>'
        },
        pro: {
          pl: '<p>Obserwowalność dla LLM to trzy warstwy: tracing (co się stało w jednym zapytaniu), agregaty (jak wyglądają setki tysięcy zapytań) i datasety (skąd biorą się przypadki testowe). Narzędzia różnią się akcentem.</p><ul><li><strong>Promptfoo</strong> - najprostszy start: konfiguracja w YAML (prompty x przypadki testowe x asercje), odpalana lokalnie i w CI bez zakładania konta na żadnej platformie. Dobry pierwszy krok, zanim urośniesz do tracingu i datasetów poniżej.</li><li><strong>Langfuse</strong> - open source, możliwy self-host, mocny model danych trace/span/generation/score, wersjonowanie promptów, kolejka do adnotacji ludzkiej, SDK dla TS i Pythona, natywne wsparcie OpenTelemetry. Dobry domyślny wybór, gdy chcesz trzymać dane u siebie (RODO, dane klientów).</li><li><strong>Braintrust</strong> - mocno nastawiony na eksperymenty i porównania wersji, wygodne diffy między przebiegami, scorery jako kod. Świetny, gdy centrum grawitacji jest w iterowaniu nad promptami.</li><li><strong>OpenTelemetry plus istniejący backend</strong> (Grafana Tempo, Honeycomb, Datadog) - jeśli firma już ma tracing, semantic conventions dla GenAI pozwalają dołożyć spany LLM do tego samego widoku co reszta usług. Atrybuty typu <code>gen_ai.request.model</code>, <code>gen_ai.usage.input_tokens</code> są częścią konwencji.</li></ul><h4>Co koniecznie wchodzi w atrybuty spanu</h4><p>Model i jego dokładna wersja, wersja promptu, temperature, liczba tokenów wejścia i wyjścia (osobno, bo ceny się różnią o rząd wielkości), tokeny odczytane z cache, koszt w dolarach, latencja całkowita i TTFT, identyfikatory user i session, feature flag albo wariant eksperymentu, oraz status błędu z kodem. Bez tokenów cache nie policzysz oszczędności z prompt cachingu, a to zwykle 50-90 procent kosztu wejścia przy długich systemowych promptach.</p><pre><code>// asynchroniczny eksport, nigdy nie blokuj odpowiedzi użytkownika\nawait Promise.race([callModel(msgs), timeout(30000)]);\nqueueMicrotask(() =&gt; tracer.flush());  // fire and forget</code></pre><h4>Pułapki produkcyjne</h4><ul><li><strong>Wysyłka śladów nie może być na ścieżce krytycznej.</strong> Buforuj i wysyłaj w tle; padnięty kolektor nie może wywalić odpowiedzi.</li><li><strong>PII w śladach.</strong> Ślad zawiera dokładnie to, co użytkownik napisał. Redakcja przed wysłaniem, krótka retencja (30-90 dni), kontrola dostępu. To najczęstsze zaniedbanie w audytach.</li><li><strong>Koszt samego tracingu.</strong> Przy dużym ruchu sampluj: 100 procent błędów i śladów z niską oceną, 1-10 procent reszty.</li><li><strong>Kardynalność.</strong> Nie wrzucaj całego promptu jako etykiety metryki. Tekst do śladu, liczby do metryk.</li></ul><p>Praktyczna pętla, która zamyka całość: ślady z niskim wynikiem sędziego albo kciukiem w dół trafiają do kolejki przeglądu, człowiek potwierdza, przypadek ląduje w datasecie ewaluacyjnym, a ten dataset jest odpalany w CI przy następnym PR-ze. Tak z obserwowalności robi się realna poprawa jakości, a nie tylko ładne wykresy.</p>',
          en: '<p>LLM observability has three layers: tracing (what happened in one request), aggregates (what hundreds of thousands of requests look like) and datasets (where test cases come from). The tools differ in emphasis.</p><ul><li><strong>Promptfoo</strong> - the simplest way to start: a YAML config (prompts x test cases x assertions) you run locally and in CI, no account on any platform required. A good first step before you grow into the tracing and datasets below.</li><li><strong>Langfuse</strong> - open source, self-hostable, a strong trace/span/generation/score data model, prompt versioning, a human annotation queue, SDKs for TS and Python, native OpenTelemetry support. A good default when data must stay in your infrastructure (GDPR, customer data).</li><li><strong>Braintrust</strong> - heavily oriented toward experiments and version comparisons, convenient diffs between runs, scorers as code. Excellent when your centre of gravity is prompt iteration.</li><li><strong>OpenTelemetry plus an existing backend</strong> (Grafana Tempo, Honeycomb, Datadog) - if the company already has tracing, the GenAI semantic conventions let you drop LLM spans into the same view as the rest of the services. Attributes like <code>gen_ai.request.model</code> and <code>gen_ai.usage.input_tokens</code> are part of the convention.</li></ul><h4>Attributes that must be on the span</h4><p>Model and its exact version, prompt version, temperature, input and output token counts (separately, prices differ by an order of magnitude), tokens read from cache, cost in dollars, total latency and TTFT, user and session ids, feature flag or experiment arm, and the error status with code. Without cache token counts you cannot compute prompt caching savings, and those are typically 50-90 percent of input cost with long system prompts.</p><pre><code>// export asynchronously, never block the user response\nawait Promise.race([callModel(msgs), timeout(30000)]);\nqueueMicrotask(() =&gt; tracer.flush());  // fire and forget</code></pre><h4>Production pitfalls</h4><ul><li><strong>Trace shipping must not sit on the critical path.</strong> Buffer and send in the background; a dead collector must never take down a response.</li><li><strong>PII in traces.</strong> A trace contains exactly what the user typed. Redact before sending, keep retention short (30-90 days), enforce access control. This is the most common audit finding.</li><li><strong>Cost of tracing itself.</strong> At high traffic, sample: 100 percent of errors and low-scoring traces, 1-10 percent of the rest.</li><li><strong>Cardinality.</strong> Do not put the whole prompt in a metric label. Text belongs in traces, numbers in metrics.</li></ul><p>The loop that closes it all: traces with a low judge score or a thumbs down go to a review queue, a human confirms, the case lands in the eval dataset, and that dataset runs in CI on the next PR. That is how observability turns into real quality improvement instead of pretty dashboards.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co odpowiada "spanowi" w analogii do zakładki Network w DevTools?',
            en: 'What corresponds to a "span" in the DevTools Network tab analogy?'
          },
          options: [
            { pl: 'Cała sesja przeglądania strony', en: 'The entire browsing session' },
            { pl: 'Ustawienie throttlingu sieci', en: 'The network throttling setting' },
            { pl: 'Zakładka Console z błędami', en: 'The Console tab with errors' },
            { pl: 'Pojedynczy wiersz zapytania z jego czasem trwania', en: 'A single request row with its duration' }
          ],
          correct: 3,
          explain: {
            pl: 'Ślad to cały zestaw kroków dla jednego zapytania użytkownika, a span to pojedynczy krok w środku, np. wywołanie modelu albo wyszukanie w bazie wektorowej.',
            en: 'A trace is the whole set of steps for one user request; a span is a single step inside it, such as a model call or a vector search.'
          }
        },
        {
          q: {
            pl: 'Które pole w atrybutach śladu najszybciej odpowie na pytanie "czy to nasz deploy zepsuł jakość"?',
            en: 'Which trace attribute answers "did our deploy break quality" fastest?'
          },
          options: [
            { pl: 'Identyfikator sesji', en: 'Session id' },
            { pl: 'Wersja promptu albo tag wydania', en: 'Prompt version or release tag' },
            { pl: 'Liczba chunków z retrievalu', en: 'Number of retrieved chunks' },
            { pl: 'Kraj użytkownika', en: 'User country' }
          ],
          correct: 1,
          explain: {
            pl: 'Bez wersji promptu wykres błędów jest tylko krzywą. Z wersją możesz nanieść granicę deployu i od razu zobaczyć, czy skok pokrywa się ze zmianą.',
            en: 'Without a prompt version the error chart is just a curve. With it you can overlay deploy boundaries and see at once whether the spike lines up with a change.'
          }
        },
        {
          q: {
            pl: 'Dlaczego wysyłka śladów powinna być asynchroniczna i buforowana?',
            en: 'Why should trace shipping be asynchronous and buffered?'
          },
          options: [
            { pl: 'Bo inaczej ślady tracą kolejność chronologiczną', en: 'Otherwise traces lose chronological order' },
            { pl: 'Bo synchroniczna wysyłka nie obsługuje zagnieżdżonych spanów', en: 'Because synchronous shipping cannot handle nested spans' },
            { pl: 'Bo awaria kolektora nie może wywrócić odpowiedzi użytkownika', en: 'Because a collector outage must not take down the user response' },
            { pl: 'Bo dostawcy modeli blokują synchroniczne requesty poboczne', en: 'Because model providers block synchronous side requests' }
          ],
          correct: 2,
          explain: {
            pl: 'Obserwowalność jest funkcją pomocniczą. Jeśli leży na ścieżce krytycznej, wprowadza nowy punkt awarii do głównego przepływu produktu.',
            en: 'Observability is a support function. On the critical path it introduces a new failure point into the main product flow.'
          }
        },
        {
          q: {
            pl: 'Masz 3 miliony zapytań miesięcznie i budżet na obserwowalność. Najrozsądniejsza strategia samplowania?',
            en: 'You have 3 million requests a month and an observability budget. Most sensible sampling strategy?'
          },
          options: [
            { pl: 'Losowe 1 procent wszystkich śladów, bez wyjątków', en: 'A flat random 1 percent of all traces, no exceptions' },
            { pl: 'Zapisywać tylko ślady szybsze niż mediana, żeby mieć czyste dane', en: 'Keep only traces faster than the median, for cleaner data' },
            { pl: 'Zapisywać wszystko przez 3 dni w miesiącu', en: 'Keep everything for 3 days a month' },
            { pl: '100 procent błędów i śladów z niską oceną, plus kilka procent reszty', en: '100 percent of errors and low-scoring traces, plus a few percent of the rest' }
          ],
          correct: 3,
          explain: {
            pl: 'Rzadkie, złe przypadki mają największą wartość diagnostyczną i to one zasilają dataset ewaluacyjny. Równomierne 1 procent zgubi właśnie te, które chcesz zobaczyć.',
            en: 'Rare bad cases carry the most diagnostic value and they feed the eval dataset. A flat 1 percent throws away exactly the ones you want to see.'
          }
        }
      ]
    },

    {
      id: 'ci-regression',
      title: { pl: 'Ewaluacje w CI i monitoring produkcji', en: 'Evals in CI and production monitoring' },
      minutes: 11,
      terms: [
        { term: { pl: 'Bramka ewaluacyjna', en: 'Eval gate' }, def: { pl: 'Warunek w CI, który blokuje merge albo release, gdy pass rate spadnie poniżej progu względem baseline. Test regresji dla promptów.', en: 'A CI condition that blocks a merge or release when pass rate drops below a threshold versus baseline. The regression test for prompts.' } },
        { term: { pl: 'Smoke suite', en: 'Smoke suite' }, def: { pl: 'Mały szybki zestaw (kilkadziesiąt przypadków, minuty) odpalany przy każdym PR. Pełny zestaw idzie przed releasem, nie przy każdym commicie.', en: 'A small fast set (tens of cases, minutes) run on every PR. The full suite runs before release, not on every commit.' } },
        { term: { pl: 'Canary', en: 'Canary' }, def: { pl: 'Wypuszczenie nowej wersji na mały procent ruchu z porównaniem metryk jakości i kosztu przed pełnym rolloutem.', en: 'Releasing a new version to a small slice of traffic and comparing quality and cost metrics before the full rollout.' } },
        { term: { pl: 'Drift', en: 'Drift' }, def: { pl: 'Ciche pogorszenie jakości przy niezmienionym kodzie: zmiana rozkładu zapytań, nieaktualne dane w RAG albo aktualizacja modelu po stronie dostawcy.', en: 'Silent quality decay with unchanged code: shifting query distribution, stale RAG data or a provider-side model update.' } },
        { term: { pl: 'Pinowanie wersji modelu', en: 'Model version pinning' }, def: { pl: 'Używanie dokładnego identyfikatora modelu z datą zamiast aliasu, plus śledzenie terminów deprecacji. Odpowiednik <code>package-lock.json</code>.', en: 'Using the exact dated model id instead of a moving alias, plus tracking deprecation dates. The <code>package-lock.json</code> of model choice.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev5-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="16" y="36" width="130" height="58" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="81" y="70" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">PR opened</text><line x1="148" y1="65" x2="176" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="180" y="36" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="255" y="62" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Eval suite</text><text x="255" y="82" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">250 cases, 6 min</text><line x1="332" y1="65" x2="360" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="364" y="36" width="140" height="58" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="434" y="62" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Gate: score</text><text x="434" y="82" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">vs baseline</text><line x1="506" y1="55" x2="546" y2="55" stroke="var(--ok)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="512" y="44" font-family="inherit" font-size="13" fill="var(--ok)">pass</text><rect x="530" y="66" width="94" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="577" y="94" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">Deploy</text><line x1="434" y1="96" x2="434" y2="140" stroke="var(--err)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="444" y="122" font-family="inherit" font-size="13" fill="var(--err)">drop &gt; 3 pts</text><rect x="364" y="146" width="140" height="46" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="434" y="174" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">Block merge</text><line x1="16" y1="230" x2="624" y2="230" stroke="var(--border)" stroke-width="2"/><text x="16" y="262" font-family="inherit" font-size="14" fill="var(--muted)">Production loop</text><rect x="16" y="280" width="140" height="58" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="86" y="314" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Live traces</text><line x1="158" y1="309" x2="186" y2="309" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="190" y="280" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="265" y="306" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Nightly judge</text><text x="265" y="326" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">on 2 pct sample</text><line x1="342" y1="309" x2="370" y2="309" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="374" y="280" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="449" y="306" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Alert on drift</text><text x="449" y="326" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">quality and cost</text><path d="M449 342 L449 380 L265 380 L265 348" fill="none" stroke="var(--accent2)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="230" y="404" font-family="inherit" font-size="13" fill="var(--accent2)">bad cases go back into the eval dataset</text></svg>',
        caption: {
          pl: 'Zamknięta pętla: bramka ewaluacyjna na PR, nocny sędzia na próbce ruchu, alerty na dryf, a złe przypadki wracają do zestawu testowego.',
          en: 'The closed loop: an eval gate on the PR, a nightly judge on a traffic sample, drift alerts, and bad cases feeding back into the test set.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden pull request przechodzi przez bramkę ewaluacyjną: od uruchomienia zestawu, przez spadek wyniku i zablokowany merge, po poprawkę i nowe przypadki testowe.',
          en: 'One pull request walking through the eval gate: the suite runs, the score drops, the merge is blocked, and the fix turns the bad cases into permanent tests.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 1 of 5 - a pull request opens</text>' +
              '<rect x="30" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="88" fill="var(--text)" font-size="15" text-anchor="middle">PR 482</text>' +
              '<text x="105" y="110" fill="var(--accent)" font-size="13" text-anchor="middle">prompt tweak</text>' +
              '<line x1="184" y1="92" x2="231" y2="92" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="245,92 231,85 231,99" fill="var(--muted)"/>' +
              '<rect x="245" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Eval suite</text>' +
              '<text x="320" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">250 cases</text>' +
              '<line x1="399" y1="92" x2="446" y2="92" stroke="var(--muted)" stroke-width="2"/>' +
              '<polygon points="460,92 446,85 446,99" fill="var(--muted)"/>' +
              '<rect x="460" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Gate</text>' +
              '<text x="535" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">vs baseline</text>' +
              '<rect x="30" y="160" width="580" height="110" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="50" y="192" fill="var(--muted)" font-size="14">Result: nothing scored yet</text>' +
              '<text x="50" y="218" fill="var(--muted)" font-size="13">the suite is queued, same as unit tests on a fresh PR</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--muted)" font-size="14" text-anchor="middle">main is still serving the build that scored 88.0</text>' +
              '</svg>',
            label: { pl: 'PR otwarty', en: 'PR opened' },
            note: {
              pl: 'Zmiana promptu wygląda niewinnie i przechodzi code review. Bramka ewaluacyjna startuje automatycznie, tak samo jak testy jednostkowe.',
              en: 'The prompt tweak looks harmless and passes code review. The eval gate starts automatically, exactly like the unit test job.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 2 of 5 - the suite runs</text>' +
              '<rect x="30" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="88" fill="var(--text)" font-size="15" text-anchor="middle">PR 482</text>' +
              '<text x="105" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">prompt tweak</text>' +
              '<line x1="184" y1="92" x2="231" y2="92" stroke="var(--accent)" stroke-width="2"/>' +
              '<polygon points="245,92 231,85 231,99" fill="var(--accent)"/>' +
              '<rect x="245" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Eval suite</text>' +
              '<text x="320" y="110" fill="var(--accent)" font-size="13" text-anchor="middle">running</text>' +
              '<line x1="399" y1="92" x2="446" y2="92" stroke="var(--border)" stroke-width="2"/>' +
              '<polygon points="460,92 446,85 446,99" fill="var(--border)"/>' +
              '<rect x="460" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Gate</text>' +
              '<text x="535" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">waiting</text>' +
              '<rect x="30" y="160" width="580" height="110" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="50" y="192" fill="var(--text)" font-size="14">142 of 250 cases scored</text>' +
              '<text x="50" y="218" fill="var(--muted)" font-size="13">code assertions run first, the judge scores the open-ended ones</text>' +
              '<rect x="50" y="234" width="540" height="16" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="50" y="234" width="307" height="16" rx="8" fill="var(--accent)"/>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--muted)" font-size="14" text-anchor="middle">merge button stays disabled for the 6 minutes this takes</text>' +
              '</svg>',
            label: { pl: 'Zestaw się liczy', en: 'Suite running' },
            note: {
              pl: 'Zestaw idzie przez 250 przypadków: najpierw tanie asercje kodowe, potem sędzia modelowy na zadaniach otwartych. Merge jest zablokowany, dopóki check nie skończy.',
              en: 'The suite walks 250 cases: cheap code assertions first, then the LLM judge on the open-ended ones. Merge stays disabled until the check finishes.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 3 of 5 - score compared with the baseline</text>' +
              '<rect x="30" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="88" fill="var(--text)" font-size="15" text-anchor="middle">PR 482</text>' +
              '<text x="105" y="110" fill="var(--muted)" font-size="13" text-anchor="middle">prompt tweak</text>' +
              '<line x1="184" y1="92" x2="231" y2="92" stroke="var(--border)" stroke-width="2"/>' +
              '<polygon points="245,92 231,85 231,99" fill="var(--border)"/>' +
              '<rect x="245" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Eval suite</text>' +
              '<text x="320" y="110" fill="var(--ok)" font-size="13" text-anchor="middle">250 of 250 done</text>' +
              '<line x1="399" y1="92" x2="446" y2="92" stroke="var(--warn)" stroke-width="2"/>' +
              '<polygon points="460,92 446,85 446,99" fill="var(--warn)"/>' +
              '<rect x="460" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="535" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Gate</text>' +
              '<text x="535" y="110" fill="var(--warn)" font-size="13" text-anchor="middle">comparing</text>' +
              '<rect x="30" y="160" width="580" height="110" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="50" y="192" fill="var(--text)" font-size="14">This run 84.1 percent</text>' +
              '<text x="50" y="218" fill="var(--muted)" font-size="14">Baseline on main 88.0 percent</text>' +
              '<text x="50" y="248" fill="var(--warn)" font-size="14">Delta -3.9 pts, allowed drop is 1.0 pt</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--warn)" font-size="14" text-anchor="middle">an absolute score means nothing, the delta is the signal</text>' +
              '</svg>',
            label: { pl: 'Porównanie z baseline', en: 'Compared to baseline' },
            note: {
              pl: 'Bramka nie patrzy na sam wynik, tylko na różnicę wobec main. Spadek 3.9 punktu przy dozwolonym 1.0 to regresja, nie szum.',
              en: 'The gate does not look at the raw score, only at the delta against main. A 3.9 point drop against an allowed 1.0 is a regression, not noise.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 4 of 5 - the gate blocks the merge</text>' +
              '<rect x="30" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="88" fill="var(--text)" font-size="15" text-anchor="middle">PR 482</text>' +
              '<text x="105" y="110" fill="var(--err)" font-size="13" text-anchor="middle">check failed</text>' +
              '<line x1="184" y1="92" x2="231" y2="92" stroke="var(--border)" stroke-width="2"/>' +
              '<polygon points="245,92 231,85 231,99" fill="var(--border)"/>' +
              '<rect x="245" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Eval suite</text>' +
              '<text x="320" y="110" fill="var(--ok)" font-size="13" text-anchor="middle">250 of 250 done</text>' +
              '<line x1="399" y1="92" x2="446" y2="92" stroke="var(--err)" stroke-width="2"/>' +
              '<polygon points="460,92 446,85 446,99" fill="var(--err)"/>' +
              '<rect x="460" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="535" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Gate</text>' +
              '<text x="535" y="110" fill="var(--err)" font-size="13" text-anchor="middle">blocked</text>' +
              '<rect x="30" y="160" width="580" height="110" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="50" y="192" fill="var(--err)" font-size="14">7 cases flipped from pass to fail</text>' +
              '<text x="50" y="218" fill="var(--muted)" font-size="13">refund questions: the answer no longer cites the policy chunk</text>' +
              '<text x="50" y="244" fill="var(--muted)" font-size="13">each failure links to its trace, prompt and model output</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--err)" font-size="14" text-anchor="middle">merge blocked - nothing reaches production</text>' +
              '</svg>',
            label: { pl: 'Merge zablokowany', en: 'Merge blocked' },
            note: {
              pl: 'Bramka pokazuje nie tylko liczbę, ale konkretne przypadki, które się zepsuły, z linkiem do trace. To różnica między alarmem a zgłoszeniem błędu.',
              en: 'The gate reports not just a number but the exact cases that broke, each linked to its trace. That is the difference between an alarm and a bug report.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 5 of 5 - fix pushed, cases kept forever</text>' +
              '<rect x="30" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="88" fill="var(--text)" font-size="15" text-anchor="middle">PR 482</text>' +
              '<text x="105" y="110" fill="var(--accent)" font-size="13" text-anchor="middle">citation rule back</text>' +
              '<line x1="184" y1="92" x2="231" y2="92" stroke="var(--ok)" stroke-width="2"/>' +
              '<polygon points="245,92 231,85 231,99" fill="var(--ok)"/>' +
              '<rect x="245" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Eval suite</text>' +
              '<text x="320" y="110" fill="var(--ok)" font-size="13" text-anchor="middle">257 cases now</text>' +
              '<line x1="399" y1="92" x2="446" y2="92" stroke="var(--ok)" stroke-width="2"/>' +
              '<polygon points="460,92 446,85 446,99" fill="var(--ok)"/>' +
              '<rect x="460" y="60" width="150" height="64" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="535" y="88" fill="var(--text)" font-size="15" text-anchor="middle">Gate</text>' +
              '<text x="535" y="110" fill="var(--ok)" font-size="13" text-anchor="middle">pass</text>' +
              '<rect x="30" y="160" width="580" height="110" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="50" y="192" fill="var(--ok)" font-size="14">This run 89.2 percent, delta +1.2</text>' +
              '<text x="50" y="218" fill="var(--muted)" font-size="13">the 7 broken refund cases were added to the golden set</text>' +
              '<text x="50" y="244" fill="var(--muted)" font-size="13">this exact regression can never ship silently again</text>' +
              '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="342" fill="var(--ok)" font-size="14" text-anchor="middle">merge allowed - deploy runs, new baseline is 89.2</text>' +
              '</svg>',
            label: { pl: 'Poprawka i nowa baseline', en: 'Fix and new baseline' },
            note: {
              pl: 'Zepsute przypadki trafiają na stałe do zestawu, a wynik po poprawce staje się nową baseline. Każda złapana regresja trwale podnosi poprzeczkę.',
              en: 'The broken cases join the golden set permanently and the passing score becomes the new baseline. Every caught regression raises the bar for good.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>W dobrej restauracji nikt nie wynosi talerza na salę, dopóki szef kuchni na niego nie spojrzy. To jest bramka: jeśli danie wygląda źle, wraca do kuchni i nie trafia do gości. Nikt się nie obraża, taka jest zasada.</p><p>Ale to nie koniec. Nawet po wyjściu na salę ktoś chodzi między stolikami i patrzy, ile jedzenia zostaje na talerzach. Jeśli nagle połowa gości zostawia zupę, coś się zmieniło: może dostawca przysłał inną śmietanę, może nowy kucharz sypie więcej soli. Nikt tego nie zmienił w przepisie, a mimo to zrobiło się gorzej.</p><p>Tak samo działa dobra aplikacja z AI. Zanim zmiana pójdzie do ludzi, przechodzi przez bramkę z zapisanymi przykładami. A potem, już na żywo, ktoś cały czas sprawdza próbki i dzwoni alarm, gdy jakość cicho spada. Talerze, które wróciły pełne, lądują na liście rzeczy do sprawdzenia następnym razem.</p>',
          en: '<p>In a good restaurant nobody carries a plate to the dining room until the head chef has looked at it. That is the gate: if the dish looks wrong it goes back to the kitchen and never reaches a guest. Nobody takes offence, that is just the rule.</p><p>But it does not end there. Even after the plates go out, someone walks between the tables watching how much food comes back. If half the guests suddenly leave their soup, something changed: maybe the supplier sent different cream, maybe the new cook is heavier with the salt. Nobody edited the recipe, and yet it got worse.</p><p>A good AI app works the same way. Before a change reaches people it passes a gate made of saved examples. Then, once it is live, someone keeps checking samples and raises an alarm when quality quietly slips. The plates that came back full go onto the list of things to check next time.</p>'
        },
        school: {
          pl: '<p>Znasz to z frontendu: PR nie da się zmergować, dopóki nie przejdą testy i lint. Przy aplikacjach LLM robisz dokładnie to samo, tylko zamiast asercji na funkcje masz zestaw ewaluacyjny.</p><p>Praktyczny podział na dwa biegi. <strong>Szybki</strong>, na każdy PR: 50-100 przypadków, same deterministyczne asercje i golden set, poniżej pięciu minut, blokuje merge. <strong>Pełny</strong>, nocny albo na branchu release: kilkaset przypadków razem z sędzią modelowym, wolniejszy i droższy, raportuje wynik na Slacka.</p><p>Bramka nie może być sztywnym progiem w stylu "musi być 95 procent", bo taki próg albo zablokuje wszystko, albo nic. Porównuj do baseline z main:</p><pre><code># .github/workflows/evals.yml (fragment)\n- run: node evals/run.js --suite fast --out result.json\n- run: node evals/compare.js result.json baseline.json --max-drop 3\n</code></pre><p>Zasada: spadek większy niż 3 punkty procentowe względem main blokuje merge. Poprawa aktualizuje baseline po merge. Dodatkowo warto mieć listę przypadków krytycznych (na przykład "nigdy nie obiecuj zwrotu pieniędzy poza polityką"), gdzie każda porażka blokuje niezależnie od średniej.</p><p>Druga połowa historii dzieje się już po deployu. Model po Twojej stronie się nie zmienia, ale zmienia się wszystko dookoła: użytkownicy zaczynają pytać o nowe rzeczy, dokumenty w bazie wiedzy się starzeją, dostawca podnosi wersję modelu. To jest <strong>drift</strong>. Wykrywasz go, puszczając nocnego sędziego na losowej próbce, na przykład 2 procentach ruchu, i alarmując, gdy średnia ocena spadnie o więcej niż ustalony próg przez dwa dni z rzędu.</p><p>Do tego dorzuć monitoring kosztu na sesję. Zmiana promptu, która niepostrzeżenie dodaje 2000 tokenów kontekstu do każdego zapytania, nie zepsuje jakości, ale potroi rachunek.</p>',
          en: '<p>You know this from frontend: a PR cannot merge until tests and lint pass. With LLM apps you do exactly the same, only instead of assertions on functions you have an eval suite.</p><p>A practical split into two runs. A <strong>fast</strong> one on every PR: 50-100 cases, deterministic assertions and golden set only, under five minutes, blocks the merge. A <strong>full</strong> one nightly or on the release branch: several hundred cases including the LLM judge, slower and pricier, posting the result to Slack.</p><p>The gate must not be a hard threshold like "must be 95 percent", because such a threshold either blocks everything or nothing. Compare against the baseline from main:</p><pre><code># .github/workflows/evals.yml (excerpt)\n- run: node evals/run.js --suite fast --out result.json\n- run: node evals/compare.js result.json baseline.json --max-drop 3\n</code></pre><p>The rule: a drop of more than 3 percentage points against main blocks the merge. An improvement updates the baseline after merge. On top of that, keep a list of critical cases (for example "never promise a refund outside policy") where a single failure blocks regardless of the average.</p><p>The second half of the story happens after deploy. The model on your side does not change, but everything around it does: users start asking about new things, knowledge base documents go stale, the provider bumps the model version. That is <strong>drift</strong>. You detect it by running a nightly judge over a random sample, say 2 percent of traffic, and alerting when the mean score falls by more than a set threshold two days in a row.</p><p>Add cost per session to the monitoring. A prompt change that quietly adds 2000 context tokens to every request will not hurt quality, but it will triple the bill.</p>'
        },
        pro: {
          pl: '<p>Cel jest prosty: zmiana promptu ma mieć taki sam ceremoniał jak zmiana kodu. Ten sam PR, ten sam review, ta sama bramka, ten sam rollback.</p><h4>Pipeline</h4><ul><li><strong>Pre-merge, szybki.</strong> 50-150 przypadków, wyłącznie deterministyczne checki i golden set. Cel: poniżej 5 minut i poniżej 1 dolara. Odpalany na każdym PR-ze, który dotyka promptów, narzędzi, schematów albo konfiguracji retrievalu.</li><li><strong>Pre-release, pełny.</strong> 300-1000 przypadków z sędzią, nocny cron. Cel: poniżej 30 minut, kilka do kilkunastu dolarów. Wynik jako komentarz w PR-ze i wiadomość na Slacku z linkiem do przebiegu w Langfuse albo Braintrust.</li><li><strong>Post-deploy, canary.</strong> 5 procent ruchu przez godzinę, porównanie online metryk (rate eskalacji, thumbs down, długość sesji) przed pełnym rolloutem.</li></ul><h4>Projekt bramki</h4><p>Regresja względna, nie próg bezwzględny. Trzy warunki blokujące:</p><pre><code>const fail =\n  result.passRate &lt; baseline.passRate - 0.03 ||   // spadek 3 pkt proc.\n  result.criticalFailures &gt; 0 ||                  // twarde must-not\n  result.p95LatencyMs &gt; baseline.p95LatencyMs * 1.3;\n\nprocess.exit(fail ? 1 : 0);</code></pre><p>Ważny detal: evale są niedeterministyczne, więc flaky CI to realne ryzyko. Ustaw <code>seed</code>, gdzie się da, cachuj odpowiedzi dla niezmienionych przypadków, i przy wyniku w wąskim pasie niepewności (na przykład spadek 1-3 pkt) odpalaj automatyczny drugi przebieg zamiast od razu blokować. Inaczej zespół nauczy się klikać "merge anyway" i bramka przestanie cokolwiek znaczyć.</p><h4>Produkcja</h4><p>Trzy rzeczy monitoruj na stałe: <strong>jakość</strong> (średnia ocena sędziego na próbce 1-5 procent, thumbs down rate, rate eskalacji do człowieka), <strong>koszt</strong> (dolary na sesję, tokeny wejścia i wyjścia osobno, hit rate prompt cache) i <strong>niezawodność</strong> (rate błędów 429 i 529, p95 TTFT, odsetek niepoprawnych tool callów).</p><p>Alerty ustawiaj na trendy, nie na pojedyncze punkty: średnia ruchoma z 24 godzin poniżej progu przez dwa okna. Pojedynczy zły dzień to zwykle jeden użytkownik robiący dziwne rzeczy.</p><p>Osobna sprawa to <strong>model deprecation</strong>. Dostawcy wycofują snapshoty w cyklu kilku-kilkunastu miesięcy, a alias typu "latest" potrafi zmienić zachowanie z dnia na dzień. Pinuj konkretne wersje w konfiguracji, trzymaj w evalach macierz "aktualny model vs kandydat" i traktuj podniesienie wersji jak zwykłą zmianę wymagającą zielonej bramki. To dokładnie ta sama dyscyplina co pinowanie wersji zależności w <code>package-lock.json</code>, tylko konsekwencje są mniej widoczne i przez to groźniejsze.</p>',
          en: '<p>The goal is simple: a prompt change should carry the same ceremony as a code change. Same PR, same review, same gate, same rollback.</p><h4>The pipeline</h4><ul><li><strong>Pre-merge, fast.</strong> 50-150 cases, deterministic checks and golden set only. Target: under 5 minutes and under 1 dollar. Runs on every PR touching prompts, tools, schemas or retrieval config.</li><li><strong>Pre-release, full.</strong> 300-1000 cases including the judge, nightly cron. Target: under 30 minutes and a few to a few dozen dollars. Result posted as a PR comment and a Slack message linking to the run in Langfuse or Braintrust.</li><li><strong>Post-deploy, canary.</strong> 5 percent of traffic for an hour, comparing online metrics (escalation rate, thumbs down, session length) before the full rollout.</li></ul><h4>Gate design</h4><p>Relative regression, not an absolute threshold. Three blocking conditions:</p><pre><code>const fail =\n  result.passRate &lt; baseline.passRate - 0.03 ||   // 3 point drop\n  result.criticalFailures &gt; 0 ||                  // hard must-nots\n  result.p95LatencyMs &gt; baseline.p95LatencyMs * 1.3;\n\nprocess.exit(fail ? 1 : 0);</code></pre><p>An important detail: evals are non-deterministic, so flaky CI is a real risk. Set a <code>seed</code> where you can, cache responses for unchanged cases, and when the result lands in a narrow uncertainty band (say a 1-3 point drop) trigger an automatic second run instead of blocking immediately. Otherwise the team learns to click "merge anyway" and the gate stops meaning anything.</p><h4>Production</h4><p>Monitor three things continuously: <strong>quality</strong> (mean judge score on a 1-5 percent sample, thumbs-down rate, human escalation rate), <strong>cost</strong> (dollars per session, input and output tokens separately, prompt cache hit rate) and <strong>reliability</strong> (429 and 529 error rates, p95 TTFT, share of malformed tool calls).</p><p>Alert on trends, not single points: a 24-hour moving average below threshold for two consecutive windows. A single bad day is usually one user doing something odd.</p><p>A separate topic is <strong>model deprecation</strong>. Providers retire snapshots on a cycle of several months to a bit over a year, and a "latest" alias can shift behaviour overnight. Pin concrete versions in config, keep a "current model vs candidate" matrix in your evals, and treat a version bump as an ordinary change that needs a green gate. This is exactly the discipline of pinning dependency versions in <code>package-lock.json</code>, except the consequences are less visible and therefore more dangerous.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaki jest najlepszy odpowiednik "testów blokujących merge" dla zmian w promptach?',
            en: 'What is the best equivalent of "tests that block a merge" for prompt changes?'
          },
          options: [
            { pl: 'Ręczne sprawdzenie przez autora przed pushem', en: 'A manual check by the author before pushing' },
            { pl: 'Szybki zestaw ewaluacyjny w CI porównywany do baseline z main', en: 'A fast eval suite in CI compared against the baseline from main' },
            { pl: 'Code review bez uruchamiania modelu', en: 'Code review without running the model' },
            { pl: 'Monitoring produkcyjny po wdrożeniu', en: 'Production monitoring after the deploy' }
          ],
          correct: 1,
          explain: {
            pl: 'Zmiana promptu to zmiana zachowania systemu, więc zasługuje na tę samą bramkę co zmiana kodu. Porównanie do baseline działa lepiej niż sztywny próg.',
            en: 'A prompt change is a behaviour change, so it deserves the same gate as a code change. Comparing against a baseline works better than a fixed threshold.'
          }
        },
        {
          q: {
            pl: 'Dlaczego bramka "wynik musi być co najmniej 95 procent" jest gorsza niż "spadek względem main nie większy niż 3 punkty"?',
            en: 'Why is a "score must be at least 95 percent" gate worse than "no more than a 3 point drop versus main"?'
          },
          options: [
            { pl: 'Bo próg bezwzględny wymaga większego zestawu testowego', en: 'Because an absolute threshold requires a bigger test set' },
            { pl: 'Bo próg względny jest tańszy do policzenia', en: 'Because a relative threshold is cheaper to compute' },
            { pl: 'Bo próg bezwzględny albo blokuje wszystko, albo nic, i nie wykrywa regresji', en: 'Because an absolute threshold either blocks everything or nothing, and detects no regressions' },
            { pl: 'Bo próg względny działa też dla sędziego modelowego', en: 'Because a relative threshold also works for an LLM judge' }
          ],
          correct: 2,
          explain: {
            pl: 'Próg bezwzględny nie zauważy spadku z 99 na 96 procent, choć to realna regresja, a jednocześnie zablokuje każdą pracę przy zestawie, który z natury siedzi na 88 procentach.',
            en: 'An absolute threshold misses a drop from 99 to 96 percent, which is a real regression, while blocking all work on a suite that naturally sits at 88 percent.'
          }
        },
        {
          q: {
            pl: 'Co to jest drift jakości na produkcji, jeśli Twój kod i prompt się nie zmieniły?',
            en: 'What is production quality drift when your code and prompt have not changed?'
          },
          options: [
            { pl: 'Spadek jakości wywołany zmianami wokół modelu: nowe pytania użytkowników, stare dokumenty, nowa wersja modelu dostawcy', en: 'A quality drop caused by changes around the model: new user questions, stale documents, a new provider model version' },
            { pl: 'Wzrost latencji spowodowany geografią użytkowników', en: 'Latency growth caused by user geography' },
            { pl: 'Utrata śladów przy przepełnieniu bufora kolektora', en: 'Trace loss when the collector buffer overflows' },
            { pl: 'Błąd zaokrąglenia przy sumowaniu kosztów tokenów', en: 'A rounding error when summing token costs' }
          ],
          correct: 0,
          explain: {
            pl: 'Dlatego alias typu "latest" jest niebezpieczny: dostawca może podmienić model, a Twoja jakość zmieni się bez żadnego deployu po Twojej stronie.',
            en: 'That is why a "latest" alias is dangerous: the provider can swap the model and your quality shifts with no deploy on your side.'
          }
        },
        {
          q: {
            pl: 'Bramka ewaluacyjna zaczyna być flaky: mniej więcej co czwarty PR blokuje się na spadku 1-2 punktów, który po ponownym uruchomieniu znika. Najlepsza reakcja?',
            en: 'Your eval gate turns flaky: roughly every fourth PR blocks on a 1-2 point drop that disappears on re-run. Best response?'
          },
          options: [
            { pl: 'Podnieść dopuszczalny spadek do 15 punktów, żeby CI przestało przeszkadzać', en: 'Raise the allowed drop to 15 points so CI stops getting in the way' },
            { pl: 'Wyłączyć bramkę i polegać na monitoringu produkcyjnym', en: 'Turn the gate off and rely on production monitoring' },
            { pl: 'Kazać zespołowi klikać merge anyway, gdy zna zmianę', en: 'Tell the team to click merge anyway when they know the change' },
            { pl: 'Powiększyć zestaw, cachować niezmienione przypadki i automatycznie powtarzać przebieg w wąskim pasie niepewności', en: 'Grow the set, cache unchanged cases and auto-rerun when the result lands in a narrow uncertainty band' }
          ],
          correct: 3,
          explain: {
            pl: 'Źródłem problemu jest wariancja pomiaru, więc leczysz pomiar, a nie próg. Rozluźnienie bramki albo uczenie zespołu jej omijania kasuje całą jej wartość.',
            en: 'The root cause is measurement variance, so you fix the measurement, not the threshold. Loosening the gate or teaching the team to bypass it destroys all of its value.'
          }
        }
      ]
    },
    {
      id: 'request-economics',
      title: { pl: 'Ekonomia requestu: batch, cache, fallback', en: 'Request economics: batch, cache, fallback' },
      minutes: 10,
      terms: [
        { term: { pl: 'Batch API', en: 'Batch API' }, def: { pl: 'Asynchroniczne przetwarzanie wsadowe: wysyłasz tysiące requestów w jednej paczce, wyniki odbierasz zwykle w ciągu godziny (gwarancja 24 h) i płacisz połowę normalnej ceny tokenów.', en: 'Asynchronous batch processing: you submit thousands of requests in one job, collect results usually within an hour (24 h guarantee) and pay half the normal token price.' } },
        { term: { pl: 'Cache odpowiedzi', en: 'Response cache' }, def: { pl: 'Zapisana cała odpowiedź modelu, zwracana bez wywołania API, gdy identyczne zapytanie się powtórzy. To co innego niż prompt caching, który tylko obniża koszt wspólnego prefiksu promptu.', en: 'A stored full model answer, returned without any API call when an identical request repeats. Not the same as prompt caching, which only cuts the cost of a shared prompt prefix.' } },
        { term: { pl: 'Cache semantyczny', en: 'Semantic cache' }, def: { pl: 'Cache trafiany po podobieństwie embeddingów zapytania zamiast po identyczności. Tani w odczycie, ale przy zbyt niskim progu podobieństwa zwraca odpowiedź na podobne, lecz inne pytanie.', en: 'A cache hit by embedding similarity of the query instead of exact identity. Cheap to read, but with too low a similarity threshold it returns the answer to a similar yet different question.' } },
        { term: { pl: 'p95', en: 'p95' }, def: { pl: 'Percentyl 95 latencji: 95 procent requestów było szybszych. Lepsza miara zdrowia systemu niż średnia, bo widzi ogon powolnych requestów, który użytkownicy pamiętają najlepiej.', en: 'The 95th latency percentile: 95 percent of requests were faster. A better health metric than the average because it sees the slow tail, which users remember best.' } },
        { term: { pl: 'Circuit breaker', en: 'Circuit breaker' }, def: { pl: 'Bezpiecznik na dostawcę: po przekroczeniu progu błędów ruch automatycznie przechodzi na model zapasowy, a co jakiś czas próbka sprawdza, czy podstawowy wrócił do zdrowia.', en: 'A fuse on a provider: past an error-rate threshold, traffic automatically shifts to a backup model, and periodic probes check whether the primary has recovered.' } }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m5rq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Every request takes the cheapest path that can answer it</text>' +
          '<g stroke-width="2" fill="var(--surface)">' +
          '<rect x="20" y="48" width="150" height="64" rx="12" stroke="var(--border)"/>' +
          '<rect x="240" y="48" width="170" height="64" rx="12" stroke="var(--accent2)"/>' +
          '<rect x="470" y="48" width="150" height="64" rx="12" stroke="var(--accent)"/>' +
          '<rect x="240" y="176" width="170" height="64" rx="12" stroke="var(--ok)"/>' +
          '<rect x="470" y="176" width="150" height="64" rx="12" stroke="var(--warn)"/>' +
          '<rect x="20" y="280" width="600" height="96" rx="12" stroke="var(--border)"/>' +
          '</g>' +
          '<g font-size="14" fill="var(--text)" text-anchor="middle">' +
          '<text x="95" y="76">Request</text><text x="95" y="96" font-size="12" fill="var(--muted)">user question</text>' +
          '<text x="325" y="76">Response cache</text><text x="325" y="96" font-size="12" fill="var(--muted)">seen before?</text>' +
          '<text x="545" y="76">Primary model</text><text x="545" y="96" font-size="12" fill="var(--muted)">first choice</text>' +
          '<text x="325" y="204">Answer</text><text x="325" y="224" font-size="12" fill="var(--muted)">back to the user</text>' +
          '<text x="545" y="204">Fallback model</text><text x="545" y="224" font-size="12" fill="var(--muted)">backup provider</text>' +
          '</g>' +
          '<g stroke="var(--muted)" stroke-width="2" marker-end="url(#m5rq)">' +
          '<line x1="170" y1="80" x2="238" y2="80"/>' +
          '<line x1="410" y1="80" x2="468" y2="80"/>' +
          '<line x1="468" y1="208" x2="412" y2="208"/>' +
          '</g>' +
          '<text x="438" y="68" text-anchor="middle" font-size="12" fill="var(--muted)">miss</text>' +
          '<line x1="325" y1="112" x2="325" y2="174" stroke="var(--ok)" stroke-width="2" marker-end="url(#m5rq)"/>' +
          '<text x="335" y="148" font-size="12" fill="var(--ok)">hit: free, instant</text>' +
          '<line x1="480" y1="112" x2="372" y2="174" stroke="var(--ok)" stroke-width="2" marker-end="url(#m5rq)"/>' +
          '<text x="404" y="140" font-size="12" fill="var(--ok)">ok</text>' +
          '<line x1="545" y1="112" x2="545" y2="174" stroke="var(--err)" stroke-width="2" marker-end="url(#m5rq)"/>' +
          '<text x="556" y="148" font-size="12" fill="var(--err)">5xx</text>' +
          '<text x="40" y="312" font-size="14" fill="var(--text)">Offline work: evals, backfills, embeddings, nightly reports</text>' +
          '<text x="40" y="338" font-size="14" fill="var(--accent2)">Batch API: half price, usually done under an hour, max 24 h</text>' +
          '<text x="40" y="362" font-size="12" fill="var(--muted)">never on the interactive path - no user is waiting there</text>' +
          '</svg>',
        caption: {
          pl: 'Ścieżka jednego requestu: najpierw cache odpowiedzi, potem model, po błędzie fallback. Praca offline schodzi do Batch API za połowę ceny.',
          en: 'The path of one request: response cache first, then the model, fallback after an error. Offline work drops down to the Batch API at half price.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Prowadzisz kawiarnię z jednym genialnym, ale drogim baristą. Żeby interes się spinał, masz trzy triki. Pierwszy: najczęściej zamawiane rzeczy stoją gotowe na ladzie - gdy ktoś prosi o "to co zwykle", podajesz od ręki, a barista nawet nie podnosi głowy. To cache odpowiedzi: gotowa odpowiedź bez fatygowania modelu.</p><p>Drugi trik: wielkie zamówienie na jutrzejszą konferencję parzysz nocą, kiedy ekspres i tak stoi bezczynnie. Dostawca ziarna liczy za nocne partie połowę stawki, bo nikomu się nie spieszy. To przetwarzanie wsadowe. Trzeci trik: gdy główny ekspres nagle strajkuje, na zapleczu czeka zapasowy. Kawa z niego jest odrobinę prostsza, ale klient wychodzi z kubkiem, a nie z przeprosinami. To fallback.</p><p>I jeszcze jedno: jakości kolejki nie oceniasz po średnim czasie czekania, tylko po najbardziej pechowym kliencie z dwudziestu. Bo to właśnie on opowie potem znajomym, ile czekał.</p>',
          en: '<p>You run a cafe with one brilliant but expensive barista. To make the business work, you have three tricks. First: the most ordered items sit ready on the counter - when someone asks for "the usual", you hand it over instantly and the barista never looks up. That is a response cache: a ready answer without bothering the model.</p><p>Second trick: the big order for tomorrow conference gets brewed overnight, when the machine would sit idle anyway. The bean supplier charges half price for overnight runs, because nobody is in a hurry. That is batch processing. Third trick: when the main espresso machine suddenly goes on strike, a backup waits in the storeroom. Its coffee is a bit simpler, but the customer leaves with a cup, not an apology. That is a fallback.</p><p>One more thing: you judge the queue not by the average wait, but by the unluckiest customer in twenty. Because that is the one who will tell friends how long it took.</p>'
        },
        school: {
          pl: '<p>Trzy mechanizmy decydują o koszcie i latencji aplikacji LLM w skali. Żadne z nich nie zmienia promptów ani modelu - zmieniają tylko to, kiedy i czy w ogóle model jest wołany.</p><h4>Cache odpowiedzi to nie prompt caching</h4><p>Prompt caching u dostawcy obniża koszt wspólnego prefiksu promptu, ale request nadal idzie do modelu i model nadal generuje. Cache odpowiedzi działa piętro wyżej: jeśli identyczne zapytanie już padło, zwracasz zapisaną odpowiedź w kilka milisekund i za zero tokenów. Działa tam, gdzie zapytania faktycznie się powtarzają: FAQ, podpowiedzi, klasyfikacja tych samych rekordów.</p><h4>Batch API dla pracy bez widza</h4><p>Wszystko, przy czym nie czeka człowiek, powinno jechać wsadowo. Wysyłasz jedną paczkę z tysiącami requestów, odbierasz wyniki zwykle w ciągu godziny (gwarancja: doba) i płacisz <strong>połowę</strong> normalnej stawki. Przykład: klasyfikacja 10 tysięcy opisów produktów po około 500 tokenów to 5 milionów tokenów wejścia. Na modelu za ok. 1 dolara za milion tokenów zapłacisz 5 dolarów online, a 2.50 batchem - i nie zjesz przy tym limitów, z których korzysta ruch na żywo.</p><h4>Fallback, czyli plan B</h4><p>Dostawcy miewają awarie i przeciążenia. Zamiast pokazywać użytkownikowi błąd, trzymasz listę zapasową: po serii błędów lub timeoutów request idzie do innego modelu albo innego dostawcy. Odpowiedź bywa skromniejsza, ale jest.</p><h4>Percentyle zamiast średniej</h4><p>Średnia latencja kłamie, bo maskuje ogon. Patrz na percentyle: p50 to typowy przypadek, p95 mówi, co przeżywa co dwudziesty użytkownik. Jeśli p50 wynosi 2 sekundy, a p95 aż 12, to masz problem, którego średnia (może 3 sekundy) w ogóle nie pokazuje.</p><p>Do zapamiętania: cache odpowiada za darmo na powtórki, batch tnie koszt pracy offline o połowę, fallback zamienia awarię w lekką degradację, a zdrowie systemu mierzysz percentylami, nie średnią.</p>',
          en: '<p>Three mechanisms decide the cost and latency of an LLM app at scale. None of them touches your prompts or your model - they only change when, and whether, the model is called at all.</p><h4>A response cache is not prompt caching</h4><p>Provider-side prompt caching cuts the cost of a shared prompt prefix, but the request still reaches the model and the model still generates. A response cache works one floor higher: if the identical request has been asked before, you return the stored answer in a few milliseconds for zero tokens. It shines where queries genuinely repeat: FAQs, suggestions, classification of the same records.</p><h4>The Batch API for work with no audience</h4><p>Anything no human is waiting for should travel in a batch. You submit one job with thousands of requests, collect results usually within an hour (guarantee: a day) and pay <strong>half</strong> the normal rate. Example: classifying 10 thousand product descriptions of about 500 tokens each is 5 million input tokens. On a model priced around 1 dollar per million tokens that is 5 dollars online and 2.50 in a batch - and it does not consume the rate limits your live traffic depends on.</p><h4>Fallback, the plan B</h4><p>Providers have outages and overloads. Instead of showing the user an error, you keep a backup list: after a run of errors or timeouts the request goes to another model or another provider. The answer may be humbler, but it exists.</p><h4>Percentiles instead of the average</h4><p>Average latency lies, because it masks the tail. Watch percentiles: p50 is the typical case, p95 tells you what every twentieth user lives through. If p50 is 2 seconds and p95 is 12, you have a problem the average (maybe 3 seconds) never shows.</p><p>To remember: the cache answers repeats for free, batch halves the cost of offline work, fallback turns an outage into mild degradation, and system health is measured in percentiles, not averages.</p>'
        },
        pro: {
          pl: '<p>Ekonomia requestu to warstwa, która na rozmowach odróżnia "umiem wywołać API" od "utrzymywałem to na produkcji". Konkrety poniżej.</p><h4>Cache odpowiedzi: klucz i unieważnianie</h4><pre><code>const key = sha256([\n  MODEL, PROMPT_VERSION, params.temperature,\n  normalize(userQuestion)\n].join("|"));\nconst cached = await kv.get(key);\nif (cached) return cached;  // 0 tokenów, kilka ms</code></pre><p>Klucz musi zawierać model i wersję promptu - bump którejkolwiek wersji naturalnie unieważnia stare wpisy, bo zmienia klucz. Do tego TTL dopasowany do świeżości treści. Wariant semantyczny (hit po podobieństwie embeddingów, próg rzędu 0.95) podnosi hit ratio, ale wprowadza nowy tryb awarii: odpowiedź na podobne, lecz inne pytanie, która wygląda zupełnie poprawnie. Dlatego loguj każdy hit semantyczny i mierz odsetek fałszywych trafień na ręcznie przeglądanej próbce.</p><h4>Batch API: liczby, które warto znać</h4><p>Anthropic Message Batches przyjmuje do 100 tysięcy requestów lub 256 MB w paczce; większość kończy się w ciągu godziny, gwarancja to 24 godziny, wyniki czekają 29 dni, a zniżka wynosi 50 procent na wszystkie tokeny. Działa z prompt cachingiem i narzędziami. Typowa lista robót batchowych: nocne przebiegi evali, backfill embeddingów, klasyfikacje, podsumowania, generowanie danych testowych. Prosta reguła architektoniczna: każdy request bez człowieka po drugiej stronie to kandydat na batch - jeśli leci online, przepalasz podwójną stawkę i limity.</p><h4>Koszt i latencja per request</h4><p>Z pól <code>usage</code> każdej odpowiedzi licz koszt w dolarach i przypisuj go do feature, użytkownika i wersji promptu - te same tagi, które trafiają do spanów w tracingu. Latencję agreguj per endpoint jako p50/p95/p99, a dla streamingu osobno śledź TTFT (Time To First Token - czas do pierwszego tokenu), bo to on jest odczuwalną szybkością. Retry z backoffem trzymaj we wspólnym budżecie czasu na cały request, inaczej trzy próby po 30 sekund dają p99 z kosmosu.</p><h4>Fallback jako circuit breaker</h4><p>Przełączanie rób na poziomie architektury, nie w handlerze: bezpiecznik otwiera się po przekroczeniu progu błędów (na przykład 20 procent w oknie 30 sekund), ruch idzie na model zapasowy, a stan half-open co jakiś czas przepuszcza próbkę na model podstawowy. Najważniejsza pułapka nie jest techniczna: fallback na tańszy model lub innego dostawcę to <em>zmiana jakości</em>. Zanim włączysz go na produkcji, przepuść przez model zapasowy swój golden set - inaczej krótka awaria dostawcy zamieni się w cichą, niemierzoną degradację odpowiedzi. To dokładnie ten sam wniosek, co w lekcjach o evalach: każda ścieżka, która może obsłużyć użytkownika, musi być zmierzona.</p>',
          en: '<p>Request economics is the layer that separates "I can call the API" from "I ran this in production" in interviews. The specifics below.</p><h4>Response cache: the key and invalidation</h4><pre><code>const key = sha256([\n  MODEL, PROMPT_VERSION, params.temperature,\n  normalize(userQuestion)\n].join("|"));\nconst cached = await kv.get(key);\nif (cached) return cached;  // 0 tokens, a few ms</code></pre><p>The key must include the model and the prompt version - bumping either naturally invalidates old entries by changing the key. Add a TTL matched to content freshness. The semantic variant (hits by embedding similarity, threshold around 0.95) raises the hit ratio but introduces a new failure mode: an answer to a similar yet different question that looks perfectly fine. So log every semantic hit and measure the false-hit rate on a manually reviewed sample.</p><h4>Batch API: numbers worth knowing</h4><p>Anthropic Message Batches accepts up to 100 thousand requests or 256 MB per job; most finish within an hour, the guarantee is 24 hours, results remain available for 29 days, and the discount is 50 percent on all tokens. It works with prompt caching and tools. The typical batch worklist: nightly eval runs, embedding backfills, classification, summaries, test-data generation. A simple architectural rule: any request with no human on the other end is a batch candidate - run it online and you burn double the rate plus the rate limits your live traffic needs.</p><h4>Cost and latency per request</h4><p>From the <code>usage</code> fields of every response, compute the dollar cost and attribute it to feature, user and prompt version - the same tags that go into your tracing spans. Aggregate latency per endpoint as p50/p95/p99, and for streaming track TTFT (Time To First Token) separately, because that is the perceived speed. Keep retries with backoff inside one shared time budget per request, or three attempts of 30 seconds each will give you a p99 from outer space.</p><h4>Fallback as a circuit breaker</h4><p>Do the switching at the architecture level, not in a handler: the breaker opens past an error threshold (say 20 percent in a 30-second window), traffic flows to the backup model, and a half-open state periodically lets a probe through to the primary. The most important trap is not technical: falling back to a cheaper model or another provider is a <em>quality change</em>. Before enabling it in production, run your golden set through the backup model - otherwise a short provider outage becomes a silent, unmeasured degradation of answers. It is exactly the conclusion of the eval lessons: every path that can serve a user must be measured.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym cache odpowiedzi różni się od prompt cachingu u dostawcy?',
            en: 'How does a response cache differ from provider-side prompt caching?'
          },
          options: [
            { pl: 'Niczym, to dwie nazwy tej samej funkcji API', en: 'Nothing, they are two names for the same API feature' },
            { pl: 'Prompt caching działa tylko dla requestów batchowych', en: 'Prompt caching only works for batch requests' },
            { pl: 'Cache odpowiedzi zwraca gotową odpowiedź bez wołania modelu; prompt caching obniża koszt prefiksu, ale model nadal generuje', en: 'A response cache returns a ready answer without calling the model; prompt caching cuts prefix cost, but the model still generates' },
            { pl: 'Cache odpowiedzi jest wbudowany w API modelu i nie wymaga żadnego kodu', en: 'A response cache is built into the model API and needs no code' }
          ],
          correct: 2,
          explain: {
            pl: 'To dwie różne warstwy: prompt caching przyspiesza i potania wywołanie, które i tak się dzieje, a cache odpowiedzi w ogóle je pomija. Utrzymujesz go sam, po swojej stronie, z własnym kluczem i TTL.',
            en: 'Two different layers: prompt caching makes a call that still happens faster and cheaper, while a response cache skips the call entirely. You maintain it yourself, on your side, with your own key and TTL.'
          }
        },
        {
          q: {
            pl: 'Które zadanie najlepiej nadaje się do Batch API?',
            en: 'Which job is the best fit for the Batch API?'
          },
          options: [
            { pl: 'Nocny backfill embeddingów dla dwóch milionów dokumentów', en: 'A nightly embedding backfill for two million documents' },
            { pl: 'Czat na żywo z klientem sklepu', en: 'A live chat with a store customer' },
            { pl: 'Streaming odpowiedzi do interfejsu użytkownika', en: 'Streaming an answer into a user interface' },
            { pl: 'Autouzupełnianie w polu wyszukiwania', en: 'Autocomplete in a search box' }
          ],
          correct: 0,
          explain: {
            pl: 'Batch API zwraca wyniki w ciągu godzin, więc pasuje tylko tam, gdzie nikt nie czeka - a w zamian daje 50 procent zniżki i nie zużywa limitów ruchu interaktywnego. Czat, streaming i autouzupełnianie muszą odpowiadać w sekundach.',
            en: 'The Batch API returns results within hours, so it fits only where nobody is waiting - and in exchange gives a 50 percent discount without consuming interactive rate limits. Chat, streaming and autocomplete must answer in seconds.'
          }
        },
        {
          q: {
            pl: 'Dlaczego zdrowie systemu monitoruje się percentylem p95 latencji, a nie średnią?',
            en: 'Why is system health monitored with the p95 latency percentile rather than the average?'
          },
          options: [
            { pl: 'Bo p95 jest tańszy w obliczeniu niż średnia', en: 'Because p95 is cheaper to compute than the average' },
            { pl: 'Bo średnia wymaga przechowywania wszystkich pomiarów', en: 'Because the average requires storing every measurement' },
            { pl: 'Bo p95 uwzględnia tylko requesty zakończone sukcesem', en: 'Because p95 only counts successful requests' },
            { pl: 'Bo średnia maskuje ogon powolnych requestów, a p95 pokazuje, co przeżywa co dwudziesty użytkownik', en: 'Because the average masks the slow tail, while p95 shows what every twentieth user lives through' }
          ],
          correct: 3,
          explain: {
            pl: 'Rozkład latencji LLM ma długi ogon: retry, przeciążenia dostawcy, długie generacje. Średnia ściąga go do niepozornej liczby, a p95 i p99 pokazują doświadczenie pechowych użytkowników - czyli to, co naprawdę generuje skargi.',
            en: 'LLM latency has a long tail: retries, provider overloads, long generations. The average flattens it into an innocent number, while p95 and p99 show what unlucky users experience - the part that actually generates complaints.'
          }
        },
        {
          q: {
            pl: 'Bot FAQ ma cache semantyczny z progiem podobieństwa 0.80. Hit ratio wynosi 60 procent, ale rosną skargi, że odpowiedzi są obok pytania. Najlepszy pierwszy ruch?',
            en: 'An FAQ bot has a semantic cache with a 0.80 similarity threshold. The hit ratio is 60 percent, but complaints grow that answers are beside the question. Best first move?'
          },
          options: [
            { pl: 'Wyłączyć cały cache i wrócić do wołania modelu przy każdym pytaniu', en: 'Disable the whole cache and go back to calling the model for every question' },
            { pl: 'Podnieść próg podobieństwa i zmierzyć odsetek fałszywych trafień na próbce zalogowanych hitów', en: 'Raise the similarity threshold and measure the false-hit rate on a sample of logged hits' },
            { pl: 'Wydłużyć TTL wpisów, żeby cache częściej trafiał', en: 'Extend the entry TTL so the cache hits more often' },
            { pl: 'Przełączyć generowanie odpowiedzi na większy model', en: 'Switch answer generation to a larger model' }
          ],
          correct: 1,
          explain: {
            pl: 'Objaw wskazuje na fałszywe trafienia: próg 0.80 skleja podobne, ale różne pytania. Podnosisz próg, poświęcając część hit ratio za poprawność, i od tej pory mierzysz fałszywe trafienia na próbce - bez pomiaru ten sam problem wróci przy każdej zmianie progu. Wyłączenie cache i większy model leczą nie ten organ.',
            en: 'The symptom points at false hits: a 0.80 threshold merges similar but different questions. You raise the threshold, trading some hit ratio for correctness, and start measuring false hits on a sample - without measurement the same problem returns at every threshold change. Disabling the cache or a bigger model treats the wrong organ.'
          }
        }
      ]
    }
  ]
};
