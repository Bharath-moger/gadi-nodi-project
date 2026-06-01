import type { Metadata } from "next";
import Link from "next/link";

import { fetchPartnerApi } from "@/lib/partner-server";

export const metadata: Metadata = {
  title: "Inventory",
  robots: { index: false, follow: false },
};

type InventoryRow = {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  price: number;
  location: string;
  updatedAt: string;
};

export default async function PartnerInventoryPage() {
  const { ok, data } = await fetchPartnerApi<InventoryRow[]>("vehicles");
  if (!ok || !data) {
    return (
      <div className="partner-admin-page">
        <header className="partner-admin-page__header">
          <h2 className="partner-admin-page__title">Inventory</h2>
        </header>
        <div className="partner-admin-card">
          <p className="page-copy">Could not load inventory. Try again shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="partner-admin-page">
      <header className="partner-admin-page__header">
        <div>
          <h2 className="partner-admin-page__title">Inventory</h2>
          <p className="partner-admin-page__subtitle">
            {data.length} listing{data.length === 1 ? "" : "s"} in your seller account
          </p>
        </div>
        <div className="partner-admin-page__actions">
          <Link className="button button--primary" href="/partner/inventory/new">
            Add vehicle
          </Link>
        </div>
      </header>

      {data.length === 0 ? (
        <div className="partner-admin-card">
          <p className="page-copy">You have no listings yet.</p>
          <Link className="button button--primary partner-admin-inline-action" href="/partner/inventory/new">
            Create listing
          </Link>
        </div>
      ) : (
        <div className="partner-admin-card partner-admin-card--table">
          <table className="partner-inventory-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Year</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Location</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.slug}>
                  <td>
                    <strong>{row.title}</strong>
                    <div className="partner-inventory-meta">
                      {row.make} {row.model}
                    </div>
                  </td>
                  <td>{row.year}</td>
                  <td>{row.condition}</td>
                  <td>₹{row.price.toLocaleString("en-IN")}</td>
                  <td>{row.location}</td>
                  <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                  <td className="partner-inventory-table__actions">
                    <Link className="text-link" href={`/vehicles/${row.slug}`}>
                      View live
                    </Link>
                    <Link className="text-link" href={`/partner/inventory/${row.slug}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
