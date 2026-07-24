import { HERO_TRUST_ITEMS } from "@/lib/hero-home-content";

function TrustIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2v20" />
        <path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3 5 1.2 5 3-2.2 3-5 3-5-1.1-5-3" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
        <path d="M20 14v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
        <path d="M12 19h2a2 2 0 0 0 2-2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
      className="border-y border-stone-200/90 bg-white py-6 sm:py-7"
      data-testid="hero-trust-ribbon"
    >
      <ul className="grid gap-6 sm:grid-cols-3 sm:gap-0">
        {HERO_TRUST_ITEMS.map((item, index) => (
          <li
            key={item.title}
            className={`flex items-start gap-3.5 sm:px-8 ${
              index > 0 ? "sm:border-l sm:border-stone-200" : ""
            }`}
          >
            <span className="mt-0.5 text-teal-800" aria-hidden>
              <TrustIcon index={index} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-extrabold tracking-tight text-[#0a1628] sm:text-[0.95rem]">
                {item.title}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-[#1c1917]">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
