import Link from "next/link";
import { CONTACT_PAGE } from "@bmv/shared";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "@/components/marketing/fade-up";
import { getGeneralWhatsAppHref } from "@/lib/whatsapp";

export function ContactCtaSection() {
  const { cta } = CONTACT_PAGE;
  const whatsappHref = getGeneralWhatsAppHref();

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <TourismImage src={cta.image} alt={cta.imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/85 via-teal-900/75 to-teal-900/50" />
      </div>

      <div className="site-container relative py-20 text-center sm:py-24">
        <FadeUp>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{cta.heading}</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={cta.primaryCta.href} className="btn-primary min-w-[200px] px-6 py-3.5 text-base shadow-lg">
              {cta.primaryCta.label}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-lg border border-white/30 bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#1da851]"
            >
              {cta.secondaryCta.label}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
