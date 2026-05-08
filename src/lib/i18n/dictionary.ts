/* ============================================================
 * i18n Dictionary — TACCHINI ONE 데모 한·영 사전
 *
 * 스코프:
 *   · 도어(/) 전체 카피
 *   · 콘솔(/console) 헤더·KPI 라벨·테이블 헤더
 *   · Inspector(/atelier/inspector) Step 이름·핵심 버튼·status
 *   · Sidebar 네비게이션
 *
 * 데이터 본문(라이센시명·디자인 ID·violation 텍스트·codex 답변 등)은
 * 시간 절약을 위해 한국어 그대로 유지 — 데모 스코프 한정.
 * ============================================================ */

export type Lang = "ko" | "en";

export const dictionary = {
  ko: {
    /* ===== 공통 ===== */
    common: {
      enter: "들어가기",
      open: "열기",
      back: "뒤로",
      next: "다음",
      previous: "이전",
      close: "닫기",
      reset: "초기화",
      view_all: "전체 보기",
      coming_soon: "준비 중",
      live: "Live",
      preview: "Preview",
      soon: "Soon",
      welcome_back: "다시 오신 것을 환영합니다",
      all_systems: "모든 시스템 정상",
      friday: "금요일",
      may: "5월",
      year: "2026년",
    },

    /* ===== Sidebar ===== */
    sidebar: {
      brand_subtitle: "GLOBAL LICENSEE HUB",
      tenant_org: "F&F HQ",
      tenant_dept: "STE Operations",
      group_operations: "Operations",
      group_atelier: "Atelier One · AI Agent",
      nav_dashboard: "Dashboard",
      nav_licensees: "Licensees",
      nav_royalty: "Royalty",
      nav_design: "Design Reviews",
      nav_calendar: "Season Calendar",
      nav_plans: "Plans",
      nav_contracts: "Contracts",
      nav_inspector: "Inspector",
      nav_studio: "Studio",
      nav_mirror: "Mirror",
      nav_codex: "Codex",
      user_role: "ST사업부 라이센스",
      version_label: "v0.4 · CONFERENCE PREVIEW",
      back_to_platform: "TACCHINI ONE 플랫폼으로",
    },

    /* ===== 도어 (/) ===== */
    door: {
      header_brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      quick_search: "빠른 검색",
      welcome: "다시 오신 것을 환영합니다",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Sergio Tacchini의 글로벌 라이센시 운영 플랫폼.\n아래 모듈 중 하나를 선택해서 작업을 시작하세요.",
      pill_active_licensees: "6개 라이센시 운영 중",
      pill_awaiting: "검수 대기 2건",
      pill_q1_royalty: "Q1 로열티 €1.84M",
      pill_season: "26FW · D-180",

      workspaces_label: "Workspaces",
      workspaces_title: "어느 모듈로 들어갈까요",
      workspaces_summary: "6개 모듈 중 4개 활성",

      mod_ops_subtitle: "Operations Console",
      mod_ops_title: "Operations",
      mod_ops_body:
        "6개 라이센시 통합 모니터링. KPI · 시즌 캘린더 D-day · 라이센시 Health Matrix · 활동 피드를 한 화면에서.",
      mod_ops_stat_licensees: "라이센시",
      mod_ops_stat_compliance: "컴플라이언스",
      mod_ops_stat_pending: "대기",
      mod_ops_stat_pending_v: "검수 2건",

      mod_atelier_subtitle: "Atelier One — AI Design Agent",
      mod_atelier_title: "Atelier",
      mod_atelier_body:
        "라이센시 디자인을 5 Universal Pillars로 자동 검수. Inspector · Studio · Mirror · Codex 4 모듈을 한 워크스페이스에서.",
      mod_atelier_stat_week: "이번 주",
      mod_atelier_stat_week_v: "+검수 5건",
      mod_atelier_stat_avg: "평균 등급",
      mod_atelier_stat_pending: "대기",
      mod_atelier_stat_pending_v: "디자인 2건",

      mod_royalty_subtitle: "Royalty",
      mod_royalty_title: "Dual Verification",
      mod_royalty_body:
        "라이센시 보고 vs AI 산정 자동 비교 · 양측 동의 후 자동 인보이스.",
      mod_royalty_stat_q1: "Q1",
      mod_royalty_stat_pending: "대기",
      mod_royalty_stat_pending_v: "정산 3건",

      mod_calendar_subtitle: "Season Calendar",
      mod_calendar_title: "26FW · D-180",
      mod_calendar_body: "시즌 시간축. 마일스톤 11개 · 라이센시별 진행률 · 자동 알림.",
      mod_calendar_stat_progress: "진행률",
      mod_calendar_stat_next: "다음",

      mod_contracts_subtitle: "Contracts",
      mod_contracts_title: "Lifecycle",
      mod_contracts_body:
        "만료·갱신·종료. AI 갱신 인사이트 자동 생성 (누적 Min · 컴플라이언스).",
      mod_contracts_stat_expiring: "만료 임박",
      mod_contracts_stat_expiring_v: "12개월 내 2건",
      mod_contracts_stat_renewals: "갱신",
      mod_contracts_stat_renewals_v: "협상 1건",

      mod_codex_subtitle: "Brand Codex",
      mod_codex_title: "5 Pillars",
      mod_codex_body:
        "Universal Pillars · Category Codex · Licensee Annex 3-Tier RAG.",
      mod_codex_stat_pillars: "Pillars",
      mod_codex_stat_pillars_v: "5개 활성",
      mod_codex_stat_annex: "라이센시 Annex",

      activity_label: "최근 활동",
      activity_atelier_flagged: "검수 결과 발행",
      activity_benjamin_submitted: "Q1 로열티 제출",
      activity_bds_uploaded: "디자인 12건 업로드",
      activity_kwon_drafted: "갱신안 초안 작성",

      quick_actions_label: "빠른 액션",
      qa_inspector: "Inspector 데모 열기",
      qa_inspector_body: "라이브 디자인 검수 데모 시작",
      qa_apex: "Apex 리포트 보기",
      qa_apex_body: "Sugi France 26FW 검수 리포트",
      qa_console: "Operations Console",
      qa_console_body: "6개 라이센시 통합 대시보드",

      footer_legal: "© 2026 F&F Co., Ltd. · Sergio Tacchini Brand · Internal preview · Not for distribution.",
      footer_version: "v0.4 · Conference Preview",
    },

    /* ===== 콘솔 (/console) ===== */
    console: {
      breadcrumb_platform: "Platform",
      breadcrumb_hq: "F&F HQ",
      breadcrumb_ste: "STE Operations",
      breadcrumb_dashboard: "Dashboard",
      title: "Global Operations",
      subtitle: "6개 라이센시 통합 운영 · 26FW 시즌 진행 중",
      cta_new_review: "새 디자인 검수",

      kpi_licensees: "Active Licensees",
      kpi_licensees_caption: "STE",
      kpi_licensees_delta: "G1·2 · G2·2 · G3·2",
      kpi_royalty: "Q1 로열티",
      kpi_royalty_caption: "이중 검증 완료",
      kpi_reviews: "Design Reviews",
      kpi_reviews_caption: "HQ 검토 대기 2건",
      kpi_reviews_delta: "이번 주 +5",
      kpi_compliance: "Pillar 컴플라이언스",
      kpi_compliance_caption: "ATELIER ONE 평균",
      kpi_compliance_delta: "이전 대비 +2.1",

      season_label: "Season Calendar",
      season_title: "26FW · D-180",
      season_subtitle: "마스터 시간축 · 마일스톤 11개 · 최근 단계: 디렉션 게시 완료",
      season_open: "캘린더 열기",
      season_next: "NEXT",

      pending_label: "HQ 검수 대기",
      pending_title: "검수 2건",
      pending_view_all: "전체 보기",
      pending_open: "Inspector 데모 열기 →",

      atelier_label: "AI 디자인 에이전트",
      atelier_title: "ATELIER ONE",
      atelier_body:
        "5 Universal Pillars · §6 검증 공식 · 라이센시 그룹별 임계값으로 디자인을 자동 검수하고 타키니화 대안을 즉시 생성합니다.",
      atelier_cta: "Inspector 라이브 데모 열기",

      matrix_label: "Operations",
      matrix_title: "라이센시 6개 · Health Matrix",
      matrix_filter: "필터",
      matrix_export: "내보내기",
      th_licensee: "라이센시",
      th_group: "그룹",
      th_region: "지역 · 카테고리",
      th_revenue: "Q1 매출",
      th_minimum: "누적 Min %",
      th_compliance: "컴플라이언스",
      th_status: "상태",

      revenue_label: "시그니쳐 매출",
      revenue_title: "플라잉스커트 시즌별 추이",
      revenue_subtitle: "한국 데이터 누적 19.5억원 · ATELIER ONE 검증 공식 ①",

      activity_label: "Activity",
      activity_title: "최근 이벤트",
      activity_all: "전체",
    },

    /* ===== Inspector ===== */
    inspector: {
      breadcrumb_atelier: "Atelier One",
      breadcrumb_inspector: "Inspector",
      title: "Design Review Workspace",
      subtitle: "Live 데모 · 5 Universal Pillars × §6 검증 공식 × G1 임계값",
      apex_button: "전체 Apex 리포트 열기",
      step: "Step",
      reset: "데모 초기화",

      step1_label: "Step 1 · Upload",
      step1_title: "디자인 산출물 제출",
      step1_body:
        "라이센시가 CAD/3D/스케치를 업로드하면 ATELIER ONE Inspector가 5 Universal Pillars 기준으로 1차 검수합니다.",
      step1_drop_main: "CAD · 3D · 스케치 · 이미지 파일을 끌어다 놓으세요",
      step1_drop_sub: "지원 포맷: .png .jpg .pdf .ai .psd .obj .glb · 최대 50MB",
      step1_demo_intro: "데모용 샘플 디자인을 사용하시려면",
      step1_start: "데모 시작 →",
      step1_sample_label: "샘플 제출본",
      step1_tenant: "Tenant",
      step1_rules: "검수 규칙",
      step1_threshold: "G1 임계값:",
      step1_threshold_value: "전수 검수 · Brand Director 게이트",

      step2_title: "ATELIER ONE Inspector 검수 중",
      step2_subtitle: "5 Universal Pillars × §6 검증 공식 × G1 임계값 적용",
      step2_phase1: "금지 영역 검사 (Forbidden Zones)",
      step2_phase2: "5 Pillars 평가",
      step2_phase3: "검증 공식 매칭 (§6 시그니쳐 일치도)",
      step2_phase4: "라이센시 그룹별 임계값 적용",
      step2_phase5: "타키니화 대안 생성",
      step2_inprogress: "진행 중",

      step3_label: "Step 3 · Verdict",
      step3_radar: "5 Pillars 점수",
      step3_legend_pass: "통과",
      step3_legend_fail: "미달",
      step3_legend_threshold: "60% 임계",
      step3_violations: "위반 항목",
      step3_violations_count: (n: number) => `위반 항목 ${n}건`,
      step3_view_full: "전체 리포트 보기",
      step3_open_apex: "전체 Apex 리포트 열기",
      step3_next: "대안 3안 보기",
      step3_closest_signature: "가까운 시그니쳐",
      step3_axis_match: "핵심축 일치도",
      step3_inspected_at: "검수 시각",

      step4_label: "Step 4 · Alternatives",
      step4_title: "타키니화 대안 3안",
      step4_body:
        "ATELIER ONE Studio가 위반 항목별 자동 생성. 모두 적용 시 가장 가까운 시그니쳐 공식과 일치 축이 3 → 5로 도달합니다.",
      step4_before: "Before · 라이센시 제출본",
      step4_after: "After · 3안 모두 적용",
      step4_recovers: "회복:",
      step4_develop_notes: "디벨롭 노트",
      step4_next: "CODEX에 추가 질의",

      step5_label: "Step 5 · Codex Q&A",
      step5_title: "F&F 검수자 + ATELIER ONE",
      step5_body:
        "검수 결과를 함께 보면서 자연어로 추가 질의. CODEX가 5 Pillars 마스터 + §6 검증 공식 + 라이센시 Annex를 RAG로 응답합니다.",
      step5_reviewer: "F&F DESIGN REVIEWER",
      step5_codex: "ATELIER ONE · CODEX",
      step5_show_answer: "ATELIER ONE 답변 보기",
      step5_sources: "출처:",
      step5_progress: (a: number, b: number) =>
        `모든 질문에 답변을 받은 뒤 다음 단계로 (${a}/${b})`,
      step5_done: "모든 답변 확인 완료 ✓",
      step5_next: "의사결정 단계로",

      step6_label: "Step 6 · Decision",
      step6_title: "F&F 디자인 승인 의사결정",
      step6_body:
        "검수 결과·대안·CODEX 답변을 종합한 뒤 라이센시에게 자동 피드백이 송출됩니다.",
      step6_recommended: "RECOMMENDED",
      step6_approve_title: "Approve",
      step6_approve_ko: "승인",
      step6_approve_body: "현재 디자인 그대로 실물 샘플 단계로 진행",
      step6_revise_title: "Revise",
      step6_revise_ko: "수정 요청",
      step6_revise_body: "대안 3안 모두 적용 후 재제출 — Verdict B 격상 후 재검수",
      step6_reject_title: "Reject",
      step6_reject_ko: "반려",
      step6_reject_body: "디자인 단계 재진입 — 핵심 SKU에서 제외하고 처음부터 재기획",
      step6_next_steps: "Auto Trigger · 다음 단계",
      step6_open_apex: "Apex 리포트 열기",
      step6_back: "데모 처음으로 ↺",
      step6_dashboard: "Dashboard로",
    },

    /* ===== 공통 status ===== */
    status: {
      negotiating: "갱신 협상 중",
      brand_elevation: "Brand Elevation",
      launch: "26FW 런칭",
      extension_request: "5+5년 연장 요청",
      first_year: "신계약 원년",
      ending: "사실상 종료",
      group_g1: "G1 신규",
      group_g2: "G2 격상/종료",
      group_g3: "G3 장기 운영",
    },
  },

  en: {
    common: {
      enter: "Enter",
      open: "Open",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      reset: "Reset",
      view_all: "View all",
      coming_soon: "Coming soon",
      live: "Live",
      preview: "Preview",
      soon: "Soon",
      welcome_back: "Welcome back",
      all_systems: "All systems",
      friday: "Friday",
      may: "May",
      year: "2026",
    },

    sidebar: {
      brand_subtitle: "GLOBAL LICENSEE HUB",
      tenant_org: "F&F HQ",
      tenant_dept: "STE Operations",
      group_operations: "Operations",
      group_atelier: "Atelier One · AI Agent",
      nav_dashboard: "Dashboard",
      nav_licensees: "Licensees",
      nav_royalty: "Royalty",
      nav_design: "Design Reviews",
      nav_calendar: "Season Calendar",
      nav_plans: "Plans",
      nav_contracts: "Contracts",
      nav_inspector: "Inspector",
      nav_studio: "Studio",
      nav_mirror: "Mirror",
      nav_codex: "Codex",
      user_role: "ST Business · License",
      version_label: "v0.4 · CONFERENCE PREVIEW",
      back_to_platform: "Back to TACCHINI ONE Platform",
    },

    door: {
      header_brand_subtitle: "GLOBAL LICENSEE PLATFORM",
      quick_search: "Quick search",
      welcome: "Welcome back",
      hero_line1: "One Voice.",
      hero_line2: "One Brand.",
      hero_line3: "Tacchini One.",
      hero_body:
        "Global licensee operating platform for Sergio Tacchini.\nChoose a module below to start working.",
      pill_active_licensees: "6 Active Licensees",
      pill_awaiting: "2 Awaiting Review",
      pill_q1_royalty: "€ 1.84M Q1 Royalty",
      pill_season: "26FW · D-180",

      workspaces_label: "Workspaces",
      workspaces_title: "Choose a module to enter",
      workspaces_summary: "4 of 6 modules live",

      mod_ops_subtitle: "Operations Console",
      mod_ops_title: "Operations",
      mod_ops_body:
        "Unified monitoring for 6 licensees. KPIs, season calendar D-day, licensee health matrix, and activity feed in one view.",
      mod_ops_stat_licensees: "Licensees",
      mod_ops_stat_compliance: "Compliance",
      mod_ops_stat_pending: "Pending",
      mod_ops_stat_pending_v: "2 reviews",

      mod_atelier_subtitle: "Atelier One — AI Design Agent",
      mod_atelier_title: "Atelier",
      mod_atelier_body:
        "Auto-inspect licensee designs against 5 Universal Pillars. Inspector · Studio · Mirror · Codex — four modules in one workspace.",
      mod_atelier_stat_week: "This week",
      mod_atelier_stat_week_v: "+5 reviews",
      mod_atelier_stat_avg: "Verdict avg",
      mod_atelier_stat_pending: "Awaiting",
      mod_atelier_stat_pending_v: "2 designs",

      mod_royalty_subtitle: "Royalty",
      mod_royalty_title: "Dual Verification",
      mod_royalty_body:
        "Auto-compare licensee report vs AI calculation · Auto-invoice on mutual approval.",
      mod_royalty_stat_q1: "Q1",
      mod_royalty_stat_pending: "Pending",
      mod_royalty_stat_pending_v: "3 awaiting",

      mod_calendar_subtitle: "Season Calendar",
      mod_calendar_title: "26FW · D-180",
      mod_calendar_body: "Season time axis. 11 milestones · per-licensee progress · auto-alerts.",
      mod_calendar_stat_progress: "Progress",
      mod_calendar_stat_next: "Next",

      mod_contracts_subtitle: "Contracts",
      mod_contracts_title: "Lifecycle",
      mod_contracts_body:
        "Expiry · renewal · termination. AI renewal insights (cumulative Min · compliance).",
      mod_contracts_stat_expiring: "Expiring",
      mod_contracts_stat_expiring_v: "2 in 12mo",
      mod_contracts_stat_renewals: "Renewals",
      mod_contracts_stat_renewals_v: "1 active",

      mod_codex_subtitle: "Brand Codex",
      mod_codex_title: "5 Pillars",
      mod_codex_body:
        "Universal Pillars · Category Codex · Licensee Annex — 3-tier RAG.",
      mod_codex_stat_pillars: "Pillars",
      mod_codex_stat_pillars_v: "5 · live",
      mod_codex_stat_annex: "Annex",

      activity_label: "Recent Activity",
      activity_atelier_flagged: "completed inspection",
      activity_benjamin_submitted: "submitted Q1 royalty",
      activity_bds_uploaded: "uploaded 12 designs",
      activity_kwon_drafted: "drafted renewal contract",

      quick_actions_label: "Quick Actions",
      qa_inspector: "Open Inspector Demo",
      qa_inspector_body: "Start the live design review demo",
      qa_apex: "View Apex Report",
      qa_apex_body: "Sugi France 26FW review report",
      qa_console: "Operations Console",
      qa_console_body: "Unified dashboard for 6 licensees",

      footer_legal: "© 2026 F&F Co., Ltd. · Sergio Tacchini Brand · Internal preview · Not for distribution.",
      footer_version: "v0.4 · Conference Preview",
    },

    console: {
      breadcrumb_platform: "Platform",
      breadcrumb_hq: "F&F HQ",
      breadcrumb_ste: "STE Operations",
      breadcrumb_dashboard: "Dashboard",
      title: "Global Operations",
      subtitle: "Unified operations for 6 licensees · 26FW season in progress",
      cta_new_review: "New Design Review",

      kpi_licensees: "Active Licensees",
      kpi_licensees_caption: "STE",
      kpi_licensees_delta: "G1·2 · G2·2 · G3·2",
      kpi_royalty: "Q1 Royalty",
      kpi_royalty_caption: "Dual Verified",
      kpi_reviews: "Design Reviews",
      kpi_reviews_caption: "2 awaiting HQ approval",
      kpi_reviews_delta: "+5 this week",
      kpi_compliance: "Pillar Compliance",
      kpi_compliance_caption: "ATELIER ONE avg.",
      kpi_compliance_delta: "+2.1 vs prev",

      season_label: "Season Calendar",
      season_title: "26FW · D-180",
      season_subtitle: "Master time axis · 11 milestones · Latest: F&F season direction published",
      season_open: "Open Calendar",
      season_next: "NEXT",

      pending_label: "Awaiting HQ",
      pending_title: "2 Reviews",
      pending_view_all: "View all",
      pending_open: "Open Inspector Demo →",

      atelier_label: "AI DESIGN AGENT",
      atelier_title: "ATELIER ONE",
      atelier_body:
        "5 Universal Pillars · §6 validated formulas · per-group thresholds. Auto-inspects designs and generates tacchini-style alternatives instantly.",
      atelier_cta: "Open Inspector Live Demo",

      matrix_label: "Operations",
      matrix_title: "6 Licensees · Health Matrix",
      matrix_filter: "Filter",
      matrix_export: "Export",
      th_licensee: "Licensee",
      th_group: "Group",
      th_region: "Region · Category",
      th_revenue: "Q1 Revenue",
      th_minimum: "Cum. Min %",
      th_compliance: "Compliance",
      th_status: "Status",

      revenue_label: "Signature Revenue",
      revenue_title: "Flying Skirt — Season Trend",
      revenue_subtitle: "KR cumulative ₩1.95B · ATELIER ONE validated formula ①",

      activity_label: "Activity",
      activity_title: "Recent Events",
      activity_all: "All",
    },

    inspector: {
      breadcrumb_atelier: "Atelier One",
      breadcrumb_inspector: "Inspector",
      title: "Design Review Workspace",
      subtitle: "Live demo · 5 Universal Pillars × §6 validated formulas × G1 thresholds",
      apex_button: "Full Apex Report",
      step: "Step",
      reset: "Reset Demo",

      step1_label: "Step 1 · Upload",
      step1_title: "Submit Design Artifact",
      step1_body:
        "When licensees upload CAD/3D/sketches, ATELIER ONE Inspector performs first-pass review against 5 Universal Pillars.",
      step1_drop_main: "Drop CAD · 3D · sketch · image files here",
      step1_drop_sub: "Supported: .png .jpg .pdf .ai .psd .obj .glb · max 50MB",
      step1_demo_intro: "To use a demo sample design",
      step1_start: "Start Demo →",
      step1_sample_label: "Sample Submission",
      step1_tenant: "Tenant",
      step1_rules: "Inspection Rules",
      step1_threshold: "G1 threshold:",
      step1_threshold_value: "All-design review · Brand Director gate",

      step2_title: "ATELIER ONE Inspector — Inspecting",
      step2_subtitle: "5 Universal Pillars × §6 formulas × G1 threshold applied",
      step2_phase1: "Forbidden Zones check",
      step2_phase2: "5 Pillars evaluation",
      step2_phase3: "Formula matching (§6 signature similarity)",
      step2_phase4: "Group-level threshold applied",
      step2_phase5: "Tacchini-style alternatives generation",
      step2_inprogress: "in progress",

      step3_label: "Step 3 · Verdict",
      step3_radar: "5 Pillars Score",
      step3_legend_pass: "Pass",
      step3_legend_fail: "Below",
      step3_legend_threshold: "60% threshold",
      step3_violations: "Violations",
      step3_violations_count: (n: number) => `${n} Violation${n === 1 ? "" : "s"}`,
      step3_view_full: "View Full Report",
      step3_open_apex: "Open Full Apex Report",
      step3_next: "View 3 Alternatives",
      step3_closest_signature: "Closest Signature",
      step3_axis_match: "Axis match",
      step3_inspected_at: "Inspected at",

      step4_label: "Step 4 · Alternatives",
      step4_title: "3 Tacchini-Style Alternatives",
      step4_body:
        "Auto-generated by ATELIER ONE Studio for each violation. With all three applied, axis match against the closest signature formula climbs from 3 → 5.",
      step4_before: "Before · Licensee submission",
      step4_after: "After · All 3 alternatives applied",
      step4_recovers: "Recovers:",
      step4_develop_notes: "Develop Notes",
      step4_next: "Ask Codex",

      step5_label: "Step 5 · Codex Q&A",
      step5_title: "F&F Reviewer + ATELIER ONE",
      step5_body:
        "Review results together while asking follow-up questions in natural language. CODEX retrieves answers from the 5 Pillars master · §6 formulas · Licensee Annex via RAG.",
      step5_reviewer: "F&F DESIGN REVIEWER",
      step5_codex: "ATELIER ONE · CODEX",
      step5_show_answer: "Show ATELIER ONE answer",
      step5_sources: "Sources:",
      step5_progress: (a: number, b: number) =>
        `Reveal all answers to proceed (${a}/${b})`,
      step5_done: "All answers reviewed ✓",
      step5_next: "Proceed to Decision",

      step6_label: "Step 6 · Decision",
      step6_title: "F&F Design Approval Decision",
      step6_body:
        "Combine inspection results, alternatives, and CODEX answers — auto-feedback is dispatched to the licensee.",
      step6_recommended: "RECOMMENDED",
      step6_approve_title: "Approve",
      step6_approve_ko: "Approve",
      step6_approve_body: "Proceed to physical sample stage as is",
      step6_revise_title: "Revise",
      step6_revise_ko: "Revise",
      step6_revise_body:
        "Apply all 3 alternatives, resubmit — re-inspect at Verdict B level",
      step6_reject_title: "Reject",
      step6_reject_ko: "Reject",
      step6_reject_body:
        "Re-enter design phase — exclude from core SKU, re-plan from scratch",
      step6_next_steps: "Auto Trigger · Next Steps",
      step6_open_apex: "Open Apex Report",
      step6_back: "Restart Demo ↺",
      step6_dashboard: "To Dashboard",
    },

    status: {
      negotiating: "Renewal in negotiation",
      brand_elevation: "Brand Elevation",
      launch: "26FW Launch",
      extension_request: "5+5y extension requested",
      first_year: "First contract year",
      ending: "De facto ending",
      group_g1: "G1 New",
      group_g2: "G2 Elevation/End",
      group_g3: "G3 Long-term",
    },
  },
};

export type Dictionary = typeof dictionary.ko;
