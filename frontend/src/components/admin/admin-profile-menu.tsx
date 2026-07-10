"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminChangePassword, clearAdminToken, getAdminProfileFromToken, setAdminToken } from "@/lib/admin-auth";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-routes";
import { adminInputClassName, adminLabelClassName } from "@/lib/admin-ui";

type Props = {
  email: string;
  role: string;
};

export function AdminProfileMenu({ email, role }: Props) {
  const router = useRouter();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initials = email.slice(0, 2).toUpperCase() || "SA";

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from current password.");
      return;
    }

    setSubmitting(true);
    try {
      const { accessToken } = await adminChangePassword({
        email,
        currentPassword,
        newPassword,
      });
      setAdminToken(accessToken);
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">{role}</p>
            <p className="text-xs font-medium text-stone-700">{email}</p>
            <button
              type="button"
              className="mt-1 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:underline"
              onClick={() => {
                setShowPasswordForm((prev) => !prev);
                setError(null);
                setMessage(null);
              }}
            >
              Change password
            </button>
          </div>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          View site
        </Link>
        <button
          type="button"
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
          onClick={() => {
            clearAdminToken();
            router.push(ADMIN_LOGIN_PATH);
          }}
        >
          Sign out
        </button>
      </div>

      {message ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
          {message}
        </p>
      ) : null}

      {showPasswordForm ? (
        <form
          onSubmit={handleChangePassword}
          className="w-full max-w-xl rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
          data-testid="admin-change-password-form"
        >
          <p className="text-sm font-semibold text-stone-900">Update admin password</p>
          <p className="mt-1 text-xs text-stone-500">Signed in as {getAdminProfileFromToken()?.email ?? email}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="admin-current-password" className={adminLabelClassName()}>
                Current password
              </label>
              <input
                id="admin-current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="current-password"
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label htmlFor="admin-new-password" className={adminLabelClassName()}>
                New password
              </label>
              <input
                id="admin-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={adminInputClassName()}
              />
            </div>
            <div>
              <label htmlFor="admin-confirm-password" className={adminLabelClassName()}>
                Confirm password
              </label>
              <input
                id="admin-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className={adminInputClassName()}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-60">
              {submitting ? "Updating…" : "Save new password"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
              onClick={() => {
                setShowPasswordForm(false);
                setError(null);
              }}
            >
              Cancel
            </button>
            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          </div>
        </form>
      ) : null}
    </div>
  );
}
