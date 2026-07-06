"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QuoteForm } from "@/components/quote-form";
import { QuoteFormPanel } from "@/components/quote-form-panel";
import { formatInrPrice } from "@/lib/format";
import type { PackageDetail } from "@/types/catalog";

type Props = { pkg: PackageDetail };

export function PackageDetailClient({ pkg }: Props) {
  const searchParams = useSearchParams();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const image = pkg.images[0];

  useEffect(() => {
    if (searchParams.get("quote") === "1") {
      setQuoteOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-xl bg-stone-100 lg:aspect-square">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={pkg.title} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-900">{pkg.title}</h1>
            <p className="mt-2 text-stone-600">
              {pkg.duration.nights} nights · {pkg.duration.days} days
            </p>
            <p className="mt-4 text-2xl font-semibold text-teal-800">
              {formatInrPrice(pkg.price.display, pkg.price.isFixed)}
            </p>
            <p className="mt-4 text-stone-700">{pkg.overview.description}</p>
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="mt-6 inline-block rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800"
            >
              Customise &amp; Quote
            </button>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-900">Short itinerary</h2>
          <ol className="mt-4 space-y-4">
            {pkg.itinerary.map((day) => (
              <li key={day.dayNumber} className="rounded-lg border border-stone-200 p-4">
                <p className="font-medium text-teal-800">
                  Day {day.dayNumber}: {day.title}
                </p>
                <p className="text-sm text-stone-500">{day.cities.join(" · ")}</p>
                <p className="mt-2 text-stone-700">{day.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-xl font-semibold text-teal-900">Get a custom quote</h2>
          <div className="mt-4">
            <QuoteForm
              source="package_detail"
              packageSlug={pkg.slug}
              packageTitle={pkg.title}
            />
          </div>
        </section>

        <Link href="/packages" className="mt-8 inline-block text-teal-700 hover:underline">
          ← All packages
        </Link>
      </div>

      <QuoteFormPanel
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        source="package_detail"
        packageSlug={pkg.slug}
        packageTitle={pkg.title}
      />
    </>
  );
}
