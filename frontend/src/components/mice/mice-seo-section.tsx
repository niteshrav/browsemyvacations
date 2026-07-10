import { MICE_PAGE } from "@bmv/shared";
import { FadeUp } from "@/components/marketing/fade-up";

export function MiceSeoSection() {
  const { seo } = MICE_PAGE;

  return (
    <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <FadeUp>
          <div className="prose prose-stone mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-teal-900">{seo.heading}</h2>
            {seo.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-stone-600">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
