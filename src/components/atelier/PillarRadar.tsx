/* ============================================================
 * 5 Pillars Radar Chart (SVG)
 *
 * Apple 디자인 원칙 준수:
 *   · No decorative gradient
 *   · Single accent color (var(--color-primary) — Tennis Navy)
 *   · Hairline strokes, no shadows
 *   · Negative tracking on labels
 * ============================================================ */

import type { PillarKey } from "@/lib/inspector-mock";
import { PILLAR_META } from "@/lib/inspector-mock";

interface Props {
  scores: Record<PillarKey, number>;
  size?: number;
}

const ORDER: PillarKey[] = ["P1", "P2", "P3", "P4", "P5"];

export default function PillarRadar({ scores, size = 320 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const labelRadius = size * 0.46;
  const n = ORDER.length;

  /* 5각형 정점 좌표 (12시 방향 기준) */
  const angle = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const point = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  /* 격자: 25 / 50 / 75 / 100 */
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  /* 점수 폴리곤 */
  const scorePoints = ORDER.map((p, i) => {
    const v = Math.max(0, Math.min(100, scores[p])) / 100;
    return point(i, radius * v);
  });
  const scorePath = scorePoints
    .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ") + " Z";

  /* 통과선 (각 P별 pass 임계값 — 단순화하여 평균 60% 기준선 표시) */
  const passLevel = 0.6;
  const passPoints = ORDER.map((_, i) => point(i, radius * passLevel));
  const passPath = passPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ") + " Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="5 Pillars Radar Chart"
    >
      {/* 격자 폴리곤 */}
      {gridLevels.map((lvl) => {
        const pts = ORDER.map((_, i) => point(i, radius * lvl));
        const d =
          pts
            .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
            .join(" ") + " Z";
        return (
          <path
            key={lvl}
            d={d}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth={1}
          />
        );
      })}

      {/* 축 선 */}
      {ORDER.map((_, i) => {
        const end = point(i, radius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="var(--color-hairline)"
            strokeWidth={1}
          />
        );
      })}

      {/* 통과 임계값 (60% 점선) */}
      <path
        d={passPath}
        fill="none"
        stroke="var(--color-court-green)"
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.7}
      />

      {/* 점수 폴리곤 (Tennis Navy 베이스) */}
      <path
        d={scorePath}
        fill="var(--color-primary)"
        fillOpacity={0.18}
        stroke="var(--color-primary)"
        strokeWidth={1.5}
      />

      {/* 점수 정점 도트 */}
      {ORDER.map((p, i) => {
        const v = Math.max(0, Math.min(100, scores[p])) / 100;
        const pt = point(i, radius * v);
        const score = scores[p];
        const isFail = score < PILLAR_META[p].pass;
        return (
          <circle
            key={p}
            cx={pt.x}
            cy={pt.y}
            r={5}
            fill={isFail ? "var(--color-brick-red)" : "var(--color-primary)"}
            stroke="var(--color-canvas)"
            strokeWidth={2}
          />
        );
      })}

      {/* 축 라벨 */}
      {ORDER.map((p, i) => {
        const lp = point(i, labelRadius);
        const score = scores[p];
        const isFail = score < PILLAR_META[p].pass;
        return (
          <g key={`label-${p}`}>
            <text
              x={lp.x}
              y={lp.y - 6}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 600,
                fill: "var(--color-ink)",
                letterSpacing: -0.2,
              }}
            >
              {p}
            </text>
            <text
              x={lp.x}
              y={lp.y + 10}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                fill: isFail ? "var(--color-brick-red)" : "var(--color-ink-muted-80)",
              }}
            >
              {score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
