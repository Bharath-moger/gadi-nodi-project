"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { LogoutButton } from "@/components/logout-button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vehicle-types", label: "Vehicle types" },
  { href: "/vehicles", label: "Vehicles" },
  // { href: "/spare-parts", label: "Spare parts" },
  // { href: "/partners", label: "For sellers" },
] as const;

interface SiteHeaderShellProps {
  isSignedIn: boolean;
  email: string | null;
}

export function SiteHeaderShell({ isSignedIn, email }: SiteHeaderShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");

    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  const mainElement = document.querySelector("main");

  if (mainElement) {
    mainElement.style.paddingTop = "72.8px"; // or "80px"
  }
}, []);

  return (
    <header
  className={`tw:fixed tw:top-0 tw:left-0 tw:right-0 tw:z-[1000]
  tw:bg-white/95 tw:backdrop-blur-md
  tw:transition-all tw:duration-300
  ${
    isSticky
      ? "tw:shadow-md tw:border-b tw:border-gray-200"
      : "tw:border-b tw:border-transparent"
  }`}
>
      <div className="container site-header__inner">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand__mark">GN</span>
          <span className="brand__text">
            <strong>Gadinodi</strong>
            <span className="brand__subline">
              New &amp; used vehicles, priced transparently
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__menu-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="visually-hidden">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
        </button>

          <div id={panelId} className={`site-header__panel ${menuOpen ? "site-header__panel--open" : ""}`}>
            <button
              type="button"
              className="site-header__close site-header__menu-toggle"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
            <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`site-nav__link ${
  isActive
    ? `
      tw:font-bold
      tw:text-indigo-700

      tw:after:content-['']
      tw:after:absolute
      tw:after:left-3
      tw:after:right-3
      tw:after:bottom-1
      tw:after:h-0.75
      tw:after:bg-indigo-700
      tw:after:rounded-full

      tw:max-[960px]:bg-indigo-100
      tw:max-[960px]:rounded-[999px]
      tw:max-[960px]:after:hidden
    `
    : ""
}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          

          <div className="site-actions">
            {isSignedIn ? (
              <>
                <Link
                  className="button button--ghost"
                  href="/partner/dashboard"
                  onClick={closeMenu}
                >
                  Seller portal
                </Link>

                {email ? (
                  <span className="site-user-email">{email}</span>
                ) : null}

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  className="button button--ghost"
                  href="/login"
                  onClick={closeMenu}
                >
                  Sign in
                </Link>

                <Link
                  className="button button--primary"
                  href="/register"
                  onClick={closeMenu}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="site-header__scrim"
          onClick={closeMenu}
          aria-label="Close mobile menu overlay"
        >
          <span className="visually-hidden">Close menu</span>
        </button>
      ) : null}
    </header>
  );
}
