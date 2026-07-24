import { describe, expect, it } from "vitest";
import {
  HERO_BACKGROUND_REMOTE,
  HERO_BACKGROUND_SRC,
  HERO_COLLAGE_COUNT,
  HERO_COLLAGE_ROWS,
  buildHeroFeaturedImageUrl,
  buildHeroFlankImageUrl,
  getHeroFlankImages,
  hashString,
  heroBackgroundOverlayClassName,
  heroCollageCanvasClassName,
  heroCollageImageClassName,
  heroCollageRowClassName,
  heroCollageTileClassName,
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
  it("defines a full-bleed hero stage with diamond collage layout", () => {
    expect(heroStageClassName()).toContain("relative");
    expect(heroStageClassName()).toContain("overflow-hidden");
    expect(heroHalfBackgroundClassName()).toContain("absolute");
    expect(heroHalfBackgroundClassName()).toContain("inset-0");
    expect(heroBackgroundOverlayClassName()).toContain("from-white/45");
    expect(heroFlankPanelClassName("left")).toContain("hidden");
    expect(heroFlankPanelClassName("left")).toContain("lg:block");
    expect(heroCollageImageClassName()).toContain("rounded-[1.25rem]");
    expect(heroCollageImageClassName()).toContain("hover:scale-[1.04]");
    expect(heroCollageTileClassName()).toContain("h-[7rem]");
    expect(heroCollageTileClassName()).toContain("w-[7.75rem]");
    expect(heroCollageRowClassName()).toContain("flex");
    expect(heroCollageCanvasClassName()).toContain("flex-col");
    expect(heroCollageCanvasClassName()).toContain("items-center");
    expect(HERO_COLLAGE_COUNT).toBe(9);
    expect(HERO_COLLAGE_ROWS.map((row) => row.length)).toEqual([1, 2, 3, 2, 1]);
    expect(HERO_BACKGROUND_SRC).toBe(HERO_BACKGROUND_REMOTE);
    expect(HERO_BACKGROUND_SRC).toContain("1703092289078");
  });

  it("builds compact flank image urls", () => {
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("w=480");
    expect(buildHeroFlankImageUrl(sampleUrls[0])).toContain("h=420");
  });

  it("builds large featured image urls for the full-bleed background", () => {
    expect(buildHeroFeaturedImageUrl(sampleUrls[0])).toContain("w=2400");
    expect(buildHeroFeaturedImageUrl(sampleUrls[0])).toContain("h=1400");
    expect(buildHeroFeaturedImageUrl(HERO_BACKGROUND_REMOTE)).toBe(HERO_BACKGROUND_REMOTE);
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

  it("selects a dense left collage and the Udaipur background", () => {
    const first = selectHeroFlankImages(sampleUrls, "2026-06-03");
    const second = selectHeroFlankImages(sampleUrls, "2026-06-03");

    expect(first.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(first.right[0]).toContain("1703092289078");
    expect(second).toEqual(first);
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
    expect(first.right[0]).toContain("1703092289078");
    expect(second.left).not.toEqual(first.left);
  });

  it("loads flank images from the Rajasthan tourism catalog", () => {
    const images = getHeroFlankImages("test-anchor");
    expect(images.left).toHaveLength(HERO_COLLAGE_COUNT);
    expect(images.right[0]).toContain("1703092289078");
    expect(images.left.every((url) => url.includes("images.unsplash.com"))).toBe(true);
  });
});
