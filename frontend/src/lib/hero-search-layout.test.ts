import { describe, expect, it } from "vitest";
import {
  HERO_SEARCH_ARIA_LABEL,
  heroSearchButtonClassName,
  heroSearchFormClassName,
} from "./hero-search-layout";

describe("hero search layout", () => {
  it("uses accessible aria label text", () => {
    expect(HERO_SEARCH_ARIA_LABEL).toBe("Search by city or package");
  });

  it("uses inline flex form layout on larger screens", () => {
    expect(heroSearchFormClassName()).toContain("max-w-2xl");
    expect(heroSearchFormClassName()).toContain("sm:flex-row");
    expect(heroSearchFormClassName()).toContain("sm:items-center");
    expect(heroSearchFormClassName()).not.toContain("items-stretch");
  });

  it("styles the search button as a primary action without stretching", () => {
    expect(heroSearchButtonClassName()).toContain("btn-primary");
    expect(heroSearchButtonClassName()).toContain("sm:w-auto");
    expect(heroSearchButtonClassName()).not.toContain("self-stretch");
  });
});
