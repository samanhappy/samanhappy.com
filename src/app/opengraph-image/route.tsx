import { ImageResponse } from "next/og";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fafaf8",
        display: "flex",
        flexDirection: "column",
        padding: "85px",
        color: "#202020",
        fontFamily: "serif",
      }}
    >
      <div style={{ fontSize: 25, color: "#3f6654" }}>samanhappy.com</div>
      <div style={{ fontSize: 76, marginTop: 75 }}>Sun Qingyang</div>
      <div style={{ fontSize: 31, marginTop: 25, color: "#686c68" }}>
        Building useful tools for the AI-native world.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 65,
          fontSize: 21,
          color: "#3f6654",
        }}
      >
        MCPHub · Codex Reset · Selectly
      </div>
    </div>,
    size,
  );
}
