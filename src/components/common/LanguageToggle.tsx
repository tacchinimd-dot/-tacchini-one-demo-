"use client";

/* ============================================================
 * LanguageToggle — KO / EN segment switch
 *
 * Variants:
 *   - "dark"  : 도어 / 사이드바 등 다크 surface
 *   - "light" : 콘솔 헤더 등 라이트 surface
 *   - "ghost" : 작은 inline (콘솔 사이드바 푸터 등)
 * ============================================================ */

import { useLang } from "@/lib/i18n/LanguageProvider";

type Variant = "dark" | "light" | "ghost";

interface Props {
  variant?: Variant;
  size?: "sm" | "md";
}

const STYLE: Record<Variant, {
  track: React.CSSProperties;
  inactive: React.CSSProperties;
  active: React.CSSProperties;
}> = {
  dark: {
    track: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    inactive: { color: "rgba(255,255,255,0.55)" },
    active: {
      background: "rgba(255,255,255,0.10)",
      color: "#fff",
      boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
    },
  },
  light: {
    track: {
      background: "var(--color-canvas)",
      border: "1px solid var(--color-hairline)",
    },
    inactive: { color: "var(--color-ink-muted-48)" },
    active: {
      background: "var(--color-primary)",
      color: "#fff",
    },
  },
  ghost: {
    track: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    inactive: { color: "rgba(255,255,255,0.45)" },
    active: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
    },
  },
};

export default function LanguageToggle({ variant = "dark", size = "md" }: Props) {
  const { lang, setLang } = useLang();
  const s = STYLE[variant];
  const padX = size === "sm" ? 7 : 10;
  const padY = size === "sm" ? 3 : 4;
  const fontSize = size === "sm" ? 10 : 11;

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className="inline-flex items-center"
      style={{
        ...s.track,
        borderRadius: 9999,
        padding: 2,
        gap: 2,
      }}
    >
      {(["ko", "en"] as const).map((l) => {
        const isActive = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={isActive}
            className="transition-all"
            style={{
              ...((isActive ? s.active : s.inactive) as React.CSSProperties),
              fontFamily: "var(--font-body)",
              fontSize,
              fontWeight: isActive ? 700 : 600,
              letterSpacing: 0.6,
              padding: `${padY}px ${padX}px`,
              borderRadius: 9999,
              border: "none",
              cursor: isActive ? "default" : "pointer",
            }}
          >
            {l === "ko" ? "한" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
