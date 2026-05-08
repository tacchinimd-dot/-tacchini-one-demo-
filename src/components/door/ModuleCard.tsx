/* ============================================================
 * ModuleCard — 플랫폼 도어의 진입 카드
 *
 * 글래스모픽 다크 카드 + 미니 KPI + arrow.
 * 사용 위치: 플랫폼 도어(/)에서 6개 모듈 진입.
 * ============================================================ */

import Link from "next/link";
import type { ReactNode } from "react";

interface Stat {
  label: string;
  value: string;
  accent?: "ok" | "warn" | "info" | "muted";
}

interface Props {
  href: string;
  code: string;
  title: string;
  subtitle: string;
  body: string;
  icon: ReactNode;
  stats?: Stat[];
  size?: "lg" | "md";
  status?: { label: string; kind: "live" | "preview" | "soon" };
  available?: boolean;
}

const ACCENT_COLOR: Record<NonNullable<Stat["accent"]>, string> = {
  ok: "#4ade80",
  warn: "#fbbf24",
  info: "#60a5fa",
  muted: "rgba(255,255,255,0.62)",
};

export default function ModuleCard({
  href,
  code,
  title,
  subtitle,
  body,
  icon,
  stats = [],
  size = "md",
  status,
  available = true,
}: Props) {
  const inner = (
    <article
      className="relative overflow-hidden h-full transition-all duration-300"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: size === "lg" ? 28 : 22,
        color: "#fff",
        backdropFilter: "blur(8px)",
        cursor: available ? "pointer" : "not-allowed",
        opacity: available ? 1 : 0.55,
      }}
    >
      {/* hover halo */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(228,0,43,0.18), transparent 60%), radial-gradient(circle at 80% 80%, rgba(201,154,58,0.14), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative flex flex-col h-full">
        {/* Top: icon + status */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="flex items-center justify-center"
            style={{
              width: size === "lg" ? 48 : 40,
              height: size === "lg" ? 48 : 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "var(--color-cream-white)",
            }}
          >
            {icon}
          </div>
          <div className="flex items-center gap-2">
            {status && <StatusPill {...status} />}
            <span
              className="t-mono"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "rgba(255,255,255,0.42)",
              }}
            >
              {code}
            </span>
          </div>
        </div>

        {/* Title + subtitle */}
        <div className="flex-1">
          <div
            style={{
              fontSize: size === "lg" ? 11 : 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 6,
            }}
          >
            {subtitle}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: size === "lg" ? 28 : 22,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -0.4,
              color: "#fff",
            }}
          >
            {title}
          </h3>
          <p
            className="mt-3"
            style={{
              fontSize: size === "lg" ? 14 : 13,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.55,
            }}
          >
            {body}
          </p>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div
            className="mt-6 grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))`,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 16,
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.42)",
                    letterSpacing: 0.3,
                  }}
                >
                  {s.label}
                </div>
                <div
                  className="t-tabular"
                  style={{
                    marginTop: 2,
                    fontSize: size === "lg" ? 18 : 16,
                    fontWeight: 700,
                    color: ACCENT_COLOR[s.accent || "muted"],
                    letterSpacing: -0.2,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enter arrow */}
        <div
          className="mt-5 flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1"
          style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}
        >
          {available ? "Enter" : "Coming soon"}
          {available && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </div>
      </div>
    </article>
  );

  if (!available) {
    return <div className="group block h-full">{inner}</div>;
  }

  return (
    <Link href={href} className="group block h-full" style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  );
}

function StatusPill({ label, kind }: { label: string; kind: "live" | "preview" | "soon" }) {
  const M: Record<string, { fg: string; bg: string }> = {
    live: { fg: "#4ade80", bg: "rgba(74, 222, 128, 0.14)" },
    preview: { fg: "#fbbf24", bg: "rgba(251, 191, 36, 0.14)" },
    soon: { fg: "rgba(255,255,255,0.55)", bg: "rgba(255,255,255,0.06)" },
  };
  const s = M[kind];
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.8,
        color: s.fg,
        background: s.bg,
        padding: "2px 8px",
        borderRadius: 9999,
        border: `1px solid ${s.fg}33`,
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 9999,
          background: s.fg,
          boxShadow: kind === "live" ? `0 0 6px ${s.fg}` : "none",
        }}
      />
      {label}
    </span>
  );
}
