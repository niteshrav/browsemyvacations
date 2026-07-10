import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";

const QUICK_ACTIONS = [
  { title: "Destinations", description: "Manage destination visibility, content, and ordering.", href: "/admin/destinations" },
  { title: "Packages", description: "Create and update package cards, pricing, and metadata.", href: "/admin/packages" },
  { title: "Leads", description: "Track incoming leads, statuses, and follow-up notes.", href: "/admin/leads" },
  { title: "Vacation Meter", description: "Control disclaimer and pricing multipliers.", href: "/admin/meter" },
] as const;

export default function AdminIndexPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Super Admin Dashboard"
        description="Control website content, catalog modules, and operational settings from a single command center."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {QUICK_ACTIONS.map((item) => (
          <AdminPanel key={item.href} title={item.title} description={item.description}>
            <Link href={item.href} className="btn-secondary text-sm">
              Open {item.title}
            </Link>
          </AdminPanel>
        ))}
      </div>
    </div>
  );
}
