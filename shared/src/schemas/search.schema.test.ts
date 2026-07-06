import { describe, expect, it } from "vitest";
import { searchQuerySchema } from "./search.schema";

describe("searchQuerySchema", () => {
  it("accepts a trimmed query", () => {
    expect(searchQuerySchema.parse({ q: "  Udaipur  " })).toEqual({ q: "Udaipur" });
  });

  it("rejects empty or whitespace-only query", () => {
    expect(() => searchQuerySchema.parse({ q: "" })).toThrow();
    expect(() => searchQuerySchema.parse({ q: "   " })).toThrow();
  });
});
