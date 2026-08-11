// Track: Frontend Architecture - full course, senior -> principal level.
// Adding a module = drop the file next to this one and add one import below.

import m01 from './module-01-architecture-thinking.js';
import m02 from './module-02-design-systems-at-scale.js';
import m03 from './module-03-state-and-data-architecture.js';
import m04 from './module-04-scaling-codebases.js';
import m05 from './module-05-performance-architecture.js';
import m06 from './module-06-quality-delivery-leadership.js';

const modules = [m01, m02, m03, m04, m05, m06]
  .filter(Boolean)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

export default {
  id: 'frontend-architecture',
  order: 4,
  icon: '🏗️',
  status: 'available',
  title: { pl: 'Architektura Frontendu', en: 'Frontend Architecture' },
  description: {
    pl: 'Decyzje, ktore zyja lata: granice i ADR-y, design systemy w skali, architektura stanu, monorepo i micro-frontendy, budzety wydajnosci oraz jakosc i dostarczanie.',
    en: 'The decisions that live for years: boundaries and ADRs, design systems at scale, state architecture, monorepos and micro-frontends, performance budgets, plus quality and delivery.',
  },
  modules,
  planned: [],
};
