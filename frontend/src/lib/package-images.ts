import type { PackageCard } from "@/types/catalog";
import { resolvePackageImageFallback } from "@bmv/shared";

export function resolvePackageImage(pkg: Pick<PackageCard, "images" | "title" | "slug">): string {
  const primary = pkg.images.find((image) => typeof image === "string" && image.trim().length > 0);
  if (primary) return primary;

  return resolvePackageImageFallback(pkg.title, pkg.slug);
}
