import { findHomeQuickPickByCity, findHomeQuickPickBySlug } from "@bmv/shared";
import type { Suggestion } from "@/types/discovery";

export function quickPickScrollerClassName(): string {
  return "flex w-full gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
}

export function quickPickCardClassName(): string {
  return "group flex w-[7rem] shrink-0 snap-center flex-col items-center gap-3 no-underline transition duration-300 hover:-translate-y-1";
}

export function quickPickThumbClassName(): string {
  return "relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/80 bg-stone-100 shadow-[0_10px_30px_rgba(15,118,110,0.18)] ring-1 ring-teal-100/80 backdrop-blur-sm transition duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_36px_rgba(15,118,110,0.28)] group-hover:ring-teal-300";
}

export function quickPickLabelClassName(): string {
  return "text-center text-xs font-semibold leading-tight text-teal-900 transition group-hover:text-teal-700";
}

export function quickPickShellClassName(): string {
  return "relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 px-4 py-5 shadow-[0_12px_40px_rgba(28,25,23,0.08)] backdrop-blur-md sm:px-6";
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
