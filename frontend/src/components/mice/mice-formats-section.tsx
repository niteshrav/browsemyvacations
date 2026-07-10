import { MICE_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceFormatsSection() {
  const { formats } = MICE_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={formats.heading} className="mb-12" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formats.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <TourismImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-teal-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
