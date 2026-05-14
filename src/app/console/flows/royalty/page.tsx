"use client";

/* ============================================================
 * Flow A · Sales → Royalty Settlement
 *
 * 5 Steps:
 *   1. Upload        — Sales Statement Excel 업로드
 *   2. Validate      — AI 자동 검증 (FX·SKU·Net·Royalty)
 *   3. Submit        — 검증 결과 + F&F 제출
 *   4. Dual Verify   — Reported vs AI Calculated 비교
 *   5. Invoice       — Invoice 자동 생성 + AR 등록
 * ============================================================ */

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { ROYALTY_DEMO } from "@/lib/flow-data";

type StepId = "upload" | "validate" | "submit" | "dual" | "invoice";

const STEPS: StepId[] = ["upload", "validate", "submit", "dual", "invoice"];

export default function FlowARoute() {
  return (
    <LoginGate>
      <FlowA />
    </LoginGate>
  );
}

function FlowA() {
  const { t } = useLang();
  const [step, setStep] = useState<StepId>("upload");
  const stepIndex = STEPS.indexOf(step);

  const stepLabels = [
    t.flows.a.step1,
    t.flows.a.step2,
    t.flows.a.step3,
    t.flows.a.step4,
    t.flows.a.step5,
  ];

  return (
    <div className="console-shell">
      <Sidebar active="royalty" />
      <div className="console-main">
        <FlowHeader
          breadcrumb={t.flows.a.breadcrumb}
          title={t.flows.a.header_title}
          subtitle={t.flows.a.header_subtitle}
          onReset={() => setStep("upload")}
        />
        <div className="console-pad space-y-6">
          <StepRail
            steps={stepLabels}
            activeIndex={stepIndex}
            accent="var(--color-accent-gold)"
          />

          {step === "upload" && <Step1Upload onNext={() => setStep("validate")} />}
          {step === "validate" && <Step2Validate onDone={() => setStep("submit")} />}
          {step === "submit" && <Step3Submit onSubmit={() => setStep("dual")} />}
          {step === "dual" && <Step4Dual onApprove={() => setStep("invoice")} />}
          {step === "invoice" && <Step5Invoice />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 1 — Upload */
/* ============================================================ */
function Step1Upload({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="t-label">{t.flows.a.s1_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.a.s1_title}</h2>
      <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", lineHeight: 1.55, marginTop: 8 }}>
        {t.flows.a.s1_body}
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <MetaField label={t.flows.a.s1_quarter} value={ROYALTY_DEMO.quarter} />
        <MetaField label={t.flows.a.s1_currency} value={ROYALTY_DEMO.currency} />
      </div>

      <div
        className="mt-5"
        style={{
          padding: "32px 24px",
          border: "2px dashed var(--color-hairline-strong)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-canvas-soft)",
          textAlign: "center",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-ink-muted-48)", margin: "0 auto 8px" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{t.flows.a.s1_drop_main}</div>
        <div className="t-mono mt-1" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
          {t.flows.a.s1_drop_sub}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
        <div style={{ fontSize: 12, color: "var(--color-ink-muted-80)" }}>
          {t.flows.a.s1_demo_intro}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">{t.flows.a.s1_template}</button>
          <button onClick={onNext} className="btn btn-primary">
            {t.flows.a.s1_start}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 2 — Validate (animated progress) */
/* ============================================================ */
function Step2Validate({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const phases = [
    t.flows.a.s2_phase1,
    t.flows.a.s2_phase2,
    t.flows.a.s2_phase3,
    t.flows.a.s2_phase4,
    t.flows.a.s2_phase5,
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= phases.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const id = setTimeout(() => setActive((a) => a + 1), 700);
    return () => clearTimeout(id);
  }, [active, phases.length, onDone]);

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="t-label">{t.flows.a.s2_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.a.s2_title}</h2>
      <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
        {t.flows.a.s2_subtitle(ROYALTY_DEMO.total_lines)}
      </p>

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
                      ? "var(--color-accent-gold)"
                      : "var(--color-hairline)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  flexShrink: 0,
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
/* Step 3 — Validation Result + Submit */
/* ============================================================ */
function Step3Submit({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 24 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="t-label">{t.flows.a.s3_label}</div>
            <h2 className="h-tagline mt-1">{t.flows.a.s3_title}</h2>
          </div>
          <span
            className="pill"
            style={{
              background: "rgba(22,163,74,0.10)",
              color: "var(--status-ok)",
              borderColor: "transparent",
            }}
          >
            <span className="pill-dot" /> {t.flows.a.s3_no_errors}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <Stat label={t.flows.a.s3_lines} value={`${ROYALTY_DEMO.total_lines}`} />
          <Stat label={t.flows.a.s3_gross} value={fmtEur(ROYALTY_DEMO.gross_eur)} />
          <Stat label={t.flows.a.s3_net} value={fmtEur(ROYALTY_DEMO.net_eur)} />
          <Stat label={t.flows.a.s3_royalty} value={fmtEur(ROYALTY_DEMO.royalty_eur)} accent="var(--color-accent-gold)" />
          <Stat label={t.flows.a.s3_marketing} value={fmtEur(ROYALTY_DEMO.marketing_eur)} />
          <Stat label={t.flows.a.s3_advertising} value={fmtEur(ROYALTY_DEMO.advertising_eur)} />
          <Stat label={t.flows.a.s3_errors} value="0" accent="var(--status-ok)" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card" style={{ padding: 20 }}>
          <div className="t-label" style={{ marginBottom: 10 }}>
            {t.flows.a.s3_validation_summary}
          </div>
          <ul className="space-y-2">
            {ROYALTY_DEMO.validation_checks.map((c) => (
              <li key={c.id} className="flex items-center justify-between" style={{ fontSize: 13 }}>
                <span>{c.label}</span>
                <span
                  className="t-mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: c.pass ? "var(--status-ok)" : "var(--status-bad)",
                    background: c.pass ? "rgba(22,163,74,0.10)" : "rgba(220,38,38,0.10)",
                    padding: "2px 8px",
                    borderRadius: 9999,
                  }}
                >
                  ● {c.pass ? t.flows.a.s3_check_pass : t.flows.a.s3_check_fail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="t-label" style={{ marginBottom: 10 }}>
            {t.flows.a.s3_lines_label}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "var(--color-canvas-soft)" }}>
                  <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, color: "var(--color-ink-muted-48)" }}>SKU</th>
                  <th style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, color: "var(--color-ink-muted-48)" }}>Qty</th>
                  <th style={{ padding: "8px 10px", textAlign: "right", fontSize: 10, color: "var(--color-ink-muted-48)" }}>Net €</th>
                </tr>
              </thead>
              <tbody>
                {ROYALTY_DEMO.lines.map((l) => (
                  <tr key={l.sku} style={{ borderTop: "1px solid var(--color-divider-soft)" }}>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ fontWeight: 600 }}>{l.name}</div>
                      <div className="t-mono" style={{ fontSize: 9.5, color: "var(--color-ink-muted-48)" }}>
                        {l.sku}
                      </div>
                    </td>
                    <td className="t-tabular" style={{ padding: "8px 10px", textAlign: "right" }}>
                      {l.qty.toLocaleString()}
                    </td>
                    <td className="t-tabular" style={{ padding: "8px 10px", textAlign: "right", fontWeight: 600 }}>
                      {l.net_eur.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={onSubmit} className="btn btn-primary">
          {t.flows.a.s3_submit}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 4 — Dual Verification */
/* ============================================================ */
function Step4Dual({ onApprove }: { onApprove: () => void }) {
  const { t } = useLang();
  const rows: Array<[keyof typeof ROYALTY_DEMO.reported, string]> = [
    ["gross", t.flows.a.s3_gross],
    ["net", t.flows.a.s3_net],
    ["royalty", t.flows.a.s3_royalty],
    ["marketing", t.flows.a.s3_marketing],
    ["advertising", t.flows.a.s3_advertising],
    ["total", "Total"],
  ];

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="t-label">{t.flows.a.s4_label}</div>
      <h2 className="h-tagline mt-1">{t.flows.a.s4_title}</h2>
      <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
        {t.flows.a.s4_body}
      </p>

      <div className="mt-5">
        <div className="t-label" style={{ marginBottom: 10 }}>
          {t.flows.a.s4_compare_title}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--color-canvas-soft)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 10.5, color: "var(--color-ink-muted-48)" }}>
                  Item
                </th>
                <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 10.5, color: "var(--color-ink-muted-48)" }}>
                  {t.flows.a.s4_reported}
                </th>
                <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 10.5, color: "var(--color-ink-muted-48)" }}>
                  {t.flows.a.s4_calculated}
                </th>
                <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 10.5, color: "var(--color-ink-muted-48)" }}>
                  {t.flows.a.s4_diff}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([key, label]) => {
                const r = ROYALTY_DEMO.reported[key];
                const c = ROYALTY_DEMO.calculated[key];
                const diff = r - c;
                return (
                  <tr key={key} style={{ borderTop: "1px solid var(--color-divider-soft)" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600 }}>{label}</td>
                    <td className="t-tabular" style={{ padding: "10px 14px", textAlign: "right" }}>
                      {fmtEur(r)}
                    </td>
                    <td className="t-tabular" style={{ padding: "10px 14px", textAlign: "right" }}>
                      {fmtEur(c)}
                    </td>
                    <td
                      className="t-tabular"
                      style={{
                        padding: "10px 14px",
                        textAlign: "right",
                        fontWeight: 700,
                        color: diff === 0 ? "var(--status-ok)" : "var(--status-bad)",
                      }}
                    >
                      {diff === 0 ? "—" : fmtEur(diff)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className="mt-4 flex items-center gap-2"
          style={{
            padding: "10px 14px",
            background: "rgba(22,163,74,0.08)",
            border: "1px solid rgba(22,163,74,0.20)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <span style={{ color: "var(--status-ok)", fontWeight: 800 }}>✓</span>
          <span style={{ fontSize: 12.5, color: "var(--status-ok)", fontWeight: 600 }}>
            {t.flows.a.s4_within_tolerance}
          </span>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={onApprove} className="btn btn-primary">
            {t.flows.a.s4_approve}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Step 5 — Invoice */
/* ============================================================ */
function Step5Invoice() {
  const { t } = useLang();
  return (
    <div className="space-y-4">
      <div className="card" style={{ padding: 28 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="t-label">{t.flows.a.s5_label}</div>
            <h2 className="h-tagline mt-1">{t.flows.a.s5_title}</h2>
            <p style={{ fontSize: 13, color: "var(--color-ink-muted-80)", marginTop: 6 }}>
              {t.flows.a.s5_body}
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
            <span className="pill-dot" /> {t.flows.a.s5_done}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <MetaField label={t.flows.a.s5_invoice_no} value={ROYALTY_DEMO.invoice.no} mono />
          <MetaField label={t.flows.a.s5_total} value={fmtEur(ROYALTY_DEMO.total_invoice_eur)} accent />
          <MetaField label={t.flows.a.s5_issue_date} value={ROYALTY_DEMO.invoice.issue_date} />
          <MetaField label={t.flows.a.s5_due_date} value={ROYALTY_DEMO.invoice.due_date} />
        </div>

        <div className="mt-4">
          <div className="t-label" style={{ marginBottom: 6 }}>{t.flows.a.s5_recipient}</div>
          <div style={{ fontSize: 12.5, color: "var(--color-ink)" }}>
            {ROYALTY_DEMO.invoice.recipient}
          </div>
        </div>

        <div className="mt-5">
          <div className="t-label" style={{ marginBottom: 8 }}>{t.flows.a.s5_breakdown}</div>
          <div className="grid sm:grid-cols-3 gap-2">
            <Stat label={t.flows.a.s3_royalty} value={fmtEur(ROYALTY_DEMO.royalty_eur)} accent="var(--color-accent-gold)" />
            <Stat label={t.flows.a.s3_marketing} value={fmtEur(ROYALTY_DEMO.marketing_eur)} />
            <Stat label={t.flows.a.s3_advertising} value={fmtEur(ROYALTY_DEMO.advertising_eur)} />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <ul className="space-y-2.5">
          <CheckLine label={t.flows.a.s5_ar_registered} />
          <CheckLine label={t.flows.a.s5_payment_tracking} />
          <CheckLine label={t.flows.a.s5_history_preserved} />
        </ul>
      </div>

      <div className="flex items-center justify-end gap-2">
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
  accent?: boolean;
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
          fontSize: mono ? 12 : 14,
          fontWeight: 700,
          color: accent ? "var(--color-accent-gold)" : "var(--color-ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

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

function fmtEur(n: number) {
  return `€ ${n.toLocaleString()}`;
}

/* ============================================================ */
/* Header + Step Rail */
/* ============================================================ */
function FlowHeader({
  breadcrumb,
  title,
  subtitle,
  onReset,
}: {
  breadcrumb: string;
  title: string;
  subtitle: string;
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
            background: "var(--color-accent-red)",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: 9999,
            letterSpacing: 0.5,
          }}
        >
          ● {t.flows.a.live_prototype}
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
