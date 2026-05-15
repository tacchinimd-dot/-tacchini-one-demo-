"use client";

/* ============================================================
 * /atelier/mirror — Mirror 터미널
 *
 * 26FW Sugi France 실물 샘플 검수 대시보드를 그대로 embed.
 *  · 원본: 자체 완결 HTML (public/mirror/dashboard.html + images/)
 *  · 외부 의존·인증 없음 — apex-report.html 과 동일한 번들 패턴
 * ============================================================ */

import { useState } from "react";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";

const DASHBOARD_URL = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/mirror/dashboard.html`;

export default function MirrorRoute() {
  return (
    <LoginGate>
      <Mirror />
    </LoginGate>
  );
}

function Mirror() {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="console-shell">
      <Sidebar active="mirror" />
      <div
        className="console-main"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Header bar */}
        <header
          className="flex items-center justify-between gap-4"
          style={{
            flexShrink: 0,
            height: 64,
            padding: "0 24px",
            background: "var(--color-canvas)",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          <div className="min-w-0">
            <div
              className="t-label"
              style={{ color: "var(--color-accent-red)" }}
            >
              {t.mirror.label}
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <h1
                className="truncate"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: -0.3,
                  color: "var(--color-ink)",
                }}
              >
                {t.mirror.title}
              </h1>
              <span
                className="truncate"
                style={{ fontSize: 12, color: "var(--color-ink-muted-48)" }}
              >
                {t.mirror.subtitle}
              </span>
            </div>
          </div>

          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{
              flexShrink: 0,
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-ink-muted-80)",
              padding: "7px 13px",
              background: "var(--color-canvas-soft)",
              border: "1px solid var(--color-hairline)",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            {t.mirror.open_new_tab}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </header>

        {/* Dashboard iframe */}
        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
          {!loaded && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "var(--color-app-bg)",
                color: "var(--color-ink-muted-48)",
                fontSize: 13,
              }}
            >
              {t.mirror.loading}
            </div>
          )}
          <iframe
            src={DASHBOARD_URL}
            title={t.mirror.title}
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}
