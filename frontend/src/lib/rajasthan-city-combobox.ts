import { findRajasthanCityByName } from "@bmv/shared";

export function shouldShowRajasthanCityList(isOpen: boolean, suggestionCount: number): boolean {
  return isOpen && suggestionCount > 0;
}

export function resolveCitySelection(query: string, suggestions: string[]): string | null {
  const exact = findRajasthanCityByName(query);
  if (exact) return exact;
  if (suggestions.length === 1) return suggestions[0] ?? null;
  return null;
}

/** Keeps the input shell a single row; suggestions render in an overlay. */
export function rajasthanCityComboboxInputShellClassName(): string {
  return "relative w-full rounded-lg border border-stone-300 bg-white shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200";
}

export function rajasthanCitySuggestionsListClassName(): string {
  return "absolute left-0 right-0 top-full z-20 mt-1 max-h-44 overflow-y-auto rounded-lg border border-stone-200 bg-white py-1 shadow-lg";
}
