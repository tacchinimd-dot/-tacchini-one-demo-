"use client";

/* ============================================================
 * /atelier/studio — AI Design Studio (6 step flow)
 *
 * 1. BRIEF       — 시즌·카테고리·키워드 입력 (디폴트 채워짐)
 * 2. SOURCE      — 4 소스에서 60장 트렌드 이미지 mosaic-in
 * 3. DNA FILTER  — 5 Pillars 자동 평가 → 좌/우 분리 (A·B / C·D)
 * 4. CURATE      — 통과 14장에서 3장 선택 (AI 추천)
 * 5. GENERATE    — 각 reference × 3 variant 페이드인 (9장 신규)
 * 6. LINEUP      — A/B/C 분포 + Inspector 인계 CTA
 *
 * Mock data: src/lib/studio-data.ts
 * Animations: stagger fade-in, card swipe, mosaic, count-up
 * ============================================================ */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/console/Sidebar";
import LoginGate from "@/components/auth/LoginGate";
import ApparelIcon from "@/components/atelier/ApparelIcon";
import { useLang } from "@/lib/i18n/LanguageProvider";
import {
  STUDIO_TREND_POOL,
  STUDIO_GENERATED,
  STUDIO_BRIEF,
  STUDIO_OPTIONS,
  STUDIO_SOURCES,
  STUDIO_CURATED_IDS,
  STUDIO_SUMMARY,
  type TrendImage,
  type GeneratedDesign,
  type Verdict,
  type StudioBrief,
} from "@/lib/studio-data";

type StudioStep = "brief" | "source" | "filter" | "curate" | "generate" | "lineup";

const VERDICT_COLOR: Record<Verdict, { bg: string; fg: string; label: string }> = {
  A: { bg: "var(--grade-a)", fg: "#fff", label: "A" },
  B: { bg: "var(--color-primary)", fg: "#fff", label: "B" },
  C: { bg: "var(--grade-b)", fg: "#fff", label: "C" },
  D: { bg: "var(--grade-c)", fg: "#fff", label: "D" },
};

export default function StudioRoute() {
  return (
    <LoginGate>
      <Studio />
    </LoginGate>
  );
}

function Studio() {
  const [step, setStep] = useState<StudioStep>("brief");
  const [selectedRefs, setSelectedRefs] = useState<string[]>([]);
  const [brief, setBrief] = useState<StudioBrief>(STUDIO_BRIEF);

  /* Step 4 진입 시 AI 추천 자동 선택 */
  useEffect(() => {
    if (step === "curate" && selectedRefs.length === 0) {
      setSelectedRefs(STUDIO_CURATED_IDS);
    }
  }, [step, selectedRefs.length]);

  function resetFlow() {
    setStep("brief");
    setSelectedRefs([]);
    setBrief(STUDIO_BRIEF);
  }

  return (
    <div className="console-shell">
      <Sidebar active="studio" />
      <div className="console-main">
        <Header step={step} onReset={resetFlow} />
        <div className="console-pad">
          <div className="animate-fade-in" key={step}>
            {step === "brief" && (
              <BriefStep brief={brief} setBrief={setBrief} onStart={() => setStep("source")} />
            )}
            {step === "source" && <SourceStep brief={brief} onDone={() => setStep("filter")} />}
            {step === "filter" && <FilterStep brief={brief} onDone={() => setStep("curate")} />}
            {step === "curate" && (
              <CurateStep
                brief={brief}
                selectedRefs={selectedRefs}
                onToggle={(id) =>
                  setSelectedRefs((prev) =>
                    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                  )
                }
                onNext={() => setStep("generate")}
              />
            )}
            {step === "generate" && (
              <GenerateStep brief={brief} onDone={() => setStep("lineup")} />
            )}
            {step === "lineup" && <LineupStep brief={brief} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * Filter Chip Strip — 현재 선택된 brief 요약을 모든 step 상단에 표시
 * ============================================================ */
function BriefSummary({ brief }: { brief: StudioBrief }) {
  const { t } = useLang();
  const chips: { label: string; value: string }[] = [
    { label: t.studio.brief_season, value: brief.season },
    { label: t.studio.brief_subcategory, value: brief.item },
    { label: t.studio.brief_gender, value: brief.target },
    { label: t.studio.brief_count, value: `${brief.referenceCount}` },
  ];
  return (
    <div
      className="flex items-center flex-wrap gap-1.5"
      style={{ marginBottom: 12 }}
    >
      {chips.map((c) => (
        <span
          key={c.label}
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            padding: "3px 9px",
            background: "var(--color-canvas-soft)",
            border: "1px solid var(--color-hairline)",
            borderRadius: 9999,
            color: "var(--color-ink-muted-80)",
            letterSpacing: 0.3,
          }}
        >
          <span
            className="t-mono"
            style={{ color: "var(--color-ink-muted-48)", marginRight: 6, fontSize: 9 }}
          >
            {c.label.toUpperCase()}
          </span>
          <span style={{ fontWeight: 700, color: "var(--color-ink)" }}>{c.value}</span>
        </span>
      ))}
      {brief.moodKeyword && (
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            padding: "3px 9px",
            background: "rgba(0,44,95,0.06)",
            border: "1px solid rgba(0,44,95,0.18)",
            borderRadius: 9999,
            color: "var(--color-primary)",
            letterSpacing: 0.3,
          }}
        >
          ✦ {brief.moodKeyword}
        </span>
      )}
    </div>
  );
}

/* ============================================================
 * Header — breadcrumb + step indicator
 * ============================================================ */
function Header({ step, onReset }: { step: StudioStep; onReset: () => void }) {
  const { t } = useLang();
  const stepLabels: Record<StudioStep, string> = {
    brief: t.studio.step_brief,
    source: t.studio.step_source,
    filter: t.studio.step_filter,
    curate: t.studio.step_curate,
    generate: t.studio.step_generate,
    lineup: t.studio.step_lineup,
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
          <span style={{ color: "var(--color-ink)" }}>{t.studio.breadcrumb}</span>
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
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="h-display-md">{t.studio.header_title}</h1>
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
              {t.studio.live_prototype}
            </span>
          </div>
          <p
            className="mt-1"
            style={{ color: "var(--color-ink-muted-48)", fontSize: 13 }}
          >
            {t.studio.header_subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/atelier/codex" className="btn btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            5 Pillars
          </Link>
          {step !== "brief" && (
            <button onClick={onReset} className="btn btn-ghost">
              {t.studio.reset_flow}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * STEP 1 — BRIEF
 * ============================================================ */
function BriefStep({
  brief,
  setBrief,
  onStart,
}: {
  brief: StudioBrief;
  setBrief: (b: StudioBrief) => void;
  onStart: () => void;
}) {
  const { t } = useLang();

  function update<K extends keyof StudioBrief>(key: K, value: StudioBrief[K]) {
    setBrief({ ...brief, [key]: value });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card" style={{ padding: 32 }}>
        <div className="t-label">{t.studio.step1_label}</div>
        <h2 className="h-display-md mt-2">{t.studio.step1_title}</h2>
        <p
          className="mt-2"
          style={{
            color: "var(--color-ink-muted-80)",
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          {t.studio.step1_body}
        </p>

        <div className="mt-6 grid gap-4 grid-cols-2">
          <BriefSelect
            label={t.studio.brief_season}
            value={brief.season}
            options={STUDIO_OPTIONS.seasons as readonly string[]}
            onChange={(v) => update("season", v as StudioBrief["season"])}
          />
          <BriefSelect
            label={t.studio.brief_subcategory}
            value={brief.item}
            options={STUDIO_OPTIONS.items as readonly string[]}
            onChange={(v) => update("item", v as StudioBrief["item"])}
          />
          <BriefSelect
            label={t.studio.brief_gender}
            value={brief.target}
            options={STUDIO_OPTIONS.targets as readonly string[]}
            onChange={(v) => update("target", v as StudioBrief["target"])}
          />
          <BriefSelect
            label={t.studio.brief_count}
            value={`${brief.referenceCount}`}
            options={STUDIO_OPTIONS.counts.map((n) => `${n}`)}
            onChange={(v) =>
              update("referenceCount", Number(v) as StudioBrief["referenceCount"])
            }
          />
          <div style={{ gridColumn: "1 / -1" }}>
            <BriefInput
              label={t.studio.brief_mood}
              value={brief.moodKeyword}
              onChange={(v) => update("moodKeyword", v)}
            />
          </div>
        </div>

        {/* 두 슬라이더 */}
        <div className="mt-6 space-y-5">
          <SliderField
            label={t.studio.brief_strictness}
            value={brief.dnaStrictness}
            leftLabel={t.studio.strictness_low}
            rightLabel={t.studio.strictness_high}
          />
          <SliderField
            label={t.studio.brief_boldness}
            value={brief.variantBoldness}
            leftLabel={t.studio.boldness_low}
            rightLabel={t.studio.boldness_high}
          />
        </div>

        <button onClick={onStart} className="btn btn-primary btn-lg mt-8 w-full">
          {t.studio.start_crawl}
        </button>
      </div>

      <div className="space-y-4">
        <div className="card" style={{ padding: 20 }}>
          <div className="t-label">{t.studio.step2_sources}</div>
          <ul className="mt-3 space-y-2.5 t-caption">
            {(Object.values(STUDIO_SOURCES) as { id: string; label: string; iconColor: string; count: number }[]).map(
              (s) => (
                <li key={s.id} className="flex items-center gap-2.5">
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: s.iconColor,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1, fontWeight: 600 }}>{s.label}</span>
                  <span
                    className="t-mono"
                    style={{
                      fontSize: 10,
                      color: "var(--color-ink-muted-48)",
                    }}
                  >
                    {s.count}
                  </span>
                </li>
              ),
            )}
          </ul>
          <div
            className="mt-4 pt-3 t-caption"
            style={{
              borderTop: "1px dashed var(--color-hairline)",
              color: "var(--color-ink-muted-48)",
            }}
          >
            {t.studio.crawled_count(STUDIO_SUMMARY.crawled)}
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="card-flat" style={{ padding: 12, position: "relative" }}>
      <div className="t-label">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          marginTop: 4,
          padding: "2px 0",
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.2,
          color: "var(--color-ink)",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          paddingRight: 22,
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          marginTop: 4,
          color: "var(--color-ink-muted-48)",
          fontSize: 12,
          pointerEvents: "none",
        }}
      >
        ▾
      </span>
    </div>
  );
}

function BriefInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="card-flat" style={{ padding: 16 }}>
      <div className="t-label">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          marginTop: 4,
          padding: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.2,
          color: "var(--color-ink)",
        }}
      />
    </div>
  );
}

function SliderField({
  label,
  value,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between t-label mb-2">
        <span>{label}</span>
        <span className="t-mono" style={{ color: "var(--color-primary)" }}>
          {Math.round(value * 100)}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 9999,
          background: "var(--color-hairline)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${value * 100}%`,
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-accent-gold))",
            borderRadius: 9999,
            transition: "width 600ms ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -2,
            left: `calc(${value * 100}% - 5px)`,
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: "#fff",
            border: "2px solid var(--color-primary)",
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5 t-caption" style={{ color: "var(--color-ink-muted-48)" }}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

/* ============================================================
 * STEP 2 — SOURCE (Mosaic-in)
 * ============================================================ */
function SourceStep({ brief, onDone }: { brief: StudioBrief; onDone: () => void }) {
  const { t } = useLang();
  const [visibleCount, setVisibleCount] = useState(0);
  const total = STUDIO_TREND_POOL.length;
  const sourcesCount = Object.keys(STUDIO_SOURCES).length;
  void brief; /* 향후 실제 크롤링 파라미터로 사용 */

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= total) {
          clearInterval(interval);
          setTimeout(onDone, 800);
          return total;
        }
        return Math.min(c + 3, total);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-5">
      <div className="card" style={{ padding: 24 }}>
        <BriefSummary brief={brief} />
        <div className="flex items-start justify-between">
          <div>
            <div className="t-label">{t.studio.step2_label}</div>
            <h2 className="h-display-md mt-2">{t.studio.step2_title}</h2>
            <p
              className="mt-2"
              style={{ color: "var(--color-ink-muted-80)", fontSize: 14 }}
            >
              {t.studio.step2_body(total, sourcesCount)}
            </p>
          </div>
          <div
            className="t-mono"
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {visibleCount} / {total}
          </div>
        </div>
      </div>

      <TrendGrid pool={STUDIO_TREND_POOL.slice(0, visibleCount)} mode="all" />
    </div>
  );
}

/* ============================================================
 * STEP 3 — DNA FILTER
 * ============================================================ */
function FilterStep({ brief, onDone }: { brief: StudioBrief; onDone: () => void }) {
  const { t } = useLang();
  const total = STUDIO_TREND_POOL.length;
  const passed = STUDIO_TREND_POOL.filter((t) => t.verdict === "A" || t.verdict === "B");
  const [phase, setPhase] = useState<"animating" | "settled">("animating");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("settled"), 2200);
    const next = setTimeout(() => onDone(), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(next);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-5">
      <div className="card" style={{ padding: 24 }}>
        <BriefSummary brief={brief} />
        <div className="flex items-start justify-between">
          <div>
            <div className="t-label">{t.studio.step3_label}</div>
            <h2 className="h-display-md mt-2">{t.studio.step3_title}</h2>
            <p
              className="mt-2"
              style={{ color: "var(--color-ink-muted-80)", fontSize: 14 }}
            >
              {t.studio.step3_body(total)}
            </p>
          </div>
          <div className="text-right">
            <div
              className="t-mono"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "var(--status-ok)",
                fontFamily: "var(--font-display)",
              }}
            >
              {passed.length}
              <span
                style={{ fontSize: 16, color: "var(--color-ink-muted-48)" }}
              >
                {" "}/ {total}
              </span>
            </div>
            <div
              className="t-caption mt-1"
              style={{ color: "var(--color-ink-muted-48)" }}
            >
              {phase === "animating" ? t.studio.filter_running : t.studio.filter_summary(passed.length, total)}
            </div>
          </div>
        </div>
      </div>

      {/* 통과 그룹 */}
      <div>
        <div
          className="t-label mb-3 flex items-center gap-2"
          style={{ color: "var(--status-ok)" }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "var(--status-ok)",
            }}
          />
          {t.studio.filter_passed} · {passed.length}
        </div>
        <TrendGrid pool={passed} mode="passed" />
      </div>

      {/* 미달 그룹 */}
      <div>
        <div
          className="t-label mb-3 flex items-center gap-2"
          style={{ color: "var(--color-ink-muted-48)" }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "var(--color-ink-muted-48)",
            }}
          />
          {t.studio.filter_rejected} ·{" "}
          {STUDIO_TREND_POOL.length - passed.length}
        </div>
        <TrendGrid
          pool={STUDIO_TREND_POOL.filter(
            (t) => t.verdict === "C" || t.verdict === "D",
          )}
          mode="rejected"
        />
      </div>
    </div>
  );
}

/* ============================================================
 * STEP 4 — CURATE
 * ============================================================ */
function CurateStep({
  brief,
  selectedRefs,
  onToggle,
  onNext,
}: {
  brief: StudioBrief;
  selectedRefs: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}) {
  const { t } = useLang();
  const passed = useMemo(
    () => STUDIO_TREND_POOL.filter((tr) => tr.verdict === "A" || tr.verdict === "B"),
    [],
  );
  /* AI 추천 (STUDIO_CURATED_IDS) 우선 정렬 */
  const sorted = useMemo(
    () =>
      [...passed].sort((a, b) => {
        const aRec = STUDIO_CURATED_IDS.includes(a.id) ? 0 : 1;
        const bRec = STUDIO_CURATED_IDS.includes(b.id) ? 0 : 1;
        if (aRec !== bRec) return aRec - bRec;
        /* 그 다음 verdict A 우선 */
        if (a.verdict !== b.verdict) {
          return a.verdict === "A" ? -1 : 1;
        }
        return 0;
      }),
    [passed],
  );
  const max = 5;
  return (
    <div className="space-y-5">
      <div className="card" style={{ padding: 24 }}>
        <BriefSummary brief={brief} />
        <div className="flex items-start justify-between">
          <div>
            <div className="t-label">{t.studio.step4_label}</div>
            <h2 className="h-display-md mt-2">{t.studio.step4_title}</h2>
            <p
              className="mt-2"
              style={{ color: "var(--color-ink-muted-80)", fontSize: 14 }}
            >
              {t.studio.step4_body}
            </p>
          </div>
          <div className="text-right">
            <div
              className="t-mono"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "var(--color-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              {t.studio.selected_count(selectedRefs.length, max)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((trend) => (
          <CurateCard
            key={trend.id}
            trend={trend}
            selected={selectedRefs.includes(trend.id)}
            recommended={STUDIO_CURATED_IDS.includes(trend.id)}
            onClick={() => onToggle(trend.id)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={selectedRefs.length === 0}
          className="btn btn-primary btn-lg"
          style={{
            opacity: selectedRefs.length === 0 ? 0.5 : 1,
            cursor: selectedRefs.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          {t.studio.generate_variants}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
 * STEP 5 — GENERATE
 * ============================================================ */
function GenerateStep({ brief, onDone }: { brief: StudioBrief; onDone: () => void }) {
  const { t } = useLang();
  const [revealedCount, setRevealedCount] = useState(0);
  const total = STUDIO_GENERATED.length;
  void brief;

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealedCount((c) => {
        if (c >= total) {
          clearInterval(interval);
          setTimeout(onDone, 1200);
          return total;
        }
        return c + 1;
      });
    }, 350);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* reference별로 그룹 */
  const byRef = useMemo(() => {
    const groups: Record<string, GeneratedDesign[]> = {};
    for (const d of STUDIO_GENERATED) {
      if (!groups[d.referenceId]) groups[d.referenceId] = [];
      groups[d.referenceId].push(d);
    }
    return groups;
  }, []);

  return (
    <div className="space-y-5">
      <div className="card" style={{ padding: 24 }}>
        <BriefSummary brief={brief} />
        <div className="flex items-start justify-between">
          <div>
            <div className="t-label">{t.studio.step5_label}</div>
            <h2 className="h-display-md mt-2">{t.studio.step5_title}</h2>
            <p
              className="mt-2"
              style={{
                color: "var(--color-ink-muted-80)",
                fontSize: 14,
                maxWidth: 640,
                lineHeight: 1.55,
              }}
            >
              {t.studio.step5_body}
            </p>
          </div>
          <div className="text-right">
            <div
              className="t-mono"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "var(--color-accent-gold)",
                fontFamily: "var(--font-display)",
              }}
            >
              {revealedCount} / {total}
            </div>
            <div
              className="t-caption mt-1"
              style={{ color: "var(--color-ink-muted-48)" }}
            >
              {revealedCount < total ? t.studio.generating : "✓"}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(byRef).map(([refId, designs]) => {
          const ref = STUDIO_TREND_POOL.find((tr) => tr.id === refId);
          if (!ref) return null;
          return (
            <div
              key={refId}
              className="card"
              style={{ padding: 20, overflow: "hidden" }}
            >
              <div className="flex items-center gap-5">
                {/* Reference */}
                <div className="flex items-center gap-3" style={{ minWidth: 240 }}>
                  <ImageCard trend={ref} size={84} />
                  <div>
                    <div className="t-label">Reference</div>
                    <div
                      className="mt-0.5"
                      style={{ fontSize: 13, fontWeight: 700 }}
                    >
                      {ref.category}
                    </div>
                    <div
                      className="t-caption"
                      style={{ color: "var(--color-ink-muted-48)" }}
                    >
                      {ref.moodLabel}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 22,
                    color: "var(--color-ink-muted-48)",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>

                {/* Variants */}
                <div className="flex-1 grid grid-cols-3 gap-3">
                  {designs.map((d, i) => {
                    const idx = STUDIO_GENERATED.findIndex(
                      (g) => g.id === d.id,
                    );
                    const visible = idx < revealedCount;
                    return (
                      <GeneratedCard
                        key={d.id}
                        design={d}
                        visible={visible}
                        delay={i * 80}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
 * STEP 6 — LINEUP
 * ============================================================ */
function LineupStep({ brief }: { brief: StudioBrief }) {
  const { t, lang } = useLang();
  const a = STUDIO_GENERATED.filter((d) => d.verdict === "A");
  const b = STUDIO_GENERATED.filter((d) => d.verdict === "B");
  const c = STUDIO_GENERATED.filter((d) => d.verdict === "C");
  const d = STUDIO_GENERATED.filter((d) => d.verdict === "D");
  const recommended = [...a, ...b];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "16px 28px 0",
          }}
        >
          <BriefSummary brief={brief} />
        </div>
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
                background:
                  "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-red))",
                color: "#fff",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>
                {STUDIO_GENERATED.length}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  marginTop: 4,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Designs
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="t-label">{t.studio.step6_label}</div>
              <h2 className="h-display-md mt-2">{t.studio.step6_title}</h2>
              <p
                className="mt-2"
                style={{ color: "var(--color-ink-muted-80)", fontSize: 14 }}
              >
                {t.studio.step6_body}
              </p>

              <div className="mt-4 grid gap-3 grid-cols-4">
                <SimpleStat
                  label="A"
                  value={a.length}
                  color={VERDICT_COLOR.A.bg}
                />
                <SimpleStat
                  label="B"
                  value={b.length}
                  color={VERDICT_COLOR.B.bg}
                />
                <SimpleStat
                  label="C"
                  value={c.length}
                  color={VERDICT_COLOR.C.bg}
                />
                <SimpleStat
                  label="D"
                  value={d.length}
                  color={VERDICT_COLOR.D.bg}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distribution bar */}
        <div className="px-7 pb-5 pt-3">
          <div
            className="t-label mb-2"
            style={{ color: "var(--color-ink-muted-48)" }}
          >
            {t.studio.lineup_distribution}
          </div>
          <div
            className="flex w-full overflow-hidden"
            style={{ height: 12, borderRadius: 6 }}
          >
            {(["A", "B", "C", "D"] as const).map((g) => {
              const cnt = STUDIO_GENERATED.filter((x) => x.verdict === g).length;
              if (cnt === 0) return null;
              return (
                <div
                  key={g}
                  title={`${g}: ${cnt}`}
                  style={{
                    width: `${(cnt / STUDIO_GENERATED.length) * 100}%`,
                    background: VERDICT_COLOR[g].bg,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Lineup recommendation */}
      <div
        className="card"
        style={{
          padding: 24,
          background:
            "linear-gradient(135deg, var(--color-cream-white) 0%, var(--color-canvas) 100%)",
          borderColor: "var(--color-accent-gold)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="t-label" style={{ color: "var(--color-accent-gold)" }}>
              LINEUP RECOMMENDATION
            </div>
            <h3 className="h-tagline mt-1">{t.studio.lineup_recommend_title}</h3>
            <p
              className="mt-2"
              style={{
                fontSize: 13,
                color: "var(--color-ink-muted-80)",
                lineHeight: 1.55,
                maxWidth: 720,
              }}
            >
              {t.studio.lineup_recommend_body}
            </p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {recommended.map((design) => (
            <GeneratedCard key={design.id} design={design} visible compact />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-end">
          <button className="btn btn-ghost">{t.studio.save_library}</button>
          <Link href="/atelier/inspector/movin" className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            {t.studio.send_to_inspector}
          </Link>
        </div>
      </div>

      {/* Below-bar — C/D designs */}
      {(c.length > 0 || d.length > 0) && (
        <div className="card" style={{ padding: 20 }}>
          <div className="t-label mb-3">
            Other generated designs
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...c, ...d].map((design) => (
              <GeneratedCard key={design.id} design={design} visible compact muted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * Sub-components — TrendGrid, ImageCard, CurateCard, GeneratedCard
 * ============================================================ */
function TrendGrid({
  pool,
  mode,
}: {
  pool: TrendImage[];
  mode: "all" | "passed" | "rejected";
}) {
  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      }}
    >
      {pool.map((trend, i) => (
        <ImageCard
          key={trend.id}
          trend={trend}
          mode={mode}
          delay={i * 18}
          showBadge
        />
      ))}
    </div>
  );
}

function ImageCard({
  trend,
  mode = "all",
  size,
  delay = 0,
  showBadge,
}: {
  trend: TrendImage;
  mode?: "all" | "passed" | "rejected";
  size?: number;
  delay?: number;
  showBadge?: boolean;
}) {
  const muted = mode === "rejected";
  const verdict = trend.verdict;

  return (
    <div
      className="animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        position: "relative",
        background: trend.bgColor,
        borderRadius: 10,
        overflow: "hidden",
        aspectRatio: size ? undefined : "3 / 4",
        width: size,
        height: size ? size : undefined,
        opacity: muted ? 0.4 : 1,
        filter: muted ? "grayscale(0.6)" : "none",
        transition: "opacity 400ms ease, filter 400ms ease",
        border: muted ? "1px solid var(--color-hairline)" : "none",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          color: trend.accentColor,
        }}
      >
        <ApparelIcon type={trend.apparelType} size={size ? size * 0.65 : 60} color={trend.accentColor} />
      </div>

      {/* Bottom label */}
      {!size && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "6px 8px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
            color: trend.textColor,
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          <div className="truncate">{trend.category}</div>
          <div className="truncate" style={{ fontSize: 8, opacity: 0.78 }}>
            {trend.moodLabel}
          </div>
        </div>
      )}

      {/* Verdict badge */}
      {showBadge && !muted && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 22,
            height: 22,
            borderRadius: 6,
            background: VERDICT_COLOR[verdict].bg,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          {verdict}
        </span>
      )}
    </div>
  );
}

function CurateCard({
  trend,
  selected,
  recommended,
  onClick,
}: {
  trend: TrendImage;
  selected: boolean;
  recommended: boolean;
  onClick: () => void;
}) {
  const { t } = useLang();
  return (
    <button
      onClick={onClick}
      className="text-left animate-fade-in"
      style={{
        background: "var(--color-canvas)",
        border: selected
          ? "2px solid var(--color-primary)"
          : "1px solid var(--color-hairline)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: selected ? "0 8px 24px rgba(0, 44, 95, 0.20)" : "none",
        transition: "all 200ms ease",
        padding: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          background: trend.bgColor,
          aspectRatio: "3 / 4",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "100%", height: "100%" }}
        >
          <ApparelIcon
            type={trend.apparelType}
            size={88}
            color={trend.accentColor}
          />
        </div>
        {recommended && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              fontSize: 9,
              fontWeight: 800,
              color: "#0a0a14",
              background: "var(--color-accent-gold)",
              padding: "2px 7px",
              borderRadius: 9999,
              letterSpacing: 0.5,
            }}
          >
            ★ {t.studio.ai_recommended}
          </span>
        )}
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 6,
            background: VERDICT_COLOR[trend.verdict].bg,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {trend.verdict}
        </span>
        {selected && (
          <span
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 26,
              height: 26,
              borderRadius: 9999,
              background: "var(--color-primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            ✓
          </span>
        )}
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{trend.category}</div>
        <div
          className="t-caption mt-0.5"
          style={{ color: "var(--color-ink-muted-48)" }}
        >
          {trend.moodLabel}
        </div>

        {/* Mini pillar bars */}
        <div className="mt-3 flex items-end gap-0.5" style={{ height: 24 }}>
          {(["P1", "P2", "P3", "P4", "P5"] as const).map((p) => {
            const score = trend.pillarScores[p];
            const isFail = score < 60;
            return (
              <div
                key={p}
                title={`${p}: ${score}`}
                style={{
                  flex: 1,
                  height: `${(score / 100) * 100}%`,
                  minHeight: 3,
                  background: isFail
                    ? "var(--color-brick-red)"
                    : "var(--color-primary)",
                  borderRadius: 2,
                }}
              />
            );
          })}
        </div>
        <div
          className="t-caption mt-2"
          style={{ color: "var(--color-ink-muted-48)", lineHeight: 1.4 }}
        >
          {trend.aiComment}
        </div>
      </div>
    </button>
  );
}

function GeneratedCard({
  design,
  visible,
  delay = 0,
  compact,
  muted,
}: {
  design: GeneratedDesign;
  visible: boolean;
  delay?: number;
  compact?: boolean;
  muted?: boolean;
}) {
  const { t } = useLang();
  if (!visible) {
    return (
      <div
        style={{
          background: "var(--color-canvas-soft)",
          border: "1px dashed var(--color-hairline)",
          borderRadius: 12,
          aspectRatio: compact ? "3 / 4" : "1 / 1",
        }}
      />
    );
  }

  return (
    <div
      className="animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        background: "var(--color-canvas)",
        border: "1px solid var(--color-hairline)",
        borderRadius: 12,
        overflow: "hidden",
        opacity: muted ? 0.6 : 1,
      }}
    >
      <div
        style={{
          position: "relative",
          background: design.bgColor,
          aspectRatio: compact ? "3 / 4" : "1 / 1",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "100%", height: "100%" }}
        >
          <ApparelIcon
            type={design.apparelType}
            size={compact ? 70 : 90}
            color={design.accentColor}
          />
        </div>
        <span
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            fontSize: 8,
            fontWeight: 800,
            color: "#0a0a14",
            background: "var(--color-accent-gold)",
            padding: "1px 6px",
            borderRadius: 9999,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          AI
        </span>
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            borderRadius: 5,
            background: VERDICT_COLOR[design.verdict].bg,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 800,
          }}
        >
          {design.verdict}
        </span>
      </div>

      {!compact && (
        <div style={{ padding: 12 }}>
          <div className="t-label">{design.variantLabel}</div>
          <div className="mt-1.5 space-y-0.5 t-caption" style={{ fontSize: 10, lineHeight: 1.4 }}>
            <Transform k={t.studio.transform_color} v={`${design.transforms.colorFrom} → ${design.transforms.colorTo}`} />
            <Transform k={t.studio.transform_fit} v={design.transforms.fitTo} />
            <Transform k={t.studio.transform_logo} v={design.transforms.logoPlacement} />
            <Transform k={t.studio.transform_fabric} v={design.transforms.fabric} />
            {design.transforms.heritage && (
              <Transform k={t.studio.transform_heritage} v={design.transforms.heritage} />
            )}
          </div>
          <p
            className="t-caption mt-2"
            style={{
              color: "var(--color-ink-muted-80)",
              lineHeight: 1.4,
              fontSize: 11,
            }}
          >
            {design.aiNote}
          </p>
        </div>
      )}

      {compact && (
        <div style={{ padding: 8 }}>
          <div className="t-caption" style={{ fontSize: 10, fontWeight: 600 }}>
            {design.category}
          </div>
          <div
            className="t-caption"
            style={{ fontSize: 9, color: "var(--color-ink-muted-48)" }}
          >
            {design.variantLabel}
          </div>
        </div>
      )}
    </div>
  );
}

function Transform({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        style={{
          color: "var(--color-ink-muted-48)",
          fontWeight: 500,
          minWidth: 42,
          flexShrink: 0,
        }}
      >
        {k}
      </span>
      <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>{v}</span>
    </div>
  );
}

function SimpleStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        padding: 12,
        background: "var(--color-canvas)",
        border: "1px solid var(--color-hairline)",
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      <div
        className="t-mono"
        style={{
          fontSize: 22,
          fontWeight: 800,
          color,
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
      <div className="t-label mt-1">{label}</div>
    </div>
  );
}
