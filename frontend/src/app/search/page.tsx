import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HeroSearch } from "@/components/hero-search";
import { SearchAnalytics } from "@/components/search-analytics";
import { PackageCard } from "@/components/package-card";
import { getCityTouristPlans } from "@/lib/city-tourist-plans";
import { fetchSearch } from "@/lib/discovery-api";

export const metadata: Metadata = {
  title: "Search packages",
  description: "Find vacation packages by city or keyword.",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    redirect("/");
  }

  const { packages } = await fetchSearch(query);
  const cityPlans = getCityTouristPlans(query);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SearchAnalytics query={query} />
      <h1 className="text-2xl font-bold text-teal-900">Search results</h1>
      <p className="mt-2 text-stone-600">
        Showing packages for: <span className="font-medium">{query}</span>
      </p>

      <div className="mt-6 max-w-md">
        <HeroSearch defaultQuery={query} />
      </div>

      {packages.length === 0 ? (
        <div className="mt-10 rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
          <p className="text-stone-700">No packages matched your search.</p>
          <p className="mt-2 text-sm text-stone-500">Try another city or browse from the home page.</p>
          <Link href="/" className="mt-4 inline-block text-teal-700 hover:underline">
            Browse destinations
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}

      {cityPlans.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-teal-900">City-wise tourist plans</h2>
          <p className="mt-1 text-sm text-stone-600">
            Suggested plans for <span className="font-medium">{cityPlans[0]?.city}</span>
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cityPlans.map((plan) => (
              <article key={plan.title} className="rounded-lg border border-stone-200 bg-white p-4">
                <div className="relative mb-3 h-44 overflow-hidden rounded-md bg-stone-100">
                  <Image
                    src={plan.imageUrl}
                    alt={`${plan.city} sightseeing`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-stone-800">{plan.title}</h3>
                <p className="mt-1 text-sm text-teal-700">{plan.durationLabel}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
                  {plan.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      <Link href="/" className="mt-8 inline-block text-teal-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
