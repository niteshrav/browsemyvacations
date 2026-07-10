import { BMV_CONTACT, CONTACT_PAGE } from "@bmv/shared";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FadeUp } from "@/components/marketing/fade-up";
import { ContactIcon } from "./contact-ui";
import { getSiteUrl } from "@/lib/site-url";

const WHY_ICONS: Record<string, string> = {
  "expert-planning": "planning",
  "custom-packages": "packages",
  "fast-response": "response",
  assistance: "support",
};

export function ContactInfoCards() {
  const { contactInfo } = CONTACT_PAGE;
  const siteUrl = getSiteUrl();
  const websiteDisplay = siteUrl.replace(/^https?:\/\//, "");

  const cards = [
    {
      id: "address",
      label: "Office Address",
      value: BMV_CONTACT.address,
      icon: "location",
      href: undefined,
    },
    {
      id: "phone",
      label: "Phone Number",
      value: BMV_CONTACT.phoneDisplay,
      icon: "phone",
      href: BMV_CONTACT.telHref,
    },
    {
      id: "email",
      label: "Email Address",
      value: BMV_CONTACT.email,
      icon: "email",
      href: BMV_CONTACT.mailtoHref,
    },
    {
      id: "hours",
      label: "Working Hours",
      value: BMV_CONTACT.hours,
      icon: "clock",
      href: undefined,
    },
    {
      id: "website",
      label: "Website",
      value: websiteDisplay,
      icon: "globe",
      href: siteUrl,
    },
  ] as const;

  return (
    <section className="bg-stone-50 py-16 sm:py-20" aria-labelledby="contact-info-heading">
      <div className="site-container">
        <SectionHeading
          eyebrow={contactInfo.eyebrow}
          title={contactInfo.heading}
          description={contactInfo.description}
        />

        <div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          data-testid="contact-details"
        >
          {cards.map((card, index) => (
            <FadeUp key={card.id} delay={index * 0.06}>
              <ContactCard card={card} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  card,
}: {
  card: {
    id: string;
    label: string;
    value: string;
    icon: string;
    href?: string;
  };
}) {
  const inner = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
        <ContactIcon name={card.icon} />
      </span>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">{card.label}</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-stone-800">{card.value}</p>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5";

  if (card.href) {
    return (
      <a href={card.href} className={className} {...(card.id === "website" ? {} : {})}>
        {inner}
      </a>
    );
  }

  return <article className={className}>{inner}</article>;
}

export function ContactWhySection() {
  const { whyContact } = CONTACT_PAGE;

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="why-contact-heading">
      <div className="site-container">
        <SectionHeading
          eyebrow={whyContact.eyebrow}
          title={whyContact.heading}
          description={whyContact.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyContact.items.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.08}>
              <article className="group h-full rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-stone-50/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                  <ContactIcon name={WHY_ICONS[item.id] ?? "planning"} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
