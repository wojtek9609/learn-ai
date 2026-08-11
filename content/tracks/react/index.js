// Track: React for Vue devs (mock, coming soon).
// Every concept is taught side-by-side with its Vue 3 equivalent.

export default {
  id: 'react',
  order: 2,
  icon: '🔵',
  status: 'coming-soon',
  title: { pl: 'React (dla znajacych Vue)', en: 'React (for Vue devs)' },
  description: {
    pl: 'React od zera, ale kazde pojecie obok jego odpowiednika z Vue 3. Zamiast uczyc sie od nowa, mapujesz to, co juz umiesz.',
    en: 'React from scratch, with every concept next to its Vue 3 equivalent. Instead of relearning, you map what you already know.',
  },
  modules: [],
  planned: [
    {
      title: { pl: 'Model mentalny: re-render vs reaktywnosc', en: 'Mental model: re-render vs reactivity' },
      description: {
        pl: 'Dlaczego komponent Reacta wykonuje sie caly od nowa, a komponent Vue tylko raz. Proxy i zaleznosci Vue kontra funkcja renderujaca Reacta - i co z tego wynika dla kazdej linijki kodu, ktora napiszesz.',
        en: 'Why a React component re-runs entirely while a Vue component runs once. Vue proxies and dependency tracking versus React render functions - and what that implies for every line you write.',
      },
    },
    {
      title: { pl: 'Stan: ref/reactive kontra useState/useReducer', en: 'State: ref/reactive vs useState/useReducer' },
      description: {
        pl: 'ref, reactive, shallowRef obok useState i useReducer. Niemutowalnosc jako kontrakt, batching aktualizacji, pulapka stale closure i dlaczego w Reactie nie ma .value.',
        en: 'ref, reactive and shallowRef next to useState and useReducer. Immutability as a contract, update batching, the stale-closure trap, and why React has no .value.',
      },
    },
    {
      title: { pl: 'Pochodne i efekty: computed/watch kontra useMemo/useEffect', en: 'Derived state and effects: computed/watch vs useMemo/useEffect' },
      description: {
        pl: 'computed to nie useMemo, a watch to nie useEffect - poznasz roznice na przykladach, ktore boli. Tablice zaleznosci, sprzatanie efektow i reguly hookow bez magii.',
        en: 'computed is not useMemo and watch is not useEffect - you learn the differences on examples that actually bite. Dependency arrays, cleanup, and the rules of hooks demystified.',
      },
    },
    {
      title: { pl: 'Kompozycja komponentow: sloty kontra children i render props', en: 'Component composition: slots vs children and render props' },
      description: {
        pl: 'Sloty nazwane i scoped przelozone na children, komponenty w propsach i render props. Props drilling, provide/inject kontra Context oraz kiedy kompozycja bije konfiguracje.',
        en: 'Named and scoped slots translated to children, component props and render props. Prop drilling, provide/inject versus Context, and when composition beats configuration.',
      },
    },
    {
      title: { pl: 'Stan globalny i dane: Pinia kontra Zustand i TanStack Query', en: 'Global state and data: Pinia vs Zustand and TanStack Query' },
      description: {
        pl: 'Store bez boilerplate: Pinia obok Zustand i Redux Toolkit. Osobno stan serwera - TanStack Query kontra useFetch/Nuxt, cache, invalidacja i optimistic updates.',
        en: 'Stores without boilerplate: Pinia next to Zustand and Redux Toolkit. Server state kept separate - TanStack Query versus useFetch/Nuxt, caching, invalidation and optimistic updates.',
      },
    },
    {
      title: { pl: 'Ekosystem i produkcja: Next.js kontra Nuxt, testy, wydajnosc', en: 'Ecosystem and production: Next.js vs Nuxt, testing, performance' },
      description: {
        pl: 'Routing, SSR i server components obok Nuxt. Testy w Vitest i Testing Library dla obu bibliotek, profilowanie renderow, memo/key i realna migracja projektu Vue na React.',
        en: 'Routing, SSR and server components next to Nuxt. Vitest and Testing Library for both libraries, render profiling, memo/key, and a real Vue-to-React project migration.',
      },
    },
  ],
};
