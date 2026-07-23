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
};

export function MarketingHero({
  heading,
  description,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  compact = false,
}: MarketingHeroProps) {
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
