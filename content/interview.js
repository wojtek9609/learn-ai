// Interview question banks. One bank per track, static imports only.
// Adding a bank = create content/tracks/<id>/interview.js and add ONE import
// line plus one entry in INTERVIEW_BANKS below.

import aiEngineer from './tracks/ai-engineer/interview.js';
import react from './tracks/react/interview.js';
import vue from './tracks/vue/interview.js';
import frontendArchitecture from './tracks/frontend-architecture/interview.js';

export const INTERVIEW_BANKS = {
  'ai-engineer': aiEngineer,
  react: react,
  vue: vue,
  'frontend-architecture': frontendArchitecture,
};

// Ids of the banks that actually carry questions - the only ones worth offering.
export function interviewTrackIds() {
  return Object.keys(INTERVIEW_BANKS).filter((id) => {
    const bank = INTERVIEW_BANKS[id];
    return Boolean(bank) && Array.isArray(bank.questions) && bank.questions.length > 0;
  });
}

export function getInterviewBank(trackId) {
  const bank = INTERVIEW_BANKS[trackId];
  return bank && Array.isArray(bank.questions) ? bank : null;
}

export default INTERVIEW_BANKS;
