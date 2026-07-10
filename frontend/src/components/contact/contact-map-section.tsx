import { CONTACT_PAGE } from "@bmv/shared";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FadeUp } from "@/components/marketing/fade-up";

export function ContactMapSection() {
  const { map } = CONTACT_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20" aria-labelledby="contact-map-heading">
      <div className="site-container">
        <SectionHeading eyebrow={map.eyebrow} title={map.heading} description={map.description} />

        <FadeUp className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg shadow-teal-900/5">
            <iframe
              title={map.title}
              src={map.embedUrl}
              className="aspect-[16/10] w-full border-0 sm:aspect-[21/9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
