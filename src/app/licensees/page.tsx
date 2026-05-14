"use client";

/* ============================================================
 * Licensees Directory (/licensees)
 *
 * Operations 사이드바 진입점. 6개 STE 라이센시 디렉토리 카드 + 검색·필터.
 * 데이터: lib/console-data.ts (LICENSEES) · 라벨: dictionary console.lic_*
 * ============================================================ */

import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/console/Sidebar";
import TopBar from "@/components/console/TopBar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import {
  LICENSEES,
  GROUP_STYLE,
  STATUS_STYLE,
  type GroupCode,
} from "@/lib/console-data";

type ConsoleDict = Record<string, unknown>;
function tk(t: { console: ConsoleDict }, key: string): string {
  const v = t.console[key];
  return typeof v === "string" ? v : key;
}

export default function LicenseesRoute() {
  return (
    <LoginGate>
      <LicenseesPage />
    </LoginGate>
  );
}

function LicenseesPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | GroupCode>("all");
  const [query, setQuery] = useState("");

  const filtered = LICENSEES.filter((l) => {
    if (filter !== "all" && l.group !== filter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const region = tk(t, `lic_${l.id}_region`).toLowerCase();
    const category = tk(t, `lic_${l.id}_category`).toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      region.includes(q) ||
      category.includes(q)
    );
  });

  return (
    <div className="console-shell">
      <Sidebar active="licensees" />
      <div className="console-main">
        <TopBar
          breadcrumb={[
            { label: t.console.breadcrumb_platform, href: "/" },
            { label: t.console.breadcrumb_ste },
            { label: t.licensees_page.breadcrumb },
          ]}
          title={t.licensees_page.title}
          subtitle={t.licensees_page.subtitle}
        />
        <div className="console-pad space-y-5">
          {/* Filter bar */}
          <div className="card flex items-center flex-wrap gap-3" style={{ padding: 16 }}>
            <input
              type="text"
              placeholder={t.licensees_page.search_placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "8px 12px",
                background: "var(--color-canvas-soft)",
                border: "1px solid var(--color-hairline)",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                outline: "none",
                color: "var(--color-ink)",
              }}
            />
            <div className="flex items-center gap-1.5 flex-wrap">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                {t.licensees_page.filter_all}
              </FilterChip>
              <FilterChip active={filter === "G1"} onClick={() => setFilter("G1")} color="var(--color-primary)">
                {t.licensees_page.filter_g1}
              </FilterChip>
              <FilterChip active={filter === "G2"} onClick={() => setFilter("G2")} color="var(--color-brick-red)">
                {t.licensees_page.filter_g2}
              </FilterChip>
              <FilterChip active={filter === "G3"} onClick={() => setFilter("G3")} color="var(--color-court-green)">
                {t.licensees_page.filter_g3}
              </FilterChip>
            </div>
            <span className="t-mono ml-auto" style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}>
              {filtered.length} / {LICENSEES.length} · {t.licensees_page.summary_total}
            </span>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((l) => {
              const region = tk(t, `lic_${l.id}_region`);
              const category = tk(t, `lic_${l.id}_category`);
              const status = tk(t, `lic_${l.id}_status`);
              const revenueDisplay =
                l.revenue_eur === null
                  ? "—"
                  : l.revenue_eur === 0
                  ? `€ 0 ${tk(t, "revenue_launching")}`
                  : `€ ${(l.revenue_eur / 1000).toFixed(0)}k`;

              return (
                <div
                  key={l.id}
                  className="card"
                  style={{
                    padding: 22,
                    borderTop: `3px solid ${GROUP_STYLE[l.group].color}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: GROUP_STYLE[l.group].bg,
                          color: GROUP_STYLE[l.group].color,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        {l.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{l.name}</div>
                        <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                          STE-{l.name.slice(0, 3).toUpperCase()}-26
                        </div>
                      </div>
                    </div>
                    <span
                      className="pill"
                      style={{
                        color: GROUP_STYLE[l.group].color,
                        background: GROUP_STYLE[l.group].bg,
                        borderColor: "transparent",
                      }}
                    >
                      {l.group}
                    </span>
                  </div>

                  <div style={{ fontSize: 12.5, color: "var(--color-ink-muted-80)", marginBottom: 4 }}>
                    {region}
                  </div>
                  <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)", marginBottom: 14 }}>
                    {category}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <Metric label={t.licensees_page.card_revenue} value={revenueDisplay} />
                    <Metric
                      label={t.licensees_page.card_minimum}
                      value={l.minimum > 0 ? `${l.minimum}%` : "—"}
                      color={
                        l.minimum >= 100
                          ? "var(--status-ok)"
                          : l.minimum >= 50
                          ? "var(--status-warn)"
                          : l.minimum > 0
                          ? "var(--status-bad)"
                          : "var(--color-ink-muted-48)"
                      }
                    />
                    <Metric
                      label={t.licensees_page.card_compliance}
                      value={`${l.compliance}`}
                      color={
                        l.compliance >= 85
                          ? "var(--status-ok)"
                          : l.compliance >= 70
                          ? "var(--status-warn)"
                          : "var(--status-bad)"
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="pill"
                      style={{
                        color: STATUS_STYLE[l.statusKind].color,
                        background: STATUS_STYLE[l.statusKind].bg,
                        borderColor: "transparent",
                        fontSize: 11,
                      }}
                    >
                      <span className="pill-dot" />
                      {status}
                    </span>
                    <Link
                      href={
                        l.id === "sugi_france"
                          ? "/atelier/inspector/movin"
                          : l.id === "bbuk"
                          ? "/console/flows/contract"
                          : "/console"
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      {t.licensees_page.card_open} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  color,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11.5,
        fontWeight: 700,
        padding: "5px 12px",
        borderRadius: 9999,
        border: active
          ? `1px solid ${color || "var(--color-primary)"}`
          : "1px solid var(--color-hairline)",
        background: active ? (color || "var(--color-primary)") : "transparent",
        color: active ? "#fff" : "var(--color-ink-muted-80)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      style={{
        padding: "8px 10px",
        background: "var(--color-canvas-soft)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div className="t-label" style={{ marginBottom: 2, fontSize: 9 }}>
        {label}
      </div>
      <div
        className="t-tabular"
        style={{ fontSize: 13, fontWeight: 700, color: color || "var(--color-ink)" }}
      >
        {value}
      </div>
    </div>
  );
}
