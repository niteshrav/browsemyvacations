import { describe, expect, it } from "vitest";
import {
  HERO_COLLAGE_COUNT,
  buildHeroFeaturedImageUrl,
  buildHeroFlankImageUrl,
  getHeroFlankImages,
  hashString,
  heroFlankPanelClassName,
  heroFlankPanelHiddenClassName,
  heroHalfBackgroundClassName,
  heroStageClassName,
  pickNextHeroImage,
  selectHeroFlankImages,
  shuffleHeroFlankImages,
} from "./hero-flank-images";

const sampleUrls = [
  "https://images.unsplash.com/photo-aaa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-bbb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-ccc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-ddd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-eee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-fff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-ggg?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-hhh?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-iii?auto=format&fit=crop&w=1200&q=80",
];

describe("hero-flank-images", () => {
  it("defines a full-bleed hero stage with half-background photo on desktop", () => {
    expect(heroStageClassName()).toContain("relative");
    expect(heroStageClassName()).toContain("overflow-hidden");
    expect(heroHalfBackgroundClassName()).toContain("relative");
    expect(heroHalfBackgroundClassName()).toContain("rounded-2xl");
    expect(heroHalfBackgroundClassName()).toContain("lg:block");
    expect(heroFlankPanelClassName("left")).toContain("hidden lg:flex");
    expect(heroFlankPanelClassName("right")).toContain("hidden");
  });

  it("builds compact flank image urls", () => {
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("w=400");
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("h=480");
  });

  it("builds large featured image urls", () => {
    expect(buildHeroFeaturedImageUrl(sampleUrls[0])).toContain("w=1600");
    expect(buildHeroFeaturedImageUrl(sampleUrls[0])).toContain("h=2000");
  });

  it("picks a different hero image from the pool on hover", () => {
    const next = pickNextHeroImage(
      sampleUrls.map(buildHeroFlankImageUrl),
      buildHeroFlankImageUrl(sampleUrls[0]),
      "hover-1",
    );
    expect(next).not.toBe(buildHeroFlankImageUrl(sampleUrls[0]));
    expect(sampleUrls.map(buildHeroFlankImageUrl)).toContain(next);
  });

  it("selects a dense left collage and a single featured right image", () => {
    const first = selectHeroFlankImages(sampleUrls, "2026-06-03");
    const second = selectHeroFlankImages(sampleUrls, "2026-06-03");

    expect(first.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(first.right).toHaveLength(1);
    expect(second).toEqual(first);
    expect(first.right[0]).toContain("w=1600");
  });

  it("hashes anchors consistently", () => {
    expect(hashString("udaipur")).toBe(hashString("udaipur"));
    expect(hashString("jaipur")).not.toBe(hashString("udaipur"));
  });

  it("hides flank panels when toggled off", () => {
    expect(heroFlankPanelHiddenClassName()).toBe("hidden");
  });

  it("shuffles flank images with a new salt", () => {
    const first = shuffleHeroFlankImages("2026-06-03", 0);
    const second = shuffleHeroFlankImages("2026-06-03", 1);
    expect(first.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(second.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(first.right).toHaveLength(1);
    expect(second).not.toEqual(first);
  });

  it("loads flank images from the Rajasthan tourism catalog", () => {
    const images = getHeroFlankImages("test-anchor");
    expect(images.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(images.right).toHaveLength(1);
    expect(images.left.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(images.right.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(images.right[0]).toContain("1695956353120-54ce5e91632b");
  });
});
