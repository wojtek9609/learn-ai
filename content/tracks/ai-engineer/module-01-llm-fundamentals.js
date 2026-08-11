// Module 01 - LLM Fundamentals
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema").

export default {
  id: 'llm-fundamentals',
  order: 1,
  icon: '🧠',
  title: {
    pl: 'Fundamenty LLM',
    en: 'LLM Fundamentals'
  },
  description: {
    pl: 'Jak naprawdę dziala model jezykowy: przewidywanie tokenow, okno kontekstu, embeddingi, parametry losowosci oraz koszt, latencja i cache.',
    en: 'How a language model actually works: next-token prediction, tokenization, context windows, embeddings, sampling parameters, and cost, latency and caching.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'how-llms-work',
      title: {
        pl: 'Jak dzialaja modele jezykowe',
        en: 'How LLMs actually work'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m1arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="30" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="110" y="60" text-anchor="middle" font-size="15" fill="var(--text)">Text so far</text>' +
          '<text x="110" y="82" text-anchor="middle" font-size="14" fill="var(--muted)">The cat sat on the</text>' +
          '<line x1="200" y1="65" x2="255" y2="65" stroke="var(--accent)" stroke-width="2" marker-end="url(#m1arrow)"/>' +
          '<rect x="260" y="20" width="140" height="90" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="330" y="55" text-anchor="middle" font-size="15" fill="var(--text)">Model</text>' +
          '<text x="330" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">frozen weights</text>' +
          '<line x1="400" y1="65" x2="455" y2="65" stroke="var(--accent)" stroke-width="2" marker-end="url(#m1arrow)"/>' +
          '<text x="548" y="35" text-anchor="middle" font-size="14" fill="var(--muted)">Probabilities</text>' +
          '<rect x="470" y="48" width="120" height="18" rx="4" fill="var(--accent2)"/>' +
          '<text x="476" y="62" font-size="13" fill="var(--text)">mat 0.61</text>' +
          '<rect x="470" y="72" width="70" height="18" rx="4" fill="var(--accent2)" opacity="0.7"/>' +
          '<text x="476" y="86" font-size="13" fill="var(--text)">floor 0.19</text>' +
          '<rect x="470" y="96" width="34" height="18" rx="4" fill="var(--accent2)" opacity="0.45"/>' +
          '<text x="510" y="110" font-size="13" fill="var(--muted)">roof 0.06</text>' +
          '<rect x="200" y="180" width="240" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="208" text-anchor="middle" font-size="15" fill="var(--text)">Sample one token</text>' +
          '<text x="320" y="230" text-anchor="middle" font-size="13" fill="var(--muted)">dice roll, not a lookup</text>' +
          '<line x1="530" y1="120" x2="440" y2="205" stroke="var(--accent)" stroke-width="2" marker-end="url(#m1arrow)"/>' +
          '<path d="M 200 213 L 110 213 L 110 105" fill="none" stroke="var(--warn)" stroke-width="2" marker-end="url(#m1arrow)"/>' +
          '<text x="120" y="160" font-size="14" fill="var(--warn)">append and repeat</text>' +
          '<rect x="60" y="300" width="520" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--text)">One forward pass = one token</text>' +
          '<text x="320" y="352" text-anchor="middle" font-size="13" fill="var(--muted)">no memory between calls, no database lookup, no truth check</text>' +
          '</svg>',
        caption: {
          pl: 'Petla generowania: model liczy rozklad prawdopodobienstwa nad tokenami, jeden token jest losowany, dopisywany do tekstu i wszystko leci od nowa.',
          en: 'The generation loop: the model scores a probability distribution over tokens, one token is sampled, appended to the text, and the whole pass runs again.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie autouzupelnianie w klawiaturze telefonu, ale takie, ktore przeczytalo pol internetu. Piszesz poczatek zdania, a ono podpowiada, co pasuje dalej. LLM robi dokladnie to samo, tylko duzo, duzo lepiej.</p>' +
            '<p>Model nigdy nie <em>pamieta</em> rozmowy tak, jak pamieta ja czlowiek. Za kazdym razem dostaje caly tekst od poczatku i odpowiada na jedno pytanie: <strong>jaki kawalek slowa pasuje teraz najlepiej?</strong> Wybiera jeden, dokleja go i pyta znowu. I znowu. Az uzna, ze koniec.</p>' +
            '<p>Dlatego model potrafi napisac cos, co brzmi madrze, ale jest zmyslone. On nie sprawdza, czy to prawda - on sprawdza, czy to <em>brzmi jak dobra kontynuacja</em>. To troche jak kolega, ktory zawsze ma odpowiedz, bo nie znosi ciszy. Czesto trafia, bo duzo przeczytal. Czasem strzela, bo strzelanie to jego caly zawod.</p>',
          en: '<p>Picture the autocomplete on your phone keyboard, except this one has read half the internet. You type the start of a sentence and it suggests what comes next. An LLM does exactly that, just enormously better.</p>' +
            '<p>The model never <em>remembers</em> your chat the way a person does. Every single time it gets the whole text from the beginning and answers one question: <strong>which chunk of a word fits best right now?</strong> It picks one, glues it on, and asks again. And again. Until it decides it is done.</p>' +
            '<p>That is why it can write something that sounds smart but is invented. It is not checking whether the sentence is true - it is checking whether it <em>sounds like a good continuation</em>. A bit like the friend who always has an answer because he hates silence. He is right a lot, because he has read a lot. Sometimes he guesses, because guessing is the entire job.</p>'
        },
        school: {
          pl: '<p>Model jezykowy to funkcja: bierze ciag tokenow (kawalkow tekstu) i zwraca rozklad prawdopodobienstwa nad wszystkimi tokenami w slowniku - zwykle 50-200 tysiecy pozycji. Jeden przebieg sieci daje jeden token. Zeby dostac akapit, ten przebieg powtarza sie kilkaset razy, za kazdym razem z tekstem wydluzonym o poprzedni token. To sie nazywa <strong>autoregresja</strong>.</p>' +
            '<h4>Trening vs inferencja</h4>' +
            '<p><strong>Trening</strong> to jednorazowy, potwornie drogi proces (miesiace, dziesiatki tysiecy GPU), w ktorym wagi modelu sa dostrajane tak, by przewidywanie nastepnego tokena bylo jak najtrafniejsze. <strong>Inferencja</strong> to to, co robisz przez API: wagi sa zamrozone i nic sie w nich nie zmienia. Model nie uczy sie z twojego promptu.</p>' +
            '<p>W kodzie petla wyglada tak prosto:</p>' +
            '<pre><code>tokens = encode(prompt)\nwhile not done:\n    probs = model(tokens)   // rozklad nad slownikiem\n    next = sample(probs)    // losowanie\n    tokens.append(next)</code></pre>' +
            '<h4>Skad on to wie</h4>' +
            '<p>Wiedza siedzi w wagach jako statystyczne wzorce z danych treningowych, a nie jako baza faktow z indeksem. Nie ma tam wiersza w tabeli, ktory mozna sprawdzic. Dlatego <strong>halucynacja</strong> nie jest bugiem do naprawienia - to ten sam mechanizm, ktory daje kreatywnosc, tylko uzyty tam, gdzie model nie ma pokrycia w danych. Model zawsze zwroci jakis rozklad, nawet gdy nic sensownego nie wie; nie ma wbudowanego stanu "nie wiem".</p>' +
            '<p>Praktyczny wniosek: jesli odpowiedz ma byc oparta na faktach, fakty musisz <em>wlozyc do promptu</em> (to jest RAG) albo dac modelowi narzedzie, ktore je sprawdzi.</p>',
          en: '<p>A language model is a function: it takes a sequence of tokens (chunks of text) and returns a probability distribution over every token in its vocabulary - typically 50,000 to 200,000 entries. One pass through the network produces one token. To get a paragraph, that pass repeats a few hundred times, each time with the text extended by the previous token. This is called <strong>autoregression</strong>.</p>' +
            '<h4>Training vs inference</h4>' +
            '<p><strong>Training</strong> is a one-off, brutally expensive process (months, tens of thousands of GPUs) that tunes the weights so next-token prediction gets as accurate as possible. <strong>Inference</strong> is what you do over the API: the weights are frozen and nothing about them changes. The model does not learn from your prompt.</p>' +
            '<p>In code the loop is almost embarrassingly simple:</p>' +
            '<pre><code>tokens = encode(prompt)\nwhile not done:\n    probs = model(tokens)   // distribution over vocab\n    next = sample(probs)    // random draw\n    tokens.append(next)</code></pre>' +
            '<h4>Why it "knows" things</h4>' +
            '<p>Knowledge lives in the weights as statistical patterns from training data, not as a fact table with an index. There is no row you could go and verify. That is why a <strong>hallucination</strong> is not a bug waiting for a patch - it is the same machinery that gives you creativity, applied where the model has no real coverage. The model always returns some distribution, even when it knows nothing useful; there is no built-in "I do not know" state.</p>' +
            '<p>The practical takeaway: if an answer must be grounded in facts, you have to <em>put the facts in the prompt</em> (that is RAG) or give the model a tool that can look them up.</p>'
        },
        pro: {
          pl: '<p>Traktuj wywolanie LLM jak <strong>bezstanowa funkcje HTTP</strong>: <code>f(tokens) -> logits</code>. Stan rozmowy jest po twojej stronie, nie po stronie modelu. To najwazniejszy model mentalny, bo prostuje polowe nieporozumien: model nie "zapamietal" poprzedniej wiadomosci - ty ja ponownie wyslales.</p>' +
            '<h4>Co sie dzieje w srodku wywolania</h4>' +
            '<ul>' +
            '<li><strong>Prefill</strong> - caly prompt idzie przez siec rownolegle. Koszt rosnie z dlugoscia wejscia i determinuje TTFT (time to first token, czas do pierwszego tokena).</li>' +
            '<li><strong>Decode</strong> - kolejne tokeny generowane sekwencyjnie, jeden na przebieg, wspomagane <strong>KV cache</strong> (zapamietane klucze i wartosci uwagi dla poprzednich tokenow). Stad asymetria: 10 tys. tokenow wejscia jest znacznie tansze i szybsze niz 10 tys. tokenow wyjscia.</li>' +
            '</ul>' +
            '<p>Wyjscie sieci to <strong>logity</strong> - nieznormalizowane wyniki. Softmax zamienia je w prawdopodobienstwa, a warstwa samplingu (temperature, top_p) wybiera token. Determinizm konczy sie na poziomie sprzetu: rownolegla redukcja zmiennoprzecinkowa na GPU nie jest laczna, wiec ta sama prosba potrafi dac inny wynik nawet przy temperaturze 0. Dlatego snapshoty testow na dokladny string sa krucha strategia - asertujesz na schemacie i wlasnosciach, nie na bajtach.</p>' +
            '<h4>Halucynacje w produkcji</h4>' +
            '<p>Model nie ma kalibrowanego sygnalu "nie wiem". Trzy dzwignie, ktore realnie dzialaja:</p>' +
            '<ol>' +
            '<li><strong>Grounding</strong> - wstrzykniesz kontekst i wymagasz cytowan z identyfikatorow, ktore sam podales; brak cytatu traktujesz jako blad walidacji.</li>' +
            '<li><strong>Structured output</strong> - wymuszony schemat (zod, JSON Schema) zamienia wolna proze na kontrakt, ktory da sie zwalidowac i ponowic.</li>' +
            '<li><strong>Weryfikacja narzedziem</strong> - liczby liczy kod, nie model. Tak jak w React nie liczysz sumy koszyka w JSX, tylko w warstwie domenowej.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 1024,\n  system: "Answer only from CONTEXT. If missing, reply NOT_FOUND.",\n  messages: [{ role: "user", content: prompt }]\n});\n// res.usage.input_tokens / res.usage.output_tokens -> loguj oba</code></pre>' +
            '<p><strong>Na rozmowie kwalifikacyjnej</strong> pytaja o to tak: dlaczego temperatura 0 nie daje pelnej powtarzalnosci, czym rozni sie prefill od decode i dlaczego fine-tuning uczy stylu oraz formatu, a nie swiezych faktow. Odpowiedz na to ostatnie: gradient rozmywa wiedze po wagach, wiec pojedynczy fakt widziany kilka razy nie staje sie niezawodnym rekordem - do faktow uzywasz retrievalu.</p>',
          en: '<p>Treat an LLM call as a <strong>stateless HTTP function</strong>: <code>f(tokens) -&gt; logits</code>. Conversation state lives on your side, not the model side. This one mental model kills half the confusion in the field: the model did not "remember" the previous message - you re-sent it.</p>' +
            '<h4>What happens inside a call</h4>' +
            '<ul>' +
            '<li><strong>Prefill</strong> - the whole prompt goes through the network in parallel. Cost scales with input length and it dominates TTFT (time to first token).</li>' +
            '<li><strong>Decode</strong> - output tokens generated sequentially, one per pass, accelerated by the <strong>KV cache</strong> (stored attention keys and values for earlier tokens). Hence the asymmetry: 10k input tokens are far cheaper and faster than 10k output tokens.</li>' +
            '</ul>' +
            '<p>The network emits <strong>logits</strong> - unnormalized scores. Softmax turns them into probabilities and a sampling layer (temperature, top_p) picks a token. Determinism breaks at the hardware level: parallel floating-point reduction on a GPU is not associative, so the same request can differ even at temperature 0. That is why exact-string snapshot tests are a fragile strategy - assert on schema and properties, not on bytes.</p>' +
            '<h4>Hallucinations in production</h4>' +
            '<p>The model has no calibrated "I do not know" signal. Three levers that actually work:</p>' +
            '<ol>' +
            '<li><strong>Grounding</strong> - inject the context and require citations to ids you supplied yourself; a missing citation becomes a validation failure.</li>' +
            '<li><strong>Structured output</strong> - an enforced schema (zod, JSON Schema) turns free prose into a contract you can validate and retry.</li>' +
            '<li><strong>Tool verification</strong> - arithmetic is done by code, not by the model. Same as in React: you do not sum the cart in JSX, you do it in the domain layer.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 1024,\n  system: "Answer only from CONTEXT. If missing, reply NOT_FOUND.",\n  messages: [{ role: "user", content: prompt }]\n});\n// res.usage.input_tokens / res.usage.output_tokens -&gt; log both</code></pre>' +
            '<p><strong>Interviewers</strong> probe this as: why temperature 0 is not fully reproducible, how prefill differs from decode, and why fine-tuning teaches style and format rather than fresh facts. The answer to the last one: gradients smear knowledge across weights, so a fact seen a handful of times never becomes a reliable record - for facts you use retrieval.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co model wylicza w jednym przebiegu sieci?',
            en: 'What does the model compute in a single forward pass?'
          },
          options: [
            { pl: 'Cala odpowiedz naraz', en: 'The entire answer at once' },
            { pl: 'Rozklad prawdopodobienstwa nad nastepnym tokenem', en: 'A probability distribution over the next token' },
            { pl: 'Zapytanie SQL do bazy wiedzy', en: 'A SQL query against a knowledge base' },
            { pl: 'Skrot (hash) promptu uzywany jako klucz cache', en: 'A hash of the prompt used as a cache key' }
          ],
          correct: 1,
          explain: {
            pl: 'Jeden przebieg = jeden rozklad nad slownikiem, z ktorego losowany jest jeden token. Dluga odpowiedz to setki takich przebiegow.',
            en: 'One pass gives one distribution over the vocabulary, from which one token is sampled. A long answer is hundreds of such passes.'
          }
        },
        {
          q: {
            pl: 'Wysylasz drugie pytanie w tej samej rozmowie. Co realnie dzieje sie po stronie API?',
            en: 'You send a second question in the same conversation. What actually happens at the API?'
          },
          options: [
            { pl: 'Serwer trzyma sesje i dokleja tylko nowa wiadomosc', en: 'The server holds a session and appends only the new message' },
            { pl: 'Model dotrenowuje sie na poprzedniej wymianie', en: 'The model fine-tunes itself on the previous exchange' },
            { pl: 'Poprzednie tokeny sa odczytywane z pamieci modelu', en: 'Earlier tokens are read back from the model memory' },
            { pl: 'Wysylasz cala historie od nowa jako tokeny wejsciowe', en: 'You resend the whole history as input tokens' }
          ],
          correct: 3,
          explain: {
            pl: 'API jest bezstanowe jak zwykly endpoint HTTP. Historia to po prostu dluzsze wejscie - i dlatego dluga rozmowa kosztuje coraz wiecej.',
            en: 'The API is stateless like any HTTP endpoint. History is simply a longer input - which is exactly why long chats get more expensive.'
          }
        },
        {
          q: {
            pl: 'Dlaczego halucynacje nazywa sie skutkiem ubocznym samego mechanizmu, a nie zwyklym bugiem?',
            en: 'Why are hallucinations called a side effect of the mechanism rather than an ordinary bug?'
          },
          options: [
            { pl: 'Bo model zawsze zwraca jakis rozklad, nawet bez pokrycia w danych', en: 'Because the model always returns some distribution, even with no support in the data' },
            { pl: 'Bo dane treningowe zawieraja wylacznie nieprawdziwe zdania', en: 'Because the training data consists only of false sentences' },
            { pl: 'Bo bledy pochodza z warstwy sieciowej i timeoutow', en: 'Because the errors come from the network layer and timeouts' },
            { pl: 'Bo temperatura zawsze jest ustawiona zbyt wysoko', en: 'Because temperature is always set too high' }
          ],
          correct: 0,
          explain: {
            pl: 'Nie ma wbudowanego stanu "nie wiem" - jest tylko rozklad nad tokenami. Ten sam mechanizm daje kreatywnosc i konfabulacje.',
            en: 'There is no built-in "I do not know" state, only a distribution over tokens. The same machinery yields both creativity and confabulation.'
          }
        },
        {
          q: {
            pl: 'Ustawiasz temperature 0 i te same wejscie, a odpowiedzi nadal roznia sie miedzy wywolaniami. Najbardziej prawdopodobna przyczyna?',
            en: 'You set temperature 0 with identical input, yet answers still differ across calls. Most likely cause?'
          },
          options: [
            { pl: 'Model dotrenowal sie na twoim poprzednim zapytaniu', en: 'The model fine-tuned itself on your previous request' },
            { pl: 'Bledy zaokraglen w rownoleglych obliczeniach GPU i routing miedzy wersjami sprzetu', en: 'Floating-point non-determinism in parallel GPU reduction plus routing across hardware versions' },
            { pl: 'Temperatura 0 oznacza losowanie z pelnego slownika', en: 'Temperature 0 means sampling from the full vocabulary' },
            { pl: 'Prompt caching zwraca zapisana starsza odpowiedz', en: 'Prompt caching returns a stored older answer' }
          ],
          correct: 1,
          explain: {
            pl: 'Temperatura 0 usuwa losowosc samplingu, ale nie niedeterminizm zmiennoprzecinkowy przy rownoleglej redukcji. Testuj wlasnosci i schemat, nie dokladny string.',
            en: 'Temperature 0 removes sampling randomness but not floating-point non-determinism in parallel reduction. Test properties and schema, not exact strings.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 2
    {
      id: 'tokenization',
      title: {
        pl: 'Tokenizacja: dlaczego model nie widzi liter',
        en: 'Tokenization: why the model cannot see letters'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="34" font-size="15" fill="var(--muted)">What you write</text>' +
          '<rect x="20" y="46" width="270" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="74" text-anchor="middle" font-size="16" fill="var(--text)">strawberry</text>' +
          '<line x1="155" y1="94" x2="155" y2="128" stroke="var(--accent)" stroke-width="2" marker-end="url(#m2arrow)"/>' +
          '<text x="330" y="34" font-size="15" fill="var(--muted)">What the model sees</text>' +
          '<rect x="20" y="132" width="80" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="60" y="160" text-anchor="middle" font-size="15" fill="var(--text)">str</text>' +
          '<rect x="110" y="132" width="80" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="150" y="160" text-anchor="middle" font-size="15" fill="var(--text)">aw</text>' +
          '<rect x="200" y="132" width="90" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="245" y="160" text-anchor="middle" font-size="15" fill="var(--text)">berry</text>' +
          '<text x="20" y="200" font-size="13" fill="var(--muted)">3 tokens, ids 496 / 675 / 15717</text>' +
          '<text x="330" y="160" font-size="14" fill="var(--warn)">no letter r</text>' +
          '<text x="330" y="182" font-size="14" fill="var(--warn)">is visible here</text>' +
          '<rect x="20" y="240" width="600" height="140" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="268" font-size="15" fill="var(--text)">Rough cost per 1000 characters</text>' +
          '<text x="40" y="296" font-size="14" fill="var(--muted)">English prose</text>' +
          '<rect x="230" y="284" width="120" height="16" rx="4" fill="var(--ok)"/>' +
          '<text x="360" y="297" font-size="13" fill="var(--muted)">about 250 tokens</text>' +
          '<text x="40" y="326" font-size="14" fill="var(--muted)">Polish prose</text>' +
          '<rect x="230" y="314" width="175" height="16" rx="4" fill="var(--warn)"/>' +
          '<text x="415" y="327" font-size="13" fill="var(--muted)">about 350 tokens</text>' +
          '<text x="40" y="356" font-size="14" fill="var(--muted)">JSON with ids</text>' +
          '<rect x="230" y="344" width="240" height="16" rx="4" fill="var(--err)"/>' +
          '<text x="480" y="357" font-size="13" fill="var(--muted)">about 480 tokens</text>' +
          '</svg>',
        caption: {
          pl: 'Tekst jest ciety na tokeny (kawalki slow) zanim dotrze do modelu. Ten sam tekst kosztuje inna liczbe tokenow w zaleznosci od jezyka i formatu.',
          en: 'Text is cut into tokens (chunks of words) before it reaches the model. The same text costs a different number of tokens depending on language and format.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Model nie czyta liter. Zanim tekst do niego dotrze, ktos tnie go na kawalki, troche jak batonik na kesy. Czasem kes to cale slowo, czasem koncowka, czasem trzy litery.</p>' +
            '<p>Slowo "truskawka" moze zostac pociete na trzy kesy. I teraz clou: kiedy pytasz model, ile jest liter "r" w slowie, on nie widzi liter. Widzi trzy kesy. To tak, jakbys probowal policzyc ziarenka maku, patrzac wylacznie na zdjecie calej bulki.</p>' +
            '<p>Dlatego model, ktory pieknie napisze esej, potrafi sie pomylic przy liczeniu liter albo odwracaniu slowa. To nie znaczy, ze jest glupi. To znaczy, ze pokazujesz mu zadanie w jednostkach, ktorych nie ma jak zobaczyc.</p>' +
            '<p>Ma to tez druga strone: za te kesy placisz. Im wiecej kesow, tym wiekszy rachunek.</p>',
          en: '<p>The model does not read letters. Before your text reaches it, something slices it into chunks, a bit like cutting a chocolate bar into bites. Sometimes a bite is a whole word, sometimes an ending, sometimes three letters.</p>' +
            '<p>The word "strawberry" might be cut into three bites. Here is the punchline: when you ask how many letter r it contains, the model does not see letters. It sees three bites. It is like counting poppy seeds while only ever looking at a photo of the whole bun.</p>' +
            '<p>So a model that writes a beautiful essay can still fumble counting letters or reversing a word. That does not mean it is stupid. It means you handed it a task in units it has no way of seeing.</p>' +
            '<p>There is a second side to this: you pay per bite. More bites, bigger bill.</p>'
        },
        school: {
          pl: '<p><strong>Tokenizacja</strong> to zamiana tekstu na liczby, ktore rozumie siec. Standardem jest <strong>BPE</strong> (Byte Pair Encoding - kodowanie par bajtow). Algorytm startuje od pojedynczych bajtow i wielokrotnie skleja najczestsza sasiadujaca pare w nowy symbol, az powstanie slownik zadanej wielkosci. Efekt: czeste slowa maja wlasny token, rzadkie rozpadaja sie na kawalki.</p>' +
            '<p>Kilka regul kciuka dla angielskiego: 1 token to okolo 4 znaki, czyli okolo 0,75 slowa. Strona A4 to mniej wiecej 500-700 tokenow. Polski wypada gorzej, bo tokenizery byly trenowane glownie na angielskim - ten sam tekst po polsku potrafi kosztowac 1,5-2 razy wiecej tokenow. Odmiana przez przypadki robi swoje: "kontenerach" to nie jeden symbol, tylko kilka.</p>' +
            '<h4>Slynny problem z truskawka</h4>' +
            '<p>Pytanie "ile r jest w strawberry" bywa trudne, bo model dostaje trzy tokeny, a nie dziesiec liter. Litery sa dla niego czyms, o czym musi wnioskowac posrednio, jak ty wnioskujesz o zawartosci pliku po jego nazwie. Rozwiazanie w produkcie jest banalne: takie zadania oddajesz kodowi lub narzedziu, zamiast prosic model o liczenie.</p>' +
            '<p>Ta sama logika tlumaczy inne dziwactwa: literowki potrafia mocno zmienic tokenizacje, wiec model reaguje inaczej niz na poprawny zapis, a bialy znak ma znaczenie, bo token to zwykle spacja plus slowo.</p>' +
            '<p>Praktycznie: gdy szacujesz koszt lub sprawdzasz, czy tekst zmiesci sie w oknie, licz tokeny prawdziwym tokenizerem, a nie dlugoscia stringa.</p>',
          en: '<p><strong>Tokenization</strong> converts text into the numbers the network consumes. The standard is <strong>BPE</strong> (Byte Pair Encoding). The algorithm starts from raw bytes and repeatedly merges the most frequent adjacent pair into a new symbol until the vocabulary reaches a target size. Result: common words get their own token, rare ones fall apart into pieces.</p>' +
            '<p>Rules of thumb for English: 1 token is roughly 4 characters, about 0.75 of a word. A full A4 page is around 500-700 tokens. Polish fares worse, because tokenizers were trained mostly on English - the same text in Polish can cost 1.5 to 2 times more tokens. Inflection does the damage: a case-marked noun is several symbols, not one.</p>' +
            '<h4>The famous strawberry problem</h4>' +
            '<p>"How many r in strawberry" is hard because the model receives three tokens, not ten letters. Letters are something it must infer indirectly, the way you infer file contents from a filename. The product-level fix is trivial: hand such tasks to code or a tool instead of asking the model to count.</p>' +
            '<p>The same logic explains other oddities: a typo can reshuffle tokenization completely, so the model reacts differently than to the correct spelling, and whitespace matters because a token is usually a leading space plus the word.</p>' +
            '<p>Practically: when you estimate cost or check whether text fits the window, count tokens with a real tokenizer, never with string length.</p>'
        },
        pro: {
          pl: '<p>Tokenizer to <strong>warstwa serializacji</strong> miedzy twoim stringiem a modelem - dokladnie tak, jak JSON jest warstwa miedzy obiektem a wire formatem. I tak samo jak przy JSON, wybor formatu ma mierzalny koszt.</p>' +
            '<h4>Liczby, ktore warto miec w glowie</h4>' +
            '<ul>' +
            '<li>Angielski: okolo 4 znaki na token. Polski: czesto 2,5-3 znaki na token, czyli 30-60 procent narzutu na to samo zdanie.</li>' +
            '<li>Slowniki: GPT-4o uzywa <code>o200k_base</code> (okolo 200 tys. tokenow), starsze GPT-4 uzywalo <code>cl100k_base</code> (okolo 100 tys.). Modele Claude i Gemini maja wlasne tokenizery - liczby tokenow nie sa przenoszalne miedzy dostawcami.</li>' +
            '<li>UUID w JSON to zwykle 8-12 tokenow. Tabela z 500 wierszami i pelnymi identyfikatorami potrafi zjesc 10-15 tys. tokenow samych kluczy.</li>' +
            '<li>Base64 i emoji sa drogie - jeden emoji to czesto 2-4 tokeny.</li>' +
            '</ul>' +
            '<h4>Praktyki produkcyjne</h4>' +
            '<p>Licz tokeny przed wyslaniem, nie po fakcie. Po stronie Node uzywasz <code>tiktoken</code> albo <code>gpt-tokenizer</code> dla OpenAI, a dla Claude endpointu <code>count_tokens</code> w Anthropic SDK. Traktuj to jak middleware walidacyjne, tak jak zod na granicy API.</p>' +
            '<pre><code>import { encoding_for_model } from "tiktoken";\nconst enc = encoding_for_model("gpt-4o");\nconst n = enc.encode(payload).length;\nif (n &gt; BUDGET) payload = shrink(payload);\nenc.free();</code></pre>' +
            '<p>Optymalizacja formatu daje realne oszczednosci: zamiana tablicy obiektow JSON na CSV z naglowkiem potrafi obciac 40-50 procent tokenow, bo klucze nie powtarzaja sie w kazdym wierszu. Skracanie identyfikatorow z UUID do krotkich aliasow (<code>d1</code>, <code>d2</code>) przy okazji ulatwia modelowi cytowanie i zmniejsza ryzyko przekrecenia identyfikatora.</p>' +
            '<h4>Pulapki</h4>' +
            '<p>Nie tnij tekstu po znakach - mozesz rozciac token w polowie i zepsuc streaming lub cache. Nie zakladaj, ze <code>text.length / 4</code> wystarczy dla jezykow innych niz angielski. Pamietaj, ze <strong>max_tokens dotyczy wyjscia</strong>, a limit okna to wejscie plus wyjscie razem. I nie prosz modelu o zadania znakowe (liczenie liter, odwracanie, dokladne wyrownanie ASCII) - to robota dla <code>String.prototype</code>, nie dla LLM.</p>' +
            '<p>Ostatnia rzecz, o ktora pytaja na rozmowach: dlaczego ten sam prompt kosztuje inaczej u dwoch dostawcow, mimo identycznej tresci. Powod jest podwojny - inny tokenizer daje inna liczbe tokenow, a cennik jest liczony wlasnie za tokeny, nie za znaki. Dlatego porownania kosztow robi sie zawsze na realnym ruchu, liczac tokeny tokenizerem danego dostawcy, a nie przez przelicznik znakow.</p>',
          en: '<p>The tokenizer is a <strong>serialization layer</strong> between your string and the model - exactly like JSON sits between an object and the wire format. And just like with JSON, format choice has a measurable cost.</p>' +
            '<h4>Numbers worth memorizing</h4>' +
            '<ul>' +
            '<li>English: about 4 characters per token. Polish: often 2.5-3 characters per token, so a 30-60 percent overhead for the same sentence.</li>' +
            '<li>Vocabularies: GPT-4o uses <code>o200k_base</code> (about 200k tokens), older GPT-4 used <code>cl100k_base</code> (about 100k). Claude and Gemini have their own tokenizers - token counts are not portable across providers.</li>' +
            '<li>A UUID in JSON is typically 8-12 tokens. A 500-row table with full ids can burn 10-15k tokens on keys alone.</li>' +
            '<li>Base64 and emoji are expensive - a single emoji is often 2-4 tokens.</li>' +
            '</ul>' +
            '<h4>Production practice</h4>' +
            '<p>Count tokens before sending, not after the invoice. In Node reach for <code>tiktoken</code> or <code>gpt-tokenizer</code> for OpenAI, and the <code>count_tokens</code> endpoint in the Anthropic SDK for Claude. Treat it as validation middleware, the way you treat zod at an API boundary.</p>' +
            '<pre><code>import { encoding_for_model } from "tiktoken";\nconst enc = encoding_for_model("gpt-4o");\nconst n = enc.encode(payload).length;\nif (n &gt; BUDGET) payload = shrink(payload);\nenc.free();</code></pre>' +
            '<p>Format optimization pays real money: turning an array of JSON objects into CSV with a header can cut 40-50 percent of tokens, because keys stop repeating on every row. Shortening ids from UUIDs to compact aliases (<code>d1</code>, <code>d2</code>) additionally makes citation easier and lowers the chance the model garbles an identifier.</p>' +
            '<h4>Pitfalls</h4>' +
            '<p>Never slice text by characters - you can cut a token in half and break streaming or caching. Never assume <code>text.length / 4</code> holds outside English. Remember that <strong>max_tokens governs output</strong>, while the window limit covers input plus output together. And do not ask the model for character-level work (counting letters, reversing strings, exact ASCII alignment) - that is a job for <code>String.prototype</code>, not an LLM.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ile mniej wiecej tokenow ma 1000 znakow zwyklego angielskiego tekstu?',
            en: 'Roughly how many tokens are in 1000 characters of ordinary English prose?'
          },
          options: [
            { pl: 'Okolo 1000', en: 'About 1000' },
            { pl: 'Okolo 60', en: 'About 60' },
            { pl: 'Okolo 250', en: 'About 250' },
            { pl: 'Okolo 4000', en: 'About 4000' }
          ],
          correct: 2,
          explain: {
            pl: 'Regula kciuka: okolo 4 znaki na token w angielskim. W polskim wychodzi znacznie gorzej, czesto 2,5-3 znaki na token.',
            en: 'Rule of thumb: about 4 characters per token in English. Polish is much worse, often 2.5-3 characters per token.'
          }
        },
        {
          q: {
            pl: 'Dlaczego model myli sie przy liczeniu liter "r" w slowie strawberry?',
            en: 'Why does the model stumble when counting the letter r in strawberry?'
          },
          options: [
            { pl: 'Bo widzi kilka tokenow, a nie pojedyncze litery', en: 'Because it sees a few tokens, not individual letters' },
            { pl: 'Bo nie zna angielskiego slownictwa kulinarnego', en: 'Because it does not know English food vocabulary' },
            { pl: 'Bo temperatura jest za niska', en: 'Because temperature is too low' },
            { pl: 'Bo slowo przekracza okno kontekstu', en: 'Because the word exceeds the context window' }
          ],
          correct: 0,
          explain: {
            pl: 'Warstwa tokenizacji ukrywa litery. Zadania znakowe oddaj kodowi - to jedna linia w JS, a dla modelu zgadywanka.',
            en: 'The tokenization layer hides letters. Give character-level tasks to code - one line in JS, guesswork for the model.'
          }
        },
        {
          q: {
            pl: 'Jak dziala BPE w jednym zdaniu?',
            en: 'How does BPE work, in one sentence?'
          },
          options: [
            { pl: 'Dzieli tekst po spacjach i znakach interpunkcyjnych', en: 'It splits text on spaces and punctuation' },
            { pl: 'Tlumaczy tekst na angielski przed tokenizacja', en: 'It translates text into English before tokenizing' },
            { pl: 'Przypisuje kazdej literze osobny numer w slowniku', en: 'It assigns every letter its own vocabulary id' },
            { pl: 'Iteracyjnie skleja najczestsze sasiadujace pary w nowe symbole', en: 'It iteratively merges the most frequent adjacent pairs into new symbols' }
          ],
          correct: 3,
          explain: {
            pl: 'Dlatego czeste slowa maja jeden token, a rzadkie rozpadaja sie na kawalki - czestotliwosc w danych treningowych decyduje o podziale.',
            en: 'That is why frequent words get a single token while rare ones fragment - frequency in the training data decides the split.'
          }
        },
        {
          q: {
            pl: 'Masz 800 rekordow z pol UUID w prompcie i przekraczasz budzet tokenow. Ktora zmiana da najwieksza oszczednosc przy najmniejszym ryzyku?',
            en: 'You have 800 records with UUID fields in the prompt and you are over budget. Which change saves the most with the least risk?'
          },
          options: [
            { pl: 'Obnizyc temperature do 0', en: 'Lower temperature to 0' },
            { pl: 'Zamienic tablice obiektow JSON na CSV i skrocic identyfikatory do aliasow', en: 'Convert the JSON object array to CSV and shorten ids to short aliases' },
            { pl: 'Zwiekszyc max_tokens, zeby zmiescic wiecej danych', en: 'Raise max_tokens so more data fits' },
            { pl: 'Przetlumaczyc dane na angielski', en: 'Translate the data into English' }
          ],
          correct: 1,
          explain: {
            pl: 'CSV usuwa powtarzane klucze (czesto 40-50 procent oszczednosci), a krotkie aliasy tna dlugie UUID i ulatwiaja modelowi poprawne cytowanie. max_tokens dotyczy wyjscia, wiec nie pomoze.',
            en: 'CSV drops repeated keys (often 40-50 percent savings) and short aliases cut long UUIDs while making citation more reliable. max_tokens governs output, so it would not help.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 3
    {
      id: 'context-window',
      title: {
        pl: 'Okno kontekstu i jego pulapki',
        en: 'The context window and its traps'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="32" font-size="15" fill="var(--muted)">One request = one window (input + output)</text>' +
          '<rect x="20" y="46" width="600" height="56" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="22" y="48" width="90" height="52" rx="8" fill="var(--accent)" opacity="0.75"/>' +
          '<text x="67" y="79" text-anchor="middle" font-size="13" fill="var(--text)">system</text>' +
          '<rect x="114" y="48" width="150" height="52" rx="8" fill="var(--accent2)" opacity="0.75"/>' +
          '<text x="189" y="79" text-anchor="middle" font-size="13" fill="var(--text)">history</text>' +
          '<rect x="266" y="48" width="230" height="52" rx="8" fill="var(--accent2)" opacity="0.4"/>' +
          '<text x="381" y="79" text-anchor="middle" font-size="13" fill="var(--text)">retrieved documents</text>' +
          '<rect x="498" y="48" width="120" height="52" rx="8" fill="var(--ok)" opacity="0.7"/>' +
          '<text x="558" y="79" text-anchor="middle" font-size="13" fill="var(--text)">answer</text>' +
          '<text x="20" y="150" font-size="15" fill="var(--muted)">Recall of one fact, by its position in a long context</text>' +
          '<line x1="60" y1="330" x2="620" y2="330" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="60" y1="170" x2="60" y2="330" stroke="var(--border)" stroke-width="2"/>' +
          '<path d="M 60 185 C 170 190, 210 285, 320 290 C 430 285, 480 200, 620 185" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
          '<circle cx="320" cy="290" r="6" fill="var(--err)"/>' +
          '<text x="320" y="316" text-anchor="middle" font-size="14" fill="var(--err)">lost in the middle</text>' +
          '<text x="66" y="176" font-size="13" fill="var(--ok)">strong</text>' +
          '<text x="565" y="176" font-size="13" fill="var(--ok)">strong</text>' +
          '<text x="60" y="352" font-size="13" fill="var(--muted)">start</text>' +
          '<text x="330" y="352" text-anchor="middle" font-size="13" fill="var(--muted)">middle</text>' +
          '<text x="620" y="352" text-anchor="end" font-size="13" fill="var(--muted)">end</text>' +
          '<text x="20" y="392" font-size="14" fill="var(--warn)">Put instructions and key facts at the edges, never buried in the middle</text>' +
          '</svg>',
        caption: {
          pl: 'Okno kontekstu to jeden bufor na wszystko: system prompt, historie, dokumenty i odpowiedz. Fakty w srodku dlugiego kontekstu sa odzyskiwane najslabiej.',
          en: 'The context window is one buffer for everything: system prompt, history, documents and the answer. Facts buried mid-context are recalled the least reliably.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie biurko o stalej wielkosci. Wszystko, co ma byc uzyte teraz, musi na nim lezec: notatka od szefa, poprzednie rozmowy, wydruki i miejsce na to, co wlasnie piszesz. Jak zabraknie miejsca, cos musi spasc na podloge.</p>' +
            '<p>Model tez ma takie biurko. Nazywa sie okno kontekstu. Wszystko, co mu wyslesz, i wszystko, co odpisze, musi sie na nim zmiescic naraz.</p>' +
            '<p>Jest tez druga rzecz, dziwniejsza. Jesli biurko jest zawalone, model najlepiej pamieta to, co lezy na samej gorze i na samym dole stosu. To, co utknelo dokladnie w srodku, gubi sie najczesciej - dokladnie jak u ludzi, ktorzy pamietaja poczatek i koniec listy zakupow, a nie srodek.</p>' +
            '<p>Dlatego wcale nie chodzi o to, by wrzucic modelowi wszystko, co masz. Chodzi o to, by polozyc na biurku dokladnie te kartki, ktore sa potrzebne.</p>',
          en: '<p>Picture a desk of fixed size. Everything you need right now has to lie on it: the note from your boss, earlier conversations, printouts, and the space where you are writing. When it runs out of room, something falls on the floor.</p>' +
            '<p>The model has such a desk too. It is called the context window. Everything you send and everything it writes back must fit on it at once.</p>' +
            '<p>There is a second, stranger thing. When the desk is crowded, the model best recalls what sits at the very top and the very bottom of the pile. Whatever is stuck exactly in the middle gets lost most often - just like people who remember the first and last items on a shopping list, not the middle.</p>' +
            '<p>So the goal is never to dump everything you have on the model. The goal is to place exactly the right sheets on the desk.</p>'
        },
        school: {
          pl: '<p><strong>Okno kontekstu</strong> (context window) to maksymalna liczba tokenow, ktore model przetwarza w jednym wywolaniu - i liczy sie do niego wszystko: system prompt, cala historia rozmowy, wklejone dokumenty, definicje narzedzi oraz wygenerowana odpowiedz. Typowe wielkosci w 2026 roku to 128 tys. tokenow w klasie modeli produkcyjnych i 1 mln w wariantach long-context.</p>' +
            '<p>Kiedy przekroczysz limit, dostajesz blad albo - w niektorych bibliotekach - ciche <strong>obcinanie</strong> (truncation) najstarszych wiadomosci. To drugie jest grozniejsze, bo aplikacja dziala dalej, tylko odpowiedzi robia sie glupsze bez zadnego sygnalu.</p>' +
            '<h4>Lost in the middle</h4>' +
            '<p>Badania i praktyka zgadzaja sie: gdy ten sam fakt umiescisz na poczatku lub koncu dlugiego kontekstu, model odnajduje go niemal zawsze. Umieszczony w polowie bywa pomijany. Test <strong>needle in a haystack</strong> (igla w stogu siana) polega wlasnie na chowaniu jednego zdania w dlugim tekscie i sprawdzaniu skutecznosci odzyskania.</p>' +
            '<h4>Trzy sposoby na wiedze modelu</h4>' +
            '<ul>' +
            '<li><strong>Kontekst</strong> - wklejasz dane do promptu. Natychmiastowe, drogie przy kazdym wywolaniu, ograniczone rozmiarem okna.</li>' +
            '<li><strong>RAG</strong> - wyszukujesz tylko potrzebne fragmenty i wklejasz je. Skaluje sie do milionow dokumentow, dane sa zawsze swieze.</li>' +
            '<li><strong>Fine-tuning</strong> - dostrajasz wagi. Uczy stylu, formatu i zachowania, ale kiepsko nadaje sie do faktow, ktore sie zmieniaja.</li>' +
            '</ul>' +
            '<p>Analogia webowa: kontekst to props przekazane do komponentu, RAG to zapytanie do API po dane, a fine-tuning to zmiana samego kodu komponentu. Do zmiennych danych uzywasz zapytania, a nie przepisywania komponentu przy kazdej zmianie rekordu.</p>',
          en: '<p>The <strong>context window</strong> is the maximum number of tokens a model processes in one call - and everything counts toward it: the system prompt, the full conversation history, pasted documents, tool definitions, and the generated answer. Typical sizes in 2026 are 128k tokens for mainstream production models and 1M for long-context variants.</p>' +
            '<p>Exceed the limit and you get an error, or - in some libraries - silent <strong>truncation</strong> of the oldest messages. The silent version is far more dangerous: the app keeps working, answers just quietly get dumber with no signal at all.</p>' +
            '<h4>Lost in the middle</h4>' +
            '<p>Research and practice agree: place the same fact at the start or the end of a long context and the model finds it almost every time. Place it halfway and it may be skipped. The <strong>needle in a haystack</strong> test does exactly this - hides one sentence inside a long text and measures retrieval accuracy.</p>' +
            '<h4>Three ways to give a model knowledge</h4>' +
            '<ul>' +
            '<li><strong>Context</strong> - paste the data into the prompt. Instant, expensive on every call, capped by window size.</li>' +
            '<li><strong>RAG</strong> - retrieve only the relevant chunks and paste those. Scales to millions of documents, data is always fresh.</li>' +
            '<li><strong>Fine-tuning</strong> - adjust the weights. Teaches style, format and behavior, but is a poor fit for facts that change.</li>' +
            '</ul>' +
            '<p>Web analogy: context is props passed into a component, RAG is fetching data from an API, and fine-tuning is editing the component source. For changing data you fetch, you do not rewrite the component on every record update.</p>'
        },
        pro: {
          pl: '<p>Okno kontekstu to <strong>budzet, a nie pojemnik</strong>. Dwa niezalezne powody, dla ktorych nie warto go wypelniac do pelna: koszt i latencja rosna liniowo (prefill przetwarza kazdy token wejscia), a jakosc odzyskiwania spada wraz z dlugoscia - efektywne okno jest zauwazalnie mniejsze niz nominalne.</p>' +
            '<h4>Uklad promptu, ktory dziala</h4>' +
            '<ol>' +
            '<li>Stabilny system prompt i definicje narzedzi na gorze - to samo daje trafienia prompt cache.</li>' +
            '<li>Dokumenty i dane w srodku, kazdy z jawnym identyfikatorem, na przyklad <code>[doc:3]</code>.</li>' +
            '<li>Instrukcje zadania i faktyczne pytanie na samym koncu, tuz przed generowaniem.</li>' +
            '</ol>' +
            '<p>Reguly na koncu wygrywaja z regulami zakopanymi w srodku 60 tys. tokenow logow. Jesli musisz je powtorzyc - powtorz, dwadziescia tokenow jest tansze niz zle wykonane zadanie.</p>' +
            '<pre><code>const messages = [\n  { role: "user", content: [\n      { type: "text", text: CONTEXT_DOCS },      // duze, w srodku\n      { type: "text", text: "Question: " + q }   // male, na koncu\n  ]}\n];</code></pre>' +
            '<h4>Zarzadzanie dluga rozmowa</h4>' +
            '<p>W chatbocie stosujesz okno przesuwne plus <strong>kompakcje</strong>: co N tur streszczasz starsze wiadomosci do zwiezlego stanu i trzymasz ostatnie 5-10 tur doslownie. Wazne, by nigdy nie obcinac w srodku bloku tool_use / tool_result - modele odrzuca niekompletna pare, a debugowanie tego potrafi zjesc pol dnia. Fakty krytyczne (identyfikator uzytkownika, wybrany plan, ustalenia) trzymaj w oddzielnej, zawsze doklejanej sekcji stanu, a nie licz na to, ze przetrwaja w historii.</p>' +
            '<h4>Kiedy 1 mln tokenow nie jest odpowiedzia</h4>' +
            '<p>Wrzucenie calego repozytorium do okna 1M kosztuje przy typowych cenach kilka dolarow za wywolanie i dodaje kilkanascie sekund do TTFT. RAG na tych samych danych to zwykle 3-8 tys. tokenow, kilkadziesiat milisekund wyszukiwania i wyzsza precyzja, bo model nie musi ignorowac 990 tys. tokenow szumu. Long context wygrywa tam, gdzie dokument jest naprawde niepodzielny i potrzebne jest rozumowanie globalne - dlugi kontrakt, jeden duzy plik, transkrypcja calego spotkania.</p>' +
            '<p><strong>Mierz to</strong>: wlasny test needle-in-a-haystack na twoich danych, w kilku pozycjach i kilku dlugosciach, powie ci wiecej niz benchmark dostawcy. Loguj <code>input_tokens</code> per zadanie i ustaw alert na wzrost - rozrastajacy sie prompt to najczestsza cicha przyczyna rosnacego rachunku.</p>',
          en: '<p>The context window is a <strong>budget, not a container</strong>. Two independent reasons not to fill it: cost and latency grow linearly (prefill processes every input token), and retrieval quality degrades with length - the effective window is noticeably smaller than the nominal one.</p>' +
            '<h4>A prompt layout that works</h4>' +
            '<ol>' +
            '<li>Stable system prompt and tool definitions at the top - identical bytes there earn prompt cache hits.</li>' +
            '<li>Documents and data in the middle, each with an explicit id such as <code>[doc:3]</code>.</li>' +
            '<li>Task instructions and the actual question at the very end, right before generation.</li>' +
            '</ol>' +
            '<p>Rules at the end beat rules buried inside 60k tokens of logs. If you must repeat them, repeat them - twenty tokens are cheaper than a botched task.</p>' +
            '<pre><code>const messages = [\n  { role: "user", content: [\n      { type: "text", text: CONTEXT_DOCS },      // large, middle\n      { type: "text", text: "Question: " + q }   // small, at the end\n  ]}\n];</code></pre>' +
            '<h4>Managing a long conversation</h4>' +
            '<p>In a chatbot you run a sliding window plus <strong>compaction</strong>: every N turns you summarize older messages into a compact state and keep the last 5-10 turns verbatim. Critically, never truncate in the middle of a tool_use / tool_result pair - models reject the incomplete pair and debugging that can burn half a day. Keep critical facts (user id, chosen plan, agreed decisions) in a separate always-appended state block rather than hoping they survive in the history.</p>' +
            '<h4>When 1M tokens is not the answer</h4>' +
            '<p>Dumping a whole repository into a 1M window costs several dollars per call at typical prices and adds tens of seconds to TTFT. RAG over the same data is usually 3-8k tokens, tens of milliseconds of search, and higher precision, because the model does not have to ignore 990k tokens of noise. Long context wins where the document is genuinely indivisible and global reasoning is required - a long contract, one large file, a full meeting transcript.</p>' +
            '<p><strong>Measure it</strong>: your own needle-in-a-haystack test on your data, across several positions and lengths, tells you more than any vendor benchmark. Log <code>input_tokens</code> per task and alert on growth - a creeping prompt is the most common silent cause of a rising bill.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co wlicza sie do okna kontekstu?',
            en: 'What counts toward the context window?'
          },
          options: [
            { pl: 'Tylko ostatnia wiadomosc uzytkownika', en: 'Only the latest user message' },
            { pl: 'Tylko dokumenty z RAG', en: 'Only RAG documents' },
            { pl: 'System prompt, historia, narzedzia, dokumenty i odpowiedz razem', en: 'System prompt, history, tools, documents and the answer together' },
            { pl: 'Wylacznie tokeny wyjsciowe', en: 'Output tokens only' }
          ],
          correct: 2,
          explain: {
            pl: 'Okno to jeden wspolny bufor na wejscie i wyjscie. Dlatego duzy prompt realnie zjada miejsce na dluga odpowiedz.',
            en: 'The window is a single shared buffer for input and output. A big prompt literally eats the room available for a long answer.'
          }
        },
        {
          q: {
            pl: 'Czym jest efekt "lost in the middle"?',
            en: 'What is the "lost in the middle" effect?'
          },
          options: [
            { pl: 'Model gorzej odzyskuje informacje umieszczone w srodku dlugiego kontekstu', en: 'The model recalls information placed mid-context less reliably' },
            { pl: 'API gubi co drugi pakiet przy streamingu', en: 'The API drops every other packet while streaming' },
            { pl: 'Tokenizer usuwa srodkowe litery dlugich slow', en: 'The tokenizer drops middle letters of long words' },
            { pl: 'Cache przechowuje tylko srodek promptu', en: 'The cache stores only the middle of the prompt' }
          ],
          correct: 0,
          explain: {
            pl: 'Poczatek i koniec kontekstu maja najsilniejszy wplyw. Kluczowe instrukcje i pytanie umieszczaj na koncu promptu.',
            en: 'The start and end of the context have the strongest influence. Put key instructions and the question at the end of the prompt.'
          }
        },
        {
          q: {
            pl: 'Katalog produktow zmienia sie codziennie i model ma odpowiadac na pytania o ceny. Co wybierasz?',
            en: 'A product catalog changes daily and the model must answer pricing questions. What do you pick?'
          },
          options: [
            { pl: 'Fine-tuning modelu co noc na nowym katalogu', en: 'Fine-tune the model nightly on the new catalog' },
            { pl: 'Wklejanie calego katalogu do kazdego promptu', en: 'Paste the entire catalog into every prompt' },
            { pl: 'Dluzszy system prompt z regulami cenowymi', en: 'A longer system prompt with pricing rules' },
            { pl: 'RAG: wyszukanie kilku pasujacych rekordow i wklejenie ich do promptu', en: 'RAG: retrieve a few matching records and paste those' }
          ],
          correct: 3,
          explain: {
            pl: 'Zmienne fakty naleza do warstwy danych, nie do wag. RAG daje swiezosc, niski koszt i mozliwosc cytowania zrodla.',
            en: 'Changing facts belong in the data layer, not in the weights. RAG gives freshness, low cost and citable sources.'
          }
        },
        {
          q: {
            pl: 'Chatbot dziala poprawnie, ale po okolo 30 turach zaczyna zapominac ustalenia i myli identyfikator uzytkownika. Najbardziej prawdopodobna przyczyna i poprawka?',
            en: 'A chatbot works fine, but after roughly 30 turns it forgets decisions and mixes up the user id. Most likely cause and fix?'
          },
          options: [
            { pl: 'Zbyt niska temperatura; podnies ja do 1,0', en: 'Temperature too low; raise it to 1.0' },
            { pl: 'Ciche obcinanie najstarszych wiadomosci; trzymaj krytyczny stan w osobnej, zawsze doklejanej sekcji', en: 'Silent truncation of oldest messages; keep critical state in a separate always-appended block' },
            { pl: 'Wyczerpany limit max_tokens; zwieksz go dwukrotnie', en: 'max_tokens exhausted; double it' },
            { pl: 'Uszkodzony cache promptu; wylacz caching', en: 'Corrupted prompt cache; disable caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Okno przesuwne wypycha najstarsze tury, w ktorych zwykle siedza ustalenia poczatkowe. Stan krytyczny trzymaj poza historia i dokladaj przy kazdym wywolaniu.',
            en: 'A sliding window evicts the oldest turns, which is exactly where the initial decisions live. Keep critical state outside the history and re-append it on every call.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 4
    {
      id: 'embeddings',
      title: {
        pl: 'Embeddingi: znaczenie jako wspolrzedne',
        en: 'Embeddings: meaning as coordinates'
      },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m4arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<rect x="20" y="24" width="200" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="120" y="52" text-anchor="middle" font-size="14" fill="var(--text)">how do I reset my password</text>' +
          '<line x1="222" y1="46" x2="272" y2="46" stroke="var(--accent)" stroke-width="2" marker-end="url(#m4arrow)"/>' +
          '<rect x="278" y="24" width="130" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="343" y="52" text-anchor="middle" font-size="14" fill="var(--text)">embedding model</text>' +
          '<line x1="410" y1="46" x2="460" y2="46" stroke="var(--accent)" stroke-width="2" marker-end="url(#m4arrow)"/>' +
          '<rect x="466" y="24" width="154" height="44" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="543" y="52" text-anchor="middle" font-size="13" fill="var(--muted)">[0.12, -0.44, ... ] 1536d</text>' +
          '<line x1="80" y1="110" x2="80" y2="370" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="80" y1="370" x2="610" y2="370" stroke="var(--border)" stroke-width="2"/>' +
          '<line x1="80" y1="370" x2="300" y2="180" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m4arrow)"/>' +
          '<line x1="80" y1="370" x2="330" y2="205" stroke="var(--accent2)" stroke-width="2" marker-end="url(#m4arrow)"/>' +
          '<line x1="80" y1="370" x2="520" y2="330" stroke="var(--muted)" stroke-width="2" marker-end="url(#m4arrow)"/>' +
          '<circle cx="300" cy="180" r="7" fill="var(--accent)"/>' +
          '<text x="312" y="172" font-size="14" fill="var(--text)">reset password</text>' +
          '<circle cx="330" cy="205" r="7" fill="var(--accent)"/>' +
          '<text x="342" y="222" font-size="14" fill="var(--text)">forgot my login</text>' +
          '<circle cx="520" cy="330" r="7" fill="var(--warn)"/>' +
          '<text x="450" y="352" font-size="14" fill="var(--warn)">pizza delivery</text>' +
          '<path d="M 150 322 A 90 90 0 0 1 168 300" fill="none" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="150" y="290" font-size="14" fill="var(--ok)">small angle = similar</text>' +
          '<text x="330" y="404" font-size="14" fill="var(--muted)">cosine similarity compares direction, not length</text>' +
          '</svg>',
        caption: {
          pl: 'Embedding zamienia tekst w wektor. Zdania o podobnym znaczeniu wskazuja w podobnym kierunku, wiec kat miedzy nimi jest maly.',
          en: 'An embedding turns text into a vector. Sentences with similar meaning point in a similar direction, so the angle between them is small.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie ogromna mape, na ktorej kazde zdanie ma swoj adres. Nie taki adres jak ulica i numer, tylko taki, ze <em>rzeczy o podobnym znaczeniu mieszkaja obok siebie</em>.</p>' +
            '<p>"Jak zmienic haslo" i "zapomnialem loginu" beda sasiadami, chociaz nie maja ani jednego wspolnego slowa. A "dostawa pizzy" wyladuje na drugim koncu miasta.</p>' +
            '<p>Embedding to wlasnie sposob wyliczania takiego adresu. Wrzucasz zdanie, dostajesz dluga liste liczb - to sa wspolrzedne na mapie znaczen.</p>' +
            '<p>Po co to komu? Bo teraz szukanie przestaje polegac na zgadywaniu slow kluczowych. Pytasz, komputer sprawdza, kto mieszka najblizej twojego pytania, i podaje tych sasiadow. Dziala tak wyszukiwanie w dokumentacji, podpowiadanie podobnych produktow albo wykrywanie, ze dwa zgloszenia to tak naprawde ten sam problem opisany innymi slowami.</p>',
          en: '<p>Picture an enormous map where every sentence has an address. Not a street-and-number address, but one where <em>things with similar meaning live next door to each other</em>.</p>' +
            '<p>"How do I change my password" and "I forgot my login" end up as neighbours even though they share no words at all. Meanwhile "pizza delivery" lands on the other side of town.</p>' +
            '<p>An embedding is simply how that address gets computed. You feed in a sentence, you get back a long list of numbers - the coordinates on a map of meaning.</p>' +
            '<p>Why care? Because search stops being a guessing game about keywords. You ask a question, the computer checks who lives nearest to it, and hands you those neighbours. That is how docs search works, how similar products get suggested, and how you spot that two support tickets are the same problem described in different words.</p>'
        },
        school: {
          pl: '<p><strong>Embedding</strong> (osadzenie, wektor znaczeniowy) to zamiana tekstu na liste liczb o stalej dlugosci - typowo 384, 768, 1024 lub 1536 wymiarow. Model embeddingowy jest trenowany tak, by teksty o zblizonym znaczeniu dostawaly wektory wskazujace w podobnym kierunku.</p>' +
            '<p>Podobienstwo mierzy sie <strong>cosine similarity</strong> (podobienstwo kosinusowe) - cosinusem kata miedzy wektorami. Wynik od -1 do 1, gdzie 1 to identyczny kierunek. Liczy sie kierunek, nie dlugosc, dzieki czemu dlugosc tekstu nie zaburza wyniku.</p>' +
            '<pre><code>function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i &lt; a.length; i++) {\n    dot += a[i] * b[i];\n    na  += a[i] * a[i];\n    nb  += b[i] * b[i];\n  }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}</code></pre>' +
            '<p>Kluczowa roznica wobec wyszukiwania pelnotekstowego: <code>LIKE</code> i indeks slow kluczowych szukaja <em>znakow</em>, embeddingi szukaja <em>znaczenia</em>. Zapytanie "auto sie nie odpala" znajdzie dokument o rozladowanym akumulatorze, mimo braku wspolnych slow.</p>' +
            '<h4>Do czego sie tego uzywa</h4>' +
            '<ul>' +
            '<li><strong>Wyszukiwanie semantyczne</strong> - fundament RAG.</li>' +
            '<li><strong>Deduplikacja</strong> - dwa zgloszenia o podobienstwie powyzej 0,95 to najczesciej duplikat.</li>' +
            '<li><strong>Klasteryzacja</strong> - grupowanie tysiecy opinii w tematy bez recznego tagowania.</li>' +
            '<li><strong>Klasyfikacja</strong> - porownanie z wektorami przykladowych kategorii, tanio i bez trenowania.</li>' +
            '</ul>' +
            '<p>Wazne: embedding to nie to samo co model generatywny. To osobny, mniejszy i znacznie tanszy model, ktory nie generuje tekstu, tylko go opisuje liczbami.</p>',
          en: '<p>An <strong>embedding</strong> turns text into a fixed-length list of numbers - typically 384, 768, 1024 or 1536 dimensions. The embedding model is trained so that texts with related meaning receive vectors pointing in similar directions.</p>' +
            '<p>Similarity is measured with <strong>cosine similarity</strong> - the cosine of the angle between two vectors. The result runs from -1 to 1, where 1 means identical direction. Direction matters, magnitude does not, so text length does not skew the score.</p>' +
            '<pre><code>function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i &lt; a.length; i++) {\n    dot += a[i] * b[i];\n    na  += a[i] * a[i];\n    nb  += b[i] * b[i];\n  }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}</code></pre>' +
            '<p>The key difference from full-text search: <code>LIKE</code> and a keyword index look for <em>characters</em>, embeddings look for <em>meaning</em>. The query "my car will not start" surfaces a document about a dead battery even with zero shared words.</p>' +
            '<h4>What it is used for</h4>' +
            '<ul>' +
            '<li><strong>Semantic search</strong> - the foundation of RAG.</li>' +
            '<li><strong>Deduplication</strong> - two tickets above 0.95 similarity are usually the same issue.</li>' +
            '<li><strong>Clustering</strong> - grouping thousands of reviews into themes with no manual tagging.</li>' +
            '<li><strong>Classification</strong> - compare against example category vectors, cheap and training-free.</li>' +
            '</ul>' +
            '<p>Important: an embedding model is not a generative model. It is a separate, smaller and far cheaper model that does not write text - it describes text with numbers.</p>'
        },
        pro: {
          pl: '<p>Embedding to <strong>funkcja skrotu, ktora zachowuje bliskosc znaczen</strong>. Traktuj wektor jak indeks w bazie: liczysz go raz przy zapisie, trzymasz obok rekordu i uzywasz do wyszukiwania. Analogia webowa: to jest twoj indeks wyszukiwania, tylko kluczem jest sens, a nie prefiks stringa.</p>' +
            '<h4>Liczby produkcyjne</h4>' +
            '<ul>' +
            '<li>Koszt: modele embeddingowe kosztuja rzedu 0,02-0,13 USD za milion tokenow, czyli zwykle 10-100 razy taniej niz generacja. Zaembedowanie 100 tys. chunkow po 500 tokenow to pojedyncze dolary.</li>' +
            '<li>Wymiary: 1536 wymiarow razy 4 bajty to 6 KB na wektor. Milion wektorow to okolo 6 GB w float32, ale <strong>kwantyzacja</strong> do int8 tnie to okolo czterokrotnie przy stracie trafnosci rzedu 1-2 procent.</li>' +
            '<li>Latencja: batch po 100 tekstow na wywolanie zamiast pojedynczych zadan zmienia godziny w minuty.</li>' +
            '<li>Popularne modele: <code>text-embedding-3-small</code> i <code>-large</code> od OpenAI, Voyage (rekomendowany dla Claude), Cohere Embed, a lokalnie rodzina BGE i E5 przez sentence-transformers.</li>' +
            '</ul>' +
            '<h4>Pulapki, ktore boli</h4>' +
            '<p><strong>1. Nie mieszaj modeli.</strong> Wektory z dwoch roznych modeli sa nieporownywalne, nawet przy tej samej liczbie wymiarow. Zapisuj nazwe i wersje modelu w kolumnie obok wektora - zmiana modelu oznacza pelny reindeks.</p>' +
            '<p><strong>2. Asymetria zapytanie-dokument.</strong> Krotkie pytanie i dlugi akapit zyja w nieco innych rejonach przestrzeni. Modele takie jak E5 wymagaja prefiksow <code>query:</code> i <code>passage:</code>; ich pominiecie potrafi obnizyc recall o kilkanascie punktow.</p>' +
            '<p><strong>3. Podobienstwo to nie trafnosc.</strong> Cosine 0,86 nie znaczy "poprawna odpowiedz". Progi ustalasz empirycznie na zlotym zbiorze, osobno per domena, bo rozklady sa rozne dla kazdego modelu.</p>' +
            '<p><strong>4. Negacja jest niewidoczna.</strong> "Dokument jest wazny" i "dokument jest niewazny" maja wysokie podobienstwo. Dlatego czyste wyszukiwanie wektorowe przegrywa z hybryda z BM25 i rerankerem.</p>' +
            '<pre><code>-- pgvector: kolumna, indeks HNSW, zapytanie\nALTER TABLE chunks ADD COLUMN embedding vector(1536);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\nSELECT id, content, 1 - (embedding &lt;=&gt; $1) AS score\nFROM chunks WHERE tenant_id = $2\nORDER BY embedding &lt;=&gt; $1 LIMIT 8;</code></pre>' +
            '<p>Operator <code>&lt;=&gt;</code> to dystans kosinusowy, wiec sortujesz rosnaco, a wynik zamieniasz na podobienstwo przez <code>1 - dystans</code>. Filtr po tenant_id przed sortowaniem to nie kosmetyka, tylko granica bezpieczenstwa - wyciek miedzy najemcami przez wspolny indeks wektorowy to klasyczny incydent.</p>',
          en: '<p>An embedding is a <strong>hash function that preserves closeness of meaning</strong>. Treat the vector like a database index: compute it once on write, store it next to the record, use it for lookup. Web analogy: this is your search index, except the key is meaning rather than a string prefix.</p>' +
            '<h4>Production numbers</h4>' +
            '<ul>' +
            '<li>Cost: embedding models run about 0.02-0.13 USD per million tokens, typically 10-100x cheaper than generation. Embedding 100k chunks of 500 tokens costs single-digit dollars.</li>' +
            '<li>Dimensions: 1536 dims times 4 bytes is 6 KB per vector. A million vectors is roughly 6 GB in float32, but <strong>quantization</strong> to int8 cuts that about fourfold for a 1-2 percent accuracy loss.</li>' +
            '<li>Latency: batching 100 texts per call instead of one-by-one turns hours into minutes.</li>' +
            '<li>Common models: <code>text-embedding-3-small</code> and <code>-large</code> from OpenAI, Voyage (recommended alongside Claude), Cohere Embed, and locally the BGE and E5 families via sentence-transformers.</li>' +
            '</ul>' +
            '<h4>Pitfalls that hurt</h4>' +
            '<p><strong>1. Never mix models.</strong> Vectors from two different models are incomparable even at identical dimensionality. Store the model name and version in a column beside the vector - swapping models means a full reindex.</p>' +
            '<p><strong>2. Query-document asymmetry.</strong> A short question and a long paragraph live in slightly different regions of the space. Models like E5 require <code>query:</code> and <code>passage:</code> prefixes; skipping them can cost you double-digit recall points.</p>' +
            '<p><strong>3. Similarity is not relevance.</strong> Cosine 0.86 does not mean "correct answer". Thresholds are set empirically on a golden set, per domain, because score distributions differ for every model.</p>' +
            '<p><strong>4. Negation is invisible.</strong> "The document is valid" and "the document is not valid" score very close together. That is precisely why pure vector search loses to a hybrid with BM25 plus a reranker.</p>' +
            '<pre><code>-- pgvector: column, HNSW index, query\nALTER TABLE chunks ADD COLUMN embedding vector(1536);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\nSELECT id, content, 1 - (embedding &lt;=&gt; $1) AS score\nFROM chunks WHERE tenant_id = $2\nORDER BY embedding &lt;=&gt; $1 LIMIT 8;</code></pre>' +
            '<p>The <code>&lt;=&gt;</code> operator is cosine distance, so you sort ascending and convert to similarity via <code>1 - distance</code>. Filtering by tenant_id before ranking is not cosmetic but a security boundary - cross-tenant leakage through a shared vector index is a classic incident.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym jest embedding?',
            en: 'What is an embedding?'
          },
          options: [
            { pl: 'Skompresowana wersja tekstu, ktora da sie odzyskac', en: 'A compressed version of the text that can be decompressed' },
            { pl: 'Wektor liczb reprezentujacy znaczenie tekstu', en: 'A vector of numbers representing the meaning of the text' },
            { pl: 'Lista tokenow po tokenizacji', en: 'The list of tokens after tokenization' },
            { pl: 'Suma kontrolna uzywana do cachowania promptu', en: 'A checksum used for prompt caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Embedding jest jednokierunkowy - nie odtworzysz z niego oryginalnego tekstu, ale mozesz mierzyc podobienstwo znaczen.',
            en: 'An embedding is one-way - you cannot reconstruct the original text from it, but you can measure semantic similarity.'
          }
        },
        {
          q: {
            pl: 'Co porownuje cosine similarity?',
            en: 'What does cosine similarity compare?'
          },
          options: [
            { pl: 'Liczbe wspolnych slow kluczowych', en: 'The number of shared keywords' },
            { pl: 'Dlugosci obu wektorow', en: 'The lengths of the two vectors' },
            { pl: 'Kierunek wektorow, czyli kat miedzy nimi', en: 'The direction of the vectors, that is the angle between them' },
            { pl: 'Liczbe tokenow w obu tekstach', en: 'The token count of both texts' }
          ],
          correct: 2,
          explain: {
            pl: 'Dlatego dlugi i krotki tekst o tym samym sensie moga miec bardzo wysokie podobienstwo - liczy sie kierunek, nie dlugosc.',
            en: 'That is why a long and a short text with the same meaning can score very high - direction matters, magnitude does not.'
          }
        },
        {
          q: {
            pl: 'Migrujesz z jednego modelu embeddingow na inny, ten sam wymiar 1536. Co musisz zrobic?',
            en: 'You migrate from one embedding model to another with the same 1536 dimensions. What must you do?'
          },
          options: [
            { pl: 'Przeliczyc wszystkie wektory od nowa i przebudowac indeks', en: 'Recompute every vector and rebuild the index' },
            { pl: 'Nic, wymiar sie zgadza wiec wektory sa zgodne', en: 'Nothing, the dimensions match so vectors are compatible' },
            { pl: 'Znormalizowac stare wektory do dlugosci 1', en: 'Normalize the old vectors to unit length' },
            { pl: 'Podniesc prog podobienstwa o 0,1', en: 'Raise the similarity threshold by 0.1' }
          ],
          correct: 0,
          explain: {
            pl: 'Kazdy model ma wlasna przestrzen. Ta sama liczba wymiarow nie oznacza zgodnosci - potrzebny jest pelny reindeks.',
            en: 'Every model has its own space. Matching dimensionality does not mean compatibility - a full reindex is required.'
          }
        },
        {
          q: {
            pl: 'Wyszukiwanie wektorowe w bazie regulaminow zwraca dla zapytania "umowy, ktore NIE wymagaja zgody rodzica" fragmenty o umowach wymagajacych zgody. Dlaczego i co pomoze najbardziej?',
            en: 'Vector search over policy documents answers "contracts that do NOT require parental consent" with passages about contracts that do. Why, and what helps most?'
          },
          options: [
            { pl: 'Za maly wymiar wektora; przejsc na model 3072-wymiarowy', en: 'Vector dimension too small; move to a 3072-dim model' },
            { pl: 'Zla temperatura wyszukiwania; ustawic ja na 0', en: 'Wrong search temperature; set it to 0' },
            { pl: 'Embeddingi slabo koduja negacje; dodac wyszukiwanie hybrydowe z BM25 i reranker', en: 'Embeddings encode negation poorly; add hybrid BM25 search and a reranker' },
            { pl: 'Uszkodzony indeks HNSW; przejsc na skanowanie pelne', en: 'Corrupted HNSW index; switch to a full scan' }
          ],
          correct: 2,
          explain: {
            pl: 'Zdania roznice sie tylko negacja leza blisko siebie w przestrzeni wektorowej. Reranker ocenia pare zapytanie-dokument razem i wylapuje takie przypadki.',
            en: 'Sentences differing only by negation sit close together in vector space. A reranker scores the query-document pair jointly and catches exactly these cases.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 5
    {
      id: 'sampling-params',
      title: {
        pl: 'Parametry samplingu: temperature i top_p',
        en: 'Sampling parameters: temperature and top_p'
      },
      minutes: 8,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="30" font-size="15" fill="var(--text)">temperature 0.0 - sharp</text>' +
          '<rect x="20" y="42" width="200" height="20" rx="4" fill="var(--accent)"/>' +
          '<text x="230" y="58" font-size="13" fill="var(--muted)">mat</text>' +
          '<rect x="20" y="68" width="26" height="20" rx="4" fill="var(--accent)" opacity="0.5"/>' +
          '<text x="54" y="84" font-size="13" fill="var(--muted)">floor</text>' +
          '<rect x="20" y="94" width="10" height="20" rx="4" fill="var(--accent)" opacity="0.3"/>' +
          '<text x="40" y="110" font-size="13" fill="var(--muted)">roof</text>' +
          '<text x="330" y="30" font-size="15" fill="var(--text)">temperature 1.2 - flat</text>' +
          '<rect x="330" y="42" width="120" height="20" rx="4" fill="var(--accent2)"/>' +
          '<text x="460" y="58" font-size="13" fill="var(--muted)">mat</text>' +
          '<rect x="330" y="68" width="92" height="20" rx="4" fill="var(--accent2)" opacity="0.7"/>' +
          '<text x="432" y="84" font-size="13" fill="var(--muted)">floor</text>' +
          '<rect x="330" y="94" width="70" height="20" rx="4" fill="var(--accent2)" opacity="0.5"/>' +
          '<text x="410" y="110" font-size="13" fill="var(--muted)">roof</text>' +
          '<text x="20" y="164" font-size="15" fill="var(--text)">top_p 0.9 - nucleus cut</text>' +
          '<rect x="20" y="180" width="600" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="34" y="196" width="150" height="38" rx="6" fill="var(--ok)" opacity="0.75"/>' +
          '<text x="109" y="220" text-anchor="middle" font-size="13" fill="var(--text)">0.61</text>' +
          '<rect x="192" y="196" width="90" height="38" rx="6" fill="var(--ok)" opacity="0.6"/>' +
          '<text x="237" y="220" text-anchor="middle" font-size="13" fill="var(--text)">0.19</text>' +
          '<rect x="290" y="196" width="60" height="38" rx="6" fill="var(--ok)" opacity="0.45"/>' +
          '<text x="320" y="220" text-anchor="middle" font-size="13" fill="var(--text)">0.10</text>' +
          '<line x1="360" y1="186" x2="360" y2="244" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="372" y="216" font-size="14" fill="var(--err)">cut here, rest discarded</text>' +
          '<rect x="20" y="278" width="600" height="120" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="306" font-size="15" fill="var(--text)">Pick by task</text>' +
          '<text x="40" y="334" font-size="14" fill="var(--muted)">extraction, JSON, classification</text>' +
          '<text x="440" y="334" font-size="14" fill="var(--ok)">temp 0 - 0.2</text>' +
          '<text x="40" y="360" font-size="14" fill="var(--muted)">chat, explanation, summary</text>' +
          '<text x="440" y="360" font-size="14" fill="var(--accent2)">temp 0.6 - 0.8</text>' +
          '<text x="40" y="386" font-size="14" fill="var(--muted)">brainstorm, names, copy variants</text>' +
          '<text x="440" y="386" font-size="14" fill="var(--warn)">temp 0.9 - 1.2</text>' +
          '</svg>',
        caption: {
          pl: 'Temperature splaszcza lub wyostrza rozklad, top_p obcina ogon malo prawdopodobnych tokenow. Dobierasz je do zadania, nie do gustu.',
          en: 'Temperature flattens or sharpens the distribution, top_p truncates the tail of unlikely tokens. You pick them per task, not by taste.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Model po kazdym kroku ma liste kandydatow na nastepny kawalek slowa, kazdy z jakas szansa. Teraz pytanie: czy zawsze bierzemy faworyta, czy czasem pozwalamy wygrac komus z drugiego rzedu?</p>' +
            '<p>Od tego jest <strong>temperature</strong>, czyli pokretlo szalenstwa. Na zero model zawsze wybiera faworyta - jest przewidywalny i troche nudny, jak kucharz, ktory od dwudziestu lat gotuje ten sam rosol. Wysoko podkrecone pozwala wygrywac outsiderom - robi sie ciekawiej, ale czasem wychodzi rosol z czekolada.</p>' +
            '<p>Jest jeszcze <strong>top_p</strong>, czyli bramkarz przy wejsciu. Mowi: do losowania wpuszczamy tylko tych kandydatow, ktorzy razem zbieraja wiekszosc szans, a caly ogon dziwakow zostaje na zewnatrz.</p>' +
            '<p>Prosta zasada: gdy chcesz porzadne dane, krec w dol. Gdy chcesz pomyslow na nazwe firmy, krec w gore.</p>',
          en: '<p>At every step the model holds a list of candidates for the next chunk of a word, each with some chance. The question is: do we always take the favourite, or sometimes let a runner-up win?</p>' +
            '<p>That is what <strong>temperature</strong>, the chaos dial, is for. At zero the model always picks the favourite - predictable and slightly boring, like a cook who has made the same soup for twenty years. Turned up high, outsiders get to win - more interesting, but occasionally you get soup with chocolate in it.</p>' +
            '<p>There is also <strong>top_p</strong>, the bouncer at the door. It says: only candidates that together hold most of the probability get into the draw, the whole tail of weirdos stays outside.</p>' +
            '<p>Simple rule: when you want solid data, turn it down. When you want ideas for a company name, turn it up.</p>'
        },
        school: {
          pl: '<p>Model zwraca <strong>logity</strong>, czyli surowe wyniki dla kazdego tokena w slowniku. Zanim padnie wybor, przechodza one przez warstwe samplingu.</p>' +
            '<h4>temperature</h4>' +
            '<p>Logity sa dzielone przez temperature, a dopiero potem idzie softmax. Dzielenie przez wartosc mniejsza od 1 wyostrza roznice (faworyt zjada niemal cale prawdopodobienstwo), a dzielenie przez wieksza od 1 splaszcza rozklad i daje szanse slabszym kandydatom. Zakres to zwykle 0 do 2, domyslnie okolo 1.</p>' +
            '<pre><code>probs = softmax(logits / temperature)</code></pre>' +
            '<h4>top_p (nucleus sampling)</h4>' +
            '<p>Sortujesz tokeny malejaco po prawdopodobienstwie i bierzesz tylko tyle, ile potrzeba, by ich suma osiagnela p (na przyklad 0,9). Reszta jest odrzucana i losujesz z tego okrojonego zbioru. To adaptacyjne obciecie: gdy model jest pewny, zostaje jeden token; gdy sie waha, zostaje ich kilkadziesiat.</p>' +
            '<p>Jest tez <strong>top_k</strong>, ktore po prostu bierze k najlepszych tokenow. Prostsze, ale sztywne.</p>' +
            '<h4>Dlaczego temperature 0 to nie jest greedy w praktyce</h4>' +
            '<p>Formalnie temperatura 0 oznacza wybor najbardziej prawdopodobnego tokena, wiec powinno byc w pelni powtarzalne. W realnym API tak nie jest: obliczenia na GPU sa rownolegle, a dodawanie liczb zmiennoprzecinkowych w roznej kolejnosci daje minimalnie rozne wyniki. Gdy dwa tokeny maja niemal identyczne prawdopodobienstwo, ten szum decyduje o wyborze, a jedna zmiana rozjezdza cala dalsza generacje.</p>' +
            '<p>Praktyczna rada: nie kombinuj rownoczesnie z temperature i top_p. Ustaw jedno, drugie zostaw domyslne - inaczej trudno powiedziec, ktore ustawienie odpowiada za wynik.</p>',
          en: '<p>The model returns <strong>logits</strong>, raw scores for every token in the vocabulary. Before a choice is made, they pass through the sampling layer.</p>' +
            '<h4>temperature</h4>' +
            '<p>Logits are divided by temperature and only then go through softmax. Dividing by a value below 1 sharpens the differences (the favourite absorbs nearly all probability); dividing by a value above 1 flattens the distribution and gives weaker candidates a chance. The usual range is 0 to 2, with a default around 1.</p>' +
            '<pre><code>probs = softmax(logits / temperature)</code></pre>' +
            '<h4>top_p (nucleus sampling)</h4>' +
            '<p>Sort tokens by descending probability and keep only as many as needed for their sum to reach p (say 0.9). The rest are discarded and you sample from that truncated set. It is an adaptive cutoff: when the model is confident, one token survives; when it hesitates, dozens do.</p>' +
            '<p>There is also <strong>top_k</strong>, which simply keeps the k best tokens. Simpler, but rigid.</p>' +
            '<h4>Why temperature 0 is not greedy in practice</h4>' +
            '<p>Formally temperature 0 means always picking the most probable token, so it should be perfectly reproducible. On a real API it is not: GPU computation is parallel, and adding floating-point numbers in a different order yields slightly different results. When two tokens have nearly identical probability, that noise decides the pick, and one flipped token derails the entire rest of the generation.</p>' +
            '<p>Practical advice: do not tune temperature and top_p at the same time. Set one, leave the other at its default - otherwise you cannot tell which knob produced the result.</p>'
        },
        pro: {
          pl: '<p>Sampling to jedyna warstwa, w ktorej wprost sterujesz kompromisem miedzy powtarzalnoscia a roznorodnoscia. Ustawiaj ja per zadanie, nie globalnie w kliencie - to samo, co poziomy logowania: inny dla ekstrakcji, inny dla copy.</p>' +
            '<h4>Ustawienia, ktore sie bronia w produkcji</h4>' +
            '<ul>' +
            '<li><strong>Ekstrakcja, klasyfikacja, tool calling, generowanie JSON</strong>: temperature 0 do 0,2. Chcesz stabilnego kontraktu, nie stylu.</li>' +
            '<li><strong>Streszczenia, wyjasnienia, chat wsparcia</strong>: 0,5 do 0,8. Naturalny jezyk bez dryfu faktow.</li>' +
            '<li><strong>Burza mozgow, warianty nazw, copy marketingowe</strong>: 0,9 do 1,2, czesto z n wariantow w jednym zadaniu.</li>' +
            '<li><strong>Kod</strong>: nisko, 0 do 0,3. Wyzsza temperatura czesciej wymysla nieistniejace metody API.</li>' +
            '</ul>' +
            '<p>Uwaga na modele rozumujace (reasoning). Czesc z nich ignoruje albo wprost odrzuca temperature - wewnetrzna sciezka rozumowania ma wlasny rezim samplingu. Sprawdz w dokumentacji, zanim wpiszesz parametr do wspolnego wrappera.</p>' +
            '<pre><code>const cfg = {\n  extract:   { temperature: 0 },\n  summarize: { temperature: 0.6 },\n  ideate:    { temperature: 1.0 }\n};\nconst res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 800,\n  ...cfg[taskKind],\n  messages\n});</code></pre>' +
            '<h4>Powtarzalnosc, ktorej naprawde mozesz oczekiwac</h4>' +
            '<p>Nie ma gwarancji bit-w-bit. Nawet z temperature 0 zmienia sie wersja modelu, wersja sprzetu i kolejnosc redukcji. OpenAI oferuje parametr <code>seed</code> plus <code>system_fingerprint</code>, ktory zwieksza szanse na powtorzenie i pozwala wykryc zmiane backendu, ale nadal nie jest to gwarancja. Wniosek dla testow: asertujesz na schemacie (zod), na wlasnosciach (czy wyciagniete pole ma poprawny format, czy kwota zgadza sie z zrodlem) i na metrykach agregatowych z evalow, a nie na dokladnym stringu.</p>' +
            '<h4>Anty-wzorce</h4>' +
            '<p>Podnoszenie temperatury, zeby "naprawic" nudne odpowiedzi - to problem promptu, nie samplingu. Ustawianie temperature 0 dla wszystkiego - powoduje sztywne, powtarzalne sformulowania i petle w dluzszych tekstach. Kregnie obu pokretel naraz - traci sie mozliwosc przypisania efektu. I klasyk: temperature 0,7 w wywolaniu, ktore ma zwrocic JSON zgodny ze schemata - to po prostu wyzszy odsetek retry.</p>' +
            '<p>Warto tez pamietac, ze sampling nie jest jedyna dzwignia roznorodnosci. Jesli potrzebujesz pieciu roznych propozycji, czesto lepiej dziala jedno wywolanie proszace o piec wariantow z jawnym wymogiem, by sie od siebie roznily, niz piec wywolan z podkrecona temperatura - jest taniej, szybciej i model sam pilnuje, zeby warianty nie byly powtorzeniami.</p>',
          en: '<p>Sampling is the only layer where you steer the reproducibility-versus-diversity tradeoff directly. Set it per task, never globally in the client - same idea as log levels: one setting for extraction, another for copywriting.</p>' +
            '<h4>Settings that hold up in production</h4>' +
            '<ul>' +
            '<li><strong>Extraction, classification, tool calling, JSON generation</strong>: temperature 0 to 0.2. You want a stable contract, not style.</li>' +
            '<li><strong>Summaries, explanations, support chat</strong>: 0.5 to 0.8. Natural language without factual drift.</li>' +
            '<li><strong>Brainstorming, name variants, marketing copy</strong>: 0.9 to 1.2, often with n variants in one request.</li>' +
            '<li><strong>Code</strong>: low, 0 to 0.3. Higher temperature invents non-existent API methods far more often.</li>' +
            '</ul>' +
            '<p>Watch out for reasoning models. Several of them ignore or explicitly reject temperature - the internal reasoning trace has its own sampling regime. Check the docs before you bake the parameter into a shared wrapper.</p>' +
            '<pre><code>const cfg = {\n  extract:   { temperature: 0 },\n  summarize: { temperature: 0.6 },\n  ideate:    { temperature: 1.0 }\n};\nconst res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 800,\n  ...cfg[taskKind],\n  messages\n});</code></pre>' +
            '<h4>The reproducibility you can actually expect</h4>' +
            '<p>There is no bit-for-bit guarantee. Even at temperature 0 the model version, the hardware generation and the reduction order all vary. OpenAI exposes a <code>seed</code> parameter plus <code>system_fingerprint</code>, which improves the odds of a repeat and lets you detect a backend change, but it is still not a guarantee. Testing consequence: assert on schema (zod), on properties (does the extracted field have the right format, does the amount match the source) and on aggregate eval metrics - never on the exact string.</p>' +
            '<h4>Anti-patterns</h4>' +
            '<p>Raising temperature to "fix" boring answers - that is a prompt problem, not a sampling one. Setting temperature 0 everywhere - it produces stiff, repetitive phrasing and looping in longer texts. Turning both knobs at once - you lose attribution of the effect. And the classic: temperature 0.7 on a call that must return schema-valid JSON, which simply buys you a higher retry rate.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co robi obnizenie temperature do 0?',
            en: 'What does lowering temperature to 0 do?'
          },
          options: [
            { pl: 'Skraca odpowiedz o polowe', en: 'Halves the length of the answer' },
            { pl: 'Wylacza okno kontekstu', en: 'Disables the context window' },
            { pl: 'Sprawia, ze model wybiera token o najwyzszym prawdopodobienstwie', en: 'Makes the model pick the highest-probability token' },
            { pl: 'Zmniejsza koszt wywolania o polowe', en: 'Cuts the call cost in half' }
          ],
          correct: 2,
          explain: {
            pl: 'Temperature skaluje logity przed softmaxem. Przy 0 rozklad staje sie maksymalnie ostry i wygrywa faworyt.',
            en: 'Temperature scales the logits before softmax. At 0 the distribution becomes maximally sharp and the favourite wins.'
          }
        },
        {
          q: {
            pl: 'Jak dziala top_p 0,9?',
            en: 'How does top_p 0.9 work?'
          },
          options: [
            { pl: 'Bierze zawsze 9 najlepszych tokenow', en: 'It always keeps the 9 best tokens' },
            { pl: 'Bierze najmniejszy zbior tokenow, ktorych prawdopodobienstwa sumuja sie do 0,9', en: 'It keeps the smallest set of tokens whose probabilities sum to 0.9' },
            { pl: 'Odrzuca 90 procent odpowiedzi i generuje na nowo', en: 'It rejects 90 percent of responses and regenerates' },
            { pl: 'Ustawia limit 90 procent okna kontekstu', en: 'It caps usage at 90 percent of the context window' }
          ],
          correct: 1,
          explain: {
            pl: 'To obciecie adaptacyjne: przy pewnym modelu zostaje jeden token, przy niepewnym kilkadziesiat. To rozni je od sztywnego top_k.',
            en: 'It is an adaptive cutoff: one token survives when the model is confident, dozens when it is unsure. That is what separates it from a rigid top_k.'
          }
        },
        {
          q: {
            pl: 'Ktore ustawienie pasuje do wyciagania kwoty i daty z faktury do JSON?',
            en: 'Which setting fits extracting an amount and a date from an invoice into JSON?'
          },
          options: [
            { pl: 'temperature 1,0 dla wiekszej kreatywnosci', en: 'temperature 1.0 for more creativity' },
            { pl: 'temperature 0,7 i top_p 0,5 jednoczesnie', en: 'temperature 0.7 and top_p 0.5 together' },
            { pl: 'temperature 1,5 z wieloma probami', en: 'temperature 1.5 with many attempts' },
            { pl: 'temperature 0 do 0,2', en: 'temperature 0 to 0.2' }
          ],
          correct: 3,
          explain: {
            pl: 'Ekstrakcja to kontrakt, nie tworczosc. Nisko ustawiona temperatura wyraznie obniza odsetek nieprawidlowego JSON i liczbe retry.',
            en: 'Extraction is a contract, not creative writing. A low temperature measurably lowers invalid-JSON rates and retry counts.'
          }
        },
        {
          q: {
            pl: 'Zespol chce testow snapshotowych na dokladny tekst odpowiedzi przy temperature 0 i stalym seedzie. Co powiesz na code review?',
            en: 'A team wants snapshot tests on the exact response text with temperature 0 and a fixed seed. What do you say in review?'
          },
          options: [
            { pl: 'To zadziala, seed gwarantuje identyczne wyjscie', en: 'It will work, the seed guarantees identical output' },
            { pl: 'Zadziala po dodaniu top_p 1,0', en: 'It will work once top_p 1.0 is added' },
            { pl: 'Powtarzalnosc bit-w-bit nie jest gwarantowana; asertuj na schemacie i wlasnosciach, a jakosc mierz evalami', en: 'Bit-for-bit reproducibility is not guaranteed; assert on schema and properties, and measure quality with evals' },
            { pl: 'Wystarczy zwiekszyc max_tokens, zeby ustabilizowac wyjscie', en: 'Just increase max_tokens to stabilize the output' }
          ],
          correct: 2,
          explain: {
            pl: 'Seed i temperature 0 zwiekszaja szanse, ale niedeterminizm zmiennoprzecinkowy i zmiany wersji modelu pozostaja. Snapshoty na string beda flaky i zespol przestanie im ufac.',
            en: 'Seed and temperature 0 improve the odds, but floating-point non-determinism and model version changes remain. String snapshots will be flaky and the team will stop trusting them.'
          }
        }
      ]
    },

    // ---------------------------------------------------------------- 6
    {
      id: 'cost-latency-caching',
      title: {
        pl: 'Koszt, latencja i prompt caching',
        en: 'Cost, latency and prompt caching'
      },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m6arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="30" font-size="15" fill="var(--text)">Prompt layout for cache hits</text>' +
          '<rect x="20" y="44" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="24" y="48" width="230" height="38" rx="8" fill="var(--ok)" opacity="0.65"/>' +
          '<text x="139" y="72" text-anchor="middle" font-size="13" fill="var(--text)">system + tools (stable)</text>' +
          '<rect x="258" y="48" width="200" height="38" rx="8" fill="var(--accent2)" opacity="0.55"/>' +
          '<text x="358" y="72" text-anchor="middle" font-size="13" fill="var(--text)">docs (semi-stable)</text>' +
          '<rect x="462" y="48" width="154" height="38" rx="8" fill="var(--warn)" opacity="0.6"/>' +
          '<text x="539" y="72" text-anchor="middle" font-size="13" fill="var(--text)">user turn (varies)</text>' +
          '<line x1="24" y1="104" x2="458" y2="104" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="240" y="124" text-anchor="middle" font-size="14" fill="var(--ok)">cached prefix, about 10 percent of input price</text>' +
          '<text x="20" y="176" font-size="15" fill="var(--text)">Where the seconds go</text>' +
          '<rect x="20" y="192" width="600" height="70" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<rect x="34" y="210" width="150" height="34" rx="6" fill="var(--accent)" opacity="0.7"/>' +
          '<text x="109" y="232" text-anchor="middle" font-size="13" fill="var(--text)">prefill = TTFT</text>' +
          '<rect x="192" y="210" width="410" height="34" rx="6" fill="var(--accent2)" opacity="0.55"/>' +
          '<text x="397" y="232" text-anchor="middle" font-size="13" fill="var(--text)">decode = output tokens / speed</text>' +
          '<line x1="34" y1="276" x2="602" y2="276" stroke="var(--border)" stroke-width="2" marker-end="url(#m6arrow)"/>' +
          '<text x="34" y="296" font-size="13" fill="var(--muted)">0 s</text>' +
          '<text x="602" y="296" text-anchor="end" font-size="13" fill="var(--muted)">total latency</text>' +
          '<rect x="20" y="318" width="600" height="86" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="346" font-size="14" fill="var(--muted)">Output tokens are the expensive ones</text>' +
          '<text x="40" y="374" font-size="14" fill="var(--err)">cut output length first, then input, then model size</text>' +
          '<text x="40" y="396" font-size="13" fill="var(--muted)">stream tokens so the user sees progress before the answer is done</text>' +
          '</svg>',
        caption: {
          pl: 'Stabilny prefiks promptu na gorze daje trafienia cache, a latencje dzieli sie na prefill (TTFT) i decode zalezny od dlugosci odpowiedzi.',
          en: 'A stable prompt prefix at the top earns cache hits, while latency splits into prefill (TTFT) and decode, which scales with answer length.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Za rozmowe z modelem placisz jak za taksowke, tylko licznik bije od slow. Kazde slowo, ktore wysylasz, kosztuje troche. Kazde slowo, ktore model odpisze, kosztuje duzo wiecej - zwykle kilka razy tyle.</p>' +
            '<p>Dlatego najtansza sztuczka swiata brzmi: popros o krotsza odpowiedz. "W trzech punktach" zamiast "opisz szczegolowo" potrafi obciac rachunek o polowe.</p>' +
            '<p>Jest tez czekanie. Model najpierw musi przeczytac wszystko, co mu wyslales - to ta cisza przed pierwszym slowem. Potem pisze, slowo po slowie. Jak wyswietlasz te slowa na biezaco, czlowiek czeka spokojnie, bo widzi, ze cos sie dzieje. Ta sama sekunda z kreciolkiem wydaje sie dluzsza niz z tekstem, ktory sie pisze.</p>' +
            '<p>I jeszcze jedno: jesli poczatek twojej wiadomosci jest zawsze taki sam, mozna go zapamietac. Nastepnym razem model nie czyta go od nowa - jest szybciej i taniej.</p>',
          en: '<p>Talking to a model is billed like a taxi, except the meter runs on words. Every word you send costs a little. Every word the model writes back costs a lot more - usually several times as much.</p>' +
            '<p>Which is why the cheapest trick in the world is: ask for a shorter answer. "In three bullets" instead of "describe in detail" can halve the bill.</p>' +
            '<p>Then there is waiting. The model first has to read everything you sent - that is the silence before the first word. Then it writes, word by word. If you show those words as they arrive, people wait calmly, because they can see something is happening. The same second feels longer next to a spinner than next to text that is being typed.</p>' +
            '<p>One more thing: if the beginning of your message is always identical, it can be remembered. Next time the model does not re-read it - faster and cheaper.</p>'
        },
        school: {
          pl: '<p>Rozliczenie jest per token i <strong>asymetryczne</strong>: tokeny wyjsciowe kosztuja zwykle 3-5 razy wiecej niz wejsciowe. Powod jest techniczny - wejscie przetwarza sie rownolegle w jednym przebiegu (prefill), a wyjscie powstaje sekwencyjnie, token po tokenie (decode), wiec zajmuje GPU na dluzej.</p>' +
            '<p>Prosty rachunek dla klasy modeli sredniej wielkosci przy okolo 3 USD za milion tokenow wejscia i 15 USD za milion wyjscia: 4 tys. tokenow promptu plus 500 tokenow odpowiedzi to okolo 0,012 plus 0,0075, czyli mniej wiecej 2 centy za wywolanie. Przy 100 tys. wywolan miesiecznie robi sie z tego okolo 2000 USD - i wtedy nagle kazdy zbedny akapit w system prompcie ma cene.</p>' +
            '<h4>Dwie rozne latencje</h4>' +
            '<ul>' +
            '<li><strong>TTFT</strong> (time to first token) - ile czekasz na pierwszy token. Zalezy glownie od dlugosci wejscia i kolejki dostawcy.</li>' +
            '<li><strong>Przepustowosc</strong> - ile tokenow na sekunde leci potem, typowo kilkadziesiat. Calkowity czas to w duzym uproszczeniu TTFT plus liczba tokenow wyjscia podzielona przez ta predkosc.</li>' +
            '</ul>' +
            '<p>Wniosek: dlugie wejscie psuje TTFT, a dluga odpowiedz psuje czas calkowity. To sa dwa osobne problemy z dwoma osobnymi lekarstwami.</p>' +
            '<h4>Prompt caching</h4>' +
            '<p>Dostawcy pozwalaja zapamietac przeliczony <strong>prefiks</strong> promptu. Jesli poczatek kolejnego zapytania jest bajt w bajt identyczny, ta czesc nie jest liczona od nowa: placisz za nia ulamek zwyklej ceny i oszczedzasz czas prefill. Warunek jest twardy - dopasowanie idzie od poczatku promptu, wiec wystarczy wstawic na gorze aktualna date albo identyfikator sesji i cache przestaje trafiac.</p>' +
            '<p>Stad zasada porzadkowania promptu: najpierw to, co stale (rola, instrukcje, definicje narzedzi), potem to, co zmienne (pytanie uzytkownika). Dokladnie jak z warstwami obrazu Dockera albo z hashem w nazwie pliku dla CDN.</p>',
          en: '<p>Billing is per token and <strong>asymmetric</strong>: output tokens usually cost 3-5x more than input tokens. The reason is technical - input is processed in parallel in one pass (prefill), while output is produced sequentially, token by token (decode), occupying the GPU far longer.</p>' +
            '<p>A quick calculation for a mid-size model class at roughly 3 USD per million input tokens and 15 USD per million output: a 4k-token prompt plus a 500-token answer is about 0.012 plus 0.0075, so roughly 2 cents per call. At 100k calls a month that is about 2000 USD - and suddenly every redundant paragraph in the system prompt has a price tag.</p>' +
            '<h4>Two different latencies</h4>' +
            '<ul>' +
            '<li><strong>TTFT</strong> (time to first token) - how long until the first token arrives. Driven mostly by input length and provider queueing.</li>' +
            '<li><strong>Throughput</strong> - tokens per second after that, typically a few dozen. Total time is roughly TTFT plus output token count divided by that speed.</li>' +
            '</ul>' +
            '<p>Conclusion: a long input ruins TTFT, a long answer ruins total time. Two separate problems with two separate cures.</p>' +
            '<h4>Prompt caching</h4>' +
            '<p>Providers let you store the precomputed <strong>prefix</strong> of a prompt. If the beginning of the next request is byte-for-byte identical, that part is not recomputed: you pay a fraction of the normal price and skip that prefill time. The condition is strict - matching runs from the very start of the prompt, so putting the current date or a session id at the top is enough to destroy every cache hit.</p>' +
            '<p>Hence the prompt ordering rule: stable things first (role, instructions, tool definitions), variable things last (the user question). Exactly like Docker image layers or a content hash in a filename for a CDN.</p>'
        },
        pro: {
          pl: '<p>Koszt i latencja to dwie osobne funkcje tych samych zmiennych, wiec optymalizuj je osobno i mierz osobno. Instrumentacja jest warunkiem wstepnym: loguj per zadanie <code>input_tokens</code>, <code>output_tokens</code>, tokeny zapisu i odczytu cache, model, TTFT i czas calkowity. Bez tego kazda dyskusja o kosztach jest zgadywanka.</p>' +
            '<h4>Kolejnosc dzwigni, od najskuteczniejszej</h4>' +
            '<ol>' +
            '<li><strong>Skroc wyjscie.</strong> Najdrozszy token to ten wygenerowany. Wymus zwiezly format (JSON zamiast prozy, limity dlugosci, twarde <code>max_tokens</code>). Czesto 40 procent oszczednosci w jeden dzien.</li>' +
            '<li><strong>Wlacz prompt caching.</strong> Odczyt z cache to zwykle okolo 10 procent ceny wejscia u Anthropic (zapis okolo 125 procent), a u OpenAI automatyczny rabat rzedu 50 procent dla powtarzanych prefiksow. Przy agencie z 20 tys. tokenow narzedzi i instrukcji to jest roznica miedzy rentownoscia a jej brakiem.</li>' +
            '<li><strong>Routing modeli.</strong> Klasyfikacja i ekstrakcja ida na maly model (Haiku, GPT-4o-mini, Flash), a tylko trudne przypadki eskaluja do duzego. Roznica cen miedzy klasami to zwykle rzad wielkosci.</li>' +
            '<li><strong>Przytnij wejscie.</strong> Mniej chunkow z RAG, kompakcja historii, usuniecie nieuzywanych definicji narzedzi.</li>' +
            '<li><strong>Batch API</strong> dla zadan offline - okolo 50 procent taniej, kosztem opoznienia liczonego w godzinach.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 600,\n  system: [\n    { type: "text", text: STABLE_INSTRUCTIONS,\n      cache_control: { type: "ephemeral" } }\n  ],\n  messages: [{ role: "user", content: userTurn }]\n});\nlog({\n  in: res.usage.input_tokens,\n  out: res.usage.output_tokens,\n  cacheRead: res.usage.cache_read_input_tokens\n});</code></pre>' +
            '<h4>Projektowanie promptu pod cache</h4>' +
            '<p>Dopasowanie jest prefiksowe, wiec traktuj prompt jak warstwy Dockerfile: rzeczy zmienne na dol. Konkretne zakazy: brak znacznika czasu na gorze, brak identyfikatora uzytkownika w system prompcie, brak losowej kolejnosci dokumentow z retrievalu, brak nieustabilizowanego JSON.stringify po obiekcie, ktorego klucze moga zmienic kolejnosc. Minimalna dlugosc cachowanego bloku to zwykle okolo 1024 tokeny, wiec cachowanie krotkiego promptu nic nie da. TTL bywa krotki, rzedu 5 minut z odswiezeniem przy uzyciu - dla ruchu ciaglego to swietnie dziala, dla rzadkiego prawie wcale.</p>' +
            '<h4>Latencja odczuwalna</h4>' +
            '<p>Uzytkownik ocenia TTFT, nie czas calkowity. Streaming zmienia postrzegane 8 sekund w akceptowalne, bo tekst rusza po 400 ms. Dla wywolan z narzedziami pokazuj etap ("szukam w dokumentacji"), bo to jest twoj odpowiednik skeletona w React. Jesli generujesz strukture, streamuj czesciowy JSON i renderuj pola, ktore juz sa kompletne - to temat modulu o streamingu.</p>' +
            '<p><strong>Pytanie rekrutacyjne</strong>, ktore pada czesto: dlaczego wersja z cache moze byc drozsza przy pierwszym wywolaniu. Odpowiedz: zapis do cache kosztuje wiecej niz zwykle wejscie, wiec oplaca sie dopiero od drugiego trafienia w oknie TTL - przy jednorazowych, unikalnych promptach caching tylko doklada kosztu.</p>',
          en: '<p>Cost and latency are two separate functions of the same variables, so optimize and measure them separately. Instrumentation is the precondition: log per task <code>input_tokens</code>, <code>output_tokens</code>, cache write and read tokens, model, TTFT and total time. Without that, every cost discussion is guesswork.</p>' +
            '<h4>Levers in order of impact</h4>' +
            '<ol>' +
            '<li><strong>Shorten the output.</strong> The most expensive token is a generated one. Force a terse format (JSON instead of prose, length limits, a hard <code>max_tokens</code>). Often 40 percent savings in a single day.</li>' +
            '<li><strong>Turn on prompt caching.</strong> A cache read is typically about 10 percent of the input price at Anthropic (a write about 125 percent), while OpenAI applies an automatic discount around 50 percent for repeated prefixes. For an agent carrying 20k tokens of tools and instructions this is the difference between viable and not.</li>' +
            '<li><strong>Model routing.</strong> Classification and extraction go to a small model (Haiku, GPT-4o-mini, Flash) and only hard cases escalate to a large one. The price gap between tiers is usually an order of magnitude.</li>' +
            '<li><strong>Trim the input.</strong> Fewer RAG chunks, compacted history, removal of unused tool definitions.</li>' +
            '<li><strong>Batch API</strong> for offline work - about 50 percent cheaper, at the price of latency measured in hours.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 600,\n  system: [\n    { type: "text", text: STABLE_INSTRUCTIONS,\n      cache_control: { type: "ephemeral" } }\n  ],\n  messages: [{ role: "user", content: userTurn }]\n});\nlog({\n  in: res.usage.input_tokens,\n  out: res.usage.output_tokens,\n  cacheRead: res.usage.cache_read_input_tokens\n});</code></pre>' +
            '<h4>Designing prompts for cache</h4>' +
            '<p>Matching is prefix-based, so treat the prompt like Dockerfile layers: volatile things at the bottom. Concrete prohibitions: no timestamp at the top, no user id in the system prompt, no randomly ordered retrieval results, no unstable JSON.stringify over an object whose key order can shift. The minimum cacheable block is usually around 1024 tokens, so caching a short prompt buys nothing. TTL is often short, on the order of 5 minutes refreshed on use - excellent for steady traffic, nearly useless for sparse traffic.</p>' +
            '<h4>Perceived latency</h4>' +
            '<p>Users judge TTFT, not total time. Streaming turns a perceived 8 seconds into something acceptable, because text starts moving after 400 ms. For tool-using calls, show the stage ("searching the docs") - that is your React skeleton equivalent. If you generate structure, stream partial JSON and render the fields that are already complete - the subject of the streaming module.</p>' +
            '<p><strong>A common interview question</strong>: why can the cached version be more expensive on the first call. Answer: a cache write costs more than plain input, so it only pays off from the second hit within the TTL window - with one-off unique prompts, caching just adds cost.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktore tokeny sa zazwyczaj drozsze?',
            en: 'Which tokens are usually more expensive?'
          },
          options: [
            { pl: 'Wyjsciowe, zwykle 3-5 razy drozsze od wejsciowych', en: 'Output tokens, typically 3-5x the price of input' },
            { pl: 'Wejsciowe, bo jest ich wiecej', en: 'Input tokens, because there are more of them' },
            { pl: 'Kosztuja tyle samo', en: 'They cost the same' },
            { pl: 'Zalezy wylacznie od jezyka promptu', en: 'It depends only on the prompt language' }
          ],
          correct: 0,
          explain: {
            pl: 'Wejscie liczy sie rownolegle w jednym przebiegu, wyjscie powstaje token po tokenie i dluzej zajmuje GPU. Dlatego skracanie odpowiedzi to najszybsza oszczednosc.',
            en: 'Input is processed in parallel in one pass, output is produced token by token and holds the GPU longer. Shortening answers is therefore the fastest saving.'
          }
        },
        {
          q: {
            pl: 'Co oznacza TTFT?',
            en: 'What does TTFT mean?'
          },
          options: [
            { pl: 'Calkowity czas odpowiedzi', en: 'Total response time' },
            { pl: 'Limit tokenow na zadanie', en: 'The token limit per request' },
            { pl: 'Czas do pierwszego tokena', en: 'Time to first token' },
            { pl: 'Czas zycia wpisu w cache', en: 'The lifetime of a cache entry' }
          ],
          correct: 2,
          explain: {
            pl: 'To metryka UX numer jeden przy streamingu - uzytkownik ocenia moment startu tekstu, a nie moment jego zakonczenia.',
            en: 'It is the number one UX metric with streaming - users judge when text starts, not when it finishes.'
          }
        },
        {
          q: {
            pl: 'Wstawiasz na samej gorze system promptu aktualna date i godzine. Jaki bedzie efekt dla prompt cachingu?',
            en: 'You put the current date and time at the very top of the system prompt. What happens to prompt caching?'
          },
          options: [
            { pl: 'Cache dziala normalnie, data jest ignorowana', en: 'The cache works fine, the date is ignored' },
            { pl: 'Cache dziala szybciej dzieki swiezemu kluczowi', en: 'The cache gets faster thanks to a fresh key' },
            { pl: 'Cache dziala tylko dla tokenow wyjsciowych', en: 'The cache applies to output tokens only' },
            { pl: 'Kazde wywolanie chybia cache, bo prefiks jest inny', en: 'Every call misses the cache, because the prefix differs' }
          ],
          correct: 3,
          explain: {
            pl: 'Dopasowanie jest prefiksowe i bajt w bajt. Zmienne dane przenies na sam dol promptu, dokladnie jak zmienne warstwy w Dockerfile.',
            en: 'Matching is prefix-based and byte-exact. Move volatile data to the bottom of the prompt, exactly like volatile Dockerfile layers.'
          }
        },
        {
          q: {
            pl: 'Klasyfikator etykietuje 2 mln krotkich wiadomosci miesiecznie, wynik nie jest potrzebny w czasie rzeczywistym, rachunek za duzy. Co dac najpierw?',
            en: 'A classifier labels 2M short messages a month, results are not needed in real time, and the bill is too high. What do you do first?'
          },
          options: [
            { pl: 'Podniesc temperature, zeby skrocic odpowiedzi', en: 'Raise temperature to shorten answers' },
            { pl: 'Przeniesc na maly model plus Batch API i ograniczyc wyjscie do jednej etykiety', en: 'Move to a small model plus the Batch API and cap output to a single label' },
            { pl: 'Wlaczyc prompt caching dla kazdej unikalnej wiadomosci', en: 'Enable prompt caching for every unique message' },
            { pl: 'Zwiekszyc max_tokens, zeby uniknac retry', en: 'Raise max_tokens to avoid retries' }
          ],
          correct: 1,
          explain: {
            pl: 'Klasyfikacja to typowe zadanie dla malego modelu, Batch API daje okolo 50 procent rabatu przy zadaniach offline, a jednowyrazowe wyjscie tnie najdrozszy skladnik. Caching nie pomoze, bo tresc kazdej wiadomosci jest inna.',
            en: 'Classification is a textbook small-model task, the Batch API gives about 50 percent off for offline work, and a one-word output cuts the priciest component. Caching would not help, since every message body differs.'
          }
        }
      ]
    }
  ]
};
