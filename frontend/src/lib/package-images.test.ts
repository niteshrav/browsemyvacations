import { BANNED_TOURISM_PHOTO_IDS, isBannedTourismPhotoUrl } from "@bmv/shared";
import { describe, expect, it } from "vitest";
import { resolvePackageImage } from "./package-images";

describe("resolvePackageImage", () => {
  it("uses first package image when present", () => {
    const image = resolvePackageImage({
      title: "3 Nights Udaipur Gateway",
      slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      images: ["https://example.com/custom.jpg"],
    });
    expect(image).toBe("https://example.com/custom.jpg");
  });

  it("returns Udaipur tourism fallback for Udaipur packages", () => {
    const image = resolvePackageImage({
      title: "Budget Udaipur Highlights",
      slug: "udaipur-budget-2n",
      images: [],
    });
    expect(image).toContain("images.unsplash.com");
    expect(image).toContain("1599661046289");
    expect(isBannedTourismPhotoUrl(image)).toBe(false);
  });

  it("returns Jaipur tourism fallback for Jaipur packages", () => {
    const image = resolvePackageImage({
      title: "Jaipur Heritage Tour",
      slug: "jaipur-heritage-3n",
      images: [],
    });
    expect(image).toContain("1477587458883");
  });

  it("returns Jodhpur tourism fallback for Jodhpur packages", () => {
    const image = resolvePackageImage({
      title: "Jodhpur Blue City Escape",
      slug: "jodhpur-blue-2n",
      images: [],
    });
    expect(image).toContain("1602643454724");
  });

  it("defaults to Udaipur tourism when city is not recognized", () => {
    const image = resolvePackageImage({
      title: "E2E Package",
      slug: "e2e-package",
      images: [],
    });
    expect(image).toContain("images.unsplash.com");
    expect(image).toContain("1599661046289");
    for (const id of BANNED_TOURISM_PHOTO_IDS) {
      expect(image).not.toContain(id);
    }
  });
});
