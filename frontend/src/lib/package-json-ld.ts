import type { PackageDetail } from "@/types/catalog";
import { getSiteUrl } from "./site-url";

export function buildPackageJsonLd(pkg: PackageDetail) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.shortDescription,
    url: `${siteUrl}/packages/${pkg.slug}`,
    image: pkg.images[0],
    offers: {
      "@type": "Offer",
      price: pkg.price.display,
      priceCurrency: pkg.price.currency,
      availability: "https://schema.org/InStock",
    },
  };
}
