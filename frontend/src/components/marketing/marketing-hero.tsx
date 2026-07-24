import Link from "next/link";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "./fade-up";

type CtaLink = {
  label: string;
  href: string;
};

type MarketingHeroProps = {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  compact?: boolean;
  /** Framed side image with radius + shadow (contact-style). Default: full-bleed. */
  framedImage?: boolean;
};

export function MarketingHero({
  heading,
  description,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  compact = false,
  framedImage = false,
}: MarketingHeroProps) {
  if (framedImage) {
    return (
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-stone-50 via-white to-teal-50/40">
        <div
          className={`site-container relative grid items-center gap-10 ${
            compact ? "py-16 sm:py-20" : "py-16 sm:py-20 lg:py-24"
          } lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14`}
        >
          <FadeUp className="max-w-2xl">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl lg:text-5xl lg:leading-tight">
              {heading}
            </h1>
            <div className="mt-4 h-px w-16 bg-teal-700/40" aria-hidden />
            <p className="mt-5 text-lg leading-relaxed text-stone-600 sm:text-xl">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={primaryCta.href} className="btn-primary px-6 py-3.5 text-base shadow-lg shadow-teal-950/10">
                {primaryCta.label}
              </Link>
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="btn-secondary px-6 py-3.5 text-base">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </FadeUp>

          <FadeUp delay={0.08} className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-white/80 shadow-[0_22px_50px_rgba(28,25,23,0.16)] ring-1 ring-stone-900/5 sm:aspect-[5/4]">
              <TourismImage src={image} alt={imageAlt} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/20 via-transparent to-transparent" />
            </div>
          </FadeUp>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <TourismImage src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/85 via-teal-900/70 to-teal-900/40" />
      </div>

      <div className={`site-container relative ${compact ? "py-20 sm:py-24" : "py-24 sm:py-32 lg:py-36"}`}>
        <FadeUp className="max-w-3xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            {heading}
          </h1>
          <div className="mt-4 h-px w-16 bg-white/50" aria-hidden />
          <p className="mt-5 text-lg leading-relaxed text-white/90 sm:text-xl">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryCta.href} className="btn-primary px-6 py-3.5 text-base shadow-lg shadow-teal-950/20">
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
