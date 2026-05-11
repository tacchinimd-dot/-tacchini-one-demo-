/* ============================================================
 * ATELIER ONE — Inspector Demo Mock Data
 *
 * 시나리오 (v0 설계 §6.2):
 *   라이센시: Sugi France (G1 · 26FW Apparel 런칭)
 *   디자인: FW용 Hooded Jacket
 *   의도된 위반 3개:
 *     · P5 위반 — 가슴 중앙 12cm Pentagon 로고 (로고 과다 노출)
 *     · P2 위반 — Heavy Texture (RA5) French Terry, 380g (Weight Tier D + RA5 결합 금지)
 *     · P1 위반 — Italian Heritage 코드 부재 (배색·플리츠·트랙 디테일 모두 미내재화)
 *   Verdict: C (타키니화 가능)
 *   가장 가까운 시그니쳐: 쿠쉬라이트 경량 우븐 (3/5 축 일치)
 * ============================================================ */

export type Verdict = "A" | "B" | "C" | "D";

export type PillarKey = "P1" | "P2" | "P3" | "P4" | "P5";

export interface SubPillar {
  /** 짧은 코드 (예: "P4.1") */
  code: string;
  /** 짧은 타이틀 (한국어, UI에 표시) */
  title: string;
  /** 검수 규정 한 줄 (위반 시 메시지에도 활용) */
  rule: string;
  /** 브랜드북 페이지 또는 출처 표기 */
  source?: string;
}

export interface PillarMeta {
  en: string;
  ko: string;
  pass: number;
  /** 한 줄 요약 (Step 1 Rules 패널·툴팁용) */
  summary: string;
  /** 브랜드북 직접 인용 한 줄 */
  brandbookQuote?: string;
  /** 하위 검수 규정 (Sergio Tacchini Brandbook 2026 기반) */
  subPillars: SubPillar[];
}

/* ============================================================
 * PILLAR_META — Sergio Tacchini Brandbook 2026 (Global) 기반
 *
 * 출처: \\172.21.1.112\Sergio Tacchini\☆ST. BRAND ARCHIVE\★ST. Brand Book\2026\
 *      Sergio Tacchini Brandbook_2026.pdf
 *
 * 한국 ST Brand Voice Guide v0 (§1·§2·§3) + 글로벌 브랜드북 통합.
 * 각 Pillar의 subPillars는 검수 시 위반 항목을 정확히 매핑할 때 사용.
 * ============================================================ */
export const PILLAR_META: Record<PillarKey, PillarMeta> = {
  P1: {
    en: "Italian Tennis Heritage",
    ko: "이탈리안 테니스 헤리티지",
    pass: 60,
    summary: "이탈리안 테니스를 출발점으로, 그러나 노스탤지어가 아닌 재해석으로",
    brandbookQuote:
      "The iconic tennis brand that first brought style to the court — heritage reinterpreted into a modern, functional wellness lifestyle.",
    subPillars: [
      {
        code: "P1.1",
        title: "Tennis-first Origin",
        rule: "테니스는 ST의 origin · 디자인에 코트 코드(배색·플리츠·카라·테이프) 1개 이상 내재 필수",
        source: "Brandbook p.1 — We Are",
      },
      {
        code: "P1.2",
        title: "Beyond Athlete",
        rule: "Tennis is our origin, but lifestyle is our language — 경쟁/선수 일변도 표현 ❌",
        source: "Brandbook p.10 — ABSOLUTE NO #7",
      },
      {
        code: "P1.3",
        title: "Damarindo Signature",
        rule: "Damarindo stripe(시그니쳐 더블 스트라이프) 같은 헤리티지 라인 그래픽 우선 사용",
        source: "Brandbook p.9 — Detail",
      },
      {
        code: "P1.4",
        title: "No Y2K Reliance",
        rule: "헤리티지는 노스탤지어 ❌ — Y2K 레트로 코스튬으로 차용 금지, 시대성 있는 재해석만",
        source: "Brandbook p.10 — ABSOLUTE NO #4",
      },
      {
        code: "P1.5",
        title: "Italian First Layer",
        rule: "Italian Tennis가 1차 layer / 자국 테니스(Wimbledon·Roland Garros 등)는 2차 layer로만",
        source: "한국 v0 §1 P1 글로벌화",
      },
    ],
  },

  P2: {
    en: "Elegant Functionalism",
    ko: "우아한 기능주의 (가중치 2배)",
    pass: 70,
    summary: "Premium Function, Timeless Social Living — 자연스러운 표면 · 숨겨진 기능",
    brandbookQuote:
      "Premium functionality defines today's court attitude and extends it into a more active, timeless everyday life — refined social living.",
    subPillars: [
      {
        code: "P2.1",
        title: "Natural Face / Performance Core",
        rule: "외관은 natural hand feel · 내구성 · moisture-wicking — pure natural fiber + high-function poly/elastane 구조",
        source: "Brandbook p.5 — Fabric Rules",
      },
      {
        code: "P2.2",
        title: "Surface Aesthetics",
        rule: "No shiny nylon · No high-gloss fabric · Moderate texture + layered knit feel (high-density piqué, tech-knit)",
        source: "Brandbook p.5 — Surface",
      },
      {
        code: "P2.3",
        title: "Hidden Performance",
        rule: "Invisible Tech — 외관은 natural / 내부는 dual-layer sweat-wicking · quick-dry · stretch 기능 숨김",
        source: "Brandbook p.5 — Hidden Performance",
      },
      {
        code: "P2.4",
        title: "Composition Std. (CORE별 성분 비율)",
        rule: "Court Active: Poly 60–85% · Active Athleisure: Poly 40–65% / Cotton 15–40% · Active Classic: Cotton 30–60% · Elastane 항상 3–15%",
        source: "Brandbook p.6 — Composition Std.",
      },
      {
        code: "P2.5",
        title: "Mandatory Function",
        rule: "Wicking · Stretch · Lightweight construction은 모든 CORE 필수 · Active Classic은 Pilling resist · Color fastness 추가",
        source: "Brandbook p.6 — Surface & Function",
      },
      {
        code: "P2.6",
        title: "No Style Without Function",
        rule: "기능 없는 스타일 ❌ — 외형만 화려한 디자인 거부 · 강점은 elegantly functional",
        source: "Brandbook p.10 — ABSOLUTE NO #5",
      },
    ],
  },

  P3: {
    en: "Court-to-Social Lifestyle",
    ko: "코트에서 일상으로",
    pass: 60,
    summary: "Bodyfulness + Social Presence — 코트 → 클럽 → 리조트 → 일상으로의 끊김 없는 전환",
    brandbookQuote:
      "Athleisure lens — flowing seamlessly from court to social life, expressed as lifestyle wear.",
    subPillars: [
      {
        code: "P3.1",
        title: "Court Active (Energetic Active)",
        rule: "Tennis·코트 기반 액티브 — innovative & semi-performance fabric · 코트 안팎의 movement·confidence·shared moments",
        source: "Brandbook p.2 — Court Active",
      },
      {
        code: "P3.2",
        title: "Active Athleisure (Performance × Elegance)",
        rule: "Beyond the studio — premium·functional pieces · 실내 활동 → gathering으로 끊김 없는 전환 · refined social lifestyle",
        source: "Brandbook p.3 — Active Athleisure",
      },
      {
        code: "P3.3",
        title: "Active Classic (Functional Heritage)",
        rule: "Elegant knit + modern athletic sensibility — clean lines · timeless heritage codes",
        source: "Brandbook p.4 — Active Classic",
      },
      {
        code: "P3.4",
        title: "Scene Mapping",
        rule: "모든 디자인은 3-CORE(Court / Athleisure / Classic) 중 1개에 명시 매핑 가능해야 함",
        source: "한국 v0 §3 3-CORE 라이프스타일",
      },
    ],
  },

  P4: {
    en: "Body-Lined Silhouette",
    ko: "몸이 살아나는 실루엣",
    pass: 60,
    summary:
      "Active Body Awareness — 절제된 몸의 윤곽 · social, not sporty · clean lines and controlled fit",
    brandbookQuote:
      "The silhouette reveals an active body with restraint — social, not sporty. Clean lines and controlled fit create quiet sensuality and refined confidence, never overt.",
    subPillars: [
      {
        code: "P4.1",
        title: "Protect & Support · 공간감과 어깨선",
        rule: "몸과 의복 사이의 적절한 공간감 확보 · wellness lifestyle 윤곽 자연 형성 · properly fitted shoulder line으로 dignified movement 마감",
        source: "Brandbook p.7 — Protect & Support",
      },
      {
        code: "P4.2",
        title: "Active-Ready · 동작 자유도",
        rule: "Tennis swing freedom + bending·sitting 시 동작 깊이 확보 · 첫 착용 시 'dressy yet functional'로 보여야 함",
        source: "Brandbook p.7 — Active-Ready",
      },
      {
        code: "P4.3",
        title: "Length Balance · 길이 비례",
        rule: "스커트 ↔ 팬츠 길이 비례 균형 필수 · 'too short' or 'too loose'로 elegance가 깨지면 위반",
        source: "Brandbook p.7 — Length Balance",
      },
      {
        code: "P4.4",
        title: "Not Oversized",
        rule: "Silhouettes are never excessive · fit은 comfortable yet composed — tailored · balanced · elegant",
        source: "Brandbook p.10 — ABSOLUTE NO #8 No Oversized",
      },
      {
        code: "P4.5",
        title: "Restraint, Not Overt",
        rule: "Quiet sensuality · refined confidence · never overt — Second Skin 압박 ❌ / 과한 노출·deep V·하이슬릿 ❌ / S라인·Hourglass 마케팅 워딩 ❌",
        source: "Brandbook p.7 + 한국 v0 §3",
      },
    ],
  },

  P5: {
    en: "Quiet Performance",
    ko: "절제된 퍼포먼스",
    pass: 60,
    summary: "Rational Functionalism · Elegant Active Palette · Refined Restraint",
    brandbookQuote:
      "Details matter — not for excess decoration but for purpose. Standard: Simple, Basic, but Functional.",
    subPillars: [
      {
        code: "P5.1",
        title: "Quiet Luxury Color",
        rule: "허용 팔레트: Deep Navy · Quiet Light Blue · Ecru(ivory/beige) · Muted Burgundy · Brown · Forest Green — Tone-on-Tone & Refined point-color 표준",
        source: "Brandbook p.8 — Color Palette",
      },
      {
        code: "P5.2",
        title: "No Strong/Bright Color",
        rule: "Neon · bold primaries · 과한 채도 ❌ · refined restraint 우선",
        source: "Brandbook p.8 — No Strong/Bright",
      },
      {
        code: "P5.3",
        title: "Refined Decorative",
        rule: "그래픽·로고·패치 과다 ❌ · 모든 디테일은 'Why is this detail necessary?'에 기능적 답이 있어야 함",
        source: "Brandbook p.9 — Refined Decorative",
      },
      {
        code: "P5.4",
        title: "No Logo Mania",
        rule: "Logo는 decoration이 아닌 purpose · 가슴 중앙 대형 로고 ❌ · 사이드·외측 minimal 배치 / Tone-on-Tone 우선",
        source: "Brandbook p.10 — ABSOLUTE NO #3",
      },
      {
        code: "P5.5",
        title: "Premium Artwork — 로고 Application 3종 한정",
        rule: "(1) Matte Raised Rubber Print · (2) Embossed Embroidery · (3) Clean & Textured Printed — 그 외 application ❌",
        source: "Brandbook p.9 — Premium Artwork",
      },
      {
        code: "P5.6",
        title: "Not a Street Brand",
        rule: "Streetwear trend·hype cycle 추종 ❌ · refined activewear가 foundation",
        source: "Brandbook p.10 — ABSOLUTE NO #1",
      },
    ],
  },
};

export interface DesignSubmission {
  designId: string;
  licensee: string;
  group: "G1" | "G2" | "G3";
  category: string;
  season: string;
  itemName: string;
  meta: {
    fabric: string;
    gsm: number;
    raLevel: number;
    fitClass: string;
    silhouette: string;
    logoPlacement: string;
    logoSize: string;
    colorPalette: string;
  };
}

export interface Violation {
  pillar: PillarKey;
  severity: "high" | "mid" | "low";
  issue: string;
  rule: string;
}

export interface Alternative {
  id: string;
  type: "logo_relocation" | "material_swap" | "color_palette";
  title: string;
  description: string;
  before: string;
  after: string;
  pillarsRecovered: PillarKey[];
}

export interface InspectorReport {
  designId: string;
  verdict: Verdict;
  verdictLabel: string;
  pillarScores: Record<PillarKey, number>;
  violations: Violation[];
  closestSignature: {
    name: string;
    axisMatch: number;
    axisTotal: number;
  };
  alternatives: Alternative[];
  developNotes: string;
  inspectedAt: string;
}

export const MOCK_SUBMISSION: DesignSubmission = {
  designId: "SF-26FW-AP-0042",
  licensee: "Sugi France",
  group: "G1",
  category: "ST OUTER",
  season: "26FW",
  itemName: "Heritage Hooded Jacket (Working Title)",
  meta: {
    fabric: "French Terry",
    gsm: 380,
    raLevel: 5,
    fitClass: "Regular",
    silhouette: "Hood / Full Zip / Mid-length",
    logoPlacement: "Chest Center",
    logoSize: "120 mm × 120 mm",
    colorPalette: "Tone-on-Tone Charcoal",
  },
};

export const MOCK_REPORT: InspectorReport = {
  designId: "SF-26FW-AP-0042",
  verdict: "C",
  verdictLabel: "타키니화 가능",
  pillarScores: { P1: 40, P2: 55, P3: 70, P4: 85, P5: 35 },
  violations: [
    {
      pillar: "P5",
      severity: "high",
      issue: "Pentagon 로고가 가슴 중앙 120mm로 과다 노출 (P5.4 No Logo Mania 위반)",
      rule: "Brandbook p.10 ABSOLUTE NO #3: 'Logos serve purpose, not decoration. Design is guided by intention, not excess branding.' — 가슴 중앙 대형 로고는 Logo Mania로 분류되며 사이드·외측 minimal 배치 + Tone-on-Tone이 표준.",
    },
    {
      pillar: "P2",
      severity: "high",
      issue: "Heavy Texture French Terry 380g + 표면 High-shine 우려 (P2.2 Surface Aesthetics 위반)",
      rule: "Brandbook p.5: 'No shiny nylon or high-gloss fabrics. Moderate texture and layered knit feel (high-density piqué, tech-knit).' — RA3 Micro Texture가 CORE / RA5 Heavy Texture는 캐주얼·워크웨어 감성으로 ST 배제. Weight Tier C(220–300g)가 시그니쳐 손맛 구간이며 Active Athleisure CORE의 Cotton 비율 15–40% 가이드도 검토 필요.",
    },
    {
      pillar: "P1",
      severity: "mid",
      issue: "Italian Tennis Heritage 코드 부재 — 배색·Damarindo stripe·플리츠·트랙 디테일 모두 미내재화",
      rule: "Brandbook p.1 We Are + p.9 Detail: 'iconic tennis brand that first brought style to the court' / Damarindo stripe 같은 시그니쳐 라인 그래픽 우선 사용. P1.1 Tennis-first Origin 충족을 위해 배색·플리츠·카라·테이프 중 1개 이상 디자인에 내재화 필요.",
    },
  ],
  closestSignature: {
    name: "쿠쉬라이트 경량 우븐",
    axisMatch: 3,
    axisTotal: 5,
  },
  alternatives: [
    {
      id: "alt-1",
      type: "logo_relocation",
      title: "로고 재배치 — Pentagon 사이드 외측",
      description:
        "가슴 중앙 120mm Pentagon을 좌측 흉부 외측 25mm × 25mm로 축소·이동. Tone-on-Tone 자수로 변경하여 Quiet Performance 정합.",
      before: "Chest Center · 120mm × 120mm · Print",
      after: "Left Chest Outer · 25mm × 25mm · Tone-on-Tone Embroidery",
      pillarsRecovered: ["P5"],
    },
    {
      id: "alt-2",
      type: "material_swap",
      title: "소재 변경 — Cotna Piqué RA3 / Weight C",
      description:
        "Heavy Texture (RA5) French Terry 380g → Cotna Piqué (Cotton Touch Technical Piqué) RA3 Micro Texture / Weight C (260g)로 전환. ST 시그니쳐 손맛 정석 매핑(RA3 × C).",
      before: "French Terry · RA5 Heavy Texture · 380g (D)",
      after: "Cotna Piqué · RA3 Micro Texture · 260g (C)",
      pillarsRecovered: ["P2"],
    },
    {
      id: "alt-3",
      type: "color_palette",
      title: "Italian Active Tennis 배색 적용",
      description:
        "Charcoal Tone-on-Tone에서 Italian Active Tennis 팔레트 (Tennis Navy 본체 + Cream White 후드 안감 + Court Green 지퍼 테이프)로 전환. Italian Heritage 코드 명시적 내재화.",
      before: "Charcoal Mono",
      after: "Tennis Navy · Cream White · Court Green Tape",
      pillarsRecovered: ["P1"],
    },
  ],
  developNotes:
    "위 3안 모두 적용 시 가장 가까운 시그니쳐 '쿠쉬라이트 경량 우븐'(25S 크롭 자켓 1.41억 검증 공식)과의 일치 축이 3 → 5로 도달. 25S 검증 공식: Technical Woven × RA2~3 × Active Slim × Crop × Stand Collar × Full Zip. 본 디자인은 Hood 유지 시 신규 시그니쳐 후보(Verdict B)로 격상 가능.",
  inspectedAt: "2026-05-08 14:32 KST",
};

/* ============================================================
 * CODEX Mock Q&A — 검수 담당자가 실시간으로 ATELIER ONE에 질의
 * ============================================================ */
export interface CodexExchange {
  q: string;
  a: string;
  sources: string[];
}

export const MOCK_CODEX: CodexExchange[] = [
  {
    q: "이 자켓이 25S 쿠쉬라이트 크롭 자켓(1.41억) 검증 공식과 얼마나 가까운가?",
    a: "현재 5축 중 3축 일치 (Active Slim · Crop 후보 · Full Zip). 미충족 2축은 ① Technical Woven 소재 (현재 French Terry RA5) ② Stand Collar (현재 Hood). 대안 2(Cotna Piqué) 적용 + Hood → Stand Collar 전환 시 5/5 도달, '시그니쳐 확장 후보(A)' 등급 가능.",
    sources: ["§6.3 ST OUTER 검증 공식 ①", "§2.2 쿠쉬라이트 25S 1.41억 실적"],
  },
  {
    q: "Hood 유지하면서 ST다움을 살릴 수 있는가?",
    a: "가능합니다. P1 헤리티지 코드를 후드 디테일에 내재화하면 됩니다. 추천 디테일: ① 후드 안감을 Italian Active Tennis 배색(Cream + Tennis Navy stripe) ② 후드 드로우스트링에 Tape Logo (Tone-on-Tone 자수) ③ 후드 내부 라벨에 Pentagon 자수. 단 Hood 유지 시 25S 쿠쉬라이트 공식과는 다른 신규 라인이 되므로 Verdict B(신규 시그니쳐 후보)로 분류.",
    sources: ["§1 타키니다움 체크리스트 #1", "§5 ST OUTER neckline 보조축"],
  },
  {
    q: "Sugi France G1 라이센시 기준에서 이 디자인 통과 가능한 최소 수정 범위는?",
    a: "G1은 전수 검수 + 핵심 SKU Brand Director 게이트가 적용됩니다. 본 디자인은 26FW 런칭 핵심 SKU 후보로 추정되어 Brand Director 게이트 대상. 최소 수정 범위는 대안 2(Cotna Piqué RA3) + 대안 1(로고 재배치)로 P2·P5 회복하면 Verdict가 C → B로 격상되어 통과 가능. Italian Heritage(P1)는 후드 안감·테이프 디테일로 보강 권장.",
    sources: ["§3.4 라이센시 그룹별 거버넌스 차등 (G1 전수)", "Sugi France TIER 3 Annex"],
  },
];
