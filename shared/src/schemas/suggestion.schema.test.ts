import { describe, expect, it } from "vitest";
import { createSuggestionSchema } from "./suggestion.schema";

const destinationId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

describe("createSuggestionSchema", () => {
  it("accepts a destination suggestion", () => {
    const result = createSuggestionSchema.parse({
      label: "Udaipur",
      type: "destination",
      destinationId,
    });
    expect(result.action).toBe("filter");
    expect(result.label).toBe("Udaipur");
  });

  it("requires destinationId for destination type", () => {
    expect(() =>
      createSuggestionSchema.parse({ label: "Udaipur", type: "destination" }),
    ).toThrow();
  });
});
