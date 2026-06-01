import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminSidebarNav } from "@/components/admin-sidebar-nav";
import { LogoutButton } from "@/components/logout-button";
import { resolveAdminRole } from "@/lib/auth/admin-role";
import { fetchAuthMe } from "@/lib/auth/me";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "DB", superadminOnly: false },
  { href: "/admin/users", label: "Users", icon: "US", superadminOnly: false },
  { href: "/admin/partners", label: "Partners", icon: "PT", superadminOnly: false },
  { href: "/admin/inventory", label: "Inventory", icon: "IV", superadminOnly: false },
  { href: "/admin/approvals", label: "Approvals", icon: "AP", superadminOnly: false },
  { href: "/admin/reports", label: "Reports", icon: "RP", superadminOnly: false },
  { href: "/admin/settings", label: "Settings", icon: "ST", superadminOnly: false },
  { href: "/admin/system", label: "System", icon: "SY", superadminOnly: true },
] as const;

export default async function AdminConsoleLayout({ children }: { children: ReactNode }) {
  const rawPath = (await headers()).get("x-pathname");
  const redirectTarget =
    rawPath && rawPath.startsWith("/admin") ? rawPath : "/admin/dashboard";
  const me = await fetchAuthMe();
  if (!me) {
    redirect(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
  }

  const role = resolveAdminRole(me);
  if (!role) {
    redirect("/");
  }

  const visibleNavItems = NAV_ITEMS.filter((item) => !item.superadminOnly || role === "superadmin");

  return (
    <section className="app-admin">
      <div className="app-admin__shell">
        <aside className="app-admin__sidebar">
          <Link href="/admin/dashboard" className="app-admin__brand">
            <span className="app-admin__brand-mark">GN</span>
            <span className="app-admin__brand-copy">
              <strong>Control Center</strong>
              <small>{role === "superadmin" ? "Superadmin" : "Admin"}</small>
            </span>
          </Link>

          <p className="app-admin__menu-title">Main Navigation</p>
          <AdminSidebarNav items={visibleNavItems} />

          <div className="app-admin__account">
            <p className="app-admin__account-name">{me.name ?? me.email}</p>
            <p className="app-admin__account-meta">{me.email}</p>
            <p className="app-admin__account-meta">
              Role: {role === "superadmin" ? "Superadmin" : "Application Admin"}
            </p>
            <div className="app-admin__signout">
              <LogoutButton redirectTo="/login" />
            </div>
          </div>
        </aside>

        <div className="app-admin__main">
          <header className="app-admin__topbar">
            <div>
              <p className="app-admin__topbar-eyebrow">Application Administration</p>
              <h1 className="app-admin__topbar-title">Gadinodi Admin Panel</h1>
            </div>
            <p className="app-admin__topbar-role">{role === "superadmin" ? "Superadmin" : "Admin"}</p>
          </header>
          <div className="app-admin__content">{children}</div>
        </div>
      </div>
    </section>
  );
}
