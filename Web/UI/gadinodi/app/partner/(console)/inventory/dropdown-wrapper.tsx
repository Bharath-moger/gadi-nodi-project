"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

export function DropdownWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Safely auto-close drop boards if pointer focus goes outside click bounds
  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="tw:inline-block tw:text-left tw:relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-lg tw:text-slate-400 tw:hover:text-slate-600 tw:hover:bg-slate-100 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-slate-950 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg className="tw:w-5 tw:h-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>

      {isOpen && (
        <div className="tw:absolute tw:right-0 tw:mt-1 tw:w-40 tw:origin-top-right tw:bg-white tw:rounded-lg tw:shadow-lg tw:ring-1 tw:ring-slate-900/5 tw:divide-y tw:divide-slate-100 tw:z-[120] focus:tw:outline-none">
          {children}
        </div>
      )}
    </div>
  );
}