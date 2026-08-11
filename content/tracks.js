// Track registry. Adding a new track = create content/tracks/<id>/index.js
// and add ONE import line plus one array entry below. Nothing else changes.

import aiEngineer from './tracks/ai-engineer/index.js';
import react from './tracks/react/index.js';
import vue from './tracks/vue/index.js';
import frontendArchitecture from './tracks/frontend-architecture/index.js';

export const TRACKS = [aiEngineer, react, vue, frontendArchitecture]
  .filter(Boolean)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

export const DEFAULT_TRACK_ID = 'ai-engineer';

export function isAvailable(track) {
  return Boolean(track) && track.status === 'available' && (track.modules || []).length > 0;
}

export function availableTracks() {
  return TRACKS.filter(isAvailable);
}

export function getTrack(trackId) {
  return TRACKS.find((tr) => tr.id === trackId) || null;
}

export function getModule(trackId, moduleId) {
  const track = getTrack(trackId);
  if (!track) return null;
  const mod = (track.modules || []).find((m) => m.id === moduleId);
  return mod ? { track, module: mod } : null;
}

export function getLesson(trackId, moduleId, lessonId) {
  const found = getModule(trackId, moduleId);
  if (!found) return null;
  const lesson = (found.module.lessons || []).find((l) => l.id === lessonId);
  return lesson ? { track: found.track, module: found.module, lesson } : null;
}

// Flat, ordered list of every lesson in a track: [{ track, module, lesson }]
export function trackLessons(trackId) {
  const track = getTrack(trackId);
  if (!track) return [];
  const out = [];
  for (const mod of track.modules || []) {
    for (const lesson of mod.lessons || []) out.push({ track, module: mod, lesson });
  }
  return out;
}

export function trackModuleCount(trackId) {
  const track = getTrack(trackId);
  return track ? (track.modules || []).length : 0;
}

export default TRACKS;
