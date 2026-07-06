"use client";

import { QuoteForm } from "./quote-form";

type Props = {
  open: boolean;
  onClose: () => void;
  source: "package_card" | "package_detail";
  packageSlug: string;
  packageTitle: string;
};

export function QuoteFormPanel({ open, onClose, source, packageSlug, packageTitle }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-form-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="quote-form-title" className="text-xl font-semibold text-teal-900">
            Customise &amp; Quote
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <QuoteForm
          source={source}
          packageSlug={packageSlug}
          packageTitle={packageTitle}
          onCancel={onClose}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
