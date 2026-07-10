import { DestinationSection } from "@/components/destination-section";
import { CatalogEmptyState } from "@/components/catalog-empty-state";
import { HeroSearch } from "@/components/hero-search";
import { HeroStage } from "@/components/hero-stage";
import { VacationFeasibilityRadarPopup } from "@/components/vacation-feasibility-radar-popup";
import { SuggestionBar } from "@/components/suggestion-bar";
import { resolveCatalogEmptyMessage } from "@/lib/catalog-empty-state";
import { loadHomePageData } from "@/lib/home-catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { suggestions, packagesByDest, catalogAvailable } = await loadHomePageData();
  const heroImageAnchor = new Date().toISOString().slice(0, 10);
  const packageCount = packagesByDest.reduce((total, section) => total + section.packages.length, 0);
  const emptyMessage = resolveCatalogEmptyMessage({ catalogAvailable, packageCount });

  return (
    <div className="site-container py-10 sm:py-14">
      <HeroStage anchor={heroImageAnchor}>
        <section className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl md:text-5xl md:leading-tight">
            Vacations You&apos;ll Love. Memories You&apos;ll Keep.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-600 md:text-xl">
            Explore curated packages — search by city, no dates required.
          </p>
          <HeroSearch />
        </section>
      </HeroStage>

      <SuggestionBar suggestions={suggestions} />

      {packagesByDest.map(({ destination, packages }) => (
        <DestinationSection key={destination.id} destination={destination} packages={packages} />
      ))}

      {emptyMessage && (
        <CatalogEmptyState
          message={emptyMessage}
          apiDown={!catalogAvailable}
        />
      )}

      <VacationFeasibilityRadarPopup />
    </div>
  );
}
