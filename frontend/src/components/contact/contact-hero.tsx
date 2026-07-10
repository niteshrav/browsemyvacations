import { CONTACT_PAGE } from "@bmv/shared";
import { MarketingHero } from "@/components/marketing/marketing-hero";

export function ContactHero() {
  const { hero } = CONTACT_PAGE;

  return <MarketingHero heading={hero.heading} description={hero.description} image={hero.image} imageAlt={hero.imageAlt} primaryCta={hero.primaryCta} secondaryCta={hero.secondaryCta} />;
}
