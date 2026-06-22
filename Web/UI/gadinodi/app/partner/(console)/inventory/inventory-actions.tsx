"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type InventoryActionsProps = {
  slug: string;
};

export function InventoryActions({ slug }: InventoryActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="tw:inline-block tw:text-left tw:relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="tw:flex tw:items-center tw:justify-center tw:w-7 tw:h-7 tw:rounded-md tw:text-slate-400 tw:hover:text-slate-600 tw:hover:bg-slate-100 focus:tw:outline-none transition-all tw:ml-auto"
      >
        <svg className="tw:w-4 tw:h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>

      {isOpen && (
        /* MODERN SMART STYLE: Changed tw:top-full to tw:bottom-full and tw:mb-1 
           This causes the dropdown to float cleanly upwards over the row text, completely avoiding the card's bottom edge! */
        <div className="tw:absolute tw:right-0 tw:bottom-full tw:mb-1 tw:w-28 tw:bg-white tw:rounded-lg tw:shadow-xl tw:ring-1 tw:ring-slate-900/10 tw:z-[999] tw:border tw:border-slate-100 tw:overflow-hidden">
          <div className="tw:py-0.5">
            <Link
              href={`/vehicles/${slug}`}
              onClick={() => setIsOpen(false)}
              className="tw:block tw:px-3 tw:py-1.5 tw:text-xs tw:text-slate-700 tw:hover:bg-slate-50 tw:font-medium transition-colors tw:text-left"
            >
              View live
            </Link>
            <Link
              href={`/partner/inventory/${slug}`}
              onClick={() => setIsOpen(false)}
              className="tw:block tw:px-3 tw:py-1.5 tw:text-xs tw:text-slate-700 tw:hover:bg-slate-50 tw:font-medium transition-colors tw:text-left"
            >
              Edit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}