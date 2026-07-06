import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-teal-900">Tour Packages</h1>
      <p className="mt-2 text-stone-600">
        {destination
          ? `Showing packages for ${destination}`
          : "Explore 101 curated Rajasthan itineraries from the Package Bible, grouped by travel style."}
      </p>

      {emptyMessage ? (
        <p className="mt-8 text-stone-600">{emptyMessage}</p>
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

      <Link href="/" className="mt-8 inline-block text-teal-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
