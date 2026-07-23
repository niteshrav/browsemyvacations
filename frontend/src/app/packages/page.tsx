import type { Metadata } from "next";
import Link from "next/link";
import { CatalogEmptyState } from "@/components/catalog-empty-state";
import { LuxurySectionHeader } from "@/components/marketing/luxury-section-header";
import { PackageCard } from "@/components/package-card";
import { resolveCatalogEmptyMessage } from "@/lib/catalog-empty-state";
import { fetchPackages, isCatalogApiReachable } from "@/lib/catalog-api";
import { groupPackagesByCategory } from "@/lib/package-categories";

export const metadata: Metadata = {
  title: "Packages",
  description: "Browse all vacation packages from Browse My Vacations.",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ destination?: string }> };

export default async function PackagesPage({ searchParams }: Props) {
  const { destination } = await searchParams;
  const [packages, catalogAvailable] = await Promise.all([
    fetchPackages(destination),
    isCatalogApiReachable(),
  ]);
  const categoryGroups = destination ? [] : groupPackagesByCategory(packages);
  const emptyMessage = resolveCatalogEmptyMessage({
    catalogAvailable,
    packageCount: packages.length,
    destinationFilter: destination,
  });

  return (
    <div className="site-container py-12">
      <div className="relative">
        {destination ? (
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-teal-950 sm:text-4xl">
                Tour Packages
              </h1>
              <p className="mt-2 text-stone-600">Showing packages for {destination}</p>
            </div>
            <Link
              href="/packages"
              className="shrink-0 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm text-stone-600 transition hover:border-teal-300 hover:text-teal-700"
            >
              ✕ Clear filter
            </Link>
          </div>
        ) : (
          <LuxurySectionHeader
            eyebrow="Tour Packages"
            title="Curated Rajasthan Experiences"
            description="Handcrafted journeys designed for unforgettable memories"
          />
        )}
      </div>

      {emptyMessage ? (
        <CatalogEmptyState message={emptyMessage} destination={destination} apiDown={!catalogAvailable} />
      ) : destination ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          {categoryGroups.map((group) => (
            <section key={group.slug} id={group.slug}>
              <div className="mb-7 text-center sm:text-left">
                <h2 className="font-serif text-2xl font-semibold text-teal-950">{group.name}</h2>
                <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-teal-600/50 to-transparent sm:mx-0" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {group.packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <Link href="/" className="mt-12 inline-block text-sm text-teal-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
