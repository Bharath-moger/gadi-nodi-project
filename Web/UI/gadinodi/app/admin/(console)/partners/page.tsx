import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Partners",
  robots: { index: false, follow: false },
};

type PartnersPayload = {
  items: Array<{
    id: string;
    businessName: string;
    phone: string;
    city: string;
    onboardingCompleted: boolean;
    user: { email: string; name: string | null; role: string };
    partnerType: { slug: string; name: string };
  }>;
};

export default async function AdminPartnersPage() {
  const { ok, data } = await fetchAdminApi<PartnersPayload>("partners?take=75&skip=0");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Partners</h2>
        <p className="page-copy">Could not load partner profiles.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Partners</h2>
        <p className="app-admin-page__subtitle">Seller profiles linked to user accounts.</p>
      </div>

      <div className="app-admin-card app-admin-card--table">
        <table className="partner-inventory-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>User</th>
              <th>Type</th>
              <th>City</th>
              <th>Onboarding</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.businessName}</strong>
                  <div className="partner-inventory-meta">{p.phone}</div>
                </td>
                <td>
                  {p.user.email}
                  <div className="partner-inventory-meta">{p.user.name ?? "—"} · {p.user.role}</div>
                </td>
                <td>{p.partnerType.name}</td>
                <td>{p.city}</td>
                <td>{p.onboardingCompleted ? "Complete" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
