import type { Metadata } from "next";
import Link from "next/link";
import { CatalogEmptyState } from "@/components/catalog-empty-state";
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-teal-900 sm:text-3xl">Tour Packages</h1>
          <p className="mt-2 text-stone-600">
            {destination
              ? `Showing packages for ${destination}`
              : "Explore 101 curated Rajasthan itineraries from the Package Bible, grouped by travel style."}
          </p>
        </div>
        {destination && (
          <Link
            href="/packages"
            className="shrink-0 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm text-stone-600 transition hover:border-teal-300 hover:text-teal-700"
          >
            ✕ Clear filter
          </Link>
        )}
      </div>

      {emptyMessage ? (
        <CatalogEmptyState message={emptyMessage} destination={destination} apiDown={!catalogAvailable} />
      ) : destination ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {categoryGroups.map((group) => (
            <section key={group.slug} id={group.slug}>
              <div className="mb-6 border-b border-stone-200 pb-3">
                <h2 className="text-xl font-semibold text-teal-900">{group.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{group.packages.length} packages</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <Link href="/" className="mt-10 inline-block text-sm text-teal-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
