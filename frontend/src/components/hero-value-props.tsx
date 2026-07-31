import { HERO_VALUE_PROPS } from "@/lib/hero-home-content";

const VALUE_ICONS = [
  "M12 3.5 13.2 8H18l-3.8 2.8L15.5 16 12 13.4 8.5 16l1.3-5.2L6 8h4.8L12 3.5Z",
  "M7 4v2M17 4v2M5 9h14M6 6h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  "M12 3.5 19 6.5v5.2c0 4.2-2.9 7.9-7 8.8-4.1-.9-7-4.6-7-8.8V6.5L12 3.5Z",
] as const;

export function HeroValueProps() {
  return (
    <ul
      className="mx-auto mt-4 grid max-w-xl gap-2 text-left sm:grid-cols-3 sm:gap-2.5 lg:mx-0 lg:max-w-none"
      data-testid="hero-value-props"
    >
      {HERO_VALUE_PROPS.map((item, index) => (
        <li
          key={item.title}
          className="flex min-w-0 items-center gap-2 rounded-xl bg-white/90 px-2.5 py-1.5 shadow-[0_3px_12px_rgba(15,23,42,0.07)] backdrop-blur-sm ring-1 ring-stone-900/5"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a4f4a] text-white shadow-sm"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={VALUE_ICONS[index] ?? VALUE_ICONS[0]} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-xs font-extrabold leading-tight tracking-tight text-[#0a1628]">
              {item.title}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#1c1917]">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
