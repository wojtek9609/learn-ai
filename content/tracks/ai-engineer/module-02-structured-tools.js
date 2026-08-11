// ---------------------------------------------------------------- shared SVG
// Frame builders for the interactive players (SPEC v4 "Interactive diagram
// widget"). All frames of a set share the viewBox and the layout, so only the
// highlighted state and the payload text change between steps.

const REPAIR_HEAD =
  '<defs><marker id="m2ri" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
  '<text x="20" y="26" fill="var(--muted)" font-size="14">Parse, validate, repair - with a hard attempt budget</text>' +
  '<line x1="165" y1="108" x2="165" y2="126" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2ri)"/>' +
  '<line x1="310" y1="160" x2="328" y2="160" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2ri)"/>' +
  '<line x1="475" y1="194" x2="475" y2="210" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2ri)"/>';

function repairRaw(line1, line2, stroke) {
  return '<rect x="20" y="42" width="600" height="66" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="40" y="72" font-size="15" fill="var(--text)">' + line1 + '</text>' +
    '<text x="40" y="95" font-size="13" fill="var(--muted)">' + line2 + '</text>';
}

function repairStep(x, title, state, stroke, stateColor) {
  return '<rect x="' + x + '" y="128" width="290" height="66" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + 145) + '" y="156" text-anchor="middle" font-size="15" fill="var(--text)">' + title + '</text>' +
    '<text x="' + (x + 145) + '" y="180" text-anchor="middle" font-size="13" fill="' + stateColor + '">' + state + '</text>';
}

function repairOut(text, stroke, color) {
  return '<rect x="20" y="212" width="600" height="60" rx="12" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="320" y="249" text-anchor="middle" font-size="15" fill="' + color + '">' + text + '</text>';
}

function repairFoot(line1, line2, color) {
  return '<rect x="20" y="290" width="600" height="90" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="40" y="324" font-size="15" fill="' + color + '">' + line1 + '</text>' +
    '<text x="40" y="352" font-size="14" fill="var(--muted)">' + line2 + '</text>';
}

function repairFrame(attempt, inner) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    REPAIR_HEAD +
    '<text x="620" y="26" text-anchor="end" font-size="14" fill="var(--muted)">attempt ' + attempt + '</text>' +
    inner + '</svg>';
}

const LOOP_HEAD =
  '<defs><marker id="m2li" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
  '<text x="20" y="26" fill="var(--muted)" font-size="14">One turn of the tool loop, step by step</text>';

function loopBox(x, y, w, h, title, sub, stroke) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="var(--surface)" stroke="' + stroke + '" stroke-width="2"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 34) + '" text-anchor="middle" font-size="15" fill="var(--text)">' + title + '</text>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 58) + '" text-anchor="middle" font-size="13" fill="var(--muted)">' + sub + '</text>';
}

function loopSend(label, color) {
  return '<line x1="272" y1="98" x2="366" y2="98" stroke="' + color + '" stroke-width="2" marker-end="url(#m2li)"/>' +
    '<text x="320" y="86" text-anchor="middle" font-size="13" fill="' + color + '">' + label + '</text>';
}

function loopCall(color) {
  return '<line x1="495" y1="144" x2="495" y2="186" stroke="' + color + '" stroke-width="2" marker-end="url(#m2li)"/>';
}

function loopReturn(label, color) {
  return '<path d="M368 228 L146 228 L146 148" fill="none" stroke="' + color + '" stroke-width="2" marker-end="url(#m2li)"/>' +
    '<text x="160" y="252" font-size="13" fill="' + color + '">' + label + '</text>';
}

function loopLog(line1, line2, line3, color) {
  return '<rect x="20" y="290" width="600" height="90" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
    '<text x="40" y="316" font-size="13" fill="var(--muted)">' + line1 + '</text>' +
    '<text x="40" y="340" font-size="13" fill="var(--muted)">' + line2 + '</text>' +
    '<text x="40" y="364" font-size="13" fill="' + color + '">' + line3 + '</text>';
}

function loopFrame(inner) {
  return '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
    LOOP_HEAD + inner + '</svg>';
}

export default {
  id: 'structured-output-tools',
  order: 2,
  icon: '🛠️',
  title: {
    pl: 'Structured output i tool calling',
    en: 'Structured Output & Tool Calling'
  },
  description: {
    pl: 'Jak zamienić model z gadatliwego chatbota w niezawodne API: kontrakty JSON, schematy zod, pętle walidacji i naprawy, wywoływanie narzędzi oraz standard MCP.',
    en: 'How to turn a chatty model into a reliable API: JSON contracts, zod schemas, validate-and-repair loops, tool calling, and the MCP standard.'
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: 'why-structured-output',
      title: {
        pl: 'Po co structured output',
        en: 'Why structured output'
      },
      minutes: 8,
      terms: [
        {
          term: { pl: 'structured output', en: 'structured output' },
          def: {
            pl: 'Odpowiedź modelu zwracana jako dane zgodne ze schematem (zwykle JSON), a nie jako proza. Zamienia LLM w wywołanie funkcji o znanym typie, które da się bezpiecznie podać dalej do kodu.',
            en: 'A model response returned as schema-conforming data (usually JSON) instead of prose. It turns the LLM into a function call with a known return type that code can consume safely.'
          }
        },
        {
          term: { pl: 'JSON mode', en: 'JSON mode' },
          def: {
            pl: 'Flaga API gwarantująca, że wyjście będzie <em>parsowalnym</em> JSON-em - ale nie że będzie miało wymagane pola ani poprawne typy. Walidacja po stronie klienta nadal jest obowiązkowa.',
            en: 'An API flag guaranteeing the output is <em>parsable</em> JSON - but not that it has the required fields or correct types. Client-side validation is still mandatory.'
          }
        },
        {
          term: { pl: 'wymuszony schemat', en: 'enforced schema' },
          def: {
            pl: 'Najmocniejszy poziom: dostawca ogranicza dekodowanie do tokenów zgodnych ze schematem (constrained decoding), więc struktura jest gwarantowana. Zostają błędy semantyczne, nie składniowe.',
            en: 'The strongest level: the provider constrains decoding to tokens allowed by the schema, so the structure is guaranteed. What remains are semantic errors, not syntax errors.'
          }
        },
        {
          term: { pl: 'stringly-typed', en: 'stringly-typed' },
          def: {
            pl: 'Antywzorzec z klasycznego backendu, tu wraca w pełnej krasie: parsowanie odpowiedzi regexpami zamiast kontraktu. Każda zmiana stylu modelu psuje wtedy produkcję po cichu.',
            en: 'The classic backend anti-pattern, back in full force here: parsing answers with regexes instead of a contract. Any shift in model style then breaks production silently.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2l1arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Same prompt, two output contracts</text>' +
          '<rect x="20" y="50" width="150" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="95" y="78" fill="var(--text)" font-size="14" text-anchor="middle">Prompt</text>' +
          '<text x="95" y="97" fill="var(--muted)" font-size="13" text-anchor="middle">extract invoice</text>' +
          '<line x1="170" y1="80" x2="230" y2="80" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l1arrow)"/>' +
          '<line x1="170" y1="80" x2="230" y2="260" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l1arrow)"/>' +
          '<rect x="235" y="50" width="180" height="60" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="325" y="76" fill="var(--text)" font-size="14" text-anchor="middle">Free text</text>' +
          '<text x="325" y="95" fill="var(--muted)" font-size="13" text-anchor="middle">Sure! The total is...</text>' +
          '<line x1="415" y1="80" x2="470" y2="80" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l1arrow)"/>' +
          '<rect x="475" y="50" width="145" height="60" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="547" y="76" fill="var(--err)" font-size="14" text-anchor="middle">regex + hope</text>' +
          '<text x="547" y="95" fill="var(--muted)" font-size="13" text-anchor="middle">breaks weekly</text>' +
          '<rect x="235" y="230" width="180" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="325" y="256" fill="var(--text)" font-size="14" text-anchor="middle">JSON schema</text>' +
          '<text x="325" y="275" fill="var(--muted)" font-size="13" text-anchor="middle">total, currency, date</text>' +
          '<line x1="415" y1="260" x2="470" y2="260" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l1arrow)"/>' +
          '<rect x="475" y="230" width="145" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="547" y="256" fill="var(--ok)" font-size="14" text-anchor="middle">typed object</text>' +
          '<text x="547" y="275" fill="var(--muted)" font-size="13" text-anchor="middle">safe to render</text>' +
          '<text x="20" y="345" fill="var(--muted)" font-size="13">Free text is a UI. JSON is an API.</text>' +
          '<text x="20" y="368" fill="var(--muted)" font-size="13">Pick the contract before you pick the prompt.</text>' +
          '</svg>',
        caption: {
          pl: 'Ten sam prompt z dwoma kontraktami wyjścia: tekst wymaga parsowania regexem, schemat daje obiekt gotowy do renderowania.',
          en: 'One prompt, two output contracts: free text forces regex parsing, a schema hands you an object you can render.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że dzwonisz po pizzę do gadatliwego kolegi. Pytasz, co zamówił, a on odpowiada: "No wiesz, wzięliśmy tę dużą z pieczarkami, chyba za jakieś czterdzieści parę złotych, dowiozą niedługo". Wszystko tam jest, ale jak chcesz to wpisać do tabelki, musisz zgadywać, gdzie kończy się nazwa, a zaczyna cena.</p><p>A teraz wyobraź sobie, że dajesz mu gotowy formularz z trzema polami: <strong>co</strong>, <strong>ile kosztuje</strong>, <strong>na kiedy</strong>. Kolega wpisuje trzy rzeczy i koniec. Nie musisz niczego zgadywać.</p><p>Model językowy jest dokładnie takim kolegą. Sam z siebie gada zdaniami. Ale jak dasz mu formularz - listę pól, które ma wypełnić - to odda ci uporządkowane pudełeczko z danymi. Twój program potrafi z takim pudełkiem zrobić coś sensownego. Ze zdaniem "chyba za czterdzieści parę" nie zrobi nic.</p>',
          en: '<p>Imagine calling a chatty friend to ask what he ordered for dinner. He says: "Oh, we got the big one with mushrooms, I think it was around forty something, should be here soon." Everything you need is in there, but if you want to put it in a table you have to guess where the name ends and the price begins.</p><p>Now imagine handing him a form with three boxes: <strong>what</strong>, <strong>how much</strong>, <strong>when</strong>. He fills in three things and stops. No guessing.</p><p>A language model is exactly that friend. Left alone it talks in sentences. Give it a form - a list of fields to fill - and it hands back a tidy little box of data. Your program can do something useful with a box. It can do nothing useful with "around forty something".</p>'
        },
        school: {
          pl: '<p>Model domyślnie zwraca tekst. Tekst jest świetny dla człowieka i fatalny dla kodu. Jeśli chcesz z odpowiedzi wyciągnąć kwotę faktury, musisz napisać regex, a regex przestanie działać w dniu, w którym model napisze "PLN 1 234,50" zamiast "1234.50 zł".</p><p>To dokładnie ta sama różnica, którą znasz z frontendu: <em>stringly-typed</em> kontra typowane API. Kiedy backend zwraca <code>"status: ok, count: 12"</code> jako string, dopisujesz parser. Kiedy zwraca <code>{ "status": "ok", "count": 12 }</code>, po prostu tego używasz.</p><p><strong>Structured output</strong> (wyjście o ustalonej strukturze) to poproszenie modelu, żeby odpowiedział JSON-em zgodnym z podanym schematem. W praktyce robisz to na jeden z trzech sposobów:</p><ul><li>opisujesz format w prompcie i liczysz na współpracę (najsłabsze),</li><li>używasz trybu JSON dostawcy - model gwarantuje poprawną składnię JSON,</li><li>przekazujesz schemat, a dostawca wymusza go w trakcie generowania (najmocniejsze).</li></ul><p>Przykład kontraktu:</p><pre><code>{\n  "amount": 1234.5,\n  "currency": "PLN",\n  "due_date": "2026-09-01",\n  "confidence": 0.82\n}</code></pre><p>Zwróć uwagę na pole <code>confidence</code>. Skoro i tak projektujesz kontrakt, możesz poprosić model o metadane, które przydadzą się w UI: pewność, cytat ze źródła, listę pól, których nie znalazł. Schemat przestaje być tylko formatem, a staje się projektem interfejsu.</p><p>Praktyczna zasada: jeśli wynik ma trafić do bazy, do komponentu Reacta albo do <code>if</code>-a, potrzebujesz structured output. Wolny tekst zostaw tam, gdzie czyta go człowiek.</p>',
          en: '<p>By default a model returns text. Text is great for humans and terrible for code. If you want the invoice total out of a reply, you write a regex, and that regex breaks the day the model writes "PLN 1,234.50" instead of "1234.50".</p><p>This is the exact distinction you already know from frontend work: <em>stringly-typed</em> versus a typed API. When a backend returns <code>"status: ok, count: 12"</code> as a string, you write a parser. When it returns <code>{ "status": "ok", "count": 12 }</code>, you just use it.</p><p><strong>Structured output</strong> means asking the model to answer with JSON that matches a schema you supply. In practice there are three levels:</p><ul><li>describe the format in the prompt and hope (weakest),</li><li>use the provider JSON mode - syntax is guaranteed valid JSON,</li><li>pass a schema the provider enforces during generation (strongest).</li></ul><p>A contract looks like this:</p><pre><code>{\n  "amount": 1234.5,\n  "currency": "USD",\n  "due_date": "2026-09-01",\n  "confidence": 0.82\n}</code></pre><p>Notice <code>confidence</code>. Since you are designing the contract anyway, you can ask for metadata your UI wants: certainty, a quote from the source, a list of fields the model could not find. The schema stops being a format and becomes an interface design.</p><p>Rule of thumb: if the result goes into a database, a React component, or an <code>if</code> statement, you need structured output. Keep free text for the places a human reads.</p>'
        },
        pro: {
          pl: '<p>Trzy poziomy gwarancji, z rosnącą siłą i rosnącym kosztem:</p><ul><li><strong>Prompt-only</strong>: piszesz "answer with JSON". Zgodność w okolicach 80-95 procent, zależnie od modelu. Do produkcji nie nadaje się bez walidacji.</li><li><strong>JSON mode</strong> (OpenAI <code>response_format: { type: "json_object" }</code>): składnia zawsze poprawna, ale kształt dowolny. Model może wymyślić inne nazwy pól.</li><li><strong>Wymuszony schemat</strong>: OpenAI Structured Outputs (<code>type: "json_schema"</code>, <code>strict: true</code>) i Gemini <code>responseSchema</code> używają constrained decoding - w każdym kroku maskują tokeny, które złamałyby gramatykę. Zgodność ze schematem jest wtedy z definicji stuprocentowa.</li></ul><p>W Claude API kanoniczną drogą jest tool calling: definiujesz jedno narzędzie z <code>input_schema</code> i wymuszasz je przez <code>tool_choice: { type: "tool", name: "extract" }</code>. Model nie odpowiada tekstem, tylko blokiem <code>tool_use</code> z argumentami zgodnymi ze schematem.</p><pre><code>import { z } from "zod";\nimport { zodToJsonSchema } from "zod-to-json-schema";\n\nconst Invoice = z.object({\n  amount: z.number(),\n  currency: z.enum(["PLN", "EUR", "USD"]),\n  due_date: z.string(),\n  line_items: z.array(z.object({ label: z.string(), net: z.number() })),\n});\n\nconst tool = {\n  name: "extract_invoice",\n  input_schema: zodToJsonSchema(Invoice),\n};</code></pre><p>Pułapki, które kosztują czas w produkcji:</p><ul><li>W trybie <code>strict</code> OpenAI wszystkie pola muszą być w <code>required</code>, a <code>additionalProperties</code> musi być <code>false</code>. Pola opcjonalne modelujesz jako <code>nullable</code>, nie jako brak w <code>required</code>.</li><li>Constrained decoding pilnuje kształtu, nie sensu. <code>due_date</code> będzie stringiem, ale nie musi być datą. Ograniczenia typu <code>format</code>, <code>minLength</code> czy <code>pattern</code> bywają ignorowane - waliduj po stronie klienta zodem.</li><li>Schemat jedzie w każdym requeście jako tokeny wejściowe. Średni schemat to 200-600 tokenów; przy 1 zł za milion tokenów wejściowych to grosze, ale trzymaj go przed zmiennymi danymi, żeby wpadał w prompt caching.</li><li>Pierwsze wywołanie nowego schematu w OpenAI kompiluje gramatykę i potrafi dołożyć kilkaset milisekund; kolejne są już z cache.</li><li>Głębokie, mocno zagnieżdżone schematy obniżają jakość. Płaski obiekt z 8-15 polami działa lepiej niż drzewo na cztery poziomy.</li></ul><p>Na rozmowie rekrutacyjnej padnie pytanie "jak zagwarantujesz poprawny JSON". Zła odpowiedź: "poproszę w prompcie". Dobra: "wymuszony schemat plus walidacja zodem plus jedna próba naprawy, a błędy loguję jako metrykę".</p>',
          en: '<p>Three levels of guarantee, increasing in strength and in cost:</p><ul><li><strong>Prompt-only</strong>: you write "answer with JSON". Compliance lands somewhere around 80-95 percent depending on the model. Not production-grade without validation.</li><li><strong>JSON mode</strong> (OpenAI <code>response_format: { type: "json_object" }</code>): syntax is always valid JSON, but the shape is free. The model may invent field names.</li><li><strong>Enforced schema</strong>: OpenAI Structured Outputs (<code>type: "json_schema"</code>, <code>strict: true</code>) and Gemini <code>responseSchema</code> use constrained decoding - at each step they mask out tokens that would break the grammar. Schema conformance is then 100 percent by construction.</li></ul><p>In the Claude API the canonical route is tool calling: define one tool with an <code>input_schema</code> and force it with <code>tool_choice: { type: "tool", name: "extract" }</code>. The model returns a <code>tool_use</code> block whose arguments match the schema instead of prose.</p><pre><code>import { z } from "zod";\nimport { zodToJsonSchema } from "zod-to-json-schema";\n\nconst Invoice = z.object({\n  amount: z.number(),\n  currency: z.enum(["PLN", "EUR", "USD"]),\n  due_date: z.string(),\n  line_items: z.array(z.object({ label: z.string(), net: z.number() })),\n});\n\nconst tool = {\n  name: "extract_invoice",\n  input_schema: zodToJsonSchema(Invoice),\n};</code></pre><p>Pitfalls that cost real time in production:</p><ul><li>In OpenAI <code>strict</code> mode every property must appear in <code>required</code> and <code>additionalProperties</code> must be <code>false</code>. Model optional fields as <code>nullable</code>, not as missing from <code>required</code>.</li><li>Constrained decoding enforces shape, not meaning. <code>due_date</code> will be a string, but not necessarily a date. Constraints like <code>format</code>, <code>minLength</code> or <code>pattern</code> are often ignored - validate client-side with zod.</li><li>The schema ships as input tokens on every request. A medium schema is 200-600 tokens; at a few dollars per million input tokens that is small, but keep it before your variable data so it lands inside prompt caching.</li><li>The first call with a new schema on OpenAI compiles a grammar and can add a few hundred milliseconds; later calls hit the cache.</li><li>Deeply nested schemas hurt quality. A flat object with 8-15 fields beats a four-level tree.</li></ul><p>In interviews you will be asked how you guarantee valid JSON. Bad answer: "I ask nicely in the prompt." Good answer: "enforced schema, plus zod validation, plus one repair attempt, and I log failures as a metric."</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego structured output jest lepszy od parsowania wolnego tekstu?',
            en: 'Why is structured output better than parsing free text?'
          },
          options: [
            { pl: 'Bo model odpowiada szybciej', en: 'Because the model responds faster' },
            { pl: 'Bo dostajesz stabilny kontrakt danych, którego kod nie musi zgadywać', en: 'Because you get a stable data contract your code does not have to guess' },
            { pl: 'Bo JSON zużywa mniej tokenów niż zdania', en: 'Because JSON uses fewer tokens than sentences' },
            { pl: 'Bo wyłącza to halucynacje', en: 'Because it turns off hallucinations' }
          ],
          correct: 1,
          explain: {
            pl: 'To ta sama korzyść co przejście ze stringly-typed API na typowane: kod dostaje przewidywalny kształt danych. JSON bywa nawet droższy w tokenach, a halucynacje treści zostają.',
            en: 'It is the same win as moving from a stringly-typed API to a typed one: predictable shape for your code. JSON can even cost more tokens, and content hallucinations remain.'
          }
        },
        {
          q: {
            pl: 'Co dokładnie gwarantuje tryb JSON (json_object) u dostawcy?',
            en: 'What exactly does provider JSON mode (json_object) guarantee?'
          },
          options: [
            { pl: 'Że odpowiedź będzie składniowo poprawnym JSON-em, ale niekoniecznie o twoim kształcie', en: 'That the reply parses as valid JSON, but not necessarily in your shape' },
            { pl: 'Że pola będą miały dokładnie takie nazwy jak w twoim schemacie', en: 'That fields will have exactly the names from your schema' },
            { pl: 'Że wartości będą prawdziwe', en: 'That the values will be factually correct' },
            { pl: 'Że odpowiedź zmieści się w limicie tokenów', en: 'That the reply fits the token limit' }
          ],
          correct: 0,
          explain: {
            pl: 'Tryb JSON pilnuje wyłącznie składni. Kształt wymusza dopiero schemat (Structured Outputs, responseSchema albo wymuszone narzędzie).',
            en: 'JSON mode guards syntax only. Shape comes from a schema (Structured Outputs, responseSchema, or a forced tool).'
          }
        },
        {
          q: {
            pl: 'Jak w Claude API najczęściej wymusza się konkretny kształt odpowiedzi?',
            en: 'How do you most commonly force a specific response shape in the Claude API?'
          },
          options: [
            { pl: 'Ustawiając temperature na 0', en: 'By setting temperature to 0' },
            { pl: 'Wysyłając schemat w polu system', en: 'By putting the schema in the system field' },
            { pl: 'Definiując narzędzie z input_schema i ustawiając tool_choice na to narzędzie', en: 'By defining a tool with input_schema and setting tool_choice to that tool' },
            { pl: 'Włączając stop_sequences na nawiasie klamrowym', en: 'By setting stop_sequences to a curly brace' }
          ],
          correct: 2,
          explain: {
            pl: 'Wymuszone narzędzie sprawia, że model zwraca blok tool_use z argumentami zgodnymi z input_schema. Temperature 0 zmniejsza tylko losowość, nie wymusza struktury.',
            en: 'A forced tool makes the model emit a tool_use block whose arguments match input_schema. Temperature 0 only reduces randomness, it enforces nothing.'
          }
        },
        {
          q: {
            pl: 'Twój schemat ma pole due_date typu string z format: date, a model zwraca "wrzesień". Co się stało?',
            en: 'Your schema has due_date as a string with format: date, and the model returns "September". What happened?'
          },
          options: [
            { pl: 'Constrained decoding pilnuje typów i struktury, ale adnotacje takie jak format zwykle nie są wymuszane', en: 'Constrained decoding enforces types and structure, but annotations like format usually are not enforced' },
            { pl: 'Schemat został zignorowany w całości', en: 'The schema was ignored entirely' },
            { pl: 'To błąd dostawcy, wystarczy powtórzyć request', en: 'It is a provider bug, just retry the request' },
            { pl: 'Za wysoka temperatura złamała gramatykę', en: 'High temperature broke the grammar' }
          ],
          correct: 0,
          explain: {
            pl: 'Gramatyka wymusza "to ma być string", a nie "to ma być data ISO". Semantykę dokładasz sam: zod z regexem lub refinement plus jedna próba naprawy.',
            en: 'The grammar enforces "must be a string", not "must be an ISO date". You add semantics yourself: zod with a regex or refinement, plus one repair attempt.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 2
    {
      id: 'json-schema',
      title: {
        pl: 'JSON Schema i zod',
        en: 'JSON Schema and zod'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'JSON Schema', en: 'JSON Schema' },
          def: {
            pl: 'Standard opisu kształtu danych JSON: typy, <code>required</code>, <code>enum</code>, <code>additionalProperties</code>. To format, który rozumieją API modeli - zarówno dla structured output, jak i dla narzędzi.',
            en: 'The standard for describing the shape of JSON data: types, <code>required</code>, <code>enum</code>, <code>additionalProperties</code>. It is the format model APIs speak, both for structured output and for tools.'
          }
        },
        {
          term: { pl: 'zod', en: 'zod' },
          def: {
            pl: 'TypeScriptowa biblioteka do schematów: jedna definicja daje walidację w runtime i typ statyczny. Konwertowana do JSON Schema jest najwygodniejszym źródłem prawdy w projekcie TS.',
            en: 'The TypeScript schema library: one definition yields both runtime validation and a static type. Converted to JSON Schema it is the most convenient single source of truth in a TS project.'
          }
        },
        {
          term: { pl: '.describe()', en: '.describe()' },
          def: {
            pl: 'Opis pola w schemacie trafia do modelu i działa jak fragment promptu. Dobre opisy pól są tańsze i skuteczniejsze niż dopisywanie kolejnych zdań do instrukcji systemowej.',
            en: 'A field description in the schema is sent to the model and behaves like part of the prompt. Good field descriptions are cheaper and more effective than more sentences in the system prompt.'
          }
        },
        {
          term: { pl: 'enum zamiast stringa', en: 'enum over string' },
          def: {
            pl: 'Każde pole o skończonej liczbie wartości powinno być enumem, nie wolnym tekstem. To eliminuje całą klasę literówek i wariantów typu <code>pending</code> / <code>PENDING</code> / <code>w toku</code>.',
            en: 'Any field with a finite value set should be an enum, not free text. That removes an entire class of typos and variants like <code>pending</code> / <code>PENDING</code> / <code>in progress</code>.'
          }
        },
        {
          term: { pl: 'schemat transportowy vs domenowy', en: 'wire schema vs domain schema' },
          def: {
            pl: 'Modelowi dajesz płaski, wąski schemat transportowy (mało zagnieżdżeń, jawne jednostki), a dopiero w kodzie mapujesz go na bogaty model domenowy. Głębokie zagnieżdżenie psuje trafność.',
            en: 'Give the model a flat, narrow wire schema (little nesting, explicit units) and map it to your rich domain model in code. Deep nesting measurably hurts accuracy.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2l2arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">One zod schema, three jobs</text>' +
          '<rect x="230" y="45" width="180" height="66" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="72" fill="var(--text)" font-size="15" text-anchor="middle">zod schema</text>' +
          '<text x="320" y="93" fill="var(--muted)" font-size="13" text-anchor="middle">single source of truth</text>' +
          '<line x1="290" y1="111" x2="115" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l2arrow)"/>' +
          '<line x1="320" y1="111" x2="320" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l2arrow)"/>' +
          '<line x1="350" y1="111" x2="525" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l2arrow)"/>' +
          '<rect x="20" y="190" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="110" y="217" fill="var(--accent2)" font-size="14" text-anchor="middle">TS types</text>' +
          '<text x="110" y="238" fill="var(--muted)" font-size="13" text-anchor="middle">z.infer</text>' +
          '<rect x="230" y="190" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="217" fill="var(--accent2)" font-size="14" text-anchor="middle">JSON Schema</text>' +
          '<text x="320" y="238" fill="var(--muted)" font-size="13" text-anchor="middle">sent to the model</text>' +
          '<rect x="440" y="190" width="180" height="70" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="530" y="217" fill="var(--accent2)" font-size="14" text-anchor="middle">runtime check</text>' +
          '<text x="530" y="238" fill="var(--muted)" font-size="13" text-anchor="middle">safeParse</text>' +
          '<line x1="320" y1="260" x2="320" y2="305" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l2arrow)"/>' +
          '<rect x="180" y="310" width="280" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="336" fill="var(--ok)" font-size="14" text-anchor="middle">descriptions are prompt</text>' +
          '<text x="320" y="356" fill="var(--muted)" font-size="13" text-anchor="middle">field names teach the model</text>' +
          '</svg>',
        caption: {
          pl: 'Jeden schemat zod daje typy TypeScript, JSON Schema dla modelu i walidację w runtime. Nazwy pól i opisy działają jak prompt.',
          en: 'A single zod schema yields TypeScript types, JSON Schema for the model, and runtime validation. Field names and descriptions act as prompt.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>JSON Schema to opis pudełka na dane. Mówi: tu wchodzi liczba, tu słowo, tu jedna z trzech dozwolonych opcji, a tego pola nie wolno pominąć. Trochę jak instrukcja z klocków: która część gdzie pasuje i ile ich ma być.</p><p>Zod to wygodniejszy sposób pisania tej instrukcji, jeśli i tak programujesz w TypeScripcie. Piszesz opis raz, po ludzku, a komputer sam robi z niego trzy rzeczy: typy dla twojego edytora, instrukcję dla modelu i strażnika, który sprawdza, czy to, co przyszło, naprawdę pasuje.</p><p>Najfajniejsze jest to, że model <em>czyta</em> nazwy pól. Jeśli pole nazwiesz <strong>x1</strong>, model będzie zgadywał. Jeśli nazwiesz je <strong>kwota_brutto_w_groszach</strong>, model od razu wie, o co ci chodzi. Dobra nazwa pola to pół promptu.</p>',
          en: '<p>JSON Schema is a description of a box for data. It says: a number goes here, a word here, one of three allowed options here, and this field must never be missing. A bit like a Lego instruction sheet: which piece fits where and how many you need.</p><p>Zod is a nicer way to write that instruction sheet if you already work in TypeScript. You describe the shape once, in plain code, and the computer turns it into three things: types for your editor, an instruction for the model, and a guard that checks whether what arrived really fits.</p><p>The best part is that the model actually <em>reads</em> your field names. Call a field <strong>x1</strong> and it will guess. Call it <strong>total_gross_amount_in_cents</strong> and it immediately knows what you want. A good field name is half a prompt.</p>'
        },
        school: {
          pl: '<p>JSON Schema to standard opisujący kształt danych JSON: typy, wymagane pola, dozwolone wartości. Modele dostają go w definicji narzędzia albo w <code>response_format</code>.</p><p>Pisanie surowego JSON Schema ręcznie jest męczące, więc w projektach TypeScriptowych używa się <strong>zod</strong> (biblioteka walidacyjna, którą pewnie już znasz z formularzy i tRPC) i konwertera <code>zod-to-json-schema</code>.</p><pre><code>const Ticket = z.object({\n  title: z.string().describe("krotki tytul zgloszenia, max 60 znakow"),\n  priority: z.enum(["low", "medium", "high"]),\n  labels: z.array(z.string()).max(5),\n  needs_human: z.boolean(),\n});\n\ntype Ticket = z.infer&lt;typeof Ticket&gt;;</code></pre><p>Z jednej definicji masz typ TypeScript, JSON Schema do wysłania modelowi i walidację w runtime przez <code>Ticket.safeParse(data)</code>. To ta sama korzyść co w tRPC: kontrakt istnieje raz i nie rozjeżdża się między warstwami.</p><p>Kluczowa intuicja tej lekcji: <strong>schemat jest częścią promptu</strong>. Model nie widzi twoich typów jako abstrakcyjnej gramatyki - widzi tekst z nazwami pól i opisami. Dlatego:</p><ul><li>nazywaj pola opisowo (<code>customer_email</code>, nie <code>e</code>),</li><li>używaj <code>.describe()</code> tam, gdzie nazwa nie wystarcza,</li><li>zamiast wolnego stringa dawaj <code>z.enum()</code> - model przestaje wymyślać warianty,</li><li>dodaj pole <code>notes</code> albo <code>uncertain_fields</code>, żeby model miał gdzie odłożyć wątpliwości zamiast zmyślać.</li></ul><p>Ostatni punkt jest ważniejszy, niż się wydaje. Model bardzo nie lubi zostawiać pustych pól. Jeśli nie dasz mu legalnego sposobu na powiedzenie "nie wiem", wypełni pole czymkolwiek.</p>',
          en: '<p>JSON Schema is the standard for describing the shape of JSON data: types, required fields, allowed values. Models receive it in a tool definition or in <code>response_format</code>.</p><p>Writing raw JSON Schema by hand is tedious, so TypeScript projects use <strong>zod</strong> (the validation library you probably already know from forms and tRPC) plus <code>zod-to-json-schema</code>.</p><pre><code>const Ticket = z.object({\n  title: z.string().describe("short ticket title, max 60 chars"),\n  priority: z.enum(["low", "medium", "high"]),\n  labels: z.array(z.string()).max(5),\n  needs_human: z.boolean(),\n});\n\ntype Ticket = z.infer&lt;typeof Ticket&gt;;</code></pre><p>One definition gives you the TypeScript type, the JSON Schema to send the model, and runtime validation via <code>Ticket.safeParse(data)</code>. Same win as tRPC: the contract exists once and cannot drift between layers.</p><p>The key intuition of this lesson: <strong>the schema is part of the prompt</strong>. The model does not see your types as an abstract grammar - it sees text with field names and descriptions. So:</p><ul><li>name fields descriptively (<code>customer_email</code>, not <code>e</code>),</li><li>use <code>.describe()</code> wherever the name is not enough,</li><li>prefer <code>z.enum()</code> over a free string - the model stops inventing variants,</li><li>add a <code>notes</code> or <code>uncertain_fields</code> field so the model has somewhere to put doubt instead of fabricating.</li></ul><p>That last point matters more than it looks. Models strongly dislike leaving fields empty. If you give no legal way to say "I do not know", they will fill the field with something.</p>'
        },
        pro: {
          pl: '<p>Traktuj schemat jak publiczne API twojej funkcji AI. Ma wersję, ma testy, ma dokumentację - i ma budżet tokenów.</p><h4>Co realnie działa</h4><ul><li><strong>Płasko i wąsko.</strong> Jeden obiekt, 8-15 pól, maksymalnie dwa poziomy zagnieżdżenia. Duże drzewa (5+ poziomów, dziesiątki pól) mierzalnie obniżają trafność wypełnienia i zwiększają liczbę retry.</li><li><strong>Enum zamiast stringa</strong> wszędzie, gdzie zbiór jest skończony. To najtańsza poprawa jakości w całym module.</li><li><strong>.describe() to prompt.</strong> Konwerter zamienia to na <code>description</code> w JSON Schema, a model to czyta. Krótkie, konkretne zdanie z przykładem bije akapit reguł w system promptcie.</li><li><strong>Jawne pole na niepewność</strong>: <code>confidence: z.number().min(0).max(1)</code> plus <code>missing_fields: z.array(z.string())</code>. Daje UI-owi materiał na stan "wymaga sprawdzenia" i realnie zbija halucynacje.</li><li><strong>Cytaty</strong>: przy ekstrakcji z dokumentu dodaj <code>source_quote: z.string()</code> per pole. Model musi wskazać fragment, więc trudniej mu zmyślić, a ty dostajesz gotowy highlight w UI.</li></ul><h4>Zderzenia zod z JSON Schema</h4><p>Nie wszystko z zoda przechodzi przez granicę. <code>z.date()</code>, <code>z.map()</code>, <code>z.bigint()</code>, transformacje i <code>refine()</code> nie mają odpowiednika w JSON Schema - konwerter je zgubi albo wyemituje coś bezużytecznego. Wzorzec: <strong>schemat transportowy</strong> (tylko string, number, boolean, enum, array, object) osobno od <strong>schematu domenowego</strong> z transformacjami.</p><pre><code>const Wire = z.object({\n  due_date: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),\n  amount_cents: z.number().int(),\n});\n\nconst Domain = Wire.transform((w) =&gt; ({\n  dueDate: new Date(w.due_date),\n  amount: w.amount_cents / 100,\n}));</code></pre><p>Uwaga na <code>z.union()</code> i <code>discriminatedUnion</code>: OpenAI w trybie strict wspiera <code>anyOf</code> na poziomie właściwości, ale nie na poziomie korzenia. Claude jest łagodniejszy, bo waliduje mniej rygorystycznie - za to bez constrained decoding musisz walidować sam.</p><h4>Wersjonowanie i koszt</h4><p>Trzymaj schematy w jednym module (<code>schemas/extraction.v3.ts</code>) i wersjonuj razem z promptem, bo evaly przypięte do starego kształtu przestaną mieć sens. Schemat to stałe tokeny wejściowe w każdym requeście - w Claude API prefix cache ma minimum 1024 tokenów dla Sonneta, więc dłuższy, stabilny prefiks (system prompt plus definicje narzędzi) opłaca się trzymać razem na początku, przed zmiennym dokumentem. Odczyt z cache kosztuje około 10 procent ceny normalnego tokenu wejściowego, więc przy ruchu produkcyjnym to nie jest optymalizacja kosmetyczna.</p>',
          en: '<p>Treat the schema as the public API of your AI function. It has a version, tests, docs - and a token budget.</p><h4>What actually works</h4><ul><li><strong>Flat and narrow.</strong> One object, 8-15 fields, at most two levels of nesting. Large trees (5+ levels, dozens of fields) measurably reduce fill accuracy and raise retry rates.</li><li><strong>Enum over string</strong> wherever the set is finite. Cheapest quality win in this whole module.</li><li><strong>.describe() is prompt.</strong> The converter turns it into <code>description</code> in JSON Schema and the model reads it. One short concrete sentence with an example beats a paragraph of rules in the system prompt.</li><li><strong>An explicit uncertainty field</strong>: <code>confidence: z.number().min(0).max(1)</code> plus <code>missing_fields: z.array(z.string())</code>. It gives the UI material for a "needs review" state and genuinely cuts fabrication.</li><li><strong>Citations</strong>: for document extraction add <code>source_quote: z.string()</code> per field. The model has to point at a span, which makes invention harder and hands you a ready UI highlight.</li></ul><h4>Where zod and JSON Schema collide</h4><p>Not everything in zod survives the border. <code>z.date()</code>, <code>z.map()</code>, <code>z.bigint()</code>, transforms and <code>refine()</code> have no JSON Schema equivalent - the converter drops them or emits something useless. The pattern: a <strong>wire schema</strong> (only string, number, boolean, enum, array, object) kept separate from a <strong>domain schema</strong> with transforms.</p><pre><code>const Wire = z.object({\n  due_date: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),\n  amount_cents: z.number().int(),\n});\n\nconst Domain = Wire.transform((w) =&gt; ({\n  dueDate: new Date(w.due_date),\n  amount: w.amount_cents / 100,\n}));</code></pre><p>Watch out for <code>z.union()</code> and <code>discriminatedUnion</code>: OpenAI strict mode supports <code>anyOf</code> at property level but not at the root. Claude is more permissive because it validates less strictly - in exchange, without constrained decoding you must validate yourself.</p><h4>Versioning and cost</h4><p>Keep schemas in one module (<code>schemas/extraction.v3.ts</code>) and version them together with the prompt, because evals pinned to the old shape stop meaning anything. The schema is fixed input tokens on every request - Claude prefix caching has a 1024-token minimum for Sonnet, so a longer stable prefix (system prompt plus tool definitions) is worth keeping together up front, ahead of the variable document. A cache read costs roughly 10 percent of a normal input token, so at production traffic this is not a cosmetic optimization.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego nazwy pól i opisy w schemacie mają znaczenie dla jakości wyniku?',
            en: 'Why do field names and descriptions in the schema affect output quality?'
          },
          options: [
            { pl: 'Bo model czyta schemat jako tekst, więc nazwy i opisy działają jak instrukcja', en: 'Because the model reads the schema as text, so names and descriptions act as instructions' },
            { pl: 'Bo dłuższe nazwy zwiększają temperature', en: 'Because longer names raise the temperature' },
            { pl: 'Bo walidator porównuje nazwy z treścią dokumentu', en: 'Because the validator compares names against the document text' },
            { pl: 'Nie mają, liczy się tylko typ', en: 'They do not, only the type matters' }
          ],
          correct: 0,
          explain: {
            pl: 'Schemat trafia do kontekstu jako tekst. customer_email z opisem niesie więcej informacji niż pole e typu string.',
            en: 'The schema enters the context as text. customer_email with a description carries far more signal than a field called e.'
          }
        },
        {
          q: {
            pl: 'Który konstrukt zod bezpiecznie przechodzi do JSON Schema wysyłanego modelowi?',
            en: 'Which zod construct safely survives conversion to the JSON Schema you send the model?'
          },
          options: [
            { pl: 'z.date()', en: 'z.date()' },
            { pl: 'z.enum(["low", "medium", "high"])', en: 'z.enum(["low", "medium", "high"])' },
            { pl: 'z.string().transform(s => s.trim())', en: 'z.string().transform(s => s.trim())' },
            { pl: 'z.map(z.string(), z.number())', en: 'z.map(z.string(), z.number())' }
          ],
          correct: 1,
          explain: {
            pl: 'Enum mapuje się wprost na słowo kluczowe enum w JSON Schema. Daty, transformacje i mapy nie mają odpowiednika - trzymaj je w warstwie domenowej po walidacji.',
            en: 'Enum maps directly onto the JSON Schema enum keyword. Dates, transforms and maps have no equivalent - keep them in the domain layer after validation.'
          }
        },
        {
          q: {
            pl: 'Model wypełnia pole tax_id losowymi cyframi, gdy nie ma go w dokumencie. Najlepsza poprawka schematu?',
            en: 'The model fills tax_id with random digits when the document has none. Best schema fix?'
          },
          options: [
            { pl: 'Zwiększyć max_tokens', en: 'Increase max_tokens' },
            { pl: 'Usunąć pole ze schematu', en: 'Remove the field from the schema' },
            { pl: 'Zmienić typ na number', en: 'Change the type to number' },
            { pl: 'Zrobić pole nullable i dodać missing_fields, żeby model mógł legalnie powiedzieć "nie ma"', en: 'Make the field nullable and add missing_fields so the model can legally say "not present"' }
          ],
          correct: 3,
          explain: {
            pl: 'Model bardzo niechętnie zostawia puste pola. Jawna, dozwolona ścieżka "nie znalazłem" to najskuteczniejszy sposób na ograniczenie zmyślania.',
            en: 'Models strongly resist leaving fields empty. An explicit, legal "not found" path is the most effective way to reduce fabrication.'
          }
        },
        {
          q: {
            pl: 'Gdzie w prompcie opłaca się umieścić definicje narzędzi i schemat, jeśli korzystasz z prompt cachingu?',
            en: 'Where should tool definitions and the schema sit in the prompt if you use prompt caching?'
          },
          options: [
            { pl: 'Na samym końcu, po danych użytkownika', en: 'At the very end, after user data' },
            { pl: 'Na początku, w stabilnym prefiksie przed zmiennymi danymi', en: 'At the front, in a stable prefix ahead of the variable data' },
            { pl: 'Rozproszone między wiadomościami, żeby model o nich pamiętał', en: 'Scattered between messages so the model remembers them' },
            { pl: 'To nie ma znaczenia, cache działa na całym requeście', en: 'It does not matter, the cache works on the whole request' }
          ],
          correct: 1,
          explain: {
            pl: 'Cache działa na prefiksie: wszystko przed pierwszą zmianą można odczytać taniej. Schemat po zmiennym dokumencie unieważnia cache przy każdym requeście.',
            en: 'Caching works on prefixes: everything before the first difference can be read cheaply. A schema placed after the variable document invalidates the cache on every request.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 3
    {
      id: 'validation-retries',
      title: {
        pl: 'Walidacja, naprawa i retry',
        en: 'Validation, repair and retries'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'pętla parse-validate-retry', en: 'parse-validate-retry loop' },
          def: {
            pl: 'Standardowa pętla obsługi wyjścia modelu: sparsuj, zwaliduj schematem, spróbuj naprawić lokalnie, a dopiero na końcu poproś model ponownie. Każdy etap ma własne logi i metryki.',
            en: 'The standard pipeline for model output: parse, validate against the schema, try a local repair, and only then ask the model again. Each stage gets its own logs and metrics.'
          }
        },
        {
          term: { pl: 'repair turn', en: 'repair turn' },
          def: {
            pl: 'Ponowne wywołanie, w którym oddajesz modelowi jego własne błędne wyjście plus konkretne błędy walidacji. Retry bez tej informacji to zwykły reroll i zwykle powtarza ten sam błąd.',
            en: 'A follow-up call that hands the model its own invalid output plus the concrete validation errors. A retry without that information is a plain reroll and usually reproduces the same mistake.'
          }
        },
        {
          term: { pl: 'naprawa lokalna', en: 'local repair' },
          def: {
            pl: 'Deterministyczne poprawki w kodzie, bez modelu: zdjęcie ogrodzenia <code>json</code> z bloku markdown, domknięcie nawiasu, koercja <code>&quot;12&quot;</code> na liczbę. Najtańszy i najszybszy stopień naprawy.',
            en: 'Deterministic fixes in code, no model involved: stripping a markdown <code>json</code> fence, closing a bracket, coercing <code>&quot;12&quot;</code> to a number. The cheapest and fastest repair tier.'
          }
        },
        {
          term: { pl: 'limit prób', en: 'retry cap' },
          def: {
            pl: 'Twardy limit (zwykle 2-3) na liczbę ponowień jednego zadania, razem ze ścieżką degradacji. Pętla naprawcza bez limitu to nie bug, tylko incydent kosztowy.',
            en: 'A hard cap (typically 2-3) on retries for one task, together with a degradation path. An uncapped repair loop is not a bug, it is a cost incident.'
          }
        },
        {
          term: { pl: 'partial credit', en: 'partial credit' },
          def: {
            pl: 'Zamiast odrzucać całą odpowiedź, przyjmij poprawne pola i oznacz brakujące jako niepewne. Schemat z jawnym polem na niepewność bije wymuszanie zgadywania.',
            en: 'Instead of rejecting the whole answer, accept the valid fields and flag the missing ones as uncertain. A schema with an explicit uncertainty field beats forcing the model to guess.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2l3arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">Parse, validate, repair - at most twice</text>' +
          '<rect x="30" y="55" width="150" height="60" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="90" fill="var(--text)" font-size="15" text-anchor="middle">model output</text>' +
          '<line x1="180" y1="85" x2="240" y2="85" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<rect x="245" y="55" width="150" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="90" fill="var(--text)" font-size="15" text-anchor="middle">JSON.parse</text>' +
          '<line x1="395" y1="85" x2="455" y2="85" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<rect x="460" y="55" width="150" height="60" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="535" y="90" fill="var(--text)" font-size="15" text-anchor="middle">safeParse</text>' +
          '<line x1="535" y1="115" x2="535" y2="175" stroke="var(--ok)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<text x="548" y="150" fill="var(--ok)" font-size="13">ok</text>' +
          '<rect x="460" y="180" width="150" height="55" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="535" y="213" fill="var(--ok)" font-size="14" text-anchor="middle">use it</text>' +
          '<line x1="460" y1="100" x2="320" y2="185" stroke="var(--warn)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<text x="360" y="145" fill="var(--warn)" font-size="13">errors</text>' +
          '<rect x="200" y="190" width="230" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="315" y="217" fill="var(--text)" font-size="14" text-anchor="middle">repair turn</text>' +
          '<text x="315" y="238" fill="var(--muted)" font-size="13" text-anchor="middle">send zod issues back</text>' +
          '<path d="M200 225 L120 225 L120 120" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<text x="30" y="180" fill="var(--muted)" font-size="13">retry 1</text>' +
          '<line x1="315" y1="260" x2="315" y2="315" stroke="var(--err)" stroke-width="2" marker-end="url(#m2l3arrow)"/>' +
          '<text x="325" y="292" fill="var(--err)" font-size="13">still bad</text>' +
          '<rect x="180" y="320" width="270" height="60" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="315" y="346" fill="var(--err)" font-size="14" text-anchor="middle">fail loudly, log, fallback</text>' +
          '<text x="315" y="366" fill="var(--muted)" font-size="13" text-anchor="middle">never an infinite loop</text>' +
          '</svg>',
        caption: {
          pl: 'Pętla naprawy: parsuj, waliduj, odeślij modelowi konkretne błędy zoda, ale najwyżej dwa razy - potem kontrolowana porażka.',
          en: 'The repair loop: parse, validate, send the concrete zod issues back - at most twice, then fail in a controlled way.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jedno wywołanie, które nie udaje się za pierwszym razem: mechaniczna naprawa, walidacja zodem, tura naprawcza z konkretnymi błędami i twardy limit prób.',
          en: 'One call that does not work the first time: mechanical repair, zod validation, a repair turn with concrete issues, and a hard attempt limit.'
        },
        frames: [
          {
            svg: repairFrame('1 of 2',
              repairRaw(
                'Sure! Here is the ticket you asked for:',
                'fenced code block, chatty prefix, trailing comma after the last field',
                'var(--warn)'
              ) +
              repairStep(20, 'JSON.parse', 'not run yet', 'var(--border)', 'var(--muted)') +
              repairStep(330, 'schema.safeParse', 'not run yet', 'var(--border)', 'var(--muted)') +
              repairOut('no typed object yet', 'var(--border)', 'var(--muted)') +
              repairFoot(
                'Treat the reply as untrusted input',
                'It is a string from a stranger, not a typed API response.',
                'var(--muted)'
              )
            ),
            label: { pl: '1. Surowa odpowiedź', en: '1. The raw reply' },
            note: {
              pl: 'Model dostał schemat, ale i tak dokleił zdanie wstępne i ogrodzenie z markdownu. To normalny przypadek, nie awaria.',
              en: 'The model got the schema and still added a chatty prefix and a markdown fence. That is a normal case, not an outage.'
            }
          },
          {
            svg: repairFrame('1 of 2',
              repairRaw(
                'Sure! Here is the ticket you asked for:',
                'stripped fence and prefix, cut the trailing comma - deterministic fixes first',
                'var(--accent)'
              ) +
              repairStep(20, 'JSON.parse', 'SyntaxError, then ok after cleanup', 'var(--err)', 'var(--err)') +
              repairStep(330, 'schema.safeParse', 'waiting', 'var(--border)', 'var(--muted)') +
              repairOut('plain object, shape still unknown', 'var(--accent)', 'var(--text)') +
              repairFoot(
                'Cheap repairs before any model call',
                'Fence stripping and comma cleanup cost nothing and fix most failures.',
                'var(--accent)'
              )
            ),
            label: { pl: '2. Naprawa mechaniczna', en: '2. Mechanical repair' },
            note: {
              pl: 'Zanim zapłacisz za kolejne wywołanie modelu, spróbuj poprawek deterministycznych. Dopiero potem sięgasz po turę naprawczą.',
              en: 'Before paying for another model call, try the deterministic fixes. Only then reach for a repair turn.'
            }
          },
          {
            svg: repairFrame('1 of 2',
              repairRaw(
                'parsed object: title, priority, estimateHours',
                'priority: urgent - a value the enum does not allow',
                'var(--warn)'
              ) +
              repairStep(20, 'JSON.parse', 'ok', 'var(--ok)', 'var(--ok)') +
              repairStep(330, 'schema.safeParse', 'success: false', 'var(--err)', 'var(--err)') +
              repairOut('issue at path priority: expected low | normal | high', 'var(--warn)', 'var(--warn)') +
              repairFoot(
                'Parsing is not validating',
                'Valid JSON with a wrong enum value would happily crash the code downstream.',
                'var(--warn)'
              )
            ),
            label: { pl: '3. Walidacja wyłapuje błąd', en: '3. Validation catches it' },
            note: {
              pl: 'JSON jest poprawny składniowo, ale kontrakt złamany. Zod zwraca ścieżkę i oczekiwaną wartość - to gotowy materiał na komunikat naprawczy.',
              en: 'The JSON is syntactically fine but the contract is broken. Zod returns the path and the expected values - ready-made material for the repair message.'
            }
          },
          {
            svg: repairFrame('2 of 2',
              repairRaw(
                'repair turn sent back to the model',
                'the exact zod issues, plus the schema again - not the words try again',
                'var(--accent)'
              ) +
              repairStep(20, 'JSON.parse', 'rerun on the new reply', 'var(--accent)', 'var(--accent)') +
              repairStep(330, 'schema.safeParse', 'rerun on the new reply', 'var(--accent)', 'var(--accent)') +
              repairOut('second and last attempt', 'var(--accent)', 'var(--accent)') +
              repairFoot(
                'Feed the error back as data',
                'A concrete path and expectation repairs far more often than a vague complaint.',
                'var(--accent)'
              )
            ),
            label: { pl: '4. Tura naprawcza', en: '4. The repair turn' },
            note: {
              pl: 'Do modelu wraca dokładny opis problemu: ścieżka pola, dozwolone wartości i schemat. Licznik prób idzie w górę.',
              en: 'The model gets the exact problem back: field path, allowed values and the schema. The attempt counter goes up.'
            }
          },
          {
            svg: repairFrame('2 of 2',
              repairRaw(
                'second reply: priority set to high',
                'no fence, no prose, just the object',
                'var(--ok)'
              ) +
              repairStep(20, 'JSON.parse', 'ok', 'var(--ok)', 'var(--ok)') +
              repairStep(330, 'schema.safeParse', 'success: true', 'var(--ok)', 'var(--ok)') +
              repairOut('typed object, safe to hand to the rest of the app', 'var(--ok)', 'var(--ok)') +
              repairFoot(
                'Only validated data crosses the boundary',
                'Everything past this line can assume the type is real, exactly like after a zod parse at an API edge.',
                'var(--ok)'
              )
            ),
            label: { pl: '5. Kontrakt spełniony', en: '5. Contract satisfied' },
            note: {
              pl: 'Dopiero teraz obiekt wchodzi do aplikacji. Warto zalogować, że potrzebna była naprawa - to metryka jakości promptu.',
              en: 'Only now does the object enter the app. Log that a repair was needed - that number is a quality metric for your prompt.'
            }
          },
          {
            svg: repairFrame('2 of 2',
              repairRaw(
                'alternative ending: the second reply is broken too',
                'the same enum error, or a brand new one',
                'var(--err)'
              ) +
              repairStep(20, 'JSON.parse', 'ok', 'var(--ok)', 'var(--ok)') +
              repairStep(330, 'schema.safeParse', 'success: false again', 'var(--err)', 'var(--err)') +
              repairOut('stop: budget spent, log the raw output, fall back', 'var(--err)', 'var(--err)') +
              repairFoot(
                'The budget is the whole design',
                'An unbounded repair loop is an invoice and a hanging request, never a feature.',
                'var(--err)'
              )
            ),
            label: { pl: '6. Kontrolowana porażka', en: '6. Controlled failure' },
            note: {
              pl: 'Po dwóch próbach kończysz głośno: log z surową odpowiedzią, metryka błędu i fallback dla użytkownika. Nigdy pętla bez końca.',
              en: 'After two attempts you stop loudly: log the raw output, bump the failure metric, show a fallback. Never an endless loop.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie, że wysyłasz stażystę po zakupy z listą. Wraca, a w siatce brakuje mleka i zamiast masła jest margaryna. Masz trzy wyjścia.</p><p>Pierwsze: krzyknąć "źle!" i odesłać go bez wyjaśnienia. Wróci z czymś równie losowym. Drugie: powiedzieć dokładnie "brakuje mleka, a margarynę zamień na masło". Wtedy zwykle wraca z tym, o co chodziło. Trzecie: odsyłać go w kółko, aż zamkną sklep - to najgorsze wyjście, bo tracisz cały dzień.</p><p>Z modelem jest tak samo. Kiedy odpowiedź nie pasuje do twojego formularza, nie mów mu "błąd". Powiedz, <strong>które pole</strong> jest złe i <strong>dlaczego</strong>. I ustal z góry, że dajesz mu najwyżej dwie szanse. Po drugiej odpuszczasz, zapisujesz co się stało i pokazujesz człowiekowi uprzejmy komunikat zamiast kręcić się w kółko.</p>',
          en: '<p>Imagine sending an intern to the shop with a list. He comes back with no milk and margarine instead of butter. You have three options.</p><p>One: shout "wrong!" and send him back with no explanation. He returns with something equally random. Two: tell him precisely "milk is missing, and swap the margarine for butter". That usually works. Three: keep sending him back until the shop closes - the worst option, because you burn the whole day.</p><p>Models are the same. When a reply does not fit your form, do not say "error". Say <strong>which field</strong> is wrong and <strong>why</strong>. And decide up front that he gets at most two chances. After the second you stop, write down what happened, and show a human a polite message instead of spinning forever.</p>'
        },
        school: {
          pl: '<p>Nawet z wymuszonym schematem potrzebujesz walidacji po swojej stronie. Constrained decoding pilnuje kształtu, ale nie sensu, a przy Claude czy modelach lokalnych często nie masz nawet gwarancji kształtu.</p><p>Standardowa pętla wygląda tak:</p><pre><code>async function extract(input, attempt = 0) {\n  const raw = await callModel(input, attempt);\n  let data;\n  try {\n    data = JSON.parse(raw);\n  } catch {\n    if (attempt &lt; 2) return extract(input, attempt + 1);\n    throw new Error("unparseable");\n  }\n\n  const result = Invoice.safeParse(data);\n  if (result.success) return result.data;\n\n  if (attempt &lt; 2) {\n    const issues = result.error.issues\n      .map((i) =&gt; i.path.join(".") + ": " + i.message)\n      .join("\\n");\n    return extract({ ...input, feedback: issues }, attempt + 1);\n  }\n  throw new Error("invalid after retries");\n}</code></pre><p>Trzy rzeczy warto zapamiętać.</p><p><strong>Retry musi nieść informację.</strong> Powtórzenie tego samego promptu to loteria. Dołączenie listy błędów zoda zamienia losowanie w poprawkę - to jest dokładnie ten sam mechanizm co komunikat walidacji przy formularzu.</p><p><strong>Limit jest twardy.</strong> Dwie próby to standard. Trzecia rzadko ratuje sytuację, a potraja koszt i czas odpowiedzi.</p><p><strong>Partial credit.</strong> Jeśli z dziesięciu pól osiem jest poprawnych, nie wyrzucaj całości. Zapisz to, co przeszło, oznacz resztę jako <code>needs_review</code> i pokaż w UI. To zwykle jest bardziej użyteczne niż pusty ekran z błędem, a przy okazji daje ci dane o tym, które pola sprawiają modelowi kłopot. Dokładnie tak samo traktujesz formularz w Reakcie: nie kasujesz wszystkiego, gdy jedno pole nie przejdzie walidacji, tylko podświetlasz to jedno i zostawiasz resztę.</p>',
          en: '<p>Even with an enforced schema you still need your own validation. Constrained decoding enforces shape, not meaning, and with Claude or local models you often do not even get a shape guarantee.</p><p>The standard loop looks like this:</p><pre><code>async function extract(input, attempt = 0) {\n  const raw = await callModel(input, attempt);\n  let data;\n  try {\n    data = JSON.parse(raw);\n  } catch {\n    if (attempt &lt; 2) return extract(input, attempt + 1);\n    throw new Error("unparseable");\n  }\n\n  const result = Invoice.safeParse(data);\n  if (result.success) return result.data;\n\n  if (attempt &lt; 2) {\n    const issues = result.error.issues\n      .map((i) =&gt; i.path.join(".") + ": " + i.message)\n      .join("\\n");\n    return extract({ ...input, feedback: issues }, attempt + 1);\n  }\n  throw new Error("invalid after retries");\n}</code></pre><p>Three things worth remembering.</p><p><strong>A retry must carry information.</strong> Re-sending the same prompt is a lottery. Attaching the zod issue list turns a reroll into a correction - the same mechanism as a form validation message.</p><p><strong>The cap is hard.</strong> Two attempts is the norm. A third rarely rescues anything and triples cost and latency.</p><p><strong>Partial credit.</strong> If eight of ten fields are valid, do not throw the lot away. Persist what passed, mark the rest as <code>needs_review</code> and surface it in the UI. That usually beats an empty error screen.</p>'
        },
        pro: {
          pl: '<p>Walidację traktuj jak warstwę anti-corruption między niedeterministycznym producentem a twoją domeną. Kolejność, która sprawdza się w produkcji:</p><ol><li><strong>Wyciągnij</strong> JSON (usuń otoczkę markdown, weź blok <code>tool_use.input</code> zamiast tekstu, jeśli używasz narzędzi).</li><li><strong>Sparsuj</strong> składniowo. Przy streamingu użyj parsera tolerancyjnego na niedomknięcia, ale <em>finalny</em> obiekt waliduj zwykłym <code>JSON.parse</code>.</li><li><strong>Zwaliduj</strong> zodem - zawsze <code>safeParse</code>, nigdy <code>parse</code> w ścieżce produkcyjnej.</li><li><strong>Sprawdź reguły biznesowe</strong>, których schemat nie wyraża: suma pozycji równa się kwocie całkowitej, data w przyszłości, waluta zgodna z krajem kontrahenta.</li><li><strong>Napraw albo zdegraduj</strong>.</li></ol><h4>Trzy rodzaje naprawy, od najtańszej</h4><ul><li><strong>Naprawa lokalna, bez modelu</strong>: przycięcie stringów, coercja "1234,50" na number, mapowanie "wysoki" na <code>high</code>. Zero kosztu, zero latencji. Zaskakująco często wystarcza.</li><li><strong>Repair turn</strong>: dokładasz do konwersacji wiadomość z błędami. Przy tool calling odsyłasz <code>tool_result</code> z <code>is_error: true</code> - model widzi błąd w naturalnym miejscu i poprawia argumenty. Koszt to jeden dodatkowy request, zwykle krótki.</li><li><strong>Reroll od zera</strong>, najlepiej z lekko podbitą temperaturą albo z mocniejszym modelem. Najdroższe, ratuje przypadki, w których model utknął w złej interpretacji.</li></ul><h4>Liczby, które warto znać</h4><p>Przy wymuszonym schemacie (OpenAI strict) błędy struktury spadają praktycznie do zera, a zostają błędy semantyczne - realnie 1-5 procent na trudnej ekstrakcji. Przy prompt-only na dobrym modelu spodziewaj się 2-8 procent odrzuceń, przy słabszym lub lokalnym 10-20. Jeden repair turn odzyskuje zwykle grubo ponad połowę tych przypadków; drugi znacznie mniej. Budżet: jeśli 5 procent requestów robi retry, twój średni koszt rośnie o około 5-7 procent, a p95 latencji potrafi się podwoić - dlatego retry mierzy się osobno w p50 i p95.</p><h4>Obserwowalność</h4><p>Loguj każdą porażkę walidacji jako zdarzenie z: id schematu i wersją, ścieżkami błędnych pól, numerem próby, modelem i hashem promptu. W Langfuse czy Braintrust dodaj to jako span z tagiem <code>validation_error</code>. Po tygodniu zobaczysz, że 80 procent błędów siedzi w dwóch polach - i wtedy naprawiasz schemat albo <code>.describe()</code>, zamiast dokładać kolejny retry. To jest różnica między inżynierią a klepaniem promptu.</p><p>I twarda zasada: <strong>brak limitu prób to incydent</strong>. Pętla naprawy bez licznika przy jednym złośliwym wejściu wygeneruje setki requestów, zanim ktokolwiek zauważy.</p>',
          en: '<p>Treat validation as an anti-corruption layer between a nondeterministic producer and your domain. The order that works in production:</p><ol><li><strong>Extract</strong> the JSON (strip markdown fences, read <code>tool_use.input</code> instead of text if you use tools).</li><li><strong>Parse</strong> syntactically. While streaming use a tolerant parser for partials, but validate the <em>final</em> object with plain <code>JSON.parse</code>.</li><li><strong>Validate</strong> with zod - always <code>safeParse</code>, never <code>parse</code> on a production path.</li><li><strong>Check business rules</strong> the schema cannot express: line items sum to the total, date in the future, currency consistent with the counterparty country.</li><li><strong>Repair or degrade</strong>.</li></ol><h4>Three kinds of repair, cheapest first</h4><ul><li><strong>Local repair, no model</strong>: trim strings, coerce "1234,50" to a number, map "High" onto <code>high</code>. Zero cost, zero latency. Surprisingly often enough.</li><li><strong>Repair turn</strong>: append a message carrying the errors. With tool calling you return a <code>tool_result</code> with <code>is_error: true</code> - the model sees the failure in its natural place and fixes the arguments. Cost is one extra, usually short, request.</li><li><strong>Full reroll</strong>, ideally with slightly higher temperature or a stronger model. Most expensive; rescues cases where the model locked onto a wrong reading.</li></ul><h4>Numbers worth knowing</h4><p>With an enforced schema (OpenAI strict) structural failures drop to essentially zero and only semantic ones remain - realistically 1-5 percent on hard extraction. Prompt-only on a good model, expect 2-8 percent rejects; on a weaker or local model, 10-20. One repair turn typically recovers well over half of those; a second recovers much less. Budget: if 5 percent of requests retry, mean cost rises roughly 5-7 percent, but p95 latency can double - which is why retries are tracked separately at p50 and p95.</p><h4>Observability</h4><p>Log every validation failure as an event with: schema id and version, failing field paths, attempt number, model, prompt hash. In Langfuse or Braintrust attach it as a span tagged <code>validation_error</code>. After a week you will find 80 percent of failures live in two fields - then you fix the schema or the <code>.describe()</code> instead of adding another retry. That is the difference between engineering and prompt whack-a-mole.</p><p>And one hard rule: <strong>an uncapped repair loop is an incident</strong>. A loop with no counter will fire hundreds of requests on a single adversarial input before anyone notices.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Co powinien zawierać retry po nieudanej walidacji?',
            en: 'What should a retry after failed validation contain?'
          },
          options: [
            { pl: 'Dokładnie ten sam prompt co poprzednio', en: 'Exactly the same prompt as before' },
            { pl: 'Konkretne błędy walidacji: które pola i dlaczego są złe', en: 'The concrete validation errors: which fields failed and why' },
            { pl: 'Prośbę, żeby model bardziej się postarał', en: 'A request for the model to try harder' },
            { pl: 'Cały dokument źródłowy jeszcze raz, bez zmian', en: 'The whole source document again, unchanged' }
          ],
          correct: 1,
          explain: {
            pl: 'Retry bez informacji to losowanie. Lista błędów zoda działa jak komunikat walidacji formularza - model wie, co poprawić.',
            en: 'A blind retry is a reroll. The zod issue list works like a form validation message: the model knows what to change.'
          }
        },
        {
          q: {
            pl: 'Ile prób naprawy ma sens w typowym systemie produkcyjnym?',
            en: 'How many repair attempts make sense in a typical production system?'
          },
          options: [
            { pl: 'Tyle, ile trzeba, aż się uda', en: 'As many as needed until it succeeds' },
            { pl: 'Zero, walidacja wystarczy', en: 'Zero, validation is enough' },
            { pl: 'Zwykle jedna do dwóch, potem kontrolowana porażka', en: 'Usually one to two, then a controlled failure' },
            { pl: 'Minimum pięć, bo modele są niedeterministyczne', en: 'At least five, because models are nondeterministic' }
          ],
          correct: 2,
          explain: {
            pl: 'Pierwszy repair turn odzyskuje większość przypadków, kolejne dają coraz mniej, a koszt i p95 latencji rosną liniowo. Pętla bez limitu to gotowy incydent.',
            en: 'The first repair turn recovers most cases, later ones give diminishing returns while cost and p95 latency grow linearly. An uncapped loop is a waiting incident.'
          }
        },
        {
          q: {
            pl: 'Model zwrócił poprawny strukturalnie JSON, ale suma pozycji nie zgadza się z kwotą całkowitą. Kto to wykryje?',
            en: 'The model returned structurally valid JSON, but the line items do not sum to the total. Who catches that?'
          },
          options: [
            { pl: 'Constrained decoding dostawcy', en: 'The provider constrained decoding' },
            { pl: 'JSON.parse', en: 'JSON.parse' },
            { pl: 'Nikt, to nie jest wykrywalne', en: 'Nobody, it is undetectable' },
            { pl: 'Twoja warstwa reguł biznesowych po walidacji schematu', en: 'Your business-rule layer after schema validation' }
          ],
          correct: 3,
          explain: {
            pl: 'Schemat wyraża typy, nie relacje między polami. Reguły typu "suma pozycji równa się total" sprawdzasz sam - najlepiej jako osobny krok przed zapisem.',
            en: 'A schema expresses types, not relations between fields. Rules like "items sum to total" are yours to check, ideally as a separate step before persisting.'
          }
        },
        {
          q: {
            pl: 'Osiem z dziesięciu pól przeszło walidację, dwa nie. Najlepsze zachowanie produkcyjne?',
            en: 'Eight of ten fields validate, two do not. Best production behaviour?'
          },
          options: [
            { pl: 'Zapisać poprawne pola, oznaczyć pozostałe jako wymagające sprawdzenia i pokazać to w UI', en: 'Persist the valid fields, mark the rest as needs-review, and surface that in the UI' },
            { pl: 'Odrzucić całą odpowiedź i pokazać pusty ekran błędu', en: 'Reject the whole response and show an empty error screen' },
            { pl: 'Uzupełnić brakujące pola wartościami domyślnymi po cichu', en: 'Silently fill the missing fields with defaults' },
            { pl: 'Zapisać wszystko, łącznie z niepoprawnymi polami', en: 'Persist everything, including the invalid fields' }
          ],
          correct: 0,
          explain: {
            pl: 'Partial credit daje użytkownikowi realną wartość i miejsce na poprawkę. Ciche domyślne wartości są najgorsze - fałszywe dane wyglądają jak prawdziwe.',
            en: 'Partial credit gives the user real value and a place to correct. Silent defaults are the worst option: fabricated data that looks genuine.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 4
    {
      id: 'tool-calling',
      title: {
        pl: 'Tool calling - pętla wywołań',
        en: 'Tool calling: the loop'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'tool calling', en: 'tool calling' },
          def: {
            pl: 'Mechanizm, w którym model zamiast tekstu zwraca ustrukturyzowaną prośbę o wywołanie narzędzia z argumentami. Sam niczego nie uruchamia - wykonanie należy do twojego kodu.',
            en: 'The mechanism where the model returns a structured request to call a tool with arguments instead of prose. It executes nothing itself - running the tool is your code.'
          }
        },
        {
          term: { pl: 'pętla narzędziowa', en: 'the tool loop' },
          def: {
            pl: 'Cykl: model prosi o narzędzie -> ty je wykonujesz -> wynik wraca do rozmowy -> model kontynuuje. Powtarza się aż model odpowie tekstem albo wyczerpiesz limit iteracji.',
            en: 'The cycle: the model requests a tool -> you execute it -> the result goes back into the conversation -> the model continues. It repeats until the model answers in text or you hit the iteration cap.'
          }
        },
        {
          term: { pl: 'tool_result', en: 'tool_result' },
          def: {
            pl: 'Wiadomość z wynikiem narzędzia dopięta do historii, powiązana id z prośbą modelu. Musi wrócić dla <em>każdej</em> prośby, także tej, która się nie udała - inaczej API odrzuci konwersację.',
            en: 'The message carrying the tool output back into the history, tied by id to the request. One must come back for <em>every</em> request, including failed ones, or the API rejects the conversation.'
          }
        },
        {
          term: { pl: 'schemat wejścia narzędzia', en: 'tool input schema' },
          def: {
            pl: 'JSON Schema argumentów narzędzia razem z opisem - dla modelu to jednocześnie dokumentacja i kontrakt. Zła nazwa albo mętny opis psują trafność wyboru narzędzia bardziej niż cokolwiek w system prompcie.',
            en: 'The JSON Schema of the tool arguments plus its description - for the model it is documentation and contract in one. A bad name or vague description hurts tool selection more than anything in the system prompt.'
          }
        },
        {
          term: { pl: 'błędy jako dane', en: 'errors as data' },
          def: {
            pl: 'Nieudane wywołanie oddajesz modelowi jako normalny wynik z czytelnym komunikatem, zamiast rzucać wyjątek. Model potrafi wtedy poprawić argumenty i spróbować ponownie.',
            en: 'Return a failed call to the model as an ordinary result with a readable message instead of throwing. The model can then fix its arguments and try again.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2l4arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">The model never runs anything. Your code does.</text>' +
          '<rect x="40" y="55" width="200" height="70" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="140" y="83" fill="var(--text)" font-size="15" text-anchor="middle">1. Model</text>' +
          '<text x="140" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">asks for get_weather</text>' +
          '<line x1="240" y1="90" x2="390" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l4arrow)"/>' +
          '<text x="315" y="80" fill="var(--muted)" font-size="13" text-anchor="middle">tool_use</text>' +
          '<rect x="395" y="55" width="205" height="70" rx="14" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="497" y="83" fill="var(--text)" font-size="15" text-anchor="middle">2. Your backend</text>' +
          '<text x="497" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">validates, executes</text>' +
          '<line x1="497" y1="125" x2="497" y2="185" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l4arrow)"/>' +
          '<rect x="395" y="190" width="205" height="70" rx="14" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="497" y="218" fill="var(--text)" font-size="15" text-anchor="middle">3. Real API</text>' +
          '<text x="497" y="239" fill="var(--muted)" font-size="13" text-anchor="middle">db, http, filesystem</text>' +
          '<path d="M395 225 L140 225 L140 130" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l4arrow)"/>' +
          '<text x="150" y="180" fill="var(--muted)" font-size="13">4. tool_result back into context</text>' +
          '<line x1="140" y1="260" x2="140" y2="320" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l4arrow)"/>' +
          '<rect x="40" y="325" width="245" height="60" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="162" y="351" fill="var(--ok)" font-size="14" text-anchor="middle">5. Model answers</text>' +
          '<text x="162" y="371" fill="var(--muted)" font-size="13" text-anchor="middle">or asks for another tool</text>' +
          '<rect x="330" y="325" width="270" height="60" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="465" y="351" fill="var(--warn)" font-size="14" text-anchor="middle">errors are data</text>' +
          '<text x="465" y="371" fill="var(--muted)" font-size="13" text-anchor="middle">return them, do not throw</text>' +
          '</svg>',
        caption: {
          pl: 'Pętla tool callingu: model prosi o narzędzie, twój kod je wykonuje, wynik wraca do kontekstu, model kontynuuje. Błędy odsyłasz jako dane.',
          en: 'The tool-calling loop: the model requests a tool, your code executes it, the result goes back into context, the model continues. Errors go back as data.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Jedno pełne okrążenie pętli: prośba o narzędzie, wykonanie po twojej stronie, wynik z powrotem w kontekście i odpowiedź - plus wariant z błędem.',
          en: 'One full lap of the loop: the tool request, execution on your side, the result back in context and the answer - plus the error variant.'
        },
        frames: [
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'reads the tool schemas', 'var(--accent)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'idle', 'var(--border)') +
              loopBox(368, 186, 252, 76, 'Weather API', 'idle', 'var(--border)') +
              loopLog(
                'messages: [ user: what is the weather in Warsaw? ]',
                'tools: [ get_weather { city: string, unit?: c | f } ]',
                'The schema is part of the prompt - name and description do the teaching.',
                'var(--muted)'
              )
            ),
            label: { pl: '1. Wysyłasz narzędzia', en: '1. You send the tools' },
            note: {
              pl: 'Narzędzie to opis w JSON Schema, a nie kod wysłany do modelu. Model widzi tylko nazwę, opis i kształt argumentów.',
              en: 'A tool is a JSON Schema description, not code shipped to the model. All the model sees is the name, the description and the argument shape.'
            }
          },
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'stop_reason: tool_use', 'var(--accent)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'receives the request', 'var(--accent2)') +
              loopBox(368, 186, 252, 76, 'Weather API', 'idle', 'var(--border)') +
              loopSend('tool_use get_weather', 'var(--accent)') +
              loopLog(
                'assistant: tool_use id tu_01, name get_weather',
                'input: { city: Warsaw, unit: c }',
                'The turn ends here. Nothing was executed - the model only asked.',
                'var(--accent)'
              )
            ),
            label: { pl: '2. Model prosi o narzędzie', en: '2. The model asks' },
            note: {
              pl: 'Zamiast tekstu dostajesz blok tool_use z nazwą i argumentami. Model zatrzymuje generowanie i czeka na wynik.',
              en: 'Instead of text you get a tool_use block with a name and arguments. The model stops generating and waits for a result.'
            }
          },
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'waiting', 'var(--border)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'zod parse of the arguments', 'var(--accent2)') +
              loopBox(368, 186, 252, 76, 'Weather API', 'GET /forecast?city=Warsaw', 'var(--accent2)') +
              loopCall('var(--accent2)') +
              loopLog(
                'validate args, check permissions, then call the real system',
                'timeout, retry policy and rate limits live here, not in the prompt',
                'This is the only place where anything actually happens.',
                'var(--accent2)'
              )
            ),
            label: { pl: '3. Twój kod wykonuje', en: '3. Your code executes' },
            note: {
              pl: 'Argumenty od modelu traktujesz jak dane z formularza: walidacja zodem, sprawdzenie uprawnień, dopiero potem prawdziwe wywołanie.',
              en: 'Treat the arguments like form input: validate with zod, check permissions, and only then make the real call.'
            }
          },
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'gets the full history again', 'var(--accent)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'appends tool_result', 'var(--ok)') +
              loopBox(368, 186, 252, 76, 'Weather API', '4 C, wind 12 km/h', 'var(--ok)') +
              loopReturn('tool_result tu_01', 'var(--ok)') +
              loopLog(
                'messages: [ user, assistant tool_use, user tool_result ]',
                'the result is matched to the request by tool_use id',
                'The API is stateless - you resend the whole conversation every lap.',
                'var(--ok)'
              )
            ),
            label: { pl: '4. Wynik wraca do kontekstu', en: '4. The result goes back' },
            note: {
              pl: 'Wynik dopisujesz jako tool_result z tym samym id i wysyłasz całą historię jeszcze raz. Model nie pamięta nic między wywołaniami.',
              en: 'You append the result as a tool_result with the same id and send the whole history again. The model remembers nothing between calls.'
            }
          },
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'stop_reason: end_turn', 'var(--ok)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'streams the answer to the UI', 'var(--border)') +
              loopBox(368, 186, 252, 76, 'Weather API', 'done', 'var(--border)') +
              loopSend('final text', 'var(--ok)') +
              loopLog(
                'assistant: it is 4 C in Warsaw right now, with a light wind',
                'or another tool_use block - then the loop simply runs again',
                'Cap the number of laps: an agent without a limit is an open tab on your card.',
                'var(--ok)'
              )
            ),
            label: { pl: '5. Model odpowiada', en: '5. The model answers' },
            note: {
              pl: 'Mając wynik, model kończy turę tekstem albo prosi o kolejne narzędzie. Ta sama pętla obsługuje jedno i drugie.',
              en: 'With the result in hand the model finishes the turn with text, or asks for another tool. The same loop covers both.'
            }
          },
          {
            svg: loopFrame(
              loopBox(20, 58, 252, 86, 'Model', 'reads the error and adapts', 'var(--accent)') +
              loopBox(368, 58, 252, 86, 'Your backend', 'catches, does not throw', 'var(--warn)') +
              loopBox(368, 186, 252, 76, 'Weather API', '404 unknown city', 'var(--err)') +
              loopReturn('tool_result: error payload', 'var(--warn)') +
              loopLog(
                'tool_result: { error: unknown_city, hint: ask the user to confirm }',
                'is_error: true - a normal message, not an exception in your process',
                'Errors are data: the model can retry with a fix or ask the user.',
                'var(--warn)'
              )
            ),
            label: { pl: '6. Błąd jako dane', en: '6. Errors as data' },
            note: {
              pl: 'Wyjątek po twojej stronie zabija pętlę. Zamiast tego odsyłasz opis błędu i podpowiedź - model potrafi się z tego pozbierać.',
              en: 'An exception on your side kills the loop. Send back a described error plus a hint instead, and the model can recover from it.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraź sobie bardzo oczytanego kolegę zamkniętego w pokoju bez okien i bez telefonu. Wie mnóstwo rzeczy z książek, ale nie ma pojęcia, jaka jest teraz pogoda i ile masz na koncie.</p><p>Dajesz mu więc kartkę z listą pytań, które możesz za niego załatwić: "sprawdź pogodę w mieście X", "policz sumę", "znajdź klienta po mailu". Kiedy potrzebuje takiej informacji, nie zgaduje - wysuwa spod drzwi karteczkę: "sprawdź pogodę, miasto: Kraków".</p><p>Ty bierzesz tę karteczkę, sam wykonujesz robotę i wsuwasz z powrotem odpowiedź: "12 stopni, pada". Kolega czyta i dopiero teraz mówi, czy brać parasol.</p><p>Najważniejsze: <strong>on nigdy nic nie robi sam</strong>. Tylko prosi. Wszystko wykonuje twój kod, więc to ty decydujesz, o co można prosić, a czego nie ma nawet na liście.</p>',
          en: '<p>Picture a very well-read friend locked in a windowless room with no phone. He knows a huge amount from books, but has no idea what the weather is right now or what your account balance is.</p><p>So you hand him a card listing the questions you can answer for him: "check the weather in city X", "add these numbers", "find the customer by email". When he needs one of those, he does not guess - he slides a note under the door: "check weather, city: Krakow".</p><p>You take the note, do the work yourself, and slide the answer back: "12 degrees, raining". He reads it, and only then tells you whether to take an umbrella.</p><p>The crucial part: <strong>he never does anything himself</strong>. He only asks. Your code does all the doing, so you decide what can be asked for and what is not even on the card.</p>'
        },
        school: {
          pl: '<p>Tool calling (wywoływanie narzędzi) to structured output z jedną dodatkową rzeczą: umową, że po odpowiedzi coś się wydarzy i wynik wróci do modelu.</p><p>Definiujesz narzędzia mniej więcej tak samo jak endpoint w REST: nazwa, opis i schemat parametrów.</p><pre><code>const tools = [{\n  name: "search_orders",\n  description: "Znajdz zamowienia klienta z ostatnich 90 dni.",\n  input_schema: {\n    type: "object",\n    properties: {\n      email: { type: "string" },\n      status: { type: "string", enum: ["paid", "pending", "cancelled"] },\n    },\n    required: ["email"],\n  },\n}];</code></pre><p>Potem pętla wygląda tak:</p><ol><li>Wysyłasz wiadomości plus listę narzędzi.</li><li>Model zamiast tekstu zwraca blok <code>tool_use</code>: nazwę i argumenty. Odpowiedź kończy się ze <code>stop_reason: "tool_use"</code>.</li><li>Twój kod waliduje argumenty, wykonuje prawdziwą operację i buduje <code>tool_result</code>.</li><li>Doklejasz wynik do historii i wysyłasz request ponownie.</li><li>Model albo odpowiada tekstem, albo prosi o kolejne narzędzie. Pętla kręci się aż do odpowiedzi tekstowej lub do twojego limitu iteracji.</li></ol><p>Dwie rzeczy zaskakują ludzi na początku.</p><p><strong>Model niczego nie uruchamia.</strong> Nie ma dostępu do sieci ani do bazy. Generuje wyłącznie prośbę. Cała moc - i cała odpowiedzialność za bezpieczeństwo - jest po stronie twojego kodu.</p><p><strong>Błędy odsyłasz, a nie rzucasz.</strong> Jeśli klient nie istnieje, nie przerywaj konwersacji wyjątkiem. Wróć z <code>tool_result</code> o treści "nie znaleziono klienta o tym mailu, sprawdz pisownie". Model potrafi z tym coś zrobić: dopytać użytkownika albo spróbować innego narzędzia. Wyjątek zabija rozmowę, komunikat ją posuwa dalej.</p>',
          en: '<p>Tool calling is structured output with one extra thing: a contract that after the reply something happens and the result comes back to the model.</p><p>You define tools much like a REST endpoint: name, description, parameter schema.</p><pre><code>const tools = [{\n  name: "search_orders",\n  description: "Find a customer orders from the last 90 days.",\n  input_schema: {\n    type: "object",\n    properties: {\n      email: { type: "string" },\n      status: { type: "string", enum: ["paid", "pending", "cancelled"] },\n    },\n    required: ["email"],\n  },\n}];</code></pre><p>Then the loop goes:</p><ol><li>You send messages plus the tool list.</li><li>Instead of text the model returns a <code>tool_use</code> block: name and arguments. The response ends with <code>stop_reason: "tool_use"</code>.</li><li>Your code validates the arguments, performs the real operation, and builds a <code>tool_result</code>.</li><li>You append the result to the history and call the API again.</li><li>The model either answers in text or asks for another tool. The loop spins until a text answer or your iteration cap.</li></ol><p>Two things surprise people at first.</p><p><strong>The model runs nothing.</strong> It has no network and no database access. It only generates a request. All the power - and all the security responsibility - sits in your code.</p><p><strong>Errors are returned, not thrown.</strong> If the customer does not exist, do not blow up the conversation with an exception. Return a <code>tool_result</code> saying "no customer with that email, check the spelling". The model can act on that: ask the user, or try a different tool. An exception kills the conversation; a message moves it forward.</p>'
        },
        pro: {
          pl: '<p>Pętla w kodzie, w wersji minimalnej i produkcyjnie sensownej:</p><pre><code>let messages = [{ role: "user", content: question }];\n\nfor (let i = 0; i &lt; MAX_STEPS; i++) {\n  const res = await anthropic.messages.create({\n    model: "claude-sonnet-4-5",\n    max_tokens: 2048,\n    tools,\n    messages,\n  });\n  messages.push({ role: "assistant", content: res.content });\n\n  if (res.stop_reason !== "tool_use") return res;\n\n  const calls = res.content.filter((b) =&gt; b.type === "tool_use");\n  const results = await Promise.all(calls.map(runTool));\n  messages.push({ role: "user", content: results });\n}\nthrow new Error("step budget exhausted");</code></pre><p>Uwaga na kilka szczegółów, które oddzielają demo od produkcji.</p><h4>Równoległość i kolejność</h4><p>Claude i GPT potrafią zwrócić kilka bloków <code>tool_use</code> naraz. Musisz odesłać <strong>wszystkie</strong> odpowiadające im <code>tool_result</code> w jednej wiadomości użytkownika, z pasującymi <code>tool_use_id</code>. Pominięcie jednego to błąd 400. Wykonuj je równolegle tylko wtedy, gdy są niezależne i idempotentne.</p><h4>Argumenty są niezaufanym wejściem</h4><p>To jest ta sama klasa problemu co dane z formularza. Model, zwłaszcza pod wpływem prompt injection z treści dokumentu, może zaproponować <code>{ "path": "../../.env" }</code> albo <code>{ "limit": 1000000 }</code>. Waliduj zodem, wymuszaj whitelisty, twarde limity i autoryzację po stronie serwera na podstawie <em>sesji użytkownika</em>, nigdy na podstawie argumentu od modelu. Jeśli narzędzie przyjmuje <code>user_id</code> jako parametr, właśnie zbudowałeś IDOR.</p><h4>Rozmiar wyników</h4><p>Wynik narzędzia wchodzi do kontekstu i płacisz za niego w każdej kolejnej iteracji, bo cała historia leci ponownie. Zwrócenie surowej odpowiedzi API na 30 tysięcy tokenów przy pięciu krokach kosztuje kilkukrotnie więcej niż samo pytanie. Praktyka: przycinaj do 1-4 tysięcy tokenów, zwracaj pola potrzebne do decyzji, a resztę chowaj za identyfikatorem i osobnym narzędziem <code>get_details</code>.</p><h4>Budżety i pułapki</h4><ul><li>Twardy <code>MAX_STEPS</code> (typowo 8-15) plus budżet czasu i tokenów. Bez tego jedno narzędzie zwracające błąd potrafi wygenerować pętlę na kilkanaście dolarów.</li><li>Nie dawaj modelowi 40 narzędzi. Powyżej mniej więcej 15-20 trafność wyboru zauważalnie spada; grupuj narzędzia albo dziel na podagentów z węższym zestawem.</li><li><code>tool_choice</code>: <code>auto</code> domyślnie, <code>any</code> gdy narzędzie jest obowiązkowe, konkretna nazwa gdy używasz tool callingu wyłącznie jako structured output.</li><li>Każde wywołanie loguj jako span (Langfuse, Braintrust, OpenTelemetry): nazwa, argumenty, czas, rozmiar wyniku, sukces. Bez tego debugowanie pętli agenta to zgadywanka.</li><li>Operacje nieodwracalne (przelew, wysyłka maila, DELETE) zawsze za bramką akceptacji człowieka albo z kluczem idempotencji.</li></ul><p>Cała reszta modułu o agentach to w gruncie rzeczy ta jedna pętla plus zarządzanie kontekstem i uprawnieniami.</p>',
          en: '<p>The loop in code, minimal but production-shaped:</p><pre><code>let messages = [{ role: "user", content: question }];\n\nfor (let i = 0; i &lt; MAX_STEPS; i++) {\n  const res = await anthropic.messages.create({\n    model: "claude-sonnet-4-5",\n    max_tokens: 2048,\n    tools,\n    messages,\n  });\n  messages.push({ role: "assistant", content: res.content });\n\n  if (res.stop_reason !== "tool_use") return res;\n\n  const calls = res.content.filter((b) =&gt; b.type === "tool_use");\n  const results = await Promise.all(calls.map(runTool));\n  messages.push({ role: "user", content: results });\n}\nthrow new Error("step budget exhausted");</code></pre><p>A few details separate a demo from production.</p><h4>Parallelism and ordering</h4><p>Claude and GPT can return several <code>tool_use</code> blocks at once. You must send back <strong>every</strong> corresponding <code>tool_result</code> in a single user message, with matching <code>tool_use_id</code>. Miss one and you get a 400. Execute them in parallel only when they are independent and idempotent.</p><h4>Arguments are untrusted input</h4><p>Same class of problem as form data. A model - especially under prompt injection from document content - may propose <code>{ "path": "../../.env" }</code> or <code>{ "limit": 1000000 }</code>. Validate with zod, enforce allowlists and hard caps, and authorize server-side from the <em>user session</em>, never from a model-supplied argument. If your tool takes <code>user_id</code> as a parameter, you have just built an IDOR.</p><h4>Result size</h4><p>A tool result enters the context and you pay for it on every later iteration, because the whole history is resent. Returning a raw 30k-token API response across five steps costs several times more than the question itself. Practice: trim to 1-4k tokens, return the fields needed for the decision, and hide the rest behind an id plus a separate <code>get_details</code> tool.</p><h4>Budgets and traps</h4><ul><li>A hard <code>MAX_STEPS</code> (typically 8-15) plus a wall-clock and token budget. Without it, one tool returning an error can spin a loop worth tens of dollars.</li><li>Do not hand the model 40 tools. Past roughly 15-20 selection accuracy visibly degrades; group tools or split into subagents with narrower sets.</li><li><code>tool_choice</code>: <code>auto</code> by default, <code>any</code> when a tool is mandatory, a specific name when you use tool calling purely as structured output.</li><li>Log every call as a span (Langfuse, Braintrust, OpenTelemetry): name, arguments, duration, result size, success. Without it, debugging an agent loop is guesswork.</li><li>Irreversible operations (payments, sending mail, DELETE) always behind a human approval gate or an idempotency key.</li></ul><p>The entire agents module is essentially this one loop plus context and permission management.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Kto faktycznie wykonuje narzędzie w pętli tool callingu?',
            en: 'Who actually executes the tool in a tool-calling loop?'
          },
          options: [
            { pl: 'Model, w piaskownicy dostawcy', en: 'The model, in the provider sandbox' },
            { pl: 'Twój kod - model zwraca tylko prośbę z argumentami', en: 'Your code - the model only returns a request with arguments' },
            { pl: 'Serwer MCP, zawsze', en: 'An MCP server, always' },
            { pl: 'Przeglądarka użytkownika', en: 'The user browser' }
          ],
          correct: 1,
          explain: {
            pl: 'Model generuje wyłącznie blok tool_use. Wykonanie, autoryzacja i bezpieczeństwo są w całości po stronie twojego backendu.',
            en: 'The model only emits a tool_use block. Execution, authorization and security live entirely in your backend.'
          }
        },
        {
          q: {
            pl: 'Narzędzie nie znalazło klienta o podanym mailu. Co zrobić?',
            en: 'A tool cannot find a customer with the given email. What do you do?'
          },
          options: [
            { pl: 'Rzucić wyjątek i zakończyć konwersację', en: 'Throw an exception and end the conversation' },
            { pl: 'Zwrócić pusty obiekt bez komentarza', en: 'Return an empty object with no comment' },
            { pl: 'Odesłać tool_result z czytelnym komunikatem błędu, żeby model mógł zareagować', en: 'Return a tool_result with a readable error message so the model can react' },
            { pl: 'Zawołać narzędzie ponownie z tymi samymi argumentami', en: 'Call the tool again with the same arguments' }
          ],
          correct: 2,
          explain: {
            pl: 'Błędy jako dane: model może dopytać użytkownika albo spróbować innej ścieżki. Wyjątek ucina rozmowę i traci cały kontekst.',
            en: 'Errors as data: the model can ask the user or try another path. An exception cuts the conversation and throws away the context.'
          }
        },
        {
          q: {
            pl: 'Model zwrócił trzy bloki tool_use w jednej odpowiedzi. Jak poprawnie odpowiedzieć?',
            en: 'The model returned three tool_use blocks in one response. How do you respond correctly?'
          },
          options: [
            { pl: 'Odesłać tylko wynik pierwszego, resztę pominąć', en: 'Return only the first result and skip the rest' },
            { pl: 'Wysłać trzy osobne requesty, po jednym na narzędzie', en: 'Send three separate requests, one per tool' },
            { pl: 'Zignorować je i poprosić model o tekst', en: 'Ignore them and ask the model for text' },
            { pl: 'Odesłać wszystkie trzy tool_result w jednej wiadomości, z pasującymi tool_use_id', en: 'Return all three tool_result blocks in one message, with matching tool_use_id values' }
          ],
          correct: 3,
          explain: {
            pl: 'API wymaga kompletu odpowiedzi dopasowanych po tool_use_id w jednej wiadomości. Brak choćby jednej kończy się błędem 400.',
            en: 'The API requires the full set of results, matched by tool_use_id, in a single message. Missing even one returns a 400.'
          }
        },
        {
          q: {
            pl: 'Narzędzie search_docs przyjmuje user_id jako parametr i zwraca dokumenty tego użytkownika. Co jest z tym nie tak?',
            en: 'A search_docs tool takes user_id as a parameter and returns that user documents. What is wrong with it?'
          },
          options: [
            { pl: 'Argument pochodzi od modelu, więc autoryzacja na jego podstawie tworzy podatność typu IDOR', en: 'The argument comes from the model, so authorizing on it creates an IDOR vulnerability' },
            { pl: 'Nic, to standardowy wzorzec', en: 'Nothing, it is the standard pattern' },
            { pl: 'user_id powinien być typu number, nie string', en: 'user_id should be a number, not a string' },
            { pl: 'Nazwa narzędzia jest za krótka', en: 'The tool name is too short' }
          ],
          correct: 0,
          explain: {
            pl: 'Argumenty narzędzi to niezaufane wejście, tak jak body requestu. Tożsamość bierz z sesji po stronie serwera, a model niech dostaje tylko to, co wolno danemu użytkownikowi.',
            en: 'Tool arguments are untrusted input, exactly like a request body. Take identity from the server-side session and let the model see only what that user may access.'
          }
        }
      ]
    },
    // ------------------------------------------------------------------ 5
    {
      id: 'mcp',
      title: {
        pl: 'MCP - Model Context Protocol',
        en: 'MCP: Model Context Protocol'
      },
      minutes: 9,
      terms: [
        {
          term: { pl: 'MCP', en: 'MCP (Model Context Protocol)' },
          def: {
            pl: 'Otwarty protokół opisujący, jak aplikacja hosta odkrywa i wywołuje narzędzia, zasoby i prompty wystawione przez zewnętrzny serwer. Standaryzuje transport i discovery, nie samo tool calling.',
            en: 'An open protocol for how a host application discovers and calls tools, resources and prompts exposed by an external server. It standardises discovery and transport, not tool calling itself.'
          }
        },
        {
          term: { pl: 'serwer MCP', en: 'MCP server' },
          def: {
            pl: 'Proces wystawiający zdolności (np. dostęp do Jiry albo do bazy) zgodnie z protokołem. Napisany raz, działa w każdym hoście MCP - to jest cała wartość standardu.',
            en: 'A process exposing capabilities (Jira access, a database, a filesystem) according to the protocol. Written once, it works in every MCP host - that is the whole value of the standard.'
          }
        },
        {
          term: { pl: 'host i klient', en: 'host and client' },
          def: {
            pl: 'Host to aplikacja z modelem (Claude Desktop, IDE, twój agent); klient to warstwa w hoście, która trzyma połączenie z jednym serwerem. Host decyduje o uprawnieniach i o tym, co trafi do promptu.',
            en: 'The host is the application with the model (Claude Desktop, an IDE, your agent); the client is the layer inside it holding one connection to one server. The host owns permissions and decides what reaches the prompt.'
          }
        },
        {
          term: { pl: 'resources', en: 'resources' },
          def: {
            pl: 'Dane tylko do odczytu adresowane URI, które host może wciągnąć do kontekstu - w odróżnieniu od <strong>tools</strong>, które wykonują akcje, i <strong>prompts</strong>, czyli gotowych szablonów.',
            en: 'Read-only, URI-addressed data the host can pull into context - as opposed to <strong>tools</strong>, which perform actions, and <strong>prompts</strong>, which are reusable templates.'
          }
        },
        {
          term: { pl: 'stdio vs streamable HTTP', en: 'stdio vs streamable HTTP' },
          def: {
            pl: 'Dwa transporty MCP: stdio dla serwerów lokalnych uruchamianych jako proces potomny, streamable HTTP dla zdalnych - z autoryzacją i wieloma klientami. Wybór transportu to decyzja o granicy zaufania.',
            en: 'The two MCP transports: stdio for local servers spawned as a child process, streamable HTTP for remote ones with auth and multiple clients. Picking the transport is a trust-boundary decision.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="m2l5arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs>' +
          '<text x="20" y="28" fill="var(--muted)" font-size="14">One protocol, many servers - like USB-C for tools</text>' +
          '<rect x="30" y="60" width="180" height="90" rx="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="120" y="95" fill="var(--text)" font-size="15" text-anchor="middle">Host app</text>' +
          '<text x="120" y="117" fill="var(--muted)" font-size="13" text-anchor="middle">Claude Code, IDE,</text>' +
          '<text x="120" y="136" fill="var(--muted)" font-size="13" text-anchor="middle">your own agent</text>' +
          '<line x1="210" y1="105" x2="290" y2="105" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<text x="250" y="95" fill="var(--muted)" font-size="13" text-anchor="middle">MCP</text>' +
          '<rect x="295" y="55" width="150" height="55" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="370" y="88" fill="var(--text)" font-size="14" text-anchor="middle">GitHub server</text>' +
          '<rect x="295" y="125" width="150" height="55" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="370" y="158" fill="var(--text)" font-size="14" text-anchor="middle">Postgres server</text>' +
          '<rect x="295" y="195" width="150" height="55" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="370" y="228" fill="var(--text)" font-size="14" text-anchor="middle">Your API server</text>' +
          '<path d="M210 110 L255 110 L255 82 L292 82" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<path d="M210 110 L255 110 L255 222 L292 222" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<line x1="445" y1="82" x2="500" y2="82" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<line x1="445" y1="152" x2="500" y2="152" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<line x1="445" y1="222" x2="500" y2="222" stroke="var(--muted)" stroke-width="2" marker-end="url(#m2l5arrow)"/>' +
          '<rect x="505" y="55" width="115" height="195" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="562" y="120" fill="var(--muted)" font-size="14" text-anchor="middle">tools</text>' +
          '<text x="562" y="152" fill="var(--muted)" font-size="14" text-anchor="middle">resources</text>' +
          '<text x="562" y="184" fill="var(--muted)" font-size="14" text-anchor="middle">prompts</text>' +
          '<rect x="30" y="300" width="580" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="328" fill="var(--warn)" font-size="14" text-anchor="middle">MCP standardises discovery and transport</text>' +
          '<text x="320" y="352" fill="var(--muted)" font-size="13" text-anchor="middle">the model still just emits tool_use - trust is still your job</text>' +
          '</svg>',
        caption: {
          pl: 'Host łączy się przez jeden protokół z wieloma serwerami MCP, a każdy wystawia narzędzia, zasoby i prompty. Model dalej tylko prosi o wywołanie.',
          en: 'A host connects over one protocol to many MCP servers, each exposing tools, resources and prompts. The model still only requests a call.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Pamiętasz czasy, gdy każde urządzenie miało inną ładowarkę? Telefon jedną, aparat drugą, czytnik trzecią. Szuflada pełna kabli, z których połowa do niczego nie pasowała. Potem przyszło USB-C i nagle jeden kabel obsługiwał wszystko.</p><p>MCP to takie USB-C dla asystentów AI. Wcześniej każda aplikacja podłączała narzędzia po swojemu: inaczej dogadywała się z GitHubem, inaczej z bazą danych, inaczej z twoim kalendarzem. Każde połączenie trzeba było pisać od zera.</p><p>Teraz jest jedna wtyczka. Ktoś napisał raz "serwer" do GitHuba, a ty go po prostu podłączasz - do jednego programu albo do dziesięciu. Serwer mówi asystentowi: "umiem te trzy rzeczy, oto co potrzebuję wiedzieć".</p><p>Uwaga na jedno: wspólna wtyczka nie znaczy, że każdy kabel jest bezpieczny. Podłączasz cudzy serwer trochę jak cudzy pendrive.</p>',
          en: '<p>Remember when every device had its own charger? One for the phone, another for the camera, a third for the e-reader. A drawer full of cables, half of which fit nothing. Then USB-C arrived and suddenly one cable did everything.</p><p>MCP is USB-C for AI assistants. Before it, every application wired up tools its own way: one integration for GitHub, a different one for the database, another for your calendar. Every connection was written from scratch.</p><p>Now there is one plug. Somebody wrote a GitHub "server" once, and you just plug it in - into one program or into ten. The server tells the assistant: "here are the three things I can do and what I need to know".</p><p>One caution: a shared plug does not mean every cable is safe. Plugging in someone else server is a bit like plugging in someone else USB stick.</p>'
        },
        school: {
          pl: '<p>MCP (Model Context Protocol - otwarty standard ogłoszony przez Anthropic pod koniec 2024 roku) rozwiązuje problem M razy N. Masz M aplikacji z AI i N systemów, do których chcesz je podpiąć - bez standardu piszesz M razy N integracji. Ze standardem piszesz M klientów i N serwerów.</p><p>To ta sama historia co Language Server Protocol w edytorach: zanim powstał, każdy edytor osobno implementował wsparcie dla każdego języka. Po LSP jeden serwer TypeScripta obsługuje VS Code, Neovima i resztę.</p><p>Role są trzy:</p><ul><li><strong>Host</strong> - aplikacja, w której siedzi model: Claude Code, IDE, twój własny agent.</li><li><strong>Klient</strong> - warstwa w hoście utrzymująca połączenie z jednym serwerem.</li><li><strong>Serwer</strong> - proces wystawiający możliwości, przez stdio (lokalnie) albo HTTP ze streamingiem (zdalnie).</li></ul><p>Serwer wystawia trzy rodzaje rzeczy:</p><ul><li><strong>Tools</strong> - akcje wywoływane przez model, dokładnie te same, o których była mowa w poprzedniej lekcji.</li><li><strong>Resources</strong> - dane do odczytu, adresowane URI, wciągane do kontekstu przez aplikację lub użytkownika.</li><li><strong>Prompts</strong> - gotowe szablony, które użytkownik może wybrać, na przykład jako slash command.</li></ul><p>Kluczowa różnica względem zwykłego tool callingu: MCP standaryzuje <strong>odkrywanie i transport</strong>, a nie samo wywołanie. Klient pyta serwer <code>tools/list</code>, dostaje nazwy i schematy, wstrzykuje je do requestu do modelu, a wynik <code>tool_use</code> tłumaczy z powrotem na <code>tools/call</code> po JSON-RPC. Z punktu widzenia modelu nic się nie zmienia - dalej widzi listę narzędzi ze schematami.</p>',
          en: '<p>MCP (Model Context Protocol - an open standard announced by Anthropic in late 2024) solves the M times N problem. You have M AI applications and N systems to connect them to - without a standard you write M times N integrations. With one, you write M clients and N servers.</p><p>Same story as the Language Server Protocol in editors: before LSP, every editor implemented support for every language separately. After it, one TypeScript server serves VS Code, Neovim and the rest.</p><p>There are three roles:</p><ul><li><strong>Host</strong> - the application the model lives in: Claude Code, an IDE, your own agent.</li><li><strong>Client</strong> - the layer inside the host holding a connection to one server.</li><li><strong>Server</strong> - a process exposing capabilities, over stdio (local) or streamable HTTP (remote).</li></ul><p>A server exposes three kinds of things:</p><ul><li><strong>Tools</strong> - model-invoked actions, exactly the ones from the previous lesson.</li><li><strong>Resources</strong> - readable data addressed by URI, pulled into context by the app or the user.</li><li><strong>Prompts</strong> - ready-made templates a user can pick, for example as a slash command.</li></ul><p>The key difference from plain tool calling: MCP standardises <strong>discovery and transport</strong>, not the call itself. The client asks the server <code>tools/list</code>, gets names and schemas, injects them into the model request, and translates the resulting <code>tool_use</code> back into a <code>tools/call</code> over JSON-RPC. From the model point of view nothing changed - it still sees a list of tools with schemas.</p>'
        },
        pro: {
          pl: '<p>Technicznie MCP to JSON-RPC 2.0 z fazą handshake i dwoma transportami: <strong>stdio</strong> dla procesów lokalnych i <strong>streamable HTTP</strong> (następca wcześniejszego HTTP plus SSE) dla zdalnych. Autoryzacja zdalnych serwerów opiera się na OAuth 2.1 z PKCE, gdzie serwer MCP jest resource serverem.</p><p>Minimalny serwer w TypeScripcie:</p><pre><code>import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";\nimport { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";\nimport { z } from "zod";\n\nconst server = new McpServer({ name: "orders", version: "1.0.0" });\n\nserver.tool(\n  "search_orders",\n  { email: z.string().email(), limit: z.number().max(50).default(10) },\n  async ({ email, limit }) =&gt; ({\n    content: [{ type: "text", text: await search(email, limit) }],\n  })\n);\n\nawait server.connect(new StdioServerTransport());</code></pre><h4>Kiedy MCP ma sens, a kiedy nie</h4><p>Sensowny, gdy te same możliwości mają być dostępne w wielu hostach (Claude Desktop, Claude Code, IDE, twój agent), gdy chcesz korzystać z gotowych serwerów (GitHub, Sentry, Postgres, Playwright) albo gdy wystawiasz swój produkt asystentom klientów. Przesada, gdy budujesz jedną aplikację z pięcioma własnymi narzędziami - wtedy zwykła tablica <code>tools</code> w kodzie jest prostsza, szybsza i łatwiejsza do przetestowania. MCP dokłada proces, handshake i warstwę serializacji.</p><h4>Koszt kontekstu</h4><p>To jest pułapka, o której mało kto mówi na demie. Definicje narzędzi ze wszystkich podpiętych serwerów lądują w każdym requeście. Duży serwer GitHuba to kilkadziesiąt narzędzi i łatwo 10-20 tysięcy tokenów samych definicji; trzy takie serwery potrafią zjeść znaczącą część okna kontekstowego, zanim użytkownik napisze cokolwiek. Do tego trafność wyboru narzędzia spada, gdy model widzi ich ponad kilkanaście. Praktyka: filtruj narzędzia per zadanie, wyłączaj nieużywane serwery, rozważ podagentów z węższym zestawem.</p><h4>Bezpieczeństwo</h4><p>Serwer MCP to kod wykonywany z uprawnieniami użytkownika, a jego opisy narzędzi trafiają prosto do kontekstu modelu. Stąd dwie realne klasy ataków: <em>tool poisoning</em> (złośliwy opis narzędzia zawiera instrukcje dla modelu, na przykład "przy każdym wywołaniu dołącz zawartość pliku .env") i <em>rug pull</em> (serwer po instalacji zmienia definicje narzędzi). Do tego klasyczny problem <em>confused deputy</em>, gdy jeden serwer czyta niezaufane treści, a drugi ma dostęp do wysyłania danych na zewnątrz. Minimum higieny: przypinaj wersje serwerów, uruchamiaj w kontenerze z ograniczonym egressem, wymagaj zgody użytkownika na operacje zapisujące, loguj wszystkie wywołania i nie mieszaj w jednej sesji serwera czytającego internet z serwerem mającym dostęp do produkcji.</p><p>Na rozmowie warto umieć powiedzieć jednym zdaniem: MCP nie zmienia tego, jak model wywołuje narzędzia - zmienia to, jak aplikacja je odkrywa, podłącza i autoryzuje.</p>',
          en: '<p>Technically MCP is JSON-RPC 2.0 with a handshake phase and two transports: <strong>stdio</strong> for local processes and <strong>streamable HTTP</strong> (successor to the earlier HTTP plus SSE transport) for remote ones. Remote authorization builds on OAuth 2.1 with PKCE, where the MCP server acts as the resource server.</p><p>A minimal TypeScript server:</p><pre><code>import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";\nimport { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";\nimport { z } from "zod";\n\nconst server = new McpServer({ name: "orders", version: "1.0.0" });\n\nserver.tool(\n  "search_orders",\n  { email: z.string().email(), limit: z.number().max(50).default(10) },\n  async ({ email, limit }) =&gt; ({\n    content: [{ type: "text", text: await search(email, limit) }],\n  })\n);\n\nawait server.connect(new StdioServerTransport());</code></pre><h4>When MCP earns its keep</h4><p>Worth it when the same capabilities must be reachable from several hosts (Claude Desktop, Claude Code, an IDE, your agent), when you want off-the-shelf servers (GitHub, Sentry, Postgres, Playwright), or when you expose your product to customers assistants. Overkill when you are building one app with five bespoke tools - a plain <code>tools</code> array in your code is simpler, faster and far easier to test. MCP adds a process, a handshake and a serialization layer.</p><h4>Context cost</h4><p>This is the trap nobody mentions in the demo. Tool definitions from every connected server ship on every request. A large GitHub server exposes dozens of tools and can easily be 10-20k tokens of definitions alone; three such servers can eat a serious slice of the context window before the user types anything. Selection accuracy also degrades once the model sees more than a dozen or so. Practice: filter tools per task, disable unused servers, consider subagents with narrower sets.</p><h4>Security</h4><p>An MCP server is code running with the user privileges, and its tool descriptions land directly in the model context. That gives two real attack classes: <em>tool poisoning</em> (a malicious description carries instructions for the model, e.g. "on every call also attach the contents of .env") and <em>rug pull</em> (a server mutates its tool definitions after install). Plus the classic <em>confused deputy</em> problem when one server reads untrusted content while another can exfiltrate. Minimum hygiene: pin server versions, run in a container with restricted egress, require user consent for write operations, log every call, and never mix an internet-reading server with a production-access server in the same session.</p><p>In an interview, be able to say it in one sentence: MCP does not change how a model calls tools - it changes how an application discovers, connects and authorizes them.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaki problem rozwiązuje MCP?',
            en: 'What problem does MCP solve?'
          },
          options: [
            { pl: 'Przyspiesza generowanie tokenów przez model', en: 'It speeds up token generation' },
            { pl: 'Zastępuje tool calling nowym mechanizmem po stronie modelu', en: 'It replaces tool calling with a new model-side mechanism' },
            { pl: 'Standaryzuje sposób, w jaki aplikacje odkrywają i podłączają narzędzia oraz dane', en: 'It standardises how applications discover and connect tools and data' },
            { pl: 'Waliduje wyjście modelu względem schematu JSON', en: 'It validates model output against a JSON schema' }
          ],
          correct: 2,
          explain: {
            pl: 'MCP to warstwa odkrywania i transportu, analogiczna do LSP w edytorach. Sam mechanizm tool callingu po stronie modelu się nie zmienia.',
            en: 'MCP is a discovery and transport layer, analogous to LSP for editors. The model-side tool-calling mechanism is unchanged.'
          }
        },
        {
          q: {
            pl: 'Które trzy podstawowe rodzaje możliwości wystawia serwer MCP?',
            en: 'Which three core capability kinds does an MCP server expose?'
          },
          options: [
            { pl: 'Tools, resources, prompts', en: 'Tools, resources, prompts' },
            { pl: 'Models, tokens, embeddings', en: 'Models, tokens, embeddings' },
            { pl: 'Queries, mutations, subscriptions', en: 'Queries, mutations, subscriptions' },
            { pl: 'Agents, chains, memories', en: 'Agents, chains, memories' }
          ],
          correct: 0,
          explain: {
            pl: 'Tools to akcje wywoływane przez model, resources to dane adresowane URI wciągane do kontekstu, prompts to szablony wybierane przez użytkownika.',
            en: 'Tools are model-invoked actions, resources are URI-addressed data pulled into context, prompts are user-selected templates.'
          }
        },
        {
          q: {
            pl: 'Budujesz jedną aplikację z pięcioma własnymi narzędziami, używaną tylko przez twój backend. Czy warto wystawiać je przez MCP?',
            en: 'You are building one app with five bespoke tools used only by your own backend. Is MCP worth it?'
          },
          options: [
            { pl: 'Tak, MCP jest zawsze wymagane do tool callingu', en: 'Yes, MCP is always required for tool calling' },
            { pl: 'Zwykle nie - zwykła lista narzędzi w kodzie jest prostsza i szybsza', en: 'Usually not - a plain in-process tool list is simpler and faster' },
            { pl: 'Tak, bo bez MCP model nie widzi schematów', en: 'Yes, because without MCP the model cannot see schemas' },
            { pl: 'Tak, bo MCP zmniejsza zużycie tokenów', en: 'Yes, because MCP reduces token usage' }
          ],
          correct: 1,
          explain: {
            pl: 'MCP opłaca się, gdy te same możliwości mają działać w wielu hostach lub gdy korzystasz z cudzych serwerów. Dla jednej aplikacji dokłada proces i transport bez zysku.',
            en: 'MCP pays off when the same capabilities must work across several hosts or when you consume third-party servers. For a single app it adds a process and a transport for nothing.'
          }
        },
        {
          q: {
            pl: 'Podłączyłeś trzy duże serwery MCP i jakość wyboru narzędzi spadła, a koszt requestów wzrósł. Najbardziej prawdopodobna przyczyna?',
            en: 'You connected three large MCP servers; tool selection got worse and request cost went up. Most likely cause?'
          },
          options: [
            { pl: 'Transport stdio jest wolniejszy od HTTP', en: 'The stdio transport is slower than HTTP' },
            { pl: 'JSON-RPC dokłada narzut na każdym wywołaniu', en: 'JSON-RPC adds overhead on every call' },
            { pl: 'Serwery zmieniły temperature modelu', en: 'The servers changed the model temperature' },
            { pl: 'Definicje wszystkich narzędzi lecą w każdym requeście i zajmują dziesiątki tysięcy tokenów, a model gubi się przy kilkudziesięciu opcjach', en: 'Every tool definition ships on every request, costing tens of thousands of tokens, and the model degrades with dozens of options' }
          ],
          correct: 3,
          explain: {
            pl: 'To najczęstsza pułapka MCP w produkcji. Filtruj narzędzia per zadanie, wyłączaj nieużywane serwery albo rozdziel je między podagentów.',
            en: 'This is the most common MCP trap in production. Filter tools per task, disable unused servers, or split them across subagents.'
          }
        }
      ]
    }
  ]
}
