import { ABOUT_PAGE } from "@bmv/shared";
import { MarketingHero } from "@/components/marketing/marketing-hero";

export function AboutHero() {
  const { hero } = ABOUT_PAGE;
  return (
    <MarketingHero
      heading={hero.heading}
      description={hero.intro}
      image={hero.image}
      imageAlt={hero.imageAlt}
      primaryCta={hero.cta}
    />
  );
}
