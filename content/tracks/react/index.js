// Track: React for Vue devs - full course.
// Every concept is taught side-by-side with its Vue 3 equivalent.
// Adding a module = drop the file next to this one and add one import below.

import m01 from './module-01-mental-model.js';
import m02 from './module-02-hooks-vs-composition.js';
import m03 from './module-03-component-patterns.js';
import m04 from './module-04-state-and-data.js';
import m05 from './module-05-frameworks-rsc.js';
import m06 from './module-06-perf-testing-migration.js';

const modules = [m01, m02, m03, m04, m05, m06]
  .filter(Boolean)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

export default {
  id: 'react',
  order: 2,
  icon: '🔵',
  status: 'available',
  title: { pl: 'React (dla znających Vue)', en: 'React (for Vue devs)' },
  description: {
    pl: 'Cały React obok jego odpowiednika z Vue 3: model renderowania, hooki kontra Composition API, wzorce komponentów, stan, Next.js i migracja. Zamiast uczyć się od nowa, mapujesz to, co już umiesz.',
    en: 'All of React next to its Vue 3 equivalent: the rendering model, hooks versus the Composition API, component patterns, state, Next.js and migration. Instead of relearning, you map what you already know.',
  },
  modules,
  planned: [],
};
