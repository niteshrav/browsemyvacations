export const HERO_SEARCH_ARIA_LABEL = "Search by city or package";

/** Unified pill search: input + button in one shell. */
export function heroSearchFormClassName(): string {
  return "mx-auto mt-8 flex w-full max-w-xl items-center gap-1 rounded-full border border-stone-200/80 bg-white/95 p-1.5 shadow-[0_10px_36px_rgba(28,25,23,0.12)] backdrop-blur-sm focus-within:border-teal-600/45 focus-within:shadow-[0_12px_40px_rgba(15,118,110,0.14)] lg:mx-0";
}

export function heroSearchButtonClassName(): string {
  return "shrink-0 rounded-full bg-teal-800 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
}

export function heroSearchInputShellClassName(): string {
  return "relative min-w-0 flex-1";
}

export function heroSearchInputClassName(): string {
  return "w-full border-0 bg-transparent py-2.5 pr-3 pl-10 text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none";
}
