import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KoveTrade — Copy Top Traders. Grow Your Portfolio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #070f08 0%, #0c1a0d 50%, #071a08 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Green radial glow — top left */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-150px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(46,107,13,0.45) 0%, transparent 65%)",
          }}
        />
        {/* Green radial glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(22,101,52,0.4) 0%, transparent 65%)",
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(94,220,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,220,31,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 80px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo wordmark */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "32px" }}>
            <span style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", letterSpacing: "-2px", lineHeight: 1 }}>
              Kove
            </span>
            <span style={{ fontSize: "72px", fontWeight: 900, color: "#5edc1f", letterSpacing: "-2px", lineHeight: 1 }}>
              Trade
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "24px",
              letterSpacing: "-1px",
            }}
          >
            Copy Top Traders.{" "}
            <span style={{ color: "#5edc1f" }}>Grow Your Portfolio.</span>
          </div>

          {/* Sub */}
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
              maxWidth: "820px",
              marginBottom: "48px",
            }}
          >
            Mirror real-time stock and options trades from the world&apos;s top-performing
            investors. Trusted by 50M+ traders across 40+ countries.
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
            {[
              { v: "50M+", l: "Active Users" },
              { v: "$2.4B", l: "Volume Copied" },
              { v: "40+", l: "Countries" },
              { v: "4.8★", l: "App Rating" },
            ].map(({ v, l }, i) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "48px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ fontSize: "30px", fontWeight: 900, color: "#5edc1f", lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{l}</span>
                </div>
                {i < 3 && (
                  <div style={{ width: "1px", height: "36px", background: "rgba(94,220,31,0.2)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #5edc1f, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
