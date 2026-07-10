import { MICE_PAGE } from "@bmv/shared";
import { CtaBanner } from "@/components/marketing/cta-banner";

export function MiceCtaBanner() {
  const { ctaBanner } = MICE_PAGE;
  return (
    <CtaBanner
      heading={ctaBanner.heading}
      image={ctaBanner.image}
      imageAlt={ctaBanner.imageAlt}
      primaryCta={ctaBanner.primaryCta}
      secondaryCta={ctaBanner.secondaryCta}
    />
  );
}
