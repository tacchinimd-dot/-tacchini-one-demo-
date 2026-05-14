/* ============================================================
 * console-data.ts — 콘솔/라이센시/캘린더 페이지 공유 데이터
 *
 * 라벨은 dictionary.ts (KO/EN) 의 console.* 키로 조회.
 * 여기서는 ID·숫자·상태·그룹 등 비번역 데이터만 보관.
 * ============================================================ */

/* ---------- 6 Licensees ---------- */

export type LicenseeId =
  | "bbuk"
  | "sugi_footwear"
  | "sugi_france"
  | "benjamin"
  | "bds"
  | "silver";

export type GroupCode = "G1" | "G2" | "G3";
export type StatusKind = "active" | "warn" | "info" | "danger";

export interface LicenseeRow {
  id: LicenseeId;
  name: string; /* 고유명사 (번역 X) */
  group: GroupCode;
  revenue_eur: number | null; /* null = launching */
  revenue_extra_key?: "launching"; /* 후행 라벨 (€ 0 (런칭 전)) */
  minimum: number;
  compliance: number;
  statusKind: StatusKind;
}

export const LICENSEES: LicenseeRow[] = [
  { id: "bbuk",          name: "BBUK",          group: "G3", revenue_eur: 412_000, minimum: 191, compliance: 88, statusKind: "active" },
  { id: "sugi_footwear", name: "Sugi Footwear", group: "G2", revenue_eur: 286_000, minimum: 32,  compliance: 71, statusKind: "warn" },
  { id: "sugi_france",   name: "Sugi France",   group: "G1", revenue_eur: 0,       revenue_extra_key: "launching", minimum: 0,  compliance: 92, statusKind: "info" },
  { id: "benjamin",      name: "Benjamin",      group: "G3", revenue_eur: 318_000, minimum: 142, compliance: 90, statusKind: "active" },
  { id: "bds",           name: "BDS",           group: "G1", revenue_eur: 92_000,  minimum: 14,  compliance: 84, statusKind: "info" },
  { id: "silver",        name: "SILVER",        group: "G2", revenue_eur: 28_000,  minimum: 18,  compliance: 62, statusKind: "danger" },
];

/* ---------- Season Milestones (26FW · D-180 → D+30) ---------- */

export type MilestoneStatus = "done" | "active" | "pending";

export interface MilestoneRow {
  id: string; /* dictionary key */
  d: number; /* days from launch (-180 ~ +30) */
  status: MilestoneStatus;
}

export const SEASON_MILESTONES: MilestoneRow[] = [
  { id: "m1_direction",   d: -180, status: "done" },
  { id: "m2_competitor",  d: -150, status: "done" },
  { id: "m3_design",      d: -120, status: "active" },
  { id: "m4_design_appr", d: -100, status: "pending" },
  { id: "m5_plan",        d: -90,  status: "pending" },
  { id: "m6_sample",      d: -70,  status: "pending" },
  { id: "m7_sample_appr", d: -60,  status: "pending" },
  { id: "m8_launch",      d: 0,    status: "pending" },
  { id: "m9_royalty",     d: 30,   status: "pending" },
];

/* ---------- Pending Design Reviews ---------- */

export interface ReviewRow {
  id: string;        /* SKU code */
  licensee_id: LicenseeId;
  group: GroupCode;
  item_key: string;  /* dictionary key */
  verdict: "A" | "B" | "C" | "D";
  time_key: string;  /* dictionary time_ago key */
  severity: "low" | "mid" | "high";
  href: string;
}

export const PENDING_REVIEWS: ReviewRow[] = [
  {
    id: "SF-27SS-LM-NET",
    licensee_id: "sugi_france",
    group: "G1",
    item_key: "review_movin_net",
    verdict: "B",
    time_key: "time_now",
    severity: "low",
    href: "/atelier/inspector/movin",
  },
  {
    id: "SF-27SS-LM-FULL",
    licensee_id: "sugi_france",
    group: "G1",
    item_key: "review_movin_full",
    verdict: "B",
    time_key: "time_5m",
    severity: "mid",
    href: "/atelier/inspector/movin",
  },
  {
    id: "SF-26FW-AP-0042",
    licensee_id: "sugi_france",
    group: "G1",
    item_key: "review_heritage_demo",
    verdict: "C",
    time_key: "time_30m",
    severity: "high",
    href: "/atelier/inspector",
  },
];

/* ---------- Activity Feed ---------- */

export type ActivityKind = "review" | "royalty" | "design" | "contract";

export interface ActivityRow {
  id: string;
  kind: ActivityKind;
  icon: string;
  actor_key: string; /* dictionary key */
  verb_key: string;
  target: string;    /* SKU / value / proper noun — usually not translated */
  verdict?: string;
  time_key: string;
  color: string;
}

export const ACTIVITY_EVENTS: ActivityRow[] = [
  { id: "a1", kind: "review",   icon: "AI", actor_key: "actor_atelier", verb_key: "verb_completed_inspection", target: "SF-26FW-AP-0042", verdict: "C", time_key: "time_2m", color: "var(--color-primary)" },
  { id: "a2", kind: "royalty",  icon: "$",  actor_key: "actor_benjamin", verb_key: "verb_submitted_royalty",    target: "€ 14,200",         time_key: "time_47m", color: "var(--color-accent-gold)" },
  { id: "a3", kind: "design",   icon: "✎",  actor_key: "actor_bds",     verb_key: "verb_uploaded_designs",      target: "26FW Apparel",     time_key: "time_2h",  color: "var(--color-court-green)" },
  { id: "a4", kind: "contract", icon: "§",  actor_key: "actor_kwon",    verb_key: "verb_renewed_draft",         target: "Benjamin · 5+5y",  time_key: "time_yesterday", color: "var(--color-accent-red)" },
  { id: "a5", kind: "review",   icon: "AI", actor_key: "actor_atelier", verb_key: "verb_flagged_p5",            target: "BD-26FW-AP-0011",  time_key: "time_yesterday", color: "var(--color-primary)" },
];

/* ---------- Group style (셀에 적용) ---------- */

export const GROUP_STYLE: Record<GroupCode, { color: string; bg: string }> = {
  G1: { color: "var(--color-primary)",    bg: "rgba(0,44,95,0.10)" },
  G2: { color: "var(--color-brick-red)",  bg: "rgba(176,58,46,0.10)" },
  G3: { color: "var(--color-court-green)", bg: "rgba(31,77,58,0.10)" },
};

export const STATUS_STYLE: Record<StatusKind, { color: string; bg: string }> = {
  active: { color: "var(--status-ok)",   bg: "rgba(22,163,74,0.10)" },
  warn:   { color: "var(--status-warn)", bg: "rgba(217,119,6,0.10)" },
  info:   { color: "var(--status-info)", bg: "rgba(37,99,235,0.10)" },
  danger: { color: "var(--status-bad)",  bg: "rgba(220,38,38,0.10)" },
};
