// Track: Frontend Architecture - Module 02 - Design Systems at Scale
// Plain ES module, no imports. Schema: see SPEC.md ("Content schema").

export default {
  id: 'design-systems-at-scale',
  order: 2,
  icon: '🎨',
  title: {
    pl: 'Design systemy w skali',
    en: 'Design Systems at Scale'
  },
  description: {
    pl: 'Design system jako produkt wewnetrzny: tokeny i theming, projektowanie API komponentow, wersjonowanie i breaking changes, dokumentacja, testy wizualne oraz model governance i kontrybucji.',
    en: 'The design system as an internal product: tokens and theming, component API design, versioning and breaking changes, documentation, visual regression testing, and the governance and contribution model.'
  },
  lessons: [
    // ---------------------------------------------------------------- 1
    {
      id: 'design-tokens-theming',
      title: {
        pl: 'Design tokeny i theming',
        en: 'Design tokens and theming'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Token prymitywny', en: 'Primitive token' },
          def: {
            pl: 'Surowa wartość z palety, na przykład <code>blue-500</code> albo <code>space-4</code>. Warstwa najniższa: komponenty i aplikacje nie sięgają po nią bezpośrednio.',
            en: 'A raw value from the palette, for example <code>blue-500</code> or <code>space-4</code>. The bottom layer: components and apps never reach for it directly.'
          }
        },
        {
          term: { pl: 'Token semantyczny', en: 'Semantic token' },
          def: {
            pl: 'Token nazywający rolę, nie wygląd: <code>color-action</code>, <code>color-text-inverse</code>. To jedyna warstwa, którą realnie widzą aplikacje, i to ona umożliwia theming.',
            en: 'A token that names a role, not a look: <code>color-action</code>, <code>color-text-inverse</code>. It is the only layer apps really see, and the one that makes theming possible.'
          }
        },
        {
          term: { pl: 'Token komponentowy', en: 'Component token' },
          def: {
            pl: 'Token przypisany do jednego komponentu, na przykład <code>button-bg</code> albo <code>card-padding</code>. Daje punkt nadpisania bez otwierania wnętrza komponentu.',
            en: 'A token scoped to one component, such as <code>button-bg</code> or <code>card-padding</code>. It gives an override point without opening up component internals.'
          }
        },
        {
          term: { pl: 'Style Dictionary', en: 'Style Dictionary' },
          def: {
            pl: 'Narzędzie generujące z jednego źródła w JSON pliki <code>tokens.css</code>, <code>tokens.scss</code>, <code>tokens.ts</code> i wyjścia natywne, dzięki czemu platformy nie rozjeżdżają się w czasie.',
            en: 'A tool that generates <code>tokens.css</code>, <code>tokens.scss</code>, <code>tokens.ts</code> and native outputs from one JSON source, so the platforms cannot drift apart.'
          }
        },
        {
          term: { pl: 'Theming w runtime', en: 'Runtime theming' },
          def: {
            pl: 'Przełączanie motywu bez przebudowy, przez CSS custom properties i atrybut w rodzaju <code>[data-theme="dark"]</code>. Wariant build-time daje mniejszy CSS, ale nie zmieni motywu w locie.',
            en: 'Switching themes with no rebuild, via CSS custom properties and an attribute such as <code>[data-theme="dark"]</code>. The build-time variant ships less CSS but cannot switch on the fly.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa2l1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">One source of truth, many build targets</text>' +
          '<rect x="20" y="46" width="170" height="86" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="105" y="78" fill="var(--text)" font-size="15" text-anchor="middle">Figma variables</text>' +
          '<text x="105" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">Tokens Studio</text>' +
          '<text x="105" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">export on merge</text>' +
          '<line x1="190" y1="89" x2="243" y2="89" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l1a)"/>' +
          '<rect x="248" y="46" width="160" height="86" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="328" y="78" fill="var(--text)" font-size="15" text-anchor="middle">tokens.json</text>' +
          '<text x="328" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">W3C DTCG</text>' +
          '<text x="328" y="120" fill="var(--muted)" font-size="13" text-anchor="middle">reviewed in PR</text>' +
          '<line x1="408" y1="89" x2="461" y2="89" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l1a)"/>' +
          '<rect x="466" y="46" width="154" height="86" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="543" y="80" fill="var(--text)" font-size="15" text-anchor="middle">Style Dictionary</text>' +
          '<text x="543" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">transforms</text>' +
          '<line x1="543" y1="132" x2="543" y2="176" stroke="var(--accent2)" stroke-width="2"/>' +
          '<line x1="140" y1="176" x2="543" y2="176" stroke="var(--accent2)" stroke-width="2"/>' +
          '<line x1="140" y1="176" x2="140" y2="216" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2l1a)"/>' +
          '<line x1="320" y1="176" x2="320" y2="216" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2l1a)"/>' +
          '<line x1="500" y1="176" x2="500" y2="216" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2l1a)"/>' +
          '<rect x="50" y="220" width="180" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="140" y="248" fill="var(--text)" font-size="14" text-anchor="middle">CSS custom props</text>' +
          '<text x="140" y="270" fill="var(--muted)" font-size="13" text-anchor="middle">web, runtime theming</text>' +
          '<rect x="230" y="300" width="180" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="328" fill="var(--text)" font-size="14" text-anchor="middle">TS constants</text>' +
          '<text x="320" y="350" fill="var(--muted)" font-size="13" text-anchor="middle">typed, autocompleted</text>' +
          '<rect x="410" y="220" width="180" height="66" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="500" y="248" fill="var(--text)" font-size="14" text-anchor="middle">iOS + Android</text>' +
          '<text x="500" y="270" fill="var(--muted)" font-size="13" text-anchor="middle">same values</text>' +
          '</svg>',
        caption: {
          pl: 'Jedno zrodlo prawdy dla tokenow, wiele wyjsc budowanych automatycznie - web, natywne platformy i typowane stale.',
          en: 'One source of truth for tokens, many automatically built outputs - web, native platforms and typed constants.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Trzy warstwy tokenow i to, co realnie sie zmienia przy podmianie marki i trybu ciemnego.',
          en: 'The three token layers and what actually changes when you swap brand and dark mode.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Token layers - brand A, light</text>' +
              '<rect x="20" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--accent)" font-size="15" text-anchor="middle">1. Primitive</text>' +
              '<text x="110" y="112" fill="var(--text)" font-size="13" text-anchor="middle">blue-500 #0b5fff</text>' +
              '<text x="110" y="140" fill="var(--text)" font-size="13" text-anchor="middle">grey-900 #101114</text>' +
              '<text x="110" y="168" fill="var(--text)" font-size="13" text-anchor="middle">grey-000 #ffffff</text>' +
              '<text x="110" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-4 16px</text>' +
              '<text x="110" y="232" fill="var(--muted)" font-size="13" text-anchor="middle">raw palette</text>' +
              '<text x="110" y="254" fill="var(--muted)" font-size="13" text-anchor="middle">no meaning</text>' +
              '<rect x="230" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="78" fill="var(--text)" font-size="15" text-anchor="middle">2. Semantic</text>' +
              '<text x="320" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">color-action</text>' +
              '<text x="320" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">color-text</text>' +
              '<text x="320" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">color-surface</text>' +
              '<text x="320" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-md</text>' +
              '<rect x="440" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--text)" font-size="15" text-anchor="middle">3. Component</text>' +
              '<text x="530" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">button-bg</text>' +
              '<text x="530" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">button-text</text>' +
              '<text x="530" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">card-padding</text>' +
              '<text x="320" y="384" fill="var(--muted)" font-size="13" text-anchor="middle">apps only ever read layer 2 and 3</text>' +
              '</svg>',
            label: { pl: 'Trzy warstwy', en: 'Three layers' },
            note: {
              pl: 'Warstwa 1 to surowa paleta bez znaczenia. Aplikacje jej nie dotykaja - czytaja tylko warstwe semantyczna i komponentowa.',
              en: 'Layer 1 is a raw palette with no meaning. Apps never touch it - they only read the semantic and component layers.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="fa2i1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent2)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Token layers - references wired</text>' +
              '<rect x="20" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--text)" font-size="15" text-anchor="middle">1. Primitive</text>' +
              '<text x="110" y="112" fill="var(--text)" font-size="13" text-anchor="middle">blue-500 #0b5fff</text>' +
              '<text x="110" y="140" fill="var(--text)" font-size="13" text-anchor="middle">grey-900 #101114</text>' +
              '<text x="110" y="168" fill="var(--text)" font-size="13" text-anchor="middle">grey-000 #ffffff</text>' +
              '<text x="110" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-4 16px</text>' +
              '<rect x="230" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="78" fill="var(--accent2)" font-size="15" text-anchor="middle">2. Semantic</text>' +
              '<text x="320" y="112" fill="var(--text)" font-size="13" text-anchor="middle">color-action</text>' +
              '<text x="320" y="140" fill="var(--text)" font-size="13" text-anchor="middle">color-text</text>' +
              '<text x="320" y="168" fill="var(--text)" font-size="13" text-anchor="middle">color-surface</text>' +
              '<text x="320" y="196" fill="var(--text)" font-size="13" text-anchor="middle">space-md</text>' +
              '<rect x="440" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--accent2)" font-size="15" text-anchor="middle">3. Component</text>' +
              '<text x="530" y="112" fill="var(--text)" font-size="13" text-anchor="middle">button-bg</text>' +
              '<text x="530" y="140" fill="var(--text)" font-size="13" text-anchor="middle">button-text</text>' +
              '<text x="530" y="168" fill="var(--text)" font-size="13" text-anchor="middle">card-padding</text>' +
              '<line x1="200" y1="112" x2="226" y2="112" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1b)"/>' +
              '<line x1="200" y1="140" x2="226" y2="140" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1b)"/>' +
              '<line x1="200" y1="168" x2="226" y2="168" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1b)"/>' +
              '<line x1="410" y1="112" x2="436" y2="112" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1b)"/>' +
              '<line x1="410" y1="140" x2="436" y2="140" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1b)"/>' +
              '<text x="320" y="384" fill="var(--muted)" font-size="13" text-anchor="middle">button-bg -&gt; color-action -&gt; blue-500</text>' +
              '</svg>',
            label: { pl: 'Referencje', en: 'References' },
            note: {
              pl: 'Kazdy token wyzszej warstwy wskazuje na nizsza. Zaden komponent nie ma zaszytego hexa - to jest cala sztuczka.',
              en: 'Every higher-layer token points at a lower one. No component hardcodes a hex value - that is the whole trick.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="fa2i1c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent2)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--warn)" font-size="14">Brand B - only layer 1 changes</text>' +
              '<rect x="20" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--warn)" font-size="15" text-anchor="middle">1. Primitive</text>' +
              '<text x="110" y="112" fill="var(--warn)" font-size="13" text-anchor="middle">purple-500 #6c2bd9</text>' +
              '<text x="110" y="140" fill="var(--text)" font-size="13" text-anchor="middle">grey-900 #101114</text>' +
              '<text x="110" y="168" fill="var(--text)" font-size="13" text-anchor="middle">grey-000 #ffffff</text>' +
              '<text x="110" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-4 16px</text>' +
              '<rect x="230" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="78" fill="var(--text)" font-size="15" text-anchor="middle">2. Semantic</text>' +
              '<text x="320" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">color-action</text>' +
              '<text x="320" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">color-text</text>' +
              '<text x="320" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">color-surface</text>' +
              '<text x="320" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-md</text>' +
              '<text x="320" y="240" fill="var(--ok)" font-size="13" text-anchor="middle">unchanged</text>' +
              '<rect x="440" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--text)" font-size="15" text-anchor="middle">3. Component</text>' +
              '<text x="530" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">button-bg</text>' +
              '<text x="530" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">button-text</text>' +
              '<text x="530" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">card-padding</text>' +
              '<text x="530" y="240" fill="var(--ok)" font-size="13" text-anchor="middle">unchanged</text>' +
              '<line x1="200" y1="112" x2="226" y2="112" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1c)"/>' +
              '<line x1="410" y1="112" x2="436" y2="112" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1c)"/>' +
              '<text x="320" y="384" fill="var(--muted)" font-size="13" text-anchor="middle">one file swapped, 40 apps rebranded</text>' +
              '</svg>',
            label: { pl: 'Podmiana marki', en: 'Brand swap' },
            note: {
              pl: 'Druga marka to podmiana jednego pliku palety. Warstwy 2 i 3 sie nie ruszaja, wiec zero zmian w aplikacjach.',
              en: 'A second brand is one palette file swapped. Layers 2 and 3 do not move, so consuming apps change nothing.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<defs><marker id="fa2i1d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent2)"/></marker></defs>' +
              '<text x="20" y="28" fill="var(--accent)" font-size="14">Dark mode - only layer 2 remaps</text>' +
              '<rect x="20" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--text)" font-size="15" text-anchor="middle">1. Primitive</text>' +
              '<text x="110" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">purple-500</text>' +
              '<text x="110" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">grey-900</text>' +
              '<text x="110" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">grey-000</text>' +
              '<text x="110" y="240" fill="var(--ok)" font-size="13" text-anchor="middle">same palette</text>' +
              '<rect x="230" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="78" fill="var(--accent)" font-size="15" text-anchor="middle">2. Semantic</text>' +
              '<text x="320" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">color-action</text>' +
              '<text x="320" y="140" fill="var(--accent)" font-size="13" text-anchor="middle">color-text = grey-000</text>' +
              '<text x="320" y="168" fill="var(--accent)" font-size="13" text-anchor="middle">color-surface = grey-900</text>' +
              '<text x="320" y="196" fill="var(--muted)" font-size="13" text-anchor="middle">space-md</text>' +
              '<rect x="440" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--text)" font-size="15" text-anchor="middle">3. Component</text>' +
              '<text x="530" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">button-bg</text>' +
              '<text x="530" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">button-text</text>' +
              '<text x="530" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">card-padding</text>' +
              '<text x="530" y="240" fill="var(--ok)" font-size="13" text-anchor="middle">unchanged</text>' +
              '<line x1="200" y1="140" x2="226" y2="140" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1d)"/>' +
              '<line x1="410" y1="140" x2="436" y2="140" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2i1d)"/>' +
              '<text x="320" y="384" fill="var(--muted)" font-size="13" text-anchor="middle">text and surface trade places</text>' +
              '</svg>',
            label: { pl: 'Tryb ciemny', en: 'Dark mode' },
            note: {
              pl: 'Ciemny motyw to inne mapowanie warstwy semantycznej na te sama palete. Tekst i tlo zamieniaja sie miejscami.',
              en: 'Dark mode is a different mapping of the semantic layer onto the same palette. Text and surface trade places.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--err)" font-size="14">Anti-pattern - app reaches into layer 1</text>' +
              '<rect x="20" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="110" y="78" fill="var(--err)" font-size="15" text-anchor="middle">1. Primitive</text>' +
              '<text x="110" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">purple-500</text>' +
              '<text x="110" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">grey-900</text>' +
              '<text x="110" y="168" fill="var(--muted)" font-size="13" text-anchor="middle">grey-000</text>' +
              '<rect x="230" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="320" y="78" fill="var(--text)" font-size="15" text-anchor="middle">2. Semantic</text>' +
              '<text x="320" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">color-action</text>' +
              '<text x="320" y="140" fill="var(--muted)" font-size="13" text-anchor="middle">color-text</text>' +
              '<rect x="440" y="50" width="180" height="300" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<text x="530" y="78" fill="var(--text)" font-size="15" text-anchor="middle">3. Component</text>' +
              '<text x="530" y="112" fill="var(--muted)" font-size="13" text-anchor="middle">button-bg</text>' +
              '<rect x="230" y="252" width="390" height="86" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="425" y="282" fill="var(--err)" font-size="14" text-anchor="middle">Billing app CSS</text>' +
              '<text x="425" y="306" fill="var(--muted)" font-size="13" text-anchor="middle">color: var(--purple-500)</text>' +
              '<text x="425" y="328" fill="var(--muted)" font-size="13" text-anchor="middle">bypasses both layers</text>' +
              '<line x1="230" y1="295" x2="130" y2="200" stroke="var(--err)" stroke-width="2" stroke-dasharray="6 5"/>' +
              '<text x="320" y="384" fill="var(--muted)" font-size="13" text-anchor="middle">next rebrand: this app breaks alone</text>' +
              '</svg>',
            label: { pl: 'Antywzorzec', en: 'Anti-pattern' },
            note: {
              pl: 'Aplikacja siegajaca po prymityw omija cala abstrakcje. Przy nastepnym rebrandingu tylko ona zostanie w starych kolorach.',
              en: 'An app reaching for a primitive bypasses the whole abstraction. At the next rebrand it is the one screen left in the old colours.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze masz wielkie pudlo kredek i rysujesz plakaty dla calej szkoly. Gdyby kazdy nauczyciel sam wybieral kredki, plakaty wygladalyby jak z pieciu roznych szkol.</p>' +
            '<p>Wiec robisz cos sprytnego. Na kredkach naklejasz karteczki z rolami: <strong>kolor przyciskow</strong>, <strong>kolor tekstu</strong>, <strong>kolor ostrzezen</strong>. Od teraz nikt nie mowi "wez ten fioletowy", tylko "wez kredke od przyciskow".</p>' +
            '<p>Magia zaczyna sie, gdy dyrektor mowi: od jutra szkola jest zielona. Nie musisz przerabiac stu plakatow. Przeklejasz karteczke "kolor przyciskow" na zielona kredke i wszystkie plakaty robia sie zielone same z siebie.</p>' +
            '<p>Karteczki to wlasnie <strong>tokeny</strong> (male nazwane etykiety na wartosciach). A gdy ktos podglada pod karteczke i pisze "fioletowy" na sztywno, jego plakat po zmianie zostanie jedyny fioletowy - i wszyscy zobacza, ze oszukiwal.</p>',
          en: '<p>Imagine you have a giant box of crayons and you draw posters for the whole school. If every teacher picked their own crayon, the posters would look like they came from five different schools.</p>' +
            '<p>So you do something clever. You stick little labels on the crayons with roles on them: <strong>button colour</strong>, <strong>text colour</strong>, <strong>warning colour</strong>. From now on nobody says "grab the purple one", they say "grab the button crayon".</p>' +
            '<p>The magic shows up when the head teacher announces: from tomorrow the school is green. You do not redraw a hundred posters. You move the "button colour" label onto a green crayon and every poster turns green by itself.</p>' +
            '<p>Those labels are <strong>tokens</strong> (small named tags stuck on values). And when somebody peeks under the label and writes "purple" by hand, their poster stays purple after the change - and everyone can see who cheated.</p>'
        },
        school: {
          pl: '<p>Design token to nazwana wartosc projektowa: kolor, odstep, promien, cien, rozmiar czcionki. Zamiast <code>#0b5fff</code> w kodzie masz <code>--chi-color-action</code>. Dla frontendowca to dokladnie to samo, co wyciagniecie magic numbers do stalych - tylko ze stale sa wspoldzielone przez cala firme.</p>' +
            '<p>W dojrzalym systemie tokeny sa <strong>trzywarstwowe</strong>:</p>' +
            '<ul>' +
            '<li><strong>Prymitywy</strong> - surowa paleta: <code>blue-500</code>, <code>space-4</code>. Bez znaczenia biznesowego.</li>' +
            '<li><strong>Semantyczne</strong> - rola: <code>color-action</code>, <code>color-text-inverse</code>, <code>space-md</code>. To jest publiczne API dla aplikacji.</li>' +
            '<li><strong>Komponentowe</strong> - <code>button-bg</code>, <code>card-padding</code>. Punkt zaczepienia dla wyjatkow.</li>' +
            '</ul>' +
            '<p>Warstwy pozwalaja robic theming przez podmiane, a nie przez przepisywanie. Nowa marka? Zmieniasz prymitywy. Dark mode? Przemapowujesz warstwe semantyczna na te sama palete. Aplikacje nie zmieniaja ani linijki, bo caly czas czytaja te same nazwy semantyczne.</p>' +
            '<p>Na webie tokeny lezą najczesciej w CSS custom properties, bo dziedzicza sie w dol drzewa i pozwalaja przelaczyc motyw w runtime jednym atrybutem:</p>' +
            '<pre><code>:root { --color-action: var(--blue-500); }\n[data-theme="dark"] { --color-surface: var(--grey-900); }\n.btn { background: var(--color-action); }</code></pre>' +
            '<p>Zrodlem prawdy jest zwykle plik JSON w formacie W3C DTCG, eksportowany z Figmy (Tokens Studio) i przepuszczany przez Style Dictionary, ktore generuje CSS, Sass, TypeScript i pliki dla iOS oraz Androida z tych samych danych. Dzieki temu projektant i inzynier nie dyskutuja juz o tym, czy odstep ma szesnascie czy osiemnascie pikseli - dyskutuja o tym, ktory token jest tu wlasciwy, a to zupelnie inna rozmowa.</p>' +
            '<p>Ostatnia rzecz, ktora warto sobie od razu ustalic: tokeny to nie tylko kolory. Odstepy, promienie, cienie, wysokosci linii, czasy animacji i punkty zalamania siatki tez sa tokenami. Kolory sa najbardziej widoczne, ale to spójna skala odstepow decyduje o tym, czy dwa ekrany zrobione przez rozne zespoly wygladaja jak jeden produkt.</p>',
          en: '<p>A design token is a named design value: a colour, spacing step, radius, shadow, font size. Instead of <code>#0b5fff</code> in code you have <code>--chi-color-action</code>. For a frontend engineer this is exactly the same move as extracting magic numbers into constants - except the constants are shared by the whole company.</p>' +
            '<p>In a mature system tokens come in <strong>three layers</strong>:</p>' +
            '<ul>' +
            '<li><strong>Primitives</strong> - the raw palette: <code>blue-500</code>, <code>space-4</code>. No business meaning.</li>' +
            '<li><strong>Semantic</strong> - the role: <code>color-action</code>, <code>color-text-inverse</code>, <code>space-md</code>. This is the public API for apps.</li>' +
            '<li><strong>Component</strong> - <code>button-bg</code>, <code>card-padding</code>. The hook for controlled exceptions.</li>' +
            '</ul>' +
            '<p>Layers let you theme by substitution rather than rewriting. New brand? Change the primitives. Dark mode? Remap the semantic layer onto the same palette. Consuming apps do not change a line, because they keep reading the same semantic names.</p>' +
            '<p>On the web tokens usually live in CSS custom properties, because they inherit down the tree and let you flip a theme at runtime with one attribute:</p>' +
            '<pre><code>:root { --color-action: var(--blue-500); }\n[data-theme="dark"] { --color-surface: var(--grey-900); }\n.btn { background: var(--color-action); }</code></pre>' +
            '<p>The source of truth is typically a JSON file in the W3C DTCG format, exported from Figma (Tokens Studio) and run through Style Dictionary, which generates CSS, Sass, TypeScript and iOS plus Android files from the same data.</p>'
        },
        pro: {
          pl: '<p>W skali telco tokeny przestaja byc kwestia estetyki, a staja sie <strong>kontraktem API</strong>. Typowy system ma 300-600 prymitywow, 150-300 tokenow semantycznych i kilkaset komponentowych. Kazda nazwa semantyczna, ktora wyeksportujesz, jest publiczna na lata - usuniecie jej to breaking change dla 40-80 aplikacji.</p>' +
            '<h4>Pipeline</h4>' +
            '<p>Figma variables lub Tokens Studio eksportuja JSON w formacie DTCG do repozytorium tokenow. PR z tym plikiem jest recenzowany tak jak kod. Style Dictionary (albo Terrazzo) robi transformacje i wypluwa artefakty: <code>tokens.css</code>, <code>tokens.scss</code>, <code>tokens.ts</code>, pliki dla natywnych. Publikacja idzie przez changesets do npm, wersjonowana semver.</p>' +
            '<pre><code>// style-dictionary.config.js\nexport default {\n  source: ["tokens/**/*.json"],\n  platforms: {\n    css: {\n      transformGroup: "css",\n      files: [{\n        destination: "tokens.css",\n        format: "css/variables",\n        options: { outputReferences: true }\n      }]\n    }\n  }\n};</code></pre>' +
            '<p><code>outputReferences: true</code> jest kluczowe: zachowuje <code>var(--blue-500)</code> zamiast splaszczac do hexa, dzieki czemu runtime theming w ogole dziala.</p>' +
            '<h4>Decyzje, ktore realnie bola</h4>' +
            '<ul>' +
            '<li><strong>Runtime vs build-time.</strong> CSS custom properties daja przelaczanie motywu bez rebuildu i dzialaja przez Shadow DOM (przenikaja granice, w przeciwienstwie do zwyklych stylow). Koszt: brak type-safety i minimalny narzut na recalc styli przy bardzo duzych drzewach. Build-time (Sass, vanilla-extract) daje mniejszy CSS, ale kazda marka to osobny bundle - przy 6 markach to 6 razy wiecej artefaktow.</li>' +
            '<li><strong>Nazewnictwo.</strong> Wzorzec <code>[prefix]-[kategoria]-[rola]-[wariant]-[stan]</code>. Nazwy semantyczne nie moga zawierac koloru (<code>color-action</code>, nigdy <code>color-blue-button</code>), bo przy rebrandingu nazwa klamie.</li>' +
            '<li><strong>Kontrast jako test.</strong> Kazda para tekst/tlo w warstwie semantycznej powinna miec test WCAG AA w CI. Przy szesciu markach recznie tego nie upilnujesz.</li>' +
            '</ul>' +
            '<h4>Egzekwowanie</h4>' +
            '<p>Warto tez zaplanowac migracje z dnia zero. Wprowadzenie warstwy semantycznej do systemu, ktory jej nie mial, to setki podmian w kilkudziesieciu repozytoriach - realnie robi sie to codemodem na CSS plus mapa starych nazw na nowe, utrzymywana jako alias przez jeden pelny cykl wydawniczy. Aliasy trzeba potem usunac, inaczej po dwoch latach masz dwa rownolegle slowniki i nikt nie wie, ktory jest obowiazujacy.</p>' +
            '<p>Sam token nikogo nie powstrzyma przed wpisaniem hexa. Potrzebujesz <code>stylelint-declaration-strict-value</code> albo wlasnej reguly ESLint w pipeline aplikacji, plus okresowego skanu repozytoriow (prosty grep po <code>#[0-9a-f]{6}</code> w PR-ach). Metryka dojrzalosci, ktora warto raportowac zarzadowi: procent deklaracji kolorow uzywajacych tokenow. Realistyczny cel to 90-95 procent, nie 100 - zawsze zostaje ilustracja i wykres.</p>',
          en: '<p>At telco scale tokens stop being an aesthetics question and become an <strong>API contract</strong>. A typical system carries 300-600 primitives, 150-300 semantic tokens and a few hundred component ones. Every semantic name you export is public for years - removing one is a breaking change for 40-80 applications.</p>' +
            '<h4>The pipeline</h4>' +
            '<p>Figma variables or Tokens Studio export DTCG JSON into a tokens repository. The PR carrying that file is reviewed like code. Style Dictionary (or Terrazzo) applies transforms and emits artefacts: <code>tokens.css</code>, <code>tokens.scss</code>, <code>tokens.ts</code>, native files. Publishing runs through changesets to npm, versioned with semver.</p>' +
            '<pre><code>// style-dictionary.config.js\nexport default {\n  source: ["tokens/**/*.json"],\n  platforms: {\n    css: {\n      transformGroup: "css",\n      files: [{\n        destination: "tokens.css",\n        format: "css/variables",\n        options: { outputReferences: true }\n      }]\n    }\n  }\n};</code></pre>' +
            '<p><code>outputReferences: true</code> matters more than it looks: it keeps <code>var(--blue-500)</code> instead of flattening to a hex, which is the only reason runtime theming works at all.</p>' +
            '<h4>Decisions that actually hurt</h4>' +
            '<ul>' +
            '<li><strong>Runtime vs build-time.</strong> CSS custom properties give you theme switching with no rebuild and they pierce Shadow DOM (unlike ordinary styles). The cost is no type safety and a small style-recalc overhead on very large trees. Build-time (Sass, vanilla-extract) ships smaller CSS, but every brand is a separate bundle - with six brands that is six times the artefacts.</li>' +
            '<li><strong>Naming.</strong> Use <code>[prefix]-[category]-[role]-[variant]-[state]</code>. Semantic names must never contain a colour (<code>color-action</code>, never <code>color-blue-button</code>), because after a rebrand the name lies.</li>' +
            '<li><strong>Contrast as a test.</strong> Every text/surface pair in the semantic layer deserves a WCAG AA assertion in CI. Across six brands you will not hold that line by eye.</li>' +
            '</ul>' +
            '<h4>Enforcement</h4>' +
            '<p>A token alone stops nobody from typing a hex. You need <code>stylelint-declaration-strict-value</code> or a house ESLint rule in the app pipelines, plus a periodic scan across repos (a plain grep for <code>#[0-9a-f]{6}</code> in PRs goes a long way). The maturity metric worth reporting upwards: the share of colour declarations that go through tokens. A realistic target is 90-95 percent, not 100 - illustrations and charts always escape.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Po co w ogole warstwa tokenow semantycznych, skoro sa juz prymitywy?',
            en: 'Why have a semantic token layer at all when primitives already exist?'
          },
          options: [
            { pl: 'Zeby zmniejszyc rozmiar pliku CSS', en: 'To reduce the size of the CSS file' },
            { pl: 'Zeby aplikacje zalezaly od roli, a nie od konkretnej wartosci koloru', en: 'So apps depend on a role rather than a concrete colour value' },
            { pl: 'Zeby dizajnerzy mieli wiecej nazw do wyboru', en: 'To give designers more names to choose from' },
            { pl: 'Bo wymaga tego format W3C DTCG', en: 'Because the W3C DTCG format requires it' }
          ],
          correct: 1,
          explain: {
            pl: 'Semantyka to poziom posredni, ktory pozwala podmienic palete bez ruszania kodu aplikacji. Rozmiar CSS wrecz lekko rosnie.',
            en: 'The semantic layer is the indirection that lets you swap the palette without touching app code. CSS size actually grows slightly.'
          }
        },
        {
          q: {
            pl: 'Ktora nazwa tokena jest bledna w warstwie semantycznej?',
            en: 'Which token name is wrong for the semantic layer?'
          },
          options: [
            { pl: 'color-text-inverse', en: 'color-text-inverse' },
            { pl: 'color-feedback-danger', en: 'color-feedback-danger' },
            { pl: 'color-blue-primary-button', en: 'color-blue-primary-button' },
            { pl: 'space-md', en: 'space-md' }
          ],
          correct: 2,
          explain: {
            pl: 'Nazwa semantyczna nie moze zawierac konkretnego koloru - po rebrandingu na fiolet token o nazwie blue bedzie klamal kazdemu, kto go czyta.',
            en: 'A semantic name must not carry a concrete colour - after a rebrand to purple, a token called blue lies to everyone reading it.'
          }
        },
        {
          q: {
            pl: 'Wlaczasz nowa marke. Uzywacie Style Dictionary, ale po zmianie prymitywow motyw nie przelacza sie w runtime - wszystko zostaje w starych kolorach. Co najpewniej jest przyczyna?',
            en: 'You are onboarding a new brand. You use Style Dictionary, but after changing the primitives the theme does not switch at runtime - everything stays in the old colours. What is the likely cause?'
          },
          options: [
            { pl: 'Brakuje outputReferences, wiec wartosci zostaly splaszczone do hexow w czasie budowania', en: 'outputReferences is missing, so values were flattened to hex codes at build time' },
            { pl: 'CSS custom properties nie dziedzicza sie w dol drzewa DOM', en: 'CSS custom properties do not inherit down the DOM tree' },
            { pl: 'Tokeny semantyczne musza byc definiowane w JavaScripcie', en: 'Semantic tokens have to be defined in JavaScript' },
            { pl: 'Format DTCG nie obsluguje wielu marek', en: 'The DTCG format does not support multiple brands' }
          ],
          correct: 0,
          explain: {
            pl: 'Bez outputReferences Style Dictionary rozwija referencje do surowych wartosci, wiec kaskada CSS nie ma juz czego nadpisac.',
            en: 'Without outputReferences, Style Dictionary resolves references down to raw values, so the CSS cascade has nothing left to override.'
          }
        },
        {
          q: {
            pl: 'Zespol produktowy prosi o dodanie tokena color-action-checkout-green, bo ich A/B test pokazal wyzsza konwersje. Najlepsza reakcja architekta?',
            en: 'A product team asks for a color-action-checkout-green token because their A/B test showed higher conversion. Best architect response?'
          },
          options: [
            { pl: 'Dodac token, skoro dane z testu to uzasadniaja', en: 'Add the token, the test data justifies it' },
            { pl: 'Odmowic i kazac uzyc istniejacego color-action', en: 'Refuse and tell them to use the existing color-action' },
            { pl: 'Pozwolic im nadpisac token komponentowy lokalnie i zebrac dowody, zanim cokolwiek trafi do warstwy semantycznej', en: 'Let them override the component token locally and gather evidence before anything enters the semantic layer' },
            { pl: 'Dodac token do warstwy prymitywow, bo tam jest najtaniej', en: 'Add it to the primitive layer, it is cheapest there' }
          ],
          correct: 2,
          explain: {
            pl: 'Warstwa komponentowa istnieje wlasnie po to, by absorbowac wyjatki bez zanieczyszczania publicznego API. Token semantyczny raz wypuszczony zyje latami.',
            en: 'The component layer exists precisely to absorb exceptions without polluting the public API. A semantic token, once shipped, lives for years.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'component-api-design',
      title: {
        pl: 'Projektowanie API komponentow',
        en: 'Component API design'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Wariant jako enum', en: 'Variant as an enum' },
          def: {
            pl: 'Jeden prop <code>variant</code> z zamkniętą listą wartości zamiast zestawu flag boolean. Flagi pozwalają złożyć kombinacje bez sensu, enum tego nie dopuszcza.',
            en: 'One <code>variant</code> prop with a closed set of values instead of a pile of boolean flags. Flags let people assemble meaningless combinations; an enum does not.'
          }
        },
        {
          term: { pl: 'Slot', en: 'Slot' },
          def: {
            pl: 'Miejsce, w które konsument wstawia własną treść (w Reakcie <code>children</code>). Reguła podziału: propsy konfigurują zachowanie, sloty wnoszą treść.',
            en: 'A hole where the consumer puts their own content (<code>children</code> in React). The dividing rule: props configure behaviour, slots carry content.'
          }
        },
        {
          term: { pl: 'Komponent compound', en: 'Compound component' },
          def: {
            pl: 'Złożony komponent wystawiony jako rodzina części (<code>DataTable.Toolbar</code>, <code>DataTable.Pagination</code>). Kompozycja zamiast konfiguracji - właściwa, gdy lista propsów przekracza kilkanaście pozycji.',
            en: 'A complex component exposed as a family of parts (<code>DataTable.Toolbar</code>, <code>DataTable.Pagination</code>). Composition instead of configuration - the right move once the prop list passes a dozen.'
          }
        },
        {
          term: { pl: 'Furtka awaryjna', en: 'Escape hatch' },
          def: {
            pl: 'Kontrolowane wyjście poza API, na przykład <code>::part()</code> w web componentach. Bez niej zespoły robią forka; z nią zostają w systemie, a ty wiesz, co jest nadpisywane.',
            en: 'A controlled way out of the API, for example <code>::part()</code> in web components. Without one teams fork the component; with one they stay in the system and you can see what gets overridden.'
          }
        },
        {
          term: { pl: 'Kontrolowany i niekontrolowany', en: 'Controlled and uncontrolled' },
          def: {
            pl: 'Komponent kontrolowany dostaje stan z zewnątrz (<code>open</code> plus <code>onOpenChange</code>), niekontrolowany trzyma go u siebie (<code>defaultOpen</code>). Dobry komponent obsługuje oba tryby.',
            en: 'A controlled component takes its state from outside (<code>open</code> plus <code>onOpenChange</code>); an uncontrolled one keeps it inside (<code>defaultOpen</code>). A good component supports both.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Two ways to grow a Button</text>' +
          '<rect x="20" y="46" width="280" height="170" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="160" y="74" fill="var(--err)" font-size="15" text-anchor="middle">Boolean explosion</text>' +
          '<text x="160" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">primary secondary danger</text>' +
          '<text x="160" y="126" fill="var(--muted)" font-size="13" text-anchor="middle">ghost outline small large</text>' +
          '<text x="160" y="150" fill="var(--muted)" font-size="13" text-anchor="middle">8 booleans</text>' +
          '<text x="160" y="180" fill="var(--err)" font-size="14" text-anchor="middle">256 combinations</text>' +
          '<text x="160" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">most of them invalid</text>' +
          '<rect x="340" y="46" width="280" height="170" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="480" y="74" fill="var(--ok)" font-size="15" text-anchor="middle">Enums</text>' +
          '<text x="480" y="102" fill="var(--muted)" font-size="13" text-anchor="middle">variant: primary | danger</text>' +
          '<text x="480" y="126" fill="var(--muted)" font-size="13" text-anchor="middle">size: sm | md | lg</text>' +
          '<text x="480" y="150" fill="var(--muted)" font-size="13" text-anchor="middle">2 props</text>' +
          '<text x="480" y="180" fill="var(--ok)" font-size="14" text-anchor="middle">9 combinations</text>' +
          '<text x="480" y="202" fill="var(--muted)" font-size="13" text-anchor="middle">all of them valid</text>' +
          '<rect x="20" y="248" width="600" height="170" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="276" fill="var(--text)" font-size="15" text-anchor="middle">API surface = maintenance debt</text>' +
          '<rect x="44" y="296" width="160" height="46" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="124" y="324" fill="var(--text)" font-size="13" text-anchor="middle">props: config</text>' +
          '<rect x="240" y="296" width="160" height="46" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="324" fill="var(--text)" font-size="13" text-anchor="middle">slots: content</text>' +
          '<rect x="436" y="296" width="160" height="46" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="516" y="324" fill="var(--text)" font-size="13" text-anchor="middle">parts: escape hatch</text>' +
          '<text x="320" y="372" fill="var(--muted)" font-size="13" text-anchor="middle">every prop you add is forever</text>' +
          '<text x="320" y="396" fill="var(--muted)" font-size="13" text-anchor="middle">every prop you remove is a major</text>' +
          '</svg>',
        caption: {
          pl: 'Warianty jako enumy zamiast booleanow, plus jasny podzial: propsy konfiguruja, sloty wnoszą tresc, parts sa furtka awaryjna.',
          en: 'Variants as enums instead of booleans, plus a clear split: props configure, slots carry content, parts are the escape hatch.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Kazdy komponent to jak automat z kawa w biurze. To, co widzisz z zewnatrz - przyciski, otwory, ekranik - to jego API.</p>' +
            '<p>Zly automat ma osiemdziesiat malych przelacznikow. Mocna? Slaba? Duza? Z mlekiem? Z podwojnym mlekiem? Ludzie ustawiaja kombinacje, ktore nie maja sensu, automat mruga i wylewa wode na podloge.</p>' +
            '<p>Dobry automat ma trzy pokretla i kazda pozycja robi cos sensownego. Jest jeszcze male drzwiczki z tylu, na wypadek gdyby ktos naprawde musial zajrzec do srodka - ale wszyscy wiedza, ze to wyjatek, nie normalny sposob uzywania.</p>' +
            '<p>Kiedy dodajesz nowy przelacznik, dodajesz go na zawsze. Ludzie zaczynaja go uzywac, przywiazuja sie i pozniej nie mozesz go zdjac bez awantury. Dlatego kazdy nowy przelacznik trzeba dokladnie przemyslec - latwiej dolozyc pozniej niz zabrac.</p>',
          en: '<p>Every component is like the coffee machine in the office. What you see from the outside - buttons, slots, the little screen - is its API.</p>' +
            '<p>A bad machine has eighty tiny switches. Strong? Weak? Large? With milk? With double milk? People set combinations that make no sense, the machine blinks and pours water on the floor.</p>' +
            '<p>A good machine has three dials and every position does something sensible. There is also a small door at the back, in case somebody genuinely has to reach inside - but everyone knows that is the exception, not the normal way to use it.</p>' +
            '<p>When you add a new switch, you add it forever. People start using it, they get attached, and later you cannot take it away without a fight. So every new switch deserves real thought - adding later is easier than taking away.</p>'
        },
        school: {
          pl: '<p>API komponentu to trzy rzeczy: <strong>propsy</strong> (konfiguracja), <strong>sloty albo children</strong> (tresc) i <strong>zdarzenia</strong> (co komponent zglasza na zewnatrz). Do tego dochodzi czwarta, czesto zapomniana: <strong>furtki</strong>, czyli kontrolowane sposoby na zlamanie zasad.</p>' +
            '<p>Pierwsza zasada: warianty jako enumy, nie boolean. Osiem booleanow to 256 kombinacji, z ktorych sensownych jest osiem:</p>' +
            '<pre><code>// zle\n&lt;Button primary danger small ghost /&gt;\n// dobrze\n&lt;Button variant="danger" size="sm" /&gt;</code></pre>' +
            '<p>Druga zasada: to, co jest trescia, powinno byc slotem, nie propsem. <code>&lt;Modal title="Uwaga" /&gt;</code> wyglada niewinnie, dopoki ktos nie zapyta o ikone w tytule albo o link. Slot rozwiazuje to raz na zawsze i nie wymaga twojej zgody na kazda wariacje.</p>' +
            '<p>Trzecia zasada: kontrolowany i niekontrolowany. Komponent moze trzymac swoj stan sam (<code>defaultOpen</code>) albo oddac go rodzicowi (<code>open</code> plus <code>onOpenChange</code>). Dobre komponenty wspieraja oba tryby, bo aplikacje maja rozne potrzeby.</p>' +
            '<p>Czwarta zasada: dostepnosc jest czescia API. Jesli komponent generuje ID dla <code>aria-describedby</code>, to nie jest szczegol implementacyjny - konsument musi wiedziec, jak podpiac wlasny komunikat bledu.</p>' +
            '<p>Piata zasada: nazwy musza byc spojne miedzy komponentami. Jesli w jednym miejscu masz <code>size="sm"</code>, a w drugim <code>size="small"</code>, kazdy konsument bedzie zgadywal przy kazdym uzyciu. To brzmi jak drobiazg, a jest najczestsza skarga w ankietach wsrod zespolow produktowych.</p>' +
            '<p>Kazdy dodany prop to zobowiazanie na lata. Latwiej dodac prop w wersji minor niz usunac go bez wersji major, wiec domyslna odpowiedz na "dodajcie prop" brzmi: pokaz mi trzy zespoly, ktore tego potrzebuja.</p>',
          en: '<p>A component API is three things: <strong>props</strong> (configuration), <strong>slots or children</strong> (content) and <strong>events</strong> (what the component reports outward). Plus a fourth, frequently forgotten one: <strong>escape hatches</strong>, the controlled ways to break the rules.</p>' +
            '<p>Rule one: variants as enums, not booleans. Eight booleans is 256 combinations, of which eight make sense:</p>' +
            '<pre><code>// bad\n&lt;Button primary danger small ghost /&gt;\n// good\n&lt;Button variant="danger" size="sm" /&gt;</code></pre>' +
            '<p>Rule two: anything that is content should be a slot, not a prop. <code>&lt;Modal title="Warning" /&gt;</code> looks innocent until somebody asks for an icon in the title, or a link. A slot solves that once and does not require your approval for every variation.</p>' +
            '<p>Rule three: controlled and uncontrolled. A component can hold its own state (<code>defaultOpen</code>) or hand it to the parent (<code>open</code> plus <code>onOpenChange</code>). Good components support both, because apps have different needs.</p>' +
            '<p>Rule four: accessibility is part of the API. If the component generates IDs for <code>aria-describedby</code>, that is not an implementation detail - the consumer needs to know how to attach their own error message.</p>' +
            '<p>Every prop you add is a multi-year commitment. Adding a prop in a minor is easy; removing one without a major is not, so the default answer to "please add a prop" is: show me three teams that need it.</p>'
        },
        pro: {
          pl: '<p>Powierzchnia API jest dlugiem. Przy 60 komponentach i 12 propsach srednio masz 720 publicznych punktow, ktore musisz utrzymac, udokumentowac i przetestowac. Kazdy z nich blokuje refaktor wewnetrzny.</p>' +
            '<h4>Podzial odpowiedzialnosci</h4>' +
            '<ul>' +
            '<li><strong>Propsy</strong> - skonczone, walidowalne opcje. Enumy zamiast booleanow. Zadnych propsow typu <code>style</code> ani <code>customCss</code>.</li>' +
            '<li><strong>Sloty</strong> - dowolna tresc. W web componentach nazwane sloty, w Vue scoped slots, w React <code>children</code> plus wzorzec compound.</li>' +
            '<li><strong>Zdarzenia</strong> - nazwane w czasie przeszlym albo jako intencja (<code>chiChange</code>, <code>onOpenChange</code>), z <code>detail</code> zawierajacym dane, nigdy element DOM.</li>' +
            '<li><strong>Furtki</strong> - <code>::part()</code> i <code>::slotted()</code> dla web componentow, klasy warstwowe dla zwyklego CSS. Furtka jest publiczna: jesli wystawisz <code>part="label"</code>, nie mozesz jej pozniej zmienic bez majora.</li>' +
            '</ul>' +
            '<h4>Compound zamiast propsow konfiguracyjnych</h4>' +
            '<pre><code>// wersja z propsami: kazdy nowy przypadek to nowy prop\n&lt;DataTable columns={cols} sortable filterable pagination="bottom" /&gt;\n\n// wersja compound: kompozycja zamiast konfiguracji\n&lt;DataTable&gt;\n  &lt;DataTable.Toolbar&gt;&lt;Filter /&gt;&lt;/DataTable.Toolbar&gt;\n  &lt;DataTable.Body /&gt;\n  &lt;DataTable.Pagination /&gt;\n&lt;/DataTable&gt;</code></pre>' +
            '<p>Compound przenosi zlozonosc do konsumenta, co jest wlasciwe dla komponentow zlozonych (tabela, kombobox) i bledne dla prostych (przycisk, badge). Reguła kciuka: jesli lista propsow przekracza 12 albo pojawia sie prop typu <code>renderX</code>, czas na kompozycje.</p>' +
            '<h4>Praktyki, ktore sie zwracaja</h4>' +
            '<ul>' +
            '<li><strong>Znormalizowane nazwy miedzy komponentami.</strong> Jesli <code>size</code> to <code>sm|md|lg</code> w jednym miejscu, nie moze byc <code>small|medium|large</code> w innym. To najczestsza skarga w ankietach adopcji.</li>' +
            '<li><strong>Test API w CI.</strong> Wygeneruj snapshot publicznego API (na przyklad przez <code>custom-elements.json</code> z Custom Elements Manifest Analyzer albo <code>api-extractor</code> dla TypeScriptu) i traktuj diff jako sygnal do przegladu semver.</li>' +
            '<li><strong>Deprecacja z data.</strong> Prop oznaczony jako deprecated dostaje ostrzezenie w konsoli tylko w buildzie dev, wpis w dokumentacji i konkretna wersje usuniecia. Bez daty deprecacja zyje wiecznie.</li>' +
            '<li><strong>Domyslne wartosci to takze API.</strong> Zmiana domyslnego <code>size</code> z <code>md</code> na <code>lg</code> jest breaking change wizualnym, nawet jesli TypeScript sie nie skarzy.</li>' +
            '</ul>' +
            '<p>Na rozmowie na principala warto umiec powiedziec, czego <strong>nie</strong> wpuszczasz do API i dlaczego - to rozroznia architekta od bardzo szybkiego kontrybutora.</p>',
          en: '<p>API surface is debt. With 60 components and 12 props on average you carry 720 public touchpoints to maintain, document and test. Every one of them blocks an internal refactor.</p>' +
            '<h4>Division of responsibility</h4>' +
            '<ul>' +
            '<li><strong>Props</strong> - finite, validatable options. Enums over booleans. No <code>style</code> or <code>customCss</code> props.</li>' +
            '<li><strong>Slots</strong> - arbitrary content. Named slots in web components, scoped slots in Vue, <code>children</code> plus the compound pattern in React.</li>' +
            '<li><strong>Events</strong> - named in past tense or as intent (<code>chiChange</code>, <code>onOpenChange</code>), with a <code>detail</code> carrying data, never a DOM node.</li>' +
            '<li><strong>Escape hatches</strong> - <code>::part()</code> and <code>::slotted()</code> for web components, layered classes for plain CSS. An escape hatch is public: once you expose <code>part="label"</code> you cannot rename it without a major.</li>' +
            '</ul>' +
            '<h4>Compound instead of configuration props</h4>' +
            '<pre><code>// props version: every new case is a new prop\n&lt;DataTable columns={cols} sortable filterable pagination="bottom" /&gt;\n\n// compound version: composition instead of configuration\n&lt;DataTable&gt;\n  &lt;DataTable.Toolbar&gt;&lt;Filter /&gt;&lt;/DataTable.Toolbar&gt;\n  &lt;DataTable.Body /&gt;\n  &lt;DataTable.Pagination /&gt;\n&lt;/DataTable&gt;</code></pre>' +
            '<p>Compound pushes complexity to the consumer, which is right for complex components (table, combobox) and wrong for simple ones (button, badge). Rule of thumb: when the prop list passes 12, or a <code>renderX</code> prop appears, it is time for composition.</p>' +
            '<h4>Practices that pay for themselves</h4>' +
            '<ul>' +
            '<li><strong>Normalised names across components.</strong> If <code>size</code> is <code>sm|md|lg</code> in one place, it cannot be <code>small|medium|large</code> in another. This is the single most common complaint in adoption surveys.</li>' +
            '<li><strong>An API test in CI.</strong> Generate a snapshot of the public API (for example <code>custom-elements.json</code> via the Custom Elements Manifest Analyzer, or <code>api-extractor</code> for TypeScript) and treat the diff as the trigger for a semver review.</li>' +
            '<li><strong>Deprecation with a date.</strong> A deprecated prop gets a console warning in dev builds only, a docs entry and a named removal version. Without a date, deprecation is permanent.</li>' +
            '<li><strong>Defaults are API too.</strong> Changing the default <code>size</code> from <code>md</code> to <code>lg</code> is a visual breaking change even if TypeScript never complains.</li>' +
            '</ul>' +
            '<p>In a principal-level interview, be ready to say what you <strong>refuse</strong> to let into the API and why - that is what separates an architect from a very fast contributor.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego warianty lepiej modelowac jako enum niz jako zestaw booleanow?',
            en: 'Why model variants as an enum rather than a set of booleans?'
          },
          options: [
            { pl: 'Bo enumy renderuja sie szybciej', en: 'Because enums render faster' },
            { pl: 'Bo booleany pozwalaja wyrazic kombinacje, ktore nie maja sensu', en: 'Because booleans allow combinations that make no sense' },
            { pl: 'Bo TypeScript nie obsluguje wielu booleanow naraz', en: 'Because TypeScript cannot handle several booleans at once' },
            { pl: 'Bo enumy sa wymagane przez standard web components', en: 'Because the web components standard requires enums' }
          ],
          correct: 1,
          explain: {
            pl: 'Enum zamyka przestrzen stanow do tych poprawnych. Osiem booleanow daje 256 kombinacji, ktore trzeba testowac albo cicho ignorowac.',
            en: 'An enum closes the state space to the valid ones. Eight booleans give 256 combinations you must either test or silently ignore.'
          }
        },
        {
          q: {
            pl: 'Zespol prosi o prop title w komponencie Modal, bo tak jest szybciej. Co jest glowna wada tego podejscia?',
            en: 'A team asks for a title prop on the Modal component because it is quicker. What is the main drawback?'
          },
          options: [
            { pl: 'Prop zawsze kosztuje wiecej pamieci niz slot', en: 'A prop always costs more memory than a slot' },
            { pl: 'Kazda przyszla wariacja tytulu (ikona, link, badge) bedzie wymagala kolejnego propa', en: 'Every future title variation (icon, link, badge) will need yet another prop' },
            { pl: 'Propsy tekstowe lamia dostepnosc', en: 'Text props break accessibility' },
            { pl: 'Slot jest jedynym sposobem na przekazanie tekstu', en: 'A slot is the only way to pass text' }
          ],
          correct: 1,
          explain: {
            pl: 'Tresc nalezy do slotow. Prop tekstowy zamyka drzwi i sprawia, ze kazde rozszerzenie musi przejsc przez zespol design systemu.',
            en: 'Content belongs in slots. A text prop closes the door and forces every extension to go through the design system team.'
          }
        },
        {
          q: {
            pl: 'Ktora zmiana NIE wymaga wersji major, mimo ze wyglada groznie?',
            en: 'Which change does NOT require a major version, despite looking scary?'
          },
          options: [
            { pl: 'Zmiana domyslnej wartosci propa size z md na lg', en: 'Changing the default value of the size prop from md to lg' },
            { pl: 'Przepisanie wewnetrznej implementacji z div-ow na CSS grid bez zmiany wyjscia wizualnego i nazw part', en: 'Rewriting the internals from divs to CSS grid with no change to visual output or part names' },
            { pl: 'Zmiana nazwy part z label na text', en: 'Renaming a part from label to text' },
            { pl: 'Usuniecie deprecated propa outlined', en: 'Removing the deprecated outlined prop' }
          ],
          correct: 1,
          explain: {
            pl: 'Publiczne jest to, co obiecales: propsy, zdarzenia, nazwy part i wyglad. Wnetrze mozesz przepisac w patchu, jesli kontrakt zostal nietkniety.',
            en: 'Public means what you promised: props, events, part names and appearance. Internals can be rewritten in a patch as long as the contract is untouched.'
          }
        },
        {
          q: {
            pl: 'Twoj komponent DataTable ma 19 propsow i wlasnie wplynela prosba o dwudziesty (renderEmptyState). Najbardziej architektoniczna odpowiedz?',
            en: 'Your DataTable has 19 props and a request for the twentieth just landed (renderEmptyState). The most architectural response?'
          },
          options: [
            { pl: 'Dodac prop, bo to tylko jeden wiecej', en: 'Add the prop, it is only one more' },
            { pl: 'Odmowic i zasugerowac forka komponentu', en: 'Refuse and suggest forking the component' },
            { pl: 'Przejsc na model compound i wystawic DataTable.Empty jako slot kompozycyjny', en: 'Move to a compound model and expose DataTable.Empty as a compositional slot' },
            { pl: 'Wystawic prop style, zeby zespoly radzily sobie same', en: 'Expose a style prop so teams can sort it out themselves' }
          ],
          correct: 2,
          explain: {
            pl: 'Prop typu renderX to sygnal, ze konfiguracja przestala wystarczac. Kompozycja przenosi elastycznosc do konsumenta bez rozrostu API.',
            en: 'A renderX prop is the signal that configuration has run out. Composition moves flexibility to the consumer without growing the API.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'versioning-and-breaking-changes',
      title: {
        pl: 'Wersjonowanie i breaking changes',
        en: 'Versioning and breaking changes'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'SemVer', en: 'SemVer' },
          def: {
            pl: 'Schemat <code>major.minor.patch</code>: major łamie kontrakt, minor dodaje, patch naprawia. W design systemie kontraktem jest też klasa CSS i nazwa zdarzenia, nie tylko sygnatura TypeScriptu.',
            en: 'The <code>major.minor.patch</code> scheme: major breaks the contract, minor adds, patch fixes. In a design system the contract includes CSS classes and event names, not just TypeScript signatures.'
          }
        },
        {
          term: { pl: 'Breaking change', en: 'Breaking change' },
          def: {
            pl: 'Każda zmiana, po której działający kod konsumenta przestaje działać - także zmiana nazwy klasy CSS, usunięcie slotu albo zmiana domyślnej wartości propa.',
            en: 'Any change after which working consumer code stops working - including renaming a CSS class, removing a slot or changing a default prop value.'
          }
        },
        {
          term: { pl: 'Codemod', en: 'Codemod' },
          def: {
            pl: 'Skrypt, zwykle na bazie jscodeshift, automatycznie przepisujący kod konsumentów na nowe API. Bez niego wersja major jest życzeniem, a nie planem migracji.',
            en: 'A script, usually jscodeshift based, that rewrites consumer code to the new API automatically. Without one a major version is a wish, not a migration plan.'
          }
        },
        {
          term: { pl: 'Okno deprecjacji', en: 'Deprecation window' },
          def: {
            pl: 'Zadeklarowany czas, przez który stare API nadal działa, ale ostrzega. Musi być dłuższy niż cykl wydawniczy najwolniejszej aplikacji, inaczej nikt nie zdąży.',
            en: 'A declared period during which the old API still works but warns. It has to outlast the release cycle of the slowest app, otherwise nobody makes it in time.'
          }
        },
        {
          term: { pl: 'Changesets', en: 'Changesets' },
          def: {
            pl: 'Narzędzie, w którym autor PR-a deklaruje typ zmiany, a bot składa z tego wersję i changelog. Zamienia wersjonowanie z osądu jednej osoby w powtarzalny proces.',
            en: 'A tool where the PR author declares the change type and a bot assembles the version and the changelog. It turns versioning from one person judgement into a repeatable process.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa2l3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">What counts as breaking in a design system</text>' +
          '<rect x="20" y="46" width="290" height="150" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="165" y="74" fill="var(--err)" font-size="15" text-anchor="middle">Major</text>' +
          '<text x="165" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">removed prop or event</text>' +
          '<text x="165" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">renamed CSS class or part</text>' +
          '<text x="165" y="144" fill="var(--muted)" font-size="13" text-anchor="middle">changed DOM structure</text>' +
          '<text x="165" y="166" fill="var(--muted)" font-size="13" text-anchor="middle">visible redesign</text>' +
          '<text x="165" y="188" fill="var(--muted)" font-size="13" text-anchor="middle">new default value</text>' +
          '<rect x="330" y="46" width="290" height="150" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="475" y="74" fill="var(--ok)" font-size="15" text-anchor="middle">Minor / patch</text>' +
          '<text x="475" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">new optional prop</text>' +
          '<text x="475" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">new component</text>' +
          '<text x="475" y="144" fill="var(--muted)" font-size="13" text-anchor="middle">internal rewrite</text>' +
          '<text x="475" y="166" fill="var(--muted)" font-size="13" text-anchor="middle">a11y fix, bug fix</text>' +
          '<text x="475" y="188" fill="var(--muted)" font-size="13" text-anchor="middle">deprecation warning</text>' +
          '<rect x="20" y="232" width="600" height="146" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="260" fill="var(--text)" font-size="15" text-anchor="middle">Migration budget of one major</text>' +
          '<rect x="50" y="282" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="110" y="309" fill="var(--text)" font-size="13" text-anchor="middle">codemod</text>' +
          '<line x1="170" y1="304" x2="203" y2="304" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l3a)"/>' +
          '<rect x="208" y="282" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="268" y="309" fill="var(--text)" font-size="13" text-anchor="middle">guide</text>' +
          '<line x1="328" y1="304" x2="361" y2="304" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l3a)"/>' +
          '<rect x="366" y="282" width="120" height="44" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="426" y="309" fill="var(--text)" font-size="13" text-anchor="middle">office hours</text>' +
          '<line x1="486" y1="304" x2="519" y2="304" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l3a)"/>' +
          '<rect x="524" y="282" width="90" height="44" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="569" y="309" fill="var(--text)" font-size="13" text-anchor="middle">sunset</text>' +
          '<text x="320" y="356" fill="var(--muted)" font-size="13" text-anchor="middle">one major per year is a policy, not an accident</text>' +
          '</svg>',
        caption: {
          pl: 'Semver w design systemie obejmuje takze DOM, klasy CSS i wyglad - a kazdy major potrzebuje budzetu migracyjnego, nie tylko changeloga.',
          en: 'Semver in a design system also covers DOM, CSS classes and appearance - and every major needs a migration budget, not just a changelog.'
        }
      },
      interactive: {
        kind: 'frames',
        caption: {
          pl: 'Zycie jednego breaking change: od dodania nowego API, przez codemod, po wygaszenie starej wersji.',
          en: 'The life of one breaking change: from adding the new API, through the codemod, to sunsetting the old version.'
        },
        frames: [
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--muted)" font-size="14">Step 1 - v2.4.0 additive release</text>' +
              '<line x1="40" y1="120" x2="600" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<circle cx="110" cy="120" r="9" fill="var(--accent)"/>' +
              '<circle cx="250" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="390" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="530" cy="120" r="7" fill="var(--border)"/>' +
              '<text x="110" y="100" fill="var(--accent)" font-size="13" text-anchor="middle">v2.4</text>' +
              '<text x="250" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2.6</text>' +
              '<text x="390" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v3.0</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2 EOL</text>' +
              '<rect x="40" y="160" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
              '<text x="320" y="188" fill="var(--text)" font-size="14" text-anchor="middle">new API ships next to the old one</text>' +
              '<text x="320" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">variant="danger" added, type="error" still works</text>' +
              '<text x="40" y="278" fill="var(--muted)" font-size="13">Adoption of new API</text>' +
              '<rect x="40" y="292" width="560" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="42" y="294" width="28" height="22" rx="7" fill="var(--accent2)"/>' +
              '<text x="320" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">5 percent - only the design system repo itself</text>' +
              '</svg>',
            label: { pl: 'Nowe obok starego', en: 'New beside old' },
            note: {
              pl: 'Breaking change zaczyna sie od wydania nieinwazyjnego: nowe API wchodzi obok starego i nic sie nie psuje.',
              en: 'A breaking change starts with a non-breaking release: the new API lands beside the old one and nothing breaks.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--warn)" font-size="14">Step 2 - v2.6.0 deprecation window opens</text>' +
              '<line x1="40" y1="120" x2="600" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<circle cx="110" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="250" cy="120" r="9" fill="var(--warn)"/>' +
              '<circle cx="390" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="530" cy="120" r="7" fill="var(--border)"/>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2.4</text>' +
              '<text x="250" y="100" fill="var(--warn)" font-size="13" text-anchor="middle">v2.6</text>' +
              '<text x="390" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v3.0</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2 EOL</text>' +
              '<rect x="40" y="160" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
              '<text x="320" y="188" fill="var(--text)" font-size="14" text-anchor="middle">dev-only console warning + docs banner</text>' +
              '<text x="320" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">type is deprecated, removed in v3.0 (Q3)</text>' +
              '<text x="40" y="278" fill="var(--muted)" font-size="13">Adoption of new API</text>' +
              '<rect x="40" y="292" width="560" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="42" y="294" width="128" height="22" rx="7" fill="var(--accent2)"/>' +
              '<text x="320" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">22 percent - early adopters moved on their own</text>' +
              '</svg>',
            label: { pl: 'Okno deprecacji', en: 'Deprecation window' },
            note: {
              pl: 'Ostrzezenie tylko w buildzie dev, z konkretna wersja usuniecia i data. Deprecacja bez daty nigdy sie nie konczy.',
              en: 'Warning in dev builds only, with a concrete removal version and date. Deprecation without a date never ends.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--accent2)" font-size="14">Step 3 - codemod published</text>' +
              '<line x1="40" y1="120" x2="600" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<circle cx="110" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="250" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="320" cy="120" r="9" fill="var(--accent2)"/>' +
              '<circle cx="390" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="530" cy="120" r="7" fill="var(--border)"/>' +
              '<text x="320" y="100" fill="var(--accent2)" font-size="13" text-anchor="middle">codemod</text>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2.4</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2 EOL</text>' +
              '<rect x="40" y="160" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
              '<text x="320" y="188" fill="var(--text)" font-size="14" text-anchor="middle">npx @chi/codemod v3-button-variant</text>' +
              '<text x="320" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">plus bot PRs raised on 40 repos</text>' +
              '<text x="40" y="278" fill="var(--muted)" font-size="13">Adoption of new API</text>' +
              '<rect x="40" y="292" width="560" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="42" y="294" width="392" height="22" rx="7" fill="var(--accent2)"/>' +
              '<text x="320" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">70 percent - the codemod did the boring 90 percent</text>' +
              '</svg>',
            label: { pl: 'Codemod', en: 'Codemod' },
            note: {
              pl: 'Codemod plus automatyczne PR-y na repozytoria konsumentow przenosza koszt migracji z 40 zespolow na jeden.',
              en: 'A codemod plus bot-raised PRs on consumer repos move the migration cost from 40 teams onto one.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--err)" font-size="14">Step 4 - v3.0.0 removal</text>' +
              '<line x1="40" y1="120" x2="600" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<circle cx="110" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="250" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="390" cy="120" r="9" fill="var(--err)"/>' +
              '<circle cx="530" cy="120" r="7" fill="var(--border)"/>' +
              '<text x="390" y="100" fill="var(--err)" font-size="13" text-anchor="middle">v3.0</text>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2.4</text>' +
              '<text x="530" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2 EOL</text>' +
              '<rect x="40" y="160" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
              '<text x="320" y="188" fill="var(--text)" font-size="14" text-anchor="middle">old prop removed, v2 branch enters maintenance</text>' +
              '<text x="320" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">security and critical fixes only, 6 months</text>' +
              '<text x="40" y="278" fill="var(--muted)" font-size="13">Adoption of new API</text>' +
              '<rect x="40" y="292" width="560" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="42" y="294" width="500" height="22" rx="7" fill="var(--accent2)"/>' +
              '<text x="320" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">89 percent - 4 apps still pinned to v2</text>' +
              '</svg>',
            label: { pl: 'Usuniecie w majorze', en: 'Removal in the major' },
            note: {
              pl: 'Major usuwa stare API, ale galaz v2 zyje jeszcze pol roku w trybie utrzymaniowym. To rozniaca sie rzecz od porzucenia.',
              en: 'The major removes the old API, but the v2 branch lives another six months in maintenance mode. That is different from abandonment.'
            }
          },
          {
            svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
              '<text x="20" y="28" fill="var(--ok)" font-size="14">Step 5 - v2 end of life</text>' +
              '<line x1="40" y1="120" x2="600" y2="120" stroke="var(--border)" stroke-width="2"/>' +
              '<circle cx="110" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="250" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="390" cy="120" r="7" fill="var(--border)"/>' +
              '<circle cx="530" cy="120" r="9" fill="var(--ok)"/>' +
              '<text x="530" y="100" fill="var(--ok)" font-size="13" text-anchor="middle">v2 EOL</text>' +
              '<text x="110" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v2.4</text>' +
              '<text x="390" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">v3.0</text>' +
              '<rect x="40" y="160" width="560" height="70" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
              '<text x="320" y="188" fill="var(--text)" font-size="14" text-anchor="middle">one supported major, one codebase to maintain</text>' +
              '<text x="320" y="212" fill="var(--muted)" font-size="13" text-anchor="middle">2 legacy apps carry the risk explicitly</text>' +
              '<text x="40" y="278" fill="var(--muted)" font-size="13">Adoption of new API</text>' +
              '<rect x="40" y="292" width="560" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
              '<rect x="42" y="294" width="540" height="22" rx="7" fill="var(--ok)"/>' +
              '<text x="320" y="348" fill="var(--muted)" font-size="13" text-anchor="middle">97 percent - the long tail is a business decision now</text>' +
              '</svg>',
            label: { pl: 'Koniec wsparcia', en: 'End of life' },
            note: {
              pl: 'Ostatnie kilka procent nigdy nie migruje samo. Na tym etapie to juz decyzja biznesowa o ryzyku, a nie zadanie techniczne.',
              en: 'The last few percent never migrate on their own. At this point it is a business risk decision, not an engineering task.'
            }
          }
        ]
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze wypozyczasz kolegom swoje klocki i wszyscy zbudowali z nich domki. Pewnego dnia stwierdzasz, ze czerwone klocki beda mialy inne zaczepy - lepsze, madrzejsze, twoim zdaniem.</p>' +
            '<p>Jesli po prostu je podmienisz, wszystkie domki sie rozsypia w tej samej sekundzie i pietnascioro dzieci bedzie plakac jednoczesnie.</p>' +
            '<p>Wiec robisz to inaczej. Najpierw dokladasz nowe klocki obok starych, zeby kazdy mogl sprobowac. Potem naklejasz na stare karteczke: "te znikna po wakacjach". Potem chodzisz po pokoju i sam pomagasz przelozyc klocki w domkach. Dopiero na koncu stare klocki znikaja.</p>' +
            '<p>Numer wersji to komunikat dla kolegow. <strong>Trzecia cyfra</strong> - naprawilem drobiazg. <strong>Druga</strong> - dolozylem cos nowego, nic nie znika. <strong>Pierwsza</strong> - uwaga, cos zniknelo, trzeba przelozyc klocki.</p>',
          en: '<p>Imagine you lend your bricks to friends and everyone builds a little house. One day you decide the red bricks should have different studs - better, cleverer, in your opinion.</p>' +
            '<p>If you simply swap them, every house collapses in the same second and fifteen children cry simultaneously.</p>' +
            '<p>So you do it differently. First you add the new bricks next to the old ones so everyone can try them. Then you stick a note on the old ones: "these disappear after the holidays". Then you walk around the room and help rebuild the houses yourself. Only at the very end do the old bricks go away.</p>' +
            '<p>The version number is a message to your friends. <strong>Third digit</strong> - I fixed something tiny. <strong>Second</strong> - I added something new, nothing disappeared. <strong>First</strong> - careful, something is gone, bricks need moving.</p>'
        },
        school: {
          pl: '<p>Semver mowi: <code>major.minor.patch</code>. Major to zmiana lamiaca, minor to nowa funkcja wstecznie zgodna, patch to poprawka. Problem w tym, ze w design systemie <strong>publiczny kontrakt jest szerszy niz sygnatury TypeScriptu</strong>.</p>' +
            '<p>Lamiace jest takze:</p>' +
            '<ul>' +
            '<li>zmiana struktury DOM, jesli ktos pisze selektory na twoich elementach,</li>' +
            '<li>zmiana nazwy klasy CSS albo <code>::part()</code>,</li>' +
            '<li>zmiana domyslnej wartosci propa,</li>' +
            '<li>zmiana wygladu, ktora psuje layout w aplikacji (wyzszy przycisk lamie siatke).</li>' +
            '</ul>' +
            '<p>Dlatego dojrzale zespoly opisuja w dokumentacji wprost, co jest publiczne, a co nie. Wszystko, czego nie obiecales, mozesz zmieniac w patchu.</p>' +
            '<p>Drugi filar to <strong>proces</strong>. Breaking change nigdy nie jest jednym commitem. Sciezka wyglada tak: dodaj nowe API obok starego (minor), oznacz stare jako deprecated z data usuniecia (minor), opublikuj codemod, usun stare w majorze, utrzymuj poprzednia galaz przez ustalony czas.</p>' +
            '<pre><code># typowy codemod na bazie jscodeshift\nnpx @chi/codemod v3-button-variant src/</code></pre>' +
            '<p>Codemod to zwykle skrypt oparty o jscodeshift albo ts-morph, ktory przepisuje wywolania w repozytorium konsumenta. Nie musi pokrywac stu procent przypadkow - wystarczy, ze zdejmie nudne dziewiecdziesiat, a reszte zostawi z komentarzem TODO do recznego przejrzenia. Bez codemodu kazdy z czterdziestu zespolow robi te sama prace osobno.</p>' +
            '<p>Trzeci filar to tempo. Jeden major rocznie, ogloszony z wyprzedzeniem, jest znosny. Trzy majory rocznie sprawiaja, ze zespoly przypinaja stara wersje i przestaja aktualizowac cokolwiek - a wtedy design system przestaje byc wspolnym jezykiem i staje sie archeologia.</p>',
          en: '<p>Semver says <code>major.minor.patch</code>. Major is a breaking change, minor is a backwards-compatible feature, patch is a fix. The catch is that in a design system <strong>the public contract is wider than the TypeScript signatures</strong>.</p>' +
            '<p>Breaking also includes:</p>' +
            '<ul>' +
            '<li>changing DOM structure, if anyone writes selectors against your elements,</li>' +
            '<li>renaming a CSS class or a <code>::part()</code>,</li>' +
            '<li>changing a prop default,</li>' +
            '<li>a visual change that breaks layout downstream (a taller button breaking a grid).</li>' +
            '</ul>' +
            '<p>That is why mature teams document explicitly what is public and what is not. Anything you never promised, you may change in a patch.</p>' +
            '<p>The second pillar is <strong>process</strong>. A breaking change is never a single commit. The path is: add the new API next to the old one (minor), mark the old one deprecated with a removal date (minor), publish a codemod, remove the old one in a major, keep the previous branch alive for an agreed window.</p>' +
            '<pre><code># typical jscodeshift-based codemod\nnpx @chi/codemod v3-button-variant src/</code></pre>' +
            '<p>The third pillar is cadence. One major a year, announced ahead of time, is tolerable. Three majors a year make teams pin an old version and stop upgrading anything - and then the design system stops being a shared language and becomes archaeology.</p>'
        },
        pro: {
          pl: '<p>W telco z 40-80 aplikacjami frontendowymi kazdy major kosztuje realne osobodni po stronie konsumentow. Liczba, ktora warto miec w glowie: prosta migracja to okolo 0.5-2 dni na aplikacje, zlozona (redesign, zmiana struktury DOM) to 5-15 dni. Major bez codemodu przy 50 aplikacjach to spokojnie 100 osobodni spalonych w organizacji.</p>' +
            '<h4>Polityka wydawnicza, ktora dziala</h4>' +
            '<ul>' +
            '<li><strong>Jeden wspierany major plus poprzedni w trybie utrzymaniowym.</strong> Poprzedni dostaje wylacznie poprawki bezpieczenstwa i krytyczne, przez ustalone 6-12 miesiecy. Trzy zywe majory to trzy razy wiecej pracy przy kazdym CVE.</li>' +
            '<li><strong>Changesets</strong> w monorepo: kazdy PR dolacza plik z opisem zmiany i poziomem semver. Release jest generowany, changelog pisany przez autorow zmian, a nie przez maintainera w piatek wieczorem.</li>' +
            '<li><strong>Kanaly dystrybucji.</strong> <code>next</code> po kazdym merge, <code>latest</code> co dwa tygodnie. Kilka zespolow pilotazowych siedzi na <code>next</code> i lapie regresje, zanim zobaczy je reszta.</li>' +
            '</ul>' +
            '<h4>Automatyzacja migracji</h4>' +
            '<pre><code>// codemod: jscodeshift, prop type -&gt; variant\nexport default function transform(file, api) {\n  const j = api.jscodeshift;\n  return j(file.source)\n    .findJSXElements("Button")\n    .find(j.JSXAttribute, { name: { name: "type" } })\n    .forEach(p =&gt; { p.node.name.name = "variant"; })\n    .toSource();\n}</code></pre>' +
            '<p>Codemod pokrywa zwykle 85-95 procent przypadkow. Reszta to dynamiczne propsy i spready - i to wlasnie tam idzie recenzja czlowieka. Krok, ktory najbardziej zmienia adopcje, to <strong>bot podnoszacy PR</strong> w repozytoriach konsumentow z juz uruchomionym codemodem i zielonym CI. Zespol klika merge zamiast planowac zadanie na nastepny sprint.</p>' +
            '<h4>Widocznosc i dane</h4>' +
            '<p>Bez telemetrii nie wiesz, kiedy mozesz usunac API. Minimum to skan zaleznosci we wszystkich repozytoriach (Dependabot, wlasny skrypt po API GitHuba albo Backstage jako katalog) i raport: ile aplikacji na ktorej wersji, ile uzyc deprecated propa. Ten wykres jest tez twoim najlepszym argumentem w rozmowie o budzecie - pokazuje, ze migracja jest kosztem organizacji, a nie kaprysem zespolu design systemu.</p>' +
            '<h4>Pulapki</h4>' +
            '<p>Peer dependency na framework potrafi wymusic majora bez zadnej zmiany w twoim kodzie. Dwie wersje web componentow na jednej stronie to konflikt w rejestrze <code>customElements</code> - albo wersjonujesz nazwe tagu, albo akceptujesz, ze mikrofrontendy musza uzgodnic wersje. Wybor tego kompromisu podejmuje sie raz i zyje sie z nim lata.</p>',
          en: '<p>In a telco with 40-80 frontend applications, every major costs real person-days on the consumer side. The number worth carrying in your head: a simple migration is roughly 0.5-2 days per app, a complex one (redesign, DOM structure change) is 5-15 days. A major with no codemod across 50 apps easily burns 100 person-days of organisational capacity.</p>' +
            '<h4>A release policy that works</h4>' +
            '<ul>' +
            '<li><strong>One supported major plus the previous one in maintenance.</strong> The previous one gets security and critical fixes only, for an agreed 6-12 months. Three live majors mean three times the work on every CVE.</li>' +
            '<li><strong>Changesets</strong> in the monorepo: each PR carries a file describing the change and its semver level. The release is generated and the changelog is written by the change authors, not by the maintainer on a Friday night.</li>' +
            '<li><strong>Distribution channels.</strong> <code>next</code> on every merge, <code>latest</code> every two weeks. A handful of pilot teams sit on <code>next</code> and catch regressions before everyone else sees them.</li>' +
            '</ul>' +
            '<h4>Automating the migration</h4>' +
            '<pre><code>// codemod: jscodeshift, prop type -&gt; variant\nexport default function transform(file, api) {\n  const j = api.jscodeshift;\n  return j(file.source)\n    .findJSXElements("Button")\n    .find(j.JSXAttribute, { name: { name: "type" } })\n    .forEach(p =&gt; { p.node.name.name = "variant"; })\n    .toSource();\n}</code></pre>' +
            '<p>A codemod typically covers 85-95 percent of call sites. The remainder is dynamic props and spreads - which is exactly where human review belongs. The single step that moves adoption most is a <strong>bot raising the PR</strong> in consumer repos with the codemod already run and CI green. The team clicks merge instead of planning a ticket for next sprint.</p>' +
            '<h4>Visibility and data</h4>' +
            '<p>Without telemetry you cannot know when it is safe to remove an API. The minimum is a dependency scan across all repos (Dependabot, a script over the GitHub API, or Backstage as the catalogue) plus a report: how many apps on which version, how many uses of the deprecated prop. That chart is also your best argument in a budget conversation - it shows migration as an organisational cost, not a design system team whim.</p>' +
            '<h4>Traps</h4>' +
            '<p>A framework peer dependency can force a major with no change in your own code at all. Two versions of your web components on one page collide in the <code>customElements</code> registry - either you version the tag name, or you accept that micro-frontends must agree on a version. You make that tradeoff once and live with it for years.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktora z tych zmian jest breaking change w design systemie, mimo ze typy TypeScript sie nie zmieniaja?',
            en: 'Which of these is a breaking change in a design system even though the TypeScript types do not change?'
          },
          options: [
            { pl: 'Dodanie nowego opcjonalnego propa', en: 'Adding a new optional prop' },
            { pl: 'Zmiana nazwy klasy CSS wystawionej w dokumentacji', en: 'Renaming a CSS class that is documented as public' },
            { pl: 'Poprawka wydajnosci w wewnetrznej funkcji', en: 'A performance fix in an internal function' },
            { pl: 'Dodanie nowego komponentu', en: 'Adding a new component' }
          ],
          correct: 1,
          explain: {
            pl: 'Publiczny kontrakt design systemu obejmuje DOM, klasy CSS i wyglad, nie tylko sygnatury. Jesli ktos moze na tym oprzec selektor, jest to API.',
            en: 'The public contract of a design system covers DOM, CSS classes and appearance, not just signatures. If someone can write a selector against it, it is API.'
          }
        },
        {
          q: {
            pl: 'Jaka jest wlasciwa kolejnosc krokow przy usuwaniu starego propa?',
            en: 'What is the correct order of steps when removing an old prop?'
          },
          options: [
            { pl: 'Usun w majorze, potem opublikuj codemod dla tych, ktorzy sie zepsuli', en: 'Remove in a major, then publish a codemod for whoever broke' },
            { pl: 'Dodaj nowe API obok starego, oznacz stare jako deprecated z data, opublikuj codemod, usun w majorze', en: 'Add the new API beside the old one, deprecate with a date, publish a codemod, remove in a major' },
            { pl: 'Ogloś na kanale Slack i usun w nastepnym minorze', en: 'Announce on Slack and remove in the next minor' },
            { pl: 'Utrzymuj oba API bezterminowo, zeby nikogo nie zepsuc', en: 'Keep both APIs indefinitely so nobody breaks' }
          ],
          correct: 1,
          explain: {
            pl: 'Kazdy krok obniza koszt nastepnego. Utrzymywanie obu API bezterminowo tez jest bledem - podwaja powierzchnie testow i dokumentacji.',
            en: 'Each step lowers the cost of the next. Keeping both APIs forever is also wrong - it doubles the test and documentation surface.'
          }
        },
        {
          q: {
            pl: 'Dlaczego bot podnoszacy PR w repozytoriach konsumentow zmienia adopcje bardziej niz sam codemod?',
            en: 'Why does a bot raising PRs in consumer repos change adoption more than the codemod alone?'
          },
          options: [
            { pl: 'Bo bot potrafi obsluzyc przypadki, ktorych codemod nie pokrywa', en: 'Because the bot handles cases the codemod cannot' },
            { pl: 'Bo przenosi migracje z planowania sprintu do jednego klikniecia merge', en: 'Because it moves the migration from sprint planning to one merge click' },
            { pl: 'Bo boty maja uprawnienia do pomijania code review', en: 'Because bots are allowed to bypass code review' },
            { pl: 'Bo codemod dziala tylko na monorepo', en: 'Because codemods only work in a monorepo' }
          ],
          correct: 1,
          explain: {
            pl: 'Najwiekszym kosztem migracji nie jest edycja kodu, tylko wejscie zadania do backlogu 40 zespolow. Gotowy PR z zielonym CI omija ten koszt.',
            en: 'The biggest migration cost is not editing code, it is getting a ticket into 40 teams backlogs. A ready PR with green CI skips that cost.'
          }
        },
        {
          q: {
            pl: 'Dwa mikrofrontendy na jednej stronie ladują rozne majory twoich web componentow. Co sie stanie i co z tym robisz?',
            en: 'Two micro-frontends on one page load different majors of your web components. What happens and what do you do?'
          },
          options: [
            { pl: 'Nic, przegladarka izoluje wersje przez Shadow DOM', en: 'Nothing, the browser isolates versions through Shadow DOM' },
            { pl: 'Druga rejestracja tego samego tagu rzuca blad; trzeba wersjonowac nazwe tagu albo wymusic wspolna wersje', en: 'The second registration of the same tag throws; you must version the tag name or force a shared version' },
            { pl: 'Wygrywa nowsza wersja, starsza jest cicho ignorowana', en: 'The newer version wins and the older is silently ignored' },
            { pl: 'Wystarczy ustawic peer dependency na obie wersje', en: 'Setting a peer dependency on both versions is enough' }
          ],
          correct: 1,
          explain: {
            pl: 'Rejestr customElements jest globalny dla dokumentu, wiec drugie define tej samej nazwy rzuca wyjatek. Shadow DOM izoluje style, nie rejestr.',
            en: 'The customElements registry is global per document, so a second define of the same name throws. Shadow DOM isolates styles, not the registry.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'docs-storybook-playgrounds',
      title: {
        pl: 'Dokumentacja, Storybook i piaskownice',
        en: 'Docs, Storybook and playgrounds'
      },
      minutes: 10,
      terms: [
        {
          term: { pl: 'CSF3 (Component Story Format 3)', en: 'CSF3 (Component Story Format 3)' },
          def: {
            pl: 'Format historii Storybooka oparty na obiektach i <code>args</code>. Jedna historia jest jednocześnie dokumentacją, przypadkiem testowym i celem regresji wizualnej.',
            en: 'The object-and-<code>args</code> based Storybook story format. One story is documentation, a test case and a visual regression target at the same time.'
          }
        },
        {
          term: { pl: 'Autodocs', en: 'Autodocs' },
          def: {
            pl: 'Tabele propsów generowane z kodu, dla web componentów z <code>custom-elements.json</code>. Cel to <strong>zero</strong> ręcznie utrzymywanych tabel, bo ręczne zawsze rozjeżdżają się z implementacją.',
            en: 'Prop tables generated from the code, from <code>custom-elements.json</code> for web components. The goal is <strong>zero</strong> hand-maintained tables, because hand-written ones always drift from the implementation.'
          }
        },
        {
          term: { pl: 'Do and Do not', en: 'Do and Do not' },
          def: {
            pl: 'Sekcja pokazująca obok siebie użycie poprawne i błędne. Uczy szybciej niż opis propsów, bo odpowiada na realne pytanie konsumenta: czy wolno mi tak zrobić.',
            en: 'A section showing correct and incorrect usage side by side. It teaches faster than a prop description because it answers the real consumer question: am I allowed to do this.'
          }
        },
        {
          term: { pl: 'Dokumentacja jako produkt', en: 'Docs as a product' },
          def: {
            pl: 'Traktowanie dokumentacji jak produktu z metrykami: unikalni użytkownicy tygodniowo, zapytania w wyszukiwarce bez wyników i najczęściej kopiowane snippety.',
            en: 'Treating documentation as a product with metrics: weekly unique users, searches that return nothing, and the most-copied snippets.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa2l4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Docs generated from the code that ships</text>' +
          '<rect x="20" y="48" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="105" y="80" fill="var(--text)" font-size="15" text-anchor="middle">Component source</text>' +
          '<text x="105" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">types + JSDoc</text>' +
          '<rect x="235" y="48" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="320" y="80" fill="var(--text)" font-size="15" text-anchor="middle">Stories (CSF)</text>' +
          '<text x="320" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">real usage examples</text>' +
          '<rect x="450" y="48" width="170" height="80" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="535" y="80" fill="var(--text)" font-size="15" text-anchor="middle">Manifest</text>' +
          '<text x="535" y="104" fill="var(--muted)" font-size="13" text-anchor="middle">custom-elements.json</text>' +
          '<line x1="105" y1="128" x2="105" y2="168" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="320" y1="128" x2="320" y2="168" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="535" y1="128" x2="535" y2="168" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="105" y1="168" x2="535" y2="168" stroke="var(--accent)" stroke-width="2"/>' +
          '<line x1="320" y1="168" x2="320" y2="204" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l4a)"/>' +
          '<rect x="150" y="208" width="340" height="70" rx="12" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="238" fill="var(--text)" font-size="15" text-anchor="middle">Docs site (autodocs)</text>' +
          '<text x="320" y="262" fill="var(--muted)" font-size="13" text-anchor="middle">props table always in sync</text>' +
          '<line x1="240" y1="278" x2="180" y2="312" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2l4a)"/>' +
          '<line x1="400" y1="278" x2="460" y2="312" stroke="var(--accent2)" stroke-width="2" marker-end="url(#fa2l4a)"/>' +
          '<rect x="40" y="316" width="240" height="62" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="160" y="344" fill="var(--text)" font-size="14" text-anchor="middle">Live playground</text>' +
          '<text x="160" y="366" fill="var(--muted)" font-size="13" text-anchor="middle">copy-paste ready</text>' +
          '<rect x="360" y="316" width="240" height="62" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="480" y="344" fill="var(--text)" font-size="14" text-anchor="middle">Guidance</text>' +
          '<text x="480" y="366" fill="var(--muted)" font-size="13" text-anchor="middle">when NOT to use it</text>' +
          '</svg>',
        caption: {
          pl: 'Dokumentacja generowana z kodu, ktory faktycznie sie wydaje - plus dwie rzeczy, ktorych generator nie zrobi: piaskownica i wskazowki kiedy nie uzywac.',
          en: 'Docs generated from the code that actually ships - plus the two things a generator cannot produce: a playground and guidance on when not to use it.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie skrzynke z narzedziami, ktora pozyczasz calemu osiedlu. Sama skrzynka nie wystarczy. Ludzie musza wiedziec, ktory klucz do czego i czego nie robic mlotkiem.</p>' +
            '<p>Najgorsza instrukcja to kartka napisana rok temu, ktora mowi o narzedziach, ktorych juz nie ma. Ludzie raz sprobuja, raz sie sparza i wiecej nie zajrzą.</p>' +
            '<p>Najlepsza instrukcja to taka, ktora sama sie przepisuje. Wisi obok skrzynki, patrzy do srodka i mowi dokladnie to, co tam jest dzisiaj. A obok stoi maly stolik, gdzie mozna od razu wziac narzedzie do reki i sprobowac, nie budujac przy tym calego domu.</p>' +
            '<p>I jeszcze jedno zdanie, ktorego nikt nie pisze, a jest najwazniejsze: <strong>kiedy tego nie uzywac</strong>. Wiertarka jest swietna, ale nie do mieszania zupy.</p>',
          en: '<p>Imagine a toolbox you lend to the whole neighbourhood. The box alone is not enough. People need to know which spanner is for what and what not to do with a hammer.</p>' +
            '<p>The worst manual is a note written a year ago describing tools that no longer exist. People try it once, get burned once, and never look again.</p>' +
            '<p>The best manual is one that rewrites itself. It hangs next to the box, looks inside, and says exactly what is in there today. And beside it stands a little table where you can pick a tool up and try it without building a whole house first.</p>' +
            '<p>Plus one sentence nobody writes and everybody needs: <strong>when not to use this</strong>. A drill is excellent, but not for stirring soup.</p>'
        },
        school: {
          pl: '<p>Dokumentacja design systemu to nie zalacznik do kodu - to glowny interfejs uzytkownika twojego produktu. Wiekszosc konsumentow nigdy nie otworzy zrodel komponentu; zobacza tylko strone dokumentacji i skopiuja pierwszy przyklad.</p>' +
            '<p>Dziela sie na trzy warstwy:</p>' +
            '<ul>' +
            '<li><strong>Referencja</strong> - tabela propsow, zdarzen, slotow. Musi byc <em>generowana</em>, nigdy pisana recznie. Storybook z autodocs czyta typy i JSDoc, dla web componentow zrodlem jest <code>custom-elements.json</code>.</li>' +
            '<li><strong>Przyklady</strong> - stories w formacie CSF3. Kazda story to jednoczesnie przyklad w dokumentacji, przypadek testowy dla testow wizualnych i piaskownica.</li>' +
            '<li><strong>Wskazowki</strong> - kiedy uzywac, kiedy nie, jak sie ma do podobnego komponentu, jakie sa zasady dostepnosci. Tego zaden generator nie napisze i to jest wlasnie wartosc dodana zespolu.</li>' +
            '</ul>' +
            '<pre><code>// Button.stories.ts - CSF3\nexport default { component: Button, tags: ["autodocs"] };\nexport const Danger = {\n  args: { variant: "danger", children: "Delete line" }\n};</code></pre>' +
            '<p>Jedna story pracuje wiec na trzech etatach naraz: dokumentacja, test i demo. To najlepszy zwrot z inwestycji w calym design systemie.</p>' +
            '<p>Warto tez pamietac, ze dokumentacja to nie tylko strony komponentow. Rownie czesto odwiedzane sa: przewodnik startowy (jak zainstalowac i skonfigurowac), strona tokenow z podgladem wartosci, changelog i przewodniki migracji. To one decyduja, czy nowy zespol wejdzie do systemu w jeden dzien, czy w dwa tygodnie.</p>' +
            '<p>Dwie rzeczy decyduja o tym, czy ludzie z dokumentacji korzystaja: <strong>wyszukiwarka</strong> i <strong>gotowy do skopiowania kod</strong>. Jesli developer musi przetlumaczyc przyklad z Reacta na Vue albo zgadnac import, wroci na Slacka i zapyta ciebie - a to jest twoj czas.</p>',
          en: '<p>Design system documentation is not an appendix to the code - it is the primary user interface of your product. Most consumers will never open a component source; they will see the docs page and copy the first example.</p>' +
            '<p>It has three layers:</p>' +
            '<ul>' +
            '<li><strong>Reference</strong> - the table of props, events, slots. It must be <em>generated</em>, never hand-written. Storybook autodocs reads types and JSDoc; for web components the source is <code>custom-elements.json</code>.</li>' +
            '<li><strong>Examples</strong> - stories in CSF3 format. Every story is simultaneously a docs example, a visual test case and a playground.</li>' +
            '<li><strong>Guidance</strong> - when to use, when not, how it relates to a similar component, what the accessibility rules are. No generator writes this, and it is exactly where the team adds value.</li>' +
            '</ul>' +
            '<pre><code>// Button.stories.ts - CSF3\nexport default { component: Button, tags: ["autodocs"] };\nexport const Danger = {\n  args: { variant: "danger", children: "Delete line" }\n};</code></pre>' +
            '<p>So one story holds three jobs at once: documentation, test and demo. That is the best return on investment anywhere in a design system.</p>' +
            '<p>Two things decide whether people actually use the docs: <strong>search</strong> and <strong>copy-paste-ready code</strong>. If a developer has to translate an example from React to Vue, or guess the import, they will go back to Slack and ask you - and that is your time.</p>'
        },
        pro: {
          pl: '<p>Traktuj dokumentacje jak produkt z wlasnymi metrykami. Realne liczby, ktore warto zbierac: unikalni uzytkownicy tygodniowo, zapytania w wyszukiwarce bez wynikow (najlepsza lista braków, jaka dostaniesz za darmo), sciezki wejscia i najczesciej kopiowane snippety.</p>' +
            '<h4>Architektura</h4>' +
            '<p>Sprawdzony podzial to Storybook jako warstwa komponentowa (piaskownica, controls, testy interakcji) plus osobna strona jako warstwa narracyjna (zasady, tokeny, dostepnosc, wzorce, changelog). Storybook 8 i 9 pozwalaja osadzic stories w MDX, wiec obie warstwy moga zyc w jednym deployu, ale sa zespoly, ktore swiadomie trzymaja Docusaurus albo VitePress obok - bo edycja tresci przez nietechnicznych autorow w Storybooku jest bolesna.</p>' +
            '<p>Klucz jest jeden: <strong>zero recznie utrzymywanych tabel propsow</strong>. Kazda tabela pisana recznie rozjezdza sie w ciagu jednego kwartalu i podwaza zaufanie do calej reszty dokumentacji.</p>' +
            '<h4>Wieloframeworkowosc</h4>' +
            '<p>W telco z Angularem, Vue i Reactem w tej samej organizacji dokumentacja musi pokazywac snippet w kazdym z nich. Jesli baza to web components, generujesz je z jednego zrodla przez wrappery. Jesli nie - musisz utrzymywac rownolegle stories dla kazdego frameworka i to jest realny koszt, ktory trzeba nazwac przy wyborze technologii, a nie odkryc rok pozniej.</p>' +
            '<h4>Rzeczy, ktore realnie podnosza adopcje</h4>' +
            '<ul>' +
            '<li><strong>Deploy podgladu na kazdy PR.</strong> Recenzent designu klika link, zamiast klonowac branch. Chromatic, Netlify Deploy Preview albo GitHub Pages per branch.</li>' +
            '<li><strong>Zakladka Do and Do not</strong> z realnymi zrzutami z produktu, nie abstrakcyjnymi prostokatami.</li>' +
            '<li><strong>Sekcja migracji</strong> przy kazdym komponencie, ktory zastapil poprzednika, z linkiem do codemodu.</li>' +
            '<li><strong>Wyszukiwarka po synonimach.</strong> Ludzie szukaja frazy dropdown, a komponent nazywa sie Select. Aliasy w indeksie wyszukiwania rozwiazuja polowe pytan na Slacku.</li>' +
            '<li><strong>Notatki o dostepnosci przy komponencie</strong>, nie w osobnym rozdziale, ktorego nikt nie odwiedza.</li>' +
            '</ul>' +
            '<p>Osobna kwestia jest wlasnosc tresci. Referencja generuje sie sama, ale wskazowki, zasady i przyklady antywzorcow ktos musi napisac i potem odswiezac. Bez jawnego wlasciciela na komponent ta czesc dokumentacji starzeje sie najszybciej i to wlasnie ona najbardziej podwaza zaufanie do calej strony.</p>' +
            '<p>Test dojrzalosci, ktory mozna zrobic w 15 minut: posadz nowego developera przed dokumentacja i popros o zbudowanie formularza z walidacja. Wszystko, o co zapyta na glos, jest brakiem w dokumentacji. To tansze niż jakakolwiek ankieta.</p>',
          en: '<p>Treat documentation as a product with its own metrics. Numbers worth collecting: weekly unique users, zero-result search queries (the best free gap list you will ever get), entry paths, and the most-copied snippets.</p>' +
            '<h4>Architecture</h4>' +
            '<p>A proven split is Storybook as the component layer (playground, controls, interaction tests) plus a separate site as the narrative layer (principles, tokens, accessibility, patterns, changelog). Storybook 8 and 9 let you embed stories in MDX, so both layers can live in one deploy, but some teams deliberately keep Docusaurus or VitePress alongside - because content editing by non-technical authors inside Storybook is painful.</p>' +
            '<p>One thing is non-negotiable: <strong>zero hand-maintained prop tables</strong>. Any hand-written table drifts within a quarter and undermines trust in everything else on the site.</p>' +
            '<h4>Multi-framework reality</h4>' +
            '<p>In a telco running Angular, Vue and React in the same organisation, the docs must show a snippet in each. If the base is web components, you generate them from one source through wrappers. If not, you maintain parallel stories per framework - a real cost that should be named when choosing the technology, not discovered a year later.</p>' +
            '<h4>What actually moves adoption</h4>' +
            '<ul>' +
            '<li><strong>A preview deploy on every PR.</strong> The design reviewer clicks a link instead of cloning a branch. Chromatic, Netlify Deploy Previews or per-branch GitHub Pages.</li>' +
            '<li><strong>A Do and Do not tab</strong> using real product screenshots, not abstract rectangles.</li>' +
            '<li><strong>A migration section</strong> on every component that replaced a predecessor, linking to the codemod.</li>' +
            '<li><strong>Synonym-aware search.</strong> People search for dropdown while the component is called Select. Aliases in the search index remove half your Slack questions.</li>' +
            '<li><strong>Accessibility notes on the component page</strong>, not in a separate chapter nobody visits.</li>' +
            '</ul>' +
            '<p>A maturity test you can run in 15 minutes: sit a new developer in front of the docs and ask them to build a form with validation. Everything they ask out loud is a documentation gap. That is cheaper than any survey.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Dlaczego tabela propsow powinna byc generowana, a nie pisana recznie?',
            en: 'Why should the props table be generated rather than hand-written?'
          },
          options: [
            { pl: 'Bo generowana tabela ladniej wyglada', en: 'Because a generated table looks nicer' },
            { pl: 'Bo reczna rozjedzie sie z kodem i podwazy zaufanie do calej dokumentacji', en: 'Because a hand-written one drifts from the code and undermines trust in the whole site' },
            { pl: 'Bo Storybook nie pozwala pisac tabel recznie', en: 'Because Storybook does not allow hand-written tables' },
            { pl: 'Bo tabele generowane sa lepiej indeksowane przez wyszukiwarki', en: 'Because generated tables index better in search engines' }
          ],
          correct: 1,
          explain: {
            pl: 'Dokumentacja, ktora raz sklamala, traci uzytkownikow na dobre. Generowanie z typow i JSDoc gwarantuje, ze referencja opisuje realnie wydany kod.',
            en: 'Documentation that lies once loses its users for good. Generating from types and JSDoc guarantees the reference describes the code that shipped.'
          }
        },
        {
          q: {
            pl: 'Jedna story w formacie CSF3 pelni ile rol jednoczesnie w dojrzalym setupie?',
            en: 'How many roles does a single CSF3 story play at once in a mature setup?'
          },
          options: [
            { pl: 'Tylko dokumentacyjna', en: 'Documentation only' },
            { pl: 'Dokumentacja, test wizualny i piaskownica', en: 'Documentation, visual test and playground' },
            { pl: 'Test jednostkowy i test end-to-end', en: 'Unit test and end-to-end test' },
            { pl: 'Wylacznie zrodlo dla testow wizualnych', en: 'Only a source for visual tests' }
          ],
          correct: 1,
          explain: {
            pl: 'Ta potrojna rola sprawia, ze stories sa najtansza inwestycja w design systemie - jeden plik obsluguje trzy potrzeby naraz.',
            en: 'That triple duty makes stories the cheapest investment in a design system - one file serves three needs at once.'
          }
        },
        {
          q: {
            pl: 'Ktora metryka najszybciej pokaze ci konkretne braki w dokumentacji?',
            en: 'Which metric surfaces concrete documentation gaps fastest?'
          },
          options: [
            { pl: 'Liczba odslon strony glownej', en: 'Homepage page views' },
            { pl: 'Sredni czas na stronie', en: 'Average time on page' },
            { pl: 'Liczba komponentow w systemie', en: 'Number of components in the system' },
            { pl: 'Zapytania w wyszukiwarce bez wynikow', en: 'Zero-result search queries' }
          ],
          correct: 3,
          explain: {
            pl: 'Puste wyniki wyszukiwania to lista rzeczy, ktorych ludzie szukali i nie znalezli - gotowy backlog dokumentacyjny, za darmo.',
            en: 'Zero-result searches are a list of things people looked for and did not find - a ready-made docs backlog, for free.'
          }
        },
        {
          q: {
            pl: 'Organizacja uzywa Angulara, Vue i Reacta. Ktore podejscie do dokumentacji jest najbardziej zrownowazone dlugoterminowo?',
            en: 'The organisation runs Angular, Vue and React. Which documentation approach is most sustainable long term?'
          },
          options: [
            { pl: 'Baza w web componentach i generowane wrappery, wiec snippety dla trzech frameworkow pochodza z jednego zrodla', en: 'A web components base with generated wrappers, so snippets for three frameworks come from one source' },
            { pl: 'Trzy oddzielne Storybooki utrzymywane rownolegle przez zespol design systemu', en: 'Three separate Storybooks maintained in parallel by the design system team' },
            { pl: 'Dokumentacja tylko dla najpopularniejszego frameworka, reszta niech tlumaczy sama', en: 'Docs for the most popular framework only; the rest can translate themselves' },
            { pl: 'Zrzuty ekranu kodu w Confluence, zeby nie utrzymywac buildu', en: 'Screenshots of code in Confluence, to avoid maintaining a build' }
          ],
          correct: 0,
          explain: {
            pl: 'Rownolegle Storybooki to potrojony koszt utrzymania, a dokumentacja dla jednego frameworka wypycha pozostale zespoly poza system. Jedno zrodlo z wrapperami skaluje sie najlepiej.',
            en: 'Parallel Storybooks triple the maintenance cost, and single-framework docs push the other teams out of the system. One source with wrappers scales best.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      id: 'testing-visual-regression',
      title: {
        pl: 'Testowanie i regresja wizualna',
        en: 'Testing and visual regression'
      },
      minutes: 11,
      terms: [
        {
          term: { pl: 'Regresja wizualna', en: 'Visual regression' },
          def: {
            pl: 'Porównanie zrzutów historii przed zmianą i po niej. Łapie to, czego nie złapie żaden assert: przesunięty focus ring, zmieniony cień, zły kontrast po podmianie tokena.',
            en: 'Comparing screenshots of stories before and after a change. It catches what no assertion will: a shifted focus ring, a changed shadow, bad contrast after a token swap.'
          }
        },
        {
          term: { pl: 'Flakiness', en: 'Flakiness' },
          def: {
            pl: 'Testy dające losowe wyniki bez zmiany w kodzie. W testach wizualnych źródła są zawsze te same: animacje, ładowanie fontów, daty i dane losowe - trzeba je zamrozić.',
            en: 'Tests that give random results with no code change. In visual testing the causes are always the same: animations, font loading, dates and random data - all of which must be frozen.'
          }
        },
        {
          term: { pl: 'TurboSnap', en: 'TurboSnap' },
          def: {
            pl: 'Detekcja zmian wysyłająca do porównania tylko historie realnie dotknięte commitem. Przy tysiącach zrzutów decyduje o tym, czy testy wizualne są opłacalne.',
            en: 'Change detection that only sends the stories a commit actually touched. With thousands of snapshots it decides whether visual testing pays for itself.'
          }
        },
        {
          term: { pl: 'Test kontraktu API', en: 'API contract test' },
          def: {
            pl: 'Commitowany raport publicznego API (<code>api-extractor</code>, <code>custom-elements.json</code>), którego różnica wywala build. Breaking change staje się widoczny w PR, a nie w changelogu po fakcie.',
            en: 'A committed public API report (<code>api-extractor</code>, <code>custom-elements.json</code>) whose diff fails the build. A breaking change becomes visible in the PR, not in the changelog afterwards.'
          }
        },
        {
          term: { pl: 'Automatyczne testy dostępności', en: 'Automated accessibility tests' },
          def: {
            pl: 'axe uruchamiane na każdej historii (<code>@storybook/addon-a11y</code>). Łapie około 30-40 procent problemów, więc nie zastępuje ręcznego przejścia czytnikiem ekranu.',
            en: 'axe running on every story (<code>@storybook/addon-a11y</code>). It catches roughly 30-40 percent of issues, so it never replaces a manual screen reader pass.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Test pyramid for a design system</text>' +
          '<polygon points="320,50 470,140 170,140" fill="var(--surface)" stroke="var(--err)" stroke-width="2"/>' +
          '<text x="320" y="112" fill="var(--err)" font-size="13" text-anchor="middle">e2e - a few flows</text>' +
          '<rect x="150" y="148" width="340" height="70" rx="10" fill="var(--surface)" stroke="var(--warn)" stroke-width="2"/>' +
          '<text x="320" y="176" fill="var(--warn)" font-size="14" text-anchor="middle">Visual regression</text>' +
          '<text x="320" y="200" fill="var(--muted)" font-size="13" text-anchor="middle">one snapshot per story x themes</text>' +
          '<rect x="110" y="226" width="420" height="70" rx="10" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/>' +
          '<text x="320" y="254" fill="var(--accent2)" font-size="14" text-anchor="middle">Interaction + a11y</text>' +
          '<text x="320" y="278" fill="var(--muted)" font-size="13" text-anchor="middle">play functions, axe-core on every story</text>' +
          '<rect x="60" y="304" width="520" height="70" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="320" y="332" fill="var(--ok)" font-size="14" text-anchor="middle">Unit - logic and API contract</text>' +
          '<text x="320" y="356" fill="var(--muted)" font-size="13" text-anchor="middle">Vitest, fast, hundreds of them</text>' +
          '<text x="320" y="400" fill="var(--muted)" font-size="13" text-anchor="middle">cheap and fast at the bottom, slow and brittle at the top</text>' +
          '</svg>',
        caption: {
          pl: 'Piramida testow dla design systemu: dol tani i szybki, gora wolna i krucha - a testy wizualne siedza wyzej, niz sie ludziom wydaje.',
          en: 'The test pyramid for a design system: cheap and fast at the bottom, slow and brittle at the top - and visual tests sit higher than people assume.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie, ze piszesz przepis na ciasto, z ktorego korzysta cala rodzina. Zanim wyslesz nowa wersje przepisu, chcesz sprawdzic trzy rzeczy.</p>' +
            '<p>Po pierwsze, czy skladniki sie zgadzaja - to szybkie, mozesz to zrobic w glowie sto razy dziennie.</p>' +
            '<p>Po drugie, czy da sie tym ciastem realnie poslugiwac: pokroic, podac, ugryzc. To troche wolniejsze, bo trzeba wziac widelec do reki.</p>' +
            '<p>Po trzecie - i to jest ta czesc, ktora wszyscy pomijaja - czy ciasto <strong>wyglada</strong> tak samo jak wczoraj. Robisz zdjecie przed i po. Jesli polewa nagle przesunela sie o dwa centymetry, chcesz to zobaczyc, zanim zobaczy to babcia.</p>' +
            '<p>Haczyk jest taki, ze zdjecia lubia klamac. Inne swiatlo, inny stol, i juz masz alarm bez powodu. Dlatego robi sie je zawsze w tym samym miejscu, o tej samej porze, tym samym aparatem.</p>',
          en: '<p>Imagine you write a cake recipe that the whole family uses. Before you send out a new version you want to check three things.</p>' +
            '<p>First, do the ingredients add up - that is fast, you can do it in your head a hundred times a day.</p>' +
            '<p>Second, can the cake actually be used: sliced, served, bitten. Slightly slower, because you have to pick up a fork.</p>' +
            '<p>Third - and this is the part everybody skips - does the cake <strong>look</strong> the same as yesterday. You take a photo before and after. If the icing suddenly shifted two centimetres, you want to see it before grandma does.</p>' +
            '<p>The catch is that photos love to lie. Different light, different table, and you have an alarm for no reason. So you always take them in the same place, at the same time, with the same camera.</p>'
        },
        school: {
          pl: '<p>Design system testuje sie inaczej niz aplikacje, bo produktem jest <strong>kontrakt</strong>, nie funkcjonalnosc. Cztery warstwy, od najtanszej:</p>' +
            '<ul>' +
            '<li><strong>Jednostkowe</strong> (Vitest): logika, walidacja propsow, emitowane zdarzenia. Setki testow, sekundy.</li>' +
            '<li><strong>Interakcyjne</strong> (Testing Library albo play functions w Storybooku): fokus, klawiatura, otwieranie i zamykanie. Testuj zachowanie widoczne dla uzytkownika, nie stan wewnetrzny.</li>' +
            '<li><strong>Dostepnosciowe</strong> (axe-core, <code>@storybook/addon-a11y</code>): uruchamiane automatycznie na kazdej story. Lapia moze 30-40 procent problemow, ale za darmo i przy kazdym PR.</li>' +
            '<li><strong>Wizualne</strong> (Chromatic, Percy, Playwright screenshots): jedyna warstwa, ktora wylapie, ze padding urosl o 4 piksele.</li>' +
            '</ul>' +
            '<pre><code>// interakcja zamiast wnetrza\nawait userEvent.tab();\nexpect(screen.getByRole("button", { name: "Save" })).toHaveFocus();</code></pre>' +
            '<p>Testy wizualne to najwiekszy zysk i najwieksza pulapka jednoczesnie. Zysk: przy zmianie jednego tokena widzisz od razu, ze 40 komponentow wyglada inaczej. Pulapka: <strong>flaki</strong>. Animacje, fonty ladowane asynchronicznie, kursor, daty w tresci - kazde z nich potrafi generowac falszywe roznice.</p>' +
            '<p>Lekarstwa sa nudne i skuteczne: wylacz animacje w trybie testowym, laduj fonty lokalnie, zamroz czas, uzywaj deterministycznych danych i uruchamiaj wszystko w tym samym kontenerze co CI - a nie na Macu jednego developera.</p>' +
            '<p>Jest tez warstwa, o ktorej latwo zapomniec: <strong>test kontraktu API</strong>. Wystarczy trzymac w repozytorium wygenerowany opis publicznego API komponentow i porownywac go przy kazdym PR. Wtedy usuniecie propa albo zmiana nazwy zdarzenia pojawia sie w diffie jako czerwona linia, zamiast wyplynac dopiero u konsumenta po wydaniu.</p>',
          en: '<p>You test a design system differently from an application, because the product is a <strong>contract</strong>, not a feature. Four layers, cheapest first:</p>' +
            '<ul>' +
            '<li><strong>Unit</strong> (Vitest): logic, prop validation, emitted events. Hundreds of tests, seconds.</li>' +
            '<li><strong>Interaction</strong> (Testing Library or Storybook play functions): focus, keyboard, open and close. Test user-visible behaviour, not internal state.</li>' +
            '<li><strong>Accessibility</strong> (axe-core, <code>@storybook/addon-a11y</code>): run automatically on every story. They catch maybe 30-40 percent of issues, but for free and on every PR.</li>' +
            '<li><strong>Visual</strong> (Chromatic, Percy, Playwright screenshots): the only layer that notices padding grew by 4 pixels.</li>' +
            '</ul>' +
            '<pre><code>// behaviour, not internals\nawait userEvent.tab();\nexpect(screen.getByRole("button", { name: "Save" })).toHaveFocus();</code></pre>' +
            '<p>Visual tests are simultaneously the biggest win and the biggest trap. The win: change one token and you immediately see that 40 components look different. The trap: <strong>flakiness</strong>. Animations, asynchronously loaded fonts, the caret, dates in content - each of them happily produces false diffs.</p>' +
            '<p>The cures are boring and effective: disable animations in test mode, load fonts locally, freeze the clock, use deterministic data, and run everything in the same container as CI - not on one developer laptop.</p>' +
            '<p>There is one more layer that is easy to forget: the <strong>API contract test</strong>. Keep a generated description of the public component API in the repository and diff it on every PR. A removed prop or a renamed event then shows up as a red line in review, instead of surfacing at a consumer after release.</p>'
        },
        pro: {
          pl: '<p>Ekonomia testow wizualnych decyduje o tym, czy je utrzymacie. Przy 60 komponentach i srednio 8 stories to 480 snapshotow. Pomnoz przez 2 motywy, 2 szerokosci i 2 kierunki tekstu, a masz 3840 zdjec na commit. Chromatic liczy sobie za snapshot, wiec ten sam pipeline moze kosztowac 200 dolarow miesiecznie albo 3000 - roznica lezy wylacznie w tym, co odfiltrujesz.</p>' +
            '<h4>Jak sciac koszt bez utraty pokrycia</h4>' +
            '<ul>' +
            '<li><strong>TurboSnap albo wlasna detekcja zmian:</strong> snapshotuj tylko stories dotkniete przez diff w grafie zaleznosci. Typowo redukuje przebieg o 80-90 procent.</li>' +
            '<li><strong>Pelna matryca tylko na nocnym buildzie</strong> i przed releasem. Na PR jedna szerokosc, jeden motyw.</li>' +
            '<li><strong>Jedna story kompozytowa</strong> zamiast osmiu wariantow pojedynczego przycisku - kratka wszystkich wariantow na jednym zdjeciu lapie te same regresje za jedna oplate.</li>' +
            '</ul>' +
            '<h4>Determinizm jako wymog architektoniczny</h4>' +
            '<pre><code>// .storybook/preview.ts\nexport const parameters = {\n  chromatic: { pauseAnimationAtEnd: true },\n};\nexport const decorators = [(Story) =&gt; {\n  document.documentElement.classList.add("test-mode");\n  return Story();\n}];\n// CSS: .test-mode * { animation: none !important; transition: none !important; }</code></pre>' +
            '<p>Prog tolerancji na roznice to pulapka, o ktorej warto myslec swiadomie. Ustawiony na 0 daje szum przy kazdej roznicy renderowania czcionek. Ustawiony na 0.2 przepusci realna zmiane koloru. Lepszym rozwiazaniem od podnoszenia progu jest usuniecie zrodla niedeterminizmu.</p>' +
            '<h4>Warstwy, o ktorych sie zapomina</h4>' +
            '<ul>' +
            '<li><strong>Test kontraktu API</strong>: snapshot <code>custom-elements.json</code> albo raportu z <code>api-extractor</code> w repo. Kazda zmiana publicznego API pojawia sie w diffie PR i wymusza swiadomy wybor poziomu semver.</li>' +
            '<li><strong>Budzet rozmiaru</strong>: <code>size-limit</code> w CI. Jeden nieuwazny import lodash w komponencie potrafi dodac 70 kB do bundla kazdej aplikacji w firmie.</li>' +
            '<li><strong>Testy w realnych przegladarkach</strong>: Playwright z projektami dla Chromium, WebKit i Firefoksa dla komponentow opartych o popover, dialog albo anchor positioning, gdzie roznice silnikow sa realne.</li>' +
            '<li><strong>Weryfikacja recznym testem czytnika ekranu</strong> przy komponentach zlozonych. axe nie powie ci, ze kolejnosc odczytu jest bez sensu.</li>' +
            '</ul>' +
            '<p>Zasada organizacyjna wazniejsza niz narzedzie: <strong>diff wizualny musi akceptowac designer, nie tylko developer</strong>. Jesli akceptuje go autor zmiany, testy wizualne po pol roku staja sie kosztownym klikaniem Approve.</p>',
          en: '<p>The economics of visual testing decide whether you keep it. With 60 components and 8 stories on average that is 480 snapshots. Multiply by 2 themes, 2 widths and 2 text directions and you have 3840 images per commit. Chromatic bills per snapshot, so the same pipeline can cost 200 dollars a month or 3000 - the difference is entirely in what you filter out.</p>' +
            '<h4>Cutting cost without losing coverage</h4>' +
            '<ul>' +
            '<li><strong>TurboSnap or your own change detection:</strong> only snapshot stories touched by the diff in the dependency graph. Typically an 80-90 percent reduction per run.</li>' +
            '<li><strong>Full matrix on the nightly build</strong> and before a release. On a PR: one width, one theme.</li>' +
            '<li><strong>One composite story</strong> instead of eight variants of a single button - a grid of all variants in one image catches the same regressions for one charge.</li>' +
            '</ul>' +
            '<h4>Determinism as an architectural requirement</h4>' +
            '<pre><code>// .storybook/preview.ts\nexport const parameters = {\n  chromatic: { pauseAnimationAtEnd: true },\n};\nexport const decorators = [(Story) =&gt; {\n  document.documentElement.classList.add("test-mode");\n  return Story();\n}];\n// CSS: .test-mode * { animation: none !important; transition: none !important; }</code></pre>' +
            '<p>The diff threshold is a trap worth thinking about deliberately. Set to 0 it produces noise from font rendering differences. Set to 0.2 it will wave through a genuine colour change. Removing the source of non-determinism always beats raising the threshold.</p>' +
            '<h4>The layers people forget</h4>' +
            '<ul>' +
            '<li><strong>An API contract test</strong>: commit a snapshot of <code>custom-elements.json</code> or the <code>api-extractor</code> report. Every public API change then shows up in the PR diff and forces a conscious semver call.</li>' +
            '<li><strong>A size budget</strong>: <code>size-limit</code> in CI. One careless lodash import in a component can add 70 kB to every application bundle in the company.</li>' +
            '<li><strong>Real browser runs</strong>: Playwright projects for Chromium, WebKit and Firefox for components built on popover, dialog or anchor positioning, where engine differences are real.</li>' +
            '<li><strong>A manual screen reader pass</strong> on complex components. axe will never tell you the reading order makes no sense.</li>' +
            '</ul>' +
            '<p>An organisational rule that matters more than the tooling: <strong>a visual diff must be approved by a designer, not only an engineer</strong>. If the author of the change approves it, within six months visual testing degrades into expensive Approve-clicking.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Ktorego rodzaju bledu NIE wylapia testy jednostkowe ani interakcyjne?',
            en: 'Which kind of defect will neither unit nor interaction tests catch?'
          },
          options: [
            { pl: 'Zmiana paddingu o 4 piksele po edycji tokena', en: 'Padding growing by 4 pixels after a token edit' },
            { pl: 'Brak emitowanego zdarzenia change', en: 'A missing change event' },
            { pl: 'Fokus nieprzechodzacy na przycisk po tabulacji', en: 'Focus not reaching the button on tab' },
            { pl: 'Bledna walidacja wartosci propa', en: 'Wrong prop value validation' }
          ],
          correct: 0,
          explain: {
            pl: 'Regresje czysto wizualne widzi tylko porownanie zrzutow. Dlatego warstwa wizualna jest w design systemie obowiazkowa, a nie opcjonalna.',
            en: 'Purely visual regressions are only visible to image comparison. That is why the visual layer is mandatory in a design system, not optional.'
          }
        },
        {
          q: {
            pl: 'Twoje testy wizualne generuja falszywe roznice na co drugim PR. Ktore dzialanie jest najlepsze?',
            en: 'Your visual tests produce false diffs on every other PR. Which action is best?'
          },
          options: [
            { pl: 'Podniesc prog tolerancji do 0.2', en: 'Raise the diff threshold to 0.2' },
            { pl: 'Usunac zrodla niedeterminizmu: animacje, fonty, czas, dane losowe', en: 'Remove the sources of non-determinism: animations, fonts, time, random data' },
            { pl: 'Uruchamiac testy tylko przed releasem', en: 'Only run the tests before a release' },
            { pl: 'Pozwolic autorom zmian akceptowac wlasne diffy', en: 'Let change authors approve their own diffs' }
          ],
          correct: 1,
          explain: {
            pl: 'Podniesienie progu ukrywa takze realne regresje. Determinizm jest wymogiem architektonicznym testow wizualnych, nie detalem konfiguracji.',
            en: 'Raising the threshold hides real regressions too. Determinism is an architectural requirement of visual testing, not a config detail.'
          }
        },
        {
          q: {
            pl: 'Masz 60 komponentow, 8 stories na komponent, 2 motywy i 2 szerokosci. Rachunek za snapshoty rosnie. Ktora zmiana najbardziej sciaga koszt bez utraty pokrycia?',
            en: 'You have 60 components, 8 stories each, 2 themes and 2 widths. The snapshot bill is climbing. Which change cuts cost most without losing coverage?'
          },
          options: [
            { pl: 'Zredukowac liczbe motywow do jednego na stale', en: 'Permanently drop to a single theme' },
            { pl: 'Usunac testy wizualne dla komponentow rzadko uzywanych', en: 'Delete visual tests for rarely used components' },
            { pl: 'Snapshotowac na PR tylko stories dotkniete przez diff, a pelna matryce uruchamiac nocnie', en: 'On PRs snapshot only stories touched by the diff, and run the full matrix nightly' },
            { pl: 'Zmniejszyc rozdzielczosc zrzutow o polowe', en: 'Halve the screenshot resolution' }
          ],
          correct: 2,
          explain: {
            pl: 'Detekcja zmian po grafie zaleznosci tnie typowy przebieg o 80-90 procent, a nocna pelna matryca nadal chroni przed regresja globalna.',
            en: 'Dependency-graph change detection cuts a typical run by 80-90 percent, while the nightly full matrix still guards against global regressions.'
          }
        },
        {
          q: {
            pl: 'Dlaczego akceptacja diffow wizualnych przez designera, a nie autora zmiany, jest decyzja architektoniczna?',
            en: 'Why is having a designer, rather than the change author, approve visual diffs an architectural decision?'
          },
          options: [
            { pl: 'Bo designerzy szybciej klikaja Approve', en: 'Because designers click Approve faster' },
            { pl: 'Bo autor zmiany ma silna motywacje, by uznac wlasny diff za zamierzony, co z czasem wydraza wartosc testow', en: 'Because the author is strongly motivated to call their own diff intentional, which hollows out the tests over time' },
            { pl: 'Bo narzedzia takie jak Chromatic wymagaja roli designera', en: 'Because tools like Chromatic require a designer role' },
            { pl: 'Bo designerzy maja dostep do plikow Figmy', en: 'Because designers have access to the Figma files' }
          ],
          correct: 1,
          explain: {
            pl: 'To ten sam mechanizm co zakaz zatwierdzania wlasnego PR: rozdzielenie decyzji od interesu utrzymuje test przy zyciu przez lata.',
            en: 'It is the same mechanism as not approving your own PR: separating the decision from the interest keeps the test alive for years.'
          }
        }
      ]
    },
    // ---------------------------------------------------------------- 6
    {
      id: 'governance-contribution-model',
      title: {
        pl: 'Governance i model kontrybucji',
        en: 'Governance and the contribution model'
      },
      minutes: 12,
      terms: [
        {
          term: { pl: 'Model zarządzania', en: 'Governance model' },
          def: {
            pl: 'Trzy warianty: scentralizowany (spójny, wolny), federacyjny (szybki, rozjeżdża się) i hybrydowy, w którym rdzeń pilnuje kontraktu, a zespoły kontrybuują. Przy dużej skali wygrywa hybryda.',
            en: 'Three options: centralised (consistent, slow), federated (fast, drifts) and hybrid, where a core team guards the contract and product teams contribute. At scale the hybrid wins.'
          }
        },
        {
          term: { pl: 'Lejek przyjmowania zgłoszeń', en: 'Intake funnel' },
          def: {
            pl: 'Jedna widoczna droga zgłaszania potrzeb, z kryteriami przyjęcia i publiczną odpowiedzią. Bez niego decyzje zapadają na prywatnych rozmowach i nikt nie wie, dlaczego czegoś nie ma.',
            en: 'One visible route for requests, with acceptance criteria and a public answer. Without it decisions happen in private messages and nobody knows why something does not exist.'
          }
        },
        {
          term: { pl: 'Office hours', en: 'Office hours' },
          def: {
            pl: 'Stały, cotygodniowy termin, w którym zespół rdzenia jest dostępny dla zespołów produktowych. Najtańszy rytuał, który realnie zmniejsza liczbę forków.',
            en: 'A fixed weekly slot when the core team is available to product teams. The cheapest ritual that measurably reduces the number of forks.'
          }
        },
        {
          term: { pl: 'Pokrycie adopcji', en: 'Adoption coverage' },
          def: {
            pl: 'Odsetek ekranów albo aplikacji realnie używających komponentów systemu. Razem z liczbą forków i zaoszczędzonym czasem to metryki, którymi finansuje się zespół platformowy.',
            en: 'The share of screens or apps genuinely using system components. Together with fork count and time saved, these are the metrics that fund the platform team.'
          }
        },
        {
          term: { pl: 'Odmowa z alternatywą', en: 'Saying no with an alternative' },
          def: {
            pl: 'Zasada: nigdy samo "nie", zawsze "nie w tej formie, oto alternatywa". Samo nie buduje forka, nie z alternatywą buduje zaufanie.',
            en: 'The rule: never a bare no, always not in this shape, here is the alternative. A bare no builds a fork; a no with an alternative builds trust.'
          }
        }
      ],
      diagram: {
        svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="inherit">' +
          '<defs><marker id="fa2l6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>' +
          '<text x="20" y="26" fill="var(--muted)" font-size="14">Three governance models</text>' +
          '<rect x="20" y="46" width="186" height="120" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="113" y="74" fill="var(--text)" font-size="15" text-anchor="middle">Centralised</text>' +
          '<text x="113" y="100" fill="var(--ok)" font-size="13" text-anchor="middle">consistent</text>' +
          '<text x="113" y="122" fill="var(--err)" font-size="13" text-anchor="middle">team is a bottleneck</text>' +
          '<text x="113" y="148" fill="var(--muted)" font-size="13" text-anchor="middle">good under 10 apps</text>' +
          '<rect x="226" y="46" width="186" height="120" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="319" y="74" fill="var(--accent)" font-size="15" text-anchor="middle">Federated</text>' +
          '<text x="319" y="100" fill="var(--ok)" font-size="13" text-anchor="middle">scales with demand</text>' +
          '<text x="319" y="122" fill="var(--err)" font-size="13" text-anchor="middle">drift without stewards</text>' +
          '<text x="319" y="148" fill="var(--muted)" font-size="13" text-anchor="middle">needs strong review</text>' +
          '<rect x="432" y="46" width="188" height="120" rx="12" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="526" y="74" fill="var(--ok)" font-size="15" text-anchor="middle">Hybrid</text>' +
          '<text x="526" y="100" fill="var(--muted)" font-size="13" text-anchor="middle">core team owns API</text>' +
          '<text x="526" y="122" fill="var(--muted)" font-size="13" text-anchor="middle">teams contribute</text>' +
          '<text x="526" y="148" fill="var(--muted)" font-size="13" text-anchor="middle">the telco default</text>' +
          '<text x="20" y="206" fill="var(--muted)" font-size="14">Intake funnel</text>' +
          '<rect x="20" y="222" width="130" height="56" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="85" y="248" fill="var(--text)" font-size="13" text-anchor="middle">request</text>' +
          '<text x="85" y="268" fill="var(--muted)" font-size="13" text-anchor="middle">any team</text>' +
          '<line x1="150" y1="250" x2="183" y2="250" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l6a)"/>' +
          '<rect x="188" y="222" width="130" height="56" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="253" y="248" fill="var(--text)" font-size="13" text-anchor="middle">triage</text>' +
          '<text x="253" y="268" fill="var(--muted)" font-size="13" text-anchor="middle">3 teams rule</text>' +
          '<line x1="318" y1="250" x2="351" y2="250" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l6a)"/>' +
          '<rect x="356" y="222" width="130" height="56" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>' +
          '<text x="421" y="248" fill="var(--text)" font-size="13" text-anchor="middle">RFC + spike</text>' +
          '<text x="421" y="268" fill="var(--muted)" font-size="13" text-anchor="middle">API agreed</text>' +
          '<line x1="486" y1="250" x2="519" y2="250" stroke="var(--accent)" stroke-width="2" marker-end="url(#fa2l6a)"/>' +
          '<rect x="524" y="222" width="96" height="56" rx="10" fill="var(--surface)" stroke="var(--ok)" stroke-width="2"/>' +
          '<text x="572" y="254" fill="var(--text)" font-size="13" text-anchor="middle">ship</text>' +
          '<rect x="20" y="304" width="600" height="94" rx="12" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>' +
          '<text x="320" y="332" fill="var(--text)" font-size="14" text-anchor="middle">The exit at every stage: no, and here is the alternative</text>' +
          '<text x="320" y="358" fill="var(--muted)" font-size="13" text-anchor="middle">local component, composition, or a documented pattern</text>' +
          '<text x="320" y="382" fill="var(--muted)" font-size="13" text-anchor="middle">saying no is the cheapest architectural act you have</text>' +
          '</svg>',
        caption: {
          pl: 'Modele governance i lejek przyjmowania zgloszen - z jasno opisanym wyjsciem awaryjnym na kazdym etapie.',
          en: 'Governance models and the intake funnel - with a clearly described exit at every stage.'
        }
      },
      levels: {
        eli5: {
          pl: '<p>Wyobraz sobie ogrodek warzywny, z ktorego korzysta caly blok. Sa trzy sposoby, zeby nim zarzadzac.</p>' +
            '<p>Pierwszy: jedna osoba sadzi wszystko sama. Grzadki wygladaja pieknie i rownie, ale jak dziesiec rodzin chce pomidorow, to stoja w kolejce do jesieni.</p>' +
            '<p>Drugi: kazdy sadzi co chce. Warzyw jest duzo i szybko, tylko po roku nikt nie wie, gdzie konczy sie marchewka, a zaczyna chwast.</p>' +
            '<p>Trzeci, ten dzialajacy: kazdy moze sadzic, ale jest ogrodnik, ktory mowi gdzie i pilnuje, zeby dynia nie zajela calej grzadki. Ogrodnik nie sadzi wszystkiego sam - uczy innych i sprawdza.</p>' +
            '<p>Najwazniejsza umiejetnosc ogrodnika to <strong>umiec powiedziec nie</strong>, ale nigdy samo nie. Zawsze: nie tutaj, za to sprobuj tam, i pokaze ci jak.</p>',
          en: '<p>Imagine a vegetable garden shared by a whole apartment block. There are three ways to run it.</p>' +
            '<p>First: one person plants everything themselves. The beds look beautiful and even, but when ten families want tomatoes they queue until autumn.</p>' +
            '<p>Second: everyone plants whatever they like. There are lots of vegetables fast, but a year later nobody can tell where the carrots end and the weeds begin.</p>' +
            '<p>Third, the one that works: anyone may plant, but there is a gardener who says where and makes sure the pumpkin does not eat the whole bed. The gardener does not plant everything - they teach and they check.</p>' +
            '<p>The gardener most important skill is <strong>being able to say no</strong>, but never a bare no. Always: not here, try that instead, and let me show you how.</p>'
        },
        school: {
          pl: '<p>Design system nie umiera z powodow technicznych. Umiera, gdy zespoly przestaja go uzywac, bo szybciej im napisac wlasny komponent. Governance to zestaw zasad, ktore utrzymuja rownowage miedzy spojnoscia a szybkoscia.</p>' +
            '<p>Trzy modele:</p>' +
            '<ul>' +
            '<li><strong>Scentralizowany</strong> - wszystko robi zespol design systemu. Spojne, ale przy 30 aplikacjach zespol staje sie waskim gardlem i ludzie zaczynaja obchodzic system.</li>' +
            '<li><strong>Federacyjny</strong> - kazdy moze dodac komponent. Szybkie, ale bez silnej recenzji po roku macie trzy dropdowny.</li>' +
            '<li><strong>Hybrydowy</strong> - zespol rdzenia jest wlascicielem API, standardow i recenzji; zespoly produktowe kontrybuuja kod. To domyslny wybor w duzych organizacjach.</li>' +
            '</ul>' +
            '<p>Model hybrydowy dziala tylko wtedy, gdy kontrybucja jest realnie tania. To znaczy: szablon PR, przewodnik kontrybutora, dzialajace srodowisko dev w jednej komendzie, i - najwazniejsze - <strong>ktos z rdzenia, kto siada z autorem</strong>. Kontrybucja, ktora czeka dwa tygodnie na review, nie powtorzy sie po raz drugi.</p>' +
            '<p>Druga polowa governance to <strong>lejek przyjmowania zgloszen</strong>. Prosta zasada, ktora oszczedza mnostwo dyskusji: komponent trafia do systemu, gdy potrzebuja go co najmniej trzy zespoly. Jeden zespol dostaje odpowiedz: zbuduj lokalnie, wrocimy do tematu, gdy pojawi sie drugi i trzeci.</p>' +
            '<p>I zasada, ktora warto zapamietac dosłownie: nigdy nie mow samego nie. Mow "nie w tej formie, oto alternatywa". Nie z alternatywa buduje zaufanie, samo nie buduje forka.</p>',
          en: '<p>Design systems do not die of technical causes. They die when teams stop using them because writing their own component is faster. Governance is the set of rules that keeps consistency and speed in balance.</p>' +
            '<p>Three models:</p>' +
            '<ul>' +
            '<li><strong>Centralised</strong> - the design system team does everything. Consistent, but at 30 applications the team becomes the bottleneck and people start routing around the system.</li>' +
            '<li><strong>Federated</strong> - anyone may add a component. Fast, but without strong review you own three dropdowns within a year.</li>' +
            '<li><strong>Hybrid</strong> - the core team owns the API, the standards and the review; product teams contribute code. This is the default choice in large organisations.</li>' +
            '</ul>' +
            '<p>Hybrid only works when contributing is genuinely cheap. That means a PR template, a contributor guide, a dev environment that starts with one command, and - most importantly - <strong>someone from the core team who sits with the author</strong>. A contribution that waits two weeks for review does not happen a second time.</p>' +
            '<p>The other half of governance is the <strong>intake funnel</strong>. A simple rule that saves enormous amounts of debate: a component enters the system when at least three teams need it. One team gets the answer: build it locally, we will revisit when a second and third appear.</p>' +
            '<p>And a rule worth memorising literally: never say a bare no. Say "not in this shape, here is the alternative". A no with an alternative builds trust; a bare no builds a fork.</p>'
        },
        pro: {
          pl: '<p>Na poziomie principala governance przestaje byc procesem, a staje sie <strong>strategia produktowa produktu wewnetrznego</strong>. Twoi uzytkownicy to inzynierowie, ktorzy zawsze maja alternatywe: napisac wlasne. Kazda decyzja governance jest wiec w istocie decyzja o tym, czy zostana.</p>' +
            '<h4>Metryki, ktore przekonuja zarzad</h4>' +
            '<ul>' +
            '<li><strong>Pokrycie adopcji</strong> - procent komponentow UI na produkcji pochodzacych z systemu. Mierzalne skanem AST repozytoriow albo telemetria w runtime. Realistyczny stan dojrzaly: 60-80 procent.</li>' +
            '<li><strong>Czas do pierwszego ekranu</strong> - ile dni zajmuje nowemu zespolowi postawienie zgodnego z marka ekranu. Spadek z 10 dni do 2 to argument finansowy, nie estetyczny.</li>' +
            '<li><strong>Zaoszczedzony czas</strong> - liczba uzyc komponentu razy szacowany koszt implementacji lokalnej. Ten wskaznik jest z natury przyblizony, ale to jedyny jezyk, w ktorym rozmawia sie o budzecie.</li>' +
            '<li><strong>Dlug: liczba forkow i lokalnych duplikatow.</strong> Rosnaca liczba forkow jest wczesnym sygnalem, ze proces przyjmowania zgloszen jest zbyt wolny.</li>' +
            '</ul>' +
            '<h4>Dynamika organizacyjna</h4>' +
            '<p>Prawo Conwaya dziala tu bezlitosnie. Jesli zespol design systemu podlega pod jeden pion produktowy, komponenty tego pionu beda lepsze, a pozostale zespoly to zauwaza w ciagu kwartalu i zaczna sie dystansowac. Design system powinien raportowac do platformy albo do CTO, a nie do najglosniejszego konsumenta.</p>' +
            '<p>Finansowanie ma trzy modele: centralny budzet platformowy (najzdrowszy), chargeback per zespol (generuje polityke) i model bez budzetu, gdzie utrzymanie robi sie po godzinach (konczy sie zawsze tak samo). Jesli walczysz o pierwszy, uzbrój sie w metryki z poprzedniego akapitu.</p>' +
            '<h4>Rytualy, ktore realnie dzialaja</h4>' +
            '<ul>' +
            '<li><strong>Office hours</strong> dwa razy w tygodniu po 45 minut. Zamienia asynchroniczne pytania na Slacku w rozmowe i buduje relacje, ktore pozniej ratuja migracje.</li>' +
            '<li><strong>Design system guild</strong> - po jednym przedstawicielu na zespol, spotkanie co dwa tygodnie. To jest twoja siec dystrybucji informacji o breaking changes.</li>' +
            '<li><strong>RFC przed kodem</strong> dla wszystkiego, co dotyka publicznego API. Krotkie, dwie strony, z jawnie wymienionymi odrzuconymi opcjami.</li>' +
            '<li><strong>Publiczna roadmapa i kwartalny przeglad.</strong> Widocznosc kolejki znacznie obniza liczbe pytan kiedy to bedzie.</li>' +
            '</ul>' +
            '<h4>Antywzorce</h4>' +
            '<p>Zespol design systemu jako grupa recenzentow bez wlasnego kodu traci kompetencje i szacunek w ciagu roku. Rada architektoniczna spotykajaca sie raz w miesiacu, ktora blokuje merge, jest gwarancja forkow. I najczestszy blad: mierzenie sukcesu liczba komponentow. Liczba komponentow to koszt, a nie wynik - wynikiem jest adopcja i predkosc zespolow produktowych.</p>',
          en: '<p>At principal level, governance stops being a process and becomes the <strong>product strategy of an internal product</strong>. Your users are engineers who always have an alternative: write their own. Every governance decision is therefore a decision about whether they stay.</p>' +
            '<h4>Metrics that convince leadership</h4>' +
            '<ul>' +
            '<li><strong>Adoption coverage</strong> - the share of production UI components coming from the system. Measurable through an AST scan of repos or runtime telemetry. A realistic mature state is 60-80 percent.</li>' +
            '<li><strong>Time to first screen</strong> - how many days a new team needs to stand up a brand-compliant screen. Dropping from 10 days to 2 is a financial argument, not an aesthetic one.</li>' +
            '<li><strong>Time saved</strong> - component usage count times the estimated cost of a local implementation. Inherently approximate, but it is the only language budget conversations happen in.</li>' +
            '<li><strong>Debt: the number of forks and local duplicates.</strong> A rising fork count is the earliest signal that your intake process is too slow.</li>' +
            '</ul>' +
            '<h4>Organisational dynamics</h4>' +
            '<p>Conway law is merciless here. If the design system team reports into one product division, that division components will be better, the other teams will notice within a quarter and start distancing themselves. A design system should report into platform or to the CTO, not to its loudest consumer.</p>' +
            '<p>Funding has three shapes: a central platform budget (healthiest), per-team chargeback (breeds politics), and the no-budget model where maintenance happens after hours (always ends the same way). If you are fighting for the first one, arm yourself with the metrics from the previous paragraph.</p>' +
            '<h4>Rituals that genuinely work</h4>' +
            '<ul>' +
            '<li><strong>Office hours</strong> twice a week, 45 minutes. Turns asynchronous Slack questions into conversation and builds the relationships that later rescue migrations.</li>' +
            '<li><strong>A design system guild</strong> - one representative per team, meeting fortnightly. This is your distribution network for breaking change news.</li>' +
            '<li><strong>RFC before code</strong> for anything touching the public API. Short, two pages, with rejected options listed explicitly.</li>' +
            '<li><strong>A public roadmap and a quarterly review.</strong> Visible queues dramatically reduce the number of when-will-this-land questions.</li>' +
            '</ul>' +
            '<h4>Anti-patterns</h4>' +
            '<p>A design system team that only reviews and never writes code loses both competence and respect within a year. An architecture board meeting monthly with merge-blocking power is a fork guarantee. And the most common mistake: measuring success by component count. Component count is a cost, not an outcome - the outcome is adoption and product team velocity.</p>'
        }
      },
      quiz: [
        {
          q: {
            pl: 'Jaka jest glowna wada w pelni scentralizowanego modelu governance w duzej organizacji?',
            en: 'What is the main drawback of a fully centralised governance model in a large organisation?'
          },
          options: [
            { pl: 'Komponenty sa mniej spojne wizualnie', en: 'Components end up less visually consistent' },
            { pl: 'Zespol rdzenia staje sie waskim gardlem, wiec zespoly zaczynaja obchodzic system', en: 'The core team becomes a bottleneck, so teams start routing around the system' },
            { pl: 'Nie da sie w nim prowadzic testow wizualnych', en: 'Visual testing is impossible in it' },
            { pl: 'Wymaga monorepo', en: 'It requires a monorepo' }
          ],
          correct: 1,
          explain: {
            pl: 'Centralizacja daje najlepsza spojnosc, ale przy skali kolejka rosnie szybciej niz przepustowosc zespolu - i wtedy powstaja lokalne kopie.',
            en: 'Centralisation gives the best consistency, but at scale the queue grows faster than team throughput - and local copies appear.'
          }
        },
        {
          q: {
            pl: 'Zespol prosi o nowy komponent, ktorego potrzebuje tylko on. Najlepsza odpowiedz w modelu hybrydowym?',
            en: 'A team requests a new component only they need. Best response in a hybrid model?'
          },
          options: [
            { pl: 'Dodac go do systemu, bo kontrybucja jest zawsze dobra', en: 'Add it to the system, because contribution is always good' },
            { pl: 'Odmowic bez uzasadnienia, zeby chronic spojnosc', en: 'Refuse without explanation to protect consistency' },
            { pl: 'Poprosic o zbudowanie lokalnie i wrocic do tematu, gdy zglosza sie kolejne zespoly', en: 'Ask them to build it locally and revisit once more teams ask for it' },
            { pl: 'Przekazac sprawe radzie architektonicznej na nastepny miesiac', en: 'Escalate to the architecture board for next month' }
          ],
          correct: 2,
          explain: {
            pl: 'Zasada trzech zespolow chroni system przed rozrostem, a lokalna implementacja daje dowod, ze wzorzec jest realnie potrzebny.',
            en: 'The three-teams rule protects the system from bloat, and the local implementation provides evidence that the pattern is genuinely needed.'
          }
        },
        {
          q: {
            pl: 'Ktora metryka jest najgorszym miernikiem sukcesu design systemu?',
            en: 'Which metric is the worst measure of design system success?'
          },
          options: [
            { pl: 'Liczba komponentow w bibliotece', en: 'Number of components in the library' },
            { pl: 'Procent UI na produkcji pochodzacy z systemu', en: 'Share of production UI coming from the system' },
            { pl: 'Czas potrzebny nowemu zespolowi na pierwszy zgodny ekran', en: 'Time for a new team to build their first compliant screen' },
            { pl: 'Liczba lokalnych forkow komponentow', en: 'Number of local component forks' }
          ],
          correct: 0,
          explain: {
            pl: 'Kazdy komponent to koszt utrzymania, dokumentacji i testow. Sukcesem jest adopcja i predkosc zespolow, a nie rozmiar katalogu.',
            en: 'Every component is maintenance, documentation and test cost. Success is adoption and team velocity, not catalogue size.'
          }
        },
        {
          q: {
            pl: 'Zespol design systemu raportuje do jednego pionu produktowego. Jaki jest najbardziej prawdopodobny skutek w ciagu roku?',
            en: 'The design system team reports into a single product division. What is the most likely outcome within a year?'
          },
          options: [
            { pl: 'Lepsza jakosc kodu, bo zespol ma jasnego wlasciciela', en: 'Better code quality, because the team has a clear owner' },
            { pl: 'Priorytety przechylaja sie ku temu pionowi, a pozostale zespoly zaczynaja budowac wlasne komponenty', en: 'Priorities tilt toward that division and the other teams start building their own components' },
            { pl: 'Zadnej roznicy, struktura raportowania nie wplywa na architekture', en: 'No difference, reporting structure does not affect architecture' },
            { pl: 'Wzrost adopcji, bo pion bedzie promowal system', en: 'Higher adoption, because the division will promote the system' }
          ],
          correct: 1,
          explain: {
            pl: 'To klasyczne prawo Conwaya: struktura finansowania i raportowania przeklada sie na to, czyje potrzeby ladują w roadmapie - i kto zostanie z systemem.',
            en: 'Classic Conway law: funding and reporting structure decides whose needs land on the roadmap - and who stays with the system.'
          }
        }
      ]
    }
  ]
};
