/**
 * Browser extensions (for example Grammarly) inject attributes on <html>/<body>
 * before React hydrates. Suppress the expected mismatch on the root layout.
 */
export const ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING = true;

export function rootBodyClassName(): string {
  return "flex min-h-screen flex-col bg-stone-50 text-stone-900 antialiased";
}
