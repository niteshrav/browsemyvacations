import { MICE_PAGE } from "@bmv/shared";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceClientsSection() {
  const { clients } = MICE_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={clients.heading} className="mb-12" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clients.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.05}>
              <article className="h-full rounded-2xl border border-white bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="font-bold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
