export function buildMiceInquiryMessage(fields: {
  company: string;
  eventType: string;
  groupSize: string;
  preferredDates: string;
  message: string;
}): string {
  return [
    `Company: ${fields.company}`,
    `Event type: ${fields.eventType}`,
    `Estimated group size: ${fields.groupSize}`,
    `Preferred dates: ${fields.preferredDates || "Flexible"}`,
    fields.message ? `Additional details: ${fields.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
