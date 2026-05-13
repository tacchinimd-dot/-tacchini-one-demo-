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

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import { MOVIN_LINES, MOVIN_OVERALL, type MovinLine, type MovinSKU } from "@/lib/movin-data";
import { useLang } from "@/lib/i18n/LanguageProvider";

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
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  return (
    <div className="console-shell">
      <Sidebar active="inspector" />
      <div className="console-main">
        <HeaderBar selectedLine={selectedLine} onBack={() => setSelectedLine(null)} />
        <div className="console-pad space-y-6">
          <OverallCard />
          {!selectedLine ? (
            <LinesGrid onSelect={setSelectedLine} />
          ) : (
            <LineDetail line={selectedLine} onBack={() => setSelectedLine(null)} />
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
  selectedLine,
  onBack,
}: {
  selectedLine: string | null;
  onBack: () => void;
}) {
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
            Inspector
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--color-ink)" }}>Sugi France · 27SS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="t-mono">{MOVIN_OVERALL.totalSKU} SKUs auto-inspected</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="h-display-md">Sugi France · 27SS Lifestyle Man</h1>
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
              LIVE PROTOTYPE
            </span>
          </div>
          <p
            className="mt-1"
            style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}
          >
            라이센시 PDF 6개 자동 파싱 · 5 Pillars 검수 룰 · Brandbook 2026 기반
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedLine && (
            <button onClick={onBack} className="btn btn-ghost">
              ← 라인 목록
            </button>
          )}
          <Link href="/atelier/inspector" className="btn btn-ghost">
            Sugi France 데모로
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * 라이센시 종합 카드 (상단)
 * ============================================================ */
function OverallCard() {
  const v = VERDICT_COLOR[MOVIN_OVERALL.grade];
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
              {v.label}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="t-label">Licensee Verdict · Submission Summary</div>
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
              Total {MOVIN_OVERALL.totalSKU} SKUs across {MOVIN_OVERALL.totalLines} lines ·
              Inspected {new Date(MOVIN_OVERALL.generatedAt).toLocaleString("ko-KR")}
            </div>

            <div className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-4">
              <Stat label="평균 등급 점수" value={MOVIN_OVERALL.averagePoint.toFixed(2)} suffix="/ 4.0" />
              <Stat
                label="A · Approve"
                value={String(MOVIN_OVERALL.distribution.A)}
                accent="var(--grade-a)"
                suffix={`(${pct(MOVIN_OVERALL.distribution.A, MOVIN_OVERALL.totalSKU)}%)`}
              />
              <Stat
                label="B · Conditional"
                value={String(MOVIN_OVERALL.distribution.B)}
                accent="var(--color-primary)"
                suffix={`(${pct(MOVIN_OVERALL.distribution.B, MOVIN_OVERALL.totalSKU)}%)`}
              />
              <Stat
                label="C / D · Revise·Reject"
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
  const d = MOVIN_OVERALL.distribution;
  const t = MOVIN_OVERALL.totalSKU;
  return (
    <div className="px-7 pb-5 pt-3">
      <div className="t-label mb-2" style={{ color: "var(--color-ink-muted-48)" }}>
        Verdict Distribution
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
                width: `${(v / t) * 100}%`,
                background: VERDICT_COLOR[g].bg,
              }}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-2 t-caption">
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
              {g} · {VERDICT_COLOR[g].label}
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
  return (
    <div>
      <div className="t-label mb-3" style={{ color: "var(--color-ink-muted-48)" }}>
        6 LINES · Click a line to see SKU details
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
        <Mini label="SKU" value={`${line.totalSKU}개`} />
        <Mini label="평균 점수" value={`${line.averagePoint.toFixed(2)} / 4.0`} />
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
        <span style={{ color: "var(--color-ink-muted-48)" }}>5 Pillars 검수 완료</span>
        <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>SKU 상세 →</span>
      </div>
    </button>
  );
}

/* ============================================================
 * 라인 상세 — SKU 카드 리스트
 * ============================================================ */
function LineDetail({ line, onBack }: { line: string; onBack: () => void }) {
  const data = MOVIN_LINES.find((l) => l.line === line);
  if (!data) return null;
  const v = VERDICT_COLOR[data.grade];

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
            {data.line} Line — {v.label}
          </div>
          <div
            className="t-caption mt-1"
            style={{ color: "var(--color-ink-muted-48)" }}
          >
            {data.gender} · {data.season} · {data.totalSKU} SKUs · 평균{" "}
            {data.averagePoint.toFixed(2)}/4.0
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
              fabric:
            </span>{" "}
            {sku.fabricRaw}
          </div>
        )}
        {sku.colors.length > 0 && (
          <div className="t-caption flex flex-wrap gap-1.5 items-center">
            <span className="t-mono" style={{ color: "var(--color-ink-muted-48)" }}>
              colors:
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
              + {sku.violations.length - 3} more
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
