"use client";

import { useEffect } from "react";

export function MobileMenuToggle() {
  useEffect(() => {
    // 1. Grab the elements using explicit IDs for pinpoint accuracy
    const hamburger = document.getElementById("mobile-hamburger-trigger");
    const closeBtn = document.getElementById("mobile-close-trigger");
    const scrim = document.getElementById("mobile-scrim-trigger");
    
    // ALIGNED TARGET MATCH: Grabbing the sidebar layout element securely via its unique ID token
    const sidebar = document.getElementById("mobile-sidebar-container-target");

    // 2. Define what happens when opening the menu
    const openMenu = () => {
      if (sidebar && scrim) {
        sidebar.classList.remove("tw:max-lg:-translate-x-full");
        sidebar.classList.add("tw:max-lg:translate-x-0", "tw:shadow-2xl");
        
        scrim.classList.remove("tw:opacity-0", "tw:pointer-events-none");
        scrim.classList.add("tw:opacity-100", "tw:pointer-events-auto");
        
        document.body.classList.add("mobile-nav-active", "tw:overflow-hidden", "tw:h-screen");
      }
    };

    // 3. Define what happens when closing the menu
    const closeMenu = () => {
      if (sidebar && scrim) {
        sidebar.classList.remove("tw:max-lg:translate-x-0", "tw:shadow-2xl");
        sidebar.classList.add("tw:max-lg:-translate-x-full");
        
        scrim.classList.remove("tw:opacity-100", "tw:pointer-events-auto");
        scrim.classList.add("tw:opacity-0", "tw:pointer-events-none");
        
        document.body.classList.remove("mobile-nav-active", "tw:overflow-hidden", "tw:h-screen");
      }
    };

    // 4. Attach event listeners to watch for user clicks
    hamburger?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    scrim?.addEventListener("click", closeMenu);

    // 5. Cleanup listeners when the component unmounts to prevent memory leaks
    return () => {
      hamburger?.removeEventListener("click", openMenu);
      closeBtn?.removeEventListener("click", closeMenu);
      scrim?.removeEventListener("click", closeMenu);
    };
  }, []);

  return null;
}