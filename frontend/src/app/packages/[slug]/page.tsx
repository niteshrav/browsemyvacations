import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PackageJsonLd } from "@/components/package-json-ld";
import { fetchPackageBySlug } from "@/lib/catalog-api";
import { getSiteUrl } from "@/lib/site-url";
import { PackageDetailClient } from "./package-detail-client";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await fetchPackageBySlug(slug);
  if (!pkg) return { title: "Package not found" };
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/packages/${pkg.slug}`;
  return {
    title: pkg.title,
    description: pkg.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: pkg.title,
      description: pkg.shortDescription,
      url,
      images: pkg.images[0] ? [{ url: pkg.images[0] }] : undefined,
    },
  };
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
