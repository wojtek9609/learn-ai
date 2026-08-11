// Track: Frontend Architecture (mock, coming soon).

export default {
  id: 'frontend-architecture',
  order: 4,
  icon: '🏗️',
  status: 'coming-soon',
  title: { pl: 'Architektura Frontendu', en: 'Frontend Architecture' },
  description: {
    pl: 'Decyzje, ktore zyja lata: design systemy w skali, monorepo, micro-frontendy, architektura stanu, budzety wydajnosci i ADR-y.',
    en: 'The decisions that live for years: design systems at scale, monorepos, micro-frontends, state architecture, performance budgets and ADRs.',
  },
  modules: [],
  planned: [
    {
      title: { pl: 'Design system w skali', en: 'Design systems at scale' },
      description: {
        pl: 'Tokeny, warstwy prymitywow i wzorcow, wersjonowanie i deprecjacje, dokumentacja jako produkt. Jak utrzymac spojnosc, gdy komponent ma pieciudziesieciu konsumentow.',
        en: 'Tokens, primitive and pattern layers, versioning and deprecations, docs as a product. Keeping consistency when a component has fifty consumers.',
      },
    },
    {
      title: { pl: 'Monorepo i granice pakietow', en: 'Monorepos and package boundaries' },
      description: {
        pl: 'pnpm workspaces, Turborepo i Nx, cache buildow, wersjonowanie z Changesets. Gdzie postawic granice pakietow, zeby CI nie trwalo godziny.',
        en: 'pnpm workspaces, Turborepo and Nx, build caching, versioning with Changesets. Where to draw package boundaries so CI does not take an hour.',
      },
    },
    {
      title: { pl: 'Micro-frontendy - i kiedy ich nie robic', en: 'Micro-frontends - and when not to' },
      description: {
        pl: 'Module Federation, kompozycja na brzegu, web components jako spoiwo. Realny koszt: wersje zaleznosci, routing, autoryzacja i wspolny design system.',
        en: 'Module Federation, edge composition, web components as glue. The real cost: dependency versions, routing, auth and a shared design system.',
      },
    },
    {
      title: { pl: 'Architektura stanu i danych', en: 'State and data architecture' },
      description: {
        pl: 'Stan serwera, stan URL, stan UI i stan sesji jako cztery osobne swiaty. Cache, invalidacja, offline i optimistic updates bez pajeczyny zaleznosci.',
        en: 'Server state, URL state, UI state and session state as four separate worlds. Caching, invalidation, offline and optimistic updates without a dependency web.',
      },
    },
    {
      title: { pl: 'Wydajnosc jako budzet', en: 'Performance as a budget' },
      description: {
        pl: 'Core Web Vitals w CI, budzety rozmiaru bundla, RUM i profilowanie na prawdziwych urzadzeniach. Jak rozmawiac z produktem o kosztach wydajnosci.',
        en: 'Core Web Vitals in CI, bundle-size budgets, RUM and profiling on real devices. How to talk to product about the cost of performance.',
      },
    },
    {
      title: { pl: 'ADR-y i podejmowanie decyzji', en: 'ADRs and decision making' },
      description: {
        pl: 'Pisanie Architecture Decision Records, ktore ktos przeczyta. RFC, spike, prototyp, wybor dostawcy i uczciwe zarzadzanie dlugiem technicznym.',
        en: 'Writing Architecture Decision Records someone will actually read. RFCs, spikes, prototypes, vendor choice and honest technical-debt management.',
      },
    },
  ],
};
