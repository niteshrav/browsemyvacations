"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { ADMIN_DEFAULT_REDIRECT } from "@/lib/admin-routes";
import {
  ADMIN_LOGIN_DIALOG_TITLE,
  ADMIN_LOGIN_TRIGGER_LABEL,
} from "@/lib/admin-login-ui";

export function AdminLoginDialog() {
  const router = useRouter();
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
  }

  function handleSuccess() {
    close();
    router.push(ADMIN_DEFAULT_REDIRECT);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="nav-link font-semibold text-teal-800"
        aria-haspopup="dialog"
      >
        {ADMIN_LOGIN_TRIGGER_LABEL}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-20 sm:justify-end sm:pt-24 sm:pr-8">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/40"
            aria-label="Close admin login"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-testid="admin-login-dialog"
            className="relative w-full max-w-sm rounded-xl border border-stone-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-lg font-bold text-stone-900">
                {ADMIN_LOGIN_DIALOG_TITLE}
              </h2>
              <button
                type="button"
                onClick={close}
                className="text-stone-400 hover:text-stone-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm text-stone-600">
              Sign in to manage destinations, packages, and leads.
            </p>

            <div className="mt-6">
              <AdminLoginForm formIdPrefix="admin-dialog" onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
