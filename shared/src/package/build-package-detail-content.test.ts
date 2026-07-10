import { describe, expect, it } from "vitest";
import {
  buildPackageDetailContent,
  buildPackageHighlights,
  extractItinerarySegments,
  formatHighlightFromSegment,
  isBoilerplateItinerarySegment,
} from "./build-package-detail-content";

const jaipurPackage = {
  title: "2D/1N Jaipur: The Quick Pink City Break",
  durationDays: 2,
  durationNights: 1,
  shortDescription:
    "Perfect for travelers short on time who want to cross off India’s most famous palaces and shop for vibrant textiles in a single weekend.",
  destinations: ["Jaipur"],
  itinerary: [
    {
      dayNumber: 1,
      title: "Day 1",
      cities: ["Jaipur"],
      summary:
        "Pickup from Jaipur Airport/Station -> Check-in -> Visit Amber Fort, Hawa Mahal, & Johari Bazar -> Traditional Dinner at Hotel.",
    },
    {
      dayNumber: 2,
      title: "Day 2",
      cities: ["Jaipur"],
      summary:
        "Morning Breakfast -> Visit City Palace & Jantar Mantar -> Shopping drop-off -> Drop at Airport/Station.",
    },
  ],
};

describe("build-package-detail-content", () => {
  it("extracts itinerary segments separated by arrows", () => {
    expect(extractItinerarySegments(jaipurPackage.itinerary[0].summary)).toEqual([
      "Pickup from Jaipur Airport/Station",
      "Check-in",
      "Visit Amber Fort, Hawa Mahal, & Johari Bazar",
      "Traditional Dinner at Hotel",
    ]);
  });

  it("skips boilerplate transfer segments for highlights", () => {
    expect(isBoilerplateItinerarySegment("Pickup from Jaipur Airport/Station")).toBe(true);
    expect(isBoilerplateItinerarySegment("Visit Amber Fort, Hawa Mahal, & Johari Bazar")).toBe(false);
  });

  it("formats visit segments as readable highlights", () => {
    expect(formatHighlightFromSegment("Visit City Palace & Jantar Mantar")).toBe(
      "Visit City Palace & Jantar Mantar.",
    );
  });

  it("builds multiple trip highlights from itinerary", () => {
    const highlights = buildPackageHighlights(jaipurPackage);
    expect(highlights.length).toBeGreaterThanOrEqual(3);
    expect(highlights.some((line) => line.includes("Amber Fort"))).toBe(true);
    expect(highlights.some((line) => line.includes("City Palace"))).toBe(true);
  });

  it("builds a full thrillophilia-style detail bundle", () => {
    const content = buildPackageDetailContent(jaipurPackage);
    expect(content.featureBadges).toContain("Transfer Included");
    expect(content.inclusions.some((line) => line.includes("breakfast"))).toBe(true);
    expect(content.exclusions.some((line) => line.toLowerCase().includes("personal"))).toBe(true);
    expect(content.knowBeforeYouGo.length).toBeGreaterThan(2);
  });
});
