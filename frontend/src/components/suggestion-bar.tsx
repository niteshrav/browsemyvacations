import { QuickPickCard } from "@/components/quick-pick-card";
import { quickPickScrollerClassName } from "@/lib/quick-pick-cards";
import type { Suggestion } from "@/types/discovery";

type Props = {
  suggestions: Suggestion[];
};

export function SuggestionBar({ suggestions }: Props) {
  if (suggestions.length === 0) return null;

  return (
    <section className="mt-10" aria-label="Quick suggestions" data-testid="quick-picks-bar">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Quick picks</h2>
      <div className={quickPickScrollerClassName()}>
        {suggestions.map((suggestion) => (
          <QuickPickCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </section>
  );
}
