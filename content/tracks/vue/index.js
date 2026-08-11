// Track: Vue 3 in practice (mock, coming soon).

export default {
  id: 'vue',
  order: 3,
  icon: '🟢',
  status: 'coming-soon',
  title: { pl: 'Vue 3 w praktyce', en: 'Vue 3 in practice' },
  description: {
    pl: 'Composition API, srodek reaktywnosci, wzorce komponentow, Pinia i testy - Vue 3 tak, jak pisze sie je w duzych produktach.',
    en: 'Composition API, reactivity internals, component patterns, Pinia and testing - Vue 3 the way it is written in large products.',
  },
  modules: [],
  planned: [
    {
      title: { pl: 'Composition API bez skrotow', en: 'Composition API in full' },
      description: {
        pl: 'script setup, ref kontra reactive, cykl zycia, typowanie propsow i emitow w TypeScript. Kiedy composable, a kiedy zwykla funkcja - i jak nie zrobic z tego drugiego Vuexa.',
        en: 'script setup, ref versus reactive, lifecycle, typed props and emits in TypeScript. When a composable beats a plain function - and how not to reinvent Vuex.',
      },
    },
    {
      title: { pl: 'Reaktywnosc od srodka', en: 'Reactivity internals' },
      description: {
        pl: 'Proxy, effect, sledzenie zaleznosci i kolejka aktualizacji. Dlaczego reaktywnosc czasem "gubi sie" przy destrukturyzacji i jak toRefs, shallowRef i markRaw ratuja wydajnosc.',
        en: 'Proxies, effects, dependency tracking and the update queue. Why reactivity seems to "break" on destructuring, and how toRefs, shallowRef and markRaw rescue performance.',
      },
    },
    {
      title: { pl: 'Wzorce komponentow', en: 'Component patterns' },
      description: {
        pl: 'Sloty scoped, komponenty headless, v-model na wlasnych komponentach, Teleport i Suspense. Projektowanie API komponentu, ktore przetrwa piecdziesieciu konsumentow.',
        en: 'Scoped slots, headless components, v-model on your own components, Teleport and Suspense. Designing a component API that survives fifty consumers.',
      },
    },
    {
      title: { pl: 'Pinia i architektura stanu', en: 'Pinia and state architecture' },
      description: {
        pl: 'Stores w stylu setup, gettery, akcje asynchroniczne, pluginy i persystencja. Granica miedzy stanem serwera a stanem UI oraz SSR-safe store w Nuxt.',
        en: 'Setup-style stores, getters, async actions, plugins and persistence. The line between server state and UI state, plus SSR-safe stores in Nuxt.',
      },
    },
    {
      title: { pl: 'Testy i jakosc', en: 'Testing and quality' },
      description: {
        pl: 'Vitest, Vue Test Utils i Testing Library: testowanie zachowan zamiast implementacji. Mockowanie composables, testy store i szybkie testy e2e w Playwright.',
        en: 'Vitest, Vue Test Utils and Testing Library: testing behavior instead of implementation. Mocking composables, store tests and fast Playwright e2e.',
      },
    },
    {
      title: { pl: 'Wydajnosc i produkcja', en: 'Performance and production' },
      description: {
        pl: 'Lazy loading tras, dzielenie bundla w Vite, wirtualizacja dlugich list, Core Web Vitals i profilowanie w Vue DevTools. Migracja z Options API i z Vue 2.',
        en: 'Route-level lazy loading, Vite bundle splitting, long-list virtualization, Core Web Vitals and Vue DevTools profiling. Migrating from Options API and from Vue 2.',
      },
    },
  ],
};
