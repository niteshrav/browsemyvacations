"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FaqAccordionProps = {
  items: ReadonlyArray<{ id: string; question: string; answer: string }>;
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
      {items.map((item, index) => (
        <FaqItem key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

function FaqItem({
  item,
  index,
  reduceMotion,
}: {
  item: { id: string; question: string; answer: string };
  index: number;
  reduceMotion: boolean | null;
}) {
  const content = (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-teal-900 transition hover:text-teal-700 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span>{item.question}</span>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm leading-relaxed text-stone-600 sm:px-6 sm:text-base">
        {item.answer}
      </div>
    </details>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {content}
    </motion.div>
  );
}

export function FormToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      className="fixed right-4 top-24 z-[60] flex max-w-sm items-start gap-3 rounded-xl border border-teal-200 bg-white px-4 py-3 shadow-lg shadow-teal-900/10"
      data-testid="contact-success-toast"
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        ✓
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-teal-900">Inquiry sent</p>
        <p className="mt-0.5 text-sm text-stone-600">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </motion.div>
  );
}

export function LoadingSpinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function ContactIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const icons: Record<string, ReactNode> = {
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h3l2 5-2 1a13 13 0 006 6l1-2 5 2v3a2 2 0 01-2 2A15 15 0 015 6a2 2 0 012-2z" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path strokeLinecap="round" d="M3 7l9 6 9-6" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 2" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
    ),
    planning: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    packages: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    response: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    support: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return <>{icons[name] ?? null}</>;
}
