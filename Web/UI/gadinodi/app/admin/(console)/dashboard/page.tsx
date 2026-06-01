import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

type DashboardPayload = {
  userCount: number;
  vehicleCount: number;
  sparePartCount: number;
  partnerProfileCount: number;
  partnerVehicleCount: number;
  pendingPartnerApprovals: number;
  newUsersLast7Days: number;
};

export default async function AdminDashboardPage() {
  const { ok, data } = await fetchAdminApi<DashboardPayload>("dashboard");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Dashboard</h2>
        <p className="page-copy">Could not load metrics. Ensure you are signed in as an admin and the API is running.</p>
      </div>
    );
  }

  const cards = [
    { label: "Users", value: data.userCount, hint: "All registered accounts" },
    { label: "Vehicles", value: data.vehicleCount, hint: "Catalogue vehicle rows" },
    { label: "Spare parts", value: data.sparePartCount, hint: "Parts catalogue rows" },
    { label: "Partner profiles", value: data.partnerProfileCount, hint: "Seller onboarding records" },
    { label: "Partner-owned vehicles", value: data.partnerVehicleCount, hint: "Listings with an owner user" },
    { label: "Pending partner approvals", value: data.pendingPartnerApprovals, hint: "Profiles with onboarding not completed" },
    { label: "New users (7 days)", value: data.newUsersLast7Days, hint: "Accounts created in the last week" },
  ];

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Dashboard</h2>
        <p className="app-admin-page__subtitle">Live counts from the Gadinodi database.</p>
      </div>

      <div className="app-admin-stats">
        {cards.map((card) => (
          <article key={card.label} className="app-admin-card">
            <p className="eyebrow">{card.label}</p>
            <p className="app-admin-kpi">{card.value.toLocaleString("en-IN")}</p>
            <p className="page-copy">{card.hint}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
