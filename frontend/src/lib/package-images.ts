import type { PackageCard } from "@/types/catalog";
import { deliverPackageCoverUrl, resolvePackageImageSource } from "@bmv/shared";

export function resolvePackageImage(pkg: Pick<PackageCard, "images" | "title" | "slug">): string {
  return deliverPackageCoverUrl(resolvePackageImageSource(pkg.images, pkg.title, pkg.slug));
}
