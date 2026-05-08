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

export const PILLAR_META: Record<
  PillarKey,
  { en: string; ko: string; pass: number }
> = {
  P1: { en: "Italian Tennis Heritage", ko: "이탈리안 테니스 헤리티지", pass: 60 },
  P2: { en: "Elegant Functionalism", ko: "우아한 기능주의 (가중치 2배)", pass: 70 },
  P3: { en: "Court-to-Social Lifestyle", ko: "코트에서 일상으로", pass: 60 },
  P4: { en: "Body-Lined Silhouette", ko: "몸이 살아나는 실루엣", pass: 60 },
  P5: { en: "Quiet Performance", ko: "절제된 퍼포먼스", pass: 60 },
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
      issue: "Pentagon 로고가 가슴 중앙 120mm로 과다 노출",
      rule: "P5 Quiet Performance: 로고는 사이드·외측 배치 / Tone-on-Tone 우선 / 그래픽 과다 ❌",
    },
    {
      pillar: "P2",
      severity: "high",
      issue: "Heavy Texture (RA5) × Weight Tier D (380g) 결합",
      rule: "P2 Elegant Functionalism: RA3 Micro Texture가 CORE / RA5는 캐주얼·워크웨어 감성으로 ST 배제 / Weight Tier C (220–300g)이 시그니쳐 손맛 구간",
    },
    {
      pillar: "P1",
      severity: "mid",
      issue: "Italian Tennis Heritage 코드 부재 (배색·플리츠·트랙 디테일 미내재화)",
      rule: "P1 Italian Tennis Heritage: 배색 / 라인 / 플리츠 / 카라 / 트랙 디테일 중 1개 이상 필수",
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
