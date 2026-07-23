import type { PackageCard } from "@/types/catalog";
import { deliverCdnImageUrl, resolvePackageImageFallback } from "@bmv/shared";

export function resolvePackageImage(pkg: Pick<PackageCard, "images" | "title" | "slug">): string {
  const primary = pkg.images.find((image) => typeof image === "string" && image.trim().length > 0);
  const source = primary ?? resolvePackageImageFallback(pkg.title, pkg.slug);
  return deliverCdnImageUrl(source, { width: 1200, crop: "fill" });
}
