/** Strip HTML tags from user text (XSS mitigation for stored/displayed strings). */
export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
