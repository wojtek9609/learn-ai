export default {
  id: 'rag',
  order: 3,
  icon: '📚',
  title: { pl: 'RAG', en: 'RAG' },
  description: {
    pl: 'Jak dać modelowi dostęp do Twoich danych bez trenowania go od nowa: wyszukiwanie, chunking, bazy wektorowe, hybryda, reranking i ewaluacja retrievalu.',
    en: 'How to give a model access to your data without retraining it: retrieval, chunking, vector databases, hybrid search, reranking and retrieval evaluation.'
  },
  lessons: [
    {
      id: 'what-is-rag',
      title: { pl: 'Czym jest RAG', en: 'What is RAG' },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="rag1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="20" y="30" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="66" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
          '<rect x="235" y="30" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Retriever</text>' +
          '<text x="320" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">search top-k</text>' +
          '<rect x="450" y="30" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="535" y="58" text-anchor="middle" font-size="15" fill="var(--text)">Your knowledge</text>' +
          '<text x="535" y="78" text-anchor="middle" font-size="13" fill="var(--muted)">docs, tickets, wiki</text>' +
          '<rect x="235" y="170" width="170" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--text)">Prompt</text>' +
          '<text x="320" y="220" text-anchor="middle" font-size="13" fill="var(--muted)">question + 5 chunks</text>' +
          '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--text)">LLM answer</text>' +
          '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--muted)">with citations</text>' +
          '<path d="M190,60 L228,60" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag1-a)"/>' +
          '<path d="M405,60 L443,60" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag1-a)"/>' +
          '<path d="M535,90 L535,130 L320,130 L320,163" stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#rag1-a)"/>' +
          '<path d="M105,90 L105,205 L228,205" stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#rag1-a)"/>' +
          '<path d="M320,240 L320,293" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag1-a)"/>' +
          '</svg>',
        caption: {
          pl: 'RAG to zwykły pipeline: pytanie idzie do wyszukiwarki, znalezione fragmenty trafiają do promptu, model odpowiada z cytatami.',
          en: 'RAG is a plain pipeline: the question goes to a search engine, the found chunks go into the prompt, the model answers with citations.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Krok po kroku: to samo pytanie przechodzi przez cały pipeline RAG, od wyszukiwarki po odpowiedź z cytatami.',
          en: 'Step by step: one question travels the whole RAG pipeline, from the retriever to a cited answer.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag1i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="24" font-size="14" fill="var(--muted)">Step 1 - the question arrives</text>' +
              '<rect x="20" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="78" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
              '<rect x="235" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="68" text-anchor="middle" font-size="15" fill="var(--muted)">Retriever</text>' +
              '<text x="320" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">idle</text>' +
              '<rect x="450" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="68" text-anchor="middle" font-size="15" fill="var(--muted)">Your knowledge</text>' +
              '<text x="535" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">docs, tickets, wiki</text>' +
              '<rect x="235" y="170" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--muted)">Prompt</text>' +
              '<text x="320" y="222" text-anchor="middle" font-size="13" fill="var(--muted)">empty</text>' +
              '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--muted)">LLM answer</text>' +
              '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M190,72 L228,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M405,72 L443,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M535,100 L535,136 L320,136 L320,163" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M105,100 L105,206 L228,206" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,242 L320,293" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="384" font-size="13" fill="var(--muted)">Nothing retrieved yet - the model has not been called.</text>' +
              '</svg>',
            label: { pl: 'Pytanie wchodzi', en: 'The question arrives' },
            note: {
              pl: 'Start: mamy tylko pytanie użytkownika. Model jeszcze nie wie nic o Twoich dokumentach.',
              en: 'Start: we only have the user question. The model knows nothing about your documents yet.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag1i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="24" font-size="14" fill="var(--muted)">Step 2 - the retriever searches your data</text>' +
              '<rect x="20" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="78" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
              '<rect x="235" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Retriever</text>' +
              '<text x="320" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">search top-k</text>' +
              '<rect x="450" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="535" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Your knowledge</text>' +
              '<text x="535" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">docs, tickets, wiki</text>' +
              '<rect x="235" y="170" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--muted)">Prompt</text>' +
              '<text x="320" y="222" text-anchor="middle" font-size="13" fill="var(--muted)">empty</text>' +
              '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--muted)">LLM answer</text>' +
              '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M190,72 L228,72" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<path d="M405,72 L443,72" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<path d="M535,100 L535,136 L320,136 L320,163" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M105,100 L105,206 L228,206" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,242 L320,293" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="384" font-size="13" fill="var(--muted)">This step is plain search - no LLM involved.</text>' +
              '</svg>',
            label: { pl: 'Retriever szuka', en: 'The retriever searches' },
            note: {
              pl: 'Pytanie idzie do wyszukiwarki, a ta przegląda Twoją bazę wiedzy. To zwykłe wyszukiwanie, model jeszcze nie działa.',
              en: 'The question goes to the search engine, which scans your knowledge base. Plain search - the model is still idle.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag1i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="24" font-size="14" fill="var(--muted)">Step 3 - top-k chunks come back</text>' +
              '<rect x="20" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="78" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
              '<rect x="235" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Retriever</text>' +
              '<text x="320" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">5 chunks found</text>' +
              '<rect x="450" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Your knowledge</text>' +
              '<text x="535" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">docs, tickets, wiki</text>' +
              '<rect x="235" y="170" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--text)">Prompt</text>' +
              '<text x="320" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">chunks arriving</text>' +
              '<rect x="250" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="296" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="342" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--muted)">LLM answer</text>' +
              '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M190,72 L228,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M405,72 L443,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M535,100 L535,136 L320,136 L320,163" fill="none" stroke="var(--accent2)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<path d="M105,100 L105,206 L228,206" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,242 L320,293" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="384" font-size="13" fill="var(--muted)">Bad chunks here means a confident wrong answer later.</text>' +
              '</svg>',
            label: { pl: 'Fragmenty wracają', en: 'Chunks come back' },
            note: {
              pl: 'Pięć najlepszych fragmentów wędruje do promptu. Jakość tego kroku decyduje o jakości całego RAG.',
              en: 'The top five chunks travel into the prompt. The quality of this step decides the quality of the whole RAG system.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag1i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="24" font-size="14" fill="var(--muted)">Step 4 - the prompt is assembled</text>' +
              '<rect x="20" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="105" y="78" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
              '<rect x="235" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Retriever</text>' +
              '<text x="320" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">done</text>' +
              '<rect x="450" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Your knowledge</text>' +
              '<text x="535" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">docs, tickets, wiki</text>' +
              '<rect x="235" y="170" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--text)">Prompt</text>' +
              '<text x="320" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">question + 5 chunks</text>' +
              '<rect x="250" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="296" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="342" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--muted)">LLM answer</text>' +
              '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--muted)">generating</text>' +
              '<path d="M190,72 L228,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M405,72 L443,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M535,100 L535,136 L320,136 L320,163" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M105,100 L105,206 L228,206" fill="none" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<path d="M320,242 L320,293" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<text x="20" y="384" font-size="13" fill="var(--muted)">Instruction: answer only from these chunks, cite the source.</text>' +
              '</svg>',
            label: { pl: 'Prompt gotowy', en: 'Prompt assembled' },
            note: {
              pl: 'Pytanie i fragmenty lądują w jednym promptcie z instrukcją: odpowiadaj tylko z tego materiału i podaj źródło.',
              en: 'The question and the chunks land in one prompt with the instruction: answer only from this material and cite the source.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag1i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="24" font-size="14" fill="var(--muted)">Step 5 - grounded answer with citations</text>' +
              '<rect x="20" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="105" y="78" text-anchor="middle" font-size="15" fill="var(--text)">User question</text>' +
              '<rect x="235" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Retriever</text>' +
              '<text x="320" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">done</text>' +
              '<rect x="450" y="44" width="170" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="535" y="68" text-anchor="middle" font-size="15" fill="var(--text)">Your knowledge</text>' +
              '<text x="535" y="88" text-anchor="middle" font-size="13" fill="var(--muted)">swap it, answer changes</text>' +
              '<rect x="235" y="170" width="170" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="198" text-anchor="middle" font-size="15" fill="var(--text)">Prompt</text>' +
              '<text x="320" y="216" text-anchor="middle" font-size="13" fill="var(--muted)">question + 5 chunks</text>' +
              '<rect x="250" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="296" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="342" y="224" width="36" height="12" rx="6" fill="var(--accent2)"/>' +
              '<rect x="235" y="300" width="170" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="328" text-anchor="middle" font-size="15" fill="var(--text)">LLM answer</text>' +
              '<text x="320" y="348" text-anchor="middle" font-size="13" fill="var(--ok)">with citations</text>' +
              '<path d="M190,72 L228,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M405,72 L443,72" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M535,100 L535,136 L320,136 L320,163" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M105,100 L105,206 L228,206" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,242 L320,293" stroke="var(--ok)" stroke-width="2" marker-end="url(#rag1i-a)"/>' +
              '<text x="20" y="384" font-size="13" fill="var(--muted)">No retraining anywhere: update the docs, the answer updates.</text>' +
              '</svg>',
            label: { pl: 'Odpowiedź z cytatami', en: 'Answer with citations' },
            note: {
              pl: 'Model odpowiada wyłącznie z podanego materiału i wskazuje źródło. Zmiana dokumentów natychmiast zmienia odpowiedź - bez trenowania.',
              en: 'The model answers only from the supplied material and points at the source. Change the docs and the answer changes instantly - no training involved.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie kolegę, który zna cały internet sprzed roku, ale nigdy nie widział dokumentów Twojej firmy. Pytasz go: ile dni urlopu mi zostało? On nie ma pojęcia, więc zmyśla coś sensownie brzmiącego.</p><p>RAG to prosty trik: zanim zadasz pytanie, biegniesz do szafy z dokumentami, wyciągasz trzy najbardziej pasujące kartki i kładziesz je koledze na biurku. Potem mówisz: odpowiedz na moje pytanie, ale korzystaj tylko z tych kartek i powiedz, z której wziąłeś odpowiedź.</p><p>Cała magia jest w tym, że kolega nie musi się niczego uczyć na nowo. Zmieniasz kartki w szafie, a on natychmiast odpowiada inaczej. To jak podpowiedzi na ściądze: model dalej mówi ładnie, ale fakty bierze z Twojej ściągi.</p><p>Jeżeli wyciągniesz z szafy złe kartki, kolega odpowie pewnym głosem i całkowicie źle. Dlatego w RAG najtrudniejsza część to nie model, tylko szukanie właściwych kartek.</p>',
          en: '<p>Imagine a friend who has read most of the internet up to last year but has never seen your company documents. You ask: how many vacation days do I have left? He has no idea, so he invents something that sounds plausible.</p><p>RAG is a simple trick: before you ask, you run to the filing cabinet, pull out the three most relevant sheets of paper and put them on his desk. Then you say: answer my question, but use only these sheets, and tell me which one you took it from.</p><p>The magic is that your friend never has to learn anything new. You swap the papers in the cabinet and his answers change instantly. It is like a cheat sheet: the model still talks beautifully, but the facts come from your notes.</p><p>If you hand him the wrong sheets, he will answer confidently and be completely wrong. That is why in RAG the hard part is never the model, it is finding the right sheets.</p>'
        },
        school: {
          pl: '<p><strong>RAG</strong> (Retrieval-Augmented Generation, generowanie wspomagane wyszukiwaniem) to wzorzec, w którym przed wywołaniem modelu dokładasz do promptu fragmenty Twoich danych znalezione wyszukiwarką.</p><p>Pipeline ma dwie fazy. <em>Indeksowanie</em> dzieje się offline: bierzesz dokumenty, tniesz je na fragmenty (chunki), liczysz dla nich embeddingi (wektory) i zapisujesz w bazie. <em>Zapytanie</em> dzieje się online: liczysz embedding pytania, znajdujesz k najbardziej podobnych chunków i wklejasz je do promptu.</p><pre><code>const chunks = await search(question, { k: 5 });\nconst prompt = [\n  "Answer using ONLY the context below.",\n  "If the answer is not there, say you do not know.",\n  ...chunks.map(c =&gt; c.id + ": " + c.text),\n  "Question: " + question\n].join("\\n\\n");</code></pre><p>Frontendowa analogia: model to komponent, a RAG to warstwa danych. Nie przepisujesz komponentu, gdy zmienia się treść w CMS. Podmieniasz propsy.</p><p>Dlaczego nie fine-tuning? Fine-tuning zmienia <em>styl i format</em> odpowiedzi, słabo nadaje się do wtłaczania faktów. Fakty się zmieniają codziennie, a trening kosztuje czas i pieniądze. RAG aktualizujesz jednym zapisem do bazy.</p><p>Kiedy RAG jest złym narzędziem? Gdy dane mieszczą się w kontekście (regulamin na 20 stron po prostu wklej), gdy pytania wymagają agregacji zamiast wyszukiwania (ile mamy klientów w Polsce to zapytanie SQL, nie semantyczne szukanie) i gdy potrzebujesz dokładnych obliczeń. RAG odpowiada na pytania typu znajdź i wyjaśnij, nie policz wszystko.</p>',
          en: '<p><strong>RAG</strong> (Retrieval-Augmented Generation) is a pattern where, before calling the model, you add pieces of your own data to the prompt, found by a search engine.</p><p>The pipeline has two phases. <em>Indexing</em> happens offline: take documents, cut them into chunks, compute embeddings (vectors) for them, store them in a database. <em>Querying</em> happens online: embed the question, find the k most similar chunks, paste them into the prompt.</p><pre><code>const chunks = await search(question, { k: 5 });\nconst prompt = [\n  "Answer using ONLY the context below.",\n  "If the answer is not there, say you do not know.",\n  ...chunks.map(c =&gt; c.id + ": " + c.text),\n  "Question: " + question\n].join("\\n\\n");</code></pre><p>Frontend analogy: the model is a component, RAG is the data layer. You do not rewrite the component when the CMS content changes. You swap the props.</p><p>Why not fine-tuning? Fine-tuning changes <em>style and format</em>, it is a poor way to push facts in. Facts change daily and training costs time and money. RAG updates with a single database write.</p><p>When is RAG the wrong tool? When the data fits in the context window (a 20 page policy: just paste it), when questions need aggregation rather than search (how many customers do we have in Poland is a SQL query, not semantic search), and when you need exact arithmetic. RAG answers find-and-explain questions, not count-everything questions.</p>'
        },
        pro: {
          pl: '<p>RAG traktuj jak system wyszukiwania z ładnym frontendem generatywnym. W produkcji 80 procent jakości pochodzi z retrievalu, nie z modelu. Jeżeli chunk z odpowiedzią nie trafi do promptu, żaden Claude ani GPT tego nie naprawi.</p><h4>Architektura minimalna</h4><ul><li>Ingest: parser (unstructured, pdfplumber), chunking, metadane (source, url, updated_at, acl).</li><li>Embeddingi: OpenAI text-embedding-3-small (1536 wymiarów, ok. 0,02 USD za 1M tokenów) lub Voyage voyage-3. Dla polskiego sprawdzaj modele wielojęzyczne, nie zakładaj.</li><li>Store: pgvector, jeżeli już masz Postgresa, Qdrant lub Vespa przy dziesiątkach milionów wektorów.</li><li>Generacja: Claude lub GPT z twardą instrukcją cytowania identyfikatorów chunków.</li></ul><h4>Liczby, które warto znać</h4><p>Typowy chunk to 300-800 tokenów. Przy k=5 dokładasz 2-4k tokenów kontekstu na zapytanie. Przy cenie rzędu 3 USD za 1M tokenów wejściowych to około 0,01 USD na zapytanie, więc koszt kontekstu zwykle przebija koszt embeddingów o rząd wielkości. Latencja: embedding pytania 20-60 ms, ANN search 5-30 ms, reranker 100-300 ms, generacja 1-5 s. Retrieval prawie nigdy nie jest wąskim gardłem, więc nie optymalizuj go przedwcześnie.</p><h4>Kontrakt promptu</h4><pre><code>System: Answer only from &lt;context&gt;. Every claim needs a [chunk_id].\nIf context is insufficient, reply exactly: INSUFFICIENT_CONTEXT.</code></pre><p>Ten literalny token pozwala w kodzie wykryć brak pokrycia i pokazać UI typu nie znalazłem, zamiast konfabulacji. To jest różnica między demem a produktem.</p><h4>Pułapki</h4><ul><li><strong>ACL po fakcie.</strong> Filtruj uprawnienia w zapytaniu do bazy, nie po retrievalu i nigdy w prompcie. Wyciek danych HR to incydent, nie bug.</li><li><strong>RAG zamiast SQL.</strong> Pytania agregujące kieruj do tool callingu z prawdziwym zapytaniem, hybryda RAG plus narzędzia bije czysty RAG.</li><li><strong>Brak wersjonowania indeksu.</strong> Zmiana modelu embeddingów wymaga pełnego reindeksu, wektory z różnych modeli są nieporównywalne.</li></ul><p>Na rozmowie kwalifikacyjnej najczęstsze pytanie brzmi: RAG czy fine-tuning. Poprawna odpowiedź: RAG do wiedzy zmiennej i cytowalnej, fine-tuning do stylu, formatu i zbijania kosztów przez skrócenie promptu. Zwykle robi się jedno i drugie, ale zaczyna od RAG. Warto też dodać, że RAG nie jest jednym wywołaniem modelu: w dojrzałym systemie dochodzi przepisywanie zapytania (query rewriting) na podstawie historii rozmowy, bo pytanie a ile to kosztuje bez kontekstu poprzedniej tury jest bezużyteczne dla wyszukiwarki. To dodatkowe wywołanie taniego modelu, rzędu 200 ms, i zwykle najlepiej zwracająca się inwestycja po hybrydzie.</p>',
          en: '<p>Treat RAG as a search system with a nice generative frontend. In production 80 percent of quality comes from retrieval, not from the model. If the chunk containing the answer never reaches the prompt, no Claude or GPT will save you.</p><h4>Minimal architecture</h4><ul><li>Ingest: parser (unstructured, pdfplumber), chunking, metadata (source, url, updated_at, acl).</li><li>Embeddings: OpenAI text-embedding-3-small (1536 dims, about 0.02 USD per 1M tokens) or Voyage voyage-3. For non-English content verify multilingual models rather than assuming.</li><li>Store: pgvector if you already run Postgres, Qdrant or Vespa at tens of millions of vectors.</li><li>Generation: Claude or GPT with a hard instruction to cite chunk ids.</li></ul><h4>Numbers worth knowing</h4><p>A typical chunk is 300-800 tokens. At k=5 you add 2-4k context tokens per query. At roughly 3 USD per 1M input tokens that is about 0.01 USD per query, so context cost usually dwarfs embedding cost by an order of magnitude. Latency: query embedding 20-60 ms, ANN search 5-30 ms, reranker 100-300 ms, generation 1-5 s. Retrieval is almost never the bottleneck, so do not optimize it prematurely.</p><h4>The prompt contract</h4><pre><code>System: Answer only from &lt;context&gt;. Every claim needs a [chunk_id].\nIf context is insufficient, reply exactly: INSUFFICIENT_CONTEXT.</code></pre><p>That literal token lets your code detect missing coverage and render an honest not-found state instead of a confabulation. It is the difference between a demo and a product.</p><h4>Pitfalls</h4><ul><li><strong>ACL applied late.</strong> Filter permissions in the database query, not after retrieval and never in the prompt. Leaking HR documents is an incident, not a bug.</li><li><strong>RAG instead of SQL.</strong> Route aggregation questions to tool calling with a real query. RAG plus tools beats pure RAG.</li><li><strong>No index versioning.</strong> Changing the embedding model requires a full reindex, vectors from different models are not comparable.</li></ul><p>The classic interview question is RAG versus fine-tuning. The correct answer: RAG for changing, citable knowledge, fine-tuning for style, format and cutting cost by shortening prompts. Usually you do both, but you start with RAG.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Co dokładnie robi krok "retrieval" w RAG?', en: 'What exactly does the retrieval step in RAG do?' },
          options: [
            { pl: 'Dotrenowuje model na Twoich dokumentach', en: 'Fine-tunes the model on your documents' },
            { pl: 'Znajduje fragmenty dokumentów i wkleja je do promptu', en: 'Finds document chunks and pastes them into the prompt' },
            { pl: 'Kompresuje okno kontekstu modelu', en: 'Compresses the model context window' },
            { pl: 'Zmienia wagi modelu w czasie odpowiedzi', en: 'Changes model weights at answer time' }
          ],
          correct: 1,
          explain: {
            pl: 'Retrieval to zwykłe wyszukiwanie: wybiera k fragmentów i dokłada je do promptu. Wagi modelu pozostają nietknięte.',
            en: 'Retrieval is plain search: it selects k chunks and adds them to the prompt. Model weights are untouched.'
          }
        },
        {
          q: { pl: 'Które zadanie NAJGORZEJ pasuje do RAG?', en: 'Which task is the WORST fit for RAG?' },
          options: [
            { pl: 'Odpowiadanie na pytania o politykę urlopową z cytatami', en: 'Answering vacation policy questions with citations' },
            { pl: 'Wyjaśnianie fragmentu wewnętrznej dokumentacji API', en: 'Explaining a piece of internal API documentation' },
            { pl: 'Policzenie, ilu klientów odnowiło subskrypcję w Q3', en: 'Counting how many customers renewed in Q3' },
            { pl: 'Znalezienie podobnego zgłoszenia w bazie ticketów', en: 'Finding a similar ticket in the ticket database' }
          ],
          correct: 2,
          explain: {
            pl: 'Agregacja liczbowa to zapytanie SQL. Wyszukiwanie semantyczne zwróci kilka pasujących zdań, a nie pełny zbiór do zliczenia.',
            en: 'Numeric aggregation is a SQL query. Semantic search returns a few matching sentences, not the complete set you need to count.'
          }
        },
        {
          q: { pl: 'Zmieniasz model embeddingów z 1536 na 1024 wymiary. Co musisz zrobić?', en: 'You switch the embedding model from 1536 to 1024 dimensions. What must you do?' },
          options: [
            { pl: 'Przeliczyć od nowa cały indeks', en: 'Recompute the entire index from scratch' },
            { pl: 'Tylko zwiększyć k w zapytaniu', en: 'Just increase k in the query' },
            { pl: 'Nic, baza sama skonwertuje wektory', en: 'Nothing, the database converts vectors automatically' },
            { pl: 'Dotrenować model generujący odpowiedzi', en: 'Fine-tune the answering model' }
          ],
          correct: 0,
          explain: {
            pl: 'Wektory z różnych modeli leżą w innych przestrzeniach, więc podobieństwo między nimi nie ma sensu. Zmiana modelu to zawsze pełny reindeks.',
            en: 'Vectors from different models live in different spaces, so similarity between them is meaningless. Changing models always means a full reindex.'
          }
        },
        {
          q: { pl: 'Twoja aplikacja RAG odpowiada pewnie na pytania, na które w bazie nie ma danych. Najlepsza produkcyjna reakcja?', en: 'Your RAG app answers confidently on questions with no data in the index. Best production fix?' },
          options: [
            { pl: 'Obniżyć temperature do zera', en: 'Lower temperature to zero' },
            { pl: 'Zwiększyć k z 5 do 50', en: 'Increase k from 5 to 50' },
            { pl: 'Kazać modelowi zwrócić ustalony token braku pokrycia i obsłużyć go w kodzie', en: 'Have the model emit a fixed insufficient-context token and handle it in code' },
            { pl: 'Zmienić model na większy', en: 'Switch to a bigger model' }
          ],
          correct: 2,
          explain: {
            pl: 'Temperature zero nie usuwa halucynacji, a duże k tylko rozmywa kontekst. Jawny, wykrywalny sygnał braku danych pozwala pokazać uczciwy stan pusty.',
            en: 'Temperature zero does not remove hallucinations and a huge k just dilutes context. An explicit, detectable no-data signal lets you render an honest empty state.'
          }
        }
      ]
    },

    {
      id: 'chunking',
      title: { pl: 'Chunking', en: 'Chunking' },
      minutes: 9,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="34" font-size="15" fill="var(--text)">One document, three chunking strategies</text>' +
          '<rect x="20" y="60" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="89" text-anchor="middle" font-size="14" fill="var(--muted)">Original document</text>' +
          '<text x="20" y="146" font-size="14" fill="var(--muted)">Fixed size, no overlap</text>' +
          '<rect x="20" y="158" width="190" height="42" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<rect x="225" y="158" width="190" height="42" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<rect x="430" y="158" width="190" height="42" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="320" y="185" text-anchor="middle" font-size="13" fill="var(--err)">sentence cut in half here</text>' +
          '<text x="20" y="240" font-size="14" fill="var(--muted)">Fixed size with overlap</text>' +
          '<rect x="20" y="252" width="230" height="42" rx="8" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<rect x="205" y="252" width="230" height="42" rx="8" fill="none" stroke="var(--warn)" stroke-width="2"/>' +
          '<rect x="390" y="252" width="230" height="42" rx="8" fill="none" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="279" text-anchor="middle" font-size="13" fill="var(--warn)">shared tail keeps context</text>' +
          '<text x="20" y="334" font-size="14" fill="var(--muted)">Structural, split on headings</text>' +
          '<rect x="20" y="346" width="150" height="42" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<rect x="180" y="346" width="250" height="42" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<rect x="440" y="346" width="180" height="42" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="373" text-anchor="middle" font-size="13" fill="var(--ok)">one section = one chunk</text>' +
          '</svg>',
        caption: {
          pl: 'Ten sam dokument pocięty na trzy sposoby. Nakładka ratuje zdania na granicy, a podział po nagłówkach zachowuje sens sekcji.',
          en: 'The same document cut three ways. Overlap rescues sentences at the boundary, splitting on headings preserves section meaning.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Masz grubą książkę kucharską i chcesz szybko znajdować przepisy. Nie wkładasz do szuflady całej książki, bo za duża. Nie wkładasz też pojedynczych słów, bo ze słowa mąka nic nie wynika.</p><p>Tniesz książkę na kawałki wielkości jednego przepisu. Każdy kawałek ma sens sam z siebie: składniki i kroki razem.</p><p>Problem pojawia się, gdy tniesz na ślepo co dwie strony. Wtedy połowa przepisu ląduje w jednym kawałku, a piekarnik i temperatura w drugim. Ktoś znajdzie kawałek ze składnikami i upiecze ciasto w za zimnym piekarniku.</p><p>Dlatego robisz dwie rzeczy. Po pierwsze tniesz tam, gdzie kończy się myśl, na przykład po nagłówku przepisu. Po drugie zostawiasz małą zakładkę: koniec poprzedniego kawałka powtarzasz na początku następnego, żeby nic nie zginęło na styku.</p><p>Do każdego kawałka doklejasz karteczkę: z jakiej książki, ze strony ilu i z kiedy. Dzięki temu wiadomo, skąd wzięła się odpowiedź.</p>',
          en: '<p>You have a thick cookbook and you want to find recipes fast. You do not put the whole book in a drawer, it is too big. You do not put single words in either, because the word flour tells you nothing.</p><p>You cut the book into pieces the size of one recipe. Each piece makes sense on its own: ingredients and steps together.</p><p>Trouble starts when you cut blindly every two pages. Then half the recipe lands in one piece and the oven temperature in another. Somebody finds the ingredients piece and bakes a cake in a cold oven.</p><p>So you do two things. First, you cut where a thought ends, for example after a recipe heading. Second, you leave a small flap: you repeat the end of the previous piece at the start of the next one, so nothing is lost at the seam.</p><p>On every piece you stick a note: which book, which page, and from when. That way you always know where the answer came from.</p>'
        },
        school: {
          pl: '<p><strong>Chunking</strong> to dzielenie dokumentów na fragmenty, które będą osobnymi jednostkami wyszukiwania. Chunk to najmniejsza rzecz, jaką możesz zwrócić modelowi, więc jego rozmiar decyduje o wszystkim.</p><p>Za mały chunk (100 tokenów) trafia precyzyjnie, ale nie zawiera kontekstu, więc model nie ma z czego odpowiedzieć. Za duży (3000 tokenów) niesie kontekst, ale rozmywa embedding: jeden wektor musi reprezentować pięć różnych tematów naraz, więc pasuje do wszystkiego i do niczego. Praktyczny punkt startowy to <strong>500 tokenów z 10-15 procent nakładki</strong>.</p><p>Trzy strategie:</p><ul><li><strong>Stała długość</strong> - tnij co N znaków. Najprostsze, dobre na start, brzydkie na granicach.</li><li><strong>Strukturalna</strong> - tnij po nagłówkach, sekcjach, funkcjach w kodzie. Zwykle najlepszy stosunek wysiłku do jakości, bo autor już podzielił tekst za Ciebie.</li><li><strong>Semantyczna</strong> - licz embeddingi zdań i tnij tam, gdzie temat skacze. Ładne w teorii, drogie w indeksowaniu, rzadko warte zachodu na starcie.</li></ul><pre><code>function chunk(text, size = 2000, overlap = 200) {\n  const out = [];\n  for (let i = 0; i &lt; text.length; i += size - overlap) {\n    out.push(text.slice(i, i + size));\n  }\n  return out;\n}</code></pre><p>Analogia frontendowa: chunk to komponent. Za mały i musisz go składać z dziesięciu innych, żeby coś pokazał. Za duży i nie da się go użyć ponownie w innym miejscu.</p><p>Do każdego chunka zapisz <strong>metadane</strong>: identyfikator dokumentu, tytuł, URL, datę aktualizacji, sekcję i uprawnienia. Metadane pozwalają filtrować wyniki i pokazywać cytaty, a to one budują zaufanie użytkownika.</p>',
          en: '<p><strong>Chunking</strong> is splitting documents into fragments that become separate search units. A chunk is the smallest thing you can hand back to the model, so its size decides everything.</p><p>Too small (100 tokens) and retrieval is precise but carries no context, so the model has nothing to answer from. Too large (3000 tokens) and you carry context but blur the embedding: one vector has to represent five topics at once, so it matches everything and nothing. A practical starting point is <strong>500 tokens with 10-15 percent overlap</strong>.</p><p>Three strategies:</p><ul><li><strong>Fixed size</strong> - cut every N characters. Simplest, fine to start with, ugly at the boundaries.</li><li><strong>Structural</strong> - split on headings, sections, functions in code. Usually the best effort-to-quality ratio, because the author already segmented the text for you.</li><li><strong>Semantic</strong> - embed sentences and cut where the topic jumps. Elegant in theory, expensive at index time, rarely worth it on day one.</li></ul><pre><code>function chunk(text, size = 2000, overlap = 200) {\n  const out = [];\n  for (let i = 0; i &lt; text.length; i += size - overlap) {\n    out.push(text.slice(i, i + size));\n  }\n  return out;\n}</code></pre><p>Frontend analogy: a chunk is a component. Too small and you need ten of them to render anything. Too large and you cannot reuse it anywhere else.</p><p>Store <strong>metadata</strong> with every chunk: document id, title, URL, updated_at, section and permissions. Metadata lets you filter results and render citations, and citations are what build user trust.</p>'
        },
        pro: {
          pl: '<p>Chunking to najtańsza dźwignia jakości w RAG. Zmiana strategii cięcia potrafi podnieść recall@10 o kilkanaście punktów bez dotykania modelu.</p><h4>Rozmiar i nakładka</h4><p>Tnij po tokenach, nie po znakach, bo limity kontekstu są tokenowe. Punkt wyjścia: 512 tokenów, overlap 64 (12,5 procent). Dla FAQ i tabel schodź do 200-300, dla prozy technicznej idź do 800-1000. Overlap powyżej 25 procent podnosi koszt indeksu i zaśmieca wyniki duplikatami, które potem musisz deduplikować przed wysłaniem do modelu.</p><h4>Structure-aware jest domyślnie lepszy</h4><p>Markdown tnij po nagłówkach h2/h3 z LangChain MarkdownHeaderTextSplitter lub własnym parserem. Kod tnij po funkcjach przez tree-sitter, nigdy po liniach. PDF przepuść przez unstructured.io albo Docling, żeby najpierw odzyskać strukturę, bo naiwny pdftotext skleja kolumny i rozbija tabele. Tabele przechowuj w całości i dołączaj nagłówki kolumn do każdego wiersza, inaczej wiersz bez nagłówka jest bezużyteczny.</p><h4>Contextual retrieval</h4><p>Technika opisana przez Anthropic: przed embeddingiem doklej do każdego chunka 50-100 tokenów kontekstu wygenerowanego przez tani model, na przykład zdanie mówiące, z jakiego dokumentu i sekcji pochodzi fragment. Raportowana redukcja nieudanych retrievali sięga kilkudziesięciu procent, a przy prompt cachingu koszt wzbogacenia całego korpusu jest rzędu 1 USD za milion tokenów dokumentów.</p><pre><code>chunk_for_embedding =\n  "Document: Refund Policy 2025, Section: Late refunds.\\n" +\n  raw_chunk_text</code></pre><h4>Wzorzec small-to-big</h4><p>Indeksuj małe, precyzyjne chunki (200 tokenów), ale zwracaj modelowi ich rodzica (cały rozdział). Dostajesz precyzję wyszukiwania i szerokość kontekstu naraz. W LlamaIndex to ParentDocumentRetriever, ale wystarczy kolumna parent_id i drugi SELECT.</p><h4>Pułapki produkcyjne</h4><ul><li><strong>Nagłówki bez treści.</strong> Chunk zawierający tylko nagłówek ma silny embedding i pusty content. Odrzucaj chunki krótsze niż ok. 50 tokenów.</li><li><strong>Powtarzalny boilerplate.</strong> Stopki, nawigacja i noty prawne w każdym chunku psują podobieństwo. Usuwaj je na etapie parsowania.</li><li><strong>Brak deterministycznych id.</strong> Używaj hasha treści jako id, wtedy reindeks aktualizuje tylko zmienione chunki zamiast przepisywać wszystko.</li></ul><p>Zanim zaczniesz stroić chunking, zbuduj zbiór ewaluacyjny. Bez recall@k mierzysz przeczucia, a każda zmiana rozmiaru chunka wygląda jak poprawa. Praktyczna kolejność prac wygląda tak: najpierw popraw parsowanie źródeł, potem tnij po strukturze, potem dobierz rozmiar i nakładkę pod swój korpus, a dopiero na końcu sięgaj po contextual retrieval czy small-to-big. Pierwsze dwa kroki są darmowe, a zwykle dają większy skok jakości niż wszystko, co po nich następuje.</p>',
          en: '<p>Chunking is the cheapest quality lever in RAG. Changing the split strategy can lift recall@10 by double digits without touching the model.</p><h4>Size and overlap</h4><p>Split by tokens, not characters, because context limits are token based. Starting point: 512 tokens with 64 overlap (12.5 percent). For FAQ and tables go down to 200-300, for technical prose go up to 800-1000. Overlap above 25 percent inflates index cost and floods results with near duplicates you then have to deduplicate before sending to the model.</p><h4>Structure-aware wins by default</h4><p>Split Markdown on h2/h3 headings with LangChain MarkdownHeaderTextSplitter or your own parser. Split code by function with tree-sitter, never by line. Run PDFs through unstructured.io or Docling to recover structure first, because naive pdftotext merges columns and shreds tables. Keep tables intact and repeat column headers on every row, otherwise a headerless row is useless.</p><h4>Contextual retrieval</h4><p>A technique published by Anthropic: before embedding, prepend 50-100 tokens of context generated by a cheap model, for example a sentence naming the document and section a chunk comes from. Reported reduction in failed retrievals reaches tens of percent, and with prompt caching enriching a whole corpus costs on the order of 1 USD per million document tokens.</p><pre><code>chunk_for_embedding =\n  "Document: Refund Policy 2025, Section: Late refunds.\\n" +\n  raw_chunk_text</code></pre><h4>Small-to-big pattern</h4><p>Index small precise chunks (200 tokens) but return their parent (the whole section) to the model. You get search precision and context breadth at once. LlamaIndex calls it ParentDocumentRetriever, but a parent_id column and a second SELECT is enough.</p><h4>Production pitfalls</h4><ul><li><strong>Headings with no body.</strong> A chunk holding only a heading has a strong embedding and empty content. Drop chunks shorter than roughly 50 tokens.</li><li><strong>Repeated boilerplate.</strong> Footers, navigation and legal notices in every chunk poison similarity. Strip them during parsing.</li><li><strong>No deterministic ids.</strong> Use a content hash as the id so a reindex updates only changed chunks instead of rewriting everything.</li></ul><p>Before you tune chunking, build an evaluation set. Without recall@k you are measuring vibes, and every chunk size change looks like an improvement.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Po co stosuje się nakładkę (overlap) między chunkami?', en: 'Why do we use overlap between chunks?' },
          options: [
            { pl: 'Żeby zmniejszyć rozmiar indeksu', en: 'To shrink the index size' },
            { pl: 'Żeby zdanie przecięte na granicy nadal miało kontekst w którymś chunku', en: 'So a sentence cut at the boundary still has context in one of the chunks' },
            { pl: 'Żeby przyspieszyć wyszukiwanie ANN', en: 'To speed up ANN search' },
            { pl: 'Żeby model mógł cytować dwa źródła naraz', en: 'So the model can cite two sources at once' }
          ],
          correct: 1,
          explain: {
            pl: 'Nakładka powtarza końcówkę poprzedniego fragmentu, dzięki czemu informacja na styku nie znika. Kosztuje za to miejsce w indeksie.',
            en: 'Overlap repeats the tail of the previous fragment so information at the seam is not lost. It costs index space in return.'
          }
        },
        {
          q: { pl: 'Chunki po 3000 tokenów. Co zwykle psuje się najbardziej?', en: 'Chunks of 3000 tokens. What typically breaks the most?' },
          options: [
            { pl: 'Precyzja embeddingu, bo jeden wektor reprezentuje wiele tematów', en: 'Embedding precision, because one vector represents many topics' },
            { pl: 'Metadane przestają się zapisywać', en: 'Metadata stops being stored' },
            { pl: 'Baza wektorowa odrzuca długie teksty', en: 'The vector database rejects long text' },
            { pl: 'Nakładka przestaje działać', en: 'Overlap stops working' }
          ],
          correct: 0,
          explain: {
            pl: 'Embedding to średnia znaczeń całego fragmentu. Im więcej tematów w jednym chunku, tym bardziej wektor pasuje do wszystkiego po trochu.',
            en: 'An embedding averages the meaning of the whole fragment. The more topics in one chunk, the more the vector vaguely matches everything.'
          }
        },
        {
          q: { pl: 'Indeksujesz repozytorium TypeScript. Najlepsza strategia cięcia?', en: 'You are indexing a TypeScript repository. Best split strategy?' },
          options: [
            { pl: 'Co 50 linii, stała długość', en: 'Every 50 lines, fixed size' },
            { pl: 'Po pustych liniach', en: 'On blank lines' },
            { pl: 'Po granicach funkcji i klas, parserem składni', en: 'On function and class boundaries using a syntax parser' },
            { pl: 'Jeden plik to jeden chunk, zawsze', en: 'One file per chunk, always' }
          ],
          correct: 2,
          explain: {
            pl: 'Kod ma jawną strukturę, więc cięcie po funkcjach (np. tree-sitter) daje fragmenty samowystarczalne. Cięcie co N linii rozrywa ciała funkcji.',
            en: 'Code has explicit structure, so splitting by function (for example with tree-sitter) yields self-contained fragments. Cutting every N lines rips function bodies apart.'
          }
        },
        {
          q: { pl: 'Chcesz precyzyjnego trafiania i szerokiego kontekstu jednocześnie. Który wzorzec to daje?', en: 'You want precise hits and broad context at the same time. Which pattern delivers that?' },
          options: [
            { pl: 'Zwiększyć overlap do 50 procent', en: 'Raise overlap to 50 percent' },
            { pl: 'Indeksować małe chunki, a zwracać ich dokument nadrzędny', en: 'Index small chunks but return their parent document' },
            { pl: 'Zwiększyć k do 100', en: 'Raise k to 100' },
            { pl: 'Wyłączyć metadane, żeby wektor był czystszy', en: 'Drop metadata so the vector is cleaner' }
          ],
          correct: 1,
          explain: {
            pl: 'To wzorzec small-to-big: mały chunk decyduje o trafieniu, a do promptu idzie cała sekcja. Duże k lub ogromny overlap tylko rozmywają kontekst.',
            en: 'That is the small-to-big pattern: the small chunk decides the hit, the full section goes into the prompt. Huge k or huge overlap only dilute context.'
          }
        }
      ]
    },

    {
      id: 'vector-databases',
      title: { pl: 'Bazy wektorowe', en: 'Vector databases' },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="30" font-size="15" fill="var(--text)">Brute force scan vs HNSW graph hops</text>' +
          '<rect x="20" y="50" width="270" height="170" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="76" text-anchor="middle" font-size="14" fill="var(--muted)">Exact: compare all 1M</text>' +
          '<circle cx="60" cy="110" r="6" fill="var(--muted)"/><circle cx="100" cy="130" r="6" fill="var(--muted)"/><circle cx="140" cy="105" r="6" fill="var(--muted)"/><circle cx="180" cy="140" r="6" fill="var(--muted)"/><circle cx="220" cy="112" r="6" fill="var(--muted)"/><circle cx="255" cy="145" r="6" fill="var(--muted)"/>' +
          '<circle cx="80" cy="175" r="6" fill="var(--muted)"/><circle cx="130" cy="185" r="6" fill="var(--muted)"/><circle cx="185" cy="180" r="6" fill="var(--muted)"/><circle cx="235" cy="190" r="6" fill="var(--muted)"/>' +
          '<text x="155" y="212" text-anchor="middle" font-size="13" fill="var(--err)">slow, 100 percent recall</text>' +
          '<rect x="350" y="50" width="270" height="170" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="485" y="76" text-anchor="middle" font-size="14" fill="var(--muted)">HNSW: hop the graph</text>' +
          '<circle cx="390" cy="115" r="7" fill="var(--accent2)"/><circle cx="460" cy="100" r="7" fill="var(--accent2)"/><circle cx="530" cy="130" r="7" fill="var(--accent2)"/><circle cx="590" cy="110" r="7" fill="var(--ok)"/>' +
          '<circle cx="420" cy="180" r="6" fill="var(--muted)"/><circle cx="500" cy="190" r="6" fill="var(--muted)"/><circle cx="570" cy="175" r="6" fill="var(--muted)"/>' +
          '<path d="M390,115 L460,100 L530,130 L590,110" stroke="var(--accent)" stroke-width="2" fill="none"/>' +
          '<text x="485" y="212" text-anchor="middle" font-size="13" fill="var(--ok)">fast, ~95 percent recall</text>' +
          '<rect x="120" y="260" width="400" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="285" text-anchor="middle" font-size="14" fill="var(--text)">Metadata filter: tenant_id = 42</text>' +
          '<text x="320" y="306" text-anchor="middle" font-size="13" fill="var(--muted)">applied inside the search, not after</text>' +
          '<text x="320" y="360" text-anchor="middle" font-size="14" fill="var(--muted)">ANN trades a little recall for a lot of speed</text>' +
          '</svg>',
        caption: {
          pl: 'Baza wektorowa nie porównuje wszystkiego z wszystkim. Skacze po grafie sąsiadów i oddaje trochę trafności za ogromny zysk prędkości.',
          en: 'A vector database does not compare everything with everything. It hops a neighbour graph, trading a little accuracy for a lot of speed.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie ogromną bibliotekę, w której książki nie stoją alfabetycznie, tylko według tego, o czym są. Książki o kotach leżą obok książek o psach, a te daleko od książek o silnikach.</p><p>Gdy szukasz czegoś o kocie dachowcu, nie oglądasz wszystkich milionów książek. Wchodzisz do działu zwierzęta, robisz kilka kroków w stronę półki z kotami i już jesteś na miejscu. Kilkanaście kroków zamiast miliona.</p><p>Ten skrót ma cenę: czasem miniesz książkę, która leżała odrobinę z boku. Prawie zawsze znajdziesz to, co trzeba, ale nie zawsze absolutnie wszystko. W zamian odpowiedź przychodzi w mgnieniu oka, a nie po godzinie.</p><p>Do tego przy wejściu stoi bramkarz z listą: pokazuje Ci tylko książki, do których masz prawo, i tylko te wydane po 2023 roku. Bramkarz musi sprawdzać po drodze, a nie dopiero przy kasie, bo inaczej wrócisz z pustymi rękami.</p>',
          en: '<p>Imagine a huge library where books are not shelved alphabetically but by what they are about. Books on cats sit next to books on dogs, and far away from books on engines.</p><p>When you look for something about a stray cat, you do not inspect all million books. You walk into the animals area, take a few steps toward the cat shelf, and you are there. A dozen steps instead of a million.</p><p>The shortcut has a price: sometimes you walk past a book that sat slightly off to the side. You almost always find what you need, but not always absolutely everything. In return the answer arrives in a blink instead of an hour.</p><p>There is also a doorman with a list: he shows you only books you are allowed to see, and only those published after 2023. He has to check along the way, not at the checkout desk, otherwise you come back empty handed.</p>'
        },
        school: {
          pl: '<p>Baza wektorowa przechowuje embeddingi i odpowiada na jedno pytanie: które k wektorów jest najbliżej mojego wektora. Porównanie dokładne (brute force) wymaga policzenia podobieństwa z każdym wektorem w bazie. Przy milionie wektorów po 1536 wymiarów to półtora miliarda mnożeń na zapytanie.</p><p>Dlatego używa się <strong>ANN</strong> (Approximate Nearest Neighbours, przybliżone najbliższe sąsiedztwo). Najpopularniejszy indeks to <strong>HNSW</strong> (Hierarchical Navigable Small World). Intuicja: buduje się graf, w którym każdy punkt zna kilkudziesięciu sąsiadów, plus kilka pięter skrótów jak w metrze. Zaczynasz od losowego punktu na górnym piętrze, przeskakujesz w stronę celu, schodzisz piętro niżej i uściślasz. Kilkadziesiąt kroków zamiast miliona porównań.</p><p>Analogia frontendowa: to jest indeks w bazie SQL. Bez indeksu masz full table scan, z indeksem lookup. Różnica polega na tym, że indeks wektorowy jest <em>przybliżony</em>: możesz nie dostać absolutnie najlepszego wyniku.</p><p>Wybór narzędzia:</p><ul><li><strong>pgvector</strong> - rozszerzenie Postgresa. Masz już bazę, transakcje i JOIN-y. Do kilku milionów wektorów w zupełności wystarcza.</li><li><strong>Qdrant</strong> - dedykowana baza, bardzo dobre filtrowanie po metadanych i wbudowana hybryda.</li><li><strong>Pinecone</strong> - managed, płacisz za brak operacji.</li></ul><pre><code>SELECT id, text\nFROM chunks\nWHERE tenant_id = 42\nORDER BY embedding &lt;=&gt; $1\nLIMIT 5;</code></pre><p>Operator w Postgresie oznacza dystans kosinusowy. Kluczowe jest to, że filtr po tenant_id musi wykonać się razem z wyszukiwaniem, a nie na wynikach, inaczej po odfiltrowaniu zostanie Ci zero rekordów.</p>',
          en: '<p>A vector database stores embeddings and answers one question: which k vectors are closest to mine. An exact comparison (brute force) means computing similarity against every vector in the store. With a million 1536-dimension vectors that is one and a half billion multiplications per query.</p><p>So we use <strong>ANN</strong> (Approximate Nearest Neighbours). The most popular index is <strong>HNSW</strong> (Hierarchical Navigable Small World). The intuition: build a graph where each point knows a few dozen neighbours, plus several express layers like a subway map. You start at a random point on the top layer, hop toward the target, drop a layer and refine. Dozens of steps instead of a million comparisons.</p><p>Frontend analogy: this is a SQL index. Without one you get a full table scan, with one you get a lookup. The difference is that a vector index is <em>approximate</em>: you may not get the absolutely best match.</p><p>Choosing a tool:</p><ul><li><strong>pgvector</strong> - a Postgres extension. You already have the database, transactions and JOINs. Fine up to a few million vectors.</li><li><strong>Qdrant</strong> - a dedicated database, excellent metadata filtering and built-in hybrid search.</li><li><strong>Pinecone</strong> - managed, you pay to not run operations.</li></ul><pre><code>SELECT id, text\nFROM chunks\nWHERE tenant_id = 42\nORDER BY embedding &lt;=&gt; $1\nLIMIT 5;</code></pre><p>That Postgres operator means cosine distance. The critical part is that the tenant_id filter must run together with the search, not on its results, otherwise filtering leaves you with zero rows.</p>'
        },
        pro: {
          pl: '<p>Baza wektorowa to trzy decyzje: indeks, metryka i filtrowanie. Reszta to operacje.</p><h4>Parametry HNSW</h4><p>W pgvector: <code>m</code> (liczba połączeń na węzeł, domyślnie 16) i <code>ef_construction</code> (domyślnie 64) przy budowie, <code>hnsw.ef_search</code> (domyślnie 40) przy zapytaniu. Podniesienie ef_search do 100-200 zwykle daje recall powyżej 0,98 kosztem kilku milisekund. To pokrętło strojysz w runtime, nie musisz przebudowywać indeksu. Budowa indeksu HNSW na 1M wektorów potrafi zająć kilkanaście minut i zjeść kilka GB RAM, więc ustaw maintenance_work_mem, zanim odpalisz to na produkcji.</p><h4>Metryka</h4><p>Prawie zawsze cosine. Jeżeli normalizujesz wektory do długości 1, iloczyn skalarny (inner product) jest równoważny i szybszy. Nie mieszaj metryk między indeksem a zapytaniem, bo dostaniesz ciche, subtelnie złe wyniki.</p><h4>Filtrowanie to najczęstszy błąd</h4><p>Post-filtering (pobierz top 10, potem odrzuć nieuprawnione) daje puste odpowiedzi w multi-tenant. Pre-filtering (najpierw WHERE, potem skan) zabija wydajność indeksu. Nowoczesne silniki robią filtered ANN: Qdrant buduje payload index i przechodzi graf, sprawdzając predykat w locie. pgvector od wersji 0.8 ma iterative index scan, wcześniej trzeba było ratować się partycjonowaniem po tenant_id.</p><pre><code>CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops)\n  WITH (m = 16, ef_construction = 64);\nSET hnsw.ef_search = 100;</code></pre><h4>Koszt i pamięć</h4><p>1M wektorów po 1536 wymiarów w float32 to około 6 GB samych danych plus narzut grafu HNSW rzędu 20-40 procent. Kwantyzacja skalarna do int8 tnie to czterokrotnie przy stracie recall poniżej 1 punktu procentowego, binarna nawet 32 razy, ale wymaga rescoringu na oryginalnych wektorach. Matryoshka embeddings (text-embedding-3-large obcięty do 512 wymiarów) to inna droga do tego samego celu.</p><h4>Czego pilnować w produkcji</h4><ul><li><strong>Aktualizacje.</strong> HNSW nie lubi masowych usunięć, bo zostawiają tombstone. Planuj okresowy REINDEX albo blue-green swap kolekcji.</li><li><strong>Zimny start.</strong> Pierwsze zapytanie po restarcie czyta indeks z dysku i potrafi trwać sekundy. Rozgrzewaj po deployu.</li><li><strong>Nie potrzebujesz osobnej bazy.</strong> Poniżej 5M chunków pgvector obok danych aplikacji wygrywa prostotą: jeden backup, jedne uprawnienia, jedna transakcja.</li></ul><p>Na rozmowie: umieć wyjaśnić kompromis recall kontra latencja i dlaczego filtrowanie po ANN jest pułapką. To odróżnia kogoś, kto czytał tutorial, od kogoś, kto to wdrażał.</p>',
          en: '<p>A vector database is three decisions: index, metric and filtering. The rest is operations.</p><h4>HNSW parameters</h4><p>In pgvector: <code>m</code> (connections per node, default 16) and <code>ef_construction</code> (default 64) at build time, <code>hnsw.ef_search</code> (default 40) at query time. Raising ef_search to 100-200 usually pushes recall above 0.98 for a few milliseconds. That knob is tunable at runtime, no rebuild needed. Building an HNSW index over 1M vectors can take tens of minutes and several GB of RAM, so set maintenance_work_mem before running it in production.</p><h4>Metric</h4><p>Almost always cosine. If you normalize vectors to unit length, inner product is equivalent and faster. Never mix metrics between index and query, you get silently, subtly wrong results.</p><h4>Filtering is the most common mistake</h4><p>Post-filtering (fetch top 10, then drop unauthorized rows) produces empty answers in multi-tenant systems. Pre-filtering (WHERE first, then scan) destroys index performance. Modern engines do filtered ANN: Qdrant builds a payload index and walks the graph evaluating the predicate inline. pgvector 0.8 added iterative index scan, before that you partitioned by tenant_id to survive.</p><pre><code>CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops)\n  WITH (m = 16, ef_construction = 64);\nSET hnsw.ef_search = 100;</code></pre><h4>Cost and memory</h4><p>1M vectors of 1536 float32 dimensions is roughly 6 GB of raw data plus 20-40 percent HNSW graph overhead. Scalar quantization to int8 cuts that fourfold for under one point of recall loss, binary quantization up to 32x but requires rescoring against original vectors. Matryoshka embeddings (text-embedding-3-large truncated to 512 dims) is another route to the same goal.</p><h4>What to watch in production</h4><ul><li><strong>Updates.</strong> HNSW dislikes mass deletes because they leave tombstones. Plan periodic REINDEX or a blue-green collection swap.</li><li><strong>Cold start.</strong> The first query after a restart reads the index from disk and can take seconds. Warm up after deploy.</li><li><strong>You may not need a separate database.</strong> Below 5M chunks, pgvector next to your application data wins on simplicity: one backup, one permission model, one transaction.</li></ul><p>In interviews: be able to explain the recall versus latency trade-off and why filtering after ANN is a trap. That separates someone who read a tutorial from someone who shipped this.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Co oznacza skrót ANN w kontekście baz wektorowych?', en: 'What does ANN mean in the context of vector databases?' },
          options: [
            { pl: 'Artificial Neural Network, sieć neuronowa w bazie', en: 'Artificial Neural Network embedded in the database' },
            { pl: 'Approximate Nearest Neighbours, przybliżone szukanie sąsiadów', en: 'Approximate Nearest Neighbours, approximate neighbour search' },
            { pl: 'Automatic Node Normalization, normalizacja wektorów', en: 'Automatic Node Normalization of vectors' },
            { pl: 'Adaptive Negative Nesting, technika filtrowania', en: 'Adaptive Negative Nesting, a filtering technique' }
          ],
          correct: 1,
          explain: {
            pl: 'ANN oddaje odrobinę trafności za ogromny zysk szybkości. HNSW to najpopularniejsza implementacja tej idei.',
            en: 'ANN trades a bit of accuracy for a huge speed gain. HNSW is the most popular implementation of that idea.'
          }
        },
        {
          q: { pl: 'Aplikacja multi-tenant. Filtrujesz po tenant_id dopiero na wynikach top-10 z ANN. Co się stanie?', en: 'Multi-tenant app. You filter by tenant_id only on the ANN top-10 results. What happens?' },
          options: [
            { pl: 'Wyniki będą wolniejsze, ale poprawne', en: 'Results will be slower but correct' },
            { pl: 'Część zapytań zwróci zero lub bardzo mało wyników', en: 'Some queries will return zero or very few results' },
            { pl: 'Indeks HNSW przestanie działać', en: 'The HNSW index will stop working' },
            { pl: 'Wektory stracą normalizację', en: 'Vectors will lose normalization' }
          ],
          correct: 1,
          explain: {
            pl: 'Jeżeli top-10 globalnie należy do innych tenantów, po odfiltrowaniu zostaje pustka. Predykat musi działać wewnątrz wyszukiwania.',
            en: 'If the global top-10 belongs to other tenants, filtering leaves nothing. The predicate has to run inside the search itself.'
          }
        },
        {
          q: { pl: 'Masz 300 tysięcy chunków i istniejącego Postgresa. Rozsądny wybór?', en: 'You have 300k chunks and an existing Postgres. Reasonable choice?' },
          options: [
            { pl: 'pgvector w tej samej bazie', en: 'pgvector in the same database' },
            { pl: 'Osobny klaster Elasticsearch na wektory', en: 'A separate Elasticsearch cluster for vectors' },
            { pl: 'Trzymać wektory w plikach JSON i skanować w Node', en: 'Keep vectors in JSON files and scan them in Node' },
            { pl: 'Własna implementacja HNSW w TypeScript', en: 'A homegrown HNSW implementation in TypeScript' }
          ],
          correct: 0,
          explain: {
            pl: 'Przy tej skali pgvector wygrywa prostotą: jeden backup, jedne uprawnienia, JOIN z danymi aplikacji. Dedykowana baza zaczyna się opłacać w okolicach dziesiątek milionów wektorów.',
            en: 'At that scale pgvector wins on simplicity: one backup, one permission model, JOINs with app data. A dedicated store starts paying off around tens of millions of vectors.'
          }
        },
        {
          q: { pl: 'Recall wynosi 0,91 i chcesz go podnieść bez przebudowy indeksu HNSW. Co robisz?', en: 'Recall is 0.91 and you want it higher without rebuilding the HNSW index. What do you do?' },
          options: [
            { pl: 'Zmieniasz metrykę z cosine na euclidean', en: 'Switch the metric from cosine to euclidean' },
            { pl: 'Podnosisz ef_search przy zapytaniu', en: 'Raise ef_search at query time' },
            { pl: 'Zmniejszasz wymiarowość embeddingów', en: 'Reduce embedding dimensionality' },
            { pl: 'Włączasz kwantyzację binarną', en: 'Turn on binary quantization' }
          ],
          correct: 1,
          explain: {
            pl: 'ef_search to parametr runtime: większa lista kandydatów podczas przechodzenia grafu podnosi recall kosztem kilku milisekund. Pozostałe opcje wymagają reindeksu i zwykle obniżają recall.',
            en: 'ef_search is a runtime parameter: a larger candidate list during graph traversal raises recall for a few milliseconds. The other options require a reindex and usually lower recall.'
          }
        }
      ]
    },

    {
      id: 'hybrid-search-reranking',
      title: { pl: 'Hybryda i reranking', en: 'Hybrid search and reranking' },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="rag4-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<rect x="230" y="20" width="180" height="52" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="52" text-anchor="middle" font-size="15" fill="var(--text)">Query</text>' +
          '<rect x="30" y="120" width="240" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--text)">BM25 keywords</text>' +
          '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">exact terms, codes, names</text>' +
          '<rect x="370" y="120" width="240" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--text)">Vector search</text>' +
          '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">meaning, paraphrase</text>' +
          '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--text)">Fusion, 50 candidates</text>' +
          '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">reciprocal rank fusion</text>' +
          '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--text)">Cross-encoder rerank</text>' +
          '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--muted)">keep top 5 for the prompt</text>' +
          '<path d="M280,72 L150,112" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag4-a)"/>' +
          '<path d="M360,72 L490,112" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag4-a)"/>' +
          '<path d="M150,190 L150,268 L173,268" stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#rag4-a)"/>' +
          '<path d="M490,190 L490,268 L467,268" stroke="var(--muted)" stroke-width="2" fill="none" marker-end="url(#rag4-a)"/>' +
          '<path d="M320,296 L320,323" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag4-a)"/>' +
          '</svg>',
        caption: {
          pl: 'Dwie wyszukiwarki biegną równolegle, wyniki łączy fuzja rang, a cross-encoder wybiera pięć najlepszych fragmentów do promptu.',
          en: 'Two search engines run in parallel, rank fusion merges the results, and a cross-encoder picks the best five chunks for the prompt.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Dwa przebiegi: najpierw szybkie wyszukiwanie kandydatów, potem wolny, dokładny reranking krótkiej listy.',
          en: 'Two passes: a fast candidate search first, then a slow and accurate rerank of the short list.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag4i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="22" font-size="14" fill="var(--muted)">Step 1 - one query, two engines</text>' +
              '<rect x="230" y="34" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="64" text-anchor="middle" font-size="15" fill="var(--text)">Query: XR-9012 charger</text>' +
              '<rect x="30" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">BM25 keywords</text>' +
              '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">exact terms, codes, names</text>' +
              '<rect x="370" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">Vector search</text>' +
              '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">meaning, paraphrase</text>' +
              '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--muted)">Fusion</text>' +
              '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">0 candidates</text>' +
              '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--muted)">Cross-encoder rerank</text>' +
              '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M280,82 L160,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M360,82 L480,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M150,220 L150,268 L173,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M490,220 L490,268 L467,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,296 L320,323" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="412" font-size="13" fill="var(--muted)">One query contains both an exact code and a meaning.</text>' +
              '</svg>',
            label: { pl: 'Jedno zapytanie, dwie wyszukiwarki', en: 'One query, two engines' },
            note: {
              pl: 'Zapytanie zawiera i dokładny kod, i sens. Żadna pojedyncza wyszukiwarka nie łapie obu naraz.',
              en: 'The query carries both an exact code and a meaning. Neither engine alone catches both.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag4i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="22" font-size="14" fill="var(--muted)">Step 2 - both engines run in parallel</text>' +
              '<rect x="230" y="34" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="64" text-anchor="middle" font-size="15" fill="var(--text)">Query: XR-9012 charger</text>' +
              '<rect x="30" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--text)">BM25 keywords</text>' +
              '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">hit: the exact code</text>' +
              '<rect x="40" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="96" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="152" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="208" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="370" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--text)">Vector search</text>' +
              '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">hit: paraphrases</text>' +
              '<rect x="380" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="436" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="492" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="548" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--muted)">Fusion</text>' +
              '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">0 candidates</text>' +
              '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--muted)">Cross-encoder rerank</text>' +
              '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M280,82 L160,114" stroke="var(--accent2)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<path d="M360,82 L480,114" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<path d="M150,220 L150,268 L173,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M490,220 L490,268 L467,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,296 L320,323" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="412" font-size="13" fill="var(--muted)">Both are cheap: milliseconds over the whole corpus.</text>' +
              '</svg>',
            label: { pl: 'Oba przebiegi równolegle', en: 'Both engines in parallel' },
            note: {
              pl: 'BM25 łapie dokładny kod, wektory łapią parafrazy. Oba są tanie i przeszukują cały korpus w milisekundach.',
              en: 'BM25 catches the exact code, vectors catch paraphrases. Both are cheap and scan the entire corpus in milliseconds.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag4i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="22" font-size="14" fill="var(--muted)">Step 3 - reciprocal rank fusion merges both lists</text>' +
              '<rect x="230" y="34" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="64" text-anchor="middle" font-size="15" fill="var(--text)">Query: XR-9012 charger</text>' +
              '<rect x="30" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--text)">BM25 keywords</text>' +
              '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="40" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="96" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="152" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="208" y="200" width="48" height="14" rx="7" fill="var(--accent2)"/>' +
              '<rect x="370" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--text)">Vector search</text>' +
              '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="380" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="436" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="492" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="548" y="200" width="48" height="14" rx="7" fill="var(--accent)"/>' +
              '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--text)">Fusion, 50 candidates</text>' +
              '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">reciprocal rank fusion</text>' +
              '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--muted)">Cross-encoder rerank</text>' +
              '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--muted)">waiting</text>' +
              '<path d="M280,82 L160,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M360,82 L480,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M150,220 L150,268 L173,268" fill="none" stroke="var(--accent2)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<path d="M490,220 L490,268 L467,268" fill="none" stroke="var(--accent)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<path d="M320,296 L320,323" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<text x="20" y="412" font-size="13" fill="var(--muted)">RRF needs no score calibration - it only uses ranks.</text>' +
              '</svg>',
            label: { pl: 'Fuzja rang', en: 'Rank fusion' },
            note: {
              pl: 'RRF łączy obie listy po pozycjach, a nie po wynikach punktowych, więc nie trzeba kalibrować niekompatybilnych skal.',
              en: 'RRF merges both lists by position rather than by score, so incompatible scales never need calibrating.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag4i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="22" font-size="14" fill="var(--muted)">Step 4 - second pass: the cross-encoder reads each pair</text>' +
              '<rect x="230" y="34" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="64" text-anchor="middle" font-size="15" fill="var(--text)">Query: XR-9012 charger</text>' +
              '<rect x="30" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">BM25 keywords</text>' +
              '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="40" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="96" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="152" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="208" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="370" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">Vector search</text>' +
              '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="380" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="436" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="492" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="548" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--text)">Fusion, 50 candidates</text>' +
              '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">short list, not the corpus</text>' +
              '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--text)">Cross-encoder rerank</text>' +
              '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--warn)">scoring 50 pairs, ~200 ms</text>' +
              '<path d="M280,82 L160,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M360,82 L480,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M150,220 L150,268 L173,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M490,220 L490,268 L467,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,296 L320,323" stroke="var(--warn)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<text x="20" y="412" font-size="13" fill="var(--muted)">Too slow for the corpus, perfect for 50 candidates.</text>' +
              '</svg>',
            label: { pl: 'Drugi przebieg: reranker', en: 'Second pass: the reranker' },
            note: {
              pl: 'Cross-encoder czyta parę pytanie-fragment razem, więc jest wolny. Dlatego dostaje tylko krótką listę, nie cały korpus.',
              en: 'A cross-encoder reads the query and the chunk together, so it is slow. That is why it only ever sees the short list.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="rag4i-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' +
              '<text x="20" y="22" font-size="14" fill="var(--muted)">Step 5 - top 5 go into the prompt</text>' +
              '<rect x="230" y="34" width="180" height="48" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="64" text-anchor="middle" font-size="15" fill="var(--text)">Query: XR-9012 charger</text>' +
              '<rect x="30" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="150" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">BM25 keywords</text>' +
              '<text x="150" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="40" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="96" y="200" width="48" height="14" rx="7" fill="var(--ok)"/>' +
              '<rect x="152" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="208" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="370" y="120" width="240" height="68" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="490" y="148" text-anchor="middle" font-size="15" fill="var(--muted)">Vector search</text>' +
              '<text x="490" y="170" text-anchor="middle" font-size="13" fill="var(--muted)">25 hits</text>' +
              '<rect x="380" y="200" width="48" height="14" rx="7" fill="var(--ok)"/>' +
              '<rect x="436" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="492" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="548" y="200" width="48" height="14" rx="7" fill="var(--border)"/>' +
              '<rect x="180" y="240" width="280" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="264" text-anchor="middle" font-size="15" fill="var(--muted)">Fusion, 50 candidates</text>' +
              '<text x="320" y="285" text-anchor="middle" font-size="13" fill="var(--muted)">45 dropped</text>' +
              '<rect x="180" y="330" width="280" height="66" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="356" text-anchor="middle" font-size="15" fill="var(--text)">Top 5 for the prompt</text>' +
              '<text x="320" y="378" text-anchor="middle" font-size="13" fill="var(--ok)">rank 31 promoted to rank 1</text>' +
              '<path d="M280,82 L160,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M360,82 L480,114" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M150,220 L150,268 L173,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M490,220 L490,268 L467,268" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="5 5"/>' +
              '<path d="M320,296 L320,323" stroke="var(--ok)" stroke-width="2" marker-end="url(#rag4i-a)"/>' +
              '<text x="20" y="412" font-size="13" fill="var(--muted)">Recall from pass one, precision from pass two.</text>' +
              '</svg>',
            label: { pl: 'Pięć najlepszych', en: 'The best five' },
            note: {
              pl: 'Reranker potrafi wypchnąć na pierwsze miejsce fragment, który w fuzji był trzydziesty. Pierwszy przebieg daje recall, drugi precision.',
              en: 'The reranker can promote a chunk that fusion ranked thirty-first. Pass one buys recall, pass two buys precision.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Szukasz w sklepie czegoś, co nazywa się dokładnie XR-9012. Sprzedawca od znaczeń rozumie, że chodzi o ładowarkę, i przynosi pięć ładowarek. Żadna nie jest tą jedną z numerem XR-9012, bo on nie patrzy na numery, tylko na sens.</p><p>Obok stoi drugi sprzedawca, ten od dokładnych słów. On nie ma pojęcia, co to ładowarka, ale numer XR-9012 znajdzie w sekundę.</p><p>Najlepiej wysłać obu naraz. Jeden łapie sens, drugi łapie dokładne słowa, kody i nazwiska. Potem kładziesz wszystkie ich znaleziska na stole.</p><p>Na końcu przychodzi szef, który ma czas obejrzeć tylko pięćdziesiąt rzeczy, ale ogląda je naprawdę uważnie, po kolei, razem z Twoim pytaniem w ręku. On wybiera pięć najlepszych. Jest wolniejszy od obu sprzedawców, dlatego nie może przeglądać całego magazynu. Ale gdy dostanie już krótką listę, prawie nigdy się nie myli.</p>',
          en: '<p>You are looking for something in a shop called exactly XR-9012. The meaning salesperson understands you want a charger and brings five chargers. None of them is the one numbered XR-9012, because he looks at meaning, not at numbers.</p><p>Next to him stands another salesperson, the exact-words one. He has no idea what a charger is, but he will find the string XR-9012 in a second.</p><p>The best move is to send both at once. One catches meaning, the other catches exact words, codes and surnames. Then you put everything they found on the table.</p><p>Finally the manager arrives. He only has time to look at fifty items, but he looks at them properly, one by one, holding your question in his hand. He picks the best five. He is slower than both salespeople, which is why he cannot walk the whole warehouse. But once he has a short list, he almost never gets it wrong.</p>'
        },
        school: {
          pl: '<p>Wyszukiwanie wektorowe rozumie znaczenie, ale gubi dokładne ciągi znaków. Zapytanie o błąd <code>ERR_2451</code> albo o nazwisko klienta może nie trafić, bo embedding rozmywa rzadkie tokeny. Do tego służy <strong>BM25</strong> - klasyczny algorytm wyszukiwania pełnotekstowego, ten sam, który napędza Elasticsearch i Postgresowe tsvector.</p><p><strong>Hybryda</strong> to uruchomienie obu wyszukiwarek i połączenie wyników. Problemem jest to, że wyniki są nieporównywalne: BM25 zwraca punkty w skali 0-30, cosine podobieństwo w skali 0-1. Dlatego zamiast łączyć wyniki, łączy się <em>pozycje w rankingu</em>. Metoda nazywa się <strong>RRF</strong> (Reciprocal Rank Fusion) i jest zaskakująco prosta:</p><pre><code>score(doc) = sum over engines of 1 / (60 + rank_in_that_engine)</code></pre><p>Dokument, który jest trzeci u jednego i piąty u drugiego, wygrywa z dokumentem, który jest pierwszy u jednego i nieobecny u drugiego. Stała 60 tłumi wpływ pojedynczego bardzo wysokiego miejsca.</p><p>Drugi krok to <strong>reranking</strong>. Model używany do embeddingów to bi-encoder: liczy wektor pytania i wektor dokumentu <em>osobno</em>, więc nigdy nie widzi ich razem. Reranker to cross-encoder: dostaje parę pytanie plus dokument na wejściu i zwraca jedną liczbę trafności. Widzi interakcję między słowami, więc jest dużo dokładniejszy, ale nie da się go użyć do przeszukania miliona dokumentów, bo trzeba by policzyć milion par.</p><p>Stąd wzorzec retrieve-then-rerank: wyszukiwarki zwracają 50 kandydatów, reranker uważnie wybiera 5, i tylko te trafiają do promptu. Analogia frontendowa: szeroki filtr po stronie bazy, precyzyjne sortowanie na małej liście.</p>',
          en: '<p>Vector search understands meaning but loses exact strings. A query for error <code>ERR_2451</code> or a customer surname may miss, because embeddings blur rare tokens. That is what <strong>BM25</strong> is for - the classic full text ranking algorithm behind Elasticsearch and Postgres tsvector.</p><p><strong>Hybrid search</strong> means running both engines and merging their results. The catch is that the scores are not comparable: BM25 returns something like 0-30, cosine similarity returns 0-1. So instead of merging scores you merge <em>ranks</em>. The method is <strong>RRF</strong> (Reciprocal Rank Fusion) and it is surprisingly simple:</p><pre><code>score(doc) = sum over engines of 1 / (60 + rank_in_that_engine)</code></pre><p>A document ranked third in one engine and fifth in the other beats a document ranked first in one and absent from the other. The constant 60 dampens the influence of a single very high placement.</p><p>The second step is <strong>reranking</strong>. The model behind embeddings is a bi-encoder: it computes the query vector and the document vector <em>separately</em>, so it never sees them together. A reranker is a cross-encoder: it takes the question and the document as one input and returns a single relevance number. It sees word level interaction, so it is far more accurate, but you cannot use it to scan a million documents, that would be a million forward passes.</p><p>Hence the retrieve-then-rerank pattern: the engines return 50 candidates, the reranker carefully picks 5, and only those go into the prompt. Frontend analogy: a broad filter in the database, precise sorting on a small list.</p>'
        },
        pro: {
          pl: '<p>Hybryda plus reranking to najbardziej niezawodne ulepszenie retrievalu. W publicznych benchmarkach samo dodanie BM25 do wektorów zbija odsetek nieudanych retrievali o kilkadziesiąt procent, a dodanie rerankera zbija go ponownie o podobny rząd.</p><h4>Implementacja</h4><p>W Postgresie masz obie połowy bez nowej infrastruktury: <code>ts_rank_cd</code> na tsvector plus pgvector, połączone jednym CTE. Qdrant i Weaviate mają hybrydę wbudowaną, a Elasticsearch od 8.x ma natywne RRF.</p><pre><code>WITH vec AS (\n  SELECT id, row_number() OVER (ORDER BY embedding &lt;=&gt; $1) AS r\n  FROM chunks ORDER BY embedding &lt;=&gt; $1 LIMIT 50\n), kw AS (\n  SELECT id, row_number() OVER (ORDER BY ts_rank_cd(tsv, q) DESC) AS r\n  FROM chunks, plainto_tsquery($2) q WHERE tsv @@ q LIMIT 50\n)\nSELECT id, sum(1.0 / (60 + r)) AS rrf\nFROM (SELECT * FROM vec UNION ALL SELECT * FROM kw) t\nGROUP BY id ORDER BY rrf DESC LIMIT 20;</code></pre><h4>Rerankery, konkretnie</h4><p>Cohere Rerank 3.5, Voyage rerank-2, jina-reranker-v2 albo lokalny BAAI/bge-reranker-v2-m3 na GPU. Cennik Cohere to rząd 2 USD za 1000 wyszukiwań, gdzie jedno wyszukiwanie obejmuje do 100 dokumentów. Latencja dla 50 kandydatów po 500 tokenów to zwykle 100-300 ms przez API, lokalnie na GPU poniżej 50 ms. To realny koszt: przy 100 tysiącach zapytań miesięcznie mówimy o około 200 USD, więc rerankuj tylko wtedy, gdy pomiar pokazuje zysk.</p><h4>Reguły kciuka</h4><ul><li>Kandydaci do rerankingu: 30-60. Poniżej 20 reranker nie ma czego naprawiać, powyżej 100 rośnie koszt bez zysku.</li><li>Do promptu wysyłaj 3-8 chunków. Więcej pogarsza jakość odpowiedzi przez lost-in-the-middle, mimo lepszego recall.</li><li>Odcinaj po progu trafności rerankera, nie tylko po top-k. Brak wyników powyżej progu to sygnał do odpowiedzi nie wiem.</li><li>RRF ze stałą 60 to sprawdzony domyślny wybór. Wagowanie w stylu 0,7 wektory plus 0,3 BM25 wymaga strojenia na Twoich danych i bez zbioru ewaluacyjnego jest zgadywaniem.</li></ul><h4>Pułapki</h4><p>BM25 jest zależny od języka: dla polskiego potrzebujesz właściwego słownika i stemmingu, inaczej odmiana słowa zabije trafienie. Reranker też ma limit kontekstu, zwykle 512-1024 tokeny, więc długie chunki są cicho ucinane i tracisz końcówkę. I najważniejsze: hybryda plus reranking naprawia ranking, ale nie naprawia sytuacji, w której właściwy chunk nigdy nie wszedł do puli 50 kandydatów. Tam pomaga tylko lepszy chunking albo rozszerzanie zapytania.</p>',
          en: '<p>Hybrid plus reranking is the most reliable retrieval upgrade there is. In public benchmarks adding BM25 to vectors cuts failed retrievals by tens of percent, and adding a reranker cuts them again by a similar order.</p><h4>Implementation</h4><p>Postgres gives you both halves with no new infrastructure: <code>ts_rank_cd</code> over tsvector plus pgvector, merged in one CTE. Qdrant and Weaviate ship hybrid search built in, and Elasticsearch has had native RRF since 8.x.</p><pre><code>WITH vec AS (\n  SELECT id, row_number() OVER (ORDER BY embedding &lt;=&gt; $1) AS r\n  FROM chunks ORDER BY embedding &lt;=&gt; $1 LIMIT 50\n), kw AS (\n  SELECT id, row_number() OVER (ORDER BY ts_rank_cd(tsv, q) DESC) AS r\n  FROM chunks, plainto_tsquery($2) q WHERE tsv @@ q LIMIT 50\n)\nSELECT id, sum(1.0 / (60 + r)) AS rrf\nFROM (SELECT * FROM vec UNION ALL SELECT * FROM kw) t\nGROUP BY id ORDER BY rrf DESC LIMIT 20;</code></pre><h4>Rerankers, concretely</h4><p>Cohere Rerank 3.5, Voyage rerank-2, jina-reranker-v2 or a self hosted BAAI/bge-reranker-v2-m3 on GPU. Cohere pricing is on the order of 2 USD per 1000 searches, where one search covers up to 100 documents. Latency for 50 candidates of 500 tokens is typically 100-300 ms over the API, under 50 ms locally on GPU. That is real money: at 100k queries a month you are looking at roughly 200 USD, so rerank only where measurement shows a gain.</p><h4>Rules of thumb</h4><ul><li>Rerank candidates: 30-60. Below 20 the reranker has nothing to fix, above 100 cost grows without benefit.</li><li>Send 3-8 chunks to the prompt. More degrades answer quality through lost-in-the-middle despite better recall.</li><li>Cut on a reranker score threshold, not only on top-k. Nothing above the threshold is a signal to answer I do not know.</li><li>RRF with k=60 is a proven default. Weighted blending like 0.7 vector plus 0.3 BM25 needs tuning on your data and without an eval set it is guesswork.</li></ul><h4>Pitfalls</h4><p>BM25 is language dependent: non-English corpora need the right dictionary and stemmer, otherwise an inflected word kills the match. Rerankers also have a context limit, usually 512-1024 tokens, so long chunks get silently truncated and you lose the tail. Most importantly: hybrid plus reranking fixes ranking, it does not fix the case where the right chunk never entered the 50 candidate pool. Only better chunking or query expansion helps there.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Dlaczego samo wyszukiwanie wektorowe gubi zapytania typu ERR_2451?', en: 'Why does pure vector search miss queries like ERR_2451?' },
          options: [
            { pl: 'Bo baza wektorowa nie obsługuje cyfr', en: 'Because vector databases cannot store digits' },
            { pl: 'Bo embedding rozmywa rzadkie, dosłowne tokeny w ogólnym znaczeniu', en: 'Because embeddings blur rare literal tokens into general meaning' },
            { pl: 'Bo HNSW pomija krótkie dokumenty', en: 'Because HNSW skips short documents' },
            { pl: 'Bo cosine nie działa dla tekstu technicznego', en: 'Because cosine does not work on technical text' }
          ],
          correct: 1,
          explain: {
            pl: 'Embedding reprezentuje sens całego fragmentu, więc unikalny kod ginie w uśrednieniu. BM25 dopasowuje dosłownie i dlatego uzupełnia wektory.',
            en: 'An embedding represents overall meaning, so a unique code drowns in the average. BM25 matches literally, which is exactly why it complements vectors.'
          }
        },
        {
          q: { pl: 'Czym różni się reranker (cross-encoder) od modelu embeddingów (bi-encoder)?', en: 'How does a reranker (cross-encoder) differ from an embedding model (bi-encoder)?' },
          options: [
            { pl: 'Reranker widzi pytanie i dokument razem na wejściu', en: 'The reranker sees question and document together as one input' },
            { pl: 'Reranker jest szybszy i skanuje całą bazę', en: 'The reranker is faster and scans the whole database' },
            { pl: 'Reranker zwraca wektor, a nie liczbę', en: 'The reranker returns a vector rather than a number' },
            { pl: 'Reranker działa tylko na dokumentach w języku angielskim', en: 'The reranker only works on English documents' }
          ],
          correct: 0,
          explain: {
            pl: 'Cross-encoder ocenia parę pytanie plus dokument w jednym przebiegu, więc widzi interakcje słów. Cena to koszt liniowy w liczbie kandydatów, dlatego działa dopiero na krótkiej liście.',
            en: 'A cross-encoder scores the question and document pair in one pass, so it sees word interactions. The price is cost linear in candidates, which is why it only runs on a short list.'
          }
        },
        {
          q: { pl: 'Dlaczego łączy się wyniki przez RRF zamiast dodawać surowe wyniki BM25 i cosine?', en: 'Why merge with RRF instead of adding raw BM25 and cosine scores?' },
          options: [
            { pl: 'Bo dodawanie jest wolniejsze obliczeniowo', en: 'Because addition is computationally slower' },
            { pl: 'Bo skale obu wyników są nieporównywalne i niestabilne między zapytaniami', en: 'Because the two score scales are incomparable and unstable across queries' },
            { pl: 'Bo RRF gwarantuje zwrócenie dokładnie k wyników', en: 'Because RRF guarantees exactly k results' },
            { pl: 'Bo BM25 zwraca wartości ujemne', en: 'Because BM25 returns negative values' }
          ],
          correct: 1,
          explain: {
            pl: 'BM25 nie ma górnej granicy i zmienia się zapytanie po zapytaniu, cosine mieści się w 0-1. Rangi są odporne na te różnice, dlatego RRF działa bez strojenia.',
            en: 'BM25 is unbounded and shifts query to query, cosine sits in 0-1. Ranks are immune to that, which is why RRF works without tuning.'
          }
        },
        {
          q: { pl: 'Dodałeś reranker, ale jakość odpowiedzi nie wzrosła. Właściwy chunk w ogóle nie pojawia się wśród 50 kandydatów. Co naprawić?', en: 'You added a reranker but answer quality did not improve. The right chunk never appears among the 50 candidates. What do you fix?' },
          options: [
            { pl: 'Podnieść próg trafności rerankera', en: 'Raise the reranker score threshold' },
            { pl: 'Zmienić rerankera na większy model', en: 'Switch to a larger reranker model' },
            { pl: 'Poprawić chunking i pierwszy etap wyszukiwania', en: 'Fix chunking and the first-stage retrieval' },
            { pl: 'Zmniejszyć liczbę chunków wysyłanych do promptu', en: 'Send fewer chunks to the prompt' }
          ],
          correct: 2,
          explain: {
            pl: 'Reranker tylko przestawia kolejność w puli, której nie widział wcześniej nie naprawi. Jeśli recall pierwszego etapu jest za niski, pomaga lepszy chunking, hybryda albo rozszerzanie zapytania.',
            en: 'A reranker only reorders the pool, it cannot recover what never entered it. If first-stage recall is too low, better chunking, hybrid search or query expansion is the fix.'
          }
        }
      ]
    },

    {
      id: 'retrieval-evaluation',
      title: { pl: 'Ewaluacja retrievalu', en: 'Retrieval evaluation' },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="30" font-size="15" fill="var(--text)">Golden set: question with known correct chunks</text>' +
          '<rect x="20" y="50" width="600" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="40" y="76" font-size="14" fill="var(--muted)">Q: How long is the refund window?</text>' +
          '<text x="40" y="98" font-size="14" fill="var(--ok)">expected chunks: c17, c42</text>' +
          '<text x="20" y="150" font-size="15" fill="var(--text)">Retrieved top-5</text>' +
          '<rect x="20" y="165" width="112" height="46" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="76" y="194" text-anchor="middle" font-size="14" fill="var(--err)">c03</text>' +
          '<rect x="142" y="165" width="112" height="46" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="198" y="194" text-anchor="middle" font-size="14" fill="var(--ok)">c17</text>' +
          '<rect x="264" y="165" width="112" height="46" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="320" y="194" text-anchor="middle" font-size="14" fill="var(--err)">c88</text>' +
          '<rect x="386" y="165" width="112" height="46" rx="8" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/><text x="442" y="194" text-anchor="middle" font-size="14" fill="var(--err)">c05</text>' +
          '<rect x="508" y="165" width="112" height="46" rx="8" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/><text x="564" y="194" text-anchor="middle" font-size="14" fill="var(--ok)">c42</text>' +
          '<rect x="20" y="250" width="190" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="115" y="277" text-anchor="middle" font-size="14" fill="var(--text)">recall@5 = 2/2</text>' +
          '<text x="115" y="300" text-anchor="middle" font-size="13" fill="var(--muted)">both found</text>' +
          '<rect x="225" y="250" width="190" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="277" text-anchor="middle" font-size="14" fill="var(--text)">precision@5 = 2/5</text>' +
          '<text x="320" y="300" text-anchor="middle" font-size="13" fill="var(--muted)">3 chunks wasted</text>' +
          '<rect x="430" y="250" width="190" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="525" y="277" text-anchor="middle" font-size="14" fill="var(--text)">MRR = 1/2</text>' +
          '<text x="525" y="300" text-anchor="middle" font-size="13" fill="var(--muted)">first hit at rank 2</text>' +
          '<text x="320" y="365" text-anchor="middle" font-size="14" fill="var(--muted)">Measure retrieval before you blame the model</text>' +
          '</svg>',
        caption: {
          pl: 'Jeden przykład ze zbioru złotego i trzy metryki policzone na tym samym wyniku: recall, precision i MRR.',
          en: 'One golden set example and three metrics computed on the same result: recall, precision and MRR.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Twój pies uczy się aportować. Rzucasz patyk i chcesz wiedzieć, czy jest w tym dobry. Nie wystarczy powiedzieć wygląda nieźle. Trzeba mieć zasady.</p><p>Robisz listę dwudziestu rzutów i przy każdym zapisujesz, który patyk był ten właściwy. Potem puszczasz psa i sprawdzasz.</p><p>Pytanie pierwsze: czy w ogóle przyniósł właściwy patyk? To jest recall. Pytanie drugie: ile niepotrzebnych patyków przy okazji przytargał? To precyzja. Pytanie trzecie: czy właściwy patyk był pierwszy w pysku, czy dopiero czwarty? To pozycja.</p><p>Najważniejsze jest to, że sprawdzasz psa osobno od siebie. Jeżeli pies przyniósł dobre patyki, a Ty i tak zbudowałeś z nich krzywy domek, to nie wina psa. Jeżeli pies przyniósł same liście, żaden Twój talent tego nie uratuje.</p><p>Dlatego zawsze najpierw mierzysz szukanie, a dopiero potem odpowiadanie.</p>',
          en: '<p>Your dog is learning to fetch. You throw a stick and you want to know whether he is any good at it. Saying he looks fine is not enough. You need rules.</p><p>You write a list of twenty throws and for each one you note which stick was the right one. Then you send the dog and check.</p><p>Question one: did he bring the right stick at all? That is recall. Question two: how many useless sticks did he drag along? That is precision. Question three: was the right stick first in his mouth or only the fourth? That is position.</p><p>The important part is that you test the dog separately from yourself. If the dog brought good sticks and you still built a crooked hut out of them, that is not his fault. If the dog brought only leaves, no talent of yours will save the hut.</p><p>So you always measure the fetching first and the building second.</p>'
        },
        school: {
          pl: '<p>W RAG zawsze mierz retrieval <strong>osobno</strong> od generacji. Inaczej nie wiesz, czy zła odpowiedź to wina wyszukiwarki, czy modelu, i strojenie promptu staje się zgadywanką.</p><p>Podstawa to <strong>zbiór złoty</strong> (golden set): 50-200 realnych pytań, do każdego lista identyfikatorów chunków, które faktycznie zawierają odpowiedź. Zbieraj je z prawdziwych logów i pytań użytkowników, nie wymyślaj przy biurku.</p><p>Trzy metryki, które wystarczą na start:</p><ul><li><strong>recall@k</strong> - jaki procent oczekiwanych chunków znalazł się w top k. To metryka numer jeden, bo czego nie ma w promptcie, tego model nie wymyśli.</li><li><strong>precision@k</strong> - jaki procent zwróconych chunków był trafny. Niska precyzja to zmarnowane tokeny i rozproszony model.</li><li><strong>MRR</strong> (Mean Reciprocal Rank) - średnia z odwrotności pozycji pierwszego trafienia. Trafienie na miejscu 1 daje 1,0, na miejscu 4 daje 0,25. Mierzy, jak wysoko ląduje właściwy wynik.</li></ul><pre><code>function recallAtK(expected, retrieved, k) {\n  const top = retrieved.slice(0, k);\n  const hits = expected.filter(id =&gt; top.includes(id)).length;\n  return hits / expected.length;\n}</code></pre><p>Analogia frontendowa: to są testy jednostkowe warstwy danych. Nie testujesz przycisku, żeby sprawdzić, czy fetch zwraca dobre dane. Robisz osobny test API i osobny test UI.</p><p>Praktyka: uruchamiaj zbiór złoty po każdej zmianie chunkingu, modelu embeddingów albo k. Zapisuj wyniki do pliku w repo, żeby widzieć trend w pull requeście. Jeżeli recall@10 wynosi 0,95, a odpowiedzi są złe, problem leży w prompcie lub modelu, i wtedy dopiero tam idziesz.</p>',
          en: '<p>In RAG always measure retrieval <strong>separately</strong> from generation. Otherwise you cannot tell whether a bad answer is the search engine or the model, and prompt tuning becomes guesswork.</p><p>The foundation is a <strong>golden set</strong>: 50-200 real questions, each with a list of chunk ids that actually contain the answer. Harvest them from real logs and user questions, do not invent them at your desk.</p><p>Three metrics are enough to start:</p><ul><li><strong>recall@k</strong> - what percentage of expected chunks made it into the top k. This is metric number one, because what is not in the prompt cannot be invented by the model.</li><li><strong>precision@k</strong> - what percentage of returned chunks were relevant. Low precision means wasted tokens and a distracted model.</li><li><strong>MRR</strong> (Mean Reciprocal Rank) - the average of the reciprocal of the first hit position. A hit at rank 1 gives 1.0, at rank 4 gives 0.25. It measures how high the right result lands.</li></ul><pre><code>function recallAtK(expected, retrieved, k) {\n  const top = retrieved.slice(0, k);\n  const hits = expected.filter(id =&gt; top.includes(id)).length;\n  return hits / expected.length;\n}</code></pre><p>Frontend analogy: these are unit tests for the data layer. You do not test a button to find out whether fetch returns good data. You write an API test and a UI test separately.</p><p>In practice: run the golden set after every change to chunking, embedding model or k. Write results to a file in the repo so the trend shows up in the pull request. If recall@10 is 0.95 and answers are still bad, the problem is the prompt or the model, and only then do you go there.</p>'
        },
        pro: {
          pl: '<p>Ewaluacja retrievalu to jedyny sposób, żeby strojenie RAG przestało być zgadywaniem. Traktuj ją jak testy regresyjne warstwy danych.</p><h4>Budowa zbioru złotego</h4><p>Cel to 100-300 pytań pokrywających realny rozkład ruchu, w tym pytania bez odpowiedzi w korpusie. Te ostatnie są krytyczne: mierzą, czy system potrafi powiedzieć nie wiem. Anotację przyspiesz modelem: dla każdego chunka wygeneruj pytanie, na które ten chunk odpowiada, a potem daj człowiekowi do weryfikacji. Zbiór wyłącznie syntetyczny jest zbyt łatwy, bo pytanie zapożycza słownictwo chunka i wygrywa nawet słaby retriever.</p><h4>Metryki, których naprawdę używa się w produkcji</h4><ul><li><strong>recall@k dla k = 5, 10, 20.</strong> Recall@20 to sufit dla rerankera, recall@5 to realne wejście do promptu.</li><li><strong>NDCG@10</strong> - uwzględnia stopniowaną trafność i pozycję. Dobre, gdy chunki są częściowo trafne.</li><li><strong>Hit rate</strong> - odsetek pytań z co najmniej jednym trafieniem. Prosty, świetny do dashboardu.</li><li><strong>Context precision i context recall</strong> z frameworka Ragas, liczone modelem, gdy nie masz anotacji ręcznych.</li></ul><h4>Narzędzia</h4><p>Ragas do metryk RAG bez pełnej anotacji, promptfoo do prostych progów w CI, Langfuse albo Braintrust do trzymania datasetów, przebiegów i porównań między wersjami. Cały przebieg na 200 pytań to zwykle 2-5 minut i kilkadziesiąt centów, jeżeli metryki liczy tani model.</p><pre><code># CI gate\nragas evaluate --dataset golden.jsonl \\\n  --metrics context_recall,context_precision \\\n  --fail-under 0.85</code></pre><h4>Dyscyplina eksperymentów</h4><p>Zmieniaj jedną rzecz naraz: rozmiar chunka, model embeddingów, k, obecność rerankera. Zapisuj wynik do jednej tabeli. Typowa ścieżka poprawy wygląda tak: baseline wektorowy recall@10 około 0,70, plus BM25 i RRF około 0,82, plus reranker około 0,90, plus contextual retrieval około 0,94. Dalsze wyciskanie zwykle nie zwraca się kosztowo.</p><h4>Pułapki</h4><ul><li><strong>Zbiór złoty starzeje się razem z korpusem.</strong> Identyfikatory chunków zmieniają się po reindeksie, więc kotwicz oczekiwania w id dokumentu plus fragment tekstu, nie w id chunka.</li><li><strong>Przeuczenie na zbiorze.</strong> Trzymaj drugi, nieoglądany zestaw holdout i patrz na niego raz na kwartał.</li><li><strong>Mierzenie tylko końcowej odpowiedzi.</strong> LLM potrafi udzielić dobrej odpowiedzi z wiedzy własnej mimo fatalnego retrievalu, co maskuje problem do dnia, w którym pytanie dotyczy Twoich wewnętrznych danych.</li></ul>',
          en: '<p>Retrieval evaluation is the only thing that turns RAG tuning from guesswork into engineering. Treat it as regression testing for your data layer.</p><h4>Building the golden set</h4><p>Aim for 100-300 questions covering the real traffic distribution, including questions with no answer in the corpus. Those are critical: they measure whether the system can say I do not know. Speed up annotation with a model: for each chunk generate a question that chunk answers, then have a human verify. A purely synthetic set is too easy, because the question borrows the chunk vocabulary and even a weak retriever wins.</p><h4>Metrics actually used in production</h4><ul><li><strong>recall@k for k = 5, 10, 20.</strong> Recall@20 is the ceiling your reranker can work with, recall@5 is what really enters the prompt.</li><li><strong>NDCG@10</strong> - accounts for graded relevance and position. Good when chunks are partially relevant.</li><li><strong>Hit rate</strong> - share of questions with at least one hit. Simple and great for a dashboard.</li><li><strong>Context precision and context recall</strong> from the Ragas framework, computed by a model when you lack manual annotations.</li></ul><h4>Tooling</h4><p>Ragas for RAG metrics without full annotation, promptfoo for simple thresholds in CI, Langfuse or Braintrust to hold datasets, runs and cross-version comparisons. A full run over 200 questions typically takes 2-5 minutes and costs tens of cents when a cheap model computes the metrics.</p><pre><code># CI gate\nragas evaluate --dataset golden.jsonl \\\n  --metrics context_recall,context_precision \\\n  --fail-under 0.85</code></pre><h4>Experiment discipline</h4><p>Change one thing at a time: chunk size, embedding model, k, reranker on or off. Log every result into one table. A typical improvement path looks like this: vector baseline recall@10 around 0.70, plus BM25 and RRF around 0.82, plus reranker around 0.90, plus contextual retrieval around 0.94. Squeezing further usually stops paying for itself.</p><h4>Pitfalls</h4><ul><li><strong>The golden set ages with the corpus.</strong> Chunk ids change after a reindex, so anchor expectations on document id plus a text snippet, not on chunk id.</li><li><strong>Overfitting to the set.</strong> Keep a second, unseen holdout and look at it once a quarter.</li><li><strong>Measuring only the final answer.</strong> An LLM can produce a good answer from parametric knowledge despite terrible retrieval, hiding the problem until the day the question is about your internal data.</li></ul>'
        }
      },
      quiz: [
        {
          q: { pl: 'Co mierzy recall@10 w ewaluacji retrievalu?', en: 'What does recall@10 measure in retrieval evaluation?' },
          options: [
            { pl: 'Ile procent zwróconych chunków było trafnych', en: 'What percentage of returned chunks were relevant' },
            { pl: 'Ile procent oczekiwanych chunków znalazło się w pierwszej dziesiątce', en: 'What percentage of expected chunks appeared in the top ten' },
            { pl: 'Jak szybko baza zwraca dziesięć wyników', en: 'How fast the database returns ten results' },
            { pl: 'Jak dobra jest końcowa odpowiedź modelu', en: 'How good the final model answer is' }
          ],
          correct: 1,
          explain: {
            pl: 'Recall patrzy z perspektywy oczekiwanych dokumentów: czy dotarły do puli. Odsetek trafnych wśród zwróconych to precision.',
            en: 'Recall looks from the expected-documents side: did they make it into the pool. The share of relevant items among returned ones is precision.'
          }
        },
        {
          q: { pl: 'Odpowiedzi Twojego RAG są złe. Recall@10 wynosi 0,94. Gdzie szukasz problemu?', en: 'Your RAG answers are bad. Recall@10 is 0.94. Where do you look?' },
          options: [
            { pl: 'W chunkingu i modelu embeddingów', en: 'In chunking and the embedding model' },
            { pl: 'W indeksie HNSW', en: 'In the HNSW index' },
            { pl: 'W prompcie i modelu generującym', en: 'In the prompt and the generating model' },
            { pl: 'W liczbie wymiarów wektora', en: 'In the vector dimensionality' }
          ],
          correct: 2,
          explain: {
            pl: 'Wysoki recall oznacza, że właściwe fragmenty trafiają do kontekstu. Skoro dane są, winna jest warstwa generacji: instrukcje, kolejność chunków albo model.',
            en: 'High recall means the right fragments reach the context. If the data is there, the generation layer is at fault: instructions, chunk ordering or the model.'
          }
        },
        {
          q: { pl: 'Który zbiór złoty jest najbardziej wiarygodny?', en: 'Which golden set is the most trustworthy?' },
          options: [
            { pl: 'Pytania wygenerowane z chunków, bez weryfikacji człowieka', en: 'Questions generated from chunks with no human verification' },
            { pl: 'Realne pytania użytkowników, w tym takie bez odpowiedzi w korpusie', en: 'Real user questions, including ones with no answer in the corpus' },
            { pl: 'Dziesięć pytań wymyślonych przez zespół przy tablicy', en: 'Ten questions invented by the team at a whiteboard' },
            { pl: 'Pytania skopiowane z publicznego benchmarku', en: 'Questions copied from a public benchmark' }
          ],
          correct: 1,
          explain: {
            pl: 'Realne pytania odzwierciedlają rozkład ruchu, a pytania bez pokrycia sprawdzają, czy system umie powiedzieć nie wiem. Pytania generowane z chunków zapożyczają ich słownictwo i są sztucznie łatwe.',
            en: 'Real questions reflect the traffic distribution, and uncovered questions test whether the system can say I do not know. Chunk-generated questions borrow chunk vocabulary and are artificially easy.'
          }
        },
        {
          q: { pl: 'Po reindeksie wszystkie testy retrievalu spadły do zera, choć wyszukiwarka działa dobrze. Najbardziej prawdopodobna przyczyna?', en: 'After a reindex all retrieval tests dropped to zero although search works fine. Most likely cause?' },
          options: [
            { pl: 'Zbiór złoty kotwiczy oczekiwania w id chunków, które się zmieniły', en: 'The golden set anchors expectations on chunk ids that changed' },
            { pl: 'Model embeddingów przestał odpowiadać', en: 'The embedding model stopped responding' },
            { pl: 'ef_search wrócił do wartości domyślnej', en: 'ef_search reverted to its default' },
            { pl: 'BM25 zgubił stemming', en: 'BM25 lost its stemmer' }
          ],
          correct: 0,
          explain: {
            pl: 'Identyfikatory chunków są nietrwałe między reindeksami. Kotwicz oczekiwania w id dokumentu i fragmencie tekstu, wtedy zbiór przeżyje zmianę chunkingu.',
            en: 'Chunk ids are not stable across reindexes. Anchor expectations on document id plus a text snippet and the set survives chunking changes.'
          }
        }
      ]
    },

    {
      id: 'rag-failure-modes',
      title: { pl: 'Tryby awarii RAG', en: 'RAG failure modes' },
      minutes: 10,
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="rag6-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" font-size="15" fill="var(--text)">Where a RAG pipeline silently breaks</text>' +
          '<rect x="30" y="50" width="250" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="83" text-anchor="middle" font-size="14" fill="var(--text)">1. Ingest and chunking</text>' +
          '<text x="300" y="83" font-size="13" fill="var(--err)">table shredded</text>' +
          '<rect x="30" y="130" width="250" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="163" text-anchor="middle" font-size="14" fill="var(--text)">2. Index freshness</text>' +
          '<text x="300" y="163" font-size="13" fill="var(--err)">doc updated, index stale</text>' +
          '<rect x="30" y="210" width="250" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="243" text-anchor="middle" font-size="14" fill="var(--text)">3. Retrieval</text>' +
          '<text x="300" y="243" font-size="13" fill="var(--err)">silent miss, k results always</text>' +
          '<rect x="30" y="290" width="250" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="323" text-anchor="middle" font-size="14" fill="var(--text)">4. Prompt assembly</text>' +
          '<text x="300" y="323" font-size="13" fill="var(--err)">lost in the middle</text>' +
          '<rect x="30" y="370" width="250" height="56" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="155" y="403" text-anchor="middle" font-size="14" fill="var(--text)">5. Generation</text>' +
          '<text x="300" y="403" font-size="13" fill="var(--err)">no citation, confident tone</text>' +
          '<path d="M155,106 L155,124" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag6-a)"/>' +
          '<path d="M155,186 L155,204" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag6-a)"/>' +
          '<path d="M155,266 L155,284" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag6-a)"/>' +
          '<path d="M155,346 L155,364" stroke="var(--muted)" stroke-width="2" marker-end="url(#rag6-a)"/>' +
          '</svg>',
        caption: {
          pl: 'Pięć miejsc, w których RAG psuje się po cichu. Każde daje odpowiedź, która brzmi dobrze i jest błędna.',
          en: 'Five places where RAG breaks silently. Each one produces an answer that sounds right and is wrong.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie automat z kanapkami, który zawsze coś wydaje. Zawsze. Nawet gdy w środku nie ma już kanapek, wypada coś owinięte w ładny papier.</p><p>To jest największy problem RAG: nigdy nie mówi, że nie ma. Zawsze zwróci pięć fragmentów, bo tyle kazałeś. Nawet gdy żaden nie pasuje, wybierze te pięć najmniej niepasujących.</p><p>Rzeczy psują się po cichu w kilku miejscach. Ktoś zmienił cennik na stronie, ale do automatu nikt nowej kanapki nie włożył, więc leci stara. Ktoś pociął przepis w złym miejscu i zniknęła temperatura piekarnika. Ktoś włożył do promptu dziesięć kartek, a model przeczytał uważnie tylko pierwszą i ostatnią.</p><p>Lekarstwo jest zawsze to samo: kazać automatowi pokazać, z której kanapki wziął nadzienie. Jak nie umie pokazać, to znaczy, że zmyśla, a Ty możesz to wykryć zanim zobaczy to użytkownik.</p>',
          en: '<p>Imagine a sandwich machine that always dispenses something. Always. Even when it is empty inside, something wrapped in nice paper falls out.</p><p>That is the biggest problem with RAG: it never says it has nothing. It will always return five fragments, because five is what you asked for. Even when none of them fit, it picks the five least unfitting ones.</p><p>Things break quietly in several places. Somebody changed the price list on the website but nobody restocked the machine, so the old sandwich comes out. Somebody cut a recipe in the wrong spot and the oven temperature disappeared. Somebody put ten sheets into the prompt and the model only read the first and the last one carefully.</p><p>The cure is always the same: make the machine show which sandwich the filling came from. If it cannot show you, it is making things up, and you can catch that before your user does.</p>'
        },
        school: {
          pl: '<p>RAG rzadko wywala się z błędem. Zwraca odpowiedź, która brzmi dobrze i jest błędna. Warto znać typowe tryby awarii i wiedzieć, gdzie w pipelinie każdy z nich mieszka.</p><ul><li><strong>Ciche pudło retrievalu.</strong> Wyszukiwarka zawsze zwraca k wyników, nawet gdy żaden nie jest trafny. Nie ma sygnału nie znalazłem. Lekarstwo: próg podobieństwa albo próg rerankera i jawna odpowiedź nie wiem poniżej progu.</li><li><strong>Złe chunki.</strong> Tabela pocięta w połowie, nagłówek oderwany od treści, stopka w każdym fragmencie. Lekarstwo: parser świadomy struktury i odrzucanie chunków krótszych niż 50 tokenów.</li><li><strong>Nieaktualny indeks.</strong> Dokument zmieniony wczoraj, embedding sprzed miesiąca. Model odpowiada starą polityką z pełnym przekonaniem. Lekarstwo: pokazuj datę aktualizacji przy cytacie i monitoruj opóźnienie indeksowania.</li><li><strong>Lost in the middle.</strong> Modele przywiązują największą wagę do początku i końca kontekstu. Chunk numer 7 z 12 bywa praktycznie niewidoczny. Lekarstwo: mniej chunków, najlepszy na pierwszym miejscu.</li><li><strong>Brak cytatów.</strong> Bez identyfikatorów nikt, łącznie z Tobą, nie jest w stanie sprawdzić odpowiedzi.</li><li><strong>Konflikt źródeł.</strong> Dwa dokumenty mówią co innego, model po cichu wybiera jeden.</li></ul><p>Analogia frontendowa: to są błędy typu pusty stan i nieaktualny cache. Nikt nie rzuca wyjątku, po prostu interfejs pokazuje nieprawdę. Twoje zadanie to zbudować odpowiedniki loading, empty i error state dla odpowiedzi modelu.</p><p>Minimalny zestaw zabezpieczeń: próg trafności, wymuszone cytaty z identyfikatorem chunka, data aktualizacji przy każdym źródle i logowanie każdego zapytania razem ze zwróconymi chunkami, żeby dało się odtworzyć każdą złą odpowiedź.</p>',
          en: '<p>RAG rarely fails with an error. It returns an answer that sounds right and is wrong. It pays to know the typical failure modes and where in the pipeline each one lives.</p><ul><li><strong>Silent retrieval miss.</strong> The search engine always returns k results, even when none are relevant. There is no not-found signal. Cure: a similarity or reranker threshold and an explicit I do not know below it.</li><li><strong>Bad chunks.</strong> A table cut in half, a heading detached from its body, a footer in every fragment. Cure: a structure aware parser and dropping chunks under 50 tokens.</li><li><strong>Stale index.</strong> Document updated yesterday, embedding from last month. The model states the old policy with full confidence. Cure: show the updated_at date next to citations and monitor indexing lag.</li><li><strong>Lost in the middle.</strong> Models weight the beginning and end of the context most. Chunk 7 of 12 can be effectively invisible. Cure: fewer chunks, best one first.</li><li><strong>No citations.</strong> Without ids nobody, including you, can verify the answer.</li><li><strong>Source conflict.</strong> Two documents disagree and the model silently picks one.</li></ul><p>Frontend analogy: these are empty-state and stale-cache bugs. Nothing throws, the UI simply shows something untrue. Your job is to build the equivalent of loading, empty and error states for model answers.</p><p>The minimum safety kit: a relevance threshold, enforced citations with chunk ids, an updated_at date on every source, and logging of every query together with the retrieved chunks so any bad answer can be reproduced.</p>'
        },
        pro: {
          pl: '<p>Każdy tryb awarii RAG ma miejsce w pipelinie, wykrywalny sygnał i konkretną obronę. Poniżej wersja, którą warto umieć wyrecytować na rozmowie.</p><h4>1. Ciche pudło</h4><p>Objaw: pewna odpowiedź na pytanie spoza korpusu. Detekcja: rozkład najlepszego wyniku rerankera per zapytanie. Obrona: próg, na przykład wynik Cohere Rerank poniżej 0,3 oznacza zero kontekstu i wymuszone INSUFFICIENT_CONTEXT. Mierz odsetek takich odpowiedzi jako metrykę produktową, docelowo 5-15 procent w realnym ruchu. Zero oznacza, że system kłamie zamiast się przyznawać.</p><h4>2. Lost in the middle</h4><p>Badanie Liu i innych z 2023 pokazało spadek dokładności rzędu 20 punktów procentowych, gdy właściwa informacja leży w środku długiego kontekstu. Obrona: 3-8 chunków zamiast 20, najlepszy na początku, ewentualnie duplikacja kluczowego fragmentu na końcu promptu. Więcej kontekstu nie jest za darmo, nawet przy oknie 200k tokenów.</p><h4>3. Nieaktualność</h4><p>Traktuj indeks jak cache i mierz go jak cache: opóźnienie indeksowania w minutach jako metryka z alertem. Deterministyczne id z hasha treści plus upsert daje idempotentny reingest. Zawsze renderuj updated_at obok cytatu, bo to przenosi ostatnią weryfikację na użytkownika w sposób uczciwy.</p><h4>4. Konflikt źródeł</h4><p>Dodaj do metadanych priorytet i status (draft, published, deprecated), filtruj deprecated na poziomie zapytania, a przy rozbieżnych datach instruuj model, żeby zacytował obie wersje i wskazał nowszą, zamiast wybierać po cichu.</p><h4>5. Brak weryfikowalności</h4><pre><code>const cited = new Set(answer.match(/\\[c\\d+\\]/g) || []);\nconst valid = [...cited].every(id =&gt; retrievedIds.has(id));\nif (!valid) return retryWithStricterPrompt();</code></pre><p>To najtańszy groundcheck, jaki istnieje: sprawdzasz, czy każdy zacytowany identyfikator faktycznie był w kontekście. Wyłapuje zmyślone cytaty, które są najbardziej podstępną klasą halucynacji, bo wyglądają na dowód.</p><h4>Obserwowalność</h4><p>Loguj do Langfuse albo Braintrust pełny trace: zapytanie, przepisane zapytanie, id kandydatów, wyniki rerankera, finalny prompt, odpowiedź, ocenę użytkownika. Bez tego debugowanie skargi z zeszłego tygodnia jest niemożliwe, bo indeks już się zmienił. Dodaj kciuk w dół w UI i cotygodniowy przegląd dwudziestu najgorszych trace, to najtańszy proces poprawy jakości, jaki znam. Pamiętaj też, że trace zawiera treść dokumentów, więc traktuj go jak dane produkcyjne: retencja 30 dni, redakcja PII i te same uprawnienia co do samego korpusu. Wyciek przez panel obserwowalności jest równie realny jak wyciek przez API.</p>',
          en: '<p>Every RAG failure mode has a location in the pipeline, a detectable signal and a concrete defense. Here is the version worth being able to recite in an interview.</p><h4>1. Silent miss</h4><p>Symptom: a confident answer to a question outside the corpus. Detection: the distribution of top reranker score per query. Defense: a threshold, for example a Cohere Rerank score below 0.3 means zero context and a forced INSUFFICIENT_CONTEXT. Track the share of such answers as a product metric, typically 5-15 percent on real traffic. Zero means the system is lying rather than admitting ignorance.</p><h4>2. Lost in the middle</h4><p>Liu et al. 2023 measured accuracy drops around 20 percentage points when the relevant information sits in the middle of a long context. Defense: 3-8 chunks instead of 20, best one first, optionally repeating the key fragment at the end of the prompt. More context is never free, even with a 200k token window.</p><h4>3. Staleness</h4><p>Treat the index as a cache and measure it like one: indexing lag in minutes as an alerting metric. Deterministic ids from a content hash plus upsert give idempotent re-ingest. Always render updated_at next to a citation, it hands the final verification to the user honestly.</p><h4>4. Source conflict</h4><p>Add priority and status (draft, published, deprecated) to metadata, filter deprecated at query level, and when dates disagree instruct the model to cite both versions and flag the newer one rather than silently choosing.</p><h4>5. No verifiability</h4><pre><code>const cited = new Set(answer.match(/\\[c\\d+\\]/g) || []);\nconst valid = [...cited].every(id =&gt; retrievedIds.has(id));\nif (!valid) return retryWithStricterPrompt();</code></pre><p>This is the cheapest ground check in existence: verify that every cited id was actually in the context. It catches fabricated citations, the most insidious class of hallucination because they look like evidence.</p><h4>Observability</h4><p>Log a full trace to Langfuse or Braintrust: query, rewritten query, candidate ids, reranker scores, final prompt, answer, user rating. Without it, debugging last week complaint is impossible because the index has already changed. Add a thumbs-down control in the UI and a weekly review of the twenty worst traces, it is the cheapest quality process I know of.</p>'
        }
      },
      quiz: [
        {
          q: { pl: 'Dlaczego ciche pudło retrievalu jest tak groźne?', en: 'Why is a silent retrieval miss so dangerous?' },
          options: [
            { pl: 'Bo baza zwraca błąd, który trudno obsłużyć', en: 'Because the database throws an error that is hard to handle' },
            { pl: 'Bo wyszukiwarka zawsze zwraca k wyników, nawet gdy żaden nie pasuje', en: 'Because the engine always returns k results even when none match' },
            { pl: 'Bo powoduje timeout zapytania', en: 'Because it causes a query timeout' },
            { pl: 'Bo indeks HNSW się psuje', en: 'Because it corrupts the HNSW index' }
          ],
          correct: 1,
          explain: {
            pl: 'Top-k nie ma pojęcia trafności absolutnej, więc zwraca najmniej złe wyniki. Bez progu odcięcia model dostaje śmieci i odpowiada z pełnym przekonaniem.',
            en: 'Top-k has no notion of absolute relevance, so it returns the least bad results. Without a cutoff threshold the model gets junk and answers with full confidence.'
          }
        },
        {
          q: { pl: 'Zwiększasz liczbę chunków w prompcie z 5 do 20. Recall rośnie, ale jakość odpowiedzi spada. Dlaczego?', en: 'You raise chunks in the prompt from 5 to 20. Recall improves but answer quality drops. Why?' },
          options: [
            { pl: 'Model przekroczył okno kontekstu i odrzuca prompt', en: 'The model exceeded its context window and rejects the prompt' },
            { pl: 'Efekt lost-in-the-middle: informacja w środku długiego kontekstu jest słabo wykorzystywana', en: 'Lost-in-the-middle: information in the middle of a long context is poorly used' },
            { pl: 'Embeddingi tracą normalizację przy większym k', en: 'Embeddings lose normalization at higher k' },
            { pl: 'Reranker przestaje działać powyżej 10 dokumentów', en: 'The reranker stops working above 10 documents' }
          ],
          correct: 1,
          explain: {
            pl: 'Uwaga modelu jest nierównomierna: początek i koniec kontekstu ważą najwięcej. Dlatego 3-8 dobrze uszeregowanych chunków bije 20 przypadkowych.',
            en: 'Model attention is uneven: the start and end of the context weigh most. That is why 3-8 well ranked chunks beat 20 random ones.'
          }
        },
        {
          q: { pl: 'Najtańszy sposób wykrycia zmyślonego cytatu w odpowiedzi?', en: 'Cheapest way to detect a fabricated citation in an answer?' },
          options: [
            { pl: 'Poprosić drugi model o ocenę wiarygodności', en: 'Ask a second model to judge credibility' },
            { pl: 'Sprawdzić w kodzie, czy każdy zacytowany identyfikator był w zwróconym kontekście', en: 'Check in code that every cited id was actually in the retrieved context' },
            { pl: 'Obniżyć temperature do 0,1', en: 'Lower temperature to 0.1' },
            { pl: 'Zwiększyć overlap między chunkami', en: 'Increase overlap between chunks' }
          ],
          correct: 1,
          explain: {
            pl: 'To zwykłe porównanie zbiorów, kosztuje mikrosekundy i nie wymaga żadnego modelu. Sędzia LLM przydaje się dopiero do sprawdzania, czy cytat rzeczywiście popiera twierdzenie.',
            en: 'It is a plain set comparison, costs microseconds and needs no model. An LLM judge is only needed for the harder question of whether the citation actually supports the claim.'
          }
        },
        {
          q: { pl: 'Twój system RAG nigdy nie odpowiada nie wiem, na produkcji z realnym ruchem. Jak to interpretować?', en: 'Your RAG system never answers I do not know on real production traffic. How should you read that?' },
          options: [
            { pl: 'Jako sygnał ostrzegawczy, że halucynuje zamiast się przyznawać', en: 'As a warning sign that it hallucinates instead of admitting ignorance' },
            { pl: 'Jako dowód doskonałego pokrycia korpusu', en: 'As proof of perfect corpus coverage' },
            { pl: 'Jako efekt zbyt niskiego k', en: 'As a side effect of too low a k' },
            { pl: 'Jako normalne zachowanie każdego RAG', en: 'As normal behaviour for any RAG' }
          ],
          correct: 0,
          explain: {
            pl: 'W realnym ruchu zawsze są pytania spoza korpusu, więc zdrowy system odmawia w kilku do kilkunastu procentach przypadków. Zero odmów oznacza brak progu odcięcia.',
            en: 'Real traffic always contains out-of-corpus questions, so a healthy system abstains on a few to fifteen percent of them. Zero abstentions means there is no cutoff threshold.'
          }
        }
      ]
    }
  ]
}
