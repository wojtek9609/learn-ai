// Module 01 - LLM Fundamentals
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema" + v7).

// ---------------------------------------------------------------- shared SVG
// Generic frame builders for the interactive players (SPEC v4 widget, v7 arrays).
// Every frame of a set shares the viewBox and the layout, so a player reads as
// one animation instead of a slideshow of unrelated pictures.

function svgFrame(inner) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    inner + '</svg>';
}

function fHead(text) {
  return '<text x="20" y="28" font-size="15" fill="var(--muted)">' + text + '</text>';
}

function fPanel(headline, line1, line2, color) {
  return '<rect x="20" y="278" width="600" height="104" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="40" y="308" font-size="15" fill="' + color + '">' + headline + '</text>' +
    '<text x="40" y="334" font-size="13" fill="var(--muted)">' + line1 + '</text>' +
    '<text x="40" y="358" font-size="13" fill="var(--muted)">' + (line2 || '') + '</text>';
}

function fBar(y, label, w, color, value) {
  return '<text x="28" y="' + (y + 15) + '" font-size="13" fill="var(--muted)">' + label + '</text>' +
    '<rect x="180" y="' + y + '" width="' + w + '" height="20" rx="5" fill="' + color + '"/>' +
    '<text x="' + (188 + w) + '" y="' + (y + 15) + '" font-size="13" fill="var(--muted)">' + value + '</text>';
}

function fBox(x, y, w, h, title, sub, stroke) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + (sub ? h / 2 - 2 : h / 2 + 5)) + '" text-anchor="middle" font-size="15" fill="var(--text)">' + title + '</text>' +
    (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 20) + '" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text>' : '');
}

function fChip(x, y, w, label, fill, stroke) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="38" rx="9" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 25) + '" text-anchor="middle" font-size="14" fill="var(--text)">' + label + '</text>';
}

function fArrowR(x, y, len, color) {
  return '<line x1="' + x + '" y1="' + y + '" x2="' + (x + len - 9) + '" y2="' + y + '" stroke="' + color + '" stroke-width="2"/>' +
    '<polygon points="' + (x + len) + ',' + y + ' ' + (x + len - 11) + ',' + (y - 6) + ' ' + (x + len - 11) + ',' + (y + 6) + '" fill="' + color + '"/>';
}

function fArrowD(x, y, len, color) {
  return '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + len - 9) + '" stroke="' + color + '" stroke-width="2"/>' +
    '<polygon points="' + x + ',' + (y + len) + ' ' + (x - 6) + ',' + (y + len - 11) + ' ' + (x + 6) + ',' + (y + len - 11) + '" fill="' + color + '"/>';
}

function fText(x, y, text, size, color, anchor) {
  return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + color + '"' +
    (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + text + '</text>';
}

// -------------------------------------------------------------- BPE builders

const BPE_HEAD =
  '<text x="20" y="28" fill="var(--muted)" font-size="14">BPE: merge the most frequent pair, then repeat</text>';

const BPE_FOOT =
  '<rect x="20" y="250" width="600" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
  '<text x="40" y="284" font-size="14" fill="var(--muted)">The merge list is learned once, on a huge corpus.</text>' +
  '<text x="40" y="308" font-size="14" fill="var(--muted)">Every prompt is then cut with exactly the same rules.</text>';

function bpeCell(x, w, label, stroke) {
  return '<rect x="' + x + '" y="110" width="' + w + '" height="56" rx="10" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="146" text-anchor="middle" font-size="16" fill="var(--text)">' + label + '</text>';
}

function bpePair(x1, x2) {
  return '<path d="M' + x1 + ' 176 L' + x1 + ' 188 L' + x2 + ' 188 L' + x2 + ' 176" fill="none" stroke="var(--accent)" stroke-width="2"/>';
}

function bpeStep(text, color) {
  return '<text x="320" y="216" text-anchor="middle" font-size="15" fill="' + color + '">' + text + '</text>';
}

function bpeFrame(inner, status, statusColor) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    BPE_HEAD + inner + BPE_FOOT +
    '<text x="40" y="350" font-size="15" fill="' + statusColor + '">' + status + '</text>' +
    '</svg>';
}

// ------------------------------------------------------------ cache builders

const CACHE_HEAD =
  '<text x="20" y="26" fill="var(--muted)" font-size="14">Prompt caching: the prefix is what you are paying for</text>' +
  '<rect x="20" y="42" width="600" height="58" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>';

function cacheSeg(x, w, label, fill, opacity) {
  return '<rect x="' + x + '" y="52" width="' + w + '" height="38" rx="8" fill="' + fill + '" opacity="' + opacity + '"/>' +
    '<text x="' + (x + w / 2) + '" y="76" text-anchor="middle" font-size="13" fill="var(--text)">' + label + '</text>';
}

function cacheBox(x, title, line1, line2, stroke) {
  return '<rect x="' + x + '" y="130" width="290" height="96" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 145) + '" y="160" text-anchor="middle" font-size="15" fill="var(--text)">' + title + '</text>' +
    '<text x="' + (x + 145) + '" y="184" text-anchor="middle" font-size="13" fill="var(--muted)">' + line1 + '</text>' +
    '<text x="' + (x + 145) + '" y="206" text-anchor="middle" font-size="13" fill="var(--muted)">' + line2 + '</text>';
}

function cacheFoot(headline, line1, line2, color) {
  return '<rect x="20" y="250" width="600" height="130" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="40" y="286" font-size="15" fill="' + color + '">' + headline + '</text>' +
    '<text x="40" y="316" font-size="14" fill="var(--muted)">' + line1 + '</text>' +
    '<text x="40" y="344" font-size="14" fill="var(--muted)">' + line2 + '</text>';
}

function cacheFrame(inner) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    CACHE_HEAD + inner + '</svg>';
}

// ------------------------------------------------- lesson 1 player builders

function loopFrame(soFar, cands, status, statusColor) {
  return svgFrame(
    fHead('One forward pass = one new token') +
    '<rect x="20" y="42" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    fText(320, 71, soFar, 15, 'var(--text)', 'middle') +
    fArrowD(320, 92, 26, 'var(--accent)') +
    fBox(240, 122, 160, 40, 'model', '', 'var(--accent)') +
    fArrowD(320, 166, 22, 'var(--accent)') +
    cands +
    fPanel(status, 'The text below the model is the ONLY memory it has.', 'Nothing else carries over between passes.', statusColor)
  );
}

export default {
  id: 'llm-fundamentals',
  order: 1,
  icon: '🧠',
  title: {
    pl: 'Fundamenty LLM',
    en: 'LLM Fundamentals'
  },
  description: {
    pl: 'Jak naprawde dziala model jezykowy: przewidywanie tokenow, tokenizacja, okno kontekstu, embeddingi, parametry losowosci oraz koszt, latencja i cache.',
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
      minutes: 12,
      terms: [
        {
          term: { pl: 'przewidywanie nastepnego tokena', en: 'next-token prediction' },
          def: {
            pl: 'Jedyna operacja modelu: dla calego dotychczasowego tekstu policz rozklad prawdopodobienstwa nastepnego tokena i wylosuj jeden. Cala reszta - chat, kod, tool calling - jest zbudowana na tej jednej petli.',
            en: 'The only thing the model does: given all the text so far, compute a probability distribution over the next token and sample one. Chat, code and tool calling are all built on that single loop.'
          }
        },
        {
          term: { pl: 'autoregresja', en: 'autoregression' },
          def: {
            pl: 'Kazdy wygenerowany token wraca na wejscie i staje sie czescia kontekstu dla kolejnego kroku. Dlatego wyjscie powstaje sekwencyjnie i nie da sie go zrownoleglic w obrebie jednej odpowiedzi.',
            en: 'Every generated token is appended to the input and becomes context for the next step. That is why output is produced sequentially and cannot be parallelised within one response.'
          }
        },
        {
          term: { pl: 'trening vs inferencja', en: 'training vs inference' },
          def: {
            pl: 'Trening to jednorazowe (bardzo drogie) ustalenie wag. Inferencja to kazde wywolanie API na zamrozonych wagach - model niczego sie wtedy nie uczy i nic nie pamieta miedzy requestami.',
            en: 'Training sets the weights once, at huge cost. Inference is every API call against those frozen weights - the model learns nothing then and remembers nothing between requests.'
          }
        },
        {
          term: { pl: 'halucynacja', en: 'hallucination' },
          def: {
            pl: 'Pewnie brzmiaca odpowiedz, ktora nie ma pokrycia w faktach. Nie jest bugiem do zalatania, tylko skutkiem tego, ze model zawsze losuje prawdopodobny ciag dalszy - leczy sie ja groundingiem i weryfikacja, nie promptem <em>badz dokladny</em>.',
            en: 'A confident answer with no factual backing. Not a bug to patch but a consequence of always sampling a plausible continuation - you treat it with grounding and verification, not with a <em>be accurate</em> prompt.'
          }
        },
        {
          term: { pl: 'logity', en: 'logits' },
          def: {
            pl: 'Surowe wyniki modelu dla kazdego tokena ze slownika, przed zamiana na prawdopodobienstwa przez <code>softmax</code>. Na nich dzialaja temperature, <code>top_p</code> i <code>top_k</code>.',
            en: 'The raw per-token scores over the whole vocabulary, before <code>softmax</code> turns them into probabilities. Temperature, <code>top_p</code> and <code>top_k</code> all operate on them.'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Petla autoregresji krok po kroku: ten sam model, coraz dluzszy tekst, jeden nowy token na przebieg.',
            en: 'The autoregressive loop step by step: same model, longer text each time, one new token per pass.'
          },
          frames: [
            {
              svg: loopFrame(
                'The cat sat on the',
                fBar(196, 'mat', 240, 'var(--accent2)', '0.61') +
                fBar(222, 'floor', 76, 'var(--accent2)', '0.19') +
                fBar(248, 'roof', 26, 'var(--accent2)', '0.06'),
                'Pass 1: score every token in the vocabulary',
                'var(--accent)'
              ),
              label: { pl: '1. Rozklad', en: '1. The distribution' },
              note: {
                pl: 'Model dostaje caly tekst i zwraca liczbe dla kazdego z okolo 200 tysiecy tokenow slownika. Tu widac tylko trzy najwyzsze.',
                en: 'The model reads the whole text and returns a score for each of roughly 200k vocabulary tokens. Only the top three are shown.'
              }
            },
            {
              svg: loopFrame(
                'The cat sat on the',
                fBar(196, 'mat', 240, 'var(--ok)', 'picked') +
                fBar(222, 'floor', 76, 'var(--accent2)', '0.19') +
                fBar(248, 'roof', 26, 'var(--accent2)', '0.06'),
                'Pass 1: one token is sampled, not looked up',
                'var(--ok)'
              ),
              label: { pl: '2. Losowanie', en: '2. Sampling' },
              note: {
                pl: 'Jeden token zostaje wybrany losowaniem wazonym prawdopodobienstwem. Przy temperature 0 zawsze wygrywa faworyt, wyzej czasem wchodzi drugi z listy.',
                en: 'One token is drawn, weighted by probability. At temperature 0 the favourite always wins; higher up, the runner-up sometimes gets in.'
              }
            },
            {
              svg: loopFrame(
                'The cat sat on the mat',
                fBar(196, 'and', 150, 'var(--accent2)', '0.34') +
                fBar(222, 'period', 130, 'var(--accent2)', '0.29') +
                fBar(248, 'while', 60, 'var(--accent2)', '0.11'),
                'Pass 2: the new token is now part of the input',
                'var(--accent)'
              ),
              label: { pl: '3. Doklejenie', en: '3. Append' },
              note: {
                pl: 'Wybrany token wraca na wejscie i model liczy wszystko od nowa. To jest autoregresja: wyjscie z kroku N jest wejsciem kroku N plus 1.',
                en: 'The chosen token goes back into the input and the model recomputes everything. That is autoregression: the output of step N is the input of step N plus 1.'
              }
            },
            {
              svg: loopFrame(
                'The cat sat on the mat and purred.',
                fBar(196, 'stop token', 250, 'var(--ok)', '0.72') +
                fBar(222, 'It', 44, 'var(--accent2)', '0.09') +
                fBar(248, 'Then', 30, 'var(--accent2)', '0.07'),
                'Pass 9: the stop token wins, generation ends',
                'var(--ok)'
              ),
              label: { pl: '4. Stop', en: '4. Stop' },
              note: {
                pl: 'Model nie wie z gory, jak dluga bedzie odpowiedz. Konczy, gdy wylosuje specjalny token konca albo gdy trafi w twoj limit max_tokens.',
                en: 'The model does not know the answer length up front. It ends when it samples the special stop token, or when it hits your max_tokens limit.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Dlaczego API jest bezstanowe: druga tura rozmowy to nie sesja na serwerze, tylko dluzszy prompt wyslany od nowa.',
            en: 'Why the API is stateless: turn two is not a server session, it is a longer prompt sent from scratch.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Turn 1 - what actually goes over the wire') +
                fBox(20, 50, 280, 120, 'your app', 'holds the array of messages', 'var(--accent)') +
                fArrowR(310, 110, 60, 'var(--accent)') +
                fBox(380, 50, 240, 120, 'model', 'no session, no storage', 'var(--border)') +
                fText(30, 200, 'sent: system + user question 1', 14, 'var(--muted)') +
                fText(30, 226, 'billed input: 900 tokens', 14, 'var(--muted)') +
                fPanel('One request, one complete payload', 'The server does not remember you between calls, like a plain REST endpoint.', 'Any continuity you feel is code you wrote.', 'var(--accent)')
              ),
              label: { pl: '1. Pierwsza tura', en: '1. First turn' },
              note: {
                pl: 'Wysylasz system prompt i pytanie. Serwer nic po sobie nie zostawia - dokladnie jak bezstanowy endpoint HTTP bez sesji.',
                en: 'You send the system prompt and the question. The server keeps nothing afterwards - exactly like a stateless HTTP endpoint with no session.'
              }
            },
            {
              svg: svgFrame(
                fHead('Turn 2 - the history is resent, not remembered') +
                fBox(20, 50, 280, 120, 'your app', 'appends answer 1 + question 2', 'var(--accent)') +
                fArrowR(310, 110, 60, 'var(--accent)') +
                fBox(380, 50, 240, 120, 'model', 'still no memory', 'var(--border)') +
                fText(30, 200, 'sent: system + Q1 + A1 + Q2', 14, 'var(--muted)') +
                fText(30, 226, 'billed input: 2100 tokens', 14, 'var(--warn)') +
                fPanel('The same call, only longer', 'Every turn re-sends everything that came before it.', 'This is why a long chat gets slower and more expensive.', 'var(--warn)')
              ),
              label: { pl: '2. Druga tura', en: '2. Second turn' },
              note: {
                pl: 'Historia rozmowy to po prostu dluzsze wejscie. Nie ma sesji do odpytania, jest tylko tablica wiadomosci, ktora ty trzymasz.',
                en: 'Conversation history is simply a longer input. There is no session to query, only an array of messages that you keep.'
              }
            },
            {
              svg: svgFrame(
                fHead('Turn 12 - the bill curve nobody plans for') +
                fBar(60, 'turn 1', 60, 'var(--ok)', '0.9k tokens') +
                fBar(96, 'turn 4', 160, 'var(--accent2)', '5.2k tokens') +
                fBar(132, 'turn 8', 280, 'var(--warn)', '11k tokens') +
                fBar(168, 'turn 12', 380, 'var(--err)', '19k tokens') +
                fText(28, 232, 'Same question length every time - the input keeps growing.', 14, 'var(--muted)') +
                fPanel('Cost grows with the square of the conversation', 'Turn N re-sends turns 1..N-1, so total spend rises quadratically.', 'Fixes: summarise old turns, or drop them and keep a state block.', 'var(--err)')
              ),
              label: { pl: '3. Rachunek rosnie', en: '3. The bill grows' },
              note: {
                pl: 'Kazda tura placi za cala poprzednia historie. Dlatego dlugie rozmowy kompaktuje sie streszczeniem, zamiast przesylac wszystko w nieskonczonosc.',
                en: 'Every turn pays for the whole history again. That is why long conversations get compacted into a summary instead of resent forever.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Skad biora sie halucynacje: model nie ma stanu "nie wiem", wiec dla pytania bez pokrycia i tak zwraca pewnie wygladajacy rozklad.',
            en: 'Where hallucinations come from: with no "I do not know" state, a question with no support still gets a confident-looking distribution.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Question the model has seen thousands of times') +
                fText(28, 60, 'What is the capital of France?', 15, 'var(--text)') +
                fBar(90, 'Paris', 330, 'var(--ok)', '0.97') +
                fBar(126, 'Lyon', 20, 'var(--accent2)', '0.01') +
                fBar(162, 'Marseille', 14, 'var(--accent2)', '0.01') +
                fText(28, 226, 'A sharp distribution: the training data agrees with itself.', 14, 'var(--muted)') +
                fPanel('Well-supported question', 'One token towers over the rest, so any sampling setting picks it.', 'This shape is what "the model knows it" actually looks like.', 'var(--ok)')
              ),
              label: { pl: '1. Pytanie z pokryciem', en: '1. A supported question' },
              note: {
                pl: 'Gdy dane treningowe sa zgodne, rozklad jest ostry jak igla. Model nie "sprawdza" odpowiedzi - po prostu jeden token ma ogromna przewage.',
                en: 'When the training data agrees, the distribution is needle-sharp. The model does not verify anything - one token simply dominates.'
              }
            },
            {
              svg: svgFrame(
                fHead('Question about something it never saw') +
                fText(28, 60, 'What is the invoice number of order 88231?', 15, 'var(--text)') +
                fBar(90, 'INV-2024', 90, 'var(--warn)', '0.06') +
                fBar(126, 'FV/88231', 78, 'var(--warn)', '0.05') +
                fBar(162, 'INV-88231', 70, 'var(--warn)', '0.05') +
                fText(28, 226, 'A flat distribution - and still no option called I DO NOT KNOW.', 14, 'var(--err)') +
                fPanel('Unsupported question, same machinery', 'The model must return some distribution, so it returns a flat one.', 'Sampling then picks a plausible-looking string with zero backing.', 'var(--err)')
              ),
              label: { pl: '2. Pytanie bez pokrycia', en: '2. An unsupported question' },
              note: {
                pl: 'Rozklad robi sie plaski, ale nadal nie ma w nim opcji "nie wiem". Cokolwiek zostanie wylosowane, brzmi rownie pewnie jak Paryz.',
                en: 'The distribution goes flat, but there is still no "I do not know" option in it. Whatever gets sampled sounds as confident as Paris.'
              }
            },
            {
              svg: svgFrame(
                fHead('Same question, with the fact placed in the prompt') +
                fText(28, 60, 'CONTEXT: order 88231 -> invoice FV/2026/0412', 14, 'var(--accent2)') +
                fText(28, 84, 'What is the invoice number of order 88231?', 15, 'var(--text)') +
                fBar(110, 'FV/2026/0412', 320, 'var(--ok)', '0.95') +
                fBar(146, 'FV/88231', 18, 'var(--accent2)', '0.01') +
                fBar(182, 'not found', 16, 'var(--accent2)', '0.01') +
                fText(28, 240, 'Grounding turns a guess back into a lookup.', 14, 'var(--muted)') +
                fPanel('The only reliable fix is context, not tone', 'Telling the model to "be accurate" does not change the distribution.', 'Injected facts, tools and citations do - that is what RAG buys you.', 'var(--ok)')
              ),
              label: { pl: '3. Grounding', en: '3. Grounding' },
              note: {
                pl: 'Wstrzykniecie faktu do promptu przywraca ostry rozklad. Dlatego na halucynacje dziala grounding i weryfikacja narzedziem, a nie proszenie modelu o dokladnosc.',
                en: 'Injecting the fact into the prompt restores a sharp distribution. That is why grounding and tool verification beat asking the model to be accurate.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie autouzupelnianie z klawiatury telefonu, tylko takie, ktore przeczytalo pol internetu. Piszesz poczatek zdania, a ono podpowiada, co pasuje dalej. Model jezykowy robi doslownie to samo, tylko nieprzyzwoicie lepiej.</p>' +
            '<p>Model nigdy nie <em>pamieta</em> rozmowy tak, jak pamieta ja czlowiek. Za kazdym razem dostaje caly tekst od poczatku i odpowiada na jedno jedyne pytanie: <strong>jaki kawalek slowa pasuje teraz najlepiej?</strong> Wybiera jeden, dokleja go do konca i pyta znowu. I znowu. Kilkaset razy pod rzad, az uzna, ze to juz koniec zdania, akapitu i tematu.</p>' +
            '<p>Dlatego potrafi napisac cos, co brzmi madrze, a jest zmyslone. On nie sprawdza, czy zdanie jest prawdziwe. Sprawdza, czy <em>brzmi jak dobra kontynuacja</em>. To troche jak kolega, ktory zawsze ma odpowiedz, bo nie znosi ciszy przy stole. Czesto trafia, bo duzo przeczytal. Czasem strzela z fasonem, bo strzelanie z fasonem to caly jego zawod.</p>' +
            '<p>I jeszcze jedna rzecz, ktora oszczedza pozniej duzo nerwow: on nie uczy sie od ciebie w trakcie rozmowy. Jesli cos ma wiedziec, musisz mu to napisac w tej wiadomosci. Jutro nie bedzie pamietal ani ciebie, ani wczorajszych ustalen.</p>',
          en: '<p>Picture the autocomplete on your phone keyboard, except this one has read half the internet. You type the start of a sentence and it suggests what comes next. A language model does literally that, just indecently better.</p>' +
            '<p>The model never <em>remembers</em> your chat the way a person does. Every single time it gets the whole text from the beginning and answers one question: <strong>which chunk of a word fits best right now?</strong> It picks one, glues it onto the end, and asks again. And again. A few hundred times in a row, until it decides that is the end of the sentence, the paragraph and the topic.</p>' +
            '<p>That is why it can write something that sounds smart and is invented. It is not checking whether the sentence is true. It is checking whether it <em>sounds like a good continuation</em>. A bit like the friend who always has an answer because he cannot stand silence at the table. He is right a lot, because he has read a lot. Sometimes he guesses with great style, because guessing with style is the entire job.</p>' +
            '<p>One more thing that saves a lot of frustration later: it does not learn from you mid-conversation. If it needs to know something, you have to write it in this message. Tomorrow it will remember neither you nor what you agreed yesterday.</p>'
        },
        school: {
          pl: '<p>Model jezykowy to funkcja. Na wejsciu dostaje ciag <strong>tokenow</strong> (token to kawalek tekstu, zwykle fragment slowa), a na wyjsciu zwraca rozklad prawdopodobienstwa nad wszystkimi tokenami w swoim <strong>slowniku</strong> (liscie wszystkich znanych mu kawalkow, zwykle 50-200 tysiecy pozycji). Jeden <strong>przebieg</strong> sieci, czyli jedno przeliczenie calego wejscia, daje dokladnie jeden nowy token.</p>' +
            '<p>Zeby powstal akapit, ten przebieg powtarza sie kilkaset razy, za kazdym razem z tekstem wydluzonym o poprzedni token. To sie nazywa <strong>autoregresja</strong> (wyjscie kroku N staje sie wejsciem kroku N plus 1).</p>' +
            '<h4>Worked example: policzmy jeden akapit</h4>' +
            '<p>Piszesz prompt o dlugosci 900 tokenow i prosisz o odpowiedz dlugosci 300 tokenow. Model wykonuje 300 przebiegow. W kazdym z nich widzi wejscie o dlugosci 900, 901, 902... az do 1199 tokenow. Nie ma tu zadnego skrotu: 300 tokenow odpowiedzi to 300 osobnych decyzji, a kazda z nich zna caly wczesniejszy tekst. Dlatego odpowiedzi nie da sie wygenerowac rownolegle, a czas rosnie liniowo z jej dlugoscia.</p>' +
            '<h4>Trening kontra inferencja</h4>' +
            '<p><strong>Trening</strong> to jednorazowy, potwornie drogi proces (miesiace pracy dziesiatek tysiecy kart graficznych), w ktorym <strong>wagi</strong> modelu - miliardy liczb opisujacych siec - sa dostrajane tak, by przewidywanie nastepnego tokena bylo jak najtrafniejsze. <strong>Inferencja</strong> to kazde twoje wywolanie API: wagi sa zamrozone i nic sie w nich nie zmienia. Model nie uczy sie z twojego promptu i nie zapamietuje niczego miedzy requestami.</p>' +
            '<p>W kodzie cala petla wyglada zenujaco prosto:</p>' +
            '<pre><code>tokens = encode(prompt)\nwhile not done:\n    probs = model(tokens)   // rozklad nad slownikiem\n    next  = sample(probs)   // losowanie jednego tokena\n    tokens.append(next)</code></pre>' +
            '<h4>Skad on to niby wie</h4>' +
            '<p>Wiedza siedzi w wagach jako statystyczne wzorce z danych treningowych, a nie jako tabela faktow z indeksem. Nie ma wiersza, ktory dalo by sie sprawdzic. Dlatego <strong>halucynacja</strong> (pewnie brzmiaca, ale zmyslona odpowiedz) nie jest bugiem do zalatania - to ten sam mechanizm, ktory daje kreatywnosc, uzyty tam, gdzie model nie ma pokrycia w danych. Model zawsze zwroci jakis rozklad, nawet gdy nie wie nic sensownego; nie ma w nim wbudowanej opcji "nie wiem".</p>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Model to bezstanowa funkcja, ktora w jednym przebiegu wybiera jeden token i nic nie pamieta miedzy wywolaniami. Historie rozmowy trzymasz i wysylasz ty, nie serwer. A jesli odpowiedz ma byc oparta na faktach, fakty musisz wlozyc do promptu albo dac modelowi narzedzie, ktore je sprawdzi.</p>',
          en: '<p>A language model is a function. It takes a sequence of <strong>tokens</strong> (a token is a chunk of text, usually a piece of a word) and returns a probability distribution over every token in its <strong>vocabulary</strong> (the list of all chunks it knows, typically 50,000 to 200,000 entries). One <strong>forward pass</strong> - one full computation over the input - produces exactly one new token.</p>' +
            '<p>To get a paragraph, that pass repeats a few hundred times, each time with the text extended by the previous token. This is called <strong>autoregression</strong> (the output of step N becomes the input of step N plus 1).</p>' +
            '<h4>Worked example: one paragraph, counted</h4>' +
            '<p>You send a 900-token prompt and ask for a 300-token answer. The model runs 300 passes. In each one it sees an input of 900, 901, 902... up to 1199 tokens. There is no shortcut: 300 output tokens are 300 separate decisions, and each one knows all the text before it. That is why an answer cannot be generated in parallel and why time scales linearly with its length.</p>' +
            '<h4>Training versus inference</h4>' +
            '<p><strong>Training</strong> is a one-off, brutally expensive process (months of work by tens of thousands of graphics cards) that tunes the model <strong>weights</strong> - the billions of numbers describing the network - so next-token prediction gets as accurate as possible. <strong>Inference</strong> is every API call you make: the weights are frozen and nothing about them changes. The model does not learn from your prompt and stores nothing between requests.</p>' +
            '<p>In code the whole loop is embarrassingly simple:</p>' +
            '<pre><code>tokens = encode(prompt)\nwhile not done:\n    probs = model(tokens)   // distribution over the vocabulary\n    next  = sample(probs)   // draw one token\n    tokens.append(next)</code></pre>' +
            '<h4>Why it "knows" things</h4>' +
            '<p>Knowledge lives in the weights as statistical patterns from training data, not as a fact table with an index. There is no row you could go and verify. That is why a <strong>hallucination</strong> (a confident but invented answer) is not a bug waiting for a patch - it is the same machinery that gives you creativity, applied where the model has no real coverage. The model always returns some distribution, even when it knows nothing useful; there is no built-in "I do not know" option.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>The model is a stateless function that picks one token per pass and remembers nothing between calls. You hold and resend the conversation history, not the server. And if an answer must be grounded in facts, you have to put the facts in the prompt or give the model a tool that can look them up.</p>'
        },
        pro: {
          pl: '<p>Traktuj wywolanie modelu jak <strong>bezstanowa funkcje HTTP</strong>: <code>f(tokeny) -> logity</code>. <strong>Logity</strong> to surowe, nieznormalizowane wyniki dla kazdego tokena slownika; funkcja <code>softmax</code> zamienia je w prawdopodobienstwa sumujace sie do jedynki. Stan rozmowy jest po twojej stronie, nie po stronie modelu. To najwazniejszy model mentalny w calym module, bo prostuje polowe nieporozumien: model nie "zapamietal" poprzedniej wiadomosci - ty ja ponownie wyslales.</p>' +
            '<h4>Co dzieje sie w srodku wywolania</h4>' +
            '<ul>' +
            '<li><strong>Prefill</strong> - caly prompt idzie przez siec rownolegle, w jednym rzucie. Koszt rosnie z dlugoscia wejscia i to on dominuje <strong>TTFT</strong> (time to first token - czas od wyslania requestu do pierwszego tokena odpowiedzi).</li>' +
            '<li><strong>Decode</strong> - kolejne tokeny wyjscia powstaja sekwencyjnie, jeden na przebieg, przyspieszone przez <strong>KV cache</strong> (zapamietane w pamieci GPU posrednie wyniki uwagi dla juz przetworzonych tokenow, dzieki czemu nie liczy sie ich drugi raz). Stad asymetria cen: 10 tysiecy tokenow wejscia jest wyraznie tansze i szybsze niz 10 tysiecy tokenow wyjscia.</li>' +
            '</ul>' +
            '<p>Determinizm konczy sie na poziomie sprzetu. Rownolegla redukcja zmiennoprzecinkowa (sumowanie wielu liczb w nieustalonej kolejnosci na GPU) nie jest laczna, wiec ta sama prosba potrafi dac inny wynik nawet przy temperaturze 0, gdy dwa tokeny maja niemal identyczny wynik. Dlatego testy snapshotowe na dokladny string sa krucha strategia - asertujesz na schemacie i wlasnosciach, nie na bajtach.</p>' +
            '<h4>Halucynacje w produkcji</h4>' +
            '<p>Model nie ma skalibrowanego sygnalu "nie wiem". Trzy dzwignie, ktore realnie dzialaja:</p>' +
            '<ol>' +
            '<li><strong>Grounding</strong> (osadzenie odpowiedzi w dostarczonych danych) - wstrzykujesz kontekst i wymagasz cytowan z identyfikatorow, ktore sam podales; brak cytatu traktujesz jak blad walidacji, nie jak drobiazg.</li>' +
            '<li><strong>Structured output</strong> (wymuszona struktura odpowiedzi) - schemat opisany w <strong>zod</strong> (biblioteka walidacji typow w TypeScript) albo w JSON Schema zamienia wolna proze w kontrakt, ktory da sie zwalidowac i ponowic.</li>' +
            '<li><strong>Weryfikacja narzedziem</strong> - liczby liczy kod, nie model. Tak jak w React nie sumujesz koszyka w JSX, tylko w warstwie domenowej.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 1024,\n  system: "Answer only from CONTEXT. If missing, reply NOT_FOUND.",\n  messages: [{ role: "user", content: prompt }]\n});\n// res.usage.input_tokens / res.usage.output_tokens -> loguj oba</code></pre>' +
            '<p>Cenowo (stawki z 2026 roku dla klasy sredniej, np. Claude Sonnet): okolo 3 USD za milion tokenow wejscia i 15 USD za milion tokenow wyjscia. Klasa mala (Haiku, GPT-4o-mini, Gemini Flash) to rzad wielkosci taniej. Typowy TTFT dla promptu 2 tysiecy tokenow to 0,4-1,2 sekundy, a tempo generowania kilkadziesiat tokenow na sekunde - te dwie liczby wystarcza, zeby oszacowac latencje ekranu, zanim cokolwiek napiszesz.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Pytaja o to zwykle tak: dlaczego temperatura 0 nie daje pelnej powtarzalnosci, czym rozni sie prefill od decode i dlaczego <strong>fine-tuning</strong> (dotrenowanie modelu na wlasnych przykladach) uczy stylu oraz formatu, a nie swiezych faktow. Odpowiedz na ostatnie: gradient rozmywa wiedze po miliardach wag, wiec pojedynczy fakt widziany kilkanascie razy nie staje sie niezawodnym rekordem - do faktow uzywasz retrievalu, czyli dociagania danych do promptu.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Historia rozmowy to twoja struktura danych i twoj koszt - projektuj ja jak stan aplikacji, z jawna kompakcja, a nie jak nieskonczony log.</li>' +
            '<li>Kazdy fakt, ktory ma byc prawdziwy, musi wejsc do promptu albo przejsc przez narzedzie; instrukcja "nie zmyslaj" nie zmienia rozkladu.</li>' +
            '<li>Testy i alerty buduj na schemacie, wlasnosciach i metrykach zbiorczych, bo dokladny string nie jest kontraktem.</li>' +
            '</ul>',
          en: '<p>Treat a model call as a <strong>stateless HTTP function</strong>: <code>f(tokens) -&gt; logits</code>. <strong>Logits</strong> are the raw, unnormalized scores for every token in the vocabulary; the <code>softmax</code> function turns them into probabilities that sum to one. Conversation state lives on your side, not the model side. This is the single most important mental model in the module, because it kills half the confusion in the field: the model did not "remember" the previous message - you re-sent it.</p>' +
            '<h4>What happens inside a call</h4>' +
            '<ul>' +
            '<li><strong>Prefill</strong> - the whole prompt goes through the network in parallel, in one shot. Cost scales with input length and it dominates <strong>TTFT</strong> (time to first token - from sending the request to the first token of the answer).</li>' +
            '<li><strong>Decode</strong> - output tokens are produced sequentially, one per pass, accelerated by the <strong>KV cache</strong> (intermediate attention results for already-processed tokens, kept in GPU memory so they are not recomputed). Hence the price asymmetry: 10k input tokens are far cheaper and faster than 10k output tokens.</li>' +
            '</ul>' +
            '<p>Determinism breaks at the hardware level. Parallel floating-point reduction (summing many numbers in an unfixed order on a GPU) is not associative, so the same request can differ even at temperature 0 whenever two tokens score nearly the same. That is why exact-string snapshot tests are a fragile strategy - assert on schema and properties, not on bytes.</p>' +
            '<h4>Hallucinations in production</h4>' +
            '<p>The model has no calibrated "I do not know" signal. Three levers that actually work:</p>' +
            '<ol>' +
            '<li><strong>Grounding</strong> (anchoring the answer in supplied data) - inject the context and require citations to ids you provided yourself; a missing citation is a validation failure, not a detail.</li>' +
            '<li><strong>Structured output</strong> (an enforced response shape) - a schema written in <strong>zod</strong> (a TypeScript validation library) or JSON Schema turns free prose into a contract you can validate and retry.</li>' +
            '<li><strong>Tool verification</strong> - arithmetic is done by code, not by the model. Same as in React: you do not sum the cart in JSX, you do it in the domain layer.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 1024,\n  system: "Answer only from CONTEXT. If missing, reply NOT_FOUND.",\n  messages: [{ role: "user", content: prompt }]\n});\n// res.usage.input_tokens / res.usage.output_tokens -&gt; log both</code></pre>' +
            '<p>On price (2026 rates for a mid tier such as Claude Sonnet): about 3 USD per million input tokens and 15 USD per million output tokens. The small tier (Haiku, GPT-4o-mini, Gemini Flash) is an order of magnitude cheaper. A typical TTFT for a 2k-token prompt is 0.4-1.2 seconds, and generation runs at a few dozen tokens per second - those two numbers are enough to estimate screen latency before you write any code.</p>' +
            '<h4>In interviews</h4>' +
            '<p>The usual probes: why temperature 0 is not fully reproducible, how prefill differs from decode, and why <strong>fine-tuning</strong> (further training on your own examples) teaches style and format rather than fresh facts. The answer to the last one: gradients smear knowledge across billions of weights, so a fact seen a handful of times never becomes a reliable record - for facts you use retrieval, that is pulling data into the prompt.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Conversation history is your data structure and your cost - design it like application state with explicit compaction, not like an endless log.</li>' +
            '<li>Any fact that must be true has to enter through the prompt or through a tool; an instruction not to make things up does not change the distribution.</li>' +
            '<li>Build tests and alerts on schema, properties and aggregate metrics, because an exact string is not a contract.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Model pisze odpowiedz. Jak powstaje ta odpowiedz?',
            en: 'The model writes an answer. How does that answer come into being?'
          },
          options: [
            { pl: 'Cala naraz, jako gotowy blok tekstu', en: 'All at once, as one finished block of text' },
            { pl: 'Kawalek po kawalku: model za kazdym razem wybiera nastepny fragment i dokleja go do tekstu', en: 'Chunk by chunk: each time the model picks the next fragment and glues it onto the text' },
            { pl: 'Model wyszukuje gotowa odpowiedz w swojej bazie danych', en: 'The model looks the answer up in its database' },
            { pl: 'Model tlumaczy pytanie na kod SQL i wykonuje zapytanie', en: 'The model translates the question into SQL and runs a query' }
          ],
          correct: 1,
          explain: {
            pl: 'To jest ta petla autouzupelniania: jeden kawalek slowa, doklejenie, i wszystko od nowa. Dlatego dluga odpowiedz trwa dluzej niz krotka.',
            en: 'That is the autocomplete loop: one chunk of a word, glue it on, start over. Which is why a long answer takes longer than a short one.'
          }
        },
        {
          q: {
            pl: 'Co model wylicza w jednym przebiegu sieci?',
            en: 'What does the model compute in a single forward pass?'
          },
          options: [
            { pl: 'Skrot (hash) promptu uzywany jako klucz cache', en: 'A hash of the prompt used as a cache key' },
            { pl: 'Cala odpowiedz naraz', en: 'The entire answer at once' },
            { pl: 'Rozklad prawdopodobienstwa nad nastepnym tokenem', en: 'A probability distribution over the next token' },
            { pl: 'Zapytanie do bazy wiedzy', en: 'A query against a knowledge base' }
          ],
          correct: 2,
          explain: {
            pl: 'Jeden przebieg daje jeden rozklad nad calym slownikiem, z ktorego losowany jest jeden token. Odpowiedz na 300 tokenow to 300 takich przebiegow.',
            en: 'One pass yields one distribution over the whole vocabulary, from which one token is sampled. A 300-token answer is 300 such passes.'
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
            pl: 'Dwa uruchomienia tego samego promptu z ustawieniem temperature 0 (czyli "zawsze wybieraj token o najwyzszym wyniku") daja lekko rozne odpowiedzi. Ktore wyjasnienie jest najbardziej prawdopodobne?',
            en: 'Two runs of the same prompt with temperature 0 (meaning "always take the highest-scoring token") give slightly different answers. Which explanation is most likely?'
          },
          options: [
            { pl: 'Model dotrenowal sie na twoim poprzednim zapytaniu', en: 'The model fine-tuned itself on your previous request' },
            { pl: 'Sumowanie liczb zmiennoprzecinkowych na GPU odbywa sie w zmiennej kolejnosci, wiec dwa niemal rowne wyniki moga sie zamienic miejscami', en: 'Floating-point sums on the GPU happen in a varying order, so two nearly equal scores can swap places' },
            { pl: 'Temperature 0 oznacza losowanie z calego slownika', en: 'Temperature 0 means sampling from the entire vocabulary' },
            { pl: 'Cache promptu zwrocil starsza zapisana odpowiedz', en: 'The prompt cache returned an older stored answer' }
          ],
          correct: 1,
          explain: {
            pl: 'Temperature 0 usuwa losowosc samplingu, ale nie niedeterminizm arytmetyki na GPU. Jeden zamieniony token na starcie rozjezdza cala dalsza generacje - dlatego testuj schemat i wlasnosci, nie dokladny string.',
            en: 'Temperature 0 removes sampling randomness but not GPU arithmetic non-determinism. One flipped token early derails the whole continuation - so test schema and properties, not the exact string.'
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
      minutes: 12,
      terms: [
        {
          term: { pl: 'token', en: 'token' },
          def: {
            pl: 'Najmniejsza jednostka, jaka widzi model - zwykle kawalek slowa, nie litera i nie slowo. Rozliczenie i limity API sa liczone w tokenach, w angielskim to srednio okolo 4 znaki na token.',
            en: 'The smallest unit the model sees - usually a piece of a word, not a letter and not a word. Billing and API limits are counted in tokens; in English roughly 4 characters per token.'
          }
        },
        {
          term: { pl: 'BPE', en: 'BPE (Byte Pair Encoding)' },
          def: {
            pl: 'Algorytm budowy slownika tokenow: startuje od bajtow i iteracyjnie skleja najczestsze pary w wieksze jednostki. Dlatego czeste slowa sa jednym tokenem, a rzadkie rozpadaja sie na kilka.',
            en: 'The algorithm that builds the token vocabulary: it starts from bytes and repeatedly merges the most frequent pair into a larger unit. Common words end up as one token, rare ones split into several.'
          }
        },
        {
          term: { pl: 'tokenizer', en: 'tokenizer' },
          def: {
            pl: 'Deterministyczna funkcja tekst -> lista id tokenow, powiazana z konkretnym modelem. Liczby tokenow nie przenosza sie miedzy dostawcami - policzone <code>tiktoken</code> nie sa liczbami Claude.',
            en: 'The deterministic text -> list of token ids function tied to one specific model. Token counts are not portable between providers - what <code>tiktoken</code> reports is not what Claude charges.'
          }
        },
        {
          term: { pl: 'inflacja tokenow', en: 'token inflation' },
          def: {
            pl: 'Ten sam tekst po polsku, w JSON-ie z wcieciami albo w base64 zajmuje znaczaco wiecej tokenow niz zwykla angielska proza. To bezposrednio koszt i zjedzone okno kontekstu.',
            en: 'The same content in Polish, in pretty-printed JSON or in base64 costs far more tokens than plain English prose. That is money and context window burned directly.'
          }
        },
        {
          term: { pl: 'problem strawberry', en: 'the strawberry problem' },
          def: {
            pl: 'Model nie umie policzyc liter w slowie, bo nigdy nie widzi liter - widzi tokeny. Ten sam mechanizm psuje odwracanie stringow, rymy i liczenie znakow: takie zadania oddaje sie narzedziu.',
            en: 'The model cannot count letters in a word because it never sees letters, only tokens. The same mechanism breaks string reversal, rhyming and character counting - hand those to a tool.'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Trening tokenizera na jednym slowie: BPE laczy najczestsza pare symboli, zapisuje regule i powtarza, az slowo lowest zostaje dwoma tokenami.',
            en: 'Training the tokenizer on one word: BPE merges the most frequent pair, records the rule and repeats, until lowest is just two tokens.'
          },
          frames: [
            {
              svg: bpeFrame(
                bpeCell(85, 70, 'l', 'var(--border)') +
                bpeCell(165, 70, 'o', 'var(--border)') +
                bpeCell(245, 70, 'w', 'var(--border)') +
                bpeCell(325, 70, 'e', 'var(--border)') +
                bpeCell(405, 70, 's', 'var(--border)') +
                bpeCell(485, 70, 't', 'var(--border)') +
                bpeStep('start: one symbol per character', 'var(--muted)'),
                '6 symbols, 6 tokens - the most expensive possible split',
                'var(--warn)'
              ),
              label: { pl: '1. Same litery', en: '1. Bare characters' },
              note: {
                pl: 'BPE zaczyna od alfabetu: kazdy znak to osobny symbol. Na tym etapie slowo lowest kosztuje szesc tokenow.',
                en: 'BPE starts from the alphabet: every character is its own symbol. At this point the word lowest costs six tokens.'
              }
            },
            {
              svg: bpeFrame(
                bpeCell(85, 70, 'l', 'var(--border)') +
                bpeCell(165, 70, 'o', 'var(--border)') +
                bpeCell(245, 70, 'w', 'var(--border)') +
                bpeCell(325, 70, 'e', 'var(--accent)') +
                bpeCell(405, 70, 's', 'var(--accent)') +
                bpeCell(485, 70, 't', 'var(--border)') +
                bpePair(325, 475) +
                bpeStep('most frequent pair in the corpus: e + s', 'var(--accent)'),
                'merge rule 1 recorded: e + s = es',
                'var(--accent)'
              ),
              label: { pl: '2. Najczestsza para', en: '2. The most frequent pair' },
              note: {
                pl: 'Algorytm liczy wystapienia wszystkich sasiednich par w calym korpusie i wybiera zwyciezce. Tu wygrywa e + s.',
                en: 'The algorithm counts every adjacent pair across the whole corpus and picks the winner. Here e + s wins.'
              }
            },
            {
              svg: bpeFrame(
                bpeCell(115, 70, 'l', 'var(--border)') +
                bpeCell(195, 70, 'o', 'var(--border)') +
                bpeCell(275, 70, 'w', 'var(--border)') +
                bpeCell(355, 90, 'es', 'var(--ok)') +
                bpeCell(455, 70, 't', 'var(--accent)') +
                bpePair(355, 525) +
                bpeStep('next pair: es + t', 'var(--accent)'),
                '5 symbols - merge rule 2: es + t = est',
                'var(--accent)'
              ),
              label: { pl: '3. Sklejka rosnie', en: '3. The merge grows' },
              note: {
                pl: 'Nowy symbol es wchodzi do slownika i od razu bierze udzial w kolejnym liczeniu par. Koncowka est jest czesta w angielskim.',
                en: 'The new symbol es joins the vocabulary and immediately competes in the next round of counting. The ending est is common in English.'
              }
            },
            {
              svg: bpeFrame(
                bpeCell(145, 70, 'l', 'var(--accent)') +
                bpeCell(225, 70, 'o', 'var(--accent)') +
                bpeCell(305, 70, 'w', 'var(--border)') +
                bpeCell(385, 110, 'est', 'var(--ok)') +
                bpePair(145, 295) +
                bpeStep('next pair: l + o', 'var(--accent)'),
                '4 symbols - merge rule 3: l + o = lo',
                'var(--accent)'
              ),
              label: { pl: '4. Poczatek slowa', en: '4. The head of the word' },
              note: {
                pl: 'Ten sam mechanizm dziala od lewej strony slowa. Kazda regula jest numerowana, wiec kolejnosc laczenia jest zawsze taka sama.',
                en: 'The same mechanism works on the head of the word. Every rule is numbered, so the merge order is always identical.'
              }
            },
            {
              svg: bpeFrame(
                bpeCell(175, 90, 'lo', 'var(--ok)') +
                bpeCell(275, 70, 'w', 'var(--accent)') +
                bpeCell(355, 110, 'est', 'var(--ok)') +
                bpePair(175, 345) +
                bpeStep('next pair: lo + w', 'var(--accent)'),
                '3 symbols - merge rule 4: lo + w = low',
                'var(--accent)'
              ),
              label: { pl: '5. Przedostatnia regula', en: '5. One rule to go' },
              note: {
                pl: 'Slowo low wystepuje w korpusie samodzielnie tysiace razy, wiec oplaca sie miec dla niego jeden symbol.',
                en: 'The word low appears thousands of times on its own, so it earns a symbol of its own.'
              }
            },
            {
              svg: bpeFrame(
                bpeCell(200, 120, 'low', 'var(--ok)') +
                bpeCell(330, 110, 'est', 'var(--ok)') +
                bpeStep('no rule matches any remaining pair', 'var(--ok)'),
                '2 tokens - this is what the model actually sees',
                'var(--ok)'
              ),
              label: { pl: '6. Gotowe tokeny', en: '6. Final tokens' },
              note: {
                pl: 'Model dostaje dwa identyfikatory, nie szesc liter. Dlatego pytanie o liczbe liter r w slowie jest dla niego zagadka, a nie odczytem.',
                en: 'The model receives two ids, not six letters. That is why counting the letter r in a word is a puzzle for it, not a lookup.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Problem strawberry rozlozony na czynniki: co widzisz ty, co widzi model i dlaczego liczenie liter jest dla niego zgadywanka.',
            en: 'The strawberry problem, taken apart: what you see, what the model sees, and why counting letters is guesswork for it.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('What a human sees') +
                fChip(40, 60, 50, 's', 'var(--surface)', 'var(--border)') +
                fChip(96, 60, 50, 't', 'var(--surface)', 'var(--border)') +
                fChip(152, 60, 50, 'r', 'var(--ok)', 'var(--ok)') +
                fChip(208, 60, 50, 'a', 'var(--surface)', 'var(--border)') +
                fChip(264, 60, 50, 'w', 'var(--surface)', 'var(--border)') +
                fChip(320, 60, 50, 'b', 'var(--surface)', 'var(--border)') +
                fChip(376, 60, 50, 'e', 'var(--surface)', 'var(--border)') +
                fChip(432, 60, 50, 'r', 'var(--ok)', 'var(--ok)') +
                fChip(488, 60, 50, 'r', 'var(--ok)', 'var(--ok)') +
                fChip(544, 60, 50, 'y', 'var(--surface)', 'var(--border)') +
                fText(40, 150, 'Ten separate characters, three of them are r.', 15, 'var(--text)') +
                fText(40, 182, 'Counting is a loop over an array - trivially exact.', 14, 'var(--muted)') +
                fPanel('You operate on characters', 'In JavaScript this is one line: [...word].filter(c => c === "r").length', 'The data structure literally contains the letters.', 'var(--ok)')
              ),
              label: { pl: '1. Twoje dane', en: '1. Your data' },
              note: {
                pl: 'Dla ciebie slowo to tablica znakow, wiec liczenie liter jest dokladne i darmowe. To jest punkt odniesienia dla nastepnej klatki.',
                en: 'For you the word is an array of characters, so counting letters is exact and free. That is the baseline for the next frame.'
              }
            },
            {
              svg: svgFrame(
                fHead('What the model receives') +
                fChip(60, 60, 140, 'str', 'var(--surface)', 'var(--accent)') +
                fChip(212, 60, 140, 'aw', 'var(--surface)', 'var(--accent)') +
                fChip(364, 60, 160, 'berry', 'var(--surface)', 'var(--accent)') +
                fText(60, 128, 'id 496', 13, 'var(--muted)') +
                fText(212, 128, 'id 675', 13, 'var(--muted)') +
                fText(364, 128, 'id 15717', 13, 'var(--muted)') +
                fText(40, 172, 'Three integers. No character array anywhere.', 15, 'var(--err)') +
                fText(40, 202, 'The spelling of token 15717 is not part of the input.', 14, 'var(--muted)') +
                fPanel('The model operates on ids', 'It has to infer spelling from patterns it saw during training.', 'That inference is good, but it is inference - not a read.', 'var(--err)')
              ),
              label: { pl: '2. Dane modelu', en: '2. The model data' },
              note: {
                pl: 'Model dostaje trzy liczby. Pisownia tokena nie jest czescia wejscia - musi zostac odtworzona z pamieci wzorcow, a nie odczytana.',
                en: 'The model gets three integers. The spelling of a token is not part of the input - it has to be reconstructed from remembered patterns, not read.'
              }
            },
            {
              svg: svgFrame(
                fHead('Two ways to answer "how many r"') +
                fBox(20, 50, 290, 110, 'ask the model', 'guess from token patterns', 'var(--err)') +
                fText(40, 132, 'answer: 2 (wrong, and confident)', 13, 'var(--err)') +
                fBox(330, 50, 290, 110, 'ask a tool', 'model calls count(word, "r")', 'var(--ok)') +
                fText(350, 132, 'answer: 3 (always)', 13, 'var(--ok)') +
                fText(40, 196, 'Same class of task: reversing a string, counting words,', 14, 'var(--muted)') +
                fText(40, 220, 'checking rhyme, padding ASCII tables, splitting by character.', 14, 'var(--muted)') +
                fText(40, 248, 'All of them are cheap in code and unreliable in a prompt.', 14, 'var(--warn)') +
                fPanel('The product fix is boring and total', 'Do not prompt harder - move the character work into a tool.', 'Reasoning models brute-force it token by token, slowly and at a cost.', 'var(--ok)')
              ),
              label: { pl: '3. Poprawka', en: '3. The fix' },
              note: {
                pl: 'Nie ma promptu, ktory naprawi warstwe tokenizacji. Zadania znakowe oddajesz kodowi - w produkcie to jedna funkcja narzedziowa.',
                en: 'No prompt fixes the tokenization layer. Character-level tasks go to code - in a product that is one tool function.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Ta sama tresc, cztery formaty: jak zapis danych zmienia liczbe tokenow i rachunek, zanim model cokolwiek pomysli.',
            en: 'The same content in four formats: how the encoding changes token count and the bill before the model thinks at all.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Baseline: 50 product rows as pretty JSON') +
                fBar(70, 'JSON, indented', 380, 'var(--err)', '4100 tok') +
                fText(28, 130, 'Every row repeats the keys: productId, name, priceNet,', 14, 'var(--muted)') +
                fText(28, 154, 'currency, updatedAt - plus braces, quotes and indentation.', 14, 'var(--muted)') +
                fText(28, 190, 'At 3 USD per million input tokens: 0.0123 USD per call.', 14, 'var(--muted)') +
                fText(28, 220, '100k calls a month: about 1230 USD, just to describe 50 rows.', 14, 'var(--warn)') +
                fPanel('Format is a cost decision', 'The model never asked for JSON - your serializer did.', 'Keys repeated 50 times are 50 copies of the same tokens.', 'var(--warn)')
              ),
              label: { pl: '1. JSON z wcieciami', en: '1. Pretty JSON' },
              note: {
                pl: 'Punkt wyjscia: piekny, czytelny JSON. Kazdy klucz powtarza sie w kazdym wierszu, wiec placisz za te sama nazwe pola piecdziesiat razy.',
                en: 'The starting point: beautiful readable JSON. Every key repeats on every row, so you pay for the same field name fifty times.'
              }
            },
            {
              svg: svgFrame(
                fHead('Step 1: drop the indentation and the repeated keys') +
                fBar(70, 'JSON, indented', 380, 'var(--err)', '4100 tok') +
                fBar(106, 'JSON, minified', 300, 'var(--warn)', '3200 tok') +
                fBar(142, 'CSV with header', 190, 'var(--ok)', '2050 tok') +
                fText(28, 196, 'CSV writes each column name exactly once, in the header.', 14, 'var(--muted)') +
                fText(28, 224, 'Same information, half the tokens, no loss of meaning.', 14, 'var(--ok)') +
                fPanel('CSV usually wins for tabular data', 'Typical saving on row-shaped payloads: 40 to 50 percent.', 'Models read CSV fine as long as the header is explicit.', 'var(--ok)')
              ),
              label: { pl: '2. CSV zamiast JSON', en: '2. CSV instead of JSON' },
              note: {
                pl: 'Ta sama tresc w CSV: nazwy kolumn raz w naglowku zamiast w kazdym wierszu. Typowa oszczednosc to 40-50 procent tokenow wejscia.',
                en: 'The same content as CSV: column names once in the header instead of on every row. Typical saving is 40-50 percent of input tokens.'
              }
            },
            {
              svg: svgFrame(
                fHead('Step 2: shorten the identifiers') +
                fBar(70, 'CSV, full UUIDs', 190, 'var(--accent2)', '2050 tok') +
                fBar(106, 'CSV, aliases d1..d50', 120, 'var(--ok)', '1350 tok') +
                fText(28, 166, 'One UUID is 8-12 tokens. Fifty of them is 400-600 tokens', 14, 'var(--muted)') +
                fText(28, 190, 'that carry no meaning the model can use.', 14, 'var(--muted)') +
                fText(28, 226, 'Aliases also cut misquoted ids: d7 is hard to garble,', 14, 'var(--ok)') +
                fText(28, 250, 'a 36-character UUID is not.', 14, 'var(--ok)') +
                fPanel('Map aliases back in your code', 'Send d1..d50, receive d7, look up the real UUID server-side.', 'Cheaper prompt AND more reliable citations at the same time.', 'var(--ok)')
              ),
              label: { pl: '3. Krotkie aliasy', en: '3. Short aliases' },
              note: {
                pl: 'UUID to 8-12 tokenow bez znaczenia dla modelu. Aliasy d1..d50 tna koszt i jednoczesnie zmniejszaja ryzyko przekrecenia identyfikatora w cytowaniu.',
                en: 'A UUID is 8-12 meaningless tokens for the model. Aliases d1..d50 cut cost and at the same time reduce the risk of a garbled id in a citation.'
              }
            },
            {
              svg: svgFrame(
                fHead('Same trick, different axis: language') +
                fBar(70, 'English prose', 250, 'var(--ok)', '250 tok / 1k chars') +
                fBar(106, 'Polish prose', 350, 'var(--warn)', '350 tok / 1k chars') +
                fBar(142, 'base64 blob', 420, 'var(--err)', '420 tok / 1k chars') +
                fText(28, 196, 'Tokenizers were fit mostly on English, so inflected Polish', 14, 'var(--muted)') +
                fText(28, 220, 'words split into more pieces for the identical meaning.', 14, 'var(--muted)') +
                fText(28, 250, 'Never estimate with text.length / 4 outside English.', 14, 'var(--warn)') +
                fPanel('Count, do not guess', 'Use tiktoken for OpenAI or the count_tokens endpoint for Claude.', 'Treat it as validation middleware, like zod at an API boundary.', 'var(--accent)')
              ),
              label: { pl: '4. Jezyk tez kosztuje', en: '4. Language costs too' },
              note: {
                pl: 'Polski tekst to zwykle 30-60 procent wiecej tokenow niz ten sam sens po angielsku. Dlatego budzet liczy sie tokenizerem, nie dlugoscia stringa.',
                en: 'Polish text is usually 30-60 percent more tokens than the same meaning in English. Which is why budgets are counted with a tokenizer, not with string length.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Model nie czyta liter. Zanim tekst do niego dotrze, ktos tnie go na kawalki, troche jak batonik na kesy. Czasem kes to cale slowo, czasem sama koncowka, czasem trzy przypadkowe litery.</p>' +
            '<p>Slowo "truskawka" moze zostac pociete na trzy kesy. I teraz clou: kiedy pytasz model, ile jest w nim liter "r", on nie widzi liter. Widzi trzy kesy z numerkami. To tak, jakbys probowal policzyc ziarenka maku, patrzac wylacznie na zdjecie calej bulki z opisem "bulka z makiem".</p>' +
            '<p>Dlatego model, ktory pieknie napisze esej, potrafi sie pomylic przy liczeniu liter albo przy odwracaniu slowa od tylu. To nie znaczy, ze jest glupi. To znaczy, ze pokazujesz mu zadanie w jednostkach, ktorych nie ma jak zobaczyc - jakbys prosil kogos o policzenie pikseli, pokazujac mu tylko nazwe pliku.</p>' +
            '<p>Kesy maja tez druga strone, mniej filozoficzna, za to widoczna na fakturze: za kazdy kes placisz. Im wiecej kesow wysylasz i im wiecej model odsyla, tym wiekszy rachunek. A liczba kesow zalezy nie tylko od tego, ile napisales, ale i jak. To samo zdanie po polsku to wiecej kesow niz po angielsku, a upakowane w ladny JSON z wcieciami - jeszcze wiecej.</p>',
          en: '<p>The model does not read letters. Before your text reaches it, something slices it into chunks, a bit like cutting a chocolate bar into bites. Sometimes a bite is a whole word, sometimes just an ending, sometimes three random letters.</p>' +
            '<p>The word "strawberry" might be cut into three bites. Here is the punchline: when you ask how many letter r it contains, the model does not see letters. It sees three numbered bites. It is like counting poppy seeds while only ever looking at a photo of the whole bun labelled "bun with poppy seeds".</p>' +
            '<p>So a model that writes a beautiful essay can still fumble counting letters or spelling a word backwards. That does not mean it is stupid. It means you handed it a task in units it has no way of seeing - like asking someone to count pixels when all you showed them is the filename.</p>' +
            '<p>Bites have a second, less philosophical side that shows up on the invoice: you pay per bite. The more bites you send and the more the model sends back, the bigger the bill. And the number of bites depends not only on how much you wrote, but how. The same sentence in Polish is more bites than in English, and packed into pretty indented JSON, more still.</p>'
        },
        school: {
          pl: '<p><strong>Tokenizacja</strong> to zamiana tekstu na liczby, ktore rozumie siec. Standardem jest <strong>BPE</strong> (Byte Pair Encoding - kodowanie par bajtow). Algorytm startuje od pojedynczych bajtow i wielokrotnie skleja najczestsza sasiadujaca pare symboli w nowy symbol, az powstanie <strong>slownik</strong> zadanej wielkosci, czyli lista wszystkich tokenow, jakie model bedzie znal. Efekt: czeste slowa maja wlasny token, rzadkie rozpadaja sie na kawalki.</p>' +
            '<p>Kilka regul kciuka dla angielskiego: 1 token to okolo 4 znaki, czyli okolo 0,75 slowa. Strona A4 to mniej wiecej 500-700 tokenow. Polski wypada gorzej, bo tokenizery byly trenowane glownie na angielskim - ten sam sens po polsku potrafi kosztowac 1,3-2 razy wiecej tokenow. Odmiana przez przypadki robi swoje: "kontenerach" to nie jeden symbol, tylko kilka.</p>' +
            '<h4>Worked example: rachunek za jeden endpoint</h4>' +
            '<p>Twoj prompt ma 6000 znakow angielskiego tekstu, czyli okolo 1500 tokenow. Odpowiedz to 400 tokenow. Przy cenniku 3 USD za milion tokenow wejscia i 15 USD za milion wyjscia jedno wywolanie kosztuje 1500 razy 0,000003 plus 400 razy 0,000015, czyli 0,0045 plus 0,006 - razem okolo jednego centa. Przy 200 tysiacach wywolan miesiecznie to okolo 2100 USD. Teraz to samo po polsku: wejscie rosnie do okolo 2200 tokenow i rachunek rosnie o kilkaset dolarow, mimo ze tresc jest identyczna.</p>' +
            '<h4>Slynny problem z truskawka</h4>' +
            '<p>Pytanie "ile r jest w strawberry" bywa trudne, bo model dostaje trzy tokeny, a nie dziesiec liter. Litery sa dla niego czyms, o czym musi wnioskowac posrednio, tak jak ty wnioskujesz o zawartosci pliku po jego nazwie. Rozwiazanie w produkcie jest banalne: takie zadania oddajesz kodowi lub narzedziu, zamiast prosic model o liczenie.</p>' +
            '<p>Ta sama logika tlumaczy inne dziwactwa: literowka potrafi calkiem zmienic podzial na tokeny, wiec model reaguje inaczej niz na poprawny zapis, a bialy znak ma znaczenie, bo token to zwykle spacja plus slowo.</p>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Model widzi tokeny, nie litery - liczenie znakow oddaj kodowi. Liczba tokenow zalezy od jezyka i formatu danych, wiec ten sam sens ma rozna cene. A gdy szacujesz koszt albo sprawdzasz, czy tekst zmiesci sie w oknie kontekstu, licz prawdziwym tokenizerem, nie dlugoscia stringa.</p>',
          en: '<p><strong>Tokenization</strong> converts text into the numbers the network consumes. The standard is <strong>BPE</strong> (Byte Pair Encoding). The algorithm starts from raw bytes and repeatedly merges the most frequent adjacent pair of symbols into a new symbol until the <strong>vocabulary</strong> - the list of every token the model will know - reaches a target size. Result: common words get their own token, rare ones fall apart into pieces.</p>' +
            '<p>Rules of thumb for English: 1 token is roughly 4 characters, about 0.75 of a word. A full A4 page is around 500-700 tokens. Polish fares worse, because tokenizers were trained mostly on English - the same meaning in Polish can cost 1.3 to 2 times more tokens. Inflection does the damage: a case-marked noun is several symbols, not one.</p>' +
            '<h4>Worked example: the bill for one endpoint</h4>' +
            '<p>Your prompt is 6000 characters of English, so about 1500 tokens. The answer is 400 tokens. At 3 USD per million input tokens and 15 USD per million output, one call costs 1500 times 0.000003 plus 400 times 0.000015, that is 0.0045 plus 0.006 - roughly one cent. At 200,000 calls a month that is about 2100 USD. Now the same content in Polish: input grows to around 2200 tokens and the bill grows by several hundred dollars, for identical meaning.</p>' +
            '<h4>The famous strawberry problem</h4>' +
            '<p>"How many r in strawberry" is hard because the model receives three tokens, not ten letters. Letters are something it must infer indirectly, the way you infer file contents from a filename. The product-level fix is trivial: hand such tasks to code or a tool instead of asking the model to count.</p>' +
            '<p>The same logic explains other oddities: a typo can reshuffle tokenization completely, so the model reacts differently than to the correct spelling, and whitespace matters because a token is usually a leading space plus the word.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>The model sees tokens, not letters - give character counting to code. Token count depends on language and data format, so identical meaning has different prices. And when you estimate cost or check whether text fits the context window, count with a real tokenizer, never with string length.</p>'
        },
        pro: {
          pl: '<p>Tokenizer to <strong>warstwa serializacji</strong> miedzy twoim stringiem a modelem - dokladnie tak, jak JSON siedzi miedzy obiektem a formatem przesylanym po sieci. I tak samo jak przy JSON, wybor formatu ma mierzalny koszt.</p>' +
            '<h4>Liczby, ktore warto miec w glowie</h4>' +
            '<ul>' +
            '<li>Angielski: okolo 4 znaki na token. Polski: czesto 2,5-3 znaki na token, czyli 30-60 procent narzutu na to samo zdanie.</li>' +
            '<li>Slowniki: GPT-4o uzywa <code>o200k_base</code> (okolo 200 tysiecy tokenow), starsze GPT-4 uzywalo <code>cl100k_base</code> (okolo 100 tysiecy). Modele Claude i Gemini maja wlasne tokenizery - liczby tokenow nie sa przenoszalne miedzy dostawcami.</li>' +
            '<li><strong>UUID</strong> (128-bitowy identyfikator zapisany jako 36 znakow) w JSON to zwykle 8-12 tokenow. Tabela z 500 wierszami i pelnymi identyfikatorami potrafi zjesc 10-15 tysiecy tokenow samych kluczy i idkow.</li>' +
            '<li><strong>base64</strong> (tekstowe kodowanie danych binarnych) i emoji sa drogie - jeden emoji to czesto 2-4 tokeny.</li>' +
            '</ul>' +
            '<h4>Praktyki produkcyjne</h4>' +
            '<p>Licz tokeny przed wyslaniem, nie po fakcie. Po stronie Node uzywasz <code>tiktoken</code> albo <code>gpt-tokenizer</code> dla OpenAI, a dla Claude endpointu <code>count_tokens</code> w oficjalnym SDK Anthropic. Traktuj to jak middleware walidacyjne, dokladnie tak jak zod na granicy API.</p>' +
            '<pre><code>import { encoding_for_model } from "tiktoken";\nconst enc = encoding_for_model("gpt-4o");\nconst n = enc.encode(payload).length;\nif (n &gt; BUDGET) payload = shrink(payload);\nenc.free();</code></pre>' +
            '<p>Optymalizacja formatu daje realne oszczednosci: zamiana tablicy obiektow JSON na CSV z naglowkiem potrafi obciac 40-50 procent tokenow, bo klucze nie powtarzaja sie w kazdym wierszu. Skracanie identyfikatorow z UUID do krotkich aliasow (<code>d1</code>, <code>d2</code>) przy okazji ulatwia modelowi cytowanie i zmniejsza ryzyko przekrecenia identyfikatora - model, ktory ma przepisac 36 znakow losowego ciagu, myli sie znacznie czesciej niz ten, ktory ma napisac <code>d7</code>.</p>' +
            '<h4>Pulapki</h4>' +
            '<p>Nie tnij tekstu po znakach - mozesz rozciac token w polowie i zepsuc streaming albo trafienia w cache promptu. Nie zakladaj, ze <code>text.length / 4</code> wystarczy dla jezykow innych niz angielski. Pamietaj, ze <code>max_tokens</code> dotyczy wylacznie wyjscia, a limit okna kontekstu obejmuje wejscie plus wyjscie razem - podniesienie <code>max_tokens</code> nie zrobi miejsca na wieksze dane. I nie prosz modelu o zadania znakowe (liczenie liter, odwracanie, dokladne wyrownanie tabelek ASCII) - to robota dla <code>String.prototype</code>, nie dla LLM.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Klasyczne pytanie: dlaczego ten sam prompt kosztuje inaczej u dwoch dostawcow, mimo identycznej tresci. Powod jest podwojny - inny tokenizer daje inna liczbe tokenow, a cennik jest liczony wlasnie za tokeny, nie za znaki. Dlatego porownania kosztow robi sie na realnym ruchu, liczac tokeny tokenizerem konkretnego dostawcy, a nie przelicznikiem znakow.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Format danych w prompcie to decyzja kosztowa - CSV plus krotkie aliasy zamiast rozlazlego JSON-a to zwykle najtansza optymalizacja w calym systemie.</li>' +
            '<li>Licznik tokenow wpinasz w kod przed wyslaniem requestu i alertujesz na wzrost, tak jak na rozmiar bundle.</li>' +
            '<li>Kazde zadanie operujace na znakach przenosisz do narzedzia, bo zadna wersja promptu nie da modelowi dostepu do liter.</li>' +
            '</ul>',
          en: '<p>The tokenizer is a <strong>serialization layer</strong> between your string and the model - exactly like JSON sits between an object and the wire format. And just like with JSON, format choice has a measurable cost.</p>' +
            '<h4>Numbers worth memorizing</h4>' +
            '<ul>' +
            '<li>English: about 4 characters per token. Polish: often 2.5-3 characters per token, so a 30-60 percent overhead for the same sentence.</li>' +
            '<li>Vocabularies: GPT-4o uses <code>o200k_base</code> (about 200k tokens), older GPT-4 used <code>cl100k_base</code> (about 100k). Claude and Gemini have their own tokenizers - token counts are not portable across providers.</li>' +
            '<li>A <strong>UUID</strong> (a 128-bit identifier written as 36 characters) in JSON is typically 8-12 tokens. A 500-row table with full ids can burn 10-15k tokens on keys and ids alone.</li>' +
            '<li><strong>base64</strong> (a text encoding for binary data) and emoji are expensive - a single emoji is often 2-4 tokens.</li>' +
            '</ul>' +
            '<h4>Production practice</h4>' +
            '<p>Count tokens before sending, not after the invoice. In Node reach for <code>tiktoken</code> or <code>gpt-tokenizer</code> for OpenAI, and the <code>count_tokens</code> endpoint of the official Anthropic SDK for Claude. Treat it as validation middleware, exactly the way you treat zod at an API boundary.</p>' +
            '<pre><code>import { encoding_for_model } from "tiktoken";\nconst enc = encoding_for_model("gpt-4o");\nconst n = enc.encode(payload).length;\nif (n &gt; BUDGET) payload = shrink(payload);\nenc.free();</code></pre>' +
            '<p>Format optimization pays real money: turning an array of JSON objects into CSV with a header can cut 40-50 percent of tokens, because keys stop repeating on every row. Shortening ids from UUIDs to compact aliases (<code>d1</code>, <code>d2</code>) additionally makes citation easier and lowers the chance the model garbles an identifier - a model asked to copy 36 random characters slips far more often than one asked to write <code>d7</code>.</p>' +
            '<h4>Pitfalls</h4>' +
            '<p>Never slice text by characters - you can cut a token in half and break streaming or prompt-cache hits. Never assume <code>text.length / 4</code> holds outside English. Remember that <code>max_tokens</code> governs output only, while the context window limit covers input plus output together - raising <code>max_tokens</code> makes no room for bigger data. And do not ask the model for character-level work (counting letters, reversing strings, exact ASCII table alignment) - that is a job for <code>String.prototype</code>, not an LLM.</p>' +
            '<h4>In interviews</h4>' +
            '<p>The classic question: why does the same prompt cost differently at two providers despite identical content. The reason is twofold - a different tokenizer yields a different token count, and pricing is per token, not per character. Which is why cost comparisons are done on real traffic, counting with that provider tokenizer, never with a character heuristic.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>The data format in a prompt is a cost decision - CSV plus short aliases instead of sprawling JSON is usually the cheapest optimization in the whole system.</li>' +
            '<li>Wire a token counter into the code before the request goes out and alert on growth, just like you do for bundle size.</li>' +
            '<li>Move every character-level task into a tool, because no prompt wording gives the model access to letters.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego model myli sie, gdy pytasz go, ile liter "r" jest w slowie strawberry?',
            en: 'Why does the model stumble when you ask how many letter r are in strawberry?'
          },
          options: [
            { pl: 'Bo dostaje slowo pociete na kilka kawalkow i nie widzi pojedynczych liter', en: 'Because it gets the word cut into a few chunks and cannot see individual letters' },
            { pl: 'Bo nie zna angielskiego slownictwa kulinarnego', en: 'Because it does not know English food vocabulary' },
            { pl: 'Bo pytanie jest zbyt dlugie jak na okno kontekstu', en: 'Because the question is too long for the context window' },
            { pl: 'Bo litera r jest rzadka w danych treningowych', en: 'Because the letter r is rare in training data' }
          ],
          correct: 0,
          explain: {
            pl: 'Warstwa tokenizacji ukrywa litery: model widzi trzy kawalki z numerkami, nie dziesiec znakow. Takie zadanie oddaje sie kodowi - w JS to jedna linia.',
            en: 'The tokenization layer hides letters: the model sees three numbered chunks, not ten characters. Hand that task to code - one line in JS.'
          }
        },
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
            pl: 'Regula kciuka: okolo 4 znaki na token w angielskim. W polskim wychodzi znacznie gorzej, czesto 2,5-3 znaki na token, wiec ta sama tresc kosztuje wiecej.',
            en: 'Rule of thumb: about 4 characters per token in English. Polish is much worse, often 2.5-3 characters per token, so identical content costs more.'
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
            { pl: 'Iteracyjnie skleja najczestsze sasiadujace pary symboli w nowe symbole', en: 'It iteratively merges the most frequent adjacent symbol pairs into new symbols' }
          ],
          correct: 3,
          explain: {
            pl: 'Dlatego czeste slowa maja jeden token, a rzadkie rozpadaja sie na kawalki - o podziale decyduje czestotliwosc w danych treningowych, a nie gramatyka.',
            en: 'That is why frequent words get a single token while rare ones fragment - frequency in the training data decides the split, not grammar.'
          }
        },
        {
          q: {
            pl: 'W prompcie wysylasz 800 rekordow jako tablice obiektow JSON, kazdy z polem UUID (36-znakowy identyfikator). Przekraczasz budzet tokenow wejscia. Ktora zmiana da najwieksza oszczednosc przy najmniejszym ryzyku?',
            en: 'Your prompt sends 800 records as a JSON object array, each with a UUID field (a 36-character identifier). You are over the input token budget. Which change saves the most with the least risk?'
          },
          options: [
            { pl: 'Obnizyc temperature do 0', en: 'Lower temperature to 0' },
            { pl: 'Zamienic tablice obiektow na CSV z naglowkiem i skrocic identyfikatory do aliasow d1..d800', en: 'Convert the object array to CSV with a header and shorten ids to aliases d1..d800' },
            { pl: 'Zwiekszyc max_tokens, zeby zmiescic wiecej danych', en: 'Raise max_tokens so more data fits' },
            { pl: 'Przetlumaczyc dane na angielski', en: 'Translate the data into English' }
          ],
          correct: 1,
          explain: {
            pl: 'CSV usuwa klucze powtarzane w kazdym wierszu (czesto 40-50 procent oszczednosci), a krotkie aliasy tna po 8-12 tokenow na kazdym UUID i ulatwiaja poprawne cytowanie. max_tokens dotyczy wyjscia, wiec nie zwolni miejsca na wejsciu.',
            en: 'CSV drops the keys repeated on every row (often 40-50 percent savings) and short aliases cut 8-12 tokens per UUID while making citation more reliable. max_tokens governs output, so it frees no input room.'
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
      minutes: 12,
      terms: [
        {
          term: { pl: 'okno kontekstu', en: 'context window' },
          def: {
            pl: 'Maksymalna liczba tokenow wejscia i wyjscia w jednym wywolaniu. To budzet na request, a nie pamiec - model jest bezstanowy i przy kazdym wywolaniu dostaje cala historie od nowa.',
            en: 'The maximum number of input plus output tokens in a single call. It is a per-request budget, not memory - the model is stateless and receives the whole history again every time.'
          }
        },
        {
          term: { pl: 'obcinanie', en: 'truncation' },
          def: {
            pl: 'Usuwanie czesci historii, gdy przestaje sie miescic w oknie. Robione naiwnie (od poczatku) wycina system prompt albo pierwotne wymagania - dlatego kolejnosc i priorytety trzeba ustalic jawnie.',
            en: 'Dropping part of the history when it no longer fits. Done naively, from the top, it removes the system prompt or the original requirements - so ordering and priorities must be explicit.'
          }
        },
        {
          term: { pl: 'lost in the middle', en: 'lost in the middle' },
          def: {
            pl: 'Empiryczny efekt: model najlepiej wykorzystuje poczatek i koniec kontekstu, a fakty ze srodka gubi. Najwazniejsze instrukcje i dokumenty kladzie sie na brzegach promptu.',
            en: 'The empirical effect that models use the beginning and the end of the context best and lose facts placed in the middle. Put the critical instructions and documents at the edges of the prompt.'
          }
        },
        {
          term: { pl: 'needle in a haystack', en: 'needle in a haystack' },
          def: {
            pl: 'Test dlugiego kontekstu: chowasz jedno zdanie w ogromnym tekscie i sprawdzasz, czy model je znajdzie. Wysoki wynik oznacza wyszukanie faktu, a nie rozumowanie na calym dokumencie.',
            en: 'A long-context benchmark: hide one sentence in a huge text and check whether the model retrieves it. A high score means fact lookup, not reasoning over the whole document.'
          }
        },
        {
          term: { pl: 'kontekst vs RAG vs fine-tuning', en: 'context vs RAG vs fine-tuning' },
          def: {
            pl: 'Trzy sposoby dostarczenia wiedzy: wkleic do promptu (male, zmienne dane), dociagnac przez RAG (duzy, zmienny korpus), dotrenowac (styl i format, nie fakty).',
            en: 'Three ways to give the model knowledge: paste it into the prompt (small, changing data), retrieve it with RAG (large, changing corpus), or fine-tune (style and format, not facts).'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Jak okno zapelnia sie w prawdziwej rozmowie i co dokladnie znika, gdy biblioteka po cichu przycina historie.',
            en: 'How the window fills up in a real conversation and what exactly disappears when a library quietly trims the history.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Turn 1 of a support chat - budget 128k tokens') +
                '<rect x="20" y="46" width="600" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="24" y="50" width="70" height="44" rx="8" fill="var(--accent)" opacity="0.8"/>' +
                fText(59, 78, 'system', 12, 'var(--text)', 'middle') +
                '<rect x="98" y="50" width="60" height="44" rx="8" fill="var(--accent2)" opacity="0.7"/>' +
                fText(128, 78, 'tools', 12, 'var(--text)', 'middle') +
                '<rect x="162" y="50" width="40" height="44" rx="8" fill="var(--warn)" opacity="0.7"/>' +
                fText(182, 78, 'Q1', 12, 'var(--text)', 'middle') +
                fText(28, 132, 'used: 4200 of 128000 tokens (3 percent)', 14, 'var(--ok)') +
                fText(28, 162, 'system prompt 1800 - tool definitions 2100 - question 300', 13, 'var(--muted)') +
                fText(28, 206, 'Plenty of room. Nobody thinks about the window today.', 14, 'var(--muted)') +
                fPanel('The window is a per-request budget', 'Everything in the bar is re-sent on every single call.', 'It is not memory the server keeps for you.', 'var(--ok)')
              ),
              label: { pl: '1. Pusto', en: '1. Roomy' },
              note: {
                pl: 'Na starcie okno swieci pustkami. Warto zapamietac sklad: system prompt i definicje narzedzi placisz przy kazdym wywolaniu, nawet gdy sie nie zmieniaja.',
                en: 'At the start the window is nearly empty. Note the composition: you pay for the system prompt and tool definitions on every call, even though they never change.'
              }
            },
            {
              svg: svgFrame(
                fHead('Turn 40 - documents and history stacked up') +
                '<rect x="20" y="46" width="600" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="24" y="50" width="70" height="44" rx="8" fill="var(--accent)" opacity="0.8"/>' +
                fText(59, 78, 'system', 12, 'var(--text)', 'middle') +
                '<rect x="98" y="50" width="60" height="44" rx="8" fill="var(--accent2)" opacity="0.7"/>' +
                fText(128, 78, 'tools', 12, 'var(--text)', 'middle') +
                '<rect x="162" y="50" width="250" height="44" rx="8" fill="var(--accent2)" opacity="0.45"/>' +
                fText(287, 78, '39 turns of history', 12, 'var(--text)', 'middle') +
                '<rect x="416" y="50" width="150" height="44" rx="8" fill="var(--warn)" opacity="0.6"/>' +
                fText(491, 78, 'retrieved docs', 12, 'var(--text)', 'middle') +
                fText(28, 132, 'used: 119000 of 128000 tokens (93 percent)', 14, 'var(--warn)') +
                fText(28, 162, 'room left for the answer: about 9000 tokens', 13, 'var(--muted)') +
                fText(28, 206, 'Latency and cost have quietly tripled since turn 1.', 14, 'var(--warn)') +
                fPanel('Input and output share one budget', 'A fat prompt literally eats the space available for a long answer.', 'Prefill also grows, so time to first token climbs with it.', 'var(--warn)')
              ),
              label: { pl: '2. Prawie pelno', en: '2. Nearly full' },
              note: {
                pl: 'Historia i dokumenty zjadly 93 procent budzetu. Odpowiedz musi zmiescic sie w tym, co zostalo - okno jest wspolne dla wejscia i wyjscia.',
                en: 'History and documents ate 93 percent of the budget. The answer has to fit in what is left - the window is shared by input and output.'
              }
            },
            {
              svg: svgFrame(
                fHead('Turn 41 - naive truncation from the top') +
                '<rect x="20" y="46" width="600" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="24" y="50" width="130" height="44" rx="8" fill="var(--err)" opacity="0.35"/>' +
                fText(89, 78, 'dropped', 12, 'var(--err)', 'middle') +
                '<rect x="158" y="50" width="254" height="44" rx="8" fill="var(--accent2)" opacity="0.45"/>' +
                fText(285, 78, 'recent turns', 12, 'var(--text)', 'middle') +
                '<rect x="416" y="50" width="150" height="44" rx="8" fill="var(--warn)" opacity="0.6"/>' +
                fText(491, 78, 'retrieved docs', 12, 'var(--text)', 'middle') +
                fText(28, 132, 'the library cut the OLDEST messages to make room', 14, 'var(--err)') +
                fText(28, 162, 'gone: system prompt, tool rules, the customer id, turn 1 decisions', 13, 'var(--err)') +
                fText(28, 206, 'No error is raised. The app keeps answering - just worse.', 14, 'var(--err)') +
                fPanel('Silent truncation is the dangerous kind', 'A hard error you notice in minutes; quiet quality loss you notice in weeks.', 'The oldest turns are exactly where the requirements live.', 'var(--err)')
              ),
              label: { pl: '3. Ciche obciecie', en: '3. Silent truncation' },
              note: {
                pl: 'Naiwne przyciecie zaczyna od najstarszych wiadomosci - czyli od system promptu i pierwotnych ustalen. Bledu nie ma, jest tylko gorsza jakosc.',
                en: 'Naive trimming starts from the oldest messages - the system prompt and the original decisions. There is no error, only worse answers.'
              }
            },
            {
              svg: svgFrame(
                fHead('The fix: explicit priorities, not a blind window') +
                '<rect x="20" y="46" width="600" height="52" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="24" y="50" width="70" height="44" rx="8" fill="var(--ok)" opacity="0.8"/>' +
                fText(59, 78, 'system', 12, 'var(--text)', 'middle') +
                '<rect x="98" y="50" width="60" height="44" rx="8" fill="var(--ok)" opacity="0.7"/>' +
                fText(128, 78, 'tools', 12, 'var(--text)', 'middle') +
                '<rect x="162" y="50" width="110" height="44" rx="8" fill="var(--ok)" opacity="0.6"/>' +
                fText(217, 78, 'state block', 12, 'var(--text)', 'middle') +
                '<rect x="276" y="50" width="136" height="44" rx="8" fill="var(--accent2)" opacity="0.5"/>' +
                fText(344, 78, 'summary of 1-35', 12, 'var(--text)', 'middle') +
                '<rect x="416" y="50" width="150" height="44" rx="8" fill="var(--warn)" opacity="0.6"/>' +
                fText(491, 78, 'last 5 turns', 12, 'var(--text)', 'middle') +
                fText(28, 132, 'used: 26000 of 128000 tokens - and nothing important is missing', 14, 'var(--ok)') +
                fText(28, 168, 'state block: customer id, chosen plan, agreed constraints', 13, 'var(--muted)') +
                fText(28, 196, 'never truncate inside a tool_use / tool_result pair', 13, 'var(--warn)') +
                fPanel('Compaction beats eviction', 'Summarise old turns, keep the last few verbatim, re-append the state block.', 'Cheaper, faster and far more reliable than a sliding window alone.', 'var(--ok)')
              ),
              label: { pl: '4. Kompakcja', en: '4. Compaction' },
              note: {
                pl: 'Zamiast wyrzucac stare tury, streszczasz je i doklejasz osobny blok stanu z faktami krytycznymi. Okno spada z 93 do 20 procent bez utraty ustalen.',
                en: 'Instead of evicting old turns you summarise them and re-append a separate state block with the critical facts. The window drops from 93 to 20 percent with no lost decisions.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Test needle in a haystack: ten sam fakt, trzy pozycje w dlugim kontekscie i trzy bardzo rozne skutecznosci.',
            en: 'The needle in a haystack test: one fact, three positions in a long context, three very different hit rates.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Needle near the start of a 100k-token context') +
                '<rect x="20" y="50" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="40" y="58" width="26" height="30" rx="6" fill="var(--ok)"/>' +
                fText(28, 120, 'the fact sits in the first 5 percent of the prompt', 13, 'var(--muted)') +
                fBar(150, 'recall', 340, 'var(--ok)', '99 percent') +
                fText(28, 210, 'Question asked at the very end, as always.', 14, 'var(--muted)') +
                fPanel('Early positions are read reliably', 'Attention has the strongest grip on the head of the context.', 'This is also where your system prompt should live.', 'var(--ok)')
              ),
              label: { pl: '1. Igla na poczatku', en: '1. Needle at the start' },
              note: {
                pl: 'Fakt w pierwszych procentach promptu jest odnajdywany praktycznie zawsze. Dlatego instrukcje systemowe trzymamy na samej gorze.',
                en: 'A fact in the first few percent of the prompt is found almost every time. Which is why system instructions live at the very top.'
              }
            },
            {
              svg: svgFrame(
                fHead('Same fact, moved to the middle') +
                '<rect x="20" y="50" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="310" y="58" width="26" height="30" rx="6" fill="var(--err)"/>' +
                fText(28, 120, 'the fact sits around the 50 percent mark', 13, 'var(--muted)') +
                fBar(150, 'recall', 150, 'var(--err)', '62 percent') +
                fText(28, 210, 'Nothing else changed - same model, same question, same length.', 14, 'var(--err)') +
                fPanel('Lost in the middle', 'Roughly one in three lookups fails, silently and confidently.', 'Long-context marketing numbers rarely mention this dip.', 'var(--err)')
              ),
              label: { pl: '2. Igla w srodku', en: '2. Needle in the middle' },
              note: {
                pl: 'Ten sam fakt w polowie kontekstu bywa pomijany. Model nie zglasza problemu - po prostu odpowiada tak, jakby faktu nie bylo.',
                en: 'The same fact halfway through gets skipped. The model reports no problem - it simply answers as if the fact were not there.'
              }
            },
            {
              svg: svgFrame(
                fHead('Same fact, moved to the end') +
                '<rect x="20" y="50" width="600" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
                '<rect x="576" y="58" width="26" height="30" rx="6" fill="var(--ok)"/>' +
                fText(28, 120, 'the fact sits just before the question', 13, 'var(--muted)') +
                fBar(150, 'recall', 335, 'var(--ok)', '98 percent') +
                fText(28, 206, 'Practical layout: stable system on top, documents in the', 14, 'var(--muted)') +
                fText(28, 230, 'middle with explicit ids, task and question at the bottom.', 14, 'var(--muted)') +
                fPanel('Run this test on your own data', 'Vendor benchmarks use synthetic needles that are easy to spot.', 'Your documents are repetitive, which makes the dip deeper.', 'var(--accent)')
              ),
              label: { pl: '3. Igla na koncu', en: '3. Needle at the end' },
              note: {
                pl: 'Tuz przed pytaniem skutecznosc wraca do maksimum. Stad reguly ukladu promptu: krytyczne instrukcje na gorze albo na samym dole, nigdy w srodku.',
                en: 'Right before the question, accuracy is back at maximum. Hence the layout rule: critical instructions at the top or the very bottom, never in the middle.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Kontekst, RAG czy fine-tuning: to samo pytanie o cene katalogu, trzy architektury i trzy rachunki.',
            en: 'Context, RAG or fine-tuning: the same catalog pricing question, three architectures, three bills.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Option A: paste the whole catalog into every prompt') +
                fBox(20, 50, 180, 90, 'catalog', '40k rows', 'var(--border)') +
                fArrowR(206, 95, 54, 'var(--warn)') +
                fBox(266, 50, 160, 90, 'prompt', '900k tokens', 'var(--warn)') +
                fArrowR(432, 95, 54, 'var(--warn)') +
                fBox(492, 50, 128, 90, 'model', '', 'var(--border)') +
                fBar(170, 'cost per call', 380, 'var(--err)', '2.70 USD') +
                fBar(206, 'time to first token', 300, 'var(--err)', '14 s') +
                fPanel('Simple, correct, and unaffordable', 'Fresh data on every call, but you pay for 900k tokens every time.', 'Recall also drops: the answer hides in a wall of irrelevant rows.', 'var(--err)')
              ),
              label: { pl: '1. Wszystko do promptu', en: '1. Everything in the prompt' },
              note: {
                pl: 'Wklejenie calego katalogu dziala i jest swieze, ale kosztuje kilka dolarow za wywolanie i doklada kilkanascie sekund do pierwszego tokena.',
                en: 'Pasting the whole catalog works and stays fresh, but it costs dollars per call and adds tens of seconds before the first token.'
              }
            },
            {
              svg: svgFrame(
                fHead('Option B: fine-tune the model on the catalog') +
                fBox(20, 50, 180, 90, 'catalog', 'training run', 'var(--border)') +
                fArrowR(206, 95, 54, 'var(--muted)') +
                fBox(266, 50, 160, 90, 'new weights', 'hours, per run', 'var(--warn)') +
                fArrowR(432, 95, 54, 'var(--muted)') +
                fBox(492, 50, 128, 90, 'model', '', 'var(--border)') +
                fText(28, 172, 'price changed at 09:00 today - the weights say yesterday', 14, 'var(--err)') +
                fText(28, 200, 'no citation possible: the number came from nowhere traceable', 14, 'var(--err)') +
                fText(28, 228, 'every catalog change needs another training run', 14, 'var(--err)') +
                fPanel('Fine-tuning teaches behaviour, not facts', 'Great for tone, format and task style; hopeless for data that changes.', 'A fact seen a few times never becomes a reliable record.', 'var(--err)')
              ),
              label: { pl: '2. Fine-tuning', en: '2. Fine-tuning' },
              note: {
                pl: 'Dotrenowanie wtapia dane w wagi: nie ma cytowania, nie ma swiezosci, a kazda zmiana ceny wymaga kolejnego treningu. Fakty tak sie nie przechowuje.',
                en: 'Fine-tuning melts data into weights: no citations, no freshness, and every price change needs another training run. Facts do not belong there.'
              }
            },
            {
              svg: svgFrame(
                fHead('Option C: RAG - retrieve the few rows that matter') +
                fBox(20, 50, 150, 90, 'catalog', 'indexed', 'var(--border)') +
                fArrowR(176, 95, 44, 'var(--ok)') +
                fBox(226, 50, 150, 90, 'search', 'top 6 rows', 'var(--ok)') +
                fArrowR(382, 95, 44, 'var(--ok)') +
                fBox(432, 50, 188, 90, 'prompt', '3.5k tokens', 'var(--ok)') +
                fBar(170, 'cost per call', 40, 'var(--ok)', '0.012 USD') +
                fBar(206, 'time to first token', 34, 'var(--ok)', '0.7 s') +
                fPanel('Two hundred times cheaper, and citable', 'Data stays in the database, so it is always current.', 'Precision improves too: no 900k tokens of noise to ignore.', 'var(--ok)')
              ),
              label: { pl: '3. RAG', en: '3. RAG' },
              note: {
                pl: 'Dociagasz szesc pasujacych wierszy zamiast czterdziestu tysiecy. Dane sa swieze, zrodlo cytowalne, a rachunek spada o dwa rzedy wielkosci.',
                en: 'You pull six matching rows instead of forty thousand. Data stays fresh, sources are citable, and the bill drops by two orders of magnitude.'
              }
            },
            {
              svg: svgFrame(
                fHead('When long context is the right answer anyway') +
                fBox(20, 50, 290, 110, 'RAG wins', 'many documents, one small answer', 'var(--ok)') +
                fText(40, 130, 'catalogs, docs, tickets, knowledge bases', 13, 'var(--muted)') +
                fBox(330, 50, 290, 110, 'long context wins', 'one document, global reasoning', 'var(--accent)') +
                fText(350, 130, 'a contract, a big file, a full transcript', 13, 'var(--muted)') +
                fText(28, 196, 'Rule of thumb: if the answer needs the WHOLE document at once,', 14, 'var(--muted)') +
                fText(28, 220, 'retrieval will chop it apart and lose the thread.', 14, 'var(--muted)') +
                fText(28, 250, 'Web analogy: RAG is a query, long context is loading the table.', 14, 'var(--accent2)') +
                fPanel('Pick by shape of the question', 'Lookup questions go to retrieval; whole-document questions go to context.', 'Fine-tuning stays for style, format and task behaviour.', 'var(--accent)')
              ),
              label: { pl: '4. Kiedy co', en: '4. Which when' },
              note: {
                pl: 'RAG wygrywa przy wielu dokumentach i punktowych pytaniach. Dlugi kontekst wygrywa, gdy odpowiedz wymaga calego dokumentu naraz - umowy, transkrypcji, duzego pliku.',
                en: 'RAG wins for many documents and pinpoint questions. Long context wins when the answer needs the whole document at once - a contract, a transcript, one big file.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie biurko o stalej wielkosci. Wszystko, co ma byc uzyte teraz, musi na nim lezec: notatka od szefa, poprzednie rozmowy, wydruki i jeszcze miejsce na kartke, na ktorej wlasnie piszesz. Jak zabraknie miejsca, cos musi spasc na podloge.</p>' +
            '<p>Model tez ma takie biurko i nazywa sie ono okno kontekstu. Wszystko, co mu wyslesz, i wszystko, co odpisze, musi sie na nim zmiescic naraz. Nie ma szuflady na potem.</p>' +
            '<p>Jest tez druga rzecz, znacznie dziwniejsza. Jesli biurko jest zawalone, model najlepiej pamieta to, co lezy na samej gorze i na samym spodzie stosu. To, co utknelo dokladnie w srodku, gubi sie najczesciej - dokladnie jak u ludzi, ktorzy z listy zakupow pamietaja pierwsza i ostatnia pozycje, a te ze srodka odkrywaja dopiero w domu.</p>' +
            '<p>Najgorsze jest to, ze kiedy cos spada z biurka, nikt nie krzyczy. Model nie powie ci "zgubilem twoja notatke". On odpowie dalej, pewnym glosem, tylko troche glupiej. Dlatego celem nigdy nie jest wrzucenie modelowi wszystkiego, co masz. Celem jest polozyc na biurku dokladnie te kartki, ktore sa potrzebne do tego jednego zadania - i te najwazniejsze polozyc na wierzchu.</p>',
          en: '<p>Picture a desk of fixed size. Everything you need right now has to lie on it: the note from your boss, earlier conversations, printouts, and the sheet you are writing on. When it runs out of room, something falls on the floor.</p>' +
            '<p>The model has such a desk too, and it is called the context window. Everything you send and everything it writes back must fit on it at once. There is no drawer for later.</p>' +
            '<p>There is a second, much stranger thing. When the desk is crowded, the model best recalls what sits at the very top and the very bottom of the pile. Whatever is stuck exactly in the middle gets lost most often - just like people who remember the first and last items on a shopping list and rediscover the middle ones back at home.</p>' +
            '<p>The worst part: when something falls off the desk, nobody shouts. The model will not say "I dropped your note". It will keep answering in a confident voice, just slightly dumber. So the goal is never to dump everything you have on the model. The goal is to place exactly the sheets this one task needs - and to put the most important ones on top.</p>'
        },
        school: {
          pl: '<p><strong>Okno kontekstu</strong> (context window) to maksymalna liczba tokenow, ktore model przetwarza w jednym wywolaniu - i liczy sie do niego wszystko: system prompt (stala instrukcja na gorze rozmowy), cala historia, wklejone dokumenty, definicje narzedzi oraz wygenerowana odpowiedz. Typowe wielkosci w 2026 roku to 128 tysiecy tokenow w modelach produkcyjnych i 1 milion w wariantach long-context.</p>' +
            '<h4>Worked example: co sie miesci w 128k</h4>' +
            '<p>System prompt 1800 tokenow, definicje piaciu narzedzi 2100, szesc dociagnietych dokumentow po 800 tokenow to 4800, historia 39 tur po okolo 250 tokenow to okolo 9750. Razem okolo 18,5 tysiaca tokenow, czyli 14 procent budzetu - komfortowo. Ale gdy zamiast szesciu dokumentow wkleisz caly podrecznik na 90 tysiecy tokenow, zostaje niecale 20 tysiecy na odpowiedz i cala dalsza rozmowe, a prefill (przeliczenie wejscia) wydluza czas do pierwszego tokena kilkukrotnie.</p>' +
            '<p>Kiedy przekroczysz limit, dostajesz blad albo - w niektorych bibliotekach - ciche <strong>obcinanie</strong> (truncation) najstarszych wiadomosci. To drugie jest grozniejsze, bo aplikacja dziala dalej, tylko odpowiedzi robia sie glupsze bez zadnego sygnalu w logach.</p>' +
            '<h4>Lost in the middle</h4>' +
            '<p>Badania i praktyka zgadzaja sie: ten sam fakt umieszczony na poczatku lub koncu dlugiego kontekstu jest odnajdywany niemal zawsze, a umieszczony w polowie bywa pomijany w kilkudziesieciu procentach przypadkow. Test <strong>needle in a haystack</strong> (igla w stogu siana) polega wlasnie na chowaniu jednego zdania w dlugim tekscie i mierzeniu skutecznosci odzyskania.</p>' +
            '<h4>Trzy sposoby na wiedze modelu</h4>' +
            '<ul>' +
            '<li><strong>Kontekst</strong> - wklejasz dane do promptu. Natychmiastowe, drogie przy kazdym wywolaniu, ograniczone rozmiarem okna.</li>' +
            '<li><strong>RAG</strong> (Retrieval-Augmented Generation - generowanie wsparte wyszukiwaniem) - wyszukujesz tylko potrzebne fragmenty i wklejasz je. Skaluje sie do milionow dokumentow, dane sa zawsze swieze.</li>' +
            '<li><strong>Fine-tuning</strong> - dostrajasz wagi na wlasnych przykladach. Uczy stylu, formatu i zachowania, ale kiepsko nadaje sie do faktow, ktore sie zmieniaja.</li>' +
            '</ul>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Okno to jeden wspolny budzet na wejscie i wyjscie, a nie pamiec modelu. Fakty ze srodka dlugiego kontekstu gina, wiec instrukcje i pytanie trzymasz na brzegach promptu. Do zmiennych danych uzywasz RAG, a fine-tuning zostawiasz na styl i format.</p>',
          en: '<p>The <strong>context window</strong> is the maximum number of tokens a model processes in one call - and everything counts toward it: the system prompt (the standing instruction at the top of the conversation), the full history, pasted documents, tool definitions, and the generated answer. Typical sizes in 2026 are 128k tokens for production models and 1M for long-context variants.</p>' +
            '<h4>Worked example: what fits in 128k</h4>' +
            '<p>A 1800-token system prompt, 2100 tokens of definitions for five tools, six retrieved documents of 800 tokens each is 4800, and 39 turns of history at about 250 tokens each is roughly 9750. Total around 18.5k tokens, 14 percent of the budget - comfortable. But paste a 90k-token handbook instead of six documents and you have under 20k left for the answer and the rest of the conversation, while prefill (computing the input) multiplies your time to first token.</p>' +
            '<p>Exceed the limit and you get an error, or - in some libraries - silent <strong>truncation</strong> of the oldest messages. The silent version is far more dangerous: the app keeps working, answers just quietly get dumber with nothing in the logs.</p>' +
            '<h4>Lost in the middle</h4>' +
            '<p>Research and practice agree: the same fact placed at the start or the end of a long context is found almost every time, while placed halfway it is skipped in a sizeable share of runs. The <strong>needle in a haystack</strong> test does exactly this - hides one sentence inside a long text and measures retrieval accuracy.</p>' +
            '<h4>Three ways to give a model knowledge</h4>' +
            '<ul>' +
            '<li><strong>Context</strong> - paste the data into the prompt. Instant, expensive on every call, capped by window size.</li>' +
            '<li><strong>RAG</strong> (Retrieval-Augmented Generation) - retrieve only the relevant chunks and paste those. Scales to millions of documents, data is always fresh.</li>' +
            '<li><strong>Fine-tuning</strong> - adjust the weights on your own examples. Teaches style, format and behaviour, but is a poor fit for facts that change.</li>' +
            '</ul>' +
            '<h4>What you must remember</h4>' +
            '<p>The window is one shared budget for input and output, not the model memory. Facts in the middle of a long context get lost, so keep instructions and the question at the edges. Use RAG for changing data and leave fine-tuning for style and format.</p>'
        },
        pro: {
          pl: '<p>Okno kontekstu to <strong>budzet, a nie pojemnik</strong>. Dwa niezalezne powody, by go nie wypelniac do pelna: koszt i latencja rosna liniowo (prefill, czyli jednorazowe przeliczenie calego wejscia, dotyka kazdego tokena), a jakosc odzyskiwania spada wraz z dlugoscia - efektywne okno jest zauwazalnie mniejsze niz nominalne.</p>' +
            '<h4>Uklad promptu, ktory dziala</h4>' +
            '<ol>' +
            '<li>Stabilny system prompt i definicje narzedzi na gorze - te same bajty w tym samym miejscu daja trafienia <strong>prompt cache</strong> (mechanizmu, ktory pozwala dostawcy nie przeliczac powtarzanego prefiksu).</li>' +
            '<li>Dokumenty i dane w srodku, kazdy z jawnym identyfikatorem, na przyklad <code>[doc:3]</code>, zeby model mial czym cytowac.</li>' +
            '<li>Instrukcje zadania i faktyczne pytanie na samym koncu, tuz przed generowaniem.</li>' +
            '</ol>' +
            '<p>Reguly na koncu wygrywaja z regulami zakopanymi w srodku 60 tysiecy tokenow logow. Jesli musisz je powtorzyc - powtorz; dwadziescia tokenow jest tansze niz zle wykonane zadanie.</p>' +
            '<pre><code>const messages = [\n  { role: "user", content: [\n      { type: "text", text: CONTEXT_DOCS },      // duze, w srodku\n      { type: "text", text: "Question: " + q }   // male, na koncu\n  ]}\n];</code></pre>' +
            '<h4>Zarzadzanie dluga rozmowa</h4>' +
            '<p>W chatbocie stosujesz okno przesuwne plus <strong>kompakcje</strong> (zamiane starszych tur na zwiezle streszczenie): co N tur streszczasz historie do stanu i trzymasz ostatnie 5-10 tur doslownie. Wazne, by nigdy nie obcinac w srodku pary <code>tool_use</code> / <code>tool_result</code> (zadanie wywolania narzedzia i jego wynik) - modele odrzucaja niekompletna pare bledem walidacji, a szukanie tego potrafi zjesc pol dnia. Fakty krytyczne, czyli identyfikator klienta, wybrany plan i poczynione ustalenia, trzymaj w oddzielnej, zawsze doklejanej sekcji stanu, zamiast liczyc, ze przetrwaja w historii.</p>' +
            '<h4>Kiedy 1 mln tokenow nie jest odpowiedzia</h4>' +
            '<p>Wrzucenie calego repozytorium do okna 1M kosztuje przy typowych cenach (okolo 3 USD za milion tokenow wejscia) kilka dolarow za jedno wywolanie i dodaje kilkanascie sekund do TTFT (czasu do pierwszego tokena). RAG na tych samych danych to zwykle 3-8 tysiecy tokenow, kilkadziesiat milisekund wyszukiwania i wyzsza precyzja, bo model nie musi ignorowac 990 tysiecy tokenow szumu. Long context wygrywa tam, gdzie dokument jest naprawde niepodzielny i potrzebne jest rozumowanie globalne: dluga umowa, jeden duzy plik, transkrypcja calego spotkania.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej i w monitoringu</h4>' +
            '<p>Czeste pytanie: skoro mamy okno 1M, po co jeszcze RAG. Odpowiedz zawiera trzy watki - koszt liniowy wzgledem wejscia, degradacja recall w dlugim kontekscie i brak cytowalnego zrodla. Praktycznie: zrob wlasny test needle-in-a-haystack na swoich danych, w kilku pozycjach i kilku dlugosciach; powie ci wiecej niz benchmark dostawcy, bo twoje dokumenty sa powtarzalne, a syntetyczne igly z benchmarku sa latwe do znalezienia. Loguj <code>input_tokens</code> per zadanie i alertuj na wzrost - rozrastajacy sie prompt to najczestsza cicha przyczyna rosnacego rachunku.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Projektuj prompt jak layout, nie jak worek: stale na gorze, dane w srodku z identyfikatorami, zadanie na dole.</li>' +
            '<li>Zamien ciche obcinanie na jawna kompakcje z blokiem stanu, bo utrata ustalen nie generuje bledu i nie zostawia sladu.</li>' +
            '<li>Dlugie okno traktuj jak funkcje, ktora placisz przy kazdym wywolaniu - domyslnie wybieraj retrieval, a caly dokument wkladaj tylko wtedy, gdy pytanie naprawde go wymaga.</li>' +
            '</ul>',
          en: '<p>The context window is a <strong>budget, not a container</strong>. Two independent reasons not to fill it: cost and latency grow linearly (prefill - the one-off computation over the whole input - touches every token), and retrieval quality degrades with length, so the effective window is noticeably smaller than the nominal one.</p>' +
            '<h4>A prompt layout that works</h4>' +
            '<ol>' +
            '<li>Stable system prompt and tool definitions at the top - identical bytes in the same place earn <strong>prompt cache</strong> hits (the mechanism that lets a provider skip recomputing a repeated prefix).</li>' +
            '<li>Documents and data in the middle, each with an explicit id such as <code>[doc:3]</code> so the model has something to cite.</li>' +
            '<li>Task instructions and the actual question at the very end, right before generation.</li>' +
            '</ol>' +
            '<p>Rules at the end beat rules buried inside 60k tokens of logs. If you must repeat them, repeat them - twenty tokens are cheaper than a botched task.</p>' +
            '<pre><code>const messages = [\n  { role: "user", content: [\n      { type: "text", text: CONTEXT_DOCS },      // large, middle\n      { type: "text", text: "Question: " + q }   // small, at the end\n  ]}\n];</code></pre>' +
            '<h4>Managing a long conversation</h4>' +
            '<p>In a chatbot you run a sliding window plus <strong>compaction</strong> (replacing older turns with a compact summary): every N turns you summarise the history into a state and keep the last 5-10 turns verbatim. Critically, never truncate inside a <code>tool_use</code> / <code>tool_result</code> pair (the tool call request and its result) - models reject the incomplete pair with a validation error, and hunting that down can burn half a day. Keep critical facts - customer id, chosen plan, agreed decisions - in a separate always-appended state block instead of hoping they survive in the history.</p>' +
            '<h4>When 1M tokens is not the answer</h4>' +
            '<p>Dumping a whole repository into a 1M window costs several dollars per call at typical prices (around 3 USD per million input tokens) and adds tens of seconds to TTFT (time to first token). RAG over the same data is usually 3-8k tokens, tens of milliseconds of search, and higher precision, because the model does not have to ignore 990k tokens of noise. Long context wins where the document is genuinely indivisible and global reasoning is required: a long contract, one large file, a full meeting transcript.</p>' +
            '<h4>In interviews and in monitoring</h4>' +
            '<p>A common question: if we have a 1M window, why keep RAG at all. The answer has three threads - cost is linear in input, recall degrades over long contexts, and there is no citable source. Practically: run your own needle-in-a-haystack test on your data, across several positions and lengths; it tells you more than a vendor benchmark, because your documents are repetitive while synthetic needles are easy to spot. Log <code>input_tokens</code> per task and alert on growth - a creeping prompt is the most common silent cause of a rising bill.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Design the prompt like a layout, not like a sack: stable parts on top, data in the middle with ids, the task at the bottom.</li>' +
            '<li>Replace silent truncation with explicit compaction plus a state block, because losing decisions raises no error and leaves no trace.</li>' +
            '<li>Treat a long window as a feature you pay for on every call - default to retrieval and paste a whole document only when the question genuinely needs it.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Do czego mozna porownac okno kontekstu?',
            en: 'What is a good comparison for the context window?'
          },
          options: [
            { pl: 'Do trwalej pamieci modelu, ktora rosnie z kazda rozmowa', en: 'To the permanent memory of the model, growing with every chat' },
            { pl: 'Do biurka o stalej wielkosci, na ktorym musi zmiescic sie wszystko potrzebne teraz', en: 'To a fixed-size desk that must hold everything needed right now' },
            { pl: 'Do dysku, na ktorym model zapisuje twoje pliki', en: 'To a disk where the model stores your files' },
            { pl: 'Do limitu liczby wiadomosci na dobe', en: 'To a daily limit on the number of messages' }
          ],
          correct: 1,
          explain: {
            pl: 'To budzet na jedno wywolanie, wspolny dla tego, co wysylasz, i tego, co model odpisze. Gdy sie skonczy, cos musi z biurka zniknac.',
            en: 'It is a per-call budget shared by what you send and what the model writes back. When it runs out, something has to leave the desk.'
          }
        },
        {
          q: {
            pl: 'Co wlicza sie do okna kontekstu?',
            en: 'What counts toward the context window?'
          },
          options: [
            { pl: 'Tylko ostatnia wiadomosc uzytkownika', en: 'Only the latest user message' },
            { pl: 'Tylko dokumenty dociagniete przez RAG', en: 'Only the documents retrieved by RAG' },
            { pl: 'System prompt, historia, definicje narzedzi, dokumenty i odpowiedz razem', en: 'System prompt, history, tool definitions, documents and the answer together' },
            { pl: 'Wylacznie tokeny wyjsciowe', en: 'Output tokens only' }
          ],
          correct: 2,
          explain: {
            pl: 'Okno to jeden wspolny bufor na wejscie i wyjscie. Dlatego duzy prompt realnie zjada miejsce na dluga odpowiedz i podnosi czas do pierwszego tokena.',
            en: 'The window is a single shared buffer for input and output. A big prompt literally eats the room for a long answer and raises time to first token.'
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
            { pl: 'RAG: wyszukanie kilku pasujacych rekordow i wklejenie tylko ich', en: 'RAG: retrieve a few matching records and paste only those' }
          ],
          correct: 3,
          explain: {
            pl: 'Zmienne fakty naleza do warstwy danych, nie do wag. RAG daje swiezosc, niski koszt i cytowalne zrodlo, a fine-tuning nie daje zadnego z tych trzech.',
            en: 'Changing facts belong in the data layer, not in the weights. RAG gives freshness, low cost and a citable source; fine-tuning gives none of the three.'
          }
        },
        {
          q: {
            pl: 'Chatbot dziala poprawnie, ale po okolo 30 turach zaczyna zapominac wczesniejsze ustalenia i myli identyfikator klienta. W logach nie ma zadnego bledu. Najbardziej prawdopodobna przyczyna i poprawka?',
            en: 'A chatbot works fine, but after roughly 30 turns it forgets earlier decisions and mixes up the customer id. There is no error in the logs. Most likely cause and fix?'
          },
          options: [
            { pl: 'Zbyt niska temperatura; podnies ja do 1,0', en: 'Temperature too low; raise it to 1.0' },
            { pl: 'Biblioteka po cichu przycina najstarsze wiadomosci; trzymaj krytyczny stan w osobnej sekcji doklejanej przy kazdym wywolaniu', en: 'The library silently trims the oldest messages; keep critical state in a separate block re-appended on every call' },
            { pl: 'Wyczerpany limit max_tokens; zwieksz go dwukrotnie', en: 'max_tokens exhausted; double it' },
            { pl: 'Uszkodzony cache promptu; wylacz caching', en: 'Corrupted prompt cache; disable caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Okno przesuwne wypycha najstarsze tury, czyli dokladnie te, w ktorych siedza poczatkowe ustalenia - i robi to bez bledu. Stan krytyczny trzymaj poza historia i dokladaj go za kazdym razem.',
            en: 'A sliding window evicts the oldest turns, exactly where the initial decisions live - and it does so without an error. Keep critical state outside the history and re-append it every time.'
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
      minutes: 12,
      terms: [
        {
          term: { pl: 'embedding', en: 'embedding' },
          def: {
            pl: 'Wektor liczb reprezentujacy znaczenie tekstu - funkcja skrotu, ktora zachowuje bliskosc sensu. Teksty o podobnym znaczeniu maja bliskie wektory, nawet bez wspolnych slow.',
            en: 'A vector of numbers representing the meaning of a text - a hash that preserves closeness of meaning. Similar texts land close together even with no words in common.'
          }
        },
        {
          term: { pl: 'podobienstwo kosinusowe', en: 'cosine similarity' },
          def: {
            pl: 'Miara podobienstwa dwoch wektorow: kosinus kata miedzy nimi, w praktyce od 0 do 1. Na znormalizowanych wektorach to zwykly iloczyn skalarny, dlatego liczy sie ja bardzo szybko.',
            en: 'The similarity measure between two vectors: the cosine of the angle between them, in practice 0 to 1. On normalised vectors it is just a dot product, which is why it is so fast.'
          }
        },
        {
          term: { pl: 'wyszukiwanie semantyczne', en: 'semantic search' },
          def: {
            pl: 'Szukanie po znaczeniu zamiast po slowach kluczowych: zapytanie i dokumenty zamieniasz na embeddingi i zwracasz najblizsze wektory. Podstawa etapu retrievalu w RAG.',
            en: 'Searching by meaning instead of keywords: embed the query and the documents and return the nearest vectors. This is the retrieval half of RAG.'
          }
        },
        {
          term: { pl: 'asymetria zapytanie-dokument', en: 'query-document asymmetry' },
          def: {
            pl: 'Krotkie pytanie i dlugi dokument nie leza naturalnie blisko siebie. Modele asymetryczne maja osobne prefiksy lub tryby dla zapytania i dokumentu - trzeba ich uzyc, inaczej trafnosc spada.',
            en: 'A short question and a long document do not sit naturally close. Asymmetric embedding models use separate prefixes or modes for query and document - use them or recall drops.'
          }
        },
        {
          term: { pl: 'podobienstwo to nie trafnosc', en: 'similarity is not relevance' },
          def: {
            pl: 'Wysoki cosine oznacza tylko, ze teksty sa o tym samym - nie ze dokument odpowiada na pytanie. Negacja i przeczenia sa dla embeddingow prawie niewidoczne, stad reranking.',
            en: 'A high cosine only means the texts are about the same thing, not that the document answers the question. Negation is nearly invisible to embeddings - hence reranking.'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Od zdania do wspolrzednych: co dokladnie robi model embeddingowy i dlaczego wynik jest jednokierunkowy.',
            en: 'From a sentence to coordinates: what an embedding model actually does and why the result is one-way.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Step 1: a sentence goes into a small, cheap model') +
                fBox(20, 56, 250, 76, 'how do I reset my password', '', 'var(--border)') +
                fArrowR(278, 94, 54, 'var(--accent)') +
                fBox(340, 56, 280, 76, 'embedding model', 'not a chat model', 'var(--accent)') +
                fText(28, 176, 'It never writes text. It only describes text with numbers.', 14, 'var(--muted)') +
                fText(28, 204, 'Cost: about 0.02-0.13 USD per million tokens - 10 to 100x', 14, 'var(--muted)') +
                fText(28, 228, 'cheaper than generation, and much faster.', 14, 'var(--muted)') +
                fPanel('A separate model, a separate job', 'Same input type, completely different output type.', 'You call it on write, not only on read.', 'var(--accent)')
              ),
              label: { pl: '1. Osobny model', en: '1. A separate model' },
              note: {
                pl: 'Model embeddingowy nie generuje tekstu. Jest mniejszy, tanszy i szybszy od czatowego, a jego zadaniem jest opisac tekst liczbami.',
                en: 'An embedding model does not generate text. It is smaller, cheaper and faster than a chat model, and its job is to describe text with numbers.'
              }
            },
            {
              svg: svgFrame(
                fHead('Step 2: out comes a fixed-length list of numbers') +
                fBox(20, 50, 600, 66, '[ 0.12, -0.44, 0.07, 0.91, ... , -0.02 ]', '1536 numbers, always exactly 1536', 'var(--accent2)') +
                fText(28, 152, 'Fixed length regardless of input size: three words or three', 14, 'var(--muted)') +
                fText(28, 176, 'paragraphs both come back as 1536 numbers.', 14, 'var(--muted)') +
                fText(28, 212, 'Size on disk: 1536 x 4 bytes = 6 KB per vector.', 14, 'var(--muted)') +
                fText(28, 240, 'One million chunks is about 6 GB in float32.', 14, 'var(--muted)') +
                fPanel('The vector is your index key', 'Compute once on write, store it next to the row, reuse on every search.', 'Exactly like a database index, but keyed by meaning.', 'var(--accent2)')
              ),
              label: { pl: '2. Wektor', en: '2. The vector' },
              note: {
                pl: 'Wynik ma zawsze te sama dlugosc, niezaleznie od dlugosci tekstu. Liczysz go raz przy zapisie i trzymasz obok rekordu, jak indeks w bazie.',
                en: 'The output is always the same length, regardless of input length. You compute it once on write and store it next to the row, like a database index.'
              }
            },
            {
              svg: svgFrame(
                fHead('Step 3: the numbers are a position on a map of meaning') +
                '<line x1="70" y1="60" x2="70" y2="250" stroke="var(--border)" stroke-width="2"/>' +
                '<line x1="70" y1="250" x2="600" y2="250" stroke="var(--border)" stroke-width="2"/>' +
                '<circle cx="180" cy="110" r="8" fill="var(--accent)"/>' +
                fText(196, 106, 'reset my password', 13, 'var(--text)') +
                '<circle cx="215" cy="140" r="8" fill="var(--accent)"/>' +
                fText(231, 146, 'forgot my login', 13, 'var(--text)') +
                '<circle cx="245" cy="96" r="8" fill="var(--accent)"/>' +
                fText(261, 88, 'cannot sign in', 13, 'var(--text)') +
                '<circle cx="500" cy="215" r="8" fill="var(--warn)"/>' +
                fText(400, 234, 'pizza delivery hours', 13, 'var(--warn)') +
                fText(28, 276, 'No shared words between the three blue points - but the', 13, 'var(--muted)') +
                fText(28, 298, 'model puts them in the same neighbourhood anyway.', 13, 'var(--muted)') +
                fText(28, 330, 'Warning: the map is one-way. You cannot turn 1536', 13, 'var(--warn)') +
                fText(28, 352, 'numbers back into the original sentence.', 13, 'var(--warn)') +
                fText(28, 382, 'It is a hash that preserves closeness, not a compression.', 13, 'var(--muted)')
              ),
              label: { pl: '3. Mapa znaczen', en: '3. The map of meaning' },
              note: {
                pl: 'Zdania bez ani jednego wspolnego slowa laduja obok siebie, bo znacza to samo. Operacja jest jednokierunkowa - z wektora nie odtworzysz tekstu.',
                en: 'Sentences with no shared words land next to each other because they mean the same thing. The operation is one-way - you cannot rebuild the text from the vector.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Podobienstwo kosinusowe policzone recznie: dlaczego liczy sie kat, a nie dlugosc wektora.',
            en: 'Cosine similarity computed by hand: why the angle matters and the vector length does not.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Two short vectors, so the arithmetic is visible') +
                fText(28, 66, 'A = [3, 4]   (query: dead battery)', 15, 'var(--text)') +
                fText(28, 94, 'B = [6, 8]   (doc: car will not start)', 15, 'var(--text)') +
                '<line x1="70" y1="250" x2="190" y2="130" stroke="var(--accent)" stroke-width="3"/>' +
                '<line x1="70" y1="250" x2="310" y2="10" stroke="var(--accent2)" stroke-width="3"/>' +
                fText(196, 130, 'A', 14, 'var(--accent)') +
                fText(316, 24, 'B', 14, 'var(--accent2)') +
                fText(340, 150, 'B is exactly twice as long as A,', 14, 'var(--muted)') +
                fText(340, 174, 'and points in the same direction.', 14, 'var(--muted)') +
                fText(340, 210, 'Angle between them: 0 degrees.', 14, 'var(--ok)') +
                fPanel('Length is document size, direction is meaning', 'A long document is a long vector; that must not beat a short one.', 'Cosine divides the length out, so only direction is compared.', 'var(--ok)')
              ),
              label: { pl: '1. Kierunek kontra dlugosc', en: '1. Direction versus length' },
              note: {
                pl: 'Dwa wektory o tym samym kierunku, ale roznej dlugosci, znacza to samo. Dlatego miara musi ignorowac dlugosc - inaczej dlugie dokumenty zawsze by wygrywaly.',
                en: 'Two vectors with the same direction but different lengths mean the same thing. The measure must ignore length, otherwise long documents would always win.'
              }
            },
            {
              svg: svgFrame(
                fHead('The formula, evaluated on those numbers') +
                fText(28, 66, 'dot(A,B) = 3*6 + 4*8 = 18 + 32 = 50', 15, 'var(--text)') +
                fText(28, 96, 'len(A) = sqrt(9 + 16) = 5', 15, 'var(--text)') +
                fText(28, 126, 'len(B) = sqrt(36 + 64) = 10', 15, 'var(--text)') +
                fText(28, 164, 'cosine = 50 / (5 * 10) = 1.00', 16, 'var(--ok)') +
                fText(28, 206, 'Identical direction scores 1. Unrelated directions score', 14, 'var(--muted)') +
                fText(28, 230, 'around 0. Opposite directions score -1.', 14, 'var(--muted)') +
                fPanel('On normalised vectors it is just a dot product', 'Providers usually return unit-length vectors, so len = 1.', 'That reduces the whole comparison to one multiply-and-add pass.', 'var(--accent)')
              ),
              label: { pl: '2. Wzor na liczbach', en: '2. The formula on numbers' },
              note: {
                pl: 'Iloczyn skalarny podzielony przez dlugosci obu wektorow. Na znormalizowanych wektorach mianownik znika i zostaje samo mnozenie z sumowaniem.',
                en: 'The dot product divided by both vector lengths. On normalised vectors the denominator disappears and only multiply-and-add remains.'
              }
            },
            {
              svg: svgFrame(
                fHead('Three candidates scored against the same query') +
                fText(28, 60, 'query: my car will not start', 15, 'var(--text)') +
                fBar(90, 'dead battery guide', 340, 'var(--ok)', '0.89') +
                fBar(126, 'engine noise FAQ', 210, 'var(--accent2)', '0.61') +
                fBar(162, 'pizza opening hours', 40, 'var(--muted)', '0.11') +
                fText(28, 216, 'Zero shared words with the winner - keyword search would', 14, 'var(--muted)') +
                fText(28, 240, 'have returned nothing at all for this query.', 14, 'var(--muted)') +
                fPanel('But a score is not a verdict', 'There is no universal threshold: 0.89 is great for one model, mediocre for another.', 'Calibrate cutoffs on a golden set, per model and per domain.', 'var(--warn)')
              ),
              label: { pl: '3. Ranking', en: '3. Ranking' },
              note: {
                pl: 'Wyszukiwanie polega na policzeniu tej samej liczby dla kazdego kandydata i posortowaniu. Progi ustala sie empirycznie - nie sa przenoszalne miedzy modelami.',
                en: 'Search is computing that one number for every candidate and sorting. Thresholds are set empirically - they do not transfer between models.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Wyszukiwanie semantyczne end-to-end plus jego najbardziej podstepna porazka: negacja.',
            en: 'Semantic search end to end, plus its most treacherous failure: negation.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Offline: index every chunk once') +
                fBox(20, 50, 140, 80, 'documents', '40k chunks', 'var(--border)') +
                fArrowR(166, 90, 44, 'var(--accent)') +
                fBox(216, 50, 170, 80, 'embedding model', 'batched, 100 per call', 'var(--accent)') +
                fArrowR(392, 90, 44, 'var(--accent)') +
                fBox(442, 50, 178, 80, 'vector column', 'pgvector, HNSW index', 'var(--ok)') +
                fText(28, 168, 'One-off cost for 40k chunks of 500 tokens: a few dollars.', 14, 'var(--muted)') +
                fText(28, 196, 'Store the model name and version beside every vector.', 14, 'var(--warn)') +
                fText(28, 224, 'Changing the embedding model means a full reindex.', 14, 'var(--warn)') +
                fPanel('Write path, not read path', 'Embedding happens when content changes, not when a user searches.', 'Batch it: 100 texts per call turns hours into minutes.', 'var(--accent)')
              ),
              label: { pl: '1. Indeksowanie', en: '1. Indexing' },
              note: {
                pl: 'Wektory liczysz raz, przy zapisie dokumentu, i trzymasz w kolumnie obok tresci. Zapisz tez nazwe modelu - zmiana modelu wymusza pelny reindeks.',
                en: 'Vectors are computed once, when the document is written, and kept in a column next to the content. Store the model name too - swapping models forces a full reindex.'
              }
            },
            {
              svg: svgFrame(
                fHead('Online: one query, one vector, one sorted scan') +
                fBox(20, 50, 160, 76, 'user question', '', 'var(--border)') +
                fArrowR(186, 88, 44, 'var(--accent)') +
                fBox(236, 50, 150, 76, 'same model', 'query mode', 'var(--accent)') +
                fArrowR(392, 88, 44, 'var(--accent)') +
                fBox(442, 50, 178, 76, 'top 8 by cosine', 'about 20 ms', 'var(--ok)') +
                fText(28, 164, 'Asymmetric models need prefixes: query: and passage:.', 14, 'var(--warn)') +
                fText(28, 192, 'Skipping them can cost double-digit recall points.', 14, 'var(--warn)') +
                fText(28, 226, 'Always filter by tenant BEFORE ranking - a shared vector', 14, 'var(--err)') +
                fText(28, 250, 'index without that filter is a cross-tenant leak.', 14, 'var(--err)') +
                fPanel('This is the retrieval half of RAG', 'The retrieved chunks are then pasted into the prompt with ids.', 'Search quality caps answer quality - measure them separately.', 'var(--accent)')
              ),
              label: { pl: '2. Wyszukiwanie', en: '2. Searching' },
              note: {
                pl: 'Zapytanie przechodzi przez ten sam model, a baza zwraca najblizsze wektory. Filtr po najemcy musi dzialac przed rankingiem - to granica bezpieczenstwa.',
                en: 'The query goes through the same model and the database returns the nearest vectors. The tenant filter must apply before ranking - it is a security boundary.'
              }
            },
            {
              svg: svgFrame(
                fHead('The failure that looks like success') +
                fText(28, 60, 'query: contracts that do NOT require parental consent', 15, 'var(--text)') +
                fBar(96, 'requires consent', 330, 'var(--err)', '0.91') +
                fBar(132, 'does not require consent', 320, 'var(--warn)', '0.89') +
                fText(28, 190, 'Both sentences are about the same topic, so both sit in the', 14, 'var(--muted)') +
                fText(28, 214, 'same region. The word NOT barely moves the vector.', 14, 'var(--muted)') +
                fText(28, 248, 'High similarity means "about the same thing" - never', 14, 'var(--err)') +
                fText(28, 272, '"answers the question".', 14, 'var(--err)') +
                fPanel('Fix: hybrid search plus a reranker', 'BM25 keyword search catches the literal token NOT.', 'A reranker scores the query and document jointly and reorders the top 50.', 'var(--ok)')
              ),
              label: { pl: '3. Pulapka negacji', en: '3. The negation trap' },
              note: {
                pl: 'Zdania rozniace sie tylko przeczeniem leza obok siebie w przestrzeni wektorowej. Ratunkiem jest hybryda z BM25 i reranker oceniajacy pare zapytanie-dokument.',
                en: 'Sentences differing only by a negation sit next to each other in vector space. The remedy is a BM25 hybrid plus a reranker that scores the query-document pair jointly.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie ogromna mape miasta, na ktorej kazde zdanie ma swoj adres. Nie taki adres jak ulica i numer, tylko taki, ze <em>rzeczy o podobnym znaczeniu mieszkaja obok siebie</em>.</p>' +
            '<p>"Jak zmienic haslo" i "zapomnialem loginu" beda sasiadami zza plotu, chociaz nie maja ani jednego wspolnego slowa. A "dostawa pizzy" wyladuje na drugim koncu miasta, przy obwodnicy.</p>' +
            '<p>Embedding to wlasnie sposob wyliczania takiego adresu. Wrzucasz zdanie, dostajesz dluga liste liczb - to sa wspolrzedne na mapie znaczen. Zawsze tyle samo liczb, czy wrzucisz trzy slowa, czy trzy akapity.</p>' +
            '<p>Po co to komu? Bo szukanie przestaje polegac na zgadywaniu slow kluczowych. Pytasz o cos swoimi slowami, komputer sprawdza, kto mieszka najblizej twojego pytania, i podaje tych sasiadow. Tak dziala wyszukiwarka w dokumentacji, podpowiadanie podobnych produktow albo wykrywanie, ze dwa zgloszenia to ten sam problem opisany calkiem innymi slowami.</p>' +
            '<p>Jest tylko jeden haczyk, o ktorym warto pamietac od poczatku: mapa mowi ci, ze cos jest <em>o tym samym</em>. Nie mowi, ze to dobra odpowiedz. "Umowa wymaga zgody" i "umowa nie wymaga zgody" to bliscy sasiedzi, chociaz znacza dokladnie cos przeciwnego.</p>',
          en: '<p>Picture an enormous city map where every sentence has an address. Not a street-and-number address, but one where <em>things with similar meaning live next door to each other</em>.</p>' +
            '<p>"How do I change my password" and "I forgot my login" end up neighbours over the fence, even though they share no words at all. Meanwhile "pizza delivery" lands on the other side of town, out by the ring road.</p>' +
            '<p>An embedding is simply how that address gets computed. You feed in a sentence, you get back a long list of numbers - the coordinates on a map of meaning. Always the same count of numbers, whether you sent three words or three paragraphs.</p>' +
            '<p>Why care? Because search stops being a guessing game about keywords. You ask in your own words, the computer checks who lives nearest to your question, and hands you those neighbours. That is how docs search works, how similar products get suggested, and how you spot that two support tickets are the same problem described in completely different words.</p>' +
            '<p>There is one catch worth knowing from day one: the map tells you something is <em>about the same thing</em>. It does not tell you it is a good answer. "The contract requires consent" and "the contract does not require consent" are close neighbours, even though they mean the opposite.</p>'
        },
        school: {
          pl: '<p><strong>Embedding</strong> (osadzenie, wektor znaczeniowy) to zamiana tekstu na liste liczb o stalej dlugosci - typowo 384, 768, 1024 lub 1536 <strong>wymiarow</strong> (czyli pozycji na tej liscie). Model embeddingowy jest trenowany tak, by teksty o zblizonym znaczeniu dostawaly wektory wskazujace w podobnym kierunku.</p>' +
            '<p>Podobienstwo mierzy sie miara <strong>cosine similarity</strong> (podobienstwo kosinusowe) - kosinusem kata miedzy wektorami. Wynik od -1 do 1, gdzie 1 to identyczny kierunek. Liczy sie kierunek, nie dlugosc, dzieki czemu dlugi dokument nie wygrywa automatycznie z krotkim.</p>' +
            '<h4>Worked example: policzmy to na dwoch liczbach</h4>' +
            '<p>Wezmy wektory dwuwymiarowe A = [3, 4] i B = [6, 8]. Iloczyn skalarny to 3 razy 6 plus 4 razy 8, czyli 50. Dlugosc A to pierwiastek z 9 plus 16, czyli 5; dlugosc B to pierwiastek z 36 plus 64, czyli 10. Podobienstwo wynosi 50 podzielone przez 5 razy 10, czyli 1,0 - maksimum, mimo ze B jest dwa razy dluzszy od A. To wlasnie znaczy "liczy sie kierunek".</p>' +
            '<pre><code>function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i &lt; a.length; i++) {\n    dot += a[i] * b[i];\n    na  += a[i] * a[i];\n    nb  += b[i] * b[i];\n  }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}</code></pre>' +
            '<p>Kluczowa roznica wobec wyszukiwania pelnotekstowego: <code>LIKE</code> i indeks slow kluczowych szukaja <em>znakow</em>, embeddingi szukaja <em>znaczenia</em>. Zapytanie "auto sie nie odpala" znajdzie dokument o rozladowanym akumulatorze, mimo braku wspolnych slow.</p>' +
            '<h4>Do czego sie tego uzywa</h4>' +
            '<ul>' +
            '<li><strong>Wyszukiwanie semantyczne</strong> - fundament RAG.</li>' +
            '<li><strong>Deduplikacja</strong> - dwa zgloszenia o podobienstwie powyzej 0,95 to najczesciej duplikat.</li>' +
            '<li><strong>Klasteryzacja</strong> - grupowanie tysiecy opinii w tematy bez recznego tagowania.</li>' +
            '<li><strong>Klasyfikacja</strong> - porownanie z wektorami przykladowych kategorii, tanio i bez trenowania.</li>' +
            '</ul>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Embedding to jednokierunkowy wektor znaczenia, liczony raz przy zapisie i uzywany jak indeks w bazie. Porownujesz kierunki, nie dlugosci, wiec dlugosc tekstu nie zaburza wyniku. I pamietaj, ze wysokie podobienstwo mowi tylko "o tym samym", a nie "poprawna odpowiedz".</p>',
          en: '<p>An <strong>embedding</strong> turns text into a fixed-length list of numbers - typically 384, 768, 1024 or 1536 <strong>dimensions</strong> (positions on that list). The embedding model is trained so that texts with related meaning receive vectors pointing in similar directions.</p>' +
            '<p>Similarity is measured with <strong>cosine similarity</strong> - the cosine of the angle between two vectors. The result runs from -1 to 1, where 1 means identical direction. Direction matters, magnitude does not, so a long document does not automatically beat a short one.</p>' +
            '<h4>Worked example: two numbers, done by hand</h4>' +
            '<p>Take the two-dimensional vectors A = [3, 4] and B = [6, 8]. The dot product is 3 times 6 plus 4 times 8, which is 50. The length of A is the square root of 9 plus 16, that is 5; the length of B is the square root of 36 plus 64, that is 10. Similarity is 50 divided by 5 times 10, so 1.0 - the maximum, even though B is twice as long as A. That is what "direction is what counts" means.</p>' +
            '<pre><code>function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i &lt; a.length; i++) {\n    dot += a[i] * b[i];\n    na  += a[i] * a[i];\n    nb  += b[i] * b[i];\n  }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}</code></pre>' +
            '<p>The key difference from full-text search: <code>LIKE</code> and a keyword index look for <em>characters</em>, embeddings look for <em>meaning</em>. The query "my car will not start" surfaces a document about a dead battery even with zero shared words.</p>' +
            '<h4>What it is used for</h4>' +
            '<ul>' +
            '<li><strong>Semantic search</strong> - the foundation of RAG.</li>' +
            '<li><strong>Deduplication</strong> - two tickets above 0.95 similarity are usually the same issue.</li>' +
            '<li><strong>Clustering</strong> - grouping thousands of reviews into themes with no manual tagging.</li>' +
            '<li><strong>Classification</strong> - compare against example category vectors, cheap and training-free.</li>' +
            '</ul>' +
            '<h4>What you must remember</h4>' +
            '<p>An embedding is a one-way vector of meaning, computed once on write and used like a database index. You compare directions, not lengths, so text size does not skew the score. And remember that high similarity says "about the same thing", not "the correct answer".</p>'
        },
        pro: {
          pl: '<p>Embedding to <strong>funkcja skrotu, ktora zachowuje bliskosc znaczen</strong>. Traktuj wektor jak indeks w bazie: liczysz go raz przy zapisie, trzymasz obok rekordu i uzywasz do wyszukiwania. Analogia webowa: to jest twoj indeks wyszukiwania, tylko kluczem jest sens, a nie prefiks stringa.</p>' +
            '<h4>Liczby produkcyjne</h4>' +
            '<ul>' +
            '<li>Koszt: modele embeddingowe kosztuja rzedu 0,02-0,13 USD za milion tokenow, czyli zwykle 10-100 razy taniej niz generacja. Zaembedowanie 100 tysiecy chunkow (fragmentow dokumentu) po 500 tokenow to pojedyncze dolary.</li>' +
            '<li>Wymiary: 1536 wymiarow razy 4 bajty to 6 KB na wektor. Milion wektorow to okolo 6 GB w <code>float32</code> (liczbie zmiennoprzecinkowej o 4 bajtach), ale <strong>kwantyzacja</strong> - zapis tych samych liczb z mniejsza precyzja, np. jako <code>int8</code> - tnie to okolo czterokrotnie przy stracie trafnosci rzedu 1-2 procent.</li>' +
            '<li>Latencja: batch po 100 tekstow na wywolanie zamiast pojedynczych zadan zamienia godziny w minuty.</li>' +
            '<li>Popularne modele: <code>text-embedding-3-small</code> i <code>-large</code> od OpenAI, Voyage (rekomendowany dla Claude), Cohere Embed, a lokalnie rodziny BGE i E5 przez biblioteke sentence-transformers.</li>' +
            '</ul>' +
            '<h4>Pulapki, ktore bola</h4>' +
            '<p><strong>1. Nie mieszaj modeli.</strong> Wektory z dwoch roznych modeli sa nieporownywalne, nawet przy tej samej liczbie wymiarow - kazdy model ma wlasna przestrzen. Zapisuj nazwe i wersje modelu w kolumnie obok wektora; zmiana modelu oznacza pelny reindeks calego korpusu.</p>' +
            '<p><strong>2. Asymetria zapytanie-dokument.</strong> Krotkie pytanie i dlugi akapit zyja w nieco innych rejonach przestrzeni. Modele takie jak E5 wymagaja prefiksow <code>query:</code> i <code>passage:</code>; ich pominiecie potrafi obnizyc <strong>recall</strong> (odsetek trafnych dokumentow, ktore udalo sie znalezc) o kilkanascie punktow.</p>' +
            '<p><strong>3. Podobienstwo to nie trafnosc.</strong> Cosine 0,86 nie znaczy "poprawna odpowiedz". Progi ustalasz empirycznie na <strong>zlotym zbiorze</strong> (recznie przygotowanej liscie zapytan z poprawnymi odpowiedziami), osobno per domena, bo rozklady wynikow sa inne dla kazdego modelu.</p>' +
            '<p><strong>4. Negacja jest niewidoczna.</strong> "Dokument jest wazny" i "dokument jest niewazny" maja bardzo wysokie podobienstwo. Dlatego czyste wyszukiwanie wektorowe przegrywa z hybryda: <strong>BM25</strong> (klasyczny algorytm wyszukiwania po slowach kluczowych) lapie doslowne tokeny, a <strong>reranker</strong> (mniejszy model oceniajacy pare zapytanie-dokument razem) przestawia kolejnosc pierwszych kilkudziesieciu wynikow.</p>' +
            '<pre><code>-- pgvector: kolumna, indeks HNSW, zapytanie\nALTER TABLE chunks ADD COLUMN embedding vector(1536);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\nSELECT id, content, 1 - (embedding &lt;=&gt; $1) AS score\nFROM chunks WHERE tenant_id = $2\nORDER BY embedding &lt;=&gt; $1 LIMIT 8;</code></pre>' +
            '<p>Operator <code>&lt;=&gt;</code> to dystans kosinusowy, wiec sortujesz rosnaco, a wynik zamieniasz na podobienstwo przez <code>1 - dystans</code>. HNSW to typ indeksu przyblizonego: zwraca prawie najblizszych sasiadow w czasie logarytmicznym zamiast skanowac cala tabele. Filtr po <code>tenant_id</code> przed rankingiem to nie kosmetyka, tylko granica bezpieczenstwa - wyciek miedzy najemcami przez wspolny indeks wektorowy to klasyczny incydent.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Wektor jest artefaktem zapisu, nie odczytu - planuj migracje modelu jak migracje schematu bazy, z reindeksem i wersjonowaniem.</li>' +
            '<li>Sam cosine nie wystarczy w produkcji: dolozenie BM25 i rerankera to standardowa poprawka na negacje, nazwy wlasne i skroty.</li>' +
            '<li>Progi podobienstwa mierz na zlotym zbiorze, a filtry bezpieczenstwa zakladaj przed rankingiem, nie po nim.</li>' +
            '</ul>',
          en: '<p>An embedding is a <strong>hash function that preserves closeness of meaning</strong>. Treat the vector like a database index: compute it once on write, store it next to the record, use it for lookup. Web analogy: this is your search index, except the key is meaning rather than a string prefix.</p>' +
            '<h4>Production numbers</h4>' +
            '<ul>' +
            '<li>Cost: embedding models run about 0.02-0.13 USD per million tokens, typically 10-100x cheaper than generation. Embedding 100k chunks (document fragments) of 500 tokens costs single-digit dollars.</li>' +
            '<li>Dimensions: 1536 dims times 4 bytes is 6 KB per vector. A million vectors is roughly 6 GB in <code>float32</code> (a 4-byte floating point number), but <strong>quantization</strong> - storing the same numbers at lower precision, for example as <code>int8</code> - cuts that about fourfold for a 1-2 percent accuracy loss.</li>' +
            '<li>Latency: batching 100 texts per call instead of one-by-one turns hours into minutes.</li>' +
            '<li>Common models: <code>text-embedding-3-small</code> and <code>-large</code> from OpenAI, Voyage (recommended alongside Claude), Cohere Embed, and locally the BGE and E5 families via the sentence-transformers library.</li>' +
            '</ul>' +
            '<h4>Pitfalls that hurt</h4>' +
            '<p><strong>1. Never mix models.</strong> Vectors from two different models are incomparable even at identical dimensionality - every model has its own space. Store the model name and version in a column beside the vector; swapping models means reindexing the entire corpus.</p>' +
            '<p><strong>2. Query-document asymmetry.</strong> A short question and a long paragraph live in slightly different regions of the space. Models like E5 require <code>query:</code> and <code>passage:</code> prefixes; skipping them can cost you double-digit <strong>recall</strong> points (recall being the share of relevant documents you actually found).</p>' +
            '<p><strong>3. Similarity is not relevance.</strong> Cosine 0.86 does not mean "correct answer". Thresholds are set empirically on a <strong>golden set</strong> (a hand-built list of queries with known correct answers), per domain, because score distributions differ for every model.</p>' +
            '<p><strong>4. Negation is invisible.</strong> "The document is valid" and "the document is not valid" score very close together. That is why pure vector search loses to a hybrid: <strong>BM25</strong> (the classic keyword ranking algorithm) catches literal tokens, and a <strong>reranker</strong> (a smaller model scoring the query and document jointly) reorders the top few dozen results.</p>' +
            '<pre><code>-- pgvector: column, HNSW index, query\nALTER TABLE chunks ADD COLUMN embedding vector(1536);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\nSELECT id, content, 1 - (embedding &lt;=&gt; $1) AS score\nFROM chunks WHERE tenant_id = $2\nORDER BY embedding &lt;=&gt; $1 LIMIT 8;</code></pre>' +
            '<p>The <code>&lt;=&gt;</code> operator is cosine distance, so you sort ascending and convert to similarity via <code>1 - distance</code>. HNSW is an approximate index type: it returns almost-nearest neighbours in logarithmic time instead of scanning the whole table. Filtering by <code>tenant_id</code> before ranking is not cosmetic but a security boundary - cross-tenant leakage through a shared vector index is a classic incident.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>The vector is a write-path artifact - plan an embedding model change like a schema migration, with a reindex and versioning.</li>' +
            '<li>Cosine alone is not enough in production: adding BM25 and a reranker is the standard fix for negation, proper nouns and acronyms.</li>' +
            '<li>Measure similarity thresholds on a golden set, and apply security filters before ranking, never after.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego zdania "jak zmienic haslo" i "zapomnialem loginu" trafiaja obok siebie na mapie znaczen?',
            en: 'Why do "how do I change my password" and "I forgot my login" land next to each other on the map of meaning?'
          },
          options: [
            { pl: 'Bo maja podobna dlugosc w znakach', en: 'Because they have a similar character length' },
            { pl: 'Bo dziela wiekszosc slow kluczowych', en: 'Because they share most of their keywords' },
            { pl: 'Bo znacza mniej wiecej to samo, a adres jest liczony ze znaczenia, nie ze slow', en: 'Because they mean roughly the same thing, and the address is computed from meaning, not words' },
            { pl: 'Bo obie zaczynaja sie od pytania', en: 'Because both are phrased as questions' }
          ],
          correct: 2,
          explain: {
            pl: 'To jest cala poanta embeddingow: sasiedztwo wynika ze znaczenia. Te dwa zdania nie maja ani jednego wspolnego slowa, a i tak sa sasiadami.',
            en: 'That is the whole point of embeddings: neighbourhood comes from meaning. Those two sentences share no words at all and are still neighbours.'
          }
        },
        {
          q: {
            pl: 'Czym jest embedding?',
            en: 'What is an embedding?'
          },
          options: [
            { pl: 'Skompresowana wersja tekstu, ktora da sie z powrotem rozpakowac', en: 'A compressed version of the text that can be decompressed' },
            { pl: 'Wektor liczb o stalej dlugosci reprezentujacy znaczenie tekstu', en: 'A fixed-length vector of numbers representing the meaning of the text' },
            { pl: 'Lista tokenow po tokenizacji', en: 'The list of tokens after tokenization' },
            { pl: 'Suma kontrolna uzywana do cachowania promptu', en: 'A checksum used for prompt caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Embedding jest jednokierunkowy - nie odtworzysz z niego oryginalnego tekstu, ale mozesz mierzyc podobienstwo znaczen. Dlugosc wektora nie zalezy od dlugosci tekstu.',
            en: 'An embedding is one-way - you cannot reconstruct the original text from it, but you can measure semantic similarity. Its length does not depend on the text length.'
          }
        },
        {
          q: {
            pl: 'Wektory A = [3, 4] i B = [6, 8]. Ile wynosi ich podobienstwo kosinusowe i dlaczego?',
            en: 'Vectors A = [3, 4] and B = [6, 8]. What is their cosine similarity, and why?'
          },
          options: [
            { pl: '0,5 - bo A jest dwa razy krotszy od B', en: '0.5 - because A is half the length of B' },
            { pl: '1,0 - bo maja identyczny kierunek, a dlugosc nie ma znaczenia', en: '1.0 - because they point in the same direction and length does not matter' },
            { pl: '50 - bo tyle wynosi iloczyn skalarny', en: '50 - because that is the dot product' },
            { pl: '0 - bo nie maja wspolnych slow', en: '0 - because they share no words' }
          ],
          correct: 1,
          explain: {
            pl: 'Iloczyn skalarny 50 dzielimy przez iloczyn dlugosci 5 i 10, czyli 1,0. Dzielenie przez dlugosci sprawia, ze dlugi dokument nie wygrywa tylko dlatego, ze jest dlugi.',
            en: 'The dot product 50 divided by the lengths 5 and 10 gives 1.0. Dividing by the lengths is what stops a long document from winning just for being long.'
          }
        },
        {
          q: {
            pl: 'Wyszukiwarka wektorowa nad regulaminami dostaje zapytanie "umowy, ktore NIE wymagaja zgody rodzica" i zwraca fragmenty o umowach, ktore te zgode wymagaja. Dlaczego tak sie dzieje i co pomoze najbardziej?',
            en: 'A vector search over policy documents gets the query "contracts that do NOT require parental consent" and returns passages about contracts that do require it. Why, and what helps most?'
          },
          options: [
            { pl: 'Za maly wymiar wektora; przejsc na model 3072-wymiarowy', en: 'Vector dimension too small; move to a 3072-dim model' },
            { pl: 'Zla temperatura wyszukiwania; ustawic ja na 0', en: 'Wrong search temperature; set it to 0' },
            { pl: 'Oba zdania sa o tym samym temacie, a przeczenie prawie nie przesuwa wektora; pomoze hybryda z wyszukiwaniem po slowach kluczowych i reranker', en: 'Both sentences are about the same topic and the negation barely moves the vector; a keyword-search hybrid plus a reranker helps' },
            { pl: 'Uszkodzony indeks; przejsc na pelne skanowanie tabeli', en: 'Corrupted index; switch to a full table scan' }
          ],
          correct: 2,
          explain: {
            pl: 'Wysoki cosine mowi "o tym samym", a nie "odpowiada na pytanie". Wyszukiwanie po slowach kluczowych lapie doslowne NIE, a reranker ocenia pare zapytanie-dokument razem i przestawia kolejnosc.',
            en: 'A high cosine says "about the same thing", not "answers the question". Keyword search catches the literal NOT, and a reranker scores the query-document pair jointly and reorders it.'
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
      minutes: 11,
      terms: [
        {
          term: { pl: 'temperature', en: 'temperature' },
          def: {
            pl: 'Skaluje logity przed <code>softmax</code>: nizsza wartosc wyostrza rozklad (bezpieczniej, nudniej), wyzsza splaszcza (kreatywniej, wiecej bledow). Do ekstrakcji i tool callingu 0, do burzy mozgow 0.8-1.',
            en: 'Scales the logits before <code>softmax</code>: lower sharpens the distribution (safer, duller), higher flattens it (more creative, more errors). Use 0 for extraction and tool calling, 0.8-1.0 for brainstorming.'
          }
        },
        {
          term: { pl: 'top_p', en: 'top_p (nucleus sampling)' },
          def: {
            pl: 'Obcina ogon rozkladu: bierze najmniejszy zbior tokenow o lacznym prawdopodobienstwie p i losuje tylko z niego. Zwykle stroi sie temperature <em>albo</em> top_p, nie oba naraz.',
            en: 'Truncates the tail: take the smallest set of tokens whose probability sums to p and sample only from it. Tune temperature <em>or</em> top_p, not both at once.'
          }
        },
        {
          term: { pl: 'top_k', en: 'top_k' },
          def: {
            pl: 'Prostszy wariant obcinania: zostaw k najbardziej prawdopodobnych tokenow i z nich losuj. Stala liczba niezaleznie od tego, czy model jest pewny, czy waha sie miedzy dziesiatkami opcji.',
            en: 'The simpler truncation: keep the k most probable tokens and sample from those. A fixed count regardless of whether the model is confident or torn between dozens of options.'
          }
        },
        {
          term: { pl: 'niedeterminizm przy temperature 0', en: 'nondeterminism at temperature 0' },
          def: {
            pl: 'Nawet greedy decoding nie daje gwarancji identycznych odpowiedzi: batching, kolejnosc sumowania na GPU, MoE routing i zmiany wersji modelu psuja powtarzalnosc. Testy pisz na asercjach, nie na porownaniu stringow.',
            en: 'Even greedy decoding does not guarantee identical answers: batching, GPU reduction order, MoE routing and silent model updates break reproducibility. Write assertions in tests, not string equality.'
          }
        },
        {
          term: { pl: 'seed', en: 'seed' },
          def: {
            pl: 'Parametr ustalajacy losowanie, oferowany przez czesc API. Zwieksza powtarzalnosc w obrebie tej samej wersji modelu, ale nie jest kontraktem - traktuj go jako best effort.',
            en: 'A parameter that fixes the sampling randomness, offered by some APIs. It improves reproducibility within one model version but is not a contract - treat it as best effort.'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Jedne logity, cztery ustawienia temperature: widac, jak to samo wyjscie modelu zmienia sie w cztery rozne zachowania.',
            en: 'One set of logits, four temperature settings: watch the same model output turn into four different behaviours.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Raw logits from the model - identical in every frame') +
                fBar(60, 'refund', 300, 'var(--muted)', 'logit 4.2') +
                fBar(96, 'refunded', 250, 'var(--muted)', 'logit 3.6') +
                fBar(132, 'reimburse', 150, 'var(--muted)', 'logit 2.1') +
                fBar(168, 'repay', 90, 'var(--muted)', 'logit 1.2') +
                fText(28, 226, 'Logits are raw scores. Sampling turns them into a choice.', 14, 'var(--muted)') +
                fText(28, 252, 'probs = softmax(logits / temperature)', 14, 'var(--accent)') +
                fPanel('Temperature does not change the model', 'It only rescales these four numbers before softmax.', 'Same weights, same prompt, different post-processing.', 'var(--accent)')
              ),
              label: { pl: '1. Surowe logity', en: '1. Raw logits' },
              note: {
                pl: 'Model zawsze zwraca te same logity dla tego samego wejscia. Temperature to operacja na nich, juz po wyjsciu z sieci.',
                en: 'The model always returns the same logits for the same input. Temperature is an operation on them, after the network is done.'
              }
            },
            {
              svg: svgFrame(
                fHead('temperature 0 - the favourite absorbs everything') +
                fBar(60, 'refund', 400, 'var(--ok)', '1.00') +
                fBar(96, 'refunded', 4, 'var(--accent2)', '0.00') +
                fBar(132, 'reimburse', 2, 'var(--accent2)', '0.00') +
                fBar(168, 'repay', 2, 'var(--accent2)', '0.00') +
                fText(28, 226, 'Dividing by a value below 1 magnifies the gaps.', 14, 'var(--muted)') +
                fText(28, 252, 'Use for: extraction, classification, JSON, tool calling.', 14, 'var(--ok)') +
                fPanel('Predictable and slightly stiff', 'You get a contract, not a style - which is exactly what parsers want.', 'Downside: repetitive phrasing and loops in long prose.', 'var(--ok)')
              ),
              label: { pl: '2. temperature 0', en: '2. temperature 0' },
              note: {
                pl: 'Dzielenie logitow przez wartosc blisko zera wyostrza rozklad tak, ze wygrywa wylacznie faworyt. To ustawienie do danych, nie do prozy.',
                en: 'Dividing the logits by a near-zero value sharpens the distribution so only the favourite can win. This is the setting for data, not prose.'
              }
            },
            {
              svg: svgFrame(
                fHead('temperature 0.7 - the working default for prose') +
                fBar(60, 'refund', 300, 'var(--accent)', '0.55') +
                fBar(96, 'refunded', 170, 'var(--accent)', '0.30') +
                fBar(132, 'reimburse', 60, 'var(--accent2)', '0.10') +
                fBar(168, 'repay', 28, 'var(--accent2)', '0.05') +
                fText(28, 226, 'The runner-up now wins roughly one time in three.', 14, 'var(--muted)') +
                fText(28, 252, 'Use for: chat, summaries, explanations, support replies.', 14, 'var(--accent)') +
                fPanel('Natural language without factual drift', 'Enough variation to avoid robotic repetition.', 'Not enough to invent API methods that do not exist.', 'var(--accent)')
              ),
              label: { pl: '3. temperature 0.7', en: '3. temperature 0.7' },
              note: {
                pl: 'Srodkowe ustawienie daje jezykowi naturalnosc, nie ruszajac zbytnio faktow. To sensowny domyslny wybor dla tekstu czytanego przez ludzi.',
                en: 'The middle setting makes language natural without moving facts much. It is the sensible default for text humans read.'
              }
            },
            {
              svg: svgFrame(
                fHead('temperature 1.4 - the tail wakes up') +
                fBar(60, 'refund', 170, 'var(--warn)', '0.32') +
                fBar(96, 'refunded', 140, 'var(--warn)', '0.27') +
                fBar(132, 'reimburse', 110, 'var(--warn)', '0.22') +
                fBar(168, 'repay', 95, 'var(--warn)', '0.19') +
                fText(28, 226, 'Everything looks almost equally good to the sampler now.', 14, 'var(--warn)') +
                fText(28, 252, 'Use for: brainstorming names, slogans, variant copy.', 14, 'var(--warn)') +
                fPanel('Creativity and errors are the same dial', 'High temperature is exactly why invented API methods show up in code.', 'Never raise it to fix a boring answer - that is a prompt problem.', 'var(--err)')
              ),
              label: { pl: '4. temperature 1.4', en: '4. temperature 1.4' },
              note: {
                pl: 'Splaszczony rozklad daje szanse wszystkim kandydatom. Ten sam mechanizm produkuje ciekawe pomysly i nieistniejace nazwy metod.',
                en: 'A flattened distribution gives every candidate a chance. The same mechanism produces interesting ideas and non-existent method names.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'top_p kontra top_k: dlaczego obciecie nucleus dopasowuje sie do pewnosci modelu, a sztywne k nie.',
            en: 'top_p versus top_k: why a nucleus cut adapts to the model confidence and a fixed k does not.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Confident step: top_p 0.9 keeps a single token') +
                fBar(60, 'Paris', 330, 'var(--ok)', '0.94') +
                fBar(96, 'Lyon', 12, 'var(--muted)', '0.02') +
                fBar(132, 'Nice', 8, 'var(--muted)', '0.01') +
                '<line x1="410" y1="50" x2="410" y2="152" stroke="var(--err)" stroke-width="2"/>' +
                fText(418, 106, 'cut', 14, 'var(--err)') +
                fText(28, 196, 'Running sum reaches 0.9 after the first token, so the', 14, 'var(--muted)') +
                fText(28, 220, 'nucleus is exactly one token wide. Nothing else can win.', 14, 'var(--muted)') +
                fPanel('The cut follows the shape of the distribution', 'When the model is sure, top_p behaves like greedy decoding.', 'No creativity is added where there was no real doubt.', 'var(--ok)')
              ),
              label: { pl: '1. Model pewny', en: '1. Confident model' },
              note: {
                pl: 'Sumujesz prawdopodobienstwa od najwiekszego, az przekrocza p. Przy pewnym modelu wystarczy jeden token i ogon zostaje odciety.',
                en: 'You sum probabilities from the largest until they pass p. With a confident model one token is enough and the tail is cut off.'
              }
            },
            {
              svg: svgFrame(
                fHead('Uncertain step: the same top_p 0.9 keeps many') +
                fBar(60, 'however', 90, 'var(--accent2)', '0.16') +
                fBar(96, 'although', 84, 'var(--accent2)', '0.15') +
                fBar(132, 'but', 78, 'var(--accent2)', '0.14') +
                fBar(168, 'yet', 70, 'var(--accent2)', '0.13') +
                fBar(204, '18 more tokens', 180, 'var(--accent2)', '0.32 total') +
                '<line x1="400" y1="50" x2="400" y2="228" stroke="var(--err)" stroke-width="2"/>' +
                fText(408, 140, 'cut', 14, 'var(--err)') +
                fPanel('Same parameter, twenty-two survivors', 'Where the model genuinely hesitates, variety is allowed through.', 'That adaptivity is the whole point of nucleus sampling.', 'var(--accent2)')
              ),
              label: { pl: '2. Model niepewny', en: '2. Uncertain model' },
              note: {
                pl: 'Ten sam parametr przy plaskim rozkladzie przepuszcza kilkadziesiat tokenow. Obciecie jest adaptacyjne - zalezy od ksztaltu rozkladu, nie od stalej liczby.',
                en: 'The same parameter on a flat distribution lets dozens of tokens through. The cut is adaptive - it depends on the shape, not on a fixed count.'
              }
            },
            {
              svg: svgFrame(
                fHead('top_k 5 on both steps - the rigid alternative') +
                fBox(20, 50, 290, 110, 'confident step', 'keeps 5, four of them junk', 'var(--warn)') +
                fText(40, 132, 'lets 0.06 of nonsense into a settled choice', 13, 'var(--warn)') +
                fBox(330, 50, 290, 110, 'uncertain step', 'keeps 5, discards 17 good ones', 'var(--warn)') +
                fText(350, 132, 'throws away real variety where it was wanted', 13, 'var(--warn)') +
                fText(28, 200, 'Rule that keeps teams sane: tune temperature OR top_p,', 14, 'var(--accent)') +
                fText(28, 224, 'never both, and leave top_k alone unless you have a reason.', 14, 'var(--accent)') +
                fPanel('Two knobs on the same effect are unmeasurable', 'If you change both, you cannot attribute a quality change to either.', 'Pick one dial, write it down per task, and keep the other default.', 'var(--accent)')
              ),
              label: { pl: '3. Sztywne top_k', en: '3. Rigid top_k' },
              note: {
                pl: 'Stale k jest zawsze zle w jedna albo w druga strone. Praktyczna zasada: strojisz temperature albo top_p, nigdy oba naraz.',
                en: 'A fixed k is always wrong in one direction or the other. Practical rule: tune temperature or top_p, never both at once.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Dlaczego temperature 0 nie daje powtarzalnosci bit w bit i co z tego wynika dla testow.',
            en: 'Why temperature 0 does not give bit-for-bit reproducibility, and what that means for tests.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Run A: two candidates almost tied at step 12') +
                fBar(70, 'approximately', 300, 'var(--accent)', 'score 7.4213') +
                fBar(106, 'roughly', 299, 'var(--accent2)', 'score 7.4211') +
                fText(28, 168, 'Difference: 0.0002 - smaller than the rounding noise of a', 14, 'var(--muted)') +
                fText(28, 192, 'parallel floating-point sum across thousands of GPU cores.', 14, 'var(--muted)') +
                fText(28, 226, 'Temperature 0 says: take the higher one. Which is higher', 14, 'var(--warn)') +
                fText(28, 250, 'depends on the order the hardware added the numbers.', 14, 'var(--warn)') +
                fPanel('Greedy decoding is deterministic in theory', 'Addition of floats is not associative, and GPU reduction order varies.', 'Batch composition alone can change that order between calls.', 'var(--warn)')
              ),
              label: { pl: '1. Remis', en: '1. A near tie' },
              note: {
                pl: 'Gdy dwa tokeny maja niemal identyczny wynik, o wyborze decyduje szum arytmetyki na GPU. Temperature 0 tego nie usuwa.',
                en: 'When two tokens score almost identically, GPU arithmetic noise decides. Temperature 0 does not remove that.'
              }
            },
            {
              svg: svgFrame(
                fHead('Run B: the tie flips, and the text diverges') +
                fChip(20, 60, 150, 'tokens 1-11', 'var(--surface)', 'var(--ok)') +
                fChip(180, 60, 160, 'approximately', 'var(--surface)', 'var(--accent)') +
                fChip(350, 60, 250, 'continues one way', 'var(--surface)', 'var(--border)') +
                fChip(20, 120, 150, 'tokens 1-11', 'var(--surface)', 'var(--ok)') +
                fChip(180, 120, 160, 'roughly', 'var(--surface)', 'var(--err)') +
                fChip(350, 120, 250, 'continues another way', 'var(--surface)', 'var(--err)') +
                fText(28, 196, 'One different token becomes part of the input for every', 14, 'var(--err)') +
                fText(28, 220, 'later step, so the whole rest of the answer can change.', 14, 'var(--err)') +
                fText(28, 252, 'Meaning usually survives. Byte equality does not.', 14, 'var(--muted)') +
                fPanel('Autoregression amplifies tiny differences', 'This is the same feedback loop that generates the text in the first place.', 'A seed parameter raises the odds of a repeat, it does not guarantee one.', 'var(--err)')
              ),
              label: { pl: '2. Rozjazd', en: '2. Divergence' },
              note: {
                pl: 'Jeden zamieniony token wchodzi do kontekstu kolejnych krokow, wiec dalsza czesc odpowiedzi moze pojsc inna sciezka. Sens zwykle zostaje, bajty nie.',
                en: 'One swapped token enters the context of every later step, so the rest of the answer can take a different path. Meaning usually survives, bytes do not.'
              }
            },
            {
              svg: svgFrame(
                fHead('What to assert in tests instead') +
                fBox(20, 50, 290, 116, 'do not do this', 'expect(text).toBe(snapshot)', 'var(--err)') +
                fText(40, 138, 'flaky, and the team stops trusting the suite', 13, 'var(--err)') +
                fBox(330, 50, 290, 116, 'do this', 'schema + properties + evals', 'var(--ok)') +
                fText(350, 138, 'stable across model versions and hardware', 13, 'var(--ok)') +
                fText(28, 198, 'schema: does it parse against the zod contract at all', 13, 'var(--muted)') +
                fText(28, 222, 'properties: is the amount equal to the amount in the source', 13, 'var(--muted)') +
                fText(28, 246, 'evals: does the score on 200 golden cases stay above target', 13, 'var(--muted)') +
                fPanel('Treat model output like a network response', 'You never snapshot a third-party API body byte for byte either.', 'You validate its shape and the invariants you actually depend on.', 'var(--ok)')
              ),
              label: { pl: '3. Jak testowac', en: '3. How to test' },
              note: {
                pl: 'Zamiast snapshotu na string asertujesz schemat, wlasnosci wyniku i zbiorcze metryki z evalow. To jedyna strategia, ktora przezywa zmiane wersji modelu.',
                en: 'Instead of a string snapshot you assert the schema, output properties and aggregate eval metrics. That is the only strategy that survives a model version change.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Po kazdym kroku model ma liste kandydatow na nastepny kawalek slowa, kazdy z jakas szansa. I teraz pytanie: czy zawsze bierzemy faworyta, czy czasem pozwalamy wygrac komus z drugiego rzedu?</p>' +
            '<p>Od tego jest <strong>temperature</strong>, czyli pokretlo szalenstwa. Ustawione na zero sprawia, ze model zawsze wybiera faworyta. Jest przewidywalny i troche nudny, jak kucharz, ktory od dwudziestu lat gotuje ten sam rosol - zawsze dobry, nigdy zaskakujacy. Podkrecone wysoko pozwala wygrywac outsiderom. Robi sie ciekawiej, ale co jakis czas wychodzi rosol z czekolada.</p>' +
            '<p>Jest jeszcze <strong>top_p</strong>, czyli bramkarz przy wejsciu do klubu. Mowi tak: do losowania wpuszczam tylko tych kandydatow, ktorzy razem zbieraja wiekszosc szans, a caly ogon dziwakow zostaje na ulicy. Fajne w tym bramkarzu jest to, ze sam sie dostosowuje - gdy jeden kandydat jest oczywistym faworytem, wpuszcza tylko jego, a gdy wszyscy sa podobni, wpuszcza cale towarzystwo.</p>' +
            '<p>Prosta zasada na co dzien: gdy chcesz porzadne dane, krec w dol. Gdy chcesz pomyslow na nazwe firmy, krec w gore. I nie krec obydwoma pokretlami naraz, bo potem nie wiesz, ktore cos zepsulo.</p>',
          en: '<p>At every step the model holds a list of candidates for the next chunk of a word, each with some chance. And the question is: do we always take the favourite, or do we sometimes let a runner-up win?</p>' +
            '<p>That is what <strong>temperature</strong>, the chaos dial, is for. Set to zero it makes the model always pick the favourite. Predictable and slightly boring, like a cook who has made the same soup for twenty years - always good, never surprising. Turned up high, outsiders get to win. More interesting, but every so often you get soup with chocolate in it.</p>' +
            '<p>There is also <strong>top_p</strong>, the bouncer at the club door. It says: only candidates that together hold most of the probability get into the draw, the whole tail of weirdos stays out on the street. The nice thing about this bouncer is that it adjusts itself - when one candidate is the obvious favourite it lets only that one in, and when everyone looks similar it lets the whole crowd through.</p>' +
            '<p>The everyday rule: when you want solid data, turn it down. When you want ideas for a company name, turn it up. And do not turn both dials at once, or you will never know which one broke things.</p>'
        },
        school: {
          pl: '<p>Model zwraca <strong>logity</strong>, czyli surowe wyniki liczbowe dla kazdego tokena w slowniku. Zanim padnie wybor, przechodza one przez warstwe samplingu - i to wlasnie ta warstwa jest sterowana parametrami.</p>' +
            '<h4>temperature</h4>' +
            '<p>Logity sa dzielone przez temperature, a dopiero potem idzie <strong>softmax</strong> (funkcja zamieniajaca dowolne liczby na prawdopodobienstwa sumujace sie do jedynki). Dzielenie przez wartosc mniejsza od 1 wyostrza roznice - faworyt zjada niemal cale prawdopodobienstwo. Dzielenie przez wieksza od 1 splaszcza rozklad i daje szanse slabszym kandydatom. Zakres to zwykle 0 do 2, domyslnie okolo 1.</p>' +
            '<pre><code>probs = softmax(logits / temperature)</code></pre>' +
            '<h4>Worked example: te same cztery liczby</h4>' +
            '<p>Zalozmy logity: refund 4,2 / refunded 3,6 / reimburse 2,1 / repay 1,2. Przy temperature 0 wynik to praktycznie 1,00 dla refund i zera dla reszty. Przy 0,7 rozklad wyglada mniej wiecej 0,55 / 0,30 / 0,10 / 0,05 - drugi kandydat wygrywa mniej wiecej co trzecie losowanie. Przy 1,4 wszystko splaszcza sie do okolo 0,32 / 0,27 / 0,22 / 0,19, wiec nawet najslabszy token wchodzi co piaty raz. Model sie nie zmienil - zmienilo sie tylko przeliczenie jego wyjscia.</p>' +
            '<h4>top_p (nucleus sampling)</h4>' +
            '<p>Sortujesz tokeny malejaco po prawdopodobienstwie i bierzesz tylko tyle, ile potrzeba, by ich suma osiagnela p (na przyklad 0,9). Reszta jest odrzucana i losujesz z tego okrojonego zbioru. To obciecie adaptacyjne: gdy model jest pewny, zostaje jeden token; gdy sie waha, zostaje ich kilkadziesiat. Jest tez <strong>top_k</strong>, ktore po prostu bierze k najlepszych tokenow - prostsze, ale sztywne.</p>' +
            '<h4>Dlaczego temperature 0 to nie jest pelna powtarzalnosc</h4>' +
            '<p>Formalnie temperatura 0 oznacza wybor najbardziej prawdopodobnego tokena, wiec powinno byc powtarzalne. W realnym API tak nie jest: obliczenia na kartach graficznych sa rownolegle, a dodawanie liczb zmiennoprzecinkowych w roznej kolejnosci daje minimalnie rozne wyniki. Gdy dwa tokeny maja niemal identyczny wynik, ten szum decyduje - a jeden zmieniony token rozjezdza cala dalsza generacje.</p>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Temperature skaluje logity przed softmaxem, a top_p obcina ogon rozkladu; oba zmieniaja losowanie, nie model. Ustawiaj je per zadanie: nisko do danych, wysoko do pomyslow. I nie strojisz obu naraz, bo nie da sie wtedy przypisac efektu.</p>',
          en: '<p>The model returns <strong>logits</strong> - raw numeric scores for every token in the vocabulary. Before a choice is made they pass through the sampling layer, and that layer is what your parameters control.</p>' +
            '<h4>temperature</h4>' +
            '<p>Logits are divided by temperature and only then go through <strong>softmax</strong> (the function that turns arbitrary numbers into probabilities summing to one). Dividing by a value below 1 sharpens the differences - the favourite absorbs nearly all the probability. Dividing by a value above 1 flattens the distribution and gives weaker candidates a chance. The usual range is 0 to 2, with a default around 1.</p>' +
            '<pre><code>probs = softmax(logits / temperature)</code></pre>' +
            '<h4>Worked example: the same four numbers</h4>' +
            '<p>Say the logits are refund 4.2 / refunded 3.6 / reimburse 2.1 / repay 1.2. At temperature 0 the result is essentially 1.00 for refund and zero for the rest. At 0.7 the distribution is roughly 0.55 / 0.30 / 0.10 / 0.05 - the runner-up wins about one draw in three. At 1.4 everything flattens to about 0.32 / 0.27 / 0.22 / 0.19, so even the weakest token gets in one time in five. The model did not change - only the post-processing of its output did.</p>' +
            '<h4>top_p (nucleus sampling)</h4>' +
            '<p>Sort tokens by descending probability and keep only as many as needed for their sum to reach p (say 0.9). The rest are discarded and you sample from that truncated set. It is an adaptive cutoff: when the model is confident, one token survives; when it hesitates, dozens do. There is also <strong>top_k</strong>, which simply keeps the k best tokens - simpler, but rigid.</p>' +
            '<h4>Why temperature 0 is not full reproducibility</h4>' +
            '<p>Formally, temperature 0 means always picking the most probable token, so it should repeat exactly. On a real API it does not: graphics card computation is parallel, and adding floating-point numbers in a different order yields slightly different results. When two tokens score nearly the same, that noise decides - and one flipped token derails the whole rest of the generation.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Temperature scales the logits before softmax and top_p truncates the tail; both change the draw, not the model. Set them per task: low for data, high for ideas. And do not tune both at once, because then you cannot attribute the effect.</p>'
        },
        pro: {
          pl: '<p>Sampling to jedyna warstwa, w ktorej wprost sterujesz kompromisem miedzy powtarzalnoscia a roznorodnoscia. Ustawiaj ja per zadanie, nie globalnie w kliencie - to ta sama logika, co poziomy logowania: inny dla ekstrakcji, inny dla copy.</p>' +
            '<h4>Ustawienia, ktore broni sie w produkcji</h4>' +
            '<ul>' +
            '<li><strong>Ekstrakcja, klasyfikacja, tool calling</strong> (wywolywanie przez model twoich funkcji), <strong>generowanie JSON</strong>: temperature 0 do 0,2. Chcesz stabilnego kontraktu, nie stylu.</li>' +
            '<li><strong>Streszczenia, wyjasnienia, chat wsparcia</strong>: 0,5 do 0,8. Naturalny jezyk bez dryfu faktow.</li>' +
            '<li><strong>Burza mozgow, warianty nazw, copy marketingowe</strong>: 0,9 do 1,2.</li>' +
            '<li><strong>Kod</strong>: nisko, 0 do 0,3. Wyzsza temperatura czesciej wymysla nieistniejace metody API - to nie anegdota, tylko bezposredni skutek splaszczenia ogona rozkladu.</li>' +
            '</ul>' +
            '<p>Uwaga na modele rozumujace (reasoning models - takie, ktore przed odpowiedzia generuja wewnetrzny lancuch mysli). Czesc z nich ignoruje albo wprost odrzuca temperature, bo sciezka rozumowania ma wlasny rezim samplingu. Sprawdz dokumentacje, zanim wpiszesz parametr do wspolnego wrappera dla wszystkich modeli.</p>' +
            '<pre><code>const cfg = {\n  extract:   { temperature: 0 },\n  summarize: { temperature: 0.6 },\n  ideate:    { temperature: 1.0 }\n};\nconst res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 800,\n  ...cfg[taskKind],\n  messages\n});</code></pre>' +
            '<h4>Powtarzalnosc, ktorej naprawde mozesz oczekiwac</h4>' +
            '<p>Nie ma gwarancji bit w bit. Nawet z temperature 0 zmienia sie wersja modelu, generacja sprzetu i kolejnosc redukcji zmiennoprzecinkowej; dochodzi do tego <strong>batching</strong> (laczenie requestow wielu uzytkownikow w jedna paczke na GPU), ktory zmienia te kolejnosc miedzy wywolaniami, oraz w modelach typu MoE (mixture of experts - siec z wieloma podsieciami i routerem wybierajacym kilka z nich) routing zalezny od skladu batcha. OpenAI oferuje parametr <code>seed</code> plus pole <code>system_fingerprint</code>, ktore zwieksza szanse na powtorzenie i pozwala wykryc zmiane backendu, ale to nadal best effort, nie kontrakt.</p>' +
            '<p>Wniosek dla testow: asertujesz na schemacie (zod), na wlasnosciach wyniku - czy wyciagniete pole ma poprawny format, czy kwota zgadza sie z kwota w zrodle - oraz na metrykach zbiorczych z evalow (automatycznych testow jakosci na zbiorze przykladow). Snapshot na dokladny string bedzie flaky i po dwoch tygodniach zespol zacznie go slepo akceptowac.</p>' +
            '<h4>Anty-wzorce</h4>' +
            '<p>Podnoszenie temperatury, zeby "naprawic" nudne odpowiedzi - to problem promptu, nie samplingu. Ustawianie temperature 0 dla wszystkiego - daje sztywne sformulowania i petle w dluzszych tekstach. Krecenie obu pokretel naraz - traci sie mozliwosc przypisania efektu. I klasyk: temperature 0,7 w wywolaniu, ktore ma zwrocic JSON zgodny ze schematem, czyli po prostu wyzszy odsetek retry.</p>' +
            '<p>Warto tez pamietac, ze sampling nie jest jedyna dzwignia roznorodnosci. Gdy potrzebujesz pieciu roznych propozycji, czesto lepiej dziala jedno wywolanie proszace o piec wariantow z jawnym wymogiem, by sie od siebie roznily, niz piec wywolan z podkrecona temperatura - jest taniej, szybciej, a model sam pilnuje, zeby warianty nie byly powtorzeniami.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Trzymaj mape zadanie -> parametry w kodzie, tak jak konfiguracje logowania; jedno globalne ustawienie zawsze bedzie zle dla polowy wywolan.</li>' +
            '<li>Powtarzalnosc traktuj jako statystyczna, nie binarna - buduj testy na kontrakcie i evalach, nie na rownosci stringow.</li>' +
            '<li>Roznorodnosc czesto taniej kupisz jednym promptem o n wariantow niz podkrecaniem temperatury.</li>' +
            '</ul>',
          en: '<p>Sampling is the only layer where you steer the reproducibility-versus-diversity tradeoff directly. Set it per task, never globally in the client - the same logic as log levels: one setting for extraction, another for copywriting.</p>' +
            '<h4>Settings that hold up in production</h4>' +
            '<ul>' +
            '<li><strong>Extraction, classification, tool calling</strong> (letting the model invoke your functions), <strong>JSON generation</strong>: temperature 0 to 0.2. You want a stable contract, not style.</li>' +
            '<li><strong>Summaries, explanations, support chat</strong>: 0.5 to 0.8. Natural language without factual drift.</li>' +
            '<li><strong>Brainstorming, name variants, marketing copy</strong>: 0.9 to 1.2.</li>' +
            '<li><strong>Code</strong>: low, 0 to 0.3. Higher temperature invents non-existent API methods far more often - not an anecdote but a direct consequence of flattening the tail.</li>' +
            '</ul>' +
            '<p>Watch out for reasoning models (models that generate an internal chain of thought before answering). Several of them ignore or explicitly reject temperature, because the reasoning trace has its own sampling regime. Check the docs before you bake the parameter into a shared wrapper for all models.</p>' +
            '<pre><code>const cfg = {\n  extract:   { temperature: 0 },\n  summarize: { temperature: 0.6 },\n  ideate:    { temperature: 1.0 }\n};\nconst res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 800,\n  ...cfg[taskKind],\n  messages\n});</code></pre>' +
            '<h4>The reproducibility you can actually expect</h4>' +
            '<p>There is no bit-for-bit guarantee. Even at temperature 0 the model version, the hardware generation and the floating-point reduction order all vary; on top of that <strong>batching</strong> (packing requests from many users into one GPU batch) changes that order between calls, and in MoE models (mixture of experts - a network of many sub-networks with a router picking a few) the routing itself depends on batch composition. OpenAI exposes a <code>seed</code> parameter plus a <code>system_fingerprint</code> field, which improves the odds of a repeat and lets you detect a backend change, but it is still best effort, not a contract.</p>' +
            '<p>Testing consequence: assert on schema (zod), on output properties - does the extracted field have the right format, does the amount match the amount in the source - and on aggregate metrics from evals (automated quality tests over a set of examples). A snapshot on the exact string will be flaky, and within two weeks the team will start approving diffs blindly.</p>' +
            '<h4>Anti-patterns</h4>' +
            '<p>Raising temperature to "fix" boring answers - that is a prompt problem, not a sampling one. Setting temperature 0 everywhere - it produces stiff phrasing and looping in longer texts. Turning both knobs at once - you lose attribution of the effect. And the classic: temperature 0.7 on a call that must return schema-valid JSON, which simply buys you a higher retry rate.</p>' +
            '<p>Worth remembering too: sampling is not the only diversity lever. When you need five different proposals, one call asking for five variants with an explicit requirement that they differ usually beats five calls at high temperature - cheaper, faster, and the model itself keeps the variants from repeating.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Keep a task-to-parameters map in code, like logging configuration; a single global setting will always be wrong for half your calls.</li>' +
            '<li>Treat reproducibility as statistical, not binary - build tests on the contract and on evals, not on string equality.</li>' +
            '<li>Diversity is often cheaper to buy with one prompt asking for n variants than by raising temperature.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Czym w praktyce jest temperature?',
            en: 'What is temperature, in practice?'
          },
          options: [
            { pl: 'Limitem dlugosci odpowiedzi', en: 'A limit on answer length' },
            { pl: 'Pokretlem decydujacym, czy model zawsze bierze faworyta, czy czasem wpuszcza slabszych kandydatow', en: 'A dial deciding whether the model always takes the favourite or sometimes lets weaker candidates in' },
            { pl: 'Ustawieniem predkosci generowania tokenow', en: 'A setting for token generation speed' },
            { pl: 'Miara pewnosci modelu co do odpowiedzi', en: 'A measure of how confident the model is' }
          ],
          correct: 1,
          explain: {
            pl: 'To pokretlo losowosci przy wyborze kolejnego kawalka slowa. Nisko - przewidywalnie i nudno, wysoko - ciekawiej, ale z wieksza szansa na wpadke.',
            en: 'It is the randomness dial for picking the next chunk of a word. Low means predictable and dull, high means more interesting with a bigger chance of a blunder.'
          }
        },
        {
          q: {
            pl: 'Co technicznie robi obnizenie temperature do 0?',
            en: 'What does lowering temperature to 0 technically do?'
          },
          options: [
            { pl: 'Skraca odpowiedz o polowe', en: 'Halves the length of the answer' },
            { pl: 'Wylacza okno kontekstu', en: 'Disables the context window' },
            { pl: 'Maksymalnie wyostrza rozklad, wiec wybierany jest token o najwyzszym prawdopodobienstwie', en: 'Sharpens the distribution to the maximum, so the highest-probability token is chosen' },
            { pl: 'Zmniejsza koszt wywolania o polowe', en: 'Cuts the call cost in half' }
          ],
          correct: 2,
          explain: {
            pl: 'Temperature skaluje logity przed softmaxem. Przy wartosci bliskiej zera roznice sa maksymalnie powiekszone i faworyt zabiera cale prawdopodobienstwo.',
            en: 'Temperature scales the logits before softmax. Near zero the gaps are maximally magnified and the favourite takes all the probability.'
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
            { pl: 'Odrzuca 90 procent odpowiedzi i generuje je od nowa', en: 'It rejects 90 percent of responses and regenerates them' },
            { pl: 'Ogranicza uzycie okna kontekstu do 90 procent', en: 'It caps context window usage at 90 percent' }
          ],
          correct: 1,
          explain: {
            pl: 'To obciecie adaptacyjne: przy pewnym modelu zostaje jeden token, przy niepewnym kilkadziesiat. Tym rozni sie od sztywnego top_k, ktore zawsze bierze te sama liczbe.',
            en: 'It is an adaptive cutoff: one token survives when the model is confident, dozens when it is unsure. That is what separates it from a rigid top_k, which always keeps the same count.'
          }
        },
        {
          q: {
            pl: 'Zespol proponuje testy porownujace odpowiedz modelu znak po znaku z zapisanym wzorcem, przy temperature 0 i stalym parametrze seed (ustalajacym losowanie). Co powiesz na code review?',
            en: 'A team proposes tests comparing the model response character by character with a stored snapshot, using temperature 0 and a fixed seed (which pins the randomness). What do you say in review?'
          },
          options: [
            { pl: 'To zadziala, seed gwarantuje identyczne wyjscie', en: 'It will work, the seed guarantees identical output' },
            { pl: 'Zadziala po dodaniu top_p 1,0', en: 'It will work once top_p 1.0 is added' },
            { pl: 'Powtarzalnosc bit w bit nie jest gwarantowana - arytmetyka GPU, batching i zmiany wersji modelu to psuja; asertuj na schemacie, wlasnosciach i metrykach evalow', en: 'Bit-for-bit reproducibility is not guaranteed - GPU arithmetic, batching and model version changes break it; assert on schema, properties and eval metrics' },
            { pl: 'Wystarczy zwiekszyc max_tokens, zeby ustabilizowac wyjscie', en: 'Just raise max_tokens to stabilize the output' }
          ],
          correct: 2,
          explain: {
            pl: 'Seed i temperature 0 zwiekszaja szanse na powtorzenie, ale nie usuwaja niedeterminizmu zmiennoprzecinkowego ani cichych zmian wersji modelu. Takie snapshoty beda flaky i zespol przestanie im ufac.',
            en: 'Seed and temperature 0 improve the odds of a repeat but remove neither floating-point non-determinism nor silent model version changes. Such snapshots will be flaky and the team will stop trusting them.'
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
      minutes: 13,
      terms: [
        {
          term: { pl: 'TTFT', en: 'TTFT (time to first token)' },
          def: {
            pl: 'Czas od wyslania requestu do pierwszego tokena odpowiedzi. Zalezy glownie od dlugosci wejscia (prefill) i to on decyduje o odczuwalnej szybkosci interfejsu, nie calkowity czas generacji.',
            en: 'The time from sending the request to the first token of the response. Driven mainly by input length (prefill) and it, not total generation time, is what users perceive as speed.'
          }
        },
        {
          term: { pl: 'przepustowosc', en: 'throughput (tokens/s)' },
          def: {
            pl: 'Tempo generowania kolejnych tokenow po pierwszym. Razem z liczba tokenow wyjscia wyznacza calkowita latencje: <code>TTFT + tokeny_wyjscia / tokeny_na_sekunde</code>.',
            en: 'The rate at which tokens are produced after the first one. Together with the output length it sets total latency: <code>TTFT + output_tokens / tokens_per_second</code>.'
          }
        },
        {
          term: { pl: 'prefill i decode', en: 'prefill and decode' },
          def: {
            pl: 'Dwie fazy inferencji: prefill przetwarza cale wejscie rownolegle (drogie w obliczeniach, jednorazowe), decode generuje wyjscie token po tokenie (sekwencyjne). Dlatego tokeny wyjscia sa duzo drozsze niz wejscia.',
            en: 'The two phases of inference: prefill processes the whole input in parallel (compute-heavy, once), decode emits the output token by token (sequential). This is why output tokens cost several times more than input.'
          }
        },
        {
          term: { pl: 'prompt caching', en: 'prompt caching' },
          def: {
            pl: 'Serwer zapamietuje policzony stan (KV cache) dla stalego prefiksu promptu i przy kolejnym wywolaniu go nie liczy od nowa. Dziala tylko na dokladny prefiks - stale instrukcje na gorze, zmienne dane na dole.',
            en: 'The server keeps the computed state (KV cache) for a stable prompt prefix and skips recomputing it on the next call. It matches on the exact prefix - static instructions at the top, variable data at the bottom.'
          }
        },
        {
          term: { pl: 'Batch API', en: 'Batch API' },
          def: {
            pl: 'Tryb asynchroniczny: wysylasz paczke requestow i odbierasz wyniki w ciagu godzin, zwykle za okolo polowe ceny. Idealny do backfillow, ewaluacji i przetwarzania offline, bezuzyteczny w chacie.',
            en: 'An asynchronous mode: submit a batch of requests and collect results within hours, typically at about half price. Ideal for backfills, evals and offline processing, useless for chat.'
          }
        }
      ],
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
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Dwa zapytania z tym samym prefiksem: pierwsze placi pelna cene i zapisuje cache, drugie trafia w cache. Ostatnia klatka pokazuje, jak jeden znak potrafi to zepsuc.',
            en: 'Two requests with the same prefix: the first pays full price and writes the cache, the second hits it. The last frame shows how one character can ruin it.'
          },
          frames: [
            {
              svg: cacheFrame(
                cacheSeg(28, 224, 'system + tools', 'var(--muted)', '0.35') +
                cacheSeg(260, 196, 'docs', 'var(--muted)', '0.35') +
                cacheSeg(464, 148, 'user turn A', 'var(--muted)', '0.35') +
                cacheBox(20, 'prefill', 'nothing to reuse', '20k tokens to process', 'var(--border)') +
                cacheBox(330, 'prompt cache', 'empty', 'first call of the day', 'var(--border)') +
                cacheFoot(
                  'Request 1: cold start',
                  'The whole prompt has to go through the model before token one comes out.',
                  'Input 20k tokens at full price, TTFT around 2 s.',
                  'var(--warn)'
                )
              ),
              label: { pl: '1. Zimny start', en: '1. Cold start' },
              note: {
                pl: 'Pierwsze zapytanie nie ma czego odzyskac. Caly prompt jest liczony od zera i to on tworzy TTFT (czas do pierwszego tokenu).',
                en: 'The first request has nothing to reuse. The entire prompt is computed from scratch and that is what your TTFT (time to first token) is made of.'
              }
            },
            {
              svg: cacheFrame(
                cacheSeg(28, 224, 'system + tools', 'var(--ok)', '0.6') +
                cacheSeg(260, 196, 'docs', 'var(--accent2)', '0.55') +
                cacheSeg(464, 148, 'user turn A', 'var(--warn)', '0.55') +
                cacheBox(20, 'prefill done', 'answer streaming', 'decode phase now', 'var(--accent)') +
                cacheBox(330, 'prompt cache', 'prefix written: 18k tokens', 'alive for about 5 minutes', 'var(--ok)') +
                cacheFoot(
                  'The cache write is the investment',
                  'Writing costs a little more than a normal input token (about 1.25x).',
                  'Only an exact prefix, from the very first token, can be stored.',
                  'var(--accent)'
                )
              ),
              label: { pl: '2. Cache zapisany', en: '2. Cache written' },
              note: {
                pl: 'Stabilna czesc promptu - system, definicje narzedzi i dokumenty - laduje w cache. Zmienna koncowka rozmowy zostaje poza nim.',
                en: 'The stable part of the prompt - system, tool definitions and documents - lands in the cache. The volatile tail of the conversation stays outside it.'
              }
            },
            {
              svg: cacheFrame(
                cacheSeg(28, 224, 'system + tools', 'var(--ok)', '0.6') +
                cacheSeg(260, 196, 'docs', 'var(--accent2)', '0.55') +
                cacheSeg(464, 148, 'user turn B', 'var(--warn)', '0.55') +
                cacheBox(20, 'prefix compare', 'byte for byte, from token 0', 'match: 18k of 20k', 'var(--ok)') +
                cacheBox(330, 'prompt cache', 'hit', 'only the tail is new', 'var(--ok)') +
                cacheFoot(
                  'Request 2: same prefix, new question',
                  'The provider walks the prompt from the start and stops at the first difference.',
                  'Everything before that point is served from the cache.',
                  'var(--ok)'
                )
              ),
              label: { pl: '3. Trafienie w cache', en: '3. Cache hit' },
              note: {
                pl: 'Porownanie idzie od poczatku promptu, jak wspolny prefiks dwoch stringow. Wystarczy, ze koncowka jest inna - reszta i tak sie zgadza.',
                en: 'The comparison runs from the start of the prompt, like the common prefix of two strings. Only the tail differs, and the rest still matches.'
              }
            },
            {
              svg: cacheFrame(
                cacheSeg(28, 224, 'served from cache', 'var(--ok)', '0.6') +
                cacheSeg(260, 196, 'served from cache', 'var(--ok)', '0.6') +
                cacheSeg(464, 148, '2k new tokens', 'var(--warn)', '0.55') +
                cacheBox(20, 'prefill', 'only 2k tokens processed', 'TTFT around 0.6 s', 'var(--ok)') +
                cacheBox(330, 'bill', '18k tokens at about 10 percent', '2k tokens at full price', 'var(--ok)') +
                cacheFoot(
                  'Same answer, a fraction of the cost',
                  'Roughly 80 to 90 percent off the repeated prefix, and several times faster to first token.',
                  'This is why chat, agents and RAG apps care about prompt layout at all.',
                  'var(--ok)'
                )
              ),
              label: { pl: '4. Rachunek i latencja', en: '4. Bill and latency' },
              note: {
                pl: 'Cache nie zmienia odpowiedzi - zmienia cene i czas. Im dluzszy stabilny prefiks, tym wiekszy zysk przy kazdym kolejnym zapytaniu.',
                en: 'The cache does not change the answer - it changes price and time. The longer the stable prefix, the bigger the win on every following request.'
              }
            },
            {
              svg: cacheFrame(
                cacheSeg(28, 120, 'timestamp', 'var(--err)', '0.6') +
                cacheSeg(156, 96, 'system', 'var(--err)', '0.35') +
                cacheSeg(260, 196, 'docs', 'var(--err)', '0.35') +
                cacheSeg(464, 148, 'user turn C', 'var(--err)', '0.35') +
                cacheBox(20, 'prefix compare', 'difference at token 3', 'nothing after it can match', 'var(--err)') +
                cacheBox(330, 'prompt cache', 'miss', 'full price again', 'var(--err)') +
                cacheFoot(
                  'One volatile token at the top kills everything',
                  'A clock, a session id or a shuffled tool list invalidates the whole prefix.',
                  'Order the prompt: system, tools, documents, and only then the changing turn.',
                  'var(--err)'
                )
              ),
              label: { pl: '5. Jak to zepsuc', en: '5. How to break it' },
              note: {
                pl: 'Najczestszy blad produkcyjny: data lub identyfikator sesji na samej gorze promptu. Cache liczy sie od tokenu zero, wiec placisz pelna stawke.',
                en: 'The classic production mistake: a date or a session id at the very top of the prompt. Caching starts at token zero, so you pay the full rate.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Anatomia jednej sekundy: skad bierze sie latencja, ktora dzwignia na co dziala i dlaczego streaming zmienia odbior tych samych liczb.',
            en: 'The anatomy of one second: where latency comes from, which lever moves what, and why streaming changes how the same numbers feel.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('One request, measured: 12k in, 600 out') +
                '<rect x="28" y="60" width="150" height="36" rx="8" fill="var(--accent)" opacity="0.7"/>' +
                fText(103, 84, 'prefill 1.2 s', 13, 'var(--text)', 'middle') +
                '<rect x="182" y="60" width="420" height="36" rx="8" fill="var(--accent2)" opacity="0.55"/>' +
                fText(392, 84, 'decode 600 tokens at 55 tok/s = 10.9 s', 13, 'var(--text)', 'middle') +
                fText(28, 132, 'total 12.1 s - but the user sees text after 1.2 s', 15, 'var(--text)') +
                fText(28, 168, 'prefill scales with INPUT length', 14, 'var(--muted)') +
                fText(28, 194, 'decode scales with OUTPUT length', 14, 'var(--muted)') +
                fText(28, 228, 'Two different problems, two different cures.', 14, 'var(--warn)') +
                fPanel('TTFT is the metric users judge', 'Trimming the prompt fixes the wait before text starts.', 'Trimming the answer fixes how long the whole thing takes.', 'var(--accent)')
              ),
              label: { pl: '1. Dwie fazy', en: '1. Two phases' },
              note: {
                pl: 'Prefill zalezy od dlugosci wejscia, decode od dlugosci wyjscia. Mylenie tych dwoch rzeczy to najczestszy powod optymalizowania nie tej strony.',
                en: 'Prefill depends on input length, decode on output length. Confusing the two is the most common reason for optimising the wrong side.'
              }
            },
            {
              svg: svgFrame(
                fHead('Lever 1: cut the output - the fastest win') +
                fBar(66, 'prose answer', 400, 'var(--err)', '600 tok / 10.9 s') +
                fBar(102, 'terse JSON', 150, 'var(--ok)', '220 tok / 4.0 s') +
                fText(28, 168, 'Same information, one format instruction and a hard', 14, 'var(--muted)') +
                fText(28, 192, 'max_tokens cap. Cost falls with the exact same ratio.', 14, 'var(--muted)') +
                fText(28, 226, 'Output tokens are the expensive ones: about 5x input price,', 14, 'var(--warn)') +
                fText(28, 250, 'because decode holds the GPU one token at a time.', 14, 'var(--warn)') +
                fPanel('Ask for less text before optimising anything else', 'Typical real-world saving from format discipline alone: 30-40 percent.', 'Bonus: shorter answers are usually easier to validate as well.', 'var(--ok)')
              ),
              label: { pl: '2. Skroc wyjscie', en: '2. Cut the output' },
              note: {
                pl: 'Najdrozszy token to ten wygenerowany. Wymuszenie zwiezlego formatu i twardego max_tokens tnie jednoczesnie czas i rachunek.',
                en: 'The most expensive token is a generated one. Forcing a terse format and a hard max_tokens cuts time and cost at once.'
              }
            },
            {
              svg: svgFrame(
                fHead('Lever 2: cut the input - prefill and TTFT') +
                fBar(66, 'whole handbook', 420, 'var(--err)', '90k tok / TTFT 8 s') +
                fBar(102, 'top 6 RAG chunks', 60, 'var(--ok)', '4.8k tok / TTFT 0.7 s') +
                fText(28, 168, 'Prompt caching helps here too: a repeated prefix is served', 14, 'var(--muted)') +
                fText(28, 192, 'from cache, so prefill only processes the new tail.', 14, 'var(--muted)') +
                fText(28, 226, 'Cache read is about 10 percent of input price at Anthropic;', 14, 'var(--ok)') +
                fText(28, 250, 'a cache write costs about 125 percent, so it pays from hit two.', 14, 'var(--ok)') +
                fPanel('Input work is where caching lives', 'Nothing can cache the output - every answer is generated fresh.', 'That asymmetry drives the whole prompt layout discipline.', 'var(--accent)')
              ),
              label: { pl: '3. Przytnij wejscie', en: '3. Trim the input' },
              note: {
                pl: 'Krotsze wejscie i trafienia w cache skracaja prefill, czyli TTFT. Wyjscia nie da sie zacachowac - kazda odpowiedz powstaje od nowa.',
                en: 'Shorter input and cache hits shorten prefill, that is TTFT. Output cannot be cached - every answer is generated from scratch.'
              }
            },
            {
              svg: svgFrame(
                fHead('Same 12 seconds, two very different experiences') +
                fBox(20, 50, 290, 106, 'spinner', 'nothing for 12 s, then all text', 'var(--err)') +
                fText(40, 132, 'feels broken after about 4 seconds', 13, 'var(--err)') +
                fBox(330, 50, 290, 106, 'streaming', 'text moves after 1.2 s', 'var(--ok)') +
                fText(350, 132, 'feels responsive for the full 12 s', 13, 'var(--ok)') +
                fText(28, 192, 'For tool-using calls, stream the STAGE as well:', 14, 'var(--muted)') +
                fText(28, 216, '"searching the docs" then "writing the answer".', 14, 'var(--muted)') +
                fText(28, 246, 'This is the LLM equivalent of a skeleton screen in React.', 14, 'var(--accent2)') +
                fPanel('Perceived latency is a product decision', 'You cannot always cut 12 seconds, but you can always show progress.', 'TTFT plus visible motion beats a shorter silent wait.', 'var(--ok)')
              ),
              label: { pl: '4. Latencja odczuwalna', en: '4. Perceived latency' },
              note: {
                pl: 'Te same 12 sekund ze spinnerem wygladaja na awarie, a ze streamingiem na prace. Dlatego TTFT jest metryka produktowa, nie tylko techniczna.',
                en: 'The same 12 seconds look like a failure behind a spinner and like work when streamed. That is why TTFT is a product metric, not just a technical one.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Rachunek za realny endpoint i cztery dzwignie po kolei: co ile daje i w jakiej kolejnosci to robic.',
            en: 'The bill for a real endpoint and four levers in order: what each one saves and in which sequence to apply them.'
          },
          frames: [
            {
              svg: svgFrame(
                fHead('Starting point: classifier, 2M short messages a month') +
                fText(28, 62, 'large model, 700 in / 120 out tokens per message', 14, 'var(--muted)') +
                fBar(96, 'input cost', 120, 'var(--accent2)', '4200 USD') +
                fBar(132, 'output cost', 260, 'var(--err)', '3600 USD') +
                fText(28, 196, 'total: about 7800 USD per month', 15, 'var(--err)') +
                fText(28, 228, 'Results are not needed in real time - they feed a dashboard.', 14, 'var(--muted)') +
                fPanel('Instrument before you optimise', 'Log input_tokens, output_tokens, cache read/write, model and TTFT per task.', 'Without those four numbers every cost discussion is guesswork.', 'var(--accent)')
              ),
              label: { pl: '1. Punkt wyjscia', en: '1. Starting point' },
              note: {
                pl: 'Zanim cokolwiek zmienisz, loguj tokeny wejscia i wyjscia per zadanie. Bez tych liczb nie da sie stwierdzic, ktora dzwignia w ogole dziala.',
                en: 'Before changing anything, log input and output tokens per task. Without those numbers you cannot tell which lever does anything at all.'
              }
            },
            {
              svg: svgFrame(
                fHead('Lever 1: cap the output at one label') +
                fBar(66, 'before: 120 out', 260, 'var(--err)', '3600 USD') +
                fBar(102, 'after: 4 out', 12, 'var(--ok)', '120 USD') +
                fText(28, 166, 'The classifier only ever needed one word. max_tokens 8,', 14, 'var(--muted)') +
                fText(28, 190, 'plus a format instruction, removed 116 tokens per call.', 14, 'var(--muted)') +
                fText(28, 224, 'new monthly total: about 4320 USD', 15, 'var(--accent2)') +
                fPanel('Always start here', 'Output is the priciest token class, and usually the most padded.', 'Verbose answers are a habit of the prompt, not a requirement.', 'var(--ok)')
              ),
              label: { pl: '2. Krotsze wyjscie', en: '2. Shorter output' },
              note: {
                pl: 'Klasyfikator potrzebowal jednego slowa, a dostawal akapit. Ograniczenie wyjscia to zwykle najszybsza i najbezpieczniejsza oszczednosc.',
                en: 'The classifier needed one word and was getting a paragraph. Capping output is usually the fastest and safest saving available.'
              }
            },
            {
              svg: svgFrame(
                fHead('Lever 2: route the easy work to a small model') +
                fBox(20, 50, 180, 96, 'small model', 'Haiku / mini / Flash', 'var(--ok)') +
                fText(40, 176, 'handles 97 percent of messages', 13, 'var(--muted)') +
                fArrowR(210, 96, 50, 'var(--warn)') +
                fBox(270, 50, 180, 96, 'confidence check', 'low score escalates', 'var(--warn)') +
                fArrowR(460, 96, 50, 'var(--accent)') +
                fBox(520, 50, 100, 96, 'large', '3 percent', 'var(--accent)') +
                fText(28, 226, 'new monthly total: about 480 USD', 15, 'var(--ok)') +
                fPanel('The price gap between tiers is roughly 10x', 'Classification and extraction rarely need the flagship model.', 'Keep the escalation path so hard cases still get the big brain.', 'var(--ok)')
              ),
              label: { pl: '3. Routing modeli', en: '3. Model routing' },
              note: {
                pl: 'Klasyfikacja to zadanie dla malego modelu, z eskalacja trudnych przypadkow do duzego. Roznica cen miedzy klasami to zwykle rzad wielkosci.',
                en: 'Classification is small-model work, with hard cases escalated to the large one. The price gap between tiers is usually an order of magnitude.'
              }
            },
            {
              svg: svgFrame(
                fHead('Lever 3: send it as a batch, not as chat') +
                fBar(66, 'synchronous', 200, 'var(--accent2)', '480 USD') +
                fBar(102, 'Batch API', 100, 'var(--ok)', '240 USD') +
                fText(28, 156, 'About 50 percent off, results within hours instead of', 14, 'var(--muted)') +
                fText(28, 180, 'milliseconds. Perfect here: the dashboard reads once a day.', 14, 'var(--muted)') +
                fText(28, 216, 'Not applicable to chat, agents or anything a human waits for.', 14, 'var(--warn)') +
                fText(28, 248, 'From 7800 to 240 USD, with no quality loss on the golden set.', 15, 'var(--ok)') +
                fPanel('Caching would NOT have helped here', 'Every message body is unique, so no prefix repeats.', 'Caching pays off with long stable prefixes: agents, RAG, chat.', 'var(--accent)')
              ),
              label: { pl: '4. Batch i podsumowanie', en: '4. Batch and the recap' },
              note: {
                pl: 'Tryb wsadowy daje okolo 50 procent rabatu za cene opoznienia liczonego w godzinach. Caching by tu nie pomogl, bo kazda wiadomosc ma inna tresc.',
                en: 'Batch mode gives about 50 percent off at the price of hours of delay. Caching would not help here, because every message body differs.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Za rozmowe z modelem placisz jak za taksowke, tylko licznik bije od slow. Kazde slowo, ktore wysylasz, kosztuje troche. Kazde slowo, ktore model odpisze, kosztuje duzo wiecej - zwykle kilka razy tyle.</p>' +
            '<p>Dlatego najtansza sztuczka swiata brzmi: popros o krotsza odpowiedz. "W trzech punktach" zamiast "opisz szczegolowo" potrafi obciac rachunek o polowe, a odpowiedz czesto staje sie lepsza, bo nikt nie lubi czytac scian tekstu.</p>' +
            '<p>Jest tez czekanie, i to dwa rodzaje czekania. Najpierw model musi przeczytac wszystko, co mu wyslales - to ta cisza przed pierwszym slowem. Potem pisze, slowo po slowie, i to trwa tym dluzej, im dluzsza ma byc odpowiedz. Jesli pokazujesz te slowa na biezaco, czlowiek czeka spokojnie, bo widzi, ze cos sie dzieje. Ta sama sekunda z kreciolkiem wydaje sie dwa razy dluzsza niz z tekstem, ktory sie pisze na oczach.</p>' +
            '<p>I jeszcze jedno, wlasciwie najprzyjemniejsze: jesli poczatek twojej wiadomosci jest zawsze dokladnie taki sam, mozna go zapamietac. Nastepnym razem model nie musi go czytac od nowa - jest szybciej i znacznie taniej. Ale wystarczy wpisac na samej gorze aktualna godzine i cala sztuczka przestaje dzialac, bo poczatek juz nie jest taki sam.</p>',
          en: '<p>Talking to a model is billed like a taxi, except the meter runs on words. Every word you send costs a little. Every word the model writes back costs a lot more - usually several times as much.</p>' +
            '<p>Which is why the cheapest trick in the world is: ask for a shorter answer. "In three bullets" instead of "describe in detail" can halve the bill, and the answer often gets better too, because nobody enjoys reading walls of text.</p>' +
            '<p>Then there is waiting, and there are two kinds of it. First the model has to read everything you sent - that is the silence before the first word. Then it writes, word by word, and that takes longer the longer the answer is meant to be. If you show those words as they arrive, people wait calmly, because they can see something is happening. The same second feels twice as long next to a spinner as it does next to text being typed in front of you.</p>' +
            '<p>One more thing, arguably the nicest: if the beginning of your message is always exactly the same, it can be remembered. Next time the model does not have to read it again - faster and much cheaper. But put the current time at the very top and the trick stops working, because the beginning is no longer the same.</p>'
        },
        school: {
          pl: '<p>Rozliczenie jest per token i <strong>asymetryczne</strong>: tokeny wyjsciowe kosztuja zwykle 3-5 razy wiecej niz wejsciowe. Powod jest techniczny. Wejscie przetwarza sie rownolegle w jednym przebiegu - to faza <strong>prefill</strong>. Wyjscie powstaje sekwencyjnie, token po tokenie - to faza <strong>decode</strong>, ktora zajmuje karte graficzna znacznie dluzej.</p>' +
            '<h4>Worked example: policz jeden endpoint</h4>' +
            '<p>Przyjmij cennik klasy sredniej: 3 USD za milion tokenow wejscia i 15 USD za milion wyjscia. Twoje wywolanie ma 4000 tokenow promptu i 500 tokenow odpowiedzi. Wejscie: 4000 razy 0,000003 to 0,012 USD. Wyjscie: 500 razy 0,000015 to 0,0075 USD. Razem okolo 2 centow za wywolanie. Przy 100 tysiacach wywolan miesiecznie to okolo 1950 USD - i nagle kazdy zbedny akapit w system prompcie ma swoja cene. Zauwaz proporcje: wyjscie jest osmiokrotnie krotsze, a odpowiada za 38 procent rachunku.</p>' +
            '<h4>Dwie rozne latencje</h4>' +
            '<ul>' +
            '<li><strong>TTFT</strong> (time to first token - czas do pierwszego tokena) - ile czekasz, zanim cokolwiek sie pojawi. Zalezy glownie od dlugosci wejscia i kolejki u dostawcy.</li>' +
            '<li><strong>Przepustowosc</strong> - ile tokenow na sekunde leci potem, typowo kilkadziesiat. Calkowity czas to w przyblizeniu TTFT plus liczba tokenow wyjscia podzielona przez ta predkosc.</li>' +
            '</ul>' +
            '<p>Wniosek: dlugie wejscie psuje TTFT, a dluga odpowiedz psuje czas calkowity. To sa dwa osobne problemy z dwoma osobnymi lekarstwami.</p>' +
            '<h4>Prompt caching</h4>' +
            '<p>Dostawcy pozwalaja zapamietac przeliczony <strong>prefiks</strong> promptu, czyli jego poczatek. Jesli poczatek kolejnego zapytania jest bajt w bajt identyczny, ta czesc nie jest liczona od nowa: placisz za nia ulamek zwyklej ceny i oszczedzasz czas prefill. Warunek jest twardy - dopasowanie idzie od pierwszego tokena, wiec wystarczy wstawic na gorze aktualna date albo identyfikator sesji i cache przestaje trafiac.</p>' +
            '<p>Stad zasada porzadkowania promptu: najpierw to, co stale (rola, instrukcje, definicje narzedzi), potem to, co zmienne (pytanie uzytkownika). Dokladnie jak z warstwami obrazu Dockera albo hashem w nazwie pliku dla CDN.</p>' +
            '<h4>Co musisz zapamietac</h4>' +
            '<p>Tokeny wyjscia sa kilka razy drozsze od wejsciowych, wiec skracanie odpowiedzi jest pierwsza dzwignia. TTFT zalezy od wejscia, a czas calkowity od dlugosci odpowiedzi. Cache dziala tylko na identyczny prefiks, wiec zmienne dane zawsze ida na dol promptu.</p>',
          en: '<p>Billing is per token and <strong>asymmetric</strong>: output tokens usually cost 3-5x more than input tokens. The reason is technical. Input is processed in parallel in one pass - the <strong>prefill</strong> phase. Output is produced sequentially, token by token - the <strong>decode</strong> phase, which occupies the graphics card far longer.</p>' +
            '<h4>Worked example: cost one endpoint</h4>' +
            '<p>Take a mid-tier price list: 3 USD per million input tokens and 15 USD per million output. Your call has a 4000-token prompt and a 500-token answer. Input: 4000 times 0.000003 is 0.012 USD. Output: 500 times 0.000015 is 0.0075 USD. Roughly 2 cents per call. At 100,000 calls a month that is about 1950 USD - and suddenly every redundant paragraph in the system prompt has a price tag. Note the proportion: output is eight times shorter and still accounts for 38 percent of the bill.</p>' +
            '<h4>Two different latencies</h4>' +
            '<ul>' +
            '<li><strong>TTFT</strong> (time to first token) - how long before anything appears. Driven mostly by input length and provider queueing.</li>' +
            '<li><strong>Throughput</strong> - tokens per second after that, typically a few dozen. Total time is roughly TTFT plus output token count divided by that speed.</li>' +
            '</ul>' +
            '<p>Conclusion: a long input ruins TTFT, a long answer ruins total time. Two separate problems with two separate cures.</p>' +
            '<h4>Prompt caching</h4>' +
            '<p>Providers let you store the precomputed <strong>prefix</strong> of a prompt, meaning its beginning. If the beginning of the next request is byte-for-byte identical, that part is not recomputed: you pay a fraction of the normal price and skip that prefill time. The condition is strict - matching runs from the first token, so putting the current date or a session id at the top is enough to destroy every cache hit.</p>' +
            '<p>Hence the prompt ordering rule: stable things first (role, instructions, tool definitions), variable things last (the user question). Exactly like Docker image layers or a content hash in a filename for a CDN.</p>' +
            '<h4>What you must remember</h4>' +
            '<p>Output tokens cost several times more than input ones, so shortening answers is the first lever. TTFT depends on the input, total time on the answer length. Caching only works on an identical prefix, so volatile data always goes at the bottom of the prompt.</p>'
        },
        pro: {
          pl: '<p>Koszt i latencja to dwie osobne funkcje tych samych zmiennych, wiec optymalizuj je osobno i mierz osobno. Instrumentacja jest warunkiem wstepnym: loguj per zadanie <code>input_tokens</code>, <code>output_tokens</code>, tokeny zapisu i odczytu cache, nazwe modelu, TTFT i czas calkowity. Bez tego kazda dyskusja o kosztach jest zgadywanka.</p>' +
            '<h4>Kolejnosc dzwigni, od najskuteczniejszej</h4>' +
            '<ol>' +
            '<li><strong>Skroc wyjscie.</strong> Najdrozszy token to ten wygenerowany. Wymus zwiezly format (JSON zamiast prozy, limity dlugosci, twarde <code>max_tokens</code>). Czesto 30-40 procent oszczednosci w jeden dzien.</li>' +
            '<li><strong>Wlacz prompt caching.</strong> Odczyt z cache to zwykle okolo 10 procent ceny wejscia u Anthropic (zapis okolo 125 procent), a u OpenAI automatyczny rabat rzedu 50 procent dla powtarzanych prefiksow. Przy agencie z 20 tysiacami tokenow narzedzi i instrukcji to roznica miedzy rentownoscia a jej brakiem.</li>' +
            '<li><strong>Routing modeli.</strong> Klasyfikacja i ekstrakcja ida na maly model (Haiku, GPT-4o-mini, Gemini Flash), a tylko trudne przypadki eskaluja do duzego. Roznica cen miedzy klasami to zwykle rzad wielkosci.</li>' +
            '<li><strong>Przytnij wejscie.</strong> Mniej chunkow z RAG, kompakcja historii, usuniecie nieuzywanych definicji narzedzi.</li>' +
            '<li><strong>Batch API</strong> dla zadan offline - okolo 50 procent taniej, kosztem opoznienia liczonego w godzinach.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 600,\n  system: [\n    { type: "text", text: STABLE_INSTRUCTIONS,\n      cache_control: { type: "ephemeral" } }\n  ],\n  messages: [{ role: "user", content: userTurn }]\n});\nlog({\n  in: res.usage.input_tokens,\n  out: res.usage.output_tokens,\n  cacheRead: res.usage.cache_read_input_tokens\n});</code></pre>' +
            '<h4>Projektowanie promptu pod cache</h4>' +
            '<p>Dopasowanie jest prefiksowe, wiec traktuj prompt jak warstwy w Dockerfile: rzeczy zmienne na dol. Konkretne zakazy: brak znacznika czasu na gorze, brak identyfikatora uzytkownika w system prompcie, brak losowej kolejnosci dokumentow z retrievalu, brak <code>JSON.stringify</code> po obiekcie, ktorego kolejnosc kluczy moze sie zmienic miedzy wywolaniami. Minimalna dlugosc cachowanego bloku to zwykle okolo 1024 tokeny, wiec cachowanie krotkiego promptu nic nie daje. TTL (czas zycia wpisu) bywa krotki, rzedu 5 minut z odswiezeniem przy kazdym uzyciu - dla ruchu ciaglego dziala swietnie, dla rzadkiego prawie wcale.</p>' +
            '<h4>Latencja odczuwalna</h4>' +
            '<p>Uzytkownik ocenia TTFT, nie czas calkowity. Streaming (przesylanie odpowiedzi token po tokenie zamiast czekania na calosc) zmienia odczuwalne 8 sekund w akceptowalne, bo tekst rusza po 400 ms. Dla wywolan z narzedziami pokazuj etap - "szukam w dokumentacji", "pisze odpowiedz" - bo to jest twoj odpowiednik skeletona w React. Jesli generujesz strukture, streamuj czesciowy JSON i renderuj pola, ktore juz sa kompletne; to temat modulu o streamingu.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Pytanie, ktore pada czesto: dlaczego wersja z cachem moze byc drozsza przy pierwszym wywolaniu. Odpowiedz: zapis do cache kosztuje wiecej niz zwykle wejscie (okolo 1,25x), wiec oplaca sie dopiero od drugiego trafienia w oknie TTL - przy jednorazowych, unikalnych promptach caching tylko doklada kosztu. Drugie czeste pytanie: dlaczego skrocenie promptu o polowe nie skrocilo odpowiedzi o polowe. Bo skrocilo prefill, czyli TTFT, a nie decode - a to decode dominuje czas calkowity przy dlugich odpowiedziach.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Bez logowania tokenow per zadanie nie masz jak stwierdzic, ktora zmiana pomogla - zacznij od instrumentacji, nie od optymalizacji.</li>' +
            '<li>Kolejnosc dzwigni jest stala: najpierw krotsze wyjscie, potem cache, potem mniejszy model, na koncu krotsze wejscie i tryb wsadowy.</li>' +
            '<li>Uklad promptu to decyzja architektoniczna - stabilny prefiks na gorze jest jednoczesnie tanszy, szybszy i latwiejszy do debugowania.</li>' +
            '</ul>',
          en: '<p>Cost and latency are two separate functions of the same variables, so optimize and measure them separately. Instrumentation is the precondition: log per task <code>input_tokens</code>, <code>output_tokens</code>, cache write and read tokens, model name, TTFT and total time. Without that, every cost discussion is guesswork.</p>' +
            '<h4>Levers in order of impact</h4>' +
            '<ol>' +
            '<li><strong>Shorten the output.</strong> The most expensive token is a generated one. Force a terse format (JSON instead of prose, length limits, a hard <code>max_tokens</code>). Often 30-40 percent savings in a single day.</li>' +
            '<li><strong>Turn on prompt caching.</strong> A cache read is typically about 10 percent of the input price at Anthropic (a write about 125 percent), while OpenAI applies an automatic discount around 50 percent for repeated prefixes. For an agent carrying 20k tokens of tools and instructions this is the difference between viable and not.</li>' +
            '<li><strong>Model routing.</strong> Classification and extraction go to a small model (Haiku, GPT-4o-mini, Gemini Flash) and only hard cases escalate to a large one. The price gap between tiers is usually an order of magnitude.</li>' +
            '<li><strong>Trim the input.</strong> Fewer RAG chunks, compacted history, removal of unused tool definitions.</li>' +
            '<li><strong>Batch API</strong> for offline work - about 50 percent cheaper, at the price of latency measured in hours.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 600,\n  system: [\n    { type: "text", text: STABLE_INSTRUCTIONS,\n      cache_control: { type: "ephemeral" } }\n  ],\n  messages: [{ role: "user", content: userTurn }]\n});\nlog({\n  in: res.usage.input_tokens,\n  out: res.usage.output_tokens,\n  cacheRead: res.usage.cache_read_input_tokens\n});</code></pre>' +
            '<h4>Designing prompts for cache</h4>' +
            '<p>Matching is prefix-based, so treat the prompt like Dockerfile layers: volatile things at the bottom. Concrete prohibitions: no timestamp at the top, no user id in the system prompt, no randomly ordered retrieval results, no <code>JSON.stringify</code> over an object whose key order can shift between calls. The minimum cacheable block is usually around 1024 tokens, so caching a short prompt buys nothing. TTL (the lifetime of an entry) is often short, on the order of 5 minutes refreshed on every use - excellent for steady traffic, nearly useless for sparse traffic.</p>' +
            '<h4>Perceived latency</h4>' +
            '<p>Users judge TTFT, not total time. Streaming (sending the answer token by token instead of waiting for the whole thing) turns a perceived 8 seconds into something acceptable, because text starts moving after 400 ms. For tool-using calls, show the stage - "searching the docs", "writing the answer" - because that is your React skeleton equivalent. If you generate structure, stream partial JSON and render the fields that are already complete; that is the subject of the streaming module.</p>' +
            '<h4>In interviews</h4>' +
            '<p>A frequent question: why can the cached version be more expensive on the first call. Answer: a cache write costs more than plain input (about 1.25x), so it only pays off from the second hit within the TTL window - with one-off unique prompts, caching just adds cost. A second common one: why did halving the prompt not halve the response time. Because it shortened prefill, that is TTFT, not decode - and decode dominates total time for long answers.</p>' +
            '<h4>What this means in practice</h4>' +
            '<ul>' +
            '<li>Without per-task token logging you cannot tell which change helped - start with instrumentation, not with optimization.</li>' +
            '<li>The lever order is fixed: shorter output first, then caching, then a smaller model, then shorter input and batch mode.</li>' +
            '<li>Prompt layout is an architectural decision - a stable prefix on top is cheaper, faster and easier to debug all at once.</li>' +
            '</ul>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktora zmiana najszybciej obnizy rachunek za wywolania modelu?',
            en: 'Which change lowers your model bill the fastest?'
          },
          options: [
            { pl: 'Poprosic o krotsza odpowiedz', en: 'Ask for a shorter answer' },
            { pl: 'Wyslac prompt wielkimi literami', en: 'Send the prompt in capital letters' },
            { pl: 'Zadawac pytania wieczorem, poza godzinami szczytu', en: 'Ask questions in the evening, outside peak hours' },
            { pl: 'Podniesc temperature', en: 'Raise the temperature' }
          ],
          correct: 0,
          explain: {
            pl: 'Slowa, ktore model pisze, kosztuja kilka razy wiecej niz te, ktore wysylasz. Skrocenie odpowiedzi to najtansza i najszybsza oszczednosc.',
            en: 'The words the model writes cost several times more than the words you send. Shortening the answer is the cheapest and fastest saving.'
          }
        },
        {
          q: {
            pl: 'Ktore tokeny sa zazwyczaj drozsze i dlaczego?',
            en: 'Which tokens are usually more expensive, and why?'
          },
          options: [
            { pl: 'Wejsciowe, bo jest ich wiecej', en: 'Input tokens, because there are more of them' },
            { pl: 'Wyjsciowe, zwykle 3-5 razy drozsze, bo powstaja sekwencyjnie i dluzej zajmuja GPU', en: 'Output tokens, typically 3-5x, because they are produced sequentially and hold the GPU longer' },
            { pl: 'Kosztuja tyle samo', en: 'They cost the same' },
            { pl: 'Zalezy wylacznie od jezyka promptu', en: 'It depends only on the prompt language' }
          ],
          correct: 1,
          explain: {
            pl: 'Wejscie liczy sie rownolegle w jednym przebiegu (prefill), wyjscie token po tokenie (decode). Stad asymetria cen i stad kolejnosc optymalizacji.',
            en: 'Input is processed in parallel in one pass (prefill), output token by token (decode). Hence the price asymmetry and hence the optimization order.'
          }
        },
        {
          q: {
            pl: 'Co oznacza TTFT i od czego glownie zalezy?',
            en: 'What does TTFT mean and what mainly drives it?'
          },
          options: [
            { pl: 'Calkowity czas odpowiedzi; zalezy od liczby tokenow wyjscia', en: 'Total response time; driven by the number of output tokens' },
            { pl: 'Limit tokenow na zadanie; zalezy od planu cenowego', en: 'The token limit per request; driven by your pricing plan' },
            { pl: 'Czas do pierwszego tokena; zalezy glownie od dlugosci wejscia', en: 'Time to first token; driven mainly by input length' },
            { pl: 'Czas zycia wpisu w cache; zalezy od dostawcy', en: 'The lifetime of a cache entry; driven by the provider' }
          ],
          correct: 2,
          explain: {
            pl: 'TTFT to efekt fazy prefill, czyli przeliczenia calego wejscia. To metryka UX numer jeden przy streamingu - uzytkownik ocenia moment startu tekstu.',
            en: 'TTFT is the result of prefill, computing the whole input. It is the number one UX metric with streaming - users judge when text starts.'
          }
        },
        {
          q: {
            pl: 'Agent ma staly system prompt i definicje narzedzi o dlugosci 18 tysiecy tokenow, a na koniec doklejasz krotkie pytanie uzytkownika. Wlaczasz prompt caching (zapamietywanie przeliczonego poczatku promptu) i na samej gorze dopisujesz aktualna date z godzina. Co sie stanie?',
            en: 'An agent has a fixed 18k-token system prompt and tool definitions, with a short user question appended at the end. You enable prompt caching (storing the precomputed beginning of the prompt) and add the current date and time at the very top. What happens?'
          },
          options: [
            { pl: 'Cache dziala normalnie, bo data zajmuje malo tokenow', en: 'The cache works fine, because the date is only a few tokens' },
            { pl: 'Cache dziala szybciej dzieki swiezemu kluczowi', en: 'The cache gets faster thanks to a fresh key' },
            { pl: 'Cache obejmie tylko tokeny wyjsciowe', en: 'The cache will cover output tokens only' },
            { pl: 'Kazde wywolanie chybi cache i zaplacisz pelna stawke, bo prefiks rozni sie juz na poczatku', en: 'Every call misses the cache and you pay full price, because the prefix differs right at the start' }
          ],
          correct: 3,
          explain: {
            pl: 'Dopasowanie jest prefiksowe i bajt w bajt, liczone od pierwszego tokena - roznica na trzecim tokenie uniewaznia cale 18 tysiecy. Zmienne dane przenies na dol promptu, jak zmienne warstwy w Dockerfile.',
            en: 'Matching is prefix-based and byte-exact from the first token - a difference at token three invalidates all 18k. Move volatile data to the bottom of the prompt, like volatile Dockerfile layers.'
          }
        }
      ]
    }
  ]
};
