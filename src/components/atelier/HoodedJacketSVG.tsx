/* ============================================================
 * Hooded Jacket Mock Illustration
 *
 * 단순화된 SVG 일러스트.
 * - variant "before": 의도된 위반 표시 (가슴 중앙 큰 로고, 단조로운 차콜)
 * - variant "after": 타키니화 적용 후 (사이드 외측 작은 로고, Tennis Navy + Cream + Court Green tape)
 * ============================================================ */

interface Props {
  variant: "before" | "after";
  size?: number;
}

export default function HoodedJacketSVG({ variant, size = 240 }: Props) {
  const isAfter = variant === "after";

  /* 컬러 팔레트 */
  const body = isAfter ? "var(--color-primary)" : "#3a3a3c"; // Tennis Navy / Charcoal
  const hoodLining = isAfter ? "var(--color-cream-white)" : "#3a3a3c";
  const zipperTape = isAfter ? "var(--color-court-green)" : "#2a2a2c";
  const stitch = "rgba(255,255,255,0.18)";
  const logoColor = isAfter ? "var(--color-cream-white)" : "var(--color-cream-white)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      role="img"
      aria-label={`Hooded jacket ${variant}`}
    >
      {/* 배경 */}
      <rect
        x="0"
        y="0"
        width="240"
        height="240"
        fill={isAfter ? "var(--color-canvas-parchment)" : "var(--color-canvas-parchment)"}
      />

      {/* Hood */}
      <path
        d="M 70 50 Q 120 20 170 50 L 170 80 Q 120 60 70 80 Z"
        fill={body}
      />
      {/* Hood 안감 (After에서만 cream 노출) */}
      {isAfter && (
        <path
          d="M 90 60 Q 120 50 150 60 L 150 78 Q 120 72 90 78 Z"
          fill={hoodLining}
        />
      )}

      {/* Body */}
      <path
        d="M 60 80 L 180 80 L 195 200 L 45 200 Z"
        fill={body}
      />

      {/* Sleeves */}
      <path d="M 45 80 L 60 80 L 65 195 L 35 195 Z" fill={body} />
      <path d="M 180 80 L 195 80 L 205 195 L 175 195 Z" fill={body} />

      {/* Zipper */}
      <line
        x1="120"
        y1="80"
        x2="120"
        y2="200"
        stroke={zipperTape}
        strokeWidth="4"
      />
      {/* Zipper teeth (subtle) */}
      <line
        x1="120"
        y1="80"
        x2="120"
        y2="200"
        stroke={stitch}
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Drawstring */}
      <line
        x1="105"
        y1="78"
        x2="100"
        y2="92"
        stroke={isAfter ? "var(--color-cream-white)" : "#666"}
        strokeWidth="1.5"
      />
      <line
        x1="135"
        y1="78"
        x2="140"
        y2="92"
        stroke={isAfter ? "var(--color-cream-white)" : "#666"}
        strokeWidth="1.5"
      />

      {/* Logo */}
      {variant === "before" ? (
        /* Before: 가슴 중앙 큰 Pentagon (위반) */
        <g transform="translate(120, 130)">
          <polygon
            points="0,-30 28,-10 18,28 -18,28 -28,-10"
            fill={logoColor}
          />
          <text
            x="0"
            y="55"
            textAnchor="middle"
            style={{ fontSize: 9, fill: "var(--color-brick-red)", fontWeight: 700 }}
          >
            120mm × 120mm
          </text>
        </g>
      ) : (
        /* After: 좌측 흉부 외측 작은 Pentagon (Tone-on-Tone) */
        <g transform="translate(75, 110)">
          <polygon
            points="0,-7 6,-2 4,7 -4,7 -6,-2"
            fill={logoColor}
            opacity={0.85}
          />
        </g>
      )}

      {/* After only — 후드 안감의 Italian Tennis stripe */}
      {isAfter && (
        <>
          <line x1="100" y1="68" x2="140" y2="68" stroke="var(--color-primary)" strokeWidth="1.5" />
          <line x1="100" y1="71" x2="140" y2="71" stroke="var(--color-court-green)" strokeWidth="1.5" />
        </>
      )}

      {/* Hood seam */}
      <path
        d="M 70 50 Q 120 20 170 50"
        fill="none"
        stroke={stitch}
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Body bottom hem stitch */}
      <line
        x1="45"
        y1="195"
        x2="195"
        y2="195"
        stroke={stitch}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
    </svg>
  );
}
