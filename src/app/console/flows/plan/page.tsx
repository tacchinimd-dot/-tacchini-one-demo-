"use client";

/* ============================================================
 * Flow C · Season Plan Submission · Approval
 *
 * 5 Steps:
 *   1. 3-C Brief    — 시즌 매출/카테고리/SKU 입력
 *   2. AI Review    — 자동 검토 (Min·카테고리·SKU·Tier)
 *   3. F&F Approve  — Brand Director 승인 → Phase 2 unlock
 *   4. 3-A + 3-B    — Marketing · Distribution 병렬 실행
 *   5. Plan Live    — 시즌 계획 등록 + Q1 추적 시작
 * ============================================================ */

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { PLAN_DEMO } from "@/lib/flow-data";

type StepId = "brief" | "review" | "approve" | "parallel" | "live";
const STEPS: StepId[] = ["brief", "review", "approve", "parallel", "live"];

export default function FlowCRoute() {
  return (
    <LoginGate>
      <FlowC />
    </LoginGate>
  );
}

function FlowC() {
  const { t } = useLang();
  const [step, setStep] = useState<StepId>("brief");
  const idx = STEPS.indexOf(step);

  const labels = [
    t.flows.c.step1,
    t.flows.c.step2,
    t.flows.c.step3,
    t.flows.c.step4,
    t.flows.c.step5,
  ];

  return (
    <div className="console-shell">
      <Sidebar active="dashboard" />
      <div className="console-main">
        <FlowHeader
          breadcrumb={t.flows.c.breadcrumb}
          title={t.flows.c.header_title}
          subtitle={t.flows.c.header_subtitle}
          accent="var(--color-court-green)"
          live={t.flows.c.live_prototype}
          onReset={() => setStep("brief")}
        />
        <div className="console-pad space-y-6">
          <StepRail steps={labels} activeIndex={idx} accent="var(--color-court-green)" />

          {step === "brief" && <Step1Brief onNext={() => setStep("review")} />}
          {step === "review" && <Step2Review onDone={() => setStep("approve")} />}
          {step === "approve" && <Step3Approve onApprove={() => setStep("parallel")} />}
          {step === "parallel" && <Step4Parallel onContinue={() => setStep("live")} />}
          {step === "live" && <Step5Live />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 1 — 3-C Brief */
/* ============================================================ */
function Step1Brief({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  const tc = PLAN_DEMO.three_c;
  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="t-label">{t.flows.c.s1_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.c.s1_title}</h2>
      <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6, lineHeight: 1.55 }}>
        {t.flows.c.s1_body}
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <Stat label={t.flows.c.s1_total_revenue} value={fmtEur(tc.total_revenue_eur)} accent="var(--color-court-green)" />
        <Stat
          label={t.flows.c.s1_minimum}
          value={`${tc.minimum_pct}%`}
          accent={tc.minimum_pct >= 105 ? "var(--status-ok)" : "var(--status-warn)"}
        />
        <Stat label={t.flows.c.s1_sku_count} value={`${tc.sku_count}`} />
      </div>

      <div className="mt-6">
        <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.c.s1_categories}</div>
        <div className="space-y-2">
          {tc.categories.map((c) => (
            <div key={c.id} className="flex items-center gap-3">
              <span style={{ fontSize: 12.5, fontWeight: 600, width: 160 }}>{c.label}</span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: "var(--color-hairline)",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${c.share_pct}%`,
                    height: "100%",
                    background: "var(--color-court-green)",
                    borderRadius: 9999,
                  }}
                />
              </div>
              <span className="t-tabular" style={{ fontSize: 12, fontWeight: 700, width: 40, textAlign: "right" }}>
                {c.share_pct}%
              </span>
              <span className="t-tabular" style={{ fontSize: 11, color: "var(--color-ink-muted-48)", width: 90, textAlign: "right" }}>
                {fmtEur(c.revenue_eur)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.c.s1_price_tier}</div>
        <div className="flex gap-2" style={{ height: 32, borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <TierBlock label={t.flows.c.s1_entry} pct={tc.price_tier.entry_pct} color="#94a3b8" />
          <TierBlock label={t.flows.c.s1_mid} pct={tc.price_tier.mid_pct} color="var(--color-primary)" />
          <TierBlock label={t.flows.c.s1_premium} pct={tc.price_tier.premium_pct} color="var(--color-accent-gold)" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={onNext} className="btn btn-primary">
          {t.flows.c.s1_submit_3c}
        </button>
      </div>
    </div>
  );
}

function TierBlock({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div
      style={{
        flex: pct,
        background: color,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {label} {pct}%
    </div>
  );
}

/* ============================================================ */
/* Step 2 — AI Review */
/* ============================================================ */
function Step2Review({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const phases = [
    t.flows.c.s2_phase1,
    t.flows.c.s2_phase2,
    t.flows.c.s2_phase3,
    t.flows.c.s2_phase4,
    t.flows.c.s2_phase5,
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= phases.length) {
      const id = setTimeout(onDone, 600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setActive((a) => a + 1), 700);
    return () => clearTimeout(id);
  }, [active, phases.length, onDone]);

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="t-label">{t.flows.c.s2_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.c.s2_title}</h2>

      <ul className="mt-6 space-y-3">
        {phases.map((p, i) => {
          const status = i < active ? "done" : i === active ? "running" : "pending";
          return (
            <li key={p} className="flex items-center gap-3">
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 9999,
                  background:
                    status === "done"
                      ? "var(--status-ok)"
                      : status === "running"
                      ? "var(--color-court-green)"
                      : "var(--color-hairline)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {status === "done" ? "✓" : status === "running" ? "…" : ""}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: status === "pending" ? "var(--color-ink-muted-48)" : "var(--color-ink)",
                  fontWeight: status === "running" ? 600 : 500,
                }}
              >
                {p}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ============================================================ */
/* Step 3 — F&F Approve */
/* ============================================================ */
function Step3Approve({ onApprove }: { onApprove: () => void }) {
  const { t } = useLang();
  const ai = PLAN_DEMO.ai_review;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="t-label">{t.flows.c.s3_label}</div>
            <h2 className="h-tagline mt-1">{t.flows.c.s3_title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="t-label" style={{ marginBottom: 0 }}>{t.flows.c.s3_ai_recommend}</div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "var(--color-court-green)",
              }}
            >
              {ai.score_overall}
            </span>
            <span
              className="pill"
              style={{
                background: "rgba(31,77,58,0.12)",
                color: "var(--color-court-green)",
                borderColor: "transparent",
              }}
            >
              <span className="pill-dot" /> {t.flows.c.s3_ai_signal_strong}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.c.s3_signals}</div>
          <ul className="space-y-2.5">
            {ai.signals.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5" style={{ fontSize: 13 }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 9999,
                    background:
                      s.kind === "strong"
                        ? "var(--status-ok)"
                        : s.kind === "ok"
                        ? "var(--color-primary)"
                        : "var(--color-accent-gold)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.c.s3_decision_panel}</div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onApprove} className="btn btn-primary">
            {t.flows.c.s3_approve}
          </button>
          <button className="btn btn-ghost">{t.flows.c.s3_revise}</button>
          <button
            className="btn btn-ghost"
            style={{ color: "var(--status-bad)", borderColor: "rgba(220,38,38,0.30)" }}
          >
            {t.flows.c.s3_reject}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 4 — Parallel 3-A + 3-B */
/* ============================================================ */
function Step4Parallel({ onContinue }: { onContinue: () => void }) {
  const { t } = useLang();
  const ta = PLAN_DEMO.three_a;
  const tb = PLAN_DEMO.three_b;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 24 }}>
        <div className="t-label">{t.flows.c.s4_label}</div>
        <h2 className="h-tagline mt-1">{t.flows.c.s4_title}</h2>
        <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
          {t.flows.c.s4_body}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* 3-A Marketing */}
        <div className="card" style={{ padding: 24, borderTop: "3px solid var(--color-accent-red)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t.flows.c.s4_a_title}</h3>
            <span
              className="pill"
              style={{
                background: "rgba(22,163,74,0.10)",
                color: "var(--status-ok)",
                borderColor: "transparent",
                fontSize: 10.5,
              }}
            >
              ✓ {t.flows.c.s4_a_status}
            </span>
          </div>

          <Stat label={t.flows.c.s4_a_budget} value={fmtEur(ta.total_budget_eur)} accent="var(--color-accent-red)" />

          <div className="mt-4">
            <div className="t-label" style={{ marginBottom: 8 }}>{t.flows.c.s4_a_campaigns}</div>
            <ul className="space-y-2">
              {ta.campaigns.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between"
                  style={{
                    padding: "8px 12px",
                    background: "var(--color-canvas-soft)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 12.5,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.label}</div>
                    <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                      {c.channel}
                    </div>
                  </div>
                  <span className="t-tabular" style={{ fontWeight: 700 }}>
                    {fmtEur(c.budget_eur)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-4 t-mono"
            style={{ fontSize: 10.5, color: "var(--color-ink-muted-48)" }}
          >
            {t.flows.c.s4_a_review}
          </div>
        </div>

        {/* 3-B Distribution */}
        <div className="card" style={{ padding: 24, borderTop: "3px solid var(--color-primary)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t.flows.c.s4_b_title}</h3>
            <span
              className="pill"
              style={{
                background: "rgba(22,163,74,0.10)",
                color: "var(--status-ok)",
                borderColor: "transparent",
                fontSize: 10.5,
              }}
            >
              ✓ {t.flows.c.s4_b_status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <Stat label={t.flows.c.s4_b_tier1} value={`${tb.tiers[0].count}`} />
            <Stat label={t.flows.c.s4_b_tier2} value={`${tb.tiers[1].count}`} />
            <Stat label={t.flows.c.s4_b_tier3} value={`${tb.tiers[2].count}`} />
          </div>

          <ul className="space-y-2">
            {tb.tiers.map((tier) => (
              <li
                key={tier.tier}
                style={{
                  padding: "10px 12px",
                  background: "var(--color-canvas-soft)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{tier.label}</div>
                  <span className="t-tabular" style={{ fontSize: 12, fontWeight: 700 }}>
                    {tier.share_pct}%
                  </span>
                </div>
                <div
                  className="t-mono mt-1"
                  style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
                >
                  {tier.examples}
                </div>
              </li>
            ))}
          </ul>

          <div
            className="mt-4 t-mono"
            style={{ fontSize: 10.5, color: "var(--color-ink-muted-48)" }}
          >
            {t.flows.c.s4_b_review}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={onContinue} className="btn btn-primary">
          {t.flows.c.s4_continue}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 5 — Plan Live */
/* ============================================================ */
function Step5Live() {
  const { t } = useLang();
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="t-label">{t.flows.c.s5_label}</div>
            <h2 className="h-tagline mt-1">{t.flows.c.s5_title}</h2>
            <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
              {t.flows.c.s5_body}
            </p>
          </div>
          <span
            className="pill"
            style={{
              background: "rgba(22,163,74,0.10)",
              color: "var(--status-ok)",
              borderColor: "transparent",
              fontSize: 12,
            }}
          >
            <span className="pill-dot" /> {t.flows.c.s5_done}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <PlanCard
            title={t.flows.c.s5_card_3c}
            value={fmtEur(PLAN_DEMO.three_c.total_revenue_eur)}
            color="var(--color-court-green)"
            status={t.flows.c.s5_status_approved}
          />
          <PlanCard
            title={t.flows.c.s5_card_3a}
            value={fmtEur(PLAN_DEMO.three_a.total_budget_eur)}
            color="var(--color-accent-red)"
            status={t.flows.c.s5_status_approved}
          />
          <PlanCard
            title={t.flows.c.s5_card_3b}
            value={`${PLAN_DEMO.three_b.accounts_total} accounts`}
            color="var(--color-primary)"
            status={t.flows.c.s5_status_approved}
          />
        </div>

        <div
          className="mt-5"
          style={{
            padding: "12px 14px",
            background: "var(--color-canvas-soft)",
            border: "1px solid var(--color-hairline)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div className="t-label" style={{ marginBottom: 4 }}>{t.flows.c.s5_milestone}</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{t.flows.c.s5_milestone_q1}</div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/console" className="btn btn-ghost">
          {t.flows.back_to_console}
        </Link>
      </div>
    </div>
  );
}

function PlanCard({
  title,
  value,
  color,
  status,
}: {
  title: string;
  value: string;
  color: string;
  status: string;
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "var(--color-canvas-soft)",
        border: "1px solid var(--color-hairline)",
        borderTop: `3px solid ${color}`,
        borderRadius: "var(--radius-md)",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color }}>{title}</div>
      <div className="t-tabular mt-1" style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
      <div className="t-mono mt-1" style={{ fontSize: 10, color: "var(--status-ok)", fontWeight: 700 }}>
        ✓ {status}
      </div>
    </div>
  );
}

/* ============================================================ */
/* Shared bits (Stat + FlowHeader + StepRail) */
/* ============================================================ */
function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        padding: "12px 14px",
        background: "var(--color-canvas-soft)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="t-label" style={{ marginBottom: 4 }}>{label}</div>
      <div
        className="t-tabular"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: accent || "var(--color-ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function fmtEur(n: number) {
  return `€ ${n.toLocaleString()}`;
}

function FlowHeader({
  breadcrumb,
  title,
  subtitle,
  accent,
  live,
  onReset,
}: {
  breadcrumb: string;
  title: string;
  subtitle: string;
  accent: string;
  live: string;
  onReset: () => void;
}) {
  const { t } = useLang();
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "color-mix(in oklab, var(--color-app-bg) 85%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        className="flex items-center justify-between px-8 py-2 t-mono"
        style={{
          fontSize: 11,
          color: "var(--color-ink-muted-48)",
          borderBottom: "1px solid var(--color-divider-soft)",
        }}
      >
        <div className="flex items-center gap-2">
          <Link href="/console" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">
            {t.console.breadcrumb_dashboard}
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--color-ink)" }}>{breadcrumb}</span>
        </div>
        <span
          className="t-mono"
          style={{
            fontSize: 9.5,
            fontWeight: 800,
            background: accent,
            color: "#fff",
            padding: "2px 8px",
            borderRadius: 9999,
            letterSpacing: 0.5,
          }}
        >
          ● {live}
        </span>
      </div>

      <div className="flex items-center justify-between px-8 py-4 gap-4">
        <div>
          <h1 className="h-display-md" style={{ marginTop: 0 }}>{title}</h1>
          <p className="mt-1" style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}>
            {subtitle}
          </p>
        </div>
        <button onClick={onReset} className="btn btn-ghost btn-sm">
          {t.flows.reset_flow}
        </button>
      </div>
    </header>
  );
}

function StepRail({
  steps,
  activeIndex,
  accent,
}: {
  steps: string[];
  activeIndex: number;
  accent: string;
}) {
  return (
    <div
      className="card flex items-center"
      style={{ padding: "14px 20px", overflowX: "auto", gap: 8 }}
    >
      {steps.map((s, i) => {
        const status = i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
        return (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 9999,
                background:
                  status === "done"
                    ? "var(--status-ok)"
                    : status === "active"
                    ? accent
                    : "var(--color-hairline-strong)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {status === "done" ? "✓" : i + 1}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: status === "active" ? 700 : 500,
                color:
                  status === "pending"
                    ? "var(--color-ink-muted-48)"
                    : status === "active"
                    ? accent
                    : "var(--color-ink)",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span
                style={{
                  width: 18,
                  height: 1,
                  background: "var(--color-hairline-strong)",
                  marginLeft: 4,
                  marginRight: 4,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
