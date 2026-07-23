"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  HERO_SEARCH_ARIA_LABEL,
  heroSearchButtonClassName,
  heroSearchFormClassName,
  heroSearchInputClassName,
  heroSearchInputShellClassName,
} from "@/lib/hero-search-layout";
import {
  buildHeroSmartSuggestionIndex,
  filterHeroSmartSuggestions,
  highlightMatchParts,
  type HeroSmartSuggestion,
} from "@/lib/hero-smart-suggestions";
import { rajasthanCitySuggestionsListClassName } from "@/lib/rajasthan-city-combobox";

type Props = {
  defaultQuery?: string;
};

export function HeroSmartSearch({ defaultQuery = "" }: Props) {
  const router = useRouter();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const index = useMemo(() => buildHeroSmartSuggestionIndex(), []);
  const suggestions = useMemo(
    () => filterHeroSmartSuggestions(query, index),
    [index, query],
  );
  const showList = open && suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function selectSuggestion(item: HeroSmartSuggestion) {
    setQuery(item.kind === "city" ? item.label : query);
    setOpen(false);
    router.push(item.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showList) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      return;
    }
    if (event.key === "Enter") {
      const active = suggestions[activeIndex];
      if (active) {
        event.preventDefault();
        selectSuggestion(active);
      }
    }
  }

  return (
    <form
      action="/search"
      method="get"
      className={heroSearchFormClassName()}
      onSubmit={(event) => {
        const active = showList ? suggestions[activeIndex] : null;
        if (active) {
          event.preventDefault();
          selectSuggestion(active);
        }
      }}
    >
      <div ref={rootRef} className={heroSearchInputShellClassName()}>
        <span
          className="pointer-events-none absolute top-1/2 left-3.5 z-[1] -translate-y-1/2 text-teal-800/70"
          aria-hidden
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path
              d="M10 17s5-4.2 5-8a5 5 0 1 0-10 0c0 3.8 5 8 5 8Z"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="9" r="1.6" />
          </svg>
        </span>
        <input
          id="q"
          name="q"
          type="search"
          value={query}
          aria-label={HERO_SEARCH_ARIA_LABEL}
          placeholder="Search city, e.g. Udaipur"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-activedescendant={showList ? `${listboxId}-option-${activeIndex}` : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={heroSearchInputClassName()}
          data-testid="hero-smart-search-input"
        />
        {showList ? (
          <ul
            id={listboxId}
            role="listbox"
            className={`${rajasthanCitySuggestionsListClassName()} max-h-72 rounded-2xl`}
            data-testid="hero-smart-search-list"
          >
            {suggestions.map((item, indexItem) => {
              const active = indexItem === activeIndex;
              return (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    id={`${listboxId}-option-${indexItem}`}
                    role="option"
                    aria-selected={active}
                    className={`flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left text-sm transition ${
                      active ? "bg-teal-50 text-teal-950" : "text-stone-800 hover:bg-teal-50/70"
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(indexItem)}
                    onClick={() => selectSuggestion(item)}
                  >
                    <span className="min-w-0">
                      {highlightMatchParts(item.label, query).map((part, partIndex) => (
                        <span
                          key={`${item.id}-${partIndex}`}
                          className={part.match ? "font-semibold text-teal-800" : undefined}
                        >
                          {part.text}
                        </span>
                      ))}
                    </span>
                    {item.meta ? (
                      <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-stone-400">
                        {item.meta}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <button type="submit" className={heroSearchButtonClassName()}>
        Search
      </button>
    </form>
  );
}
