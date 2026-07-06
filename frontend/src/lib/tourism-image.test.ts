import { describe, expect, it } from "vitest";
import { isDirectTourismImageUrl, tourismImageClassName } from "./tourism-image";

describe("tourism-image", () => {
  it("accepts direct Unsplash tourism urls", () => {
    expect(
      isDirectTourismImageUrl(
        "https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=80&h=80&q=80",
      ),
    ).toBe(true);
    expect(isDirectTourismImageUrl("/_next/image?url=foo")).toBe(false);
  });

  it("uses full-bleed object-cover styling", () => {
    expect(tourismImageClassName()).toContain("object-cover");
    expect(tourismImageClassName()).toContain("h-full");
  });
});
