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
      qa_apex: "AI-Report 보기",
      qa_apex_body: "Sugi France 26FW AI 검수 리포트",
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
      pending_title: "검수 3건",
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
      apex_button: "전체 AI-Report 열기",
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
      step3_open_apex: "전체 AI-Report 열기",
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
      step6_open_apex: "AI-Report 열기",
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

    /* ===== MOVIN Inspector (실데이터 검수) ===== */
    movin: {
      breadcrumb_inspector: "Inspector",
      breadcrumb_licensee: "Sugi France · 27SS",
      header_title: "Sugi France · 27SS Lifestyle Man",
      header_subtitle: "라이센시 PDF 6개 자동 파싱 · 5 Pillars 검수 룰 · Brandbook 2026 기반",
      live_prototype: "LIVE PROTOTYPE",
      step_upload: "1 · Upload",
      step_analyzing: "2 · Analyzing",
      step_result: "3 · Result",
      total_inspected: (n: number) => `${n} SKUs 자동검수 완료`,
      guide_button: "검수 기준 보기",
      back_to_lines: "← 라인 목록",
      reset_flow: "↺ 다시 업로드",

      /* Step 1 — Upload */
      step1_label: "Step 1 · Upload",
      step1_title: "CAD 패키지 업로드",
      step1_body:
        "라이센시가 시즌 패키지(라인별 PDF · 각각 여러 SKU 포함)를 업로드하면 ATELIER ONE이 텍스트 추출 → SKU 분리 → 5 Pillars 자동 검수합니다.",
      drop_main: "CAD · PDF · 이미지 패키지를 끌어다 놓으세요",
      drop_sub:
        "지원 포맷: .pdf .png .jpg .ai .psd · 라인당 1개 PDF 권장 · 라이센시당 최대 1 GB",
      demo_intro: "데모용으로 Sugi France 27SS 실 제출본 사용",
      start_button: "검수 시작 →",
      files_label: (n: number) => `제출된 파일 — ${n} PDFs`,
      file_ready: "Ready",
      file_sku_unit: "SKUs",
      submission_label: "Submission",
      submission_season: "Season",
      submission_category: "Category",
      submission_group: "Group",
      submission_g1: "G1 신규",
      submission_files: "Files",
      submission_size: "Total size",
      submission_skus: "Total SKUs",
      pdfs_unit: "PDFs",
      pieces: "개",
      rules_label: "Auto-Inspection 룰",
      rules_p1: "Italian Tennis Heritage (5 sub)",
      rules_p2: "Elegant Functionalism (6 sub · ×2 가중)",
      rules_p3: "Court-to-Social Lifestyle (4 sub)",
      rules_p4: "Body-Lined Silhouette (5 sub)",
      rules_p5: "Quiet Performance (6 sub)",
      rules_total: "총 26 sub-rules + 8 ABSOLUTE NO · Brandbook 2026 기반",

      /* Step 2 — Analyzing */
      step2_title: "ATELIER ONE · Auto-Inspecting",
      step2_subtitle: (skus: number, lines: number) =>
        `Sugi France 27SS Lifestyle Man · ${skus} SKUs · ${lines} lines`,
      step2_phase1: (n: number) =>
        `${n}개 PDF 파싱 중 (T1_ACE · T1_BAGEL · T1_NET · ...)`,
      step2_phase2: (n: number) =>
        `${n}개 SKU · 소재 비율 · TCX 컬러 코드 추출`,
      step2_phase3: "5 Universal Pillars 적용 (26 sub-rules · Brandbook 2026)",
      step2_phase4: "ABSOLUTE NO 8 검증 · SKU별 Verdict 산출",
      step2_phase5: "라인 등급 + 라이센시 종합 등급 집계",
      step2_inprogress: "진행 중",

      /* Step 3 — Result */
      step3_overall_label: "Licensee Verdict · Submission Summary",
      step3_overall_caption: (skus: number, lines: number, time: string) =>
        `${skus} SKUs · ${lines} lines · 검수: ${time}`,
      stat_avg_score: "평균 등급 점수",
      stat_a_label: "A · Approve",
      stat_b_label: "B · Approve w/ Notes",
      stat_cd_label: "C / D · 수정 필요",
      verdict_distribution: "Verdict Distribution",
      lines_label: "6 LINES · 라인을 클릭하면 SKU 상세를 볼 수 있습니다",
      line_stats_sku: "SKU",
      line_stats_avg: "평균 점수",
      line_pillars_inspected: "5 Pillars 검수 완료",
      line_detail_cta: "SKU 상세 →",
      sku_score_label: "5 Pillars 점수",
      sku_fabric: "fabric",
      sku_colors: "colors",
      sku_more: (n: number) => `+ ${n}건 더보기`,

      /* Verdict 라벨 */
      verdict_a_label: "Approve",
      verdict_b_label: "Approve w/ Notes",
      verdict_c_label: "Minor Revise",
      verdict_d_label: "Major Revise",
    },

    /* ===== 5 Pillars Guide 페이지 ===== */
    guide: {
      breadcrumb_guide: "Brand Codex · 검수 가이드",
      back_to_inspector: "← Inspector로 돌아가기",
      hero_eyebrow: "AI INSPECTION CRITERIA",
      hero_title: "5 Universal Pillars",
      hero_subtitle:
        "Sergio Tacchini Brandbook 2026 기반 객관 검수 기준. AI가 단계적·정량적으로 평가하는 5개 축.",
      hero_cta_explore: "5 Pillars 둘러보기",
      hero_cta_inspector: "라이브 데모 보기",

      why_label: "WHY THESE 5 PILLARS",
      why_title: "왜 이 5개 축인가?",
      why_body:
        "주관적 디자인 평가가 아닌, 60년 헤리티지 + Brandbook 2026의 모든 디자인 원칙을 5축으로 정량화했습니다. 라이센시·HQ·디자이너 누구나 같은 기준으로 같은 결론에 도달합니다.",
      why_stat_1_value: "26",
      why_stat_1_label: "Sub-Rules (Pillar 세부 검수 규정)",
      why_stat_2_value: "8",
      why_stat_2_label: "ABSOLUTE NO (브랜드북 명시 금지)",
      why_stat_3_value: "2026",
      why_stat_3_label: "Brandbook (글로벌 공식 기준)",
      why_stat_4_value: "100%",
      why_stat_4_label: "재현 가능성 (같은 디자인 → 같은 결과)",

      pillars_label: "THE 5 PILLARS",
      pillars_title: "검수의 5개 축",
      pillar_pass_threshold: "통과 기준",
      pillar_sub_rules_count: (n: number) => `${n}개 sub-rules`,
      pillar_weight: "가중치 ×2",
      pillar_brandbook_quote: "Brandbook 인용",
      pillar_expand: "세부 규정 보기",
      pillar_collapse: "접기",

      process_label: "AI INSPECTION PROCESS",
      process_title: "AI는 이렇게 검수합니다",
      process_body:
        "단순 AI 응답이 아닙니다. 각 단계는 명시적·정량적 룰을 거치며, 사람이 검토 가능한 근거를 남깁니다.",
      process_step1_title: "PDF Parsing",
      process_step1_body: "라이센시 CAD 패키지에서 SKU·소재·컬러 자동 추출",
      process_step2_title: "Composition Check",
      process_step2_body: "P2.4 성분 비율 정량 검증 (Brandbook p.6 표 기준)",
      process_step3_title: "Color Mapping",
      process_step3_body: "P5.1 TCX 컬러 → ST 허용 6색 자동 매핑",
      process_step4_title: "Pillar Scoring",
      process_step4_body: "5축 × sub-rules 적용 → SKU별 0-100점 산출",
      process_step5_title: "Verdict + Report",
      process_step5_body: "Verdict A/B/C/D 등급 → AI-Report 자동 생성",

      objectivity_label: "OBJECTIVITY",
      objectivity_title: "주관 아닌 객관",
      obj_card_1_title: "Brandbook 직접 인용",
      obj_card_1_body:
        "모든 위반에는 Brandbook 페이지·문장이 함께 표시됩니다. 라이센시가 검증·반론 가능.",
      obj_card_2_title: "정량 측정 우선",
      obj_card_2_body:
        "성분 비율(%), 컬러 HEX/HSV, 사이즈(cm) 등 측정 가능한 값으로 1차 판정.",
      obj_card_3_title: "그룹별 차등 임계값",
      obj_card_3_body:
        "G1(신규)·G2(격상)·G3(장기) 라이센시별로 검수 강도가 다릅니다. 일률 적용 ❌.",
      obj_card_4_title: "사람 게이트",
      obj_card_4_body:
        "AI 신뢰도 낮은 항목은 HQ 디자이너가 최종 판단. AI는 의견만 제시.",

      direction_label: "BRAND DIRECTION",
      direction_title: "5 Pillars가 만드는 ST의 미래",
      direction_body:
        "5축은 단순 검수 도구가 아닌, ST의 글로벌 일관성을 만드는 정합 시스템입니다. 라이센시 6개사가 같은 언어로 같은 브랜드를 만들도록.",
      direction_cta: "Inspector 라이브 데모",
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
      qa_apex: "View AI-Report",
      qa_apex_body: "Sugi France 26FW AI review report",
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
      pending_title: "3 Reviews",
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
      apex_button: "Full AI-Report",
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
      step3_open_apex: "Open Full AI-Report",
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
      step6_open_apex: "Open AI-Report",
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

    /* ===== MOVIN Inspector (live data) ===== */
    movin: {
      breadcrumb_inspector: "Inspector",
      breadcrumb_licensee: "Sugi France · 27SS",
      header_title: "Sugi France · 27SS Lifestyle Man",
      header_subtitle:
        "6 licensee PDFs auto-parsed · 5 Pillars inspection rules · Brandbook 2026 based",
      live_prototype: "LIVE PROTOTYPE",
      step_upload: "1 · Upload",
      step_analyzing: "2 · Analyzing",
      step_result: "3 · Result",
      total_inspected: (n: number) => `${n} SKUs auto-inspected`,
      guide_button: "Inspection Criteria",
      back_to_lines: "← Back to Lines",
      reset_flow: "↺ Re-upload",

      /* Step 1 — Upload */
      step1_label: "Step 1 · Upload",
      step1_title: "Upload CAD Package",
      step1_body:
        "When a licensee uploads a season package (one PDF per line, multiple SKUs each), ATELIER ONE auto-extracts text → splits SKUs → runs 5 Pillars inspection.",
      drop_main: "Drop CAD · PDF · Image package here",
      drop_sub:
        "Supported: .pdf .png .jpg .ai .psd · 1 PDF per line recommended · max 1 GB per licensee",
      demo_intro: "Demo uses Sugi France's actual 27SS submission",
      start_button: "Start Inspection →",
      files_label: (n: number) => `Submitted Files — ${n} PDFs`,
      file_ready: "Ready",
      file_sku_unit: "SKUs",
      submission_label: "Submission",
      submission_season: "Season",
      submission_category: "Category",
      submission_group: "Group",
      submission_g1: "G1 New",
      submission_files: "Files",
      submission_size: "Total size",
      submission_skus: "Total SKUs",
      pdfs_unit: "PDFs",
      pieces: "",
      rules_label: "Auto-Inspection Rules",
      rules_p1: "Italian Tennis Heritage (5 sub)",
      rules_p2: "Elegant Functionalism (6 sub · ×2 weight)",
      rules_p3: "Court-to-Social Lifestyle (4 sub)",
      rules_p4: "Body-Lined Silhouette (5 sub)",
      rules_p5: "Quiet Performance (6 sub)",
      rules_total: "Total 26 sub-rules + 8 ABSOLUTE NO · Brandbook 2026 based",

      /* Step 2 — Analyzing */
      step2_title: "ATELIER ONE · Auto-Inspecting",
      step2_subtitle: (skus: number, lines: number) =>
        `Sugi France 27SS Lifestyle Man · ${skus} SKUs · ${lines} lines`,
      step2_phase1: (n: number) =>
        `Parsing ${n} PDFs (T1_ACE · T1_BAGEL · T1_NET · ...)`,
      step2_phase2: (n: number) =>
        `Extracting ${n} SKUs · Fabric composition · TCX colors`,
      step2_phase3: "Applying 5 Universal Pillars (26 sub-rules · Brandbook 2026)",
      step2_phase4: "Checking 8 ABSOLUTE NO · Computing per-SKU Verdict",
      step2_phase5: "Aggregating Line grades + Licensee overall grade",
      step2_inprogress: "in progress",

      /* Step 3 — Result */
      step3_overall_label: "Licensee Verdict · Submission Summary",
      step3_overall_caption: (skus: number, lines: number, time: string) =>
        `${skus} SKUs · ${lines} lines · Inspected at ${time}`,
      stat_avg_score: "Average Grade Point",
      stat_a_label: "A · Approve",
      stat_b_label: "B · Approve w/ Notes",
      stat_cd_label: "C / D · Need Revision",
      verdict_distribution: "Verdict Distribution",
      lines_label: "6 LINES · Click a line to see SKU details",
      line_stats_sku: "SKU",
      line_stats_avg: "Avg score",
      line_pillars_inspected: "5 Pillars inspected",
      line_detail_cta: "SKU Detail →",
      sku_score_label: "5 Pillars Score",
      sku_fabric: "fabric",
      sku_colors: "colors",
      sku_more: (n: number) => `+ ${n} more`,

      verdict_a_label: "Approve",
      verdict_b_label: "Approve w/ Notes",
      verdict_c_label: "Minor Revise",
      verdict_d_label: "Major Revise",
    },

    /* ===== 5 Pillars Guide page ===== */
    guide: {
      breadcrumb_guide: "Brand Codex · Inspection Guide",
      back_to_inspector: "← Back to Inspector",
      hero_eyebrow: "AI INSPECTION CRITERIA",
      hero_title: "5 Universal Pillars",
      hero_subtitle:
        "Objective inspection criteria based on Sergio Tacchini Brandbook 2026. AI evaluates 5 axes step-by-step, quantitatively.",
      hero_cta_explore: "Explore the 5 Pillars",
      hero_cta_inspector: "See Live Demo",

      why_label: "WHY THESE 5 PILLARS",
      why_title: "Why these 5 axes?",
      why_body:
        "Not subjective design judgment — 60 years of heritage + every design principle in Brandbook 2026, quantified into 5 axes. Licensees, HQ, and designers reach the same conclusion from the same criteria.",
      why_stat_1_value: "26",
      why_stat_1_label: "Sub-Rules (Pillar detailed inspection rules)",
      why_stat_2_value: "8",
      why_stat_2_label: "ABSOLUTE NO (Brandbook explicit prohibitions)",
      why_stat_3_value: "2026",
      why_stat_3_label: "Brandbook (Global official baseline)",
      why_stat_4_value: "100%",
      why_stat_4_label: "Reproducibility (same design → same result)",

      pillars_label: "THE 5 PILLARS",
      pillars_title: "The 5 Inspection Axes",
      pillar_pass_threshold: "Pass threshold",
      pillar_sub_rules_count: (n: number) => `${n} sub-rules`,
      pillar_weight: "Weight ×2",
      pillar_brandbook_quote: "Brandbook quote",
      pillar_expand: "View sub-rules",
      pillar_collapse: "Collapse",

      process_label: "AI INSPECTION PROCESS",
      process_title: "Here's how AI inspects",
      process_body:
        "Not just an AI response — each step passes through explicit, quantitative rules and leaves a human-reviewable trail.",
      process_step1_title: "PDF Parsing",
      process_step1_body: "Auto-extract SKUs, fabric, colors from licensee CAD package",
      process_step2_title: "Composition Check",
      process_step2_body: "P2.4 composition % quantitative check (Brandbook p.6 table)",
      process_step3_title: "Color Mapping",
      process_step3_body: "P5.1 TCX color → auto-map to ST 6 allowed colors",
      process_step4_title: "Pillar Scoring",
      process_step4_body: "Apply 5 axes × sub-rules → per-SKU 0-100 score",
      process_step5_title: "Verdict + Report",
      process_step5_body: "Verdict A/B/C/D grade → auto-generate AI-Report",

      objectivity_label: "OBJECTIVITY",
      objectivity_title: "Objective, not subjective",
      obj_card_1_title: "Direct Brandbook citation",
      obj_card_1_body:
        "Every violation includes the Brandbook page and sentence. Licensees can verify and contest.",
      obj_card_2_title: "Quantitative first",
      obj_card_2_body:
        "Composition %, color HEX/HSV, size (cm) — measurable values for first-pass judgment.",
      obj_card_3_title: "Group-tiered thresholds",
      obj_card_3_body:
        "G1 (new) · G2 (elevation) · G3 (long-term) — inspection strictness differs by licensee group. No one-size-fits-all.",
      obj_card_4_title: "Human gate",
      obj_card_4_body:
        "Low-confidence items go to HQ designer for final judgment. AI provides opinion only.",

      direction_label: "BRAND DIRECTION",
      direction_title: "Where 5 Pillars take ST",
      direction_body:
        "More than inspection — a coherence system that builds ST's global consistency. 6 licensees, one language, one brand.",
      direction_cta: "Inspector Live Demo",
    },
  },
};

export type Dictionary = typeof dictionary.ko;
