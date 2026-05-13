/* ============================================================
 * studio-data.ts — Studio 데모용 mock 데이터
 *
 * Scenario: 27FW · Women · Polo · "Italian Riviera Sunset"
 *
 * Pool:
 *   - 60 TrendImage (4 sources × 다양한 카테고리)
 *   - 14장이 ST DNA 통과 (A·B)
 *   - 46장이 미달 (C·D)
 *
 * 디자이너가 통과 14장 중 3장 선택 → 각 3 variant 생성
 *   - 9 GeneratedDesign (3 references × 3 transforms)
 *   - 최종 등급: A 2 · B 5 · C 2
 * ============================================================ */

import type { ApparelType } from "@/components/atelier/ApparelIcon";

export type SourceType = "runway" | "ecommerce" | "social" | "pantone";
export type Verdict = "A" | "B" | "C" | "D";

export interface PillarScores {
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
}

export interface TrendImage {
  id: string;
  source: SourceType;
  sourceLabel: string;
  category: string;
  apparelType: ApparelType;
  bgColor: string;
  accentColor: string;
  textColor: string;
  moodLabel: string;
  pillarScores: PillarScores;
  verdict: Verdict;
  aiComment: string;
  isFeatured?: boolean;
}

export interface DesignTransform {
  colorFrom: string;
  colorTo: string;
  fitTo: string;
  logoPlacement: string;
  fabric: string;
  heritage?: string;
}

export interface GeneratedDesign {
  id: string;
  referenceId: string;
  category: string;
  apparelType: ApparelType;
  bgColor: string;
  accentColor: string;
  textColor: string;
  variantLabel: string;
  transforms: DesignTransform;
  pillarScores: PillarScores;
  verdict: Verdict;
  aiNote: string;
}

/* ============================================================
 * BRIEF · 디폴트 시나리오
 * ============================================================ */
export const STUDIO_BRIEF = {
  season: "27FW",
  category: "Apparel",
  subcategory: "Polo",
  gender: "Women",
  moodKeyword: "Italian Riviera Sunset",
  referenceCount: 60,
  dnaStrictness: 0.7, // 0(관대) ~ 1(엄격)
  variantBoldness: 0.4, // 0(보수) ~ 1(실험)
};

/* ============================================================
 * SOURCE — 4 데이터 소스
 * ============================================================ */
export const STUDIO_SOURCES: Record<
  SourceType,
  { id: SourceType; label: string; iconColor: string; count: number }
> = {
  runway: { id: "runway", label: "Vogue Runway · 26FW", iconColor: "#0d2c54", count: 18 },
  ecommerce: { id: "ecommerce", label: "Net-a-Porter · Active", iconColor: "#1f4d3a", count: 16 },
  social: { id: "social", label: "Pinterest · Italian Riviera", iconColor: "#c99a3a", count: 14 },
  pantone: { id: "pantone", label: "Pantone · 27SS Forecast", iconColor: "#b03a2e", count: 12 },
};

/* ============================================================
 * 카드 톤 팔레트 (다양한 색감 + ST 가능성)
 * ============================================================ */
const PALETTE: { bg: string; accent: string; text: string; tone: "warm" | "cool" | "neutral" | "bright" }[] = [
  // ST 적합 — Quiet Luxury 톤
  { bg: "#0d2c54", accent: "#f4ecd8", text: "#f4ecd8", tone: "cool" }, // Navy
  { bg: "#1f4d3a", accent: "#f4ecd8", text: "#f4ecd8", tone: "cool" }, // Forest
  { bg: "#3a2a1a", accent: "#e6d5b8", text: "#e6d5b8", tone: "warm" }, // Brown
  { bg: "#5b3a2a", accent: "#f4ecd8", text: "#f4ecd8", tone: "warm" }, // Mocha
  { bg: "#e6d9c2", accent: "#0d2c54", text: "#0d2c54", tone: "neutral" }, // Ecru
  { bg: "#d8d0c0", accent: "#3a2a1a", text: "#3a2a1a", tone: "neutral" }, // Beige
  { bg: "#8a7960", accent: "#f4ecd8", text: "#fff", tone: "neutral" }, // Stone
  { bg: "#7a0019", accent: "#f4ecd8", text: "#f4ecd8", tone: "warm" }, // Burgundy
  // 경계 톤
  { bg: "#94a3b8", accent: "#fff", text: "#fff", tone: "neutral" }, // Gray
  { bg: "#5b8fd1", accent: "#fff", text: "#fff", tone: "cool" }, // Light Blue
  // ST 부적합 — Strong/Bright (Y2K·Streetwear 등)
  { bg: "#ff5d3a", accent: "#fff", text: "#fff", tone: "bright" }, // Neon Orange
  { bg: "#ffdb3a", accent: "#000", text: "#000", tone: "bright" }, // Bright Yellow
  { bg: "#fa3a8e", accent: "#fff", text: "#fff", tone: "bright" }, // Hot Pink
  { bg: "#3aff8a", accent: "#000", text: "#000", tone: "bright" }, // Neon Green
  { bg: "#0a0a14", accent: "#ff5d3a", text: "#ff5d3a", tone: "bright" }, // Black + Neon
];

const APPAREL_BY_CATEGORY: Record<string, ApparelType> = {
  Polo: "polo",
  "Track Jacket": "track-jacket",
  Pants: "pants",
  Skirt: "skirt",
  Dress: "dress",
  "T-Shirt": "t-shirt",
  Vest: "vest",
};

const CATEGORIES = ["Polo", "Track Jacket", "Pants", "Skirt", "Dress", "T-Shirt", "Vest"];

/* ============================================================
 * Pillar 점수 시뮬레이션 (시드 기반)
 * ============================================================ */
function seededRandom(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

function computeScores(
  paletteTone: "warm" | "cool" | "neutral" | "bright",
  apparelType: ApparelType,
  seed: number,
): { scores: PillarScores; verdict: Verdict } {
  /* base: bright는 P5 미달, neutral·cool·warm은 P5 통과 */
  const baseP5 = paletteTone === "bright" ? 30 + seededRandom(seed) * 25 : 65 + seededRandom(seed + 1) * 30;

  /* P1 Heritage: polo·track jacket·skirt은 +, t-shirt·dress는 보통 */
  const heritageBoost = ["polo", "track-jacket", "skirt"].includes(apparelType) ? 18 : 0;
  const baseP1 = 50 + seededRandom(seed + 2) * 35 + heritageBoost;

  /* P2 Functional: 모두 60-90 사이 (소재는 추정 — mock) */
  const baseP2 = 55 + seededRandom(seed + 3) * 35;

  /* P3 Scene: 대부분 통과 */
  const baseP3 = 60 + seededRandom(seed + 4) * 30;

  /* P4 Silhouette: polo·t-shirt 통과 / oversize는 미달 */
  const baseP4 = 60 + seededRandom(seed + 5) * 30;

  const scores: PillarScores = {
    P1: Math.round(Math.min(100, Math.max(20, baseP1))),
    P2: Math.round(Math.min(100, Math.max(20, baseP2))),
    P3: Math.round(Math.min(100, Math.max(20, baseP3))),
    P4: Math.round(Math.min(100, Math.max(20, baseP4))),
    P5: Math.round(Math.min(100, Math.max(20, baseP5))),
  };

  /* Verdict */
  const weighted = (scores.P1 + scores.P2 * 2 + scores.P3 + scores.P4 + scores.P5) / 6;
  let verdict: Verdict = "D";
  if (weighted >= 80 && scores.P5 >= 60) verdict = "A";
  else if (weighted >= 70 && scores.P5 >= 55) verdict = "B";
  else if (weighted >= 60) verdict = "C";

  /* bright 톤이면 강제 D */
  if (paletteTone === "bright") verdict = "D";

  return { scores, verdict };
}

/* ============================================================
 * TREND POOL 생성 — 60개
 * ============================================================ */
function generatePool(): TrendImage[] {
  const pool: TrendImage[] = [];
  const sourceKeys = Object.keys(STUDIO_SOURCES) as SourceType[];
  let idx = 0;
  for (const srcKey of sourceKeys) {
    const src = STUDIO_SOURCES[srcKey];
    for (let i = 0; i < src.count; i++) {
      const palIdx = (idx * 7 + i * 3) % PALETTE.length;
      const pal = PALETTE[palIdx];
      const cat = CATEGORIES[(idx + i) % CATEGORIES.length];
      const apparelType = APPAREL_BY_CATEGORY[cat] || "polo";
      const { scores, verdict } = computeScores(pal.tone, apparelType, idx + 13);

      const moodVariants = [
        "Italian Riviera",
        "Court Active",
        "Heritage Revival",
        "Resort Lifestyle",
        "Tennis Club",
        "Quiet Luxury",
        "Streetwear Hype",
        "Y2K Throwback",
        "Active Studio",
      ];
      const mood = moodVariants[(idx + i * 2) % moodVariants.length];

      const aiComments: Record<Verdict, string[]> = {
        A: [
          "Italian Heritage 명확 + Quiet Luxury 톤 적합",
          "Court silhouette + Tone-on-Tone 절제 우수",
          "Damarindo stripe 가능성 + Cotton Piqué 적합",
        ],
        B: [
          "Heritage 코드 양호, P2 소재는 보강 가능",
          "실루엣 통과, 컬러 보강 시 A 가능",
          "톤 일치, Logo 절제 권장",
        ],
        C: [
          "전반적으로 ST 톤이나 Heritage code 약함",
          "P5 컬러 절제 필요",
          "실루엣은 OK, 소재·디테일 검토 필요",
        ],
        D: [
          "P5 Strong/Bright 컬러 — ABSOLUTE NO 가능성",
          "Streetwear 톤 — ST DNA 미달",
          "Y2K Reliance · Heritage 부재",
        ],
      };
      const comment = aiComments[verdict][idx % 3];

      pool.push({
        id: `trend-${String(idx).padStart(3, "0")}`,
        source: srcKey,
        sourceLabel: src.label,
        category: cat,
        apparelType,
        bgColor: pal.bg,
        accentColor: pal.accent,
        textColor: pal.text,
        moodLabel: mood,
        pillarScores: scores,
        verdict,
        aiComment: comment,
        isFeatured: verdict === "A" && idx % 5 === 0,
      });
      idx++;
    }
  }
  return pool;
}

export const STUDIO_TREND_POOL: TrendImage[] = generatePool();

/* ============================================================
 * GENERATED DESIGNS — 3 references × 3 variants
 *
 * 사용자가 통과 14장 중 ★★★ 가장 높은 3장(보통 A 등급)을 선택했다고 가정.
 * 각 reference에서 3가지 변형 (Conservative · Balanced · Experimental)
 * ============================================================ */
function pickTopReferences(): TrendImage[] {
  /* A 등급 위주로 3장 픽 */
  const aGrade = STUDIO_TREND_POOL.filter((t) => t.verdict === "A");
  const bGrade = STUDIO_TREND_POOL.filter((t) => t.verdict === "B");
  /* 다양한 카테고리에서 선택 (Polo·Track·Skirt 중심) */
  const preferred = ["polo", "track-jacket", "skirt"];
  const picked: TrendImage[] = [];
  for (const apparel of preferred) {
    const found =
      aGrade.find((t) => t.apparelType === apparel) ||
      bGrade.find((t) => t.apparelType === apparel);
    if (found && !picked.includes(found)) picked.push(found);
  }
  /* 부족하면 A에서 채움 */
  while (picked.length < 3 && aGrade.length > picked.length) {
    const cand = aGrade.find((t) => !picked.includes(t));
    if (cand) picked.push(cand);
  }
  return picked.slice(0, 3);
}

const TOP_REFERENCES = pickTopReferences();
export const STUDIO_CURATED_IDS = TOP_REFERENCES.map((r) => r.id);

const VARIANT_LABELS = ["Conservative", "Balanced", "Experimental"];

/* ST 표준 변형 — 각 reference에서 3개씩 생성 */
function generateDesigns(): GeneratedDesign[] {
  const designs: GeneratedDesign[] = [];

  /* ST Quiet Luxury 컬러 (P5.1 매핑) */
  const ST_COLORS = [
    { name: "ECRU", bg: "#e6d9c2", accent: "#0d2c54", text: "#0d2c54" },
    { name: "DEEP NAVY", bg: "#0d2c54", accent: "#f4ecd8", text: "#f4ecd8" },
    { name: "FOREST GREEN", bg: "#1f4d3a", accent: "#f4ecd8", text: "#f4ecd8" },
    { name: "MUTED BURGUNDY", bg: "#7a0019", accent: "#f4ecd8", text: "#f4ecd8" },
    { name: "BROWN", bg: "#3a2a1a", accent: "#e6d5b8", text: "#e6d5b8" },
    { name: "QUIET LIGHT BLUE", bg: "#7a9bc2", accent: "#fff", text: "#fff" },
  ];

  TOP_REFERENCES.forEach((ref, refIdx) => {
    for (let v = 0; v < 3; v++) {
      const stColor = ST_COLORS[(refIdx * 3 + v) % ST_COLORS.length];
      const variantLabel = VARIANT_LABELS[v];

      const fit =
        v === 0 ? "Regular" : v === 1 ? "Active Slim" : "Active Slim · Body-Lined";
      const logo =
        v === 0
          ? "Pentagon · Left chest · 25mm · Tone-on-Tone"
          : v === 1
          ? "Pentagon · Side outer · 18mm · Embossed"
          : "Tape Logo · Vertical · Italian Retro";

      const fabric =
        ref.apparelType === "polo"
          ? "Cotna Piqué RA3 · 260g (Tier C)"
          : ref.apparelType === "track-jacket"
          ? "Technical Woven RA2 · 220g (Tier C)"
          : "Cotton Blend Jersey RA2 · 200g (Tier B)";

      const heritage =
        v === 0
          ? undefined
          : v === 1
          ? "Damarindo stripe (sleeve)"
          : "Italian Active Tennis tape · Court Green";

      /* 점수 — Conservative=B+ / Balanced=A / Experimental=B (실험성 페널티) */
      const scoresByVariant: Record<number, PillarScores> = {
        0: { P1: 72, P2: 80, P3: 78, P4: 82, P5: 92 },
        1: { P1: 90, P2: 88, P3: 88, P4: 88, P5: 90 },
        2: { P1: 88, P2: 82, P3: 90, P4: 75, P5: 70 },
      };
      const scores = scoresByVariant[v];
      const weighted = (scores.P1 + scores.P2 * 2 + scores.P3 + scores.P4 + scores.P5) / 6;
      let verdict: Verdict = "C";
      if (weighted >= 85 && scores.P5 >= 70) verdict = "A";
      else if (weighted >= 75 && scores.P5 >= 65) verdict = "B";

      const aiNotes: Record<number, string> = {
        0: "보수적 변형 — 안전한 통과, 디테일 절제 우수",
        1: "균형형 변형 — Heritage 강화 + Quiet Luxury 정합, 시즌 시그니쳐 후보",
        2: "실험적 변형 — Heritage 강력하나 P4 실루엣 검토 필요",
      };

      designs.push({
        id: `gen-${refIdx}-${v}`,
        referenceId: ref.id,
        category: ref.category,
        apparelType: ref.apparelType,
        bgColor: stColor.bg,
        accentColor: stColor.accent,
        textColor: stColor.text,
        variantLabel,
        transforms: {
          colorFrom: getColorName(ref.bgColor),
          colorTo: stColor.name,
          fitTo: fit,
          logoPlacement: logo,
          fabric,
          heritage,
        },
        pillarScores: scores,
        verdict,
        aiNote: aiNotes[v],
      });
    }
  });

  return designs;
}

function getColorName(hex: string): string {
  /* hex → 대략 이름 */
  const map: Record<string, string> = {
    "#0d2c54": "Deep Navy",
    "#1f4d3a": "Forest Green",
    "#3a2a1a": "Brown",
    "#5b3a2a": "Mocha",
    "#e6d9c2": "Ecru",
    "#d8d0c0": "Beige",
    "#8a7960": "Stone",
    "#7a0019": "Burgundy",
    "#94a3b8": "Gray",
    "#5b8fd1": "Light Blue",
    "#ff5d3a": "Neon Orange",
    "#ffdb3a": "Bright Yellow",
    "#fa3a8e": "Hot Pink",
    "#3aff8a": "Neon Green",
    "#0a0a14": "Off Black",
  };
  return map[hex] || "Mixed";
}

export const STUDIO_GENERATED: GeneratedDesign[] = generateDesigns();

/* ============================================================
 * SUMMARY — 단계별 카운트 (UI 표시용)
 * ============================================================ */
export const STUDIO_SUMMARY = {
  crawled: STUDIO_TREND_POOL.length,
  passed: STUDIO_TREND_POOL.filter((t) => t.verdict === "A" || t.verdict === "B").length,
  curated: TOP_REFERENCES.length,
  generated: STUDIO_GENERATED.length,
  finalA: STUDIO_GENERATED.filter((d) => d.verdict === "A").length,
  finalB: STUDIO_GENERATED.filter((d) => d.verdict === "B").length,
  finalC: STUDIO_GENERATED.filter((d) => d.verdict === "C").length,
  finalD: STUDIO_GENERATED.filter((d) => d.verdict === "D").length,
};
