import { describe, expect, it } from "vitest";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "./destination.schema";

describe("destination schemas", () => {
  it("accepts valid create payload", () => {
    const result = createDestinationSchema.safeParse({
      name: "Udaipur",
      slug: "udaipur",
      displayOrder: 1,
      active: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid slug", () => {
    const result = createDestinationSchema.safeParse({
      name: "Udaipur",
      slug: "Udaipur City!",
      displayOrder: 0,
    });
    expect(result.success).toBe(false);
  });

  it("allows partial update", () => {
    const result = updateDestinationSchema.safeParse({ active: false });
    expect(result.success).toBe(true);
  });
});
