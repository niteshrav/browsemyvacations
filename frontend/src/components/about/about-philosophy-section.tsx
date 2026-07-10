import { ABOUT_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function AboutPhilosophySection() {
  const { philosophy } = ABOUT_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <SectionHeading title={philosophy.heading} align="left" className="max-w-none" />
            <p className="mt-6 text-xl leading-relaxed text-stone-700 sm:text-2xl sm:leading-relaxed">
              {philosophy.body}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-teal-900/10">
              <TourismImage
                src={philosophy.image}
                alt={philosophy.imageAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
