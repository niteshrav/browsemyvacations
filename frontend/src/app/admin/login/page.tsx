import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSeedCredentialsForDisplay, isDefaultAdminSeedCredentials } from "@/lib/admin-login-ui";

export default function AdminLoginPage() {
  const creds = getAdminSeedCredentialsForDisplay();
  const showHint = isDefaultAdminSeedCredentials(creds);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-stone-900">Admin login</h1>
      <p className="mt-2 text-center text-sm text-stone-600">
        Manage destinations, packages, leads, and vacation meter settings.
      </p>

      {showHint && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
          <p className="font-semibold">Dev credentials</p>
          <p className="mt-2">
            Email: <span className="font-mono">{creds.email}</span>
          </p>
          <p className="mt-1">
            Password: <span className="font-mono">{creds.password}</span>
          </p>
        </div>
      )}

      <div className="mt-6">
        <AdminLoginForm formIdPrefix="admin-page" />
      </div>
    </div>
  );
}
