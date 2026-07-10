import { MICE_PAGE } from "@bmv/shared";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceProcessSection() {
  const { process } = MICE_PAGE;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={process.heading} className="mb-12" />

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-teal-200 lg:block" aria-hidden />

          <ol className="grid gap-8 lg:grid-cols-5">
            {process.steps.map((step, index) => (
              <FadeUp key={step.step} delay={index * 0.08}>
                <li className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-teal-700 text-lg font-bold text-white shadow-lg shadow-teal-900/20">
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-teal-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.description}</p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
