"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PartnerNavItem = {
  href: string;
  label: string;
  icon: string;
  /** When true, only exact path matches. */
  exact?: boolean;
  /** Paths that must not activate this item (e.g. add form under inventory). */
  excludePaths?: string[];
};

function isNavActive(pathname: string, item: PartnerNavItem) {
  if (item.excludePaths?.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false;
  }
  if (item.exact) {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function PartnerSidebarNav({ items }: { items: readonly PartnerNavItem[] }) {
  const pathname = usePathname() ?? "";

  return (
    <nav className="partner-admin__nav" aria-label="Seller portal">
      {items.map((item) => {
        const active = isNavActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active ? "partner-admin__nav-link partner-admin__nav-link--active" : "partner-admin__nav-link"
            }
          >
            <span className="partner-admin__nav-icon" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
