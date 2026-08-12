import Link from "next/link";
import { PackageCardImage } from "@/components/package-card-image";
import { formatInrPrice } from "@/lib/format";
import { packageCardMediaClassName, resolvePackageImage } from "@/lib/package-images";
import type { PackageCard as PackageCardType } from "@/types/catalog";

type Props = {
  pkg: PackageCardType;
};

export function PackageCard({ pkg }: Props) {
  const imageSrc = resolvePackageImage(pkg);

  return (
    <article className="group mx-auto flex h-full w-full max-w-[22rem] flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-[0_8px_22px_rgba(28,25,23,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,118,110,0.12)] sm:max-w-none">
      <div className={packageCardMediaClassName(imageSrc)}>
        <PackageCardImage pkg={pkg} alt={`${pkg.title} preview`} />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <h3 className="text-[0.875rem] font-semibold leading-snug text-stone-900 sm:text-[0.925rem]">
          {pkg.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-stone-600 sm:text-[13px]">
          {pkg.shortDescription}
        </p>
        <p className="mt-2 text-[11px] text-stone-500 sm:text-xs">
          {pkg.duration.nights} nights / {pkg.duration.days} days
        </p>
        <p className="mt-1 text-[0.95rem] font-bold text-teal-800 sm:text-base">
          {pkg.price.discount != null && pkg.price.discount > 0 ? (
            <>
              <span className="mr-2 text-[0.8rem] font-medium text-stone-400 line-through">
                {formatInrPrice(pkg.price.display, true)}
              </span>
              {formatInrPrice(pkg.price.discount, pkg.price.isFixed)}
            </>
          ) : (
            formatInrPrice(pkg.price.display, pkg.price.isFixed)
          )}
        </p>
        <div className="mt-auto flex flex-col gap-1.5 pt-3 sm:flex-row sm:gap-2">
          <Link href={`/packages/${pkg.slug}`} className="btn-secondary flex-1 px-2.5 py-1.5 text-center text-[11px] sm:text-xs">
            View Details
          </Link>
          <Link href={`/packages/${pkg.slug}?quote=1`} className="btn-primary flex-1 px-2.5 py-1.5 text-center text-[11px] sm:text-xs">
            Customise &amp; Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
