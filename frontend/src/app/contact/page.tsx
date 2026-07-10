import type { Metadata } from "next";
import { CONTACT_PAGE } from "@bmv/shared";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfoCards, ContactWhySection } from "@/components/contact/contact-info-section";
import { ContactInquiryForm } from "@/components/contact/contact-inquiry-form";
import { ContactMapSection } from "@/components/contact/contact-map-section";
import { ContactFaqSection } from "@/components/contact/contact-faq-section";
import { ContactCtaSection } from "@/components/contact/contact-cta-section";
import { ContactStickyCta } from "@/components/contact/contact-sticky-cta";

export const metadata: Metadata = {
  title: CONTACT_PAGE.metadata.title,
  description: CONTACT_PAGE.metadata.description,
};

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
