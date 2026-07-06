"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { adminLogin } from "@/lib/admin-api";
import { ADMIN_DEFAULT_REDIRECT } from "@/lib/admin-routes";
import { setAdminToken } from "@/lib/admin-auth";

type Props = {
  formIdPrefix?: string;
  onSuccess?: () => void;
};

export function AdminLoginForm({ formIdPrefix = "admin", onSuccess }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailId = `${formIdPrefix}-email`;
  const passwordId = `${formIdPrefix}-password`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    try {
      const { accessToken } = await adminLogin(email, password);
      setAdminToken(accessToken);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(ADMIN_DEFAULT_REDIRECT);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor={passwordId} className="block text-sm font-medium">
          Password
        </label>
        <input
          id={passwordId}
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
