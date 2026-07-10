import { MICE_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceDestinationsSection() {
  const { destinations } = MICE_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={destinations.heading} className="mb-12" />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {destinations.items.map((dest, index) => (
            <FadeUp key={dest.slug} delay={(index % 4) * 0.05}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <TourismImage
                    src={dest.image}
                    alt={dest.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-lg font-bold text-white">{dest.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-teal-50/90">{dest.description}</p>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
