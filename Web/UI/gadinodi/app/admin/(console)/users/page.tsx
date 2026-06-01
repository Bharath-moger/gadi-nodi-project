import type { Metadata } from "next";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Users",
  robots: { index: false, follow: false },
};

type UsersPayload = {
  items: Array<{
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: string;
    isPartner: boolean;
  }>;
};

export default async function AdminUsersPage() {
  const { ok, data } = await fetchAdminApi<UsersPayload>("users?take=75&skip=0");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Users</h2>
        <p className="page-copy">Could not load users.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Users</h2>
        <p className="app-admin-page__subtitle">Most recently registered accounts (up to 75).</p>
      </div>

      <div className="app-admin-card app-admin-card--table">
        <table className="partner-inventory-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Partner</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.name ?? "—"}</td>
                <td>{u.role}</td>
                <td>{u.isPartner ? "Yes" : "No"}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
