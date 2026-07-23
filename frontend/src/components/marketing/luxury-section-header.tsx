import type { ReactNode } from "react";
import { FadeUp } from "./fade-up";

type LuxurySectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function LuxurySectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  children,
}: LuxurySectionHeaderProps) {
  return (
    <FadeUp className={`mx-auto max-w-3xl text-center ${className}`}>
      <div className="mb-4 flex items-center justify-center gap-3 text-teal-700/70" aria-hidden>
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-teal-600/70 sm:w-16" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-teal-700">
          <path
            d="M12 3c1.5 3.5 4 5.5 7 6-3 1-5.5 3.5-7 7-1.5-3.5-4-6-7-7 3-.5 5.5-2.5 7-6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-teal-600/70 sm:w-16" />
      </div>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl md:text-[2.6rem]">
        {title}
      </h1>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
          {description}
        </p>
      ) : null}
      <div className="mt-5 flex items-center justify-center gap-3" aria-hidden>
        <span className="h-px w-14 bg-stone-300 sm:w-20" />
        <span className="h-1.5 w-1.5 rotate-45 border border-teal-700/70" />
        <span className="h-px w-14 bg-stone-300 sm:w-20" />
      </div>
      {children}
    </FadeUp>
  );
}
