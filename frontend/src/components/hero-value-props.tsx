import { HERO_VALUE_PROPS } from "@/lib/hero-home-content";

const VALUE_ICONS = [
  "M12 3.5 13.2 8H18l-3.8 2.8L15.5 16 12 13.4 8.5 16l1.3-5.2L6 8h4.8L12 3.5Z",
  "M7 4v2M17 4v2M5 9h14M6 6h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  "M12 3.5 19 6.5v5.2c0 4.2-2.9 7.9-7 8.8-4.1-.9-7-4.6-7-8.8V6.5L12 3.5Z",
] as const;

export function HeroValueProps() {
  return (
    <ul
      className="mx-auto mt-9 grid max-w-xl gap-3 text-left sm:grid-cols-3 sm:gap-4 lg:mx-0 lg:max-w-none"
      data-testid="hero-value-props"
    >
      {HERO_VALUE_PROPS.map((item, index) => (
        <li
          key={item.title}
          className="flex min-w-0 items-start gap-3 rounded-2xl bg-white/90 px-3 py-2.5 shadow-[0_4px_18px_rgba(15,23,42,0.08)] backdrop-blur-sm ring-1 ring-stone-900/5"
        >
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a4f4a] text-white shadow-sm"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={VALUE_ICONS[index] ?? VALUE_ICONS[0]} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-snug tracking-tight text-[#0a1628]">
              {item.title}
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-[#1c1917]">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
