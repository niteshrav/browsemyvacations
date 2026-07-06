export const HERO_FLANK_TOGGLE_STORAGE_KEY = "bmv-hero-flank-visible";

export const HERO_FLANK_TOGGLE_HIDE_LABEL = "Hide Rajasthan inspiration";
export const HERO_FLANK_TOGGLE_SHOW_LABEL = "Show Rajasthan inspiration";
export const HERO_FLANK_SHUFFLE_LABEL = "Shuffle Rajasthan inspiration photos";

export function readHeroFlankVisiblePreference(storedValue: string | null): boolean {
  return storedValue !== "0";
}

export function serializeHeroFlankVisiblePreference(visible: boolean): string {
  return visible ? "1" : "0";
}

export function heroFlankToggleButtonClassName(): string {
  return "mt-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm transition hover:border-teal-200 hover:text-teal-800";
}
