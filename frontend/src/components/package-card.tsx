import Link from "next/link";
import { PackageCardImage } from "@/components/package-card-image";
import { formatInrPrice } from "@/lib/format";
import type { PackageCard as PackageCardType } from "@/types/catalog";

type Props = {
  pkg: PackageCardType;
};

export function PackageCard({ pkg }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100 sm:aspect-square">
        <PackageCardImage pkg={pkg} alt={`${pkg.title} preview`} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-stone-900">{pkg.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {pkg.shortDescription}
        </p>
        <p className="mt-3 text-sm text-stone-500">
          {pkg.duration.nights} nights / {pkg.duration.days} days
        </p>
        <p className="mt-2 text-xl font-bold text-teal-800">
          {formatInrPrice(pkg.price.display, pkg.price.isFixed)}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link href={`/packages/${pkg.slug}`} className="btn-secondary flex-1 text-center">
            View Details
          </Link>
          <Link href={`/packages/${pkg.slug}?quote=1`} className="btn-primary flex-1 text-center">
            Customise &amp; Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
