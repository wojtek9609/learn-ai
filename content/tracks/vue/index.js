// Track: Vue 3 in practice - full course.
// Written for a developer who already ships Vue daily: internals, patterns,
// edge cases. Adding a module = add the file and one import below.

import m01 from './module-01-reactivity-fundamentals.js';
import m02 from './module-02-composition-api-mastery.js';
import m03 from './module-03-components-in-depth.js';
import m04 from './module-04-reactivity-internals.js';
import m05 from './module-05-state-routing-nuxt.js';
import m06 from './module-06-performance-testing.js';

const modules = [m01, m02, m03, m04, m05, m06]
  .filter(Boolean)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

export default {
  id: 'vue',
  order: 3,
  icon: '🟢',
  status: 'available',
  title: { pl: 'Vue 3 w praktyce', en: 'Vue 3 in practice' },
  description: {
    pl: 'Composition API, reaktywnosc od srodka, wzorce komponentow, Pinia, Nuxt i testy - Vue 3 tak, jak pisze sie je w duzych produktach, z naciskiem na przypadki brzegowe.',
    en: 'Composition API, reactivity internals, component patterns, Pinia, Nuxt and testing - Vue 3 the way it is written in large products, edge cases included.',
  },
  modules,
  planned: [],
};
