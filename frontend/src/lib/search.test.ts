import { describe, expect, it } from "vitest";
import { buildSearchHref } from "./search";

describe("buildSearchHref", () => {
  it("encodes query for search page", () => {
    expect(buildSearchHref("Udaipur")).toBe("/search?q=Udaipur");
  });

  it("returns home for empty query", () => {
    expect(buildSearchHref("   ")).toBe("/");
  });
});
