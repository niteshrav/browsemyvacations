import { HOME_QUICK_PICK_CITIES } from "@bmv/shared";
import { describe, expect, it } from "vitest";
import {
  buildCatalogQuickPickSuggestions,
  resolveHomeQuickPickSuggestions,
} from "./quick-pick-suggestions";

describe("quick-pick-suggestions", () => {
  it("builds catalog fallback suggestions for every quick pick city", () => {
    const suggestions = buildCatalogQuickPickSuggestions();
    expect(suggestions).toHaveLength(HOME_QUICK_PICK_CITIES.length);
    expect(suggestions[0]?.destinationSlug).toBe("udaipur");
    expect(suggestions[0]?.label).toBe("Udaipur");
  });

  it("uses API suggestions when present and falls back to catalog when empty", () => {
    const apiSuggestions = [
      {
        id: "1",
        label: "Udaipur",
        type: "destination" as const,
        action: "filter" as const,
        destinationSlug: "udaipur",
        packageSlug: null,
      },
    ];
    expect(resolveHomeQuickPickSuggestions(apiSuggestions)).toEqual(apiSuggestions);
    expect(resolveHomeQuickPickSuggestions([])).toHaveLength(HOME_QUICK_PICK_CITIES.length);
  });

  it("drops broken API suggestions without target slugs", () => {
    const suggestions = resolveHomeQuickPickSuggestions([
      {
        id: "broken-destination",
        label: "Broken destination",
        type: "destination",
        action: "filter",
        destinationSlug: null,
        packageSlug: null,
      },
      {
        id: "good-package",
        label: "Featured package",
        type: "package",
        action: "filter",
        destinationSlug: null,
        packageSlug: "udaipur-escape",
      },
    ]);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.id).toBe("good-package");
  });
});
