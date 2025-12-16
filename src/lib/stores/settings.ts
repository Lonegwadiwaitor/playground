import { writable, get } from 'svelte/store';

export type LuauMode = 'strict' | 'nonstrict' | 'nocheck';
export type SolverMode = 'new' | 'old';

export interface PlaygroundSettings {
  mode: LuauMode;
  solver: SolverMode;
}

const STORAGE_KEY = 'luau-playground-settings';

function loadSettings(): PlaygroundSettings {
  if (typeof window === 'undefined') {
    return { mode: 'strict', solver: 'new' };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<PlaygroundSettings>;
      return {
        mode: parsed.mode ?? 'strict',
        solver: parsed.solver ?? 'new',
      };
    }
  } catch {
    // Ignore parse errors
  }
  
  return { mode: 'nonstrict', solver: 'new' };
}

function saveSettings(settings: PlaygroundSettings): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}

const initialSettings = loadSettings();

export const settings = writable<PlaygroundSettings>(initialSettings);

// Auto-save settings when they change
settings.subscribe((value) => {
  saveSettings(value);
});

export function setMode(mode: LuauMode): void {
  settings.update((s) => ({ ...s, mode }));
}

export function setSolver(solver: SolverMode): void {
  settings.update((s) => ({ ...s, solver }));
}

export function getSettings(): PlaygroundSettings {
  return get(settings);
}

