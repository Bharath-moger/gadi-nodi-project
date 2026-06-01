import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Approvals",
  robots: { index: false, follow: false },
};

type ApprovalsPayload = {
  total: number;
  items: Array<{
    id: string;
    businessName: string;
    phone: string;
    city: string;
    createdAt: string;
    user: { email: string; name: string | null };
    partnerType: { slug: string; name: string };
  }>;
};

export default async function AdminApprovalsPage() {
  const { ok, data } = await fetchAdminApi<ApprovalsPayload>("approvals?take=100&skip=0");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Approvals</h2>
        <p className="page-copy">Could not load approval queue.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Approvals</h2>
        <p className="app-admin-page__subtitle">
          Partner profiles where onboarding is not marked complete ({data.total} total).
        </p>
      </div>

      {data.items.length === 0 ? (
        <div className="app-admin-card">
          <p className="page-copy">No pending partner profiles.</p>
        </div>
      ) : (
        <div className="app-admin-card app-admin-card--table">
          <table className="partner-inventory-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>User</th>
                <th>Type</th>
                <th>City</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.businessName}</strong>
                    <div className="partner-inventory-meta">{row.phone}</div>
                  </td>
                  <td>
                    {row.user.email}
                    <div className="partner-inventory-meta">{row.user.name ?? "—"}</div>
                  </td>
                  <td>{row.partnerType.name}</td>
                  <td>{row.city}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
