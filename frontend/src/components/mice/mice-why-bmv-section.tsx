import { MICE_PAGE } from "@bmv/shared";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceWhyBmvSection() {
  const { whyBmv } = MICE_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={whyBmv.heading} className="mb-12" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyBmv.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
