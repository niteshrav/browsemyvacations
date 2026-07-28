import { getHomeQuickPicks } from "@bmv/shared";
import type { Suggestion } from "@/types/discovery";

export function buildCatalogQuickPickSuggestions(): Suggestion[] {
  return getHomeQuickPicks().map((pick) => ({
    id: `catalog-quick-pick-${pick.slug}`,
    label: pick.city,
    type: "destination" as const,
    action: "filter" as const,
    destinationSlug: pick.slug,
    packageSlug: null,
  }));
}

export function resolveHomeQuickPickSuggestions(apiSuggestions: Suggestion[]): Suggestion[] {
  const usableSuggestions = apiSuggestions.filter((item) => {
    if (item.type === "package") {
      return Boolean(item.packageSlug);
    }
    return Boolean(item.destinationSlug);
  });

  if (usableSuggestions.length > 0) {
    return usableSuggestions;
  }
  return buildCatalogQuickPickSuggestions();
}
