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
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-stone-600">{description}</p> : null}
      {children}
    </FadeUp>
  );
}
