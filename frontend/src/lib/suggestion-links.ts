import type { Suggestion } from "@/types/discovery";
import { buildSearchHref } from "./search";

export function suggestionHref(suggestion: Suggestion): string {
  if (suggestion.action === "scroll" && suggestion.destinationSlug) {
    return `/#${suggestion.destinationSlug}`;
  }
  if (suggestion.packageSlug) {
    return `/packages/${suggestion.packageSlug}`;
  }
  if (suggestion.destinationSlug) {
    return buildSearchHref(suggestion.destinationSlug);
  }
  return buildSearchHref(suggestion.label);
}
