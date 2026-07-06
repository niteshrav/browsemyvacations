/** Build href for the public search results page. */
export function buildSearchHref(query: string): string {
  const q = query.trim();
  if (!q) return "/";
  return `/search?q=${encodeURIComponent(q)}`;
}
