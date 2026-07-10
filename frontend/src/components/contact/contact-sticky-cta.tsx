"use client";

import Link from "next/link";
import { BMV_CONTACT, CONTACT_PAGE } from "@bmv/shared";

export function ContactStickyCta() {
  const { stickyCta } = CONTACT_PAGE;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden"
      data-testid="contact-sticky-cta"
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <a href={BMV_CONTACT.telHref} className="btn-secondary flex-1 py-3 text-center">
          {stickyCta.callLabel}
        </a>
        <Link href={stickyCta.quoteHref} className="btn-primary flex-1 py-3 text-center">
          {stickyCta.quoteLabel}
        </Link>
      </div>
    </div>
  );
}
