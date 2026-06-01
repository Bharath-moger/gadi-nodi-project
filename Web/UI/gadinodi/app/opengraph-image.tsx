import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #4338ca 45%, #6366f1 100%)",
          color: "white",
          padding: "56px",
          fontFamily: "Segoe UI",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "88px",
              height: "88px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.12)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            GN
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "26px", opacity: 0.82 }}>Gadinodi</span>
            <strong style={{ fontSize: "64px", lineHeight: 1.1 }}>
              New and used vehicle commerce
            </strong>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span style={{ fontSize: "24px", opacity: 0.82 }}>
            Storefront, PLP, PDP, and configurable seller sections
          </span>
          <span style={{ fontSize: "20px", opacity: 0.72 }}>
            Garages • Car showrooms • Individual dealers • More partner types
          </span>
        </div>
      </div>
    ),
    size,
  );
}
