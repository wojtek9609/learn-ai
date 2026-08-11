// Track: React vs Vue (mock, coming soon).

export default {
  id: 'react-vs-vue',
  order: 4,
  icon: '⚖️',
  status: 'coming-soon',
  title: { pl: 'React vs Vue', en: 'React vs Vue' },
  description: {
    pl: 'Uczciwe porownanie dwoch paradygmatow: co naprawde je rozni, kiedy wybrac ktory i jak migrowac projekt bez przepisywania wszystkiego.',
    en: 'An honest comparison of two paradigms: what really separates them, when to pick which, and how to migrate a project without a rewrite.',
  },
  modules: [],
  planned: [
    {
      title: { pl: 'Dwa paradygmaty renderowania', en: 'Two rendering paradigms' },
      description: {
        pl: 'Re-render sterowany komponentem kontra reaktywnosc sledzaca zaleznosci. Ta jedna roznica tlumaczy 80 procent pozostalych - od hookow po sloty.',
        en: 'Component-driven re-rendering versus dependency-tracked reactivity. This single difference explains 80 percent of the rest - from hooks to slots.',
      },
    },
    {
      title: { pl: 'Slownik tlumaczen 1:1', en: 'A 1:1 translation dictionary' },
      description: {
        pl: 'Tabela, ktora chcialbys miec pierwszego dnia: ref/useState, computed/useMemo, watch/useEffect, sloty/children, provide-inject/Context, Pinia/Zustand, Nuxt/Next.',
        en: 'The table you wish you had on day one: ref/useState, computed/useMemo, watch/useEffect, slots/children, provide-inject/Context, Pinia/Zustand, Nuxt/Next.',
      },
    },
    {
      title: { pl: 'Wydajnosc: mity kontra pomiary', en: 'Performance: myths versus measurements' },
      description: {
        pl: 'Rozmiar bundla, czas hydracji, koszt aktualizacji duzych list. Gdzie memoizacja Reacta kosztuje wiecej, niz daje, a gdzie reaktywnosc Vue placi za siebie.',
        en: 'Bundle size, hydration time, the cost of updating large lists. Where React memoization costs more than it saves, and where Vue reactivity pays for itself.',
      },
    },
    {
      title: { pl: 'Jak wybrac: decyzja architektoniczna', en: 'How to choose: the architecture decision' },
      description: {
        pl: 'Kryteria, ktore naprawde wazne: zespol, design system, SSR, mobile, dojrzalosc ekosystemu. Gotowy szablon ADR i cwiczenie na realnym przypadku.',
        en: 'The criteria that actually matter: team, design system, SSR, mobile, ecosystem maturity. A ready ADR template and an exercise on a real case.',
      },
    },
    {
      title: { pl: 'Strategie migracji', en: 'Migration strategies' },
      description: {
        pl: 'Wspolistnienie przez web components i micro-frontendy, migracja strangler fig, wspoldzielone tokeny designu. Co migrowac najpierw, a czego nie ruszac.',
        en: 'Coexistence via web components and micro-frontends, strangler-fig migration, shared design tokens. What to migrate first and what to leave alone.',
      },
    },
    {
      title: { pl: 'Rynek pracy i rozwoj kariery', en: 'Hiring market and career growth' },
      description: {
        pl: 'Jak wygladaja oferty, rekrutacje i widelki dla obu ekosystemow w Polsce i zdalnie. Jak sprzedac znajomosc obu i przygotowac sie na rozmowe z kazdej strony.',
        en: 'What job posts, interviews and salary bands look like in both ecosystems, locally and remote. How to sell knowing both and prepare for either interview.',
      },
    },
  ],
};
