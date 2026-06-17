"use client";

import { useEffect } from "react";

export function MobileMenuToggle() {
  useEffect(() => {
    const hamburger = document.getElementById("mobile-hamburger-trigger");
    const closeBtn = document.getElementById("mobile-close-trigger");
    const scrim = document.getElementById("mobile-scrim-trigger");
    const sidebar = document.getElementById("mobile-sidebar-container-target");

    const openMenu = () => {
      if (sidebar && scrim) {
        sidebar.classList.remove("tw:max-lg:-translate-x-full");
        sidebar.classList.add("tw:max-lg:translate-x-0", "tw:shadow-2xl");
        
        scrim.classList.remove("tw:opacity-0", "tw:pointer-events-none");
        scrim.classList.add("tw:opacity-100", "tw:pointer-events-auto");
        
        document.body.classList.add("mobile-nav-active", "tw:overflow-hidden", "tw:h-screen");
      }
    };

    const closeMenu = () => {
      if (sidebar && scrim) {
        sidebar.classList.remove("tw:max-lg:translate-x-0", "tw:shadow-2xl");
        sidebar.classList.add("tw:max-lg:-translate-x-full");
        
        scrim.classList.remove("tw:opacity-100", "tw:pointer-events-auto");
        scrim.classList.add("tw:opacity-0", "tw:pointer-events-none");
        
        document.body.classList.remove("mobile-nav-active", "tw:overflow-hidden", "tw:h-screen");
      }
    };

    // PINPOINT AUTO-CLOSE: Watch for clicks inside the navigation menu container frame
    const handleNavigationClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close the drawer if the user clicks a link directly, an icon span, or an inner text component
      if (target.closest("a") || target.tagName === "A" || target.closest(".partner-admin__nav-link")) {
        closeMenu();
      }
    };

    // Attach core trigger listeners
    hamburger?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    scrim?.addEventListener("click", closeMenu);
    
    // Listen directly to the sidebar area for any link interactions
    sidebar?.addEventListener("click", handleNavigationClick);

    return () => {
      hamburger?.removeEventListener("click", openMenu);
      closeBtn?.removeEventListener("click", closeMenu);
      scrim?.removeEventListener("click", closeMenu);
      sidebar?.removeEventListener("click", handleNavigationClick);
    };
  }, []);

  return null;
}