"use client";

import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Admin login</h1>
      <p className="mt-2 text-sm text-stone-600">Sign in to manage destinations, packages, and leads.</p>
      <div className="mt-8">
        <AdminLoginForm formIdPrefix="admin-page" />
      </div>
    </div>
  );
}
