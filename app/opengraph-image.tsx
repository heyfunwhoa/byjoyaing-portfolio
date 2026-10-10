import { ImageResponse } from "next/og";

export const alt = "Kristen Joy Aing — Enterprise cybersecurity sales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f3efe6",
        color: "#1b211d",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 22,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8a4b2a",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            border: "1.5px solid #8a4b2a",
          }}
        />
        Enterprise cybersecurity sales
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 56, lineHeight: 1.1, maxWidth: 980 }}>
          Enterprise cybersecurity sales, built into repeatable GTM systems.
        </div>
        <div style={{ fontSize: 28, color: "#4a504b" }}>Kristen Joy Aing</div>
      </div>
    </div>,
    size,
  );
}
