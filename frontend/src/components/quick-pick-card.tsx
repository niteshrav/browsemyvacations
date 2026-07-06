import Link from "next/link";
import { TourismImage } from "@/components/tourism-image";
import {
  quickPickCardClassName,
  quickPickImageAlt,
  quickPickLabelClassName,
  quickPickThumbClassName,
  resolveQuickPickForSuggestion,
} from "@/lib/quick-pick-cards";
import { suggestionHref } from "@/lib/suggestion-links";
import type { Suggestion } from "@/types/discovery";

type Props = {
  suggestion: Suggestion;
};

export function QuickPickCard({ suggestion }: Props) {
  const pick = resolveQuickPickForSuggestion(suggestion);
  if (!pick) {
    return (
      <Link href={suggestionHref(suggestion)} className={quickPickCardClassName()}>
        <span className={quickPickLabelClassName()}>{suggestion.label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={suggestionHref(suggestion)}
      className={quickPickCardClassName()}
      data-testid={`quick-pick-${pick.slug}`}
      aria-label={pick.city}
    >
      <div className={quickPickThumbClassName()}>
        <TourismImage src={pick.imageUrl} alt={quickPickImageAlt(pick.city)} />
      </div>
      <span className={quickPickLabelClassName()}>{pick.city}</span>
    </Link>
  );
}
