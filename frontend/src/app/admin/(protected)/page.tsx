import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";

const QUICK_ACTIONS = [
  {
    title: "Destinations",
    description: "Add, edit, hide, or restore destination sections on the website.",
    href: "/admin/destinations",
  },
  {
    title: "Packages",
    description: "Create packages, edit details, upload images, and publish/hide.",
    href: "/admin/packages",
  },
  {
    title: "Quick Picks",
    description: "Manage homepage suggestion chips linked to destinations or packages.",
    href: "/admin/suggestions",
  },
  {
    title: "Page Content",
    description: "Edit Home, About, Contact, and MICE hero copy from one place.",
    href: "/admin/content",
  },
  {
    title: "Leads",
    description: "Track incoming leads, statuses, and follow-up notes.",
    href: "/admin/leads",
  },
  {
    title: "Vacation Meter",
    description: "Control disclaimer, destination rates, and vehicle multipliers.",
    href: "/admin/meter",
  },
] as const;

export default function AdminIndexPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Super Admin Dashboard"
        description="Manage every public catalog surface and key page content from this panel — add, edit, and delete/hide."
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
