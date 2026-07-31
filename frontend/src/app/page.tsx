import type { Metadata } from "next";
import { DestinationSection } from "@/components/destination-section";
import { CatalogEmptyState } from "@/components/catalog-empty-state";
import { HeroSearch } from "@/components/hero-search";
import { HeroStage } from "@/components/hero-stage";
import { HeroTrustRibbon } from "@/components/hero-trust-ribbon";
import { HeroValueProps } from "@/components/hero-value-props";
import { SuggestionBar } from "@/components/suggestion-bar";
import { resolveCatalogEmptyMessage } from "@/lib/catalog-empty-state";
import { loadHomePageData } from "@/lib/home-catalog";
import { buildPageMetadata, PUBLIC_PAGE_SEO } from "@/lib/seo";
import { loadHomeHeroCopy } from "@/lib/site-content-api";

export const metadata: Metadata = buildPageMetadata(PUBLIC_PAGE_SEO.home);

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ suggestions, packagesByDest, catalogAvailable }, heroCopy] = await Promise.all([
    loadHomePageData(),
    loadHomeHeroCopy(),
  ]);
  const heroImageAnchor = new Date().toISOString().slice(0, 10);
  const packageCount = packagesByDest.reduce((total, section) => total + section.packages.length, 0);
  const emptyMessage = resolveCatalogEmptyMessage({ catalogAvailable, packageCount });

  return (
    <div>
      <section className="relative overflow-hidden">
        <HeroStage anchor={heroImageAnchor}>
          <section
            className="relative mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-[34rem] lg:text-left xl:max-w-[38rem]"
            data-testid="hero-copy"
          >
            <h1 className="font-serif text-[2.35rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0a1628] sm:text-[2.75rem] md:text-[3.15rem] md:leading-[1.06]">
              <span className="block">{heroCopy.headlinePrimary}</span>
              <span className="mt-1 block font-extrabold text-[#0a4f4a]">{heroCopy.headlineAccent}</span>
            </h1>
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 lg:mx-0 lg:justify-start">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-600/80" aria-hidden />
              <span className="h-1.5 w-1.5 rotate-45 bg-amber-600" aria-hidden />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-600/80" aria-hidden />
            </div>
            <p className="mx-auto mt-4 max-w-md text-base font-bold leading-relaxed text-[#0a1628] sm:text-lg lg:mx-0 lg:max-w-lg">
              {heroCopy.support}
            </p>
            <HeroSearch />
            <HeroValueProps />
          </section>
        </HeroStage>
        <div className="site-container relative z-10">
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
