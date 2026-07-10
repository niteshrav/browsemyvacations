import { MICE_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceServicesSection() {
  const { services } = MICE_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={services.heading} className="mb-12" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <TourismImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-teal-800">
                    <span className="text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
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
