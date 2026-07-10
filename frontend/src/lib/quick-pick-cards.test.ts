import { describe, expect, it } from "vitest";
import {
  quickPickCardClassName,
  quickPickImageAlt,
  quickPickLabelClassName,
  quickPickScrollerClassName,
  quickPickThumbClassName,
  resolveQuickPickForSuggestion,
} from "./quick-pick-cards";

const udaipurSuggestion = {
  id: "1",
  label: "Udaipur",
  type: "destination" as const,
  action: "filter" as const,
  destinationSlug: "udaipur",
  packageSlug: null,
};

describe("quick-pick-cards", () => {
  it("uses a circular horizontal scroller with round thumbnails", () => {
    expect(quickPickScrollerClassName()).toContain("overflow-x-auto");
    expect(quickPickScrollerClassName()).toContain("snap-x");
    expect(quickPickCardClassName()).toContain("snap-center");
    expect(quickPickThumbClassName()).toContain("rounded-full");
    expect(quickPickThumbClassName()).toContain("h-20");
    expect(quickPickLabelClassName()).toContain("text-teal-900");
  });

  it("resolves quick pick metadata from suggestions", () => {
    const pick = resolveQuickPickForSuggestion(udaipurSuggestion);
    expect(pick?.city).toBe("Udaipur");
    expect(pick?.imageUrl).toContain("images.unsplash.com");
  });

  it("formats accessible image alt text with city only", () => {
    expect(quickPickImageAlt("Udaipur")).toBe("Udaipur, Rajasthan");
  });
});
