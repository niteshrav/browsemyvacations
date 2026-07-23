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

  it("uses a unified pill search shell", () => {
    expect(heroSearchFormClassName()).toContain("rounded-full");
    expect(heroSearchFormClassName()).toContain("max-w-xl");
    expect(heroSearchFormClassName()).toContain("items-center");
    expect(heroSearchFormClassName()).toContain("backdrop-blur-sm");
  });

  it("styles the search button as a compact pill action", () => {
    expect(heroSearchButtonClassName()).toContain("rounded-full");
    expect(heroSearchButtonClassName()).toContain("bg-teal-800");
    expect(heroSearchButtonClassName()).not.toContain("self-stretch");
  });
});
