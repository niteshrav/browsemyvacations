import { MICE_PAGE } from "@bmv/shared";
import { MiceInquiryForm } from "@/components/mice-inquiry-form";
import { FadeUp } from "@/components/marketing/fade-up";
import { SectionHeading } from "@/components/marketing/section-heading";

export function MiceFormSection() {
  const { form } = MICE_PAGE;

  return (
    <section id="mice-inquiry" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="site-container">
        <SectionHeading title={form.heading} description={form.description} className="mb-10" />

        <FadeUp>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-teal-900/5 backdrop-blur-md sm:p-8">
            <MiceInquiryForm submitLabel={form.submitLabel} requirementTypes={[...form.requirementTypes]} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
