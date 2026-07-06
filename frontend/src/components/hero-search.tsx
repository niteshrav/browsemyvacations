"use client";

import {
  HERO_SEARCH_ARIA_LABEL,
  heroSearchButtonClassName,
  heroSearchFormClassName,
} from "@/lib/hero-search-layout";
import { RajasthanCityCombobox } from "./rajasthan-city-combobox";

type Props = {
  defaultQuery?: string;
};

export function HeroSearch({ defaultQuery = "" }: Props) {
  return (
    <form action="/search" method="get" className={heroSearchFormClassName()}>
      <RajasthanCityCombobox
        id="q"
        inputName="q"
        label={HERO_SEARCH_ARIA_LABEL}
        hideVisibleLabel
        ariaLabel={HERO_SEARCH_ARIA_LABEL}
        defaultValue={defaultQuery}
        placeholder="Search city, e.g. Udaipur"
        className="min-w-0 flex-1"
        inputClassName="px-4 py-3"
      />
      <button type="submit" className={heroSearchButtonClassName()}>
        Search
      </button>
    </form>
  );
}
