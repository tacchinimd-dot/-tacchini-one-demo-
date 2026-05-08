import type { NextConfig } from "next";

/* ============================================================
 * Vercel 표준 배포 모드
 *
 * 도어·콘솔·Inspector 모두 정적 prerender 가능하지만,
 * Vercel 환경에서 향후 SSR/ISR/Server Actions 확장 여지를 위해
 * output 모드를 명시하지 않고 표준에 맡긴다.
 * ============================================================ */

const nextConfig: NextConfig = {};

export default nextConfig;
