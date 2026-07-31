import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutCurateSection } from "@/components/about/about-curate-section";
import { AboutPhilosophySection } from "@/components/about/about-philosophy-section";
import { AboutWhyMattersSection } from "@/components/about/about-why-matters-section";
import { AboutFooterCta } from "@/components/about/about-footer-cta";
import { buildPageMetadata, PUBLIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(PUBLIC_PAGE_SEO.about);

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <AboutCurateSection />
      <AboutPhilosophySection />
      <AboutWhyMattersSection />
      <AboutFooterCta />
    </div>
  );
}
