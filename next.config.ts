import type { NextConfig } from "next";

/* ============================================================
 * GitHub Pages 정적 호스팅 모드
 *
 * - output: "export" → out/ 폴더에 정적 HTML 생성
 * - basePath: production 빌드만 "/-tacchini-one-demo-"
 *   · dev 모드(http://localhost:3000)는 / 그대로
 *   · 빌드 모드는 https://tacchinimd-dot.github.io/-tacchini-one-demo-/ 에서 서빙
 * - NEXT_PUBLIC_BASE_PATH: 클라이언트 코드(<a href>, <img src> 등 정적 링크)에서
 *   basePath를 직접 사용해야 할 때 참조
 * - trailingSlash: true → /console → /console/index.html
 * ============================================================ */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/-tacchini-one-demo-" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    /* 클라이언트 코드에서 basePath를 참조해야 하는 정적 링크 (apex-report.html 등) */
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
