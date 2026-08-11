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
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev1-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><text x="20" y="30" font-family="inherit" font-size="15" fill="var(--warn)">Shipping on vibes</text><rect x="20" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="85" y="78" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Edit the</text><text x="85" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">prompt</text><line x1="152" y1="82" x2="176" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="180" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="245" y="78" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Try 2 inputs</text><text x="245" y="96" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">by hand</text><line x1="312" y1="82" x2="336" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="340" y="50" width="120" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="400" y="88" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Ship</text><line x1="462" y1="82" x2="486" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="490" y="50" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="555" y="78" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">Silent</text><text x="555" y="96" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">regression</text><line x1="20" y1="160" x2="620" y2="160" stroke="var(--border)" stroke-width="2"/><text x="20" y="205" font-family="inherit" font-size="15" fill="var(--ok)">Shipping with evals</text><rect x="20" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="85" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Edit the</text><text x="85" y="271" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">prompt</text><line x1="152" y1="257" x2="176" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="180" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="245" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Run 200</text><text x="245" y="271" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">saved cases</text><line x1="312" y1="257" x2="336" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="340" y="225" width="120" height="64" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="400" y="253" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">87 to 91</text><text x="400" y="271" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">pass rate</text><line x1="462" y1="257" x2="486" y2="257" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev1-arrow)"/><rect x="490" y="225" width="130" height="64" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="555" y="253" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">Ship, or</text><text x="555" y="271" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">revert</text><text x="20" y="340" font-family="inherit" font-size="13" fill="var(--muted)">Same edit, same model. The only difference is that one loop</text><text x="20" y="362" font-family="inherit" font-size="13" fill="var(--muted)">produces a number you can compare across versions.</text></svg>',
        caption: {
          pl: 'Ta sama zmiana promptu w dwoch petlach: na czuja i z zestawem testowym. Roznica to liczba, ktora da sie porownac miedzy wersjami.',
          en: 'The same prompt change in two loops: by vibes and with a saved test set. The difference is a number you can compare across versions.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze gotujesz zupe dla stu osob. Dorzucasz szczypte soli, probujesz jedna lyzeczke i mowisz: "no, chyba lepiej". Nastepnego dnia dorzucasz czosnek, znowu jedna lyzeczka, znowu "chyba lepiej". Po tygodniu zupa jest okropna, ale nie wiesz, ktory skladnik ja zepsul, bo za kazdym razem probowales tylko raz i tylko sam.</p><p>Teraz inna wersja: masz dziesiec osob, ktore zawsze probuja te sama zupe i zawsze mowia, czy jest za slona, za ostra, czy w sam raz. Zapisujesz ich oceny. Kiedy dorzucisz czosnek, od razu widzisz: siedem osob mowi lepiej, trzy gorzej. Kiedy zupa nagle spada z osmiu punktow na cztery, wiesz dokladnie, ktora zmiana to zrobila.</p><p>Ewaluacje to wlasnie ci probierze. Zbior pytan, na ktore znasz dobre odpowiedzi, uruchamiany za kazdym razem, gdy cos zmieniasz. Bez nich zgadujesz. Z nimi wiesz.</p>',
          en: '<p>Imagine cooking soup for a hundred people. You add a pinch of salt, taste one spoonful, and say "yeah, better". Next day you add garlic, one spoonful again, "better again". A week later the soup is awful, but you have no idea which ingredient ruined it, because every time you tasted once, and only you tasted.</p><p>Now a different version: ten people always taste the same soup and always say whether it is too salty, too spicy, or just right. You write their scores down. When you add garlic you immediately see: seven say better, three say worse. When the soup suddenly drops from eight points to four, you know exactly which change did it.</p><p>Evals are those tasters. A collection of questions you already know good answers to, run every single time you change something. Without them you are guessing. With them you know.</p>'
        },
        school: {
          pl: '<p>Kiedy piszesz zwykly kod, masz testy. Zmieniasz funkcje, odpalasz <code>npm test</code>, widzisz czerwono albo zielono. Przy aplikacjach z LLM ludzie zwykle tego nie robia. Zmieniaja prompt, wklejaja jedno pytanie do czatu, patrza na odpowiedz i mowia "spoko, dziala". To jest testowanie na czuja i nie skaluje sie ani troche.</p><p>Problem jest taki, ze model nie ma sztywnego kontraktu. Ta sama zmiana, ktora poprawia odpowiedzi na pytania o faktury, moze zepsuc odpowiedzi na pytania o zwroty. Nie zobaczysz tego, jesli sprawdzisz dwa przypadki, ktore akurat przyszly Ci do glowy. Zobaczysz to dopiero, gdy zglosza to uzytkownicy, czyli tydzien pozniej i w gorszym miejscu.</p><p><strong>Eval (ewaluacja)</strong> to zestaw zapisanych przykladow wejscia razem z opisem, jak wyglada dobra odpowiedz, plus sposob sprawdzenia. Najprostsza wersja to zwykla tablica:</p><pre><code>const cases = [\n  { input: "Gdzie jest moja paczka 12345?",\n    mustCall: "get_order_status",\n    mustNotSay: ["nie mam dostepu"] },\n  { input: "Chce zwrot", mustCall: "start_return" }\n];</code></pre><p>Uruchamiasz to na 100 albo 300 takich przypadkow i dostajesz jedna liczbe: ile procent przeszlo. Ta liczba nie musi byc idealna. Musi byc porownywalna miedzy wersja A i wersja B. Wtedy nagle "chyba lepiej" zamienia sie w "87 procent poszlo na 91 procent, mergujemy".</p><p>Efekt uboczny jest ciekawy: sam proces pisania przypadkow testowych zmusza Cie do zdefiniowania, co w ogole znaczy dobra odpowiedz. Bardzo czesto to jest najtrudniejsza czesc calego projektu.</p>',
          en: '<p>When you write normal code you have tests. You change a function, run <code>npm test</code>, and see red or green. With LLM apps most people skip that. They tweak a prompt, paste one question into a chat, look at the answer and say "cool, works". That is vibes-testing and it does not scale at all.</p><p>The problem is that the model has no rigid contract. The same change that improves answers about invoices can quietly break answers about refunds. You will not catch it by checking the two cases that happened to come to mind. You will catch it when users report it, a week later and in a worse place.</p><p>An <strong>eval</strong> is a set of saved inputs plus a description of what a good answer looks like, plus a way to check it. The simplest version is a plain array:</p><pre><code>const cases = [\n  { input: "Where is my parcel 12345?",\n    mustCall: "get_order_status",\n    mustNotSay: ["I do not have access"] },\n  { input: "I want a refund", mustCall: "start_return" }\n];</code></pre><p>You run that over 100 or 300 such cases and you get one number: what percentage passed. That number does not have to be perfect. It has to be comparable between version A and version B. Suddenly "feels better" turns into "87 percent went to 91 percent, merge it".</p><p>There is a nice side effect: writing the cases forces you to define what a good answer even means. Very often that is the hardest part of the whole project.</p>'
        },
        pro: {
          pl: '<p>Ewaluacje to dzis najwiekszy wyroznik na rynku pracy w AI. Prompt napisze kazdy. Postawienie petli, ktora mowi, czy nowy prompt, nowy model albo nowy retriever jest lepszy od poprzedniego, to juz inzynieria i to jest to, o co pytaja na rozmowach.</p><p>Kilka twardych zasad, ktore warto miec w glowie:</p><ul><li><strong>Zacznij od 20 przypadkow, nie od 2000.</strong> Dwadziescia realnych przykladow z produkcji da Ci wiecej niz dwiescie wymyslonych. Rozbudowuj zestaw przy kazdym bugu: kazdy raport od uzytkownika ladnie zamienia sie w nowy case, dokladnie jak regression test po incydencie.</li><li><strong>Mierz osobno komponenty i caly system.</strong> W RAG-u osobno oceniasz retrieval (recall@k), osobno generacje. Jesli mierzysz tylko koncowa odpowiedz, nie wiesz, czy naprawiac chunking czy prompt.</li><li><strong>Pilnuj wariancji.</strong> Przy temperature 0 model i tak nie jest w pelni deterministyczny (kolejnosc redukcji zmiennoprzecinkowych, batching po stronie dostawcy, MoE routing). Roznica 87 do 89 procent na 50 przypadkach to szum. Przy n=50 blad standardowy proporcji to okolo 4-5 punktow procentowych, wiec albo powiekszasz zestaw, albo odpalasz 3 przebiegi i patrzysz na srednia.</li><li><strong>Trzymaj zestaw w repo, nie w glowie.</strong> Pliki JSONL obok kodu, wersjonowane w git, plus dataset w Langfuse albo Braintrust dla widoku historycznego.</li></ul><p>Minimalny bieg testowy wyglada mniej wiecej tak:</p><pre><code>import { readFileSync } from "node:fs";\n\nconst cases = readFileSync("evals/support.jsonl", "utf8")\n  .trim().split("\\n").map(JSON.parse);\n\nlet pass = 0;\nfor (const c of cases) {\n  const out = await runAgent(c.input);\n  const ok = c.mustCall.every(t =&gt; out.toolCalls.includes(t));\n  if (ok) pass++;\n  else console.log("FAIL", c.id, out.toolCalls);\n}\nconsole.log("pass rate", (pass / cases.length * 100).toFixed(1));</code></pre><p>Koszt jest realny, ale mniejszy niz sie wydaje. 300 przypadkow po okolo 3 tysiace tokenow wejscia i 400 wyjscia to przy cenach rzedu 3 dolarow za milion tokenow wejscia i 15 za milion wyjscia okolo 4-5 dolarow za pelny przebieg. Odpalany przy kazdym PR-ze to kilkadziesiat dolarow miesiecznie, czyli mniej niz jedna godzina debugowania produkcji.</p><p>Najczestsza pulapka: zestaw, w ktorym wszystko przechodzi. Jesli masz 100 procent, zestaw jest za latwy i niczego juz nie wykrywa. Celuj w 70-90 procent i dokladaj trudne przypadki, gdy tylko wynik zaczyna sie sufitowac.</p>',
          en: '<p>Evals are currently the biggest differentiator on the AI job market. Anyone can write a prompt. Building the loop that tells you whether a new prompt, a new model or a new retriever is better than the last one is engineering, and that is what interviews probe.</p><p>A few hard rules worth carrying around:</p><ul><li><strong>Start with 20 cases, not 2000.</strong> Twenty real production examples beat two hundred invented ones. Grow the set on every bug: each user report converts cleanly into a new case, exactly like a regression test after an incident.</li><li><strong>Measure components and the whole system separately.</strong> In RAG you score retrieval (recall@k) apart from generation. If you only score the final answer you cannot tell whether to fix chunking or the prompt.</li><li><strong>Respect variance.</strong> At temperature 0 the model is still not fully deterministic (floating-point reduction order, provider-side batching, MoE routing). A move from 87 to 89 percent on 50 cases is noise. At n=50 the standard error of a proportion is roughly 4-5 percentage points, so either grow the set or run 3 passes and average.</li><li><strong>Keep the set in the repo, not in your head.</strong> JSONL files next to the code, versioned in git, plus a dataset in Langfuse or Braintrust for the historical view.</li></ul><p>A minimal run looks roughly like this:</p><pre><code>import { readFileSync } from "node:fs";\n\nconst cases = readFileSync("evals/support.jsonl", "utf8")\n  .trim().split("\\n").map(JSON.parse);\n\nlet pass = 0;\nfor (const c of cases) {\n  const out = await runAgent(c.input);\n  const ok = c.mustCall.every(t =&gt; out.toolCalls.includes(t));\n  if (ok) pass++;\n  else console.log("FAIL", c.id, out.toolCalls);\n}\nconsole.log("pass rate", (pass / cases.length * 100).toFixed(1));</code></pre><p>The cost is real but smaller than people fear. 300 cases at about 3k input and 400 output tokens, at prices around 3 dollars per million input and 15 per million output tokens, comes to roughly 4-5 dollars per full run. Run on every PR that is tens of dollars a month, less than one hour of production debugging.</p><p>The most common trap: a suite where everything passes. If you are at 100 percent the set is too easy and detects nothing. Aim for 70-90 percent and add hard cases as soon as the score starts hitting the ceiling.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest najblizsza analogia ewaluacji w swiecie frontendu?',
            en: 'What is the closest frontend-world analogy for evals?'
          },
          options: [
            { pl: 'Linter, ktory sprawdza styl kodu', en: 'A linter checking code style' },
            { pl: 'Zestaw testow regresyjnych uruchamianych przy kazdej zmianie', en: 'A regression test suite run on every change' },
            { pl: 'Source mapy do debugowania', en: 'Source maps for debugging' },
            { pl: 'Tree shaking w bundlerze', en: 'Bundler tree shaking' }
          ],
          correct: 1,
          explain: {
            pl: 'Ewaluacje pelnia dokladnie te sama role co testy regresyjne: chronia przed cichym zepsuciem czegos, co dzialalo, gdy zmieniasz prompt, model albo retriever.',
            en: 'Evals play exactly the role of regression tests: they protect against silently breaking something that used to work when you change a prompt, model or retriever.'
          }
        },
        {
          q: {
            pl: 'Twoj zestaw ewaluacyjny ma 40 przypadkow i przechodzi 100 procent od trzech miesiecy. Co to najpewniej oznacza?',
            en: 'Your eval set has 40 cases and has passed 100 percent for three months. What does that most likely mean?'
          },
          options: [
            { pl: 'Aplikacja jest gotowa, mozna przestac mierzyc', en: 'The app is done, you can stop measuring' },
            { pl: 'Model przestal halucynowac', en: 'The model stopped hallucinating' },
            { pl: 'Zestaw jest za latwy i nie wykrywa juz regresji', en: 'The set is too easy and no longer detects regressions' },
            { pl: 'Trzeba obnizyc temperature', en: 'You should lower the temperature' }
          ],
          correct: 2,
          explain: {
            pl: 'Zestaw przy sufitowej wartosci nie niesie informacji. Dokladaj trudne przypadki z produkcji, az wynik zejdzie w okolice 70-90 procent.',
            en: 'A suite pinned at the ceiling carries no information. Add hard production cases until the score drops back toward 70-90 percent.'
          }
        },
        {
          q: {
            pl: 'Dlaczego nie wystarczy recznie sprawdzic dwoch przykladow po zmianie promptu?',
            en: 'Why is manually checking two examples after a prompt change not enough?'
          },
          options: [
            { pl: 'Bo zmiana ktora poprawia jedna klase wejsc, czesto psuje inna, ktorej nie sprawdziles', en: 'Because a change that improves one class of inputs often breaks another one you did not check' },
            { pl: 'Bo API nie pozwala na recznie wysylane zapytania', en: 'Because the API does not allow manually sent requests' },
            { pl: 'Bo prompty sa cachowane i wynik i tak bylby stary', en: 'Because prompts are cached, so the result would be stale anyway' },
            { pl: 'Bo temperature 0 zawsze zwraca to samo', en: 'Because temperature 0 always returns the same thing' }
          ],
          correct: 0,
          explain: {
            pl: 'Model nie ma sztywnego kontraktu, wiec efekty zmiany rozlewaja sie po calej przestrzeni wejsc. Dwa przyklady pokrywaja jej ulamek promila.',
            en: 'The model has no rigid contract, so a change ripples across the whole input space. Two examples cover a vanishing fraction of it.'
          }
        },
        {
          q: {
            pl: 'Na 50 przypadkach wynik wzrosl z 86 na 88 procent po zmianie promptu. Co robisz?',
            en: 'On 50 cases the score went from 86 to 88 percent after a prompt change. What do you do?'
          },
          options: [
            { pl: 'Mergujesz, dwa punkty to wyrazna poprawa', en: 'Merge, two points is a clear improvement' },
            { pl: 'Cofasz zmiane, bo poprawa jest za mala zeby byla prawdziwa', en: 'Revert, the gain is too small to be real' },
            { pl: 'Traktujesz to jako szum: powiekszasz zestaw lub odpalasz kilka przebiegow', en: 'Treat it as noise: grow the set or run several passes' },
            { pl: 'Zmieniasz metryke na taka, ktora pokazuje wieksza roznice', en: 'Switch to a metric that shows a bigger difference' }
          ],
          correct: 2,
          explain: {
            pl: 'Przy n=50 blad standardowy proporcji to okolo 4-5 punktow procentowych, wiec 2 punkty mieszcza sie w szumie. Wiecej danych albo powtorzone przebiegi rozstrzygaja sprawe.',
            en: 'At n=50 the standard error of a proportion is around 4-5 percentage points, so 2 points sits inside the noise. More data or repeated runs settle it.'
          }
        }
      ]
    },

    {
      id: 'eval-types',
      title: { pl: 'Rodzaje ewaluacji', en: 'Types of evals' },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev2-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><line x1="48" y1="40" x2="48" y2="352" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev2-arrow)"/><text x="20" y="30" font-family="inherit" font-size="13" fill="var(--muted)">cheap</text><text x="20" y="380" font-family="inherit" font-size="13" fill="var(--muted)">costly</text><rect x="80" y="36" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="98" y="64" font-family="inherit" font-size="14" fill="var(--text)">Code assertions</text><text x="98" y="86" font-family="inherit" font-size="13" fill="var(--muted)">JSON parses, schema valid, no PII</text><text x="424" y="74" font-family="inherit" font-size="13" fill="var(--muted)">every commit</text><rect x="80" y="118" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="98" y="146" font-family="inherit" font-size="14" fill="var(--text)">Golden set</text><text x="98" y="168" font-family="inherit" font-size="13" fill="var(--muted)">expected output, exact or fuzzy match</text><text x="424" y="156" font-family="inherit" font-size="13" fill="var(--muted)">every PR</text><rect x="80" y="200" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="98" y="228" font-family="inherit" font-size="14" fill="var(--text)">LLM as judge</text><text x="98" y="250" font-family="inherit" font-size="13" fill="var(--muted)">rubric score, pairwise A vs B</text><text x="424" y="238" font-family="inherit" font-size="13" fill="var(--muted)">nightly</text><rect x="80" y="282" width="330" height="66" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="98" y="310" font-family="inherit" font-size="14" fill="var(--text)">Humans and A/B</text><text x="98" y="332" font-family="inherit" font-size="13" fill="var(--muted)">review queue, live traffic split</text><text x="424" y="320" font-family="inherit" font-size="13" fill="var(--muted)">weekly</text><text x="80" y="386" font-family="inherit" font-size="13" fill="var(--muted)">Push every check as far up this ladder as it will go.</text></svg>',
        caption: {
          pl: 'Drabina ewaluacji: im wyzej, tym taniej i czesciej. Kazdy sprawdzian przesuwaj tak wysoko, jak sie da.',
          en: 'The eval ladder: the higher you go, the cheaper and more frequent. Push every check as high up as it will go.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wroc do zupy. Sa cztery sposoby, zeby sprawdzic, czy wyszla dobra, i kazdy kosztuje inaczej.</p><p>Pierwszy: patrzysz, czy w garnku w ogole jest zupa, a nie woda z makaronem. To zajmuje sekunde i nic nie kosztuje. Drugi: masz zapisany przepis babci i porownujesz, czy Twoja zupa ma te same skladniki. Tez tanie, ale trzeba miec przepis. Trzeci: prosisz kolege kucharza, zeby sprobowal i powiedzial, ktora z dwoch zup jest lepsza. Kosztuje troche czasu i kolega czasem sie myli. Czwarty: zapraszasz stu prawdziwych gosci i patrzysz, ktora zupa znika z talerzy. To najprawdziwsza odpowiedz, ale najdrozsza i najwolniejsza.</p><p>Madry kucharz uzywa wszystkich czterech, tylko w innych momentach. Pierwsze dwa przy kazdym mieszaniu lyzka, trzeci raz dziennie, czwarty raz na tydzien.</p>',
          en: '<p>Back to the soup. There are four ways to check whether it turned out well, and each costs something different.</p><p>First: you look whether there is soup in the pot at all, and not just water with noodles. That takes a second and costs nothing. Second: you have grandma\'s written recipe and you compare whether your soup has the same ingredients. Also cheap, but you need the recipe. Third: you ask a fellow cook to taste and say which of two soups is better. That costs some time and the friend is sometimes wrong. Fourth: you invite a hundred real guests and watch which soup disappears from the plates. That is the truest answer, and the most expensive and slowest one.</p><p>A smart cook uses all four, just at different moments. The first two on every stir of the spoon, the third once a day, the fourth once a week.</p>'
        },
        school: {
          pl: '<p>Ewaluacje ukladaja sie w drabinke od najtanszych do najdrozszych. Zasada jest prosta: kazdy sprawdzian przesuwaj tak wysoko, jak da rade.</p><p><strong>1. Asercje w kodzie.</strong> Zwykly kod, zero modelu, milisekundy. Czy odpowiedz to poprawny JSON. Czy przechodzi schema z zod. Czy nie zawiera numeru karty. Czy dlugosc miesci sie w limicie. Czy agent wywolal narzedzie <code>get_order_status</code>, a nie <code>refund</code>. To lapie zaskakujaco duzo bledow i kosztuje dokladnie nic.</p><p><strong>2. Golden set (zestaw wzorcowy).</strong> Zapisane pary wejscie-oczekiwane wyjscie. Dziala swietnie, gdy odpowiedz jest waska: klasyfikacja intencji, ekstrakcja pola z faktury, wybor narzedzia. Porownanie moze byc dokladne albo rozmyte, na przyklad "musi zawierac numer zamowienia i slowo zwrot".</p><p><strong>3. Model jako sedzia.</strong> Gdy dobrych odpowiedzi jest wiele, na przyklad przy podsumowaniu maila, prosisz drugi model, zeby ocenil wynik wedlug rubryki albo wskazal lepsza z dwoch wersji. Tanie w porownaniu z czlowiekiem, ale ma swoje uprzedzenia (o tym w nastepnej lekcji).</p><p><strong>4. Ludzie i testy A/B.</strong> Kolejka do przegladu dla zespolu supportu, kciuki w gore i w dol od uzytkownikow, wreszcie podzial ruchu 50/50 miedzy dwie wersje promptu i porownanie tego, co naprawde Cie interesuje: liczby eskalacji do czlowieka, czasu rozwiazania, retencji.</p><p>Bardzo wazna para pojec: <strong>pairwise (porownanie parami)</strong> jest duzo latwiejsze i stabilniejsze niz ocena bezwzgledna. Zapytanie "ktora odpowiedz jest lepsza, A czy B" daje spojniejsze wyniki niz "ocen ta odpowiedz od 1 do 10", zarowno u ludzi, jak i u modeli. Dokladnie tak samo jak w code review: latwiej powiedziec, ktora z dwoch implementacji jest czystsza, niz przyznac jednej ocene 7/10.</p>',
          en: '<p>Evals form a ladder from cheapest to most expensive. The rule is simple: push every check as high up as it will go.</p><p><strong>1. Code assertions.</strong> Plain code, no model, milliseconds. Is the response valid JSON. Does it pass a zod schema. Does it contain a card number. Is the length within limits. Did the agent call <code>get_order_status</code> and not <code>refund</code>. This catches a surprising number of bugs and costs exactly nothing.</p><p><strong>2. Golden set.</strong> Saved input-to-expected-output pairs. Works great when the answer is narrow: intent classification, extracting a field from an invoice, picking a tool. The comparison can be exact or fuzzy, for example "must contain the order number and the word refund".</p><p><strong>3. LLM as judge.</strong> When many answers are good, for example when summarising an email, you ask a second model to score the output against a rubric or to pick the better of two versions. Cheap compared to a human, but it carries biases (next lesson).</p><p><strong>4. Humans and A/B tests.</strong> A review queue for the support team, thumbs up and down from users, and finally a 50/50 traffic split between two prompt versions comparing what you actually care about: escalation rate, time to resolution, retention.</p><p>One very important pair of concepts: <strong>pairwise comparison</strong> is far easier and more stable than absolute scoring. Asking "which answer is better, A or B" gives more consistent results than "rate this answer 1 to 10", both for humans and for models. Exactly like code review: it is easier to say which of two implementations is cleaner than to give one a 7 out of 10.</p>'
        },
        pro: {
          pl: '<p>W produkcji uklada sie to w piramide, ktora zna kazdy, kto pisal testy: duzo tanich na dole, malo drogich na gorze. Konkretny podzial, ktory dobrze dziala:</p><h4>Warstwa 1: deterministyczne asercje (60-70 procent przypadkow)</h4><p>Zero wywolan modelu poza samym generowaniem odpowiedzi. Walidacja zod albo JSON Schema, regexy na PII, sprawdzenie sekwencji tool calls, limity tokenow, obecnosc cytowan z retrievalu. Czas: milisekundy. Odpalane przy kazdym commicie razem z jednostkowymi.</p><h4>Warstwa 2: golden set z rozmytym dopasowaniem</h4><p>Do zadan z waskim wyjsciem uzywasz exact match albo znormalizowanego porownania. Do dluzszych tekstow: <code>ROUGE-L</code>, podobienstwo embeddingowe (cosine powyzej 0.85 wzgledem referencji) albo lista wymaganych i zakazanych fraz. Podobienstwo embeddingowe jest wygodne, ale klamie przy negacji, wiec nigdy nie uzywaj go samego do faktow.</p><h4>Warstwa 3: sedzia modelowy z rubryka</h4><p>Najlepiej pairwise wzgledem zapisanej baseline. Wynik agregujesz jako win rate: ile procent przypadkow nowa wersja wygrala z poprzednia. Koszt to zwykle sam prompt sedziego, ok. 1500 tokenow na przypadek.</p><h4>Warstwa 4: ludzie i A/B na ruchu</h4><p>Kolejka przegladowa w Langfuse albo Braintrust, gdzie annotator oznacza 30-50 sladow tygodniowo, plus eksperyment na ruchu. Pamietaj, ze do wykrycia poprawy o 2 punkty procentowe w metryce biznesowej przy bazie 20 procent potrzebujesz rzedu kilkunastu tysiecy sesji na wariant, wiec A/B to narzedzie do duzych zmian, nie do tweakow promptu.</p><pre><code>// warstwa 1 i 2 w jednym runnerze\nconst checks = {\n  schema: (o) =&gt; Reply.safeParse(o.json).success,\n  citations: (o) =&gt; o.json.citations.length &gt; 0,\n  noPii: (o) =&gt; !/\\b\\d{16}\\b/.test(o.text),\n  toolOrder: (o, c) =&gt; o.toolCalls.join("&gt;") === c.expectedTools.join("&gt;")\n};\n\nconst results = cases.map((c) =&gt; {\n  const out = run(c);\n  return Object.entries(checks)\n    .map(([name, fn]) =&gt; ({ case: c.id, name, ok: fn(out, c) }));\n});</code></pre><p>Dwie rzeczy, o ktore pytaja na rozmowach. Po pierwsze, <strong>rozdzielaj metryki na komponenty</strong>: w RAG-u recall@10 dla retrievalu, faithfulness dla generacji, end-to-end pass rate dla calosci. Po drugie, <strong>trzymaj zbior holdout</strong>: jesli caly czas dostrajasz prompt do tych samych 200 przypadkow, po miesiacu masz klasyczny overfitting do zestawu testowego. Odloz 20-30 procent przypadkow, ktorych nie ogladasz podczas iterowania, i sprawdzaj je tylko przed wydaniem.</p>',
          en: '<p>In production this stacks into a pyramid anyone who has written tests will recognise: many cheap ones at the bottom, few expensive ones at the top. A concrete split that works well:</p><h4>Layer 1: deterministic assertions (60-70 percent of checks)</h4><p>Zero model calls beyond generating the answer itself. zod or JSON Schema validation, PII regexes, tool-call sequence checks, token limits, presence of retrieval citations. Runtime: milliseconds. Run on every commit alongside unit tests.</p><h4>Layer 2: golden set with fuzzy matching</h4><p>For narrow-output tasks use exact match or normalised comparison. For longer text: <code>ROUGE-L</code>, embedding similarity (cosine above 0.85 against the reference) or a list of required and forbidden phrases. Embedding similarity is convenient but lies about negation, so never use it alone for factual claims.</p><h4>Layer 3: LLM judge with a rubric</h4><p>Preferably pairwise against a saved baseline. Aggregate the result as a win rate: what percentage of cases the new version beat the previous one. Cost is basically the judge prompt, around 1500 tokens per case.</p><h4>Layer 4: humans and A/B on traffic</h4><p>A review queue in Langfuse or Braintrust where an annotator labels 30-50 traces per week, plus a traffic experiment. Remember that detecting a 2 percentage point lift on a business metric with a 20 percent base needs on the order of tens of thousands of sessions per arm, so A/B is a tool for big changes, not prompt tweaks.</p><pre><code>// layers 1 and 2 in one runner\nconst checks = {\n  schema: (o) =&gt; Reply.safeParse(o.json).success,\n  citations: (o) =&gt; o.json.citations.length &gt; 0,\n  noPii: (o) =&gt; !/\\b\\d{16}\\b/.test(o.text),\n  toolOrder: (o, c) =&gt; o.toolCalls.join("&gt;") === c.expectedTools.join("&gt;")\n};\n\nconst results = cases.map((c) =&gt; {\n  const out = run(c);\n  return Object.entries(checks)\n    .map(([name, fn]) =&gt; ({ case: c.id, name, ok: fn(out, c) }));\n});</code></pre><p>Two things interviewers ask about. First, <strong>split metrics per component</strong>: in RAG that is recall@10 for retrieval, faithfulness for generation, end-to-end pass rate for the whole. Second, <strong>keep a holdout set</strong>: if you keep tuning the prompt against the same 200 cases, after a month you have textbook overfitting to your test set. Hold back 20-30 percent of cases you never look at while iterating and check them only before a release.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktory rodzaj sprawdzenia jest najtanszy i powinien byc uruchamiany najczesciej?',
            en: 'Which kind of check is cheapest and should run most often?'
          },
          options: [
            { pl: 'Ocena przez ludzkiego annotatora', en: 'Human annotator review' },
            { pl: 'Test A/B na ruchu produkcyjnym', en: 'An A/B test on production traffic' },
            { pl: 'Deterministyczna asercja w kodzie, np. walidacja zod', en: 'A deterministic code assertion, e.g. zod validation' },
            { pl: 'Sedzia modelowy z rubryka', en: 'An LLM judge with a rubric' }
          ],
          correct: 2,
          explain: {
            pl: 'Asercje w kodzie kosztuja milisekundy i zero tokenow, wiec mozna je odpalac przy kazdym commicie. Lapia zaskakujaco duza czesc realnych bledow.',
            en: 'Code assertions cost milliseconds and zero tokens, so they can run on every commit. They catch a surprisingly large share of real bugs.'
          }
        },
        {
          q: {
            pl: 'Dlaczego porownanie parami (A vs B) daje stabilniejsze wyniki niz ocena w skali 1-10?',
            en: 'Why does pairwise comparison (A vs B) give more stable results than a 1-10 rating?'
          },
          options: [
            { pl: 'Bo wybor lepszej z dwoch opcji nie wymaga wspolnej, ustalonej skali', en: 'Because picking the better of two does not require a shared, calibrated scale' },
            { pl: 'Bo zuzywa mniej tokenow wyjsciowych', en: 'Because it uses fewer output tokens' },
            { pl: 'Bo mozna go liczyc bez wywolania modelu', en: 'Because it can be computed without a model call' },
            { pl: 'Bo eliminuje halucynacje w odpowiedziach', en: 'Because it eliminates hallucinations in the answers' }
          ],
          correct: 0,
          explain: {
            pl: 'Skale bezwzgledne dryfuja u ludzi i u modeli: to samo "7" znaczy co innego w poniedzialek i w piatek. Porownanie wzgledne omija ten problem.',
            en: 'Absolute scales drift for humans and models alike: the same "7" means different things on Monday and Friday. A relative comparison sidesteps that.'
          }
        },
        {
          q: {
            pl: 'Sprawdzasz podobienstwo embeddingowe odpowiedzi do referencji i dostajesz cosine 0.93. Co moze byc nie tak?',
            en: 'You compare an answer to a reference by embedding similarity and get cosine 0.93. What might still be wrong?'
          },
          options: [
            { pl: 'Cosine nigdy nie przekracza 0.9, wiec wynik jest bledny', en: 'Cosine never exceeds 0.9, so the number is wrong' },
            { pl: 'Podobienstwo embeddingowe wymaga temperature 0', en: 'Embedding similarity requires temperature 0' },
            { pl: 'Embeddingi dzialaja tylko dla jezyka angielskiego', en: 'Embeddings only work for English' },
            { pl: 'Odpowiedz moze byc zaprzeczeniem referencji i wciaz miec bardzo wysokie podobienstwo', en: 'The answer may be the negation of the reference and still score very high' }
          ],
          correct: 3,
          explain: {
            pl: '"Zamowienie zostalo wyslane" i "Zamowienie nie zostalo wyslane" leza bardzo blisko w przestrzeni embeddingow. Do faktow potrzebujesz asercji lub sedziego, nie samego cosine.',
            en: '"The order shipped" and "The order did not ship" sit very close in embedding space. For factual claims you need an assertion or a judge, not cosine alone.'
          }
        },
        {
          q: {
            pl: 'Od miesiaca dostrajasz prompt do tych samych 200 przypadkow, wynik wzrosl z 74 na 93 procent, ale uzytkownicy nie zauwazyli poprawy. Najbardziej prawdopodobna przyczyna?',
            en: 'For a month you have tuned the prompt against the same 200 cases, the score went from 74 to 93 percent, but users noticed no improvement. Most likely cause?'
          },
          options: [
            { pl: 'Model dostawcy zostal po cichu podmieniony', en: 'The provider silently swapped the model' },
            { pl: 'Overfitting do zestawu ewaluacyjnego, brak zbioru holdout', en: 'Overfitting to the eval set, no holdout split' },
            { pl: 'Za niska temperature w produkcji', en: 'Temperature too low in production' },
            { pl: 'Za male okno kontekstowe', en: 'Context window too small' }
          ],
          correct: 1,
          explain: {
            pl: 'Ciagle iterowanie na tych samych przykladach to klasyczne przeuczenie na zbiorze testowym. Odloz 20-30 procent przypadkow jako holdout i ogladaj je tylko przed wydaniem.',
            en: 'Iterating forever on the same examples is textbook test-set overfitting. Hold back 20-30 percent of cases and look at them only before a release.'
          }
        }
      ]
    },

    {
      id: 'llm-as-judge',
      title: { pl: 'Model jako sedzia', en: 'LLM as judge' },
      minutes: 12,
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev3-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="16" y="30" width="150" height="60" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="91" y="56" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Question</text><text x="91" y="76" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">plus rubric</text><rect x="16" y="118" width="150" height="56" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="91" y="152" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Answer A</text><rect x="16" y="196" width="150" height="56" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="91" y="230" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Answer B</text><line x1="168" y1="60" x2="234" y2="130" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><line x1="168" y1="146" x2="234" y2="150" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><line x1="168" y1="224" x2="234" y2="176" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="240" y="110" width="160" height="90" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="320" y="145" font-family="inherit" font-size="14" fill="var(--text)" text-anchor="middle">Judge model</text><text x="320" y="168" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">reason, then</text><text x="320" y="186" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">verdict</text><line x1="402" y1="155" x2="452" y2="155" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="458" y="122" width="166" height="66" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="541" y="150" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Winner plus</text><text x="541" y="170" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">short reason</text><line x1="320" y1="202" x2="320" y2="252" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ev3-arrow)"/><rect x="150" y="258" width="340" height="60" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="320" y="284" font-family="inherit" font-size="13" fill="var(--warn)" text-anchor="middle">Biases: position, length, self-preference</text><text x="320" y="306" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">swap A and B, cap length, use a different family</text><line x1="320" y1="320" x2="320" y2="348" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev3-arrow)"/><rect x="150" y="354" width="340" height="60" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="320" y="380" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Calibrate against 100 human labels</text><text x="320" y="402" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">target agreement above 80 percent</text></svg>',
        caption: {
          pl: 'Sedzia modelowy: rubryka, uzasadnienie przed werdyktem, swiadome neutralizowanie uprzedzen i kalibracja wzgledem ocen ludzi.',
          en: 'An LLM judge: a rubric, reasoning before the verdict, deliberate bias control, and calibration against human labels.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Ta sama para odpowiedzi przechodzi przez sedziego dwa razy - zamiana miejscami obnaza position bias, a kalibracja mowi, czy w ogole warto ufac tym liczbom.',
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
              pl: 'Rubryka to cztery pytania tak/nie, nie ocena od 1 do 10. Obie odpowiedzi sa poprawne merytorycznie, roznia sie tylko dlugoscia i stylem.',
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
              pl: 'Sedzia najpierw uzasadnia, potem oglasza werdykt - odwrotna kolejnosc wyraznie obniza jakosc. Wygrywa A, z sensownym uzasadnieniem.',
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
              pl: 'Ten sam prompt, te same odpowiedzi, tylko inna kolejnosc - i werdykt sie odwraca. To position bias, wzmocniony przez dluzsza odpowiedz B.',
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
            label: { pl: 'Pomiar uprzedzen', en: 'Bias measured' },
            note: {
              pl: 'Consistency rate 0.62 oznacza, ze prawie cztery pary na dziesiec zmieniaja werdykt po zamianie. Kazda pare oceniaj w obu kolejnosciach i licz tylko zgodne.',
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
              pl: 'Dopiero zgodnosc 87 procent z ludzmi i kappa 0.71 pozwalaja uzywac sedziego jako metryki w CI. Po kazdej podmianie modelu sedziego kalibracje robisz od nowa.',
              en: 'Only 87 percent agreement with humans and a kappa of 0.71 make the judge usable as a CI metric. After every judge model swap you calibrate again from scratch.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie konkurs na najlepsze ciasto, w ktorym jurorem jest ktos, kto sam piecze ciasta. Bywa swietny, ale ma dziwne nawyki. Zawsze bardziej lubi ciasto, ktore probuje jako pierwsze. Zawsze wybiera wieksze, nawet jesli mniejsze smakuje lepiej. I podejrzanie czesto wygrywa ciasto zrobione wedlug jego wlasnego przepisu.</p><p>Da sie z nim pracowac, tylko trzeba go pilnowac. Dajesz mu kartke z dokladna lista, na co ma patrzec: czy jest sloda, czy nie jest suche, czy pachnie wanilia. Podajesz mu te same dwa ciasta drugi raz, tylko zamienione miejscami, i sprawdzasz, czy nie zmienil zdania. Raz na jakis czas dajesz mu ciasta, o ktorych juz wiesz, ktore jest lepsze, zeby sprawdzic, czy nadal ma smak.</p><p>Wtedy taki juror jest bardzo przydatny, bo moze ocenic tysiac ciast w godzine. Sto prawdziwych osob potrzebowaloby na to tygodnia.</p>',
          en: '<p>Picture a cake contest judged by someone who also bakes cakes. He can be excellent, but he has odd habits. He always likes the cake he tastes first a bit more. He always picks the bigger one, even when the smaller one tastes better. And suspiciously often the winner is the cake made from his own recipe.</p><p>You can work with him, you just have to keep an eye on him. You hand him a card with an exact list of what to look for: is it sweet enough, is it dry, does it smell of vanilla. You give him the same two cakes a second time with the positions swapped and check whether he changes his mind. Every so often you slip in cakes where you already know the better one, to check his palate is still working.</p><p>Handled that way, this judge is extremely useful, because he can score a thousand cakes in an hour. A hundred real people would need a week.</p>'
        },
        school: {
          pl: '<p>Duza czesc zadan z LLM nie ma jednej poprawnej odpowiedzi. Podsumowanie rozmowy z klientem, uprzejma odmowa, wyjasnienie bledu w kodzie: dobrych wersji sa setki. Nie porownasz tego stringiem. Ludzie potrafia to ocenic, ale sa wolni i drodzy. Rozwiazaniem posrednim jest <strong>LLM as judge (model jako sedzia)</strong>: drugi model, ktory dostaje rubryke i ocenia wynik pierwszego.</p><p>Rubryka to zwykla lista kryteriow z jasnymi progami, dokladnie jak checklista w code review. Nie "ocen jakosc", tylko:</p><pre><code>1. Czy odpowiedz odnosi sie do pytania uzytkownika? tak/nie\n2. Czy kazde twierdzenie o faktach ma cytowanie z kontekstu? tak/nie\n3. Czy ton jest uprzejmy i bez zargonu? tak/nie\n4. Czy odpowiedz obiecuje cos, czego firma nie moze spelnic? tak/nie</code></pre><p>Cztery pytania tak/nie daja duzo bardziej powtarzalny wynik niz jedna ocena od 1 do 10.</p><p>Sedzia ma trzy dobrze udokumentowane skrzywienia. <strong>Position bias</strong>: przy porownaniu dwoch odpowiedzi czesciej wybiera pierwsza. <strong>Length bias</strong>: dluzsza odpowiedz wydaje mu sie lepsza, nawet gdy jest rozwodniona. <strong>Self-preference</strong>: model chetniej nagradza teksty pisane przez siebie albo przez modele z tej samej rodziny.</p><p>Lekarstwa sa proste. Kazda pare oceniaj dwa razy, raz w kolejnosci A-B, raz B-A, i licz tylko te przypadki, gdzie werdykt sie zgadza. Trzymaj obie odpowiedzi w podobnej dlugosci albo dopisz do rubryki "dlugosc nie jest zaleta". Do oceny wynikow modelu X uzywaj sedziego z innej rodziny.</p><p>Na koniec najwazniejsze: sedziego trzeba <strong>skalibrowac</strong>. Oznacz recznie 100 przykladow, uruchom na nich sedziego i policz zgodnosc. Ponizej 80 procent zgodnosci z czlowiekiem popraw rubryke, zanim zaczniesz ufac liczbom.</p>',
          en: '<p>A large share of LLM tasks have no single correct answer. Summarising a customer conversation, a polite refusal, explaining a bug in code: there are hundreds of good versions. You cannot compare that with a string equality. Humans can judge it, but they are slow and expensive. The middle ground is <strong>LLM as judge</strong>: a second model that gets a rubric and scores the first one\'s output.</p><p>A rubric is a plain list of criteria with clear thresholds, exactly like a code review checklist. Not "rate the quality", but:</p><pre><code>1. Does the answer address the user question? yes/no\n2. Does every factual claim carry a citation from the context? yes/no\n3. Is the tone polite and jargon-free? yes/no\n4. Does the answer promise something the company cannot deliver? yes/no</code></pre><p>Four yes/no questions give a far more repeatable result than one 1-to-10 score.</p><p>Judges have three well documented biases. <strong>Position bias</strong>: when comparing two answers they pick the first one more often. <strong>Length bias</strong>: a longer answer feels better, even when it is padded. <strong>Self-preference</strong>: a model rewards text written by itself or by models from the same family.</p><p>The fixes are simple. Score every pair twice, once as A-B and once as B-A, and only count cases where the verdict agrees. Keep both answers at similar length, or add "length is not a virtue" to the rubric. To judge output from model X, use a judge from a different family.</p><p>Finally, the important part: the judge must be <strong>calibrated</strong>. Hand-label 100 examples, run the judge over them, and compute agreement. Below 80 percent agreement with humans, fix the rubric before you start trusting the numbers.</p>'
        },
        pro: {
          pl: '<p>Sedzia modelowy to nie magia, tylko kolejny model produkcyjny, ktory ma wlasne evale. Traktuj go tak samo jak reszte systemu.</p><h4>Konstrukcja promptu sedziego</h4><p>Kolejnosc ma znaczenie: najpierw kryteria, potem dane, potem prosba o krotkie uzasadnienie, dopiero na koncu werdykt w ustalonym formacie. Odwrotna kolejnosc (werdykt najpierw) wyraznie obniza jakosc, bo model traci mozliwosc "przemyslenia" przed decyzja. Wymuszaj strukture przez tool calling albo structured output, nie przez parsowanie prozy.</p><pre><code>const Verdict = z.object({\n  addresses_question: z.boolean(),\n  grounded_in_context: z.boolean(),\n  policy_violation: z.boolean(),\n  reason: z.string().max(280),\n  winner: z.enum(["A", "B", "tie"])\n});</code></pre><h4>Kontrola uprzedzen</h4><ul><li><strong>Position bias.</strong> Kazda pare puszczaj w obu kolejnosciach. Consistency rate (odsetek par, gdzie werdykt sie nie zmienil po zamianie) to sama w sobie metryka zdrowia sedziego; ponizej 0.8 rubryka jest za miekka.</li><li><strong>Length bias.</strong> Wyloguj korelacje miedzy dlugoscia odpowiedzi a wygrana. Jesli win rate rosnie liniowo z liczba tokenow, masz problem, nie sygnal.</li><li><strong>Self-preference.</strong> Nie oceniaj Claude Sonnet sedzia Claude Sonnet w ostatecznych porownaniach modeli. Do porownan wewnetrznych (prompt A vs prompt B na tym samym modelu) to mniej istotne.</li></ul><h4>Kalibracja i koszt</h4><p>Zbierz 100-200 recznie oznaczonych przykladow, licz Cohen kappa albo zwykla zgodnosc. Kappa 0.6-0.8 to poziom, przy ktorym sedzia jest uzyteczny; ponizej 0.4 mierzysz wlasny prompt sedziego, nie system. Kalibracje powtarzaj po kazdej podmianie modelu sedziego, bo <em>upgrade modelu potrafi zmienic wyniki historycznych evali</em>. Dlatego pinuj konkretna wersje modelu sedziego (na przyklad snapshot z data, a nie alias "latest") w konfiguracji evali.</p><p>Koszt: przy okolo 1200 tokenach wejscia i 200 wyjscia na ocene i cenach klasy 1 dolar za milion wejscia oraz 5 za milion wyjscia, jedna ocena kosztuje ulamek centa, a 500 ocen w obu kolejnosciach to okolo 2-3 dolarow. Do sedziego czesto wystarcza tanszy, szybki model, o ile przechodzi kalibracje.</p><p>Gdzie sedziowie zawodza: liczenie i arytmetyka, zgodnosc z dluga polityka (lepiej rozbij na osobne, waskie checki), zadania wymagajace wiedzy dziedzinowej, ktorej sedzia nie ma. Kazda taka klasa to kandydat na deterministyczna asercje albo kolejke do czlowieka. Narzedzia takie jak Langfuse i Braintrust maja gotowe wsparcie na sedziow jako "scorers" wraz z historia wynikow i kolejka do przegladu ludzkiego, wiec nie pisz tego od zera.</p>',
          en: '<p>An LLM judge is not magic, it is just another production model that needs its own evals. Treat it like the rest of the system.</p><h4>Judge prompt construction</h4><p>Order matters: criteria first, then the data, then a request for a short justification, and only at the end the verdict in a fixed format. The reverse order (verdict first) measurably degrades quality, because the model loses the chance to reason before deciding. Force the structure with tool calling or structured output, not by parsing prose.</p><pre><code>const Verdict = z.object({\n  addresses_question: z.boolean(),\n  grounded_in_context: z.boolean(),\n  policy_violation: z.boolean(),\n  reason: z.string().max(280),\n  winner: z.enum(["A", "B", "tie"])\n});</code></pre><h4>Bias control</h4><ul><li><strong>Position bias.</strong> Run every pair in both orders. The consistency rate (share of pairs whose verdict survives the swap) is itself a judge-health metric; below 0.8 your rubric is too soft.</li><li><strong>Length bias.</strong> Log the correlation between answer length and winning. If win rate climbs linearly with token count, you have a problem, not a signal.</li><li><strong>Self-preference.</strong> Do not judge Claude Sonnet output with a Claude Sonnet judge in final model comparisons. For internal comparisons (prompt A vs prompt B on the same model) it matters much less.</li></ul><h4>Calibration and cost</h4><p>Collect 100-200 hand-labelled examples and compute Cohen kappa or plain agreement. Kappa of 0.6-0.8 is the range where a judge is useful; below 0.4 you are measuring your judge prompt, not your system. Re-calibrate after every judge model swap, because <em>a model upgrade can change the results of historical evals</em>. That is why you pin a specific judge model version (a dated snapshot, not a "latest" alias) in the eval config.</p><p>Cost: at roughly 1200 input and 200 output tokens per judgement and prices around 1 dollar per million input and 5 per million output, one judgement costs a fraction of a cent, and 500 judgements in both orders lands near 2-3 dollars. A cheaper, fast model is often enough as a judge, provided it passes calibration.</p><p>Where judges fail: counting and arithmetic, compliance with a long policy document (split that into separate narrow checks), and tasks needing domain knowledge the judge does not have. Every such class is a candidate for a deterministic assertion or a human queue. Tools like Langfuse and Braintrust ship judges as first-class "scorers" with score history and a human review queue, so do not build it from scratch.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kiedy sedzia modelowy ma najwiecej sensu?',
            en: 'When does an LLM judge make the most sense?'
          },
          options: [
            { pl: 'Gdy poprawnych odpowiedzi jest wiele i nie da sie ich porownac dokladnym dopasowaniem', en: 'When many answers are correct and exact matching is impossible' },
            { pl: 'Gdy sprawdzasz, czy odpowiedz jest poprawnym JSON-em', en: 'When checking whether the answer is valid JSON' },
            { pl: 'Gdy chcesz obnizyc koszt wywolan produkcyjnych', en: 'When you want to reduce production call costs' },
            { pl: 'Gdy potrzebujesz policzyc, ile razy model uzyl narzedzia', en: 'When you need to count how many times the model used a tool' }
          ],
          correct: 0,
          explain: {
            pl: 'Do JSON-a i liczenia tool calls masz deterministyczne asercje, ktore sa darmowe i pewne. Sedzia jest dla zadan otwartych, jak podsumowania czy ton wypowiedzi.',
            en: 'JSON validity and tool-call counting have deterministic assertions that are free and certain. A judge is for open-ended tasks like summaries or tone.'
          }
        },
        {
          q: {
            pl: 'Co to jest position bias u sedziego i jak sie z nim radzisz?',
            en: 'What is position bias in a judge and how do you handle it?'
          },
          options: [
            { pl: 'Preferowanie odpowiedzi z gory kontekstu; skracasz kontekst', en: 'Preferring answers from the top of the context; you shorten the context' },
            { pl: 'Preferowanie odpowiedzi podanej jako pierwsza; oceniasz kazda pare w obu kolejnosciach', en: 'Preferring the answer presented first; you score every pair in both orders' },
            { pl: 'Preferowanie odpowiedzi w jezyku promptu; tlumaczysz wszystko na angielski', en: 'Preferring answers in the prompt language; you translate everything to English' },
            { pl: 'Preferowanie pierwszego narzedzia z listy; sortujesz narzedzia alfabetycznie', en: 'Preferring the first tool in the list; you sort tools alphabetically' }
          ],
          correct: 1,
          explain: {
            pl: 'Zamiana miejscami A i B i liczenie tylko zgodnych werdyktow neutralizuje efekt, a odsetek zgodnych par jest przy okazji dobra metryka jakosci sedziego.',
            en: 'Swapping A and B and counting only agreeing verdicts neutralises the effect, and the share of consistent pairs doubles as a judge quality metric.'
          }
        },
        {
          q: {
            pl: 'Jaka jest sensowna kolejnosc elementow w promptcie sedziego?',
            en: 'What is a sensible order of elements in a judge prompt?'
          },
          options: [
            { pl: 'Werdykt, potem kryteria, potem dane', en: 'Verdict, then criteria, then the data' },
            { pl: 'Kryteria, dane, krotkie uzasadnienie, na koncu werdykt w stalym formacie', en: 'Criteria, data, short justification, verdict last in a fixed format' },
            { pl: 'Dane, werdykt, uzasadnienie, kryteria', en: 'Data, verdict, justification, criteria' },
            { pl: 'Kolejnosc nie ma znaczenia dla wyniku', en: 'The order does not affect the result' }
          ],
          correct: 1,
          explain: {
            pl: 'Wymuszenie uzasadnienia przed werdyktem daje modelowi miejsce na rozumowanie. Werdykt na poczatku zamraza decyzje, ktora reszta tekstu tylko racjonalizuje.',
            en: 'Forcing a justification before the verdict gives the model room to reason. A verdict up front freezes a decision the rest of the text merely rationalises.'
          }
        },
        {
          q: {
            pl: 'Podniosles wersje modelu sedziego i wyniki historycznych evali sie zmienily. Najlepsza reakcja?',
            en: 'You upgraded the judge model version and historical eval scores changed. Best response?'
          },
          options: [
            { pl: 'Nadpisac stare wyniki nowymi, bo nowy sedzia jest lepszy', en: 'Overwrite the old scores, since the new judge is better' },
            { pl: 'Zignorowac, bo evale i tak sa przyblizone', en: 'Ignore it, evals are approximate anyway' },
            { pl: 'Pinowac konkretna wersje sedziego, przeliczyc baseline i powtorzyc kalibracje na oznaczonych przykladach', en: 'Pin a specific judge version, recompute the baseline and redo calibration on labelled examples' },
            { pl: 'Wrocic do oceny recznej i zrezygnowac z sedziego', en: 'Go back to manual review and drop the judge' }
          ],
          correct: 2,
          explain: {
            pl: 'Sedzia to czesc pomiaru, wiec jego wersja musi byc przypieta jak kazda inna zaleznosc. Po zmianie porownuj tylko wyniki policzone tym samym sedzia.',
            en: 'The judge is part of your instrument, so its version must be pinned like any dependency. After a change, only compare scores produced by the same judge.'
          }
        }
      ]
    },

    {
      id: 'tooling',
      title: { pl: 'Narzedzia i tracing', en: 'Tooling and tracing' },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg"><text x="16" y="28" font-family="inherit" font-size="14" fill="var(--muted)">One trace: POST /chat, 2.42 s total</text><rect x="16" y="46" width="600" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="30" y="68" font-family="inherit" font-size="13" fill="var(--text)">trace: chat.request</text><text x="520" y="68" font-family="inherit" font-size="13" fill="var(--muted)">2420 ms</text><rect x="46" y="94" width="120" height="34" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="60" y="116" font-family="inherit" font-size="13" fill="var(--text)">retrieval</text><text x="176" y="116" font-family="inherit" font-size="13" fill="var(--muted)">180 ms, 8 chunks</text><rect x="46" y="142" width="320" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="60" y="164" font-family="inherit" font-size="13" fill="var(--text)">llm call 1</text><text x="376" y="164" font-family="inherit" font-size="13" fill="var(--muted)">1120 ms, 4.1k in</text><rect x="76" y="190" width="150" height="34" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="90" y="212" font-family="inherit" font-size="13" fill="var(--text)">tool get_order</text><text x="236" y="212" font-family="inherit" font-size="13" fill="var(--muted)">240 ms, ok</text><rect x="46" y="238" width="250" height="34" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="60" y="260" font-family="inherit" font-size="13" fill="var(--text)">llm call 2</text><text x="306" y="260" font-family="inherit" font-size="13" fill="var(--muted)">820 ms, 0.4k out</text><rect x="76" y="286" width="130" height="34" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="90" y="308" font-family="inherit" font-size="13" fill="var(--err)">judge score</text><text x="216" y="308" font-family="inherit" font-size="13" fill="var(--muted)">0.42, flagged</text><line x1="16" y1="340" x2="616" y2="340" stroke="var(--border)" stroke-width="2"/><text x="16" y="366" font-family="inherit" font-size="13" fill="var(--muted)">Every span carries: input, output, tokens, cost, latency,</text><text x="16" y="386" font-family="inherit" font-size="13" fill="var(--muted)">user id, session id, prompt version.</text></svg>',
        caption: {
          pl: 'Slad (trace) jednego zapytania rozbity na spany: retrieval, wywolania modelu, narzedzia i wynik sedziego. To DevTools Network dla aplikacji LLM.',
          en: 'One request trace broken into spans: retrieval, model calls, tools and judge score. This is the Network tab for LLM apps.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Kiedy strona internetowa dziala wolno, otwierasz w przegladarce zakladke, ktora pokazuje wszystkie male poprosby, jakie strona wyslala, i ile kazda trwala. Od razu widac, ze to jedno zdjecie ladowalo szesc sekund. Bez tej zakladki mozna tylko zgadywac i patrzec w sufit.</p><p>Aplikacja z modelem AI ma dokladnie ten sam problem, tylko w srodku dzieje sie inaczej. Uzytkownik pyta o cos, program szuka w dokumentach, pyta model, model prosi o sprawdzenie zamowienia, program sprawdza, model pisze odpowiedz. Piec krokow, kazdy moze byc winowajca.</p><p>Tracing to wlasnie ta zakladka dla AI. Kazdy krok zapisuje sie sam: co dostal, co zwrocil, ile to trwalo i ile kosztowalo. Kiedy ktos napisze "bot odpowiedzial bez sensu", nie zgadujesz. Otwierasz jego rozmowe, przewijasz kroki i widzisz dokladnie ten moment, w ktorym cos poszlo nie tak.</p>',
          en: '<p>When a website feels slow you open the browser tab that lists every little request the page made and how long each took. You immediately see that one image took six seconds. Without that tab you can only guess and stare at the ceiling.</p><p>An app built on an AI model has exactly the same problem, only the insides look different. A user asks something, the program searches documents, asks the model, the model asks for an order lookup, the program looks it up, the model writes the answer. Five steps, any of them can be the culprit.</p><p>Tracing is that browser tab for AI. Every step records itself: what it received, what it returned, how long it took and what it cost. When someone writes "the bot answered nonsense", you do not guess. You open their conversation, scroll through the steps and see the exact moment things went sideways.</p>'
        },
        school: {
          pl: '<p>Aplikacja LLM to rozproszony system w miniaturze. Jedno zapytanie uzytkownika rozpada sie na retrieval, kilka wywolan modelu, wywolania narzedzi i czasem ocene sedziego. Zwykly <code>console.log</code> tego nie ogarnie, bo interesuje Cie nie pojedyncza linia, tylko cala kaskada.</p><p>Slownik jest pozyczony z OpenTelemetry i jest maly:</p><ul><li><strong>Trace (slad)</strong> to caly cykl obslugi jednego zapytania, czyli odpowiednik jednego wpisu w zakladce Network.</li><li><strong>Span</strong> to pojedynczy krok w srodku sladu: wywolanie modelu, wyszukanie w bazie wektorowej, wywolanie narzedzia. Spany zagniezdzaja sie w drzewo.</li><li><strong>Session</strong> laczy wiele sladow tego samego uzytkownika w jedna rozmowe.</li><li><strong>Score</strong> to metryka doklejona do sladu: kciuk uzytkownika, wynik sedziego, flaga od moderacji.</li></ul><p>Instrumentacja w kodzie jest zaskakujaco lekka:</p><pre><code>const trace = langfuse.trace({ name: "chat", userId, sessionId });\n\nconst span = trace.span({ name: "retrieval", input: { query } });\nconst chunks = await search(query);\nspan.end({ output: { count: chunks.length } });\n\nconst gen = trace.generation({\n  name: "answer", model: "claude-sonnet",\n  input: messages, metadata: { promptVersion: "v7" }\n});\nconst res = await callModel(messages);\ngen.end({ output: res.text, usage: res.usage });</code></pre><p>Najwazniejsze pole to <code>promptVersion</code> albo inny tag wersji. Bez niego nie odpowiesz na najczestsze pytanie w zespole: czy skoki bledow zaczely sie po naszym deployu, czy same z siebie.</p><p>Drugie zastosowanie tracingu jest jeszcze ciekawsze: prawdziwe slady z produkcji sa najlepszym zrodlem nowych przypadkow ewaluacyjnych. Widzisz zla odpowiedz, klikasz "dodaj do datasetu" i masz kolejny test regresyjny za darmo.</p>',
          en: '<p>An LLM app is a distributed system in miniature. One user request fans out into retrieval, several model calls, tool calls and sometimes a judge score. A plain <code>console.log</code> cannot cope, because what you care about is not a single line but the whole cascade.</p><p>The vocabulary is borrowed from OpenTelemetry and it is small:</p><ul><li>A <strong>trace</strong> is the full handling of one request, the equivalent of one row in the Network tab.</li><li>A <strong>span</strong> is a single step inside the trace: a model call, a vector search, a tool invocation. Spans nest into a tree.</li><li>A <strong>session</strong> groups many traces from the same user into one conversation.</li><li>A <strong>score</strong> is a metric attached to a trace: a user thumb, a judge result, a moderation flag.</li></ul><p>Instrumenting the code is surprisingly light:</p><pre><code>const trace = langfuse.trace({ name: "chat", userId, sessionId });\n\nconst span = trace.span({ name: "retrieval", input: { query } });\nconst chunks = await search(query);\nspan.end({ output: { count: chunks.length } });\n\nconst gen = trace.generation({\n  name: "answer", model: "claude-sonnet",\n  input: messages, metadata: { promptVersion: "v7" }\n});\nconst res = await callModel(messages);\ngen.end({ output: res.text, usage: res.usage });</code></pre><p>The most valuable field is <code>promptVersion</code> or any version tag. Without it you cannot answer the most common question in the team: did the error spike start after our deploy, or on its own.</p><p>The second use of tracing is even better: real production traces are the best source of new eval cases. You spot a bad answer, click "add to dataset", and you have another regression test for free.</p>'
        },
        pro: {
          pl: '<p>Obserwowalnosc dla LLM to trzy warstwy: tracing (co sie stalo w jednym zapytaniu), agregaty (jak wygladaja setki tysiecy zapytan) i datasety (skad biora sie przypadki testowe). Narzedzia roznia sie akcentem.</p><ul><li><strong>Langfuse</strong> - open source, mozliwy self-host, mocny model danych trace/span/generation/score, wersjonowanie promptow, kolejka do adnotacji ludzkiej, SDK dla TS i Pythona, natywne wsparcie OpenTelemetry. Dobry domyslny wybor, gdy chcesz trzymac dane u siebie (RODO, dane klientow).</li><li><strong>Braintrust</strong> - mocno nastawiony na eksperymenty i porownania wersji, wygodne diffy miedzy przebiegami, scorery jako kod. Swietny, gdy centrum grawitacji jest w iterowaniu nad promptami.</li><li><strong>OpenTelemetry plus istniejacy backend</strong> (Grafana Tempo, Honeycomb, Datadog) - jesli firma juz ma tracing, semantic conventions dla GenAI pozwalaja dolozyc spany LLM do tego samego widoku co reszta uslug. Atrybuty typu <code>gen_ai.request.model</code>, <code>gen_ai.usage.input_tokens</code> sa czescia konwencji.</li></ul><h4>Co koniecznie wchodzi w atrybuty spanu</h4><p>Model i jego dokladna wersja, wersja promptu, temperature, liczba tokenow wejscia i wyjscia (osobno, bo ceny sie roznia o rzad wielkosci), tokeny odczytane z cache, koszt w dolarach, latencja calkowita i TTFT, identyfikatory user i session, feature flag albo wariant eksperymentu, oraz status bledu z kodem. Bez tokenow cache nie policzysz oszczednosci z prompt cachingu, a to zwykle 50-90 procent kosztu wejscia przy dlugich systemowych promptach.</p><pre><code>// asynchroniczny eksport, nigdy nie blokuj odpowiedzi uzytkownika\nawait Promise.race([callModel(msgs), timeout(30000)]);\nqueueMicrotask(() =&gt; tracer.flush());  // fire and forget</code></pre><h4>Pulapki produkcyjne</h4><ul><li><strong>Wysylka sladow nie moze byc na sciezce krytycznej.</strong> Buforuj i wysylaj w tle; padniety kolektor nie moze wywalic odpowiedzi.</li><li><strong>PII w sladach.</strong> Slad zawiera dokladnie to, co uzytkownik napisal. Redakcja przed wyslaniem, krotka retencja (30-90 dni), kontrola dostepu. To najczestsze zaniedbanie w audytach.</li><li><strong>Koszt samego tracingu.</strong> Przy duzym ruchu sampluj: 100 procent bledow i sladow z niska ocena, 1-10 procent reszty.</li><li><strong>Kardynalnosc.</strong> Nie wrzucaj calego promptu jako etykiety metryki. Tekst do sladu, liczby do metryk.</li></ul><p>Praktyczna petla, ktora zamyka calosc: slady z niskim wynikiem sedziego albo kciukiem w dol trafiaja do kolejki przegladu, czlowiek potwierdza, przypadek laduje w datasecie ewaluacyjnym, a ten dataset jest odpalany w CI przy nastepnym PR-ze. Tak z obserwowalnosci robi sie realna poprawa jakosci, a nie tylko ladne wykresy.</p>',
          en: '<p>LLM observability has three layers: tracing (what happened in one request), aggregates (what hundreds of thousands of requests look like) and datasets (where test cases come from). The tools differ in emphasis.</p><ul><li><strong>Langfuse</strong> - open source, self-hostable, a strong trace/span/generation/score data model, prompt versioning, a human annotation queue, SDKs for TS and Python, native OpenTelemetry support. A good default when data must stay in your infrastructure (GDPR, customer data).</li><li><strong>Braintrust</strong> - heavily oriented toward experiments and version comparisons, convenient diffs between runs, scorers as code. Excellent when your centre of gravity is prompt iteration.</li><li><strong>OpenTelemetry plus an existing backend</strong> (Grafana Tempo, Honeycomb, Datadog) - if the company already has tracing, the GenAI semantic conventions let you drop LLM spans into the same view as the rest of the services. Attributes like <code>gen_ai.request.model</code> and <code>gen_ai.usage.input_tokens</code> are part of the convention.</li></ul><h4>Attributes that must be on the span</h4><p>Model and its exact version, prompt version, temperature, input and output token counts (separately, prices differ by an order of magnitude), tokens read from cache, cost in dollars, total latency and TTFT, user and session ids, feature flag or experiment arm, and the error status with code. Without cache token counts you cannot compute prompt caching savings, and those are typically 50-90 percent of input cost with long system prompts.</p><pre><code>// export asynchronously, never block the user response\nawait Promise.race([callModel(msgs), timeout(30000)]);\nqueueMicrotask(() =&gt; tracer.flush());  // fire and forget</code></pre><h4>Production pitfalls</h4><ul><li><strong>Trace shipping must not sit on the critical path.</strong> Buffer and send in the background; a dead collector must never take down a response.</li><li><strong>PII in traces.</strong> A trace contains exactly what the user typed. Redact before sending, keep retention short (30-90 days), enforce access control. This is the most common audit finding.</li><li><strong>Cost of tracing itself.</strong> At high traffic, sample: 100 percent of errors and low-scoring traces, 1-10 percent of the rest.</li><li><strong>Cardinality.</strong> Do not put the whole prompt in a metric label. Text belongs in traces, numbers in metrics.</li></ul><p>The loop that closes it all: traces with a low judge score or a thumbs down go to a review queue, a human confirms, the case lands in the eval dataset, and that dataset runs in CI on the next PR. That is how observability turns into real quality improvement instead of pretty dashboards.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co odpowiada "spanowi" w analogii do zakladki Network w DevTools?',
            en: 'What corresponds to a "span" in the DevTools Network tab analogy?'
          },
          options: [
            { pl: 'Cala sesja przegladania strony', en: 'The entire browsing session' },
            { pl: 'Ustawienie throttlingu sieci', en: 'The network throttling setting' },
            { pl: 'Zakladka Console z bledami', en: 'The Console tab with errors' },
            { pl: 'Pojedynczy wiersz zapytania z jego czasem trwania', en: 'A single request row with its duration' }
          ],
          correct: 3,
          explain: {
            pl: 'Slad to caly zestaw krokow dla jednego zapytania uzytkownika, a span to pojedynczy krok w srodku, np. wywolanie modelu albo wyszukanie w bazie wektorowej.',
            en: 'A trace is the whole set of steps for one user request; a span is a single step inside it, such as a model call or a vector search.'
          }
        },
        {
          q: {
            pl: 'Ktore pole w atrybutach sladu najszybciej odpowie na pytanie "czy to nasz deploy zepsul jakosc"?',
            en: 'Which trace attribute answers "did our deploy break quality" fastest?'
          },
          options: [
            { pl: 'Identyfikator sesji', en: 'Session id' },
            { pl: 'Wersja promptu albo tag wydania', en: 'Prompt version or release tag' },
            { pl: 'Liczba chunkow z retrievalu', en: 'Number of retrieved chunks' },
            { pl: 'Kraj uzytkownika', en: 'User country' }
          ],
          correct: 1,
          explain: {
            pl: 'Bez wersji promptu wykres bledow jest tylko krzywa. Z wersja mozesz naniesc granice deployu i od razu zobaczyc, czy skok pokrywa sie ze zmiana.',
            en: 'Without a prompt version the error chart is just a curve. With it you can overlay deploy boundaries and see at once whether the spike lines up with a change.'
          }
        },
        {
          q: {
            pl: 'Dlaczego wysylka sladow powinna byc asynchroniczna i buforowana?',
            en: 'Why should trace shipping be asynchronous and buffered?'
          },
          options: [
            { pl: 'Bo inaczej slady traca kolejnosc chronologiczna', en: 'Otherwise traces lose chronological order' },
            { pl: 'Bo synchroniczna wysylka nie obsluguje zagniezdzonych spanow', en: 'Because synchronous shipping cannot handle nested spans' },
            { pl: 'Bo awaria kolektora nie moze wywrocic odpowiedzi uzytkownika', en: 'Because a collector outage must not take down the user response' },
            { pl: 'Bo dostawcy modeli blokuja synchroniczne requesty poboczne', en: 'Because model providers block synchronous side requests' }
          ],
          correct: 2,
          explain: {
            pl: 'Obserwowalnosc jest funkcja pomocnicza. Jesli lezy na sciezce krytycznej, wprowadza nowy punkt awarii do glownego przeplywu produktu.',
            en: 'Observability is a support function. On the critical path it introduces a new failure point into the main product flow.'
          }
        },
        {
          q: {
            pl: 'Masz 3 miliony zapytan miesiecznie i budzet na obserwowalnosc. Najrozsadniejsza strategia samplowania?',
            en: 'You have 3 million requests a month and an observability budget. Most sensible sampling strategy?'
          },
          options: [
            { pl: 'Losowe 1 procent wszystkich sladow, bez wyjatkow', en: 'A flat random 1 percent of all traces, no exceptions' },
            { pl: 'Zapisywac tylko slady szybsze niz mediana, zeby miec czyste dane', en: 'Keep only traces faster than the median, for cleaner data' },
            { pl: 'Zapisywac wszystko przez 3 dni w miesiacu', en: 'Keep everything for 3 days a month' },
            { pl: '100 procent bledow i sladow z niska ocena, plus kilka procent reszty', en: '100 percent of errors and low-scoring traces, plus a few percent of the rest' }
          ],
          correct: 3,
          explain: {
            pl: 'Rzadkie, zle przypadki maja najwieksza wartosc diagnostyczna i to one zasilaja dataset ewaluacyjny. Rownomierne 1 procent zgubi wlasnie te, ktore chcesz zobaczyc.',
            en: 'Rare bad cases carry the most diagnostic value and they feed the eval dataset. A flat 1 percent throws away exactly the ones you want to see.'
          }
        }
      ]
    },

    {
      id: 'ci-regression',
      title: { pl: 'Ewaluacje w CI i monitoring produkcji', en: 'Evals in CI and production monitoring' },
      minutes: 11,
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ev5-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs><rect x="16" y="36" width="130" height="58" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/><text x="81" y="70" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">PR opened</text><line x1="148" y1="65" x2="176" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="180" y="36" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="255" y="62" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Eval suite</text><text x="255" y="82" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">250 cases, 6 min</text><line x1="332" y1="65" x2="360" y2="65" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="364" y="36" width="140" height="58" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="434" y="62" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Gate: score</text><text x="434" y="82" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">vs baseline</text><line x1="506" y1="55" x2="546" y2="55" stroke="var(--ok)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="512" y="44" font-family="inherit" font-size="13" fill="var(--ok)">pass</text><rect x="530" y="66" width="94" height="46" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="577" y="94" font-family="inherit" font-size="13" fill="var(--ok)" text-anchor="middle">Deploy</text><line x1="434" y1="96" x2="434" y2="140" stroke="var(--err)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="444" y="122" font-family="inherit" font-size="13" fill="var(--err)">drop &gt; 3 pts</text><rect x="364" y="146" width="140" height="46" rx="10" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="434" y="174" font-family="inherit" font-size="13" fill="var(--err)" text-anchor="middle">Block merge</text><line x1="16" y1="230" x2="624" y2="230" stroke="var(--border)" stroke-width="2"/><text x="16" y="262" font-family="inherit" font-size="14" fill="var(--muted)">Production loop</text><rect x="16" y="280" width="140" height="58" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><text x="86" y="314" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Live traces</text><line x1="158" y1="309" x2="186" y2="309" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="190" y="280" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="265" y="306" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Nightly judge</text><text x="265" y="326" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">on 2 pct sample</text><line x1="342" y1="309" x2="370" y2="309" stroke="var(--muted)" stroke-width="2" marker-end="url(#ev5-arrow)"/><rect x="374" y="280" width="150" height="58" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/><text x="449" y="306" font-family="inherit" font-size="13" fill="var(--text)" text-anchor="middle">Alert on drift</text><text x="449" y="326" font-family="inherit" font-size="13" fill="var(--muted)" text-anchor="middle">quality and cost</text><path d="M449 342 L449 380 L265 380 L265 348" fill="none" stroke="var(--accent2)" stroke-width="2" marker-end="url(#ev5-arrow)"/><text x="230" y="404" font-family="inherit" font-size="13" fill="var(--accent2)">bad cases go back into the eval dataset</text></svg>',
        caption: {
          pl: 'Zamknieta petla: bramka ewaluacyjna na PR, nocny sedzia na probce ruchu, alerty na dryf, a zle przypadki wracaja do zestawu testowego.',
          en: 'The closed loop: an eval gate on the PR, a nightly judge on a traffic sample, drift alerts, and bad cases feeding back into the test set.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jeden pull request przechodzi przez bramke ewaluacyjna: od uruchomienia zestawu, przez spadek wyniku i zablokowany merge, po poprawke i nowe przypadki testowe.',
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
              pl: 'Zmiana promptu wyglada niewinnie i przechodzi code review. Bramka ewaluacyjna startuje automatycznie, tak samo jak testy jednostkowe.',
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
            label: { pl: 'Zestaw sie liczy', en: 'Suite running' },
            note: {
              pl: 'Zestaw idzie przez 250 przypadkow: najpierw tanie asercje kodowe, potem sedzia modelowy na zadaniach otwartych. Merge jest zablokowany, dopoki check nie skonczy.',
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
            label: { pl: 'Porownanie z baseline', en: 'Compared to baseline' },
            note: {
              pl: 'Bramka nie patrzy na sam wynik, tylko na roznice wobec main. Spadek 3.9 punktu przy dozwolonym 1.0 to regresja, nie szum.',
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
              pl: 'Bramka pokazuje nie tylko liczbe, ale konkretne przypadki, ktore sie zepsuly, z linkiem do trace. To roznica miedzy alarmem a zgloszeniem bledu.',
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
              pl: 'Zepsute przypadki trafiaja na stale do zestawu, a wynik po poprawce staje sie nowa baseline. Kazda zlapana regresja trwale podnosi poprzeczke.',
              en: 'The broken cases join the golden set permanently and the passing score becomes the new baseline. Every caught regression raises the bar for good.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>W dobrej restauracji nikt nie wynosi talerza na sale, dopoki szef kuchni na niego nie spojrzy. To jest bramka: jesli danie wyglada zle, wraca do kuchni i nie trafia do gosci. Nikt sie nie obraza, taka jest zasada.</p><p>Ale to nie koniec. Nawet po wyjsciu na sale ktos chodzi miedzy stolikami i patrzy, ile jedzenia zostaje na talerzach. Jesli nagle polowa gosci zostawia zupe, cos sie zmienilo: moze dostawca przyslal inna smietane, moze nowy kucharz sypie wiecej soli. Nikt tego nie zmienil w przepisie, a mimo to zrobilo sie gorzej.</p><p>Tak samo dziala dobra aplikacja z AI. Zanim zmiana pojdzie do ludzi, przechodzi przez bramke z zapisanymi przykladami. A potem, juz na zywo, ktos caly czas sprawdza probki i dzwoni alarm, gdy jakosc cicho spada. Talerze, ktore wrocily pelne, laduja na liscie rzeczy do sprawdzenia nastepnym razem.</p>',
          en: '<p>In a good restaurant nobody carries a plate to the dining room until the head chef has looked at it. That is the gate: if the dish looks wrong it goes back to the kitchen and never reaches a guest. Nobody takes offence, that is just the rule.</p><p>But it does not end there. Even after the plates go out, someone walks between the tables watching how much food comes back. If half the guests suddenly leave their soup, something changed: maybe the supplier sent different cream, maybe the new cook is heavier with the salt. Nobody edited the recipe, and yet it got worse.</p><p>A good AI app works the same way. Before a change reaches people it passes a gate made of saved examples. Then, once it is live, someone keeps checking samples and raises an alarm when quality quietly slips. The plates that came back full go onto the list of things to check next time.</p>'
        },
        school: {
          pl: '<p>Znasz to z frontendu: PR nie da sie zmergowac, dopoki nie przejda testy i lint. Przy aplikacjach LLM robisz dokladnie to samo, tylko zamiast asercji na funkcje masz zestaw ewaluacyjny.</p><p>Praktyczny podzial na dwa biegi. <strong>Szybki</strong>, na kazdy PR: 50-100 przypadkow, same deterministyczne asercje i golden set, ponizej pieciu minut, blokuje merge. <strong>Pelny</strong>, nocny albo na branchu release: kilkaset przypadkow razem z sedzia modelowym, wolniejszy i drozszy, raportuje wynik na Slacka.</p><p>Bramka nie moze byc sztywnym progiem w stylu "musi byc 95 procent", bo taki prog albo zablokuje wszystko, albo nic. Porownuj do baseline z main:</p><pre><code># .github/workflows/evals.yml (fragment)\n- run: node evals/run.js --suite fast --out result.json\n- run: node evals/compare.js result.json baseline.json --max-drop 3\n</code></pre><p>Zasada: spadek wiekszy niz 3 punkty procentowe wzgledem main blokuje merge. Poprawa aktualizuje baseline po merge. Dodatkowo warto miec liste przypadkow krytycznych (na przyklad "nigdy nie obiecuj zwrotu pieniedzy poza polityka"), gdzie kazda porazka blokuje niezaleznie od sredniej.</p><p>Druga polowa historii dzieje sie juz po deployu. Model po Twojej stronie sie nie zmienia, ale zmienia sie wszystko dookola: uzytkownicy zaczynaja pytac o nowe rzeczy, dokumenty w bazie wiedzy sie starzeja, dostawca podnosi wersje modelu. To jest <strong>drift</strong>. Wykrywasz go, puszczajac nocnego sedziego na losowej probce, na przyklad 2 procentach ruchu, i alarmujac, gdy srednia ocena spadnie o wiecej niz ustalony prog przez dwa dni z rzedu.</p><p>Do tego dorzuc monitoring kosztu na sesje. Zmiana promptu, ktora niepostrzezenie dodaje 2000 tokenow kontekstu do kazdego zapytania, nie zepsuje jakosci, ale potroji rachunek.</p>',
          en: '<p>You know this from frontend: a PR cannot merge until tests and lint pass. With LLM apps you do exactly the same, only instead of assertions on functions you have an eval suite.</p><p>A practical split into two runs. A <strong>fast</strong> one on every PR: 50-100 cases, deterministic assertions and golden set only, under five minutes, blocks the merge. A <strong>full</strong> one nightly or on the release branch: several hundred cases including the LLM judge, slower and pricier, posting the result to Slack.</p><p>The gate must not be a hard threshold like "must be 95 percent", because such a threshold either blocks everything or nothing. Compare against the baseline from main:</p><pre><code># .github/workflows/evals.yml (excerpt)\n- run: node evals/run.js --suite fast --out result.json\n- run: node evals/compare.js result.json baseline.json --max-drop 3\n</code></pre><p>The rule: a drop of more than 3 percentage points against main blocks the merge. An improvement updates the baseline after merge. On top of that, keep a list of critical cases (for example "never promise a refund outside policy") where a single failure blocks regardless of the average.</p><p>The second half of the story happens after deploy. The model on your side does not change, but everything around it does: users start asking about new things, knowledge base documents go stale, the provider bumps the model version. That is <strong>drift</strong>. You detect it by running a nightly judge over a random sample, say 2 percent of traffic, and alerting when the mean score falls by more than a set threshold two days in a row.</p><p>Add cost per session to the monitoring. A prompt change that quietly adds 2000 context tokens to every request will not hurt quality, but it will triple the bill.</p>'
        },
        pro: {
          pl: '<p>Cel jest prosty: zmiana promptu ma miec taki sam ceremonial jak zmiana kodu. Ten sam PR, ten sam review, ta sama bramka, ten sam rollback.</p><h4>Pipeline</h4><ul><li><strong>Pre-merge, szybki.</strong> 50-150 przypadkow, wylacznie deterministyczne checki i golden set. Cel: ponizej 5 minut i ponizej 1 dolara. Odpalany na kazdym PR-ze, ktory dotyka promptow, narzedzi, schematow albo konfiguracji retrievalu.</li><li><strong>Pre-release, pelny.</strong> 300-1000 przypadkow z sedzia, nocny cron. Cel: ponizej 30 minut, kilka do kilkunastu dolarow. Wynik jako komentarz w PR-ze i wiadomosc na Slacku z linkiem do przebiegu w Langfuse albo Braintrust.</li><li><strong>Post-deploy, canary.</strong> 5 procent ruchu przez godzine, porownanie online metryk (rate eskalacji, thumbs down, dlugosc sesji) przed pelnym rolloutem.</li></ul><h4>Projekt bramki</h4><p>Regresja wzgledna, nie prog bezwzgledny. Trzy warunki blokujace:</p><pre><code>const fail =\n  result.passRate &lt; baseline.passRate - 0.03 ||   // spadek 3 pkt proc.\n  result.criticalFailures &gt; 0 ||                  // twarde must-not\n  result.p95LatencyMs &gt; baseline.p95LatencyMs * 1.3;\n\nprocess.exit(fail ? 1 : 0);</code></pre><p>Wazny detal: evale sa niedeterministyczne, wiec flaky CI to realne ryzyko. Ustaw <code>seed</code>, gdzie sie da, cachuj odpowiedzi dla niezmienionych przypadkow, i przy wyniku w waskim pasie niepewnosci (na przyklad spadek 1-3 pkt) odpalaj automatyczny drugi przebieg zamiast od razu blokowac. Inaczej zespol nauczy sie klikac "merge anyway" i bramka przestanie cokolwiek znaczyc.</p><h4>Produkcja</h4><p>Trzy rzeczy monitoruj na stale: <strong>jakosc</strong> (srednia ocena sedziego na probce 1-5 procent, thumbs down rate, rate eskalacji do czlowieka), <strong>koszt</strong> (dolary na sesje, tokeny wejscia i wyjscia osobno, hit rate prompt cache) i <strong>niezawodnosc</strong> (rate bledow 429 i 529, p95 TTFT, odsetek niepoprawnych tool callow).</p><p>Alerty ustawiaj na trendy, nie na pojedyncze punkty: srednia ruchoma z 24 godzin ponizej progu przez dwa okna. Pojedynczy zly dzien to zwykle jeden uzytkownik robiacy dziwne rzeczy.</p><p>Osobna sprawa to <strong>model deprecation</strong>. Dostawcy wycofuja snapshoty w cyklu kilku-kilkunastu miesiecy, a alias typu "latest" potrafi zmienic zachowanie z dnia na dzien. Pinuj konkretne wersje w konfiguracji, trzymaj w evalach macierz "aktualny model vs kandydat" i traktuj podniesienie wersji jak zwykla zmiane wymagajaca zielonej bramki. To dokladnie ta sama dyscyplina co pinowanie wersji zaleznosci w <code>package-lock.json</code>, tylko konsekwencje sa mniej widoczne i przez to grozniejsze.</p>',
          en: '<p>The goal is simple: a prompt change should carry the same ceremony as a code change. Same PR, same review, same gate, same rollback.</p><h4>The pipeline</h4><ul><li><strong>Pre-merge, fast.</strong> 50-150 cases, deterministic checks and golden set only. Target: under 5 minutes and under 1 dollar. Runs on every PR touching prompts, tools, schemas or retrieval config.</li><li><strong>Pre-release, full.</strong> 300-1000 cases including the judge, nightly cron. Target: under 30 minutes and a few to a few dozen dollars. Result posted as a PR comment and a Slack message linking to the run in Langfuse or Braintrust.</li><li><strong>Post-deploy, canary.</strong> 5 percent of traffic for an hour, comparing online metrics (escalation rate, thumbs down, session length) before the full rollout.</li></ul><h4>Gate design</h4><p>Relative regression, not an absolute threshold. Three blocking conditions:</p><pre><code>const fail =\n  result.passRate &lt; baseline.passRate - 0.03 ||   // 3 point drop\n  result.criticalFailures &gt; 0 ||                  // hard must-nots\n  result.p95LatencyMs &gt; baseline.p95LatencyMs * 1.3;\n\nprocess.exit(fail ? 1 : 0);</code></pre><p>An important detail: evals are non-deterministic, so flaky CI is a real risk. Set a <code>seed</code> where you can, cache responses for unchanged cases, and when the result lands in a narrow uncertainty band (say a 1-3 point drop) trigger an automatic second run instead of blocking immediately. Otherwise the team learns to click "merge anyway" and the gate stops meaning anything.</p><h4>Production</h4><p>Monitor three things continuously: <strong>quality</strong> (mean judge score on a 1-5 percent sample, thumbs-down rate, human escalation rate), <strong>cost</strong> (dollars per session, input and output tokens separately, prompt cache hit rate) and <strong>reliability</strong> (429 and 529 error rates, p95 TTFT, share of malformed tool calls).</p><p>Alert on trends, not single points: a 24-hour moving average below threshold for two consecutive windows. A single bad day is usually one user doing something odd.</p><p>A separate topic is <strong>model deprecation</strong>. Providers retire snapshots on a cycle of several months to a bit over a year, and a "latest" alias can shift behaviour overnight. Pin concrete versions in config, keep a "current model vs candidate" matrix in your evals, and treat a version bump as an ordinary change that needs a green gate. This is exactly the discipline of pinning dependency versions in <code>package-lock.json</code>, except the consequences are less visible and therefore more dangerous.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaki jest najlepszy odpowiednik "testow blokujacych merge" dla zmian w promptach?',
            en: 'What is the best equivalent of "tests that block a merge" for prompt changes?'
          },
          options: [
            { pl: 'Reczne sprawdzenie przez autora przed pushem', en: 'A manual check by the author before pushing' },
            { pl: 'Szybki zestaw ewaluacyjny w CI porownywany do baseline z main', en: 'A fast eval suite in CI compared against the baseline from main' },
            { pl: 'Code review bez uruchamiania modelu', en: 'Code review without running the model' },
            { pl: 'Monitoring produkcyjny po wdrozeniu', en: 'Production monitoring after the deploy' }
          ],
          correct: 1,
          explain: {
            pl: 'Zmiana promptu to zmiana zachowania systemu, wiec zasluguje na te sama bramke co zmiana kodu. Porownanie do baseline dziala lepiej niz sztywny prog.',
            en: 'A prompt change is a behaviour change, so it deserves the same gate as a code change. Comparing against a baseline works better than a fixed threshold.'
          }
        },
        {
          q: {
            pl: 'Dlaczego bramka "wynik musi byc co najmniej 95 procent" jest gorsza niz "spadek wzgledem main nie wiekszy niz 3 punkty"?',
            en: 'Why is a "score must be at least 95 percent" gate worse than "no more than a 3 point drop versus main"?'
          },
          options: [
            { pl: 'Bo prog bezwzgledny wymaga wiekszego zestawu testowego', en: 'Because an absolute threshold requires a bigger test set' },
            { pl: 'Bo prog wzgledny jest tanszy do policzenia', en: 'Because a relative threshold is cheaper to compute' },
            { pl: 'Bo prog bezwzgledny albo blokuje wszystko, albo nic, i nie wykrywa regresji', en: 'Because an absolute threshold either blocks everything or nothing, and detects no regressions' },
            { pl: 'Bo prog wzgledny dziala tez dla sedziego modelowego', en: 'Because a relative threshold also works for an LLM judge' }
          ],
          correct: 2,
          explain: {
            pl: 'Prog bezwzgledny nie zauwazy spadku z 99 na 96 procent, choc to realna regresja, a jednoczesnie zablokuje kazda prace przy zestawie, ktory z natury siedzi na 88 procentach.',
            en: 'An absolute threshold misses a drop from 99 to 96 percent, which is a real regression, while blocking all work on a suite that naturally sits at 88 percent.'
          }
        },
        {
          q: {
            pl: 'Co to jest drift jakosci na produkcji, jesli Twoj kod i prompt sie nie zmienily?',
            en: 'What is production quality drift when your code and prompt have not changed?'
          },
          options: [
            { pl: 'Spadek jakosci wywolany zmianami wokol modelu: nowe pytania uzytkownikow, stare dokumenty, nowa wersja modelu dostawcy', en: 'A quality drop caused by changes around the model: new user questions, stale documents, a new provider model version' },
            { pl: 'Wzrost latencji spowodowany geografia uzytkownikow', en: 'Latency growth caused by user geography' },
            { pl: 'Utrata sladow przy przepelnieniu bufora kolektora', en: 'Trace loss when the collector buffer overflows' },
            { pl: 'Blad zaokraglenia przy sumowaniu kosztow tokenow', en: 'A rounding error when summing token costs' }
          ],
          correct: 0,
          explain: {
            pl: 'Dlatego alias typu "latest" jest niebezpieczny: dostawca moze podmienic model, a Twoja jakosc zmieni sie bez zadnego deployu po Twojej stronie.',
            en: 'That is why a "latest" alias is dangerous: the provider can swap the model and your quality shifts with no deploy on your side.'
          }
        },
        {
          q: {
            pl: 'Bramka ewaluacyjna zaczyna byc flaky: mniej wiecej co czwarty PR blokuje sie na spadku 1-2 punktow, ktory po ponownym uruchomieniu znika. Najlepsza reakcja?',
            en: 'Your eval gate turns flaky: roughly every fourth PR blocks on a 1-2 point drop that disappears on re-run. Best response?'
          },
          options: [
            { pl: 'Podniesc dopuszczalny spadek do 15 punktow, zeby CI przestalo przeszkadzac', en: 'Raise the allowed drop to 15 points so CI stops getting in the way' },
            { pl: 'Wylaczyc bramke i polegac na monitoringu produkcyjnym', en: 'Turn the gate off and rely on production monitoring' },
            { pl: 'Kazac zespolowi klikac merge anyway, gdy zna zmiane', en: 'Tell the team to click merge anyway when they know the change' },
            { pl: 'Powiekszyc zestaw, cachowac niezmienione przypadki i automatycznie powtarzac przebieg w waskim pasie niepewnosci', en: 'Grow the set, cache unchanged cases and auto-rerun when the result lands in a narrow uncertainty band' }
          ],
          correct: 3,
          explain: {
            pl: 'Zrodlem problemu jest wariancja pomiaru, wiec leczysz pomiar, a nie prog. Rozluznienie bramki albo uczenie zespolu jej omijania kasuje cala jej wartosc.',
            en: 'The root cause is measurement variance, so you fix the measurement, not the threshold. Loosening the gate or teaching the team to bypass it destroys all of its value.'
          }
        }
      ]
    }
  ]
};
