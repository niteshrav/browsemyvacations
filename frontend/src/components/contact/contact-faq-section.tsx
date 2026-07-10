import { CONTACT_PAGE } from "@bmv/shared";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FaqAccordion } from "./contact-ui";

export function ContactFaqSection() {
  const { faq } = CONTACT_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="contact-faq-heading">
      <div className="site-container">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.heading} description={faq.description} />

        <div className="mx-auto mt-12 max-w-3xl">
          <FaqAccordion items={faq.items} />
        </div>
      </div>
    </section>
  );
}
