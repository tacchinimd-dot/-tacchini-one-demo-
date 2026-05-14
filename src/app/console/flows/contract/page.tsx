"use client";

/* ============================================================
 * Flow D · Contract Lifecycle · Renewal
 *
 * 5 Steps:
 *   1. Trigger      — D-180 자동 알림
 *   2. AI Insight   — 갱신 협상 인사이트 생성
 *   3. Decision     — Brand Director 의사결정
 *   4. Negotiation  — F&F ↔ Licensee thread (versioned)
 *   5. Renewed      — 신계약 발효 + 히스토리 보존
 * ============================================================ */

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { CONTRACT_DEMO } from "@/lib/flow-data";

type StepId = "trigger" | "insight" | "decision" | "negotiation" | "renewed";
const STEPS: StepId[] = ["trigger", "insight", "decision", "negotiation", "renewed"];

export default function FlowDRoute() {
  return (
    <LoginGate>
      <FlowD />
    </LoginGate>
  );
}

function FlowD() {
  const { t } = useLang();
  const [step, setStep] = useState<StepId>("trigger");
  const idx = STEPS.indexOf(step);

  const labels = [
    t.flows.d.step1,
    t.flows.d.step2,
    t.flows.d.step3,
    t.flows.d.step4,
    t.flows.d.step5,
  ];

  return (
    <div className="console-shell">
      <Sidebar active="contracts" />
      <div className="console-main">
        <FlowHeader
          breadcrumb={t.flows.d.breadcrumb}
          title={t.flows.d.header_title}
          subtitle={t.flows.d.header_subtitle}
          accent="var(--color-accent-red)"
          live={t.flows.d.live_prototype}
          onReset={() => setStep("trigger")}
        />
        <div className="console-pad space-y-6">
          <StepRail steps={labels} activeIndex={idx} accent="var(--color-accent-red)" />

          {step === "trigger" && <Step1Trigger onNext={() => setStep("insight")} />}
          {step === "insight" && <Step2Insight onDone={() => setStep("decision")} />}
          {step === "decision" && <Step3Decision onRenew={() => setStep("negotiation")} />}
          {step === "negotiation" && <Step4Negotiation onFinalize={() => setStep("renewed")} />}
          {step === "renewed" && <Step5Renewed />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 1 — Trigger */
/* ============================================================ */
function Step1Trigger({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  const c = CONTRACT_DEMO;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="t-label">{t.flows.d.s1_label}</div>
        <h2 className="h-tagline mt-1">{t.flows.d.s1_title}</h2>
        <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6, lineHeight: 1.55 }}>
          {t.flows.d.s1_body}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card" style={{ padding: 24 }}>
          <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.d.s1_licensee_card}</div>
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "var(--color-accent-red)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              BB
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{c.licensee}</div>
              <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                {c.contract_no}
              </div>
            </div>
            <span
              className="pill ml-auto"
              style={{
                background: "rgba(217,119,6,0.10)",
                color: "var(--status-warn)",
                borderColor: "transparent",
                fontSize: 11,
              }}
            >
              <span className="pill-dot" /> {t.flows.d.s1_expiring}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <MetaField label={t.flows.d.s1_period} value={c.period} mono />
            <MetaField label={t.flows.d.s1_region} value={c.region} />
            <MetaField label={t.flows.d.s1_category} value={c.category} />
            <MetaField label={t.flows.d.s1_status} value={c.status_label} accent="var(--status-warn)" />
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.d.s1_alert_log}</div>
          <ul className="space-y-2.5">
            {c.alerts.map((a) => (
              <li
                key={a.d}
                className="flex items-center justify-between"
                style={{
                  padding: "10px 12px",
                  background: a.sent ? "rgba(22,163,74,0.06)" : "var(--color-canvas-soft)",
                  border: `1px solid ${a.sent ? "rgba(22,163,74,0.20)" : "var(--color-hairline)"}`,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>D-{a.d}</div>
                  <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                    {a.label}
                  </div>
                </div>
                <span
                  className="t-mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: a.sent ? "var(--status-ok)" : "var(--color-ink-muted-48)",
                    background: a.sent ? "rgba(22,163,74,0.10)" : "transparent",
                    border: a.sent ? "none" : "1px solid var(--color-hairline)",
                    padding: "2px 8px",
                    borderRadius: 9999,
                  }}
                >
                  {a.sent ? `✓ ${t.flows.d.s1_alert_sent} · ${a.date}` : t.flows.d.s1_alert_pending}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={onNext} className="btn btn-primary">
          {t.flows.d.s1_run_ai}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 2 — AI Insight */
/* ============================================================ */
function Step2Insight({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const phases = [
    t.flows.d.s2_phase1,
    t.flows.d.s2_phase2,
    t.flows.d.s2_phase3,
    t.flows.d.s2_phase4,
    t.flows.d.s2_phase5,
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
      <div className="t-label">{t.flows.d.s2_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.d.s2_title}</h2>

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
                      ? "var(--color-accent-red)"
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
/* Step 3 — Decision */
/* ============================================================ */
function Step3Decision({ onRenew }: { onRenew: () => void }) {
  const { t } = useLang();
  const c = CONTRACT_DEMO;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="t-label">{t.flows.d.s3_label}</div>
        <h2 className="h-tagline mt-1">{t.flows.d.s3_title}</h2>

        <div className="mt-5">
          <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.d.s3_perf_label}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <PerfCard label={t.flows.d.s3_perf_min} value={`${c.performance.cumulative_minimum_pct}%`} good={c.performance.cumulative_minimum_pct >= 100} />
            <PerfCard label={t.flows.d.s3_perf_growth} value={`+${c.performance.annual_growth_pct}%`} good={c.performance.annual_growth_pct >= 10} />
            <PerfCard label={t.flows.d.s3_perf_compliance} value={`${c.performance.design_compliance_pct}%`} good={c.performance.design_compliance_pct >= 80} />
            <PerfCard label={t.flows.d.s3_perf_punctuality} value={`${c.performance.deadline_punctuality_pct}%`} good={c.performance.deadline_punctuality_pct >= 80} />
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          padding: 24,
          background: "linear-gradient(135deg, rgba(0,44,95,0.04), rgba(228,0,43,0.04))",
          borderTop: "3px solid var(--color-accent-red)",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div className="t-label" style={{ marginBottom: 0 }}>{t.flows.d.s3_ai_panel}</div>
          <span
            className="pill"
            style={{
              background: "rgba(22,163,74,0.10)",
              color: "var(--status-ok)",
              borderColor: "transparent",
              fontSize: 11,
            }}
          >
            <span className="pill-dot" /> {t.flows.d.s3_ai_recommend}
          </span>
        </div>

        <p style={{ fontSize: 13, color: "var(--color-ink)", lineHeight: 1.6 }}>
          {t.flows.d.s3_ai_reasoning}
        </p>

        <div className="mt-5">
          <div className="t-label" style={{ marginBottom: 8 }}>{t.flows.d.s3_ai_proposal}</div>
          <ul className="space-y-2">
            <CheckLine label={t.flows.d.s3_proposal_term} />
            <CheckLine label={t.flows.d.s3_proposal_royalty} />
            <CheckLine label={t.flows.d.s3_proposal_min} />
            <CheckLine label={t.flows.d.s3_proposal_brand} />
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="t-label" style={{ marginBottom: 10 }}>{t.flows.d.s3_decision_label}</div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onRenew} className="btn btn-primary">
            {t.flows.d.s3_decision_renew}
          </button>
          <button className="btn btn-ghost">{t.flows.d.s3_decision_conditional}</button>
          <button
            className="btn btn-ghost"
            style={{ color: "var(--status-bad)", borderColor: "rgba(220,38,38,0.30)" }}
          >
            {t.flows.d.s3_decision_terminate}
          </button>
        </div>
      </div>
    </div>
  );
}

function PerfCard({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "var(--color-canvas-soft)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="t-label" style={{ marginBottom: 4 }}>{label}</div>
      <div
        className="t-tabular"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: good ? "var(--status-ok)" : "var(--status-warn)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 4 — Negotiation Thread */
/* ============================================================ */
function Step4Negotiation({ onFinalize }: { onFinalize: () => void }) {
  const { t } = useLang();
  const c = CONTRACT_DEMO;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 24 }}>
        <div className="t-label">{t.flows.d.s4_label}</div>
        <h2 className="h-tagline mt-1">{t.flows.d.s4_title}</h2>
        <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
          {t.flows.d.s4_body}
        </p>
      </div>

      <div className="space-y-3">
        {c.negotiation_thread.map((msg) => (
          <div
            key={msg.id}
            className="card"
            style={{
              padding: 18,
              borderLeft: `3px solid ${
                msg.tone === "agreed"
                  ? "var(--status-ok)"
                  : msg.from === "F&F"
                  ? "var(--color-primary)"
                  : "var(--color-accent-red)"
              }`,
              background:
                msg.tone === "agreed"
                  ? "rgba(22,163,74,0.04)"
                  : msg.from === "F&F"
                  ? "rgba(0,44,95,0.03)"
                  : "rgba(228,0,43,0.03)",
            }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 9999,
                    background:
                      msg.tone === "agreed"
                        ? "var(--status-ok)"
                        : msg.from === "F&F"
                        ? "var(--color-primary)"
                        : "var(--color-accent-red)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {msg.tone === "agreed" ? "✓" : msg.from.slice(0, 2)}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{msg.version}</span>
              </div>
              <span
                className="t-mono"
                style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
              >
                {msg.timestamp}
              </span>
            </div>
            <div style={{ fontSize: 13, color: "var(--color-ink)", lineHeight: 1.55 }}>
              {msg.body}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={onFinalize} className="btn btn-primary">
          {t.flows.d.s4_finalize}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 5 — Renewed */
/* ============================================================ */
function Step5Renewed() {
  const { t } = useLang();
  const nc = CONTRACT_DEMO.new_contract;
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="t-label">{t.flows.d.s5_label}</div>
            <h2 className="h-tagline mt-1">{t.flows.d.s5_title}</h2>
            <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6, lineHeight: 1.55 }}>
              {t.flows.d.s5_body}
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
            <span className="pill-dot" /> {t.flows.d.s5_done}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <MetaField label="Contract No." value={nc.contract_no} mono />
          <MetaField label={t.flows.d.s5_new_term} value={nc.period} />
          <MetaField label={t.flows.d.s5_new_royalty} value={`${nc.royalty_pct}%`} accent="var(--color-accent-gold)" />
          <MetaField label={t.flows.d.s5_new_min} value={`€ ${nc.annual_minimum_eur.toLocaleString()}`} accent="var(--color-accent-gold)" />
          <MetaField label={t.flows.d.s5_new_signed} value={nc.signed_date} />
          <MetaField label={t.flows.d.s5_signed_by} value={t.flows.d.s5_signed_by_value} />
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <ul className="space-y-2.5">
          <CheckLine
            label={`${t.flows.d.s5_history_preserved.replace("12", String(nc.history_count.messages)).replace("3", String(nc.history_count.versions))}`}
          />
          <CheckLine label={t.flows.d.s5_audit_trail} />
        </ul>
      </div>

      <div className="flex justify-end">
        <Link href="/console" className="btn btn-ghost">
          {t.flows.back_to_console}
        </Link>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Shared bits */
/* ============================================================ */
function MetaField({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: string;
}) {
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "var(--color-canvas-soft)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="t-label" style={{ marginBottom: 4 }}>{label}</div>
      <div
        className={mono ? "t-mono" : ""}
        style={{
          fontSize: mono ? 12 : 13.5,
          fontWeight: 700,
          color: accent || "var(--color-ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function CheckLine({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2.5" style={{ fontSize: 13 }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 9999,
          background: "var(--status-ok)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 800,
        }}
      >
        ✓
      </span>
      <span>{label}</span>
    </li>
  );
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
