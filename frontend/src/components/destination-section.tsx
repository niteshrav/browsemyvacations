import { PackageCard } from "@/components/package-card";
import type { Destination, PackageCard as PackageCardType } from "@/types/catalog";

type Props = {
  destination: Destination;
  packages: PackageCardType[];
};

export function DestinationSection({ destination, packages }: Props) {
  if (packages.length === 0) return null;

  return (
    <section id={destination.slug} className="mt-16 scroll-mt-24">
      <div className="mb-6 border-b border-stone-200 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          {destination.name}
        </h2>
      </div>
      <div className="mx-auto grid max-w-[92%] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:max-w-[90%] xl:gap-7">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
