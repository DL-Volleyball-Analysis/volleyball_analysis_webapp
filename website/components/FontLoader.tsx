"use client";

import { useEffect } from "react";

const getAssetPath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
};

export function FontLoader() {
  useEffect(() => {
    // LINE Seed TW font faces
    const fontFaces = [
      { family: "LINE Seed TW", file: "LINESeedTW_OTF_Th.woff2", weight: "100" },
      { family: "LINE Seed TW", file: "LINESeedTW_OTF_Rg.woff2", weight: "400" },
      { family: "LINE Seed TW", file: "LINESeedTW_OTF_Bd.woff2", weight: "700" },
      { family: "LINE Seed TW", file: "LINESeedTW_OTF_Eb.woff2", weight: "800" },
      { family: "LINE Seed Sans", file: "LINESeedSans_W_Th.woff2", weight: "100" },
      { family: "LINE Seed Sans", file: "LINESeedSans_W_Rg.woff2", weight: "400" },
      { family: "LINE Seed Sans", file: "LINESeedSans_W_Bd.woff2", weight: "700" },
      { family: "LINE Seed Sans", file: "LINESeedSans_W_XBd.woff2", weight: "800" },
      { family: "LINE Seed Sans", file: "LINESeedSans_W_He.woff2", weight: "900" },
    ];

    const style = document.createElement("style");
    const fontFaceRules = fontFaces
      .map(
        (font) => `
        @font-face {
          font-family: '${font.family}';
          src: url('${getAssetPath(`/fonts/${font.file}`)}') format('woff2');
          font-weight: ${font.weight};
          font-style: normal;
          font-display: swap;
        }
      `
      )
      .join("\n");

    style.textContent = fontFaceRules;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
