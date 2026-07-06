import type { PackageDetail } from "@/types/catalog";
import { buildPackageJsonLd } from "@/lib/package-json-ld";

type Props = { pkg: PackageDetail };

export function PackageJsonLd({ pkg }: Props) {
  const jsonLd = buildPackageJsonLd(pkg);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
