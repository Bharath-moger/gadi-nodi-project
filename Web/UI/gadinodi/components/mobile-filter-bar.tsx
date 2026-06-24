"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface MobileFilterBarProps {
  condition?: string;
  bodyStyle?: string;
  fuel?: string;
  filteredCount: number;
  hasActiveFilters: boolean;
  resolvedSearchParams: Record<string, string | string[] | undefined>;
  conditionOptions: string[];
  bodyStyleOptions: string[];
  fuelOptions: string[];
}

function readParam(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v;
}

function buildFilterHref(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
  value: string,
) {
  const current = {
    bodyStyle: readParam(searchParams.bodyStyle),
    condition: readParam(searchParams.condition),
    fuel: readParam(searchParams.fuel),
  };
  const nextValue = current[key as keyof typeof current] === value ? undefined : value;
  const params = { ...current, [key]: nextValue };
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
    .join("&");
  return `/vehicles${qs ? `?${qs}` : ""}`;
}

function hrefClearingFilter(
  searchParams: Record<string, string | string[] | undefined>,
  clearKey: "bodyStyle" | "condition" | "fuel",
) {
  const current = {
    bodyStyle: readParam(searchParams.bodyStyle),
    condition: readParam(searchParams.condition),
    fuel: readParam(searchParams.fuel),
  };
  const params = { ...current, [clearKey]: undefined };
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
    .join("&");
  return `/vehicles${qs ? `?${qs}` : ""}`;
}

type DropdownKey = "condition" | "bodyStyle" | "fuel" | null;

export function MobileFilterBar({
  condition,
  bodyStyle,
  fuel,
  filteredCount,
  hasActiveFilters,
  resolvedSearchParams,
  conditionOptions,
  bodyStyleOptions,
  fuelOptions,
}: MobileFilterBarProps) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  function toggle(key: DropdownKey) {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }

  const navigate = useCallback(
    (href: string) => {
      setOpenDropdown(null);
      router.push(href, { scroll: false });
    },
    [router],
  );

  const conditionLabel = condition ?? "Condition";
  const bodyStyleLabel = bodyStyle ?? "Type";
  const fuelLabel = fuel ?? "Fuel";

  const triggerBase: React.CSSProperties = {
    background: "none",
    border: "none",
    padding: "0",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.8125rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    flexShrink: 0,
    lineHeight: 1,
  };

  const triggerStyle: React.CSSProperties = { ...triggerBase, color: "var(--muted)" };
  const triggerActiveStyle: React.CSSProperties = { ...triggerBase, color: "var(--accent-deep)" };

  const dropdownPanelStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    background: "#fff",
    borderRadius: "20px",
    border: "1px solid rgba(30,27,75,0.1)",
    boxShadow: "0 12px 32px rgba(30,27,75,0.13)",
    padding: "6px",
    zIndex: 9999,
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: "block",
    padding: "9px 18px",
    fontWeight: active ? 800 : 600,
    fontSize: "0.875rem",
    color: active ? "var(--accent-deep)" : "var(--foreground)",
    background: active ? "rgba(99,102,241,0.08)" : "transparent",
    textDecoration: "none",
    borderRadius: "999px",
    margin: "2px 0",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontFamily: "inherit",
  });

  const chevron = (key: DropdownKey) => (
    <span
      style={{
        fontSize: "0.45rem",
        display: "inline-block",
        transform: openDropdown === key ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 160ms ease",
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      ▼
    </span>
  );

  const sep = (
    <span
      aria-hidden
      style={{
        color: "rgba(30,27,75,0.18)",
        fontSize: "0.85rem",
        userSelect: "none",
        padding: "0 6px",
        flexShrink: 0,
      }}
    >
      |
    </span>
  );

  return (
    <>
      <style>{`
        /* ── Toolbar: must NOT clip overflowing dropdowns ── */
        .vehicles-catalog__toolbar {
          overflow: visible !important;
        }

        /* The results scroll container must also not clip the toolbar's dropdowns */
        .vehicles-catalog__results {
          overflow-x: visible !important;
        }

        /* ── Mobile filter strip: hidden on desktop ── */
        .vc-strip {
          display: none !important;
          align-items: center;
          flex-wrap: nowrap;
          overflow: visible;
          min-width: 0;
        }
        @media (max-width: 1100px) {
          .vc-strip {
            display: flex !important;
          }
        }

        /* ── Active pills row ── */
        .vc-active-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 8px;
          padding-top: 8px;
          border-top: 1px solid rgba(30,27,75,0.06);
          margin-top: 6px;
          overflow: visible;
        }
        .vc-active-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          flex-shrink: 0;
        }
        .vc-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }
        .vc-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px 4px 11px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.28);
          color: var(--accent-deep);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
        }
        .vc-pill:hover { background: rgba(99,102,241,0.18); }
        .vc-pill-x { font-size: 0.95rem; line-height: 1; opacity: 0.65; }
        .vc-clear {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-deep);
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
        }

        /* ── Count: NEVER shrinks away — always visible ── */
        .vc-count {
          flex-shrink: 0;
          flex-grow: 0;
          white-space: nowrap;
          margin: 0 10px 0 0 !important;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* On very narrow screens, hide only the word label — the number stays */
        @media (max-width: 300px) {
          .vc-count-label { display: none; }
        }

        /* Tighten separator padding on small screens to give buttons more room */
        @media (max-width: 400px) {
          .vc-strip span[aria-hidden] {
            padding: 0 3px !important;
          }
        }
      `}</style>

      <div
        ref={barRef}
        className="vehicles-catalog__toolbar tw:!top-0 tw:sticky tw:z-50"
        style={{ position: "sticky", top: 0, zIndex: 50, overflow: "visible" }}
      >
        {/* ── Row 1: count + dropdowns side by side ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            overflow: "visible",
            minWidth: 0,
          }}
        >
          {/* Count — flex-shrink:0 so number is ALWAYS visible */}
          <p className="vehicles-catalog__toolbar-summary vc-count" style={{ margin: 0 }}>
            <strong>{filteredCount}</strong>
            <span className="vc-count-label">
              {" "}{filteredCount === 1 ? "vehicle" : "vehicles"}
              {hasActiveFilters ? " · filtered" : ""}
            </span>
          </p>

          {/* Mobile-only dropdown buttons */}
          <div className="vc-strip">

            {/* CONDITION */}
            <div style={{ position: "relative", overflow: "visible", flexShrink: 0 }}>
              <button
                onClick={() => toggle("condition")}
                aria-expanded={openDropdown === "condition"}
                style={condition ? triggerActiveStyle : triggerStyle}
              >
                {conditionLabel}
                {chevron("condition")}
              </button>
              {openDropdown === "condition" && (
                <div style={{ ...dropdownPanelStyle, minWidth: "130px" }}>
                  {conditionOptions.map((val) => (
                    <button
                      key={val}
                      onClick={() => navigate(buildFilterHref(resolvedSearchParams, "condition", val))}
                      style={itemStyle(condition === val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {sep}

            {/* TYPE */}
            <div style={{ position: "relative", overflow: "visible", flexShrink: 0 }}>
              <button
                onClick={() => toggle("bodyStyle")}
                aria-expanded={openDropdown === "bodyStyle"}
                style={bodyStyle ? triggerActiveStyle : triggerStyle}
              >
                {bodyStyleLabel}
                {chevron("bodyStyle")}
              </button>
              {openDropdown === "bodyStyle" && (
                <div style={{ ...dropdownPanelStyle, minWidth: "160px", maxHeight: "280px", overflowY: "auto" }}>
                  {bodyStyleOptions.map((val) => (
                    <button
                      key={val}
                      onClick={() => navigate(buildFilterHref(resolvedSearchParams, "bodyStyle", val))}
                      style={itemStyle(bodyStyle === val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {sep}

            {/* FUEL */}
            <div style={{ position: "relative", overflow: "visible", flexShrink: 0 }}>
              <button
                onClick={() => toggle("fuel")}
                aria-expanded={openDropdown === "fuel"}
                style={fuel ? triggerActiveStyle : triggerStyle}
              >
                {fuelLabel}
                {chevron("fuel")}
              </button>
              {openDropdown === "fuel" && (
                <div style={{ ...dropdownPanelStyle, minWidth: "130px" }}>
                  {fuelOptions.map((val) => (
                    <button
                      key={val}
                      onClick={() => navigate(buildFilterHref(resolvedSearchParams, "fuel", val))}
                      style={itemStyle(fuel === val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>{/* end vc-strip */}
        </div>

        {/* ── Row 2: active filter pills ── */}
        {hasActiveFilters && (
          <div className="vc-active-row">
            <span className="vc-active-label">Active</span>
            <div className="vc-pills">
              {condition && (
                <button
                  className="vc-pill"
                  onClick={() => navigate(hrefClearingFilter(resolvedSearchParams, "condition"))}
                  aria-label={`Remove condition filter: ${condition}`}
                >
                  <span>{condition}</span>
                  <span className="vc-pill-x" aria-hidden>×</span>
                </button>
              )}
              {bodyStyle && (
                <button
                  className="vc-pill"
                  onClick={() => navigate(hrefClearingFilter(resolvedSearchParams, "bodyStyle"))}
                  aria-label={`Remove vehicle type filter: ${bodyStyle}`}
                >
                  <span>{bodyStyle}</span>
                  <span className="vc-pill-x" aria-hidden>×</span>
                </button>
              )}
              {fuel && (
                <button
                  className="vc-pill"
                  onClick={() => navigate(hrefClearingFilter(resolvedSearchParams, "fuel"))}
                  aria-label={`Remove fuel filter: ${fuel}`}
                >
                  <span>{fuel}</span>
                  <span className="vc-pill-x" aria-hidden>×</span>
                </button>
              )}
            </div>
            <button
              className="vc-clear"
              onClick={() => navigate("/vehicles")}
            >
              Clear all
            </button>
          </div>
        )}

      </div>
    </>
  );
}
