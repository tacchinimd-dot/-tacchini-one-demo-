"use client";

/* ============================================================
 * ATELIER ONE — Inspector Live Demo (v0.2 · SaaS 콘솔 통합)
 *
 * 6단계 워크플로우:
 *   1. Upload — 디자인 업로드
 *   2. Analyzing — 자동 검수 (1.5초)
 *   3. Verdict — 5 Pillars + 위반 + Full Report (apex_report) 링크
 *   4. Alternatives — 타키니화 대안 3안
 *   5. Codex — F&F 검수자 자연어 Q&A
 *   6. Decision — Approve / Revise / Reject + Full Report 링크
 *
 * 외곽: 메인 콘솔과 동일한 Sidebar + TopBar 레이아웃
 *   · 라이브 데모 중에도 사이드바·검색·breadcrumb 유지 → "프로덕트 안의 한 화면" 인상
 * ============================================================ */

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import {
  MOCK_SUBMISSION,
  MOCK_REPORT,
  MOCK_CODEX,
  PILLAR_META,
  type PillarKey,
  type Verdict,
  type CodexExchange,
} from "@/lib/inspector-mock";
import PillarRadar from "@/components/atelier/PillarRadar";
import HoodedJacketSVG from "@/components/atelier/HoodedJacketSVG";
import { useLang } from "@/lib/i18n/LanguageProvider";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const VERDICT_COLOR: Record<Verdict, { bg: string; fg: string; label: string }> = {
  A: { bg: "var(--grade-a)", fg: "#fff", label: "시그니쳐 확장 후보" },
  B: { bg: "var(--color-primary)", fg: "#fff", label: "신규 시그니쳐 후보" },
  C: { bg: "var(--grade-b)", fg: "#fff", label: "타키니화 가능" },
  D: { bg: "var(--grade-c)", fg: "#fff", label: "부적합" },
};

const APEX_REPORT_URL = "/apex-report.html";

export default function InspectorDemo() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="console-shell">
      <Sidebar active="inspector" />
      <div className="console-main">
        <ConsoleHeader step={step} onReset={() => setStep(1)} />
        <div className="console-pad">
          <div className="animate-fade-in" key={step}>
            {step === 1 && <UploadStep onSubmit={() => setStep(2)} />}
            {step === 2 && <AnalyzingStep onDone={() => setStep(3)} />}
            {step === 3 && <VerdictStep onNext={() => setStep(4)} />}
            {step === 4 && <AlternativesStep onNext={() => setStep(5)} />}
            {step === 5 && <CodexStep onNext={() => setStep(6)} />}
            {step === 6 && <DecisionStep onReset={() => setStep(1)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * Console Header — TopBar + Step Progress
 * ============================================================ */
function ConsoleHeader({ step, onReset }: { step: Step; onReset: () => void }) {
  const { t } = useLang();
  const steps = ["Upload", "Analyzing", "Verdict", "Alternatives", "Codex", "Decision"];

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "color-mix(in oklab, var(--color-app-bg) 88%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      {/* Sub row — breadcrumb */}
      <div
        className="flex items-center justify-between px-8 py-2"
        style={{
          fontSize: 11,
          color: "var(--color-ink-muted-48)",
          borderBottom: "1px solid var(--color-divider-soft)",
        }}
      >
        <div className="flex items-center gap-2 t-mono">
          <Link href="/" style={{ color: "var(--color-ink-muted-48)" }}>{t.console.breadcrumb_platform}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/console" style={{ color: "var(--color-ink-muted-48)" }}>{t.console.breadcrumb_hq}</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>{t.console.breadcrumb_ste}</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>{t.inspector.breadcrumb_atelier}</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--color-ink)" }}>{t.inspector.breadcrumb_inspector}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="t-mono">Sugi France · G1 · 26FW</span>
          <span style={{ width: 1, height: 12, background: "var(--color-hairline)" }} />
          <button onClick={onReset} className="btn btn-ghost btn-sm">{t.inspector.reset}</button>
        </div>
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="h-display-md">{t.inspector.title}</h1>
          <p className="mt-1" style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}>
            {t.inspector.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={APEX_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            title={t.inspector.apex_button}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            {t.inspector.apex_button}
          </a>
          <span
            className="t-mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--color-primary)",
              background: "rgba(0, 44, 95, 0.08)",
              padding: "5px 10px",
              borderRadius: 9999,
            }}
          >
            {t.inspector.step} {step} / 6
          </span>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center gap-1 px-8 pb-4">
        {steps.map((s, i) => {
          const idx = (i + 1) as Step;
          const isCurrent = idx === step;
          const isPast = idx < step;
          return (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: isPast
                      ? "var(--status-ok)"
                      : isCurrent
                      ? "var(--color-primary)"
                      : "var(--color-canvas)",
                    border: isPast || isCurrent ? "none" : "1px solid var(--color-hairline-strong)",
                    color: isPast || isCurrent ? "#fff" : "var(--color-ink-muted-48)",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isCurrent ? "0 0 0 4px rgba(0, 44, 95, 0.15)" : "none",
                  }}
                >
                  {isPast ? "✓" : idx}
                </span>
                <span
                  className="truncate"
                  style={{
                    fontSize: 12,
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? "var(--color-ink)" : "var(--color-ink-muted-48)",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  style={{
                    flex: 1,
                    height: 2,
                    background: isPast ? "var(--status-ok)" : "var(--color-hairline)",
                    borderRadius: 9999,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}

/* ============================================================
 * STEP 1 — Upload
 * ============================================================ */
function UploadStep({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useLang();
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card" style={{ padding: 32 }}>
        <div className="t-label">{t.inspector.step1_label}</div>
        <h2 className="h-display-md mt-2">{t.inspector.step1_title}</h2>
        <p className="mt-2" style={{ color: "var(--color-ink-muted-80)", fontSize: 14, lineHeight: 1.55 }}>
          {t.inspector.step1_body}
        </p>

        {/* Upload area */}
        <div
          className="mt-6 p-10 text-center"
          style={{
            background: "var(--color-canvas-soft)",
            border: "2px dashed var(--color-hairline-strong)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <UploadIcon />
          <p className="mt-4" style={{ fontSize: 15, fontWeight: 600 }}>
            {t.inspector.step1_drop_main}
          </p>
          <p className="mt-1.5 t-caption" style={{ color: "var(--color-ink-muted-48)" }}>
            {t.inspector.step1_drop_sub}
          </p>
          <div
            className="mt-6 mx-auto inline-flex items-center gap-2 px-4 py-2.5"
            style={{
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            <span className="t-caption" style={{ color: "var(--color-ink-muted-48)" }}>
              {t.inspector.step1_demo_intro}
            </span>
            <button onClick={onSubmit} className="btn btn-primary btn-sm">
              {t.inspector.step1_start}
            </button>
          </div>
        </div>

        {/* Sample preview */}
        <div className="mt-5">
          <div className="t-label mb-3">Sample Submission</div>
          <div
            className="flex items-center gap-5 p-4"
            style={{
              background: "var(--color-canvas-soft)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ width: 96, height: 96, flexShrink: 0, background: "var(--color-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-hairline)" }}>
              <HoodedJacketSVG variant="before" size={96} />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 15, fontWeight: 700 }}>{MOCK_SUBMISSION.itemName}</div>
              <div className="t-mono mt-1" style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}>
                {MOCK_SUBMISSION.designId} · {MOCK_SUBMISSION.category} · {MOCK_SUBMISSION.season}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 t-caption">
                <KV k="Fabric" v={MOCK_SUBMISSION.meta.fabric} />
                <KV k="GSM" v={`${MOCK_SUBMISSION.meta.gsm}g`} />
                <KV k="RA Level" v={`RA ${MOCK_SUBMISSION.meta.raLevel}`} />
                <KV k="Fit" v={MOCK_SUBMISSION.meta.fitClass} />
                <KV k="Logo" v={`${MOCK_SUBMISSION.meta.logoPlacement} · ${MOCK_SUBMISSION.meta.logoSize}`} />
                <KV k="Palette" v={MOCK_SUBMISSION.meta.colorPalette} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant card */}
      <div className="space-y-4">
        <div className="card" style={{ padding: 20 }}>
          <div className="t-label">{t.inspector.step1_tenant}</div>
          <div className="mt-3 flex items-center gap-3">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "var(--color-primary)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              SF
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Sugi France</div>
              <div className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                STE-SUG-FR-26
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <KV k="Group" v={<span className="pill" style={{ color: "var(--color-primary)", background: "rgba(0,44,95,0.10)", borderColor: "transparent" }}>G1 신규</span>} />
            <KV k="Region" v="FR · DACH · Benelux · 북아프리카" />
            <KV k="Category" v="Apparel" />
            <KV k="Season" v="26FW 런칭" />
            <KV k="Contract" v="2025.12 ~ 2031" />
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="t-label">{t.inspector.step1_rules}</div>
          <ul className="mt-3 space-y-2 t-caption" style={{ color: "var(--color-ink-muted-80)" }}>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-primary)", fontWeight: 700, minWidth: 16 }}>P1</span>
              <span>Italian Tennis Heritage</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-primary)", fontWeight: 700, minWidth: 16 }}>P2</span>
              <span>Elegant Functionalism <em style={{ color: "var(--status-warn)", fontStyle: "normal", fontWeight: 600 }}>(×2)</em></span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-primary)", fontWeight: 700, minWidth: 16 }}>P3</span>
              <span>Court-to-Social Lifestyle</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-primary)", fontWeight: 700, minWidth: 16 }}>P4</span>
              <span>Body-Lined Silhouette</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-primary)", fontWeight: 700, minWidth: 16 }}>P5</span>
              <span>Quiet Performance</span>
            </li>
            <li className="pt-2 mt-2" style={{ borderTop: "1px dashed var(--color-hairline)" }}>
              G1 임계값: <strong style={{ color: "var(--color-ink)" }}>전수 검수</strong> · Brand Director gate
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span style={{ fontSize: 11, color: "var(--color-ink-muted-48)", fontWeight: 500 }}>{k}</span>
      <span style={{ fontSize: 12, color: "var(--color-ink)", fontWeight: 600, textAlign: "right" }}>
        {v}
      </span>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style={{ display: "inline-block" }}>
      <path
        d="M24 8 V32 M14 18 L24 8 L34 18"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="8" y="34" width="32" height="6" rx="3" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ============================================================
 * STEP 2 — Analyzing
 * ============================================================ */
function AnalyzingStep({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [phase, setPhase] = useState(0);
  const phases = [
    t.inspector.step2_phase1,
    t.inspector.step2_phase2,
    t.inspector.step2_phase3,
    t.inspector.step2_phase4,
    t.inspector.step2_phase5,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p < phases.length - 1) return p + 1;
        clearInterval(interval);
        setTimeout(onDone, 600);
        return p;
      });
    }, 420);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="card relative overflow-hidden"
      style={{
        padding: 64,
        background: "linear-gradient(135deg, #001a3a 0%, var(--color-primary) 60%, #0a4585 100%)",
        color: "#fff",
        textAlign: "center",
        minHeight: 480,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -50,
          right: -80,
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(228,0,43,0.22), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          left: -50,
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(201,154,58,0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-[640px] mx-auto">
        <div className="flex justify-center mb-8">
          <PulsingPentagon />
        </div>
        <h2 className="h-display-md" style={{ color: "#fff" }}>
          {t.inspector.step2_title}
        </h2>
        <p className="t-lead mt-3" style={{ color: "rgba(255,255,255,0.78)", fontSize: 15 }}>
          {t.inspector.step2_subtitle}
        </p>

        <ul className="mt-10 text-left space-y-2.5 max-w-[480px] mx-auto">
          {phases.map((p, i) => (
            <li
              key={p}
              className="flex items-center gap-3 px-4 py-3 transition-all"
              style={{
                background:
                  i === phase
                    ? "rgba(255,255,255,0.10)"
                    : i < phase
                    ? "rgba(22,163,74,0.14)"
                    : "rgba(255,255,255,0.04)",
                borderRadius: "var(--radius-md)",
                border:
                  i === phase
                    ? "1px solid rgba(255,255,255,0.22)"
                    : "1px solid rgba(255,255,255,0.06)",
                opacity: i > phase ? 0.5 : 1,
              }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center"
                style={{
                  borderRadius: 9999,
                  background:
                    i < phase
                      ? "var(--status-ok)"
                      : i === phase
                      ? "#fff"
                      : "rgba(255,255,255,0.08)",
                  color: i === phase ? "var(--color-primary)" : "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {i < phase ? "✓" : i + 1}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{p}</span>
              {i === phase && (
                <span className="animate-pulse-soft" style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                  {t.inspector.step2_inprogress}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PulsingPentagon() {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.20)",
        borderRadius: 18,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-cream-white)",
        animation: "pulseSoft 1.4s ease-in-out infinite",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 322 323" fill="currentColor">
        <path d="M 150.05 0.00 L 168.04 0.00 C 173.11 0.39 178.53 0.24 183.28 0.97 Q 263.26 13.24 303.58 83.45 Q 304.61 85.24 305.15 86.77 A 0.84 0.83 80.2 0 1 304.37 87.88 Q 284.59 88.10 265.58 87.99 C 262.89 87.98 262.30 87.49 261.51 85.03 Q 242.80 26.98 184.62 15.12 C 156.31 9.35 120.48 14.53 96.98 32.33 C 74.89 49.07 61.52 76.37 56.74 103.19 A 1.54 1.54 0.0 0 0 58.26 105.00 L 312.98 104.99 A 1.16 1.15 -9.0 0 1 314.08 105.78 Q 326.15 142.39 322.24 180.33 C 319.00 211.87 304.77 243.20 284.53 267.01 C 256.93 299.48 215.44 320.46 172.39 323.00 L 149.14 323.00 Q 99.06 319.13 60.83 288.89 Q 16.03 253.44 3.18 195.93 Q 1.53 188.52 0.13 180.99 A 0.64 0.64 0.0 0 1 0.71 180.24 Q 26.18 178.15 51.72 179.21 A 1.22 1.22 0.0 0 1 52.89 180.43 C 52.77 209.70 59.25 243.66 76.19 268.28 Q 97.15 298.74 134.26 306.51 Q 159.67 311.84 186.50 306.88 C 206.17 303.25 223.50 294.12 237.37 279.74 C 266.64 249.38 271.01 203.98 269.93 164.15 Q 269.87 162.00 267.72 162.00 L 193.25 162.00 A 2.25 2.24 90.0 0 0 191.01 164.25 L 190.99 275.51 Q 190.99 278.00 188.49 278.00 L 133.54 278.00 A 0.54 0.54 0.0 0 1 133.00 277.46 Q 133.01 221.67 133.00 165.75 Q 133.00 164.01 132.55 162.81 Q 132.35 162.29 131.79 162.29 L 0.00 161.94 L 0.00 148.16 Q 7.81 69.06 72.60 25.85 Q 107.12 2.82 150.05 0.00 Z M 151.00 145.63 L 151.00 257.87 A 1.13 1.12 90.0 0 0 152.12 259.00 L 172.00 259.00 A 1.00 0.99 -89.7 0 0 173.00 258.00 L 173.00 145.99 A 1.01 1.01 0.0 0 1 174.01 144.98 L 268.97 145.01 A 1.00 1.00 0.0 0 0 269.97 144.05 Q 270.35 134.05 268.81 124.15 Q 268.63 123.00 267.46 123.00 L 54.75 123.00 A 0.89 0.88 -85.8 0 0 53.88 123.76 Q 52.43 133.89 53.14 144.15 Q 53.19 145.00 54.05 145.00 L 150.38 145.00 A 0.63 0.62 -90.0 0 1 151.00 145.63 Z" />
      </svg>
    </div>
  );
}

/* ============================================================
 * STEP 3 — Verdict (apex_report 링크 추가)
 * ============================================================ */
function VerdictStep({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  const r = MOCK_REPORT;
  const v = VERDICT_COLOR[r.verdict];

  return (
    <div className="space-y-6">
      {/* Verdict header card */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="grid gap-0" style={{ gridTemplateColumns: "minmax(280px, 360px) 1fr" }}>
          {/* Left: Verdict + meta */}
          <div
            style={{
              padding: 28,
              background: "linear-gradient(180deg, var(--color-canvas) 0%, var(--color-canvas-soft) 100%)",
              borderRight: "1px solid var(--color-hairline)",
            }}
          >
            <div className="t-label">{t.inspector.step3_label}</div>
            <div className="mt-4 flex items-start gap-4">
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  background: v.bg,
                  color: v.fg,
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                }}
              >
                <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{r.verdict}</span>
              </div>
              <div className="min-w-0">
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: v.bg, textTransform: "uppercase" }}>
                  {v.label}
                </div>
                <div className="mt-1" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>
                  {MOCK_SUBMISSION.itemName}
                </div>
                <div className="t-mono mt-1.5" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                  {r.designId} · {MOCK_SUBMISSION.licensee} · {MOCK_SUBMISSION.season}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat label={t.inspector.step3_closest_signature} value={r.closestSignature.name} small />
              <Stat
                label={t.inspector.step3_axis_match}
                value={`${r.closestSignature.axisMatch}/${r.closestSignature.axisTotal}`}
                accent="var(--color-primary)"
              />
            </div>

            <div className="mt-6 t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
              {t.inspector.step3_inspected_at} {r.inspectedAt}
            </div>

            <a
              href={APEX_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-5 w-full"
              style={{ width: "100%" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              {t.inspector.step3_open_apex}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
            </a>
          </div>

          {/* Right: Radar */}
          <div style={{ padding: 28 }}>
            <div className="flex items-center justify-between">
              <div className="t-label">{t.inspector.step3_radar}</div>
              <div className="flex items-center gap-3 t-caption" style={{ fontSize: 11 }}>
                <Legend dot="var(--color-primary)" label={t.inspector.step3_legend_pass} />
                <Legend dot="var(--color-brick-red)" label={t.inspector.step3_legend_fail} />
                <Legend dash label={t.inspector.step3_legend_threshold} />
              </div>
            </div>
            <div className="flex items-center justify-center mt-2" style={{ minHeight: 320 }}>
              <PillarRadar scores={r.pillarScores} size={320} />
            </div>
          </div>
        </div>
      </div>

      {/* Pillar score cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
        {(Object.keys(r.pillarScores) as PillarKey[]).map((p) => {
          const score = r.pillarScores[p];
          const isFail = score < PILLAR_META[p].pass;
          return (
            <div
              key={p}
              className="card"
              style={{
                padding: 16,
                borderColor: isFail ? "var(--color-brick-red)" : "var(--color-hairline)",
                position: "relative",
              }}
            >
              {isFail && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "var(--color-brick-red)",
                    borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                  }}
                />
              )}
              <div
                className="t-label"
                style={{
                  color: isFail ? "var(--color-brick-red)" : "var(--color-ink-muted-48)",
                }}
              >
                {p}
              </div>
              <div
                className="kpi-value mt-2"
                style={{
                  color: isFail ? "var(--color-brick-red)" : "var(--color-ink)",
                  fontSize: 28,
                }}
              >
                {score}
              </div>
              <div
                className="t-caption mt-1"
                style={{ color: "var(--color-ink-muted-80)", fontSize: 11, lineHeight: 1.3 }}
              >
                {PILLAR_META[p].en}
              </div>
            </div>
          );
        })}
      </div>

      {/* Violations */}
      <div className="card" style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="t-label">{t.inspector.step3_violations}</div>
            <h3 className="h-tagline mt-1">{t.inspector.step3_violations_count(r.violations.length)}</h3>
          </div>
        </div>
        <ul className="space-y-3">
          {r.violations.map((v) => {
            const sevColor =
              v.severity === "high"
                ? "var(--color-brick-red)"
                : v.severity === "mid"
                ? "var(--color-primary)"
                : "var(--color-ink-muted-48)";
            return (
              <li
                key={v.pillar + v.issue}
                className="p-4"
                style={{
                  background: "var(--color-canvas-soft)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: `3px solid ${sevColor}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    style={{
                      background: sevColor,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {v.pillar}
                  </span>
                  <span className="t-mono" style={{ fontSize: 10, color: sevColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    {v.severity}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>{v.issue}</div>
                <div className="t-caption mt-1.5" style={{ color: "var(--color-ink-muted-80)", lineHeight: 1.55 }}>
                  {v.rule}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-end gap-2">
        <a
          href={APEX_REPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          {t.inspector.step3_view_full}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
        </a>
        <button onClick={onNext} className="btn btn-primary">
          {t.inspector.step3_next}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, accent, small }: { label: string; value: string; accent?: string; small?: boolean }) {
  return (
    <div
      className="p-3"
      style={{
        background: "var(--color-canvas)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="t-label">{label}</div>
      <div
        className="mt-1"
        style={{
          fontSize: small ? 13 : 22,
          fontWeight: 700,
          color: accent || "var(--color-ink)",
          lineHeight: 1.2,
          letterSpacing: -0.3,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Legend({ dot, dash, label }: { dot?: string; dash?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1.5" style={{ color: "var(--color-ink-muted-48)" }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />}
      {dash && <span style={{ width: 14, height: 1.5, background: "var(--color-court-green)", display: "inline-block" }} />}
      {label}
    </span>
  );
}

/* ============================================================
 * STEP 4 — Alternatives
 * ============================================================ */
function AlternativesStep({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  const r = MOCK_REPORT;

  return (
    <div className="space-y-6">
      <div>
        <div className="t-label">{t.inspector.step4_label}</div>
        <h2 className="h-display-md mt-2">{t.inspector.step4_title}</h2>
        <p className="mt-2" style={{ color: "var(--color-ink-muted-80)", fontSize: 14, lineHeight: 1.55, maxWidth: 720 }}>
          {t.inspector.step4_body}
        </p>
      </div>

      {/* Before / After */}
      <div className="grid gap-4 lg:grid-cols-2">
        <BeforeAfterCard variant="before" />
        <BeforeAfterCard variant="after" />
      </div>

      {/* Alternatives 3 cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {r.alternatives.map((a, i) => (
          <article key={a.id} className="card flex flex-col" style={{ padding: 22 }}>
            <div
              className="t-label"
              style={{ color: "var(--color-primary)", letterSpacing: 1.5 }}
            >
              ALT 0{i + 1}
            </div>
            <h3
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: -0.2,
              }}
            >
              {a.title}
            </h3>
            <p className="mt-3 text-[13px]" style={{ color: "var(--color-ink-muted-80)", lineHeight: 1.55 }}>
              {a.description}
            </p>

            <div
              className="mt-4 p-3"
              style={{
                background: "var(--color-canvas-soft)",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
              }}
            >
              <div style={{ color: "var(--color-brick-red)", fontWeight: 700, marginBottom: 3, fontSize: 10, letterSpacing: 1 }}>
                BEFORE
              </div>
              <div style={{ color: "var(--color-ink-muted-80)" }}>{a.before}</div>
              <div style={{ color: "var(--status-ok)", fontWeight: 700, marginTop: 8, marginBottom: 3, fontSize: 10, letterSpacing: 1 }}>
                AFTER
              </div>
              <div style={{ color: "var(--color-ink)", fontWeight: 600 }}>{a.after}</div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 items-center">
              <span className="t-mono" style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}>
                {t.inspector.step4_recovers}
              </span>
              {a.pillarsRecovered.map((p) => (
                <span
                  key={p}
                  style={{
                    background: "var(--status-ok)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Develop notes */}
      <div className="card" style={{ padding: 22 }}>
        <div className="t-label">{t.inspector.step4_develop_notes}</div>
        <p className="mt-3" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted-80)" }}>
          {r.developNotes}
        </p>
      </div>

      <div className="flex justify-end">
        <button onClick={onNext} className="btn btn-primary">
          {t.inspector.step4_next}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </div>
  );
}

function BeforeAfterCard({ variant }: { variant: "before" | "after" }) {
  const { t } = useLang();
  const isBefore = variant === "before";
  const accent = isBefore ? "var(--color-brick-red)" : "var(--status-ok)";
  return (
    <div className="card overflow-hidden" style={{ padding: 0, borderColor: accent }}>
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{
          background: accent,
          color: "#fff",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {isBefore ? t.inspector.step4_before : t.inspector.step4_after}
        </span>
      </div>
      <div className="flex items-center justify-center" style={{ padding: 24, background: "var(--color-canvas-soft)" }}>
        <HoodedJacketSVG variant={variant} size={220} />
      </div>
      <div className="px-5 py-4 t-caption" style={{ color: "var(--color-ink-muted-80)" }}>
        {isBefore ? (
          <ul className="space-y-1">
            <li>• Charcoal Tone-on-Tone (Italian Heritage 부재)</li>
            <li>• 가슴 중앙 120mm Pentagon (P5 위반)</li>
            <li>• French Terry RA5 · 380g (P2 위반)</li>
          </ul>
        ) : (
          <ul className="space-y-1">
            <li>• Tennis Navy + Cream + Court Green tape</li>
            <li>• 좌측 흉부 외측 25mm Pentagon (Tone-on-Tone)</li>
            <li>• Cotna Piqué RA3 · 260g (Weight C — 시그니쳐 정합)</li>
          </ul>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * STEP 5 — Codex Q&A
 * ============================================================ */
function CodexStep({ onNext }: { onNext: () => void }) {
  const { t } = useLang();
  const [revealed, setRevealed] = useState<number[]>([]);

  const reveal = (idx: number) => {
    if (!revealed.includes(idx)) {
      setRevealed([...revealed, idx]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="t-label">{t.inspector.step5_label}</div>
        <h2 className="h-display-md mt-2">{t.inspector.step5_title}</h2>
        <p className="mt-2" style={{ color: "var(--color-ink-muted-80)", fontSize: 14, lineHeight: 1.55, maxWidth: 720 }}>
          {t.inspector.step5_body}
        </p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="space-y-5">
          {MOCK_CODEX.map((c: CodexExchange, i: number) => (
            <CodexBubble
              key={i}
              exchange={c}
              isRevealed={revealed.includes(i)}
              onReveal={() => reveal(i)}
              index={i + 1}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="t-caption" style={{ color: "var(--color-ink-muted-48)" }}>
          {revealed.length < MOCK_CODEX.length
            ? t.inspector.step5_progress(revealed.length, MOCK_CODEX.length)
            : t.inspector.step5_done}
        </span>
        <button
          onClick={onNext}
          className="btn btn-primary"
          disabled={revealed.length < MOCK_CODEX.length}
          style={{
            opacity: revealed.length < MOCK_CODEX.length ? 0.5 : 1,
            cursor: revealed.length < MOCK_CODEX.length ? "not-allowed" : "pointer",
          }}
        >
          {t.inspector.step5_next}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </div>
  );
}

function CodexBubble({
  exchange,
  isRevealed,
  onReveal,
  index,
}: {
  exchange: CodexExchange;
  isRevealed: boolean;
  onReveal: () => void;
  index: number;
}) {
  const { t } = useLang();
  return (
    <div className="space-y-2.5">
      {/* Question */}
      <div className="flex justify-end">
        <div
          className="max-w-[78%] p-4"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            borderRadius: "var(--radius-lg)",
            borderTopRightRadius: 4,
          }}
        >
          <div className="t-label" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>
            Q{index} · {t.inspector.step5_reviewer}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55 }}>{exchange.q}</div>
        </div>
      </div>

      {/* Answer */}
      {isRevealed ? (
        <div className="flex justify-start animate-fade-in">
          <div
            className="max-w-[78%] p-4"
            style={{
              background: "var(--color-canvas-soft)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "var(--radius-lg)",
              borderTopLeftRadius: 4,
            }}
          >
            <div
              className="t-label flex items-center gap-1.5"
              style={{ color: "var(--color-primary)", marginBottom: 6 }}
            >
              <svg width="12" height="12" viewBox="0 0 322 323" fill="currentColor">
                <path d="M 150.05 0.00 L 168.04 0.00 C 173.11 0.39 178.53 0.24 183.28 0.97 Q 263.26 13.24 303.58 83.45 Q 304.61 85.24 305.15 86.77 A 0.84 0.83 80.2 0 1 304.37 87.88 Q 284.59 88.10 265.58 87.99 C 262.89 87.98 262.30 87.49 261.51 85.03 Q 242.80 26.98 184.62 15.12 C 156.31 9.35 120.48 14.53 96.98 32.33 C 74.89 49.07 61.52 76.37 56.74 103.19 A 1.54 1.54 0.0 0 0 58.26 105.00 L 312.98 104.99 A 1.16 1.15 -9.0 0 1 314.08 105.78 Q 326.15 142.39 322.24 180.33 C 319.00 211.87 304.77 243.20 284.53 267.01 C 256.93 299.48 215.44 320.46 172.39 323.00 L 149.14 323.00 Q 99.06 319.13 60.83 288.89 Q 16.03 253.44 3.18 195.93 Q 1.53 188.52 0.13 180.99 A 0.64 0.64 0.0 0 1 0.71 180.24 Q 26.18 178.15 51.72 179.21 A 1.22 1.22 0.0 0 1 52.89 180.43 C 52.77 209.70 59.25 243.66 76.19 268.28 Q 97.15 298.74 134.26 306.51 Q 159.67 311.84 186.50 306.88 C 206.17 303.25 223.50 294.12 237.37 279.74 C 266.64 249.38 271.01 203.98 269.93 164.15 Q 269.87 162.00 267.72 162.00 L 193.25 162.00 A 2.25 2.24 90.0 0 0 191.01 164.25 L 190.99 275.51 Q 190.99 278.00 188.49 278.00 L 133.54 278.00 A 0.54 0.54 0.0 0 1 133.00 277.46 Q 133.01 221.67 133.00 165.75 Q 133.00 164.01 132.55 162.81 Q 132.35 162.29 131.79 162.29 L 0.00 161.94 L 0.00 148.16 Q 7.81 69.06 72.60 25.85 Q 107.12 2.82 150.05 0.00 Z M 151.00 145.63 L 151.00 257.87 A 1.13 1.12 90.0 0 0 152.12 259.00 L 172.00 259.00 A 1.00 0.99 -89.7 0 0 173.00 258.00 L 173.00 145.99 A 1.01 1.01 0.0 0 1 174.01 144.98 L 268.97 145.01 A 1.00 1.00 0.0 0 0 269.97 144.05 Q 270.35 134.05 268.81 124.15 Q 268.63 123.00 267.46 123.00 L 54.75 123.00 A 0.89 0.88 -85.8 0 0 53.88 123.76 Q 52.43 133.89 53.14 144.15 Q 53.19 145.00 54.05 145.00 L 150.38 145.00 A 0.63 0.62 -90.0 0 1 151.00 145.63 Z" />
              </svg>
              {t.inspector.step5_codex}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-ink)" }}>
              {exchange.a}
            </div>
            <div
              className="t-mono mt-3 pt-3"
              style={{
                borderTop: "1px solid var(--color-hairline)",
                fontSize: 10,
                color: "var(--color-ink-muted-48)",
              }}
            >
              <span style={{ fontWeight: 700, marginRight: 4 }}>{t.inspector.step5_sources}</span>
              {exchange.sources.join(" · ")}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <button onClick={onReveal} className="btn btn-ghost btn-sm">
            {t.inspector.step5_show_answer}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * STEP 6 — Decision (apex_report 링크 추가)
 * ============================================================ */
function DecisionStep({ onReset }: { onReset: () => void }) {
  const { t } = useLang();
  const [decision, setDecision] = useState<"approve" | "revise" | "reject" | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <div className="t-label">{t.inspector.step6_label}</div>
        <h2 className="h-display-md mt-2">{t.inspector.step6_title}</h2>
        <p className="mt-2" style={{ color: "var(--color-ink-muted-80)", fontSize: 14, lineHeight: 1.55, maxWidth: 720 }}>
          {t.inspector.step6_body}
        </p>
      </div>

      {!decision ? (
        <div className="grid gap-4 md:grid-cols-3">
          <DecisionCard
            title={t.inspector.step6_approve_title}
            ko={t.inspector.step6_approve_ko}
            body={t.inspector.step6_approve_body}
            accent="var(--status-ok)"
            onClick={() => setDecision("approve")}
          />
          <DecisionCard
            title={t.inspector.step6_revise_title}
            ko={t.inspector.step6_revise_ko}
            body={t.inspector.step6_revise_body}
            accent="var(--color-primary)"
            onClick={() => setDecision("revise")}
            recommended
          />
          <DecisionCard
            title={t.inspector.step6_reject_title}
            ko={t.inspector.step6_reject_ko}
            body={t.inspector.step6_reject_body}
            accent="var(--color-brick-red)"
            onClick={() => setDecision("reject")}
          />
        </div>
      ) : (
        <DecisionResult decision={decision} onReset={onReset} />
      )}
    </div>
  );
}

function DecisionCard({
  title,
  ko,
  body,
  accent,
  onClick,
  recommended,
}: {
  title: string;
  ko: string;
  body: string;
  accent: string;
  onClick: () => void;
  recommended?: boolean;
}) {
  const { t } = useLang();
  return (
    <button
      onClick={onClick}
      className="card text-left transition-all hover:shadow-lg"
      style={{
        padding: 22,
        borderColor: recommended ? accent : "var(--color-hairline)",
        borderWidth: recommended ? 2 : 1,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {recommended && (
        <span
          style={{
            position: "absolute",
            top: -10,
            right: 16,
            background: accent,
            color: "#fff",
            fontSize: 10,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 9999,
            letterSpacing: 1,
          }}
        >
          {t.inspector.step6_recommended}
        </span>
      )}
      <div className="t-label" style={{ color: accent, letterSpacing: 1.5 }}>
        {title.toUpperCase()}
      </div>
      <h3 className="mt-2 h-tagline">{ko}</h3>
      <p className="mt-3 text-[13px]" style={{ color: "var(--color-ink-muted-80)", lineHeight: 1.55 }}>
        {body}
      </p>
    </button>
  );
}

function DecisionResult({
  decision,
  onReset,
}: {
  decision: "approve" | "revise" | "reject";
  onReset: () => void;
}) {
  const { t } = useLang();
  const M = {
    approve: {
      label: "승인 완료",
      accent: "var(--status-ok)",
      desc: "Sugi France에 승인 통지가 자동 발송되었습니다. D-70 실물 샘플 송부 마일스톤이 활성화됩니다.",
      next: ["실물 샘플 송부 트래킹 (운송장 자동 등록)", "ATELIER ONE Mirror 검수 대기", "생산 코드 발급 대기"],
    },
    revise: {
      label: "수정 요청 발송",
      accent: "var(--color-primary)",
      desc: "Sugi France에 대안 3안 패키지 + 재제출 가이드가 자동 송출되었습니다. 시즌 캘린더 D-100 마감일까지 재제출 필요.",
      next: [
        "대안 1: 로고 재배치 (P5 회복)",
        "대안 2: Cotna Piqué RA3 / Weight C 변경 (P2 회복)",
        "대안 3: Italian Active Tennis 배색 (P1 회복)",
        "재제출 시 자동 재검수 → Verdict B 예상",
      ],
    },
    reject: {
      label: "반려 처리",
      accent: "var(--color-brick-red)",
      desc: "Sugi France에 반려 사유 + 디자인 단계 재진입 안내 발송. 본 SKU는 26FW 핵심 라인업에서 제외됩니다.",
      next: ["디자인 단계 재진입", "Brand Director 재검토 미팅 예약", "26FW 라인업 SKU 수량 재조정"],
    },
  }[decision];

  return (
    <div className="card animate-fade-in" style={{ padding: 0, overflow: "hidden", borderColor: M.accent, borderWidth: 2 }}>
      <div
        style={{
          padding: 28,
          background: `linear-gradient(135deg, ${M.accent}10, ${M.accent}05)`,
          borderBottom: `1px solid ${M.accent}33`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 9999,
              background: M.accent,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div>
            <h2 className="h-display-md" style={{ color: M.accent }}>
              {M.label}
            </h2>
            <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted-80)" }}>
              {M.desc}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        <div className="t-label">{t.inspector.step6_next_steps}</div>
        <ul className="mt-3 space-y-2">
          {M.next.map((s) => (
            <li key={s} className="flex items-start gap-2.5" style={{ fontSize: 14, color: "var(--color-ink)" }}>
              <span style={{ color: M.accent, fontWeight: 700 }}>→</span>
              {s}
            </li>
          ))}
        </ul>

        <div
          className="mt-6 pt-5 flex flex-wrap gap-2 justify-end"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          <a
            href={APEX_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            {t.inspector.step6_open_apex}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
          </a>
          <button onClick={onReset} className="btn btn-ghost">
            {t.inspector.step6_back}
          </button>
          <Link href="/console" className="btn btn-primary">
            {t.inspector.step6_dashboard}
          </Link>
        </div>
      </div>
    </div>
  );
}
