#!/usr/bin/env node
/* ============================================================
 * check-pillars.mjs — 추출된 SKU 데이터에 5 Pillars 룰 적용
 *
 * 입력: parsePDF() 결과 (라인 + SKUs)
 * 출력: 각 SKU별 점수·위반·Verdict A/B/C/D + 라인 종합 등급
 *
 * 텍스트 기반 자동화 가능 영역 (Phase 1):
 *   - P2.4 Composition Std. — 성분 비율 정량 검수
 *   - P5.1 Quiet Luxury Color — 컬러 매핑
 *   - P5.2 No Strong/Bright — 채도 강한 컬러 감지
 *   - P3 Scene Mapping — 제품명·소재 기반 카테고리 추정
 *
 * Vision LLM 필요 영역 (Phase 2 — 본 prototype에서는 ★ 임시 점수):
 *   - P1, P4 (Silhouette), P5.4 (Logo)
 * ============================================================ */

/* ============================================================
 * P5.1 — ST 허용 6색 매핑 사전
 * Brandbook 2026 p.8: Deep Navy / Quiet Light Blue / Ecru(ivory/beige) /
 *                       Muted Burgundy / Brown / Forest Green
 * MOVIN의 TCX 컬러명을 ST 카테고리로 매핑
 * ============================================================ */
const ST_COLOR_MAP = {
  "DEEP NAVY": [
    "NAVY",
    "NAVY PEONY",
    "DARK NAVY",
    "DRESS BLUES",
    "MIDNIGHT NAVY",
    "TWILIGHT BLUE",
  ],
  "QUIET LIGHT BLUE": [
    "QUIET LIGHT BLUE",
    "LIGHT BLUE",
    "POWDER BLUE",
    "SKY BLUE",
    "TURBULENCE",
    "DUSTY BLUE",
  ],
  ECRU: [
    "ECRU",
    "IVORY",
    "BEIGE",
    "CREAM",
    "GARDENIA",
    "WHITE SWAN",
    "SILVER BIRCH",
    "WHITE",
    "OFF WHITE",
  ],
  "MUTED BURGUNDY": [
    "BURGUNDY",
    "MUTED BURGUNDY",
    "WINE",
    "MUTED RED",
    "MAROON",
    "WISTFUL MAUVE",
  ],
  BROWN: [
    "BROWN",
    "COFFEE",
    "ESPRESSO",
    "FONDUE FUDGE",
    "MOCHA",
    "CHOCOLATE",
    "CAMEO BROWN",
    "TAUPE",
    "DIJON",
  ],
  "FOREST GREEN": [
    "FOREST",
    "FOREST BIOME",
    "FOREST GREEN",
    "PINE",
    "OLIVE",
    "DARK GREEN",
    "MUTED GREEN",
  ],
  /* ABSOLUTE 회색 계열 (Quiet Luxury 보조 — Brandbook p.8 Coordination Rule:
     "Navy and grey serve as base tones") */
  GREY: ["GREY", "GRAY", "CHARCOAL", "STORMY", "ASH"],
  BLACK: ["BLACK", "JET BLACK", "TRUE BLACK"],
};

/* P5.2 — 위험 컬러 (Neon / Bright primaries — 1개라도 있으면 P5.2 감점) */
const BRIGHT_RISK_KEYWORDS = [
  "NEON",
  "ELECTRIC",
  "FLUOR",
  "BRIGHT",
  "RED ALERT",
  "ADRENALINE", // ADRENALINE RUSH (강한 빨강/오렌지)
  "RUSH",
  "ORANGE",
  "YELLOW",
  "LIME",
  "MAGENTA",
  "PINK",
  "TEAL",
  "AQUA",
  "CYAN",
];

function classifyColor(rawColor) {
  const up = rawColor.toUpperCase().trim();
  /* ST 허용 카테고리 매칭 */
  for (const [stCategory, list] of Object.entries(ST_COLOR_MAP)) {
    if (list.some((c) => up.includes(c))) {
      return { stCategory, isAllowed: true };
    }
  }
  /* 위험 컬러 매칭 */
  for (const risk of BRIGHT_RISK_KEYWORDS) {
    if (up.includes(risk)) {
      return { stCategory: null, isAllowed: false, risk };
    }
  }
  /* 미분류 (애매한 컬러) */
  return { stCategory: null, isAllowed: false, risk: "unclassified" };
}

/* ============================================================
 * P3 Scene Mapping — 제품명·소재에서 3-CORE 추정
 * ============================================================ */
const COURT_ACTIVE_KEYWORDS = [
  "TRACK",
  "POLO",
  "TENNIS",
  "PERFORMANCE",
  "PADEL",
  "SHORT", // 짧은 운동 반바지
  "RIPSTOP",
  "MESH",
];
const ATHLEISURE_KEYWORDS = [
  "T-SHIRT",
  "BERMUDA",
  "VEST",
  "JACKET", // 일상용 자켓
  "PANTS",
  "SHIRT",
  "GILET",
];
const CLASSIC_KEYWORDS = [
  "TRICOT",
  "KNIT",
  "CARDIGAN",
  "POLO SHIRT",
  "ARCHIVE",
  "ARCHIVIO",
  "HERITAGE",
  "FLEECE",
];

function inferCore(sku) {
  const text = `${sku.name} ${sku.fabricRaw || ""}`.toUpperCase();
  const courtScore = COURT_ACTIVE_KEYWORDS.filter((k) => text.includes(k)).length;
  const athScore = ATHLEISURE_KEYWORDS.filter((k) => text.includes(k)).length;
  const classicScore = CLASSIC_KEYWORDS.filter((k) => text.includes(k)).length;

  const max = Math.max(courtScore, athScore, classicScore);
  if (max === 0) return "Active Athleisure"; // 기본값
  if (max === courtScore) return "Active Court";
  if (max === classicScore) return "Active Classic";
  return "Active Athleisure";
}

/* ============================================================
 * P2.4 Composition Std. — CORE별 성분 비율 룰
 * Brandbook 2026 p.6
 * ============================================================ */
const COMPOSITION_RULES = {
  "Active Court": {
    PA: [0, 100], // Polyamide 허용 (Court 코어는 functional poly가 60-85%)
    PL: [60, 85], // Polyester(=Functional Polyester) 60-85% (단, PA로 표기되는 경우도 많음)
    /* 실무 보정 — Court Active 외장은 nylon(PA) 또는 poly(PL) 어느 한쪽이 60-85% 가능 */
    POLY_TOTAL: [60, 100], // PA + PL 합산
    EA: [5, 15],
    CO: [0, 30], // Cotton 0-20%이 표준이지만 약간 여유
  },
  "Active Athleisure": {
    POLY_TOTAL: [40, 75], // Poly 40-65% 표준이지만 약간 여유
    CO: [15, 50], // Cotton 15-40% + 여유
    EA: [5, 15],
  },
  "Active Classic": {
    POLY_TOTAL: [25, 70],
    CO: [30, 70], // Cotton 30-60% + 여유
    EA: [3, 12],
  },
};

function checkComposition(sku, core) {
  const rule = COMPOSITION_RULES[core];
  if (!rule) return { score: 60, violations: [], reason: "기준 없음" };

  const c = sku.composition;
  const polyTotal = (c.PA || 0) + (c.PL || 0);
  const co = c.CO || 0;
  const ea = c.EA || 0;
  const sum = polyTotal + co + ea;

  const violations = [];

  /* 성분 정보가 PDF에서 추출되지 않은 경우 — 중립 통과 점수
     (라이센시에 명세 요청 별도 트래킹 — 검수 점수 자체는 페널티 X) */
  if (sum === 0) {
    return {
      score: 72,
      violations: [
        {
          rule: "P2.4 Composition Std.",
          severity: "low",
          issue: "PDF에서 소재 성분 비율 자동 추출 실패 — 라이센시 명세 시트 별도 확인 필요",
        },
      ],
    };
  }

  let score = 100;

  if (rule.POLY_TOTAL && (polyTotal < rule.POLY_TOTAL[0] || polyTotal > rule.POLY_TOTAL[1])) {
    score -= 20;
    violations.push({
      rule: "P2.4 Composition Std.",
      severity: "mid",
      issue: `${core} 기준 합성섬유 합계 ${rule.POLY_TOTAL[0]}-${rule.POLY_TOTAL[1]}% — 실제 ${polyTotal}%`,
    });
  }
  if (rule.CO && co > 0 && (co < rule.CO[0] || co > rule.CO[1])) {
    score -= 15;
    violations.push({
      rule: "P2.4 Composition Std.",
      severity: "mid",
      issue: `${core} 기준 Cotton ${rule.CO[0]}-${rule.CO[1]}% — 실제 ${co}%`,
    });
  }
  if (rule.EA && (ea < rule.EA[0] || ea > rule.EA[1])) {
    score -= 10;
    violations.push({
      rule: "P2.4 Composition Std.",
      severity: "low",
      issue: `${core} 기준 Elastane ${rule.EA[0]}-${rule.EA[1]}% — 실제 ${ea}%`,
    });
  }

  /* Active Athleisure 자연 코튼 의무 (Brandbook p.6 "Cotton (Natural feel) 15-40%") */
  if (core === "Active Athleisure" && co < 15) {
    score -= 10;
    violations.push({
      rule: "P2.4 Composition Std.",
      severity: "low",
      issue: "Active Athleisure는 Cotton(Natural feel) 15-40% 권장 — 실제 " + co + "%",
    });
  }

  return { score: Math.max(0, score), violations };
}

/* ============================================================
 * P5.1 Quiet Luxury Color + P5.2 No Strong/Bright
 * ============================================================ */
function checkColors(sku) {
  const colors = sku.colors || [];
  if (colors.length === 0) {
    return {
      p51: { score: 70, violations: [] },
      p52: { score: 100, violations: [] },
    };
  }

  const classified = colors.map((c) => ({ raw: c, ...classifyColor(c) }));
  const allowed = classified.filter((c) => c.isAllowed).length;
  const bright = classified.filter((c) => c.risk && c.risk !== "unclassified");
  const unclassified = classified.filter((c) => c.risk === "unclassified");

  /* P5.1 — 허용 컬러 비율 */
  const ratio = allowed / colors.length;
  let p51Score = Math.round(ratio * 100);
  const p51Violations = [];
  if (ratio < 1) {
    const offending = classified.filter((c) => !c.isAllowed).map((c) => c.raw);
    p51Violations.push({
      rule: "P5.1 Quiet Luxury Color",
      severity: ratio < 0.5 ? "high" : "mid",
      issue: `ST 허용 6색군에 매칭되지 않는 컬러: ${offending.join(", ")}`,
    });
  }

  /* P5.2 — Strong/Bright 위반 */
  let p52Score = 100;
  const p52Violations = [];
  if (bright.length > 0) {
    /* 1건이면 mid (검토 필요), 2건+은 high (즉시 차단) */
    p52Score = Math.max(0, 100 - bright.length * 25);
    p52Violations.push({
      rule: "P5.2 No Strong/Bright",
      severity: bright.length >= 2 ? "high" : "mid",
      issue: `Bright/Neon 위험 컬러 ${bright.length}건: ${bright.map((b) => b.raw).join(", ")}`,
    });
  }

  return {
    p51: { score: p51Score, violations: p51Violations, classified },
    p52: { score: p52Score, violations: p52Violations },
  };
}

/* ============================================================
 * P3 Scene Mapping
 * ============================================================ */
function checkScene(sku, inferredCore) {
  /* Phase 1에서는 단순히 추정 가능 여부만 — 항상 통과 */
  return {
    score: 75,
    inferredCore,
    violations: [],
  };
}

/* ============================================================
 * P1 / P4 — Vision LLM 영역 (Phase 2)
 *    Phase 1 prototype에서는 임시 점수 (디자인 면면이 미상이므로
 *    중간값 + 일부 휴리스틱)
 * ============================================================ */
function placeholderP1P4P54(sku, inferredCore) {
  /* 휴리스틱: 제품명에 "TRACK", "ARCHIVIO" 등 헤리티지 키워드가 있으면 P1 가산 */
  const heritageKw = ["TRACK", "ARCHIVIO", "HERITAGE", "CLASSIC", "ARCHIVE", "TENNIS"];
  const name = sku.name.toUpperCase();
  const heritageHit = heritageKw.some((k) => name.includes(k));

  const p1 = heritageHit ? 75 : 55; // 헤리티지 키워드 있으면 통과, 없으면 살짝 미달

  /* P4 — Brandbook 정의 5축은 도면 시각 필요. 임시 점수 75 (Vision Phase 2). */
  const p4 = 75;

  /* P5.4 — 로고 위치는 도면 시각 필요. 임시 점수 80. */
  const p54 = 80;

  return { p1, p4, p54 };
}

/* ============================================================
 * 메인 — SKU 1개 5 Pillars 검수
 * ============================================================ */
export function checkSKU(sku) {
  const inferredCore = inferCore(sku);
  const composition = checkComposition(sku, inferredCore);
  const { p51, p52 } = checkColors(sku);
  const scene = checkScene(sku, inferredCore);
  const placeholder = placeholderP1P4P54(sku, inferredCore);

  /* Pillar 점수 종합 */
  const pillarScores = {
    P1: placeholder.p1,
    P2: composition.score, // P2.4 주축
    P3: scene.score,
    P4: placeholder.p4,
    P5: Math.round((p51.score + p52.score + placeholder.p54) / 3),
  };

  /* 모든 violations 합치기 */
  const violations = [
    ...composition.violations,
    ...p51.violations,
    ...p52.violations,
    ...scene.violations,
  ];

  /* Verdict 산출 — P2는 가중치 2배 */
  const weighted =
    pillarScores.P1 +
    pillarScores.P2 * 2 +
    pillarScores.P3 +
    pillarScores.P4 +
    pillarScores.P5;
  const weightedAvg = weighted / 6;

  let verdict = "D";
  if (weightedAvg >= 85 && pillarScores.P2 >= 80) verdict = "A";
  else if (weightedAvg >= 75 && pillarScores.P2 >= 75) verdict = "B";
  else if (weightedAvg >= 60 && pillarScores.P2 >= 60) verdict = "C";

  /* ABSOLUTE NO 즉시 D 처리 */
  if (p52.violations.some((v) => v.severity === "high")) {
    verdict = "D";
  }

  return {
    ...sku,
    inferredCore,
    pillarScores,
    violations,
    verdict,
    weightedAvg: Math.round(weightedAvg * 10) / 10,
    colorClassification: p51.classified,
  };
}

/* ============================================================
 * 라인 종합 등급 산출
 * ============================================================ */
export function gradeLine(skus) {
  const verdictPoint = { A: 4, B: 3, C: 2, D: 0 };
  const total = skus.reduce((sum, s) => sum + (verdictPoint[s.verdict] || 0), 0);
  const avg = skus.length > 0 ? total / skus.length : 0;
  let grade = "D";
  if (avg >= 3.5) grade = "A";
  else if (avg >= 2.5) grade = "B";
  else if (avg >= 1.5) grade = "C";

  const distribution = { A: 0, B: 0, C: 0, D: 0 };
  for (const s of skus) {
    distribution[s.verdict] = (distribution[s.verdict] || 0) + 1;
  }

  return {
    grade,
    averagePoint: Math.round(avg * 100) / 100,
    distribution,
    totalSKU: skus.length,
  };
}
