import { describe, expect, it } from "vitest";
import { createPackageSchema, itineraryDaySchema } from "./package.schema";

describe("package schemas", () => {
  it("accepts valid package with itinerary", () => {
    const result = createPackageSchema.safeParse({
      title: "3 Nights Udaipur Gateway",
      slug: "standalone-single-city-udaipur-the-romantic-lake-escape",
      durationDays: 4,
      durationNights: 3,
      shortDescription: "Explore the city of lakes.",
      priceFrom: 24500,
      destinationIds: ["550e8400-e29b-41d4-a716-446655440000"],
      itineraryDays: [
        {
          dayNumber: 1,
          title: "Arrival",
          cities: ["Udaipur"],
          summary: "Check-in and local market.",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects package without destinations", () => {
    const result = createPackageSchema.safeParse({
      title: "Trip",
      slug: "trip",
      durationDays: 3,
      durationNights: 2,
      shortDescription: "Desc",
      priceFrom: 1000,
      destinationIds: [],
      itineraryDays: [],
    });
    expect(result.success).toBe(false);
  });

  it("validates itinerary day", () => {
    const result = itineraryDaySchema.safeParse({
      dayNumber: 0,
      title: "Bad",
      cities: [],
      summary: "",
    });
    expect(result.success).toBe(false);
  });
});
