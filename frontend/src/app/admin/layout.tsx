import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Admin surfaces must not appear in search indexes. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  title: {
    default: "Admin",
    template: "%s | Admin | Browse My Vacations",
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}
