"use client";

/* ============================================================
 * Operations Console (/console) — i18n 적용
 *
 * 플랫폼 도어(/) 에서 "Operations" 모듈 클릭 시 진입하는 콘솔.
 * 헤더·KPI 라벨·테이블 헤더만 i18n. 데이터 본문은 한국어 그대로.
 * ============================================================ */

import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import TopBar from "@/components/console/TopBar";
import KpiCard from "@/components/console/KpiCard";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { FLOW_CARDS } from "@/lib/flow-data";

export default function OperationsConsoleRoute() {
  return (
    <LoginGate>
      <OperationsConsole />
    </LoginGate>
  );
}

function OperationsConsole() {
  const { t } = useLang();
  return (
    <div className="console-shell">
      <Sidebar active="dashboard" />
      <div className="console-main">
        <TopBar
          breadcrumb={[
            { label: t.console.breadcrumb_platform, href: "/" },
            { label: t.console.breadcrumb_hq },
            { label: t.console.breadcrumb_ste },
            { label: t.console.breadcrumb_dashboard },
          ]}
          title={t.console.title}
          subtitle={t.console.subtitle}
          rightActions={
            <Link href="/atelier/inspector/movin" className="btn btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              {t.console.cta_new_review}
            </Link>
          }
        />

        <div className="console-pad space-y-6">
          <KpiRow />

          <ActiveFlows />

          <div className="grid gap-6 lg:grid-cols-3">
            <SeasonProgress />
            <PendingReviews />
            <AtelierCallout />
          </div>

          <LicenseesMatrix />

          <div className="grid gap-6 lg:grid-cols-3">
            <RevenueChart />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * KPI Row (4 cards)
 * ============================================================ */
function KpiRow() {
  const { t } = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label={t.console.kpi_licensees}
        value="6"
        delta={{ value: t.console.kpi_licensees_delta, neutral: true }}
        caption={t.console.kpi_licensees_caption}
        accent="var(--color-primary)"
        spark={[5, 5, 5, 6, 6, 6, 6]}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21V8a2 2 0 0 0-1-1.7L13 2.4a2 2 0 0 0-2 0L4 6.3A2 2 0 0 0 3 8v13" /><path d="M9 21V12h6v9" /></svg>
        }
      />
      <KpiCard
        label={t.console.kpi_royalty}
        value="€ 1.84M"
        delta={{ value: "+12.4% YoY", positive: true }}
        caption={t.console.kpi_royalty_caption}
        accent="var(--color-accent-gold)"
        spark={[12, 14, 13, 15, 16, 17, 18]}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
        }
      />
      <KpiCard
        label={t.console.kpi_reviews}
        value="42"
        delta={{ value: t.console.kpi_reviews_delta, positive: true }}
        caption={t.console.kpi_reviews_caption}
        accent="var(--color-accent-red)"
        spark={[6, 8, 7, 9, 10, 12, 14]}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        }
      />
      <KpiCard
        label={t.console.kpi_compliance}
        value="86.4 / 100"
        delta={{ value: t.console.kpi_compliance_delta, positive: true }}
        caption={t.console.kpi_compliance_caption}
        accent="var(--color-court-green)"
        spark={[78, 80, 81, 84, 85, 86, 86]}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        }
      />
    </div>
  );
}

/* ============================================================
 * Active Flows — 4 End-to-End Operations Flows
 * ============================================================ */
function ActiveFlows() {
  const { t } = useLang();
  const cards = [
    {
      ...FLOW_CARDS[0],
      title: t.flows.flow_a_title,
      subtitle: t.flows.flow_a_subtitle,
      status: t.flows.flow_a_status,
      progressLabel: t.flows.flow_a_progress_label,
    },
    {
      ...FLOW_CARDS[1],
      title: t.flows.flow_b_title,
      subtitle: t.flows.flow_b_subtitle,
      status: t.flows.flow_b_status,
      progressLabel: t.flows.flow_b_progress_label,
    },
    {
      ...FLOW_CARDS[2],
      title: t.flows.flow_c_title,
      subtitle: t.flows.flow_c_subtitle,
      status: t.flows.flow_c_status,
      progressLabel: t.flows.flow_c_progress_label,
    },
    {
      ...FLOW_CARDS[3],
      title: t.flows.flow_d_title,
      subtitle: t.flows.flow_d_subtitle,
      status: t.flows.flow_d_status,
      progressLabel: t.flows.flow_d_progress_label,
    },
  ];

  return (
    <div>
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="t-label">{t.flows.section_label}</div>
          <h2 className="h-tagline mt-1">{t.flows.section_title}</h2>
          <p className="t-caption mt-0.5" style={{ color: "var(--color-ink-muted-48)" }}>
            {t.flows.section_subtitle}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="card relative overflow-hidden block group"
            style={{
              padding: 18,
              textDecoration: "none",
              color: "inherit",
              borderTop: `3px solid ${c.accent}`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: c.accent,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {c.icon}
              </div>
              {c.live && (
                <span
                  className="t-mono"
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: "var(--color-accent-red)",
                    background: "rgba(228, 0, 43, 0.10)",
                    padding: "2px 7px",
                    borderRadius: 9999,
                    letterSpacing: 0.5,
                  }}
                >
                  ● {t.flows.already_live}
                </span>
              )}
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>
              {c.title}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: "var(--color-ink-muted-80)",
                lineHeight: 1.45,
                marginBottom: 10,
                minHeight: 32,
              }}
            >
              {c.subtitle}
            </div>

            <div className="progress-track" style={{ marginBottom: 6 }}>
              <div
                className="progress-fill"
                style={{ width: `${c.progress}%`, background: c.accent }}
              />
            </div>
            <div
              className="t-mono"
              style={{ fontSize: 9.5, color: "var(--color-ink-muted-48)", marginBottom: 10 }}
            >
              {c.progressLabel}
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: c.accent,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {t.flows.open_flow}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * Season Calendar Progress (D-180 → D+30)
 * ============================================================ */
function SeasonProgress() {
  const { t } = useLang();
  const milestones = [
    { d: -180, label: "F&F 시즌 디렉션 게시", status: "done" },
    { d: -150, label: "라이센시 경쟁사 데이터·기획", status: "done" },
    { d: -120, label: "디자인 산출물 제출 마감", status: "active" },
    { d: -100, label: "F&F 디자인 승인", status: "pending" },
    { d: -90, label: "차기 시즌 계획 제출", status: "pending" },
    { d: -70, label: "실물 샘플 송부", status: "pending" },
    { d: -60, label: "샘플 검수 + 시즌 계획 승인", status: "pending" },
    { d: 0, label: "시즌 출시", status: "pending" },
    { d: 30, label: "분기 로열티 정산", status: "pending" },
  ];

  const today = -180; /* Demo state: D-180 */
  const progress = Math.max(0, Math.min(100, ((180 + today) / 210) * 100));

  return (
    <div className="card lg:col-span-2" style={{ padding: 24 }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="t-label">{t.console.season_label}</div>
          <h2 className="h-tagline mt-1">{t.console.season_title}</h2>
          <p className="t-caption mt-0.5" style={{ color: "var(--color-ink-muted-48)" }}>
            {t.console.season_subtitle}
          </p>
        </div>
        <Link href="/calendar" className="btn btn-ghost btn-sm">
          {t.console.season_open}
        </Link>
      </div>

      <div className="progress-track mt-2">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <ul className="mt-5 space-y-2.5">
        {milestones.slice(0, 6).map((m) => (
          <li key={m.d} className="flex items-center gap-3">
            <span
              className="t-mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color:
                  m.status === "done"
                    ? "var(--status-ok)"
                    : m.status === "active"
                    ? "var(--color-primary)"
                    : "var(--color-ink-muted-48)",
                width: 48,
              }}
            >
              D{m.d > 0 ? "+" : ""}
              {m.d}
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background:
                  m.status === "done"
                    ? "var(--status-ok)"
                    : m.status === "active"
                    ? "var(--color-primary)"
                    : "var(--color-hairline-strong)",
                boxShadow: m.status === "active" ? "0 0 0 4px rgba(0, 44, 95, 0.15)" : "none",
              }}
            />
            <span style={{ fontSize: 13, color: m.status === "pending" ? "var(--color-ink-muted-48)" : "var(--color-ink)", fontWeight: m.status !== "pending" ? 500 : 400 }}>
              {m.label}
            </span>
            {m.status === "active" && (
              <span
                className="t-mono"
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  background: "rgba(0, 44, 95, 0.08)",
                  padding: "2px 7px",
                  borderRadius: 9999,
                }}
              >
                {t.console.season_next}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
 * Pending Design Reviews
 * ============================================================ */
function PendingReviews() {
  const { t } = useLang();
  const reviews = [
    {
      id: "SF-27SS-LM-NET",
      licensee: "Sugi France",
      group: "G1",
      item: "27SS Lifestyle Man · NET line (5 SKU)",
      verdict: "B",
      time: "방금",
      severity: "low",
      href: "/atelier/inspector/movin",
    },
    {
      id: "SF-27SS-LM-FULL",
      licensee: "Sugi France",
      group: "G1",
      item: "27SS Lifestyle Man · 전체 28 SKU 자동검수 완료",
      verdict: "B",
      time: "5분 전",
      severity: "mid",
      href: "/atelier/inspector/movin",
    },
    {
      id: "SF-26FW-AP-0042",
      licensee: "Sugi France",
      group: "G1",
      item: "Heritage Hooded Jacket (이전 시즌 demo)",
      verdict: "C",
      time: "30분 전",
      severity: "high",
      href: "/atelier/inspector",
    },
  ];

  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="t-label">{t.console.pending_label}</div>
          <h2 className="h-tagline mt-1">{t.console.pending_title}</h2>
        </div>
        <Link href="/atelier/inspector/movin" className="btn btn-ghost btn-sm">
          {t.console.pending_view_all}
        </Link>
      </div>

      <ul className="space-y-3">
        {reviews.map((r) => (
          <li key={r.id}>
          <Link
            href={r.href}
            className="block transition-colors hover:bg-gray-50"
            style={{
              padding: 14,
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-canvas-soft)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#fff",
                      background: r.group === "G1" ? "var(--color-primary)" : r.group === "G2" ? "var(--color-brick-red)" : "var(--color-court-green)",
                      padding: "1px 6px",
                      borderRadius: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {r.group}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--color-ink-muted-48)", fontWeight: 600 }}>
                    {r.licensee}
                  </span>
                </div>
                <div className="mt-1.5 truncate" style={{ fontSize: 13, fontWeight: 600 }}>
                  {r.item}
                </div>
                <div className="mt-1 t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                  {r.id} · {r.time}
                </div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background:
                    r.verdict === "A"
                      ? "var(--grade-a)"
                      : r.verdict === "B"
                      ? "var(--color-primary)"
                      : r.verdict === "C"
                      ? "var(--grade-b)"
                      : "var(--grade-c)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {r.verdict}
              </div>
            </div>
          </Link>
          </li>
        ))}
      </ul>

      <Link href="/atelier/inspector/movin" className="btn btn-primary btn-sm mt-4 w-full">
        {t.console.pending_open}
      </Link>
    </div>
  );
}

/* ============================================================
 * ATELIER ONE Callout
 * ============================================================ */
function AtelierCallout() {
  const { t } = useLang();
  return (
    <Link
      href="/atelier/inspector/movin"
      className="card relative overflow-hidden block"
      style={{
        padding: 24,
        background: "linear-gradient(135deg, #001a3a 0%, var(--color-primary) 60%, #0a4585 100%)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.08)",
        textDecoration: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 220,
          height: 220,
          background: "radial-gradient(circle, rgba(228,0,43,0.32), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(201,154,58,0.22), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative">
        <div
          className="t-label"
          style={{
            color: "rgba(255,255,255,0.55)",
            background: "linear-gradient(90deg, var(--color-accent-red), var(--color-accent-gold))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
          }}
        >
          {t.console.atelier_label}
        </div>
        <h2
          className="h-tagline mt-1"
          style={{ color: "#fff", fontSize: 22 }}
        >
          {t.console.atelier_title}
        </h2>
        <p className="mt-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>
          {t.console.atelier_body}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["Inspector", "Studio", "Mirror", "Codex"].map((m) => (
            <span
              key={m}
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.92)",
                padding: "3px 9px",
                borderRadius: 9999,
                letterSpacing: 0.5,
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div
          className="mt-6 flex items-center gap-2"
          style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}
        >
          {t.console.atelier_cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
 * 6 Licensees Matrix
 * ============================================================ */
const LICENSEES = [
  {
    name: "BBUK",
    region: "UK · Ireland",
    category: "Apparel + Acc",
    group: "G3" as const,
    revenue: "€ 412k",
    minimum: 191,
    compliance: 88,
    status: "갱신 협상 중",
    statusKind: "active" as const,
  },
  {
    name: "Sugi Footwear",
    region: "FR · IT · UK · DACH · ME",
    category: "Footwear",
    group: "G2" as const,
    revenue: "€ 286k",
    minimum: 32,
    compliance: 71,
    status: "Brand Elevation",
    statusKind: "warn" as const,
  },
  {
    name: "Sugi France",
    region: "FR · DACH · Benelux · 북아프리카",
    category: "Apparel",
    group: "G1" as const,
    revenue: "€ 0 (런칭 전)",
    minimum: 0,
    compliance: 92,
    status: "26FW 런칭",
    statusKind: "info" as const,
  },
  {
    name: "Benjamin",
    region: "Europe · ME · 북아프리카",
    category: "Socks · UW · Sleepwear",
    group: "G3" as const,
    revenue: "€ 318k",
    minimum: 142,
    compliance: 90,
    status: "5+5년 연장 요청",
    statusKind: "active" as const,
  },
  {
    name: "BDS",
    region: "동유럽 16개국 · CIS",
    category: "Apparel",
    group: "G1" as const,
    revenue: "€ 92k",
    minimum: 14,
    compliance: 84,
    status: "신계약 원년",
    statusKind: "info" as const,
  },
  {
    name: "SILVER",
    region: "Italy",
    category: "Apparel",
    group: "G2" as const,
    revenue: "€ 28k",
    minimum: 18,
    compliance: 62,
    status: "사실상 종료",
    statusKind: "danger" as const,
  },
];

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  active: { color: "var(--status-ok)", bg: "rgba(22,163,74,0.10)" },
  warn: { color: "var(--status-warn)", bg: "rgba(217,119,6,0.10)" },
  info: { color: "var(--status-info)", bg: "rgba(37,99,235,0.10)" },
  danger: { color: "var(--status-bad)", bg: "rgba(220,38,38,0.10)" },
};

const GROUP_STYLE = {
  G1: { color: "var(--color-primary)", bg: "rgba(0,44,95,0.10)" },
  G2: { color: "var(--color-brick-red)", bg: "rgba(176,58,46,0.10)" },
  G3: { color: "var(--color-court-green)", bg: "rgba(31,77,58,0.10)" },
};

function LicenseesMatrix() {
  const { t } = useLang();
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="flex items-center justify-between" style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-hairline)" }}>
        <div>
          <div className="t-label">{t.console.matrix_label}</div>
          <h2 className="h-tagline mt-1">{t.console.matrix_title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">{t.console.matrix_filter}</button>
          <button className="btn btn-ghost btn-sm">{t.console.matrix_export}</button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 920 }}>
          <thead>
            <tr style={{ background: "var(--color-canvas-soft)" }}>
              <Th>{t.console.th_licensee}</Th>
              <Th>{t.console.th_group}</Th>
              <Th>{t.console.th_region}</Th>
              <Th align="right">{t.console.th_revenue}</Th>
              <Th align="right">{t.console.th_minimum}</Th>
              <Th align="right">{t.console.th_compliance}</Th>
              <Th>{t.console.th_status}</Th>
              <Th align="right" />
            </tr>
          </thead>
          <tbody>
            {LICENSEES.map((l) => (
              <tr key={l.name} style={{ borderTop: "1px solid var(--color-divider-soft)" }}>
                <td style={{ padding: "14px 24px" }}>
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: GROUP_STYLE[l.group].bg,
                        color: GROUP_STYLE[l.group].color,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {l.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</div>
                      <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                        STE-{l.name.slice(0, 3).toUpperCase()}-26
                      </div>
                    </div>
                  </div>
                </td>
                <Td>
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
                </Td>
                <Td>
                  <div style={{ fontSize: 12, color: "var(--color-ink-muted-80)" }}>{l.region}</div>
                  <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                    {l.category}
                  </div>
                </Td>
                <Td align="right">
                  <span className="t-tabular" style={{ fontSize: 13, fontWeight: 600 }}>{l.revenue}</span>
                </Td>
                <Td align="right">
                  <span
                    className="t-tabular"
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: l.minimum >= 100 ? "var(--status-ok)" : l.minimum >= 50 ? "var(--status-warn)" : l.minimum > 0 ? "var(--status-bad)" : "var(--color-ink-muted-48)",
                    }}
                  >
                    {l.minimum > 0 ? `${l.minimum}%` : "—"}
                  </span>
                </Td>
                <Td align="right">
                  <ComplianceBar value={l.compliance} />
                </Td>
                <Td>
                  <span
                    className="pill"
                    style={{
                      color: STATUS_STYLE[l.statusKind].color,
                      background: STATUS_STYLE[l.statusKind].bg,
                      borderColor: "transparent",
                    }}
                  >
                    <span className="pill-dot" />
                    {l.status}
                  </span>
                </Td>
                <Td align="right">
                  <button className="btn btn-ghost btn-sm">{t.common.open}</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, align }: { children?: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      style={{
        padding: "12px 24px",
        textAlign: align === "right" ? "right" : "left",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--color-ink-muted-48)",
        background: "transparent",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td
      style={{
        padding: "14px 24px",
        textAlign: align === "right" ? "right" : "left",
        fontSize: 13,
      }}
    >
      {children}
    </td>
  );
}

function ComplianceBar({ value }: { value: number }) {
  const color =
    value >= 85 ? "var(--status-ok)" : value >= 70 ? "var(--status-warn)" : "var(--status-bad)";
  return (
    <div className="flex items-center gap-2 justify-end">
      <span
        className="t-tabular"
        style={{ fontSize: 12, fontWeight: 700, color, minWidth: 28, textAlign: "right" }}
      >
        {value}
      </span>
      <span
        style={{
          width: 60,
          height: 5,
          background: "var(--color-hairline)",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: 9999,
          }}
        />
      </span>
    </div>
  );
}

/* ============================================================
 * Revenue Chart (small bar chart)
 * ============================================================ */
function RevenueChart() {
  const { t } = useLang();
  const data = [
    { m: "23F", v: 0.66 },
    { m: "23S", v: 1.81 },
    { m: "24F", v: 2.11 },
    { m: "24S", v: 6.54 },
    { m: "25F", v: 2.56 },
    { m: "25S", v: 4.72 },
    { m: "26F", v: 0 },
    { m: "26S", v: 1.05 },
  ];
  const max = Math.max(...data.map((d) => d.v));

  return (
    <div className="card lg:col-span-2" style={{ padding: 24 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="t-label">{t.console.revenue_label}</div>
          <h2 className="h-tagline mt-1">{t.console.revenue_title}</h2>
          <p className="t-caption mt-0.5" style={{ color: "var(--color-ink-muted-48)" }}>
            {t.console.revenue_subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span style={{ width: 8, height: 8, background: "var(--color-primary)", borderRadius: 2 }} />
          <span style={{ color: "var(--color-ink-muted-48)" }}>Revenue (억원)</span>
        </div>
      </div>

      <div className="flex items-end gap-2" style={{ height: 180, padding: "8px 0" }}>
        {data.map((d) => (
          <div key={d.m} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full flex items-end" style={{ height: 140 }}>
              <div
                style={{
                  width: "100%",
                  height: max > 0 ? `${(d.v / max) * 100}%` : "2%",
                  background:
                    d.v === 0
                      ? "var(--color-hairline)"
                      : "linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-soft) 100%)",
                  borderRadius: "4px 4px 0 0",
                  position: "relative",
                  transition: "height 600ms ease",
                }}
              >
                {d.v > 0 && (
                  <span
                    className="t-tabular"
                    style={{
                      position: "absolute",
                      top: -18,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--color-ink)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.v.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <span
              className="t-mono"
              style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
            >
              {d.m}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * Activity Feed
 * ============================================================ */
function ActivityFeed() {
  const { t } = useLang();
  const events = [
    { type: "review", icon: "AI", actor: "ATELIER ONE", verb: "completed inspection", target: "SF-26FW-AP-0042", verdict: "C", time: "2분 전", color: "var(--color-primary)" },
    { type: "royalty", icon: "$", actor: "Benjamin", verb: "submitted Q1 royalty", target: "€ 14,200", time: "47분 전", color: "var(--color-accent-gold)" },
    { type: "design", icon: "✎", actor: "BDS", verb: "uploaded 12 designs", target: "26FW Apparel", time: "2시간 전", color: "var(--color-court-green)" },
    { type: "contract", icon: "§", actor: "권은희 차장", verb: "renewed contract draft", target: "Benjamin · 5+5y", time: "어제", color: "var(--color-accent-red)" },
    { type: "review", icon: "AI", actor: "ATELIER ONE", verb: "flagged P5 violation", target: "BD-26FW-AP-0011", time: "어제", color: "var(--color-primary)" },
  ];

  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="t-label">{t.console.activity_label}</div>
          <h2 className="h-tagline mt-1">{t.console.activity_title}</h2>
        </div>
        <button className="btn btn-ghost btn-sm">{t.console.activity_all}</button>
      </div>

      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: e.color,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {e.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                <span style={{ fontWeight: 700 }}>{e.actor}</span>
                <span style={{ color: "var(--color-ink-muted-80)" }}> {e.verb} </span>
                <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>{e.target}</span>
                {e.verdict && (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#fff",
                      background: "var(--grade-b)",
                      padding: "1px 5px",
                      borderRadius: 4,
                    }}
                  >
                    {e.verdict}
                  </span>
                )}
              </div>
              <div className="t-mono mt-0.5" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                {e.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
