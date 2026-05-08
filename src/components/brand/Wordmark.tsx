/* ============================================================
 * Wordmark — "TACCHINI ONE" with ST circular symbol replacing 'O' in ONE
 *
 * Concept (사용자 요청 v0.2):
 *   "TACCHINI O[ne]" 의 'O'를 ST 원형 심볼로 치환.
 *   글자 크기에 맞춰 심볼 사이즈 자동 스케일.
 *
 * Variants:
 *   - default (light bg) · navy text
 *   - inverted (dark bg) · white text
 *   - subtle (sidebar/header) · 컴팩트
 * ============================================================ */

import TacchiniSymbol from "./TacchiniSymbol";

type Variant = "default" | "inverted" | "subtle";

interface Props {
  variant?: Variant;
  size?: number;
  showSubtitle?: boolean;
}

export default function Wordmark({
  variant = "default",
  size = 24,
  showSubtitle = false,
}: Props) {
  const colors = getColors(variant);
  /* 'O' 자리에 들어갈 심볼 크기 — 폰트 cap-height에 비례 (≈ size × 0.78) */
  const symbolSize = Math.round(size * 0.82);
  /* 글자 letter-spacing — 워드마크 톤 */
  const tracking = `${size * 0.04}px`;

  return (
    <div
      className="inline-flex items-baseline select-none"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        letterSpacing: tracking,
        color: colors.text,
        gap: `${size * 0.18}px`,
      }}
    >
      <span
        style={{
          fontSize: size,
          lineHeight: 1,
          letterSpacing: tracking,
        }}
      >
        TACCHINI
      </span>

      <span
        className="inline-flex items-center"
        style={{ fontSize: size, lineHeight: 1, gap: 0 }}
      >
        {/* O = symbol */}
        <span
          aria-hidden
          className="inline-flex items-center justify-center"
          style={{
            width: symbolSize,
            height: symbolSize,
            color: colors.symbol,
            transform: `translateY(${size * 0.04}px)`,
          }}
        >
          <TacchiniSymbol size={symbolSize} color="currentColor" />
        </span>
        <span
          style={{
            fontSize: size,
            lineHeight: 1,
            letterSpacing: tracking,
            marginLeft: `${size * 0.04}px`,
          }}
        >
          NE
        </span>
      </span>

      {showSubtitle && (
        <span
          style={{
            fontSize: size * 0.42,
            fontWeight: 500,
            letterSpacing: `${size * 0.08}px`,
            color: colors.subtitle,
            textTransform: "uppercase",
            marginLeft: `${size * 0.5}px`,
            alignSelf: "center",
          }}
        >
          Global Licensee Hub
        </span>
      )}
    </div>
  );
}

function getColors(v: Variant): {
  text: string;
  symbol: string;
  subtitle: string;
} {
  switch (v) {
    case "inverted":
      return {
        text: "#ffffff",
        symbol: "var(--color-cream-white)",
        subtitle: "rgba(255,255,255,0.55)",
      };
    case "subtle":
      return {
        text: "var(--color-ink)",
        symbol: "var(--color-primary)",
        subtitle: "var(--color-ink-muted-48)",
      };
    case "default":
    default:
      return {
        text: "var(--color-ink)",
        symbol: "var(--color-primary)",
        subtitle: "var(--color-ink-muted-48)",
      };
  }
}
