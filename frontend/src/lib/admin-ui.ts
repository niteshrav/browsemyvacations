export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/meter", label: "Meter" },
] as const;

export type AdminLeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export function adminShellClassName(): string {
  return "border-t border-stone-200 bg-gradient-to-b from-stone-100/80 to-stone-50";
}

export function adminContainerClassName(): string {
  return "site-container py-6 sm:py-8";
}

export function adminTopBarClassName(): string {
  return "rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5";
}

export function adminContentClassName(): string {
  return "mt-6";
}

export function adminPageTitleClassName(): string {
  return "text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl";
}

export function adminPageDescriptionClassName(): string {
  return "mt-1 max-w-3xl text-sm leading-relaxed text-stone-600";
}

export function adminPanelClassName(): string {
  return "rounded-2xl border border-stone-200 bg-white shadow-sm";
}

export function adminPanelHeaderClassName(): string {
  return "border-b border-stone-100 px-5 py-4 sm:px-6";
}

export function adminPanelBodyClassName(): string {
  return "p-5 sm:p-6";
}

export function adminInputClassName(): string {
  return "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";
}

export function adminLabelClassName(): string {
  return "block text-sm font-medium text-stone-700";
}

export function adminTableWrapClassName(): string {
  return "overflow-x-auto";
}

export function adminTableClassName(): string {
  return "min-w-full divide-y divide-stone-100 text-sm";
}

export function adminTableHeadClassName(): string {
  return "bg-stone-50 text-left text-xs font-semibold uppercase tracking-wide text-stone-500";
}

export function adminNavLinkClassName(active: boolean): string {
  return [
    "rounded-lg px-3 py-2 text-sm font-medium transition",
    active
      ? "bg-teal-700 text-white shadow-sm"
      : "text-stone-600 hover:bg-stone-100 hover:text-teal-800",
  ].join(" ");
}

export function adminStatusBadgeClassName(status: string, active?: boolean): string {
  if (status === "active" || active === true) {
    return "inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200";
  }
  if (active === false) {
    return "inline-flex rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-500 ring-1 ring-stone-200";
  }

  const map: Record<string, string> = {
    new: "bg-sky-50 text-sky-700 ring-sky-200",
    contacted: "bg-amber-50 text-amber-800 ring-amber-200",
    quoted: "bg-violet-50 text-violet-700 ring-violet-200",
    won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    lost: "bg-stone-100 text-stone-600 ring-stone-200",
  };

  const colors = map[status] ?? "bg-stone-100 text-stone-600 ring-stone-200";
  return `inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ${colors}`;
}

export function isAdminNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
