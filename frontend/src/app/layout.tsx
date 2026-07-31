import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VacationFeasibilityRadarPopup } from "@/components/vacation-feasibility-radar-popup";
import { WhatsAppGlobalFab } from "@/components/whatsapp-global-fab";
import { ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING, rootBodyClassName } from "@/lib/root-layout";
import { buildRootMetadata } from "@/lib/seo";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={sourceSerif.variable}
      suppressHydrationWarning={ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING}
    >
      <body
        className={rootBodyClassName()}
        suppressHydrationWarning={ROOT_LAYOUT_SUPPRESS_HYDRATION_WARNING}
      >
        <AnalyticsProvider />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <VacationFeasibilityRadarPopup />
        <WhatsAppGlobalFab />
      </body>
    </html>
  );
}
