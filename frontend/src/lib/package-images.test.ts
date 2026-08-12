import { BANNED_TOURISM_PHOTO_IDS, isBannedTourismPhotoUrl } from "@bmv/shared";
import { describe, expect, it } from "vitest";
import { resolvePackageImage, packageCardImageClassName, packageHeroImageClassName } from "./package-images";

describe("resolvePackageImage", () => {
  it("uses first package image when present", () => {
    const image = resolvePackageImage({
      title: "3 Nights Udaipur Gateway",
      slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      images: ["https://example.com/custom.jpg"],
    });
    expect(image).toBe("https://example.com/custom.jpg");
  });

  it("keeps admin-uploaded package covers", () => {
    const image = resolvePackageImage({
      title: "2D/1N Udaipur: The Romantic Lake Escape",
      slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      images: ["https://browsemyvacations.com/uploads/5e181df2771670bd.png"],
    });
    expect(image).toContain("/uploads/5e181df2771670bd.png");
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
    expect(image).toContain("1705861145407");
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

describe("package image layout", () => {
  it("uses object-contain for admin uploads and marketing art", () => {
    expect(packageCardImageClassName("/uploads/cover.png")).toContain("object-contain");
    expect(packageHeroImageClassName("/marketing/city-palace.jpg")).toContain("object-contain");
  });

  it("uses object-cover for stock tourism photos", () => {
    expect(packageCardImageClassName("https://images.unsplash.com/photo-123")).toContain("object-cover");
    expect(packageHeroImageClassName("https://images.unsplash.com/photo-123")).toContain("object-cover");
  });
});
