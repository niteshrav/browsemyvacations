const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+\-()]{6,20}$/;

export function isValidContactEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isValidContactPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!PHONE_PATTERN.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
}

export function buildContactInquiryMessage(fields: {
  destination: string;
  travelDates: string;
  budget: string;
  travelType: string;
  message: string;
}): string {
  return [
    `Destination: ${fields.destination || "Flexible"}`,
    `Travel dates: ${fields.travelDates || "Flexible"}`,
    `Budget: ${fields.budget || "Not specified"}`,
    `Travel type: ${fields.travelType}`,
    fields.message ? `Message: ${fields.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
