export function buildMiceInquiryMessage(fields: {
  company: string;
  contactPerson: string;
  destination: string;
  groupSize: string;
  travelDates: string;
  budget: string;
  requirementType: string;
  message: string;
}): string {
  return [
    `Company: ${fields.company}`,
    `Contact person: ${fields.contactPerson}`,
    `Destination: ${fields.destination || "Flexible"}`,
    `Group size: ${fields.groupSize}`,
    `Travel dates: ${fields.travelDates || "Flexible"}`,
    `Budget: ${fields.budget || "Not specified"}`,
    `Requirement type: ${fields.requirementType}`,
    fields.message ? `Additional notes: ${fields.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
