import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#ede8e4",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          E.D.E
        </span>
      </div>
    ),
    { ...size }
  );
}
