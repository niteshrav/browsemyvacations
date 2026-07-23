import { describe, expect, it } from "vitest";
import {
  buildHeroSmartSuggestionIndex,
  filterHeroSmartSuggestions,
  highlightMatchParts,
} from "./hero-smart-suggestions";

describe("hero-smart-suggestions", () => {
  const index = buildHeroSmartSuggestionIndex();

  it("indexes cities, destinations, and package combinations", () => {
    expect(index.some((item) => item.kind === "city" && item.label === "Udaipur")).toBe(true);
    expect(index.some((item) => item.kind === "combo")).toBe(true);
    expect(index.some((item) => item.href.startsWith("/packages/"))).toBe(true);
  });

  it("suggests Udaipur packages and combos while typing", () => {
    const results = filterHeroSmartSuggestions("Udaipur", index, 10);
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => /udaipur/i.test(item.label))).toBe(true);
    expect(results.some((item) => item.kind === "city" || item.kind === "package" || item.kind === "combo")).toBe(
      true,
    );
  });

  it("highlights the matching query substring", () => {
    expect(highlightMatchParts("Jaipur + Udaipur", "Udai")).toEqual([
      { text: "Jaipur + ", match: false },
      { text: "Udai", match: true },
      { text: "pur", match: false },
    ]);
  });
});
