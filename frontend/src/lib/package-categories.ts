import { PACKAGE_BIBLE_CATEGORIES } from "@bmv/shared";
import type { PackageCard } from "@/types/catalog";

export type PackageCategoryGroup = {
  slug: string;
  name: string;
  packages: PackageCard[];
};

export function groupPackagesByCategory(packages: PackageCard[]): PackageCategoryGroup[] {
  const grouped = new Map<string, PackageCategoryGroup>();

  for (const category of PACKAGE_BIBLE_CATEGORIES) {
    grouped.set(category.slug, { slug: category.slug, name: category.name, packages: [] });
  }

  for (const pkg of packages) {
    const key = pkg.category?.slug ?? "custom";
    const name = pkg.category?.name ?? "Other Packages";
    if (!grouped.has(key)) {
      grouped.set(key, { slug: key, name, packages: [] });
    }
    grouped.get(key)!.packages.push(pkg);
  }

  return [...grouped.values()].filter((group) => group.packages.length > 0);
}
