import Link from "next/link";
import { TourismImage } from "@/components/tourism-image";
import { FadeUp } from "./fade-up";

type CtaBannerProps = {
  heading: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function CtaBanner({ heading, image, imageAlt, primaryCta, secondaryCta }: CtaBannerProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <TourismImage src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-teal-950/75 backdrop-blur-[2px]" />
      </div>

      <div className="site-container relative py-20 text-center sm:py-24">
        <FadeUp>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-white/40" aria-hidden />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={primaryCta.href} className="btn-primary min-w-[200px] px-6 py-3.5 text-base">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn-secondary min-w-[200px] border-white/30 bg-white/95 px-6 py-3.5 text-base">
              {secondaryCta.label}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
