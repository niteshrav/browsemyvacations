"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { filterRajasthanCities, RAJASTHAN_TOURIST_CITIES } from "@bmv/shared";
import {
  rajasthanCityComboboxInputShellClassName,
  rajasthanCitySuggestionsListClassName,
  resolveCitySelection,
  shouldShowRajasthanCityList,
} from "@/lib/rajasthan-city-combobox";

type Props = {
  id?: string;
  inputName?: string;
  label?: string;
  labelClassName?: string;
  ariaLabel?: string;
  hideVisibleLabel?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (city: string) => void;
  required?: boolean;
  className?: string;
  inputClassName?: string;
};

export function RajasthanCityCombobox({
  id = "rajasthan-city",
  inputName,
  label,
  labelClassName = "block text-sm font-medium",
  ariaLabel,
  hideVisibleLabel = false,
  placeholder = "Search city, e.g. Jaipur",
  value,
  defaultValue = "",
  onChange,
  required = false,
  className = "",
  inputClassName = "",
}: Props) {
  const isControlled = value !== undefined;
  const [query, setQuery] = useState(isControlled ? value : defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isControlled) setQuery(value);
  }, [isControlled, value]);

  useEffect(() => {
    if (!isControlled) setQuery(defaultValue);
  }, [defaultValue, isControlled]);

  const suggestions = useMemo(
    () => filterRajasthanCities(query, RAJASTHAN_TOURIST_CITIES),
    [query],
  );

  const showList = shouldShowRajasthanCityList(open, suggestions.length);

  function pickCity(city: string) {
    setQuery(city);
    onChange?.(city);
    setOpen(false);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div className={`min-w-0 ${className}`}>
      {label && !hideVisibleLabel ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      ) : null}
      <div
        ref={rootRef}
        className={`${rajasthanCityComboboxInputShellClassName()} ${label && !hideVisibleLabel ? "mt-1" : ""}`}
      >
        <input
          id={id}
          name={inputName}
          type="search"
          value={query}
          aria-label={ariaLabel ?? (hideVisibleLabel ? label : undefined)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onBlur={() => {
            const picked = resolveCitySelection(query, suggestions);
            if (picked) pickCity(picked);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter") {
              const picked = resolveCitySelection(query, suggestions);
              if (picked) {
                e.preventDefault();
                pickCity(picked);
              }
            }
          }}
          placeholder={placeholder}
          autoComplete="off"
          required={required}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={`${id}-listbox`}
          className={`w-full rounded-lg border-0 bg-transparent px-3 py-2 focus:outline-none ${inputClassName}`}
        />
        {showList ? (
          <ul
            id={`${id}-listbox`}
            role="listbox"
            className={rajasthanCitySuggestionsListClassName()}
          >
            {suggestions.map((city: string) => (
              <li key={city}>
                <button
                  type="button"
                  role="option"
                  aria-selected={query === city}
                  className="w-full px-3 py-2 text-left text-sm text-stone-800 hover:bg-teal-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pickCity(city)}
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
