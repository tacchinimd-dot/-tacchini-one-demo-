"use client";

/* ============================================================
 * TACCHINI ONE — Platform Open Door (/) — i18n 적용
 *
 * 플랫폼 첫 화면. 콘솔이 아니라 "Mission Control / Workspace Selector":
 *   · 풀스크린 다크 hero (ST Navy 그라데이션 + 라파챠 심볼 halo)
 *   · 워드마크 + 시즌·날짜·사용자 컨텍스트
 *   · 6개 모듈 진입 카드 (Operations / Atelier / Royalty / Calendar / Contracts / Brand Codex)
 *   · 빠른 액션 (최근 검수, 알림)
 *   · 우측 상단 한·영 토글
 * ============================================================ */

import Link from "next/link";
import TacchiniSymbol from "@/components/brand/TacchiniSymbol";
import ModuleCard from "@/components/door/ModuleCard";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLang } from "@/lib/i18n/LanguageProvider";

export default function PlatformDoor() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top right, #0a4585 0%, transparent 50%), radial-gradient(ellipse at bottom left, #2a1a3a 0%, transparent 55%), linear-gradient(180deg, #001428 0%, #001a3a 50%, #000814 100%)",
        color: "#fff",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 hero-grid pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          right: "-8%",
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(228, 0, 43, 0.16), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%",
          left: "-10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(201, 154, 58, 0.13), transparent 70%)",
        }}
      />

      <div className="relative">
        <DoorHeader />
        <DoorHero />
        <DoorModules />
        <DoorFooter />
      </div>
    </div>
  );
}

/* ============================================================
 * Header — sticky transparent strip with language toggle
 * ============================================================ */
function DoorHeader() {
  const { t, lang } = useLang();

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md"
      style={{
        background: "rgba(0, 8, 20, 0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        height: 56,
      }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "var(--color-cream-white)",
            }}
          >
            <TacchiniSymbol size={18} color="currentColor" />
          </span>
          <div className="flex flex-col leading-tight">
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.4 }}>
              TACCHINI <span style={{ opacity: 0.85 }}>ONE</span>
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "rgba(255,255,255,0.42)",
                letterSpacing: 1.5,
              }}
            >
              {t.door.header_brand_subtitle}
            </span>
          </div>
        </div>

        <div
          className="hidden md:flex items-center gap-4 t-mono"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}
        >
          <span>
            {lang === "ko"
              ? `${t.common.friday}, ${t.common.may} 8 · ${t.common.year}`
              : `Friday, ${t.common.may} 8 · ${t.common.year}`}
          </span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.10)" }} />
          <span>26FW · D-180</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.10)" }} />
          <span style={{ color: "#4ade80" }}>● {t.common.all_systems}</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle variant="dark" />

          <button
            className="inline-flex items-center gap-2 px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.62)",
              fontSize: 12,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden sm:inline">{t.door.quick_search}</span>
            <span
              className="t-mono"
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              ⌘K
            </span>
          </button>

          <div
            className="flex items-center gap-2.5 pl-3"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                background: "linear-gradient(135deg, #5b8fd1, #002C5F)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              {lang === "ko" ? "권" : "EK"}
            </div>
            <div className="hidden lg:flex flex-col leading-tight">
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                {lang === "ko" ? "권은희 차장" : "Eunhee Kwon"}
              </span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
                F&amp;F · {lang === "ko" ? "ST사업부" : "ST Business"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * Hero
 * ============================================================ */
function DoorHero() {
  const { t, lang } = useLang();

  return (
    <section className="relative mx-auto max-w-[1440px] px-8 pt-16 pb-12">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.62)",
              padding: "5px 12px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
              }}
            />
            {t.door.welcome} · {lang === "ko" ? "권은희 차장" : "Eunhee Kwon"}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -0.025 * 56,
              color: "#fff",
            }}
          >
            {t.door.hero_line1}
            <br />
            {t.door.hero_line2}
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-red), var(--color-accent-gold), var(--color-cream-white))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.door.hero_line3}
            </span>
          </h1>

          <p
            className="mt-6 whitespace-pre-line"
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 560,
            }}
          >
            {t.door.hero_body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Pill icon="◉" label={t.door.pill_active_licensees} />
            <Pill icon="◐" label={t.door.pill_awaiting} emphasize />
            <Pill icon="↗" label={t.door.pill_q1_royalty} />
            <Pill icon="●" label={t.door.pill_season} />
          </div>
        </div>

        <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
          <span
            aria-hidden
            className="absolute"
            style={{
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(228,0,43,0.22) 0%, rgba(0,44,95,0.12) 40%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
          <span
            aria-hidden
            className="absolute"
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <span
            aria-hidden
            className="absolute"
            style={{
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />
          <span
            aria-hidden
            className="absolute"
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "1px dashed rgba(255,255,255,0.14)",
              animation: "haloRotate 60s linear infinite",
            }}
          />
          <div
            className="relative"
            style={{
              color: "var(--color-cream-white)",
              filter: "drop-shadow(0 8px 32px rgba(228, 0, 43, 0.35))",
            }}
          >
            <TacchiniSymbol size={180} color="currentColor" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, label, emphasize }: { icon: string; label: string; emphasize?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: emphasize ? "#fbbf24" : "rgba(255,255,255,0.78)",
        background: emphasize ? "rgba(251, 191, 36, 0.10)" : "rgba(255,255,255,0.04)",
        border: emphasize ? "1px solid rgba(251, 191, 36, 0.32)" : "1px solid rgba(255,255,255,0.08)",
        padding: "6px 12px",
        borderRadius: 9999,
      }}
    >
      <span style={{ fontSize: 14, opacity: emphasize ? 1 : 0.7 }}>{icon}</span>
      {label}
    </span>
  );
}

/* ============================================================
 * Modules Grid
 * ============================================================ */
function DoorModules() {
  const { t } = useLang();

  return (
    <section className="relative mx-auto max-w-[1440px] px-8 pb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="t-label" style={{ color: "rgba(255,255,255,0.42)", letterSpacing: 1.8 }}>
            {t.door.workspaces_label}
          </div>
          <h2
            className="mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: "#fff",
            }}
          >
            {t.door.workspaces_title}
          </h2>
        </div>
        <div
          className="hidden md:flex items-center gap-2 t-mono"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.42)" }}
        >
          <span>{t.door.workspaces_summary}</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 mb-5">
        <ModuleCard
          href="/console"
          code="01 · OPS"
          subtitle={t.door.mod_ops_subtitle}
          title={t.door.mod_ops_title}
          body={t.door.mod_ops_body}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
          }
          stats={[
            { label: t.door.mod_ops_stat_licensees, value: "6 · all G", accent: "ok" },
            { label: t.door.mod_ops_stat_compliance, value: "86.4", accent: "ok" },
            { label: t.door.mod_ops_stat_pending, value: t.door.mod_ops_stat_pending_v, accent: "warn" },
          ]}
          size="lg"
          status={{ label: t.common.live, kind: "live" }}
        />
        <ModuleCard
          href="/atelier/inspector"
          code="02 · AI"
          subtitle={t.door.mod_atelier_subtitle}
          title={t.door.mod_atelier_title}
          body={t.door.mod_atelier_body}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 0 0 18" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
          stats={[
            { label: t.door.mod_atelier_stat_week, value: t.door.mod_atelier_stat_week_v, accent: "info" },
            { label: t.door.mod_atelier_stat_avg, value: "B / 84pt", accent: "ok" },
            { label: t.door.mod_atelier_stat_pending, value: t.door.mod_atelier_stat_pending_v, accent: "warn" },
          ]}
          size="lg"
          status={{ label: t.common.live, kind: "live" }}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ModuleCard
          href="/console#royalty"
          code="03"
          subtitle={t.door.mod_royalty_subtitle}
          title={t.door.mod_royalty_title}
          body={t.door.mod_royalty_body}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
          stats={[
            { label: t.door.mod_royalty_stat_q1, value: "€ 1.84M", accent: "ok" },
            { label: t.door.mod_royalty_stat_pending, value: t.door.mod_royalty_stat_pending_v, accent: "warn" },
          ]}
          status={{ label: t.common.preview, kind: "preview" }}
        />
        <ModuleCard
          href="/console#calendar"
          code="04"
          subtitle={t.door.mod_calendar_subtitle}
          title={t.door.mod_calendar_title}
          body={t.door.mod_calendar_body}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          stats={[
            { label: t.door.mod_calendar_stat_progress, value: "0 / 11", accent: "muted" },
            { label: t.door.mod_calendar_stat_next, value: "D-150", accent: "info" },
          ]}
          status={{ label: t.common.preview, kind: "preview" }}
        />
        <ModuleCard
          href="/console#contracts"
          code="05"
          subtitle={t.door.mod_contracts_subtitle}
          title={t.door.mod_contracts_title}
          body={t.door.mod_contracts_body}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          }
          stats={[
            { label: t.door.mod_contracts_stat_expiring, value: t.door.mod_contracts_stat_expiring_v, accent: "warn" },
            { label: t.door.mod_contracts_stat_renewals, value: t.door.mod_contracts_stat_renewals_v, accent: "info" },
          ]}
          status={{ label: t.common.preview, kind: "preview" }}
        />
        <ModuleCard
          href="/atelier/inspector"
          code="06"
          subtitle={t.door.mod_codex_subtitle}
          title={t.door.mod_codex_title}
          body={t.door.mod_codex_body}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          }
          stats={[
            { label: t.door.mod_codex_stat_pillars, value: t.door.mod_codex_stat_pillars_v, accent: "ok" },
            { label: t.door.mod_codex_stat_annex, value: "6 / 6", accent: "ok" },
          ]}
          status={{ label: t.common.live, kind: "live" }}
        />
      </div>
    </section>
  );
}

/* ============================================================
 * Footer
 * ============================================================ */
function DoorFooter() {
  const { t, lang } = useLang();

  const recents = [
    {
      time: lang === "ko" ? "2분 전" : "2m ago",
      actor: "ATELIER ONE",
      action: t.door.activity_atelier_flagged,
      target: "SF-26FW-AP-0042 · Verdict C",
      href: "/atelier/inspector",
    },
    {
      time: lang === "ko" ? "47분 전" : "47m ago",
      actor: "Benjamin",
      action: t.door.activity_benjamin_submitted,
      target: "Q1 royalty · €14,200",
      href: "/console",
    },
    {
      time: lang === "ko" ? "2시간 전" : "2h ago",
      actor: "BDS",
      action: t.door.activity_bds_uploaded,
      target: "26FW Apparel",
      href: "/console",
    },
    {
      time: lang === "ko" ? "어제" : "Yesterday",
      actor: lang === "ko" ? "권은희 차장" : "Eunhee Kwon",
      action: t.door.activity_kwon_drafted,
      target: "Benjamin · 5+5y",
      href: "/console",
    },
  ];

  return (
    <section className="relative mx-auto max-w-[1440px] px-8 pb-16">
      <div
        className="grid gap-5 lg:grid-cols-[1.4fr_1fr]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32 }}
      >
        <div>
          <div
            className="t-label flex items-center gap-2 mb-4"
            style={{ color: "rgba(255,255,255,0.42)", letterSpacing: 1.5 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {t.door.activity_label}
          </div>
          <ul className="space-y-2">
            {recents.map((r, i) => (
              <li key={i}>
                <Link
                  href={r.href}
                  className="flex items-center gap-3 px-4 py-3 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    className="t-mono"
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", minWidth: 60 }}
                  >
                    {r.time}
                  </span>
                  <div className="flex-1 min-w-0" style={{ fontSize: 13 }}>
                    <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>{r.actor}</span>{" "}
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>{r.action}</span>{" "}
                    <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>{r.target}</span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "rgba(255,255,255,0.32)" }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div
            className="t-label flex items-center gap-2 mb-4"
            style={{ color: "rgba(255,255,255,0.42)", letterSpacing: 1.5 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            {t.door.quick_actions_label}
          </div>
          <div className="grid gap-2">
            <QuickAction
              href="/atelier/inspector"
              icon="✎"
              title={t.door.qa_inspector}
              body={t.door.qa_inspector_body}
              accent="var(--color-accent-red)"
            />
            <QuickAction
              href="/apex-report.html"
              external
              icon="📄"
              title={t.door.qa_apex}
              body={t.door.qa_apex_body}
              accent="var(--color-accent-gold)"
            />
            <QuickAction
              href="/console"
              icon="◉"
              title={t.door.qa_console}
              body={t.door.qa_console_body}
              accent="var(--color-primary-on-dark)"
            />
          </div>
        </div>
      </div>

      <div
        className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          fontSize: 11,
          color: "rgba(255,255,255,0.32)",
        }}
      >
        <span>{t.door.footer_legal}</span>
        <span className="t-mono">{t.door.footer_version}</span>
      </div>
    </section>
  );
}

function QuickAction({
  href,
  icon,
  title,
  body,
  accent,
  external,
}: {
  href: string;
  icon: string;
  title: string;
  body: string;
  accent: string;
  external?: boolean;
}) {
  const content = (
    <div
      className="flex items-center gap-3 px-4 py-3 transition-all"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${accent}22`,
          color: accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{title}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{body}</div>
      </div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        {external ? (
          <>
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </>
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}
