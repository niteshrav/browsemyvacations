import { CONTACT_PAGE } from "@bmv/shared";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import type { ContactHeroCopy, EditableContactDetails } from "@/lib/site-content-api";

type Props = {
  hero: ContactHeroCopy;
  contact: EditableContactDetails;
};

export function ContactHero({ hero, contact }: Props) {
  const defaults = CONTACT_PAGE.hero;

  return (
    <MarketingHero
      heading={hero.heading}
      description={hero.description}
      image={defaults.image}
      imageAlt={defaults.imageAlt}
      primaryCta={defaults.primaryCta}
      secondaryCta={{ ...defaults.secondaryCta, href: contact.telHref }}
      framedImage
    />
  );
}
