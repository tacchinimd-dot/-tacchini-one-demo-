/* ============================================================
 * flow-data.ts — 4 End-to-End Flows mock 데이터
 *
 * 09 STE_End_to_End_Flows.html 기반:
 *   Flow A · Sales → Royalty Settlement (Sugi France · Q1 2027)
 *   Flow C · Season Plan Submission     (Sugi France · 27FW)
 *   Flow D · Contract Lifecycle         (BBUK · expiring D-180)
 *
 * Flow B는 기존 Inspector 페이지(/atelier/inspector/movin)가 이미 시뮬.
 * ============================================================ */

/* ---------- Flow A · Royalty ---------- */

export interface RoyaltySkuLine {
  sku: string;
  name: string;
  qty: number;
  unit_eur: number;
  gross_eur: number;
  discount_eur: number;
  net_eur: number;
}

export const ROYALTY_DEMO = {
  licensee: "Sugi France",
  contract_no: "STE-MOVIN-26",
  quarter: "Q1 2027 (Jan – Mar)",
  currency: "EUR",
  fx_rate_label: "ECB quarterly average · 1 EUR = 1.0834 USD",
  total_lines: 28,
  gross_eur: 1_842_000,
  discount_eur: 165_780,
  net_eur: 1_676_220,
  royalty_pct: 10,
  marketing_pct: 2,
  advertising_pct: 2,
  royalty_eur: 167_622,
  marketing_eur: 33_524,
  advertising_eur: 33_524,
  total_invoice_eur: 234_670,
  errors: 0,
  lines: [
    { sku: "SF-27SS-MP-0011", name: "Heritage Polo Cream", qty: 1840, unit_eur: 78, gross_eur: 143_520, discount_eur: 12_916, net_eur: 130_604 },
    { sku: "SF-27SS-MP-0024", name: "Court Polo Navy",    qty: 1612, unit_eur: 82, gross_eur: 132_184, discount_eur: 11_896, net_eur: 120_288 },
    { sku: "SF-27SS-WM-0009", name: "Riviera Skirt White", qty: 1240, unit_eur: 96, gross_eur: 119_040, discount_eur: 10_713, net_eur: 108_327 },
    { sku: "SF-27SS-MJ-0017", name: "Track Jacket Bordeaux", qty: 980, unit_eur: 168, gross_eur: 164_640, discount_eur: 14_817, net_eur: 149_823 },
    { sku: "SF-27SS-WP-0031", name: "Linen Pant Stone",     qty: 1106, unit_eur: 112, gross_eur: 123_872, discount_eur: 11_148, net_eur: 112_724 },
  ] as RoyaltySkuLine[],
  validation_checks: [
    { id: "sku_match", label: "SKU matching (Master DB)", pass: true },
    { id: "fx_rate",   label: "ECB FX rate verification", pass: true },
    { id: "net_calc",  label: "Net = Gross − Discount − Return", pass: true },
    { id: "royalty",   label: "Royalty 10% calculation",   pass: true },
    { id: "mkt",       label: "Marketing 2% contribution", pass: true },
    { id: "ad",        label: "Advertising 2% contribution", pass: true },
  ],
  reported: {
    gross: 1_842_000,
    net: 1_676_220,
    royalty: 167_622,
    marketing: 33_524,
    advertising: 33_524,
    total: 234_670,
  },
  calculated: {
    gross: 1_842_000,
    net: 1_676_220,
    royalty: 167_622,
    marketing: 33_524,
    advertising: 33_524,
    total: 234_670,
  },
  invoice: {
    no: "ST-INV-2027-Q1-MOVIN-001",
    issue_date: "2027-04-15",
    due_date: "2027-05-15",
    recipient: "Sugi France SAS · 14 Rue du Faubourg Saint-Honoré · 75008 Paris",
  },
};

/* ---------- Flow C · Season Plan ---------- */

export const PLAN_DEMO = {
  licensee: "Sugi France",
  season: "27FW",
  contract_no: "STE-MOVIN-26",

  /* 3-C Sales · SKU */
  three_c: {
    total_revenue_eur: 1_650_000,
    minimum_pct: 110, /* contract Min 105% */
    contract_minimum_eur: 1_500_000,
    sku_count: 78,
    prior_sku_count: 70,
    categories: [
      { id: "apparel_men",   label: "Men's Apparel",   share_pct: 38, revenue_eur: 627_000 },
      { id: "apparel_women", label: "Women's Apparel", share_pct: 22, revenue_eur: 363_000 },
      { id: "outerwear",     label: "Outerwear",       share_pct: 18, revenue_eur: 297_000 },
      { id: "accessories",   label: "Accessories",     share_pct: 12, revenue_eur: 198_000 },
      { id: "athleisure",    label: "Athleisure",      share_pct: 10, revenue_eur: 165_000 },
    ],
    price_tier: { entry_pct: 24, mid_pct: 38, premium_pct: 38 },
  },

  ai_review: {
    score_overall: 87,
    signals: [
      { kind: "strong", label: "Min 110% — exceeds contract floor 105% by +5pt" },
      { kind: "ok",     label: "Apparel 60% mix — within EU market avg 65±10%" },
      { kind: "ok",     label: "78 SKUs (+11% vs prior) — within healthy growth band" },
      { kind: "strong", label: "Premium 38% — matches Affordable Premium positioning" },
      { kind: "info",   label: "Athleisure 10% — first appearance, monitor Q1 sell-through" },
    ],
    recommendation: "approve",
  },

  /* 3-A Marketing */
  three_a: {
    total_budget_eur: 132_000, /* ~8% of revenue */
    campaigns: [
      { id: "c1", label: "Heritage Court — print + outdoor",   budget_eur: 48_000, channel: "OOH · Print" },
      { id: "c2", label: "Riviera Capsule — IG + TikTok",       budget_eur: 36_000, channel: "Social" },
      { id: "c3", label: "Wholesale Pop-up · Galeries Lafayette", budget_eur: 28_000, channel: "Retail Event" },
      { id: "c4", label: "Influencer seeding · 24 micro talents",  budget_eur: 20_000, channel: "Influencer" },
    ],
    review_status: "approved",
  },

  /* 3-B Distribution */
  three_b: {
    accounts_total: 142,
    tiers: [
      { tier: 1, label: "Tier 1 · Heritage doors", count: 18, share_pct: 35, examples: "Galeries Lafayette · Printemps · Le Bon Marché" },
      { tier: 2, label: "Tier 2 · Premium multi-brand", count: 56, share_pct: 42, examples: "Citadium · Slam Jam · Suppa" },
      { tier: 3, label: "Tier 3 · Specialty + DTC",     count: 68, share_pct: 23, examples: "DTC web · Ricardo Concept · Wales Bonner select" },
    ],
    review_status: "approved",
  },

  milestone_q1_label: "Q1 Actual vs Plan auto-report",
};

/* ---------- Flow D · Contract ---------- */

export const CONTRACT_DEMO = {
  licensee: "BBUK",
  contract_no: "STE-BBUK-22-26",
  period: "2022-10-01 ~ 2026-09-30",
  region: "United Kingdom · Ireland",
  category: "Apparel + Accessories",
  status_label: "Expiring D-180",

  alerts: [
    { d: 365, label: "12 months before expiry", sent: true,  date: "2025-09-30" },
    { d: 180, label: "6 months before expiry · Now", sent: true,  date: "2026-03-30" },
    { d: 90,  label: "3 months before expiry",  sent: false, date: "2026-06-30" },
    { d: 30,  label: "1 month before expiry",   sent: false, date: "2026-08-30" },
  ],

  performance: {
    cumulative_minimum_pct: 191, /* 3-year cumulative */
    annual_growth_pct: 18,
    design_compliance_pct: 88,
    deadline_punctuality_pct: 92,
  },

  ai_recommendation: "renew",
  ai_proposal: {
    new_term_label: "5-year renewal · 2026-10-01 ~ 2031-09-30",
    royalty_from_pct: 5.0,
    royalty_to_pct: 5.5,
    minimum_from_eur: 420_000,
    minimum_to_eur: 550_000,
    brand_elevation_clause: "Limited Edition Heritage Capsule (annual)",
  },

  negotiation_thread: [
    {
      id: "v1-offer",
      from: "F&F",
      version: "v1 — F&F Offer",
      timestamp: "2026-04-02 10:14",
      body: "5-year renewal · Royalty 5.5% · Annual Min €550k (+31%) · Heritage Capsule clause",
      tone: "offer" as const,
    },
    {
      id: "v1-counter",
      from: "BBUK",
      version: "v1 — BBUK Counter",
      timestamp: "2026-04-09 16:48",
      body: "5-year renewal accepted · Royalty 5.25% requested · Min €510k (+21%) — Heritage Capsule OK with co-design",
      tone: "counter" as const,
    },
    {
      id: "v2-offer",
      from: "F&F",
      version: "v2 — F&F Offer",
      timestamp: "2026-04-22 11:30",
      body: "5-year renewal · Royalty 5.4% · Min €530k (+26%) · Heritage Capsule with co-design (F&F creative direction)",
      tone: "offer" as const,
    },
    {
      id: "agreed",
      from: "Both",
      version: "Mutual Agreement",
      timestamp: "2026-04-28 09:05",
      body: "Agreed terms — Royalty 5.4% · Annual Min €530k · 5-year renewal (2026.10 ~ 2031.10) · Heritage Capsule with co-design",
      tone: "agreed" as const,
    },
  ],

  new_contract: {
    contract_no: "STE-BBUK-26-31",
    period: "2026-10-01 ~ 2031-09-30",
    royalty_pct: 5.4,
    annual_minimum_eur: 530_000,
    signed_date: "2026-04-30",
    signed_by: "권은희 차장 (F&F · ST사업부) · James Whitfield (BBUK · CEO)",
    history_count: { messages: 12, versions: 3 },
  },
};

/* ---------- Flow cards summary (console main) ---------- */

export interface FlowCard {
  id: "a" | "b" | "c" | "d";
  href: string;
  progress: number;
  accent: string;
  icon: string;
  parties: string;
  live: boolean;
}

export const FLOW_CARDS: FlowCard[] = [
  {
    id: "a",
    href: "/console/flows/royalty",
    progress: 80,
    accent: "var(--color-accent-gold)",
    icon: "$",
    parties: "Sugi France · F&F Finance · F&F Business",
    live: false,
  },
  {
    id: "b",
    href: "/atelier/inspector/movin",
    progress: 43,
    accent: "var(--color-primary)",
    icon: "✎",
    parties: "Sugi France · F&F Brand Director · ATELIER ONE",
    live: true,
  },
  {
    id: "c",
    href: "/console/flows/plan",
    progress: 30,
    accent: "var(--color-court-green)",
    icon: "▤",
    parties: "Sugi France · F&F Business · F&F Brand Director",
    live: false,
  },
  {
    id: "d",
    href: "/console/flows/contract",
    progress: 40,
    accent: "var(--color-accent-red)",
    icon: "§",
    parties: "BBUK · F&F Brand Director · F&F Legal",
    live: false,
  },
];
