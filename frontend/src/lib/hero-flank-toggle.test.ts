import { describe, expect, it } from "vitest";
import {
  HERO_FLANK_SHUFFLE_LABEL,
  HERO_FLANK_TOGGLE_HIDE_LABEL,
  HERO_FLANK_TOGGLE_SHOW_LABEL,
  HERO_FLANK_TOGGLE_STORAGE_KEY,
  heroFlankToggleButtonClassName,
  readHeroFlankVisiblePreference,
  serializeHeroFlankVisiblePreference,
} from "./hero-flank-toggle";

describe("hero-flank-toggle", () => {
  it("uses session storage for flank visibility", () => {
    expect(HERO_FLANK_TOGGLE_STORAGE_KEY).toBe("bmv-hero-flank-visible");
    expect(readHeroFlankVisiblePreference(null)).toBe(true);
    expect(readHeroFlankVisiblePreference("0")).toBe(false);
    expect(serializeHeroFlankVisiblePreference(false)).toBe("0");
    expect(serializeHeroFlankVisiblePreference(true)).toBe("1");
  });

  it("defines accessible toggle and shuffle labels", () => {
    expect(HERO_FLANK_TOGGLE_HIDE_LABEL).toContain("Hide");
    expect(HERO_FLANK_TOGGLE_SHOW_LABEL).toContain("Show");
    expect(HERO_FLANK_SHUFFLE_LABEL).toContain("Shuffle");
  });

  it("styles the flank toggle control", () => {
    expect(heroFlankToggleButtonClassName()).toContain("rounded-full");
  });
});
