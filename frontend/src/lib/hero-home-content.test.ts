import { describe, expect, it } from "vitest";
import {
  HERO_HEADLINE,
  HERO_HEADLINE_ACCENT,
  HERO_HEADLINE_PRIMARY,
  HERO_SUPPORT,
  HERO_TRUST_ITEMS,
  HERO_VALUE_PROPS,
} from "./hero-home-content";

describe("hero-home-content", () => {
  it("keeps the brand-aligned headline and support line", () => {
    expect(HERO_HEADLINE).toContain("Vacations You'll Love");
    expect(HERO_HEADLINE_PRIMARY).toBe("Vacations You'll Love.");
    expect(HERO_HEADLINE_ACCENT).toBe("Memories You'll Keep.");
    expect(HERO_SUPPORT.toLowerCase()).toContain("search by city");
  });

  it("defines three value props under the search", () => {
    expect(HERO_VALUE_PROPS).toHaveLength(3);
    expect(HERO_VALUE_PROPS.map((item) => item.title)).toEqual([
      "Curated Experiences",
      "No Dates Needed",
      "Trusted & Seamless",
    ]);
  });

  it("defines the trust ribbon items", () => {
    expect(HERO_TRUST_ITEMS).toHaveLength(3);
    expect(HERO_TRUST_ITEMS[0].title).toContain("Best Price");
    expect(HERO_TRUST_ITEMS[1].title).toContain("24/7");
    expect(HERO_TRUST_ITEMS[2].title).toContain("Flexible");
  });
});
