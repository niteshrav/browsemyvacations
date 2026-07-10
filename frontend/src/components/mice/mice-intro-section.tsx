import { MICE_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceIntroSection() {
  const { introduction } = MICE_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <SectionHeading title={introduction.heading} align="left" className="max-w-none" />
            <p className="mt-6 text-lg leading-relaxed text-stone-600">{introduction.body}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-teal-900/10">
              <TourismImage
                src={introduction.image}
                alt={introduction.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
