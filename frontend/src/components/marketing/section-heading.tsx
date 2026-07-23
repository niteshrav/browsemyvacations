import type { ReactNode } from "react";
import { FadeUp } from "./fade-up";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  children,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <FadeUp className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-stone-600">{description}</p> : null}
      <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-600/50" />
        <span className="h-1.5 w-1.5 rotate-45 border border-teal-700/60" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-600/50" />
      </div>
      {children}
    </FadeUp>
  );
}
