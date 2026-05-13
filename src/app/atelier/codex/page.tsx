"use client";

/* ============================================================
 * /atelier/codex — 5 Universal Pillars Inspection Guide
 *
 * 라이센시들이 검수 기준을 이해하고 수긍하도록 설계된 단일 페이지.
 *  · Hero — 5 Pillars 도입 + 회전 라파챠 심볼
 *  · Why  — "왜 이 기준인가" (객관성·재현 가능성·Brandbook 근거)
 *  · The 5 Pillars — 각 Pillar 카드 펼침 (sub-rules + 인용)
 *  · AI Process — 단계 시각화 (PDF → Score → Verdict)
 *  · Objectivity — 4 객관성 카드
 *  · Direction + CTA
 *
 * 애니메이션:
 *   · Hero 심볼 회전 / 펄스
 *   · Section reveal on scroll (IntersectionObserver)
 *   · Pillar 카드 staggered fade-in
 *   · Stat 카운트 업
 * ============================================================ */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import LoginGate from "@/components/auth/LoginGate";
import TacchiniSymbol from "@/components/brand/TacchiniSymbol";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { PILLAR_META, type PillarKey } from "@/lib/inspector-mock";

export default function CodexRoute() {
  return (
    <LoginGate>
      <PillarsGuide />
    </LoginGate>
  );
}

function PillarsGuide() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top right, #0a4585 0%, transparent 50%), radial-gradient(ellipse at bottom left, #2a1a3a 0%, transparent 55%), linear-gradient(180deg, #001428 0%, #001a3a 50%, #000814 100%)",
        color: "#fff",
      }}
    >
      <GuideHeader />
      <Hero />
      <WhySection />
      <PillarsGallery />
      <ProcessFlow />
      <ObjectivitySection />
      <DirectionCTA />
    </div>
  );
}

/* ============================================================
 * Header — sticky transparent
 * ============================================================ */
function GuideHeader() {
  const { t } = useLang();
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
              {t.guide.breadcrumb_guide}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle variant="dark" />
          <Link
            href="/atelier/inspector/movin"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.78)",
              padding: "6px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            {t.guide.back_to_inspector}
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * Hero
 * ============================================================ */
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative mx-auto max-w-[1440px] px-8 pt-16 pb-20">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div className="animate-fade-in">
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
                background: "var(--color-accent-gold)",
                boxShadow: "0 0 8px var(--color-accent-gold)",
              }}
            />
            {t.guide.hero_eyebrow}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -0.025 * 64,
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-red), var(--color-accent-gold), var(--color-cream-white))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.guide.hero_title}
            </span>
          </h1>

          <p
            className="mt-6"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 600,
            }}
          >
            {t.guide.hero_subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#pillars"
              style={{
                padding: "12px 22px",
                background: "var(--color-accent-red)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 9999,
                textDecoration: "none",
              }}
            >
              {t.guide.hero_cta_explore}
            </a>
            <Link
              href="/atelier/inspector/movin"
              style={{
                padding: "12px 22px",
                background: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.25)",
                textDecoration: "none",
              }}
            >
              {t.guide.hero_cta_inspector}
            </Link>
          </div>
        </div>

        {/* 회전 + 펄스 라파챠 심볼 */}
        <div className="relative flex items-center justify-center" style={{ minHeight: 460 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="absolute"
              style={{
                width: 280 + i * 70,
                height: 280 + i * 70,
                borderRadius: "50%",
                border: `1px ${i === 1 ? "dashed" : "solid"} rgba(255,255,255,${0.16 - i * 0.04})`,
                animation: `haloRotate ${60 + i * 30}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }}
            />
          ))}
          <span
            aria-hidden
            className="absolute"
            style={{
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(228,0,43,0.20) 0%, rgba(0,44,95,0.12) 40%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
          <div
            className="relative"
            style={{
              color: "var(--color-cream-white)",
              filter: "drop-shadow(0 8px 32px rgba(228, 0, 43, 0.40))",
              animation: "pulseSoft 4s ease-in-out infinite",
            }}
          >
            <TacchiniSymbol size={220} color="currentColor" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Why — 객관성·근거 통계
 * ============================================================ */
function WhySection() {
  const { t } = useLang();
  const stats = [
    { value: t.guide.why_stat_1_value, label: t.guide.why_stat_1_label },
    { value: t.guide.why_stat_2_value, label: t.guide.why_stat_2_label },
    { value: t.guide.why_stat_3_value, label: t.guide.why_stat_3_label },
    { value: t.guide.why_stat_4_value, label: t.guide.why_stat_4_label },
  ];

  return (
    <Reveal>
      <section className="relative mx-auto max-w-[1440px] px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <Label>{t.guide.why_label}</Label>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: -0.025 * 44,
                lineHeight: 1.1,
              }}
            >
              {t.guide.why_title}
            </h2>
            <p
              className="mt-5"
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.66)",
              }}
            >
              {t.guide.why_body}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <CountUpStat key={i} value={s.value} label={s.label} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function CountUpStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <div
      className="animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        padding: 24,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: -0.025 * 48,
          background:
            "linear-gradient(135deg, var(--color-accent-red), var(--color-accent-gold))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        className="mt-2"
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.62)",
          lineHeight: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ============================================================
 * 5 Pillars Gallery — 펼침 가능 카드
 * ============================================================ */
function PillarsGallery() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState<PillarKey | null>(null);

  return (
    <Reveal>
      <section
        id="pillars"
        className="relative mx-auto max-w-[1440px] px-8 py-16"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="text-center mb-12">
          <Label>{t.guide.pillars_label}</Label>
          <h2
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: -0.025 * 44,
              lineHeight: 1.1,
            }}
          >
            {t.guide.pillars_title}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(PILLAR_META) as PillarKey[]).map((p, i) => (
            <PillarCard
              key={p}
              pillarKey={p}
              expanded={expanded === p}
              onToggle={() => setExpanded(expanded === p ? null : p)}
              delay={i * 100}
            />
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function PillarCard({
  pillarKey,
  expanded,
  onToggle,
  delay,
}: {
  pillarKey: PillarKey;
  expanded: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const { t } = useLang();
  const meta = PILLAR_META[pillarKey];
  const isHeavy = pillarKey === "P2";

  return (
    <article
      className="animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        border: isHeavy
          ? "1px solid rgba(228,0,43,0.32)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        overflow: "hidden",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.42)",
            }}
          >
            {pillarKey}
          </span>
          {isHeavy && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#fff",
                background: "var(--color-accent-red)",
                padding: "2px 8px",
                borderRadius: 9999,
                letterSpacing: 0.5,
              }}
            >
              {t.guide.pillar_weight}
            </span>
          )}
        </div>

        <h3
          className="mt-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: -0.3,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {meta.en}
        </h3>
        <div
          className="mt-1"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}
        >
          {meta.ko}
        </div>

        <p
          className="mt-4"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.6,
          }}
        >
          {meta.summary}
        </p>

        <div className="mt-4 flex items-center gap-3 t-mono" style={{ fontSize: 11 }}>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            {t.guide.pillar_pass_threshold}
          </span>
          <span style={{ color: "#fff", fontWeight: 700 }}>{meta.pass}</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            {t.guide.pillar_sub_rules_count(meta.subPillars.length)}
          </span>
        </div>

        <button
          onClick={onToggle}
          className="mt-5 w-full flex items-center justify-between transition-colors"
          style={{
            padding: "10px 12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <span>{expanded ? t.guide.pillar_collapse : t.guide.pillar_expand}</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: "transform 220ms ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div
          className="px-6 pb-6 animate-fade-in"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}
        >
          {meta.brandbookQuote && (
            <blockquote
              style={{
                fontSize: 12,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.62)",
                paddingLeft: 12,
                borderLeft: "2px solid var(--color-accent-gold)",
                lineHeight: 1.5,
              }}
            >
              &ldquo;{meta.brandbookQuote}&rdquo;
            </blockquote>
          )}

          <ul className="mt-4 space-y-2.5">
            {meta.subPillars.map((s) => (
              <li
                key={s.code}
                style={{
                  padding: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="t-mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "var(--color-cream-white)",
                      background: "rgba(255,255,255,0.08)",
                      padding: "1px 6px",
                      borderRadius: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {s.code}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                    {s.title}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.55,
                    paddingLeft: 4,
                  }}
                >
                  {s.rule}
                </div>
                {s.source && (
                  <div
                    className="t-mono mt-1.5"
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.32)",
                      paddingLeft: 4,
                    }}
                  >
                    {s.source}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

/* ============================================================
 * AI Process Flow — 5 단계 시각화
 * ============================================================ */
function ProcessFlow() {
  const { t } = useLang();
  const steps = [
    { title: t.guide.process_step1_title, body: t.guide.process_step1_body, icon: "📄" },
    { title: t.guide.process_step2_title, body: t.guide.process_step2_body, icon: "📊" },
    { title: t.guide.process_step3_title, body: t.guide.process_step3_body, icon: "🎨" },
    { title: t.guide.process_step4_title, body: t.guide.process_step4_body, icon: "⚖️" },
    { title: t.guide.process_step5_title, body: t.guide.process_step5_body, icon: "📝" },
  ];

  return (
    <Reveal>
      <section className="relative mx-auto max-w-[1440px] px-8 py-16">
        <div className="text-center mb-12">
          <Label>{t.guide.process_label}</Label>
          <h2
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: -0.025 * 44,
              lineHeight: 1.1,
            }}
          >
            {t.guide.process_title}
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 640,
            }}
          >
            {t.guide.process_body}
          </p>
        </div>

        {/* 5 step horizontal flow */}
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(5, minmax(180px, 1fr))",
              minWidth: 900,
            }}
          >
            {steps.map((s, i) => (
              <div key={i} className="relative animate-fade-in" style={{
                animationDelay: `${i * 150}ms`,
                animationFillMode: "both",
              }}>
                {/* Connector */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden md:block absolute top-12 -right-2 z-10"
                    style={{ color: "rgba(255,255,255,0.32)", fontSize: 18 }}
                  >
                    →
                  </span>
                )}

                <div
                  className="relative h-full"
                  style={{
                    padding: 18,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="t-mono"
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        color: "rgba(255,255,255,0.42)",
                      }}
                    >
                      STEP {i + 1}
                    </span>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: -0.2,
                      color: "#fff",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ============================================================
 * Objectivity Section — 4 cards
 * ============================================================ */
function ObjectivitySection() {
  const { t } = useLang();
  const cards = [
    { title: t.guide.obj_card_1_title, body: t.guide.obj_card_1_body, accent: "var(--color-accent-red)" },
    { title: t.guide.obj_card_2_title, body: t.guide.obj_card_2_body, accent: "var(--color-accent-gold)" },
    { title: t.guide.obj_card_3_title, body: t.guide.obj_card_3_body, accent: "#4ade80" },
    { title: t.guide.obj_card_4_title, body: t.guide.obj_card_4_body, accent: "var(--color-primary-on-dark)" },
  ];

  return (
    <Reveal>
      <section
        className="relative mx-auto max-w-[1440px] px-8 py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-center mb-12">
          <Label>{t.guide.objectivity_label}</Label>
          <h2
            className="mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: -0.025 * 44,
              lineHeight: 1.1,
            }}
          >
            {t.guide.objectivity_title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 120}ms`,
                animationFillMode: "both",
                padding: 24,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                backdropFilter: "blur(8px)",
                borderTop: `3px solid ${c.accent}`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  color: c.accent,
                  textTransform: "uppercase",
                }}
              >
                0{i + 1}
              </span>
              <h3
                className="mt-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: -0.2,
                  color: "#fff",
                  lineHeight: 1.25,
                }}
              >
                {c.title}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.6,
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

/* ============================================================
 * Direction + CTA
 * ============================================================ */
function DirectionCTA() {
  const { t } = useLang();
  return (
    <Reveal>
      <section className="relative mx-auto max-w-[1100px] px-8 py-20 text-center">
        <Label>{t.guide.direction_label}</Label>
        <h2
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: -0.025 * 52,
            lineHeight: 1.05,
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(90deg, var(--color-cream-white), var(--color-accent-gold), var(--color-accent-red))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.guide.direction_title}
          </span>
        </h2>
        <p
          className="mt-6 mx-auto"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.66)",
            maxWidth: 640,
          }}
        >
          {t.guide.direction_body}
        </p>

        <div className="mt-10">
          <Link
            href="/atelier/inspector/movin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background:
                "linear-gradient(135deg, var(--color-accent-red), #7a0019)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 9999,
              textDecoration: "none",
              boxShadow: "0 12px 32px rgba(228,0,43,0.32)",
            }}
          >
            {t.guide.direction_cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    </Reveal>
  );
}

/* ============================================================
 * Helpers — Reveal on scroll, Label
 * ============================================================ */
function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 600ms ease, transform 600ms ease",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block"
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2,
        color: "var(--color-accent-gold)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}
