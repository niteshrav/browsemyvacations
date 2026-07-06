import { describe, expect, it } from "vitest";
import type { Suggestion } from "@/types/discovery";
import { suggestionHref } from "./suggestion-links";

const udaipur: Suggestion = {
  id: "1",
  label: "Udaipur",
  type: "destination",
  action: "filter",
  destinationSlug: "udaipur",
  packageSlug: null,
};

describe("suggestionHref", () => {
  it("links destination filter to search page", () => {
    expect(suggestionHref(udaipur)).toBe("/search?q=udaipur");
  });

  it("links scroll action to home anchor", () => {
    expect(suggestionHref({ ...udaipur, action: "scroll" })).toBe("/#udaipur");
  });
});
