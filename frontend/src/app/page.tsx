import { DestinationSection } from "@/components/destination-section";
import { CatalogEmptyState } from "@/components/catalog-empty-state";
import { HeroSearch } from "@/components/hero-search";
import { HeroStage } from "@/components/hero-stage";
import { HeroTrustRibbon } from "@/components/hero-trust-ribbon";
import { HeroValueProps } from "@/components/hero-value-props";
import { SuggestionBar } from "@/components/suggestion-bar";
import { resolveCatalogEmptyMessage } from "@/lib/catalog-empty-state";
import {
  HERO_HEADLINE_ACCENT,
  HERO_HEADLINE_PRIMARY,
  HERO_SUPPORT,
} from "@/lib/hero-home-content";
import { loadHomePageData } from "@/lib/home-catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { suggestions, packagesByDest, catalogAvailable } = await loadHomePageData();
  const heroImageAnchor = new Date().toISOString().slice(0, 10);
  const packageCount = packagesByDest.reduce((total, section) => total + section.packages.length, 0);
  const emptyMessage = resolveCatalogEmptyMessage({ catalogAvailable, packageCount });

  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <HeroStage anchor={heroImageAnchor}>
          <section
            className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left"
            data-testid="hero-copy"
          >
            <h1 className="font-serif text-[2rem] font-bold leading-[1.15] tracking-tight text-teal-950 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              <span className="block">{HERO_HEADLINE_PRIMARY}</span>
              <span className="mt-1.5 block text-teal-700">{HERO_HEADLINE_ACCENT}</span>
            </h1>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 lg:mx-0 lg:justify-start">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/80" aria-hidden />
              <span className="h-1.5 w-1.5 rotate-45 bg-amber-500" aria-hidden />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/80" aria-hidden />
            </div>
            <p className="mx-auto mt-4 max-w-lg text-[0.98rem] font-medium leading-relaxed text-stone-600 md:text-lg lg:mx-0">
              {HERO_SUPPORT}
            </p>
            <HeroSearch />
            <HeroValueProps />
          </section>
        </HeroStage>
        <div className="site-container pb-8 sm:pb-10">
          <HeroTrustRibbon />
        </div>
      </section>

      <div className="site-container py-10 sm:py-14">
        <SuggestionBar suggestions={suggestions} />

        {packagesByDest.map(({ destination, packages }) => (
          <DestinationSection key={destination.id} destination={destination} packages={packages} />
        ))}

        {emptyMessage && (
          <CatalogEmptyState message={emptyMessage} apiDown={!catalogAvailable} />
        )}
      </div>
    </div>
  );
}
