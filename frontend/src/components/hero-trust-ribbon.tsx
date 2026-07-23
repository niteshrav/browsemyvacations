import { HERO_TRUST_ITEMS } from "@/lib/hero-home-content";

function TrustIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2v20" />
        <path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3 5 1.2 5 3-2.2 3-5 3-5-1.1-5-3" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
        <path d="M20 14v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
        <path d="M12 19h2a2 2 0 0 0 2-2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7h11" />
      <circle cx="18" cy="7" r="2.5" />
      <path d="M20 17H9" />
      <circle cx="6" cy="17" r="2.5" />
    </svg>
  );
}

export function HeroTrustRibbon() {
  return (
    <div
      className="mt-4 rounded-2xl border border-stone-200/80 bg-gradient-to-r from-stone-50 via-white to-teal-50/40 px-4 py-5 sm:px-6 sm:py-6"
      data-testid="hero-trust-ribbon"
    >
      <ul className="grid gap-5 sm:grid-cols-3 sm:gap-0">
        {HERO_TRUST_ITEMS.map((item, index) => (
          <li
            key={item.title}
            className={`flex items-start gap-3.5 sm:px-6 ${
              index > 0 ? "sm:border-l sm:border-stone-200/80" : ""
            } ${index === 0 ? "sm:pl-1" : ""} ${index === HERO_TRUST_ITEMS.length - 1 ? "sm:pr-1" : ""}`}
          >
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-700/15 bg-white text-teal-800 shadow-sm"
              aria-hidden
            >
              <TrustIcon index={index} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="font-serif text-[0.95rem] font-semibold tracking-tight text-teal-950 sm:text-base">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-snug text-stone-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
