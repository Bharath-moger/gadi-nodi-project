import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Reports",
  robots: { index: false, follow: false },
};

type ReportsPayload = {
  usersTotal: number;
  vehiclesByCondition: Array<{ condition: string; count: number }>;
};

export default async function AdminReportsPage() {
  const { ok, data } = await fetchAdminApi<ReportsPayload>("reports");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Reports</h2>
        <p className="page-copy">Could not load reports.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Reports</h2>
        <p className="app-admin-page__subtitle">Aggregated metrics from the database.</p>
      </div>

      <div className="app-admin-stats">
        <article className="app-admin-card">
          <p className="eyebrow">Total users</p>
          <p className="app-admin-kpi">{data.usersTotal.toLocaleString("en-IN")}</p>
          <p className="page-copy">All roles included.</p>
        </article>
      </div>

      <div className="app-admin-card app-admin-card--table" style={{ marginTop: 16 }}>
        <table className="partner-inventory-table">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Vehicle count</th>
            </tr>
          </thead>
          <tbody>
            {data.vehiclesByCondition.map((row) => (
              <tr key={row.condition}>
                <td>{row.condition}</td>
                <td>{row.count.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
