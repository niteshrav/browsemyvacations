import { MICE_PAGE } from "@bmv/shared";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

function HandleIcon({ id }: { id: string }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white shadow-sm">
      {id.slice(0, 2).toUpperCase()}
    </span>
  );
}

export function MiceHandlesSection() {
  const { handles } = MICE_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={handles.heading} className="mb-12" />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {handles.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.04}>
              <article className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50/50 p-5 transition hover:border-teal-200 hover:bg-teal-50/30">
                <HandleIcon id={item.id} />
                <div>
                  <h3 className="font-bold text-teal-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{item.description}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
