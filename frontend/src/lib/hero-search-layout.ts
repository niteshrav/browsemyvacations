export const HERO_SEARCH_ARIA_LABEL = "Search by city or package";

/** Unified pill search: input + button in one shell. */
export function heroSearchFormClassName(): string {
  return "mx-auto mt-3 flex w-full max-w-xl items-center gap-1 rounded-full border border-teal-100 bg-[#eef7f5] p-1.5 shadow-[0_4px_16px_rgba(15,23,42,0.04)] focus-within:border-teal-500/40 focus-within:bg-white focus-within:shadow-[0_10px_28px_rgba(15,118,110,0.1)] lg:mx-0";
}

export function heroSearchButtonClassName(): string {
  return "shrink-0 rounded-full bg-[#0b5c56] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:px-6 sm:py-2.5";
}

export function heroSearchInputShellClassName(): string {
  return "relative min-w-0 flex-1";
}

export function heroSearchInputClassName(): string {
  return "w-full border-0 bg-transparent py-2.5 pr-3 pl-10 text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none";
}
