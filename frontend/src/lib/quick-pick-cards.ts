import { findHomeQuickPickByCity, findHomeQuickPickBySlug } from "@bmv/shared";
import type { Suggestion } from "@/types/discovery";

export function quickPickScrollerClassName(): string {
  return "flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
}

export function quickPickCardClassName(): string {
  return "flex w-[6.25rem] shrink-0 snap-center flex-col items-center gap-2.5 no-underline";
}

export function quickPickThumbClassName(): string {
  return "relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-teal-100 bg-stone-100 shadow-sm transition hover:border-teal-300 hover:shadow-md";
}

export function quickPickLabelClassName(): string {
  return "text-center text-xs font-semibold leading-tight text-teal-900";
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
