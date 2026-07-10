import Link from "next/link";
import { ABOUT_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";

export function AboutWhyMattersSection() {
  const { whyMatters } = ABOUT_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <FadeUp>
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-teal-900/10">
              <TourismImage
                src={whyMatters.image}
                alt={whyMatters.imageAlt}
                className="aspect-square w-full object-cover"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{whyMatters.heading}</p>
            <p className="mt-4 text-2xl font-medium leading-relaxed text-stone-800 sm:text-3xl">{whyMatters.body}</p>
            <Link href={whyMatters.cta.href} className="btn-primary mt-8 inline-flex px-6 py-3.5 text-base">
              {whyMatters.cta.label}
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
