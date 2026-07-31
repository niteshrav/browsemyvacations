import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PackageJsonLd } from "@/components/package-json-ld";
import { fetchPackageBySlug } from "@/lib/catalog-api";
import { buildPageMetadata } from "@/lib/seo";
import { PackageDetailClient } from "./package-detail-client";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await fetchPackageBySlug(slug);
  if (!pkg) {
    return buildPageMetadata({
      title: "Package not found",
      description: "This vacation package could not be found.",
      path: `/packages/${slug}`,
      index: false,
    });
  }
  const title = pkg.seo?.title?.trim() || pkg.title;
  const description = pkg.seo?.description?.trim() || pkg.shortDescription;
  const destinationNames = pkg.destinations?.map((d) => d.name).filter(Boolean) ?? [];
  return buildPageMetadata({
    title,
    description,
    path: `/packages/${pkg.slug}`,
    image: pkg.images[0],
    keywords: [
      pkg.title,
      ...destinationNames,
      "Rajasthan tour package",
      "Browse My Vacations",
      pkg.category?.name,
    ].filter((value): value is string => Boolean(value)),
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await fetchPackageBySlug(slug);
  if (!pkg) notFound();

  return (
    <>
      <PackageJsonLd pkg={pkg} />
      <Suspense fallback={<div className="p-12 text-center text-stone-600">Loading…</div>}>
        <PackageDetailClient pkg={pkg} />
      </Suspense>
    </>
  );
}
