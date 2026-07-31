import type { Metadata } from "next";
import { MiceHero } from "@/components/mice/mice-hero";
import { MiceIntroSection } from "@/components/mice/mice-intro-section";
import { MiceServicesSection } from "@/components/mice/mice-services-section";
import { MiceWhyBmvSection } from "@/components/mice/mice-why-bmv-section";
import { MiceDestinationsSection } from "@/components/mice/mice-destinations-section";
import { MiceHandlesSection } from "@/components/mice/mice-handles-section";
import { MiceClientsSection } from "@/components/mice/mice-clients-section";
import { MiceFormatsSection } from "@/components/mice/mice-formats-section";
import { MiceProcessSection } from "@/components/mice/mice-process-section";
import { MiceCtaBanner } from "@/components/mice/mice-cta-banner";
import { MiceFormSection } from "@/components/mice/mice-form-section";
import { MiceSeoSection } from "@/components/mice/mice-seo-section";
import { buildPageMetadata, PUBLIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(PUBLIC_PAGE_SEO.mice);

export default function MicePage() {
  return (
    <div className="bg-white">
      <MiceHero />
      <MiceIntroSection />
      <MiceServicesSection />
      <MiceWhyBmvSection />
      <MiceDestinationsSection />
      <MiceHandlesSection />
      <MiceClientsSection />
      <MiceFormatsSection />
      <MiceProcessSection />
      <MiceCtaBanner />
      <MiceFormSection />
      <MiceSeoSection />
    </div>
  );
}
