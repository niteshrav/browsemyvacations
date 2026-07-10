"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PackageDetailSections } from "@/components/package-detail-sections";
import { QuoteFormPanel } from "@/components/quote-form-panel";
import type { PackageDetail } from "@/types/catalog";

type Props = { pkg: PackageDetail };

export function PackageDetailClient({ pkg }: Props) {
  const searchParams = useSearchParams();
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("quote") === "1") {
      setQuoteOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <PackageDetailSections pkg={pkg} onQuoteClick={() => setQuoteOpen(true)} />

      <QuoteFormPanel
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        source="package_detail"
        packageSlug={pkg.slug}
        packageTitle={pkg.title}
      />
    </>
  );
}