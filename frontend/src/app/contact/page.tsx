import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfoCards, ContactWhySection } from "@/components/contact/contact-info-section";
import { ContactInquiryForm } from "@/components/contact/contact-inquiry-form";
import { ContactMapSection } from "@/components/contact/contact-map-section";
import { ContactFaqSection } from "@/components/contact/contact-faq-section";
import { ContactCtaSection } from "@/components/contact/contact-cta-section";
import { ContactStickyCta } from "@/components/contact/contact-sticky-cta";
import { buildPageMetadata, PUBLIC_PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(PUBLIC_PAGE_SEO.contact);

export default function ContactPage() {
  return (
    <div className="bg-white pb-24 md:pb-0">
      <ContactHero />
      <ContactInfoCards />
      <ContactInquiryForm />
      <ContactWhySection />
      <ContactMapSection />
      <ContactFaqSection />
      <ContactCtaSection />
      <ContactStickyCta />
    </div>
  );
}
