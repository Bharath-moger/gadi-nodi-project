import type { Metadata } from "next";
import Link from "next/link";

import { fetchAdminApi } from "@/lib/admin-server";

export const metadata: Metadata = {
  title: "Admin Inventory",
  robots: { index: false, follow: false },
};

type InventoryPayload = {
  items: Array<{
    slug: string;
    title: string;
    make: string;
    model: string;
    year: number;
    condition: string;
    price: number;
    location: string;
    sellerName: string;
    ownerUserId: string | null;
    isFeatured: boolean;
    updatedAt: string;
  }>;
};

export default async function AdminInventoryPage() {
  const { ok, data } = await fetchAdminApi<InventoryPayload>("inventory?take=75&skip=0");

  if (!ok || !data) {
    return (
      <div className="app-admin-card">
        <h2 className="app-admin-page__title">Inventory</h2>
        <p className="page-copy">Could not load vehicles.</p>
      </div>
    );
  }

  return (
    <div className="app-admin-page">
      <div className="app-admin-page__header">
        <h2 className="app-admin-page__title">Inventory</h2>
        <p className="app-admin-page__subtitle">Vehicle rows in the database (most recently updated).</p>
      </div>

      <div className="app-admin-card app-admin-card--table">
        <table className="partner-inventory-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Year</th>
              <th>Price</th>
              <th>Partner-owned</th>
              <th>Featured</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((v) => (
              <tr key={v.slug}>
                <td>
                  <strong>{v.title}</strong>
                  <div className="partner-inventory-meta">
                    {v.make} {v.model} · {v.sellerName}
                  </div>
                </td>
                <td>{v.year}</td>
                <td>₹{v.price.toLocaleString("en-IN")}</td>
                <td>{v.ownerUserId ? "Yes" : "No"}</td>
                <td>{v.isFeatured ? "Yes" : "No"}</td>
                <td>
                  <Link href={`/vehicles/${v.slug}`} className="text-link">
                    View
                  </Link>
                </td>
              </tr>                    
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
