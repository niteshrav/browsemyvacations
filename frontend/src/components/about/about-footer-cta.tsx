import { ABOUT_PAGE } from "@bmv/shared";
import { CtaBanner } from "@/components/marketing/cta-banner";

export function AboutFooterCta() {
  const { footerCta } = ABOUT_PAGE;
  return (
    <CtaBanner
      heading={footerCta.heading}
      image={footerCta.image}
      imageAlt={footerCta.imageAlt}
      primaryCta={footerCta.primaryCta}
      secondaryCta={footerCta.secondaryCta}
    />
  );
}
