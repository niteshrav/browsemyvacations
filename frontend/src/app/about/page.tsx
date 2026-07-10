import type { Metadata } from "next";
import { ABOUT_PAGE } from "@bmv/shared";
import { AboutHero } from "@/components/about/about-hero";
import { AboutCurateSection } from "@/components/about/about-curate-section";
import { AboutPhilosophySection } from "@/components/about/about-philosophy-section";
import { AboutWhyMattersSection } from "@/components/about/about-why-matters-section";
import { AboutFooterCta } from "@/components/about/about-footer-cta";

export const metadata: Metadata = {
  title: ABOUT_PAGE.metadata.title,
  description: ABOUT_PAGE.metadata.description,
};

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
