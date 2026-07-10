import { MICE_PAGE } from "@bmv/shared";
import { MarketingHero } from "@/components/marketing/marketing-hero";

export function MiceHero() {
  const { hero } = MICE_PAGE;
  return (
    <MarketingHero
      heading={hero.heading}
      description={hero.description}
      image={hero.image}
      imageAlt={hero.imageAlt}
      primaryCta={hero.primaryCta}
      secondaryCta={hero.secondaryCta}
    />
  );
}
