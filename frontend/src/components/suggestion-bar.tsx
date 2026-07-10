"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QuickPickCard } from "@/components/quick-pick-card";
import { quickPickScrollerClassName } from "@/lib/quick-pick-cards";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { Suggestion } from "@/types/discovery";

type Props = {
  suggestions: Suggestion[];
};

const AUTO_SCROLL_INTERVAL_MS = 2500;

export function SuggestionBar({ suggestions }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollStep, setScrollStep] = useState(116);
  const prefersReducedMotion = usePrefersReducedMotion();

  const measureScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement | undefined;
    if (second) {
      setScrollStep(second.offsetLeft - first.offsetLeft);
    } else {
      setScrollStep(first.offsetWidth + 16);
    }
  }, []);

  useEffect(() => {
    measureScrollStep();
    window.addEventListener("resize", measureScrollStep);
    return () => window.removeEventListener("resize", measureScrollStep);
  }, [measureScrollStep, suggestions.length]);

  useEffect(() => {
    if (suggestions.length === 0 || isPaused || prefersReducedMotion) return;
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [suggestions.length, isPaused, prefersReducedMotion, scrollStep]);

  function scrollBy(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const distance = scrollStep * 2;
    el.scrollBy({ left: dir === "right" ? distance : -distance, behavior: "smooth" });
  }

  if (suggestions.length === 0) return null;

  return (
    <section className="mt-10" aria-label="Quick suggestions" data-testid="quick-picks-bar">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Quick picks</h2>
        <p className="text-xs text-stone-400 sm:hidden">Swipe to explore →</p>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="inline-flex max-w-full items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => scrollBy("left")}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white/95 p-1.5 text-stone-500 shadow-md transition hover:text-teal-700 sm:flex"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <div
            ref={scrollRef}
            className={`${quickPickScrollerClassName()} w-max max-w-[calc(100vw-5.5rem)] sm:max-w-[calc(100vw-9rem)] lg:max-w-[min(56rem,calc(100vw-9rem))]`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {suggestions.map((suggestion) => (
              <QuickPickCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy("right")}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white/95 p-1.5 text-stone-500 shadow-md transition hover:text-teal-700 sm:flex"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
