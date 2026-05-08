"use client";

/* ============================================================
 * TopBar — Console header (search · breadcrumb · alerts · actions)
 * ============================================================ */

import Link from "next/link";
import LanguageToggle from "@/components/common/LanguageToggle";

interface Props {
  breadcrumb?: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
}

export default function TopBar({ breadcrumb = [], title, subtitle, rightActions }: Props) {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "color-mix(in oklab, var(--color-app-bg) 85%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      {/* Sub-utility row */}
      <div
        className="flex items-center justify-between px-8 py-2"
        style={{
          fontSize: 11,
          color: "var(--color-ink-muted-48)",
          borderBottom: "1px solid var(--color-divider-soft)",
        }}
      >
        <div className="flex items-center gap-2 t-mono">
          {breadcrumb.length === 0 ? (
            <span>F&amp;F HQ · STE Operations</span>
          ) : (
            breadcrumb.map((b, i) => {
              const isLast = i === breadcrumb.length - 1;
              const labelEl = b.href && !isLast ? (
                <Link
                  href={b.href}
                  style={{ color: "inherit", textDecoration: "none" }}
                  className="hover:underline"
                >
                  {b.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? "var(--color-ink)" : "inherit" }}>
                  {b.label}
                </span>
              );
              return (
                <span key={b.label} className="flex items-center gap-2">
                  {labelEl}
                  {!isLast && <span style={{ opacity: 0.4 }}>›</span>}
                </span>
              );
            })
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="t-mono">26FW</span>
          <span style={{ width: 1, height: 12, background: "var(--color-hairline)" }} />
          <span className="t-mono">D-180</span>
          <span style={{ width: 1, height: 12, background: "var(--color-hairline)" }} />
          <span>2026-05-08</span>
        </div>
      </div>

      {/* Main title row */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="h-display-md" style={{ marginTop: 0 }}>{title}</h1>
            {subtitle && (
              <p
                className="mt-1"
                style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <LanguageToggle variant="light" />

          {/* Search */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-2 mr-1"
            style={{
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-md)",
              minWidth: 280,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-ink-muted-48)" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search licensees, designs, contracts..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                width: "100%",
                color: "var(--color-ink)",
              }}
            />
            <span
              className="t-mono"
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "var(--color-ink-muted-48)",
                background: "var(--color-canvas-soft)",
                border: "1px solid var(--color-hairline)",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              ⌘K
            </span>
          </div>

          <button
            className="btn btn-ghost btn-sm"
            aria-label="Notifications"
            style={{ position: "relative" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "var(--color-accent-red)",
              }}
            />
          </button>

          {rightActions}
        </div>
      </div>
    </header>
  );
}
