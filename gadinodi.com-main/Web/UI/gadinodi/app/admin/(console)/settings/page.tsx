import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Settings",
  robots: { index: false, follow: false },
};

type SettingsPayload = {
  supportEmail: string | null;
  uiOrigin: string | null;
};

export default async function AdminSettingsPage() {
  const { ok, data } = await fetchAdminApi<SettingsPayload>("settings");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Settings</h2>
        <p className="page-copy">Could not load settings snapshot.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Settings</h2>
        <p className="app-admin-page__subtitle">Non-secret configuration exposed to admins from the API process.</p>
      </div>

      <div className="app-admin-card app-admin-card--table">
        <table className="partner-inventory-table">
          <tbody>
            <tr>
              <th>Support email</th>
              <td>{data.supportEmail ?? "—"}</td>
            </tr>
            <tr>
              <th>UI origin (API)</th>
              <td>{data.uiOrigin ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
