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
  if (apiSuggestions.length > 0) {
    return apiSuggestions;
  }
  return buildCatalogQuickPickSuggestions();
}
