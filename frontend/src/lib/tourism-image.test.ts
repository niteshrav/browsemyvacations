import { describe, expect, it } from "vitest";
import {
  isDirectTourismImageUrl,
  resolveTourismImageSrc,
  tourismImageClassName,
} from "./tourism-image";

describe("tourism-image", () => {
  it("accepts direct Unsplash tourism urls", () => {
    expect(
      isDirectTourismImageUrl(
        "https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=80&h=80&q=80",
      ),
    ).toBe(true);
    expect(isDirectTourismImageUrl("/_next/image?url=foo")).toBe(false);
  });

  it("accepts Cloudinary-fetched Unsplash tourism urls", () => {
    const origin =
      "https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=1200&q=80";
    const cdn = `https://res.cloudinary.com/bmv/image/fetch/f_auto,q_auto,w_1200,c_fill/${encodeURIComponent(origin)}`;
    expect(isDirectTourismImageUrl(cdn)).toBe(true);
  });

  it("passes tourism src through CDN helper without cloud name", () => {
    const src = "https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&w=1200";
    expect(resolveTourismImageSrc(src)).toBe(src);
  });

  it("rewrites retired Hawa Mahal Unsplash urls to City Palace", () => {
    expect(
      resolveTourismImageSrc(
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
      ),
    ).toBe("/marketing/city-palace-udaipur.jpg");
  });

  it("uses full-bleed object-cover styling", () => {
    expect(tourismImageClassName()).toContain("object-cover");
    expect(tourismImageClassName()).toContain("h-full");
  });
});
