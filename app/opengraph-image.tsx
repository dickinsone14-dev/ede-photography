import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "E.D.E Photography — Mountains, coastlines, wild places";

export default async function Image() {
  const imageData = await readFile(
    path.join(
      process.cwd(),
      "public/images/hiking/llyn-y-fan-fach/DSCF1566.jpg"
    )
  );
  const base64 = imageData.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUri}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.25))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 300,
              letterSpacing: 12,
            }}
          >
            E.D.E
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: 8,
              marginTop: 12,
            }}
          >
            PHOTOGRAPHY
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
