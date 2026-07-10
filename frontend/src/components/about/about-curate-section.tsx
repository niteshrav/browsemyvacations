import { ABOUT_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

const CARD_ICONS = [
  <svg key="retail" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path d="M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="custom" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.8 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="mice" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
];

export function AboutCurateSection() {
  const { curate } = ABOUT_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={curate.heading} className="mb-12" />

        <div className="grid gap-8 md:grid-cols-3">
          {curate.cards.map((card, index) => (
            <FadeUp key={card.id} delay={index * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <TourismImage
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-teal-800 shadow-md backdrop-blur-sm">
                    {CARD_ICONS[index]}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-teal-900">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{card.description}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
