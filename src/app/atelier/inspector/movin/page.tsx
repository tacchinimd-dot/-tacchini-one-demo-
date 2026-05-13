"use client";

/* ============================================================
 * MOVIN 27SS Lifestyle Man — 실제 라이센시 CAD PDF 자동 검수 데모
 *
 * 데이터 소스: MOVIN 라이센시가 제출한 6개 PDF (T1_ACE.pdf 등)
 *              → scripts/build-movin-data.mjs가 자동 파싱·검수
 *              → src/lib/movin-data.ts로 저장
 *
 * UI 구성:
 *   · 상단: 라이센시 종합 등급 카드
 *   · 라인 카드 6개 그리드 (라인별 종합 등급 + SKU 분포)
 *   · 라인 클릭 → SKU 상세 (5 Pillars 점수 + 위반 + 컬러 분류)
 *
 * 6/9 컨퍼런스 라이브 시연용 — 실제 데이터로 작동
 * ============================================================ */

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { MOVIN_LINES, MOVIN_OVERALL, type MovinLine, type MovinSKU } from "@/lib/movin-data";
import { useLang } from "@/lib/i18n/LanguageProvider";

const APEX_REPORT_URL = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/apex-report.html`;

type DemoStep = "upload" | "analyzing" | "result";

const VERDICT_COLOR: Record<string, { bg: string; fg: string; label: string }> = {
  A: { bg: "var(--grade-a)", fg: "#fff", label: "Approve" },
  B: { bg: "var(--color-primary)", fg: "#fff", label: "Approve w/ Notes" },
  C: { bg: "var(--grade-b)", fg: "#fff", label: "Minor Revise" },
  D: { bg: "var(--grade-c)", fg: "#fff", label: "Major Revise" },
};

const PILLAR_NAMES: Record<string, string> = {
  P1: "Italian Tennis Heritage",
  P2: "Elegant Functionalism",
  P3: "Court-to-Social",
  P4: "Body-Lined Silhouette",
  P5: "Quiet Performance",
};

export default function MovinInspectorRoute() {
  return (
    <LoginGate>
      <MovinInspector />
    </LoginGate>
  );
}

function MovinInspector() {
  const [step, setStep] = useState<DemoStep>("upload");
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  return (
    <div className="console-shell">
      <Sidebar active="inspector" />
      <div className="console-main">
        <HeaderBar
          step={step}
          selectedLine={selectedLine}
          onResetFlow={() => {
            setStep("upload");
            setSelectedLine(null);
          }}
          onBack={() => setSelectedLine(null)}
        />
        <div className="console-pad space-y-6">
          {step === "upload" && <UploadStep onStart={() => setStep("analyzing")} />}
          {step === "analyzing" && (
            <AnalyzingStep onDone={() => setStep("result")} />
          )}
          {step === "result" && (
            <>
              <OverallCard />
              {!selectedLine ? (
                <LinesGrid onSelect={setSelectedLine} />
              ) : (
                <LineDetail line={selectedLine} onBack={() => setSelectedLine(null)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * Header
 * ============================================================ */
function HeaderBar({
  step,
  selectedLine,
  onResetFlow,
  onBack,
}: {
  step: DemoStep;
  selectedLine: string | null;
  onResetFlow: () => void;
  onBack: () => void;
}) {
  const { t } = useLang();
  const stepLabels: Record<DemoStep, string> = {
    upload: t.movin.step_upload,
    analyzing: t.movin.step_analyzing,
    result: t.movin.step_result,
  };

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "color-mix(in oklab, var(--color-app-bg) 88%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        className="flex items-center justify-between px-8 py-2"
        style={{
          fontSize: 11,
          color: "var(--color-ink-muted-48)",
          borderBottom: "1px solid var(--color-divider-soft)",
        }}
      >
        <div className="flex items-center gap-2 t-mono">
          <Link href="/" style={{ color: "var(--color-ink-muted-48)" }}>
            Platform
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/console" style={{ color: "var(--color-ink-muted-48)" }}>
            F&amp;F HQ
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>STE Operations</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/atelier/inspector" style={{ color: "var(--color-ink-muted-48)" }}>
            {t.movin.breadcrumb_inspector}
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--color-ink)" }}>{t.movin.breadcrumb_licensee}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="t-mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--color-primary)",
              background: "rgba(0, 44, 95, 0.08)",
              padding: "3px 9px",
              borderRadius: 9999,
            }}
          >
            {stepLabels[step]}
          </span>
          {step === "result" && (
            <span className="t-mono">{t.movin.total_inspected(MOVIN_OVERALL.totalSKU)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="h-display-md">{t.movin.header_title}</h1>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#fff",
                background: "var(--color-accent-red)",
                padding: "3px 8px",
                borderRadius: 9999,
                letterSpacing: 1,
              }}
            >
              {t.movin.live_prototype}
            </span>
          </div>
          <p
            className="mt-1"
            style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}
          >
            {t.movin.header_subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/atelier/codex"
            className="btn btn-primary"
            title={t.movin.guide_button}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            {t.movin.guide_button}
          </Link>
          {selectedLine && (
            <button onClick={onBack} className="btn btn-ghost">
              {t.movin.back_to_lines}
            </button>
          )}
          {step !== "upload" && (
            <button onClick={onResetFlow} className="btn btn-ghost">
              {t.movin.reset_flow}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * STEP 1 — Upload (Sugi France가 제출하는 27SS CAD PDF 패키지)
 * ============================================================ */
function UploadStep({ onStart }: { onStart: () => void }) {
  const { t } = useLang();
  const pdfs = MOVIN_LINES.map((l) => ({
    file: l.file,
    line: l.line,
    sizeMB: l.sizeMB,
    skuCount: l.skuCount,
  }));
  const totalSize = pdfs.reduce((s, p) => s + p.sizeMB, 0);
  const totalSku = pdfs.reduce((s, p) => s + p.skuCount, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card" style={{ padding: 32 }}>
        <div className="t-label">{t.movin.step1_label}</div>
        <h2 className="h-display-md mt-2">{t.movin.step1_title}</h2>
        <p
          className="mt-2"
          style={{ color: "var(--color-ink-muted-80)", fontSize: 14, lineHeight: 1.55 }}
        >
          {t.movin.step1_body}
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
            {t.movin.drop_main}
          </p>
          <p
            className="mt-1.5 t-caption"
            style={{ color: "var(--color-ink-muted-48)" }}
          >
            {t.movin.drop_sub}
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
              {t.movin.demo_intro}
            </span>
            <button onClick={onStart} className="btn btn-primary btn-sm">
              {t.movin.start_button}
            </button>
          </div>
        </div>

        {/* 업로드된 6 PDF 미리보기 */}
        <div className="mt-6">
          <div className="t-label mb-3">{t.movin.files_label(pdfs.length)}</div>
          <ul className="space-y-2">
            {pdfs.map((p) => (
              <li
                key={p.file}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  background: "var(--color-canvas-soft)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--color-primary)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.file}</div>
                  <div
                    className="t-mono mt-0.5"
                    style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
                  >
                    {p.line} · {p.skuCount} {t.movin.file_sku_unit} · {p.sizeMB.toFixed(1)} MB
                  </div>
                </div>
                <span
                  className="t-caption"
                  style={{
                    color: "var(--status-ok)",
                    fontWeight: 600,
                  }}
                >
                  ✓ {t.movin.file_ready}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tenant + Inspection Rules */}
      <div className="space-y-4">
        <div className="card" style={{ padding: 20 }}>
          <div className="t-label">{t.movin.submission_label}</div>
          <div className="mt-3 flex items-center gap-3">
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
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              SF
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Sugi France</div>
              <div
                className="t-mono"
                style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
              >
                STE-SF-27SS-LM
              </div>
            </div>
          </div>
          <dl className="mt-4 space-y-1.5 t-caption">
            <Row k={t.movin.submission_season} v="27SS" />
            <Row k={t.movin.submission_category} v="Lifestyle Man" />
            <Row
              k={t.movin.submission_group}
              v={
                <span
                  className="pill"
                  style={{
                    color: "var(--color-primary)",
                    background: "rgba(0,44,95,0.10)",
                    borderColor: "transparent",
                  }}
                >
                  {t.movin.submission_g1}
                </span>
              }
            />
            <Row k={t.movin.submission_files} v={`${pdfs.length} ${t.movin.pdfs_unit}`} />
            <Row k={t.movin.submission_size} v={`${totalSize.toFixed(1)} MB`} />
            <Row
              k={t.movin.submission_skus}
              v={`${totalSku}${t.movin.pieces ? " " + t.movin.pieces : ""}`}
            />
          </dl>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div className="t-label">{t.movin.rules_label}</div>
          <ul
            className="mt-3 space-y-2 t-caption"
            style={{ color: "var(--color-ink-muted-80)" }}
          >
            <li>
              <strong>P1.</strong> {t.movin.rules_p1}
            </li>
            <li>
              <strong>P2.</strong> {t.movin.rules_p2}
            </li>
            <li>
              <strong>P3.</strong> {t.movin.rules_p3}
            </li>
            <li>
              <strong>P4.</strong> {t.movin.rules_p4}
            </li>
            <li>
              <strong>P5.</strong> {t.movin.rules_p5}
            </li>
            <li
              className="pt-2 mt-2"
              style={{ borderTop: "1px dashed var(--color-hairline)" }}
            >
              {t.movin.rules_total}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      style={{ display: "inline-block" }}
    >
      <path
        d="M24 8 V32 M14 18 L24 8 L34 18"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="34"
        width="32"
        height="6"
        rx="3"
        stroke="var(--color-primary)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt style={{ fontSize: 11, color: "var(--color-ink-muted-48)", fontWeight: 500 }}>
        {k}
      </dt>
      <dd
        style={{
          fontSize: 12,
          color: "var(--color-ink)",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {v}
      </dd>
    </div>
  );
}

/* ============================================================
 * STEP 2 — Analyzing (PDF 파싱 → SKU 추출 → 5 Pillars → 등급 산출)
 * ============================================================ */
function AnalyzingStep({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [phase, setPhase] = useState(0);
  const phases = [
    t.movin.step2_phase1(MOVIN_LINES.length),
    t.movin.step2_phase2(MOVIN_OVERALL.totalSKU),
    t.movin.step2_phase3,
    t.movin.step2_phase4,
    t.movin.step2_phase5,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p < phases.length - 1) return p + 1;
        clearInterval(interval);
        setTimeout(onDone, 700);
        return p;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="card relative overflow-hidden"
      style={{
        padding: 64,
        background:
          "linear-gradient(135deg, #001a3a 0%, var(--color-primary) 60%, #0a4585 100%)",
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

      <div className="relative max-w-[720px] mx-auto">
        <div className="flex justify-center mb-8">
          <PulsingSymbol />
        </div>
        <h2 className="h-display-md" style={{ color: "#fff" }}>
          {t.movin.step2_title}
        </h2>
        <p className="t-lead mt-3" style={{ color: "rgba(255,255,255,0.78)", fontSize: 15 }}>
          {t.movin.step2_subtitle(MOVIN_OVERALL.totalSKU, MOVIN_LINES.length)}
        </p>

        <ul className="mt-10 text-left space-y-2.5 max-w-[560px] mx-auto">
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
                <span
                  className="animate-pulse-soft"
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}
                >
                  {t.movin.step2_inprogress}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PulsingSymbol() {
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
 * 라이센시 종합 카드 (상단)
 * ============================================================ */
function OverallCard() {
  const { t, lang } = useLang();
  const v = VERDICT_COLOR[MOVIN_OVERALL.grade];
  const verdictLabel =
    {
      A: t.movin.verdict_a_label,
      B: t.movin.verdict_b_label,
      C: t.movin.verdict_c_label,
      D: t.movin.verdict_d_label,
    }[MOVIN_OVERALL.grade] || v.label;
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: "24px 28px",
          background:
            "linear-gradient(135deg, var(--color-canvas) 0%, var(--color-canvas-soft) 100%)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div className="flex items-start gap-6">
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 18,
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
            <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>
              {MOVIN_OVERALL.grade}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              {verdictLabel}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="t-label">{t.movin.step3_overall_label}</div>
            <div
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.3,
              }}
            >
              {MOVIN_OVERALL.licensee} · {MOVIN_OVERALL.season} · {MOVIN_OVERALL.category}
            </div>
            <div
              className="t-mono mt-1"
              style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}
            >
              {t.movin.step3_overall_caption(
                MOVIN_OVERALL.totalSKU,
                MOVIN_OVERALL.totalLines,
                new Date(MOVIN_OVERALL.generatedAt).toLocaleString(
                  lang === "ko" ? "ko-KR" : "en-US",
                ),
              )}
            </div>

            <div className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-4">
              <Stat
                label={t.movin.stat_avg_score}
                value={MOVIN_OVERALL.averagePoint.toFixed(2)}
                suffix="/ 4.0"
              />
              <Stat
                label={t.movin.stat_a_label}
                value={String(MOVIN_OVERALL.distribution.A)}
                accent="var(--grade-a)"
                suffix={`(${pct(MOVIN_OVERALL.distribution.A, MOVIN_OVERALL.totalSKU)}%)`}
              />
              <Stat
                label={t.movin.stat_b_label}
                value={String(MOVIN_OVERALL.distribution.B)}
                accent="var(--color-primary)"
                suffix={`(${pct(MOVIN_OVERALL.distribution.B, MOVIN_OVERALL.totalSKU)}%)`}
              />
              <Stat
                label={t.movin.stat_cd_label}
                value={String(
                  MOVIN_OVERALL.distribution.C + MOVIN_OVERALL.distribution.D,
                )}
                accent="var(--grade-b)"
                suffix={`(${pct(
                  MOVIN_OVERALL.distribution.C + MOVIN_OVERALL.distribution.D,
                  MOVIN_OVERALL.totalSKU,
                )}%)`}
              />
            </div>
          </div>
        </div>
      </div>

      <DistributionBar />
    </div>
  );
}

function DistributionBar() {
  const { t } = useLang();
  const d = MOVIN_OVERALL.distribution;
  const total = MOVIN_OVERALL.totalSKU;
  const labelByGrade: Record<string, string> = {
    A: t.movin.verdict_a_label,
    B: t.movin.verdict_b_label,
    C: t.movin.verdict_c_label,
    D: t.movin.verdict_d_label,
  };
  return (
    <div className="px-7 pb-5 pt-3">
      <div className="t-label mb-2" style={{ color: "var(--color-ink-muted-48)" }}>
        {t.movin.verdict_distribution}
      </div>
      <div className="flex w-full overflow-hidden" style={{ height: 12, borderRadius: 6 }}>
        {(["A", "B", "C", "D"] as const).map((g) => {
          const v = d[g];
          if (v === 0) return null;
          return (
            <div
              key={g}
              title={`${g}: ${v}`}
              style={{
                width: `${(v / total) * 100}%`,
                background: VERDICT_COLOR[g].bg,
              }}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-2 t-caption flex-wrap">
        {(["A", "B", "C", "D"] as const).map((g) => (
          <span key={g} className="flex items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: VERDICT_COLOR[g].bg,
              }}
            />
            <span style={{ color: "var(--color-ink-muted-48)" }}>
              {g} · {labelByGrade[g]}
            </span>
            <span style={{ color: "var(--color-ink)", fontWeight: 700 }}>{d[g]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * 라인 카드 그리드
 * ============================================================ */
function LinesGrid({ onSelect }: { onSelect: (line: string) => void }) {
  const { t } = useLang();
  return (
    <div>
      <div className="t-label mb-3" style={{ color: "var(--color-ink-muted-48)" }}>
        {t.movin.lines_label}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOVIN_LINES.map((line) => (
          <LineCard key={line.file} line={line} onClick={() => onSelect(line.line)} />
        ))}
      </div>
    </div>
  );
}

function LineCard({ line, onClick }: { line: MovinLine; onClick: () => void }) {
  const { t, lang } = useLang();
  const v = VERDICT_COLOR[line.grade];
  return (
    <button
      onClick={onClick}
      className="card text-left transition-transform hover:scale-[1.01]"
      style={{ padding: 20, cursor: "pointer", width: "100%" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className="t-mono"
            style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
          >
            {line.file}
          </div>
          <div
            className="mt-1"
            style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}
          >
            {line.line}
          </div>
          <div className="t-caption mt-0.5" style={{ color: "var(--color-ink-muted-48)" }}>
            {line.gender} · {line.seasonCode} · {line.sizeMB.toFixed(1)} MB
          </div>
        </div>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: v.bg,
            color: v.fg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {line.grade}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 t-caption">
        <Mini
          label={t.movin.line_stats_sku}
          value={`${line.totalSKU}${lang === "ko" ? "개" : ""}`}
        />
        <Mini
          label={t.movin.line_stats_avg}
          value={`${line.averagePoint.toFixed(2)} / 4.0`}
        />
      </div>

      <div className="mt-3 flex h-2 overflow-hidden rounded-full">
        {(["A", "B", "C", "D"] as const).map((g) => {
          const v = line.distribution[g];
          if (v === 0) return null;
          return (
            <div
              key={g}
              title={`${g}: ${v}`}
              style={{
                width: `${(v / line.totalSKU) * 100}%`,
                background: VERDICT_COLOR[g].bg,
              }}
            />
          );
        })}
      </div>

      <div
        className="mt-3 t-caption flex flex-wrap gap-2.5"
        style={{ color: "var(--color-ink-muted-48)" }}
      >
        {(["A", "B", "C", "D"] as const).map((g) =>
          line.distribution[g] > 0 ? (
            <span key={g}>
              {g}·{line.distribution[g]}
            </span>
          ) : null,
        )}
      </div>

      <div
        className="mt-4 pt-3 flex items-center justify-between t-caption"
        style={{ borderTop: "1px solid var(--color-divider-soft)" }}
      >
        <span style={{ color: "var(--color-ink-muted-48)" }}>
          {t.movin.line_pillars_inspected}
        </span>
        <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
          {t.movin.line_detail_cta}
        </span>
      </div>
    </button>
  );
}

/* ============================================================
 * 라인 상세 — SKU 카드 리스트
 * ============================================================ */
function LineDetail({ line, onBack }: { line: string; onBack: () => void }) {
  const { t, lang } = useLang();
  const data = MOVIN_LINES.find((l) => l.line === line);
  if (!data) return null;
  const v = VERDICT_COLOR[data.grade];
  const verdictLabel =
    {
      A: t.movin.verdict_a_label,
      B: t.movin.verdict_b_label,
      C: t.movin.verdict_c_label,
      D: t.movin.verdict_d_label,
    }[data.grade] || v.label;

  return (
    <div className="space-y-5">
      <div
        className="card flex items-center gap-5"
        style={{ padding: 22 }}
      >
        <button onClick={onBack} className="btn btn-ghost btn-sm">
          ←
        </button>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: v.bg,
            color: v.fg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {data.grade}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="t-mono"
            style={{ fontSize: 11, color: "var(--color-ink-muted-48)" }}
          >
            {data.file}
          </div>
          <div
            className="mt-0.5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: -0.3,
            }}
          >
            {data.line} Line — {verdictLabel}
          </div>
          <div
            className="t-caption mt-1"
            style={{ color: "var(--color-ink-muted-48)" }}
          >
            {data.gender} · {data.season} · {data.totalSKU} SKUs ·{" "}
            {lang === "ko" ? "평균" : "avg"} {data.averagePoint.toFixed(2)}/4.0
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.skus.map((sku) => (
          <SKUCard key={sku.code} sku={sku} />
        ))}
      </div>
    </div>
  );
}

function SKUCard({ sku }: { sku: MovinSKU }) {
  const { t } = useLang();
  const v = VERDICT_COLOR[sku.verdict];
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div
            className="t-mono"
            style={{ fontSize: 10, color: "var(--color-ink-muted-48)" }}
          >
            #{sku.code}
          </div>
          <div
            className="mt-1 truncate"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            {sku.name}
          </div>
          <div className="t-caption mt-1" style={{ color: "var(--color-ink-muted-80)" }}>
            {sku.inferredCore}
          </div>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: v.bg,
            color: v.fg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {sku.verdict}
        </div>
      </div>

      {/* 5 Pillars 점수 미니 바 */}
      <div className="mt-4 space-y-1.5">
        {(["P1", "P2", "P3", "P4", "P5"] as const).map((p) => {
          const score = sku.pillarScores[p];
          const isFail = (p === "P2" ? score < 70 : score < 60);
          return (
            <div key={p} className="flex items-center gap-2 t-caption">
              <span
                style={{
                  width: 22,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: isFail ? "var(--color-brick-red)" : "var(--color-ink-muted-48)",
                }}
              >
                {p}
              </span>
              <span
                style={{
                  width: 24,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: isFail ? "var(--color-brick-red)" : "var(--color-ink)",
                  textAlign: "right",
                }}
              >
                {score}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 5,
                  background: "var(--color-hairline)",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: "100%",
                    background: isFail
                      ? "var(--color-brick-red)"
                      : "var(--color-primary)",
                    transition: "width 600ms ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 소재 + 컬러 */}
      <div className="mt-4 pt-4 space-y-2" style={{ borderTop: "1px solid var(--color-divider-soft)" }}>
        {sku.fabricRaw && (
          <div className="t-caption" style={{ color: "var(--color-ink-muted-80)" }}>
            <span className="t-mono" style={{ color: "var(--color-ink-muted-48)" }}>
              {t.movin.sku_fabric}:
            </span>{" "}
            {sku.fabricRaw}
          </div>
        )}
        {sku.colors.length > 0 && (
          <div className="t-caption flex flex-wrap gap-1.5 items-center">
            <span className="t-mono" style={{ color: "var(--color-ink-muted-48)" }}>
              {t.movin.sku_colors}:
            </span>
            {sku.colors.map((c) => {
              const cls = sku.colorClassification?.find((cc) => cc.raw === c);
              const bg = cls?.isAllowed
                ? "var(--grade-a)"
                : cls?.risk === "unclassified"
                ? "var(--color-hairline-strong)"
                : "var(--color-brick-red)";
              return (
                <span
                  key={c}
                  title={cls?.stCategory || cls?.risk || "?"}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 7px",
                    borderRadius: 9999,
                    background: bg,
                    color: "#fff",
                  }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* 위반/권장 항목 — severity별 톤 차별화 */}
      {sku.violations.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {sku.violations.slice(0, 3).map((v, i) => {
            const sevMap: Record<string, { color: string; label: string; bg: string }> = {
              high: { color: "var(--color-brick-red)", label: "HIGH", bg: "rgba(220,38,38,0.05)" },
              mid: { color: "var(--status-warn)", label: "MID", bg: "rgba(217,119,6,0.05)" },
              low: { color: "var(--color-ink-muted-48)", label: "LOW", bg: "var(--color-canvas-soft)" },
              info: { color: "var(--status-info)", label: "권장", bg: "rgba(37,99,235,0.05)" },
            };
            const sev = sevMap[v.severity] || sevMap.low;
            return (
              <div
                key={i}
                className="flex items-start gap-2 t-caption"
                style={{
                  padding: "6px 8px",
                  background: sev.bg,
                  borderRadius: 6,
                  borderLeft: `2px solid ${sev.color}`,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#fff",
                    background: sev.color,
                    padding: "1px 5px",
                    borderRadius: 3,
                    letterSpacing: 0.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  {sev.label}
                </span>
                <span style={{ color: "var(--color-ink-muted-80)", lineHeight: 1.5 }}>
                  {v.issue}
                </span>
              </div>
            );
          })}
          {sku.violations.length > 3 && (
            <div className="t-caption" style={{ color: "var(--color-ink-muted-48)" }}>
              {t.movin.sku_more(sku.violations.length - 3)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * Helpers
 * ============================================================ */
function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: string;
}) {
  return (
    <div
      className="p-3"
      style={{
        background: "var(--color-canvas)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="t-label" style={{ fontSize: 9 }}>
        {label}
      </div>
      <div
        className="mt-1 flex items-baseline gap-1.5"
        style={{
          fontFamily: "var(--font-display)",
          color: accent || "var(--color-ink)",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{value}</span>
        {suffix && (
          <span
            style={{
              fontSize: 11,
              color: "var(--color-ink-muted-48)",
              fontWeight: 500,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between t-caption">
      <span style={{ color: "var(--color-ink-muted-48)" }}>{label}</span>
      <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function pct(part: number, total: number) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
