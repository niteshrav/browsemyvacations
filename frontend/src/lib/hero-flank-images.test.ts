import { describe, expect, it } from "vitest";
import {
  HERO_FLANK_IMAGE_COUNT_PER_SIDE,
  buildHeroFlankImageUrl,
  getHeroFlankImages,
  hashString,
  heroFlankPanelClassName,
  heroFlankPanelHiddenClassName,
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
];

describe("hero-flank-images", () => {
  it("defines a wide hero stage with hidden flanks on small screens", () => {
    expect(heroStageClassName()).toContain("max-w-6xl");
    expect(heroFlankPanelClassName("left")).toContain("hidden lg:flex");
    expect(heroFlankPanelClassName("right")).toContain("hidden lg:flex");
  });

  it("builds compact flank image urls", () => {
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("w=400");
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("h=460");
  });

  it("picks a different hero image from the pool on hover", () => {
    const next = pickNextHeroImage(sampleUrls.map(buildHeroFlankImageUrl), buildHeroFlankImageUrl(sampleUrls[0]), "hover-1");
    expect(next).not.toBe(buildHeroFlankImageUrl(sampleUrls[0]));
    expect(sampleUrls.map(buildHeroFlankImageUrl)).toContain(next);
  });

  it("selects deterministic tourism images for left and right flanks", () => {
    const first = selectHeroFlankImages(sampleUrls, "2026-06-03");
    const second = selectHeroFlankImages(sampleUrls, "2026-06-03");

    expect(first.left).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(first.right).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(second).toEqual(first);
    expect(first.left[0]).not.toBe(first.right[0]);
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
    expect(first.left).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(second.left).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(second).not.toEqual(first);
  });

  it("loads flank images from the Rajasthan tourism catalog", () => {
    const images = getHeroFlankImages("test-anchor");
    expect(images.left).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(images.right).toHaveLength(HERO_FLANK_IMAGE_COUNT_PER_SIDE);
    expect(images.left.every((url) => url.includes("images.unsplash.com"))).toBe(true);
    expect(images.right.every((url) => url.includes("images.unsplash.com"))).toBe(true);
  });
});
