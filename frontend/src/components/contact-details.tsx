import { buildWhatsAppHref } from "@bmv/shared";
import type { EditableContactDetails } from "@/lib/site-content-api";

type ContactDetailsProps = {
  contact: EditableContactDetails;
  showFormHint?: boolean;
};

export function ContactDetails({ contact, showFormHint = false }: ContactDetailsProps) {
  return (
    <div className="space-y-3 text-stone-700" data-testid="contact-details">
      <p>
        Phone:{" "}
        <a href={contact.telHref} className="font-medium text-teal-800 hover:underline">
          {contact.phoneDisplay}
        </a>
      </p>
      <p>
        WhatsApp:{" "}
        <a
          href={buildWhatsAppHref("Hi Browse My Vacations, I'd like to know more about your packages.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal-800 hover:underline"
        >
          {contact.phoneDisplay}
        </a>
      </p>
      <p>
        Email:{" "}
        <a href={contact.mailtoHref} className="font-medium text-teal-800 hover:underline">
          {contact.email}
        </a>
      </p>
      <p>Address: {contact.address}</p>
      <p>Hours: {contact.hours}</p>
      <p className="text-sm text-stone-500">Browse My Vacations — curated by Browser Hotels</p>
      {showFormHint && (
        <p className="text-sm text-stone-600">
          Prefer a callback? Use the form below or call us directly — no form required.
        </p>
      )}
    </div>
  );
}
