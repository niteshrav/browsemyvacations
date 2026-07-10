import Link from "next/link";
import { formatInrPrice } from "@/lib/format";
import type { PackageDetail } from "@/types/catalog";

type Props = {
  pkg: PackageDetail;
  onQuoteClick: () => void;
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-700">
          <span className="mt-0.5 shrink-0 text-teal-700" aria-hidden>
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CrossList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-700">
          <span className="mt-0.5 shrink-0 text-stone-400" aria-hidden>
            ✕
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PackageDetailSections({ pkg, onQuoteClick }: Props) {
  const image = pkg.images[0];
  const routeCities = pkg.itinerary.flatMap((day) => day.cities);
  const uniqueRoute = [...new Set(routeCities)];

  return (
    <div className="site-container py-10 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={pkg.title} className="aspect-[4/3] w-full object-cover lg:aspect-square" />
          ) : null}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{pkg.category.name}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">{pkg.title}</h1>
          <p className="mt-3 text-stone-600">
            {pkg.duration.nights} nights · {pkg.duration.days} days
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.overview.featureBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800"
              >
                {badge}
              </span>
            ))}
          </div>

          {uniqueRoute.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Destination route</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-stone-700">
                {uniqueRoute.map((city, index) => (
                  <span key={`${city}-${index}`} className="inline-flex items-center gap-2">
                    {index > 0 ? <span className="text-stone-300">→</span> : null}
                    <span>{city}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-lg leading-relaxed text-stone-700">{pkg.overview.description}</p>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">Starting from</p>
            <p className="mt-1 text-3xl font-bold text-teal-800">
              {formatInrPrice(pkg.price.display, pkg.price.isFixed)}
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
              >
                Customise &amp; Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-stone-900">Trip highlights</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {pkg.overview.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700 shadow-sm"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-stone-900">What&apos;s inside the package?</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-teal-900">Inclusions</h3>
            <div className="mt-4">
              <CheckList items={pkg.overview.inclusions} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-800">Exclusions</h3>
            <div className="mt-4">
              <CrossList items={pkg.overview.exclusions} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-stone-900">Day-wise itinerary</h2>
        <ol className="mt-6 space-y-4">
          {pkg.itinerary.map((day) => (
            <li key={day.dayNumber} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                    Day {day.dayNumber}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">{day.title}</p>
                </div>
                <p className="text-sm text-stone-500">{day.cities.join(" · ")}</p>
              </div>
              <p className="mt-4 leading-relaxed text-stone-700">{day.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-stone-900">Know before you go</h2>
        <ul className="mt-5 space-y-3">
          {pkg.overview.knowBeforeYouGo.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/packages" className="mt-10 inline-block text-sm text-teal-700 hover:underline">
        ← All packages
      </Link>
    </div>
  );
}
