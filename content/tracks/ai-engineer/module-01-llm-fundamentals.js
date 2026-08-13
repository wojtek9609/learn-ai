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
    pl: 'Jak naprawdę działa model językowy: przewidywanie tokenów, tokenizacja, okno kontekstu, embeddingi, parametry losowości oraz koszt, latencja i cache.',
    en: 'How a language model actually works: next-token prediction, tokenization, context windows, embeddings, sampling parameters, and cost, latency and caching.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'how-llms-work',
      title: {
        pl: 'Jak działają modele językowe',
        en: 'How LLMs actually work'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'przewidywanie następnego tokena', en: 'next-token prediction' },
          def: {
            pl: 'Jedyna operacja modelu: dla całego dotychczasowego tekstu policz rozkład prawdopodobieństwa następnego tokena i wylosuj jeden. Cała reszta - chat, kod, tool calling - jest zbudowana na tej jednej pętli.',
            en: 'The only thing the model does: given all the text so far, compute a probability distribution over the next token and sample one. Chat, code and tool calling are all built on that single loop.'
          }
        },
        {
          term: { pl: 'autoregresja', en: 'autoregression' },
          def: {
            pl: 'Każdy wygenerowany token wraca na wejście i staje się częścią kontekstu dla kolejnego kroku. Dlatego wyjście powstaje sekwencyjnie i nie da się go zrównoleglić w obrębie jednej odpowiedzi.',
            en: 'Every generated token is appended to the input and becomes context for the next step. That is why output is produced sequentially and cannot be parallelised within one response.'
          }
        },
        {
          term: { pl: 'trening vs inferencja', en: 'training vs inference' },
          def: {
            pl: 'Trening to jednorazowe (bardzo drogie) ustalenie wag. Inferencja to każde wywołanie API na zamrożonych wagach - model niczego się wtedy nie uczy i nic nie pamięta między requestami.',
            en: 'Training sets the weights once, at huge cost. Inference is every API call against those frozen weights - the model learns nothing then and remembers nothing between requests.'
          }
        },
        {
          term: { pl: 'halucynacja', en: 'hallucination' },
          def: {
            pl: 'Pewnie brzmiąca odpowiedź, która nie ma pokrycia w faktach. Nie jest bugiem do załatania, tylko skutkiem tego, że model zawsze losuje prawdopodobny ciąg dalszy - leczy się ją groundingiem i weryfikacją, nie promptem <em>bądź dokładny</em>.',
            en: 'A confident answer with no factual backing. Not a bug to patch but a consequence of always sampling a plausible continuation - you treat it with grounding and verification, not with a <em>be accurate</em> prompt.'
          }
        },
        {
          term: { pl: 'logity', en: 'logits' },
          def: {
            pl: 'Surowe wyniki modelu dla każdego tokena ze słownika, przed zamianą na prawdopodobieństwa przez <code>softmax</code>. Na nich działają temperature, <code>top_p</code> i <code>top_k</code>.',
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
          pl: 'Pętla generowania: model liczy rozkład prawdopodobieństwa nad tokenami, jeden token jest losowany, dopisywany do tekstu i wszystko leci od nowa.',
          en: 'The generation loop: the model scores a probability distribution over tokens, one token is sampled, appended to the text, and the whole pass runs again.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Pętla autoregresji krok po kroku: ten sam model, coraz dłuższy tekst, jeden nowy token na przebieg.',
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
              label: { pl: '1. Rozkład', en: '1. The distribution' },
              note: {
                pl: 'Model dostaje cały tekst i zwraca liczbę dla każdego z około 200 tysięcy tokenów słownika. Tu widać tylko trzy najwyższe.',
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
                pl: 'Jeden token zostaje wybrany losowaniem ważonym prawdopodobieństwem. Przy temperature 0 zawsze wygrywa faworyt, wyżej czasem wchodzi drugi z listy.',
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
                pl: 'Wybrany token wraca na wejście i model liczy wszystko od nowa. To jest autoregresja: wyjście z kroku N jest wejściem kroku N plus 1.',
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
                pl: 'Model nie wie z góry, jak długa będzie odpowiedź. Kończy, gdy wylosuje specjalny token końca albo gdy trafi w twój limit max_tokens.',
                en: 'The model does not know the answer length up front. It ends when it samples the special stop token, or when it hits your max_tokens limit.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Dlaczego API jest bezstanowe: druga tura rozmowy to nie sesja na serwerze, tylko dłuższy prompt wysłany od nowa.',
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
                pl: 'Wysyłasz system prompt i pytanie. Serwer nic po sobie nie zostawia - dokładnie jak bezstanowy endpoint HTTP bez sesji.',
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
                pl: 'Historia rozmowy to po prostu dłuższe wejście. Nie ma sesji do odpytania, jest tylko tablica wiadomości, którą ty trzymasz.',
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
              label: { pl: '3. Rachunek rośnie', en: '3. The bill grows' },
              note: {
                pl: 'Każda tura płaci za całą poprzednią historię. Dlatego długie rozmowy kompaktuje się streszczeniem, zamiast przesyłać wszystko w nieskończoność.',
                en: 'Every turn pays for the whole history again. That is why long conversations get compacted into a summary instead of resent forever.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Skąd biorą się halucynacje: model nie ma stanu "nie wiem", więc dla pytania bez pokrycia i tak zwraca pewnie wyglądający rozkład.',
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
                pl: 'Gdy dane treningowe są zgodne, rozkład jest ostry jak igła. Model nie "sprawdza" odpowiedzi - po prostu jeden token ma ogromną przewagę.',
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
                pl: 'Rozkład robi się płaski, ale nadal nie ma w nim opcji "nie wiem". Cokolwiek zostanie wylosowane, brzmi równie pewnie jak Paryż.',
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
                pl: 'Wstrzyknięcie faktu do promptu przywraca ostry rozkład. Dlatego na halucynacje działa grounding i weryfikacja narzędziem, a nie proszenie modelu o dokładność.',
                en: 'Injecting the fact into the prompt restores a sharp distribution. That is why grounding and tool verification beat asking the model to be accurate.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie autouzupełnianie z klawiatury telefonu, tylko takie, które przeczytało pół internetu. Piszesz początek zdania, a ono podpowiada, co pasuje dalej. Model językowy robi dosłownie to samo, tylko nieprzyzwoicie lepiej.</p>' +
            '<p>Model nigdy nie <em>pamięta</em> rozmowy tak, jak pamięta ją człowiek. Za każdym razem dostaje cały tekst od początku i odpowiada na jedno jedyne pytanie: <strong>jaki kawałek słowa pasuje teraz najlepiej?</strong> Wybiera jeden, dokleja go do końca i pyta znowu. I znowu. Kilkaset razy pod rząd, aż uzna, że to już koniec zdania, akapitu i tematu.</p>' +
            '<p>Dlatego potrafi napisać coś, co brzmi mądrze, a jest zmyślone. On nie sprawdza, czy zdanie jest prawdziwe. Sprawdza, czy <em>brzmi jak dobra kontynuacja</em>. To trochę jak kolega, który zawsze ma odpowiedź, bo nie znosi ciszy przy stole. Często trafia, bo dużo przeczytał. Czasem strzela z fasonem, bo strzelanie z fasonem to cały jego zawód.</p>' +
            '<p>I jeszcze jedna rzecz, która oszczędza później dużo nerwów: on nie uczy się od ciebie w trakcie rozmowy. Jeśli coś ma wiedzieć, musisz mu to napisać w tej wiadomości. Jutro nie będzie pamiętał ani ciebie, ani wczorajszych ustaleń.</p>',
          en: '<p>Picture the autocomplete on your phone keyboard, except this one has read half the internet. You type the start of a sentence and it suggests what comes next. A language model does literally that, just indecently better.</p>' +
            '<p>The model never <em>remembers</em> your chat the way a person does. Every single time it gets the whole text from the beginning and answers one question: <strong>which chunk of a word fits best right now?</strong> It picks one, glues it onto the end, and asks again. And again. A few hundred times in a row, until it decides that is the end of the sentence, the paragraph and the topic.</p>' +
            '<p>That is why it can write something that sounds smart and is invented. It is not checking whether the sentence is true. It is checking whether it <em>sounds like a good continuation</em>. A bit like the friend who always has an answer because he cannot stand silence at the table. He is right a lot, because he has read a lot. Sometimes he guesses with great style, because guessing with style is the entire job.</p>' +
            '<p>One more thing that saves a lot of frustration later: it does not learn from you mid-conversation. If it needs to know something, you have to write it in this message. Tomorrow it will remember neither you nor what you agreed yesterday.</p>'
        },
        school: {
          pl: '<p>Model językowy to funkcja. Na wejściu dostaje ciąg <strong>tokenów</strong> (token to kawałek tekstu, zwykle fragment słowa), a na wyjściu zwraca rozkład prawdopodobieństwa nad wszystkimi tokenami w swoim <strong>słowniku</strong> (liście wszystkich znanych mu kawałków, zwykle 50-200 tysięcy pozycji). Jeden <strong>przebieg</strong> sieci, czyli jedno przeliczenie całego wejścia, daje dokładnie jeden nowy token.</p>' +
            '<p>Żeby powstał akapit, ten przebieg powtarza się kilkaset razy, za każdym razem z tekstem wydłużonym o poprzedni token. To się nazywa <strong>autoregresja</strong> (wyjście kroku N staje się wejściem kroku N plus 1).</p>' +
            '<h4>Worked example: policzmy jeden akapit</h4>' +
            '<p>Piszesz prompt o długości 900 tokenów i prosisz o odpowiedź długości 300 tokenów. Model wykonuje 300 przebiegów. W każdym z nich widzi wejście o długości 900, 901, 902... aż do 1199 tokenów. Nie ma tu żadnego skrótu: 300 tokenów odpowiedzi to 300 osobnych decyzji, a każda z nich zna cały wcześniejszy tekst. Dlatego odpowiedzi nie da się wygenerować równolegle, a czas rośnie liniowo z jej długością.</p>' +
            '<h4>Trening kontra inferencja</h4>' +
            '<p><strong>Trening</strong> to jednorazowy, potwornie drogi proces (miesiące pracy dziesiątek tysięcy kart graficznych), w którym <strong>wagi</strong> modelu - miliardy liczb opisujących sieć - są dostrajane tak, by przewidywanie następnego tokena było jak najtrafniejsze. <strong>Inferencja</strong> to każde twoje wywołanie API: wagi są zamrożone i nic się w nich nie zmienia. Model nie uczy się z twojego promptu i nie zapamiętuje niczego między requestami.</p>' +
            '<p>W kodzie cała pętla wygląda żenująco prosto:</p>' +
            '<pre><code>tokens = encode(prompt)\nwhile not done:\n    probs = model(tokens)   // rozkład nad słownikiem\n    next  = sample(probs)   // losowanie jednego tokena\n    tokens.append(next)</code></pre>' +
            '<h4>Skąd on to niby wie</h4>' +
            '<p>Wiedza siedzi w wagach jako statystyczne wzorce z danych treningowych, a nie jako tabela faktów z indeksem. Nie ma wiersza, który dało by się sprawdzić. Dlatego <strong>halucynacja</strong> (pewnie brzmiąca, ale zmyślona odpowiedź) nie jest bugiem do załatania - to ten sam mechanizm, który daje kreatywność, użyty tam, gdzie model nie ma pokrycia w danych. Model zawsze zwróci jakiś rozkład, nawet gdy nie wie nic sensownego; nie ma w nim wbudowanej opcji "nie wiem".</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Model to bezstanowa funkcja, która w jednym przebiegu wybiera jeden token i nic nie pamięta między wywołaniami. Historię rozmowy trzymasz i wysyłasz ty, nie serwer. A jeśli odpowiedź ma być oparta na faktach, fakty musisz włożyć do promptu albo dać modelowi narzędzie, które je sprawdzi.</p>',
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
          pl: '<p>Traktuj wywołanie modelu jak <strong>bezstanową funkcję HTTP</strong>: <code>f(tokeny) -> logity</code>. <strong>Logity</strong> to surowe, nieznormalizowane wyniki dla każdego tokena słownika; funkcja <code>softmax</code> zamienia je w prawdopodobieństwa sumujące się do jedynki. Stan rozmowy jest po twojej stronie, nie po stronie modelu. To najważniejszy model mentalny w całym module, bo prostuje połowę nieporozumień: model nie "zapamiętał" poprzedniej wiadomości - ty ją ponownie wysłałeś.</p>' +
            '<h4>Co dzieje się w środku wywołania</h4>' +
            '<ul>' +
            '<li><strong>Prefill</strong> - cały prompt idzie przez sieć równolegle, w jednym rzucie. Koszt rośnie z długością wejścia i to on dominuje <strong>TTFT</strong> (time to first token - czas od wysłania requestu do pierwszego tokena odpowiedzi).</li>' +
            '<li><strong>Decode</strong> - kolejne tokeny wyjścia powstają sekwencyjnie, jeden na przebieg, przyspieszone przez <strong>KV cache</strong> (zapamiętane w pamięci GPU pośrednie wyniki uwagi dla już przetworzonych tokenów, dzięki czemu nie liczy się ich drugi raz). Stąd asymetria cen: 10 tysięcy tokenów wejścia jest wyraźnie tańsze i szybsze niż 10 tysięcy tokenów wyjścia.</li>' +
            '</ul>' +
            '<p>Determinizm kończy się na poziomie sprzętu. Równoległa redukcja zmiennoprzecinkowa (sumowanie wielu liczb w nieustalonej kolejności na GPU) nie jest łączna, więc ta sama prośba potrafi dać inny wynik nawet przy temperaturze 0, gdy dwa tokeny mają niemal identyczny wynik. Dlatego testy snapshotowe na dokładny string są kruchą strategią - asertujesz na schemacie i własnościach, nie na bajtach.</p>' +
            '<h4>Halucynacje w produkcji</h4>' +
            '<p>Model nie ma skalibrowanego sygnału "nie wiem". Trzy dźwignie, które realnie działają:</p>' +
            '<ol>' +
            '<li><strong>Grounding</strong> (osadzenie odpowiedzi w dostarczonych danych) - wstrzykujesz kontekst i wymagasz cytowań z identyfikatorów, które sam podałeś; brak cytatu traktujesz jak błąd walidacji, nie jak drobiazg.</li>' +
            '<li><strong>Structured output</strong> (wymuszona struktura odpowiedzi) - schemat opisany w <strong>zod</strong> (biblioteka walidacji typów w TypeScript) albo w JSON Schema zamienia wolną prozę w kontrakt, który da się zwalidować i ponowić.</li>' +
            '<li><strong>Weryfikacja narzędziem</strong> - liczby liczy kod, nie model. Tak jak w React nie sumujesz koszyka w JSX, tylko w warstwie domenowej.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 1024,\n  system: "Answer only from CONTEXT. If missing, reply NOT_FOUND.",\n  messages: [{ role: "user", content: prompt }]\n});\n// res.usage.input_tokens / res.usage.output_tokens -> loguj oba</code></pre>' +
            '<p>Cenowo (stawki z 2026 roku dla klasy średniej, np. Claude Sonnet): około 3 USD za milion tokenów wejścia i 15 USD za milion tokenów wyjścia. Klasa mała (Haiku, GPT-4o-mini, Gemini Flash) to rząd wielkości taniej. Typowy TTFT dla promptu 2 tysięcy tokenów to 0,4-1,2 sekundy, a tempo generowania kilkadziesiąt tokenów na sekundę - te dwie liczby wystarczą, żeby oszacować latencję ekranu, zanim cokolwiek napiszesz.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Pytają o to zwykle tak: dlaczego temperatura 0 nie daje pełnej powtarzalności, czym różni się prefill od decode i dlaczego <strong>fine-tuning</strong> (dotrenowanie modelu na własnych przykładach) uczy stylu oraz formatu, a nie świeżych faktów. Odpowiedź na ostatnie: gradient rozmywa wiedzę po miliardach wag, więc pojedynczy fakt widziany kilkanaście razy nie staje się niezawodnym rekordem - do faktów używasz retrievalu, czyli dociągania danych do promptu.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Historia rozmowy to twoja struktura danych i twój koszt - projektuj ją jak stan aplikacji, z jawną kompakcją, a nie jak nieskończony log.</li>' +
            '<li>Każdy fakt, który ma być prawdziwy, musi wejść do promptu albo przejść przez narzędzie; instrukcja "nie zmyślaj" nie zmienia rozkładu.</li>' +
            '<li>Testy i alerty buduj na schemacie, własnościach i metrykach zbiorczych, bo dokładny string nie jest kontraktem.</li>' +
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
            pl: 'Model pisze odpowiedź. Jak powstaje ta odpowiedź?',
            en: 'The model writes an answer. How does that answer come into being?'
          },
          options: [
            { pl: 'Cała naraz, jako gotowy blok tekstu', en: 'All at once, as one finished block of text' },
            { pl: 'Kawałek po kawałku: model za każdym razem wybiera następny fragment i dokleja go do tekstu', en: 'Chunk by chunk: each time the model picks the next fragment and glues it onto the text' },
            { pl: 'Model wyszukuje gotową odpowiedź w swojej bazie danych', en: 'The model looks the answer up in its database' },
            { pl: 'Model tłumaczy pytanie na kod SQL i wykonuje zapytanie', en: 'The model translates the question into SQL and runs a query' }
          ],
          correct: 1,
          explain: {
            pl: 'To jest ta pętla autouzupełniania: jeden kawałek słowa, doklejenie, i wszystko od nowa. Dlatego długa odpowiedź trwa dłużej niż krótka.',
            en: 'That is the autocomplete loop: one chunk of a word, glue it on, start over. Which is why a long answer takes longer than a short one.'
          }
        },
        {
          q: {
            pl: 'Co model wylicza w jednym przebiegu sieci?',
            en: 'What does the model compute in a single forward pass?'
          },
          options: [
            { pl: 'Skrót (hash) promptu używany jako klucz cache', en: 'A hash of the prompt used as a cache key' },
            { pl: 'Cała odpowiedź naraz', en: 'The entire answer at once' },
            { pl: 'Rozkład prawdopodobieństwa nad następnym tokenem', en: 'A probability distribution over the next token' },
            { pl: 'Zapytanie do bazy wiedzy', en: 'A query against a knowledge base' }
          ],
          correct: 2,
          explain: {
            pl: 'Jeden przebieg daje jeden rozkład nad całym słownikiem, z którego losowany jest jeden token. Odpowiedź na 300 tokenów to 300 takich przebiegów.',
            en: 'One pass yields one distribution over the whole vocabulary, from which one token is sampled. A 300-token answer is 300 such passes.'
          }
        },
        {
          q: {
            pl: 'Wysyłasz drugie pytanie w tej samej rozmowie. Co realnie dzieje się po stronie API?',
            en: 'You send a second question in the same conversation. What actually happens at the API?'
          },
          options: [
            { pl: 'Serwer trzyma sesję i dokleja tylko nową wiadomość', en: 'The server holds a session and appends only the new message' },
            { pl: 'Model dotrenowuje się na poprzedniej wymianie', en: 'The model fine-tunes itself on the previous exchange' },
            { pl: 'Poprzednie tokeny są odczytywane z pamięci modelu', en: 'Earlier tokens are read back from the model memory' },
            { pl: 'Wysyłasz całą historię od nowa jako tokeny wejściowe', en: 'You resend the whole history as input tokens' }
          ],
          correct: 3,
          explain: {
            pl: 'API jest bezstanowe jak zwykły endpoint HTTP. Historia to po prostu dłuższe wejście - i dlatego długa rozmowa kosztuje coraz więcej.',
            en: 'The API is stateless like any HTTP endpoint. History is simply a longer input - which is exactly why long chats get more expensive.'
          }
        },
        {
          q: {
            pl: 'Dwa uruchomienia tego samego promptu z ustawieniem temperature 0 (czyli "zawsze wybieraj token o najwyższym wyniku") dają lekko różne odpowiedzi. Które wyjaśnienie jest najbardziej prawdopodobne?',
            en: 'Two runs of the same prompt with temperature 0 (meaning "always take the highest-scoring token") give slightly different answers. Which explanation is most likely?'
          },
          options: [
            { pl: 'Model dotrenował się na twoim poprzednim zapytaniu', en: 'The model fine-tuned itself on your previous request' },
            { pl: 'Sumowanie liczb zmiennoprzecinkowych na GPU odbywa się w zmiennej kolejności, więc dwa niemal równe wyniki mogą się zamienić miejscami', en: 'Floating-point sums on the GPU happen in a varying order, so two nearly equal scores can swap places' },
            { pl: 'Temperature 0 oznacza losowanie z całego słownika', en: 'Temperature 0 means sampling from the entire vocabulary' },
            { pl: 'Cache promptu zwrócił starszą zapisaną odpowiedź', en: 'The prompt cache returned an older stored answer' }
          ],
          correct: 1,
          explain: {
            pl: 'Temperature 0 usuwa losowość samplingu, ale nie niedeterminizm arytmetyki na GPU. Jeden zamieniony token na starcie rozjeżdża całą dalszą generację - dlatego testuj schemat i własności, nie dokładny string.',
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
            pl: 'Najmniejsza jednostka, jaka widzi model - zwykle kawałek słowa, nie litera i nie słowo. Rozliczenie i limity API są liczone w tokenach, w angielskim to średnio około 4 znaki na token.',
            en: 'The smallest unit the model sees - usually a piece of a word, not a letter and not a word. Billing and API limits are counted in tokens; in English roughly 4 characters per token.'
          }
        },
        {
          term: { pl: 'BPE', en: 'BPE (Byte Pair Encoding)' },
          def: {
            pl: 'Algorytm budowy słownika tokenów: startuje od bajtów i iteracyjnie skleja najczęstsze pary w większe jednostki. Dlatego częste słowa są jednym tokenem, a rzadkie rozpadają się na kilka.',
            en: 'The algorithm that builds the token vocabulary: it starts from bytes and repeatedly merges the most frequent pair into a larger unit. Common words end up as one token, rare ones split into several.'
          }
        },
        {
          term: { pl: 'tokenizer', en: 'tokenizer' },
          def: {
            pl: 'Deterministyczna funkcja tekst -> lista id tokenów, powiązana z konkretnym modelem. Liczby tokenów nie przenoszą się między dostawcami - policzone <code>tiktoken</code> nie są liczbami Claude.',
            en: 'The deterministic text -> list of token ids function tied to one specific model. Token counts are not portable between providers - what <code>tiktoken</code> reports is not what Claude charges.'
          }
        },
        {
          term: { pl: 'inflacja tokenów', en: 'token inflation' },
          def: {
            pl: 'Ten sam tekst po polsku, w JSON-ie z wcięciami albo w base64 zajmuje znacząco więcej tokenów niż zwykła angielska proza. To bezpośrednio koszt i zjedzone okno kontekstu.',
            en: 'The same content in Polish, in pretty-printed JSON or in base64 costs far more tokens than plain English prose. That is money and context window burned directly.'
          }
        },
        {
          term: { pl: 'problem strawberry', en: 'the strawberry problem' },
          def: {
            pl: 'Model nie umie policzyć liter w słowie, bo nigdy nie widzi liter - widzi tokeny. Ten sam mechanizm psuje odwracanie stringów, rymy i liczenie znaków: takie zadania oddaje się narzędziu.',
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
          pl: 'Tekst jest cięty na tokeny (kawałki słów) zanim dotrze do modelu. Ten sam tekst kosztuje inną liczbę tokenów w zależności od języka i formatu.',
          en: 'Text is cut into tokens (chunks of words) before it reaches the model. The same text costs a different number of tokens depending on language and format.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Trening tokenizera na jednym słowie: BPE łączy najczęstszą parę symboli, zapisuje regułę i powtarza, aż słowo lowest zostaje dwoma tokenami.',
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
                pl: 'BPE zaczyna od alfabetu: każdy znak to osobny symbol. Na tym etapie słowo lowest kosztuje sześć tokenów.',
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
              label: { pl: '2. Najczęstsza para', en: '2. The most frequent pair' },
              note: {
                pl: 'Algorytm liczy wystąpienia wszystkich sąsiednich par w całym korpusie i wybiera zwycięzcę. Tu wygrywa e + s.',
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
              label: { pl: '3. Sklejka rośnie', en: '3. The merge grows' },
              note: {
                pl: 'Nowy symbol es wchodzi do słownika i od razu bierze udział w kolejnym liczeniu par. Końcówka est jest częsta w angielskim.',
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
              label: { pl: '4. Początek słowa', en: '4. The head of the word' },
              note: {
                pl: 'Ten sam mechanizm działa od lewej strony słowa. Każda reguła jest numerowana, więc kolejność łączenia jest zawsze taka sama.',
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
              label: { pl: '5. Przedostatnia reguła', en: '5. One rule to go' },
              note: {
                pl: 'Słowo low występuje w korpusie samodzielnie tysiące razy, więc opłaca się mieć dla niego jeden symbol.',
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
                pl: 'Model dostaje dwa identyfikatory, nie sześć liter. Dlatego pytanie o liczbę liter r w słowie jest dla niego zagadką, a nie odczytem.',
                en: 'The model receives two ids, not six letters. That is why counting the letter r in a word is a puzzle for it, not a lookup.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Problem strawberry rozłożony na czynniki: co widzisz ty, co widzi model i dlaczego liczenie liter jest dla niego zgadywanką.',
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
                pl: 'Dla ciebie słowo to tablica znaków, więc liczenie liter jest dokładne i darmowe. To jest punkt odniesienia dla następnej klatki.',
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
                pl: 'Model dostaje trzy liczby. Pisownia tokena nie jest częścią wejścia - musi zostać odtworzona z pamięci wzorców, a nie odczytana.',
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
                pl: 'Nie ma promptu, który naprawi warstwę tokenizacji. Zadania znakowe oddajesz kodowi - w produkcie to jedna funkcja narzędziowa.',
                en: 'No prompt fixes the tokenization layer. Character-level tasks go to code - in a product that is one tool function.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Ta sama treść, cztery formaty: jak zapis danych zmienia liczbę tokenów i rachunek, zanim model cokolwiek pomyśli.',
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
              label: { pl: '1. JSON z wcięciami', en: '1. Pretty JSON' },
              note: {
                pl: 'Punkt wyjścia: piękny, czytelny JSON. Każdy klucz powtarza się w każdym wierszu, więc płacisz za tę samą nazwę pola pięćdziesiąt razy.',
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
                pl: 'Ta sama treść w CSV: nazwy kolumn raz w nagłówku zamiast w każdym wierszu. Typowa oszczędność to 40-50 procent tokenów wejścia.',
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
              label: { pl: '3. Krótkie aliasy', en: '3. Short aliases' },
              note: {
                pl: 'UUID to 8-12 tokenów bez znaczenia dla modelu. Aliasy d1..d50 tną koszt i jednocześnie zmniejszają ryzyko przekręcenia identyfikatora w cytowaniu.',
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
              label: { pl: '4. Język też kosztuje', en: '4. Language costs too' },
              note: {
                pl: 'Polski tekst to zwykle 30-60 procent więcej tokenów niż ten sam sens po angielsku. Dlatego budżet liczy się tokenizerem, nie długością stringa.',
                en: 'Polish text is usually 30-60 percent more tokens than the same meaning in English. Which is why budgets are counted with a tokenizer, not with string length.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Model nie czyta liter. Zanim tekst do niego dotrze, ktoś tnie go na kawałki, trochę jak batonik na kęsy. Czasem kęs to całe słowo, czasem sama końcówka, czasem trzy przypadkowe litery.</p>' +
            '<p>Słowo "truskawka" może zostać pocięte na trzy kęsy. I teraz clou: kiedy pytasz model, ile jest w nim liter "r", on nie widzi liter. Widzi trzy kęsy z numerkami. To tak, jakbyś próbował policzyć ziarenka maku, patrząc wyłącznie na zdjęcie całej bułki z opisem "bułka z makiem".</p>' +
            '<p>Dlatego model, który pięknie napisze esej, potrafi się pomylić przy liczeniu liter albo przy odwracaniu słowa od tyłu. To nie znaczy, że jest głupi. To znaczy, że pokazujesz mu zadanie w jednostkach, których nie ma jak zobaczyć - jakbyś prosił kogoś o policzenie pikseli, pokazując mu tylko nazwę pliku.</p>' +
            '<p>Kęsy mają też drugą stronę, mniej filozoficzną, za to widoczną na fakturze: za każdy kęs płacisz. Im więcej kęsów wysyłasz i im więcej model odsyła, tym większy rachunek. A liczba kęsów zależy nie tylko od tego, ile napisałeś, ale i jak. To samo zdanie po polsku to więcej kęsów niż po angielsku, a upakowane w ładny JSON z wcięciami - jeszcze więcej.</p>',
          en: '<p>The model does not read letters. Before your text reaches it, something slices it into chunks, a bit like cutting a chocolate bar into bites. Sometimes a bite is a whole word, sometimes just an ending, sometimes three random letters.</p>' +
            '<p>The word "strawberry" might be cut into three bites. Here is the punchline: when you ask how many letter r it contains, the model does not see letters. It sees three numbered bites. It is like counting poppy seeds while only ever looking at a photo of the whole bun labelled "bun with poppy seeds".</p>' +
            '<p>So a model that writes a beautiful essay can still fumble counting letters or spelling a word backwards. That does not mean it is stupid. It means you handed it a task in units it has no way of seeing - like asking someone to count pixels when all you showed them is the filename.</p>' +
            '<p>Bites have a second, less philosophical side that shows up on the invoice: you pay per bite. The more bites you send and the more the model sends back, the bigger the bill. And the number of bites depends not only on how much you wrote, but how. The same sentence in Polish is more bites than in English, and packed into pretty indented JSON, more still.</p>'
        },
        school: {
          pl: '<p><strong>Tokenizacja</strong> to zamiana tekstu na liczby, które rozumie sieć. Standardem jest <strong>BPE</strong> (Byte Pair Encoding - kodowanie par bajtów). Algorytm startuje od pojedynczych bajtów i wielokrotnie skleja najczęstszą sąsiadującą parę symboli w nowy symbol, aż powstanie <strong>słownik</strong> zadanej wielkości, czyli lista wszystkich tokenów, jakie model będzie znał. Efekt: częste słowa mają własny token, rzadkie rozpadają się na kawałki.</p>' +
            '<p>Kilka reguł kciuka dla angielskiego: 1 token to około 4 znaki, czyli około 0,75 słowa. Strona A4 to mniej więcej 500-700 tokenów. Polski wypada gorzej, bo tokenizery były trenowane głównie na angielskim - ten sam sens po polsku potrafi kosztować 1,3-2 razy więcej tokenów. Odmiana przez przypadki robi swoje: "kontenerach" to nie jeden symbol, tylko kilka.</p>' +
            '<h4>Worked example: rachunek za jeden endpoint</h4>' +
            '<p>Twój prompt ma 6000 znaków angielskiego tekstu, czyli około 1500 tokenów. Odpowiedź to 400 tokenów. Przy cenniku 3 USD za milion tokenów wejścia i 15 USD za milion wyjścia jedno wywołanie kosztuje 1500 razy 0,000003 plus 400 razy 0,000015, czyli 0,0045 plus 0,006 - razem około jednego centa. Przy 200 tysiącach wywołań miesięcznie to około 2100 USD. Teraz to samo po polsku: wejście rośnie do około 2200 tokenów i rachunek rośnie o kilkaset dolarów, mimo że treść jest identyczna.</p>' +
            '<h4>Słynny problem z truskawką</h4>' +
            '<p>Pytanie "ile r jest w strawberry" bywa trudne, bo model dostaje trzy tokeny, a nie dziesięć liter. Litery są dla niego czymś, o czym musi wnioskować pośrednio, tak jak ty wnioskujesz o zawartości pliku po jego nazwie. Rozwiązanie w produkcie jest banalne: takie zadania oddajesz kodowi lub narzędziu, zamiast prosić model o liczenie.</p>' +
            '<p>Ta sama logika tłumaczy inne dziwactwa: literówka potrafi całkiem zmienić podział na tokeny, więc model reaguje inaczej niż na poprawny zapis, a biały znak ma znaczenie, bo token to zwykle spacja plus słowo.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Model widzi tokeny, nie litery - liczenie znaków oddaj kodowi. Liczba tokenów zależy od języka i formatu danych, więc ten sam sens ma różną cenę. A gdy szacujesz koszt albo sprawdzasz, czy tekst zmieści się w oknie kontekstu, licz prawdziwym tokenizerem, nie długością stringa.</p>',
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
          pl: '<p>Tokenizer to <strong>warstwa serializacji</strong> między twoim stringiem a modelem - dokładnie tak, jak JSON siedzi między obiektem a formatem przesyłanym po sieci. I tak samo jak przy JSON, wybór formatu ma mierzalny koszt.</p>' +
            '<h4>Liczby, które warto mieć w głowie</h4>' +
            '<ul>' +
            '<li>Angielski: około 4 znaki na token. Polski: często 2,5-3 znaki na token, czyli 30-60 procent narzutu na to samo zdanie.</li>' +
            '<li>Słowniki: GPT-4o używa <code>o200k_base</code> (około 200 tysięcy tokenów), starsze GPT-4 używało <code>cl100k_base</code> (około 100 tysięcy). Modele Claude i Gemini mają własne tokenizery - liczby tokenów nie są przenoszalne między dostawcami.</li>' +
            '<li><strong>UUID</strong> (128-bitowy identyfikator zapisany jako 36 znaków) w JSON to zwykle 8-12 tokenów. Tabela z 500 wierszami i pełnymi identyfikatorami potrafi zjeść 10-15 tysięcy tokenów samych kluczy i idków.</li>' +
            '<li><strong>base64</strong> (tekstowe kodowanie danych binarnych) i emoji są drogie - jeden emoji to często 2-4 tokeny.</li>' +
            '</ul>' +
            '<h4>Praktyki produkcyjne</h4>' +
            '<p>Licz tokeny przed wysłaniem, nie po fakcie. Po stronie Node używasz <code>tiktoken</code> albo <code>gpt-tokenizer</code> dla OpenAI, a dla Claude endpointu <code>count_tokens</code> w oficjalnym SDK Anthropic. Traktuj to jak middleware walidacyjne, dokładnie tak jak zod na granicy API.</p>' +
            '<pre><code>import { encoding_for_model } from "tiktoken";\nconst enc = encoding_for_model("gpt-4o");\nconst n = enc.encode(payload).length;\nif (n &gt; BUDGET) payload = shrink(payload);\nenc.free();</code></pre>' +
            '<p>Optymalizacja formatu daje realne oszczędności: zamiana tablicy obiektów JSON na CSV z nagłówkiem potrafi obciąć 40-50 procent tokenów, bo klucze nie powtarzają się w każdym wierszu. Skracanie identyfikatorów z UUID do krótkich aliasów (<code>d1</code>, <code>d2</code>) przy okazji ułatwia modelowi cytowanie i zmniejsza ryzyko przekręcenia identyfikatora - model, który ma przepisać 36 znaków losowego ciągu, myli się znacznie częściej niż ten, który ma napisać <code>d7</code>.</p>' +
            '<h4>Pułapki</h4>' +
            '<p>Nie tnij tekstu po znakach - możesz rozciąć token w połowie i zepsuć streaming albo trafienia w cache promptu. Nie zakładaj, że <code>text.length / 4</code> wystarczy dla języków innych niż angielski. Pamiętaj, że <code>max_tokens</code> dotyczy wyłącznie wyjścia, a limit okna kontekstu obejmuje wejście plus wyjście razem - podniesienie <code>max_tokens</code> nie zrobi miejsca na większe dane. I nie proś modelu o zadania znakowe (liczenie liter, odwracanie, dokładne wyrównanie tabelek ASCII) - to robota dla <code>String.prototype</code>, nie dla LLM.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Klasyczne pytanie: dlaczego ten sam prompt kosztuje inaczej u dwóch dostawców, mimo identycznej treści. Powód jest podwójny - inny tokenizer daje inną liczbę tokenów, a cennik jest liczony właśnie za tokeny, nie za znaki. Dlatego porównania kosztów robi się na realnym ruchu, licząc tokeny tokenizerem konkretnego dostawcy, a nie przelicznikiem znaków.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Format danych w prompcie to decyzja kosztowa - CSV plus krótkie aliasy zamiast rozlazłego JSON-a to zwykle najtańsza optymalizacja w całym systemie.</li>' +
            '<li>Licznik tokenów wpinasz w kod przed wysłaniem requestu i alertujesz na wzrost, tak jak na rozmiar bundle.</li>' +
            '<li>Każde zadanie operujące na znakach przenosisz do narzędzia, bo żadna wersja promptu nie da modelowi dostępu do liter.</li>' +
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
            pl: 'Dlaczego model myli się, gdy pytasz go, ile liter "r" jest w słowie strawberry?',
            en: 'Why does the model stumble when you ask how many letter r are in strawberry?'
          },
          options: [
            { pl: 'Bo dostaje słowo pocięte na kilka kawałków i nie widzi pojedynczych liter', en: 'Because it gets the word cut into a few chunks and cannot see individual letters' },
            { pl: 'Bo nie zna angielskiego słownictwa kulinarnego', en: 'Because it does not know English food vocabulary' },
            { pl: 'Bo pytanie jest zbyt długie jak na okno kontekstu', en: 'Because the question is too long for the context window' },
            { pl: 'Bo litera r jest rzadka w danych treningowych', en: 'Because the letter r is rare in training data' }
          ],
          correct: 0,
          explain: {
            pl: 'Warstwa tokenizacji ukrywa litery: model widzi trzy kawałki z numerkami, nie dziesięć znaków. Takie zadanie oddaje się kodowi - w JS to jedna linia.',
            en: 'The tokenization layer hides letters: the model sees three numbered chunks, not ten characters. Hand that task to code - one line in JS.'
          }
        },
        {
          q: {
            pl: 'Ile mniej więcej tokenów ma 1000 znaków zwykłego angielskiego tekstu?',
            en: 'Roughly how many tokens are in 1000 characters of ordinary English prose?'
          },
          options: [
            { pl: 'Około 1000', en: 'About 1000' },
            { pl: 'Około 60', en: 'About 60' },
            { pl: 'Około 250', en: 'About 250' },
            { pl: 'Około 4000', en: 'About 4000' }
          ],
          correct: 2,
          explain: {
            pl: 'Reguła kciuka: około 4 znaki na token w angielskim. W polskim wychodzi znacznie gorzej, często 2,5-3 znaki na token, więc ta sama treść kosztuje więcej.',
            en: 'Rule of thumb: about 4 characters per token in English. Polish is much worse, often 2.5-3 characters per token, so identical content costs more.'
          }
        },
        {
          q: {
            pl: 'Jak działa BPE w jednym zdaniu?',
            en: 'How does BPE work, in one sentence?'
          },
          options: [
            { pl: 'Dzieli tekst po spacjach i znakach interpunkcyjnych', en: 'It splits text on spaces and punctuation' },
            { pl: 'Tłumaczy tekst na angielski przed tokenizacją', en: 'It translates text into English before tokenizing' },
            { pl: 'Przypisuje każdej literze osobny numer w słowniku', en: 'It assigns every letter its own vocabulary id' },
            { pl: 'Iteracyjnie skleja najczęstsze sąsiadujące pary symboli w nowe symbole', en: 'It iteratively merges the most frequent adjacent symbol pairs into new symbols' }
          ],
          correct: 3,
          explain: {
            pl: 'Dlatego częste słowa mają jeden token, a rzadkie rozpadają się na kawałki - o podziale decyduje częstotliwość w danych treningowych, a nie gramatyka.',
            en: 'That is why frequent words get a single token while rare ones fragment - frequency in the training data decides the split, not grammar.'
          }
        },
        {
          q: {
            pl: 'W prompcie wysyłasz 800 rekordów jako tablice obiektów JSON, każdy z polem UUID (36-znakowy identyfikator). Przekraczasz budżet tokenów wejścia. Która zmiana da największą oszczędność przy najmniejszym ryzyku?',
            en: 'Your prompt sends 800 records as a JSON object array, each with a UUID field (a 36-character identifier). You are over the input token budget. Which change saves the most with the least risk?'
          },
          options: [
            { pl: 'Obniżyć temperature do 0', en: 'Lower temperature to 0' },
            { pl: 'Zamienić tablicę obiektów na CSV z nagłówkiem i skrócić identyfikatory do aliasów d1..d800', en: 'Convert the object array to CSV with a header and shorten ids to aliases d1..d800' },
            { pl: 'Zwiększyć max_tokens, żeby zmieścić więcej danych', en: 'Raise max_tokens so more data fits' },
            { pl: 'Przetłumaczyć dane na angielski', en: 'Translate the data into English' }
          ],
          correct: 1,
          explain: {
            pl: 'CSV usuwa klucze powtarzane w każdym wierszu (często 40-50 procent oszczędności), a krótkie aliasy tną po 8-12 tokenów na każdym UUID i ułatwiają poprawne cytowanie. max_tokens dotyczy wyjścia, więc nie zwolni miejsca na wejściu.',
            en: 'CSV drops the keys repeated on every row (often 40-50 percent savings) and short aliases cut 8-12 tokens per UUID while making citation more reliable. max_tokens governs output, so it frees no input room.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'context-window',
      title: {
        pl: 'Okno kontekstu i jego pułapki',
        en: 'The context window and its traps'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'okno kontekstu', en: 'context window' },
          def: {
            pl: 'Maksymalna liczba tokenów wejścia i wyjścia w jednym wywołaniu. To budżet na request, a nie pamięć - model jest bezstanowy i przy każdym wywołaniu dostaje całą historię od nowa.',
            en: 'The maximum number of input plus output tokens in a single call. It is a per-request budget, not memory - the model is stateless and receives the whole history again every time.'
          }
        },
        {
          term: { pl: 'obcinanie', en: 'truncation' },
          def: {
            pl: 'Usuwanie części historii, gdy przestaje się mieścić w oknie. Robione naiwnie (od początku) wycina system prompt albo pierwotne wymagania - dlatego kolejność i priorytety trzeba ustalić jawnie.',
            en: 'Dropping part of the history when it no longer fits. Done naively, from the top, it removes the system prompt or the original requirements - so ordering and priorities must be explicit.'
          }
        },
        {
          term: { pl: 'lost in the middle', en: 'lost in the middle' },
          def: {
            pl: 'Empiryczny efekt: model najlepiej wykorzystuje początek i koniec kontekstu, a fakty ze środka gubi. Najważniejsze instrukcje i dokumenty kładzie się na brzegach promptu.',
            en: 'The empirical effect that models use the beginning and the end of the context best and lose facts placed in the middle. Put the critical instructions and documents at the edges of the prompt.'
          }
        },
        {
          term: { pl: 'needle in a haystack', en: 'needle in a haystack' },
          def: {
            pl: 'Test długiego kontekstu: chowasz jedno zdanie w ogromnym tekście i sprawdzasz, czy model je znajdzie. Wysoki wynik oznacza wyszukanie faktu, a nie rozumowanie na całym dokumencie.',
            en: 'A long-context benchmark: hide one sentence in a huge text and check whether the model retrieves it. A high score means fact lookup, not reasoning over the whole document.'
          }
        },
        {
          term: { pl: 'kontekst vs RAG vs fine-tuning', en: 'context vs RAG vs fine-tuning' },
          def: {
            pl: 'Trzy sposoby dostarczenia wiedzy: wkleić do promptu (małe, zmienne dane), dociągnąć przez RAG (duży, zmienny korpus), dotrenować (styl i format, nie fakty).',
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
          pl: 'Okno kontekstu to jeden bufor na wszystko: system prompt, historię, dokumenty i odpowiedź. Fakty w środku długiego kontekstu są odzyskiwane najsłabiej.',
          en: 'The context window is one buffer for everything: system prompt, history, documents and the answer. Facts buried mid-context are recalled the least reliably.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Jak okno zapełnia się w prawdziwej rozmowie i co dokładnie znika, gdy biblioteka po cichu przycina historię.',
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
                pl: 'Na starcie okno świeci pustkami. Warto zapamiętać skład: system prompt i definicje narzędzi płacisz przy każdym wywołaniu, nawet gdy się nie zmieniają.',
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
              label: { pl: '2. Prawie pełno', en: '2. Nearly full' },
              note: {
                pl: 'Historia i dokumenty zjadły 93 procent budżetu. Odpowiedź musi zmieścić się w tym, co zostało - okno jest wspólne dla wejścia i wyjścia.',
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
              label: { pl: '3. Ciche obcięcie', en: '3. Silent truncation' },
              note: {
                pl: 'Naiwne przycięcie zaczyna od najstarszych wiadomości - czyli od system promptu i pierwotnych ustaleń. Błędu nie ma, jest tylko gorsza jakość.',
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
                pl: 'Zamiast wyrzucać stare tury, streszczasz je i doklejasz osobny blok stanu z faktami krytycznymi. Okno spada z 93 do 20 procent bez utraty ustaleń.',
                en: 'Instead of evicting old turns you summarise them and re-append a separate state block with the critical facts. The window drops from 93 to 20 percent with no lost decisions.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Test needle in a haystack: ten sam fakt, trzy pozycje w długim kontekście i trzy bardzo różne skuteczności.',
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
              label: { pl: '1. Igła na początku', en: '1. Needle at the start' },
              note: {
                pl: 'Fakt w pierwszych procentach promptu jest odnajdywany praktycznie zawsze. Dlatego instrukcje systemowe trzymamy na samej górze.',
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
              label: { pl: '2. Igła w środku', en: '2. Needle in the middle' },
              note: {
                pl: 'Ten sam fakt w połowie kontekstu bywa pomijany. Model nie zgłasza problemu - po prostu odpowiada tak, jakby faktu nie było.',
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
              label: { pl: '3. Igła na końcu', en: '3. Needle at the end' },
              note: {
                pl: 'Tuż przed pytaniem skuteczność wraca do maksimum. Stąd reguły układu promptu: krytyczne instrukcje na górze albo na samym dole, nigdy w środku.',
                en: 'Right before the question, accuracy is back at maximum. Hence the layout rule: critical instructions at the top or the very bottom, never in the middle.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Kontekst, RAG czy fine-tuning: to samo pytanie o cenę katalogu, trzy architektury i trzy rachunki.',
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
                pl: 'Wklejenie całego katalogu działa i jest świeże, ale kosztuje kilka dolarów za wywołanie i dokłada kilkanaście sekund do pierwszego tokena.',
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
                pl: 'Dotrenowanie wtapia dane w wagi: nie ma cytowania, nie ma świeżości, a każda zmiana ceny wymaga kolejnego treningu. Fakty tak się nie przechowuje.',
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
                pl: 'Dociągasz sześć pasujących wierszy zamiast czterdziestu tysięcy. Dane są świeże, źródło cytowalne, a rachunek spada o dwa rzędy wielkości.',
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
                pl: 'RAG wygrywa przy wielu dokumentach i punktowych pytaniach. Długi kontekst wygrywa, gdy odpowiedź wymaga całego dokumentu naraz - umowy, transkrypcji, dużego pliku.',
                en: 'RAG wins for many documents and pinpoint questions. Long context wins when the answer needs the whole document at once - a contract, a transcript, one big file.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie biurko o stałej wielkości. Wszystko, co ma być użyte teraz, musi na nim leżeć: notatka od szefa, poprzednie rozmowy, wydruki i jeszcze miejsce na kartkę, na której właśnie piszesz. Jak zabraknie miejsca, coś musi spaść na podłogę.</p>' +
            '<p>Model też ma takie biurko i nazywa się ono okno kontekstu. Wszystko, co mu wyślesz, i wszystko, co odpisze, musi się na nim zmieścić naraz. Nie ma szuflady na potem.</p>' +
            '<p>Jest też druga rzecz, znacznie dziwniejsza. Jeśli biurko jest zawalone, model najlepiej pamięta to, co leży na samej górze i na samym spodzie stosu. To, co utknęło dokładnie w środku, gubi się najczęściej - dokładnie jak u ludzi, którzy z listy zakupów pamiętają pierwszą i ostatnią pozycję, a te ze środka odkrywają dopiero w domu.</p>' +
            '<p>Najgorsze jest to, że kiedy coś spada z biurka, nikt nie krzyczy. Model nie powie ci "zgubiłem twoją notatkę". On odpowie dalej, pewnym głosem, tylko trochę głupiej. Dlatego celem nigdy nie jest wrzucenie modelowi wszystkiego, co masz. Celem jest położyć na biurku dokładnie te kartki, które są potrzebne do tego jednego zadania - i te najważniejsze położyć na wierzchu.</p>',
          en: '<p>Picture a desk of fixed size. Everything you need right now has to lie on it: the note from your boss, earlier conversations, printouts, and the sheet you are writing on. When it runs out of room, something falls on the floor.</p>' +
            '<p>The model has such a desk too, and it is called the context window. Everything you send and everything it writes back must fit on it at once. There is no drawer for later.</p>' +
            '<p>There is a second, much stranger thing. When the desk is crowded, the model best recalls what sits at the very top and the very bottom of the pile. Whatever is stuck exactly in the middle gets lost most often - just like people who remember the first and last items on a shopping list and rediscover the middle ones back at home.</p>' +
            '<p>The worst part: when something falls off the desk, nobody shouts. The model will not say "I dropped your note". It will keep answering in a confident voice, just slightly dumber. So the goal is never to dump everything you have on the model. The goal is to place exactly the sheets this one task needs - and to put the most important ones on top.</p>'
        },
        school: {
          pl: '<p><strong>Okno kontekstu</strong> (context window) to maksymalna liczba tokenów, które model przetwarza w jednym wywołaniu - i liczy się do niego wszystko: system prompt (stała instrukcja na górze rozmowy), cała historia, wklejone dokumenty, definicje narzędzi oraz wygenerowana odpowiedź. Typowe wielkości w 2026 roku to 128 tysięcy tokenów w modelach produkcyjnych i 1 milion w wariantach long-context.</p>' +
            '<h4>Worked example: co się mieści w 128k</h4>' +
            '<p>System prompt 1800 tokenów, definicje pięciu narzędzi 2100, sześć dociągniętych dokumentów po 800 tokenów to 4800, historia 39 tur po około 250 tokenów to około 9750. Razem około 18,5 tysiąca tokenów, czyli 14 procent budżetu - komfortowo. Ale gdy zamiast sześciu dokumentów wkleisz cały podręcznik na 90 tysięcy tokenów, zostaje niecałe 20 tysięcy na odpowiedź i całą dalszą rozmowę, a prefill (przeliczenie wejścia) wydłuża czas do pierwszego tokena kilkukrotnie.</p>' +
            '<p>Kiedy przekroczysz limit, dostajesz błąd albo - w niektórych bibliotekach - ciche <strong>obcinanie</strong> (truncation) najstarszych wiadomości. To drugie jest groźniejsze, bo aplikacja działa dalej, tylko odpowiedzi robią się głupsze bez żadnego sygnału w logach.</p>' +
            '<h4>Lost in the middle</h4>' +
            '<p>Badania i praktyka zgadzają się: ten sam fakt umieszczony na początku lub końcu długiego kontekstu jest odnajdywany niemal zawsze, a umieszczony w połowie bywa pomijany w kilkudziesięciu procentach przypadków. Test <strong>needle in a haystack</strong> (igła w stogu siana) polega właśnie na chowaniu jednego zdania w długim tekście i mierzeniu skuteczności odzyskania.</p>' +
            '<h4>Trzy sposoby na wiedzę modelu</h4>' +
            '<ul>' +
            '<li><strong>Kontekst</strong> - wklejasz dane do promptu. Natychmiastowe, drogie przy każdym wywołaniu, ograniczone rozmiarem okna.</li>' +
            '<li><strong>RAG</strong> (Retrieval-Augmented Generation - generowanie wsparte wyszukiwaniem) - wyszukujesz tylko potrzebne fragmenty i wklejasz je. Skaluje się do milionów dokumentów, dane są zawsze świeże.</li>' +
            '<li><strong>Fine-tuning</strong> - dostrajasz wagi na własnych przykładach. Uczy stylu, formatu i zachowania, ale kiepsko nadaje się do faktów, które się zmieniają.</li>' +
            '</ul>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Okno to jeden wspólny budżet na wejście i wyjście, a nie pamięć modelu. Fakty ze środka długiego kontekstu giną, więc instrukcje i pytanie trzymasz na brzegach promptu. Do zmiennych danych używasz RAG, a fine-tuning zostawiasz na styl i format.</p>',
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
          pl: '<p>Okno kontekstu to <strong>budżet, a nie pojemnik</strong>. Dwa niezależne powody, by go nie wypełniać do pełna: koszt i latencja rosną liniowo (prefill, czyli jednorazowe przeliczenie całego wejścia, dotyka każdego tokena), a jakość odzyskiwania spada wraz z długością - efektywne okno jest zauważalnie mniejsze niż nominalne.</p>' +
            '<h4>Układ promptu, który działa</h4>' +
            '<ol>' +
            '<li>Stabilny system prompt i definicje narzędzi na górze - te same bajty w tym samym miejscu dają trafienia <strong>prompt cache</strong> (mechanizmu, który pozwala dostawcy nie przeliczać powtarzanego prefiksu).</li>' +
            '<li>Dokumenty i dane w środku, każdy z jawnym identyfikatorem, na przykład <code>[doc:3]</code>, żeby model miał czym cytować.</li>' +
            '<li>Instrukcje zadania i faktyczne pytanie na samym końcu, tuż przed generowaniem.</li>' +
            '</ol>' +
            '<p>Reguły na końcu wygrywają z regułami zakopanymi w środku 60 tysięcy tokenów logów. Jeśli musisz je powtórzyć - powtórz; dwadzieścia tokenów jest tańsze niż źle wykonane zadanie.</p>' +
            '<pre><code>const messages = [\n  { role: "user", content: [\n      { type: "text", text: CONTEXT_DOCS },      // duże, w środku\n      { type: "text", text: "Question: " + q }   // małe, na końcu\n  ]}\n];</code></pre>' +
            '<h4>Zarządzanie długą rozmową</h4>' +
            '<p>W chatbocie stosujesz okno przesuwne plus <strong>kompakcję</strong> (zamianę starszych tur na zwięzłe streszczenie): co N tur streszczasz historię do stanu i trzymasz ostatnie 5-10 tur dosłownie. Ważne, by nigdy nie obcinać w środku pary <code>tool_use</code> / <code>tool_result</code> (zadanie wywołania narzędzia i jego wynik) - modele odrzucają niekompletną parę błędem walidacji, a szukanie tego potrafi zjeść pół dnia. Fakty krytyczne, czyli identyfikator klienta, wybrany plan i poczynione ustalenia, trzymaj w oddzielnej, zawsze doklejanej sekcji stanu, zamiast liczyć, że przetrwają w historii.</p>' +
            '<h4>Kiedy 1 mln tokenów nie jest odpowiedzią</h4>' +
            '<p>Wrzucenie całego repozytorium do okna 1M kosztuje przy typowych cenach (około 3 USD za milion tokenów wejścia) kilka dolarów za jedno wywołanie i dodaje kilkanaście sekund do TTFT (czasu do pierwszego tokena). RAG na tych samych danych to zwykle 3-8 tysięcy tokenów, kilkadziesiąt milisekund wyszukiwania i wyższa precyzja, bo model nie musi ignorować 990 tysięcy tokenów szumu. Long context wygrywa tam, gdzie dokument jest naprawdę niepodzielny i potrzebne jest rozumowanie globalne: długa umowa, jeden duży plik, transkrypcja całego spotkania.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej i w monitoringu</h4>' +
            '<p>Częste pytanie: skoro mamy okno 1M, po co jeszcze RAG. Odpowiedź zawiera trzy wątki - koszt liniowy względem wejścia, degradacja recall w długim kontekście i brak cytowalnego źródła. Praktycznie: zrób własny test needle-in-a-haystack na swoich danych, w kilku pozycjach i kilku długościach; powie ci więcej niż benchmark dostawcy, bo twoje dokumenty są powtarzalne, a syntetyczne igły z benchmarku są łatwe do znalezienia. Loguj <code>input_tokens</code> per zadanie i alertuj na wzrost - rozrastający się prompt to najczęstsza cicha przyczyna rosnącego rachunku.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Projektuj prompt jak layout, nie jak worek: stałe na górze, dane w środku z identyfikatorami, zadanie na dole.</li>' +
            '<li>Zamień ciche obcinanie na jawną kompakcję z blokiem stanu, bo utrata ustaleń nie generuje błędu i nie zostawia śladu.</li>' +
            '<li>Długie okno traktuj jak funkcję, którą płacisz przy każdym wywołaniu - domyślnie wybieraj retrieval, a cały dokument wkładaj tylko wtedy, gdy pytanie naprawdę go wymaga.</li>' +
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
            pl: 'Do czego można porównać okno kontekstu?',
            en: 'What is a good comparison for the context window?'
          },
          options: [
            { pl: 'Do trwałej pamięci modelu, która rośnie z każdą rozmową', en: 'To the permanent memory of the model, growing with every chat' },
            { pl: 'Do biurka o stałej wielkości, na którym musi zmieścić się wszystko potrzebne teraz', en: 'To a fixed-size desk that must hold everything needed right now' },
            { pl: 'Do dysku, na którym model zapisuje twoje pliki', en: 'To a disk where the model stores your files' },
            { pl: 'Do limitu liczby wiadomości na dobę', en: 'To a daily limit on the number of messages' }
          ],
          correct: 1,
          explain: {
            pl: 'To budżet na jedno wywołanie, wspólny dla tego, co wysyłasz, i tego, co model odpisze. Gdy się skończy, coś musi z biurka zniknąć.',
            en: 'It is a per-call budget shared by what you send and what the model writes back. When it runs out, something has to leave the desk.'
          }
        },
        {
          q: {
            pl: 'Co wlicza się do okna kontekstu?',
            en: 'What counts toward the context window?'
          },
          options: [
            { pl: 'Tylko ostatnia wiadomość użytkownika', en: 'Only the latest user message' },
            { pl: 'Tylko dokumenty dociągnięte przez RAG', en: 'Only the documents retrieved by RAG' },
            { pl: 'System prompt, historia, definicje narzędzi, dokumenty i odpowiedź razem', en: 'System prompt, history, tool definitions, documents and the answer together' },
            { pl: 'Wyłącznie tokeny wyjściowe', en: 'Output tokens only' }
          ],
          correct: 2,
          explain: {
            pl: 'Okno to jeden wspólny bufor na wejście i wyjście. Dlatego duży prompt realnie zjada miejsce na długą odpowiedź i podnosi czas do pierwszego tokena.',
            en: 'The window is a single shared buffer for input and output. A big prompt literally eats the room for a long answer and raises time to first token.'
          }
        },
        {
          q: {
            pl: 'Katalog produktów zmienia się codziennie i model ma odpowiadać na pytania o ceny. Co wybierasz?',
            en: 'A product catalog changes daily and the model must answer pricing questions. What do you pick?'
          },
          options: [
            { pl: 'Fine-tuning modelu co noc na nowym katalogu', en: 'Fine-tune the model nightly on the new catalog' },
            { pl: 'Wklejanie całego katalogu do każdego promptu', en: 'Paste the entire catalog into every prompt' },
            { pl: 'Dłuższy system prompt z regułami cenowymi', en: 'A longer system prompt with pricing rules' },
            { pl: 'RAG: wyszukanie kilku pasujących rekordów i wklejenie tylko ich', en: 'RAG: retrieve a few matching records and paste only those' }
          ],
          correct: 3,
          explain: {
            pl: 'Zmienne fakty należą do warstwy danych, nie do wag. RAG daje świeżość, niski koszt i cytowalne źródło, a fine-tuning nie daje żadnego z tych trzech.',
            en: 'Changing facts belong in the data layer, not in the weights. RAG gives freshness, low cost and a citable source; fine-tuning gives none of the three.'
          }
        },
        {
          q: {
            pl: 'Chatbot działa poprawnie, ale po około 30 turach zaczyna zapominać wcześniejsze ustalenia i myli identyfikator klienta. W logach nie ma żadnego błędu. Najbardziej prawdopodobna przyczyna i poprawka?',
            en: 'A chatbot works fine, but after roughly 30 turns it forgets earlier decisions and mixes up the customer id. There is no error in the logs. Most likely cause and fix?'
          },
          options: [
            { pl: 'Zbyt niska temperatura; podnieś ją do 1,0', en: 'Temperature too low; raise it to 1.0' },
            { pl: 'Biblioteka po cichu przycina najstarsze wiadomości; trzymaj krytyczny stan w osobnej sekcji doklejanej przy każdym wywołaniu', en: 'The library silently trims the oldest messages; keep critical state in a separate block re-appended on every call' },
            { pl: 'Wyczerpany limit max_tokens; zwiększ go dwukrotnie', en: 'max_tokens exhausted; double it' },
            { pl: 'Uszkodzony cache promptu; wyłącz caching', en: 'Corrupted prompt cache; disable caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Okno przesuwne wypycha najstarsze tury, czyli dokładnie te, w których siedzą początkowe ustalenia - i robi to bez błędu. Stan krytyczny trzymaj poza historią i dokładaj go za każdym razem.',
            en: 'A sliding window evicts the oldest turns, exactly where the initial decisions live - and it does so without an error. Keep critical state outside the history and re-append it every time.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'embeddings',
      title: {
        pl: 'Embeddingi: znaczenie jako współrzędne',
        en: 'Embeddings: meaning as coordinates'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'embedding', en: 'embedding' },
          def: {
            pl: 'Wektor liczb reprezentujący znaczenie tekstu - funkcja skrótu, która zachowuje bliskość sensu. Teksty o podobnym znaczeniu mają bliskie wektory, nawet bez wspólnych słów.',
            en: 'A vector of numbers representing the meaning of a text - a hash that preserves closeness of meaning. Similar texts land close together even with no words in common.'
          }
        },
        {
          term: { pl: 'podobieństwo kosinusowe', en: 'cosine similarity' },
          def: {
            pl: 'Miara podobieństwa dwóch wektorów: kosinus kąta między nimi, w praktyce od 0 do 1. Na znormalizowanych wektorach to zwykły iloczyn skalarny, dlatego liczy się ją bardzo szybko.',
            en: 'The similarity measure between two vectors: the cosine of the angle between them, in practice 0 to 1. On normalised vectors it is just a dot product, which is why it is so fast.'
          }
        },
        {
          term: { pl: 'wyszukiwanie semantyczne', en: 'semantic search' },
          def: {
            pl: 'Szukanie po znaczeniu zamiast po słowach kluczowych: zapytanie i dokumenty zamieniasz na embeddingi i zwracasz najbliższe wektory. Podstawa etapu retrievalu w RAG.',
            en: 'Searching by meaning instead of keywords: embed the query and the documents and return the nearest vectors. This is the retrieval half of RAG.'
          }
        },
        {
          term: { pl: 'asymetria zapytanie-dokument', en: 'query-document asymmetry' },
          def: {
            pl: 'Krótkie pytanie i długi dokument nie leżą naturalnie blisko siebie. Modele asymetryczne mają osobne prefiksy lub tryby dla zapytania i dokumentu - trzeba ich użyć, inaczej trafność spada.',
            en: 'A short question and a long document do not sit naturally close. Asymmetric embedding models use separate prefixes or modes for query and document - use them or recall drops.'
          }
        },
        {
          term: { pl: 'podobieństwo to nie trafność', en: 'similarity is not relevance' },
          def: {
            pl: 'Wysoki cosine oznacza tylko, że teksty są o tym samym - nie że dokument odpowiada na pytanie. Negacja i przeczenia są dla embeddingów prawie niewidoczne, stąd reranking.',
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
          pl: 'Embedding zamienia tekst w wektor. Zdania o podobnym znaczeniu wskazują w podobnym kierunku, więc kąt między nimi jest mały.',
          en: 'An embedding turns text into a vector. Sentences with similar meaning point in a similar direction, so the angle between them is small.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Od zdania do współrzędnych: co dokładnie robi model embeddingowy i dlaczego wynik jest jednokierunkowy.',
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
                pl: 'Model embeddingowy nie generuje tekstu. Jest mniejszy, tańszy i szybszy od czatowego, a jego zadaniem jest opisać tekst liczbami.',
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
                pl: 'Wynik ma zawsze tę samą długość, niezależnie od długości tekstu. Liczysz go raz przy zapisie i trzymasz obok rekordu, jak indeks w bazie.',
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
              label: { pl: '3. Mapa znaczeń', en: '3. The map of meaning' },
              note: {
                pl: 'Zdania bez ani jednego wspólnego słowa lądują obok siebie, bo znaczą to samo. Operacja jest jednokierunkowa - z wektora nie odtworzysz tekstu.',
                en: 'Sentences with no shared words land next to each other because they mean the same thing. The operation is one-way - you cannot rebuild the text from the vector.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Podobieństwo kosinusowe policzone ręcznie: dlaczego liczy się kąt, a nie długość wektora.',
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
              label: { pl: '1. Kierunek kontra długość', en: '1. Direction versus length' },
              note: {
                pl: 'Dwa wektory o tym samym kierunku, ale różnej długości, znaczą to samo. Dlatego miara musi ignorować długość - inaczej długie dokumenty zawsze by wygrywały.',
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
              label: { pl: '2. Wzór na liczbach', en: '2. The formula on numbers' },
              note: {
                pl: 'Iloczyn skalarny podzielony przez długości obu wektorów. Na znormalizowanych wektorach mianownik znika i zostaje samo mnożenie z sumowaniem.',
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
                pl: 'Wyszukiwanie polega na policzeniu tej samej liczby dla każdego kandydata i posortowaniu. Progi ustala się empirycznie - nie są przenoszalne między modelami.',
                en: 'Search is computing that one number for every candidate and sorting. Thresholds are set empirically - they do not transfer between models.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Wyszukiwanie semantyczne end-to-end plus jego najbardziej podstępna porażka: negacja.',
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
                pl: 'Wektory liczysz raz, przy zapisie dokumentu, i trzymasz w kolumnie obok treści. Zapisz też nazwę modelu - zmiana modelu wymusza pełny reindeks.',
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
                pl: 'Zapytanie przechodzi przez ten sam model, a baza zwraca najbliższe wektory. Filtr po najemcy musi działać przed rankingiem - to granica bezpieczeństwa.',
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
              label: { pl: '3. Pułapka negacji', en: '3. The negation trap' },
              note: {
                pl: 'Zdania różniące się tylko przeczeniem leżą obok siebie w przestrzeni wektorowej. Ratunkiem jest hybryda z BM25 i reranker oceniający parę zapytanie-dokument.',
                en: 'Sentences differing only by a negation sit next to each other in vector space. The remedy is a BM25 hybrid plus a reranker that scores the query-document pair jointly.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie ogromną mapę miasta, na której każde zdanie ma swój adres. Nie taki adres jak ulica i numer, tylko taki, że <em>rzeczy o podobnym znaczeniu mieszkają obok siebie</em>.</p>' +
            '<p>"Jak zmienić hasło" i "zapomniałem loginu" będą sąsiadami zza płotu, chociaż nie mają ani jednego wspólnego słowa. A "dostawa pizzy" wyląduje na drugim końcu miasta, przy obwodnicy.</p>' +
            '<p>Embedding to właśnie sposób wyliczania takiego adresu. Wrzucasz zdanie, dostajesz długą listę liczb - to są współrzędne na mapie znaczeń. Zawsze tyle samo liczb, czy wrzucisz trzy słowa, czy trzy akapity.</p>' +
            '<p>Po co to komu? Bo szukanie przestaje polegać na zgadywaniu słów kluczowych. Pytasz o coś swoimi słowami, komputer sprawdza, kto mieszka najbliżej twojego pytania, i podaje tych sąsiadów. Tak działa wyszukiwarka w dokumentacji, podpowiadanie podobnych produktów albo wykrywanie, że dwa zgłoszenia to ten sam problem opisany całkiem innymi słowami.</p>' +
            '<p>Jest tylko jeden haczyk, o którym warto pamiętać od początku: mapa mówi ci, że coś jest <em>o tym samym</em>. Nie mówi, że to dobra odpowiedź. "Umowa wymaga zgody" i "umowa nie wymaga zgody" to bliscy sąsiedzi, chociaż znaczą dokładnie coś przeciwnego.</p>',
          en: '<p>Picture an enormous city map where every sentence has an address. Not a street-and-number address, but one where <em>things with similar meaning live next door to each other</em>.</p>' +
            '<p>"How do I change my password" and "I forgot my login" end up neighbours over the fence, even though they share no words at all. Meanwhile "pizza delivery" lands on the other side of town, out by the ring road.</p>' +
            '<p>An embedding is simply how that address gets computed. You feed in a sentence, you get back a long list of numbers - the coordinates on a map of meaning. Always the same count of numbers, whether you sent three words or three paragraphs.</p>' +
            '<p>Why care? Because search stops being a guessing game about keywords. You ask in your own words, the computer checks who lives nearest to your question, and hands you those neighbours. That is how docs search works, how similar products get suggested, and how you spot that two support tickets are the same problem described in completely different words.</p>' +
            '<p>There is one catch worth knowing from day one: the map tells you something is <em>about the same thing</em>. It does not tell you it is a good answer. "The contract requires consent" and "the contract does not require consent" are close neighbours, even though they mean the opposite.</p>'
        },
        school: {
          pl: '<p><strong>Embedding</strong> (osadzenie, wektor znaczeniowy) to zamiana tekstu na listę liczb o stałej długości - typowo 384, 768, 1024 lub 1536 <strong>wymiarów</strong> (czyli pozycji na tej liście). Model embeddingowy jest trenowany tak, by teksty o zbliżonym znaczeniu dostawały wektory wskazujące w podobnym kierunku.</p>' +
            '<p>Podobieństwo mierzy się miarą <strong>cosine similarity</strong> (podobieństwo kosinusowe) - kosinusem kąta między wektorami. Wynik od -1 do 1, gdzie 1 to identyczny kierunek. Liczy się kierunek, nie długość, dzięki czemu długi dokument nie wygrywa automatycznie z krótkim.</p>' +
            '<h4>Worked example: policzmy to na dwóch liczbach</h4>' +
            '<p>Weźmy wektory dwuwymiarowe A = [3, 4] i B = [6, 8]. Iloczyn skalarny to 3 razy 6 plus 4 razy 8, czyli 50. Długość A to pierwiastek z 9 plus 16, czyli 5; długość B to pierwiastek z 36 plus 64, czyli 10. Podobieństwo wynosi 50 podzielone przez 5 razy 10, czyli 1,0 - maksimum, mimo że B jest dwa razy dłuższy od A. To właśnie znaczy "liczy się kierunek".</p>' +
            '<pre><code>function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i &lt; a.length; i++) {\n    dot += a[i] * b[i];\n    na  += a[i] * a[i];\n    nb  += b[i] * b[i];\n  }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}</code></pre>' +
            '<p>Kluczowa różnica wobec wyszukiwania pełnotekstowego: <code>LIKE</code> i indeks słów kluczowych szukają <em>znaków</em>, embeddingi szukają <em>znaczenia</em>. Zapytanie "auto się nie odpala" znajdzie dokument o rozładowanym akumulatorze, mimo braku wspólnych słów.</p>' +
            '<h4>Do czego się tego używa</h4>' +
            '<ul>' +
            '<li><strong>Wyszukiwanie semantyczne</strong> - fundament RAG.</li>' +
            '<li><strong>Deduplikacja</strong> - dwa zgłoszenia o podobieństwie powyżej 0,95 to najczęściej duplikat.</li>' +
            '<li><strong>Klasteryzacja</strong> - grupowanie tysięcy opinii w tematy bez ręcznego tagowania.</li>' +
            '<li><strong>Klasyfikacja</strong> - porównanie z wektorami przykładowych kategorii, tanio i bez trenowania.</li>' +
            '</ul>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Embedding to jednokierunkowy wektor znaczenia, liczony raz przy zapisie i używany jak indeks w bazie. Porównujesz kierunki, nie długości, więc długość tekstu nie zaburza wyniku. I pamiętaj, że wysokie podobieństwo mówi tylko "o tym samym", a nie "poprawna odpowiedź".</p>',
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
          pl: '<p>Embedding to <strong>funkcja skrótu, która zachowuje bliskość znaczeń</strong>. Traktuj wektor jak indeks w bazie: liczysz go raz przy zapisie, trzymasz obok rekordu i używasz do wyszukiwania. Analogia webowa: to jest twój indeks wyszukiwania, tylko kluczem jest sens, a nie prefiks stringa.</p>' +
            '<h4>Liczby produkcyjne</h4>' +
            '<ul>' +
            '<li>Koszt: modele embeddingowe kosztują rzędu 0,02-0,13 USD za milion tokenów, czyli zwykle 10-100 razy taniej niż generacja. Zaembedowanie 100 tysięcy chunków (fragmentów dokumentu) po 500 tokenów to pojedyncze dolary.</li>' +
            '<li>Wymiary: 1536 wymiarów razy 4 bajty to 6 KB na wektor. Milion wektorów to około 6 GB w <code>float32</code> (liczbie zmiennoprzecinkowej o 4 bajtach), ale <strong>kwantyzacja</strong> - zapis tych samych liczb z mniejszą precyzją, np. jako <code>int8</code> - tnie to około czterokrotnie przy stracie trafności rzędu 1-2 procent.</li>' +
            '<li>Latencja: batch po 100 tekstów na wywołanie zamiast pojedynczych zadań zamienia godziny w minuty.</li>' +
            '<li>Popularne modele: <code>text-embedding-3-small</code> i <code>-large</code> od OpenAI, Voyage (rekomendowany dla Claude), Cohere Embed, a lokalnie rodziny BGE i E5 przez bibliotekę sentence-transformers.</li>' +
            '</ul>' +
            '<h4>Pułapki, które bolą</h4>' +
            '<p><strong>1. Nie mieszaj modeli.</strong> Wektory z dwóch różnych modeli są nieporównywalne, nawet przy tej samej liczbie wymiarów - każdy model ma własną przestrzeń. Zapisuj nazwę i wersję modelu w kolumnie obok wektora; zmiana modelu oznacza pełny reindeks całego korpusu.</p>' +
            '<p><strong>2. Asymetria zapytanie-dokument.</strong> Krótkie pytanie i długi akapit żyją w nieco innych rejonach przestrzeni. Modele takie jak E5 wymagają prefiksów <code>query:</code> i <code>passage:</code>; ich pominięcie potrafi obniżyć <strong>recall</strong> (odsetek trafnych dokumentów, które udało się znaleźć) o kilkanaście punktów.</p>' +
            '<p><strong>3. Podobieństwo to nie trafność.</strong> Cosine 0,86 nie znaczy "poprawna odpowiedź". Progi ustalasz empirycznie na <strong>złotym zbiorze</strong> (ręcznie przygotowanej liście zapytań z poprawnymi odpowiedziami), osobno per domena, bo rozkłady wyników są inne dla każdego modelu.</p>' +
            '<p><strong>4. Negacja jest niewidoczna.</strong> "Dokument jest ważny" i "dokument jest nieważny" mają bardzo wysokie podobieństwo. Dlatego czyste wyszukiwanie wektorowe przegrywa z hybrydą: <strong>BM25</strong> (klasyczny algorytm wyszukiwania po słowach kluczowych) łapie dosłowne tokeny, a <strong>reranker</strong> (mniejszy model oceniający parę zapytanie-dokument razem) przestawia kolejność pierwszych kilkudziesięciu wyników.</p>' +
            '<pre><code>-- pgvector: kolumna, indeks HNSW, zapytanie\nALTER TABLE chunks ADD COLUMN embedding vector(1536);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\nSELECT id, content, 1 - (embedding &lt;=&gt; $1) AS score\nFROM chunks WHERE tenant_id = $2\nORDER BY embedding &lt;=&gt; $1 LIMIT 8;</code></pre>' +
            '<p>Operator <code>&lt;=&gt;</code> to dystans kosinusowy, więc sortujesz rosnąco, a wynik zamieniasz na podobieństwo przez <code>1 - dystans</code>. HNSW to typ indeksu przybliżonego: zwraca prawie najbliższych sąsiadów w czasie logarytmicznym zamiast skanować całą tabelę. Filtr po <code>tenant_id</code> przed rankingiem to nie kosmetyka, tylko granica bezpieczeństwa - wyciek między najemcami przez wspólny indeks wektorowy to klasyczny incydent.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Wektor jest artefaktem zapisu, nie odczytu - planuj migrację modelu jak migrację schematu bazy, z reindeksem i wersjonowaniem.</li>' +
            '<li>Sam cosine nie wystarczy w produkcji: dołożenie BM25 i rerankera to standardowa poprawka na negację, nazwy własne i skróty.</li>' +
            '<li>Progi podobieństwa mierz na złotym zbiorze, a filtry bezpieczeństwa zakładaj przed rankingiem, nie po nim.</li>' +
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
            pl: 'Dlaczego zdania "jak zmienić hasło" i "zapomniałem loginu" trafiają obok siebie na mapie znaczeń?',
            en: 'Why do "how do I change my password" and "I forgot my login" land next to each other on the map of meaning?'
          },
          options: [
            { pl: 'Bo mają podobną długość w znakach', en: 'Because they have a similar character length' },
            { pl: 'Bo dzielą większość słów kluczowych', en: 'Because they share most of their keywords' },
            { pl: 'Bo znaczą mniej więcej to samo, a adres jest liczony ze znaczenia, nie ze słów', en: 'Because they mean roughly the same thing, and the address is computed from meaning, not words' },
            { pl: 'Bo obie zaczynają się od pytania', en: 'Because both are phrased as questions' }
          ],
          correct: 2,
          explain: {
            pl: 'To jest cała poanta embeddingów: sąsiedztwo wynika ze znaczenia. Te dwa zdania nie mają ani jednego wspólnego słowa, a i tak są sąsiadami.',
            en: 'That is the whole point of embeddings: neighbourhood comes from meaning. Those two sentences share no words at all and are still neighbours.'
          }
        },
        {
          q: {
            pl: 'Czym jest embedding?',
            en: 'What is an embedding?'
          },
          options: [
            { pl: 'Skompresowana wersja tekstu, która da się z powrotem rozpakować', en: 'A compressed version of the text that can be decompressed' },
            { pl: 'Wektor liczb o stałej długości reprezentujący znaczenie tekstu', en: 'A fixed-length vector of numbers representing the meaning of the text' },
            { pl: 'Lista tokenów po tokenizacji', en: 'The list of tokens after tokenization' },
            { pl: 'Suma kontrolna używana do cachowania promptu', en: 'A checksum used for prompt caching' }
          ],
          correct: 1,
          explain: {
            pl: 'Embedding jest jednokierunkowy - nie odtworzysz z niego oryginalnego tekstu, ale możesz mierzyć podobieństwo znaczeń. Długość wektora nie zależy od długości tekstu.',
            en: 'An embedding is one-way - you cannot reconstruct the original text from it, but you can measure semantic similarity. Its length does not depend on the text length.'
          }
        },
        {
          q: {
            pl: 'Wektory A = [3, 4] i B = [6, 8]. Ile wynosi ich podobieństwo kosinusowe i dlaczego?',
            en: 'Vectors A = [3, 4] and B = [6, 8]. What is their cosine similarity, and why?'
          },
          options: [
            { pl: '0,5 - bo A jest dwa razy krótszy od B', en: '0.5 - because A is half the length of B' },
            { pl: '1,0 - bo mają identyczny kierunek, a długość nie ma znaczenia', en: '1.0 - because they point in the same direction and length does not matter' },
            { pl: '50 - bo tyle wynosi iloczyn skalarny', en: '50 - because that is the dot product' },
            { pl: '0 - bo nie mają wspólnych słów', en: '0 - because they share no words' }
          ],
          correct: 1,
          explain: {
            pl: 'Iloczyn skalarny 50 dzielimy przez iloczyn długości 5 i 10, czyli 1,0. Dzielenie przez długości sprawia, że długi dokument nie wygrywa tylko dlatego, że jest długi.',
            en: 'The dot product 50 divided by the lengths 5 and 10 gives 1.0. Dividing by the lengths is what stops a long document from winning just for being long.'
          }
        },
        {
          q: {
            pl: 'Wyszukiwarka wektorowa nad regulaminami dostaje zapytanie "umowy, które NIE wymagają zgody rodzica" i zwraca fragmenty o umowach, które tę zgodę wymagają. Dlaczego tak się dzieje i co pomoże najbardziej?',
            en: 'A vector search over policy documents gets the query "contracts that do NOT require parental consent" and returns passages about contracts that do require it. Why, and what helps most?'
          },
          options: [
            { pl: 'Za mały wymiar wektora; przejść na model 3072-wymiarowy', en: 'Vector dimension too small; move to a 3072-dim model' },
            { pl: 'Zła temperatura wyszukiwania; ustawić ją na 0', en: 'Wrong search temperature; set it to 0' },
            { pl: 'Oba zdania są o tym samym temacie, a przeczenie prawie nie przesuwa wektora; pomoże hybryda z wyszukiwaniem po słowach kluczowych i reranker', en: 'Both sentences are about the same topic and the negation barely moves the vector; a keyword-search hybrid plus a reranker helps' },
            { pl: 'Uszkodzony indeks; przejść na pełne skanowanie tabeli', en: 'Corrupted index; switch to a full table scan' }
          ],
          correct: 2,
          explain: {
            pl: 'Wysoki cosine mówi "o tym samym", a nie "odpowiada na pytanie". Wyszukiwanie po słowach kluczowych łapie dosłowne NIE, a reranker ocenia parę zapytanie-dokument razem i przestawia kolejność.',
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
            pl: 'Skaluje logity przed <code>softmax</code>: niższa wartość wyostrza rozkład (bezpieczniej, nudniej), wyższa spłaszcza (kreatywniej, więcej błędów). Do ekstrakcji i tool callingu 0, do burzy mózgów 0.8-1.',
            en: 'Scales the logits before <code>softmax</code>: lower sharpens the distribution (safer, duller), higher flattens it (more creative, more errors). Use 0 for extraction and tool calling, 0.8-1.0 for brainstorming.'
          }
        },
        {
          term: { pl: 'top_p', en: 'top_p (nucleus sampling)' },
          def: {
            pl: 'Obcina ogon rozkładu: bierze najmniejszy zbiór tokenów o łącznym prawdopodobieństwie p i losuje tylko z niego. Zwykle stroi się temperature <em>albo</em> top_p, nie oba naraz.',
            en: 'Truncates the tail: take the smallest set of tokens whose probability sums to p and sample only from it. Tune temperature <em>or</em> top_p, not both at once.'
          }
        },
        {
          term: { pl: 'top_k', en: 'top_k' },
          def: {
            pl: 'Prostszy wariant obcinania: zostaw k najbardziej prawdopodobnych tokenów i z nich losuj. Stała liczba niezależnie od tego, czy model jest pewny, czy waha się między dziesiątkami opcji.',
            en: 'The simpler truncation: keep the k most probable tokens and sample from those. A fixed count regardless of whether the model is confident or torn between dozens of options.'
          }
        },
        {
          term: { pl: 'niedeterminizm przy temperature 0', en: 'nondeterminism at temperature 0' },
          def: {
            pl: 'Nawet greedy decoding nie daje gwarancji identycznych odpowiedzi: batching, kolejność sumowania na GPU, MoE routing i zmiany wersji modelu psują powtarzalność. Testy pisz na asercjach, nie na porównaniu stringów.',
            en: 'Even greedy decoding does not guarantee identical answers: batching, GPU reduction order, MoE routing and silent model updates break reproducibility. Write assertions in tests, not string equality.'
          }
        },
        {
          term: { pl: 'seed', en: 'seed' },
          def: {
            pl: 'Parametr ustalający losowanie, oferowany przez część API. Zwiększa powtarzalność w obrębie tej samej wersji modelu, ale nie jest kontraktem - traktuj go jako best effort.',
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
          pl: 'Temperature spłaszcza lub wyostrza rozkład, top_p obcina ogon mało prawdopodobnych tokenów. Dobierasz je do zadania, nie do gustu.',
          en: 'Temperature flattens or sharpens the distribution, top_p truncates the tail of unlikely tokens. You pick them per task, not by taste.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Jedne logity, cztery ustawienia temperature: widać, jak to samo wyjście modelu zmienia się w cztery różne zachowania.',
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
                pl: 'Model zawsze zwraca te same logity dla tego samego wejścia. Temperature to operacja na nich, już po wyjściu z sieci.',
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
                pl: 'Dzielenie logitów przez wartość blisko zera wyostrza rozkład tak, że wygrywa wyłącznie faworyt. To ustawienie do danych, nie do prozy.',
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
                pl: 'Środkowe ustawienie daje językowi naturalność, nie ruszając zbytnio faktów. To sensowny domyślny wybór dla tekstu czytanego przez ludzi.',
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
                pl: 'Spłaszczony rozkład daje szansę wszystkim kandydatom. Ten sam mechanizm produkuje ciekawe pomysły i nieistniejące nazwy metod.',
                en: 'A flattened distribution gives every candidate a chance. The same mechanism produces interesting ideas and non-existent method names.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'top_p kontra top_k: dlaczego obcięcie nucleus dopasowuje się do pewności modelu, a sztywne k nie.',
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
                pl: 'Sumujesz prawdopodobieństwa od największego, aż przekroczą p. Przy pewnym modelu wystarczy jeden token i ogon zostaje odcięty.',
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
                pl: 'Ten sam parametr przy płaskim rozkładzie przepuszcza kilkadziesiąt tokenów. Obcięcie jest adaptacyjne - zależy od kształtu rozkładu, nie od stałej liczby.',
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
                pl: 'Stałe k jest zawsze złe w jedną albo w drugą stronę. Praktyczna zasada: strojisz temperature albo top_p, nigdy oba naraz.',
                en: 'A fixed k is always wrong in one direction or the other. Practical rule: tune temperature or top_p, never both at once.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Dlaczego temperature 0 nie daje powtarzalności bit w bit i co z tego wynika dla testów.',
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
                pl: 'Gdy dwa tokeny mają niemal identyczny wynik, o wyborze decyduje szum arytmetyki na GPU. Temperature 0 tego nie usuwa.',
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
                pl: 'Jeden zamieniony token wchodzi do kontekstu kolejnych kroków, więc dalsza część odpowiedzi może pójść inną ścieżką. Sens zwykle zostaje, bajty nie.',
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
              label: { pl: '3. Jak testować', en: '3. How to test' },
              note: {
                pl: 'Zamiast snapshotu na string asertujesz schemat, własności wyniku i zbiorcze metryki z evalów. To jedyna strategia, która przeżywa zmianę wersji modelu.',
                en: 'Instead of a string snapshot you assert the schema, output properties and aggregate eval metrics. That is the only strategy that survives a model version change.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Po każdym kroku model ma listę kandydatów na następny kawałek słowa, każdy z jakąś szansą. I teraz pytanie: czy zawsze bierzemy faworyta, czy czasem pozwalamy wygrać komuś z drugiego rzędu?</p>' +
            '<p>Od tego jest <strong>temperature</strong>, czyli pokrętło szaleństwa. Ustawione na zero sprawia, że model zawsze wybiera faworyta. Jest przewidywalny i trochę nudny, jak kucharz, który od dwudziestu lat gotuje ten sam rosół - zawsze dobry, nigdy zaskakujący. Podkręcone wysoko pozwala wygrywać outsiderom. Robi się ciekawiej, ale co jakiś czas wychodzi rosół z czekoladą.</p>' +
            '<p>Jest jeszcze <strong>top_p</strong>, czyli bramkarz przy wejściu do klubu. Mówi tak: do losowania wpuszczam tylko tych kandydatów, którzy razem zbierają większość szans, a cały ogon dziwaków zostaje na ulicy. Fajne w tym bramkarzu jest to, że sam się dostosowuje - gdy jeden kandydat jest oczywistym faworytem, wpuszcza tylko jego, a gdy wszyscy są podobni, wpuszcza całe towarzystwo.</p>' +
            '<p>Prosta zasada na co dzień: gdy chcesz porządne dane, kręć w dół. Gdy chcesz pomysłów na nazwę firmy, kręć w górę. I nie kręć obydwoma pokrętłami naraz, bo potem nie wiesz, które coś zepsuło.</p>',
          en: '<p>At every step the model holds a list of candidates for the next chunk of a word, each with some chance. And the question is: do we always take the favourite, or do we sometimes let a runner-up win?</p>' +
            '<p>That is what <strong>temperature</strong>, the chaos dial, is for. Set to zero it makes the model always pick the favourite. Predictable and slightly boring, like a cook who has made the same soup for twenty years - always good, never surprising. Turned up high, outsiders get to win. More interesting, but every so often you get soup with chocolate in it.</p>' +
            '<p>There is also <strong>top_p</strong>, the bouncer at the club door. It says: only candidates that together hold most of the probability get into the draw, the whole tail of weirdos stays out on the street. The nice thing about this bouncer is that it adjusts itself - when one candidate is the obvious favourite it lets only that one in, and when everyone looks similar it lets the whole crowd through.</p>' +
            '<p>The everyday rule: when you want solid data, turn it down. When you want ideas for a company name, turn it up. And do not turn both dials at once, or you will never know which one broke things.</p>'
        },
        school: {
          pl: '<p>Model zwraca <strong>logity</strong>, czyli surowe wyniki liczbowe dla każdego tokena w słowniku. Zanim padnie wybór, przechodzą one przez warstwę samplingu - i to właśnie ta warstwa jest sterowana parametrami.</p>' +
            '<h4>temperature</h4>' +
            '<p>Logity są dzielone przez temperature, a dopiero potem idzie <strong>softmax</strong> (funkcja zamieniającą dowolne liczby na prawdopodobieństwa sumujące się do jedynki). Dzielenie przez wartość mniejszą od 1 wyostrza różnicę - faworyt zjada niemal całe prawdopodobieństwo. Dzielenie przez większą od 1 spłaszcza rozkład i daje szansę słabszym kandydatom. Zakres to zwykle 0 do 2, domyślnie około 1.</p>' +
            '<pre><code>probs = softmax(logits / temperature)</code></pre>' +
            '<h4>Worked example: te same cztery liczby</h4>' +
            '<p>Załóżmy logity: refund 4,2 / refunded 3,6 / reimburse 2,1 / repay 1,2. Przy temperature 0 wynik to praktycznie 1,00 dla refund i zera dla reszty. Przy 0,7 rozkład wygląda mniej więcej 0,55 / 0,30 / 0,10 / 0,05 - drugi kandydat wygrywa mniej więcej co trzecie losowanie. Przy 1,4 wszystko spłaszcza się do około 0,32 / 0,27 / 0,22 / 0,19, więc nawet najsłabszy token wchodzi co piąty raz. Model się nie zmienił - zmieniło się tylko przeliczenie jego wyjścia.</p>' +
            '<h4>top_p (nucleus sampling)</h4>' +
            '<p>Sortujesz tokeny malejąco po prawdopodobieństwie i bierzesz tylko tyle, ile potrzeba, by ich suma osiągnęła p (na przykład 0,9). Reszta jest odrzucana i losujesz z tego okrojonego zbioru. To obcięcie adaptacyjne: gdy model jest pewny, zostaje jeden token; gdy się waha, zostaje ich kilkadziesiąt. Jest też <strong>top_k</strong>, które po prostu bierze k najlepszych tokenów - prostsze, ale sztywne.</p>' +
            '<h4>Dlaczego temperature 0 to nie jest pełna powtarzalność</h4>' +
            '<p>Formalnie temperatura 0 oznacza wybór najbardziej prawdopodobnego tokena, więc powinno być powtarzalne. W realnym API tak nie jest: obliczenia na kartach graficznych są równoległe, a dodawanie liczb zmiennoprzecinkowych w różnej kolejności daje minimalnie różne wyniki. Gdy dwa tokeny mają niemal identyczny wynik, ten szum decyduje - a jeden zmieniony token rozjeżdża całą dalszą generację.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Temperature skaluje logity przed softmaxem, a top_p obcina ogon rozkładu; oba zmieniają losowanie, nie model. Ustawiaj je per zadanie: nisko do danych, wysoko do pomysłów. I nie strojisz obu naraz, bo nie da się wtedy przypisać efektu.</p>',
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
          pl: '<p>Sampling to jedyna warstwa, w której wprost sterujesz kompromisem między powtarzalnością a różnorodnością. Ustawiaj ją per zadanie, nie globalnie w kliencie - to ta sama logika, co poziomy logowania: inny dla ekstrakcji, inny dla copy.</p>' +
            '<h4>Ustawienia, które broni się w produkcji</h4>' +
            '<ul>' +
            '<li><strong>Ekstrakcja, klasyfikacja, tool calling</strong> (wywoływanie przez model twoich funkcji), <strong>generowanie JSON</strong>: temperature 0 do 0,2. Chcesz stabilnego kontraktu, nie stylu.</li>' +
            '<li><strong>Streszczenia, wyjaśnienia, chat wsparcia</strong>: 0,5 do 0,8. Naturalny język bez dryfu faktów.</li>' +
            '<li><strong>Burza mózgów, warianty nazw, copy marketingowe</strong>: 0,9 do 1,2.</li>' +
            '<li><strong>Kod</strong>: nisko, 0 do 0,3. Wyższa temperatura częściej wymyśla nieistniejące metody API - to nie anegdota, tylko bezpośredni skutek spłaszczenia ogona rozkładu.</li>' +
            '</ul>' +
            '<p>Uwaga na modele rozumujące (reasoning models - takie, które przed odpowiedzią generują wewnętrzny łańcuch myśli). Część z nich ignoruje albo wprost odrzuca temperature, bo ścieżka rozumowania ma własny reżim samplingu. Sprawdź dokumentację, zanim wpiszesz parametr do wspólnego wrappera dla wszystkich modeli.</p>' +
            '<pre><code>const cfg = {\n  extract:   { temperature: 0 },\n  summarize: { temperature: 0.6 },\n  ideate:    { temperature: 1.0 }\n};\nconst res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 800,\n  ...cfg[taskKind],\n  messages\n});</code></pre>' +
            '<h4>Powtarzalność, której naprawdę możesz oczekiwać</h4>' +
            '<p>Nie ma gwarancji bit w bit. Nawet z temperature 0 zmienia się wersja modelu, generacja sprzętu i kolejność redukcji zmiennoprzecinkowej; dochodzi do tego <strong>batching</strong> (łączenie requestów wielu użytkowników w jedną paczkę na GPU), który zmienia tę kolejność między wywołaniami, oraz w modelach typu MoE (mixture of experts - sieć z wieloma podsieciami i routerem wybierającym kilka z nich) routing zależny od składu batcha. OpenAI oferuje parametr <code>seed</code> plus pole <code>system_fingerprint</code>, które zwiększa szanse na powtórzenie i pozwala wykryć zmianę backendu, ale to nadal best effort, nie kontrakt.</p>' +
            '<p>Wniosek dla testów: asertujesz na schemacie (zod), na własnościach wyniku - czy wyciągnięte pole ma poprawny format, czy kwota zgadza się z kwotą w źródle - oraz na metrykach zbiorczych z evalów (automatycznych testów jakości na zbiorze przykładów). Snapshot na dokładny string będzie flaky i po dwóch tygodniach zespół zacznie go ślepo akceptować.</p>' +
            '<h4>Anty-wzorce</h4>' +
            '<p>Podnoszenie temperatury, żeby "naprawić" nudne odpowiedzi - to problem promptu, nie samplingu. Ustawianie temperature 0 dla wszystkiego - daje sztywne sformułowania i pętle w dłuższych tekstach. Kręcenie obu pokręteł naraz - traci się możliwość przypisania efektu. I klasyk: temperature 0,7 w wywołaniu, które ma zwrócić JSON zgodny ze schematem, czyli po prostu wyższy odsetek retry.</p>' +
            '<p>Warto też pamiętać, że sampling nie jest jedyną dźwignią różnorodności. Gdy potrzebujesz pięciu różnych propozycji, często lepiej działa jedno wywołanie proszące o pięć wariantów z jawnym wymogiem, by się od siebie różniły, niż pięć wywołań z podkręconą temperaturą - jest taniej, szybciej, a model sam pilnuje, żeby warianty nie były powtórzeniami.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Trzymaj mapę zadanie -> parametry w kodzie, tak jak konfigurację logowania; jedno globalne ustawienie zawsze będzie złe dla połowy wywołań.</li>' +
            '<li>Powtarzalność traktuj jako statystyczną, nie binarną - buduj testy na kontrakcie i evalach, nie na równości stringów.</li>' +
            '<li>Różnorodność często taniej kupisz jednym promptem o n wariantów niż podkręcaniem temperatury.</li>' +
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
            { pl: 'Limitem długości odpowiedzi', en: 'A limit on answer length' },
            { pl: 'Pokrętłem decydującym, czy model zawsze bierze faworyta, czy czasem wpuszcza słabszych kandydatów', en: 'A dial deciding whether the model always takes the favourite or sometimes lets weaker candidates in' },
            { pl: 'Ustawieniem prędkości generowania tokenów', en: 'A setting for token generation speed' },
            { pl: 'Miara pewności modelu co do odpowiedzi', en: 'A measure of how confident the model is' }
          ],
          correct: 1,
          explain: {
            pl: 'To pokrętło losowości przy wyborze kolejnego kawałka słowa. Nisko - przewidywalnie i nudno, wysoko - ciekawiej, ale z większą szansą na wpadkę.',
            en: 'It is the randomness dial for picking the next chunk of a word. Low means predictable and dull, high means more interesting with a bigger chance of a blunder.'
          }
        },
        {
          q: {
            pl: 'Co technicznie robi obniżenie temperature do 0?',
            en: 'What does lowering temperature to 0 technically do?'
          },
          options: [
            { pl: 'Skraca odpowiedź o połowę', en: 'Halves the length of the answer' },
            { pl: 'Wyłącza okno kontekstu', en: 'Disables the context window' },
            { pl: 'Maksymalnie wyostrza rozkład, więc wybierany jest token o najwyższym prawdopodobieństwie', en: 'Sharpens the distribution to the maximum, so the highest-probability token is chosen' },
            { pl: 'Zmniejsza koszt wywołania o połowę', en: 'Cuts the call cost in half' }
          ],
          correct: 2,
          explain: {
            pl: 'Temperature skaluje logity przed softmaxem. Przy wartości bliskiej zera różnice są maksymalnie powiększone i faworyt zabiera całe prawdopodobieństwo.',
            en: 'Temperature scales the logits before softmax. Near zero the gaps are maximally magnified and the favourite takes all the probability.'
          }
        },
        {
          q: {
            pl: 'Jak działa top_p 0,9?',
            en: 'How does top_p 0.9 work?'
          },
          options: [
            { pl: 'Bierze zawsze 9 najlepszych tokenów', en: 'It always keeps the 9 best tokens' },
            { pl: 'Bierze najmniejszy zbiór tokenów, których prawdopodobieństwa sumują się do 0,9', en: 'It keeps the smallest set of tokens whose probabilities sum to 0.9' },
            { pl: 'Odrzuca 90 procent odpowiedzi i generuje je od nowa', en: 'It rejects 90 percent of responses and regenerates them' },
            { pl: 'Ogranicza użycie okna kontekstu do 90 procent', en: 'It caps context window usage at 90 percent' }
          ],
          correct: 1,
          explain: {
            pl: 'To obcięcie adaptacyjne: przy pewnym modelu zostaje jeden token, przy niepewnym kilkadziesiąt. Tym różni się od sztywnego top_k, które zawsze bierze tę samą liczbę.',
            en: 'It is an adaptive cutoff: one token survives when the model is confident, dozens when it is unsure. That is what separates it from a rigid top_k, which always keeps the same count.'
          }
        },
        {
          q: {
            pl: 'Zespół proponuje testy porównujące odpowiedź modelu znak po znaku z zapisanym wzorcem, przy temperature 0 i stałym parametrze seed (ustalającym losowanie). Co powiesz na code review?',
            en: 'A team proposes tests comparing the model response character by character with a stored snapshot, using temperature 0 and a fixed seed (which pins the randomness). What do you say in review?'
          },
          options: [
            { pl: 'To zadziała, seed gwarantuje identyczne wyjście', en: 'It will work, the seed guarantees identical output' },
            { pl: 'Zadziała po dodaniu top_p 1,0', en: 'It will work once top_p 1.0 is added' },
            { pl: 'Powtarzalność bit w bit nie jest gwarantowana - arytmetyka GPU, batching i zmiany wersji modelu to psują; asertuj na schemacie, własnościach i metrykach evalów', en: 'Bit-for-bit reproducibility is not guaranteed - GPU arithmetic, batching and model version changes break it; assert on schema, properties and eval metrics' },
            { pl: 'Wystarczy zwiększyć max_tokens, żeby ustabilizować wyjście', en: 'Just raise max_tokens to stabilize the output' }
          ],
          correct: 2,
          explain: {
            pl: 'Seed i temperature 0 zwiększają szanse na powtórzenie, ale nie usuwają niedeterminizmu zmiennoprzecinkowego ani cichych zmian wersji modelu. Takie snapshoty będą flaky i zespół przestanie im ufać.',
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
            pl: 'Czas od wysłania requestu do pierwszego tokena odpowiedzi. Zależy głównie od długości wejścia (prefill) i to on decyduje o odczuwalnej szybkości interfejsu, nie całkowity czas generacji.',
            en: 'The time from sending the request to the first token of the response. Driven mainly by input length (prefill) and it, not total generation time, is what users perceive as speed.'
          }
        },
        {
          term: { pl: 'przepustowość', en: 'throughput (tokens/s)' },
          def: {
            pl: 'Tempo generowania kolejnych tokenów po pierwszym. Razem z liczbą tokenów wyjścia wyznacza całkowitą latencję: <code>TTFT + tokeny_wyjscia / tokeny_na_sekunde</code>.',
            en: 'The rate at which tokens are produced after the first one. Together with the output length it sets total latency: <code>TTFT + output_tokens / tokens_per_second</code>.'
          }
        },
        {
          term: { pl: 'prefill i decode', en: 'prefill and decode' },
          def: {
            pl: 'Dwie fazy inferencji: prefill przetwarza całe wejście równolegle (drogie w obliczeniach, jednorazowe), decode generuje wyjście token po tokenie (sekwencyjne). Dlatego tokeny wyjścia są dużo droższe niż wejścia.',
            en: 'The two phases of inference: prefill processes the whole input in parallel (compute-heavy, once), decode emits the output token by token (sequential). This is why output tokens cost several times more than input.'
          }
        },
        {
          term: { pl: 'prompt caching', en: 'prompt caching' },
          def: {
            pl: 'Serwer zapamiętuje policzony stan (KV cache) dla stałego prefiksu promptu i przy kolejnym wywołaniu go nie liczy od nowa. Działa tylko na dokładny prefiks - stałe instrukcje na górze, zmienne dane na dole.',
            en: 'The server keeps the computed state (KV cache) for a stable prompt prefix and skips recomputing it on the next call. It matches on the exact prefix - static instructions at the top, variable data at the bottom.'
          }
        },
        {
          term: { pl: 'Batch API', en: 'Batch API' },
          def: {
            pl: 'Tryb asynchroniczny: wysyłasz paczkę requestów i odbierasz wyniki w ciągu godzin, zwykle za około połowę ceny. Idealny do backfillów, ewaluacji i przetwarzania offline, bezużyteczny w chacie.',
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
          pl: 'Stabilny prefiks promptu na górze daje trafienia cache, a latencję dzieli się na prefill (TTFT) i decode zależny od długości odpowiedzi.',
          en: 'A stable prompt prefix at the top earns cache hits, while latency splits into prefill (TTFT) and decode, which scales with answer length.'
        }
      },
      interactive: [
        {
          kind: 'frames',
          caption: {
            pl: 'Dwa zapytania z tym samym prefiksem: pierwsze płaci pełną cenę i zapisuje cache, drugie trafia w cache. Ostatnia klatka pokazuje, jak jeden znak potrafi to zepsuć.',
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
                pl: 'Pierwsze zapytanie nie ma czego odzyskać. Cały prompt jest liczony od zera i to on tworzy TTFT (czas do pierwszego tokenu).',
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
                pl: 'Stabilna część promptu - system, definicje narzędzi i dokumenty - ląduje w cache. Zmienna końcówka rozmowy zostaje poza nim.',
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
                pl: 'Porównanie idzie od początku promptu, jak wspólny prefiks dwóch stringów. Wystarczy, że końcówka jest inna - reszta i tak się zgadza.',
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
                pl: 'Cache nie zmienia odpowiedzi - zmienia cenę i czas. Im dłuższy stabilny prefiks, tym większy zysk przy każdym kolejnym zapytaniu.',
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
              label: { pl: '5. Jak to zepsuć', en: '5. How to break it' },
              note: {
                pl: 'Najczęstszy błąd produkcyjny: data lub identyfikator sesji na samej górze promptu. Cache liczy się od tokenu zero, więc płacisz pełną stawkę.',
                en: 'The classic production mistake: a date or a session id at the very top of the prompt. Caching starts at token zero, so you pay the full rate.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Anatomia jednej sekundy: skąd bierze się latencja, która dźwignia na co działa i dlaczego streaming zmienia odbiór tych samych liczb.',
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
                pl: 'Prefill zależy od długości wejścia, decode od długości wyjścia. Mylenie tych dwóch rzeczy to najczęstszy powód optymalizowania nie tej strony.',
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
              label: { pl: '2. Skróć wyjście', en: '2. Cut the output' },
              note: {
                pl: 'Najdroższy token to ten wygenerowany. Wymuszenie zwięzłego formatu i twardego max_tokens tnie jednocześnie czas i rachunek.',
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
              label: { pl: '3. Przytnij wejście', en: '3. Trim the input' },
              note: {
                pl: 'Krótsze wejście i trafienia w cache skracają prefill, czyli TTFT. Wyjścia nie da się zacachować - każda odpowiedź powstaje od nowa.',
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
                pl: 'Te same 12 sekund ze spinnerem wyglądają na awarię, a ze streamingiem na pracę. Dlatego TTFT jest metryką produktową, nie tylko techniczną.',
                en: 'The same 12 seconds look like a failure behind a spinner and like work when streamed. That is why TTFT is a product metric, not just a technical one.'
              }
            }
          ]
        },
        {
          kind: 'frames',
          caption: {
            pl: 'Rachunek za realny endpoint i cztery dźwignie po kolei: co ile daje i w jakiej kolejności to robić.',
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
              label: { pl: '1. Punkt wyjścia', en: '1. Starting point' },
              note: {
                pl: 'Zanim cokolwiek zmienisz, loguj tokeny wejścia i wyjścia per zadanie. Bez tych liczb nie da się stwierdzić, która dźwignia w ogóle działa.',
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
              label: { pl: '2. Krótsze wyjście', en: '2. Shorter output' },
              note: {
                pl: 'Klasyfikator potrzebował jednego słowa, a dostawał akapit. Ograniczenie wyjścia to zwykle najszybsza i najbezpieczniejsza oszczędność.',
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
                pl: 'Klasyfikacja to zadanie dla małego modelu, z eskalacją trudnych przypadków do dużego. Różnica cen między klasami to zwykle rząd wielkości.',
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
                pl: 'Tryb wsadowy daje około 50 procent rabatu za cenę opóźnienia liczonego w godzinach. Caching by tu nie pomógł, bo każda wiadomość ma inną treść.',
                en: 'Batch mode gives about 50 percent off at the price of hours of delay. Caching would not help here, because every message body differs.'
              }
            }
          ]
        }
      ],
      levels: {
        eli5: {
          pl: '<p>Za rozmowę z modelem płacisz jak za taksówkę, tylko licznik bije od słów. Każde słowo, które wysyłasz, kosztuje trochę. Każde słowo, które model odpisze, kosztuje dużo więcej - zwykle kilka razy tyle.</p>' +
            '<p>Dlatego najtańsza sztuczka świata brzmi: poproś o krótszą odpowiedź. "W trzech punktach" zamiast "opisz szczegółowo" potrafi obciąć rachunek o połowę, a odpowiedź często staje się lepsza, bo nikt nie lubi czytać ścian tekstu.</p>' +
            '<p>Jest też czekanie, i to dwa rodzaje czekania. Najpierw model musi przeczytać wszystko, co mu wysłałeś - to ta cisza przed pierwszym słowem. Potem pisze, słowo po słowie, i to trwa tym dłużej, im dłuższa ma być odpowiedź. Jeśli pokazujesz te słowa na bieżąco, człowiek czeka spokojnie, bo widzi, że coś się dzieje. Ta sama sekunda z kręciołkiem wydaje się dwa razy dłuższa niż z tekstem, który się pisze na oczach.</p>' +
            '<p>I jeszcze jedno, właściwie najprzyjemniejsze: jeśli początek twojej wiadomości jest zawsze dokładnie taki sam, można go zapamiętać. Następnym razem model nie musi go czytać od nowa - jest szybciej i znacznie taniej. Ale wystarczy wpisać na samej górze aktualną godzinę i cała sztuczka przestaje działać, bo początek już nie jest taki sam.</p>',
          en: '<p>Talking to a model is billed like a taxi, except the meter runs on words. Every word you send costs a little. Every word the model writes back costs a lot more - usually several times as much.</p>' +
            '<p>Which is why the cheapest trick in the world is: ask for a shorter answer. "In three bullets" instead of "describe in detail" can halve the bill, and the answer often gets better too, because nobody enjoys reading walls of text.</p>' +
            '<p>Then there is waiting, and there are two kinds of it. First the model has to read everything you sent - that is the silence before the first word. Then it writes, word by word, and that takes longer the longer the answer is meant to be. If you show those words as they arrive, people wait calmly, because they can see something is happening. The same second feels twice as long next to a spinner as it does next to text being typed in front of you.</p>' +
            '<p>One more thing, arguably the nicest: if the beginning of your message is always exactly the same, it can be remembered. Next time the model does not have to read it again - faster and much cheaper. But put the current time at the very top and the trick stops working, because the beginning is no longer the same.</p>'
        },
        school: {
          pl: '<p>Rozliczenie jest per token i <strong>asymetryczne</strong>: tokeny wyjściowe kosztują zwykle 3-5 razy więcej niż wejściowe. Powód jest techniczny. Wejście przetwarza się równolegle w jednym przebiegu - to faza <strong>prefill</strong>. Wyjście powstaje sekwencyjnie, token po tokenie - to faza <strong>decode</strong>, która zajmuje kartę graficzną znacznie dłużej.</p>' +
            '<h4>Worked example: policz jeden endpoint</h4>' +
            '<p>Przyjmij cennik klasy średniej: 3 USD za milion tokenów wejścia i 15 USD za milion wyjścia. Twoje wywołanie ma 4000 tokenów promptu i 500 tokenów odpowiedzi. Wejście: 4000 razy 0,000003 to 0,012 USD. Wyjście: 500 razy 0,000015 to 0,0075 USD. Razem około 2 centów za wywołanie. Przy 100 tysiącach wywołań miesięcznie to około 1950 USD - i nagle każdy zbędny akapit w system prompcie ma swoją cenę. Zauważ proporcję: wyjście jest ośmiokrotnie krótsze, a odpowiada za 38 procent rachunku.</p>' +
            '<h4>Dwie różne latencje</h4>' +
            '<ul>' +
            '<li><strong>TTFT</strong> (time to first token - czas do pierwszego tokena) - ile czekasz, zanim cokolwiek się pojawi. Zależy głównie od długości wejścia i kolejki u dostawcy.</li>' +
            '<li><strong>Przepustowość</strong> - ile tokenów na sekundę leci potem, typowo kilkadziesiąt. Całkowity czas to w przybliżeniu TTFT plus liczba tokenów wyjścia podzielona przez tę prędkość.</li>' +
            '</ul>' +
            '<p>Wniosek: długie wejście psuje TTFT, a długa odpowiedź psuje czas całkowity. To są dwa osobne problemy z dwoma osobnymi lekarstwami.</p>' +
            '<h4>Prompt caching</h4>' +
            '<p>Dostawcy pozwalają zapamiętać przeliczony <strong>prefiks</strong> promptu, czyli jego początek. Jeśli początek kolejnego zapytania jest bajt w bajt identyczny, ta część nie jest liczona od nowa: płacisz za nią ułamek zwykłej ceny i oszczędzasz czas prefill. Warunek jest twardy - dopasowanie idzie od pierwszego tokena, więc wystarczy wstawić na górze aktualną datę albo identyfikator sesji i cache przestaje trafiać.</p>' +
            '<p>Stąd zasada porządkowania promptu: najpierw to, co stałe (rola, instrukcje, definicje narzędzi), potem to, co zmienne (pytanie użytkownika). Dokładnie jak z warstwami obrazu Dockera albo hashem w nazwie pliku dla CDN.</p>' +
            '<h4>Co musisz zapamiętać</h4>' +
            '<p>Tokeny wyjścia są kilka razy droższe od wejściowych, więc skracanie odpowiedzi jest pierwszą dźwignią. TTFT zależy od wejścia, a czas całkowity od długości odpowiedzi. Cache działa tylko na identyczny prefiks, więc zmienne dane zawsze idą na dół promptu.</p>',
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
          pl: '<p>Koszt i latencja to dwie osobne funkcje tych samych zmiennych, więc optymalizuj je osobno i mierz osobno. Instrumentacja jest warunkiem wstępnym: loguj per zadanie <code>input_tokens</code>, <code>output_tokens</code>, tokeny zapisu i odczytu cache, nazwę modelu, TTFT i czas całkowity. Bez tego każda dyskusja o kosztach jest zgadywanką.</p>' +
            '<h4>Kolejność dźwigni, od najskuteczniejszej</h4>' +
            '<ol>' +
            '<li><strong>Skróć wyjście.</strong> Najdroższy token to ten wygenerowany. Wymuś zwięzły format (JSON zamiast prozy, limity długości, twarde <code>max_tokens</code>). Często 30-40 procent oszczędności w jeden dzień.</li>' +
            '<li><strong>Włącz prompt caching.</strong> Odczyt z cache to zwykle około 10 procent ceny wejścia u Anthropic (zapis około 125 procent), a u OpenAI automatyczny rabat rzędu 50 procent dla powtarzanych prefiksów. Przy agencie z 20 tysiącami tokenów narzędzi i instrukcji to różnica między rentownością a jej brakiem.</li>' +
            '<li><strong>Routing modeli.</strong> Klasyfikacja i ekstrakcja idą na mały model (Haiku, GPT-4o-mini, Gemini Flash), a tylko trudne przypadki eskalują do dużego. Różnica cen między klasami to zwykle rząd wielkości.</li>' +
            '<li><strong>Przytnij wejście.</strong> Mniej chunków z RAG, kompakcja historii, usunięcie nieużywanych definicji narzędzi.</li>' +
            '<li><strong>Batch API</strong> dla zadań offline - około 50 procent taniej, kosztem opóźnienia liczonego w godzinach.</li>' +
            '</ol>' +
            '<pre><code>const res = await client.messages.create({\n  model: "claude-sonnet-4-5",\n  max_tokens: 600,\n  system: [\n    { type: "text", text: STABLE_INSTRUCTIONS,\n      cache_control: { type: "ephemeral" } }\n  ],\n  messages: [{ role: "user", content: userTurn }]\n});\nlog({\n  in: res.usage.input_tokens,\n  out: res.usage.output_tokens,\n  cacheRead: res.usage.cache_read_input_tokens\n});</code></pre>' +
            '<h4>Projektowanie promptu pod cache</h4>' +
            '<p>Dopasowanie jest prefiksowe, więc traktuj prompt jak warstwy w Dockerfile: rzeczy zmienne na dół. Konkretne zakazy: brak znacznika czasu na górze, brak identyfikatora użytkownika w system prompcie, brak losowej kolejności dokumentów z retrievalu, brak <code>JSON.stringify</code> po obiekcie, którego kolejność kluczy może się zmienić między wywołaniami. Minimalna długość cachowanego bloku to zwykle około 1024 tokeny, więc cachowanie krótkiego promptu nic nie daje. TTL (czas życia wpisu) bywa krótki, rzędu 5 minut z odświeżeniem przy każdym użyciu - dla ruchu ciągłego działa świetnie, dla rzadkiego prawie wcale.</p>' +
            '<h4>Latencja odczuwalna</h4>' +
            '<p>Użytkownik ocenia TTFT, nie czas całkowity. Streaming (przesyłanie odpowiedzi token po tokenie zamiast czekania na całość) zmienia odczuwalne 8 sekund w akceptowalne, bo tekst rusza po 400 ms. Dla wywołań z narzędziami pokazuj etap - "szukam w dokumentacji", "piszę odpowiedź" - bo to jest twój odpowiednik skeletona w React. Jeśli generujesz strukturę, streamuj częściowy JSON i renderuj pola, które już są kompletne; to temat modułu o streamingu.</p>' +
            '<h4>Na rozmowie kwalifikacyjnej</h4>' +
            '<p>Pytanie, które pada często: dlaczego wersja z cachem może być droższa przy pierwszym wywołaniu. Odpowiedź: zapis do cache kosztuje więcej niż zwykłe wejście (około 1,25x), więc opłaca się dopiero od drugiego trafienia w oknie TTL - przy jednorazowych, unikalnych promptach caching tylko dokłada kosztu. Drugie częste pytanie: dlaczego skrócenie promptu o połowę nie skróciło odpowiedzi o połowę. Bo skróciło prefill, czyli TTFT, a nie decode - a to decode dominuje czas całkowity przy długich odpowiedziach.</p>' +
            '<h4>Co z tego wynika w praktyce</h4>' +
            '<ul>' +
            '<li>Bez logowania tokenów per zadanie nie masz jak stwierdzić, która zmiana pomogła - zacznij od instrumentacji, nie od optymalizacji.</li>' +
            '<li>Kolejność dźwigni jest stała: najpierw krótsze wyjście, potem cache, potem mniejszy model, na końcu krótsze wejście i tryb wsadowy.</li>' +
            '<li>Układ promptu to decyzja architektoniczna - stabilny prefiks na górze jest jednocześnie tańszy, szybszy i łatwiejszy do debugowania.</li>' +
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
            pl: 'Która zmiana najszybciej obniży rachunek za wywołania modelu?',
            en: 'Which change lowers your model bill the fastest?'
          },
          options: [
            { pl: 'Poprosić o krótszą odpowiedź', en: 'Ask for a shorter answer' },
            { pl: 'Wysłać prompt wielkimi literami', en: 'Send the prompt in capital letters' },
            { pl: 'Zadawać pytania wieczorem, poza godzinami szczytu', en: 'Ask questions in the evening, outside peak hours' },
            { pl: 'Podnieść temperature', en: 'Raise the temperature' }
          ],
          correct: 0,
          explain: {
            pl: 'Słowa, które model pisze, kosztują kilka razy więcej niż te, które wysyłasz. Skrócenie odpowiedzi to najtańsza i najszybsza oszczędność.',
            en: 'The words the model writes cost several times more than the words you send. Shortening the answer is the cheapest and fastest saving.'
          }
        },
        {
          q: {
            pl: 'Które tokeny są zazwyczaj droższe i dlaczego?',
            en: 'Which tokens are usually more expensive, and why?'
          },
          options: [
            { pl: 'Wejściowe, bo jest ich więcej', en: 'Input tokens, because there are more of them' },
            { pl: 'Wyjściowe, zwykle 3-5 razy droższe, bo powstają sekwencyjnie i dłużej zajmują GPU', en: 'Output tokens, typically 3-5x, because they are produced sequentially and hold the GPU longer' },
            { pl: 'Kosztują tyle samo', en: 'They cost the same' },
            { pl: 'Zależy wyłącznie od języka promptu', en: 'It depends only on the prompt language' }
          ],
          correct: 1,
          explain: {
            pl: 'Wejście liczy się równolegle w jednym przebiegu (prefill), wyjście token po tokenie (decode). Stąd asymetria cen i stąd kolejność optymalizacji.',
            en: 'Input is processed in parallel in one pass (prefill), output token by token (decode). Hence the price asymmetry and hence the optimization order.'
          }
        },
        {
          q: {
            pl: 'Co oznacza TTFT i od czego głównie zależy?',
            en: 'What does TTFT mean and what mainly drives it?'
          },
          options: [
            { pl: 'Całkowity czas odpowiedzi; zależy od liczby tokenów wyjścia', en: 'Total response time; driven by the number of output tokens' },
            { pl: 'Limit tokenów na zadanie; zależy od planu cenowego', en: 'The token limit per request; driven by your pricing plan' },
            { pl: 'Czas do pierwszego tokena; zależy głównie od długości wejścia', en: 'Time to first token; driven mainly by input length' },
            { pl: 'Czas życia wpisu w cache; zależy od dostawcy', en: 'The lifetime of a cache entry; driven by the provider' }
          ],
          correct: 2,
          explain: {
            pl: 'TTFT to efekt fazy prefill, czyli przeliczenia całego wejścia. To metryka UX numer jeden przy streamingu - użytkownik ocenia moment startu tekstu.',
            en: 'TTFT is the result of prefill, computing the whole input. It is the number one UX metric with streaming - users judge when text starts.'
          }
        },
        {
          q: {
            pl: 'Agent ma stały system prompt i definicje narzędzi o długości 18 tysięcy tokenów, a na koniec doklejasz krótkie pytanie użytkownika. Włączasz prompt caching (zapamiętywanie przeliczonego początku promptu) i na samej górze dopisujesz aktualną datę z godziną. Co się stanie?',
            en: 'An agent has a fixed 18k-token system prompt and tool definitions, with a short user question appended at the end. You enable prompt caching (storing the precomputed beginning of the prompt) and add the current date and time at the very top. What happens?'
          },
          options: [
            { pl: 'Cache działa normalnie, bo data zajmuje mało tokenów', en: 'The cache works fine, because the date is only a few tokens' },
            { pl: 'Cache działa szybciej dzięki świeżemu kluczowi', en: 'The cache gets faster thanks to a fresh key' },
            { pl: 'Cache obejmie tylko tokeny wyjściowe', en: 'The cache will cover output tokens only' },
            { pl: 'Każde wywołanie chybi cache i zapłacisz pełną stawkę, bo prefiks różni się już na początku', en: 'Every call misses the cache and you pay full price, because the prefix differs right at the start' }
          ],
          correct: 3,
          explain: {
            pl: 'Dopasowanie jest prefiksowe i bajt w bajt, liczone od pierwszego tokena - różnica na trzecim tokenie unieważnia całe 18 tysięcy. Zmienne dane przenieś na dół promptu, jak zmienne warstwy w Dockerfile.',
            en: 'Matching is prefix-based and byte-exact from the first token - a difference at token three invalidates all 18k. Move volatile data to the bottom of the prompt, like volatile Dockerfile layers.'
          }
        }
      ]
    }
  ]
};
