"use client";

/* ============================================================
 * Season Calendar (/calendar)
 *
 * 26FW 마스터 시간축. 9개 마일스톤을 타임라인 + 리스트로 시각화.
 * 데이터: lib/console-data.ts (SEASON_MILESTONES) · 라벨: dictionary console.milestone_*
 * ============================================================ */

import { useState } from "react";
import Sidebar from "@/components/console/Sidebar";
import TopBar from "@/components/console/TopBar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { SEASON_MILESTONES, type MilestoneStatus } from "@/lib/console-data";

type ConsoleDict = Record<string, unknown>;
function tk(t: { console: ConsoleDict }, key: string): string {
  const v = t.console[key];
  return typeof v === "string" ? v : key;
}

const TODAY_D = -180; /* Demo state */
const D_MIN = -180;
const D_MAX = 30;

export default function CalendarRoute() {
  return (
    <LoginGate>
      <CalendarPage />
    </LoginGate>
  );
}

function CalendarPage() {
  const { t } = useLang();
  const [view, setView] = useState<"timeline" | "table">("timeline");

  const counts = SEASON_MILESTONES.reduce(
    (acc, m) => {
      acc[m.status] += 1;
      return acc;
    },
    { done: 0, active: 0, pending: 0 } as Record<MilestoneStatus, number>
  );

  const todayPos = ((TODAY_D - D_MIN) / (D_MAX - D_MIN)) * 100;

  return (
    <div className="console-shell">
      <Sidebar active="calendar" />
      <div className="console-main">
        <TopBar
          breadcrumb={[
            { label: t.console.breadcrumb_platform, href: "/" },
            { label: t.console.breadcrumb_ste },
            { label: t.calendar_page.breadcrumb },
          ]}
          title={t.calendar_page.title}
          subtitle={t.calendar_page.subtitle}
          rightActions={
            <div className="flex items-center gap-1.5">
              <ViewToggle active={view === "timeline"} onClick={() => setView("timeline")}>
                {t.calendar_page.view_timeline}
              </ViewToggle>
              <ViewToggle active={view === "table"} onClick={() => setView("table")}>
                {t.calendar_page.view_table}
              </ViewToggle>
            </div>
          }
        />

        <div className="console-pad space-y-5">
          {/* Legend + summary */}
          <div className="card flex items-center flex-wrap gap-4" style={{ padding: 16 }}>
            <Legend color="var(--status-ok)" label={t.calendar_page.legend_done} count={counts.done} formatter={t.calendar_page.summary_done} />
            <Legend color="var(--color-primary)" label={t.calendar_page.legend_active} count={counts.active} formatter={t.calendar_page.summary_active} />
            <Legend color="var(--color-hairline-strong)" label={t.calendar_page.legend_pending} count={counts.pending} formatter={t.calendar_page.summary_pending} />
          </div>

          {view === "timeline" ? (
            <div className="card" style={{ padding: 28 }}>
              {/* Horizontal timeline */}
              <div style={{ position: "relative", paddingTop: 60, paddingBottom: 20 }}>
                {/* Track */}
                <div
                  style={{
                    position: "relative",
                    height: 4,
                    background: "var(--color-hairline)",
                    borderRadius: 9999,
                  }}
                >
                  {/* Progress (done segment) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 4,
                      width: `${todayPos}%`,
                      background: "linear-gradient(90deg, var(--status-ok), var(--color-primary))",
                      borderRadius: 9999,
                    }}
                  />
                  {/* Today marker */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${todayPos}%`,
                      top: -8,
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 20,
                      background: "var(--color-accent-red)",
                      borderRadius: 9999,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `${todayPos}%`,
                      top: -32,
                      transform: "translateX(-50%)",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "var(--color-accent-red)",
                      letterSpacing: 0.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ● {t.calendar_page.today}
                  </div>

                  {/* Milestone dots */}
                  {SEASON_MILESTONES.map((m, i) => {
                    const pos = ((m.d - D_MIN) / (D_MAX - D_MIN)) * 100;
                    const dotColor =
                      m.status === "done"
                        ? "var(--status-ok)"
                        : m.status === "active"
                        ? "var(--color-primary)"
                        : "var(--color-hairline-strong)";
                    const labelTop = i % 2 === 0 ? -48 : 16;
                    return (
                      <div key={m.id} style={{ position: "absolute", left: `${pos}%`, top: -6 }}>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 9999,
                            background: dotColor,
                            border: "3px solid var(--color-canvas)",
                            boxShadow:
                              m.status === "active"
                                ? "0 0 0 4px rgba(0, 44, 95, 0.18)"
                                : "none",
                            transform: "translateX(-50%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: labelTop,
                            transform: "translateX(-50%)",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div
                            className="t-mono"
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: dotColor,
                            }}
                          >
                            D{m.d > 0 ? "+" : ""}{m.d}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Milestone label rows below */}
                <div className="mt-12 grid sm:grid-cols-3 gap-2.5">
                  {SEASON_MILESTONES.map((m) => {
                    const color =
                      m.status === "done"
                        ? "var(--status-ok)"
                        : m.status === "active"
                        ? "var(--color-primary)"
                        : "var(--color-ink-muted-48)";
                    return (
                      <div
                        key={m.id}
                        style={{
                          padding: "10px 12px",
                          background: "var(--color-canvas-soft)",
                          border:
                            m.status === "active"
                              ? `1px solid ${color}`
                              : "1px solid var(--color-hairline)",
                          borderRadius: "var(--radius-sm)",
                          borderLeft: `3px solid ${color}`,
                        }}
                      >
                        <div
                          className="t-mono"
                          style={{ fontSize: 9.5, fontWeight: 800, color }}
                        >
                          D{m.d > 0 ? "+" : ""}{m.d}
                        </div>
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: m.status === "pending" ? 500 : 600,
                            color:
                              m.status === "pending"
                                ? "var(--color-ink-muted-80)"
                                : "var(--color-ink)",
                            marginTop: 2,
                          }}
                        >
                          {tk(t, `milestone_${m.id}`)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--color-canvas-soft)" }}>
                    <th style={thStyle()}>D</th>
                    <th style={thStyle()}>{t.calendar_page.breadcrumb}</th>
                    <th style={thStyle("right")}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SEASON_MILESTONES.map((m) => {
                    const color =
                      m.status === "done"
                        ? "var(--status-ok)"
                        : m.status === "active"
                        ? "var(--color-primary)"
                        : "var(--color-ink-muted-48)";
                    const statusLabel =
                      m.status === "done"
                        ? t.calendar_page.legend_done
                        : m.status === "active"
                        ? t.calendar_page.legend_active
                        : t.calendar_page.legend_pending;
                    return (
                      <tr key={m.id} style={{ borderTop: "1px solid var(--color-divider-soft)" }}>
                        <td style={{ padding: "12px 24px", width: 80 }}>
                          <span
                            className="t-mono"
                            style={{ fontSize: 12, fontWeight: 800, color }}
                          >
                            D{m.d > 0 ? "+" : ""}{m.d}
                          </span>
                        </td>
                        <td style={{ padding: "12px 24px", fontSize: 13, fontWeight: 600 }}>
                          {tk(t, `milestone_${m.id}`)}
                        </td>
                        <td style={{ padding: "12px 24px", textAlign: "right" }}>
                          <span
                            className="pill"
                            style={{
                              background:
                                m.status === "done"
                                  ? "rgba(22,163,74,0.10)"
                                  : m.status === "active"
                                  ? "rgba(0,44,95,0.10)"
                                  : "var(--color-canvas-soft)",
                              color,
                              borderColor: "transparent",
                              fontSize: 11,
                            }}
                          >
                            <span className="pill-dot" />
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function thStyle(align?: "left" | "right"): React.CSSProperties {
  return {
    padding: "12px 24px",
    textAlign: align === "right" ? "right" : "left",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "var(--color-ink-muted-48)",
    background: "transparent",
    borderBottom: "1px solid var(--color-hairline)",
  };
}

function Legend({
  color,
  label,
  count,
  formatter,
}: {
  color: string;
  label: string;
  count: number;
  formatter: (n: number) => string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ width: 10, height: 10, borderRadius: 9999, background: color }} />
      <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
      <span className="t-mono" style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}>
        {formatter(count)}
      </span>
    </div>
  );
}

function ViewToggle({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 12px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--color-hairline)",
        background: active ? "var(--color-primary)" : "var(--color-canvas)",
        color: active ? "#fff" : "var(--color-ink-muted-80)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
