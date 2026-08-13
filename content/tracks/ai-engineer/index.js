// Track: AI Engineer - the full "senior frontend -> applied AI" curriculum.
// Adding a module = drop the file next to this one and add one import below.

import m01 from './module-01-llm-fundamentals.js';
import m02 from './module-02-structured-tools.js';
import m03 from './module-03-rag.js';
import m04 from './module-04-agents.js';
import m05 from './module-05-evals.js';
import m06 from './module-06-streaming-ux.js';
import m07 from './module-07-security.js';
import m08 from './module-08-python.js';
import m09 from './module-09-cloud-infrastructure.js';

const modules = [m01, m02, m03, m04, m05, m06, m07, m08, m09]
  .filter(Boolean)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

export default {
  id: 'ai-engineer',
  order: 1,
  icon: '🤖',
  status: 'available',
  title: { pl: 'AI Engineer', en: 'AI Engineer' },
  description: {
    pl: 'Kompletna ścieżka od seniora frontendu do inżyniera AI: LLM, structured output, RAG, agenci, evale, streaming UX, bezpieczeństwo, Python oraz chmura i infrastruktura.',
    en: 'The complete path from senior frontend to applied AI: LLMs, structured output, RAG, agents, evals, streaming UX, security, Python, and cloud & infrastructure.',
  },
  modules,
  planned: [],
};
