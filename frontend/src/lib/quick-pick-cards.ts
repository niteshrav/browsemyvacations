import { findHomeQuickPickByCity, findHomeQuickPickBySlug } from "@bmv/shared";
import type { Suggestion } from "@/types/discovery";

export function quickPickScrollerClassName(): string {
  return "mt-4 flex gap-4 overflow-x-auto px-1 pb-3 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
}

export function quickPickCardClassName(): string {
  return "flex w-[4.75rem] shrink-0 snap-center flex-col items-center gap-2 no-underline";
}

export function quickPickThumbClassName(): string {
  return "relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-teal-100 bg-stone-100 shadow-sm transition hover:border-teal-300 hover:shadow-md";
}

export function quickPickLabelClassName(): string {
  return "text-center text-[11px] font-semibold leading-tight text-teal-900";
}

export function resolveQuickPickForSuggestion(suggestion: Suggestion) {
  if (suggestion.destinationSlug) {
    return findHomeQuickPickBySlug(suggestion.destinationSlug);
  }
  return findHomeQuickPickByCity(suggestion.label);
}

export function quickPickImageAlt(city: string): string {
  return `${city}, Rajasthan`;
}
