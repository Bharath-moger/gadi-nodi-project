import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { fetchAdminApi } from "@/lib/admin-server";
import { resolveAdminRole } from "@/lib/auth/admin-role";
import { fetchAuthMe } from "@/lib/auth/me";

export const metadata: Metadata = {
  title: "Admin System",
  robots: { index: false, follow: false },
};

type SystemPayload = {
  nodeEnv: string;
  uptimeSeconds: number;
};

export default async function AdminSystemPage() {
  const me = await fetchAuthMe();
  if (resolveAdminRole(me) !== "superadmin") {
    redirect("/admin/dashboard");
  }

  const { ok, data } = await fetchAdminApi<SystemPayload>("system");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">System</h2>
        <p className="page-copy">Could not load system snapshot (superadmin only).</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">System</h2>
        <p className="app-admin-page__subtitle">Superadmin diagnostics from the API process.</p>
      </div>

      <div className="app-admin-card app-admin-card--table">
        <table className="partner-inventory-table">
          <tbody>
            <tr>
              <th>NODE_ENV</th>
              <td>{data.nodeEnv}</td>
            </tr>
            <tr>
              <th>API uptime (seconds)</th>
              <td>{data.uptimeSeconds.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
