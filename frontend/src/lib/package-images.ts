import type { PackageCard } from "@/types/catalog";
import { deliverPackageCoverUrl, isPackageMarketingImageUrl, resolvePackageImageSource } from "@bmv/shared";

export function resolvePackageImage(pkg: Pick<PackageCard, "images" | "title" | "slug">): string {
  return deliverPackageCoverUrl(resolvePackageImageSource(pkg.images, pkg.title, pkg.slug));
}

export function packageCardMediaClassName(src: string): string {
  if (isPackageMarketingImageUrl(src)) {
    return "aspect-square overflow-hidden bg-stone-100";
  }
  return "aspect-[4/3] overflow-hidden bg-stone-100";
}

export function packageCardImageClassName(src: string): string {
  if (isPackageMarketingImageUrl(src)) {
    return "h-full w-full object-cover object-center";
  }
  return "h-full w-full object-cover object-center";
}

export function packageHeroImageClassName(src: string): string {
  if (isPackageMarketingImageUrl(src)) {
    return "aspect-[4/3] w-full object-contain object-center lg:aspect-square";
  }
  return "aspect-[4/3] w-full object-cover object-center lg:aspect-square";
}
