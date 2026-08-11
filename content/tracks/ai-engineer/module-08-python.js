export default {
  id: 'python-for-ai',
  order: 8,
  icon: '🐍',
  title: {
    pl: 'Python dla inżynierów AI',
    en: 'Python for AI Engineers'
  },
  description: {
    pl: 'Tyle Pythona, ile trzeba, żeby czytać cudzy kod AI, uruchamiać skrypty i pisać własne narzędzia - wszystko tłumaczone na TypeScript, npm i zod.',
    en: 'Exactly as much Python as you need to read other people AI code, run scripts and write your own tools - all mapped onto TypeScript, npm and zod.'
  },
  lessons: [
    {
      id: 'reading-python',
      title: {
        pl: 'Czytanie Pythona okiem TypeScriptowca',
        en: 'Reading Python with TypeScript eyes'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="140" y="26" text-anchor="middle" font-size="16" fill="var(--accent)">TypeScript</text>' +
          '<text x="500" y="26" text-anchor="middle" font-size="16" fill="var(--accent2)">Python</text>' +
          '<defs><marker id="p8a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<g stroke="var(--border)" stroke-width="2" fill="var(--surface)">' +
          '<rect x="20" y="50" width="240" height="44" rx="10"/><rect x="380" y="50" width="240" height="44" rx="10"/>' +
          '<rect x="20" y="118" width="240" height="44" rx="10"/><rect x="380" y="118" width="240" height="44" rx="10"/>' +
          '<rect x="20" y="186" width="240" height="44" rx="10"/><rect x="380" y="186" width="240" height="44" rx="10"/>' +
          '<rect x="20" y="254" width="240" height="44" rx="10"/><rect x="380" y="254" width="240" height="44" rx="10"/>' +
          '<rect x="20" y="322" width="240" height="44" rx="10"/><rect x="380" y="322" width="240" height="44" rx="10"/>' +
          '</g>' +
          '<g font-size="14" fill="var(--text)" text-anchor="middle">' +
          '<text x="140" y="78">const o = { a: 1 }</text><text x="500" y="78">o = { "a": 1 }</text>' +
          '<text x="140" y="146">xs.map(f)</text><text x="500" y="146">[f(x) for x in xs]</text>' +
          '<text x="140" y="214">interface User</text><text x="500" y="214">class User(BaseModel)</text>' +
          '<text x="140" y="282">@decorator</text><text x="500" y="282">@decorator</text>' +
          '<text x="140" y="350">obj.toString()</text><text x="500" y="350">def __str__(self)</text>' +
          '</g>' +
          '<g stroke="var(--muted)" stroke-width="2" marker-end="url(#p8a1)">' +
          '<line x1="268" y1="72" x2="370" y2="72"/><line x1="268" y1="140" x2="370" y2="140"/>' +
          '<line x1="268" y1="208" x2="370" y2="208"/><line x1="268" y1="276" x2="370" y2="276"/>' +
          '<line x1="268" y1="344" x2="370" y2="344"/>' +
          '</g></svg>',
        caption: {
          pl: 'Pięć konstrukcji, które widzisz w każdym pliku Pythona, i ich odpowiedniki w TypeScripcie.',
          en: 'Five constructs you see in every Python file and their TypeScript counterparts.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że przeprowadzasz się do sąsiedniego miasta. Ludzie mówią tym samym językiem, jedzą to samo śniadanie i chodzą do pracy tak samo jak Ty. Tylko akcent jest inny i klamry przy drzwiach zastąpili wcięciami w chodniku.</p><p>Python to właśnie takie miasto. Wszystko, co umiesz robić w JavaScripcie, robi się tutaj tak samo: masz listy rzeczy, masz pudełka z etykietami (słowniki), masz funkcje, masz pętle. Zmienia się głównie interpunkcja - zamiast klamerek Python patrzy na to, jak daleko od lewej krawędzi zaczyna się linijka. Wcięcie to zdanie podrzędne.</p><p>Dobra wiadomość: nie musisz się uczyć Pythona jak nowego języka. Musisz się nauczyć rozpoznawać, że to ten sam pomysł w innym stroju. Kiedy zobaczysz coś w nawiasach kwadratowych z wyrazem "for" w środku, powiedz sobie: aha, to jest mapowanie listy. I to naprawdę wystarczy na start.</p>',
          en: '<p>Imagine moving to the town next door. People speak the same language, eat the same breakfast and go to work the same way you do. Only the accent is different, and they replaced the curly braces on the doors with dents in the pavement.</p><p>Python is that town. Everything you can do in JavaScript works the same way here: you have lists of things, boxes with labels (dictionaries), functions and loops. Mostly the punctuation changes - instead of braces, Python looks at how far from the left edge a line starts. Indentation is the subordinate clause.</p><p>The good news: you do not have to learn Python like a brand new language. You have to learn to recognise that it is the same idea wearing a different outfit. When you see something in square brackets with the word "for" inside, tell yourself: aha, that is a list being mapped. Honestly, that gets you surprisingly far.</p>'
        },
        school: {
          pl: '<p>Python i TypeScript to dwa dialekty tej samej rodziny: dynamiczne obiekty, funkcje pierwszej klasy, moduły. Różnice, które faktycznie zatrzymują czytanie, można policzyć na palcach.</p><h4>Wcięcia zamiast klamer</h4><p>Blok kodu to linie o większym wcięciu. Dwukropek na końcu linii to odpowiednik otwierającej klamry. Nie ma średników.</p><pre><code>if score &gt; 0.75:\n    print("done")\nelse:\n    print("retry")</code></pre><h4>Słownik to obiekt</h4><p>Odpowiednikiem obiektu JS jest <code>dict</code>. Klucze są jawnymi stringami, dostęp przez nawiasy: <code>cfg["model"]</code>. Kropką sięgasz do atrybutów klasy, nie do kluczy słownika - to najczęstsza wpadka na początku.</p><h4>List comprehension zamiast map i filter</h4><p><code>[x * 2 for x in xs if x &gt; 0]</code> to dokładnie <code>xs.filter(x =&gt; x &gt; 0).map(x =&gt; x * 2)</code>. Odczytuje się od środka: najpierw for, potem if, na końcu wyrażenie po lewej.</p><h4>self, czyli jawne this</h4><p>Metody dostają pierwszy argument <code>self</code>. To to samo <code>this</code>, tylko Python nie udaje, że jest niewidzialne.</p><h4>Dekoratory</h4><p><code>@app.get("/health")</code> to funkcja wyższego rzędu owijająca funkcję poniżej - identycznie jak HOC w Reakcie albo dekoratory z NestJS.</p><h4>Dunder methods</h4><p>Metody z podwójnym podkreśleniem, jak <code>__init__</code> czy <code>__str__</code>, to protokoły języka - odpowiedniki konstruktora, <code>toString</code> i <code>Symbol.iterator</code>. Widzisz podwójny underscore, myślisz: to hak wbudowany w język, nie zwykła metoda.</p>',
          en: '<p>Python and TypeScript are two dialects of the same family: dynamic objects, first-class functions, modules. The differences that actually stop you mid-read fit on one hand.</p><h4>Indentation instead of braces</h4><p>A block is the lines indented further. The colon at the end of a line is the opening brace. There are no semicolons.</p><pre><code>if score &gt; 0.75:\n    print("done")\nelse:\n    print("retry")</code></pre><h4>A dict is an object</h4><p>The JS object equivalent is <code>dict</code>. Keys are explicit strings, access is bracketed: <code>cfg["model"]</code>. Dot access reaches class attributes, not dict keys - the single most common early stumble.</p><h4>List comprehensions instead of map and filter</h4><p><code>[x * 2 for x in xs if x &gt; 0]</code> is exactly <code>xs.filter(x =&gt; x &gt; 0).map(x =&gt; x * 2)</code>. Read it from the middle out: for first, then if, then the expression on the left.</p><h4>self, an explicit this</h4><p>Methods take <code>self</code> as their first parameter. It is the same <code>this</code>, except Python refuses to pretend it is invisible.</p><h4>Decorators</h4><p><code>@app.get("/health")</code> is a higher-order function wrapping the function below it - exactly like a React HOC or a NestJS decorator.</p><h4>Dunder methods</h4><p>Double-underscore methods like <code>__init__</code> or <code>__str__</code> are language protocols - the constructor, <code>toString</code> and <code>Symbol.iterator</code> of Python. When you see a double underscore, think: language hook, not ordinary method.</p>'
        },
        pro: {
          pl: '<p>W praktyce AI Engineera czytasz Pythona częściej, niż go piszesz: SDK Anthropica, OpenAI, LangGraph, LlamaIndex, przykłady z papierów i notebooki kolegów. Celem jest płynne skanowanie, nie biegłość.</p><h4>Mapa pojęć</h4><table><tr><th>TypeScript</th><th>Python</th></tr><tr><td>Array</td><td>list</td></tr><tr><td>Record, obiekt</td><td>dict</td></tr><tr><td>Set</td><td>set</td></tr><tr><td>readonly tuple</td><td>tuple</td></tr><tr><td>undefined / null</td><td>None</td></tr><tr><td>import x from mod</td><td>from mod import x</td></tr><tr><td>...spread</td><td>*args, **kwargs</td></tr></table><h4>Rzeczy, które zaskakują</h4><ul><li><strong>Prawda i fałsz</strong>: pusta lista, pusty string, 0 i None są falsy - jak w JS, ale <code>"0"</code> jest truthy w obu, a pusty dict jest falsy w Pythonie i truthy w JS.</li><li><strong>Mutowalny argument domyślny</strong>: <code>def f(items=[])</code> tworzy JEDNĄ listę współdzieloną między wywołaniami. Klasyczne pytanie rekrutacyjne. Poprawnie: <code>items=None</code> i przypisanie w ciele.</li><li><strong>Kopiowanie</strong>: przypisanie listy to referencja, jak w JS. <code>list(xs)</code> lub <code>xs[:]</code> to płytka kopia, <code>copy.deepcopy</code> to głęboka.</li><li><strong>f-stringi</strong>: <code>f"model={name}"</code> to template literal. W promptach częściej zobaczysz <code>textwrap.dedent</code> i potrójne cudzysłowy.</li></ul><h4>Generatory to strumienie</h4><p>Streaming z Claude API albo OpenAI API wygląda tak:</p><pre><code>with client.messages.stream(model="claude-sonnet-4-5", max_tokens=1024, messages=msgs) as stream:\n    for text in stream.text_stream:\n        sys.stdout.write(text)</code></pre><p><code>with</code> to odpowiednik <code>try/finally</code> z gwarantowanym zamknięciem zasobu - jak <code>using</code> w TC39 albo ręczne <code>reader.releaseLock()</code>. Pętla <code>for</code> po generatorze to <code>for await</code> po ReadableStream.</p><h4>Na rozmowie</h4><p>Nikt nie każe Ci pisać algorytmów w Pythonie. Padnie natomiast: pokaż, że umiesz przeczytać cudzy pipeline i powiedzieć, gdzie jest błąd. Umiejętność wskazania mutowalnego defaultu, przecieku referencji albo pętli, która buduje listę zamiast generatora przy 200 tysiącach chunków, robi lepsze wrażenie niż deklamowanie składni.</p>',
          en: '<p>As an AI engineer you read Python far more than you write it: the Anthropic and OpenAI SDKs, LangGraph, LlamaIndex, paper repos and your colleagues notebooks. The goal is fluent scanning, not fluency.</p><h4>Concept map</h4><table><tr><th>TypeScript</th><th>Python</th></tr><tr><td>Array</td><td>list</td></tr><tr><td>Record, object</td><td>dict</td></tr><tr><td>Set</td><td>set</td></tr><tr><td>readonly tuple</td><td>tuple</td></tr><tr><td>undefined / null</td><td>None</td></tr><tr><td>import x from mod</td><td>from mod import x</td></tr><tr><td>...spread</td><td>*args, **kwargs</td></tr></table><h4>Things that surprise you</h4><ul><li><strong>Truthiness</strong>: empty list, empty string, 0 and None are falsy - much like JS, except an empty dict is falsy in Python and truthy in JS.</li><li><strong>Mutable default argument</strong>: <code>def f(items=[])</code> creates ONE list shared across all calls. A classic interview question. Correct form: <code>items=None</code> plus assignment in the body.</li><li><strong>Copying</strong>: assigning a list copies the reference, same as JS. <code>list(xs)</code> or <code>xs[:]</code> is a shallow copy, <code>copy.deepcopy</code> is deep.</li><li><strong>f-strings</strong>: <code>f"model={name}"</code> is a template literal. In prompt code you will more often see triple quotes plus <code>textwrap.dedent</code>.</li></ul><h4>Generators are streams</h4><p>Streaming from the Claude API or the OpenAI API looks like this:</p><pre><code>with client.messages.stream(model="claude-sonnet-4-5", max_tokens=1024, messages=msgs) as stream:\n    for text in stream.text_stream:\n        sys.stdout.write(text)</code></pre><p><code>with</code> is <code>try/finally</code> with guaranteed cleanup - the TC39 <code>using</code> proposal, or a manual <code>reader.releaseLock()</code>. Iterating a generator with <code>for</code> is <code>for await</code> over a ReadableStream.</p><h4>In interviews</h4><p>Nobody will ask you to implement algorithms in Python. What does come up: read someone else pipeline and say where it breaks. Spotting a mutable default, a leaked reference, or a loop that materialises a list instead of yielding when there are 200k chunks reads far better than reciting syntax.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jak Python zaznacza początek i koniec bloku kodu?',
            en: 'How does Python mark the start and end of a code block?'
          },
          options: [
            { pl: 'Klamrami, tak jak JavaScript', en: 'With curly braces, like JavaScript' },
            { pl: 'Dwukropkiem i wcięciem kolejnych linii', en: 'With a colon and the indentation of the following lines' },
            { pl: 'Słowami kluczowymi begin oraz end', en: 'With the keywords begin and end' },
            { pl: 'Średnikiem na końcu każdej instrukcji', en: 'With a semicolon after every statement' }
          ],
          correct: 1,
          explain: {
            pl: 'Dwukropek działa jak otwierająca klamra, a blok kończy się tam, gdzie wcięcie wraca do poprzedniego poziomu. Dlatego mieszanie tabów i spacji potrafi wysypać plik.',
            en: 'The colon acts as the opening brace and the block ends where indentation returns to the previous level. That is why mixing tabs and spaces can break a whole file.'
          }
        },
        {
          q: {
            pl: 'Który zapis TypeScriptu odpowiada wyrażeniu [x * 2 for x in xs if x > 0]?',
            en: 'Which TypeScript expression matches [x * 2 for x in xs if x > 0]?'
          },
          options: [
            { pl: 'xs.map(x => x * 2).filter(x => x > 0)', en: 'xs.map(x => x * 2).filter(x => x > 0)' },
            { pl: 'xs.reduce((a, x) => a + x * 2, 0)', en: 'xs.reduce((a, x) => a + x * 2, 0)' },
            { pl: 'xs.filter(x => x > 0).map(x => x * 2)', en: 'xs.filter(x => x > 0).map(x => x * 2)' },
            { pl: 'xs.forEach(x => x * 2)', en: 'xs.forEach(x => x * 2)' }
          ],
          correct: 2,
          explain: {
            pl: 'Warunek if działa na oryginalnych elementach, więc filtrowanie jest pierwsze, a mnożenie dopiero na tym, co przeszło. Kolejność w wersji z map na początku daje inny wynik.',
            en: 'The if clause filters the original elements, so filtering happens first and the doubling only applies to survivors. Putting map first changes the result.'
          }
        },
        {
          q: {
            pl: 'Co robi metoda z podwójnym podkreśleniem, na przykład __init__?',
            en: 'What is a double-underscore method such as __init__?'
          },
          options: [
            { pl: 'To metoda prywatna, niedostępna spoza klasy', en: 'A private method, inaccessible from outside the class' },
            { pl: 'To hak protokołu języka, tu odpowiednik konstruktora', en: 'A language protocol hook - here, the constructor equivalent' },
            { pl: 'To adnotacja typu sprawdzana w czasie działania', en: 'A type annotation checked at runtime' },
            { pl: 'To funkcja generowana automatycznie przez interpreter', en: 'A function generated automatically by the interpreter' }
          ],
          correct: 1,
          explain: {
            pl: 'Dunder methods to punkty zaczepienia dla samego języka: __init__ jest konstruktorem, __str__ odpowiada toString, a __iter__ jest jak Symbol.iterator. Prywatność sygnalizuje pojedynczy underscore, i to tylko konwencją.',
            en: 'Dunder methods are hooks for the language itself: __init__ is the constructor, __str__ mirrors toString and __iter__ is Symbol.iterator. Privacy is signalled by a single underscore, and only by convention.'
          }
        },
        {
          q: {
            pl: 'Funkcja def add_chunk(chunk, acc=[]) jest wołana w pętli po dokumentach i acc rośnie między wywołaniami mimo braku przekazania argumentu. Dlaczego?',
            en: 'A function def add_chunk(chunk, acc=[]) is called in a loop over documents and acc keeps growing between calls even though no argument is passed. Why?'
          },
          options: [
            { pl: 'Bo listy w Pythonie są globalne', en: 'Because lists in Python are global' },
            { pl: 'Bo brakuje słowa kluczowego local przy acc', en: 'Because acc is missing the local keyword' },
            { pl: 'Bo garbage collector nie zwalnia list w pętli', en: 'Because the garbage collector does not free lists inside loops' },
            { pl: 'Bo domyślna wartość jest tworzona raz, przy definicji funkcji, i współdzielona', en: 'Because the default value is created once, at definition time, and shared across calls' }
          ],
          correct: 3,
          explain: {
            pl: 'Domyślne argumenty w Pythonie ewaluują się raz - ta sama lista żyje przez cały proces. Poprawny wzorzec to acc=None i utworzenie listy w ciele funkcji. W pipeline RAG taki błąd cicho miesza chunki z różnych dokumentów.',
            en: 'Python evaluates default arguments once, so the same list lives for the whole process. The correct pattern is acc=None plus creating the list in the body. In a RAG pipeline this silently mixes chunks from different documents.'
          }
        }
      ]
    },
    {
      id: 'env-tooling',
      title: {
        pl: 'Środowisko i narzędzia: uv, venv, pyproject',
        en: 'Environment and tooling: uv, venv, pyproject'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p8a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<g stroke="var(--border)" stroke-width="2" fill="var(--surface)">' +
          '<rect x="20" y="20" width="300" height="56" rx="12"/>' +
          '<rect x="20" y="112" width="300" height="56" rx="12"/>' +
          '<rect x="20" y="204" width="300" height="56" rx="12"/>' +
          '<rect x="20" y="296" width="300" height="56" rx="12"/>' +
          '</g>' +
          '<g font-size="16" fill="var(--accent)" text-anchor="middle">' +
          '<text x="170" y="54">uv init</text>' +
          '<text x="170" y="146">uv add httpx</text>' +
          '<text x="170" y="238">uv.lock plus .venv</text>' +
          '<text x="170" y="330">uv run main.py</text>' +
          '</g>' +
          '<g font-size="13" fill="var(--muted)">' +
          '<text x="345" y="48">same idea as</text><text x="345" y="66">npm init</text>' +
          '<text x="345" y="140">same idea as</text><text x="345" y="158">npm install httpx</text>' +
          '<text x="345" y="232">same idea as</text><text x="345" y="250">lockfile plus node_modules</text>' +
          '<text x="345" y="324">same idea as</text><text x="345" y="342">npm run start</text>' +
          '</g>' +
          '<g stroke="var(--muted)" stroke-width="2" marker-end="url(#p8a2)">' +
          '<line x1="170" y1="76" x2="170" y2="104"/>' +
          '<line x1="170" y1="168" x2="170" y2="196"/>' +
          '<line x1="170" y1="260" x2="170" y2="288"/>' +
          '</g></svg>',
        caption: {
          pl: 'Cztery komendy uv pokrywają cały cykl, który znasz z npm - łącznie z lockfile i lokalnym katalogiem zależności.',
          en: 'Four uv commands cover the whole cycle you know from npm - lockfile and local dependency directory included.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kuchnię, w której gotuje pięć osób naraz. Każda ma swój przepis i każda potrzebuje innej wersji tej samej przyprawy. Jeśli wszyscy trzymają przyprawy w jednej szafce, ktoś na pewno wsypie nie to, co trzeba, i danie wyjdzie dziwne.</p><p>Środowisko wirtualne to własna szafka dla jednego przepisu. Stoi w katalogu projektu, nazywa się kropka venv i zawiera dokładnie te wersje bibliotek, których ten projekt potrzebuje. Sąsiedni projekt ma swoją szafkę i nic o Twojej nie wie.</p><p>Jest też pomocnik kuchenny o imieniu uv. Mówisz mu "dodaj tę przyprawę", a on ją znajduje, wpisuje do listy zakupów i wstawia do właściwej szafki. Kiedy koleżanka klonuje Twój projekt, uv odtwarza jej szafkę co do słoiczka. Dokładnie tak samo działa to, co robisz codziennie w projektach frontendowych - tylko szafka nazywa się inaczej.</p>',
          en: '<p>Picture a kitchen where five people cook at once. Each has their own recipe and each needs a different version of the same spice. If everyone keeps spices in one shared cupboard, somebody will grab the wrong jar and dinner comes out weird.</p><p>A virtual environment is a private cupboard for one recipe. It sits inside the project folder, it is called dot venv, and it holds exactly the library versions this project needs. The project next door has its own cupboard and knows nothing about yours.</p><p>There is also a kitchen helper called uv. You tell it "add this spice" and it finds the jar, writes it on the shopping list and puts it in the right cupboard. When a colleague clones your project, uv rebuilds her cupboard jar for jar. This is exactly what you already do every day in frontend projects - the cupboard just has a different name.</p>'
        },
        school: {
          pl: '<p>Największy szok kulturowy w Pythonie to nie składnia, tylko instalowanie paczek. Historycznie <code>pip install</code> wrzucał biblioteki globalnie, więc dwa projekty potrafiły się nawzajem zepsuć. Rozwiązaniem jest <strong>venv</strong> (virtual environment - wirtualne środowisko), czyli katalog <code>.venv</code> w projekcie, będący dokładnym odpowiednikiem <code>node_modules</code>.</p><h4>Aktywacja</h4><p>Zanim zainstalujesz cokolwiek, środowisko musi być aktywne. To krok, którego w npm nie ma i który najczęściej gubią początkujący:</p><pre><code>python -m venv .venv\nsource .venv/bin/activate\npip install httpx</code></pre><p>Po aktywacji w prompcie shella pojawia się nazwa środowiska. Bez niej instalujesz do systemowego Pythona i za tydzień nie wiesz, skąd konflikt.</p><h4>pyproject.toml</h4><p>To <code>package.json</code> Pythona: nazwa projektu, wersja, wymagana wersja Pythona i lista zależności. Zastąpił stary plik <code>requirements.txt</code>, który był raczej listą zakupów niż manifestem.</p><h4>uv, czyli nowy standard</h4><p><strong>uv</strong> to menedżer napisany w Ruście, który łączy rolę npm, nvm i npx. Sam pobiera odpowiednią wersję Pythona, sam tworzy <code>.venv</code>, sam aktualizuje <code>pyproject.toml</code> i <code>uv.lock</code>. Nie musisz nic aktywować:</p><pre><code>uv init my-agent\ncd my-agent\nuv add anthropic httpx\nuv run main.py</code></pre><p>Jeśli zaczynasz dziś, zacznij od uv. Starsze polecenia poznasz i tak, bo połowa tutoriali w sieci nadal używa pip.</p>',
          en: '<p>The real culture shock in Python is not syntax, it is installing packages. Historically <code>pip install</code> dropped libraries into a global location, so two projects could break each other. The fix is a <strong>venv</strong> (virtual environment) - a <code>.venv</code> directory inside the project that is the precise counterpart of <code>node_modules</code>.</p><h4>Activation</h4><p>Before installing anything, the environment must be active. This step has no npm equivalent and it is the one beginners forget:</p><pre><code>python -m venv .venv\nsource .venv/bin/activate\npip install httpx</code></pre><p>Once active, the environment name appears in your shell prompt. Without it you install into the system Python and a week later you cannot explain the conflict.</p><h4>pyproject.toml</h4><p>This is Python <code>package.json</code>: project name, version, required Python version and the dependency list. It replaced the old <code>requirements.txt</code>, which was more of a shopping list than a manifest.</p><h4>uv, the new default</h4><p><strong>uv</strong> is a Rust-based manager that merges the jobs of npm, nvm and npx. It downloads the right Python version, creates <code>.venv</code>, and updates <code>pyproject.toml</code> and <code>uv.lock</code> for you. Nothing to activate:</p><pre><code>uv init my-agent\ncd my-agent\nuv add anthropic httpx\nuv run main.py</code></pre><p>If you start today, start with uv. You will still learn the older commands, because half the tutorials online still use pip.</p>'
        },
        pro: {
          pl: '<p>Zestaw narzędzi, który realnie wystarcza w 2026 roku: <strong>uv</strong> do środowisk i zależności, <strong>ruff</strong> do lintowania i formatowania, <strong>pytest</strong> do testów. Trzy binarki zamiast siedmiu, dwie z nich w Ruście i szybkie do absurdu.</p><h4>Mapa mentalna</h4><table><tr><th>npm</th><th>Python (uv)</th></tr><tr><td>package.json</td><td>pyproject.toml</td></tr><tr><td>package-lock.json</td><td>uv.lock</td></tr><tr><td>node_modules</td><td>.venv</td></tr><tr><td>npm ci</td><td>uv sync --frozen</td></tr><tr><td>npx</td><td>uvx</td></tr><tr><td>nvm use</td><td>uv python pin 3.12</td></tr><tr><td>npm run start</td><td>uv run main.py</td></tr></table><h4>Dlaczego uv wygrało</h4><p>Rozwiązywanie zależności i instalacja są o rząd wielkości szybsze niż pip - typowe środowisko agentowe z anthropic, httpx, pydantic i pytest stawia się w okolicach 1-3 sekund zamiast 30-60. Cache jest globalny i współdzielony przez projekty, więc drugi projekt kosztuje ułamek pierwszego. W obrazie Dockera to realnie kilka minut mniej na każdym buildzie.</p><h4>Typowy plik</h4><pre><code>[project]\nname = "rag-service"\nrequires-python = "&gt;=3.12"\ndependencies = [\n  "anthropic&gt;=0.40",\n  "httpx&gt;=0.27",\n  "pydantic&gt;=2.9",\n]\n\n[dependency-groups]\ndev = ["pytest&gt;=8", "ruff&gt;=0.6"]</code></pre><p><code>uv sync --frozen</code> w CI odpowiada <code>npm ci</code>: instaluje dokładnie to, co w lockfile, i wywala się, jeśli manifest się rozjechał. To jedyna komenda instalacyjna, jaką powinien znać Twój pipeline.</p><h4>Pułapki produkcyjne</h4><ul><li><strong>Wersja Pythona to część kontraktu</strong>. Biblioteki ML publikują koła (wheels) dla konkretnych wersji, więc świeży Python bywa najgorszym wyborem. Przypnij ją w <code>.python-version</code>.</li><li><strong>Jeden globalny cache w Dockerze</strong>: montuj <code>/root/.cache/uv</code> jako cache mount i kopiuj tylko <code>pyproject.toml</code> oraz <code>uv.lock</code> przed <code>uv sync</code>, żeby warstwa zależności nie unieważniała się przy każdej zmianie kodu.</li><li><strong>Nie commituj .venv</strong>. To odpowiednik commitowania node_modules, tylko z dowiązaniami symbolicznymi do konkretnego interpretera - u kolegi po prostu nie zadziała.</li><li><strong>uvx zamiast instalacji narzędzi</strong>: <code>uvx ruff check .</code> uruchamia narzędzie w efemerycznym środowisku, nie zaśmiecając zależności projektu.</li></ul>',
          en: '<p>The toolkit that genuinely suffices in 2026: <strong>uv</strong> for environments and dependencies, <strong>ruff</strong> for linting and formatting, <strong>pytest</strong> for tests. Three binaries instead of seven, two of them written in Rust and absurdly fast.</p><h4>Mental map</h4><table><tr><th>npm</th><th>Python (uv)</th></tr><tr><td>package.json</td><td>pyproject.toml</td></tr><tr><td>package-lock.json</td><td>uv.lock</td></tr><tr><td>node_modules</td><td>.venv</td></tr><tr><td>npm ci</td><td>uv sync --frozen</td></tr><tr><td>npx</td><td>uvx</td></tr><tr><td>nvm use</td><td>uv python pin 3.12</td></tr><tr><td>npm run start</td><td>uv run main.py</td></tr></table><h4>Why uv won</h4><p>Resolution and installation are an order of magnitude faster than pip - a typical agent environment with anthropic, httpx, pydantic and pytest comes up in roughly 1-3 seconds instead of 30-60. The cache is global and shared across projects, so the second project costs a fraction of the first. In a Docker image that is minutes off every build.</p><h4>A typical file</h4><pre><code>[project]\nname = "rag-service"\nrequires-python = "&gt;=3.12"\ndependencies = [\n  "anthropic&gt;=0.40",\n  "httpx&gt;=0.27",\n  "pydantic&gt;=2.9",\n]\n\n[dependency-groups]\ndev = ["pytest&gt;=8", "ruff&gt;=0.6"]</code></pre><p><code>uv sync --frozen</code> in CI is <code>npm ci</code>: install exactly what the lockfile says and fail if the manifest drifted. It is the only install command your pipeline should know.</p><h4>Production pitfalls</h4><ul><li><strong>The Python version is part of the contract</strong>. ML libraries ship wheels for specific versions, so the newest Python is often the worst choice. Pin it in <code>.python-version</code>.</li><li><strong>One global cache in Docker</strong>: mount <code>/root/.cache/uv</code> as a cache mount and copy only <code>pyproject.toml</code> and <code>uv.lock</code> before <code>uv sync</code>, so the dependency layer is not invalidated by every code change.</li><li><strong>Never commit .venv</strong>. It is committing node_modules, except with symlinks to one specific interpreter - it simply will not work on a teammate machine.</li><li><strong>uvx instead of installing tools</strong>: <code>uvx ruff check .</code> runs a tool in an ephemeral environment without polluting project dependencies.</li></ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w projekcie Pythona pełni rolę katalogu node_modules?',
            en: 'What plays the role of node_modules in a Python project?'
          },
          options: [
            { pl: 'Katalog .venv', en: 'The .venv directory' },
            { pl: 'Plik pyproject.toml', en: 'The pyproject.toml file' },
            { pl: 'Katalog __pycache__', en: 'The __pycache__ directory' },
            { pl: 'Plik uv.lock', en: 'The uv.lock file' }
          ],
          correct: 0,
          explain: {
            pl: 'W .venv leżą faktycznie zainstalowane biblioteki i własny interpreter. pyproject.toml odpowiada package.json, a uv.lock plikowi package-lock.json.',
            en: 'The .venv holds the actually installed libraries plus its own interpreter. pyproject.toml maps to package.json and uv.lock to package-lock.json.'
          }
        },
        {
          q: {
            pl: 'Które polecenie uv jest odpowiednikiem npm ci w pipeline CI?',
            en: 'Which uv command is the CI equivalent of npm ci?'
          },
          options: [
            { pl: 'uv add --all', en: 'uv add --all' },
            { pl: 'uv pip freeze', en: 'uv pip freeze' },
            { pl: 'uv sync --frozen', en: 'uv sync --frozen' },
            { pl: 'uv run --reinstall', en: 'uv run --reinstall' }
          ],
          correct: 2,
          explain: {
            pl: 'uv sync --frozen instaluje dokładnie zawartość uv.lock i kończy się błędem, gdy lockfile nie zgadza się z manifestem - dokładnie ta gwarancja, której oczekujesz od npm ci.',
            en: 'uv sync --frozen installs exactly what uv.lock contains and fails when the lockfile disagrees with the manifest - precisely the guarantee you expect from npm ci.'
          }
        },
        {
          q: {
            pl: 'Dlaczego uruchomienie pip install bez aktywnego środowiska wirtualnego jest problemem?',
            en: 'Why is running pip install without an active virtual environment a problem?'
          },
          options: [
            { pl: 'pip odmawia instalacji poza środowiskiem', en: 'pip refuses to install outside an environment' },
            { pl: 'Paczki lądują w globalnym Pythonie i mieszają wersje między projektami', en: 'Packages land in the global Python and mix versions across projects' },
            { pl: 'Instalacja jest wolniejsza, ale poza tym równoważna', en: 'The install is slower but otherwise equivalent' },
            { pl: 'pip nadpisuje pyproject.toml niepoprawnymi wpisami', en: 'pip overwrites pyproject.toml with invalid entries' }
          ],
          correct: 1,
          explain: {
            pl: 'To odpowiednik npm install -g dla każdej zależności aplikacji. Dwa projekty wymagające różnych wersji pydantica zaczynają się nawzajem psuć, a diagnoza trwa godziny.',
            en: 'It is like npm install -g for every application dependency. Two projects needing different pydantic versions start breaking each other, and diagnosing it takes hours.'
          }
        },
        {
          q: {
            pl: 'Budujesz obraz Dockera z serwisem RAG. Warstwa zależności przebudowuje się przy każdej zmianie kodu i build trwa 6 minut. Co naprawia to najskuteczniej?',
            en: 'You build a Docker image for a RAG service. The dependency layer rebuilds on every code change and the build takes 6 minutes. What fixes it most effectively?'
          },
          options: [
            { pl: 'Zamiana uv na pip, bo pip lepiej cache uje warstwy', en: 'Swapping uv for pip, because pip caches layers better' },
            { pl: 'Skopiowanie całego repozytorium przed instalacją zależności', en: 'Copying the whole repository before installing dependencies' },
            { pl: 'Skopiowanie tylko pyproject.toml i uv.lock, uv sync, dopiero potem reszty kodu', en: 'Copying only pyproject.toml and uv.lock, running uv sync, then copying the rest of the code' },
            { pl: 'Zacommitowanie katalogu .venv do repozytorium', en: 'Committing the .venv directory to the repository' }
          ],
          correct: 2,
          explain: {
            pl: 'Warstwa Dockera unieważnia się przy zmianie któregokolwiek kopiowanego pliku. Kopiując najpierw sam manifest i lockfile, przypinasz cache zależności do ich zawartości, a nie do kodu. Cache mount na /root/.cache/uv dokłada resztę.',
            en: 'A Docker layer invalidates when any copied file changes. Copying just the manifest and lockfile first ties the dependency cache to their contents rather than to your code. A cache mount on /root/.cache/uv does the rest.'
          }
        }
      ]
    },
    {
      id: 'async-http',
      title: {
        pl: 'HTTP i asyncio: httpx, pętla zdarzeń, pułapki',
        en: 'HTTP and asyncio: httpx, the event loop, gotchas'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="34" font-size="15" fill="var(--ok)">asyncio.gather plus httpx.AsyncClient</text>' +
          '<g fill="var(--ok)" opacity="0.85">' +
          '<rect x="20" y="48" width="180" height="24" rx="6"/>' +
          '<rect x="20" y="80" width="180" height="24" rx="6"/>' +
          '<rect x="20" y="112" width="180" height="24" rx="6"/>' +
          '</g>' +
          '<text x="215" y="94" font-size="13" fill="var(--muted)">3 calls overlap, wall clock 1.0 s</text>' +
          '<text x="20" y="196" font-size="15" fill="var(--warn)">for-loop plus blocking requests</text>' +
          '<g fill="var(--warn)" opacity="0.85">' +
          '<rect x="20" y="210" width="180" height="24" rx="6"/>' +
          '<rect x="210" y="210" width="180" height="24" rx="6"/>' +
          '<rect x="400" y="210" width="180" height="24" rx="6"/>' +
          '</g>' +
          '<text x="20" y="262" font-size="13" fill="var(--muted)">3 calls in a row, wall clock 3.0 s</text>' +
          '<line x1="20" y1="310" x2="620" y2="310" stroke="var(--border)" stroke-width="2"/>' +
          '<g stroke="var(--border)" stroke-width="2">' +
          '<line x1="20" y1="304" x2="20" y2="316"/><line x1="210" y1="304" x2="210" y2="316"/>' +
          '<line x1="400" y1="304" x2="400" y2="316"/><line x1="590" y1="304" x2="590" y2="316"/>' +
          '</g>' +
          '<g font-size="13" fill="var(--muted)" text-anchor="middle">' +
          '<text x="20" y="334">0 s</text><text x="210" y="334">1 s</text>' +
          '<text x="400" y="334">2 s</text><text x="590" y="334">3 s</text>' +
          '</g>' +
          '<text x="20" y="376" font-size="14" fill="var(--text)">Same network, same code shape - only the client differs.</text>' +
          '</svg>',
        caption: {
          pl: 'Trzy wywołania API: równolegle przez asyncio to jedna sekunda, sekwencyjnie przez blokujące requests to trzy.',
          en: 'Three API calls: concurrent via asyncio takes one second, sequential via blocking requests takes three.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kelnera w restauracji. Przyjmuje zamówienie od stolika pierwszego, niesie je do kuchni i... staje przy piecu, patrząc, jak się smaży. Dziesięć minut. Reszta sali czeka, bo kelner jest zajęty gapieniem się.</p><p>Tak działa zwykłe pobieranie danych z internetu. Program prosi o odpowiedź i stoi jak wryty, aż przyjdzie.</p><p>Dobry kelner robi inaczej: oddaje zamówienie kucharzowi i natychmiast idzie do kolejnego stolika. Wraca dopiero, gdy z kuchni dzwoni dzwonek. Jeden kelner, ta sama prędkość nóg, a obsłużonych stolików dziesięć razy więcej.</p><p>To właśnie asyncio. Nie dodaje kucharzy, tylko przestaje marnować czas kelnera na czekanie. Znasz to doskonale z przeglądarki, gdzie jeden wątek obsługuje dziesiątki żądań naraz. Python nauczył się tego samego triku, tylko musisz mu wyraźnie powiedzieć, kiedy wolno odejść od pieca.</p>',
          en: '<p>Picture a waiter in a restaurant. He takes an order from table one, carries it to the kitchen and then stands by the stove watching it fry. For ten minutes. The rest of the room waits, because the waiter is busy staring.</p><p>That is how ordinary data fetching works. The program asks for a response and freezes until it arrives.</p><p>A good waiter does the opposite: he hands the order to the cook and immediately walks to the next table. He returns only when the kitchen bell rings. One waiter, the same walking speed, ten times more tables served.</p><p>That is asyncio. It does not add cooks, it stops wasting the waiter time on waiting. You know this perfectly from the browser, where one thread juggles dozens of requests. Python learned the same trick - you just have to tell it explicitly when it is allowed to walk away from the stove.</p>'
        },
        school: {
          pl: '<p>W JavaScripcie asynchroniczność jest domyślna: <code>fetch</code> zwraca Promise, a event loop (pętla zdarzeń) kręci się bez Twojej wiedzy. W Pythonie jest odwrotnie - domyślnie kod jest blokujący, a pętlę uruchamiasz świadomie.</p><h4>Dwa światy klientów HTTP</h4><p><strong>requests</strong> to klasyka: prosty, synchroniczny, blokuje wątek na czas odpowiedzi. <strong>httpx</strong> to nowocześniejsza biblioteka z tym samym API, ale potrafi też pracować asynchronicznie. Dla nowego kodu wybieraj httpx.</p><pre><code>import httpx\n\nr = httpx.get("https://api.example.com/health", timeout=10)\nprint(r.status_code, r.json())</code></pre><h4>Wersja asynchroniczna</h4><pre><code>import asyncio, httpx\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return r.json()\n\nasync def main():\n    async with httpx.AsyncClient(timeout=30) as client:\n        results = await asyncio.gather(*[fetch(client, u) for u in urls])\n    return results\n\nasyncio.run(main())</code></pre><p>Tłumaczenie na TypeScript jest niemal dosłowne: <code>async def</code> to <code>async function</code>, <code>await</code> to <code>await</code>, <code>asyncio.gather</code> to <code>Promise.all</code>, a <code>asyncio.run</code> to punkt startu, którego w przeglądarce nie potrzebujesz, bo pętla już działa.</p><h4>Najczęstsza pułapka</h4><p>Jedno wywołanie <code>requests.get</code> albo <code>time.sleep</code> wewnątrz funkcji <code>async def</code> zatrzymuje CAŁĄ pętlę - wszystkie inne zadania stoją. To odpowiednik pętli <code>while</code> blokującej główny wątek przeglądarki: interfejs zamarza. Wewnątrz kodu async używaj wyłącznie klientów async i <code>asyncio.sleep</code>.</p>',
          en: '<p>In JavaScript asynchrony is the default: <code>fetch</code> returns a Promise and the event loop spins without your involvement. Python is the opposite - code is blocking by default and you start the loop deliberately.</p><h4>Two worlds of HTTP clients</h4><p><strong>requests</strong> is the classic: simple, synchronous, blocks the thread for the duration of the response. <strong>httpx</strong> is the modern library with the same API surface, but it can also run asynchronously. For new code, pick httpx.</p><pre><code>import httpx\n\nr = httpx.get("https://api.example.com/health", timeout=10)\nprint(r.status_code, r.json())</code></pre><h4>The async version</h4><pre><code>import asyncio, httpx\n\nasync def fetch(client, url):\n    r = await client.get(url)\n    return r.json()\n\nasync def main():\n    async with httpx.AsyncClient(timeout=30) as client:\n        results = await asyncio.gather(*[fetch(client, u) for u in urls])\n    return results\n\nasyncio.run(main())</code></pre><p>The TypeScript translation is nearly word for word: <code>async def</code> is <code>async function</code>, <code>await</code> is <code>await</code>, <code>asyncio.gather</code> is <code>Promise.all</code>, and <code>asyncio.run</code> is the entry point you never need in a browser because the loop is already running.</p><h4>The most common trap</h4><p>A single <code>requests.get</code> or <code>time.sleep</code> inside an <code>async def</code> stops the ENTIRE loop - every other task waits. It is the equivalent of a <code>while</code> loop blocking the browser main thread: the UI freezes. Inside async code use async clients only, and <code>asyncio.sleep</code>.</p>'
        },
        pro: {
          pl: '<p>W pipeline LLM prawie cały czas wykonania to oczekiwanie na sieć. Embedowanie 5000 chunków przez API to 5000 żądań po 200-400 ms - sekwencyjnie ponad 25 minut, przy 20 równoległych zadaniach niecałe dwie. To zwykle największa optymalizacja w całym projekcie i nie wymaga zmiany modelu.</p><h4>Limit współbieżności zamiast nagiego gather</h4><p><code>asyncio.gather</code> po 5000 elementach wystrzeli 5000 żądań naraz i dostaniesz falę 429. Bramkuj semaforem:</p><pre><code>sem = asyncio.Semaphore(20)\n\nasync def embed(client, text):\n    async with sem:\n        r = await client.post(URL, json={"input": text}, timeout=60)\n        r.raise_for_status()\n        return r.json()["data"][0]["embedding"]</code></pre><p>To odpowiednik p-limit z ekosystemu npm. Rozsądny punkt startu to 10-30 równoległych żądań do jednego dostawcy - dalej i tak zetkniesz się z limitem tokenów na minutę.</p><h4>Timeouty i retry</h4><p>httpx domyślnie ma timeout 5 sekund, ale SDK Anthropica i OpenAI ustawiają własne, dłuższe - przy długich generacjach potrzebujesz nawet 600 s. Rozdziel connect timeout (2-5 s) od read timeout. Ponawiaj tylko 429, 500, 502, 503, 504 i błędy sieci, z exponential backoff i jitterem. Nie ponawiaj 400 - zła treść żądania nie naprawi się sama, a płacisz za każdą próbę.</p><h4>Blokowanie pętli</h4><p>Największe realne wpadki produkcyjne to biblioteki, które wyglądają niewinnie, a są synchroniczne: <code>psycopg2</code>, <code>boto3</code>, tokenizery, parsery PDF, obliczenia na numpy. W kodzie async wrzucaj je w <code>await asyncio.to_thread(fn, arg)</code>. Diagnoza: włącz <code>asyncio</code> w trybie debug, a pętla zacznie logować callbacki dłuższe niż 100 ms.</p><h4>Reużywaj klienta</h4><p>Tworzenie <code>httpx.AsyncClient</code> per żądanie zabija pooling połączeń i wymusza pełny handshake TLS za każdym razem - to dziesiątki milisekund na wywołanie. Trzymaj jedną instancję na czas życia procesu, w FastAPI zamontowaną w lifespan. Ta sama zasada dotyczy klienta <code>anthropic.AsyncAnthropic</code>.</p><h4>Na rozmowie</h4><p>Padnie pytanie o różnicę między współbieżnością a równoległością. Krótka odpowiedź: asyncio daje współbieżność na jednym wątku i rozwiązuje I/O; do prawdziwie obliczeniowych zadań potrzebujesz procesów, bo GIL (Global Interpreter Lock - globalna blokada interpretera) i tak przepuści tylko jeden wątek bajtkodu naraz.</p>',
          en: '<p>In an LLM pipeline nearly all wall-clock time is waiting on the network. Embedding 5000 chunks through an API is 5000 requests at 200-400 ms each - over 25 minutes sequentially, under two with 20 concurrent tasks. It is usually the single biggest optimisation in the project and requires no model change.</p><h4>Bounded concurrency instead of naked gather</h4><p><code>asyncio.gather</code> over 5000 items fires 5000 requests at once and you get a wall of 429s. Gate it with a semaphore:</p><pre><code>sem = asyncio.Semaphore(20)\n\nasync def embed(client, text):\n    async with sem:\n        r = await client.post(URL, json={"input": text}, timeout=60)\n        r.raise_for_status()\n        return r.json()["data"][0]["embedding"]</code></pre><p>This is p-limit from the npm world. A sane starting point is 10-30 concurrent requests per provider - beyond that you hit tokens-per-minute limits anyway.</p><h4>Timeouts and retries</h4><p>httpx defaults to a 5 second timeout, while the Anthropic and OpenAI SDKs set their own, longer ones - long generations may need 600 s. Separate the connect timeout (2-5 s) from the read timeout. Retry only 429, 500, 502, 503, 504 and network errors, with exponential backoff plus jitter. Never retry a 400 - a malformed request will not fix itself and you pay for every attempt.</p><h4>Blocking the loop</h4><p>The real production incidents come from libraries that look innocent but are synchronous: <code>psycopg2</code>, <code>boto3</code>, tokenizers, PDF parsers, numpy math. In async code wrap them in <code>await asyncio.to_thread(fn, arg)</code>. To diagnose, run <code>asyncio</code> in debug mode and the loop will log callbacks slower than 100 ms.</p><h4>Reuse the client</h4><p>Creating an <code>httpx.AsyncClient</code> per request kills connection pooling and forces a full TLS handshake every time - tens of milliseconds per call. Keep one instance for the process lifetime, mounted in the FastAPI lifespan. The same applies to <code>anthropic.AsyncAnthropic</code>.</p><h4>In interviews</h4><p>You will be asked about concurrency versus parallelism. Short answer: asyncio gives single-threaded concurrency and solves I/O; for genuinely CPU-bound work you need processes, because the GIL (Global Interpreter Lock) lets only one thread execute bytecode at a time anyway.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co w Pythonie odpowiada konstrukcji Promise.all z JavaScriptu?',
            en: 'What is the Python counterpart of JavaScript Promise.all?'
          },
          options: [
            { pl: 'asyncio.run', en: 'asyncio.run' },
            { pl: 'asyncio.gather', en: 'asyncio.gather' },
            { pl: 'asyncio.sleep', en: 'asyncio.sleep' },
            { pl: 'asyncio.Semaphore', en: 'asyncio.Semaphore' }
          ],
          correct: 1,
          explain: {
            pl: 'asyncio.gather uruchamia wiele korutyn współbieżnie i zwraca listę wyników w kolejności argumentów. asyncio.run to punkt startowy pętli, odpowiednik top-level await.',
            en: 'asyncio.gather runs several coroutines concurrently and returns results in argument order. asyncio.run is the loop entry point, roughly top-level await.'
          }
        },
        {
          q: {
            pl: 'Dlaczego wywołanie requests.get wewnątrz funkcji async def jest błędem?',
            en: 'Why is calling requests.get inside an async def a mistake?'
          },
          options: [
            { pl: 'Bo requests nie obsługuje HTTPS', en: 'Because requests does not support HTTPS' },
            { pl: 'Bo Python zgłosi wyjątek już przy imporcie', en: 'Because Python raises an exception at import time' },
            { pl: 'Bo blokuje pętlę zdarzeń i wszystkie inne zadania stoją', en: 'Because it blocks the event loop and every other task stalls' },
            { pl: 'Bo requests zawsze tworzy nowy wątek na żądanie', en: 'Because requests always spawns a new thread per request' }
          ],
          correct: 2,
          explain: {
            pl: 'Kod synchroniczny nie oddaje sterowania pętli, więc współbieżność znika - jak długa pętla while blokująca główny wątek przeglądarki. Rozwiązanie to httpx.AsyncClient albo asyncio.to_thread.',
            en: 'Synchronous code never yields control back to the loop, so concurrency disappears - like a long while loop freezing the browser main thread. The fix is httpx.AsyncClient or asyncio.to_thread.'
          }
        },
        {
          q: {
            pl: 'Embedujesz 5000 chunków. Czemu służy asyncio.Semaphore(20) w tym kodzie?',
            en: 'You are embedding 5000 chunks. What does asyncio.Semaphore(20) do in that code?'
          },
          options: [
            { pl: 'Ogranicza liczbę żądań lecących jednocześnie, chroniąc przed 429', en: 'Caps how many requests are in flight at once, avoiding 429s' },
            { pl: 'Dzieli chunki na 20 równych partii', en: 'Splits the chunks into 20 equal batches' },
            { pl: 'Uruchamia 20 procesów roboczych', en: 'Spawns 20 worker processes' },
            { pl: 'Ustawia timeout na 20 sekund', en: 'Sets a 20 second timeout' }
          ],
          correct: 0,
          explain: {
            pl: 'Semafor to bramka wpuszczająca naraz co najwyżej N zadań - odpowiednik p-limit z npm. Bez niej gather wystrzeliłby 5000 żądań w jednej chwili i dostawca odrzuciłby większość.',
            en: 'A semaphore is a gate admitting at most N tasks at a time - the npm p-limit equivalent. Without it, gather would fire all 5000 requests at once and the provider would reject most of them.'
          }
        },
        {
          q: {
            pl: 'Serwis FastAPI ma p95 latencji 900 ms, choć API modelu odpowiada w 300 ms. Kod tworzy nowy httpx.AsyncClient w każdym handlerze i używa psycopg2 do zapisu logów. Co naprawić najpierw?',
            en: 'A FastAPI service shows p95 latency of 900 ms although the model API answers in 300 ms. The code creates a new httpx.AsyncClient in every handler and uses psycopg2 to write logs. What should you fix first?'
          },
          options: [
            { pl: 'Podnieść read timeout do 600 sekund', en: 'Raise the read timeout to 600 seconds' },
            { pl: 'Zamienić asyncio.gather na pętlę for dla stabilności', en: 'Replace asyncio.gather with a for loop for stability' },
            { pl: 'Włączyć ponawianie dla odpowiedzi 400', en: 'Enable retries for 400 responses' },
            { pl: 'Współdzielić jednego klienta i wynieść psycopg2 do asyncio.to_thread', en: 'Share a single client and move psycopg2 into asyncio.to_thread' }
          ],
          correct: 3,
          explain: {
            pl: 'Klient per żądanie zabija pooling i wymusza handshake TLS, a synchroniczny sterownik bazy blokuje pętlę dla wszystkich requestów naraz. Te dwie zmiany zwykle ścinają ogon latencji bez dotykania modelu.',
            en: 'A per-request client kills pooling and forces a TLS handshake, while a synchronous database driver blocks the loop for every concurrent request. Those two changes usually cut the latency tail without touching the model.'
          }
        }
      ]
    },
    {
      id: 'typing-pydantic',
      title: {
        pl: 'Typy i pydantic, czyli zod w Pythonie',
        en: 'Typing and pydantic - zod for Python'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p8a4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="20" y="160" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="193" text-anchor="middle" font-size="14" fill="var(--text)">JSON from</text>' +
          '<text x="105" y="213" text-anchor="middle" font-size="14" fill="var(--text)">the model</text>' +
          '<rect x="235" y="160" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="193" text-anchor="middle" font-size="14" fill="var(--accent)">Invoice</text>' +
          '<text x="320" y="213" text-anchor="middle" font-size="14" fill="var(--accent)">.model_validate()</text>' +
          '<rect x="450" y="60" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="535" y="93" text-anchor="middle" font-size="14" fill="var(--ok)">typed object</text>' +
          '<text x="535" y="113" text-anchor="middle" font-size="14" fill="var(--ok)">total: Decimal</text>' +
          '<rect x="450" y="260" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="535" y="293" text-anchor="middle" font-size="14" fill="var(--err)">ValidationError</text>' +
          '<text x="535" y="313" text-anchor="middle" font-size="14" fill="var(--err)">feed back, retry</text>' +
          '<g stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#p8a4)">' +
          '<line x1="192" y1="200" x2="227" y2="200"/>' +
          '<path d="M 407 190 C 430 190 425 100 442 100"/>' +
          '<path d="M 407 210 C 430 210 425 300 442 300"/>' +
          '</g>' +
          '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--muted)">one schema: validation, coercion and the tool JSON Schema</text>' +
          '</svg>',
        caption: {
          pl: 'Jeden model pydantic pełni trzy role: waliduje odpowiedź, konwertuje typy i generuje JSON Schema dla tool callingu.',
          en: 'One pydantic model plays three roles: it validates the response, coerces types and generates the JSON Schema for tool calling.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie bramkę na lotnisku, przy której sprawdzają rozmiar bagażu podręcznego. Jest metalowa ramka. Jeśli walizka wchodzi, lecisz dalej. Jeśli nie wchodzi, ktoś Ci od razu mówi, o ile jest za duża, a nie odsyła bez słowa.</p><p>Model językowy przysyła Ci paczkę danych i twierdzi, że to faktura. Może być idealna. Może mieć kwotę zapisaną słowami. Może zapomnieć daty. Nie chcesz się o tym dowiedzieć trzy ekrany dalej, kiedy aplikacja się wysypie.</p><p>Pydantic to właśnie ta bramka. Opisujesz raz, jak wygląda dobra walizka: kwota to liczba, data to data, lista pozycji nie może być pusta. Potem każda paczka przechodzi przez ramkę. Dobra leci dalej jako porządny obiekt, zła zatrzymuje się z konkretną notatką, co jest nie tak. Tę notatkę możesz nawet oddać modelowi i poprosić o poprawkę.</p>',
          en: '<p>Picture the airport gate where they check your carry-on size. There is a metal frame. If the bag fits, you fly. If it does not, someone tells you exactly how much too big it is, rather than sending you away in silence.</p><p>A language model hands you a bundle of data and claims it is an invoice. It might be perfect. It might have the amount spelled out in words. It might forget the date. You do not want to discover this three screens later when the app crashes.</p><p>Pydantic is that frame. You describe once what a good bag looks like: the amount is a number, the date is a date, the line items cannot be empty. Then every bundle goes through the frame. Good ones continue as proper typed objects, bad ones stop with a precise note about what is wrong. You can even hand that note back to the model and ask it to fix itself.</p>'
        },
        school: {
          pl: '<p>Python od wersji 3.5 ma type hints (podpowiedzi typów), które wyglądają znajomo:</p><pre><code>def score(text: str, k: int = 5) -&gt; float:\n    ...</code></pre><p>Kluczowa różnica względem TypeScriptu: te adnotacje NIE są sprawdzane przy uruchomieniu. Interpreter je ignoruje, sprawdza je dopiero osobne narzędzie, na przykład <strong>mypy</strong> albo <strong>pyright</strong> - dokładnie jak <code>tsc</code>, który też nic nie robi w czasie działania.</p><h4>Pydantic dokłada runtime</h4><p><strong>pydantic</strong> to biblioteka, która bierze te same adnotacje i faktycznie sprawdza dane podczas działania programu. To najbliższy odpowiednik zod, jaki znajdziesz:</p><pre><code>from pydantic import BaseModel, Field\n\nclass Invoice(BaseModel):\n    vendor: str\n    total: float = Field(gt=0)\n    currency: str = "PLN"\n\ninv = Invoice.model_validate(data)</code></pre><p>Zestawienie jest niemal jeden do jednego: <code>z.object</code> to klasa dziedzicząca po <code>BaseModel</code>, <code>z.string().min(1)</code> to <code>Field(min_length=1)</code>, <code>schema.parse</code> to <code>model_validate</code>, a <code>safeParse</code> to ta sama metoda opakowana w <code>try/except ValidationError</code>.</p><h4>Dataclasses</h4><p>Jeśli potrzebujesz tylko pojemnika na dane, bez walidacji, wystarczy <code>@dataclass</code>. To jak zwykły interfejs TypeScriptu: opisuje kształt, ale nie pilnuje niczego w locie. Pydantic wybieraj tam, gdzie dane przychodzą z zewnątrz - od użytkownika, z HTTP albo od modelu.</p>',
          en: '<p>Since version 3.5 Python has type hints, and they look familiar:</p><pre><code>def score(text: str, k: int = 5) -&gt; float:\n    ...</code></pre><p>The crucial difference from TypeScript: these annotations are NOT checked at runtime. The interpreter ignores them; a separate tool such as <strong>mypy</strong> or <strong>pyright</strong> checks them - exactly like <code>tsc</code>, which also does nothing at runtime.</p><h4>Pydantic adds the runtime half</h4><p><strong>pydantic</strong> is the library that takes those same annotations and actually verifies data while the program runs. It is the closest thing to zod you will find:</p><pre><code>from pydantic import BaseModel, Field\n\nclass Invoice(BaseModel):\n    vendor: str\n    total: float = Field(gt=0)\n    currency: str = "USD"\n\ninv = Invoice.model_validate(data)</code></pre><p>The mapping is nearly one to one: <code>z.object</code> is a class extending <code>BaseModel</code>, <code>z.string().min(1)</code> is <code>Field(min_length=1)</code>, <code>schema.parse</code> is <code>model_validate</code>, and <code>safeParse</code> is the same method wrapped in <code>try/except ValidationError</code>.</p><h4>Dataclasses</h4><p>If you only need a data container without validation, <code>@dataclass</code> is enough. It is a plain TypeScript interface: it describes the shape but polices nothing at runtime. Reach for pydantic wherever data arrives from outside - a user, an HTTP call or a model.</p>'
        },
        pro: {
          pl: '<p>Pydantic v2 ma rdzeń w Ruście i jest 5-20 razy szybszy od v1. W kodzie AI pełni trzy role naraz: waliduje wyjście modelu, konwertuje typy i generuje JSON Schema, które wysyłasz jako definicję narzędzia.</p><h4>Jeden model, całe tool calling</h4><pre><code>from pydantic import BaseModel, Field\nfrom typing import Literal\n\nclass SearchDocs(BaseModel):\n    query: str = Field(description="Natural language question")\n    top_k: int = Field(default=5, ge=1, le=50)\n    scope: Literal["docs", "code", "tickets"] = "docs"\n\ntool = {\n    "name": "search_docs",\n    "description": "Search internal documentation",\n    "input_schema": SearchDocs.model_json_schema(),\n}\nargs = SearchDocs.model_validate(tool_use.input)</code></pre><p>Ten sam obiekt opisuje kontrakt dla modelu i pilnuje go po powrocie. Bez tego dryf między prompem a parserem jest kwestią tygodni. <code>description</code> w <code>Field</code> trafia prosto do JSON Schema i jest realnie czytane przez model - traktuj je jak dokumentację API, nie jak komentarz.</p><h4>Pętla naprawcza</h4><p>Przy strukturalnym wyjściu odsetek błędów walidacji przy dobrze opisanym schemacie to zwykle 1-5 procent. Standardowy wzorzec to jedna próba naprawy:</p><pre><code>try:\n    return Invoice.model_validate_json(raw)\nexcept ValidationError as e:\n    repair = f"Your JSON failed validation:\\n{e.json()}\\nReturn corrected JSON only."\n    ...</code></pre><p><code>e.errors()</code> zwraca listę słowników ze ścieżką pola i typem błędu - to gotowy, maszynowy feedback dla modelu, o wiele lepszy niż odesłanie samego stringa wyjątku.</p><h4>Pułapki</h4><ul><li><strong>Koercja</strong>: w trybie domyślnym string "5" wjedzie do pola <code>int</code>. Gdy potrzebujesz surowości, użyj <code>model_config = ConfigDict(strict=True)</code>.</li><li><strong>Pieniądze</strong>: <code>float</code> przy kwotach to klasyczny błąd, użyj <code>condecimal</code> lub <code>Decimal</code>.</li><li><strong>Nadmiarowe pola</strong>: domyślnie są ignorowane. Ustaw <code>extra="forbid"</code>, żeby wykryć halucynowane klucze zamiast je cicho gubić.</li><li><strong>Optional to nie default</strong>: <code>x: str | None</code> nadal jest polem wymaganym, tyle że może być None. Dopiero <code>= None</code> czyni je opcjonalnym.</li><li><strong>Zagnieżdżenie</strong>: modele głębsze niż 3-4 poziomy wyraźnie podnoszą odsetek błędów w wyjściu modelu. Spłaszczaj.</li></ul><h4>mypy w trybie łagodnym</h4><p>Nie włączaj <code>strict</code> w istniejącym repozytorium - dostaniesz tysiąc błędów i wyłączysz go po dniu. Zacznij od domyślnych ustawień i <code>disallow_untyped_defs</code> tylko dla nowych modułów, dokładnie tak, jak migruje się JS do TS.</p>',
          en: '<p>Pydantic v2 has a Rust core and is 5-20 times faster than v1. In AI code it plays three roles at once: it validates model output, coerces types and generates the JSON Schema you ship as a tool definition.</p><h4>One model, the whole tool-calling contract</h4><pre><code>from pydantic import BaseModel, Field\nfrom typing import Literal\n\nclass SearchDocs(BaseModel):\n    query: str = Field(description="Natural language question")\n    top_k: int = Field(default=5, ge=1, le=50)\n    scope: Literal["docs", "code", "tickets"] = "docs"\n\ntool = {\n    "name": "search_docs",\n    "description": "Search internal documentation",\n    "input_schema": SearchDocs.model_json_schema(),\n}\nargs = SearchDocs.model_validate(tool_use.input)</code></pre><p>The same object describes the contract for the model and enforces it on the way back. Without that, drift between prompt and parser is a matter of weeks. The <code>description</code> inside <code>Field</code> lands directly in the JSON Schema and is genuinely read by the model - treat it as API documentation, not as a comment.</p><h4>The repair loop</h4><p>With structured output and a well-described schema, validation failure rates typically sit at 1-5 percent. The standard pattern is a single repair attempt:</p><pre><code>try:\n    return Invoice.model_validate_json(raw)\nexcept ValidationError as e:\n    repair = f"Your JSON failed validation:\\n{e.json()}\\nReturn corrected JSON only."\n    ...</code></pre><p><code>e.errors()</code> returns a list of dicts with the field path and error type - ready-made machine feedback for the model, far better than echoing the exception string.</p><h4>Pitfalls</h4><ul><li><strong>Coercion</strong>: in default mode the string "5" happily fills an <code>int</code> field. When you need rigour, set <code>model_config = ConfigDict(strict=True)</code>.</li><li><strong>Money</strong>: using <code>float</code> for amounts is the classic bug; use <code>condecimal</code> or <code>Decimal</code>.</li><li><strong>Extra fields</strong>: ignored by default. Set <code>extra="forbid"</code> so hallucinated keys surface instead of vanishing silently.</li><li><strong>Optional is not a default</strong>: <code>x: str | None</code> is still required, it may just be None. Only <code>= None</code> makes it optional.</li><li><strong>Nesting</strong>: models deeper than 3-4 levels measurably raise model output error rates. Flatten them.</li></ul><h4>mypy in gentle mode</h4><p>Do not switch on <code>strict</code> in an existing repo - you will get a thousand errors and disable it within a day. Start with defaults plus <code>disallow_untyped_defs</code> for new modules only, exactly how you migrate a JS codebase to TS.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Która biblioteka Pythona jest najbliższym odpowiednikiem zod?',
            en: 'Which Python library is the closest counterpart of zod?'
          },
          options: [
            { pl: 'pytest', en: 'pytest' },
            { pl: 'pydantic', en: 'pydantic' },
            { pl: 'httpx', en: 'httpx' },
            { pl: 'ruff', en: 'ruff' }
          ],
          correct: 1,
          explain: {
            pl: 'Pydantic waliduje dane w czasie działania na podstawie deklaracji klasy i potrafi wygenerować z niej JSON Schema - dokładnie zestaw ról, który w TypeScripcie pełni zod.',
            en: 'Pydantic validates data at runtime from a class declaration and can emit JSON Schema from it - exactly the set of roles zod plays in TypeScript.'
          }
        },
        {
          q: {
            pl: 'Co dzieje się z adnotacją typu def f(x: int) podczas normalnego uruchomienia programu?',
            en: 'What happens to the annotation in def f(x: int) during a normal program run?'
          },
          options: [
            { pl: 'Python rzuca TypeError, gdy przekażesz string', en: 'Python raises a TypeError when you pass a string' },
            { pl: 'Python konwertuje argument na int', en: 'Python converts the argument to an int' },
            { pl: 'Interpreter ignoruje adnotację, sprawdza ją dopiero mypy lub pyright', en: 'The interpreter ignores it; mypy or pyright checks it separately' },
            { pl: 'Adnotacja jest sprawdzana tylko w trybie debug', en: 'It is only checked in debug mode' }
          ],
          correct: 2,
          explain: {
            pl: 'Type hints to metadane, nie kontrola wykonania - relacja jak tsc do skompilowanego JavaScriptu. Runtime dokłada dopiero pydantic albo ręczna walidacja.',
            en: 'Type hints are metadata, not runtime enforcement - the same relationship tsc has with compiled JavaScript. Runtime checking comes from pydantic or manual validation.'
          }
        },
        {
          q: {
            pl: 'Po co wywoływać model_json_schema na modelu pydantic w kodzie agenta?',
            en: 'Why call model_json_schema on a pydantic model in agent code?'
          },
          options: [
            { pl: 'Żeby wygenerować definicję narzędzia wysyłaną do modelu', en: 'To generate the tool definition sent to the model' },
            { pl: 'Żeby przyspieszyć walidację przez kompilację schematu', en: 'To speed up validation by compiling the schema' },
            { pl: 'Żeby zapisać model w bazie danych', en: 'To persist the model into a database' },
            { pl: 'Żeby wymusić sprawdzanie typów przez mypy', en: 'To force mypy to check the types' }
          ],
          correct: 0,
          explain: {
            pl: 'Ten sam obiekt opisuje kontrakt dla modelu i waliduje odpowiedź po powrocie, więc prompt i parser nie mogą się rozjechać. To pydantikowy odpowiednik zod-to-json-schema.',
            en: 'The same object describes the contract for the model and validates the response on the way back, so prompt and parser cannot drift apart. It is the pydantic version of zod-to-json-schema.'
          }
        },
        {
          q: {
            pl: 'Model zwraca fakturę z polem total_amount zamiast total oraz dodatkowym polem confidence. Walidacja przechodzi, ale total jest zawsze zerem. Co ustawić, żeby wykryć problem?',
            en: 'The model returns an invoice with total_amount instead of total plus an extra confidence field. Validation passes but total is always zero. What setting surfaces the problem?'
          },
          options: [
            { pl: 'strict=True, żeby zablokować koercję stringów na liczby', en: 'strict=True, to block string-to-number coercion' },
            { pl: 'Zamiana float na Decimal w polu total', en: 'Switching total from float to Decimal' },
            { pl: 'extra="forbid", żeby nieznane pola powodowały błąd walidacji', en: 'extra="forbid", so unknown fields raise a validation error' },
            { pl: 'Włączenie mypy w trybie strict', en: 'Turning on mypy in strict mode' }
          ],
          correct: 2,
          explain: {
            pl: 'Domyślnie pydantic po cichu ignoruje nadmiarowe klucze, więc literówka w nazwie pola wygląda jak brak danych, a nie jak błąd. Z extra="forbid" halucynowana nazwa natychmiast wywołuje ValidationError, którą można oddać modelowi do naprawy.',
            en: 'By default pydantic silently drops unknown keys, so a renamed field looks like missing data rather than an error. With extra="forbid" the hallucinated name raises a ValidationError immediately, which you can feed back for repair.'
          }
        }
      ]
    },
    {
      id: 'scripts-notebooks',
      title: {
        pl: 'Skrypty i notebooki: kiedy co wybrać',
        en: 'Scripts and notebooks: choosing between them'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="p8a5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="180" y="16" width="280" height="48" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="46" text-anchor="middle" font-size="15" fill="var(--text)">new piece of Python work</text>' +
          '<rect x="140" y="108" width="360" height="54" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="132" text-anchor="middle" font-size="14" fill="var(--accent)">Exploring data, looking at output</text>' +
          '<text x="320" y="152" text-anchor="middle" font-size="14" fill="var(--accent)">over and over?</text>' +
          '<rect x="20" y="220" width="250" height="72" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="145" y="250" text-anchor="middle" font-size="15" fill="var(--accent2)">yes: notebook</text>' +
          '<text x="145" y="272" text-anchor="middle" font-size="13" fill="var(--muted)">uv run --with jupyter</text>' +
          '<rect x="370" y="220" width="250" height="72" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="495" y="250" text-anchor="middle" font-size="15" fill="var(--ok)">no: script.py</text>' +
          '<text x="495" y="272" text-anchor="middle" font-size="13" fill="var(--muted)">uv run, testable, in CI</text>' +
          '<g stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#p8a5)">' +
          '<line x1="320" y1="64" x2="320" y2="100"/>' +
          '<path d="M 220 162 L 180 162 L 180 212"/>' +
          '<path d="M 420 162 L 460 162 L 460 212"/>' +
          '<path d="M 145 292 L 145 340 L 480 340 L 480 300"/>' +
          '</g>' +
          '<text x="320" y="376" text-anchor="middle" font-size="13" fill="var(--muted)">promote anything stable into a module</text>' +
          '</svg>',
        caption: {
          pl: 'Notebook do eksploracji, skrypt do powtarzalności - a wszystko, co się ustabilizuje, przenosisz do modułu.',
          en: 'Notebook for exploring, script for repeatability - and anything that stabilises moves into a module.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie dwa rodzaje kuchni. Pierwsza to blat, przy którym eksperymentujesz: dosypujesz szczyptę, próbujesz łyżeczką, dosypujesz jeszcze raz. Wszystko stoi otwarte, wszystko można podnieść i powąchać.</p><p>Druga to przepis zapisany na kartce. Nie próbujesz go w trakcie. Podajesz komuś kartkę, a on robi dokładnie to samo danie co Ty, we wtorek, o siódmej rano, bez Twojej obecności.</p><p>Notebook to blat do eksperymentów. Uruchamiasz mały kawałek kodu, patrzysz na wynik, poprawiasz, uruchamiasz znowu. Świetne, kiedy nie wiesz jeszcze, czego szukasz.</p><p>Skrypt to kartka z przepisem. Robi jedną rzecz, zawsze tak samo, od początku do końca, i może ją wykonać maszyna w środku nocy.</p><p>Prawdziwa sztuka to wiedzieć, kiedy przepisać coś z blatu na kartkę. Bo blat na dłuższą metę robi się bardzo, bardzo brudny.</p>',
          en: '<p>Picture two kinds of kitchen. The first is a countertop where you experiment: add a pinch, taste with a spoon, add another pinch. Everything is open, everything can be picked up and sniffed.</p><p>The second is a recipe written on a card. You do not taste it midway. You hand the card to someone and they produce exactly your dish, on Tuesday, at seven in the morning, without you in the room.</p><p>A notebook is the experimenting countertop. You run a small piece of code, look at the result, adjust, run again. Wonderful when you do not yet know what you are looking for.</p><p>A script is the recipe card. It does one thing, always the same way, start to finish, and a machine can run it in the middle of the night.</p><p>The real skill is knowing when to copy something from the counter onto a card. Because a countertop, over time, gets very, very messy.</p>'
        },
        school: {
          pl: '<p>Notebook Jupytera to plik <code>.ipynb</code>: ciąg komórek z kodem, które uruchamiasz w dowolnej kolejności, a wynik ostatniego wyrażenia wyświetla się pod spodem. Najbliższa analogia z Twojego świata to konsola DevTools albo CodeSandbox - stan żyje między uruchomieniami.</p><h4>Do czego naprawdę służy</h4><p>Notebook wygrywa, kiedy pętla zwrotna jest ważniejsza niż porządek: sprawdzasz, jak wygląda 20 chunków po zmianie strategii dzielenia, oglądasz rozkład podobieństw kosinusowych, porównujesz odpowiedzi dwóch promptów obok siebie. Wolno załadować embeddingi raz i mielić je przez godzinę bez ponownego liczenia.</p><h4>Gdzie przegrywa</h4><ul><li><strong>Ukryty stan</strong>. Komórka usunięta z widoku nadal działa w pamięci. Kod, który u Ciebie chodzi, po restarcie kernela wysypuje się u kolegi.</li><li><strong>Diff w gicie</strong>. Plik ipynb to JSON z wynikami i metadanymi, więc review pull requesta jest nieczytelne.</li><li><strong>Testy i CI</strong>. Notebooka nie zaimportujesz jak modułu i nie odpalisz sensownie w pipeline.</li></ul><h4>Skrypt to domyślny wybór</h4><pre><code># /// script\n# dependencies = ["httpx", "anthropic"]\n# ///\nimport httpx\n\nif __name__ == "__main__":\n    print(httpx.get("https://example.com").status_code)</code></pre><p>Blok komentarza na górze to standard PEP 723: <code>uv run script.py</code> sam utworzy środowisko z tymi zależnościami. Jeden plik, zero konfiguracji, działa u każdego, kto ma uv - odpowiednik jednorazowego <code>npx</code>.</p><p>Warunek <code>if __name__ == "__main__"</code> to sposób, żeby plik dało się zarówno uruchomić, jak i zaimportować bez efektów ubocznych.</p>',
          en: '<p>A Jupyter notebook is an <code>.ipynb</code> file: a sequence of code cells you can run in any order, with the last expression rendered underneath. The closest analogy from your world is the DevTools console or CodeSandbox - state survives between runs.</p><h4>What it is actually for</h4><p>Notebooks win when the feedback loop matters more than tidiness: inspecting 20 chunks after changing the splitting strategy, eyeballing a distribution of cosine similarities, comparing two prompts side by side. You can load embeddings once and grind on them for an hour without recomputing.</p><h4>Where they lose</h4><ul><li><strong>Hidden state</strong>. A cell deleted from view still lives in memory. Code that runs for you dies on a colleague machine after a kernel restart.</li><li><strong>Git diffs</strong>. An ipynb is JSON with outputs and metadata, which makes pull request review unreadable.</li><li><strong>Tests and CI</strong>. You cannot import a notebook as a module or run it meaningfully in a pipeline.</li></ul><h4>Scripts are the default</h4><pre><code># /// script\n# dependencies = ["httpx", "anthropic"]\n# ///\nimport httpx\n\nif __name__ == "__main__":\n    print(httpx.get("https://example.com").status_code)</code></pre><p>The comment block on top is the PEP 723 standard: <code>uv run script.py</code> creates an environment with those dependencies for you. One file, zero config, works for anyone with uv - the equivalent of a throwaway <code>npx</code>.</p><p>The <code>if __name__ == "__main__"</code> guard is how a file can be both executed and imported without side effects.</p>'
        },
        pro: {
          pl: '<p>Praktyczna reguła: notebook to narzędzie do myślenia, skrypt to artefakt. Jeśli coś zostanie uruchomione po raz trzeci albo przez kogoś innego, przenieś to do modułu.</p><h4>Workflow, który działa w zespole</h4><p>Eksploracja w notebooku, potem ekstrakcja funkcji do <code>src/pipeline/chunking.py</code>, a notebook zostaje jako cienka warstwa demonstracyjna importująca ten moduł. Dzięki temu logika jest testowalna pytestem, a wykresy nadal masz pod ręką. Pilnuj tylko <code>%load_ext autoreload</code> i <code>%autoreload 2</code>, inaczej edytujesz plik i nie widzisz zmian.</p><h4>Higiena notebooków w gicie</h4><ul><li><strong>nbstripout</strong> jako hook pre-commit czyści outputy - diff spada z tysięcy linii JSON do kilkudziesięciu linii kodu.</li><li><strong>jupytext</strong> paruje ipynb z czytelnym plikiem <code>.py</code>, który realnie da się zreviewować.</li><li>Nigdy nie trzymaj sekretów w komórkach. Klucz API wklejony do notebooka trafia do outputów, do gita i do zrzutów ekranu na Slacku.</li><li>Notebook z osadzonym obrazkiem potrafi ważyć 20-50 MB; repozytoria puchną szybciej, niż ktokolwiek zauważy.</li></ul><h4>Jednoplikowe skrypty PEP 723</h4><p>To jest zdecydowanie najbardziej niedoceniana funkcja uv. Skrypt ewaluacyjny z zależnościami w nagłówku odpalasz jednym poleceniem, bez tworzenia projektu:</p><pre><code>uv run --with anthropic --with pandas eval_prompts.py</code></pre><p>Albo z przypiętymi wersjami w samym pliku, dzięki czemu wynik jest odtwarzalny za pół roku. To dokładnie ten sam ruch, co uruchomienie narzędzia przez <code>npx</code> zamiast dodawania go do package.json.</p><h4>Odtwarzalność w evalach</h4><p>Kiedy notebook produkuje liczby, które trafiają do decyzji biznesowej, obowiązuje ten sam standard co w CI: przypięte wersje, ustawiony seed, zapisany identyfikator modelu wraz z datą, dane wejściowe z konkretnego commita. Model za trzy miesiące odpowie inaczej, a bez tych metadanych nie odróżnisz regresji od zmiany po stronie dostawcy. Wyniki eksperymentu zapisuj do pliku JSONL i wersjonuj, zamiast zostawiać je w outputach komórek.</p><h4>Na rozmowie</h4><p>Pytanie brzmi zwykle: jak przenosisz eksperyment do produkcji. Dobra odpowiedź opisuje ścieżkę - notebook, ekstrakcja modułu, testy pytest, eval w CI - a nie deklarację, że notebooki są złe.</p>',
          en: '<p>Practical rule: a notebook is a thinking tool, a script is an artefact. If something is run a third time, or by somebody else, move it into a module.</p><h4>A workflow that survives a team</h4><p>Explore in the notebook, extract functions into <code>src/pipeline/chunking.py</code>, and let the notebook remain a thin demo layer importing that module. The logic becomes pytest-testable while the plots stay at hand. Just remember <code>%load_ext autoreload</code> and <code>%autoreload 2</code>, otherwise you edit the file and see nothing change.</p><h4>Notebook hygiene in git</h4><ul><li><strong>nbstripout</strong> as a pre-commit hook strips outputs - the diff drops from thousands of JSON lines to a few dozen lines of code.</li><li><strong>jupytext</strong> pairs an ipynb with a readable <code>.py</code> file that can genuinely be reviewed.</li><li>Never keep secrets in cells. An API key pasted into a notebook ends up in outputs, in git and in Slack screenshots.</li><li>A notebook with embedded images can weigh 20-50 MB; repositories bloat faster than anyone notices.</li></ul><h4>Single-file PEP 723 scripts</h4><p>This is easily the most underrated uv feature. An eval script with dependencies in its header runs with one command, no project scaffolding:</p><pre><code>uv run --with anthropic --with pandas eval_prompts.py</code></pre><p>Or with versions pinned inside the file itself, so the result is reproducible half a year later. It is exactly the move of running a tool through <code>npx</code> instead of adding it to package.json.</p><h4>Reproducibility in evals</h4><p>When a notebook produces numbers that feed a business decision, the CI standard applies: pinned versions, a fixed seed, the model id recorded together with the date, inputs from a specific commit. The model will answer differently in three months, and without that metadata you cannot tell a regression from a provider-side change. Write experiment results to a JSONL file and version it rather than leaving them in cell outputs.</p><h4>In interviews</h4><p>The question is usually: how do you get an experiment into production. A good answer describes the path - notebook, module extraction, pytest, eval in CI - not a declaration that notebooks are bad.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Do czego notebook Jupytera nadaje się najlepiej?',
            en: 'What are Jupyter notebooks best suited for?'
          },
          options: [
            { pl: 'Do zadania cron uruchamianego co noc w produkcji', en: 'A nightly cron job running in production' },
            { pl: 'Do eksploracji danych z szybką pętlą zwrotną', en: 'Exploring data with a fast feedback loop' },
            { pl: 'Do publikowania biblioteki na PyPI', en: 'Publishing a library to PyPI' },
            { pl: 'Do przechowywania kluczy API zespołu', en: 'Storing the team API keys' }
          ],
          correct: 1,
          explain: {
            pl: 'Notebook trzyma stan między uruchomieniami komórek, więc pozwala załadować dane raz i eksperymentować bez przeliczania. Do powtarzalnych uruchomień służy skrypt.',
            en: 'A notebook keeps state between cell runs, so you can load data once and experiment without recomputing. Repeatable execution belongs in a script.'
          }
        },
        {
          q: {
            pl: 'Co robi blok komentarza z sekcją script i dependencies na początku pliku .py?',
            en: 'What does the comment block with a script section and dependencies at the top of a .py file do?'
          },
          options: [
            { pl: 'Deklaruje zależności zgodnie z PEP 723, żeby uv run samo zbudowało środowisko', en: 'Declares dependencies per PEP 723 so uv run builds the environment itself' },
            { pl: 'Konfiguruje mypy dla tego pliku', en: 'Configures mypy for that file' },
            { pl: 'Instaluje paczki globalnie przy pierwszym uruchomieniu', en: 'Installs the packages globally on first run' },
            { pl: 'Włącza tryb notebooka dla skryptu', en: 'Enables notebook mode for the script' }
          ],
          correct: 0,
          explain: {
            pl: 'To standard metadanych inline: uv czyta nagłówek, tworzy efemeryczne środowisko i uruchamia plik. Jeden samowystarczalny skrypt bez pyproject.toml, odpowiednik npx.',
            en: 'It is the inline metadata standard: uv reads the header, creates an ephemeral environment and runs the file. One self-contained script with no pyproject.toml, the npx equivalent.'
          }
        },
        {
          q: {
            pl: 'Dlaczego notebooki są uciążliwe w code review?',
            en: 'Why are notebooks painful in code review?'
          },
          options: [
            { pl: 'Bo git nie potrafi ich w ogóle wersjonować', en: 'Because git cannot version them at all' },
            { pl: 'Bo plik ipynb to JSON z outputami i metadanymi, więc diff jest nieczytelny', en: 'Because an ipynb is JSON with outputs and metadata, making diffs unreadable' },
            { pl: 'Bo wymagają osobnego serwera do otwarcia', en: 'Because they need a dedicated server to open' },
            { pl: 'Bo GitHub blokuje pliki większe niż 1 MB', en: 'Because GitHub blocks files larger than 1 MB' }
          ],
          correct: 1,
          explain: {
            pl: 'Zmiana jednej linii kodu potrafi wygenerować setki linii diffa w outputach i numerach wykonania komórek. Hook nbstripout albo parowanie przez jupytext rozwiązuje to w praktyce.',
            en: 'Changing one line of code can produce hundreds of diff lines in outputs and execution counts. An nbstripout hook or jupytext pairing solves it in practice.'
          }
        },
        {
          q: {
            pl: 'Notebook z ewaluacją promptów dał 82 procent trafności w marcu. W czerwcu ten sam notebook daje 71 procent. Czego brak najbardziej utrudnia diagnozę?',
            en: 'A prompt evaluation notebook reported 82 percent accuracy in March. In June the same notebook reports 71 percent. What missing thing hurts the diagnosis most?'
          },
          options: [
            { pl: 'Wykresów rozkładu wyników', en: 'Charts of the score distribution' },
            { pl: 'Uruchamiania komórek w kolejności od góry do dołu', en: 'Running the cells top to bottom' },
            { pl: 'Zapisanego identyfikatora modelu, wersji bibliotek, seeda i commita danych', en: 'A recorded model id, library versions, seed and data commit' },
            { pl: 'Większej liczby przykładów w zbiorze testowym', en: 'More examples in the test set' }
          ],
          correct: 2,
          explain: {
            pl: 'Bez przypiętych metadanych nie odróżnisz regresji swojego prompta od zmiany wersji modelu po stronie dostawcy ani od podmienionego zbioru testowego. Wyniki eksperymentów zapisuj do wersjonowanego pliku JSONL razem z tymi polami.',
            en: 'Without pinned metadata you cannot separate a regression in your prompt from a provider-side model change or a swapped test set. Write experiment results to a versioned JSONL file including those fields.'
          }
        }
      ]
    }
  ]
}
