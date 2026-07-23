import Link from "next/link";
import { PackageCardImage } from "@/components/package-card-image";
import { formatInrPrice } from "@/lib/format";
import type { PackageCard as PackageCardType } from "@/types/catalog";

type Props = {
  pkg: PackageCardType;
};

export function PackageCard({ pkg }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_10px_28px_rgba(28,25,23,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,118,110,0.14)]">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100 sm:aspect-square">
        <div className="h-full w-full transition duration-700 ease-out group-hover:scale-105">
          <PackageCardImage pkg={pkg} alt={`${pkg.title} preview`} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-[0.95rem] font-semibold leading-snug text-stone-900 sm:text-base">
          {pkg.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {pkg.shortDescription}
        </p>
        <p className="mt-2.5 text-xs text-stone-500 sm:text-sm">
          {pkg.duration.nights} nights / {pkg.duration.days} days
        </p>
        <p className="mt-1.5 text-base font-bold text-teal-800 sm:text-lg">
          {formatInrPrice(pkg.price.display, pkg.price.isFixed)}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-3.5 sm:flex-row">
          <Link href={`/packages/${pkg.slug}`} className="btn-secondary flex-1 px-3 py-2 text-center text-xs sm:text-sm">
            View Details
          </Link>
          <Link href={`/packages/${pkg.slug}?quote=1`} className="btn-primary flex-1 px-3 py-2 text-center text-xs sm:text-sm">
            Customise &amp; Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
