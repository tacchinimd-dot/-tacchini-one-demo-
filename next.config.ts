import type { NextConfig } from "next";

/* ============================================================
 * GitHub Pages 정적 호스팅 모드
 *
 * - output: "export" → out/ 폴더에 정적 HTML 생성 (GitHub Pages가 그대로 서빙)
 * - basePath: production 빌드만 "/-tacchini-one-demo-" (repo 이름)
 *   · dev 모드(http://localhost:3000)는 / 그대로
 *   · 빌드 모드는 https://tacchinimd-dot.github.io/-tacchini-one-demo-/ 에서 서빙
 * - trailingSlash: true → /console → /console/index.html
 * - images.unoptimized: true → next/image 최적화 비활성 (export 필수)
 *
 * 배포 URL (예상):
 *   https://tacchinimd-dot.github.io/-tacchini-one-demo-/
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
  // GitHub Pages가 _next 폴더를 무시하지 않도록 .nojekyll 자동 생성은
  // GitHub Actions 워크플로우에서 처리.
};

export default nextConfig;
