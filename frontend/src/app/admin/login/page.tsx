import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-stone-900">Sign in</h1>
      <p className="mt-2 text-center text-sm text-stone-600">
        Manage destinations, packages, leads, and vacation meter settings.
      </p>

      <div className="mt-6">
        <AdminLoginForm formIdPrefix="admin-page" />
      </div>
    </div>
  );
}
