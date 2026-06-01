"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
};

export function AdminSidebarNav({ items }: { items: readonly AdminNavItem[] }) {
  const pathname = usePathname() ?? "";

  return (
    <nav className="app-admin__nav" aria-label="Admin navigation">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "app-admin__nav-link app-admin__nav-link--active" : "app-admin__nav-link"}
          >
            <span className="app-admin__nav-icon" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
