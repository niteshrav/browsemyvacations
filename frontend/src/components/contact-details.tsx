import { BMV_CONTACT } from "@bmv/shared";

type ContactDetailsProps = {
  showFormHint?: boolean;
};

export function ContactDetails({ showFormHint = false }: ContactDetailsProps) {
  return (
    <div className="space-y-3 text-stone-700" data-testid="contact-details">
      <p>
        Phone:{" "}
        <a href={BMV_CONTACT.telHref} className="font-medium text-teal-800 hover:underline">
          {BMV_CONTACT.phoneDisplay}
        </a>
      </p>
      <p>
        Email:{" "}
        <a href={BMV_CONTACT.mailtoHref} className="font-medium text-teal-800 hover:underline">
          {BMV_CONTACT.email}
        </a>
      </p>
      <p>Address: {BMV_CONTACT.address}</p>
      <p>Hours: {BMV_CONTACT.hours}</p>
      <p className="text-sm text-stone-500">{BMV_CONTACT.brandLine}</p>
      {showFormHint && (
        <p className="text-sm text-stone-600">
          Prefer a callback? Use the form below or call us directly — no form required.
        </p>
      )}
    </div>
  );
}
